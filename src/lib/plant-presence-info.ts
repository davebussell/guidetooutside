/**
 * The few numbers the presence gate (plant-presence.ts) prints in sentences, apart
 * from the table itself so that pages which only quote them (the home page, the
 * region pages) do not carry the table. scripts/check-foraging.ts asserts they
 * match the table's own `meta`.
 */
/** Half the side of the box around a town that the presence table counts records in, km. */
export const PRESENCE_BOX_KM = 50;
/** The table counts records from this year on. */
export const PRESENCE_FROM_YEAR = 2000;
/**
 * The radius, km, of the live observation search behind the foraging page's "Wild edibles recorded nearby" and
 * "Hazards" panels (iNaturalist research-grade records, species counts for a calendar month over every year on
 * record; src/lib/local-flora.ts). It is a different count from the presence table's: audit of 10 November 2026,
 * one page printed "within about 40 km" and "within about 50 km" with nothing saying they came from two sources, so
 * every sentence that gives either radius names its source.
 */
export const FLORA_RADIUS_KM = 40;
