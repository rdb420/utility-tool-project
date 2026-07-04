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

### How this maps to consentmanager's official webinar

Two things we already do match consentmanager's **recommended** path (their
webinar's "Option B", transcript in `docs/google-tag-manager/`):

- **consentmanager is loaded directly on the site, not via the GTM template.**
  It's in the page's `beforeInteractive` bootstrap, so it loads *before* GTM
  and can't be lost if GTM is delayed. So you do **not** need the "consentmanager
  CMP" Community Template / tag inside GTM (their Part A). Skip it.
- **The all-denied Consent Mode default is set before the GTM snippet** (same
  bootstrap, ahead of the GTM loader) — exactly their step 14 rule.

The blocking method for GA4 is their **Part C vendor trigger** (`cmpConsentVendors
contains ,s26,`). See the ⚠️ trap in §5 before touching GTM's built-in Consent
Settings — the webinar's Part F would break this specific setup.

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

Create Data Layer Variables (Data Layer Variable Name = the exact key):

- **`cmpConsentVendors`** — the consented vendor id list (the gate; required).
- **`cmpConsentPurposes`** — consented purposes (handy for future non-Google
  vendors; the webinar creates it too).
- **`cmpGDPR`** — `1` if GDPR applies to the visitor, else `0` (webinar step 8).
  **Only needed if** you set consentmanager to *ask EU visitors only*. If it's
  set to **ask all visitors** (the common, safest default — webinar step 25),
  every visitor gets the banner and you can **skip `cmpGDPR` branching entirely**.
- The event params: `toolId`, `slug`, `field`, `variant`, `fromToolId`,
  `toToolId`.

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
- **Advanced Settings → Consent Settings → "No additional consent required"**
  (the trigger enforces consent — do NOT require `analytics_storage`; see §5).
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

## 5. ⚠️ GTM built-in Consent Settings — the trap

The webinar's Part F (steps 16–19) tells you to open each tag's **Advanced
Settings → Consent Settings** and set **"Require additional consent for tag to
fire" → `analytics_storage`** on the GA4 tag. **Do NOT do that in our current
setup.** Here's why:

`analytics_storage` is exactly the signal that never grants for you (Google
Analytics is a non-TCF vendor; "Read from IAB TCF" can't set it). If you also
make the GA4 tag *require* `analytics_storage`, GTM's consent layer will block it
**permanently** — even after the visitor accepts — defeating the whole vendor-
trigger workaround.

So there are two mutually exclusive architectures — pick one, don't mix:

| | Gate | GA4 tag trigger | GA4 Consent Settings |
| --- | --- | --- | --- |
| **A. Vendor trigger (current)** | `cmpConsentVendors contains ,s26,` | the consent trigger (§2) | **"No additional consent required"** |
| **B. Standard Consent Mode** | `analytics_storage` signal | All Pages / Consent Init | "Require additional consent" → `analytics_storage` |

- **We use A** because `analytics_storage` is broken. On the GA4 tag set Consent
  Settings to **"No additional consent required"** (the *trigger* enforces
  consent, so GTM's consent layer must not also gate it).
- **Switch to B only if you fix the signal** — i.e. set consentmanager's
  **"Read from IAB TCF" = OFF** so `s26 → analytics_storage` grants (its
  per-vendor mapping). Then you can drop the vendor trigger and use the standard
  `analytics_storage` consent setting. Cleaner, but optional.

Either way: the all-denied Consent Mode default still ships from the page (EUUCP
compliance), and consentmanager is the **only** CMP — do not add a second banner
or the consentmanager GTM template.

## 5b. Recommended hardening (from the webinar)

- **Enable Consent Overview** — GTM → Admin → Container Settings → tick
  **Consent Overview** (webinar step 15). Gives a per-tag view of which tags
  have consent configured, so nothing slips through unlabelled.
- **Trim GA4's advertising integrations** (webinar step 23) — in GA4 Admin, keep
  Google Ads links / Signals / advertising features **off** unless you
  deliberately want them + consent for them. Analytics stays analytics; it
  shouldn't quietly become ad profiling.
- We do **not** need the webinar's Part D ecommerce trigger-groups beyond the
  simple event+consent group in §4, and Part G (YouTube/Maps embeds) doesn't
  apply — this site has no third-party embeds.

## 6. Verify (GTM Preview + Tag Assistant + API audit)

**API audit (read-only, no browser needed after first consent):**

```bash
uv run python scripts/check_gtm.py   # is GA4 config + event tags + ,s26, trigger published?
uv run python scripts/check_ga4.py   # toolId/slug custom dimensions + calculator_result key event?
```

The first run opens a Google consent screen to add the `tagmanager.readonly` +
`analytics.readonly` scopes; after that both run non-interactively. `check_gtm`
reads the **live/published** container, so it tells you plainly whether GA4 will
fire on the site yet.

**Manual (GTM Preview):**

1. GTM **Preview** → open the site. Before accepting: GA4 tags **not fired**.
2. Accept in the consentmanager banner → `cmpEvent` fires with
   `cmpConsentVendors` containing `,s26,` → GA4 Config + event tags fire.
3. In Tag Assistant, confirm the GA4 hits now carry the consent state and that
   `calculator_result` includes `tool_id`/`slug` and **no** input values.
4. GA4 **Realtime/DebugView**: events arrive only after consent.

Run the webinar's consent-scenario matrix (step 29):

| Scenario | Expected |
| --- | --- |
| Do nothing (banner open) | GA4 does not fire |
| Accept all / accept Analytics | GA4 fires |
| Reject all | GA4 does not fire |
| Change consent later | GA4 responds to the new state |
| Return visit (stored choice) | previous choice respected |
| Ad blocker | site fine; GTM/CMP may be limited |

## 7. Publish

**Submit → Publish** the GTM container. Then merge/deploy the `gtm-migration`
branch to production (the page must load `GTM-NRM7V3BN`, which it does once
deployed).

## 8. AdSense (later)

When ads go live, the ad tags read consentmanager's TCF string directly (vendor
`s1498` / TCF 755) — see runbook §7 for the consentmanager ad settings. Keep
Google Funding Choices disabled.
