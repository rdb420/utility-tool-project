/**
 * Record-driven calculator page (one route for every calculator record).
 *
 * All pages are prerendered from CALCULATORS (dynamicParams = false). The
 * anatomy follows docs/planning/MVP_PAGE_SPECS.md and the calculator kit exactly:
 * breadcrumb -> h1 + one-liner -> tool island -> nudge -> copy blocks ->
 * ad A -> FAQ -> ad D -> bench tiles -> disclaimer -> JSON-LD. The formula,
 * worked example, and FAQ are server-rendered HTML so crawlers and AI
 * engines see them without executing the island.
 */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createElement } from "react";
import AdSlot from "@/components/ads/AdSlot";
import BenchTiles from "@/components/content/BenchTiles";
import CopyBlocks from "@/components/content/CopyBlocks";
import Disclaimer from "@/components/content/Disclaimer";
import Faq from "@/components/content/Faq";
import Nudge from "@/components/content/Nudge";
import Breadcrumb from "@/components/layout/Breadcrumb";
import JsonLd from "@/components/seo/JsonLd";
import { toolFor } from "@/components/tool/toolRegistry";
import { SITE_NAME } from "@/config/site";
import {
  CALCULATORS,
  FORMULAS_BY_ID,
  calculatorBySlug,
  clusterOf,
  relatedTools,
} from "@/lib/records/records";
import type { FormulaRecord } from "@/lib/records/types.gen";
import {
  breadcrumbList,
  faqPage,
  webApplication,
} from "@/lib/seo/jsonld";
import styles from "./page.module.css";

export const dynamicParams = false;

export function generateStaticParams() {
  return CALCULATORS.map((calculator) => ({ slug: calculator.slug }));
}

type Params = Promise<{ slug: string }>;

const HUBS = {
  inventory: { label: "Inventory calculators", href: "/inventory-calculators/" },
  freight: { label: "Freight calculators", href: "/freight-calculators/" },
  pricing: { label: "Pricing calculators", href: "/pricing-calculators/" },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const calculator = calculatorBySlug(slug);
  if (!calculator) return {};
  return {
    title: calculator.title,
    description: calculator.meta_description,
    keywords: [
      calculator.primary_keyword,
      ...(calculator.secondary_keywords ?? []),
    ],
    alternates: { canonical: `/${calculator.slug}/` },
    openGraph: {
      title: calculator.title,
      description: calculator.meta_description,
      url: `/${calculator.slug}/`,
      siteName: SITE_NAME,
      type: "website",
    },
  };
}

export default async function CalculatorPage({ params }: { params: Params }) {
  const { slug } = await params;
  const calculator = calculatorBySlug(slug);
  if (!calculator) notFound();

  const formulas = calculator.formula_ids
    .map((id) => FORMULAS_BY_ID[id])
    .filter((formula): formula is FormulaRecord => formula !== undefined);
  const hub = HUBS[clusterOf(calculator)];
  // Dispatched via createElement: toolFor returns a statically defined island
  // component (never one created during render).
  const tool = createElement(toolFor(calculator.id), { calculator, formulas });
  const assumptions = [
    ...new Set(formulas.flatMap((formula) => formula.assumptions)),
  ];
  const schemaTypes = new Set(calculator.schema_types);
  const crumbs = [
    { label: "Home", href: "/" },
    { label: hub.label, href: hub.href },
    { label: calculator.title },
  ];

  return (
    <>
      <Breadcrumb items={crumbs} />
      <h1 className={styles.h1}>{calculator.title}</h1>
      <p className={styles.sub}>{calculator.meta_description}</p>
      {tool}
      <Nudge />
      <CopyBlocks calculator={calculator} formulas={formulas} />
      <AdSlot slot="A" />
      <Faq items={calculator.copy_blocks.faq} />
      <AdSlot slot="D" />
      <BenchTiles from={calculator} tools={relatedTools(calculator)} />
      <Disclaimer
        level={calculator.disclaimer_level}
        assumptions={assumptions}
      />
      {schemaTypes.has("WebApplication") ? (
        <JsonLd data={webApplication(calculator)} />
      ) : null}
      {schemaTypes.has("FAQPage") ? <JsonLd data={faqPage(calculator)} /> : null}
      {schemaTypes.has("BreadcrumbList") ? (
        <JsonLd
          data={breadcrumbList([
            { label: "Home", href: "/" },
            { label: hub.label, href: hub.href },
            { label: calculator.title, href: `/${calculator.slug}/` },
          ])}
        />
      ) : null}
    </>
  );
}
