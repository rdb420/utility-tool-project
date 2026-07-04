import { GoogleTagManager } from "@next/third-parties/google";
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
      {/* Google Tag Manager — via @next/third-parties (the Next-recommended
          integration). Injects the GTM-NRM7V3BN container + dataLayer using
          next/script under the hood. */}
      <GoogleTagManager gtmId="GTM-NRM7V3BN" />
      <body>
        {/* Google Tag Manager (noscript) — immediately after the opening <body>.
            GoogleTagManager does not emit the <noscript> fallback, so keep it. */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NRM7V3BN"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* consentmanager CMP (173918) — semi-automatic blocking, EXTERNAL code,
            installed per consentmanager's official Next.js SSR guidance:
            next/script with strategy="afterInteractive". Loads the CMP site-wide
            (the consent banner + the inline preferences box on /privacy-policy/). */}
        <Script
          id="consentmanager"
          strategy="afterInteractive"
          type="text/javascript"
          data-cmp-ab="1"
          src="https://cdn.consentmanager.net/delivery/js/semiautomatic.min.js"
          data-cmp-cdid="3ba155ac627e4"
          data-cmp-host="c.delivery.consentmanager.net"
          data-cmp-cdn="cdn.consentmanager.net"
          data-cmp-codesrc="0"
        />
        {/* AdSense tag — for ad serving + AdSense account review only. No ad
            units render until ADS_ENABLED is on and a real <ins> is wired.
            Consent is managed by consentmanager (above); revisit ad-consent
            gating before enabling ad units. */}
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
