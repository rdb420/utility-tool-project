import styles from "./FormulaBlock.module.css";

/**
 * Server-rendered formula panel: the raw `expression` string from the
 * formula record on an ink background, with the right-hand side highlighted
 * amber via CSS (per the kit's .oc-formula / the CBM page's .formula).
 */
export default function FormulaBlock({ expression }: { expression: string }) {
  const split = expression.indexOf("=");
  return (
    <div className={styles.formula}>
      {split >= 0 ? (
        <>
          {expression.slice(0, split + 1)}{" "}
          <span className={styles.amber}>
            {expression.slice(split + 1).trim()}
          </span>
        </>
      ) : (
        <span className={styles.amber}>{expression}</span>
      )}
    </div>
  );
}
