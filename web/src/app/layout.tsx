import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import Script from "next/script";
import AppBar from "@/components/layout/AppBar";
import Footer from "@/components/layout/Footer";
import { BASE_URL, SITE_NAME } from "@/config/site";
import AnalyticsInit from "@/lib/analytics/AnalyticsInit";
import "./globals.css";

/**
 * Env-injected ids are interpolated into an inline `<script>` (the consent
 * bootstrap) and into script/iframe src attributes, so a stray newline or space
 * — e.g. a copy-paste artifact in a Vercel env var — would be a JS syntax error
 * that silently kills the entire bootstrap. Strip everything but the characters
 * these ids legitimately use.
 */
const cleanId = (v?: string) => (v ?? "").replace(/[^A-Za-z0-9_-]/g, "");
const ADSENSE_ACCOUNT = cleanId(process.env.NEXT_PUBLIC_ADSENSE_ACCOUNT);
const GTM_ID = cleanId(process.env.NEXT_PUBLIC_GTM_ID);

/** GTM loader, appended to the consent bootstrap so it runs AFTER the default. */
const GTM_SNIPPET = GTM_ID
  ? `window.dataLayer.push({'gtm.start':(new Date()).getTime(),event:'gtm.js'});(function(){var g=document.createElement('script');g.async=true;g.src='https://www.googletagmanager.com/gtm.js?id=${GTM_ID}';(document.head||document.documentElement).appendChild(g);})();`
  : "";

/**
 * Consent bootstrap — ONE script so ordering is guaranteed. In order it:
 *   1. sets the Consent Mode v2 ALL-DENIED default (+ `default_consent`),
 *   2. injects consentmanager (certified TCF v2.2 + GPP CMP, cdid b6d1255cc2306),
 *   3. loads GTM (which owns GA4).
 *
 * Google Tag Manager owns GA4 (config + event tags built in the GTM UI). The
 * GA4 tag is gated on consent there — e.g. it fires only when
 * `cmpConsentVendors contains ,s26,` (Google Analytics vendor consented) — which
 * derives directly from consentmanager's vendor-consent list and avoids the
 * Consent Mode signal-mapping pitfalls. The all-denied default is set first so
 * nothing is consented until consentmanager reports a choice (fails safe), and
 * `wait_for_update` holds tags briefly for it. Per consentmanager guidance the
 * default MUST be all-denied. All region logic lives in consentmanager.
 */
const CONSENT_BOOTSTRAP_JS = `
window.dataLayer=window.dataLayer||[];
window.gtag=window.gtag||function(){window.dataLayer.push(arguments);};
gtag('consent','default',{'ad_storage':'denied','analytics_storage':'denied','ad_user_data':'denied','ad_personalization':'denied','wait_for_update':500});
window.dataLayer.push({'event':'default_consent'});
(function(){var s=document.createElement('script');s.src='https://cdn.consentmanager.net/delivery/js/semiautomatic.min.js';s.type='text/javascript';s.setAttribute('data-cmp-ab','1');s.setAttribute('data-cmp-cdid','b6d1255cc2306');s.setAttribute('data-cmp-host','b.delivery.consentmanager.net');s.setAttribute('data-cmp-cdn','cdn.consentmanager.net');s.setAttribute('data-cmp-codesrc','0');(document.head||document.documentElement).appendChild(s);})();
${GTM_SNIPPET}
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
        {/* GTM <noscript> — must sit at the very top of <body>. */}
        {GTM_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
              title="Google Tag Manager"
            />
          </noscript>
        )}
        {/* Consent bootstrap — all-denied Consent Mode default, then
            consentmanager, then GTM (which owns GA4). See CONSENT_BOOTSTRAP_JS. */}
        <Script
          id="consent-bootstrap"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: CONSENT_BOOTSTRAP_JS }}
        />
        {/* AdSense tag — for ad serving + AdSense review only (afterInteractive,
            not a CMP). Reads consentmanager's TCF consent once ads are live. No
            ad units render until ADS_ENABLED is on and a real <ins> is wired. */}
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
        {/* Points track() at the dataLayer so GTM routes events to GA4.
            GA4/page_views/consent gating all live in the GTM container. */}
        <AnalyticsInit />
        {/* Vercel Web Analytics + Speed Insights (Core Web Vitals). Both are
            cookieless and only report when the app runs on Vercel with the
            respective feature enabled in the project dashboard. */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
