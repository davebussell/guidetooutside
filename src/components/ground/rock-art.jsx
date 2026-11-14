"use client";
// Restored from client module 730 (exports: RockSpecimen, RockTexture, STAR, darken, heapD, hsl, lighten, mix, r1, seedOf, seeded, smoothClosed, texturePalette)
import * as s from "react";
function r(e) {
  let t = Math.abs(Math.floor(e)) % 233280;
  return () => (t = (9301 * t + 49297) % 233280) / 233280;
}
let l = (e) => Math.round(10 * e) / 10;
function i(e) {
  let t = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(e.trim());
  if (!t) return [128, 128, 128];
  let s = t[1];
  3 === s.length &&
    (s = s
      .split("")
      .map((e) => e + e)
      .join(""));
  let r = parseInt(s, 16);
  return [(r >> 16) & 255, (r >> 8) & 255, 255 & r];
}
function a(e) {
  return (
    "#" +
    e
      .map((e) =>
        Math.max(0, Math.min(255, Math.round(e)))
          .toString(16)
          .padStart(2, "0"),
      )
      .join("")
  );
}
function o(e, t, s) {
  let r = i(e),
    l = i(t),
    o = s < 0 ? 0 : s > 1 ? 1 : s;
  return a(r.map((e, t) => e + (l[t] - e) * o));
}
let n = (e, t) => o(e, "#ffffff", t),
  d = (e, t) => o(e, "#000000", t);
function c(e) {
  let [t, s, r] = i(e).map((e) => e / 255),
    l = Math.max(t, s, r),
    a = Math.min(t, s, r),
    o = (l + a) / 2;
  if (l === a) return [0, 0, o];
  let n = l - a,
    d = l === t ? (s - r) / n + 6 * (s < r) : l === s ? (r - t) / n + 2 : (t - s) / n + 4;
  return [(d *= 60), o > 0.5 ? n / (2 - l - a) : n / (l + a), o];
}
function h(e, t) {
  switch (e) {
    case "speckled":
      return [
        (function (e) {
          var t;
          let s,
            r,
            l,
            i,
            [o, n, d] = c(e);
          return (
            (t = Math.min(1, 1.3 * n)),
            (s = d < 0.5 ? d * (1 + t) : d + t - d * t),
            (r = 2 * d - s),
            a(
              [
                (l = (e) => {
                  let t = e;
                  return (t < 0 && (t += 1), t > 1 && (t -= 1), t < 1 / 6)
                    ? r + (s - r) * 6 * t
                    : t < 0.5
                      ? s
                      : t < 2 / 3
                        ? r + (s - r) * (2 / 3 - t) * 6
                        : r;
                })((i = o / 360) + 1 / 3),
                l(i),
                l(i - 1 / 3),
              ].map((e) => 255 * e),
            )
          );
        })(d(t, 0.06)),
        n(t, 0.6),
        o(t, "#9aa0a6", 0.5),
        o(t, "#1d1b1e", 0.88),
      ];
    case "banded":
      return [n(t, 0.6), o(n(t, 0.45), "#e3b7a4", 0.35), o(t, "#1f2024", 0.78), o(t, "#2e3a2f", 0.6)];
    case "dark":
      return [t, n(t, 0.18), d(t, 0.3), o(t, "#5f6b5a", 0.35)];
    case "grainy":
      return [n(t, 0.3), d(t, 0.12), o(t, "#f3eee3", 0.55), o(t, "#a8562e", 0.3)];
    case "layered":
      return [t, n(t, 0.1), d(t, 0.12), d(t, 0.2)];
    case "sugary":
      return [t, n(t, 0.2), n(t, 0.4), d(t, 0.06)];
    case "sheeted":
      return [t, n(t, 0.14), d(t, 0.16), n(t, 0.35)];
    case "chalky":
      return [t, d(t, 0.04), n(t, 0.3), d(t, 0.1)];
    case "bubbly":
      return [t, n(t, 0.15), d(t, 0.12), d(t, 0.3)];
    case "pebbly":
      return [t, "#8d8a86", "#c9b8a6", "#5b5550", "#a4735a", "#e9e4dc"];
  }
}
let f = "M0 -1 L0.26 -0.26 L1 0 L0.26 0.26 L0 1 L-0.26 0.26 L-1 0 L-0.26 -0.26Z";
function x(e, s, r, i, a, o, n) {
  return (
    <g key={e} transform={`translate(${l(s)} ${l(r)}) scale(${l(i)})`}>
      <g
        className={o}
        style={
          undefined !== n
            ? {
                animationDelay: `${n.toFixed(2)}s`,
              }
            : undefined
        }
      >
        <path d={f} fill={a} />
      </g>
    </g>
  );
}
function p(e, t, s = 12) {
  let r = [];
  for (let e = -60 - s; e <= 60 + s; e += s) r.push(e);
  let i = `M${r[0]} ${l(e(r[0]))}`;
  for (let t = 1; t < r.length; t++) i += `L${r[t]} ${l(e(r[t]))}`;
  for (let e = r.length - 1; e >= 0; e--) i += `L${r[e]} ${l(t(r[e]))}`;
  return i + "Z";
}
function u(e, t = 12) {
  let s = "";
  for (let r = -60 - t; r <= 60 + t; r += t) s += `${s ? "L" : "M"}${r} ${l(e(r))}`;
  return s;
}
let m = (e) => <rect key="ground" x={-60} y={-60} width={120} height={120} fill={e} />,
  y = (e, s, r) => {
    let [i, a, o, n] = h("speckled", s),
      c = [m(d(s, 0.25))],
      f = "hi" === r ? 13 : 8,
      x = 120 / f;
    for (let s = 0; s < f; s++)
      for (let r = 0; r < f; r++) {
        let h = -60 + (r + 0.5 + (e() - 0.5) * 0.7) * x,
          p = -60 + (s + 0.5 + (e() - 0.5) * 0.7) * x,
          u = e(),
          m = i,
          y = 0.72;
        u < 0.4 ? ([m, y] = [i, 0.78]) : u < 0.64 ? ([m, y] = [a, 0.7]) : u < 0.84 ? ([m, y] = [o, 0.66]) : ([m, y] = [n, 0.5]);
        let g = e() * Math.PI,
          j = 5 + Math.floor(2 * e()),
          b = 0.75 + 0.5 * e(),
          k = "";
        for (let t = 0; t < j; t++) {
          let s = g + (2 * t * Math.PI) / j + (e() - 0.5) * 0.5,
            r = x * y * (0.8 + 0.35 * e());
          k += `${l(h + r * Math.cos(s) * b)},${l(p + r * Math.sin(s))} `;
        }
        c.push(<polygon key={r + s * f} points={k.trim()} fill={m} stroke={d(m, 0.25)} strokeWidth={0.5} strokeOpacity={0.6} />);
      }
    return c;
  };
function g(e, t, s, r, l) {
  let i = [];
  for (let a = 0; a < 9; a++) {
    let o = (a / 9) * Math.PI * 2,
      n = 0.75 + 0.4 * e();
    i.push([t + Math.cos(o) * r * n, s + Math.sin(o) * l * n]);
  }
  return j(i);
}
function j(e) {
  let t = e.length,
    s = (s) => {
      let r = e[s % t],
        i = e[(s + 1) % t];
      return [l((r[0] + i[0]) / 2), l((r[1] + i[1]) / 2)];
    },
    r = s(0),
    i = `M${r[0]} ${r[1]}`;
  for (let r = 1; r <= t; r++) {
    let a = e[r % t],
      o = s(r);
    i += ` Q${l(a[0])} ${l(a[1])} ${o[0]} ${o[1]}`;
  }
  return i + "Z";
}
let b = ["#8d8a86", "#c9b8a6", "#5b5550", "#d9c9b1", "#a4735a", "#e9e4dc", "#6f7a74", "#b58a78"],
  k = {
    speckled: y,
    dark: (e, s, r) => {
      let [, i, a, o] = h("dark", s),
        c = [m(s)],
        f = "hi" === r ? 230 : 60;
      for (let s = 0; s < f; s++) {
        let r = e();
        c.push(
          <circle
            key={`d${s}`}
            cx={l(-60 + 2 * e() * 60)}
            cy={l(-60 + 2 * e() * 60)}
            r={l(0.5 + 0.9 * e())}
            fill={r < 0.4 ? i : r < 0.8 ? a : o}
            opacity={0.85}
          />,
        );
      }
      let x = "hi" === r ? 26 : 8;
      for (let r = 0; r < x; r++) {
        let i = -60 + 2 * e() * 60,
          a = -60 + 2 * e() * 60;
        c.push(
          <rect
            key={`l${r}`}
            x={l(i - 1.6)}
            y={l(a - 0.4)}
            width={3.2}
            height={0.8}
            fill={n(s, 0.4)}
            opacity={0.7}
            transform={`rotate(${l(180 * e())} ${l(i)} ${l(a)})`}
          />,
        );
      }
      let p = "hi" === r ? 8 : 4;
      for (let r = 0; r < p; r++) {
        let i = -44 + 88 * e(),
          a = -36 + 72 * e(),
          o = 2 + 3.5 * e(),
          n = o * (0.7 + 0.25 * e());
        c.push(
          <g key={`h${r}`}>
            <ellipse cx={l(i)} cy={l(a)} rx={l(o)} ry={l(n)} fill={d(s, 0.55)} />
            <ellipse cx={l(i)} cy={l(a + 0.32 * n)} rx={l(0.72 * o)} ry={l(0.5 * n)} fill={d(s, 0.2)} />
          </g>,
        );
      }
      return c;
    },
    grainy: (e, s, r) => {
      let i = [...h("grainy", s), s],
        a = [m(s)],
        o = "hi" === r ? 240 : 70;
      for (let s = 0; s < o; s++)
        a.push(
          <circle
            key={s}
            cx={l(-60 + 2 * e() * 60)}
            cy={l(-60 + 2 * e() * 60)}
            r={l(1.3 + 1.4 * e())}
            fill={i[Math.floor(e() * i.length)]}
            opacity={0.95}
          />,
        );
      let n = d(s, 0.3);
      [-30, -4, 24].forEach((s, r) => {
        let l = 4 * e() - 2;
        a.push(
          <path key={`b${r}`} d={u((e) => s + l + 1.6 * Math.sin(e / 23 + r))} fill="none" stroke={n} strokeWidth={1.3} opacity={0.35} />,
        );
      });
      for (let e = 0; e < 5; e++) {
        let s = -40 + 18 * e;
        a.push(<path key={`x${e}`} d={`M${s} -5 Q${s + 9} 6 ${s + 16} 22`} fill="none" stroke={n} strokeWidth={1} opacity={0.25} />);
      }
      return a;
    },
    layered: (e, s, r, i) => {
      let a = h("layered", s),
        o = [],
        c = [-68];
      for (; c[c.length - 1] < 68;) c.push(c[c.length - 1] + ("hi" === r ? 5 : 8) + 9 * e());
      let f = 6 * e(),
        x = (e) => (t) => c[e] + 1.3 * Math.sin(t / 17 + 0.9 * e + f);
      for (let s = 0; s < c.length - 1; s++) o.push(<path key={`b${s}`} d={p(x(s), x(s + 1))} fill={a[Math.floor(e() * a.length)]} />);
      for (let e = 1; e < c.length - 1; e++)
        o.push(<path key={`p${e}`} d={u(x(e))} fill="none" stroke={d(s, 0.32)} strokeWidth={0.7} opacity={0.5} />);
      let m = "hi" === r ? 70 : 18;
      for (let r = 0; r < m; r++)
        o.push(
          <circle
            key={`s${r}`}
            cx={l(-60 + 2 * e() * 60)}
            cy={l(-60 + 2 * e() * 60)}
            r={l(0.5 + 0.6 * e())}
            fill={d(s, 0.35)}
            opacity={0.4}
          />,
        );
      if (i.shells) {
        let i = n(s, 0.55),
          a = d(s, 0.15);
        for (let s = 0; s < ("hi" === r ? 7 : 4); s++) {
          let r = -40 + 80 * e(),
            n = -30 + 60 * e(),
            d = 0.8 + 0.7 * e();
          o.push(
            <g key={`f${s}`} transform={`translate(${l(r)} ${l(n)}) rotate(${l(60 * e() - 30)}) scale(${l(d)})`}>
              <path d="M-7 3 Q-7 -6 0 -7 Q7 -6 7 3 Q0 5 -7 3Z" fill={i} stroke={a} strokeWidth={0.6} />
              <path d="M0 4 L0 -6 M-3.5 4 L-5 -4 M3.5 4 L5 -4" stroke={a} strokeWidth={0.5} fill="none" />
            </g>,
          );
        }
      }
      return o;
    },
    banded: (e, s, r, i) => {
      let [a, o, n, d] = h("banded", s),
        c = [],
        f = 6 + 3 * e(),
        x = 100 + 30 * e(),
        u = 6 * e(),
        m = [-80],
        y = 0.5 > e(),
        g = [];
      for (; m[m.length - 1] < 80;) {
        let t = y ? 7 + 9 * e() : 4 + 6 * e();
        (m.push(m[m.length - 1] + t), g.push(y ? (0.5 > e() ? a : o) : 0.8 > e() ? n : d), (y = !y));
      }
      let j = (e) => (t) =>
        m[e] +
        (f * Math.sin((2 * Math.PI * (t + 60)) / x + u) + 2.2 * Math.sin((2 * Math.PI * t) / 37 + 2 * u)) +
        0.8 * Math.sin(t / 11 + e);
      for (let e = 0; e < m.length - 1; e++) c.push(<path key={`b${e}`} d={p(j(e), j(e + 1), 8)} fill={g[e]} />);
      let b = "hi" === r ? 90 : 24;
      for (let s = 0; s < b; s++) {
        let r = e();
        c.push(
          <circle
            key={`s${s}`}
            cx={l(-60 + 2 * e() * 60)}
            cy={l(-60 + 2 * e() * 60)}
            r={l(0.6 + 0.9 * e())}
            fill={r < 0.5 ? n : a}
            opacity={0.55}
          />,
        );
      }
      if (i.garnets)
        for (let s = 0; s < ("hi" === r ? 8 : 4); s++) {
          let r = -42 + 84 * e(),
            i = -32 + 64 * e(),
            a = 2 + 1.6 * e();
          c.push(
            <g key={`g${s}`}>
              <circle cx={l(r)} cy={l(i)} r={l(a)} fill="#8b2e2a" />
              <circle cx={l(r - 0.3 * a)} cy={l(i - 0.3 * a)} r={l(0.35 * a)} fill="#d0675a" />
            </g>,
          );
        }
      return c;
    },
    sugary: (e, s, r, i, a) => {
      let d = [m(s)],
        c = "hi" === r ? 12 : 7,
        h = 120 / c,
        f = n(s, 0.38);
      for (let r = 0; r < c; r++)
        for (let i = 0; i < c; i++) {
          let a = -60 + (r + 0.5 + (e() - 0.5) * 0.5) * h,
            n = -60 + (i + 0.5 + (e() - 0.5) * 0.5) * h,
            c = e() * Math.PI,
            x = "";
          for (let t = 0; t < 6; t++) {
            let s = c + (t * Math.PI) / 3,
              r = 0.62 * h * (0.85 + 0.25 * e());
            x += `${l(a + r * Math.cos(s))},${l(n + r * Math.sin(s))} `;
          }
          let p = 0.55 > e() ? o(s, "#ffffff", 0.22 * e()) : o(s, "#000000", 0.07 * e());
          d.push(<polygon key={`c${r}-${i}`} points={x.trim()} fill={p} stroke={f} strokeWidth={0.5} strokeOpacity={0.7} />);
        }
      let p = o(s, "#6e7078", 0.5),
        u = -20 + 40 * e();
      d.push(
        <path
          key="v1"
          d={`M-62 ${l(u)} C-30 ${l(u - 14)} -10 ${l(u + 18)} 20 ${l(u + 4)} S50 ${l(u - 10)} 64 ${l(u + 6)}`}
          fill="none"
          stroke={p}
          strokeWidth={1.3}
          opacity={0.35}
        />,
      );
      let y = "hi" === r ? 12 : 5;
      for (let t = 0; t < y; t++) d.push(x(`g${t}`, -50 + 100 * e(), -40 + 80 * e(), 1.6 + 1.4 * e(), "#ffffff", a, 2 * e()));
      return d;
    },
    sheeted: (e, s, r, l, i) => {
      let [, a, o, n] = h("sheeted", s),
        d = [],
        c = "hi" === r ? 3 : 5,
        f = 6 * e(),
        p = 0;
      for (let e = -80; e <= 80; e += c) {
        let s = e,
          r = l.glitter ? 2.2 : 0.8;
        (d.push(
          <path
            key={`l${p}`}
            d={u((e) => s + r * Math.sin(e / 13 + 0.35 * p + f), 10)}
            fill="none"
            stroke={p % 2 ? a : o}
            strokeWidth={1.2}
            opacity={0.75}
          />,
        ),
          p++);
      }
      let y = [
          m(s),
          <g key="sheets" transform="rotate(-12)">
            {d}
            <rect x={-80} y={-9} width={160} height={18} fill={n} opacity={l.glitter ? 0.3 : 0.16} />
          </g>,
        ],
        g = l.glitter ? ("hi" === r ? 26 : 10) : "hi" === r ? 5 : 2;
      for (let t = 0; t < g; t++)
        y.push(x(`g${t}`, -50 + 100 * e(), -40 + 80 * e(), l.glitter ? 2 + 1.8 * e() : 1.4 + e(), "#fffbe8", i, 2 * e()));
      return y;
    },
    chalky: (e, s, r) => {
      let [, i, a, o] = h("chalky", s),
        n = [m(s)];
      for (let s = 0; s < ("hi" === r ? 18 : 7); s++)
        n.push(
          <circle
            key={`b${s}`}
            cx={l(-60 + 2 * e() * 60)}
            cy={l(-60 + 2 * e() * 60)}
            r={l(5 + 11 * e())}
            fill={0.6 > e() ? i : a}
            opacity={0.7}
          />,
        );
      for (let s = 0; s < ("hi" === r ? 55 : 14); s++)
        n.push(
          <circle key={`s${s}`} cx={l(-60 + 2 * e() * 60)} cy={l(-60 + 2 * e() * 60)} r={l(0.5 + 0.5 * e())} fill={o} opacity={0.5} />,
        );
      let d = -18 + 30 * e(),
        c = -10 + 24 * e();
      return (
        n.push(<path key="f1" d={g(e, d, c, 13, 9)} fill="#cfcac0" />),
        n.push(<path key="f2" d={g(e, d, c, 10.5, 7)} fill="#3b3b41" />),
        n.push(
          <path key="f3" d={`M${l(d - 5)} ${l(c - 2)} q4 -3 8 -1`} fill="none" stroke="#7d7e86" strokeWidth={1} strokeLinecap="round" />,
        ),
        n
      );
    },
    bubbly: (e, s, r) => {
      let i = [m(s)],
        a = 10 + 20 * e();
      for (let o = 0; o < ("hi" === r ? 26 : 8); o++) {
        let r = -60 + 2 * e() * 60,
          d = -60 + 2 * e() * 60;
        i.push(
          <rect
            key={`f${o}`}
            x={l(r - 7)}
            y={l(d - 0.5)}
            width={14}
            height={1}
            fill={n(s, 0.25)}
            opacity={0.5}
            transform={`rotate(${l(a)} ${l(r)} ${l(d)})`}
          />,
        );
      }
      let o = "hi" === r ? 75 : 24;
      for (let r = 0; r < o; r++) {
        let o = -60 + 2 * e() * 60,
          n = -60 + 2 * e() * 60,
          c = 1 + e() * e() * 5.5,
          h = c * (0.5 + 0.4 * e()),
          f = l(a + 40 * e() - 20);
        i.push(
          <g key={`h${r}`} transform={`translate(${l(o)} ${l(n)}) rotate(${f})`}>
            <ellipse rx={l(c)} ry={l(h)} fill={d(s, 0.34)} />
            <ellipse cy={l(0.3 * h)} rx={l(0.72 * c)} ry={l(0.55 * h)} fill={d(s, 0.13)} />
          </g>,
        );
      }
      return i;
    },
    pebbly: (e, s, r) => {
      let i = [m(s)];
      for (let a = 0; a < ("hi" === r ? 140 : 36); a++)
        i.push(
          <circle
            key={`s${a}`}
            cx={l(-60 + 2 * e() * 60)}
            cy={l(-60 + 2 * e() * 60)}
            r={l(0.6 + 0.7 * e())}
            fill={0.5 > e() ? n(s, 0.25) : d(s, 0.22)}
            opacity={0.8}
          />,
        );
      let a = [],
        c = "hi" === r ? 18 : 10,
        h = 0;
      for (; a.length < c && h++ < 400;) {
        let r = 4 + 10 * e(),
          c = -54 + 108 * e(),
          h = -44 + 88 * e();
        if (a.some(([e, t, s]) => Math.hypot(e - c, t - h) < s + 0.9 * r)) continue;
        a.push([c, h, r]);
        let f = r * (0.6 + 0.3 * e()),
          x = o(b[Math.floor(e() * b.length)], s, 0.15);
        i.push(
          <g key={`p${a.length}`} transform={`translate(${l(c)} ${l(h)}) rotate(${l(180 * e())})`}>
            <ellipse rx={l(r)} ry={l(f)} fill={x} stroke={d(x, 0.35)} strokeWidth={0.6} />
            <ellipse cx={l(-(0.3 * r))} cy={l(-(0.35 * f))} rx={l(0.35 * r)} ry={l(0.25 * f)} fill={n(x, 0.4)} opacity={0.55} />
          </g>,
        );
      }
      return i;
    },
  };
function $({ texture: e, swatch: s, seed: l = 1, detail: i = "hi", extras: a, glintClass: o }) {
  let n = r(17 * l + 3),
    d = k[e] ?? y;
  return <g>{d(n, s, i, a ?? {}, o)}</g>;
}
function w(e) {
  let t = r(13 * e + 5),
    s = [];
  for (let e = 0; e <= 8; e++) {
    let r = e / 8,
      l = -58 + 116 * r,
      i = 30 - 64 * Math.sin(Math.PI * r) ** 0.8 + (e > 0 && e < 8 ? (t() - 0.5) * 7 : 0);
    s.push([l, i]);
  }
  let i = `M-60 32 L${l(s[0][0])} ${l(s[0][1])}`;
  for (let e = 1; e < s.length; e++) {
    let [t, r] = s[e - 1],
      [a, o] = s[e];
    i += ` Q${l(t + (a - t) * 0.5)} ${l(Math.min(r, o) - 3)} ${l(a)} ${l(o)}`;
  }
  return i + " L60 32Z";
}
export const RockSpecimen = function ({
  texture: e,
  swatch: l,
  seed: i = 1,
  r: a = 44,
  detail: o = "hi",
  extras: n,
  heap: c = false,
  glintClass: h,
  shade: f = true,
}) {
  let x = "rs" + (0, s.useId)().replace(/[^a-zA-Z0-9]/g, ""),
    p = c
      ? w(i)
      : (function (e) {
          let t = r(31 * e + 11),
            s = [];
          for (let e = 0; e < 12; e++) {
            let r = ((e + (t() - 0.5) * 0.35) / 12) * Math.PI * 2,
              l = 0.93 + 0.09 * t();
            s.push([56 * l * Math.cos(r), 44 * l * Math.sin(r)]);
          }
          return j(s);
        })(i),
    u = Math.round((a / 44) * 1e3) / 1e3;
  return (
    <g transform={`scale(${u})`}>
      <defs>
        <clipPath id={`${x}c`}>
          <path d={p} />
        </clipPath>
        <radialGradient id={`${x}l`} cx="36%" cy="28%" r="78%">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.3" />
          <stop offset="0.45" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="0.8" stopColor="#000000" stopOpacity="0.12" />
          <stop offset="1" stopColor="#000000" stopOpacity="0.3" />
        </radialGradient>
      </defs>
      <g clipPath={`url(#${x}c)`}>
        <$ texture={e} swatch={l} seed={i} detail={o} extras={n} glintClass={h} />
        {f && <rect x={-62} y={-50} width={124} height={100} fill={`url(#${x}l)`} />}
      </g>
      <path d={p} fill="none" stroke={d(l, 0.55)} strokeOpacity={0.8} strokeWidth={1.5} vectorEffect="non-scaling-stroke" />
    </g>
  );
};
export { $ as RockTexture };
export { f as STAR };
export { d as darken };
export { w as heapD };
export { c as hsl };
export { n as lighten };
export { o as mix };
export { l as r1 };
export const seedOf = function (e) {
  let t = 7;
  for (let s = 0; s < e.length; s++) t = (31 * t + e.charCodeAt(s)) % 100003;
  return t;
};
export { r as seeded };
export { j as smoothClosed };
export { h as texturePalette };
