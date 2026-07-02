import type { Metadata } from "next";
import Link from "next/link";
import Prose from "@/components/layout/Prose";
import { CONTACT_EMAIL, SITE_NAME } from "@/config/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "What OpsCrunch is: free, fast operations calculators for the people who move and count stock, with every formula grounded in cited sources and every limit stated plainly.",
  alternates: { canonical: "/about/" },
};

export default function AboutPage() {
  return (
    <Prose>
      <h1>About {SITE_NAME}</h1>
      <p>
        {SITE_NAME} is a workbench of free calculators for operations work:
        inventory planning today (reorder point, safety stock, EOQ, turnover,
        days of cover, carrying cost), freight sizing next (CBM, dimensional
        weight). No sign-up, no spinner, no upsell between you and the number.
      </p>

      <h2>Who it&apos;s for</h2>
      <p>
        The people who move and count stock: inventory planners, warehouse and
        operations managers, freight coordinators, and small-business owners
        doing all of those jobs at once. If you have the inputs, you should
        have the answer in seconds — with the working shown, because you may
        have to defend that number in a meeting.
      </p>

      <h2>How the formulas are grounded</h2>
      <p>
        Every calculator runs on a formula record with an explicit grounding
        trail. Formulas marked as corpus-grounded cite the specific passage in
        our logistics and supply-chain reference corpus they were checked
        against; externally grounded formulas name their sources (industry
        standards, carrier service guides). The calculators execute the same
        calculation library our tests run the published worked examples
        through — the page can&apos;t drift from the formula it documents.
      </p>
      <p>
        Honesty about limits is part of the method. Where a value is an
        unverified industry figure — nominal container capacities are the
        current example — the page says so instead of dressing it up as fact.
        Results are
        planning estimates, not professional advice; the{" "}
        <Link href="/terms/">terms</Link> spell that out.
      </p>

      <h2>The site</h2>
      <p>
        Operated from Australia. Free to use, eventually supported by clearly
        labelled ads that never touch the tools. Found a mistake? Tell us at{" "}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> — corrections
        are the fastest way to make the bench better.
      </p>
    </Prose>
  );
}
