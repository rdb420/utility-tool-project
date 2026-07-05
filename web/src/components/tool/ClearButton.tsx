import styles from "./ClearButton.module.css";

/**
 * Secondary "Clear inputs" control — resets a calculator island to its initial
 * state. type="button" is load-bearing: islands wrap inputs in a <form> whose
 * submit is the crunch, and the default type="submit" would crunch instead.
 * Deliberately fires no analytics (the clear action is local UI, not tracked).
 */
export default function ClearButton({
  onClear,
  label = "Clear inputs",
}: {
  onClear: () => void;
  label?: string;
}) {
  return (
    <button type="button" className={styles.clear} onClick={onClear}>
      {label}
    </button>
  );
}
