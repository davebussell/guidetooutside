"use client";
// Restored from client module 43267 (exports: ActiveNearYou, CalendarYear)
import * as t from "react/jsx-runtime";
import * as s from "next/link";
import * as l from "react";
import * as n from "@/lib/use-here";
import * as o from "@/lib/the-region";
import * as i from "@/lib/ecoregions";
import * as r from "@/lib/species";
let a = (e, t) => "all" === e || e.includes(t);
export const ActiveNearYou = function ({ creatures: e }) {
  let l = (0, n.useHere)();
  if (!l.region || !l.month) return null;
  let c = e.filter((e) => a(e.regions, l.region.slug) && e.months.includes((0, i.libraryMonth)(l.month, l.region.slug, e.regions))),
    u = c.filter((e) => "fish" === e.group),
    d = c.filter((e) => "fish" !== e.group);
  return (
    <section className="mt-8 rounded-tile bg-moss-soft p-5">
      <p className="eyebrow text-moss">
        {"Near "}
        {l.town}
        {" · "}
        {(0, r.monthName)(l.month)}
      </p>
      <h2 className="font-display mt-1 text-xl font-semibold">
        {"Active this month in "}
        {(0, o.theRegion)(l.region.name)}
        {": "}
        {u.length}
        {" fish and "}
        {d.length}
        {" garden species"}
      </h2>
      {[
        ["Fish", u],
        ["Garden", d],
      ].map(([e, l]) => (
        <div key={e} className="mt-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-ink-2">{e}</p>
          <ul className="mt-1.5 flex flex-wrap gap-1.5">
            {l.map((e) => (
              <li key={e.slug}>
                <s.default
                  href={`/wildlife/${e.slug}`}
                  className="inline-block rounded-full border border-edge bg-surface px-3 py-1 text-sm hover:border-moss hover:text-moss"
                >
                  {e.name}
                </s.default>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
};
export const CalendarYear = function ({ species: e, month: o }) {
  let c = (0, n.useHere)(),
    [u, d] = (0, l.useState)(null),
    m = !!c.region && "all" !== u,
    h = m && c.region ? e.filter((e) => a(e.regions, c.region.slug)) : e,
    g = Array.from(
      {
        length: 12,
      },
      (e, t) => t + 1,
    );
  return (
    <>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        {c.region ? (
          <>
            <span className="text-sm text-ink-2">Showing</span>
            <button
              type="button"
              onClick={() => d("near")}
              aria-pressed={m}
              className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition ${m ? "border-moss bg-moss text-paper" : "border-edge bg-surface hover:border-moss"}`}
            >
              {"Near "}
              {c.town}
              {" · "}
              {c.region.name}
            </button>
            <button
              type="button"
              onClick={() => d("all")}
              aria-pressed={!m}
              className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition ${!m ? "border-moss bg-moss text-paper" : "border-edge bg-surface hover:border-moss"}`}
            >
              All regions
            </button>
          </>
        ) : (
          <span className="text-sm text-ink-2">All regions. Set a location to narrow this to one ecological region.</span>
        )}
      </div>
      <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {g.map((e) => {
          let l = h.filter((t) => t.months.includes((0, i.libraryMonth)(e, m ? c.region?.slug : undefined, t.regions)));
          return (
            <div key={e} className={`card p-5 ${e === o ? "border-moss" : ""}`}>
              <div className="flex items-baseline justify-between">
                <h3 className="font-display text-xl font-semibold">{(0, r.monthName)(e)}</h3>
                <span className="text-xs text-ink-2">{l.length}</span>
              </div>
              <ul className="mt-2 space-y-1 text-sm">
                {l.map((e) => (
                  <li key={e.slug}>
                    <s.default href={`/foraging/${e.slug}`} className="text-ink-2 hover:text-ink">
                      {e.name}
                      {e.deadlyDouble && (
                        <span className="ml-1 text-rust" title="Has a poisonous look-alike">
                          ●
                        </span>
                      )}
                    </s.default>
                  </li>
                ))}
                {!l.length && <li className="text-ink-2">None listed{m ? " for this region" : ""}.</li>}
              </ul>
            </div>
          );
        })}
      </div>
    </>
  );
};
