"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { GA4_ID } from "@/config/site";
import { useConsent } from "@/lib/consent/useConsent";
import { applyConsentToGa4, loadGa4, sendGa4PageView } from "./ga4";
import { initAnalytics } from "./transports";

/**
 * Client-side GA4 bootstrap, mounted once in the root layout.
 *
 * Renders nothing and does nothing at all when GA4_ID is empty (local dev
 * default) — the existing dev console transport installed by ConsentBanner
 * stays untouched.
 *
 * Loading strategy (kit rule: calculator first, third parties last):
 *   1. Wait for hydration, then for `requestIdleCallback` (fallback: the
 *      window `load` event / a 0ms timeout if already complete). Nothing GA4
 *      touches the network until the tool is interactive.
 *   2. `loadGa4` pushes the Consent Mode v2 all-denied defaults BEFORE
 *      injecting the gtag.js script tag (see ga4.ts for the decision record).
 *   3. Once gtag exists, install the GA4 transport and reflect the visitor's
 *      banner choice (`analytics_storage` upgrade on granted; ad signals
 *      stay denied — no ads are served yet).
 *   4. App Router client navigations don't re-fire gtag's automatic
 *      page_view, so send one per pathname change — skipping the first
 *      render (the `config` hit already counted it). `usePathname()` never
 *      includes query strings, so no operational values can leak into URLs.
 */
export default function AnalyticsLoader() {
  const { consent, ready } = useConsent();
  const pathname = usePathname();
  const [gtagReady, setGtagReady] = useState(false);

  // 1+2: deferred, one-time script injection.
  useEffect(() => {
    if (!GA4_ID) return;
    let cancelled = false;
    const start = () => {
      if (cancelled) return;
      loadGa4(GA4_ID);
      setGtagReady(true);
    };
    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(start, { timeout: 5000 });
      return () => {
        cancelled = true;
        window.cancelIdleCallback?.(id);
      };
    }
    if (document.readyState === "complete") {
      const timer = window.setTimeout(start, 0);
      return () => {
        cancelled = true;
        window.clearTimeout(timer);
      };
    }
    window.addEventListener("load", start, { once: true });
    return () => {
      cancelled = true;
      window.removeEventListener("load", start);
    };
  }, []);

  // 3: transport + consent, re-applied whenever the banner choice changes.
  useEffect(() => {
    if (!gtagReady || !ready) return;
    initAnalytics(consent);
    applyConsentToGa4(consent);
  }, [gtagReady, ready, consent]);

  // 4: page_view on client-side route changes (skip the initial pathname —
  // the gtag config call already reported it).
  const isFirstPathname = useRef(true);
  useEffect(() => {
    if (!gtagReady) return;
    if (isFirstPathname.current) {
      isFirstPathname.current = false;
      return;
    }
    sendGa4PageView(pathname);
  }, [gtagReady, pathname]);

  return null;
}
