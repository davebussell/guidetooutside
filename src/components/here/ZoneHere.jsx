"use client";
// Restored from client module 22864 (exports: ColdestNightForYou, YourZoneBanner, ZoneBand, ZoneRange)
import * as s from "react/jsx-runtime";
import * as o from "next/link";
import * as t from "react";
import * as l from "@/lib/hooks";
import _m1_json from "@/data/place-zones.json";
const _m1 = { default: _m1_json };
let n, a, r;
let i = _m1.default,
  c = new Map();
function d() {
  let e = (0, l.usePlace)(),
    n = e?.slug ?? null,
    a = n ? i[n] : undefined,
    [r, s] = (0, t.useState)(null);
  if (
    ((0, t.useEffect)(() => {
      if (!e || a || c.has(e.slug)) return;
      let n = false,
        r = e.slug;
      return (
        fetch(`/api/zone?lat=${e.lat.toFixed(4)}&lon=${e.lon.toFixed(4)}`)
          .then((e) => (e.ok ? e.json() : null))
          .then((e) => {
            let a = e?.zone
              ? {
                  zone: e.zone,
                  zoneNumber: e.zoneNumber,
                  minC: e.minC ?? null,
                  minBasis: e.minBasis ?? null,
                  minStation: e.minStation ?? null,
                  source: e.source ?? "estimated",
                }
              : {
                  zone: null,
                  zoneNumber: null,
                  minC: null,
                  source: null,
                };
            (c.set(r, a),
              n ||
                s({
                  slug: r,
                  value: a,
                }));
          })
          .catch(() => {
            n ||
              s({
                slug: r,
                value: {
                  zone: null,
                  zoneNumber: null,
                  minC: null,
                  source: null,
                },
              });
          }),
        () => {
          n = true;
        }
      );
    }, [e, a]),
    !e)
  )
    return {
      place: null,
      zone: null,
      zoneNumber: null,
      minC: null,
      source: null,
      loading: false,
    };
  if (a)
    return {
      place: e,
      zone: a.zone,
      zoneNumber: Number.parseInt(a.zone, 10),
      minC: null,
      source: a.source,
      loading: false,
    };
  let o = c.get(e.slug) ?? (r?.slug === e.slug ? r.value : null);
  return o
    ? {
        place: e,
        ...o,
        loading: false,
      }
    : {
        place: e,
        zone: null,
        zoneNumber: null,
        minC: null,
        source: null,
        loading: true,
      };
}
/** The remembered place's zone: `{ place, zone, zoneNumber, minC, source, loading }` (src/components/zones/ZoneContext uses it). */
export const useZoneHere = d;
let u = (e, n, a) => (e < n ? n : e > a ? a : e),
  h = (e) => Math.round(10 * e) / 10,
  f = (e) => ((e - 32) * 5) / 9,
  x = (e) => (e < 0 ? `−${Math.abs(e)}` : `${e}`);
function m(e) {
  let n = u(Math.floor((e + 60) / 10) + 1, 1, 13),
    a = -60 + (n - 1) * 10,
    r = e - a < 5 ? "a" : "b",
    s = a + 5 * ("b" === r);
  return {
    n,
    half: r,
    label: `${n}${r}`,
    lo: s,
    hi: s + 5,
  };
}
function p(e) {
  let n = /^(\d{1,2})([ab])$/i.exec(e.trim());
  if (!n) return null;
  let a = Number(n[1]);
  return a < 1 || a > 13 ? null : -60 + (a - 1) * 10 + 5 * ("b" === n[2].toLowerCase());
}
let b = [
    "#c5b3e3",
    "#a99be6",
    "#8fa9ec",
    "#7cc2e6",
    "#72d2c2",
    "#86d58f",
    "#b9dc70",
    "#e2da5e",
    "#f2c452",
    "#f4a44c",
    "#ef844c",
    "#e5654f",
    "#cf4f5a",
  ],
  g = [
    {
      id: "aspen",
      name: "Quaking aspen",
      many: "quaking aspens",
      plural: true,
      zone: "1a",
      leaves: "deciduous",
      row: "back",
      x: 226,
      w: 110,
      h: 215,
    },
    {
      id: "spruce",
      name: "White spruce",
      many: "white spruce",
      plural: false,
      zone: "2a",
      leaves: "evergreen",
      row: "back",
      x: 330,
      w: 104,
      h: 216,
    },
    {
      id: "lilac",
      name: "Common lilac",
      many: "lilacs",
      plural: true,
      zone: "3a",
      leaves: "deciduous",
      row: "front",
      x: 268,
      w: 96,
      h: 92,
    },
    {
      id: "maple",
      name: "Sugar maple",
      many: "sugar maples",
      plural: true,
      zone: "3a",
      leaves: "deciduous",
      row: "back",
      x: 448,
      w: 200,
      h: 262,
    },
    {
      id: "apple",
      name: "Apple tree",
      many: "apple trees",
      plural: true,
      zone: "4a",
      leaves: "deciduous",
      row: "back",
      x: 558,
      w: 150,
      h: 150,
    },
    {
      id: "lavender",
      name: "English lavender",
      many: "lavender",
      plural: false,
      zone: "5a",
      leaves: "evergreen",
      row: "front",
      x: 396,
      w: 84,
      h: 56,
    },
    {
      id: "fig",
      name: "Common fig",
      many: "figs",
      plural: true,
      zone: "7a",
      leaves: "deciduous",
      row: "back",
      x: 648,
      w: 110,
      h: 120,
    },
    {
      id: "rosemary",
      name: "Rosemary",
      many: "rosemary",
      plural: false,
      zone: "8a",
      leaves: "evergreen",
      row: "front",
      x: 530,
      w: 70,
      h: 84,
    },
    {
      id: "lemon",
      name: "Lemon tree",
      many: "lemon trees",
      plural: true,
      zone: "9a",
      leaves: "evergreen",
      row: "back",
      x: 736,
      w: 100,
      h: 136,
    },
    {
      id: "bird",
      name: "Bird of paradise",
      many: "bird of paradise",
      plural: false,
      zone: "10a",
      leaves: "evergreen",
      row: "front",
      x: 668,
      w: 90,
      h: 96,
    },
  ],
  z = (e, n) => n >= (p(e.zone) ?? -60);
function y(e) {
  let n = e;
  return () => (n = (9301 * n + 49297) % 233280) / 233280;
}
function j(e) {
  let n = parseInt(e.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, 255 & n];
}
function k(e, n, a) {
  let r = j(e),
    s = j(n),
    o = u(a, 0, 1);
  return `rgb(${r.map((e, n) => Math.round(e + (s[n] - e) * o)).join(",")})`;
}
function w(e, n, a, r, s, o, t, l, i) {
  let c = y(e),
    d = [],
    u = [],
    f = (e, n, a, r, s, o) => {
      let t = (r * Math.PI) / 180,
        x = e + Math.cos(t) * a,
        m = n + Math.sin(t) * a;
      if (
        (d.push({
          x1: h(e),
          y1: h(n),
          x2: h(x),
          y2: h(m),
          w: h(o),
        }),
        0 === s)
      )
        return void u.push({
          x: h(x),
          y: h(m),
        });
      let p = c() > 0.62 ? 3 : 2;
      for (let e = 0; e < p; e++) {
        let n = (e - (p - 1) / 2) * l + (c() - 0.5) * 18;
        f(x, m, a * (i + 0.12 * c()), r + n, s - 1, Math.max(1, 0.62 * o));
      }
    };
  return (
    f(n, a, r, s, o, t),
    {
      segs: d,
      tips: u,
    }
  );
}
let v = {
    aspen: w(3, 0, -104, 30, -90, 4, 5, 24, 0.74),
    maple: w(7, 0, -78, 44, -90, 5, 11, 32, 0.74),
    apple: w(12, 0, -42, 30, -90, 4, 9, 46, 0.78),
    fig: [w(21, -3, 0, 36, -104, 3, 7, 30, 0.72), w(22, 0, 0, 44, -88, 3, 8, 26, 0.74), w(23, 3, 0, 34, -72, 3, 7, 30, 0.72)],
    lilac: [-116, -104, -94, -84, -74, -64].map((e, n) => w(31 + n, (n - 2.5) * 3, 0, 38 + (n % 3) * 5, e, 2, 4, 22, 0.7)),
  },
  $ = [
    [-2, -18],
    [2, -46],
    [-1.5, -70],
    [2, -92],
  ],
  N =
    ((n = y(51)),
    [-104, -98, -93, -88, -83, -78, -72].map((e) => {
      let a = 58 + 22 * n(),
        r = (e * Math.PI) / 180,
        s = Math.cos(r),
        o = Math.sin(r),
        t = (e + 88) * 0.25,
        l = [];
      for (let e = 10; e < a; e += 6) {
        let n = t + s * e,
          r = o * e,
          i = 7 - (e / a) * 3;
        (l.push({
          x1: h(n),
          y1: h(r),
          x2: h(n - o * i + 2 * s),
          y2: h(r + s * i + 2 * o),
          w: 2,
        }),
          l.push({
            x1: h(n),
            y1: h(r),
            x2: h(n + o * i + 2 * s),
            y2: h(r - s * i + 2 * o),
            w: 2,
          }));
      }
      return {
        x0: h(t),
        x2: h(t + s * a),
        y2: h(o * a),
        needles: l,
      };
    })),
  L = Array.from(
    {
      length: 15,
    },
    (e, n) => {
      let a = ((-150 + (120 / 14) * n) * Math.PI) / 180,
        r = 44 + (n % 4) * 4;
      return {
        x: h(Math.cos(a) * r),
        y: h(Math.sin(a) * r * 0.95),
      };
    },
  ),
  M =
    ((a = y(77)),
    Array.from(
      {
        length: 70,
      },
      () => ({
        x: h(172 + 624 * a()),
        y: h(8 + 290 * a()),
        r: h(0.8 + 1.8 * a()),
        tw: a() > 0.62,
        d: h(3 * a()),
      }),
    )),
  C =
    ((r = y(88)),
    Array.from(
      {
        length: 70,
      },
      () => ({
        x: h(172 + 624 * r()),
        y: h(392 + 124 * r()),
        r: h(0.8 + 1.6 * r()),
        k: r(),
      }),
    )),
  W = (() => {
    let e = y(99),
      n = [],
      a = (a, r, s, o) => {
        let t = 34 + 52 * e(),
          l = `M0 0 L${h(t)} 0`;
        for (let n = 7; n < t - 4; n += 7) {
          let a = (1 - n / t) * (10 + 8 * e());
          l += ` M${h(n)} 0 l${h(0.6 * a)} ${h(-(0.8 * a))} M${h(n)} 0 l${h(0.6 * a)} ${h(0.8 * a)}`;
        }
        n.push({
          x: h(a),
          y: h(r),
          a: h(s),
          len: t,
          at: h(o),
          d: l,
        });
      };
    for (let n = 0; n < 12; n++)
      a(172 + 54 * n + 20 * e(), 520, -90 + (e() - 0.5) * 70, 0.05 + (3 > Math.abs(n - 5.5) ? 0.3 : 0.08) + 0.25 * e());
    for (let n = 0; n < 8; n++) a(800, 500 - 62 * n - 20 * e(), 180 + (e() - 0.5) * 60, 0.12 + (n / 8) * 0.55 + 0.1 * e());
    for (let n = 0; n < 8; n++) a(170, 500 - 62 * n - 20 * e(), (e() - 0.5) * 60, 0.14 + (n / 8) * 0.55 + 0.1 * e());
    for (let n = 0; n < 10; n++) a(190 + 62 * n + 20 * e(), 0, 90 + (e() - 0.5) * 60, 0.55 + 0.35 * e());
    return n;
  })();
function A({ x: e = 0, y: n, dead: a }) {
  return <ellipse cx={e} cy={n} rx="3.8" ry="6" fill={a ? "#5a3f2a" : "#86d155"} stroke={a ? "#a38d72" : "#effbe0"} strokeWidth="1.4" />;
}
function Z({ segs: e, color: n }) {
  return (
    <g stroke={n} strokeLinecap="round">
      {e.map((e, n) => (
        <line key={n} x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2} strokeWidth={e.w} />
      ))}
    </g>
  );
}
function P({ tips: e, color: n }) {
  return (
    <g fill={n}>
      {e.map((e, n) => (
        <circle key={n} cx={e.x} cy={e.y} r="1.9" />
      ))}
    </g>
  );
}
function S({ id: e, dead: n, snow: a = 0 }) {
  switch (e) {
    case "aspen":
      return (
        <g>
          <Z segs={v.aspen.segs} color={n ? "#4a4541" : "#8d857b"} />
          <path d="M-5.5 0 L-3.5 -106 L3.5 -106 L5.5 0Z" fill={n ? "#b3ada0" : "#ece9df"} />
          {$.map(([e, n]) => (
            <path key={n} d={`M${e - 3} ${n} q3 -3 6 0 q-3 3 -6 0Z`} fill="#3a3632" />
          ))}
          {!n && <P tips={v.aspen.tips} color="#7a6848" />}
          <A y={-32} dead={n} />
        </g>
      );
    case "maple": {
      let e = n ? "#39322e" : "#5d4c40";
      return (
        <g>
          <Z segs={v.maple.segs} color={e} />
          <path d="M-8 0 C-7 -30 -6 -60 -5 -80 L5 -80 C6 -60 7 -30 8 0Z" fill={e} />
          <path d="M-3 -10 L-2 -62 M3 -18 L2 -58" stroke={n ? "#2a2522" : "#4a3b31"} strokeWidth="1.6" />
          {!n && <P tips={v.maple.tips} color="#5e3a26" />}
          <A y={-30} dead={n} />
        </g>
      );
    }
    case "apple": {
      let e = n ? "#3d3530" : "#6e5443";
      return (
        <g>
          <Z segs={v.apple.segs} color={e} />
          <path d="M-7 0 C-6 -16 -8 -30 -4 -42 L4 -42 C7 -30 6 -16 7 0Z" fill={e} />
          {!n && <P tips={v.apple.tips} color="#5f3a2c" />}
          <A y={-20} dead={n} />
        </g>
      );
    }
    case "fig": {
      let e = n ? "#4b4945" : "#9a9a92";
      return (
        <g>
          {v.fig.map((n, a) => (
            <Z key={a} segs={n.segs} color={e} />
          ))}
          {!n && v.fig.map((e, n) => <P key={n} tips={e.tips} color="#a4ad62" />)}
          <A x={0} y={-22} dead={n} />
        </g>
      );
    }
    case "lilac": {
      let e = n ? "#3f3833" : "#72604f";
      return (
        <g>
          {v.lilac.map((n, a) => (
            <Z key={a} segs={n.segs} color={e} />
          ))}
          {!n && v.lilac.map((e, n) => <P key={n} tips={e.tips} color="#7fae4f" />)}
          <A x={-2} y={-18} dead={n} />
        </g>
      );
    }
    case "spruce": {
      let e = n ? "#8a5a38" : "#35614f",
        r = n ? "#a0704a" : "#4a7d66";
      return (
        <g>
          <rect x="-4" y="-24" width="8" height="24" fill="#5a4332" />
          {[0, 1, 2, 3, 4, 5, 6].map((n) => {
            let o = -18 - 27 * n,
              t = 50 - 6.6 * n;
            return (
              <g key={n}>
                <path
                  d={`M${h(-t)} ${o} Q${h(-(0.4 * t))} ${o - 8} 0 ${o - 42} Q${h(0.4 * t)} ${o - 8} ${h(t)} ${o} Q0 ${o - 6} ${h(-t)} ${o}Z`}
                  fill={e}
                />
                <path d={`M0 ${o - 42} Q${h(0.4 * t)} ${o - 8} ${h(t)} ${o} Q${h(0.4 * t)} ${o - 5} 0 ${o - 4}Z`} fill={r} />
                {a > 0.05 && (
                  <path
                    d={`M${h(-(0.9 * t))} ${o - 3} Q${h(-(0.45 * t))} ${o - 12} ${h(-(0.1 * t))} ${o - 12} Q${h(0.45 * t)} ${o - 12} ${h(0.9 * t)} ${o - 3}`}
                    fill="none"
                    stroke="#f4f8fc"
                    strokeWidth="4"
                    strokeLinecap="round"
                    opacity={h(a)}
                  />
                )}
              </g>
            );
          })}
        </g>
      );
    }
    case "lavender": {
      let e = n ? "#6f6356" : "#a39a8c";
      return (
        <g>
          {L.map((a, r) => (
            <path
              key={r}
              d={`M0 -4 Q${h(0.3 * a.x)} ${h(0.7 * a.y)} ${a.x} ${n ? h(0.55 * a.y) : a.y}`}
              fill="none"
              stroke={e}
              strokeWidth="1.6"
            />
          ))}
          <path d="M-36 0 C-38 -22 -18 -32 0 -32 C18 -32 38 -22 36 0Z" fill={n ? "#8a7b6a" : "#8fae98"} />
          <path
            d="M-26 -6 C-24 -18 -12 -24 -4 -24 M8 -24 C18 -22 26 -14 26 -6"
            stroke={n ? "#766857" : "#b6ccb9"}
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
        </g>
      );
    }
    case "rosemary": {
      let e = n ? "#8a6a42" : "#3e6c4b";
      return (
        <g>
          {N.map((n, a) => (
            <g key={a}>
              <line x1={n.x0} y1="0" x2={n.x2} y2={n.y2} stroke="#6b5a44" strokeWidth="2.4" strokeLinecap="round" />
              <g stroke={e} strokeLinecap="round">
                {n.needles.map((e, n) => (
                  <line key={n} x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2} strokeWidth={e.w} />
                ))}
              </g>
            </g>
          ))}
        </g>
      );
    }
    case "lemon": {
      let e = n ? "#6f5334" : "#2c6f38",
        a = n ? "#86673f" : "#3c8a45",
        r = n ? "#a89454" : "#f3d33a";
      return (
        <g>
          <path d="M-4 0 L-3 -54 L3 -54 L4 0Z" fill="#6b5a48" />
          <path d="M0 -44 L-16 -66 M0 -48 L14 -70" stroke="#6b5a48" strokeWidth="3" strokeLinecap="round" />
          <circle cx="-22" cy="-80" r="25" fill={e} />
          <circle cx="22" cy="-84" r="26" fill={e} />
          <circle cx="0" cy="-106" r="28" fill={a} />
          <circle cx="-4" cy="-72" r="22" fill={a} />
          {[
            [-24, -72],
            [18, -76],
            [4, -98],
            [-12, -112],
            [26, -98],
          ].map(([e, n]) => (
            <ellipse key={`${e}${n}`} cx={e} cy={n} rx="5" ry="6.5" fill={r} />
          ))}
        </g>
      );
    }
    case "bird": {
      let e = n ? "#8a6f4c" : "#5f917a",
        a = n ? "#7a6246" : "#4f7d66",
        r = n
          ? [
              [-6, -34, -30, -26, 150],
              [0, -40, -8, -12, 175],
              [4, -38, 26, -22, 205],
              [8, -30, 36, -8, 230],
            ]
          : [
              [-6, -50, -30, -78, -20],
              [-2, -60, -8, -96, -5],
              [4, -56, 22, -88, 15],
              [8, -44, 38, -68, 32],
            ];
      return (
        <g>
          {r.map(([n, r, o, t, l], i) => (
            <g key={i}>
              <path d={`M${i - 2} 0 Q${n} ${r} ${o} ${t}`} fill="none" stroke={a} strokeWidth="3" strokeLinecap="round" />
              <ellipse cx={o} cy={t} rx="8" ry="20" fill={e} transform={`rotate(${l} ${o} ${t})`} />
            </g>
          ))}
          {n ? (
            <path d="M14 -24 l12 6 l-10 4Z" fill="#6f5a42" />
          ) : (
            <g>
              <path d="M2 0 Q10 -30 16 -52" fill="none" stroke={a} strokeWidth="3" />
              <path d="M12 -52 L40 -60 L20 -48Z" fill="#3f6fb5" />
              <path d="M16 -54 L22 -80 L26 -58 L34 -74 L32 -58Z" fill="#f28a2a" />
            </g>
          )}
        </g>
      );
    }
  }
}
let D = (e) => (1 === e.length ? e[0] : `${e.slice(0, -1).join(", ")} and ${e[e.length - 1]}`),
  F = (e) => e.charAt(0).toUpperCase() + e.slice(1),
  T = (e) => e.length > 1 || e[0].plural,
  Q = (e) => 468 - (e + 60) * 3.25,
  R = `
.cn-tw{animation:cnTw 2.8s ease-in-out infinite}
@keyframes cnTw{0%,100%{opacity:.35}50%{opacity:1}}
.cn-die{transform-box:fill-box;transform-origin:50% 100%;animation:cnDie .7s ease-out both}
@keyframes cnDie{0%{transform:scale(1.04,1.06)}40%{transform:scale(.97,.93)}100%{transform:scale(1,1)}}
.cn-live{transform-box:fill-box;transform-origin:50% 100%;animation:cnLive .6s cubic-bezier(.3,1.5,.55,1) both}
@keyframes cnLive{0%{transform:scale(.9,.86)}60%{transform:scale(1.03,1.06)}100%{transform:scale(1,1)}}
.cn-fade{transition:opacity .4s ease}
@media (prefers-reduced-motion: reduce){.cn-tw,.cn-die,.cn-live{animation:none}.cn-fade{transition:none}}
`;
function CQ_({ places: e = [], start: n }) {
  var a;
  let r,
    l,
    i,
    c,
    d,
    y,
    j,
    w,
    v,
    $,
    N,
    L,
    A,
    Z = "cn" + (0, t.useId)().replace(/[^a-zA-Z0-9]/g, ""),
    P = n ? p(n.zone) : null,
    U = (() => {
      if (!n || !Number.isFinite(n.minC)) return null;
      let e = u(Math.round((9 * n.minC) / 5 + 32), -60, 60);
      return null != P && m(e).label !== n.zone.toLowerCase() ? u(P + 2, -60, 60) : e;
    })(),
    [B, H] = (0, t.useState)(U ?? -18),
    O = (0, t.useRef)(false),
    E = (e) => H(u(Math.round(e), -60, 60)),
    K = (e) => {
      let n = e.currentTarget.getBoundingClientRect();
      n.height <= 0 || E((468 - ((e.clientY - n.top) / n.height) * 520) / 3.25 - 60);
    },
    Y = () => {
      O.current = false;
    },
    G = m(B),
    V = Math.round(f(B)),
    J = Math.round(f(G.lo)),
    X = Math.round(f(G.hi)),
    _ =
      ((l = Math.round(f((r = m(B)).lo))),
      (i = Math.round(f(r.hi))),
      (c = `Zone ${r.label}: the coldest night is usually ${x(l)} to ${x(i)} \xb0C.`),
      (d = (e) => p(e.zone) ?? -60),
      (y = g.filter((e) => z(e, B))),
      (j = g.filter((e) => !z(e, B)).sort((e, n) => d(e) - d(n))),
      (w = y.filter((e) => m(d(e)).n === r.n)),
      (v = y
        .filter((e) => !w.includes(e))
        .sort((e, n) => d(n) - d(e))
        .slice(0, 2)),
      ($ = j[0]),
      (N = (e) => `${e.many} ${e.plural ? "don't" : "doesn't"} make it`),
      (L = D(w.map((e) => e.many))),
      (A = [c]),
      $
        ? v.length
          ? A.push(`${F(D(v.map((e) => e.many)))} shrug${T(v) ? "" : "s"} it off; ${N($)}.`)
          : A.push(`Only ${L} ${T(w) ? "survive" : "survives"}, right at ${T(w) ? "their" : "its"} limit; even ${N($)}.`)
        : A.push(`Every plant here makes it through${w.length ? ` — ${L} only just` : ""}.`),
      w.length && v.length && $ && A.push(`${F(L)} ${T(w) ? "are" : "is"} right at ${T(w) ? "their" : "its"} limit.`),
      r.lo >= 35 && A.push("In most winters here it never freezes at all."),
      A.join(" ")),
    ee = u((32 - B) / 92, 0, 1),
    en = u((20 - B) / 40, 0, 1),
    ea = k("#3f7fd3", "#d9463b", (B + 60) / 120),
    er = h(Q(B)),
    es = n?.place,
    eo = e.filter((e) => e.zone.toLowerCase() === G.label).sort((e, n) => Number(n.name === es) - Number(e.name === es)),
    et = eo.slice(0, 4),
    el = `A garden on a winter night beside a thermometer at ${x(V)} \xb0C (${x(B)} \xb0F), hardiness zone ${G.label}. Surviving: ${D(g.filter((e) => z(e, B)).map((e) => e.name.toLowerCase()))}.${g.some((e) => !z(e, B)) ? ` Killed back by the cold: ${D(g.filter((e) => !z(e, B)).map((e) => e.name.toLowerCase()))}.` : ""}`,
    ei = (e) => {
      let n = z(e, B),
        a = "back" === e.row ? 392 : 478;
      return (
        <g key={e.id} transform={`translate(${e.x} ${a})`}>
          <g key={n ? "ok" : "dead"} className={n ? "cn-live" : "cn-die"}>
            <S id={e.id} dead={!n} snow={en} />
          </g>
          <g transform={`translate(${h(0.28 * e.w)} ${-e.h - 4})`}>
            <text
              y="-17"
              textAnchor="middle"
              fontSize="13"
              fontWeight="700"
              fill="#f4f7fb"
              stroke="#0b1428"
              strokeWidth="3"
              paintOrder="stroke"
              className="hidden sm:inline"
            >
              {e.name}
            </text>
            <circle r="11" fill={n ? "#2f7d3a" : "#8a4a2c"} stroke="var(--surface)" strokeWidth="2.5" />
            {n ? (
              <path d="M-5 0 l3.5 4 l6.5 -8" fill="none" stroke="var(--surface)" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
            ) : (
              <path d="M-4 -4 l8 8 M4 -4 l-8 8" stroke="var(--surface)" strokeWidth="2.8" strokeLinecap="round" />
            )}
          </g>
        </g>
      );
    };
  return (
    <div className="text-ink">
      <style>{R}</style>
      <div className="relative overflow-hidden rounded-card border border-line">
        <svg viewBox="0 0 800 520" className="block h-auto w-full select-none" role="img" aria-label={el}>
          <defs>
            <linearGradient id={`${Z}sky`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#0a1530" />
              <stop offset="0.7" stopColor="#1d3658" />
              <stop offset="1" stopColor="#2c4a6c" />
            </linearGradient>
            <linearGradient id={`${Z}tube`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#ffffff" />
              <stop offset="1" stopColor="#d6dde4" />
            </linearGradient>
            <clipPath id={`${Z}garden`}>
              <rect x={162} y="0" width={638} height={520} />
            </clipPath>
          </defs>
          <rect width={800} height={520} fill={`url(#${Z}sky)`} />
          {M.map((e, n) =>
            e.tw ? (
              <circle
                key={n}
                className="cn-tw"
                style={{
                  animationDelay: `${e.d}s`,
                }}
                cx={e.x}
                cy={e.y}
                r={e.r}
                fill="#fdf8e4"
              />
            ) : (
              <circle key={n} cx={e.x} cy={e.y} r={e.r} fill="#fdf8e4" opacity="0.7" />
            ),
          )}
          <circle cx="742" cy="66" r="30" fill="#f6f0d6" />
          <circle cx="756" cy="58" r="27" fill="#0f1d3a" />
          <circle cx="742" cy="66" r="44" fill="#f6f0d6" opacity="0.08" />
          <path
            d="M162 386 L180 356 L196 386 L214 346 L232 386 L250 360 L270 386 L292 340 L312 386 L336 356 L356 386 L380 350 L402 386 L430 362 L450 386 L476 344 L498 386 L520 358 L540 386 L566 348 L590 386 L612 360 L632 386 L660 346 L684 386 L706 356 L728 386 L754 348 L776 386 L800 360 V400 H162Z"
            fill="#132338"
          />
          <rect x={162} y="384" width={638} height={136} fill={k("#23392d", "#cfdbe6", en)} />
          <path d="M162 452 Q420 440 640 450 T800 446 V520 H162Z" fill={k("#2b4436", "#e3ebf2", en)} />
          {ee > 0 &&
            C.map((e, n) =>
              e.k < 1.1 * ee ? <circle key={n} cx={e.x} cy={e.y} r={e.r} fill="#ffffff" opacity={h(0.5 + 0.5 * ee)} /> : null,
            )}
          <g clipPath={`url(#${Z}garden)`}>
            {g
              .filter((e) => "back" === e.row)
              .sort((e, n) => n.h - e.h)
              .map(ei)}
            {g.filter((e) => "front" === e.row).map(ei)}
          </g>
          <g clipPath={`url(#${Z}garden)`} stroke="#eaf4ff" fill="none" strokeLinecap="round">
            {W.map((e, n) => {
              let a = u((ee - e.at) / 0.22, 0, 1);
              return a <= 0 ? null : (
                <g key={n} transform={`translate(${e.x} ${e.y}) rotate(${e.a}) scale(${h(a)})`} opacity={h(0.45 + 0.45 * a)}>
                  <path d={e.d} strokeWidth="1.8" />
                </g>
              );
            })}
          </g>
          <rect x="0" y="0" width={162} height={520} fill="#0b1428" opacity="0.55" />
          <text x="40" y="46" textAnchor="end" fontSize="17" fontWeight="800" fill="#e8eef6">
            °C
          </text>
          <text x={114} y="46" textAnchor="middle" fontSize="15" fontWeight="800" fill="#e8eef6">
            zone
          </text>
          {Array.from(
            {
              length: 24,
            },
            (e, n) => {
              let a = -60 + 5 * n,
                r = Math.floor(n / 2) + 1,
                o = G.lo === a;
              return <rect key={n} x={82} y={Q(a + 5)} width={64} height="16.25" fill={b[r - 1]} opacity={o ? 1 : n % 2 ? 0.72 : 0.9} />;
            },
          )}
          {Array.from(
            {
              length: 13,
            },
            (e, n) => (
              <line key={n} x1={82} x2={146} y1={Q(-60 + 10 * n)} y2={Q(-60 + 10 * n)} stroke="#0b1428" strokeWidth="1.5" />
            ),
          )}
          {G.lo < 60 && <rect x={80} y={Q(G.hi)} width={68} height="16.25" fill="none" stroke="#ffffff" strokeWidth="3.5" rx="2" />}
          {Array.from(
            {
              length: 12,
            },
            (e, n) => (
              <text
                key={n}
                x={114}
                y={Q(-60 + 10 * n + 5) + 6}
                textAnchor="middle"
                fontSize="17"
                fontWeight="800"
                fill="var(--ink)"
                stroke="#ffffff"
                strokeOpacity="0.55"
                strokeWidth="3"
                paintOrder="stroke"
              >
                {n + 1}
              </text>
            ),
          )}
          {null != P && P < 60 && (
            <g transform={`translate(154 ${h(Q(P + 2.5))})`}>
              <path d="M-6 0 L2 -7 L2 7Z" fill="#f2c452" />
              <path d="M2 -3 L7 -8 L12 -3 V5 H2Z" fill="#f2c452" />
            </g>
          )}
          {[-50, -40, -30, -20, -10, 0, 10].map((e) => {
            let n = Q((9 * e) / 5 + 32);
            return (
              <g key={e}>
                <line x1={43} x2={34} y1={n} y2={n} stroke="#c9d4e0" strokeWidth="2" />
                <text x={31} y={n + 5} textAnchor="end" fontSize="14" fontWeight="700" fill="#e8eef6">
                  {x(e)}
                </text>
              </g>
            );
          })}
          <rect x={44} y="66" width="24" height="424" rx="12" fill={`url(#${Z}tube)`} stroke="#8795a4" strokeWidth="2.5" />
          <rect x={51} y={er} width="10" height={h(496 - er)} rx="5" fill={ea} />
          <circle cx={56} cy="496" r="20" fill={ea} stroke="#8795a4" strokeWidth="2.5" />
          <circle cx={50} cy="490" r="5" fill="#ffffff" opacity="0.45" />
          <line x1={76} x2={82} y1={er} y2={er} stroke="#ffffff" strokeWidth="2.5" strokeDasharray="3 3" />
          <g transform={`translate(56 ${er})`}>
            <circle r="21" fill="#000000" opacity="0.2" transform="translate(0 3)" />
            <circle r="20" fill="var(--surface)" stroke={ea} strokeWidth="5" />
            <path
              d="M-6 -3 L0 -10 L6 -3 M-6 3 L0 10 L6 3"
              fill="none"
              stroke="var(--ink)"
              strokeWidth="2.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </svg>
        <div
          role="slider"
          tabIndex={0}
          aria-label="Thermometer: drag down to the coldest night of an average winter"
          aria-orientation="vertical"
          aria-valuemin={-60}
          aria-valuemax={60}
          aria-valuenow={B}
          aria-valuetext={`${V} degrees Celsius, ${B} Fahrenheit: zone ${G.label}`}
          onPointerDown={(e) => {
            ("mouse" !== e.pointerType || 0 === e.button) && (e.currentTarget.setPointerCapture(e.pointerId), (O.current = true), K(e));
          }}
          onPointerMove={(e) => {
            O.current && K(e);
          }}
          onPointerUp={Y}
          onPointerCancel={Y}
          onLostPointerCapture={Y}
          onKeyDown={(e) => {
            let n = {
              ArrowUp: 1,
              ArrowRight: 1,
              ArrowDown: -1,
              ArrowLeft: -1,
              PageUp: 5,
              PageDown: -5,
            };
            e.key in n
              ? (e.preventDefault(), E(B + n[e.key]))
              : "Home" === e.key
                ? (e.preventDefault(), E(-60))
                : "End" === e.key && (e.preventDefault(), E(60));
          }}
          className="absolute left-0 top-0 h-full cursor-ns-resize touch-none rounded-l-2xl outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-gold-fill"
          style={{
            width: "20.25%",
          }}
        />
      </div>
      <div className="mt-3 flex flex-wrap items-end gap-x-6 gap-y-3">
        <div>
          <p className="eyebrow">Hardiness zone</p>
          <p className="font-display text-5xl font-semibold leading-none">{G.label}</p>
        </div>
        <div>
          <p className="eyebrow">Coldest night of an average winter</p>
          <p className="font-display text-3xl font-semibold leading-none">
            {x(V)}
            {" °C "}
            <span className="text-xl font-normal text-ink-2">
              {x(B)}
              {" °F"}
            </span>
          </p>
        </div>
        <div className="ml-auto flex gap-2">
          <button
            type="button"
            onClick={() => E(B - 5)}
            disabled={B <= -60}
            aria-label="Colder by half a zone"
            className="min-h-12 rounded-full border-2 border-azure/40 bg-paper px-4 font-semibold text-azure transition hover:border-azure disabled:opacity-40"
          >
            − Colder
          </button>
          <button
            type="button"
            onClick={() => E(B + 5)}
            disabled={B >= 60}
            aria-label="Warmer by half a zone"
            className="min-h-12 rounded-full border-2 border-rust/40 bg-paper px-4 font-semibold text-rust transition hover:border-rust disabled:opacity-40"
          >
            + Warmer
          </button>
        </div>
      </div>
      <p className="mt-1 text-sm text-ink-2">
        {"Zone "}
        {G.label}
        {" covers "}
        {x(J)}
        {" to "}
        {x(X)}
        {" °C ("}
        {x(G.lo)}
        {" to "}
        {x(G.hi)}
        {" °F)."}
      </p>
      {n && null != U && (
        <button
          type="button"
          onClick={() => E(U)}
          aria-pressed={B === U}
          className={`mt-3 min-h-11 rounded-full px-4 py-2 text-sm font-semibold transition ${B === U ? "bg-moss text-white" : "border-2 border-moss/50 bg-paper text-moss hover:border-moss"}`}
        >
          {"Back to "}
          {n.place}
          {": zone "}
          {n.zone}
        </button>
      )}
      <p aria-live="polite" className="font-display mt-3 min-h-[5.5rem] text-lg leading-snug sm:min-h-[4rem] sm:text-xl">
        {_}
      </p>
      <ul className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-5">
        {g.map((e) => {
          let n = z(e, B),
            a = p(e.zone) ?? -60;
          return (
            <li
              key={e.id}
              className="flex min-h-14 items-center gap-2 rounded-tile border-2 bg-paper px-2 py-1.5"
              style={{
                borderColor: n ? "var(--moss)" : "#b98a6e",
              }}
            >
              <svg
                viewBox={`${-e.w / 2 - 4} ${-e.h - 6} ${e.w + 8} ${e.h + 12}`}
                className="h-10 w-10 shrink-0 rounded-lg bg-[#1d3658]"
                aria-hidden="true"
              >
                <S id={e.id} dead={!n} />
              </svg>
              <span className="min-w-0 leading-tight">
                <span className="block text-sm font-semibold">{e.name}</span>
                <span className="block text-xs text-ink-2">
                  <span className="whitespace-nowrap">
                    {"Zone "}
                    {e.zone}
                  </span>{" "}
                  <span className="whitespace-nowrap">
                    ({x(Math.round(f(a)))}
                    {" °C)"}
                  </span>
                </span>
                <span
                  className="block text-xs font-semibold"
                  style={{
                    color: n ? "var(--moss)" : "#9a3f22",
                  }}
                >
                  {n ? "Survives" : "deciduous" === e.leaves ? "Killed back" : "Frozen brown"}
                </span>
              </span>
            </li>
          );
        })}
      </ul>
      <div className="mt-4 rounded-tile border border-line bg-paper-2/60 p-4">
        <p className="eyebrow">
          {"Places with zone "}
          {G.label}
        </p>
        {et.length ? (
          <ul className="mt-2 flex flex-wrap gap-2">
            {et.map((e) => (
              <li key={e.slug}>
                <o.default
                  href={`/gardening/${e.slug}`}
                  className="inline-flex min-h-11 items-center rounded-full border-2 border-moss/40 bg-paper px-4 py-2 text-sm font-semibold text-moss transition hover:border-moss"
                >
                  {e.name}
                </o.default>
              </li>
            ))}
            {eo.length > et.length && (
              <li className="inline-flex min-h-11 items-center px-2 text-sm text-ink-2">
                {"and "}
                {eo.length - et.length}
                {" more"}
              </li>
            )}
          </ul>
        ) : (
          <p className="mt-2 text-sm text-ink-2">
            {(a = B) < -40
              ? "None of the places we cover get this cold — it's colder than anywhere on our list."
              : a >= 45
                ? "None of the places we cover sit in this half-zone — frost-free zones like this are the lowland tropics, such as Hawaiʻi."
                : "None of the places we cover sit in this half-zone."}
          </p>
        )}
      </div>
      <I>
        <strong className="font-semibold text-ink">The green patch on the bare trees</strong>
        {
          " is the gardener’s scratch test: scrape a twig with a thumbnail — green underneath means it’s alive, brown means that part has died. Maples, lilacs, apples and figs drop their leaves for winter, so it’s the buds and wood that have to live through the night."
        }
      </I>
      <I>
        This toy uses the USDA method: a zone is set by the average of each winter’s single coldest night. Canada’s official plant hardiness
        zones, from Natural Resources Canada, use a different formula that blends several climate variables — winter lows, the frost-free
        season, rain, summer heat, snow cover and wind — so a Canadian zone number can differ. NRCan also publishes extreme-minimum
        (USDA-style) zones for Canada.
      </I>
      <p className="mt-2 text-xs leading-relaxed text-ink-2">
        Sources:{" "}
        <a className="underline decoration-line underline-offset-2 hover:text-moss" href="https://planthardiness.ars.usda.gov/">
          USDA Plant Hardiness Zone Map
        </a>{" "}
        (10 °F zones, 5 °F half zones);{" "}
        <a className="underline decoration-line underline-offset-2 hover:text-moss" href="https://plants.ces.ncsu.edu/">
          NC State Extension Gardener Plant Toolbox
        </a>{" "}
        for each plant’s coldest zone;{" "}
        <a className="underline decoration-line underline-offset-2 hover:text-moss" href="https://planthardiness.gc.ca/">
          Natural Resources Canada
        </a>
        . Zones are a guide: shelter, snow cover and a rare cold snap all change what survives.
      </p>
    </div>
  );
}
function I({ children: e }) {
  return <p className="mt-3 text-sm leading-relaxed text-ink-2">{e}</p>;
}
function U(e, n) {
  let a = e - n;
  if (0 === a) return "the zone on this page";
  let r = Math.abs(a);
  return `${1 === r ? "one zone" : `${r} zones`} ${a > 0 ? "warmer" : "colder"} than this page`;
}
export const ColdestNightForYou = function ({ places: e }) {
  var n;
  let a = d(),
    r =
      a.place && a.zone && null != a.zoneNumber
        ? {
            zone: a.zone,
            minC: a.minC ?? Math.round(((-60 + (Number.parseInt((n = a.zone), 10) - 1) * 10 + 5 * !!n.endsWith("b") + 2.5 - 32) * 5) / 9),
            place: a.place.label.split(",")[0],
          }
        : undefined;
  return <CQ_ key={r?.zone ?? "none"} places={e} start={r} />;
};
export const YourZoneBanner = function ({ here: e }) {
  var n;
  let a = d();
  if (!a.place)
    return (
      <div className="rounded-tile border border-dashed border-line bg-paper-2/60 px-4 py-3 text-sm text-ink-2">
        Set a location (<strong className="font-semibold text-ink">Find my area</strong>, at the top of the page) to compare each zone with
        your own.
      </div>
    );
  if (a.loading) return <div className="h-12 animate-pulse rounded-tile bg-paper-2/60" aria-hidden="true" />;
  if (!a.zone || null == a.zoneNumber) return null;
  let r = a.zoneNumber,
    t = e ? Number.parseInt(e, 10) : null,
    l = r >= 2 && r <= 11;
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 rounded-tile border border-moss/40 bg-moss-soft px-4 py-3 text-sm">
      <p className="text-ink">
        <span className="font-semibold">
          {"Your zone: "}
          {a.zone}
        </span>
        {" ("}
        {a.place.label.split(",")[0]}
        {", from "}
        {"usda-2023" === (n = a.source)
          ? "the USDA 2023 map"
          : "nrcan" === n
            ? "the Natural Resources Canada map"
            : "an estimate from recorded winter lows"}
        )
        {null != t ? (
          <span className="text-ink-2">
            {". "}
            {U(r, t).charAt(0).toUpperCase() + U(r, t).slice(1)}.
          </span>
        ) : (
          "."
        )}
      </p>
      {t !== r && l && (
        <o.default href={`/zones/${r}`} className="font-semibold text-moss hover:underline">
          {"Zone "}
          {r}
          {" guide →"}
        </o.default>
      )}
      {!l && (
        <span className="text-ink-2">
          {"The guides cover zones 2 to 11; the nearest to zone "}
          {r}
          {" is zone "}
          {r < 2 ? 2 : 11}.
        </span>
      )}
    </div>
  );
};
export const ZoneBand = function ({ band: e }) {
  let n = d(),
    a = e.match(/(\d+)\D+(\d+)/);
  if (!a || !n.zone || null == n.zoneNumber) return <>{e}</>;
  let [r, o] = [Number(a[1]), Number(a[2])],
    t = n.zoneNumber >= r && n.zoneNumber <= o;
  return (
    <>
      {e}{" "}
      <span className="normal-case tracking-normal text-ink-2">
        {"· your zone: "}
        {n.zone}
        {t ? "" : n.zoneNumber < r ? ", colder" : ", warmer"}
      </span>
    </>
  );
};
export const ZoneRange = function ({ min: e, max: n, label: a = "Hardiness zones" }) {
  let r = d(),
    o = `${a} ${e}–${n}`;
  if (!r.zone || null == r.zoneNumber) return <>{o}.</>;
  let t = r.zoneNumber >= e && r.zoneNumber <= n;
  return (
    <>
      {o}
      {" ·"}{" "}
      <span className={t ? "font-semibold text-moss" : "font-semibold text-rust"}>
        {t
          ? `your zone ${r.zone} is in range`
          : r.zoneNumber < e
            ? `your zone ${r.zone} is colder than its range`
            : `your zone ${r.zone} is warmer than its range`}
      </span>
      .
    </>
  );
};
