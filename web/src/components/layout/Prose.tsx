import styles from "./Prose.module.css";

/**
 * Long-form text wrapper for the legal and about pages: readable measure,
 * brand heading scale, quiet body text. Server component, plain TSX (no MDX).
 */
export default function Prose({ children }: { children: React.ReactNode }) {
  return <div className={styles.prose}>{children}</div>;
}
