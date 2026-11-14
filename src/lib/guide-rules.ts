import { tidalRegsFor } from "@/lib/region-regs";
import type { Guide, GuideItem, LocalData } from "./types";
import { regionOf } from "./region";
import { regionContext } from "./region-context";
import { seasonLabelFor } from "./season-label";
import { regulationsNote } from "./region-regs";
import { cropCalendar, doyLabel, doyOfIso, mainSowingMonths, nextSowing, sowNow, type CropFit } from "./crop-calendar";
import { frostNights, perYear } from "./extremes";
import { rainsNow } from "./regime";
import { localCrops } from "./crops";
import { fishByWater, inSeasonOnPage, localName, type WaterSection } from "./fishing-waters";
import { FISH, orderCreatures, type Creature } from "./nature";
import { monthName, type Species } from "./species";
import { foragingNow, foragingSoon, liveFoods, liveForagingHeadline, type LiveEvidence } from "./plant-presence";
import { foragingSafety } from "./guide-check";

/**
 * Rules-based fallback guide. Used when no AI key is configured, when the AI
 * call fails, or when a written section fails the vetting gate
 * (src/lib/guide-check), so the site always renders something sensible.
 *
 * It is built from the place's own data, the same lists the AI is grounded
 * on: the ecological region's summary, the crop calendar worked out from the
 * place's climate regime, the fish of its own waters in season, and the
 * library's wild foods recorded in its region this month, read in the
 * place's own hemisphere. The earlier version of this file was a fixed
 * northern-temperate North American script (walleye, musky, ramps,
 * "fall runs in the Great Lakes"), which it served word for word to
 * Lisbon, London, Munich and Nairobi whenever a section fell back; the
 * regional-accuracy audit of October 2026 replaced it.
 *
 * `live` is the foraging page's panel evidence for the place this month (local-flora floraEvidence, as readGuide
 * passes it to the stored-guide gate); with it, a place the presence table cannot speak for gets the panel's count in
 * its foraging headline instead of a line pointing to the page.
 */
export function rulesGuide(d: LocalData, live?: LiveEvidence | null): Guide {
  const eco = regionOf(d.place.lat, d.place.lon);
  const ctx = regionContext(d.place);
  const m = d.month;
  const c = d.climate;
  const r = d.regime;
  const south = ctx.hemisphere === "south";
  const soil = d.forecast.soilTemp6cm;
  const soilNote = soil != null ? ` Soil is about ${Math.round(soil)} °C at 6 cm.` : "";
  const frostLed = !!c && c.lastSpringFrost !== "Rare" && (r ? r.frostLed : true);
  const autumn = ctx.autumn;

  // ---- gardening: the crop calendar for this climate -----------------------------
  const fits: CropFit[] = c?.monthlyRainMm && r ? cropCalendar(c, r, localCrops(d.place.countryCode), { lat: d.place.lat }) : [];
  // Only crops whose sowing window includes the place's own date, not every crop with a window this month.
  const now = sowNow(fits, m, doyOfIso(d.today));
  const name = (f: CropFit) => f.crop.name;
  const sowOutdoorsNow: GuideItem[] = [
    ...now.sow.map((f) => ({ name: name(f), detail: f.crop.sow.outdoors || `Sow or plant now; comes in ${months(f.harvest)}.` })),
    ...now.plant.map((f) => ({ name: name(f), detail: `Plant now; a perennial that crops ${months(f.harvest)}.` })),
    ...now.sowWatered.map((f) => ({ name: name(f), detail: `Possible now with regular watering: it grows into the dry months. Comes in ${months(f.harvest)}.` })),
  ].slice(0, 5);
  // Planted out the crop's nursery weeks from now (the tray rule in src/lib/crop-calendar), not "in" its whole season: the
  // Day 4 audit (13 Nov 2026) found "Start in trays now for planting out in all year" at San Jose.
  const startIndoorsNow: GuideItem[] = now.trays
    .map((f) => ({ name: name(f), detail: `Start in trays now for planting out in about ${f.crop.grow?.nurseryWeeks ?? 6} weeks.` }))
    .slice(0, 3);
  const harvestNow: GuideItem[] = fits
    .filter((f) => f.harvest.includes(m))
    .sort((a, b) => Number(b.staple) - Number(a.staple) || a.harvest.length - b.harvest.length)
    .map((f) => ({ name: name(f), detail: f.crop.ready || f.crop.pick }))
    .slice(0, 4);

  // When nothing can be sown today, what opens next and when, from the same windows.
  const nx = sowOutdoorsNow.length || !fits.length ? null : nextSowing(fits, doyOfIso(d.today));
  const nextOpening = nx ? `${nx.fits.slice(0, 3).map((f) => f.crop.name.replace(/\s*\(.*\)/, "").toLowerCase()).join(", ")} from ${doyLabel(nx.doy)}` : null;

  // Day 5 audit, 14 November 2026: "frost is not what sets the year" and "runs on the winter rains" at Nanaimo, Vancouver,
  // Victoria, Portland and Seattle, which have 10 to 32 frost nights a year and sow mainly Feb–Aug by their own calendars.
  // Where frost is dated the note gives the dates and the station's frost-night count (extremes frostNights) instead, and
  // the "runs on" clause stands only where the town's main sowing months (crop-calendar mainSowingMonths) fall in its wet
  // months.
  const main = mainSowingMonths(fits).months;
  const rainsLead = !!r && main.some((mo) => r.wetMonths.includes(mo));
  const nights = c && c.lastSpringFrost !== "Rare" ? frostNights(d.place.slug, c) : null;
  const zoneNotes = c
    ? frostLed
      ? `Estimated hardiness zone ${c.zone}. Average last spring frost ${c.lastSpringFrost}, first ${autumn} frost ${c.firstFallFrost} (about ${c.frostFreeDays} frost-free days).${soilNote}`
      : c.lastSpringFrost === "Rare"
        ? `Estimated hardiness zone ${c.zone}; frost is rare here${r && rainsLead ? `, and the ${r.name.toLowerCase()} climate runs on ${r.runsOn}` : ""}.${soilNote}`
        : `Estimated hardiness zone ${c.zone}. Average last spring frost ${c.lastSpringFrost}, first ${autumn} frost ${c.firstFallFrost}${nights && nights.nights >= 1 ? `; about ${perYear(nights.nights)} frost nights a year ${nights.words}` : ""}.${main.length ? ` Most sowings here go in ${months(main)}.` : ""}${soilNote}`
    : `Zone data unavailable; the ecological region is ${eco.name}.${soilNote}`;

  const g: Guide["gardening"] = {
    headline: gardeningHeadline(d, frostLed, south, autumn, main),
    zoneNotes,
    sowOutdoorsNow,
    startIndoorsNow,
    harvestNow,
    tasksThisWeek: gardeningTasks(d, frostLed, south, harvestNow.length > 0, sowOutdoorsNow.length > 0, nextOpening),
    watchOut: watchOut(d, frostLed),
  };

  // ---- fishing: the fish of this place's waters, in season and open ----------------------
  const { sections, species } = rulesFishing(d, eco.slug);
  const closed = [...new Map(sections.flatMap((s) => s.closed).map((f) => [f.slug, f])).values()].slice(0, 4);
  const avoidNames = new Set((d.water?.avoid ?? []).filter((w) => w.avoid?.certain).map((w) => w.name));
  const f: Guide["fishing"] = {
    headline: fishingHeadline(d, species.length, eco.fishing, sections.filter((s) => s.avoid)),
    species,
    bestTimes: `Dawn and dusk are the most reliable windows. Moon is ${d.moon.phaseName.toLowerCase()} (${d.moon.fishingRating.toLowerCase()} solunar rating); next full moon ${d.moon.nextFull}.`,
    waters: d.waters.filter((w) => !avoidNames.has(w.name)).slice(0, 6).map((w) => w.name),
    regulationsNote: [regulationsNote(ctx, d.regs, tidalRegsFor(d)), ...closed.map((c) => `${c.name}: ${c.closure!.label.replace(/\.$/, "")}.`)].join(" "),
  };

  // ---- foraging: the library's wild foods of this region, this month ------------------
  const coast = d.water ? d.water.coast !== null : undefined;
  // Only what is recorded within about 50 km of the place this month is called in season (plant-presence);
  // where the place cannot be checked the list is empty and the headline says so.
  const gated = foragingNow(m, eco.slug, c?.zoneNumber, { coast, place: d.place });
  const wild = gated.checked;
  const soon = foragingSoon(m, eco.slug, c?.zoneNumber, { coast, place: d.place }).checked;
  const fo: Guide["foraging"] = {
    headline: foragingHeadline(d, wild.length, eco.foraging, gated.why, live),
    inSeasonNow: wild.slice(0, 6).map((s) => forageItem(s)),
    comingSoon: soon.slice(0, 3).map((s) => ({ name: s.name, detail: `Usually from ${monthName(s.months.find((x) => x !== m) ?? m)}; ${s.habitat}` })),
    safety: foragingSafety(null, d.forageLaw),
  };

  return {
    summary: `${seasonLabelFor(d, ctx)} in ${d.place.label}: ${g.headline} ${f.headline} ${fo.headline}`,
    gardening: g,
    fishing: f,
    foraging: fo,
    source: "rules",
    generatedAt: new Date().toISOString(),
  };
}

/**
 * The rules guide's fish: the place's water sections and up to five fish in season in them.
 *
 * With the place, fishByWater applies the records' country rules and the regulator's closed seasons (round 2, L7/L8):
 * a closed fish sits in `closed`, never in `fish`; a kind of water with nothing fishable here (a city's drains, a
 * zero-fishing fjord) carries `avoid` and is skipped.
 *
 * Only a place with no water setting falls back to the region's fish without a water to pin them to, and only those the
 * fishing page itself would call in season on the day (fishing-waters `inSeasonOnPage`: recorded near the town, the
 * months its records bear out for a sea fish, no closed or catch-and-release-only row). Audit of 10 November 2026: the
 * fallback used the library's months and ran whenever the waters had no fish in season, so a town whose fishing page
 * had none in November (Moncton, Portland) got striped bass "active" in its guide.
 */
export function rulesFishing(
  d: Pick<LocalData, "place" | "month" | "today" | "water">,
  regionSlug: string,
): { sections: WaterSection[]; species: (GuideItem & { where: string })[] } {
  const sections = d.water ? fishByWater(d.month, regionSlug, d.water, { place: d.place, today: d.today }) : [];
  const seen = new Set<string>();
  const species: (GuideItem & { where: string })[] = [];
  for (const s of sections) {
    if (s.avoid) continue;
    for (const f of s.fish) {
      if (seen.has(f.slug) || species.length >= 5) continue;
      seen.add(f.slug);
      species.push({ name: f.name, where: s.title, detail: fishDetail(f), ...(f.closure ? { caution: f.closure.label } : {}) });
    }
  }
  if (!d.water) {
    // The library's records (inSeasonOnPage reads their months in the place's calendar itself), in the page's order.
    const open = orderCreatures(
      FISH.filter((f) => inSeasonOnPage(f, d.month, regionSlug, d.place, { today: d.today })),
      regionSlug,
      d.place,
    );
    for (const f of open.slice(0, 5)) species.push({ name: localName(f, regionSlug), where: f.where, detail: fishDetail(f) });
  }
  return { sections, species };
}

// ---- helpers -----------------------------------------------------------------------------

const SHORT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "Jun–Aug" for a run of months; "Jun, Sep" otherwise. */
function months(ms: number[]): string {
  if (!ms.length) return "later in the year";
  if (ms.length >= 12) return "all year";
  const set = new Set(ms);
  const runs: string[] = [];
  for (let m = 1; m <= 12; m++) {
    if (!set.has(m) || set.has(((m + 10) % 12) + 1)) continue;
    let end = m;
    while (set.has((end % 12) + 1) && (end % 12) + 1 !== m) end = (end % 12) + 1;
    runs.push(end === m ? SHORT[m - 1] : `${SHORT[m - 1]}–${SHORT[end - 1]}`);
  }
  return runs.join(", ");
}

function fishDetail(f: Creature): string {
  const parts = [f.tactic, f.caution].filter(Boolean);
  return parts.length ? parts.join(" ") : f.note;
}

function forageItem(s: Species): GuideItem & { where: string; lookalikes?: string } {
  const it: GuideItem & { where: string; lookalikes?: string } = { name: s.name, where: s.habitat, detail: s.identify };
  if (s.lookalikes) it.lookalikes = s.lookalikes;
  if (s.caution) it.caution = s.caution;
  return it;
}

function gardeningHeadline(d: LocalData, frostLed: boolean, south: boolean, autumn: string, main: number[] = []): string {
  const r = d.regime;
  if (!frostLed && r) {
    const wet = r.wetMonths.includes(d.month);
    if (r.rain === "little-rain") return "A watered garden year: sow what the heat allows and keep the beds mulched.";
    const are = /\b(rains|seasons|months)$/i.test(r.runsOn) ? "are" : "is";
    // "The main sowing window" only in one of the town's own main sowing months (crop-calendar mainSowingMonths): the Day 5
    // audit (14 Nov 2026) found it in October at Nanaimo, Vancouver, Victoria, Portland and Seattle, which sow mainly in
    // spring and summer.
    if (wet && main.includes(d.month)) return `${cap(r.runsOn)} ${are} here: the main sowing window of the year.`;
    if (wet && main.length) return `${cap(r.runsOn)} ${are} here, but few crops are sown now: most sowings here go in ${months(main)}.`;
    if (wet) return `${cap(r.runsOn)} ${are} here.`;
    // "Dry season" only in a month dry by its own rain (regime rainsNow): the Day 4 audit (13 Nov 2026) found the dry-season
    // wording in Novembers that average 31 to 45 mm at Sacramento, San Jose and Santa Barbara.
    const st = rainsNow(r, d.climate, d.month);
    // The sowings are planned "for the rains" only where the town's main sowing months fall in its wet months (Day 5
    // audit, 14 Nov 2026: San Jose sows mainly Apr–Jul, after its Dec–Mar rains).
    const rainsLead = !main.length || main.some((mo) => r.wetMonths.includes(mo));
    return st.dry
      ? rainsLead
        ? `Dry season: water what is in, and plan the sowings for ${r.runsOn}.`
        : `Dry season: water what is in; most sowings here go in ${months(main)}.`
      : st.dueNext
        ? `Before the rains: prepare and mulch the beds for ${r.runsOn}.`
        : "Between the seasons: water new sowings until they are established.";
  }
  if (d.daysToFirstFrost != null && d.daysToFirstFrost <= 45 && d.daysToFirstFrost >= 0) return `About ${d.daysToFirstFrost} days until the average first ${autumn} frost.`;
  if (d.daysSinceLastFrost != null && d.daysSinceLastFrost >= 0 && d.daysSinceLastFrost <= 45) return `About ${d.daysSinceLastFrost} days since the average last frost: the main planting weeks.`;
  const phase = seasonPhase(d.month, south);
  return phase === "winter"
    ? "Planning season: order seeds and prune dormant trees."
    : phase === "spring"
      ? "Hardy crops can go in as soon as the soil can be worked; tender ones wait for the last frost."
      : phase === "summer"
        ? "Peak growing season: water deeply, mulch and keep picking."
        : `${cap(autumn)} harvest: pick, cure and store before the frost.`;
}

function gardeningTasks(d: LocalData, frostLed: boolean, south: boolean, harvesting: boolean, sowing: boolean, nextOpening: string | null = null): string[] {
  const r = d.regime;
  const out: string[] = [];
  if (sowing) out.push("Sow in the mornings and water seed rows until they are up");
  else if (nextOpening) out.push(`No crop is in its sowing window today; next to open: ${nextOpening}`);
  if (harvesting) out.push("Pick little and often; storage crops only once they are mature");
  if (!frostLed && r) {
    if (r.wetMonths.includes(d.month)) out.push("Keep drainage clear and stake what the storms could flatten", "Watch for slugs, snails and fungal disease in the wet");
    // Shade only in a month whose afternoons average 30 °C or more (the homestead pages' hot day, src/lib/homestead/climate
    // HOT_DAY_C), not in a California November.
    else out.push("Mulch deeply and water at dawn or dusk", ...(d.climate && d.climate.monthlyMeanMax[d.month - 1] >= 30 ? ["Shade seedlings through the hottest hours"] : []));
  } else {
    const phase = seasonPhase(d.month, south);
    if (phase === "spring") out.push("Top beds with compost before planting", "Keep fleece or row cover handy for late frosts");
    if (phase === "summer") out.push("Deep-water in the morning", "Pinch tomato side-shoots and tie in climbers");
    if (phase === "autumn") out.push("Cure squash, onions and garlic before storing", "Spread compost and leaf mulch on cleared beds");
    if (phase === "winter") out.push("Clean and sharpen tools", "Order seed early and sketch next year's rotation", "Prune apples and pears while dormant");
  }
  return out.slice(0, 5);
}

function watchOut(d: LocalData, frostLed: boolean): string[] {
  const lows = d.forecast.days.map((x) => x.tMin);
  const coldest = lows.length ? Math.min(...lows) : null;
  const hottest = d.forecast.days.length ? Math.max(...d.forecast.days.map((x) => x.tMax)) : null;
  const out: string[] = [];
  if (coldest != null && coldest <= 2) out.push(`A cold night this week (down to ${Math.round(coldest)} °C): cover tender crops or pick them.`);
  if (hottest != null && hottest >= 32) out.push(`Heat this week (up to ${Math.round(hottest)} °C): water early and shade seedlings.`);
  if (frostLed) out.push("Frost comes weeks earlier in low spots than at the weather station.");
  const rain = d.forecast.days.reduce((s, x) => s + (x.precip || 0), 0);
  if (rain < 2 && d.forecast.days.length >= 5) out.push("A dry week ahead: newly sown rows and transplants need watering every day or two.");
  return out.slice(0, 3);
}

function fishingHeadline(d: LocalData, n: number, regional: string, avoided: { title: string; avoid?: { reason: string } }[]): string {
  const t = d.forecast.current.temp;
  if (!n && avoided.length) {
    // The reason's last clause: "an open sewer of the Nairobi River basin inside the city; Kenya's trout are in the Aberdare…".
    const why = avoided[0].avoid!.reason.split(": ").pop()!.replace(/\.$/, "");
    return `No fishing water in town: ${why.charAt(0).toLowerCase()}${why.slice(1, 160)}.`;
  }
  if (!n) return `Few library species are recorded active here this month; ${regional.replace(/\.$/, "")}.`;
  if (t != null && t <= 5) return "Cold water: fish slow and deep, and pick the warmest part of the day.";
  if (t != null && t >= 28) return "Hot weather: fish first light and last light, and the deeper, cooler water between.";
  return "Dawn and dusk first; the species below are those active in your waters this month.";
}

/**
 * The foraging headline. Where the presence table cannot speak for the place (not in it, or data-poor), the headline is
 * the one the stored-guide gate writes (plant-presence liveForagingHeadline), from `live`, the foraging page's own
 * panel evidence when the caller has it: audit of 11 November 2026, this line said "Not checked against local
 * observations … so no wild food is listed as in season" every week at Asheville, Pittsburgh, St. Louis and Nashville
 * while the panel below listed nine foods with records this month. Without `live` it says where the records are,
 * never that there are none.
 */
function foragingHeadline(d: LocalData, n: number, regional: string, why: "none" | "no-place" | "no-table" | "data-poor" = "none", live?: LiveEvidence | null): string {
  const context = `Regional context: the region's wild foods are ${regional.charAt(0).toLowerCase()}${regional.slice(1).replace(/\.$/, "")}.`;
  if (why !== "none") return `${liveForagingHeadline(live, d.month)} ${context}`;
  // The table holds none, but the panel, which counts differently (iNaturalist, 40 km, every year), lists foods: its count.
  if (!n && live && live.month === d.month && liveFoods(live).length) return `${liveForagingHeadline(live, d.month)} ${context}`;
  if (!n) return `None of the guide's wild foods has been recorded within about 50 km of ${d.place.name} in ${monthName(d.month)}. ${context}`;
  return `${n} wild food${n === 1 ? "" : "s"} in the guide ${n === 1 ? "has" : "have"} been recorded within about 50 km of ${d.place.name} in ${monthName(d.month)}.`;
}

/** The temperate season of a month, in the hemisphere's own calendar. */
function seasonPhase(month: number, south: boolean): "winter" | "spring" | "summer" | "autumn" {
  const m = south ? ((month + 5) % 12) + 1 : month;
  return m <= 2 || m === 12 ? "winter" : m <= 5 ? "spring" : m <= 8 ? "summer" : "autumn";
}

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
