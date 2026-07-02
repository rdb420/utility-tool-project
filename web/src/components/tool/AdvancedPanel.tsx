"use client";

import { useId, useState, type ReactNode } from "react";
import styles from "./AdvancedPanel.module.css";

/**
 * Generic "Advanced" disclosure: aria-expanded toggle with a rotating
 * chevron over a dashed-top panel. Add it only when a tool actually has
 * advanced options (the six inventory tools do not; CBM does).
 */
export default function AdvancedPanel({
  label = "Advanced",
  defaultOpen = false,
  children,
}: {
  label?: string;
  defaultOpen?: boolean;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const panelId = useId();
  return (
    <>
      <button
        type="button"
        className={styles.toggle}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((current) => !current)}
      >
        <span className={styles.chev} aria-hidden="true">
          &#9656;
        </span>{" "}
        {label}
      </button>
      <div
        id={panelId}
        className={open ? `${styles.panel} ${styles.open}` : styles.panel}
        hidden={!open}
      >
        {children}
      </div>
    </>
  );
}
