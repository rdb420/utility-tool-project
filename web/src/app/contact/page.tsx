import type { Metadata } from "next";
import Link from "next/link";
import Prose from "@/components/layout/Prose";
import { CONTACT_EMAIL, SITE_NAME } from "@/config/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "How to reach OpsCrunch: one email address for corrections, formula sourcing questions, bug reports, and everything else.",
  alternates: { canonical: "/contact/" },
};

export default function ContactPage() {
  return (
    <Prose>
      <h1>Contact</h1>
      <p>
        One address, read by a person:{" "}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
      </p>

      <h2>Worth writing about</h2>
      <ul>
        <li>
          <strong>Corrections.</strong> If a formula, worked example, or
          reference value looks wrong, say which page and what you expected.
          Getting the numbers right is the whole product.
        </li>
        <li>
          <strong>Sourcing.</strong> Questions about where a formula or table
          value comes from — every page cites its grounding, and we&apos;ll
          show the working.
        </li>
        <li>
          <strong>Bugs.</strong> Broken input, wrong rounding, layout mishap —
          include your browser and the inputs that triggered it.
        </li>
        <li>
          <strong>Requests.</strong> A calculator you need that isn&apos;t on
          the bench yet.
        </li>
        <li>
          <strong>Privacy.</strong> Anything under the{" "}
          <Link href="/privacy-policy/">privacy policy</Link>.
        </li>
      </ul>

      <p>
        {SITE_NAME} is a small operation, so replies can take a few days —
        but corrections jump the queue.
      </p>
    </Prose>
  );
}
