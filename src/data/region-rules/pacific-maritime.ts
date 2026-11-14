/**
 * Rules read from the regulator's own pages for the ecoregion "Pacific Maritime" (pacific-maritime): Nanaimo, Vancouver, Victoria, Seattle and Portland (Oregon).
 *
 * CLOSED: closed-season rows (same shape and standard as src/data/closed-seasons.ts: a regulator, the page it
 * was read from, the date it was read, dates written as the regulator gives them).
 * LAND: where-you-may-pick rules (same shape and standard as src/data/land-rules.ts: the regulator's wording,
 * kept inside the source, with the page and the date it was read).
 *
 * Read 14 November 2026 (Day 5 of the regional audit). Nothing here is inferred: a row exists only where the page
 * was opened and read.
 */
import type { ClosedSeason } from "../closed-seasons";
import type { LandPlace, LandRule } from "../land-rules";

/** Date every page below was opened and read. */
const CHECKED = "2026-11-14";

// ---- Town centres, from src/lib/known-places.json ----------------------------------------------------------------
const NANAIMO = { lat: 49.1639, lon: -123.9381 };
const VANCOUVER = { lat: 49.2609, lon: -123.114 };
const VICTORIA = { lat: 48.4283, lon: -123.365 };
const SEATTLE = { lat: 47.6038, lon: -122.3301 };
const PORTLAND = { lat: 45.5202, lon: -122.6742 };

// ---- Sources read more than once -----------------------------------------------------------------------------------
const DFO_A17 = "https://www.pac.dfo-mpo.gc.ca/fm-gp/rec/tidal-maree/a-s17-eng.html";
const DFO_A19 = "https://www.pac.dfo-mpo.gc.ca/fm-gp/rec/tidal-maree/a-s19-eng.html";
const DFO_A28 = "https://www.pac.dfo-mpo.gc.ca/fm-gp/rec/tidal-maree/a-s28-eng.html";
const DFO_R1 = "https://www.pac.dfo-mpo.gc.ca/fm-gp/rec/fresh-douce/region1-eng.html";
const BC_R1 = "https://www2.gov.bc.ca/assets/gov/sports-recreation-arts-and-culture/outdoor-recreation/fishing-and-hunting/freshwater-fishing/region_1_vancouver_island.pdf";
const BC_R2 = "https://www2.gov.bc.ca/assets/gov/sports-recreation-arts-and-culture/outdoor-recreation/fishing-and-hunting/freshwater-fishing/region_2_lower_mainland.pdf";
const WA_MA10 = "https://www.eregulations.com/washington/fishing/marine-area-10/";

export const CLOSED: ClosedSeason[] = [
// ======================= Canada: British Columbia tidal waters (Fisheries and Oceans Canada) ========================
// source: DFO, "BC tidal area 17 - Nanaimo: Recreational fishing limits, openings and closures" (metadata modified 2026-05-27; salmon and
//   finfish tables "Last updated: 2026-10-20", restrictions "Last updated: 2026-11-01"), read 14 November 2026 — Area 17: chinook "62cm",
//   "barbless hook and line", 2 a day, "Open"; coho "2 Combined Total", "2 - Hatchery - marked 0 - Wild - unmarked", Open; chum and pink 4,
//   Open; sockeye "Non Retention"; "Lingcod | 17 | | | 0 | Closed"; planning note "INSIDE WATERS - Generally open May 1 to September 30, for
//   Areas 13 to 19 ..." ("For planning purposes only"); "Rockfish - Yelloweye" Non Retention, "Rockfish - all species except Yelloweye" Closed;
//   halibut 2 a day, "ten (10) Halibut in the aggregate from April 1, 2026 to March 31, 2027", none over "112 cm head-on length"; "White
//   Sturgeon" Non Retention; gear: "barbed hook (year round )", "a hook having more than one point (Sep 1 to Mar 31)", single point over 22 mm
//   "(Sep 1 to Mar 31)"; "The daily limit for all species of Pacific salmon from tidal and fresh waters combined is four."; Cedar Bridge, "In
//   Subarea 17-14, that portion of the Nanaimo River from the Cedar Bridge to the white square boundary signs": "any gear or method (Oct 25
//   to Nov 30)". Lingcod has no closed row: the table says Closed today, and the open months are given only "for planning purposes".
// source: DFO, Region 1 fresh-water salmon page (modified 2026-11-06), re-read 14 November 2026: "in Subarea 17-14 (tidal portions of the
//   Nanaimo River) from Cedar Bridge downstream", species column "All", "Jul 15 to Oct 25", "No fishing". The page is DFO's "Recreational salmon
//   fishing limits" table, so "All" means all salmon species. The audit of 10 November 2026 (checkers of 14 November) found the note calling this
//   reach "closed to all fishing": it is closed to salmon fishing. The all-finfish closure is the Area 17 page's own "Finfish | Cedar Bridge |
//   Closed | any gear or method (Oct 25 to Nov 30)", for the stretch from Cedar Bridge to the signs about 400 m below it.
//   https://www.pac.dfo-mpo.gc.ca/fm-gp/rec/fresh-douce/region1-eng.html
// Lingcod (re-read 14 November 2026): the Area 17 and Area 19 tables both show "Lingcod | 0 | Closed", and the planning note says inside waters
//   (Areas 13 to 19) are "Generally open May 1 to September 30", while only Area 28 and most of Area 29 are "Closed year round". DFO does not
//   say Areas 17 and 19 are closed all year, so no closed row is written (a year-round row would print "Closed all year", which DFO does not
//   say; a row closing October to April would rest on the planning note DFO marks as for planning only). The cards' lingcod months for
//   Nanaimo and Victoria are therefore still the library's: see the A1 report of 14 November 2026.
// source: DFO, "BC tidal area 17 - Nanaimo: Bivalve shellfish contamination information" (tables "Last updated: 2026-10-20") — sanitary
//   closures "17.4 Nanaimo Harbour" (17-14, with Newcastle Island Passage), "17.5 Departure Bay" (17-13), "17.40 Northumberland Channel, Duke
//   Point Wastewater Treatment Plant" (17-15, 17-16); biotoxin: 17-15 and 17-21 closed to all bivalves; 17-10, 17-12, 17-13, 17-14 and 17-17
//   open for littleneck and manila clams, mussels and Pacific oysters. https://www.pac.dfo-mpo.gc.ca/fm-gp/shellfish-mollusques/contamination/a-s-17-eng.html
// source: DFO, "Fishing regulations in Rockfish Conservation Areas" (modified 2023-12-19): "Recreational fishers may not fish for:" "any species
//   by spearfishing", "groundfish by angling", "salmon by trolling, jigging or mooching". https://www.pac.dfo-mpo.gc.ca/fm-gp/sustain-soutien/rca-acs/rca-regs-acs-eng.html
//   DFO's Area 17 RCA map page (modified 2026-06-18) names no RCA in its text.
{
  id: "ca-bc-dfo-area17-nanaimo",
  countryCode: "CA",
  admin1: ["BC", "British Columbia"],
  near: { ...NANAIMO, km: 15 },
  species: [],
  closed: [],
  water: ["sea", "estuary"],
  note:
    "Fisheries and Oceans Canada sets the tidal-water rules for Area 17 (Nanaimo) and changes them in season; its table was last updated on 20 October 2026. Chinook were open at 2 a day (at least 62 cm, barbless hook and line), with a coastwide limit of 10 chinook a year. Coho were open at 2 a day, hatchery-marked fish only (wild coho released), chum and pink at 4 a day, and sockeye had to be released. No more than 4 Pacific salmon a day may be kept from tidal and fresh water together. Lingcod and all rockfish were closed (yelloweye must be released, with a descending device or weighted barbless hook); DFO says inside waters such as Area 17 are generally open for lingcod from 1 May to 30 September, but only as a planning guide. Halibut were open at 2 a day, none over 112 cm with the head on, 10 a year from 1 April 2026 to 31 March 2027. White sturgeon must be released. Barbed hooks are banned all year, and from 1 September to 31 March only single-point hooks up to 22 mm are allowed. The tidal Nanaimo River (Subarea 17-14) below Cedar Bridge is closed to salmon fishing from 15 July to 25 October, and the stretch from Cedar Bridge to the signs about 400 m below it is closed to all finfishing from 25 October to 30 November. In Rockfish Conservation Areas, no angling for groundfish, no trolling, jigging or mooching for salmon and no spearfishing. Clams, mussels and oysters are closed for sanitary reasons in Nanaimo Harbour and Newcastle Island Passage, Departure Bay and near the Duke Point treatment plant in Northumberland Channel, and some subareas are closed for biotoxins: check DFO before harvesting.",
  regulator: "Fisheries and Oceans Canada (Area 17)",
  source: DFO_A17,
  checked: CHECKED,
},
// source: DFO, "BC tidal area 28 - Vancouver, Bowen Island, Indian Arm, Squamish: Recreational fishing limits, openings and closures"
//   (metadata modified 2026-06-04; sections "Last updated: 2026-10-20"), read 14 November 2026 — "Lingcod | 28 | | | 0 | Closed"; lingcod and
//   rockfish planning note: "Closed year round - Area 28 and Subareas 29-1 to 29-4 and 29-6 to 29-17."
// source: DFO, "BC tidal area 29 - Lower Mainland, Sunshine Coast, Fraser River" (metadata modified 2026-06-04; other finfish "Last updated:
//   2026-10-25"), read 14 November 2026 — "Lingcod" Area 29 "0", "Closed"; the same "Closed year round" note; Subarea 29-5 is the one Area 29
//   subarea listed among lingcod areas "when they are open to lingcod retention". https://www.pac.dfo-mpo.gc.ca/fm-gp/rec/tidal-maree/a-s29-eng.html
// Circle: 12 km reaches Burrard Inlet, English Bay and the water off Point Grey (about 11 km). Where Subarea 29-5 lies could not be read (DFO's
//   area map page shows it only as an image; SOR/2007-77 Schedule 2 did not load past Area 4); its grouping with the Gulf Islands' inside-water
//   areas suggests it is not off Vancouver, but this is not confirmed — see the doubts in the report.
{
  id: "ca-bc-dfo-area28-vancouver-lingcod",
  countryCode: "CA",
  admin1: ["BC", "British Columbia"],
  near: { ...VANCOUVER, km: 12 },
  species: ["lingcod"],
  closed: [{ from: "01-01", to: "12-31" }],
  water: ["sea", "estuary"],
  note:
    "Fisheries and Oceans Canada lists lingcod (and rockfish) as closed year round in Area 28, which takes in Burrard Inlet and English Bay, and in Area 29 except Subarea 29-5. Its Area 28 and 29 tables both showed lingcod closed when read.",
  regulator: "Fisheries and Oceans Canada (Areas 28 and 29)",
  source: DFO_A28,
  checked: CHECKED,
},
// source: DFO Area 28 page (as above) — chinook "62 cm", 2, Open (Area 28); coho 2 combined (hatchery-marked 2, wild 0) in 28-1 to 28-10, "0"
//   Non-retention in 28-11 to 28-14; chum and pink 4; sockeye Non-retention; halibut 2 a day, 10 a year from April 1, 2026 to March 31, 2027,
//   none over 112 cm head-on; rockfish (yelloweye and all others) Closed; white sturgeon Non-retention; Capilano and Seymour rivers: single
//   point over 15 mm banned Aug 1 to Dec 31; Area 28: multi-point and single point over 22 mm banned Sep 1 to Mar 31, barbed hooks year round;
//   Point Atkinson and Whytecliff Park closed to any gear year round; bivalves "Closed to All Bivalve Species" in Subareas 28-6 to 28-12
//   (sanitary closure of Burrard Inlet, Indian Arm and Vancouver Harbour); 28-8 (False Creek) and part of 28-10 closed to harvesting
//   (navigational closures). Area 29 page (salmon "Last updated: 2026-11-01"): chinook open (62 cm, 2) in 29-1 to 29-5 and 29-8, closed in 29-6,
//   29-7 and 29-9 to 29-17; coho 2 (hatchery only) throughout; pink open only in 29-1 to 29-5 and 29-8; Fraser tidal portion ("Fraser River
//   downstream of the CPR Bridge at Mission, BC to the mouth"): finfish closed "From one hour after sunset to one hour before sunrise only -
//   (year round )"; pink and sockeye closed year round; white sturgeon "Non Retention".
{
  id: "ca-bc-dfo-areas28-29-vancouver",
  countryCode: "CA",
  admin1: ["BC", "British Columbia"],
  near: { ...VANCOUVER, km: 20 },
  species: [],
  closed: [],
  water: ["sea", "estuary"],
  note:
    "Fisheries and Oceans Canada sets the tidal-water rules for Area 28 (Burrard Inlet, English Bay, Indian Arm, Howe Sound) and Area 29 (the Strait off Vancouver and the tidal Fraser River up to the CPR bridge at Mission), and changes them in season. When read (tables updated 20 October to 1 November 2026), chinook were open in Area 28 at 2 a day, at least 62 cm, but in Area 29 only in Subareas 29-1 to 29-5 and 29-8. Coho were open at 2 a day, hatchery-marked fish only, except in Subareas 28-11 to 28-14, where they must be released. Sockeye must be released, and chinook, pink salmon and sockeye are closed all year in the tidal Fraser, where all finfishing is closed from an hour after sunset to an hour before sunrise. Rockfish are closed all year in Area 28 and most of Area 29, and white sturgeon must be released. Halibut were open at 2 a day, 10 a year from 1 April 2026 to 31 March 2027. Barbed hooks are banned all year; from 1 September to 31 March only single-point hooks up to 22 mm are allowed, and off the Capilano and Seymour rivers, from 1 August to 31 December, none over 15 mm. Point Atkinson and Whytecliff Park are closed to all gear all year. Clams, mussels and oysters are closed in Burrard Inlet, Vancouver Harbour and Indian Arm (Subareas 28-6 to 28-12) for sanitary reasons, and False Creek is closed to harvesting.",
  regulator: "Fisheries and Oceans Canada (Areas 28 and 29)",
  source: DFO_A28,
  checked: CHECKED,
},
// source: DFO, "BC tidal area 19 - Victoria, Sidney: Recreational fishing limits, openings and closures" (metadata modified 2026-07-31; salmon
//   and finfish "Last updated: 2026-10-20"), read 14 November 2026 — chinook "45 cm", 2, Open in 19-1, 19-3, 19-4; 19-2 "0", "Closed"; 19-5 to
//   19-11 "62 cm", 2, Open; 19-12 Non Retention; coho 2 combined, at most 2 hatchery-marked and 1 wild-unmarked; chum and pink 4; sockeye Non
//   Retention; lingcod Closed (planning: generally open May 1 to September 30, Areas 13 to 19); yelloweye Non Retention, other rockfish Closed;
//   halibut 2, Open; white sturgeon Non Retention; barbed hooks banned year round, multi-point and single point over 22 mm Sep 1 to Mar 31;
//   Esquimalt Harbour (19-2) closed to all fishing "effective May 10, 2016, until further notice" (fuel spill); Ogden Point closed to spear
//   fishing while diving year round. The Saanich Inlet closures at Christmas Point (19-12) and Whiskey Point lie outside the circle and are left out.
// source: DFO, "BC tidal area 19 - Victoria and Sidney: Bivalve shellfish contamination information" ("Last updated: 2026-11-13"): sanitary
//   closure "19.1 Albert Head to Cordova Bay" (19-1 to 19-4); biotoxin: "Closed to all bivalve species" in 19-1, 19-2, 19-3, 19-5 and 19-6.
//   https://www.pac.dfo-mpo.gc.ca/fm-gp/shellfish-mollusques/contamination/a-s-19-eng.html
// Which subareas front the town is not stated on the page, so the chinook sizes are given by subarea, not placed.
{
  id: "ca-bc-dfo-area19-victoria",
  countryCode: "CA",
  admin1: ["BC", "British Columbia"],
  near: { ...VICTORIA, km: 12 },
  species: [],
  closed: [],
  water: ["sea", "estuary"],
  note:
    "Fisheries and Oceans Canada sets the tidal-water rules for Area 19 (Victoria and Saanich) and changes them in season; its table was last updated on 20 October 2026. Chinook were open at 2 a day, with a minimum of 45 cm in Subareas 19-1, 19-3 and 19-4 and 62 cm in 19-5 to 19-11; they were closed in 19-2 and had to be released in 19-12. Coho were open at 2 a day, no more than 1 of them wild, chum and pink at 4, and sockeye had to be released. No more than 4 Pacific salmon a day may be kept from tidal and fresh water together, and 10 chinook a year. Lingcod and rockfish were closed (yelloweye must be released); DFO gives 1 May to 30 September as the usual lingcod months for inside waters, for planning only. Halibut were open at 2 a day, and white sturgeon must be released. Barbed hooks are banned all year, and from 1 September to 31 March only single-point hooks up to 22 mm are allowed. Esquimalt Harbour has been closed to all fishing since a fuel spill in May 2016, and spearfishing is banned all year at Ogden Point. Clams, mussels and oysters are closed for sanitary reasons from Albert Head to Cordova Bay, and on 13 November 2026 all bivalves were closed for biotoxins in Subareas 19-1, 19-2, 19-3, 19-5 and 19-6.",
  regulator: "Fisheries and Oceans Canada (Area 19)",
  source: DFO_A19,
  checked: CHECKED,
},

// ======================= Canada: British Columbia fresh water (Province of BC; DFO for salmon) ======================
// source: 2025-2027 BC Freshwater Fishing Regulations Synopsis, Region 1 (Vancouver Island), read 14 November 2026 — General Regulations:
//   "Summer closure: No Fishing in any stream in Management Units 1-1 to 1-6 from July 15-Aug 31" "(see water specific regulations table for
//   exceptions)". The only exempt waters are the Nitinat (1-4), Oyster, Puntledge, Qualicum and Quinsam (1-6) rivers, all far outside both
//   circles; no stream in MUs 1-1, 1-2 or 1-5 is exempt. Nanaimo is placed in MU 1-5 by the table's Nanaimo River, Westwood Lake, Long Lake
//   (Nanaimo) and Diver Lake entries; Victoria in MUs 1-1 and 1-2 by the Elk Lake, Beaver Lake, Colquitz River (1-1), Goldstream River and
//   Langford Lake (1-2) entries. "The regulations described in this Synopsis do not apply to tidal waters." (Provincial section)
{
  id: "ca-bc-r1-summer-stream-closure-nanaimo",
  countryCode: "CA",
  admin1: ["BC", "British Columbia"],
  near: { ...NANAIMO, km: 20 },
  species: ["*"],
  closed: [{ from: "07-15", to: "08-31" }],
  water: ["rivers"],
  note:
    "BC's 2025-27 freshwater synopsis closes every stream in Management Units 1-1 to 1-6 of Vancouver Island, Nanaimo's unit 1-5 among them, to all fishing from 15 July to 31 August. None of the exempt rivers it lists is near Nanaimo. Some streams have further closures of their own.",
  regulator: "Province of British Columbia (Region 1, Vancouver Island)",
  source: BC_R1,
  checked: CHECKED,
},
{
  id: "ca-bc-r1-summer-stream-closure-victoria",
  countryCode: "CA",
  admin1: ["BC", "British Columbia"],
  near: { ...VICTORIA, km: 15 },
  species: ["*"],
  closed: [{ from: "07-15", to: "08-31" }],
  water: ["rivers"],
  note:
    "BC's 2025-27 freshwater synopsis closes every stream in Management Units 1-1 to 1-6 of Vancouver Island, Victoria's units 1-1 and 1-2 among them, to all fishing from 15 July to 31 August. None of the exempt rivers it lists is near Victoria, and the Goldstream and Colquitz rivers and Craigflower Creek are closed to fishing all year.",
  regulator: "Province of British Columbia (Region 1, Vancouver Island)",
  source: BC_R1,
  checked: CHECKED,
},
// source: DFO, "Region 1 - Vancouver Island: Recreational salmon fishing limits, openings and closures" (date modified 2026-11-06), read 14 November
//   2026 — "Unless otherwise stated in the table below, the daily limit for all waters in Region 1 is zero (0)."; "The daily limit for all species
//   of Pacific salmon from tidal and fresh waters combined is 4."; "No fishing is allowed within 100 meters of any government facility operated
//   for counting, passing or rearing fish". No chinook entry for any water within 20 km of Nanaimo (Nanaimo River lines are coho and chum only);
//   within 15 km of Victoria no water is listed for chinook or coho except the Goldstream River ("All Apr 1 to Mar 31 No fishing"). The Koksilah
//   and Cowichan (with coho and chum openings) are 40 km and more from Victoria.
// Re-read 14 November 2026 (same wording, same table). The audit of 10 November 2026 (checkers of 14 November) found the river cards at Nanaimo
//   and Victoria calling chinook and coho "in season" while these rows were notes. They are now catch-and-release rows (`noKeep`): DFO sets the
//   limit at zero, it does not close fishing. Nanaimo coho are release-only to 15 October and may be kept (hatchery-marked) from 16 October to 31
//   December only between the Cedar Road Bridge and the Highway 1 overpass, the river through the town, so the no-keep range stops on 15 October.
//   A year-round range is printed by src/lib/fishing-waters.ts (releaseFor) as "Catch and release only until 1 January" unless it reads the
//   range's `allYear`; package A2 was asked (14 November 2026) to print "Catch and release only all year" for it.
{
  id: "ca-bc-dfo-r1-nanaimo-chinook",
  countryCode: "CA",
  admin1: ["BC", "British Columbia"],
  near: { ...NANAIMO, km: 20 },
  species: ["chinook-salmon"],
  closed: [],
  noKeep: [{ from: "01-01", to: "12-31" }],
  water: ["rivers"],
  note:
    "Fisheries and Oceans Canada sets a daily limit of zero for salmon in every Region 1 fresh water unless its table lists the water, and it lists no chinook opening for the Nanaimo River or any other stream near Nanaimo (page of 6 November 2026), so chinook caught in fresh water must be released all year. DFO can open a water in season.",
  regulator: "Fisheries and Oceans Canada (Region 1 fresh water)",
  source: DFO_R1,
  checked: CHECKED,
},
{
  id: "ca-bc-dfo-r1-nanaimo-coho",
  countryCode: "CA",
  admin1: ["BC", "British Columbia"],
  near: { ...NANAIMO, km: 20 },
  species: ["coho-salmon"],
  closed: [],
  noKeep: [{ from: "01-01", to: "10-15" }],
  water: ["rivers"],
  note:
    "Fisheries and Oceans Canada sets a daily limit of zero for salmon in Region 1 fresh water unless its table lists the water, and lists Nanaimo River coho as release-only from 15 October until further notice. The one exception near Nanaimo is the Nanaimo River from the Cedar Road Bridge up to the Highway 1 overpass, where 4 hatchery-marked coho a day may be kept from 16 October to 31 December (page of 6 November 2026). Everywhere else coho caught in fresh water must be released.",
  regulator: "Fisheries and Oceans Canada (Region 1 fresh water)",
  source: DFO_R1,
  checked: CHECKED,
},
{
  id: "ca-bc-dfo-r1-victoria-salmon",
  countryCode: "CA",
  admin1: ["BC", "British Columbia"],
  near: { ...VICTORIA, km: 15 },
  species: ["chinook-salmon", "coho-salmon"],
  closed: [],
  noKeep: [{ from: "01-01", to: "12-31" }],
  water: ["rivers"],
  note:
    "Fisheries and Oceans Canada sets a daily limit of zero for salmon in every Region 1 fresh water unless its table lists the water, and it lists no chinook or coho opening for any stream near Victoria (page of 6 November 2026); the Goldstream River is closed to all fishing all year. Salmon caught in fresh water here must be released all year. DFO can open a water in season.",
  regulator: "Fisheries and Oceans Canada (Region 1 fresh water)",
  source: DFO_R1,
  checked: CHECKED,
},
// source: BC synopsis Region 1 (as above) — "Single barbless hook: must be used in all streams of Region 1, all year."; bait ban "applies to all
//   streams of Region 1, all year, with some important exceptions"; wild trout from streams released; "All wild steelhead" released; "only
//   hatchery steelhead may be retained in B.C."; "Trout: 4, but not more than" 1 over 50 cm and 2 from streams (hatchery only); "Kokanee: 5
//   (none from streams)"; "Bass: unlimited"; "Yellow perch: unlimited"; "White Sturgeon: catch and release only". NANAIMO RIVER 1-5: "No Fishing
//   July 15-Aug 31"; "No Fishing from power line crossing at "Bore Hole" upstream to fishing boundary signs at the mouth of Boulder Creek"; "No
//   Fishing from the Cedar Road Bridge upstream to the Hwy 19 bridge, Sept 1-Oct 15"; "No Fishing upstream of the Hwy 1 bridge, Dec 1-May 31";
//   "Artificial fly only upstream of the westernmost of the two Nanaimo Lakes". Westwood Lake (1-5): smallmouth bass quota 4.
// source: DFO Region 1 page (as above) — Nanaimo River: coho "Oct 15 until further notice", "Non-retention" (whole river); "Upstream of Cedar Road
//   Bridge to the Highway 1 overpass": coho "Oct 16 to Dec 31 4 per day, hatchery marked only"; chum "Nov 1 to Nov 6 2 per day", "Nov 7 to Dec 31
//   4 per day".
// source: BC synopsis, Provincial Level Synopsis Section (read 14 November 2026): "You must have a valid basic licence to sport fish for any
//   species of fish in non-tidal waters (including salmon)." (16 and over); residents under 16 need no licence; steelhead needs a Conservation
//   Surcharge Stamp; licence year April 1 to March 31. https://www2.gov.bc.ca/assets/gov/sports-recreation-arts-and-culture/outdoor-recreation/fishing-and-hunting/freshwater-fishing/pw_regulations_guide.pdf
{
  id: "ca-bc-r1-nanaimo-fresh-water",
  countryCode: "CA",
  admin1: ["BC", "British Columbia"],
  near: { ...NANAIMO, km: 20 },
  species: [],
  closed: [],
  water: ["rivers", "lakes"],
  note:
    "BC's 2025-27 synopsis for Region 1 requires a single barbless hook in every stream all year and bans bait in streams, with listed exceptions. Wild trout from streams and all wild steelhead must be released; only hatchery steelhead may be kept. Daily quotas are 4 trout (only 1 over 50 cm and 2 from streams, hatchery fish only), 5 kokanee (none from streams), and no limit on bass or yellow perch; white sturgeon are catch-and-release only. Westwood Lake has a 4-a-day smallmouth bass quota. On the Nanaimo River, besides the summer closure, fishing is closed upstream of the Highway 1 bridge from 1 December to 31 May, from the Cedar Road Bridge up to the Highway 19 bridge from 1 September to 15 October, and in the stretch from the Bore Hole power line up to Boulder Creek; above Second Lake it is fly fishing only. Fisheries and Oceans Canada lists Nanaimo River coho as release-only from 15 October until further notice, but allows 4 hatchery-marked coho a day from the Cedar Road Bridge up to the Highway 1 overpass from 16 October to 31 December, with chum at 2 a day from 1 to 6 November and 4 a day to 31 December. Anglers 16 and older need a BC basic freshwater licence; resident children under 16 do not.",
  regulator: "Province of British Columbia (Region 1); DFO for salmon",
  source: BC_R1,
  checked: CHECKED,
},
// source: BC synopsis Region 1 (as above) — Colquitz River (1-1), Craigflower Creek (1-1), Goldstream River (1-2): "No Fishing"; Elk Lake and
//   Beaver Lake (1-1), Prospect Lake and Langford Lake (1-2): smallmouth bass quota 4; Thetis Lake (1-1): electric motor only; Sooke River (1-2,
//   about 25 km): fly fishing only below Sooke River Falls Sept 1-Nov 30.
{
  id: "ca-bc-r1-victoria-fresh-water",
  countryCode: "CA",
  admin1: ["BC", "British Columbia"],
  near: { ...VICTORIA, km: 15 },
  species: [],
  closed: [],
  water: ["rivers", "lakes"],
  note:
    "BC's 2025-27 synopsis for Region 1 requires a single barbless hook in every stream all year and bans bait in streams, with listed exceptions. Wild trout from streams and all wild steelhead must be released. Daily quotas are 4 trout (only 1 over 50 cm and 2 from streams, hatchery fish only), 5 kokanee (none from streams), and no limit on bass or yellow perch; white sturgeon are catch-and-release only. Elk, Beaver, Prospect and Langford lakes have a 4-a-day smallmouth bass quota. The Colquitz and Goldstream rivers and Craigflower Creek are closed to fishing. Anglers 16 and older need a BC basic freshwater licence; resident children under 16 do not.",
  regulator: "Province of British Columbia (Region 1, Vancouver Island)",
  source: BC_R1,
  checked: CHECKED,
},
// source: 2025-2027 BC Freshwater Fishing Regulations Synopsis, Region 2 (Lower Mainland), read 14 November 2026 — "Single barbless hook: must be
//   used in all streams of Region 2, all year."; no dated region-wide stream closure in the general section; wild trout and char from streams
//   released; all wild steelhead released; "Trout/char: 4, but not more than" 1 over 50 cm, 2 from streams (hatchery), 1 char none under 60 cm;
//   hatchery trout under 30 cm from streams released; "Kokanee: 5 (none from streams)"; "Bass: 20"; "White Sturgeon: CATCH AND RELEASE ONLY."
//   MU 2-8: Capilano River — no fishing above the boundary signs at the footbridge about 100 m below the fish fence, bait ban Aug 1-Oct 31,
//   steelhead catch and release; Seymour River — no fishing downstream of Seymour Lake; Lynn Creek — no fishing near Twin Falls Bridge (signs
//   about 200 m above to 150 m below); McKay Creek and Mosquito Creek — "No Fishing"; Brunette River — no fishing upstream of Burnaby Lake or
//   from Cariboo Dam to Salamander Creek, tributaries closed; Deer Lake, Como Lake, Rice Lake, Lafarge Lake — trout/char quota 2.
// source: DFO, "Region 2 - Lower Mainland: Recreational salmon fishing limits, openings and closures" (modified 2026-11-06) — Capilano River: coho
//   "Apr 1 to Jun 30" 2 hatchery-marked, "Jul 1 to Mar 31" 4 hatchery-marked; chinook "Aug 1 to Sep 4" 4 (only 2 over 62 cm), "Sep 5 to Nov 30"
//   4; Fraser River "Upstream of the CPR Bridge at Mission": no salmon fishing from Apr 1 until further notice; "The total annual limit for chinook
//   and 16, not Vancouver's. https://www.pac.dfo-mpo.gc.ca/fm-gp/rec/fresh-douce/region2-eng.html
// Re-read 14 November 2026 (modified 2026-11-06): the zero default is for waters "flowing into Areas 13, 15, and 16", but the page also says
//   "There is no fishing for salmon in waters of Region 2 flowing into Areas 28 and 29" except the openings in its table, and "This table refers
//   to fishing for salmon only." Within 20 km of Vancouver the table lists only the Capilano River (coho, hatchery-marked, all year: 2 a day
//   1 April to 30 June, 4 a day 1 July to 31 March; chinook 1 August to 30 November). The Fraser below the CPR bridge at Mission is tidal (Area
//   29 page, re-read 14 November 2026: Fraser tidal portion chinook "Closed", "barbless hook and line (year round )"; coho open, hatchery only).
// The audit of 10 November 2026 (checkers of 14 November) found Vancouver's river cards calling chinook in season and the note missing the tidal
//   Fraser's year-round chinook closure. The river cards name the Fraser, Musqueam Creek and Cutthroat Creek, all closed to chinook all year, so the
//   row closes chinook all year; the Capilano, across Burrard Inlet in North Vancouver and not among the waters the cards name, is the one exception
//   and is given in the note. Coho get no row: hatchery coho may be kept in the tidal Fraser and all year on the Capilano.
{
  id: "ca-bc-dfo-r2-vancouver-chinook-rivers",
  countryCode: "CA",
  admin1: ["BC", "British Columbia"],
  near: { ...VANCOUVER, km: 20 },
  species: ["chinook-salmon"],
  closed: [{ from: "01-01", to: "12-31" }],
  water: ["rivers"],
  note:
    "Fisheries and Oceans Canada allows no salmon fishing in the Region 2 waters that flow into the sea off Vancouver (Areas 28 and 29) except where its table opens a water (page of 6 November 2026), and the tidal Fraser below Mission is closed to chinook all year (Area 29), though hatchery coho may be kept there. The one exception near Vancouver is the Capilano River in North Vancouver, open for chinook from 1 August to 30 November (4 a day) and for hatchery-marked coho all year.",
  regulator: "Fisheries and Oceans Canada (Region 2 fresh water; Area 29)",
  source: "https://www.pac.dfo-mpo.gc.ca/fm-gp/rec/fresh-douce/region2-eng.html",
  checked: CHECKED,
},
{
  id: "ca-bc-r2-vancouver-fresh-water",
  countryCode: "CA",
  admin1: ["BC", "British Columbia"],
  near: { ...VANCOUVER, km: 20 },
  species: [],
  closed: [],
  water: ["rivers", "lakes"],
  note:
    "BC's 2025-27 synopsis for Region 2 requires a single barbless hook in every stream all year. Wild trout and char from streams and all wild steelhead must be released, and hatchery trout under 30 cm from streams too. Daily quotas are 4 trout or char (only 1 over 50 cm, 2 from streams, 1 char of at least 60 cm), 5 kokanee (none from streams) and 20 bass; white sturgeon are catch-and-release only. Deer, Como, Rice and Lafarge lakes allow 2 trout a day. On the North Shore, McKay and Mosquito creeks are closed to fishing, the Seymour River is closed below Seymour Lake, Lynn Creek is closed around Twin Falls Bridge, and the Capilano River is closed above the signs below the fish fence, has a bait ban from 1 August to 31 October and is catch-and-release for steelhead. Fisheries and Oceans Canada allows Capilano coho (hatchery-marked, 2 a day to 30 June, then 4) and chinook (4 a day, 1 August to 30 November); no other stream here is open to salmon. Anglers 16 and older need a BC basic freshwater licence; resident children under 16 do not.",
  regulator: "Province of British Columbia (Region 2, Lower Mainland); DFO for salmon",
  source: BC_R2,
  checked: CHECKED,
},

// ======================= United States: Washington (Seattle) ========================================================
// source: WDFW, Washington sport fishing rules (eRegulations), "Marine Area 10", "Last Updated: October 5, 2026" (corrections file "Corrections &
//   Clarifications 2026-2027"), read 14 November 2026 — area: "(From the Apple Cove Point-Edwards Point to a line projected true east-west through
//   the north tip of Vashon Island)". Entire Area salmon: "June 1-July 22" "Release Chinook and chum."; "July 23-July 25" "Chinook - min. size 22”",
//   "Release chum and wild Chinook."; "July 26-Sept. 30" "Release Chinook and chum."; "Oct. 1-Nov. 15" "Release Chinook."; "Nov. 16-Mar. 30"
//   "CLOSED."; "Mar. 31-Apr. 30" "Open Wed.-Sat. only. Closed Sun-Tues.", "Release chum and wild Chinook." May is not listed. Exception areas inside
//   the circle all have "Nov. 16-Mar. 30" "CLOSED.": Shilshole Bay and West Elliott Bay (also "July 1-Aug. 31" "CLOSED."), East Elliott Bay and
//   Harbor Island (Duwamish Waterways) ("July 1-July 30" "CLOSED."; "July 31-Aug. 3 (12:00 p.m.)" Chinook 22" kept; "Aug. 3 (12:00 p.m.) - Aug. 31"
//   "CLOSED."; June and Sept. 1-Nov. 15 "Release Chinook"). Agate Pass (closed Nov. 16-Dec. 31, fly-only catch-and-release Jan. 1-Mar. 31) is
//   about 20 km away and Sinclair Inlet about 23 km, outside the circle.
// Circle: 9 km; the area's southern line through the north tip of Vashon Island runs about 10 km south of the town centre.
// Chinook no-keep days: those on which every water in the circle either releases Chinook or is closed (closed wins): 1 June-22 July, 26-30 July,
//   4 August-15 November. 23-25 July (kept in the main area) and 31 July-3 August (kept in East Elliott Bay and Harbor Island) are left open.
// WDFW emergency rules page (read 14 November 2026) lists no Marine Area 10 rule after the April 2026 ones. https://wdfw.wa.gov/fishing/regulations/emergency-rules
// Re-read 14 November 2026 for the audit of 10 November (checkers of 14 November), which found the coho row closed only 16 November to 30 March
//   although WDFW lists no May season: the Entire Area lines run "Mar. 31-Apr. 30" then "June 1-July 22", with nothing for 1 to 31 May, and WDFW's
//   Marine Area Rules & Definitions page (Last Updated October 5, 2026) says marine waters are open "During an open season". May is therefore closed
//   for salmon (coho and Chinook). 31 March to 30 April is open on Wednesdays to Saturdays only; a row cannot hold weekdays, so those days stay open
//   in the rows and the note says the weekday rule. https://www.eregulations.com/washington/fishing/marine-area-rules-definitions
{
  id: "us-wa-ma10-seattle-coho",
  countryCode: "US",
  admin1: ["WA", "Washington"],
  near: { ...SEATTLE, km: 9 },
  species: ["coho-salmon"],
  closed: [
    { from: "11-16", to: "03-30" },
    { from: "05-01", to: "05-31" },
  ],
  water: ["sea", "estuary"],
  note:
    "In Marine Area 10 (Seattle-Bremerton), Washington's 2026-27 rules open salmon from 1 June to 15 November, 2 a day; salmon fishing is closed from 16 November to 30 March. From 31 March to 30 April salmon may be fished on Wednesdays to Saturdays only, never Sunday to Tuesday. The rules give no salmon season for May, so it is closed then. Shilshole Bay and West Elliott Bay are also closed from 1 July to 31 August, and East Elliott Bay and the Duwamish waterways around Harbor Island are closed in July and August except from 31 July to noon on 3 August.",
  regulator: "Washington Department of Fish and Wildlife (Marine Area 10)",
  source: WA_MA10,
  checked: CHECKED,
},
{
  id: "us-wa-ma10-seattle-chinook",
  countryCode: "US",
  admin1: ["WA", "Washington"],
  near: { ...SEATTLE, km: 9 },
  species: ["chinook-salmon"],
  closed: [
    { from: "11-16", to: "03-30" },
    { from: "05-01", to: "05-31" },
  ],
  noKeep: [
    { from: "06-01", to: "07-22" },
    { from: "07-26", to: "07-30" },
    { from: "08-04", to: "11-15" },
  ],
  water: ["sea", "estuary"],
  note:
    "In Marine Area 10 (Seattle-Bremerton), Washington's 2026-27 rules close salmon fishing from 16 November to 30 March, and give no salmon season for May, so it is closed then too. Chinook may be kept only from 23 to 25 July and, on Wednesdays to Saturdays only, from 31 March to 30 April: 1 hatchery fish of at least 22 inches within the 2-salmon limit, wild Chinook released. In East Elliott Bay and the Duwamish waterways they may also be kept from 31 July to noon on 3 August. On other open days Chinook must be released. WDFW may add Chinook days in season.",
  regulator: "Washington Department of Fish and Wildlife (Marine Area 10)",
  source: WA_MA10,
  checked: CHECKED,
},
// source: same page — Lingcod: "May 1-June 15" "Hook and line season. Min. size 26”. Max. size 36”. Daily limit 1."; "May 21-June 15"
//   "Spearfishing season. Max. size 36”. Daily limit 1." Bottomfish year-round, 15 a day, no fishing deeper than 120 feet, descending device
//   required on vessels; rockfish "Closed"; cabezon May 1-Nov. 30, 18" minimum, 1 a day; halibut 1 a day, 6 a year, season announced by WDFW.
//   Closed waters: between Chittenden Locks and the Burlington-Northern railroad bridge; within 100 yards of the Elliott Bay Public Fishing Pier
//   to food fish and shellfish.
{
  id: "us-wa-ma10-seattle-lingcod",
  countryCode: "US",
  admin1: ["WA", "Washington"],
  near: { ...SEATTLE, km: 9 },
  species: ["lingcod"],
  closed: [{ from: "06-16", to: "04-30" }],
  water: ["sea", "estuary"],
  note:
    "Washington's 2026-27 rules open lingcod in Marine Area 10 (Seattle-Bremerton) from 1 May to 15 June by hook and line (1 a day, 26 to 36 inches) and from 21 May to 15 June by spear (1 a day, up to 36 inches). Bottomfish may be fished all year, 15 a day in all, but not in water deeper than 120 feet, and boats must carry a descending device. Rockfish are closed, cabezon are open 1 May to 30 November (1 a day, at least 18 inches), and halibut (1 a day, 6 a year) open on dates WDFW announces. Fishing is closed between the Chittenden Locks and the railroad bridge below them, and within 100 yards of the Elliott Bay Public Fishing Pier for food fish and shellfish.",
  regulator: "Washington Department of Fish and Wildlife (Marine Area 10)",
  source: WA_MA10,
  checked: CHECKED,
},
// source: WDFW (eRegulations), Westside Lakes Special Rules Q-Z ("Last Updated: October 5, 2026"), read 14 November 2026 — "Washington, Lake (King
//   Co.)" (north and south of the Hwy. 520 bridge): kokanee "Year-round", 8 to 18 inches, 5 a day; trout "Mar. 1-June 30" (12" minimum, 5 a day,
//   "Release rainbow trout over 20"."), "July 1-Nov. 30" and "Dec. 1-Last Day of Feb." statewide limits; smallmouth bass, largemouth bass,
//   channel catfish, walleye and "Other game fish" "Year-round"; salmon (north of 520 only) "Sept. 11-Oct. 31", "Daily limit 4. Release all
//   salmon other than coho."; hatchery steelhead "Dec. 1-June 30" "Release steelhead". "Washington Ship Canal, Lake (King Co.)": west of a line 400
//   feet east of the locks' northern wing wall "CLOSED WATERS"; east of it to the Montlake bridge the same year-round lines as Lake Washington.
// source: WDFW (eRegulations), Westside Lakes Special Rules A-E and F-P (both "Last Updated: October 5, 2026"): unlisted lakes, ponds and reservoirs
//   "offer year-round fishing opportunities and are regulated under the Statewide Freshwater Rules", except seasonal waters listed in the lake rules,
//   tribal reservation lands, national parks and military installations. No lake within the circle other than Lake Washington and the Ship Canal is
//   listed (Green Lake, Haller Lake and Bitter Lake are not). Cottage Lake (4th Saturday in April to Oct. 31) and Lake Sammamish (kokanee
//   catch-and-release) are 20 km and more away.
// source: WDFW (eRegulations), Statewide Freshwater Rules ("Last Updated: June 18, 2026"): lakes, ponds and reservoirs "open to fishing for game fish
//   (except Dolly Varden/bull trout and grass carp) year-round". https://www.eregulations.com/washington/fishing/statewide-freshwater-regulations
{
  id: "us-wa-seattle-lakes-open",
  countryCode: "US",
  admin1: ["WA", "Washington"],
  near: { ...SEATTLE, km: 9 },
  species: ["rainbow-trout", "kokanee", "smallmouth-bass", "largemouth-bass", "channel-catfish", "walleye"],
  closed: [],
  water: ["lakes"],
  note:
    "Washington's rules open Lake Washington and the Lake Washington Ship Canal all year for these fish, and every lake they do not list (Green Lake and Haller Lake among them) all year for game fish under the statewide rules. In Lake Washington and the Ship Canal, from 1 March to 30 June trout must be at least 12 inches (5 a day) and rainbows over 20 inches released; kokanee are 8 to 18 inches, 5 a day; smallmouth bass 15 a day with only 1 over 14 inches; largemouth bass 10 a day, none over 12 inches except 1 over 17; channel catfish 10 a day; walleye 16 a day with only 1 over 22 inches. Steelhead must be released from 1 December to 30 June. The Ship Canal just above the Chittenden Locks is closed to all fishing.",
  regulator: "Washington Department of Fish and Wildlife",
  source: "https://www.eregulations.com/washington/fishing/westside-lakes-special-rules-q-z",
  checked: CHECKED,
},
// source: Statewide Freshwater Rules (as above): rivers, streams and beaver ponds "open the Saturday before Memorial Day through October 31" (23 May in
//   2026) unless listed; "All freshwater areas are closed to fishing for salmon, Dolly Varden/bull trout, lamprey, and grass carp" outside the Special
//   Rules; "Green Sturgeon may not be retained."; white sturgeon catch-and-release in open seasons; "Night closure in effect for all sturgeon."
// source: WDFW emergency rule "Green (Duwamish) River Chinook retention closed" (August 17, 2026): "Closes Chinook salmon retention." "Aug. 20, 2026,
//   until further notice." "Green (Duwamish) River from Tukwila International Boulevard/Old Highway 99 to the South 212th Street Bridge."
//   https://wdfw.wa.gov/fishing/regulations/emergency-rules/green-duwamish-river-chinook-retention-closed-2026-08
// source: WDFW, Rule changes 2026 (no date shown): "Lake Washington recreational salmon" WSR 26-19-061 (filed September 15, 2026) and WSR 26-19-092
//   (filed September 18, 2026), not opened. https://wdfw.wa.gov/about/regulations/rule-changes/2026
// source: WDFW (eRegulations), Puget Sound & Coastal Rivers Special Rules D-K ("Last Updated: October 5, 2026"), read 14 November 2026 — "Green
//   (Duwamish) River - King Co.": from Harbor Island to Tukwila International Blvd./Old Hwy. 99, salmon "Aug. 20-Dec. 31", "Daily limit 6 including
//   no more than 3 of any combination of adult coho and chum. Release Chinook."; from Tukwila International Blvd. to the South 212th St. Bridge,
//   salmon Aug. 20-Dec. 31 with Chinook kept (now closed by the emergency rule above); upstream reaches open later (16 September, 1 November) and
//   lie beyond the circle. Pages A-C and S-Z (same date): the Cedar River, Sammamish River and the other King County entries have no salmon line.
// The audit of 10 November 2026 (checkers of 14 November) found Seattle's river cards calling chinook and coho in season in October. Within 20 km
//   the only river the special rules open to salmon is the Green (Duwamish), from 20 August to 31 December, so salmon are closed on every river here
//   from 1 January to 19 August; from 20 August Chinook must be released on the Duwamish (by rule below Tukwila, by the emergency rule above it).
//   Every other stream here stays closed to salmon all year, said in the notes.
{
  id: "us-wa-seattle-rivers-chinook",
  countryCode: "US",
  admin1: ["WA", "Washington"],
  near: { ...SEATTLE, km: 20 },
  species: ["chinook-salmon"],
  closed: [{ from: "01-01", to: "08-19" }],
  noKeep: [{ from: "08-20", to: "12-31" }],
  water: ["rivers"],
  note:
    "Washington's freshwater rules close every river to salmon unless its special rules open it. Near Seattle they open only the Green (Duwamish), from 20 August to 31 December, and Chinook must be released there: below Tukwila International Boulevard by the river's own rule, and from there up to the South 212th Street bridge by an emergency rule in force since 20 August 2026. Other streams here stay closed to salmon all year.",
  regulator: "Washington Department of Fish and Wildlife",
  source: "https://www.eregulations.com/washington/fishing/puget-sound-coastal-rivers-special-rules-d-k",
  checked: CHECKED,
},
{
  id: "us-wa-seattle-rivers-coho",
  countryCode: "US",
  admin1: ["WA", "Washington"],
  near: { ...SEATTLE, km: 20 },
  species: ["coho-salmon"],
  closed: [{ from: "01-01", to: "08-19" }],
  water: ["rivers"],
  note:
    "Washington's freshwater rules close every river to salmon unless its special rules open it. Near Seattle they open only the Green (Duwamish), from 20 August to 31 December, with up to 3 adult coho and chum a day within a limit of 6 salmon; other streams here stay closed to salmon all year.",
  regulator: "Washington Department of Fish and Wildlife",
  source: "https://www.eregulations.com/washington/fishing/puget-sound-coastal-rivers-special-rules-d-k",
  checked: CHECKED,
},
{
  id: "us-wa-seattle-fresh-water",
  countryCode: "US",
  admin1: ["WA", "Washington"],
  near: { ...SEATTLE, km: 20 },
  species: [],
  closed: [],
  water: ["rivers", "lakes"],
  note:
    "Under Washington's statewide freshwater rules, rivers and streams that the rules do not list are open from the Saturday before Memorial Day (23 May in 2026) to 31 October; listed rivers such as the Green (Duwamish) have their own seasons. Fresh water is closed to salmon fishing except where the special rules open it: the Green (Duwamish) from 20 August to 31 December, and Lake Washington north of the 520 bridge was open for coho only from 11 September to 31 October, adjusted by emergency rules in September 2026. Since 20 August 2026 Chinook may not be kept on the Green (Duwamish) from Tukwila International Boulevard up to the South 212th Street bridge, until further notice. White sturgeon are catch-and-release only and green sturgeon may not be kept.",
  regulator: "Washington Department of Fish and Wildlife",
  source: "https://www.eregulations.com/washington/fishing/statewide-freshwater-regulations",
  checked: CHECKED,
},

// ======================= United States: Oregon (Portland) ===========================================================
// Notes only: the 2026 Oregon Sport Fishing Regulations are the rules for 2026, and the 2027 rules were not read, so no open-all-year or closed row
//   is loaded (an undated row would go on printing in 2027; see the Tucson row in deserts.ts).
// source: ODFW, 2026 Oregon Fishing Regulations (eRegulations), Willamette Zone, "Last Updated: January 6, 2026", read 14 November 2026 — zone: "all
//   waters draining to the Columbia River between the city of St. Helens and Bonneville Dam", with Sauvie Island; trout: lakes open all year,
//   streams May 22 to Oct 31, stream trout catch-and-release unless excepted; salmon and steelhead: "Closed in all waters unless noted under
//   Exceptions."; "In the aggregate: 2 adult salmon or steelhead per day, 20 per year."; wild salmon or steelhead harvest prohibited unless excepted;
//   bass: lakes all year, "mainstem Willamette River, sloughs, and tidewater areas of Columbia River tributaries below Bonneville Dam" open all year;
//   warmwater: no limit; sturgeon: "Catch-and-release: Open all year, except as noted under Exceptions." Willamette River, mouth to Willamette Falls
//   (including Multnomah Channel): "Open all year for hatchery salmon and hatchery steelhead."; "Catch-and-release for sturgeon."; "Sturgeon angling is
//   prohibited from the Lake Oswego-Oak Grove RR bridge up to Willamette Falls May 1 - Aug 31."; Oregon City Wall Bank and Willamette Falls closure
//   areas. Clackamas River, mouth to River Mill Dam: "5 hatchery trout per day"; "Open all year for hatchery salmon and hatchery steelhead."; 3 a day.
//   https://www.eregulations.com/oregon/fishing/willamette-zone
// Re-read 14 November 2026: the zone page also says "There is no annual limit on hatchery salmon or hatchery steelhead as long as the appropriate
//   number of Hatchery Harvest Tags have been purchased to record the catch." The audit of 10 November 2026 (checkers of 14 November) found the note
//   giving "20 a year" with no word of this; the note now says it.
// Still a note, not rows (audit of 10 November 2026, checkers of 14 November, asked for Columbia rows): Portland's river cards cover the Willamette
//   and the Columbia together, and the Willamette from its mouth to the falls is "Open all year for hatchery salmon and hatchery steelhead", while
//   the Columbia from Warrior Rock to Bonneville closes salmon 16-30 September and releases every Chinook from 1 October to 31 December 2026. A row
//   for the town's rivers would print the Columbia's dates on the Willamette, so the cards keep the library's months for chinook and coho. (The rows
//   would also need a year bound: ClosedSeason has none; see the A1 report.)
{
  id: "us-or-portland-willamette-zone",
  countryCode: "US",
  admin1: ["OR", "Oregon"],
  near: { ...PORTLAND, km: 20 },
  species: [],
  closed: [],
  water: ["rivers", "lakes"],
  note:
    "Oregon's 2026 regulations for the Willamette Zone, which takes in Portland, open lakes to trout all year and streams from 22 May to 31 October, where trout must be released unless a water is listed as an exception. Salmon and steelhead are closed except where listed, and wild fish may not be kept. The Willamette from its mouth (with Multnomah Channel) up to Willamette Falls, and the Clackamas up to River Mill Dam, are open all year for hatchery salmon and hatchery steelhead: 2 adults a day in the zone (3 a day on the Clackamas) and 20 a year, but there is no annual limit on hatchery fish for anglers who buy enough Hatchery Harvest Tags to record them. Bass are open all year in lakes, the main Willamette, sloughs and the tidewater of Columbia tributaries, and other warmwater fish have no limit. Sturgeon are catch-and-release only, and angling for them is banned from the Lake Oswego-Oak Grove railroad bridge up to Willamette Falls from 1 May to 31 August. The 2027 rules are not loaded.",
  regulator: "Oregon Department of Fish and Wildlife (Willamette Zone)",
  source: "https://www.eregulations.com/oregon/fishing/willamette-zone",
  checked: CHECKED,
},
// source: ODFW, 2026 Oregon Fishing Regulations (eRegulations), Columbia River Zone, "Last Updated: January 6, 2026", read 14 November 2026 — white
//   sturgeon "Closed to retention"; catch-and-release open all year unless excepted (the Bonneville spawning sanctuary, May 1 - Aug 31, is about 60 km
//   away); hatchery steelhead: Rocky Point-Tongue Point to I-5 bridge Jan 1 - Mar 31 and Nov 1 - Dec 31; I-5 bridge to Bonneville Jan 1 - Mar 31,
//   Jun 16 - Jul 31, Nov 1 - Dec 31; "Harvest of wild steelhead is not permitted in the Columbia River Zone."; "Closed for sockeye and chum salmon.";
//   shad open all year "except closed from Buoy 10 line upstream to Bonneville Dam Apr 1 - May 15"; bass, walleye, catfish, crappie, perch and other
//   warmwater fish open all year with no limit; trout closed unless excepted; "Both Washington and Oregon resident or non-resident fishing licenses are
//   valid" where the river is the state line, except when the other state's season is closed; "A valid Columbia River Basin Endorsement must be in
//   possession when fishing for salmon, steelhead, or sturgeon". https://eregulations.com/oregon/fishing/columbia-river-zone
// source: ODFW, "preseason 2026 mainstem Columbia River summer/fall salmon and steelhead recreational fishery regulations" (June 2, 2026), "Warrior
//   Rock/Bachelor Island upstream to Bonneville Dam", re-read 14 November 2026: August 1 - September 11 Chinook and hatchery coho, 2 adults, 1 Chinook;
//   September 12-15 Chinook and coho; "September 16–30" "Salmon/steelhead angling prohibited"; October 1-15 coho kept, "all Chinook must be
//   released"; October 16-31 hatchery coho, Chinook released; "November 1 – December 31" hatchery coho and hatchery steelhead, "all Chinook must be
//   released", 2 a day; steelhead released August 1 - October 31. https://www.dfw.state.or.us/fish/OSCRP/CRM/docs/2026/2026%20Columbia%20River%20summer-fall%20regulations.pdf
// source: ODFW Columbia River action notices list (read 14 November 2026): the 13 November 2026 joint state notice closes steelhead from The Dalles Dam
//   up to the state line, 1 January to 31 March 2027, far upstream of Portland; no later notice covers the Portland reach.
//   https://www.dfw.state.or.us/fish/OSCRP/CRM/action_notes.asp
{
  id: "us-or-portland-columbia",
  countryCode: "US",
  admin1: ["OR", "Oregon"],
  near: { ...PORTLAND, km: 20 },
  species: [],
  closed: [],
  water: ["rivers"],
  note:
    "Oregon and Washington manage the Columbia jointly. ODFW's 2026 rules for the reach from Warrior Rock up to Bonneville Dam closed salmon and steelhead angling from 16 to 30 September 2026, and from 1 October to 31 December 2026 every Chinook must be released; coho may be kept (hatchery coho only from 16 October), and from 1 November to 31 December hatchery coho and hatchery steelhead, 2 a day. These are not loaded as dates because the town's rivers include the Willamette, which is open all year for hatchery salmon. Under the permanent rules hatchery steelhead are open there from 1 January to 31 March and 1 November to 31 December (and above the I-5 bridge also 16 June to 31 July); wild steelhead may never be kept, and sockeye and chum are closed. White sturgeon may not be kept but may be fished catch-and-release all year. Shad are closed from 1 April to 15 May, and bass, walleye, catfish, crappie and perch are open all year with no limit. Either state's licence is valid on the river itself, and salmon, steelhead or sturgeon anglers need a Columbia River Basin Endorsement. The 2027 seasons are not loaded.",
  regulator: "Oregon Department of Fish and Wildlife (Columbia River Zone)",
  source: "https://eregulations.com/oregon/fishing/columbia-river-zone",
  checked: CHECKED,
},
];

// ============================================================================================================
// LAND: who says whether you may pick, read on the owner's own page (14 November 2026).
// Washington state parks are covered statewide by "washington-state-parks" in western-mountains.ts (WAC 352-28-030, re-read here
//   14 November 2026: two gallons per person per day, not in natural area preserves), so no second row is added.
// Seattle city parks: not loaded. The Parks Code (SMC 18.12) could not be read: clerk.seattle.gov returned a human-verification page and the
//   Parks rules page refused the fetch (robots), twice each — UNREADABLE.
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
const inBC = (p: LandPlace) => p.countryCode === "CA" && (p.admin1Code === "BC" || p.admin1 === "British Columbia");
const inState = (p: LandPlace, code: string, name: string) => p.countryCode === "US" && (p.admin1Code === code || p.admin1 === name);

export const LAND: LandRule[] = [
// BC Parks, "Responsible recreation" (no date on the page), read 14 November 2026: "Removing anything from a BC Park is usually illegal."; "Only First
//   Nations and special permit holders have permission to harvest or gather certain items."; "Do not remove mushrooms, berries, flowers, fossils, wood,
//   shells, or cultural artifacts."
{
  id: "bc-parks-pacific",
  applies: (p) => inBC(p) && [NANAIMO, VANCOUVER, VICTORIA].some((c) => within(p, c, 50)),
  title: "BC provincial parks",
  rule: "BC Parks says removing anything from a BC park is usually illegal, and asks visitors not to remove mushrooms, berries, flowers, fossils, wood, shells or cultural artifacts. It says only First Nations and special-permit holders may harvest or gather certain items.",
  source: { label: "BC Parks: Responsible recreation", url: "https://bcparks.ca/plan-your-trip/visit-responsibly/responsible-recreation" },
  checked: CHECKED,
},
// Metro Vancouver Regional District, Regional Parks Regulation Bylaw No. 1420, 2025 (unofficial consolidation including Bylaw 1426 of 28 November 2025
//   and Bylaw 1466 of 24 July 2026, effective 1 January 2027), read 14 November 2026: s. 32(a) no person shall "cut, trim, dig up, excavate, rake,
//   deface, remove, damage, log or prune any natural park features"; s. 32(h) no harvesting or possessing a natural park feature; s. 4 "natural park
//   feature" includes "any tree, shrub, herb, flower, grass, turf, or other similar vegetation", with fungi, soil, rock and wood. Park permits (s. 63).
{
  id: "metro-vancouver-regional-parks",
  applies: (p) => inBC(p) && within(p, VANCOUVER, 35),
  title: "Metro Vancouver regional parks",
  rule: "Metro Vancouver's Regional Parks Regulation Bylaw (No. 1420, 2025) forbids cutting, digging up, raking, removing or damaging any natural park feature, and forbids harvesting or possessing one. Natural park features include trees, shrubs, herbs, flowers and other plants, and fungi. The bylaw names no exception for berries, mushrooms or personal use; the parks director may issue permits.",
  source: { label: "Metro Vancouver: Regional Parks Regulation Bylaw No. 1420, 2025 (consolidated), ss. 4 and 32", url: "https://metrovancouver.org/boards/Bylaws/MVRD_Bylaw_1420_Consolidated_2.pdf" },
  checked: CHECKED,
},
// Capital Regional District, Parks Regulation Bylaw No. 1, 2018 (Bylaw 4225, consolidated with Bylaw 4431, June 2023, "for reference only"),
//   read 14 November 2026: s. 7(1)(a), unless authorized in writing by the CRD or under a park use permit, no person may "cut, trim, dig up,
//   excavate, deface, remove, damage, or in any way injure any natural park feature"; "natural park feature" means "a tree, shrub, herb, flower,
//   grass, turf, or other plant or fungus" and soil, rock, wood and other park resources. No exception for edible berries or mushrooms.
//   https://www.crd.ca/node/5705 links the PDF.
{
  id: "crd-regional-parks",
  applies: (p) => inBC(p) && within(p, VICTORIA, 30),
  title: "Capital Regional District regional parks",
  rule: "The Capital Regional District's Parks Regulation Bylaw (No. 4225) forbids cutting, digging up, removing or damaging any natural park feature, which it defines to include any tree, shrub, herb, flower, grass or other plant or fungus, unless the CRD authorizes it in writing or a park use permit allows it. It names no exception for berries or mushrooms. The CRD's copy is a consolidation for reference (June 2023).",
  source: { label: "CRD: Parks Regulation Bylaw No. 1, 2018 (Bylaw 4225, consolidated), s. 7(1)(a)", url: "https://www.crd.ca/media/file/bylawno4225consolidatedjune2023" },
  checked: CHECKED,
},
// USFS, Mt. Baker-Snoqualmie National Forest, Special Forest Products ("Last updated April 17, 2026"), read 14 November 2026: under "Free Use - Personal-
//   Permits", wild berries 5 gallons a year and mushrooms 5 gallons a year per household; "Prohibited inside the Legislated Wilderness, Research Natural
//   Areas, Experimental Forests"; charge-use mushroom permits from 12.5 gallons for $25. Its linked "Wild Berries" sheet (no date): "A person may pick up
//   to five gallons of berries for personal use per household per year with a Free Use permit."; "These berries may not be sold or bartered."; its
//   "Mushrooms" sheet: "it is not legal to remove products collected from the forest without a permit"; knife or scissors only.
//   https://www.fs.usda.gov/media/156818 ; https://www.fs.usda.gov/media/156738
{
  id: "mt-baker-snoqualmie-national-forest",
  applies: (p) => inState(p, "WA", "Washington") && within(p, SEATTLE, 90),
  title: "Mt. Baker-Snoqualmie National Forest (U.S. Forest Service)",
  rule: "The Mt. Baker-Snoqualmie National Forest says berries or mushrooms may be eaten in the woods without a permit, but taking them out of the forest needs one. A free-use permit allows up to 5 gallons of berries and 5 gallons of mushrooms per household a year; more mushrooms need a paid permit. Berries picked under a free-use permit may not be sold or bartered, mushrooms must be cut with a knife or scissors, and picking is not allowed in wilderness, research natural areas, experimental forests or other closed areas.",
  source: { label: "U.S. Forest Service: Mt. Baker-Snoqualmie NF, special forest products", url: "https://www.fs.usda.gov/r06/mbs/permits/special-forest-products" },
  checked: CHECKED,
},
// USFS, Mt. Hood National Forest, Mushrooms ("Last updated February 2, 2026"), read 14 November 2026: incidental use "without a permit", 1 gallon per
//   person per day, 10 gallons a year; "All mushroom picking is prohibited within:" research areas, wilderness, developed recreation areas, riparian
//   areas and other non-harvest areas; incidental-use mushrooms "cannot be sold, bartered, or exchanged". Berries ("Last updated April 23, 2025"): "up to
//   3 gallons of berries per year under our incidental use guidelines – for no cost and no permit required"; "Commercial berry permits are not offered
//   on Mt. Hood National Forest." https://www.fs.usda.gov/r06/mthood/forest-products/berries
{
  id: "mt-hood-national-forest",
  applies: (p) => inState(p, "OR", "Oregon") && within(p, PORTLAND, 90),
  title: "Mt. Hood National Forest (U.S. Forest Service)",
  rule: "The Mt. Hood National Forest allows mushrooms to be picked for personal use without a permit, up to 1 gallon per person a day and 10 gallons a year, but not in research areas, wilderness, developed recreation sites, along rivers and streams or in other areas closed to harvest; they may not be sold or bartered. Up to 3 gallons of berries a year may be picked for free without a permit; more than that is not allowed, no commercial berry permits are offered, and berries from the forest may not be sold.",
  source: { label: "U.S. Forest Service: Mt. Hood NF, mushrooms", url: "https://www.fs.usda.gov/r06/mthood/forest-products/mushrooms" },
  checked: CHECKED,
},
// Oregon Parks and Recreation Department, permanent rule filing, Chapter 736 (agency approved 02/25/2025, "EFFECTIVE DATE: 03/12/2025"), "AMEND:
//   736-010-0055" Park Resources, read 14 November 2026: (6) "Unless otherwise posted a person may gather for personal consumption berries, fruits,
//   mushrooms, or similar edibles" "in quantities not to exceed one gallon per person per day."; (3) "A visitor may only conduct the following activities
//   with the written permission of a designated park employee" ... (c) "Pick, cut, mutilate, trim, uproot, or remove any living or downed trees and
//   vegetation;"; (7) no uprooting living plants or collecting "roots, tubers, flowers, and stems" without written permission; (8) members of a federally
//   recognized Oregon tribe may, for traditional practices. (oregon.public.law still shows the older "five gallons" text; the filing replaces it.)
{
  id: "oregon-state-parks",
  applies: (p) => inState(p, "OR", "Oregon") && within(p, PORTLAND, 90),
  title: "Oregon state parks",
  rule: "Oregon's state park rule (OAR 736-010-0055, as amended in March 2025) lets visitors gather berries, fruits, mushrooms and similar edibles for personal consumption, up to one gallon per person a day, unless a park posts otherwise. Picking, cutting or uprooting other vegetation, or collecting roots, tubers, flowers or stems, needs written permission from park staff, except for members of a federally recognized Oregon tribe in traditional practices.",
  source: { label: "Oregon Parks and Recreation Department: rule filing amending OAR 736-010-0055 (effective 12 March 2025)", url: "https://www.oregon.gov/oprd/PRP/Documents/Final%20Approved%20Rule%20Filing%20with%20Secretary%20of%20State.03.11.2025.pdf" },
  checked: CHECKED,
},
// Portland City Code 20.12.100, Vandalism; Protection of Park Property and Vegetation (chapter last changed by Ordinance 191311, effective July 7, 2023),
//   read 14 November 2026: "Except as authorized:" C.3 "Remove, cut, carve, prune, injure, or destroy any tree, shrub, plant, flower, or other
//   vegetation."
{
  id: "portland-parks",
  applies: (p) => inState(p, "OR", "Oregon") && within(p, PORTLAND, 20),
  title: "City of Portland parks",
  rule: "Portland's parks code (City Code 20.12.100) says that, unless authorized, no one may remove, cut, prune, injure or destroy any tree, shrub, plant, flower or other vegetation in a park. It does not mention fruit, berries or mushrooms by name.",
  source: { label: "City of Portland: City Code 20.12.100", url: "https://www.portland.gov/code/20/12" },
  checked: CHECKED,
},
];
