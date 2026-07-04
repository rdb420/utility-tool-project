import type { AnalyticsTransport } from "./index";

/**
 * GTM transport. With Google Tag Manager owning GA4 (config + event tags built
 * in the GTM UI), the app's only job is to push typed events onto the
 * `dataLayer` as GTM custom events. A GA4 event tag in GTM, gated on consent
 * (e.g. `cmpConsentVendors contains ,s26,`), then forwards them to GA4.
 *
 * Privacy contract (unchanged): only the typed id/slug/field keys from
 * events.ts are forwarded — never user input values.
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

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

export const gtmTransport: AnalyticsTransport = (event) => {
  if (
    typeof window === "undefined" ||
    !window.dataLayer ||
    typeof window.dataLayer.push !== "function"
  ) {
    return;
  }
  const payload: Record<string, string> = {};
  for (const key of EVENT_PARAM_KEYS) {
    const value = (event as Record<string, unknown>)[key];
    if (typeof value === "string") payload[key] = value;
  }
  // GTM custom event: the event name becomes the `event` key that GTM triggers
  // match on; typed params ride alongside for the GA4 event tag to forward.
  window.dataLayer.push({ event: event.name, ...payload });
};
