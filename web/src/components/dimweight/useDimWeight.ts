"use client";

/**
 * State + math for the shared dimensional/volumetric weight island — a
 * focused subset of the CBM island's useCbm (no sea mode, no container fit;
 * DIM weight IS the headline instead of a derived row).
 *
 * One hook serves BOTH pages: the initial state derives from the calculator
 * record passed in (initialStateForRecord). The record's `divisor` input
 * default picks the transport-mode preset, which picks the unit system:
 * 139 -> US parcel -> inches/pounds (dimensional-weight page), 6000 -> air
 * -> centimetres/kilograms (volumetric-weight page).
 *
 * Behavior mirrors useCbm:
 * - live recalculation on every change (Crunch only replays the flash);
 * - unit switch couples mode + weight unit (in -> US parcel + lb, cm -> air
 *   + kg) unless the user took manual control (manualMode / manualWeightUnit);
 * - picking a mode sets its preset divisor; editing the divisor by hand
 *   flips to the custom mode;
 * - carrier rounding (opt-in): inch dims ceil to the next whole inch before
 *   the volume; billable weights round up to the next lb / next 0.5 kg;
 * - optional actual weight: when present, chargeable = max(actual,
 *   volumetric) plus a billed-on verdict;
 * - invalid dims/qty -> valid:false (middot placeholders, no shouting).
 *
 * One deliberate divergence from useCbm: the custom mode's unit system
 * follows the dimension unit (in -> in³/lb, cm -> cm³/kg) instead of always
 * being metric. On the imperial page, editing 139 -> 166 must stay an
 * in³/lb divisor — CBM's always-metric custom would silently reinterpret it
 * as cm³/kg.
 */

import { useMemo, useRef, useState } from "react";
import {
  chargeableWeight,
  volumetricWeightKg,
  volumetricWeightLb,
} from "@/lib/calc/freight";
import { convert } from "@/lib/calc/units";
import type { CalculatorRecord } from "@/lib/records/types.gen";
import { MODES, MODE_KEYS, type ModeKey } from "../cbm/freightModes";

export type DimUnit = "cm" | "in";
export type WeightUnit = "kg" | "lb";
export type DimSystem = "metric" | "imperial";

/** Parcel/air DIM modes only — sea is rated per revenue tonne, not divisor. */
export type DimModeKey = Exclude<ModeKey, "sea">;

export const DIM_MODE_KEYS: readonly DimModeKey[] = MODE_KEYS.filter(
  (key): key is DimModeKey => key !== "sea",
);

export interface DimWeightSnapshot {
  length: string;
  width: string;
  height: string;
  unit: DimUnit;
  qty: string;
  mode: DimModeKey;
  /** Divisor input text; falls back to the mode preset when unparseable. */
  divisorText: string;
  /** Optional actual (scale) weight; blank means absent. */
  actualWeight: string;
  actualWeightUnit: WeightUnit;
  carrierRounding: boolean;
  /** Readout display unit + whether the user picked it explicitly. */
  weightUnit: WeightUnit;
  manualWeightUnit: boolean;
}

export interface WeightFigure {
  value: number;
  unit: WeightUnit;
}

export interface DimWeightComputed {
  /** false when any dimension <= 0 or qty < 1 — render middots. */
  valid: boolean;
  /** Unit system in effect (custom mode follows the dimension unit). */
  system: DimSystem;
  /** Effective divisor actually used (typed value or mode preset). */
  divisor: number;
  /** Mode short name for labels, e.g. "US parcel, ÷139". */
  modeName: string;
  /** Total shipment volume in the system's native unit (in³ or cm³). */
  volumeNative: number;
  volumeM3: number;
  /** The page's headline figure (DW / VW — same number, two conventions). */
  volumetric: WeightFigure | null;
  /** Present when an actual weight is entered. */
  actual: WeightFigure | null;
  chargeable: WeightFigure | null;
  billedOn: "volumetric" | "actual" | null;
}

/**
 * Unit system in effect: mode presets carry their own system; the custom
 * mode follows the dimension unit so a hand-typed divisor keeps meaning
 * in³/lb on the imperial page and cm³/kg on the metric one.
 */
function systemOf(mode: DimModeKey, unit: DimUnit): DimSystem {
  if (mode === "custom") return unit === "in" ? "imperial" : "metric";
  return MODES[mode].system as DimSystem;
}

function nativeUnitOf(system: DimSystem): WeightUnit {
  return system === "imperial" ? "lb" : "kg";
}

function convertWeight(value: number, from: WeightUnit, to: WeightUnit): number {
  return from === to ? value : convert(value, from, to);
}

/** Carrier billable-weight round-up: next 0.5 kg, or next whole lb. */
function roundBillable(value: number, unit: WeightUnit): number {
  return unit === "kg" ? Math.ceil(value * 2) / 2 : Math.ceil(value);
}

function effectiveDivisor(s: DimWeightSnapshot): number {
  const typed = Number.parseFloat(s.divisorText);
  if (Number.isFinite(typed) && typed > 0) return typed;
  return MODES[s.mode].divisor ?? MODES.custom.divisor;
}

/** Pure calculation used by the hook (exported for direct unit testing). */
export function computeDimWeight(s: DimWeightSnapshot): DimWeightComputed {
  const mode = MODES[s.mode];
  const system = systemOf(s.mode, s.unit);
  const divisor = effectiveDivisor(s);

  let l = Number.parseFloat(s.length);
  let w = Number.parseFloat(s.width);
  let h = Number.parseFloat(s.height);
  const q = Number.parseInt(s.qty, 10);

  // Carrier whole-inch round-up applies to imperial dimensions only.
  if (s.carrierRounding && s.unit === "in") {
    l = Math.ceil(l);
    w = Math.ceil(w);
    h = Math.ceil(h);
  }
  const valid =
    Number.isFinite(l) && l > 0 &&
    Number.isFinite(w) && w > 0 &&
    Number.isFinite(h) && h > 0 &&
    Number.isFinite(q) && q >= 1;
  if (!valid) {
    return {
      valid: false,
      system,
      divisor,
      modeName: mode.name,
      volumeNative: 0,
      volumeM3: 0,
      volumetric: null,
      actual: null,
      chargeable: null,
      billedOn: null,
    };
  }

  const totalCm3 =
    convert(l, s.unit, "cm") *
    convert(w, s.unit, "cm") *
    convert(h, s.unit, "cm") *
    q;
  const volumeNative =
    system === "imperial" ? convert(totalCm3, "cm3", "in3") : totalCm3;
  const volumeM3 = convert(totalCm3, "cm3", "m3");

  const vwNative =
    system === "metric"
      ? volumetricWeightKg(totalCm3, divisor)
      : volumetricWeightLb(volumeNative, divisor);

  const nativeUnit = nativeUnitOf(system);
  // Display unit: the native unit unless the user explicitly toggled kg/lb.
  const displayUnit: WeightUnit = s.manualWeightUnit ? s.weightUnit : nativeUnit;

  let vwDisplay = convertWeight(vwNative, nativeUnit, displayUnit);
  if (s.carrierRounding) vwDisplay = roundBillable(vwDisplay, displayUnit);
  const volumetric: WeightFigure = { value: vwDisplay, unit: displayUnit };

  const awRaw = Number.parseFloat(s.actualWeight);
  const hasActual = Number.isFinite(awRaw) && awRaw > 0;

  let actual: WeightFigure | null = null;
  let chargeable: WeightFigure | null = null;
  let billedOn: "volumetric" | "actual" | null = null;
  if (hasActual) {
    const awNative = convertWeight(awRaw, s.actualWeightUnit, nativeUnit);
    const chargeNative = chargeableWeight(awNative, vwNative);
    let chargeDisplay = convertWeight(chargeNative, nativeUnit, displayUnit);
    if (s.carrierRounding) chargeDisplay = roundBillable(chargeDisplay, displayUnit);
    actual = {
      value: convertWeight(awRaw, s.actualWeightUnit, displayUnit),
      unit: displayUnit,
    };
    chargeable = { value: chargeDisplay, unit: displayUnit };
    billedOn = vwNative >= awNative ? "volumetric" : "actual";
  }

  return {
    valid: true,
    system,
    divisor,
    modeName: mode.name,
    volumeNative,
    volumeM3,
    volumetric,
    actual,
    chargeable,
    billedOn,
  };
}

function recordDefault(
  calculator: CalculatorRecord,
  symbol: string,
): number | undefined {
  for (const group of calculator.input_groups) {
    for (const input of group.inputs) {
      if (input.symbol === symbol) return input.default;
    }
  }
  return undefined;
}

/**
 * Initial state derived from a calculator record: the `divisor` input's
 * default selects the matching mode preset (139 -> usparcel, 6000 -> air,
 * unknown -> custom), whose system picks in/lb vs cm/kg; the dimension and
 * quantity defaults come from the record's L/W/H/Q inputs.
 */
export function initialStateForRecord(
  calculator: CalculatorRecord,
): DimWeightSnapshot {
  const divisorDefault =
    recordDefault(calculator, "divisor") ?? (MODES.air.divisor as number);
  const mode: DimModeKey =
    DIM_MODE_KEYS.find(
      (key) => key !== "custom" && MODES[key].divisor === divisorDefault,
    ) ?? "custom";
  const system = mode === "custom" ? "metric" : (MODES[mode].system as DimSystem);
  const unit: DimUnit = system === "imperial" ? "in" : "cm";
  const weightUnit = nativeUnitOf(system);
  const text = (symbol: string) => {
    const value = recordDefault(calculator, symbol);
    return value === undefined ? "" : String(value);
  };
  return {
    length: text("L"),
    width: text("W"),
    height: text("H"),
    unit,
    qty: text("Q") || "1",
    mode,
    divisorText: String(divisorDefault),
    actualWeight: "",
    actualWeightUnit: weightUnit,
    carrierRounding: false,
    weightUnit,
    manualWeightUnit: false,
  };
}

export interface UseDimWeight {
  snapshot: DimWeightSnapshot;
  computed: DimWeightComputed;
  /** Incremented by crunch(); keys the readout so the flash replays. */
  crunchCount: number;
  setDim(dim: "length" | "width" | "height", value: string): void;
  setQty(value: string): void;
  setUnit(unit: DimUnit): void;
  setMode(mode: DimModeKey): void;
  setDivisorText(value: string): void;
  setActualWeight(value: string): void;
  setActualWeightUnit(unit: WeightUnit): void;
  setCarrierRounding(on: boolean): void;
  setWeightUnit(unit: WeightUnit): void;
  crunch(): void;
  /**
   * Clear-inputs action: back to the record-derived initial state with the
   * coupling flags re-armed. Deliberately does NOT touch startedRef and
   * fires no analytics.
   */
  reset(): void;
  /** True the first time any control changes (drives calculator_start). */
  markStart(): boolean;
}

export function useDimWeight(calculator: CalculatorRecord): UseDimWeight {
  const [snapshot, setSnapshot] = useState<DimWeightSnapshot>(() =>
    initialStateForRecord(calculator),
  );
  const [manualMode, setManualMode] = useState(false);
  const [crunchCount, setCrunchCount] = useState(0);
  const startedRef = useRef(false);

  const computed = useMemo(() => computeDimWeight(snapshot), [snapshot]);

  const patch = (partial: Partial<DimWeightSnapshot>) =>
    setSnapshot((current) => ({ ...current, ...partial }));

  return {
    snapshot,
    computed,
    crunchCount,
    setDim: (dim, value) => patch({ [dim]: value }),
    setQty: (value) => patch({ qty: value }),
    setUnit: (unit) => {
      setSnapshot((current) => {
        // Coupling: inches imply the US parcel mode (and lb), cm implies
        // air (and kg) — unless the user has taken manual control.
        const mode: DimModeKey = manualMode
          ? current.mode
          : unit === "in"
            ? "usparcel"
            : "air";
        return {
          ...current,
          unit,
          mode,
          divisorText:
            !manualMode && MODES[mode].divisor !== null
              ? String(MODES[mode].divisor)
              : current.divisorText,
          weightUnit: current.manualWeightUnit
            ? current.weightUnit
            : nativeUnitOf(systemOf(mode, unit)),
        };
      });
    },
    setMode: (mode) => {
      setManualMode(true);
      setSnapshot((current) => ({
        ...current,
        mode,
        // The divisor input mirrors the mode preset (custom keeps the text).
        divisorText:
          mode !== "custom" && MODES[mode].divisor !== null
            ? String(MODES[mode].divisor)
            : current.divisorText,
        weightUnit: current.manualWeightUnit
          ? current.weightUnit
          : nativeUnitOf(systemOf(mode, current.unit)),
      }));
    },
    setDivisorText: (value) => {
      // Editing the divisor by hand means a custom divisor; its unit system
      // follows the current dimension unit (see systemOf).
      setManualMode(true);
      setSnapshot((current) => ({
        ...current,
        divisorText: value,
        mode: "custom",
        weightUnit: current.manualWeightUnit
          ? current.weightUnit
          : nativeUnitOf(systemOf("custom", current.unit)),
      }));
    },
    setActualWeight: (value) => patch({ actualWeight: value }),
    setActualWeightUnit: (unit) => patch({ actualWeightUnit: unit }),
    setCarrierRounding: (on) => patch({ carrierRounding: on }),
    setWeightUnit: (unit) => patch({ weightUnit: unit, manualWeightUnit: true }),
    crunch: () => setCrunchCount((count) => count + 1),
    reset: () => {
      setSnapshot(initialStateForRecord(calculator));
      setManualMode(false);
      setCrunchCount(0);
    },
    markStart: () => {
      if (startedRef.current) return false;
      startedRef.current = true;
      return true;
    },
  };
}
