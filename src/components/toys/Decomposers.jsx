"use client";
/* eslint-disable @typescript-eslint/no-unused-expressions, react-hooks/immutability -- restored from the minified bundle: refs keep their one-letter names and statements keep the compiler's comma and && form. */
// Restored from client module 42550 (exports: Decomposers)
import * as d from "react";
let t, s, r, l, a, i, n, o;
let x = [
    {
      at: 0,
      years: 0,
      step: "log",
      caption:
        "A big maple tree blew down in a storm. Now it is a log lying on the forest floor, with red and yellow leaves all around it.",
    },
    {
      at: 100,
      years: 0.5,
      step: "decomposers",
      caption: "Bark beetles chew wiggly tunnels under the bark and lay their eggs there. Their tunnels let water and fungi into the wood.",
    },
    {
      at: 200,
      years: 2,
      step: "decomposers",
      caption:
        "Fungi are breaking down the wood from the inside. Turkey tail fungus pokes out like little striped shelves, and soft moss grows on top. The autumn leaves have already rotted away.",
    },
    {
      at: 300,
      years: 5,
      step: "decomposers",
      caption:
        "The wood is getting soft. Carpenter ants chew out rooms for their nest. They don't eat the wood — they push the sawdust out of the door.",
    },
    {
      at: 400,
      years: 8,
      step: "decomposers",
      caption: "A red-backed salamander hides in the cool, damp dark under the log. It hunts the tiny bugs that live there.",
    },
    {
      at: 500,
      years: 12,
      step: "decomposers",
      caption: "The log is crumbly now. Millipedes, woodlice and earthworms munch the soft, rotten bits and mix them into the soil.",
    },
    {
      at: 600,
      years: 16,
      step: "soil",
      caption:
        "The log has gone soft and dark, like wet chocolate cake. A maple seed landed on it and sprouted! A rotting log that feeds new plants is called a nurse log.",
    },
    {
      at: 700,
      years: 20,
      step: "newtree",
      caption:
        "The old log has turned into rich, dark soil, and a young maple is growing right where it lay. A log this size takes about twenty years or more; a giant one takes much longer.",
    },
  ],
  f = [
    {
      id: "tree",
      label: "Tree",
    },
    {
      id: "log",
      label: "Log",
    },
    {
      id: "decomposers",
      label: "Decomposers",
    },
    {
      id: "soil",
      label: "Soil",
    },
    {
      id: "newtree",
      label: "New tree",
    },
  ],
  h = (e, t = 0, s = 1) => Math.min(s, Math.max(t, e)),
  p = (e, t, s) => h((e - t) / (s - t)),
  u = (e, t, s) => e + (t - e) * s,
  j = (e) => e * e * (3 - 2 * e),
  y = (e) => Math.round(100 * e) / 100,
  m = (e) => e.replace(/-?\d*\.?\d+(?:e[-+]?\d+)?/gi, (e) => String(y(parseFloat(e))));
function g(e, t, s) {
  let r = [1, 3, 5].map((t) => parseInt(e.slice(t, t + 2), 16)),
    l = [1, 3, 5].map((e) => parseInt(t.slice(e, e + 2), 16));
  return `#${r
    .map((e, t) =>
      Math.round(u(e, l[t], h(s)))
        .toString(16)
        .padStart(2, "0"),
    )
    .join("")}`;
}
function k(e) {
  let t = e >>> 0;
  return () => {
    let e = (t = (t + 0x6d2b79f5) >>> 0);
    return ((e = Math.imul(e ^ (e >>> 15), 1 | e)), (((e ^= e + Math.imul(e ^ (e >>> 7), 61 | e)) ^ (e >>> 14)) >>> 0) / 0x100000000);
  };
}
let b = (e, t) => {
    let s = Math.pow(1 - Math.sin(Math.PI * h((t - e.left) / (e.right - e.left))), 1.15);
    return e.top + e.bump * (0.6 * Math.sin(0.043 * t + 0.7) + 0.4 * Math.sin(0.121 * t + 2.1)) + (e.bot - e.top) * 0.85 * e.crumble * s;
  },
  w = (e, t) => e.top + (e.bot - e.top) * t,
  M =
    ((t = k(11)),
    (s = ["#9b7244", "#86623a", "#b08653", "#a07a4a", "#7d5a35"]),
    Array.from(
      {
        length: 70,
      },
      () => ({
        x: 800 * t(),
        y: 306 + 84 * t(),
        rx: 5 + 5 * t(),
        ry: 2 + 2 * t(),
        a: 180 * t(),
        c: s[Math.floor(t() * s.length)],
      }),
    )),
  L = ["#c8352b", "#e0782f", "#e8b23a", "#d65a2a", "#b8322a"],
  $ =
    ((r = k(23)),
    Array.from(
      {
        length: 9,
      },
      () => ({
        x: 30 + 740 * r(),
        y: 318 + 34 * r(),
        a: 360 * r(),
        s: 0.95 + 0.4 * r(),
        c: L[Math.floor(r() * L.length)],
      }),
    )),
  v =
    ((l = k(29)),
    Array.from(
      {
        length: 11,
      },
      () => ({
        x: 30 + 740 * l(),
        y: 380 + 12 * l(),
        a: 360 * l(),
        s: 1 + 0.45 * l(),
        c: L[Math.floor(l() * L.length)],
      }),
    )),
  C = [
    {
      x: 190,
      a: 20,
      s: 1.2,
      c: "#e0782f",
    },
    {
      x: 300,
      a: -35,
      s: 1.3,
      c: "#c8352b",
    },
    {
      x: 470,
      a: 60,
      s: 1.1,
      c: "#e8b23a",
    },
    {
      x: 580,
      a: -10,
      s: 1.25,
      c: "#d65a2a",
    },
  ],
  W =
    ((a = k(37)),
    Array.from(
      {
        length: 22,
      },
      () => ({
        x: 800 * a(),
        y: 412 + 82 * a(),
        rx: 3 + 6 * a(),
        ry: 2 + 3.5 * a(),
      }),
    )),
  N =
    ((i = k(41)),
    Array.from(
      {
        length: 36,
      },
      () => ({
        x: 132 + 500 * i(),
        f: 0.14 + 0.7 * i(),
        len: 0.12 + 0.16 * i(),
        tilt: (i() - 0.5) * 6,
      }),
    )),
  Z = [
    [170, 262, 0],
    [340, 430, 0.12],
    [492, 590, 0.24],
    [120, 170, 0.45],
    [262, 340, 0.52],
    [590, 646, 0.6],
    [430, 492, 0.72],
  ];
function A(e, t, s) {
  let r = Math.max(2, Math.round((s - t) / 8)),
    l = (s - t) / r,
    a = `M ${t} ${b(e, t) + 5}`;
  for (let s = 1; s <= r; s++) {
    let r = t + l * s;
    a += ` Q ${r - l / 2} ${b(e, r - l / 2) - 9} ${r} ${b(e, r) - 1}`;
  }
  for (let s = r; s >= 0; s--) {
    let r = t + l * s;
    a += ` L ${r} ${b(e, r) + 10 + 4 * Math.sin(0.23 * r)}`;
  }
  return m(`${a} Z`);
}
let T =
    ((n = k(71)),
    Array.from(
      {
        length: 16,
      },
      (e, t) => ({
        a: (t / 16) * Math.PI * 2,
        k: 0.82 + 0.3 * n(),
      }),
    )),
  S =
    ((o = k(61)),
    Array.from(
      {
        length: 44,
      },
      () => ({
        x: 120 + 520 * o(),
        f: 0.2 + 0.7 * o(),
        r: 1.4 + 2.2 * o(),
        light: o() > 0.55,
      }),
    )),
  D = [
    [180, 4, 70, "#c9a449"],
    [610, 0, 66, "#d08a3c"],
    [30, 6, 70, "#5b8446"],
    [120, -18, 78, "#6f9656"],
    [248, -6, 66, "#86a860"],
    [340, -22, 80, "#5b8446"],
    [450, -2, 70, "#6f9656"],
    [540, -20, 76, "#86a860"],
    [676, -4, 70, "#5b8446"],
    [770, -14, 80, "#6f9656"],
  ],
  Q = [
    {
      x: 255,
      w: 14,
      base: 308,
      c: "#b4a894",
    },
    {
      x: 575,
      w: 16,
      base: 306,
      c: "#b4a894",
    },
    {
      x: 46,
      w: 36,
      base: 318,
      c: "#8d7f6d",
    },
    {
      x: 140,
      w: 22,
      base: 312,
      birch: true,
      c: "#efe9dc",
    },
    {
      x: 690,
      w: 32,
      base: 316,
      c: "#86796a",
    },
    {
      x: 764,
      w: 22,
      base: 310,
      birch: true,
      c: "#efe9dc",
    },
  ],
  I =
    "M0 -11 L2.6 -5.6 L6.8 -8 L5.8 -2.6 L10.5 -3.2 L8 0.8 L10 3.4 L3.6 3 L2.2 7.4 L0.7 5.4 L0.7 11 L-0.7 11 L-0.7 5.4 L-2.2 7.4 L-3.6 3 L-10 3.4 L-8 0.8 L-10.5 -3.2 L-5.8 -2.6 L-6.8 -8 L-2.6 -5.6 Z";
function F({ x: e, y: t, a: s, s: r, c: l }) {
  return (
    <g transform={`translate(${e} ${t}) rotate(${s}) scale(${r})`}>
      <path d={I} fill={l} stroke={l} strokeWidth={1.2} strokeLinejoin="round" />
      <path d="M0 -7 L0 8 M0 0 L-5 -3 M0 0 L5 -3" stroke={g(l, "#000000", 0.25)} strokeWidth={0.8} fill="none" />
    </g>
  );
}
function G({ r: e }) {
  return (
    <g>
      {[
        [1, "#efe4cf"],
        [0.9, "#8a5a3c"],
        [0.76, "#c49a6c"],
        [0.62, "#6b4330"],
        [0.48, "#b0703f"],
        [0.34, "#7c5a44"],
        [0.2, "#5a3a28"],
      ].map(([t, s]) => (
        <path
          key={t}
          d={(function (e) {
            let t = "M 0 2";
            for (let s = 0; s <= 7; s++) {
              let r = Math.PI * (1.08 + (s / 7) * 0.84),
                l = Math.cos(r) * e,
                a = Math.sin(r) * e * 0.78;
              if (0 === s) t += ` L ${l} ${a}`;
              else {
                let r = Math.PI * (1.08 + ((s - 0.5) / 7) * 0.84);
                t += ` Q ${Math.cos(r) * e * 1.1} ${Math.sin(r) * e * 0.86} ${l} ${a}`;
              }
            }
            return m(`${t} Z`);
          })(e * t)}
          fill={s}
        />
      ))}
    </g>
  );
}
function P() {
  return (
    <g>
      <path
        d="M-5 -3 L-9 -6 M-5 3 L-9 6 M0 -3.5 L0 -7 M0 3.5 L0 7 M4 -3 L8 -6 M4 3 L8 6"
        stroke="#2a1a12"
        strokeWidth={1.1}
        strokeLinecap="round"
      />
      <ellipse cx={-1} cy={0} rx={6.5} ry={3.8} fill="#4a2c1c" />
      <circle cx={6.2} cy={0} r={2.4} fill="#2e1c13" />
      <path d="M-7 0 L4.5 0" stroke="#2a1a12" strokeWidth={0.7} />
      <ellipse cx={-2} cy={-1.4} rx={3} ry={1} fill="#7a513a" opacity={0.7} />
    </g>
  );
}
function CQ_() {
  return (
    <g>
      <path
        d="M-1 0 L-5 -6 M-1 0 L-5 6 M1 0 L1 -7 M1 0 L1 7 M2 0 L6 -6 M2 0 L6 6"
        stroke="#1d1a18"
        strokeWidth={1.1}
        strokeLinecap="round"
        fill="none"
      />
      <ellipse cx={-7} cy={0} rx={5.2} ry={3.8} fill="#1d1a18" />
      <ellipse cx={0.5} cy={0} rx={3.4} ry={2.1} fill="#2a2522" />
      <circle cx={6} cy={0} r={2.9} fill="#1d1a18" />
      <path d="M7.5 -1.5 Q10 -5 12.5 -4.5 M7.5 1.5 Q10 5 12.5 4.5" stroke="#1d1a18" strokeWidth={0.9} fill="none" strokeLinecap="round" />
      <ellipse cx={-8} cy={-1.3} rx={2} ry={0.9} fill="#ffffff" opacity={0.25} />
    </g>
  );
}
function E() {
  return (
    <g>
      <path d="M-18 4 l-4 7 M-18 4 l-7 3 M14 3 l-2 8 M14 3 l6 6" stroke="#3a3b40" strokeWidth={3.4} strokeLinecap="round" />
      <path d="M-62 6 C -48 10, -38 2, -24 3 C -8 4, 2 -1, 16 0" stroke="#3e3f45" strokeWidth={10} strokeLinecap="round" fill="none" />
      <path d="M-70 8 C -66 8, -64 7, -60 6" stroke="#3e3f45" strokeWidth={5} strokeLinecap="round" fill="none" />
      <path
        d="M-48 5.6 C -38 -1, -26 0.6, -14 0.8 C -4 0.8, 4 -2.8, 14 -2.6"
        stroke="#cf5a2e"
        strokeWidth={4.2}
        strokeLinecap="round"
        fill="none"
      />
      <ellipse cx={22} cy={0} rx={10} ry={6.8} fill="#3e3f45" />
      <path d="M14 -3 C 18 -6, 24 -6, 28 -3" stroke="#cf5a2e" strokeWidth={2.4} strokeLinecap="round" fill="none" />
      <circle cx={25} cy={-2} r={2.2} fill="#111111" />
      <circle cx={25.7} cy={-2.7} r={0.7} fill="#ffffff" />
      <path d="M26 3 Q29 3.6 31 2.4" stroke="#1a1a1c" strokeWidth={0.9} fill="none" />
      <circle cx={-20} cy={7} r={0.9} fill="#e9e6de" opacity={0.7} />
      <circle cx={-2} cy={5} r={0.8} fill="#e9e6de" opacity={0.7} />
    </g>
  );
}
function O() {
  let e = Array.from(
    {
      length: 14,
    },
    (e, t) => {
      let s = t / 13;
      return {
        x: y(-40 + 80 * s),
        y: y(-(10 * Math.sin(s * Math.PI))),
      };
    },
  );
  return (
    <g>
      {e.map((e, t) => (
        <path
          key={`l${t}`}
          d={`M ${e.x} ${e.y + 3} l -2 6 M ${e.x + 2} ${e.y + 3} l 2 6`}
          stroke="#c98b4a"
          strokeWidth={1}
          strokeLinecap="round"
        />
      ))}
      {e.map((e, t) => (
        <circle key={t} cx={e.x} cy={e.y} r={5} fill={t % 2 ? "#4b3426" : "#553b2b"} stroke="#9a4e2c" strokeWidth={1} />
      ))}
      <circle cx={44} cy={-1} r={4.6} fill="#3f2b1f" />
      <path d="M47 -3 q5 -5 8 -3 M47 1 q6 -1 8 2" stroke="#3f2b1f" strokeWidth={1} fill="none" />
    </g>
  );
}
function B() {
  return (
    <g>
      <path d="M-8 4 l-2 4 M-3 5 l-1 4 M2 5 l1 4 M7 4 l2 4" stroke="#5f636a" strokeWidth={1} strokeLinecap="round" />
      <ellipse cx={0} cy={0} rx={12} ry={7} fill="#7b7f86" />
      {[-7, -3.5, 0, 3.5, 7].map((e) => (
        <path key={e} d={`M ${e} -6.6 Q ${e + 1.2} 0 ${e} 6.6`} stroke="#5d6168" strokeWidth={0.9} fill="none" />
      ))}
      <ellipse cx={-2} cy={-3} rx={6} ry={1.6} fill="#ffffff" opacity={0.18} />
      <path d="M11 -2 q5 -5 8 -4 M11 2 q5 3 8 3" stroke="#5f636a" strokeWidth={1} fill="none" />
    </g>
  );
}
function X({ d: e }) {
  return (
    <g>
      <path d={e} stroke="#6b4a36" strokeWidth={14} strokeLinecap="round" fill="none" opacity={0.55} />
      <path d={e} stroke="#d9868a" strokeWidth={7} strokeLinecap="round" fill="none" />
      <path d={e} stroke="#b9676d" strokeWidth={7} strokeLinecap="butt" fill="none" strokeDasharray="1 5" />
    </g>
  );
}
function CZ_({ step: e }) {
  let t = Math.max(
      0,
      f.findIndex((t) => t.id === e),
    ),
    s = 80,
    r = [0, 30, 0, 0, -38],
    l = (e) => ((-90 + 72 * e) * Math.PI) / 180,
    a = (e, t = s) => [y(150 + t * Math.cos(e)), y(116 + t * Math.sin(e))];
  return (
    <svg
      viewBox="0 0 300 250"
      className="mx-auto h-auto w-full max-w-[270px]"
      role="img"
      aria-label={`The nutrient cycle: tree, log, decomposers, soil, new tree, and round again. Now: ${f[t].label}.`}
    >
      {f.map((e, r) => {
        let i = l(r) + 0.38,
          n = l(r + 1) - 0.38,
          [o, d] = a(i),
          [x, h] = a(n),
          p = (r + 1) % f.length === t,
          u = r < t,
          j = p ? "#d9a441" : u ? "#2f5d3a" : "#cbbf9f",
          y = -Math.sin(n),
          g = Math.cos(n),
          k = Math.cos(n),
          b = Math.sin(n),
          w = m(`M ${x + 7 * y} ${h + 7 * g} L ${x - 3 * y + 6 * k} ${h - 3 * g + 6 * b} L ${x - 3 * y - 6 * k} ${h - 3 * g - 6 * b} Z`);
        return (
          <g key={e.id}>
            <path d={`M ${o} ${d} A ${s} ${s} 0 0 1 ${x} ${h}`} fill="none" stroke={j} strokeWidth={p ? 4 : 3} strokeLinecap="round" />
            <path d={w} fill={j} />
          </g>
        );
      })}
      {f.map((e, s) => {
        let [i, n] = a(l(s)),
          o = s === t,
          d = s < t;
        return (
          <g key={e.id} transform={`translate(${i} ${n})`}>
            <circle
              r={o ? 27 : 23}
              fill={o ? "#d9a441" : d ? "#e3ecdc" : "#fffdf8"}
              stroke={o ? "#a8791f" : d ? "#2f5d3a" : "#d9cfb8"}
              strokeWidth={o ? 3 : 2}
            />
            <R id={e.id} />
            <text
              x={r[s]}
              y={o ? 44 : 40}
              textAnchor="middle"
              fontSize={o ? 15 : 13}
              fontWeight={o ? 700 : 600}
              fill={o ? "#1f2a22" : "#4a5a4f"}
            >
              {e.label}
            </text>
          </g>
        );
      })}
      <text x={150} y={114} textAnchor="middle" fontSize={11} fill="#4a5a4f" fontStyle="italic">
        the nutrient
      </text>
      <text x={150} y={128} textAnchor="middle" fontSize={11} fill="#4a5a4f" fontStyle="italic">
        cycle
      </text>
    </svg>
  );
}
function R({ id: e }) {
  switch (e) {
    case "tree":
      return (
        <g>
          <rect x={-3} y={0} width={6} height={14} rx={2} fill="#7a5a3c" />
          <circle cx={0} cy={-5} r={11} fill="#4f8a3c" />
          <circle cx={-5} cy={-8} r={4} fill="#6fa656" />
        </g>
      );
    case "log":
      return (
        <g>
          <rect x={-15} y={-6} width={28} height={13} rx={6} fill="#8a6a4c" />
          <ellipse cx={13} cy={0.5} rx={4.5} ry={6.5} fill="#d9b98a" stroke="#8a6a4c" strokeWidth={1} />
          <ellipse cx={13} cy={0.5} rx={1.8} ry={2.8} fill="none" stroke="#a0784f" strokeWidth={0.8} />
        </g>
      );
    case "decomposers":
      return (
        <g>
          <rect x={-3} y={-2} width={6} height={12} rx={2} fill="#efe4cf" />
          <path d="M-13 0 Q -12 -14 0 -14 Q 12 -14 13 0 Z" fill="#b77a4c" />
          <circle cx={-5} cy={-8} r={2} fill="#efe4cf" />
          <circle cx={4} cy={-6} r={1.6} fill="#efe4cf" />
          <path d="M-12 12 q4 -4 8 0 t8 0" stroke="#d9868a" strokeWidth={3} fill="none" strokeLinecap="round" />
        </g>
      );
    case "soil":
      return (
        <g>
          <path d="M-16 8 Q -8 -10 0 -8 Q 10 -12 16 8 Z" fill="#4a3322" />
          <circle cx={-6} cy={1} r={1.6} fill="#8a6a4c" />
          <circle cx={5} cy={-2} r={1.4} fill="#8a6a4c" />
          <circle cx={2} cy={4} r={1.2} fill="#8a6a4c" />
        </g>
      );
    case "newtree":
      return (
        <g>
          <path d="M-14 10 Q 0 6 14 10" stroke="#4a3322" strokeWidth={3} fill="none" strokeLinecap="round" />
          <path d="M0 9 L0 -8" stroke="#4f8a3c" strokeWidth={2.4} strokeLinecap="round" />
          <path d="M0 -4 Q -10 -10 -11 -2 Q -5 0 0 -4 Z" fill="#6fa656" />
          <path d="M0 -8 Q 10 -15 11 -6 Q 5 -4 0 -8 Z" fill="#4f8a3c" />
        </g>
      );
  }
}
function H() {
  return (
    <div className="rounded-xl border border-line p-4">
      <h3 className="font-display text-lg font-semibold">Say it like this</h3>
      <ul className="mt-2 grid gap-1.5 text-sm leading-relaxed">
        <li>
          <span className="font-semibold text-moss">Age 2:</span>
          {" “Old log. Soft, soft. Look — mushrooms! Who lives under the log?”"}
        </li>
        <li>
          <span className="font-semibold text-moss">Age 4:</span>
          {" “Fungi, bugs and worms eat the old log a tiny bit at a time, and it turns into soil.”"}
        </li>
        <li>
          <span className="font-semibold text-moss">Age 6:</span>
          {" “Where did the wood go? The decomposers turned it into soil, and now it feeds a new tree.”"}
        </li>
      </ul>
      <p className="mt-3 text-sm leading-relaxed">
        <span className="font-semibold text-rust">Go outside:</span>
        {" Find an old rotting log, gently roll it towards you, count who lives underneath, then roll it back just the way it was."}
      </p>
    </div>
  );
}
export const Decomposers = function () {
  let e,
    t,
    s = (0, d.useId)().replace(/[^a-zA-Z0-9_-]/g, ""),
    [r, l] = (0, d.useState)(0),
    [a, i] = (0, d.useState)(false),
    n = (0, d.useRef)(null),
    o = (0, d.useRef)(0);
  (0, d.useEffect)(() => {
    if (!a) return;
    let e = 0,
      t = 0,
      s = (r) => {
        if (t) {
          let e = Math.min(0.05, (r - t) / 1e3);
          l((t) => Math.min(700, t + 70 * e));
        }
        ((t = r), (e = requestAnimationFrame(s)));
      };
    return ((e = requestAnimationFrame(s)), () => cancelAnimationFrame(e));
  }, [a]);
  let f = (e) => Math.min(700, (Math.floor(e / 100 + 0.001) + 1) * 100),
    k = () => {
      ((n.current = null), i(false));
    },
    L = h(Math.floor((r + 40) / 100), 0, x.length - 1),
    R = (function (e) {
      if (e >= 699.5) return "About 20 years";
      let t = (function (e) {
          for (let t = 0; t < x.length - 1; t++) {
            let s = x[t],
              r = x[t + 1];
            if (e <= r.at) return u(s.years, r.years, (e - s.at) / (r.at - s.at));
          }
          return x[x.length - 1].years;
        })(e),
        s = 365 * t;
      if (s < 1.5) return "Day 1";
      if (s < 45) return `Day ${Math.round(s)}`;
      if (t < 1) return `${Math.round(12 * t)} months`;
      let r = Math.floor(t);
      return 1 === r ? "1 year" : `${r} years`;
    })(r),
    Y =
      ((e = j(p(r, 260, 700))),
      (t = j(p(r, 420, 690))),
      {
        top: u(232, 326, e),
        bot: u(378, 386, e),
        left: 116 - 22 * t,
        right: 648 + 4 * t,
        bump: 10 * t,
        crumble: t,
      }),
    { d: U, cap: K } = (function (e) {
      let t = [];
      for (let s = 0; s <= 30; s++) {
        let r = u(e.left, e.right, s / 30);
        t.push([r, b(e, r)]);
      }
      let s = Math.max(5, Math.min(28, (e.bot - e.top) * 0.2) * (1 - 0.75 * e.crumble)),
        r = `M ${t[0][0]} ${t[0][1]}`;
      for (let e = 1; e < 30; e++) {
        let [s, l] = t[e],
          [a, i] = t[e + 1];
        r += ` Q ${s} ${l} ${(s + a) / 2} ${(l + i) / 2}`;
      }
      let [l, a] = t[30];
      return {
        d: m(
          (r += ` L ${l} ${a} C ${e.right + s} ${a}, ${e.right + s} ${e.bot}, ${e.right} ${e.bot} L ${e.left} ${e.bot} C ${e.left - s} ${e.bot}, ${e.left - s} ${t[0][1]}, ${e.left} ${t[0][1]} Z`),
        ),
        cap: y(s),
      };
    })(Y),
    _ = Y.bot - Y.top,
    V = g(g("#8a735c", "#5e4533", p(r, 240, 600)), "#3a291e", p(r, 590, 700)),
    J = g("#d3ad7e", "#7a5537", p(r, 200, 560)),
    ee = 1 - p(r, 15, 110),
    et = 1 - p(r, 110, 190),
    es = p(r, 40, 100) * (1 - p(r, 250, 320)),
    er = p(r, 40, 100) * (1 - p(r, 470, 560)),
    el = 1 - p(r, 200, 470),
    ea = p(r, 140, 200) * (1 - p(r, 520, 600)),
    ei = 0.3 * p(r, 140, 220) + 0.7 * p(r, 220, 660),
    en = p(r, 240, 300) * (1 - p(r, 540, 600)),
    eo = p(r, 340, 400) * (1 - p(r, 630, 690)),
    ec = p(r, 440, 500),
    ed = 1 - p(r, 470, 590),
    ex = p(r, 150, 460),
    ef = p(r, 480, 680),
    eh = p(r, 420, 700),
    ep = p(r, 560, 630),
    eu = p(r, 630, 700),
    ej = p(r, 550, 590) * (1 - p(r, 660, 700)),
    ey = 1 - 0.85 * p(r, 560, 690),
    em = b(Y, 392) + 4,
    eg = 40 * ep + 120 * eu,
    ek = w(Y, 0.5),
    eb = 0.3 * _,
    ew = (b(Y, Y.right) + Y.bot) / 2,
    eM = (Y.bot - b(Y, Y.right)) / 2;
  return (
    <div className="grid gap-4 text-ink">
      <div className="overflow-hidden rounded-2xl border border-line bg-paper-2">
        <svg
          viewBox="0 0 800 500"
          className="block h-auto w-full"
          role="img"
          aria-label={`A fallen maple log on the forest floor, ${R.toLowerCase()} after it fell. ${x[L].caption}`}
        >
          <defs>
            <linearGradient id={`${s}-bg`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#cfe0bf" />
              <stop offset="0.62" stopColor="#eef0dc" />
            </linearGradient>
            <linearGradient id={`${s}-floor`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#bda173" />
              <stop offset="1" stopColor="#97733f" />
            </linearGradient>
            <linearGradient id={`${s}-soil`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#5e4331" />
              <stop offset="1" stopColor="#3a291e" />
            </linearGradient>
            <linearGradient id={`${s}-log`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor={g(V, "#ffffff", 0.16)} />
              <stop offset="0.55" stopColor={V} />
              <stop offset="1" stopColor={g(V, "#000000", 0.3)} />
            </linearGradient>
          </defs>
          <rect width="800" height="500" fill={`url(#${s}-bg)`} />
          <path d="M120 0 L220 0 L420 330 L330 330 Z M470 0 L540 0 L660 320 L600 320 Z" fill="#ffffff" opacity={0.22} />
          {Q.map((e) => (
            <g key={e.x}>
              <path
                d={`M ${e.x - e.w / 2} -10 L ${e.x + e.w / 2} -10 L ${e.x + e.w / 2 + 5} ${e.base} L ${e.x - e.w / 2 - 5} ${e.base} Z`}
                fill={e.c}
              />
              {e.birch ? (
                <g stroke="#3a3530" strokeWidth={3} strokeLinecap="round">
                  {[70, 112, 150, 198, 240, 284].map((t, s) => (
                    <path key={t} d={`M ${e.x - e.w / 2 + (s % 2 ? 6 : 1)} ${t} l ${0.4 * e.w} ${s % 2 ? 1 : -1}`} />
                  ))}
                </g>
              ) : (
                <path
                  d={`M ${e.x - 3} 70 l 1 50 M ${e.x + 5} 140 l -1 60 M ${e.x - 2} 230 l 1 50`}
                  stroke={g(e.c, "#000000", 0.18)}
                  strokeWidth={2.5}
                  strokeLinecap="round"
                />
              )}
            </g>
          ))}
          {D.map(([e, t, s, r], l) => (
            <circle key={l} cx={e} cy={t} r={s} fill={r} />
          ))}
          {[
            [60, 316, 1, 1],
            [736, 312, -1, 1.1],
            [690, 304, 1, 0.8],
          ].map(([e, t, s, r], l) => (
            <g
              key={l}
              transform={`translate(${e} ${t}) scale(${s * r} ${r})`}
              stroke="#5d8f43"
              strokeWidth={3}
              fill="none"
              strokeLinecap="round"
            >
              <path d="M0 0 Q -10 -40 -38 -46" />
              <path d="M0 0 Q 4 -46 26 -58" />
              <path d="M0 0 Q 18 -24 46 -26" />
              {[0.3, 0.5, 0.7].map((e) => (
                <g key={e}>
                  <path d={`M ${-38 * e} ${-40 * e} l -6 -8 M ${-38 * e} ${-40 * e} l 4 -9`} strokeWidth={2} />
                  <path d={`M ${22 * e} ${-50 * e} l -7 -5 M ${22 * e} ${-50 * e} l 7 -3`} strokeWidth={2} />
                  <path d={`M ${42 * e} ${-24 * e} l 2 -9 M ${42 * e} ${-24 * e} l 4 6`} strokeWidth={2} />
                </g>
              ))}
            </g>
          ))}
          <path d="M0 304 Q 200 296 400 302 T 800 300 L 800 394 L 0 394 Z" fill={`url(#${s}-floor)`} />
          {M.map((e, t) => (
            <ellipse key={t} cx={e.x} cy={e.y} rx={e.rx} ry={e.ry} fill={e.c} transform={`rotate(${e.a} ${e.x} ${e.y})`} opacity={0.85} />
          ))}
          <rect x="0" y="392" width="800" height="108" fill={`url(#${s}-soil)`} />
          <path d="M0 392 Q 100 388 200 393 T 400 391 T 600 393 T 800 391 L 800 400 L 0 400 Z" fill="#6f5139" />
          {W.map((e, t) => (
            <ellipse key={t} cx={e.x} cy={e.y} rx={e.rx} ry={e.ry} fill="#7c6450" opacity={0.8} />
          ))}
          <g stroke="#8d6d52" strokeWidth={2} fill="none" strokeLinecap="round" opacity={0.55}>
            <path d="M40 396 Q 50 430 36 470 M44 430 q 14 10 20 30" />
            <path d="M740 396 Q 730 440 752 490 M734 440 q -16 8 -20 26" />
          </g>
          <path d="M90 396 Q 380 470 670 396 Z" fill="#23170f" opacity={0.9 * eh} />
          <g opacity={ec}>
            <X d="M330 452 C 346 436, 366 466, 384 450 S 420 436, 440 452" />
            <X d="M160 474 C 176 458, 194 486, 212 470 S 240 460, 256 470" />
            <X d="M560 432 C 572 418, 560 408, 572 396" />
          </g>
          <g opacity={et}>
            {$.map((e, t) => (
              <F key={t} {...e} s={e.s * (0.7 + 0.3 * ee)} c={g("#8a6a45", e.c, ee)} />
            ))}
          </g>
          <ellipse cx={382} cy={Y.bot + 2} rx={290 + 20 * Y.crumble} ry={11} fill="#000000" opacity={0.2} />
          <path d={U} fill={`url(#${s}-log)`} stroke={g(V, "#000000", 0.35)} strokeOpacity={ey} strokeWidth={2.5} />
          <g opacity={el} stroke={g(V, "#000000", 0.35)} strokeWidth={2.6} strokeLinecap="round">
            {N.map((e, t) => (
              <path key={t} d={`M ${e.x} ${w(Y, e.f)} l ${e.tilt} ${_ * e.len}`} />
            ))}
          </g>
          <g opacity={ef}>
            {S.map((e, t) => (
              <circle key={t} cx={e.x} cy={Math.max(w(Y, e.f), b(Y, e.x) + 8)} r={e.r} fill={e.light ? "#7a5a40" : "#22160f"} />
            ))}
          </g>
          <g opacity={er}>
            <path
              d={(function (e, t) {
                let s = T.map(({ a: s, k: r }) => [322 + 96 * Math.cos(s) * r, e + Math.sin(s) * t * r]),
                  r = `M ${(s[0][0] + s[1][0]) / 2} ${(s[0][1] + s[1][1]) / 2}`;
                for (let e = 1; e <= s.length; e++) {
                  let [t, l] = s[e % s.length],
                    [a, i] = s[(e + 1) % s.length];
                  r += ` Q ${t} ${l} ${(t + a) / 2} ${(l + i) / 2}`;
                }
                return m(`${r} Z`);
              })(ek, eb)}
              fill={J}
              stroke={g(V, "#000000", 0.3)}
              strokeWidth={2.5}
            />
            <g stroke="#5e3c23" strokeWidth={3} fill="none" strokeLinecap="round">
              <path d={`M 256 ${ek} L 388 ${ek}`} strokeWidth={4.5} />
              {Array.from(
                {
                  length: 10,
                },
                (e, t) => {
                  let s = 264 + 13 * t,
                    r = 0.72 * eb;
                  return (
                    <g key={t}>
                      <path d={`M ${s} ${ek} Q ${s + (t % 2 ? 8 : -6)} ${ek - 0.55 * r} ${s + (t % 2 ? 3 : -3)} ${ek - r}`} />
                      <path d={`M ${s + 4} ${ek} Q ${s + (t % 2 ? -6 : 8)} ${ek + 0.55 * r} ${s + (t % 2 ? -1 : 5)} ${ek + r}`} />
                    </g>
                  );
                },
              )}
            </g>
          </g>
          <g opacity={es}>
            {[
              [282, -0.5, -30],
              [352, 0.45, 20],
              [382, -0.42, -70],
            ].map(([e, t, s], r) => (
              <g key={r} transform={`translate(${e} ${ek + t * eb}) rotate(${s}) scale(2.3)`}>
                <P />
              </g>
            ))}
          </g>
          <g opacity={ed}>
            <ellipse cx={Y.right} cy={ew} rx={0.78 * K} ry={eM} fill={J} stroke={g(V, "#000000", 0.25)} strokeWidth={3} />
            {[0.72, 0.48, 0.26].map((e) => (
              <ellipse
                key={e}
                cx={Y.right}
                cy={ew}
                rx={0.78 * K * e}
                ry={eM * e}
                fill="none"
                stroke={g(J, "#000000", 0.25)}
                strokeWidth={1.6}
              />
            ))}
            <ellipse
              cx={Y.right}
              cy={ew}
              rx={0.78 * K * (0.2 + 0.55 * ex)}
              ry={eM * (0.2 + 0.55 * ex)}
              fill="#5a3b26"
              opacity={0.85 * ex}
            />
          </g>
          {Z.map(([e, t, s], r) => {
            let l = h((ei - s) / 0.28);
            if (l <= 0) return null;
            let a = (e + t) / 2,
              i = ((t - e) / 2) * l;
            return (
              <g key={r}>
                <path d={A(Y, a - i, a + i)} fill={r % 2 ? "#5f8a3a" : "#6f9a45"} />
                <path d={A(Y, a - 0.8 * i, a + 0.7 * i)} fill="#86b056" transform="translate(0 -2) scale(1 1)" opacity={0.55} />
              </g>
            );
          })}
          <g opacity={ea}>
            {[
              [214, 0.6, 1],
              [520, 0.28, 0.9],
              [590, 0.62, 1.05],
            ].map(([e, t, s], r) => (
              <g key={r} transform={`translate(${e} ${w(Y, t)}) scale(${(0.4 + 0.6 * ea) * s})`}>
                <g transform="translate(-22 10) rotate(-18)">
                  <G r={24} />
                </g>
                <g transform="translate(22 12) rotate(16)">
                  <G r={22} />
                </g>
                <G r={30} />
                <g transform="translate(2 24)">
                  <G r={20} />
                </g>
              </g>
            ))}
          </g>
          <g opacity={en}>
            <ellipse cx={448} cy={w(Y, 0.42)} rx={15} ry={10} fill="#241710" />
            <path d={`M 432 ${Y.bot + 8} Q 452 ${Y.bot - 14} 474 ${Y.bot + 8} Z`} fill="#dcc49a" />
            {[440, 450, 459, 466].map((e, t) => (
              <circle key={e} cx={e} cy={Y.bot + 2 - (t % 2) * 4} r={1.6} fill="#b89a6a" />
            ))}
            {[
              [464, 0.54, 60, false],
              [476, 0.78, 80, false],
              [506, 1.1, 6, true],
              [556, 1.14, -4, true],
            ].map(([e, t, s, r], l) => (
              <g key={l} transform={`translate(${e} ${r ? Y.bot + 12 + (l % 2) * 4 : w(Y, t)}) rotate(${s}) scale(1.9)`}>
                <CQ_ />
              </g>
            ))}
          </g>
          <g opacity={ej} transform={`translate(422 ${b(Y, 422) + 1}) rotate(-14) scale(1.3)`}>
            <path d="M0 0 C 10 -8, 30 -8, 34 -2 C 30 2, 12 4, 0 0 Z" fill="#c9a268" />
            <circle cx={0} cy={0} r={4.5} fill="#8a6a3c" />
          </g>
          {eg > 0.5 && (
            <g>
              <path
                d={`M 392 ${em} Q 388 ${em - 0.5 * eg} 392 ${em - eg}`}
                stroke={eu > 0.2 ? "#7a5a3c" : "#6a9a3c"}
                strokeWidth={3 + 3.5 * eu}
                fill="none"
                strokeLinecap="round"
              />
              {eu < 0.4 && (
                <g transform={`translate(392 ${em - eg})`} opacity={1 - p(eu, 0.1, 0.4)}>
                  <ellipse cx={-18} cy={-5} rx={22} ry={7} fill="#7cb356" transform="rotate(-22 -18 -5)" />
                  <ellipse cx={18} cy={-5} rx={22} ry={7} fill="#7cb356" transform="rotate(22 18 -5)" />
                </g>
              )}
              {[40, 76, 110].map((e, t) => {
                let s = h((eg - e) / 24);
                if (s <= 0) return null;
                let r = em - e,
                  l = (1.55 + 0.12 * t) * s;
                return (
                  <g key={e}>
                    <path d={`M 392 ${r} l -18 -5 M 392 ${r} l 18 -5`} stroke="#5d8f43" strokeWidth={2} />
                    <g transform={`translate(362 ${r - 10}) rotate(-58) scale(${l})`}>
                      <path d={I} fill="#4f8f3a" stroke="#4f8f3a" strokeWidth={1.2} strokeLinejoin="round" />
                    </g>
                    <g transform={`translate(422 ${r - 10}) rotate(58) scale(${l})`}>
                      <path d={I} fill="#5e9c44" stroke="#5e9c44" strokeWidth={1.2} strokeLinejoin="round" />
                    </g>
                  </g>
                );
              })}
              {eu > 0.8 && (
                <g transform={`translate(392 ${em - eg - 14}) scale(${1.8 * p(eu, 0.8, 1)})`}>
                  <path d={I} fill="#6fae4f" stroke="#6fae4f" strokeWidth={1} strokeLinejoin="round" />
                </g>
              )}
            </g>
          )}
          <g opacity={et}>
            {C.map((e, t) => (
              <F key={t} x={e.x} y={b(Y, e.x) + 4} a={e.a} s={e.s * (0.7 + 0.3 * ee)} c={g("#8a6a45", e.c, ee)} />
            ))}
          </g>
          <g opacity={eo}>
            <ellipse cx={236} cy={Y.bot + 4} rx={70} ry={9} fill="#1c130d" opacity={0.55} />
            <g transform={`translate(254 ${Y.bot + 12}) scale(1.55)`}>
              <E />
            </g>
          </g>
          <g opacity={ec}>
            <g transform={`translate(62 ${Y.bot + 16}) scale(1.25)`}>
              <O />
            </g>
            <g transform={`translate(674 ${Y.bot + 12}) scale(1.9)`}>
              <B />
            </g>
            <g transform={`translate(728 ${Y.bot + 22}) rotate(-20) scale(1.6)`}>
              <B />
            </g>
          </g>
          <g opacity={et}>
            {v.map((e, t) => (
              <F key={t} {...e} s={e.s * (0.7 + 0.3 * ee)} c={g("#8a6a45", e.c, ee)} />
            ))}
          </g>
          <g transform="translate(18 18)">
            <rect width={36 + 15.5 * R.length} height={52} rx={26} fill="#fffdf8" opacity={0.94} stroke="#d9cfb8" strokeWidth={2} />
            <text
              x={18}
              y={35}
              fontSize={28}
              fontWeight={700}
              fill="#1f2a22"
              style={{
                fontFamily: "var(--font-display), Georgia, serif",
              }}
            >
              {R}
            </text>
          </g>
        </svg>
      </div>
      <div className="grid gap-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="font-display text-2xl font-semibold leading-tight sm:text-3xl" aria-hidden="true">
            {R}
          </p>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onPointerDown={(e) => {
                0 === e.button && (e.currentTarget.setPointerCapture(e.pointerId), (n.current = e.timeStamp), (o.current = r), i(true));
              }}
              onPointerUp={(e) => {
                let t = n.current;
                ((n.current = null), i(false), null !== t && e.timeStamp - t < 260 && l(f(o.current)));
              }}
              onPointerCancel={k}
              onLostPointerCapture={k}
              onClick={(e) => {
                0 === e.detail && l(f);
              }}
              onContextMenu={(e) => e.preventDefault()}
              aria-label="Speed up time. Hold to run time forward, or tap for the next step."
              style={{
                touchAction: "none",
                WebkitTouchCallout: "none",
              }}
              className={`min-h-11 select-none rounded-full px-4 py-2 font-semibold text-white transition active:scale-95 ${a ? "bg-moss-2" : r >= 700 ? "bg-moss/60" : "bg-moss"}`}
            >
              {r >= 700 ? "All grown!" : a ? "Time is flying…" : "Hold to speed up time"}
            </button>
            <button
              type="button"
              onClick={() => {
                ((n.current = null), i(false), l(0));
              }}
              disabled={0 === r}
              aria-label="Start over from Day 1"
              className="min-h-11 rounded-full border border-line bg-paper px-4 py-2 font-semibold text-ink-2 transition hover:border-moss hover:text-moss active:scale-95 disabled:opacity-50"
            >
              Start over
            </button>
          </div>
        </div>
        <label className="block">
          <span className="sr-only">Time since the tree fell</span>
          <input
            type="range"
            min={0}
            max={700}
            step={1}
            value={Math.round(r)}
            onChange={(e) => l(Number(e.target.value))}
            aria-valuetext={R}
            className="h-11 w-full cursor-pointer accent-moss"
          />
        </label>
        <div className="flex justify-between text-xs font-medium text-ink-2">
          <span>Day 1</span>
          <span>About 20 years</span>
        </div>
      </div>
      <div className="grid items-center gap-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,230px)]">
        <div className="rounded-xl border-l-4 border-l-gold bg-paper-2/60 p-4">
          <p className="eyebrow text-moss">{0 === L ? "The log" : L >= 6 ? (7 === L ? "A new tree" : "Soil") : "The decomposers"}</p>
          <p className="mt-1 text-base leading-relaxed" aria-live="polite">
            {x[L].caption}
          </p>
        </div>
        <CZ_ step={x[L].step} />
      </div>
      <p className="rounded-xl bg-moss/10 px-4 py-3 font-display text-lg font-semibold leading-snug text-moss">
        Decomposers turn dead things back into soil, so new things can grow. Nothing is wasted.
      </p>
      <H />
    </div>
  );
};
