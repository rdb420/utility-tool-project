# Source

Python packages for the knowledge-base tooling (never a request-time dependency
of the website):

| Package | Responsibility |
|---|---|
| `ingestion/` | Chunk + hybrid-embed the corpus and upsert to Qdrant (`scripts/ingest_qdrant.py`). |
| `retrieval/` | Hybrid search over the knowledge base for grounding/citation (`scripts/search_corpus.py`). |

The former `corpus/` (record validation) and `calc/` (calculation library)
packages were ported to TypeScript and deleted after a parity gate; they now
live at `web/src/lib/corpus/` and `web/src/lib/calc/`. See
[../docs/architecture/TECHNICAL_ARCHITECTURE.md](../docs/architecture/TECHNICAL_ARCHITECTURE.md).
