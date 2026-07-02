# Source

Python packages (kept independent of any future web UI):

| Package | Responsibility |
|---|---|
| `ingestion/` | Chunk + hybrid-embed the corpus and upsert to Qdrant (`scripts/ingest_qdrant.py`). |
| `retrieval/` | Hybrid search over the knowledge base for grounding/citation (`scripts/search_corpus.py`). |
| `corpus/` | Validate structured records in `data/` against `schemas/` (`scripts/validate_corpus.py`). |
| `calc/` | Pure calculation library: formula functions, input validation, unit conversion, formatting, and the record→function registry. |

`calc/registry.py` binds each `data/formulas/**` record id to its function; the
record-driven test runs every corpus worked example through the library so
results stay traceable to a cited source. See
[../docs/TECHNICAL_ARCHITECTURE.md](../docs/TECHNICAL_ARCHITECTURE.md).
