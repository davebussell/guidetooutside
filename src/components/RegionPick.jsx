"use client";
// Restored from client module 53147 (exports: RegionPick)
import * as s from "react";
import * as n from "@/lib/use-here";
/** @param {{ items: { key: string, node: import("react").ReactNode, regions: "all" | string[] }[], limit: number, title: string, className?: string }} props */
export const RegionPick = function ({ items: e, limit: i, title: a, className: r = "" }) {
  let o = (0, n.useHere)(),
    l = o.region?.slug,
    d = l ? e.filter((e) => "all" === e.regions || e.regions.includes(l)) : e,
    c = (d.length >= Math.min(i, 2) ? d : e).slice(0, i);
  return c.length ? (
    <section className={r}>
      <p className="eyebrow">
        {a}
        {l && d.length && o.town ? ` near ${o.town}` : ""}
      </p>
      <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {c.map((e) => (
          <s.Fragment key={e.key}>{e.node}</s.Fragment>
        ))}
      </ul>
    </section>
  ) : null;
};
