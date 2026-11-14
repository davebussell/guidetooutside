import type { Climate, Regime } from "@/lib/types";
import { isArid, koppenText, monthSpans, rainWords } from "@/lib/regime";
import { frostFree } from "@/lib/frost";
import { tempsFromStation, tempWords } from "@/lib/homestead/climate";

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
/** "PHOENIX AP" → "Phoenix AP"; station names come upper-cased from GHCN. */
const titleCase = (s: string) =>
  s
    .toLowerCase()
    .replace(/(^|[\s\-/(])([a-z])/g, (m, a: string, b: string) => a + b.toUpperCase())
    .replace(/\b(Ap|Intl|Muni|Nas|Cs|Rcs|Awos|Asos)\b/g, (m) => m.toUpperCase());
const LETTERS = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];

// Plot area: x 34–566, y 18 (top) to 168 (baseline), twelve columns.
const X0 = 34;
const COL = 532 / 12;
const BASE = 168;
const H = 150;

/**
 * The year at a place in one figure: precipitation bars (the wet months darker),
 * the mean temperature with its night-to-day band, months with frosty nights
 * shaded, and this month boxed.
 */
export function ClimateYear({ climate: c, regime: r, month, placeName, lat = 45 }: { climate: Climate; regime: Regime; month: number; placeName: string; lat?: number }) {
  const rain = c.monthlyRainMm ?? new Array(12).fill(0);
  const tropical = Math.abs(lat) < 23.5;
  const mean = c.monthlyMeanMax.map((mx, i) => (mx + c.monthlyMeanMin[i]) / 2);
  const lo = Math.min(0, Math.floor(Math.min(...c.monthlyMeanMin) / 5) * 5);
  const hi = Math.ceil(Math.max(...c.monthlyMeanMax) / 5) * 5;
  const ty = (t: number) => BASE - ((t - lo) * H) / (hi - lo);
  const rainTop = Math.max(60, ...rain) * 1.1;
  const ry = (mm: number) => (mm * H) / rainTop;
  const rainLabel = Math.round(rainTop / 2 / 10) * 10;
  const cx = (i: number) => X0 + (i + 0.5) * COL;
  const wet = new Set(r.wetMonths);
  // Months with frosty nights: those inside the place's frost season (from its frost dates), none where frost is rare.
  const frosty = frostFree(c)
    ? []
    : [...Array(12).keys()].filter((i) => {
        const start = [1, 32, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335][i];
        const end = [31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 365][i];
        const toFrost = (doy: number) => (c.south ? ((doy - 184 + 365) % 365) + 1 : doy);
        const a = toFrost(start);
        let b = toFrost(end);
        if (b < a) b += 365;
        // A month is frosty when any of it falls after the first frost or before the last.
        return b >= c.firstFallFrostDoy || a <= c.lastSpringFrostDoy;
      });
  const band =
    "M" +
    [...c.monthlyMeanMax.map((t, i) => `${cx(i).toFixed(1)},${ty(t).toFixed(1)}`), ...c.monthlyMeanMin.map((t, i) => `${cx(i).toFixed(1)},${ty(t).toFixed(1)}`).reverse()].join(
      " L",
    ) +
    " Z";
  const line = "M" + mean.map((t, i) => `${cx(i).toFixed(1)},${ty(t).toFixed(1)}`).join(" L");
  const annual = rain.reduce((a, b) => a + b, 0);
  // Day 4 audit (13 Nov 2026): the class flips on the grid's temperatures at San Jose (BSk against NOAA's Csb); a class within
  // the margins of another (src/lib/regime koppenWithin) is printed with it, and the caption says the class is the grid's.
  const koppen = koppenText(c, c.south || lat < 0 ? -Math.abs(lat) : Math.abs(lat), r.koppen);

  return (
    <figure className="border-t-2 border-ink pt-4">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <p className="eyebrow">The year in {placeName}</p>
        <p className="text-sm text-ink-2">
          {r.name} · {koppen} · {[rainWords(r.rain, tropical, r.dryMonths), `${annual.toLocaleString("en")} mm a year`].filter(Boolean).join(", ")}
        </p>
      </div>
      <svg viewBox="0 0 600 210" className="mt-3 w-full" role="img" aria-label={`Monthly precipitation and temperature in ${placeName}`}>
        {frosty.map((i) => (
          <rect key={`f${i}`} x={X0 + i * COL} y={18} width={COL} height={H} fill="currentColor" className="text-azure/[0.07]" />
        ))}
        <rect x={X0 + (month - 1) * COL} y={10} width={COL} height={158} fill="none" stroke="currentColor" className="text-ink/40" strokeDasharray="2 3" />
        {rain.map((mm, i) => (
          <rect key={`r${i}`} x={cx(i) - COL * 0.3} y={BASE - ry(mm)} width={COL * 0.6} height={ry(mm)} className={wet.has(i + 1) ? "fill-azure/70" : "fill-azure/30"} />
        ))}
        <path d={band} className="fill-gold-fill/25" />
        <path d={line} fill="none" stroke="currentColor" strokeWidth={2} className="text-gold" />
        {mean.map((t, i) => (
          <circle key={`c${i}`} cx={cx(i)} cy={ty(t)} r={2.4} className="fill-gold" />
        ))}
        <line x1={X0} x2={566} y1={BASE} y2={BASE} stroke="currentColor" className="text-line" />
        <text x={570} y={171} className="fill-gold text-[10px]">
          {lo}°
        </text>
        <text x={570} y={96} className="fill-gold text-[10px]">
          {Math.round((lo + hi) / 2)}°
        </text>
        <text x={570} y={21} className="fill-gold text-[10px]">
          {hi}°
        </text>
        <text x={30} y={171} textAnchor="end" className="fill-azure text-[10px]">
          0
        </text>
        <text x={30} y={BASE - ry(rainLabel) + 3} textAnchor="end" className="fill-azure text-[10px]">
          {rainLabel}
        </text>
        <text x={30} y={20} textAnchor="end" className="fill-azure text-[9px]">
          mm
        </text>
        {LETTERS.map((l, i) => (
          <text key={`m${i}`} x={cx(i)} y={184} textAnchor="middle" className={i + 1 === month ? "text-[11px] fill-ink font-semibold" : "text-[11px] fill-ink-2"}>
            {l}
          </text>
        ))}
      </svg>
      <figcaption className="mt-2 text-xs leading-relaxed text-ink-2">
        <span className="font-medium text-azure">Bars</span>: average precipitation (rain and melted snow) each month
        {r.wetMonths.length ? ` (darker: the ${isArid(r) ? "rainiest" : "wet"} months, ${monthSpans(r.wetMonths)})` : ""}.{" "}
        <span className="font-medium text-gold">Line</span>: mean temperature, with the band from average night-time low to daytime high
        {frosty.length ? "; shaded months have frosty nights" : ""}. The dashed box is {MONTHS[month - 1]}.{" "}
        {/* Day 5 audit, 14 November 2026: "ten-year averages from the ERA5 reanalysis" at the 74 towns now on a station's
            normals (scripts/build-station-normals.ts). The grid cell's elevation goes only with the grid's temperatures. */}
        {tempsFromStation(c)
          ? `Temperatures are ${tempWords(c)}`
          : `Temperatures are ten-year averages from the ERA5 reanalysis${c.elevationM != null ? `, about ${c.elevationM} m above sea level` : ""}`}
        , and the Köppen class is read from them and the precipitation
        {koppen.includes(" or ") ? ", which leave it too near the line between two classes to settle one" : ""};{" "}
        {c.rainSource === "station" && c.rainStation
          ? `precipitation is the 1991–2020 record of the ${titleCase(c.rainStation)} weather station${c.rainStationKm != null && c.rainStationKm >= 3 ? `, ${Math.round(c.rainStationKm)} km away` : ""}.`
          : "precipitation is from the reanalysis too, which can read 15–25 % off the station record on coasts, in mountains and in deserts."}
      </figcaption>
    </figure>
  );
}
