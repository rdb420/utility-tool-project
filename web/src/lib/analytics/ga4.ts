import type { AnalyticsTransport } from "./index";

/**
 * GA4 (gtag.js) integration.
 *
 * Decision record (Phase 5, revised): consent is owned by **Google's
 * certified CMP** (Funding Choices, delivered by the AdSense tag configured
 * with the EEA/UK and US privacy messages), NOT by this code.
 *
 *   - The CMP tag loads `beforeInteractive` (see the root layout), so it sets
 *     Google Consent Mode v2 defaults per region BEFORE gtag.js is injected.
 *   - gtag.js is injected later, on idle (see AnalyticsLoader), so by the time
 *     `config` fires the CMP has already established the consent state; gtag
 *     honours it. When consent is denied, Consent Mode degrades GA4 to
 *     cookieless pings; when granted (via the CMP), full collection resumes.
 *   - This module therefore pushes NO `consent default` / `consent update`
 *     calls of its own. A previous version set region-scoped defaults and an
 *     analytics-only update from a custom banner; that was removed when the
 *     Google CMP became the single source of truth for consent. Do not
 *     reintroduce code-side consent calls — they would run after the CMP
 *     (which loads earlier) and clobber its regional defaults.
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
 * page is interactive (AnalyticsLoader defers to idle/load), which is also
 * after the CMP has set Consent Mode defaults.
 *
 * No consent calls here: Google's CMP owns Consent Mode (see the decision
 * record above). We only stand up the dataLayer/gtag stub, stamp `js`, and
 * `config` the measurement id (which sends the initial page_view honouring
 * whatever consent state the CMP has already established).
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
