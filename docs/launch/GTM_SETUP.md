# GTM Setup — GA4 via Google Tag Manager, gated by consentmanager

Container: **`GTM-NRM7V3BN`**, live version = **v11** (built and **published via
the GTM API** — see the audit scripts in §6; old conflicting drafts were
deleted). The code side lives in `web/src/app/layout.tsx` and is deployed; this
document records the container shape, the consent architecture, and how to
verify it.

Gating model: **hard-block on vendor consent** — every GA4 tag (config *and*
events) fires only when the visitor has consented to the **Google Analytics
vendor `s26`** in consentmanager. This derives straight from consentmanager's
vendor-consent list and sidesteps the Consent Mode signal-mapping problem
(Google Analytics is a non-TCF vendor, so `analytics_storage` via TCF never
grants — see §5).

> **⚠️ OPEN BLOCKER (2026-07-05):** consentmanager's delivery pipeline compiles
> an **empty vendor/purpose list** for this account — the delivered CMP config
> has `vendors:[]` / `custvendors:0`, and their own `vendorlist.php` API returns
> `[]`. Reproduced on both the old CMP (173913, since deleted) and the rebuilt
> CMP (173918). Support ticket sent 2026-07-05. Until they fix it, the banner
> shows 0 vendors, `cmpConsentVendors` never contains `,s26,`, and **GA4 stays
> dark** — which is the safe state. Post-fix checklist in §6.

## What the page loads (current `layout.tsx`)

1. **GTM** — `<GoogleTagManager gtmId="GTM-NRM7V3BN" />` from
   `@next/third-parties/google` (the Next-recommended integration), plus a
   manual `<noscript>` iframe right after `<body>` (the component doesn't emit
   one). The container id is **in code**, not env — `NEXT_PUBLIC_GTM_ID` is no
   longer read (the stale Vercel dashboard var can be deleted).
2. **CMP client-side config** — an inline script sets `cmp_privacyurl` →
   `/privacy-policy/` and `cmp_tacurl` → `/terms/`. Deliberately **not** set:
   `cmp_nogam` (so the CMP keeps pushing `cmpConsentVendors`/`cmpEvent` to the
   default `dataLayer` — the signal GTM gates on) and `cmp_datalayername`
   (default `dataLayer` matches GTM).
3. **consentmanager CMP 173918** — `semiautomatic.min.js`, cdid
   `3ba155ac627e4`, host `c.delivery.consentmanager.net`, loaded via
   `next/script` `strategy="afterInteractive"` — consentmanager's official
   Next.js SSR method
   (`docs/integrations/consentmanager/nextjs-server-side-rendering.md`).
   The old CMP **173913 was deleted** and rebuilt as 173918. Vendors configured
   in the dashboard: `s23`, `s1498` (Google Advertising / Marketing), `s26`
   (Google Analytics / Measurement), `s905` (GTM), `c86929`.
4. **App analytics** — `track()` (typed event union in
   `web/src/lib/analytics/events.ts` — ids/slugs only, never input values) →
   the GTM transport (`sendGTMEvent` from `@next/third-parties`) → `dataLayer`;
   installed by `<AnalyticsInit/>`. A JS-API wrapper
   (`web/src/lib/consent/cmp.ts`, public `__cmp` only: `getCMPData` /
   `hasVendorConsent(s26)` / `onConsentEvent` / `showScreenAdvanced` /
   `showCookies`) backs the Footer's **"Cookie settings"** button, which opens
   the CMP preference manager.

### What lands on the dataLayer

- **consentmanager** pushes: `cmpEvent`, `cmpConsentVendors` (e.g.
  `,s26,s1498,`), `cmpConsentPurposes`, `cmpCurrentStatus`, `userChoiceExists`, …
- **App events** (from `track()`), as GTM custom events:

  | `event` | Extra keys |
  | --- | --- |
  | `calculator_start` | `toolId`, `slug` |
  | `calculator_result` | `toolId`, `slug` |
  | `calculator_validation_error` | `toolId`, `slug`, `field?` |
  | `result_copy` | `toolId`, `slug`, `variant` |
  | `result_export` | `toolId`, `slug` (not emitted yet; no GTM tag) |
  | `related_tool_click` | `fromToolId`, `toToolId` |

  Payloads carry only ids/slugs — never user input (the privacy contract).

## The published container (v11)

### 1. Variables — 7 Data Layer Variables

- **`cmpConsentVendors`** — the consented vendor id list (the gate; required).
- The event params: `toolId`, `slug`, `field`, `variant`, `fromToolId`,
  `toToolId`.

### 2. The consent trigger (reused everywhere)

- **Custom Event** trigger, event name `cmpEvent`, fire on **Some Custom
  Events** → `DLV - cmpConsentVendors` **contains** `,s26,`.
- Named **`cmpEvent - GA consented`**.

> Always wrap the vendor id in commas (`,s26,`) and use **one vendor per
> trigger** (consentmanager's rule).

### 3. Google Tag (GA4 config)

- **Google Tag**, Tag ID `G-7XG10CD70E`.
- Fires **only** on `cmpEvent - GA consented` — no All Pages trigger, so no
  page_view and no cookies until the visitor consents to `s26`.
- Consent Settings: **"No additional consent required"** (the trigger enforces
  consent; see §5 for why GTM's consent layer must not also gate it).

### 4. GA4 Event tags — 5, all on Trigger Groups

One GA4 Event tag each for `calculator_result`, `calculator_start`,
`calculator_validation_error` (+ `field`), `result_copy` (+ `variant`), and
`related_tool_click` (+ `fromToolId`/`toToolId`). Each fires on a **Trigger
Group** = its own Custom Event trigger **AND** `cmpEvent - GA consented`, and
forwards its params from the DLVs (param names match the GA4 custom dimensions
— runbook §6b).

So **every GA4 hit is consent-gated** — config and events alike. The old §5
warning that event tags fired ungated is obsolete; v11 closed that gap.

## 5. Consent architecture — vendor trigger vs. Consent Mode

Two mutually exclusive architectures — pick one, don't mix:

| | Gate | GA4 tag trigger | GA4 Consent Settings |
| --- | --- | --- | --- |
| **A. Vendor trigger (current, v11)** | `cmpConsentVendors contains ,s26,` | the consent trigger (§2) / trigger groups (§4) | **"No additional consent required"** |
| **B. Standard Consent Mode** | `analytics_storage` signal | All Pages / Consent Init | "Require additional consent" → `analytics_storage` |

- **We use A.** Google Analytics is a non-TCF vendor, so "Read from IAB TCF"
  can never grant `analytics_storage` for it; gating on the signal would block
  GA4 permanently. Do **not** set "Require additional consent →
  `analytics_storage`" on any GA4 tag while on architecture A.
- **Required on CMP 173918 (after the support fix): set "Read from IAB TCF" =
  OFF.** The rebuilt CMP currently has `gm_tcf:1`, which routes Google Consent
  Mode through TCF — and TCF can never grant Google Analytics. With it OFF,
  consentmanager's per-vendor mapping (`s26 → analytics_storage`) grants
  correctly. This is worth doing even though the vendor trigger is the gate.
- consentmanager is the **only** CMP — do not add a second banner, the
  consentmanager GTM Community Template, or Google Funding Choices.

## 6. Verify (API audit + browser)

**API audit (read-only):**

```bash
uv run python scripts/check_gtm.py   # live container: config tag + 5 event tags + ,s26, trigger?
uv run python scripts/check_ga4.py   # GA4 543990058: 6 custom dimensions + key events?
```

Both are read-only audits. The shared OAuth helper
(`scripts/_google_admin_auth.py`) holds the scopes — **including write scopes**
(tagmanager `edit.containers` / `edit.containerversions` / `delete.containers`
/ `publish`, `analytics.edit`): GTM v11 was built and published through the
API, and GA4's custom dimensions/key events were configured the same way.
`check_gtm` reads the **live/published** container, so it tells you plainly
what will fire on the site.

GA4 property `543990058` expected state: 6 custom dimensions (`toolId`, `slug`,
`field`, `variant`, `fromToolId`, `toToolId`), key events `calculator_result` +
`related_tool_click` (plus the default `purchase`), no custom metrics.

**Post-fix checklist (once consentmanager support resolves the empty vendor
list):**

1. Open `https://opscrunch.com/?cmpconsole` — the CMP console must show the
   configured vendors (s23, s1498, s26, s905, c86929) actually delivered.
2. In the consentmanager dashboard, set **"Read from IAB TCF" = OFF** on CMP
   173918 (see §5).
3. Accept in the banner → `cmpEvent` fires with `cmpConsentVendors` containing
   `,s26,` → Google Tag + event tags fire.
4. Confirm events arrive in **GA4 DebugView** and carry `toolId`/`slug` but
   **no** input values.

**Consent-scenario matrix:**

| Scenario | Expected |
| --- | --- |
| Do nothing (banner open) | GA4 does not fire (no config, no events) |
| Accept all / accept Analytics (`s26`) | GA4 config + event tags fire |
| Reject all | GA4 does not fire |
| Change consent later (Footer "Cookie settings") | GA4 responds to the new state |
| Return visit (stored choice) | previous choice respected |
| Ad blocker | site fine; GTM/CMP may be limited |
| **Today, pre-fix (empty vendor list)** | banner shows 0 vendors; GA4 never fires — safe |

## 7. AdSense (later)

When ads go live, the ad tags read consentmanager's TCF string directly (vendor
`s1498` / TCF 755) — see runbook §7 for the consentmanager ad settings. The
`adsbygoogle.js` loader already ships from the layout (account association /
review only; ad units off, `NEXT_PUBLIC_ADS_ENABLED=false`). Keep Google
Funding Choices disabled.
