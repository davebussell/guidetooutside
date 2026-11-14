"use client";
/**
 * "The towns of the region, compared": every pre-built town in one sortable
 * table. Rendered on the server in zone order and sortable once hydrated; on
 * phones the same rows are cards. Links to each town's own guide work
 * without JavaScript.
 */
import Link from "next/link";
import { useState } from "react";
import { RAIN_WORDS, SHORT, degC, frostFreeText, frostText, waterLabel } from "@/lib/regions/format";
import type { TownOrgs, TownRow } from "@/lib/regions/types";

type Key = "name" | "zone" | "frost" | "free" | "rain" | "wet" | "cold" | "hot" | "water" | "elev" | "orgs" | "gardens";

const COLS: { key: Key; label: string; short: string; num?: boolean }[] = [
  { key: "name", label: "Town", short: "Town" },
  { key: "zone", label: "Zone", short: "Zone", num: true },
  { key: "frost", label: "Last – first frost", short: "Frost", num: true },
  { key: "free", label: "Frost-free", short: "Frost-free", num: true },
  { key: "rain", label: "Precipitation a year", short: "Precip.", num: true },
  { key: "wet", label: "Wettest · driest", short: "Wettest · driest" },
  { key: "cold", label: "Coldest month", short: "Coldest", num: true },
  { key: "hot", label: "Hottest month", short: "Hottest", num: true },
  { key: "water", label: "Water", short: "Water" },
  { key: "elev", label: "Elevation", short: "Elevation", num: true },
];

/** The column the conservation library adds, when any town has a local organisation. */
const ORG_COL: { key: Key; label: string; short: string; num?: boolean } = { key: "orgs", label: "Local organisations", short: "Local orgs", num: true };
/** The named community gardens and allotments within 15 km (OpenStreetMap), when any town has one. */
const GARDEN_COL: { key: Key; label: string; short: string; num?: boolean } = { key: "gardens", label: "Community gardens", short: "Gardens", num: true };

const nul = (x: number | null, dir: 1 | -1) => (x == null ? (dir === 1 ? Infinity : -Infinity) : x);

type OrgCounts = Record<string, Pick<TownOrgs, "local" | "nearby">>;

function sortValue(t: TownRow, key: Key, dir: 1 | -1, orgs?: OrgCounts, gardens?: Record<string, number>): number | string {
  switch (key) {
    case "orgs":
      return orgs?.[t.slug]?.local ?? 0;
    case "gardens":
      return gardens?.[t.slug] ?? 0;
    case "name":
      return t.name;
    case "zone":
      return t.zone ? parseInt(t.zone, 10) * 2 + (t.zone.endsWith("b") ? 1 : 0) : nul(null, dir);
    case "frost":
      return t.frostRare ? nul(null, dir) : nul(t.lastFrostDoy, dir);
    case "free":
      return nul(t.frostFreeDays, dir);
    case "rain":
      return nul(t.rainMm, dir);
    case "wet":
      return t.wettest ?? 13;
    case "cold":
      return nul(t.coldestC, dir);
    case "hot":
      return nul(t.warmestC, dir);
    case "water":
      return `${["coast", "near-coast", "lake", "river", "inland"].indexOf(t.water)}${t.waterName ?? ""}`;
    case "elev":
      return nul(t.elevationM, dir);
  }
}

const mon = (m: number | null) => (m == null ? "—" : SHORT[m - 1]);

/** The zone, with a mark where it is estimated rather than from an official map. */
const Zone = ({ t }: { t: TownRow }) =>
  t.zone ? (
    <>
      {t.zone}
      {t.zoneSource === "estimated" && (
        <sup className="ml-0.5 text-[10px] text-ink-2" title="Estimated from the ERA5 extreme minimum; no official zone map covers this town">
          e
        </sup>
      )}
    </>
  ) : (
    <>—</>
  );

/** The frost dates, with a mark where they come from the grid rather than from stations. */
const Frost = ({ t }: { t: TownRow }) => (
  <>
    {frostText(t)}
    {t.hasClimate && t.frostSource === "grid" && !t.frostRare && (
      <sup className="ml-0.5 text-[10px] text-ink-2" title="From the ERA5 grid at 4.5 °C; no weather station with long records within 15 km">
        g
      </sup>
    )}
  </>
);

const Rain = ({ t }: { t: TownRow }) =>
  t.rainMm == null ? (
    <>—</>
  ) : (
    <>
      {t.rainMm.toLocaleString("en")} mm <span className="text-ink-2">· {t.rain ? RAIN_WORDS[t.rain] : ""}</span>
    </>
  );

/** "13 in our library: 5 nearby, 8 across its province, state or region". */
const orgTitle = (o: Pick<TownOrgs, "local" | "nearby"> | undefined) =>
  !o?.local ? "No local organisation in our library yet" : `${o.local} in our library: ${o.nearby} nearby, ${o.local - o.nearby} across its province, state or region`;

export function TownTable({ towns, regionName, orgs, gardens }: { towns: TownRow[]; regionName: string; orgs?: OrgCounts; gardens?: Record<string, number> }) {
  const [sort, setSort] = useState<{ key: Key; dir: 1 | -1 }>({ key: "zone", dir: 1 });
  // Where every town has none, the column is left out rather than shown as a column of zeros.
  const withOrgs = !!orgs && towns.some((t) => (orgs[t.slug]?.local ?? 0) > 0);
  const withGardens = !!gardens && towns.some((t) => (gardens[t.slug] ?? 0) > 0);
  const cols = [...COLS, ...(withOrgs ? [ORG_COL] : []), ...(withGardens ? [GARDEN_COL] : [])];
  const rows = [...towns].sort((a, b) => {
    const va = sortValue(a, sort.key, sort.dir, orgs, gardens);
    const vb = sortValue(b, sort.key, sort.dir, orgs, gardens);
    const c = typeof va === "number" && typeof vb === "number" ? va - vb : String(va).localeCompare(String(vb));
    return (c || a.name.localeCompare(b.name)) * sort.dir;
  });
  const toggle = (key: Key) => setSort((s) => (s.key === key ? { key, dir: s.dir === 1 ? -1 : 1 } : { key, dir: 1 }));
  const anyEstimated = towns.some((t) => t.zoneSource === "estimated");
  const anyGrid = towns.some((t) => t.frostSource === "grid" && !t.frostRare);
  const noRain = towns.filter((t) => t.hasClimate && !t.hasRain);

  const cell = (t: TownRow, key: Key) => {
    switch (key) {
      case "name":
        return (
          <Link href={`/guide/${t.slug}`} className="font-medium text-ink hover:text-moss">
            {t.name}
            <span className="block text-xs font-normal text-ink-2">{t.countryCode === "US" || t.countryCode === "CA" ? t.admin1 : t.country}</span>
          </Link>
        );
      case "zone":
        return <Zone t={t} />;
      case "frost":
        return <Frost t={t} />;
      case "free":
        return frostFreeText(t);
      case "rain":
        return <Rain t={t} />;
      case "wet":
        return t.wettest ? `${mon(t.wettest)} · ${mon(t.driest)}` : "—";
      case "cold":
        return t.coldestC == null ? "—" : `${degC(t.coldestC)} ${mon(t.coldestMonth)}`;
      case "hot":
        return t.warmestC == null ? "—" : `${degC(t.warmestC)} ${mon(t.warmestMonth)}`;
      case "water":
        return waterLabel(t);
      case "elev":
        return t.elevationM == null ? "—" : `${t.elevationM.toLocaleString("en")} m`;
      case "gardens": {
        const n = gardens?.[t.slug] ?? 0;
        return <span title={n ? `${n === 10 ? "10 or more" : n} named within 15 km on OpenStreetMap` : "None named within 15 km on OpenStreetMap"}>{n ? (n === 10 ? "10+" : n) : "—"}</span>;
      }
      case "orgs": {
        const o = orgs?.[t.slug];
        return (
          <span title={orgTitle(o)}>
            {o?.local ? o.local : "—"}
            {o?.nearby ? <span className="text-ink-2"> · {o.nearby} nearby</span> : null}
          </span>
        );
      }
    }
  };

  return (
    <div>
      {/* The table, from tablet width up. */}
      <div className="hidden md:block -mx-4 overflow-x-auto px-4 lg:mx-0 lg:px-0">
        <table className="w-full min-w-[880px] border-collapse text-sm">
          <caption className="sr-only">The pre-built towns of {regionName}, compared</caption>
          <thead>
            <tr className="border-b-2 border-ink text-left">
              {cols.map((c) => {
                const active = sort.key === c.key;
                return (
                  <th key={c.key} scope="col" aria-sort={active ? (sort.dir === 1 ? "ascending" : "descending") : "none"} className="py-2 pr-3 align-bottom font-semibold">
                    <button type="button" onClick={() => toggle(c.key)} className={`inline-flex items-center gap-1 text-left hover:text-moss ${active ? "text-moss" : ""}`}>
                      {c.label}
                      <span aria-hidden="true" className={`text-[10px] ${active ? "" : "opacity-30"}`}>
                        {active && sort.dir === -1 ? "▼" : "▲"}
                      </span>
                    </button>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {rows.map((t) => (
              <tr key={t.slug} className="border-b border-line align-top">
                {cols.map((c) => (
                  <td key={c.key} className={`py-2 pr-3 ${c.num ? "tabular-nums whitespace-nowrap" : ""} ${c.key === "name" ? "" : "text-ink"}`}>
                    {cell(t, c.key)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* The same rows as cards on a phone. */}
      <div className="md:hidden">
        <label className="flex items-center gap-2 text-sm text-ink-2">
          Sort by
          <select
            value={sort.key}
            onChange={(e) => setSort({ key: e.target.value as Key, dir: 1 })}
            className="rounded-tile border border-edge bg-surface px-2 py-1 text-sm text-ink"
          >
            {cols.map((c) => (
              <option key={c.key} value={c.key}>
                {c.label}
              </option>
            ))}
          </select>
          <button type="button" onClick={() => setSort((s) => ({ ...s, dir: s.dir === 1 ? -1 : 1 }))} className="rounded-full border border-edge px-2.5 py-1 text-xs text-ink" aria-label="Reverse the order">
            {sort.dir === 1 ? "▲ low to high" : "▼ high to low"}
          </button>
        </label>
        <ul className="mt-3 grid gap-3">
          {rows.map((t) => (
            <li key={t.slug} className="card p-4">
              <Link href={`/guide/${t.slug}`} className="font-display text-lg font-semibold text-ink hover:text-moss">
                {t.name}
              </Link>
              <span className="ml-2 text-xs text-ink-2">{t.countryCode === "US" || t.countryCode === "CA" ? t.admin1 : t.country}</span>
              <dl className="mt-2 grid grid-cols-[7rem_1fr] gap-x-3 gap-y-1 text-sm">
                {cols.filter((c) => c.key !== "name").map((c) => (
                  <div key={c.key} className="contents">
                    <dt className="text-ink-2">{c.short}</dt>
                    <dd className={c.num ? "tabular-nums" : ""}>{cell(t, c.key)}</dd>
                  </div>
                ))}
              </dl>
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-3 text-xs leading-relaxed text-ink-2">
        Zones from the official USDA 2023 and NRCan maps where one covers the town
        {anyEstimated && (
          <>
            ; <sup>e</sup> marks a zone estimated from the ten-year mean annual extreme minimum (ERA5) on the USDA scale
          </>
        )}
        . Frost dates from GHCN weather stations within 15 km
        {anyGrid && (
          <>
            ; <sup>g</sup> marks the ERA5 grid read at 4.5 °C instead
          </>
        )}
        . &ldquo;Frost rare&rdquo; is what the record says where no average frost date exists.{" "}
        {/* Day 5 audit, 14 November 2026: this said every town's rain and monthly temperatures were ten-year ERA5 means, but 74
            towns now read a station's temperature normals (scripts/build-station-normals.ts) and most read a station's
            precipitation (src/lib/climate-fallback RAIN_RADIUS_KM). The rows do not carry the source, so the note says where
            each comes from and leaves the naming to each town's page. */}
        Precipitation and the wettest and driest months are a weather station&rsquo;s 1991&ndash;2020 record where one is within 15 km, otherwise ten-year ERA5 means;
        the coldest and hottest months are a nearby station&rsquo;s normals where we have read them, otherwise ten-year ERA5 means, and each town&rsquo;s page names which.
        Elevation is the grid cell&rsquo;s. Water is Natural Earth&rsquo;s coast, big lake or big river at the town; each town&rsquo;s own
        fishing page lists the named waters within 20 km.
        {noRain.length > 0 && ` No rain was recorded for ${noRain.map((t) => t.name).join(", ")} when its climate was read, so those columns show —.`}
        {withOrgs &&
          " Local organisations are those in the site's conservation library whose home water, radius or listed towns take in the town (nearby) or whose province, state or region does; the national and international bodies, which cover every town, are left out."}
        {withGardens && (
          <>
            {" "}
            Community gardens are the named community gardens and allotments within 15 km of the town centre on{" "}
            <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer" className="underline decoration-line underline-offset-2 hover:text-ink">
              OpenStreetMap
            </a>{" "}
            (© OpenStreetMap contributors), counted to ten; each town&rsquo;s gardening page lists them.
          </>
        )}
      </p>
    </div>
  );
}
