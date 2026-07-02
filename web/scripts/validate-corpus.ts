/**
 * Validate the structured corpus records under ../data against ../schemas.
 *
 * CLI wrapper around src/lib/corpus/validate.ts with output identical to the
 * Python reference (scripts/validate_corpus.py main()):
 *
 *   OK: {checked} corpus record(s) valid.                       (exit 0)
 *   FAILED: {n} problem(s) across {checked} record(s):          (exit 1)
 *     - {error}
 *
 * Wired into `npm run validate` (and prebuild).
 */

import { validateCorpus } from "../src/lib/corpus/validate";

const report = validateCorpus();

if (report.ok) {
  console.log(`OK: ${report.checked} corpus record(s) valid.`);
  process.exit(0);
}

console.log(
  `FAILED: ${report.errors.length} problem(s) across ${report.checked} record(s):`,
);
for (const error of report.errors) {
  console.log(`  - ${error}`);
}
process.exit(1);
