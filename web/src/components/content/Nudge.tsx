import styles from "./content.module.css";

/**
 * The account/bulk nudge — dashed and quiet, present but never blocking the
 * free tool. The link is inert for MVP (accounts/bulk ship later); it
 * becomes a real link when that tier exists.
 */
export default function Nudge() {
  return (
    <aside className={styles.nudge} aria-label="Bulk runs">
      <span className={styles.nudgeLbl}>Bulk</span>
      <p>
        Running a whole sheet of these? Accounts add saved scenarios and CSV
        bulk runs — every row crunched at once.
      </p>
      <span className={styles.nudgeLink}>Save &amp; run bulk &#8594;</span>
    </aside>
  );
}
