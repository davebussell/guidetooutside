import { weatherLabel } from "@/lib/forecast";
import { frostFree, frostSourceWords } from "@/lib/frost";
import { frostNights, perYear } from "@/lib/extremes";
import { koppenText } from "@/lib/regime";
import { frostWeekDatable } from "@/lib/frost-week";
import { zoneBasisShort, zoneSourceOf, zoneSystemHeading } from "@/lib/zone-label";
import type { LocalData } from "@/lib/types";
import { soilSowingFor, type SoilSowing } from "@/lib/soil-sowing";

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const hhmm = (iso: string) => iso.slice(11, 16);

function Stat({ label, value, sub }: { label: string; value: React.ReactNode; sub?: React.ReactNode }) {
  return (
    <div className="card rounded-tile p-4">
      <p className="eyebrow">{label}</p>
      <p className="mt-1 text-2xl font-medium leading-tight tabular-nums">{value}</p>
      {sub && <p className="mt-1 text-xs text-ink-2">{sub}</p>}
    </div>
  );
}

/** "16°C", or "16°C / 61°F" in the United States. */
export function tempText(c: number, countryCode: string): string {
  return countryCode === "US" ? `${Math.round(c)}°C / ${Math.round(c * 1.8 + 32)}°F` : `${Math.round(c)}°C`;
}

/**
 * The soil card's line. A reading says whether seed would germinate, not whether sowing is worth doing, so above
 * the germination floor the line is the town's own sowing windows for today (src/lib/soil-sowing): the crops in
 * their window, or when the next one opens. Without a worked-out calendar it says only what would germinate.
 */
export function soilWords(t: number, sowing?: SoilSowing | null): string {
  if (t < 7) return "Too cold for most seeds";
  if (sowing) {
    if (sowing.open.length) return `Sowing window open: ${sowing.open.slice(0, 3).join(", ")}${sowing.open.length > 3 ? ` and ${sowing.open.length - 3} more` : ""}`;
    return sowing.next ? `No sowing window open today; next from ${sowing.next.label}` : "No sowing window open today";
  }
  return t < 13 ? "Cool-season seeds can germinate" : t < 18 ? "Most seeds can germinate" : "Warm-season seeds can germinate";
}

/**
 * The frost-night line under a light-frost town's frost dates: one count with its station, the same figure the gardening
 * frost card and the homestead page print (extremes frostNights). Day 5 audit, 14 November 2026: this card said about
 * 41, 37 and 20 nights a year at Nanaimo, Vancouver and Victoria, pooled from several stations, against 5.5, 15 and 9.7
 * on their homestead pages. The frost dates' own source follows when it is not the same station.
 */
function frostNightsWords(slug: string, c: NonNullable<LocalData["climate"]>): string {
  const n = frostNights(slug, c);
  const dates = `dates ${frostSourceWords(c)}`;
  if (!n || n.nights < 1) return `a few nights a year · ${dates}`;
  return `about ${perYear(n.nights)} nights a year ${n.words}${n.words.startsWith("pooled") ? "" : ` · ${dates}`}`;
}

/** Today at a place: the weather now, the soil, the climate or the frost window, the sun and the moon, and the week ahead. */
export function ConditionsPanel({ data }: { data: LocalData }) {
  const { forecast: f, climate: c, moon, regime: r } = data;
  const today = f.days[0];
  const cc = data.place.countryCode;
  // The zone and frost window where frost is a fact of the year (dated frosts); the climate and the month's precipitation where it is not.
  const frostLed = !r || r.frostLed || !frostFree(c);
  const fullMoon = new Date(moon.nextFull + "T12:00:00").toLocaleDateString("en-GB", { day: "numeric", month: "short" });
  return (
    <section aria-label="Current conditions">
      <div className="grid gap-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
        <Stat label="Current" value={tempText(f.current.temp, cc)} sub={`${weatherLabel(f.current.code)} · wind ${Math.round(f.current.wind)} km/h · ${f.current.humidity}% RH`} />
        <Stat
          label="Soil (6 cm)"
          value={f.soilTemp6cm != null ? tempText(f.soilTemp6cm, cc) : "—"}
          sub={f.soilTemp6cm == null ? "unavailable" : soilWords(f.soilTemp6cm, soilSowingFor(data))}
        />
        {frostLed ? (
          <>
            <Stat label={c ? zoneSystemHeading(zoneSourceOf(c)) : "Hardiness zone"} value={c ? c.zone : "—"} sub={c ? zoneBasisShort(c) : "unavailable"} />
            <Stat
              label={r && !r.frostLed ? "Frost nights" : "Frost window"}
              value={c ? (r && !r.frostLed ? `${c.firstFallFrost} – ${c.lastSpringFrost}` : `${c.lastSpringFrost} – ${c.firstFallFrost}`) : "—"}
              sub={
                c
                  ? r && !r.frostLed
                    ? frostNightsWords(data.place.slug, c)
                    : data.daysToFirstFrost != null && frostWeekDatable(c)
                      ? `~${c.frostFreeDays} frost-free days · first frost in ~${data.daysToFirstFrost} days · ${frostSourceWords(c)}`
                      : `~${c.frostFreeDays} frost-free days (avg) · ${frostSourceWords(c)}`
                  : "unavailable"
              }
            />
          </>
        ) : (
          <>
            <Stat label="Climate" value={r!.name} sub={`${c ? koppenText(c, data.place.lat, r!.koppen) : `Köppen ${r!.koppen}`} · ${r!.annualRainMm} mm of precipitation a year${c?.rainSource === "station" ? " (station record)" : ""}`} />
            <Stat
              label={`Precipitation in ${MONTHS[data.month - 1]}`}
              value={`${c?.monthlyRainMm?.[data.month - 1] ?? "—"} mm`}
              sub={r!.wetMonths.includes(data.month) ? "A rainy month here" : r!.dryMonths.includes(data.month) ? "A dry month here" : "Average for the month"}
            />
          </>
        )}
        <Stat label="Sun" value={`${hhmm(today.sunrise)} – ${hhmm(today.sunset)}`} sub="sunrise – sunset today" />
        <Stat
          label="Moon"
          value={moon.phaseName}
          sub={`${moon.illumination}% lit · solunar rating (traditional): ${moon.fishingRating.toLowerCase()} · full moon ${fullMoon}`}
        />
      </div>

      <div className="mt-3 card rounded-tile p-4 overflow-x-auto">
        <div className="flex items-center justify-between">
          <p className="eyebrow">7-day forecast</p>
          <p className="text-xs text-ink-2">Local time</p>
        </div>
        <div className="mt-2 grid grid-cols-7 min-w-[560px] gap-2 text-center text-sm">
          {f.days.map((d) => {
            const frost = d.tMin <= 0;
            return (
              <div key={d.date} className={`rounded-lg p-2 ${frost ? "bg-azure-soft" : "bg-paper-2/60"}`}>
                <p className="font-medium">{new Date(d.date + "T12:00:00").toLocaleDateString("en-CA", { weekday: "short" })}</p>
                <p className="text-xs text-ink-2">{weatherLabel(d.code)}</p>
                <p className="mt-1">
                  <span className="font-semibold">{Math.round(d.tMax)}°</span>
                  <span className="text-ink-2"> / {Math.round(d.tMin)}°</span>
                </p>
                <p className="text-xs text-ink-2">{d.precip > 0 ? `${d.precip} mm` : "dry"}</p>
                {frost && <p className="text-[11px] font-semibold text-azure">frost risk</p>}
              </div>
            );
          })}
        </div>
      </div>

      {data.waters.length > 0 && (
        <p className="mt-3 text-sm text-ink-2">
          <span className="font-medium text-ink">Named waters within 20 km:</span> {data.waters.map((w) => `${w.name} (${w.distanceKm} km)`).join(" · ")}
        </p>
      )}
    </section>
  );
}
