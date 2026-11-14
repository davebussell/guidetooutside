/**
 * The gardening page's line on where the month stands (in the rains, or in the warmth), and the overview's "this month"
 * garden card: both read the town's own calendar (src/lib/crop-calendar), the month's own averages and this week's
 * forecast, and say nothing about crops the calendar does not have in the ground or in a sowing window today.
 *
 * Why (Day 4 audit, 13 November 2026, of the Florida, desert and California towns):
 *  - "November is warm (about 17 °C): tender crops are out and growing; keep sowing salads in part shade, and start the
 *    autumn brassicas" at Tucson, where the University of Arizona's November guide for Pima County has the first frost
 *    "sometimes mid-to-late November" and says to protect tender plants
 *    (https://extension.arizona.edu/publication/november-monthly-gardening-guide-pima-county, as read by the audit). The
 *    old line was chosen by the month's mean alone and named crops from a fixed list; it now names only what the calendar
 *    has in the ground today.
 *  - "The rains are due next month" at Sacramento, San Jose and Santa Barbara beside 40.9 to 114.5 mm forecast for the
 *    week, in Novembers that average 31 to 45 mm (NOAA 1991–2020: 1.78, 1.33 and 1.40 in). The line now gives the month's
 *    own average and, in a wet week, the forecast (src/lib/regime rainsNow, wetWeek).
 *  - Tampa's overview "Sow and plant now: dill and passion fruit" while about fifteen cool crops were open "with watering",
 *    which the card left out. The card now lists them as such.
 */
import { doyOfIso, inGround, sowNow, type CropFit } from "./crop-calendar";
import { weekRain } from "./forces";
import { isArid, MONTHS, monthSpans, rainsNow, wetWeek } from "./regime";
import type { LocalData, Regime } from "./types";

const plain = (f: CropFit) => f.crop.name.replace(/\s*\(.*\)/, "").toLowerCase();
const list = (xs: string[]) => (xs.length <= 1 ? (xs[0] ?? "") : `${xs.slice(0, -1).join(", ")} and ${xs[xs.length - 1]}`);

/** Where this month sits in the rains (or, in a mild temperate climate, in the warmth), and what that means for sowing. */
export function seasonLine(d: LocalData, fits: CropFit[]): string {
  const r = d.regime!;
  const c = d.climate!;
  const m = d.month;
  const next = (m % 12) + 1;
  const name = MONTHS[m - 1];
  const doy = doyOfIso(d.today);
  const now = sowNow(fits, m, doy);
  if (r.rain === "year-round" && Math.abs(d.place.lat) >= 23.5) {
    // A temperate place with rain all year: the month's warmth, the frost nights, and what the calendar has in the ground.
    const mean = (c.monthlyMeanMax[m - 1] + c.monthlyMeanMin[m - 1]) / 2;
    const nextMean = (c.monthlyMeanMax[next - 1] + c.monthlyMeanMin[next - 1]) / 2;
    const word = mean < 6 ? "cold" : mean < 10 ? "cool" : mean < 16 ? "mild" : "warm";
    const trend = nextMean > mean + 1 ? ", and warming" : nextMean < mean - 1 ? ", and cooling" : "";
    const annuals = fits.filter((f) => !f.perennial && f.crop.hardiness === "tender");
    const tender = annuals.filter((f) => inGround(f, doy));
    const tenderLine = tender.length
      ? ` By this town's sowing calendar ${list(tender.slice(0, 4).map(plain))} ${tender.length === 1 ? "is" : "are"} in the ground now.`
      : annuals.length
        ? " By this town's sowing calendar no frost-tender crop is in the ground now."
        : "";
    const frost = c.lastSpringFrost !== "Rare" ? ` Frost here is a matter of nights rather than a season: on average between ${c.firstFallFrost} and ${c.lastSpringFrost}.` : "";
    return `${name} is ${word} here: about ${Math.round(mean) || 0} °C on average${trend}.${mean < 6 ? " Little germinates outdoors." : ""}${tenderLine}${frost}`;
  }
  const st = rainsNow(r, c, m);
  const { total } = weekRain(d);
  const forecast = `${total.toFixed(1)} mm is forecast over the next seven days`;
  const avg = st.monthMm != null ? ` (about ${Math.round(st.monthMm)} mm in an average ${name})` : "";
  // An annual sown without watering today, by the calendar (a perennial's planting is not a "sowing without watering").
  const rainFed = now.sow.length > 0;
  if (st.inRains) {
    const dryWeek = total < 5;
    if (!st.last) return `${name} is in the rains${dryWeek ? `, though only ${forecast}` : ""}${rainFed || now.plant.length ? ": the time to sow and plant out while the ground stays moist on its own." : "."}`;
    return `${name} closes the rainy season${dryWeek ? `, and only ${forecast}` : ""}: ${rainFed ? "get the last rain-fed sowings in, and mulch" : "mulch"} to hold the moisture into the dry months ahead.`;
  }
  if (wetWeek(total, st.monthMm))
    return `${forecast}${st.monthMm != null ? `; ${name} averages about ${Math.round(st.monthMm)} mm here` : ""}${r.wetMonths.length ? `, and the wet months are ${monthSpans(r.wetMonths)}` : ""}.`;
  if (st.dueNext)
    return `The wet months here (${monthSpans(r.wetMonths)}) start next month${st.monthMm != null ? `; ${name} averages about ${Math.round(st.monthMm)} mm` : ""}. Prepare and mulch beds now so seed can go in with the first good rain.`;
  if (st.dry) {
    return rainFed
      ? `${name} is in the dry season${avg}: water new sowings until they are established; the crops listed to sow without watering grow on into wetter months.`
      : `${name} is in the dry season${avg}: anything sown now needs watering through to harvest, so sow less, sow it close to the tap, and mulch deeply.`;
  }
  return `${name} sits between the seasons here${avg}: rain is unreliable, so water new sowings until they are established.`;
}

export type OverviewSowing = {
  title: string;
  /** Crops sown or planted out today without watering (or, when there are none, those that need it). */
  items: string[];
  /** "With watering: chard, carrots and radishes", beside the items; null when there is nothing more. */
  extra: string | null;
  /** The crops the card names, for the checks. */
  named: CropFit[];
};

/**
 * The overview's garden card: what the calendar has to sow and plant today, those that need watering included and said
 * so, and, when nothing is open, what opens next (the caller's nextSowing). At most five of each.
 */
export function overviewSowing(fits: CropFit[], month: number, doy: number, max = 5): OverviewSowing | null {
  const now = sowNow(fits, month, doy);
  const fed = [...now.sow, ...now.plant].slice(0, max);
  const watered = now.sowWatered.slice(0, max);
  const more = now.sowWatered.length - watered.length;
  const wateredNames = [...watered.map(plain), ...(more > 0 ? [`${more} more`] : [])];
  if (fed.length) return { title: "Sow and plant now", items: fed.map(plain), extra: watered.length ? `With watering: ${list(wateredNames)}` : null, named: [...fed, ...watered] };
  if (watered.length) return { title: "Sow now, with watering", items: wateredNames, extra: null, named: watered };
  return null;
}

/**
 * The overview's month rows. In a dry climate every month counts as dry (the regime's rule for Köppen's B climates, which the
 * sowing calendar's watering follows), so its wettest months are "the rainiest", not "wet": the Day 4 audit (13 Nov 2026)
 * found "Wet months Jul–Aug" beside "Dry months: all year" at Tucson, San Jose and Los Angeles.
 */
export function climateMonthRows(r: Pick<Regime, "id" | "wetMonths" | "dryMonths">): { label: string; value: string; months: number[] }[] {
  const rows: { label: string; value: string; months: number[] }[] = [];
  if (r.wetMonths.length > 0 && r.wetMonths.length < 12) rows.push({ label: isArid(r) ? "Rainiest months" : "Wet months", value: monthSpans(r.wetMonths), months: r.wetMonths });
  if (r.dryMonths.length > 0)
    rows.push({ label: "Dry months", value: isArid(r) && r.dryMonths.length === 12 ? "All year: a dry climate, where evaporation outruns the rain" : monthSpans(r.dryMonths), months: r.dryMonths });
  return rows;
}
