import { describe, expect, it } from "vitest";
import { listByCluster } from "@/components/hub/listByCluster";
import { CALCULATORS } from "@/lib/records/records";

describe("listByCluster", () => {
  it("returns the six inventory MVP calculators (at minimum)", () => {
    const slugs = listByCluster("inventory").map((c) => c.slug);
    expect(slugs).toEqual(
      expect.arrayContaining([
        "reorder-point-calculator",
        "safety-stock-calculator",
        "eoq-calculator",
        "inventory-turnover-calculator",
        "days-of-inventory-calculator",
        "inventory-carrying-cost-calculator",
      ]),
    );
  });

  it("partitions the full registry between the three clusters", () => {
    const inventory = listByCluster("inventory");
    const freight = listByCluster("freight");
    const pricing = listByCluster("pricing");
    expect(inventory.length + freight.length + pricing.length).toBe(
      CALCULATORS.length,
    );
  });

  it("returns only pricing-prefixed calculators for the pricing cluster", () => {
    // Empty until the pricing records land; must auto-populate when they do.
    for (const calculator of listByCluster("pricing")) {
      expect(calculator.formula_ids[0].startsWith("pricing.")).toBe(true);
    }
  });

  it("returns only freight-prefixed calculators for the freight cluster", () => {
    // Empty until the CBM chunk lands; must auto-populate when it does.
    for (const calculator of listByCluster("freight")) {
      expect(calculator.formula_ids[0].startsWith("freight.")).toBe(true);
    }
  });
});
