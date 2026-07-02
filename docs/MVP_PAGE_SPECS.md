# MVP Page Specifications — Inventory Cluster

This is the implementation contract for the first public calculator cluster. The
**per-page specifics** (inputs, outputs, copy, FAQ, related tools, schema types)
live as validated records in [`data/calculators/`](../data/calculators); this
document defines the **cross-cutting standards** every page must follow. Together
they are meant to be enough to build the pages without reopening the research
reports.

The CBM / chargeable-weight page (`/cbm-calculator/`) shipped alongside this
cluster — see the addendum at the end of this document. The full freight and
pricing clusters shipped later (2026-07-03) with carrier DIM divisors and the
NMFC 13-subprovision class table verified against dated sources; parcel girth
limits are partially verified and container volumes remain `needs_sourcing`
(`data/reference_tables/freight/`). See `docs/DEVELOPMENT_PLAN.md` Phase 6.

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
(`cd web && npm run validate`).

## Where computation happens

Pages compute results with the TypeScript calc library (`web/src/lib/calc/`),
addressed by the formula id in `formula_ids` via
`web/src/lib/calc/registry.ts` (`FORMULA_REGISTRY`). Inputs are keyed by the
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

- Round for display with the library's formatting helpers
  (`web/src/lib/calc/formatting.ts`; default 2 decimals, half-to-even, trim
  trailing zeros). Never round the value used in chained calculations.
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
  can execute. (Met — see `web/scripts/validate-corpus.ts` and the record-driven
  Vitest suites under `web/src/lib/calc/__tests__/`.)
- Inputs, outputs, validation, copy, FAQ, related tools, disclaimer, and schema
  are specified per page without reference to the research reports. (Met.)

## Addendum (2026-07-02): CBM / freight page and chained inputs

- `/cbm-calculator/` (`calculator.cbm`, record `data/calculators/cbm.json`)
  shipped as part of the Phase 4 build. It is a **custom client island**
  (`web/src/components/cbm/CbmCalculator.tsx`) rather than the generic
  record-driven `CalculatorTool` — it adds live recalculation, unit/mode/weight
  coupling, and carrier rounding — but its math still delegates to the shared
  calc library (`web/src/lib/calc/freight.ts`), and the page is otherwise
  rendered from its record like every other calculator. Carrier DIM divisors are
  labelled unverified estimates (`disclaimer_level: estimate`).
- **Chained-input rule** (corpus validator): a formula input counts as covered
  by a calculator if it is an **output of another formula the calculator
  references** — e.g. chargeable weight consumes the `VW` produced by the
  volumetric-weight formula, so `VW` needs no input field.
