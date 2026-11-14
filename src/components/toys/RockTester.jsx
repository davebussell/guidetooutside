"use client";
/* eslint-disable @typescript-eslint/no-unused-expressions, react-hooks/immutability -- restored from the minified bundle: refs keep their one-letter names and statements keep the compiler's comma and && form. */
// Restored from client module 57957 (exports: RockTester)
import * as a from "react";
import * as l from "@/components/ground/rock-art";
let t, s, r;
let n = ["lens", "streak", "finger", "coin", "nail", "glass", "acid", "scale", "water"],
  o = {
    lens: "Hand lens",
    streak: "Streak plate",
    finger: "Fingernail",
    coin: "Copper coin",
    nail: "Steel nail",
    glass: "Glass",
    acid: "Vinegar",
    scale: "Hand scale",
    water: "Water drop",
  },
  c = {
    lens: "hand lens",
    streak: "streak plate",
    finger: "fingernail 2½",
    coin: "copper 3½",
    nail: "steel nail 5½",
    glass: "glass 5½",
    acid: "vinegar",
    scale: "scale",
    water: "water",
  },
  d = [400, 230],
  h = [400, 318],
  f = {
    lens: [96, 86],
    streak: [96, 214],
    scale: [96, 336],
    acid: [214, 428],
    water: [586, 428],
    finger: [704, 70],
    coin: [704, 172],
    nail: [704, 274],
    glass: [704, 378],
  },
  x = {
    lens: [0, 0],
    streak: [0, 0],
    scale: [0, 0],
    acid: [0, 34],
    water: [0, 34],
    finger: [-26, 22],
    coin: [-17, 17],
    nail: [-25, 25],
    glass: [0, 0],
  },
  p = {
    lens: [440, 196],
    streak: [400, 414],
    scale: [400, 414],
    acid: [432, 86],
    water: [350, 92],
    finger: [330, 188],
    coin: [392, 160],
    nail: [446, 214],
    glass: [548, 292],
  },
  u = Object.fromEntries(n.map((e) => [e, [p[e][0] - x[e][0], p[e][1] - x[e][1]]])),
  g = {
    lens: 1700,
    streak: 2600,
    finger: 2200,
    coin: 2200,
    nail: 2200,
    glass: 2300,
    acid: 2600,
    scale: 2400,
    water: 3e3,
  },
  m = {
    finger: [-78, -44, -54, -27],
    coin: [-16, -72, 10, -56],
    nail: [38, -20, 66, -1],
    glass: [84, 34, 94, 58],
  },
  y = {
    acid: [32, -62],
    water: [-50, -56],
  },
  k = {
    acid: [30, -46],
    water: [-40, -40],
  },
  j = (e, t, s) => {
    let r;
    return (r = (e - t) / (s - t)) < 0 ? 0 : r > 1 ? 1 : r;
  },
  b = (e) => e * e * (3 - 2 * e),
  w = (e, t, s) => [e[0] + (t[0] - e[0]) * s, e[1] + (t[1] - e[1]) * s],
  $ = {
    finger: 2.5,
    coin: 3.5,
    nail: 5.5,
  };
function M(e, t, s) {
  return t ? (e > t[1] ? "yes" : e < t[0] ? "no" : "maybe") : s ? "crumbles" : "varies";
}
function v(e, t) {
  return e ? (e[0] > 5.5 ? "yes" : e[1] < 5.5 ? "no" : "maybe") : t ? "crumbles" : "varies";
}
let W = "It crumbles — there's no single hardness for a heap of sand and gravel.",
  N = "No single answer: some of its minerals are soft and some are hard, so it depends where you scratch.",
  L = {
    finger: {
      yes: "Your fingernail scratches it — it's softer than a fingernail (2½).",
      no: "Your fingernail can't scratch it.",
      maybe: "Your fingernail just about scratches it: they're nearly as hard as each other.",
    },
    coin: {
      yes: "The copper coin scratches it.",
      no: "The coin can't scratch it — it only leaves a smear of copper that rubs off.",
      maybe: "The coin scratches it only in places: it's about as hard as copper (3½).",
    },
    nail: {
      yes: "The steel nail scratches it easily.",
      no: "The nail can't scratch it — it only leaves a grey line of metal that rubs off.",
      maybe: "The nail only just marks it: it's about as hard as steel (5½).",
    },
  },
  z = {
    yes: "It scratches glass! It's harder than glass (5½).",
    no: "It can't scratch glass — the glass is harder, and scratches it instead.",
    maybe: "About as hard as glass: it scratches it only just, or in places.",
  },
  A = {
    coarse: "Coarse — the crystals are big enough to see without the lens, fitted together like a jigsaw.",
    medium: "Medium — you can just see the grains by eye; the lens shows them clearly.",
    fine: "Fine — even under the lens the grains are tiny.",
    glassy: "Glassy — no grains at all, smooth like glass.",
    mixed: "Mixed — big bits and tiny bits together.",
    loose: "Loose — separate grains and pebbles, not stuck together at all.",
  },
  S = {
    coarse: "coarse crystals",
    medium: "medium grains",
    fine: "fine grains",
    glassy: "glassy",
    mixed: "mixed sizes",
    loose: "loose grains",
  },
  C = {
    yes: "Fizz! It bubbles hard — it's made of calcite, the mineral in shells and limestone.",
    powdered: "Hardly a bubble on the smooth face… but scrape a little powder off and the powder fizzes. That's dolomite.",
    some: "A few bubbles, only in places — some of it is calcite and some isn't.",
    no: "Nothing happens. There's no calcite in it.",
  },
  T = {
    yes: "fizzes hard",
    powdered: "fizzes only as powder",
    some: "a few bubbles",
    no: "no fizz",
  },
  P = [
    "The drop sits up in a round bead. Water can hardly get in.",
    "The drop slowly soaks in, leaving a dark, wet patch.",
    "The drop vanishes almost at once — it drinks water in!",
  ],
  I = ["beads up", "soaks in slowly", "drinks it in"];
function F(e) {
  let t = Math.floor(e);
  return 0.01 > Math.abs(e - t - 0.5) ? `${t}\xbd` : String(Math.round(10 * e) / 10);
}
function O(e) {
  return e[0] === e[1] ? F(e[0]) : `${F(e[0])}–${F(e[1])}`;
}
function H(e) {
  let t = (e) => String(Math.round(100 * e) / 100);
  return e[0] === e[1] ? t(e[0]) : `${t(e[0])}–${t(e[1])}`;
}
function D(e) {
  let [t, , s] = (0, l.hsl)(e),
    r = parseInt(e.replace("#", "").padEnd(6, "0").slice(0, 6), 16),
    i = [(r >> 16) & 255, (r >> 8) & 255, 255 & r],
    a = (Math.max(...i) - Math.min(...i)) / 255;
  if (a < 0.06 || s > 0.9)
    return s > 0.9 ? "white" : s > 0.76 ? "very pale grey" : s > 0.58 ? "pale grey" : s > 0.38 ? "grey" : "dark grey";
  let n = s > 0.76 ? "pale " : s < 0.35 ? "dark " : "",
    o =
      t < 15 || t >= 340 ? "reddish" : t < 45 ? "brownish" : t < 70 ? "yellowish" : t < 170 ? "greenish" : t < 260 ? "bluish" : "purplish";
  return "brownish" === o && s > 0.75
    ? "pale tan"
    : a < 0.16
      ? `${n}${o} grey`
      : "brownish" === o
        ? s > 0.62
          ? `${n}tan`
          : `${n}brown`
        : "reddish" === o
          ? `${n}reddish brown`
          : `${n}${o}`;
}
function CQ_() {
  return (
    <g>
      <path d="M22 22 L48 48" stroke="#6b4a30" strokeWidth={12} strokeLinecap="round" />
      <path d="M22 22 L48 48" stroke="#8a6444" strokeWidth={5} strokeLinecap="round" />
      <circle r={30} fill="#e3f3f9" fillOpacity={0.55} />
      <path d="M-17 -12 A21 21 0 0 1 6 -21" fill="none" stroke="#ffffff" strokeWidth={4} strokeLinecap="round" opacity={0.85} />
      <circle r={30} fill="none" stroke="#2b2522" strokeWidth={6} />
    </g>
  );
}
function G() {
  return (
    <g transform="rotate(-40)">
      <rect x={-34} y={-13} width={84} height={26} rx={13} fill="#f0c09f" stroke="#c98f6e" strokeWidth={2} />
      <ellipse cx={-23} cy={-5} rx={9} ry={6} fill="#f9dcd4" stroke="#d19a8e" strokeWidth={1.5} />
      <path d="M4 -8 q3 8 0 16 M16 -8 q3 8 0 16" fill="none" stroke="#c98f6e" strokeWidth={1.5} />
    </g>
  );
}
function B() {
  return (
    <g>
      <circle r={24} fill="#c47a45" stroke="#8a4a22" strokeWidth={3} />
      <circle r={18} fill="none" stroke="#e3a778" strokeWidth={1.5} opacity={0.8} />
      <path d="M0 -11 C7 -6 8 3 0 11 C-8 3 -7 -6 0 -11 Z" fill="#a8602e" stroke="#8a4a22" strokeWidth={1} />
      <path d="M0 -9 V11" stroke="#8a4a22" strokeWidth={1} />
      <path d="M-12 -14 A18 18 0 0 1 6 -17" fill="none" stroke="#f1c29a" strokeWidth={2.5} strokeLinecap="round" opacity={0.8} />
    </g>
  );
}
function Q() {
  return (
    <g transform="rotate(-45)">
      <path d="M-36 0 L-26 -4 L32 -4 L32 4 L-26 4 Z" fill="#aeb4ba" stroke="#5d646b" strokeWidth={1.5} strokeLinejoin="round" />
      <line x1={-22} y1={-1.5} x2={28} y2={-1.5} stroke="#e6eaee" strokeWidth={1.5} />
      <rect x={32} y={-11} width={7} height={22} rx={2} fill="#8e959c" stroke="#5d646b" strokeWidth={1.5} />
    </g>
  );
}
function Z({ scratchOn: e }) {
  return (
    <g>
      <rect x={-38} y={-30} width={76} height={60} rx={4} fill="#d6eef6" fillOpacity={0.65} stroke="#86b3c4" strokeWidth={2} />
      <path d="M-26 -18 L-8 -24 M-28 -8 L6 -22" stroke="#ffffff" strokeWidth={3} strokeLinecap="round" opacity={0.85} />
      {e > 0 && (
        <g opacity={(0, l.r1)(100 * e) / 100}>
          <path d="M-30 -6 L-20 16" stroke="#ffffff" strokeWidth={3} strokeLinecap="round" />
          <path d="M-29 -4 L-19 18" stroke="#7fa6b5" strokeWidth={1} strokeLinecap="round" />
        </g>
      )}
    </g>
  );
}
function R({ liquid: e, bulb: t }) {
  return (
    <g>
      <path
        d="M-5 -20 L5 -20 L4 28 L0 34 L-4 28 Z"
        fill="#f4f1ea"
        fillOpacity={0.8}
        stroke="#8c8577"
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
      <path d="M-3.5 2 L3.5 2 L3 28 L0 32 L-3 28 Z" fill={e} />
      <path d="M-10 -21 Q-13 -46 0 -48 Q13 -46 10 -21 Z" fill={t} stroke={(0, l.darken)(t, 0.35)} strokeWidth={1.5} />
      <path d="M-5 -38 Q-3 -44 2 -44" fill="none" stroke="#ffffff" strokeWidth={2} strokeLinecap="round" opacity={0.5} />
    </g>
  );
}
function U({ strokes: e, hex: t, faint: s, uid: r }) {
  return (
    <g>
      <rect x={-56} y={-28} width={112} height={64} rx={7} fill="#000000" opacity={0.12} />
      <rect x={-54} y={-32} width={108} height={64} rx={6} fill="#fbfaf6" stroke="#cfc8ba" strokeWidth={2} />
      <rect x={-50} y={-28} width={100} height={56} rx={4} fill={`url(#${r}matte)`} opacity={0.5} />
      <clipPath id={`${r}plate`}>
        <rect x={-54} y={-32} width={108} height={64} rx={6} />
      </clipPath>
      <g clipPath={`url(#${r}plate)`} fill="none" strokeLinecap="round" strokeLinejoin="round">
        {e.map((e, r) => {
          if (e.length < 4) return null;
          let a = `M${(0, l.r1)(e[0])} ${(0, l.r1)(e[1])}`;
          for (let t = 2; t < e.length; t += 2) a += ` L${(0, l.r1)(e[t])} ${(0, l.r1)(e[t + 1])}`;
          return (
            <g key={r} opacity={s}>
              <path d={a} stroke={t} strokeWidth={9} opacity={0.55} />
              <path d={a} stroke={t} strokeWidth={5} />
            </g>
          );
        })}
      </g>
    </g>
  );
}
function E({ needle: e }) {
  let t = (Math.PI / 180) * (-120 + (Math.min(4, Math.max(0, e)) / 4) * 240);
  return (
    <g>
      <rect x={-46} y={-4} width={92} height={46} rx={10} fill="#4f7394" stroke="#2f4a63" strokeWidth={2.5} />
      <rect x={-5} y={-12} width={10} height={9} fill="#7d8b96" />
      <ellipse cx={0} cy={-12} rx={52} ry={9} fill="#cfd8df" stroke="#7d8b96" strokeWidth={2} />
      <circle cx={0} cy={19} r={16} fill="#fffdf8" stroke="#2f4a63" strokeWidth={2} />
      <line
        x1={0}
        y1={19}
        x2={(0, l.r1)(13 * Math.sin(t))}
        y2={(0, l.r1)(19 - 13 * Math.cos(t))}
        stroke="#c8352b"
        strokeWidth={2.5}
        strokeLinecap="round"
      />
      <circle cx={0} cy={19} r={2.5} fill="#2b2522" />
    </g>
  );
}
function Y({ needle: e, gcc: t }) {
  let s = (e) => (Math.PI / 180) * (-120 + (Math.min(4, Math.max(0, e)) / 4) * 240),
    r = (e, t) => [(0, l.r1)(t * Math.sin(s(e))), (0, l.r1)(-t * Math.cos(s(e)))],
    [a, n] = r(e, 44);
  return (
    <g>
      <circle r={60} fill="#fffdf8" stroke="#2f4a63" strokeWidth={4} />
      {t && (
        <path
          d={((e, t) => {
            let [s, i] = r(e, 50),
              [a, l] = r(t, 50),
              n = +(((t - e) / 4) * 240 > 180);
            return `M${s} ${i} A50 50 0 ${n} 1 ${a} ${l}`;
          })(t[0], t[1])}
          fill="none"
          stroke="#d9a441"
          strokeWidth={10}
          strokeLinecap="round"
        />
      )}
      {[0, 1, 2, 3, 4].map((e) => {
        let [t, s] = r(e, 56),
          [a, n] = r(e, 47),
          [o, c] = r(e, 36);
        return (
          <g key={e}>
            <line x1={t} y1={s} x2={a} y2={n} stroke="#2b2522" strokeWidth={2.5} />
            <text x={o} y={(0, l.r1)(c + 6)} textAnchor="middle" fontSize={15} fontWeight={700} fill="#2b2522">
              {e}
            </text>
          </g>
        );
      })}
      {[
        [1, "#2c6fb5"],
        [2.7, "#c8352b"],
      ].map(([e, t]) => {
        let [s, a] = r(e, 56);
        return <circle key={e} cx={s} cy={a} r={5} fill={t} stroke="#fffdf8" strokeWidth={1.5} />;
      })}
      <line x1={0} y1={0} x2={a} y2={n} stroke="#c8352b" strokeWidth={4} strokeLinecap="round" />
      <circle r={5} fill="#2b2522" />
      <text y={30} textAnchor="middle" fontSize={13} fontWeight={700} fill="#4a5a4f">
        × water
      </text>
      {!t && (
        <text y={-14} textAnchor="middle" fontSize={26} fontWeight={800} fill="#c8352b">
          ?
        </text>
      )}
    </g>
  );
}
function V({ grainClass: e, texture: t, swatch: s, seed: r, r: a }) {
  let n = (0, l.seeded)(7 * r + 1),
    o = (0, l.texturePalette)(t, s),
    c = [],
    d = () => o[Math.floor(n() * o.length)],
    h = (e, t, s, r = 1) => {
      let i = n() * Math.PI,
        a = "";
      for (let o = 0; o < 6; o++) {
        let c = i + (o * Math.PI) / 3,
          d = s * (0.85 + 0.3 * n());
        a += `${(0, l.r1)(e + d * Math.cos(c) * r)},${(0, l.r1)(t + d * Math.sin(c))} `;
      }
      return a.trim();
    },
    f = (e) => {
      for (let t = 0; t < e; t++)
        c.push(
          <g
            key={`g${t}`}
            transform={`translate(${(0, l.r1)(-(0.7 * a) + n() * a * 1.4)} ${(0, l.r1)(-(0.7 * a) + n() * a * 1.4)}) scale(${(0, l.r1)(3 + 3 * n())})`}
          >
            <g
              className="rt-glint"
              style={{
                animationDelay: `${(2 * n()).toFixed(2)}s`,
              }}
            >
              <path d={l.STAR} fill="#ffffff" />
            </g>
          </g>,
        );
    };
  if ("coarse" === e) {
    c.push(<rect key="bg" x={-a} y={-a} width={2 * a} height={2 * a} fill={(0, l.darken)(s, 0.3)} />);
    let e = (2 * a) / 5,
      r = "banded" === t;
    for (let t = -1; t <= 5; t++)
      for (let s = -1; s <= 5; s++) {
        let f = -a + (s + 0.5 + (n() - 0.5) * 0.5) * e,
          x = -a + (t + 0.5 + (n() - 0.5) * 0.4) * e * (r ? 0.75 : 1),
          p = r ? (t % 2 ? o[2] : 0.5 > n() ? o[0] : o[1]) : d();
        c.push(
          <polygon
            key={`c${s}-${t}`}
            points={h(f, x, e * (r ? 0.52 : 0.62), r ? 1.5 : 1)}
            fill={p}
            stroke={(0, l.darken)(p, 0.35)}
            strokeWidth={1.2}
          />,
        );
      }
    f(5);
  } else if ("medium" === e) {
    let e = (2 * a) / 9;
    if ("grainy" === t || "pebbly" === t || "chalky" === t) {
      c.push(<rect key="bg" x={-a} y={-a} width={2 * a} height={2 * a} fill={(0, l.darken)(s, 0.35)} />);
      for (let t = 0; t < 9; t++)
        for (let r = 0; r < 9; r++) {
          let o = -a + (r + 0.5 + (n() - 0.5) * 0.4) * e,
            h = -a + (t + 0.5 + (n() - 0.5) * 0.4) * e,
            f = 0.7 > n() ? (0, l.mix)(s, "#ffffff", 0.35 * n()) : d(),
            x = e * (0.4 + 0.1 * n());
          c.push(
            <g key={`c${r}-${t}`}>
              <circle cx={(0, l.r1)(o)} cy={(0, l.r1)(h)} r={(0, l.r1)(x)} fill={f} />
              <circle cx={(0, l.r1)(o - 0.3 * x)} cy={(0, l.r1)(h - 0.3 * x)} r={(0, l.r1)(0.3 * x)} fill="#ffffff" opacity={0.45} />
            </g>,
          );
        }
      f(4);
    } else if ("sheeted" === t)
      (c.push(<rect key="bg" x={-a} y={-a} width={2 * a} height={2 * a} fill={s} />),
        c.push(
          <g key="flakes" transform="rotate(-12)">
            {Array.from(
              {
                length: 110,
              },
              (e, t) => {
                let r = -(1.2 * a) + n() * a * 2.4,
                  o = -(1.2 * a) + n() * a * 2.4,
                  c = n();
                return (
                  <ellipse
                    key={t}
                    cx={(0, l.r1)(r)}
                    cy={(0, l.r1)(o)}
                    rx={(0, l.r1)(8 + 6 * n())}
                    ry={(0, l.r1)(1.6 + 1.4 * n())}
                    fill={c < 0.4 ? (0, l.lighten)(s, 0.3) : c < 0.8 ? (0, l.darken)(s, 0.2) : "#f4f1e6"}
                    opacity={0.9}
                  />
                );
              },
            )}
          </g>,
        ),
        f(9));
    else {
      c.push(<rect key="bg" x={-a} y={-a} width={2 * a} height={2 * a} fill={(0, l.lighten)(s, 0.35)} />);
      for (let r = -1; r <= 9; r++)
        for (let o = -1; o <= 9; o++) {
          let f = -a + (o + 0.5 + (n() - 0.5) * 0.5) * e,
            x = -a + (r + 0.5 + (n() - 0.5) * 0.5) * e,
            p = "sugary" === t ? (0, l.mix)(s, 0.5 > n() ? "#ffffff" : "#000000", 0.18 * n()) : d();
          c.push(<polygon key={`c${o}-${r}`} points={h(f, x, 0.62 * e)} fill={p} stroke={(0, l.lighten)(s, 0.45)} strokeWidth={1} />);
        }
      f(8);
    }
  } else if ("fine" === e) {
    if ((c.push(<rect key="bg" x={-a} y={-a} width={2 * a} height={2 * a} fill={s} />), "layered" === t || "sheeted" === t))
      for (let e = 0; e < 16; e++) {
        let t = -a + ((2 * a) / 15) * e;
        c.push(
          <path
            key={`l${e}`}
            d={`M${-a} ${(0, l.r1)(t)} Q0 ${(0, l.r1)(t + (n() - 0.5) * 4)} ${a} ${(0, l.r1)(t + 1)}`}
            fill="none"
            stroke={e % 2 ? (0, l.lighten)(s, 0.12) : (0, l.darken)(s, 0.18)}
            strokeWidth={3}
            opacity={0.7}
          />,
        );
      }
    for (let e = 0; e < 420; e++)
      c.push(
        <circle
          key={`d${e}`}
          cx={(0, l.r1)(-a + 2 * n() * a)}
          cy={(0, l.r1)(-a + 2 * n() * a)}
          r={(0, l.r1)(0.7 + +n())}
          fill={d()}
          opacity={0.9}
        />,
      );
    if ("dark" === t) {
      for (let e = 0; e < 26; e++) {
        let t = -a + 2 * n() * a,
          r = -a + 2 * n() * a;
        c.push(
          <rect
            key={`t${e}`}
            x={(0, l.r1)(t - 4)}
            y={(0, l.r1)(r - 0.8)}
            width={8}
            height={1.6}
            fill={(0, l.lighten)(s, 0.45)}
            opacity={0.8}
            transform={`rotate(${(0, l.r1)(180 * n())} ${(0, l.r1)(t)} ${(0, l.r1)(r)})`}
          />,
        );
      }
      c.push(<ellipse key="v" cx={(0, l.r1)(0.3 * a)} cy={(0, l.r1)(-(0.25 * a))} rx={11} ry={8} fill={(0, l.darken)(s, 0.6)} />);
    }
  } else if ("glassy" === e) {
    c.push(<rect key="bg" x={-a} y={-a} width={2 * a} height={2 * a} fill={s} />);
    for (let e = 0; e < 6; e++) {
      let t = 14 + 12 * e;
      c.push(
        <path
          key={`a${e}`}
          d={`M${(0, l.r1)(-t)} ${(0, l.r1)(0.4 * a)} A${t} ${t} 0 0 1 ${(0, l.r1)(t)} ${(0, l.r1)(0.4 * a)}`}
          fill="none"
          stroke={(0, l.lighten)(s, 0.25)}
          strokeWidth={2}
          opacity={0.5}
        />,
      );
    }
    c.push(
      <path
        key="sheen"
        d={`M${(0, l.r1)(-(0.6 * a))} ${(0, l.r1)(-(0.3 * a))} Q0 ${(0, l.r1)(-(0.8 * a))} ${(0, l.r1)(0.6 * a)} ${(0, l.r1)(-(0.4 * a))}`}
        fill="none"
        stroke="#ffffff"
        strokeWidth={6}
        strokeLinecap="round"
        opacity={0.5}
      />,
    );
  } else if ("mixed" === e) {
    c.push(<rect key="bg" x={-a} y={-a} width={2 * a} height={2 * a} fill={s} />);
    for (let e = 0; e < 300; e++)
      c.push(
        <circle
          key={`d${e}`}
          cx={(0, l.r1)(-a + 2 * n() * a)}
          cy={(0, l.r1)(-a + 2 * n() * a)}
          r={(0, l.r1)(0.7 + n())}
          fill={d()}
          opacity={0.85}
        />,
      );
    for (let e = 0; e < 7; e++) {
      let t = d();
      c.push(
        <polygon
          key={`b${e}`}
          points={h(-(0.75 * a) + n() * a * 1.5, -(0.75 * a) + n() * a * 1.5, 9 + 12 * n())}
          fill={t}
          stroke={(0, l.darken)(t, 0.4)}
          strokeWidth={1.2}
        />,
      );
    }
    if ("bubbly" === t)
      for (let e = 0; e < 8; e++)
        c.push(
          <ellipse
            key={`h${e}`}
            cx={(0, l.r1)(-a + 2 * n() * a)}
            cy={(0, l.r1)(-a + 2 * n() * a)}
            rx={(0, l.r1)(4 + 7 * n())}
            ry={(0, l.r1)(3 + 4 * n())}
            fill={(0, l.darken)(s, 0.4)}
          />,
        );
  } else {
    c.push(<rect key="bg" x={-a} y={-a} width={2 * a} height={2 * a} fill={(0, l.darken)(s, 0.55)} />);
    let e = [],
      t = 0;
    for (; e.length < 28 && t++ < 600;) {
      let t = 6 + 9 * n(),
        r = -a + 2 * n() * a,
        o = -a + 2 * n() * a;
      if (e.some(([e, s, i]) => Math.hypot(e - r, s - o) < i + t + 2)) continue;
      e.push([r, o, t]);
      let h = (0, l.mix)(d(), s, 0.3);
      c.push(
        <g key={`p${e.length}`}>
          <ellipse cx={(0, l.r1)(r + 2)} cy={(0, l.r1)(o + 3)} rx={(0, l.r1)(t)} ry={(0, l.r1)(0.85 * t)} fill="#000000" opacity={0.3} />
          <ellipse cx={(0, l.r1)(r)} cy={(0, l.r1)(o)} rx={(0, l.r1)(t)} ry={(0, l.r1)(0.85 * t)} fill={h} />
          <ellipse
            cx={(0, l.r1)(r - 0.3 * t)}
            cy={(0, l.r1)(o - 0.3 * t)}
            rx={(0, l.r1)(0.35 * t)}
            ry={(0, l.r1)(0.25 * t)}
            fill="#ffffff"
            opacity={0.45}
          />
        </g>,
      );
    }
  }
  return <g>{c}</g>;
}
let K =
    ((t = (0, l.seeded)(91)),
    Array.from(
      {
        length: 16,
      },
      (e, s) => {
        let r = 14 + 31 * s + 8 * t(),
          i = 2 + 4 * t(),
          a = 6 * t(),
          n = "";
        for (let e = -10; e <= 810; e += 40) n += `${n ? "L" : "M"}${e} ${(0, l.r1)(r + i * Math.sin(e / 90 + a))}`;
        return {
          d: n,
          w: (0, l.r1)(1 + 1.5 * t()),
        };
      },
    )),
  _ =
    ((s = (0, l.seeded)(15)),
    Array.from(
      {
        length: 18,
      },
      () => ({
        dx: (0, l.r1)((s() - 0.5) * 40),
        dy: (0, l.r1)((s() - 0.5) * 10),
        r: (0, l.r1)(2.5 + 3 * s()),
        d: (0, l.r1)(1.1 * s()),
        drift: (0, l.r1)((s() - 0.5) * 18),
      }),
    )),
  X =
    ((r = (0, l.seeded)(27)),
    Array.from(
      {
        length: 9,
      },
      () => ({
        dx: (r() - 0.5) * 30,
        r: 2 + 3 * r(),
        v: 0.6 + 0.6 * r(),
      }),
    ));
function J({ tool: e }) {
  let t = {
    lens: <CQ_ />,
    streak: (
      <g transform="scale(0.8)">
        <rect x={-50} y={-30} width={100} height={60} rx={6} fill="#fbfaf6" stroke="#8c8577" strokeWidth={4} />
        <path d="M-30 6 L28 -4" stroke="#8c8577" strokeWidth={9} strokeLinecap="round" />
      </g>
    ),
    finger: <G />,
    coin: <B />,
    nail: <Q />,
    glass: <Z scratchOn={0} />,
    acid: <R liquid="#c9a24a" bulb="#2b2522" />,
    scale: <E needle={2} />,
    water: <R liquid="#5fb3e0" bulb="#2c6fb5" />,
  };
  return (
    <svg viewBox="-54 -54 108 108" className="h-7 w-7 shrink-0 @lg:h-8 @lg:w-8" aria-hidden="true" focusable="false">
      {t[e]}
    </svg>
  );
}
function CEe_({ mohs: e }) {
  let t = (e) => (0, l.r1)(20 + ((e - 1) / 9) * 290);
  return (
    <svg
      viewBox="0 0 330 64"
      className="mt-2 block h-auto w-full max-w-sm"
      role="img"
      aria-label={
        e
          ? `Mohs hardness scale: this rock is ${O(e)}; fingernail 2\xbd, copper 3\xbd, steel and glass 5\xbd.`
          : "Mohs hardness scale: fingernail 2½, copper 3½, steel and glass 5½."
      }
    >
      <rect x={20} y={26} width={290} height={8} rx={4} fill="#e9e0cd" />
      {e && <rect x={t(e[0]) - 4} y={21} width={t(e[1]) - t(e[0]) + 8} height={18} rx={9} fill="#d9a441" opacity={0.85} />}
      {Array.from(
        {
          length: 10,
        },
        (e, s) => (
          <text key={s} x={t(s + 1)} y={56} textAnchor="middle" fontSize={11} fill="#4a5a4f">
            {s + 1}
          </text>
        ),
      )}
      {[
        [2.5, "nail"],
        [3.5, "coin"],
        [5.5, "steel, glass"],
      ].map(([e, s]) => (
        <g key={e}>
          <line x1={t(e)} x2={t(e)} y1={14} y2={38} stroke="#1f2a22" strokeWidth={2} />
          <text x={t(e)} y={11} textAnchor="middle" fontSize={11} fontWeight={600} fill="#1f2a22">
            {"nail" === s ? "fingernail" : s}
          </text>
        </g>
      ))}
    </svg>
  );
}
function CEt_({ gcc: e }) {
  let t = (e) => (0, l.r1)(20 + (e / 4) * 290);
  return (
    <svg
      viewBox="0 0 330 60"
      className="mt-2 block h-auto w-full max-w-sm"
      role="img"
      aria-label={e ? `Heft: water 1, granite 2.7, this rock ${H(e)} times as heavy as water.` : "Heft: water 1, granite 2.7."}
    >
      <rect x={20} y={26} width={290} height={8} rx={4} fill="#e9e0cd" />
      {e && <rect x={t(e[0]) - 4} y={21} width={t(e[1]) - t(e[0]) + 8} height={18} rx={9} fill="#d9a441" opacity={0.85} />}
      {[0, 1, 2, 3, 4].map((e) => (
        <text key={e} x={t(e)} y={54} textAnchor="middle" fontSize={11} fill="#4a5a4f">
          {e}×
        </text>
      ))}
      {[
        [1, "water", "#2c6fb5"],
        [2.7, "granite", "#c8352b"],
      ].map(([e, s, r]) => (
        <g key={e}>
          <line x1={t(e)} x2={t(e)} y1={14} y2={38} stroke={r} strokeWidth={2.5} />
          <text x={t(e)} y={11} textAnchor="middle" fontSize={11} fontWeight={600} fill={r}>
            {s}
          </text>
        </g>
      ))}
    </svg>
  );
}
function CEs_({ two: e, four: t, six: s, outside: r }) {
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
let er = `
.rt-lbl{display:none}
@container (min-width: 30rem){.rt-lbl{display:inline}}
.rt-glint{transform-box:fill-box;transform-origin:center;animation:rtTwinkle 1.9s ease-in-out infinite}
@keyframes rtTwinkle{0%,100%{opacity:.25;transform:scale(.5)}50%{opacity:1;transform:scale(1.1)}}
.rt-fizz{animation:rtFizz 1.2s ease-out infinite;opacity:0}
@keyframes rtFizz{0%{transform:translate(0,0) scale(.4);opacity:0}15%{opacity:1}100%{transform:translate(var(--dx),-40px) scale(1.1);opacity:0}}
.rt-bead{transform-box:fill-box;transform-origin:50% 100%;animation:rtBead 2.4s ease-in-out infinite}
@keyframes rtBead{0%,100%{transform:scale(1,1)}50%{transform:scale(1.05,.95)}}
.rt-tool{cursor:grab}
.rt-tool:active{cursor:grabbing}
@media (prefers-reduced-motion: reduce){.rt-glint,.rt-bead{animation:none}.rt-fizz{animation:none;opacity:1}}
`,
  ei = [350, 324],
  ea = [450, 324];
function el(e) {
  let t = [];
  for (let s = 0; s <= 24; s++) {
    let r = s / 24;
    if (r > e) break;
    let i = ei[0] + (ea[0] - ei[0]) * r - u.streak[0];
    t.push((0, l.r1)(i), (0, l.r1)(ei[1] + 88 - u.streak[1] + 2 * Math.sin(9 * r)));
  }
  return t;
}
export const RockTester = function (e) {
  let { name: t, grainClass: s, texture: r, swatch: F, streakHex: en, mohs: eo, gcc: ec, soak: ed, fizz: eh } = e,
    ef = "rt" + (0, a.useId)().replace(/[^a-zA-Z0-9]/g, ""),
    ex = (0, l.seedOf)(t),
    ep = "loose" === s,
    [eu, eg] = (0, a.useState)(null),
    [em, ey] = (0, a.useState)(0),
    [ek, ej] = (0, a.useState)(null),
    [eb, ew] = (0, a.useState)([]),
    [e$, eM] = (0, a.useState)(null),
    [ev, eW] = (0, a.useState)([]),
    [eN, eL] = (0, a.useState)(null),
    ez = (0, a.useRef)(null),
    eA = (0, a.useRef)(0);
  (0, a.useEffect)(() => {
    if (!eu) return;
    let e = "function" == typeof window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 450 : g[eu.tool],
      t = 0,
      s = -1,
      r = (i) => {
        s < 0 && (s = i);
        let a = Math.min(1, (i - s) / e);
        if ((ey(a), a < 1)) {
          t = requestAnimationFrame(r);
          return;
        }
        (eg(null),
          ej(eu.tool),
          eM(eu.tool),
          ew((e) => (e.includes(eu.tool) ? e : [...e, eu.tool])),
          "streak" === eu.tool && eW((e) => [...e, el(1)]));
      };
    return ((t = requestAnimationFrame(r)), () => cancelAnimationFrame(t));
  }, [eu]);
  let eS = (e) => (ek === e ? u[e] : f[e]),
    eC = "scale" === ek ? h : d,
    eT = (e) => {
      if (eN && "tool" === eN.kind && eN.tool === e)
        return {
          at: [eN.x, eN.y],
          s: 1,
          moving: true,
        };
      if (eu) {
        if (eu.tool === e) {
          let t = b(j(em, 0, 0.25)),
            s = w(eu.from, u[e], t),
            r = 1;
          if ("finger" === e || "coin" === e || "nail" === e) {
            let e = 13 * Math.sin(j(em, 0.3, 0.8) * Math.PI * 6);
            s = [s[0] + 0.82 * e, s[1] + 0.57 * e];
          } else if ("glass" === e) {
            let e = 12 * Math.sin(j(em, 0.3, 0.8) * Math.PI * 6);
            s = [s[0], s[1] + e];
          } else
            "lens" === e
              ? (r = 1 + 1.4 * t)
              : ("acid" === e || "water" === e) && (s = [s[0], s[1] + 2 * Math.sin(j(em, 0.28, 0.5) * Math.PI * 3)]);
          return {
            at: s,
            s: r,
            moving: true,
          };
        }
        if (eu.prevDock === e)
          return {
            at: w(u[e], f[e], b(j(em, 0, 0.25))),
            s: "lens" === e ? 2.4 - 1.4 * b(j(em, 0, 0.25)) : 1,
            moving: true,
          };
      }
      return ek === e
        ? {
            at: u[e],
            s: "lens" === e ? 2.4 : 1,
            moving: false,
          }
        : {
            at: f[e],
            s: 1,
            moving: false,
          };
    },
    eP = eC,
    eI = false;
  eN && "rock" === eN.kind
    ? ((eP = [eN.x, eN.y]), (eI = true))
    : eu &&
      ((eI = true),
      (eP =
        "streak" === eu.tool
          ? em < 0.4
            ? w(eu.rockFrom, ei, b(j(em, 0.2, 0.38)))
            : em < 0.76
              ? w(ei, ea, b(j(em, 0.4, 0.75)))
              : w(ea, d, b(j(em, 0.78, 0.96)))
          : "scale" === eu.tool
            ? w(eu.rockFrom, h, b(j(em, 0.22, 0.45)))
            : w(eu.rockFrom, d, b(j(em, 0, 0.25)))));
  let eF = [...ev];
  (eu && "streak" === eu.tool && em > 0.4 && eF.push(el(j(em, 0.4, 0.75))), eN && "rock" === eN.kind && eN.pts.length && eF.push(eN.pts));
  let eO = ep ? 0.45 : eo && eo[0] >= 7 ? 0.3 : eo && eo[0] >= 6 ? 0.55 : 0.95,
    eH = (e) => {
      let t = ez.current,
        s = t?.getScreenCTM();
      if (!t || !s) return [0, 0];
      let r = new DOMPoint(e.clientX, e.clientY).matrixTransform(s.inverse());
      return [r.x, r.y];
    },
    eD = (e, t) => {
      eu ||
        ((eA.current += 1),
        eg({
          key: eA.current,
          tool: e,
          from: t ?? eS(e),
          prevDock: ek && ek !== e ? ek : null,
          rockFrom: eC,
        }),
        ey(0),
        ej(null));
    },
    eq = (e) => {
      if (!eN || eN.id !== e.pointerId) return;
      let [t, s] = eH(e),
        r = eN.moved || Math.hypot(t - eN.sx, s - eN.sy) > 6,
        i = Math.max(40, Math.min(760, t - eN.ox)),
        a = Math.max(40, Math.min(470, s - eN.oy));
      if ("tool" === eN.kind)
        return void eL({
          ...eN,
          x: i,
          y: a,
          moved: r,
        });
      let n = eS("streak"),
        o = i - n[0],
        c = a + 88 - n[1],
        d = eN.pts;
      if (50 > Math.abs(o) && 28 > Math.abs(c)) {
        let e = d.length;
        (e < 2 || Math.hypot(d[e - 2] - o, d[e - 1] - c) > 3) && (d = [...d, (0, l.r1)(o), (0, l.r1)(c)]);
      }
      eL({
        ...eN,
        x: i,
        y: a,
        moved: r,
        pts: d,
      });
    },
    eG = (e) => {
      if (!eN || eN.id !== e.pointerId) return;
      if ("tool" === eN.kind) {
        let e = eN.tool;
        if (eN.moved) {
          let t = [eN.x + x[e][0], eN.y + x[e][1]],
            s = 135 > Math.hypot(t[0] - eC[0], t[1] - eC[1]),
            r = ("streak" === e || "scale" === e) && 140 > Math.abs(eN.x - eC[0]) && eN.y > eC[1];
          (s || r) && eD(e, [eN.x, eN.y]);
        } else eD(e);
        eL(null);
        return;
      }
      if (eN.pts.length >= 8) {
        (eW((e) => [...e, eN.pts]),
          ew((e) => (e.includes("streak") ? e : [...e, "streak"])),
          eM("streak"),
          "scale" === ek && ej(null),
          eL(null));
        return;
      }
      let t = eS("scale");
      if (eN.moved && 70 > Math.abs(eN.x - t[0]) && 60 > Math.abs(eN.y + 88 - t[1]) && "scale" !== ek) {
        (eL(null),
          (eA.current += 1),
          eg({
            key: eA.current,
            tool: "scale",
            from: t,
            prevDock: ek,
            rockFrom: [eN.x, eN.y],
          }),
          ey(0),
          ej(null));
        return;
      }
      (eN.moved && "scale" === ek && ej(null), eL(null));
    },
    eB = eu ? eu.tool : null,
    eQ = (e) => (eB === e ? j(em, 0.35, 0.8) : +!!eb.includes(e)),
    eZ = ep ? k : y,
    eR = v(eo, ep),
    eU = [];
  if (
    (["finger", "coin", "nail"].forEach((e) => {
      let t = eQ(e);
      if (t <= 0 || ep) return;
      let s = M($[e], eo, ep),
        [r, a, n, o] = m[e],
        c = r + (n - r) * t,
        d = a + (o - a) * t;
      "yes" === s || "maybe" === s || "varies" === s
        ? eU.push(
            <g key={e} opacity={"yes" === s ? 1 : 0.6}>
              <path
                d={`M${r} ${a} L${(0, l.r1)(c)} ${(0, l.r1)(d)}`}
                stroke="#fffdf8"
                strokeWidth={"yes" === s ? 4 : 2.5}
                strokeLinecap="round"
                opacity={0.85}
              />
              <path
                d={`M${r} ${a + 2} L${(0, l.r1)(c)} ${(0, l.r1)(d + 2)}`}
                stroke="#1f1a17"
                strokeWidth={1.5}
                strokeLinecap="round"
                opacity={0.6}
              />
            </g>,
          )
        : "finger" !== e &&
          eU.push(
            <path
              key={e}
              d={`M${r} ${a} L${(0, l.r1)(c)} ${(0, l.r1)(d)}`}
              stroke={"coin" === e ? "#c47a45" : "#9aa1a8"}
              strokeWidth={3.5}
              strokeLinecap="round"
              opacity={0.75}
            />,
          );
    }),
    !ep && ("no" === eR || "maybe" === eR))
  ) {
    let e = eQ("glass");
    if (e > 0) {
      let [t, s, r, a] = m.glass;
      eU.push(
        <path
          key="glass"
          d={`M${t} ${s} L${(0, l.r1)(t + (r - t) * e)} ${(0, l.r1)(s + (a - s) * e)}`}
          stroke="#fffdf8"
          strokeWidth={3}
          strokeLinecap="round"
          opacity={"no" === eR ? 0.9 : 0.55}
        />,
      );
    }
  }
  let eE = ep || ("yes" !== eR && "maybe" !== eR) ? 0 : eQ("glass") * ("yes" === eR ? 1 : 0.5),
    eY = eQ("acid") > 0,
    eV = "acid" === eB ? em : +!!eb.includes("acid"),
    eK = ("acid" === eB && em > 0.5) || (!eu && "acid" === ek),
    e_ = "water" === eB ? em : +!!eb.includes("water"),
    eX = e_ > 0.42,
    eJ = j(e_, 0.42, 2 === ed ? 0.62 : 0.98),
    e0 = eX ? (0 === ed ? 1 : 1 === ed ? 1 - 0.6 * eJ : 1 - eJ) : 0,
    e1 = eX ? (0 === ed ? 0.15 : 1 === ed ? 0.35 + 0.5 * eJ : 0.4 + 0.6 * eJ) : 0,
    e2 = ec ? (ec[0] + ec[1]) / 2 : 2,
    e5 = 0;
  if ("scale" === eB) {
    let e = j(em, 0.45, 0.95);
    e5 = e <= 0 ? 0 : ec ? e2 * (1 - Math.exp(-5 * e) * Math.cos(14 * e)) : 2 + 1.2 * Math.sin(30 * e) * (1 - e);
  } else ("scale" === ek || eb.includes("scale")) && (e5 = ec ? e2 : 2);
  let e4 = ("scale" === eB && em > 0.35) || (!eu && "scale" === ek),
    e3 = eT("lens"),
    e8 = 110 > Math.hypot(e3.at[0] - eP[0], e3.at[1] - eP[1]),
    e6 = ("lens" === eB && em > 0.2) || (!eu && "lens" === ek) || (eN?.kind === "tool" && "lens" === eN.tool && e8),
    e7 = 30 * e3.s - 3,
    e9 =
      e$ && !eu
        ? (function (e, t) {
            let s = "loose" === t.grainClass;
            switch (e) {
              case "lens":
                return {
                  title: "Hand lens, 10×",
                  plain: A[t.grainClass],
                  label: "Grain",
                  words: t.grain,
                  also: [
                    ["Colour", t.colour],
                    ["Luster", t.luster],
                  ],
                };
              case "streak": {
                let e = s ? `Loose grains just leave a dusty, ${D(t.streakHex)} smear.` : `A ${D(t.streakHex)} streak.`;
                return (
                  !s && t.mohs && t.mohs[0] >= 6 && (e += " It's nearly as hard as the plate, so the streak is faint."),
                  {
                    title: "Streak plate",
                    plain: e,
                    label: "Streak",
                    words: t.streak,
                    show: "streak",
                  }
                );
              }
              case "finger":
              case "coin":
              case "nail": {
                let r = M($[e], t.mohs, s),
                  i = "crumbles" === r ? W : "varies" === r ? N : L[e][r];
                return {
                  title: `${o[e]} scratch`,
                  plain: i,
                  label: "Hardness",
                  words: t.hardness,
                  show: "mohs",
                };
              }
              case "glass": {
                let e = v(t.mohs, s);
                return {
                  title: "Glass scratch",
                  plain: "crumbles" === e ? W : "varies" === e ? N : z[e],
                  label: "Hardness",
                  words: t.hardness,
                  show: "mohs",
                };
              }
              case "acid":
                return {
                  title: "A drop of vinegar",
                  plain: C[t.fizz],
                  label: "Why it fizzes",
                  words:
                    "Vinegar is a weak acid. It makes carbonate minerals give off bubbles of carbon dioxide: calcite — the mineral in shells, limestone, chalk and marble — fizzes straight away, and dolomite only once it is scratched to powder. Geologists use a drop of dilute acid the same way.",
                };
              case "scale":
                return {
                  title: "Heft",
                  plain: (function (e, t) {
                    if (!e)
                      return t
                        ? "A heap of loose grains is partly air, so its weight depends on how tightly it's packed."
                        : "It varies too much to give one number — it depends which piece you pick up.";
                    let s = (e[0] + e[1]) / 2;
                    return `A piece this size weighs ${H(e)} times as much as the same amount of water — ${s < 2.3 ? "much lighter than granite" : s < 2.62 ? "a little lighter than granite" : s > 2.78 ? "heavier than granite" : "about the same as granite"}.`;
                  })(t.gcc, s),
                  label: "Density",
                  words: t.density,
                  show: "heft",
                };
              case "water":
                return {
                  title: "A drop of water",
                  plain: P[t.soak],
                  label: "Porosity",
                  words: t.porosity,
                };
            }
          })(e$, e)
        : null,
    te = (e, t) => ({
      transform: `translate(${(0, l.r1)(t[0])}px, ${(0, l.r1)(t[1])}px)`,
      transition: e ? "none" : "transform .35s ease",
      touchAction: "none",
    }),
    tt = (e, t, s = 58) => {
      let r = eT(e),
        a = r.moving || ek === e;
      return (
        <g
          key={e}
          className="rt-tool"
          style={te(r.moving, r.at)}
          onPointerDown={(t) =>
            ((e, t) => {
              if (eu || 0 !== e.button) return;
              e.currentTarget.setPointerCapture(e.pointerId);
              let [s, r] = eH(e),
                [i, a] = eS(t);
              eL({
                kind: "tool",
                tool: t,
                id: e.pointerId,
                ox: s - i,
                oy: r - a,
                x: i,
                y: a,
                sx: s,
                sy: r,
                moved: false,
              });
            })(t, e)
          }
          onPointerMove={eq}
          onPointerUp={eG}
          onPointerCancel={eG}
        >
          <rect x={-54} y={-46} width={108} height={96} fill="transparent" />
          <g transform={1 !== r.s ? `scale(${(0, l.r1)(100 * r.s) / 100})` : undefined}>{t}</g>
          {!a && (
            <text
              className="rt-lbl"
              y={s}
              textAnchor="middle"
              fontSize={17}
              fontWeight={700}
              fill="#3b2a1c"
              stroke="#e6c79d"
              strokeWidth={4}
              paintOrder="stroke"
            >
              {c[e]}
            </text>
          )}
        </g>
      );
    },
    ts = ["finger", "coin", "nail", "glass"].filter((e) => eb.includes(e)),
    tr = `A field geologist's bench with a piece of ${t.toLowerCase()} in the middle, and around it a hand lens, a streak plate, a hand scale, vinegar, a fingernail, a copper coin, a steel nail, a square of glass and a water dropper.${eb.length ? ` ${eb.length} of 9 tests done.` : ""}`;
  return (
    <div className="@container text-ink">
      <style>{er}</style>
      <div className="grid gap-4 @3xl:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)] @3xl:items-start">
        <div>
          <div className="overflow-hidden rounded-2xl border border-line">
            <svg ref={ez} viewBox="0 0 800 500" className="block h-auto w-full select-none" role="img" aria-label={tr}>
              <defs>
                <linearGradient id={`${ef}wood`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#d4a36c" />
                  <stop offset="1" stopColor="#b98752" />
                </linearGradient>
                <radialGradient id={`${ef}mat`}>
                  <stop offset="0" stopColor="#f3ead8" />
                  <stop offset="1" stopColor="#e2d5bb" />
                </radialGradient>
                <pattern id={`${ef}matte`} width={6} height={6} patternUnits="userSpaceOnUse">
                  <circle cx={1.5} cy={1.5} r={0.7} fill="#d8d1c2" />
                  <circle cx={4.5} cy={4} r={0.6} fill="#e3ddd0" />
                </pattern>
                <clipPath id={`${ef}zoom`}>
                  <circle r={Math.max(1, (0, l.r1)(e7))} />
                </clipPath>
              </defs>
              <rect width={800} height={500} fill={`url(#${ef}wood)`} />
              <g fill="none" stroke="#a87846" opacity={0.45}>
                {K.map((e, t) => (
                  <path key={t} d={e.d} strokeWidth={e.w} />
                ))}
              </g>
              <ellipse
                cx={400}
                cy={250}
                rx={236}
                ry={206}
                fill={`url(#${ef}mat)`}
                stroke="#c9b48f"
                strokeWidth={3}
                strokeDasharray="10 7"
              />
              {tt("streak", <U strokes={eF} hex={en} faint={eO} uid={ef} />, 52)}
              {tt("scale", <E needle={e5} />, 62)}
              <g
                style={{
                  ...te(eI, eP),
                  cursor: eu ? "default" : "grab",
                }}
                onPointerDown={(e) => {
                  if (eu || 0 !== e.button) return;
                  e.currentTarget.setPointerCapture(e.pointerId);
                  let [t, s] = eH(e);
                  (eL({
                    kind: "rock",
                    id: e.pointerId,
                    ox: t - eC[0],
                    oy: s - eC[1],
                    x: eC[0],
                    y: eC[1],
                    sx: t,
                    sy: s,
                    moved: false,
                    pts: [],
                  }),
                    ek && "scale" !== ek && ej(null));
                }}
                onPointerMove={eq}
                onPointerUp={eG}
                onPointerCancel={eG}
              >
                <ellipse cx={0} cy={82} rx={110} ry={16} fill="#000000" opacity={eI && !eu ? 0.1 : 0.18} />
                <l.RockSpecimen texture={r} swatch={F} seed={ex} r={96} heap={ep} glintClass="rt-glint" />
                {eU}
                {eY && (
                  <g transform={`translate(${eZ.acid[0]} ${eZ.acid[1] + 4})`} opacity={(0, l.r1)(100 * j(eV, 0.32, 0.5)) / 100}>
                    <ellipse rx={20} ry={9} fill="#c9a24a" opacity={0.5} />
                    <ellipse rx={20} ry={9} fill="none" stroke="#7d5f1c" strokeWidth={1.2} opacity={0.6} />
                    <path d="M-11 -3 q8 -4 16 -1" stroke="#fffdf8" strokeWidth={2.2} fill="none" strokeLinecap="round" opacity={0.85} />
                  </g>
                )}
                {"powdered" === eh && eV > 0.58 && (
                  <g transform={`translate(${eZ.acid[0] + 34} ${eZ.acid[1] + 6})`}>
                    <path d="M-30 -22 L-14 -6" stroke={(0, l.darken)(F, 0.4)} strokeWidth={2.5} strokeLinecap="round" />
                    <path
                      d="M-13 6 Q-7 -7 0 -8 Q7 -7 13 6 Z"
                      fill={(0, l.lighten)(F, 0.65)}
                      stroke={(0, l.darken)(F, 0.3)}
                      strokeWidth={1.2}
                    />
                  </g>
                )}
                {eK &&
                  "no" !== eh &&
                  ("yes" === eh
                    ? [[0, 0, 40, 18]]
                    : "some" === eh
                      ? [
                          [-4, 0, 10, 3],
                          [-34, 16, 10, 3],
                        ]
                      : [[34, 2, 12, 7]]
                  ).map(([e, t, s, r], a) => (
                    <g key={a} transform={`translate(${eZ.acid[0] + e} ${eZ.acid[1] + t})`}>
                      {"yes" === eh &&
                        _.slice(0, 9).map((e, t) => (
                          <circle
                            key={`f${t}`}
                            cx={(0, l.r1)(0.45 * e.dx)}
                            cy={(0, l.r1)(0.6 * e.dy + 2)}
                            r={(0, l.r1)(0.7 * e.r)}
                            fill="#fffdf8"
                            stroke="#8aa2ae"
                            strokeWidth={0.8}
                            opacity={0.9}
                          />
                        ))}
                      {_.slice(0, r).map((e, t) => (
                        <g key={t} transform={`translate(${(0, l.r1)((e.dx * s) / 40)} ${e.dy})`}>
                          <g
                            className="rt-fizz"
                            style={{
                              animationDelay: `${e.d}s`,
                              "--dx": `${e.drift}px`,
                            }}
                          >
                            <circle
                              r={"yes" === eh ? e.r : 0.7 * e.r}
                              fill="#ffffff"
                              fillOpacity={0.7}
                              stroke="#6f8a96"
                              strokeWidth={1.2}
                            />
                          </g>
                        </g>
                      ))}
                      {"some" !== eh && (
                        <text
                          x={22}
                          y={-22}
                          fontSize={"yes" === eh ? 22 : 16}
                          fontWeight={800}
                          fill="#c8352b"
                          stroke="#fffdf8"
                          strokeWidth={4}
                          paintOrder="stroke"
                        >
                          fizz!
                        </text>
                      )}
                    </g>
                  ))}
                {eX && (
                  <g>
                    <ellipse
                      cx={eZ.water[0]}
                      cy={eZ.water[1] + 6}
                      rx={(0, l.r1)(12 + 18 * e1)}
                      ry={(0, l.r1)(6 + 8 * e1)}
                      fill="#1f2a3a"
                      opacity={(0, l.r1)(0.32 * e1 * 100) / 100}
                    />
                    {e0 > 0.02 && (
                      <g transform={`translate(${eZ.water[0]} ${eZ.water[1] + 6})`}>
                        <g className={0 === ed ? "rt-bead" : undefined}>
                          <path
                            d={`M${(0, l.r1)(-12 * e0)} 0 Q${(0, l.r1)(-12 * e0)} ${(0, l.r1)(-15 * e0)} 0 ${(0, l.r1)(-15 * e0)} Q${(0, l.r1)(12 * e0)} ${(0, l.r1)(-15 * e0)} ${(0, l.r1)(12 * e0)} 0 Z`}
                            fill="#9fd3ee"
                            fillOpacity={0.85}
                            stroke="#3f89b5"
                            strokeWidth={1.5}
                          />
                          <ellipse
                            cx={(0, l.r1)(-4 * e0)}
                            cy={(0, l.r1)(-9 * e0)}
                            rx={(0, l.r1)(3 * e0)}
                            ry={(0, l.r1)(2 * e0)}
                            fill="#ffffff"
                            opacity={0.8}
                          />
                        </g>
                      </g>
                    )}
                  </g>
                )}
                {ep &&
                  ["finger", "coin", "nail", "glass"].map((e) => {
                    if (eB !== e) return null;
                    let t = j(em, 0.35, 0.9);
                    return (
                      <g key={e} fill={(0, l.darken)(F, 0.1)}>
                        {X.map((e, s) => (
                          <circle
                            key={s}
                            cx={(0, l.r1)(40 + e.dx)}
                            cy={(0, l.r1)(-40 + 90 * t * e.v)}
                            r={(0, l.r1)(e.r)}
                            opacity={(0, l.r1)((1 - t) * 100) / 100}
                          />
                        ))}
                      </g>
                    );
                  })}
              </g>
              {tt("glass", <Z scratchOn={eE} />)}
              {tt("finger", <G />)}
              {tt("coin", <B />)}
              {tt("nail", <Q />)}
              {tt("acid", <R liquid="#c9a24a" bulb="#2b2522" />, 56)}
              {tt("water", <R liquid="#5fb3e0" bulb="#2c6fb5" />, 56)}
              {"acid" === eB &&
                [0.28, 0.36, 0.44].map((e, t) => {
                  let s = j(em, e, e + 0.08);
                  if (s <= 0 || s >= 1) return null;
                  let [r, a] = p.acid;
                  return (
                    <ellipse
                      key={t}
                      cx={r}
                      cy={(0, l.r1)(a + 6 + s * (d[1] + eZ.acid[1] - a - 6))}
                      rx={3.5}
                      ry={5}
                      fill="#d9b85c"
                      stroke="#8c6d22"
                      strokeWidth={1}
                    />
                  );
                })}
              {"water" === eB &&
                (() => {
                  let e = j(em, 0.3, 0.42);
                  if (e <= 0 || e >= 1) return null;
                  let [t, s] = p.water;
                  return (
                    <ellipse
                      cx={t}
                      cy={(0, l.r1)(s + 6 + e * (d[1] + eZ.water[1] - s))}
                      rx={5}
                      ry={7}
                      fill="#9fd3ee"
                      stroke="#3f89b5"
                      strokeWidth={1.5}
                    />
                  );
                })()}
              {tt("lens", <CQ_ />)}
              {e6 && (
                <g
                  transform={`translate(${(0, l.r1)(e3.at[0])} ${(0, l.r1)(e3.at[1])})`}
                  opacity={"lens" === eB ? (0, l.r1)(100 * j(em, 0.2, 0.45)) / 100 : 1}
                  pointerEvents="none"
                >
                  <g clipPath={`url(#${ef}zoom)`}>
                    <V grainClass={s} texture={r} swatch={F} seed={ex} r={70} />
                  </g>
                  <path
                    d={`M${(0, l.r1)(-(0.62 * e7))} ${(0, l.r1)(-(0.45 * e7))} A${(0, l.r1)(0.72 * e7)} ${(0, l.r1)(0.72 * e7)} 0 0 1 ${(0, l.r1)(0.2 * e7)} ${(0, l.r1)(-(0.7 * e7))}`}
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth={4}
                    strokeLinecap="round"
                    opacity={0.45}
                  />
                  <circle r={(0, l.r1)(30 * e3.s)} fill="none" stroke="#2b2522" strokeWidth={(0, l.r1)(6 * e3.s * 10) / 10} />
                  <text
                    y={(0, l.r1)(e7 - 8)}
                    textAnchor="middle"
                    fontSize={15}
                    fontWeight={800}
                    fill="#fffdf8"
                    stroke="#2b2522"
                    strokeWidth={3}
                    paintOrder="stroke"
                  >
                    ×10
                  </text>
                </g>
              )}
              {e4 && (
                <g transform="translate(590 252)" opacity={"scale" === eB ? (0, l.r1)(100 * j(em, 0.35, 0.5)) / 100 : 1}>
                  <Y needle={e5} gcc={ec} />
                </g>
              )}
            </svg>
          </div>
          <div role="group" aria-label="Tools" className="mt-3 grid grid-cols-3 gap-2 @lg:grid-cols-5">
            {n.map((e) => {
              let t = eb.includes(e);
              return (
                <button
                  key={e}
                  type="button"
                  aria-disabled={!!eu || undefined}
                  onClick={() => eD(e)}
                  className={`relative flex min-h-12 flex-col items-center justify-center gap-1 rounded-xl border-2 px-1.5 py-1.5 text-center text-[13px] font-semibold leading-tight transition active:scale-95 @lg:flex-row @lg:justify-start @lg:gap-1.5 @lg:px-2 @lg:text-left @lg:text-sm focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-azure ${eB === e ? "border-gold bg-[#fbf1da]" : t ? "border-moss/50 bg-moss/5" : "border-line bg-[#fffdf8] hover:border-moss/60"} ${eu && eB !== e ? "opacity-60" : ""}`}
                >
                  <J tool={e} />
                  <span className="min-w-0">{o[e]}</span>
                  {t && (
                    <>
                      <span className="absolute right-1 top-0.5 text-xs text-moss" aria-hidden="true">
                        ✓
                      </span>
                      <span className="sr-only">, done</span>
                    </>
                  )}
                </button>
              );
            })}
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div aria-live="polite" className="min-h-[10rem] rounded-2xl bg-paper-2 px-4 py-3">
            {e9 ? (
              <>
                <p className="eyebrow">{e9.title}</p>
                <p className="font-display mt-1 text-xl font-semibold leading-snug">{e9.plain}</p>
                {"streak" === e9.show && (
                  <p className="mt-2 flex items-center gap-2 text-sm text-ink-2">
                    <span
                      className="inline-block h-4 w-12 rounded-full border border-line"
                      style={{
                        background: en,
                        opacity: eO < 0.5 ? 0.7 : 1,
                      }}
                    />
                    colour of the powder
                  </p>
                )}
                {"mohs" === e9.show && <CEe_ mohs={eo} />}
                {"heft" === e9.show && <CEt_ gcc={ec} />}
                <p className="mt-2 text-sm leading-relaxed text-ink">
                  <span className="font-semibold">
                    {e9.label}
                    {": "}
                  </span>
                  <span className="text-ink-2">{e9.words}</span>
                </p>
                {e9.also?.map(([e, t]) => (
                  <p key={e} className="mt-1 text-sm leading-relaxed text-ink">
                    <span className="font-semibold">
                      {e}
                      {": "}
                    </span>
                    <span className="text-ink-2">{t}</span>
                  </p>
                ))}
              </>
            ) : eu ? (
              <p className="font-display text-xl leading-snug">
                {"Testing with the "}
                {o[eu.tool].toLowerCase()}…
              </p>
            ) : (
              <p className="font-display text-xl leading-snug">
                {"Drag a tool onto the "}
                {t.toLowerCase()}
                {" — or tap it — and test it like a geologist. You can drag the rock across the white streak plate, too."}
              </p>
            )}
          </div>
          <div className="rounded-2xl border border-line bg-[#fffdf8] px-4 py-3">
            <div className="flex items-baseline justify-between gap-2">
              <p className="eyebrow">Field notebook</p>
              <p className="text-sm text-ink-2">
                <span className="font-semibold text-ink">{eb.length}</span>
                {" of 9 tests"}
              </p>
            </div>
            <dl className="mt-2 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1.5 text-sm">
              <dt className="font-semibold">Grain</dt>
              <dd className={eb.includes("lens") ? "text-ink" : "text-ink-2/70"}>{eb.includes("lens") ? S[s] : "try the hand lens"}</dd>
              <dt className="font-semibold">Streak</dt>
              <dd className={eb.includes("streak") ? "flex items-center gap-1.5 text-ink" : "text-ink-2/70"}>
                {eb.includes("streak") ? (
                  <>
                    <span
                      className="inline-block h-3 w-6 rounded-full border border-line"
                      style={{
                        background: en,
                      }}
                    />
                    {D(en)}
                  </>
                ) : (
                  "rub it on the streak plate"
                )}
              </dd>
              <dt className="font-semibold">Hardness</dt>
              <dd className={ts.length ? "text-ink" : "text-ink-2/70"}>
                {ts.length ? (
                  <>
                    {ts.map((e, t) => {
                      let s = "glass" === e ? v(eo, ep) : M($[e], eo, ep),
                        r =
                          "glass" === e
                            ? "yes" === s
                              ? "scratches glass"
                              : "no" === s
                                ? "glass wins"
                                : "maybe" === s
                                  ? "about as hard as glass"
                                  : "crumbles"
                            : "yes" === s
                              ? `${o[e].toLowerCase()} scratches it`
                              : "no" === s
                                ? `${o[e].toLowerCase()} can't`
                                : "maybe" === s
                                  ? `${o[e].toLowerCase()} just about`
                                  : "crumbles";
                      return (
                        <span key={e}>
                          {t > 0 && " · "}
                          <span aria-hidden="true">{"yes" === s ? "✓" : "no" === s ? "✗" : "maybe" === s ? "≈" : "–"} </span>
                          {r}
                        </span>
                      );
                    })}
                    {eo && (
                      <span className="text-ink-2">
                        {" (Mohs "}
                        {O(eo)})
                      </span>
                    )}
                  </>
                ) : (
                  "fingernail, coin, nail and glass"
                )}
              </dd>
              <dt className="font-semibold">Fizz</dt>
              <dd className={eb.includes("acid") ? "text-ink" : "text-ink-2/70"}>{eb.includes("acid") ? T[eh] : "a drop of vinegar"}</dd>
              <dt className="font-semibold">Heft</dt>
              <dd className={eb.includes("scale") ? "text-ink" : "text-ink-2/70"}>
                {eb.includes("scale") ? (ec ? `${H(ec)} \xd7 water` : "varies") : "weigh it on the scale"}
              </dd>
              <dt className="font-semibold">Water</dt>
              <dd className={eb.includes("water") ? "text-ink" : "text-ink-2/70"}>{eb.includes("water") ? I[ed] : "a drop of water"}</dd>
            </dl>
          </div>
          <button
            type="button"
            onClick={() => {
              (eg(null), eL(null), ej(null), ew([]), eM(null), eW([]), ey(0));
            }}
            className="min-h-12 self-start rounded-full border-2 border-line px-4 py-2 font-semibold text-ink-2 transition hover:border-moss hover:text-moss active:scale-95"
          >
            Put the tools back
          </button>
        </div>
      </div>
      <CEs_
        two="Look close! Scratch! Bubbles!"
        four="Can your fingernail scratch it? Then it's a soft rock. Does it fizz? Then it has shell stuff in it."
        six="Geologists tell rocks apart by testing them: how big the grains are, the colour of the powder, how hard it is, and whether it fizzes."
        outside={`Find two pebbles and scratch one with the other — the harder one wins. Then try your fingernail and a coin, just like on the ${t.toLowerCase()}.`}
      />
    </div>
  );
};
