import type { CalculatorRecord } from "@/lib/records/types.gen";
import { clusterOf } from "@/lib/records/records";
import styles from "./content.module.css";
import TrackedLink from "./TrackedLink";

const CLUSTER_LABEL = {
  inventory: "Inventory",
  freight: "Freight",
} as const;

/**
 * "The rest of the bench" — related-tool tiles closing the page (4 columns,
 * 2 on small screens). Each tile carries its cluster eyebrow and tool name
 * and emits related_tool_click on the way out.
 */
export default function BenchTiles({
  from,
  tools,
}: {
  from: CalculatorRecord;
  tools: readonly CalculatorRecord[];
}) {
  if (tools.length === 0) return null;
  return (
    <section className={styles.block}>
      <span className={styles.eyebrow}>The rest of the bench</span>
      <h2 className={styles.heading}>Related tools</h2>
      <div className={styles.bench}>
        {tools.map((tool) => (
          <TrackedLink
            key={tool.id}
            href={`/${tool.slug}/`}
            fromToolId={from.id}
            toToolId={tool.id}
            className={styles.tile}
          >
            <span className={styles.tileLbl}>
              {CLUSTER_LABEL[clusterOf(tool)]}
            </span>
            <span className={styles.tileName}>{tool.title}</span>
          </TrackedLink>
        ))}
      </div>
    </section>
  );
}
