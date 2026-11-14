"use client";
// Restored from client module 46545 (exports: MoonMonth)
import * as t from "react/jsx-runtime";
import * as n from "react";
import * as s from "@/lib/moon-phases";
import * as i from "@/lib/moon-phases";
import * as a from "@/lib/learn/rungs";
export const MoonMonth = function ({ nights: e = 30 }) {
  let [o, l] = (0, n.useState)("four"),
    [r, d] = (0, n.useState)(null),
    h = new Date();
  h.setHours(21, 0, 0, 0);
  let m = Array.from(
      {
        length: e,
      },
      (e, t) => {
        let n = new Date(h.getTime() + 864e5 * t),
          i = (0, s.getMoon)(n);
        return {
          i: t,
          when: n,
          age: i.age,
          illumination: i.illumination,
          phaseName: i.phaseName,
          isFull: 0.5 > Math.abs(i.age - 14.7652944265),
          isNew: i.age < 0.5 || i.age > 29.030588853,
        };
      },
    ),
    c = m.findIndex((e) => e.isFull),
    g = m.findIndex((e) => e.isNew),
    u = null != r ? m[r] : null,
    x = {
      two: "Tap tonight's moon. Is it a circle, or a slice? Now go outside and check.",
      four: `Count the nights along to the round one. ${c >= 0 ? `Was it ${c}?` : "It is further ahead than this grid goes."}`,
      six: `Full to full is about 29 and a half nights. ${c >= 0 ? `The full moon is ${c} nights away` : "No full moon in this stretch"}${g >= 0 ? ` and the new moon is ${g}` : ""} — how many nights between the two, and does that match half of 29 and a half?`,
    };
  return (
    <section className="card p-5 sm:p-7">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <p className="eyebrow text-azure">A month of moons</p>
        <div className="flex gap-1.5">
          {a.RUNGS.map((e) => (
            <button
              key={e.id}
              type="button"
              aria-pressed={e.id === o}
              onClick={() => l(e.id)}
              className={`rounded-full border px-2.5 py-1 text-xs font-medium transition ${e.id === o ? "border-moss bg-moss-soft text-moss-2" : "border-edge text-ink-2 hover:border-moss/50"}`}
            >
              {e.age}
            </button>
          ))}
        </div>
      </div>
      <h2 className="font-display mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
        {"The next "}
        {e}
        {" nights"}
      </h2>
      <p className="mt-1.5 text-ink-2">{x[o]}</p>
      <div className="mt-5 grid grid-cols-5 gap-2 sm:grid-cols-10">
        {m.map((e) => {
          let n = r === e.i;
          return (
            <button
              key={e.i}
              type="button"
              aria-pressed={n}
              onClick={() => d(n ? null : e.i)}
              className={`flex flex-col items-center rounded-tile border-2 px-1 py-2 transition ${n ? "border-moss bg-moss-soft" : e.isFull || e.isNew ? "border-gold-fill/60 bg-gold-fill/5 hover:border-gold-fill" : "border-transparent hover:border-line"}`}
            >
              <i.MoonIcon age={e.age} size={30} />
              <span className="mt-1 text-[11px] leading-none text-ink-2">{0 === e.i ? "tonight" : `+${e.i}`}</span>
            </button>
          );
        })}
      </div>
      <div className="mt-5 min-h-16 border-t border-line/70 pt-4">
        {u ? (
          <p className="leading-relaxed" aria-live="polite">
            <span className="font-medium">
              {u.when.toLocaleDateString("en-CA", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </span>{" "}
            {"— "}
            {u.phaseName.toLowerCase()}
            {", "}
            {u.illumination}
            {"% lit, "}
            {Math.round(u.age)}
            {" days past new."}{" "}
            {u.age < 14.7652944265
              ? "Waxing: it is up in the afternoon and evening, and the lit side points to where the sun went down."
              : "Waning: it rises late and is still up after breakfast, which is when most people see it without noticing."}
          </p>
        ) : (
          <p className="text-sm text-ink-2">
            Tap a night to read it. The gold ones are the full and the new moon — the two nights the month is measured between.
          </p>
        )}
      </div>
    </section>
  );
};
