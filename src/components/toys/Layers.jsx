"use client";
/* eslint-disable @typescript-eslint/no-unused-expressions, react-hooks/immutability -- restored from the minified bundle: refs keep their one-letter names and statements keep the compiler's comma and && form. */
// Restored from client module 57695 (exports: Layers)
import * as i from "react";
let t, s, r;
let a = {
    t: 0,
    layers: [],
    squeeze: 0,
    bubbles: 0,
    nextId: 1,
  },
  o = {
    sand: {
      label: "Sand",
      rock: "Sandstone",
      loose: "#e7cd93",
      rockC: "#c98a55",
      grains: ["#c9a462", "#f6e6ba", "#b58c4f"],
      grainsRock: ["#a86a3a", "#e3b88c", "#8f5a33"],
      squash: 0.8,
      say: "The river brings sand. It sinks and settles on the bottom.",
      ink: "#5a3d17",
      rockInk: "#3a2410",
    },
    mud: {
      label: "Mud",
      rock: "Shale",
      loose: "#8d6d53",
      rockC: "#4f4b4d",
      grains: ["#6d523e", "#a3836a"],
      grainsRock: ["#3a3739", "#65605f"],
      squash: 0.52,
      say: "Muddy water from the river. The tiny bits of mud sink slowly and settle.",
      ink: "#fbf3e6",
      rockInk: "#f4efe7",
    },
    shells: {
      label: "Shells",
      rock: "Limestone",
      loose: "#efe5cf",
      rockC: "#c3bca9",
      grains: ["#d9cdb2", "#fffaf0"],
      grainsRock: ["#a9a290", "#dcd6c6"],
      squash: 0.7,
      say: "Sea creatures leave their shells behind. The shells pile up on the bottom.",
      ink: "#6a5a3a",
      rockInk: "#35322b",
    },
  },
  n = ["sand", "mud", "shells"],
  d = (e) => (e < 0 ? 0 : e > 1 ? 1 : e);
function c(e) {
  let t = e;
  return () => (t = (9301 * t + 49297) % 233280) / 233280;
}
function h(e) {
  let t = parseInt(e.slice(1), 16);
  return [(t >> 16) & 255, (t >> 8) & 255, 255 & t];
}
function f(e, t, s) {
  let r = h(e),
    l = h(t),
    i = d(s);
  return `rgb(${r.map((e, t) => Math.round(e + (l[t] - e) * i)).join(",")})`;
}
let x =
    ((t = c(41)),
    Array.from(
      {
        length: 16,
      },
      (e, s) => ({
        x: s % 2 ? 22 + 70 * t() : 708 + 70 * t(),
        speed: 0.35 + 0.3 * t(),
        off: t(),
        r: 4 + 5 * t(),
      }),
    )),
  p =
    ((s = c(77)),
    Array.from(
      {
        length: 14,
      },
      () => ({
        x: 30 + 740 * s(),
        speed: 0.5 + 0.4 * s(),
        off: s(),
        r: 2.5 + 2.5 * s(),
      }),
    )),
  u =
    ((r = c(9)),
    Array.from(
      {
        length: 14,
      },
      () => ({
        x: 800 * r(),
        y: 462 + 36 * r(),
        rx: 6 + 12 * r(),
        ry: 3 + 5 * r(),
      }),
    )),
  m = "M0 7 L-9 -2 Q-8 -10 0 -11 Q8 -10 9 -2 Z",
  y = "M0 7 L-5.5 -8 M0 7 L0 -10.5 M0 7 L5.5 -8";
function CG_({ two: e, four: t, six: s, outside: r }) {
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
        {r}
      </p>
    </div>
  );
}
export const Layers = function () {
  var e;
  let t,
    s = "lay" + (0, i.useId)().replace(/[^a-zA-Z0-9]/g, ""),
    [r, h] = (0, i.useState)(a),
    [j, b] = (0, i.useState)(false),
    [k, $] = (0, i.useState)(0),
    w = (0, i.useRef)(a),
    M = (0, i.useRef)(false),
    v = (0, i.useRef)(1);
  ((0, i.useEffect)(() => {
    "function" == typeof window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches && (v.current = 2.5);
  }, []),
    (0, i.useEffect)(() => {
      let e = 0,
        t = -1,
        s = (r) => {
          var l, i, a, o;
          let n,
            d,
            c,
            f,
            x,
            p,
            u = t < 0 ? 1 / 60 : Math.min(0.05, (r - t) / 1e3);
          t = r;
          let m =
            ((l = w.current),
            (i = u * v.current),
            (a = M.current),
            (d =
              (n = l.layers.some((e) => e.settle < 1)
                ? l.layers.map((e) =>
                    e.settle < 1
                      ? {
                          ...e,
                          settle: Math.min(1, e.settle + i / 1.8),
                        }
                      : e,
                  )
                : l.layers).length >= 3 && n.every((e) => e.settle >= 1)),
            (f = (c = a && d && l.squeeze < 1) ? Math.min(1, l.squeeze + i / 5.5) : l.squeeze),
            (x = +!!c),
            (p = l.bubbles < x ? Math.min(x, l.bubbles + 3 * i) : Math.max(x, l.bubbles - 1.5 * i)),
            {
              ...l,
              t: l.t + i,
              layers: n,
              squeeze: f,
              bubbles: p,
            });
          ((w.current = m),
            h(m),
            M.current && m.squeeze >= 1 && ((M.current = false), b(false)),
            (!M.current && (o = m).layers.every((e) => e.settle >= 1) && 0 === o.bubbles) || (e = requestAnimationFrame(s)));
        };
      return ((e = requestAnimationFrame(s)), () => cancelAnimationFrame(e));
    }, [k]));
  let N = () => {
      M.current || ((M.current = true), b(true), $((e) => e + 1));
    },
    W = () => {
      M.current && ((M.current = false), b(false));
    },
    L = r.squeeze,
    C = r.layers.length,
    S = r.layers[C - 1],
    A = !!S && S.settle < 1,
    z = L >= 1,
    F = [],
    q = 452;
  for (let e of r.layers) {
    let t = d((e.settle - 0.4) / 0.6),
      s = 1 - L * (1 - o[e.kind].squash),
      r = 56 * t * s;
    (F.push({
      L: e,
      top: q - r,
      bottom: q,
      th: r,
      grow: t,
      squash: s,
    }),
      (q -= r));
  }
  let P = r.layers.find((e) => "shells" === e.kind),
    I = d(L / 0.12),
    Q = -24 + (q + 24) * (1 - (1 - I) ** 3),
    T = S && "shells" !== S.kind ? d(1 - S.settle / 0.6) : 0,
    O = S && "shells" === S.kind ? d(1 - S.settle / 0.6) : 0,
    Z = 1e3 * C + 1e5 * Math.round((L ** 1.6 * 1e7) / 1e5);
  t = z
    ? "Layers of sand and mud, squashed for millions of years, become rock you can split in layers."
    : j && C >= 3
      ? A
        ? "Wait for the last layer to settle…"
        : "Squeeze! The weight pushes the water out, and the grains get stuck together."
      : L > 0
        ? "Keep squeezing — it takes millions of years!"
        : A && S
          ? o[S.kind].say
          : 0 === C
            ? "Tap Sand, Mud or Shells to let the water drop a layer on the bottom."
            : C < 3
              ? `One layer on top of another. Add ${3 - C} more to make a pile.`
              : C >= 6
                ? "What a tall pile! Now press and hold the Squeeze button."
                : "Good pile! The bottom layer is the oldest. Add more, or press and hold Squeeze.";
  let D = r.layers.map((e) => (z ? o[e.kind].rock : o[e.kind].label.toLowerCase())).join(", "),
    G =
      0 === C
        ? "The bottom of a lake, cut open, with a river flowing in. No layers yet."
        : z
          ? `The layers have been squeezed into rock. From the bottom up: ${D}.${P ? " One shell has become a fossil." : ""}`
          : `The bottom of a lake, cut open. ${C} layer${1 === C ? "" : "s"} from the bottom up: ${D}.${L > 0 ? " A heavy weight is squeezing them." : ""}`,
    H = n.filter((e) => r.layers.some((t) => t.kind === e));
  return (
    <div className="text-ink">
      <div className="overflow-hidden rounded-2xl border border-line">
        <svg viewBox="0 0 800 500" className="block h-auto w-full" role="img" aria-label={G}>
          <defs>
            <linearGradient id={`${s}sky`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#cfe6f2" />
              <stop offset="1" stopColor="#eef3e6" />
            </linearGradient>
            <linearGradient id={`${s}water`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#a9d2e4" />
              <stop offset="1" stopColor="#5f95b5" />
            </linearGradient>
          </defs>
          <rect x="0" y="0" width="800" height={96} fill={`url(#${s}sky)`} />
          <circle cx="730" cy="40" r="30" fill="#f3c95a" opacity="0.25" />
          <circle cx="730" cy="40" r="19" fill="#f3c95a" />
          <path d="M0 30 Q80 30 124 56 Q156 76 196 94 L0 94 Z" fill="#8fae67" />
          <path d="M0 30 Q80 30 124 56 Q156 76 196 94" fill="none" stroke="#6f9150" strokeWidth="3" />
          <path
            d="M0 50 Q76 52 118 68 Q146 80 178 94"
            fill="none"
            stroke={f("#6aa7cf", S ? o[S.kind].loose : "#6aa7cf", 0.8 * T)}
            strokeWidth="13"
            strokeLinecap="round"
          />
          <rect x="0" y={92} width="800" height={364} fill={`url(#${s}water)`} />
          <path
            d={`M0 92 Q25 87 50 92 ${Array.from(
              {
                length: 15,
              },
              (e, t) => `T${100 + 50 * t} 92`,
            ).join(" ")}`}
            fill="none"
            stroke="#e3f3fa"
            strokeWidth="3"
          />
          {O > 0 && <path d={`M${760 - (1 - O) * 520} 94 q22 -26 50 -8 q-14 -2 -18 10`} fill="#ffffff" opacity={O} />}
          {L < 0.2 && (
            <g opacity={1 - 5 * L} transform={`translate(640 ${138 + 3 * Math.sin(2 * r.t)})`}>
              <path d="M-20 0 Q-4 -13 16 0 Q-4 13 -20 0 Z" fill="#f0a64a" />
              <path d="M14 0 L28 -9 L26 0 L28 9 Z" fill="#e08a2e" />
              <circle cx="-10" cy="-2" r="2.2" fill="#1f2a22" />
            </g>
          )}
          {T > 0 && S && (
            <ellipse
              cx={170 + (1 - T) * 170}
              cy={110}
              rx={80 + (1 - T) * 200}
              ry={14 + (1 - T) * 10}
              fill={o[S.kind].loose}
              opacity={0.6 * T}
            />
          )}
          <rect x="0" y={452} width="800" height={48} fill="#6a5a4e" />
          {u.map((e, t) => (
            <ellipse key={t} cx={e.x} cy={e.y} rx={e.rx} ry={e.ry} fill="#58493f" />
          ))}
          {[...F].reverse().map(({ L: e, top: t, bottom: s, th: r, grow: i, squash: a }) => {
            if (i <= 0.01) return null;
            let n = o[e.kind],
              c = 3.5 * (1 - L) * i,
              h = f(n.loose, n.rockC, L ** 0.8),
              x = `M0 ${t.toFixed(1)} Q50 ${(t - c).toFixed(1)} 100 ${t.toFixed(1)} ${Array.from(
                {
                  length: 7,
                },
                (e, s) => `T${200 + 100 * s} ${t.toFixed(1)}`,
              ).join(" ")}`,
              p = P && e.id === P.id,
              u = i * d(1 - 3 * L),
              g = d((L - 0.75) / 0.2),
              j = t + r / 2;
            return (
              <g key={e.id}>
                <path d={`${x} L800 ${(s + 4).toFixed(1)} L0 ${(s + 4).toFixed(1)} Z`} fill={h} />
                {e.grains.map((e, s) => (
                  <circle
                    key={s}
                    cx={e.x}
                    cy={t + (0.14 + 0.72 * e.v) * r}
                    r={e.r * (0.8 + 0.2 * a)}
                    fill={f(n.grains[e.k], n.grainsRock[e.k], L)}
                    opacity={i}
                  />
                ))}
                {"mud" === e.kind &&
                  e.marks.map((e, s) => (
                    <line
                      key={s}
                      x1={e.x}
                      x2={e.x + e.s}
                      y1={t + e.v * r}
                      y2={t + e.v * r}
                      stroke={f("#6f5440", "#343133", L)}
                      strokeWidth="2"
                      strokeLinecap="round"
                      opacity={i}
                    />
                  ))}
                {"mud" === e.kind && L > 0.3 && (
                  <g stroke="#2a2729" strokeWidth="1.6" opacity={0.8 * d((L - 0.3) / 0.5)}>
                    <line x1="0" x2="800" y1={t + 0.34 * r} y2={t + 0.34 * r} />
                    <line x1="0" x2="800" y1={t + 0.68 * r} y2={t + 0.68 * r} />
                  </g>
                )}
                {"shells" === e.kind &&
                  e.marks.map((e, s) => (
                    <g
                      key={s}
                      transform={`translate(${e.x.toFixed(1)} ${(t + e.v * r).toFixed(1)}) rotate(${e.rot.toFixed(0)}) scale(${(e.s * i).toFixed(2)} ${(e.s * i * a).toFixed(2)})`}
                    >
                      <path d={m} fill={f("#fffaf0", "#d6cfbe", L)} stroke={f("#b9a987", "#8f8672", L)} strokeWidth="1.4" />
                      <path d={y} fill="none" stroke={f("#c9b995", "#9a917d", L)} strokeWidth="1.1" />
                    </g>
                  ))}
                {p && (
                  <g>
                    <g transform={`translate(600 ${j.toFixed(1)}) rotate(-8) scale(${(2 * i).toFixed(2)} ${(2 * i * a).toFixed(2)})`}>
                      <path d={m} fill={f("#fff6e2", "#a0967f", L)} stroke={f("#b09c74", "#4f4738", L)} strokeWidth={1.2 + 0.6 * L} />
                      <path d={y} fill="none" stroke={f("#c5b28a", "#4f4738", L)} strokeWidth={1 + 0.5 * L} />
                    </g>
                    {g > 0 && (
                      <text
                        x="632"
                        y={j + 7}
                        fontSize="22"
                        fontWeight="800"
                        fill="#2f2a22"
                        stroke="#e9e4d6"
                        strokeWidth="4"
                        paintOrder="stroke"
                        opacity={g}
                      >
                        fossil!
                      </text>
                    )}
                  </g>
                )}
                {u > 0.01 && (
                  <text x="16" y={j + 8} fontSize="22" fontWeight="800" fill={n.ink} opacity={u}>
                    {n.label.toLowerCase()}
                  </text>
                )}
                {g > 0 && (
                  <text
                    x="400"
                    y={j + 8}
                    textAnchor="middle"
                    fontSize="23"
                    fontWeight="800"
                    fill={n.rockInk}
                    stroke={h}
                    strokeWidth="5"
                    paintOrder="stroke"
                    opacity={g}
                  >
                    {n.rock}
                  </text>
                )}
              </g>
            );
          })}
          {F.map(({ L: e, bottom: t }) => {
            if (e.settle >= 1) return null;
            let s = o[e.kind],
              r = e.settle > 0.8 ? d((1 - e.settle) / 0.2) : 1;
            return (
              <g key={`f${e.id}`} opacity={r}>
                {e.fallers.map((r, i) => {
                  let a = d((e.settle - r.delay) / 0.42);
                  if (a <= 0) return null;
                  let o = 102 + (t - 4 - 92 - 10) * (1 - (1 - a) * (1 - a)),
                    n = r.x + 10 * Math.sin(5 * a + r.drift) * (1 - a);
                  return "shells" === e.kind ? (
                    <g
                      key={i}
                      transform={`translate(${n.toFixed(1)} ${o.toFixed(1)}) rotate(${(r.rot * (1 - a)).toFixed(0)}) scale(${r.r.toFixed(2)})`}
                    >
                      <path d={m} fill="#fffaf0" stroke="#b9a987" strokeWidth="1.5" />
                    </g>
                  ) : (
                    <circle
                      key={i}
                      cx={n}
                      cy={o}
                      r={r.r}
                      fill={s.grains[r.k]}
                      stroke={f(s.grains[r.k], "#3a2a1a", 0.3)}
                      strokeWidth="0.6"
                    />
                  );
                })}
              </g>
            );
          })}
          {A && S && (
            <text
              x="400"
              y={158 - 26 * S.settle}
              textAnchor="middle"
              fontSize="30"
              fontWeight="800"
              fill="#1f4d6b"
              stroke="#eaf5fa"
              strokeWidth="6"
              paintOrder="stroke"
              opacity={S.settle < 0.12 ? S.settle / 0.12 : d((1 - S.settle) / 0.5)}
            >
              +1,000 years
            </text>
          )}
          {r.bubbles > 0 && (
            <g fill="#ffffff" stroke="#d8eef8" strokeWidth="1.5">
              {p.map((e, t) => {
                let s = (r.t * e.speed + e.off) % 1,
                  i = 444 - s * (444 - q);
                return <circle key={`p${t}`} cx={e.x} cy={i} r={e.r} opacity={0.75 * r.bubbles * (1 - 0.5 * s)} />;
              })}
              {x.map((e, t) => {
                let s = (r.t * e.speed + e.off) % 1,
                  i = q - 6 - s * (q - 92 - 14);
                return <circle key={`s${t}`} cx={e.x + 4 * Math.sin(9 * s + t)} cy={i} r={e.r} opacity={0.8 * r.bubbles * (1 - 0.6 * s)} />;
              })}
            </g>
          )}
          {L > 0 && (
            <g>
              <rect x="110" y={Q - 172} width="580" height="172" rx="12" fill="#8c7152" />
              {[0, 1, 2, 3, 4].map((e) => (
                <rect key={e} x="110" y={Q - 172 + 34.4 * e} width="580" height="17.2" fill="#7a6146" opacity="0.75" />
              ))}
              <rect x="110" y={Q - 172} width="580" height="172" rx="12" fill="none" stroke="#5e4a36" strokeWidth="3" />
              <g fill="#fff8ea">
                <text x="400" y={Q - 98} textAnchor="middle" fontSize="25" fontWeight="800">
                  More and more layers on top,
                </text>
                <text x="400" y={Q - 66} textAnchor="middle" fontSize="25" fontWeight="800">
                  pressing down
                </text>
                {[150, 650].map((e) => (
                  <path key={e} d={`M${e - 11} ${Q - 120} h22 v34 h14 l-25 30 l-25 -30 h14 z`} opacity="0.95" />
                ))}
              </g>
            </g>
          )}
        </svg>
      </div>
      <p aria-live="polite" className="font-display mt-3 min-h-[3.5rem] text-lg leading-snug sm:text-xl">
        {t}
      </p>
      <div className="mt-3 grid grid-cols-3 gap-2">
        {n.map((e) => (
          <button
            key={e}
            type="button"
            aria-label={`Drop ${o[e].label.toLowerCase()}`}
            disabled={L > 0 || C >= 6}
            onClick={() =>
              ((e) => {
                let t = w.current;
                if (!(t.squeeze > 0) && !(t.layers.length >= 6)) {
                  var s;
                  let r, l, i, a, d;
                  ((w.current = {
                    ...t,
                    layers: [
                      ...t.layers,
                      ((s = t.nextId),
                      (r = c((7919 * s + 1231 * n.indexOf(e) + 17) % 233280)),
                      (l = Array.from(
                        {
                          length: "sand" === e ? 80 : "mud" === e ? 46 : 34,
                        },
                        () => ({
                          x: 6 + 788 * r(),
                          v: r(),
                          r: "sand" === e ? 1.7 + 1.3 * r() : 1.1 + 0.9 * r(),
                          k: Math.floor(r() * o[e].grains.length),
                        }),
                      )),
                      (i = Array.from(
                        {
                          length: "mud" === e ? 20 : 15 * ("shells" === e),
                        },
                        () => ({
                          x: 20 + 760 * r(),
                          v: 0.2 + 0.6 * r(),
                          s: "mud" === e ? 10 + 14 * r() : 0.75 + 0.45 * r(),
                          rot: 80 * r() - 40,
                        }),
                      )),
                      (a = "shells" === e ? i.filter((e) => Math.abs(e.x - 600) > 40) : i),
                      (d = Array.from(
                        {
                          length: 30,
                        },
                        () => {
                          let t = 16 + 768 * r(),
                            s = "shells" === e ? 0.3 * r() : 0.02 + (t / 800) * 0.26 + 0.06 * r();
                          return {
                            x: t,
                            drift: 6.28 * r(),
                            delay: s,
                            r: "sand" === e ? 2.6 + 1.4 * r() : "mud" === e ? 2 + r() : 0.55 + 0.25 * r(),
                            k: Math.floor(r() * o[e].grains.length),
                            rot: 80 * r() - 40,
                          };
                        },
                      )),
                      {
                        id: s,
                        kind: e,
                        settle: 0,
                        grains: l,
                        marks: a,
                        fallers: d,
                      }),
                    ],
                    nextId: t.nextId + 1,
                  }),
                    h(w.current),
                    $((e) => e + 1));
                }
              })(e)
            }
            className="flex min-h-12 items-center justify-center gap-2 rounded-full border-2 border-line bg-paper px-3 py-2 font-semibold text-ink transition hover:border-moss/60 active:scale-95 disabled:opacity-40"
          >
            <span
              aria-hidden="true"
              className="inline-block h-4 w-4 shrink-0 rounded-full border border-ink/20"
              style={{
                background: o[e].loose,
              }}
            />
            {o[e].label}
          </button>
        ))}
      </div>
      <button
        type="button"
        disabled={C < 3 || z}
        aria-label="Press and hold to squeeze the layers for millions of years"
        onPointerDown={(e) => {
          0 === e.button && (e.currentTarget.setPointerCapture(e.pointerId), N());
        }}
        onPointerUp={W}
        onPointerCancel={W}
        onLostPointerCapture={W}
        onKeyDown={(e) => {
          (" " === e.key || "Enter" === e.key) && (e.preventDefault(), e.repeat || N());
        }}
        onKeyUp={(e) => {
          (" " === e.key || "Enter" === e.key) && (e.preventDefault(), W());
        }}
        onBlur={W}
        onContextMenu={(e) => e.preventDefault()}
        style={{
          WebkitTouchCallout: "none",
        }}
        className={`mt-3 min-h-14 w-full touch-none select-none rounded-full bg-moss px-6 py-3 text-lg font-semibold text-white shadow-sm transition active:scale-95 disabled:opacity-45 ${j ? "scale-[0.98] ring-4 ring-gold/70" : ""}`}
      >
        {z ? "Squeezed into rock!" : j ? "Squeezing…" : "Squeeze for millions of years"}
      </button>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-ink-2">
          {C < 3 && !z ? (
            <>
              {"Add "}
              {3 - C}
              {" more layer"}
              {3 - C == 1 ? "" : "s"}
              {" to squeeze."}{" "}
            </>
          ) : null}
          <span className="inline-flex items-baseline gap-1.5 rounded-full bg-paper-2 px-3 py-1 font-semibold text-ink">
            {0 === C
              ? "0 years"
              : (e = Z) >= 1e6
                ? `${(e / 1e6).toFixed(1).replace(/\.0$/, "")} million years`
                : `${String(Math.round(e)).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} years`}
          </span>
        </p>
        <button
          type="button"
          onClick={() => {
            (W(),
              (w.current = {
                ...a,
                t: w.current.t,
                nextId: w.current.nextId,
              }),
              h(w.current));
          }}
          className="min-h-12 rounded-full border-2 border-line px-4 py-2 font-semibold text-ink-2 transition hover:border-moss hover:text-moss active:scale-95"
        >
          Start again
        </button>
      </div>
      {L >= 0.95 && (
        <ul className="mt-3 flex flex-wrap gap-2 text-sm" aria-label="What each layer became">
          {H.map((e) => (
            <li key={e} className="flex items-center gap-2 rounded-full border border-line bg-paper px-3 py-1.5">
              <span
                aria-hidden="true"
                className="inline-block h-3.5 w-3.5 rounded-full"
                style={{
                  background: o[e].rockC,
                }}
              />
              {o[e].label}
              {" → "}
              <span className="font-semibold">{o[e].rock}</span>
            </li>
          ))}
          {P && (
            <li className="flex items-center gap-2 rounded-full border border-line bg-paper px-3 py-1.5">
              {"A shell → "}
              <span className="font-semibold">a fossil</span>
            </li>
          )}
        </ul>
      )}
      <CG_
        two="Sand, mud, shells… squash! Now it's rock."
        four="Each new layer lands on top, so the bottom layer is the oldest one."
        six="Buried and squeezed for millions of years, sand turns into sandstone, mud into shale, and shells into limestone."
        outside="Look for stripes in a cliff, a road cut or a creek bank — each stripe was once a layer of sand or mud."
      />
    </div>
  );
};
