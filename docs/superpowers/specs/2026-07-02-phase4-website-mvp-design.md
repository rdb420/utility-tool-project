> **Design spec for Phase 4 as approved and implemented; see git history for the build.**
> Captured from the approved implementation plan (2026-07-02). An "Implementation notes"
> appendix at the end records deltas between this plan and what shipped.

# Phase 4: OpsCrunch Website MVP — Next.js + TypeScript

## Context

Phases 0–3 are done: six inventory formulas are implemented as pure Python functions (`src/calc/`), grounded formula/calculator records live under `data/` validated against `schemas/`, and a complete design system exists as HTML mockups (`docs/mockups/`: brand kit, calculator kit, AdSense kit, working CBM prototype). Phase 4 — the public website — is the bottleneck. No frontend exists.

**Goal:** build the OpsCrunch site as a Next.js (App Router) + TypeScript app at `web/`, port the Python calc library + corpus validation to TS, and ship **seven calculator pages** (six inventory + CBM freight calculator from the prototype, with divisors labelled unverified estimates) plus home, two cluster hubs, legal pages, and full SEO plumbing. Qdrant ingestion/retrieval stays Python untouched. Python `src/calc`/`src/corpus` are **deleted after a parity gate**.

**User decisions (fixed):** hybrid styling (Tailwind v4 for layout/utilities + CSS Modules for signature components, tokens as CSS custom properties); `web/` subdirectory in this repo; delete Python calc/corpus after parity; scope = six inventory + CBM.

**Key design decisions:**
- **D1** Default Node output (no `output: 'export'`) — all pages SSG via `generateStaticParams` + `dynamicParams=false`, but route handlers stay possible (bulk/accounts roadmap). `trailingSlash: true` (canonicals in specs use trailing slashes).
- **D2** Record types generated from `schemas/*.json` via `json-schema-to-typescript` (committed `types.gen.ts`) + Ajv 2020 runtime validation (matches Python's Draft202012Validator).
- **D3** Parity is behavioral + numeric (error templates, exception hierarchy, half-to-even rounding, tolerances), not Python-repr-identical.
- **D4** CBM is a custom client island over the shared calc library — **no calculator.schema.json changes**. One TS-validator rule addition: a formula input counts as satisfied if it's an output of another referenced formula (chargeable weight consumes `VW` produced by volumetric weight).
- **D5** Cluster (inventory/freight) derived from `formula_ids[0]` prefix, not stored.
- **D6** No writes to `data/` until the Python deletion gate passes — new freight records would break the current Python validator/tests. `uv run pytest` stays green throughout.

## Phase 0 — Scaffold `web/`

1. `npx create-next-app@latest web` (TS, Tailwind v4, App Router, `src/` dir, ESLint). Node ≥ 20.19.
2. `web/next.config.ts`: `trailingSlash: true`, `outputFileTracingRoot: path.join(__dirname, '..')`.
3. `web/tsconfig.json`: strict, `resolveJsonModule`, paths `@/*`, `@data/*` → `../data/*`, `@schemas/*` → `../schemas/*`.
4. Dev deps: `vitest`, `@vitejs/plugin-react`, `@testing-library/react`, `@testing-library/user-event`, `jsdom`, `tsx`, `ajv`, `json-schema-to-typescript`.
5. Scripts: `dev`, `build` (`prebuild: npm run validate`), `lint`, `typecheck`, `test` (vitest run), `validate` (`tsx scripts/validate-corpus.ts`), `typegen`.
6. `web/.env.example` (`NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_ADS_ENABLED=false`, `NEXT_PUBLIC_GA4_ID=`); `web/src/config/site.ts` (name, base URL, ads flag, enabled slots `['A','D']`). Root `.gitignore`: `web/node_modules/`, `web/.next/`.

## Phase 1 — Calc library port (`web/src/lib/calc/`)

- **`errors.ts`** — `CalculationError` > `ValidationError` > `IncompatibleUnitsError` (set `name`, `Object.setPrototypeOf`). `requireNumber` rejects booleans/NaN/±Infinity; `requireNonNegative`, `requirePositive` — same message templates as `src/calc/errors.py`.
- **`units.ts`** — exact `_UNITS` map from `src/calc/units.py` (bases cm/kg/cm³; `lb: 0.45359237`, `in3: 16.387064`); `convert`, `dimensionOf` with same error semantics.
- **`formatting.ts`** — `roundResult`: **half-to-even** on the decimal expansion (Python `round` semantics — NOT `toFixed`): long `toFixed(precision+30)` expansion, inspect digits past `precision`, true tie → round to even; normalize `-0` → `0`; throw on `precision < 0`. `formatResult`: round → `toFixed(precision)` → strip trailing zeros then dangling dot → append unit (exact trim order from `formatting.py`).
- **`inventory.ts`** — six pure functions, identical guards (positive: `k`,`UC` in EOQ; `avg_inv` in turnover; `D` in days-of-cover), no internal rounding.
- **`freight.ts`** *(new)* — `cbmFromCm`, `volumetricWeightKg/Lb`, `chargeableWeight = max`, `containerFillPct`, same guard functions.
- **`registry.ts`** — `FORMULA_REGISTRY: Record<string, {compute(inputs): outputs; positiveInputs: readonly string[]}>` with the six exact ids/symbol wirings from `src/calc/registry.py:18-37`. `positiveInputs` is the machine-readable mirror of the `>0` guards, consumed by UI validation (test proves 0 throws for each listed symbol).

**Vitest** (`web/src/lib/calc/__tests__/`): line-for-line ports of `tests/test_calc_{inventory,units,formatting}.py` + rounding-tie pins (`round(2.5)=2`, `round(2.675,2)=2.67`, `round(0.125,2)=0.12` — cross-checked against Python before deletion); `records.test.ts` (record-driven: every formula example through registry, `|computed−expected| ≤ tolerance ?? 1e-6`; expected ids; corpus-grounded ⇒ citations; freight stubs flagged `needs_sourcing`); `calculators.test.ts` (id→slug map, slug uniqueness, input coverage, first example produces every result-card symbol, related_tools connected) — ported from `tests/test_corpus_records.py` + `tests/test_calculators.py`.

## Phase 2 — Records, types, TS corpus validation

1. `web/scripts/generate-record-types.ts` → committed `web/src/lib/records/types.gen.ts`.
2. `web/src/lib/records/records.ts` — static imports of all `data/calculators/*.json`, `data/formulas/**/*.json`, z-factor + freight reference tables; typed frozen exports `CALCULATORS`, `FORMULAS_BY_ID`, `Z_FACTORS`, `DIM_DIVISORS`; helpers `calculatorBySlug`, `clusterOf`, `relatedTools`. Vitest test globs `../data` via `fs` and asserts every file is registered.
3. `web/src/lib/corpus/validate.ts` — replicates `src/corpus/validation.py` exactly: four glob→schema kinds, Ajv 2020 with same error-string format (`"{rel}: {path or (root)}: {message}"`, sorted), unique ids, citation `source_file` exists in `../corpus-logistics-supply-chain/*.md`, calculator integrity (formula_ids exist; input coverage; result-card symbols ∈ referenced outputs; related_tools resolve).
4. `web/scripts/validate-corpus.ts` — CLI with identical `OK: N corpus record(s) valid.` / `FAILED:` output; wired into `prebuild` + a Vitest test (`ok === true`, `checked >= 16`).
5. Negative-path fixture tests (broken schema, dup id, dangling formula_id, missing input, bad result-card symbol, unknown related tool, bad citation) — inline fixtures, never mutate real `data/`.

## Phase 3 — Design system: tokens + layout

1. `web/src/styles/tokens.css` — all custom properties lifted verbatim from the mockups: `--ink #14181e, --ink-2 #1c232c, --paper #f1f3ef, --surface #fff, --signal #ee5a1c, --signal-press #cf4a11, --amber #ffb020, --good #1f7a54, --slate #3a4855, --muted #6c7681, --line #e0e2db, --line-2 #cfd2c9, --warn #b23b1a`; radii 6/9/14; spacing 4/8/12/16/22/34; `--sans`/`--mono` system stacks (no web fonts); `--shadow` (tool card only).
2. `web/src/styles/globals.css` — imports tokens + `@import "tailwindcss"` + `@theme inline` mapping Tailwind tokens to the same custom properties. Global `prefers-reduced-motion` kill-switch (blink/flash/chevron).
3. Server layout components: `Wordmark.tsx`+module (ops+crunch, signal "crunch", blinking amber cursor 1.15s steps), `AppBar.tsx` (sticky ink bar, 2px signal border, nav Inventory/Freight), `Breadcrumb.tsx`, `Footer.tsx`, `app/layout.tsx` (`metadataBase`, ConsentBanner mount).

## Phase 4 — Generic calculator island + page template + SEO

**Route** `web/src/app/[slug]/page.tsx`: `generateStaticParams()` from `CALCULATORS`, `dynamicParams = false`, `generateMetadata()` from record (title, meta_description, canonical `/${slug}/`). Server-rendered anatomy (fixed order): Breadcrumb → H1 + one-liner → **tool island** → Nudge → copy blocks (intro, how_it_works, formula_explanation with server-rendered `FormulaBlock`, worked_example) → AdSlot A → FAQ → AdSlot D → BenchTiles → Disclaimer → JSON-LD. Formula/example/FAQ in server HTML (crawlability + AI citation).

**Island dispatch:** `web/src/components/tool/toolRegistry.ts` maps calculator id → component; default `CalculatorTool`, `calculator.cbm` → `CbmCalculator` (Phase 6). Records passed as plain-JSON props.

**`CalculatorTool.tsx`** (`'use client'`): string state per input symbol (record defaults); validation mirrors the library exactly (required, finite, `min:0` rejects negatives, `positiveInputs` reject ≤0; inline error near field; no stale result; emit `calculator_validation_error`; `ValidationError` from compute caught as backstop). "Crunch it" (click/Enter) → compute → raw values kept for chaining, display via `formatResult`. Emits `calculator_start`, `calculator_result`, `result_copy` — ids/slugs only, never input values.

Tool components (`web/src/components/tool/`): `ToolShell`(+module, 2-col grid, collapse ≤820px), `InputField`, `DimsRow`, `UnitToggle` (real buttons, `aria-pressed`), `CrunchButton` (signal bg, 3px amber focus ring, ⏎), `AdvancedPanel` (`aria-expanded`), `Readout`(+module: ink-2, scanline, 4px signal bar, amber mono 3rem glow, result-flash keyframe), `DerivedRow`, `CopyRow`+`useClipboard` (clipboard + textarea fallback), `Toast`.

Content components (`web/src/components/content/`, server): `CopyBlocks`, `FormulaBlock`(+module: ink bg, mono, amber expression), `Faq`, `BenchTiles` (4-col, `TrackedLink` emits `related_tool_click`), `Nudge` (dashed, inert), `Disclaimer` (keyed to `disclaimer_level`, lists formula `assumptions`).

**SEO:** `web/src/lib/seo/jsonld.ts` — `webApplication` (BusinessApplication, price 0), `faqPage` (built from the same `copy_blocks.faq` the component renders — exact-match guaranteed), `breadcrumbList`; emitted per record `schema_types` via `JsonLd.tsx`. Component tests: crunch first worked example through the rendered island → every result card shows expected formatted value; FAQ JSON-LD text equality.

## Phase 5 — Parity gate + Python deletion (blocking gate)

**Gate (all must pass before deleting anything):**
1. `cd web && npm run test` green (incl. record-driven + calculators suites).
2. `uv run pytest` green (both stacks side by side, `data/` untouched).
3. `npm run validate` output identical to `uv run python scripts/validate_corpus.py` (`OK: 16 corpus record(s) valid.`).
4. Rounding-tie pins cross-checked against Python.

**Delete:** `src/calc/`, `src/corpus/`, `scripts/validate_corpus.py`, `tests/test_calc_{inventory,units,formatting}.py`, `tests/test_calculators.py`, `tests/test_corpus_records.py`.
**Keep:** `src/ingestion/`, `src/retrieval/`, `scripts/{ingest_qdrant,search_corpus,check_google_workspace}.py`, Qdrant tests.
**Cleanup:** remove `jsonschema` from pyproject (validation.py was its only user — verified), `uv lock && uv sync`, confirm `uv run pytest` + `uv run ruff check .` green.

## Phase 6 — CBM: freight records + custom island (after gate only)

1. TS-validator chaining rule (D4): `missing = referencedInputs − calcInputs − referencedOutputs`, with fixture test.
2. New formula records `data/formulas/freight/` — all `grounding: "external"` + named sources (IATA TACT, carrier service guides, ISO 668), `disclaimer_level: "estimate"`: `freight.cbm.basic` (L,W,H cm, Q → CBM m³; example {120,80,100,10}→9.6), `freight.volumetric_weight.divisor` (…, divisor → VW; example ÷6000 → 1600), `freight.chargeable_weight.basic` (VW, AW → CW=max).
3. `data/calculators/cbm.json` → `calculator.cbm`, slug `cbm-calculator`, three formula_ids, input groups Shipment (L,W,H,Q) + Carrier & mode (divisor default 6000, AW optional), result cards CBM (primary)/VW/CW, full copy blocks + FAQ, related_tools into inventory cluster, `disclaimer_level: "estimate"`.
4. Registry entries for the three freight ids (`positiveInputs: ['divisor']`).
5. `data/reference_tables/freight/container_volumes.json` stub (`needs_sourcing`: 20ft 33 / 40ft 67 / 40ftHC 76 / 53ft 114 m³).
6. `web/src/components/cbm/`: `freightModes.ts` (MODES air 6000/express 5000/usparcel 139/usps 166/sea/custom, container volumes — Vitest asserts they match the reference-table records); `useCbm.ts` (typed port of the ~140-line prototype IIFE: live recalc, unit map, unit↔mode↔weight coupling with manual-override flags, carrier rounding — inch ceil, next-lb / 0.5 kg, sea revenue tonnes, container fill incl. >100% → N units; math delegates to `lib/calc/freight.ts`); `CbmCalculator.tsx` (reuses ToolShell/UnitToggle/AdvancedPanel/Readout/CopyRow/Toast; kg/lb toggle; local `formatGrouped` via `toLocaleString('en-US')` — m³ 3dp, kg 1dp, lb 0dp).
7. Unverified labelling: divisor options + hint carry "unverified estimate — confirm against your carrier's current service guide"; standard estimate Disclaimer; "Copy full" uses `${SITE_URL}/cbm-calculator/`.
8. Bump validate checked-count (≥20); add cbm to slug-map test.

## Phase 7 — Supporting pages, ads/consent, analytics

1. **Home** `app/page.tsx`: wordmark hero, cluster tile sections linking all seven tools + hubs, Organization JSON-LD.
2. **Hubs** `app/inventory-calculators/page.tsx`, `app/freight-calculators/page.tsx` — filter by `clusterOf`, tiles, intro, canonical.
3. **Legal** (plain TSX + shared `Prose.tsx`; no MDX): `privacy-policy`, `cookie-policy`, `terms`, `contact` (mailto), `about`. Linked from Footer.
4. `app/sitemap.ts`, `app/robots.ts`, `public/ads.txt` (placeholder comment), `app/not-found.tsx`.
5. **Ads** `components/ads/AdSlot.tsx`+module — reserved heights (A: 280/250px eager; D: 250px lazy via IntersectionObserver), mono "Advertisement" label, deliberately plain hatch styling, renders only if `NEXT_PUBLIC_ADS_ENABLED` **and** consent. Only A+D placed; an ad never touches the tool shell.
6. **Consent** `ConsentBanner.tsx` — first-visit accept/decline in localStorage, `useConsent()` consumed by AdSlot + analytics; comment marking future IAB TCF v2.2 CMP + Consent Mode v2 swap-in.
7. **Analytics** `lib/analytics/` — typed event union (`calculator_start | calculator_result | calculator_validation_error | result_copy | result_export | related_tool_click`) whose payload types structurally cannot carry input values; `track()` with swappable transport (no-op now, GA4 later), consent-aware.

## Phase 8 — Docs + final verification

**Update docs** (all reference `src/calc`/`validate_corpus.py`): `CLAUDE.md` (web/ commands + architecture, repoint calc/validation), `README.md`, `CONTRIBUTING.md`, `docs/{CORPUS_DESIGN,TECHNICAL_ARCHITECTURE,DEVELOPMENT_PLAN,MVP_PAGE_SPECS}.md`, `data/README.md`, `data/reference_tables/README.md`, `schemas/README.md`, `scripts/README.md`, `src/README.md`, `tests/README.md`. Also save this plan as the design spec at `docs/superpowers/specs/2026-07-02-phase4-website-mvp-design.md`.

**Verification (in order):**
1. `npm run typegen` (no diff), `npm run lint`, `npm run typecheck`.
2. `npm run validate` → `OK: 20 corpus record(s) valid.`
3. `npm run test` all green.
4. `npm run build` — all pages prerendered; sitemap/robots/ads.txt present.
5. Manual walkthrough: each of 7 tools crunched with its worked example → matches expected; inline validation errors, no stale results; copy+toast; CBM coupling/rounding/container fill; keyboard-only pass; reduced-motion.
6. CLS sanity (ad placeholders reserve height); view-source shows formula/example/FAQ/JSON-LD in server HTML.
7. `uv run pytest` (Qdrant only) + `uv run ruff check .` green; clean `git status`.

## Orchestration (sub-agent work breakdown)

| Chunk | Scope | Depends on |
|---|---|---|
| A | Phase 0 scaffold + Phase 3 tokens/layout | — (first, alone) |
| B | Phase 1 calc port + tests | A |
| C | Phase 2 typegen/records/validator | A (parallel with B) |
| D | Phase 4 island + template + SEO | A, B, C |
| F | Phase 7 pages/ads/consent/analytics | A, C (parallel with D) |
| G | Phase 5 parity gate + Python deletion | B, C (before E) |
| E | Phase 6 freight records + CBM | D, G |
| H | Phase 8 docs + verification | all |

Rule: **no writes to `data/` before G completes.** Commits at chunk boundaries.

## Implementation notes (appendix)

Deltas between this plan and the delivered build:

- **21 records, not 20**: the final corpus count is 21 (`npm run validate` reports
  `OK: 21 corpus record(s) valid.`), one more than the plan's Phase 6 estimate.
- **Chunk F commit**: committed by the orchestrator after the implementing agent hit
  its session limit; the work itself is as specified.
- **CBM divisor editing**: manually editing the divisor value flips the carrier mode
  to `custom` (rather than leaving the selected mode displayed with a divergent value).
- **CBM readout weight toggle**: the kg/lb toggle in the CBM readout is a local
  control, not the shared `UnitToggle` component.
