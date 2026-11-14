/**
 * Rules read from the regulator's own pages for the ecoregion "Mediterranean California" (mediterranean-california): Sacramento, San Jose, Los Angeles, Santa Barbara and San Diego.
 *
 * CLOSED: closed-season rows (same shape and standard as src/data/closed-seasons.ts: a regulator, the page it
 * was read from, the date it was read, dates written as the regulator gives them).
 * LAND: where-you-may-pick rules (same shape and standard as src/data/land-rules.ts: the regulator's wording,
 * kept inside the source, with the page and the date it was read).
 *
 * Read 13 November 2026 (Day 4 of the regional audit). Nothing here is inferred: a row exists only where the page
 * was opened and read. Re-read the same day by an independent checker; its corrections are marked "checker".
 */
import type { ClosedSeason } from "../closed-seasons";
import type { LandPlace, LandRule } from "../land-rules";

/** Date every page below was opened and read. */
const CHECKED = "2026-11-13";

const SACRAMENTO = { lat: 38.5811, lon: -121.4939 };
const SAN_JOSE = { lat: 37.3362, lon: -121.8906 };
const LOS_ANGELES = { lat: 34.0537, lon: -118.2428 };
const SANTA_BARBARA = { lat: 34.4221, lon: -119.7027 };
const SAN_DIEGO = { lat: 32.7174, lon: -117.1628 };

const CA = ["CA", "California"];
const REGION = ["mediterranean-california"];
/** South of Point Conception (34°27' N): CDFW's Southern Groundfish Management Area and its Southern ocean region. */
const SOUTH_OF_PT_CONCEPTION = { maxLat: 34.45 };
/** South of Pigeon Point (37°11' N): the ocean salmon area that runs to the Mexican border. */
const SOUTH_OF_PIGEON_POINT = { maxLat: 37.1833 };

const BOOKLET = "https://nrm.dfg.ca.gov/FileHandler.ashx?DocumentID=209090&inline";

export const CLOSED: ClosedSeason[] = [
// ======================= California, statewide rules (this region only) ==========================================
// source: CDFW, "2026 California Freshwater Sport Fishing Regulations", "UPDATED JULY 10, 2026", read 13 November 2026 (the
//   online text stops part-way through Section 5.80(g)) — "Any person who is 16 years of age or older must have a sport fishing
//   license to take any kind of fish", except "persons angling from a public pier in ocean or bay waters"; Free Fishing Days
//   4 July and 5 September 2026: "On these days only in 2026, ALL regulations apply and report cards are required"; report cards
//   are required for steelhead and sturgeon statewide, including for anglers who need no licence. https://nrm.dfg.ca.gov/FileHandler.ashx?DocumentID=209090&inline
{
  id: "us-ca-licence",
  countryCode: "US",
  admin1: CA,
  regionSlug: REGION,
  species: [],
  closed: [],
  note: "In California anyone aged 16 or over needs a sport fishing licence to take any fish, except when fishing from a public pier in ocean or bay waters. Steelhead and sturgeon also need a report card, even for anglers who need no licence. In 2026 the free fishing days were 4 July and 5 September: no licence was needed, but every other rule and the report cards still applied.",
  regulator: "California Department of Fish and Wildlife",
  source: BOOKLET,
  checked: CHECKED,
},
// source: 14 CCR 7.00, District General Regulations (Cornell LII; last amended 12-6-2022, operative 12-6-2022), read 13 November 2026 —
//   coho may not be taken in any state waters; incidentally hooked coho must be released. Same wording on the eregulations.com copy of
//   CDFW's freshwater booklet, "District Definitions and General Regulations" ("Last Updated: May 20, 2025"): "Coho (silver) salmon may
//   not be taken in any of the waters of the State." https://www.law.cornell.edu/regulations/california/14-CCR-7.00
{
  id: "us-ca-coho-inland",
  countryCode: "US",
  admin1: CA,
  regionSlug: REGION,
  species: ["coho-salmon"],
  closed: [{ from: "01-01", to: "12-31" }],
  water: ["rivers", "lakes"],
  note: "CDFW's district rules say coho (silver) salmon may not be taken in any of California's waters. A coho hooked by accident must be released at once.",
  regulator: "CDFW (14 CCR 7.00)",
  source: "https://www.law.cornell.edu/regulations/california/14-CCR-7.00",
  checked: CHECKED,
},
// source: CDFW, "Summary of California Ocean Salmon Seasons" (no page date; "Updated August 19" beside the 2026 regulations PDF), read 13
//   November 2026 — "Retention of coho (silver) salmon or steelhead trout is prohibited in any ocean fishery (CCR T-14, §27.70(b) and
//   §27.80(b))." 14 CCR 27.80 as amended (corrected text, DocumentID=246781), (b): "No coho (silver) salmon may be retained."
//   https://wildlife.ca.gov/Fishing/Ocean/Regulations/Salmon
{
  id: "us-ca-ocean-coho",
  countryCode: "US",
  admin1: CA,
  regionSlug: REGION,
  species: ["coho-salmon"],
  closed: [],
  noKeep: [{ from: "01-01", to: "12-31" }],
  water: ["sea", "estuary"],
  note: "CDFW's ocean salmon rules say no coho (silver) salmon may be kept in any ocean fishery, so any coho caught must be released.",
  regulator: "CDFW (ocean salmon, 14 CCR 27.80)",
  source: "https://wildlife.ca.gov/Fishing/Ocean/Regulations/Salmon",
  checked: CHECKED,
},
// source (checker): 14 CCR 27.70, "Trout in the Ocean" (Justia; Chapter 4 Ocean Fishing, "Article 1 - Ocean and San Francisco Bay District";
//   "Current through Register 2024 Notice Reg. No. 52, December 27, 2024"), read 13 November 2026 — "(b) Limit: Three, except the take of
//   steelhead rainbow trout in the ocean is prohibited." The rule bars take, not only keeping, so this is a closed row, not `noKeep`.
//   CDFW's ocean salmon page (above): retention of steelhead "is prohibited in any ocean fishery".
//   https://regulations.justia.com/states/california/title-14/division-1/subdivision-1/chapter-4/article-1/fin-fish-minimum-size-limits-bag-and-possession-limits-and-seasons/section-27-70
{
  id: "us-ca-ocean-steelhead",
  countryCode: "US",
  admin1: CA,
  regionSlug: REGION,
  species: ["steelhead"],
  closed: [{ from: "01-01", to: "12-31" }],
  water: ["sea", "estuary"],
  note: "California's rule for trout in the ocean (14 CCR 27.70) prohibits taking steelhead in the ocean, and CDFW's ocean salmon page says no steelhead may be kept in any ocean fishery. A steelhead hooked in the sea must be released.",
  regulator: "CDFW (14 CCR 27.70)",
  source: "https://regulations.justia.com/states/california/title-14/division-1/subdivision-1/chapter-4/article-1/fin-fish-minimum-size-limits-bag-and-possession-limits-and-seasons/section-27-70",
  checked: CHECKED,
},
// source (checker): OEHHA press release on the updated statewide advisory for fish that migrate ("November 16, 2022"),
//   read 13 November 2026 — "fish that migrate in California rivers, estuaries, and coastal waters"; "The updated advisory covers these
//   species when caught in anadromous waters (waters with access to the ocean)."; "Separate advice applies to these species when found in
//   lakes and reservoirs."; women 18-49 and children 1-17 "should not eat Striped Bass or White Sturgeon", and "a maximum of two total
//   servings per week of American Shad, Chinook (King) Salmon, or Steelhead Trout"; women 50+ and men 18+ "one total serving per week of
//   Striped Bass or White Sturgeon", five of Chinook or steelhead; based on mercury and PCBs. The release names no exceptions, but OEHHA's
//   San Francisco Bay advisory (2023, us-ca-san-jose-bay-advisory) gives different servings for the bay.
//   https://oehha.ca.gov/fish/press-release/press-release-fish/updated-statewide-advisory-fish-migrate-offers-safe-eating
{
  id: "us-ca-migratory-fish-advisory",
  countryCode: "US",
  admin1: CA,
  regionSlug: REGION,
  species: [],
  closed: [],
  water: ["rivers", "sea", "estuary"],
  note: "OEHHA's statewide advice (2022) for striped bass, white sturgeon, Chinook salmon, steelhead and American shad caught in waters with access to the ocean, rivers and coastal waters included, is based on mercury and PCBs. Women aged 18 to 49 and children should not eat striped bass or white sturgeon, and should eat no more than two servings a week in all of Chinook, steelhead or shad. Women 50 and over and men may eat one serving a week of striped bass or sturgeon, and five of Chinook or steelhead. Lakes and reservoirs have separate advice, and some waters have their own advisories: San Francisco Bay's sets different servings.",
  regulator: "California OEHHA (fish advisory)",
  source: "https://oehha.ca.gov/fish/press-release/press-release-fish/updated-statewide-advisory-fish-migrate-offers-safe-eating",
  checked: CHECKED,
},

// ======================= Sacramento: fresh water (Valley District) ===============================================
// source: eregulations.com copy of CDFW's freshwater booklet, "District Definitions and General Regulations" ("Last Updated: May 20,
//   2025"), read 13 November 2026 — Valley District (T14 CCR §6.36): "all of Butte, Colusa, Glenn, Kern, Kings, Merced, Sacramento, San
//   Joaquin" and other counties; 7.00(d) Valley District, anadromous waters not in 7.40: "All year", 2 hatchery trout or steelhead, 4 in
//   possession, closed to salmon; hatchery fish carry a healed adipose fin clip, and other trout and steelhead must be released at once.
//   https://www.eregulations.com/california/fishing/district-definitions-and-general-regulations
// source: 14 CCR 7.40 (Cornell LII, history to an amendment operative 8/14/2024) — American River (b)(4): (C) SMUD power line crossing at
//   Ancil Hoffman Park to Jibboom Street bridge, Jan. 1–Jul. 15 and Jul. 16–Dec. 31, 2 hatchery trout or steelhead, 4 in possession;
//   (D) Jibboom Street bridge to the mouth, Jan. 1–Jul. 15, Jul. 16–Dec. 16 and Dec. 17–31, same limits; (B) USGS cable crossing to the
//   SMUD line, Jan. 1–Jul. 15 and Jul. 16–Oct. 31 only; (A) Nimbus Dam to the USGS cable crossing, "Closed to all fishing all year."
//   Sacramento River (b)(80)(E), Highway 113 bridge near Knights Landing to the Carquinez Bridge: Jan. 1–Jul. 15, Jul. 16–Dec. 16 and
//   Dec. 17–31, 2 and 4. The 2026 Central Valley amendment (approved text, effective 15 July 2026; DocumentID=246762) shows the same
//   hatchery-fish periods for these reaches. https://www.law.cornell.edu/regulations/california/14-CCR-7.40
// source: 2026 booklet (BOOKLET) — black bass, lakes, reservoirs and the Delta: "open to fishing all year, with a 12-inch total length
//   minimum size limit and a five-fish daily bag limit"; rivers and streams open all year, no size limit, 5; striped bass (5.75):
//   "All year except for closures listed in special regulations.", "Two", 18 inches; catfish (5.15): "All year, except for closures
//   listed under special regulations.", "Bullheads, no limit; all other catfish, no limit, except as follows". 14 CCR 5.85(a)(1)
//   (Cornell LII): "All inland lakes, reservoirs, and ponds, including those on private lands, are open to fishing all year." (5 trout, 10).
{
  id: "us-ca-sacramento-open",
  countryCode: "US",
  admin1: CA,
  near: { ...SACRAMENTO, km: 10 },
  species: ["striped-bass", "largemouth-bass", "channel-catfish", "rainbow-trout", "steelhead"],
  closed: [],
  water: ["rivers", "lakes"],
  note: "Sacramento is in CDFW's Valley District. At the city, the Sacramento River (from the Highway 113 bridge at Knights Landing down to the Carquinez Bridge) and the American River below the SMUD power line at Ancil Hoffman Park have hatchery trout and steelhead seasons that run back to back all year. Other Valley District waters that fish can reach from the sea are open all year, and so are inland lakes. Limits:\n- Hatchery trout or steelhead (with a healed adipose fin clip): 2 a day, 4 in possession. Every other trout or steelhead must be released at once.\n- Striped bass: 2 a day, at least 18 inches.\n- Black bass: 5 a day, with a 12-inch minimum in lakes, reservoirs and the Delta and no size limit in rivers and streams.\n- Catfish: no limit for most catfish under the statewide rule.\nFarther up the American, from the SMUD line to the cable crossing below Nimbus Hatchery, fishing is open only from 1 January to 31 October. From that crossing up to Nimbus Dam the river is closed to all fishing all year.",
  regulator: "CDFW (Valley District; 14 CCR 7.40)",
  source: "https://www.law.cornell.edu/regulations/california/14-CCR-7.40",
  checked: CHECKED,
},
// source: CDFW news release "Chinook Fishing to Reopen on Klamath, Trinity and Sacramento Rivers After 3-Year Closure", "May 12, 2026",
//   read 13 November 2026 — Central Valley fall-run season July 16 through Dec. 16 "with some variation for upper and lower stretches
//   of the rivers"; each tributary 2 fish a day, 4 in possession; the American, Feather and Mokelumne get "a full season"; the
//   Sacramento River reopens for summer and fall. https://wildlife.ca.gov/News/Archive/chinook-fishing-to-reopen-on-klamath-trinity-and-sacramento-rivers-after-3-year-closure
// source: Fish and Game Commission, 2026 New and Proposed Regulations — Central Valley Sport Fishing (OAL file 2026-0527-02S), effective
//   15 July 2026; approved text DocumentID=246762 read, but its strike-outs and insertions are run together in the extracted text (the
//   2024 wording "Closed to the take and possession of Chinook Salmon." sits beside the new Chinook limits), so no reach dates are loaded.
// source (checker): approved text DocumentID=246762 re-read 13 November 2026 — Sacramento River, Highway 113 bridge to the Carquinez
//   Bridge: "Jul. 16 through Dec. 16 for Chinook Salmon.", "2 Chinook Salmon.", "4 Chinook Salmon in possession.", beside the run-together
//   "Jan. 1 through Jul. 15Dec. 31." and the old "Closed to the take and possession of Chinook Salmon."; American River, SMUD line to
//   Jibboom Street bridge, read as "Jul. 16 through Oct. 31 for Chinook Salmon." in this copy, while the Commission's staff summary for
//   5-6 May 2026 (DocumentID=245120) gives the noticed range for that reach as "[July 16 – December 31]". The American River runs through
//   the city, so no chinook dates can be loaded for a circle round it. The staff summary does not state the adopted dates.
{
  id: "us-ca-sacramento-salmon",
  countryCode: "US",
  admin1: CA,
  near: { ...SACRAMENTO, km: 30 },
  species: [],
  closed: [],
  water: ["rivers"],
  note: "Chinook salmon fishing reopened on the Sacramento River in 2026 after a three-year closure. In its May 2026 announcement CDFW gave the Central Valley fall-run season as 16 July to 16 December, with some variation on the upper and lower stretches, and a limit of 2 a day and 4 in possession on each tributary; the American, Feather and Mokelumne get a full season. The adopted text lists 16 July to 16 December for Chinook on the Sacramento River from Knights Landing to the Carquinez Bridge, 2 a day and 4 in possession, but its American River dates could not be read cleanly, so no salmon dates are loaded here. Check CDFW's current freshwater regulations before fishing for salmon. Coho may not be taken anywhere in California.",
  regulator: "CDFW (Central Valley salmon, 2026)",
  source: "https://wildlife.ca.gov/News/Archive/chinook-fishing-to-reopen-on-klamath-trinity-and-sacramento-rivers-after-3-year-closure",
  checked: CHECKED,
},
// source: 2026 booklet (BOOKLET), Section 5.80 Inland White Sturgeon — (a)(1) October 1 through June 30 from the west Carquinez Bridge east
//   to downstream of the Feather River confluence on the Sacramento River, and downstream of the I-5 bridge on the San Joaquin; (a)(2)
//   October 1 through December 31 upstream of the Feather River confluence to the Highway 162 bridge; "(3) Year-round: all tributaries of
//   the Sacramento and San Joaquin Rivers are closed."; "(b) Daily limit: Zero fish."; "(c) Annual bag limit: zero fish per calendar year
//   statewide."; one barbless single hook; "Any sturgeon greater than 60 inches fork length may not be removed from the water and shall be
//   released immediately."; "All anglers must have a valid Sturgeon Fishing Report Card in their possession while fishing for white sturgeon."
{
  id: "us-ca-sacramento-sturgeon",
  countryCode: "US",
  admin1: CA,
  near: { ...SACRAMENTO, km: 30 },
  species: [],
  closed: [],
  water: ["rivers"],
  note: "White sturgeon are not in this site's fish library. In California they may only be caught and released, with a limit of zero a day and zero a year, using one barbless single hook and carrying a Sturgeon Fishing Report Card. A sturgeon over 60 inches to the fork of the tail may not be taken out of the water. On the Sacramento River from the Carquinez Bridge up to the Feather River confluence, which takes in Sacramento, the season runs from 1 October to 30 June. Above the confluence, up to the Highway 162 bridge, it runs from 1 October to 31 December. Every tributary of the Sacramento and San Joaquin, the American River among them, is closed to sturgeon fishing all year.",
  regulator: "CDFW (14 CCR 5.80)",
  source: BOOKLET,
  checked: CHECKED,
},
// source (checker): OEHHA, "Sacramento River and Northern Delta" fish advisory (advisory "November 16, 2022"; page modified 7 September 2025),
//   read 13 November 2026 — the Sacramento River "from just below Shasta Lake to where it joins the San Joaquin River in Pittsburg", and
//   Delta creeks and sloughs north of Highway 12, in nine counties including Sacramento; "Advisory based on mercury, PBDEs, or PCBs."; women
//   18-49 and children 1-17: do not eat black bass, catfish, Sacramento pikeminnow, striped bass or white sturgeon; women 50+ and men 18+:
//   1 serving a week of black bass, pikeminnow, striped bass or white sturgeon, 2 of catfish or common carp, 5 of Chinook or steelhead. The
//   page does not name the American River. https://www.oehha.ca.gov/fish/advisories/sacramento-river-and-northern-delta
{
  id: "us-ca-sacramento-river-advisory",
  countryCode: "US",
  admin1: CA,
  near: { ...SACRAMENTO, km: 30 },
  species: [],
  closed: [],
  water: ["rivers"],
  note: "OEHHA's fish-eating advisory for the Sacramento River (from below Shasta Lake down to Pittsburg) and the northern Delta (2022) is based on mercury, PBDEs or PCBs. Women aged 18 to 49 and children should not eat black bass, catfish, striped bass, white sturgeon or Sacramento pikeminnow from these waters. Women 50 and over and men may eat one serving a week of black bass, striped bass or sturgeon, two of catfish or carp, and five of Chinook salmon or steelhead. The advisory does not name the American River.",
  regulator: "California OEHHA (fish advisory)",
  source: "https://www.oehha.ca.gov/fish/advisories/sacramento-river-and-northern-delta",
  checked: CHECKED,
},

// ======================= San Jose: fresh water (South Central District) ==========================================
// source: eregulations.com, "District Definitions and General Regulations" (CDFW booklet online, "Last Updated: May 20, 2025") — South
//   Central District (§6.33) includes Santa Clara County; 7.00(e)(2): anadromous streams not west of a Highway 1 bridge and not in 7.40,
//   closed all year; waters closed to hatchery trout and steelhead are closed to other species (exceptions: amphibians, freshwater clams,
//   crayfish, lamprey not taken by hook and line, some saltwater species); 7.40(b)(34) Coyote Creek: "Last Sat. in Apr. through Nov. 15.
//   Only artificial lures with barbless hooks may be used." 14 CCR 7.40 (Cornell LII): Coyote Creek (Santa Clara Co.) (b)(34) and Guadalupe
//   River (b)(47) — Guadalupe River below Guadalupe Reservoir, Los Gatos Creek below Vasona Lake, Alamitos Creek and Arroyo Calero below
//   Calero Reservoir — "Last Sat. in Apr. through Nov. 15.", artificial lures and barbless hooks, 2 hatchery trout or steelhead, 4 in
//   possession. 14 CCR 1.04 (Justia): "Anadromous waters are inland waters that are accessible to fish migrating from the ocean."
//   Approved text "Sport Fishing 2026 (Inland and Marine)" (effective 1 January 2027, DocumentID=247915): Coyote Creek renumbered (36),
//   Guadalupe River renumbered (50), no substantive change marked; "[No changes to (c) through (f)]" of 7.00.
//   2026 calendar: last Saturday in April 25 April (24 April in 2027); the Friday before, 24 April (23 April in 2027).
// checker, 13 November 2026: made a note (it was a closed row for every species, 16 November to 24 April). 14 CCR 7.40 (Cornell LII, re-read)
//   gives Coyote Creek "(Santa Clara Co.)" no start or end points, and gives the season only for hatchery trout and steelhead; the closure of
//   other species rests on 7.00's introductory rule ("Unless otherwise provided, waters closed to hatchery trout and hatchery steelhead fishing
//   are closed to fishing for all other species", Cornell LII 14 CCR 7.00, amended 12-6-2022), not on the 7.40 entry. A circle on "rivers"
//   also reaches every other stream round the city: anadromous streams not named in 7.40 are "Closed to all fishing all year." (7.00(e)(2)),
//   so a 16 November to 24 April closure would print them as open in summer.
{
  id: "us-ca-san-jose-creeks",
  countryCode: "US",
  admin1: CA,
  near: { ...SAN_JOSE, km: 8 },
  species: [],
  closed: [],
  water: ["rivers"],
  note: "San Jose is in CDFW's South Central District. CDFW's special rules open Coyote Creek, and the Guadalupe River below Guadalupe Reservoir, only from the last Saturday in April (25 April in 2026; 24 April in 2027) to 15 November. The Guadalupe rule also covers Los Gatos Creek below Vasona Lake, and Alamitos Creek and Arroyo Calero below Calero Reservoir. In season, only artificial lures with barbless hooks may be used, and the limit is 2 hatchery trout or steelhead a day (4 in possession); all other trout and steelhead must be released. The district rules add that, unless a rule says otherwise, waters closed to hatchery trout and steelhead are closed to other fish too, with a few exceptions such as crayfish. Streams in the district that fish can reach from the bay and that the special rules do not name are closed to all fishing all year. No dates are loaded, because these rules name single creeks, not every stream round the city.",
  regulator: "CDFW (South Central District; 14 CCR 7.40)",
  source: "https://www.law.cornell.edu/regulations/california/14-CCR-7.40",
  checked: CHECKED,
},
// source: 14 CCR 5.85 Trout (Cornell LII; last amended 12-6-2022) — (a)(1) "All inland lakes, reservoirs, and ponds, including those on
//   private lands, are open to fishing all year.", 5 trout a day, 10 in possession; waters in 7.40(b) and 7.50(b) excepted. 14 CCR 7.50
//   (Cornell LII; history to operative 1/1/2025), (b)(81) Los Gatos Creek upstream of Vasona Lake dam, including Lexington Reservoir:
//   "All year.", 0 trout, artificial lures and barbless hooks. 2026 booklet: black bass lakes all year, 12 inches, 5; catfish "All year",
//   Santa Clara County "All waters." 5; striped bass all year, 2, 18 inches. Santa Clara County Parks, General Rules & Ordinances (no
//   date): "License required for all persons age 16 or older." https://www.law.cornell.edu/regulations/california/14-CCR-5.85
{
  id: "us-ca-san-jose-lakes",
  countryCode: "US",
  admin1: CA,
  near: { ...SAN_JOSE, km: 20 },
  species: ["largemouth-bass", "rainbow-trout", "channel-catfish", "striped-bass"],
  closed: [],
  water: ["lakes"],
  note: "CDFW's statewide rules open inland lakes, reservoirs and ponds to fishing all year. Limits:\n- Trout: 5 a day, 10 in possession. At Lexington Reservoir (Los Gatos Creek above the Vasona dam) no trout may be kept, and only artificial lures with barbless hooks are allowed.\n- Black bass: 5 a day, at least 12 inches.\n- Catfish: 5 a day in all Santa Clara County waters.\n- Striped bass: 2 a day, at least 18 inches.\nSanta Clara County Parks requires a fishing licence for everyone aged 16 or over. Rules set by each lake's operator, and any fish-eating advisories for these reservoirs, were not read.",
  regulator: "CDFW (14 CCR 5.85; 2026 freshwater regulations)",
  source: "https://www.law.cornell.edu/regulations/california/14-CCR-5.85",
  checked: CHECKED,
},

// ======================= San Jose: South San Francisco Bay ======================================================
// source: CDFW, "Current California Ocean Recreational Fishing Regulations - SF Bay Region" ("updated on October 1, 2026"), read 13 November
//   2026 — area: "Includes San Francisco and San Pablo bays, plus all their tidal bays, tidal portions of their rivers and streams, sloughs
//   and estuaries between the Golden Gate Bridge and Carquinez Bridge."; striped bass "open year-round with a daily bag and possession limit
//   of two fish and a minimum size limit of 18 inches total length"; "No striped bass may be taken while using a sinker weighing over four
//   pounds, or while using any power-driven gurdy or winch."; "While fishing in San Francisco and San Pablo bays you can only use one fishing
//   line with no more than three separate hooks or lures, unless fishing from a public pier"; "When fishing from a boat, fishing is
//   restricted to daylight hours only (one hour before sunrise to one hour after sunset)."; on public piers "you cannot use more than two
//   rods and lines". https://wildlife.ca.gov/fishing/ocean/regulations/fishing-map/sf-bay
{
  id: "us-ca-san-jose-bay-striped-bass",
  countryCode: "US",
  admin1: CA,
  near: { ...SAN_JOSE, km: 30 },
  species: ["striped-bass"],
  closed: [],
  water: ["sea", "estuary"],
  note: "CDFW lists striped bass as open year-round in San Francisco Bay, which takes in all the tidal bays, sloughs and estuaries of San Francisco and San Pablo bays. The limit is 2 a day and in possession, at least 18 inches long, and no striped bass may be taken with a sinker over 4 pounds or a power-driven gurdy or winch. Anywhere in San Francisco and San Pablo bays except on a public pier, an angler may use only one line with no more than three hooks or lures; from a boat, fishing is allowed only from an hour before sunrise to an hour after sunset. On a public pier no one may use more than two rods and lines.",
  regulator: "CDFW (San Francisco Bay)",
  source: "https://wildlife.ca.gov/fishing/ocean/regulations/fishing-map/sf-bay",
  checked: CHECKED,
},
// source: CDFW, "Summary of Recreational Groundfish Fishing Regulations" ("Updated June 23, 2026"), read 13 November 2026 — San Francisco
//   Management Area "38°57.5' N. latitude (Point Arena) to 37°11' N. latitude (Pigeon Point)": RCG complex and lingcod Jan 1–Mar 31 closed,
//   Apr 1–Dec 31 open at all depths; "Shore-based anglers and spear divers are exempt from seasons and depths." (footnote: for shore-based
//   anglers "No vessel or watercraft (motorized or non-motorized) may be used to assist in the take"); lingcod 2 a day, 22" total
//   length minimum, fillets at least 14" with skin. The SF Bay region page refers groundfish to the "San Francisco Management Area" table.
//   CDFW In-Season Changes page (latest entry 5 November 2026): no 2026 groundfish changes. https://wildlife.ca.gov/fishing/ocean/regulations/groundfish-summary
{
  id: "us-ca-san-jose-bay-groundfish",
  countryCode: "US",
  admin1: CA,
  near: { ...SAN_JOSE, km: 30 },
  species: [],
  closed: [],
  water: ["sea", "estuary"],
  note: "San Francisco Bay lies in CDFW's San Francisco Groundfish Management Area, which runs from Point Arena to Pigeon Point. There, rockfish, cabezon, greenlings and lingcod are closed from 1 January to 31 March and open at all depths from 1 April to 31 December. Shore anglers who use no boat or other watercraft, and spear divers, are exempt from these seasons and depths. Lingcod: 2 a day, at least 22 inches long. No closing dates are loaded, because the season does not apply to anglers fishing from shore.",
  regulator: "CDFW (San Francisco Groundfish Management Area)",
  source: "https://wildlife.ca.gov/fishing/ocean/regulations/groundfish-summary",
  checked: CHECKED,
},
// source: CDFW SF Bay Region page ("updated on October 1, 2026") — salmon: waters "north of 38° 02’ N latitude are closed to salmon fishing";
//   open "as of September 1, 2026" from 38°02' N to Pigeon Point through "October 31, 2026 or until the 20,000 fish harvest guideline is
//   reached, whichever is earlier."; 2 salmon (no coho), 20 inches; white sturgeon catch-and-release only, "from October 1, 2026 through
//   June 30, 2027 in ocean waters", a closure "between January 1 and March 15", "The daily bag and possession limit for white sturgeon is
//   zero (0) fish."; green sturgeon released at once and not taken from the water; California halibut "remains open year-round", "two fish
//   north of Point Sur, Monterey County", 22 inches; leopard shark "open year-round, at all depths", 3, "minimum size limit of 36 inches
//   total length". 14 CCR 27.80 as amended (corrected text DocumentID=246781, effective 16 May 2026), (f)(3) Point Arena to Pigeon Point:
//   "Open to salmon fishing beginning April 3, 2027.", 2 a day, 24 inches. The CDFW ocean salmon page adds that 2027 seasons "will be
//   determined during the March and April 2027 Pacific Fishery Management Council meetings" (said of the commercial fishery).
// checker, 13 November 2026: the page says "Ocean waters north of 38° 02’ N latitude are closed to salmon fishing"; it does not say which
//   bay waters that reaches, so the note no longer says part of San Francisco and San Pablo bays was closed. The white sturgeon season is
//   "in ocean waters, except for the long-standing area closure between January 1 and March 15 as described in" 14 CCR 27.90(i).
{
  id: "us-ca-san-jose-bay-salmon-sturgeon",
  countryCode: "US",
  admin1: CA,
  near: { ...SAN_JOSE, km: 30 },
  species: [],
  closed: [],
  water: ["sea", "estuary"],
  note: "Salmon: the 2026 fall season from Point Reyes (38°02' N) south to Pigeon Point ran from 1 September to 31 October, or until 20,000 fish were landed. The limit was 2 a day, at least 20 inches, with no coho; ocean waters north of 38°02' N were closed to salmon. The state rule as amended in May 2026 lists 3 April 2027 as the next opening from Point Arena to Pigeon Point, with a 24-inch minimum; the 2027 seasons are still to be set in spring 2027. White sturgeon are catch and release only, with a zero limit, from 1 October 2026 to 30 June 2027, apart from a long-standing area closure from 1 January to 15 March (14 CCR 27.90(i)). Green sturgeon must be released at once without being taken out of the water. Sturgeon, California halibut (open all year, 2 a day, 22 inches) and leopard shark (open all year, 3 a day, 36 inches) are not in this site's fish library.",
  regulator: "CDFW (San Francisco Bay)",
  source: "https://wildlife.ca.gov/fishing/ocean/regulations/fishing-map/sf-bay",
  checked: CHECKED,
},
// source: OEHHA, San Francisco Bay fish advisory (advisory "April 19, 2023"; page modified 23 June 2026), read 13 November 2026 — covers the
//   bay in nine counties including Santa Clara; "Advisory based on mercury or PCBs."; servings a week (women 18-49 and children 1-17 /
//   women 50+ and men): striped bass 1/1, white sturgeon 1/1, sharks 1/1 (the page says "sharks"), California halibut 1/2, Chinook salmon 2/5,
//   surfperch 1/3; "No one should eat fish or shellfish from Lauritzen Channel in Richmond Inner Harbor." https://oehha.ca.gov/fish/advisories/san-francisco-bay
// source: CDFW, Marine Protected Areas outreach materials, by county (no date) — no MPA listed for Santa Clara County; San Mateo County's
//   San Francisco Bay entries are Redwood Shores and Bair Island State Marine Parks. https://wildlife.ca.gov/Conservation/Marine/MPAs/Outreach-Materials
{
  id: "us-ca-san-jose-bay-advisory",
  countryCode: "US",
  admin1: CA,
  near: { ...SAN_JOSE, km: 30 },
  species: [],
  closed: [],
  water: ["sea", "estuary"],
  note: "OEHHA's San Francisco Bay advisory (2023) covers the bay in Santa Clara County and is based on mercury or PCBs. Women aged 18 to 49 and children should eat no more than one serving a week of striped bass, white sturgeon, sharks or California halibut, and two of Chinook salmon. Women 50 and over and men may eat one serving a week of striped bass, sturgeon or sharks, two of halibut and five of Chinook. No one should eat fish or shellfish from Lauritzen Channel in Richmond. CDFW lists no Marine Protected Area in Santa Clara County; its San Mateo County bay entries are Redwood Shores and Bair Island State Marine Parks, whose rules were not read.",
  regulator: "California OEHHA (fish advisory)",
  source: "https://oehha.ca.gov/fish/advisories/san-francisco-bay",
  checked: CHECKED,
},

// ======================= Southern District, fresh water (Los Angeles, Santa Barbara, San Diego) ==================
// source: eregulations.com, "District Definitions and General Regulations" ("Last Updated: May 20, 2025") — Southern District (§6.34):
//   inland waters of Los Angeles, Orange, San Diego, Santa Barbara and Ventura counties, and parts of Riverside and San Bernardino;
//   7.00(f): anadromous waters not listed in 7.40, closed all year. 14 CCR 7.00(f) (Cornell LII): "Closed to all fishing all year."
//   14 CCR 1.04 (Justia): "Anadromous waters are inland waters that are accessible to fish migrating from the ocean."
//   14 CCR 7.40 (Cornell LII): Topanga Canyon Creek (b)(112), Santa Ynez River below Bradbury Dam (b)(99), San Luis Rey River (b)(94) and
//   San Mateo Creek (b)(95), "Closed to all fishing all year."; not listed: Los Angeles River, Malibu Creek, Santa Clara River, Ventura River,
//   Mission Creek, San Diego River, Sweetwater River.
//   14 CCR 5.85(a)(2) (Cornell LII): inland streams open the last Saturday in April through November 15, 5 trout, 10 in possession; from
//   November 16 through the Friday before the last Saturday in April, bag limit zero and artificial lures with barbless hooks only, for all
//   fish; "In waters where the bag limit for trout is zero, trout must be released unharmed."
//   14 CCR 7.50 (Cornell LII): (b)(132) Santa Ynez River and tributaries upstream of Gibraltar Dam "All year.", 2 (4 in possession);
//   (b)(151) Sweetwater River upstream of Sweetwater Reservoir, (b)(15) Boulder Creek upstream of El Capitan Reservoir, (b)(108) Pine Valley
//   Creek upstream of Barrett Lake: "All year.", 2, artificial lures only.
{
  id: "us-ca-los-angeles-rivers",
  countryCode: "US",
  admin1: CA,
  near: { ...LOS_ANGELES, km: 30 },
  species: [],
  closed: [],
  water: ["rivers"],
  note: "Los Angeles is in CDFW's Southern District. There, inland waters that fish can reach from the ocean (CDFW's anadromous waters) are closed to all fishing all year, unless the salmon and steelhead list (14 CCR 7.40) names them. That list names Topanga Canyon Creek, closed all year, but not the Los Angeles River. Streams that fish cannot reach from the sea follow the statewide trout rule. They are open from the last Saturday in April (25 April in 2026) to 15 November, with 5 trout a day. From 16 November no trout may be kept, and only artificial lures with barbless hooks may be used. The pages do not say which stretches of the Los Angeles River count as anadromous, so no dates are loaded. Ask CDFW before fishing it.",
  regulator: "CDFW (Southern District)",
  source: "https://www.eregulations.com/california/fishing/district-definitions-and-general-regulations",
  checked: CHECKED,
},
{
  id: "us-ca-santa-barbara-rivers",
  countryCode: "US",
  admin1: CA,
  near: { ...SANTA_BARBARA, km: 35 },
  species: [],
  closed: [],
  water: ["rivers"],
  note: "Santa Barbara is in CDFW's Southern District. Inland waters that fish can reach from the ocean are closed to all fishing all year, unless the 7.40 list names them. The list names the Santa Ynez River below Bradbury Dam, which is closed to all fishing all year, and does not name Mission Creek. Above Gibraltar Dam, the Santa Ynez River and its tributaries are open all year, with 2 trout a day (4 in possession). Streams that fish cannot reach from the sea follow the statewide trout rule: open from the last Saturday in April (25 April in 2026) to 15 November with 5 trout a day. From 16 November no trout may be kept, and only artificial barbless lures may be used. The pages do not say which local creeks count as anadromous, so no dates are loaded.",
  regulator: "CDFW (Southern District)",
  source: "https://www.eregulations.com/california/fishing/district-definitions-and-general-regulations",
  checked: CHECKED,
},
{
  id: "us-ca-san-diego-rivers",
  countryCode: "US",
  admin1: CA,
  near: { ...SAN_DIEGO, km: 30 },
  species: [],
  closed: [],
  water: ["rivers"],
  note: "San Diego is in CDFW's Southern District. Inland waters that fish can reach from the ocean are closed to all fishing all year, unless the 7.40 list names them; the San Diego River is not named. The Sweetwater River above Sweetwater Reservoir is open all year with 2 trout a day and artificial lures only, and so are the creeks above El Capitan Reservoir and Barrett Lake. Streams that fish cannot reach from the sea follow the statewide trout rule: open from the last Saturday in April (25 April in 2026) to 15 November with 5 trout a day. From 16 November no trout may be kept, and only artificial barbless lures may be used. The pages do not say which local streams count as anadromous, so no dates are loaded.",
  regulator: "CDFW (Southern District)",
  source: "https://www.eregulations.com/california/fishing/district-definitions-and-general-regulations",
  checked: CHECKED,
},
// source: 14 CCR 5.85(a)(1) (Cornell LII) — "All inland lakes, reservoirs, and ponds, including those on private lands, are open to fishing
//   all year.", 5 trout, 10 in possession. 2026 booklet (BOOKLET): black bass lakes and reservoirs "open to fishing all year, with a 12-inch
//   total length minimum size limit and a five-fish daily bag limit"; exceptions: Castaic Lake "12-inch minimum."; Casitas Lake "12-inch
//   minimum. No more than one over 22 inches."; Barrett Lake "Catch and Release only", 0; Upper Otay Lake "Catch and Release Only", 0;
//   Cuyamaca Lake "No size limit for Largemouth Bass. Catch and Release only for Smallmouth Bass."; Hodges Lake "15-inch minimum."
//   Striped bass 5.75(d): "In the Colorado River District, the Southern District, and New Hogan, San Antonio and Santa Margarita lakes."
//   limit ten, "No size limit". Catfish 5.15: "All year, except for closures listed under special regulations."; Los Angeles County: seven
//   named park lakes at 5 (among them "Alondra County Park Lake. 5" and "Kenneth Hahn Regional Park Lake. 5"; the checker's read did not show the other five names); San Diego County "All
//   Waters except Barrett and Upper Otay lakes" 5, Barrett and Upper Otay 0. 14 CCR 7.50(b)(160) Upper Otay Lake: "All year.", 0 trout,
//   artificial lures and barbless hooks. https://www.law.cornell.edu/regulations/california/14-CCR-5.85
{
  id: "us-ca-los-angeles-lakes",
  countryCode: "US",
  admin1: CA,
  near: { ...LOS_ANGELES, km: 25 },
  species: ["largemouth-bass", "rainbow-trout", "channel-catfish", "striped-bass"],
  closed: [],
  water: ["lakes"],
  note: "CDFW's statewide rules open inland lakes, reservoirs and ponds to fishing all year. Limits:\n- Trout: 5 a day, 10 in possession.\n- Black bass: 5 a day, at least 12 inches.\n- Catfish: no statewide limit, but 5 a day at seven named Los Angeles County park lakes, among them Alondra and Kenneth Hahn.\n- Striped bass: 10 a day with no size limit in the Southern District.\nRules set by each lake's operator were not read.",
  regulator: "CDFW (14 CCR 5.85; 2026 freshwater regulations)",
  source: "https://www.law.cornell.edu/regulations/california/14-CCR-5.85",
  checked: CHECKED,
},
{
  id: "us-ca-santa-barbara-lakes",
  countryCode: "US",
  admin1: CA,
  near: { ...SANTA_BARBARA, km: 35 },
  species: ["largemouth-bass", "rainbow-trout", "channel-catfish", "striped-bass"],
  closed: [],
  water: ["lakes"],
  note: "CDFW's statewide rules open inland lakes and reservoirs to fishing all year. Limits:\n- Trout: 5 a day, 10 in possession.\n- Black bass: 5 a day, at least 12 inches; at Lake Casitas in Ventura County, no more than one over 22 inches.\n- Catfish: open all year under the statewide rule.\n- Striped bass: 10 a day with no size limit in the Southern District.\nThe operators' rules at Cachuma and Casitas, such as boat inspections and opening hours, were not read.",
  regulator: "CDFW (14 CCR 5.85; 2026 freshwater regulations)",
  source: "https://www.law.cornell.edu/regulations/california/14-CCR-5.85",
  checked: CHECKED,
},
{
  id: "us-ca-san-diego-lakes",
  countryCode: "US",
  admin1: CA,
  near: { ...SAN_DIEGO, km: 25 },
  species: ["largemouth-bass", "rainbow-trout", "channel-catfish", "striped-bass"],
  closed: [],
  water: ["lakes"],
  note: "CDFW's statewide rules open inland lakes and reservoirs to fishing all year. Limits:\n- Trout: 5 a day, 10 in possession. At Upper Otay Lake none may be kept, and only artificial lures with barbless hooks are allowed.\n- Black bass: 5 a day, at least 12 inches. Upper Otay Lake (and Barrett Lake, farther east) is catch and release only; Lake Hodges, farther north, has a 15-inch minimum.\n- Catfish: 5 a day in San Diego County, none at Upper Otay or Barrett.\n- Striped bass: 10 a day with no size limit in the Southern District.\nThe days each reservoir is open are set by its operator and were not read.",
  regulator: "CDFW (14 CCR 5.85; 2026 freshwater regulations)",
  source: "https://www.law.cornell.edu/regulations/california/14-CCR-5.85",
  checked: CHECKED,
},

// ======================= Southern California ocean (south of Point Conception) ===================================
// source: 14 CCR 27.85 Striped Bass (Cornell LII; history: change without regulatory effect 8-8-2019) — "(a) Open season: All year.",
//   "(b) Limit: Two.", "(1) North of Pt. Conception, 18 inches total length.", "(2) South of Pt. Conception, no minimum size limit.";
//   no sinker over four pounds or power-driven gurdy or winch; angling, spearfishing and bow-and-arrow only; snagging illegal.
//   CDFW Southern Region page ("updated on November 2, 2026" when the checker read it): region "34°27 N. Latitude (Point Conception, Santa
//   Barbara County) to the U.S. - Mexico Border."; MPA rules "may further restrict or prohibit sport fishing". The page itself does not
//   mention striped bass. https://www.law.cornell.edu/regulations/california/14-CCR-27.85
{
  id: "us-ca-southern-ocean-striped-bass",
  countryCode: "US",
  admin1: CA,
  regionSlug: REGION,
  box: SOUTH_OF_PT_CONCEPTION,
  species: ["striped-bass"],
  closed: [],
  water: ["sea", "estuary"],
  note: "California's ocean striped bass rule (14 CCR 27.85) is open all year, with a limit of 2; south of Point Conception there is no minimum size. Only angling, spearfishing and bow-and-arrow tackle may be used, and snagging is illegal, as are sinkers over 4 pounds and power-driven gurdies or winches. Marine Protected Areas may restrict or ban fishing.",
  regulator: "CDFW (14 CCR 27.85)",
  source: "https://www.law.cornell.edu/regulations/california/14-CCR-27.85",
  checked: CHECKED,
},
// source: CDFW, "Summary of Recreational Groundfish Fishing Regulations" ("Updated June 23, 2026") — Southern Management Area "34°27' N.
//   latitude (Point Conception) to the U.S.-Mexico Border"; nearshore rockfish, cabezon and greenlings: "Jan 1 - Mar 31: Closed - unlawful
//   to possess in all waters", "April 1 - June 30: Open All Depths", "July 1 - Sep 30: 50 Fathom - Inshore Only", "Oct 1 - Dec 31: Closed -
//   unlawful to possess in all waters"; shelf and slope rockfish and lingcod: the same to 30 September, then "Oct 1 - Dec 31: 50 Fathom -
//   Offshore Only" ("Take is prohibited shoreward of the 50 fathom (300 feet) Rockfish Conservation Area boundary line"); "Shore-based
//   anglers and spear divers are exempt from seasons and depths." (shore-based: "No vessel or watercraft (motorized or non-motorized) may
//   be used to assist in the take"); lingcod 2 a day, 22" minimum; bronzespotted,
//   cowcod, quillback and yelloweye rockfish: "Fishing is closed year-round, at all depths, no retention at any time."; "Eight Groundfish
//   Exclusion Areas in the Southern Management Area restrict certain fishing activities (§27.50)." The Southern Region page adds that
//   groundfish fisheries "may close early if the annual harvest guideline" is met. https://wildlife.ca.gov/fishing/ocean/regulations/groundfish-summary
{
  id: "us-ca-southern-groundfish",
  countryCode: "US",
  admin1: CA,
  regionSlug: REGION,
  box: SOUTH_OF_PT_CONCEPTION,
  species: [],
  closed: [],
  water: ["sea", "estuary"],
  note: "From Point Conception south to Mexico is CDFW's Southern Groundfish Management Area. Its summary (updated 23 June 2026) gives these seasons for boat anglers:\n- Nearshore rockfish, cabezon and greenlings: closed 1 January to 31 March; open at all depths 1 April to 30 June; open only inside the 50-fathom (300-foot) line 1 July to 30 September; closed 1 October to 31 December.\n- Lingcod and shelf and slope rockfish: the same until 30 September; from 1 October to 31 December they may be taken only outside the 50-fathom line.\nShore anglers who use no boat or other watercraft, and spear divers, are exempt from these seasons and depths. Lingcod: 2 a day, at least 22 inches. Cowcod, bronzespotted, quillback and yelloweye rockfish may never be kept, and eight Groundfish Exclusion Areas restrict fishing. No dates are loaded, because the seasons do not apply to anglers fishing from shore.",
  regulator: "CDFW (Southern Groundfish Management Area)",
  source: "https://wildlife.ca.gov/fishing/ocean/regulations/groundfish-summary",
  checked: CHECKED,
},
// source: CDFW Southern Region page ("updated on November 2, 2026" when the checker read it; region: Point Conception to the border) —
//   "The recreational fishery for ocean salmon (Onchorynchus spp.) is closed for the rest of the year."; "2027 ocean salmon season dates
//   will be available beginning in April, 2027". CDFW Ocean Salmon page: Pigeon Point to the U.S./Mexico Border "September 1-30."; "Minimum
//   size limit: 20 inches total length"; "2 salmon of any species except coho (silver) salmon". 14 CCR 27.80 as amended (corrected text
//   DocumentID=246781), (d)(4) "September 1 through 30."; (f)(4) reads "beginning April 11, 2026April 3, 2027" (old and new run together;
//   3 April 2027 is the only 2027 date), 2 a day, 24 inches.
{
  id: "us-ca-southern-salmon",
  countryCode: "US",
  admin1: CA,
  regionSlug: REGION,
  box: SOUTH_OF_PIGEON_POINT,
  species: [],
  closed: [],
  water: ["sea", "estuary"],
  note: "CDFW's Southern Region page says ocean salmon fishing is closed for the rest of 2026. The 2026 fall season from Pigeon Point to the Mexican border ran from 1 to 30 September, with 2 a day, at least 20 inches, and no coho. The state rule as amended in May 2026 lists 3 April 2027 as the next opening, with a 24-inch minimum, but CDFW says the 2027 dates will be posted from April 2027. No coho or steelhead may be kept in any ocean fishery.",
  regulator: "CDFW (ocean salmon)",
  source: "https://wildlife.ca.gov/fishing/ocean/regulations/fishing-map/southern",
  checked: CHECKED,
},
// source: CDFW, Marine Protected Areas (main page; no date) — "SMRs do not allow any type of extractive activities" (scientific collecting
//   by permit excepted); "SMCAs restrict some types of commercial and/or recreational extraction." CDFW MPA outreach materials, by county:
//   Los Angeles — Point Vicente SMCA (No-Take), Abalone Cove SMCA, Point Dume SMR, Point Dume SMCA, and at Santa Catalina Island Cat Harbor,
//   Farnsworth Onshore and Offshore, Lover's Cove, Casino Point (No-Take), Blue Cavern Onshore (No-Take) and Offshore, Arrow Point to Lion
//   Head Point SMCAs and Long Point SMR; Santa Barbara — Goleta Slough SMCA (No-Take), Campus Point SMCA (No-Take), Naples SMCA, Kashtayit
//   SMCA, Point Conception SMR, Vandenberg SMR, and reserves at the Channel Islands (Scorpion, Gull Island, South Point, Skunk Point,
//   Carrington Point, Judith Rock, Harris Point, Richardson Rock, Santa Barbara Island, Footprint SMRs; Painted Cave SMCA); San Diego —
//   Cabrillo SMR, Famosa Slough SMCA (No-Take), South La Jolla SMR, South La Jolla SMCA, San Diego-Scripps Coastal SMCA, Matlahuayl SMR,
//   Tijuana River Mouth SMCA, San Dieguito Lagoon, Swami's, San Elijo Lagoon (No-Take) and Batiquitos Lagoon (No-Take) SMCAs.
//   https://wildlife.ca.gov/Conservation/Marine/MPAs/Outreach-Materials
// source: CDFW Southern Region page — CDPH advises against eating sport-harvested "mussels, clams, or whole scallops from the Northern
//   Channel Islands."
{
  id: "us-ca-los-angeles-mpa",
  countryCode: "US",
  admin1: CA,
  near: { ...LOS_ANGELES, km: 40 },
  species: [],
  closed: [],
  water: ["sea", "estuary"],
  note: "CDFW lists these Marine Protected Areas on the Los Angeles County coast: the Point Vicente (no-take) and Abalone Cove conservation areas off Palos Verdes, and the Point Dume reserve and conservation area near Malibu. More lie around Santa Catalina Island. CDFW says a state marine reserve allows no extractive activity at all, while a conservation area limits some recreational or commercial take; each area's own rule says what, if anything, may be taken.",
  regulator: "CDFW (Marine Protected Areas)",
  source: "https://wildlife.ca.gov/Conservation/Marine/MPAs/Outreach-Materials",
  checked: CHECKED,
},
{
  id: "us-ca-santa-barbara-mpa",
  countryCode: "US",
  admin1: CA,
  near: { ...SANTA_BARBARA, km: 50 },
  species: [],
  closed: [],
  water: ["sea", "estuary"],
  note: "CDFW lists these Marine Protected Areas near Santa Barbara: the Campus Point and Goleta Slough conservation areas (both no-take), and the Naples and Kashtayit conservation areas west of the city. Reserves surround the northern Channel Islands, among them Scorpion, Gull Island and South Point, plus the Painted Cave conservation area. Reserves allow no extractive activity at all; conservation areas limit some take, as set out in each one's rule. The state health department advises against eating sport-caught mussels, clams or whole scallops from the northern Channel Islands.",
  regulator: "CDFW (Marine Protected Areas)",
  source: "https://wildlife.ca.gov/Conservation/Marine/MPAs/Outreach-Materials",
  checked: CHECKED,
},
{
  id: "us-ca-san-diego-mpa",
  countryCode: "US",
  admin1: CA,
  near: { ...SAN_DIEGO, km: 30 },
  species: [],
  closed: [],
  water: ["sea", "estuary"],
  note: "CDFW lists these Marine Protected Areas around San Diego: the Cabrillo reserve off Point Loma, and the Famosa Slough conservation area (no-take). At La Jolla there are the South La Jolla reserve and conservation area, the Matlahuayl reserve and the San Diego-Scripps Coastal conservation area. The Tijuana River Mouth conservation area lies at the border. Reserves allow no extractive activity at all; conservation areas limit some take, as set out in each one's rule.",
  regulator: "CDFW (Marine Protected Areas)",
  source: "https://wildlife.ca.gov/Conservation/Marine/MPAs/Outreach-Materials",
  checked: CHECKED,
},
// source: CDFW Southern Region page ("updated on November 2, 2026" when the checker read it) — neither San Diego Bay nor Mission Bay is
//   mentioned; Paralabrax "remains open year-round", 5 combined, "no more than 4 barred sand bass", "14 inches total length or 10 inches
//   alternate length"; California halibut "The daily bag and possession limit is five fish south of Point Sur, Monterey County.", 22 inches;
//   "The recreational fishery for giant sea bass (Stereolepis gigas) is closed year-round."
// source: OEHHA press release, San Diego Bay advisory, "July 31, 2018" — based on "levels of mercury and PCBs"; women 18-45 and children
//   1-17 should not eat "Barred Sand Bass, Pacific Chub Mackerel, sharks", shiner perch, spotted sand bass, topsmelt, yellowfin croaker;
//   women 46+ and men should not eat shiner perch or topsmelt and may eat one serving a week of the others named.
//   https://oehha.ca.gov/sites/default/files/media/downloads/fish/press-release-fish/sandiegobaypressrelease073118.pdf
// source: OEHHA, "HEALTH ADVISORY AND GUIDELINES FOR EATING FISH FROM MISSION BAY" (October 2013) — spotted sand bass 1 serving a week
//   (women 18-45, children) / 3 (women over 45, men); yellowfin croaker 2/5; brown smoothhound shark 1/3; topsmelt 6/7.
//   https://oehha.ca.gov/sites/default/files/media/downloads/advisories/missionbay102213.pdf
{
  id: "us-ca-san-diego-bays",
  countryCode: "US",
  admin1: CA,
  near: { ...SAN_DIEGO, km: 20 },
  species: [],
  closed: [],
  water: ["sea", "estuary"],
  note: "CDFW's Southern Region page, which covers the coast from Point Conception to Mexico, names no separate rules for San Diego Bay or Mission Bay. Kelp, barred sand and spotted sand bass are open all year, 5 a day combined (no more than 4 barred sand bass), at least 14 inches long (10 inches alternate length). California halibut are 5 a day south of Point Sur, at least 22 inches. Giant sea bass are closed all year. OEHHA's 2018 San Diego Bay advisory, based on mercury and PCBs, says women aged 18 to 45 and children should not eat any of the following from the bay: barred or spotted sand bass, Pacific chub mackerel, sharks, shiner perch, topsmelt or yellowfin croaker. Women 46 and over and men should eat no shiner perch or topsmelt, and no more than one serving a week of the others. OEHHA's 2013 Mission Bay advice allows women 18 to 45 and children one serving a week of spotted sand bass, and women over 45 and men three.",
  regulator: "CDFW (Southern Region); OEHHA (fish advisories)",
  source: "https://wildlife.ca.gov/fishing/ocean/regulations/fishing-map/southern",
  checked: CHECKED,
},
];


// ============================================================================================================
// LAND: who says whether you may pick, read on the owner's own page (13 November 2026).
// ============================================================================================================

type Pt = { lat: number; lon: number };
const kmBetween = (a: Pt, b: Pt) => {
  const r = Math.PI / 180;
  const dLat = (b.lat - a.lat) * r;
  const dLon = (b.lon - a.lon) * r;
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(a.lat * r) * Math.cos(b.lat * r) * Math.sin(dLon / 2) ** 2;
  return 2 * 6371 * Math.asin(Math.sqrt(h));
};
const within = (p: LandPlace, c: Pt, km: number) => kmBetween(c, p) <= km;
/** Every code used here is a US state. */
const is = (p: LandPlace, code: string, name: string) => p.countryCode === "US" && (p.admin1Code === code || p.admin1 === name);

export const LAND: LandRule[] = [
// 14 CCR 4306, Plants (Cornell LII; last amended effective 7-5-91, designators added 1996): "No person shall willfully or negligently pick,
//   dig up, cut, mutilate, destroy, injure, disturb, move, molest, burn, or carry away any tree or plant or portion thereof", "including but
//   not limited to leaf mold, flowers, foliage, berries, fruit, grass", turf, humus, shrubs, cones and dead wood, "except in specific units
//   when authorization by the Department to take berries, or gather mushrooms, or gather pine cones, or collect driftwood is posted at the
//   headquarters of the unit to which the authorization applies."; "Any collecting allowed by authority of this section may be done for
//   personal use only and not for commercial purposes."; (b) "five pounds of such material except driftwood each day"; (c) "50 pounds or
//   one piece of driftwood each day".
{
  id: "mc-california-state-parks",
  applies: (p) => is(p, "CA", "California"),
  title: "California state parks (State Park System)",
  rule: "California's state park rule (14 CCR 4306) forbids picking, digging up, cutting, damaging, disturbing or carrying away any tree or plant, or any part of one. It names flowers, foliage, berries, fruit, cones and dead wood among them. The one exception is a park unit where the Department has posted, at the unit's headquarters, permission to take berries, gather mushrooms or pine cones, or collect driftwood. Even then, collecting is for personal use only, never commercial, and is limited to five pounds a day (for driftwood, 50 pounds or one piece a day).",
  source: { label: "14 CCR 4306, Plants (California Code of Regulations, Title 14)", url: "https://www.law.cornell.edu/regulations/california/14-CCR-4306" },
  checked: CHECKED,
},
// NPS, Channel Islands National Park Superintendent's Compendium ("Signed 12/18/25. Copy on file"; header "June 2025"): no 36 CFR 2.1(c)
//   designation (it covers only 2.1(a)(5) and 2.1(b)); 2.5 "Taking plants, fish, wildlife, rocks, or minerals is prohibited except in
//   accordance with" Chapter I rules or a specimen collection permit; all rocks and islets within the park boundary closed.
// 36 CFR 2.1 (eCFR, "up to date as of 10/22/2026"): (a)(1)(ii) "Plants or the parts or products thereof."; (c)(1) a superintendent may designate
//   "fruits, berries, nuts, or unoccupied seashells" for hand gathering for personal use; (c)(3) prohibits "Gathering or possessing
//   undesignated natural products." and "Sale or commercial use of natural products." Mushrooms are not named.
{
  id: "mc-channel-islands-np",
  applies: (p) => is(p, "CA", "California") && within(p, SANTA_BARBARA, 70),
  title: "Channel Islands National Park (National Park Service)",
  rule: "Federal park rules (36 CFR 2.1) forbid possessing, removing or disturbing plants, or any part or product of a plant, in a national park. They let a superintendent name fruits, berries, nuts or empty seashells that visitors may pick by hand for their own use. Channel Islands' compendium (signed 18 December 2025) names none, so gathering any natural product is prohibited. All rocks and islets inside the park boundary are closed.",
  source: { label: "NPS: Channel Islands National Park Superintendent's Compendium (signed 18 December 2025); 36 CFR 2.1", url: "https://home.nps.gov/chis/learn/management/upload/CHIS-Superintendent-s-Compendium-12-18-2025.pdf" },
  checked: CHECKED,
},
// NPS, Cabrillo National Monument Superintendent's Compendium (approved 12/17/2025; "Last updated: May 27, 2026"): no 2.1 section, so no
//   2.1(c) designation; headings "Tidepool Group Use:", "Tidepools Closure - South", "Tidepool Exploration Guidelines" with no text read.
//   36 CFR 2.1 as above.
{
  id: "mc-cabrillo-nm",
  applies: (p) => is(p, "CA", "California") && within(p, SAN_DIEGO, 15),
  title: "Cabrillo National Monument (National Park Service)",
  rule: "Federal park rules (36 CFR 2.1) forbid possessing, removing or disturbing plants, or any part or product of a plant, in a national park area, unless the superintendent names fruits, berries, nuts or empty seashells that may be picked by hand. Cabrillo's compendium (approved 17 December 2025) has no such entry, so gathering any natural product is prohibited. It also has an entry for a southern tidepools closure, whose details the web page does not show.",
  source: { label: "NPS: Cabrillo National Monument Superintendent's Compendium (approved 17 December 2025); 36 CFR 2.1", url: "https://www.nps.gov/cabr/learn/management/compendium.htm" },
  checked: CHECKED,
},
// NPS, Santa Monica Mountains NRA Superintendent's Compendium (signed 2 June 2025; "Last updated: June 10, 2026"), 2.1(c): "Mushrooms, native
//   berries, nuts and fruits, mistletoe, leaves of fennel, bay laurel, and black sage; limited to one handful per person for immediate personal
//   use or consumption within the park."; "No more than 10% of materials present on any one plant may be collected."; applies to "all lands
//   and waters administered by the National Park Service," "within the boundaries of Santa Monica Mountains National Recreation Area."
//   Checker, 13 November 2026: "These activities may only be done on those resources where NPS-designated trails exist" belongs to 2.1(a)(5)
//   (walking or climbing on archaeological or cultural resources), not to gathering, and the 2.1(c) entry lists no collection sites; the
//   rule no longer limits gathering to trails.
{
  id: "mc-santa-monica-mountains-nra",
  applies: (p) => is(p, "CA", "California") && within(p, LOS_ANGELES, 50),
  title: "Santa Monica Mountains National Recreation Area (National Park Service land)",
  rule: "On land the National Park Service manages in the recreation area, the compendium lets each person gather one handful of mushrooms, mistletoe, native berries, nuts and fruits, and the leaves of fennel, black sage and bay laurel. The handful is for immediate personal use or for eating within the park, and no more than a tenth of what is on any one plant may be taken. The compendium covers only the land and water the Park Service manages within the recreation area.",
  source: { label: "NPS: Santa Monica Mountains NRA Superintendent's Compendium (signed 2 June 2025), 36 CFR 2.1(c)", url: "https://www.nps.gov/samo/learn/management/compendium.htm" },
  checked: CHECKED,
},
// Angeles National Forest, Permits ("Last updated July 8, 2026"): "Collecting products on National Forest System lands for commercial and
//   private use requires a forest product permit."; firewood, mistletoe and pinecones are the permits most asked for; mushrooms and berries
//   not mentioned. 36 CFR 261.6 (eCFR, "up to date as of 10/01/2026"): (a) "Cutting or otherwise damaging any timber, tree, or other forest
//   product," and (h) "Removing any timber, tree or other forest product," prohibited except "as authorized by a special-use authorization,
//   timber sale contract, or Federal law or regulation."
{
  id: "mc-angeles-nf",
  applies: (p) => is(p, "CA", "California") && within(p, LOS_ANGELES, 60),
  title: "Angeles National Forest (U.S. Forest Service)",
  rule: "Angeles National Forest says a forest product permit is needed to collect products on National Forest land, whether for commercial or private use. Firewood, mistletoe and pine cones are the permits most often asked for. Federal rules (36 CFR 261.6) also forbid cutting, damaging or removing any tree or other forest product without a permit, contract or other federal authorization. The forest's page does not mention mushrooms or berries.",
  source: { label: "USDA Forest Service: Angeles National Forest, Permits (updated 8 July 2026); 36 CFR 261.6", url: "https://www.fs.usda.gov/r05/angeles/permits" },
  checked: CHECKED,
},
// 36 CFR 261.6 as above. Los Padres National Forest, Forest Products ("Last updated June 10, 2025") and Passes & Permits ("Last updated
//   November 6, 2026"): no personal-use gathering rules; Supervisor's Office, 1980 Old Mission Drive, Solvang, 805-968-6640.
{
  id: "mc-los-padres-nf",
  applies: (p) => is(p, "CA", "California") && within(p, SANTA_BARBARA, 40),
  title: "Los Padres National Forest (U.S. Forest Service)",
  rule: "Federal rules for national forests (36 CFR 261.6) forbid cutting, damaging or removing any timber, tree or other forest product, except under a special-use authorization, a timber sale contract or another federal law or regulation. Los Padres National Forest's own permit pages give no rules for picking mushrooms, berries or other plants for personal use. Its supervisor's office is in Solvang.",
  source: { label: "eCFR: 36 CFR 261.6, Timber and other forest products (current to 1 October 2026)", url: "https://www.ecfr.gov/current/title-36/chapter-II/part-261/subpart-A/section-261.6" },
  checked: CHECKED,
},
// 36 CFR 261.6 as above. Cleveland National Forest, Permits ("Last updated October 29, 2026") and Forest Products ("Last updated July 15,
//   2025"): no personal-use gathering rules; Supervisor's Office 858-673-6180. Checker: the Forest Products page links to a "Non-Wood Forest
//   Products" section whose text did not come through.
{
  id: "mc-cleveland-nf",
  applies: (p) => is(p, "CA", "California") && within(p, SAN_DIEGO, 60),
  title: "Cleveland National Forest (U.S. Forest Service)",
  rule: "Federal rules for national forests (36 CFR 261.6) forbid cutting, damaging or removing any timber, tree or other forest product, except under a special-use authorization, a timber sale contract or another federal law or regulation. The Cleveland National Forest permit and forest-product pages that were read give no rules for picking mushrooms, berries or other plants for personal use.",
  source: { label: "eCFR: 36 CFR 261.6, Timber and other forest products (current to 1 October 2026)", url: "https://www.ecfr.gov/current/title-36/chapter-II/part-261/subpart-A/section-261.6" },
  checked: CHECKED,
},
// Santa Clara County Parks, General Rules & Ordinances (no date): "Collection of plant specimens and feeding of birds or animals is not
//   permitted."; "No wood gathering."; "Take Only Photographs... Leave Only Footprints"; no ordinance section numbers on the page.
{
  id: "mc-santa-clara-county-parks",
  applies: (p) => is(p, "CA", "California") && within(p, SAN_JOSE, 40),
  title: "Santa Clara County parks",
  rule: "Santa Clara County Parks' rules say collecting plant specimens is not permitted and that wood may not be gathered; visitors are asked to take only photographs and leave only footprints. The rules page does not mention fruit, nuts or mushrooms.",
  source: { label: "Santa Clara County Parks: General Rules & Ordinances", url: "https://parkhere.org/plan-your-visit/general-rules-ordinances" },
  checked: CHECKED,
},
// Midpeninsula Regional Open Space District, District Regulations ("Revised and Adopted by Ordinance No. 24-02, July 24, 2024."): § 702.1
//   no possessing, damaging, taking or removing "any plant, fungi, tree" or part, "whether living or dead", including mushrooms, cones, seeds
//   and leaves; § 602.1 no harvesting any plant or crop "except with prior written authorization of the General Manager or the General
//   Manager's designee."; § 702.5 written permission to remove plants only for "research, interpretive, educational, or operational purposes."
{
  id: "mc-midpen-open-space",
  applies: (p) => is(p, "CA", "California") && within(p, SAN_JOSE, 30),
  title: "Midpeninsula Regional Open Space District preserves",
  rule: "Midpen's regulations (Ordinance 24-02, July 2024) forbid possessing, damaging, taking or removing any plant, fungus or tree, living or dead, or any part of one, mushrooms, cones, seeds and leaves included (section 702.1). Harvesting any plant or crop needs the General Manager's written authorization (602.1), and written permission to remove plants is given only for research, interpretive, educational or operational work (702.5). There is no exception for picking berries, fruit or mushrooms.",
  source: { label: "Midpen: District Regulations (Ordinance No. 24-02, 24 July 2024), sections 602.1, 702.1, 702.5", url: "https://www.openspace.org/sites/default/files/District_Regulations.pdf" },
  checked: CHECKED,
},
// Sacramento City Code, park prohibited-acts section (amlegal; the page shows no section number, chapter or title, and begins "No person
//   shall:"; its other subsections speak of "any park", "all parks"; it cross-refers to "chapter 12.72" and "Section 12.72.110"; Ord. 2022-0012
//   § 1; Ord. 2020-0001 § 5; Ord. 2017-0004 § 1; Ord. 2012-042 § 5), subsection Q: "Intentionally remove, break, injure, deface, or disturb
//   any plant material, structure, or improvement;" — no exception stated.
{
  id: "mc-sacramento-city-parks",
  applies: (p) => is(p, "CA", "California") && within(p, SACRAMENTO, 15),
  title: "City of Sacramento parks",
  rule: "Sacramento's City Code park rules forbid intentionally removing, breaking, injuring, defacing or disturbing any plant material in a city park. The code names no exception.",
  source: { label: "Sacramento City Code, park rules, prohibited acts, subsection Q", url: "https://codelibrary.amlegal.com/codes/sacramentoca/latest/sacramento_ca/0-0-0-24450" },
  checked: CHECKED,
},
// County of Sacramento Department of Regional Parks, "Sacramento County Park Ordinances" (May 2021 compilation of County Code Title 9, chapter
//   9.36): § 9.36.063(a) no person shall "Dig up, pick, remove, mutilate, injure, cut, or destroy any turf, tree, plant, shrub, bloom, flower";
//   no exception stated; § 9.36.061(a)(3): "in proper season, fish may be fished and removed from areas designated for fishing by licensed persons."
{
  id: "mc-sacramento-county-parks",
  applies: (p) => is(p, "CA", "California") && within(p, SACRAMENTO, 35),
  title: "Sacramento County regional parks",
  rule: "Sacramento County's park rules (County Code 9.36.063) forbid digging up, picking, removing, injuring, cutting or destroying any turf, tree, plant, shrub, bloom or flower in a county park, with no exception stated. Licensed anglers may fish in season in areas designated for fishing.",
  source: { label: "Sacramento County Regional Parks: Sacramento County Park Ordinances (County Code ch. 9.36, May 2021)", url: "https://regionalparks.saccounty.gov/Rangers/Documents/ParksOrdinance.pdf" },
  checked: CHECKED,
},
// San Diego Municipal Code, Chapter 6, Article 3, Division 1 "Use of Park Areas" (page "(9-2024)"; the checker read the line under §63.0102
//   as "(Amended 2-28-2024 by O-21775 N.S.; effective 3-29-2024.)"): §63.0102(c)(4) Destruction of Plants: "It is unlawful to injure, drive a nail or other object
//   into, destroy, cut or remove any tree", "other natural vegetation, soil, or rock", in any park, "without the written permission of the
//   City Manager".
{
  id: "mc-san-diego-city-parks",
  applies: (p) => is(p, "CA", "California") && within(p, SAN_DIEGO, 20),
  title: "City of San Diego parks",
  rule: "San Diego's Municipal Code (section 63.0102(c)(4)) makes it unlawful to injure, destroy, cut or remove any tree, other natural vegetation, soil or rock in a city park without the City Manager's written permission. It does not mention picking fruit or mushrooms.",
  source: { label: "San Diego Municipal Code, Chapter 6, Article 3, Division 1 (sec. 63.0102(c)(4))", url: "https://docs.sandiego.gov/municode/MuniCodeChapter06/Ch06Art03Division01.pdf" },
  checked: CHECKED,
},
];
