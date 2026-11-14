"use client";
// Restored from client module 18006 (exports: DayScrubber)
import * as t from "react/jsx-runtime";
import * as s from "next/image";
import * as i from "next/link";
import * as r from "react";
import * as a from "@/lib/daypart";
function CN_({ altitude: e, azimuth: s, compass: i, peak: r, label: a }) {
  let o = e < -0.833,
    l = 1 - Math.max(0, Math.min(1, e / Math.max(r, 1))),
    c = 100 - (s < 180 ? 1 : -1) * 78 * (o ? 0.62 : l),
    d = 96 - 78 * Math.sin((Math.max(0, Math.min(90, e)) * Math.PI) / 180),
    h = 104 + 14 * Math.min(1, Math.abs(e) / 18),
    x = 96 - 78 * Math.sin((Math.max(0, Math.min(90, r)) * Math.PI) / 180),
    f = (() => {
      let e = [];
      for (let t = 0; t <= 28; t++) {
        let s = t / 28,
          i = Math.max(0, r) * (1 - Math.abs(2 * s - 1)),
          n = 22 + 156 * s,
          a = 96 - 78 * Math.sin((i * Math.PI) / 180);
        e.push(`${n.toFixed(1)} ${a.toFixed(1)}`);
      }
      return `M${e.join(" L")}`;
    })(),
    u = ((s - 90) * Math.PI) / 180,
    m = 100 + 40 * Math.cos(u),
    p = 58 + 40 * Math.sin(u);
  return (
    <div className="grid grid-cols-2 gap-4">
      <figure className="m-0">
        <svg
          viewBox="0 0 200 142"
          className="w-full h-auto"
          role="img"
          aria-label={`The sun is ${Math.round(e)} degrees above the horizon, in the ${i}`}
        >
          <defs>
            <linearGradient id="sdSky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.14" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.02" />
            </linearGradient>
          </defs>
          <path d="M22 96 A78 78 0 0 1 178 96 Z" fill="url(#sdSky)" />
          <path d={f} fill="none" stroke="currentColor" strokeOpacity="0.35" strokeWidth="1.2" strokeDasharray="3 4" />
          <line x1={12} x2={188} y1={96} y2={96} stroke="currentColor" strokeOpacity="0.55" strokeWidth="1.4" />
          <text x={12} y={116} fontSize="9" fill="currentColor" opacity="0.5">
            east
          </text>
          <text x={188} y={116} fontSize="9" textAnchor="end" fill="currentColor" opacity="0.5">
            west
          </text>
          {r > 0 && (
            <>
              <line x1={22} x2={178} y1={x} y2={x} stroke="currentColor" strokeOpacity="0.3" strokeWidth="1" strokeDasharray="2 5" />
              {x < 80 && (
                <text x={180} y={x - 3} fontSize="8" textAnchor="end" fill="currentColor" opacity="0.45">
                  today’s highest
                </text>
              )}
            </>
          )}
          {o && <rect x={12} y={96} width={176} height="34" fill="currentColor" opacity="0.07" />}
          <line x1={100} y1={96} x2={c} y2={o ? h : d} stroke="currentColor" strokeOpacity="0.35" strokeWidth="1" />
          <circle
            cx={c}
            cy={o ? h : d}
            r="7"
            fill={o ? "none" : "#e8b74d"}
            stroke={o ? "currentColor" : "#e8b74d"}
            strokeWidth="1.6"
            strokeOpacity={o ? 0.6 : 1}
          />
          {!o && <circle cx={c} cy={d} r="12" fill="#e8b74d" opacity="0.22" />}
          <text x={100} y={134} textAnchor="middle" fontSize="11" fill="currentColor" opacity="0.75">
            {e >= 0 ? `${Math.round(e)}\xb0 above the horizon` : `${Math.round(Math.abs(e))}\xb0 below`}
          </text>
        </svg>
      </figure>
      <figure className="m-0">
        <svg viewBox="0 0 200 142" className="w-full h-auto" role="img" aria-label={`The sun is in the ${i}`}>
          <circle cx={100} cy={58} r={40} fill="none" stroke="currentColor" strokeOpacity="0.25" strokeWidth="1.2" strokeDasharray="3 4" />
          {[
            ["N", 0],
            ["E", 90],
            ["S", 180],
            ["W", 270],
          ].map(([e, s]) => {
            let i = ((s - 90) * Math.PI) / 180;
            return (
              <text
                key={e}
                x={100 + 53 * Math.cos(i)}
                y={58 + 53 * Math.sin(i) + 4}
                textAnchor="middle"
                fontSize="10"
                fill="currentColor"
                opacity="0.6"
              >
                {e}
              </text>
            );
          })}
          <circle cx={100} cy={58} r="2.5" fill="currentColor" opacity="0.5" />
          <line x1={100} y1={58} x2={m} y2={p} stroke="#e8b74d" strokeWidth="2.2" strokeLinecap="round" />
          <circle cx={m} cy={p} r="6" fill="#e8b74d" />
          <text x="100" y="134" textAnchor="middle" fontSize="11" fill="currentColor" opacity="0.75">
            {Math.round(s)}
            {"° · from the "}
            {i}
          </text>
        </svg>
      </figure>
      <p className="col-span-2 -mt-2 text-center text-xs opacity-70">{a}</p>
    </div>
  );
}
let o = {
  "first-light": "from-[#1b2a3a] to-[#2f3f4f]",
  sunrise: "from-[#3d2b2a] to-[#6b4632]",
  morning: "from-[#2c4433] to-[#3f5f42]",
  midday: "from-[#274a5c] to-[#3a6a7a]",
  afternoon: "from-[#3f4a2c] to-[#5f6a38]",
  "golden-hour": "from-[#4a3520] to-[#7a5322]",
  dusk: "from-[#2a2a40] to-[#40405e]",
  night: "from-[#12161f] to-[#1e2430]",
};
function CL_({ list: e, empty: r }) {
  return e.length ? (
    <ul className="grid gap-3">
      {e.map((e) => (
        <li key={e.slug} className="flex gap-3">
          <i.default href={`/wildlife/${e.slug}`} className="shrink-0">
            <span className="block relative w-16 h-16 rounded-lg overflow-hidden bg-paper-2">
              {e.src && <s.default src={e.src} alt={e.name} fill sizes="64px" className="object-cover" />}
            </span>
          </i.default>
          <div className="min-w-0">
            <p className="font-semibold text-sm leading-tight">
              <i.default href={`/wildlife/${e.slug}`} className="hover:text-moss">
                {e.name}
              </i.default>
              {e.peaking && (
                <span className="ml-2 rounded-full bg-gold-fill/25 text-ink-2 px-2 py-0.5 text-[10px] font-semibold align-middle">best now</span>
              )}
            </p>
            <p className="mt-0.5 text-sm text-ink-2">{e.where}</p>
          </div>
        </li>
      ))}
    </ul>
  ) : (
    <p className="text-sm text-ink-2 italic">{r}</p>
  );
}
export const DayScrubber = function ({ data: e }) {
  let s = Math.max(
      0,
      e.slides.findIndex((e) => e.isNow),
    ),
    [i, c] = (0, r.useState)(s),
    d = e.slides[i];
  if (!d) return null;
  let h = d.isNow,
    x = h ? e.nowAltitude : d.altitude,
    f = h ? e.nowAzimuth : d.azimuth,
    u = h ? e.nowCompass : d.compass;
  return (
    <div>
      <div className="card p-4 sm:p-5">
        <div className="flex items-baseline justify-between gap-3">
          <p className="eyebrow">The day, phase by phase</p>
          {i !== s && (
            <button type="button" onClick={() => c(s)} className="text-xs text-moss underline hover:no-underline">
              Back to now
            </button>
          )}
        </div>
        <div className="mt-3 -mx-1 overflow-x-auto no-scrollbar">
          <div
            role="tablist"
            aria-label="Phases of the day"
            className="flex gap-1 px-1 min-w-max"
            onKeyDown={(t) => {
              ("ArrowRight" === t.key && c((t) => Math.min(e.slides.length - 1, t + 1)),
                "ArrowLeft" === t.key && c((e) => Math.max(0, e - 1)));
            }}
          >
            {e.slides.map((e, s) => (
              <button
                key={e.phase}
                role="tab"
                aria-selected={s === i}
                tabIndex={s === i ? 0 : -1}
                onClick={() => c(s)}
                className={`relative rounded-tile px-3 py-2.5 text-left transition min-w-[7.5rem] ${s === i ? "bg-moss text-on-moss" : "bg-paper-2/70 hover:bg-moss-soft text-ink"}`}
              >
                <span className="block text-[13px] font-semibold leading-tight">{e.label}</span>
                <span className={`block text-[11px] tabular-nums ${s === i ? "text-on-moss/90" : "text-ink-2"}`}>
                  {e.from}–{e.to}
                </span>
                {e.isNow && (
                  <span
                    className={`absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full ${s === i ? "bg-gold-fill" : "bg-moss"}`}
                    aria-label="happening now"
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_1.35fr] items-start">
        <div className={`rounded-card bg-gradient-to-b ${o[d.phase]} text-[#f0ece4] p-6 border border-white/10`}>
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <p className="eyebrow !text-white/65">
              {d.isNow ? "Current phase" : "Later"}
              {" · "}
              {d.from}–{d.to}
            </p>
            <p className="text-xs text-white/65 tabular-nums">{(0, a.fmtLeft)(d.minutes)}</p>
          </div>
          <h2 className="font-display mt-1 text-3xl font-semibold tracking-tight">{d.label}</h2>
          <div className="mt-5 text-[#f0ece4]">
            <CN_
              altitude={x}
              azimuth={f}
              compass={u}
              peak={e.peakAltitude}
              label={
                h
                  ? `Current sun position. Maximum altitude today: ${e.peakAltitude}\xb0.`
                  : `Sun position at the middle of this phase. Maximum altitude today: ${e.peakAltitude}\xb0.`
              }
            />
          </div>
          <p className="mt-4 text-sm text-white/85 leading-relaxed">{d.sun}</p>
        </div>
        <div className="grid gap-5">
          {d.light && (
            <section className="card p-6">
              <p className="eyebrow text-gold">
                {"Light · "}
                {e.regionName}
              </p>
              <p className="mt-2 text-ink-2 leading-relaxed">{d.light}</p>
            </section>
          )}
          <div className="grid gap-5 sm:grid-cols-2">
            {d.micro && (
              <section className="card p-6 border-l-4 border-l-moss">
                <p className="eyebrow text-moss">Plants and soil</p>
                <p className="mt-2 text-sm text-ink-2 leading-relaxed">{d.micro}</p>
              </section>
            )}
            {d.macro && (
              <section className="card p-6 border-l-4 border-l-azure">
                <p className="eyebrow text-azure">Landscape</p>
                <p className="mt-2 text-sm text-ink-2 leading-relaxed">{d.macro}</p>
              </section>
            )}
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <section className="card p-6">
              <p className="eyebrow text-azure">Fish active</p>
              <div className="mt-3">
                <CL_ list={d.water} empty="Little fish activity in this phase." />
              </div>
              {d.captionWater && <p className="mt-4 pt-3 border-t border-line/70 text-xs text-ink-2">{d.captionWater}</p>}
            </section>
            <section className="card p-6">
              <p className="eyebrow text-moss">Garden species active</p>
              <div className="mt-3">
                <CL_ list={d.garden} empty="None of the listed garden species is active in this phase." />
              </div>
              {d.captionLand && <p className="mt-4 pt-3 border-t border-line/70 text-xs text-ink-2">{d.captionLand}</p>}
            </section>
          </div>
          {d.resting.length > 0 && (
            <section className="card p-5">
              <p className="eyebrow">Inactive in this phase</p>
              <p className="mt-1.5 text-sm text-ink-2">{d.resting.join(" · ")}</p>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};
