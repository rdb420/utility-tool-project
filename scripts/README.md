# Scripts

Thin CLI entry points. Each adds `src/` to the path and calls into a module, so
the logic stays importable and testable. Run everything with `uv run`.

| Script | Does | Module |
|---|---|---|
| `ingest_qdrant.py` | Chunk + hybrid-embed the corpus and upsert to Qdrant | `ingestion.qdrant_pipeline` |
| `search_corpus.py` | Hybrid search over the knowledge base (grounding/citation) | `retrieval.qdrant_search` |
| `validate_corpus.py` | Validate `data/` records against `schemas/` | `corpus.validation` |
| `check_google_workspace.py` | Verify Drive + Sheets read access (OAuth) | (standalone) |

Examples:

```bash
uv run python scripts/ingest_qdrant.py --dry-run            # chunk + count, no network
uv run python scripts/search_corpus.py "reorder point formula" --limit 5
uv run python scripts/validate_corpus.py                     # exits non-zero on any error
uv run python scripts/check_google_workspace.py             # first run opens OAuth consent
```

`ingest_qdrant.py`, `search_corpus.py`, and `check_google_workspace.py` load
`.env.local` automatically. The Qdrant scripts need `QDRANT_URL` / `QDRANT_API_KEY`
and a reachable `EMBEDDINGS_URL`; see [`../docs/GOOGLE_CONNECTIONS.md`](../docs/GOOGLE_CONNECTIONS.md).
