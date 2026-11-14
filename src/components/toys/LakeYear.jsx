"use client";
/* eslint-disable @typescript-eslint/no-unused-expressions, react-hooks/immutability -- restored from the minified bundle: refs keep their one-letter names and statements keep the compiler's comma and && form. */
// Restored from client module 89015 (exports: LakeYear)
import * as l from "next/link";
import * as n from "react";
import * as i from "@/components/fish/FishArt";
let t, s, a, r;
let h = {
    ice: 0,
    snow: 0,
    land: 0,
    mix: 0,
    o2: 0,
  },
  d = [
    {
      ...h,
      ice: 0.55,
      snow: 0.3,
      land: 1,
      surf: 0.4,
      epi: 0,
      thermo: 6,
      hypo: 3.7,
      bot: 4,
    },
    {
      ...h,
      ice: 0.7,
      snow: 0.35,
      land: 1,
      surf: 0.3,
      epi: 0,
      thermo: 6,
      hypo: 3.8,
      bot: 4,
    },
    {
      ...h,
      ice: 0.5,
      snow: 0.04,
      land: 0.55,
      surf: 0.8,
      epi: 0,
      thermo: 5,
      hypo: 3.8,
      bot: 4,
    },
    {
      ...h,
      surf: 4.6,
      epi: 0,
      thermo: 32,
      hypo: 4,
      bot: 4,
      mix: 1,
    },
    {
      ...h,
      surf: 12,
      epi: 3,
      thermo: 8,
      hypo: 6.5,
      bot: 5.2,
    },
    {
      ...h,
      surf: 20,
      epi: 4,
      thermo: 9.5,
      hypo: 9,
      bot: 5.6,
    },
    {
      ...h,
      surf: 24,
      epi: 5,
      thermo: 11,
      hypo: 9.5,
      bot: 6,
    },
    {
      ...h,
      surf: 23.5,
      epi: 6.5,
      thermo: 12.5,
      hypo: 10,
      bot: 6.4,
      o2: 1,
    },
    {
      ...h,
      surf: 18,
      epi: 9,
      thermo: 14,
      hypo: 10,
      bot: 6.5,
      o2: 0.75,
    },
    {
      ...h,
      surf: 9.5,
      epi: 0,
      thermo: 32,
      hypo: 8.5,
      bot: 8.2,
      mix: 1,
    },
    {
      ...h,
      surf: 5,
      epi: 0,
      thermo: 32,
      hypo: 4.8,
      bot: 4.6,
      mix: 0.8,
      land: 0.25,
    },
    {
      ...h,
      ice: 0.2,
      snow: 0.12,
      land: 0.8,
      surf: 0.4,
      epi: 0,
      thermo: 6,
      hypo: 3.6,
      bot: 4,
    },
  ],
  c = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  f = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
function u(e) {
  let t = Math.floor(e) % 12,
    s = e - Math.floor(e),
    a = d[t],
    r = d[(t + 1) % 12],
    o = {};
  for (let e of Object.keys(a)) o[e] = a[e] + (r[e] - a[e]) * s;
  return o;
}
function x(e, t) {
  if (t <= e.epi) return e.surf;
  if (t <= e.thermo) {
    let s;
    return e.surf + (e.hypo - e.surf) * ((s = (t - e.epi) / Math.max(0.01, e.thermo - e.epi)) <= 0 ? 0 : s >= 1 ? 1 : s * s * (3 - 2 * s));
  }
  return e.hypo + ((e.bot - e.hypo) * (t - e.thermo)) / Math.max(0.01, 32 - e.thermo);
}
let p = [
  [0, "#d9eff8"],
  [2, "#9fd0ea"],
  [4, "#4b8dcb"],
  [7, "#3a8db2"],
  [10, "#39a09c"],
  [14, "#63b387"],
  [18, "#aac46a"],
  [21, "#dfc259"],
  [24, "#efa34a"],
  [27, "#e5783f"],
];
function m(e) {
  if (e <= p[0][0]) return p[0][1];
  for (let t = 1; t < p.length; t++) if (e <= p[t][0]) return (0, i.mix)(p[t - 1][1], p[t][1], (e - p[t - 1][0]) / (p[t][0] - p[t - 1][0]));
  return p[p.length - 1][1];
}
let y = (e) => Math.round(10 * e) / 10,
  g = (e) => (e < 1 ? "0" : String(Math.round(e))),
  w = (e) => 140 + (e <= 12 ? 17 * e : 204 + (e - 12) * 9.5),
  b = [
    [0, -4.9],
    [34, -4.4],
    [68, -2.3],
    [94, 0],
    [130, 1.1],
    [175, 2.1],
    [222, 3],
    [262, 4],
    [288, 7.2],
    [312, 12.5],
    [338, 19.5],
    [368, 25],
    [410, 28.6],
    [470, 30.8],
    [560, 31.8],
    [650, 32],
    [720, 31.6],
  ];
function k(e) {
  for (let t = 1; t < b.length; t++) {
    let [s, a] = b[t];
    if (e <= s) {
      let [r, o] = b[t - 1];
      return o + ((a - o) * (e - r)) / (s - r);
    }
  }
  return b[b.length - 1][1];
}
function j(e) {
  for (let t = 1; t < b.length; t++) {
    let [s, a] = b[t],
      [r, o] = b[t - 1];
    if (a >= e && o < e) return r + ((e - o) * (s - r)) / (a - o);
  }
  return 640;
}
function $(e) {
  let t = `M${e[0][0]} ${y(e[0][1])}`;
  for (let s = 0; s < e.length - 1; s++) {
    let a = e[Math.max(0, s - 1)],
      r = e[s],
      o = e[s + 1],
      l = e[Math.min(e.length - 1, s + 2)],
      n = [r[0] + (o[0] - a[0]) / 6, r[1] + (o[1] - a[1]) / 6],
      i = [o[0] - (l[0] - r[0]) / 6, o[1] - (l[1] - r[1]) / 6];
    t += `C${y(n[0])} ${y(n[1])} ${y(i[0])} ${y(i[1])} ${o[0]} ${y(o[1])}`;
  }
  return t;
}
let M = b.map(([e, t]) => [e, w(t)]),
  v = $(M),
  N = `${v}L720 600L0 600Z`,
  C = [34, 70].map((e) => `${$(M.map(([t, s]) => [t, Math.min(596, s + e + 10 * Math.sin(t / 60))]))}L720 600L0 600Z`),
  z = (e) => (e.ice > 0.05 ? "ice" : e.mix > 0.5 ? "mixed" : e.surf - e.bot > 5 ? "layered" : "mixed");
function L(e, [t, s], [a, r], o) {
  let l = a,
    n = 1 / 0;
  for (let i = a; i <= r + 1e-6; i += 0.25) {
    let a = x(e, i),
      r = a < t ? t - a : a > s ? a - s : 0;
    (r < n - 1e-6 || ("deep" === o && 1e-6 > Math.abs(r - n))) && ((l = i), (n = r));
  }
  return l;
}
function W(e, [t, s]) {
  let a = `about ${g(e)} \xb0C here`;
  return e >= t - 0.5 && e <= s + 0.5
    ? `It's ${a} — right in the ${t}–${s} \xb0C it likes best.`
    : e < t
      ? `It's ${a}, colder than the ${t}–${s} \xb0C it likes best, so it moves slowly and eats less.`
      : `It's ${a}, warmer than the ${t}–${s} \xb0C it likes best.`;
}
let A = {
    "lake-trout": (e, t, s) => {
      let a = z(t);
      return "ice" === a
        ? {
            zone: "open",
            d: 9,
            x: 430,
            why: "Under the ice the whole lake is cold enough for it, so it roams open water hunting smaller fish. Ice anglers catch it at many depths.",
          }
        : 9 === e
          ? {
              zone: "rocks",
              d: 3.6,
              x: 256,
              why: "Autumn is spawning time. Lake trout gather at night over rocky shoals, often less than 2 m deep, and the eggs hatch under the ice in late winter.",
            }
          : "mixed" === a
            ? 3 === e
              ? {
                  zone: "open",
                  d: 3,
                  x: 400,
                  why: "Right after ice-out the whole lake is cold, so lake trout cruise close to shore and near the surface, where the water warms first.",
                }
              : {
                  zone: "open",
                  d: 7,
                  x: 420,
                  why: "The lake is cold from top to bottom again, so it can go anywhere. It feeds hard before the ice comes.",
                }
            : t.surf <= s[1] + 1
              ? {
                  zone: "open",
                  d: Math.max(2.5, L(t, s, [1, 20], "shallow")),
                  x: 370,
                  why: (e) =>
                    `The top of the lake is still cool, so it hunts near the surface. ${W(e, s)} As the top warms, it will go deeper.`,
                }
              : {
                  zone: "open",
                  d: L(t, s, [t.thermo + 1.2, 29], "shallow"),
                  x: 440,
                  why: (e) =>
                    `The top layer is about ${g(t.surf)} \xb0C — far too warm for it. It has followed the cold water down below the thermocline. ${W(e, s)}`,
                };
    },
    walleye: (e, t, s) => {
      let a = z(t);
      return "ice" === a
        ? {
            zone: "slope",
            d: 13,
            why: "Under the ice walleye hold near the bottom along the drop-off, feeding most at dawn and dusk.",
          }
        : 3 === e
          ? {
              zone: "rocks",
              d: 4.2,
              x: 276,
              why: "Right after ice-out, when the water is about 4–11 °C, walleye spawn at night over rocks and gravel in shallow water.",
            }
          : 4 === e
            ? {
                zone: "weeds",
                d: 2.8,
                why: "After spawning it feeds on the shallow flats while the water is still cool.",
              }
            : "layered" === a && t.surf >= 17
              ? {
                  zone: "slope",
                  d: L(t, s, [4.5, t.thermo], "deep"),
                  why: (e) =>
                    `Its big, light-shy eyes send it down the drop-off on bright days. ${W(e, s)} At dusk it comes up into the shallows to feed.`,
                }
              : {
                  zone: "slope",
                  d: 8,
                  why: "As the lake cools it gathers along the drop-off, feeding hard before winter.",
                };
    },
    "northern-pike": (e, t, s) => {
      let a = z(t);
      return "ice" === a
        ? {
            zone: "weeds",
            d: 2.1,
            x: 205,
            why: "Pike stay active under the ice, lurking in weedy bays. Ice anglers set tip-ups for them.",
          }
        : 3 === e
          ? {
              zone: "weeds",
              d: 0.8,
              x: 118,
              why: "Pike spawn right after ice-out, by day, in flooded marshes and weedy shallows.",
            }
          : 4 === e || 5 === e
            ? {
                zone: "weeds",
                d: 1.5,
                x: 160,
                why: "Warming weedy shallows are full of food, and pike wait there in ambush.",
              }
            : "layered" === a && t.surf >= 21
              ? {
                  zone: "slope",
                  d: L(t, s, [3, 5.5], "deep"),
                  why: (e) => `In summer heat big pike slide out to the deeper, cooler edge of the weeds. ${W(e, s)}`,
                }
              : 10 === e
                ? {
                    zone: "weeds",
                    d: 3,
                    x: 236,
                    why: "It hunts the edges of the dying weeds, putting on weight for the winter.",
                  }
                : {
                    zone: "weeds",
                    d: 1.6,
                    x: 170,
                    why: "As the water cools it moves back into the shallow weeds to feed.",
                  };
    },
    "smallmouth-bass": (e, t, s) => {
      let a = z(t);
      return "ice" === a || 3 === e || 10 === e
        ? {
            zone: "slope",
            d: 18.5,
            why: "In cold water smallmouth go deep, bunch up near the bottom and barely feed until spring.",
          }
        : 5 === e
          ? {
              zone: "rocks",
              d: 2.2,
              x: 216,
              why: "When the water reaches about 16–18 °C the male sweeps a nest on gravel and guards the eggs, then the fry.",
            }
          : 4 === e
            ? {
                zone: "rocks",
                d: 3,
                x: 236,
                why: "It is moving up onto the rocky shallows as they warm.",
              }
            : "layered" === a && t.surf >= 20
              ? {
                  zone: "rocks",
                  d: Math.min(3.2, L(t, s, [1.5, 5], "deep")),
                  x: 226,
                  why: (e) => `Warm, rocky water suits it: it waits by the rocks in the warm top layer. ${W(e, s)}`,
                }
              : {
                  zone: "slope",
                  d: 8,
                  why: "As the top cools it moves out to deeper rock along the drop-off.",
                };
    },
    "largemouth-bass": (e, t, s) => {
      let a = z(t);
      return "ice" === a || 3 === e
        ? {
            zone: "slope",
            d: 7,
            why: "Below about 5 °C it stops feeding. It waits out the winter near the bottom, just off the deep edge of the weeds.",
          }
        : 5 === e
          ? {
              zone: "weeds",
              d: 0.9,
              x: 126,
              why: "The male sweeps a nest in shallow water, at about 15–21 °C, and guards the eggs and then the fry.",
            }
          : "layered" === a && t.surf >= 21
            ? {
                zone: "weeds",
                d: L(t, s, [0.8, 2.5], "shallow"),
                x: 146,
                why: (e) => `It loves the warmest water in the lake: shallow and weedy. ${W(e, s)}`,
              }
            : 9 === e || 10 === e
              ? {
                  zone: "weeds",
                  d: 2.9,
                  x: 226,
                  why: "As the water cools it slides out to the deeper edge of the weeds.",
                }
              : {
                  zone: "weeds",
                  d: 1.8,
                  x: 164,
                  why: "It cruises the warming weedy shallows, hunting small fish, frogs and crayfish.",
                };
    },
    "yellow-perch": (e, t, s) => {
      let a = z(t);
      return "ice" === a
        ? {
            zone: "slope",
            d: 9.5,
            group: "school",
            why: "Perch stay active all winter under the ice, travelling in schools near the bottom.",
          }
        : 3 === e
          ? {
              zone: "weeds",
              d: 2.2,
              x: 200,
              group: "school",
              why: "One of the first fish to spawn: at night or early morning the females drape long ribbons of eggs over weeds and branches in the shallows.",
            }
          : "layered" === a && t.surf >= 17
            ? {
                zone: "slope",
                d: L(t, s, [2.5, 8], "deep"),
                group: "school",
                why: (e) => `Schools of same-sized perch cruise the weed edges. ${W(e, s)}`,
              }
            : {
                zone: "slope",
                d: 6,
                group: "school",
                why: "Schools of perch roam the drop-off, following the cooling water down.",
              };
    },
    burbot: (e, t, s) => {
      if (e <= 2)
        return {
          zone: "rocks",
          d: 4,
          x: 290,
          group: "ball",
          why: "Midwinter is spawning time, under the ice. Burbot gather at night over gravel and wriggle together in a tangled ball.",
        };
      if (11 === e)
        return {
          zone: "open",
          d: 14,
          x: 480,
          why: "It is moving up from the deep, getting ready to spawn under the ice after New Year.",
        };
      let a = x(t, 31);
      return {
        zone: "bottom",
        d: 31,
        x: 530,
        why:
          "layered" === z(t)
            ? `It keeps to water about 12 \xb0C and colder, so it lies on the bottom in the deepest, coldest water — about ${g(a)} \xb0C here.`
            : `It spends most of the year deep on the bottom, hiding among rocks by day and hunting at night. ${W(a, s)}`,
      };
    },
  },
  I = {
    "lake-trout": 86,
    walleye: 72,
    "northern-pike": 94,
    "smallmouth-bass": 58,
    "largemouth-bass": 64,
    "yellow-perch": 38,
    burbot: 76,
  },
  S = ["burbot", "lake-trout", "walleye", "northern-pike", "smallmouth-bass", "largemouth-bass", "yellow-perch"],
  T = [
    "January. Thick ice and snow seal the lake. Right under the ice the water is about 0 °C, but on the bottom it stays at 4 °C — water is heaviest at 4 °C, so it sinks.",
    "February. Under the ice it is dark and still. The 4 °C water stays on the bottom, so the lake never freezes solid — and the burbot are spawning.",
    "March. The snow melts off the ice and the ice turns grey and soft. The fish are waiting for spring.",
    "April: ice-out! The whole lake is about 4 °C, top to bottom, so the wind can stir it all the way down. That is spring turnover — fresh oxygen for the deep water.",
    "May. The sun warms the top of the lake. Warm water is lighter than cold, so it floats on top, and the layers begin.",
    "June. A warm top layer now floats on a cold deep layer. Between them is the thermocline, where the temperature drops fast.",
    "July. Summer layers: warm on top, cold below. The wind only stirs the top layer, so the deep water stays cold all summer.",
    "August. The deep water has not touched the air since spring. In rich, green lakes it starts to run short of oxygen.",
    "September. Cool nights chill the top layer. It gets thicker, and the thermocline sinks deeper.",
    "October: autumn turnover. The top has cooled to match the deep water, so the wind mixes the whole lake again and brings oxygen back to the bottom.",
    "November. The whole lake keeps mixing and cooling, all the way down towards 4 °C.",
    "December: ice-on. The coldest water, near 0 °C, floats on top and freezes. The 4 °C water stays below, so fish can live under the ice all winter.",
  ],
  D = [
    ["#b9cfe0", "#eef2f4"],
    ["#b4cde2", "#eef2f5"],
    ["#a9cbe6", "#eef3f2"],
    ["#9fcbea", "#eef5ee"],
    ["#8cc6ee", "#eaf6f0"],
    ["#7fc1ef", "#e6f5f6"],
    ["#78bdee", "#e9f6f7"],
    ["#82c0ec", "#eef5ee"],
    ["#96c6e6", "#f3f0e2"],
    ["#a9c8e0", "#f5ecdc"],
    ["#b8c8d4", "#eceae4"],
    ["#c1d1de", "#f0f2f3"],
  ],
  Z = ["", "", "", "", "#a6cf6a", "#5f9a45", "#579240", "#5f9340", "#d9a13a", "#d0612e", "", ""],
  O = ["#e9eef0", "#e9eef0", "#c9c7a8", "#9aa35e", "#86ad55", "#6f9e45", "#6a9a43", "#7a9a45", "#9a9a4c", "#a88f4c", "#9a8a5a", "#e3e9eb"],
  P = (() => {
    let e = (0, i.seeded)(41),
      t = [];
    for (let s = 106; s < 730; s += 9 + 8 * e())
      t.push({
        x: y(s),
        h: y(14 + 14 * e()),
        w: y(6 + 5 * e()),
        kind: 0.45 > e() ? "fir" : "leaf",
        c: Math.floor(3 * e()),
      });
    return t;
  })(),
  X = (() => {
    let e = (0, i.seeded)(17),
      t = [];
    for (let s = 112; s < 272; s += 7 + 9 * e())
      t.push({
        x: y(s),
        y: y(w(k(s)) + 2),
        h: y(0.55 + 0.45 * e()),
        lean: y((e() - 0.5) * 12),
        kind: Math.floor(3 * e()),
        d: y(3 * e()),
      });
    return t;
  })(),
  F =
    ((t = (0, i.seeded)(5)),
    Array.from(
      {
        length: 9,
      },
      (e, s) => {
        let a = 222 + 7.5 * s + 5 * t();
        return {
          x: y(a),
          y: y(w(k(a)) + 1),
          rx: y(7 + 7 * t()),
          ry: y(4 + 4 * t()),
          c: t() > 0.5 ? "#8a8278" : "#6f675e",
        };
      },
    )),
  U =
    ((s = (0, i.seeded)(9)),
    Array.from(
      {
        length: 40,
      },
      () => {
        let e = 720 * s();
        return {
          x: y(e),
          y: y(Math.max(w(k(e)) + 8, 146) + 50 * s()),
          r: y(1.5 + 3 * s()),
        };
      },
    ).filter((e) => e.y < 598)),
  B =
    ((a = (0, i.seeded)(23)),
    Array.from(
      {
        length: 10,
      },
      () => {
        let e = 130 + 470 * a();
        return {
          x: y(e),
          y: y(w(k(e)) - 4),
          r: y(1.6 + 2.2 * a()),
          dur: y(5 + 5 * a()),
          delay: y(8 * a()),
          rise: y(Math.min(160, w(k(e)) - 140 - 30)),
        };
      },
    )),
  R =
    ((r = (0, i.seeded)(31)),
    Array.from(
      {
        length: 26,
      },
      () => ({
        x: y(720 * r()),
        r: y(1.5 + 2 * r()),
        dur: y(6 + 6 * r()),
        delay: y(-(12 * r())),
        drift: y((r() - 0.5) * 40),
      }),
    )),
  Q = [
    [250, 38, 110],
    [370, 28, 150],
    [480, 44, 120],
    [600, 30, 160],
  ],
  E = `
.ly-fish{cursor:pointer;outline:none}
.ly-ring{opacity:0;transition:opacity .2s}
.ly-fish:focus-visible .ly-ring,.ly-fish[aria-pressed="true"] .ly-ring{opacity:1}
.ly-move{transition:transform 1.6s cubic-bezier(.45,.05,.35,1)}
.ly-fade{transition:opacity .8s ease, fill .8s ease}
@media (prefers-reduced-motion: no-preference){
.ly-swim{transform-box:fill-box;transform-origin:center;animation:ly-swim 9s ease-in-out infinite}
.ly-bob{animation:ly-bob 2.6s ease-in-out infinite}
.ly-ball{transform-box:fill-box;transform-origin:center;animation:ly-ball 1.4s ease-in-out infinite}
.ly-weed{transform-box:fill-box;transform-origin:50% 100%;animation:ly-sway 5s ease-in-out infinite}
.ly-bub{animation:ly-bub linear infinite}
.ly-flake{animation:ly-flake linear infinite}
.ly-ray{animation:ly-ray 5s ease-in-out infinite}
.ly-march{animation:ly-march 2.2s linear infinite}
.ly-cloud{animation:ly-cloud 60s linear infinite}
.ly-loon{animation:ly-bob 3.2s ease-in-out infinite}
}
@keyframes ly-swim{0%{transform:translateX(-16px) scaleX(-1)}46%{transform:translateX(16px) scaleX(-1)}50%{transform:translateX(16px) scaleX(1)}96%{transform:translateX(-16px) scaleX(1)}100%{transform:translateX(-16px) scaleX(-1)}}
@keyframes ly-bob{0%,100%{transform:translateY(-2px)}50%{transform:translateY(2px)}}
@keyframes ly-ball{0%,100%{transform:rotate(-7deg)}50%{transform:rotate(7deg)}}
@keyframes ly-sway{0%,100%{transform:skewX(-5deg)}50%{transform:skewX(5deg)}}
@keyframes ly-bub{0%{transform:translateY(0);opacity:0}10%{opacity:.8}85%{opacity:.6}100%{transform:translateY(var(--rise));opacity:0}}
@keyframes ly-flake{0%{transform:translate(0,-20px)}100%{transform:translate(var(--drift),170px)}}
@keyframes ly-ray{0%,100%{opacity:.55}50%{opacity:1}}
@keyframes ly-march{to{stroke-dashoffset:-44}}
@keyframes ly-cloud{0%{transform:translateX(0)}50%{transform:translateX(60px)}100%{transform:translateX(0)}}
@media (max-width: 520px){.ly-small{display:none}.ly-lbl{font-size:27px;transform:translateX(98px)}}
`,
  J = ["#b9d4ea", "#b9d4ea", "#c9dfe6", "#cfe5c4", "#bfe0a3", "#f0d98a", "#f2cf73", "#f0c46c", "#eab26a", "#df9458", "#cdbfb0", "#b9d4ea"];
function G({ value: e, onChange: t }) {
  let s = (0, n.useRef)(null),
    a = Math.round(e) % 12,
    r = e > 11 ? 11 * (e < 11.5) : e,
    l = (e) => {
      let t = s.current;
      if (!t) return a;
      let r = t.getBoundingClientRect();
      return Math.max(0, Math.min(11, Math.round(11 * ((e - r.left - 22) / Math.max(1, r.width - 44)))));
    };
  return (
    <div
      ref={s}
      role="slider"
      tabIndex={0}
      aria-label="Month"
      aria-valuemin={1}
      aria-valuemax={12}
      aria-valuenow={a + 1}
      aria-valuetext={c[a]}
      onPointerDown={(e) => {
        0 === e.button && (e.currentTarget.setPointerCapture(e.pointerId), t(l(e.clientX)));
      }}
      onPointerMove={(e) => {
        if (!e.currentTarget.hasPointerCapture(e.pointerId)) return;
        let s = l(e.clientX);
        s !== a && t(s);
      }}
      onKeyDown={(e) => {
        let s = null;
        ("ArrowRight" === e.key || "ArrowUp" === e.key
          ? (s = (a + 1) % 12)
          : "ArrowLeft" === e.key || "ArrowDown" === e.key
            ? (s = (a + 11) % 12)
            : "PageUp" === e.key
              ? (s = (a + 3) % 12)
              : "PageDown" === e.key
                ? (s = (a + 9) % 12)
                : "Home" === e.key
                  ? (s = 0)
                  : "End" === e.key && (s = 11),
          null !== s && (e.preventDefault(), t(s)));
      }}
      className="relative h-16 cursor-pointer select-none rounded-2xl outline-none focus-visible:ring-4 focus-visible:ring-azure/50"
      style={{
        touchAction: "none",
      }}
    >
      <div className="absolute inset-x-[22px] top-[14px] flex h-5 overflow-hidden rounded-full border border-line">
        {J.map((e, t) => (
          <span
            key={t}
            className="flex-1"
            style={{
              background: e,
            }}
          />
        ))}
      </div>
      {f.map((e, t) => (
        <span
          key={t}
          aria-hidden="true"
          className={`absolute bottom-0 w-4 -translate-x-1/2 text-center text-xs font-semibold ${t === a ? "text-ink" : "text-ink-2"}`}
          style={{
            left: `calc(22px + (100% - 44px) * ${(t / 11).toFixed(4)})`,
          }}
        >
          {e}
        </span>
      ))}
      <div
        className="pointer-events-none absolute top-[2px] flex h-11 w-11 -translate-x-1/2 items-center justify-center rounded-full border-4 border-moss bg-paper shadow-md"
        style={{
          left: `calc(22px + (100% - 44px) * ${(r / 11).toFixed(4)})`,
        }}
      >
        <V m={a} />
      </div>
    </div>
  );
}
function V({ m: e }) {
  return 11 === e || e <= 1 ? (
    <svg viewBox="-10 -10 20 20" className="h-6 w-6" aria-hidden="true">
      <g stroke="#2c6fb5" strokeWidth="2" strokeLinecap="round">
        {[0, 60, 120].map((e) => (
          <path key={e} d="M0 -8V8M-3 -6L0 -3L3 -6M-3 6L0 3L3 6" transform={`rotate(${e})`} fill="none" />
        ))}
      </g>
    </svg>
  ) : e <= 4 ? (
    <svg viewBox="-10 -10 20 20" className="h-6 w-6" aria-hidden="true">
      <path d="M0 8V-1" stroke="#2f5d3a" strokeWidth="2" strokeLinecap="round" />
      <path d="M0 2C-6 2 -8 -3 -8 -6C-3 -6 0 -3 0 2Z M0 -1C5 -1 7 -5 7 -8C2 -8 0 -5 0 -1Z" fill="#6aa84f" />
    </svg>
  ) : e <= 7 ? (
    <svg viewBox="-10 -10 20 20" className="h-6 w-6" aria-hidden="true">
      <circle r="4.5" fill="#e9a93a" />
      <g stroke="#e9a93a" strokeWidth="2" strokeLinecap="round">
        {[0, 45, 90, 135, 180, 225, 270, 315].map((e) => (
          <path key={e} d="M0 -7V-9" transform={`rotate(${e})`} />
        ))}
      </g>
    </svg>
  ) : (
    <svg viewBox="-10 -10 20 20" className="h-6 w-6" aria-hidden="true">
      <path d="M0 -8C4 -4 7 -2 7 2C7 6 3 8 0 8C-3 8 -7 6 -7 2C-7 -2 -4 -4 0 -8Z" fill="#d0612e" />
      <path d="M0 -6V9" stroke="#8a3a1a" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
let Y = () => () => {},
  K = () => new Date().getMonth(),
  H = () => 6;
function CQ_({ two: e, four: t, six: s, outside: a }) {
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
        {a}
      </p>
    </div>
  );
}
export const LakeYear = function ({ fish: e }) {
  let t,
    s = "ly" + (0, n.useId)().replace(/[^a-zA-Z0-9]/g, ""),
    a = (0, n.useSyncExternalStore)(Y, K, H),
    [r, h] = (0, n.useState)(null),
    [d, f] = (0, n.useState)(false),
    [p, b] = (0, n.useState)(null),
    z = (0, n.useRef)(0),
    L = r ?? a,
    W = Math.round(L) % 12;
  (0, n.useEffect)(() => {
    if (!d) return;
    let e = "function" == typeof window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
      t = z.current;
    if (e) {
      let e = 0,
        s = window.setInterval(() => {
          (h((t + (e += 1)) % 12), e >= 12 && (window.clearInterval(s), f(false)));
        }, 1300);
      return () => window.clearInterval(s);
    }
    let s = 0,
      a = -1,
      r = 0,
      o = (e) => {
        let l = a < 0 ? 0 : Math.min(0.05, (e - a) / 1e3);
        if (((a = e), (r += l / 1.5) >= 12)) {
          (h(t), f(false));
          return;
        }
        (h((t + r) % 12), (s = requestAnimationFrame(o)));
      };
    return ((s = requestAnimationFrame(o)), () => cancelAnimationFrame(s));
  }, [d]);
  let J = u(L),
    V = (0, i.mix)(D[Math.floor(L) % 12][0], D[(Math.floor(L) + 1) % 12][0], L - Math.floor(L)),
    _ = (0, i.mix)(D[Math.floor(L) % 12][1], D[(Math.floor(L) + 1) % 12][1], L - Math.floor(L)),
    ee = y(112 - 72 * ((1 - Math.cos((2 * Math.PI * (L - 0.2)) / 12)) / 2)),
    et = Math.max(0, Math.min(1, (J.surf - 10) / 12)) * (J.ice > 0.02 ? 0 : 1),
    es = J.ice < 0.02 && J.mix < 0.45 && J.surf - J.bot > 5 ? Math.min(1, (J.surf - J.bot - 5) / 6) : 0,
    ea = [0.1, 0.1, 0.1, 0.18, 0.45, 0.85, 1, 1, 0.85, 0.5, 0.25, 0.12][W],
    er = W >= 9 || W <= 3 ? "#8a7a44" : 4 === W ? "#86b85a" : "#4f8f3e",
    eo = Z[W],
    el = O[W],
    en = 30 * J.ice,
    ei = L > 1.5 && L < 4.5,
    eh = 94 + 626 * (ei ? 1 : Math.min(1, J.ice / 0.12)),
    ed = ei && J.ice < 0.36 ? (0.36 - J.ice) / 0.36 : 0,
    ec = L > 2 && L < 4 ? "#c7d3d6" : "#dcedf4",
    ef = (function (e, t) {
      let s = (e) => (0 > S.indexOf(e) ? 99 : S.indexOf(e)),
        a = 140 + 27 * u(t).ice + 8,
        r = [];
      for (let o of [...e].sort((e, t) => s(e.slug) - s(t.slug))) {
        let e = (function (e, t, s) {
          let a,
            r = A[e];
          if (!r) return null;
          let o = u(t),
            l = r(t, o, s),
            n = l.d;
          switch (l.zone) {
            case "weeds":
              ((a = l.x ?? Math.min(270, Math.max(116, j(n + 0.6)))), (n = Math.min(n, k(a) - 0.5, k(a - 0.3 * (I[e] ?? 56)) - 0.4)));
              break;
            case "rocks":
              n = Math.min(n, k((a = l.x ?? 245)) - 0.5, k(a - 0.3 * (I[e] ?? 56)) - 0.4);
              break;
            case "slope":
              a = j(n + 1) + 0.42 * (I[e] ?? 56) + (l.x ?? 0);
              break;
            case "bottom":
              n = k((a = l.x ?? 530)) - 1;
              break;
            default:
              a = l.x ?? 430;
          }
          let i = "function" == typeof l.why ? l.why(x(o, Math.max(0.6, n))) : l.why;
          return {
            x: a,
            y: w(Math.max(0.6, n)),
            zone: l.zone,
            why: i,
            group: l.group,
          };
        })(o.slug, t, o.tempC);
        if (!e) continue;
        let s = I[o.slug] ?? 56,
          l = s * ("school" === e.group ? 1.5 : "ball" === e.group ? 1.1 : 1) + 6,
          n = e.group ? 30 : 18,
          i = (e, t) =>
            t >= a &&
            t <= w(k(e - 0.3 * l)) - 3 &&
            t <= w(k(e)) - 5 &&
            e + l / 2 <= 718 &&
            !r.some((s) => Math.abs(s.x - e) < (s.w + l) / 2 && Math.abs(s.y - t) < (s.h + n) / 2),
          { x: h, y: d } = e;
        if (!i(h, d)) {
          let t = "weeds" === e.zone || "rocks" === e.zone ? -1 : 1,
            s = [];
          for (let e = 1; e <= 6; e++) s.push([10 * t * e, 0], [-(10 * t) * e, 0]);
          for (let e = 1; e <= 3; e++) s.push([0, 12 * e], [0, -12 * e], [20 * t, 12 * e], [-(20 * t), 12 * e]);
          let a = s.find(([t, s]) => i(e.x + t, e.y + s));
          a && ((h = e.x + a[0]), (d = e.y + a[1]));
        }
        r.push({
          ...o,
          x: y(h),
          y: y(d),
          why: e.why,
          group: e.group,
          len: s,
          w: l,
          h: n,
        });
      }
      return r.map((e) => ({
        slug: e.slug,
        name: e.name,
        tempC: e.tempC,
        x: e.x,
        y: e.y,
        why: e.why,
        group: e.group,
        len: e.len,
      }));
    })(e, W),
    eu = ef.find((e) => e.slug === p) ?? null,
    ex = w(33) - 140,
    ep = Array.from(
      {
        length: 34,
      },
      (e, t) => ({
        o: Math.round(((w(t) - 140) / ex) * 1e3) / 1e3,
        c: m(x(J, t)),
      }),
    ),
    em = `A cut-away of a northern lake in ${c[W]}. ${T[W]}`,
    ey = [];
  if (J.ice > 0.1)
    (ey.push({
      y: w(2.6),
      lines: ["coldest, about 0 °C,", "right under the ice"],
      op: 1,
    }),
      ey.push({
        y: w(24),
        lines: ["4 °C on the bottom —", "the heaviest water"],
        op: 1,
      }));
  else if (es > 0.15)
    (ey.push({
      y: w(J.epi / 2) - 6,
      lines: ["warm top layer", `${g(J.surf)} \xb0C`],
      op: es,
    }),
      ey.push({
        y: w((J.epi + J.thermo) / 2) - 4,
        lines: ["the thermocline —", "temperature drops fast"],
        op: es,
      }),
      ey.push({
        y: w((J.thermo + 32) / 2) - 14,
        lines: ["cold deep layer", `${g(J.bot)}–${g(J.hypo)} \xb0C`],
        op: es,
      }));
  else if (J.mix > 0.4) {
    let e = g(J.bot) === g(J.surf) ? `about ${g(J.surf)} \xb0C` : `${g(J.bot)}–${g(J.surf)} \xb0C`;
    ey.push({
      y: w(14),
      lines: ["the whole lake mixes,", `top to bottom \xb7 ${e}`],
      op: Math.min(1, J.mix),
    });
  }
  return (
    <div className="text-ink">
      <style>{E}</style>
      <div className="overflow-hidden rounded-2xl border border-line">
        <svg viewBox="0 0 720 600" className="block h-auto w-full select-none" role="group" aria-label="A northern lake through the year">
          <defs>
            <linearGradient id={`${s}-sky`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor={V} />
              <stop offset="1" stopColor={_} />
            </linearGradient>
            <linearGradient id={`${s}-water`} gradientUnits="userSpaceOnUse" x1="0" y1={140} x2="0" y2={w(33)}>
              {ep.map((e, t) => (
                <stop key={t} offset={e.o} stopColor={e.c} />
              ))}
            </linearGradient>
            <linearGradient id={`${s}-scale`} x1="0" y1="0" x2="1" y2="0">
              {[0, 2, 4, 7, 10, 14, 18, 21, 24, 27].map((e) => (
                <stop key={e} offset={y(e / 27)} stopColor={m(e)} />
              ))}
            </linearGradient>
            <linearGradient id={`${s}-ray`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#fffbe0" stopOpacity="0.55" />
              <stop offset="1" stopColor="#fffbe0" stopOpacity="0" />
            </linearGradient>
            <linearGradient id={`${s}-ice`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor={(0, i.mix)(ec, "#ffffff", 0.5)} />
              <stop offset="1" stopColor={(0, i.mix)(ec, "#7fa9c4", 0.55)} />
            </linearGradient>
            <radialGradient id={`${s}-sun`}>
              <stop offset="0.45" stopColor="#fff3b8" />
              <stop offset="1" stopColor="#fff3b8" stopOpacity="0" />
            </radialGradient>
            <pattern id={`${s}-o2`} width="10" height="10" patternUnits="userSpaceOnUse">
              <circle cx="3" cy="3" r="1.3" fill="#5b4a3a" />
              <circle cx="8" cy="8" r="1" fill="#5b4a3a" />
            </pattern>
          </defs>
          <g role="img" aria-label={em}>
            <rect x="0" y="0" width={720} height={142} fill={`url(#${s}-sky)`} />
            <g opacity={W <= 1 || W >= 10 ? 0.55 : 1}>
              <circle cx="525" cy={ee} r="46" fill={`url(#${s}-sun)`} />
              <circle cx="525" cy={ee} r="19" fill={W <= 1 || 11 === W ? "#fdf1c8" : "#ffd766"} />
            </g>
            <g className="ly-cloud">
              {[
                [270, 42, 1],
                [640, 30, 0.75],
              ].map(([e, t, s]) => (
                <g key={e} fill="#ffffff" opacity={W <= 2 || W >= 10 ? 0.95 : 0.85}>
                  <ellipse cx={e} cy={t + 8} rx={44 * s} ry={14 * s} />
                  <circle cx={e - 15 * s} cy={t} r={16 * s} />
                  <circle cx={e + 12 * s} cy={t - 3} r={20 * s} />
                </g>
              ))}
            </g>
            {9 === W && (
              <g fill="none" stroke="#3a3a3a" strokeWidth="2" strokeLinecap="round" opacity="0.7">
                {[0, 1, 2, 3, 4].map((e) => (
                  <path key={e} d={`M${380 + 14 * e} ${66 + 7 * Math.abs(e - 2)} l-6 -4 m6 4 l6 -4`} />
                ))}
              </g>
            )}
            <path
              d="M94 140 L94 128 Q 270 118 470 124 T 720 120 V 140 Z"
              fill={(0, i.mix)("#51684a", "#8d9aa0", 0.55 * (W <= 2 || 11 === W))}
              className="ly-fade"
            />
            {P.map((e, t) => {
              let s = 128 - 4 * (e.x > 470),
                a = W <= 2 || 11 === W;
              if ("fir" === e.kind)
                return (
                  <path
                    key={t}
                    d={`M${e.x} ${y(s - e.h)}L${y(e.x + 0.5 * e.w)} ${s}L${y(e.x - 0.5 * e.w)} ${s}Z`}
                    fill={a ? "#4a5e52" : "#2f4a36"}
                  />
                );
              let r = eo ? (8 === W || 9 === W ? ["#d9a13a", "#c9552a", "#b8872f"][e.c] : eo) : a ? "#c9d2d4" : "#8a7d6a";
              return <ellipse key={t} cx={e.x} cy={y(s - 0.45 * e.h)} rx={y(0.7 * e.w)} ry={y(0.5 * e.h)} fill={r} className="ly-fade" />;
            })}
            <rect x="0" y={140} width={720} height={460} fill={`url(#${s}-water)`} />
            {et > 0.02 && (
              <g opacity={y(et)}>
                {Q.map(([e, t, a], r) => (
                  <g
                    key={r}
                    className="ly-ray"
                    style={{
                      animationDelay: `${1.3 * r}s`,
                    }}
                  >
                    <path d={`M${e} 140L${e + t} 140L${e + t + 60} ${140 + 1.4 * a}L${e + 30} ${140 + 1.4 * a}Z`} fill={`url(#${s}-ray)`} />
                  </g>
                ))}
              </g>
            )}
            {J.o2 > 0.05 && (
              <g opacity={y(0.8 * J.o2)}>
                <path d={`M380 ${w(26.5)} Q540 ${w(25.5)} 720 ${w(26)} V ${w(33)} H380Z`} fill={`url(#${s}-o2)`} opacity="0.35" />
                <text
                  x="400"
                  y={y(w(25.4))}
                  fontSize="17"
                  fontWeight="700"
                  fill="#4a3a2a"
                  stroke="#f3f0e6"
                  strokeWidth="4"
                  paintOrder="stroke"
                  className="ly-small"
                >
                  <tspan x="400">low oxygen down here,</tspan>
                  <tspan x="400" dy="20">
                    in rich, green lakes
                  </tspan>
                </text>
              </g>
            )}
            {J.mix > 0.05 && (
              <g opacity={y(Math.min(1, J.mix))} fill="none" stroke="#f6fbff" strokeWidth="5" strokeLinecap="round">
                {[
                  [440, 15, 105, 120],
                  [595, 15, 100, 120],
                ].map(([e, t, s, a], r) => (
                  <g key={r}>
                    <ellipse cx={e} cy={w(t)} rx={s} ry={a} strokeDasharray="30 14" className="ly-march" opacity="0.7" />
                    <path d={`M${e - 12} ${w(t) - a - 12} l14 12 l-14 12`} strokeLinejoin="round" opacity="0.95" />
                    <path d={`M${e + 12} ${w(t) + a - 12} l-14 12 l14 12`} strokeLinejoin="round" opacity="0.95" />
                  </g>
                ))}
              </g>
            )}
            {es > 0.05 && (
              <g opacity={y(es)}>
                <rect x={y(j(J.epi))} y={y(w(J.epi))} width={720} height={y(w(J.thermo) - w(J.epi))} fill="#ffffff" opacity="0.1" />
                {[J.epi, J.thermo].map((e, t) => (
                  <line
                    key={t}
                    x1={y(j(e) + 6)}
                    x2={720}
                    y1={y(w(e))}
                    y2={y(w(e))}
                    stroke="#fdfaf0"
                    strokeWidth="2.5"
                    strokeDasharray="10 8"
                    opacity="0.85"
                  />
                ))}
              </g>
            )}
            {ey.map((e, t) => (
              <text
                key={t}
                x={612}
                y={y(e.y)}
                textAnchor="end"
                fontSize="21"
                fontWeight="700"
                fill="#16303f"
                stroke="#f7fbfc"
                strokeWidth="5"
                paintOrder="stroke"
                opacity={y(e.op)}
                strokeLinejoin="round"
                className="ly-lbl"
              >
                {e.lines.map((e, t) => (
                  <tspan key={t} x={612} dy={0 === t ? 0 : "1.15em"}>
                    {e}
                  </tspan>
                ))}
              </text>
            ))}
            <g
              className="ly-small"
              fontSize="16"
              fontWeight="700"
              fill="#f7fbfc"
              stroke="#1f3a4a"
              strokeWidth="3"
              paintOrder="stroke"
              textAnchor="end"
            >
              {[10, 20, 30].map((e) => (
                <g key={e}>
                  <line x1={710} x2={720} y1={w(e)} y2={w(e)} stroke="#f7fbfc" strokeWidth="2" />
                  <text x={706} y={w(e) + 6}>
                    {e}
                    {" m"}
                  </text>
                </g>
              ))}
            </g>
            <path d={N} fill="#6f5a45" />
            <path d={C[0]} fill="#654f3c" />
            <path d={C[1]} fill="#5a4636" />
            <path d={`${v}`} fill="none" stroke="#8a7156" strokeWidth="6" />
            {U.map((e, t) => (
              <circle key={t} cx={e.x} cy={e.y} r={e.r} fill="#4f3f31" opacity="0.5" />
            ))}
            <path d={$(M.slice(0, 4))} fill="none" stroke={el} strokeWidth="9" strokeLinecap="round" className="ly-fade" />
            {F.map((e, t) => (
              <ellipse key={t} cx={e.x} cy={e.y} rx={e.rx} ry={e.ry} fill={e.c} stroke="#4c463f" strokeWidth="1.5" />
            ))}
            <g transform="translate(400 560)">
              <text x="0" y="-6" fontSize="16" fontWeight="700" fill="#f3e9da">
                water temperature
              </text>
              <rect x="0" y="0" width="290" height="12" rx="6" fill={`url(#${s}-scale)`} stroke="#f3e9da" strokeWidth="1.5" />
              {[0, 4, 10, 15, 20, 25].map((e) => (
                <g key={e}>
                  <line x1={y((e / 27) * 290)} x2={y((e / 27) * 290)} y1="12" y2="18" stroke="#f3e9da" strokeWidth="2" />
                  <text x={y((e / 27) * 290)} y="33" fontSize="15" fontWeight="700" fill="#f3e9da" textAnchor="middle">
                    {e}
                    {25 === e ? " °C" : ""}
                  </text>
                </g>
              ))}
            </g>
            {X.map((e, t) => {
              let s = y(Math.min(e.y - 140 - 8, 76 * e.h * ea + 6));
              return (
                <g key={t} transform={`translate(${e.x} ${e.y})`}>
                  <g
                    className="ly-weed"
                    style={{
                      animationDelay: `${e.d}s`,
                    }}
                  >
                    {0 === e.kind ? (
                      <path
                        d={`M0 0 Q${e.lean} ${-(0.5 * s)} ${-(0.3 * e.lean)} ${-s}`}
                        fill="none"
                        stroke={er}
                        strokeWidth="4"
                        strokeLinecap="round"
                        className="ly-fade"
                      />
                    ) : 1 === e.kind ? (
                      <g fill={er} className="ly-fade">
                        <path d={`M-2 0 Q${e.lean} ${-(0.6 * s)} ${0.4 * e.lean} ${-s} Q${0.6 * e.lean + 4} ${-(0.6 * s)} 2 0Z`} />
                      </g>
                    ) : (
                      <g stroke={er} strokeWidth="2.5" fill="none" strokeLinecap="round" className="ly-fade">
                        <path d={`M0 0 L${0.3 * e.lean} ${-s}`} />
                        {[0.3, 0.55, 0.8].map((t) => (
                          <path key={t} d={`M${y(0.3 * e.lean * t)} ${y(-s * t)} l-6 -5 M${y(0.3 * e.lean * t)} ${y(-s * t)} l6 -5`} />
                        ))}
                      </g>
                    )}
                  </g>
                </g>
              );
            })}
            {B.map((e, t) => (
              <g key={t} transform={`translate(${e.x} ${e.y})`}>
                <circle
                  className="ly-bub"
                  r={e.r}
                  fill="none"
                  stroke="#f4fbff"
                  strokeWidth="1.2"
                  style={{
                    animationDuration: `${e.dur}s`,
                    animationDelay: `${e.delay}s`,
                    "--rise": `${-e.rise}px`,
                  }}
                />
              </g>
            ))}
            {J.ice > 0.01 && (
              <g>
                {
                  ((t = 140 - 0.12 * en),
                  ed <= 0 ? (
                    <g>
                      <rect x={88} y={y(t)} width={y(eh - 94 + 6)} height={y(en)} fill={`url(#${s}-ice)`} />
                      <line x1={88} x2={y(eh)} y1={y(t + en)} y2={y(t + en)} stroke="#5f8fae" strokeWidth="2" />
                      {J.ice > 0.3 && (
                        <text x="150" y={y(t + en / 2 + 6)} fontSize="17" fontWeight="800" fill="#3d6f90" className="ly-small">
                          ice
                        </text>
                      )}
                      <path
                        d={`M170 ${y(t + 2)} l12 ${y(0.5 * en)} l-6 ${y(0.4 * en)} M390 ${y(t + 1)} l-10 ${y(0.6 * en)} M600 ${y(t + 2)} l8 ${y(0.7 * en)}`}
                        stroke="#ffffff"
                        strokeWidth="1.5"
                        opacity="0.7"
                        fill="none"
                      />
                      {J.snow > 0.01 && (
                        <path
                          d={`M88 ${y(t)} ${Array.from(
                            {
                              length: 12,
                            },
                            (e, s) => {
                              let a = 88 + ((eh - 94 + 6) * (s + 1)) / 12;
                              return `Q${y(a - 28)} ${y(t - 34 * J.snow - (s % 2) * 3)} ${y(a)} ${y(t - 20 * J.snow)}`;
                            },
                          ).join(" ")} L${y(eh)} ${y(t)}Z`}
                          fill="#fbfdff"
                        />
                      )}
                    </g>
                  ) : (
                    <g>
                      {[
                        [94, 140],
                        [245, 200],
                        [460, 160],
                        [630, 720],
                      ].map(([e, a], r) => {
                        let l = 36 * ed,
                          n = e + (r ? l : 0),
                          i = a - l;
                        return i - n < 8 ? null : (
                          <rect
                            key={r}
                            x={y(n)}
                            y={y(t + 2 * ed)}
                            width={y(i - n)}
                            height={y(Math.max(3, en))}
                            rx="3"
                            fill={`url(#${s}-ice)`}
                          />
                        );
                      })}
                    </g>
                  ))
                }
                {W <= 1 && J.ice > 0.4 && (
                  <g transform={`translate(668 ${y(140 - 0.12 * en - 18 * J.snow)})`}>
                    <line x1="-18" y1="0" x2="-18" y2={y(en + 70)} stroke="#2a2a2a" strokeWidth="1.2" />
                    <rect x="-26" y="-40" width="48" height="40" fill="#b8443a" stroke="#6e2a24" strokeWidth="2" />
                    <path d="M-30 -40 L-2 -58 L26 -40 Z" fill="#6e5a48" stroke="#4a3a2e" strokeWidth="2" />
                    <rect x="-6" y="-26" width="12" height="14" fill="#f4d98a" />
                    <path d="M14 -58 v-10" stroke="#6e5a48" strokeWidth="4" />
                  </g>
                )}
              </g>
            )}
            {J.ice <= 0.01 && <line x1={94} x2={720} y1={141} y2={141} stroke="#f1fbff" strokeWidth="2.5" opacity="0.8" />}
            {W >= 4 && W <= 8 && J.ice <= 0.01 && (
              <g transform="translate(640 142)">
                <g className="ly-loon">
                  <path d="M-22 -2 Q-20 -12 -4 -12 Q10 -12 16 -8 L16 0 Q0 4 -22 -2Z" fill="#1f2224" />
                  <path d="M-16 -7 h20 M-14 -4 h22" stroke="#f4f6f6" strokeWidth="1.5" strokeDasharray="2 2.5" />
                  <path d="M10 -10 Q12 -24 20 -24 Q26 -24 26 -19 L34 -17 L26 -15 Q20 -14 18 -9Z" fill="#1f2224" />
                  <circle cx="22" cy="-20" r="1.3" fill="#c0392b" />
                  <path d="M13 -13 h6" stroke="#f4f6f6" strokeWidth="1.5" strokeDasharray="1.5 1.5" />
                </g>
              </g>
            )}
            <g>
              <g transform="translate(24 62)">
                {[0, 1, 2, 3].map((e) => (
                  <path key={e} d={`M0 ${-66 + 14 * e}L${14 + 5 * e} ${-40 + 14 * e}L${-14 - 5 * e} ${-40 + 14 * e}Z`} fill="#2f4a36" />
                ))}
                <rect x="-3" y="4" width="6" height="8" fill="#5b4330" />
                {J.land > 0.4 &&
                  [0, 1, 2, 3].map((e) => (
                    <path key={e} d={`M0 ${-66 + 14 * e}L${7 + 2 * e} ${-54 + 14 * e}L${-7 - 2 * e} ${-54 + 14 * e}Z`} fill="#f5f8fa" />
                  ))}
              </g>
              <g transform="translate(62 94)">
                <path d="M0 0 V-58 M0 -30 L-12 -44 M0 -40 L11 -52" stroke="#efeae0" strokeWidth="5" strokeLinecap="round" />
                <path d="M0 -8 h2 M0 -22 h-2 M0 -36 h2" stroke="#3a3a3a" strokeWidth="2" />
                {eo && (
                  <g fill={eo} className="ly-fade">
                    <circle cx="-10" cy="-50" r="13" />
                    <circle cx="8" cy="-58" r="15" />
                    <circle cx="-2" cy="-68" r="12" />
                    <circle cx="12" cy="-44" r="10" />
                  </g>
                )}
                {9 === W && (
                  <g fill="#d0612e">
                    <ellipse cx="22" cy="-10" rx="3.5" ry="2" transform="rotate(30 22 -10)" />
                    <ellipse cx="-18" cy="6" rx="3.5" ry="2" transform="rotate(-20 -18 6)" />
                  </g>
                )}
              </g>
            </g>
            {J.land > 0.02 && (
              <path d={$(M.slice(0, 4))} fill="none" stroke="#fbfdff" strokeWidth="9" strokeLinecap="round" opacity={y(J.land)} />
            )}
            {(W <= 1 || 11 === W) &&
              R.map((e, t) => (
                <g key={t} transform={`translate(${e.x} 0)`}>
                  <circle
                    className="ly-flake"
                    r={e.r}
                    fill="#ffffff"
                    opacity="0.9"
                    style={{
                      animationDuration: `${e.dur}s`,
                      animationDelay: `${e.delay}s`,
                      "--drift": `${e.drift}px`,
                    }}
                  />
                </g>
              ))}
          </g>
          {ef.map((e) => {
            let t = (0, i.lookFor)(e.slug),
              s = e.len,
              a = p === e.slug,
              r =
                "school" === e.group
                  ? [
                      [0, 0, 0],
                      [-24, -12, 0],
                      [18, 10, 0],
                    ]
                  : "ball" === e.group
                    ? [
                        [0, 0, 20],
                        [10, -8, -28],
                        [-8, 8, 160],
                      ]
                    : [[0, 0, 0]];
            return (
              <g
                key={e.slug}
                role="button"
                tabIndex={0}
                aria-pressed={a}
                aria-label={`${e.name}. Tap to see why it is here in ${c[W]}.`}
                className="ly-fish ly-move"
                style={{
                  transform: `translate(${e.x}px, ${e.y}px)`,
                }}
                onClick={() => b(a ? null : e.slug)}
                onKeyDown={(t) => {
                  ("Enter" === t.key || " " === t.key) && (t.preventDefault(), b(a ? null : e.slug));
                }}
              >
                <ellipse rx={Math.max(s / 2 + 14, 46)} ry={e.group ? 34 : 30} fill="#ffffff" opacity="0" />
                <g
                  className="ly-bob"
                  style={{
                    animationDelay: `${(s % 7) * 0.3}s`,
                  }}
                >
                  <g
                    className={"ball" === e.group ? "ly-ball" : "ly-swim"}
                    style={{
                      animationDelay: `${-(s % 9)}s`,
                      animationDuration: `${7 + (s % 5)}s`,
                    }}
                  >
                    <ellipse
                      className="ly-ring"
                      rx={s / 2 + 12}
                      ry={e.group ? 28 : 20}
                      fill="#fffbe8"
                      fillOpacity="0.25"
                      stroke="#d9a441"
                      strokeWidth="3"
                      strokeDasharray="7 5"
                    />
                    {r.map(([e, a, r], l) => (
                      <g
                        key={l}
                        transform={`translate(${e} ${a}) rotate(${r}) translate(${y(-s / 2)} 0) scale(${y((s / 100) * 100) / 100})`}
                      >
                        <i.FishArt look={t} detail={false} outline={1} seed={l + 1} />
                      </g>
                    ))}
                  </g>
                </g>
              </g>
            );
          })}
        </svg>
      </div>
      <p aria-live="polite" className="font-display mt-3 min-h-[5.5rem] text-lg leading-snug sm:min-h-[4rem] sm:text-xl">
        <span className="font-semibold">{T[W].split(/[.:]/)[0]}</span>
        {T[W].slice(T[W].split(/[.:]/)[0].length)}
      </p>
      <div className="mt-2 grid items-center gap-3 sm:grid-cols-[1fr_auto]">
        <G
          value={L}
          onChange={(e) => {
            (f(false), h(e));
          }}
        />
        <button
          type="button"
          onClick={() => {
            if (d) {
              (f(false), h(Math.round(L) % 12));
              return;
            }
            ((z.current = Math.round(L) % 12), h(z.current), f(true));
          }}
          className="min-h-12 rounded-full bg-moss px-5 py-2 text-lg font-semibold text-white shadow-sm transition active:scale-95"
        >
          {d ? "Pause" : "▶ Play the year"}
        </button>
      </div>
      <div className="mt-4 rounded-2xl bg-paper-2 px-4 py-3" aria-live="polite">
        {eu ? (
          <div>
            <p className="eyebrow text-moss">{c[W]}</p>
            <p className="font-display text-xl font-semibold">{eu.name}</p>
            <p className="mt-1 text-sm leading-relaxed text-ink">{eu.why}</p>
            <l.default
              href={`/wildlife/${eu.slug}`}
              className="mt-2 inline-flex min-h-10 items-center font-semibold text-azure underline-offset-4 hover:underline"
            >
              {"More about the "}
              {eu.name.toLowerCase()}
              {" →"}
            </l.default>
          </div>
        ) : (
          <p className="text-base">
            {"Tap a fish to find out why it’s there in "}
            {c[W]}. Then move the month and watch where it goes.
          </p>
        )}
      </div>
      <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="The fish in the lake">
        {e
          .filter((e) => A[e.slug])
          .map((e) => (
            <button
              key={e.slug}
              type="button"
              aria-pressed={p === e.slug}
              onClick={() => b(p === e.slug ? null : e.slug)}
              className={`flex min-h-11 items-center gap-1.5 rounded-full border-2 py-1 pl-2 pr-3 text-sm font-semibold transition active:scale-95 ${p === e.slug ? "border-gold bg-[#fbf1da] text-ink" : "border-line bg-paper text-ink-2 hover:border-moss/50"}`}
            >
              <svg viewBox="-4 -16 108 32" className="h-5 w-10" aria-hidden="true" focusable="false">
                <i.FishArt look={(0, i.lookFor)(e.slug)} detail={false} outline={0.8} />
              </svg>
              {e.name}
            </button>
          ))}
      </div>
      <CQ_
        two="Brrr, ice on top! Warm on top in summer, cold down deep."
        four="In summer the top of the lake is warm and the bottom stays cold. Each fish swims to the water it likes best."
        six="Water is heaviest at 4 °C, so it sinks to the bottom. That's why a lake freezes from the top down, and fish can live under the ice all winter."
        outside="Next time you swim in a lake, let your feet dangle down: feel how much colder the water is just a little way below the top."
      />
      <p className="mt-3 text-xs text-ink-2">
        A typical deep northern lake, about 30 m deep. Real lakes differ: ice-out and ice-on move by weeks from year to year and from south
        to north, and shallow lakes may not layer at all.
      </p>
    </div>
  );
};
