import type { Metadata } from "next";
import ConsentBanner from "@/components/ads/ConsentBanner";
import AppBar from "@/components/layout/AppBar";
import Footer from "@/components/layout/Footer";
import { BASE_URL, SITE_NAME } from "@/config/site";
import AnalyticsLoader from "@/lib/analytics/AnalyticsLoader";
import "./globals.css";

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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppBar />
        <main className="mx-auto w-full max-w-[1080px] flex-1 px-6">
          {children}
        </main>
        <Footer />
        {/* First-visit consent banner (accept/decline in localStorage),
            consumed by AdSlot + the analytics transport. */}
        <ConsentBanner />
        {/* GA4 bootstrap: no-op when NEXT_PUBLIC_GA4_ID is empty; otherwise
            injects gtag.js after the page is idle, behind Consent Mode v2
            denied-by-default. Renders nothing. */}
        <AnalyticsLoader />
      </body>
    </html>
  );
}
