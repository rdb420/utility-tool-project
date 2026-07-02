// @vitest-environment jsdom
/**
 * useCbm hook: unit <-> mode <-> weight-unit coupling with manual-override
 * flags, plus the pure computeCbm math (sea revenue tonnes, carrier
 * rounding, container fill overflow) checked with plain hand arithmetic.
 */

import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { computeCbm, useCbm, type CbmSnapshot } from "../useCbm";

/** Default snapshot (matches the hook's initial state) with overrides. */
function snapshot(overrides: Partial<CbmSnapshot> = {}): CbmSnapshot {
  return {
    length: "120",
    width: "80",
    height: "100",
    unit: "cm",
    qty: "10",
    mode: "air",
    divisorText: "6000",
    actualWeight: "",
    actualWeightUnit: "kg",
    container: "none",
    carrierRounding: false,
    weightUnit: "kg",
    manualWeightUnit: false,
    ...overrides,
  };
}

describe("computeCbm", () => {
  it("default example: 9.6 m³ and 1,600 kg volumetric", () => {
    const result = computeCbm(snapshot());
    expect(result.valid).toBe(true);
    expect(result.totalM3).toBeCloseTo(9.6, 9);
    expect(result.perCartonM3).toBeCloseTo(0.96, 9);
    expect(result.volumetric).not.toBeNull();
    expect(result.volumetric!.value).toBeCloseTo(1600, 6);
    expect(result.volumetric!.unit).toBe("kg");
  });

  it("invalid input (dimension <= 0 or qty < 1) yields middot state, no throw", () => {
    expect(computeCbm(snapshot({ length: "0" })).valid).toBe(false);
    expect(computeCbm(snapshot({ width: "-5" })).valid).toBe(false);
    expect(computeCbm(snapshot({ height: "" })).valid).toBe(false);
    expect(computeCbm(snapshot({ qty: "0" })).valid).toBe(false);
  });

  it("sea mode: revenue tonnes = max(CBM, weight in tonnes)", () => {
    // 9.6 m³ vs 0.9 t -> 9.6 RT; vs 12 t -> 12 RT.
    const light = computeCbm(
      snapshot({ mode: "sea", actualWeight: "900", actualWeightUnit: "kg" }),
    );
    expect(light.revenueTonnes).toBeCloseTo(9.6, 9);
    expect(light.volumetric).toBeNull();

    const heavy = computeCbm(
      snapshot({ mode: "sea", actualWeight: "12000", actualWeightUnit: "kg" }),
    );
    expect(heavy.revenueTonnes).toBeCloseTo(12, 9);
  });

  it("carrier rounding (imperial): inch dims round up, billable weight to next lb", () => {
    // 10.2 in ceil-> 11 in; 11^3 = 1331 in³ / 139 = 9.575... -> ceil 10 lb.
    const rounded = computeCbm(
      snapshot({
        length: "10.2",
        width: "10.2",
        height: "10.2",
        unit: "in",
        qty: "1",
        mode: "usparcel",
        divisorText: "139",
      }),
    );
    expect(rounded.volumetric!.value).toBeCloseTo(
      (10.2 ** 3 * 1) / 139,
      6,
    );

    const withRounding = computeCbm(
      snapshot({
        length: "10.2",
        width: "10.2",
        height: "10.2",
        unit: "in",
        qty: "1",
        mode: "usparcel",
        divisorText: "139",
        carrierRounding: true,
      }),
    );
    expect(withRounding.volumetric!.value).toBe(Math.ceil((11 ** 3 * 1) / 139)); // 10 lb
    expect(withRounding.volumetric!.unit).toBe("lb");
  });

  it("carrier rounding (metric): billable weight rounds up to the next 0.5 kg", () => {
    // 100 x 100 x 100 cm x 1 / 6000 = 166.66... -> 167.0 kg (next 0.5).
    const result = computeCbm(
      snapshot({
        length: "100",
        width: "100",
        height: "100",
        qty: "1",
        carrierRounding: true,
      }),
    );
    expect(result.volumetric!.value).toBe(Math.ceil((1_000_000 / 6000) * 2) / 2);
  });

  it("chargeable = max(actual, volumetric), shown only when actual entered", () => {
    const without = computeCbm(snapshot());
    expect(without.actual).toBeNull();
    expect(without.chargeable).toBeNull();

    const withActual = computeCbm(snapshot({ actualWeight: "900" }));
    expect(withActual.actual!.value).toBeCloseTo(900, 9);
    expect(withActual.chargeable!.value).toBeCloseTo(1600, 6);

    const heavy = computeCbm(snapshot({ actualWeight: "2000" }));
    expect(heavy.chargeable!.value).toBeCloseTo(2000, 9);
  });

  it("container fill: percentage up to 100%, unit count beyond", () => {
    // 9.6 / 67 = 14.328...% of a 40ft DV.
    const partial = computeCbm(snapshot({ container: "c40" }));
    expect(partial.container!.fillPct).toBeCloseTo((9.6 / 67) * 100, 9);
    expect(partial.container!.unitsNeeded).toBeNull();

    // 100 cartons -> 96 m³ -> ceil(96 / 67) = 2 units of a 40ft DV.
    const overflow = computeCbm(snapshot({ qty: "100", container: "c40" }));
    expect(overflow.container!.fillPct).toBeGreaterThan(100);
    expect(overflow.container!.unitsNeeded).toBe(Math.ceil(96 / 67));
  });

  it("unparseable or non-positive divisor falls back to the mode preset", () => {
    expect(computeCbm(snapshot({ divisorText: "" })).divisor).toBe(6000);
    expect(computeCbm(snapshot({ divisorText: "0" })).divisor).toBe(6000);
    expect(computeCbm(snapshot({ divisorText: "5000" })).divisor).toBe(5000);
  });
});

describe("useCbm coupling", () => {
  it("switching dims to inches selects US parcel mode + lb (no manual overrides)", () => {
    const { result } = renderHook(() => useCbm());
    act(() => result.current.setUnit("in"));
    expect(result.current.snapshot.mode).toBe("usparcel");
    expect(result.current.snapshot.divisorText).toBe("139");
    expect(result.current.snapshot.weightUnit).toBe("lb");

    act(() => result.current.setUnit("mm"));
    expect(result.current.snapshot.mode).toBe("air");
    expect(result.current.snapshot.divisorText).toBe("6000");
    expect(result.current.snapshot.weightUnit).toBe("kg");
  });

  it("a manually chosen mode survives unit switches (manualMode flag)", () => {
    const { result } = renderHook(() => useCbm());
    act(() => result.current.setMode("express"));
    expect(result.current.snapshot.divisorText).toBe("5000");

    act(() => result.current.setUnit("in"));
    expect(result.current.snapshot.mode).toBe("express");
    expect(result.current.snapshot.divisorText).toBe("5000");
  });

  it("a manually chosen weight unit survives unit/mode switches (manualW flag)", () => {
    const { result } = renderHook(() => useCbm());
    act(() => result.current.setWeightUnit("lb"));
    act(() => result.current.setUnit("mm")); // would otherwise force kg
    expect(result.current.snapshot.weightUnit).toBe("lb");

    act(() => result.current.setMode("air")); // would otherwise force kg
    expect(result.current.snapshot.weightUnit).toBe("lb");
  });

  it("editing the divisor flips the mode to custom", () => {
    const { result } = renderHook(() => useCbm());
    act(() => result.current.setDivisorText("4500"));
    expect(result.current.snapshot.mode).toBe("custom");
    expect(result.current.snapshot.divisorText).toBe("4500");
    expect(result.current.computed.divisor).toBe(4500);

    // ...and custom then survives unit switches like any manual mode.
    act(() => result.current.setUnit("in"));
    expect(result.current.snapshot.mode).toBe("custom");
  });

  it("markStart fires exactly once", () => {
    const { result } = renderHook(() => useCbm());
    expect(result.current.markStart()).toBe(true);
    expect(result.current.markStart()).toBe(false);
  });
});
