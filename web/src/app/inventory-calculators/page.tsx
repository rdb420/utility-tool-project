import type { Metadata } from "next";
import { listByCluster } from "@/components/hub/listByCluster";
import ToolTileGrid from "@/components/hub/ToolTileGrid";
import Breadcrumb from "@/components/layout/Breadcrumb";

export const metadata: Metadata = {
  title: "Inventory calculators",
  description:
    "Free inventory calculators: reorder point, safety stock, EOQ, inventory turnover, days of cover, and carrying cost. Each shows the formula, a worked example, and its assumptions.",
  alternates: { canonical: "/inventory-calculators/" },
};

export default function InventoryCalculatorsPage() {
  return (
    <div className="py-s5">
      <Breadcrumb
        items={[{ label: "Home", href: "/" }, { label: "Inventory" }]}
      />
      <h1 className="mt-s3 text-[2.1rem] font-extrabold leading-[1.1] tracking-[-0.02em]">
        Inventory calculators
      </h1>
      <p className="mb-s5 mt-s3 max-w-[68ch] text-slate">
        The stock decisions that repeat every week, as calculators: when to
        reorder (reorder point), how much buffer to hold (safety stock), how
        much to order at once (economic order quantity), how fast stock moves
        (inventory turnover), how long it lasts (days of cover), and what
        holding it costs (carrying cost). Each page shows the formula, a
        worked example, and the assumptions it rests on — crunch your own
        numbers and check the working.
      </p>
      <ToolTileGrid calculators={listByCluster("inventory")} />
    </div>
  );
}
