import type { AnalyticsEvent } from "./events";

export type { AnalyticsEvent } from "./events";

export type AnalyticsTransport = (event: AnalyticsEvent) => void;

/** No-op by default; a real transport (GA4) is installed post-launch. */
let transport: AnalyticsTransport = () => {};

export function setAnalyticsTransport(next: AnalyticsTransport): void {
  transport = next;
}

export function track(event: AnalyticsEvent): void {
  try {
    transport(event);
  } catch {
    // Analytics must never break the tool.
  }
}
