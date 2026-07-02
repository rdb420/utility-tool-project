import Wordmark from "@/components/layout/Wordmark";

/**
 * Placeholder home page — Chunk F (Phase 7) builds the real home with the
 * cluster tile sections and Organization JSON-LD.
 */
export default function Home() {
  return (
    <div className="py-s6">
      <Wordmark size="hero" />
      <h1 className="mt-s5 text-[2.1rem] font-extrabold leading-[1.08] tracking-[-0.02em]">
        Free, fast calculators for inventory and freight.
      </h1>
      <p className="mt-s3 max-w-[60ch] text-[1.05rem] text-slate">
        One connected workbench for the people who move and count stock.
      </p>
    </div>
  );
}
