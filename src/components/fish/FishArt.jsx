"use client";
// Restored from client module 3707 (exports: FishArt, LOOKS, geometry, lookFor, lookHeight, mix, seeded)
import * as t from "react/jsx-runtime";
import * as a from "react";
let l = {
    walleye: "torpedo",
    sauger: "torpedo",
    "smallmouth-bass": "deep",
    "largemouth-bass": "deep",
    "northern-pike": "torpedo",
    muskellunge: "torpedo",
    "lake-trout": "trout",
    "brook-trout": "trout",
    "rainbow-trout": "trout",
    "brown-trout": "trout",
    "yellow-perch": "deep",
    "black-crappie": "deep",
    bluegill: "deep",
    "channel-catfish": "torpedo",
    "chinook-salmon": "torpedo",
    "coho-salmon": "torpedo",
    steelhead: "trout",
    "atlantic-salmon": "torpedo",
    "striped-bass": "torpedo",
    "arctic-grayling": "trout",
    "lake-whitefish": "trout",
    burbot: "eel",
    redfish: "torpedo",
    "speckled-trout": "trout",
    snook: "torpedo",
    halibut: "flat",
    lingcod: "torpedo",
    kokanee: "trout",
    "atlantic-mackerel": "torpedo",
    tigerfish: "torpedo",
    "goliath-tigerfish": "torpedo",
    snoek: "torpedo",
    "yellowtail-amberjack": "torpedo",
  },
  r = {
    "european-perch": "yellow-perch",
    zander: "walleye",
    "common-carp": "black-drum",
    tench: "black-drum",
    roach: "lake-whitefish",
    "common-bream": "black-crappie",
    barbel: "redfish",
    chub: "lake-whitefish",
    "european-grayling": "arctic-grayling",
    "arctic-char": "brook-trout",
    "wels-catfish": "channel-catfish",
    "european-whitefish": "lake-whitefish",
    "european-sea-bass": "striped-bass",
    "gilthead-seabream": "black-drum",
    "atlantic-cod": "lingcod",
    pollack: "lingcod",
    "european-eel": "burbot",
    "nile-perch": "snook",
    "nile-tilapia": "bluegill",
    "mozambique-tilapia": "bluegill",
    "sharptooth-catfish": "channel-catfish",
    vundu: "channel-catfish",
    "smallmouth-yellowfish": "redfish",
    "largemouth-yellowfish": "redfish",
    "dusky-kob": "speckled-trout",
    galjoen: "black-drum",
    "giant-trevally": "black-drum",
    "african-threadfin": "snook",
  },
  o = (e) => String(Math.round(100 * e) / 100),
  s = (e) => (e < 0 ? 0 : e > 1 ? 1 : e);
function i(e) {
  let t = Math.abs(Math.floor(e)) % 233280;
  return () => (t = (9301 * t + 49297) % 233280) / 233280;
}
function n(e) {
  let t = parseInt(e.slice(1), 16);
  return [(t >> 16) & 255, (t >> 8) & 255, 255 & t];
}
function d(e, t, a) {
  let l = n(e),
    r = n(t),
    o = s(a);
  return (
    "#" +
    l
      .map((e, t) => Math.round(e + (r[t] - e) * o))
      .map((e) => e.toString(16).padStart(2, "0"))
      .join("")
  );
}
function h(e, t, [a, l], r) {
  return e <= 0
    ? 0
    : e >= 1
      ? r
      : e <= t
        ? Math.pow(1 - Math.pow(1 - e / t, a), l)
        : r + (1 - r) * (0.5 + 0.5 * Math.cos((Math.PI * (e - t)) / (1 - t)));
}
function c(e) {
  let t = e.body,
    a = e.depth * (1 - e.down),
    l = e.depth * e.down,
    r = (l) => -a * h(l / t, e.peak, e.head, e.ped),
    o = (a) => l * h(a / t, e.belly, e.chin, e.ped),
    s = 0.42 * r(e.eye.x),
    i = e.tail.h * e.depth,
    n = (o(t) + r(t)) / 2;
  return {
    L: e,
    B: t,
    Ht: a,
    Hb: l,
    top: r,
    bot: o,
    at: (e, t) => (t < 0 ? -t * r(e) : t * o(e)),
    eyeY: s,
    tailTop: n - i / 2,
    tailBot: n + i / 2,
    tailMid: n,
  };
}
function f(e, t) {
  let a = e.kind ?? "soft";
  if ("adipose" === a) return Math.pow(Math.sin(Math.PI * s(t)), 0.7);
  if ("spiny" === a) {
    let a = e.last ?? 0.35;
    return t < 0.32 ? 0.5 + 0.5 * Math.sin((Math.PI / 2) * (t / 0.32)) : a + (1 - a) * Math.cos((Math.PI / 2) * ((t - 0.32) / 0.68));
  }
  return "sail" === a
    ? t < 0.06
      ? (t / 0.06) * 0.55
      : 0.55 + 0.45 * Math.sin((Math.PI / 2) * Math.min(1, (t - 0.06) / 0.8))
    : t < 0.2
      ? Math.sin((Math.PI / 2) * (t / 0.2))
      : 1 - 0.58 * Math.pow((t - 0.2) / 0.8, 1.2);
}
function p(e, t, a, l, r) {
  let o = t.to - t.from,
    s = ("adipose" === t.kind ? 0.5 : 0.3) * t.h;
  return [
    t.from + l * o + r * s * f(t, l),
    (a ? e.top(t.from + l * o) + 0.9 : e.bot(t.from + l * o) - 0.9) + (a ? -1 : 1) * r * t.h * f(t, l),
  ];
}
function m(e, t, a) {
  let l = [];
  if ("spiny" === t.kind) {
    let r = u(t);
    for (let o = 0; o < r; o++) {
      let s = o / (r - 1);
      (l.push(p(e, t, a, s, 1)), o < r - 1 && l.push(p(e, t, a, (o + 0.5) / (r - 1), 0.74)));
    }
  } else for (let r = 0; r <= 14; r++) l.push(p(e, t, a, r / 14, 1));
  let r = p(e, t, a, 1, 0),
    s = p(e, t, a, 0, 0),
    i = a ? 2.2 : -2.2,
    n = `M${o(s[0])} ${o(s[1] + i)}L${o(s[0])} ${o(s[1])}`;
  for (let [e, t] of l) n += `L${o(e)} ${o(t)}`;
  return n + `L${o(r[0])} ${o(r[1])}L${o(r[0])} ${o(r[1] + i)}Z`;
}
function u(e) {
  return Math.max(4, Math.round((e.to - e.from) / 2.1) + 1);
}
function x(e, t, a) {
  let l = "spiny" === t.kind,
    r = l ? u(t) - 1 : Math.max(3, Math.round((t.to - t.from) / 1.6)),
    s = "";
  for (let i = +!l; i < (l ? r + 1 : r); i++) {
    let n = i / r,
      d = p(e, t, a, n, 0.05),
      h = p(e, t, a, n, l ? 0.98 : 0.92);
    s += `M${o(d[0])} ${o(d[1])}L${o(h[0])} ${o(h[1])}`;
  }
  return s;
}
function k(e, a, l, r, s) {
  if (!a.spots) return null;
  let n = a.spots,
    d = i(53 * s + 11 * r.length + Math.round(10 * a.from)),
    h = n.rows ?? 0,
    c = [];
  if (h > 0) {
    let t = Math.max(1, Math.round(n.n / h));
    for (let r = 0; r < h; r++)
      for (let o = 0; o < t; o++) c.push(p(e, a, l, (o + 0.5 + (r % 2) * 0.3) / (t + 0.3), (r + 0.7) / (h + 0.4)));
  } else for (let t = 0; t < n.n; t++) c.push(p(e, a, l, 0.08 + 0.84 * d(), 0.15 + 0.7 * d()));
  return (
    <g key={r} fill={n.fill}>
      {c.map(([e, a], l) => (
        <circle key={l} cx={o(e)} cy={o(a)} r={o(n.r)} />
      ))}
    </g>
  );
}
let b = {
    body: 81,
    depth: 21,
    peak: 0.42,
    belly: 0.48,
    down: 0.5,
    head: [1.9, 0.75],
    chin: [1.6, 0.8],
    ped: 0.4,
    tail: {
      kind: "notch",
      h: 1.05,
    },
    eye: {
      x: 10.5,
      r: 1.8,
    },
    mouth: {
      y: 0.6,
      jaw: 15.5,
    },
    gill: 19.5,
    dorsal: [
      {
        from: 38,
        to: 50,
        h: 9,
      },
      {
        from: 69,
        to: 73.5,
        h: 3.2,
        kind: "adipose",
      },
    ],
    anal: {
      from: 63,
      to: 71,
      h: 7,
    },
    pelvic: {
      x: 46,
      h: 5,
    },
    pectoral: {
      x: 20,
      len: 8.5,
    },
  },
  y = {
    ...b,
    depth: 22,
    head: [2, 0.8],
    tail: {
      kind: "fork",
      h: 1.12,
    },
    mouth: {
      y: 0.8,
      jaw: 14,
    },
  },
  g = {
    body: 80,
    depth: 28,
    peak: 0.4,
    belly: 0.46,
    down: 0.5,
    head: [2.2, 0.62],
    chin: [1.8, 0.7],
    ped: 0.36,
    tail: {
      kind: "notch",
      h: 0.95,
    },
    eye: {
      x: 12.5,
      r: 2.2,
    },
    mouth: {
      y: -0.5,
      jaw: 13,
      drop: 2.4,
      plate: 2.4,
    },
    gill: 24,
    dorsal: [
      {
        from: 30,
        to: 50,
        h: 9,
        kind: "spiny",
        last: 0.5,
      },
      {
        from: 50.5,
        to: 73,
        h: 9.5,
      },
    ],
    anal: {
      from: 60,
      to: 72,
      h: 8,
    },
    pelvic: {
      x: 30,
      h: 6,
    },
    pectoral: {
      x: 25,
      len: 9,
    },
  },
  $ = {
    body: 81,
    depth: 23,
    peak: 0.38,
    belly: 0.5,
    down: 0.48,
    head: [1.8, 0.8],
    chin: [1.6, 0.85],
    ped: 0.34,
    tail: {
      kind: "fork",
      h: 1.05,
    },
    eye: {
      x: 11,
      r: 2.2,
    },
    mouth: {
      y: 0.6,
      jaw: 13,
    },
    gill: 22,
    dorsal: [
      {
        from: 29,
        to: 50,
        h: 9.5,
        kind: "spiny",
        last: 0.2,
      },
      {
        from: 54,
        to: 70,
        h: 7.5,
      },
    ],
    anal: {
      from: 61,
      to: 71,
      h: 6.5,
    },
    pelvic: {
      x: 29,
      h: 6,
    },
    pectoral: {
      x: 23,
      len: 8,
    },
  },
  j = {
    body: 84,
    depth: 15.5,
    peak: 0.6,
    belly: 0.55,
    down: 0.52,
    head: [1.35, 0.8],
    chin: [1.4, 0.72],
    ped: 0.48,
    tail: {
      kind: "roundlobes",
      h: 1.35,
    },
    eye: {
      x: 12.5,
      r: 1.6,
      iris: "#e8cf5c",
    },
    mouth: {
      y: 0.1,
      jaw: 13,
      drop: 0.9,
      plate: 1,
    },
    gill: 20,
    dorsal: [
      {
        from: 66,
        to: 79,
        h: 8,
      },
    ],
    anal: {
      from: 68,
      to: 80,
      h: 7,
    },
    pelvic: {
      x: 51,
      h: 5,
    },
    pectoral: {
      x: 21,
      len: 8,
    },
  },
  w = {
    body: 80,
    depth: 26,
    peak: 0.4,
    belly: 0.5,
    down: 0.46,
    head: [2, 0.72],
    chin: [1.4, 0.7],
    ped: 0.36,
    tail: {
      kind: "square",
      h: 0.95,
    },
    eye: {
      x: 11,
      r: 1.9,
    },
    mouth: {
      y: 2.2,
      jaw: 10.5,
      drop: 1.2,
      plate: 1.4,
    },
    gill: 23,
    dorsal: [
      {
        from: 29,
        to: 45,
        h: 9,
        kind: "spiny",
        last: 0.18,
      },
      {
        from: 45.5,
        to: 75,
        h: 7,
      },
    ],
    anal: {
      from: 62,
      to: 69,
      h: 7,
    },
    pelvic: {
      x: 30,
      h: 6,
    },
    pectoral: {
      x: 24,
      len: 9,
    },
  };
function v(e, t) {
  return {
    ...e,
    ...t,
  };
}
let M = {
    walleye: v($, {
      depth: 18.5,
      peak: 0.42,
      head: [1.7, 0.9],
      eye: {
        x: 10.5,
        r: 2.4,
        iris: "#dfe0c6",
      },
      mouth: {
        y: 0.8,
        jaw: 14.5,
      },
      dorsal: [
        {
          from: 30,
          to: 50,
          h: 9,
          kind: "spiny",
          last: 0.3,
          blotch: "#1c1a12",
        },
        {
          from: 53,
          to: 70,
          h: 7.5,
        },
      ],
      anal: {
        from: 63,
        to: 73,
        h: 6.5,
        tip: "#fbfaf2",
      },
      tail: {
        kind: "fork",
        h: 1.1,
        tipWhite: true,
      },
      colors: {
        back: "#50532c",
        side: "#b9a557",
        belly: "#f1ecd6",
        fin: "#a79355",
      },
      marks: [
        {
          k: "saddles",
          fill: "#3f3f1f",
          n: 6,
          u: [0.3, 0.92],
          reach: 0.55,
          op: 0.35,
        },
        {
          k: "mottle",
          fill: "#6b6331",
          n: 30,
          r: [0.5, 1],
          op: 0.35,
          v: [-0.9, 0.2],
        },
      ],
    }),
    sauger: v($, {
      depth: 16.5,
      peak: 0.45,
      head: [1.6, 0.92],
      eye: {
        x: 10.5,
        r: 2.1,
        iris: "#dcd8b8",
      },
      mouth: {
        y: 0.8,
        jaw: 14,
      },
      dorsal: [
        {
          from: 30,
          to: 50,
          h: 8.5,
          kind: "spiny",
          last: 0.3,
          spots: {
            fill: "#1d1a12",
            n: 18,
            r: 0.75,
            rows: 3,
          },
        },
        {
          from: 53,
          to: 70,
          h: 7,
          spots: {
            fill: "#2a2518",
            n: 10,
            r: 0.55,
            rows: 2,
          },
        },
      ],
      anal: {
        from: 63,
        to: 73,
        h: 6,
      },
      tail: {
        kind: "fork",
        h: 1.1,
        spots: {
          fill: "#2a2518",
          n: 18,
          r: 0.5,
        },
      },
      colors: {
        back: "#56462d",
        side: "#a88f62",
        belly: "#efe7d4",
        fin: "#b09a70",
      },
      marks: [
        {
          k: "saddles",
          fill: "#2f261a",
          n: 4,
          u: [0.3, 0.86],
          reach: 1.05,
          op: 0.72,
        },
        {
          k: "mottle",
          fill: "#3b3020",
          n: 26,
          r: [0.5, 1.1],
          op: 0.5,
          v: [-0.9, 0.3],
        },
      ],
    }),
    "yellow-perch": v($, {
      colors: {
        back: "#56672a",
        side: "#d6bf45",
        belly: "#f3efd6",
        fin: "#b9a45a",
      },
      lowerFin: "#e0782e",
      marks: [
        {
          k: "bars",
          fill: "#34431b",
          n: 7,
          u: [0.3, 0.9],
          v: [-1, 0.45],
          w: 3.6,
          op: 0.78,
        },
      ],
    }),
    "smallmouth-bass": v(g, {
      depth: 26,
      eye: {
        x: 12.5,
        r: 2.2,
        iris: "#c0472d",
      },
      mouth: {
        y: -0.5,
        jaw: 12.5,
        drop: 2.2,
        plate: 2.2,
      },
      dorsal: [
        {
          from: 30,
          to: 50,
          h: 8.5,
          kind: "spiny",
          last: 0.62,
        },
        {
          from: 50,
          to: 73,
          h: 9.5,
        },
      ],
      colors: {
        back: "#5b5327",
        side: "#a88748",
        belly: "#efe2c2",
        fin: "#9c8248",
      },
      marks: [
        {
          k: "bars",
          fill: "#4a3918",
          n: 11,
          u: [0.3, 0.95],
          v: [-0.9, 0.35],
          w: 2.3,
          op: 0.5,
        },
        {
          k: "cheek",
          stroke: "#4a3918",
        },
      ],
    }),
    "largemouth-bass": v(g, {
      eye: {
        x: 12.5,
        r: 2.2,
        iris: "#d9b24a",
      },
      mouth: {
        y: -0.5,
        jaw: 18.4,
        drop: 2.8,
        plate: 2.8,
      },
      dorsal: [
        {
          from: 30,
          to: 48.5,
          h: 9.5,
          kind: "spiny",
          last: 0.12,
        },
        {
          from: 51,
          to: 73,
          h: 9.5,
        },
      ],
      colors: {
        back: "#3c5627",
        side: "#8fa75a",
        belly: "#f1eed9",
        fin: "#8c9a60",
      },
      marks: [
        {
          k: "stripe",
          fill: "#27361a",
          u: [0.3, 1],
          v: 0.02,
          w: 5,
        },
      ],
    }),
    "northern-pike": v(j, {
      pores: 5,
      colors: {
        back: "#2c4428",
        side: "#56773c",
        belly: "#f0eed6",
        fin: "#b0773c",
      },
      marks: [
        {
          k: "beans",
          fill: "#e6df9e",
          u: [0.26, 1],
          rows: [-0.62, -0.3, 0.02, 0.34, 0.62],
          step: 4,
          r: 0.75,
        },
      ],
      tail: {
        kind: "roundlobes",
        h: 1.35,
        spots: {
          fill: "#3a3a22",
          n: 10,
          r: 0.7,
        },
      },
      dorsal: [
        {
          from: 66,
          to: 79,
          h: 8,
          spots: {
            fill: "#3a3a22",
            n: 7,
            r: 0.65,
          },
        },
      ],
      anal: {
        from: 68,
        to: 80,
        h: 7,
        spots: {
          fill: "#3a3a22",
          n: 5,
          r: 0.6,
        },
      },
    }),
    muskellunge: v(j, {
      depth: 16,
      pores: 7,
      tail: {
        kind: "pointlobes",
        h: 1.35,
        spots: {
          fill: "#4a3a26",
          n: 12,
          r: 0.7,
        },
      },
      colors: {
        back: "#6a6843",
        side: "#c3bb93",
        belly: "#f4f1e6",
        fin: "#9f6a42",
      },
      marks: [
        {
          k: "bars",
          fill: "#4c4629",
          n: 15,
          u: [0.25, 0.98],
          v: [-0.95, 0.5],
          w: 2.2,
          broken: true,
        },
      ],
      dorsal: [
        {
          from: 66,
          to: 79,
          h: 8,
          spots: {
            fill: "#4a3a26",
            n: 7,
            r: 0.65,
          },
        },
      ],
      anal: {
        from: 68,
        to: 80,
        h: 7,
        spots: {
          fill: "#4a3a26",
          n: 5,
          r: 0.6,
        },
      },
    }),
    "lake-trout": v(b, {
      depth: 20,
      tail: {
        kind: "deepfork",
        h: 1.45,
        spots: {
          fill: "#e4e7d4",
          n: 16,
          r: 0.55,
        },
      },
      mouth: {
        y: 0.6,
        jaw: 16.5,
      },
      colors: {
        back: "#46534f",
        side: "#7d8a83",
        belly: "#eef0e8",
        fin: "#72807a",
      },
      lowerFin: "#c1875a",
      lowerFinEdge: "#f3efe2",
      dorsal: [
        {
          from: 38,
          to: 50,
          h: 9,
          spots: {
            fill: "#e4e7d4",
            n: 9,
            r: 0.55,
          },
        },
        {
          from: 69,
          to: 73.5,
          h: 3.2,
          kind: "adipose",
        },
      ],
      marks: [
        {
          k: "spots",
          fill: "#e6e9d6",
          r: [0.45, 0.85],
          n: 120,
          u: [0.12, 1],
          v: [-0.95, 0.4],
        },
      ],
    }),
    "brook-trout": v(b, {
      depth: 22,
      tail: {
        kind: "square",
        h: 1.02,
        spots: {
          fill: "#232b1d",
          n: 14,
          r: 0.6,
        },
      },
      mouth: {
        y: 0.6,
        jaw: 16.5,
      },
      colors: {
        back: "#27351f",
        side: "#5d6b43",
        belly: "#eec48e",
        fin: "#6b6a3c",
      },
      lowerFin: "#d9622b",
      lowerFinEdge: "#fbfaf2",
      dorsal: [
        {
          from: 38,
          to: 50,
          h: 9,
          worms: "#1e2517",
          fill: "#a39855",
        },
        {
          from: 69,
          to: 73.5,
          h: 3.2,
          kind: "adipose",
        },
      ],
      marks: [
        {
          k: "worms",
          stroke: "#d8cf85",
          n: 110,
          u: [0.08, 1],
          v: [-1, -0.2],
        },
        {
          k: "spots",
          fill: "#e2d37d",
          r: [0.45, 0.75],
          n: 34,
          u: [0.24, 0.98],
          v: [-0.2, 0.45],
          seed: 4,
        },
        {
          k: "spots",
          fill: "#d83a2e",
          halo: "#6fa3db",
          r: [0.55, 0.75],
          n: 14,
          u: [0.26, 0.95],
          v: [-0.15, 0.4],
          seed: 9,
        },
        {
          k: "band",
          fill: "#e87b3c",
          v: 0.82,
          w: 3,
          op: 0.55,
          u: [0.14, 0.95],
        },
      ],
    }),
    "brown-trout": v(b, {
      tail: {
        kind: "square",
        h: 1.02,
      },
      mouth: {
        y: 0.6,
        jaw: 16.5,
      },
      colors: {
        back: "#5b4424",
        side: "#bf9a4f",
        belly: "#f3e3b4",
        fin: "#a78a52",
      },
      dorsal: [
        {
          from: 38,
          to: 50,
          h: 9,
          spots: {
            fill: "#2a1d10",
            n: 8,
            r: 0.55,
          },
        },
        {
          from: 69,
          to: 73.5,
          h: 3.2,
          kind: "adipose",
          fill: "#c96a3a",
        },
      ],
      marks: [
        {
          k: "spots",
          fill: "#24180c",
          halo: "#efdcb4",
          r: [0.55, 0.95],
          n: 38,
          u: [0.2, 0.92],
          v: [-0.9, 0.05],
          seed: 2,
        },
        {
          k: "spots",
          fill: "#24180c",
          r: [0.4, 0.6],
          n: 6,
          u: [0.16, 0.22],
          v: [-0.6, 0.1],
          seed: 8,
        },
        {
          k: "spots",
          fill: "#c4492a",
          halo: "#f3e2c0",
          r: [0.5, 0.75],
          n: 14,
          u: [0.28, 0.95],
          v: [0.05, 0.45],
          seed: 6,
        },
      ],
    }),
    "rainbow-trout": v(b, {
      tail: {
        kind: "notch",
        h: 1.08,
        spots: {
          fill: "#1f2420",
          n: 34,
          r: 0.45,
        },
      },
      colors: {
        back: "#4b5c41",
        side: "#c7cdbf",
        belly: "#f6f5ef",
        fin: "#9aa08a",
      },
      dorsal: [
        {
          from: 38,
          to: 50,
          h: 9,
          spots: {
            fill: "#1f2420",
            n: 12,
            r: 0.45,
          },
        },
        {
          from: 69,
          to: 73.5,
          h: 3.2,
          kind: "adipose",
        },
      ],
      marks: [
        {
          k: "band",
          fill: "#d9707e",
          v: 0.05,
          w: 5,
          op: 0.6,
          u: [0.12, 1],
        },
        {
          k: "spots",
          fill: "#1f2420",
          r: [0.3, 0.55],
          n: 80,
          u: [0.12, 1],
          v: [-0.95, 0.1],
        },
      ],
    }),
    steelhead: v(b, {
      depth: 20,
      tail: {
        kind: "notch",
        h: 1.08,
        spots: {
          fill: "#1f2420",
          n: 30,
          r: 0.42,
        },
      },
      colors: {
        back: "#48606e",
        side: "#dce2e3",
        belly: "#f8f9f7",
        fin: "#a4acae",
      },
      dorsal: [
        {
          from: 38,
          to: 50,
          h: 9,
          spots: {
            fill: "#1f2420",
            n: 10,
            r: 0.42,
          },
        },
        {
          from: 69,
          to: 73.5,
          h: 3.2,
          kind: "adipose",
        },
      ],
      marks: [
        {
          k: "band",
          fill: "#e3a0a6",
          v: 0.05,
          w: 4,
          op: 0.35,
          u: [0.12, 1],
        },
        {
          k: "spots",
          fill: "#1f2420",
          r: [0.28, 0.48],
          n: 50,
          u: [0.15, 1],
          v: [-0.95, -0.2],
        },
      ],
    }),
    "chinook-salmon": v(y, {
      depth: 23,
      tail: {
        kind: "fork",
        h: 1.12,
        spots: {
          fill: "#1d2226",
          n: 30,
          r: 0.5,
        },
      },
      colors: {
        back: "#3f606a",
        side: "#d5dcdf",
        belly: "#f7f8f6",
        fin: "#8f9ea3",
      },
      marks: [
        {
          k: "spots",
          fill: "#1d2226",
          r: [0.35, 0.6],
          n: 60,
          u: [0.15, 1],
          v: [-0.95, -0.3],
        },
      ],
    }),
    "coho-salmon": v(y, {
      tail: {
        kind: "fork",
        h: 1.1,
        spots: {
          fill: "#1d2226",
          n: 14,
          r: 0.45,
          lobe: "upper",
        },
      },
      colors: {
        back: "#35607e",
        side: "#d9e0e4",
        belly: "#f7f8f6",
        fin: "#90a1ab",
      },
      marks: [
        {
          k: "spots",
          fill: "#1d2226",
          r: [0.3, 0.5],
          n: 34,
          u: [0.2, 1],
          v: [-0.95, -0.45],
        },
      ],
    }),
    "atlantic-salmon": v(y, {
      depth: 20,
      ped: 0.3,
      tail: {
        kind: "fork",
        h: 1.12,
      },
      colors: {
        back: "#43555f",
        side: "#cfd6d6",
        belly: "#f6f7f5",
        fin: "#8b979b",
      },
      marks: [
        {
          k: "spots",
          fill: "#1f2224",
          r: [0.45, 0.7],
          n: 22,
          u: [0.12, 0.7],
          v: [-0.9, -0.1],
          x: true,
        },
      ],
    }),
    kokanee: v(y, {
      depth: 20,
      colors: {
        back: "#2d5873",
        side: "#e0e7ea",
        belly: "#f8f9f8",
        fin: "#8fa3ad",
      },
      marks: [
        {
          k: "spots",
          fill: "#23394a",
          r: [0.2, 0.35],
          n: 30,
          u: [0.2, 1],
          v: [-0.95, -0.55],
        },
      ],
    }),
    "lake-whitefish": v(y, {
      depth: 23,
      peak: 0.36,
      head: [2.4, 0.9],
      tail: {
        kind: "deepfork",
        h: 1.2,
      },
      eye: {
        x: 9.5,
        r: 1.8,
        iris: "#dcdcc8",
      },
      mouth: {
        y: 1.4,
        jaw: 6.5,
        drop: 0.6,
        plate: 0.8,
      },
      colors: {
        back: "#6a756f",
        side: "#dfe3df",
        belly: "#f7f7f3",
        fin: "#b9bcb2",
      },
      marks: [
        {
          k: "lines",
          stroke: "#b7beba",
          v: [-0.7, -0.4, -0.1, 0.2],
          w: 0.25,
        },
      ],
    }),
    "arctic-grayling": v(b, {
      depth: 19,
      tail: {
        kind: "fork",
        h: 1.1,
      },
      mouth: {
        y: 1,
        jaw: 8.5,
      },
      dorsal: [
        {
          from: 26,
          to: 55,
          h: 16,
          kind: "sail",
          fill: "#5f5a78",
          edge: "#d24c4c",
          spots: {
            fill: "#63c3c6",
            n: 16,
            r: 0.7,
          },
        },
        {
          from: 70,
          to: 74,
          h: 3,
          kind: "adipose",
        },
      ],
      colors: {
        back: "#4b4f63",
        side: "#aaa8b9",
        belly: "#eeeaf0",
        fin: "#8e8aa0",
      },
      marks: [
        {
          k: "spots",
          fill: "#2a2a33",
          r: [0.35, 0.6],
          n: 14,
          u: [0.15, 0.45],
          v: [-0.8, 0.1],
        },
      ],
    }),
    burbot: v($, {
      body: 90,
      depth: 13.5,
      peak: 0.3,
      belly: 0.35,
      down: 0.5,
      head: [1.6, 0.6],
      chin: [1.4, 0.7],
      ped: 0.55,
      tail: {
        kind: "round",
        h: 1.1,
      },
      eye: {
        x: 7,
        r: 1.1,
        iris: "#c9b56a",
      },
      mouth: {
        y: 0.9,
        jaw: 8.5,
        drop: 1,
        plate: 1,
      },
      gill: 15,
      barbels: "one",
      dorsal: [
        {
          from: 29,
          to: 37,
          h: 3.5,
        },
        {
          from: 39,
          to: 88,
          h: 5,
          kind: "soft",
        },
      ],
      anal: {
        from: 52,
        to: 88,
        h: 4.5,
      },
      pelvic: {
        x: 15,
        h: 5,
      },
      pectoral: {
        x: 16,
        len: 6,
      },
      colors: {
        back: "#57502c",
        side: "#9c8b4f",
        belly: "#e3dcc0",
        fin: "#8a7d4c",
      },
      marks: [
        {
          k: "mottle",
          fill: "#3b3420",
          n: 70,
          r: [0.6, 1.4],
          op: 0.6,
          v: [-1, 0.6],
        },
      ],
    }),
    redfish: v(w, {
      colors: {
        back: "#86532c",
        side: "#cb8a4c",
        belly: "#f3e7d6",
        fin: "#b27a4c",
      },
      marks: [
        {
          k: "lines",
          stroke: "#a86a38",
          v: [-0.7, -0.45, -0.2, 0.05],
          w: 0.3,
          u: [0.3, 1],
        },
        {
          k: "tailspot",
          fill: "#15120f",
          ring: "#f0d9b8",
          r: 1.7,
        },
      ],
    }),
    "black-drum": v(w, {
      depth: 34,
      peak: 0.36,
      head: [2.5, 0.72],
      barbels: "chin",
      eye: {
        x: 11.5,
        r: 2,
        iris: "#c9c2a8",
      },
      dorsal: [
        {
          from: 28,
          to: 44,
          h: 11,
          kind: "spiny",
          last: 0.2,
        },
        {
          from: 45,
          to: 73,
          h: 8,
        },
      ],
      colors: {
        back: "#35373a",
        side: "#8a8d90",
        belly: "#d9dadb",
        fin: "#3a3b3e",
      },
      marks: [
        {
          k: "bars",
          fill: "#26272a",
          n: 4,
          u: [0.3, 0.86],
          v: [-1, 0.75],
          w: 5,
          op: 0.45,
        },
      ],
    }),
    "speckled-trout": v(w, {
      depth: 21,
      peak: 0.42,
      head: [1.8, 0.85],
      chin: [1.5, 0.85],
      down: 0.5,
      ped: 0.32,
      tail: {
        kind: "notch",
        h: 1.02,
        spots: {
          fill: "#1b1f22",
          n: 22,
          r: 0.55,
        },
        margin: "#1b1f22",
      },
      eye: {
        x: 10.5,
        r: 1.8,
        iris: "#d9d4b8",
      },
      mouth: {
        y: 0.4,
        jaw: 15.5,
        canines: true,
      },
      dorsal: [
        {
          from: 29,
          to: 43,
          h: 9,
          kind: "spiny",
          last: 0.2,
        },
        {
          from: 44.5,
          to: 73,
          h: 6.5,
          spots: {
            fill: "#1b1f22",
            n: 16,
            r: 0.5,
          },
        },
      ],
      colors: {
        back: "#465a66",
        side: "#d3d9dc",
        belly: "#f7f8f7",
        fin: "#a9b0b0",
      },
      marks: [
        {
          k: "spots",
          fill: "#1b1f22",
          r: [0.45, 0.75],
          n: 64,
          u: [0.2, 1],
          v: [-0.95, -0.02],
        },
      ],
    }),
    snook: v($, {
      depth: 20,
      head: [1.4, 1],
      chin: [1.6, 0.95],
      eye: {
        x: 11,
        r: 1.9,
        iris: "#d9cc8a",
      },
      mouth: {
        y: 0.8,
        jaw: 14.5,
      },
      dorsal: [
        {
          from: 31,
          to: 45,
          h: 11,
          kind: "spiny",
          last: 0.12,
        },
        {
          from: 50,
          to: 64,
          h: 8,
        },
      ],
      colors: {
        back: "#6a6848",
        side: "#d8d8c7",
        belly: "#f8f8f3",
        fin: "#c9b76a",
      },
      marks: [
        {
          k: "lateral",
          stroke: "#15150f",
          w: 0.9,
          v: -0.12,
        },
      ],
    }),
    "striped-bass": v($, {
      depth: 23,
      head: [1.9, 0.85],
      dorsal: [
        {
          from: 29,
          to: 46,
          h: 9.5,
          kind: "spiny",
          last: 0.2,
        },
        {
          from: 50,
          to: 68,
          h: 8,
        },
      ],
      colors: {
        back: "#3d4d59",
        side: "#dadfe1",
        belly: "#f8f9f9",
        fin: "#a8b0b4",
      },
      marks: [
        {
          k: "lines",
          stroke: "#2b3035",
          v: [-0.8, -0.58, -0.36, -0.14, 0.08, 0.3, 0.5],
          w: 0.6,
          u: [0.24, 1],
        },
      ],
    }),
    "black-crappie": v(g, {
      depth: 40,
      peak: 0.44,
      belly: 0.5,
      head: [1.6, 0.8],
      ped: 0.3,
      eye: {
        x: 13,
        r: 2.5,
        iris: "#c9b98a",
      },
      mouth: {
        y: -1.6,
        jaw: 15,
        drop: 2.4,
        plate: 2,
      },
      dorsal: [
        {
          from: 36,
          to: 48,
          h: 10,
          kind: "spiny",
          last: 0.75,
          spots: {
            fill: "#2e3228",
            n: 8,
            r: 0.8,
          },
        },
        {
          from: 48,
          to: 72,
          h: 13,
          spots: {
            fill: "#2e3228",
            n: 14,
            r: 0.9,
          },
        },
      ],
      anal: {
        from: 46,
        to: 72,
        h: 12,
        spots: {
          fill: "#2e3228",
          n: 12,
          r: 0.9,
        },
      },
      colors: {
        back: "#50584a",
        side: "#cfd3c2",
        belly: "#f2f1ea",
        fin: "#aab09c",
      },
      tail: {
        kind: "notch",
        h: 0.9,
        spots: {
          fill: "#2e3228",
          n: 14,
          r: 0.8,
        },
      },
      marks: [
        {
          k: "mottle",
          fill: "#2f3328",
          n: 60,
          r: [0.6, 1.4],
          op: 0.8,
        },
      ],
    }),
    bluegill: v(g, {
      depth: 45,
      peak: 0.46,
      belly: 0.5,
      head: [1.5, 0.75],
      chin: [1.4, 0.75],
      ped: 0.28,
      eye: {
        x: 13.5,
        r: 2.4,
        iris: "#5a4a38",
      },
      mouth: {
        y: -0.6,
        jaw: 7.5,
        drop: 0.9,
        plate: 1,
      },
      gill: 25,
      dorsal: [
        {
          from: 34,
          to: 50,
          h: 9,
          kind: "spiny",
          last: 0.8,
        },
        {
          from: 50,
          to: 73,
          h: 11,
          blotch: "#1d1f22",
        },
      ],
      anal: {
        from: 50,
        to: 72,
        h: 10,
      },
      pelvic: {
        x: 33,
        h: 7,
      },
      colors: {
        back: "#3f4f38",
        side: "#8e936f",
        belly: "#e3a651",
        fin: "#7c8466",
      },
      tail: {
        kind: "notch",
        h: 0.8,
      },
      marks: [
        {
          k: "bars",
          fill: "#38432f",
          n: 6,
          u: [0.35, 0.9],
          v: [-1, 0.5],
          w: 4.5,
          op: 0.3,
        },
        {
          k: "ear",
          fill: "#141516",
        },
      ],
    }),
    "channel-catfish": v($, {
      depth: 18,
      peak: 0.3,
      belly: 0.35,
      head: [1.3, 0.55],
      chin: [1.2, 0.6],
      ped: 0.36,
      tail: {
        kind: "deepfork",
        h: 1.3,
      },
      eye: {
        x: 9,
        r: 1.2,
        iris: "#b9ae8a",
      },
      mouth: {
        y: 1.4,
        jaw: 7.5,
        drop: 0.8,
        plate: 0.9,
      },
      gill: 18,
      barbels: "cat",
      dorsal: [
        {
          from: 27,
          to: 34,
          h: 11,
        },
        {
          from: 71,
          to: 77,
          h: 3.5,
          kind: "adipose",
        },
      ],
      anal: {
        from: 58,
        to: 80,
        h: 6,
      },
      pelvic: {
        x: 45,
        h: 5,
      },
      colors: {
        back: "#4a5b6a",
        side: "#8d9eab",
        belly: "#eef0ee",
        fin: "#6f7e89",
      },
      marks: [
        {
          k: "spots",
          fill: "#23282c",
          r: [0.35, 0.6],
          n: 26,
          u: [0.2, 0.95],
          v: [-0.7, 0.3],
        },
      ],
    }),
    halibut: v($, {
      body: 83,
      depth: 36,
      peak: 0.44,
      belly: 0.44,
      down: 0.5,
      head: [1.5, 0.85],
      chin: [1.5, 0.85],
      ped: 0.2,
      tail: {
        kind: "lunate",
        h: 1,
      },
      eye: {
        x: 9,
        r: 1.8,
        iris: "#cdbf8a",
        two: true,
      },
      mouth: {
        y: 1.2,
        jaw: 10,
        drop: 1.6,
        plate: 1.2,
      },
      gill: 18,
      dorsal: [
        {
          from: 12,
          to: 80,
          h: 5,
        },
      ],
      anal: {
        from: 24,
        to: 80,
        h: 5,
      },
      pelvic: undefined,
      pectoral: {
        x: 19,
        len: 7,
      },
      colors: {
        back: "#4e4d33",
        side: "#6e6947",
        belly: "#6a6443",
        fin: "#5c5a3c",
      },
      marks: [
        {
          k: "mottle",
          fill: "#34331f",
          n: 40,
          r: [1, 2.4],
          op: 0.45,
        },
        {
          k: "mottle",
          fill: "#a39c72",
          n: 26,
          r: [0.6, 1.4],
          op: 0.35,
        },
        {
          k: "lateral",
          stroke: "#3a3822",
          w: 0.35,
          v: 0,
        },
      ],
    }),
    lingcod: v($, {
      depth: 18,
      peak: 0.34,
      head: [1.5, 0.95],
      ped: 0.34,
      tail: {
        kind: "square",
        h: 1.05,
      },
      eye: {
        x: 11,
        r: 1.7,
        iris: "#c8b27a",
      },
      mouth: {
        y: 0.3,
        jaw: 19,
        drop: 2.6,
        plate: 2.2,
      },
      gill: 25,
      dorsal: [
        {
          from: 26,
          to: 50,
          h: 8,
          kind: "spiny",
          last: 0.35,
        },
        {
          from: 51,
          to: 80,
          h: 8,
        },
      ],
      anal: {
        from: 56,
        to: 80,
        h: 6,
      },
      pectoral: {
        x: 26,
        len: 12,
      },
      colors: {
        back: "#544c3c",
        side: "#8b8168",
        belly: "#e8e2d2",
        fin: "#72684f",
      },
      marks: [
        {
          k: "mottle",
          fill: "#3a3228",
          n: 50,
          r: [0.9, 2],
          op: 0.55,
          v: [-1, 0.4],
        },
        {
          k: "mottle",
          fill: "#c49a55",
          n: 24,
          r: [0.4, 0.9],
          op: 0.5,
          v: [-0.8, 0.3],
        },
      ],
    }),
  },
  L = {
    torpedo: "striped-bass",
    deep: "black-crappie",
    trout: "rainbow-trout",
    flat: "halibut",
    eel: "burbot",
  };
export const FishArt = function ({ look: e, seed: l = 1, ghost: r = false, detail: s = true, outline: n = 1.2 }) {
  var h, f, u, b;
  let y,
    g,
    $,
    j,
    w,
    v,
    M,
    L,
    N,
    W,
    A,
    C,
    Q,
    S,
    F = "fa" + (0, a.useId)().replace(/[^a-zA-Z0-9]/g, ""),
    T = c(e),
    B = (function (e) {
      let t = Array.from(
          {
            length: 45,
          },
          (e, t) => Math.pow(t / 44, 1.5),
        ),
        a = "M0 0";
      for (let l of t.slice(1)) a += `L${o(l * e.B)} ${o(e.top(l * e.B))}`;
      for (let l of [...t].reverse()) a += `L${o(l * e.B)} ${o(e.bot(l * e.B))}`;
      return a + "Z";
    })(T),
    P = (function (e) {
      let t,
        a,
        l,
        r,
        { B: s } = e,
        i = 100 - s,
        n = e.top(s) + 0.4,
        d = e.bot(s) - 0.4,
        h = e.tailTop,
        c = e.tailBot,
        f = c - h,
        p = e.tailMid,
        m = s - 1.5,
        u = e.L.tail.kind;
      if ("round" === u) {
        let e = `M${o(m)} ${o(n)}C${o(s + 0.3 * i)} ${o(n)} ${o(100 - 0.35 * i)} ${o(h)} ${o(100 - 0.16 * i)} ${o(h + 0.04 * f)}`,
          t = `C${o(100 + 0.08 * i)} ${o(h + 0.22 * f)} ${o(100 + 0.08 * i)} ${o(c - 0.22 * f)} ${o(100 - 0.16 * i)} ${o(c - 0.04 * f)}`;
        return {
          outline: e + t + `C${o(100 - 0.35 * i)} ${o(c)} ${o(s + 0.3 * i)} ${o(d)} ${o(m)} ${o(d)}Z`,
          trailing: `M${o(100 - 0.16 * i)} ${o(h + 0.04 * f)}` + t,
        };
      }
      let x =
          ("deepfork" === u
            ? 0.72
            : "fork" === u
              ? 0.45
              : "pointlobes" === u
                ? 0.5
                : "roundlobes" === u
                  ? 0.4
                  : "lunate" === u
                    ? 0.42
                    : "notch" === u
                      ? 0.2
                      : 0.06) * i,
        k = 100 - x,
        b = "lunate" === u ? 0.28 : "deepfork" === u ? 0.22 : "square" === u || "notch" === u ? 0.08 : 0.16;
      if ("roundlobes" === u)
        ((l = [100 - 0.02 * i, h + 0.13 * f]),
          (r = [100 - 0.02 * i, c - 0.13 * f]),
          (t = `C${o(s + 0.35 * i)} ${o(n)} ${o(100 - 0.4 * i)} ${o(h)} ${o(100 - 0.14 * i)} ${o(h)}Q${o(100 + 0.05 * i)} ${o(h)} ${o(l[0])} ${o(l[1])}`),
          (a = `Q${o(100 + 0.05 * i)} ${o(c)} ${o(100 - 0.14 * i)} ${o(c)}C${o(100 - 0.4 * i)} ${o(c)} ${o(s + 0.35 * i)} ${o(d)} ${o(m)} ${o(d)}Z`));
      else {
        let e = 0.06 * ("pointlobes" === u || "lunate" === u);
        ((l = [100 + i * e, h]), (r = [100 + i * e, c]));
        let p = "lunate" === u ? 0.55 : 0.35;
        ((t = `C${o(s + 0.35 * i)} ${o(n)} ${o(100 - i * p)} ${o(h + 0.1 * f)} ${o(l[0])} ${o(l[1])}`),
          (a = `C${o(100 - i * p)} ${o(c - 0.1 * f)} ${o(s + 0.35 * i)} ${o(d)} ${o(m)} ${o(d)}Z`));
      }
      let y = `Q${o(k + 0.35 * x)} ${o(p - f * b)} ${o(k)} ${o(p)}Q${o(k + 0.35 * x)} ${o(p + f * b)} ${o(r[0])} ${o(r[1])}`;
      return {
        outline: `M${o(m)} ${o(n)}` + t + y + a,
        trailing: `M${o(l[0])} ${o(l[1])}` + y,
      };
    })(T),
    z = e.colors,
    Z = d(z.back, "#10140f", 0.55);
  if (r)
    return (
      <g fill="none" stroke="currentColor" strokeWidth={n} strokeDasharray="5 4" vectorEffect="non-scaling-stroke">
        <path d={P.outline} vectorEffect="non-scaling-stroke" />
        <path d={B} vectorEffect="non-scaling-stroke" />
      </g>
    );
  let q = e.lowerFin ?? z.fin,
    I = d(z.fin, "#10140f", 0.45),
    O = e.mouth.y,
    E = e.mouth.jaw,
    D = e.mouth.y + (e.mouth.drop ?? 1.2),
    K = e.mouth.plate ?? 1.1,
    R = e.eye,
    G = e.dorsal.map((e, a) => {
      let r;
      return (
        <g key={`d${a}`}>
          <path
            d={m(T, e, true)}
            fill={e.fill ?? z.fin}
            stroke={Z}
            strokeWidth={0.8 * n}
            vectorEffect="non-scaling-stroke"
            strokeLinejoin="round"
          />
          {e.edge && (
            <path
              d={m(
                T,
                {
                  ...e,
                  h: e.h,
                },
                true,
              )}
              fill="none"
              stroke={e.edge}
              strokeWidth="0.9"
              opacity="0.9"
            />
          )}
          {s && <path d={x(T, e, true)} stroke={I} strokeWidth="0.18" opacity="0.55" />}
          {e.worms && (
            <g stroke={e.worms} strokeWidth="0.5" fill="none" strokeLinecap="round">
              {[0.2, 0.45, 0.7].map((a) => {
                let l = p(T, e, true, 0.06, a),
                  r = p(T, e, true, 0.5, a + 0.08),
                  s = p(T, e, true, 0.94, a);
                return <path key={a} d={`M${o(l[0])} ${o(l[1])}Q${o(r[0])} ${o(r[1] - 1.2)} ${o(s[0])} ${o(s[1])}`} />;
              })}
            </g>
          )}
          {s && k(T, e, true, `ds${a}`, l)}
          {e.blotch &&
            ((r = p(T, e, true, 0.9, 0.2)),
            (
              <g clipPath={`url(#${F}d${a})`}>
                <ellipse cx={o(r[0])} cy={o(r[1])} rx={o((e.to - e.from) * 0.16)} ry={o(0.42 * e.h)} fill={e.blotch} />
              </g>
            ))}
        </g>
      );
    }),
    H = e.anal,
    Y = e.lowerFinEdge;
  return (
    <g>
      <defs>
        <linearGradient id={`${F}b`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={z.back} />
          <stop offset="0.42" stopColor={z.side} />
          <stop offset="0.66" stopColor={z.side} />
          <stop offset="1" stopColor={z.belly} />
        </linearGradient>
        <clipPath id={`${F}c`}>
          <path d={B} />
        </clipPath>
        <clipPath id={`${F}t`}>
          <path d={P.outline} />
        </clipPath>
        <clipPath id={`${F}an`}>
          <path d={m(T, e.anal, false)} />
        </clipPath>
        {e.dorsal.map((e, a) => (
          <clipPath key={a} id={`${F}d${a}`}>
            <path d={m(T, e, true)} />
          </clipPath>
        ))}
      </defs>
      {G}
      <path
        d={m(T, H, false)}
        fill={H.fill ?? q}
        stroke={Z}
        strokeWidth={0.8 * n}
        vectorEffect="non-scaling-stroke"
        strokeLinejoin="round"
      />
      {s && <path d={x(T, H, false)} stroke={I} strokeWidth="0.18" opacity="0.5" />}
      {s && k(T, H, false, "as", l)}
      {H.tip &&
        ((y = p(T, H, false, 0.12, 1)),
        (
          <g clipPath={`url(#${F}an)`}>
            <ellipse cx={o(y[0])} cy={o(y[1])} rx={o((H.to - H.from) * 0.32)} ry={o(0.3 * H.h)} fill={H.tip} />
          </g>
        ))}
      {Y &&
        ((g = p(T, H, false, 0.02, 0.1)),
        ($ = p(T, H, false, 0.02, 0.98)),
        (j = p(T, H, false, 0.2, 0.95)),
        (w = p(T, H, false, 0.1, 0.1)),
        (v = p(T, H, false, 0.1, 0.9)),
        (
          <g fill="none" strokeLinecap="round">
            <path d={`M${o(w[0])} ${o(w[1])}L${o(v[0])} ${o(v[1])}`} stroke="#1b1a14" strokeWidth="0.6" />
            <path d={`M${o(g[0])} ${o(g[1])}L${o($[0])} ${o($[1])}L${o(j[0])} ${o(j[1])}`} stroke={Y} strokeWidth="1" />
          </g>
        ))}
      {e.pelvic && (
        <g>
          <path
            d={
              ((h = e.pelvic.x),
              (f = e.pelvic.h),
              (M = T.bot(h) - 0.8),
              `M${o(h - 1)} ${o(M)}Q${o(h + 1.5)} ${o(M + 0.85 * f)} ${o(h + 5.5)} ${o(M + f)}Q${o(h + 4)} ${o(M + 0.45 * f)} ${o(h + 5)} ${o(M - 0.2)}Z`)
            }
            fill={q}
            stroke={Z}
            strokeWidth={0.8 * n}
            vectorEffect="non-scaling-stroke"
            strokeLinejoin="round"
          />
          {Y && (
            <path
              d={`M${o(e.pelvic.x - 0.8)} ${o(T.bot(e.pelvic.x) - 0.6)}Q${o(e.pelvic.x + 1.5)} ${o(T.bot(e.pelvic.x) + 0.85 * e.pelvic.h)} ${o(e.pelvic.x + 5.3)} ${o(T.bot(e.pelvic.x) + e.pelvic.h)}`}
              fill="none"
              stroke={Y}
              strokeWidth="0.9"
              strokeLinecap="round"
            />
          )}
        </g>
      )}
      <path d={P.outline} fill={e.tail.fill ?? z.fin} stroke={Z} strokeWidth={n} vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
      <g clipPath={`url(#${F}t)`}>
        <rect x={e.body - 3} y={T.tailTop - 2} width={8} height={T.tailBot - T.tailTop + 4} fill={z.side} opacity="0.55" />
        {s &&
          (() => {
            let a = 100 - e.body,
              l = "";
            for (let t = 1; t < 10; t++) {
              let r = t / 10,
                s = T.tailTop + (T.tailBot - T.tailTop) * r;
              l += `M${o(e.body)} ${o(T.tailMid + (s - T.tailMid) * 0.25)}L${o(100 + 0.1 * a)} ${o(s)}`;
            }
            return <path d={l} stroke={I} strokeWidth="0.18" opacity="0.5" fill="none" />;
          })()}
        {e.tail.spots &&
          ((L = e.tail.spots),
          (N = i(29 * l + 5)),
          (W = 100 - e.body),
          (
            <g fill={L.fill}>
              {Array.from(
                {
                  length: L.n,
                },
                (a, l) => {
                  let r = N(),
                    s = e.body + 1 + r * (W - 3),
                    i = ((T.tailBot - T.tailTop) / 2) * (0.35 + 0.6 * r),
                    n = "upper" === L.lobe ? -N() : 2 * N() - 1;
                  return <circle key={l} cx={o(s)} cy={o(T.tailMid + n * i * 0.85)} r={o(L.r)} />;
                },
              )}
            </g>
          ))}
        {e.tail.tipWhite && (
          <ellipse cx="100" cy={o(T.tailBot)} rx={o((100 - e.body) * 0.5)} ry={o((T.tailBot - T.tailTop) * 0.2)} fill="#fbfaf2" />
        )}
      </g>
      {e.tail.margin && <path d={P.trailing} fill="none" stroke={e.tail.margin} strokeWidth="1.1" strokeLinecap="round" />}
      <path d={B} fill={`url(#${F}b)`} />
      <g clipPath={`url(#${F}c)`}>
        <ellipse
          cx={o(0.5 * e.body)}
          cy={o(T.at(0.5 * e.body, -0.35))}
          rx={o(0.36 * e.body)}
          ry={o(0.28 * T.Ht)}
          fill="#ffffff"
          opacity="0.1"
        />
        {e.marks.map((e, a) =>
          (function (e, a, l, r) {
            let s = e.L,
              n = i(131 * r + 17 * l + 7),
              d = (e, t, a) => e + (t - e) * a;
            switch (a.k) {
              case "spots": {
                let n = i(97 * r + (a.seed ?? l) * 13 + 3),
                  h = Array.from(
                    {
                      length: a.n,
                    },
                    () => {
                      let t = d(a.u[0], a.u[1], n()) * s.body,
                        l = d(a.v[0], a.v[1], n()),
                        r = d(a.r[0], a.r[1], n());
                      return {
                        x: t,
                        y: e.at(t, l),
                        r,
                        rot: Math.round(90 * n()),
                      };
                    },
                  );
                return (
                  <g key={l}>
                    {a.halo && h.map((e, l) => <circle key={`h${l}`} cx={o(e.x)} cy={o(e.y)} r={o(1.75 * e.r)} fill={a.halo} />)}
                    {h.map((e, l) =>
                      a.x ? (
                        <path
                          key={l}
                          d={`M${o(e.x - e.r)} ${o(e.y - e.r)}L${o(e.x + e.r)} ${o(e.y + e.r)}M${o(e.x + e.r)} ${o(e.y - e.r)}L${o(e.x - e.r)} ${o(e.y + e.r)}`}
                          stroke={a.fill}
                          strokeWidth={o(0.7 * e.r)}
                          strokeLinecap="round"
                        />
                      ) : (
                        <circle key={l} cx={o(e.x)} cy={o(e.y)} r={o(e.r)} fill={a.fill} />
                      ),
                    )}
                  </g>
                );
              }
              case "beans": {
                let r = [];
                return (
                  a.rows.forEach((t, l) => {
                    let o = a.u[0] * s.body + (l % 2 ? a.step / 2 : 0),
                      i = Math.floor(((a.u[1] - a.u[0]) * s.body) / a.step);
                    for (let l = 0; l < i; l++) {
                      let s = o + l * a.step + (n() - 0.5) * a.step * 0.35;
                      r.push({
                        x: s,
                        y: e.at(s, t + (n() - 0.5) * 0.08),
                        rot: Math.round((n() - 0.5) * 24),
                        s: 0.75 + 0.5 * n(),
                      });
                    }
                  }),
                  (
                    <g key={l} fill={a.fill}>
                      {r.map((e, l) => (
                        <ellipse
                          key={l}
                          cx={o(e.x)}
                          cy={o(e.y)}
                          rx={o(1.9 * a.r * e.s)}
                          ry={o(a.r * e.s)}
                          transform={`rotate(${e.rot} ${o(e.x)} ${o(e.y)})`}
                        />
                      ))}
                    </g>
                  )
                );
              }
              case "bars":
                return (
                  <g key={l} fill={a.fill} opacity={a.op ?? 1}>
                    {Array.from(
                      {
                        length: a.n,
                      },
                      (l, r) => {
                        let i = d(a.u[0], a.u[1], 1 === a.n ? 0.5 : r / (a.n - 1)) * s.body;
                        if (a.broken)
                          return (
                            <g key={r}>
                              {Array.from(
                                {
                                  length: 4,
                                },
                                (l, r) => {
                                  let s = d(a.v[0], a.v[1], (r + 0.5) / 4),
                                    h = i + (n() - 0.5) * a.w;
                                  return (
                                    <ellipse
                                      key={r}
                                      cx={o(h)}
                                      cy={o(e.at(h, s))}
                                      rx={o(a.w * (0.35 + 0.25 * n()))}
                                      ry={o(Math.abs(e.at(h, a.v[1]) - e.at(h, a.v[0])) / 4 / 2 + 0.5 * n())}
                                    />
                                  );
                                },
                              )}
                            </g>
                          );
                        let h = e.at(i, a.v[0]),
                          c = e.at(i, a.v[1]),
                          f = a.w;
                        return (
                          <path
                            key={r}
                            d={`M${o(i - f / 2)} ${o(h - 1)}L${o(i + f / 2)} ${o(h - 1)}Q${o(i + 0.45 * f)} ${o((h + c) / 2)} ${o(i + 0.2 * f)} ${o(c)}L${o(i - 0.2 * f)} ${o(c)}Q${o(i - 0.55 * f)} ${o((h + c) / 2)} ${o(i - f / 2)} ${o(h - 1)}Z`}
                          />
                        );
                      },
                    )}
                  </g>
                );
              case "stripe": {
                let r = a.u[0] * s.body,
                  i = a.u[1] * s.body,
                  d = Math.round((i - r) / 1.8);
                return (
                  <g key={l} fill={a.fill}>
                    {Array.from(
                      {
                        length: d,
                      },
                      (l, s) => {
                        let h = r + (s / (d - 1)) * (i - r),
                          c = 1 - 0.45 * Math.max(0, (h - r) / (i - r) - 0.6) * 2.5;
                        return (
                          <ellipse
                            key={s}
                            cx={o(h)}
                            cy={o(e.at(h, a.v) + (n() - 0.5) * a.w * 0.35)}
                            rx={o(1.6 + 0.8 * n())}
                            ry={o(a.w * c * (0.4 + 0.25 * n()))}
                          />
                        );
                      },
                    )}
                  </g>
                );
              }
              case "worms":
                return (
                  <g key={l} fill="none" stroke={a.stroke} strokeWidth="0.4" strokeLinecap="round">
                    {Array.from(
                      {
                        length: a.n,
                      },
                      (l, r) => {
                        let i = d(a.u[0], a.u[1], n()) * s.body,
                          h = e.at(i, d(a.v[0], a.v[1], n())),
                          c = n() * Math.PI,
                          f = 0.9 + 1.1 * n(),
                          p = Math.cos(c) * f,
                          m = Math.sin(c) * f * 0.6,
                          u = (n() - 0.5) * 1.6;
                        return (
                          <path
                            key={r}
                            d={`M${o(i - p)} ${o(h - m)}Q${o(i - p / 2 + u)} ${o(h - m / 2 - u)} ${o(i)} ${o(h)}T${o(i + p)} ${o(h + m)}`}
                          />
                        );
                      },
                    )}
                  </g>
                );
              case "saddles":
                return (
                  <g key={l} fill={a.fill} opacity={a.op ?? 1}>
                    {Array.from(
                      {
                        length: a.n,
                      },
                      (l, r) => {
                        let i = d(a.u[0], a.u[1], 1 === a.n ? 0.5 : r / (a.n - 1)) * s.body,
                          h = e.top(i);
                        return <ellipse key={r} cx={o(i)} cy={o(h)} rx={o(2.4 + 0.8 * n())} ry={o(-h * a.reach)} />;
                      },
                    )}
                  </g>
                );
              case "band": {
                let r = (a.u?.[0] ?? 0.18) * s.body,
                  i = (a.u?.[1] ?? 1) * s.body,
                  n = "";
                for (let t = 0; t <= 16; t++) {
                  let l = r + ((i - r) * t) / 16;
                  n += `${t ? "L" : "M"}${o(l)} ${o(e.at(l, a.v) - a.w / 2)}`;
                }
                for (let t = 16; t >= 0; t--) {
                  let l = r + ((i - r) * t) / 16;
                  n += `L${o(l)} ${o(e.at(l, a.v) + a.w / 2)}`;
                }
                return <path key={l} d={n + "Z"} fill={a.fill} opacity={a.op ?? 0.6} />;
              }
              case "lines": {
                let r = (a.u?.[0] ?? 0.22) * s.body,
                  i = (a.u?.[1] ?? 1) * s.body;
                return (
                  <g key={l} fill="none" stroke={a.stroke} strokeWidth={a.w} strokeLinecap="round">
                    {a.v.map((a, l) => {
                      let s = "";
                      for (let t = 0; t <= 14; t++) {
                        let l = r + ((i - r) * t) / 14;
                        s += `${t ? "L" : "M"}${o(l)} ${o(e.at(l, a))}`;
                      }
                      return <path key={l} d={s} />;
                    })}
                  </g>
                );
              }
              case "lateral": {
                let r = a.v ?? -0.05,
                  i = "";
                for (let t = 0; t <= 16; t++) {
                  let a = s.gill + ((s.body - s.gill) * t) / 16;
                  i += `${t ? "L" : "M"}${o(a)} ${o(e.at(a, r))}`;
                }
                return (
                  (i += `L${o(99)} ${o(e.tailMid)}`),
                  (<path key={l} d={i} fill="none" stroke={a.stroke} strokeWidth={a.w} strokeLinecap="round" />)
                );
              }
              case "mottle": {
                let r = a.u ?? [0.02, 1],
                  i = a.v ?? [-1, 1];
                return (
                  <g key={l} fill={a.fill} opacity={a.op ?? 0.6}>
                    {Array.from(
                      {
                        length: a.n,
                      },
                      (l, h) => {
                        let c = d(r[0], r[1], n()) * s.body,
                          f = e.at(c, d(i[0], i[1], n())),
                          p = d(a.r[0], a.r[1], n());
                        return (
                          <ellipse
                            key={h}
                            cx={o(c)}
                            cy={o(f)}
                            rx={o(p * (1 + 0.8 * n()))}
                            ry={o(p * (0.6 + 0.4 * n()))}
                            transform={`rotate(${Math.round(180 * n())} ${o(c)} ${o(f)})`}
                          />
                        );
                      },
                    )}
                  </g>
                );
              }
              case "cheek": {
                let r = s.eye.x,
                  i = e.eyeY,
                  n = s.eye.r;
                return (
                  <g key={l} stroke={a.stroke} strokeWidth="0.9" strokeLinecap="round" opacity="0.75">
                    <path d={`M${o(r + 1.2 * n)} ${o(i - 0.3 * n)}L${o(s.gill - 0.5)} ${o(i - 0.9 * n)}`} />
                    <path d={`M${o(r + 1.1 * n)} ${o(i + 0.6 * n)}L${o(s.gill - 0.2)} ${o(i + 0.9 * n)}`} />
                    <path d={`M${o(r + 0.4 * n)} ${o(i + 1.3 * n)}L${o(s.gill - 2)} ${o(i + 2.6 * n)}`} />
                  </g>
                );
              }
              case "tailspot": {
                let r = s.body - 1.2,
                  i = e.at(r, -0.35);
                return (
                  <g key={l}>
                    {a.ring && <circle cx={o(r)} cy={o(i)} r={o(1.35 * a.r)} fill={a.ring} />}
                    <circle cx={o(r)} cy={o(i)} r={o(a.r)} fill={a.fill} />
                  </g>
                );
              }
              case "ear": {
                let r = s.gill + 0.4,
                  i = e.eyeY + 0.8 * s.eye.r;
                return <ellipse key={l} cx={o(r)} cy={o(i)} rx="2.1" ry="1.7" fill={a.fill} />;
              }
            }
          })(T, e, a, l),
        )}
        <path
          d={`M${o(e.gill - 1.6)} ${o(0.72 * T.top(e.gill))}Q${o(e.gill + 1.4)} ${o(T.eyeY + 1)} ${o(e.gill + 0.6)} ${o(T.at(e.gill, 0.25))}Q${o(e.gill)} ${o(T.at(e.gill, 0.7))} ${o(e.gill - 2.6)} ${o(0.95 * T.bot(e.gill - 2.6))}`}
          fill="none"
          stroke={Z}
          strokeWidth="0.45"
          opacity="0.55"
        />
      </g>
      <path d={B} fill="none" stroke={Z} strokeWidth={n} vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
      <path
        d={
          ((u = e.pectoral.x),
          (b = e.pectoral.len),
          (A = T.at(u, 0.38)),
          `M${o(u)} ${o(A)}C${o(u + 0.3 * b)} ${o(A - 0.22 * b)} ${o(u + 0.85 * b)} ${o(A - 0.02 * b)} ${o(u + b)} ${o(A + 0.3 * b)}C${o(u + 0.7 * b)} ${o(A + 0.4 * b)} ${o(u + 0.25 * b)} ${o(A + 0.3 * b)} ${o(u)} ${o(A)}Z`)
        }
        fill={q}
        stroke={Z}
        strokeWidth={0.7 * n}
        vectorEffect="non-scaling-stroke"
        opacity="0.95"
      />
      {Y && (
        <path
          d={
            ((C = e.pectoral.x),
            (Q = T.at(C, 0.38)),
            (S = e.pectoral.len),
            `M${o(C + 0.3)} ${o(Q + 0.1)}C${o(C + 0.3 * S)} ${o(Q - 0.2 * S)} ${o(C + 0.82 * S)} ${o(Q - 0 * S)} ${o(C + 0.97 * S)} ${o(Q + 0.28 * S)}`)
          }
          fill="none"
          stroke={Y}
          strokeWidth="0.8"
          strokeLinecap="round"
        />
      )}
      <path
        d={`M0.3 ${o(O - 0.2)}Q${o(0.5 * E)} ${o(O - 0.6 * K + (D - O) * 0.4)} ${o(E - 0.5 * K)} ${o(D - K)}Q${o(E + 0.55 * K)} ${o(D - 0.85 * K)} ${o(E)} ${o(D)}Q${o(0.5 * E)} ${o(O + (D - O) * 0.55)} 0.3 ${o(O)}Z`}
        fill={d(z.side, z.belly, 0.25)}
        stroke={Z}
        strokeWidth="0.3"
        strokeLinejoin="round"
      />
      <path
        d={`M0.3 ${o(O)}Q${o(0.5 * E)} ${o(O + (D - O) * 0.55)} ${o(E)} ${o(D)}`}
        fill="none"
        stroke={Z}
        strokeWidth="0.55"
        strokeLinecap="round"
      />
      <path
        d={`M0.8 ${o(O + 0.5)}Q${o(0.45 * E)} ${o(O + (D - O) * 0.5 + 1.3)} ${o(0.9 * E)} ${o(D + 1.4)}`}
        fill="none"
        stroke={Z}
        strokeWidth="0.25"
        opacity="0.4"
        strokeLinecap="round"
      />
      {e.mouth.canines && (
        <g fill="#fbf7ea" stroke={Z} strokeWidth="0.15">
          <path d={`M1.5 ${o(O)}L2.3 ${o(O + 1.9)}L3 ${o(O + 0.15)}Z`} />
          <path d={`M3.1 ${o(O + 0.1)}L3.8 ${o(O + 1.7)}L4.5 ${o(O + 0.25)}Z`} />
        </g>
      )}
      {e.pores && s && (
        <g fill={Z}>
          {Array.from(
            {
              length: e.pores,
            },
            (a, l) => {
              let r = 2.6 + ((E - 3.4) * l) / Math.max(1, e.pores - 1);
              return <circle key={l} cx={o(r)} cy={o(Math.min(O + 1.2 + (r / E) * 0.9, T.bot(r) - 0.45))} r="0.3" />;
            },
          )}
        </g>
      )}
      {"chin" === e.barbels && (
        <g stroke={d(z.belly, "#3a3530", 0.35)} strokeWidth="0.5" strokeLinecap="round" fill="none">
          {Array.from(
            {
              length: 9,
            },
            (e, a) => {
              let l = 2.4 + 0.95 * a,
                r = Math.max(O + 1, T.bot(l) - 0.3);
              return <path key={a} d={`M${o(l)} ${o(r)}q0.2 ${o(0.9 + (a % 3) * 0.35)} ${o(0.7)} ${o(1.4 + (a % 3) * 0.35)}`} />;
            },
          )}
        </g>
      )}
      {"one" === e.barbels && (
        <path
          d={`M2.2 ${o(Math.max(O + 1, T.bot(2.2)))}q0.4 1.8 1.6 2.6`}
          fill="none"
          stroke={Z}
          strokeWidth="0.55"
          strokeLinecap="round"
        />
      )}
      {"cat" === e.barbels && (
        <g fill="none" stroke={d(z.back, "#141414", 0.4)} strokeLinecap="round">
          <path d={`M${o(E - 0.5)} ${o(O + 0.2)}q3 1 7 3.4t7 5.2`} strokeWidth="0.6" />
          <path d={`M${o(E - 1.2)} ${o(O + 0.4)}q2 2.2 3.4 5.5`} strokeWidth="0.45" />
          <path d={`M2 ${o(T.bot(2) - 0.2)}q0.3 1.6 1.4 2.8M4 ${o(T.bot(4) - 0.2)}q0.4 1.5 1.6 2.6`} strokeWidth="0.45" />
          <path d={`M1.6 ${o(T.top(1.6) + 0.3)}q-0.2 -1.4 0.8 -2.2`} strokeWidth="0.4" />
        </g>
      )}
      {[0, 1].slice(0, R.two ? 2 : 1).map((e) => {
        let a = R.x + 3.2 * e,
          l = T.eyeY - 2.6 * e;
        return (
          <g key={e}>
            <circle cx={o(a)} cy={o(l)} r={o(R.r)} fill={R.iris ?? "#e7d38a"} stroke={Z} strokeWidth="0.3" />
            <circle cx={o(a - 0.08 * R.r)} cy={o(l)} r={o(0.58 * R.r)} fill="#141612" />
            <circle cx={o(a - 0.3 * R.r)} cy={o(l - 0.3 * R.r)} r={o(0.2 * R.r)} fill="#ffffff" opacity="0.9" />
          </g>
        );
      })}
    </g>
  );
};
export { M as LOOKS };
export { c as geometry };
export const lookFor = function (e, t) {
  return M[e] ?? M[r[e]] ?? M[L[t ?? l[e] ?? "trout"]];
};
export const lookHeight = function (e) {
  let t = c(e);
  return {
    top: Math.min(...e.dorsal.map((e) => t.top((e.from + e.to) / 2) - e.h), t.tailTop),
    bottom: Math.max(t.bot((e.anal.from + e.anal.to) / 2) + e.anal.h, t.tailBot, e.pelvic ? t.bot(e.pelvic.x) + e.pelvic.h : 0),
  };
};
export { d as mix };
export { i as seeded };
