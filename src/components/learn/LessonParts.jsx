"use client";
// Restored from client module 31126 (exports: LessonAtAGlance, LessonFamily, LessonGame, LessonSay, LessonWho)
import * as n from "react";
import * as s from "@/components/learn/family";
import * as r from "@/components/learn/TurnGame";
let CA_ = (0, n.createContext)(null);
function l() {
  let e = (0, n.useContext)(CA_);
  if (!e) throw Error("LessonFamily is missing");
  return e;
}
let o = {
  two: "var(--azure)",
  four: "var(--moss)",
  six: "var(--gold)",
};
export const LessonAtAGlance = function ({ first: e, labels: n }) {
  let { chosen: r, kids: a } = l(),
    o = "all" === r ? a : a.filter((e) => e.id === r),
    i = ["two", "four", "six"]
      .map((e) => ({
        r: e,
        kids: o.filter((t) => (0, s.rungOf)(t) === e),
      }))
      .filter((e) => e.kids.length);
  return (
    <ul className="grid gap-3">
      {i.map((r) => (
        <li key={r.r} className="flex gap-3">
          <span className="flex shrink-0 -space-x-2 pt-0.5">
            {r.kids.map((e) => (
              <s.Avatar key={e.id} kid={e} i={a.indexOf(e)} size={30} />
            ))}
          </span>
          <p className="min-w-0 text-[15px] leading-snug">
            <span className="font-semibold">{r.kids.map((e) => e.name).join(" & ")}</span>
            <span className="text-ink-2">
              {" · "}
              {n[r.r]}
              {" — “"}
              {e[r.r]}”
            </span>
          </p>
        </li>
      ))}
    </ul>
  );
};
export const LessonFamily = function ({ children: e }) {
  let n = (0, s.useFamily)(),
    [r, l] = (0, s.useChosenKid)(n.kids, true, "all");
  return (
    <CA_.Provider
      value={{
        chosen: r,
        setChosen: l,
        kids: n.kids,
      }}
    >
      {e}
    </CA_.Provider>
  );
};
export const LessonGame = function ({ kind: e, note: n }) {
  let { chosen: s, kids: a } = l();
  return <r.TurnGame kind={e} kids={a} start={s && "all" !== s ? s : null} note={n} />;
};
export const LessonSay = function ({ rungs: e }) {
  let { chosen: n, kids: r } = l(),
    a = n && "all" !== n ? r.find((e) => e.id === n) : null,
    i = a ? (0, s.rungOf)(a) : null,
    d = i ? [...e.filter((e) => e.id === i), ...e.filter((e) => e.id !== i)] : e;
  return (
    <div className="grid gap-4">
      {d.map((e) => {
        let n = (a ? [a] : r).filter((t) => (0, s.rungOf)(t) === e.id),
          l = n.length > 0,
          i = o[e.id];
        return (
          <div key={e.id} className={`card relative overflow-hidden ${a && l ? "ring-2 ring-moss/40" : ""}`}>
            <span
              className="absolute inset-y-0 left-0 w-1.5"
              style={{
                background: i,
              }}
              aria-hidden="true"
            />
            <div className="p-5 pl-6 sm:p-6 sm:pl-8">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-baseline gap-2.5">
                  <p
                    className="font-display text-3xl font-semibold leading-none"
                    style={{
                      color: i,
                    }}
                  >
                    {e.age}
                  </p>
                  <p className="font-display text-lg font-semibold">{e.label}</p>
                </div>
                {l ? (
                  <span className="flex items-center gap-2">
                    <span className="flex -space-x-2">
                      {n.map((e) => (
                        <s.Avatar key={e.id} kid={e} i={r.indexOf(e)} size={28} />
                      ))}
                    </span>
                    <span className="text-sm font-semibold">{n.map((e) => e.name).join(" & ")}</span>
                  </span>
                ) : (
                  <span className="rounded-full bg-paper-2 px-2.5 py-0.5 text-xs text-ink-2">
                    {a ? "Another age" : "Nobody this age today"}
                  </span>
                )}
              </div>
              <div className={`mt-4 grid gap-5 md:grid-cols-[1.25fr_1fr] ${l ? "" : "opacity-80"}`}>
                <ul className="grid content-start gap-3">
                  {e.say.map((e, n) => (
                    <li
                      key={n}
                      className="border-l-[3px] pl-3 text-[15px] leading-relaxed"
                      style={{
                        borderColor: `color-mix(in srgb, ${i} 40%, transparent)`,
                      }}
                    >
                      “{e}”
                    </li>
                  ))}
                </ul>
                <div className="grid content-start gap-3">
                  <div className="rounded-tile bg-paper-2/70 p-3.5">
                    <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-gold">If it isn’t working</p>
                    <p className="mt-1 text-sm leading-relaxed text-ink-2">{e.misstep}</p>
                  </div>
                  <p className="text-xs leading-relaxed text-ink-2">
                    <span className="font-semibold text-ink-2">{"Building: "}</span>
                    {e.building}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export const LessonWho = function () {
  let { chosen: e, setChosen: n } = l();
  return <s.WhoBlock title="Who's doing it?" allLabel="Everyone" value={e} onChange={n} />;
};
