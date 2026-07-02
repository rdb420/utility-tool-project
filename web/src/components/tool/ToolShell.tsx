import type { ReactNode } from "react";
import styles from "./ToolShell.module.css";

/**
 * The two-column tool card: inputs panel left, readout right, collapsing to
 * a single stacked column at <= 820px (see ToolShell.module.css).
 * The readout child owns its own dark panel styling (see Readout).
 */
export default function ToolShell({
  inputs,
  readout,
}: {
  inputs: ReactNode;
  readout: ReactNode;
}) {
  return (
    <div className={styles.tool}>
      <div className={styles.inputs}>{inputs}</div>
      {readout}
    </div>
  );
}
