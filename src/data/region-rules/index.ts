import type { ClosedSeason } from "../closed-seasons";
import type { LandRule } from "../land-rules";
import * as greatLakes from "./great-lakes-st-lawrence";
import * as greatPlains from "./great-plains";
import * as borealForest from "./boreal-forest";
import * as acadianForest from "./acadian-forest";
import * as northeastCoast from "./northeast-coast";
import * as southeastern from "./southeastern";
import * as appalachianHardwoods from "./appalachian-hardwoods";
import * as gulfCoast from "./gulf-coast";
import * as floridaPeninsula from "./florida-peninsula";
import * as deserts from "./deserts";
import * as mediterraneanCalifornia from "./mediterranean-california";
import * as pacificMaritime from "./pacific-maritime";
import * as westernMountains from "./western-mountains";
import * as borealNorth from "./boreal-north";

/** One module per ecoregion, added as each region is worked through (three a day from 2 November 2026). */
const REGIONS = [greatLakes, greatPlains, borealForest, acadianForest, northeastCoast, southeastern, appalachianHardwoods, gulfCoast, floridaPeninsula, deserts, mediterraneanCalifornia, pacificMaritime, westernMountains, borealNorth];

export const REGION_CLOSED_SEASONS: ClosedSeason[] = REGIONS.flatMap((m) => m.CLOSED);
export const REGION_LAND_RULES: LandRule[] = REGIONS.flatMap((m) => m.LAND);
