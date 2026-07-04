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
 * Env-injected ids are interpolated into inline scripts / src attributes, so a
 * stray newline or space — e.g. a copy-paste artifact in a Vercel env var —
 * would be a JS syntax error. Strip everything but the characters these ids use.
 */
const cleanId = (v?: string) => (v ?? "").replace(/[^A-Za-z0-9_-]/g, "");
const ADSENSE_ACCOUNT = cleanId(process.env.NEXT_PUBLIC_ADSENSE_ACCOUNT);
const GTM_ID = cleanId(process.env.NEXT_PUBLIC_GTM_ID);

/**
 * Consent Mode v2 ALL-DENIED default. Rendered as a plain inline <script> (NOT
 * next/script) so it executes synchronously at parse time — before the
 * consentmanager tag that immediately follows it. consentmanager's own guidance
 * requires the all-denied default be set before its loader; `wait_for_update`
 * briefly holds tags until the CMP reports a choice, so nothing fires until then.
 */
const CONSENT_DEFAULT_JS =
  `window.dataLayer=window.dataLayer||[];` +
  `window.gtag=window.gtag||function(){window.dataLayer.push(arguments);};` +
  `gtag('consent','default',{'ad_storage':'denied','analytics_storage':'denied','ad_user_data':'denied','ad_personalization':'denied','wait_for_update':500});` +
  `window.dataLayer.push({'event':'default_consent'});`;

/**
 * Standard GTM loader. Runs AFTER the consentmanager tag so the CMP's
 * semiautomatic auto-blocker (`data-cmp-ab="1"`) is already armed and can detect
 * + gate GTM/GA4. Plain inline <script> so ordering is guaranteed by the source.
 */
const GTM_LOADER_JS = GTM_ID
  ? `window.dataLayer=window.dataLayer||[];window.dataLayer.push({'gtm.start':(new Date()).getTime(),event:'gtm.js'});(function(){var g=document.createElement('script');g.async=true;g.src='https://www.googletagmanager.com/gtm.js?id=${GTM_ID}';(document.head||document.documentElement).appendChild(g);})();`
  : "";

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
        {/* 1. Consent Mode v2 all-denied default — synchronous, before the CMP. */}
        <script
          id="consent-default"
          dangerouslySetInnerHTML={{ __html: CONSENT_DEFAULT_JS }}
        />
        {/* 2. consentmanager (certified TCF v2.2 + GPP CMP, CMP 173913) — the
            EXACT tag from the consentmanager dashboard, rendered as a plain,
            synchronous <script> at the very beginning of <body>, per their
            integration instructions. It must load first and synchronously so the
            semiautomatic auto-blocker arms and can intercept + detect GTM / GA4 /
            AdSense before they run — which is what populates the vendor list and
            lets consent gate them. Do NOT wrap this in next/script (that defers
            it) or move it to <head>. */}
        {/* eslint-disable-next-line @next/next/no-sync-scripts -- consentmanager
            MUST load synchronously and first so its auto-blocker arms before
            GTM/GA4/AdSense; this is their required integration, not an oversight. */}
        <script
          type="text/javascript"
          data-cmp-ab="1"
          src="https://cdn.consentmanager.net/delivery/js/semiautomatic.min.js"
          data-cmp-cdid="b6d1255cc2306"
          data-cmp-host="b.delivery.consentmanager.net"
          data-cmp-cdn="cdn.consentmanager.net"
          data-cmp-codesrc="0"
        />
        {/* 3. GTM (owns GA4) — after consentmanager so the CMP can gate it. */}
        {GTM_ID && (
          <>
            <noscript>
              <iframe
                src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
                height="0"
                width="0"
                style={{ display: "none", visibility: "hidden" }}
                title="Google Tag Manager"
              />
            </noscript>
            <script
              id="gtm-loader"
              dangerouslySetInnerHTML={{ __html: GTM_LOADER_JS }}
            />
          </>
        )}
        {/* AdSense tag — for ad serving + AdSense review only (afterInteractive,
            not a CMP). consentmanager's auto-blocker gates it. No ad units render
            until ADS_ENABLED is on and a real <ins> is wired. */}
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
        {/* Vercel Web Analytics + Speed Insights (Core Web Vitals) — cookieless. */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
