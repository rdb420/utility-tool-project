// Ported from tests/test_calculators.py: calculator page specs must wire
// cleanly into the calc library. EXPECTED_CALCULATORS is a subset check (plus
// slug uniqueness), so adding a seventh calculator (e.g. calculator.cbm in
// Chunk E) only requires extending this map.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

import { FORMULA_REGISTRY } from "../registry";

interface CalculatorInput {
  symbol: string;
}

interface CalculatorInputGroup {
  inputs: CalculatorInput[];
}

interface CalculatorRecord {
  id: string;
  slug: string;
  formula_ids: string[];
  input_groups: CalculatorInputGroup[];
  result_cards: { symbol: string }[];
  related_tools: string[];
}

interface FormulaRecord {
  id: string;
  inputs: { symbol: string }[];
  outputs: { symbol: string }[];
  examples: { inputs: Record<string, number> }[];
}

const HERE = path.dirname(fileURLToPath(import.meta.url));
// __tests__ -> calc -> lib -> src -> web -> repo root
const REPO_ROOT = path.resolve(HERE, "..", "..", "..", "..", "..");
const DATA_DIR = path.join(REPO_ROOT, "data");

const EXPECTED_CALCULATORS: Record<string, string> = {
  "calculator.reorder_point": "reorder-point-calculator",
  "calculator.safety_stock": "safety-stock-calculator",
  "calculator.eoq": "eoq-calculator",
  "calculator.inventory_turnover": "inventory-turnover-calculator",
  "calculator.days_of_cover": "days-of-inventory-calculator",
  "calculator.carrying_cost": "inventory-carrying-cost-calculator",
  "calculator.cbm": "cbm-calculator",
};

function loadCalculators(): Map<string, CalculatorRecord> {
  const dir = path.join(DATA_DIR, "calculators");
  const records = new Map<string, CalculatorRecord>();
  for (const name of fs.readdirSync(dir).filter((n) => n.endsWith(".json")).sort()) {
    const record = JSON.parse(
      fs.readFileSync(path.join(dir, name), "utf8"),
    ) as CalculatorRecord;
    records.set(record.id, record);
  }
  return records;
}

function loadFormulas(): Map<string, FormulaRecord> {
  const dir = path.join(DATA_DIR, "formulas");
  const records = new Map<string, FormulaRecord>();
  for (const name of fs
    .readdirSync(dir, { recursive: true, encoding: "utf8" })
    .filter((n) => n.endsWith(".json"))
    .sort()) {
    const record = JSON.parse(fs.readFileSync(path.join(dir, name), "utf8")) as FormulaRecord;
    records.set(record.id, record);
  }
  return records;
}

describe("calculator page specs", () => {
  const calculators = loadCalculators();
  const formulas = loadFormulas();

  it("expected MVP calculators are present with their slugs (subset check)", () => {
    for (const [calcId, slug] of Object.entries(EXPECTED_CALCULATORS)) {
      const calc = calculators.get(calcId);
      expect(calc, `missing calculator ${calcId}`).toBeDefined();
      expect(calc?.slug).toBe(slug);
    }
    const expectedSlugs = Object.values(EXPECTED_CALCULATORS);
    expect(new Set(expectedSlugs).size).toBe(expectedSlugs.length);
  });

  it("calculator slugs are unique", () => {
    const slugs = [...calculators.values()].map((c) => c.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("calculator inputs cover referenced formula inputs (chaining rule D4)", () => {
    // Mirrors the corpus validator: an input also counts as covered when it is
    // an OUTPUT of another referenced formula (e.g. chargeable weight's VW is
    // produced by the volumetric-weight formula on the CBM page).
    for (const calc of calculators.values()) {
      const calcSymbols = new Set(
        calc.input_groups.flatMap((group) => group.inputs.map((input) => input.symbol)),
      );
      const chainedOutputs = new Set(
        calc.formula_ids.flatMap(
          (formulaId) => formulas.get(formulaId)?.outputs.map((output) => output.symbol) ?? [],
        ),
      );
      for (const formulaId of calc.formula_ids) {
        const formula = formulas.get(formulaId);
        expect(formula, `${calc.id} references unknown formula ${formulaId}`).toBeDefined();
        const missing = formula!.inputs
          .map((input) => input.symbol)
          .filter((symbol) => !calcSymbols.has(symbol) && !chainedOutputs.has(symbol));
        expect(
          missing,
          `${calc.id} missing inputs ${missing.join(", ")} for ${formulaId}`,
        ).toEqual([]);
      }
    }
  });

  it("calculator results are produced by the calc library", () => {
    // End-to-end: run every referenced formula in record order, seeding the
    // input pool with the union of each formula's first worked example and
    // chaining raw outputs (exactly how the island computes), then check that
    // a value exists for every result card the page promises to show.
    for (const calc of calculators.values()) {
      const pool: Record<string, number> = {};
      for (const formulaId of calc.formula_ids) {
        Object.assign(pool, formulas.get(formulaId)!.examples[0].inputs);
      }
      for (const formulaId of calc.formula_ids) {
        const entry = FORMULA_REGISTRY[formulaId];
        expect(entry, `no calc function registered for ${formulaId}`).toBeDefined();
        Object.assign(pool, entry.compute(pool));
      }
      for (const card of calc.result_cards) {
        expect(
          card.symbol in pool,
          `${calc.id} result_card '${card.symbol}' not produced by ${calc.formula_ids.join(", ")}`,
        ).toBe(true);
      }
    }
  });

  it("related tools form a connected cluster", () => {
    const ids = new Set(calculators.keys());
    for (const calc of calculators.values()) {
      expect(calc.related_tools.length, `${calc.id} has no related tools`).toBeGreaterThan(0);
      for (const related of calc.related_tools) {
        expect(ids.has(related), `${calc.id} links unknown tool ${related}`).toBe(true);
        expect(related, `${calc.id} links to itself`).not.toBe(calc.id);
      }
    }
  });
});
