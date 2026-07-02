import type { ReactNode } from "react";
import styles from "./Readout.module.css";

/**
 * The dark readout panel: eyebrow tag row (with an optional right-hand slot
 * for e.g. a kg/lb toggle), the big amber value, and whatever derived rows,
 * copy row, and hint the tool stacks below it.
 *
 * `value` is the already-formatted display string; pass null before the
 * first successful crunch to show the middot placeholder. Re-mount with a
 * changing `key` plus `flash` to replay the crunch flash (disabled under
 * prefers-reduced-motion via the module CSS + global kill-switch).
 */
export default function Readout({
  tag,
  right,
  value,
  unit,
  valueTestId,
  flash = false,
  hint,
  children,
}: {
  tag: string;
  right?: ReactNode;
  value: string | null;
  unit?: string;
  valueTestId?: string;
  flash?: boolean;
  hint?: string;
  children?: ReactNode;
}) {
  return (
    <div
      className={flash ? `${styles.readout} ${styles.flash}` : styles.readout}
      aria-live="polite"
    >
      <div className={styles.readtag}>
        <span className={styles.tag}>{tag}</span>
        {right}
      </div>
      <div className={styles.big} data-testid={valueTestId}>
        {value ?? "·"}
        {unit ? <span className={styles.u}>{unit}</span> : null}
      </div>
      {children}
      {hint ? <p className={styles.hint}>{hint}</p> : null}
    </div>
  );
}
