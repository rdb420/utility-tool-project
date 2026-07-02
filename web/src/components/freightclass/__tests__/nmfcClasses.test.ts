/**
 * The NMFC density scale baked into the island must stay in lockstep with
 * data/reference_tables/freight/nmfc_freight_classes.json (13-sub FCDC
 * scale, status: verified, effective 2025-07-19) — every row, every break,
 * every class, plus the effective date. Then the band semantics: min <= d
 * < max with an open-ended top band, null for negative/NaN/non-finite.
 */

import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

import {
  EFFECTIVE_DATE,
  NMFC_CLASSES,
  bandForDensity,
  classForDensity,
} from "../nmfcClasses";

const HERE = path.dirname(fileURLToPath(import.meta.url));
// __tests__ -> freightclass -> components -> src -> web -> repo root
const REPO_ROOT = path.resolve(HERE, "..", "..", "..", "..", "..");
const RECORD_PATH = path.join(
  REPO_ROOT,
  "data",
  "reference_tables",
  "freight",
  "nmfc_freight_classes.json",
);

interface NmfcRecordRow {
  sub: number;
  min_density_pcf: number;
  max_density_pcf: number | null;
  class: number;
  verified: boolean;
}

const record = JSON.parse(readFileSync(RECORD_PATH, "utf-8")) as {
  effective_date: string;
  status: string;
  rows: NmfcRecordRow[];
};

describe("NMFC_CLASSES vs nmfc_freight_classes.json (lockstep)", () => {
  it("has exactly the reference table's row count (13 subs)", () => {
    expect(record.rows).toHaveLength(13);
    expect(NMFC_CLASSES).toHaveLength(record.rows.length);
  });

  it("matches every row exactly: sub, density breaks, and class, in order", () => {
    record.rows.forEach((row, index) => {
      const local = NMFC_CLASSES[index];
      expect(local.sub, `row ${index} sub`).toBe(row.sub);
      expect(local.minDensityPcf, `sub ${row.sub} min`).toBe(row.min_density_pcf);
      expect(local.maxDensityPcf, `sub ${row.sub} max`).toBe(row.max_density_pcf);
      expect(local.class, `sub ${row.sub} class`).toBe(row.class);
    });
  });

  it("mirrors the record's effective date", () => {
    expect(EFFECTIVE_DATE).toBe(record.effective_date);
  });

  it("only bakes in a verified table (every row verified, record verified)", () => {
    expect(record.status).toBe("verified");
    for (const row of record.rows) expect(row.verified).toBe(true);
  });

  it("bands are contiguous from 0 with a single open-ended top band", () => {
    expect(NMFC_CLASSES[0].minDensityPcf).toBe(0);
    for (let i = 1; i < NMFC_CLASSES.length; i += 1) {
      expect(NMFC_CLASSES[i].minDensityPcf).toBe(
        NMFC_CLASSES[i - 1].maxDensityPcf,
      );
    }
    expect(NMFC_CLASSES[NMFC_CLASSES.length - 1].maxDensityPcf).toBeNull();
  });
});

describe("classForDensity boundary semantics (min <= d < max)", () => {
  it("every band's lower bound maps to that band's class (all 13 bands)", () => {
    for (const band of NMFC_CLASSES) {
      expect(
        classForDensity(band.minDensityPcf),
        `d=${band.minDensityPcf}`,
      ).toBe(band.class);
    }
  });

  it("just below every upper bound still maps to the band (all bounded bands)", () => {
    for (const band of NMFC_CLASSES) {
      if (band.maxDensityPcf === null) continue;
      expect(
        classForDensity(band.maxDensityPcf - 1e-9),
        `d just under ${band.maxDensityPcf}`,
      ).toBe(band.class);
    }
  });

  it("boundary densities fall in the HIGHER band (exclusive upper bound)", () => {
    expect(classForDensity(1)).toBe(300); // not 400
    expect(classForDensity(2)).toBe(250);
    expect(classForDensity(4)).toBe(175);
    expect(classForDensity(6)).toBe(125);
    expect(classForDensity(8)).toBe(100);
    expect(classForDensity(10)).toBe(92.5); // not 100
    expect(classForDensity(12)).toBe(85);
    expect(classForDensity(15)).toBe(70);
    expect(classForDensity(22.5)).toBe(65);
    expect(classForDensity(30)).toBe(60);
    expect(classForDensity(35)).toBe(55);
    expect(classForDensity(50)).toBe(50); // top band opens at 50
  });

  it("interior densities: 0.5 -> 400, 9.375 -> 100, 1000 -> 50 (open top)", () => {
    expect(classForDensity(0)).toBe(400);
    expect(classForDensity(0.5)).toBe(400);
    expect(classForDensity(9.375)).toBe(100);
    expect(classForDensity(11)).toBe(92.5);
    expect(classForDensity(1000)).toBe(50);
  });

  it("returns null for negative, NaN, and non-finite densities", () => {
    expect(classForDensity(-1)).toBeNull();
    expect(classForDensity(-0.001)).toBeNull();
    expect(classForDensity(Number.NaN)).toBeNull();
    expect(classForDensity(Number.POSITIVE_INFINITY)).toBeNull();
    expect(classForDensity(Number.NEGATIVE_INFINITY)).toBeNull();
    expect(bandForDensity(-1)).toBeNull();
  });

  it("bandForDensity returns the matched row (for the band derived row)", () => {
    const band = bandForDensity(9.375);
    expect(band).not.toBeNull();
    expect(band!.sub).toBe(6);
    expect(band!.minDensityPcf).toBe(8);
    expect(band!.maxDensityPcf).toBe(10);
    expect(band!.class).toBe(100);
  });
});
