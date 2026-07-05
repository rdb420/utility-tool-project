// @vitest-environment jsdom
/**
 * useFreightClass hook + the pure computeFreightClass math: the record's
 * worked example (48 x 40 x 48 in, 500 lb -> 9.375 PCF -> class 100),
 * direct-PCF mode, and the invalid/empty -> null (middot) contract.
 * Expected values are plain hand arithmetic, never via the island.
 */

import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  INITIAL_SNAPSHOT,
  computeFreightClass,
  useFreightClass,
  type FreightClassSnapshot,
} from "../useFreightClass";

/** Default snapshot (matches the hook's initial state) with overrides. */
function snapshot(
  overrides: Partial<FreightClassSnapshot> = {},
): FreightClassSnapshot {
  return {
    mode: "dims",
    length: "48",
    width: "40",
    height: "48",
    qty: "1",
    actualWeight: "500",
    directPcf: "",
    ...overrides,
  };
}

describe("computeFreightClass (dims mode)", () => {
  it("record example: 48 x 40 x 48 in, 500 lb -> 9.375 PCF -> class 100", () => {
    const result = computeFreightClass(snapshot());
    expect(result).not.toBeNull();
    // V = 48 * 40 * 48 / 1728 = 92,160 / 1728 = 53.333... ft³
    expect(result!.v).toBeCloseTo(92_160 / 1728, 9);
    // PCF = 500 / (160/3) = 9.375 exactly
    expect(result!.pcf).toBeCloseTo(9.375, 9);
    expect(result!.cls).toBe(100);
    expect(result!.band.sub).toBe(6);
  });

  it("scales volume by piece count (2 pieces halve the density)", () => {
    const result = computeFreightClass(snapshot({ qty: "2" }));
    expect(result!.v).toBeCloseTo((92_160 * 2) / 1728, 9);
    expect(result!.pcf).toBeCloseTo(9.375 / 2, 9); // 4.6875 -> class 175
    expect(result!.cls).toBe(175);
  });

  it("any dimension, pieces, or weight <= 0 (or empty) yields null, no throw", () => {
    expect(computeFreightClass(snapshot({ length: "0" }))).toBeNull();
    expect(computeFreightClass(snapshot({ width: "-5" }))).toBeNull();
    expect(computeFreightClass(snapshot({ height: "" }))).toBeNull();
    expect(computeFreightClass(snapshot({ qty: "0" }))).toBeNull();
    expect(computeFreightClass(snapshot({ actualWeight: "0" }))).toBeNull();
    expect(computeFreightClass(snapshot({ actualWeight: "abc" }))).toBeNull();
  });
});

describe("computeFreightClass (pcf mode)", () => {
  it("maps a directly entered density: 9.375 -> class 100, no volume", () => {
    const result = computeFreightClass(
      snapshot({ mode: "pcf", directPcf: "9.375" }),
    );
    expect(result).not.toBeNull();
    expect(result!.v).toBeNull();
    expect(result!.pcf).toBe(9.375);
    expect(result!.cls).toBe(100);
  });

  it("band boundaries flow through: 10 -> 92.5, 50 -> 50", () => {
    expect(
      computeFreightClass(snapshot({ mode: "pcf", directPcf: "10" }))!.cls,
    ).toBe(92.5);
    expect(
      computeFreightClass(snapshot({ mode: "pcf", directPcf: "50" }))!.cls,
    ).toBe(50);
  });

  it("directPcf <= 0, empty, or unparseable yields null", () => {
    expect(
      computeFreightClass(snapshot({ mode: "pcf", directPcf: "0" })),
    ).toBeNull();
    expect(
      computeFreightClass(snapshot({ mode: "pcf", directPcf: "-1" })),
    ).toBeNull();
    expect(
      computeFreightClass(snapshot({ mode: "pcf", directPcf: "" })),
    ).toBeNull();
    expect(
      computeFreightClass(snapshot({ mode: "pcf", directPcf: "abc" })),
    ).toBeNull();
  });

  it("ignores stale dims-mode values while in pcf mode", () => {
    const result = computeFreightClass(
      snapshot({ mode: "pcf", directPcf: "25", length: "0" }),
    );
    expect(result!.cls).toBe(65);
  });
});

describe("useFreightClass", () => {
  it("computes the record example live from the defaults (no crunch)", () => {
    const { result } = renderHook(() => useFreightClass());
    expect(result.current.computed).not.toBeNull();
    expect(result.current.computed!.cls).toBe(100);
    expect(result.current.crunchCount).toBe(0);
  });

  it("mode switch to pcf goes null (empty density), then live on input", () => {
    const { result } = renderHook(() => useFreightClass());
    act(() => result.current.setMode("pcf"));
    expect(result.current.computed).toBeNull();

    act(() => result.current.setField("directPcf", "9.375"));
    expect(result.current.computed!.cls).toBe(100);

    // ...and back: the dims values are still there.
    act(() => result.current.setMode("dims"));
    expect(result.current.computed!.cls).toBe(100);
  });

  it("field edits recalculate live", () => {
    const { result } = renderHook(() => useFreightClass());
    act(() => result.current.setField("actualWeight", "1000"));
    // 1000 / 53.33 = 18.75 -> 15-<22.5 band -> class 70.
    expect(result.current.computed!.pcf).toBeCloseTo(18.75, 9);
    expect(result.current.computed!.cls).toBe(70);
  });

  it("crunch only increments the flash counter (result unchanged)", () => {
    const { result } = renderHook(() => useFreightClass());
    act(() => result.current.crunch());
    expect(result.current.crunchCount).toBe(1);
    expect(result.current.computed!.cls).toBe(100);
  });

  it("markStart fires exactly once", () => {
    const { result } = renderHook(() => useFreightClass());
    expect(result.current.markStart()).toBe(true);
    expect(result.current.markStart()).toBe(false);
  });

  it("reset() restores INITIAL_SNAPSHOT and the crunch counter", () => {
    const { result } = renderHook(() => useFreightClass());
    act(() => {
      result.current.setField("actualWeight", "1000");
      result.current.setMode("pcf");
      result.current.setField("directPcf", "25");
      result.current.crunch();
    });
    expect(result.current.crunchCount).toBe(1);

    act(() => result.current.reset());
    expect(result.current.snapshot).toEqual(INITIAL_SNAPSHOT);
    expect(result.current.crunchCount).toBe(0);
    // Back to the record example's default class.
    expect(result.current.computed!.cls).toBe(100);
  });
});
