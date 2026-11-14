/**
 * The ecological region of a point, typed. `classifyEcoregion` (restored from
 * the client bundle, src/lib/ecoregions.jsx) always finds one of the 34
 * regions; this says so to TypeScript.
 */
import { classifyEcoregion } from "./ecoregions";

export type Ecoregion = NonNullable<ReturnType<typeof classifyEcoregion>>;

export const regionOf = (lat: number, lon: number): Ecoregion => classifyEcoregion(lat, lon)!;
