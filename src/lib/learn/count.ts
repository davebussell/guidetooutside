/**
 * Today's nature count for a place (/learn/count/<town>): the day's real
 * numbers — daylight, days to the first frost, nights to the full moon, what
 * has been recorded nearby this month, the day's temperatures, the week's
 * rain and the named waters — each written as counting for a two-, a four- and
 * a six-year-old; and which animals are about at this hour.
 *
 * The wording is the live page's, reconstructed from the ten captured towns.
 */
import { sunTimes } from "@/lib/sun";
import { dayShape } from "@/lib/daypart";
import { getMoon } from "@/lib/moon";
import { DAY_PHASES, DAY_RHYTHMS, type DayPhase } from "@/data/day-stories";
import { CREATURES, type Creature } from "@/lib/nature";
import { habitatsOf } from "@/lib/fish-habitats";
import { inSeasonAt } from "@/lib/species";
import { creatureImage } from "@/lib/creature-images";
import { regionOf } from "@/lib/region";
import { daysBetween } from "@/lib/kids/world";
import { frostCountdown } from "@/lib/local-data";
import type { LocalData } from "@/lib/types";

export type CountCard = {
  key: string;
  n: number;
  display: string;
  label: string;
  source: string;
  game: "count" | "tally" | "more" | "legs";
  handsOff?: boolean;
  prompts: { two: string; four: string; six: string };
};

export type Recorded = { all: number; fungi: number; trees: number } | null;

const plural = (n: number, one: string, many = `${one}s`) => `${n} ${n === 1 ? one : many}`;

function daylightMinutes(lat: number, lon: number, at: Date): number | null {
  const t = sunTimes(lat, lon, at);
  if (!t.sunrise || !t.sunset) return null;
  return Math.round((t.sunset.getTime() - t.sunrise.getTime()) / 60000);
}

export function countCards(data: LocalData, recorded: Recorded, now = new Date()): CountCard[] {
  const { place, forecast, climate } = data;
  const tz = forecast.timezone;
  const cards: CountCard[] = [];

  // Daylight, from the sun's position.
  const mins = daylightMinutes(place.lat, place.lon, now);
  if (mins != null) {
    const n = Math.round(mins / 60);
    const tomorrow = daylightMinutes(place.lat, place.lon, new Date(now.getTime() + 864e5)) ?? mins;
    const change = Math.round(Math.abs(tomorrow - mins));
    const way = tomorrow < mins ? "shorter" : "longer";
    const fingers =
      n > 10
        ? `Hold up ten fingers, then start again — ${n} needs both hands and ${plural(n - 10, "more finger", "more fingers")}.`
        : `Hold up ${n} fingers, one for each hour.`;
    cards.push({
      key: "daylight",
      n,
      display: `${Math.floor(mins / 60)} h ${mins % 60} m`,
      label: "of daylight today",
      source: `Sunrise and sunset for ${place.name}, from the sun's position — not a forecast, so it is exact.`,
      game: "count",
      prompts: {
        two: "Go to the window together. Is it light or dark? Point at the sky, then at the floor where the light lands. Count the bright patches: one, two.",
        four: `The sun is up for about ${n} hours today. ${fingers} Now count how many hours until bedtime.`,
        six: `${n} hours of light means ${24 - n} hours of dark. Which is longer, and by how many hours? Tomorrow will be about ${change} minutes ${way} — so by this day next week, how many minutes ${way} will it be?`,
      },
    });
  }

  // Days to the average first frost.
  const toFrost = frostCountdown(climate, now.toLocaleDateString("en-CA", { timeZone: tz })).daysToFirstFrost;
  if (climate && toFrost != null && toFrost > 0) {
    const n = toFrost;
    const weeks = Math.floor(n / 7);
    const days = n % 7;
    cards.push({
      key: "frost",
      n,
      display: String(n),
      label: `days until the first frost, on average (${climate.firstFallFrost})`,
      source:
        climate.frostSource === "stations"
          ? `Measured by the weather stations nearest ${place.name}, over about twelve years.`
          : "From the reanalysis record for this grid square — a good average, not a promise about this year.",
      game: "tally",
      prompts: {
        two: "Frost is what makes the grass crunch. Go and touch something cold, then something warm. That is two things. Say cold, say warm.",
        four: `${n} sleeps until the first frost usually comes. Count ${Math.min(n, 20)} stones into a jar — take one out each evening and count what is left.`,
        six: `${n} days to the first frost. That is ${plural(weeks, "week")} and ${plural(days, "day")}. Make a paper chain with ${n} links and break one off each morning — and when the frost actually comes, count how many links are left over. Was the average early or late this year?`,
      },
    });
  }

  // Nights to the full moon, read on the place's own calendar.
  const moon = getMoon(now, tz);
  const today = now.toLocaleDateString("en-CA", { timeZone: tz });
  const toFull = daysBetween(today, moon.nextFull);
  const age = Math.round(moon.age);
  cards.push({
    key: "moon",
    n: toFull,
    display: String(toFull),
    label: "nights until the moon is full",
    source: `The moon is ${moon.illumination}% lit tonight and ${age} days past new.`,
    game: "count",
    prompts: {
      two: "Go outside tonight and point at the moon. Is it a circle, or a slice? Say which. Then find something else in the sky and point at that.",
      four: `${toFull} more sleeps until the moon is a full circle. Draw the moon tonight on a piece of paper, and again tomorrow night. Are the two drawings the same?`,
      six: `The moon is ${moon.illumination}% lit and ${age} days past new. It takes about 29 days to go all the way round. ${toFull} nights to full: so how many days ago was it new, and does that match the ${age} we just said?`,
    },
  });

  // What has been recorded near here this month (iNaturalist).
  if (recorded && recorded.all > 0) {
    const n = recorded.all;
    cards.push({
      key: "recorded",
      n,
      display: String(n),
      label: "kinds of living thing photographed within 40 km this month",
      source: "Counted from what people near here have photographed and identified this month, on iNaturalist.",
      game: "tally",
      handsOff: true,
      prompts: {
        two: "Find one leaf. Only one. Bring it back and put it on the table. Now find one more. How many is that?",
        four: `${n} different kinds have been found near here this month by grown-ups with cameras. Go and find five different leaves, and lay them out smallest to biggest.`,
        six: `${n} kinds recorded within 40 km this month. Take one walk and tally everything different you see — four marks and a line across for five. How close did you get to a hundred? How many walks would it take to reach ${n}?`,
      },
    });
  }
  if (recorded && recorded.fungi > 0) {
    const n = recorded.fungi;
    cards.push({
      key: "fungi",
      n,
      display: String(n),
      label: "kinds of mushroom recorded near here this month",
      source: "The fungi among this month's nearby observations. Counting only — this site does not teach children to pick mushrooms.",
      game: "count",
      handsOff: true,
      prompts: {
        two: "Find a mushroom with your eyes. Point at it with one finger. Hands stay behind your back — we look at mushrooms, we never pick them up.",
        four: "Count the mushrooms you can see without moving your feet. Then take three steps and count again. Hands stay in pockets the whole time.",
        six: `${n} kinds of mushroom have been recorded near here this month. Find one log and count the caps on it. Then get right down low and count the gills underneath one cap — most have more than you can count in one go, so count in fives. Looking only, the whole way.`,
      },
    });
  }
  if (recorded && recorded.trees > 0) {
    const n = recorded.trees;
    cards.push({
      key: "trees",
      n,
      display: String(n),
      label: "kinds of tree recorded around here",
      source: "The tree genera among nearby observations — maples, oaks, pines and whatever else people have photographed.",
      game: "more",
      prompts: {
        two: "Put both arms around a tree. Now find another tree and do it again. That is two trees. Can you find a third?",
        four: `There are about ${n} kinds of tree around here. Count the trees between the door and the road. Then count them again on the way back — do you get the same number?`,
        six: "Pick a tree and count your steps all the way around it. Now find a fatter one and do the same. How many more steps did the big one take? Measure three trees and put them in order.",
      },
    });
  }

  // Today's warmest and coldest.
  const day = forecast.days[0];
  if (day) {
    const hi = Math.round(day.tMax);
    const lo = Math.round(day.tMin);
    const fall = hi - lo;
    cards.push({
      key: "temp",
      n: fall,
      display: `${hi}° / ${lo}°`,
      label: "today's warmest and coldest",
      source: "Today's forecast for this point, refetched every time the page loads.",
      game: "more",
      prompts: {
        two: "Go outside and say whether it is warm or cold. Then put one hand on the window and say it again. Warm, or cold?",
        four: `${hi} degrees at the warmest, ${lo} at the coldest. Which number is bigger? Count up from ${lo} to ${hi} out loud.`,
        six: `From ${hi}° down to ${lo}° is a fall of ${fall} degrees. What is half of that? If tonight fell another ${fall} degrees below ${lo}, where would it land — and would that be a frost?`,
      },
    });
  }

  // The week's rain.
  const week = forecast.days.slice(0, 7);
  const rain = Math.round(week.reduce((a, d) => a + (d.precip ?? 0), 0));
  if (rain > 0) {
    cards.push({
      key: "rain",
      n: rain,
      display: `${rain} mm`,
      label: "of rain forecast over the next seven days",
      source: "The seven-day forecast for this point, added up.",
      game: "more",
      prompts: {
        two: "Find a puddle. Jump in it. Count the jumps: one, two, three. Now find a dry patch and stand on that instead.",
        four: `About ${rain} millimetres of rain is coming this week. Stand a straight-sided jar outside where nothing overhangs it, and look at it every morning for seven days.`,
        six: `${rain} mm forecast over ${week.length} days. If it fell evenly, how much would fall each day? Put a jar out, mark the level each morning with a pen, and on Sunday count the marks and see how far off the forecast was.`,
      },
    });
  }

  // The named waters.
  const waters = [...data.waters].sort((a, b) => a.distanceKm - b.distanceKm);
  if (waters.length) {
    const n = waters.length;
    const near = waters[0];
    cards.push({
      key: "waters",
      n,
      display: String(n),
      label: "named lakes and rivers within 20 km",
      source: `From the map. The nearest is ${near.name}, ${near.distanceKm} km away.`,
      game: "legs",
      prompts: {
        two: "Find some water — a puddle, a pond, a stream. Point at it. Is it moving, or is it still?",
        four: `There are ${n} named lakes and rivers within a short drive. The closest is ${near.name}. Throw 10 small stones in, one at a time, counting each one out loud.`,
        six: `${n} named waters within 20 km; ${near.name} is the nearest at ${near.distanceKm} km. If you walked there at 5 km an hour, how long would it take? Count the stones you skip — and count the skips on the best one.`,
      },
    });
  }
  return cards;
}

/** Where the creatures that are resting at this hour are, as the live count page said it. */
const RESTING: Record<string, string> = {
  walleye: "Down the break in five to ten metres, or tight to the bottom in the deepest hole they can find. A walleye is light-shy before it is anything else.",
  "lake-trout": "Deep, below the thermocline, in the coldest water in the lake. In midsummer that can be forty metres down.",
  "brown-trout": "Under the undercut bank, and almost impossible to move in daylight once it is over a couple of pounds.",
  "chinook-salmon": "Down deep to the temperature it wants, or holding motionless in a river pool.",
  "ground-beetle": "Under boards, stones and mulch through the day — which is why leaving them there matters.",
  earthworm: "Down in the burrow. Sun and dry air kill an earthworm within an hour.",
  "rainbow-trout": "Holding deeper in the pool, still feeding but subsurface and much harder to reach.",
  "striped-bass": "Off the bar in deeper, cooler water.",
  "black-crappie": "Deeper and tighter to the brush through the bright hours.",
  "channel-catfish": "Deep holes, log jams and undercuts through the whole daylight.",
  slug: "Under pots, boards, mulch and the rim of the bed. Go out an hour after dark with a torch and you will find them all.",
};

export type AwakeAnimal = { slug: string; name: string; src: string; credit: string; awake: boolean; where: string };

/**
 * Who is about at this hour: the creatures in season here that are active in
 * the current phase of the sun (peaks first, then library order, six at most),
 * then up to six that are resting now (fish first).
 */
export function awakeNow(data: LocalData, now = new Date()): { animals: AwakeAnimal[]; phaseLabel: string; clock: string } {
  const { place } = data;
  const shape = dayShape(place.lat, place.lon, now) as { current: { phase: DayPhase } | null };
  const phase: DayPhase = shape.current?.phase ?? "night";
  const region = regionOf(place.lat, place.lon).slug as string;
  const here = new Set(data.water?.habitats ?? []);
  const inRegion = (c: Creature) => (c.regions === "all" || c.regions.includes(region)) && inSeasonAt(c, data.month, region);
  const fishHere = (c: Creature) => c.group !== "fish" || !data.water || habitatsOf(c.slug).some((h) => here.has(h));
  const active: { c: Creature; where: string; peak: boolean; i: number }[] = [];
  const resting: Creature[] = [];
  CREATURES.forEach((c, i) => {
    const r = DAY_RHYTHMS[c.slug]?.[phase];
    if (!r || !inRegion(c) || !fishHere(c) || !creatureImage(c.slug)) return;
    if (r === "rest") resting.push(c);
    else active.push({ c, where: r.where, peak: r.peak, i });
  });
  const credit = (slug: string) => {
    const img = creatureImage(slug)!;
    return { src: img.src, credit: `${img.author} · ${img.license}` };
  };
  const awake = active
    .sort((a, b) => Number(b.peak) - Number(a.peak) || a.i - b.i)
    .slice(0, 6)
    .map(({ c, where }): AwakeAnimal => ({ slug: c.slug, name: c.name, ...credit(c.slug), awake: true, where }));
  const asleep = [...resting.filter((c) => c.group === "fish"), ...resting.filter((c) => c.group !== "fish")]
    .slice(0, 6)
    .map((c): AwakeAnimal => ({ slug: c.slug, name: c.name, ...credit(c.slug), awake: false, where: RESTING[c.slug] ?? c.where }));
  const clock = now.toLocaleTimeString("en-CA", { hour: "numeric", minute: "2-digit", timeZone: data.forecast.timezone });
  return { animals: [...awake, ...asleep], phaseLabel: DAY_PHASES[phase].label.toLowerCase(), clock };
}
