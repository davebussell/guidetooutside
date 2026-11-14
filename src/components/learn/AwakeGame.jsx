"use client";
// Restored from client module 80268 (exports: AwakeGame)
import * as t from "react/jsx-runtime";
import * as s from "next/image";
import * as a from "react";
import * as n from "@/lib/learn/rungs";
let i = {
  two: 4,
  four: 6,
  six: 8,
};
function r(e) {
  let t = [...e];
  for (let e = t.length - 1; e > 0; e--) {
    let s = Math.floor(Math.random() * (e + 1));
    [t[e], t[s]] = [t[s], t[e]];
  }
  return t;
}
function CL_({ src: e, alt: a, dim: n }) {
  return (
    <s.default
      src={e}
      alt={a}
      fill
      sizes="(max-width: 640px) 45vw, 200px"
      className={`object-cover transition ${n ? "opacity-55 saturate-50" : ""}`}
    />
  );
}
export const AwakeGame = function ({ animals: e, phaseLabel: s, clock: o, placeName: d }) {
  let [h, c] = (0, a.useState)("four"),
    [m, u] = (0, a.useState)(0),
    [x, p] = (0, a.useState)([]),
    g = (t, s = true) => {
      let a = i[t],
        n = e.filter((e) => e.awake),
        l = e.filter((e) => !e.awake),
        o = Math.max(2, Math.floor(a / 2));
      if (!s) {
        let e = n.slice(0, o),
          t = l.slice(0, a - o),
          s = [];
        for (let a = 0; a < Math.max(e.length, t.length); a++) s.push(...(e[a] ? [e[a]] : []), ...(t[a] ? [t[a]] : []));
        return s;
      }
      return r([...r(n).slice(0, o), ...r(l).slice(0, a - o)]);
    },
    [f, b] = (0, a.useState)(() => g("four", false)),
    [j, w] = (0, a.useState)("four:0"),
    y = `${h}:${m}`;
  y !== j && (w(y), b(g(h)), p([]));
  let k = f.filter((e) => e.awake).length,
    N = f.filter((e) => e.awake && x.includes(e.slug)).length,
    v = f.every((e) => x.includes(e.slug)) || N === k;
  return (
    <section className="card p-5 sm:p-7">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <p className="eyebrow text-azure">Who is awake right now</p>
        <div className="flex gap-1.5">
          {n.RUNGS.map((e) => (
            <button
              key={e.id}
              type="button"
              aria-pressed={e.id === h}
              onClick={() => c(e.id)}
              className={`rounded-full border px-2.5 py-1 text-xs font-medium transition ${e.id === h ? "border-moss bg-moss-soft text-moss-2" : "border-edge text-ink-2 hover:border-moss/50"}`}
            >
              {e.age}
            </button>
          ))}
        </div>
      </div>
      <h2 className="font-display mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
        {"It is "}
        {o}
        {" near "}
        {d}
        {" — the "}
        {s}
      </h2>
      <p className="mt-1.5 text-ink-2">
        {
          {
            two: "Tap an animal that is awake now. Say its name.",
            four: "Tap every animal that is awake right now. Then count them.",
            six: "Tap every animal that is awake. Then work out how many are asleep, and how many more that is.",
          }[h]
        }
      </p>
      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {f.map((e) => {
          let s = x.includes(e.slug);
          return (
            <button
              key={e.slug}
              type="button"
              onClick={() => p((t) => (t.includes(e.slug) ? t : [...t, e.slug]))}
              className={`overflow-hidden rounded-tile border-2 text-left transition ${!s ? "border-line hover:border-moss" : e.awake ? "border-moss bg-moss-soft" : "border-azure/40 bg-azure/5"}`}
            >
              <span className="relative block aspect-[4/3] w-full bg-paper-2">
                <CL_ src={e.src} alt={e.name} dim={s && !e.awake} />
                {s && (
                  <span
                    className={`absolute right-1.5 top-1.5 rounded-full px-2 py-0.5 text-[11px] font-semibold ${e.awake ? "bg-moss text-paper" : "bg-azure text-paper"}`}
                  >
                    {e.awake ? "awake" : "asleep"}
                  </span>
                )}
              </span>
              <span className="block px-3 py-2">
                <span className="block text-sm font-medium leading-snug">{e.name}</span>
                {s && <span className="mt-1 block text-xs leading-snug text-ink-2">{e.where}</span>}
              </span>
            </button>
          );
        })}
      </div>
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-line/70 pt-4">
        <p className="text-sm" aria-live="polite">
          {v ? (
            <span className="font-medium text-moss-2">
              {k}
              {" awake, "}
              {f.length - k}
              {" asleep"}
              {"six" === h ? ` — ${Math.abs(2 * k - f.length)} more ${2 * k > f.length ? "awake than asleep" : "asleep than awake"}.` : "."}
            </span>
          ) : (
            <span className="text-ink-2">
              {N}
              {" found. Turn a card over and it tells you where that animal actually is."}
            </span>
          )}
        </p>
        <button
          type="button"
          onClick={() => u((e) => e + 1)}
          className="rounded-full bg-moss px-4 py-2 text-sm font-medium text-paper transition hover:bg-moss-2"
        >
          Different animals
        </button>
      </div>
      <p className="mt-3 text-[11px] leading-snug text-ink-2">
        {
          "Where each animal is comes from the day-rhythm table behind the fishing and garden pages. Photographs are openly licensed observations by iNaturalist contributors: "
        }
        {[...new Set(f.map((e) => e.credit))].join("; ")}.
      </p>
    </section>
  );
};
