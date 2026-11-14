"use client";
// Restored from client module 78539 (exports: CountSheet)
import * as t from "react/jsx-runtime";
import * as s from "react";
import * as a from "@/lib/learn/rungs";
import * as n from "@/components/learn/ActivityArt";
import * as i from "@/components/learn/family";
import * as r from "@/components/learn/TurnGame";
let l = {
    daylight: "sun",
    frost: "snow",
    moon: "moon",
    recorded: "bug",
    fungi: "mushroom",
    trees: "tree",
    temp: "thermometer",
    rain: "cloud",
    waters: "water",
  },
  o = {
    daylight: "var(--gold)",
    frost: "var(--azure)",
    moon: "#6b5ca5",
    recorded: "var(--rust)",
    fungi: "#8a4a22",
    trees: "var(--moss)",
    temp: "var(--rust)",
    rain: "var(--azure)",
    waters: "var(--azure)",
  },
  d = Object.fromEntries(a.RUNGS.map((e) => [e.id, e.label]));
function CH_({ card: e, kids: c, who: m, chosen: u }) {
  let [x, p] = (0, s.useState)(false),
    g = o[e.key] ?? "var(--moss)",
    f = ["two", "four", "six"]
      .map((e) => ({
        r: e,
        kids: m.filter((t) => (0, i.rungOf)(t) === e),
      }))
      .filter((e) => e.kids.length);
  return (
    <li id={`count-${e.key}`} className="card relative scroll-mt-24 overflow-hidden break-inside-avoid">
      <span
        className="absolute inset-y-0 left-0 w-1.5"
        style={{
          background: g,
        }}
        aria-hidden="true"
      />
      <div className="p-5 pl-6 sm:p-6 sm:pl-8">
        <div className="flex gap-4 sm:gap-5">
          <n.ActivityArt art={l[e.key] ?? "acorn"} className="h-16 w-16 sm:h-20 sm:w-20 print:h-12 print:w-12" />
          <div className="min-w-0 flex-1">
            <p
              className="font-display text-4xl font-semibold leading-none tracking-tight sm:text-5xl"
              style={{
                color: g,
              }}
            >
              {e.display}
            </p>
            <p className="mt-1.5 text-[15px] font-medium leading-snug">{e.label}</p>
          </div>
        </div>
        <ul className="mt-5 grid gap-3 print:hidden">
          {f.map((s) => (
            <li key={s.r} className="flex gap-3">
              <span className="flex shrink-0 -space-x-2 pt-0.5">
                {s.kids.map((e) => (
                  <i.Avatar key={e.id} kid={e} i={c.indexOf(e)} size={30} />
                ))}
              </span>
              <p className="min-w-0 text-[15px] leading-snug">
                <span className="font-semibold">{s.kids.map((e) => e.name).join(" & ")}</span>
                <span className="text-ink-2">
                  {" · "}
                  {d[s.r]}
                </span>
                <span className="mt-0.5 block leading-relaxed">{e.prompts[s.r]}</span>
              </p>
            </li>
          ))}
        </ul>
        <div className="mt-4 hidden print:block">
          {a.RUNGS.map((s) => (
            <p key={s.id} className="mt-2 text-sm leading-relaxed">
              <span className="font-semibold">
                {s.age}
                {": "}
              </span>
              {e.prompts[s.id]}
            </p>
          ))}
        </div>
        {e.handsOff && (
          <p className="mt-4 rounded-lg border-l-4 border-l-gold-fill bg-paper-2/70 px-3 py-2 text-sm text-ink-2">
            Looking only. Nothing goes in a mouth.
          </p>
        )}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-line/70 pt-3">
          <p className="min-w-0 flex-1 text-xs leading-relaxed text-ink-2">{e.source}</p>
          <button
            type="button"
            onClick={() => p((e) => !e)}
            aria-expanded={x}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition print:hidden ${x ? "border border-edge text-ink-2 hover:border-moss hover:text-moss" : "bg-azure-soft text-azure hover:bg-azure/20"}`}
          >
            {x ? "Close the game" : "Play it on screen"}
          </button>
        </div>
        {x && (
          <div className="mt-4 print:hidden">
            <r.TurnGame kind={e.game} kids={c} start={u && "all" !== u ? u : null} title="Five minutes on screen" />
          </div>
        )}
      </div>
    </li>
  );
}
export const CountSheet = function ({ cards: e, placeName: s }) {
  let r = (0, i.useFamily)(),
    [o, d] = (0, i.useChosenKid)(r.kids, true, "all"),
    c = "all" === o ? r.kids : r.kids.filter((e) => e.id === o);
  return e.length ? (
    <section>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 print:hidden">
        {e.slice(0, 4).map((e) => (
          <button
            key={e.key}
            type="button"
            onClick={() => {
              let t;
              return (
                (t = e.key),
                document.getElementById(`count-${t}`)?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                })
              );
            }}
            className="card group flex items-center gap-3 p-3 text-left transition hover:shadow-lift hover:border-moss"
          >
            <n.ActivityArt art={l[e.key] ?? "acorn"} className="h-12 w-12 shrink-0 transition group-hover:rotate-[-4deg] sm:h-14 sm:w-14" />
            <span className="min-w-0">
              <span className="font-display block text-xl font-semibold leading-none group-hover:text-moss sm:text-2xl">{e.display}</span>
              <span className="mt-1 line-clamp-2 block text-xs leading-snug text-ink-2">{e.label}</span>
            </span>
          </button>
        ))}
      </div>
      <div className="mt-6 grid items-start gap-6 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)]">
        <aside className="card grid gap-6 p-5 sm:p-6 lg:sticky lg:top-24 print:hidden">
          <i.WhoBlock title="Who's counting?" allLabel="Everyone" value={o} onChange={d} />
          <div className="hidden lg:block">
            <i.Label>How it works</i.Label>
            <p className="mt-2 text-sm leading-relaxed text-ink-2">
              Read the line under each child’s name, then go outside and count the real thing. Every number is true of {s}
              {" today."}
            </p>
          </div>
          <button
            type="button"
            onClick={() => window.print()}
            className="hidden rounded-full border border-edge px-4 py-2 text-sm font-medium text-ink-2 transition hover:border-moss hover:text-moss lg:block"
          >
            Print the sheet — all three ages
          </button>
        </aside>
        <div>
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">Today’s numbers</h2>
              <p className="mt-1 text-sm text-ink-2">
                {e.length}
                {" of them, all true of "}
                {s}
                {" today"}
                {1 === c.length ? ` \xb7 for ${c[0].name}` : ""}
              </p>
            </div>
            <button
              type="button"
              onClick={() => window.print()}
              className="rounded-full border border-edge px-4 py-2 text-sm font-medium text-ink-2 transition hover:border-moss hover:text-moss print:hidden"
            >
              Print
            </button>
          </div>
          <ol className="mt-5 grid gap-5">
            {e.map((e) => (
              <CH_ key={e.key} card={e} kids={r.kids} who={c} chosen={o} />
            ))}
          </ol>
          <p className="mt-6 rounded-tile border-l-4 border-l-gold-fill bg-paper-2/70 p-4 text-sm leading-relaxed text-ink-2">{a.LOOK_ONLY}</p>
        </div>
      </div>
    </section>
  ) : (
    <div className="card p-6 text-center">
      <n.ActivityArt art="cloud" className="mx-auto h-20 w-20" />
      <p className="font-display mt-3 text-xl font-semibold">Today’s numbers didn’t come through</p>
      <p className="mt-1 text-sm text-ink-2">
        {"The sheet for "}
        {s}
        {" is built from live readings, and one of them did not answer. Reload in a minute."}
      </p>
    </div>
  );
};
