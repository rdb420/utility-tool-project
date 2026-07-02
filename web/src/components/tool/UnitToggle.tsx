"use client";

import styles from "./UnitToggle.module.css";

export interface UnitToggleOption {
  value: string;
  label: string;
}

/**
 * Segmented toggle (unit pickers, kg/lb, …) built from real buttons with
 * aria-pressed, per the calculator kit. Generic: the six inventory tools do
 * not use it, but the CBM island (Chunk E) does.
 */
export default function UnitToggle({
  label,
  options,
  value,
  onChange,
}: {
  /** Accessible group label, e.g. "Dimension unit". */
  label: string;
  options: UnitToggleOption[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className={styles.unit} role="group" aria-label={label}>
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          aria-pressed={option.value === value}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
