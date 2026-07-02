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
  `EMBEDDINGS_URL`. Not part of this repo; see the sidecar README in `docs/`.
- Vector store: Qdrant Cloud collection `logistics_supply_chain_hybrid_v1`
  (~5,056 chunks) with named vectors `dense` (384-dim, cosine), `multi` (128-dim
  ColBERT, MAX_SIM), and `sparse` (SPLADE, IDF). Configured via `QDRANT_URL`,
  `QDRANT_API_KEY`, `QDRANT_COLLECTION`.
- Retrieval: `src/retrieval/qdrant_search.py` (CLI `scripts/search_corpus.py`)
  runs fused dense + sparse prefetch reranked by ColBERT and returns passages
  with `source_file` and `chunk_index` for citation.

Boundary rule: retrieval feeds the corpus-authoring workflow (Layer 2 records in
`docs/CORPUS_DESIGN.md`). The website does not call Qdrant or the sidecar.

### Corpus Tooling

Responsible for:

- Grounding each record by querying the knowledge base (retrieval component above)
  and recording `source_file` + `chunk_index` citations.
- Normalizing formulas, units, terms, reference tables, examples, and warnings.
- Validating required fields, citations, and grounding levels.
- Exporting processed JSON or CSV.

Suggested location:

- `scripts/` for conversion commands.
- `schemas/` for record definitions.
- `data/processed/` for generated artifacts.

### Calculation Engine

Responsible for:

- Unit conversion.
- Formula execution.
- Input validation.
- Output rounding and formatting.
- Deterministic examples used by tests and documentation.

Suggested location:

- `src/` for Python validation and formula prototypes.
- Later, a shared TypeScript or generated artifact layer if the frontend executes formulas client-side.

### Public Website

Responsible for:

- Tool UI.
- SEO metadata.
- Internal links.
- Formula explanations.
- FAQ and schema markup.
- Result export or copy actions.

Recommended implementation options:

| Option | Fit |
|---|---|
| Static site with client-side calculators | Best for speed, low hosting cost, and simple formulas |
| Next.js or similar server-rendered app | Best if tool pages need dynamic routing, CMS-like content, or richer exports |
| Python web app | Useful for internal tooling, less ideal for static SEO calculators unless needed |

The repo should not lock into a frontend framework until the first data artifacts and formula tests are stable.

### Analytics and Feedback

Responsible for:

- Search Console indexing and query feedback.
- GA4 or privacy-friendly analytics.
- Tool usage events.
- Error and validation telemetry.
- Revenue and conversion tracking once monetization begins.

## Formula Execution Strategy

Start with pure functions and tests. Avoid API calls for the MVP.

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
