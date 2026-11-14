"use client";
/* eslint-disable @typescript-eslint/no-unused-expressions -- restored from the minified bundle: refs keep their one-letter names and statements keep the compiler's comma and && form. */
// Restored from client module 72738 (exports: MoonCounter)
import * as a from "react";
let t, s;
function r(e) {
  return String(e).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function o(e, t, s) {
  return `${e} ${1 === e ? t : s}`;
}
function i(e) {
  let t = Math.round(2 * e) / 2,
    s = Math.floor(t);
  return t % 1 ? (s ? `${r(s)}\xbd` : "½") : r(t);
}
function l(e) {
  let t = Math.round(10 * e);
  return `${r(Math.floor(t / 10))}.${t % 10}`;
}
function d(e) {
  let t = 29.530589 * e,
    s = Math.floor(t / 365.2425),
    n = Math.round(t - 365.2425 * s),
    a = s;
  n >= 365 && ((a += 1), (n = 0));
  let r = s,
    o = Math.round((t - 365.2425 * s) / 30.436875);
  return (
    12 === o && ((r += 1), (o = 0)),
    {
      days: t,
      weeks: t / 7,
      months: t / 30.436875,
      years: t / 365.2425,
      y: a,
      d: n,
      ym: r,
      mm: o,
    }
  );
}
function c(e, t) {
  return 1 === e ? "29½" : r(Math.round(t));
}
function h(e) {
  let t = Math.round(2 * e) / 2,
    s = e < t - 0.05 ? "just under" : e > t + 0.05 ? "just over" : "about";
  return `${s} ${i(t)} ${1 === t ? "month" : "months"}`;
}
function m(e) {
  let t = [];
  return (e.ym && t.push(o(e.ym, "year", "years")), e.mm && t.push(o(e.mm, "month", "months")), t.join(" ") || "less than a month");
}
let u = [1, 2, 3, 6, 12, 13, 30, 100],
  x = (e) => 84 + (e - 1) * 64 + 44,
  p = "#34405f",
  f = "#f6ecc8",
  g = "#6fa8e8",
  y = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 365].map((e) => (365.2425 * e) / 365),
  b = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
  j = (e) => Math.round((112 + (e / 365.2425) * 592) * 10) / 10,
  w = (e) => 84 + 64 * e,
  k = (() => {
    let e = [],
      t = new Map();
    for (let s = 1; s <= 100; s++) {
      let n = (s - 0.5) * 29.530589,
        a = Math.floor(n / 365.2425),
        r = n - 365.2425 * a,
        o = 0;
      for (; o < 11 && r >= y[o + 1];) o++;
      let i = `${a}-${o}`,
        l = (t.get(i) ?? 0) + 1;
      (t.set(i, l),
        e.push({
          k: s,
          row: a,
          x: j(r),
          y: w(a),
          blue: l > 1,
        }));
    }
    return e;
  })(),
  N =
    ((t = 17),
    (s = () => (t = (9301 * t + 49297) % 233280) / 233280),
    Array.from(
      {
        length: 80,
      },
      () => ({
        x: Math.round(720 * s()),
        y: Math.round(s() * x(9)),
        r: Math.round((0.8 + 1.6 * s()) * 10) / 10,
        o: Math.round((0.25 + 0.5 * s()) * 100) / 100,
      }),
    )),
  v = (() => {
    let e = [];
    for (let t = 0; t <= 100; t += 5) {
      let s = Math.abs(Math.cos((2 * Math.PI * t) / 100)),
        n = t < 25 || t >= 75 ? p : f;
      (e.push(`${t}%{transform:scaleX(${Math.max(0.001, Math.round(1e3 * s) / 1e3)});fill:${n}}`),
        (20 === t || 70 === t) && e.push(`${t + 4.9}%{transform:scaleX(0.001);fill:${n}}`));
    }
    return e.join("");
  })(),
  M = `
.mc-half{transform-box:fill-box;transform-origin:0% 50%;animation:mcHalf 4.2s linear infinite}
@keyframes mcHalf{0%,49.9%{transform:scaleX(1)}50%,100%{transform:scaleX(-1)}}
.mc-term{transform-box:fill-box;transform-origin:50% 50%;animation:mcTerm 4.2s linear infinite}
@keyframes mcTerm{${v}}
.mc-pop{transform-box:fill-box;transform-origin:center;animation:mcPop .45s cubic-bezier(.3,1.6,.5,1) both}
@keyframes mcPop{0%{transform:scale(0);opacity:0}100%{transform:scale(1);opacity:1}}
.mc-bar{transform-box:fill-box;transform-origin:0% 50%;transition:transform .3s ease}
@media (prefers-reduced-motion: reduce){.mc-half,.mc-term,.mc-pop{animation:none}.mc-bar{transition:none}}
.mc-range{-webkit-appearance:none;appearance:none;width:100%;height:44px;background:transparent;cursor:pointer;margin:0;touch-action:pan-y}
.mc-range:focus{outline:none}
.mc-range:focus-visible{outline:3px solid #2c6fb5;outline-offset:2px;border-radius:999px}
.mc-range::-webkit-slider-runnable-track{height:16px;border-radius:999px;border:1px solid #d9cfb8;background:linear-gradient(to right,#d9a441 0,#d9a441 var(--mc-fill),#e9e0cd var(--mc-fill),#e9e0cd 100%)}
.mc-range::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;width:36px;height:36px;margin-top:-11px;border-radius:50%;background:#f6ecc8;border:5px solid #34405f;box-shadow:0 2px 6px rgba(31,42,34,.3)}
.mc-range::-moz-range-track{height:16px;border-radius:999px;border:1px solid #d9cfb8;background:#e9e0cd}
.mc-range::-moz-range-progress{height:16px;border-radius:999px;background:#d9a441}
.mc-range::-moz-range-thumb{width:26px;height:26px;border-radius:50%;background:#f6ecc8;border:5px solid #34405f;box-shadow:0 2px 6px rgba(31,42,34,.3)}
`;
function $({ blue: e }) {
  return (
    <>
      {e && <circle r={24} fill="none" stroke={g} strokeWidth={4} />}
      <circle r={20} fill="#fff6d8" opacity={0.12} />
      <circle r={17} fill={p} />
      <path className="mc-half" d="M0 -17 A17 17 0 0 1 0 17 Z" fill={f} />
      <ellipse className="mc-term" rx={17} ry={17} fill={f} />
      <circle cx={-6} cy={-5} r={4.5} fill="#1f2a3a" opacity={0.09} />
      <circle cx={5} cy={6} r={3.2} fill="#1f2a3a" opacity={0.09} />
      <circle r={17} fill="none" stroke="#8d9ac0" strokeWidth={1.5} />
    </>
  );
}
export const MoonCounter = function () {
  let e,
    t = "mc" + (0, a.useId)().replace(/[^a-zA-Z0-9]/g, ""),
    [s, p] = (0, a.useState)(12),
    v = (0, a.useRef)(null),
    C = (e) => p(Math.max(1, Math.min(100, Math.round(e))));
  (0, a.useEffect)(() => {
    let e = v.current;
    if (e && "function" == typeof e.getAnimations)
      for (let t of e.getAnimations({
        subtree: true,
      }))
        t instanceof CSSAnimation && ("mcHalf" === t.animationName || "mcTerm" === t.animationName) && (t.startTime = 0);
  }, [s]);
  let S = d(s),
    A = 29.530589 * s,
    L = Math.floor((A - 1e-9) / 365.2425),
    T = j(A - 365.2425 * L),
    W = k.slice(0, s).filter((e) => e.blue).length,
    O = Math.max(2, L + 1),
    z = x(O),
    F = (function (e) {
      let t = d(e);
      if (1 === e) return "One moon, new moon to new moon, takes 29 days, 12 hours and 44 minutes on average — about 4 weeks.";
      if (12 === e)
        return "12 moons ≈ 354 days, 11 short of a year — that's why a 13th full moon (a blue moon) turns up every 2 or 3 years.";
      if (13 === e) return "13 moons ≈ 384 days — a year and 19 days. A year that fits 13 full moons has a blue moon in it.";
      let s = `${e} moons ≈ ${c(e, t.days)} days`;
      return e <= 4 ? `${s} — about ${i(t.weeks)} weeks, ${h(t.months)}.` : e < 12 ? `${s} — ${h(t.months)}.` : `${s} ≈ ${m(t)}.`;
    })(s),
    H = `${1 === s ? "One moon" : `${s} moons`} in rows, one row for each year. ${F}${W ? ` ${1 === W ? "One blue moon" : `${W} blue moons`} — a second full moon in the same calendar month.` : ""}`;
  return (
    <div className="text-ink">
      <style>{M}</style>
      <p className="font-display whitespace-nowrap text-[1.7rem] font-semibold leading-tight sm:text-4xl">
        {((e = d(s)), `${o(s, "moon", "moons")} ≈ ${c(s, e.days)} days`)}
      </p>
      <div className="mt-2 flex items-center gap-3">
        <button
          type="button"
          onClick={() => C(s - 1)}
          disabled={s <= 1}
          aria-label="One moon fewer"
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-line bg-paper text-2xl font-bold text-ink transition hover:border-azure active:scale-95 disabled:opacity-40"
        >
          −
        </button>
        <label className="block min-w-0 flex-1">
          <span className="sr-only">How many moons</span>
          <input
            type="range"
            min={1}
            max={100}
            step={1}
            value={s}
            aria-valuetext={`${o(s, "moon", "moons")}, about ${r(Math.round(S.days))} days`}
            onChange={(e) => C(Number(e.target.value))}
            className="mc-range"
            style={{
              "--mc-fill": `${((s - 1) / 99) * 100}%`,
            }}
          />
        </label>
        <button
          type="button"
          onClick={() => C(s + 1)}
          disabled={s >= 100}
          aria-label="One moon more"
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-azure text-2xl font-bold text-white shadow-sm transition hover:bg-azure-2 active:scale-95 disabled:opacity-40"
        >
          +
        </button>
      </div>
      <p aria-live="polite" className="mt-2 text-base leading-snug text-ink sm:text-lg">
        {F}
      </p>
      <div className="mt-3 overflow-hidden rounded-2xl border border-line">
        <svg ref={v} viewBox={`0 0 720 ${z}`} className="block h-auto w-full" role="img" aria-label={H}>
          <defs>
            <linearGradient id={`${t}sky`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#1b2440" />
              <stop offset="1" stopColor="#2a3558" />
            </linearGradient>
          </defs>
          <rect width={720} height={z} fill={`url(#${t}sky)`} />
          {N.filter((e) => e.y < z).map((e, t) => (
            <circle key={t} cx={e.x} cy={e.y} r={e.r} fill="#fffbe8" opacity={e.o} />
          ))}
          {b.map((e, t) => (
            <text key={t} x={j((y[t] + y[t + 1]) / 2)} y={40} textAnchor="middle" fontSize={26} fontWeight={800} fill="#cfd8ee">
              {e}
            </text>
          ))}
          {y.map((e, t) => (
            <line
              key={t}
              x1={j(e)}
              x2={j(e)}
              y1={54}
              y2={z - 14}
              stroke="#ffffff"
              strokeOpacity={0 === t || 12 === t ? 0.22 : 0.07}
              strokeWidth={2}
            />
          ))}
          {Array.from(
            {
              length: O,
            },
            (e, t) => {
              let s = w(t),
                a = Math.max(0, Math.min(1, (A - 365.2425 * t) / 365.2425));
              return (
                <g key={t} opacity={a > 0 ? 1 : 0.45}>
                  <text x={14} y={s + 8} fontSize={24} fontWeight={700} fill="#cfd8ee">
                    {"Year "}
                    {t + 1}
                  </text>
                  <rect x={112} y={s - 5} width={592} height={10} rx={5} fill="#ffffff" opacity={0.1} />
                  <rect
                    className="mc-bar"
                    x={112}
                    y={s - 5}
                    width={592}
                    height={10}
                    rx={5}
                    fill="#d9a441"
                    opacity={0.75}
                    style={{
                      transform: `scaleX(${Math.max(1e-4, Math.round(1e4 * a) / 1e4)})`,
                    }}
                  />
                </g>
              );
            },
          )}
          <g>
            <line x1={T} x2={T} y1={w(L) - 24} y2={w(L) + 24} stroke="#ffd98a" strokeWidth={3} strokeLinecap="round" />
            <circle cx={T} cy={w(L) - 26} r={5} fill="#ffd98a" />
          </g>
          {k.slice(0, s).map((e) => (
            <g key={e.k} transform={`translate(${e.x} ${e.y})`}>
              <g className="mc-pop">
                <$ blue={e.blue} />
              </g>
            </g>
          ))}
          {k
            .slice(0, s)
            .filter((e) => e.blue)
            .map((e) => (
              <text
                key={`b${e.k}`}
                x={Math.min(674, Math.max(142, e.x))}
                y={e.y - 30}
                textAnchor="middle"
                fontSize={15}
                fontWeight={800}
                fill="#9cc4f2"
              >
                blue moon
              </text>
            ))}
        </svg>
      </div>
      <dl className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {[
          ["Days", l(S.days)],
          ["Weeks", l(S.weeks)],
          ["Calendar months", l(S.months)],
          ["Years and days", S.y ? `${o(S.y, "yr", "yrs")} ${o(S.d, "day", "days")}` : o(S.d, "day", "days")],
        ].map(([e, t]) => (
          <div key={e} className="rounded-xl border border-line bg-paper-2/60 px-3 py-2">
            <dt className="eyebrow">{e}</dt>
            <dd className="font-display mt-0.5 text-xl font-semibold leading-tight">{t}</dd>
          </div>
        ))}
      </dl>
      <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm text-ink-2">
        <li className="flex items-center gap-2">
          <svg viewBox="-26 -26 52 52" className="h-6 w-6" aria-hidden="true">
            <circle r={17} fill={f} />
            <circle r={24} fill="none" stroke={g} strokeWidth={4} />
          </svg>
          Blue ring: a blue moon, the second full moon in one calendar month
        </li>
        <li className="flex items-center gap-2">
          <span className="inline-block h-2.5 w-7 rounded-full bg-gold" aria-hidden="true" />
          Gold bar: the time the moons cover
        </li>
      </ul>
      <div className="mt-5 rounded-2xl border border-line bg-paper-2/60 p-4">
        <p className="eyebrow">Quick answers</p>
        <ul className="mt-2 grid gap-1 sm:grid-cols-2 sm:gap-x-4">
          {u.map((e) => {
            let t;
            return (
              <li key={e}>
                <button
                  type="button"
                  onClick={() => C(e)}
                  aria-pressed={s === e}
                  className={`flex min-h-11 w-full items-baseline gap-2 rounded-xl px-2 py-1.5 text-left transition hover:bg-paper ${s === e ? "bg-paper ring-2 ring-gold" : ""}`}
                >
                  <span className="w-24 shrink-0 font-semibold text-ink">{o(e, "moon", "moons")}</span>
                  <span className="text-sm text-ink-2">
                    {
                      ((t = d(e)),
                      1 === e
                        ? "29.5 days — 29 days, 12 hours, 44 minutes"
                        : 12 === e
                          ? "354 days — 11 days short of a year"
                          : 13 === e
                            ? "384 days — a year and 19 days"
                            : e <= 4
                              ? `${r(Math.round(t.days))} days — about ${i(t.weeks)} weeks`
                              : e < 12
                                ? `${r(Math.round(t.days))} days — ${h(t.months)}`
                                : `${r(Math.round(t.days))} days — about ${m(t)}`)
                    }
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="mt-4 grid gap-2 text-sm leading-relaxed text-ink-2">
        <p>
          A moon here is one lunar month — new moon to new moon — which averages 29.530589 days. Real ones run up to about seven hours
          longer or shorter, because the orbits aren’t perfect circles. Each row is a calendar year, starting with a new moon on 1 January,
          and each moon sits on its full-moon day.
        </p>
        <p>In some traditions, and in many stories, “moons” simply means months: a baby “three moons old” is about three months old.</p>
      </div>
    </div>
  );
};
