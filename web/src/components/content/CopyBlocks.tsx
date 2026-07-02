import type {
  CalculatorRecord,
  FormulaRecord,
} from "@/lib/records/types.gen";
import styles from "./content.module.css";
import FormulaBlock from "./FormulaBlock";

/**
 * The copy below the tool, in the record order mandated by the page specs:
 * intro, how_it_works, formula_explanation (with the formula records'
 * expressions server-rendered in FormulaBlock), worked_example. Copy block
 * values are plain-text strings and render as paragraphs.
 */
export default function CopyBlocks({
  calculator,
  formulas,
}: {
  calculator: CalculatorRecord;
  formulas: FormulaRecord[];
}) {
  const { intro, how_it_works, formula_explanation, worked_example } =
    calculator.copy_blocks;
  return (
    <>
      <section className={styles.block}>
        <span className={styles.eyebrow}>Overview</span>
        <p className={styles.lead}>{intro}</p>
      </section>
      {how_it_works ? (
        <section className={styles.block}>
          <span className={styles.eyebrow}>Method</span>
          <h2 className={styles.heading}>How it works</h2>
          <p className={styles.copy}>{how_it_works}</p>
        </section>
      ) : null}
      {formula_explanation ? (
        <section className={styles.block}>
          <span className={styles.eyebrow}>Formula</span>
          <h2 className={styles.heading}>The formula</h2>
          {formulas.map((formula) => (
            <FormulaBlock key={formula.id} expression={formula.expression} />
          ))}
          <p className={styles.copy}>{formula_explanation}</p>
        </section>
      ) : null}
      {worked_example ? (
        <section className={styles.block}>
          <span className={styles.eyebrow}>Example</span>
          <h2 className={styles.heading}>Worked example</h2>
          <p className={styles.copy}>{worked_example}</p>
        </section>
      ) : null}
    </>
  );
}
