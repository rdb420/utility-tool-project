# Operations Utility Toolkit

Documentation and project scaffold for an SEO-driven utility website focused on logistics, inventory planning, packaging, dimensional weight, freight, and operations calculators.

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
│   ├── retrieval/                # Hybrid search over the knowledge base
│   ├── corpus/                   # Record validation against schemas
│   └── calc/                     # Pure calculation library (inventory formulas)
├── scripts/                      # CLI entry points (ingest, search, validate, checks)
├── data/
│   ├── formulas/                 # Hand-authored, KB-grounded formula records
│   ├── calculators/              # MVP page specs (validated calculator records)
│   └── reference_tables/         # Lookup tables (z-factors, freight sourcing)
└── tests/
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

This repo is prepared for a Python-first corpus and formula-engine workflow using `uv`.

```bash
uv sync
uv run pytest
uv run ruff check .
```

Working with the knowledge base and corpus records (needs `.env.local`; copy from
`.env.example`):

```bash
uv run python scripts/search_corpus.py "reorder point formula"   # query the KB
uv run python scripts/ingest_qdrant.py --dry-run                 # (re)build the KB
uv run python scripts/validate_corpus.py                         # validate records vs schemas
```

No production app framework has been selected yet. The likely split is:

- Python for corpus conversion, formula validation, fixtures, and data QA.
- A static or server-rendered web app for the public calculators.
- JSON/CSV artifacts as the contract between corpus tooling and the website.

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

The knowledge base is built and searchable, and the first corpus record schemas
and grounded inventory formula records exist (reorder point, safety stock, EOQ,
inventory turnover, days of cover, carrying cost), each cited to source passages
and validated against the schemas.

Corpus coverage is asymmetric: the inventory and pricing formulas are strongly
grounded in the source books, while the freight and dimensional-weight formulas
are only conceptually grounded — carrier DIM divisors, NMFC freight classes, and
parcel girth limits are not in the corpus and are tracked as an external-sourcing
task (`data/reference_tables/freight/`).

The calculation library (`src/calc/`) implements and tests all six inventory
formulas, and the MVP page specifications for the inventory cluster are authored
as validated calculator records in `data/calculators/` (see
[MVP Page Specs](docs/MVP_PAGE_SPECS.md)).

Next milestones: build the public inventory calculator cluster (Phase 4) from
these specs, and source the freight reference tables to unblock the freight
cluster. See [Development Plan](docs/DEVELOPMENT_PLAN.md).
