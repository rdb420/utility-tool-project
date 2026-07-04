import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import Script from "next/script";
import ConsentBanner from "@/components/ads/ConsentBanner";
import AppBar from "@/components/layout/AppBar";
import Footer from "@/components/layout/Footer";
import { BASE_URL, SITE_NAME } from "@/config/site";
import AnalyticsLoader from "@/lib/analytics/AnalyticsLoader";
import "./globals.css";

const ADSENSE_ACCOUNT = process.env.NEXT_PUBLIC_ADSENSE_ACCOUNT;

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
        {/*
          AdSense tag — loaded so the site is present for AdSense review and so
          Google's certified CMP can activate the moment the site is approved.
          IMPORTANT: until AdSense approves, this tag is DORMANT — Google does
          not serve the EEA/UK + US consent messages and does not drive Consent
          Mode (verified: no `googlefc`/`__tcfapi` at runtime). So consent is
          currently owned by the code-side Consent Mode defaults + ConsentBanner
          (see lib/analytics/ga4.ts). Once approval lands and the CMP is
          confirmed live, hand consent to it and remove the code-side consent.
          No ad units render until ADS_ENABLED is on and a real <ins> is wired.
        */}
        {ADSENSE_ACCOUNT && (
          <Script
            id="adsense-cmp"
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
        {/* First-visit consent banner (accept/decline in localStorage),
            consumed by AdSlot + the analytics transport. Active until Google's
            CMP is approved and takes over (see the AdSense tag comment above). */}
        <ConsentBanner />
        {/* GA4 bootstrap: no-op when NEXT_PUBLIC_GA4_ID is empty; otherwise
            injects gtag.js after the page is idle, behind Consent Mode v2
            denied-by-default. Renders nothing. */}
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
