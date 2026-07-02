/**
 * The mode/container presets baked into the island must stay in lockstep
 * with the reference-table records under data/reference_tables/freight/
 * (dimensional_weight_divisors is verified as of 2026-07-02; container
 * volumes remain a `needs_sourcing` stub labelled nominal estimates).
 */

import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

import { CONTAINERS, KG_PER_LB, MODES } from "../freightModes";

const HERE = path.dirname(fileURLToPath(import.meta.url));
// __tests__ -> cbm -> components -> src -> web -> repo root
const REPO_ROOT = path.resolve(HERE, "..", "..", "..", "..", "..");
const FREIGHT_TABLES_DIR = path.join(REPO_ROOT, "data", "reference_tables", "freight");

interface DivisorRow {
  carrier: string;
  service: string;
  divisor: number;
  unit: string;
}

interface ContainerRow {
  key: string;
  container: string;
  volume_m3: number;
}

function loadRows<T>(file: string): T[] {
  const record = JSON.parse(
    readFileSync(path.join(FREIGHT_TABLES_DIR, file), "utf-8"),
  ) as { rows: T[] };
  return record.rows;
}

describe("MODES vs dimensional_weight_divisors.json", () => {
  const rows = loadRows<DivisorRow>("dimensional_weight_divisors.json");

  it("every divisor-bearing mode matches a reference-table row (divisor + unit system)", () => {
    for (const [key, mode] of Object.entries(MODES)) {
      if (mode.divisor === null || key === "custom") continue;
      const expectedUnit = mode.system === "metric" ? "cm^3/kg" : "in^3/lb";
      const row = rows.find(
        (candidate) =>
          candidate.divisor === mode.divisor && candidate.unit === expectedUnit,
      );
      expect(
        row,
        `mode '${key}' (divisor ${mode.divisor} ${expectedUnit}) has no matching row`,
      ).toBeDefined();
    }
  });

  it("pins the four preset divisors", () => {
    expect(MODES.air.divisor).toBe(6000);
    expect(MODES.express.divisor).toBe(5000);
    expect(MODES.usparcel.divisor).toBe(139);
    expect(MODES.usps.divisor).toBe(166);
    expect(MODES.sea.divisor).toBeNull();
  });
});

describe("CONTAINERS vs container_volumes.json", () => {
  const rows = loadRows<ContainerRow>("container_volumes.json");

  it("every container preset matches its reference-table row by key", () => {
    for (const [key, preset] of Object.entries(CONTAINERS)) {
      const row = rows.find((candidate) => candidate.key === key);
      expect(row, `container '${key}' has no matching row`).toBeDefined();
      expect(preset.volumeM3).toBe(row!.volume_m3);
    }
  });

  it("covers every reference-table row (no orphan rows)", () => {
    expect(Object.keys(CONTAINERS).sort()).toEqual(
      rows.map((row) => row.key).sort(),
    );
  });
});

describe("KG_PER_LB", () => {
  it("comes from the calc library's unit table", () => {
    expect(KG_PER_LB).toBe(0.45359237);
  });
});
