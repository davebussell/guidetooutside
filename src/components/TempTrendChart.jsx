"use client";
// Restored from client module 50714 (exports: TempTrendChart)
import * as t from "react/jsx-runtime";
import * as s from "react";
let n = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  a = "var(--gold)",
  r = "var(--gold-fill)",
  o = "var(--azure)",
  i = "var(--surface)",
  l = 664,
  d = 252;
export const TempTrendChart = function ({ high: e, low: c, water: h, waterLabel: m = "Water", waterNote: u, currentMonth: x }) {
  var p, f;
  let g,
    y,
    b = (0, s.useId)().replace(/:/g, ""),
    [j, w] = (0, s.useState)(null),
    [k, N] = (0, s.useState)(false),
    v = [...e, ...c, ...(h ?? [])],
    [M, $, C] =
      ((p = Math.min(...v)),
      (y = (g = Math.max(10, (f = Math.max(...v)) - p)) > 60 ? 20 : g > 28 ? 10 : 5),
      [Math.floor((p - y / 2) / y) * y, Math.ceil((f + y / 2) / y) * y, y]),
    S = (e) => 38 + (e / 11) * l,
    A = (e) => 18 + d - ((e - M) / ($ - M)) * d,
    L = (e) => e.map((e, t) => `${t ? "L" : "M"}${S(t).toFixed(1)} ${A(e).toFixed(1)}`).join(" "),
    T = `${L(e)} ${c.map((e, t) => `L${S(11 - t).toFixed(1)} ${A(c[11 - t]).toFixed(1)}`).join(" ")} Z`,
    W = [];
  for (let e = M; e <= $; e += C) W.push(e);
  let O = e.indexOf(Math.max(...e)),
    z = h ? h.indexOf(Math.max(...h)) : -1,
    F = j ?? (x ? x - 1 : null);
  return (
    <figure className="m-0">
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
        <span className="inline-flex items-center gap-2">
          <span
            className="h-3 w-3 rounded-sm"
            style={{
              background: r,
              border: `1.5px solid ${a}`,
            }}
          />
          <span className="text-ink-2">Air, average high to low</span>
        </span>
        {h && (
          <span className="inline-flex items-center gap-2">
            <span
              className="h-[3px] w-5 rounded-full"
              style={{
                background: o,
              }}
            />
            <span className="text-ink-2">{m}</span>
          </span>
        )}
        <button type="button" onClick={() => N((e) => !e)} className="ml-auto text-xs text-ink-2 underline decoration-line hover:text-ink">
          {k ? "Show the chart" : "Show the numbers"}
        </button>
      </div>
      {k ? (
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm border-collapse min-w-[34rem]">
            <caption className="sr-only">Average monthly air and water temperature in °C</caption>
            <thead>
              <tr className="text-left">
                <th scope="col" className="py-1.5 pr-3 font-medium text-ink-2">
                  Month
                </th>
                {n.map((e) => (
                  <th key={e} scope="col" className="py-1.5 px-1 font-medium text-ink-2 text-right tabular-nums">
                    {e}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="border-t border-line">
              {[["High", e], ["Low", c], ...(h ? [[m, h]] : [])].map(([e, s]) => (
                <tr key={e} className="border-b border-line/60">
                  <th scope="row" className="py-1.5 pr-3 font-medium text-left">
                    {e}
                  </th>
                  {s.map((e, s) => (
                    <td key={s} className="py-1.5 px-1 text-right tabular-nums text-ink-2">
                      {Math.round(e)}°
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="mt-3 relative">
          <svg
            viewBox="0 0 720 300"
            className="w-full h-auto block"
            role="img"
            aria-label={`Average monthly air high and low${h ? ` and ${m.toLowerCase()}` : ""} in degrees Celsius`}
            onPointerLeave={() => w(null)}
            onPointerMove={(e) => {
              let t = e.currentTarget.getBoundingClientRect();
              w(Math.min(11, Math.max(0, Math.round(((((e.clientX - t.left) / t.width) * 720 - 38) / l) * 11))));
            }}
          >
            <defs>
              <linearGradient id={`air${b}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={r} stopOpacity="0.42" />
                <stop offset="100%" stopColor={r} stopOpacity="0.18" />
              </linearGradient>
            </defs>
            {W.map((e) => (
              <g key={e}>
                <line
                  x1={38}
                  x2={702}
                  y1={A(e)}
                  y2={A(e)}
                  stroke="currentColor"
                  strokeWidth={0 === e ? 1.2 : 1}
                  strokeDasharray={0 === e ? "" : "3 4"}
                  opacity={0.5}
                />
                <text x={30} y={A(e) + 4} textAnchor="end" fontSize="11" fill="currentColor" opacity="0.75">
                  {e}°
                </text>
              </g>
            ))}
            <path d={T} fill={`url(#air${b})`} />
            <path d={L(e)} fill="none" stroke={a} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
            <path
              d={L(c)}
              fill="none"
              stroke={a}
              strokeWidth="2"
              strokeLinejoin="round"
              strokeLinecap="round"
              opacity="0.7"
              strokeDasharray="5 3"
            />
            {h && (
              <>
                <path d={L(h)} fill="none" stroke={i} strokeWidth="5" strokeLinejoin="round" strokeLinecap="round" opacity="0.9" />
                <path d={L(h)} fill="none" stroke={o} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
              </>
            )}
            <text x={S(O)} y={A(e[O]) - 9} textAnchor="middle" fontSize="11.5" fontWeight="600" fill={a}>
              Air
            </text>
            {h && z >= 0 && (
              <text x={S(z)} y={A(h[z]) + (z === O ? 20 : -9)} textAnchor="middle" fontSize="11.5" fontWeight="600" fill={o}>
                {m}
              </text>
            )}
            {n.map((e, s) => (
              <text
                key={e}
                x={S(s)}
                y={290}
                textAnchor="middle"
                fontSize="11"
                fill="currentColor"
                opacity={F === s ? 1 : 0.7}
                fontWeight={F === s ? 600 : 400}
              >
                {e[0]}
                <tspan className="hidden sm:inline">{e.slice(1)}</tspan>
              </text>
            ))}
            {null != F && (
              <g pointerEvents="none">
                <line x1={S(F)} x2={S(F)} y1={18} y2={18 + d} stroke="currentColor" strokeWidth="1" opacity="0.35" />
                <circle cx={S(F)} cy={A(e[F])} r="4.5" fill={a} stroke={i} strokeWidth="2" />
                <circle cx={S(F)} cy={A(c[F])} r="4.5" fill={a} stroke={i} strokeWidth="2" opacity="0.75" />
                {h && <circle cx={S(F)} cy={A(h[F])} r="5" fill={o} stroke={i} strokeWidth="2" />}
              </g>
            )}
          </svg>
          {null != F && (
            <div
              className="pointer-events-none absolute top-2 rounded-lg border border-line bg-surface px-3 py-2 text-xs shadow-lift"
              style={{
                left: `${(S(F) / 720) * 100}%`,
                transform: `translateX(${F > 7 ? "-105%" : F < 4 ? "5%" : "-50%"})`,
              }}
            >
              <p className="font-display text-sm font-semibold leading-tight">{n[F]}</p>
              <p
                className="mt-1 whitespace-nowrap"
                style={{
                  color: a,
                }}
              >
                {"Air "}
                {Math.round(e[F])}
                {"° / "}
                {Math.round(c[F])}°
              </p>
              {h && (
                <p
                  className="whitespace-nowrap"
                  style={{
                    color: o,
                  }}
                >
                  {m} {Math.round(h[F])}°
                </p>
              )}
            </div>
          )}
        </div>
      )}
      {u && <figcaption className="mt-3 text-xs text-ink-2 max-w-3xl">{u}</figcaption>}
    </figure>
  );
};
