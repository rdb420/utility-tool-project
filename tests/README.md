# Tests

Run with `uv run pytest` (config in `pyproject.toml`: `testpaths=tests`,
`pythonpath=src`). Tests are network-free — the pipeline/retrieval tests exercise
pure helpers, not live Qdrant or the embeddings sidecar.

| File | Covers |
|---|---|
| `test_qdrant_ingest.py` | Chunking with overlap/offsets, payload metadata, deterministic point IDs, sidecar response parsing |
| `test_qdrant_search.py` | Hybrid prefetch construction and search-hit/citation parsing |

Only the Qdrant pipeline/retrieval tests remain in Python. The calc-library,
corpus-record, and calculator tests were ported to Vitest with the TypeScript
port and live under `web/src/lib/**/__tests__/` (run with `cd web && npm run
test`). The traceability guarantee moved with them: the record-driven suites run
each formula's cited worked example through the real `web/src/lib/calc` library
via its registry.
