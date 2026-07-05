# Launch Runbook — [opscrunch.com](http://opscrunch.com)

Ordered launch checklist for the Phase 5 go-live of the Next.js site at `web/`.
Each step is tagged with who performs it: **[user]** = manual dashboard/browser
action by the site owner, **[agent]** = can be done or verified from this repo.

Facts this runbook relies on:

- Production URL: `https://opscrunch.com` (trailing slashes on; canonicals,
sitemap, and robots all derive from `NEXT_PUBLIC_SITE_URL`).
- Hosting: Vercel project `utility-tool-project` (team `rdb420s-projects`,
project id `prj_eVDHVCA1yAsLo3PijQ82ATxQbNB1`), imported from the GitHub repo
`rdb420/utility-tool-project`. Non-secret project notes: `docs/integrations/vercel/project.txt`.
- DNS: registered domain `opscrunch.com` on Cloudflare. Credentials/records live
in `docs/cloudflare/` (gitignored — never commit or paste their contents).
- GA4 measurement ID: `G-7XG10CD70E` (tag snippet on file in
`docs/integrations/google-analytics/google-tag-G-7XG10CD70E.txt`).
- AdSense verification code on file at `docs/google-adsense/verication-code.txt`
(gitignored — reference by path only).

---

## Status snapshot (verified live 2026-07-04)

The site is **LIVE**. Sections 1–4 are done and were re-verified against the
production site on 2026-07-04:

- **§1–2 build & deploy** — `main` deploys to Vercel on push; the GA4
measurement id `G-7XG10CD70E` is baked into the client bundle and the
`NEXT_PUBLIC_ADSENSE_ACCOUNT` meta ships in `<head>`. `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`
is not set in Vercel, so the Search Console HTML-tag meta is absent — expected,
because verification is done via DNS TXT (see §5).
- **§3 domain** — apex `https://opscrunch.com/` serves 200 as the primary host;
`www` 308-redirects to apex (the canonical direction — the earlier
apex→www concern is resolved).
- **§4 post-DNS checks** — HTTPS valid, `sitemap.xml` lists the production URLs
with trailing slashes, `robots.txt` points at the apex sitemap, `ads.txt`
serves the **real** AdSense line (no longer a placeholder), home/calculator
canonicals point at apex, and calculator pages compute correctly.
- **Analytics/consent stack (rebuilt 2026-07-05, see §6c)** — GTM container
`GTM-NRM7V3BN` (published **v11**) loads via `@next/third-parties`; GA4 config
and all five event tags are hard-blocked on consent to the Google Analytics
vendor `s26` in consentmanager CMP **173918**. `calculator_start` /
`calculator_result` etc. reach `dataLayer` carrying only `toolId` + `slug`
(no input values). **Blocked:** consentmanager currently delivers an empty
vendor list for this account (support ticket sent 2026-07-05), so GA4 stays
dark — the safe state — until they fix it (§6c post-fix checklist).

**Remaining before "launched" is complete:** the consentmanager vendor-list fix
(§6c blocker), §5 Search Console (confirm verification + submit sitemap), the
GA4 **dashboard** config in §6 (done — verified via the API audit scripts), and
§7 AdSense (deferred by design). See §8 for the dated USPS divisor task.

---

## 1. One-time Vercel project setup — [user]

The repo root is a Python/docs project; the deployable app lives in `web/`.
Vercel imported the repo without detecting a framework, so this must be fixed
first or every build will fail.

- [x] In the Vercel dashboard → project `utility-tool-project` → **Settings →
  Build and Deployment → Root Directory**: set to `web`. **Required manual
  step — nothing deploys correctly until this is set.**
- [x] Confirm **Framework Preset** now shows **Next.js** (it should auto-detect
  once the root directory is `web`).
- [x] Confirm **Node.js Version** is **20.x or newer**.
- [x] Under **Settings → Environment Variables**, add for the **Production**
  environment:
  - [x] `NEXT_PUBLIC_SITE_URL` = `https://opscrunch.com`
  - [x] `NEXT_PUBLIC_GA4_ID` = `G-7XG10CD70E`
  - [x] `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` = the token from Search
    Console's **HTML tag** verification method (see section 5; you can add
    this later and redeploy, but the variable slot is listed here so it is
    not forgotten).
  - [x] `NEXT_PUBLIC_ADS_ENABLED` = `false`

Note: `NEXT_PUBLIC_SITE_URL` and `NEXT_PUBLIC_GA4_ID` also ship as fallbacks in
the committed `web/.env.production`, so a build without dashboard env vars still
produces correct canonicals. (`NEXT_PUBLIC_GA4_ID` is now vestigial — GA4 loads
via GTM with the measurement id inside the container, and the GTM container id
is in code, so `NEXT_PUBLIC_GTM_ID` in the Vercel dashboard is unused and can be
deleted; see §6c.) The Search Console verification token is **env-only** (no
committed fallback) — it must be set in Vercel.

## 2. Deploy — [user or agent]

- [x] Push `main` to GitHub (`git push origin main`). Vercel auto-builds on
  push. (Done — `main` is deployed and `origin/main` is in sync.)
- [x] Watch the build log: it should end with the static export summary showing
  **38 static pages** (24 calculator pages, 3 cluster hubs, home, 5 trust
  pages, plus 404/sitemap/robots and other generated routes). A page count
  far below that means the root-directory or env setup is wrong.
- [x] Spot-check the `*.vercel.app` preview URL: home page renders, one
  calculator computes, no console errors.

## 3. Attach the domain — [user]

- [x] Vercel → project → **Settings → Domains**: add `opscrunch.com` **and**
  `www.opscrunch.com`.
- [x] Vercel will prescribe DNS records for each. In **Cloudflare → DNS**, add
  exactly the records Vercel shows (typically an `A` record for the apex —
  historically `76.76.21.21` — and a `CNAME` to `cname.vercel-dns.com` for
  `www`, but **use the values Vercel displays**, not this document, as the
  authority).
- [x] Cloudflare proxy setting: create the records **DNS-only (grey cloud)**
  first so Vercel can issue its TLS certificates without interference. You
  can switch to proxied (orange cloud) later if you want Cloudflare's CDN
  in front; if you do, set Cloudflare **SSL/TLS mode to Full (strict)** to
  avoid redirect loops.
- [x] In Vercel's Domains settings, set one host as primary and redirect the
  other (recommended: `www.opscrunch.com` → `opscrunch.com`, 308).

## 4. Post-DNS verification — [agent-assistable]

Run after DNS has propagated (minutes to a few hours):

- [x] `https://opscrunch.com/` loads over HTTPS with a valid certificate (no
  warnings, no redirect loop).
- [x] `https://opscrunch.com/sitemap.xml` is reachable and lists **33 URLs**,
  all on `https://opscrunch.com` with trailing slashes.
- [x] `https://opscrunch.com/robots.txt` is reachable and references the
  sitemap URL on the production host.
- [x] `https://opscrunch.com/ads.txt` is reachable and serves the real
  AdSense line (`google.com, pub-9610958335722543, DIRECT, f08c47fec0942fa0`) — verified 2026-07-04.
- [x] View source on the home page and two calculator pages: `<link
  rel="canonical">`points at`[[[[https://opscrunch.com/...`]]](<https://opscrunch.com/...`]])([https://opscrunch.com/...`])([https://opscrunch.com/...`>](<https://opscrunch.com/...`])([https://opscrunch.com/...`>)]([https://opscrunch.com/...`](https://opscrunch.com/...`)](https://opscrunch.com/...`]]](https://opscrunch.com/...`]])([https://opscrunch.com/...`])([https://opscrunch.com/...`](https://opscrunch.com/...`])([https://opscrunch.com/...`)]([https://opscrunch.com/...`](https://opscrunch.com/...`)))) (not
  `*.vercel.app`, not `localhost`).
- [x] Spot-check three calculator pages end-to-end (suggested:
  `/freight-class-calculator/`, `/cbm-calculator/`,
  `/margin-calculator/`): inputs validate, results render, related-tool
  links resolve.

## 5. Google Search Console — [user]

Status note (2026-07-04): verification is **done via DNS TXT** — the Cloudflare
zone has `google-site-verification=0fdiSGWo…` on `opscrunch.com` (confirmed via
the Cloudflare API 2026-07-04). This is the Domain-property route, so the absent
HTML-tag meta (`NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` unset) is expected and
correct — no action needed here.

- [x] Add a property for the site — **Domain property** for `opscrunch.com`,
  verified via the DNS TXT record in Cloudflare (covers all
  protocols/subdomains).
- [x] Submit the sitemap: `https://opscrunch.com/sitemap.xml`.
- [x] Use **URL Inspection → Request Indexing** on the six highest-value pages:
  - [x] `https://opscrunch.com/freight-class-calculator/`
  - [x] `https://opscrunch.com/cbm-calculator/`
  - [x] `https://opscrunch.com/dimensional-weight-calculator/`
  - [x] `https://opscrunch.com/volumetric-weight-calculator/`
  - [x] `https://opscrunch.com/margin-calculator/`
  - [x] `https://opscrunch.com/break-even-calculator/`

## 6. GA4 — via GTM, consent-gated; runtime check blocked on the CMP fix

GA4 lives inside GTM (`GTM-NRM7V3BN`, see §6c and
[`docs/launch/GTM_SETUP.md`](GTM_SETUP.md)); nothing on the page calls gtag
directly and `NEXT_PUBLIC_GA4_ID` no longer drives the transport. Behaviour:
GA4 is **hard-blocked on vendor consent** — no config, no page_view, no event
hits (not even cookieless pings) until the visitor consents to the Google
Analytics vendor `s26` in consentmanager. Zero GA4 traffic before consent is
correct, not a bug.

### 6a. Runtime check — BLOCKED on the consentmanager vendor-list fix

The pre-GTM stack was verified in-browser on 2026-07-04 (historical). The
rebuilt stack cannot complete its runtime check yet: consentmanager delivers an
empty vendor list (§6c blocker), so consent to `s26` can never be granted and
GA4 stays dark. Once support fixes it, run the §6c post-fix checklist, then:

- [ ] In GA4 (property `G-7XG10CD70E`) → **Realtime**, or **Admin → DebugView**,
  accept the banner, browse two pages and run a calculator; confirm `page_view`
  and `calculator_result` arrive and that **no input values** (dimensions,
  costs, quantities) appear in the parameters — only ids/slugs.
  (If you use an ad/tracking blocker, GA hits are dropped locally — test in
  a clean profile or use GA's DebugView with the GA Debugger extension.)

### 6b. Register custom definitions — REQUIRED for reporting

GA4 collects event parameters automatically, but they are **not usable in
reports until registered**. The app's event taxonomy — the single source of
truth is `web/src/lib/analytics/events.ts` — sends exactly six parameters, and
**all six are string identifiers**. So the complete, correct setup is:

| Definition type    | Count                   | Why                                                     |
| ------------------ | ----------------------- | ------------------------------------------------------- |
| Custom dimensions  | **6** (all Event scope) | Every sent parameter is a string id                     |
| Custom metrics     | **0**                   | The taxonomy sends no numeric values (privacy contract) |
| Calculated metrics | **0**                   | They need numeric metrics as inputs, which don't exist  |

There are deliberately **no numeric parameters** (input/output values never
leave the page), so custom metrics and calculated metrics have nothing to
attach to — do **not** create any. Registration is **not retroactive**: only
data collected after a dimension exists is dimensioned.

#### Custom dimensions — Admin → Data display → Custom definitions → Custom dimensions → Create

Scope is **Event** for all six. Type the **Event parameter** exactly as shown
(camelCase, no `ep.` prefix). Suggested dimension name + description:

- [x] **Tool ID** — param `toolId` — Calculator record id, e.g.
  `calculator.pallet`. On calculator_start / result / validation_error,
  result_copy, result_export.
- [x] **Tool slug** — param `slug` — Calculator URL slug, e.g.
  `pallet-calculator` (matches the page path). Same events as Tool ID.
- [x] **Validation field** — param `field` — Input field that failed
  validation. On calculator_validation_error only (optional param).
- [x] **Copy variant** — param `variant` — Which copy button: `result` or
  `full`. On result_copy only.
- [x] **Related from tool** — param `fromToolId` — Source tool id of a
  related-tool click. On related_tool_click only.
- [x] **Related to tool** — param `toToolId` — Destination tool id of a
  related-tool click. On related_tool_click only.

#### Custom metrics — create none

- [x] Confirm no custom metrics were created. A custom metric needs a numeric
  event parameter; the taxonomy has none by design, so any custom metric would
  stay empty. Skip the Custom metrics tab entirely.

#### Calculated metrics — create none

- [x] Confirm no calculated metrics were created. They are arithmetic over
  existing metrics and cannot filter by event name, and there are no custom
  metrics to build from. For funnels/rates use an **Explore → Funnel
  exploration** (`calculator_start` → `calculator_result`, broken down by
  **Tool slug**) instead.

#### Key events — Admin → Events → Mark as key event

- [x] `calculator_result` — primary success metric. **(Done.)**
- [ ] `result_copy` — optional; "took the answer away".
- [x] `related_tool_click` — optional; cross-tool engagement.

#### Parameter → event coverage (reference)

| Event                         | toolId | slug | field | variant | fromToolId | toToolId |
| ----------------------------- | ------ | ---- | ----- | ------- | ---------- | -------- |
| `calculator_start`            | ✓      | ✓    |       |         |            |          |
| `calculator_result`           | ✓      | ✓    |       |         |            |          |
| `calculator_validation_error` | ✓      | ✓    | ✓     |         |            |          |
| `result_copy`                 | ✓      | ✓    |       | ✓       |            |          |
| `result_export`               | ✓      | ✓    |       |         |            |          |
| `related_tool_click`          |        |      |       |         | ✓          | ✓        |

Notes: `result_export` is defined but does not fire yet (CSV/PDF export is
deferred). And `calculator_start` under-counts vs `calculator_result` — it fires
only when a user edits an input, so computing with default values yields a
result with no start. Expect more results than starts in the funnel; that is by
design, not a tracking bug.

### 6c. Consent is owned by consentmanager (certified TCF v2.2 CMP)

As of 2026-07-05 the consent/analytics stack was **rebuilt**. Current state:

- **CMP:** consentmanager CMP **173918** (cdid `3ba155ac627e4`, host
  `c.delivery.consentmanager.net`). The old CMP 173913 was **deleted** and
  rebuilt. Loaded site-wide in `web/src/app/layout.tsx` via `next/script`
  `strategy="afterInteractive"` — consentmanager's official Next.js SSR method
  (`docs/integrations/consentmanager/nextjs-server-side-rendering.md`). An
  inline config script before it sets `cmp_privacyurl` → `/privacy-policy/`
  and `cmp_tacurl` → `/terms/`; `cmp_nogam` is deliberately NOT set so the CMP
  keeps pushing `cmpConsentVendors`/`cmpEvent` to the `dataLayer`. Dashboard
  vendors: `s23`, `s1498` (Google Advertising, Marketing), `s26` (Google
  Analytics, Measurement), `s905` (GTM), `c86929`.
- **GTM:** container `GTM-NRM7V3BN` loads via `@next/third-parties`
  `<GoogleTagManager>` + a manual `<noscript>` in the layout. The id is in
  code; `NEXT_PUBLIC_GTM_ID` is **no longer read**. Live container = **v11**:
  the Google Tag (config, `G-7XG10CD70E`) fires only on the trigger
  `cmpEvent - GA consented` (`cmpConsentVendors contains ,s26,`), and all 5
  GA4 event tags fire on trigger groups (own custom event AND the consent
  trigger) — every GA4 hit is consent-gated. Full container shape and consent
  architecture: [`docs/launch/GTM_SETUP.md`](GTM_SETUP.md).
- **App side:** `track()` → `sendGTMEvent` → `dataLayer` (installed by
  `<AnalyticsInit/>`); JS-API wrapper `web/src/lib/consent/cmp.ts`; the Footer
  "Cookie settings" button opens the CMP preference manager. The
  privacy-policy page is static with consentmanager 173918 widgets (policy
  content, cookie list, inline preferences box, build-time vendor list).

**⚠️ OPEN BLOCKER (support ticket sent 2026-07-05):** consentmanager's
delivery pipeline compiles an **empty vendor/purpose list** for this account —
the delivered config has `vendors:[]` / `custvendors:0`, and their own
`vendorlist.php` API returns `[]`; reproduced on both CMPs. Until fixed, the
banner shows 0 vendors, `cmpConsentVendors` never contains `,s26,`, and GA4
stays dark (the safe state). Post-fix checklist:

- [ ] Verify vendors render at `opscrunch.com/?cmpconsole`.
- [ ] Set **"Read from IAB TCF" = OFF** on CMP 173918 (currently `gm_tcf:1` —
  Google Analytics is a non-TCF vendor, so TCF can never grant it).
- [ ] Accept the banner → `cmpConsentVendors` contains `,s26,` → GA4 fires.
- [ ] Confirm events in GA4 DebugView (§6a).

Housekeeping / open items:

- [ ] Delete the stale `NEXT_PUBLIC_GTM_ID` var from the Vercel dashboard —
  the code no longer reads it (the GTM id is in the layout component).
- [ ] `/cookie-policy/` page copy is still the older hand-written text — it
  predates the consentmanager widgets on `/privacy-policy/`; refresh or
  replace it with CMP-driven content.
- [x] Leave GA4 **Admin → Data collection → consent settings** at default — do
  NOT enable "automatically mark data as consented".
- [x] Optional: link Search Console to the GA4 property (GA4 Admin → Product
  links → Search Console) once section 5 is verified.

## 7. AdSense — [user, LAST — only after indexing and real traffic]

Do **not** apply at launch. Apply only after Search Console shows the site
indexed and it is receiving organic traffic, per `docs/launch/GOOGLE_SETUP.md`
(AdSense section: trust pages, no placeholders, ads must not interfere with
calculator usability).

Already in place (verified 2026-07-04) — account association and the certified
CMP are done, so the review can proceed when you apply:

- [x] `ads.txt` serves the real `google.com, pub-9610958335722543, DIRECT,
  f08c47fec0942fa0` line.
- [x] The `google-adsense-account` meta (`ca-pub-9610958335722543`) ships in
  `<head>` via `NEXT_PUBLIC_ADSENSE_ACCOUNT` — the site-association tag.
- [x] **Certified CMP live:** consentmanager (TCF v2.2, CMP ID 31 — our CMP
  173918) is loaded from the root layout and owns consent for ads and
  analytics (see §6c). This satisfies the pre-serving CMP gate — though ad
  vendor consent (`s1498`) is also affected by the §6c empty-vendor-list
  blocker until consentmanager fixes it.

Remaining:

- [x] Apply for AdSense with `opscrunch.com` (after indexing + organic traffic).
- [ ] **Configure consentmanager for Google ad serving** (its dashboard) so
  AdSense can deliver once approved:
  - [x] CMP set to **TCF v2 compliant**.
  - [x] Add **"Google Advertising Products"** to the vendor list (`s23`/`s1498`
    are configured on CMP 173918; they render once the §6c vendor-list
    blocker is fixed).
  - [x] Enable IAB TCF **purposes 1, 2, 3, 4, 7, 9, 10**.
  - [x] Leave **legal basis on default** (do not change it for vendor or
    purposes).
  - [ ] **Disable Google Funding Choices** in AdSense (Privacy & messaging) —
    consentmanager is the CMP, so Google's own message must be off to avoid
    two banners.

- [ ] **On approval**, wire the real ad unit: replace the placeholder in
  `web/src/components/ads/AdSlot.tsx` with a real `<ins class="adsbygoogle">`
  unit + a `(adsbygoogle = window.adsbygoogle || []).push({})` call. The
  `adsbygoogle.js` loader already ships from the layout, so no separate loader
  is needed. Ads serve only with consent — Google reads consentmanager's TCF
  string and blocks delivery when consent is absent (this is expected, not a
  bug; non-personalized ads also require consent).
- [ ] Then flip `NEXT_PUBLIC_ADS_ENABLED=true` in Vercel and redeploy (it is
  `false` now so no empty placeholder boxes render pre-approval).
- [ ] When enabling: follow the **A+D-slots-first rule** from the AdSense kit
  (`docs/mockups/opscrunch_adsense_kit.html` and the Phase 4 design spec) —
  only slots A (below the worked example, eager) and D (below the FAQ,
  lazy) go live first; an ad never touches the tool shell. Evaluate more
  placements only after usage data.

## 8. Post-launch watch — [user + agent]

- [ ] **Weekly:** Search Console → Pages (coverage) and Performance: indexed
  count trending toward 33, watch for crawl errors, note top queries.
- [x] **Due 2026-07-12:** ship the USPS dimensional-weight divisor change
  (166 → 139 per Federal Register final rule 2026-09785; UPS Retail Rates
  stay 166). **The change is already staged** on branch
  `usps-dim-139-2026-07-12` (splits the divisor row so USPS joins the 139
  row, renames the `usps` ÷166 preset to `usretail`, and updates the
  user-facing copy; validated + full test suite green). On or after
  2026-07-12: re-confirm USPS QSG 150 shows 139, then
  `git checkout main && git merge usps-dim-139-2026-07-12 && git push`
  (deploys automatically). If the effective date slips, hold the merge.
- [x] **2026-07-31:** Cloudflare SSL/certificate scan follow-up noted in
  `docs/cloudflare/` — re-check the domain's SSL status on that date.
- [ ] Fix technical SEO/UX issues found in the first weeks **before** adding
  more tools (Phase 5 exit criterion in `docs/planning/DEVELOPMENT_PLAN.md`).
