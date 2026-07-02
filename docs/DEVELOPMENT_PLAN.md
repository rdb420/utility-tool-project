# Development Plan

## Objective

Turn the research and corpus into a public operations utility toolkit, starting with inventory planning calculators and expanding into freight, dimensions, packaging, and landed-cost workflows.

## Phase 0: Repository Foundation

Status: completed.

Deliverables:

- Root `README.md`.
- Documentation under `docs/`.
- Python project metadata in `pyproject.toml`.
- Placeholder directories for data, schemas, scripts, source code, and tests.
- Ignore rules for local environments, generated data, build outputs, and secrets.

Exit criteria:

- A contributor can understand what the project is, where docs live, and what the first product cluster is.

## Phase 1a: Knowledge Base Ingestion

Status: completed.

The source books are ingested into a hybrid-vector knowledge base used to ground
and cite formula records. See `docs/CORPUS_DESIGN.md` (Two Corpus Layers) and
`docs/TECHNICAL_ARCHITECTURE.md` (Knowledge Base and Retrieval).

Deliverables:

- Ingestion pipeline `src/ingestion/qdrant_pipeline.py` (`scripts/ingest_qdrant.py`).
- Qdrant collection `logistics_supply_chain_hybrid_v1` (~5,056 chunks) with dense,
  ColBERT multivector, and sparse vectors.
- Retrieval module `src/retrieval/qdrant_search.py` (`scripts/search_corpus.py`).

Exit criteria:

- Hybrid search returns relevant, citable passages for the inventory and pricing
  formula backlog. Verified — see the coverage note in `docs/CORPUS_DESIGN.md`.

## Phase 1b: Corpus Schema and Grounded Records

Goal:

Define the structured records (Layer 2) that turn the knowledge base into useful
product data, each grounded in cited retrievals.

Tasks:

1. Create schema files for formulas, units, calculators, and reference tables,
   including the `citations` and `grounding` fields.
2. Author records by querying the knowledge base with `scripts/search_corpus.py`
   and recording `source_file` + `chunk_index` for every formula.
3. Add grounded sample records for reorder point, safety stock, EOQ, inventory
   turnover, days of cover, and carrying cost (all `grounding: corpus`).
4. Source the freight reference tables that the KB does not contain — carrier DIM
   divisors, NMFC freight classes, metric-CBM conventions, parcel girth limits —
   from carrier / NMFTA publications, and store them as dated reference tables
   (`grounding: external`, with `effective_date` and `review_frequency`).
5. Write validation tests for required fields, units, examples, citations, and
   disclaimer levels.
6. Add a command that validates the processed corpus.

Google Drive/Sheets (verified in `docs/GOOGLE_CONNECTIONS.md`) remain the
collaborative surface for formula inventories and keyword matrices; validated
records are synced into `data/processed/`.

Exit criteria:

- Every sample formula has inputs, outputs, expression, assumptions, limitations,
  examples, and either a `corpus` citation or a named `external` source.
- Tests fail when a required corpus field or citation is missing.
- Freight reference tables carry an effective date and review frequency.

## Phase 2: Calculation Library

Status: inventory calculators complete; freight calculators blocked on
reference-table sourcing (Phase 1b task 4).

Implemented in `src/calc/`: pure functions for the six inventory formulas
(`inventory.py`), input validation (`errors.py`), unit conversion (`units.py`),
result formatting (`formatting.py`), and a `registry.py` that binds each formula
record id to its function. The record-driven test runs every corpus worked
example through the real library, so results trace to a cited corpus example.

Goal:

Implement the first formula engine independently of the website.

Initial calculators (corpus-grounded, build first):

- Reorder point.
- Safety stock (service-level and min/max).
- EOQ.
- Inventory turnover.
- Days of cover.
- Carrying cost.

Freight calculators (build after their external reference tables exist — see
Phase 1b task 4):

- Dimensional weight (needs carrier DIM divisors).
- CBM / carton volume (needs metric-CBM conventions).
- Chargeable weight (needs the confirmed carrier rule).

Tasks:

1. [done] Implement unit conversion helpers.
2. [done] Implement pure calculation functions (six inventory formulas).
3. [done] Write example-based tests from the corpus records.
4. [done] Add validation errors for missing, negative, or incompatible inputs.
5. [done] Add formatting helpers for units, rounding, and result summaries.
6. [pending] Implement the freight calculation functions once their reference
   tables are sourced and verified.

Exit criteria:

- Formula tests pass. (Inventory: met.)
- Every public result can be traced to a corpus example or formula record.
  (Enforced by the record-driven test via `src/calc/registry.py`.)

## Phase 3: Product Specification for MVP Pages

Status: complete for the inventory cluster.

Goal:

Define exactly what the first public pages include before choosing the frontend
implementation.

The MVP is the **inventory cluster** (all six formulas are grounded and computed
by the calc library). The freight pages are deferred until their reference tables
are sourced (Phase 1b task 4), so they are out of this MVP.

MVP pages (each defined as a validated record in `data/calculators/`):

- `/reorder-point-calculator/`
- `/safety-stock-calculator/`
- `/eoq-calculator/`
- `/inventory-turnover-calculator/`
- `/days-of-inventory-calculator/`
- `/inventory-carrying-cost-calculator/`

Each page specification includes inputs, outputs, validation behavior, formula
explanation, worked example, FAQ, related tools, disclaimer copy, and metadata /
schema requirements. Per-page detail lives in the calculator records; the
cross-cutting standards are in `docs/MVP_PAGE_SPECS.md`.

Exit criteria:

- The MVP page specs are clear enough to implement without revisiting the research
  documents. (Met.)
- Every page has a validated record whose result the calc library can produce,
  enforced by `scripts/validate_corpus.py` and `tests/test_calculators.py`. (Met.)

## Phase 4: Website MVP

Goal:

Build the first public calculator cluster.

Recommended requirements:

- Fast mobile-first UI.
- Tool visible near the top of each page.
- Formula explanation and examples below the tool.
- Internal links between related calculators.
- Privacy policy, terms, contact, and about pages.
- Sitemap, robots file, canonical URLs, and schema markup.
- No account system.
- No live freight quotes.

Exit criteria:

- Users can complete each calculator workflow on desktop and mobile.
- Pages are crawlable and include useful visible content.
- Basic analytics and Search Console setup are ready for launch.

## Phase 5: Launch and Measurement

Goal:

Publish the MVP and start collecting real search and usage feedback.

Tasks:

1. Connect production domain and HTTPS.
2. Submit sitemap to Google Search Console.
3. Verify page indexing.
4. Monitor impressions, clicks, average position, and top queries.
5. Track calculator starts, successful calculations, and export/copy actions.
6. Fix technical SEO and UX issues before adding more tools.

Exit criteria:

- Search Console shows indexed pages and query data.
- Tool usage events show whether users are completing calculations.

## Phase 6: Cluster Expansion

Goal:

Expand where early data shows traction.

Inventory candidates:

- Inventory turnover.
- Inventory days.
- Carrying cost.
- Stockout cost.
- ABC inventory.
- Cycle count planner.

Freight candidates:

- Freight density.
- Freight class estimate.
- Pallet utilization.
- Carton calculator.
- Length plus girth.
- Packaging cost.

Business adjacency:

- Landed cost.
- Margin.
- Markup.
- Discount impact.
- Break-even units.

Exit criteria:

- Expansion follows search and usage data, not only the initial idea list.

## Open Technical Decisions

- Public frontend framework.
- Whether formulas run only client-side or share generated artifacts across Python and frontend code.
- Layer 2 record format: JSON, YAML, CSV, or a small database. (The Layer 1
  knowledge base is already decided: Qdrant hybrid vectors.)
- Whether exports are simple CSV/PDF downloads or later premium features.
- Analytics provider and event taxonomy.

## Near-Term Next Step

Define schemas and grounded sample records for the first six inventory formulas,
which are fully corpus-grounded and ready to author from the knowledge base:

1. Reorder point.
2. Safety stock.
3. EOQ.
4. Inventory turnover.
5. Days of cover.
6. Carrying cost.

In parallel, open a sourcing task for the freight reference tables (carrier DIM
divisors, NMFC classes, parcel girth limits) that the knowledge base does not
contain, so the freight cluster is unblocked when inventory ships.
