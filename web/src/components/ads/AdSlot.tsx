"use client";

import { useEffect, useRef, useState } from "react";
import { ADS_ENABLED, ENABLED_AD_SLOTS } from "@/config/site";
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
 * A slot renders only when BOTH hold:
 *   1. `ADS_ENABLED` (NEXT_PUBLIC_ADS_ENABLED) is true, and
 *   2. the slot id is in `ENABLED_AD_SLOTS` (A + D for MVP; B/C are accepted
 *      by type so pages can place them now, but render null until earned).
 *
 * Consent is NOT gated here anymore: Google's certified CMP owns consent, and
 * AdSense/Consent Mode decide per visitor whether a personalised or
 * non-personalised ad serves. Otherwise the slot renders NOTHING — zero DOM,
 * zero height. Reserved-height CLS protection only matters once an ad can
 * actually load into the box.
 *
 * When it does render, the container reserves the kit's minimum heights
 * (A: 280px mobile / 250px ≥760px, eager; D: 250px, lazy via
 * IntersectionObserver) so the page never shifts when an ad arrives, and the
 * mono "Advertisement" micro-label marks it as an ad. Styling is deliberately
 * plain — an ad must never look like a result.
 */
export default function AdSlot({ slot }: { slot: AdSlotId }) {
  const ref = useRef<HTMLElement>(null);

  // Slot A sits right below the tool (first screen) and loads eagerly; the
  // below-the-fold slots fetch only as the reader scrolls (kit §05).
  const lazy = slot !== "A";
  const [inView, setInView] = useState(false);
  const visible = !lazy || !HAS_INTERSECTION_OBSERVER || inView;

  const show =
    ADS_ENABLED && (ENABLED_AD_SLOTS as readonly string[]).includes(slot);

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
                data-ad-client="ca-pub-9610958335722543"
                data-ad-slot="…"
                data-ad-format="auto"
                data-full-width-responsive="true"
              />

            The adsbygoogle.js loader already ships from the root layout (it
            also delivers the CMP), so wiring a unit is just the <ins> plus a
            `(adsbygoogle = window.adsbygoogle || []).push({})` call. Auto-ads
            must exclude the tool region.
          */}
        </>
      )}
    </aside>
  );
}
