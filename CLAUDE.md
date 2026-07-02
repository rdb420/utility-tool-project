# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

An SEO-driven B2B operations utility website (logistics, inventory, freight, dimensional-weight calculators) that is **still in the documentation and corpus-preparation stage**. No frontend/app framework has been chosen yet. The only executable code today is Python tooling:

1. A **Qdrant ingestion pipeline** that chunks the logistics corpus, embeds it via a remote sidecar, and upserts hybrid vectors.
2. A **hybrid-search retrieval module** that queries that knowledge base to ground/cite formula records.
3. **Structured corpus records + a calculation library**: grounded formula records under `data/`, validated against `schemas/`, with pure calc functions in `src/calc/` (the six inventory formulas are implemented; freight is blocked on external reference-table sourcing).
4. A **Google Workspace connectivity check** script.

The planned public site (inventory + freight calculator pages, static/SSR frontend) is described in `README.md` and `docs/` but not yet built. Treat those docs as the spec, not as existing code.

## Commands

```bash
uv sync                      # install deps + dev group (pytest, ruff)
uv run pytest                # run tests (testpaths=tests, pythonpath=src)
uv run pytest tests/test_qdrant_ingest.py::test_chunk_text_splits_with_overlap_and_offsets  # single test
uv run ruff check .          # lint (E, F, I, UP, B; line-length 100; py312)
uv run ruff check . --fix    # autofix

# Ingestion (loads .env.local automatically; needs QDRANT_URL/QDRANT_API_KEY + reachable EMBEDDINGS_URL)
uv run python scripts/ingest_qdrant.py --dry-run          # chunk + count only, no network
uv run python scripts/ingest_qdrant.py --limit 12         # small live run
uv run python scripts/ingest_qdrant.py --recreate         # drop + rebuild the collection

# Retrieval (hybrid search over the KB; use to ground/cite formula records)
uv run python scripts/search_corpus.py "reorder point formula" --limit 5

# Validate the structured corpus records against schemas/
uv run python scripts/validate_corpus.py

# Google Workspace check (opens a browser OAuth consent flow on first run)
uv run python scripts/check_google_workspace.py
```

Requires Python >=3.12. Use `uv` for everything (per user global instructions).

## Architecture

### Ingestion pipeline (`src/ingestion/qdrant_pipeline.py`)

This is the core implemented module. `scripts/ingest_qdrant.py` is a thin CLI wrapper that adds `src/` to the path and calls `main()`.

Flow: markdown files in `corpus-logistics-supply-chain/*.md` → `chunk_text` (char-based, ~2800 chars with 350 overlap, prefers paragraph/sentence soft breaks) → `EmbeddingsSidecar` HTTP calls → `points_from_embeddings` → `client.upsert`.

Key design points to preserve:

- **Hybrid Qdrant collection** with three named vectors: `dense` (384-dim MiniLM, cosine), `multi` (128-dim ColBERT multivector, MAX_SIM, `hnsw_config m=0`), and a `sparse` vector (SPLADE, IDF modifier). `ensure_collection` creates this exact shape; changing dimensions/names is a breaking schema change.
- **Idempotent IDs**: `stable_point_id` = `uuid5(NAMESPACE_URL, "{collection}:{relative_path}:{chunk_index}")`. Re-ingesting the same corpus overwrites points rather than duplicating. Do not switch to random IDs.
- **Batch size**: CLI default is 8, but the embeddings sidecar / payload limits mean **keep batches small (≤6)** — the sidecar has a ~33MB payload cap and ~20 chunks/min throughput. Prefer `--batch-size 6` (or lower) for real runs.
- **Embeddings sidecar** (`EMBEDDINGS_URL`, default the HF Space `cng420-embedding.hf.space`) is an external FastAPI service (`fastembed`) exposing `/embed/dense`, `/embed/colbert`, `/embed/sparse`, `/health`. It is NOT in this repo — see `docs/Embeddings-Sidecar-huggingface-spaces-README.md`. Response parsers accept multiple key names (`vectors`/`dense`/`colbert`/`multi`/`sparse`), so preserve that flexibility when editing them.
- **Payload** (`build_payload`) carries `corpus`, `source_path`, `source_file`, `content_sha256`, `chunk_index`, `start_char`, `end_char`, `text` — this is the retrieval contract; keep fields stable.

### Retrieval (`src/retrieval/qdrant_search.py`)

Query-side counterpart to the ingestion pipeline; CLI wrapper `scripts/search_corpus.py`. Embeds the query with the sidecar's query endpoints (`/embed/dense`, `/embed/sparse/query`, `/embed/colbert/query`), runs fused **dense + sparse prefetch reranked by the ColBERT multivector** (`query_points` with `prefetch`), and returns `SearchHit`s carrying `source_file` + `chunk_index` for citation. Reuses `load_env` and the `parse_*` response helpers from `ingestion.qdrant_pipeline` so query and ingest stay in lockstep. `build_prefetch`/`hit_from_point` are pure and unit-tested (no network). This is the grounding tool for authoring corpus formula records — see `docs/CORPUS_DESIGN.md` (Two Corpus Layers).

### Corpus records and calculation library

Two-layer corpus (see `docs/CORPUS_DESIGN.md`): the Qdrant KB is the grounding
layer; hand-authored records under `data/` are the product layer.

- **Records** (committed): `data/formulas/**`, `data/reference_tables/**`, and
  `data/calculators/**` (MVP page specs), validated against JSON Schemas in
  `schemas/` by `src/corpus/validation.py` (`scripts/validate_corpus.py`). The
  schemas enforce the grounding contract: `grounding: corpus` requires a
  `citation` (source_file + chunk_index); `grounding: external` requires named
  `sources`. Freight reference tables are `status: needs_sourcing` stubs — do not
  treat their values as verified. The validator also cross-checks calculators:
  `formula_ids` must exist, inputs must cover the formula's inputs, result cards
  must be formula outputs, and `related_tools` must resolve.
- **Page specs**: `data/calculators/*.json` define the six inventory MVP pages
  (inputs/results/copy/FAQ/related tools/schema). Cross-cutting page standards
  (layout, validation, disclaimers, SEO/schema) are in `docs/MVP_PAGE_SPECS.md`.
  Pages compute via `calc.registry`, never by reimplementing a formula.
- **Calc library** `src/calc/`: pure functions per formula (`inventory.py`),
  input guards (`errors.py`), unit conversion (`units.py`), formatting
  (`formatting.py`). `registry.py` maps each formula record id → its function;
  this is the traceability contract. Adding a formula = author the record +
  implement the function + add a registry entry; the record-driven test
  (`tests/test_corpus_records.py`) then runs its worked examples through the
  library automatically.

### Google Workspace check (`scripts/check_google_workspace.py`)

Standalone OAuth (installed-app flow) script that verifies Drive + Sheets read access using the corpus Shared Drive and formula workbook IDs. Caches the token at `GOOGLE_TOKEN_CACHE_PATH` and auto-refreshes consent if saved scopes are missing. Read-only scopes only.

## Configuration & secrets

- Both scripts read `.env.local` via a local `load_env` (uses `os.environ.setdefault`, so real env vars win). Copy `.env.example` → `.env.local` and fill values.
- `.env`, `.env.*` (except `.env.example`), and `secrets/` are gitignored and **sensitive** — do not read, print, or commit them unless the user explicitly asks.
- Generated data goes under `data/{raw,interim,processed,exports}/` — all gitignored.

## Conventions

- Formula/calculation logic (once built) must be pure, testable functions with example-based tests, kept separate from UI/content rendering (see `CONTRIBUTING.md` and `docs/TECHNICAL_ARCHITECTURE.md`).
- Avoid regulated/compliance claims, freight-rate guarantees, or definitive duty/tax advice in any calculator content.
- When adding a corpus field or calculator, update the relevant `docs/` file (`CORPUS_DESIGN.md`, `TECHNICAL_ARCHITECTURE.md`, `DEVELOPMENT_PLAN.md`) plus tests.
- The three large research markdown files under `docs/project/` are source material — cite/summarize them, don't overwrite.
