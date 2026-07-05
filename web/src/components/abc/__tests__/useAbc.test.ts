// @vitest-environment jsdom
/**
 * useAbc hook + pure computeAbc: corpus-style 54/41/5 classification,
 * first-item-always-A, stable ties, min-row and threshold validation, and
 * the row add/remove limits — expected values hand-computed, never via the
 * island.
 */

import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  MAX_ROWS,
  MIN_ROWS,
  computeAbc,
  useAbc,
  type AbcRowValue,
} from "../useAbc";

const CONVENTION = { aCutoff: 80, bCutoff: 95 };

function rows(...values: [string, number][]): AbcRowValue[] {
  return values.map(([name, value]) => ({ name, value }));
}

describe("computeAbc", () => {
  it("classifies the corpus 54/41/5 example with the 80/95 convention", () => {
    // Shares 54/41/5; cumulative 54/95/100. A while cum <= 80 (first item),
    // 95 <= 95 -> B, 100 -> C: the corpus table's one-per-class narrative.
    const result = computeAbc(
      rows(["alpha", 54_000], ["bravo", 41_000], ["charlie", 5_000]),
      CONVENTION,
    );
    if (!result.valid) throw new Error("expected valid");

    expect(result.total).toBe(100_000);
    expect(result.ranked.map((r) => r.name)).toEqual([
      "alpha",
      "bravo",
      "charlie",
    ]);
    expect(result.ranked.map((r) => r.rank)).toEqual([1, 2, 3]);
    expect(result.ranked.map((r) => r.cls)).toEqual(["A", "B", "C"]);
    expect(result.ranked[0].sharePct).toBeCloseTo(54, 9);
    expect(result.ranked[1].sharePct).toBeCloseTo(41, 9);
    expect(result.ranked[2].sharePct).toBeCloseTo(5, 9);
    expect(result.ranked[0].cumulativePct).toBeCloseTo(54, 9);
    expect(result.ranked[1].cumulativePct).toBeCloseTo(95, 9);
    expect(result.ranked[2].cumulativePct).toBeCloseTo(100, 9);

    expect(result.summary.A.count).toBe(1);
    expect(result.summary.A.valuePct).toBeCloseTo(54, 9);
    expect(result.summary.B.count).toBe(1);
    expect(result.summary.B.valuePct).toBeCloseTo(41, 9);
    expect(result.summary.C.count).toBe(1);
    expect(result.summary.C.valuePct).toBeCloseTo(5, 9);
  });

  it("always classes the first item A even when its share alone exceeds the A cutoff", () => {
    // 90/5/5: first item's own share (90) > aCutoff (80) but rank 1 is A.
    const result = computeAbc(
      rows(["big", 90], ["small", 5], ["tiny", 5]),
      CONVENTION,
    );
    if (!result.valid) throw new Error("expected valid");
    expect(result.ranked[0].cls).toBe("A");
    // cum 95 <= 95 -> B, cum 100 -> C.
    expect(result.ranked.map((r) => r.cls)).toEqual(["A", "B", "C"]);
  });

  it("sorts descending by value with ties keeping entry order", () => {
    const result = computeAbc(
      rows(["first", 100], ["tie-1", 40], ["tie-2", 40], ["last", 20]),
      CONVENTION,
    );
    if (!result.valid) throw new Error("expected valid");
    expect(result.ranked.map((r) => r.name)).toEqual([
      "first",
      "tie-1",
      "tie-2",
      "last",
    ]);
  });

  it("requires at least two valid rows", () => {
    expect(computeAbc(rows(["only", 100]), CONVENTION)).toEqual({
      valid: false,
      reason: "rows",
    });
    expect(computeAbc([], CONVENTION)).toEqual({
      valid: false,
      reason: "rows",
    });
    // A named row without a usable value does not count as valid.
    expect(
      computeAbc(
        [
          { name: "ok", value: 100 },
          { name: "half-typed", value: Number.NaN },
        ],
        CONVENTION,
      ),
    ).toEqual({ valid: false, reason: "rows" });
    // Negative values are not valid rows either.
    expect(
      computeAbc(rows(["ok", 100], ["negative", -5]), CONVENTION),
    ).toEqual({ valid: false, reason: "rows" });
  });

  it("drops blank rows and falls back to positional names for nameless values", () => {
    const result = computeAbc(
      [
        { name: "named", value: 60 },
        { name: "", value: Number.NaN }, // blank starter row: dropped
        { name: "", value: 40 }, // value only: kept, fallback name
        { name: "  ", value: Number.NaN }, // whitespace-only blank: dropped
      ],
      CONVENTION,
    );
    if (!result.valid) throw new Error("expected valid");
    expect(result.ranked.map((r) => r.name)).toEqual(["named", "Item 3"]);
    // Shares 60/40: cumulative 60 (A), 100 > 95 (C).
    expect(result.ranked.map((r) => r.cls)).toEqual(["A", "C"]);
  });

  it("rejects an all-zero total", () => {
    expect(computeAbc(rows(["a", 0], ["b", 0]), CONVENTION)).toEqual({
      valid: false,
      reason: "rows",
    });
  });

  it("validates thresholds: 0 < A < B <= 100", () => {
    const valid = rows(["a", 60], ["b", 40]);
    const cases = [
      { aCutoff: 95, bCutoff: 80 }, // A > B
      { aCutoff: 80, bCutoff: 80 }, // A == B
      { aCutoff: 80, bCutoff: 101 }, // B > 100
      { aCutoff: 0, bCutoff: 95 }, // A == 0
      { aCutoff: -5, bCutoff: 95 }, // A < 0
      { aCutoff: Number.NaN, bCutoff: 95 }, // unparseable
    ];
    for (const opts of cases) {
      expect(computeAbc(valid, opts)).toEqual({
        valid: false,
        reason: "thresholds",
      });
    }
    // B == 100 is allowed.
    const edge = computeAbc(valid, { aCutoff: 80, bCutoff: 100 });
    expect(edge.valid).toBe(true);
  });

  it("reports thresholds before rows when both are invalid", () => {
    expect(computeAbc([], { aCutoff: 95, bCutoff: 80 })).toEqual({
      valid: false,
      reason: "thresholds",
    });
  });
});

describe("useAbc", () => {
  it("starts with 5 empty rows, 80/95 thresholds, and an invalid rows state", () => {
    const { result } = renderHook(() => useAbc());
    expect(result.current.rows).toHaveLength(5);
    expect(result.current.rows.every((r) => r.name === "" && r.value === "")).toBe(
      true,
    );
    expect(result.current.aCutoffText).toBe("80");
    expect(result.current.bCutoffText).toBe("95");
    expect(result.current.computed).toEqual({ valid: false, reason: "rows" });
  });

  it("recomputes live as rows are filled", () => {
    const { result } = renderHook(() => useAbc());
    act(() => {
      result.current.setRowName(0, "alpha");
      result.current.setRowValue(0, "54000");
      result.current.setRowValue(1, "41000");
      result.current.setRowValue(2, "5000");
    });
    const computed = result.current.computed;
    if (!computed.valid) throw new Error("expected valid");
    expect(computed.ranked.map((r) => r.cls)).toEqual(["A", "B", "C"]);
    expect(computed.ranked[1].name).toBe("Item 2");
  });

  it("caps addRow at MAX_ROWS and removeRow at MIN_ROWS", () => {
    const { result } = renderHook(() => useAbc());
    act(() => {
      for (let i = 0; i < MAX_ROWS + 3; i += 1) result.current.addRow();
    });
    expect(result.current.rows).toHaveLength(MAX_ROWS);

    act(() => {
      for (const row of [...result.current.rows]) {
        result.current.removeRow(row.id);
      }
    });
    expect(result.current.rows).toHaveLength(MIN_ROWS);
  });

  it("keeps row ids stable across removal (React keys)", () => {
    const { result } = renderHook(() => useAbc());
    const secondId = result.current.rows[1].id;
    act(() => result.current.removeRow(result.current.rows[0].id));
    expect(result.current.rows[0].id).toBe(secondId);
  });

  it("reset() restores initial rows, cutoffs, and crunch count", () => {
    const { result } = renderHook(() => useAbc());
    act(() => {
      result.current.setRowName(0, "alpha");
      result.current.setRowValue(0, "54000");
      result.current.setRowValue(1, "41000");
      result.current.addRow();
      result.current.setACutoffText("70");
      result.current.setBCutoffText("90");
      result.current.crunch();
    });
    expect(result.current.computed.valid).toBe(true);
    expect(result.current.rows).toHaveLength(6);

    act(() => result.current.reset());
    expect(result.current.rows).toHaveLength(5);
    expect(
      result.current.rows.every((r) => r.name === "" && r.value === ""),
    ).toBe(true);
    expect(result.current.aCutoffText).toBe("80");
    expect(result.current.bCutoffText).toBe("95");
    expect(result.current.crunchCount).toBe(0);
    // Back to the empty-form state: invalid for lack of rows again.
    expect(result.current.computed).toEqual({ valid: false, reason: "rows" });
  });

  it("markStart is true exactly once", () => {
    const { result } = renderHook(() => useAbc());
    let first = false;
    let second = false;
    act(() => {
      first = result.current.markStart();
      second = result.current.markStart();
    });
    expect(first).toBe(true);
    expect(second).toBe(false);
  });
});
