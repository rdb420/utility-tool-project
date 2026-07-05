"use client";

/**
 * State + math for the CBM calculator island — a typed port of the working
 * prototype's IIFE (docs/mockups/opscrunch_cbm_calculator_v0.2.html).
 *
 * Unlike the generic island, this tool recalculates live on every change
 * (the Crunch button only replays the readout flash). All arithmetic
 * delegates to the calc library (`lib/calc/freight`, `lib/calc/units`);
 * carrier-style presentation rounding is applied here, on top of the raw
 * library results, exactly as the prototype did:
 *
 * - carrier rounding (opt-in): each inch dimension rounds UP to the next
 *   whole inch before the volume, and the displayed billable weights round
 *   up to the next whole lb (imperial) or next 0.5 kg (metric);
 * - unit coupling: switching dimensions to inches selects the US parcel
 *   mode and pounds, mm/cm selects air and kilograms — unless the user has
 *   manually chosen a mode / weight unit (manual-override flags);
 * - sea mode rates per revenue tonne: RT = max(CBM, weight in tonnes);
 * - container fill over 100% flips to "N units (…%)".
 */

import { useMemo, useRef, useState } from "react";
import {
  cbmFromCm,
  chargeableWeight,
  containerFillPct,
  volumetricWeightKg,
  volumetricWeightLb,
} from "@/lib/calc/freight";
import { convert } from "@/lib/calc/units";
import {
  CONTAINERS,
  MODES,
  type ContainerKey,
  type ModeKey,
} from "./freightModes";

export type DimUnit = "mm" | "cm" | "in";
export type WeightUnit = "kg" | "lb";
export type ContainerChoice = ContainerKey | "none";

export interface CbmSnapshot {
  length: string;
  width: string;
  height: string;
  unit: DimUnit;
  qty: string;
  mode: ModeKey;
  /** Divisor input text; falls back to the mode preset when unparseable. */
  divisorText: string;
  actualWeight: string;
  actualWeightUnit: WeightUnit;
  container: ContainerChoice;
  carrierRounding: boolean;
  /** Readout display unit + whether the user picked it explicitly. */
  weightUnit: WeightUnit;
  manualWeightUnit: boolean;
}

export interface WeightFigure {
  value: number;
  unit: WeightUnit;
}

export interface CbmComputed {
  /** false when any dimension <= 0 or qty < 1 — render middots, no shouting. */
  valid: boolean;
  totalM3: number;
  perCartonM3: number;
  /** Effective divisor actually used (typed value or mode preset). */
  divisor: number;
  /** Mode short name for labels, e.g. "Air, ÷6000". */
  modeName: string;
  /** null in sea mode (rated per revenue tonne instead). */
  volumetric: WeightFigure | null;
  /** Sea mode only: RT = max(CBM, weight in tonnes). */
  revenueTonnes: number | null;
  /** Present when an actual weight is entered (non-sea modes). */
  actual: WeightFigure | null;
  chargeable: WeightFigure | null;
  /** Present when a container is selected. */
  container: {
    name: string;
    fillPct: number;
    /** Set when the load exceeds one container (fill > 100%). */
    unitsNeeded: number | null;
  } | null;
}

const EMPTY: CbmComputed = {
  valid: false,
  totalM3: 0,
  perCartonM3: 0,
  divisor: 0,
  modeName: MODES.air.name,
  volumetric: null,
  revenueTonnes: null,
  actual: null,
  chargeable: null,
  container: null,
};

function convertWeight(value: number, from: WeightUnit, to: WeightUnit): number {
  return from === to ? value : convert(value, from, to);
}

/** Carrier billable-weight round-up: next 0.5 kg, or next whole lb. */
function roundBillable(value: number, unit: WeightUnit): number {
  return unit === "kg" ? Math.ceil(value * 2) / 2 : Math.ceil(value);
}

/** Pure calculation used by the hook (exported for direct unit testing). */
export function computeCbm(s: CbmSnapshot): CbmComputed {
  const mode = MODES[s.mode];
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
  if (!valid) return { ...EMPTY, modeName: mode.name };

  const lengthCm = convert(l, s.unit, "cm");
  const widthCm = convert(w, s.unit, "cm");
  const heightCm = convert(h, s.unit, "cm");
  const perCartonM3 = cbmFromCm(lengthCm, widthCm, heightCm, 1);
  const totalM3 = cbmFromCm(lengthCm, widthCm, heightCm, q);
  const totalCm3 = lengthCm * widthCm * heightCm * q;

  const typedDivisor = Number.parseFloat(s.divisorText);
  const divisor =
    Number.isFinite(typedDivisor) && typedDivisor > 0
      ? typedDivisor
      : (mode.divisor ?? MODES.custom.divisor);

  const nativeUnit: WeightUnit = mode.system === "imperial" ? "lb" : "kg";
  // Display unit: the native unit unless the user explicitly toggled kg/lb.
  const displayUnit: WeightUnit = s.manualWeightUnit ? s.weightUnit : nativeUnit;

  const awRaw = Number.parseFloat(s.actualWeight);
  const hasActual = Number.isFinite(awRaw) && awRaw > 0;
  const actualKg = hasActual
    ? convertWeight(awRaw, s.actualWeightUnit, "kg")
    : 0;

  let volumetric: WeightFigure | null = null;
  let revenueTonnes: number | null = null;
  let actual: WeightFigure | null = null;
  let chargeable: WeightFigure | null = null;

  if (mode.system === "sea") {
    // Sea/LCL rates per revenue tonne: greater of CBM and metric tonnes.
    revenueTonnes = hasActual ? Math.max(totalM3, actualKg / 1000) : totalM3;
  } else {
    const vwNative =
      mode.system === "metric"
        ? volumetricWeightKg(totalCm3, divisor)
        : volumetricWeightLb(convert(totalCm3, "cm3", "in3"), divisor);

    let vwDisplay = convertWeight(vwNative, nativeUnit, displayUnit);
    if (s.carrierRounding) vwDisplay = roundBillable(vwDisplay, displayUnit);
    volumetric = { value: vwDisplay, unit: displayUnit };

    if (hasActual) {
      const awNative = convertWeight(awRaw, s.actualWeightUnit, nativeUnit);
      const chargeNative = chargeableWeight(awNative, vwNative);
      let chargeDisplay = convertWeight(chargeNative, nativeUnit, displayUnit);
      if (s.carrierRounding) {
        chargeDisplay = roundBillable(chargeDisplay, displayUnit);
      }
      actual = {
        value: convertWeight(awRaw, s.actualWeightUnit, displayUnit),
        unit: displayUnit,
      };
      chargeable = { value: chargeDisplay, unit: displayUnit };
    }
  }

  let container: CbmComputed["container"] = null;
  if (s.container !== "none") {
    const preset = CONTAINERS[s.container];
    const fillPct = containerFillPct(totalM3, preset.volumeM3);
    container = {
      name: preset.name,
      fillPct,
      unitsNeeded: fillPct > 100 ? Math.ceil(totalM3 / preset.volumeM3) : null,
    };
  }

  return {
    valid: true,
    totalM3,
    perCartonM3,
    divisor,
    modeName: mode.name,
    volumetric,
    revenueTonnes,
    actual,
    chargeable,
    container,
  };
}

function nativeUnitOf(mode: ModeKey): WeightUnit {
  return MODES[mode].system === "imperial" ? "lb" : "kg";
}

/** Initial hook state — also the target of reset() (the Clear-inputs action). */
export const INITIAL_SNAPSHOT: CbmSnapshot = {
  length: "120",
  width: "80",
  height: "100",
  unit: "cm",
  qty: "10",
  mode: "air",
  divisorText: String(MODES.air.divisor),
  actualWeight: "",
  actualWeightUnit: "kg",
  container: "none",
  carrierRounding: false,
  weightUnit: "kg",
  manualWeightUnit: false,
};

export interface UseCbm {
  snapshot: CbmSnapshot;
  computed: CbmComputed;
  /** Incremented by crunch(); keys the readout so the flash replays. */
  crunchCount: number;
  setDim(dim: "length" | "width" | "height", value: string): void;
  setQty(value: string): void;
  setUnit(unit: DimUnit): void;
  setMode(mode: ModeKey): void;
  setDivisorText(value: string): void;
  setActualWeight(value: string): void;
  setActualWeightUnit(unit: WeightUnit): void;
  setContainer(container: ContainerChoice): void;
  setCarrierRounding(on: boolean): void;
  setWeightUnit(unit: WeightUnit): void;
  crunch(): void;
  /**
   * Clear-inputs action: back to INITIAL_SNAPSHOT with the coupling flags
   * re-armed. Deliberately does NOT touch startedRef and fires no analytics.
   */
  reset(): void;
  /** True the first time any control changes (drives calculator_start). */
  markStart(): boolean;
}

export function useCbm(): UseCbm {
  const [snapshot, setSnapshot] = useState<CbmSnapshot>(INITIAL_SNAPSHOT);
  const [manualMode, setManualMode] = useState(false);
  const [crunchCount, setCrunchCount] = useState(0);
  const startedRef = useRef(false);

  const computed = useMemo(() => computeCbm(snapshot), [snapshot]);

  const patch = (partial: Partial<CbmSnapshot>) =>
    setSnapshot((current) => ({ ...current, ...partial }));

  return {
    snapshot,
    computed,
    crunchCount,
    setDim: (dim, value) => patch({ [dim]: value }),
    setQty: (value) => patch({ qty: value }),
    setUnit: (unit) => {
      setSnapshot((current) => {
        // Coupling: inches imply the US parcel mode (and lb), metric implies
        // air (and kg) — unless the user has taken manual control.
        const mode = manualMode
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
            : nativeUnitOf(mode),
        };
      });
    },
    setMode: (mode) => {
      setManualMode(true);
      setSnapshot((current) => ({
        ...current,
        mode,
        // The divisor input mirrors the mode preset (sea keeps the old text;
        // the input is disabled in sea mode).
        divisorText:
          MODES[mode].divisor !== null
            ? String(MODES[mode].divisor)
            : current.divisorText,
        weightUnit: current.manualWeightUnit
          ? current.weightUnit
          : nativeUnitOf(mode),
      }));
    },
    setDivisorText: (value) => {
      // Editing the divisor by hand means a custom divisor.
      setManualMode(true);
      setSnapshot((current) => ({
        ...current,
        divisorText: value,
        mode: current.mode === "sea" ? current.mode : "custom",
        weightUnit: current.manualWeightUnit ? current.weightUnit : "kg",
      }));
    },
    setActualWeight: (value) => patch({ actualWeight: value }),
    setActualWeightUnit: (unit) => patch({ actualWeightUnit: unit }),
    setContainer: (container) => patch({ container }),
    setCarrierRounding: (on) => patch({ carrierRounding: on }),
    setWeightUnit: (unit) =>
      patch({ weightUnit: unit, manualWeightUnit: true }),
    crunch: () => setCrunchCount((count) => count + 1),
    reset: () => {
      setSnapshot(INITIAL_SNAPSHOT);
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
