# GTM Setup Guide — GA4 via Google Tag Manager, gated by consentmanager

Container: **`GTM-NRM7V3BN`**. This guide is the **GTM-UI work** that pairs with
the code migration (branch `gtm-migration`). The code side is done — the page
loads GTM after the consent default + consentmanager, and pushes typed events to
the `dataLayer`. Everything below is built inside the GTM web UI.

Gating model chosen: **hard-block on vendor consent** (Consent Mode "Basic") —
GA4 fires only when the visitor has consented to the **Google Analytics vendor
`s26`**. This derives straight from consentmanager's vendor-consent list and
sidesteps the Consent Mode signal-mapping problem (Google Analytics is a
non-TCF vendor, so `analytics_storage` via TCF never granted).

## What the page already puts on the dataLayer

- **Consent Mode default** (all-denied) + `default_consent` — set before GTM.
- **consentmanager** pushes: `cmpEvent`, `cmpConsentVendors` (e.g.
  `,s26,s1498,`), `cmpConsentPurposes`, `cmpCurrentStatus`, `userChoiceExists`, …
- **App events** (from `track()`), as GTM custom events:

  | `event` | Extra keys |
  | --- | --- |
  | `calculator_start` | `toolId`, `slug` |
  | `calculator_result` | `toolId`, `slug` |
  | `calculator_validation_error` | `toolId`, `slug`, `field?` |
  | `result_copy` | `toolId`, `slug`, `variant` |
  | `result_export` | `toolId`, `slug` (not emitted yet) |
  | `related_tool_click` | `fromToolId`, `toToolId` |

  Payloads carry only ids/slugs — never user input (the privacy contract).

## 1. Variables (Variables → New → Data Layer Variable)

Create Data Layer Variables (name them `DLV - <key>`) for:

- `cmpConsentVendors`
- `toolId`, `slug`, `field`, `variant`, `fromToolId`, `toToolId`

## 2. The consent trigger (reused everywhere)

Every GA4 tag gets this so nothing fires without analytics consent:

- **Trigger → New → Custom Event**
- Event name: `cmpEvent`
- Fire on: **Some Custom Events** → `DLV - cmpConsentVendors` **contains** `,s26,`
- Name it `cmpEvent - GA consented`.

> Always wrap the vendor id in commas (`,s26,`) and use **one vendor per
> trigger** (consentmanager's rule).

## 3. GA4 Configuration tag

- **Tag → New → Google Tag** (GA4), Tag ID `G-7XG10CD70E`.
- Trigger: **`cmpEvent - GA consented`**.
- (Optional) In Fields, leave default; page_view is sent on load.
- SPA page views: add a **History Change** trigger (also conditioned on the
  consent vendor) if you want per-route page_views, OR enable Enhanced
  Measurement "page changes based on browser history events" in the GA4 data
  stream — **pick one**, not both, to avoid double-counting.

## 4. GA4 Event tags (one per app event)

For each app event, create a **Tag → GA4 Event** referencing the config, e.g.
for `calculator_result`:

- Event name: `calculator_result`
- Event parameters: `tool_id` = `{{DLV - toolId}}`, `slug` = `{{DLV - slug}}`
  (keep the same param names you registered as GA4 custom dimensions — see
  runbook §6b: `toolId`, `slug`, etc.).
- Trigger: a **Custom Event** trigger on `calculator_result` **plus** the
  `,s26,` consent condition (use a **Trigger Group**: `Custom Event
  calculator_result` + `cmpEvent - GA consented`), so the event only sends once
  consent exists.
- Repeat for `calculator_start`, `calculator_validation_error` (+ `field`),
  `result_copy` (+ `variant`), `related_tool_click` (+ `fromToolId`/`toToolId`).

## 5. Consent Mode note

Leave the GA4 tags **consent-unaware in GTM's built-in consent checks** is fine
here because the *trigger* already hard-blocks on `,s26,`. The all-denied
Consent Mode default still ships from the page for EUUCP compliance. Do **not**
add a second consent banner in GTM — consentmanager is the only CMP.

## 6. Verify (GTM Preview + Tag Assistant)

1. GTM **Preview** → open the site. Before accepting: GA4 tags **not fired**.
2. Accept in the consentmanager banner → `cmpEvent` fires with
   `cmpConsentVendors` containing `,s26,` → GA4 Config + event tags fire.
3. In Tag Assistant, confirm the GA4 hits now carry the consent state and that
   `calculator_result` includes `tool_id`/`slug` and **no** input values.
4. GA4 **Realtime/DebugView**: events arrive only after consent.

## 7. Publish

**Submit → Publish** the GTM container. Then merge/deploy the `gtm-migration`
branch to production (the page must load `GTM-NRM7V3BN`, which it does once
deployed).

## 8. AdSense (later)

When ads go live, the ad tags read consentmanager's TCF string directly (vendor
`s1498` / TCF 755) — see runbook §7 for the consentmanager ad settings. Keep
Google Funding Choices disabled.
