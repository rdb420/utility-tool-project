"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { GA4_ID } from "@/config/site";
import { loadGa4, sendGa4PageView } from "./ga4";
import { initAnalytics } from "./transports";

/**
 * Client-side GA4 bootstrap, mounted once in the root layout.
 *
 * Renders nothing and does nothing at all when GA4_ID is empty (local dev
 * default) — the dev console transport stays untouched.
 *
 * Consent is owned by Google's certified CMP (see ga4.ts), which loads
 * `beforeInteractive` and sets Consent Mode defaults before this runs. This
 * component only:
 *   1. Waits for hydration, then for `requestIdleCallback` (fallback: the
 *      window `load` event / a 0ms timeout). Nothing GA4 touches the network
 *      until the tool is interactive — and by then the CMP has settled consent.
 *   2. `loadGa4` injects gtag.js (no consent calls of its own); gtag honours
 *      the consent state the CMP already established.
 *   3. Installs the GA4 transport once gtag exists.
 *   4. App Router client navigations don't re-fire gtag's automatic page_view,
 *      so send one per pathname change — skipping the first render (the
 *      `config` hit already counted it). `usePathname()` never includes query
 *      strings, so no operational values can leak into URLs.
 */
export default function AnalyticsLoader() {
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

  // 3: install the transport once gtag is live.
  useEffect(() => {
    if (!gtagReady) return;
    initAnalytics();
  }, [gtagReady]);

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
