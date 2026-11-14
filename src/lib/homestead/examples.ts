/**
 * The calendar's signals worked out for a few pre-built towns, from the
 * committed climate table (src/data/place-normals.json), to show the same
 * signal arriving at different dates in each hemisphere and not at all in the
 * tropics. No network: the table is part of the build.
 *
 * The temperature rows come from monthly averages, which hide extremes (an
 * average July afternoon in Ottawa is under 30 °C, yet the airport station
 * counts about fifteen days a year at 30 °C or hotter), so where an average
 * never reaches a line the row says "not on average", never "never".
 */
import { PLACE_NORMALS } from "@/lib/climate-fallback";
import { regimeOf } from "@/lib/regime";
import type { Climate, Place } from "@/lib/types";
import { dayLabel, SHORT_MONTHS, monthOf } from "./climate";
import { signalDates, type SignalDates } from "./signals";

/** Six served towns that span the climates the table covers (src/lib/scope.ts: a parked town has no page to link to). */
export const EXAMPLE_TOWNS = ["toronto-ontario", "fairbanks-alaska", "vancouver-british-columbia", "denver-colorado", "phoenix-arizona", "miami-florida"];

type Entry = { place: Place; climate: Climate };

export type ExampleTown = { place: Place; dates: SignalDates };

export function exampleTowns(slugs = EXAMPLE_TOWNS, today = new Date().toISOString().slice(0, 10)): ExampleTown[] {
  const table = PLACE_NORMALS as unknown as Entry[];
  return slugs.flatMap((slug) => {
    const e = table.find((x) => x.place.slug === slug);
    if (!e) return [];
    const regime = regimeOf(e.climate, e.place.lat);
    return [{ place: e.place, dates: signalDates({ lat: e.place.lat, lon: e.place.lon, climate: e.climate, regime, today }) }];
  });
}

const day = (d: number | null, none: string) => (d == null ? none : dayLabel(d));
const month = (d: number | null, none: string) => (d == null ? none : SHORT_MONTHS[monthOf(d) - 1]);

/** The rows of the "same signal, six towns" table. */
export const SIGNAL_ROWS: { label: string; value: (d: SignalDates) => string }[] = [
  { label: "Daylight falls below 14 hours", value: (d) => day(d.daylight[14].down, "never") },
  { label: "Daylight falls below 12 hours", value: (d) => day(d.daylight[12].down, "never") },
  { label: "Average first autumn frost", value: (d) => (d.frostRare ? "rare" : day(d.firstFallFrost, "—")) },
  // The span is the town's monthly lows: a station's normals where they have been read, otherwise the ERA5 grid's (audit of
  // 10 November 2026; Day 5 audit, 14 November 2026: Fairbanks and Phoenix are on station normals, so the row no longer
  // calls every column the grid's). Each date says which.
  {
    label: "Average nights fall below 0 °C",
    value: (d) => (d.nightsBelow[0] && d.nightsBelow[0].days < 365 ? `${dayLabel(d.nightsBelow[0].start)} (${d.tempsFromStation ? "station" : "model grid"})` : "not on average"),
  },
  { label: "The heating season begins", value: (d) => month(d.heatingStart, "no season") },
  { label: "Afternoons fall below 13 °C (bees stop)", value: (d) => (d.bees.end == null ? "not on average" : dayLabel(d.bees.end + 1)) },
  { label: "Average last spring frost", value: (d) => (d.frostRare ? "rare" : day(d.lastSpringFrost, "—")) },
  { label: "Afternoons pass 13 °C (bees forage)", value: (d) => (d.bees.start == null ? "all year" : dayLabel(d.bees.start)) },
  { label: "Average afternoons pass 30 °C", value: (d) => (d.daysAbove30 ? dayLabel(d.daysAbove30.start) : "not on average") },
  { label: "The wet season begins", value: (d) => month(d.rainsStart, "no single season") },
  { label: "The dry season begins", value: (d) => month(d.dryStart, "none") },
];
