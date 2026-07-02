import Link from "next/link";

/**
 * 404 — brand voice, useful exits, and (per the AdSense kit) no ads on
 * error pages: no AdSlot is placed here.
 */
export default function NotFound() {
  return (
    <div className="py-s6">
      <p className="font-mono text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-muted">
        404
      </p>
      <h1 className="mt-s2 text-[2.1rem] font-extrabold leading-[1.1] tracking-[-0.02em]">
        That page isn&apos;t on the bench.
      </h1>
      <p className="mt-s3 max-w-[60ch] text-slate">
        The address may be mistyped, or the tool may have moved. Everything
        that exists is one click away:
      </p>
      <ul className="mt-s4 list-none space-y-s2 p-0">
        <li>
          <Link href="/" className="font-bold text-signal no-underline">
            Home &rarr;
          </Link>
        </li>
        <li>
          <Link
            href="/inventory-calculators/"
            className="font-bold text-signal no-underline"
          >
            Inventory calculators &rarr;
          </Link>
        </li>
        <li>
          <Link
            href="/freight-calculators/"
            className="font-bold text-signal no-underline"
          >
            Freight calculators &rarr;
          </Link>
        </li>
      </ul>
    </div>
  );
}
