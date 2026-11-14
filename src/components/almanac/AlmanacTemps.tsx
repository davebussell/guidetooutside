/**
 * "The year in temperature" on /almanac. Without a remembered place (the
 * `gto_place` cookie) it is the card that asks for one, as the live page
 * rendered it. With one, it draws the twelve months for that place from the
 * cached `temps:v1:<lat>:<lon>` record (air normals and water temperature), or
 * from the place's climate normals (the cached `clim:v4` record) alone.
 */
import { cacheGet } from "@/lib/cache";
import { getClimate } from "@/lib/climate";
import { cookiePlace, shortName } from "@/lib/kids/here";
import { LocationSearch } from "@/components/LocationSearch";
import { TempTrendChart } from "@/components/TempTrendChart";
import { FieldLoader } from "@/components/FieldLoader";

type Temps = {
  climate?: { monthlyMeanMax?: number[]; monthlyMeanMin?: number[] };
  monthly?: number[];
  source?: string;
  sourceNote?: string;
};

function AskForPlace() {
  return (
    <section className="card p-6 sm:p-8">
      <p className="eyebrow text-azure">The year in temperature</p>
      <h2 className="font-display mt-1 text-2xl sm:text-3xl font-semibold">Air and water temperature through the year</h2>
      <p className="mt-2 text-ink-2 max-w-2xl">
        With a location set, this shows the twelve months for that place: average high and low from a decade of records, with water temperature overlaid. Water lags air by about
        two weeks, and that lag governs when pike spawn, when lakes turn over and when trout move deep.
      </p>
      <div className="mt-4 max-w-xl">
        <LocationSearch />
      </div>
    </section>
  );
}

export function AlmanacTempsLoading() {
  return (
    <section aria-busy="true">
      <p className="eyebrow text-azure">The year in temperature</p>
      <h2 className="font-display mt-1 text-3xl sm:text-4xl font-semibold tracking-tight">Air and water temperature through the year</h2>
      <div className="mt-4"><FieldLoader compact text="Reading the climate record for your location." /></div>
      <div className="mt-6 card p-5 sm:p-7">
        <div className="h-[300px] rounded-lg bg-paper-2/70 animate-pulse" />
      </div>
    </section>
  );
}

const WATER_LABEL: Record<string, string> = { sea: "Sea", lake: "Lake", river: "River" };

export async function AlmanacTemps({ month }: { month: number }) {
  const place = await cookiePlace();
  if (!place) return <AskForPlace />;
  const key = `temps:v1:${place.lat.toFixed(2)}:${place.lon.toFixed(2)}`;
  const temps = await cacheGet<Temps>(key).catch(() => null);
  let high = temps?.climate?.monthlyMeanMax;
  let low = temps?.climate?.monthlyMeanMin;
  if (!high || !low) {
    const c = await getClimate(place).catch(() => null);
    high = c?.monthlyMeanMax;
    low = c?.monthlyMeanMin;
  }
  if (!high || !low || high.length !== 12 || low.length !== 12) return <AskForPlace />;
  const water = temps?.monthly?.length === 12 ? temps.monthly : undefined;
  return (
    <section>
      <p className="eyebrow text-azure">The year in temperature</p>
      <h2 className="font-display mt-1 text-3xl sm:text-4xl font-semibold tracking-tight">Air and water temperature through the year</h2>
      <p className="mt-2 text-ink-2 max-w-2xl">
        {shortName(place.label)}: average high and low by month from a decade of records{water ? ", with water temperature overlaid" : ""}. Water lags air by about two weeks, and
        that lag governs when pike spawn, when lakes turn over and when trout move deep.
      </p>
      <div className="mt-6 card p-5 sm:p-7">
        <TempTrendChart
          high={high}
          low={low}
          water={water}
          waterLabel={(temps?.source && WATER_LABEL[temps.source]) || "Water"}
          waterNote={temps?.sourceNote}
          currentMonth={month}
        />
      </div>
    </section>
  );
}
