/**
 * Static registry of the committed corpus records under ../data.
 *
 * Records are imported explicitly (not read via fs) so Next.js can bundle
 * them; adding a record file means adding an import here (the records test
 * globs data/ on disk and fails if a file is missing from this registry).
 */

import type {
  CalculatorRecord,
  FormulaRecord,
  ReferenceTableRecord,
} from "./types.gen";

import calculatorCarryingCost from "@data/calculators/carrying_cost.json";
import calculatorCbm from "@data/calculators/cbm.json";
import calculatorDaysOfCover from "@data/calculators/days_of_cover.json";
import calculatorEoq from "@data/calculators/eoq.json";
import calculatorInventoryTurnover from "@data/calculators/inventory_turnover.json";
import calculatorReorderPoint from "@data/calculators/reorder_point.json";
import calculatorSafetyStock from "@data/calculators/safety_stock.json";

import formulaCbmBasic from "@data/formulas/freight/cbm_basic.json";
import formulaChargeableWeightBasic from "@data/formulas/freight/chargeable_weight_basic.json";
import formulaVolumetricWeightDivisor from "@data/formulas/freight/volumetric_weight_divisor.json";
import formulaCarryingCostBasic from "@data/formulas/inventory/carrying_cost_basic.json";
import formulaDaysOfCoverBasic from "@data/formulas/inventory/days_of_cover_basic.json";
import formulaEoqBasic from "@data/formulas/inventory/eoq_basic.json";
import formulaInventoryTurnoverCogs from "@data/formulas/inventory/inventory_turnover_cogs.json";
import formulaReorderPointBasic from "@data/formulas/inventory/reorder_point_basic.json";
import formulaSafetyStockServiceLevel from "@data/formulas/inventory/safety_stock_service_level.json";

import referenceServiceLevelZFactors from "@data/reference_tables/service_level_z_factors.json";
import referenceContainerVolumes from "@data/reference_tables/freight/container_volumes.json";
import referenceDimDivisors from "@data/reference_tables/freight/dimensional_weight_divisors.json";
import referenceNmfcClasses from "@data/reference_tables/freight/nmfc_freight_classes.json";
import referenceParcelGirthLimits from "@data/reference_tables/freight/parcel_girth_limits.json";

/**
 * Single central cast point: JSON module imports are typed by TypeScript as
 * wide literal shapes, so we cast through `unknown` to the schema-generated
 * record types here (and only here). Runtime validity of every record is
 * guaranteed by the corpus validator (`npm run validate`, wired into
 * prebuild) plus the record-driven tests.
 */
const asRecord = <T>(record: unknown): T => record as T;

export const CALCULATORS: readonly CalculatorRecord[] = Object.freeze([
  asRecord<CalculatorRecord>(calculatorCarryingCost),
  asRecord<CalculatorRecord>(calculatorCbm),
  asRecord<CalculatorRecord>(calculatorDaysOfCover),
  asRecord<CalculatorRecord>(calculatorEoq),
  asRecord<CalculatorRecord>(calculatorInventoryTurnover),
  asRecord<CalculatorRecord>(calculatorReorderPoint),
  asRecord<CalculatorRecord>(calculatorSafetyStock),
]);

export const FORMULAS: readonly FormulaRecord[] = Object.freeze([
  asRecord<FormulaRecord>(formulaCbmBasic),
  asRecord<FormulaRecord>(formulaChargeableWeightBasic),
  asRecord<FormulaRecord>(formulaVolumetricWeightDivisor),
  asRecord<FormulaRecord>(formulaCarryingCostBasic),
  asRecord<FormulaRecord>(formulaDaysOfCoverBasic),
  asRecord<FormulaRecord>(formulaEoqBasic),
  asRecord<FormulaRecord>(formulaInventoryTurnoverCogs),
  asRecord<FormulaRecord>(formulaReorderPointBasic),
  asRecord<FormulaRecord>(formulaSafetyStockServiceLevel),
]);

/** Service-level z-factor lookup table (verified, corpus-grounded). */
export const Z_FACTORS: ReferenceTableRecord = asRecord<ReferenceTableRecord>(
  referenceServiceLevelZFactors,
);

/**
 * Freight reference tables. dimensional_weight_divisors is
 * `status: "verified"` against carrier sources (effective 2026-07-02); the
 * rest are `status: "needs_sourcing"` stubs — do not treat their row values
 * as verified.
 */
export const FREIGHT_REFERENCE_TABLES: readonly ReferenceTableRecord[] =
  Object.freeze([
    asRecord<ReferenceTableRecord>(referenceContainerVolumes),
    asRecord<ReferenceTableRecord>(referenceDimDivisors),
    asRecord<ReferenceTableRecord>(referenceNmfcClasses),
    asRecord<ReferenceTableRecord>(referenceParcelGirthLimits),
  ]);

function byId<T extends { id: string }>(
  records: readonly T[],
): Readonly<Record<string, T>> {
  return Object.freeze(
    Object.fromEntries(records.map((record) => [record.id, record])),
  );
}

export const FORMULAS_BY_ID: Readonly<Record<string, FormulaRecord>> =
  byId(FORMULAS);

export const CALCULATORS_BY_ID: Readonly<Record<string, CalculatorRecord>> =
  byId(CALCULATORS);

export type Cluster = "inventory" | "freight" | "pricing";

/** Formula-id prefix → cluster. Unknown prefixes fall back to inventory. */
const CLUSTER_BY_PREFIX: Readonly<Record<string, Cluster>> = Object.freeze({
  inventory: "inventory",
  freight: "freight",
  pricing: "pricing",
});

/** Look a calculator up by its public URL slug. */
export function calculatorBySlug(slug: string): CalculatorRecord | undefined {
  return CALCULATORS.find((calculator) => calculator.slug === slug);
}

/**
 * Cluster (hub) a calculator belongs to, derived from the prefix of its first
 * referenced formula id (plan decision D5 — not stored on the record).
 */
export function clusterOf(calculator: CalculatorRecord): Cluster {
  const prefix = calculator.formula_ids[0].split(".")[0];
  return CLUSTER_BY_PREFIX[prefix] ?? "inventory";
}

/**
 * Resolve `related_tools` ids to calculator records, preserving the order
 * they appear in the record. Unknown ids are dropped (the corpus validator
 * rejects them, so this cannot silently hide bad data in practice).
 */
export function relatedTools(calculator: CalculatorRecord): CalculatorRecord[] {
  return calculator.related_tools
    .map((id) => CALCULATORS_BY_ID[id])
    .filter((record): record is CalculatorRecord => record !== undefined);
}
