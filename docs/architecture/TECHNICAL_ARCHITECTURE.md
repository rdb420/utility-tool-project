# Technical Architecture

## Architecture Goal

Keep the system boring, testable, and content-friendly. The corpus conversion workflow should produce stable artifacts that the website can consume without coupling page rendering to raw research files.

## Suggested Boundaries

```text
Raw corpus (source books)
  -> ingestion pipeline (chunk + hybrid embed)
  -> Qdrant knowledge base  <--- retrieval/grounding query layer
  -> curated formula and reference records (cited from the KB)
  -> validated formula and reference artifacts (data/processed)
  -> calculation library tests
  -> website tool pages
  -> analytics and search feedback
```

The knowledge base is a build-time and authoring-time grounding tool, not a
request-time dependency of the website. Public pages consume validated artifacts.

## Components

### Knowledge Base and Retrieval

Responsible for turning the source books into a searchable, citable grounding
layer. This component exists today.

- Ingestion: `src/ingestion/qdrant_pipeline.py` (CLI `scripts/ingest_qdrant.py`)
  normalizes and chunks each markdown book (~2,800 chars, 350 overlap), embeds
  every chunk with the embeddings sidecar, and upserts to Qdrant with idempotent
  `uuid5` point IDs.
- Embeddings sidecar: an external FastAPI service (`fastembed`) exposing MiniLM
  dense, ColBERTv2 late-interaction, and SPLADE sparse endpoints. Configured via
  `EMBEDDINGS_URL`. Not part of this repo; see the sidecar README in
  `docs/architecture/qdrant-docs/`.
- Vector store: Qdrant Cloud collection `logistics_supply_chain_hybrid_v1`
  (~5,056 chunks) with named vectors `dense` (384-dim, cosine), `multi` (128-dim
  ColBERT, MAX_SIM), and `sparse` (SPLADE, IDF). Configured via `QDRANT_URL`,
  `QDRANT_API_KEY`, `QDRANT_COLLECTION`.
- Retrieval: `src/retrieval/qdrant_search.py` (CLI `scripts/search_corpus.py`)
  runs fused dense + sparse prefetch reranked by ColBERT and returns passages
  with `source_file` and `chunk_index` for citation.

Boundary rule: retrieval feeds the corpus-authoring workflow (Layer 2 records in
`docs/architecture/CORPUS_DESIGN.md`). The website does not call Qdrant or the sidecar.

### Corpus Tooling

Responsible for:

- Grounding each record by querying the knowledge base (retrieval component above)
  and recording `source_file` + `chunk_index` citations.
- Normalizing formulas, units, terms, reference tables, examples, and warnings.
- Validating required fields, citations, and grounding levels.

Location (decided):

- `schemas/` for record definitions (JSON Schema draft 2020-12).
- `data/formulas/`, `data/reference_tables/`, `data/calculators/` for the
  committed, hand-authored records.
- Validation is TypeScript: `web/src/lib/corpus/` with the CLI
  `web/scripts/validate-corpus.ts` (`cd web && npm run validate`), run
  automatically before every production build (`prebuild`). The former Python
  validator (`src/corpus/`, `scripts/validate_corpus.py`) was ported to TS and
  deleted after a parity gate.

### Calculation Engine

Responsible for:

- Unit conversion.
- Formula execution.
- Input validation.
- Output rounding and formatting.
- Deterministic examples used by tests and documentation.

Location (decided):

- `web/src/lib/calc/` — a pure TypeScript library (`inventory.ts`, `freight.ts`,
  `errors.ts`, `units.ts`, `formatting.ts` with half-to-even rounding) that runs
  client-side in the calculator islands. It is the **single source of truth** for
  formula execution; the original Python prototype (`src/calc/`) was ported and
  deleted after a behavioral/numeric parity gate.
- `registry.ts` binds each `data/formulas/**` record id to its function
  (record-driven execution); Vitest runs every record's worked examples through
  the real library.

### Public Website

Responsible for:

- Tool UI.
- SEO metadata.
- Internal links.
- Formula explanations.
- FAQ and schema markup.
- Result export or copy actions.

Implementation (decided, built at `web/`):

- **Next.js App Router + TypeScript (strict)**, styled with Tailwind v4 +
  CSS Modules (hybrid: Tailwind for layout/utilities, modules for signature
  components; design tokens as CSS custom properties from `docs/mockups/`).
- All pages are **statically generated** (`generateStaticParams` +
  `dynamicParams = false`, trailing-slash canonicals) with the default Node
  output — route handlers stay possible for future features.
- Pages are **record-driven**: the `[slug]` route renders each calculator from
  its `data/calculators/` record; formula, worked example, FAQ, and JSON-LD are
  in the server HTML for crawlability. Calculators run as client islands over
  the shared calc library.

### Analytics and Feedback

Responsible for:

- Search Console indexing and query feedback.
- GA4 or privacy-friendly analytics.
- Tool usage events.
- Error and validation telemetry.
- Revenue and conversion tracking once monetization begins.

## Formula Execution Strategy

Decided: formulas execute **client-side** via the pure TypeScript library
(`web/src/lib/calc/`), addressed by formula record id through the registry.
No API calls; every calculator produces a result offline. The knowledge base
remains a build-time/authoring-time Python tool and is never a request-time
dependency of the site.

Example rule:

> A calculator page may use reference data, but it should still produce a result when offline if the formula is static.

For high-risk or changing data:

- Carrier divisors should be configurable.
- Freight class should be approximate and labelled.
- Landed cost should avoid tax or duty guarantees.
- Regional defaults should show the region and review date.

## Testing Strategy

Minimum required tests:

- Unit conversion tests.
- Formula example tests.
- Input validation tests.
- Rounding and display tests.
- Corpus schema validation tests.

Pre-launch browser checks:

- Mobile and desktop layout.
- No overlapping result text.
- Tool usable without scrolling past ads.
- Metadata and schema valid.
- Sitemap and robots files present.

## Technical SEO Requirements

Every public tool page should include:

- One clear H1.
- Title tag and meta description.
- Canonical URL.
- WebApplication schema.
- FAQ schema where useful.
- Breadcrumb schema.
- Fast mobile rendering.
- Related tool links.
- Formula and examples visible in HTML, not hidden behind an app-only shell.

## Security and Privacy

- The Qdrant API key and any embeddings-sidecar credentials live in `.env.local`
  only. The knowledge base holds licensed source-book text, so keep it private and
  do not expose Qdrant or the sidecar to the public website.
- Do not inspect or commit `.env`, `.env.*`, or `secrets/`.
- Do not store user-entered calculator data unless a feature explicitly requires it.
- Keep file uploads client-side where possible.
- Avoid collecting operationally sensitive shipment or inventory data before there is a privacy model.
