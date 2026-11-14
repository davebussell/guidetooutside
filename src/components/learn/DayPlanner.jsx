"use client";
// Restored from client module 26788 (exports: DayPlanner)
import * as t from "react/jsx-runtime";
import * as s from "react";
import * as n from "next/link";
import * as l from "next/image";
import * as i from "@/lib/learn/activities";
import * as a from "@/components/learn/ActivityArt";
import * as x from "@/lib/plan-today";
import * as p from "@/components/learn/family";
let r = "gto:pack:v1";
function CO_({ plan: e, minutes: n, weather: l, date: i, onOpenPlan: c, onAddMore: m, justAdded: h }) {
  let [x, p] = (0, s.useState)(false),
    [u, b] = (0, s.useState)(null),
    [f, g] = (0, s.useState)([]),
    [y, j] = (0, s.useState)(false),
    [k, v] = (0, s.useState)(0),
    w = (0, s.useRef)(0),
    N = (0, s.useId)(),
    C = (0, s.useMemo)(
      () =>
        (function (e, t, s) {
          let n,
            l,
            i,
            a = new Map();
          for (let t of e)
            for (let e of t.need) {
              let s = e
                  .toLowerCase()
                  .replace(/[^a-z0-9 ]/g, "")
                  .trim(),
                n = a.get(s);
              n
                ? n.from.push(t.title)
                : a.set(s, {
                    text: e,
                    from: [t.title],
                    kind: "activity",
                  });
            }
          let r = [...a.values()];
          for (let e of ((n = []),
          (l = null != t.tempC ? t.tempC <= 5 : "winter" === t.season),
          (i = null != t.tempC ? t.tempC >= 22 : "summer" === t.season),
          s >= 45 &&
            n.push({
              text: "Water bottles",
              from: ["the day"],
              kind: "always",
            }),
          s >= 60 &&
            n.push({
              text: "Snacks",
              from: ["the day"],
              kind: "always",
            }),
          "rain" === t.sky &&
            n.push({
              text: "Rain boots and raincoats",
              from: ["the weather"],
              kind: "weather",
            }),
          ("snow" === t.sky || l) &&
            n.push({
              text: "Hats, mitts and warm layers",
              from: ["the weather"],
              kind: "weather",
            }),
          "snow" === t.sky &&
            n.push({
              text: "Snow pants and a spare pair of mitts",
              from: ["the weather"],
              kind: "weather",
            }),
          "sun" === t.sky &&
            i &&
            n.push({
              text: "Sun hats and sunscreen",
              from: ["the weather"],
              kind: "weather",
            }),
          ("summer" === t.season || ("spring" === t.season && i)) &&
            n.push({
              text: "Bug spray",
              from: ["the season"],
              kind: "weather",
            }),
          s >= 120 &&
            n.push({
              text: "A small first-aid kit and wipes",
              from: ["the day"],
              kind: "always",
            }),
          n)) {
            let t = e.text
              .toLowerCase()
              .replace(/[^a-z0-9 ]/g, "")
              .trim();
            [...a.keys()].some((e) => e.includes(t.split(" ")[0]) && t.split(" ")[0].length > 3) || r.push(e);
          }
          return r;
        })(e, l, n),
      [e, l, n],
    ),
    S = e.reduce((e, t) => e + t.minutes, 0);
  ((0, s.useEffect)(() => {
    try {
      let e = localStorage.getItem(r),
        t = e ? JSON.parse(e) : null;
      t && t.date === i && g(t.packed);
    } catch {}
    j(true);
  }, [i]),
    (0, s.useEffect)(() => {
      if (y)
        try {
          localStorage.setItem(
            r,
            JSON.stringify({
              date: i,
              packed: f,
            }),
          );
        } catch {}
    }, [y, i, f]),
    (0, s.useEffect)(() => {
      (C.length > w.current && v((e) => e + 1), (w.current = C.length));
    }, [C.length]),
    (0, s.useEffect)(() => {
      if (!h) return;
      let t = e.find((e) => e.id === h);
      if (!t) return;
      (b(`${t.title} is in the bag`), v((e) => e + 1));
      let s = window.setTimeout(() => b(null), 2600);
      return () => window.clearTimeout(s);
    }, [h, e]),
    (0, s.useEffect)(() => {
      if (!x) return;
      let e = (e) => {
        "Escape" === e.key && p(false);
      };
      document.addEventListener("keydown", e);
      let t = document.body.style.overflow;
      return (
        (document.body.style.overflow = "hidden"),
        () => {
          (document.removeEventListener("keydown", e), (document.body.style.overflow = t));
        }
      );
    }, [x]));
  let $ = Math.min(1, C.length / 10),
    A = C.filter((e) => f.includes(e.text)).length;
  return (
    <>
      {u && (
        <div
          role="status"
          className="fixed bottom-[calc(max(env(safe-area-inset-bottom),16px)+72px)] right-[max(env(safe-area-inset-right),16px)] z-40 rounded-card border border-moss/40 bg-surface px-4 py-2.5 text-sm font-semibold text-ink shadow-lift motion-safe:animate-[gtoHop_.5s_ease-out] print:hidden"
        >
          {"✓ "}
          {u}
        </div>
      )}
      <button
        type="button"
        onClick={() => p(true)}
        aria-haspopup="dialog"
        aria-expanded={x}
        aria-label={`Open the backpack: ${C.length} things to pack for ${e.length} ${1 === e.length ? "activity" : "activities"}`}
        className="group fixed bottom-[max(env(safe-area-inset-bottom),16px)] right-[max(env(safe-area-inset-right),16px)] z-40 flex items-center gap-2 rounded-full border border-edge bg-surface py-1.5 pl-1.5 pr-4 shadow-lift transition hover:border-moss print:hidden"
      >
        <span key={k} className="relative block h-12 w-12 motion-safe:animate-[gtoHop_.5s_ease-out]">
          <CD_ fill={$} />
          {C.length > 0 && (
            <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-rust px-1 text-[11px] font-bold text-surface">
              {C.length}
            </span>
          )}
        </span>
        <span className="text-left leading-tight">
          <span className="block text-sm font-semibold text-ink">Backpack</span>
          <span className="block text-[11px] text-ink-2">
            {0 === e.length ? "nothing planned yet" : A === C.length && C.length > 0 ? "all packed!" : `${A}/${C.length} packed`}
          </span>
        </span>
        <style>
          {
            "@keyframes gtoHop { 0%{transform:translateY(0) scale(1)} 35%{transform:translateY(-8px) scale(1.08)} 70%{transform:translateY(0) scale(.96)} 100%{transform:translateY(0) scale(1)} }"
          }
        </style>
      </button>
      {x && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-ink/40 p-0 sm:items-center sm:p-6"
          onMouseDown={(e) => e.target === e.currentTarget && p(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={N}
            className="gto-solid max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-[var(--radius-card)] border border-line bg-surface p-5 shadow-lift motion-safe:animate-settle sm:rounded-card sm:p-7"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="block h-14 w-14">
                  <CD_ fill={$} />
                </span>
                <div>
                  <p className="eyebrow text-moss">Today&apos;s backpack</p>
                  <h2 id={N} className="font-display text-2xl font-semibold leading-tight sm:text-3xl">
                    {0 === e.length ? "Nothing in it yet" : `${C.length} things to pack`}
                  </h2>
                </div>
              </div>
              <button
                type="button"
                onClick={() => p(false)}
                aria-label="Close"
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-edge text-ink-2 hover:text-ink"
              >
                ✕
              </button>
            </div>
            {0 === e.length ? (
              <div className="mt-4">
                <p className="text-ink-2">Pick a mood above and the bag starts filling — or choose the activities yourself.</p>
                {m && (
                  <button
                    type="button"
                    onClick={() => {
                      (p(false), m());
                    }}
                    className="mt-3 rounded-full bg-moss px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-moss-2"
                  >
                    + Add an activity
                  </button>
                )}
              </div>
            ) : (
              <div className="mt-6 grid gap-8 md:grid-cols-[1fr_1.1fr]">
                <section>
                  <p className="eyebrow">The plan</p>
                  <p className="mt-1 text-sm text-ink-2">
                    {e.length} {1 === e.length ? "thing" : "things"}
                    {" · about "}
                    {S >= 60 ? `${Math.floor(S / 60)} hr${S % 60 ? ` ${S % 60} min` : ""}` : `${S} min`}
                  </p>
                  <ol className="mt-3 grid gap-2">
                    {e.map((e, s) => (
                      <li key={e.id} className="flex items-center gap-3 rounded-tile border border-line bg-paper-2/60 px-3 py-2">
                        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-moss text-sm font-bold text-paper">
                          {s + 1}
                        </span>
                        <a.ActivityArt art={e.art} className="h-9 w-9 shrink-0" />
                        <span className="min-w-0">
                          <span className="block font-semibold leading-tight text-ink">{e.title}</span>
                          <span className="block text-xs text-ink-2">
                            {e.minutes}
                            {" min · "}
                            {e.where.join(" or ")}
                          </span>
                        </span>
                      </li>
                    ))}
                  </ol>
                  <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
                    {m && (
                      <button
                        type="button"
                        onClick={() => {
                          (p(false), m());
                        }}
                        className="rounded-full bg-moss px-4 py-2 text-sm font-semibold text-white transition hover:bg-moss-2"
                      >
                        + Add another
                      </button>
                    )}
                    {c && (
                      <button
                        type="button"
                        onClick={() => {
                          (p(false), c());
                        }}
                        className="text-sm font-medium text-moss hover:underline"
                      >
                        Change the plan →
                      </button>
                    )}
                  </div>
                </section>
                <section>
                  <div className="flex items-baseline justify-between">
                    <p className="eyebrow">Pack</p>
                    <span className="text-xs text-ink-2">
                      {A}
                      {" of "}
                      {C.length}
                      {" in the bag"}
                    </span>
                  </div>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-paper-2">
                    <div
                      className="h-full rounded-full bg-moss transition-all"
                      style={{
                        width: `${C.length ? (A / C.length) * 100 : 0}%`,
                      }}
                    />
                  </div>
                  <ul className="mt-3 grid gap-1.5">
                    {C.map((e) => {
                      let s = f.includes(e.text);
                      return (
                        <li key={e.text}>
                          <label
                            className={`flex cursor-pointer items-start gap-3 rounded-tile border px-3 py-2 transition ${s ? "border-moss/50 bg-moss-soft" : "border-line bg-surface/60"}`}
                          >
                            <input
                              type="checkbox"
                              checked={s}
                              onChange={() => {
                                let t;
                                return ((t = e.text), g((e) => (e.includes(t) ? e.filter((e) => e !== t) : [...e, t])));
                              }}
                              className="mt-1 h-4 w-4 accent-moss"
                            />
                            <span className="min-w-0">
                              <span className={`block text-[15px] leading-snug ${s ? "text-ink-2 line-through" : "text-ink"}`}>
                                {e.text}
                              </span>
                              <span className="block text-xs text-ink-2">
                                {"for "}
                                {e.from.slice(0, 2).join(" and ")}
                                {e.from.length > 2 ? ` and ${e.from.length - 2} more` : ""}
                              </span>
                            </span>
                          </label>
                        </li>
                      );
                    })}
                  </ul>
                  {A === C.length && C.length > 0 && (
                    <p className="mt-3 rounded-tile bg-gold-fill/20 px-3 py-2 text-sm font-semibold text-ink">All packed. Out you go!</p>
                  )}
                  <div className="mt-4 flex gap-2">
                    <button
                      type="button"
                      onClick={() => g([])}
                      className="rounded-full border border-edge px-3 py-1.5 text-xs text-ink-2 hover:text-ink"
                    >
                      Unpack all
                    </button>
                    <button
                      type="button"
                      onClick={() => window.print()}
                      className="rounded-full border border-edge px-3 py-1.5 text-xs text-ink-2 hover:text-ink"
                    >
                      Print the list
                    </button>
                  </div>
                </section>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
function CD_({ fill: e }) {
  let s = Math.round(44 * e);
  return (
    <svg viewBox="0 0 64 64" className="h-full w-full" aria-hidden="true">
      <defs>
        <clipPath id="bp-body">
          <path d="M14 22 Q14 12 32 12 Q50 12 50 22 L52 50 Q52 58 44 58 L20 58 Q12 58 12 50 Z" />
        </clipPath>
      </defs>
      <path d="M24 14 Q22 6 32 6 Q42 6 40 14" fill="none" stroke="#6b4b2b" strokeWidth="4" strokeLinecap="round" />
      <path d="M14 22 Q14 12 32 12 Q50 12 50 22 L52 50 Q52 58 44 58 L20 58 Q12 58 12 50 Z" fill="#c97f3d" />
      <g clipPath="url(#bp-body)">
        <rect x="10" y={58 - s} width="46" height={s} fill="#8fb05a" />
        <rect x="10" y={58 - s} width="46" height="3" fill="#6f9a52" opacity="0.8" />
      </g>
      <path d="M14 22 Q32 10 50 22 L50 30 Q32 24 14 30 Z" fill="#a8622c" />
      <rect x="21" y="36" width="22" height="16" rx="5" fill="#a8622c" />
      <rect x="29" y="29" width="6" height="8" rx="2" fill="#f2b53a" />
      <circle cx="32" cy="44" r="2.2" fill="#f2b53a" />
    </svg>
  );
}
let c = {
    1: "calm",
    2: "walking",
    3: "running",
  },
  m = {
    0: "clean",
    1: "a bit messy",
    2: "muddy",
  };
function CH_({ input: e, inPlan: n, added: l, onAdd: r, onRemove: o, onClose: d }) {
  let [x, p] = (0, s.useState)(""),
    [u, b] = (0, s.useState)("fits"),
    [f, g] = (0, s.useState)(null),
    y = (0, s.useId)();
  (0, s.useEffect)(() => {
    let e = (e) => {
      "Escape" === e.key && d();
    };
    document.addEventListener("keydown", e);
    let t = document.body.style.overflow;
    return (
      (document.body.style.overflow = "hidden"),
      () => {
        (document.removeEventListener("keydown", e), (document.body.style.overflow = t));
      }
    );
  }, [d]);
  let j = (0, s.useMemo)(() => i.ACTIVITIES.filter((e) => false !== e.ready), []),
    k = (0, s.useMemo)(
      () =>
        new Set(
          j
            .filter((t) =>
              (0, i.fits)(t, {
                ...e,
                skip: [],
              }),
            )
            .map((e) => e.id),
        ),
      [j, e],
    ),
    v = (0, s.useMemo)(() => {
      let e = x.toLowerCase().split(/\s+/).filter(Boolean);
      return j
        .filter((e) => "all" === u || k.has(e.id))
        .filter((e) => !f || e.interests.includes(f))
        .filter(
          (t) =>
            !e.length || e.every((e) => `${t.title} ${t.pitch} ${t.need.join(" ")} ${t.interests.join(" ")}`.toLowerCase().includes(e)),
        )
        .sort((e, t) => Number(k.has(t.id)) - Number(k.has(e.id)) || e.title.localeCompare(t.title));
    }, [j, k, u, f, x]),
    w = (0, s.useMemo)(() => {
      let e = new Set(j.flatMap((e) => e.interests));
      return i.INTERESTS.filter((t) => e.has(t.key));
    }, [j]);
  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-ink/40 p-0 sm:items-center sm:p-6"
      onMouseDown={(e) => e.target === e.currentTarget && d()}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={y}
        className="gto-solid flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-t-[var(--radius-card)] border border-line bg-surface shadow-lift motion-safe:animate-settle sm:rounded-card"
      >
        <div className="border-b border-line/70 p-5 sm:px-7 sm:pt-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="eyebrow text-moss">Add to today</p>
              <h2 id={y} className="font-display text-2xl font-semibold leading-tight sm:text-3xl">
                What else shall we do?
              </h2>
              <p className="mt-1 text-sm text-ink-2">
                {"Tap "}
                <span className="font-semibold text-ink">Add</span>
                {" and it goes in the plan and the backpack. Add as many as you like."}
              </p>
            </div>
            <button
              type="button"
              onClick={d}
              aria-label="Close"
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-edge text-ink-2 hover:text-ink"
            >
              ✕
            </button>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <input
              type="search"
              value={x}
              onChange={(e) => p(e.target.value)}
              placeholder="Search: puddles, leaves, counting…"
              aria-label="Search activities"
              className="min-w-0 flex-1 rounded-full border border-edge bg-surface px-4 py-2 text-[15px] outline-none focus:border-moss"
            />
            <div className="grid grid-cols-2 gap-1 rounded-full border border-edge bg-paper/60 p-1 text-[13px] font-medium">
              {[
                ["fits", `Fits today \xb7 ${k.size}`],
                ["all", `Everything \xb7 ${j.length}`],
              ].map(([e, s]) => (
                <button
                  key={e}
                  type="button"
                  aria-pressed={u === e}
                  onClick={() => b(e)}
                  className={`rounded-full px-3 py-1.5 transition ${u === e ? "bg-moss text-white" : "text-ink-2 hover:text-moss"}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-3 flex gap-1.5 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <button
              type="button"
              aria-pressed={null === f}
              onClick={() => g(null)}
              className={`shrink-0 rounded-full border px-3 py-1 text-xs font-medium transition ${null === f ? "border-moss bg-moss text-white" : "border-edge text-ink-2 hover:border-moss"}`}
            >
              Anything
            </button>
            {w.map((e) => (
              <button
                key={e.key}
                type="button"
                aria-pressed={f === e.key}
                onClick={() => g(f === e.key ? null : e.key)}
                className={`shrink-0 rounded-full border px-3 py-1 text-xs font-medium transition ${f === e.key ? "border-moss bg-moss text-white" : "border-edge text-ink-2 hover:border-moss"}`}
              >
                {e.label}
              </button>
            ))}
          </div>
        </div>
        <ul className="min-h-0 flex-1 overflow-y-auto p-3 sm:p-5">
          {0 === v.length && (
            <li className="p-6 text-center text-ink-2">
              Nothing matches that.{" "}
              {"fits" === u && (
                <button type="button" onClick={() => b("all")} className="font-medium text-moss underline hover:no-underline">
                  Look through everything
                </button>
              )}
            </li>
          )}
          {v.map((s) => {
            let i = n.has(s.id),
              d = l.has(s.id),
              h = k.has(s.id)
                ? null
                : s.seasons && !s.seasons.includes(e.season)
                  ? `a ${s.seasons.join(" or ")} thing`
                  : s.mess > e.mess
                    ? "messier than today allows"
                    : s.sunny && !e.sunny
                      ? "needs a sunny day"
                      : s.where.some((t) => e.where.includes(t))
                        ? e.rainy || e.snowy
                          ? "not one for this weather"
                          : null
                        : `needs ${s.where.join(" or ")}`;
            return (
              <li
                key={s.id}
                className={`flex items-center gap-3 rounded-tile border px-3 py-2.5 transition sm:gap-4 ${i ? "border-moss/50 bg-moss-soft" : "border-transparent hover:border-line"}`}
              >
                <a.ActivityArt art={s.art} className="h-14 w-14 shrink-0 sm:h-16 sm:w-16" />
                <div className="min-w-0 flex-1">
                  <p className="font-display text-[17px] font-semibold leading-tight">{s.title}</p>
                  <p className="mt-0.5 truncate text-sm text-ink-2">{s.pitch}</p>
                  <p className="mt-1 text-xs text-ink-2">
                    {s.minutes}
                    {" min · "}
                    {c[s.energy]}
                    {" · "}
                    {m[s.mess]}
                    {" · "}
                    {s.where.join(" or ")}
                    {h && (
                      <span className="text-rust">
                        {" · "}
                        {h}
                      </span>
                    )}
                  </p>
                </div>
                {i ? (
                  d ? (
                    <button
                      type="button"
                      onClick={() => o(s.id)}
                      className="shrink-0 rounded-full border border-moss bg-moss px-3.5 py-2 text-sm font-semibold text-white transition hover:bg-moss-2"
                      aria-label={`Take ${s.title} out of today's plan`}
                    >
                      Added ✓
                    </button>
                  ) : (
                    <span className="shrink-0 rounded-full border border-moss/40 px-3 py-2 text-xs font-semibold text-moss">
                      In the plan
                    </span>
                  )
                ) : (
                  <button
                    type="button"
                    onClick={() => r(s.id)}
                    className="shrink-0 rounded-full border border-edge bg-surface px-3.5 py-2 text-sm font-semibold text-ink transition hover:border-moss hover:text-moss"
                    aria-label={`Add ${s.title} to today's plan`}
                  >
                    + Add
                  </button>
                )}
              </li>
            );
          })}
        </ul>
        <div className="flex items-center justify-between gap-3 border-t border-line/70 px-5 py-3 sm:px-7">
          <p className="text-sm text-ink-2">{0 === l.size ? "Nothing added yet." : `${l.size} added by you \xb7 in the backpack.`}</p>
          <button
            type="button"
            onClick={d}
            className="rounded-full bg-moss px-5 py-2 text-sm font-semibold text-white transition hover:bg-moss-2"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
let u = x.TODAY_KEY,
  b = {
    minutes: 120,
    energy: 0.55,
    where: ["yard", "park", "indoors"],
    mess: 1,
  },
  f = [
    {
      m: 30,
      label: "Half an hour",
    },
    {
      m: 60,
      label: "An hour",
    },
    {
      m: 120,
      label: "The morning",
    },
    {
      m: 300,
      label: "The whole day",
    },
  ],
  g = (e) => (e < 0.2 ? "Cosy and quiet" : e < 0.45 ? "Gentle" : e < 0.72 ? "Busy" : "Wild — run it off"),
  y = [
    {
      v: 0,
      label: "Keep it clean",
    },
    {
      v: 1,
      label: "A little mess",
    },
    {
      v: 2,
      label: "Mud welcome",
    },
  ],
  j = [
    {
      v: "sun",
      label: "Sunny",
      art: "sun",
    },
    {
      v: "cloud",
      label: "Cloudy",
      art: "cloud",
    },
    {
      v: "rain",
      label: "Rainy",
      art: "water",
    },
    {
      v: "snow",
      label: "Snowy",
      art: "snow",
    },
  ],
  k = {
    spring: "Spring",
    summer: "Summer",
    autumn: "Autumn",
    winter: "Winter",
  },
  v = [
    {
      id: "run",
      label: "Run it off",
      note: "Lots of moving",
      art: "hare",
      apply: (e) => ({
        ...e,
        energy: 0.92,
        mess: Math.max(1, e.mess),
      }),
    },
    {
      id: "cosy",
      label: "Slow and cosy",
      note: "Quiet, close to home",
      art: "book",
      apply: (e) => ({
        ...e,
        energy: 0.1,
        where: e.where.includes("indoors") ? e.where : [...e.where, "indoors"],
      }),
    },
    {
      id: "out",
      label: "A big outing",
      note: "Out for the day",
      art: "tree",
      apply: (e) => ({
        ...e,
        minutes: 300,
        energy: 0.62,
        where: ["yard", "park", "water", "indoors"],
      }),
    },
    {
      id: "quick",
      label: "Just half an hour",
      note: "Before lunch or a nap",
      art: "acorn",
      apply: (e) => ({
        ...e,
        minutes: 30,
      }),
    },
  ],
  w = {
    start: "var(--azure)",
    main: "var(--moss)",
    make: "var(--gold)",
    calm: "#6b5ca5",
    added: "#b5533c",
  },
  N = {
    1: "Sitting and looking",
    2: "Walking and gathering",
    3: "Running and jumping",
  },
  C = {
    0: "Stays clean",
    1: "A bit messy",
    2: "Change of clothes",
  };
function S(e) {
  return "rain" === e || "storm" === e ? "rain" : "snow" === e ? "snow" : "clear" === e || "partly" === e ? "sun" : "cloud";
}
let $ = {
    birds: [
      "chickadee",
      "blue-jay",
      "robin",
      "owl",
      "loon",
      "canada-goose",
      "geese-migration",
      "duck",
      "woodpecker",
      "cardinal",
      "heron",
      "hummingbird",
      "crane",
      "raven",
      "bald-eagle",
      "puffin",
    ],
    bugs: ["earthworm", "snail", "spider", "firefly", "bee", "monarch"],
    animals: [
      "squirrel",
      "chipmunk",
      "hare",
      "fox",
      "deer",
      "beaver",
      "raccoon",
      "moose",
      "black-bear",
      "porcupine",
      "skunk",
      "otter",
      "bat",
      "wolf",
    ],
    water: ["frog", "turtle", "beaver", "duck", "loon", "otter", "salmon", "trout", "heron"],
    trees: ["squirrel", "woodpecker", "chipmunk", "porcupine"],
    growing: ["bee", "monarch", "earthworm"],
  },
  A = ["trees", "sky", "rocks", "water", "stories", "growing"];
function M(e, t, s, n) {
  let l = e.animals?.length ? e.animals : e.interests.flatMap((e) => $[e] ?? []);
  for (let e of l) {
    let l = t.find((t) => !s.has(n(t)) && t.animals[0] === e);
    if (l) return l;
  }
  let i = t.find((e) => !s.has(n(e)) && e.animals.some((e) => l.includes(e)));
  return i || (e.interests.some((e) => A.includes(e)) ? (t.find((e) => !s.has(n(e)) && "animal" !== e.kind) ?? null) : null);
}
function T({
  n: e,
  p: r,
  kids: o,
  who: d,
  book: c,
  video: m,
  game: G,
  done: h,
  choosing: x,
  onSwap: u,
  onChoose: b,
  onPick: f,
  onSkip: g,
  onDone: y,
}) {
  let j = r.activity,
    [k, v] = (0, s.useState)(false),
    [S, $] = (0, s.useState)(false),
    A = w[r.slot.role],
    M = ["little", "middle", "big"]
      .map((e) => ({
        band: e,
        kids: d.filter((t) => (0, i.bandFor)(t.age) === e),
      }))
      .filter((e) => e.kids.length > 0),
    E = r.options.length <= 3 ? r.options : r.index < 3 ? r.options.slice(0, 3) : [r.options[r.index], ...r.options.slice(0, 2)];
  return (
    <li className={`card relative overflow-hidden ${h ? "ring-2 ring-moss/50" : ""}`}>
      <span
        className="absolute inset-y-0 left-0 w-1.5"
        style={{
          background: A,
        }}
        aria-hidden="true"
      />
      <div className="p-5 pl-6 sm:p-6 sm:pl-8">
        <div className="flex items-center justify-between gap-3">
          <p
            className="text-[12px] font-semibold uppercase tracking-[0.1em]"
            style={{
              color: A,
            }}
          >
            {e}
            {" · "}
            {r.slot.label}
          </p>
          {h && <p className="rounded-full bg-moss px-2.5 py-0.5 text-xs font-semibold text-white">Done ✓</p>}
        </div>
        <div className="mt-3 flex gap-4 sm:gap-5">
          <a.ActivityArt art={j.art} className="h-20 w-20 sm:h-28 sm:w-28" />
          <div className="min-w-0 flex-1">
            <h3 className="font-display text-2xl font-semibold leading-tight tracking-tight sm:text-[28px]">{j.title}</h3>
            <p className="mt-1.5 text-[15px] italic leading-snug text-ink">“{j.pitch}”</p>
            <div className="mt-2.5 flex flex-wrap gap-1.5 text-xs">
              <span className="rounded-full bg-paper-2 px-2 py-0.5 font-medium text-ink-2">
                {j.minutes}
                {" min"}
              </span>
              <span className="rounded-full bg-paper-2 px-2 py-0.5 font-medium text-ink-2">{N[j.energy]}</span>
              <span className="rounded-full bg-paper-2 px-2 py-0.5 font-medium text-ink-2">{C[j.mess]}</span>
              {j.wet && <span className="rounded-full bg-azure-soft px-2 py-0.5 font-medium text-azure">Fine in the rain</span>}
            </div>
          </div>
        </div>
        {x && (
          <div className="mt-5 rounded-tile border-2 border-dashed border-gold-fill/70 bg-gold-fill/10 p-3 sm:p-4 print:hidden">
            <p className="text-center font-display text-lg font-semibold">Which one? Let them point.</p>
            <div className="mt-3 grid grid-cols-3 gap-2 sm:gap-3">
              {E.map((e) => {
                let s = r.options.indexOf(e);
                return (
                  <button
                    key={e.id}
                    type="button"
                    onClick={() => f(e.id)}
                    className={`flex flex-col items-center rounded-tile bg-surface p-2 text-center shadow-rest transition hover:shadow-lift sm:p-3 ${s === r.index ? "ring-2 ring-moss" : ""}`}
                  >
                    <a.ActivityArt art={e.art} className="aspect-square h-auto w-full max-w-[120px]" />
                    <span className="font-display mt-2 text-[15px] font-semibold leading-tight sm:text-base">{e.title}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
        <ul className="mt-5 grid gap-3">
          {M.map((e) => {
            let s = e.kids.filter((e) => e.likes.some((e) => j.interests.includes(e)));
            return (
              <li key={e.band} className="flex gap-3">
                <span className="flex shrink-0 -space-x-2 pt-0.5">
                  {e.kids.map((e) => (
                    <p.Avatar key={e.id} kid={e} i={o.indexOf(e)} size={30} />
                  ))}
                </span>
                <p className="min-w-0 text-[15px] leading-snug">
                  <span className="font-semibold">{e.kids.map((e) => e.name).join(" & ")}</span>
                  {s.length > 0 && (
                    <span className="ml-1.5 inline-flex translate-y-[1px] items-center gap-0.5 text-xs font-medium text-rust">
                      <p.Heart className="h-3 w-3" />
                      {" loves this"}
                    </span>
                  )}
                  <span className="text-ink-2">
                    {" — "}
                    {j.bands[e.band]}
                  </span>
                </p>
              </li>
            );
          })}
        </ul>
        <div className="mt-5 grid gap-2 text-[15px] leading-snug">
          <p>
            <span className="font-semibold">{"You’ll need: "}</span>
            <span className="text-ink-2">{j.need.length ? j.need.join(" · ") : "Nothing but the children"}</span>
          </p>
          <p>
            <span className="font-semibold">{"Ask: "}</span>
            <span className="text-ink-2">{j.ask}</span>
          </p>
        </div>
        <button type="button" onClick={() => v((e) => !e)} aria-expanded={k} className="mt-3 text-sm font-semibold text-moss print:hidden">
          {k ? "Hide the steps ▴" : "How it goes ▾"}
        </button>
        <ol
          className={`${k ? "grid" : "hidden"} mt-2 list-decimal gap-1.5 pl-5 text-[15px] leading-snug text-ink-2 marker:font-semibold marker:text-moss print:grid`}
        >
          {j.steps.map((e) => (
            <li key={e}>{e}</li>
          ))}
          {j.href && (
            <li className="list-none -ml-5 mt-1 print:hidden">
              <n.default href={j.href} className="text-sm font-medium text-moss underline hover:no-underline">
                Open it →
              </n.default>
            </li>
          )}
          {j.lesson && (
            <li className="list-none -ml-5 mt-1 print:hidden">
              <n.default href={`/learn/lessons/${j.lesson}`} className="text-sm font-medium text-moss underline hover:no-underline">
                The full lesson, with the counting →
              </n.default>
            </li>
          )}
        </ol>
        {(c || m) && (
          <div className="mt-5 border-t border-line/70 pt-4">
            <p className="text-[12px] font-semibold uppercase tracking-[0.1em] text-ink-2">Read or watch after</p>
            <div className="mt-2.5 grid gap-3 sm:grid-cols-2">
              {c && (
                <div className="group flex items-center gap-3 rounded-tile p-1.5 transition hover:bg-paper-2">
                  <a
                    href={c.href}
                    target="_blank"
                    rel={c.affiliate ? "sponsored noopener noreferrer" : "noopener noreferrer"}
                    tabIndex={-1}
                    aria-hidden="true"
                    className="shrink-0"
                    {...(c.links?.[0]?.org ? { "data-gto-out": "org", "data-gto-org": c.links[0].org, "data-gto-way": "shop" } : {})}
                  >
                    {c.cover ? (
                      <span className="relative block h-16 w-12">
                        <l.default
                          src={`/books/${c.isbn}.webp`}
                          alt=""
                          fill
                          sizes="48px"
                          className="object-contain object-bottom"
                        />
                      </span>
                    ) : (
                      <a.ActivityArt art="book" className="h-14 w-12 !rounded-md" />
                    )}
                  </a>
                  <span className="min-w-0">
                    <a
                      href={c.href}
                      target="_blank"
                      rel={c.affiliate ? "sponsored noopener noreferrer" : "noopener noreferrer"}
                      className="block text-sm font-semibold leading-snug hover:text-moss"
                      {...(c.links?.[0]?.org ? { "data-gto-out": "org", "data-gto-org": c.links[0].org, "data-gto-way": "shop" } : {})}
                    >
                      {c.title}
                    </a>
                    <span className="block text-xs text-ink-2">
                      {c.author}
                      {/^\d/.test(c.ages) ? ` · ages ${c.ages}` : ` · ${c.ages.toLowerCase()}`}
                    </span>
                    {c.supports && (
                      <span className="mt-0.5 block text-[11px] font-semibold uppercase tracking-[0.08em] text-moss">
                        {"Supports "}
                        {c.supports.name}
                      </span>
                    )}
                    {c.supports && c.links?.length > 0 && (
                      <span className="mt-1 flex flex-wrap gap-x-3 gap-y-0.5 text-xs print:hidden">
                        {c.links.map((k) => (
                          <a
                            key={k.label}
                            href={k.url}
                            target="_blank"
                            rel={k.affiliate ? "sponsored noopener noreferrer" : "noopener noreferrer"}
                            title={k.title}
                            className={k.org ? "font-medium text-moss underline-offset-2 hover:underline" : "text-ink-2 underline-offset-2 hover:text-moss hover:underline"}
                            {...(k.org ? { "data-gto-out": "org", "data-gto-org": k.org, "data-gto-way": "shop" } : {})}
                          >
                            {k.label}
                          </a>
                        ))}
                      </span>
                    )}
                  </span>
                </div>
              )}
              {m && (
                <button
                  type="button"
                  onClick={() => $((e) => !e)}
                  className="group flex items-center gap-3 rounded-tile p-1.5 text-left transition hover:bg-paper-2 print:hidden"
                >
                  <span className="relative h-12 w-20 shrink-0 overflow-hidden rounded-md bg-ink/80">
                    <img
                      src={`https://i.ytimg.com/vi/${m.id}/mqdefault.jpg`}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                    <span className="absolute inset-0 flex items-center justify-center">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-surface/90 text-moss">
                        <svg viewBox="0 0 24 24" className="ml-0.5 h-3.5 w-3.5" fill="currentColor" aria-hidden="true">
                          <path d="M8 5.5v13l11-6.5z" />
                        </svg>
                      </span>
                    </span>
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold leading-snug group-hover:text-moss">{m.title}</span>
                    <span className="block text-xs text-ink-2">
                      {m.channel}
                      {m.live ? " · live" : m.minutes ? ` \xb7 ${Math.max(1, Math.round(m.minutes))} min` : ""}
                    </span>
                  </span>
                </button>
              )}
            </div>
            {S && m && (
              <div className="relative mt-3 aspect-video overflow-hidden rounded-tile bg-ink print:hidden">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${m.id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
                  title={m.title}
                  allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full"
                />
              </div>
            )}
          </div>
        )}
        <div className="mt-5 flex flex-wrap gap-2 print:hidden">
          <button
            type="button"
            onClick={u}
            disabled={r.options.length < 2}
            className="rounded-full border border-edge px-3.5 py-2 text-sm font-medium text-ink-2 transition hover:border-moss hover:text-moss disabled:opacity-40"
          >
            ↻ Something else
          </button>
          {r.options.length > 1 && (
            <button
              type="button"
              onClick={b}
              aria-expanded={x}
              className={`rounded-full border px-3.5 py-2 text-sm font-medium transition ${x ? "border-gold-fill bg-gold-fill/20 text-ink" : "border-edge text-ink-2 hover:border-gold-fill hover:text-ink"}`}
            >
              Let them choose
            </button>
          )}
          <button
            type="button"
            onClick={g}
            className="rounded-full border border-edge px-3.5 py-2 text-sm font-medium text-ink-2 transition hover:border-rust hover:text-rust"
          >
            {"added" === r.slot.role ? "Take it out" : "Not today"}
          </button>
          <button
            type="button"
            onClick={y}
            disabled={h}
            className="ml-auto rounded-full bg-moss px-4 py-2 text-sm font-semibold text-white transition hover:bg-moss-2 disabled:bg-moss/60"
          >
            {h ? "In the journal ✓" : "We did it!"}
          </button>
        </div>
      </div>
    </li>
  );
}
export const DayPlanner = function ({ info: e }) {
  let l,
    r = (0, p.useFamily)(),
    d = r.store,
    [c, m] = (0, s.useState)(b),
    [w, N] = (0, s.useState)(x.EMPTY_DAY),
    [C, $] = (0, s.useState)(false),
    [A, E] = (0, s.useState)(null),
    [L, O] = (0, s.useState)(() => S(e.sky)),
    [I, P] = (0, s.useState)(e.season),
    [D, _] = (0, s.useState)(null),
    [z, Q] = (0, s.useState)(false),
    [R, Y] = (0, s.useState)(null),
    [W, F] = (0, s.useState)(null),
    [B, H] = (0, s.useState)(false),
    [q, K] = (0, s.useState)(null),
    J = (0, s.useRef)(null);
  ((0, s.useEffect)(() => {
    let e = (0, x.isoToday)(),
      t = null,
      s = null;
    try {
      let n = localStorage.getItem(u);
      if (n) {
        let l = JSON.parse(n);
        (l.settings &&
          (t = {
            ...b,
            ...l.settings,
          }),
          l.day?.date === e && (s = (0, x.readToday)()));
      }
    } catch {}
    (t && m(t),
      N(
        s ?? {
          ...x.EMPTY_DAY,
          date: e,
        },
      ),
      E(
        new Date().toLocaleDateString(undefined, {
          weekday: "long",
          month: "long",
          day: "numeric",
        }),
      ),
      $(true));
  }, []),
    (0, s.useEffect)(() => {
      if (!C) return;
      let e = () => {
        let e = (0, x.readToday)();
        N((t) =>
          e.extra.join("|") === t.extra.join("|")
            ? t
            : {
                ...t,
                extra: e.extra,
                skip: e.skip,
              },
        );
      };
      return (
        window.addEventListener(x.TODAY_EVENT, e),
        window.addEventListener("storage", e),
        () => {
          (window.removeEventListener(x.TODAY_EVENT, e), window.removeEventListener("storage", e));
        }
      );
    }, [C]),
    (0, s.useEffect)(() => {
      if (C)
        try {
          localStorage.setItem(
            u,
            JSON.stringify({
              settings: c,
              day: w,
            }),
          );
        } catch {}
    }, [C, c, w]));
  let V = (e) => {
      (m((t) =>
        "function" == typeof e
          ? e(t)
          : {
              ...t,
              ...e,
            },
      ),
        Y(null),
        F(null));
    },
    { minutes: U, energy: Z, where: G, mess: X } = c,
    { kids: ee, example: et } = r,
    es = (0, s.useMemo)(() => {
      let e = ee.filter((e) => e.here);
      return e.length ? e : ee;
    }, [ee]),
    en = (0, s.useMemo)(() => [...new Set(es.flatMap((e) => e.likes))], [es]),
    el = Math.max(...es.map((e) => e.age)),
    ei = (0, s.useMemo)(
      () => ({
        kids: es.map(({ id: e, name: t, age: s }) => ({
          id: e,
          name: t,
          age: s,
        })),
        minutes: U,
        energy: Z,
        where: G,
        interests: en,
        loves: es.map((e) => e.likes).filter((e) => e.length > 0),
        mess: X,
        season: I,
        rainy: "rain" === L,
        snowy: "snow" === L,
        sunny: "sun" === L,
        picks: w.picks,
        skip: w.skip,
      }),
      [es, U, Z, G, en, X, I, L, w.picks, w.skip],
    ),
    ea = (0, s.useMemo)(() => (0, i.withAdded)((0, i.planDay)(ei), w.extra), [ei, w.extra]),
    er = (0, s.useMemo)(() => new Set(ea.map((e) => e.activity.id)), [ea]),
    eo = (0, s.useMemo)(() => new Set(w.extra), [w.extra]),
    ed = ea.filter((e) => "added" === e.slot.role).length,
    ec = (e) =>
      N((t) => ({
        ...t,
        extra: t.extra.filter((t) => t !== e),
      })),
    em = (0, s.useCallback)(() => H(false), []),
    eh = (0, s.useMemo)(() => {
      let t = new Set(),
        s = new Set(),
        // The Big Outside's games appear only here, as a "play after", and at most once a day.
        g = new Set();
      return ea.map((n) => {
        let l = e.books.filter((e) => (parseInt(e.ages, 10) || 0) <= Math.max(3, el + 1)),
          i = M(n.activity, l, t, (e) => e.isbn);
        i && t.add(i.isbn);
        let a = M(n.activity, e.videos, s, (e) => e.id);
        // The games moved off this site (14 November 2026): nothing is offered to play after.
        let o = null;
        return (
          a && s.add(a.id),
          o && g.add(o.slug),
          {
            book: i,
            video: a,
            game: o,
          }
        );
      });
    }, [ea, e.books, e.videos, el]),
    ex = ea.reduce((e, t) => e + t.activity.minutes, 0),
    ep = (e, t) =>
      N((s) => {
        let n = [...s.picks];
        for (; n.length <= e;) n.push(null);
        return (
          (n[e] = t),
          {
            ...s,
            picks: n,
          }
        );
      }),
    eu = "US" === e.country ? "F" : "C",
    eb = {
      sun: "sunny",
      cloud: "cloudy",
      rain: "rainy",
      snow: "snowy",
    }[S(e.sky)],
    ef = f.reduce((e, t) => (Math.abs(t.m - U) < Math.abs(e.m - U) ? t : e)).label,
    eg = f.findIndex((e) => e.label === ef);
  return (
    <section id="today" className="scroll-mt-24">
      <div className="print:hidden">
        <p className="text-sm font-medium text-ink-2">
          {A ?? "Today"}
          {e.placeName && (
            <>
              {" · "}
              {null != e.tempC ? `${null == (l = e.tempC) ? null : "F" === eu ? Math.round((9 * l) / 5 + 32) : l}\xb0${eu} and ${eb}` : eb}
              {" in "}
              {e.placeName}
            </>
          )}
          {" · "}
          {k[e.season].toLowerCase()}
        </p>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {v.map((e) => (
            <button
              key={e.id}
              type="button"
              aria-pressed={W === e.id}
              onClick={() => {
                (V(e.apply),
                  F(e.id),
                  N((e) => ({
                    ...e,
                    picks: [],
                  })),
                  window.matchMedia("(max-width: 1023px)").matches &&
                    window.setTimeout(
                      () =>
                        J.current?.scrollIntoView({
                          behavior: "smooth",
                          block: "start",
                        }),
                      50,
                    ));
              }}
              className={`card group flex items-center gap-3 p-3 text-left transition hover:shadow-lift hover:border-moss ${W === e.id ? "border-moss ring-2 ring-moss/40" : ""}`}
            >
              <a.ActivityArt art={e.art} className="h-14 w-14 transition group-hover:rotate-[-4deg] sm:h-16 sm:w-16" />
              <span className="min-w-0">
                <span className="font-display block text-[17px] font-semibold leading-tight group-hover:text-moss">{e.label}</span>
                <span className="mt-0.5 block text-xs text-ink-2">{W === e.id ? "Plan below ✓" : e.note}</span>
              </span>
            </button>
          ))}
        </div>
      </div>
      <div className="mt-6 grid items-start gap-6 lg:grid-cols-[minmax(0,370px)_minmax(0,1fr)]">
        <div className="card grid gap-6 p-5 sm:p-6 lg:sticky lg:top-24 print:hidden">
          <div>
            <p.Label aside={et ? "Tap one to make it yours" : undefined}>Who’s coming</p.Label>
            <div className="mt-3">
              <p.KidChips
                kids={ee}
                selected={D}
                onSelect={(e) => _(D === e ? null : e)}
                editing={D}
                onEdit={_}
                onAdd={() => {
                  (_(r.add("New one", 4).id), Y(null));
                }}
              />
            </div>
            {ee.map((e, s) =>
              D === e.id ? (
                <p.KidEditor
                  key={e.id}
                  kid={e}
                  i={s}
                  onChange={(t) => {
                    (r.update(e.id, t), Y(null), F(null));
                  }}
                  onRemove={() => {
                    (r.remove(e.id), _(null));
                  }}
                  onDone={() => _(null)}
                  canRemove={ee.length > 1}
                />
              ) : null,
            )}
          </div>
          <div>
            <p.Label aside={ef}>How long</p.Label>
            <input
              type="range"
              min={0}
              max={f.length - 1}
              step={1}
              value={eg}
              onChange={(e) =>
                V({
                  minutes: f[Number(e.target.value)].m,
                })
              }
              aria-label="How long"
              aria-valuetext={ef}
              className="gto-range mt-3 w-full"
            />
            <div className="mt-1 flex justify-between text-[11px] text-ink-2">
              <span>30 min</span>
              <span>1 hr</span>
              <span>Morning</span>
              <span>All day</span>
            </div>
          </div>
          <div>
            <p.Label aside={g(Z)}>Energy</p.Label>
            <input
              type="range"
              min={0}
              max={100}
              value={Math.round(100 * Z)}
              onChange={(e) =>
                V({
                  energy: Number(e.target.value) / 100,
                })
              }
              aria-label="Energy"
              aria-valuetext={g(Z)}
              className="gto-range mt-3 w-full"
            />
            <div className="mt-1 flex justify-between text-[11px] text-ink-2">
              <span>Calm</span>
              <span>Wild</span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => Q((e) => !e)}
            aria-expanded={z}
            className="-mt-2 flex items-center justify-between rounded-lg border border-line px-3 py-2 text-sm font-medium text-ink-2 lg:hidden"
          >
            Where, mess and weather<span className={`transition ${z ? "rotate-180" : ""}`}>▾</span>
          </button>
          <div className={`${z ? "grid" : "hidden"} gap-6 lg:grid`}>
            <div>
              <p.Label>Where</p.Label>
              <div className="mt-3 flex flex-wrap gap-2">
                {i.SPOTS.map((e) => (
                  <p.Chip
                    key={e.key}
                    on={G.includes(e.key)}
                    onClick={() => {
                      let t = G.includes(e.key) ? G.filter((t) => t !== e.key) : [...G, e.key];
                      t.length &&
                        V({
                          where: t,
                        });
                    }}
                  >
                    {e.label}
                  </p.Chip>
                ))}
              </div>
            </div>
            <div>
              <p.Label>Mess</p.Label>
              <div className="mt-3 grid grid-cols-3 gap-1 rounded-full border border-edge bg-paper/60 p-1">
                {y.map((e) => (
                  <button
                    key={e.v}
                    type="button"
                    aria-pressed={X === e.v}
                    onClick={() =>
                      V({
                        mess: e.v,
                      })
                    }
                    className={`rounded-full px-2 py-1.5 text-[13px] font-medium transition ${X === e.v ? "bg-moss text-white" : "text-ink-2 hover:text-moss"}`}
                  >
                    {e.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p.Label aside={e.placeName && S(e.sky) === L ? `Like ${e.placeName} now` : undefined}>The weather</p.Label>
              <div className="mt-3 grid grid-cols-4 gap-2">
                {j.map((e) => (
                  <button
                    key={e.v}
                    type="button"
                    aria-pressed={L === e.v}
                    onClick={() => {
                      (O(e.v), Y(null));
                    }}
                    className={`flex flex-col items-center gap-1 rounded-tile border p-1.5 text-xs font-medium transition ${L === e.v ? "border-moss bg-moss-soft text-ink" : "border-line text-ink-2 hover:border-moss"}`}
                  >
                    <a.ActivityArt art={e.art} className="h-10 w-10 !rounded-lg" />
                    {e.label}
                  </button>
                ))}
              </div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {Object.keys(k).map((e) => (
                  <p.Chip key={e} on={I === e} onClick={() => P(e)} className="!px-2.5 !py-1 !text-xs">
                    {k[e]}
                  </p.Chip>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div ref={J} className="scroll-mt-20">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">Today’s plan</h2>
              <p className="mt-1 text-sm text-ink-2">
                {ea.length} {1 === ea.length ? "thing" : "things"}
                {" · about"} {ex >= 60 ? `${Math.floor(ex / 60)} hr ${ex % 60 ? `${ex % 60} min` : ""}` : `${ex} min`}
                {en.length > 0 && (
                  <>
                    {" "}
                    {"· leaning towards what "}
                    {1 === es.length ? es[0].name : "they"}
                    {" love"}
                    {1 === es.length ? "s" : ""}
                  </>
                )}
              </p>
            </div>
            <div className="flex gap-2 print:hidden">
              <button
                type="button"
                onClick={() => {
                  (N((e) => ({
                    ...e,
                    picks: ea.map((e) => e.options[Math.floor(Math.random() * e.options.length)].id),
                  })),
                    Y(null));
                }}
                className="rounded-full border border-gold-fill bg-gold-fill/15 px-4 py-2 text-sm font-semibold text-ink transition hover:bg-gold-fill/30"
              >
                Surprise me
              </button>
              <button
                type="button"
                onClick={() => window.print()}
                className="rounded-full border border-edge px-4 py-2 text-sm font-medium text-ink-2 transition hover:border-moss hover:text-moss"
              >
                Print
              </button>
            </div>
          </div>
          {0 === ea.length ? (
            <div className="card mt-5 p-6 text-center">
              <a.ActivityArt art="cloud" className="mx-auto h-20 w-20" />
              <p className="font-display mt-3 text-xl font-semibold">Nothing fits all of that at once</p>
              <p className="mt-1 text-sm text-ink-2">Let a little mess in, or add Indoors, and there will be plenty.</p>
              <div className="mt-4 flex justify-center gap-2">
                <p.Chip
                  on={false}
                  onClick={() =>
                    V({
                      mess: 2,
                    })
                  }
                >
                  Mud welcome
                </p.Chip>
                <p.Chip
                  on={false}
                  onClick={() =>
                    V({
                      where: [...new Set([...G, "indoors", "yard"])],
                    })
                  }
                >
                  Add indoors
                </p.Chip>
                <p.Chip on={false} onClick={() => H(true)}>
                  Choose it myself
                </p.Chip>
              </div>
            </div>
          ) : (
            <ol className="relative mt-5 grid gap-5">
              {ea.map((s, n) => (
                <T
                  key={`${n}-${s.activity.id}`}
                  n={n + 1}
                  p={s}
                  kids={ee}
                  who={es}
                  book={eh[n]?.book ?? null}
                  video={eh[n]?.video ?? null}
                  game={eh[n]?.game ?? null}
                  done={w.done.includes(s.activity.id)}
                  choosing={R === n}
                  onSwap={() => ep(n, s.options[(s.index + 1) % s.options.length].id)}
                  onChoose={() => Y(R === n ? null : n)}
                  onPick={(e) => {
                    (ep(n, e), Y(null));
                  }}
                  onSkip={() => {
                    var e;
                    return "added" === s.slot.role
                      ? ec(s.activity.id)
                      : ((e = s.activity.id),
                        void (N((t) => ({
                          ...t,
                          skip: [...t.skip, e],
                        })),
                        Y(null)));
                  }}
                  onDone={() => {
                    var t;
                    return (
                      (t = s.activity),
                      void (
                        !w.done.includes(t.id) &&
                        (d.addEntry({
                          date: w.date || (0, x.isoToday)(),
                          what: t.title,
                          count: null,
                          learner: "all",
                          where: e.placeName ?? "",
                          note: `From the day plan. ${t.ask}`,
                        }),
                        N((e) => ({
                          ...e,
                          done: [...e.done, t.id],
                        })))
                      )
                    );
                  }}
                />
              ))}
            </ol>
          )}
          <button
            type="button"
            onClick={() => H(true)}
            className="card mt-5 flex w-full items-center gap-4 border-2 border-dashed border-moss/40 bg-moss/5 p-4 text-left transition hover:border-moss hover:bg-moss-soft print:hidden sm:p-5"
          >
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-tile bg-moss text-3xl font-bold leading-none text-white sm:h-16 sm:w-16">
              +
            </span>
            <span className="min-w-0">
              <span className="font-display block text-xl font-semibold leading-tight">Add something else</span>
              <span className="mt-0.5 block text-sm text-ink-2">
                {ed ? `${ed} added by you so far. ` : ""}Pick from every activity in the book — it goes straight in the plan and the
                backpack.
              </span>
            </span>
          </button>
          {w.skip.length > 0 && (
            <p className="mt-4 text-sm text-ink-2 print:hidden">
              {w.skip.length}
              {" set aside for today."}{" "}
              <button
                type="button"
                onClick={() =>
                  N((e) => ({
                    ...e,
                    skip: [],
                  }))
                }
                className="font-medium text-moss underline hover:no-underline"
              >
                {"Bring "}
                {1 === w.skip.length ? "it" : "them"}
                {" back"}
              </button>
            </p>
          )}
          {w.done.length > 0 && (
            <p className="mt-2 text-sm text-ink-2 print:hidden">
              {w.done.length}
              {" done today and written in"}{" "}
              <n.default href="/learn/journal" className="font-medium text-moss underline hover:no-underline">
                the field journal
              </n.default>
              .
            </p>
          )}
        </div>
      </div>
      {C && (
        <CO_
          plan={ea.map((e) => e.activity)}
          minutes={U}
          weather={{
            sky: L,
            tempC: e.tempC ?? null,
            season: I,
          }}
          date={w.date || (0, x.isoToday)()}
          onOpenPlan={() =>
            J.current?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            })
          }
          onAddMore={() => H(true)}
          justAdded={q}
        />
      )}
      {B && (
        <CH_
          input={ei}
          inPlan={er}
          added={eo}
          onAdd={(e) => {
            (N((t) =>
              t.extra.includes(e)
                ? t
                : {
                    ...t,
                    extra: [...t.extra, e],
                    skip: t.skip.filter((t) => t !== e),
                  },
            ),
              K(e));
          }}
          onRemove={ec}
          onClose={em}
        />
      )}
    </section>
  );
};
