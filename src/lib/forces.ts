/**
 * The week's forces at a place — frost, soil warmth, day length, heat units,
 * rain, pollination, the moon, wind and decomposition — each read from the
 * forecast and the climate record, with a status and what it means.
 *
 * The set is keyed to the place's climate (RF-findings L15): a frost-free
 * place (both frost dates "Rare") shows no frost tile; where the rain comes
 * in seasons — winter rain, summer rain, two rainy seasons, a desert — a
 * "Rains" tile says where the year stands in them, in the frost tile's place
 * when there is no frost and in the last tile's place otherwise.
 */
import { doyOfIso, inGround, mainSowingMonths, pickedOn, type CropFit } from "./crop-calendar";
import { frostFree as isFrostFree } from "./frost";
import { frostNights, perYear } from "./extremes";
import { MONTHS, monthSpans, rainsNow, regimeSeason, wetWeek } from "./regime";
import { sunTimes } from "./sun";
import { fitsFor, soilSowingFor } from "./soil-sowing";
import type { LocalData } from "./types";

export type ForceId = "frost" | "soil" | "daylength" | "heat" | "rain" | "pollination" | "moon" | "wind" | "decomposition" | "rains";
export type ForceStatus = "Favourable" | "Monitor" | "Limiting" | "Inactive";
export type Force = { id: ForceId; title: string; status: ForceStatus; value: string; text: string; why: string };
export type ForceSection = "overview" | "gardening" | "fishing" | "foraging";

export const SECTION_FORCES: Record<ForceSection, ForceId[]> = {
  overview: ["frost", "soil", "daylength", "heat", "rain", "pollination"],
  gardening: ["frost", "soil", "daylength", "heat", "rain", "pollination"],
  fishing: ["moon", "wind", "rain", "soil", "daylength", "frost"],
  foraging: ["decomposition", "rain", "frost", "soil", "daylength", "moon"],
};

const WHY: Record<ForceId, string> = {
  frost: "Frost sets the limits of the growing season. Ice forming inside leaf tissue ruptures the cells: one night kills a tomato plant and sweetens a parsnip.",
  soil: "Germination is triggered by soil temperature, not by date. The reading is taken at 6 cm, the depth of most seed.",
  daylength: "Day length is unaffected by weather. Plants respond to photoperiod when they bolt, form bulbs, flower and go dormant.",
  heat: "Growing degree days: the running total of warmth above 10 °C. Crop and insect development tracks this total more closely than the date.",
  rain: "Rainfall governs germination, fungal fruiting and slug activity, and sets river levels for the following days.",
  pollination: "About a third of food crops depend on insect pollination. Bee activity is governed by temperature, wind and rain.",
  moon: "The moon drives ocean tides. By angling tradition, fish feed most in the days around new and full moon; studies of the effect are mixed.",
  wind: "Wind pollinates maize and grasses, dries soil and breaks stems. On water it moves baitfish, and the fish that feed on them.",
  decomposition:
    "Fungi and bacteria break down dead plant matter into soil. The warm, wet conditions that drive a compost heap also bring mushrooms into fruit.",
  rains:
    "Where rain comes in seasons, sowing follows the first good rains and the dry months decide what has to be watered. Rivers rise and colour with the rains and fall low and clear in the dry season.",
};
/** The frost card's footnote where frost is a few nights a year rather than the frame of the season. */
const WHY_FROST_LIGHT =
  "Frost does not frame the year here, but one night below freezing is enough to kill tender growth: ice forming inside leaf tissue ruptures the cells. Cold hollows and open ground frost first.";

const TITLE: Record<ForceId, string> = {
  frost: "Frost",
  soil: "Soil temperature",
  daylength: "Day length",
  heat: "Heat units",
  rain: "Rain",
  pollination: "Pollination",
  moon: "Moon",
  wind: "Wind",
  decomposition: "Decomposition",
  rains: "Rains",
};

const fmtLen = (min: number) => `${Math.floor(min / 60)}h ${String(Math.round(min % 60)).padStart(2, "0")}m`;
const weekday = (iso: string) => new Date(iso + "T12:00:00Z").toLocaleDateString("en-US", { weekday: "long", timeZone: "UTC" });

/**
 * What the town's own sowing calendar (src/lib/crop-calendar, the same windows as the "sow now" lists) has in the
 * ground today. The 10 Nov 2026 audit found the week's panels giving summer advice in November: "Cover basil, tomatoes,
 * squash and peppers" weeks after every town's first frost, "Squash and early fruit may need hand pollination", "Expect
 * blight on tomatoes and potatoes" and "water deeply twice a week" with no crop in the ground. So the frost, rain and
 * pollination tiles name only the crops this calendar has in the ground (or being picked) today, and give watering
 * advice only while something is growing: in the ground in a month within 2 °C of the bottom of its best range.
 * Null where the calendar cannot be worked out for the place.
 */
export function gardenToday(d: LocalData): { tender: CropFit[]; growing: CropFit[]; flowering: CropFit[]; inGround: CropFit[] } | null {
  const fits = fitsFor(d);
  if (!fits.length || !d.climate) return null;
  const doy = doyOfIso(d.today);
  const c = d.climate;
  const meanNow = (c.monthlyMeanMax[d.month - 1] + c.monthlyMeanMin[d.month - 1]) / 2;
  const here = fits.filter((f) => inGround(f, doy));
  return {
    inGround: here,
    tender: here.filter((f) => f.crop.hardiness === "tender"),
    // Growing: a month within 2 °C of the bottom of the crop's best range, the band the calendar's growth test counts
    // as good growing weather (a standing kale at 3 °C in November is held, not growing, and needs no watering).
    growing: here.filter((f) => meanNow >= (f.crop.grow?.temp[1] ?? 0) - 2),
    // Insect-pollinated fruiting crops that flower while they are picked: squash, pumpkins, cucumbers and melons.
    flowering: fits.filter((f) => (f.crop.group === "squash" || f.crop.slug === "cucumber" || f.crop.slug === "watermelon") && pickedOn(f, doy)),
  };
}

/** "tomato, pepper and basil": plain lower-case crop names. */
const cropList = (fs: CropFit[]) => {
  const xs = fs.map((f) => f.crop.name.replace(/\s*\(.*\)/, "").toLowerCase()).slice(0, 4);
  return xs.length <= 1 ? (xs[0] ?? "") : `${xs.slice(0, -1).join(", ")} and ${xs[xs.length - 1]}`;
};

/** Rain over the coming week, and on how many days. */
export function weekRain(d: LocalData) {
  const days = d.forecast.days.slice(0, 7);
  const total = Math.round(days.reduce((a, x) => a + (x.precip ?? 0), 0) * 10) / 10;
  const wet = days.filter((x) => (x.precip ?? 0) >= 1).length;
  return { total, wet };
}

/** Day length now (minutes, fractional) and its change a day on. */
export function dayLength(lat: number, lon: number, now = new Date()) {
  const len = (t: Date) => {
    const s = sunTimes(lat, lon, t);
    return s.sunrise && s.sunset ? (s.sunset.getTime() - s.sunrise.getTime()) / 60000 : (s.dayLengthMin as number);
  };
  const today = len(now);
  return { today, change: len(new Date(now.getTime() + 86400000)) - today };
}

function force(d: LocalData, id: ForceId, now: Date): Force {
  const f = d.forecast;
  const c = d.climate;
  const days = f.days.slice(0, 7);
  const base = { id, title: TITLE[id], why: WHY[id] };
  switch (id) {
    case "frost": {
      const coldest = Math.min(...days.map((x) => x.tMin));
      const night = days.find((x) => x.tMin <= 2);
      const frostLed = !!d.regime?.frostLed;
      const light = !frostLed && !isFrostFree(c);
      const why = light ? WHY_FROST_LIGHT : WHY.frost;
      if (night && c && !isFrostFree(c)) {
        // Only the frost-tender crops the town's calendar has in the ground today (gardenToday).
        const garden = gardenToday(d);
        const value = `${night.tMin.toFixed(1)} °C ${weekday(night.date)}`;
        if (garden && !garden.tender.length) {
          return {
            ...base,
            why,
            status: "Monitor",
            value,
            text: "Cold enough to damage tender growth. By this town's sowing calendar no frost-tender crop is in the ground now.",
          };
        }
        return {
          ...base,
          why,
          status: "Limiting",
          value,
          text: garden
            ? `Cold enough to damage tender growth. Cover ${cropList(garden.tender)}, or pick what is ripe, before that night.`
            : "Cold enough to damage tender growth: cover tender plants, or pick what is ripe, before that night.",
        };
      }
      if (!c || isFrostFree(c)) {
        return {
          ...base,
          status: "Inactive",
          value: "Frost-free",
          text: `Frost is rare here. Coldest night in the next week: ${coldest.toFixed(1)} °C.`,
        };
      }
      if (light) {
        // One frost-night figure with its station, the same as the homestead page's (extremes frostNights). Day 5 audit,
        // 14 November 2026: this card said about 41, 37 and 20 nights at Nanaimo, Vancouver and Victoria (pooled from
        // several stations) while their homestead pages said 5.5, 15 and 9.7.
        const fn = frostNights(d.place.slug, c);
        const nights = fn && fn.nights >= 1 ? `about ${perYear(fn.nights)} nights a year (${fn.words})` : "a few nights a year";
        return {
          ...base,
          why,
          status: coldest <= 4 ? "Monitor" : "Inactive",
          value: `${c.firstFallFrost} – ${c.lastSpringFrost}`,
          text: `Frost here is ${nights}, between ${c.firstFallFrost} and ${c.lastSpringFrost} on average; tender plants want fleece on those nights. Coldest night in the next week: ${coldest.toFixed(1)} °C.`,
        };
      }
      if (d.daysToFirstFrost != null) {
        return {
          ...base,
          status: "Monitor",
          value: `${d.daysToFirstFrost} days`,
          text: `Average first autumn frost is around ${c.firstFallFrost}. Crops sown now must mature before then.`,
        };
      }
      return {
        ...base,
        status: coldest <= 4 ? "Monitor" : "Inactive",
        value: `${c.frostFreeDays} frost-free days`,
        text: `Typically ${c.lastSpringFrost} to ${c.firstFallFrost} here. Coldest night in the next week: ${coldest.toFixed(1)} °C.`,
      };
    }
    case "rains": {
      const r = d.regime;
      if (!r) return { ...base, status: "Inactive", value: "—", text: "The climate record for this place is still being read." };
      const season = regimeSeason(r, d.month, d.place.lat, { countryCode: d.place.countryCode, climate: c });
      // The month's own rain and this week's forecast, beside the regime's wet months. The Day 4 audit (13 Nov 2026) found
      // "Rainy season · rains May–Oct" in November at Fort Lauderdale (regimeSeason files a month next to the rains with
      // them), and "The rains are due next month" and "Dry season" at Sacramento, San Jose and Santa Barbara beside 40.9 to
      // 114.5 mm forecast for the week, in Novembers that average 31 to 45 mm. So a month outside the wet months never
      // carries a wet-season label, and a wet week is said to be one (regime wetWeek: a week's share of the month's average).
      const st = rainsNow(r, c, d.month);
      const { inRains, dry } = st;
      const next = (d.month % 12) + 1;
      const wetSpan = monthSpans(r.wetMonths);
      const { total } = weekRain(d);
      const mm = total.toFixed(1);
      const wetNow = wetWeek(total, st.monthMm);
      const forecast = `${mm} mm is forecast over the next seven days`;
      const average = st.monthMm != null ? `${MONTHS[d.month - 1]} averages about ${Math.round(st.monthMm)} mm` : "";
      if (r.rain === "little-rain" || (r.dryMonths.length === 12 && !inRains)) {
        return {
          ...base,
          title: "Dry climate",
          status: "Limiting",
          value: r.wetMonths.length ? `Rain ${wetSpan}` : "Dry all year",
          text: `${r.annualRainMm} mm a year${r.wetMonths.length ? `, most of it ${wetSpan}` : ""}: every bed runs on watering, and rivers run low or dry between storms.${wetNow ? ` ${forecast}.` : ""}`,
        };
      }
      const wetLabel = !season || season.id === "wet" || season.id === "long-rains" || season.id === "short-rains";
      const label = inRains
        ? (season?.label ?? "Rainy season")
        : wetLabel || (season?.id === "dry" && !dry)
          ? st.dueNext
            ? "Before the rains"
            : st.afterRains
              ? "After the rains"
              : dry
                ? "Dry season"
                : "Between the rains"
          : (season?.label ?? "Between the rains");
      if (inRains) {
        if (total < 5) {
          return {
            ...base,
            status: "Monitor",
            value: `${label} · ${wetSpan}`,
            text: `The rains usually fall ${wetSpan} here, but only ${forecast}: water new sowings until it comes.`,
          };
        }
        // "The main sowing window" and "the final rain-fed sowings" only where the town's own calendar sows mainly in this
        // month (crop-calendar mainSowingMonths). Day 5 audit, 14 November 2026: said in October at Nanaimo, Vancouver,
        // Victoria, Portland and Seattle, which sow 4 or 5 annuals in October against 30 to 35 in May and June.
        const main = mainSowingMonths(fitsFor(d)).months;
        const sowsNow = main.includes(d.month);
        return {
          ...base,
          status: sowsNow ? "Favourable" : "Monitor",
          value: `${label} · ${wetSpan}`,
          text: !sowsNow
            ? `The rains are on${main.length ? `, but few crops are sown now: most sowings here go in ${monthSpans(main)}` : ""}. Keep drains clear and the soil covered. Rivers run high and coloured after storms; mushrooms follow heavy rain by a week.`
            : st.last
              ? "The last month of the rains: get the final rain-fed sowings in and mulch to hold the moisture. Rivers are high and coloured after storms."
              : "The rains are on: the main sowing window, with the ground moist on its own. Rivers run high and coloured after storms; mushrooms follow heavy rain by a week.",
        };
      }
      if (wetNow) {
        return {
          ...base,
          status: "Favourable",
          // No season label beside a wet week: "Dry season" over 60 mm forecast is the contradiction the audit found.
          value: `${mm} mm this week${r.wetMonths.length ? ` · rains ${wetSpan}` : ""}`,
          text: `${forecast}${average ? `; ${average} here` : ""}, and the wet months are ${wetSpan}. Rivers rise and colour after heavy rain.`,
        };
      }
      if (st.dueNext) {
        return {
          ...base,
          status: "Monitor",
          value: `${label} · rains from ${monthSpans([next])}`,
          text: `The wet months here are ${wetSpan}${average ? `; ${average}` : ""}. Prepare and mulch beds now so seed can go in with the first good rain${dry ? "; rivers are at their lowest and clearest" : ""}.`,
        };
      }
      return {
        ...base,
        status: dry ? "Limiting" : "Monitor",
        value: `${label}${r.wetMonths.length ? ` · rains ${wetSpan}` : ""}`,
        text: dry
          ? "Anything sown now needs watering through to harvest, so sow less and mulch deeply. Rivers are low and clear; fish hold in the deeper pools."
          : "Between the seasons: rain is unreliable, so water new sowings until they are established.",
      };
    }
    case "soil": {
      const s = f.soilTemp6cm;
      if (s == null) return { ...base, status: "Inactive", value: "—", text: "No soil reading is available for this location." };
      const value = `${s.toFixed(1)} °C`;
      // A soil reading says what would germinate, not what is worth sowing: the sowing sentence comes from the
      // town's own sowing windows for today (src/lib/soil-sowing), the same ones as the "sow now" lists. The
      // temperature facts are the germination thresholds the page has always given, by kind of seed and naming no crop: the
      // Day 4 audit (13 Nov 2026) found "Warm enough for beans, maize, squash, cucumber and transplanted tomato and pepper" at
      // Fort Myers, Orlando, Tampa, Fort Lauderdale and Miami, whose calendars offered none of them that day.
      const sow = soilSowingFor(d);
      const closed = sow != null && sow.open.length === 0;
      const tail = sow ? ` ${sow.text}` : "";
      if (s < 5)
        return { ...base, status: "Limiting", value, text: `Below 5 °C almost no seed germinates and root uptake is minimal. Seed sown now is likely to rot.${tail}` };
      // The crops the old sentences named are left to the sowing sentence after them, which lists what is open today.
      let fact: string;
      if (s < 10) fact = "Cool-season seed can germinate at this temperature; beans and maize germinate poorly.";
      else if (s < 16) fact = "Warm enough for most cool-season seed to germinate; warm-season seed germinates slowly or not at all.";
      else if (s <= 30) fact = "Warm enough for warm-season seed to germinate and for roots to grow quickly.";
      else fact = "Germination declines above 30 °C and root growth slows; mulch and shade the row.";
      return { ...base, status: closed ? "Inactive" : s < 10 || s > 30 ? "Monitor" : "Favourable", value, text: `${fact}${tail}` };
    }
    case "daylength": {
      const { today, change } = dayLength(d.place.lat, d.place.lon, now);
      const gaining = change > 0;
      const per = Math.abs(change) < 1 ? "under a minute" : `${Math.round(Math.abs(change))} minutes`;
      const favourable = gaining && today >= 730;
      return {
        ...base,
        status: favourable ? "Favourable" : "Inactive",
        value: fmtLen(today),
        text: `${gaining ? "Gaining" : "Losing"} about ${per} of daylight a day.${favourable ? " Lengthening days increase daily growth." : ""}`,
      };
    }
    case "heat": {
      const gdd = Math.round(days.reduce((a, x) => a + Math.max(0, (x.tMax + x.tMin) / 2 - 10), 0));
      const value = `${gdd} GDD / ${days.length} days`;
      // The crops named are the frost-tender (warm-season) ones the town's calendar has in the ground today (gardenToday).
      // The Day 4 audit (13 Nov 2026) found "Steady heat. Tomatoes set fruit, maize grows quickly" in November at Phoenix,
      // Tucson, Los Angeles and San Diego, with no tomato or maize in their calendars that month; the fruit-set and pest
      // sentences rested on no source and are gone.
      const garden = gardenToday(d);
      const warm = garden ? garden.tender : null;
      const theseIn = warm && warm.length ? `the ${cropList(warm)} in the ground` : "";
      if (gdd < 10)
        return {
          ...base,
          status: "Limiting",
          value,
          text: `Little heat is accumulating.${warm == null ? " Warm-season crops make almost no growth in a week like this." : theseIn ? ` By this town's calendar ${theseIn} make almost no growth in a week like this.` : ""}`,
        };
      if (gdd < 50)
        return {
          ...base,
          status: "Monitor",
          value,
          text: `Slow accumulation: suits cool-season crops${warm == null ? "; maize and melons make little progress." : theseIn ? `; ${theseIn} make little progress.` : "."}`,
        };
      // Over the top of a crop's range in the site's crop records (src/data/crop-grow.json `temp`, the fourth figure).
      const highs = days.reduce((a, x) => a + x.tMax, 0) / Math.max(1, days.length);
      const tooHot = (warm ?? []).filter((x) => x.crop.grow != null && highs > x.crop.grow.temp[3]);
      if (gdd < 120)
        return {
          ...base,
          status: "Favourable",
          value,
          text: `Steady heat${warm == null ? ": warm-season crops grow well in a week like this." : theseIn ? `: ${theseIn} grow on well.` : ". By this town's sowing calendar no warm-season crop is in the ground now."}`,
        };
      return {
        ...base,
        status: "Monitor",
        value,
        text: `High heat: growth is fast.${tooHot.length ? ` Afternoons averaging ${Math.round(highs)} °C pass the top of the range for ${cropList(tooHot)}; shade and water them.` : ""}`,
      };
    }
    case "rain": {
      const { total, wet } = weekRain(d);
      const mm = total.toFixed(1);
      const value = `${mm} mm / ${days.length} days`;
      const across = `${mm} mm across ${wet} day${wet === 1 ? "" : "s"}`;
      // Watering and blight advice only for what the town's calendar has growing (gardenToday).
      const garden = gardenToday(d);
      const idle = !!garden && !garden.growing.length;
      if (total <= 60 && idle)
        return { ...base, status: "Inactive", value, text: `${mm} mm over seven days. No crop in this town's sowing calendar is growing at this time of year.` };
      if (total < 5)
        return {
          ...base,
          status: "Limiting",
          value,
          text: `${mm} mm over seven days. Most gardens need about 25 mm a week; water deeply twice a week rather than lightly every day.`,
        };
      if (total < 20)
        return { ...base, status: "Monitor", value, text: `${across}, below the 25 mm a week most beds need. Water the crops most sensitive to drought.` };
      if (total <= 60) return { ...base, status: "Favourable", value, text: `${across}. Sufficient; no watering needed.` };
      const blight = garden ? garden.inGround.filter((f) => f.crop.slug === "tomato" || f.crop.slug === "potato") : null;
      const risks = [
        ...(blight == null ? ["blight on tomatoes and potatoes"] : blight.length ? [`blight on ${cropList(blight)}`] : []),
        ...(idle ? [] : ["slug activity at night"]),
        "high, turbid rivers",
      ];
      return {
        ...base,
        status: "Monitor",
        value,
        text: `${mm} mm in a week is heavy. Expect ${risks.length > 1 ? `${risks.slice(0, -1).join(", ")} and ${risks[risks.length - 1]}` : risks[0]}.`,
      };
    }
    case "pollination": {
      const flying = days.filter((x) => x.tMax >= 13 && x.tMax <= 38 && x.windMax < 30 && (x.precip ?? 0) < 2).length;
      const value = `${flying} of ${days.length} flying days`;
      if (!flying) {
        // Hand pollination only for the squash-family crops the town's calendar is picking today (gardenToday).
        const garden = gardenToday(d);
        const flowering = garden?.flowering ?? [];
        return {
          ...base,
          status: flowering.length ? "Limiting" : "Inactive",
          value,
          text: `No suitable flying days in the next week: too cold, wet or windy.${flowering.length ? ` The ${cropList(flowering)} in flower may need hand pollination.` : ""}`,
        };
      }
      const ahead = `${flying} suitable flying day${flying === 1 ? "" : "s"} ahead.`;
      if (flying < 4)
        return { ...base, status: "Monitor", value, text: `${ahead} Bees forage between about 13 °C and 38 °C, in wind under 30 km/h, and not in rain.` };
      return { ...base, status: "Favourable", value, text: `${ahead} Open flowers will be visited; provide shallow water and delay any spraying until dusk.` };
    }
    case "moon": {
      const m = d.moon;
      const waxing = m.age < 14.77;
      const toFull = Math.max(0, Math.round((new Date(m.nextFull + "T12:00:00Z").getTime() - new Date(d.today + "T12:00:00Z").getTime()) / 86400000));
      return {
        ...base,
        status: m.fishingRating === "Excellent" ? "Favourable" : "Monitor",
        value: `${m.phaseName} · ${m.illumination}%`,
        text: `${waxing ? "Waxing" : "Waning"}, ${Math.round(m.age)} days old. Full moon in ${toFull} days. Solunar rating: ${m.fishingRating.toLowerCase()} (a tradition).`,
      };
    }
    case "wind": {
      const now = Math.round(f.current.wind);
      const peak = Math.round(Math.max(...days.map((x) => x.windMax)));
      const value = `${now} km/h now · ${peak} peak`;
      if (now >= 30)
        return { ...base, status: "Monitor", value, text: "Strong enough to tear leaves, dry beds quickly and make small boats unsafe. Stake tall plants." };
      if (now >= 10)
        return {
          ...base,
          status: "Favourable",
          value,
          text: 'A moderate breeze ripples the surface, drifts a boat at fishing speed and concentrates baitfish on the windward shore (the angler\'s "walleye chop").',
        };
      return {
        ...base,
        status: "Monitor",
        value,
        text: "Calm. Suitable for spraying and transplanting, and rising fish are easy to see on flat water; calm, bright days push fish deeper.",
      };
    }
    case "decomposition": {
      const s = f.soilTemp6cm ?? 0;
      const { total } = weekRain(d);
      const value = `${s.toFixed(1)} °C soil · ${total.toFixed(1)} mm`;
      if (s < 5)
        return { ...base, status: "Inactive", value, text: "Cold halts most soil biological activity. A compost heap built now will not decompose until spring." };
      if (total < 5)
        return {
          ...base,
          status: "Monitor",
          value,
          text: "Warm but dry. Decomposition stalls without moisture; water the compost heap. Few mushrooms will fruit.",
        };
      if (s >= 15 && total >= 20)
        return {
          ...base,
          status: "Favourable",
          value,
          text: "Warm and damp: the fastest decomposition of the year. Compost heats, leaf mould breaks down, earthworms are active near the surface, and mushrooms fruit two to seven days after heavy rain.",
        };
      return {
        ...base,
        status: "Favourable",
        value,
        text: "Steady decomposition. Earthworms and fungi are incorporating last year's leaf litter into the soil.",
      };
    }
  }
}

/** The force ids for a place and section: no frost tile where frost is rare, a rains tile where the rain comes in seasons. */
export function forceIdsFor(d: LocalData, section: ForceSection): ForceId[] {
  const ids = [...SECTION_FORCES[section]];
  const noFrost = isFrostFree(d.climate);
  const seasonal = !!d.regime && d.regime.rain !== "year-round" && !d.regime.frostLed;
  const i = ids.indexOf("frost");
  if (noFrost) {
    // No frost here: the rains (or the dry climate) take the frost tile's place.
    ids.splice(i, 1, "rains");
    return ids;
  }
  if (seasonal) {
    // Frost still happens, so its tile stays; the rains go in beside it and the section's last other tile makes room.
    ids.splice(i + 1, 0, "rains");
    for (let j = ids.length - 1; j >= 0; j--) {
      if (ids[j] !== "rains" && ids[j] !== "frost") {
        ids.splice(j, 1);
        break;
      }
    }
  }
  return ids;
}

/** The forces for one section of a place's pages, in that section's order. */
export function forcesFor(d: LocalData, section: ForceSection, now = new Date()): Force[] {
  return forceIdsFor(d, section).map((id) => force(d, id, now));
}
