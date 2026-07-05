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
and cite formula records. See `docs/architecture/CORPUS_DESIGN.md` (Two Corpus Layers) and
`docs/architecture/TECHNICAL_ARCHITECTURE.md` (Knowledge Base and Retrieval).

Deliverables:

- Ingestion pipeline `src/ingestion/qdrant_pipeline.py` (`scripts/ingest_qdrant.py`).
- Qdrant collection `logistics_supply_chain_hybrid_v1` (~5,056 chunks) with dense,
  ColBERT multivector, and sparse vectors.
- Retrieval module `src/retrieval/qdrant_search.py` (`scripts/search_corpus.py`).

Exit criteria:

- Hybrid search returns relevant, citable passages for the inventory and pricing
  formula backlog. Verified — see the coverage note in `docs/architecture/CORPUS_DESIGN.md`.

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

Google Drive/Sheets (verified in `docs/launch/GOOGLE_CONNECTIONS.md`) remain the
collaborative surface for formula inventories and keyword matrices; validated
records are synced into `data/processed/`.

Exit criteria:

- Every sample formula has inputs, outputs, expression, assumptions, limitations,
  examples, and either a `corpus` citation or a named `external` source.
- Tests fail when a required corpus field or citation is missing.
- Freight reference tables carry an effective date and review frequency.

## Phase 2: Calculation Library

Status: complete. Originally implemented in Python (`src/calc/`), then ported to
TypeScript during Phase 4 and the Python version deleted after a parity gate.

Implemented in `web/src/lib/calc/`: pure functions per formula (`inventory.ts`,
`freight.ts`, `pricing.ts` — 24 formulas after the Phase 6 expansion), input
validation (`errors.ts`), unit conversion (`units.ts`), result formatting
(`formatting.ts`), and a `registry.ts` that binds each formula record id to its
function. The record-driven test runs every corpus worked example through the
real library, so results trace to a cited corpus example. Freight results were
labelled estimates until the reference tables were verified (now done — see the
Phase 6 status note).

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
6. [done] Freight calculation functions implemented; their reference tables
   have been sourced and verified (see the Phase 6 status note).

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
cross-cutting standards are in `docs/planning/MVP_PAGE_SPECS.md`.

Exit criteria:

- The MVP page specs are clear enough to implement without revisiting the research
  documents. (Met.)
- Every page has a validated record whose result the calc library can produce,
  enforced by the corpus validator (`cd web && npm run validate`) and the
  record-driven Vitest suites. (Met.)

## Phase 4: Website MVP

Status: delivered (2026-07-02). Built as a Next.js App Router + TypeScript app
at `web/` (design spec:
`docs/planning/superpowers/specs/2026-07-02-phase4-website-mvp-design.md`). Shipped:

- The six inventory calculator pages plus `/cbm-calculator/` (CBM, volumetric
  weight, chargeable weight, container fill), with carrier DIM divisors
  labelled as unverified estimates.
- Home page, inventory and freight cluster hubs, privacy/cookie/terms/contact/
  about pages, sitemap, robots, ads.txt, canonical URLs, and JSON-LD
  (WebApplication, FAQPage, BreadcrumbList).
- Formula execution client-side via the TS calc library; corpus validation in
  TS wired into the build; ad, consent, and analytics scaffolds (GA4 wiring
  landed and was verified in Phase 5).

Goal:

Build the first public calculator cluster.

Requirements (met):

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

Status: live (deployed 2026-07-03; production state re-verified 2026-07-04). The
ordered launch checklist is `docs/launch/LAUNCH_RUNBOOK.md`.

Done and verified live (2026-07-04):

- Deployed to Vercel (push-to-`main`); apex `opscrunch.com` primary, `www`
  308-redirects to apex, HTTPS valid.
- SEO plumbing serving correctly: `sitemap.xml`, `robots.txt`, apex canonicals,
  and the real `ads.txt` line (`pub-9610958335722543`).
- Analytics events: typed `track()` union in `web/src/lib/analytics/` —
  `calculator_start` / `calculator_result` etc. reach `dataLayer` with only
  `toolId` + `slug` (no input values); events are wired into every calculator.
- AdSense account association meta (`NEXT_PUBLIC_ADSENSE_ACCOUNT`) ships in
  `<head>`; the `adsbygoogle.js` tag loads for ad serving/review only (no longer
  a CMP). Ad units remain gated off (`NEXT_PUBLIC_ADS_ENABLED=false`) until
  approval + a wired `<ins>` unit.

Shipped 2026-07-05 — consent/analytics rebuild + calculator UX:

- **Consent/analytics stack rebuilt**: consentmanager CMP **173918** (the old
  173913 was deleted and rebuilt) loads site-wide from the root layout via
  `next/script` `afterInteractive` (consentmanager's official Next.js SSR
  method); GTM `GTM-NRM7V3BN` loads via `@next/third-parties`
  `<GoogleTagManager>` (container id in code — `NEXT_PUBLIC_GTM_ID` retired);
  GTM container **v11 published** with GA4 (`G-7XG10CD70E`) fully
  consent-gated — the config tag fires only on `cmpConsentVendors contains
  ,s26,` and all 5 event tags fire on trigger groups (event AND consent). GA4
  dashboard config is done (6 custom dimensions, key events); built/verified
  via the admin API scripts. See `docs/launch/GTM_SETUP.md`.
- **Privacy-policy page** rebuilt as a static page with consentmanager 173918
  widgets (policy content, cookie list, inline preferences box, build-time
  vendor list).
- **JS-API wrapper** `web/src/lib/consent/cmp.ts` + a Footer "Cookie settings"
  button that opens the CMP preference manager.
- **Calculator UX**: all 24 tools now prefill worked-example defaults
  (inventory records gained defaults; freight/pricing already had them) and
  every tool has a shared analytics-silent "Clear inputs" button.

**Single open blocker:** consentmanager's delivery pipeline compiles an empty
vendor/purpose list for this account (banner shows 0 vendors, so `,s26,` is
never granted and GA4 stays dark — the safe state). Support ticket sent
2026-07-05; post-fix checklist in runbook §6c.

Pending (user actions, in runbook order):

- consentmanager support fix + post-fix checklist (verify vendors at
  `?cmpconsole`, set "Read from IAB TCF" OFF on 173918, confirm GA4 fires in
  DebugView) — runbook §6c.
- Search Console: verification is DONE (DNS TXT `google-site-verification` on
  the Cloudflare zone, confirmed 2026-07-04). Remaining: submit the sitemap and
  request indexing (runbook §5).
- `/cookie-policy/` page copy is still the older hand-written text — refresh
  once the CMP vendor list delivers (runbook §6c).
- AdSense application — last, only after indexing and traffic (the certified
  TCF v2.2 CMP requirement is met by consentmanager 173918) — runbook §7.
- USPS DIM divisor 166→139 change staged on branch `usps-dim-139-2026-07-12`;
  merge on/after 2026-07-12 (runbook §8).

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

Status: delivered (2026-07-03). The cluster expansion shipped 17 new calculators
(24 pages total):

- **8 freight tools** — freight class (estimated on the current
  13-subprovision FCDC density scale, effective 2025-07-19), dimensional
  weight, volumetric weight, chargeable weight, freight density, pallet,
  carton volume, and length-and-girth.
- **5 pricing tools (new cluster)** — margin, markup, break-even, discount
  impact, and landed cost.
- **4 inventory extras** — stockout cost, safety stock with lead-time
  variability, periodic review, and ABC analysis (built as a custom
  multi-row tool).

**Packaging cost and cycle count planner were skipped — no formula/method is
defined in the docs or corpus; they need definition before building.**

The freight cluster is no longer blocked on external sourcing: carrier DIM
divisors and the NMFC freight-class table are verified (divisors 2026-07-02;
NMFC 13-sub scale effective 2025-07-19), and parcel girth limits are partially
verified (UPS and Australia Post rows only — the remaining rows and container
volumes still need sourcing).

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

Resolved (2026-07-02, Phase 4):

- Public frontend framework: **Next.js App Router + TypeScript**, statically
  generated, at `web/`.
- Formula execution: **client-side TypeScript library**
  (`web/src/lib/calc/`), the single source of truth; the Python calc library
  was deleted after a parity gate, so nothing is shared across stacks.
- Layer 2 record format: **JSON** under `data/`, validated by the TS validator.
- Analytics event taxonomy: typed event union scaffolded in
  `web/src/lib/analytics/` (calculator_start, calculator_result,
  calculator_validation_error, result_copy, result_export,
  related_tool_click); delivered to GA4 via GTM (`sendGTMEvent` → `dataLayer`
  → consent-gated GA4 tags in container v11).
- Analytics provider + consent: **GA4 via GTM, gated by consentmanager CMP
  173918** (certified IAB TCF v2.2) — resolved 2026-07-05; only the
  consentmanager vendor-list delivery bug remains open (support ticket).
- Exports: copy-to-clipboard shipped; CSV/PDF downloads deferred.

Still open:

- None architectural; operationally, the consentmanager vendor-list fix
  (see Phase 5).

## Near-Term Next Step

The site is live; the consent/analytics stack (consentmanager 173918 + GTM
v11, fully consent-gated GA4) shipped 2026-07-05. The near-term work is
operational, not code: (1) get consentmanager to fix the empty vendor-list
delivery, then run the runbook §6c post-fix checklist (vendors at
`?cmpconsole`, "Read from IAB TCF" OFF, GA4 DebugView); (2) confirm Search
Console verification + submit the sitemap; (3) merge the staged USPS divisor
change on 2026-07-12; (4) monitor Search Console/GA4 for a few weeks and fix
technical SEO/UX before adding tools. AdSense stays deferred until there is
indexed organic traffic (the certified TCF v2.2 CMP requirement is met).

The freight sourcing task (`data/reference_tables/freight/`) is largely closed:
carrier DIM divisors and NMFC classes are verified (divisors 2026-07-02, NMFC
13-sub scale effective 2025-07-19), and parcel girth limits are partially
verified (UPS and Australia Post rows only). Still open: container volumes and
the remaining girth rows need sourcing. The USPS divisor 166→139 change
(effective 2026-07-12) is **staged** on branch `usps-dim-139-2026-07-12`,
ready to merge on the effective date.
