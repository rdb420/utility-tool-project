/**
 * JSON-LD builder tests. The FAQPage entity must equal the record's
 * copy_blocks.faq exactly (it is the same array the visible Faq component
 * renders); WebApplication and BreadcrumbList get shape checks.
 */

import { describe, expect, it } from "vitest";
import { BASE_URL } from "@/config/site";
import { CALCULATORS } from "@/lib/records/records";
import {
  breadcrumbList,
  canonicalUrl,
  faqPage,
  webApplication,
} from "../jsonld";

interface FaqPageShape {
  "@context": string;
  "@type": string;
  mainEntity: {
    "@type": string;
    name: string;
    acceptedAnswer: { "@type": string; text: string };
  }[];
}

interface WebApplicationShape {
  "@context": string;
  "@type": string;
  name: string;
  url: string;
  description?: string;
  applicationCategory: string;
  offers: { "@type": string; price: string; priceCurrency: string };
}

interface BreadcrumbListShape {
  "@context": string;
  "@type": string;
  itemListElement: {
    "@type": string;
    position: number;
    name: string;
    item: string;
  }[];
}

describe("faqPage", () => {
  for (const calculator of CALCULATORS) {
    it(`matches copy_blocks.faq exactly for ${calculator.slug}`, () => {
      const data = faqPage(calculator) as FaqPageShape;
      expect(data["@context"]).toBe("https://schema.org");
      expect(data["@type"]).toBe("FAQPage");
      expect(data.mainEntity).toHaveLength(calculator.copy_blocks.faq.length);
      data.mainEntity.forEach((entity, index) => {
        const source = calculator.copy_blocks.faq[index];
        expect(entity["@type"]).toBe("Question");
        expect(entity.name).toBe(source.q);
        expect(entity.acceptedAnswer["@type"]).toBe("Answer");
        expect(entity.acceptedAnswer.text).toBe(source.a);
      });
    });
  }
});

describe("webApplication", () => {
  for (const calculator of CALCULATORS) {
    it(`emits a free BusinessApplication for ${calculator.slug}`, () => {
      const data = webApplication(calculator) as WebApplicationShape;
      expect(data["@context"]).toBe("https://schema.org");
      expect(data["@type"]).toBe("WebApplication");
      expect(data.name).toBe(calculator.title);
      expect(data.url).toBe(`${BASE_URL}/${calculator.slug}/`);
      expect(data.description).toBe(calculator.meta_description);
      expect(data.applicationCategory).toBe("BusinessApplication");
      expect(data.offers).toEqual({
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      });
    });
  }
});

describe("breadcrumbList", () => {
  it("numbers positions from 1 and absolutises site-relative hrefs", () => {
    const data = breadcrumbList([
      { label: "Home", href: "/" },
      { label: "Inventory calculators", href: "/inventory-calculators/" },
      { label: "EOQ Calculator", href: "/eoq-calculator/" },
    ]) as BreadcrumbListShape;
    expect(data["@context"]).toBe("https://schema.org");
    expect(data["@type"]).toBe("BreadcrumbList");
    expect(data.itemListElement.map((item) => item.position)).toEqual([
      1, 2, 3,
    ]);
    expect(data.itemListElement.map((item) => item.item)).toEqual([
      `${BASE_URL}/`,
      `${BASE_URL}/inventory-calculators/`,
      `${BASE_URL}/eoq-calculator/`,
    ]);
    expect(data.itemListElement.map((item) => item.name)).toEqual([
      "Home",
      "Inventory calculators",
      "EOQ Calculator",
    ]);
  });

  it("leaves absolute URLs untouched", () => {
    const data = breadcrumbList([
      { label: "Home", href: "https://example.com/" },
    ]) as BreadcrumbListShape;
    expect(data.itemListElement[0].item).toBe("https://example.com/");
  });
});

describe("canonicalUrl", () => {
  it("builds trailing-slash canonicals off BASE_URL", () => {
    expect(canonicalUrl("eoq-calculator")).toBe(
      `${BASE_URL}/eoq-calculator/`,
    );
  });
});
