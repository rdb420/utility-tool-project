import type { CalculatorRecord } from "@/lib/records/types.gen";
import styles from "./content.module.css";

/**
 * Disclaimer keyed to the record's disclaimer_level (docs/MVP_PAGE_SPECS.md
 * "Disclaimer copy"): `none` renders nothing; `estimate` states the planning
 * caveat plus the formula records' assumptions; `regional` and
 * `professional_review` are reserved for freight/landed-cost pages.
 */

const DISCLAIMER_TEXT: Record<
  Exclude<NonNullable<CalculatorRecord["disclaimer_level"]>, "none">,
  string
> = {
  estimate:
    "This is a planning estimate. Results depend on your inputs and assumptions; confirm against your own data before ordering.",
  regional:
    "Values differ by region. Confirm against the tables that apply where you operate before relying on this result.",
  professional_review:
    "This is a planning aid, not professional advice. Confirm with your broker, accountant, or advisor before committing money.",
};

export default function Disclaimer({
  level,
  assumptions,
}: {
  level: CalculatorRecord["disclaimer_level"];
  /** Assumptions from the page's formula records (deduplicated upstream). */
  assumptions: readonly string[];
}) {
  if (!level || level === "none") return null;
  return (
    <section className={styles.disclaimer}>
      <span className={styles.eyebrow}>Disclaimer</span>
      <p>{DISCLAIMER_TEXT[level]}</p>
      {assumptions.length > 0 ? (
        <ul className={styles.assume}>
          {assumptions.map((assumption) => (
            <li key={assumption}>{assumption}</li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}
