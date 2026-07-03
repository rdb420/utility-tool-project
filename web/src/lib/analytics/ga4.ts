import type { ConsentState } from "@/lib/consent/useConsent";
import type { AnalyticsTransport } from "./index";

/**
 * GA4 (gtag.js) integration, behind Google Consent Mode v2 with
 * region-scoped defaults.
 *
 * Decision record (Phase 5 chunk A; revised after GA4's "0% consent rate"
 * tag-quality warning — the old defaults denied analytics_storage for every
 * region, including places with no consent requirement):
 *   - gtag.js loads for EVERY visitor, but only after the tool is interactive
 *     (see AnalyticsLoader). TWO Consent Mode v2 defaults are pushed onto the
 *     dataLayer BEFORE the script tag is injected, so consent state is
 *     settled before Google's code executes:
 *       1. Global default: ad signals denied, analytics_storage granted —
 *          outside consent-law regions an analytics cookie may be set from
 *          the first hit.
 *       2. Region-scoped stricter default (EEA_UK_CH): everything denied,
 *          including analytics_storage — visitors there start cookieless
 *          until they accept.
 *   - The banner choice is an explicit `consent update` in BOTH directions
 *     (granted AND denied), so a visitor's decision overrides the regional
 *     default everywhere: Decline turns analytics cookieless even outside
 *     the EEA; Accept upgrades it inside.
 *   - Ad signals (ad_storage / ad_user_data / ad_personalization) are NEVER
 *     updated to granted anywhere: no ads are served yet
 *     (NEXT_PUBLIC_ADS_ENABLED=false), and granting waits for a certified
 *     CMP (see ConsentBanner).
 *   - On "denied" events still flow: under Consent Mode GA4 degrades to
 *     cookieless, unattributable pings — we still count visits, just without
 *     the cookie, which is what the consent banner promises.
 *   - Event payloads are ids/slugs/field names only (see events.ts); the
 *     transport below forwards ONLY those typed keys, never anything else.
 *
 * IMPORTANT: do NOT also enable GA4's dashboard-level region override
 * ("Admin → Data collection → Manage default consent settings for data
 * collection"). This code is the single source of truth for consent
 * defaults; the dashboard setting would silently override what is pushed
 * here and desynchronize behavior from this decision record.
 */

/**
 * Regions that get the stricter all-denied consent default, as ISO 3166-1
 * alpha-2 codes (the format Consent Mode's `region` parameter expects):
 *
 *   - The 27 EU member states — GDPR + ePrivacy consent requirements.
 *   - IS, LI, NO — non-EU EEA members; GDPR applies via the EEA agreement.
 *   - GB — UK GDPR + PECR continue post-Brexit consent requirements.
 *   - CH — Swiss FADP/revDSG; Google groups Switzerland with the EEA/UK for
 *     its consent-mode requirements.
 *
 * 32 codes total (27 EU + 3 EEA-only + UK + Switzerland), alphabetized.
 */
export const EEA_UK_CH = [
  "AT",
  "BE",
  "BG",
  "CH",
  "CY",
  "CZ",
  "DE",
  "DK",
  "EE",
  "ES",
  "FI",
  "FR",
  "GB",
  "GR",
  "HR",
  "HU",
  "IE",
  "IS",
  "IT",
  "LI",
  "LT",
  "LU",
  "LV",
  "MT",
  "NL",
  "NO",
  "PL",
  "PT",
  "RO",
  "SE",
  "SI",
  "SK",
] as const;

/** The only payload keys the AnalyticsEvent union carries (events.ts). */
const EVENT_PARAM_KEYS = [
  "toolId",
  "slug",
  "field",
  "variant",
  "fromToolId",
  "toToolId",
] as const;

type GtagFn = (...args: unknown[]) => void;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: GtagFn;
  }
}

let injected = false;

/** Test-only: forget that gtag.js was injected. */
export function resetGa4ForTests(): void {
  injected = false;
}

function gtagCall(...args: unknown[]): void {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag(...args);
  }
}

/**
 * Inject gtag.js exactly once. Client-only; call from an effect after the
 * page is interactive (AnalyticsLoader defers to idle/load).
 *
 * Order matters: dataLayer + gtag stub first, then the two Consent Mode v2
 * defaults (global, then the region-scoped EEA/UK/CH override — Consent Mode
 * applies the most specific region match, but the global default must exist
 * before gtag.js evaluates anything), then js/config, and only THEN the
 * script tag — so consent state is settled before Google's code executes.
 */
export function loadGa4(measurementId: string): void {
  if (typeof window === "undefined" || !measurementId || injected) return;
  injected = true;

  window.dataLayer = window.dataLayer ?? [];
  if (typeof window.gtag !== "function") {
    window.gtag = function gtag() {
      // gtag.js expects the Arguments object itself, not a spread copy.
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer?.push(arguments);
    };
  }

  // Consent Mode v2 defaults, before gtag.js loads. Two entries:
  // 1. Global: ads denied everywhere, analytics allowed by default outside
  //    consent-law regions (fixes the "0% consent rate in ALL regions"
  //    tag-quality warning).
  window.gtag("consent", "default", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "granted",
  });
  // 2. Stricter region-scoped default: everything denied in the EEA, UK,
  //    and Switzerland until the visitor accepts.
  window.gtag("consent", "default", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "denied",
    region: [...EEA_UK_CH],
  });
  window.gtag("js", new Date());
  // config sends the initial page_view; SPA route changes are handled by
  // AnalyticsLoader (gtag doesn't see App Router navigations).
  window.gtag("config", measurementId);

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(
    measurementId,
  )}`;
  document.head.appendChild(script);
}

/**
 * Reflect the banner choice into Consent Mode. Both choices push an explicit
 * update so the visitor's decision overrides the region-scoped default
 * everywhere (Decline must deny even where the global default grants). Only
 * `analytics_storage` is ever touched; ad signals stay denied until ads
 * actually launch (and then only via a certified CMP — see ConsentBanner).
 */
export function applyConsentToGa4(consent: ConsentState): void {
  if (consent === "unset") return; // region-scoped defaults already apply
  gtagCall("consent", "update", {
    analytics_storage: consent === "granted" ? "granted" : "denied",
  });
}

/**
 * Real GA4 transport: forwards each typed AnalyticsEvent as
 * `gtag("event", name, params)` where params are ONLY the typed payload
 * fields — the privacy contract from events.ts (never user input values).
 */
export const ga4Transport: AnalyticsTransport = (event) => {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }
  const params: Record<string, string> = {};
  for (const key of EVENT_PARAM_KEYS) {
    const value = (event as Record<string, unknown>)[key];
    if (typeof value === "string") params[key] = value;
  }
  window.gtag("event", event.name, params);
};

/**
 * Manual page_view for client-side route changes. `pagePath` must come from
 * `usePathname()` — never `location.href`/`search` — so query strings (and
 * anything a user typed) can never reach GA4.
 */
export function sendGa4PageView(pagePath: string): void {
  gtagCall("event", "page_view", { page_path: pagePath });
}
