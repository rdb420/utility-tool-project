import type { Metadata } from "next";
import Link from "next/link";
import Prose from "@/components/layout/Prose";
import { CONTACT_EMAIL, SITE_NAME } from "@/config/site";

export const metadata: Metadata = {
  title: "Cookie policy",
  description:
    "What OpsCrunch stores in your browser: one localStorage entry for your consent choice, one Google Analytics cookie to count visits, and ad cookies via Google only after ads launch and only with consent.",
  alternates: { canonical: "/cookie-policy/" },
};

const EFFECTIVE_DATE = "3 July 2026";

export default function CookiePolicyPage() {
  return (
    <Prose>
      <h1>Cookie policy</h1>
      <p>
        Effective date: {EFFECTIVE_DATE}. Short version: {SITE_NAME} stores
        your consent choice in your browser and uses one analytics cookie to
        count visits — nothing else.
      </p>

      <h2>What is stored now</h2>
      <ul>
        <li>
          <strong>oc-consent</strong> (localStorage) — your Accept or Decline
          choice from the consent banner, so we don&apos;t ask again on every
          visit. It stays on your device and is never transmitted.
        </li>
        <li>
          <strong>Analytics cookie</strong> (Google Analytics) — counts
          visits. Outside the EEA, UK, and Switzerland it is set by default;
          within those regions it is set only after you choose Accept.
          Choosing Decline disables it everywhere — we still count visits,
          just without the cookie. Analytics events carry tool identifiers
          only; your calculator inputs never leave your browser.
        </li>
      </ul>

      <h2>What will be stored when ads launch</h2>
      <p>
        When display advertising launches, Google and its certified ad
        partners will set cookies to serve and measure ads. In the EEA, UK,
        and Switzerland that will only happen through a Google-certified
        consent platform (IAB TCF v2.2 with Google Consent Mode v2), and only
        after you agree. If you decline, ad cookies are not set.
      </p>

      <h2>Changing or withdrawing your choice</h2>
      <p>
        Your choice lives in this browser only. To change or withdraw it,
        clear this site&apos;s data in your browser settings (usually under
        Privacy &rarr; Site data) — the consent banner will appear again on
        your next visit and you can choose fresh. Once the full consent
        platform ships with advertising, a &ldquo;manage consent&rdquo;
        control will be available on every page.
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
