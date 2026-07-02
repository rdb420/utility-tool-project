"use client";

import styles from "./Readout.module.css";

/**
 * The two dark copy chips under the readout. Disabled until there is a
 * result to copy.
 */
export default function CopyRow({
  onCopyResult,
  onCopyFull,
  disabled = false,
}: {
  onCopyResult: () => void;
  onCopyFull: () => void;
  disabled?: boolean;
}) {
  return (
    <div className={styles.copyrow}>
      <button type="button" onClick={onCopyResult} disabled={disabled}>
        Copy result
      </button>
      <button type="button" onClick={onCopyFull} disabled={disabled}>
        Copy full
      </button>
    </div>
  );
}
