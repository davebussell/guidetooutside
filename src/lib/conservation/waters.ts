/**
 * The named waters a place page lists, as the matcher should read them:
 * the town's OpenStreetMap rivers, lakes and streams (the fishing lists,
 * without the ones dropped as not fishing water), its estuary, and the
 * Natural Earth big lake and big river written out ("Ontario" → "Lake
 * Ontario", "Columbia" → "Columbia River"), so a keeper listing either form
 * is found.
 */
import type { WaterSetting } from "@/lib/water-setting";
import { lakeName } from "@/lib/water-names";

const RIVER_WORD = /\b(river|rivière|riviere|rio|río|rivier|fleuve|fluss|creek|brook|burn|afon|abhainn)\b/i;
const RIVER_SPELLING: Record<string, string> = { Rhne: "Rhône", Rhone: "Rhône" };
/** Names too generic to match on their own ("Lake", "Pond", "Creek"). */
const GENERIC = /^(lake|lac|pond|creek|river|stream|brook|reservoir|dam|canal|ditch|drain|lagoon)$/i;

export function bigRiverName(name: string): string {
  const n = RIVER_SPELLING[name] ?? name;
  return RIVER_WORD.test(n) ? n : `${n} River`;
}

export function pageWaters(w: WaterSetting | null | undefined): string[] {
  if (!w) return [];
  const names = [
    w.estuary,
    w.bigLake ? lakeName(w.bigLake.name) : null,
    w.bigRiver ? bigRiverName(w.bigRiver) : null,
    ...w.rivers.map((x) => x.name),
    ...w.lakes.map((x) => x.name),
    ...w.streams.map((x) => x.name),
  ];
  const out: string[] = [];
  for (const n of names) {
    const t = n?.trim();
    if (!t || t.length < 4 || GENERIC.test(t) || out.includes(t)) continue;
    out.push(t);
  }
  return out;
}
