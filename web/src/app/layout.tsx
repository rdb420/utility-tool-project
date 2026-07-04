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
          Google's certified CMP + Consent Mode v2. The AdSense tag delivers
          the EEA/UK and US privacy messages configured in AdSense and is the
          single source of truth for consent (see lib/analytics/ga4.ts).
          `beforeInteractive` loads it into <head> ahead of everything so it
          sets Consent Mode defaults before GA4 (which loads on idle) fires.
          No ad units render until ADS_ENABLED is on and a real <ins> is wired
          post-approval; the tag alone drives the CMP and ad-serving consent.
        */}
        {ADSENSE_ACCOUNT && (
          <Script
            id="adsense-cmp"
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_ACCOUNT}`}
            strategy="beforeInteractive"
            crossOrigin="anonymous"
          />
        )}
        <AppBar />
        <main className="mx-auto w-full max-w-[1080px] flex-1 px-6">
          {children}
        </main>
        <Footer />
        {/* GA4 bootstrap: no-op when NEXT_PUBLIC_GA4_ID is empty; otherwise
            injects gtag.js after the page is idle. Consent is owned by the CMP
            above, not by this loader. Renders nothing. */}
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
