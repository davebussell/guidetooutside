/**
 * The autumn plantings of a frost-led place, read against today: which of garlic, spring bulbs and a cover
 * crop can still go in, and which windows have closed. A closed window is never listed first (the Ottawa
 * page of 2 Nov 2026 led its "last plantings of the year" with garlic, whose window there had shut weeks
 * earlier, and the garden-year strip listed "Plant garlic" first).
 *
 * Garlic's window is the calendar's own (src/lib/crop-calendar: the two months before the soil goes cold,
 * Toronto Master Gardeners "4–6 weeks before the soil freezes"); no ground-freeze date is printed because
 * none is measured. Oats close about three weeks before the average first frost: OMAFRA puts oats at "early
 * to mid-September" and "after mid-September, switch to winter wheat, cereal rye or triticale" for Ontario,
 * where the average first frost is late September to early October (Ottawa Sep 26 by the Almanac's station,
 * Oct 5 by this site's record). One region's rule, so the card says so. Bulbs go in while the soil can be
 * dug (Toronto Master Gardeners: "6 weeks prior to the ground freezing", planting continues while diggable).
 */
import { inSpans, type CropFit } from "./crop-calendar";

export type GarlicState = "open" | "closed" | "later" | "none";
export type AutumnId = "garlic" | "bulbs" | "cover";

/** Days before the average first frost by which oats must be sown (OMAFRA, see above). */
export const OATS_DAYS_BEFORE_FIRST_FROST = 21;

/** Where this town's garlic window stands on a day of the year: open, closed for this year, still to come, or no garlic here. */
export function garlicState(fits: CropFit[], doy: number): GarlicState {
  const g = fits.find((f) => f.crop.slug === "garlic");
  if (!g) return "none";
  const spans = [...g.windows.sow, ...g.windows.watered];
  if (!spans.length) return "none";
  if (inSpans(spans, doy)) return "open";
  // Closer behind us than ahead: closed for this year.
  const wrap = (n: number) => ((n % 365) + 365) % 365;
  const ahead = Math.min(...spans.map(([a]) => wrap(a - doy)));
  const behind = Math.min(...spans.map(([, b]) => wrap(doy - b)));
  return behind < ahead ? "closed" : "later";
}

/**
 * Spring bulbs go in over the same weeks as garlic and on after its window, while the soil can still be dug
 * (Toronto Master Gardeners: "6 weeks prior to the ground freezing", planting continues while the ground is
 * diggable; NCC Ottawa: "before the ground freezes"). So they are open once garlic's window has opened (or,
 * where the town has no garlic window, in the closing-the-garden phase) and until the ground is frozen.
 */
export function bulbsOpen(garlic: GarlicState, groundOpen: boolean, phase: string): boolean {
  return groundOpen && (garlic === "open" || garlic === "closed" || (garlic === "none" && phase === "bed"));
}

/**
 * The cards in the order to show them: those whose window is open first, those that are not after. `coverOpen`
 * is whether the oats window is open (today is more than three weeks before the average first frost), `bulbsOpen`
 * whether the ground can still be dug.
 */
export function autumnPlantings(i: { garlic: GarlicState; bulbsOpen: boolean; coverOpen: boolean }): { open: AutumnId[]; notOpen: AutumnId[] } {
  const isOpen: Record<AutumnId, boolean> = { garlic: i.garlic === "open", bulbs: i.bulbsOpen, cover: i.coverOpen };
  const order: AutumnId[] = ["garlic", "bulbs", "cover"];
  return { open: order.filter((k) => isOpen[k]), notOpen: order.filter((k) => !isOpen[k]) };
}
