import styles from "./CrunchButton.module.css";

/**
 * "Crunch it" — the single full-width action button. It submits the tool
 * form, so pressing Enter anywhere in the form crunches too. The return
 * glyph is decorative (mono, per the kit).
 */
export default function CrunchButton({ label = "Crunch it" }: { label?: string }) {
  return (
    <button type="submit" className={styles.crunch}>
      {label}{" "}
      <span className={styles.k} aria-hidden="true">
        &#9166;
      </span>
    </button>
  );
}
