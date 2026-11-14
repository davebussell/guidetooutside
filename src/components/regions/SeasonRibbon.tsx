/**
 * "Season across the region": twelve months in the region's own order (July
 * first south of the equator), each cell shaded by how many towns are clear
 * of frost, in their rainy or dry months, and how many wild edibles and fish
 * the libraries have in season. Read straight from the towns' records.
 */
import { MONTHS, SHORT, nameList } from "@/lib/regions/format";
import { monthSpans } from "@/lib/regime";
import type { RegionSeason, SeasonMonth } from "@/lib/regions/season";

/** "between April (Chicago) and May (Sherbrooke)", or "in June (George and Stellenbosch)" when the ends agree. */
const spreadText = (f: NonNullable<RegionSeason["lastFrost"]>) =>
  f.earliest === f.latest
    ? `in ${MONTHS[f.earliest - 1]} (${f.earliestTown === f.latestTown ? f.earliestTown : `${f.earliestTown} and ${f.latestTown}`})`
    : `between ${MONTHS[f.earliest - 1]} (${f.earliestTown}) and ${MONTHS[f.latest - 1]} (${f.latestTown})`;

type Row = { key: string; label: string; short: string; tone: string; value: (m: SeasonMonth) => number; max: number; unit: string };

function Cell({ v, max, tone, unit }: { v: number; max: number; tone: string; unit: string }) {
  const share = max > 0 ? v / max : 0;
  return (
    <div className="relative h-9 overflow-hidden rounded-[4px] bg-paper-2/70 sm:h-10" title={`${v} ${unit}`}>
      {share > 0 && <div className={`absolute inset-x-0 bottom-0 ${tone}`} style={{ height: `${Math.max(8, Math.round(share * 100))}%`, opacity: 0.35 + 0.65 * share }} />}
      <span className={`absolute inset-0 hidden items-center justify-center text-[11px] tabular-nums sm:flex ${share > 0.55 ? "text-paper" : "text-ink"}`}>{v || ""}</span>
    </div>
  );
}

export function SeasonRibbon({ season, regionName }: { season: RegionSeason; regionName: string }) {
  const s = season;
  const all: Row[] = [
    { key: "frost", label: "Towns clear of frost", short: "Frost-free", tone: "bg-moss", value: (m: SeasonMonth) => m.frostFree, max: s.towns, unit: `of ${s.towns} towns clear of frost all month` },
    { key: "wet", label: "Towns in a rainy month", short: "Rainy", tone: "bg-azure", value: (m: SeasonMonth) => m.wet, max: s.rainTowns, unit: `of ${s.rainTowns} towns in a rainy month` },
    { key: "dry", label: "Towns in a dry month", short: "Dry", tone: "bg-gold-fill", value: (m: SeasonMonth) => m.dry, max: s.rainTowns, unit: `of ${s.rainTowns} towns in a dry month` },
    { key: "species", label: "Wild edibles in season", short: "Wild food", tone: "bg-moss-2", value: (m: SeasonMonth) => m.species, max: s.peakSpecies, unit: "wild edibles in season" },
    { key: "fish", label: "Fish in season", short: "Fish", tone: "bg-azure-2", value: (m: SeasonMonth) => m.fish, max: Math.max(1, ...s.months.map((m) => m.fish)), unit: "fish in season" },
  ];
  // A row with nothing in it (no town has a dry month; no town has a wet one in a desert) is left out and said below.
  const any = (r: Row) => s.months.some((m) => r.value(m) > 0);
  const rows = all.filter((r) => (r.key === "frost" ? s.towns > 0 : r.key === "wet" || r.key === "dry" ? s.rainTowns > 0 && any(r) : true));
  const noDry = s.rainTowns > 0 && !any(all[2]);
  const noWet = s.rainTowns > 0 && !any(all[1]);

  const peakMonth = s.months.reduce((best, m) => (m.species > best.species ? m : best), s.months[0]);
  const frostLine = !s.towns
    ? null
    : s.frostTowns === 0
      ? `Frost is rare in ${s.towns === 1 ? "the one pre-built town" : `all ${s.towns} pre-built towns`}, so no frost date frames the year here: ${
          s.rain === "little-rain" ? "the cool months and irrigation set the garden year" : "planting follows the rains"
        }.`
      : s.lastFrost && s.firstFrost
        ? `The average last frost falls ${spreadText(s.lastFrost)}; the average first frost ${spreadText(s.firstFrost)}. Tender crops go out after the one and come in before the other.${s.frostRareTowns ? ` Frost is rare in ${s.frostRareTowns === 1 ? "one town" : `${s.frostRareTowns} of the ${s.towns} towns`}.` : ""}`
        : null;
  const rainLine = !s.rainTowns
    ? null
    : s.rain === "little-rain"
      ? `Most towns get very little rain in any month${noWet ? ", and none has a month wet enough to count as rainy (50 mm and above its share of the year), so that row is left out" : "; the rainy cells show the few that do"}.`
      : s.wettest.length
        ? `Most towns are in their rainy months ${monthSpans(s.wettest)}${s.rain === "two-rainy-seasons" ? " — two rainy seasons, each a planting season" : s.rain === "winter-rain" ? " — winter rain, so the cool months are the growing season" : s.rain === "summer-rain" ? " — summer rain, so planting follows the first good rains" : ""}.`
        : null;
  const forageLine = s.peakSpecies
    ? `Wild food peaks in ${MONTHS[peakMonth.m - 1]} (${s.peakSpecies} library species in season); ${monthSpans(s.forage)} ${s.forage.length === 1 ? "has" : "have"} at least two-thirds of that.`
    : null;

  return (
    <section aria-labelledby="season">
      <p className="eyebrow text-moss">Season across the region</p>
      <h2 id="season" className="font-display mt-1 text-3xl font-semibold tracking-tight sm:text-4xl">
        The year across {regionName}
      </h2>
      <p className="mt-2 max-w-3xl text-ink-2">
        {s.south ? "The ribbon starts in July, the region's winter, so its growing season reads as one piece. " : ""}
        Each cell counts towns, or species, in that calendar month: the darker the cell, the more. Frost months come from each town&rsquo;s own frost dates, rainy
        and dry months from its own Köppen reading, and the species counts from the libraries in the region&rsquo;s local calendar.
      </p>
      <div className="mt-6 overflow-hidden">
        <div className="grid grid-cols-[4.5rem_repeat(12,minmax(0,1fr))] gap-x-1 gap-y-1.5 sm:grid-cols-[11rem_repeat(12,minmax(0,1fr))] sm:gap-x-1.5">
          <div />
          {s.order.map((m) => (
            <div key={m} className="text-center text-[11px] font-semibold text-ink-2 sm:text-xs">
              <span className="sm:hidden">{SHORT[m - 1].charAt(0)}</span>
              <span className="hidden sm:inline">{SHORT[m - 1]}</span>
            </div>
          ))}
          {rows.map((r) => (
            <div key={r.key} className="contents">
              <div className="flex items-center text-xs leading-tight text-ink-2 sm:text-sm">
                <span className="sm:hidden">{r.short}</span>
                <span className="hidden sm:inline">{r.label}</span>
              </div>
              {s.order.map((m) => (
                <Cell key={m} v={r.value(s.months[m - 1])} max={r.max} tone={r.tone} unit={r.unit} />
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 grid gap-1.5 text-sm leading-relaxed text-ink-2">
        {frostLine && <p>{frostLine}</p>}
        {rainLine && <p>{rainLine}</p>}
        {noDry && <p>No town here has a dry month by Gaussen&rsquo;s rule (rain under twice the month&rsquo;s mean temperature), so that row is left out.</p>}
        {noWet && s.rain !== "little-rain" && <p>No town here has a month wet enough to count as rainy (50 mm and above its share of the year), so that row is left out.</p>}
        {forageLine && <p>{forageLine}</p>}
        {!s.towns && <p>With no pre-built towns in the region, only the library seasons can be shown; the frost and rain rows need a town&rsquo;s record.</p>}
      </div>
      {/* Day 5 audit, 14 November 2026: the note called every town's rain and temperatures ten-year ERA5 totals; most towns
          now read a station's precipitation and 74 a station's temperature normals (scripts/build-station-normals.ts). */}
      <p className="mt-3 text-xs leading-relaxed text-ink-2">
        Frost-free: the whole month lies a week or more after the town&rsquo;s average last frost and before its first (towns with frost rare count every month). Rainy
        and dry months: the town&rsquo;s own, from its monthly precipitation and mean temperatures (a weather station&rsquo;s record where we have one, otherwise ten-year
        ERA5 means; each town&rsquo;s page names which; dry by Gaussen&rsquo;s rule, rain under twice the month&rsquo;s mean temperature). Species
        counts are the library&rsquo;s months for this region{s.south ? ", read half a year on for a southern region as the town pages do" : ""}; a town&rsquo;s own list is
        further narrowed by its zone and coast.
        {s.towns > 0 && s.frostTowns > 0 && ` The spread of frost dates names ${nameList([...new Set([s.lastFrost!.earliestTown, s.lastFrost!.latestTown, s.firstFrost!.earliestTown, s.firstFrost!.latestTown])])}; every town's own dates are in the table above.`}
      </p>
    </section>
  );
}
