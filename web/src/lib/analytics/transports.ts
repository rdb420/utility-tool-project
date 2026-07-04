import { GA4_ID } from "@/config/site";
import type { ConsentState } from "@/lib/consent/useConsent";
import { ga4Transport } from "./ga4";
import { setAnalyticsTransport, type AnalyticsTransport } from "./index";

/**
 * Analytics transports. The event union (`events.ts`) and `track()`
 * (`index.ts`) are the stable contract other code depends on; this module
 * only decides where events go. The real GA4 transport lives in `ga4.ts`.
 */

export { ga4Transport } from "./ga4";

/** Dev-only transport: logs event name + payload to the console. */
export const consoleTransport: AnalyticsTransport = (event) => {
  const { name, ...payload } = event;
  console.debug(`[analytics] ${name}`, payload);
};

/**
 * Install the transport appropriate for the environment and consent state.
 * Called from the ConsentBanner flow on mount and on every consent change,
 * and from AnalyticsLoader once gtag.js is live.
 *
 * Decision: analytics events are anonymous counts (ids and slugs only — see
 * events.ts). Once gtag exists (AnalyticsLoader injected it), events go to
 * GA4 regardless of the banner choice — Consent Mode v2 turns them into
 * cookieless pings when consent is denied (see ga4.ts). Until gtag loads
 * (or when GA4_ID is empty), production keeps the no-op transport;
 * development gets a console transport (unless the visitor declined) so
 * events are visible while building.
 */
export function initAnalytics(consent: ConsentState): void {
  if (
    GA4_ID &&
    typeof window !== "undefined" &&
    typeof window.gtag === "function"
  ) {
    setAnalyticsTransport(ga4Transport);
  } else if (process.env.NODE_ENV === "development" && consent !== "denied") {
    setAnalyticsTransport(consoleTransport);
  } else {
    setAnalyticsTransport(() => {});
  }
}
