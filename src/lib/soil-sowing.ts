/**
 * What the soil-temperature card may say about sowing. A soil reading says whether a seed would germinate, not
 * whether sowing is worth doing: on 2 Nov 2026 the Ottawa cards read "Cool-season seeds germinate" and "Suitable
 * for brassicas, beetroot, chard, carrots and potatoes" at 10 °C, in a town where nothing sown in November
 * reaches harvest. So the sentence about sowing comes from the same windows as the "sow now" lists: the crops
 * whose window includes today, or, when none does, when the next one opens.
 */
import { cropCalendar, doyLabel, doyOfIso, nextSowing, sowNow, type CropFit } from "./crop-calendar";
import { localCrops } from "./crops";
import type { LocalData } from "./types";

export type SoilSowing = {
  /** Annual crops whose sowing window includes today, staples first. */
  open: string[];
  /** The next window to open, when none is open today. */
  next: { label: string; names: string[] } | null;
  /** The sentence about sowing. */
  text: string;
};

const list = (xs: string[]) => (xs.length <= 1 ? (xs[0] ?? "") : `${xs.slice(0, -1).join(", ")} and ${xs[xs.length - 1]}`);
/** "rocket (arugula)" → "rocket": the plain name, lower case. */
const plain = (n: string) => n.replace(/\s*\(.*\)/, "").toLowerCase();

/** The crops in their sowing window on a day of the year, or when the next opens. */
export function soilSowing(fits: CropFit[], month: number, doy: number): SoilSowing {
  const now = sowNow(fits, month, doy);
  const names = [...now.sow, ...now.sowWatered].sort((a, b) => Number(b.staple) - Number(a.staple)).map((f) => plain(f.crop.name));
  if (names.length) {
    const shown = names.slice(0, 6);
    return { open: names, next: null, text: `In their sowing window here today: ${list(shown)}${names.length > shown.length ? ` and ${names.length - shown.length} more` : ""}.` };
  }
  const nx = nextSowing(fits, doy);
  if (!nx) return { open: [], next: null, text: "No crop is in its sowing window here today." };
  const next = { label: doyLabel(nx.doy), names: nx.fits.slice(0, 4).map((f) => plain(f.crop.name)) };
  return { open: [], next, text: `No crop is in its sowing window here today. Next to open: ${list(next.names)} from ${next.label}.` };
}

/**
 * The garden-year strip's sowing tasks for a day: the crops whose sowing window includes it (staples first),
 * those whose tray sowing window does, and, when nothing can be sown, what opens next and when.
 */
export function sowingTasks(fits: CropFit[], month: number, doy: number): { sow: string[]; trays: string[]; next: string | null } {
  const now = sowNow(fits, month, doy);
  const names = (fs: CropFit[]) => [...fs].sort((a, b) => Number(b.staple) - Number(a.staple)).map((f) => plain(f.crop.name));
  const sow = names([...now.sow, ...now.sowWatered]);
  const nx = sow.length ? null : nextSowing(fits, doy);
  return { sow, trays: names(now.trays), next: nx ? `${list(names(nx.fits).slice(0, 3))} from ${doyLabel(nx.doy)}` : null };
}

const cache = new WeakMap<object, Map<string, CropFit[]>>();

/** The place's crop calendar, worked out once per climate record. */
export function fitsFor(d: LocalData): CropFit[] {
  if (!d.climate?.monthlyRainMm || !d.regime) return [];
  const key = `${d.place.countryCode}|${d.place.lat}`;
  let byKey = cache.get(d.climate);
  if (!byKey) cache.set(d.climate, (byKey = new Map()));
  let hit = byKey.get(key);
  if (!hit) byKey.set(key, (hit = cropCalendar(d.climate, d.regime, localCrops(d.place.countryCode), { lat: d.place.lat })));
  return hit;
}

/** The sowing sentence for a place today (its local date, `data.today`), or null where the calendar cannot be worked out. */
export function soilSowingFor(d: LocalData): SoilSowing | null {
  const fits = fitsFor(d);
  if (!fits.length) return null;
  return soilSowing(fits, d.month, doyOfIso(d.today));
}
