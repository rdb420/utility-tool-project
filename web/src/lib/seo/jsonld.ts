/**
 * Schema.org JSON-LD builders (docs/planning/MVP_PAGE_SPECS.md "Schema.org (JSON-LD)").
 *
 * Only the types listed in a record's `schema_types` are emitted, and the
 * FAQPage entity is built from the exact `copy_blocks.faq` array the visible
 * Faq component renders, so markup and page text can never drift apart.
 */

import { BASE_URL } from "@/config/site";
import type { CalculatorRecord } from "@/lib/records/types.gen";

/** Canonical absolute URL for a calculator slug (trailing slash, per specs). */
export function canonicalUrl(slug: string): string {
  return `${BASE_URL}/${slug}/`;
}

/** Absolute URL for a site-relative path ("/" stays the bare origin + "/"). */
function absoluteUrl(path: string): string {
  return path.startsWith("http") ? path : `${BASE_URL}${path}`;
}

export function webApplication(record: CalculatorRecord): object {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: record.title,
    url: canonicalUrl(record.slug),
    description: record.meta_description,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };
}

export function faqPage(record: CalculatorRecord): object {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: record.copy_blocks.faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
}

export interface BreadcrumbListItem {
  label: string;
  /** Site-relative ("/eoq-calculator/") or absolute URL. */
  href: string;
}

export function breadcrumbList(items: BreadcrumbListItem[]): object {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: absoluteUrl(item.href),
    })),
  };
}
