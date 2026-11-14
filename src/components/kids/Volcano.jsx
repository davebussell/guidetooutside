"use client";
// Restored from client module 19640 (exports: Volcano)
import * as r from "react/jsx-runtime";
import * as l from "react";
let t, s;
let i = {
    t: 0,
    mode: "fast",
    rise: 0,
    fountain: 0,
    smoke: 0,
    flows: [],
    slow: 0,
  },
  a = (e) => (e < 0 ? 0 : e > 1 ? 1 : e);
function o(e) {
  let t = e;
  return () => (t = (9301 * t + 49297) % 233280) / 233280;
}
function n(e) {
  let t = parseInt(e.slice(1), 16);
  return [(t >> 16) & 255, (t >> 8) & 255, 255 & t];
}
function d(e, t, s) {
  let r = n(e),
    l = n(t),
    i = a(s);
  return `rgb(${r.map((e, t) => Math.round(e + (l[t] - e) * i)).join(",")})`;
}
function c(e, t) {
  let s = a(t) * (e.length - 1),
    r = Math.min(e.length - 2, Math.floor(s));
  return d(e[r], e[r + 1], s - r);
}
let h = {
    idle: "Press and hold the button to push the hot, runny magma up.",
    rising: "Pushing! Hot magma is rising up the pipe…",
    sinking: "It's sinking back down. Hold on longer to push it all the way to the top!",
    erupting: "It's erupting! Hot lava is pouring down the side of the volcano.",
    cooling: "The lava is out in the cold air, so it cools fast: glowing orange… dark red… grey-black.",
    basalt: "Basalt — lava that cooled fast, in the air. Its crystals are too tiny to see.",
    "slow-idle": "This magma is stuck deep underground. Hold the button to let thousands of years go by.",
    "slow-start": "Deep down it stays warm, so the magma cools very, very slowly…",
    "slow-grow": "Crystals are growing — pink, white and black specks, bigger and bigger.",
    "slow-paused": "Time has stopped. Hold the button again to let more years go by.",
    granite: "Granite — magma that cooled slowly underground, so its crystals had time to grow big.",
  },
  f = [
    {
      fills: ["#e8a293", "#dc8b7d", "#efb7a8"],
      edge: "#b86a5e",
      w: [14, 26],
      h: [9, 16],
    },
    {
      fills: ["#f7f3ea", "#ebe5d8"],
      edge: "#c4baa8",
      w: [10, 20],
      h: [8, 14],
    },
    {
      fills: ["#2b2a2e", "#3b393e"],
      edge: "#141316",
      w: [6, 13],
      h: [5, 10],
    },
  ];
function x(e, t, s, r, l) {
  let i = o(e),
    a = [],
    n = 0;
  for (; a.length < t && n++ < 60 * t;) {
    let e = r[0] + i() * r[2],
      t = r[1] + i() * r[3];
    if (!s(e, t)) continue;
    let o = i(),
      n = o < 0.42 ? f[0] : o < 0.75 ? f[1] : f[2];
    a.push({
      x: e,
      y: t,
      w: (n.w[0] + i() * (n.w[1] - n.w[0])) * l,
      h: (n.h[0] + i() * (n.h[1] - n.h[0])) * l,
      rot: 180 * i() - 90,
      fill: n.fills[Math.floor(i() * n.fills.length)],
      edge: n.edge,
      start: 0.12 + 0.55 * i(),
    });
  }
  return a;
}
let p = x(11, 120, (e, t) => ((e - 400) / 154) ** 2 + ((t - 440) / 44) ** 2 <= 1, [240, 392, 320, 96], 1),
  u = x(23, 46, (e, t) => e * e + t * t <= 4900, [-72, -72, 144, 144], 2.2),
  m = (() => {
    let e = o(5),
      t = [];
    for (; t.length < 110;) {
      let s = 120 * e() - 60,
        r = 120 * e() - 60;
      s * s + r * r > 2916 ||
        t.push({
          x: s,
          y: r,
          r: 0.9 + 1.4 * e(),
          c: ["#4c4643", "#1f1c1c", "#5d5552", "#2c2828"][Math.floor(4 * e())],
        });
    }
    return t;
  })(),
  y =
    ((t = o(3)),
    Array.from(
      {
        length: 22,
      },
      () => ({
        x: 10 + 780 * t(),
        y: 268 + 220 * t(),
        rx: 5 + 9 * t(),
        ry: 3 + 5 * t(),
        c: t() > 0.5 ? "#a3876b" : "#6d5442",
      }),
    )),
  g =
    ((s = o(8)),
    Array.from(
      {
        length: 18,
      },
      () => ({
        vx: (2 * s() - 1) * 90,
        h: 40 + 48 * s(),
        speed: 0.8 + 0.7 * s(),
        off: s(),
        r: 5 + 6 * s(),
        c: s() > 0.45 ? "#ff8a2a" : "#ffc24a",
      }),
    )),
  j = [0, 1, 2, 3, 4, 5],
  b = ["#ff6a1f", "#e2481f", "#9a2f1e", "#4d3a35", "#353031"],
  k = ["#ffd35c", "#ff9a3a", "#c24a2a"],
  $ = "M150 252 Q300 226 372 106 Q379 99 387 104 L413 104 Q421 99 428 106 Q500 226 650 252 Z";
function w(e) {
  return String(Math.round(e)).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function M({ two: e, four: t, six: s, outside: l }) {
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
export const Volcano = function () {
  let e,
    t = "vol" + (0, l.useId)().replace(/[^a-zA-Z0-9]/g, ""),
    [s, o] = (0, l.useState)(i),
    [n, f] = (0, l.useState)(false),
    [x, v] = (0, l.useState)(0),
    N = (0, l.useRef)(i),
    W = (0, l.useRef)(false),
    L = (0, l.useRef)(1);
  ((0, l.useEffect)(() => {
    "function" == typeof window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches && (L.current = 2.5);
  }, []),
    (0, l.useEffect)(() => {
      let e = 0,
        t = -1,
        s = (r) => {
          let l,
            i = t < 0 ? 1 / 60 : Math.min(0.05, (r - t) / 1e3);
          t = r;
          let a = (function (e, t, s) {
            let r = e.t + t,
              { rise: l, fountain: i, smoke: a, slow: o, flows: n } = e;
            if (("slow" === e.mode && s && (o = Math.min(1, o + t / 7)), "fast" === e.mode && s)) {
              if (l < 1) l = Math.min(1, l + 0.45 * t);
              else {
                ((i = Math.min(1, i + 3 * t)), (a = Math.min(1, a + 0.8 * t)));
                let e = n[n.length - 1];
                if (!e || e.cool > 0) {
                  let t = e && 1 === e.side ? -1 : 1,
                    s = Math.min(2, n.filter((e) => e.side === t).length);
                  n = [
                    ...n,
                    {
                      side: t,
                      level: s,
                      len: 0,
                      cool: 0,
                    },
                  ].slice(-6);
                }
                let s = n.length - 1;
                n = n.map((e, r) =>
                  r === s
                    ? {
                        ...e,
                        len: Math.min(1, e.len + 0.3 * t),
                      }
                    : e,
                );
              }
            } else {
              ((i = Math.max(0, i - 2.5 * t)), (a = Math.max(0, a - 0.2 * t)), (l = Math.max(0, l - 0.35 * t)));
              let e = n.length - 1,
                s = n[e];
              if (s && s.cool < 1) {
                let r = Math.min(1, s.len + 0.05 * t * (1 - s.cool)),
                  l = Math.min(1, s.cool + 0.22 * t);
                n = n.map((t, s) =>
                  s === e
                    ? {
                        ...t,
                        len: r,
                        cool: l,
                      }
                    : t,
                );
              }
            }
            return {
              ...e,
              t: r,
              rise: l,
              fountain: i,
              smoke: a,
              slow: o,
              flows: n,
            };
          })(N.current, i * L.current, W.current);
          ((N.current = a),
            o(a),
            W.current && "slow" === a.mode && a.slow >= 1 && ((W.current = false), f(false)),
            (!W.current && ((l = a.flows[a.flows.length - 1]), 0 === a.fountain && 0 === a.smoke && 0 === a.rise && (!l || l.cool >= 1))) ||
              (e = requestAnimationFrame(s)));
        };
      return ((e = requestAnimationFrame(s)), () => cancelAnimationFrame(e));
    }, [x]));
  let C = () => {
      W.current || ((W.current = true), f(true), v((e) => e + 1));
    },
    S = () => {
      W.current && ((W.current = false), f(false));
    },
    A = "fast" === s.mode,
    z = (function (e, t) {
      if ("slow" === e.mode)
        return e.slow >= 1 ? "granite" : t ? (e.slow < 0.2 ? "slow-start" : "slow-grow") : e.slow > 0 ? "slow-paused" : "slow-idle";
      let s = e.flows[e.flows.length - 1];
      return t ? (e.rise < 1 ? "rising" : "erupting") : s && s.cool < 1 ? "cooling" : e.rise > 0.02 ? "sinking" : s ? "basalt" : "idle";
    })(s, n),
    F = h[z],
    q = s.flows[s.flows.length - 1],
    P = 1e3 * Math.round(100 * s.slow),
    I = !A && s.slow >= 1,
    Q = 394 - 290 * s.rise,
    T = s.fountain * (76 + 10 * Math.sin(11 * s.t) + 5 * Math.sin(23 * s.t)),
    O = A && q && q.cool > 0.6 && !n ? a((q.cool - 0.6) / 0.4) : 0,
    Z = q && -1 === q.side ? 100 : 700,
    D = A ? 0 : a((s.slow - 0.85) / 0.15),
    G = a(1 - 1.8 * s.slow),
    H =
      "basalt" === z
        ? "A volcano in cross-section. The lava flow has cooled into dark grey-black basalt."
        : "granite" === z
          ? "Magma deep underground has cooled slowly into granite, speckled with big pink, white and black crystals."
          : A
            ? `A volcano in cross-section with a magma chamber underground. ${F}`
            : `A magma chamber deep underground, blocked from the surface. ${P ? `${w(P)} years have passed. ` : ""}${F}`;
  return (
    (e = A
      ? n
        ? s.rise < 1
          ? "Pushing…"
          : "Erupting! Let go to stop"
        : q && q.cool >= 1
          ? "Hold to erupt again"
          : "Press and hold to push"
      : I
        ? "Granite made!"
        : n
          ? "Years going by…"
          : "Hold to let the years go by"),
    (
      <div className="text-ink">
        <div role="group" aria-label="How does the melted rock cool?" className="grid grid-cols-2 gap-2">
          {[
            ["fast", "Erupt it — cool fast, in the air"],
            ["slow", "Cool it slowly, deep underground"],
          ].map(([e, t]) => (
            <button
              key={e}
              type="button"
              aria-pressed={s.mode === e}
              onClick={() => {
                (S(),
                  (N.current = {
                    ...N.current,
                    mode: e,
                  }),
                  o(N.current),
                  v((e) => e + 1));
              }}
              className={`min-h-12 rounded-full border-2 px-3 py-2 text-sm font-semibold leading-tight transition active:scale-95 sm:px-4 ${s.mode === e ? "border-moss bg-moss text-white" : "border-line bg-paper text-ink-2 hover:border-moss/60"}`}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="mt-3 overflow-hidden rounded-2xl border border-line">
          <svg viewBox="0 0 800 500" className="block h-auto w-full" role="img" aria-label={H}>
            <defs>
              <linearGradient id={`${t}sky`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#cfe6f2" />
                <stop offset="1" stopColor="#f3efe0" />
              </linearGradient>
              <linearGradient id={`${t}cone`} x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#a4836a" />
                <stop offset="0.55" stopColor="#957660" />
                <stop offset="1" stopColor="#7f6350" />
              </linearGradient>
              <radialGradient id={`${t}magma`} cx="50%" cy="42%" r="62%">
                <stop offset="0" stopColor="#ffd35c" />
                <stop offset="0.55" stopColor="#ff8a2a" />
                <stop offset="1" stopColor="#d9481f" />
              </radialGradient>
              <linearGradient id={`${t}vent`} x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#e2511f" />
                <stop offset="0.5" stopColor="#ffb040" />
                <stop offset="1" stopColor="#e2511f" />
              </linearGradient>
              <clipPath id={`${t}ch`}>
                <ellipse cx={400} cy={440} rx={160} ry={48} />
              </clipPath>
              <clipPath id={`${t}coneclip`}>
                <path d={$} />
              </clipPath>
              <clipPath id={`${t}lens`}>
                <circle cx="0" cy="0" r="64" />
              </clipPath>
            </defs>
            <rect x="0" y="0" width="800" height="256" fill={`url(#${t}sky)`} />
            {[
              [235, 52, 1],
              [565, 40, 0.8],
            ].map(([e, t, s]) => (
              <g key={e} fill="#ffffff" opacity="0.9">
                <ellipse cx={e} cy={t + 8} rx={46 * s} ry={16 * s} />
                <circle cx={e - 16 * s} cy={t} r={18 * s} />
                <circle cx={e + 12 * s} cy={t - 4} r={22 * s} />
              </g>
            ))}
            {A && s.smoke > 0.01 && (
              <g fill="#8d8783">
                {[0, 1, 2, 3, 4, 5].map((e) => {
                  let t = (0.12 * s.t + e / 6) % 1;
                  return (
                    <circle
                      key={e}
                      cx={400 + 130 * t + 18 * Math.sin(2.1 * e)}
                      cy={92 - 120 * t}
                      r={16 + 36 * t}
                      opacity={0.55 * s.smoke * (1 - t) * Math.min(1, 6 * t)}
                    />
                  );
                })}
              </g>
            )}
            <rect x="0" y="252" width="800" height="248" fill="#8a6a4e" />
            <path d="M0 304 Q200 292 400 306 T800 298 V500 H0Z" fill="#7a5c43" />
            <path d="M0 378 Q200 366 400 380 T800 372 V500 H0Z" fill="#664c38" />
            {y.map((e, t) => (
              <ellipse key={t} cx={e.x} cy={e.y} rx={e.rx} ry={e.ry} fill={e.c} opacity="0.7" />
            ))}
            <rect x="0" y="246" width="800" height="9" rx="4" fill="#79a052" />
            <path d={$} fill={`url(#${t}cone)`} stroke="#6b5140" strokeWidth="3" strokeLinejoin="round" />
            <g clipPath={`url(#${t}coneclip)`} fill="none" stroke="#6f5443" strokeWidth="3" opacity="0.45" strokeLinecap="round">
              <path d="M180 252 Q310 232 376 132" />
              <path d="M620 252 Q490 232 424 132" />
              <path d="M226 252 Q322 238 381 162" />
              <path d="M574 252 Q478 238 419 162" />
            </g>
            <rect x="386" y="104" width="28" height="292" fill={A ? "#3e2d24" : "#5f4a3c"} />
            {!A && (
              <g stroke="#3e2f26" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.8">
                <path d="M388 150 l10 8 l-6 10 l14 6" />
                <path d="M412 250 l-9 7 l7 12 l-12 6" />
                <path d="M389 330 l11 6 l-4 11" />
              </g>
            )}
            {A && s.rise > 0.005 && (
              <g>
                <rect x="388" y={Q} width="24" height={396 - Q} fill={`url(#${t}vent)`} />
                <ellipse cx="400" cy={Q} rx="12" ry="5" fill="#ffd35c" />
              </g>
            )}
            {A &&
              s.flows.map((e, t) => {
                var l;
                let i, o, n;
                if (e.len < 0.004) return null;
                let d =
                    ((l = e.side),
                    (i = 8 + 15 * e.level),
                    (o = (e, t) => (400 + l * (e - 400 + 0.55 * i * t)).toFixed(1)),
                    (n = (e, t) => (e + -0.83 * i * t).toFixed(1)),
                    `M${o(403, 0)} ${n(101, 0)} Q${o(419, 0.2)} ${n(92, 0.2)} ${o(430, 0.6)} ${n(106, 0.6)} Q${o(500, 1)} ${n(226, 1)} ${o(650, 1)} ${n(250, 1)} L${o(796, 1)} ${n(250, 1)}`),
                  h = `${(100 * e.len).toFixed(2)} 200`,
                  f = e.cool,
                  x = {
                    d,
                    pathLength: 100,
                    fill: "none",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeDasharray: h,
                  };
                return (
                  <g key={t}>
                    {f < 1 && <path {...x} stroke="#ff9a3c" strokeOpacity={0.35 * (1 - f)} strokeWidth={34} />}
                    <path {...x} stroke={c(b, f)} strokeWidth={20} />
                    {f < 0.75 && <path {...x} stroke={c(k, f)} strokeOpacity={a(1 - 1.4 * f)} strokeWidth={7} />}
                    {f > 0.5 && (
                      <path
                        {...x}
                        stroke="#716865"
                        strokeOpacity={(f - 0.5) * 1.6}
                        strokeWidth={3}
                        transform={`translate(${3 * e.side} -6)`}
                      />
                    )}
                    {f > 0.02 &&
                      f < 0.97 &&
                      [0.35, 0.75, 1.5].map((t, l) => {
                        let i = t <= 1 ? 0.07 + 0.55 * t : 0.62 + (t - 1) * 0.38;
                        if (e.len < i) return null;
                        let a = (function (e, t, s) {
                            let r,
                              l,
                              i = 8 + 15 * t,
                              a = 0.55 * i,
                              o = -0.83 * i;
                            if (s <= 1) {
                              let e = (1 - s) * (1 - s),
                                t = 2 * (1 - s) * s,
                                i = s * s;
                              ((r = 430 * e + 500 * t + 650 * i + a), (l = 106 * e + 226 * t + 250 * i + o));
                            } else ((r = 650 + (s - 1) * 146 + a), (l = 250 + o));
                            return {
                              x: 400 + e * (r - 400),
                              y: l,
                            };
                          })(e.side, e.level, t),
                          o = (0.7 * s.t + 0.33 * l) % 1,
                          n = a.y - 16 - 42 * o;
                        return (
                          <path
                            key={l}
                            d={`M${a.x.toFixed(1)} ${n.toFixed(1)} c7 -6 -7 -12 0 -18`}
                            fill="none"
                            stroke="#ffffff"
                            strokeWidth="4"
                            strokeLinecap="round"
                            opacity={(1 - o) * (1 - f) * 0.9}
                          />
                        );
                      })}
                  </g>
                );
              })}
            {A && s.fountain > 0.01 && (
              <g opacity={Math.min(1, 1.4 * s.fountain)}>
                <ellipse cx="400" cy={106 - 0.45 * T} rx={30} ry={0.55 * T + 6} fill="#ffcf70" opacity="0.22" />
                <path
                  d={`M382 108 C384 ${106 - 0.45 * T} 390 ${106 - T} 400 ${106 - T} C410 ${106 - T} 416 ${106 - 0.45 * T} 418 108 Z`}
                  fill="#ff7a22"
                />
                <path
                  d={`M391 108 C392 ${106 - 0.4 * T} 396 ${106 - 0.78 * T} 400 ${106 - 0.78 * T} C404 ${106 - 0.78 * T} 408 ${106 - 0.4 * T} 409 108 Z`}
                  fill="#ffd35c"
                />
                {g.map((e, t) => {
                  let l = (s.t * e.speed + e.off) % 1;
                  return (
                    <circle key={t} cx={400 + e.vx * l} cy={100 - 4 * e.h * s.fountain * l * (1 - l)} r={e.r * (1 - 0.35 * l)} fill={e.c} />
                  );
                })}
              </g>
            )}
            {A ? (
              <g>
                <ellipse cx={400} cy={440} rx={174} ry={59} fill="#ff9a3c" opacity="0.28" />
                <ellipse cx={400} cy={440} rx={160} ry={48} fill={`url(#${t}magma)`} stroke="#b83a18" strokeWidth="3" />
                {j.map((e) => (
                  <circle
                    key={e}
                    cx={400 + Math.cos(0.6 * s.t + 1.1 * e) * (70 + 10 * e)}
                    cy={440 + 22 * Math.sin(0.9 * s.t + 2.3 * e)}
                    r={4 + (e % 3) * 2}
                    fill="#ffe28a"
                    opacity="0.75"
                  />
                ))}
                <text x="400" y="449" textAnchor="middle" fontSize="30" fontWeight="800" fill="#7a2410" opacity="0.85">
                  magma
                </text>
              </g>
            ) : (
              <g>
                <ellipse cx={400} cy={440} rx={174} ry={59} fill="#ff9a3c" opacity={0.3 * G} />
                <ellipse cx={400} cy={440} rx={160} ry={48} fill={c(["#ff8a2a", "#d4572a", "#a45a4a", "#cbb6a6"], 1.3 * s.slow)} />
                <ellipse cx={400} cy={440} rx={160} ry={48} fill={`url(#${t}magma)`} opacity={G} />
                <g clipPath={`url(#${t}ch)`}>
                  {p.map((e, t) => {
                    let l = a((s.slow - e.start) / 0.3);
                    return l <= 0 ? null : (
                      <rect
                        key={t}
                        x={e.x - (e.w * l) / 2}
                        y={e.y - (e.h * l) / 2}
                        width={e.w * l}
                        height={e.h * l}
                        rx={1.5}
                        fill={e.fill}
                        stroke={e.edge}
                        strokeWidth="0.8"
                        transform={`rotate(${e.rot.toFixed(1)} ${e.x.toFixed(1)} ${e.y.toFixed(1)})`}
                      />
                    );
                  })}
                </g>
                <ellipse cx={400} cy={440} rx={160} ry={48} fill="none" stroke={d("#b83a18", "#5a4436", 1.5 * s.slow)} strokeWidth="3" />
                {s.slow < 0.35 && (
                  <text
                    x="400"
                    y="450"
                    textAnchor="middle"
                    fontSize="30"
                    fontWeight="800"
                    fill="#7a2410"
                    opacity={0.85 * a(1 - 3 * s.slow)}
                  >
                    magma
                  </text>
                )}
              </g>
            )}
            {A && q && q.cool < 0.5 && q.len > 0.35 && (
              <text
                x={400 + 205 * q.side}
                y="176"
                textAnchor="middle"
                fontSize="34"
                fontWeight="800"
                fill="#c0391b"
                stroke="#fff8ec"
                strokeWidth="6"
                paintOrder="stroke"
                opacity={a((0.5 - q.cool) * 4)}
              >
                lava
              </text>
            )}
            {O > 0 && q && (
              <g opacity={O}>
                <line
                  x1={Z}
                  y1="180"
                  x2={Z}
                  y2={250 + -0.83 * (8 + 15 * q.level) - 12}
                  stroke="#2b2522"
                  strokeWidth="3"
                  strokeDasharray="5 5"
                />
                <g transform={`translate(${Z} 122)`}>
                  <circle r="62" fill="#fffdf8" />
                  <g clipPath={`url(#${t}lens)`}>
                    <circle r="64" fill="#35302f" />
                    {m.map((e, t) => (
                      <circle key={t} cx={e.x} cy={e.y} r={e.r} fill={e.c} />
                    ))}
                  </g>
                  <circle r="58" fill="none" stroke="#fffdf8" strokeWidth="8" />
                  <circle r="62" fill="none" stroke="#2b2522" strokeWidth="2" />
                </g>
                <g transform={`translate(${Z} 36)`}>
                  <rect x="-66" y="-24" width="132" height="44" rx="22" fill="#1f2a22" />
                  <text y="9" textAnchor="middle" fontSize="27" fontWeight="800" fill="#fffdf8">
                    Basalt
                  </text>
                </g>
              </g>
            )}
            {!A && (
              <g>
                <text x="120" y="332" textAnchor="middle" fontSize="24" fontWeight="700" fill="#f7ecd9">
                  deep
                </text>
                <text x="120" y="360" textAnchor="middle" fontSize="24" fontWeight="700" fill="#f7ecd9">
                  underground
                </text>
                <g transform="translate(120 436)">
                  <rect x="-100" y="-26" width="200" height="50" rx="25" fill="#1f2a22" opacity="0.85" />
                  <text y="9" textAnchor="middle" fontSize="25" fontWeight="800" fill="#fffdf8">
                    {0 === P ? "0 years" : `${w(P)} years`}
                  </text>
                </g>
                {s.slow > 0.15 && (
                  <g opacity={a((s.slow - 0.15) / 0.2)}>
                    <g transform="translate(686 396)">
                      <line x1="46" y1="46" x2="84" y2="84" stroke="#3b2f27" strokeWidth="16" strokeLinecap="round" />
                      <circle r="64" fill={c(["#e0703a", "#b25a45", "#cbb6a6"], 1.3 * s.slow)} />
                      <g clipPath={`url(#${t}lens)`}>
                        {u.map((e, t) => {
                          let l = a((s.slow - e.start) / 0.3);
                          return l <= 0 ? null : (
                            <rect
                              key={t}
                              x={e.x - (e.w * l) / 2}
                              y={e.y - (e.h * l) / 2}
                              width={e.w * l}
                              height={e.h * l}
                              rx={3}
                              fill={e.fill}
                              stroke={e.edge}
                              strokeWidth="1.5"
                              transform={`rotate(${e.rot.toFixed(1)} ${e.x.toFixed(1)} ${e.y.toFixed(1)})`}
                            />
                          );
                        })}
                      </g>
                      <circle r="64" fill="none" stroke="#fffdf8" strokeWidth="8" />
                      <circle r="68" fill="none" stroke="#2b2522" strokeWidth="2" />
                    </g>
                    <g transform="translate(686 302)" opacity={D}>
                      <rect x="-70" y="-24" width="140" height="44" rx="22" fill="#fffdf8" />
                      <text y="9" textAnchor="middle" fontSize="27" fontWeight="800" fill="#1f2a22">
                        Granite
                      </text>
                    </g>
                  </g>
                )}
              </g>
            )}
          </svg>
        </div>
        <p aria-live="polite" className="font-display mt-3 min-h-[3.5rem] text-lg leading-snug sm:text-xl">
          {F}
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <button
            type="button"
            disabled={I}
            aria-label={
              A ? "Press and hold to push the magma up and make the volcano erupt" : "Press and hold to let thousands of years go by"
            }
            onPointerDown={(e) => {
              0 === e.button && (e.currentTarget.setPointerCapture(e.pointerId), C());
            }}
            onPointerUp={S}
            onPointerCancel={S}
            onLostPointerCapture={S}
            onKeyDown={(e) => {
              (" " === e.key || "Enter" === e.key) && (e.preventDefault(), e.repeat || C());
            }}
            onKeyUp={(e) => {
              (" " === e.key || "Enter" === e.key) && (e.preventDefault(), S());
            }}
            onBlur={S}
            onContextMenu={(e) => e.preventDefault()}
            style={{
              WebkitTouchCallout: "none",
            }}
            className={`min-h-14 flex-1 basis-64 touch-none select-none rounded-full px-6 py-3 text-lg font-semibold text-white shadow-sm transition active:scale-95 disabled:opacity-50 ${A ? "bg-rust" : "bg-moss"} ${n ? "scale-95 ring-4 ring-gold/70" : ""}`}
          >
            {e}
          </button>
          <button
            type="button"
            onClick={() => {
              (S(),
                (N.current = {
                  ...i,
                  mode: N.current.mode,
                }),
                o(N.current));
            }}
            className="min-h-12 rounded-full border-2 border-line px-4 py-2 font-semibold text-ink-2 transition hover:border-moss hover:text-moss active:scale-95"
          >
            Start again
          </button>
        </div>
        <M
          two="Push, push! Hot rock! Now it's cold and hard."
          four="The hot, runny rock came out of the volcano, cooled down fast and went hard and dark."
          six="Lava that cools fast in the air makes basalt, with tiny crystals. Magma that cools slowly underground makes granite, with big ones."
          outside="Find a rock with pink, white and black specks — those are crystals that grew slowly underground, like granite."
        />
      </div>
    )
  );
};
