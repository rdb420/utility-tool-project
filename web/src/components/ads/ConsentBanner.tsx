"use client";

import Link from "next/link";
import { useEffect } from "react";
import { initAnalytics } from "@/lib/analytics/transports";
import { useConsent } from "@/lib/consent/useConsent";
import styles from "./ConsentBanner.module.css";

/**
 * First-visit consent banner.
 *
 * SCAFFOLD ONLY. Before any real ad serves to visitors in the EEA, UK, or
 * Switzerland, this must be replaced by a Google-certified IAB TCF v2.2
 * Consent Management Platform plus Google Consent Mode v2 (the ad_user_data /
 * ad_personalization signals) — see docs/mockups/opscrunch_adsense_kit.html
 * §07. Until then this banner records a plain granted/denied choice that
 * AdSlot and the analytics transport respect.
 *
 * Kit rule: this banner is the ONLY overlay OpsCrunch shows — no modals, no
 * interstitials. It is a fixed bottom strip, never covers the tool, and
 * disappears permanently once a choice is made (choice kept in localStorage).
 */
export default function ConsentBanner() {
  const { consent, ready, setConsent } = useConsent();

  // (Re)install the analytics transport whenever the consent state settles or
  // changes. See transports.ts for the decision record: no-op in production
  // until GA4 lands; console transport in development unless declined.
  useEffect(() => {
    if (ready) initAnalytics(consent);
  }, [ready, consent]);

  // SSR guard: localStorage doesn't exist on the server, so render nothing
  // until mounted; then show only while no choice has been made.
  if (!ready || consent !== "unset") return null;

  return (
    <div className={styles.banner} role="region" aria-label="Cookie consent">
      <p className={styles.copy}>
        We use one analytics cookie to count visits — decline it and we still
        count, just without the cookie. Your calculator numbers never leave
        the page. Ads, when they launch, will ask separately. Your choice is
        saved in this browser; details in the{" "}
        <Link href="/cookie-policy/">cookie policy</Link>.
      </p>
      <div className={styles.actions}>
        <button
          type="button"
          className={styles.accept}
          onClick={() => setConsent("granted")}
        >
          Accept
        </button>
        <button
          type="button"
          className={styles.decline}
          onClick={() => setConsent("denied")}
        >
          Decline
        </button>
      </div>
    </div>
  );
}
