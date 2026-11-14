"use client";
// Restored from client module 53470 (exports: PlanBoard)
import * as s from "react/jsx-runtime";
import * as t from "next/link";
import * as l from "@/components/learn/ActivityArt";
import * as n from "@/components/learn/family";
import * as i from "@/lib/learn/use-learn";
let a = (e) =>
  new Date(e + "T12:00:00").toLocaleDateString("en-CA", {
    month: "short",
    day: "numeric",
  });
export const PlanBoard = function ({ weeks: e, placeName: r, closing: o }) {
  let d = (0, i.useLearn)(),
    m = d.done,
    c = e.reduce((e, s) => e + s.lessons.length, 0),
    x = e.reduce((e, s) => e + s.lessons.filter((e) => m[e.slug]).length, 0),
    h = e[0]?.lessons ?? [];
  return (
    <section>
      {(h.length > 0 || o.length > 0) && (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 print:hidden">
          {h.slice(0, 2).map((e) => (
            <n.Tile
              key={e.slug}
              art={e.art}
              title={e.title}
              note={m[e.slug] ? "This week · done ✓" : `This week \xb7 ${e.minutes} min outside`}
              href={`/learn/lessons/${e.slug}`}
            />
          ))}
          {o.slice(0, 4 - Math.min(2, h.length)).map((e) => (
            <n.Tile key={e.slug} art={e.art} title={e.title} note="Closing soon — this month only" href={`/learn/lessons/${e.slug}`} />
          ))}
          {(e[1]?.lessons ?? [])
            .filter((e) => !h.some((s) => s.slug === e.slug))
            .slice(0, Math.max(0, 4 - Math.min(2, h.length) - Math.min(o.length, 2)))
            .map((e) => (
              <n.Tile
                key={e.slug}
                art={e.art}
                title={e.title}
                note={`Next week \xb7 ${e.minutes} min outside`}
                href={`/learn/lessons/${e.slug}`}
              />
            ))}
        </div>
      )}
      <div className="mt-6 grid items-start gap-6 lg:grid-cols-[minmax(0,300px)_minmax(0,1fr)]">
        <aside className="card grid gap-6 p-5 sm:p-6 lg:sticky lg:top-24 print:hidden">
          <div>
            <n.Label aside={`${x} of ${c}`}>Done so far</n.Label>
            <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-paper-2">
              <div
                className="h-full rounded-full bg-moss transition-all"
                style={{
                  width: `${c ? (x / c) * 100 : 0}%`,
                }}
              />
            </div>
          </div>
          <div className="hidden lg:block">
            <n.Label>The weeks</n.Label>
            <ol className="mt-3 grid gap-1.5">
              {e.map((e) => {
                let t = e.lessons.length > 0 && e.lessons.every((e) => m[e.slug]);
                return (
                  <li key={e.index}>
                    <button
                      type="button"
                      onClick={() => {
                        let s;
                        return (
                          (s = e.index),
                          document.getElementById(`week-${s}`)?.scrollIntoView({
                            behavior: "smooth",
                            block: "start",
                          })
                        );
                      }}
                      className="flex w-full items-center gap-3 rounded-tile border border-transparent px-2 py-1.5 text-left transition hover:border-line hover:bg-paper-2/50"
                    >
                      <span
                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${t ? "bg-moss text-white" : 0 === e.index ? "bg-gold-fill/25 text-ink" : "bg-paper-2 text-ink-2"}`}
                      >
                        {t ? "✓" : e.index + 1}
                      </span>
                      <span className="min-w-0 flex-1 text-sm">
                        <span className="font-semibold">{0 === e.index ? "This week" : a(e.start)}</span>
                      </span>
                      <span className="flex -space-x-1.5">
                        {e.lessons.map((e) => (
                          <l.ActivityArt
                            key={e.slug}
                            art={e.art}
                            className={`h-7 w-7 !rounded-full ring-2 ring-surface ${m[e.slug] ? "opacity-40" : ""}`}
                          />
                        ))}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>
          <button
            type="button"
            onClick={() => window.print()}
            className="hidden rounded-full border border-edge px-4 py-2 text-sm font-medium text-ink-2 transition hover:border-moss hover:text-moss lg:block"
          >
            Print the plan
          </button>
        </aside>
        <div>
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">Week by week</h2>
              <p className="mt-1 text-sm text-ink-2">
                {e.length}
                {" weeks · "}
                {c}
                {" lessons · ordered by "}
                the season, daylight and moon in {r}
              </p>
            </div>
          </div>
          <ol className="mt-5 grid gap-5">
            {e.map((e) => (
              <li key={e.index} id={`week-${e.index}`} className="card relative scroll-mt-24 overflow-hidden break-inside-avoid">
                <span
                  className={`absolute inset-y-0 left-0 w-1.5 ${e.frost ? "bg-azure" : 0 === e.index ? "bg-gold-fill" : "bg-moss"}`}
                  aria-hidden="true"
                />
                <div className="p-5 pl-6 sm:p-6 sm:pl-8">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-[12px] font-semibold uppercase tracking-[0.1em] text-moss">
                      {"Week "}
                      {e.index + 1}
                      {" · "}
                      {e.label}
                    </p>
                    {0 === e.index && <p className="rounded-full bg-gold-fill/25 px-2.5 py-0.5 text-xs font-semibold">This week</p>}
                  </div>
                  {e.note && (
                    <div className="mt-3 flex items-start gap-3 rounded-tile bg-paper-2/60 p-3">
                      <l.ActivityArt
                        art={e.frost ? "snow" : /moon/i.test(e.note) ? "moon" : "sun"}
                        className="h-10 w-10 shrink-0 !rounded-tile"
                      />
                      <p className="text-[15px] leading-snug">{e.note}</p>
                    </div>
                  )}
                  {0 === e.lessons.length ? (
                    <p className="mt-4 text-sm text-ink-2">
                      Nothing new comes into season this week, and nothing is far enough behind to be worth repeating yet. Go out anyway and
                      count whatever is there.
                    </p>
                  ) : (
                    <ul className="mt-4 grid gap-3">
                      {e.lessons.map((e) => {
                        let n = !!m[e.slug];
                        return (
                          <li
                            key={e.slug}
                            className={`flex flex-wrap items-center gap-3 rounded-tile border p-3 sm:flex-nowrap sm:gap-4 ${n ? "border-moss/40 bg-moss/5" : "border-line/70 bg-surface"}`}
                          >
                            <t.default href={`/learn/lessons/${e.slug}`} className="shrink-0" tabIndex={-1} aria-hidden="true">
                              <l.ActivityArt art={e.art} className="h-14 w-14 transition hover:rotate-[-4deg] sm:h-16 sm:w-16" />
                            </t.default>
                            <div className="min-w-0 flex-1 basis-[60%]">
                              <p
                                className="text-[11px] font-semibold uppercase tracking-[0.1em]"
                                style={{
                                  color: e.colour,
                                }}
                              >
                                {e.theme}
                              </p>
                              <t.default
                                href={`/learn/lessons/${e.slug}`}
                                className={`font-display block text-lg font-semibold leading-tight hover:text-moss ${n ? "text-moss-2" : ""}`}
                              >
                                {e.title}
                              </t.default>
                              <p className="mt-0.5 text-xs leading-snug text-ink-2">
                                {e.minutes}
                                {" min outside · "}
                                {e.maths}
                              </p>
                              {e.again && (
                                <p className="mt-1 text-xs font-medium leading-snug text-gold">
                                  Again — same spot, same hour. Put the two counts side by side and ask what changed.
                                </p>
                              )}
                            </div>
                            <button
                              type="button"
                              onClick={() => d.markDone(e.slug)}
                              aria-pressed={n}
                              aria-label={n ? `Mark "${e.title}" not done` : `We did "${e.title}"`}
                              className={`ml-auto shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition print:hidden ${n ? "border border-moss bg-moss-soft text-moss" : "bg-moss text-white hover:bg-moss-2"}`}
                            >
                              {n ? `Done ${a(m[e.slug])} ✓` : "We did it!"}
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-sm text-ink-2">
            {"Built for "}
            {r}
            {
              " from the season, its daylight and moon, and its average first frost where that falls in the plan. Ticks are kept in this browser, and the next plan pushes anything already ticked to the back."
            }
          </p>
        </div>
      </div>
    </section>
  );
};
