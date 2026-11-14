/**
 * The day at a place, phase by phase (/the-day/<town>): the DayScrubber's
 * `data` — the sun now, the day's eight solar phases with their times and the
 * sun's place in each, what each phase means here (the sun, the region's
 * light, small and large scale), the creatures about in each, and the day's
 * weather character.
 *
 * The phases are the windows of `dayShape` (src/lib/daypart) that begin on
 * the local calendar day, so tonight's night runs on into tomorrow's first
 * light; the phase now is marked even when the window now began yesterday.
 */
import { dayShape } from "./daypart";
import { regionOf } from "./region";
import { CHARACTER, creaturesInPhase, weatherCharacters, type PhaseCreature } from "./rhythm";
import { DAY_PHASES, DAY_RHYTHMS, REGION_DAY, characterAdvice, characterCaption, storyText, type DayPhase } from "@/data/day-stories";
import { fishWatersAt, placeFacts } from "./place-scope";
import { fishByWater } from "./fishing-waters";
import { pieceAt } from "./where";
import { fitsFor } from "./soil-sowing";
import { doyOfIso, sowNow } from "./crop-calendar";
import type { LocalData } from "./types";
import { dateIn as localDate, hhmmIn as hhmm } from "./tz";

export type DaySlide = {
  phase: DayPhase;
  label: string;
  from: string;
  to: string;
  minutes: number;
  isNow: boolean;
  altitude: number;
  azimuth: number;
  compass: string;
  sun: string;
  light: string | null;
  micro: string | null;
  macro: string | null;
  /** The weather character's line for the fish and for the garden in this phase (null: none fits it). */
  captionWater: string | null;
  captionLand: string | null;
  water: PhaseCreature[];
  garden: PhaseCreature[];
  resting: string[];
};

export type DayPageData = {
  placeLabel: string;
  regionSlug: string;
  regionName: string;
  peakAltitude: number;
  polar: "midnight-sun" | "polar-night" | null;
  nowAltitude: number;
  nowAzimuth: number;
  nowCompass: string;
  currentPhase: DayPhase | null;
  minutesLeftNow: number | null;
  character: string;
  characterLabel: string;
  characterSummary: string;
  characterAdvice: string;
  alsoCharacters: string[];
  slides: DaySlide[];
};

/**
 * Whether a crop is in its sowing window at the town on its local date: the same windows as the gardening page's "In
 * their sowing window today" (src/lib/soil-sowing, src/lib/crop-calendar sowNow), annuals sown or sown with watering
 * and perennials planted. False where the calendar cannot be worked out (no climate or regime): the overcast "good for
 * transplanting and sowing" line is then not shown (audit of 10 November 2026: it ran on 10 November in towns whose
 * soil panel said no crop was in its window).
 */
export function sowingOpen(data: LocalData, today: string): boolean {
  const fits = fitsFor(data);
  if (!fits.length) return false;
  const now = sowNow(fits, Number(today.slice(5, 7)), doyOfIso(today));
  return now.sow.length + now.sowWatered.length + now.plant.length > 0;
}

type Window = { phase: DayPhase; start: Date; end: Date; midAltitude: number; midAzimuth: number; midCompass: string; minutes: number };

const round1 = (x: number) => Math.round(x * 10) / 10;

export function dayPageData(data: LocalData, now = new Date()): DayPageData {
  const { place } = data;
  const tz = data.forecast.timezone;
  const shape = dayShape(place.lat, place.lon, now) as {
    windows: Window[];
    current: Window | null;
    position: { altitude: number; azimuth: number; compass: string };
    peakAltitude: number;
    polar: "midnight-sun" | "polar-night" | null;
  };
  const eco = regionOf(place.lat, place.lon);
  const today = localDate(now, tz);
  const cur = shape.current;
  const chars = weatherCharacters(data.forecast);
  const ch = CHARACTER[chars[0]];
  const region = REGION_DAY[eco.slug];
  const sowing = sowingOpen(data, today);
  // Region stories hold only where their conditions do (src/lib/where.ts): lake text near a Great Lake shore, leaf
  // text in the town's leaf-on window, coast, tide, bay, coastal-plain, range, season and fish text where the town
  // has them (src/lib/place-scope.ts). Audit of 10 November 2026.
  // A fish line that names a kind of water (walleye on lake shoals, striped bass on the tide) needs the fishing page to
  // list the fish in that water today (audit of 11 November 2026); with no water setting none does.
  const fishWaters = data.water ? fishWatersAt(fishByWater(data.month, eco.slug, data.water, { place, today })) : undefined;
  const show = placeFacts(place, { climate: data.climate, date: today, sowing, fishWaters });
  const atWater = (phase: DayPhase, list: PhaseCreature[]): PhaseCreature[] =>
    list.map((c) => {
      const r = DAY_RHYTHMS[c.slug]?.[phase];
      // `at` holds alternatives: the first that holds here.
      const t = r && r !== "rest" && r.at ? (r.at.map((p) => pieceAt(p, show)).find((x) => !!x) ?? null) : null;
      return t ? { ...c, where: t } : c;
    });

  const slides: DaySlide[] = shape.windows
    .filter((w) => localDate(w.start, tz) === today)
    .map((w) => {
      const who = creaturesInPhase(w.phase, data.month, eco.slug, data.water, data.place, data.today);
      const story = region?.[w.phase];
      return {
        phase: w.phase,
        label: DAY_PHASES[w.phase].label,
        from: hhmm(w.start, tz),
        to: hhmm(w.end, tz),
        minutes: w.minutes,
        isNow: !!cur && w.phase === cur.phase,
        altitude: round1(w.midAltitude),
        azimuth: Math.round(w.midAzimuth),
        compass: w.midCompass,
        sun: DAY_PHASES[w.phase].sun,
        light: storyText(story?.light, show),
        micro: storyText(story?.micro, show),
        macro: storyText(story?.macro, show),
        captionWater: characterCaption(chars[0], "water", w.phase),
        captionLand: characterCaption(chars[0], "land", w.phase, { sowing }),
        water: atWater(w.phase, who.water),
        garden: who.garden,
        resting: who.resting,
      };
    });

  return {
    placeLabel: place.label,
    regionSlug: eco.slug,
    regionName: eco.name,
    peakAltitude: Math.round(shape.peakAltitude),
    polar: shape.polar,
    nowAltitude: round1(shape.position.altitude),
    nowAzimuth: Math.round(shape.position.azimuth),
    nowCompass: shape.position.compass,
    currentPhase: cur?.phase ?? null,
    minutesLeftNow: cur ? Math.max(0, Math.round((cur.end.getTime() - now.getTime()) / 60000)) : null,
    character: chars[0],
    characterLabel: ch.label,
    characterSummary: ch.summary,
    characterAdvice: characterAdvice(chars[0], { sowing }),
    alsoCharacters: chars.slice(1).map((c) => CHARACTER[c].label),
    slides,
  };
}
