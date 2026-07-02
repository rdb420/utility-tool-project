/**
 * Generate TypeScript record types from the JSON Schemas in ../schemas.
 *
 * Output: web/src/lib/records/types.gen.ts (committed).
 * Run via `npm run typegen`. Regeneration is deterministic: the schemas are
 * processed in a fixed order and json-schema-to-typescript is invoked with
 * pinned options, so the same input always yields byte-identical output.
 */

import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { compile, type JSONSchema } from "json-schema-to-typescript";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(SCRIPT_DIR, "..", "..");
const SCHEMAS_DIR = path.join(REPO_ROOT, "schemas");
const OUT_FILE = path.join(SCRIPT_DIR, "..", "src", "lib", "records", "types.gen.ts");

// Fixed (alphabetical) order for deterministic output. The exported type name
// is forced via the schema `title` so it wins over whatever the file declares.
const SCHEMAS: ReadonlyArray<{ file: string; name: string }> = [
  { file: "calculator.schema.json", name: "CalculatorRecord" },
  { file: "formula.schema.json", name: "FormulaRecord" },
  { file: "reference_table.schema.json", name: "ReferenceTableRecord" },
  { file: "unit.schema.json", name: "UnitRecord" },
];

const HEADER = `/* eslint-disable */
/**
 * generated — do not edit; run \`npm run typegen\` to regenerate.
 *
 * Source: schemas/*.json (JSON Schema Draft 2020-12), compiled by
 * web/scripts/generate-record-types.ts via json-schema-to-typescript.
 *
 * Conditional (if/then) constraints are stripped before type generation —
 * they narrow values, not shapes — and are enforced at runtime by the corpus
 * validator (web/src/lib/corpus/validate.ts).
 */
`;

type MutableSchema = { [key: string]: unknown };

function loadSchema(file: string, name: string): JSONSchema {
  const schema = JSON.parse(
    readFileSync(path.join(SCHEMAS_DIR, file), "utf-8"),
  ) as MutableSchema;
  // Force the top-level interface name (title takes precedence over the
  // `compile` name argument).
  schema.title = name;
  // Drop conditional keywords: json-schema-to-typescript cannot express
  // if/then constraints, and leaving them in produces noisy intersections.
  if (Array.isArray(schema.allOf)) {
    const kept = schema.allOf.filter(
      (entry: unknown) => !(entry && typeof entry === "object" && "if" in entry),
    );
    if (kept.length === 0) delete schema.allOf;
    else schema.allOf = kept;
  }
  return schema as JSONSchema;
}

async function main(): Promise<void> {
  const parts: string[] = [HEADER];
  for (const { file, name } of SCHEMAS) {
    const compiled = await compile(loadSchema(file, name), name, {
      bannerComment: "",
      additionalProperties: false,
      cwd: SCHEMAS_DIR,
    });
    parts.push(compiled.trimEnd() + "\n");
  }
  writeFileSync(OUT_FILE, parts.join("\n"), "utf-8");
  console.log(`wrote ${path.relative(process.cwd(), OUT_FILE)}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
