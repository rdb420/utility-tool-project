import type { Metadata } from "next";
import Link from "next/link";
import { listByCluster } from "@/components/hub/listByCluster";
import ToolTileGrid from "@/components/hub/ToolTileGrid";
import Wordmark from "@/components/layout/Wordmark";
import { BASE_URL, SITE_NAME } from "@/config/site";
import type { Cluster } from "@/lib/records/records";

export const metadata: Metadata = {
  // Absolute: home doesn't take the "%s | OpsCrunch" template.
  title: {
    absolute:
      "OpsCrunch — free calculators for inventory, freight, and pricing",
  },
  description:
    "Free, fast calculators for inventory, freight, and pricing. Reorder point, safety stock, EOQ, turnover, days of cover, carrying cost — each with the formula, a worked example, and honest assumptions.",
  alternates: { canonical: "/" },
};

/**
 * Minimal Organization JSON-LD, inline for now. If/when the shared
 * `lib/seo/jsonld.ts` helpers land (calculator-page chunk), this can move
 * there; the emitted object stays the same either way.
 */
const ORGANIZATION_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: `${BASE_URL}/`,
} as const;

const EYEBROW =
  "block font-mono text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-muted";

function ClusterSection({
  eyebrow,
  heading,
  hubHref,
  hubLabel,
  cluster,
  emptyNote,
}: {
  eyebrow: string;
  heading: string;
  hubHref: string;
  hubLabel: string;
  cluster: Cluster;
  emptyNote?: string;
}) {
  return (
    <section className="mt-s6">
      <span className={EYEBROW}>{eyebrow}</span>
      <h2 className="mb-s4 mt-s1 text-[1.4rem] font-extrabold tracking-[-0.01em]">
        {heading}
      </h2>
      <ToolTileGrid calculators={listByCluster(cluster)} emptyNote={emptyNote} />
      <p className="mt-s3 text-[0.9rem]">
        <Link href={hubHref} className="font-bold text-signal no-underline">
          {hubLabel} &rarr;
        </Link>
      </p>
    </section>
  );
}

export default function Home() {
  return (
    <div className="py-s6">
      <Wordmark size="hero" />
      <h1 className="mt-s5 text-[2.1rem] font-extrabold leading-[1.08] tracking-[-0.02em]">
        Free, fast calculators for inventory, freight, and pricing.
      </h1>
      <p className="mt-s3 max-w-[62ch] text-[1.05rem] text-slate">
        One connected workbench for the people who move and count stock. Every
        tool shows its formula, a worked example, and the assumptions behind
        it — enter your numbers, crunch, and check the working. These are
        planning estimates, not advice; confirm against your own data.
      </p>

      <ClusterSection
        eyebrow="Cluster 01"
        heading="Inventory calculators"
        cluster="inventory"
        hubHref="/inventory-calculators/"
        hubLabel="All inventory calculators"
      />

      <ClusterSection
        eyebrow="Cluster 02"
        heading="Freight calculators"
        cluster="freight"
        hubHref="/freight-calculators/"
        hubLabel="The freight bench"
        emptyNote="Freight tools are on the bench — first up: CBM calculator."
      />

      <ClusterSection
        eyebrow="Cluster 03"
        heading="Pricing calculators"
        cluster="pricing"
        hubHref="/pricing-calculators/"
        hubLabel="The pricing bench"
        emptyNote="Pricing tools are on the bench — first up: margin and break-even."
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_JSONLD) }}
      />
    </div>
  );
}
