import Link from "next/link";
import Wordmark from "./Wordmark";
import styles from "./AppBar.module.css";

/**
 * Sticky ink app bar with the wordmark and the two cluster links, so every
 * tool is one click from either cluster. Nav collapses away below 820px.
 * The right-hand slot stays empty until the account tier ships.
 */
export default function AppBar() {
  return (
    <header className={styles.bar}>
      <div className={styles.inner}>
        <Link className={styles.home} href="/" aria-label="OpsCrunch home">
          <Wordmark size="bar" />
        </Link>
        <nav className={styles.nav} aria-label="Calculator clusters">
          <Link href="/inventory-calculators/">Inventory</Link>
          <Link href="/freight-calculators/">Freight</Link>
        </nav>
        <div className={styles.right}>
          {/* Reserved: Sign in (accounts ship in a later phase). */}
        </div>
      </div>
    </header>
  );
}
