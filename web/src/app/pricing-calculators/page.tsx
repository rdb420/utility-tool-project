import type { Metadata } from "next";
import { listByCluster } from "@/components/hub/listByCluster";
import ToolTileGrid from "@/components/hub/ToolTileGrid";
import Breadcrumb from "@/components/layout/Breadcrumb";

export const metadata: Metadata = {
  title: "Pricing calculators",
  description:
    "Free pricing calculators for margin, markup, break-even, discount impact, and landed cost — each with the formula and a worked example. Planning estimates, not pricing or tax advice.",
  alternates: { canonical: "/pricing-calculators/" },
};

export default function PricingCalculatorsPage() {
  return (
    <div className="py-s5">
      <Breadcrumb
        items={[{ label: "Home", href: "/" }, { label: "Pricing calculators" }]}
      />
      <h1 className="mt-s3 text-[2.1rem] font-extrabold leading-[1.1] tracking-[-0.02em]">
        Pricing calculators
      </h1>
      <p className="mb-s5 mt-s3 max-w-[68ch] text-slate">
        Tools for pricing the goods you move and stock: margin and markup (two
        different percentages that get mixed up daily), break-even units,
        discount impact, and landed cost per unit. Each shows its formula and a
        worked example so you can check the working. These are planning
        estimates, not pricing or tax advice — duty rates and cost structures
        vary, so confirm against your own numbers.
      </p>
      <ToolTileGrid
        calculators={listByCluster("pricing")}
        emptyNote="Pricing tools are on the bench — first up: margin and break-even."
      />
    </div>
  );
}
