"use client";
// Restored from client module 69899 (exports: YourPlaceBanner)
import * as r from "next/link";
import * as s from "@/lib/hooks";
export const YourPlaceBanner = function ({ section: e }) {
  let o = (0, s.usePlace)();
  return o?.slug ? (
    <r.default
      href={`/${e}/${o.slug}`}
      className="mt-6 inline-flex items-center gap-2 rounded-full bg-moss text-paper px-5 py-2.5 font-semibold hover:bg-moss-2 transition"
    >
      {"This week's "}
      {e}
      {" guide for "}
      {o.label}
      {" →"}
    </r.default>
  ) : null;
};
