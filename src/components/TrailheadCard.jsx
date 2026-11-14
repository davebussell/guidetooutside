"use client";
// Restored from client module 88906 (exports: TrailheadCard)
import * as n from "next/link";
import * as s from "@/lib/use-here";
import { useRegion } from "@/lib/use-region";
export const TrailheadCard = function () {
  let e = (0, s.useHere)(),
    // Outside Canada and the US the zone is the site's own estimate, and in the tropics only a loose guide; say so.
    ctx = useRegion();
  return e.place ? (
    <div className="gto-solid mx-auto mb-6 flex max-w-xl flex-wrap items-center justify-between gap-3 rounded-card border border-moss/40 bg-surface px-5 py-4 text-left shadow-rest">
      <div className="min-w-0">
        <p className="eyebrow text-moss">Your place</p>
        <p className="font-display text-xl font-semibold leading-tight">
          {e.town}
          {e.region ? (
            <span className="font-normal text-ink-2">
              {" · "}
              {e.region.name}
            </span>
          ) : null}
          {e.zone ? (
            <span className="font-normal text-ink-2">
              {" · zone "}
              {e.zone}
              {ctx.zoneSystem === "loose" ? " (frost-free)" : ctx.continent !== "north-america" ? " (computed)" : ""}
            </span>
          ) : null}
        </p>
      </div>
      <n.default
        href={`/guide/${e.place.slug}`}
        className="rounded-full bg-moss px-5 py-2.5 font-semibold text-paper transition hover:bg-moss-2"
      >
        This week&apos;s guide →
      </n.default>
    </div>
  ) : null;
};
