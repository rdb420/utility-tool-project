/**
 * Guards the static record registry (records.ts) against drift from data/:
 * every JSON file on disk must be imported and registered, and the lookup
 * helpers must behave.
 */

import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

import {
  CALCULATORS,
  CALCULATORS_BY_ID,
  FORMULAS,
  FORMULAS_BY_ID,
  FREIGHT_REFERENCE_TABLES,
  Z_FACTORS,
  calculatorBySlug,
  clusterOf,
  relatedTools,
} from "../records";

const TEST_DIR = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.resolve(TEST_DIR, "..", "..", "..", "..", "..", "data");

/** Recursively collect .json files under dir (skips gitignored data dirs). */
function jsonFilesUnder(dir: string): string[] {
  const found: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      found.push(...jsonFilesUnder(full));
    } else if (entry.isFile() && entry.name.endsWith(".json")) {
      found.push(full);
    }
  }
  return found.sort();
}

function idsOnDisk(subdir: string): string[] {
  return jsonFilesUnder(path.join(DATA_DIR, subdir))
    .map((file) => {
      const record: unknown = JSON.parse(readFileSync(file, "utf-8"));
      return (record as { id: string }).id;
    })
    .sort();
}

describe("record registry covers every file in data/", () => {
  it("registers every calculator record", () => {
    const onDisk = idsOnDisk("calculators");
    const registered = CALCULATORS.map((record) => record.id).sort();
    expect(registered).toEqual(onDisk);
  });

  it("registers every formula record", () => {
    const onDisk = idsOnDisk("formulas");
    const registered = FORMULAS.map((record) => record.id).sort();
    expect(registered).toEqual(onDisk);
  });

  it("registers every reference table record", () => {
    const onDisk = idsOnDisk("reference_tables");
    const registered = [
      Z_FACTORS.id,
      ...FREIGHT_REFERENCE_TABLES.map((record) => record.id),
    ].sort();
    expect(registered).toEqual(onDisk);
  });
});

describe("lookup maps", () => {
  it("FORMULAS_BY_ID and CALCULATORS_BY_ID cover every record", () => {
    expect(Object.keys(FORMULAS_BY_ID)).toHaveLength(FORMULAS.length);
    for (const formula of FORMULAS) {
      expect(FORMULAS_BY_ID[formula.id]).toBe(formula);
    }
    expect(Object.keys(CALCULATORS_BY_ID)).toHaveLength(CALCULATORS.length);
    for (const calculator of CALCULATORS) {
      expect(CALCULATORS_BY_ID[calculator.id]).toBe(calculator);
    }
  });

  it("exports are frozen", () => {
    expect(Object.isFrozen(CALCULATORS)).toBe(true);
    expect(Object.isFrozen(FORMULAS)).toBe(true);
    expect(Object.isFrozen(FREIGHT_REFERENCE_TABLES)).toBe(true);
    expect(Object.isFrozen(FORMULAS_BY_ID)).toBe(true);
    expect(Object.isFrozen(CALCULATORS_BY_ID)).toBe(true);
  });
});

describe("helpers", () => {
  it("calculatorBySlug round-trips every calculator", () => {
    for (const calculator of CALCULATORS) {
      expect(calculatorBySlug(calculator.slug)).toBe(calculator);
    }
    expect(calculatorBySlug("no-such-slug")).toBeUndefined();
  });

  it("slugs are unique", () => {
    const slugs = CALCULATORS.map((calculator) => calculator.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("clusterOf follows the formula-id prefix (10 inventory, 9 freight, 5 pricing)", () => {
    expect(CALCULATORS).toHaveLength(24);
    const counts: Record<string, number> = { inventory: 0, freight: 0, pricing: 0 };
    for (const calculator of CALCULATORS) {
      const prefix = calculator.formula_ids[0].split(".")[0];
      expect(clusterOf(calculator)).toBe(prefix);
      counts[prefix] += 1;
    }
    expect(counts).toEqual({ inventory: 10, freight: 9, pricing: 5 });
  });

  it("relatedTools resolves non-empty, in record order", () => {
    for (const calculator of CALCULATORS) {
      const resolved = relatedTools(calculator);
      expect(resolved.length).toBeGreaterThan(0);
      expect(resolved.map((record) => record.id)).toEqual(
        calculator.related_tools,
      );
    }
  });

  it("every referenced formula id resolves", () => {
    for (const calculator of CALCULATORS) {
      for (const formulaId of calculator.formula_ids) {
        expect(FORMULAS_BY_ID[formulaId], formulaId).toBeDefined();
      }
    }
  });
});
