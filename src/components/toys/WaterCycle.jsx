"use client";
/* eslint-disable @typescript-eslint/no-unused-expressions, react-hooks/immutability -- restored from the minified bundle: refs keep their one-letter names and statements keep the compiler's comma and && form. */
// Restored from client module 32939 (exports: WaterCycle)
import * as s from "react";
let r = (e, t = 0, s = 1) => Math.min(s, Math.max(t, e)),
  l = (e, t, s) => e + (t - e) * s,
  a = (e, t, s) => {
    let l = r((s - e) / (t - e));
    return l * l * (3 - 2 * l);
  },
  i = (e) => e - Math.floor(e),
  n = (e) => Math.round(100 * e) / 100;
function o(e, t, s) {
  let a = [1, 3, 5].map((t) => parseInt(e.slice(t, t + 2), 16)),
    i = [1, 3, 5].map((e) => parseInt(t.slice(e, e + 2), 16));
  return `#${a
    .map((e, t) =>
      Math.round(l(e, i[t], r(s)))
        .toString(16)
        .padStart(2, "0"),
    )
    .join("")}`;
}
let c = [
    [420, 410],
    [520, 300],
    [560, 252],
    [600, 206],
    [640, 164],
    [680, 200],
    [716, 234],
    [760, 262],
    [800, 278],
  ],
  d = [
    [580, 230],
    [571, 250],
    [560, 268],
    [547, 288],
    [531, 307],
    [514, 326],
    [494, 344],
    [470, 360],
    [446, 374],
    [418, 388],
    [390, 400],
    [364, 409],
    [340, 416],
  ],
  x = (function (e) {
    let t = `M ${e[0][0]} ${e[0][1]}`;
    for (let s = 1; s < e.length - 1; s++) {
      let [r, l] = e[s],
        [a, i] = e[s + 1];
      t += ` Q ${r} ${l} ${(r + a) / 2} ${(l + i) / 2}`;
    }
    let [s, r] = e[e.length - 1];
    return `${t} L ${s} ${r}`;
  })(d),
  f = (() => {
    let e = [0];
    for (let t = 1; t < d.length; t++) e.push(e[t - 1] + Math.hypot(d[t][0] - d[t - 1][0], d[t][1] - d[t - 1][1]));
    return e;
  })(),
  h = [
    [-66, 14, 30],
    [-36, -8, 40],
    [4, -22, 46],
    [46, -6, 40],
    [74, 14, 28],
    [-30, 22, 32],
    [16, 22, 36],
    [52, 22, 28],
  ],
  p = [
    {
      x: 60,
      y: 378,
      s: 0.7,
      kind: "spruce",
    },
    {
      x: 92,
      y: 376,
      s: 0.85,
      kind: "leafy",
    },
    {
      x: 300,
      y: 374,
      s: 0.75,
      kind: "spruce",
    },
    {
      x: 334,
      y: 372,
      s: 0.9,
      kind: "spruce",
    },
    {
      x: 380,
      y: 360,
      s: 1.1,
      kind: "leafy",
    },
    {
      x: 412,
      y: 350,
      s: 1,
      kind: "spruce",
    },
    {
      x: 442,
      y: 342,
      s: 1.15,
      kind: "spruce",
    },
    {
      x: 474,
      y: 330,
      s: 0.95,
      kind: "leafy",
    },
    {
      x: 532,
      y: 336,
      s: 0.9,
      kind: "spruce",
    },
    {
      x: 560,
      y: 350,
      s: 1.05,
      kind: "spruce",
    },
  ],
  u = [
    {
      x: 380,
      y: 318,
    },
    {
      x: 442,
      y: 290,
    },
    {
      x: 474,
      y: 296,
    },
    {
      x: 560,
      y: 300,
    },
  ],
  j = {
    clock: 0,
    sun: 0.12,
    sunGoal: null,
    fill: 0.12,
    cloudX: 300,
    windGoal: null,
    raining: false,
    dryFor: 0,
    runoff: 0,
    drop: "lake",
    dropT: 0,
    wait: 0,
    fallX: 632,
    trips: 0,
    dragging: null,
  },
  y = [
    {
      id: "evaporation",
      name: "Evaporation",
      words: "Warm water floats up as invisible vapour.",
    },
    {
      id: "condensation",
      name: "Condensation",
      words: "High up it’s cold, so vapour makes a cloud.",
    },
    {
      id: "precipitation",
      name: "Precipitation",
      words: "Heavy clouds drop rain — or snow where it’s cold.",
    },
    {
      id: "collection",
      name: "Collection",
      words: "Water runs back to the lake and into the ground.",
    },
  ];
function CM_({ x: e, y: s, s: r }) {
  return (
    <g transform={`translate(${e} ${s}) scale(${r})`}>
      <rect x={-3} y={-8} width={6} height={10} fill="#6b4a33" />
      <path d="M0 -62 L14 -36 L8 -36 L20 -16 L12 -16 L24 -4 L-24 -4 L-12 -16 L-20 -16 L-8 -36 L-14 -36 Z" fill="#2f5d3a" />
      <path d="M0 -62 L14 -36 L8 -36 L20 -16 L12 -16 L24 -4 L2 -4 Z" fill="#244a2e" />
    </g>
  );
}
function CG_({ x: e, y: s, s: r }) {
  return (
    <g transform={`translate(${e} ${s}) scale(${r})`}>
      <rect x={-3} y={-20} width={6} height={22} rx={2} fill="#7a5a3c" />
      <circle cx={0} cy={-34} r={20} fill="#5d8f4a" />
      <circle cx={-10} cy={-28} r={12} fill="#6fa258" />
      <circle cx={9} cy={-40} r={9} fill="#79ad60" />
    </g>
  );
}
function CK_({ vapour: e }) {
  return (
    <g>
      <circle r={31} fill="#d9a441" opacity={0.3} />
      <path
        d="M0 -25 C 6 -15, 17 -4, 17 6 A 17 17 0 0 1 -17 6 C -17 -4, -6 -15, 0 -25 Z"
        fill={e ? "#ffffff" : "#4fa6e8"}
        fillOpacity={e ? 0.6 : 1}
        stroke="#1f5590"
        strokeWidth={2.5}
        strokeDasharray={e ? "4 4" : undefined}
      />
      {!e && <ellipse cx={-7} cy={-3} rx={3} ry={6} fill="#ffffff" opacity={0.7} transform="rotate(22 -7 -3)" />}
      <circle cx={-5.5} cy={5} r={2.4} fill="#1f2a22" />
      <circle cx={5.5} cy={5} r={2.4} fill="#1f2a22" />
      <circle cx={-4.7} cy={4.2} r={0.8} fill="#ffffff" />
      <circle cx={6.3} cy={4.2} r={0.8} fill="#ffffff" />
      <path d="M-5 12 Q 0 16.5 5 12" stroke="#1f2a22" strokeWidth={2} fill="none" strokeLinecap="round" />
      <circle cx={-10.5} cy={10} r={2.6} fill="#f0908c" opacity={0.6} />
      <circle cx={10.5} cy={10} r={2.6} fill="#f0908c" opacity={0.6} />
    </g>
  );
}
function CB_({ x: e, y: s, text: r, size: l = 26, tone: a = "light" }) {
  let i = r.length * l * 0.56 + 1.3 * l,
    n = 1.7 * l;
  return (
    <g transform={`translate(${e} ${s})`}>
      <rect
        x={-i / 2}
        y={-n / 2}
        width={i}
        height={n}
        rx={n / 2}
        fill={"gold" === a ? "#d9a441" : "#fffdf8"}
        opacity={0.95}
        stroke={"gold" === a ? "#a8791f" : "#d9cfb8"}
        strokeWidth={2}
      />
      <text y={0.36 * l} textAnchor="middle" fontSize={l} fontWeight={700} fill="#1f2a22">
        {r}
      </text>
    </g>
  );
}
function CW_() {
  return (
    <svg viewBox="-20 -28 40 48" className="h-7 w-6" aria-hidden="true">
      <path
        d="M0 -25 C 6 -15, 17 -4, 17 6 A 17 17 0 0 1 -17 6 C -17 -4, -6 -15, 0 -25 Z"
        fill="#4fa6e8"
        stroke="#1f5590"
        strokeWidth={2.5}
      />
      <circle cx={-5.5} cy={5} r={2.6} fill="#1f2a22" />
      <circle cx={5.5} cy={5} r={2.6} fill="#1f2a22" />
      <path d="M-5 12 Q 0 16.5 5 12" stroke="#1f2a22" strokeWidth={2.2} fill="none" strokeLinecap="round" />
    </svg>
  );
}
function M() {
  return (
    <div className="rounded-xl border border-line p-4">
      <h3 className="font-display text-lg font-semibold">Say it like this</h3>
      <ul className="mt-2 grid gap-1.5 text-sm leading-relaxed">
        <li>
          <span className="font-semibold text-moss">Age 2:</span>
          {" “Sun is hot. Water goes up, up, up! Rain comes down, down, down!”"}
        </li>
        <li>
          <span className="font-semibold text-moss">Age 4:</span>
          {" “The sun warms the water, it floats up and makes a cloud, and the cloud rains it back down.”"}
        </li>
        <li>
          <span className="font-semibold text-moss">Age 6:</span>
          {" “Can you say all four steps — evaporation, condensation, precipitation, collection — and where our drop goes next?”"}
        </li>
      </ul>
      <p className="mt-3 text-sm leading-relaxed">
        <span className="font-semibold text-rust">Go outside:</span>
        {" On a sunny day, paint a wet patch on a warm rock or sidewalk with water and watch it disappear. Where did the water go?"}
      </p>
    </div>
  );
}
export const WaterCycle = function () {
  var e;
  let L,
    $ = (0, s.useId)().replace(/[^a-zA-Z0-9_-]/g, ""),
    v = (0, s.useRef)(null),
    C = (0, s.useRef)(null),
    W = (0, s.useRef)(0),
    [N, Z] = (0, s.useState)(j),
    [A, T] = (0, s.useState)(false);
  ((0, s.useEffect)(() => {
    let e = v.current;
    if (!e || "u" < typeof IntersectionObserver) return;
    let t = new IntersectionObserver(([e]) => T(e.isIntersecting), {
      rootMargin: "120px",
    });
    return (t.observe(e), () => t.disconnect());
  }, []),
    (0, s.useEffect)(() => {
      if (!A) return;
      let e = 0,
        t = 0,
        s = (r) => {
          let l = t ? Math.min(0.05, (r - t) / 1e3) : 0;
          ((t = r),
            l > 0 &&
              Z((e) =>
                (function (e, t) {
                  let s = {
                    ...e,
                    clock: e.clock + t,
                  };
                  if ("sun" !== s.dragging && null !== s.sunGoal) {
                    let e = s.sunGoal - s.sun;
                    ((s.sun += Math.sign(e) * Math.min(Math.abs(e), 0.65 * t)), 0.001 > Math.abs(s.sunGoal - s.sun) && (s.sunGoal = null));
                  }
                  let r = a(0.28, 0.75, s.sun);
                  if ("cloud" !== s.dragging && null !== s.windGoal) {
                    let e = s.windGoal - s.cloudX;
                    ((s.cloudX += Math.sign(e) * Math.min(Math.abs(e), 170 * t)),
                      0.5 > Math.abs(s.windGoal - s.cloudX) && (s.windGoal = null));
                  }
                  s.raining || (s.fill = Math.min(1, s.fill + r * t * 0.15));
                  let l = s.cloudX >= 560;
                  switch (
                    (!s.raining && l && s.fill >= 0.55 && (s.raining = true),
                    s.raining && (!l || s.fill <= 0.03) && ((s.raining = false), s.fill <= 0.03 && (s.dryFor = 0.001)),
                    s.raining
                      ? ((s.fill = Math.max(0, s.fill - 0.13 * t)), (s.runoff = Math.min(1, s.runoff + 0.9 * t)))
                      : (s.runoff = Math.max(0, s.runoff - 0.11 * t)),
                    s.dryFor > 0 &&
                      ((s.dryFor += t), s.dryFor > 1.6 && ((s.dryFor = 0), "cloud" !== s.dragging && s.cloudX > 304 && (s.windGoal = 300))),
                    s.drop)
                  ) {
                    case "lake":
                      r > 0.5
                        ? ((s.wait += t), s.wait > 1.2 && ((s.drop = "rising"), (s.dropT = 0), (s.wait = 0)))
                        : s.wait > 0
                          ? (s.wait = 0)
                          : (s.wait = Math.min(0, s.wait + t));
                      break;
                    case "rising":
                      ((s.dropT += (t / 3.4) * (r > 0.2 ? 1 : 0.3)), s.dropT >= 1 && ((s.drop = "cloud"), (s.dropT = 0), (s.wait = 0)));
                      break;
                    case "cloud":
                      s.raining &&
                        ((s.wait += t), s.wait > 0.9 && ((s.drop = "falling"), (s.dropT = 0), (s.wait = 0), (s.fallX = s.cloudX)));
                      break;
                    case "falling":
                      ((s.dropT += t / 1.3), s.dropT >= 1 && ((s.drop = "stream"), (s.dropT = 0)));
                      break;
                    case "stream":
                      ((s.dropT += t / 5.5), s.dropT >= 1 && ((s.drop = "lake"), (s.dropT = 0), (s.trips += 1), (s.wait = -2.5)));
                  }
                  return s;
                })(e, l),
              ),
            (e = requestAnimationFrame(s)));
        };
      return ((e = requestAnimationFrame(s)), () => cancelAnimationFrame(e));
    }, [A]));
  let S = (e) => {
      let t = C.current,
        s = t?.getScreenCTM();
      return s ? new DOMPoint(e.clientX, e.clientY).matrixTransform(s.inverse()) : null;
    },
    D = (e) => {
      (e.currentTarget.hasPointerCapture(e.pointerId) && e.currentTarget.releasePointerCapture(e.pointerId),
        Z((e) => ({
          ...e,
          dragging: null,
        })));
    },
    Q = a(0.28, 0.75, N.sun),
    I = {
      x: 64 + 24 * (L = N.sun),
      y: l(300, 72, L),
    },
    F =
      "rising" === (e = N).drop
        ? "evaporation"
        : "cloud" === e.drop
          ? e.raining
            ? "precipitation"
            : "condensation"
          : "falling" === e.drop
            ? "precipitation"
            : "stream" === e.drop
              ? "collection"
              : a(0.28, 0.75, e.sun) > 0.5 && e.wait >= 0
                ? "evaporation"
                : e.trips > 0
                  ? "collection"
                  : null,
    G = 0.5 + 0.62 * N.fill,
    P = Math.pow(r(1.15 * N.fill - 0.15), 1.2),
    q = o("#ffffff", "#7d8a98", P),
    E = o("#e3edf5", "#5f6c7a", P),
    O = 116 + 30 * G,
    B = o("#f2c7a0", "#6fb3e6", Q),
    X = o("#fbe3c4", "#d4ecf8", Q),
    z = N.cloudX >= 560,
    R = N.clock,
    H = 206 + 5 * Math.sin(1.4 * R),
    Y = 412 + 1.5 * Math.sin(2.1 * R);
  if ("rising" === N.drop) {
    let e = a(0, 1, N.dropT);
    ((H = (1 - e) * (1 - e) * 206 + 2 * (1 - e) * e * 166 + e * e * (N.cloudX + 12) + 6 * Math.sin(14 * N.dropT) * (1 - e)),
      (Y = (1 - e) * (1 - e) * 406 + 2 * (1 - e) * e * 267 + e * e * 122));
  } else if ("cloud" === N.drop) ((H = N.cloudX + 12), (Y = 122 + 2 * Math.sin(2 * R)));
  else if ("falling" === N.drop) {
    let e = N.dropT * N.dropT;
    ((H = l(N.fallX + 12, d[0][0], e)), (Y = l(148, d[0][1] - 10, e)));
  } else if ("stream" === N.drop) {
    let e = (function (e) {
      let t = f[f.length - 1],
        s = r(e) * t;
      for (let e = 1; e < d.length; e++)
        if (s <= f[e]) {
          let t = (s - f[e - 1]) / (f[e] - f[e - 1]);
          return {
            x: l(d[e - 1][0], d[e][0], t),
            y: l(d[e - 1][1], d[e][1], t),
          };
        }
      let [a, i] = d[d.length - 1];
      return {
        x: a,
        y: i,
      };
    })(N.dropT);
    ((H = e.x), (Y = e.y - 12));
  }
  let U = {
      rise: `M 206 ${400} C ${156} 320, 260 220, 300 156`,
      wind: "M 390 64 L 562 64",
      fall: `M 602 160 L ${d[0][0] + 4} ${d[0][1] - 16}`,
      stream: x,
    },
    K =
      "rising" === N.drop
        ? "rise"
        : "cloud" === N.drop
          ? N.raining || z
            ? "fall"
            : "wind"
          : "falling" === N.drop
            ? "fall"
            : "stream" === N.drop
              ? "stream"
              : Q > 0.5
                ? "rise"
                : null,
    _ = Array.from(
      {
        length: 8,
      },
      (e, t) => {
        let s = i(0.26 * R + 0.137 * t),
          r = N.cloudX + (t - 3.5) * 14,
          a = 1 - Math.pow(1 - s, 2);
        return {
          x: l(64 + 34 * t, r, a) + 7 * Math.sin(9 * s + t),
          y: l(404, 150, a),
          o: Q * Math.sin(Math.PI * s) * 0.9,
          sc: 1 - 0.35 * s,
        };
      },
    ),
    V = u.map((e, t) => {
      let s = i(0.24 * R + 0.29 * t + 0.1),
        r = 1 - Math.pow(1 - s, 2);
      return {
        x: l(e.x, N.cloudX + 40 + 10 * t, r) + 6 * Math.sin(8 * s + t),
        y: l(e.y, 150, r),
        o: Q * Math.sin(Math.PI * s) * 0.8,
        sc: 0.85 - 0.3 * s,
      };
    }),
    J = N.raining
      ? Array.from(
          {
            length: 30,
          },
          (e, t) => {
            let s = N.cloudX + ((t % 15) - 7) * 12 * G + 6 * (t >= 15),
              r = (function (e) {
                if (e <= c[0][0]) return 380;
                for (let t = 0; t < c.length - 1; t++) {
                  let [s, r] = c[t],
                    [a, i] = c[t + 1];
                  if (e <= a) return l(r, i, (e - s) / (a - s));
                }
                return c[c.length - 1][1];
              })(s),
              a = r < 226,
              n = i(R * (a ? 0.5 : 1.5) + 0.173 * t + 0.5 * (t >= 15)),
              o = l(O - 4, r, n);
            return {
              x: s + (a ? 5 * Math.sin(10 * n + t) : 0),
              y: o,
              snowy: a,
              ground: r,
            };
          },
        )
      : [],
    ee = N.runoff,
    et = (function (e) {
      let t = a(0.28, 0.75, e.sun);
      switch (e.drop) {
        case "lake":
          if (e.trips > 0)
            return "Home again! Our drop went all the way round and landed back in the lake. With the sun up, it will float up and go round again.";
          if (t > 0.5) return "The sun is warming the lake. Watch our little drop…";
          return "Our little water drop is resting in the lake. The sun is low and the water is cool. Drag the sun up high, or press “Warm it up”.";
        case "rising":
          return "Evaporation! The sun warms the water, and our drop floats up as invisible water vapour. Plants breathe out water too — see it rising from the trees.";
        case "cloud":
          if (e.raining) return "Precipitation! The heavy cloud is letting its water fall…";
          if (e.fill < 0.55)
            return "Condensation! High up the air is cold, so the vapour turns back into tiny droplets. Lots of droplets together make a cloud.";
          if (e.cloudX >= 560) return "The cloud is over the cold mountain. Here it comes…";
          return "Condensation! Up high the vapour cools into tiny droplets, and now the cloud is full, heavy and dark. Drag it over the mountain, or press “Blow the wind”.";
        case "falling":
          return "Precipitation! The heavy cloud lets its water fall as rain — and as snow on the cold mountain top. Our drop is falling!";
        case "stream":
          return "Collection! The rain runs downhill in a stream, back to the lake. Some soaks into the ground and flows slowly underneath — that’s groundwater.";
      }
    })(N),
    es = Q < 0.45 && 0 === N.trips && "sun" !== N.dragging && null === N.sunGoal,
    er = "cloud" === N.drop && N.fill >= 0.55 && !z && !N.raining && "cloud" !== N.dragging && null === N.windGoal,
    el =
      "evaporation" === F
        ? {
            text: "Evaporation",
            x: 196,
            y: 344,
          }
        : "condensation" === F
          ? {
              text: "Condensation",
              x: r(N.cloudX, 130, 670),
              y: 34,
            }
          : "precipitation" === F
            ? {
                text: "Precipitation",
                x: r(N.cloudX - 190, 150, 600),
                y: 196,
              }
            : "collection" === F
              ? {
                  text: "Collection",
                  x: 520,
                  y: 432,
                }
              : null;
  return (
    <div ref={v} className="grid gap-4 text-ink">
      <div className="overflow-hidden rounded-2xl border border-line bg-paper-2">
        <svg
          ref={C}
          viewBox="0 0 800 500"
          className="block h-auto w-full select-none"
          role="img"
          aria-label="A lake, a forest, a snowy mountain, the sun and a cloud. A little water drop travels from the lake up into the cloud, falls as rain on the mountain and runs down a stream back to the lake."
        >
          <defs>
            <linearGradient id={`${$}-sky`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor={B} />
              <stop offset="1" stopColor={X} />
            </linearGradient>
            <linearGradient id={`${$}-lake`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#5aa7e0" />
              <stop offset="1" stopColor="#2c6fb5" />
            </linearGradient>
            <linearGradient id={`${$}-mtn`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#8c9bb0" />
              <stop offset="1" stopColor="#6f7f96" />
            </linearGradient>
          </defs>
          <rect width="800" height="500" fill={`url(#${$}-sky)`} />
          <g transform={`translate(${I.x} ${I.y})`}>
            <g
              role="slider"
              tabIndex={0}
              aria-label="The sun. Drag it up to warm the lake."
              aria-orientation="vertical"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(100 * N.sun)}
              aria-valuetext={Q > 0.5 ? "High and hot" : "Low and cool"}
              onPointerDown={(e) => {
                (e.preventDefault(),
                  e.currentTarget.setPointerCapture(e.pointerId),
                  Z((e) => ({
                    ...e,
                    dragging: "sun",
                    sunGoal: null,
                  })));
              }}
              onPointerMove={(e) => {
                if (!e.currentTarget.hasPointerCapture(e.pointerId)) return;
                let t = S(e);
                if (!t) return;
                let s = r((300 - t.y) / 228);
                Z((e) => ({
                  ...e,
                  sun: s,
                }));
              }}
              onPointerUp={D}
              onPointerCancel={D}
              onKeyDown={(e) => {
                let t = "ArrowUp" === e.key || "ArrowRight" === e.key ? 0.1 : "ArrowDown" === e.key || "ArrowLeft" === e.key ? -0.1 : 0,
                  s = "Home" === e.key ? 0 : "End" === e.key ? 1 : null;
                (t || null !== s) &&
                  (e.preventDefault(),
                  Z((e) => ({
                    ...e,
                    sunGoal: null,
                    sun: s ?? r(e.sun + t),
                  })));
              }}
              className="focus:outline-none focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-gold focus-visible:outline-solid"
              style={{
                touchAction: "none",
                cursor: "sun" === N.dragging ? "grabbing" : "grab",
              }}
            >
              <circle r={66} fill="#ffffff" opacity={0} />
              <circle r={52 + 8 * Q} fill="#ffd966" opacity={0.25} />
              <g transform={`rotate(${12 * R})`} stroke="#f2b632" strokeWidth={6} strokeLinecap="round">
                {Array.from(
                  {
                    length: 12,
                  },
                  (e, s) => {
                    let r = (s / 12) * Math.PI * 2;
                    return (
                      <path key={s} d={`M ${n(44 * Math.cos(r))} ${n(44 * Math.sin(r))} L ${n(54 * Math.cos(r))} ${n(54 * Math.sin(r))}`} />
                    );
                  },
                )}
              </g>
              <circle r={36} fill="#f7c948" stroke="#e6a92a" strokeWidth={3} />
              <path d="M-14 -4 q 4 -5 8 0 M6 -4 q 4 -5 8 0" stroke="#8a5a1a" strokeWidth={3} fill="none" strokeLinecap="round" />
              <path d="M-11 8 Q 0 17 11 8" stroke="#8a5a1a" strokeWidth={3} fill="none" strokeLinecap="round" />
              <circle cx={-19} cy={6} r={4} fill="#f29a6a" opacity={0.6} />
              <circle cx={19} cy={6} r={4} fill="#f29a6a" opacity={0.6} />
            </g>
          </g>
          <g opacity={0.75} transform={`translate(${n(730 + 12 * Math.sin(0.1 * R))} 56) scale(0.8)`}>
            <circle cx={-20} cy={4} r={14} fill="#ffffff" />
            <circle cx={0} cy={-4} r={18} fill="#ffffff" />
            <circle cx={20} cy={4} r={13} fill="#ffffff" />
          </g>
          <path d="M0 336 Q 110 292 230 320 T 470 312 L 470 420 L 0 420 Z" fill="#a9c79d" />
          <path d="M600 312 Q 700 262 800 282 L 800 420 L 600 420 Z" fill="#9dbd92" />
          <path d={`M ${c.map(([e, t]) => `${e} ${t}`).join(" L ")} L 800 440 L 420 440 Z`} fill={`url(#${$}-mtn)`} />
          <path d="M640 164 L680 200 L716 234 L760 262 L800 278 L800 440 L660 440 Z" fill="#5f6f86" opacity={0.35} />
          <path
            d="M593 214 L600 206 L640 164 L680 200 L693 212 L684 222 L670 211 L655 226 L640 213 L624 228 L610 215 Z"
            fill="#f7f7f2"
            stroke="#dfe6ee"
            strokeWidth={2}
          />
          <path d="M640 164 L680 200 L693 212 L684 222 L670 211 L655 226 L640 213 Z" fill="#dbe4ee" />
          <path d="M0 384 Q 200 366 420 378 T 800 372 L 800 470 L 0 470 Z" fill="#8fbf6a" />
          <path d="M0 400 Q 200 388 420 398 T 800 392 L 800 470 L 0 470 Z" fill="#84b562" />
          {p.map((e, s) => ("spruce" === e.kind ? <CM_ key={s} {...e} /> : <CG_ key={s} {...e} />))}
          <path d={x} fill="none" stroke="#3f8fd0" strokeWidth={7 + 6 * ee} strokeLinecap="round" strokeLinejoin="round" />
          <path
            d={x}
            fill="none"
            stroke="#ffffff"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeDasharray="8 16"
            strokeDashoffset={-(60 * R)}
            opacity={0.25 + 0.6 * ee}
          />
          <ellipse cx={190} cy={420} rx={176} ry={46} fill="#d9c894" />
          <ellipse cx={190} cy={420} rx={168} ry={40} fill={`url(#${$}-lake)`} />
          <g stroke="#ffffff" strokeWidth={2.5} strokeLinecap="round" fill="none" opacity={0.55}>
            <path d={`M ${n(96 + 4 * Math.sin(R))} 410 q 10 -4 20 0`} />
            <path d={`M ${n(280 + 4 * Math.sin(R + 1))} 428 q 10 -4 20 0`} />
            <path d={`M ${n(150 + 4 * Math.sin(R + 2))} 440 q 10 -4 20 0`} />
          </g>
          <path d="M0 462 Q 200 456 400 462 T 800 460 L 800 500 L 0 500 Z" fill="#7a5a3f" />
          <g opacity={ee}>
            <g stroke="#9fd0f5" strokeWidth={3} strokeLinecap="round" fill="none" strokeDasharray="6 8" strokeDashoffset={20 * R}>
              <path d="M540 398 L540 452" />
              <path d="M470 408 L470 452" />
              <path d="M640 480 L360 480" />
            </g>
            <path d="M360 480 l 12 -7 l 0 14 Z M540 452 l -6 -10 l 12 0 Z M470 452 l -6 -10 l 12 0 Z" fill="#9fd0f5" />
            <text x={660} y={488} fontSize={20} fontWeight={700} fill="#e9f5ff">
              groundwater
            </text>
          </g>
          {_.map((e, s) =>
            e.o > 0.02 ? (
              <path
                key={`l${s}`}
                d="M0 0 c 6 -6 -6 -12 0 -18 s -6 -12 0 -18"
                transform={`translate(${n(e.x)} ${n(e.y)}) scale(${n(e.sc)})`}
                stroke="#ffffff"
                strokeWidth={4.5}
                strokeLinecap="round"
                fill="none"
                opacity={e.o}
              />
            ) : null,
          )}
          {V.map((e, s) =>
            e.o > 0.02 ? (
              <path
                key={`t${s}`}
                d="M0 0 c 5 -5 -5 -10 0 -15 s -5 -10 0 -15"
                transform={`translate(${n(e.x)} ${n(e.y)}) scale(${n(e.sc)})`}
                stroke="#e4f6dc"
                strokeWidth={4}
                strokeLinecap="round"
                fill="none"
                opacity={e.o}
              />
            ) : null,
          )}
          <g fill="none" strokeLinecap="round">
            {Object.entries(U).map(([e, s]) => (
              <path key={e} d={s} stroke="#ffffff" strokeWidth={4} strokeDasharray="1 11" opacity={0.8 * ("stream" !== e)} />
            ))}
            {K && <path d={U[K]} stroke="#d9a441" strokeWidth={5} strokeDasharray="12 10" strokeDashoffset={-(30 * R)} opacity={0.95} />}
          </g>
          {J.map((e, s) =>
            e.snowy ? (
              <g key={s} transform={`translate(${n(e.x)} ${n(e.y)})`} stroke="#ffffff" strokeWidth={3} strokeLinecap="round">
                <path d="M-7 0 L7 0 M-3.5 -6 L3.5 6 M-3.5 6 L3.5 -6" />
              </g>
            ) : (
              <path
                key={s}
                d={`M ${n(e.x)} ${n(e.y)} l -2 ${n(Math.min(20, e.ground - e.y))}`}
                stroke="#2c6fb5"
                strokeWidth={4}
                strokeLinecap="round"
              />
            ),
          )}
          <g transform={`translate(${N.cloudX} 116)`}>
            <g
              role="slider"
              tabIndex={0}
              aria-label="The cloud. Drag it over the mountain."
              aria-valuemin={150}
              aria-valuemax={700}
              aria-valuenow={Math.round(N.cloudX)}
              aria-valuetext={z ? "Over the mountain" : "Over the lake"}
              onPointerDown={(e) => {
                e.preventDefault();
                let t = S(e);
                t &&
                  (e.currentTarget.setPointerCapture(e.pointerId),
                  (W.current = t.x - N.cloudX),
                  Z((e) => ({
                    ...e,
                    dragging: "cloud",
                    windGoal: null,
                  })));
              }}
              onPointerMove={(e) => {
                if (!e.currentTarget.hasPointerCapture(e.pointerId)) return;
                let t = S(e);
                if (!t) return;
                let s = r(t.x - W.current, 150, 700);
                Z((e) => ({
                  ...e,
                  cloudX: s,
                }));
              }}
              onPointerUp={D}
              onPointerCancel={D}
              onKeyDown={(e) => {
                let t = "ArrowRight" === e.key || "ArrowUp" === e.key ? 40 : "ArrowLeft" === e.key || "ArrowDown" === e.key ? -40 : 0,
                  s = "Home" === e.key ? 300 : "End" === e.key ? 632 : null;
                (t || null !== s) &&
                  (e.preventDefault(),
                  Z((e) => ({
                    ...e,
                    windGoal: s,
                    cloudX: null === s ? r(e.cloudX + t, 150, 700) : e.cloudX,
                  })));
              }}
              className="focus:outline-none focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-gold focus-visible:outline-solid"
              style={{
                touchAction: "none",
                cursor: "cloud" === N.dragging ? "grabbing" : "grab",
              }}
            >
              <g transform={`scale(${G})`}>
                <rect x={-110} y={-80} width={220} height={140} fill="#ffffff" opacity={0} />
                {h.map(([e, s, r], l) => (
                  <circle key={`s${l}`} cx={e} cy={s + 6} r={r} fill={E} />
                ))}
                {h.map(([e, s, r], l) => (
                  <circle key={l} cx={e} cy={s} r={r} fill={q} />
                ))}
                <circle cx={-10} cy={-30} r={14} fill="#ffffff" opacity={0.35 * (1 - P)} />
              </g>
            </g>
          </g>
          <g
            transform={`translate(${n(H)} ${n(Y)})`}
            style={{
              pointerEvents: "none",
            }}
          >
            <CK_ vapour={"rising" === N.drop} />
          </g>
          {es && (
            <g
              style={{
                pointerEvents: "none",
              }}
            >
              <CB_ x={I.x + 150} y={I.y - 8} text="Drag me up!" size={26} tone="gold" />
              <path
                d={`M ${I.x + 62} ${I.y - 34} l 0 -30 m -10 10 l 10 -10 l 10 10`}
                stroke="#a8791f"
                strokeWidth={4}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          )}
          {er && (
            <g
              style={{
                pointerEvents: "none",
              }}
            >
              <CB_ x={r(N.cloudX + 300, 330, 600)} y={130} text="Drag me to the mountain →" size={22} tone="gold" />
            </g>
          )}
          {el && (
            <g
              style={{
                pointerEvents: "none",
              }}
            >
              <CB_ x={el.x} y={el.y} text={el.text} size={27} />
            </g>
          )}
          {"evaporation" === F && (
            <g
              style={{
                pointerEvents: "none",
              }}
            >
              <CB_ x={500} y={262} text="Plants breathe out water too!" size={18} />
            </g>
          )}
        </svg>
      </div>
      <ol className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {y.map((e, s) => {
          let r = e.id === F;
          return (
            <li
              key={e.id}
              aria-current={r ? "step" : undefined}
              className={`relative rounded-xl border p-2.5 transition ${r ? "border-gold bg-gold/15" : "border-line bg-paper-2/50"}`}
            >
              {r && (
                <span className="absolute -right-1.5 -top-2.5">
                  <CW_ />
                </span>
              )}
              <p className="text-sm font-semibold leading-tight">
                <span className="text-ink-2">{s + 1}.</span> {e.name}
              </p>
              <p className="mt-1 text-xs leading-snug text-ink-2">{e.words}</p>
            </li>
          );
        })}
      </ol>
      <p className="min-h-[4.5rem] rounded-xl border-l-4 border-l-azure bg-paper-2/60 p-3 text-base leading-relaxed" aria-live="polite">
        {et}
      </p>
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() =>
            Z((e) => ({
              ...e,
              sunGoal: 1,
            }))
          }
          disabled={N.sun > 0.95 || 1 === N.sunGoal}
          className="min-h-11 rounded-full bg-moss px-4 py-2 font-semibold text-white transition active:scale-95 disabled:opacity-50"
        >
          {N.sun > 0.95 ? "The sun is high" : "Warm it up"}
        </button>
        <button
          type="button"
          onClick={() =>
            Z((e) => ({
              ...e,
              windGoal: 632,
            }))
          }
          disabled={z || 632 === N.windGoal}
          className="min-h-11 rounded-full bg-azure px-4 py-2 font-semibold text-white transition active:scale-95 disabled:opacity-50"
        >
          Blow the wind
        </button>
        <button
          type="button"
          onClick={() =>
            Z({
              ...j,
            })
          }
          className="min-h-11 rounded-full border border-line bg-paper px-4 py-2 font-semibold text-ink-2 transition hover:border-moss hover:text-moss active:scale-95"
        >
          Start again
        </button>
        <span className="ml-auto rounded-full bg-paper-2 px-3 py-1.5 text-sm font-semibold text-ink-2">
          {"Trips round the loop: "}
          <span className="text-ink">{N.trips}</span>
        </span>
      </div>
      <p className="rounded-xl bg-azure/10 px-4 py-3 font-display text-lg font-semibold leading-snug text-azure">
        The same water goes round and round — the water in your glass might once have been in a dinosaur’s puddle.
      </p>
      <M />
    </div>
  );
};
