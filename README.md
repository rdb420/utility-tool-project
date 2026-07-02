# Operations Utility Toolkit

An SEO-driven utility website (OpsCrunch) focused on logistics, inventory planning, packaging, dimensional weight, freight, and operations calculators. The public site lives at `web/` (Next.js + TypeScript); Python tooling maintains the grounding knowledge base.

The source research under `docs/project/` points to a clear first-build direction: avoid generic utility-site competition and start with a focused B2B operations cluster. The recommended wedge is an inventory replenishment calculator suite, followed by freight and dimensional weight tools.

## Project Direction

Build a practical web toolkit for operators who need fast answers to common planning questions:

- When should I reorder stock?
- How much safety stock should I hold?
- What is my EOQ, inventory cover, or stockout risk?
- What is the dimensional, volumetric, or chargeable weight of this shipment?
- What is the CBM, freight density, pallet usage, or approximate freight class?
- How do landed costs, freight costs, margins, and reorder decisions interact?

The project should prioritize accurate formulas, transparent assumptions, fast page loads, clean mobile UX, and corpus-backed explanations over thin calculator pages.

## First Product Cluster

Phase 1 should focus on inventory planning:

- Reorder point calculator
- Safety stock calculator
- EOQ calculator
- Inventory turnover calculator
- Days of inventory cover calculator
- Carrying cost calculator
- Stockout cost calculator
- Inventory audit checklist
- CSV or spreadsheet export for entered scenarios

Phase 2 should expand into logistics and packaging:

- Dimensional weight calculator
- Volumetric weight calculator
- CBM calculator
- Freight density calculator
- Chargeable weight calculator
- Pallet utilization calculator
- Carton and package volume calculator
- Freight quote checklist

## Repository Layout

```text
.
├── README.md
├── CONTRIBUTING.md
├── CLAUDE.md                      # Guidance for AI coding agents
├── pyproject.toml
├── .env.example                  # Template for .env.local (placeholders only)
├── corpus-logistics-supply-chain/ # 18 source books (markdown) — the raw corpus
├── docs/
│   ├── PROJECT_BRIEF.md
│   ├── RESEARCH_SYNTHESIS.md
│   ├── CORPUS_DESIGN.md
│   ├── TECHNICAL_ARCHITECTURE.md
│   ├── DEVELOPMENT_PLAN.md
│   ├── MVP_PAGE_SPECS.md
│   ├── GOOGLE_SETUP.md
│   ├── GOOGLE_CONNECTIONS.md
│   ├── project/                  # Source research reports (input material)
│   └── qdrant-docs/              # Reference docs for the KB / embeddings stack
├── schemas/                      # JSON Schema for corpus records
├── src/
│   ├── ingestion/                # Corpus -> Qdrant hybrid-vector pipeline
│   └── retrieval/                # Hybrid search over the knowledge base
├── scripts/                      # Python CLI entry points (ingest, search, checks)
├── data/
│   ├── formulas/                 # Hand-authored formula records (inventory + freight)
│   ├── calculators/              # Page specs (validated calculator records)
│   └── reference_tables/         # Lookup tables (z-factors, freight sourcing)
├── web/                          # The public site: Next.js App Router + TypeScript
│   ├── src/app/                  # Pages (record-driven [slug] route, home, hubs, legal)
│   ├── src/lib/calc/             # TS calculation library (single source of truth)
│   ├── src/lib/corpus/           # TS corpus validator (data/ vs schemas/)
│   └── scripts/                  # validate-corpus.ts, generate-record-types.ts
└── tests/                        # Python tests (Qdrant pipeline/retrieval only)
```

The three original markdown research documents live under `docs/project/` as source material.

## Knowledge Base

The source books are ingested into a **hybrid-vector knowledge base** (Qdrant
collection `logistics_supply_chain_hybrid_v1`, ~5,056 chunks) using MiniLM dense,
ColBERTv2 late-interaction, and SPLADE sparse embeddings served by an external
Hugging Face sidecar. This knowledge base is the grounding layer: every formula
record cites the source passages it was derived from. See
[Corpus Design](docs/CORPUS_DESIGN.md) for the two-layer corpus model.

## Local Workflow

### Website (`web/`)

Next.js App Router + TypeScript. Requires Node >= 20.19.

```bash
cd web
npm install
npm run dev        # local dev server
npm run test       # vitest
npm run validate   # validate data/ records against schemas/
npm run build      # static production build (prebuild runs the validator)
```

Live pages: seven calculators (`/reorder-point-calculator/`,
`/safety-stock-calculator/`, `/eoq-calculator/`,
`/inventory-turnover-calculator/`, `/days-of-inventory-calculator/`,
`/inventory-carrying-cost-calculator/`, `/cbm-calculator/`), the home page, two
cluster hubs (`/inventory-calculators/`, `/freight-calculators/`), and legal
pages (privacy, cookies, terms, contact, about), plus sitemap/robots/ads.txt.

### Knowledge-base tooling (Python)

Python is now KB tooling only, run with `uv` (needs `.env.local`; copy from
`.env.example`):

```bash
uv sync
uv run pytest
uv run ruff check .
uv run python scripts/search_corpus.py "reorder point formula"   # query the KB
uv run python scripts/ingest_qdrant.py --dry-run                 # (re)build the KB
```

The split of responsibilities:

- TypeScript (`web/`) for the public calculators, formula execution, and corpus
  record validation.
- Python for knowledge-base ingestion and retrieval (grounding/citation).
- Validated JSON records under `data/` as the contract between corpus authoring
  and the website.

## Documentation Map

- [Project Brief](docs/PROJECT_BRIEF.md): product positioning, audience, goals, and scope.
- [Research Synthesis](docs/RESEARCH_SYNTHESIS.md): decisions extracted from the three source reports under `docs/project/`.
- [Corpus Design](docs/CORPUS_DESIGN.md): proposed data model for logistics, inventory, formulas, dimensions, and assumptions.
- [Technical Architecture](docs/TECHNICAL_ARCHITECTURE.md): suggested system boundaries and implementation approach.
- [Development Plan](docs/DEVELOPMENT_PLAN.md): staged plan from repo setup through launch.
- [MVP Page Specs](docs/MVP_PAGE_SPECS.md): the implementation contract for the first inventory calculator cluster.
- [Google Setup](docs/GOOGLE_SETUP.md): Google Cloud, Workspace API, Search Console, GA4, Ads, and AdSense setup checklist.
- [Google Connections](docs/GOOGLE_CONNECTIONS.md): actual project IDs, Drive/Sheets links, and local verification workflow.

## Current Status

Phase 4 (website MVP) is built. The site at `web/` serves seven calculator pages
(six inventory + the CBM/freight calculator, whose carrier divisors are labelled
unverified estimates), record-driven from validated calculator records in
`data/calculators/`. Formula execution and corpus validation are TypeScript
(`web/src/lib/calc/`, `web/src/lib/corpus/`); the former Python calc library and
validator were deleted after a parity gate.

The knowledge base is built and searchable, and grounded formula records exist
for the six inventory formulas (cited to source passages) plus three freight
formulas (`grounding: external`, with named carrier/IATA/ISO sources).

Corpus coverage remains asymmetric: inventory and pricing formulas are strongly
grounded in the source books, while carrier DIM divisors, NMFC freight classes,
and parcel girth limits are not in the corpus — the freight reference tables
under `data/reference_tables/freight/` are still `needs_sourcing` stubs pending
verification.

Next milestones (Phase 5): production domain, Search Console, GA4 wiring, and
AdSense application, plus verifying the freight reference tables. See
[Development Plan](docs/DEVELOPMENT_PLAN.md).
