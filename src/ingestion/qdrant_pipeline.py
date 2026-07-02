from __future__ import annotations

import argparse
import hashlib
import os
import time
import uuid
from collections.abc import Iterator, Sequence
from dataclasses import dataclass
from pathlib import Path
from typing import Any

import requests
from qdrant_client import QdrantClient, models

DEFAULT_COLLECTION = "logistics_supply_chain_hybrid_v1"
DEFAULT_CORPUS = "logistics_supply_chain"
DEFAULT_EMBEDDINGS_URL = "https://cng420-embedding.hf.space"
DENSE_VECTOR_NAME = "dense"
MULTI_VECTOR_NAME = "multi"
SPARSE_VECTOR_NAME = "sparse"
DENSE_SIZE = 384
COLBERT_SIZE = 128


@dataclass(frozen=True)
class TextChunk:
    chunk_index: int
    text: str
    start_char: int
    end_char: int


def load_env(path: Path) -> None:
    if not path.exists():
        return
    for raw_line in path.read_text(encoding="utf-8").splitlines():
        line = raw_line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, value = line.split("=", 1)
        os.environ.setdefault(key.strip(), value.strip())


def normalize_text(text: str) -> str:
    text = text.replace("\r\n", "\n").replace("\r", "\n")
    lines = [line.rstrip() for line in text.split("\n")]
    return "\n".join(lines).strip()


def chunk_text(text: str, max_chars: int = 2800, overlap_chars: int = 350) -> Iterator[TextChunk]:
    normalized = normalize_text(text)
    if not normalized:
        return
    if overlap_chars >= max_chars:
        raise ValueError("overlap_chars must be smaller than max_chars")

    start = 0
    chunk_index = 0
    length = len(normalized)

    while start < length:
        hard_end = min(start + max_chars, length)
        end = hard_end
        if hard_end < length:
            paragraph_break = normalized.rfind("\n\n", start, hard_end)
            sentence_break = normalized.rfind(". ", start, hard_end)
            soft_break = max(paragraph_break, sentence_break)
            minimum_end = start + int(max_chars * 0.55)
            if soft_break >= minimum_end:
                end = soft_break + (2 if soft_break == paragraph_break else 1)

        chunk_body = normalized[start:end].strip()
        if chunk_body:
            yield TextChunk(
                chunk_index=chunk_index,
                text=chunk_body,
                start_char=start,
                end_char=end,
            )
            chunk_index += 1

        if end >= length:
            break
        start = max(0, end - overlap_chars)


def iter_markdown_files(corpus_root: Path) -> Iterator[Path]:
    yield from sorted(corpus_root.glob("*.md"))


def file_sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for block in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(block)
    return digest.hexdigest()


def stable_point_id(collection_name: str, source_path: str, chunk_index: int) -> str:
    name = f"{collection_name}:{source_path}:{chunk_index}"
    return str(uuid.uuid5(uuid.NAMESPACE_URL, name))


def build_payload(
    source_path: Path,
    corpus_root: Path,
    chunk: TextChunk,
    *,
    content_sha256: str,
    corpus_name: str = DEFAULT_CORPUS,
) -> dict[str, Any]:
    relative_path = source_path.relative_to(corpus_root).as_posix()
    return {
        "corpus": corpus_name,
        "source_path": relative_path,
        "source_file": source_path.name,
        "content_sha256": content_sha256,
        "chunk_index": chunk.chunk_index,
        "start_char": chunk.start_char,
        "end_char": chunk.end_char,
        "text": chunk.text,
    }


def parse_dense_response(data: dict[str, Any]) -> list[list[float]]:
    vectors = data.get("vectors") or data.get("dense")
    if not isinstance(vectors, list):
        raise ValueError("Dense embedding response must contain a list under 'vectors' or 'dense'")
    return vectors


def parse_colbert_response(data: dict[str, Any]) -> list[list[list[float]]]:
    vectors = data.get("vectors") or data.get("colbert") or data.get("multi")
    if not isinstance(vectors, list):
        raise ValueError(
            "ColBERT response must contain a list under 'vectors', 'colbert', or 'multi'"
        )
    return vectors


def parse_sparse_response(data: dict[str, Any]) -> list[dict[str, list[float] | list[int]]]:
    vectors = data.get("vectors") or data.get("sparse")
    if not isinstance(vectors, list):
        raise ValueError(
            "Sparse embedding response must contain a list under 'vectors' or 'sparse'"
        )
    parsed = []
    for vector in vectors:
        if not isinstance(vector, dict) or "indices" not in vector or "values" not in vector:
            raise ValueError("Sparse vectors must be objects with 'indices' and 'values'")
        parsed.append({"indices": vector["indices"], "values": vector["values"]})
    return parsed


class EmbeddingsSidecar:
    def __init__(self, base_url: str, timeout_seconds: int = 180) -> None:
        self.base_url = base_url.rstrip("/")
        self.timeout_seconds = timeout_seconds

    def health(self) -> dict[str, Any]:
        response = requests.get(f"{self.base_url}/health", timeout=30)
        response.raise_for_status()
        return response.json()

    def _post(self, endpoint: str, texts: Sequence[str]) -> dict[str, Any]:
        response = requests.post(
            f"{self.base_url}{endpoint}",
            json={"texts": list(texts)},
            timeout=self.timeout_seconds,
        )
        response.raise_for_status()
        return response.json()

    def embed_dense(self, texts: Sequence[str]) -> list[list[float]]:
        return parse_dense_response(self._post("/embed/dense", texts))

    def embed_colbert(self, texts: Sequence[str]) -> list[list[list[float]]]:
        return parse_colbert_response(self._post("/embed/colbert", texts))

    def embed_sparse(self, texts: Sequence[str]) -> list[dict[str, list[float] | list[int]]]:
        return parse_sparse_response(self._post("/embed/sparse", texts))


def qdrant_client_from_env() -> QdrantClient:
    url = os.environ.get("QDRANT_URL")
    api_key = os.environ.get("QDRANT_API_KEY")
    if not url or not api_key:
        raise RuntimeError("QDRANT_URL and QDRANT_API_KEY must be set")
    return QdrantClient(url=url, api_key=api_key)


def ensure_collection(
    client: QdrantClient,
    collection_name: str,
    *,
    recreate: bool = False,
) -> None:
    if recreate and client.collection_exists(collection_name):
        client.delete_collection(collection_name)

    if client.collection_exists(collection_name):
        return

    client.create_collection(
        collection_name=collection_name,
        vectors_config={
            DENSE_VECTOR_NAME: models.VectorParams(
                size=DENSE_SIZE,
                distance=models.Distance.COSINE,
            ),
            MULTI_VECTOR_NAME: models.VectorParams(
                size=COLBERT_SIZE,
                distance=models.Distance.COSINE,
                multivector_config=models.MultiVectorConfig(
                    comparator=models.MultiVectorComparator.MAX_SIM,
                ),
                hnsw_config=models.HnswConfigDiff(m=0),
            ),
        },
        sparse_vectors_config={
            SPARSE_VECTOR_NAME: models.SparseVectorParams(modifier=models.Modifier.IDF),
        },
    )


def build_chunk_records(
    corpus_root: Path,
    *,
    collection_name: str,
    max_chars: int,
    overlap_chars: int,
    limit: int | None = None,
) -> list[dict[str, Any]]:
    records: list[dict[str, Any]] = []
    for source_path in iter_markdown_files(corpus_root):
        source_hash = file_sha256(source_path)
        text = source_path.read_text(encoding="utf-8", errors="replace")
        for chunk in chunk_text(text, max_chars=max_chars, overlap_chars=overlap_chars):
            relative_path = source_path.relative_to(corpus_root).as_posix()
            records.append(
                {
                    "id": stable_point_id(collection_name, relative_path, chunk.chunk_index),
                    "payload": build_payload(
                        source_path,
                        corpus_root,
                        chunk,
                        content_sha256=source_hash,
                    ),
                }
            )
            if limit is not None and len(records) >= limit:
                return records
    return records


def batched(items: Sequence[dict[str, Any]], batch_size: int) -> Iterator[list[dict[str, Any]]]:
    for index in range(0, len(items), batch_size):
        yield list(items[index : index + batch_size])


def points_from_embeddings(
    records: Sequence[dict[str, Any]],
    dense_vectors: Sequence[list[float]],
    colbert_vectors: Sequence[list[list[float]]],
    sparse_vectors: Sequence[dict[str, list[float] | list[int]]],
) -> list[models.PointStruct]:
    points: list[models.PointStruct] = []
    for record, dense, colbert, sparse in zip(
        records, dense_vectors, colbert_vectors, sparse_vectors, strict=True
    ):
        points.append(
            models.PointStruct(
                id=record["id"],
                payload=record["payload"],
                vector={
                    DENSE_VECTOR_NAME: dense,
                    MULTI_VECTOR_NAME: colbert,
                    SPARSE_VECTOR_NAME: models.SparseVector(
                        indices=sparse["indices"],
                        values=sparse["values"],
                    ),
                },
            )
        )
    return points


def ingest_records(
    *,
    client: QdrantClient,
    sidecar: EmbeddingsSidecar,
    collection_name: str,
    records: Sequence[dict[str, Any]],
    batch_size: int,
) -> None:
    total = len(records)
    for offset, batch in enumerate(batched(records, batch_size), start=1):
        texts = [record["payload"]["text"] for record in batch]
        dense_vectors = sidecar.embed_dense(texts)
        colbert_vectors = sidecar.embed_colbert(texts)
        sparse_vectors = sidecar.embed_sparse(texts)
        points = points_from_embeddings(batch, dense_vectors, colbert_vectors, sparse_vectors)
        client.upsert(collection_name=collection_name, points=points, wait=True)
        completed = min(offset * batch_size, total)
        print(f"Upserted {completed}/{total} chunks into {collection_name}")
        time.sleep(0.1)


def count_points(client: QdrantClient, collection_name: str) -> int:
    result = client.count(collection_name=collection_name, exact=True)
    return int(result.count)


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Embed and upsert logistics corpus chunks to Qdrant"
    )
    parser.add_argument("--corpus", default="corpus-logistics-supply-chain")
    parser.add_argument(
        "--collection",
        default=os.environ.get("QDRANT_COLLECTION", DEFAULT_COLLECTION),
    )
    parser.add_argument(
        "--embeddings-url",
        default=os.environ.get("EMBEDDINGS_URL", DEFAULT_EMBEDDINGS_URL),
    )
    parser.add_argument("--max-chars", type=int, default=2800)
    parser.add_argument("--overlap-chars", type=int, default=350)
    parser.add_argument("--batch-size", type=int, default=8)
    parser.add_argument("--limit", type=int, default=None)
    parser.add_argument("--recreate", action="store_true")
    parser.add_argument("--dry-run", action="store_true")
    return parser.parse_args()


def main() -> None:
    repo_root = Path(__file__).resolve().parents[2]
    load_env(repo_root / ".env.local")
    args = parse_args()

    corpus_root = (repo_root / args.corpus).resolve()
    if not corpus_root.exists():
        raise FileNotFoundError(f"Corpus path not found: {corpus_root}")

    records = build_chunk_records(
        corpus_root,
        collection_name=args.collection,
        max_chars=args.max_chars,
        overlap_chars=args.overlap_chars,
        limit=args.limit,
    )
    print(f"Prepared {len(records)} chunks from {corpus_root}")
    if args.dry_run:
        return

    client = qdrant_client_from_env()
    sidecar = EmbeddingsSidecar(args.embeddings_url)
    health = sidecar.health()
    print(f"Embeddings sidecar health: {health}")

    ensure_collection(client, args.collection, recreate=args.recreate)
    ingest_records(
        client=client,
        sidecar=sidecar,
        collection_name=args.collection,
        records=records,
        batch_size=args.batch_size,
    )
    print(f"Qdrant collection count: {count_points(client, args.collection)}")


if __name__ == "__main__":
    main()
