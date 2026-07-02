/**
 * Validate structured corpus records against the JSON Schemas in ../schemas.
 *
 * TypeScript port of src/corpus/validation.py — same checks, same error-string
 * structure, same output contract:
 *
 * - Each record validates against its schema (formula / reference_table /
 *   unit / calculator).
 * - Record `id` values are unique across the corpus.
 * - Every citation `source_file` names a real file in
 *   corpus-logistics-supply-chain/.
 * - Calculator integrity: formula_ids resolve, inputs cover the referenced
 *   formulas, result cards are referenced-formula outputs, related_tools
 *   resolve.
 *
 * Known divergence from the Python validator (documented, deliberate):
 *
 * 1. Schema-error message text comes from Ajv rather than Python's
 *    `jsonschema`, so the trailing `{message}` differs in wording (e.g. Ajv
 *    says "must have required property 'id'" where jsonschema says "'id' is a
 *    required property"). The error-string STRUCTURE
 *    (`"{rel}: {location}: {message}"`, location = "/"-joined instance path
 *    segments or "(root)") and the per-record sorted order are preserved.
 * 2. Invalid-JSON messages use JSON.parse's SyntaxError text instead of
 *    json.JSONDecodeError's; the `"{rel}: invalid JSON: {message}"` shape is
 *    identical.
 * 3. Chaining rule (plan decision D4, an extension over the Python
 *    validator): a formula input counts as satisfied if it is an OUTPUT of
 *    another referenced formula, i.e.
 *    `missing = referencedInputs − calcInputs − referencedOutputs`.
 *    This cannot change results for the current records (no referenced
 *    formula output overlaps a missing calculator input today); it exists so
 *    the CBM calculator can chain volumetric weight → chargeable weight.
 *
 * Run via web/scripts/validate-corpus.ts (`npm run validate`).
 */

import { readdirSync, readFileSync, existsSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import Ajv2020, { type ValidateFunction } from "ajv/dist/2020";

const MODULE_DIR = path.dirname(fileURLToPath(import.meta.url));
// web/src/lib/corpus → repo root is four levels up.
const REPO_ROOT = path.resolve(MODULE_DIR, "..", "..", "..", "..");

export const DEFAULT_SCHEMAS_DIR = path.join(REPO_ROOT, "schemas");
export const DEFAULT_DATA_DIR = path.join(REPO_ROOT, "data");
export const DEFAULT_CORPUS_DIR = path.join(
  REPO_ROOT,
  "corpus-logistics-supply-chain",
);

/** glob under data/ -> schema file name (mirrors RECORD_KINDS in validation.py). */
const RECORD_KINDS: ReadonlyArray<readonly [pattern: string, schema: string]> = [
  ["formulas/**/*.json", "formula.schema.json"],
  ["reference_tables/**/*.json", "reference_table.schema.json"],
  ["units/*.json", "unit.schema.json"],
  ["calculators/*.json", "calculator.schema.json"],
];

export interface ValidationReport {
  errors: string[];
  checked: number;
  ok: boolean;
}

export interface ValidateCorpusOptions {
  dataDir?: string;
  schemasDir?: string;
  corpusDir?: string;
  checkCitationFiles?: boolean;
}

type JsonRecord = Record<string, unknown>;

interface Citation {
  source_file?: unknown;
}

function isObject(value: unknown): value is JsonRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/**
 * Resolve `<kindDir>/<glob>` under dataDir without a glob dependency.
 * Supports exactly the two shapes RECORD_KINDS uses:
 *   "dir/*.json"     — files directly in dir
 *   "dir/**\/*.json" — files anywhere under dir (recursive; like Python's
 *                      `Path.glob`, `**` also matches zero directories)
 */
function filesForPattern(dataDir: string, pattern: string): string[] {
  const recursive = pattern.includes("**/");
  const dir = path.join(dataDir, pattern.split("/")[0]);
  if (!existsSync(dir) || !statSync(dir).isDirectory()) return [];

  const found: string[] = [];
  const walk = (current: string): void => {
    for (const entry of readdirSync(current, { withFileTypes: true })) {
      const full = path.join(current, entry.name);
      if (entry.isDirectory()) {
        if (recursive) walk(full);
      } else if (entry.isFile() && entry.name.endsWith(".json")) {
        found.push(full);
      }
    }
  };
  walk(dir);

  // Match Python's sorted(Path.glob(...)): paths compare by their segment
  // tuples, not by the raw joined string (so "a/b" sorts before "a.b/c").
  return found.sort((a, b) => {
    const partsA = a.split(path.sep);
    const partsB = b.split(path.sep);
    const length = Math.min(partsA.length, partsB.length);
    for (let index = 0; index < length; index += 1) {
      if (partsA[index] < partsB[index]) return -1;
      if (partsA[index] > partsB[index]) return 1;
    }
    return partsA.length - partsB.length;
  });
}

/** Path shown in error messages: relative to the repo root, forward slashes. */
function relPath(dataDir: string, filePath: string): string {
  return path
    .relative(path.dirname(dataDir), filePath)
    .split(path.sep)
    .join("/");
}

function corpusFiles(corpusDir: string): Set<string> {
  if (!existsSync(corpusDir)) return new Set();
  return new Set(
    readdirSync(corpusDir).filter((name) => name.endsWith(".md")),
  );
}

function iterCitations(record: JsonRecord): Citation[] {
  const citations: Citation[] = [];
  const own = record.citations;
  if (Array.isArray(own)) {
    for (const citation of own) if (isObject(citation)) citations.push(citation);
  }
  const examples = record.examples;
  if (Array.isArray(examples)) {
    for (const example of examples) {
      if (isObject(example) && isObject(example.citation)) {
        citations.push(example.citation);
      }
    }
  }
  return citations;
}

function symbolSet(record: JsonRecord, key: "inputs" | "outputs"): Set<string> {
  const symbols = new Set<string>();
  const items = record[key];
  if (Array.isArray(items)) {
    for (const item of items) {
      if (isObject(item) && typeof item.symbol === "string" && item.symbol) {
        symbols.add(item.symbol);
      }
    }
  }
  return symbols;
}

function calculatorInputSymbols(record: JsonRecord): Set<string> {
  const symbols = new Set<string>();
  const groups = record.input_groups;
  if (Array.isArray(groups)) {
    for (const group of groups) {
      if (!isObject(group) || !Array.isArray(group.inputs)) continue;
      for (const input of group.inputs) {
        if (isObject(input) && typeof input.symbol === "string" && input.symbol) {
          symbols.add(input.symbol);
        }
      }
    }
  }
  return symbols;
}

function checkCalculatorIntegrity(
  rel: string,
  calculator: JsonRecord,
  formulasById: Map<string, JsonRecord>,
  calculatorIds: Set<string>,
  errors: string[],
): void {
  const referencedInputs = new Set<string>();
  const referencedOutputs = new Set<string>();
  const formulaIds = Array.isArray(calculator.formula_ids)
    ? calculator.formula_ids
    : [];
  for (const formulaId of formulaIds) {
    const formula =
      typeof formulaId === "string" ? formulasById.get(formulaId) : undefined;
    if (formula === undefined) {
      errors.push(`${rel}: formula_id not found: ${String(formulaId)}`);
      continue;
    }
    for (const symbol of symbolSet(formula, "inputs")) referencedInputs.add(symbol);
    for (const symbol of symbolSet(formula, "outputs")) referencedOutputs.add(symbol);
  }

  const calcInputs = calculatorInputSymbols(calculator);
  // D4 chaining rule (extension over validation.py — see module docstring):
  // an input is also satisfied when another referenced formula produces it.
  const missingInputs = [...referencedInputs]
    .filter((symbol) => !calcInputs.has(symbol) && !referencedOutputs.has(symbol))
    .sort();
  if (missingInputs.length > 0) {
    errors.push(
      `${rel}: inputs missing for referenced formula(s): ` +
        `[${missingInputs.map((symbol) => `'${symbol}'`).join(", ")}]`,
    );
  }

  const resultCards = Array.isArray(calculator.result_cards)
    ? calculator.result_cards
    : [];
  for (const card of resultCards) {
    if (!isObject(card)) continue;
    const symbol = card.symbol;
    if (
      typeof symbol === "string" &&
      symbol &&
      referencedOutputs.size > 0 &&
      !referencedOutputs.has(symbol)
    ) {
      errors.push(
        `${rel}: result_card symbol '${symbol}' is not a referenced-formula output`,
      );
    }
  }

  const relatedTools = Array.isArray(calculator.related_tools)
    ? calculator.related_tools
    : [];
  for (const related of relatedTools) {
    if (typeof related !== "string" || !calculatorIds.has(related)) {
      errors.push(
        `${rel}: related_tools references unknown calculator: ${String(related)}`,
      );
    }
  }
}

function formatSchemaErrors(
  rel: string,
  validate: ValidateFunction,
): string[] {
  const formatted: string[] = [];
  for (const error of validate.errors ?? []) {
    // Ajv instancePath is "/a/0/b"; Python joins path segments with "/".
    const location =
      error.instancePath.split("/").filter(Boolean).join("/") || "(root)";
    formatted.push(`${rel}: ${location}: ${error.message ?? "invalid"}`);
  }
  // Python sorts a record's schema errors (by the error's string form); we
  // sort the formatted strings — same deterministic intent.
  return formatted.sort();
}

export function validateCorpus(
  options: ValidateCorpusOptions = {},
): ValidationReport {
  const dataDir = options.dataDir ?? DEFAULT_DATA_DIR;
  const schemasDir = options.schemasDir ?? DEFAULT_SCHEMAS_DIR;
  const corpusDir = options.corpusDir ?? DEFAULT_CORPUS_DIR;
  const checkCitationFiles = options.checkCitationFiles ?? true;

  const errors: string[] = [];
  let checked = 0;

  // allErrors: collect every violation per record (Python iterates all
  // jsonschema errors). strictTypes off: the schemas put `minItems` inside
  // if/then branches without repeating `"type": "array"`, which is valid
  // 2020-12 but trips Ajv's strict-mode lint and would pollute CLI output.
  const ajv = new Ajv2020({ allErrors: true, strictTypes: false });
  const knownCorpusFiles = checkCitationFiles
    ? corpusFiles(corpusDir)
    : new Set<string>();
  const seenIds = new Map<string, string>();
  const formulasById = new Map<string, JsonRecord>();
  const calculators: Array<readonly [rel: string, record: JsonRecord]> = [];

  for (const [pattern, schemaName] of RECORD_KINDS) {
    const schema: unknown = JSON.parse(
      readFileSync(path.join(schemasDir, schemaName), "utf-8"),
    );
    const validate = ajv.compile(schema as object);

    for (const filePath of filesForPattern(dataDir, pattern)) {
      checked += 1;
      const rel = relPath(dataDir, filePath);

      let record: JsonRecord;
      try {
        const parsed: unknown = JSON.parse(readFileSync(filePath, "utf-8"));
        record = isObject(parsed) ? parsed : {};
        if (!isObject(parsed)) {
          // Non-object JSON still goes through schema validation below.
          validate(parsed);
          errors.push(...formatSchemaErrors(rel, validate));
          continue;
        }
      } catch (error) {
        errors.push(`${rel}: invalid JSON: ${(error as Error).message}`);
        continue;
      }

      if (!validate(record)) {
        errors.push(...formatSchemaErrors(rel, validate));
      }

      const recordId = record.id;
      if (typeof recordId === "string") {
        const existing = seenIds.get(recordId);
        if (existing !== undefined) {
          errors.push(`${rel}: duplicate id '${recordId}' (also in ${existing})`);
        } else {
          seenIds.set(recordId, rel);
        }
      }

      if (schemaName === "formula.schema.json" && typeof recordId === "string") {
        formulasById.set(recordId, record);
      }
      if (schemaName === "calculator.schema.json") {
        calculators.push([rel, record]);
      }

      if (checkCitationFiles && knownCorpusFiles.size > 0) {
        for (const citation of iterCitations(record)) {
          const sourceFile = citation.source_file;
          if (
            typeof sourceFile === "string" &&
            sourceFile &&
            !knownCorpusFiles.has(sourceFile)
          ) {
            errors.push(
              `${rel}: citation source_file not found in corpus: ${sourceFile}`,
            );
          }
        }
      }
    }
  }

  const calculatorIds = new Set<string>();
  for (const [, record] of calculators) {
    if (typeof record.id === "string") calculatorIds.add(record.id);
  }
  for (const [rel, record] of calculators) {
    checkCalculatorIntegrity(rel, record, formulasById, calculatorIds, errors);
  }

  return { errors, checked, ok: errors.length === 0 };
}
