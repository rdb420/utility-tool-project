"use client";

import { useEffect, useRef, useState } from "react";
import { ADS_ENABLED, ENABLED_AD_SLOTS } from "@/config/site";
import { useConsent } from "@/lib/consent/useConsent";
import styles from "./AdSlot.module.css";

export type AdSlotId = "A" | "B" | "C" | "D";

/**
 * Evaluated per environment: false on the server (where the component renders
 * null anyway) and in old browsers/jsdom, where the lazy slots simply render
 * eagerly instead of never appearing.
 */
const HAS_INTERSECTION_OBSERVER = typeof IntersectionObserver !== "undefined";

/**
 * The one reusable ad slot (docs/mockups/opscrunch_adsense_kit.html §09).
 *
 * A slot renders only when ALL of these hold:
 *   1. `ADS_ENABLED` (NEXT_PUBLIC_ADS_ENABLED) is true,
 *   2. the slot id is in `ENABLED_AD_SLOTS` (A + D for MVP; B/C are accepted
 *      by type so pages can place them now, but render null until earned),
 *   3. the visitor granted consent.
 *
 * Otherwise it renders NOTHING — zero DOM, zero height. Reserved-height CLS
 * protection only matters once an ad can actually load into the box; while
 * ads are off, an empty reserved box would just be a hole in the page.
 *
 * When it does render, the container reserves the kit's minimum heights
 * (A: 280px mobile / 250px ≥760px, eager; D: 250px, lazy via
 * IntersectionObserver) so the page never shifts when an ad arrives, and the
 * mono "Advertisement" micro-label marks it as an ad. Styling is deliberately
 * plain — no signal, no amber, no readout styling — an ad must never look
 * like a result.
 */
export default function AdSlot({ slot }: { slot: AdSlotId }) {
  const { consent } = useConsent();
  const ref = useRef<HTMLElement>(null);

  // Slot A sits right below the tool (first screen) and loads eagerly; the
  // below-the-fold slots fetch only as the reader scrolls (kit §05).
  const lazy = slot !== "A";
  const [inView, setInView] = useState(false);
  const visible = !lazy || !HAS_INTERSECTION_OBSERVER || inView;

  const enabled =
    ADS_ENABLED && (ENABLED_AD_SLOTS as readonly string[]).includes(slot);
  const show = enabled && consent === "granted";

  useEffect(() => {
    if (!show || !lazy || !HAS_INTERSECTION_OBSERVER || inView) return;
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [show, lazy, inView]);

  if (!show) return null;

  return (
    <aside
      ref={ref}
      className={`${styles.slot} ${slot === "A" ? styles.slotA : styles.slotBelow}`}
      data-ad-slot={slot}
      aria-label="Advertisement"
    >
      {visible && (
        <>
          {/* "Advertisement" is one of the only two labels AdSense permits. */}
          <span className={styles.label}>Advertisement</span>
          {/*
            FUTURE AD WIRING — after AdSense approval, the real unit mounts
            here inside the reserved box:

              <ins
                className="adsbygoogle"
                style={{ display: "block" }}
                data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
                data-ad-slot="…"
                data-ad-format="auto"
                data-full-width-responsive="true"
              />

            plus a one-time async adsbygoogle.js loader that runs only after
            the tool is interactive and consent is resolved (kit §09 order of
            operations: calculator → interactive → consent → ads). Auto-ads
            must exclude the tool region.
          */}
        </>
      )}
    </aside>
  );
}
