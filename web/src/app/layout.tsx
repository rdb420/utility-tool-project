import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import Script from "next/script";
import AppBar from "@/components/layout/AppBar";
import Footer from "@/components/layout/Footer";
import { BASE_URL, SITE_NAME } from "@/config/site";
import AnalyticsLoader from "@/lib/analytics/AnalyticsLoader";
import "./globals.css";

const ADSENSE_ACCOUNT = process.env.NEXT_PUBLIC_ADSENSE_ACCOUNT;

/**
 * EEA (27 EU) + Iceland/Liechtenstein/Norway + UK + Switzerland — the regions
 * that get the stricter all-denied Consent Mode default until the CMP records
 * a choice. ISO 3166-1 alpha-2, alphabetized (32 codes).
 */
const EEA_UK_CH = [
  "AT", "BE", "BG", "CH", "CY", "CZ", "DE", "DK", "EE", "ES", "FI", "FR",
  "GB", "GR", "HR", "HU", "IE", "IS", "IT", "LI", "LT", "LU", "LV", "MT",
  "NL", "NO", "PL", "PT", "RO", "SE", "SI", "SK",
];

/**
 * Consent bootstrap — ONE script so ordering is guaranteed: it (1) sets the
 * Consent Mode v2 default (the SAFETY NET), then (2) injects consentmanager.
 *
 * consentmanager (the certified TCF v2.2 + GPP CMP) is the source of truth for
 * consent: it shows the banner and, with Google Consent Mode enabled in its
 * dashboard, issues the `consent update` calls. Those updates only override a
 * *default*, so we establish a conservative default FIRST (ads denied
 * everywhere; analytics granted outside the EEA/UK/CH, denied within), then
 * load the CMP in the same script so it can never run before the default.
 * `wait_for_update` holds tags briefly for the CMP's update. If the CMP's
 * Consent Mode is ever misconfigured, the default still keeps EEA/UK/CH
 * visitors cookieless — the site fails safe, never open.
 *
 * consentmanager reads its config from the data-cmp-* attributes on its own
 * script element (by query selector), so injecting them here is equivalent to
 * the static tag from the consentmanager dashboard.
 */
const CONSENT_BOOTSTRAP_JS = `
window.dataLayer=window.dataLayer||[];
window.gtag=window.gtag||function(){window.dataLayer.push(arguments);};
gtag('consent','default',{'ad_storage':'denied','ad_user_data':'denied','ad_personalization':'denied','analytics_storage':'granted','wait_for_update':500});
gtag('consent','default',{'ad_storage':'denied','ad_user_data':'denied','ad_personalization':'denied','analytics_storage':'denied','wait_for_update':500,'region':${JSON.stringify(EEA_UK_CH)}});
(function(){var s=document.createElement('script');s.src='https://cdn.consentmanager.net/delivery/js/semiautomatic.min.js';s.type='text/javascript';s.setAttribute('data-cmp-ab','1');s.setAttribute('data-cmp-cdid','b6d1255cc2306');s.setAttribute('data-cmp-host','b.delivery.consentmanager.net');s.setAttribute('data-cmp-cdn','cdn.consentmanager.net');s.setAttribute('data-cmp-codesrc','0');(document.head||document.documentElement).appendChild(s);})();
`.trim();

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Free, fast calculators for inventory and freight. One connected workbench for the people who move and count stock.",
  // Search Console / AdSense site verification. The token lives only in the
  // deployment env (Vercel), never in the repo; Next renders the meta tag
  // only when the env var is set.
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
  // AdSense account association (site-connection meta tag). The publisher id
  // is public (it is in ads.txt), so it ships in .env.production.
  other: ADSENSE_ACCOUNT
    ? { "google-adsense-account": ADSENSE_ACCOUNT }
    : {},
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {/* 1. Consent bootstrap — sets the Consent Mode v2 safety-net default,
              then injects consentmanager (the certified TCF v2.2 + GPP CMP), in
              that order, so no tag fires unconsented in the EEA/UK/CH and the CMP
              can never run before the default. beforeInteractive = runs before
              GA4 (which loads on idle). */}
        <Script
          id="consent-bootstrap"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: CONSENT_BOOTSTRAP_JS }}
        />
        {/* 2. AdSense tag — loaded for ad serving + AdSense review (afterInteractive,
              no longer a CMP). Once approved, ad serving reads consentmanager's TCF
              consent. No ad units render until ADS_ENABLED is on and a real <ins>
              is wired. Disable Google's own consent message in AdSense so there
              is a single CMP (consentmanager). */}
        {ADSENSE_ACCOUNT && (
          <Script
            id="adsense"
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_ACCOUNT}`}
            strategy="afterInteractive"
            crossOrigin="anonymous"
          />
        )}
        <AppBar />
        <main className="mx-auto w-full max-w-[1080px] flex-1 px-6">
          {children}
        </main>
        <Footer />
        {/* GA4 bootstrap: no-op when NEXT_PUBLIC_GA4_ID is empty; otherwise
            injects gtag.js after the page is idle. Consent is owned by
            consentmanager (above) + the code-side default; this loader pushes no
            consent calls. Renders nothing. */}
        <AnalyticsLoader />
        {/* Vercel Web Analytics + Speed Insights (Core Web Vitals). Both are
            cookieless and only report when the app runs on Vercel with the
            respective feature enabled in the project dashboard. */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
