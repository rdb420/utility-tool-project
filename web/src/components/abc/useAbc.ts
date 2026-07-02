"use client";

/**
 * State + math for the ABC analysis island (calculator.abc_analysis) — the
 * multi-row custom tool. Unlike the generic island it recalculates live on
 * every change; the Crunch button only replays the readout flash.
 *
 * Classification semantics (plan-fixed):
 * - rows without a finite value >= 0 are simply excluded (a blank starter
 *   row or a half-typed row never blocks the live result);
 * - at least two valid rows, with a total value > 0, are required;
 * - rows are ranked by descending value, ties keeping entry order;
 * - each share comes from `abcShare` in the calc library (the registry
 *   function behind inventory.abc.share);
 * - classes are drawn on the cumulative curve: A while cumulative share is
 *   <= the A cut-off (the FIRST item is always A, even when its own share
 *   exceeds the cut-off), then B while <= the B cut-off, else C;
 * - cut-offs must satisfy 0 < A < B <= 100. They are conventions, not
 *   standards — the record copy says so.
 */

import { useMemo, useRef, useState } from "react";
import { abcShare } from "@/lib/calc/inventory";

export type AbcClass = "A" | "B" | "C";

/** One row as computeAbc sees it; value is NaN when blank/unparseable. */
export interface AbcRowValue {
  name: string;
  value: number;
}

export interface AbcRankedRow {
  rank: number;
  name: string;
  value: number;
  sharePct: number;
  cumulativePct: number;
  cls: AbcClass;
}

export interface AbcClassSummary {
  count: number;
  valuePct: number;
}

export interface AbcThresholds {
  aCutoff: number;
  bCutoff: number;
}

export type AbcInvalidReason = "thresholds" | "rows";

export type AbcResult =
  | {
      valid: true;
      ranked: AbcRankedRow[];
      summary: Record<AbcClass, AbcClassSummary>;
      total: number;
    }
  | { valid: false; reason: AbcInvalidReason };

export const MIN_ROWS = 2;
export const MAX_ROWS = 15;
const INITIAL_ROWS = 5;
export const DEFAULT_A_CUTOFF = "80";
export const DEFAULT_B_CUTOFF = "95";

/** Guards boundary comparisons against float noise (54 + 41 must be <= 95). */
const EPSILON = 1e-9;

/** Pure classification used by the hook (exported for direct unit testing). */
export function computeAbc(
  rows: AbcRowValue[],
  opts: AbcThresholds,
): AbcResult {
  const { aCutoff, bCutoff } = opts;
  const thresholdsValid =
    Number.isFinite(aCutoff) &&
    Number.isFinite(bCutoff) &&
    aCutoff > 0 &&
    aCutoff < bCutoff &&
    bCutoff <= 100;
  if (!thresholdsValid) return { valid: false, reason: "thresholds" };

  // Keep rows with a usable value; blank/half-typed rows just fall out.
  // A valueless name never blocks the result, a nameless value gets a
  // positional fallback name.
  const valid = rows
    .map((row, index) => ({
      name: row.name.trim() === "" ? `Item ${index + 1}` : row.name.trim(),
      value: row.value,
    }))
    .filter((row) => Number.isFinite(row.value) && row.value >= 0);

  const total = valid.reduce((sum, row) => sum + row.value, 0);
  if (valid.length < MIN_ROWS || total <= 0) {
    return { valid: false, reason: "rows" };
  }

  // Descending by value; Array.prototype.sort is stable, so ties keep
  // entry order.
  const sorted = [...valid].sort((a, b) => b.value - a.value);

  let cumulative = 0;
  const ranked: AbcRankedRow[] = sorted.map((row, index) => {
    const sharePct = abcShare(row.value, total);
    cumulative += sharePct;
    const cls: AbcClass =
      index === 0 || cumulative <= aCutoff + EPSILON
        ? "A"
        : cumulative <= bCutoff + EPSILON
          ? "B"
          : "C";
    return {
      rank: index + 1,
      name: row.name,
      value: row.value,
      sharePct,
      cumulativePct: cumulative,
      cls,
    };
  });

  const summary: Record<AbcClass, AbcClassSummary> = {
    A: { count: 0, valuePct: 0 },
    B: { count: 0, valuePct: 0 },
    C: { count: 0, valuePct: 0 },
  };
  for (const row of ranked) {
    summary[row.cls].count += 1;
    summary[row.cls].valuePct += row.sharePct;
  }

  return { valid: true, ranked, summary, total };
}

/** One editable SKU row; `id` is a stable React key across add/remove. */
export interface AbcRowState {
  id: number;
  name: string;
  value: string;
}

export interface UseAbc {
  rows: AbcRowState[];
  aCutoffText: string;
  bCutoffText: string;
  computed: AbcResult;
  /** Incremented by crunch(); keys the readout so the flash replays. */
  crunchCount: number;
  setRowName(id: number, name: string): void;
  setRowValue(id: number, value: string): void;
  /** No-op at MAX_ROWS. */
  addRow(): void;
  /** No-op at MIN_ROWS. */
  removeRow(id: number): void;
  setACutoffText(value: string): void;
  setBCutoffText(value: string): void;
  crunch(): void;
  /** True the first time any control changes (drives calculator_start). */
  markStart(): boolean;
}

function emptyRows(count: number): AbcRowState[] {
  return Array.from({ length: count }, (_, index) => ({
    id: index,
    name: "",
    value: "",
  }));
}

export function useAbc(): UseAbc {
  const [rows, setRows] = useState<AbcRowState[]>(() =>
    emptyRows(INITIAL_ROWS),
  );
  const [aCutoffText, setACutoffText] = useState(DEFAULT_A_CUTOFF);
  const [bCutoffText, setBCutoffText] = useState(DEFAULT_B_CUTOFF);
  const [crunchCount, setCrunchCount] = useState(0);
  const nextIdRef = useRef(INITIAL_ROWS);
  const startedRef = useRef(false);

  const computed = useMemo(
    () =>
      computeAbc(
        rows.map((row) => ({
          name: row.name,
          value: Number.parseFloat(row.value),
        })),
        {
          aCutoff: Number.parseFloat(aCutoffText),
          bCutoff: Number.parseFloat(bCutoffText),
        },
      ),
    [rows, aCutoffText, bCutoffText],
  );

  const patchRow = (id: number, partial: Partial<AbcRowState>) =>
    setRows((current) =>
      current.map((row) => (row.id === id ? { ...row, ...partial } : row)),
    );

  return {
    rows,
    aCutoffText,
    bCutoffText,
    computed,
    crunchCount,
    setRowName: (id, name) => patchRow(id, { name }),
    setRowValue: (id, value) => patchRow(id, { value }),
    addRow: () =>
      setRows((current) => {
        if (current.length >= MAX_ROWS) return current;
        const id = nextIdRef.current;
        nextIdRef.current += 1;
        return [...current, { id, name: "", value: "" }];
      }),
    removeRow: (id) =>
      setRows((current) =>
        current.length <= MIN_ROWS
          ? current
          : current.filter((row) => row.id !== id),
      ),
    setACutoffText,
    setBCutoffText,
    crunch: () => setCrunchCount((count) => count + 1),
    markStart: () => {
      if (startedRef.current) return false;
      startedRef.current = true;
      return true;
    },
  };
}
