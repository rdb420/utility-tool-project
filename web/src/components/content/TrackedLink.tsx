"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { track } from "@/lib/analytics";

/** Bench-tile link that emits related_tool_click (ids only, never values). */
export default function TrackedLink({
  href,
  fromToolId,
  toToolId,
  className,
  children,
}: {
  href: string;
  fromToolId: string;
  toToolId: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className={className}
      onClick={() => track({ name: "related_tool_click", fromToolId, toToolId })}
    >
      {children}
    </Link>
  );
}
