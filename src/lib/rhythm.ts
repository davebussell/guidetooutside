/**
 * The day's rhythm at a place: the weather "character" of the day (front,
 * frost, rain, heat, cloud, wind or a clear calm), and which fish and garden
 * creatures are about in each phase of the sun (src/data/day-stories.ts).
 */
import { DAY_CHARACTERS, DAY_RHYTHMS, type DayPhase } from "@/data/day-stories";
import { CREATURES, type Creature, type PlaceLike } from "./nature";
import type { PlaceScope } from "./closed-seasons";
import { inSeasonOnPage } from "./fishing-waters";
import { inSeasonAt } from "./species";
import { creatureImage } from "./creature-images";
import type { Forecast } from "./types";
import type { WaterSetting } from "./water-setting";

export type CharacterId = "front" | "frost" | "windy" | "wet" | "heat" | "overcast" | "bluebird";

/** Every character the day has, the strongest first. */
export function weatherCharacters(f: Forecast): CharacterId[] {
  const d0 = f.days[0];
  const out: CharacterId[] = [];
  if ((f.pressureTrend ?? 0) <= -3) out.push("front");
  if (d0 && d0.tMin <= 1) out.push("frost");
  if (f.current.wind >= 30 || (d0?.windMax ?? 0) >= 35) out.push("windy");
  if (d0 && d0.precip >= 2) out.push("wet");
  if (d0 && d0.tMax >= 30) out.push("heat");
  if ((f.cloudCover ?? (f.current.code >= 3 ? 100 : 0)) >= 50) out.push("overcast");
  if (!out.length) out.push("bluebird");
  return out;
}

export const characterOf = (f: Forecast): CharacterId => weatherCharacters(f)[0];
export const CHARACTER = DAY_CHARACTERS as Record<CharacterId, { label: string; summary: string; advice: string; water: string; land: string }>;

export type PhaseCreature = {
  slug: string;
  name: string;
  latin: string;
  group: Creature["group"];
  src: string | null;
  where: string;
  peaking: boolean;
};

/**
 * What is about in a phase: the active fish ("water") and garden creatures,
 * peaks first, at most four of each, and the resting ones (fish then garden,
 * at most six). Creatures in season in the place's region, in library order;
 * fish only where the place has their water AND the fish has been recorded
 * near the town (src/lib/fish-presence.ts): a region's fish list is not a
 * claim that a fish lives here (audit, 2 November 2026). A fish the regulator
 * has closed at the place today is not offered as active or "best now".
 *
 * Audit of 10 November 2026: a fish is offered here only when the fishing page
 * lists it as in season on the day (src/lib/fishing-waters `inSeasonOnPage`:
 * the months its records near the town bear out for a sea fish, the closed
 * rows, and the catch-and-release-only rows, water by water). The library's
 * months, used until 11 November, put striped bass "active" at Moncton and
 * Portland in November, when the fishing page had none: 188 town, date and
 * fish entries disagreed. Garden creatures keep the library's months.
 */
export function creaturesInPhase(phase: DayPhase, month: number, regionSlug: string, water: WaterSetting | null,
  place: (PlaceLike & PlaceScope & { slug?: string }) | null,
  today?: string | Date,
) {
  const about = (c: Creature) =>
    c.group === "fish"
      ? inSeasonOnPage(c, month, regionSlug, place, { today, water })
      : (c.regions === "all" || c.regions.includes(regionSlug)) && inSeasonAt(c, month, regionSlug);
  const active: { c: Creature; where: string; peak: boolean }[] = [];
  const resting: Creature[] = [];
  for (const c of CREATURES) {
    const r = DAY_RHYTHMS[c.slug]?.[phase];
    if (!r || !about(c)) continue;
    if (r === "rest") resting.push(c);
    else active.push({ c, where: r.where, peak: r.peak });
  }
  const pick = (fish: boolean) =>
    active
      .filter((a) => (a.c.group === "fish") === fish)
      .map((a, i) => ({ a, i }))
      .sort((x, y) => Number(y.a.peak) - Number(x.a.peak) || x.i - y.i)
      .slice(0, 4)
      .map(({ a }): PhaseCreature => ({
        slug: a.c.slug,
        name: a.c.name,
        latin: a.c.latin,
        group: a.c.group,
        src: creatureImage(a.c.slug)?.src ?? null,
        where: a.where,
        peaking: a.peak,
      }));
  const rest = [...resting.filter((c) => c.group === "fish"), ...resting.filter((c) => c.group !== "fish")].slice(0, 6).map((c) => c.name);
  return { water: pick(true), garden: pick(false), resting: rest };
}
