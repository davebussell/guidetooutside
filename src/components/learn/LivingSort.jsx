"use client";
// Restored from client module 3613 (exports: LivingSort)
import * as t from "react/jsx-runtime";
import * as s from "react";
let r = [
    {
      id: "sun",
      label: "Sun",
      the: "the sun",
      kind: "nonliving",
      why: "Not living. The sun is a giant ball of hot, glowing gas. It gives light and warmth to everything here.",
      hint: "The sun gives us light — but does it eat? Does it grow or have babies?",
      at: {
        x: 92,
        y: 84,
        s: 1,
      },
      hit: {
        cx: 92,
        cy: 84,
        r: 60,
      },
      box: "-62 -62 124 124",
    },
    {
      id: "air",
      label: "Air (wind)",
      the: "the wind",
      kind: "nonliving",
      why: "Not living. Wind is moving air. Animals breathe it and plants use it, but air itself isn't alive.",
      hint: "You can feel the wind — but does air eat? Does it grow?",
      at: {
        x: 292,
        y: 88,
        s: 1,
      },
      hit: {
        cx: 292,
        cy: 86,
        r: 60,
      },
      box: "-62 -62 124 124",
    },
    {
      id: "maple",
      label: "Maple tree",
      the: "the maple tree",
      kind: "living",
      why: "Living! A maple grows from a little winged seed — a “helicopter” — into a big tree.",
      hint: "Does a tree grow? Think how big it got from one little seed!",
      at: {
        x: 690,
        y: 178,
        s: 1.72,
      },
      hit: {
        cx: 690,
        cy: 170,
        r: 110,
      },
      box: "-70 -72 140 144",
    },
    {
      id: "dragonfly",
      label: "Dragonfly",
      the: "the dragonfly",
      kind: "living",
      why: "Living! A dragonfly catches little bugs in the air. It started life underwater, as a nymph.",
      hint: "Does a dragonfly eat? Yes — it catches bugs as it flies!",
      at: {
        x: 372,
        y: 206,
        s: 0.95,
      },
      hit: {
        cx: 372,
        cy: 206,
        r: 56,
      },
      box: "-62 -62 124 124",
    },
    {
      id: "cattails",
      label: "Cattails",
      the: "the cattails",
      kind: "living",
      why: "Living! Cattails are plants. They drink water, grow tall and make fluffy seeds.",
      hint: "Do cattails grow? Yes — tall and green, from tiny seeds. Plants make their own food from sunlight.",
      at: {
        x: 188,
        y: 300,
        s: 1.35,
      },
      hit: {
        cx: 188,
        cy: 300,
        r: 66,
      },
      box: "-62 -64 124 128",
    },
    {
      id: "heron",
      label: "Great blue heron",
      the: "the heron",
      kind: "living",
      why: "Living! A great blue heron stands very still, then snaps up fish and frogs.",
      hint: "Does a heron eat and grow? It gobbles fish and frogs!",
      at: {
        x: 548,
        y: 300,
        s: 1.3,
      },
      hit: {
        cx: 540,
        cy: 296,
        r: 72,
      },
      box: "-62 -66 124 130",
    },
    {
      id: "mushroom",
      label: "Mushroom",
      the: "the mushroom",
      kind: "living",
      why: "Living! A mushroom is part of a fungus. It grows, and it feeds on old leaves and wood.",
      hint: "Mushrooms are tricky! Do they grow? Yes — a mushroom is part of a fungus, and fungi are alive.",
      at: {
        x: 626,
        y: 314,
        s: 0.72,
      },
      hit: {
        cx: 626,
        cy: 312,
        r: 40,
      },
      box: "-50 -50 100 100",
    },
    {
      id: "water",
      label: "Water",
      the: "the water",
      kind: "nonliving",
      why: "Not living. Water doesn't eat or grow — but every living thing here needs it.",
      hint: "Water splashes and flows — but does it eat? Does it grow?",
      at: {
        x: 0,
        y: 0,
        s: 1,
      },
      hit: {
        cx: 452,
        cy: 410,
        r: 60,
      },
      box: "-60 -60 120 120",
    },
    {
      id: "lily",
      label: "Lily pad",
      the: "the lily pad",
      kind: "living",
      why: "Living! A lily pad is the leaf of a water lily. Its roots are down in the mud at the bottom.",
      hint: "A lily pad is a leaf. Does it grow? Yes — from a plant with roots in the mud.",
      at: {
        x: 356,
        y: 398,
        s: 0.95,
      },
      hit: {
        cx: 356,
        cy: 394,
        r: 50,
      },
      box: "-60 -60 120 120",
    },
    {
      id: "mud",
      label: "Mud",
      the: "the mud",
      kind: "nonliving",
      why: "Not living. Mud is wet soil — tiny bits of rock and old leaves. Lots of tiny living things live in it, though!",
      hint: "Does mud eat? Does it grow? It's wet soil, made of tiny bits of rock.",
      at: {
        x: 0,
        y: 0,
        s: 1,
      },
      hit: {
        cx: 84,
        cy: 452,
        r: 58,
      },
      box: "-60 -60 120 120",
    },
    {
      id: "frog",
      label: "Frog",
      the: "the frog",
      kind: "living",
      why: "Living! A frog eats bugs, and it grew from a tadpole.",
      hint: "Does a frog eat and grow? Gulp — it eats bugs, and it grew from a tadpole!",
      at: {
        x: 240,
        y: 446,
        s: 0.78,
      },
      hit: {
        cx: 240,
        cy: 446,
        r: 42,
      },
      box: "-62 -62 124 124",
    },
    {
      id: "rock",
      label: "Rock",
      the: "the rock",
      kind: "nonliving",
      why: "Not living. A rock never eats, never grows and never has babies.",
      hint: "Does a rock eat? Does it grow? Try the other basket.",
      at: {
        x: 664,
        y: 446,
        s: 0.92,
      },
      hit: {
        cx: 664,
        cy: 446,
        r: 50,
      },
      box: "-60 -60 120 120",
    },
    {
      id: "snail",
      label: "Snail",
      the: "the snail",
      kind: "living",
      why: "Living! A snail nibbles plants and old leaves, and its shell grows bigger as it grows.",
      hint: "Does a snail eat and grow? It munches leaves, and its shell grows with it!",
      at: {
        x: 752,
        y: 452,
        s: 0.72,
      },
      hit: {
        cx: 748,
        cy: 448,
        r: 40,
      },
      box: "-56 -56 112 112",
    },
  ],
  l = Object.fromEntries(r.map((e) => [e.id, e])),
  a = r.map((e) => e.id),
  i = {
    light: {
      color: "#e2a326",
      label: "Light",
      delay: 0,
    },
    water: {
      color: "#2c6fb5",
      label: "Water",
      delay: 0.7,
    },
    air: {
      color: "#7fa7c4",
      label: "Air",
      delay: 1.4,
    },
    soil: {
      color: "#7a5332",
      label: "Mud (soil)",
      delay: 1.4,
    },
    food: {
      color: "#c8352b",
      label: "Food",
      delay: 2.1,
    },
    recycle: {
      color: "#8a6a3c",
      label: "Old leaves",
      delay: 2.8,
    },
  },
  n = [
    {
      kind: "light",
      from: {
        x: 92,
        y: 84,
      },
      to: {
        x: 630,
        y: 110,
      },
      bend: -60,
      pa: 58,
      pb: 30,
    },
    {
      kind: "light",
      from: {
        x: 92,
        y: 84,
      },
      to: {
        x: 186,
        y: 244,
      },
      bend: 18,
      pa: 58,
      pb: 14,
    },
    {
      kind: "light",
      from: {
        x: 92,
        y: 84,
      },
      to: {
        x: 350,
        y: 386,
      },
      bend: 40,
      pa: 58,
      pb: 26,
    },
    {
      kind: "water",
      from: {
        x: 470,
        y: 408,
      },
      to: {
        x: 678,
        y: 298,
      },
      bend: 30,
      pa: 8,
      pb: 10,
    },
    {
      kind: "water",
      from: {
        x: 430,
        y: 414,
      },
      to: {
        x: 272,
        y: 452,
      },
      bend: -14,
      pa: 8,
      pb: 12,
    },
    {
      kind: "water",
      from: {
        x: 300,
        y: 372,
      },
      to: {
        x: 208,
        y: 352,
      },
      bend: -16,
      pa: 6,
      pb: 8,
    },
    {
      kind: "air",
      from: {
        x: 292,
        y: 88,
      },
      to: {
        x: 360,
        y: 190,
      },
      bend: 18,
      pa: 56,
      pb: 26,
    },
    {
      kind: "air",
      from: {
        x: 292,
        y: 88,
      },
      to: {
        x: 598,
        y: 128,
      },
      bend: -34,
      pa: 58,
      pb: 20,
    },
    {
      kind: "soil",
      from: {
        x: 88,
        y: 440,
      },
      to: {
        x: 176,
        y: 368,
      },
      bend: -12,
      pa: 16,
      pb: 8,
    },
    {
      kind: "food",
      from: {
        x: 350,
        y: 226,
      },
      to: {
        x: 252,
        y: 418,
      },
      bend: 30,
      pa: 26,
      pb: 24,
    },
    {
      kind: "food",
      from: {
        x: 262,
        y: 436,
      },
      to: {
        x: 520,
        y: 300,
      },
      bend: 46,
      pa: 22,
      pb: 26,
    },
    {
      kind: "food",
      from: {
        x: 742,
        y: 248,
      },
      to: {
        x: 756,
        y: 426,
      },
      bend: -14,
      pa: 8,
      pb: 18,
    },
    {
      kind: "recycle",
      from: {
        x: 606,
        y: 208,
      },
      to: {
        x: 614,
        y: 286,
      },
      bend: 16,
      pa: 4,
      pb: 4,
    },
  ].map((e) => {
    var t, s, r, l, a;
    let i, n, o, c, d, x, f, h, p, u, j, y, m, g, k;
    return {
      ...e,
      ...((t = e.from),
      (s = e.to),
      (r = e.bend),
      (l = e.pa),
      (a = e.pb),
      (i = s.x - t.x),
      (o = Math.hypot(i, (n = s.y - t.y)) || 1),
      (c = i / o),
      (d = n / o),
      (x = {
        x: t.x + c * l,
        y: t.y + d * l,
      }),
      (f = {
        x: s.x - c * a,
        y: s.y - d * a,
      }),
      (h = {
        x: (x.x + f.x) / 2 - d * r,
        y: (x.y + f.y) / 2 + c * r,
      }),
      (p = f.x - h.x),
      (j = Math.hypot(p, (u = f.y - h.y)) || 1),
      (y = p / j),
      (m = u / j),
      (g = {
        x: f.x - 15 * y,
        y: f.y - 15 * m,
      }),
      (k = `${f.x.toFixed(1)},${f.y.toFixed(1)} ${(g.x - 8 * m).toFixed(1)},${(g.y + 8 * y).toFixed(1)} ${(g.x + 8 * m).toFixed(1)},${(g.y - 8 * y).toFixed(1)}`),
      {
        d: `M${x.x.toFixed(1)} ${x.y.toFixed(1)} Q${h.x.toFixed(1)} ${h.y.toFixed(1)} ${g.x.toFixed(1)} ${g.y.toFixed(1)}`,
        head: k,
      }),
    };
  });
function CO_() {
  return (
    <g>
      {Array.from(
        {
          length: 12,
        },
        (e, s) => (
          <line
            key={s}
            x1={0}
            y1={-42}
            x2={0}
            y2={-56}
            stroke="#e9a531"
            strokeWidth={7}
            strokeLinecap="round"
            transform={`rotate(${30 * s})`}
          />
        ),
      )}
      <circle r={35} fill="#f2b53c" />
      <circle cx={-6} cy={-6} r={27} fill="#f8c95a" />
      <circle cx={-12} cy={-13} r={10} fill="#fde08e" />
    </g>
  );
}
function CC_() {
  let e = [
    "M-54 -14 C -30 -14 -4 -12 14 -22 C 30 -31 26 -50 10 -48 C -2 -46 -2 -34 8 -32",
    "M-46 8 C -14 8 20 6 38 0 C 54 -6 56 -24 44 -26 C 34 -27 32 -16 40 -14",
    "M-38 28 C -12 28 14 28 32 32",
  ];
  return (
    <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      {e.map((e) => (
        <path key={`u${e}`} d={e} stroke="#8fb6d3" strokeWidth={10} />
      ))}
      {e.map((e) => (
        <path key={`o${e}`} d={e} stroke="#ffffff" strokeWidth={5} />
      ))}
    </g>
  );
}
function CD_() {
  return (
    <g>
      <ellipse cx={0} cy={44} rx={40} ry={8} fill="#a9d0ea" />
      <path d="M0 -46 C 14 -24 32 -6 32 14 C 32 32 18 44 0 44 C -18 44 -32 32 -32 14 C -32 -6 -14 -24 0 -46 Z" fill="#4a90c6" />
      <path d="M-15 10 C -15 -2 -9 -12 -4 -18" stroke="#c4e3f7" strokeWidth={7} strokeLinecap="round" fill="none" />
    </g>
  );
}
function CX_() {
  return (
    <g>
      <path d="M-54 34 C -48 4 -22 -12 0 -12 C 26 -12 48 6 54 34 Z" fill="#7a573a" />
      <path d="M-38 12 C -26 0 -10 -5 6 -5" stroke="#9a7651" strokeWidth={7} strokeLinecap="round" fill="none" />
      <ellipse cx={14} cy={20} rx={14} ry={5} fill="#5f7f98" opacity={0.55} />
      <circle cx={-20} cy={22} r={4} fill="#5c412a" />
      <circle cx={30} cy={4} r={3} fill="#5c412a" />
      <circle cx={-2} cy={8} r={3} fill="#5c412a" />
    </g>
  );
}
function CF_() {
  return (
    <g>
      <ellipse cx={0} cy={34} rx={50} ry={7} fill="#1f2a22" opacity={0.12} />
      <path d="M-50 24 C -54 0 -36 -26 -6 -30 C 24 -34 50 -14 52 10 C 54 28 36 34 4 34 C -26 34 -48 34 -50 24 Z" fill="#8f9894" />
      <path d="M-34 -6 C -24 -20 -8 -25 10 -23" stroke="#b9c1bd" strokeWidth={9} strokeLinecap="round" fill="none" />
      <path d="M-42 24 C -20 31 20 31 44 20" stroke="#767f7b" strokeWidth={6} strokeLinecap="round" fill="none" />
    </g>
  );
}
function CH_() {
  return (
    <g>
      <path d="M-8 62 C -14 22 -30 -6 -46 -24 C -26 -6 -12 22 -2 62 Z" fill="#5a8c3c" />
      <path d="M8 62 C 14 26 30 2 48 -12 C 28 6 18 32 4 62 Z" fill="#6ea349" />
      {[
        {
          x: -16,
          top: -46,
        },
        {
          x: 2,
          top: -60,
        },
        {
          x: 18,
          top: -38,
        },
      ].map((e) => (
        <g key={e.x}>
          <line x1={e.x} y1={62} x2={e.x} y2={e.top} stroke="#6b8f3a" strokeWidth={4} strokeLinecap="round" />
          <rect x={e.x - 7} y={e.top + 8} width={14} height={38} rx={7} fill="#7b4a2a" />
          <rect x={e.x - 2} y={e.top + 12} width={4} height={28} rx={2} fill="#95603a" />
        </g>
      ))}
      <path d="M0 62 C 2 30 -6 8 -22 -4 C -4 6 8 28 8 62 Z" fill="#7fb356" />
    </g>
  );
}
function CP_() {
  return (
    <g>
      <ellipse cx={0} cy={6} rx={56} ry={21} fill="#2f6f33" />
      <path d="M0 0 L50.7 -6.8 A54 20 0 1 1 31 -16.4 Z" fill="#4a9a45" />
      <g stroke="#6cb85e" strokeWidth={3} strokeLinecap="round">
        <line x1={0} y1={0} x2={-44} y2={-8} />
        <line x1={0} y1={0} x2={-30} y2={14} />
        <line x1={0} y1={0} x2={18} y2={17} />
        <line x1={0} y1={0} x2={46} y2={8} />
      </g>
      <g transform="translate(-14 -6)">
        {[-70, -40, -12, 14, 42, 70].map((e) => (
          <path
            key={e}
            d="M0 0 C 7 -8 7 -22 0 -28 C -7 -22 -7 -8 0 0 Z"
            fill="#fbfaf2"
            stroke="#e7dcc6"
            strokeWidth={1.5}
            transform={`rotate(${e})`}
          />
        ))}
        <circle cx={0} cy={-6} r={6} fill="#f2c14e" />
      </g>
    </g>
  );
}
let u =
  "M0 -20 L4 -11 L9 -14 L7 -4 L16 -9 L14 -3 L20 -2 L12 4 L14 8 L4 7 L2 12 L1 20 L-1 20 L-2 12 L-4 7 L-14 8 L-12 4 L-20 -2 L-14 -3 L-16 -9 L-7 -4 L-9 -14 L-4 -11 Z";
function CJ_() {
  return (
    <g>
      <ellipse cx={0} cy={70} rx={40} ry={5} fill="#1f2a22" opacity={0.12} />
      <path d="M-9 70 C -7 50 -6 30 -5 8 L 5 8 C 6 30 7 50 9 70 Z" fill="#7a5132" />
      <path d="M-2 24 L -22 4 M 2 18 L 20 0" stroke="#7a5132" strokeWidth={5} strokeLinecap="round" />
      <circle cx={-30} cy={-4} r={30} fill="#4d8a3b" />
      <circle cx={28} cy={-2} r={31} fill="#4d8a3b" />
      <circle cx={0} cy={-30} r={36} fill="#5a9a45" />
      <circle cx={-30} cy={-34} r={22} fill="#5a9a45" />
      <circle cx={32} cy={-34} r={22} fill="#5a9a45" />
      <circle cx={-6} cy={-40} r={18} fill="#6dae55" />
      <circle cx={-34} cy={-40} r={10} fill="#6dae55" />
      <path d={u} fill="#d8612c" transform="translate(30 -30) scale(0.55) rotate(18)" />
      <path d={u} fill="#e38b2f" transform="translate(-40 6) scale(0.5) rotate(-20)" />
      <path d={u} fill="#c9442a" transform="translate(14 8) scale(0.45) rotate(8)" />
    </g>
  );
}
function CY_() {
  return (
    <g>
      <path d={u} fill="#d8612c" transform="scale(2.6)" />
      <path d="M0 -40 L0 44" stroke="#b44a22" strokeWidth={2.5} />
    </g>
  );
}
function CM_() {
  return (
    <g>
      <ellipse cx={0} cy={42} rx={48} ry={6} fill="#1f2a22" opacity={0.12} />
      <ellipse cx={-36} cy={24} rx={21} ry={12} fill="#4a8c43" />
      <ellipse cx={36} cy={24} rx={21} ry={12} fill="#4a8c43" />
      <ellipse cx={0} cy={10} rx={40} ry={30} fill="#5aa650" />
      <ellipse cx={0} cy={22} rx={25} ry={14} fill="#d4e8a4" />
      <ellipse cx={-14} cy={-2} rx={11} ry={5} fill="#7cc06a" />
      <circle cx={-20} cy={-18} r={13} fill="#5aa650" />
      <circle cx={20} cy={-18} r={13} fill="#5aa650" />
      <circle cx={-20} cy={-19} r={8} fill="#fffdf4" />
      <circle cx={20} cy={-19} r={8} fill="#fffdf4" />
      <circle cx={-19} cy={-19} r={4.5} fill="#1f2a22" />
      <circle cx={21} cy={-19} r={4.5} fill="#1f2a22" />
      <path d="M-22 2 Q 0 14 22 2" stroke="#2f5d3a" strokeWidth={3.5} fill="none" strokeLinecap="round" />
      <ellipse cx={-16} cy={38} rx={10} ry={5} fill="#4a8c43" />
      <ellipse cx={16} cy={38} rx={10} ry={5} fill="#4a8c43" />
    </g>
  );
}
function CG_() {
  let e = {
    fill: "#ffffff",
    fillOpacity: 0.75,
    stroke: "#8db8dc",
    strokeWidth: 2,
  };
  return (
    <g>
      <ellipse cx={-30} cy={-24} rx={9} ry={27} transform="rotate(-14 -30 -24)" {...e} />
      <ellipse cx={-30} cy={24} rx={9} ry={27} transform="rotate(14 -30 24)" {...e} />
      <ellipse cx={-16} cy={-23} rx={8} ry={25} transform="rotate(12 -16 -23)" {...e} />
      <ellipse cx={-16} cy={23} rx={8} ry={25} transform="rotate(-12 -16 23)" {...e} />
      <rect x={-16} y={-4} width={70} height={8} rx={4} fill="#2c6fb5" />
      <g stroke="#1f5590" strokeWidth={2}>
        {[0, 10, 20, 30, 40].map((e) => (
          <line key={e} x1={e} y1={-4} x2={e} y2={4} />
        ))}
      </g>
      <ellipse cx={-23} cy={0} rx={11} ry={8} fill="#2a8a8a" />
      <circle cx={-38} cy={-6} r={7} fill="#1f5590" />
      <circle cx={-38} cy={6} r={7} fill="#1f5590" />
      <circle cx={-40} cy={-8} r={2.2} fill="#cfe6f7" />
      <circle cx={-40} cy={4} r={2.2} fill="#cfe6f7" />
    </g>
  );
}
function CK_() {
  return (
    <g>
      <path d="M4 14 L 0 60 M 14 12 L 18 60" stroke="#b08d4f" strokeWidth={4} strokeLinecap="round" />
      <path d="M-6 60 L 8 60 M 12 60 L 26 60" stroke="#b08d4f" strokeWidth={3} strokeLinecap="round" />
      <path d="M-18 -4 C -10 -22 20 -20 34 -2 C 40 6 44 18 40 22 C 26 20 6 18 -6 12 C -16 8 -22 4 -18 -4 Z" fill="#7f95ab" />
      <path d="M-4 -6 C 10 -16 28 -12 38 6 C 30 14 10 12 -2 6 Z" fill="#62798f" />
      <path d="M-14 -4 C -32 -16 -6 -30 -18 -48" stroke="#a3b6c7" strokeWidth={10} fill="none" strokeLinecap="round" />
      <path d="M-18 -2 L -24 12 L -12 6 Z" fill="#c3cfda" />
      <path d="M-28 -54 L -60 -48 L -28 -47 Z" fill="#e2a93b" />
      <ellipse cx={-18} cy={-52} rx={11} ry={9} fill="#eef2f4" />
      <path d="M-26 -57 C -14 -62 -2 -60 10 -54" stroke="#2a2f36" strokeWidth={4} strokeLinecap="round" fill="none" />
      <circle cx={-21} cy={-52} r={2.4} fill="#1f2a22" />
    </g>
  );
}
function CB_() {
  return (
    <g>
      <ellipse cx={4} cy={38} rx={40} ry={6} fill="#1f2a22" opacity={0.14} />
      <g transform="translate(28 18) scale(0.55)">
        <path d="M-10 36 C -12 20 -10 6 -8 -2 L 10 -2 C 12 6 14 20 12 36 Z" fill="#efe3c9" />
        <path d="M-36 0 C -36 -26 -18 -38 2 -38 C 22 -38 38 -26 38 0 Z" fill="#a95e33" />
      </g>
      <path d="M-11 38 C -13 22 -11 8 -9 0 L 9 0 C 11 8 13 22 11 38 Z" fill="#f1e6cf" />
      <path d="M-38 2 C -38 -26 -20 -40 0 -40 C 20 -40 38 -26 38 2 Z" fill="#b8683a" />
      <path d="M-38 2 Q 0 10 38 2" stroke="#e8d3b1" strokeWidth={4} fill="none" />
      <path d="M-24 -16 C -18 -28 -6 -33 6 -33" stroke="#d88d58" strokeWidth={7} strokeLinecap="round" fill="none" />
    </g>
  );
}
function CW_() {
  return (
    <g>
      <ellipse cx={-2} cy={27} rx={46} ry={5} fill="#1f2a22" opacity={0.12} />
      <path d="M-44 22 C -46 12 -40 8 -30 8 L 30 8 C 44 8 46 22 38 26 L -38 26 C -44 26 -44 24 -44 22 Z" fill="#cdb893" />
      <path d="M-46 22 C -52 8 -44 -2 -34 2 L -26 10 Z" fill="#cdb893" />
      <path d="M-40 2 L -48 -16 M -34 2 L -36 -18" stroke="#cdb893" strokeWidth={4} strokeLinecap="round" />
      <circle cx={-48} cy={-17} r={3.5} fill="#4a3b2a" />
      <circle cx={-36} cy={-19} r={3.5} fill="#4a3b2a" />
      <circle cx={6} cy={-8} r={25} fill="#c98a4b" />
      <path
        d="M6 -8 A3 3 0 0 1 12 -8 A6 6 0 0 1 0 -8 A9 9 0 0 1 18 -8 A12 12 0 0 1 -6 -8 A15 15 0 0 1 24 -8"
        stroke="#8a5a2e"
        strokeWidth={3.5}
        fill="none"
        strokeLinecap="round"
      />
      <path d="M-10 -24 C -4 -30 6 -32 14 -30" stroke="#dea56a" strokeWidth={4} strokeLinecap="round" fill="none" />
    </g>
  );
}
function M({ id: e }) {
  switch (e) {
    case "sun":
      return <CO_ />;
    case "air":
      return <CC_ />;
    case "water":
      return <CD_ />;
    case "mud":
      return <CX_ />;
    case "rock":
      return <CF_ />;
    case "cattails":
      return <CH_ />;
    case "lily":
      return <CP_ />;
    case "maple":
      return <CY_ />;
    case "frog":
      return <CM_ />;
    case "dragonfly":
      return <CG_ />;
    case "heron":
      return <CK_ />;
    case "mushroom":
      return <CB_ />;
    case "snail":
      return <CW_ />;
  }
}
function L({ id: e }) {
  return "maple" === e ? <CJ_ /> : <M id={e} />;
}
function $({ id: e, className: s }) {
  return (
    <svg viewBox={l[e].box} className={s} aria-hidden="true" focusable="false">
      <M id={e} />
    </svg>
  );
}
let v = "M0 392 C 70 382 150 396 208 420 C 258 440 288 470 298 500 L0 500 Z";
function C() {
  return (
    <g>
      <rect width={800} height={500} fill="#dcecf3" />
      <path d="M0 246 C 90 212 180 224 262 238 C 352 254 420 212 520 220 C 612 228 700 204 800 224 L800 300 L0 300 Z" fill="#bcd6a6" />
      <path d="M0 272 C 120 258 240 264 360 270 C 480 276 620 260 800 268 L800 500 L0 500 Z" fill="#9dc57b" />
      <path d="M0 340 C 160 330 300 346 440 340 C 580 334 700 344 800 338 L800 500 L0 500 Z" fill="#92bb70" />
    </g>
  );
}
function W() {
  return (
    <g>
      <ellipse cx={414} cy={396} rx={248} ry={78} fill="#7c9a5c" />
      <ellipse cx={414} cy={392} rx={238} ry={70} fill="#4f93c4" />
      <ellipse cx={406} cy={384} rx={198} ry={48} fill="#62a3d0" />
      <g stroke="#a9d3ee" strokeWidth={4} fill="none" strokeLinecap="round">
        <path d="M290 372 q 20 -6 40 0" />
        <path d="M470 364 q 16 -5 32 0" />
        <path d="M520 420 q 22 -6 44 0" />
        <path d="M430 432 q 14 -4 28 0" />
      </g>
    </g>
  );
}
function N() {
  return (
    <g>
      <path d={v} fill="#7d5c3e" />
      <path d="M0 404 C 70 394 146 408 200 430" stroke="#9a7651" strokeWidth={8} fill="none" strokeLinecap="round" />
      <ellipse cx={120} cy={470} rx={26} ry={7} fill="#6f9fc4" opacity={0.7} />
      <g fill="#5c412a">
        <circle cx={40} cy={432} r={4} />
        <circle cx={150} cy={440} r={3} />
        <circle cx={70} cy={478} r={4} />
        <circle cx={196} cy={470} r={3} />
      </g>
      <g stroke="#5c412a" strokeWidth={3} strokeLinecap="round" fill="none">
        {[
          {
            x: 36,
            y: 462,
            r: -20,
          },
          {
            x: 76,
            y: 448,
            r: -14,
          },
        ].map((e) => (
          <path key={e.x} d="M0 0 L -8 -12 M 0 0 L 0 -14 M 0 0 L 8 -12 M 0 0 L 0 6" transform={`translate(${e.x} ${e.y}) rotate(${e.r})`} />
        ))}
      </g>
    </g>
  );
}
let Z = `
.eco1ls-hit { cursor: pointer; outline: none; }
.eco1ls-ring { opacity: 0; transition: opacity .2s; }
.eco1ls-hit:focus-visible .eco1ls-ring { opacity: 1; }
.eco1ls-lift { transform-box: fill-box; transform-origin: center; transition: transform .2s ease; }
.eco1ls-hit:hover .eco1ls-lift { transform: scale(1.04); }
@media (prefers-reduced-motion: no-preference) {
  .eco1ls-wiggle { transform-box: fill-box; transform-origin: center bottom; animation: eco1ls-wiggle .6s ease-in-out; }
  .eco1ls-pop { transform-box: fill-box; transform-origin: center; animation: eco1ls-pop .45s ease-out both; }
  .eco1ls-glow { animation: eco1ls-glow 1.2s ease-out both; transform-box: fill-box; transform-origin: center; }
  .eco1ls-pulse { animation: eco1ls-pulse 1.1s ease-in-out infinite; }
  .eco1ls-fade { animation: eco1ls-fade .7s ease-out both; }
  .eco1ls-march { animation: eco1ls-march 1.2s linear infinite; }
  .eco1ls-shake { animation: eco1ls-shake .5s ease-in-out; }
}
@keyframes eco1ls-wiggle { 0%,100% { transform: rotate(0) } 20% { transform: rotate(-7deg) } 40% { transform: rotate(6deg) } 60% { transform: rotate(-4deg) } 80% { transform: rotate(3deg) } }
@keyframes eco1ls-pop { 0% { transform: scale(.3); opacity: 0 } 70% { transform: scale(1.15); opacity: 1 } 100% { transform: scale(1) } }
@keyframes eco1ls-glow { 0% { opacity: .9; transform: scale(.7) } 100% { opacity: 0; transform: scale(1.5) } }
@keyframes eco1ls-pulse { 0%,100% { opacity: .45 } 50% { opacity: 1 } }
@keyframes eco1ls-fade { from { opacity: 0 } to { opacity: 1 } }
@keyframes eco1ls-march { to { stroke-dashoffset: -36 } }
@keyframes eco1ls-shake { 0%,100% { transform: translateX(0) } 25% { transform: translateX(-5px) } 50% { transform: translateX(5px) } 75% { transform: translateX(-3px) } }
`,
  A = {
    tone: "ask",
    text: "Tap something in the picture. Is it living, or not living?",
  };
function T({ two: e, four: s, six: r, outside: l }) {
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
export const LivingSort = function () {
  let [e, o] = (0, s.useState)([]),
    [c, d] = (0, s.useState)(null),
    [x, f] = (0, s.useState)(null),
    [h, p] = (0, s.useState)(null),
    [u, j] = (0, s.useState)(A),
    [y, m] = (0, s.useState)(null),
    g = (0, s.useRef)([]);
  (0, s.useEffect)(() => {
    let e = g.current;
    return () => {
      e.forEach((e) => window.clearTimeout(e));
    };
  }, []);
  let k = e.length === r.length,
    b = e.filter((e) => "living" === l[e].kind),
    w = e.filter((e) => "nonliving" === l[e].kind),
    M = a.filter((t) => !e.includes(t));
  function S(t) {
    if (e.includes(t)) {
      (d(null),
        j({
          tone: "yes",
          text: l[t].why,
        }));
      return;
    }
    d(t);
    let s = l[t];
    j({
      tone: "ask",
      text: `${s.label}! Is ${s.the} living, or not living? Tap a basket.`,
    });
  }
  function D(e) {
    let s = c === e.id,
      r = "water" === e.id,
      l = "mud" === e.id,
      a = (s) =>
        r ? (
          <ellipse cx={414} cy={392} rx={244} ry={76} fill="none" {...s} />
        ) : l ? (
          <path d={v} fill="none" {...s} />
        ) : (
          <circle cx={e.hit.cx} cy={e.hit.cy} r={e.hit.r} fill="none" {...s} />
        );
    return (
      <>
        <g className="eco1ls-ring">
          {a({
            stroke: "#2c6fb5",
            strokeWidth: 4,
            strokeDasharray: "10 8",
          })}
        </g>
        {s ? (
          <g className="eco1ls-pulse" aria-hidden="true">
            {a({
              stroke: "#d9a441",
              strokeWidth: 6,
              strokeDasharray: "14 9",
            })}
          </g>
        ) : null}
        {y === e.id ? (
          <g className="eco1ls-glow" aria-hidden="true">
            {r || l ? (
              a({
                stroke: "living" === e.kind ? "#8fd07a" : "#fff3b0",
                strokeWidth: 14,
              })
            ) : (
              <circle cx={e.hit.cx} cy={e.hit.cy} r={0.8 * e.hit.r} fill={"living" === e.kind ? "#bfe8a8" : "#fff3b0"} opacity={0.8} />
            )}
          </g>
        ) : null}
      </>
    );
  }
  function Q(t) {
    let s = e.includes(t.id) ? ("living" === t.kind ? ", sorted: living" : ", sorted: not living") : "";
    return {
      role: "button",
      tabIndex: 0,
      "aria-label": `${t.label}${s}`,
      "aria-pressed": c === t.id,
      className: "eco1ls-hit",
      onClick: () => S(t.id),
      onKeyDown: (e) => {
        var s;
        return ((s = () => S(t.id)), void (("Enter" === e.key || " " === e.key) && (e.preventDefault(), s())));
      },
    };
  }
  let I = l.water,
    F = l.mud;
  return (
    <div className="grid gap-4">
      <style>{Z}</style>
      <svg
        viewBox="0 0 800 500"
        className="h-auto w-full touch-manipulation select-none rounded-2xl border border-line"
        role="group"
        aria-label="A pond edge with things to sort into living and not living"
      >
        <g
          role="img"
          aria-label="A sunny pond edge: a maple tree, cattails, a heron standing in the water, a lily pad, a frog on the mud, a rock and a snail, with a breeze in the sky."
        >
          <C />
        </g>
        <g {...Q(I)}>
          <g key={x?.id === "water" ? `w${x.n}` : "w"} className={x?.id === "water" ? "eco1ls-shake" : undefined}>
            <W />
          </g>
          {D(I)}
        </g>
        <g {...Q(F)}>
          <g key={x?.id === "mud" ? `m${x.n}` : "m"} className={x?.id === "mud" ? "eco1ls-shake" : undefined}>
            <N />
          </g>
          {D(F)}
        </g>
        {["sun", "air", "maple", "mushroom", "cattails", "heron", "lily", "dragonfly", "rock", "snail", "frog"].map((e) => {
          let s = l[e],
            r = x?.id === e;
          return (
            <g key={e} {...Q(s)}>
              <circle cx={s.hit.cx} cy={s.hit.cy} r={s.hit.r} fill="#000" fillOpacity={0} />
              {D(s)}
              <g transform={`translate(${s.at.x} ${s.at.y}) scale(${s.at.s})`}>
                <g key={r ? `w${x?.n}` : "still"} className={r ? "eco1ls-wiggle" : undefined}>
                  <g className="eco1ls-lift">
                    <L id={e} />
                  </g>
                </g>
              </g>
            </g>
          );
        })}
        {k
          ? null
          : r.map((s) => (
              <g key={`b-${s.id}`}>
                {(function (s) {
                  if (!e.includes(s.id)) return null;
                  let r = s.hit.cx + 0.62 * s.hit.r,
                    l = s.hit.cy - 0.62 * s.hit.r,
                    a = "living" === s.kind;
                  return (
                    <g transform={`translate(${r} ${l})`} aria-hidden="true">
                      <g className={y === s.id ? "eco1ls-pop" : undefined}>
                        <circle r={15} fill={a ? "#2f5d3a" : "#5d6f7c"} stroke="#fffdf8" strokeWidth={3} />
                        <path
                          d="M-6 0 L -1.5 5 L 7 -5"
                          stroke="#fffdf8"
                          strokeWidth={3.5}
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </g>
                    </g>
                  );
                })(s)}
              </g>
            ))}
        {k ? (
          <g aria-hidden="true" pointerEvents="none">
            <rect width={800} height={500} fill="#fff4c9" className="eco1ls-fade" fillOpacity={0.22} />
            {n.map((e, s) => {
              let r = i[e.kind];
              return (
                <g
                  key={s}
                  className="eco1ls-fade"
                  style={{
                    animationDelay: `${r.delay}s`,
                  }}
                >
                  <path d={e.d} stroke="#fffdf8" strokeWidth={10} fill="none" strokeLinecap="round" opacity={0.85} />
                  <path
                    d={e.d}
                    stroke={r.color}
                    strokeWidth={5}
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray="12 6"
                    className="eco1ls-march"
                  />
                  <polygon points={e.head} fill={r.color} stroke="#fffdf8" strokeWidth={2} strokeLinejoin="round" />
                </g>
              );
            })}
          </g>
        ) : null}
      </svg>
      <p
        aria-live="polite"
        className={`min-h-[3.5rem] rounded-2xl px-4 py-3 text-base leading-snug ${"done" === u.tone ? "bg-moss text-white font-semibold" : "hint" === u.tone ? "bg-[#fbeee0] text-ink" : "yes" === u.tone ? "bg-[#e8f1e2] text-ink" : "bg-paper-2 text-ink"}`}
      >
        {u.text}
      </p>
      {k ? (
        <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-ink-2" aria-label="What the arrows show">
          {Object.keys(i).map((e) => (
            <li key={e} className="flex items-center gap-2">
              <span
                className="inline-block h-1.5 w-7 rounded-full"
                style={{
                  background: i[e].color,
                }}
              />
              {i[e].label}
            </li>
          ))}
        </ul>
      ) : null}
      <div className="grid grid-cols-2 gap-3">
        {["living", "nonliving"].map((s) => {
          let a = "living" === s ? b : w,
            i = "living" === s,
            n = h?.bin === s;
          return (
            <button
              key={s}
              type="button"
              onClick={() =>
                (function (t) {
                  if (k) return;
                  if (!c) {
                    (p((e) => ({
                      bin: t,
                      n: (e?.n ?? 0) + 1,
                    })),
                      j({
                        tone: "hint",
                        text: "First tap something in the picture — then tap a basket.",
                      }));
                    return;
                  }
                  let s = l[c];
                  if (s.kind !== t) {
                    (f((e) => ({
                      id: s.id,
                      n: (e?.n ?? 0) + 1,
                    })),
                      j({
                        tone: "hint",
                        text: s.hint,
                      }));
                    return;
                  }
                  let a = [...e, s.id];
                  (o(a),
                    d(null),
                    f(null),
                    m(s.id),
                    g.current.push(window.setTimeout(() => m(null), 1300)),
                    a.length === r.length
                      ? j({
                          tone: "done",
                          text: "An ecosystem is all the living things in a place AND the non-living things they need — working together.",
                        })
                      : j({
                          tone: "yes",
                          text: s.why,
                        }));
                })(s)
              }
              aria-label={`${i ? "Living" : "Not living"} basket${c ? `: put ${l[c].the} here` : ""}. ${a.length} inside.`}
              className={`flex min-h-[7rem] flex-col justify-start rounded-2xl border-2 p-3 text-left transition active:scale-[0.98] ${i ? "border-moss/50 bg-[#eaf3e4] hover:border-moss" : "border-[#5d6f7c]/50 bg-[#e9eef1] hover:border-[#5d6f7c]"} ${c && !k ? "ring-4 ring-gold-fill/40" : ""}`}
            >
              <span key={n ? `s${h?.n}` : "s"} className={`block ${n ? "eco1ls-shake" : ""}`}>
                <span className="flex items-center gap-2">
                  <svg viewBox="0 0 40 32" className="h-7 w-8 shrink-0" aria-hidden="true">
                    <path d="M3 10 H37 L33 30 H7 Z" fill={i ? "#b98a52" : "#8b98a2"} />
                    <path d="M3 10 H37" stroke={i ? "#8a6236" : "#5d6f7c"} strokeWidth={3} strokeLinecap="round" />
                    <path d="M10 14 L12 27 M20 14 V27 M30 14 L28 27" stroke={i ? "#8a6236" : "#5d6f7c"} strokeWidth={2} />
                  </svg>
                  <span className={`font-display text-lg font-semibold ${i ? "text-moss" : "text-[#44545f]"}`}>
                    {i ? "Living" : "Not living"}
                  </span>
                </span>
                <span className="mt-0.5 block text-xs text-ink-2">
                  {i ? "eats (or makes food) and grows" : "doesn't eat, doesn't grow"}
                </span>
                <span className="mt-2 flex min-h-9 flex-wrap gap-1">
                  {a.map((e) => (
                    <span
                      key={e}
                      className={`grid h-9 w-9 place-items-center rounded-full bg-surface/80 ${y === e ? "eco1ls-pop" : ""}`}
                      title={l[e].label}
                    >
                      <$ id={e} className="h-7 w-7" />
                    </span>
                  ))}
                </span>
              </span>
            </button>
          );
        })}
      </div>
      {k ? null : (
        <div>
          <p className="mb-2 text-sm text-ink-2">Still to sort ({M.length}) — tap one here or in the picture:</p>
          <div className="flex flex-wrap gap-2">
            {M.map((e) => {
              let s = c === e;
              return (
                <button
                  key={e}
                  type="button"
                  aria-pressed={s}
                  onClick={() => S(e)}
                  className={`flex min-h-11 items-center gap-1.5 rounded-full border-2 py-1 pl-1.5 pr-3 text-sm font-semibold transition active:scale-95 ${s ? "border-gold-fill bg-[#fbf1da] text-ink" : "border-line bg-surface text-ink-2 hover:border-moss/50"}`}
                >
                  <$ id={e} className="h-7 w-7" />
                  {l[e].label}
                </button>
              );
            })}
          </div>
        </div>
      )}
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={function () {
            (o([]), d(null), f(null), m(null), j(A));
          }}
          className={`rounded-full px-4 py-2 font-semibold transition active:scale-95 ${k ? "bg-moss text-white" : "border border-line bg-surface text-ink-2"}`}
        >
          {k ? "Sort again" : "Start over"}
        </button>
        <span className="text-sm text-ink-2">
          {e.length}
          {" of "}
          {r.length}
          {" sorted"}
        </span>
      </div>
      <T
        two="“Frog is alive! Rock is not alive.” Point, name it, and let them pick the basket."
        four="“Living things eat and grow and have babies. Does a rock eat? Does a frog?”"
        six="“An ecosystem is the living things in a place plus the non-living things they need — sun, water, air and soil.”"
        outside="Lay a skipping rope in a circle on the ground and name everything inside it: living, or not living?"
      />
    </div>
  );
};
