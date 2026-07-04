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
 * Consent bootstrap — ONE script so ordering is guaranteed: it (1) sets the
 * Consent Mode v2 default, then (2) injects consentmanager.
 *
 * consentmanager (the certified TCF v2.2 + GPP CMP) is the source of truth for
 * consent: it shows the banner and, with Google Consent Mode enabled in its
 * dashboard, issues the `consent update` calls that grant/deny per the user's
 * choice and region.
 *
 * Per consentmanager's own guidance, the default must be ALL DENIED: a granted
 * default is not valid under GDPR for the EEA/UK (Google would count
 * non-consenting users), so we deny everything first and let the CMP's update
 * grant where allowed. All region logic lives in consentmanager, not here.
 * `wait_for_update` holds tags briefly for that update, and the `default_consent`
 * dataLayer event matches the vendor's documented snippet. This is the Consent
 * Mode v2 "Advanced" pattern — GA4 still fires, but cookieless until consent is
 * granted.
 *
 * The CMP is injected in the SAME script, after the default, so it can never
 * run first. consentmanager reads its config from the data-cmp-* attributes on
 * its own script element, so injecting them here equals the dashboard tag.
 */
const CONSENT_BOOTSTRAP_JS = `
window.dataLayer=window.dataLayer||[];
window.gtag=window.gtag||function(){window.dataLayer.push(arguments);};
gtag('consent','default',{'ad_storage':'denied','analytics_storage':'denied','ad_user_data':'denied','ad_personalization':'denied','wait_for_update':500});
window.dataLayer.push({'event':'default_consent'});
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
        {/* 1. Consent bootstrap — sets the all-denied Consent Mode v2 default,
              then injects consentmanager (the certified TCF v2.2 + GPP CMP), in
              that order, so nothing is consented until the CMP's update and the
              CMP can never run before the default. beforeInteractive = runs
              before GA4 (which loads on idle). */}
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
