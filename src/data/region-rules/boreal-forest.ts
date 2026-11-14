/**
 * Rules read from the regulator's own pages for the ecoregion "Boreal Forest & Shield" (boreal-forest).
 *
 * CLOSED: closed-season rows (same shape and standard as src/data/closed-seasons.ts: a regulator, the page it
 * was read from, the date it was read, dates written as the regulator gives them).
 * LAND: where-you-may-pick rules (same shape and standard as src/data/land-rules.ts: the regulator's wording,
 * kept inside the source, with the page and the date it was read).
 *
 * Nothing here is inferred. A row exists only where the page was opened and read.
 *
 * The region's ten towns: Fort McMurray (Alberta); Timmins, Thunder Bay and Greater Sudbury (Ontario); Val-d'Or,
 * Saguenay and Quebec (Quebec); Prince George (British Columbia); International Falls and Duluth (Minnesota).
 * Each row is scoped to a circle around its town(s), because the data model cannot name a single water.
 * Read 2 November 2026 unless a row says otherwise. Movable dates are written for 2026 and the note says so.
 */
import type { ClosedSeason } from "../closed-seasons";
import type { LandPlace, LandRule } from "../land-rules";

const CHECKED = "2026-11-02";

// ================================================================================================================
// CLOSED SEASONS
// ================================================================================================================

const ONTARIO = ["ON", "Ontario"];
const ON_SUMMARY = "https://www.ontario.ca/document/ontario-fishing-regulations-summary/";
// source: Ontario summary, Recreational fishing licences and fees (updated 4 August 2026): "Most people require a recreational fishing licence or deemed
//   licence to legally fish in Ontario"; Sport licence "full catch and possession fishing privileges"; Conservation licence "a reduced catch and possession
//   limit". Ontario summary, General fishing regulations (updated 4 August 2026): "It is illegal to attempt to catch fish for which the season is closed,
//   even if you are going to release them."
const ON_LICENCE = " In Ontario most people need a recreational fishing licence, and the summary says it is illegal to try to catch a fish whose season is closed, even to release it.";

const TIMMINS = { lat: 48.4775, lon: -81.3304, km: 25 };
const THUNDER_BAY = { lat: 48.4064, lon: -89.2598, km: 25 };
const SUDBURY = { lat: 46.4927, lon: -80.9912, km: 25 };

// ---- Canada: Ontario, FMZ 8 (Timmins) -------------------------------------------------------------------------
// source: Ontario Fishing Regulations Summary, Fisheries Management Zone 8 (zone page; the summary's general pages updated 4 August 2026):
//   the page names Timmins among the cities of the zone; walleye and sauger "January 1 to April 14 and third Saturday in May to
//   December 31"; lake trout "February 15 to March 15 and third Saturday in May to September 30"; brook trout "January 1 to
//   September 15"; northern pike, bass, rainbow trout, yellow perch and lake whitefish open all year; "The following species are not
//   present in this Zone and are closed to fishing all year": Atlantic salmon, brown trout, channel catfish, crappie, muskellunge,
//   Pacific salmon.
// source: Sport fishing variation order SF-2026/8 (in force 1 January 2026, page updated 16 January 2026) writes the same dates as
//   close times: walleye and sauger "April 15 to the Friday before the 3rd Saturday in May"; lake trout "January 1 to February 14
//   and March 16 to the Friday before the 3rd Saturday in May and October 1 to December 31"; brook trout "September 16 to December 31";
//   northern pike, bass, rainbow trout and "any other species": "No close time". 2026 calendar: third Saturday in May is 16 May.
//   https://www.ontario.ca/page/sport-fishing-variation-order-fisheries-management-zone-8
// source: Ontario summary, General fishing regulations — species that are not listed (rock bass is the page's example) have a
//   year-round open season unless stated otherwise.
const FMZ8_SRC = ON_SUMMARY + "fisheries-management-zone-8";
const FMZ8_REG = "Ontario MNRF (FMZ 8)";
const FMZ8_TAIL = " This is the zone-wide rule for FMZ 8 (Timmins); the zone page lists named waters with their own rules.";

// ---- Canada: Ontario, FMZ 6 and FMZ 9 (Thunder Bay) -----------------------------------------------------------
// source: Ontario Fishing Regulations Summary, FMZ 6 (the page's caption names Thunder Bay among the cities of the zone) and FMZ 9
//   ("Lake Superior excluding most of the tributaries and the islands of St. Ignace, Simpson and Michipicoten"). Tributaries to
//   Lake Superior, the Kaministiquia, Current and McIntyre rivers and the inland lakes are zone 6; the lake itself is zone 9.
//   Both pages give the same seasons for the fish below: walleye and sauger "January 1 to April 14 and third Saturday in May to
//   December 31"; lake trout "January 1 to September 30"; brook trout "fourth Saturday in April to Labour Day"; northern pike, bass,
//   rainbow trout, yellow perch, lake whitefish, crappie and Pacific salmon "open all year"; lake sturgeon "closed all year".
// source: Sport fishing variation orders SF-2026/6 and SF-2026/9 (in force 1 January 2026, pages updated 16 January and 2 January 2026):
//   walleye and sauger "April 15 to the Friday before the 3rd Saturday in May"; lake trout "October 1 to December 31"; brook trout
//   "January 1 to the Friday before the 4th Saturday in April and the day after Labour Day to December 31"; northern pike, bass,
//   rainbow trout and "any other species": "No close time". The FMZ 6 order's Schedule B has no exception for the Kaministiquia,
//   Current, McIntyre or Neebing rivers' seasons ("No change"). 2026 calendar: third Saturday in May 16 May, fourth Saturday in April
//   25 April, Labour Day 7 September.
//   https://www.ontario.ca/page/sport-fishing-variation-order-fisheries-management-zone-6
//   https://www.ontario.ca/page/sport-fishing-variation-order-fisheries-management-zone-9
// source: FMZ 6 page — the McIntyre River "from the footbridge to the dam on the University property in the City of Thunder Bay" is
//   a fish sanctuary, closed all year.
const FMZ6_SRC = ON_SUMMARY + "fisheries-management-zone-6";
const FMZ6_REG = "Ontario MNRF (FMZ 6 and 9)";
const FMZ6_TAIL = " This is the rule for FMZ 6 (Thunder Bay and its rivers and inland lakes) and for FMZ 9 (Lake Superior), which gives the same dates; named waters have their own rules.";

// ---- Canada: Ontario, FMZ 10 (Greater Sudbury) ----------------------------------------------------------------
// source: Ontario Fishing Regulations Summary, FMZ 10 (updated 4 August 2026): the zone includes "the cities of Wawa, Sault Ste. Marie,
//   and Sudbury"; walleye and sauger "January 1 to the third Sunday in March and third Saturday in May to December 31"; lake trout
//   "January 1 to Labour Day"; brook trout "January 1 to September 30"; muskellunge "third Saturday in June to December 15"; bass
//   "third Saturday in June to November 30" but "open year-round for largemouth and smallmouth bass" in "all waters north of Highway 17
//   and all waters west of where the east bank of the Serpent River crosses Highway 17"; northern pike, rainbow trout, brown trout, yellow
//   perch, crappie, channel catfish, lake whitefish and Pacific salmon open all year; lake sturgeon "closed all year".
// source: Sport fishing variation order SF-2025/10 (in force 1 January 2025, page updated 6 January 2025): walleye and sauger "The Monday
//   after the 3rd Sunday in March to the Friday before the 3rd Saturday in May"; lake trout "The day after Labour Day to December 31";
//   brook trout "October 1 to December 31"; muskellunge "January 1 to the Friday before the 3rd Saturday in June and December 16 to
//   December 31"; northern pike, rainbow trout and "any other species": "No close time". Schedule B names no water near Sudbury.
//   2026 calendar: third Sunday in March 15 March, third Saturday in May 16 May, third Saturday in June 20 June, Labour Day 7 September.
//   https://www.ontario.ca/page/sport-fishing-variation-order-fisheries-management-zone-10
const FMZ10_SRC = ON_SUMMARY + "fisheries-management-zone-10";
const FMZ10_REG = "Ontario MNRF (FMZ 10)";
const FMZ10_TAIL = " This is the zone-wide rule for FMZ 10 (Greater Sudbury); the zone page lists named lakes and rivers with their own rules.";

// ---- Canada: Alberta, Northern Boreal watershed unit NB4 (Fort McMurray) --------------------------------------
// source: Alberta Guide to Sportfishing Regulations 2026 (albertaregulations.ca, the guide the Government of Alberta links; regulations
//   effective 1 April 2026 to 31 March 2027), NB4 page: NB4 is "The Athabasca River watershed downstream of the north boundary of
//   Township 78 (near Pelican River)", "the Clearwater River and Christina River watersheds" and the watersheds to the north; Fort
//   McMurray stands where the Clearwater meets the Athabasca. Default regulations for lakes: "OPEN May 15 to Mar. 31", "CLOSED Apr. 1
//   to May 14" (walleye, northern pike, yellow perch, lake whitefish, burbot, trout); for streams "OPEN Jun. 1 to Oct. 31", "CLOSED Nov. 1
//   to May 31"; "If a NB4 lake, reservoir, river, stream or species is not listed, follow the default regulations."
// source: NB4 rivers table: Clearwater River mainstem and snye channel "OPEN JUNE 1 TO OCT. 31"; Hangingstone River "OPEN JUNE 16 TO OCT. 31";
//   Athabasca River mainstem north of Township 78 has its own rows (April 1 to May 31, and June 1 to March 31). NB4 lakes table: Gregoire
//   (Willow) Lake and Winefred Lake are "OPEN MAY 15 TO MAR. 31".
const AB_SRC = "https://albertaregulations.ca/fishingregs/nb4.html";
const AB_REG = "Alberta sportfishing regulations (NB4)";
const FORT_MCMURRAY = { lat: 56.7292, lon: -111.3885, km: 40 };

// ---- Canada: British Columbia, Region 7A Omineca (Prince George) ----------------------------------------------
// source: Fisheries and Oceans Canada, "Region 7 - Omineca-Peace: Recreational salmon fishing limits, openings and closures", date modified
//   2026-04-01: "There is no fishing for salmon in Region 7 until further notice." The BC synopsis for Region 7A (Omineca) puts Prince George
//   on its map. DFO's page for Region 5A (Cariboo, Fraser River watershed), dated 2026-04-01, says the same.
//   https://www.pac.dfo-mpo.gc.ca/fm-gp/rec/fresh-douce/region7-eng.html
// source: 2025-2027 BC Freshwater Fishing Regulations Synopsis, Region 7A (Omineca): "No fishing (spring closure): in any stream of Zone A,
//   Apr 1-June 30. (See tables for exceptions)"; Fraser River (7-9), Nechako River (7-12) and Stuart River (7-15) "Exempt from spring
//   closure"; single barbless hook in all streams of Zone A, all year; bait ban on all streams of Zone A, all year (exceptions in the
//   tables); "White Sturgeon: CLOSED TO ALL FISHING".
const PRINCE_GEORGE = { lat: 53.9129, lon: -122.7454, km: 40 };
const BC_7A_SRC = "https://www2.gov.bc.ca/assets/gov/sports-recreation-arts-and-culture/outdoor-recreation/fishing-and-hunting/freshwater-fishing/region_7a_omineca.pdf";

// ---- United States: Minnesota (Duluth; International Falls is explained below) --------------------------------
// source: 2026 Minnesota Fishing Regulations (Minnesota DNR, March 2026 to 28 February 2027), inland waters pp. 29-33: walleye and sauger "May 9,
//   2026 - Feb. 28, 2027"; northern pike (all three zones) "May 9, 2026 - Feb. 28, 2027"; crappie, sunfish, perch, whitefish, burbot "Continuous".
//   Lake Superior and its tributaries below posted boundaries, p. 36: lake trout "Dec. 1, 2025 - Oct. 4, 2026" and "Dec. 1, 2026 - Oct. 3, 2027";
//   walleye and northern pike "May 9, 2026 - March 1, 2027" (the table includes the St. Louis River Estuary below the Minnesota-Wisconsin
//   boundary cable); p. 34: "Angling from boats is closed October 6 - November 30" on Lake Superior from the north arm of the Duluth ship
//   canal to the mouth of Chester Creek; a Minnesota angling licence and a trout/salmon stamp validation for the Minnesota waters of Lake
//   Superior; "Unclipped steelhead (rainbow trout) must be immediately released".
// source: the same booklet, Lake Superior tributaries table, read 7 November 2026 — above posted boundaries: brook and brown trout
//   "April 11 - Sept. 30" (5 combined, only 1 over 16"), rainbow trout "April 11 - Sept. 30" catch-and-release only; below posted
//   boundaries: brook trout and splake "April 11 - Sept. 30", brown trout "Continuous", rainbow trout clipped "Continuous" and
//   unclipped "Continuous" catch-and-release only, salmon (Chinook, coho, pink and Atlantic) "Continuous".
// International Falls has no closed-season row, deliberately. Its waters (the Rainy River and Rainy Lake) are Minnesota-Canada boundary waters under
//   Minn. R. 6266.0700 (published 30 July 2026 by the Revisor of Statutes), whose seasons differ from the statewide inland table the town's creeks
//   follow: walleye and sauger "Saturday two weeks prior to the Saturday of Memorial Day weekend to April 14" (9 May in 2026) against the inland "May 9,
//   2026 - Feb. 28, 2027"; northern pike "Continuous" against inland 9 May to 28 February; muskellunge "Third Saturday in June through November 30"
//   against inland 6 June to 30 November; bass, crappie and other species "No closed season". A row scoped to the town cannot name one water, so any
//   closed range would be wrong for one of the two sets of waters. See the report.
// Re-read 14 November 2026 (the audit of 10 November, checkers of 14 November, found the page saying no Minnesota rules were loaded): Minn. R.
//   6266.0700 ("Published Electronically: July 30, 2026") — Rainy Lake and the upper Rainy River: walleye and sauger "Saturday two weeks prior to
//   the Saturday of Memorial Day weekend to April 14" (8 in all, not more than 4 walleye); Rat Root River and Rat Root Lake walleye to "the last
//   Sunday in February"; sturgeon "June 16 to April 14 for catch and release only. Closed April 15 to June 15."; muskellunge "Third Saturday in
//   June through November 30" (1, 50 inches); bass "No closed season" (6); crappie "No closed season" (10); "Perch, sunfish, and other species"
//   "No closed season"; possession limited to Minnesota's limit. 2026 Minnesota Fishing Regulations ("Effective March 2026 through February 28,
//   2027"), inland: crappie, sunfish and perch "Continuous". The boundary waters and the inland creeks agree only on crappie, sunfish and perch, which
//   are open all year in both: that is a row; the rest is a note. https://www.revisor.mn.gov/rules/6266.0700/
// ---- Canada: Quebec, fishing zone 13 (Val-d'Or); sources by its rows ------------------------------------------
const VAL_D_OR = { lat: 48.1023, lon: -77.7876, km: 15 };
const QC13_SRC = "https://peche.faune.gouv.qc.ca/RegPec/en/Info/Reglements?id_zone=13";
const QC13_REG = "Québec government (fishing zone 13)";
const QC_TAIL = " Named exception waters have their own rules (none is at the town); check the zone's grid for the water you fish. In Quebec a fishing licence is mandatory (with some exceptions).";

const MN = ["MN", "Minnesota"];
const MN_BORDER_SRC = "https://www.revisor.mn.gov/rules/6266.0700/";
const MN_SRC = "https://files.dnr.state.mn.us/rlp/regulations/fishing/fishing_regs.pdf";
const DULUTH = { lat: 46.7838, lon: -92.1053, km: 25 };
const INTERNATIONAL_FALLS = { lat: 48.601, lon: -93.4106, km: 30 };

export const CLOSED: ClosedSeason[] = [
  // ---- Quebec: Quebec City (fishing zone 27) ------------------------------------------------------------------
  // source: Gouvernement du Québec, sport fishing rules, zone 27, periods and limits for 2026, read 9 November 2026,
  //   https://peche.faune.gouv.qc.ca/RegPec/en/Info/Reglements?id_zone=31 — char (brook trout), rainbow trout and landlocked salmon
  //   "From April 23rd, 2026 to September 15th, 2026"; lake trout and splake "From July 1st, 2026 to September 15th, 2026"; yellow
  //   perch and "Other species" "From April 23rd, 2026 to November 30th, 2026"; pike, walleye and sauger "From May 15th, 2026 to
  //   November 30th, 2026"; bass and muskellunge "From June 15th, 2026 to November 30th, 2026". Its regulatory exceptions include
  //   the waters of Bassin Louise and the Montmorency below the falls. The zone 27 rules page (quebec.ca, updated 15 October 2026)
  //   names Bassin Louise and the Montmorency; the zone's printable map labels Québec. The zone-wide periods are not loaded as
  //   closed seasons, as for Montreal: the page lists exception waters whose own rules differ.
  {
    id: "ca-qc-z27-quebec-city-notes",
    countryCode: "CA",
    admin1: ["QC", "Quebec", "Québec"],
    near: { lat: 46.8137, lon: -71.2084, km: 25 },
    species: [],
    closed: [],
    water: ["rivers", "lakes"],
    note:
      "Quebec City is in fishing zone 27. For 2026 the zone's general periods are brook trout, rainbow trout and landlocked salmon 23 April to 15 September, lake trout 1 July to 15 September, pike, walleye and sauger 15 May to 30 November, bass and muskellunge 15 June to 30 November, and yellow perch and other species 23 April to 30 November. The zone lists exception waters with their own rules, among them Bassin Louise and the Montmorency below the falls, so check the zone's grid for the water you fish. In Quebec a fishing licence is mandatory (with some exceptions); carry it with government-issued photo ID.",
    regulator: "Québec government (fishing zone 27)",
    source: "https://peche.faune.gouv.qc.ca/RegPec/en/Info/Reglements?id_zone=31",
    checked: "2026-11-09",
  },

  // ---- Quebec: Val-d'Or (fishing zone 13) ---------------------------------------------------------------------
  // The audit of 10 November 2026 (checkers of 14 November) found no zone 13 row and the page showing walleye "Year-round".
  // source: Gouvernement du Québec, sport fishing rules, "Zone 13 east" (id_zone=13) and "Zone 13 west" (id_zone=14), periods and limits for 2026,
  //   read 14 November 2026 — both pages give the same periods: walleye and sauger "May 15, 2026 to March 31, 2027" (6 in all, walleye 32 to 47 cm);
  //   pike the same dates (6 in all); bass "June 15, 2026 to March 31, 2027"; char (brook trout) and lake trout "April 23 to September 15, 2026";
  //   yellow perch and "Other species" "April 1, 2026 to March 31, 2027". The fishing year starts on 1 April, so these close walleye and pike from
  //   1 April to 14 May, bass from 1 April to 14 June, and trout from 16 September to 22 April.
  // Placing Val-d'Or: the zone 13 east page's exception waters include "Lake Wyeth - (48°05'48" N., 77°23'36" W.)(Canton Louvicourt)", about 30 km
  //   east of the town, and the zone 13 west page lists Lake Noranda and Lake Abitibi to the west; zone 14's exceptions are the Gouin Reservoir waters.
  //   Since both halves of zone 13 give the same periods, the line between them does not matter here. The nearest exception waters (Lake Wyeth 30 km,
  //   Lake Matchi-Manitou 55 km, Lake Clair 50 km) lie outside the 15 km circle, and none of the town's named waters (Lac Blouin, the Harricana,
  //   the Bourlamaque) is listed. The zone 13 rules page (quebec.ca, last update 15 October 2026) adds rules for La Vérendrye Wildlife Reserve only.
  //   https://www.quebec.ca/en/tourism-and-recreation/sporting-and-outdoor-activities/fishing-rules/zones-periods/particular-rules/zone-13
  {
    id: "ca-qc-z13-val-d-or-walleye-pike",
    countryCode: "CA",
    admin1: ["QC", "Quebec", "Québec"],
    near: VAL_D_OR,
    species: ["walleye", "northern-pike"],
    closed: [{ from: "04-01", to: "05-14" }],
    note: "Val-d'Or is in Quebec's fishing zone 13, where walleye, sauger and pike are open from 15 May 2026 to 31 March 2027 (6 walleye and sauger in all, walleye 32 to 47 cm; 6 pike), so they are closed from 1 April to 14 May." + QC_TAIL,
    regulator: QC13_REG,
    source: QC13_SRC,
    checked: "2026-11-14",
  },
  {
    id: "ca-qc-z13-val-d-or-bass",
    countryCode: "CA",
    admin1: ["QC", "Quebec", "Québec"],
    near: VAL_D_OR,
    species: ["smallmouth-bass", "largemouth-bass"],
    closed: [{ from: "04-01", to: "06-14" }],
    note: "In Quebec's fishing zone 13 bass are open from 15 June 2026 to 31 March 2027 (6 in all), so they are closed from 1 April to 14 June." + QC_TAIL,
    regulator: QC13_REG,
    source: QC13_SRC,
    checked: "2026-11-14",
  },
  {
    id: "ca-qc-z13-val-d-or-trout",
    countryCode: "CA",
    admin1: ["QC", "Quebec", "Québec"],
    near: VAL_D_OR,
    species: ["brook-trout", "lake-trout"],
    closed: [{ from: "09-16", to: "04-22" }],
    note: "In Quebec's fishing zone 13 brook trout (10 in all, with Arctic char) and lake trout and splake (1 of at least 45 cm, angling only) are open from 23 April to 15 September 2026, so they are closed from 16 September to 22 April." + QC_TAIL,
    regulator: QC13_REG,
    source: QC13_SRC,
    checked: "2026-11-14",
  },
  {
    id: "ca-qc-z13-val-d-or-notes",
    countryCode: "CA",
    admin1: ["QC", "Quebec", "Québec"],
    near: VAL_D_OR,
    species: [],
    closed: [],
    water: ["rivers", "lakes"],
    note: "In Quebec's fishing zone 13 yellow perch (50) and other species the page does not name (no limit) may be fished from 1 April 2026 to 31 March 2027, the whole fishing year; sturgeon from 15 June to 31 October (1, angling only); copper redhorse is closed." + QC_TAIL,
    regulator: QC13_REG,
    source: QC13_SRC,
    checked: "2026-11-14",
  },

  // ---- Quebec: Saguenay (fishing zone 28) ---------------------------------------------------------------------
  // The audit of 10 November 2026 (checkers of 14 November) found no row for Saguenay's zone and walleye shown "Year-round".
  // source: Gouvernement du Québec, sport fishing rules, "Zone 28" (id_zone=32), periods and limits for 2026, read 14 November 2026 — walleye and
  //   sauger "June 1 to November 30, 2026" (6 in all); pike the same (10); yellow perch, rainbow smelt, burbot and other species April 23 to November
  //   30, 2026; char (brook trout), lake trout and splake, and landlocked salmon April 23 to September 15, 2026; Atlantic salmon "Fishing
  //   prohibited" April 1, 2026 to March 31, 2027 on the zone grid; striped bass, shad and copper redhorse prohibited. Its regulatory exceptions
  //   include the waters at the town: the Saguenay (sections a to c, down to the Dubuc bridge), the Chicoutimi (mouth to the Price Ouest street
  //   bridge), the Shipshaw, the Ha! Ha!, the aux Vases, Lake Kénogami and its tributaries, and the Fjord-du-Saguenay park; the page shows their
  //   locations but not their rules. A note, not rows, as for Montreal: the town's own waters are exceptions whose rules could not be read.
  {
    id: "ca-qc-z28-saguenay-notes",
    countryCode: "CA",
    admin1: ["QC", "Quebec", "Québec"],
    near: { lat: 48.406, lon: -71.0692, km: 25 },
    species: [],
    closed: [],
    note:
      "Saguenay is in Quebec's fishing zone 28. For 2026 the zone's general periods are walleye, sauger and pike 1 June to 30 November; brook trout, lake trout and landlocked salmon 23 April to 15 September; yellow perch, smelt, burbot and other species 23 April to 30 November. But the zone lists the waters at the town as exceptions with their own rules, among them the Saguenay down to the Dubuc bridge, the Chicoutimi, the Shipshaw, the Ha! Ha!, Lake Kénogami and the Fjord-du-Saguenay park, and those rules are not loaded, so no dates are shown here; check the zone's grid for the water you fish. In Quebec a fishing licence is mandatory (with some exceptions); carry it with government-issued photo ID.",
    regulator: "Québec government (fishing zone 28)",
    source: "https://peche.faune.gouv.qc.ca/RegPec/en/Info/Reglements?id_zone=32",
    checked: "2026-11-14",
  },
  // ---- Ontario, FMZ 8: Timmins ------------------------------------------------------------------------------
  {
    id: "ca-on-fmz8-walleye",
    countryCode: "CA",
    admin1: ONTARIO,
    near: TIMMINS,
    species: ["walleye"],
    closed: [{ from: "04-15", to: "05-15" }],
    note:
      "Walleye and sauger are closed from 15 April to the Friday before the third Saturday in May (15 May in 2026) and open the rest of the year." +
      FMZ8_TAIL,
    regulator: FMZ8_REG,
    source: FMZ8_SRC,
    checked: CHECKED,
  },
  {
    id: "ca-on-fmz8-lake-trout",
    countryCode: "CA",
    admin1: ONTARIO,
    near: TIMMINS,
    species: ["lake-trout"],
    closed: [
      { from: "01-01", to: "02-14" },
      { from: "03-16", to: "05-15" },
      { from: "10-01", to: "12-31" },
    ],
    note:
      "Lake trout is open from 15 February to 15 March and from the third Saturday in May (16 May in 2026) to 30 September, and closed the rest of the year." +
      FMZ8_TAIL,
    regulator: FMZ8_REG,
    source: FMZ8_SRC,
    checked: CHECKED,
  },
  {
    id: "ca-on-fmz8-brook-trout",
    countryCode: "CA",
    admin1: ONTARIO,
    near: TIMMINS,
    species: ["brook-trout"],
    closed: [{ from: "09-16", to: "12-31" }],
    note: "Brook trout is open from 1 January to 15 September and closed from 16 September to 31 December." + FMZ8_TAIL,
    regulator: FMZ8_REG,
    source: FMZ8_SRC,
    checked: CHECKED,
  },
  {
    id: "ca-on-fmz8-brown-trout",
    countryCode: "CA",
    admin1: ONTARIO,
    near: TIMMINS,
    species: ["brown-trout"],
    closed: [{ from: "01-01", to: "12-31" }],
    note: "Ontario's FMZ 8 page lists brown trout among the species that are not present in the zone and are closed to fishing all year.",
    regulator: FMZ8_REG,
    source: FMZ8_SRC,
    checked: CHECKED,
  },
  {
    id: "ca-on-fmz8-open",
    countryCode: "CA",
    admin1: ONTARIO,
    near: TIMMINS,
    species: ["northern-pike", "smallmouth-bass", "rainbow-trout", "yellow-perch", "lake-whitefish", "burbot"],
    closed: [],
    note:
      "In FMZ 8 northern pike, bass, rainbow trout, yellow perch and lake whitefish are open all year, and the variation order sets no close time for a species it does not list, which takes in burbot." +
      ON_LICENCE,
    regulator: FMZ8_REG,
    source: FMZ8_SRC,
    checked: CHECKED,
  },

  // ---- Ontario, FMZ 6 and FMZ 9: Thunder Bay ----------------------------------------------------------------
  {
    id: "ca-on-fmz6-walleye",
    countryCode: "CA",
    admin1: ONTARIO,
    near: THUNDER_BAY,
    species: ["walleye"],
    closed: [{ from: "04-15", to: "05-15" }],
    note: "Walleye and sauger are closed from 15 April to the Friday before the third Saturday in May (15 May in 2026) and open the rest of the year." + FMZ6_TAIL,
    regulator: FMZ6_REG,
    source: FMZ6_SRC,
    checked: CHECKED,
  },
  {
    id: "ca-on-fmz6-lake-trout",
    countryCode: "CA",
    admin1: ONTARIO,
    near: THUNDER_BAY,
    species: ["lake-trout"],
    closed: [{ from: "10-01", to: "12-31" }],
    note: "Lake trout is open from 1 January to 30 September and closed from 1 October to 31 December; the Shebandowan Lakes, west of the city, are closed all year." + FMZ6_TAIL,
    regulator: FMZ6_REG,
    source: FMZ6_SRC,
    checked: CHECKED,
  },
  {
    id: "ca-on-fmz6-brook-trout",
    countryCode: "CA",
    admin1: ONTARIO,
    near: THUNDER_BAY,
    species: ["brook-trout"],
    closed: [
      { from: "01-01", to: "04-24" },
      { from: "09-08", to: "12-31" },
    ],
    note:
      "Brook trout is open from the fourth Saturday in April (25 April in 2026) to Labour Day (7 September in 2026) and closed the rest of the year." +
      FMZ6_TAIL,
    regulator: FMZ6_REG,
    source: FMZ6_SRC,
    checked: CHECKED,
  },
  {
    id: "ca-on-fmz6-open",
    countryCode: "CA",
    admin1: ONTARIO,
    near: THUNDER_BAY,
    species: ["northern-pike", "smallmouth-bass", "rainbow-trout", "yellow-perch", "lake-whitefish", "black-crappie", "chinook-salmon", "coho-salmon", "burbot", "common-carp"],
    closed: [],
    note:
      "In FMZ 6 and FMZ 9 northern pike, bass, rainbow trout, yellow perch, lake whitefish, crappie and Pacific salmon (Chinook, coho) are open all year, and the variation orders set no close time for a species they do not list, which takes in burbot and carp. Lake sturgeon is closed all year, and the McIntyre River between the footbridge and the dam on the university property in Thunder Bay is a fish sanctuary, closed all year." +
      ON_LICENCE,
    regulator: FMZ6_REG,
    source: FMZ6_SRC,
    checked: CHECKED,
  },

  // ---- Ontario, FMZ 10: Greater Sudbury ---------------------------------------------------------------------
  {
    id: "ca-on-fmz10-walleye",
    countryCode: "CA",
    admin1: ONTARIO,
    near: SUDBURY,
    species: ["walleye"],
    closed: [{ from: "03-16", to: "05-15" }],
    note:
      "Walleye and sauger are closed from the Monday after the third Sunday in March (16 March in 2026) to the Friday before the third Saturday in May (15 May in 2026) and open the rest of the year." +
      FMZ10_TAIL,
    regulator: FMZ10_REG,
    source: FMZ10_SRC,
    checked: CHECKED,
  },
  {
    id: "ca-on-fmz10-lake-trout",
    countryCode: "CA",
    admin1: ONTARIO,
    near: SUDBURY,
    species: ["lake-trout"],
    closed: [{ from: "09-08", to: "12-31" }],
    note:
      "Lake trout is open from 1 January to Labour Day (7 September in 2026) and closed from the day after Labour Day to 31 December; some named lakes are closed all year or have other dates." +
      FMZ10_TAIL,
    regulator: FMZ10_REG,
    source: FMZ10_SRC,
    checked: CHECKED,
  },
  {
    id: "ca-on-fmz10-brook-trout",
    countryCode: "CA",
    admin1: ONTARIO,
    near: SUDBURY,
    species: ["brook-trout"],
    closed: [{ from: "10-01", to: "12-31" }],
    note: "Brook trout is open from 1 January to 30 September and closed from 1 October to 31 December." + FMZ10_TAIL,
    regulator: FMZ10_REG,
    source: FMZ10_SRC,
    checked: CHECKED,
  },
  {
    id: "ca-on-fmz10-muskellunge",
    countryCode: "CA",
    admin1: ONTARIO,
    near: SUDBURY,
    species: ["muskellunge"],
    closed: [{ from: "12-16", to: "06-19" }],
    note:
      "Muskellunge is open from the third Saturday in June (20 June in 2026) to 15 December; one fish a day on a sport licence, which must be longer than 122 cm, none on a conservation licence." +
      FMZ10_TAIL,
    regulator: FMZ10_REG,
    source: FMZ10_SRC,
    checked: CHECKED,
  },
  {
    id: "ca-on-fmz10-open",
    countryCode: "CA",
    admin1: ONTARIO,
    near: SUDBURY,
    species: ["northern-pike", "rainbow-trout", "yellow-perch", "lake-whitefish", "black-crappie", "bluegill", "channel-catfish", "burbot", "common-carp"],
    closed: [],
    note:
      "In FMZ 10 northern pike, rainbow trout, yellow perch, crappie, sunfish, channel catfish, lake whitefish and Pacific salmon are open all year, and the variation order sets no close time for a species it does not list, which takes in burbot and carp. Bass is open from the third Saturday in June (20 June in 2026) to 30 November in the zone generally, but bass is open all year in all waters north of Highway 17 and in all waters west of where the east bank of the Serpent River crosses Highway 17." +
      ON_LICENCE,
    regulator: FMZ10_REG,
    source: FMZ10_SRC,
    checked: CHECKED,
  },
  // ---- Alberta, NB4: Fort McMurray --------------------------------------------------------------------------
  {
    id: "ca-ab-nb4-lakes",
    countryCode: "CA",
    admin1: ["AB", "Alberta"],
    near: FORT_MCMURRAY,
    species: ["walleye", "northern-pike", "yellow-perch", "lake-whitefish", "burbot"],
    closed: [{ from: "04-01", to: "05-14" }],
    water: ["lakes"],
    note:
      "In Alberta's Northern Boreal unit NB4, which takes in Fort McMurray, the default for lakes is open 15 May to 31 March and closed 1 April to 14 May. Lakes named in the NB4 table have their own rules; check the table for the lake you will fish.",
    regulator: AB_REG,
    source: AB_SRC,
    checked: CHECKED,
  },
  {
    id: "ca-ab-nb4-streams",
    countryCode: "CA",
    admin1: ["AB", "Alberta"],
    near: FORT_MCMURRAY,
    species: [],
    closed: [],
    water: ["rivers"],
    note:
      "In Alberta's Northern Boreal unit NB4 the default for streams is open 1 June to 31 October and closed 1 November to 31 May, but the table lists exceptions: the Clearwater River mainstem is listed as open 1 June to 31 October, the Hangingstone River 16 June to 31 October, and the Athabasca River mainstem has its own seasons. Check the river's row in the NB4 table.",
    regulator: AB_REG,
    source: "https://albertaregulations.ca/fishingregs/NB4-Rivers.pdf",
    checked: CHECKED,
  },

  // ---- British Columbia, Region 7: Prince George ------------------------------------------------------------
  {
    id: "ca-bc-region7-salmon",
    countryCode: "CA",
    admin1: ["BC", "British Columbia"],
    near: PRINCE_GEORGE,
    species: ["chinook-salmon", "coho-salmon"],
    closed: [{ from: "01-01", to: "12-31" }],
    note:
      "Fisheries and Oceans Canada says there is no fishing for salmon in Region 7 (Omineca-Peace) until further notice; its page is dated 1 April 2026, so check it for any change before you fish.",
    regulator: "Fisheries and Oceans Canada (Region 7)",
    source: "https://www.pac.dfo-mpo.gc.ca/fm-gp/rec/fresh-douce/region7-eng.html",
    checked: CHECKED,
  },
  {
    id: "ca-bc-7a-streams",
    countryCode: "CA",
    admin1: ["BC", "British Columbia"],
    near: PRINCE_GEORGE,
    species: [],
    closed: [],
    water: ["rivers"],
    note:
      "BC's Region 7A (Omineca) synopsis closes every stream in the zone from 1 April to 30 June unless its table exempts it; the Fraser, Nechako and Stuart rivers are exempt. Streams in the zone also need a single barbless hook all year and have a bait ban, with exceptions listed by water, and white sturgeon is closed to all fishing.",
    regulator: "Province of British Columbia (Region 7A, Omineca)",
    source: BC_7A_SRC,
    checked: CHECKED,
  },

  // ---- Minnesota: International Falls (Rainy Lake and the Rainy River, boundary waters; inland creeks) -------------
  {
    id: "us-mn-international-falls-all-year",
    countryCode: "US",
    admin1: MN,
    near: INTERNATIONAL_FALLS,
    species: ["black-crappie", "bluegill", "yellow-perch"],
    closed: [],
    water: ["rivers", "lakes"],
    note:
      "Crappie, sunfish and yellow perch have no closed season on Rainy Lake and the Rainy River (Minnesota's border-water rules) and are open continuously on Minnesota's inland waters.",
    regulator: "Minnesota DNR (Minn. R. 6266.0700; inland waters)",
    source: MN_BORDER_SRC,
    checked: "2026-11-14",
  },
  {
    id: "us-mn-international-falls-notes",
    countryCode: "US",
    admin1: MN,
    near: INTERNATIONAL_FALLS,
    species: [],
    closed: [],
    water: ["rivers", "lakes"],
    note:
      "Rainy Lake and the Rainy River are boundary waters with Ontario, under Minnesota's own border-water rules: walleye and sauger open from the Saturday two weeks before Memorial Day weekend (9 May in 2026) to 14 April (8 a day, no more than 4 walleye); muskellunge from the third Saturday in June to 30 November (1 fish of at least 50 inches); bass have no closed season (6 a day); sturgeon are catch-and-release only from 16 June to 14 April and closed from 15 April to 15 June. On the Rat Root River and Rat Root Lake walleye close on the last Sunday in February. Minnesota's inland waters have other dates: walleye and northern pike 9 May 2026 to 28 February 2027, muskellunge 6 June to 30 November. Because the town's waters fall under both sets of rules, no closing dates are loaded for these fish. You may not keep more than Minnesota's limit from the border waters.",
    regulator: "Minnesota DNR (Minn. R. 6266.0700; inland waters)",
    source: MN_BORDER_SRC,
    checked: "2026-11-14",
  },

  // ---- Minnesota: Duluth ------------------------------------------------------------------------------------
  {
    id: "us-mn-duluth-lake-trout",
    countryCode: "US",
    admin1: MN,
    near: DULUTH,
    species: ["lake-trout"],
    closed: [{ from: "10-05", to: "11-30" }],
    water: ["lakes"],
    note:
      "Lake trout on the Minnesota waters of Lake Superior is open from 1 December to 4 October (the season that began 1 December 2025 ends 4 October 2026; the next runs 1 December 2026 to 3 October 2027), so it is closed from 5 October to 30 November in 2026. Minnesota's inland lakes have their own lake trout seasons (9 May to 30 September, and a winter season from mid-January to 31 March), and both are closed in November.",
    regulator: "Minnesota DNR (Lake Superior)",
    source: MN_SRC,
    checked: CHECKED,
  },
  {
    id: "us-mn-duluth-walleye",
    countryCode: "US",
    admin1: MN,
    near: DULUTH,
    species: ["walleye"],
    closed: [{ from: "03-01", to: "05-08" }],
    note:
      "Walleye and sauger are open from the fishing opener (9 May in 2026; it moves each year) to the end of February on Minnesota's inland waters, and to 1 March on Lake Superior and the St. Louis River Estuary, so they are closed from 1 March (2 March on Lake Superior) to 8 May in 2026.",
    regulator: "Minnesota DNR",
    source: MN_SRC,
    checked: CHECKED,
  },
  {
    id: "us-mn-duluth-pike",
    countryCode: "US",
    admin1: MN,
    near: DULUTH,
    species: ["northern-pike"],
    closed: [{ from: "03-01", to: "05-08" }],
    note:
      "Northern pike is open from the fishing opener (9 May in 2026; it moves each year) to the end of February on Minnesota's inland waters, and to 1 March on Lake Superior and the St. Louis River Estuary, so it is closed from 1 March (2 March on Lake Superior) to 8 May in 2026.",
    regulator: "Minnesota DNR",
    source: MN_SRC,
    checked: CHECKED,
  },
  {
    id: "us-mn-duluth-tributary-trout",
    countryCode: "US",
    admin1: MN,
    near: DULUTH,
    species: ["brook-trout", "brown-trout", "rainbow-trout", "steelhead"],
    closed: [{ from: "10-01", to: "04-10" }],
    water: ["rivers"],
    note:
      "In the Lake Superior tributaries above their posted boundaries (most of the length of the Lester, French, Sucker and Knife rivers) brook, brown and rainbow trout are open from 11 April to 30 September, rainbow trout catch-and-release only, so they are closed from 1 October to 10 April. Below the posted boundaries brown trout, rainbow trout (clipped kept, unclipped released) and salmon are open continuously and brook trout keeps the 11 April to 30 September season.",
    regulator: "Minnesota DNR (Lake Superior tributaries)",
    source: MN_SRC,
    checked: "2026-11-07",
  },
  {
    id: "us-mn-duluth-lake-superior",
    countryCode: "US",
    admin1: MN,
    near: DULUTH,
    species: [],
    closed: [],
    water: ["lakes"],
    note:
      "To fish the Minnesota waters of Lake Superior you need a Minnesota angling licence and a trout/salmon stamp validation (the booklet lists some anglers who are exempt); the St. Louis River Estuary can be fished on a Minnesota licence. Angling from boats is closed 6 October to 30 November on Lake Superior from the north arm of the Duluth ship canal to the mouth of Chester Creek, and unclipped steelhead (rainbow trout) must be released at once. Tributaries have posted boundaries with different rules above and below them.",
    regulator: "Minnesota DNR (Lake Superior)",
    source: MN_SRC,
    checked: CHECKED,
  },
];

// ================================================================================================================
// LAND RULES
// ================================================================================================================

type Centre = { lat: number; lon: number };

const kmBetween = (a: Centre, b: Centre): number => {
  const r = Math.PI / 180;
  const dLat = (b.lat - a.lat) * r;
  const dLon = (b.lon - a.lon) * r;
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(a.lat * r) * Math.cos(b.lat * r) * Math.sin(dLon / 2) ** 2;
  return 2 * 6371 * Math.asin(Math.sqrt(h));
};

/** True within `radius` km of any of the centres. */
const within = (centres: Centre[], radius: number) => (p: LandPlace) => centres.some((c) => kmBetween(c, p) <= radius);

const inOntario = (p: LandPlace) => p.admin1Code === "ON" || p.admin1 === "Ontario";
const inQuebec = (p: LandPlace) => p.admin1Code === "QC" || p.admin1 === "Quebec" || p.admin1 === "Québec";
const inBritishColumbia = (p: LandPlace) => p.admin1Code === "BC" || p.admin1 === "British Columbia";
const inMinnesota = (p: LandPlace) => p.admin1Code === "MN" || p.admin1 === "Minnesota";

const ON_TOWNS: Centre[] = [TIMMINS, THUNDER_BAY, SUDBURY];
const QC_TOWNS: Centre[] = [
  { lat: 48.1023, lon: -77.7876 }, // Val-d'Or
  { lat: 48.406, lon: -71.0692 }, // Saguenay
  { lat: 46.8137, lon: -71.2084 }, // Quebec
];
const MN_TOWNS: Centre[] = [DULUTH, INTERNATIONAL_FALLS];

// Wording, read 2 November 2026 on the pages named in each `source`:
// // Ontario Parks (blog, 15 April 2026): "foraging for any plant or fungal species is prohibited in provincial parks"; "removing any natural
// //   object from a provincial park is prohibited"; the exception named is Indigenous communities' constitutional rights to harvest
// // O. Reg. 688/21 s. 4(b): no person shall "cut, remove, injure or destroy a plant, tree, shrub, flower or other growing thing" in a conservation
// //   area; s. 2: it does not apply to an area "operated or managed by a municipality" or run under an agreement with an authority
// // Greater Sudbury Parks By-law 2013-54 s. 17(d): "No Person, while in any Park shall ... remove any soil, sand, gravel, stone or wood or any tree,
// //   plant or vegetation"; s. 4(1): it applies to every park in the City, with exceptions listed in s. 4(2)
// // Quebec, Règlement sur les parcs (P-9, r. 25, current to 1 July 2026) s. 20: it is forbidden to damage, remove or introduce a tree, shrub, plant or
// //   fungus; "la cueillette de produits végétaux comestibles est permise à des fins non commerciales", except in a preservation zone or an
// //   extreme-preservation zone
// // Quebec, E-12.01, r. 3 (current to 1 July 2026) s. 4: wild leek, 200 g of any of its parts or 50 bulbs or 50 plants a year, not in a park within
// //   the Parks Act or the other listed areas
// // Minnesota DNR, state parks: "you may harvest edible fruits and mushrooms for personal consumption"; picking "wildflowers or any other plants -
// //   edible or not" is not allowed; large or commercial harvesting is not allowed; state trails: edible fruit only
// // Minnesota DNR, state forests: collecting "berries, mushrooms, or other items for personal use" needs no permit; a permit is needed to "cut or remove
// //   any trees or plants" and to collect a large amount of berries or mushrooms
// // NPS, Voyageurs park regulations (updated 18 September 2025): "up to one gallon of berries for personal consumption"; "Do not destroy or collect
// //   natural or cultural resources in the park"
// // BC Parks, Responsible recreation: "Removing anything from a BC Park is usually illegal"; "Do not remove mushrooms, berries, flowers, fossils, wood,
// //   shells, or cultural artifacts"; Park, Conservancy and Recreation Area Regulation (B.C. Reg. 180/90, amended 2024) s. 32: a person must not damage,
// //   destroy, possess or remove "any natural resource or property" of a park, "Except as authorized by a park officer"
// // Prince George Parks and Open Space Bylaw No. 7370 s. 8.1(a): no person shall "destroy, damage, deface or remove any vegetation or Development" in an
// //   Open Space Area (city parks and trails); s. 1.1(s): vegetation "includes all trees, shrubs, plants, flowers and natural grass"

export const LAND: LandRule[] = [
  // ---- Ontario: Timmins, Thunder Bay, Greater Sudbury -------------------------------------------------------
  {
    id: "ontario-provincial-parks-boreal",
    applies: (p) => inOntario(p) && within(ON_TOWNS, 60)(p),
    title: "Ontario provincial parks",
    rule: "Ontario Parks says foraging for any plant or fungal species is prohibited in provincial parks, and that removing any natural object from a provincial park is prohibited. The only exception it names is Indigenous communities exercising constitutional harvesting rights.",
    source: { label: "Ontario Parks blog: foraging in provincial parks", url: "https://blog.ontarioparks.ca/?p=36243" },
    checked: CHECKED,
  },
  {
    id: "ontario-conservation-areas-boreal",
    applies: (p) => inOntario(p) && within(ON_TOWNS, 60)(p),
    title: "Conservation authority land",
    rule: "Ontario Regulation 688/21 (Rules of Conduct in Conservation Areas) says no person shall, in a conservation area, cut, remove, injure or destroy a plant, tree, shrub, flower or other growing thing. It does not apply to conservation areas operated or managed by a municipality, or run under an agreement.",
    source: { label: "O. Reg. 688/21, Rules of Conduct in Conservation Areas (s. 4(b), s. 2)", url: "https://mvca.on.ca/wp-content/uploads/2024/04/Reg-688_21_Conduct-in-CAs.pdf" },
    checked: CHECKED,
  },
  {
    id: "greater-sudbury-parks",
    applies: (p) => inOntario(p) && within([SUDBURY], 30)(p),
    title: "City of Greater Sudbury parks",
    rule: "The Parks By-law (No. 2013-54, s. 17) says no person, while in a park, shall remove any soil, sand, gravel, stone or wood or any tree, plant or vegetation. Section 4(2) lists a few people the by-law does not apply to, such as City employees and contractors on assigned work, emergency responders and public-utility staff.",
    source: { label: "City of Greater Sudbury: Parks By-law 2013-54 (s. 17(d), s. 4)", url: "https://www.greatersudbury.ca/linkservid/841B298C-A1F8-9D80-2CDAFF89B672FB0B/showMeta/0/" },
    checked: CHECKED,
  },

  // ---- Quebec: Val-d'Or, Saguenay, Quebec -------------------------------------------------------------------
  {
    id: "quebec-national-parks",
    applies: (p) => inQuebec(p) && within(QC_TOWNS, 60)(p),
    title: "Quebec national parks (parcs nationaux)",
    rule: "Quebec's Regulation respecting parks (s. 20) forbids damaging, removing or introducing a tree, shrub, plant or fungus in a park, other than for scientific or management purposes. It allows gathering edible plant products (“produits végétaux comestibles”) for non-commercial purposes, except in a preservation zone or an extreme-preservation zone.",
    source: { label: "Légis Québec: Règlement sur les parcs, P-9, r. 25, s. 20", url: "https://www.legisquebec.gouv.qc.ca/fr/ShowDoc/cr/p-9,%20r.%2025" },
    checked: CHECKED,
  },
  {
    id: "quebec-wild-leek-boreal",
    applies: (p) => inQuebec(p) && within(QC_TOWNS, 60)(p),
    title: "Wild leek (ail des bois) in Quebec",
    rule: "Under Quebec's regulation on threatened or vulnerable plant species, wild leek may be harvested for personal consumption only up to 200 g of any of its parts, or 50 bulbs or 50 plants, a year, and not in a park under the Parks Act or the other protected areas the regulation lists, such as wildlife preserves.",
    source: { label: "Légis Québec: E-12.01, r. 3, s. 4", url: "https://www.legisquebec.gouv.qc.ca/en/document/cr/E-12.01,%20r.%203" },
    checked: CHECKED,
  },

  // ---- British Columbia: Prince George ----------------------------------------------------------------------
  {
    id: "bc-parks",
    applies: (p) => inBritishColumbia(p) && within([PRINCE_GEORGE], 60)(p),
    title: "BC provincial parks",
    rule: "BC Parks says removing anything from a BC park is usually illegal, and asks visitors not to remove mushrooms, berries, flowers, fossils, wood, shells or cultural artifacts; it says only First Nations and special-permit holders may harvest certain items.",
    source: { label: "BC Parks: Responsible recreation", url: "https://bcparks.ca/plan-your-trip/visit-responsibly/responsible-recreation" },
    checked: CHECKED,
  },
  {
    id: "prince-george-parks",
    applies: (p) => inBritishColumbia(p) && within([PRINCE_GEORGE], 30)(p),
    title: "City of Prince George parks",
    rule: "The Parks and Open Space Bylaw (No. 7370, s. 8.1) says no person shall destroy, damage, deface or remove any vegetation in an open space area, which includes city parks and trails. It defines vegetation as all trees, shrubs, plants, flowers and natural grass, wild or cultivated. The City's copy is a convenience consolidation (to 8 May 2023), not the official text.",
    source: { label: "City of Prince George: Parks and Open Space Bylaw No. 7370 (s. 8.1(a), s. 1.1)", url: "https://www.princegeorge.ca/sites/default/files/2023-05/BL7370_CONSOLIDATION_2023-05-08_0.pdf" },
    checked: CHECKED,
  },

  // ---- Minnesota: Duluth, International Falls ---------------------------------------------------------------
  {
    id: "minnesota-state-parks",
    applies: (p) => inMinnesota(p) && within(MN_TOWNS, 60)(p),
    title: "Minnesota state parks and state trails",
    rule: "The Minnesota DNR says edible fruits and mushrooms may be picked in state parks for personal consumption, but picking wildflowers or any other plants, edible or not, is not allowed even in small amounts, and large-scale or commercial harvesting is not allowed. Along state trails only edible fruit may be collected; mushrooms and other plants may not.",
    source: { label: "Minnesota DNR: Harvesting plants in state parks and on state trails", url: "https://www.dnr.state.mn.us/state-parks/harvesting.html" },
    checked: CHECKED,
  },
  {
    id: "minnesota-state-forests",
    applies: (p) => inMinnesota(p) && within(MN_TOWNS, 60)(p),
    title: "Minnesota state forests",
    rule: "The Minnesota DNR says you may collect berries, mushrooms or other items for personal use in a state forest without a permit. A permit from the DNR forestry office is needed to cut or remove trees or plants, and to collect a large amount of berries or mushrooms for personal use or for sale.",
    source: { label: "Minnesota DNR: State forest rules", url: "https://www.dnr.state.mn.us/state-forests/rules.html" },
    checked: CHECKED,
  },
  {
    id: "voyageurs-national-park",
    applies: (p) => inMinnesota(p) && within([INTERNATIONAL_FALLS], 70)(p),
    title: "Voyageurs National Park",
    rule: "The National Park Service says you may harvest up to one gallon of berries for personal consumption in Voyageurs National Park, and asks visitors not to destroy or collect natural or cultural resources, naming plants, flowers, driftwood and pine cones. Its regulations page does not mention mushrooms or nuts.",
    source: { label: "National Park Service: Voyageurs park regulations", url: "https://www.nps.gov/voya/planyourvisit/park-regulations.htm" },
    checked: CHECKED,
  },
];
