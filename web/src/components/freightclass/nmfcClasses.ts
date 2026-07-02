/**
 * NMFC freight-class density scale for the freight-class island.
 *
 * The 13-subprovision FCDC density chart (NMFC Docket 2025-1, effective
 * 2025-07-19). Values are hardcoded so the island bundles without fs access,
 * and lockstep-tested against
 * data/reference_tables/freight/nmfc_freight_classes.json — edit the record
 * first, then mirror it here (the Vitest suite fails on any drift).
 *
 * Band semantics: min <= density < max, with the top band (50+ lb/ft^3)
 * open-ended. Density-based classes are an estimator only: many commodities
 * carry fixed NMFC classes, and handling, stowability, and liability can
 * override density. Confirm with NMFTA ClassIT+ or your carrier.
 */

export interface NmfcClassRow {
  /** Subprovision number (1-13). */
  readonly sub: number;
  /** Inclusive lower density bound, lb/ft^3. */
  readonly minDensityPcf: number;
  /** Exclusive upper density bound, lb/ft^3; null = open-ended top band. */
  readonly maxDensityPcf: number | null;
  /** NMFC class for the band (a number: 92.5 is a real class). */
  readonly class: number;
}

/** Effective date of the 13-sub scale (record `effective_date`). */
export const EFFECTIVE_DATE = "2025-07-19";

/** The 13 density bands, mirroring the reference-table rows in order. */
export const NMFC_CLASSES: readonly NmfcClassRow[] = Object.freeze([
  { sub: 1, minDensityPcf: 0, maxDensityPcf: 1, class: 400 },
  { sub: 2, minDensityPcf: 1, maxDensityPcf: 2, class: 300 },
  { sub: 3, minDensityPcf: 2, maxDensityPcf: 4, class: 250 },
  { sub: 4, minDensityPcf: 4, maxDensityPcf: 6, class: 175 },
  { sub: 5, minDensityPcf: 6, maxDensityPcf: 8, class: 125 },
  { sub: 6, minDensityPcf: 8, maxDensityPcf: 10, class: 100 },
  { sub: 7, minDensityPcf: 10, maxDensityPcf: 12, class: 92.5 },
  { sub: 8, minDensityPcf: 12, maxDensityPcf: 15, class: 85 },
  { sub: 9, minDensityPcf: 15, maxDensityPcf: 22.5, class: 70 },
  { sub: 10, minDensityPcf: 22.5, maxDensityPcf: 30, class: 65 },
  { sub: 11, minDensityPcf: 30, maxDensityPcf: 35, class: 60 },
  { sub: 12, minDensityPcf: 35, maxDensityPcf: 50, class: 55 },
  { sub: 13, minDensityPcf: 50, maxDensityPcf: null, class: 50 },
]);

/**
 * The density band containing `pcf` (min <= pcf < max; top band open).
 * Returns null for negative, NaN, or non-finite densities.
 */
export function bandForDensity(pcf: number): NmfcClassRow | null {
  if (!Number.isFinite(pcf) || pcf < 0) return null;
  for (const row of NMFC_CLASSES) {
    if (pcf >= row.minDensityPcf && (row.maxDensityPcf === null || pcf < row.maxDensityPcf)) {
      return row;
    }
  }
  return null;
}

/**
 * Estimated NMFC class for a density in lb/ft^3 (e.g. 9.375 -> 100,
 * 10 -> 92.5, 50 -> 50). Returns null for negative/NaN/non-finite input.
 * Classes are numbers; display them with a "Class " prefix.
 */
export function classForDensity(pcf: number): number | null {
  return bandForDensity(pcf)?.class ?? null;
}
