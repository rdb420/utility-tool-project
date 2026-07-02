export type AdSlotId = "A" | "B" | "C" | "D";

/**
 * Seam component so pages can place slots now. The real implementation
 * (reserved heights, "Advertisement" label, ads-flag + consent gating per
 * docs/mockups/opscrunch_adsense_kit.html) replaces this body in Chunk F.
 */
export default function AdSlot({ slot }: { slot: AdSlotId }) {
  void slot;
  return null;
}
