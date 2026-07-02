import type { Metadata } from "next";
import { listByCluster } from "@/components/hub/listByCluster";
import ToolTileGrid from "@/components/hub/ToolTileGrid";
import Breadcrumb from "@/components/layout/Breadcrumb";

export const metadata: Metadata = {
  title: "Freight calculators",
  description:
    "Free freight calculators for sizing and pricing shipments: CBM (cubic metres), dimensional weight, and chargeable weight, with divisors labelled as estimates. More tools coming.",
  alternates: { canonical: "/freight-calculators/" },
};

export default function FreightCalculatorsPage() {
  return (
    <div className="py-s5">
      <Breadcrumb
        items={[{ label: "Home", href: "/" }, { label: "Freight" }]}
      />
      <h1 className="mt-s3 text-[2.1rem] font-extrabold leading-[1.1] tracking-[-0.02em]">
        Freight calculators
      </h1>
      <p className="mb-s5 mt-s3 max-w-[68ch] text-slate">
        Tools for sizing and pricing shipments: CBM (cubic metre volume) and
        dimensional weight, with chargeable weight worked out from the same
        inputs. Carrier divisors change and vary by service, so where a value
        is an estimate we say so — confirm against your carrier&apos;s current
        service guide. More freight tools are coming as the reference tables
        behind them are verified.
      </p>
      <ToolTileGrid
        calculators={listByCluster("freight")}
        emptyNote="Freight tools are on the bench — first up: CBM calculator."
      />
    </div>
  );
}
