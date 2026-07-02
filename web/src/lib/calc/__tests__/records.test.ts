// Record-driven parity suite, ported from tests/test_corpus_records.py:
// every worked example in data/formulas/** must be reproduced by the TS calc
// library via FORMULA_REGISTRY.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

import { FORMULA_REGISTRY } from "../registry";

interface FormulaExample {
  inputs: Record<string, number>;
  expected: Record<string, number>;
  tolerance?: number;
}

interface FormulaRecord {
  id: string;
  grounding: string;
  citations?: unknown[];
  examples: FormulaExample[];
}

interface ReferenceTable {
  status?: string;
  grounding?: string;
  effective_date?: string | null;
  source?: unknown;
  sourcing_notes?: unknown;
}

const HERE = path.dirname(fileURLToPath(import.meta.url));
// __tests__ -> calc -> lib -> src -> web -> repo root
const REPO_ROOT = path.resolve(HERE, "..", "..", "..", "..", "..");
const DATA_DIR = path.join(REPO_ROOT, "data");

const EXPECTED_INVENTORY_FORMULAS = [
  "inventory.reorder_point.basic",
  "inventory.safety_stock.service_level",
  "inventory.eoq.basic",
  "inventory.turnover.cogs",
  "inventory.days_of_cover.basic",
  "inventory.carrying_cost.basic",
  "inventory.stockout_cost.basic",
  "inventory.safety_stock.lead_time_variability",
  "inventory.periodic_review.order_up_to",
  "inventory.abc.share",
];

function jsonFilesUnder(dir: string): string[] {
  return fs
    .readdirSync(dir, { recursive: true, encoding: "utf8" })
    .filter((name) => name.endsWith(".json"))
    .map((name) => path.join(dir, name))
    .sort();
}

function loadFormulas(): Map<string, FormulaRecord> {
  const records = new Map<string, FormulaRecord>();
  for (const file of jsonFilesUnder(path.join(DATA_DIR, "formulas"))) {
    const record = JSON.parse(fs.readFileSync(file, "utf8")) as FormulaRecord;
    records.set(record.id, record);
  }
  return records;
}

describe("formula records", () => {
  const formulas = loadFormulas();

  it("finds formula records under data/formulas", () => {
    expect(formulas.size).toBeGreaterThanOrEqual(6);
  });

  it("has the ten expected inventory formulas", () => {
    for (const id of EXPECTED_INVENTORY_FORMULAS) {
      expect(formulas.has(id), `missing formula record: ${id}`).toBe(true);
    }
  });

  it("every corpus-grounded formula has citations", () => {
    for (const record of formulas.values()) {
      if (record.grounding === "corpus") {
        expect(
          Array.isArray(record.citations) && record.citations.length > 0,
          `${record.id} is corpus-grounded but has no citations`,
        ).toBe(true);
      }
    }
  });

  it("every worked example is reproduced by the calc library", () => {
    for (const [recordId, record] of formulas) {
      const entry = FORMULA_REGISTRY[recordId];
      expect(entry, `no calc function registered for ${recordId}`).toBeDefined();
      for (const example of record.examples) {
        const computed = entry.compute(example.inputs);
        const tolerance = example.tolerance ?? 1e-6;
        for (const [symbol, expected] of Object.entries(example.expected)) {
          const actual = computed[symbol];
          expect(
            actual !== undefined && Math.abs(actual - expected) <= tolerance,
            `${recordId} example ${JSON.stringify(example.inputs)}: ` +
              `${symbol} computed ${actual}, record says ${expected}`,
          ).toBe(true);
        }
      }
    }
  });
});

describe("freight reference tables", () => {
  const freightDir = path.join(DATA_DIR, "reference_tables", "freight");
  const files = fs
    .readdirSync(freightDir)
    .filter((name) => name.endsWith(".json"))
    .map((name) => path.join(freightDir, name));

  it("has freight reference-table stubs", () => {
    expect(files.length).toBeGreaterThan(0);
  });

  // dimensional_weight_divisors was verified against carrier sources on
  // 2026-07-02 and nmfc_freight_classes against NMFTA's 13-sub FCDC scale
  // (both via corpus-logistics-supply-chain/sourced-reference-data-2026-07-02.md);
  // the other freight tables remain needs_sourcing placeholders.
  const VERIFIED_FREIGHT_TABLES = new Set([
    "dimensional_weight_divisors.json",
    "nmfc_freight_classes.json",
  ]);

  it.each([...VERIFIED_FREIGHT_TABLES])("%s is verified with an effective date", (tableName) => {
    const file = files.find((candidate) => path.basename(candidate) === tableName);
    expect(file, `${tableName} should exist`).toBeDefined();
    const table = JSON.parse(fs.readFileSync(file!, "utf8")) as ReferenceTable;
    expect(table.status).toBe("verified");
    expect(table.effective_date, "verified table needs a non-null effective_date").toBeTruthy();
  });

  it("every other freight table is still flagged needs_sourcing", () => {
    for (const file of files) {
      const name = path.basename(file);
      if (VERIFIED_FREIGHT_TABLES.has(name)) continue;
      const table = JSON.parse(fs.readFileSync(file, "utf8")) as ReferenceTable;
      expect(table.status, `${name} should be needs_sourcing`).toBe("needs_sourcing");
    }
  });

  it("every freight table is externally grounded with a named source", () => {
    for (const file of files) {
      const table = JSON.parse(fs.readFileSync(file, "utf8")) as ReferenceTable;
      const name = path.basename(file);
      expect(table.grounding, `${name} should be externally grounded`).toBe("external");
      expect(table.source, `${name} should name a source`).toBeTruthy();
      expect(table.sourcing_notes, `${name} should carry sourcing notes`).toBeTruthy();
    }
  });
});
