import type { Metadata } from "next";
import Link from "next/link";
import Prose from "@/components/layout/Prose";
import { CONTACT_EMAIL, SITE_NAME } from "@/config/site";

export const metadata: Metadata = {
  title: "Cookie policy",
  description:
    "What OpsCrunch stores in your browser: a Google Analytics cookie to count visits, a consent choice recorded by Google's certified consent tool, and ad cookies via Google only after ads launch and only with consent.",
  alternates: { canonical: "/cookie-policy/" },
};

const EFFECTIVE_DATE = "4 July 2026";

export default function CookiePolicyPage() {
  return (
    <Prose>
      <h1>Cookie policy</h1>
      <p>
        Effective date: {EFFECTIVE_DATE}. Short version: {SITE_NAME} uses one
        analytics cookie to count visits, and consent is handled by Google&apos;s
        certified consent tool — nothing else.
      </p>

      <h2>How consent is managed</h2>
      <p>
        Consent is managed by Google&apos;s certified consent management
        platform (a Google-certified IAB TCF v2.2 CMP with Google Consent Mode
        v2). Visitors in the EEA, UK, and Switzerland see a consent message and
        choose before any non-essential cookie is set; visitors in applicable
        US states see a privacy notice with opt-out controls. Google&apos;s tool
        records your choice in your browser (a consent string) so you are not
        asked on every visit.
      </p>

      <h2>What is stored now</h2>
      <ul>
        <li>
          <strong>Consent choice</strong> — Google&apos;s consent tool stores
          your choice in your browser so it is remembered between visits.
        </li>
        <li>
          <strong>Analytics cookie</strong> (Google Analytics) — counts visits,
          set according to your consent. Where consent is denied, Consent Mode
          keeps analytics cookieless — we still count the visit, just without
          the cookie. Analytics events carry tool identifiers only; your
          calculator inputs never leave your browser.
        </li>
      </ul>

      <h2>What will be stored when ads launch</h2>
      <p>
        When display advertising launches, Google and its certified ad partners
        will set cookies to serve and measure ads, governed by the same consent
        tool. In the EEA, UK, and Switzerland ad cookies are set only after you
        agree; if you decline, ad cookies are not set.
      </p>

      <h2>Changing or withdrawing your choice</h2>
      <p>
        You can revisit your choice at any time through Google&apos;s privacy
        options (the &ldquo;manage&rdquo; / privacy-settings control the consent
        message provides), or by clearing this site&apos;s data in your browser
        settings (usually under Privacy &rarr; Site data), which prompts the
        consent message again on your next visit.
      </p>

      <h2>Questions</h2>
      <p>
        Write to <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. The{" "}
        <Link href="/privacy-policy/">privacy policy</Link> covers the rest of
        the data story.
      </p>
    </Prose>
  );
}
