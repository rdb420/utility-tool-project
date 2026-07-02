"""Hybrid search over the logistics/supply-chain knowledge base in Qdrant.

This is the query-side counterpart to ``ingestion.qdrant_pipeline``. It embeds a
query with the same embeddings sidecar used at ingest time (MiniLM dense, SPLADE
sparse, ColBERT late-interaction) and runs a fused hybrid search: dense + sparse
prefetch, reranked by the ColBERT multivector with MAX_SIM.

Use it to ground formula records, explanations, and worked examples in cited
source passages rather than inventing them. Every hit carries its ``source_file``
and ``chunk_index`` so results can be cited in corpus records.
"""

from __future__ import annotations

import argparse
import os
from dataclasses import dataclass
from pathlib import Path
from typing import Any

import requests
from qdrant_client import QdrantClient, models

# Reuse ingest-side helpers so query and ingest stay in lockstep.
from ingestion.qdrant_pipeline import (
    DEFAULT_COLLECTION,
    DEFAULT_EMBEDDINGS_URL,
    DENSE_VECTOR_NAME,
    MULTI_VECTOR_NAME,
    SPARSE_VECTOR_NAME,
    load_env,
    parse_colbert_response,
    parse_dense_response,
    parse_sparse_response,
)

DEFAULT_PREFETCH_LIMIT = 30


@dataclass(frozen=True)
class SearchHit:
    score: float
    source_file: str
    source_path: str
    chunk_index: int
    text: str

    def citation(self) -> str:
        return f"{self.source_file}#chunk{self.chunk_index}"


class QueryEmbeddings:
    """Query-side embeddings. ColBERT/SPLADE have dedicated query endpoints;
    dense embeddings are symmetric so the document endpoint is reused."""

    def __init__(self, base_url: str, timeout_seconds: int = 60) -> None:
        self.base_url = base_url.rstrip("/")
        self.timeout_seconds = timeout_seconds

    def _post(self, endpoint: str, text: str) -> dict[str, Any]:
        response = requests.post(
            f"{self.base_url}{endpoint}",
            json={"texts": [text]},
            timeout=self.timeout_seconds,
        )
        response.raise_for_status()
        return response.json()

    def dense(self, text: str) -> list[float]:
        return parse_dense_response(self._post("/embed/dense", text))[0]

    def sparse(self, text: str) -> dict[str, list[float] | list[int]]:
        return parse_sparse_response(self._post("/embed/sparse/query", text))[0]

    def colbert(self, text: str) -> list[list[float]]:
        return parse_colbert_response(self._post("/embed/colbert/query", text))[0]


def build_prefetch(
    dense_vector: list[float],
    sparse_vector: dict[str, list[float] | list[int]],
    *,
    prefetch_limit: int = DEFAULT_PREFETCH_LIMIT,
) -> list[models.Prefetch]:
    """Construct the dense + sparse prefetch branches fed into the ColBERT rerank.

    Pure and network-free so the fusion wiring can be unit tested.
    """
    return [
        models.Prefetch(query=dense_vector, using=DENSE_VECTOR_NAME, limit=prefetch_limit),
        models.Prefetch(
            query=models.SparseVector(
                indices=list(sparse_vector["indices"]),
                values=list(sparse_vector["values"]),
            ),
            using=SPARSE_VECTOR_NAME,
            limit=prefetch_limit,
        ),
    ]


def hit_from_point(point: Any) -> SearchHit:
    payload = point.payload or {}
    return SearchHit(
        score=float(point.score),
        source_file=payload.get("source_file", "unknown"),
        source_path=payload.get("source_path", "unknown"),
        chunk_index=int(payload.get("chunk_index", -1)),
        text=payload.get("text", ""),
    )


def search(
    query: str,
    *,
    client: QdrantClient,
    embeddings: QueryEmbeddings,
    collection_name: str,
    limit: int = 6,
    prefetch_limit: int = DEFAULT_PREFETCH_LIMIT,
) -> list[SearchHit]:
    prefetch = build_prefetch(
        embeddings.dense(query),
        embeddings.sparse(query),
        prefetch_limit=prefetch_limit,
    )
    result = client.query_points(
        collection_name=collection_name,
        prefetch=prefetch,
        query=embeddings.colbert(query),
        using=MULTI_VECTOR_NAME,
        limit=limit,
        with_payload=True,
    )
    return [hit_from_point(point) for point in result.points]


def client_from_env() -> QdrantClient:
    url = os.environ.get("QDRANT_URL")
    api_key = os.environ.get("QDRANT_API_KEY")
    if not url or not api_key:
        raise RuntimeError("QDRANT_URL and QDRANT_API_KEY must be set")
    return QdrantClient(url=url, api_key=api_key, timeout=120)


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Hybrid search over the logistics corpus in Qdrant"
    )
    parser.add_argument("query", nargs="+", help="Natural-language query")
    parser.add_argument(
        "--collection",
        default=os.environ.get("QDRANT_COLLECTION", DEFAULT_COLLECTION),
    )
    parser.add_argument(
        "--embeddings-url",
        default=os.environ.get("EMBEDDINGS_URL", DEFAULT_EMBEDDINGS_URL),
    )
    parser.add_argument("--limit", type=int, default=6)
    parser.add_argument("--chars", type=int, default=1200, help="Chars of each hit to print")
    return parser.parse_args()


def main() -> None:
    repo_root = Path(__file__).resolve().parents[2]
    load_env(repo_root / ".env.local")
    args = parse_args()

    client = client_from_env()
    embeddings = QueryEmbeddings(args.embeddings_url)
    hits = search(
        " ".join(args.query),
        client=client,
        embeddings=embeddings,
        collection_name=args.collection,
        limit=args.limit,
    )
    for index, hit in enumerate(hits, start=1):
        print(f"\n=== [{index}] score={hit.score:.4f} | {hit.citation()} ===")
        print(hit.text[: args.chars])


if __name__ == "__main__":
    main()
