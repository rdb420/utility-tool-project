from __future__ import annotations

from pathlib import Path

from ingestion.qdrant_pipeline import (
    build_payload,
    chunk_text,
    parse_colbert_response,
    parse_dense_response,
    parse_sparse_response,
    stable_point_id,
)


def test_chunk_text_splits_with_overlap_and_offsets() -> None:
    text = "Alpha logistics paragraph. " * 80 + "\n\n" + "Beta inventory paragraph. " * 80
    chunks = list(chunk_text(text, max_chars=700, overlap_chars=120))

    assert len(chunks) > 1
    assert chunks[0].chunk_index == 0
    assert chunks[1].chunk_index == 1
    assert chunks[0].start_char == 0
    assert chunks[1].start_char < chunks[0].end_char
    assert all(chunk.text.strip() for chunk in chunks)
    assert all(len(chunk.text) <= 820 for chunk in chunks)


def test_stable_point_id_is_deterministic_uuid() -> None:
    first = stable_point_id("logistics_supply_chain_hybrid_v1", "source.md", 7)
    second = stable_point_id("logistics_supply_chain_hybrid_v1", "source.md", 7)
    different = stable_point_id("logistics_supply_chain_hybrid_v1", "source.md", 8)

    assert first == second
    assert first != different
    assert len(first) == 36


def test_build_payload_preserves_source_and_chunk_metadata(tmp_path: Path) -> None:
    corpus_root = tmp_path / "corpus"
    source = corpus_root / "book.md"
    source.parent.mkdir()
    source.write_text("Reorder point and safety stock", encoding="utf-8")
    chunk = next(chunk_text(source.read_text(encoding="utf-8"), max_chars=100, overlap_chars=10))

    payload = build_payload(source, corpus_root, chunk, content_sha256="abc123")

    assert payload["source_path"] == "book.md"
    assert payload["source_file"] == "book.md"
    assert payload["chunk_index"] == 0
    assert payload["content_sha256"] == "abc123"
    assert payload["text"] == "Reorder point and safety stock"
    assert payload["corpus"] == "logistics_supply_chain"


def test_parse_embedding_sidecar_responses() -> None:
    assert parse_dense_response({"vectors": [[0.1, 0.2]]}) == [[0.1, 0.2]]
    assert parse_colbert_response({"vectors": [[[0.1, 0.2], [0.3, 0.4]]]}) == [
        [[0.1, 0.2], [0.3, 0.4]]
    ]
    assert parse_sparse_response({"vectors": [{"indices": [1, 9], "values": [0.5, 0.7]}]}) == [
        {"indices": [1, 9], "values": [0.5, 0.7]}
    ]


def test_parse_sparse_response_accepts_sparse_key() -> None:
    assert parse_sparse_response({"sparse": [{"indices": [2], "values": [1.0]}]}) == [
        {"indices": [2], "values": [1.0]}
    ]
