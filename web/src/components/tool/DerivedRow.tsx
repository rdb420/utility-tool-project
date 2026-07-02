import styles from "./Readout.module.css";

/**
 * One key/value row under the big readout value. `charge` marks the
 * decisive row (amber value, brighter key), per the kit's .drow.charge.
 */
export default function DerivedRow({
  label,
  value,
  charge = false,
  valueTestId,
}: {
  label: string;
  value: string;
  charge?: boolean;
  valueTestId?: string;
}) {
  return (
    <div className={charge ? `${styles.drow} ${styles.charge}` : styles.drow}>
      <span className={styles.k}>{label}</span>
      <span className={styles.v} data-testid={valueTestId}>
        {value}
      </span>
    </div>
  );
}

/** Grid wrapper for a stack of DerivedRows (kit .derived). */
export function DerivedRows({ children }: { children: React.ReactNode }) {
  return <div className={styles.derived}>{children}</div>;
}
