import type { ConsentState } from "@/lib/consent/useConsent";
import type { AnalyticsTransport } from "./index";

/**
 * GA4 (gtag.js) integration, behind Google Consent Mode v2.
 *
 * Decision record (Phase 5 chunk A):
 *   - gtag.js loads for EVERY visitor, but only after the tool is interactive
 *     (see AnalyticsLoader), and always with Consent Mode v2 defaults of
 *     "denied" across the board — pushed onto the dataLayer BEFORE the script
 *     tag is injected, so the very first thing gtag.js sees is the denial.
 *   - On consent "granted" we upgrade `analytics_storage` only. All ad
 *     signals (ad_storage / ad_user_data / ad_personalization) stay denied:
 *     no ads are served yet (NEXT_PUBLIC_ADS_ENABLED=false), so there is
 *     nothing to consent to on that side.
 *   - On consent "denied" everything stays denied but events still flow:
 *     under Consent Mode GA4 degrades to cookieless, unattributable pings,
 *     which is exactly the "analytics stays anonymous counts either way"
 *     promise the consent banner makes.
 *   - Event payloads are ids/slugs/field names only (see events.ts); the
 *     transport below forwards ONLY those typed keys, never anything else.
 */

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
 * Order matters: dataLayer + gtag stub first, then the Consent Mode v2
 * default (all denied), then js/config, and only THEN the script tag — so
 * consent state is settled before Google's code executes.
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

  // Consent Mode v2 defaults: denied for everyone, before gtag.js loads.
  window.gtag("consent", "default", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "denied",
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
 * Reflect the banner choice into Consent Mode. Only `analytics_storage`
 * ever upgrades; ad signals stay denied until ads actually launch (and then
 * only via a certified CMP — see ConsentBanner).
 */
export function applyConsentToGa4(consent: ConsentState): void {
  if (consent === "unset") return; // defaults (all denied) already apply
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
