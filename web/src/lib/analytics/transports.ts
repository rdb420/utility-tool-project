import type { ConsentState } from "@/lib/consent/useConsent";
import { setAnalyticsTransport, type AnalyticsTransport } from "./index";

/**
 * Analytics transports. The event union (`events.ts`) and `track()`
 * (`index.ts`) are the stable contract other code depends on; this module
 * only decides where events go.
 */

/** Dev-only transport: logs event name + payload to the console. */
export const consoleTransport: AnalyticsTransport = (event) => {
  const { name, ...payload } = event;
  console.debug(`[analytics] ${name}`, payload);
};

/**
 * GA4 transport stub.
 *
 * TODO(GA4): when GA4 lands, load gtag.js keyed by `GA4_ID` (config/site.ts)
 * behind Google Consent Mode v2, then forward events as
 * `gtag("event", event.name, payload)`. Until then this is deliberately a
 * no-op so wiring it up early cannot leak anything.
 */
export const ga4Transport: AnalyticsTransport = () => {
  // no-op until GA4 is configured
};

/**
 * Install the transport appropriate for the environment and consent state.
 * Called from the ConsentBanner flow on mount and on every consent change.
 *
 * Decision: analytics events in this design are anonymous counts (ids and
 * slugs only — see events.ts), but GA4 still gets gated on consent when it
 * arrives. Until GA4 lands, production keeps the default no-op transport
 * regardless of consent; development gets a console transport (unless the
 * visitor declined) so events are visible while building.
 */
export function initAnalytics(consent: ConsentState): void {
  if (process.env.NODE_ENV === "development" && consent !== "denied") {
    setAnalyticsTransport(consoleTransport);
  } else {
    setAnalyticsTransport(() => {});
  }
}
