"use client";
// Restored from client module 24581 (exports: SoilDig)
import * as r from "react/jsx-runtime";
import * as s from "react";
let t;
let o = [
    {
      id: "litter",
      name: "Leaf litter",
      top: 150,
      bottom: 180,
      mid: 166,
      pillY: 167,
      range: "about 0–5 cm down",
      colour: "#86592f",
    },
    {
      id: "topsoil",
      name: "Topsoil",
      top: 180,
      bottom: 262,
      mid: 222,
      pillY: 221,
      range: "about 5–25 cm down",
      colour: "#4a3325",
    },
    {
      id: "subsoil",
      name: "Subsoil",
      top: 262,
      bottom: 345,
      mid: 304,
      pillY: 303,
      range: "about 25 cm to 1 m down",
      colour: "#b58755",
    },
    {
      id: "weathered",
      name: "Weathered rock",
      top: 345,
      bottom: 420,
      mid: 382,
      pillY: 382,
      range: "from about 1 m down",
      colour: "#8a7d6c",
    },
    {
      id: "bedrock",
      name: "Bedrock",
      top: 420,
      bottom: 500,
      mid: 462,
      pillY: 443,
      range: "at a depth the maps here do not give",
      colour: "#9b8c86",
    },
  ],
  i = [
    [150, 0],
    [180, 5],
    [262, 25],
    [345, 100],
    [420, 200],
    [500, 320],
  ],
  a = [
    [0, "0"],
    [5, "5 cm"],
    [25, "25 cm"],
    [100, "1 m"],
    [200, "2 m"],
    [300, "3 m"],
  ];
function l(e) {
  for (let t = 1; t < i.length; t++) {
    let [r, s] = i[t],
      [o, a] = i[t - 1];
    if (e <= s) return o + ((e - a) / (s - a)) * (r - o);
  }
  return 500;
}
function n(e) {
  if (e < 0.5) return "0 cm";
  if (e < 100) return `${Math.round(e)} cm`;
  let t = Math.round(e / 10) / 10;
  return `${t} m`;
}
let d = (e, t, r) => Math.min(r, Math.max(t, e));
function c(e) {
  if (e <= 151) return -1;
  let t = o.findIndex((t) => e < t.bottom);
  return -1 === t ? o.length - 1 : t;
}
let x = (e) => 2.6 * Math.sin(e / 47) + 1.6 * Math.sin(e / 19 + 1),
  h = Array.from(
    {
      length: 41,
    },
    (e, t) => 20 * t,
  ),
  f = (e) => h.map((t) => `L${t} ${(e + x(t)).toFixed(1)}`).join(" "),
  p = o.map((e) => `M0 500 ${f(e.top)} L800 500 Z`),
  u = `M0 ${x(0).toFixed(1)} ${f(0)} L800 420 L0 420 Z`,
  m =
    ((t = 0x1352841),
    () => {
      let e = (t = (t + 0x6d2b79f5) >>> 0);
      return ((e = Math.imul(e ^ (e >>> 15), 1 | e)), (((e ^= e + Math.imul(e ^ (e >>> 7), 61 | e)) ^ (e >>> 14)) >>> 0) / 0x100000000);
    }),
  j = ["#d9822b", "#c8352b", "#d9a441", "#a5642c", "#b8742f", "#8f4a22"],
  k = Array.from(
    {
      length: 30,
    },
    (e, t) => ({
      x: 100 + 23.5 * t + 12 * m(),
      y: 156 + 18 * m(),
      rot: -40 + 80 * m(),
      s: 0.8 + 0.5 * m(),
      c: j[Math.floor(m() * j.length)],
    }),
  ).filter((e) => e.x < 344 || e.x > 456),
  y = Array.from(
    {
      length: 120,
    },
    () => ({
      x: 96 + 704 * m(),
      y: 186 + 70 * m(),
      r: 1.4 + 2.4 * m(),
      c: m() > 0.5 ? "#6b4b34" : "#33241a",
    }),
  ),
  g = Array.from(
    {
      length: 16,
    },
    (e, t) => ({
      x: 110 + 44 * t + 18 * m(),
      y: 274 + 60 * m(),
      rx: 7 + 9 * m(),
      ry: 5 + 5 * m(),
      rot: -20 + 40 * m(),
      c: ["#9c978d", "#a89f90", "#857f76", "#c2b8a6"][Math.floor(4 * m())],
    }),
  ),
  b = Array.from(
    {
      length: 14,
    },
    () => ({
      x: 100 + 680 * m(),
      y: 270 + 68 * m(),
      w: 18 + 30 * m(),
    }),
  ),
  M = (() => {
    let e = [],
      t = ["#a89c8a", "#b6ab98", "#978b7a", "#a19684"];
    for (let r = 0; r < 3; r++) {
      let s = 358 + 24 * r;
      for (let o = 100 + (r % 2) * 20; o < 800; o += 40) {
        let r = o + 10 * m(),
          i = s + 6 * m(),
          a = Array.from(
            {
              length: 6,
            },
            (e, t) => {
              let s = (t / 6) * Math.PI * 2 + 0.5 * m(),
                o = 11 + 8 * m();
              return `${(r + Math.cos(s) * o * 1.3).toFixed(1)} ${(i + Math.sin(s) * o * 0.75).toFixed(1)}`;
            },
          );
        e.push({
          d: `M${a.join(" L")} Z`,
          c: t[Math.floor(m() * t.length)],
        });
      }
    }
    return e;
  })(),
  L = Array.from(
    {
      length: 170,
    },
    () => ({
      x: 92 + 708 * m(),
      y: 426 + 72 * m(),
      r: 1 + 2.2 * m(),
      k: Math.floor(3 * m()),
    }),
  ),
  $ = Array.from(
    {
      length: 80,
    },
    (e, t) => ({
      x: 92 + 9 * t + 4 * m(),
      h: 7 + 9 * m(),
      lean: -3 + 6 * m(),
    }),
  ),
  w = Array.from(
    {
      length: 34,
    },
    () => ({
      x: 100 + 690 * m(),
      len: 14 + 34 * m(),
      bend: -6 + 12 * m(),
    }),
  ).filter((e) => e.x < 348 || e.x > 452),
  v = Array.from(
    {
      length: 60,
    },
    () => ({
      x: 800 * m(),
      y: 12 + 380 * m(),
      r: 1.5 + 3 * m(),
    }),
  );
function W({ x: e, y: t }) {
  return (
    <g transform={`translate(${e} ${t})`}>
      <g className="sd-pop">
        <g stroke="#1b1c26" strokeWidth={2} strokeLinecap="round">
          <path d="M-6 -6 L-10 -12 M0 -7 L0 -13 M6 -6 L10 -12 M-6 6 L-10 12 M0 7 L0 13 M6 6 L10 12" />
          <path d="M18 -2 L25 -8 M18 2 L25 7" strokeWidth={1.5} />
        </g>
        <ellipse cx={0} cy={0} rx={13} ry={8.5} fill="#2b3150" />
        <path d="M-12 0 L11 0" stroke="#59628a" strokeWidth={1.3} />
        <circle cx={14} cy={0} r={5.5} fill="#1d2033" />
        <ellipse cx={-4} cy={-4} rx={5} ry={2} fill="#fff" opacity={0.28} />
      </g>
    </g>
  );
}
function F({ x: e, y: t }) {
  return (
    <g transform={`translate(${e} ${t})`}>
      <g className="sd-pop">
        <g stroke="#5d626a" strokeWidth={1.6} strokeLinecap="round">
          <path d="M-10 7 L-12 11 M-4 8 L-5 12 M2 8 L2 12 M8 7 L9 11" />
          <path d="M15 -2 L24 -9 M15 1 L25 -3" />
        </g>
        <path d="M-16 6 Q-16 -9 0 -9 Q16 -9 16 6 Z" fill="#8f959e" />
        <g stroke="#6b7079" strokeWidth={1.3} fill="none">
          <path d="M-9 6 Q-10 -2 -8 -7 M-3 6 Q-4 -3 -2 -9 M3 6 Q3 -3 4 -9 M9 6 Q10 -2 9 -7" />
        </g>
        <ellipse cx={-3} cy={-5} rx={6} ry={1.8} fill="#fff" opacity={0.3} />
      </g>
    </g>
  );
}
function C({ d: e }) {
  return (
    <g className="sd-pop">
      <path d={e} fill="none" stroke="#b86a6a" strokeWidth={9} strokeLinecap="round" />
      <path d={e} fill="none" stroke="#e59a95" strokeWidth={6.5} strokeLinecap="round" />
      <path d={e} fill="none" stroke="#f6c2bd" strokeWidth={1.6} strokeLinecap="round" strokeDasharray="2 7" />
    </g>
  );
}
function N({ x: e, y: t, rot: s = 0 }) {
  return (
    <g transform={`translate(${e} ${t}) rotate(${s})`}>
      <g className="sd-pop">
        <g stroke="#3a1a12" strokeWidth={1.1} strokeLinecap="round">
          <path d="M-1 0 L-4 -4 M-1 0 L-4 4 M1 0 L1 -5 M1 0 L1 5 M3 0 L6 -4 M3 0 L6 4 M8 -1 L11 -5" />
        </g>
        <circle cx={-4} cy={0} r={3} fill="#7a2e1e" />
        <circle cx={1.5} cy={0} r={2.2} fill="#7a2e1e" />
        <circle cx={6.5} cy={0} r={2.6} fill="#7a2e1e" />
      </g>
    </g>
  );
}
function A({ x: e, y: t }) {
  return (
    <g transform={`translate(${e} ${t})`}>
      <g className="sd-pop">
        <path d="M-30 2 Q-38 4 -40 -1" stroke="#e8a6a0" strokeWidth={3} fill="none" strokeLinecap="round" />
        <ellipse cx={0} cy={0} rx={31} ry={17} fill="#5a5560" />
        <ellipse cx={-6} cy={-7} rx={16} ry={5} fill="#77717d" />
        <path d="M27 -5 Q42 -3 44 1 Q42 5 27 6 Z" fill="#e8a6a0" />
        <circle cx={44} cy={1} r={2.6} fill="#c7746d" />
        <g stroke="#d9d2cf" strokeWidth={0.9} opacity={0.8}>
          <path d="M38 -1 L48 -6 M38 2 L49 2 M38 4 L47 8" />
        </g>
        <circle cx={25} cy={-6} r={1.4} fill="#111" />
        <path d="M14 10 Q22 8 26 14 Q24 20 16 19 Q10 16 14 10 Z" fill="#eeaaa3" />
        <g stroke="#f7e6e2" strokeWidth={1.4} strokeLinecap="round">
          <path d="M24 14 L29 15 M24 17 L28 19 M22 19 L25 22" />
        </g>
      </g>
    </g>
  );
}
function S({ two: e, four: t, six: s, outside: o }) {
  return (
    <div className="rounded-2xl border border-line bg-paper-2/60 p-4 text-sm leading-snug">
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
        {o}
      </p>
    </div>
  );
}
let Q = `
@keyframes sd-pop { from { opacity: 0; transform: scale(0.4); } 70% { opacity: 1; transform: scale(1.12); } to { opacity: 1; transform: scale(1); } }
@keyframes sd-bob { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(9px); } }
.sd-pop { transform-box: fill-box; transform-origin: center; animation: sd-pop 480ms ease-out both; }
.sd-bob { animation: sd-bob 1.3s ease-in-out infinite; }
@media (prefers-reduced-motion: reduce) { .sd-pop, .sd-bob { animation: none; } }
`;
export const SoilDig = function ({ rock: e, rockAge: t, soil: x, placeName: h, cover: cv, noRock: nr, desert: ds, caliche: ca }) {
  // Where the maps show a loose deposit over the rock (cover: { name, thickness }), the fourth layer is that deposit and the
  // rock's depth is not given: a typical 2 m would be wrong under most glaciated towns (Chicago's rock is 20 to 30 m down).
  // cover.kind is "weathered" for rock rotted where it lies (saprolite, residuum: audit of 10 November 2026, Richmond,
  // Charlotte, Atlanta), else "deposit". Where the map gives the cover's thickness, the rock lies under that thickness.
  // noRock: the maps name no rock under the cover (audit of 11 November 2026: Houston, New Orleans, Memphis and
  // Brownsville, where the sediment runs hundreds to thousands of metres down). The dig then has four layers and stops in
  // the cover, which fills the bottom of the picture; no solid rock is drawn or named, and nothing deeper is claimed.
  // desert: a desert by the site's climate normals (Köppen BW; audit of 13 November 2026, Tucson, Phoenix, Las Vegas). The
  // top layers are drawn as desert ground: a dry surface with no leaf litter, a pale topsoil low in rotted plant matter
  // (Aridisols: "a surface horizon ... light in colour with very low humus content", Britannica; the USDA Tucson series:
  // light brown, less than 1 percent organic matter), no tree, grass, earthworms or mole. caliche: the map lists soil
  // carbonate at the dig's cover (Tucson, Macrostrat 3662608); the subsoil is then named for it (the Tucson series has a
  // calcic horizon within 20 inches, https://soilseries.sc.egov.usda.gov/OSD_Docs/T/TUCSON.html).
  const base = o.map((L) =>
      L.id === "litter" && ds
        ? { ...L, name: "Dry surface", colour: "#d6bd92" }
        : L.id === "topsoil" && ds
          ? { ...L, colour: "#b38f66" }
          : L.id === "subsoil" && (ds || ca)
            ? { ...L, name: ca ? "Subsoil with caliche" : L.name, colour: ds ? "#c7a57b" : L.colour }
            : L,
    ),
    cvName = cv?.name?.trim() || "",
    cvLower = cvName.toLowerCase(),
    cvThick = cv?.thickness?.trim() || "",
    cvWeathered = cv?.kind === "weathered",
    cvVolcanic = cv?.kind === "volcanic",
    stop = !!nr && !!cvName,
    lay = stop
      ? base.slice(0, 4).map((L) => (L.id === "weathered" ? { ...L, name: cvName, bottom: 500, range: "from about 1 m down, as deep as this dig goes" } : L))
      : cvName
        ? base.map((L) =>
            L.id === "weathered"
              ? { ...L, name: cvName, range: "from about 1 m down" }
              : L.id === "bedrock"
                ? { ...L, range: cvThick ? `under the ${cvLower}, as thick as the map says` : `under the ${cvLower}, at a depth the maps here do not give` }
                : L,
          )
        : // Audit of 10 November 2026, checked 14 November: with no cover unit mapped, the dig drew "Weathered rock" at
          // 1 to 2 m and the rock at a typical 2 m. Saskatoon has more than 100 m of glacial drift, with lake clay to about
          // 25 m; Thompson, Val-d'Or, Saguenay, Whitehorse, Yellowknife, Nanaimo, Victoria and Bozeman lie under glacial,
          // lake or marine deposits or basin fill that no map at the point shows (Macrostrat has no surface-deposit map
          // for most of Canada). A map that shows no cover does not show the rock at the surface, so the depth to rock is
          // not given, and the fourth layer is named for what is known: deeper ground.
          base.map((L) =>
            L.id === "weathered"
              ? { ...L, name: "Deeper ground", range: "from about 1 m down" }
              : L.id === "bedrock"
                ? { ...L, range: "at a depth the maps here do not give" }
                : L,
          ),
    ci = (y) => Math.min(c(y), lay.length - 1),
    // The ruler stops at 1 m everywhere: no map here gives the depth to rock at a point, so nothing deeper is measured.
    ticks = a.slice(0, 4),
    deep = (X) => (X > 100 ? "more than 1 m" : `about ${n(X)}`);
  let f,
    m = (0, s.useId)().replace(/[^a-zA-Z0-9_-]/g, ""),
    j = (0, s.useRef)(null),
    T = (0, s.useRef)(null),
    D = (0, s.useRef)(150),
    Z = (0, s.useRef)(null),
    I = (0, s.useRef)({
      id: 0,
    }),
    [P, Y] = (0, s.useState)(150),
    [E, R] = (0, s.useState)(false);
  ((0, s.useEffect)(() => {
    let e = I.current;
    return () => cancelAnimationFrame(e.id);
  }, []),
    (0, s.useEffect)(() => {
      let e = T.current;
      if (!e) return;
      let t = (e) => e.preventDefault();
      return (
        e.addEventListener("touchstart", t, {
          passive: false,
        }),
        e.addEventListener("touchmove", t, {
          passive: false,
        }),
        () => {
          (e.removeEventListener("touchstart", t), e.removeEventListener("touchmove", t));
        }
      );
    }, []));
  let U = (e) => {
      let t = d(e, 150, 488);
      ((D.current = t), Y(t));
    },
    z = (e) => {
      cancelAnimationFrame(I.current.id);
      let t = D.current,
        r = {
          t0: -1,
        },
        s = 380 + Math.min(420, 2.2 * Math.abs(e - t)),
        o = (i) => {
          r.t0 < 0 && (r.t0 = i);
          let a = Math.min(1, (i - r.t0) / s);
          (U(t + (e - t) * (1 - Math.pow(1 - a, 3))), a < 1 && (I.current.id = requestAnimationFrame(o)));
        };
      I.current.id = requestAnimationFrame(o);
    },
    q = () => {
      let e = ci(D.current);
      e < lay.length - 1 && z(lay[e + 1].mid);
    },
    B = () => {
      let e = ci(D.current);
      z(e > 0 ? lay[e - 1].mid : 150);
    },
    O = (e, t) => {
      let r = j.current?.getScreenCTM();
      return r ? new DOMPoint(e, t).matrixTransform(r.inverse()) : null;
    },
    K = (e) => {
      Z.current?.id === e.pointerId && ((Z.current = null), R(false));
    },
    H = ci(P),
    G = H >= 0 ? lay[H] : null,
    X = (function (e) {
      if (e <= i[0][0]) return 0;
      for (let t = 1; t < i.length; t++) {
        let [r, s] = i[t],
          [o, a] = i[t - 1];
        if (e <= r) return a + ((e - o) / (r - o)) * (s - a);
      }
      return i[i.length - 1][1];
    })(P),
    _ = H < 0 ? 150 : lay[H].bottom,
    J =
      ((f = (e ?? "").toLowerCase()),
      /granit|gneiss|syenite|granodiorite|pegmatite/.test(f)
        ? {
            base: "#b99c92",
            crack: "#6f5d57",
            specks: ["#2b2626", "#f4eee8", "#d9897a"],
          }
        : /marble|limestone|dolom|chalk/.test(f)
          ? {
              base: "#d2cab7",
              crack: "#958c78",
              specks: ["#eee8da", "#aaa18d", "#8c8474"],
            }
          : /sandstone|quartzite/.test(f)
            ? {
                base: "#c99f69",
                crack: "#8b6a41",
                specks: ["#e3c291", "#a47c4c", "#f1dfbd"],
              }
            : /shale|slate|mudstone|schist/.test(f)
              ? {
                  base: "#6f6d6e",
                  crack: "#3f3e40",
                  specks: ["#8b898a", "#555355", "#a19ea0"],
                }
              : /basalt|gabbro|volcan|diabase/.test(f)
                ? {
                    base: "#56555a",
                    crack: "#2c2b2f",
                    specks: ["#77767c", "#3a393d", "#8d8b90"],
                  }
                : {
                    base: "#9d978f",
                    crack: "#66615b",
                    specks: ["#6f6a63", "#c5beb3", "#57534e"],
                  }),
    V = e?.trim() || "bedrock",
    ee = V.charAt(0).toUpperCase() + V.slice(1),
    // "449 to 446.5 million years old", or "from the Ordovician to the Devonian" where the map gives only the interval.
    et = t?.trim() ? (/old\s*$|^from\b/i.test(t.trim()) ? t.trim() : `${t.trim()} old`) : "",
    er = e?.trim() ? `${ee}${et ? `, ${et}` : ""}` : et ? `Solid rock, ${et}` : "Solid rock",
    es = h?.trim() ? ` in ${h.trim()}` : "",
    eo = e?.trim() ? (et ? [`${ee},`, et] : [ee]) : et ? ["Solid rock,", et] : ["Solid rock"],
    ei = Math.min(20, 320 / (0.58 * Math.max(...eo.map((e) => e.length)))),
    // Where the dig stops in the cover, the label in the bottom of the picture says why there is no rock there.
    nl = ["The maps show", "nothing deeper"],
    ni = Math.min(20, 320 / (0.58 * Math.max(...nl.map((e) => e.length)))),
    ea = o.map((e) => d(P - e.top, 0, e.bottom - e.top)),
    el = ea.map((e, t) => ea.slice(0, t + 1).reduce((e, t) => e + t, 0)).map((e) => (e > 0 ? 10 + 46 * Math.sqrt(e / 338) : 0)),
    en = base.map((e, t) => (t === base.length - 1 ? (stop ? base[3].colour : J.base) : e.colour)),
    ed = {
      litter: ds
        ? "Dry grit and small stones, and a beetle. Rain is scarce here, so few leaves pile up to rot into soil."
        : "Fallen leaves, beetles and a woodlouse. The leaves slowly rot away and turn into new soil.",
      topsoil: ds
        ? "Pale and light brown, not dark: desert soil holds very little rotted plant matter. Roots and an ant tunnel live here."
        : "Dark and crumbly, with earthworms, roots, an ant tunnel and a mole. The most alive layer: one handful holds more living things than there are people on Earth.",
      subsoil: `${
        ds ? "Lighter and harder — sand, silt and stones. Only the longest roots reach down here." : "Lighter and harder — clay, sand and stones. Only the longest roots reach down here, and far fewer creatures live this deep."
      }${ca ? " The map here lists soil carbonate, called caliche: lime that rain carries down and leaves behind, building up into a hard, chalky white layer." : ""}`,
      weathered: cvName
        ? `${cvName}: ${
            // From the maps' own descriptions: "grades down into underlying bedrock" (Atlanta, Macrostrat 4068443),
            // "developed on metamorphic or igneous rocks" (Charlotte, 4076559), "upper 3 m intensely weathered" (Richmond, 4179508).
            cvWeathered
              ? "ground that has gone soft and crumbly where it lies. The map calls it weathered: water has broken it down into clay and sand without carrying it away."
              : cvVolcanic
                ? "rock that came out of a volcano as lava or ash, young as rocks go."
                : stop
                  ? "loose clay, sand, gravel and stones that ice, rivers, lakes, the sea, the wind or slipping slopes left here."
                  : "loose clay, sand, gravel and stones that ice, rivers, lakes, the sea or slipping slopes left on top of the rock."
          } ${
            stop
              ? `${cvThick ? `The map says: ${cvThick} ` : "The maps here do not say how thick it is. "}They name nothing beneath it, so this dig stops in it.`
              : cvThick
                ? `The map says: ${cvThick}`
                : "The maps here do not say how thick it is: under some towns it is a metre or two, under others tens of metres."
          }`
        : "Below the subsoil. The maps here show no loose deposit at this spot, and they do not say how deep the rock is: under some towns it is a metre or two down, under others tens of metres of clay, sand and stones left by ice, rivers, lakes or the sea.",
      bedrock: cvName ? `${er}. Solid rock that everything else sits on, somewhere under the ${cvLower}.` : `${er}. Solid rock that everything else sits on, somewhere down below.`,
    },
    ec = {
      litter: ds ? "dry grit, small stones and a beetle" : "fallen leaves, a beetle and a woodlouse",
      topsoil: ds ? "pale soil, roots and an ant tunnel" : "earthworms, roots, an ant tunnel and a mole",
      subsoil: `${ds ? "sand, stones and long roots" : "clay, sand, stones and long tree roots"}${ca ? ", and a chalky white layer of caliche" : ""}`,
      weathered: cvName ? cvLower : "deeper ground",
      bedrock: `solid ${V.toLowerCase()}`,
    },
    ex =
      H < 0
        ? `A cut-away of the ground under a patch of ${ds ? "dry desert ground" : "grass"}. Nothing is dug yet, so the layers underneath are still hidden.`
        : `A cut-away of the ground under a patch of ${ds ? "dry desert ground" : "grass"}. The hole is ${deep(X)} deep and has reached the ${lay[H].name.toLowerCase()}: ${ec[lay[H].id]}.`,
    eh = (() => {
      let e = P - 150;
      if (e < 3) return "";
      let t = Math.min(26, e);
      return `M352 146 L352 ${P - t} Q352 ${P} ${352 + t} ${P} L${448 - t} ${P} Q448 ${P} 448 ${P - t} L448 146 Z`;
    })();
  return (
    <div className="grid gap-4">
      <style>{Q}</style>
      <div
        role="group"
        aria-label="The dig. Use the down and up arrow keys to dig deeper or back up."
        tabIndex={0}
        onKeyDown={(e) => {
          "ArrowDown" === e.key || "ArrowRight" === e.key
            ? (e.preventDefault(), q())
            : "ArrowUp" === e.key || "ArrowLeft" === e.key
              ? (e.preventDefault(), B())
              : "Home" === e.key
                ? (e.preventDefault(), z(150))
                : "End" === e.key && (e.preventDefault(), z(lay[lay.length - 1].mid));
        }}
        className="overflow-hidden rounded-2xl outline-none focus-visible:ring-4 focus-visible:ring-gold/60"
      >
        <svg ref={j} viewBox="0 0 800 500" className="block h-auto w-full select-none" role="img" aria-label={ex}>
          <defs>
            <linearGradient id={`${m}-sky`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#bfe0f1" />
              <stop offset="1" stopColor="#eef6ea" />
            </linearGradient>
            <linearGradient id={`${m}-hole`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#1c140e" />
              <stop offset="1" stopColor="#3a2a1f" />
            </linearGradient>
            <linearGradient id={`${m}-shade`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#fff" stopOpacity={0.14} />
              <stop offset="0.35" stopColor="#fff" stopOpacity={0} />
            </linearGradient>
          </defs>
          <rect x={0} y={0} width={800} height={160} fill={`url(#${m}-sky)`} />
          <g>
            <circle cx={738} cy={50} r={40} fill="#f6d77a" opacity={0.35} />
            <circle cx={738} cy={50} r={27} fill="#f4c653" />
          </g>
          <g fill="#fff" opacity={0.9}>
            <circle cx={548} cy={48} r={16} />
            <circle cx={568} cy={40} r={20} />
            <circle cx={592} cy={50} r={15} />
            <rect x={540} y={48} width={62} height={16} rx={8} />
          </g>
          {!ds && (
          <g>
            <path d="M183 150 L186 92 Q190 84 194 92 L198 150 Z" fill="#7a5433" />
            <path d="M190 104 L168 86 M191 98 L214 80" stroke="#7a5433" strokeWidth={5} strokeLinecap="round" />
            <circle cx={190} cy={56} r={44} fill="#4f8a47" />
            <circle cx={156} cy={78} r={30} fill="#5d9a52" />
            <circle cx={226} cy={76} r={32} fill="#467f40" />
            <circle cx={176} cy={42} r={22} fill="#67a55a" />
            <circle cx={208} cy={40} r={20} fill="#5a9650" />
          </g>
          )}
          {lay.map((e, t) => (
            <path key={e.id} d={p[t]} fill={"bedrock" === e.id ? J.base : e.colour} />
          ))}
          {lay.map((e, t) => (
            <path key={`${e.id}-shade`} d={p[t]} fill={`url(#${m}-shade)`} />
          ))}
          {!ds && (
          <g>
            {k.map((e, t) => (
              <g key={t} transform={`translate(${e.x.toFixed(1)} ${e.y.toFixed(1)}) rotate(${e.rot.toFixed(0)}) scale(${e.s.toFixed(2)})`}>
                <path d="M-11 0 Q0 -7 11 0 Q0 7 -11 0 Z" fill={e.c} />
                <path d="M-11 0 L11 0" stroke="#5a3417" strokeWidth={0.8} opacity={0.6} />
              </g>
            ))}
            <path d="M470 172 L520 168 M640 160 L676 166" stroke="#6b4423" strokeWidth={2.2} strokeLinecap="round" />
          </g>
          )}
          <g>
            {y.map((e, t) => (
              <circle key={t} cx={e.x.toFixed(1)} cy={e.y.toFixed(1)} r={e.r.toFixed(1)} fill={ds ? (e.c === "#33241a" ? "#9c7a52" : "#c9ab84") : e.c} />
            ))}
            <g stroke="#d9c29c" strokeWidth={1.3} fill="none" opacity={0.75} strokeLinecap="round">
              {w.map((e, t) => (
                <path
                  key={t}
                  d={`M${e.x.toFixed(1)} 152 q${e.bend.toFixed(1)} ${(e.len / 2).toFixed(1)} ${(e.bend / 3).toFixed(1)} ${e.len.toFixed(1)}`}
                />
              ))}
            </g>
            <path
              d="M500 152 C502 166 494 178 498 194 C502 206 492 216 498 228 M498 194 C512 200 526 206 536 218"
              stroke="#2a1b12"
              strokeWidth={9}
              fill="none"
              strokeLinecap="round"
            />
            <ellipse cx={498} cy={233} rx={16} ry={9} fill="#2a1b12" />
            <ellipse cx={541} cy={222} rx={14} ry={8} fill="#2a1b12" />
            <ellipse cx={537} cy={223} rx={4} ry={2.6} fill="#f1ead6" />
            <ellipse cx={544} cy={221} rx={4} ry={2.6} fill="#f1ead6" />
            {!ds && <path d="M322 164 C322 180 314 196 296 202 L232 206" stroke="#2c1f17" strokeWidth={28} fill="none" strokeLinecap="round" />}
          </g>
          <g>
            {b.map((e, t) => (
              <path
                key={t}
                d={`M${e.x.toFixed(1)} ${e.y.toFixed(1)} q${(e.w / 2).toFixed(1)} -4 ${e.w.toFixed(1)} 0`}
                stroke="#d0a574"
                strokeWidth={3}
                fill="none"
                strokeLinecap="round"
                opacity={0.7}
              />
            ))}
            {g.map((e, t) => (
              <g key={t} transform={`translate(${e.x.toFixed(1)} ${e.y.toFixed(1)}) rotate(${e.rot.toFixed(0)})`}>
                <ellipse rx={e.rx.toFixed(1)} ry={e.ry.toFixed(1)} fill={e.c} stroke="#6f685e" strokeWidth={1.2} />
                <ellipse cx={-e.rx / 3} cy={-e.ry / 3} rx={(e.rx / 3).toFixed(1)} ry={(e.ry / 4).toFixed(1)} fill="#fff" opacity={0.25} />
              </g>
            ))}
          </g>
          {ca && (
            // The caliche layer: a chalky white band in the subsoil.
            <path d="M88 292 Q200 284 300 294 T520 292 T800 296 L800 310 Q680 316 560 308 T320 312 T88 308 Z" fill="#efe8da" opacity={0.85} />
          )}
          {!ds && (
          <g stroke="#c9a37a" fill="none" strokeLinecap="round">
            <path d="M190 150 C188 200 176 250 180 300 C182 318 176 330 172 338" strokeWidth={6} />
            <path d="M188 160 C170 190 140 208 110 236" strokeWidth={4.5} />
            <path d="M193 160 C206 186 218 200 234 216" strokeWidth={4.5} />
            <path d="M184 240 C160 270 140 290 128 330" strokeWidth={3} />
            <path d="M196 226 C220 262 236 292 250 336" strokeWidth={3} />
            <path d="M180 300 C200 312 214 322 222 340" strokeWidth={2} />
            <path d="M110 236 C104 250 100 262 98 276" strokeWidth={2} />
          </g>
          )}
          <g>
            {M.map((e, t) => (
              <path key={t} d={e.d} fill={e.c} stroke="#5f5548" strokeWidth={1.6} strokeLinejoin="round" />
            ))}
          </g>
          {!stop && (
            <g>
              {L.map((e, t) => (
                <circle key={t} cx={e.x.toFixed(1)} cy={e.y.toFixed(1)} r={e.r.toFixed(1)} fill={J.specks[e.k]} opacity={0.85} />
              ))}
              <path
                d="M120 432 L160 452 L150 478 L186 498 M640 430 L612 458 L636 474 L622 500"
                stroke={J.crack}
                strokeWidth={2.4}
                fill="none"
                strokeLinejoin="round"
              />
            </g>
          )}
          {stop && H >= 3 && (
            <g className="sd-pop">
              <text x={624} y={470 - 0.3 * ni} textAnchor="middle" fontSize={ni} fontWeight={700} fill="#fffdf8" stroke="#3b3230" strokeWidth={4} paintOrder="stroke">
                {nl.map((e, t) => (
                  <tspan key={t} x={624} dy={t ? 1.15 * ni : 0}>
                    {e}
                  </tspan>
                ))}
              </text>
            </g>
          )}
          {H >= 0 && (
            <g>
              <W x={250} y={166} />
              {!ds && <F x={606} y={166} />}
            </g>
          )}
          {H >= 1 && (
            <g>
              {!ds && <C d="M574 206 C584 194 596 218 608 206 S628 194 640 210" />}
              {!ds && <C d="M584 246 C594 238 610 254 626 244" />}
              {!ds && <C d="M226 248 C238 240 250 254 262 246 S282 240 294 250" />}
              <N x={500} y={172} rot={95} />
              <N x={505} y={203} rot={25} />
              <N x={494} y={233} rot={0} />
              <N x={522} y={208} rot={30} />
              {!ds && <A x={268} y={204} />}
            </g>
          )}
          {H >= 4 && (
            <g className="sd-pop">
              <text
                x={624}
                y={eo.length > 1 ? 470 - 0.3 * ei : 482}
                textAnchor="middle"
                fontSize={ei}
                fontWeight={700}
                fill="#fffdf8"
                stroke="#3b3230"
                strokeWidth={4}
                paintOrder="stroke"
              >
                {eo.map((e, t) => (
                  <tspan key={t} x={624} dy={t ? 1.15 * ei : 0}>
                    {e}
                  </tspan>
                ))}
              </text>
            </g>
          )}
          <g
            style={{
              transform: `translateY(${_}px)`,
              transition: `transform ${E ? 220 : 420}ms ease-out`,
            }}
          >
            <path d={u} fill="#6d5846" />
            {v.map((e, t) => (
              <circle key={t} cx={e.x.toFixed(1)} cy={e.y.toFixed(1)} r={e.r.toFixed(1)} fill="#5a4838" />
            ))}
            <text x={640} y={62} textAnchor="middle" fontSize={52} fontWeight={800} fill="#fff" opacity={0.28}>
              ?
            </text>
          </g>
          <path d="M88 144 L800 144 L800 155 L88 155 Z" fill={ds ? "#cdb084" : "#6ea85a"} />
          {!ds && (
          <g stroke="#5b9249" strokeWidth={2.6} strokeLinecap="round">
            {$.map((e, t) => (
              <path key={t} d={`M${e.x.toFixed(1)} 147 l${e.lean.toFixed(1)} ${(-e.h).toFixed(1)}`} />
            ))}
          </g>
          )}
          <path d="M480 152 Q500 134 520 152 Z" fill="#c9a26c" />
          {!ds && (
          <g>
          <path d="M298 151 Q322 124 346 151 Z" fill="#4a3325" />
          <circle cx={322} cy={140} r={2.2} fill="#6b4b34" />
          <circle cx={314} cy={146} r={1.8} fill="#6b4b34" />
          <g>
            <path d="M466 148 L466 128" stroke="#5b9249" strokeWidth={2.4} />
            <circle cx={466} cy={125} r={7} fill="#f2c230" />
            <circle cx={466} cy={125} r={3} fill="#d9a441" />
          </g>
          <g>
            <path d="M140 148 L140 132" stroke="#5b9249" strokeWidth={2.4} />
            <circle cx={140} cy={129} r={6} fill="#fffdf8" />
            <circle cx={140} cy={129} r={2.5} fill="#f2c230" />
          </g>
          </g>
          )}
          {eh && (
            <g>
              <path d={eh} fill={`url(#${m}-hole)`} />
              <path d={eh} fill="none" stroke="#150e09" strokeWidth={2} opacity={0.6} />
            </g>
          )}
          <g transform={`translate(400 ${P.toFixed(1)})`}>
            <rect x={-5} y={-124} width={10} height={64} rx={4} fill="#b57f48" stroke="#8a5c30" strokeWidth={1.5} />
            <rect x={-20} y={-138} width={40} height={14} rx={7} fill="#8a5a30" />
            <rect x={-7} y={-64} width={14} height={16} rx={3} fill="#7d878b" />
            <path d="M-22 -50 L22 -50 L22 -18 Q22 -3 0 2 Q-22 -3 -22 -18 Z" fill="#b9c2c5" stroke="#6f787c" strokeWidth={2} />
            <path d="M-13 -44 L-13 -18" stroke="#fff" strokeWidth={3} strokeLinecap="round" opacity={0.55} />
          </g>
          {el
            .map((e, t) => ({
              h: e,
              i: t,
            }))
            .reverse()
            .map(({ h: e, i: t }) => {
              let s;
              return e > 0 ? (
                <path
                  key={t}
                  d={
                    ((s = 2.2 * e + 14),
                    `M${662 - s} 151 C${662 - 0.6 * s} ${151 - 0.25 * e} ${662 - 0.42 * s} ${151 - e} 662 ${151 - e} C${662 + 0.42 * s} ${151 - e} ${662 + 0.6 * s} ${151 - 0.25 * e} ${662 + s} 151 Z`)
                  }
                  fill={en[t]}
                  stroke="#2e2119"
                  strokeWidth={1}
                  strokeOpacity={0.35}
                />
              ) : null;
            })}
          {lay.map((e, t) => {
            if (t > H) return null;
            let s = e.name,
              o = 10.4 * s.length + 28,
              i = t === H;
            return (
              <g key={e.id} transform={`translate(${792 - o} ${e.pillY - 16})`}>
                <g className="sd-pop">
                  <rect width={o} height={32} rx={16} fill={i ? "#d9a441" : "#fffdf8"} opacity={i ? 1 : 0.9} />
                  <text x={o / 2} y={22} textAnchor="middle" fontSize={19} fontWeight={700} fill="#1f2a22">
                    {s}
                  </text>
                </g>
              </g>
            );
          })}
          <g>
            <rect x={12} y={140} width={74} height={370} rx={8} fill="#f3e3bb" stroke="#b8965a" strokeWidth={2} />
            {ticks.map(([e, t]) => {
              let s = l(e);
              return (
                <g key={t}>
                  <line x1={66} x2={86} y1={s} y2={s} stroke="#6b5226" strokeWidth={2.4} />
                  <text x={18} y={Math.min(s + 6, 496)} fontSize={16} fontWeight={700} fill="#5b4524">
                    {t}
                  </text>
                </g>
              );
            })}
            {[2.5, 15, 50, 75, 150, 250].map((e) => (
              <line key={e} x1={76} x2={86} y1={l(e)} y2={l(e)} stroke="#8a6d3a" strokeWidth={1.4} />
            ))}
            <path d={`M86 ${P.toFixed(1)} L100 ${(P - 9).toFixed(1)} L100 ${(P + 9).toFixed(1)} Z`} fill="#c8352b" />
          </g>
          {H < 0 && !E && (
            <g transform="translate(486 70)">
              <g className="sd-bob">
                <path d="M-14 -8 L0 6 L14 -8" stroke="#2f5d3a" strokeWidth={6} fill="none" strokeLinecap="round" strokeLinejoin="round" />
                <path
                  d="M-14 12 L0 26 L14 12"
                  stroke="#2f5d3a"
                  strokeWidth={6}
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity={0.6}
                />
              </g>
              <text x={22} y={10} fontSize={20} fontWeight={700} fill="#2f5d3a">
                Drag down
              </text>
            </g>
          )}
          <rect
            ref={T}
            x={290}
            y={0}
            width={220}
            height={500}
            fill="transparent"
            style={{
              touchAction: "none",
              cursor: E ? "grabbing" : "grab",
            }}
            onPointerDown={(e) => {
              let t = O(e.clientX, e.clientY);
              if (t) {
                cancelAnimationFrame(I.current.id);
                try {
                  e.currentTarget.setPointerCapture(e.pointerId);
                } catch {}
                ((Z.current = {
                  id: e.pointerId,
                  y0: t.y,
                  tip0: D.current,
                }),
                  R(true));
              }
            }}
            onPointerMove={(e) => {
              let t = Z.current;
              if (!t || t.id !== e.pointerId) return;
              let r = O(e.clientX, e.clientY);
              r && U(t.tip0 + (r.y - t.y0));
            }}
            onPointerUp={K}
            onPointerCancel={K}
          />
        </svg>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={B}
          disabled={H < 0}
          className="min-h-11 rounded-full border border-line px-4 py-2 font-semibold text-ink transition hover:border-moss active:scale-95 disabled:opacity-40"
        >
          ↑ Back up
        </button>
        <button
          type="button"
          onClick={q}
          disabled={H === lay.length - 1}
          className="min-h-11 rounded-full bg-moss px-4 py-2 font-semibold text-white transition hover:bg-moss-2 active:scale-95 disabled:opacity-40"
        >
          Dig deeper ↓
        </button>
        <p className="ml-auto text-sm font-semibold tabular-nums text-ink-2">
          {deep(X).replace(/^./, (c) => c.toUpperCase())}
          {" down"}
        </p>
      </div>
      <div className="rounded-2xl border border-line bg-paper-2/60 p-4" aria-live="polite">
        <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
          <p className="font-display text-2xl font-semibold leading-tight text-ink">{G ? G.name : ds ? "The ground" : "The grass"}</p>
          <p className="text-sm text-ink-2">{G ? G.range : "the top of the ground"}</p>
        </div>
        <p className="mt-1.5 leading-relaxed text-ink">
          {G
            ? ed[G.id]
            : `Under the ${ds ? "dry ground" : "grass"} is a whole hidden world. Drag the spade down — or press Dig deeper — to find out what is down there.`}
        </p>
        {G?.id === "topsoil" && x?.trim() && (
          <p className="mt-1.5 leading-relaxed text-ink">
            <span className="font-semibold">
              Here{es}
              {" it is "}
              {x.trim()}.
            </span>
          </p>
        )}
        <div className="mt-3 flex items-center gap-3">
          <ol className="flex flex-1 gap-1.5" aria-label={`${Math.max(0, H + 1)} of ${lay.length} layers found`}>
            {lay.map((e, t) => (
              <li
                key={e.id}
                className={`h-2.5 flex-1 rounded-full ${t <= H ? "" : "bg-line"}`}
                style={
                  t <= H
                    ? {
                        background: "bedrock" === e.id ? J.base : e.colour,
                      }
                    : undefined
                }
                title={e.name}
              />
            ))}
          </ol>
          <p className="shrink-0 text-xs font-semibold text-ink-2">
            {"Layer "}
            {Math.max(0, H + 1)}
            {" of "}
            {lay.length}
          </p>
        </div>
      </div>
      <p className="flex items-start gap-2 text-sm leading-snug text-ink-2">
        <svg viewBox="0 0 20 20" className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true">
          <path
            d="M5 2 H15 M5 18 H15 M6 2 C6 8 14 8 14 10 C14 12 6 12 6 18 M14 2 C14 8 6 8 6 10 C6 12 14 12 14 18"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.6}
            strokeLinecap="round"
          />
        </svg>
        <span>
          <span className="font-semibold text-ink">It takes hundreds of years to make one centimetre of topsoil.</span>
          {stop
            ? ` The top layers' depths are typical — every place is different. Here the maps show ${cvLower} and name nothing beneath it, so the dig stops there, and the ruler stops at 1 m.`
            : cvName
              ? ` The top layers' depths are typical — every place is different. Here the rock lies under ${cvLower}, and the maps do not give how deep, so the ruler stops at 1 m.`
              : " The top layers' depths are typical — every place is different. The maps here do not say how deep the rock is, so the ruler stops at 1 m."}
        </span>
      </p>
      <S
        two={ds ? "Dig, dig, dig! Who lives down there? A busy ant!" : "Dig, dig, dig! Who lives down there? A wiggly worm!"}
        four={
          stop
            ? `${ds ? "Grit, pale soil" : "Leaves, dark soil"}, lighter soil, ${cvLower}. Can you count the layers? Four!`
            : `${ds ? "Grit, pale soil" : "Leaves, dark soil"}, lighter soil, ${cvName ? cvLower : "deeper ground"}, solid rock. Can you count the layers? Five!`
        }
        six={
          ds
            ? "Desert topsoil is pale because so little rotted plant matter is in it. Why do you think so few leaves rot into the soil here?"
            : "Topsoil is made of rotted leaves and tiny bits of broken rock. Why do you think it takes hundreds of years to make?"
        }
        outside={
          ds
            ? "Look closely at a patch of bare ground and count how many different kinds of little stones you can find — then leave them where they are."
            : "Dig a small hole in the garden and count how many worms live in one shovelful — then put them all back and fill it in."
        }
      />
    </div>
  );
};
