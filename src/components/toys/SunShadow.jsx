"use client";
/* eslint-disable @typescript-eslint/no-unused-expressions -- restored from the minified bundle: refs keep their one-letter names and statements keep the compiler's comma and && form. */
// Restored from client module 59673 (exports: SunShadow)
import * as s from "react";
import * as a from "@/lib/daypart";
import * as n from "@/lib/sun";
import * as i from "@/lib/learn/rungs";
import * as r from "@/lib/hooks";
function l(e, t) {
  try {
    return e.toLocaleTimeString("en-CA", {
      hour: "numeric",
      minute: "2-digit",
      timeZone: t,
    });
  } catch {
    return e.toLocaleTimeString("en-CA", {
      hour: "numeric",
      minute: "2-digit",
    });
  }
}
let o = [
  {
    id: "long",
    rung: "two",
    ask: "Make the shadow LONG.",
    hit: (e) => e.lengthSticks >= 4,
    yes: "That is a long shadow. Early morning or late evening — the sun is low, so the shadow is long.",
  },
  {
    id: "short",
    rung: "two",
    ask: "Now make it little.",
    hit: (e) => e.altitude > 0 && e.lengthSticks <= 1.6,
    yes: "Little shadow. The sun is high up now — that is the middle of the day.",
  },
  {
    id: "shortest",
    rung: "four",
    ask: "Make the shadow as short as it will go.",
    hit: (e) => e.altitude > 0 && e.lengthSticks <= 1.15,
    yes: "That is the shortest it gets all day, and it happens at solar noon — which is almost never twelve o'clock on a watch.",
  },
  {
    id: "north",
    rung: "four",
    ask: "Make the shadow point straight up the screen — due north.",
    hit: (e) => e.altitude > 0 && 6 >= Math.min((e.azimuth + 180) % 360, 360 - ((e.azimuth + 180) % 360)),
    yes: "Due north. The shadow points north when the sun is due south, and that is the same moment it is shortest. That is how you find north without a compass.",
  },
  {
    id: "equal",
    rung: "six",
    ask: "Find the moment the shadow is exactly as long as the stick.",
    hit: (e) => e.altitude > 0 && 0.06 >= Math.abs(e.lengthSticks - 1),
    yes: "One stick long means the sun is at exactly 45 degrees — halfway up the sky. Two of those moments happen every day the sun gets that high, one each side of noon.",
  },
  {
    id: "double",
    rung: "six",
    ask: "Now make it exactly twice as long as the stick.",
    hit: (e) => e.altitude > 0 && 0.08 >= Math.abs(e.lengthSticks - 2),
    yes: "Twice as long puts the sun at about 26 and a half degrees. Notice that halving the height did not halve the angle — shadows do not work in straight lines.",
  },
];
/**
 * Positions on the dial are rounded to a thousandth of a unit: Node and the
 * browser can disagree in the last digits of Math.cos, which would make the
 * server's SVG fail to hydrate.
 */
const r3 = (v) => Math.round(v * 1000) / 1000;
/**
 * The shadow clock. Every prop is optional: without coordinates it uses the
 * remembered place, and `rung` (the starting age, "two" | "four" | "six")
 * defaults to "four".
 * @param {{ lat?: number, lon?: number, placeName?: string, timeZone?: string, rung?: string }} props
 */
export const SunShadow = function ({ lat: e, lon: d, placeName: h, timeZone: c, rung: m }) {
  let u = (0, r.usePlace)(),
    x = e ?? u?.lat ?? null,
    p = d ?? u?.lon ?? null,
    g = h ?? u?.label?.split(",")[0] ?? null,
    f = c ?? u?.tz ?? undefined,
    [b, j] = (0, s.useState)(m ?? "four"),
    [w, y] = (0, s.useState)(540),
    [k, N] = (0, s.useState)([]),
    [v, M] = (0, s.useState)([]),
    [C, T] = (0, s.useState)(""),
    S = (0, s.useMemo)(
      () =>
        (function (e, t = new Date()) {
          if (!e) {
            let e = new Date(t);
            return (e.setHours(0, 0, 0, 0), e);
          }
          let s = (function (e, t = new Date()) {
              try {
                let s = new Intl.DateTimeFormat("en-US", {
                    timeZone: e,
                    hour12: false,
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  }),
                  a = Object.fromEntries(s.formatToParts(t).map((e) => [e.type, e.value])),
                  n = "24" === a.hour ? 0 : Number(a.hour),
                  i = Date.UTC(Number(a.year), Number(a.month) - 1, Number(a.day), n, Number(a.minute), Number(a.second));
                return Math.round((i - t.getTime()) / 6e4);
              } catch {
                return -t.getTimezoneOffset();
              }
            })(e, t),
            a = new Date(t.getTime() + 6e4 * s);
          return new Date(Date.UTC(a.getUTCFullYear(), a.getUTCMonth(), a.getUTCDate()) - 6e4 * s);
        })(f),
      [f],
    ),
    $ = (0, s.useMemo)(() => {
      if (null == x || null == p) return null;
      let e = new Date(S.getTime() + 6e4 * w),
        t = (0, a.solarPosition)(x, p, e),
        s = t.altitude > 0.4 ? 1 / Math.tan((t.altitude * Math.PI) / 180) : 1 / 0;
      return {
        when: e,
        ...t,
        lengthSticks: s,
      };
    }, [x, p, w, S]),
    A = (0, s.useMemo)(() => (null != x && null != p ? (0, n.sunTimes)(x, p, S) : null), [x, p, S]),
    L = `${b}:${w}`;
  if ($ && $.altitude > 0 && L !== C) {
    T(L);
    let e = o.find((e) => e.rung === b && !v.includes(e.id));
    e && e.hit($) && M((t) => [...t, e.id]);
  }
  if (null == x || null == p || !$ || !A)
    return (
      <div className="card p-6">
        <p className="eyebrow text-gold">The shadow clock</p>
        <p className="mt-2 text-ink-2">
          This draws your own shadow, at your own latitude, hour by hour — so it needs to know where you are. Set a location anywhere on the
          site and come back.
        </p>
      </div>
    );
  let F = $.altitude > 0,
    D = !isFinite($.lengthSticks) || $.lengthSticks > 6,
    O = F ? Math.min($.lengthSticks, 6) : 0,
    P = ($.azimuth + 180) % 360,
    z = o.filter((e) => e.rung === b),
    U = z.find((e) => !v.includes(e.id)) ?? null,
    W = z.find((e) => v.includes(e.id) && e.hit($)),
    R = l(new Date(S.getTime() + 6e4 * w), f),
    G = ((P - 90) * Math.PI) / 180,
    B = r3(110 + Math.cos(G) * O * 26),
    I = r3(110 + Math.sin(G) * O * 26);
  return (
    <div className="card p-5 sm:p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <p className="eyebrow text-gold">The shadow clock{g ? ` \xb7 ${g}` : ""}</p>
        <div className="flex gap-1.5">
          {i.RUNGS.map((e) => (
            <button
              key={e.id}
              type="button"
              aria-pressed={e.id === b}
              onClick={() => {
                (j(e.id), M([]));
              }}
              className={`rounded-full border px-2.5 py-1 text-xs font-medium transition ${e.id === b ? "border-moss bg-moss/10 text-moss-2" : "border-line text-ink-2 hover:border-moss/50"}`}
            >
              {e.age}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-4 grid gap-5 sm:grid-cols-[minmax(0,240px)_minmax(0,1fr)] sm:items-start">
        <div className="mx-auto w-full max-w-[240px]">
          <svg
            viewBox="0 0 220 220"
            className="w-full"
            role="img"
            aria-label={`Shadow pointing ${(0, a.compassName)(P)}, ${O.toFixed(1)} stick lengths`}
          >
            <circle cx={110} cy={110} r="104" fill="#efe7d7" stroke="#d9cfb8" />
            {[0, 90, 180, 270].map((e) => {
              let s = ((e - 90) * Math.PI) / 180;
              return (
                <text key={e} x={110 + 94 * Math.cos(s)} y={110 + 94 * Math.sin(s) + 4} textAnchor="middle" fontSize="11" fill="#4a5a4f">
                  {["N", "E", "S", "W"][e / 90]}
                </text>
              );
            })}
            {k.map((e) => {
              let s = (0, a.solarPosition)(x, p, new Date(S.getTime() + 6e4 * e));
              if (s.altitude <= 0.4) return null;
              let n = Math.min(1 / Math.tan((s.altitude * Math.PI) / 180), 6),
                i = ((((s.azimuth + 180) % 360) - 90) * Math.PI) / 180;
              return <circle key={e} cx={r3(110 + Math.cos(i) * n * 26)} cy={r3(110 + Math.sin(i) * n * 26)} r="4.5" fill="#a89a7c" />;
            })}
            {F && (
              <>
                <line x1={110} y1={110} x2={B} y2={I} stroke="#4a5a4f" strokeWidth="9" strokeLinecap="round" opacity="0.55" />
                <circle cx={B} cy={I} r="6" fill="#2f5d3a" />
              </>
            )}
            <circle cx={110} cy={110} r="7" fill="#1f2a22" />
            {!F && (
              <text x={110} y={144} textAnchor="middle" fontSize="12" fill="#4a5a4f">
                the sun is down
              </text>
            )}
          </svg>
        </div>
        <div>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="rounded-lg bg-paper-2/60 px-2 py-2">
              <p className="eyebrow">Time</p>
              <p className="font-display text-lg font-semibold leading-tight">{R}</p>
            </div>
            <div className="rounded-lg bg-paper-2/60 px-2 py-2">
              <p className="eyebrow">Shadow</p>
              <p className="font-display text-lg font-semibold leading-tight">
                {F ? (D ? "off the lawn" : `${$.lengthSticks.toFixed(1)} sticks`) : "—"}
              </p>
            </div>
            <div className="rounded-lg bg-paper-2/60 px-2 py-2">
              <p className="eyebrow">Points</p>
              <p className="font-display text-lg font-semibold leading-tight capitalize">{F ? (0, a.compassName)(P) : "—"}</p>
            </div>
          </div>
          <label className="mt-4 block">
            <span className="sr-only">Time of day</span>
            <input
              type="range"
              min={0}
              max={1439}
              step={5}
              value={w}
              onChange={(e) => y(Number(e.target.value))}
              className="w-full accent-moss"
            />
          </label>
          <div className="flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={() => y((e) => Math.max(0, e - 30))}
              className="rounded-full border border-line px-3 py-1.5 text-sm font-medium text-ink-2 hover:border-moss hover:text-moss"
            >
              ← earlier
            </button>
            <button
              type="button"
              onClick={() => N((e) => (e.includes(w) ? e : [...e, w]))}
              className="rounded-full bg-moss px-4 py-1.5 text-sm font-medium text-paper hover:bg-moss-2"
            >
              Put a stone here
            </button>
            <button
              type="button"
              onClick={() => y((e) => Math.min(1439, e + 30))}
              className="rounded-full border border-line px-3 py-1.5 text-sm font-medium text-ink-2 hover:border-moss hover:text-moss"
            >
              later →
            </button>
          </div>
          <div className="mt-4 rounded-xl border-l-4 border-l-gold bg-paper-2/60 p-3.5">
            {U ? (
              <>
                <p className="eyebrow text-gold">Try this</p>
                <p className="mt-1 font-medium leading-snug">{U.ask}</p>
              </>
            ) : (
              <>
                <p className="eyebrow text-gold">All of them</p>
                <p className="mt-1 font-medium leading-snug">
                  You have found every one. Try the next age up, or go and put a real stick in the lawn.
                </p>
              </>
            )}
            {W && (
              <>
                <p className="eyebrow mt-3 text-moss">
                  {"Found it — "}
                  {W.ask.replace(/\.$/, "").toLowerCase()}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-ink-2">{W.yes}</p>
              </>
            )}
          </div>
          <p className="mt-3 text-xs leading-relaxed text-ink-2/85">
            {"Sunrise "}
            {A.sunrise ? l(A.sunrise, f) : "—"}, sunset {A.sunset ? l(A.sunset, f) : "—"}
            {
              " — shadow length is in stick-heights, so a two-metre child casts a shadow two of these long. Below about half a degree of altitude the shadow runs further than any lawn and is drawn clipped."
            }
          </p>
        </div>
      </div>
    </div>
  );
};
