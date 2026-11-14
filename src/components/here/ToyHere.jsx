"use client";
// Restored from client module 76423 (exports: LakeCaption, RockInTheLoop, SpinTheYearHere, WillItSproutHere)
import * as s from "react/jsx-runtime";
import * as a from "@/lib/use-here";
import * as l from "@/lib/the-region";
import * as ecoregions from "@/lib/ecoregions";
import { useRegion } from "@/lib/use-region";
import { yearCaptions } from "@/lib/region-context";
import * as n from "react";
import * as et from "next/link";
let t, r;
let o = [
    {
      id: "lettuce",
      name: "Lettuce",
      board: "Lettuce",
      many: "lettuce",
      plural: false,
      season: "cool",
      f: [35, 40, 80, 85],
      days: [49, 15, 7, 4, 3, 2, 2, null, null],
      depth: 10,
      kind: "two",
      leaf: [15, 9],
      seed: {
        rx: 5.5,
        ry: 2.4,
        fill: "#d8d0bb",
        edge: "#8c826b",
        tilt: -20,
      },
    },
    {
      id: "spinach",
      name: "Spinach",
      board: "Spinach",
      many: "spinach",
      plural: false,
      season: "cool",
      f: [35, 45, 75, 85],
      days: [62, 22, 12, 7, 6, 5, 6, null, null],
      depth: 22,
      kind: "two",
      leaf: [22, 4.5],
      seed: {
        rx: 4.5,
        ry: 4,
        fill: "#b59a6a",
        edge: "#6f5a36",
        tilt: 0,
      },
    },
    {
      id: "pea",
      name: "Peas",
      board: "Peas",
      many: "peas",
      plural: true,
      season: "cool",
      f: [40, 40, 75, 85],
      days: [null, 36, 13, 9, 7, 6, 6, null, null],
      depth: 42,
      kind: "pea",
      leaf: [10, 6],
      seed: {
        rx: 7,
        ry: 6.5,
        fill: "#bcc47e",
        edge: "#6d7a3a",
        tilt: 0,
      },
    },
    {
      id: "radish",
      name: "Radishes",
      board: "Radish",
      many: "radishes",
      plural: true,
      season: "cool",
      f: [40, 45, 90, 95],
      days: [null, 29, 11, 6, 4, 3, 3, null, null],
      depth: 18,
      kind: "two",
      leaf: [12, 10],
      seed: {
        rx: 4.5,
        ry: 4.2,
        fill: "#8a4b35",
        edge: "#4f2a1d",
        tilt: 0,
      },
    },
    {
      id: "carrot",
      name: "Carrots",
      board: "Carrot",
      many: "carrots",
      plural: true,
      season: "cool",
      f: [40, 45, 85, 95],
      days: [null, 51, 17, 10, 7, 6, 6, 8, null],
      depth: 10,
      kind: "two",
      leaf: [20, 2.6],
      seed: {
        rx: 4.5,
        ry: 2.6,
        fill: "#9b7650",
        edge: "#5e4428",
        tilt: 15,
      },
    },
    {
      id: "onion",
      name: "Onions",
      board: "Onion",
      many: "onions",
      plural: true,
      season: "cool",
      f: [35, 50, 95, 95],
      days: [135, 31, 13, 7, 5, 4, 4, 12, null],
      depth: 16,
      kind: "onion",
      leaf: [0, 0],
      seed: {
        rx: 4.5,
        ry: 3,
        fill: "#26221f",
        edge: "#0d0b0a",
        tilt: -25,
      },
    },
    {
      id: "bean",
      name: "Beans",
      board: "Beans",
      many: "beans",
      plural: true,
      season: "warm",
      f: [60, 60, 85, 95],
      days: [null, null, null, 16, 11, 8, 6, 6, null],
      depth: 46,
      kind: "two",
      leaf: [15, 11],
      seed: {
        rx: 10,
        ry: 6,
        fill: "#efe3cc",
        edge: "#9a8664",
        tilt: -10,
      },
    },
    {
      id: "corn",
      name: "Corn",
      board: "Corn",
      many: "corn",
      plural: false,
      season: "warm",
      f: [50, 60, 95, 105],
      days: [null, null, 22, 12, 7, 4, 4, 3, null],
      depth: 44,
      kind: "corn",
      leaf: [0, 0],
      seed: {
        rx: 7,
        ry: 8,
        fill: "#eab73c",
        edge: "#a0701a",
        tilt: 0,
      },
    },
    {
      id: "cucumber",
      name: "Cucumbers",
      board: "Cucumber",
      many: "cucumbers",
      plural: true,
      season: "warm",
      f: [60, 60, 95, 105],
      days: [null, null, null, 13, 6, 4, 3, 3, null],
      depth: 30,
      kind: "two",
      leaf: [16, 8.5],
      seed: {
        rx: 7.5,
        ry: 3.4,
        fill: "#f1e8cc",
        edge: "#a99a6e",
        tilt: 10,
      },
    },
    {
      id: "tomato",
      name: "Tomatoes",
      board: "Tomato",
      many: "tomatoes",
      plural: true,
      season: "warm",
      f: [50, 60, 85, 95],
      days: [null, null, 43, 14, 8, 6, 6, 9, null],
      depth: 14,
      kind: "two",
      leaf: [18, 4.5],
      seed: {
        rx: 4.8,
        ry: 4,
        fill: "#d9c48f",
        edge: "#8c7644",
        tilt: 0,
      },
    },
    {
      id: "pepper",
      name: "Peppers",
      board: "Pepper",
      many: "peppers",
      plural: true,
      season: "warm",
      f: [60, 65, 95, 95],
      days: [null, null, null, 25, 12, 8, 8, 9, null],
      depth: 14,
      kind: "two",
      leaf: [16, 5],
      seed: {
        rx: 5,
        ry: 4.2,
        fill: "#eadbab",
        edge: "#9a8752",
        tilt: 20,
      },
    },
    {
      id: "watermelon",
      name: "Watermelons",
      board: "Watermelon",
      many: "watermelons",
      plural: true,
      season: "warm",
      f: [60, 70, 95, 105],
      days: [null, null, null, null, 12, 5, 4, 3, null],
      depth: 30,
      kind: "two",
      leaf: [15, 8],
      seed: {
        rx: 6.5,
        ry: 4,
        fill: "#2b2522",
        edge: "#0f0c0b",
        tilt: -15,
      },
    },
  ],
  i = (e, t, r) => (e < t ? t : e > r ? r : e),
  d = (e) => Math.round((9 * e) / 5 + 32),
  c = (e) => ((e - 32) * 5) / 9,
  f = (e) => Math.round(10 * e) / 10;
function h(e, t) {
  let r = (9 * t) / 5 + 32,
    [s, a, l, n] = e.f;
  if (r < s) return "asleep";
  if (r > n) return "fail";
  if (r < a) return "slow";
  if (r > l) return "hot";
  let o = u(e, t);
  return null != o && o > 14 ? "slow" : "good";
}
function u(e, t) {
  let r = t / 5,
    s = Math.floor(r),
    a = r - s,
    l = e.days[s] ?? null;
  if (0 === a) return l;
  let n = e.days[s + 1] ?? null;
  return null == l || null == n ? null : 1 / (1 / l + (1 / n - 1 / l) * a);
}
let x = (e) => Math.ceil(c(e.f[0]) - 1e-9),
  m = ["no", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve"];
function p(e, t = 3) {
  let r = e.map((e) => e.many);
  if (r.length <= t) return 1 === r.length ? r[0] : `${r.slice(0, -1).join(", ")} and ${r[r.length - 1]}`;
  let s = r.length - (t - 1);
  return `${r.slice(0, t - 1).join(", ")} and ${m[s]} others`;
}
let g = (e) => e.length > 1 || e[0].plural,
  y = (e) => e.charAt(0).toUpperCase() + e.slice(1),
  b = [
    {
      season: "cool",
      surface: 232,
      bottom: 322,
    },
    {
      season: "warm",
      surface: 480,
      bottom: 564,
    },
  ],
  j = [232, 331, 430, 529, 628, 727];
function k(e) {
  let t = e;
  return () => (t = (9301 * t + 49297) % 233280) / 233280;
}
function $(e) {
  let t = parseInt(e.slice(1), 16);
  return [(t >> 16) & 255, (t >> 8) & 255, 255 & t];
}
function w(e, t, r) {
  let s = $(e),
    a = $(t),
    l = i(r, 0, 1);
  return `rgb(${s.map((e, t) => Math.round(e + (a[t] - e) * l)).join(",")})`;
}
let M =
    ((t = k(17)),
    b.flatMap((e, r) =>
      Array.from(
        {
          length: 34,
        },
        () => ({
          bed: r,
          x: f(186 + 604 * t()),
          y: f(e.surface + 14 + t() * (e.bottom - e.surface - 20)),
          rx: f(2 + 5 * t()),
          ry: f(1.5 + 3 * t()),
          light: t() > 0.5,
        }),
      ),
    )),
  v =
    ((r = k(41)),
    b.flatMap((e) =>
      Array.from(
        {
          length: 22,
        },
        () => ({
          x: f(190 + 596 * r()),
          y: f(e.surface - 2 + 10 * r()),
          r: f(1.5 + 2.2 * r()),
        }),
      ),
    ));
function C(e, t) {
  let r = f(e),
    s = f(t);
  return `M0 0 C${-s} ${f(-(0.35 * r))} ${f(-(0.7 * s))} ${-r} 0 ${-r} C${f(0.7 * s)} ${-r} ${s} ${f(-(0.35 * r))} 0 0Z`;
}
function L({ c: e, dim: t = false }) {
  let r = e.seed,
    a = t ? w(r.fill, "#8f887c", 0.7) : r.fill;
  return "bean" === e.id ? (
    <path
      d={`M${-r.rx} 0 C${-r.rx} ${-(1.4 * r.ry)} ${r.rx} ${-(1.4 * r.ry)} ${r.rx} 0 C${r.rx} ${1.1 * r.ry} 3 ${r.ry} 0 ${0.45 * r.ry} C-3 ${r.ry} ${-r.rx} ${1.1 * r.ry} ${-r.rx} 0Z`}
      fill={a}
      stroke={r.edge}
      strokeWidth="1.2"
      transform={`rotate(${r.tilt})`}
    />
  ) : "corn" === e.id ? (
    <path
      d={`M${-r.rx} ${-(0.8 * r.ry)} Q0 ${-(1.2 * r.ry)} ${r.rx} ${-(0.8 * r.ry)} L${0.45 * r.rx} ${r.ry} Q0 ${1.15 * r.ry} ${-(0.45 * r.rx)} ${r.ry} Z`}
      fill={a}
      stroke={r.edge}
      strokeWidth="1.2"
    />
  ) : (
    <ellipse rx={r.rx} ry={r.ry} fill={a} stroke={r.edge} strokeWidth="1" transform={r.tilt ? `rotate(${r.tilt})` : undefined} />
  );
}
let W = {
  slow: {
    stem: "#8cae55",
    leaf: "#a8ca68",
    vein: "#86a94c",
  },
  good: {
    stem: "#4f9136",
    leaf: "#6cbb45",
    vein: "#4e9234",
  },
  hot: {
    stem: "#8b9a3c",
    leaf: "#bdb64c",
    vein: "#9a9236",
  },
  fail: {
    stem: "#978b78",
    leaf: "#aca08a",
    vein: "#8c806c",
  },
};
function N({ c: e, s: t, v: r }) {
  let a = W[t];
  if ("fail" === t)
    return (
      <g>
        <path d="M0 0 C1 -14 3 -22 10 -25 C16 -27 19 -22 20 -14" fill="none" stroke={a.stem} strokeWidth="4" strokeLinecap="round" />
        {"two" === e.kind || "pea" === e.kind ? (
          <g transform="translate(20 -14)">
            <path d={C(Math.min(14, 0.8 * e.leaf[0] + 3), Math.max(3, 0.7 * e.leaf[1]))} fill={a.leaf} transform="rotate(160)" />
            <path d={C(Math.min(14, 0.8 * e.leaf[0] + 3), Math.max(3, 0.7 * e.leaf[1]))} fill={a.leaf} transform="rotate(205)" />
          </g>
        ) : (
          <path d="M20 -14 C22 -8 21 -3 17 2" fill="none" stroke={a.leaf} strokeWidth="3" strokeLinecap="round" />
        )}
      </g>
    );
  let l = "slow" === t ? f(8 + 56 * r) : f(10 + 84 * r),
    n = "slow" === t ? f(0.6 + 0.5 * r) : f(0.75 + 0.7 * r);
  if ("slow" === t && r < 0.42) {
    let e = f(7 + 40 * r);
    return (
      <g>
        <path
          d={`M0 0 L0 ${-e} C0 ${f(-e - 10)} 11 ${f(-e - 10)} 11 ${f(-e + 1)}`}
          fill="none"
          stroke={a.stem}
          strokeWidth="4"
          strokeLinecap="round"
        />
        <ellipse cx="11" cy={f(-e + 4)} rx="4" ry="6" fill={a.leaf} />
      </g>
    );
  }
  let o = 38 * ("hot" === t);
  if ("corn" === e.kind) {
    let e = f(24 * n),
      t = f(-(0.5 * l)),
      r = f(-(0.78 * l)),
      i = f(0.35 * o);
    return (
      <g>
        <path d={`M0 0 L0 ${-l}`} stroke={a.stem} strokeWidth="5" strokeLinecap="round" />
        <path
          d={`M0 ${t} Q${f(0.55 * e)} ${f(t - 0.85 * e)} ${e} ${f(t - 0.5 * e + i)}`}
          fill="none"
          stroke={a.leaf}
          strokeWidth={f(4 * n + 1)}
          strokeLinecap="round"
        />
        <path
          d={`M0 ${r} Q${f(-(0.5 * e))} ${f(r - 0.8 * e)} ${f(-(0.9 * e))} ${f(r - 0.45 * e + i)}`}
          fill="none"
          stroke={a.leaf}
          strokeWidth={f(4 * n + 1)}
          strokeLinecap="round"
        />
        <path d={`M0 ${-l} L0 ${f(-l - 12 * n)}`} stroke={a.leaf} strokeWidth={f(3.5 * n + 1)} strokeLinecap="round" />
      </g>
    );
  }
  if ("onion" === e.kind)
    return (
      <g>
        <path
          d={`M0 0 L0 ${-l} Q0 ${f(-l - 12)} 9 ${f(-l - 9 + 0.2 * o)}`}
          fill="none"
          stroke={a.leaf}
          strokeWidth="4"
          strokeLinecap="round"
        />
        <ellipse cx="9.5" cy={f(-l - 8 + 0.2 * o)} rx="4" ry="2.8" fill="#26221f" />
      </g>
    );
  if ("pea" === e.kind)
    return (
      <g>
        <path
          d={`M0 0 C-2 ${f(-(0.4 * l))} 2 ${f(-(0.7 * l))} 0 ${-l}`}
          fill="none"
          stroke={a.stem}
          strokeWidth="4"
          strokeLinecap="round"
        />
        <g transform={`translate(0 ${f(-(0.55 * l))})`}>
          <path d={C(7 * n + 2, 4 * n + 1)} fill={a.leaf} transform={`rotate(${-70 - o})`} />
          <path d={C(7 * n + 2, 4 * n + 1)} fill={a.leaf} transform={`rotate(${70 + o})`} />
        </g>
        <g transform={`translate(0 ${-l})`}>
          <path d={C(e.leaf[0] * n + 3, e.leaf[1] * n + 1)} fill={a.leaf} transform={`rotate(${-38 - o})`} />
          <path d={C(e.leaf[0] * n + 3, e.leaf[1] * n + 1)} fill={a.leaf} transform={`rotate(${38 + o})`} />
          <path
            d={`M0 0 C1 ${f(-8 * n)} 7 ${f(-10 * n)} 6 ${f(-4 * n)} C5 -1 2 ${f(-3 * n)} 3 ${f(-6 * n)}`}
            fill="none"
            stroke={a.stem}
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </g>
      </g>
    );
  let i = e.leaf[0] * n + 3,
    d = e.leaf[1] * n + 1,
    c = 58 + o;
  return (
    <g>
      <path d={`M0 0 C-2 ${f(-(0.5 * l))} 2 ${f(-(0.8 * l))} 0 ${-l}`} fill="none" stroke={a.stem} strokeWidth="4" strokeLinecap="round" />
      <g transform={`translate(0 ${-l})`}>
        <path d={C(i, d)} fill={a.leaf} transform={`rotate(${-c})`} />
        <path d={C(i, d)} fill={a.leaf} transform={`rotate(${c})`} />
        <path d={`M0 0 L0 ${f(-(0.8 * i))}`} stroke={a.vein} strokeWidth="1" transform={`rotate(${-c})`} />
        <path d={`M0 0 L0 ${f(-(0.8 * i))}`} stroke={a.vein} strokeWidth="1" transform={`rotate(${c})`} />
        {"good" === t && r > 0.8 && "two" === e.kind && "carrot" !== e.id ? <path d={C(5, 3)} fill={a.vein} /> : null}
      </g>
    </g>
  );
}
function A({ c: e, s: t, v: r }) {
  if ("asleep" === t)
    return (
      <g transform={`translate(0 ${e.depth})`}>
        <g transform="scale(1.5)">
          <L c={e} />
        </g>
        <g transform={`translate(14 ${Math.max(0, 22 - e.depth)})`}>
          <g
            className="wis-z"
            style={{
              animationDelay: `${(e.depth % 7) * 0.2}s`,
            }}
          >
            <text fontSize="17" fontWeight="800" fill="#fff6df">
              z
            </text>
          </g>
        </g>
        <g transform={`translate(25 ${Math.max(0, 22 - e.depth) - 11})`}>
          <g
            className="wis-z"
            style={{
              animationDelay: `${(e.depth % 7) * 0.2 + 0.8}s`,
            }}
          >
            <text fontSize="13" fontWeight="800" fill="#fff6df">
              z
            </text>
          </g>
        </g>
      </g>
    );
  let a = f(10 + ("fail" === t ? 10 : 40 * r)),
    l = "fail" === t ? "#b8a58a" : "#f4ecd6",
    n = e.depth;
  return (
    <g>
      <path d={`M0 ${n} L0 0`} stroke={"fail" === t ? "#a3957e" : "#e3e6bf"} strokeWidth="2.6" strokeLinecap="round" />
      <path
        d={`M0 ${n + 3} C-3 ${f(n + 0.35 * a)} 3 ${f(n + 0.65 * a)} -1 ${f(n + a)}`}
        fill="none"
        stroke={l}
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      {"fail" !== t && r > 0.35 && (
        <g stroke={l} strokeWidth="1.2" strokeLinecap="round">
          <path d={`M0 ${f(n + 0.45 * a)} l-7 5`} />
          <path d={`M1 ${f(n + 0.6 * a)} l7 4`} />
          <path d={`M0 ${f(n + 0.8 * a)} l-6 6`} />
        </g>
      )}
      <g transform={`translate(${"pea" === e.kind ? 0 : -4} ${n + 3 * ("pea" !== e.kind)})`} opacity={"pea" === e.kind ? 1 : 0.75}>
        <g transform={"pea" === e.kind ? "scale(1.5)" : "scale(1.2)"}>
          <L c={e} dim={"fail" === t} />
        </g>
      </g>
    </g>
  );
}
function S({ id: e }) {
  switch (e) {
    case "lettuce":
      return (
        <g>
          <circle r="15" fill="#86c65a" />
          <path d="M-12 2 C-8 -10 8 -10 12 2" fill="none" stroke="#5a9e3c" strokeWidth="2.5" />
          <path d="M-8 8 C-5 -2 5 -2 8 8" fill="none" stroke="#5a9e3c" strokeWidth="2.5" />
          <circle cy="6" r="5" fill="#c6e59a" />
        </g>
      );
    case "spinach":
      return (
        <g>
          <path d="M0 16 L0 6" stroke="#3f7a2f" strokeWidth="3" strokeLinecap="round" />
          <path d="M0 8 C-15 4 -14 -12 0 -16 C14 -12 15 4 0 8Z" fill="#3f8a3a" />
          <path d="M0 6 L0 -12 M0 -2 l-6 -5 M0 -6 l6 -5" stroke="#8fcf6a" strokeWidth="1.6" strokeLinecap="round" />
        </g>
      );
    case "pea":
      return (
        <g transform="rotate(-28)">
          <path d="M-16 2 C-10 -9 10 -9 16 -2 C10 7 -10 9 -16 2Z" fill="#6cb24a" stroke="#4a8a32" strokeWidth="1.5" />
          <circle cx="-7" cy="-1" r="4" fill="#a7dc6f" />
          <circle cx="1" cy="-1.5" r="4" fill="#a7dc6f" />
          <circle cx="9" cy="-1" r="3.6" fill="#a7dc6f" />
        </g>
      );
    case "radish":
      return (
        <g>
          <path
            d="M-2 -8 C-8 -16 -12 -16 -12 -12 M2 -8 C6 -17 11 -17 11 -13 M0 -8 L0 -17"
            stroke="#4f9a36"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
          <circle cy="2" r="10" fill="#d9344a" />
          <path d="M0 11 L0 17" stroke="#f3e6e0" strokeWidth="2" strokeLinecap="round" />
          <ellipse cx="-4" cy="-1" rx="2.5" ry="3.5" fill="#f07a8a" />
        </g>
      );
    case "carrot":
      return (
        <g>
          <path
            d="M-2 -9 C-8 -15 -10 -18 -6 -18 M1 -9 L1 -19 M3 -9 C8 -15 11 -17 8 -18"
            stroke="#4f9a36"
            strokeWidth="2.6"
            strokeLinecap="round"
            fill="none"
          />
          <path d="M-7 -10 Q0 -12 7 -10 L1 17 Q0 18 -1 17 Z" fill="#ef8a2a" />
          <path d="M-4 -3 l4 1 M-2 4 l3 1 M-3 9 l2 1" stroke="#c9661a" strokeWidth="1.4" strokeLinecap="round" />
        </g>
      );
    case "onion":
      return (
        <g>
          <path
            d="M0 -17 C-1 -10 -12 -4 -11 5 C-10 12 -5 14 0 14 C5 14 10 12 11 5 C12 -4 1 -10 0 -17Z"
            fill="#c98a4a"
            stroke="#8a5a2a"
            strokeWidth="1.4"
          />
          <path d="M-5 -3 C-6 4 -4 10 -1 13 M5 -3 C6 4 4 10 1 13" stroke="#a86c35" strokeWidth="1.2" fill="none" />
          <path d="M-3 14 l-2 4 M0 14 v4 M3 14 l2 4" stroke="#e8d8b8" strokeWidth="1.3" strokeLinecap="round" />
        </g>
      );
    case "bean":
      return (
        <g>
          <path d="M-14 -12 C-6 -8 -3 0 2 8 C6 13 12 15 15 14" fill="none" stroke="#5aa23c" strokeWidth="7" strokeLinecap="round" />
          <path d="M-14 -12 l-2 -3" stroke="#3f7a2f" strokeWidth="2" strokeLinecap="round" />
          <circle cx="-7" cy="-7" r="1.8" fill="#8fd06a" />
          <circle cx="0" cy="3" r="1.8" fill="#8fd06a" />
          <circle cx="8" cy="11" r="1.8" fill="#8fd06a" />
        </g>
      );
    case "corn":
      return (
        <g>
          <ellipse rx="7" ry="15" fill="#f2c94c" />
          <g fill="#d9a92c">
            {[-10, -5, 0, 5, 10].map((e) => (
              <g key={e}>
                <circle cx="-3" cy={e} r="1.4" />
                <circle cx="3" cy={e} r="1.4" />
              </g>
            ))}
          </g>
          <path d="M-2 16 C-14 8 -12 -6 -9 -12 C-9 -2 -6 8 -2 16Z" fill="#6cb24a" />
          <path d="M2 16 C14 8 12 -6 9 -12 C9 -2 6 8 2 16Z" fill="#5aa23c" />
        </g>
      );
    case "cucumber":
      return (
        <g transform="rotate(-35)">
          <rect x="-17" y="-7" width="34" height="14" rx="7" fill="#3f8a3a" />
          <path d="M-11 -3 h22 M-11 3 h22" stroke="#7cc05a" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="2 4" />
        </g>
      );
    case "watermelon":
      return (
        <g>
          <path d="M-17 -6 A17 17 0 0 0 17 -6 Z" fill="#2f7d3a" />
          <path d="M-14 -6 A14 14 0 0 0 14 -6 Z" fill="#f4f1d0" />
          <path d="M-12 -6 A12 12 0 0 0 12 -6 Z" fill="#ec4a5a" />
          <g fill="#231c1b">
            <ellipse cx="-5" cy="-1" rx="1.3" ry="2" />
            <ellipse cx="3" cy="0" rx="1.3" ry="2" />
            <ellipse cx="-1" cy="3" rx="1.3" ry="2" />
          </g>
        </g>
      );
    case "tomato":
      return (
        <g>
          <circle cy="3" r="13" fill="#e2413a" />
          <path d="M0 -9 l3 -4 l1 5 l5 -1 l-4 3 l4 3 l-5 0 l-1 4 l-3 -4 l-3 4 l-1 -4 l-5 0 l4 -3 l-4 -3 l5 1 l1 -5Z" fill="#4f9a36" />
          <ellipse cx="-6" cy="0" rx="2.5" ry="3.5" fill="#f58a80" />
        </g>
      );
    case "pepper":
      return (
        <g>
          <path d="M0 -10 C0 -14 3 -17 6 -17" stroke="#3f7a2f" strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M-12 -6 C-14 6 -10 15 -5 15 C-2 15 -1 12 0 12 C1 12 2 15 5 15 C10 15 14 6 12 -6 C9 -12 -9 -12 -12 -6Z" fill="#d8352b" />
          <path d="M-4 -6 C-6 2 -5 9 -4 12 M4 -6 C6 2 5 9 4 12" stroke="#a82820" strokeWidth="1.3" fill="none" />
        </g>
      );
  }
}
let P = `
.wis-pop{transform-box:fill-box;transform-origin:50% 100%;animation:wisPop .55s cubic-bezier(.3,1.5,.55,1) both}
@keyframes wisPop{0%{transform:scale(.25,.1)}55%{transform:scale(1.08,1.18)}78%{transform:scale(.97,.95)}100%{transform:scale(1,1)}}
.wis-wilt{transform-box:fill-box;transform-origin:0% 100%;animation:wisWilt .6s ease-out both}
@keyframes wisWilt{0%{transform:rotate(-14deg)}100%{transform:rotate(0)}}
.wis-z{animation:wisZ 2.6s ease-in-out infinite}
@keyframes wisZ{0%{opacity:0;transform:translate(0,4px)}35%{opacity:.95}100%{opacity:0;transform:translate(5px,-9px)}}
.wis-shim{animation:wisShim 1.8s ease-in-out infinite}
@keyframes wisShim{0%,100%{transform:translateY(0);opacity:.55}50%{transform:translateY(-6px);opacity:.95}}
.wis-sun{transition:fill .4s ease}
@media (prefers-reduced-motion: reduce){.wis-pop,.wis-wilt,.wis-z,.wis-shim{animation:none}.wis-z{opacity:.8}}
`;
function Z({ soilC: e, place: t }) {
  let r = "wis" + (0, n.useId)().replace(/[^a-zA-Z0-9]/g, ""),
    a = null != e && Number.isFinite(e) ? e : null,
    l = null != a ? i(Math.round(a), 0, 40) : null,
    [m, k] = (0, n.useState)(l ?? 12),
    $ = (0, n.useRef)(false),
    C = (e) => k(i(Math.round(e), 0, 40)),
    L = (e) => {
      let t = e.currentTarget.getBoundingClientRect();
      t.height <= 0 || C((510 - ((e.clientY - t.top) / t.height) * 600) / 10.5);
    },
    W = () => {
      $.current = false;
    },
    T = o.map((e) => {
      let t = h(e, m);
      return {
        c: e,
        s: t,
        v: (function (e, t, r) {
          if ("asleep" === r) return 0;
          let s = u(e, t);
          return i(s ? Math.sqrt(3 / s) : "good" === r ? 0.7 : "slow" === r ? 0.28 : 0.45, 0.16, 1);
        })(e, m, t),
      };
    }),
    z = (function (e) {
      let t = (t) => o.filter((r) => h(r, e) === t),
        r = t("asleep"),
        s = t("slow"),
        a = t("good"),
        l = t("hot"),
        n = t("fail"),
        i = `At ${e} \xb0C`;
      if (r.length === o.length) {
        let e = Math.min(...o.map(x)),
          t = o.filter((t) => x(t) === e);
        return `${i} the soil is too cold for every seed here, so they all stay asleep. ${y(p(t))} wake first, at ${e} \xb0C.`;
      }
      let d = [];
      if (a.length === o.length) {
        let t = o
          .map((t) => ({
            c: t,
            d: u(t, e),
          }))
          .filter((e) => null != e.d);
        t.sort((e, t) => e.d - t.d);
        let r = t[0],
          s = t[t.length - 1];
        d.push(
          `${i} every seed here comes up well — ${r.c.many} in about ${Math.round(r.d)} days, ${s.c.many} in about ${Math.round(s.d)}.`,
        );
      } else if (a.length) {
        let e = o.filter((e) => !a.includes(e));
        (d.push(
          a.length > e.length + 4
            ? `${i} everything but ${p(e)} is coming up well.`
            : `${i} ${p(a)} ${g(a) ? "are" : "is"} coming up well.`,
        ),
          s.length &&
            d.push(`${y(p(s))} ${g(s) ? "come" : "comes"} up too, but more slowly — it's still cool for ${g(s) ? "them" : "it"}.`));
      } else
        s.length
          ? d.push(`${i} ${p(s)} ${g(s) ? "are" : "is"} just waking up — slowly, over weeks.`)
          : l.length &&
            d.push(`${i} almost everything fails. Only ${p(l)} still ${g(l) ? "come" : "comes"} up, and fewer of ${g(l) ? "them" : "it"}.`);
      if (r.length) {
        let e = Math.min(...r.map(x)),
          t = r.filter((t) => x(t) === e),
          s = t.every((e) => "warm" === e.season);
        d.push(`${y(p(t, 4))} would just ${s ? "sit and rot" : "stay asleep"} — wait for ${e} \xb0C.`);
      }
      return (
        n.length
          ? d.push(`Too hot for ${p(n)} — ${g(n) ? "they fail" : "it fails"}.`)
          : l.length && a.length && d.push(`${y(p(l))} ${g(l) ? "are" : "is"} starting to struggle in the warmth.`),
        d.join(" ")
      );
    })(m),
    D = m / 40,
    F = i((3 - m) / 3, 0, 1),
    R = i((m - 29) / 8, 0, 1),
    H = w("#6b5d55", "#83593a", D),
    I = w("#564a44", "#6a4630", D),
    B = f(24 + 16 * D),
    O = 510 - 10.5 * m,
    U = w("#4f86c6", "#d9463b", i(m / 25, 0, 1)),
    E = null != a ? 510 - 10.5 * i(a, 0, 40) : null,
    Q = `Two garden rows cut open to show seeds in the soil — cool-season seeds at the back, warm-season seeds at the front — with a soil thermometer at ${m} \xb0C. ${z}`;
  return (
    <div className="text-ink">
      <style>{P}</style>
      <div className="relative overflow-hidden rounded-2xl border border-line">
        <svg viewBox="0 0 800 600" className="block h-auto w-full select-none" role="img" aria-label={Q}>
          <defs>
            <linearGradient id={`${r}sky`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor={w("#c3d0da", "#7dbde6", D)} />
              <stop offset="1" stopColor={w("#edf0ee", "#fcefc6", D)} />
            </linearGradient>
            <linearGradient id={`${r}tube`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#ffffff" />
              <stop offset="0.6" stopColor="#f1f4f6" />
              <stop offset="1" stopColor="#d9e0e6" />
            </linearGradient>
            {b.map((e, t) => (
              <clipPath key={t} id={`${r}bed${t}`}>
                <rect x="184" y={e.surface} width="608" height={e.bottom - e.surface} />
              </clipPath>
            ))}
          </defs>
          <rect width={800} height={600} fill={`url(#${r}sky)`} />
          <circle className="wis-sun" cx="742" cy="64" r={B + 14} fill={w("#f6f1dc", "#ffe08a", D)} opacity={f(0.25 + 0.35 * D)} />
          <circle className="wis-sun" cx="742" cy="64" r={B} fill={w("#f4f0da", "#ffc93c", D)} />
          {m < 12 && (
            <g fill="#ffffff" opacity={f(0.9 - 0.06 * m)}>
              <ellipse cx="360" cy="70" rx="58" ry="18" />
              <circle cx="336" cy="60" r="20" />
              <circle cx="372" cy="54" r="25" />
              <ellipse cx="560" cy="44" rx="44" ry="14" />
              <circle cx="572" cy="36" r="18" />
            </g>
          )}
          <path d="M0 190 Q160 150 330 176 T640 166 T800 172 V600 H0Z" fill={w("#a9b39c", "#9cc56a", D)} />
          <path d="M0 214 Q200 196 420 210 T800 204 V600 H0Z" fill={w("#98a68a", "#86b95a", D)} />
          <rect x="0" y="380" width={800} height="220" fill={w("#8f9e80", "#79ad4f", D)} />
          {b.map((e, t) => (
            <g key={e.season}>
              <rect x="184" y={e.surface} width="608" height={e.bottom - e.surface} fill={H} />
              <g clipPath={`url(#${r}bed${t})`}>
                <rect x="184" y={e.surface + 44} width="608" height={e.bottom - e.surface} fill={I} opacity="0.55" />
                {M.filter((e) => e.bed === t).map((e, t) => (
                  <ellipse key={t} cx={e.x} cy={e.y} rx={e.rx} ry={e.ry} fill={e.light ? "#a88a6c" : "#4a3a30"} opacity="0.55" />
                ))}
                {F > 0 && <rect x="184" y={e.surface} width="608" height={e.bottom - e.surface} fill="#cfe3f5" opacity={f(0.28 * F)} />}
              </g>
              <rect x="184" y={e.surface - 3} width="608" height="6" rx="3" fill={w("#6e6158", "#6f4b31", D)} />
              {F > 0 &&
                v.slice(22 * t, 22 * t + 22).map((e, t) => <circle key={t} cx={e.x} cy={e.y} r={e.r} fill="#ffffff" opacity={f(F)} />)}
              {R > 0 && (
                <g stroke="#fff7e0" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity={f(0.4 + 0.5 * R)}>
                  {[250, 420, 600, 760].map((r, a) => (
                    <g key={r} transform={`translate(${r - 50 * t} ${e.surface - 18})`}>
                      <g
                        className="wis-shim"
                        style={{
                          animationDelay: `${0.35 * a}s`,
                        }}
                      >
                        <path d="M0 0 c5 -5 -5 -10 0 -15 c5 -5 -5 -10 0 -15" />
                      </g>
                    </g>
                  ))}
                </g>
              )}
              {m >= 33 && (
                <g stroke="#4a3322" strokeWidth="1.6" fill="none" opacity="0.5" strokeLinecap="round">
                  <path d={`M200 ${e.surface + 4} l8 6 l-3 7`} />
                  <path d={`M470 ${e.surface + 4} l-6 7 l5 5`} />
                  <path d={`M690 ${e.surface + 4} l7 8`} />
                </g>
              )}
              <g clipPath={`url(#${r}bed${t})`}>
                {T.filter((t) => t.c.season === e.season).map(({ c: t, s: r, v: a }, l) => (
                  <g key={t.id} transform={`translate(${j[l]} ${e.surface})`}>
                    <A c={t} s={r} v={a} />
                  </g>
                ))}
              </g>
              {T.filter((t) => t.c.season === e.season).map(({ c: t, s: r, v: a }, l) =>
                "asleep" === r ? null : (
                  <g key={t.id} transform={`translate(${j[l]} ${e.surface})`}>
                    <g key={r} className={"fail" === r ? "wis-wilt" : "wis-pop"}>
                      <N c={t} s={r} v={a} />
                    </g>
                  </g>
                ),
              )}
              <rect x="180" y={e.bottom} width="616" height="30" rx="4" fill="#a8773f" stroke="#7a522a" strokeWidth="2" />
              <path d={`M186 ${e.bottom + 10} H790 M186 ${e.bottom + 21} H790`} stroke="#94662f" strokeWidth="1.2" opacity="0.6" />
              {T.filter((t) => t.c.season === e.season).map(({ c: t }, r) => (
                <g key={t.id}>
                  <g transform={`translate(${j[r] - 34} ${e.bottom + 15}) scale(0.62)`}>
                    <circle r="19" fill="#fff8ea" stroke="#7a522a" strokeWidth="2" />
                    <S id={t.id} />
                  </g>
                  <text x={j[r] - 19} y={e.bottom + 20} fontSize="13" fontWeight="700" fill="#fff8ea" className="hidden sm:inline">
                    {t.board}
                  </text>
                </g>
              ))}
            </g>
          ))}
          <rect x="0" y="0" width={170} height={600} fill="#fffdf8" opacity="0.35" />
          <ellipse cx={100} cy="574" rx="58" ry="16" fill={H} />
          <text x="72" y="44" textAnchor="end" fontSize="19" fontWeight="800" fill="#1f2a22">
            °C
          </text>
          <text x="128" y="44" fontSize="19" fontWeight="800" fill="#1f2a22">
            °F
          </text>
          <rect x={86} y="64" width="28" height="470" rx="14" fill={`url(#${r}tube)`} stroke="#5b6670" strokeWidth="3" />
          <rect x={94} y={f(O)} width="12" height={f(540 - O)} rx="6" fill={U} />
          <circle cx={100} cy="552" r="26" fill={U} stroke="#5b6670" strokeWidth="3" />
          <circle cx={92} cy="544" r="7" fill="#ffffff" opacity="0.45" />
          {Array.from(
            {
              length: 41,
            },
            (e, t) => t,
          ).map((e) => {
            let t = 510 - 10.5 * e,
              r = e % 5 == 0;
            return (
              <g key={e}>
                <line x1={86} x2={100 - (r ? 26 : 20)} y1={t} y2={t} stroke="#5b6670" strokeWidth={r ? 2.5 : 1.2} />
                <line x1={114} x2={100 + (r ? 26 : 20)} y1={t} y2={t} stroke="#5b6670" strokeWidth={r ? 2.5 : 1.2} />
                {r && (
                  <>
                    <text x={70} y={t + 6} textAnchor="end" fontSize="18" fontWeight="700" fill="#1f2a22">
                      {e}
                    </text>
                    <text x={130} y={t + 6} fontSize="18" fontWeight="700" fill="#4a5a4f">
                      {d(e)}
                    </text>
                  </>
                )}
              </g>
            );
          })}
          {null != E && (
            <g transform={`translate(0 ${f(E)})`}>
              <path d="M84 0 l-10 -8 v16 Z" fill="#2f5d3a" />
              <rect x="2" y="-21" width="72" height="42" rx="10" fill="#2f5d3a" />
              <text x="38" y="-3" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fffdf8">
                your soil
              </text>
              <text x="38" y="14" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fffdf8">
                today
              </text>
            </g>
          )}
          <g transform={`translate(100 ${f(O)})`}>
            <circle r="25" fill="#1f2a22" opacity="0.15" transform="translate(0 3)" />
            <circle r="24" fill="#fffdf8" stroke={U} strokeWidth="6" />
            <path
              d="M-7 -4 L0 -12 L7 -4 M-7 4 L0 12 L7 4"
              fill="none"
              stroke="#1f2a22"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </svg>
        <div
          role="slider"
          tabIndex={0}
          aria-label="Soil thermometer: drag up to warm the soil, down to cool it"
          aria-orientation="vertical"
          aria-valuemin={0}
          aria-valuemax={40}
          aria-valuenow={m}
          aria-valuetext={`${m} degrees Celsius, ${d(m)} Fahrenheit`}
          onPointerDown={(e) => {
            ("mouse" !== e.pointerType || 0 === e.button) && (e.currentTarget.setPointerCapture(e.pointerId), ($.current = true), L(e));
          }}
          onPointerMove={(e) => {
            $.current && L(e);
          }}
          onPointerUp={W}
          onPointerCancel={W}
          onLostPointerCapture={W}
          onKeyDown={(e) => {
            let t = {
              ArrowUp: 1,
              ArrowRight: 1,
              ArrowDown: -1,
              ArrowLeft: -1,
              PageUp: 5,
              PageDown: -5,
            };
            e.key in t
              ? (e.preventDefault(), C(m + t[e.key]))
              : "Home" === e.key
                ? (e.preventDefault(), C(0))
                : "End" === e.key && (e.preventDefault(), C(40));
          }}
          className="absolute left-0 top-0 h-full cursor-ns-resize touch-none rounded-l-2xl outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-azure"
          style={{
            width: "21.25%",
          }}
        />
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-3">
        <p className="font-display text-4xl font-semibold leading-none sm:text-5xl">
          {m}
          {" °C "}
          <span className="text-2xl font-normal text-ink-2 sm:text-3xl">
            {d(m)}
            {" °F"}
          </span>
        </p>
        <div className="ml-auto flex gap-2">
          <button
            type="button"
            onClick={() => C(m - 1)}
            disabled={m <= 0}
            aria-label="One degree colder"
            className="min-h-12 rounded-full border-2 border-azure/40 bg-paper px-4 font-semibold text-azure transition hover:border-azure active:scale-95 disabled:opacity-40"
          >
            − Colder
          </button>
          <button
            type="button"
            onClick={() => C(m + 1)}
            disabled={m >= 40}
            aria-label="One degree warmer"
            className="min-h-12 rounded-full border-2 border-rust/40 bg-paper px-4 font-semibold text-rust transition hover:border-rust active:scale-95 disabled:opacity-40"
          >
            + Warmer
          </button>
        </div>
      </div>
      {null != a && null != l && (
        <button
          type="button"
          onClick={() => C(l)}
          aria-pressed={m === l}
          className={`mt-3 min-h-11 rounded-full px-4 py-2 text-sm font-semibold transition active:scale-95 ${m === l ? "bg-moss text-white" : "border-2 border-moss/50 bg-paper text-moss hover:border-moss"}`}
        >
          Your soil today{t ? ` in ${t}` : ""}
          {": "}
          {Math.round(a)}
          {" °C"}
        </button>
      )}
      <p aria-live="polite" className="font-display mt-3 min-h-[5.5rem] text-lg leading-snug sm:min-h-[4rem] sm:text-xl">
        {z}
      </p>
      {["cool", "warm"].map((e) => (
        <div key={e} className="mt-4">
          <p className="eyebrow">{"cool" === e ? "Back row · cool-season seeds" : "Front row · warm-season seeds"}</p>
          <ul className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
            {T.filter((t) => t.c.season === e).map(({ c: e, s: t }) => {
              let r = (function (e, t) {
                let r = h(e, t),
                  s = u(e, t),
                  a = null != s ? Math.round(s) : null;
                switch (r) {
                  case "asleep":
                    return {
                      label: `Too cold \xb7 needs ${x(e)} \xb0C`,
                      color: "#3f6c9e",
                    };
                  case "slow":
                    return {
                      label: a ? `${a > 14 ? "Slowly" : "Patchy"} \xb7 about ${a} days` : "Slow and patchy",
                      color: "#6f7d22",
                    };
                  case "good":
                    return {
                      label: a ? `Up in about ${a} days` : "Comes up well",
                      color: "#2f5d3a",
                    };
                  case "hot":
                    return {
                      label: a ? `Fewer come up \xb7 ${a} days` : "Fewer come up",
                      color: "#9a6412",
                    };
                  case "fail":
                    return {
                      label: `Too hot above ${Math.floor(c(e.f[3]) + 1e-9)} \xb0C`,
                      color: "#c8352b",
                    };
                }
              })(e, m);
              return (
                <li
                  key={e.id}
                  className="flex min-h-12 items-center gap-2 rounded-xl border-2 bg-paper px-2 py-1.5"
                  style={{
                    borderColor: "asleep" === t ? "#d9cfb8" : r.color,
                  }}
                >
                  <svg viewBox="-20 -20 40 40" className="h-8 w-8 shrink-0" aria-hidden="true">
                    <S id={e.id} />
                  </svg>
                  <span className="min-w-0 leading-tight">
                    <span className="block text-sm font-semibold">{e.name}</span>
                    <span
                      className="block text-xs font-semibold"
                      style={{
                        color: r.color,
                      }}
                    >
                      {r.label}
                    </span>
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
      <p className="mt-4 text-sm text-ink-2">
        A bigger sprout means it comes up faster. Push a soil thermometer in to seed depth first thing in the morning, when the soil is
        coldest — that is the number your seeds feel.
      </p>
      <p className="mt-2 text-xs leading-relaxed text-ink-2">
        Source: J. F. Harrington’s soil-temperature tables for vegetable seed germination (University of California), as published by{" "}
        <a
          className="underline decoration-line underline-offset-2 hover:text-moss"
          href="https://extension.oregonstate.edu/gardening/techniques/soil-temperature-conditions-vegetable-seed-germination"
        >
          Oregon State University Extension
        </a>
        . Days to come up are for seed sown ½ inch (1.3 cm) deep, measured every 5 °C and estimated in between.
      </p>
    </div>
  );
}
let T = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  z = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  D = ["#e6eff6", "#d7e6f1", "#d3eab4", "#b7de92", "#95cc6f", "#f6dc7c", "#f1c94c", "#e8b53c", "#f2a95e", "#e98a3a", "#c97a45", "#f3f7fa"],
  F = ["snow", "snow", "spring", "spring", "spring", "summer", "summer", "summer", "autumn", "autumn", "autumn", "snow"],
  R = [
    "Deep winter. Almost everything is asleep under the snow — only a few evergreen leaves and tough, woody mushrooms carry on.",
    "Late winter. When days thaw and nights still freeze, the maple sap starts to run.",
    "The thaw. Sap runs, and the first green shoots push up where the snow melts first.",
    "Spring rush! Before the trees leaf out, the forest floor turns green with young shoots and leaves.",
    "Peak of the greens. Pick them young — most get tough or bitter as they grow.",
    "Early summer. Leaves are big, flowers are out, and the first berries turn ripe.",
    "Berry time! Warm days ripen berries on sunny edges, and summer mushrooms pop up after rain.",
    "High summer. Berries peak, nuts start to fill, and mushrooms follow the rain.",
    "The big harvest — fruit, nuts, berries and mushrooms all at once. The busiest month of the year.",
    "Autumn. Nuts fall, grapes and apples sweeten, and the last big flush of mushrooms comes before the frost.",
    "Frost comes. Leaves fall, but rose hips and some berries hang on — and frost makes some of them sweeter.",
    "Early winter. Snow covers most things; a few evergreen leaves and winter berries are still there.",
  ],
  H = ["green", "berry", "fruit", "mushroom", "nut", "tree", "root", "coastal"],
  I = {
    green: {
      label: "Greens",
      tint: "#d5eabf",
      dot: "#4f8a3c",
    },
    berry: {
      label: "Berries",
      tint: "#ddd2f0",
      dot: "#5b4a9a",
    },
    fruit: {
      label: "Fruit",
      tint: "#f5d2c9",
      dot: "#c0473a",
    },
    mushroom: {
      label: "Mushrooms",
      tint: "#ecdbbd",
      dot: "#8a6a48",
    },
    nut: {
      label: "Nuts",
      tint: "#e5d0b2",
      dot: "#7a5132",
    },
    tree: {
      label: "From trees",
      tint: "#cae3d9",
      dot: "#2f6f5a",
    },
    root: {
      label: "Roots",
      tint: "#e7d9c1",
      dot: "#8c6f52",
    },
    coastal: {
      label: "Seashore",
      tint: "#cde1f0",
      dot: "#2c6fb5",
    },
  },
  B = (e) =>
    I[e] ?? {
      label: e.charAt(0).toUpperCase() + e.slice(1),
      tint: "#efe7d7",
      dot: "#4a5a4f",
    },
  O = (e) => {
    let t = H.indexOf(e);
    return t < 0 ? H.length : t;
  },
  U = (e) => Math.round(10 * e) / 10,
  E = (e, t) => {
    let r = (t * Math.PI) / 180;
    return `${U(300 + e * Math.sin(r))} ${U(300 - e * Math.cos(r))}`;
  },
  Q = `M${E(206, -15)} L${E(292, -15)} A292 292 0 0 1 ${E(292, 15)} L${E(206, 15)} A206 206 0 0 0 ${E(206, -15)} Z`,
  J = `M${E(203, -15.5)} L${E(293, -15.5)} A293 293 0 0 1 ${E(293, 15.5)} L${E(203, 15.5)} A203 203 0 0 0 ${E(203, -15.5)} Z`,
  V = (e, t) => ((e % t) + t) % t,
  Y = (e) => {
    let t = V(e + 180, 360) - 180;
    return -180 === t ? 180 : t;
  },
  q = (e) => V(Math.round(-e / 30), 12);
function G(e, t) {
  if (4 > Math.abs(t)) return 0;
  let r = V(e + 15, 30),
    s = r > 15 ? r - 30 : r;
  return Math.abs(s) > 7 ? 0 : Math.round(Math.sign(t) * (7 - Math.abs(s)) * 32) / 10;
}
let K = (e) => Math.round(1e6 * e) / 1e6;
function _({ season: e }) {
  return "snow" === e ? (
    <g stroke="#5b87b0" strokeWidth={2.6} strokeLinecap="round" fill="none">
      <path d="M0 -10 V10 M-8.7 -5 L8.7 5 M-8.7 5 L8.7 -5" />
      <path d="M-3 -8 L0 -5 L3 -8 M-3 8 L0 5 L3 8" />
    </g>
  ) : "spring" === e ? (
    <g>
      <path d="M0 10 V-2" stroke="#3f7a2e" strokeWidth={2.6} strokeLinecap="round" />
      <path d="M0 0 C -2 -8 -10 -10 -12 -8 C -10 -2 -4 0 0 0 Z" fill="#4f8a3c" />
      <path d="M0 -2 C 2 -10 10 -12 12 -10 C 10 -4 4 -2 0 -2 Z" fill="#5a9a45" />
    </g>
  ) : "summer" === e ? (
    <g>
      <g stroke="#b77d10" strokeWidth={2.4} strokeLinecap="round">
        <path d="M0 -12 V-9 M0 9 V12 M-12 0 H-9 M9 0 H12 M-8.5 -8.5 L-6.4 -6.4 M6.4 6.4 L8.5 8.5 M-8.5 8.5 L-6.4 6.4 M6.4 -6.4 L8.5 -8.5" />
      </g>
      <circle r={5.5} fill="#fff4c9" stroke="#b77d10" strokeWidth={2} />
    </g>
  ) : (
    <g>
      <path d="M0 -11 C 8 -6 9 4 0 10 C -9 4 -8 -6 0 -11 Z" fill="#b5541f" stroke="#1f2a22" strokeOpacity={0.35} strokeWidth={1} />
      <path d="M0 -8 V12" stroke="#7a3512" strokeWidth={1.8} strokeLinecap="round" />
    </g>
  );
}
let X = `
.sy-tok{animation:syPop .42s cubic-bezier(.3,1.5,.5,1) both}
@keyframes syPop{0%{transform:scale(0);opacity:0}100%{transform:scale(1);opacity:1}}
.sy-tok:hover{z-index:2}
.sy-tok:hover .sy-face{transform:scale(1.12)}
.sy-face{transition:transform .15s ease}
.sy-name{animation:syFade .25s ease both}
@keyframes syFade{0%{opacity:0;transform:scale(.8)}100%{opacity:1;transform:scale(1)}}
.sy-wheel:focus{outline:none}
.sy-wheel:focus-visible{outline:4px solid #2c6fb5;outline-offset:4px}
@media (prefers-reduced-motion: reduce){.sy-tok,.sy-name{animation:none}.sy-face{transition:none}}
`;
function CEe_({ species: e, startMonth: t = 6, placeLabel: r, captions: captionSet = R }) {
  let a = "sy" + (0, n.useId)().replace(/[^a-zA-Z0-9]/g, ""),
    l = V(Math.round(t) - 1, 12),
    o = -(30 * l),
    [i, d] = (0, n.useState)({
      rot: o,
      tilt: 0,
    }),
    [c, f] = (0, n.useState)(l),
    [h, u] = (0, n.useState)(false),
    [x, m] = (0, n.useState)(0),
    p = (0, n.useRef)({
      rot: o,
      v: 0,
      target: null,
      dragging: false,
    }),
    g = (0, n.useRef)(null),
    y = (0, n.useRef)(false);
  ((0, n.useEffect)(() => {
    "function" == typeof window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches && (y.current = true);
  }, []),
    (0, n.useEffect)(() => {
      if (0 === x) return;
      let e = 0,
        t = -1,
        r = (s) => {
          let a = p.current;
          if (a.dragging) return;
          let l = t < 0 ? 1 / 60 : Math.min(0.05, (s - t) / 1e3);
          t = s;
          let n = (function (e, t) {
            if (null === e.target) {
              e.rot += e.v * t;
              let r = (70 + 0.85 * Math.abs(e.v)) * t;
              return (
                (e.v = Math.abs(e.v) <= r ? 0 : e.v - Math.sign(e.v) * r),
                90 > Math.abs(e.v) && (e.target = 30 * Math.round((e.rot + 0.18 * e.v) / 30)),
                false
              );
            }
            return (
              (e.v += (-170 * (e.rot - e.target) - 17 * e.v) * t),
              (e.rot += e.v * t),
              !!(0.05 > Math.abs(e.rot - e.target) && 3 > Math.abs(e.v)) && ((e.rot = e.target), (e.v = 0), true)
            );
          })(a, l);
          if (
            (d({
              rot: a.rot,
              tilt: G(a.rot, a.v),
            }),
            n)
          ) {
            (f(q(a.rot)), u(false));
            return;
          }
          e = requestAnimationFrame(r);
        };
      return ((e = requestAnimationFrame(r)), () => cancelAnimationFrame(e));
    }, [x]));
  let b = (e) => {
      let t = p.current;
      if (((t.dragging = false), 0.01 > Math.abs(e - t.rot) && 0 === t.v && null === t.target)) {
        ((t.rot = e),
          d({
            rot: e,
            tilt: 0,
          }));
        return;
      }
      if (y.current) {
        ((t.rot = e),
          (t.v = 0),
          (t.target = null),
          d({
            rot: e,
            tilt: 0,
          }),
          f(q(e)),
          u(false));
        return;
      }
      ((t.target = e), u(true), m((e) => e + 1));
    },
    j = (e) => {
      let t = p.current;
      b(t.rot + Y(-(30 * e) - t.rot));
    },
    k = (e) => {
      let t = p.current;
      b((t.target ?? 30 * Math.round(t.rot / 30)) - 30 * e);
    },
    $ = () => {
      let e = p.current;
      y.current
        ? j(V(q(e.rot) + 2 + Math.floor(9 * Math.random()), 12))
        : ((e.dragging = false), (e.target = null), (e.v = -(820 + 900 * Math.random())), u(true), m((e) => e + 1));
    },
    w = (e) => {
      let t = e.currentTarget.getBoundingClientRect(),
        r = ((e.clientX - t.left) / t.width) * 600 - 300,
        s = ((e.clientY - t.top) / t.height) * 600 - 300;
      return {
        r: Math.hypot(r, s),
        ang: (180 * Math.atan2(r, -s)) / Math.PI,
      };
    },
    M = (e, t) => {
      let r = g.current;
      if (!r) return;
      g.current = null;
      let s = p.current;
      if (((s.dragging = false), t && r.moved < 4 && e.timeStamp - r.t0 < 600)) return void j(V(Math.round((w(e).ang - s.rot) / 30), 12));
      let a = r.samples[0],
        l = r.samples[r.samples.length - 1],
        n = (l.t - a.t) / 1e3,
        o = n > 0.005 && e.timeStamp - l.t < 80 ? (l.rot - a.rot) / n : 0;
      y.current || 60 > Math.abs(o)
        ? b(30 * Math.round(s.rot / 30))
        : ((s.v = Math.max(-1600, Math.min(1600, o))), (s.target = null), u(true), m((e) => e + 1));
    },
    v = q(i.rot),
    C = e
      .filter((e) => e.months.includes(c + 1))
      .sort((e, t) => O(e.kind) - O(t.kind) || (e.kind < t.kind ? -1 : +(e.kind > t.kind)) || (e.name < t.name ? -1 : +(e.name > t.name))),
    {
      d: L,
      placed: W,
      sectors: N,
    } = (function (e) {
      let { d: t, pts: r } = (function (e) {
          if (0 === e)
            return {
              d: 0,
              pts: [],
            };
          let t = 0;
          if (e <= 8) {
            let r = 1 === e ? 1 : Math.sin(Math.PI / e);
            t = 1 === e ? 0.8 : Math.min(0.7, (1.9 * r) / (1.08 + r));
          }
          let r = 0,
            s = [];
          for (let t = 0.7; t > 0.04; t *= 0.97) {
            let a = (function (e) {
              let t = 1.08 * e,
                r = 0.95 - e / 2,
                s = [],
                a = Math.ceil(r / (0.866 * t)) + 1,
                l = Math.ceil(r / t) + 2;
              for (let e = -a; e <= a; e++) {
                let a = e * t * 0.866,
                  n = e % 2 ? t / 2 : 0;
                for (let e = -l; e <= l; e++) {
                  let l = e * t + n;
                  l * l + a * a <= r * r + 1e-9 &&
                    s.push({
                      x: l,
                      y: a,
                      a: 0,
                    });
                }
              }
              return s;
            })(t);
            if (a.length >= e) {
              ((r = t),
                (s = a
                  .map((e) => ({
                    ...e,
                    r: e.x * e.x + e.y * e.y,
                    t: K(Math.atan2(e.x, -e.y)),
                  }))
                  .sort((e, t) => e.r - t.r || e.t - t.t)
                  .slice(0, e)));
              break;
            }
          }
          let a = t >= r,
            l = a ? t : r,
            n = (
              a
                ? (function (e, t) {
                    if (1 === e)
                      return [
                        {
                          x: 0,
                          y: 0,
                          a: 0,
                        },
                      ];
                    let r = 0.95 - t / 2;
                    return Array.from(
                      {
                        length: e,
                      },
                      (t, s) => {
                        let a = (2 * Math.PI * s) / e;
                        return {
                          x: r * Math.sin(a),
                          y: -r * Math.cos(a),
                          a: 0,
                        };
                      },
                    );
                  })(e, l)
                : s
            ).map((e) => {
              let t = 1e-6 > Math.abs(e.x) && 1e-6 > Math.abs(e.y);
              return {
                x: e.x,
                y: e.y,
                a: t ? -1 : K(V(Math.atan2(e.x, -e.y), 2 * Math.PI)),
              };
            });
          return (
            n.sort((e, t) => e.a - t.a),
            {
              d: l,
              pts: n,
            }
          );
        })(e.length),
        s = e.map((e, t) => ({
          s: e,
          x: r[t].x,
          y: r[t].y,
        })),
        a = r
          .map((t, r) => ({
            ...t,
            kind: e[r].kind,
          }))
          .filter((e) => e.a >= 0),
        l = [...new Set(e.map((e) => e.kind))],
        n = [],
        o = new Set(a.map((e) => e.kind));
      if (l.length > 1 && 1 === o.size)
        n.push({
          kind: a[0].kind,
          d: `M${108} 300 A192 192 0 1 1 ${492} 300 A192 192 0 1 1 ${108} 300 Z`,
        });
      else if (l.length > 1) {
        let e = (e) => (180 * e) / Math.PI;
        for (let t of l) {
          let r = a.map((e, r) => (e.kind === t ? r : -1)).filter((e) => e >= 0);
          if (!r.length) continue;
          let s = r[0],
            l = r[r.length - 1],
            o = a[V(s - 1, a.length)],
            i = a[V(l + 1, a.length)],
            d = e(a[s].a) - V(e(a[s].a) - e(o.a), 360) / 2,
            c = e(a[l].a) + V(e(i.a) - e(a[l].a), 360) / 2;
          if (c - d < 0.5) continue;
          let f = +(c - d > 180);
          n.push({
            kind: t,
            d: `M300 300 L${E(192, d)} A192 192 0 ${f} 1 ${E(192, c)} Z`,
          });
        }
      }
      return {
        d: t,
        placed: s,
        sectors: n,
      };
    })(C),
    A = [];
  for (let e of C) {
    let t = A[A.length - 1];
    t && t.kind === e.kind
      ? t.items.push(e)
      : A.push({
          kind: e.kind,
          items: [e],
        });
  }
  let S = C.filter((e) => e.deadlyDouble).length,
    P = C.length,
    Z = 0 === P ? `Nothing on the list for ${T[c]}` : `${P} ${1 === P ? "thing" : "things"} ready in ${T[c]}`,
    H = 50 * L,
    I = Math.round(100 * i.rot) / 100;
  return (
    <div className="text-ink">
      <style>{X}</style>
      <div className="relative mx-auto aspect-square w-full max-w-[620px] select-none">
        <svg
          viewBox="0 0 600 600"
          className="sy-wheel absolute inset-0 block h-full w-full cursor-grab touch-none rounded-full active:cursor-grabbing"
          role="slider"
          tabIndex={0}
          aria-label="Wheel of the months. Spin it, tap a month, or use the arrow keys."
          aria-valuemin={1}
          aria-valuemax={12}
          aria-valuenow={c + 1}
          aria-valuetext={`${T[c]}: ${P} ready`}
          onPointerDown={(e) => {
            if ("mouse" === e.pointerType && 0 !== e.button) return;
            let t = w(e);
            if (t.r < 198 || t.r > 300) return;
            e.currentTarget.setPointerCapture(e.pointerId);
            let r = p.current;
            ((r.dragging = true),
              (r.target = null),
              (r.v = 0),
              (g.current = {
                lastAng: t.ang,
                moved: 0,
                t0: e.timeStamp,
                samples: [
                  {
                    t: e.timeStamp,
                    rot: r.rot,
                  },
                ],
              }));
          }}
          onPointerMove={(e) => {
            let t = g.current;
            if (!t) return;
            let r = w(e),
              s = Y(r.ang - t.lastAng);
            ((t.lastAng = r.ang), (t.moved += Math.abs(s)));
            let a = p.current;
            for (
              a.rot += s,
                t.samples.push({
                  t: e.timeStamp,
                  rot: a.rot,
                });
              t.samples.length > 2 && e.timeStamp - t.samples[0].t > 90;
            )
              t.samples.shift();
            (d({
              rot: a.rot,
              tilt: G(a.rot, 60 * s),
            }),
              t.moved > 4 && !h && u(true));
          }}
          onPointerUp={(e) => M(e, true)}
          onPointerCancel={(e) => M(e, false)}
          onLostPointerCapture={(e) => M(e, false)}
          onKeyDown={(e) => {
            let t,
              r = q((t = p.current).target ?? t.rot),
              s = {
                ArrowRight: () => k(1),
                ArrowUp: () => k(1),
                ArrowLeft: () => k(-1),
                ArrowDown: () => k(-1),
                PageUp: () => k(3),
                PageDown: () => k(-3),
                Home: () => j(0),
                End: () => j(11),
                Enter: $,
                " ": $,
              }[e.key];
            s && (e.preventDefault(), ("Home" !== e.key || 0 !== r) && ("End" !== e.key || 11 !== r) && s());
          }}
        >
          <defs>
            <radialGradient id={`${a}mid`} cx="50%" cy="45%" r="60%">
              <stop offset="0" stopColor="#fffdf8" />
              <stop offset="1" stopColor="#f3ecdd" />
            </radialGradient>
          </defs>
          <circle cx={300} cy={300} r={298} fill="#5b4332" />
          <circle cx={300} cy={303} r={292} fill="#3f2e22" opacity={0.5} />
          <g transform={`rotate(${I} 300 300)`}>
            {D.map((e, t) => (
              <g key={t} transform={`rotate(${30 * t} 300 300)`}>
                <path d={Q} fill={e} stroke="#fffdf8" strokeWidth={3} strokeLinejoin="round" />
                <text x={300} y={58} textAnchor="middle" fontSize={29} fontWeight={800} fill="#1f2a22" opacity={0.88}>
                  {z[t]}
                </text>
                <g transform="translate(300 80)">
                  <_ season={F[t]} />
                </g>
              </g>
            ))}
            {D.map((e, t) => (
              <g key={t} transform={`rotate(${30 * t + 15} 300 300)`}>
                <circle cx={300} cy={15} r={5.5} fill="#7a5a3f" stroke="#fffdf8" strokeWidth={2} />
              </g>
            ))}
          </g>
          <circle cx={300} cy={300} r={204} fill="#5b4332" opacity={0.25} />
          <circle cx={300} cy={300} r={196} fill={`url(#${a}mid)`} stroke="#d9cfb8" strokeWidth={3} />
          {!h && N.map((e) => <path key={e.kind} d={e.d} fill={B(e.kind).tint} stroke="#fffdf8" strokeWidth={3} />)}
          <path d={J} fill="none" stroke="#1f2a22" strokeWidth={5} strokeLinejoin="round" opacity={0.9} />
          <path d={J} fill="none" stroke="#d9a441" strokeWidth={2.5} strokeLinejoin="round" />
          <g transform={`translate(300 3) rotate(${i.tilt})`}>
            <path
              d="M-13 0 C-13 -7 13 -7 13 0 L2.5 28 Q0 32 -2.5 28 Z"
              fill="#1f2a22"
              stroke="#d9a441"
              strokeWidth={2.5}
              strokeLinejoin="round"
            />
            <circle r={4} fill="#d9a441" />
          </g>
        </svg>
        <div className="absolute left-[17.33%] top-[17.33%] h-[65.33%] w-[65.33%] rounded-full">
          {h ? (
            <div className="flex h-full w-full items-center justify-center">
              <p key={v} className="sy-name font-display text-4xl font-semibold text-ink sm:text-5xl">
                {T[v]}
              </p>
            </div>
          ) : 0 === P ? (
            <div className="flex h-full w-full items-center justify-center p-8 text-center">
              <p className="font-display text-xl text-ink-2">The land is resting.</p>
            </div>
          ) : (
            W.map((e, t) => {
              let r = B(e.s.kind);
              return (
                <a
                  key={`${c}-${e.s.slug}`}
                  href={`/foraging/${e.s.slug}`}
                  tabIndex={-1}
                  aria-hidden="true"
                  title={e.s.deadlyDouble ? `${e.s.name} — has a dangerous look-alike` : e.s.name}
                  className="sy-tok absolute block rounded-full"
                  style={{
                    left: `${Math.round((50 + 50 * e.x - H / 2) * 100) / 100}%`,
                    top: `${Math.round((50 + 50 * e.y - H / 2) * 100) / 100}%`,
                    width: `${Math.round(100 * H) / 100}%`,
                    height: `${Math.round(100 * H) / 100}%`,
                    animationDelay: `${Math.min(22 * t, 700)}ms`,
                  }}
                >
                  <span
                    className="sy-face block h-full w-full overflow-hidden rounded-full border-2 border-white bg-paper-2 shadow-sm"
                    style={{
                      boxShadow: e.s.deadlyDouble ? "0 0 0 3px #c8352b" : `0 0 0 2px ${r.dot}33`,
                    }}
                  >
                    {e.s.photo ? (
                      <img src={e.s.photo} alt="" loading="lazy" decoding="async" className="h-full w-full rounded-full object-cover" />
                    ) : (
                      <span
                        className="flex h-full w-full items-center justify-center text-[10px] font-bold text-white sm:text-xs"
                        style={{
                          background: r.dot,
                        }}
                      >
                        {e.s.name.slice(0, 2)}
                      </span>
                    )}
                  </span>
                </a>
              );
            })
          )}
        </div>
      </div>
      <div aria-live="polite" className="mt-4 text-center">
        {r && <p className="eyebrow">{r}</p>}
        <p className="font-display mt-1 text-2xl font-semibold leading-tight sm:text-3xl">{Z}</p>
        <p className="mx-auto mt-1 max-w-xl leading-snug text-ink-2">{captionSet[c]}</p>
      </div>
      <div className="mx-auto mt-4 grid max-w-md grid-cols-[auto_1fr_auto] items-center gap-2">
        <button
          type="button"
          onClick={() => k(-1)}
          aria-label={`Back a month, to ${T[V(c - 1, 12)]}`}
          className="min-h-12 rounded-full border-2 border-line bg-paper px-3 py-2 font-semibold text-ink-2 transition hover:border-moss hover:text-moss active:scale-95 sm:px-4"
        >
          {"‹ "}
          {z[V(c - 1, 12)]}
        </button>
        <button
          type="button"
          onClick={$}
          className="min-h-12 rounded-full bg-moss px-4 py-2 text-base font-semibold text-white shadow-sm transition hover:bg-moss-2 active:scale-95 sm:text-lg"
        >
          Spin the year
        </button>
        <button
          type="button"
          onClick={() => k(1)}
          aria-label={`On a month, to ${T[V(c + 1, 12)]}`}
          className="min-h-12 rounded-full border-2 border-line bg-paper px-3 py-2 font-semibold text-ink-2 transition hover:border-moss hover:text-moss active:scale-95 sm:px-4"
        >
          {z[V(c + 1, 12)]}
          {" ›"}
        </button>
      </div>
      {P > 0 && (
        <div className="mt-6">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <p className="eyebrow">
              {"Ready in "}
              {T[c]}
              {" — tap one to learn it"}
            </p>
            {S > 0 && (
              <p className="flex items-center gap-2 text-sm text-ink-2">
                <span
                  className="inline-block h-4 w-4 rounded-full border-2 border-white bg-paper-2"
                  style={{
                    boxShadow: "0 0 0 2.5px #c8352b",
                  }}
                  aria-hidden="true"
                />
                Red ring: has a dangerous look-alike — learn it first
              </p>
            )}
          </div>
          <div className="mt-3 grid gap-3">
            {A.map((e) => {
              let t = B(e.kind);
              return (
                <div key={e.kind}>
                  <p className="flex items-center gap-2 text-sm font-semibold text-ink">
                    <span
                      className="inline-block h-3 w-3 rounded-full"
                      style={{
                        background: t.dot,
                      }}
                      aria-hidden="true"
                    />
                    {t.label}
                    <span className="font-normal text-ink-2">
                      {"· "}
                      {e.items.length}
                    </span>
                  </p>
                  <ul className="mt-1.5 flex flex-wrap gap-1.5">
                    {e.items.map((e) => (
                      <li key={e.slug}>
                        <a
                          href={`/foraging/${e.slug}`}
                          className="inline-flex min-h-10 items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-sm font-medium text-ink transition hover:border-moss hover:text-moss"
                          style={{
                            background: t.tint,
                          }}
                        >
                          {e.deadlyDouble && (
                            <span className="inline-block h-2.5 w-2.5 shrink-0 rounded-full border-2 border-rust" aria-hidden="true" />
                          )}
                          {e.name}
                          {e.deadlyDouble && <span className="sr-only">{" (has a dangerous look-alike — learn it first)"}</span>}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      )}
      <p className="mt-5 text-sm leading-relaxed text-ink-2">
        Typical months for the middle of each range — a warm south or a cold north shifts them by a few weeks. Ready doesn’t mean safe: be
        sure of every plant and mushroom, and check it with a field guide or an expert before you eat anything wild.
      </p>
    </div>
  );
}
export const LakeCaption = function () {
  let e = (0, a.useHere)();
  return e.place && e.region ? (
    <p className="mt-3 text-sm text-ink-2">
      {"The diagram shows a typical northern lake. Around "}
      <span className="font-semibold text-ink">{e.town}</span>
      {", in "}
      {(0, l.theRegion)(e.region.name)}, the fish marked <span className="font-semibold text-moss">in your region</span>
      {" below are the species present locally."}
    </p>
  ) : null;
};
export const RockInTheLoop = function () {
  let e = (0, a.useHere)();
  return e.place && e.rock ? (
    <p className="mt-3 text-sm text-ink-2">
      {"The geologic map shows the bedrock under "}
      <span className="font-semibold text-ink">{e.town}</span>
      {" as"}{" "}
      <et.default href={`/ground/rocks/${e.rock.slug}`} className="font-semibold text-moss hover:underline">
        {e.rock.name.toLowerCase()}
      </et.default>
      {e.rock.unit ? ` (${e.rock.unit})` : ""}. Its place in the cycle is shown above.
    </p>
  ) : null;
};
export const SpinTheYearHere = function ({ species: e, startMonth: t }) {
  let r = (0, a.useHere)(),
    ctx = useRegion(),
    l = r.region?.slug,
    // South of the equator the library's months are read six months round for species shared with the north
    // (libraryMonth's rule), so the wheel's months are turned into the reader's own calendar before filtering.
    n = l
      ? e
          .filter((e) => "all" === e.regions || e.regions.includes(l))
          .map((e) => (ecoregions.libraryMonth(1, l, e.regions) === 1 ? e : { ...e, months: e.months.map((m) => ((m + 5) % 12) + 1) }))
      : e;
  return (
    <CEe_
      key={l ?? "all"}
      species={n}
      startMonth={r.month || t}
      placeLabel={l ? `Near ${r.town} \xb7 ${r.region.name}` : "Canada and the United States"}
      captions={yearCaptions(ctx, R)}
    />
  );
};
export const WillItSproutHere = function () {
  let e = (0, a.useHere)();
  return <Z key={e.soilC ?? "none"} soilC={e.soilC ?? undefined} place={null != e.soilC ? (e.town ?? undefined) : undefined} />;
};
