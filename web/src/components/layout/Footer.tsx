import Link from "next/link";
import { SITE_NAME } from "@/config/site";
import CookieSettingsButton from "./CookieSettingsButton";
import styles from "./Footer.module.css";

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy-policy/" },
  { label: "Cookie Policy", href: "/cookie-policy/" },
  { label: "Terms", href: "/terms/" },
  { label: "Contact", href: "/contact/" },
  { label: "About", href: "/about/" },
] as const;

/**
 * Site footer: legal links plus the honest one-liner. Fact first, caveat
 * second — a free tool earns an operator's trust by being plain about limits.
 */
export default function Footer() {
  return (
    <footer className={styles.foot}>
      <div className={styles.inner}>
        <nav className={styles.links} aria-label="Legal">
          {LEGAL_LINKS.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
          {/* Reopens the consentmanager preference manager (change/withdraw
              consent) via the consentmanager JS API. */}
          <CookieSettingsButton className={styles.linklike} />
        </nav>
        <p className={styles.note}>
          Estimates for planning. Confirm against your own data.
        </p>
        <p className={styles.note}>
          &copy; {new Date().getFullYear()} {SITE_NAME}
        </p>
      </div>
    </footer>
  );
}
