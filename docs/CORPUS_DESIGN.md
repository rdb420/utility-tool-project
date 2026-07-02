# Corpus Design

## Goal

Convert the logistics, planning, weight, dimensions, inventory, and operations corpus into structured data that can power calculator pages, explanations, examples, validation tests, and SEO content.

The corpus should not be a pile of articles. It should become a set of typed records with traceable sources, formulas, units, assumptions, examples, and warnings.

## Two Corpus Layers

The corpus is split into two layers with different jobs. Keep them separate.

### Layer 1: Knowledge base (grounding layer) — built

The source books are ingested into a searchable hybrid-vector knowledge base and
used for grounding, citation, and research. This layer exists today.

- Source: 18 supply-chain, logistics, inventory, and air-cargo texts in
  `corpus-logistics-supply-chain/*.md`.
- Pipeline: `src/ingestion/qdrant_pipeline.py` (run via `scripts/ingest_qdrant.py`)
  chunks each book (~2,800 chars, 350 overlap), embeds every chunk with the
  hugging face embeddings sidecar, and upserts into Qdrant.
- Embeddings: MiniLM dense (384-dim), ColBERTv2 late-interaction multivector
  (128-dim, MAX_SIM), and SPLADE learned-sparse — all via the sidecar.
- Store: Qdrant collection `logistics_supply_chain_hybrid_v1` (~5,056 chunks),
  with named vectors `dense`, `multi`, and `sparse`.
- Query: `src/retrieval/qdrant_search.py` (run via `scripts/search_corpus.py`)
  runs fused dense + sparse retrieval reranked by ColBERT and returns passages
  with `source_file` and `chunk_index` for citation.

This layer is what makes "corpus-backed explanations" real: every formula record
below is grounded in retrieved passages, not invented.

### Layer 2: Structured product records (product layer) — to build

Curated, typed records (Formula, Unit, Calculator, Reference Table) that the
calculation library and website consume. Each record is authored by querying
Layer 1, quoting the relevant passage, and recording the citation. Records are
hand-authored JSON/YAML/CSV under `data/processed/`, validated by tests.

The relationship is one-directional: **Layer 1 grounds Layer 2.** The website
never queries Qdrant at request time; it consumes validated Layer 2 artifacts.

## Core Record Types

### Formula

Use for any reusable calculation.

Recommended fields:

| Field | Purpose |
|---|---|
| `id` | Stable machine identifier, such as `inventory.reorder_point.basic` |
| `name` | Human-readable formula name |
| `category` | Inventory, freight, packaging, margin, workforce, safety |
| `description` | Short explanation of what it calculates |
| `inputs` | Typed input list with units and validation rules |
| `outputs` | Typed output list with units |
| `expression` | Canonical formula expression |
| `assumptions` | Conditions required for the formula to be valid |
| `limitations` | Known cases where the formula is insufficient |
| `examples` | Worked examples with expected results |
| `sources` | References or source notes |
| `citations` | Knowledge-base grounding: list of `{source_file, chunk_index, quote}` from Layer 1 retrieval |
| `grounding` | `corpus` (formula found in KB), `corpus_concept` (KB defines the concept but not the constants), or `external` (KB has no formula; sourced elsewhere) |
| `disclaimer_level` | `none`, `estimate`, `regional`, or `professional_review` |

### Unit

Use for dimensions, weight, volume, time, cost, and rates.

Recommended fields:

| Field | Purpose |
|---|---|
| `id` | Stable identifier, such as `unit.length.cm` |
| `name` | Display name |
| `symbol` | `cm`, `in`, `kg`, `lb`, `m3`, etc. |
| `dimension` | Length, weight, volume, time, currency |
| `base_unit` | Unit used internally for calculations |
| `conversion_factor` | Conversion factor to base unit |
| `precision` | Default display precision |

### Calculator

Use for public tool definitions.

Recommended fields:

| Field | Purpose |
|---|---|
| `id` | Stable page/tool identifier |
| `slug` | Public URL slug |
| `title` | Page title |
| `primary_keyword` | SEO target |
| `secondary_keywords` | Supporting search terms |
| `formula_ids` | Formula records used by the calculator |
| `input_groups` | UI grouping for inputs |
| `result_cards` | Outputs shown to the user |
| `copy_blocks` | Intro, formula explanation, examples, FAQ |
| `related_tools` | Internal links |
| `schema_types` | WebApplication, FAQ, Breadcrumb, Organization |

### Reference Table

Use for lookup-style data such as carrier divisors, service-level z-scores, pallet sizes, carton types, and regional defaults.

Recommended fields:

| Field | Purpose |
|---|---|
| `id` | Stable table identifier |
| `name` | Human-readable name |
| `region` | Global, US, AU, UK, EU, carrier-specific, etc. |
| `effective_date` | Date the values apply from, when known |
| `rows` | Structured lookup rows |
| `source` | Source reference or internal note |
| `source_type` | `official_standard`, `carrier_published`, `public_reference`, or `internal_assumption` |
| `review_frequency` | How often the values should be checked |

Note: several freight reference tables (carrier dimensional-weight divisors, NMFC
freight classes) are **not** present in the knowledge base and must be sourced
externally from carrier and NMFTA publications, labelled with `effective_date`
and a review frequency. See the coverage note below.

## Knowledge-Base Coverage of the Formula Backlog

The backlog below was checked against Layer 1 by hybrid search
(`scripts/search_corpus.py`). The corpus is a supply-chain / inventory-management
textbook set, so coverage is uneven and this drives cluster sequencing:

- **Inventory and pricing formulas are strongly grounded.** Explicit expressions,
  worked examples, and safety-factor tables are present in the corpus.
- **Freight and dimensional-weight formulas are only conceptually grounded.** The
  corpus defines dimensional weight, density, and chargeable weight but contains
  no modern carrier DIM divisors (e.g. 139 / 166 / 5000 / 6000), no NMFC
  freight-class tables, no clean metric-CBM formula, and no parcel girth formula.
  These constants must be sourced externally and stored as dated reference tables.

`grounding` values below: `corpus` = formula found in KB; `concept` = KB defines
the idea but not the constants; `external` = not in KB, source elsewhere.

### Initial Formula Backlog (grounded)

Inventory (grounding: `corpus`):

- Reorder point: `ROP = (avg daily demand x lead time) + safety stock`.
  Cite: `312523353-The-Definitive-Guide-to-Inventory-Management.md#chunk42,44`;
  `376190909-Distribution-Planning-and-Control-...#chunk481`.
- Safety stock, service-level method: `SS = Z x sigma_L`, where
  `sigma_L = sqrt(LT x sigmaD^2 + D^2 x sigmaLT^2)` and `Z` comes from a
  service-level safety-factor table (95% -> 1.65, 98% -> 2.05, 99% -> 2.33).
  Cite: `376190909-...#chunk480,483` (Table 8.4);
  `479665818-Total-SupplyChain-Man-pdf.md#chunk102`; `470379145-LEAN-...#chunk197`.
- Safety stock, min/max method: `Max = (D x LT) + (Z x sigma x sqrt(LT))`.
  Cite: `376190909-...#chunk484`.
- EOQ: `EOQ = sqrt( (2 x D x OrderCost) / (CarryingRate x UnitCost) )`.
  Cite: `376190909-...#chunk490` (Exercise 8.8); `479665818-...#chunk101`.
- Inventory turnover: `COGS / average inventory value` (annual-usage x unit-cost basis also used).
  Cite: `376190909-...#chunk446,455`; `402402904-Best-Practice-...#chunk30`.
- Days / stock cover: `stock cover (weeks) = (stock value / annual usage) x 52`;
  stockturn is the reciprocal; unit basis is `available stock / avg daily demand`.
  Cite: `402402904-...#chunk38`.
- Carrying cost: `carrying cost = carrying-cost% x average inventory value`;
  `carrying-cost% = annual carrying costs / average inventory value`.
  Cite: `376190909-...#chunk424,425`.
- Stockout cost: components are lost sales + backorder costs; optimal-service-level
  form: `cost of lost sales = margin x (Z-factor gap) x demand/day`.
  Cite: `376190909-...#chunk425,426`; `497915534-Supply-Chain-Optimization-...#chunk137`.
- ABC classification: Pareto 80/20, classify SKUs by turnover value into A/B/C(/D).
  Cite: `479665818-...#chunk105`; `402402904-...#chunk30,34,35`.
- Periodic-review target level: `TI = D(L + T) + Z x sigmaD x sqrt(L + T)`.
  Cite: `376190909-...#chunk485,486,463,464`.

Pricing adjacency (grounding: `corpus`):

- Margin pricing: `price = cost / (1 - margin_rate)`.
  Cite: `376190909-...#chunk722`.
- Markup: `price = cost x (1 + markup_rate)`; margin vs markup distinction.
  Cite: `376190909-...#chunk722`.
- Break-even units: `fixed cost / (price - variable cost per unit)`.
  Cite: `376190909-...#chunk722,723,226`.
- Landed cost per unit: `product cost + freight + duties + insurance + handling + customs`
  (framed within total cost of ownership).
  Cite: `376190909-...#chunk724,1014`; `312523353-...#chunk53`.

Freight and packaging (grounding: `concept` unless noted):

- Dimensional weight: KB defines it as `shipment volume / minimum density requirement`,
  divisor varies by carrier — **DIM divisor constants are `external`.**
  Cite (concept): `275257364-Air-Cargo-Basics.md#chunk6`.
- Chargeable weight: `max(actual gross weight, dimensional weight)` — concept implied
  by the KB glossary; confirm the rule against a `carrier_published` source.
  Cite (concept): `275257364-...#chunk11`.
- Freight density: `weight / volume`; density is a core rate driver in the KB, but
  the **NMFC freight-class mapping is `external`.**
  Cite (concept): `203953709-Handfield-...#chunk229`; `376190909-...#chunk897`.
- Cubic / carton volume and CBM: KB has warehouse cube examples in ft^3; the clean
  metric `CBM = L x W x H (m) x qty` formula is **`external`** (author from unit conversions).
  Cite (concept): `376190909-...#chunk811,836`.
- Pallet / cube utilization: `cases per pallet = pallet cube / case cube`; cube
  utilization applies aisle and honeycombing allowances (grounding: `corpus`).
  Cite: `376190909-...#chunk835,836`.
- Length-plus-girth for parcel limits: **not in KB; `external`** (carrier limits).

## Data Quality Rules

- Every formula must include at least one worked example.
- Every formula record must carry either a `corpus` citation (source_file + chunk)
  or, when `grounding` is `external`, a named authoritative source.
- Prefer worked examples lifted from the knowledge base so expected results are
  traceable to a cited passage.
- Every calculator must have deterministic test cases before public launch.
- Units must be converted internally before formula execution.
- Regional or carrier-specific defaults must be labelled clearly.
- Any lookup table that can change needs a review frequency.
- Source notes should distinguish official standards, public references, and internal assumptions.

## Suggested Storage

Start simple:

```text
data/
├── raw/          # Original source files, not committed if large or licensed.
├── interim/      # Normalized intermediate files.
├── processed/    # Validated JSON or CSV consumed by the app.
└── exports/      # Generated public artifacts.
```

Use JSON or YAML for hand-authored formula records and CSV for tabular lookup data. Add a database only when file-based records become hard to validate or query.
