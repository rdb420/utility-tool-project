import Link from "next/link";
import { clusterOf } from "@/lib/records/records";
import type { CalculatorRecord } from "@/lib/records/types.gen";
import styles from "./ToolTileGrid.module.css";

const CLUSTER_LABEL = {
  inventory: "Inventory",
  freight: "Freight",
} as const;

/**
 * Bench tile grid (docs/mockups/opscrunch_calculator_kit.html .oc-bench):
 * link cards with a mono cluster eyebrow and the tool name, four across on
 * desktop, two across ≤760px. Server component — plain links, no analytics.
 */
export default function ToolTileGrid({
  calculators,
  emptyNote,
}: {
  calculators: readonly CalculatorRecord[];
  /** Shown instead of the grid when the cluster has no tools yet. */
  emptyNote?: string;
}) {
  if (calculators.length === 0) {
    return emptyNote ? <p className={styles.empty}>{emptyNote}</p> : null;
  }
  return (
    <div className={styles.bench}>
      {calculators.map((calculator) => (
        <Link
          key={calculator.id}
          href={`/${calculator.slug}/`}
          className={styles.tile}
        >
          <span className={styles.lbl}>
            {CLUSTER_LABEL[clusterOf(calculator)]}
          </span>
          <span className={styles.nm}>{calculator.title}</span>
        </Link>
      ))}
    </div>
  );
}
