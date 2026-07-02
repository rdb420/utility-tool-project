"use client";

import styles from "./InputField.module.css";

export interface InputFieldProps {
  /** Unique DOM id for the input; error/help ids derive from it. */
  id: string;
  label: string;
  /** Display unit shown next to the label, e.g. "units/day". */
  unit?: string;
  value: string;
  onChange: (value: string) => void;
  /** Inline validation message; rendered id-linked via aria-describedby. */
  error?: string;
  help?: string;
}

/**
 * Labelled numeric field. Digits are monospace so they align; focus is the
 * signal-orange ring; errors render inline next to the field and are linked
 * to the input for screen readers.
 */
export default function InputField({
  id,
  label,
  unit,
  value,
  onChange,
  error,
  help,
}: InputFieldProps) {
  const helpId = help ? `${id}-help` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy =
    [errorId, helpId].filter(Boolean).join(" ") || undefined;
  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={id}>
        {label}
        {unit ? <span className={styles.unit}> &middot; {unit}</span> : null}
      </label>
      <input
        id={id}
        className={styles.input}
        type="number"
        inputMode="decimal"
        step="any"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
      />
      {error ? (
        <p id={errorId} className={styles.error} role="alert">
          {error}
        </p>
      ) : null}
      {help ? (
        <p id={helpId} className={styles.help}>
          {help}
        </p>
      ) : null}
    </div>
  );
}
