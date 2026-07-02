from __future__ import annotations

from types import SimpleNamespace

from qdrant_client import models

from retrieval.qdrant_search import build_prefetch, hit_from_point


def test_build_prefetch_wires_dense_and_sparse_branches() -> None:
    prefetch = build_prefetch(
        [0.1, 0.2, 0.3],
        {"indices": [4, 9], "values": [0.5, 0.7]},
        prefetch_limit=25,
    )

    assert [branch.using for branch in prefetch] == ["dense", "sparse"]
    assert all(branch.limit == 25 for branch in prefetch)
    assert prefetch[0].query == [0.1, 0.2, 0.3]

    sparse_query = prefetch[1].query
    assert isinstance(sparse_query, models.SparseVector)
    assert sparse_query.indices == [4, 9]
    assert sparse_query.values == [0.5, 0.7]


def test_hit_from_point_extracts_citation_metadata() -> None:
    point = SimpleNamespace(
        score=22.5,
        payload={
            "source_file": "312523353-The-Definitive-Guide-to-Inventory-Management.md",
            "source_path": "312523353-The-Definitive-Guide-to-Inventory-Management.md",
            "chunk_index": 44,
            "text": "reorder point is expected demand during the lead time plus safety stock",
        },
    )

    hit = hit_from_point(point)

    assert hit.score == 22.5
    assert hit.chunk_index == 44
    assert hit.citation() == "312523353-The-Definitive-Guide-to-Inventory-Management.md#chunk44"
    assert "safety stock" in hit.text


def test_hit_from_point_tolerates_missing_payload() -> None:
    hit = hit_from_point(SimpleNamespace(score=1.0, payload=None))

    assert hit.source_file == "unknown"
    assert hit.chunk_index == -1
    assert hit.citation() == "unknown#chunk-1"
