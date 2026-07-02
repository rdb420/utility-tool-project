"use client";

/**
 * State + math for the freight-class calculator island
 * (calculator.freight_class).
 *
 * Follows the CBM island pattern: the tool recalculates live on every change
 * (useMemo over the snapshot; the Crunch button only replays the readout
 * flash), and invalid/empty input yields a null result rendered as middot
 * placeholders — no error shouting.
 *
 * Two input modes:
 * - "dims": handling-unit dimensions (in) + pieces + actual weight (lb);
 *   volume/density delegate to the calc library (`cubicFeetFromInches`,
 *   `densityPcf`).
 * - "pcf": a density figure entered directly (no volume output).
 *
 * The density -> class lookup lives in nmfcClasses.ts (13-sub FCDC scale).
 * Defaults mirror data/calculators/freight_class.json input defaults
 * (48 x 40 x 48 in, 1 piece, 500 lb -> 9.375 lb/ft^3 -> class 100).
 */

import { useMemo, useRef, useState } from "react";
import { cubicFeetFromInches, densityPcf } from "@/lib/calc/freight";
import { bandForDensity, type NmfcClassRow } from "./nmfcClasses";

export type InputMode = "dims" | "pcf";

export type DimsField = "length" | "width" | "height" | "qty" | "actualWeight";

export interface FreightClassSnapshot {
  mode: InputMode;
  /** dims mode: handling-unit dimensions in inches. */
  length: string;
  width: string;
  height: string;
  /** dims mode: identical handling units. */
  qty: string;
  /** dims mode: total scale weight, lb. */
  actualWeight: string;
  /** pcf mode: density entered directly, lb/ft^3. */
  directPcf: string;
}

export interface FreightClassComputed {
  /** Total cubic feet; null in pcf mode (no dimensions entered). */
  v: number | null;
  /** Density, lb/ft^3. */
  pcf: number;
  /** Estimated NMFC class (a number; 92.5 is a real class). */
  cls: number;
  /** The matched density band, for the "8-<10 lb/ft^3" derived row. */
  band: NmfcClassRow;
}

/**
 * Pure calculation used by the hook (exported for direct unit testing).
 * Returns null when inputs are invalid/empty: any dimension, pieces, or
 * actual weight <= 0 in dims mode; directPcf <= 0 in pcf mode.
 */
export function computeFreightClass(
  s: FreightClassSnapshot,
): FreightClassComputed | null {
  if (s.mode === "pcf") {
    const pcf = Number.parseFloat(s.directPcf);
    if (!Number.isFinite(pcf) || pcf <= 0) return null;
    const band = bandForDensity(pcf);
    if (!band) return null;
    return { v: null, pcf, cls: band.class, band };
  }

  const l = Number.parseFloat(s.length);
  const w = Number.parseFloat(s.width);
  const h = Number.parseFloat(s.height);
  const q = Number.parseInt(s.qty, 10);
  const aw = Number.parseFloat(s.actualWeight);
  const valid =
    Number.isFinite(l) && l > 0 &&
    Number.isFinite(w) && w > 0 &&
    Number.isFinite(h) && h > 0 &&
    Number.isFinite(q) && q >= 1 &&
    Number.isFinite(aw) && aw > 0;
  if (!valid) return null;

  const v = cubicFeetFromInches(l, w, h, q);
  const pcf = densityPcf(aw, v);
  const band = bandForDensity(pcf);
  if (!band) return null;
  return { v, pcf, cls: band.class, band };
}

export interface UseFreightClass {
  snapshot: FreightClassSnapshot;
  /** null = invalid/empty inputs -> middot placeholders. */
  computed: FreightClassComputed | null;
  /** Incremented by crunch(); keys the readout so the flash replays. */
  crunchCount: number;
  setMode(mode: InputMode): void;
  setField(field: DimsField | "directPcf", value: string): void;
  crunch(): void;
  /** True the first time any control changes (drives calculator_start). */
  markStart(): boolean;
}

export function useFreightClass(): UseFreightClass {
  const [snapshot, setSnapshot] = useState<FreightClassSnapshot>({
    mode: "dims",
    length: "48",
    width: "40",
    height: "48",
    qty: "1",
    actualWeight: "500",
    directPcf: "",
  });
  const [crunchCount, setCrunchCount] = useState(0);
  const startedRef = useRef(false);

  const computed = useMemo(() => computeFreightClass(snapshot), [snapshot]);

  return {
    snapshot,
    computed,
    crunchCount,
    setMode: (mode) => setSnapshot((current) => ({ ...current, mode })),
    setField: (field, value) =>
      setSnapshot((current) => ({ ...current, [field]: value })),
    crunch: () => setCrunchCount((count) => count + 1),
    markStart: () => {
      if (startedRef.current) return false;
      startedRef.current = true;
      return true;
    },
  };
}
