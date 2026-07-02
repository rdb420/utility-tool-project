/**
 * Corpus validator tests: real-corpus parity plus negative-path fixtures.
 *
 * Fixtures are written to fresh temp directories (never the real data/), and
 * point schemasDir at the real ../schemas so fixture records exercise the
 * exact production schemas.
 */

import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { afterEach, describe, expect, it } from "vitest";

import { validateCorpus } from "../validate";

const TEST_DIR = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(TEST_DIR, "..", "..", "..", "..", "..");
const SCHEMAS_DIR = path.join(REPO_ROOT, "schemas");

// ---------------------------------------------------------------------------
// Fixture helpers
// ---------------------------------------------------------------------------

const tempDirs: string[] = [];

afterEach(() => {
  while (tempDirs.length > 0) {
    rmSync(tempDirs.pop()!, { recursive: true, force: true });
  }
});

interface Fixture {
  dataDir: string;
  corpusDir: string;
  /** Write a JSON record at data/<relative>, creating parent dirs. */
  write(relative: string, record: unknown): void;
  /** Write raw text at data/<relative> (for invalid-JSON cases). */
  writeRaw(relative: string, text: string): void;
  /** Create a corpus .md file so citation checking is active. */
  addCorpusFile(name: string): void;
  run(): ReturnType<typeof validateCorpus>;
}

function fixture(): Fixture {
  const root = mkdtempSync(path.join(os.tmpdir(), "corpus-validate-"));
  tempDirs.push(root);
  const dataDir = path.join(root, "data");
  const corpusDir = path.join(root, "corpus-logistics-supply-chain");
  mkdirSync(dataDir, { recursive: true });
  mkdirSync(corpusDir, { recursive: true });

  const writeRaw = (relative: string, text: string): void => {
    const file = path.join(dataDir, relative);
    mkdirSync(path.dirname(file), { recursive: true });
    writeFileSync(file, text, "utf-8");
  };

  return {
    dataDir,
    corpusDir,
    write: (relative, record) =>
      writeRaw(relative, JSON.stringify(record, null, 2)),
    writeRaw,
    addCorpusFile: (name) =>
      writeFileSync(path.join(corpusDir, name), "# stub\n", "utf-8"),
    run: () =>
      validateCorpus({ dataDir, schemasDir: SCHEMAS_DIR, corpusDir }),
  };
}

/** Minimal schema-valid formula record. */
function formulaRecord(overrides: Record<string, unknown> = {}) {
  return {
    id: "inventory.test.basic",
    name: "Test formula",
    category: "inventory",
    description: "Test.",
    inputs: [{ name: "Demand", symbol: "D", type: "number", unit: "units" }],
    outputs: [{ name: "Result", symbol: "R", unit: "units" }],
    expression: "R = D",
    assumptions: [],
    limitations: [],
    examples: [{ inputs: { D: 1 }, expected: { R: 1 } }],
    grounding: "concept",
    citations: [],
    disclaimer_level: "none",
    ...overrides,
  };
}

/** Minimal schema-valid calculator record. */
function calculatorRecord(overrides: Record<string, unknown> = {}) {
  return {
    id: "calculator.test",
    slug: "test-calculator",
    title: "Test Calculator",
    primary_keyword: "test calculator",
    formula_ids: ["inventory.test.basic"],
    input_groups: [
      {
        label: "Inputs",
        inputs: [{ symbol: "D", label: "Demand", unit: "units" }],
      },
    ],
    result_cards: [{ symbol: "R", label: "Result", unit: "units" }],
    copy_blocks: {
      intro: "Intro.",
      faq: [{ q: "Q?", a: "A." }],
    },
    related_tools: [],
    schema_types: ["WebApplication"],
    ...overrides,
  };
}

// ---------------------------------------------------------------------------
// Real corpus
// ---------------------------------------------------------------------------

describe("real corpus", () => {
  it("validates all 21 records with no errors", () => {
    const report = validateCorpus();
    expect(report.errors).toEqual([]);
    expect(report.checked).toBe(21);
    expect(report.ok).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// Negative fixtures
// ---------------------------------------------------------------------------

describe("schema validation", () => {
  it("reports schema violations as '{rel}: {location}: {message}'", () => {
    const fx = fixture();
    const bad = formulaRecord();
    delete (bad as Record<string, unknown>).expression; // missing required
    (bad as Record<string, unknown>).category = "nonsense"; // bad enum
    fx.write("formulas/inventory/bad.json", bad);

    const report = fx.run();
    expect(report.ok).toBe(false);
    expect(report.checked).toBe(1);
    expect(
      report.errors.some(
        (error) =>
          error.startsWith("data/formulas/inventory/bad.json: (root): ") &&
          error.includes("expression"),
      ),
    ).toBe(true);
    expect(
      report.errors.some((error) =>
        error.startsWith("data/formulas/inventory/bad.json: category: "),
      ),
    ).toBe(true);
  });

  it("reports invalid JSON", () => {
    const fx = fixture();
    fx.writeRaw("formulas/broken.json", "{ not json");

    const report = fx.run();
    expect(report.checked).toBe(1);
    expect(report.errors).toHaveLength(1);
    expect(report.errors[0]).toMatch(
      /^data\/formulas\/broken\.json: invalid JSON: /,
    );
  });
});

describe("duplicate ids", () => {
  it("flags the same id used by two records", () => {
    const fx = fixture();
    fx.write("formulas/a.json", formulaRecord({ id: "inventory.dup.basic" }));
    fx.write("formulas/b.json", formulaRecord({ id: "inventory.dup.basic" }));

    const report = fx.run();
    expect(report.errors).toContain(
      "data/formulas/b.json: duplicate id 'inventory.dup.basic' " +
        "(also in data/formulas/a.json)",
    );
  });
});

describe("calculator integrity", () => {
  it("flags a dangling formula_id", () => {
    const fx = fixture();
    fx.write(
      "calculators/test.json",
      calculatorRecord({ formula_ids: ["inventory.missing.formula"] }),
    );

    const report = fx.run();
    expect(report.errors).toContain(
      "data/calculators/test.json: formula_id not found: inventory.missing.formula",
    );
  });

  it("flags calculator inputs that do not cover the formula inputs", () => {
    const fx = fixture();
    fx.write(
      "formulas/test.json",
      formulaRecord({
        inputs: [
          { name: "Demand", symbol: "D", type: "number", unit: "units" },
          { name: "Lead time", symbol: "LT", type: "number", unit: "days" },
        ],
      }),
    );
    fx.write("calculators/test.json", calculatorRecord()); // only has D

    const report = fx.run();
    expect(report.errors).toContain(
      "data/calculators/test.json: inputs missing for referenced formula(s): ['LT']",
    );
  });

  it("flags a result_card symbol that is not a referenced-formula output", () => {
    const fx = fixture();
    fx.write("formulas/test.json", formulaRecord());
    fx.write(
      "calculators/test.json",
      calculatorRecord({
        result_cards: [{ symbol: "X", label: "Wrong", unit: "units" }],
      }),
    );

    const report = fx.run();
    expect(report.errors).toContain(
      "data/calculators/test.json: result_card symbol 'X' is not a " +
        "referenced-formula output",
    );
  });

  it("flags related_tools pointing at unknown calculators", () => {
    const fx = fixture();
    fx.write("formulas/test.json", formulaRecord());
    fx.write(
      "calculators/test.json",
      calculatorRecord({ related_tools: ["calculator.ghost"] }),
    );

    const report = fx.run();
    expect(report.errors).toContain(
      "data/calculators/test.json: related_tools references unknown " +
        "calculator: calculator.ghost",
    );
  });

  it("chaining rule (D4): an input produced by another referenced formula is satisfied", () => {
    const fx = fixture();
    // volumetric-weight-style producer: L -> VW
    fx.write(
      "formulas/producer.json",
      formulaRecord({
        id: "freight.test.producer",
        category: "freight",
        inputs: [{ name: "Length", symbol: "L", type: "number", unit: "cm" }],
        outputs: [{ name: "Volumetric weight", symbol: "VW", unit: "kg" }],
        expression: "VW = f(L)",
      }),
    );
    // chargeable-weight-style consumer: VW, AW -> CW
    fx.write(
      "formulas/consumer.json",
      formulaRecord({
        id: "freight.test.consumer",
        category: "freight",
        inputs: [
          { name: "Volumetric weight", symbol: "VW", type: "number", unit: "kg" },
          { name: "Actual weight", symbol: "AW", type: "number", unit: "kg" },
        ],
        outputs: [{ name: "Chargeable weight", symbol: "CW", unit: "kg" }],
        expression: "CW = max(VW, AW)",
      }),
    );
    // Calculator exposes only L and AW — VW is chained, not a user input.
    fx.write(
      "calculators/test.json",
      calculatorRecord({
        formula_ids: ["freight.test.producer", "freight.test.consumer"],
        input_groups: [
          {
            label: "Shipment",
            inputs: [
              { symbol: "L", label: "Length", unit: "cm" },
              { symbol: "AW", label: "Actual weight", unit: "kg" },
            ],
          },
        ],
        result_cards: [
          { symbol: "VW", label: "Volumetric weight", unit: "kg" },
          { symbol: "CW", label: "Chargeable weight", unit: "kg" },
        ],
      }),
    );

    const report = fx.run();
    expect(report.errors).toEqual([]);
    expect(report.ok).toBe(true);
  });
});

describe("citation files", () => {
  it("flags citations whose source_file is not in the corpus dir", () => {
    const fx = fixture();
    fx.addCorpusFile("real-source.md");
    fx.write(
      "formulas/test.json",
      formulaRecord({
        grounding: "corpus",
        citations: [{ source_file: "ghost-source.md", chunk_index: 3 }],
        examples: [
          {
            inputs: { D: 1 },
            expected: { R: 1 },
            citation: { source_file: "real-source.md", chunk_index: 0 },
          },
        ],
      }),
    );

    const report = fx.run();
    expect(report.errors).toEqual([
      "data/formulas/test.json: citation source_file not found in corpus: ghost-source.md",
    ]);
  });

  it("can be disabled via checkCitationFiles: false", () => {
    const fx = fixture();
    fx.addCorpusFile("real-source.md");
    fx.write(
      "formulas/test.json",
      formulaRecord({
        grounding: "corpus",
        citations: [{ source_file: "ghost-source.md", chunk_index: 3 }],
      }),
    );

    const report = validateCorpus({
      dataDir: fx.dataDir,
      schemasDir: SCHEMAS_DIR,
      corpusDir: fx.corpusDir,
      checkCitationFiles: false,
    });
    expect(report.errors).toEqual([]);
  });
});
