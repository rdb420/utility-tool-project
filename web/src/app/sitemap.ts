import type { MetadataRoute } from "next";
import { BASE_URL } from "@/config/site";
import { CALCULATORS } from "@/lib/records/records";

/**
 * Sitemap: home, the three cluster hubs, every calculator page (driven by the
 * records registry, so new calculators appear automatically), and the five
 * trust pages. Absolute URLs, trailing slashes (matches `trailingSlash: true`
 * and the canonical convention in the page specs).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    "/inventory-calculators/",
    "/freight-calculators/",
    "/pricing-calculators/",
    ...CALCULATORS.map((calculator) => `/${calculator.slug}/`),
    "/privacy-policy/",
    "/cookie-policy/",
    "/terms/",
    "/contact/",
    "/about/",
  ];
  return paths.map((path) => ({ url: `${BASE_URL}${path}` }));
}
