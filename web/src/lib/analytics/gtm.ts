/**
 * dataLayer transport — forwards typed analytics events to the GTM dataLayer via
 * `@next/third-parties`' `sendGTMEvent`. GTM routes them to GA4 through tags
 * gated on consent (`cmpConsentVendors contains ,s26,`), so consent enforcement
 * lives in the container, not here. Only the event's own typed fields are
 * forwarded — never user input (the privacy contract in `events.ts`).
 */
import { sendGTMEvent } from "@next/third-parties/google";
import type { AnalyticsEvent, AnalyticsTransport } from "./index";

export const gtmTransport: AnalyticsTransport = (event: AnalyticsEvent) => {
  const { name, ...payload } = event;
  sendGTMEvent({ event: name, ...payload });
};
