"use client";
/* eslint-disable @typescript-eslint/no-unused-expressions, react-hooks/immutability -- restored from the minified bundle: refs keep their one-letter names and statements keep the compiler's comma and && form. */
// Restored from client module 72883 (exports: FoodWeb)
import * as s from "react";
let r = [
    {
      id: "wolf",
      name: "Grey wolf",
      tag: "Wolf",
      many: "wolves",
      x: 150,
      y: 70,
      fact: "Wolves live and hunt together in family groups called packs.",
    },
    {
      id: "fox",
      name: "Red fox",
      tag: "Fox",
      many: "foxes",
      x: 400,
      y: 70,
      fact: "A fox can hear a mouse under the snow — then it jumps and pounces! It eats berries, too.",
    },
    {
      id: "owl",
      name: "Great horned owl",
      tag: "Owl",
      many: "owls",
      x: 650,
      y: 70,
      fact: "It hunts at night. Soft, fluffy feathers make its flight almost silent.",
    },
    {
      id: "deer",
      name: "White-tailed deer",
      tag: "Deer",
      many: "deer",
      x: 150,
      y: 246,
      fact: "It flashes its white tail when it runs. It eats grass, leaves and twigs.",
    },
    {
      id: "hare",
      name: "Snowshoe hare",
      tag: "Hare",
      many: "hares",
      x: 400,
      y: 246,
      fact: "Its big furry back feet work like snowshoes, and its coat turns white for winter.",
    },
    {
      id: "mouse",
      name: "Deer mouse",
      tag: "Mouse",
      many: "mice",
      x: 650,
      y: 246,
      fact: "Tiny, with big eyes and big ears. It eats seeds, berries and bugs.",
    },
    {
      id: "saplings",
      name: "Young trees",
      tag: "Young trees",
      many: "young trees",
      x: 150,
      y: 422,
      fact: "Young trees make food from sunlight. If deer and hares don't nibble them first, they grow into a forest.",
    },
    {
      id: "grass",
      name: "Grass & wildflowers",
      tag: "Grass",
      many: "grass & wildflowers",
      x: 400,
      y: 422,
      fact: "Grass and wildflowers make their own food from sunlight. Deer and hares munch them.",
    },
    {
      id: "berries",
      name: "Seeds & berries",
      tag: "Berries",
      many: "seeds & berries",
      x: 650,
      y: 422,
      fact: "Plants pack food into seeds and berries. Mice gather them up.",
    },
  ],
  l = Object.fromEntries(r.map((e) => [e.id, e])),
  a = ["grass", "saplings", "berries"],
  i = [
    ["grass", "hare"],
    ["grass", "deer"],
    ["saplings", "deer"],
    ["saplings", "hare"],
    ["berries", "mouse"],
    ["mouse", "fox"],
    ["mouse", "owl"],
    ["hare", "fox"],
    ["hare", "owl"],
    ["hare", "wolf"],
    ["deer", "wolf"],
  ],
  n = i.map(([e, t]) => {
    let s, r, a, i, n, o, c, d, x, f, h, p, u, j;
    return {
      a: e,
      b: t,
      ...((s = l[e]),
      (a = (r = l[t]).x - s.x),
      (n = Math.hypot(a, (i = r.y - s.y))),
      (o = a / n),
      (c = i / n),
      (d = s.x + 56 * o),
      (x = s.y + 56 * c),
      (f = 0.3 > Math.abs(o) ? 76 : 58),
      (h = r.x - o * f),
      (p = r.y - c * f),
      {
        line: {
          x1: d,
          y1: x,
          x2: (u = h - 16 * o),
          y2: (j = p - 16 * c),
        },
        head: `${h.toFixed(1)},${p.toFixed(1)} ${(u - 9 * c).toFixed(1)},${(j + 9 * o).toFixed(1)} ${(u + 9 * c).toFixed(1)},${(j - 9 * o).toFixed(1)}`,
      }),
    };
  }),
  o = (e) => (0 === e.length ? "" : 1 === e.length ? e[0] : `${e.slice(0, -1).join(", ")} and ${e[e.length - 1]}`),
  c = {
    grass: 0.6,
    saplings: 0.6,
    berries: 0.6,
    hare: 0.6,
    deer: 0.55,
    mouse: 0.6,
    fox: 0.55,
    wolf: 0.5,
    owl: 0.55,
  },
  d = {
    "wolf-out": {
      wolf: [0, 1],
      deer: [0, 5],
      saplings: [3, 8],
      grass: [5, 10],
    },
    "wolf-in": {
      wolf: [0, 2],
      deer: [1, 6],
      saplings: [4, 9],
      grass: [5, 10],
    },
    "mouse-out": {
      mouse: [0, 1],
      fox: [1, 6],
      owl: [1, 6],
      hare: [3, 8],
      berries: [5, 10],
    },
    "mouse-in": {
      mouse: [0, 2],
      fox: [1, 6],
      owl: [1, 6],
      hare: [3, 8],
      berries: [5, 10],
    },
  },
  x = {
    "wolf-out": {
      lines: [
        "The wolves are gone. Now nothing here hunts the deer…",
        "…so year by year there are more and more deer.",
        "Lots of hungry deer nibble the young trees before they can grow up.",
        "They munch the meadow down, too — thinner grass, fewer flowers.",
      ],
      end: "Something like this really happened in places like Yellowstone: with no wolves, elk (a big kind of deer) ate so many young trees that few could grow up. Try bringing the wolves back!",
    },
    "wolf-in": {
      lines: [
        "The wolves are back! They hunt deer again.",
        "With wolves around, the number of deer settles down.",
        "Now more young trees get the chance to grow up.",
        "The meadow fills back in with grass and flowers.",
      ],
      end: "In places like Yellowstone, wolves came back in 1995 — and in some places young trees began to grow again.",
    },
    "mouse-out": {
      lines: [
        "The mice are gone.",
        "Foxes and owls can't find mice to eat — they're hungry!",
        "They hunt the hares harder, and fewer foxes and owls can live here.",
        "With no mice to eat them, more seeds and berries are left over.",
      ],
      end: "Nobody even touched the foxes or the owls — but taking the mice away changed them too.",
    },
    "mouse-in": {
      lines: [
        "The mice are back!",
        "Foxes and owls have mice to eat again.",
        "They settle back down, and the hares get a rest.",
        "Mice nibble the seeds and berries again.",
      ],
      end: "Put one back, and the others change again. Everything is connected.",
    },
  },
  f = (e) => e * e * (3 - 2 * e);
function h(e, t) {
  if (!e) return c;
  let s = {
    ...e.to,
  };
  for (let l of r) {
    let [r, a] = d[e.action][l.id] ?? [0, 3],
      i = e.from[l.id],
      n = e.to[l.id];
    s[l.id] = t <= r ? i : t >= a ? n : i + (n - i) * f((t - r) / (a - r));
  }
  return s;
}
function CP_() {
  return (
    <g>
      <path d="M-34 46 C -36 22 -42 0 -50 -14 C -32 0 -26 22 -24 46 Z" fill="#5a9a3e" />
      <path d="M-22 46 C -22 12 -26 -16 -30 -36 C -14 -14 -10 16 -10 46 Z" fill="#72b04b" />
      <path d="M-8 46 C -6 10 -2 -20 4 -42 C 8 -18 6 14 4 46 Z" fill="#5a9a3e" />
      <path d="M16 46 C 20 20 30 -2 42 -18 C 34 2 28 24 26 46 Z" fill="#80bd57" />
      <path d="M-40 -18 L -40 -40" stroke="#4f8a3c" strokeWidth={3} />
      <g transform="translate(-40 -46)">
        {[0, 45, 90, 135, 180, 225, 270, 315].map((e) => (
          <ellipse key={e} cx={0} cy={-9} rx={4} ry={8} fill="#f2c14e" transform={`rotate(${e})`} />
        ))}
        <circle r={5.5} fill="#5c3a1e" />
      </g>
      <path d="M12 46 L 12 -30" stroke="#4f8a3c" strokeWidth={3} />
      <g transform="translate(12 -36)">
        {[0, 45, 90, 135, 180, 225, 270, 315].map((e) => (
          <ellipse key={e} cx={0} cy={-10} rx={4.5} ry={9} fill="#f2c14e" transform={`rotate(${e})`} />
        ))}
        <circle r={6} fill="#5c3a1e" />
      </g>
      <g transform="translate(40 4)">
        {[0, 72, 144, 216, 288].map((e) => (
          <ellipse key={e} cx={0} cy={-6} rx={4} ry={6} fill="#b9a0dc" transform={`rotate(${e})`} />
        ))}
        <circle r={3.5} fill="#f2c14e" />
      </g>
      <path d="M40 10 L 40 46" stroke="#4f8a3c" strokeWidth={3} />
    </g>
  );
}
function CU_() {
  return (
    <g>
      <ellipse cx={0} cy={48} rx={52} ry={6} fill="#6f8f4a" opacity={0.4} />
      {[
        {
          x: -30,
          h: 70,
          s: 0.85,
        },
        {
          x: 4,
          h: 92,
          s: 1,
        },
        {
          x: 36,
          h: 58,
          s: 0.75,
        },
      ].map((e) => (
        <g key={e.x} transform={`translate(${e.x} 46)`}>
          <line x1={0} y1={0} x2={0} y2={-e.h} stroke="#7a5132" strokeWidth={4} strokeLinecap="round" />
          <line x1={0} y1={-(0.5 * e.h)} x2={-12 * e.s} y2={-(0.66 * e.h)} stroke="#7a5132" strokeWidth={3} strokeLinecap="round" />
          <line x1={0} y1={-(0.62 * e.h)} x2={12 * e.s} y2={-(0.8 * e.h)} stroke="#7a5132" strokeWidth={3} strokeLinecap="round" />
          <ellipse cx={0} cy={-e.h - 6} rx={9 * e.s} ry={13 * e.s} fill="#5a9a45" />
          <ellipse
            cx={-14 * e.s}
            cy={-(0.7 * e.h)}
            rx={8 * e.s}
            ry={11 * e.s}
            fill="#6dae55"
            transform={`rotate(-40 ${-14 * e.s} ${-(0.7 * e.h)})`}
          />
          <ellipse
            cx={14 * e.s}
            cy={-(0.84 * e.h)}
            rx={8 * e.s}
            ry={11 * e.s}
            fill="#6dae55"
            transform={`rotate(40 ${14 * e.s} ${-(0.84 * e.h)})`}
          />
        </g>
      ))}
    </g>
  );
}
function CJ_() {
  return (
    <g>
      <path d="M-50 -30 C -30 -26 -14 -16 -4 -4 C 4 6 20 -6 44 -30" stroke="#6b4a2c" strokeWidth={4} fill="none" strokeLinecap="round" />
      <ellipse cx={-30} cy={-38} rx={9} ry={16} fill="#5a9a45" transform="rotate(-60 -30 -38)" />
      <ellipse cx={32} cy={-36} rx={9} ry={16} fill="#6dae55" transform="rotate(50 32 -36)" />
      <ellipse cx={-24} cy={-14} rx={8} ry={14} fill="#6dae55" transform="rotate(-110 -24 -14)" />
      {[
        [-6, 4],
        [10, 0],
        [2, 18],
        [20, 14],
        [-14, 20],
        [12, 30],
      ].map(([e, s]) => (
        <g key={`${e},${s}`} transform={`translate(${e} ${s})`}>
          <circle r={10} fill="#3f5fa8" />
          <circle cx={-3} cy={-3} r={3.5} fill="#8aa3d8" />
          <path d="M-2 -9 L 2 -9 M 0 -11 L 0 -7" stroke="#26396b" strokeWidth={1.8} strokeLinecap="round" />
        </g>
      ))}
      <g fill="#c9a56a">
        <ellipse cx={-36} cy={40} rx={6} ry={3.5} transform="rotate(20 -36 40)" />
        <ellipse cx={-24} cy={44} rx={6} ry={3.5} transform="rotate(-15 -24 44)" />
        <ellipse cx={34} cy={42} rx={6} ry={3.5} transform="rotate(30 34 42)" />
      </g>
    </g>
  );
}
function CY_() {
  return (
    <g>
      <ellipse cx={0} cy={44} rx={44} ry={5} fill="#1f2a22" opacity={0.1} />
      <circle cx={-38} cy={16} r={9} fill="#efe6d6" />
      <path d="M-38 30 C -46 6 -32 -16 -6 -16 C 16 -16 28 0 28 20 C 28 34 18 40 0 40 L -28 40 C -36 40 -38 36 -38 30 Z" fill="#9a7a55" />
      <ellipse cx={14} cy={22} rx={11} ry={14} fill="#e9dcc4" />
      <ellipse cx={-10} cy={40} rx={28} ry={6} fill="#efe6d6" />
      <path d="M12 -24 C 6 -48 8 -62 16 -62 C 22 -62 23 -48 21 -26 Z" fill="#8a6a48" />
      <path d="M8 -50 C 8 -58 11 -62 16 -62 C 21 -62 22 -57 22 -50 Z" fill="#2a2a2a" />
      <path d="M20 -24 C 20 -50 28 -62 35 -60 C 40 -58 36 -44 28 -24 Z" fill="#9a7a55" />
      <path d="M25 -48 C 28 -58 33 -61 36 -59 C 39 -57 38 -52 35 -46 Z" fill="#2a2a2a" />
      <path d="M24 -30 C 26 -44 30 -52 33 -54" stroke="#d9a58a" strokeWidth={3} fill="none" strokeLinecap="round" />
      <ellipse cx={26} cy={-14} rx={17} ry={14} fill="#9a7a55" />
      <ellipse cx={34} cy={-8} rx={8} ry={6} fill="#b8987a" />
      <circle cx={30} cy={-17} r={3.8} fill="#1f2a22" />
      <circle cx={29} cy={-18.5} r={1.2} fill="#fffdf4" />
      <circle cx={42} cy={-10} r={2.6} fill="#6a4a3a" />
      <ellipse cx={24} cy={39} rx={8} ry={4} fill="#efe6d6" />
    </g>
  );
}
function CM_() {
  return (
    <g>
      <ellipse cx={0} cy={46} rx={46} ry={5} fill="#1f2a22" opacity={0.1} />
      <path d="M-26 6 L -28 44 M -16 8 L -14 44 M 20 8 L 18 44 M 28 6 L 31 44" stroke="#9a6a3e" strokeWidth={5} strokeLinecap="round" />
      <path d="M-30 44 L -25 44 M -16 44 L -11 44 M 16 44 L 21 44 M 29 44 L 34 44" stroke="#3a2a1c" strokeWidth={5} strokeLinecap="round" />
      <path d="M-32 -6 C -44 -18 -46 -30 -40 -32 C -34 -28 -29 -18 -28 -8 Z" fill="#fffaf0" />
      <path d="M-40 -32 C -36 -30 -32 -24 -30 -16" stroke="#b07a4a" strokeWidth={3} fill="none" strokeLinecap="round" />
      <ellipse cx={0} cy={0} rx={36} ry={16} fill="#b07a4a" />
      <path d="M-24 8 C -10 17 10 17 24 8 C 10 12 -10 12 -24 8 Z" fill="#f1e2c8" />
      <path d="M-26 -10 C -10 -16 10 -16 24 -12" stroke="#c28d5b" strokeWidth={5} fill="none" strokeLinecap="round" />
      <path d="M18 -8 C 22 -24 28 -34 36 -40 L 46 -30 C 40 -22 34 -12 32 2 Z" fill="#b07a4a" />
      <ellipse cx={38} cy={-24} rx={5} ry={6} fill="#fffaf0" />
      <path
        d="M44 -46 C 44 -58 50 -64 58 -64 M 49 -56 L 54 -64 M 40 -46 C 35 -56 37 -63 43 -67"
        stroke="#e2d2b0"
        strokeWidth={3.5}
        fill="none"
        strokeLinecap="round"
      />
      <ellipse cx={34} cy={-46} rx={4} ry={9} fill="#9a6a3e" transform="rotate(-50 34 -46)" />
      <ellipse cx={46} cy={-38} rx={11} ry={8.5} fill="#b07a4a" transform="rotate(20 46 -38)" />
      <path d="M48 -44 L 62 -32 L 50 -29 Z" fill="#b07a4a" />
      <circle cx={61} cy={-32} r={3} fill="#2a1f18" />
      <circle cx={48} cy={-40} r={2.6} fill="#2a1f18" />
    </g>
  );
}
function CG_() {
  return (
    <g>
      <ellipse cx={0} cy={28} rx={46} ry={5} fill="#1f2a22" opacity={0.1} />
      <path d="M-30 14 C -46 20 -56 8 -60 -8" stroke="#8c6f52" strokeWidth={3.5} fill="none" strokeLinecap="round" />
      <path
        d="M-34 16 C -36 -6 -18 -22 4 -22 C 24 -22 36 -10 42 2 L 50 7 C 46 14 36 20 24 20 L -24 22 C -32 22 -34 20 -34 16 Z"
        fill="#9b7c5c"
      />
      <path d="M-30 18 C -10 26 18 26 42 10 C 24 16 0 17 -30 18 Z" fill="#f5efe4" />
      <circle cx={12} cy={-22} r={12} fill="#b89478" />
      <circle cx={12} cy={-22} r={7.5} fill="#e2b8a6" />
      <circle cx={28} cy={-6} r={5} fill="#1f1a14" />
      <circle cx={26.5} cy={-7.5} r={1.6} fill="#fffdf4" />
      <circle cx={50} cy={7} r={3} fill="#d98a8a" />
      <path d="M44 8 L 58 4 M 44 10 L 58 12" stroke="#6b5a4a" strokeWidth={1.2} strokeLinecap="round" />
      <ellipse cx={-14} cy={24} rx={7} ry={3} fill="#e2b8a6" />
      <ellipse cx={24} cy={22} rx={6} ry={3} fill="#e2b8a6" />
    </g>
  );
}
function CK_() {
  return (
    <g>
      <ellipse cx={-4} cy={38} rx={52} ry={5} fill="#1f2a22" opacity={0.1} />
      <path d="M-28 -6 C -48 -12 -66 0 -64 16 C -62 28 -48 30 -38 22 C -32 16 -28 8 -24 4 Z" fill="#d9692b" />
      <path d="M-64 16 C -63 26 -52 30 -44 25 C -52 23 -58 19 -64 16 Z" fill="#fff8ee" />
      <path d="M-20 8 L -22 34 M -10 10 L -8 34 M 16 10 L 14 34 M 25 8 L 28 34" stroke="#3a2a1c" strokeWidth={6} strokeLinecap="round" />
      <ellipse cx={0} cy={0} rx={32} ry={15} fill="#d9692b" />
      <path d="M-24 -8 C -8 -14 12 -14 24 -10" stroke="#e98a4d" strokeWidth={5} fill="none" strokeLinecap="round" />
      <path d="M20 -6 C 30 0 30 12 21 14 C 17 8 16 0 20 -6 Z" fill="#fff8ee" />
      <path d="M16 -6 C 20 -18 28 -28 38 -28 L 44 -16 Z" fill="#d9692b" />
      <path d="M29 -31 L 31 -48 L 40 -33 Z" fill="#3a2a1c" />
      <path d="M36 -32 L 43 -48 L 47 -30 Z" fill="#d9692b" />
      <path d="M39 -33 L 43 -43 L 45 -32 Z" fill="#3a2a1c" />
      <ellipse cx={38} cy={-22} rx={13} ry={11} fill="#d9692b" />
      <path d="M44 -27 L 63 -19 L 44 -13 Z" fill="#d9692b" />
      <path d="M34 -16 L 62 -18 L 47 -10 C 42 -10 37 -12 34 -16 Z" fill="#fff8ee" />
      <circle cx={63} cy={-19} r={3.2} fill="#2a1f18" />
      <circle cx={44} cy={-24} r={2.6} fill="#2a1f18" />
    </g>
  );
}
function CB_() {
  return (
    <g>
      <ellipse cx={-2} cy={44} rx={54} ry={5} fill="#1f2a22" opacity={0.1} />
      <path d="M-32 -4 C -46 0 -54 14 -54 32 C -46 32 -40 20 -32 8 Z" fill="#80868a" />
      <path d="M-54 32 C -54 26 -52 22 -50 20 C -48 24 -48 28 -50 32 Z" fill="#3a3d3f" />
      <path d="M-24 6 L -26 42 M -14 8 L -12 42 M 20 8 L 18 42 M 28 6 L 31 42" stroke="#80868a" strokeWidth={7} strokeLinecap="round" />
      <ellipse cx={0} cy={0} rx={36} ry={17} fill="#9ca1a4" />
      <path d="M-28 -10 C -12 -19 12 -19 26 -11 C 12 -8 -12 -8 -28 -10 Z" fill="#6b7073" />
      <path d="M-22 10 C -8 17 12 17 24 8 C 10 12 -8 12 -22 10 Z" fill="#dedad2" />
      <path d="M16 -10 C 20 -24 30 -32 40 -30 L 46 -12 C 38 -2 26 6 16 4 Z" fill="#b0b4b6" />
      <path d="M31 -34 L 33 -50 L 41 -36 Z" fill="#6b7073" />
      <path d="M38 -35 L 44 -50 L 48 -33 Z" fill="#80868a" />
      <ellipse cx={40} cy={-25} rx={13} ry={11} fill="#9ca1a4" />
      <path d="M46 -30 L 67 -22 L 64 -15 L 46 -14 Z" fill="#c4c7c8" />
      <path d="M36 -18 C 44 -12 56 -12 64 -15 L 46 -14 Z" fill="#e6e3dc" />
      <circle cx={67} cy={-22} r={3.2} fill="#2a2a2a" />
      <circle cx={45} cy={-28} r={2.8} fill="#d9a441" />
      <circle cx={45.5} cy={-28} r={1.4} fill="#1f1a14" />
    </g>
  );
}
function CW_() {
  return (
    <g>
      <path d="M-50 54 L 50 54" stroke="#7a5132" strokeWidth={7} strokeLinecap="round" />
      <path d="M-34 0 C -42 22 -36 46 -20 52 C -26 32 -28 12 -34 0 Z" fill="#6f5439" />
      <path d="M34 0 C 42 22 36 46 20 52 C 26 32 28 12 34 0 Z" fill="#6f5439" />
      <ellipse cx={0} cy={14} rx={33} ry={39} fill="#8b6d4c" />
      <ellipse cx={0} cy={24} rx={21} ry={25} fill="#e8dcc6" />
      <g stroke="#8b6d4c" strokeWidth={2.5} strokeLinecap="round">
        <path d="M-14 12 L -6 12 M 4 12 L 12 12" />
        <path d="M-16 22 L -8 22 M 0 22 L 8 22 M 12 22 L 16 22" />
        <path d="M-14 32 L -6 32 M 4 32 L 12 32" />
        <path d="M-8 42 L 0 42 M 6 42 L 10 42" />
      </g>
      <path d="M-24 -38 L -32 -62 L -12 -46 Z" fill="#6f5439" />
      <path d="M24 -38 L 32 -62 L 12 -46 Z" fill="#6f5439" />
      <ellipse cx={0} cy={-24} rx={31} ry={25} fill="#8b6d4c" />
      <ellipse cx={-13} cy={-24} rx={14} ry={13} fill="#c9874a" />
      <ellipse cx={13} cy={-24} rx={14} ry={13} fill="#c9874a" />
      <path d="M-14 -4 Q 0 4 14 -4 Q 0 0 -14 -4 Z" fill="#fffaf0" stroke="#fffaf0" strokeWidth={4} strokeLinejoin="round" />
      <circle cx={-13} cy={-25} r={8.5} fill="#f2c14e" />
      <circle cx={13} cy={-25} r={8.5} fill="#f2c14e" />
      <circle cx={-13} cy={-25} r={4.6} fill="#1f1408" />
      <circle cx={13} cy={-25} r={4.6} fill="#1f1408" />
      <circle cx={-15} cy={-27} r={1.5} fill="#fffdf4" />
      <circle cx={11} cy={-27} r={1.5} fill="#fffdf4" />
      <path d="M-24 -38 C -14 -34 -6 -34 0 -30 C 6 -34 14 -34 24 -38" stroke="#5a4330" strokeWidth={3} fill="none" strokeLinecap="round" />
      <path d="M-4 -18 L 4 -18 L 0 -8 Z" fill="#3a3025" />
      <path d="M-12 52 L -14 58 M -8 52 L -8 58 M 8 52 L 8 58 M 12 52 L 14 58" stroke="#d9a441" strokeWidth={3.5} strokeLinecap="round" />
    </g>
  );
}
function M({ id: e }) {
  switch (e) {
    case "grass":
      return <CP_ />;
    case "saplings":
      return <CU_ />;
    case "berries":
      return <CJ_ />;
    case "hare":
      return <CY_ />;
    case "deer":
      return <CM_ />;
    case "mouse":
      return <CG_ />;
    case "fox":
      return <CK_ />;
    case "wolf":
      return <CB_ />;
    case "owl":
      return <CW_ />;
  }
}
function L({ level: e }) {
  let s =
    e >= 0.82 ? (
      <path d="M-7 2 Q 0 13 7 2 Z" fill="#1f2a22" stroke="#1f2a22" strokeWidth={1.5} strokeLinejoin="round" />
    ) : e >= 0.36 ? (
      <path d="M-6 3 Q 0 9 6 3" stroke="#1f2a22" strokeWidth={2.4} fill="none" strokeLinecap="round" />
    ) : (
      <path d="M-6 8 Q 0 2 6 8" stroke="#1f2a22" strokeWidth={2.4} fill="none" strokeLinecap="round" />
    );
  return (
    <g>
      <circle r={16} fill={e < 0.36 ? "#fde3d8" : e >= 0.82 ? "#fdf0c8" : "#fffaf0"} stroke="#d9cfb8" strokeWidth={2.5} />
      <circle cx={-5} cy={-4} r={2.2} fill="#1f2a22" />
      <circle cx={5} cy={-4} r={2.2} fill="#1f2a22" />
      {s}
    </g>
  );
}
function $() {
  return (
    <g>
      <rect width={800} height={500} fill="#e4eff1" />
      <g fill="#bcd3b0">
        {[20, 70, 120, 180, 250, 330, 470, 540, 600, 660, 720, 780].map((e, s) => (
          <path key={e} d={`M${e} ${150 + (s % 3) * 10} L ${e + 26} 230 L ${e - 26} 230 Z`} />
        ))}
      </g>
      <path d="M0 214 C 160 200 320 220 480 210 C 620 202 720 214 800 208 L800 500 L0 500 Z" fill="#d5e5bf" />
      <path d="M0 340 C 180 330 360 346 540 336 C 660 330 740 338 800 334 L800 500 L0 500 Z" fill="#c9ddae" />
    </g>
  );
}
let v = `
.eco1fw-node { cursor: pointer; outline: none; }
.eco1fw-focus { opacity: 0; }
.eco1fw-node:focus-visible .eco1fw-focus { opacity: 1; }
.eco1fw-bar { transform-box: fill-box; transform-origin: center bottom; transition: transform 520ms linear; }
.eco1fw-fade { transition: opacity .35s ease; }
@media (prefers-reduced-motion: no-preference) {
  .eco1fw-march { animation: eco1fw-march 1s linear infinite; }
  .eco1fw-pop { transform-box: fill-box; transform-origin: center; animation: eco1fw-pop .4s ease-out both; }
}
@media (prefers-reduced-motion: reduce) {
  .eco1fw-bar { transition: none; }
}
@keyframes eco1fw-march { to { stroke-dashoffset: -30 } }
@keyframes eco1fw-pop { 0% { transform: scale(.4); opacity: 0 } 70% { transform: scale(1.15); opacity: 1 } 100% { transform: scale(1) } }
`,
  C = "#2f7d3a",
  W = "#c8352b";
function N({ two: e, four: s, six: r, outside: l }) {
  return (
    <div className="rounded-2xl border border-line bg-paper-2 p-4">
      <p className="font-display text-lg font-semibold text-ink">Say it like this</p>
      <ul className="mt-2 grid gap-1.5 text-sm text-ink">
        {[
          {
            age: "Age 2",
            text: e,
          },
          {
            age: "Age 4",
            text: s,
          },
          {
            age: "Age 6",
            text: r,
          },
        ].map((e) => (
          <li key={e.age} className="flex gap-2">
            <span className="w-12 shrink-0 font-semibold text-moss">{e.age}</span>
            <span>{e.text}</span>
          </li>
        ))}
      </ul>
      <p className="mt-3 border-t border-line pt-3 text-sm text-ink">
        <span className="font-semibold text-rust">{"Go outside: "}</span>
        {l}
      </p>
    </div>
  );
}
export const FoodWeb = function () {
  let [e, f] = (0, s.useState)("explore"),
    [p, u] = (0, s.useState)(null),
    [j, y] = (0, s.useState)({
      wolf: false,
      mouse: false,
    }),
    [m, g] = (0, s.useState)(null),
    [k, b] = (0, s.useState)(0),
    [w, Z] = (0, s.useState)(false),
    [A, T] = (0, s.useState)(null),
    S = (0, s.useRef)([]);
  function D() {
    (S.current.forEach((e) => window.clearTimeout(e)), (S.current.length = 0));
  }
  (0, s.useEffect)(() => {
    let e = S.current;
    return () => {
      e.forEach((e) => window.clearTimeout(e));
    };
  }, []);
  let Q = h(m, k);
  function I(e) {
    let t;
    if (w) return;
    D();
    let s = h(m, k),
      r = e.startsWith("wolf") ? "wolf" : "mouse",
      l = {
        ...j,
        [r]: e.endsWith("out"),
      };
    (y(l),
      g({
        from: s,
        to:
          ((t = {
            ...c,
          }),
          l.wolf && ((t.wolf = 0), (t.deer = 0.95), (t.saplings = 0.15), (t.grass = 0.3)),
          l.mouse && ((t.mouse = 0), (t.fox = 0.28), (t.owl = 0.28), (t.hare = Math.max(0, t.hare - 0.16)), (t.berries = 0.88)),
          t),
        action: e,
      }),
      b(0),
      Z(true),
      T(null));
    for (let e = 1; e <= 10; e++) S.current.push(window.setTimeout(() => b(e), 520 * e));
    S.current.push(window.setTimeout(() => Z(false), 5280));
  }
  function F() {
    (D(),
      y({
        wolf: false,
        mouse: false,
      }),
      g(null),
      b(0),
      Z(false),
      T(null));
  }
  function G(t) {
    "explore" === e
      ? u((e) => (e === t ? null : t))
      : w ||
        ("wolf" === t
          ? I(j.wolf ? "wolf-in" : "wolf-out")
          : "mouse" === t
            ? I(j.mouse ? "mouse-in" : "mouse-out")
            : T(`Try taking away the wolves or the mice — then watch what happens to the ${l[t].many}.`));
  }
  let P = p ? l[p] : null,
    q = p ? i.filter(([, e]) => e === p).map(([e]) => l[e].many) : [],
    E = p ? i.filter(([e]) => e === p).map(([, e]) => l[e].many) : [],
    O = new Set(p ? [p, ...i.filter(([e, t]) => e === p || t === p).flat()] : []),
    B = (e) => ("wolf" === e && j.wolf) || ("mouse" === e && j.mouse),
    X = k <= 2 ? 0 : k <= 5 ? 1 : k <= 8 ? 2 : 3,
    z = m ? x[m.action] : null,
    R = z ? (w ? z.lines[X] : z.end) : "Take the wolves or the mice away, then watch ten years go by.";
  return (
    <div className="grid gap-4">
      <style>{v}</style>
      <div className="flex flex-wrap gap-2" role="group" aria-label="What to do">
        {[
          ["explore", "Who eats who?"],
          ["away", "Take one away"],
        ].map(([s, r]) => (
          <button
            key={s}
            type="button"
            aria-pressed={e === s}
            onClick={() => {
              s !== e && (F(), u(null), f(s));
            }}
            className={`min-h-11 rounded-full px-4 py-2 font-semibold transition active:scale-95 ${e === s ? "bg-moss text-white" : "border border-line bg-white text-ink-2 hover:border-moss/50"}`}
          >
            {r}
          </button>
        ))}
      </div>
      <svg
        viewBox="0 0 800 500"
        className="h-auto w-full touch-manipulation select-none rounded-2xl border border-line"
        role="group"
        aria-label="A northern forest-edge food web"
      >
        <g
          role="img"
          aria-label="Food web. Plants along the bottom: young trees, grass and wildflowers, seeds and berries. Plant-eaters in the middle: white-tailed deer, snowshoe hare, deer mouse. Hunters on top: grey wolf, red fox, great horned owl. Arrows point from the one that gets eaten to the one that eats it."
        >
          <$ />
        </g>
        <g aria-hidden="true">
          {n.map((s) => {
            let r = "explore" === e && p ? (s.b === p ? "eats" : s.a === p ? "eaten" : "off") : "plain",
              l = "away" === e && (B(s.a) || B(s.b)),
              a = "eats" === r ? C : "eaten" === r ? W : "#7d6e55",
              i = "eats" === r || "eaten" === r;
            return (
              <g key={`${s.a}-${s.b}`} className="eco1fw-fade" opacity={"off" === r ? 0.14 : l ? 0.28 : i ? 1 : 0.7}>
                <line {...s.line} stroke="#fffdf8" strokeWidth={i ? 12 : 8} strokeLinecap="round" opacity={0.8} />
                <line
                  {...s.line}
                  stroke={a}
                  strokeWidth={i ? 6 : 4}
                  strokeLinecap="round"
                  strokeDasharray={i ? "12 6" : l ? "6 8" : undefined}
                  className={i ? "eco1fw-march" : undefined}
                />
                <polygon points={s.head} fill={a} stroke="#fffdf8" strokeWidth={2} strokeLinejoin="round" />
              </g>
            );
          })}
        </g>
        {r.map((s) => {
          let r = Q[s.id],
            l = B(s.id),
            i = "explore" === e && null !== p && !O.has(s.id),
            n = "explore" === e && p === s.id,
            o = "explore" === e || "wolf" === s.id || "mouse" === s.id,
            c = m && !l ? m.to[s.id] - m.from[s.id] : 0,
            [x] = m ? (d[m.action][s.id] ?? [0, 3]) : [0],
            f = null !== m && Math.abs(c) > 0.08 && k > x,
            h =
              "explore" === e
                ? `${s.name}${n ? ", selected" : ""}`
                : "wolf" === s.id
                  ? j.wolf
                    ? "Bring the wolves back"
                    : "Take the wolves away"
                  : "mouse" === s.id
                    ? j.mouse
                      ? "Bring the mice back"
                      : "Take the mice away"
                    : `${s.name}: ${Math.round(10 * r)} out of 10`;
          return (
            <g
              key={s.id}
              role="button"
              tabIndex={0}
              aria-label={h}
              aria-disabled={("away" === e && (!!w || !o)) || undefined}
              className="eco1fw-node"
              onClick={() => G(s.id)}
              onKeyDown={(e) => {
                var t;
                return ((t = () => G(s.id)), void (("Enter" === e.key || " " === e.key) && (e.preventDefault(), t())));
              }}
            >
              <g className="eco1fw-fade" opacity={i ? 0.38 : l ? 0.35 : 1}>
                <circle cx={s.x} cy={s.y} r={54} fill="#1f2a22" opacity={0.08} transform="translate(0 4)" />
                <circle
                  cx={s.x}
                  cy={s.y}
                  r={50}
                  fill={a.includes(s.id) ? "#f7fbef" : "#fffaf0"}
                  stroke={n ? "#d9a441" : l ? "#9a8f7a" : "#d9cfb8"}
                  strokeWidth={n ? 6 : 3}
                  strokeDasharray={l ? "8 7" : undefined}
                />
                <g transform={`translate(${s.x} ${s.y - 2}) scale(0.68)`}>
                  <M id={s.id} />
                </g>
                <g transform={`translate(${s.x} ${s.y + 50 + 4})`}>
                  <rect
                    x={-(11 * s.tag.length + 28) / 2}
                    y={-15}
                    width={11 * s.tag.length + 28}
                    height={30}
                    rx={15}
                    fill="#fffdf8"
                    stroke={n ? "#d9a441" : "#d9cfb8"}
                    strokeWidth={n ? 3 : 2}
                  />
                  <text y={7} textAnchor="middle" fontSize={20} fontWeight={700} fill="#1f2a22">
                    {s.tag}
                  </text>
                </g>
              </g>
              <circle
                className="eco1fw-focus"
                cx={s.x}
                cy={s.y}
                r={59}
                fill="none"
                stroke="#2c6fb5"
                strokeWidth={4}
                strokeDasharray="9 7"
              />
              {"away" === e ? (
                <g aria-hidden="true">
                  {l ? (
                    <g transform={`translate(${s.x} ${s.y})`}>
                      <g className="eco1fw-pop">
                        <rect x={-34} y={-15} width={68} height={30} rx={15} fill="#5d6f7c" />
                        <text y={7} textAnchor="middle" fontSize={18} fontWeight={700} fill="#fffdf8">
                          gone
                        </text>
                      </g>
                    </g>
                  ) : (
                    <g transform={`translate(${s.x - 50 + 10} ${s.y - 50 + 10})`}>
                      <L level={r} />
                    </g>
                  )}
                  <rect x={s.x + 50 + 10} y={s.y - 44} width={20} height={88} rx={7} fill="#fffdf8" stroke="#d9cfb8" strokeWidth={2} />
                  <rect
                    className="eco1fw-bar"
                    x={s.x + 50 + 13}
                    y={s.y - 41}
                    width={14}
                    height={82}
                    rx={5}
                    fill={r < 0.36 ? "#d97a4a" : r >= 0.82 ? "#d9a441" : "#5b9a45"}
                    style={{
                      transform: `scaleY(${Math.max(0.001, r).toFixed(3)})`,
                    }}
                  />
                  {f ? (
                    <path
                      d={c > 0 ? `M${s.x + 50 + 20} ${s.y - 64} l 10 12 h -20 z` : `M${s.x + 50 + 20} ${s.y - 50} l 10 -12 h -20 z`}
                      fill={c > 0 ? "#d9a441" : "#2c6fb5"}
                    />
                  ) : null}
                </g>
              ) : null}
            </g>
          );
        })}
      </svg>
      {"explore" === e ? (
        <>
          <div aria-live="polite" className="min-h-[6.5rem] rounded-2xl bg-paper-2 px-4 py-3 text-ink">
            {P ? (
              <>
                <p className="font-display text-lg font-semibold">{P.name}</p>
                <p className="mt-0.5 text-sm">{P.fact}</p>
                <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm">
                  <span className="flex items-center gap-1.5">
                    <span
                      className="inline-block h-1.5 w-6 rounded-full"
                      style={{
                        background: C,
                      }}
                    />
                    <span>
                      <span className="font-semibold">Eats:</span> {q.length ? o(q) : "nothing — it makes its own food from sunlight"}
                    </span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span
                      className="inline-block h-1.5 w-6 rounded-full"
                      style={{
                        background: W,
                      }}
                    />
                    <span>
                      <span className="font-semibold">Eaten by:</span> {E.length ? o(E) : "nothing here"}
                    </span>
                  </span>
                </p>
              </>
            ) : (
              <p className="text-base">
                {"Tap a plant or an animal. "}
                <span
                  style={{
                    color: C,
                  }}
                  className="font-semibold"
                >
                  Green arrows
                </span>
                {" show what it eats; "}
                <span
                  style={{
                    color: W,
                  }}
                  className="font-semibold"
                >
                  red arrows
                </span>
                {" show what eats it."}
              </p>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {r.map((e) => (
              <button
                key={e.id}
                type="button"
                aria-pressed={p === e.id}
                onClick={() => G(e.id)}
                className={`flex min-h-11 items-center gap-1.5 rounded-full border-2 py-1 pl-1.5 pr-3 text-sm font-semibold transition active:scale-95 ${p === e.id ? "border-gold bg-[#fbf1da] text-ink" : "border-line bg-white text-ink-2 hover:border-moss/50"}`}
              >
                <svg viewBox="-64 -64 128 128" className="h-7 w-7" aria-hidden="true" focusable="false">
                  <M id={e.id} />
                </svg>
                {e.name}
              </button>
            ))}
          </div>
          <p className="text-sm text-ink-2">
            Lots of animals eat the same things, and most get eaten by more than one hunter. The lines cross and join like a web — that’s
            why it’s called a food web.
          </p>
        </>
      ) : (
        <>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              disabled={w}
              onClick={() => I(j.wolf ? "wolf-in" : "wolf-out")}
              className={`rounded-full px-4 py-2 font-semibold transition active:scale-95 disabled:opacity-50 ${j.wolf ? "border-2 border-moss bg-white text-moss" : "bg-moss text-white"}`}
            >
              {j.wolf ? "Bring the wolves back" : "Take away the wolves"}
            </button>
            <button
              type="button"
              disabled={w}
              onClick={() => I(j.mouse ? "mouse-in" : "mouse-out")}
              className={`rounded-full px-4 py-2 font-semibold transition active:scale-95 disabled:opacity-50 ${j.mouse ? "border-2 border-moss bg-white text-moss" : "bg-moss text-white"}`}
            >
              {j.mouse ? "Bring the mice back" : "Take away the mice"}
            </button>
            <button
              type="button"
              onClick={F}
              className="rounded-full border border-line bg-white px-4 py-2 font-semibold text-ink-2 transition active:scale-95"
            >
              Start over
            </button>
          </div>
          <div className="rounded-2xl bg-paper-2 px-4 py-3 text-ink">
            <div className="flex items-center gap-3">
              <span className="w-16 shrink-0 font-display text-lg font-semibold">{m ? `Year ${k}` : "Year 0"}</span>
              <span className="grid flex-1 grid-cols-10 gap-1" aria-hidden="true">
                {Array.from(
                  {
                    length: 10,
                  },
                  (e, s) => (
                    <span key={s} className={`h-2.5 rounded-full transition-colors ${m && s < k ? "bg-gold" : "bg-line"}`} />
                  ),
                )}
              </span>
            </div>
            <p aria-live="polite" className="mt-2 min-h-[3rem] text-base leading-snug">
              {A ?? R}
            </p>
          </div>
          <p className="rounded-2xl bg-moss px-4 py-3 font-semibold text-white">
            Everything is connected — take one away and the others change.
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-ink-2">
            <li className="flex items-center gap-2">
              <svg viewBox="0 0 20 30" className="h-6 w-4" aria-hidden="true">
                <rect x={1} y={1} width={18} height={28} rx={6} fill="#fffdf8" stroke="#d9cfb8" strokeWidth={2} />
                <rect x={4} y={12} width={12} height={15} rx={4} fill="#5b9a45" />
              </svg>
              Bar: how many there are
            </li>
            <li className="flex items-center gap-2">
              <svg viewBox="-18 -18 36 36" className="h-6 w-6" aria-hidden="true">
                <L level={0.2} />
              </svg>
              Faces: how they’re doing
            </li>
            <li className="flex items-center gap-2">
              <svg viewBox="0 0 24 16" className="h-4 w-6" aria-hidden="true">
                <path d="M6 14 l 6 -12 l 6 12 z" fill="#d9a441" />
              </svg>
              going up
              <svg viewBox="0 0 24 16" className="h-4 w-6" aria-hidden="true">
                <path d="M6 2 l 6 12 l 6 -12 z" fill="#2c6fb5" />
              </svg>
              going down
            </li>
          </ul>
          <p className="text-xs text-ink-2">
            A simple story model, not real counts — real ecosystems have many more members, and changes like these take many years.
          </p>
        </>
      )}
      <N
        two="“Owl eats mouse. Fox eats mouse too!” Trace an arrow with your finger from the mouse to the owl."
        four="“Lots of animals eat the same things — so it's not a line, it's a web.”"
        six="“Take one away and the others change: no wolves, more deer, fewer young trees.”"
        outside="Hunt for clues of who eats what near you: nibbled twigs, chewed pine cones, acorn shells, tracks in mud or snow."
      />
    </div>
  );
};
