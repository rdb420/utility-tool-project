import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import Script from "next/script";
import AppBar from "@/components/layout/AppBar";
import Footer from "@/components/layout/Footer";
import { BASE_URL, SITE_NAME } from "@/config/site";
import "./globals.css";

/**
 * Env-injected ids are interpolated into script/meta attributes, so a stray
 * newline or space — e.g. a copy-paste artifact in a Vercel env var — would be a
 * markup error. Strip everything but the characters these ids legitimately use.
 */
const cleanId = (v?: string) => (v ?? "").replace(/[^A-Za-z0-9_-]/g, "");
const ADSENSE_ACCOUNT = cleanId(process.env.NEXT_PUBLIC_ADSENSE_ACCOUNT);

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
        {/* AdSense tag — for ad serving + AdSense account review only. No ad
            units render until ADS_ENABLED is on and a real <ins> is wired.
            NOTE: there is currently NO consent management platform on the site
            (removed pending a rebuild); revisit consent gating before enabling
            ads or before this script sets any non-essential cookies. */}
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
        {/* Vercel Web Analytics + Speed Insights (Core Web Vitals) — cookieless,
            no dataLayer, only report when running on Vercel with the feature on. */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
