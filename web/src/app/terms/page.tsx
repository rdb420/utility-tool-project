import type { Metadata } from "next";
import Prose from "@/components/layout/Prose";
import { CONTACT_EMAIL, SITE_NAME } from "@/config/site";

export const metadata: Metadata = {
  title: "Terms of use",
  description:
    "OpsCrunch terms of use: the calculators provide planning estimates, not professional advice, and come with no warranties. Read what that means before relying on a result.",
  alternates: { canonical: "/terms/" },
};

const EFFECTIVE_DATE = "2 July 2026";

export default function TermsPage() {
  return (
    <Prose>
      <h1>Terms of use</h1>
      <p>
        Effective date: {EFFECTIVE_DATE}. Using {SITE_NAME} means accepting
        these terms. They are short because the deal is simple: free tools,
        honest limits, your judgement.
      </p>

      <h2>What the tools are</h2>
      <p>
        The calculators produce <strong>planning estimates</strong> from the
        numbers you enter and the formulas shown on each page. Every page
        publishes its formula, a worked example, and its assumptions so you can
        check the working. An estimate is a starting point for a decision, not
        the decision.
      </p>

      <h2>What the tools are not</h2>
      <ul>
        <li>
          <strong>Not professional advice.</strong> Nothing here is financial,
          accounting, legal, customs, or tax advice. We give no guidance on
          duties or taxes.
        </li>
        <li>
          <strong>Not carrier advice or a rate guarantee.</strong> Freight
          figures such as dimensional-weight divisors vary by carrier, service,
          and contract, and change without notice. We never guarantee a freight
          rate or a chargeable weight — confirm against your carrier&apos;s
          current service guide before booking or invoicing.
        </li>
        <li>
          <strong>Not a system of record.</strong> Results are not stored;
          copy what you need.
        </li>
      </ul>

      <h2>No warranties</h2>
      <p>
        The site and its tools are provided &ldquo;as is&rdquo; and &ldquo;as
        available&rdquo;, without warranties of any kind, express or implied,
        including accuracy, fitness for a particular purpose, and
        non-infringement. We work to keep the formulas correct and cited, but
        we do not promise the site is error-free or uninterrupted.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        To the maximum extent permitted by law, {SITE_NAME} and its operator
        are not liable for any loss or damage — including lost profit, lost
        stock, missed shipments, or business interruption — arising from use
        of, or reliance on, the site or its results. Where liability cannot be
        excluded (for example under the Australian Consumer Law), it is
        limited to resupplying the service. Since the service is free, your
        practical remedy is to stop using it.
      </p>

      <h2>Acceptable use</h2>
      <p>
        Don&apos;t abuse the site: no scraping at volumes that degrade it, no
        attempts to break it, no reselling it as your own.
      </p>

      <h2>Changes</h2>
      <p>
        We may update these terms; the effective date above changes when we
        do. Continued use after a change is acceptance of it.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about these terms:{" "}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
      </p>
    </Prose>
  );
}
