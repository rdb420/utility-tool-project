"use client";

/**
 * ABC analysis island — multi-row custom tool for calculator.abc_analysis,
 * registered in toolRegistry.ts. Live recompute like the CBM island: the
 * Crunch button just replays the readout flash.
 *
 * Layout: the shared two-column ToolShell holds the SKU rows + thresholds
 * (left) and the per-class summary readout (right); the ranked table is too
 * wide for the readout column, so it renders full-width below the card.
 *
 * Analytics privacy (hard requirement): payloads carry ids, slugs, field
 * names, and copy variants ONLY — never SKU names, values, row contents, or
 * counts. calculator_result is throttled to fire only when the A/B/C
 * partition changes, not per keystroke.
 */

import { useEffect, useRef, type FormEvent } from "react";
import { track } from "@/lib/analytics";
import { BASE_URL, SITE_NAME } from "@/config/site";
import type { CalculatorToolProps } from "../tool/CalculatorTool";
import ClearButton from "../tool/ClearButton";
import CopyRow from "../tool/CopyRow";
import CrunchButton from "../tool/CrunchButton";
import DerivedRow, { DerivedRows } from "../tool/DerivedRow";
import Readout from "../tool/Readout";
import Toast from "../tool/Toast";
import ToolShell from "../tool/ToolShell";
import { useClipboard } from "../tool/useClipboard";
import styles from "./AbcCalculator.module.css";
import {
  MAX_ROWS,
  MIN_ROWS,
  useAbc,
  type AbcClass,
  type AbcRankedRow,
} from "./useAbc";

const MIDDOT = "·";
const CLASSES: readonly AbcClass[] = ["A", "B", "C"];

const THRESHOLD_HELP =
  "Cumulative-value cutoffs. 80/95 is a common convention, not a standard — " +
  "corpus examples use 54/41/5 and 65/25/10.";
const THRESHOLD_ERROR = "Cut-offs must satisfy 0 < A < B ≤ 100.";
const ROWS_HINT = "Add at least two SKUs with values.";
const DEFAULT_HINT =
  "Classes are drawn on the cumulative share of annual usage value. " +
  "Cut-offs are conventions, not standards — fit the boundaries to your " +
  "own Pareto curve.";

/** Grouped display with fixed decimals (stable widths for the readout). */
function formatGrouped(value: number, decimals: number): string {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

/** Money-ish usage values: grouped, up to 2 decimals, no trailing zeros. */
function formatValue(value: number): string {
  return value.toLocaleString("en-US", { maximumFractionDigits: 2 });
}

function summaryLine(count: number, valuePct: number): string {
  return `${count} ${count === 1 ? "item" : "items"} · ${formatGrouped(valuePct, 1)}% of value`;
}

function tableLine(row: AbcRankedRow): string {
  return [
    row.rank,
    row.name,
    formatValue(row.value),
    formatGrouped(row.sharePct, 1),
    formatGrouped(row.cumulativePct, 1),
    row.cls,
  ].join(" | ");
}

export default function AbcCalculator({ calculator }: CalculatorToolProps) {
  const abc = useAbc();
  const { computed } = abc;
  const { toast, copy } = useClipboard();

  function markStart() {
    if (abc.markStart()) {
      track({
        name: "calculator_start",
        toolId: calculator.id,
        slug: calculator.slug,
      });
    }
  }

  /** Every control change funnels through here: live recalc + start event. */
  function changed(apply: () => void) {
    markStart();
    apply();
  }

  // calculator_result throttle: fire only when the A/B/C partition changes
  // (per-class counts), never per keystroke. The payload stays ids + slug.
  const partition = computed.valid
    ? CLASSES.map((cls) => computed.summary[cls].count).join("/")
    : null;
  const lastPartitionRef = useRef<string | null>(null);
  useEffect(() => {
    if (partition !== null && partition !== lastPartitionRef.current) {
      lastPartitionRef.current = partition;
      track({
        name: "calculator_result",
        toolId: calculator.id,
        slug: calculator.slug,
      });
    }
  }, [partition, calculator.id, calculator.slug]);

  function crunch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    abc.crunch();
    if (!computed.valid) {
      track({
        name: "calculator_validation_error",
        toolId: calculator.id,
        slug: calculator.slug,
        field: computed.reason,
      });
    }
  }

  /**
   * Clear inputs: back to empty rows + default cut-offs, with the partition
   * throttle cleared so a later identical partition reports fresh. Fires no
   * analytics (the cleared state is invalid, so the result effect stays
   * silent).
   */
  function clearInputs() {
    abc.reset();
    lastPartitionRef.current = null;
  }

  function copyText(variant: "result" | "full") {
    if (!computed.valid) return;
    track({
      name: "result_copy",
      toolId: calculator.id,
      slug: calculator.slug,
      variant,
    });
    const { ranked, summary, total } = computed;
    if (variant === "result") {
      const parts = CLASSES.map(
        (cls) =>
          `${cls} ${summary[cls].count} (${formatGrouped(summary[cls].valuePct, 1)}%)`,
      );
      void copy(
        `ABC analysis: ${parts.join(", ")} of ${formatValue(total)} total value`,
      );
      return;
    }
    const lines = [
      `${SITE_NAME} - ${calculator.title}`,
      `Thresholds: A ≤ ${abc.aCutoffText}% cumulative value, B ≤ ${abc.bCutoffText}%`,
      "Rank | SKU | Annual value | Share % | Cumulative % | Class",
      ...ranked.map(tableLine),
      `Total annual usage value: ${formatValue(total)}`,
      `${BASE_URL}/${calculator.slug}/`,
    ];
    void copy(lines.join("\n"));
  }

  const thresholdsInvalid = !computed.valid && computed.reason === "thresholds";
  const rowsInvalid = !computed.valid && computed.reason === "rows";
  const thresholdErrorId = `${calculator.slug}-thresholds-error`;
  const thresholdHelpId = `${calculator.slug}-thresholds-help`;
  const thresholdDescribedBy = thresholdsInvalid
    ? `${thresholdErrorId} ${thresholdHelpId}`
    : thresholdHelpId;

  const hint = rowsInvalid ? ROWS_HINT : DEFAULT_HINT;

  return (
    <form onSubmit={crunch} noValidate>
      <ToolShell
        inputs={
          <>
            <span className={styles.groupLbl}>SKUs</span>
            <div className={styles.rowGrid} aria-hidden="true">
              <span className={styles.colHead}>SKU name</span>
              <span className={styles.colHead}>Annual usage value</span>
              <span />
            </div>
            {abc.rows.map((row, index) => (
              <div key={row.id} className={styles.rowGrid}>
                <input
                  type="text"
                  className={styles.textInput}
                  aria-label={`SKU ${index + 1} name`}
                  value={row.name}
                  onChange={(event) =>
                    changed(() => abc.setRowName(row.id, event.target.value))
                  }
                />
                <input
                  type="number"
                  inputMode="decimal"
                  step="any"
                  className={styles.numInput}
                  aria-label={`SKU ${index + 1} annual usage value`}
                  value={row.value}
                  onChange={(event) =>
                    changed(() => abc.setRowValue(row.id, event.target.value))
                  }
                />
                <button
                  type="button"
                  className={styles.removeBtn}
                  aria-label={`Remove SKU ${index + 1}`}
                  disabled={abc.rows.length <= MIN_ROWS}
                  onClick={() => changed(() => abc.removeRow(row.id))}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
            ))}
            <button
              type="button"
              className={styles.addBtn}
              disabled={abc.rows.length >= MAX_ROWS}
              onClick={() => changed(() => abc.addRow())}
            >
              Add row ({abc.rows.length}/{MAX_ROWS})
            </button>
            <span className={styles.groupLbl}>Class thresholds</span>
            <div className={styles.thresholds}>
              <div>
                <label
                  className={styles.fieldLabel}
                  htmlFor={`${calculator.slug}-a-cutoff`}
                >
                  A cutoff <span className={styles.unit}>&middot; %</span>
                </label>
                <input
                  id={`${calculator.slug}-a-cutoff`}
                  type="number"
                  inputMode="decimal"
                  step="any"
                  className={styles.numInput}
                  value={abc.aCutoffText}
                  aria-invalid={thresholdsInvalid || undefined}
                  aria-describedby={thresholdDescribedBy}
                  onChange={(event) =>
                    changed(() => abc.setACutoffText(event.target.value))
                  }
                />
              </div>
              <div>
                <label
                  className={styles.fieldLabel}
                  htmlFor={`${calculator.slug}-b-cutoff`}
                >
                  B cutoff <span className={styles.unit}>&middot; %</span>
                </label>
                <input
                  id={`${calculator.slug}-b-cutoff`}
                  type="number"
                  inputMode="decimal"
                  step="any"
                  className={styles.numInput}
                  value={abc.bCutoffText}
                  aria-invalid={thresholdsInvalid || undefined}
                  aria-describedby={thresholdDescribedBy}
                  onChange={(event) =>
                    changed(() => abc.setBCutoffText(event.target.value))
                  }
                />
              </div>
            </div>
            {thresholdsInvalid ? (
              <p id={thresholdErrorId} className={styles.error} role="alert">
                {THRESHOLD_ERROR}
              </p>
            ) : null}
            <p id={thresholdHelpId} className={styles.help}>
              {THRESHOLD_HELP}
            </p>
            <CrunchButton />
            <ClearButton onClear={clearInputs} />
          </>
        }
        readout={
          <Readout
            key={abc.crunchCount}
            tag="ABC classification"
            value={
              computed.valid ? formatGrouped(computed.summary.A.count, 0) : null
            }
            unit="A-class SKUs"
            valueTestId="result-A-count"
            flash={abc.crunchCount > 0}
            hint={hint}
          >
            <DerivedRows>
              {CLASSES.map((cls) => (
                <DerivedRow
                  key={cls}
                  label={`${cls} class`}
                  charge={cls === "A"}
                  value={
                    computed.valid
                      ? summaryLine(
                          computed.summary[cls].count,
                          computed.summary[cls].valuePct,
                        )
                      : MIDDOT
                  }
                  valueTestId={`result-class-${cls}`}
                />
              ))}
              <DerivedRow
                label="Total usage value"
                value={computed.valid ? formatValue(computed.total) : MIDDOT}
                valueTestId="result-total"
              />
            </DerivedRows>
            <CopyRow
              onCopyResult={() => copyText("result")}
              onCopyFull={() => copyText("full")}
              disabled={!computed.valid}
            />
          </Readout>
        }
      />
      {computed.valid ? (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <caption>Ranked SKUs by annual usage value</caption>
            <thead>
              <tr>
                <th scope="col" className={styles.num}>
                  Rank
                </th>
                <th scope="col">SKU</th>
                <th scope="col" className={styles.num}>
                  Annual value
                </th>
                <th scope="col" className={styles.num}>
                  Share %
                </th>
                <th scope="col" className={styles.num}>
                  Cumulative %
                </th>
                <th scope="col">Class</th>
              </tr>
            </thead>
            <tbody>
              {computed.ranked.map((row) => (
                <tr key={row.rank}>
                  <td className={styles.num}>{row.rank}</td>
                  <td data-testid={`abc-name-${row.rank}`}>{row.name}</td>
                  <td className={styles.num}>{formatValue(row.value)}</td>
                  <td className={styles.num}>
                    {formatGrouped(row.sharePct, 1)}
                  </td>
                  <td className={styles.num}>
                    {formatGrouped(row.cumulativePct, 1)}
                  </td>
                  <td>
                    <span
                      className={
                        row.cls === "A"
                          ? `${styles.badge} ${styles.badgeA}`
                          : styles.badge
                      }
                      data-testid={`abc-class-${row.rank}`}
                    >
                      {row.cls}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
      <Toast message={toast ?? ""} show={toast !== null} />
    </form>
  );
}
