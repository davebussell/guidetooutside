/**
 * The regional guides' library (server-only: it reads the water grid).
 *
 *   townsInRegion(slug)     the pre-built towns of a region as comparable rows
 *   regionStats(slug)       the ranges they span, each with its method
 *   regionSeason(slug)      the region's year month by month
 *   sharedAndDiffering(slug) what every town gets and what only some do
 *   compareTowns(a, b, lib) two towns side by side (pure; also used on the client)
 *   neighboursOf(slug)      bordering regions with a contrast line
 *   continentIntro(regions) how a continent's regions differ
 *   regionOrgs(slug)        the conservation organisations active in the region, and per town
 *   regionOrgSummary(slug)  their counts, for the regions index
 */
export { townsInRegion, allTownRows, townRow, regionOfTown, calendarDoy, monthOfDoy } from "./towns";
export { regionStats, type RegionStats, type Figure } from "./stats";
export { regionSeason, monthFrostFree, type RegionSeason, type SeasonMonth } from "./season";
export { sharedAndDiffering, regionLibrary, itemAtTown, type SharedAndDiffering, type Split, type PartialItem } from "./library";
export { compareTowns, compareLines, mostDifferent, orgCompareLines, orgNotes, anyLocalOrgs, compareOrgs, type Comparison, type CompareLine } from "./compare";
export { regionOrgs, regionOrgSummary, readableName, theCountry, finders, type RegionOrgs, type RegionOrg, type CountryOrgs, type TopicNames, type RegionOrgSummary } from "./orgs";
export { neighboursOf, contrastLine, NEIGHBOURS, type Neighbour } from "./neighbours";
export { continentIntro, regionCard, type RegionCard } from "./continents";
export * from "./format";
export type { TownRow, WaterKind, LibItem, RegionLibrary, OrgRef, TownOrgs } from "./types";
