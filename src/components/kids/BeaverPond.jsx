"use client";
// Restored from client module 23968 (exports: BeaverPond)
import * as a from "react";
let t, s, r;
let i = (e, t = 0, s = 1) => Math.min(s, Math.max(t, e)),
  n = (e, t, s) => i((e - t) / (s - t)),
  o = (e) => Math.round(100 * e) / 100,
  c = (e) => e.replace(/-?\d*\.?\d+(?:e[-+]?\d+)?/gi, (e) => String(o(parseFloat(e))));
function d(e) {
  let t = e >>> 0;
  return () => {
    let e = (t = (t + 0x6d2b79f5) >>> 0);
    return ((e = Math.imul(e ^ (e >>> 15), 1 | e)), (((e ^= e + Math.imul(e ^ (e >>> 7), 61 | e)) ^ (e >>> 14)) >>> 0) / 0x100000000);
  };
}
function x(e, t = 0.45) {
  let s = i(e / t);
  return 1 + 2.9 * Math.pow(s - 1, 3) + 1.9 * Math.pow(s - 1, 2);
}
let f =
    ((t = d(7)),
    (s = ["#8a603c", "#a0714a", "#76522f", "#b3875a", "#dcc49a"]),
    Array.from(
      {
        length: 7,
      },
      (e, r) => {
        let l = r + 1,
          a = 36 + 15 * l;
        return Array.from(
          {
            length: 9 + l,
          },
          () => ({
            x: 400 - a + t() * a * 2,
            y: 346 - 4.5 * l + (t() - 0.5) * 7,
            a: (t() - 0.5) * 60,
            len: 22 + 24 * t(),
            w: 4 + 2.5 * t(),
            c: s[Math.floor(t() * s.length)],
          }),
        );
      },
    )),
  h =
    ((r = d(19)),
    Array.from(
      {
        length: 14,
      },
      () => ({
        x: 270 + 260 * r(),
        dx: (r() - 0.5) * 60,
        spin: (r() - 0.5) * 360,
        len: 22 + 22 * r(),
      }),
    )),
  p = Array.from(
    {
      length: 40,
    },
    (e, t) => {
      let s = (t / 40) * Math.PI * 2;
      return {
        a: s,
        k: 1 + 0.05 * Math.sin(3 * s + 1) + 0.035 * Math.sin(5 * s + 2),
      };
    },
  );
function u(e, t = 1, s = 0) {
  let r = p.map(({ a: r, k: l }) => [
      e.cx + Math.cos(r) * (e.rx * t + s) * l,
      Math.min(338 + 0.3 * s, e.cy + Math.sin(r) * (e.ry * t + s) * l),
    ]),
    l = `M ${(r[0][0] + r[1][0]) / 2} ${(r[0][1] + r[1][1]) / 2}`;
  for (let e = 1; e <= r.length; e++) {
    let [t, s] = r[e % r.length],
      [a, i] = r[(e + 1) % r.length];
    l += ` Q ${t} ${s} ${(t + a) / 2} ${(s + i) / 2}`;
  }
  return c(`${l} Z`);
}
let j = [
  [402, 66],
  [397, 90],
  [394, 118],
  [404, 144],
  [396, 172],
  [408, 202],
  [398, 234],
  [406, 264],
  [398, 294],
  [404, 322],
  [400, 346],
  [412, 376],
  [424, 406],
  [418, 440],
  [428, 470],
  [436, 504],
];
function y(e) {
  let t = `M ${e[0][0]} ${e[0][1]}`;
  for (let s = 1; s < e.length - 1; s++) {
    let [r, l] = e[s],
      [a, i] = e[s + 1];
    t += ` Q ${r} ${l} ${(r + a) / 2} ${(l + i) / 2}`;
  }
  let [s, r] = e[e.length - 1];
  return `${t} L ${s} ${r}`;
}
let m = y(j),
  g = y(j.slice(10)),
  k = [
    {
      id: "beaver",
      name: "Beaver",
      level: 0,
    },
    {
      id: "trout",
      name: "Brook trout",
      level: 0,
    },
    {
      id: "kingfisher",
      name: "Belted kingfisher",
      level: 0,
    },
    {
      id: "chickadee",
      name: "Black-capped chickadee",
      level: 0,
    },
    {
      id: "dragonfly",
      name: "Dragonflies",
      level: 2,
    },
    {
      id: "frog",
      name: "Green frog",
      level: 3,
    },
    {
      id: "mallard",
      name: "Mallard",
      level: 3,
    },
    {
      id: "cattail",
      name: "Cattails",
      level: 4,
    },
    {
      id: "lily",
      name: "Water lilies",
      level: 4,
    },
    {
      id: "woodduck",
      name: "Wood duck",
      level: 5,
    },
    {
      id: "muskrat",
      name: "Muskrat",
      level: 5,
    },
    {
      id: "heron",
      name: "Great blue heron",
      level: 6,
    },
    {
      id: "blackbird",
      name: "Red-winged blackbird",
      level: 6,
    },
    {
      id: "moose",
      name: "Moose",
      level: 7,
    },
    {
      id: "otter",
      name: "River otter",
      level: 7,
    },
  ],
  b = k.filter((e) => 0 === e.level).length,
  w = k.length,
  M = [
    "A little stream runs through the valley, and a beaver has moved in. Tap the beaver to help it build a dam!",
    "The beaver pushes sticks and mud across the stream. The water starts to back up behind them.",
    "The water behind the dam is getting deeper and stiller. Dragonflies zip over it — their babies grow up underwater.",
    "A pond is forming! A green frog and a mallard duck move in.",
    "Cattails and water lilies start growing in the shallow water around the edges.",
    "The pond keeps spreading into a wetland. A wood duck and a muskrat arrive.",
    "A great blue heron comes to hunt fish and frogs, and a red-winged blackbird sings from the cattails.",
    "The dam is finished, and the beaver has built its lodge in the pond. A moose wades in to eat water plants, and a river otter comes to fish.",
  ],
  L = () => Object.fromEntries(k.filter((e) => 0 === e.level).map((e) => [e.id, -10])),
  $ = {
    clock: 0,
    level: 0,
    layerAt: [],
    water: 0,
    arrived: L(),
    queue: [],
    tapAt: -10,
    flood: null,
    washAt: null,
    flooded: false,
  };
function v(e) {
  if (null !== e.flood || e.level >= 7 || e.clock - e.tapAt < 0.28) return e;
  let t = e.level + 1,
    s = k
      .filter((e) => e.level === t)
      .map((t, s) => ({
        id: t.id,
        at: e.clock + 0.7 + 0.8 * s,
      }));
  return {
    ...e,
    level: t,
    layerAt: [...e.layerAt, e.clock],
    tapAt: e.clock,
    queue: [...e.queue, ...s],
    flooded: false,
  };
}
function C({ x: e, y: t, s }) {
  return (
    <g transform={`translate(${e} ${t}) scale(${s})`}>
      <rect x={-3} y={-8} width={6} height={10} fill="#6b4a33" />
      <path d="M0 -64 L14 -38 L8 -38 L20 -18 L12 -18 L25 -4 L-25 -4 L-12 -18 L-20 -18 L-8 -38 L-14 -38 Z" fill="#2f5d3a" />
      <path d="M0 -64 L14 -38 L8 -38 L20 -18 L12 -18 L25 -4 L2 -4 Z" fill="#264d30" />
    </g>
  );
}
function W({ x: e, y: t, s }) {
  return (
    <g transform={`translate(${e} ${t}) scale(${s})`}>
      <rect x={-3} y={-34} width={6} height={36} rx={2} fill="#e8e2d2" />
      <path d="M-3 -24 l 4 0 M-3 -12 l 3 0" stroke="#4a4540" strokeWidth={2} />
      <ellipse cx={0} cy={-50} rx={16} ry={22} fill="#8fb65a" />
      <ellipse cx={-6} cy={-46} rx={8} ry={12} fill="#a3c66c" />
    </g>
  );
}
function N({ x: e, y: t }) {
  return (
    <g transform={`translate(${e} ${t})`}>
      <path d="M-11 0 L-11 -14 L0 -28 L11 -14 L11 0 Z" fill="#6d5139" />
      <path d="M-11 -14 L0 -28 L11 -14 L6 -12 L0 -20 L-5 -12 Z" fill="#e6cc9c" />
      <ellipse cx={-18} cy={1} rx={4} ry={2} fill="#e6cc9c" />
      <ellipse cx={16} cy={2} rx={3.5} ry={1.8} fill="#e6cc9c" />
    </g>
  );
}
function Z({ carrying: e }) {
  return (
    <g>
      <g transform="rotate(-12 34 -6)">
        <ellipse cx={34} cy={-6} rx={25} ry={8.5} fill="#3f322a" />
        <path d="M18 -10 L50 -2 M18 -2 L50 -10 M26 -13 L42 1 M26 1 L42 -13" stroke="#2c231d" strokeWidth={1.2} />
      </g>
      <ellipse cx={14} cy={-3} rx={13} ry={5} fill="#3a2d25" />
      <path d="M-30 -20 C -30 -54, 12 -64, 26 -40 C 34 -26, 28 -6, 14 -4 L -20 -4 C -30 -6, -32 -12, -30 -20 Z" fill="#8a5a36" />
      <path d="M-24 -10 C -20 -26, 0 -30, 10 -18 C 12 -10, 4 -6, -6 -6 Z" fill="#a06d45" opacity={0.7} />
      <circle cx={-30} cy={-44} r={17} fill="#8a5a36" />
      <circle cx={-19} cy={-58} r={4.5} fill="#6f4628" />
      <ellipse cx={-44} cy={-37} rx={10} ry={8} fill="#a8784e" />
      <ellipse cx={-52} cy={-41} rx={4} ry={3} fill="#2a1a12" />
      <circle cx={-34} cy={-50} r={2.7} fill="#111111" />
      <circle cx={-33.2} cy={-50.8} r={0.9} fill="#ffffff" />
      <rect x={-49} y={-32} width={7} height={8} rx={1.5} fill="#e08a3a" stroke="#b8651f" strokeWidth={0.8} />
      <path d="M-45.5 -32 L-45.5 -24" stroke="#b8651f" strokeWidth={0.8} />
      <path d="M-50 -38 l -12 -3 M-50 -36 l -12 2" stroke="#3a2a20" strokeWidth={0.8} />
      {e && (
        <g>
          <path d="M-84 -30 L-10 -22" stroke="#9a7048" strokeWidth={5} strokeLinecap="round" />
          <path d="M-72 -29 l -6 -9 M-60 -28 l 3 -9" stroke="#9a7048" strokeWidth={2.5} strokeLinecap="round" />
          <ellipse cx={-80} cy={-40} rx={6} ry={3} fill="#7fae4c" transform="rotate(-40 -80 -40)" />
          <ellipse cx={-55} cy={-39} rx={6} ry={3} fill="#8fbd5a" transform="rotate(30 -55 -39)" />
        </g>
      )}
      <ellipse cx={-40} cy={-24} rx={5} ry={4} fill="#6f4628" />
      <ellipse cx={-28} cy={-22} rx={5} ry={4} fill="#6f4628" />
    </g>
  );
}
function A() {
  return (
    <g>
      <path d="M-26 0 L-40 -9 L-36 0 L-40 9 Z" fill="#6f7d4a" />
      <path d="M-28 0 C -18 -11, 10 -12, 22 -3 C 26 -1, 27 1, 22 4 C 10 11, -18 10, -28 0 Z" fill="#6f7d4a" />
      <path d="M-26 2 C -14 10, 10 10, 22 4 C 12 5, -12 5, -26 2 Z" fill="#e2894a" />
      <path d="M-4 7 l -7 7 l 9 -3 Z M8 7 l -3 6 l 6 -3 Z" fill="#e2894a" stroke="#ffffff" strokeWidth={1.2} />
      {[
        [-14, -4],
        [-6, -6],
        [2, -3],
        [-18, 0],
        [8, -6],
      ].map(([e, t], s) => (
        <circle key={s} cx={e} cy={t} r={1.6} fill="#f1e4a0" />
      ))}
      <circle cx={-10} cy={1} r={2.2} fill="#5aa0e0" />
      <circle cx={-10} cy={1} r={1.2} fill="#d23a2a" />
      <circle cx={4} cy={1.5} r={2.2} fill="#5aa0e0" />
      <circle cx={4} cy={1.5} r={1.2} fill="#d23a2a" />
      <circle cx={16} cy={-2} r={2.3} fill="#111111" />
      <circle cx={16.6} cy={-2.6} r={0.7} fill="#ffffff" />
    </g>
  );
}
function T() {
  return (
    <g>
      <path d="M8 -6 L18 6 L12 6 L4 -2 Z" fill="#3f5f86" />
      <ellipse cx={2} cy={-14} rx={11} ry={14} fill="#5a82ad" />
      <ellipse cx={-3} cy={-9} rx={7} ry={9} fill="#ffffff" />
      <path d="M-10 -16 Q -3 -12 5 -16" stroke="#5a82ad" strokeWidth={4} fill="none" />
      <circle cx={-3} cy={-31} r={10.5} fill="#5a82ad" />
      <path d="M-3 -41 L2 -46 L4 -40 L9 -44 L9 -37 L13 -37 L7 -31 Z" fill="#4b6f98" />
      <path d="M-9 -22 Q -2 -19 5 -22" stroke="#ffffff" strokeWidth={3} fill="none" />
      <path d="M-12 -33 L-32 -30 L-12 -28 Z" fill="#2a2a2a" />
      <circle cx={-9} cy={-35} r={1.6} fill="#ffffff" />
      <circle cx={-6} cy={-33} r={2} fill="#111111" />
      <path d="M-2 0 l -2 4 M3 0 l 1 4" stroke="#3a3a3a" strokeWidth={1.5} strokeLinecap="round" />
    </g>
  );
}
function S() {
  return (
    <g>
      <path d="M-8 -8 L-22 -2 L-20 -8 L-10 -12 Z" fill="#6f757b" />
      <ellipse cx={0} cy={-10} rx={11} ry={9} fill="#9aa0a6" />
      <ellipse cx={3} cy={-7} rx={8} ry={6.5} fill="#efe6d6" />
      <ellipse cx={-1} cy={-5} rx={6} ry={3.5} fill="#e3cda8" />
      <circle cx={8} cy={-18} r={7.5} fill="#ffffff" />
      <path d="M0.8 -19 A 7.5 7.5 0 0 1 15.4 -19.5 L 8 -19 Z" fill="#1d1d1f" />
      <path d="M8 -13.5 L13 -12 L10 -9 L7 -11 Z" fill="#1d1d1f" />
      <path d="M15 -17 L19 -16 L15 -15 Z" fill="#1d1d1f" />
      <circle cx={11} cy={-18} r={1.3} fill="#111111" />
      <path d="M-1 -1 l -1 4 M3 -1 l 1 4" stroke="#4a4a4a" strokeWidth={1.2} strokeLinecap="round" />
    </g>
  );
}
function D({ flap: e }) {
  return (
    <g>
      <g fill="#ffffff" fillOpacity={0.7} stroke="#8fbfe0" strokeWidth={1}>
        <ellipse cx={-2} cy={-5} rx={14} ry={3.6 * e} transform="rotate(-18 -2 -5)" />
        <ellipse cx={4} cy={-5} rx={13} ry={3.4 * e} transform="rotate(14 4 -5)" />
        <ellipse cx={-2} cy={5} rx={13} ry={3.4 * e} transform="rotate(18 -2 5)" />
        <ellipse cx={4} cy={5} rx={12} ry={3.2 * e} transform="rotate(-14 4 5)" />
      </g>
      <path d="M2 0 L30 0" stroke="#2c6fb5" strokeWidth={4} strokeLinecap="round" />
      <path d="M8 -2 l 0 4 M14 -2 l 0 4 M20 -2 l 0 4" stroke="#1f5590" strokeWidth={1} />
      <ellipse cx={-3} cy={0} rx={6} ry={4} fill="#5aa04a" />
      <circle cx={-10} cy={0} r={4.4} fill="#4f8f3a" />
    </g>
  );
}
function Q() {
  return (
    <g>
      <ellipse cx={-16} cy={-4} rx={9} ry={6} fill="#5d8c30" />
      <ellipse cx={16} cy={-4} rx={9} ry={6} fill="#5d8c30" />
      <ellipse cx={0} cy={-13} rx={17} ry={13} fill="#6e9f3b" />
      <ellipse cx={0} cy={-8} rx={10} ry={7.5} fill="#dfe8ae" />
      <circle cx={-13} cy={-18} r={3.2} fill="#8aa84a" stroke="#5d8c30" strokeWidth={1} />
      <circle cx={13} cy={-18} r={3.2} fill="#8aa84a" stroke="#5d8c30" strokeWidth={1} />
      <circle cx={-8} cy={-25} r={6.5} fill="#6e9f3b" />
      <circle cx={8} cy={-25} r={6.5} fill="#6e9f3b" />
      <circle cx={-8} cy={-26} r={4.3} fill="#e0c04a" />
      <circle cx={8} cy={-26} r={4.3} fill="#e0c04a" />
      <ellipse cx={-8} cy={-26} rx={3} ry={1.8} fill="#111111" />
      <ellipse cx={8} cy={-26} rx={3} ry={1.8} fill="#111111" />
      <path d="M-10 -15 Q 0 -9 10 -15" stroke="#3d5a1f" strokeWidth={1.6} fill="none" strokeLinecap="round" />
      <ellipse cx={-7} cy={-1} rx={4} ry={2.4} fill="#5d8c30" />
      <ellipse cx={7} cy={-1} rx={4} ry={2.4} fill="#5d8c30" />
    </g>
  );
}
function I() {
  return (
    <g>
      <path d="M26 -2 C 30 -12, 22 -20, 8 -20 L -14 -20 C -24 -20, -28 -12, -26 -4 C -20 2, 18 2, 26 -2 Z" fill="#cfc9bd" />
      <path d="M-14 -20 C -24 -20, -28 -12, -26 -4 C -22 -2, -18 -2, -14 -3 C -17 -8, -17 -16, -14 -20 Z" fill="#7a4a32" />
      <path d="M16 -19 C 25 -18, 30 -10, 27 -3 C 23 -2, 19 -2, 16 -4 Z" fill="#2a2a2a" />
      <path d="M22 -19 q 4 -6 0 -7" stroke="#2a2a2a" strokeWidth={2} fill="none" strokeLinecap="round" />
      <path d="M-2 -15 C 6 -18, 14 -17, 18 -12" stroke="#8a847a" strokeWidth={2} fill="none" />
      <rect x={2} y={-14} width={10} height={4} rx={1.5} fill="#3a5cb8" stroke="#ffffff" strokeWidth={1} />
      <ellipse cx={-18} cy={-22} rx={5.5} ry={1.8} fill="#ffffff" />
      <circle cx={-20} cy={-29} r={8} fill="#2f7a45" />
      <circle cx={-22} cy={-32} r={2.5} fill="#4f9a62" opacity={0.7} />
      <path d="M-27 -30 L-37 -27 L-27 -25 Z" fill="#e8c43a" />
      <circle cx={-22} cy={-31} r={1.6} fill="#111111" />
    </g>
  );
}
function F() {
  return (
    <g>
      <path d="M-24 -4 L-32 -12 L-22 -10 Z" fill="#2c2926" />
      <path d="M-26 -2 C -30 -12, -22 -20, -8 -20 L 14 -20 C 24 -20, 28 -12, 26 -4 C 20 2, -18 2, -26 -2 Z" fill="#d6be8a" />
      <path d="M-28 -8 C -22 -21, -4 -24, 8 -21 C -2 -16, -18 -12, -28 -8 Z" fill="#3a3430" />
      <path d="M10 -20 C 20 -20, 27 -12, 26 -4 C 22 -2, 18 -2, 14 -2 C 16 -8, 14 -16, 10 -20 Z" fill="#8a3b2a" />
      {[
        [18, -14],
        [22, -10],
        [17, -8],
        [21, -6],
      ].map(([e, t], s) => (
        <circle key={s} cx={e} cy={t} r={0.9} fill="#ffffff" />
      ))}
      <path d="M10 -19 C 13 -14, 13 -8, 12 -2" stroke="#ffffff" strokeWidth={2} fill="none" />
      <path d="M12 -33 C 2 -35, -8 -31, -12 -23 C -2 -26, 6 -26, 12 -24 Z" fill="#3d4f86" />
      <circle cx={18} cy={-27} r={8.5} fill="#2f6b58" />
      <path d="M24 -32 C 14 -36, 2 -33, -8 -26" stroke="#ffffff" strokeWidth={1.4} fill="none" />
      <path d="M16 -23 C 8 -23, 0 -23, -8 -23" stroke="#ffffff" strokeWidth={1.2} fill="none" />
      <path d="M23 -22 C 20 -19, 16 -19, 13 -21" stroke="#ffffff" strokeWidth={2.2} fill="none" strokeLinecap="round" />
      <circle cx={21} cy={-29} r={2.2} fill="#d23a2a" />
      <circle cx={21} cy={-29} r={0.9} fill="#111111" />
      <path d="M26 -28 L34 -25.5 L26 -23 Z" fill="#d23a2a" />
      <path d="M31 -26.5 L34 -25.5 L31 -24.5 Z" fill="#1d1d1f" />
    </g>
  );
}
function G() {
  return (
    <g>
      <path d="M-18 2 L34 -7 M-18 2 L34 11" stroke="#ffffff" strokeWidth={2} opacity={0.6} strokeLinecap="round" />
      <path d="M22 0 C 30 -3, 38 3, 48 0" stroke="#4a3526" strokeWidth={3} fill="none" strokeLinecap="round" />
      <ellipse cx={6} cy={-1} rx={18} ry={6} fill="#6b4a33" />
      <ellipse cx={-13} cy={-3} rx={9} ry={6.5} fill="#6b4a33" />
      <ellipse cx={-20} cy={-2} rx={4.5} ry={3.5} fill="#8a6a4e" />
      <circle cx={-24} cy={-3} r={1.5} fill="#1d1d1f" />
      <circle cx={-14} cy={-6} r={1.6} fill="#111111" />
      <circle cx={-8} cy={-8} r={2.2} fill="#5a3d2a" />
      <path d="M-20 -1 l -8 -2 M-20 0 l -8 2" stroke="#3a2a20" strokeWidth={0.7} />
    </g>
  );
}
function P() {
  return (
    <g>
      <g stroke="#5f8c3a" strokeWidth={4} fill="none" strokeLinecap="round">
        <path d="M-4 0 Q -12 -40 -24 -64" />
        <path d="M4 0 Q 10 -44 22 -70" />
        <path d="M0 0 Q 2 -50 -6 -84" />
        <path d="M8 0 Q 18 -30 30 -44" />
      </g>
      {[
        [-10, 80],
        [2, 94],
        [13, 74],
      ].map(([e, t]) => (
        <g key={e}>
          <path d={`M ${e} 0 L ${e} ${-t - 10}`} stroke="#6f8f3e" strokeWidth={2.5} strokeLinecap="round" />
          <rect x={e - 4.5} y={-t + 2} width={9} height={24} rx={4.5} fill="#6b4226" />
        </g>
      ))}
    </g>
  );
}
function CQ_({ flower: e = true }) {
  return (
    <g>
      <path d="M0 0 L15.8 -1.6 A 16 7 0 1 0 15.8 1.6 Z" fill="#5f9b4a" />
      <path d="M0 0 L15.8 -1.6 A 16 7 0 0 0 -12 -4.6" stroke="#7cb65e" strokeWidth={1.5} fill="none" />
      <g transform="translate(-24 4) scale(0.75)">
        <path d="M0 0 L-15.8 -1.6 A 16 7 0 1 1 -15.8 1.6 Z" fill="#6aa653" />
      </g>
      {e && (
        <g transform="translate(-3 -2)">
          {[-10, -5, 0, 5, 10].map((e) => (
            <path
              key={e}
              d={`M 0 0 Q ${0.5 * e - 4} -6 ${e} -12 Q ${0.5 * e + 4} -6 0 0 Z`}
              fill="#ffffff"
              stroke="#e7e0ea"
              strokeWidth={0.8}
            />
          ))}
          <circle cx={0} cy={-3} r={3.2} fill="#e8c43a" />
        </g>
      )}
    </g>
  );
}
function E() {
  return (
    <g>
      <path d="M-2 0 L0 -44 M8 0 L6 -44" stroke="#6b604c" strokeWidth={3} strokeLinecap="round" />
      <path d="M-6 -44 C -14 -62, 2 -76, 22 -68 C 34 -64, 42 -52, 46 -40 C 30 -44, 12 -42, -6 -44 Z" fill="#7b8fa4" />
      <path d="M6 -64 C 20 -66, 32 -58, 42 -44" stroke="#c9d3dc" strokeWidth={2.5} fill="none" />
      <path d="M-4 -60 C -16 -70, -2 -84, -10 -96" stroke="#aab7c4" strokeWidth={8} fill="none" strokeLinecap="round" />
      <path d="M-8 -78 l -5 8" stroke="#eef1f3" strokeWidth={2} strokeLinecap="round" />
      <ellipse cx={-12} cy={-100} rx={9} ry={6.5} fill="#eef1f3" />
      <path d="M-8 -104 L12 -106 L-4 -100 Z" fill="#26282b" />
      <path d="M-19 -102 L-46 -98 L-19 -97 Z" fill="#e0a53a" />
      <circle cx={-15} cy={-101} r={1.9} fill="#e8c43a" />
      <circle cx={-15} cy={-101} r={0.9} fill="#111111" />
    </g>
  );
}
function O() {
  return (
    <g>
      <path d="M-8 -6 L-20 4 L-16 -6 Z" fill="#141414" />
      <ellipse cx={0} cy={-10} rx={11} ry={8} fill="#1b1b1b" />
      <circle cx={9} cy={-18} r={6.5} fill="#1b1b1b" />
      <path d="M15 -19 L22 -17 L15 -15 Z" fill="#2a2a2a" />
      <circle cx={11} cy={-19.5} r={1.2} fill="#ffffff" opacity={0.8} />
      <ellipse cx={-1} cy={-13} rx={5.5} ry={3.2} fill="#d42a22" />
      <path d="M-6 -11 Q -1 -8 4 -11" stroke="#f2c64a" strokeWidth={2} fill="none" />
      <path d="M-1 -2 l -1 4 M3 -2 l 1 4" stroke="#333333" strokeWidth={1.2} strokeLinecap="round" />
    </g>
  );
}
function B() {
  return (
    <g>
      <g fill="#3a281c">
        <rect x={-34} y={-54} width={7} height={50} rx={3} />
        <rect x={-22} y={-54} width={7} height={50} rx={3} />
        <rect x={26} y={-54} width={7} height={50} rx={3} />
        <rect x={37} y={-54} width={7} height={50} rx={3} />
      </g>
      <path
        d="M-44 -78 C -44 -104, -10 -110, 12 -98 C 34 -96, 52 -88, 52 -70 C 52 -54, 46 -46, 38 -46 L -36 -46 C -46 -48, -48 -60, -44 -78 Z"
        fill="#4a3325"
      />
      <path d="M50 -80 l 6 6 l -6 2 Z" fill="#3e2a1e" />
      <path
        d="M-40 -88 C -54 -92, -66 -82, -78 -64 C -84 -56, -86 -48, -80 -44 C -74 -40, -66 -44, -62 -50 C -56 -58, -48 -66, -38 -68 Z"
        fill="#3e2a1e"
      />
      <ellipse cx={-79} cy={-48} rx={9.5} ry={8} fill="#36241a" />
      <ellipse cx={-85} cy={-47} rx={2} ry={1.4} fill="#150d09" />
      <path d="M-58 -60 q -6 14 0 22 q 5 -8 5 -20 Z" fill="#36241a" />
      <ellipse cx={-47} cy={-92} rx={5} ry={9} fill="#3e2a1e" transform="rotate(-35 -47 -92)" />
      <circle cx={-60} cy={-78} r={2.3} fill="#111111" />
      <circle cx={-59.4} cy={-78.6} r={0.7} fill="#ffffff" />
      <path
        d="M-52 -94 C -70 -104, -84 -114, -90 -112 L-94 -121 L-87 -118 L-89 -129 L-81 -122 L-79 -133 L-73 -122 L-68 -129 L-65 -116 C -59 -110, -54 -104, -48 -98 Z"
        fill="#dbc79e"
        stroke="#b9a57a"
        strokeWidth={1.5}
      />
      <path
        d="M-44 -98 C -38 -112, -30 -122, -20 -124 L-22 -133 L-15 -126 L-12 -135 L-7 -126 L-1 -131 L-3 -120 C -13 -114, -28 -106, -38 -96 Z"
        fill="#dbc79e"
        stroke="#b9a57a"
        strokeWidth={1.5}
      />
    </g>
  );
}
function X() {
  return (
    <g>
      <path d="M-40 -10 C -56 -9, -68 -2, -76 3 C -64 1, -52 -1, -40 -2 Z" fill="#5b4332" />
      <ellipse cx={-30} cy={-1} rx={5} ry={3} fill="#4a3526" />
      <ellipse cx={-18} cy={0} rx={5} ry={3} fill="#4a3526" />
      <ellipse cx={14} cy={-1} rx={5} ry={3} fill="#4a3526" />
      <ellipse cx={24} cy={0} rx={5} ry={3} fill="#4a3526" />
      <path
        d="M-44 -8 C -44 -23, -20 -27, 6 -23 C 20 -21, 28 -19, 32 -14 C 30 -6, 20 -2, 0 -2 L -38 -2 C -44 -2, -45 -5, -44 -8 Z"
        fill="#5b4332"
      />
      <path d="M18 -8 C 24 -8, 30 -10, 34 -14 C 30 -6, 24 -4, 18 -5 Z" fill="#b39a7c" />
      <ellipse cx={36} cy={-19} rx={11} ry={9} fill="#5b4332" />
      <ellipse cx={44} cy={-16} rx={6.5} ry={4.8} fill="#b39a7c" />
      <ellipse cx={49} cy={-18} rx={2.2} ry={1.6} fill="#1d1d1f" />
      <circle cx={30} cy={-27} r={2.6} fill="#4a3526" />
      <circle cx={38} cy={-22} r={1.8} fill="#111111" />
      <path d="M46 -15 l 10 -2 M46 -14 l 10 2" stroke="#3a2a20" strokeWidth={0.7} />
    </g>
  );
}
function CZ_() {
  return (
    <g>
      <path d="M-62 2 Q -56 -52 0 -58 Q 56 -52 62 2 Z" fill="#7a5838" />
      <g stroke="#5a3f28" strokeWidth={3} strokeLinecap="round">
        <path d="M-50 -10 L-10 -40 M-30 -4 L20 -48 M0 -2 L40 -34 M-44 -30 L10 -8 M-20 -50 L40 -14 M20 -52 L52 -20" />
      </g>
      <g stroke="#b3875a" strokeWidth={2.5} strokeLinecap="round">
        <path d="M-40 -20 L-4 -30 M6 -20 L44 -6 M-16 -46 L18 -40" />
      </g>
      <ellipse cx={-20} cy={-18} rx={10} ry={5} fill="#5e432b" />
      <ellipse cx={24} cy={-30} rx={9} ry={4} fill="#5e432b" />
    </g>
  );
}
function R({ x: e, y: t, text: s, size: r = 20 }) {
  let a = s.length * r * 0.56 + 1.3 * r,
    i = 1.7 * r;
  return (
    <g transform={`translate(${o(e)} ${o(t)})`}>
      <rect x={-a / 2} y={-i / 2} width={a} height={i} rx={i / 2} fill="#d9a441" stroke="#a8791f" strokeWidth={2} />
      <text y={0.36 * r} textAnchor="middle" fontSize={r} fontWeight={700} fill="#1f2a22">
        {s}
      </text>
    </g>
  );
}
function H() {
  return (
    <div className="rounded-xl border border-line p-4">
      <h3 className="font-display text-lg font-semibold">Say it like this</h3>
      <ul className="mt-2 grid gap-1.5 text-sm leading-relaxed">
        <li>
          <span className="font-semibold text-moss">Age 2:</span>
          {" “Beaver builds a dam. Tap, tap! Look — a duck! Quack, quack!”"}
        </li>
        <li>
          <span className="font-semibold text-moss">Age 4:</span>
          {" “The beaver’s dam made a pond. Who came to live in it? Let’s count them!”"}
        </li>
        <li>
          <span className="font-semibold text-moss">Age 6:</span>
          {" “One beaver made a home for fifteen kinds of living things. What would happen to the heron and the ducks if the beaver left?”"}
        </li>
      </ul>
      <p className="mt-3 text-sm leading-relaxed">
        <span className="font-semibold text-rust">Go outside:</span>
        {
          " Visit a pond or stream with a grown-up and look for beaver signs — pointy chewed stumps, wood chips, a mound of sticks. How many different living things can you count?"
        }
      </p>
    </div>
  );
}
export const BeaverPond = function () {
  var e;
  let t,
    s = (0, a.useId)().replace(/[^a-zA-Z0-9_-]/g, ""),
    r = (0, a.useRef)(null),
    [d, p] = (0, a.useState)($),
    [j, y] = (0, a.useState)(false);
  ((0, a.useEffect)(() => {
    let e = r.current;
    if (!e || "u" < typeof IntersectionObserver) return;
    let t = new IntersectionObserver(([e]) => y(e.isIntersecting), {
      rootMargin: "120px",
    });
    return (t.observe(e), () => t.disconnect());
  }, []),
    (0, a.useEffect)(() => {
      if (!j) return;
      let e = 0,
        t = 0,
        s = (r) => {
          let l = t ? Math.min(0.05, (r - t) / 1e3) : 0;
          ((t = r),
            l > 0 &&
              p((e) =>
                (function (e, t) {
                  let s = {
                    ...e,
                    clock: e.clock + t,
                  };
                  if (s.queue.length && s.queue.some((e) => e.at <= s.clock)) {
                    let e = {
                      ...s.arrived,
                    };
                    for (let t of s.queue) t.at <= s.clock && (e[t.id] = t.at);
                    ((s.arrived = e), (s.queue = s.queue.filter((e) => e.at > s.clock)));
                  }
                  if (null !== s.flood) {
                    let e = s.clock - s.flood;
                    (e > 0.85 && s.level > 0 && ((s.level = 0), (s.layerAt = []), (s.queue = []), (s.washAt = s.clock)),
                      e > 1.15 && Object.keys(s.arrived).length > b && (s.arrived = L()),
                      e > 2.6 && (s.flood = null));
                  }
                  let r = s.level / 7,
                    l = null !== s.flood ? 0.9 : 0.32,
                    a = r - s.water;
                  return ((s.water += Math.sign(a) * Math.min(Math.abs(a), t * l)), s);
                })(e, l),
              ),
            (e = requestAnimationFrame(s)));
        };
      return ((e = requestAnimationFrame(s)), () => cancelAnimationFrame(e));
    }, [j]));
  let Y = () => p(v),
    U = d.clock,
    K = {
      cx: 400,
      cy: 336 - 0.9 * (t = 22 + 92 * (e = d.water)),
      rx: 40 + 240 * e,
      ry: t,
    },
    _ = (e, t) => ({
      x: K.cx + e * K.rx,
      y: K.cy + t * K.ry,
    }),
    V = (e) => undefined !== d.arrived[e],
    J = (e) => o(x(U - (d.arrived[e] ?? -10))),
    ee = Object.keys(d.arrived).length,
    et = d.level >= 7 && null === d.flood,
    es = null !== d.flood,
    er = null !== d.flood ? U - d.flood : 0,
    el = d.washAt,
    ea = (e, t = 1.5) => o(Math.sin(1.6 * U + e) * t),
    ei = 400 + (36 + 15 * (7 * d.water)) + 46,
    en = o(-10 * Math.sin(Math.PI * i((U - d.tapAt) / 0.35))),
    eo = {
      beaver: {
        x: ei,
        y: 332,
        top: 70,
      },
      trout: {
        x: 426,
        y: 432,
        top: 16,
      },
      kingfisher: {
        x: 440,
        y: 102,
        top: 44,
      },
      chickadee: {
        x: 86,
        y: 214,
        top: 26,
      },
      dragonfly: {
        ..._(-0.25, -0.2),
        top: 60,
      },
      frog: {
        ..._(-0.8, 0.74),
        top: 32,
      },
      mallard: {
        ..._(-0.24, 0.42),
        top: 36,
      },
      cattail: {
        ..._(-0.97, 0.28),
        top: 100,
      },
      lily: {
        ..._(-0.32, 0.02),
        top: 16,
      },
      woodduck: {
        ..._(0.26, 0.06),
        top: 38,
      },
      muskrat: {
        ..._(0.02, -0.46),
        top: 16,
      },
      heron: {
        ..._(0.84, 0.36),
        top: 108,
      },
      blackbird: {
        ..._(-0.97, 0.28),
        top: 126,
      },
      moose: {
        ..._(-0.56, -0.38),
        top: 112,
      },
      otter: {
        x: 214,
        y: 392,
        top: 30,
      },
    },
    ec = k.filter((e) => e.level > 0 && V(e.id) && U - (d.arrived[e.id] ?? -10) < 2.4),
    ed =
      d.flooded && 0 === d.level
        ? "Whoosh! A big flood washed the dam away, and the pond drained. The ducks, frogs and moose moved on. Beavers don’t give up — tap to build again!"
        : M[d.level],
    ex = (e, t, s = "") =>
      V(e) ? (
        <g key={e} transform={`translate(${o(eo[e].x)} ${o(eo[e].y)})${s}`}>
          <g transform={`scale(${J(e)})`}>{t}</g>
        </g>
      ) : null,
    ef = _(0.6, -0.3),
    eh = d.level >= 7 ? x(U - (d.layerAt[6] ?? -10) - 0.4) : 0;
  return (
    <div ref={r} className="grid gap-4 text-ink">
      <div className="overflow-hidden rounded-2xl border border-line bg-paper-2">
        <svg
          viewBox="0 0 800 500"
          className="block h-auto w-full select-none"
          role="img"
          aria-label={`A valley with a stream and a beaver building a dam. ${ee} kinds of living things live here now.`}
        >
          <defs>
            <linearGradient id={`${s}-sky`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#b9e0f4" />
              <stop offset="1" stopColor="#eaf6ef" />
            </linearGradient>
            <linearGradient id={`${s}-pond`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#3f82bf" />
              <stop offset="1" stopColor="#5ea6d6" />
            </linearGradient>
          </defs>
          <rect width="800" height="500" fill={`url(#${s}-sky)`} />
          <path d="M0 96 Q 120 44 260 80 T 520 70 T 800 84 L 800 140 L 0 140 Z" fill="#a6c8b6" />
          <path d="M0 116 Q 160 76 330 104 T 640 96 T 800 108 L 800 160 L 0 160 Z" fill="#8fb89a" />
          <path d="M0 108 Q 200 96 400 100 T 800 104 L 800 500 L 0 500 Z" fill="#a8cf7a" />
          <path d="M0 420 Q 200 404 400 420 T 800 414 L 800 500 L 0 500 Z" fill="#9cc56e" />
          {[
            [20, 150, 0.8],
            [58, 176, 0.95],
            [18, 222, 1.1],
            [70, 262, 1.2],
            [26, 312, 1.35],
            [96, 150, 0.7],
            [700, 150, 0.8],
            [746, 172, 0.95],
            [782, 214, 1.1],
            [724, 250, 1.2],
            [776, 300, 1.35],
          ].map(([e, t, s], r) => (
            <C key={r} x={e} y={t} s={s} />
          ))}
          <W x={120} y={300} s={1} />
          <W x={690} y={330} s={1.05} />
          <W x={96} y={380} s={1.15} />
          {d.level >= 2 && <N x={662} y={372} />}
          {d.level >= 5 && <N x={712} y={352} />}
          <path d={m} fill="none" stroke="#7fa65a" strokeWidth={40} strokeLinecap="round" strokeLinejoin="round" />
          <path d={m} fill="none" stroke="#5aa0d0" strokeWidth={30} strokeLinecap="round" strokeLinejoin="round" />
          <path
            d={g}
            fill="none"
            stroke="#ffffff"
            strokeWidth={3}
            strokeLinecap="round"
            strokeDasharray="10 18"
            strokeDashoffset={o(-(40 * U))}
            opacity={0.6}
          />
          <ellipse cx={426} cy={434} rx={44} ry={17} fill="#4b93c8" />
          <path d="M60 216 Q 78 212 100 214" stroke="#6b4a33" strokeWidth={4} strokeLinecap="round" fill="none" />
          <path d="M470 168 L466 78" stroke="#9a948a" strokeWidth={8} strokeLinecap="round" />
          <path d="M468 108 L430 102 M467 90 L486 74" stroke="#9a948a" strokeWidth={5} strokeLinecap="round" />
          {d.water > 0.01 && (
            <g>
              <path d={u(K, 1.08, 10)} fill="#9fbd6a" opacity={o(n(d.water, 0.2, 0.5))} />
              <path d={u(K)} fill={`url(#${s}-pond)`} opacity={o(i(8 * d.water))} />
              <g stroke="#ffffff" strokeWidth={2.5} strokeLinecap="round" fill="none" opacity={0.5 * i(3 * d.water)}>
                {[
                  [-0.5, 0.1, 0],
                  [0.1, -0.25, 1],
                  [0.45, 0.2, 2],
                  [-0.1, 0.3, 3],
                ].map(([e, t, s]) => {
                  let r = _(e, t);
                  return <path key={s} d={`M ${o(r.x + 6 * Math.sin(U + s))} ${o(r.y)} q 12 -5 24 0`} />;
                })}
              </g>
            </g>
          )}
          {eh > 0 && (
            <g transform={`translate(${o(ef.x)} ${o(ef.y)})`}>
              <g transform={`scale(${o(eh)})`}>
                <CZ_ />
              </g>
            </g>
          )}
          {ex("moose", <B />, " scale(0.82)")}
          {V("moose") && (
            <ellipse cx={o(eo.moose.x - 6)} cy={o(eo.moose.y - 4)} rx={56 * J("moose")} ry={7} fill="#4a8ec6" opacity={0.95} />
          )}
          {ex("muskrat", <G />, ` translate(0 ${ea(1, 1)})`)}
          {ex("lily", <CQ_ />)}
          {V("lily") && (
            <g transform={`translate(${o(_(0.5, 0.5).x)} ${o(_(0.5, 0.5).y)}) scale(${J("lily")})`}>
              <CQ_ flower={false} />
            </g>
          )}
          {ex("woodduck", <F />, ` translate(0 ${ea(2)})`)}
          {d.level >= 7 && (
            <g opacity={o(i((U - (d.layerAt[6] ?? U)) / 1.5))}>
              {[
                [0.08, 0.3, 0],
                [0.24, 0.44, 1],
              ].map(([e, t, s]) => {
                let r = _(e, t);
                return (
                  <g
                    key={s}
                    transform={`translate(${o(r.x)} ${o(r.y)}) rotate(${o(4 * Math.sin(2 * U + s))}) scale(${s ? -0.8 : 0.9} 0.9)`}
                    opacity={0.8}
                  >
                    <A />
                  </g>
                );
              })}
            </g>
          )}
          {ex("mallard", <I />, ` translate(0 ${ea(0)})`)}
          {ex("cattail", <P />)}
          {V("cattail") && (
            <g transform={`translate(${o(_(0.96, 0.02).x)} ${o(_(0.96, 0.02).y)}) scale(${0.85 * J("cattail")})`}>
              <P />
            </g>
          )}
          {ex("blackbird", <O />, " translate(3 -104) scale(1.1)")}
          {ex("heron", <E />, " scale(0.9)")}
          {ex("frog", <Q />)}
          {ex("dragonfly", <D flap={0.55 + 0.45 * Math.abs(Math.sin(30 * U))} />, ` translate(0 ${o(-36 + 5 * Math.sin(3 * U))})`)}
          {V("dragonfly") && (
            <g
              transform={`translate(${o(_(0.46, 0.18).x)} ${o(_(0.46, 0.18).y - 44 + 5 * Math.sin(2.6 * U + 1))}) scale(${-0.85 * J("dragonfly")} ${0.85 * J("dragonfly")})`}
            >
              <D flap={0.55 + 0.45 * Math.abs(Math.sin(28 * U + 1))} />
            </g>
          )}
          {d.level > 0 && (
            <g>
              <rect
                x={400 - (36 + 15 * d.level) - 8}
                y={334 - 4.5 * d.level - 2}
                width={2 * (36 + 15 * d.level) + 16}
                height={356 - (334 - 4.5 * d.level)}
                rx={12}
                fill="#6b4a33"
              />
              {d.layerAt.map((e, t) => {
                let s = o(-16 * (1 - i((U - e) / 0.3)));
                return (
                  <g key={t} transform={`translate(0 ${s})`}>
                    {f[t].map((e, t) => (
                      <path
                        key={t}
                        d={c(
                          `M ${e.x - Math.cos((e.a * Math.PI) / 180) * e.len * 0.5} ${e.y - Math.sin((e.a * Math.PI) / 180) * e.len * 0.5} l ${Math.cos((e.a * Math.PI) / 180) * e.len} ${Math.sin((e.a * Math.PI) / 180) * e.len}`,
                        )}
                        stroke={e.c}
                        strokeWidth={o(e.w)}
                        strokeLinecap="round"
                      />
                    ))}
                    <ellipse cx={400 - 0.5 * (36 + 15 * (t + 1))} cy={334 - 4.5 * (t + 1) + 8} rx={10} ry={4} fill="#5a3d2a" />
                    <ellipse cx={400 + 0.4 * (36 + 15 * (t + 1))} cy={334 - 4.5 * (t + 1) + 10} rx={9} ry={3.5} fill="#5a3d2a" />
                  </g>
                );
              })}
              <path
                d="M 370 356 q 10 6 20 0 M 406 357 q 10 6 20 0"
                stroke="#ffffff"
                strokeWidth={2.5}
                fill="none"
                strokeLinecap="round"
                opacity={0.7}
              />
            </g>
          )}
          {ex("trout", <A />, ` rotate(${o(4 * Math.sin(3 * U))})`)}
          {ex("kingfisher", <T />)}
          {ex("chickadee", <S />)}
          {ex("otter", <X />)}
          <g transform={`translate(${o(ei)} ${o(334 + en)})`}>
            <g
              role="button"
              tabIndex={0}
              aria-label={et ? "The beaver. The dam is finished." : "The beaver. Tap to add a stick to the dam."}
              aria-disabled={et || es}
              onClick={Y}
              onKeyDown={(e) => {
                ("Enter" === e.key || " " === e.key) && (e.preventDefault(), Y());
              }}
              className="focus:outline-none focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-gold focus-visible:outline-solid"
              style={{
                cursor: et || es ? "default" : "pointer",
                touchAction: "manipulation",
              }}
            >
              <rect x={-100} y={-100} width={172} height={122} fill="#ffffff" opacity={0} />
              <g transform="scale(1.25)">
                <Z carrying={d.level < 7} />
              </g>
            </g>
          </g>
          {es && (
            <g
              style={{
                pointerEvents: "none",
              }}
            >
              <rect x={0} y={o(-640 + 520 * er)} width={800} height={600} fill="#8cc3e8" opacity={o(0.6 * (1 - n(er, 1.6, 2.6)))} />
              {er < 2 && (
                <path
                  d={c(
                    `M 0 ${-40 + 520 * er} ` +
                      Array.from(
                        {
                          length: 16,
                        },
                        (e, t) => `Q ${50 * t + 25} ${-40 + 520 * er + (t % 2 ? 16 : -16)} ${(t + 1) * 50} ${-40 + 520 * er}`,
                      ).join(" "),
                  )}
                  stroke="#ffffff"
                  strokeWidth={10}
                  strokeLinecap="round"
                  fill="none"
                  opacity={0.85}
                />
              )}
            </g>
          )}
          {null !== el &&
            U - el < 1.8 &&
            h.map((e, t) => {
              let s = U - el;
              return (
                <path
                  key={t}
                  d={`M ${-e.len / 2} 0 L ${e.len / 2} 0`}
                  transform={`translate(${o(e.x + e.dx * s)} ${o(330 + 170 * s)}) rotate(${o(e.spin * s)})`}
                  stroke="#8a603c"
                  strokeWidth={5}
                  strokeLinecap="round"
                  opacity={o(1 - n(s, 1.1, 1.8))}
                />
              );
            })}
          {ec.map((e) => {
            let t = eo[e.id];
            return (
              <g
                key={e.id}
                opacity={o(1 - n(U - (d.arrived[e.id] ?? 0), 1.9, 2.4))}
                style={{
                  pointerEvents: "none",
                }}
              >
                <R x={i(t.x, 110, 690)} y={Math.max(24, t.y - t.top - 20)} text={e.name} />
              </g>
            );
          })}
          {0 === d.level && !es && (
            <g
              style={{
                pointerEvents: "none",
              }}
            >
              <R x={ei - 20} y={214} text="Tap me!" size={24} />
            </g>
          )}
        </svg>
      </div>
      <div className="grid gap-3 sm:grid-cols-[auto_minmax(0,1fr)] sm:items-center">
        <div className="flex items-stretch gap-2" aria-live="polite">
          <div className="rounded-xl border border-line bg-paper-2/60 px-3 py-2 text-center">
            <p className="eyebrow">Before</p>
            <p className="font-display text-3xl font-semibold leading-none">{b}</p>
          </div>
          <div className="flex items-center text-2xl text-ink-2" aria-hidden="true">
            →
          </div>
          <div className={`rounded-xl border px-3 py-2 text-center ${ee === w ? "border-gold bg-gold/15" : "border-line bg-paper-2/60"}`}>
            <p className="eyebrow">Now</p>
            <p className="font-display text-3xl font-semibold leading-none">{ee}</p>
          </div>
          <p className="self-center text-sm font-semibold leading-tight text-ink-2">
            kinds of
            <br />
            living things
          </p>
        </div>
        <div className="flex items-center gap-2 sm:justify-end">
          <span className="text-sm font-semibold text-ink-2">Dam</span>
          <div className="flex gap-1.5" role="img" aria-label={`Dam: ${d.level} of 7 layers`}>
            {Array.from(
              {
                length: 7,
              },
              (e, t) => (
                <span
                  key={t}
                  className={`h-4 w-4 rounded-full border-2 ${t < d.level ? "border-[#6b4a33] bg-[#8a603c]" : "border-line bg-paper"}`}
                />
              ),
            )}
          </div>
        </div>
      </div>
      <p className="min-h-[3.5rem] rounded-xl border-l-4 border-l-gold bg-paper-2/60 p-3 text-base leading-relaxed" aria-live="polite">
        {ed}
      </p>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={Y}
          disabled={et || es}
          className="min-h-11 rounded-full bg-moss px-4 py-2 font-semibold text-white transition active:scale-95 disabled:opacity-50"
        >
          {et ? "Dam finished!" : "Help the beaver"}
        </button>
        <button
          type="button"
          onClick={() =>
            p((e) =>
              null !== e.flood || 0 === e.level
                ? e
                : {
                    ...e,
                    flood: e.clock,
                    flooded: true,
                    queue: [],
                  },
            )
          }
          disabled={0 === d.level || es}
          className="min-h-11 rounded-full border border-line bg-paper px-4 py-2 font-semibold text-ink-2 transition hover:border-azure hover:text-azure active:scale-95 disabled:opacity-50"
        >
          The dam washes away in a flood
        </button>
      </div>
      <ul className="flex flex-wrap gap-1.5" aria-label="Living things here now">
        {k
          .filter((e) => V(e.id))
          .map((e) => (
            <li
              key={e.id}
              className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${0 === e.level ? "border-line bg-paper-2 text-ink-2" : "border-moss/40 bg-moss/10 text-moss"}`}
            >
              {e.name}
            </li>
          ))}
      </ul>
      <p
        className={`rounded-xl px-4 py-3 font-display text-lg font-semibold leading-snug transition ${et ? "bg-gold/20 text-ink" : "bg-moss/10 text-moss"}`}
      >
        By building one dam, the beaver made a home for many other living things. That’s why beavers are called a keystone species.
      </p>
      <H />
    </div>
  );
};
