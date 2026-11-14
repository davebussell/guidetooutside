"use client";
// Restored from client module 17737 (exports: PlaceCTA)
import * as l from "next/link";
import * as n from "@/lib/hooks";
/** @param {{ path?: string, label?: string }} props */
export const PlaceCTA = function ({ path: e = "/learn/count", label: t }) {
  let i = (0, n.usePlace)(),
    a = i ? `${e}/${i.slug}` : e;
  return (
    <l.default
      href={a}
      className="inline-flex items-center gap-2 rounded-full bg-moss px-5 py-3 font-medium text-paper transition hover:bg-moss-2"
    >
      {t ?? (i ? `Today's count for ${i.label.split(",")[0]}` : "Today's nature count")}
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M5 12h14M13 6l6 6-6 6" />
      </svg>
    </l.default>
  );
};
