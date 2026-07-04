import { GA4_ID } from "@/config/site";
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
 * Install the transport appropriate for the environment.
 *
 * Consent is no longer decided here — Google's certified CMP owns Consent
 * Mode (see ga4.ts). Once gtag.js exists (AnalyticsLoader injected it), events
 * go to GA4 and Consent Mode turns them into cookieless pings whenever the CMP
 * has consent denied. Until gtag loads (or when GA4_ID is empty), production
 * keeps the no-op transport; development gets a console transport so events
 * are visible while building.
 */
export function initAnalytics(): void {
  if (
    GA4_ID &&
    typeof window !== "undefined" &&
    typeof window.gtag === "function"
  ) {
    setAnalyticsTransport(ga4Transport);
  } else if (process.env.NODE_ENV === "development") {
    setAnalyticsTransport(consoleTransport);
  } else {
    setAnalyticsTransport(() => {});
  }
}
