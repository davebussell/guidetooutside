/**
 * A region's description as printed under a town's name (the overview's Land
 * column, the foraging standfirst). The region's line is written for the whole
 * region; under a town only the items that hold there are printed
 * (src/lib/ecoregions.jsx TOWN_TEXT, conditions in src/lib/where.ts, facts in
 * src/lib/place-scope.ts). The Great Lakes' "lake-effect weather around the
 * largest freshwater system on Earth" is kept only within NEAR_GREAT_LAKE_KM
 * of a shore, as before; since the audit of 10 November 2026 the Bay of Fundy,
 * the Chesapeake, Long Island Sound, the coast, the coastal plain and the
 * species ranges are switched the same way. The region's own page
 * (/regions/<slug>) is regional context and keeps the full text.
 *
 * Server-side (place-scope reads the water grid and the Great Lakes shore).
 */
import { TOWN_TEXT } from "./ecoregions";
import { placeFacts } from "./place-scope";
import { listText, piecesText, type Piece } from "./where";
import type { Climate } from "./types";

type RegionText = { slug: string; landscape: string; gardening?: string; summary?: string };
type TownText = { landscape?: { items: Piece[]; last?: string }; gardening?: Piece[]; summary?: Piece[] };

/**
 * `summary` is the region card's line ("Your ecological region", src/components/PlaceCards.tsx). Its climate words
 * need the town's own frost count (`climate`): the audit of 11 November 2026 found the Gulf Coast's "nearly
 * frost-free" at Memphis and Little Rock. Without a climate a piece that needs it is dropped.
 */
export function regionTextAt(region: RegionText, field: "landscape" | "gardening" | "summary", lat: number, lon: number, climate?: Climate | null): string {
  const town = (TOWN_TEXT as Record<string, TownText>)[region.slug];
  const facts = placeFacts({ lat, lon }, { climate });
  if (field === "landscape" && town?.landscape) return listText(town.landscape.items, facts, town.landscape.last);
  if (field === "gardening" && town?.gardening) return piecesText(town.gardening, facts) ?? "";
  if (field === "summary" && town?.summary) return piecesText(town.summary, facts) ?? "";
  return region[field] ?? "";
}
