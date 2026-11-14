/**
 * The names Natural Earth gives the big waters, as a reader would say them:
 * "Nyanza" is Lake Victoria, "Ontario" is Lake Ontario, the "Rhne" is the
 * Rhône. Used wherever the water setting names a lake or river in a sentence.
 */

/**
 * Day 5 audit (14 November 2026): "Lake Great Slave" (Great Slave Lake) at Yellowknife and "Lake Rainy" (Rainy Lake) at
 * International Falls. Natural Earth keeps the short name; English puts "Lake" after these, as the Canadian Geographical
 * Names Database and USGS GNIS name them. Every lake of the grid that reads "X Lake" in English is here, and bays, channels
 * and seas the grid files as lakes ("Georgian Bay", "North Channel") are never given "Lake" (`lakeName`).
 */
const LAKES: Record<string, string> = {
  Nyanza: "Lake Victoria",
  "Victoria Nyanza": "Lake Victoria",
  Geneva: "Lake Geneva",
  Constance: "Lake Constance",
  "Lake of the Woods": "Lake of the Woods",
  Woods: "Lake of the Woods",
  "Great Slave": "Great Slave Lake",
  "Great Bear": "Great Bear Lake",
  Rainy: "Rainy Lake",
  Reindeer: "Reindeer Lake",
  "Southern Indian": "Southern Indian Lake",
  Cedar: "Cedar Lake",
  Wollaston: "Wollaston Lake",
  Nueltin: "Nueltin Lake",
  Dubawnt: "Dubawnt Lake",
  "Great Salt": "Great Salt Lake",
  Churchill: "Churchill Lake",
  Amadjuak: "Amadjuak Lake",
  Nettilling: "Nettilling Lake",
  Iliamna: "Iliamna Lake",
};

const RIVERS: Record<string, string> = {
  Rhne: "Rhône",
  Rhone: "Rhône",
  // Day 5 audit: International Falls read "the Rainy" beside "Rainy Lake"; the river is the Rainy River.
  Rainy: "Rainy River",
};

/** "Ontario" → "Lake Ontario"; names that already say what they are ("Lac Saint-Jean", "Kariba Dam") are kept. */
export function lakeName(name: string): string {
  if (LAKES[name]) return LAKES[name];
  return /\b(lake|lac|lago|loch|lough|see|sjön|järvi|reservoir|dam|barrage|vodokhranilishche|bay|channel|sea)\b|meer$/i.test(name) ? name : `Lake ${name}`;
}

/** "Danube" → "the Danube". */
export function riverName(name: string): string {
  return `the ${RIVERS[name] ?? name}`;
}
