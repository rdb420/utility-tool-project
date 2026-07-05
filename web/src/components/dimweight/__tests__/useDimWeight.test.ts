// @vitest-environment jsdom
/**
 * useDimWeight: record-derived initial state (divisor default picks the
 * unit system), the pure computeDimWeight math checked against BOTH
 * calculator records' worked examples with plain hand arithmetic, carrier
 * rounding, the optional actual-weight/chargeable/billed-on path, and the
 * unit <-> mode <-> weight-unit coupling with manual-override flags.
 */

import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { CALCULATORS_BY_ID } from "@/lib/records/records";
import {
  computeDimWeight,
  initialStateForRecord,
  useDimWeight,
  type DimWeightSnapshot,
} from "../useDimWeight";

const dimensional = CALCULATORS_BY_ID["calculator.dimensional_weight"];
const volumetric = CALCULATORS_BY_ID["calculator.volumetric_weight"];

/** Metric baseline snapshot (the volumetric record's defaults) + overrides. */
function snapshot(overrides: Partial<DimWeightSnapshot> = {}): DimWeightSnapshot {
  return { ...initialStateForRecord(volumetric), ...overrides };
}

describe("initialStateForRecord", () => {
  it("divisor default 139 -> imperial: inches, US parcel mode, pounds", () => {
    const state = initialStateForRecord(dimensional);
    expect(state.unit).toBe("in");
    expect(state.mode).toBe("usparcel");
    expect(state.divisorText).toBe("139");
    expect(state.weightUnit).toBe("lb");
    expect(state.actualWeightUnit).toBe("lb");
    expect(state.manualWeightUnit).toBe(false);
    // Dimension/quantity defaults come from the record inputs.
    expect(state.length).toBe("30");
    expect(state.width).toBe("24");
    expect(state.height).toBe("22");
    expect(state.qty).toBe("1");
    expect(state.actualWeight).toBe(""); // optional AW starts absent
    expect(state.carrierRounding).toBe(false);
  });

  it("divisor default 6000 -> metric: centimetres, air mode, kilograms", () => {
    const state = initialStateForRecord(volumetric);
    expect(state.unit).toBe("cm");
    expect(state.mode).toBe("air");
    expect(state.divisorText).toBe("6000");
    expect(state.weightUnit).toBe("kg");
    expect(state.actualWeightUnit).toBe("kg");
    expect(state.length).toBe("120");
    expect(state.width).toBe("80");
    expect(state.height).toBe("100");
    expect(state.qty).toBe("10");
  });
});

describe("computeDimWeight", () => {
  it("dimensional record example: 30 x 24 x 22 in / 139 = 113.96 lb", () => {
    const result = computeDimWeight(initialStateForRecord(dimensional));
    expect(result.valid).toBe(true);
    expect(result.system).toBe("imperial");
    expect(result.divisor).toBe(139);
    // 30 x 24 x 22 = 15,840 in³; / 139 = 113.9568... lb.
    expect(result.volumeNative).toBeCloseTo(15_840, 6);
    expect(result.volumetric!.value).toBeCloseTo(113.96, 2);
    expect(result.volumetric!.unit).toBe("lb");
    // No actual weight entered: no chargeable comparison.
    expect(result.actual).toBeNull();
    expect(result.chargeable).toBeNull();
    expect(result.billedOn).toBeNull();
  });

  it("volumetric record example: 120 x 80 x 100 cm x 10 / 6000 = 1,600 kg", () => {
    const result = computeDimWeight(initialStateForRecord(volumetric));
    expect(result.valid).toBe(true);
    expect(result.system).toBe("metric");
    expect(result.divisor).toBe(6000);
    expect(result.volumeNative).toBeCloseTo(9_600_000, 6);
    expect(result.volumeM3).toBeCloseTo(9.6, 9);
    expect(result.volumetric!.value).toBeCloseTo(1600, 6);
    expect(result.volumetric!.unit).toBe("kg");
  });

  it("invalid dims/qty yield the middot state, no throw", () => {
    expect(computeDimWeight(snapshot({ length: "0" })).valid).toBe(false);
    expect(computeDimWeight(snapshot({ width: "-5" })).valid).toBe(false);
    expect(computeDimWeight(snapshot({ height: "" })).valid).toBe(false);
    expect(computeDimWeight(snapshot({ qty: "0" })).valid).toBe(false);
    const invalid = computeDimWeight(snapshot({ length: "0" }));
    expect(invalid.volumetric).toBeNull();
    expect(invalid.chargeable).toBeNull();
    expect(invalid.billedOn).toBeNull();
  });

  it("carrier rounding (imperial): 10.2 in dims ceil to 11 in, billable to next lb", () => {
    const base: Partial<DimWeightSnapshot> = {
      length: "10.2",
      width: "10.2",
      height: "10.2",
      unit: "in",
      qty: "1",
      mode: "usparcel",
      divisorText: "139",
    };
    // Raw: 10.2³ / 139 = 7.634... lb.
    const raw = computeDimWeight(snapshot(base));
    expect(raw.volumetric!.value).toBeCloseTo((10.2 * 10.2 * 10.2) / 139, 6);

    // Rounded: ceil(10.2) = 11 in per dim; 11³ = 1,331 in³ / 139 = 9.576...
    // -> billable rounds UP to 10 lb.
    const rounded = computeDimWeight(snapshot({ ...base, carrierRounding: true }));
    expect(rounded.volumetric!.value).toBe(Math.ceil((11 * 11 * 11) / 139));
    expect(rounded.volumetric!.value).toBe(10);
    expect(rounded.volumetric!.unit).toBe("lb");
  });

  it("carrier rounding (metric): billable weight rounds up to the next 0.5 kg", () => {
    // 100 x 100 x 100 cm x 1 / 6000 = 166.66... -> 167.0 kg (next 0.5).
    const result = computeDimWeight(
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

  it("actual weight present: chargeable = max(actual, volumetric) + verdict", () => {
    const billedOnVolume = computeDimWeight(snapshot({ actualWeight: "900" }));
    expect(billedOnVolume.actual!.value).toBeCloseTo(900, 9);
    expect(billedOnVolume.chargeable!.value).toBeCloseTo(1600, 6);
    expect(billedOnVolume.billedOn).toBe("volumetric");

    const billedOnActual = computeDimWeight(snapshot({ actualWeight: "2000" }));
    expect(billedOnActual.chargeable!.value).toBeCloseTo(2000, 9);
    expect(billedOnActual.billedOn).toBe("actual");
  });

  it("actual weight blank: no chargeable row, no verdict", () => {
    const result = computeDimWeight(snapshot({ actualWeight: "" }));
    expect(result.actual).toBeNull();
    expect(result.chargeable).toBeNull();
    expect(result.billedOn).toBeNull();
  });

  it("unparseable or non-positive divisor falls back to the mode preset", () => {
    expect(computeDimWeight(snapshot({ divisorText: "" })).divisor).toBe(6000);
    expect(computeDimWeight(snapshot({ divisorText: "0" })).divisor).toBe(6000);
    expect(computeDimWeight(snapshot({ divisorText: "5000" })).divisor).toBe(5000);
  });

  it("custom mode's unit system follows the dimension unit (in -> in³/lb)", () => {
    // Imperial page, hand-typed divisor 166: must stay in³/lb, not flip to
    // the metric interpretation.
    const result = computeDimWeight({
      ...initialStateForRecord(dimensional),
      mode: "custom",
      divisorText: "166",
    });
    expect(result.system).toBe("imperial");
    expect(result.volumetric!.unit).toBe("lb");
    expect(result.volumetric!.value).toBeCloseTo(15_840 / 166, 6);
  });
});

describe("useDimWeight coupling", () => {
  it("switching dims to inches selects US parcel mode + lb (no manual overrides)", () => {
    const { result } = renderHook(() => useDimWeight(volumetric));
    act(() => result.current.setUnit("in"));
    expect(result.current.snapshot.mode).toBe("usparcel");
    expect(result.current.snapshot.divisorText).toBe("139");
    expect(result.current.snapshot.weightUnit).toBe("lb");

    act(() => result.current.setUnit("cm"));
    expect(result.current.snapshot.mode).toBe("air");
    expect(result.current.snapshot.divisorText).toBe("6000");
    expect(result.current.snapshot.weightUnit).toBe("kg");
  });

  it("a manually chosen mode survives unit switches (manualMode flag)", () => {
    const { result } = renderHook(() => useDimWeight(volumetric));
    act(() => result.current.setMode("express"));
    expect(result.current.snapshot.divisorText).toBe("5000");

    act(() => result.current.setUnit("in"));
    expect(result.current.snapshot.mode).toBe("express");
    expect(result.current.snapshot.divisorText).toBe("5000");
  });

  it("a manually chosen weight unit survives unit/mode switches (manualWeightUnit)", () => {
    const { result } = renderHook(() => useDimWeight(dimensional));
    act(() => result.current.setWeightUnit("kg"));
    act(() => result.current.setUnit("in")); // would otherwise force lb
    expect(result.current.snapshot.weightUnit).toBe("kg");

    act(() => result.current.setMode("usparcel")); // would otherwise force lb
    expect(result.current.snapshot.weightUnit).toBe("kg");
  });

  it("editing the divisor flips the mode to custom and keeps the system", () => {
    const { result } = renderHook(() => useDimWeight(dimensional));
    act(() => result.current.setDivisorText("166"));
    expect(result.current.snapshot.mode).toBe("custom");
    expect(result.current.snapshot.divisorText).toBe("166");
    expect(result.current.computed.divisor).toBe(166);
    // The imperial page keeps in³/lb semantics under a custom divisor...
    expect(result.current.computed.system).toBe("imperial");
    expect(result.current.snapshot.weightUnit).toBe("lb");

    // ...and custom then survives unit switches like any manual mode.
    act(() => result.current.setUnit("cm"));
    expect(result.current.snapshot.mode).toBe("custom");
    expect(result.current.computed.system).toBe("metric");
  });

  it("markStart fires exactly once", () => {
    const { result } = renderHook(() => useDimWeight(volumetric));
    expect(result.current.markStart()).toBe(true);
    expect(result.current.markStart()).toBe(false);
  });

  it("reset() returns to initialStateForRecord for BOTH records", () => {
    for (const record of [dimensional, volumetric]) {
      const { result } = renderHook(() => useDimWeight(record));
      act(() => {
        result.current.setDim("length", "5");
        result.current.setMode("express"); // sets the manual-mode flag
        result.current.setWeightUnit("kg"); // sets manualWeightUnit
        result.current.crunch();
      });
      expect(result.current.crunchCount).toBe(1);

      act(() => result.current.reset());
      expect(result.current.snapshot).toEqual(initialStateForRecord(record));
      expect(result.current.crunchCount).toBe(0);

      // Manual-mode flag cleared: unit coupling is live again.
      act(() => result.current.setUnit("in"));
      expect(result.current.snapshot.mode).toBe("usparcel");
      expect(result.current.snapshot.divisorText).toBe("139");
    }
  });
});
