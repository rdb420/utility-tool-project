import { GTM_ID } from "@/config/site";
import { gtmTransport } from "./gtm";
import { setAnalyticsTransport, type AnalyticsTransport } from "./index";

/**
 * Analytics transports. The event union (`events.ts`) and `track()`
 * (`index.ts`) are the stable contract other code depends on; this module only
 * decides where events go. With GTM owning GA4, the real transport pushes to
 * the dataLayer (`gtm.ts`).
 */

export { gtmTransport } from "./gtm";

/** Dev-only transport: logs event name + payload to the console. */
export const consoleTransport: AnalyticsTransport = (event) => {
  const { name, ...payload } = event;
  console.debug(`[analytics] ${name}`, payload);
};

/**
 * Install the transport appropriate for the environment.
 *
 * When GTM is configured, events go to the dataLayer for GTM to route to GA4
 * (consent is enforced by the GTM tag's trigger). Without GTM, development gets
 * a console transport so events are visible while building; production stays a
 * no-op.
 */
export function initAnalytics(): void {
  if (GTM_ID && typeof window !== "undefined") {
    setAnalyticsTransport(gtmTransport);
  } else if (process.env.NODE_ENV === "development") {
    setAnalyticsTransport(consoleTransport);
  } else {
    setAnalyticsTransport(() => {});
  }
}
