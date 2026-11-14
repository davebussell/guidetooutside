/**
 * Whether a lesson fits a place in a month, beyond the lesson's own months (src/lib/learn/lessons.ts `months`, which are
 * read the same everywhere, half a year on south of the equator).
 *
 * Day 5 audit, 14 November 2026: the season plans put "A hundred acorns" (September to November) at Fairbanks, Laramie
 * and Bozeman, where no oak grows near the town, and "Counting mushrooms" in mid-November and December at Fairbanks,
 * International Falls, Grand Forks, Laramie and Bozeman, where the nights average far below freezing. So:
 *  - a lesson that names a wild food (`needsSpecies`) is left out where the presence table (src/lib/plant-presence) has
 *    checked the town and found no record, or too few to say it grows there; a town the table cannot speak for keeps it;
 *  - a lesson about something that comes up out of the ground (`groundOpen`) is left out in a month whose nights average
 *    below FROZEN_NIGHT_C, the line the crop calendar uses for ground that is frozen or unworkable (src/lib/crop-calendar
 *    SOW_NIGHT_HARDY).
 * The season plan (src/lib/learn/plan.ts) must call `lessonFits` beside its month test for this to take effect.
 */
import type { Climate } from "@/lib/types";
import { presenceOf, type PlaceRef } from "@/lib/plant-presence";
import type { Lesson } from "./lessons";

/** A month whose nights average below this has frozen or unworkable ground (crop-calendar SOW_NIGHT_HARDY). */
export const FROZEN_NIGHT_C = -1;

/** What a lesson needs of the place, by its slug. */
export const LESSON_NEEDS: Record<string, { needsSpecies?: string; groundOpen?: boolean }> = {
  // The lesson's pitch is "The oak dropped hundreds of acorns"; its reading is /foraging/acorn.
  "acorns-in-tens": { needsSpecies: "acorn" },
  "mushroom-count": { groundOpen: true },
};

/** Whether `lesson` can be done at `place` in calendar `month` (1–12), from what the site knows of the place. */
export function lessonFits(lesson: Pick<Lesson, "slug">, place: PlaceRef | null | undefined, month: number, climate?: Pick<Climate, "monthlyMeanMin"> | null): boolean {
  const need = LESSON_NEEDS[lesson.slug];
  if (!need) return true;
  if (need.needsSpecies) {
    const p = presenceOf(place, need.needsSpecies, month);
    if (p.state === "absent" || p.state === "thin") return false;
  }
  if (need.groundOpen && climate?.monthlyMeanMin?.length === 12 && climate.monthlyMeanMin[month - 1] < FROZEN_NIGHT_C) return false;
  return true;
}
