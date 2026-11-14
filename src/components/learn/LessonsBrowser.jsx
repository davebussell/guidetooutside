"use client";
// Restored from client module 18347 (exports: LessonsBrowser)
import * as s from "react/jsx-runtime";
import * as l from "next/link";
import * as n from "react";
import * as t from "@/components/learn/ActivityArt";
import * as i from "@/components/learn/family";
import * as a from "@/lib/learn/use-learn";
let o = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
function CR_({ l: e, colour: n, kids: a, who: d, rungs: c, done: m, onDone: h, now: x }) {
  let u,
    p = `/learn/lessons/${e.slug}`,
    f = c
      .map((e) => ({
        r: e,
        kids: d.filter((s) => (0, i.rungOf)(s) === e.id),
      }))
      .filter((e) => e.kids.length > 0);
  return (
    <li className={`card relative flex flex-col overflow-hidden ${m ? "ring-2 ring-moss/50" : ""}`}>
      <span
        className="absolute inset-y-0 left-0 w-1.5"
        style={{
          background: n,
        }}
        aria-hidden="true"
      />
      <div className="flex flex-1 flex-col p-5 pl-6 sm:pl-7">
        <div className="flex items-center justify-between gap-3">
          <p
            className="text-[12px] font-semibold uppercase tracking-[0.1em]"
            style={{
              color: n,
            }}
          >
            {e.theme}
          </p>
          {m ? (
            <p className="rounded-full bg-moss px-2.5 py-0.5 text-xs font-semibold text-white">Done ✓</p>
          ) : x ? (
            <p className="rounded-full bg-gold-fill/20 px-2.5 py-0.5 text-xs font-semibold text-ink">In season</p>
          ) : null}
        </div>
        <div className="mt-3 flex gap-4">
          <l.default href={p} className="shrink-0" tabIndex={-1} aria-hidden="true">
            <t.ActivityArt art={e.art} className="h-16 w-16 transition hover:rotate-[-4deg] sm:h-20 sm:w-20" />
          </l.default>
          <div className="min-w-0 flex-1">
            <h3 className="font-display text-xl font-semibold leading-tight tracking-tight sm:text-[22px]">
              <l.default href={p} className="hover:text-moss">
                {e.title}
              </l.default>
            </h3>
            <p className="mt-1 text-[15px] italic leading-snug text-ink">“{e.pitch}”</p>
            <div className="mt-2 flex flex-wrap gap-1.5 text-xs">
              <span className="rounded-full bg-paper-2 px-2 py-0.5 font-medium text-ink-2">
                {(u = e.months).length ? `${o[u[0] - 1]}–${o[u[u.length - 1] - 1]}` : "Any month"}
              </span>
              <span className="rounded-full bg-paper-2 px-2 py-0.5 font-medium text-ink-2">
                {e.minutes}
                {" min outside"}
              </span>
              <span className="rounded-full bg-azure-soft px-2 py-0.5 font-medium text-azure">+ 5 on screen</span>
            </div>
          </div>
        </div>
        <ul className="mt-4 grid gap-2.5">
          {f.map((l) => (
            <li key={l.r.id} className="flex gap-3">
              <span className="flex shrink-0 -space-x-2 pt-0.5">
                {l.kids.map((e) => (
                  <i.Avatar key={e.id} kid={e} i={a.indexOf(e)} size={28} />
                ))}
              </span>
              <p className="min-w-0 text-sm leading-snug">
                <span className="font-semibold">{l.kids.map((e) => e.name).join(" & ")}</span>
                <span className="text-ink-2">
                  {" · "}
                  {l.r.label}
                </span>
                <span className="mt-0.5 line-clamp-2 block text-ink-2">“{e.first[l.r.id]}”</span>
              </p>
            </li>
          ))}
        </ul>
        <div className="mt-auto flex items-center justify-between gap-3 pt-4">
          <button
            type="button"
            onClick={h}
            aria-pressed={m}
            className="text-sm font-medium text-ink-2 underline decoration-line underline-offset-4 hover:text-moss"
          >
            {m ? "Done — undo" : "Mark done"}
          </button>
          <l.default
            href={p}
            className="shrink-0 rounded-full bg-moss px-4 py-2 text-sm font-semibold text-white transition hover:bg-moss-2"
          >
            Open it
          </l.default>
        </div>
      </div>
    </li>
  );
}
export const LessonsBrowser = function ({ lessons: e, themes: o, rungs: d }) {
  let c = (0, i.useFamily)(),
    m = (0, a.useLearn)(),
    [h, x] = (0, i.useChosenKid)(c.kids, true, "all"),
    [u, p] = (0, n.useState)(null),
    [f, g] = (0, n.useState)(false),
    [j, N] = (0, n.useState)(null);
  (0, n.useEffect)(() => {
    N(new Date().getMonth() + 1);
  }, []);
  let v = (e) => null != j && (0 === e.months.length || e.months.includes(j)),
    k = e.filter((e) => (null === u || ("season" === u ? v(e) : e.theme === u)) && (!f || !m.done[e.slug])),
    b = "all" === h ? c.kids : c.kids.filter((e) => e.id === h),
    y = e.filter((e) => m.done[e.slug]).length,
    w = (0, n.useMemo)(() => Object.fromEntries(o.map((e) => [e.theme, e.colour])), [o]),
    C = u && "season" !== u ? o.find((e) => e.theme === u) : null;
  return (
    <section>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        <i.Tile art="book" title="Every lesson" note={`${e.length} lessons`} on={null === u} onClick={() => p(null)} size="sm" />
        {o.map((l) => (
          <i.Tile
            key={l.theme}
            art={l.art}
            title={l.theme}
            note={`${e.filter((e) => e.theme === l.theme).length} ${1 === e.filter((e) => e.theme === l.theme).length ? "lesson" : "lessons"}`}
            on={u === l.theme}
            onClick={() => p(u === l.theme ? null : l.theme)}
            size="sm"
          />
        ))}
      </div>
      <div className="mt-6 grid items-start gap-6 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)]">
        <div className="card grid gap-6 p-5 sm:p-6 lg:sticky lg:top-24">
          <i.WhoBlock title="Who's learning?" allLabel="Everyone" value={h} onChange={x} />
          <div>
            <i.Label>Show</i.Label>
            <div className="mt-3 flex flex-wrap gap-2">
              <i.Chip on={f} onClick={() => g((e) => !e)}>
                Not done yet
              </i.Chip>
              <i.Chip on={"season" === u} onClick={() => p("season" === u ? null : "season")}>
                In season now
              </i.Chip>
            </div>
          </div>
          <div>
            <i.Label aside={`${y} of ${e.length}`}>Done so far</i.Label>
            <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-paper-2">
              <div
                className="h-full rounded-full bg-moss transition-all"
                style={{
                  width: `${(y / e.length) * 100}%`,
                }}
              />
            </div>
            <p className="mt-2 text-xs leading-relaxed text-ink-2">
              Tick one done on its own page and{" "}
              <l.default href="/learn/plan" className="font-medium text-moss underline hover:no-underline">
                the season plan
              </l.default>{" "}
              moves on to the next.
            </p>
          </div>
        </div>
        <div>
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                {C ? C.theme : "season" === u ? "In season now" : "Every lesson"}
              </h2>
              <p className="mt-1 max-w-2xl text-sm text-ink-2">
                {k.length} {1 === k.length ? "lesson" : "lessons"}
                {C ? ` \xb7 ${C.note}` : " · an hour outside, then five minutes on screen"}
              </p>
            </div>
          </div>
          {0 === k.length ? (
            <div className="card mt-5 p-6 text-center">
              <t.ActivityArt art="acorn" className="mx-auto h-20 w-20" />
              <p className="font-display mt-3 text-xl font-semibold">All of these are done</p>
              <p className="mt-1 text-sm text-ink-2">
                Every one is worth doing twice — a season later, the same lesson finds different things.
              </p>
              <div className="mt-4 flex justify-center">
                <i.Chip on={false} onClick={() => g(false)}>
                  Show the done ones
                </i.Chip>
              </div>
            </div>
          ) : (
            <ol className="mt-5 grid gap-5 xl:grid-cols-2">
              {k.map((e) => (
                <CR_
                  key={e.slug}
                  l={e}
                  colour={w[e.theme]}
                  kids={c.kids}
                  who={b}
                  rungs={d}
                  done={!!m.done[e.slug]}
                  onDone={() => m.markDone(e.slug)}
                  now={v(e) && e.months.length > 0}
                />
              ))}
            </ol>
          )}
        </div>
      </div>
    </section>
  );
};
