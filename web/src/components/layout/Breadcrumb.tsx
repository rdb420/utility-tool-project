import Link from "next/link";
import { Fragment } from "react";
import styles from "./Breadcrumb.module.css";

export type BreadcrumbItem = {
  label: string;
  /** Omit for the current page (rendered as plain text). */
  href?: string;
};

/**
 * Mono micro-label breadcrumb, e.g. "Freight / CBM Calculator".
 * Items with an href render as links; the rest render as plain text.
 */
export default function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  if (items.length === 0) return null;
  return (
    <nav className={styles.crumb} aria-label="Breadcrumb">
      {items.map((item, i) => (
        <Fragment key={`${item.label}-${i}`}>
          {i > 0 && <span aria-hidden="true">&nbsp;/&nbsp;</span>}
          {item.href ? (
            <Link href={item.href}>{item.label}</Link>
          ) : (
            <span aria-current="page">{item.label}</span>
          )}
        </Fragment>
      ))}
    </nav>
  );
}
