"use client";
// Restored from client module 23607 (exports: Squeeze)
import * as r from "react/jsx-runtime";
import * as l from "react";
let t, s;
function i(e) {
  let t = e;
  return () => (t = (9301 * t + 49297) % 233280) / 233280;
}
let a = [
    {
      name: "Shale",
      say: null,
      from: 0,
      blurb: "Soft rock made of old mud, in thin flat layers.",
    },
    {
      name: "Slate",
      say: null,
      from: 25,
      blurb: "Squeezed tight: flat, dark and hard. It splits into thin sheets.",
    },
    {
      name: "Schist",
      say: "shist",
      from: 50,
      blurb: "The layers go wavy, and new crystals of shiny mica sparkle.",
    },
    {
      name: "Gneiss",
      say: "nice",
      from: 75,
      blurb: "The minerals sort themselves into bold light and dark stripes, all folded up.",
    },
  ],
  o = [0, 36, 61, 90];
function n(e) {
  return e < 8 ? "cool" : e < 35 ? "warm" : e < 65 ? "hot" : e < 90 ? "very hot" : "hottest";
}
function d(e) {
  return e < 8 ? "no squeeze" : e < 35 ? "gentle squeeze" : e < 65 ? "hard squeeze" : e < 90 ? "very hard squeeze" : "hardest squeeze";
}
function c(e) {
  let t = 20 + 7.3 * e;
  return t < 60 ? 10 * Math.round(t / 10) : 50 * Math.round(t / 50);
}
function h(e, t, s, r) {
  let l = [];
  for (let s = e - 12; s <= e + t + 12; s += 8) l.push(s);
  let i = [];
  for (let e = 0; e < s.length - 1; e++) {
    let t = s[e],
      a = s[e + 1],
      o = `M${l[0].toFixed(1)} ${t(l[0]).toFixed(1)}`;
    for (let e = 1; e < l.length; e++) o += `L${l[e].toFixed(1)} ${t(l[e]).toFixed(1)}`;
    for (let e = l.length - 1; e >= 0; e--) o += `L${l[e].toFixed(1)} ${a(l[e]).toFixed(1)}`;
    i.push({
      d: o + "Z",
      fill: r[e % r.length],
    });
  }
  return i;
}
let f =
    ((t = i(29)),
    Array.from(
      {
        length: 16,
      },
      () => ({
        u: 0.08 + 0.84 * t(),
        v: 0.08 + 0.84 * t(),
        s: 0.7 + 0.6 * t(),
        d: 1.8 * t(),
      }),
    )),
  x = [
    {
      dx: -56,
      w: 17,
      h: 0.55,
      d: 0.1,
    },
    {
      dx: -28,
      w: 23,
      h: 0.8,
      d: 0.35,
    },
    {
      dx: 0,
      w: 30,
      h: 1,
      d: 0,
    },
    {
      dx: 28,
      w: 23,
      h: 0.78,
      d: 0.5,
    },
    {
      dx: 56,
      w: 17,
      h: 0.5,
      d: 0.2,
    },
  ];
function p(e, t, s, r) {
  return `M${e - s} ${t} C${e - s} ${t - 0.45 * r} ${e - 0.25 * s} ${t - 0.6 * r} ${e} ${t - r} C${e + 0.25 * s} ${t - 0.6 * r} ${e + s} ${t - 0.45 * r} ${e + s} ${t} Q${e} ${t + 0.5 * s} ${e - s} ${t} Z`;
}
let u =
    ((s = i(13)),
    Array.from(
      {
        length: 26,
      },
      () => ({
        x: 800 * s(),
        y: 50 + 440 * s(),
        r: 2 + 5 * s(),
      }),
    )),
  m = `
.gto-flame{transform-box:fill-box;transform-origin:50% 100%;animation:gtoFlicker .9s ease-in-out infinite}
@keyframes gtoFlicker{0%,100%{transform:scale(1,1)}30%{transform:scale(.93,1.08)}65%{transform:scale(1.05,.94)}}
.gto-glint{transform-box:fill-box;transform-origin:center;animation:gtoTwinkle 1.8s ease-in-out infinite}
@keyframes gtoTwinkle{0%,100%{opacity:.15;transform:scale(.55)}50%{opacity:1;transform:scale(1.1)}}
.gto-stage{transition:opacity .45s ease}
@media (prefers-reduced-motion: reduce){.gto-flame,.gto-glint{animation:none}.gto-stage{transition:none}}
.gto-range{-webkit-appearance:none;appearance:none;width:100%;height:44px;background:transparent;cursor:pointer;margin:0;touch-action:pan-y}
.gto-range:focus{outline:none}
.gto-range:focus-visible{outline:3px solid #2c6fb5;outline-offset:2px;border-radius:999px}
.gto-range::-webkit-slider-runnable-track{height:16px;border-radius:999px;border:1px solid #d9cfb8;background:linear-gradient(to right,var(--gto-c) 0,var(--gto-c) var(--gto-fill),#e9e0cd var(--gto-fill),#e9e0cd 100%)}
.gto-range::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;width:36px;height:36px;margin-top:-11px;border-radius:50%;background:#fffdf8;border:5px solid var(--gto-c);box-shadow:0 2px 6px rgba(31,42,34,.3)}
.gto-range::-moz-range-track{height:16px;border-radius:999px;border:1px solid #d9cfb8;background:#e9e0cd}
.gto-range::-moz-range-progress{height:16px;border-radius:999px;background:var(--gto-c)}
.gto-range::-moz-range-thumb{width:26px;height:26px;border-radius:50%;background:#fffdf8;border:5px solid var(--gto-c);box-shadow:0 2px 6px rgba(31,42,34,.3)}
`;
function CY_({ x: e, y: t, dir: s }) {
  return (
    <g transform={`translate(${e.toFixed(1)} ${t}) scale(${s} 1)`}>
      <rect x="-122" y="-30" width="38" height="60" rx="11" fill="#1f5590" />
      <path d="M-116 -22 v44 M-106 -22 v44 M-96 -22 v44" stroke="#2c6fb5" strokeWidth="3" strokeLinecap="round" />
      <path
        d="M-92 -34 Q-92 -44 -80 -44 L-24 -44 Q0 -44 0 -18 L0 18 Q0 44 -24 44 L-80 44 Q-92 44 -92 34 Z"
        fill="#2c6fb5"
        stroke="#1d4a7c"
        strokeWidth="3"
      />
      <path d="M-62 -40 Q-54 -66 -30 -60 Q-16 -55 -24 -42 Z" fill="#2c6fb5" stroke="#1d4a7c" strokeWidth="3" strokeLinejoin="round" />
      <path d="M-80 -28 Q-86 0 -80 28" fill="none" stroke="#5a97d6" strokeWidth="4" strokeLinecap="round" />
    </g>
  );
}
function CG_({ two: e, four: t, six: s, outside: l }) {
  return (
    <div className="mt-6 rounded-2xl border border-line bg-paper-2/60 p-4 text-sm leading-snug">
      <p className="eyebrow">Say it like this</p>
      <ul className="mt-3 grid gap-2.5">
        {[
          ["2", e],
          ["4", t],
          ["6", s],
        ].map(([e, t]) => (
          <li key={e} className="flex items-start gap-3">
            <span className="mt-px inline-flex shrink-0 items-center rounded-full bg-moss/10 px-2.5 py-0.5 text-xs font-semibold text-moss">
              {"Age "}
              {e}
            </span>
            <span className="text-ink">“{t}”</span>
          </li>
        ))}
      </ul>
      <p className="mt-3 border-t border-line/70 pt-3 text-ink">
        <span className="font-semibold text-azure">{"Go outside: "}</span>
        {l}
      </p>
    </div>
  );
}
export const Squeeze = function () {
  let e = "sq" + (0, l.useId)().replace(/[^a-zA-Z0-9]/g, ""),
    [t, s] = (0, l.useState)(0),
    [i, j] = (0, l.useState)(0),
    [b, k] = (0, l.useState)(null);
  (0, l.useEffect)(() => {
    if (!b) return;
    let e = "function" == typeof window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 1 : 750,
      t = 0,
      r = -1,
      l = (i) => {
        r < 0 && (r = i);
        let a = Math.min(1, (i - r) / e),
          o = 1 - (1 - a) ** 3;
        (s(b.fromH + (b.toH - b.fromH) * o), j(b.fromS + (b.toS - b.fromS) * o), a < 1 ? (t = requestAnimationFrame(l)) : k(null));
      };
    return ((t = requestAnimationFrame(l)), () => cancelAnimationFrame(t));
  }, [b]);
  let $ = (function (e) {
      let t = 0;
      for (let s = 0; s < a.length; s++) e >= a[s].from && (t = s);
      return t;
    })(Math.min(t, i)),
    w = a[$],
    M = t >= 90 && i < 60,
    v = i >= 60 && t < 25,
    N = M ? "Too hot and it would melt — that's the volcano's rock!" : v ? "Squeezing alone isn't enough — it needs heat too." : null,
    W = (e, s) =>
      k({
        fromH: t,
        fromS: i,
        toH: e,
        toS: s,
      }),
    L = i / 100,
    C = t / 100,
    S = 300 - 80 * L,
    A = 188 + 22 * L,
    z = 470 - S / 2,
    F = 222 - A / 2,
    q = Math.round(2 + 0.28 * i),
    P = (e) => 34 + (e / 30) * 428,
    I = i < 5 ? 0 : 1 + Math.floor(2.99 * L),
    Q = `A block of ${w.name.toLowerCase()} squeezed between two hands, with a fire underneath. ${n(t)}, ${d(i)}, about ${q} kilometres down.${N ? " " + N : ""}`,
    T = (e, t, s, l, i, a) => (
      <label className="block">
        <span className="flex flex-wrap items-baseline justify-between gap-x-2">
          <span className="font-semibold text-ink">{e}</span>
          <span className="text-sm text-ink-2">{i}</span>
        </span>
        <input
          type="range"
          min={0}
          max={100}
          step={1}
          value={Math.round(t)}
          aria-label={e}
          aria-valuetext={a}
          onChange={(e) => {
            (k(null), s(Number(e.target.value)));
          }}
          className="gto-range mt-1"
          style={{
            "--gto-fill": `${t}%`,
            "--gto-c": l,
          }}
        />
      </label>
    );
  return (
    <div className="text-ink">
      <style>{m}</style>
      <div className="overflow-hidden rounded-2xl border border-line">
        <svg viewBox="0 0 800 500" className="block h-auto w-full" role="img" aria-label={Q}>
          <defs>
            <linearGradient id={`${e}earth`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#8a6a4e" />
              <stop offset="1" stopColor="#3a2a20" />
            </linearGradient>
            <radialGradient id={`${e}glow`} cx="50%" cy="60%" r="50%">
              <stop offset="0" stopColor="#ffb04a" stopOpacity="0.95" />
              <stop offset="0.55" stopColor="#ff7a2a" stopOpacity="0.35" />
              <stop offset="1" stopColor="#ff7a2a" stopOpacity="0" />
            </radialGradient>
            <linearGradient id={`${e}heat`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0.45" stopColor="#ff7a2a" stopOpacity="0" />
              <stop offset="1" stopColor="#ff5a1f" stopOpacity="1" />
            </linearGradient>
            <clipPath id={`${e}block`}>
              <rect x={z} y={F} width={S} height={A} rx="16" />
            </clipPath>
          </defs>
          <rect x="0" y="0" width="800" height="500" fill={`url(#${e}earth)`} />
          <rect x="0" y="0" width="800" height="28" fill="#cfe6f2" />
          <rect x="0" y="26" width="800" height="9" fill="#79a052" />
          {u.map((e, t) => (
            <circle key={t} cx={e.x} cy={e.y} r={e.r} fill="#2c2019" opacity="0.18" />
          ))}
          <ellipse cx={470} cy="440" rx="290" ry="170" fill={`url(#${e}glow)`} opacity={0.08 + 0.92 * C} />
          <g clipPath={`url(#${e}block)`}>
            {a.map((e, t) => (
              <g key={e.name} className="gto-stage" opacity={+(t === $)}>
                {(function (e, t, s, r, l) {
                  let i = () => s - 40,
                    a = () => s + l + 40;
                  if (0 === e) {
                    let e = Array.from(
                      {
                        length: 10,
                      },
                      (e, r) => (0 === r ? i : 9 === r ? a : (e) => s + (r * l) / 9 + 1.4 * Math.sin((e - t) / 31 + 1.7 * r)),
                    );
                    return h(t, r, e, ["#978a78", "#85786a", "#a09382", "#8b7f6f"]);
                  }
                  if (1 === e) {
                    let e = Array.from(
                      {
                        length: 16,
                      },
                      (e, r) => (0 === r ? i : 15 === r ? a : (e) => s + (r * l) / 15 + 0.5 * Math.sin((e - t) / 53 + r)),
                    );
                    return h(t, r, e, ["#4b535e", "#424953", "#525b66"]);
                  }
                  if (2 === e) {
                    let e = Array.from(
                      {
                        length: 12,
                      },
                      (e, r) =>
                        0 === r
                          ? i
                          : 11 === r
                            ? a
                            : (e) =>
                                s +
                                (r * l) / 11 +
                                6 * Math.sin((2 * Math.PI * (e - t)) / 48 + 0.8 * r) +
                                2.5 * Math.sin((2 * Math.PI * (e - t)) / 19 + 1.3 * r),
                    );
                    return h(t, r, e, ["#a2aaa3", "#7d8883", "#b9beb5", "#8b958f"]);
                  }
                  let o = [0, 0.15, 0.27, 0.4, 0.5, 0.63, 0.74, 0.86, 0.95, 1],
                    n = o.map((e, i) => {
                      let a = 16 + 10 * Math.sin(Math.PI * e),
                        n = 0 === i ? -40 : 40 * (i === o.length - 1);
                      return (i) => {
                        let o = (2 * Math.PI * (i - t)) / (0.95 * r) + 0.4;
                        return s + e * l + n + a * (Math.sin(o) + 0.3 * Math.sin(2 * o + 0.8));
                      };
                    });
                  return h(t, r, n, ["#efe6d8", "#2f3037", "#e7d2c5", "#3e3e45"]);
                })(t, z, F, S, A).map((e, t) => (
                  <path key={t} d={e.d} fill={e.fill} />
                ))}
                {1 === t && (
                  <g stroke="#ffffff" strokeWidth="10" opacity="0.07" strokeLinecap="round">
                    <line x1={z + 0.15 * S} y1={F + A} x2={z + 0.45 * S} y2={F} />
                    <line x1={z + 0.55 * S} y1={F + A} x2={z + 0.85 * S} y2={F} />
                  </g>
                )}
              </g>
            ))}
            {$ >= 2 &&
              f.slice(0, 2 === $ ? 16 : 6).map((e, t) => (
                <g key={t} transform={`translate(${(z + e.u * S).toFixed(1)} ${(F + e.v * A).toFixed(1)}) scale(${e.s.toFixed(2)})`}>
                  <g
                    className="gto-glint"
                    style={{
                      animationDelay: `${e.d.toFixed(2)}s`,
                    }}
                  >
                    <path d="M0 -7 L1.8 -1.8 L7 0 L1.8 1.8 L0 7 L-1.8 1.8 L-7 0 L-1.8 -1.8Z" fill="#fffbe8" />
                  </g>
                </g>
              ))}
            <rect x={z} y={F} width={S} height={A} fill={`url(#${e}heat)`} opacity={C * (3 === $ ? 0.28 : 0.45)} />
          </g>
          <rect x={z} y={F} width={S} height={A} rx="16" fill="none" stroke="#1f1a17" strokeWidth="4" />
          <rect x={z - 26} y={F - 16} width="26" height={A + 32} rx="6" fill="#a7adb3" stroke="#5d646b" strokeWidth="3" />
          <rect x={z + S} y={F - 16} width="26" height={A + 32} rx="6" fill="#a7adb3" stroke="#5d646b" strokeWidth="3" />
          <CY_ x={z - 26} y={222} dir={1} />
          <CY_ x={z + S + 26} y={222} dir={-1} />
          {I > 0 &&
            [1, -1].map((e) => {
              let t = 1 === e ? z - 26 - 60 : z + S + 26 + 60;
              return (
                <g key={e} fill="none" stroke="#f6f1e7" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
                  {Array.from(
                    {
                      length: I,
                    },
                    (s, l) => {
                      let i = t - e * l * 18;
                      return <path key={l} d={`M${i - 7 * e} 288 l${12 * e} 12 l${-(12 * e)} 12`} />;
                    },
                  )}
                </g>
              );
            })}
          <rect x={382} y="468" width="176" height="18" rx="9" fill="#6b4226" transform="rotate(-7 470 477)" />
          <rect x={382} y="468" width="176" height="18" rx="9" fill="#7d5030" transform="rotate(7 470 477)" />
          {t < 3 ? (
            <g fill="#e0522a">
              <circle cx={452} cy="468" r="4" />
              <circle cx={474} cy="466" r="5" />
              <circle cx={492} cy="469" r="3.5" />
            </g>
          ) : (
            x.map((e, t) => {
              let s = (14 + 110 * C) * e.h,
                l = 470 + e.dx;
              return (
                <g
                  key={t}
                  className="gto-flame"
                  style={{
                    animationDelay: `${e.d}s`,
                    animationDuration: `${0.8 + 0.07 * t}s`,
                  }}
                >
                  <path d={p(l, 474, e.w, s)} fill="#e2581f" />
                  <path d={p(l, 474, 0.68 * e.w, 0.72 * s)} fill="#f59a2c" />
                  <path d={p(l, 474, 0.4 * e.w, 0.45 * s)} fill="#ffd45c" />
                </g>
              );
            })
          )}
          <rect x="30" y="34" width="8" height="430" rx="4" fill="#f6f1e7" opacity="0.35" />
          {[10, 20, 30].map((e) => (
            <g key={e}>
              <line x1="26" x2="42" y1={P(e)} y2={P(e)} stroke="#f6f1e7" strokeWidth="3" opacity="0.6" />
              {Math.abs(e - q) > 4 && (
                <text x="50" y={P(e) + 8} fontSize="22" fontWeight="700" fill="#f3e6d3" opacity="0.75">
                  {e}
                  {" km"}
                </text>
              )}
            </g>
          ))}
          <text x="50" y="22" fontSize="20" fontWeight="700" fill="#35506a">
            the surface
          </text>
          <g transform={`translate(0 ${P(q).toFixed(1)})`}>
            <circle cx="34" cy="0" r="11" fill="#d9a441" stroke="#1f2a22" strokeWidth="3" />
            <rect x="48" y="-22" width="130" height="44" rx="22" fill="#1f2a22" stroke="#d9a441" strokeWidth="2" />
            <text x="113" y="8" textAnchor="middle" fontSize="21" fontWeight="800" fill="#fffdf8">
              {q}
              {" km down"}
            </text>
          </g>
          {M && (
            <g transform="translate(470 70)">
              <rect x="-170" y="-26" width="340" height="50" rx="25" fill="#c8352b" stroke="#fffdf8" strokeWidth="3" />
              <text y="8" textAnchor="middle" fontSize="24" fontWeight="800" fill="#fffdf8">
                Too hot — it would melt!
              </text>
            </g>
          )}
        </svg>
      </div>
      <div className="mt-4 flex flex-wrap items-end justify-between gap-x-4 gap-y-2">
        <div aria-live="polite">
          <p className="eyebrow">Now the rock is</p>
          <p className="font-display text-4xl font-semibold leading-tight sm:text-5xl">
            {w.name}
            {w.say && <span className="ml-2 align-middle font-sans text-base font-normal text-ink-2">say “{w.say}”</span>}
          </p>
        </div>
        <ol className="flex items-center gap-1 text-sm font-semibold" aria-label="The order it changes">
          {a.map((e, t) => (
            <li key={e.name} className="flex items-center gap-1">
              {t > 0 && (
                <span aria-hidden="true" className="text-ink-2">
                  ›
                </span>
              )}
              <span
                aria-current={t === $ ? "step" : undefined}
                className={`rounded-full px-2.5 py-1 ${t === $ ? "bg-moss text-white" : t < $ ? "bg-moss/15 text-moss" : "bg-paper-2 text-ink-2"}`}
              >
                {e.name}
              </span>
            </li>
          ))}
        </ol>
      </div>
      <p className="mt-1 text-ink">{w.blurb}</p>
      <p className="font-display mt-3 text-lg leading-snug sm:text-xl">
        Deep underground, heat and squeezing change one rock into another — without melting it.
      </p>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 sm:gap-6">
        {T("Heat", t, s, "#c8352b", `${n(t)} \xb7 about ${c(t)} \xb0C`, `${n(t)}, about ${c(t)} degrees`)}
        {T("Squeeze", i, j, "#2c6fb5", `${d(i)} \xb7 about ${q} km down`, `${d(i)}, about ${q} kilometres down`)}
      </div>
      <p role="status" className="mt-2 min-h-[1.5rem] text-sm font-semibold text-rust">
        {N}
      </p>
      <div className="mt-2 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => {
            let e = Math.min(a.length - 1, $ + 1);
            W(o[e], o[e]);
          }}
          disabled={$ === a.length - 1}
          className="min-h-12 flex-1 basis-56 rounded-full bg-moss px-5 py-2 text-lg font-semibold text-white shadow-sm transition active:scale-95 disabled:opacity-45"
        >
          {$ === a.length - 1 ? "As deep as it goes" : `Deeper — make ${a[$ + 1].name.toLowerCase()}`}
        </button>
        <button
          type="button"
          onClick={() => W(0, 0)}
          className="min-h-12 rounded-full border-2 border-line px-4 py-2 font-semibold text-ink-2 transition hover:border-moss hover:text-moss active:scale-95"
        >
          Back to shale
        </button>
      </div>
      <CG_
        two="Squeeze! Hot! The rock changed!"
        four="Deep, deep down it's hot and squashy, so shale turns into slate. It changes, but it doesn't melt."
        six="More heat and more squeezing: shale becomes slate, then schist with sparkly mica, then stripy gneiss."
        outside="Find a rock with light and dark stripes or shiny sparkles — it was squeezed and heated deep underground."
      />
    </div>
  );
};
