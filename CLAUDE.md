# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

An SEO-driven B2B operations utility website (OpsCrunch: logistics, inventory, freight, dimensional-weight calculators). The public site **exists** as a Next.js (App Router) + TypeScript app at `web/` — 24 calculator pages across three clusters (10 inventory, 9 freight, 5 pricing), a home page, three cluster hubs, legal pages, and full SEO plumbing (sitemap/robots/ads.txt, JSON-LD). Four tools use custom islands (CBM, freight class, dimensional/volumetric weight, ABC analysis); the rest render through the generic record-driven tool. All formula execution and corpus validation happen in TypeScript inside `web/`.

Python remains **only** for the knowledge-base tooling:

1. A **Qdrant ingestion pipeline** that chunks the logistics corpus, embeds it via a remote sidecar, and upserts hybrid vectors.
2. A **hybrid-search retrieval module** that queries that knowledge base to ground/cite formula records.
3. A **Google Workspace connectivity check** script.

The former Python calc library (`src/calc/`) and corpus validator (`src/corpus/`, `scripts/validate_corpus.py`) were ported to TypeScript and deleted after a parity gate — do not resurrect them. Structured corpus records still live under `data/` (validated against `schemas/` by the TS validator).

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

# Google Workspace check (opens a browser OAuth consent flow on first run)
uv run python scripts/check_google_workspace.py
```

Requires Python >=3.12. Use `uv` for everything Python (per user global instructions).

Website (run from `web/`; Node >= 20.19):

```bash
cd web
npm run dev                  # local dev server
npm run build                # prod build (prebuild runs the corpus validator)
npm run test                 # vitest (calc, records, validator, components)
npm run lint                 # eslint
npm run typecheck            # tsc --noEmit
npm run validate             # validate data/ records against schemas/ (TS validator)
npm run typegen              # regenerate src/lib/records/types.gen.ts from schemas/ (committed; must be diff-free)
```

## Architecture

### Website (`web/`)

Next.js App Router + TypeScript (strict), Tailwind v4 + CSS Modules hybrid; all pages SSG (`generateStaticParams` + `dynamicParams = false`, `trailingSlash: true`), default Node output. The site is **record-driven**:

- **Route** `web/src/app/[slug]/page.tsx` renders every calculator page from its record in `data/calculators/`; `web/src/components/tool/toolRegistry.ts` maps calculator id → island component (default `CalculatorTool`; `calculator.cbm` → the custom `CbmCalculator` island). Server HTML carries formula/example/FAQ/JSON-LD for crawlability.
- **Calc library** `web/src/lib/calc/` — pure functions (`inventory.ts`, `freight.ts`), guards (`errors.ts`), units (`units.ts`), half-to-even formatting (`formatting.ts`). `registry.ts` maps each formula record id → its function + `positiveInputs`; this is the traceability contract. Pages compute via the registry, never by reimplementing a formula.
- **Corpus validator** `web/src/lib/corpus/` + `web/scripts/validate-corpus.ts` (Ajv 2020) — validates `data/` against `schemas/`, enforces the grounding contract and calculator cross-checks; wired into `prebuild`.
- **Records loader** `web/src/lib/records/records.ts` — typed frozen imports of all `data/` records; types generated from `schemas/` into committed `types.gen.ts` (`npm run typegen` must produce no diff).
- **Design system** — tokens as CSS custom properties in `web/src/styles/tokens.css`, lifted from the HTML mockups in `docs/mockups/` (the visual source of truth).
- **Ads/consent/analytics scaffolds** — `components/ads/AdSlot` (reserved heights, gated on `NEXT_PUBLIC_ADS_ENABLED` + consent), `ConsentBanner`/`useConsent`, and `web/src/lib/analytics/` (typed event union that structurally cannot carry user input values; no-op transport until GA4).

### Ingestion pipeline (`src/ingestion/qdrant_pipeline.py`)

The core Python module. `scripts/ingest_qdrant.py` is a thin CLI wrapper that adds `src/` to the path and calls `main()`.

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
  `data/calculators/**` (page specs), validated against JSON Schemas in
  `schemas/` by `web/src/lib/corpus/` (`cd web && npm run validate`). The
  schemas enforce the grounding contract: `grounding: corpus` requires a
  `citation` (source_file + chunk_index); `grounding: external` requires named
  `sources` (the freight formula records are `external`, cited to carrier/IATA/ISO
  sources). Freight reference tables: `dimensional_weight_divisors.json` is
  `status: verified` against carrier sources (effective 2026-07-02; USPS row
  needs re-verification 2026-07-12); the other three are `status: needs_sourcing`
  stubs — do not treat their values as verified. The validator also cross-checks
  calculators:
  `formula_ids` must exist, inputs must cover the formula's inputs (an input also
  counts as covered if another referenced formula outputs it — chained inputs),
  result cards must be formula outputs, and `related_tools` must resolve.
- **Page specs**: `data/calculators/*.json` define the seven pages
  (inputs/results/copy/FAQ/related tools/schema). Cross-cutting page standards
  (layout, validation, disclaimers, SEO/schema) are in `docs/MVP_PAGE_SPECS.md`.
  Pages compute via the calc registry, never by reimplementing a formula.
- **Calc library** `web/src/lib/calc/` (TypeScript — the single source of truth
  for formula execution): pure functions per formula (`inventory.ts`,
  `freight.ts`), input guards (`errors.ts`), unit conversion (`units.ts`),
  half-to-even formatting (`formatting.ts`). `registry.ts` maps each formula
  record id → its function; this is the traceability contract. Adding a formula =
  author the record + implement the TS function + add a registry entry; the
  record-driven tests (`web/src/lib/calc/__tests__/records.test.ts`) then run its
  worked examples through the library automatically.

### Google Workspace check (`scripts/check_google_workspace.py`)

Standalone OAuth (installed-app flow) script that verifies Drive + Sheets read access using the corpus Shared Drive and formula workbook IDs. Caches the token at `GOOGLE_TOKEN_CACHE_PATH` and auto-refreshes consent if saved scopes are missing. Read-only scopes only.

## Configuration & secrets

- The Python scripts read `.env.local` via a local `load_env` (uses `os.environ.setdefault`, so real env vars win). Copy `.env.example` → `.env.local` and fill values.
- The website reads `web/.env.local` (copy from `web/.env.example`): `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_ADS_ENABLED`, `NEXT_PUBLIC_GA4_ID`.
- `.env`, `.env.*` (except `.env.example`), and `secrets/` are gitignored and **sensitive** — do not read, print, or commit them unless the user explicitly asks.
- Generated data goes under `data/{raw,interim,processed,exports}/` — all gitignored.

## Conventions

- Formula/calculation logic lives in TypeScript (`web/src/lib/calc/`) as pure, testable functions with example-based Vitest tests, kept separate from UI/content rendering (see `CONTRIBUTING.md` and `docs/TECHNICAL_ARCHITECTURE.md`).
- Avoid regulated/compliance claims, freight-rate guarantees, or definitive duty/tax advice in any calculator content.
- When adding a corpus field or calculator, update the relevant `docs/` file (`CORPUS_DESIGN.md`, `TECHNICAL_ARCHITECTURE.md`, `DEVELOPMENT_PLAN.md`) plus tests.
- The three large research markdown files under `docs/project/` are source material — cite/summarize them, don't overwrite.
