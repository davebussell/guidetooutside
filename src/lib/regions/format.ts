/**
 * How a regional guide prints its numbers: the same words on the server, in
 * the town table and in the client compare widget. Nothing here reads data.
 */
import { lakeName, riverName } from "@/lib/water-names";
import type { RainPattern } from "@/lib/types";
import type { TownRow } from "./types";

export const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
export const SHORT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export const RAIN_WORDS: Record<RainPattern, string> = {
  "year-round": "rain through the year",
  "summer-rain": "summer rain",
  "winter-rain": "winter rain",
  "two-rainy-seasons": "two rainy seasons",
  "little-rain": "very little rain",
};

/** Pre-built towns whose map name is an administrative one, by their everyday name (as PlaceFinder lists them). */
const DISPLAY_NAME: Record<string, string> = {
  "fredericton-new-brunswick": "Fredericton",
  "moncton-new-brunswick": "Moncton",
  "saint-john-new-brunswick": "Saint John",
  "sudbury-ontario": "Sudbury",
  "montreal-quebec": "Montréal",
  "quebec-city-quebec": "Québec City",
  "st-louis-missouri": "St. Louis",
  "albany-new-york": "Albany",
};

/** The everyday name of a pre-built town. */
export const displayName = (p: { slug: string; name: string }) => DISPLAY_NAME[p.slug] ?? p.name.replace(/^City of /, "");

/** "Sea coast", "Lake Superior", "The Ottawa", "Near the coast", "Inland". */
export function waterLabel(t: Pick<TownRow, "water" | "waterName">): string {
  if (t.water === "coast") return "Sea coast";
  if (t.water === "near-coast") return "Near the coast";
  if (t.water === "lake" && t.waterName) return lakeName(t.waterName);
  if (t.water === "river" && t.waterName) return riverName(t.waterName).replace(/^the /, "The ");
  return "Inland";
}

/** "May 12 – Oct 3", "Frost rare", or "—" with no record. */
export function frostText(t: Pick<TownRow, "frostRare" | "lastFrost" | "firstFrost" | "hasClimate">): string {
  if (!t.hasClimate) return "—";
  if (t.frostRare) return "Frost rare";
  return `${t.lastFrost} – ${t.firstFrost}`;
}

/** "148 days", "Year-round", "—". */
export function frostFreeText(t: Pick<TownRow, "frostRare" | "frostFreeDays" | "hasClimate">): string {
  if (!t.hasClimate || t.frostFreeDays == null) return "—";
  if (t.frostRare) return "Year-round";
  return `${t.frostFreeDays} days`;
}

/** "−8 °C" with a true minus sign. */
export const degC = (x: number | null) => (x == null ? "—" : `${x < 0 ? "−" : ""}${Math.round(Math.abs(x))} °C`);

/** "1,143 mm". */
export const mm = (x: number | null) => (x == null ? "—" : `${x.toLocaleString("en")} mm`);

/** "253 m". */
export const metres = (x: number | null) => (x == null ? "—" : `${x.toLocaleString("en")} m`);

/** "5a–7b" for a run of zones, "9b" for one. Zones sort by number then letter. */
export function zoneRange(zones: (string | null)[]): string {
  const zs = zones.filter((z): z is string => !!z).sort(zoneCompare);
  if (!zs.length) return "—";
  return zs[0] === zs[zs.length - 1] ? zs[0] : `${zs[0]}–${zs[zs.length - 1]}`;
}

export const zoneCompare = (a: string, b: string) => parseInt(a, 10) - parseInt(b, 10) || a.localeCompare(b);

/** "128–208 days", "148 days". */
export function rangeText(xs: (number | null)[], unit: (x: number) => string): string {
  const v = xs.filter((x): x is number => x != null);
  if (!v.length) return "—";
  const lo = Math.min(...v);
  const hi = Math.max(...v);
  return lo === hi ? unit(lo) : `${unit(lo).replace(/ .*$/, "")}–${unit(hi)}`;
}

/** "−12 to 5 °C": a temperature range keeps its unit once. */
export function degRange(xs: (number | null)[]): string {
  const v = xs.filter((x): x is number => x != null).map(Math.round);
  if (!v.length) return "—";
  const lo = Math.min(...v);
  const hi = Math.max(...v);
  const sign = (x: number) => `${x < 0 ? "−" : ""}${Math.abs(x)}`;
  return lo === hi ? `${sign(lo)} °C` : `${sign(lo)} to ${sign(hi)} °C`;
}

/** The middle value, for a one-line contrast between regions. */
export function median(xs: (number | null)[]): number | null {
  const v = xs.filter((x): x is number => x != null).sort((a, b) => a - b);
  if (!v.length) return null;
  const mid = Math.floor(v.length / 2);
  return v.length % 2 ? v[mid] : (v[mid - 1] + v[mid]) / 2;
}

/** "Toronto, Ottawa and Montréal"; past `max` names, "Toronto, Ottawa and 7 others". */
export function nameList(names: string[], max = 4): string {
  if (names.length <= max) return names.length <= 1 ? names.join("") : `${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}`;
  const shown = names.slice(0, max - 1);
  return `${shown.join(", ")} and ${names.length - shown.length} others`;
}

/** "the United States and Canada" from the towns' countries, most towns first. */
export function countryList(towns: Pick<TownRow, "country">[]): string {
  const counts = new Map<string, number>();
  for (const t of towns) counts.set(t.country, (counts.get(t.country) ?? 0) + 1);
  return nameList([...counts.entries()].sort((a, b) => b[1] - a[1]).map(([c]) => c), 5);
}
