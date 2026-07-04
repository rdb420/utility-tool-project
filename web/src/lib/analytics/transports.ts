import { gtmTransport } from "./gtm";
import { setAnalyticsTransport } from "./index";

export { gtmTransport } from "./gtm";

/**
 * Install the analytics transport. GTM owns GA4 and gates it on consent
 * (`cmpConsentVendors contains ,s26,`), so in the browser we push every typed
 * event to the dataLayer and let the container enforce consent. On the server
 * (and in tests) `track()` stays the module-default no-op.
 */
export function initAnalytics(): void {
  if (typeof window === "undefined") return;
  setAnalyticsTransport(gtmTransport);
}
