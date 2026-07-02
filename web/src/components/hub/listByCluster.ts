import { CALCULATORS, clusterOf, type Cluster } from "@/lib/records/records";
import type { CalculatorRecord } from "@/lib/records/types.gen";

/**
 * Every calculator in a cluster, in registry order. The home page and the two
 * hub pages all render from this, so a new record (e.g. the CBM calculator)
 * appears on its hub and on home the moment it lands in the registry.
 */
export function listByCluster(cluster: Cluster): CalculatorRecord[] {
  return CALCULATORS.filter((calculator) => clusterOf(calculator) === cluster);
}
