/**
 * Transport-mode and container presets for the CBM calculator island.
 *
 * The divisor and volume values mirror the reference-table records under
 * data/reference_tables/freight/. dimensional_weight_divisors.json is
 * `status: "verified"` against carrier sources (effective 2026-07-02), so the
 * divisor presets are labelled carrier-published figures with a confirm-with-
 * your-carrier caveat; container_volumes.json remains `needs_sourcing`, so
 * container presets stay nominal estimates. A Vitest suite asserts this file
 * and the records stay in lockstep.
 */

import { convert } from "@/lib/calc/units";

export type UnitSystem = "metric" | "imperial" | "sea";

export interface FreightMode {
  /**
   * DIM divisor: cm^3/kg for metric modes, in^3/lb for imperial modes,
   * null for sea (rated per revenue tonne, not by divisor).
   */
  readonly divisor: number | null;
  readonly system: UnitSystem;
  /** Short label used in derived rows and copied text, e.g. "Air, ÷6000". */
  readonly name: string;
  /** Option label for the mode <select>. */
  readonly label: string;
}

export const MODES = {
  air: {
    divisor: 6000,
    system: "metric",
    name: "Air, ÷6000",
    label: "Air freight (IATA), divisor 6000, kg",
  },
  express: {
    divisor: 5000,
    system: "metric",
    name: "Express, ÷5000",
    label: "Express courier, divisor 5000, kg",
  },
  usparcel: {
    divisor: 139,
    system: "imperial",
    name: "US parcel, ÷139",
    label: "US parcel UPS/FedEx, divisor 139, lb",
  },
  usps: {
    divisor: 166,
    system: "imperial",
    name: "USPS, ÷166",
    label: "USPS, divisor 166, lb",
  },
  sea: {
    divisor: null,
    system: "sea",
    name: "Sea / LCL",
    label: "Sea / LCL, per CBM or tonne",
  },
  custom: {
    divisor: 6000,
    system: "metric",
    name: "Custom",
    label: "Custom divisor",
  },
} as const satisfies Record<string, FreightMode>;

export type ModeKey = keyof typeof MODES;

export const MODE_KEYS = Object.keys(MODES) as ModeKey[];

export interface ContainerPreset {
  /** Short display name, e.g. "40ft DV". */
  readonly name: string;
  /** Nominal internal volume in m^3 (needs_sourcing estimate). */
  readonly volumeM3: number;
}

/** Values from data/reference_tables/freight/container_volumes.json rows. */
export const CONTAINERS = {
  c20: { name: "20ft DV", volumeM3: 33 },
  c40: { name: "40ft DV", volumeM3: 67 },
  hc40: { name: "40ft HC", volumeM3: 76 },
  t53: { name: "53ft truck", volumeM3: 114 },
} as const satisfies Record<string, ContainerPreset>;

export type ContainerKey = keyof typeof CONTAINERS;

export const CONTAINER_KEYS = Object.keys(CONTAINERS) as ContainerKey[];

/**
 * kg per lb, derived from the calc library's unit table (0.45359237) rather
 * than redefined here — units.ts is the single source of conversion factors.
 */
export const KG_PER_LB = convert(1, "lb", "kg");
