/**
 * Pure freight/dimensional-weight calculations (new in the TS port; consumed
 * by the CBM calculator page).
 *
 * Guards mirror the inventory library: dimensions and quantities must be
 * non-negative; divisors and container volumes must be positive. No rounding
 * inside — carrier-specific rounding belongs to the UI layer.
 */

import { requireNonNegative, requirePositive } from "./errors";

/** CBM (m^3) = L * W * H * Q / 1e6 for centimetre dimensions. */
export function cbmFromCm(
  lengthCm: number,
  widthCm: number,
  heightCm: number,
  quantity: number,
): number {
  const length = requireNonNegative("length_cm", lengthCm);
  const width = requireNonNegative("width_cm", widthCm);
  const height = requireNonNegative("height_cm", heightCm);
  const qty = requireNonNegative("quantity", quantity);
  return (length * width * height * qty) / 1_000_000;
}

/** Volumetric weight (kg) = volume (cm^3) / divisor (cm^3 per kg, e.g. 6000). */
export function volumetricWeightKg(volumeCm3: number, divisorCm3PerKg: number): number {
  const volume = requireNonNegative("volume_cm3", volumeCm3);
  const divisor = requirePositive("divisor_cm3_per_kg", divisorCm3PerKg);
  return volume / divisor;
}

/** Volumetric weight (lb) = volume (in^3) / divisor (in^3 per lb, e.g. 139). */
export function volumetricWeightLb(volumeIn3: number, divisorIn3PerLb: number): number {
  const volume = requireNonNegative("volume_in3", volumeIn3);
  const divisor = requirePositive("divisor_in3_per_lb", divisorIn3PerLb);
  return volume / divisor;
}

/** Chargeable weight = max(actual weight, volumetric weight). */
export function chargeableWeight(actualWeight: number, volumetricWeight: number): number {
  const actual = requireNonNegative("actual_weight", actualWeight);
  const volumetric = requireNonNegative("volumetric_weight", volumetricWeight);
  return Math.max(actual, volumetric);
}

/** Container fill (%) = total shipment volume / container volume * 100. */
export function containerFillPct(totalM3: number, containerM3: number): number {
  const total = requireNonNegative("total_m3", totalM3);
  const container = requirePositive("container_m3", containerM3);
  return (total / container) * 100;
}
