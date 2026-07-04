import type { Metadata } from "next";
import Link from "next/link";
import Prose from "@/components/layout/Prose";
import { CONTACT_EMAIL, SITE_NAME } from "@/config/site";

export const metadata: Metadata = {
  title: "Privacy policy",
  description:
    "How OpsCrunch handles data: calculator inputs never leave your browser, analytics are anonymous counts, and one localStorage entry stores your cookie choice.",
  alternates: { canonical: "/privacy-policy/" },
};

const EFFECTIVE_DATE = "3 July 2026";

export default function PrivacyPolicyPage() {
  return (
    <Prose>
      <h1>Privacy policy</h1>
      <p>
        Effective date: {EFFECTIVE_DATE}. {SITE_NAME} is operated from
        Australia. This policy says plainly what we collect, which is very
        little.
      </p>

      <h2>What we do not collect</h2>
      <ul>
        <li>
          <strong>No accounts, no account data.</strong> There is nothing to
          sign up for, so we hold no names, passwords, or profiles.
        </li>
        <li>
          <strong>Your calculator inputs never leave your browser.</strong>{" "}
          Every calculation runs on your device. The numbers you type are not
          sent to us, not stored on any server, and not included in analytics.
        </li>
      </ul>

      <h2>Analytics</h2>
      <p>
        We count usage events with Google Analytics — which tool was opened,
        that a calculation ran, that a result was copied. These events carry
        tool identifiers only, never the values you entered. One analytics
        cookie supports this counting and is set according to your consent
        choice; where consent is denied, Google Consent Mode keeps the counting
        cookieless, so events cannot be tied to you. See the{" "}
        <Link href="/cookie-policy/">cookie policy</Link> for details.
      </p>

      <h2>Consent</h2>
      <p>
        Consent for analytics and (once launched) advertising is managed by
        Google&apos;s certified consent management platform — a Google-certified
        IAB TCF v2.2 CMP with Google Consent Mode v2. Visitors in the EEA, UK,
        and Switzerland are asked before non-essential cookies are set; visitors
        in applicable US states are shown a privacy notice with opt-out
        controls. Google&apos;s tool records your choice in your browser so you
        are not asked every visit. See the{" "}
        <Link href="/cookie-policy/">cookie policy</Link> for how to change or
        withdraw it.
      </p>

      <h2>Advertising (when it launches)</h2>
      <p>
        No ads run on {SITE_NAME} yet. When display advertising launches
        (Google AdSense is the planned partner), ad partners will use cookies
        or similar technologies to serve and measure ads, governed by the same
        Google-certified consent platform described above. In the EEA, UK, and
        Switzerland ads serve only after you agree.
      </p>

      <h2>Your rights (GDPR, CPRA, Australian Privacy Act)</h2>
      <p>
        Because we hold no personal data about you, there is normally nothing
        to access, correct, or delete. If you believe we hold something about
        you — for example from an email you sent us — write to{" "}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> and we will
        answer under the GDPR, the California Privacy Rights Act, or the
        Australian Privacy Act as applies to you.
      </p>

      <h2 id="california-privacy-choices">California privacy choices</h2>
      <p>
        We do not sell or share personal information as the CPRA defines those
        terms. A &ldquo;Your California privacy choices&rdquo; control will be
        added here before advertising launches; until then this section is the
        placeholder for it. Questions:{" "}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
      </p>

      <h2>Contact</h2>
      <p>
        Privacy questions go to{" "}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
      </p>
    </Prose>
  );
}
