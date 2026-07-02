"use client";

import styles from "./Toast.module.css";

/** Fixed bottom-centre confirmation toast ("Copied"). */
export default function Toast({
  message,
  show,
}: {
  message: string;
  show: boolean;
}) {
  return (
    <div
      className={show ? `${styles.toast} ${styles.show}` : styles.toast}
      role="status"
      aria-live="polite"
    >
      {show ? message : null}
    </div>
  );
}
