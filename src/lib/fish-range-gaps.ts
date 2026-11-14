/**
 * The region's fish that a town's "Regional species, not checked near here" list must not name (Day 5 audit, 14 November
 * 2026, C1).
 *
 * The list names the region's fish that the records near a town cannot vouch for, as context: "known across the region".
 * The region is an ecoregion as wide as the Great Plains or the boreal north, so the list named fish absent from the place:
 * steelhead and salmon at Madison, Albany, Bozeman, Laramie and Spokane; striped, smallmouth and largemouth bass, bluegill
 * and crappie at Saskatoon; Chinook, coho and Arctic char at Thompson; Chinook, coho, char, brook and rainbow trout at
 * Yellowknife; walleye and coho at Whitehorse; walleye, pike, grayling and steelhead at Kelowna; muskellunge, largemouth
 * bass and bluegill at Saguenay. Two gates, and the list says less:
 *
 *  1. Sea-run fish (fishing-waters `seaRunGate`): a salmon, a steelhead or another fish of both waters is named only where
 *     the town has sea, estuary or big-lake water, and is not above a dam that cut its run off (water-setting
 *     SEA_RUN_BLOCKED). A steelhead is a rainbow trout that runs to the sea or a big lake (fish-presence SAME_RECORDS); a
 *     salmon with neither lives only where it was stocked, which the records, not the region, must show. This uses the
 *     site's own water setting.
 *  2. RANGE_GAPS: GBIF holds fewer than GAP_BELOW records of the fish since 1990 in a box reaching 150 km each way from
 *     the town, two and a half times the presence table's 60 km. Each row is the query run (one species per query: the
 *     multi-species facet answers came back incomplete) and its count, read on 14 November 2026. A fish so thinly recorded
 *     across 300 km is not "known across the region" here, whatever the ecoregion's list says.
 *
 * Both gates only take names off the regional list; no recorded fish is touched.
 */

/** Fewer records than this in the 150 km box: not a fish of the area. */
export const GAP_BELOW = 20;

type Gap = { town: string; fish: string; count: number; query: string };

const box = (lat: number, lon: number) => {
  const dl = 150 / 111;
  const dn = 150 / (111 * Math.cos((lat * Math.PI) / 180));
  return `decimalLatitude=${(lat - dl).toFixed(2)},${(lat + dl).toFixed(2)}&decimalLongitude=${(lon - dn).toFixed(2)},${(lon + dn).toFixed(2)}`;
};
const q = (lat: number, lon: number, taxonKey: number) =>
  `https://api.gbif.org/v1/occurrence/search?${box(lat, lon)}&year=1990,2026&hasGeospatialIssue=false&taxonKey=${taxonKey}&limit=0`;

// The towns' centres as the presence table holds them; the taxon keys are the table's (place-presence-fish.json `taxa`).
const SASKATOON = [52.131802, -106.660767] as const;
const THOMPSON = [55.743347, -97.863464] as const;
const YELLOWKNIFE = [62.4540807, -114.377385] as const;
const WHITEHORSE = [60.721571, -135.054932] as const;
const KELOWNA = [49.8879177, -119.495902] as const;
const SAGUENAY = [48.405959, -71.069183] as const;
const KEY: Record<string, number> = {
  "smallmouth-bass": 5211250,
  "largemouth-bass": 2394563,
  bluegill: 2394503,
  "black-crappie": 2394526,
  "arctic-char": 4284021,
  "brook-trout": 2351271,
  "rainbow-trout": 5204019,
  "chinook-salmon": 5204024,
  "coho-salmon": 5204034,
  walleye: 2382172,
  "northern-pike": 2346633,
  "arctic-grayling": 5711974,
  muskellunge: 2346634,
};

const row = (town: string, at: readonly [number, number], fish: string, count: number): Gap => ({ town, fish, count, query: q(at[0], at[1], KEY[fish]) });

/** Each count is what the query returned on 14 November 2026. */
export const RANGE_GAPS: Gap[] = [
  row("saskatoon-saskatchewan", SASKATOON, "smallmouth-bass", 0),
  row("saskatoon-saskatchewan", SASKATOON, "largemouth-bass", 0),
  row("saskatoon-saskatchewan", SASKATOON, "bluegill", 0),
  row("saskatoon-saskatchewan", SASKATOON, "black-crappie", 0),
  row("thompson-manitoba", THOMPSON, "arctic-char", 0),
  row("thompson-manitoba", THOMPSON, "brook-trout", 0),
  row("thompson-manitoba", THOMPSON, "rainbow-trout", 0),
  row("yellowknife-northwest-territories", YELLOWKNIFE, "chinook-salmon", 0),
  row("yellowknife-northwest-territories", YELLOWKNIFE, "coho-salmon", 0),
  row("yellowknife-northwest-territories", YELLOWKNIFE, "arctic-char", 0),
  row("yellowknife-northwest-territories", YELLOWKNIFE, "brook-trout", 0),
  row("yellowknife-northwest-territories", YELLOWKNIFE, "rainbow-trout", 0),
  row("whitehorse-yukon", WHITEHORSE, "walleye", 0),
  // Kelowna: the few walleye and pike in the box are not the Okanagan's; grayling none.
  row("kelowna-british-columbia", KELOWNA, "walleye", 7),
  row("kelowna-british-columbia", KELOWNA, "northern-pike", 12),
  row("kelowna-british-columbia", KELOWNA, "arctic-grayling", 0),
  row("saguenay-quebec", SAGUENAY, "muskellunge", 2),
  row("saguenay-quebec", SAGUENAY, "largemouth-bass", 0),
  row("saguenay-quebec", SAGUENAY, "bluegill", 0),
];

/** Whether GBIF's wide box shows the fish is not one of the town's area (RANGE_GAPS). */
export const rangeGap = (townSlug: string | undefined | null, fish: string): Gap | null =>
  (townSlug && RANGE_GAPS.find((g) => g.town === townSlug && g.fish === fish && g.count < GAP_BELOW)) || null;
