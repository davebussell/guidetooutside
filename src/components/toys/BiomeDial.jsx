"use client";
// Restored from client module 50391 (exports: BiomeDial)
import * as r from "react/jsx-runtime";
import * as l from "react";
let s;
let i = {
    tundra: {
      name: "Tundra",
      line: "the ground underneath stays frozen all year, so only tiny plants grow — and caribou and snowy owls live here.",
      place: "Like northern Quebec",
      alt: "Low tundra plants, patches of snow, a caribou and a snowy owl on a rock.",
      start: [10, 25],
    },
    boreal: {
      name: "Boreal forest",
      line: "long snowy winters and pointy spruce trees that keep their needles — moose and lynx live here.",
      place: "Like northern Ontario",
      alt: "Rows of pointy spruce trees, a moose and a lynx.",
      start: [30, 45],
    },
    mixedwood: {
      name: "Mixedwood forest",
      line: "spruce and maple trees grow side by side — loons call on the lakes and beavers build lodges.",
      place: "Like southern Quebec and New Brunswick",
      alt: "Spruce and maple trees round a lake, a loon on the water and a beaver by its lodge.",
      start: [42, 68],
    },
    deciduous: {
      name: "Deciduous forest",
      line: "big trees that drop their leaves every autumn — oaks, maples, deer and blue jays.",
      place: "Like southern Ontario and Ohio",
      alt: "Big round oak and maple trees, a white-tailed deer and a blue jay on a branch.",
      start: [62, 62],
    },
    prairie: {
      name: "Prairie grassland",
      line: "too dry for many trees, so grass grows as far as you can see — bison and meadowlarks live here.",
      place: "Like Saskatchewan",
      alt: "Flat land covered in tall grass and flowers, a bison and a meadowlark on a fence post.",
      start: [72, 30],
    },
    desert: {
      name: "Desert",
      line: "hardly any rain — a cactus stores water inside itself, and lizards and jackrabbits hide from the midday heat.",
      place: "Like Arizona",
      alt: "Sand, red rock mesas and tall saguaro cactuses, a jackrabbit and a lizard on a rock.",
      start: [90, 10],
    },
    rainforest: {
      name: "Temperate rainforest",
      line: "rain nearly all year — giant cedar trees, soft moss on everything, banana slugs and black bears.",
      place: "Like coastal British Columbia",
      alt: "Giant cedar trunks, ferns and a mossy log, a black bear and a yellow banana slug.",
      start: [58, 92],
    },
  },
  t = ["tundra", "boreal", "mixedwood", "deciduous", "prairie", "desert", "rainforest"],
  a = (e) => (e < 20 ? "cold" : e < 45 ? "cool" : e < 70 ? "mild" : e < 85 ? "warm" : "hot"),
  x = (e) => (e < 15 ? "very dry" : e < 35 ? "dry" : e < 60 ? "a bit rainy" : e < 80 ? "wet" : "very wet"),
  c = (e) => Math.min(1, Math.max(0, e));
function n(e) {
  if (e.startsWith("rgb")) {
    let [s, r, l] = e
      .slice(e.indexOf("(") + 1, e.indexOf(")"))
      .split(",")
      .map(Number);
    return [s, r, l];
  }
  let s = parseInt(e.slice(1), 16);
  return [(s >> 16) & 255, (s >> 8) & 255, 255 & s];
}
function d(e, s, r) {
  let l = n(e),
    i = n(s),
    t = c(r);
  return `rgb(${l.map((e, s) => Math.round(e + (i[s] - e) * t)).join(",")})`;
}
let o =
    ((s = 8675309),
    () => {
      let e = (s = (s + 0x6d2b79f5) >>> 0);
      return ((e = Math.imul(e ^ (e >>> 15), 1 | e)), (((e ^= e + Math.imul(e ^ (e >>> 7), 61 | e)) ^ (e >>> 14)) >>> 0) / 0x100000000);
    }),
  h = Array.from(
    {
      length: 90,
    },
    () => ({
      x: 6 + 788 * o(),
      y: 500 * o(),
      k: o(),
    }),
  ),
  f = [
    {
      x: 150,
      y: 70,
      s: 1.1,
    },
    {
      x: 430,
      y: 52,
      s: 1.25,
    },
    {
      x: 300,
      y: 110,
      s: 0.9,
    },
    {
      x: 700,
      y: 120,
      s: 1,
    },
    {
      x: 60,
      y: 140,
      s: 0.85,
    },
    {
      x: 560,
      y: 150,
      s: 0.95,
    },
  ],
  j = Array.from(
    {
      length: 150,
    },
    () => ({
      x: 820 * o() - 10,
      y: 360 + 150 * o(),
      h: 26 + 44 * o(),
      lean: -10 + 20 * o(),
      c: o(),
    }),
  ),
  y = Array.from(
    {
      length: 22,
    },
    () => ({
      x: 20 + 760 * o(),
      y: 350 + 130 * o(),
      c: o() > 0.5 ? "#8e5ca8" : "#f2c230",
    }),
  ),
  p = Array.from(
    {
      length: 26,
    },
    () => ({
      x: 800 * o(),
      y: 340 + 150 * o(),
      rx: 8 + 22 * o(),
      ry: 3 + 5 * o(),
    }),
  ),
  b = Array.from(
    {
      length: 30,
    },
    () => ({
      x: 800 * o(),
      y: 330 + 160 * o(),
      r: 1.5 + 3.5 * o(),
    }),
  );
function CU_({ x: e, y: s, h: l, c: i = "#2f5a3e" }) {
  let t = 0.34 * l,
    a = s - l;
  return (
    <g>
      <rect x={e - 0.03 * l} y={s - 0.12 * l} width={0.06 * l} height={0.12 * l} fill="#5a3d27" />
      <path
        d={`M${e} ${a} L${e + 0.5 * t} ${a + 0.34 * l} L${e + 0.28 * t} ${a + 0.34 * l} L${e + 0.78 * t} ${a + 0.62 * l} L${e + 0.5 * t} ${a + 0.62 * l} L${e + t} ${a + 0.9 * l} L${e - t} ${a + 0.9 * l} L${e - 0.5 * t} ${a + 0.62 * l} L${e - 0.78 * t} ${a + 0.62 * l} L${e - 0.28 * t} ${a + 0.34 * l} L${e - 0.5 * t} ${a + 0.34 * l} Z`}
        fill={i}
        strokeLinejoin="round"
      />
    </g>
  );
}
function CM_({ x: e, y: s, h: l, c: i, c2: t, trunk: a = "#6b4a30" }) {
  return (
    <g>
      <path
        d={`M${e - 0.05 * l} ${s} L${e - 0.035 * l} ${s - 0.5 * l} L${e + 0.035 * l} ${s - 0.5 * l} L${e + 0.05 * l} ${s} Z`}
        fill={a}
      />
      <circle cx={e} cy={s - 0.68 * l} r={0.3 * l} fill={i} />
      <circle cx={e - 0.22 * l} cy={s - 0.52 * l} r={0.21 * l} fill={i} />
      <circle cx={e + 0.23 * l} cy={s - 0.54 * l} r={0.22 * l} fill={i} />
      <circle cx={e - 0.08 * l} cy={s - 0.78 * l} r={0.16 * l} fill={t} />
      <circle cx={e + 0.14 * l} cy={s - 0.62 * l} r={0.12 * l} fill={t} />
    </g>
  );
}
function CK_({ x: e, y: s, h: l }) {
  let i = 0.15 * l;
  return (
    <g strokeLinecap="round" strokeLinejoin="round" fill="none">
      <path d={`M${e} ${s} L${e} ${s - l}`} stroke="#4f7f43" strokeWidth={i} />
      <path
        d={`M${e} ${s - 0.42 * l} L${e + 1.5 * i} ${s - 0.42 * l} L${e + 1.5 * i} ${s - 0.72 * l}`}
        stroke="#4f7f43"
        strokeWidth={0.8 * i}
      />
      <path
        d={`M${e} ${s - 0.55 * l} L${e - 1.4 * i} ${s - 0.55 * l} L${e - 1.4 * i} ${s - 0.8 * l}`}
        stroke="#4f7f43"
        strokeWidth={0.75 * i}
      />
      <path
        d={`M${e - 0.18 * i} ${s - 4} L${e - 0.18 * i} ${s - l + 4} M${e + 0.18 * i} ${s - 4} L${e + 0.18 * i} ${s - l + 4}`}
        stroke="#6f9d5c"
        strokeWidth={1.6}
      />
      <path d={`M${e + 1.5 * i} ${s - 0.45 * l} L${e + 1.5 * i} ${s - 0.7 * l}`} stroke="#6f9d5c" strokeWidth={1.4} />
    </g>
  );
}
function CG_({ x: e, y: s, lean: l = 0 }) {
  return (
    <g>
      <path d={`M${e} ${s} q${l / 2} -12 ${l} -24`} stroke="#6b7a4e" strokeWidth={1.8} fill="none" />
      <circle cx={e + l} cy={s - 26} r={5} fill="#fbfbf6" />
    </g>
  );
}
function L({ x: e, y: s, s: l = 1, flip: i = false }) {
  return (
    <g transform={`translate(${e} ${s}) scale(${i ? -l : l} ${l})`}>
      {[-70, -45, -20, 5, 30].map((e, s) => {
        let l = (e * Math.PI) / 180,
          i = 60 * Math.sin(l),
          t = -(50 * Math.cos(l));
        return (
          <g key={s}>
            <path d={`M0 0 Q${0.4 * i} ${1.1 * t} ${i} ${t + 14}`} stroke="#3f7a45" strokeWidth={3} fill="none" strokeLinecap="round" />
            <path
              d={`M0 0 Q${0.4 * i} ${1.1 * t} ${i} ${t + 14}`}
              stroke="#5c9c52"
              strokeWidth={11}
              fill="none"
              strokeDasharray="3 4"
              strokeLinecap="round"
              opacity={0.9}
            />
          </g>
        );
      })}
    </g>
  );
}
function M({ x: e, w: s, c: l = "#8a4f35" }) {
  let i = s / 2;
  return (
    <g>
      <path
        d={`M${e - i} -10 L${e - 0.95 * i} 430 Q${e - s} 480 ${e - 1.2 * s} 500 L${e + 1.2 * s} 500 Q${e + s} 480 ${e + 0.95 * i} 430 L${e + i} -10 Z`}
        fill={l}
      />
      <path
        d={`M${e - 0.4 * i} -10 L${e - 0.45 * i} 470 M${e + 0.3 * i} -10 L${e + 0.35 * i} 480 M${e - 0.05 * i} 40 L${e} 300`}
        stroke="#000"
        strokeOpacity={0.18}
        strokeWidth={3}
      />
    </g>
  );
}
let $ = ({ x: e, y: s, s: r = 1, flip: l = false }) => `translate(${e} ${s}) scale(${l ? -r : r} ${r})`;
function CW_(e) {
  return (
    <g transform={$(e)}>
      <g fill="#5e4430">
        <rect x={-28} y={-44} width={7} height={42} rx={3} />
        <rect x={20} y={-44} width={7} height={42} rx={3} />
      </g>
      <g fill="#7b5a3c">
        <rect x={-18} y={-42} width={7} height={40} rx={3} />
        <rect x={28} y={-42} width={7} height={40} rx={3} />
      </g>
      <g fill="#2e2319">
        <rect x={-28} y={-4} width={8} height={4} rx={2} />
        <rect x={-18} y={-4} width={8} height={4} rx={2} />
        <rect x={20} y={-4} width={8} height={4} rx={2} />
        <rect x={28} y={-4} width={8} height={4} rx={2} />
      </g>
      <ellipse cx={0} cy={-52} rx={37} ry={18} fill="#7b5a3c" />
      <ellipse cx={0} cy={-41} rx={27} ry={6} fill="#d9cdb8" />
      <ellipse cx={-35} cy={-55} rx={6} ry={9} fill="#efe8dc" />
      <path d="M18 -64 Q28 -76 36 -90 L50 -84 Q42 -64 32 -46 Z" fill="#ece4d4" />
      <path d="M30 -52 l3 8 l3 -7 l3 7 l3 -8" stroke="#ece4d4" strokeWidth={3} fill="none" strokeLinejoin="round" />
      <g stroke="#dcc9a3" strokeWidth={4} fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M42 -96 C36 -116 28 -128 18 -142 M34 -116 L46 -128 M26 -130 L34 -144 M20 -140 L10 -148" />
        <path d="M48 -96 C52 -118 48 -134 42 -148 M50 -114 L60 -124 M46 -132 L54 -144" />
        <path d="M46 -96 L56 -104 L62 -100" />
      </g>
      <ellipse cx={51} cy={-88} rx={14} ry={8} fill="#6a4c33" transform="rotate(22 51 -88)" />
      <circle cx={62} cy={-83} r={4.2} fill="#3b2a1c" />
      <ellipse cx={42} cy={-97} rx={3.5} ry={6} fill="#6a4c33" transform="rotate(-40 42 -97)" />
      <circle cx={49} cy={-92} r={1.8} fill="#1b1410" />
    </g>
  );
}
function Q(e) {
  return (
    <g transform={$(e)}>
      <ellipse cx={0} cy={-27} rx={18} ry={25} fill="#fbfbf7" stroke="#d6d9d6" strokeWidth={1.5} />
      <path d="M-14 -34 Q-20 -18 -12 -6" stroke="#d6d9d6" strokeWidth={2} fill="none" />
      <circle cx={0} cy={-54} r={15} fill="#fbfbf7" stroke="#d6d9d6" strokeWidth={1.5} />
      <circle cx={-5.5} cy={-56} r={4} fill="#f2c230" />
      <circle cx={5.5} cy={-56} r={4} fill="#f2c230" />
      <circle cx={-5.5} cy={-56} r={2} fill="#111" />
      <circle cx={5.5} cy={-56} r={2} fill="#111" />
      <path d="M-2 -51 L0 -46 L2 -51 Z" fill="#3a3a3a" />
      <g fill="#3d3d3d">
        {[
          [-8, -32],
          [6, -28],
          [-3, -20],
          [9, -16],
          [-10, -14],
          [2, -36],
          [-6, -64],
          [6, -65],
        ].map(([e, s], l) => (
          <ellipse key={l} cx={e} cy={s} rx={1.8} ry={1} />
        ))}
      </g>
      <ellipse cx={-6} cy={-2} rx={6} ry={3} fill="#f1f1ec" />
      <ellipse cx={6} cy={-2} rx={6} ry={3} fill="#f1f1ec" />
    </g>
  );
}
function W(e) {
  return (
    <g transform={$(e)}>
      <g fill="#7a6655">
        <rect x={-36} y={-70} width={9} height={68} rx={4} />
        <rect x={24} y={-70} width={9} height={68} rx={4} />
      </g>
      <g fill="#8e7a68">
        <rect x={-24} y={-68} width={9} height={66} rx={4} />
        <rect x={36} y={-68} width={9} height={66} rx={4} />
      </g>
      <ellipse cx={-2} cy={-84} rx={46} ry={24} fill="#4a3526" />
      <ellipse cx={26} cy={-98} rx={25} ry={20} fill="#4a3526" />
      <path d="M-46 -90 q-6 4 -4 12" stroke="#4a3526" strokeWidth={5} strokeLinecap="round" fill="none" />
      <path d="M40 -108 Q56 -112 68 -102 L88 -88 Q95 -80 88 -74 L68 -74 Q54 -78 42 -84 Z" fill="#3e2c20" />
      <ellipse cx={86} cy={-80} rx={9} ry={8} fill="#35251a" />
      <path d="M58 -76 Q60 -60 66 -62 Q66 -70 66 -74 Z" fill="#3e2c20" />
      <circle cx={62} cy={-99} r={2.2} fill="#140e0a" />
      <ellipse cx={52} cy={-112} rx={4} ry={8} fill="#3e2c20" transform="rotate(-30 52 -112)" />
      <path
        d="M48 -110 C40 -124 28 -130 14 -128 C18 -134 20 -140 18 -148 C26 -142 32 -142 38 -148 C40 -138 44 -128 52 -116 Z"
        fill="#cdb58c"
        stroke="#a89067"
        strokeWidth={1.5}
      />
      <path
        d="M56 -110 C62 -126 74 -132 88 -130 C84 -136 84 -142 88 -150 C78 -144 72 -144 66 -150 C64 -138 60 -128 56 -116 Z"
        fill="#d8c29a"
        stroke="#a89067"
        strokeWidth={1.5}
      />
    </g>
  );
}
function Z(e) {
  return (
    <g transform={$(e)}>
      <g fill="#a58c6c">
        <rect x={-24} y={-32} width={9} height={30} rx={4} />
        <rect x={16} y={-32} width={9} height={30} rx={4} />
      </g>
      <g fill="#b8a184">
        <rect x={-14} y={-30} width={9} height={28} rx={4} />
        <rect x={26} y={-30} width={9} height={28} rx={4} />
      </g>
      <g fill="#c9b596">
        <ellipse cx={-19} cy={-2} rx={8} ry={4} />
        <ellipse cx={-9} cy={-2} rx={8} ry={4} />
        <ellipse cx={21} cy={-2} rx={8} ry={4} />
        <ellipse cx={31} cy={-2} rx={8} ry={4} />
      </g>
      <ellipse cx={0} cy={-38} rx={30} ry={14} fill="#b8a184" />
      <ellipse cx={-31} cy={-44} rx={7} ry={5} fill="#b8a184" transform="rotate(-25 -31 -44)" />
      <ellipse cx={-36} cy={-47} rx={3.5} ry={3} fill="#1f1a16" />
      <g fill="#9c8467" opacity={0.6}>
        <circle cx={-10} cy={-42} r={2} />
        <circle cx={2} cy={-45} r={2} />
        <circle cx={-4} cy={-34} r={2} />
        <circle cx={12} cy={-38} r={2} />
      </g>
      <path d="M22 -60 L26 -80 L32 -62 Z M34 -62 L40 -80 L44 -60 Z" fill="#b8a184" />
      <path d="M26 -80 L26 -90 M40 -80 L41 -90" stroke="#1f1a16" strokeWidth={2.5} strokeLinecap="round" />
      <circle cx={33} cy={-52} r={13} fill="#c4ae90" />
      <path d="M20 -52 L18 -40 L25 -44 L28 -38 L33 -43 L38 -38 L41 -44 L48 -40 L46 -52 Z" fill="#ece3d4" />
      <circle cx={28} cy={-55} r={2.2} fill="#5d6b2e" />
      <circle cx={38} cy={-55} r={2.2} fill="#5d6b2e" />
      <path d="M31 -49 L35 -49 L33 -46 Z" fill="#c07a6e" />
    </g>
  );
}
function CV_(e) {
  return (
    <g transform={$(e)}>
      <path d="M-30 0 Q-32 -12 -10 -15 L16 -13 Q26 -11 26 0 Z" fill="#1c2124" />
      <g fill="#f4f4f0">
        {[-20, -14, -8, -2, 4, 10].map((e) =>
          [-10, -5].map((s) => <rect key={`${e}${s}`} x={e + 3 * (-5 === s)} y={s} width={2.4} height={2} />),
        )}
      </g>
      <path d="M14 -10 Q20 -20 24 -30 L32 -28 Q28 -18 24 -8 Z" fill="#1c2124" />
      <path d="M20 -18 L28 -17 M21 -15 L27 -14" stroke="#f4f4f0" strokeWidth={1.4} />
      <ellipse cx={29} cy={-31} rx={9} ry={7} fill="#1c2124" />
      <circle cx={31} cy={-32} r={1.8} fill="#c8352b" />
      <path d="M37 -32 L52 -29 L37 -28 Z" fill="#222" />
      <path d="M-36 4 L34 4 M-26 9 L24 9" stroke="#e7f1fa" strokeWidth={1.6} opacity={0.6} strokeLinecap="round" />
    </g>
  );
}
function N(e) {
  return (
    <g transform={$(e)}>
      <ellipse cx={-36} cy={-5} rx={20} ry={6} fill="#3a2a1c" transform="rotate(-8 -36 -5)" />
      <path d="M-48 -6 L-26 -8 M-46 -3 L-26 -4 M-40 -10 L-40 0 M-32 -11 L-32 0" stroke="#5a4533" strokeWidth={1} />
      <ellipse cx={0} cy={-17} rx={26} ry={16} fill="#6b4a2e" />
      <ellipse cx={-4} cy={-24} rx={14} ry={5} fill="#8a6644" opacity={0.6} />
      <circle cx={24} cy={-24} r={11.5} fill="#6b4a2e" />
      <circle cx={19} cy={-34} r={3.5} fill="#5a3d25" />
      <circle cx={28} cy={-27} r={1.8} fill="#140e0a" />
      <ellipse cx={34} cy={-23} rx={3.5} ry={2.5} fill="#2a1d14" />
      <rect x={29} y={-19} width={5} height={6} rx={1} fill="#e08a2e" />
      <ellipse cx={16} cy={-4} rx={6} ry={3} fill="#4a3322" />
    </g>
  );
}
function C(e) {
  return (
    <g transform={$(e)}>
      <g fill="#94683f">
        <rect x={-24} y={-48} width={5} height={46} rx={2} />
        <rect x={14} y={-48} width={5} height={46} rx={2} />
      </g>
      <g fill="#a87a50">
        <rect x={-16} y={-46} width={5} height={44} rx={2} />
        <rect x={22} y={-46} width={5} height={44} rx={2} />
      </g>
      <path d="M-28 -62 Q-42 -80 -36 -88 Q-26 -78 -22 -62 Z" fill="#fbf8f2" stroke="#b8845a" strokeWidth={1.5} />
      <ellipse cx={0} cy={-56} rx={31} ry={14} fill="#b8845a" />
      <ellipse cx={0} cy={-45} rx={22} ry={4.5} fill="#f3ece0" />
      <path d="M18 -64 Q24 -82 30 -94 L41 -90 Q35 -72 29 -56 Z" fill="#b8845a" />
      <ellipse cx={41} cy={-96} rx={12} ry={7} fill="#b07a50" transform="rotate(24 41 -96)" />
      <circle cx={51} cy={-91} r={3} fill="#1b1410" />
      <ellipse cx={30} cy={-106} rx={4} ry={9} fill="#b07a50" transform="rotate(-35 30 -106)" />
      <ellipse cx={38} cy={-108} rx={4} ry={9} fill="#b88658" transform="rotate(-5 38 -108)" />
      <ellipse cx={38} cy={-108} rx={2} ry={6} fill="#e4c3a4" transform="rotate(-5 38 -108)" />
      <circle cx={39} cy={-99} r={1.8} fill="#140e0a" />
      <ellipse cx={34} cy={-80} rx={4} ry={3} fill="#f3ece0" />
    </g>
  );
}
function T(e) {
  return (
    <g transform={$(e)}>
      <path d="M-8 -10 L-32 6 L-27 11 L-3 -3 Z" fill="#3a78c9" />
      <path d="M-18 -1 L-15 3 M-24 3 L-21 7" stroke="#16243f" strokeWidth={1.4} />
      <ellipse cx={0} cy={-14} rx={13} ry={9.5} fill="#3a78c9" />
      <ellipse cx={4} cy={-10} rx={8.5} ry={6} fill="#eef0f4" />
      <path d="M-8 -16 L4 -16 M-6 -12 L3 -12" stroke="#fff" strokeWidth={1.6} />
      <path d="M-8 -14 L-4 -14 M-6 -10 L-2 -10" stroke="#16243f" strokeWidth={1.6} />
      <circle cx={10} cy={-24} r={7.5} fill="#3a78c9" />
      <path d="M5 -29 L1 -40 L11 -30 Z" fill="#3a78c9" />
      <circle cx={13} cy={-22} r={4} fill="#eef0f4" />
      <path d="M6 -18 Q12 -13 18 -19" stroke="#16243f" strokeWidth={1.8} fill="none" />
      <circle cx={12} cy={-25} r={1.5} fill="#111" />
      <path d="M17 -25 L24 -23 L17 -21 Z" fill="#1b1b1b" />
      <path d="M-2 -5 L-2 0 M4 -5 L4 0" stroke="#3a3a3a" strokeWidth={1.4} />
    </g>
  );
}
function F(e) {
  return (
    <g transform={$(e)}>
      <g fill="#2f2014">
        <rect x={-38} y={-38} width={10} height={36} rx={4} />
        <rect x={18} y={-38} width={10} height={36} rx={4} />
      </g>
      <g fill="#3b2a1c">
        <rect x={-26} y={-36} width={10} height={34} rx={4} />
        <rect x={30} y={-36} width={10} height={34} rx={4} />
      </g>
      <path d="M-50 -58 q-8 10 -4 22" stroke="#3b2a1c" strokeWidth={3} fill="none" />
      <circle cx={-54} cy={-35} r={3.5} fill="#2a1c12" />
      <ellipse cx={-14} cy={-52} rx={36} ry={20} fill="#5c412b" />
      <ellipse cx={20} cy={-64} rx={32} ry={31} fill="#3f2c1c" />
      <ellipse cx={14} cy={-80} rx={20} ry={12} fill="#4d3622" />
      <ellipse cx={48} cy={-46} rx={14} ry={17} fill="#2c1f14" />
      <path d="M44 -32 Q46 -16 40 -12 Q36 -22 38 -32 Z" fill="#2c1f14" />
      <path d="M40 -58 Q34 -70 43 -72" stroke="#e1d6bf" strokeWidth={3.5} fill="none" strokeLinecap="round" />
      <circle cx={53} cy={-50} r={1.9} fill="#0e0906" />
      <ellipse cx={58} cy={-38} rx={4} ry={3} fill="#1a120c" />
    </g>
  );
}
function A(e) {
  return (
    <g transform={$(e)}>
      <path d="M-8 -8 L-24 2 L-20 6 L-4 -2 Z" fill="#8a6a45" />
      <path d="M-22 4 L-20 6" stroke="#fff" strokeWidth={2} />
      <ellipse cx={0} cy={-13} rx={12} ry={9.5} fill="#8a6a45" />
      <path d="M-8 -16 l4 2 M-4 -19 l4 2 M-9 -11 l4 2" stroke="#4d3a24" strokeWidth={1.3} />
      <ellipse cx={5} cy={-11} rx={8.5} ry={7.5} fill="#f2c230" />
      <path d="M1 -16 L6 -9 L11 -16" stroke="#161616" strokeWidth={2.6} fill="none" strokeLinejoin="round" />
      <circle cx={10} cy={-24} r={6.5} fill="#8a6a45" />
      <path d="M6 -28 L15 -27" stroke="#f2e2b5" strokeWidth={1.6} />
      <path d="M15 -25 L27 -29 L16 -22 Z" fill="#5b5b5b" />
      <path d="M15 -23 L25 -19 L15 -21 Z" fill="#5b5b5b" />
      <circle cx={12} cy={-25} r={1.4} fill="#111" />
      <path d="M-1 -4 L-1 0 M5 -4 L5 0" stroke="#6b6b6b" strokeWidth={1.4} />
    </g>
  );
}
function B(e) {
  return (
    <g transform={$(e)}>
      <ellipse cx={-22} cy={-22} rx={5} ry={5} fill="#f6f1e8" />
      <path d="M-24 -26 Q-22 -30 -18 -26" stroke="#1e1a16" strokeWidth={2.5} fill="none" />
      <ellipse cx={-10} cy={-9} rx={15} ry={9} fill="#9a7d5a" />
      <rect x={-26} y={-4} width={24} height={4.5} rx={2.2} fill="#8a6f4f" />
      <ellipse cx={0} cy={-19} rx={22} ry={14} fill="#a88b66" />
      <rect x={14} y={-14} width={4} height={14} rx={2} fill="#9a7d5a" />
      <ellipse cx={24} cy={-29} rx={11} ry={8.5} fill="#a88b66" />
      <ellipse cx={14} cy={-54} rx={5.5} ry={22} fill="#a88b66" transform="rotate(-12 14 -54)" />
      <ellipse cx={14} cy={-54} rx={2.6} ry={17} fill="#e7b3a5" transform="rotate(-12 14 -54)" />
      <ellipse cx={24} cy={-56} rx={5.5} ry={22} fill="#b59672" transform="rotate(6 24 -56)" />
      <ellipse cx={24} cy={-56} rx={2.6} ry={17} fill="#e7b3a5" transform="rotate(6 24 -56)" />
      <path d="M8 -74 Q10 -78 12 -75 M27 -77 Q30 -79 30 -75" stroke="#1e1a16" strokeWidth={2.4} fill="none" strokeLinecap="round" />
      <circle cx={27} cy={-31} r={2} fill="#140e0a" />
      <circle cx={34} cy={-27} r={1.6} fill="#8a5a4f" />
    </g>
  );
}
function CZ_(e) {
  return (
    <g transform={$(e)}>
      <path d="M-12 -4 Q-40 2 -60 -10" stroke="#7d6d48" strokeWidth={5} fill="none" strokeLinecap="round" />
      <path d="M-40 -2 Q-52 -4 -60 -10" stroke="#7d6d48" strokeWidth={2.5} fill="none" strokeLinecap="round" />
      <path d="M-8 -3 L-14 4 M8 -3 L14 4 M-6 -7 L-12 -12 M8 -7 L14 -12" stroke="#7d6d48" strokeWidth={2.5} strokeLinecap="round" />
      <ellipse cx={0} cy={-5} rx={16} ry={5.5} fill="#8f7e56" />
      <ellipse cx={19} cy={-7} rx={8} ry={4.8} fill="#8f7e56" />
      <circle cx={22} cy={-9} r={1.4} fill="#111" />
      <g fill="#5d5236">
        <circle cx={-8} cy={-6} r={1.6} />
        <circle cx={-1} cy={-7} r={1.6} />
        <circle cx={6} cy={-6} r={1.6} />
      </g>
    </g>
  );
}
function O(e) {
  return (
    <g transform={$(e)}>
      <path d="M-32 0 Q-34 -9 -20 -12 L14 -15 Q30 -15 33 -5 Q34 0 29 0 Z" fill="#e6c43a" stroke="#c9a52a" strokeWidth={1.2} />
      <ellipse cx={15} cy={-11} rx={13} ry={5} fill="#d9b62f" />
      <g fill="#2a2618">
        <circle cx={-18} cy={-6} r={1.8} />
        <circle cx={-6} cy={-9} r={2} />
        <circle cx={6} cy={-5} r={1.6} />
        <circle cx={18} cy={-11} r={1.7} />
      </g>
      <path d="M28 -9 L35 -22 M31 -8 L41 -18" stroke="#c9a52a" strokeWidth={2} strokeLinecap="round" />
      <circle cx={35} cy={-23} r={1.8} fill="#3a3320" />
      <circle cx={41.5} cy={-19} r={1.8} fill="#3a3320" />
    </g>
  );
}
function S(e) {
  return (
    <g transform={$(e)}>
      <g fill="#141316">
        <rect x={-34} y={-38} width={14} height={36} rx={6} />
        <rect x={12} y={-38} width={14} height={36} rx={6} />
      </g>
      <g fill="#1d1c20">
        <rect x={-20} y={-36} width={14} height={34} rx={6} />
        <rect x={26} y={-36} width={14} height={34} rx={6} />
      </g>
      <ellipse cx={0} cy={-46} rx={40} ry={25} fill="#1d1c20" />
      <ellipse cx={-6} cy={-60} rx={24} ry={7} fill="#35343a" />
      <circle cx={40} cy={-56} r={17} fill="#1d1c20" />
      <circle cx={31} cy={-71} r={5.5} fill="#1d1c20" />
      <circle cx={45} cy={-72} r={5.5} fill="#1d1c20" />
      <ellipse cx={54} cy={-51} rx={10} ry={7.5} fill="#c49a6c" />
      <circle cx={61} cy={-53} r={3.2} fill="#0e0d10" />
      <circle cx={43} cy={-60} r={1.9} fill="#8a7550" />
    </g>
  );
}
let q = (() => {
    let e = "M-10 -10 L810 -10 L810 70";
    for (let s = 810; s > -10; s -= 40) {
      let r = 70 + ((s / 40) % 3) * 14;
      e += ` Q${s - 20} ${r + 34} ${s - 40} ${r - 6}`;
    }
    return e + " Z";
  })(),
  P = (() => {
    let e = "M-10 -10 L810 -10 L810 30";
    for (let s = 810; s > -10; s -= 56) e += ` Q${s - 28} ${58 + ((s / 56) % 2) * 12} ${s - 56} 30`;
    return e + " Z";
  })(),
  R = {
    tundra: (0, r.jsx)(function () {
      return (
        <g>
          <path d="M0 296 Q120 262 260 284 T520 278 T800 270 L800 330 L0 330 Z" fill="#b9c5c8" />
          <path d="M0 312 Q160 292 330 306 T640 300 T800 304 L800 340 L0 340 Z" fill="#aab090" />
          <path d="M0 326 Q200 314 400 326 T800 320 L800 500 L0 500 Z" fill="#a39f73" />
          {p.map((e, s) => (
            <ellipse
              key={s}
              cx={e.x}
              cy={e.y}
              rx={e.rx}
              ry={e.ry}
              fill={s % 3 == 0 ? "#b0654a" : s % 3 == 1 ? "#7f9460" : "#c7c49a"}
              opacity={0.85}
            />
          ))}
          <g fill="#f4f7f8">
            <ellipse cx={90} cy={430} rx={70} ry={12} />
            <ellipse cx={470} cy={352} rx={90} ry={8} />
            <ellipse cx={720} cy={456} rx={80} ry={14} />
            <ellipse cx={240} cy={484} rx={60} ry={9} />
            <ellipse cx={640} cy={336} rx={60} ry={5} />
          </g>
          <g>
            <path d="M506 410 Q510 380 552 376 Q600 374 610 410 Z" fill="#8f918d" />
            <path d="M520 386 Q548 378 580 384" stroke="#b2b4b0" strokeWidth={4} fill="none" strokeLinecap="round" />
            <ellipse cx={180} cy={452} rx={16} ry={8} fill="#8f918d" />
            <ellipse cx={690} cy={404} rx={12} ry={6} fill="#8f918d" />
          </g>
          {[
            [110, 470, -4],
            [128, 474, 3],
            [410, 460, -2],
            [428, 466, 5],
            [650, 480, -5],
            [668, 476, 2],
            [360, 380, 3],
            [760, 380, -3],
          ].map(([e, s, l], i) => (
            <CG_ key={i} x={e} y={s} lean={l} />
          ))}
          <CW_ x={300} y={446} s={1.3} />
          <Q x={558} y={380} s={1.1} />
        </g>
      );
    }, {}),
    boreal: (0, r.jsx)(function () {
      return (
        <g>
          <path d="M0 290 Q150 262 300 280 T600 270 T800 276 L800 330 L0 330 Z" fill="#6f8f86" />
          {[20, 60, 95, 140, 175, 220, 260, 300, 345, 380, 430, 470, 505, 550, 600, 640, 690, 730, 770].map((e, s) => (
            <CU_ key={s} x={e} y={300 + (s % 3) * 4} h={52 + (s % 4) * 8} c="#4c6f64" />
          ))}
          <path d="M0 312 Q200 300 400 310 T800 306 L800 500 L0 500 Z" fill="#657d4c" />
          {p.map((e, s) => (
            <ellipse key={s} cx={e.x} cy={e.y} rx={e.rx} ry={e.ry} fill={s % 2 ? "#c6cfa6" : "#7f9a5a"} opacity={0.8} />
          ))}
          {[30, 110, 190, 260, 480, 560, 620, 700, 770].map((e, s) => (
            <CU_ key={s} x={e} y={340 + (s % 2) * 12} h={120 + (s % 3) * 22} c="#2f5a3e" />
          ))}
          <CU_ x={420} y={392} h={200} c="#284e36" />
          <CU_ x={760} y={470} h={220} c="#264a33" />
          <CU_ x={40} y={480} h={200} c="#264a33" />
          <W x={250} y={456} s={1.25} />
          <Z x={575} y={462} s={1.25} flip />
        </g>
      );
    }, {}),
    mixedwood: (0, r.jsx)(function () {
      return (
        <g>
          <path d="M0 288 Q140 256 300 276 T620 262 T800 270 L800 330 L0 330 Z" fill="#7d9c7e" />
          <path d="M0 306 Q180 290 360 302 T800 300 L800 500 L0 500 Z" fill="#6c8d4d" />
          <g>
            <CM_ x={520} y={330} h={110} c="#d9822b" c2="#e9a24a" />
            <CU_ x={570} y={336} h={140} c="#2f5a3e" />
            <CM_ x={640} y={334} h={120} c="#5f9147" c2="#78a95a" />
            <CU_ x={700} y={340} h={160} c="#2c5439" />
            <CM_ x={770} y={338} h={120} c="#c8352b" c2="#df5a45" />
            <CU_ x={40} y={318} h={120} c="#2f5a3e" />
            <CM_ x={100} y={316} h={96} c="#5f9147" c2="#78a95a" />
            <CU_ x={160} y={318} h={130} c="#2c5439" />
            <CM_ x={240} y={316} h={100} c="#e0a23a" c2="#efbd5c" />
            <CU_ x={310} y={318} h={110} c="#2f5a3e" />
            <CM_ x={380} y={318} h={90} c="#5f9147" c2="#78a95a" />
            <CU_ x={450} y={320} h={120} c="#2c5439" />
          </g>
          <path d="M-10 350 Q200 330 420 346 Q480 360 470 400 Q450 450 300 462 Q120 470 -10 452 Z" fill="#5c93c4" />
          <path
            d="M40 380 L140 380 M220 410 L330 410 M60 432 L150 432 M300 440 L380 440"
            stroke="#dbeaf6"
            strokeWidth={2}
            opacity={0.6}
            strokeLinecap="round"
          />
          <g>
            <path d="M322 392 Q340 346 382 346 Q420 350 432 392 Z" fill="#6b4f36" />
            <path
              d="M330 384 L420 362 M336 370 L414 384 M350 356 L398 390 M344 388 L406 350 M360 350 L372 392"
              stroke="#4a3524"
              strokeWidth={2.4}
              strokeLinecap="round"
            />
          </g>
          <CV_ x={168} y={410} s={1.4} />
          <N x={540} y={452} s={1.4} flip />
          <CU_ x={740} y={492} h={190} c="#274b33" />
          <CM_ x={640} y={498} h={150} c="#c8352b" c2="#df5a45" />
        </g>
      );
    }, {}),
    deciduous: (0, r.jsx)(function () {
      return (
        <g>
          <path d="M0 284 Q160 250 330 272 T650 262 T800 268 L800 330 L0 330 Z" fill="#8fb170" />
          <g>
            {[30, 90, 160, 230, 300, 380, 460, 540, 610, 690, 760].map((e, s) => (
              <CM_ key={e} x={e} y={306} h={70 + (s % 3) * 12} c={s % 2 ? "#6f9a4f" : "#5d8a43"} c2="#86b064" />
            ))}
          </g>
          <path d="M0 300 Q200 290 400 302 T800 296 L800 500 L0 500 Z" fill="#7da05a" />
          {b.slice(0, 18).map((e, s) => (
            <ellipse key={s} cx={e.x} cy={e.y + 40} rx={3 * e.r} ry={e.r} fill="#6b8f4a" />
          ))}
          <CM_ x={130} y={470} h={280} c="#4d7a3f" c2="#66954f" trunk="#5d4029" />
          <path d="M140 330 Q180 318 226 322" stroke="#5d4029" strokeWidth={9} strokeLinecap="round" fill="none" />
          <CM_ x={660} y={462} h={260} c="#5f8f45" c2="#7aa95a" trunk="#6b4a30" />
          <CM_ x={480} y={400} h={170} c="#6a9a4a" c2="#83b261" />
          <C x={380} y={456} s={1.25} />
          <T x={212} y={318} s={1.35} />
          <g fill="#9a6b3c">
            <ellipse cx={560} cy={478} rx={8} ry={6} />
            <ellipse cx={590} cy={488} rx={7} ry={5} />
          </g>
        </g>
      );
    }, {}),
    prairie: (0, r.jsx)(function () {
      return (
        <g>
          <path d="M0 300 L800 296 L800 330 L0 330 Z" fill="#b9b579" />
          <path d="M0 306 Q200 300 400 308 T800 304 L800 500 L0 500 Z" fill="#c7b066" />
          <path d="M0 340 Q300 330 800 344 L800 360 L0 360 Z" fill="#b0a75a" opacity={0.6} />
          <g strokeLinecap="round" fill="none">
            {j.map((e, s) => (
              <path
                key={s}
                d={`M${e.x.toFixed(1)} ${e.y.toFixed(1)} q${(e.lean / 2).toFixed(1)} ${(-e.h / 2).toFixed(1)} ${e.lean.toFixed(1)} ${(-e.h).toFixed(1)}`}
                stroke={e.c < 0.33 ? "#a88c3e" : e.c < 0.66 ? "#8f9c47" : "#c9a94c"}
                strokeWidth={2.2}
              />
            ))}
          </g>
          {y.map((e, s) => (
            <circle key={s} cx={e.x} cy={e.y} r={4} fill={e.c} />
          ))}
          <g>
            <path d="M470 400 L800 380" stroke="#6b5a45" strokeWidth={1.5} />
            <path d="M470 380 L800 360" stroke="#6b5a45" strokeWidth={1.5} />
            {[500, 600, 700, 790].map((e, s) => (
              <rect key={e} x={e - 5} y={354 - 6 * s} width={10} height={70} rx={2} fill="#7a5a3a" />
            ))}
          </g>
          <F x={300} y={440} s={1.5} />
          <A x={600} y={349} s={1.6} />
          <g strokeLinecap="round" fill="none">
            {j.slice(0, 40).map((e, s) => (
              <path
                key={s}
                d={`M${(0.98 * e.x + 8).toFixed(1)} 505 q${(e.lean / 2).toFixed(1)} ${(-(0.6 * e.h)).toFixed(1)} ${e.lean.toFixed(1)} ${(-(1.2 * e.h)).toFixed(1)}`}
                stroke={s % 2 ? "#b39545" : "#9aa54f"}
                strokeWidth={2.6}
              />
            ))}
          </g>
        </g>
      );
    }, {}),
    desert: (0, r.jsx)(function () {
      return (
        <g>
          <path d="M40 300 L60 238 L200 238 L222 300 Z" fill="#c9764a" />
          <path d="M60 238 L200 238 L196 250 L64 250 Z" fill="#d98e5e" />
          <path d="M470 300 L500 256 L620 256 L660 300 Z" fill="#cf7d52" />
          <path d="M640 300 L660 270 L740 270 L770 300 Z" fill="#c26d44" />
          <path d="M0 300 Q200 292 400 302 T800 298 L800 500 L0 500 Z" fill="#e6c68e" />
          <path d="M0 360 Q260 344 520 366 T800 360" stroke="#d9b578" strokeWidth={10} fill="none" opacity={0.6} />
          {b.map((e, s) => (
            <circle key={s} cx={e.x} cy={e.y} r={e.r} fill="#c9a36b" />
          ))}
          <CK_ x={150} y={440} h={210} />
          <CK_ x={690} y={350} h={120} />
          <CK_ x={420} y={326} h={70} />
          <g fill="#8a9a5a">
            <ellipse cx={250} cy={360} rx={22} ry={10} />
            <ellipse cx={600} cy={470} rx={26} ry={11} />
            <ellipse cx={740} cy={430} rx={18} ry={8} />
            <ellipse cx={60} cy={470} rx={20} ry={8} />
          </g>
          <path d="M490 470 Q496 440 540 436 Q590 436 596 470 Z" fill="#c7925e" />
          <B x={320} y={452} s={1.5} />
          <CZ_ x={544} y={438} s={1.25} />
        </g>
      );
    }, {}),
    rainforest: (0, r.jsx)(function () {
      return (
        <g>
          <rect x={0} y={200} width={800} height={130} fill="#6f9a7e" />
          <M x={210} w={30} c="#8b6a5c" />
          <M x={520} w={34} c="#8b6a5c" />
          <rect x={0} y={0} width={800} height={500} fill="#e8f0ea" opacity={0.25} />
          <path d="M0 300 Q200 286 400 298 T800 292 L800 500 L0 500 Z" fill="#4e7d45" />
          <M x={80} w={70} />
          <M x={690} w={80} />
          <path d={q} fill="#2c563a" />
          <path d={P} fill="#3d7049" />
          <path d="M430 450 Q430 424 460 420 L740 414 Q770 416 770 440 Q768 462 740 462 L462 468 Q432 468 430 450 Z" fill="#6b4a36" />
          <path d="M432 444 Q440 414 470 414 L736 406 Q772 406 772 432 Q760 420 734 422 L470 428 Q446 430 432 444 Z" fill="#79b04e" />
          <ellipse cx={450} cy={446} rx={14} ry={20} fill="#8a6048" />
          <ellipse cx={450} cy={446} rx={8} ry={13} fill="#a67a5c" />
          <L x={40} y={500} s={1.3} />
          <L x={250} y={470} s={1} flip />
          <L x={600} y={500} s={1.2} />
          <L x={790} y={492} s={1.1} flip />
          <g fill="#79b04e">
            <ellipse cx={80} cy={420} rx={36} ry={6} />
            <ellipse cx={690} cy={330} rx={44} ry={6} />
          </g>
          <S x={290} y={454} s={1.35} />
          <O x={590} y={414} s={1.3} />
        </g>
      );
    }, {}),
  };
function D({ x: e, y: s, s: l, fill: i, opacity: t }) {
  return (
    <g transform={`translate(${e} ${s}) scale(${l})`} opacity={t}>
      <circle cx={-26} cy={4} r={18} fill={i} />
      <circle cx={0} cy={-8} r={26} fill={i} />
      <circle cx={28} cy={2} r={20} fill={i} />
      <rect x={-44} y={2} width={90} height={20} rx={10} fill={i} />
    </g>
  );
}
function I({ two: e, four: s, six: l, outside: i }) {
  return (
    <div className="rounded-2xl border border-line bg-paper-2/60 p-4 text-sm leading-snug">
      <p className="eyebrow">Say it like this</p>
      <ul className="mt-3 grid gap-2.5">
        {[
          ["2", e],
          ["4", s],
          ["6", l],
        ].map(([e, s]) => (
          <li key={e} className="flex items-start gap-3">
            <span className="mt-px inline-flex shrink-0 items-center rounded-full bg-moss/10 px-2.5 py-0.5 text-xs font-semibold text-moss">
              {"Age "}
              {e}
            </span>
            <span className="text-ink">“{s}”</span>
          </li>
        ))}
      </ul>
      <p className="mt-3 border-t border-line/70 pt-3 text-ink">
        <span className="font-semibold text-azure">{"Go outside: "}</span>
        {i}
      </p>
    </div>
  );
}
let G = `
.bd-range { -webkit-appearance: none; appearance: none; flex: 1 1 auto; min-width: 0; height: 44px; background: transparent; cursor: pointer; margin: 0; }
.bd-range:focus { outline: none; }
.bd-range::-webkit-slider-runnable-track { height: 18px; border-radius: 999px; background: var(--track); box-shadow: inset 0 1px 3px rgba(0,0,0,0.18); }
.bd-range::-moz-range-track { height: 18px; border-radius: 999px; background: var(--track); box-shadow: inset 0 1px 3px rgba(0,0,0,0.18); }
.bd-range::-webkit-slider-thumb { -webkit-appearance: none; appearance: none; width: 38px; height: 38px; margin-top: -10px; border-radius: 999px; background: #fffdf8; border: 5px solid var(--thumb); box-shadow: 0 2px 6px rgba(0,0,0,0.28); }
.bd-range::-moz-range-thumb { width: 28px; height: 28px; border-radius: 999px; background: #fffdf8; border: 5px solid var(--thumb); box-shadow: 0 2px 6px rgba(0,0,0,0.28); }
.bd-range:focus-visible::-webkit-slider-thumb { box-shadow: 0 0 0 5px rgba(217,164,65,0.55), 0 2px 6px rgba(0,0,0,0.28); }
.bd-range:focus-visible::-moz-range-thumb { box-shadow: 0 0 0 5px rgba(217,164,65,0.55), 0 2px 6px rgba(0,0,0,0.28); }
@keyframes bd-fall { from { transform: translateY(0); } to { transform: translateY(500px); } }
.bd-rain { animation: bd-fall 1.5s linear infinite; }
.bd-snow { animation: bd-fall 9s linear infinite; }
@media (prefers-reduced-motion: reduce) { .bd-rain, .bd-snow { animation: none; } }
`;
/** @param {{ start?: string }} props — the vegetation type the dial opens on ("tundra", "boreal", "mixedwood", "deciduous", "prairie", "desert", "rainforest"). */
export const BiomeDial = function ({ start: e }) {
  let s = (0, l.useId)().replace(/[^a-zA-Z0-9_-]/g, ""),
    [n, o] = i[e ?? "mixedwood"].start,
    [j, y] = (0, l.useState)(n),
    [p, b] = (0, l.useState)(o),
    u =
      j < 20
        ? "tundra"
        : j < 40
          ? p < 12
            ? "tundra"
            : p < 62
              ? "boreal"
              : "mixedwood"
          : j < 55
            ? p < 25
              ? "prairie"
              : p < 45
                ? "boreal"
                : p < 85
                  ? "mixedwood"
                  : "rainforest"
            : j < 78
              ? p < 12
                ? "desert"
                : p < 42
                  ? "prairie"
                  : p < 80
                    ? "deciduous"
                    : "rainforest"
              : p < 30
                ? "desert"
                : p < 55
                  ? "prairie"
                  : "deciduous",
    m = i[u],
    k = j / 100,
    g = p / 100,
    L = Math.pow(g, 1.6),
    M = d(d("#b5cfe2", "#62ace6", k), "#8793a1", 0.75 * L),
    $ = d(d("#e8eff2", "#f6e3b4", k), "#b8bfc7", 0.65 * L),
    w = 24 + 22 * k,
    Q = d("#f6f0d2", "#f5b23c", k),
    W = d("#ffffff", "#8e98a3", Math.pow(g, 1.4)),
    Z = Math.max(0, p - 52) / 48,
    v = j < 22,
    N = Z > 0 ? Math.round(12 + 70 * Z) : 0,
    C = `${a(j)} and ${x(p)}`,
    T = C.charAt(0).toUpperCase() + C.slice(1);
  return (
    <div className="grid gap-4">
      <style>{G}</style>
      <div className="overflow-hidden rounded-2xl">
        <svg viewBox="0 0 800 500" className="block h-auto w-full" role="img" aria-label={`${m.name}. ${T}. ${m.alt}`}>
          <defs>
            <linearGradient id={`${s}-sky`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor={M} />
              <stop offset="1" stopColor={$} />
            </linearGradient>
          </defs>
          <rect x={0} y={0} width={800} height={500} fill={`url(#${s}-sky)`} />
          <g opacity={1 - 0.7 * L}>
            <circle cx={660} cy={84} r={w + 18} fill={Q} opacity={0.25 + 0.2 * k} />
            <circle cx={660} cy={84} r={w} fill={Q} />
          </g>
          {t.map((e) => (
            <g
              key={e}
              aria-hidden="true"
              style={{
                opacity: +(e === u),
                transition: "opacity 650ms ease",
              }}
            >
              {R[e]}
            </g>
          ))}
          {f.map((e, s) => {
            let l = c((p - 8 - 14 * s) / 14);
            return l > 0 ? <D key={s} x={e.x} y={e.y} s={e.s} fill={W} opacity={0.95 * l} /> : null;
          })}
          {N > 0 && (
            <g key={v ? "snow" : "rain"}>
              <g className={v ? "bd-snow" : "bd-rain"}>
                {h
                  .slice(0, N)
                  .map((e, s) =>
                    [0, -500].map((l) =>
                      v ? (
                        <circle
                          key={`${s}${l}`}
                          cx={e.x.toFixed(1)}
                          cy={(e.y + l).toFixed(1)}
                          r={(2.4 + 1.8 * e.k).toFixed(1)}
                          fill="#fff"
                          opacity={0.92}
                        />
                      ) : (
                        <path
                          key={`${s}${l}`}
                          d={`M${(e.x + 4).toFixed(1)} ${(e.y + l).toFixed(1)} l-4 ${(12 + 6 * e.k).toFixed(1)}`}
                          stroke="#5f86ad"
                          strokeWidth={2.2}
                          strokeLinecap="round"
                          opacity={0.75}
                        />
                      ),
                    ),
                  )}
              </g>
            </g>
          )}
        </svg>
      </div>
      <div aria-live="polite">
        <div className="flex flex-wrap items-end justify-between gap-x-4 gap-y-2">
          <p className="font-display text-3xl font-semibold leading-none text-ink sm:text-4xl">{m.name}</p>
          <p className="inline-flex items-center gap-1.5 rounded-full border border-line bg-paper-2/70 px-3 py-1 text-sm font-semibold text-ink">
            <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 text-rust" aria-hidden="true">
              <path d="M8 1 C4.7 1 2.5 3.4 2.5 6.3 C2.5 10 8 15 8 15 C8 15 13.5 10 13.5 6.3 C13.5 3.4 11.3 1 8 1 Z" fill="currentColor" />
              <circle cx={8} cy={6.2} r={2} fill="#fff" />
            </svg>
            {m.place}
          </p>
        </div>
        <p className="mt-2 leading-relaxed text-ink">
          <span className="font-semibold">{T}:</span> {m.line}
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        <label className="block">
          <span className="flex items-baseline justify-between gap-2">
            <span className="font-display text-lg font-semibold text-ink">Warmth</span>
            <span className="text-sm font-semibold text-ink-2">{a(j)}</span>
          </span>
          <span className="mt-1 flex items-center gap-2">
            <svg viewBox="0 0 24 24" className="h-7 w-7 shrink-0" aria-hidden="true">
              <g stroke="#2c6fb5" strokeWidth={2.2} strokeLinecap="round">
                <path d="M12 2 V22 M3.3 7 L20.7 17 M3.3 17 L20.7 7" />
                <path d="M9.5 3.5 L12 6 L14.5 3.5 M9.5 20.5 L12 18 L14.5 20.5" fill="none" />
              </g>
            </svg>
            <input
              type="range"
              min={0}
              max={100}
              step={1}
              value={j}
              onChange={(e) => y(Number(e.target.value))}
              aria-label="Warmth, from cold to hot"
              aria-valuetext={a(j)}
              className="bd-range"
              style={{
                "--track": "linear-gradient(90deg, #8fc0e6 0%, #cfe3cf 35%, #f2d27a 70%, #e0703d 100%)",
                "--thumb": d("#2c6fb5", "#c8352b", k),
              }}
            />
            <svg viewBox="0 0 24 24" className="h-7 w-7 shrink-0" aria-hidden="true">
              <circle cx={12} cy={12} r={5} fill="#e89a2c" />
              <g stroke="#e89a2c" strokeWidth={2.2} strokeLinecap="round">
                <path d="M12 1.5 V4 M12 20 V22.5 M1.5 12 H4 M20 12 H22.5 M4.6 4.6 L6.3 6.3 M17.7 17.7 L19.4 19.4 M4.6 19.4 L6.3 17.7 M17.7 6.3 L19.4 4.6" />
              </g>
            </svg>
          </span>
          <span className="mt-0.5 flex justify-between px-9 text-xs text-ink-2">
            <span>cold</span>
            <span>hot</span>
          </span>
        </label>
        <label className="block">
          <span className="flex items-baseline justify-between gap-2">
            <span className="font-display text-lg font-semibold text-ink">Rain</span>
            <span className="text-sm font-semibold text-ink-2">{x(p)}</span>
          </span>
          <span className="mt-1 flex items-center gap-2">
            <svg viewBox="0 0 24 24" className="h-7 w-7 shrink-0" aria-hidden="true">
              <path
                d="M12 3 C9 8 6.5 11 6.5 14.5 A5.5 5.5 0 0 0 17.5 14.5 C17.5 11 15 8 12 3 Z"
                fill="none"
                stroke="#b58755"
                strokeWidth={2}
                strokeLinejoin="round"
              />
            </svg>
            <input
              type="range"
              min={0}
              max={100}
              step={1}
              value={p}
              onChange={(e) => b(Number(e.target.value))}
              aria-label="Rain, from dry to wet"
              aria-valuetext={x(p)}
              className="bd-range"
              style={{
                "--track": "linear-gradient(90deg, #e7c890 0%, #b9cfa0 40%, #7fb2d9 70%, #2c6fb5 100%)",
                "--thumb": d("#b58755", "#2c6fb5", g),
              }}
            />
            <svg viewBox="0 0 24 24" className="h-7 w-7 shrink-0" aria-hidden="true">
              <path d="M7 13 A4 4 0 0 1 7.5 5 A5.5 5.5 0 0 1 18 6.5 A3.3 3.3 0 0 1 17.5 13 Z" fill="#7f9bb8" />
              <g stroke="#2c6fb5" strokeWidth={2} strokeLinecap="round">
                <path d="M8 16 L7 19 M12.5 16 L11.5 19.5 M17 16 L16 19" />
              </g>
            </svg>
          </span>
          <span className="mt-0.5 flex justify-between px-9 text-xs text-ink-2">
            <span>dry</span>
            <span>wet</span>
          </span>
        </label>
      </div>
      <p className="text-sm leading-snug text-ink-2">
        <span className="font-semibold text-ink">Warmth and rain decide what can live in a place.</span>
        {" They decide which plants can grow, and the plants decide which animals can live there."}
      </p>
      <I
        two="Brrr, cold! Now make it hot. Now make it rain!"
        four="Cold and dry makes tundra. Can you make a desert? Who lives there?"
        six="Why can't a cactus grow in the rainforest, or a moose live in the desert? Warmth and rain decide what can live in a place."
        outside="Put a cup outside to catch the rain this week, and look at the thermometer each morning. Is your place warm or cool, wet or dry?"
      />
    </div>
  );
};
