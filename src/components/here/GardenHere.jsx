"use client";
// Restored from client module 54475 (exports: FrostHere, FrostWatchHere, SowHere, YourGardenYear)
import * as t from "react/jsx-runtime";
import * as a from "next/link";
import * as o from "@/lib/use-here";
import * as i from "@/lib/garden-year";
import { HARDINESS as n } from "@/lib/crops";

let h = (e) => `${Math.round(((e - 1) / 365) * 1e3) / 10}%`,
  l = (e) => `${Math.min(94, Math.max(6, Math.round(((e - 1) / 365) * 1e3) / 10))}%`,
  d = [
    {
      id: "rest",
      from: 1,
      to: 32,
    },
    {
      id: "start",
      from: 32,
      to: 60,
    },
    {
      id: "sow",
      from: 60,
      to: 121,
    },
    {
      id: "grow",
      from: 121,
      to: 182,
    },
    {
      id: "harvest",
      from: 182,
      to: 305,
    },
    {
      id: "bed",
      from: 305,
      to: 335,
    },
    {
      id: "rest",
      from: 335,
      to: 366,
    },
  ];
function CU_({ year: e, frost: o, today: r, placeName: s, compact: n = false, links: p = true }) {
  let c = e.phase,
    f = (0, i.gardenMonths)(o?.south),
    g = (
      e.tropical
        ? [
            {
              id: "grow",
              from: 1,
              to: 366,
            },
          ]
        : e.byMonth
          ? d
          : e.bands
    ).flatMap((e) =>
      e.from <= e.to
        ? [
            {
              ...e,
            },
          ]
        : [
            {
              ...e,
              to: 366,
            },
            {
              ...e,
              from: 1,
            },
          ],
    ),
    w =
      o && !e.byMonth
        ? [
            {
              doy: o.lastDoy,
              label: "last frost",
            },
            {
              doy: o.firstDoy,
              label: "first frost",
            },
          ]
        : [];
  return (
    <section
      className="rounded-card border p-5 sm:p-6"
      style={{
        borderColor: `${c.colour}66`,
        background: `linear-gradient(180deg, ${c.tint} 0%, var(--surface) 70%)`,
      }}
    >
      <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-2">
        <div className="min-w-0">
          <p
            className="eyebrow"
            style={{
              color: `color-mix(in srgb, ${c.colour} 65%, var(--ink))`,
            }}
          >
            The garden year{s ? ` \xb7 ${s}` : ""}
          </p>
          <h2 className={`font-display mt-1 font-semibold tracking-tight ${n ? "text-2xl sm:text-3xl" : "text-3xl sm:text-4xl"}`}>
            {c.name}
          </h2>
          <p className={`mt-1 max-w-2xl text-ink-2 ${n ? "text-sm" : ""}`}>{c.doing}</p>
        </div>
        {!n && <p className="max-w-md text-sm text-ink">{c.work.join(" · ")}</p>}
      </div>
      <div className="mt-5" role="img" aria-label={`The garden year: today is in the ${c.name.toLowerCase()} phase`}>
        <div className="relative">
          <div className="relative h-10 w-full overflow-hidden rounded-md bg-paper-2 sm:h-14">
            {g.map((e, a) => (
              <div
                key={`${e.id}-${a}`}
                className="absolute inset-y-0"
                style={{
                  left: h(e.from),
                  width: `calc(${h(e.to)} - ${h(e.from)})`,
                  background: i.PHASES[e.id].colour,
                  opacity: e.id === c.id ? 0.95 : 0.35,
                }}
              />
            ))}
            {f.map((e, a) => (
              <div
                key={a}
                className="absolute inset-y-0 w-px bg-surface/70"
                style={{
                  left: h(1 + Math.round((365 * a) / 12)),
                }}
              />
            ))}
            {w.map((e) => (
              <div
                key={e.label}
                className="absolute inset-y-0 w-0 border-l-2 border-dashed border-ink"
                style={{
                  left: h(e.doy),
                }}
              />
            ))}
            <div
              className="absolute inset-y-0 w-[3px] -translate-x-1/2 bg-ink"
              style={{
                left: h(r),
              }}
            />
            <div
              className="absolute -top-px h-0 w-0 -translate-x-1/2 border-x-[7px] border-t-[8px] border-x-transparent border-t-ink"
              style={{
                left: h(r),
              }}
            />
          </div>
          <div className="mt-1 grid grid-cols-12 text-[11px] text-ink-2 sm:text-xs">
            {f.map((e, a) => (
              <span key={a}>{e}</span>
            ))}
          </div>
          <div className="relative mt-0.5 h-5 text-[11px] sm:text-xs">
            <span
              className="absolute -translate-x-1/2 whitespace-nowrap font-bold text-ink"
              style={{
                left: l(r),
              }}
            >
              today
            </span>
            {w.map((e) => {
              let a,
                o = 45 > Math.abs((a = (((r - e.doy) % 365) + 365) % 365) <= 182 ? a : a - 365);
              return (
                <span
                  key={e.label}
                  className={`absolute -translate-x-1/2 whitespace-nowrap text-ink ${o ? "top-4" : ""}`}
                  style={{
                    left: l(e.doy),
                  }}
                >
                  {"❄ "}
                  {e.label}
                </span>
              );
            })}
          </div>
        </div>
      </div>
      <div className={`mt-2 grid gap-1 text-ink ${n ? "text-sm" : ""}`}>
        <p>{e.where}</p>
        <p className="text-ink-2">{e.next}</p>
      </div>
      {p && !n && (
        <div className="mt-4 flex flex-wrap gap-2 text-sm">
          {("harvest" === c.id || "bed" === c.id) && (
            <>
              <a.default href="/gardening/crops" className="rounded-full bg-moss px-4 py-2 font-semibold text-on-moss transition hover:bg-moss-2">
                Crops in season →
              </a.default>
              <a.default
                href="/gardening/preserving"
                className="rounded-full border border-edge bg-surface px-4 py-2 font-medium text-ink hover:border-moss hover:text-moss"
              >
                Preserving methods
              </a.default>
            </>
          )}
          {("rest" === c.id || "start" === c.id) && (
            <>
              <a.default href="/gardening/seeds" className="rounded-full bg-moss px-4 py-2 font-semibold text-on-moss transition hover:bg-moss-2">
                Seed saving and ordering →
              </a.default>
              <a.default
                href="/gardening/crops"
                className="rounded-full border border-edge bg-surface px-4 py-2 font-medium text-ink hover:border-moss hover:text-moss"
              >
                Crops and bed planning
              </a.default>
            </>
          )}
          {("sow" === c.id || "grow" === c.id) && (
            <>
              <a.default href="/gardening/crops" className="rounded-full bg-moss px-4 py-2 font-semibold text-on-moss transition hover:bg-moss-2">
                Crops and sowing times →
              </a.default>
              <a.default
                href="/zones"
                className="rounded-full border border-edge bg-surface px-4 py-2 font-medium text-ink hover:border-moss hover:text-moss"
              >
                Hardiness zones
              </a.default>
            </>
          )}
        </div>
      )}
    </section>
  );
}
let p = (e, t) =>
  new Date(`${e}T12:00:00`).toLocaleDateString("en-CA", {
    weekday: "long",
    ...(t
      ? {
          timeZone: t,
        }
      : {}),
  });
export const FrostHere = function ({ crop: e }) {
  let r,
    s = (0, o.useHere)();
  if (!s.place || s.loading || !s.lows.length) return null;
  let i = e.harvestMonths.includes(s.region?.south ? ((s.month + 5) % 12) + 1 : s.month),
    h = s.lows.filter((e) => e.tMin <= 2),
    l = "mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 rounded-tile border px-4 py-2.5 text-sm";
  if (!h.length) {
    let e = Math.min(...s.lows.map((e) => e.tMin));
    return (
      <div className={`${l} border-line bg-paper-2/60`}>
        <span className="text-ink">
          <span className="font-semibold">
            {"Near "}
            {s.town}
          </span>
          {": no frost in the next week (coldest night "}
          {Math.round(e)}
          {" °C)"}
          {i ? "; no need to pick yet." : "."}
        </span>
        <a.default href={`/gardening/${s.place.slug}`} className="font-semibold text-moss hover:underline">
          {"Garden guide for "}
          {s.town}
          {" →"}
        </a.default>
      </div>
    );
  }
  let d = h.reduce((e, t) => (t.tMin < e.tMin ? t : e)),
    u = d.tMin - 1,
    c =
      ((r = n[e.hardiness]),
      e.frostLimits ?? {
        damageC: r.minC,
        deadC: r.deadC,
      }),
    f =
      u <= c.deadC
        ? "harvest before dark"
        : u <= c.damageC
          ? "cover overnight"
          : "tender" === e.hardiness || "half-hardy" === e.hardiness
            ? "safe tonight; colder nights will damage it"
            : "safe; light frost improves flavour",
    g = u <= c.deadC ? "border-rust/40 bg-rust-soft" : u <= c.damageC ? "border-gold-fill/60 bg-gold-fill/15" : "border-moss/40 bg-moss-soft";
  return (
    <div className={`${l} ${g}`}>
      <span className="text-ink">
        <span className="font-semibold">
          {d.tMin > 0 ? "Frost risk" : "Frost"}
          {" near "}
          {s.town}
        </span>{" "}
        {p(d.date, s.tz)}
        {": "}
        {Math.round(d.tMin)}
        {" °C — "}
        <span className="font-semibold">{f}</span>
        {i ? "." : " (not usually in the ground this month)."}
      </span>
      <a.default href={`/gardening/${s.place.slug}#frost`} className="font-semibold text-moss hover:underline">
        {"Frost forecast for "}
        {s.town}
        {" →"}
      </a.default>
    </div>
  );
};
export const FrostWatchHere = function () {
  let e = (0, o.useHere)();
  if (!e.place) return null;
  if (e.loading) return <div className="h-24 animate-pulse rounded-tile bg-paper-2/60" aria-hidden="true" />;
  let r = e.lows.filter((e) => e.tMin <= 2);
  if (!r.length) {
    let o = e.lows.length ? Math.round(Math.min(...e.lows.map((e) => e.tMin))) : null;
    return (
      <div className="rounded-tile bg-moss-soft px-5 py-4">
        <p className="eyebrow text-moss">
          {"Frost forecast · "}
          {e.town}
        </p>
        <p className="mt-1 text-ink">No frost in the next seven days{null != o ? `; coldest night ${o} \xb0C` : ""}.</p>
        <a.default href={`/gardening/${e.place.slug}`} className="mt-1 inline-block text-sm font-semibold text-moss hover:underline">
          {"Garden guide for "}
          {e.town}
          {" →"}
        </a.default>
      </div>
    );
  }
  let s = r.reduce((e, t) => (t.tMin < e.tMin ? t : e));
  return (
    <div className="rounded-tile bg-rust-soft px-5 py-4">
      <p className="eyebrow text-rust">
        {"Frost forecast · "}
        {e.town}
      </p>
      <p className="font-display mt-1 text-xl font-semibold">
        {s.tMin > 0 ? "Frost risk" : "Frost"} {p(s.date, e.tz)}
        {" night: down to "}
        {Math.round(s.tMin)}
        {" °C"}
      </p>
      <p className="mt-1 text-sm text-ink-2">
        Harvest tomatoes, peppers, squash, beans and basil. Cover chard and lettuce. Kale, carrots and cabbage can stay in the ground; frost
        improves their flavour.
      </p>
      <a.default href={`/gardening/${e.place.slug}#frost`} className="mt-2 inline-block text-sm font-semibold text-moss hover:underline">
        {"Crop by crop for "}
        {e.town}
        {" →"}
      </a.default>
    </div>
  );
};
export const SowHere = function ({ sow: e, name: a }) {
  var r, s, n;
  let h = (0, o.useHere)();
  if (!h.place || !h.frost) return null;
  let l = h.frost;
  return (
    <div className="mt-4 rounded-tile border border-moss/40 bg-moss-soft px-4 py-3 text-sm">
      <p className="text-ink">
        <span className="font-semibold">
          {"Near "}
          {h.town}
        </span>
        {" the average last frost is "}
        <span className="font-semibold">{l.lastLabel}</span>
        {e.indoorsWeeksBeforeLastFrost ? (
          <>
            {", so start "}
            {a.toLowerCase()}
            {" indoors around "}
            <span className="font-semibold">
              {
                ((r = l.lastDoy),
                (s = -7 * e.indoorsWeeksBeforeLastFrost),
                (n = l.south),
                (0, i.gardenDayToDate)(r + s, n).toLocaleDateString("en-CA", {
                  month: "long",
                  day: "numeric",
                }))
              }
            </span>
          </>
        ) : null}
        .{e.outdoors ? ` ${e.outdoors}` : ""}
      </p>
    </div>
  );
};
export const YourGardenYear = function ({ compact: e = false }) {
  let a = (0, o.useHere)(),
    // A known place whose frost dates came back "Rare" (Lisbon, Cape Town, the tropics) is frost-free, not a
    // zone-5 garden: gardenYear's calendar-led and tropical branches take a null frost record and the hemisphere.
    frostFree = !!a.place && !a.loading && !a.frost,
    south = !!a.region?.south || (!!a.place && a.place.lat < 0),
    r = a.frost
      ? {
          lastDoy: a.frost.lastDoy,
          firstDoy: a.frost.firstDoy,
          frostFreeDays: a.frost.frostFreeDays,
          south: a.frost.south,
        }
      : frostFree
        ? null
        : i.DEFAULT_FROST,
    s = new Date(),
    n = (0, i.gardenYear)(s, r, {
      tropical: !!a.place && (0, i.isTropical)(a.place.lat),
      south,
    });
  // While the place's frost record is on its way, a skeleton rather than a zone-5 garden with the wrong name on it.
  if (a.place && a.loading) return <div className={`${e ? "h-40" : "h-72"} animate-pulse rounded-card bg-paper-2/60`} aria-hidden="true" />;
  return (
    <div>
      <CU_
        year={n}
        frost={r}
        today={(0, i.gardenDoy)(s, r ? r.south : south)}
        placeName={a.frost || frostFree ? (a.town ?? undefined) : "a typical zone-5 garden"}
        compact={e}
      />
      {!a.place && <p className="mt-2 text-sm text-ink-2">Set a location to redraw this from local frost dates.</p>}
      {frostFree && (
        <p className="mt-2 text-sm text-ink-2">
          {"Frost is rare in "}
          {a.town}
          {n.tropical
            ? ": the rains, not the cold, set the year, and the local guide reads it from "
            : `, so the phases above follow the calendar${a.region?.south ? " (southern hemisphere)" : ""} rather than frost dates; the local guide reads the year from `}
          {a.town}
          {n.tropical ? "'s own rainfall months." : "'s own rains and heat."}
        </p>
      )}
    </div>
  );
};
