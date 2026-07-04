"use client";

import { useEffect } from "react";
import { initAnalytics } from "./transports";

/**
 * Installs the analytics transport once on mount, pointing `track()` at the GTM
 * dataLayer. GA4, page_views, and consent gating all live in the GTM container
 * — nothing to load or sequence here. Renders nothing.
 */
export default function AnalyticsInit() {
  useEffect(() => {
    initAnalytics();
  }, []);
  return null;
}
