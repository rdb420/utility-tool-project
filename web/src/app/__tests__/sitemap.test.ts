import { describe, expect, it } from "vitest";
import sitemap from "@/app/sitemap";
import { BASE_URL } from "@/config/site";
import { CALCULATORS } from "@/lib/records/records";

describe("sitemap", () => {
  const urls = sitemap().map((entry) => entry.url);

  it("lists home, the three hubs, and the five trust pages", () => {
    const expected = [
      "/",
      "/inventory-calculators/",
      "/freight-calculators/",
      "/pricing-calculators/",
      "/privacy-policy/",
      "/cookie-policy/",
      "/terms/",
      "/contact/",
      "/about/",
    ];
    for (const path of expected) {
      expect(urls).toContain(`${BASE_URL}${path}`);
    }
  });

  it("lists every calculator page from the records registry", () => {
    expect(CALCULATORS.length).toBeGreaterThan(0);
    for (const calculator of CALCULATORS) {
      expect(urls).toContain(`${BASE_URL}/${calculator.slug}/`);
    }
    // Nothing beyond home + three hubs + calculators + five trust pages.
    expect(urls).toHaveLength(4 + CALCULATORS.length + 5);
  });

  it("uses absolute URLs with trailing slashes, no duplicates", () => {
    for (const url of urls) {
      expect(url.startsWith(`${BASE_URL}/`)).toBe(true);
      expect(url.startsWith("https://")).toBe(true);
      expect(url.endsWith("/")).toBe(true);
    }
    expect(new Set(urls).size).toBe(urls.length);
  });
});
