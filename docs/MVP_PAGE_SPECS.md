# MVP Page Specifications — Inventory Cluster

This is the implementation contract for the first public calculator cluster. The
**per-page specifics** (inputs, outputs, copy, FAQ, related tools, schema types)
live as validated records in [`data/calculators/`](../data/calculators); this
document defines the **cross-cutting standards** every page must follow. Together
they are meant to be enough to build the pages without reopening the research
reports.

The freight calculators (dimensional weight, CBM, chargeable weight) are **not**
in this MVP — they are blocked on external reference-table sourcing
(`data/reference_tables/freight/`). See `docs/DEVELOPMENT_PLAN.md` Phase 1b/2.

## The six pages

| Slug | Calculator record | Formula | Primary keyword |
|---|---|---|---|
| `/reorder-point-calculator/` | `calculator.reorder_point` | `inventory.reorder_point.basic` | reorder point calculator |
| `/safety-stock-calculator/` | `calculator.safety_stock` | `inventory.safety_stock.service_level` | safety stock calculator |
| `/eoq-calculator/` | `calculator.eoq` | `inventory.eoq.basic` | eoq calculator |
| `/inventory-turnover-calculator/` | `calculator.inventory_turnover` | `inventory.turnover.cogs` | inventory turnover calculator |
| `/days-of-inventory-calculator/` | `calculator.days_of_cover` | `inventory.days_of_cover.basic` | days of inventory calculator |
| `/inventory-carrying-cost-calculator/` | `calculator.carrying_cost` | `inventory.carrying_cost.basic` | inventory carrying cost calculator |

Each record's `input_groups`, `result_cards`, `copy_blocks`, `related_tools`, and
`schema_types` define that page. Validation guarantees every calculator's inputs
cover its formula's inputs and every result card is a real formula output
(`scripts/validate_corpus.py`).

## Where computation happens

Pages compute results with the `src/calc` library, addressed by the formula id in
`formula_ids` via `calc.registry.FORMULA_REGISTRY`. Inputs are keyed by the
`symbol` field, which matches the formula record's input symbols. No page should
reimplement a formula; if a result cannot be produced by the library, the page
is not ready.

## Page layout (all pages)

1. **H1** = page `title`. One H1 per page.
2. **Tool first**: inputs and the primary result card above the fold, usable on
   mobile without scrolling past ads.
3. **Result cards**: primary result emphasised; secondary results below.
4. **Copy below the tool**, in this order: `intro`, `how_it_works`,
   `formula_explanation`, `worked_example`, then the FAQ.
5. **Formula and worked example rendered in HTML** (not hidden behind the app
   shell) so the content is crawlable.
6. **Related tools** block linking every id in `related_tools`.
7. **Disclaimer** appropriate to the record's `disclaimer_level` (see below).

## Input validation behavior

Client-side validation must mirror the calc library's guards so the UI and engine
never disagree:

- Required inputs must be present; optional inputs use the record `default`.
- All numeric inputs must be finite numbers; reject text and blanks with an
  inline message.
- Inputs with `min: 0` reject negatives.
- Divisor inputs must be greater than zero: `avg_inv` (turnover, carrying cost),
  `D` (days of cover), and `k` and `UC` (EOQ). The library raises `ValidationError`;
  the UI should prevent submission and explain which field is invalid.
- On any validation error, show the message near the field and do not display a
  stale result. Emit a `calculator_validation_error` analytics event.

## Result display

- Round for display with `calc.formatting` (default 2 decimals; trim trailing
  zeros). Never round the value used in chained calculations.
- Show the unit from the result card.
- Offer copy-to-clipboard for each result; CSV export of the entered scenario is
  a nice-to-have, not required for launch.
- Emit `calculator_start`, `calculator_result`, and `result_copy` events (see
  `docs/GOOGLE_SETUP.md`); never send raw operational values, only that the event
  occurred.

## Disclaimer copy

Keyed to the record's `disclaimer_level`:

- `none` — no disclaimer needed (pure arithmetic ratios).
- `estimate` — "This is a planning estimate. Results depend on your inputs and
  assumptions; confirm against your own data before ordering." Show which
  assumptions apply (from the formula record).
- `regional` / `professional_review` — not used in this cluster, but reserved for
  freight/landed-cost pages.

State the formula, its assumptions, and when to confirm with a professional. Do
not present estimates as guarantees.

## SEO and metadata (all pages)

- Title tag from `title`; meta description from `meta_description` (<= 320 chars).
- Canonical URL at the page's own slug.
- Primary keyword in the H1, title, and first paragraph; secondary keywords used
  naturally in copy, not stuffed.
- Breadcrumb: Home > Inventory calculators > this tool.
- Internal links to `related_tools` and a cluster hub page.

## Schema.org (JSON-LD)

Emit the types listed in each record's `schema_types`:

- `WebApplication` — name = title, applicationCategory = BusinessApplication,
  offers price 0.
- `FAQPage` — built from `copy_blocks.faq` (question/answer pairs).
- `BreadcrumbList` — the breadcrumb trail above.

FAQ markup must match the visible FAQ text exactly.

## Trust pages required before launch

Independent of the calculators, the site needs privacy policy, terms, contact,
and about pages, plus sitemap, robots, and canonical handling (see
`docs/DEVELOPMENT_PLAN.md` Phase 4 and `docs/GOOGLE_SETUP.md` before AdSense).

## Exit criteria (Phase 3)

- Every MVP page has a validated calculator record and a formula the calc library
  can execute. (Met — see `scripts/validate_corpus.py` and `tests/test_calculators.py`.)
- Inputs, outputs, validation, copy, FAQ, related tools, disclaimer, and schema
  are specified per page without reference to the research reports. (Met.)
