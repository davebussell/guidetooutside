/**
 * Rules read from the regulator's own pages for the ecoregion "Great Lakes & St. Lawrence Lowlands" (great-lakes-st-lawrence).
 *
 * CLOSED: closed-season rows (same shape and standard as src/data/closed-seasons.ts: a regulator, the page it
 * was read from, the date it was read, dates written as the regulator gives them).
 * LAND: where-you-may-pick rules (same shape and standard as src/data/land-rules.ts: the regulator's wording,
 * kept inside the source, with the page and the date it was read).
 *
 * Nothing here is inferred. A row exists only where the page was opened and read.
 *
 * Towns covered (20): Ontario (Toronto, Hamilton, Niagara-on-the-Lake, Kingston, London, Windsor, Ottawa), Quebec
 * (Montreal, Sherbrooke), and the US towns Burlington VT, Concord NH, Albany NY, Buffalo NY, Cleveland OH, Detroit MI,
 * Grand Rapids MI, Chicago IL, Milwaukee WI, Madison WI, Minneapolis MN. Ottawa's FMZ 12 rows and the five
 * Ottawa-area land rules, and the FMZ 20 rows for the north shore of Lake Ontario, live in src/data/closed-seasons.ts
 * and src/data/land-rules.ts and are not repeated here. Every row below is also scoped to this ecoregion
 * (`regionSlug`, or `inRegion` for land rules) so that it cannot leak into another region's towns.
 */
import { regionOf } from "@/lib/region";
import type { ClosedSeason } from "../closed-seasons";
import type { LandPlace, LandRule } from "../land-rules";

const REGION = "great-lakes-st-lawrence";
const RS = [REGION];
const CHECKED = "2026-11-02";

// ---- Helpers for the land rules (a local copy of the circle test in land-rules.ts, which cannot be imported here
// without a circular import) ---------------------------------------------------------------------------------------
const km = (a: { lat: number; lon: number }, b: { lat: number; lon: number }) => {
  const r = Math.PI / 180;
  const dLat = (b.lat - a.lat) * r;
  const dLon = (b.lon - a.lon) * r;
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(a.lat * r) * Math.cos(b.lat * r) * Math.sin(dLon / 2) ** 2;
  return 2 * 6371 * Math.asin(Math.sqrt(h));
};
const inRegion = (p: LandPlace) => regionOf(p.lat, p.lon).slug === REGION;
const within = (p: LandPlace, c: { lat: number; lon: number }, radiusKm: number) => km(c, p) <= radiusKm;
const is = (p: LandPlace, ...names: string[]) => names.some((n) => p.admin1Code === n || p.admin1 === n);
/** The five Ottawa-area land rules in land-rules.ts already cover this circle (NCR_CENTRE, NCR_RADIUS_KM). */
const nearOttawa = (p: LandPlace) => within(p, { lat: 45.4209, lon: -75.6901 }, 40);

// ---- Town centres (place-normals.json) --------------------------------------------------------------------------
const TORONTO = { lat: 43.6535, lon: -79.3839 };
const HAMILTON = { lat: 43.2561, lon: -79.8729 };
const MONTREAL = { lat: 45.5032, lon: -73.5698 };
const SHERBROOKE = { lat: 45.4033, lon: -71.8890 };
const WINDSOR = { lat: 42.2859, lon: -82.9781 };
const LONDON = { lat: 42.9837, lon: -81.2496 };
const BURLINGTON = { lat: 44.4762, lon: -73.2129 };
const CONCORD = { lat: 43.2072, lon: -71.5375 };
const ALBANY = { lat: 42.6512, lon: -73.7550 };
const BUFFALO = { lat: 42.8864, lon: -78.8781 };
const CLEVELAND = { lat: 41.4997, lon: -81.6937 };
const DETROIT = { lat: 42.3316, lon: -83.0466 };
const GRAND_RAPIDS = { lat: 42.9632, lon: -85.6679 };
const CHICAGO = { lat: 41.8756, lon: -87.6244 };
const MILWAUKEE = { lat: 43.0386, lon: -87.9091 };
const MADISON = { lat: 43.0747, lon: -89.3842 };
const MINNEAPOLIS = { lat: 44.9773, lon: -93.2655 };

// =====================================================================================================================
// CLOSED SEASONS
// =====================================================================================================================

const ON = ["ON", "Ontario"];
const FMZ_BASE = "https://www.ontario.ca/document/ontario-fishing-regulations-summary";
const ON_LICENCE =
  "In Ontario most people need a recreational fishing licence and must carry an Outdoors Card (unless it is a 1-day licence); a Sport licence gives full limits, a Conservation licence reduced ones. Ontario's summary says it is illegal to try to catch a fish whose season is closed, even to release it.";

// ---- Ontario FMZ 19 (Windsor: the Detroit River and Lake St. Clair) -------------------------------------------------
// source: Ontario Fishing Regulations Summary, Fisheries Management Zone 19 (page updated 4 August 2026), read 2 November 2026 —
//   map text: "Zone 19 consists of Lake Erie including Lake St. Clair and the St. Clair, Detroit and Upper Niagara Rivers";
//   "Detroit River and St. Clair River are in Zone 19". Largemouth and smallmouth bass combined "fourth Saturday in June to
//   November 30" (S-6, C-2); muskellunge "first Saturday in June to December 15" (S-1, over 112 cm; C-0); lake trout "January 1
//   to September 30 and December 1 to December 31"; walleye and sauger, northern pike, brown trout, rainbow trout, Pacific salmon,
//   Atlantic salmon, lake whitefish, channel catfish, crappie, sunfish, yellow perch "open all year"; lake sturgeon "closed all year".
// source: Ontario summary, General fishing regulations (updated 4 August 2026) — "It is illegal to attempt to catch fish for which
//   the season is closed"; for waters shared with another province or state, the total fish caught anywhere in those waters counts.
// source: Ontario summary, FMZ 16 page — "Zone 16 ... consists mostly of rivers in urban areas such as Windsor, Niagara and Toronto";
//   the Detroit and St. Clair rivers are in Zone 19.
const FMZ19_SRC = `${FMZ_BASE}/fisheries-management-zone-19`;
const FMZ19_REG = "Ontario MNRF (FMZ 19)";
const FMZ19_AT = { near: { ...WINDSOR, km: 20 } };
const FMZ19_END = " This is the Detroit River and Lake St. Clair (FMZ 19); Ontario's FMZ 16 page describes that zone as mostly rivers in urban areas such as Windsor, so small inland streams may follow FMZ 16's dates instead.";

// ---- Ontario FMZ 16 (London: the Thames River) -----------------------------------------------------------------------
// source: Ontario Fishing Regulations Summary, Fisheries Management Zone 16 (page updated 4 August 2026), read 2 November 2026 —
//   walleye and sauger "January 1 to March 15 and second Saturday in May to December 31" (S-4, C-2, not more than 1 over 46 cm);
//   northern pike "January 1 to March 31 and second Saturday in May to December 31"; muskellunge "first Saturday in June to
//   December 15" (must be greater than 91 centimetres); largemouth and smallmouth bass combined "fourth Saturday in June to
//   November 30"; lake trout "January 1 to September 30"; brook, brown and rainbow trout, Pacific and Atlantic salmon "fourth
//   Saturday in April to September 30"; channel catfish, crappie, lake whitefish, sunfish, yellow perch "open all year". The page
//   has entries for the Thames River in Middlesex County (North Thames main branch only: brown and rainbow trout "open all year";
//   Thames main branch, Elgin and Middlesex counties and Chatham-Kent: Atlantic salmon, brown trout, Pacific salmon and rainbow
//   trout "open all year"), and for the lower Thames to the Keil Street Bridge in Chatham (walleye open all year; muskellunge over
//   112 cm).
const FMZ16_SRC = `${FMZ_BASE}/fisheries-management-zone-16`;
const FMZ16_REG = "Ontario MNRF (FMZ 16)";
const FMZ16_TRIB_END = " Ontario's FMZ 16 page lists the Credit, Don, Humber, Rouge and Grindstone and other Lake Ontario tributaries among this zone's named waters; Lake Ontario and Hamilton Harbour are FMZ 20, and a stream the page does not name may follow another zone.";
const FMZ16_END = " This is the Thames River at London (FMZ 16, southwestern Ontario); the lower Thames below Chatham has its own walleye and muskellunge rules.";

// ---- Ontario FMZ 20 (north shore of Lake Ontario): open-all-year species and licence note. The closed-season rows for this
//   zone are in src/data/closed-seasons.ts. ------------------------------------------------------------------------
// source: Ontario summary, FMZ 20 page (updated 4 August 2026), read 2 November 2026 — brown trout, rainbow trout, Pacific salmon,
//   lake whitefish, channel catfish, crappie, sunfish, yellow perch "open all year"; Atlantic salmon "open all year" (S-1, must be
//   greater than 63 cm, C-0); lake sturgeon "closed all year"; the zone is "Lake Ontario and connected waters, including the Bay of
//   Quinte, the Niagara River, Hamilton Harbour, and the St. Lawrence River". FMZ 16 page: the lower reaches of the Credit, Don,
//   Humber, Rouge, Grindstone and other Lake Ontario tributaries are in FMZ 16.
const FMZ20_SRC = `${FMZ_BASE}/fisheries-management-zone-20`;
/**
 * Lake Ontario's west end and north shore (Toronto, Hamilton, Niagara-on-the-Lake), the same box as FMZ20 in src/data/closed-seasons.ts. Until the
 * audit of 10 November 2026 (checkers of 14 November) it reached east to 74.2° W and took in Kingston, whose inland lakes and streams are FMZ 18 (the
 * FMZ 18 page names Kingston); Kingston's rows are below, by zone.
 */
const FMZ20_BOX = { minLat: 42.8, maxLat: 44.6, minLon: -80.2, maxLon: -77.0 };

// ---- Ontario FMZ 18 and 20 at Kingston, and FMZ 16 and 20 at Niagara-on-the-Lake (audit of 10 November 2026, checkers of 14 November) ------
// source: Ontario summary, FMZ 18 page ("Updated: August 04, 2026"), read 14 November 2026 — "Zone 18 is located in southern Ontario and includes
//   the cities of Ottawa, Cornwall, Perth, Kingston and Belleville"; walleye and sauger "January 1 to March 1 and second Saturday in May to December
//   31"; northern pike "January 1 to March 31 and second Saturday in May to December 31"; largemouth and smallmouth bass "third Saturday in June to
//   December 15"; muskellunge "1st Saturday in June to December 15"; lake trout "fourth Saturday in May to September 8"; brook trout, splake, brown
//   trout, rainbow trout, Pacific salmon, yellow perch, channel catfish, crappie, sunfish, lake whitefish "open all year"; Atlantic salmon and lake
//   sturgeon "closed all year". No exception names a water at Kingston (Loughborough Lake, 20 km north, is open all year for lake trout).
// source: Ontario summary, FMZ 20 page ("Updated: August 04, 2026"), re-read 14 November 2026 — "Zone 20 consists of Lake Ontario including the Bay
//   of Quinte, Niagara River, Hamilton Harbour and the St. Lawrence River"; walleye "January 1 to March 1 and first Saturday in May to December 31";
//   pike "January 1 to March 31 and first Saturday in May to December 31"; largemouth bass catch and release "January 1 to May 10", season "third
//   Saturday in June to December 31"; smallmouth the same catch and release, season "first Saturday in July to December 31"; muskellunge "third
//   Saturday in June to December 15"; lake trout "January 1 to September 30 and December 1 to December 31"; brook trout and splake "not present in
//   this Zone and are closed to fishing all year"; brown and rainbow trout, Pacific and Atlantic salmon, perch, catfish, crappie, sunfish, whitefish
//   "open all year". The St. Lawrence perch exception is for Lake St. Francis and east of the Saunders station (Cornwall), far from Kingston.
// source: Ontario summary, FMZ 16 page ("Updated: August 04, 2026"), re-read 14 November 2026 — bass "fourth Saturday in June to November 30";
//   walleye "January 1 to March 15 and second Saturday in May to December 31"; pike "January 1 to March 31 and second Saturday in May to December
//   31"; muskellunge "first Saturday in June to December 15"; brook, brown and rainbow trout, Pacific and Atlantic salmon "fourth Saturday in April
//   to September 30"; perch, catfish, crappie, sunfish, whitefish "open all year". Niagara exceptions, open all year for Atlantic salmon, brown trout,
//   Pacific salmon and rainbow trout: Fifteen Mile, Sixteen Mile and Twenty Mile creeks below the QEW, and "Twelve Mile Creek (Zone 20) - City of
//   St. Catharines, between Lakeport Road and Lake Ontario". Four Mile, Two Mile and the Welland River are not named.
// Kingston: the river cards (the Cataraqui, Little Cataraqui and Collins creeks) are FMZ 18 waters, so they carry FMZ 18 rows. The lake cards hold Lake
//   Ontario (FMZ 20) and inland lakes (FMZ 18) together, and the two zones' dates differ for walleye, pike, bass, muskellunge, lake trout, brook trout
//   and Atlantic salmon. What both zones open all year is a row; days both zones close are rows (below, with the reopening dates in the notes); the
//   rest is a note. 2026 calendar: first Saturday in May 2 May, second
//   9 May; fourth Saturday in May 23 May; first Saturday in June 6 June, third 20 June; first Saturday in July 4 July.
// Niagara-on-the-Lake: the river cards hold the Niagara River (FMZ 20) and the town's creeks (FMZ 16) together, and the two zones differ for every fish
//   with a season, so the river cards get rows only for the days both zones close a fish, and a note with both zones' dates (the FMZ 16 and 20
//   open-all-year row above still applies); the lake cards keep the FMZ 20 rows.
const FMZ18_SRC = `${FMZ_BASE}/fisheries-management-zone-18`;
const FMZ18_REG = "Ontario MNRF (FMZ 18)";
const KINGSTON = { lat: 44.3054, lon: -76.4284 };
const NIAGARA_ON_THE_LAKE = { lat: 43.2556, lon: -79.0723 };
const FMZ18_KINGSTON_END = " This is the zone of Kingston's inland lakes, rivers and creeks (FMZ 18); Lake Ontario and the St. Lawrence are FMZ 20, with other dates.";

// ---- Quebec zone 8 (Montreal) and zone 6 (Sherbrooke) ------------------------------------------------------------------
// source: Gouvernement du Québec, sport fishing rules by zone, 2026 season (1 April 2026 to 31 March 2027), read 2 November 2026.
//   Zone 8 (https://peche.faune.gouv.qc.ca/RegPec/en/Info/Reglements?id_zone=8; quebec.ca zone 8 page updated 15 October 2026): the page
//   names the Lachine canal, Lac Saint-Louis, the Rivière des Prairies, the Rivière des Mille Îles, Lac des Deux Montagnes and the
//   St. Lawrence from the Honoré-Mercier bridge to Tracy. "From April 23rd, 2026 to September 15th, 2026" char (brook trout), cutthroat
//   and brown trout, lake trout and splake, landlocked salmon, rainbow trout; "From May 1st, 2026 to March 31st, 2027" pike and yellow
//   perch; "From May 10th, 2026 to May 31st, 2026" walleye (37 to 53 cm, angling only) then "From June 1st, 2026 to March 31st, 2027"
//   walleye and sauger; "From June 15th, 2026 to December 19th, 2026" muskellunge and tiger muskellunge (137 cm or more);
//   "From June 15th, 2026 to March 31st, 2027" bass (6 in all); "From April 1st, 2026 to March 31st, 2027" black crappie, rainbow
//   smelt, shad and "Other species" (no limit); striped bass and copper redhorse "Fishing prohibited". Exceptions: the page lists
//   about 30 waters as regulatory exceptions (among them all the Montreal-area waters above) but shows only where they are, not
//   their rules (its printable grid could not be read reliably), so the zone-wide periods are what is recorded.
//   Zone 6 (https://peche.faune.gouv.qc.ca/RegPec/en/Info/Reglements?id_zone=6; quebec.ca zone 6 page updated 15 October 2026): the page
//   names Sherbrooke (Highway 112 bridge), the Magog and Saint-François rivers, lakes Memphrémagog, Massawippi, Magog and Brompton, and
//   the national parks of Mont-Orford and Yamaska. "April 23 to September 15" the same trout, char, lake trout and salmon as zone 8;
//   "April 23 to November 30" black crappie, yellow perch and "Other species" (no limit); "May 15 to November 30" pike and walleye
//   and sauger; "June 15 to November 30" bass and muskellunge; "April 1, 2026 to March 31, 2027" copper redhorse, striped bass and
//   sturgeon "Fishing prohibited". A snowflake icon marks the exception waters where winter fishing is allowed.
// source: Québec sport fishing licence page (updated 14 March 2025) — "mandatory (with some exceptions) to have a valid fishing licence";
//   carry the licence and government-issued photo ID.
const QC = ["QC", "Quebec", "Québec"];
const QC8_SRC = "https://peche.faune.gouv.qc.ca/RegPec/en/Info/Reglements?id_zone=8";
const QC6_SRC = "https://peche.faune.gouv.qc.ca/RegPec/en/Info/Reglements?id_zone=6";
const QC8_REG = "Québec government (fishing zone 8)";
const QC6_REG = "Québec government (fishing zone 6)";

// ---- United States -----------------------------------------------------------------------------------------------------
const VT = ["VT", "Vermont"];
const NH = ["NH", "New Hampshire"];
const NY = ["NY", "New York"];
const OH = ["OH", "Ohio"];
const MI = ["MI", "Michigan"];
const IL = ["IL", "Illinois"];
const WI = ["WI", "Wisconsin"];
const MN = ["MN", "Minnesota"];

const VT_SRC = "https://legislature.vermont.gov/statutes/section/10appendix/002/00122";
const VT_REG = "Vermont Fish & Wildlife (10 V.S.A. App. § 122)";
const NH_SRC = "https://wildlife.nh.gov/fishing-new-hampshire/fishing-seasons-nh";
const NH_REG = "New Hampshire Fish and Game";
const NY_STATE_SRC = "https://dec.ny.gov/things-to-do/freshwater-fishing/regulations/statewide-season-sizes-catch-limits";
const NY_GL_SRC = "https://dec.ny.gov/things-to-do/freshwater-fishing/regulations/great-lakes-tributaries";
const NY_HUDSON_SRC = "https://dec.ny.gov/things-to-do/freshwater-fishing/regulations/tidal-hudson-river-special-regulations";
const NY_REG = "New York State DEC";
const OH_SRC = "https://ohiodnr.gov/static/documents/wildlife/laws-regs-licenses/OhioFishingRegs_English.pdf";
const MI_SRC = "https://www.michigan.gov/dnr/-/media/Project/Websites/dnr/Documents/LED/digests/2026-Michigan-Fishing-Regulations_web_accessible.pdf";
const MI_REG = "Michigan DNR";
const IL_SRC = "https://dnr.illinois.gov/content/dam/soi/en/web/dnr/publications/documents/00000953.pdf";
const WI_SRC = "https://dnr.wisconsin.gov/topic/fishing/seasons";
const WI_REG = "Wisconsin DNR";
const MN_SRC = "https://files.dnr.state.mn.us/rlp/regulations/fishing/fishing_regs.pdf";
const MN_REG = "Minnesota DNR";

export const CLOSED: ClosedSeason[] = [
  // ======================================== Open all year ========================================
  // Rows with no closed range and named species: the regulator's "open all year" for those species, so the page prints
  // the regulator's season for them instead of typical months (src/lib/closed-seasons.ts `namesOpenAllYear`). Each is
  // taken from the page statements recorded in the sections below, read 2 November 2026; the 5 November audit found
  // Toronto's perch and catfish, Detroit's walleye and Burlington's trout shown as typical months while the pages said
  // open all year.
  {
    id: "ca-on-fmz19-all-year",
    countryCode: "CA",
    admin1: ON,
    regionSlug: RS,
    ...FMZ19_AT,
    species: ["walleye", "northern-pike", "brown-trout", "rainbow-trout", "steelhead", "coho-salmon", "chinook-salmon", "atlantic-salmon", "lake-whitefish", "channel-catfish", "black-crappie", "bluegill", "yellow-perch"],
    closed: [],
    water: ["rivers", "lakes"],
    note: "Open all year in FMZ 19 (the Detroit River and Lake St. Clair): walleye and sauger, northern pike, brown and rainbow trout, Pacific and Atlantic salmon (Atlantic salmon one fish, none on a conservation licence), lake whitefish, channel catfish, crappie, sunfish and yellow perch.",
    regulator: FMZ19_REG,
    source: FMZ19_SRC,
    checked: CHECKED,
  },
  {
    id: "ca-on-fmz16-london-all-year",
    countryCode: "CA",
    admin1: ON,
    regionSlug: RS,
    near: { ...LONDON, km: 20 },
    species: ["yellow-perch", "channel-catfish", "black-crappie", "bluegill", "lake-whitefish"],
    closed: [],
    water: ["rivers", "lakes"],
    note: "Open all year in FMZ 16: yellow perch, channel catfish, crappie, sunfish and lake whitefish." + FMZ16_END,
    regulator: FMZ16_REG,
    source: FMZ16_SRC,
    checked: CHECKED,
  },
  {
    id: "ca-on-fmz16-fmz20-all-year",
    countryCode: "CA",
    admin1: ON,
    regionSlug: RS,
    box: FMZ20_BOX,
    species: ["yellow-perch", "channel-catfish", "black-crappie", "bluegill", "lake-whitefish"],
    closed: [],
    water: ["rivers", "lakes"],
    note: "Open all year on both the FMZ 20 page (Lake Ontario and connected waters) and the FMZ 16 page (the Lake Ontario tributaries): yellow perch, channel catfish, crappie, sunfish and lake whitefish.",
    regulator: "Ontario MNRF (FMZ 16 and 20)",
    source: FMZ20_SRC,
    checked: CHECKED,
  },
  {
    id: "ca-on-fmz20-lakes-all-year",
    countryCode: "CA",
    admin1: ON,
    regionSlug: RS,
    box: FMZ20_BOX,
    species: ["brown-trout", "rainbow-trout", "steelhead", "chinook-salmon", "coho-salmon", "atlantic-salmon"],
    closed: [],
    water: ["lakes"],
    note: "Open all year in Lake Ontario (FMZ 20): brown trout, rainbow trout and Pacific salmon; Atlantic salmon open all year with one fish over 63 cm, none on a conservation licence. The lower reaches of the Credit, Don, Humber and Rouge are FMZ 16 waters with their own dates.",
    regulator: "Ontario MNRF (FMZ 20)",
    source: FMZ20_SRC,
    checked: CHECKED,
  },
  {
    id: "us-vt-champlain-all-year",
    countryCode: "US",
    admin1: VT,
    regionSlug: RS,
    near: { ...BURLINGTON, km: 25 },
    species: ["brook-trout", "brown-trout", "rainbow-trout", "lake-trout", "atlantic-salmon", "northern-pike", "yellow-perch"],
    closed: [],
    water: ["lakes"],
    note: "No closed season on Lake Champlain for brook, brown and rainbow trout, lake trout, landlocked salmon, northern pike and yellow perch (Vermont's rule). Other Vermont waters follow the general-waters dates.",
    regulator: VT_REG,
    source: VT_SRC,
    checked: CHECKED,
  },
  {
    id: "us-nh-concord-rivers-closed",
    countryCode: "US",
    admin1: NH,
    regionSlug: RS,
    near: { ...CONCORD, km: 25 },
    species: ["*"],
    closed: [{ from: "10-16", to: "12-31" }],
    water: ["rivers"],
    note: "New Hampshire's seasons page gives rivers and streams a season of 1 January to 15 October for trout, bass and other species, so they are closed from 16 October to 31 December. The Merrimack River from the Winnipesaukee-Pemigewasset confluence to the Massachusetts line, and parts of the Contoocook, are listed by Fish and Game among the waters where stocked trout can be fished all year, so check the page for the stretch you fish.",
    regulator: NH_REG,
    source: NH_SRC,
    checked: CHECKED,
  },
  {
    id: "us-ny-albany-all-year",
    countryCode: "US",
    admin1: NY,
    regionSlug: RS,
    near: { ...ALBANY, km: 25 },
    species: ["atlantic-salmon", "black-crappie", "yellow-perch", "bluegill", "lake-whitefish"],
    closed: [],
    water: ["rivers", "lakes"],
    note: "Open year-round in New York's statewide table: landlocked Atlantic salmon, crappie, yellow perch, sunfish and lake whitefish.",
    regulator: NY_REG,
    source: NY_STATE_SRC,
    checked: CHECKED,
  },
  {
    id: "us-ny-albany-lakes-trout-all-year",
    countryCode: "US",
    admin1: NY,
    regionSlug: RS,
    near: { ...ALBANY, km: 25 },
    species: ["brown-trout", "rainbow-trout", "steelhead"],
    closed: [],
    water: ["lakes"],
    note: "Open year-round in lakes and ponds in New York's statewide table: brown and rainbow trout. Inland trout streams run 1 April to 15 October, with catch and release on artificial lures only from 16 October to 31 March.",
    regulator: NY_REG,
    source: NY_STATE_SRC,
    checked: CHECKED,
  },
  {
    id: "us-ny-buffalo-lake-erie-all-year",
    countryCode: "US",
    admin1: NY,
    regionSlug: RS,
    near: { ...BUFFALO, km: 25 },
    species: ["brown-trout", "rainbow-trout", "steelhead", "coho-salmon", "chinook-salmon", "lake-trout"],
    closed: [],
    water: ["rivers", "lakes"],
    note: "Open all year in Lake Erie and the upper Niagara River: brown trout, rainbow trout (including steelhead), coho and Chinook salmon and lake trout. On the Buffalo River and Cattaraugus Creek the tributary rules apply from 1 September to 31 March, in daylight only; lake trout in the lower Niagara River (Lewiston and below) is 1 December to 30 September.",
    regulator: NY_REG,
    source: NY_GL_SRC,
    checked: CHECKED,
  },
  {
    id: "us-ny-buffalo-lake-erie-bass-all-year",
    countryCode: "US",
    admin1: NY,
    regionSlug: RS,
    near: { ...BUFFALO, km: 25 },
    species: ["smallmouth-bass", "largemouth-bass"],
    closed: [],
    water: ["lakes"],
    note: "Lake Erie black bass are open all year at two settings: one fish of 20 inches from 1 December to 14 June, five of 12 inches from 15 June to 30 November.",
    regulator: NY_REG,
    source: NY_GL_SRC,
    checked: CHECKED,
  },
  {
    id: "us-mi-grand-rapids-all-year",
    countryCode: "US",
    admin1: MI,
    regionSlug: RS,
    near: { ...GRAND_RAPIDS, km: 30 },
    species: ["yellow-perch", "black-crappie", "bluegill", "channel-catfish", "lake-whitefish", "burbot"],
    closed: [],
    water: ["rivers", "lakes"],
    note: "Open all year in Michigan's guide: yellow perch, crappie, bluegill, catfish, lake whitefish and burbot.",
    regulator: MI_REG,
    source: MI_SRC,
    checked: CHECKED,
  },
  {
    id: "us-mi-grand-rapids-bass-release",
    countryCode: "US",
    admin1: MI,
    regionSlug: RS,
    near: { ...GRAND_RAPIDS, km: 30 },
    species: ["largemouth-bass", "smallmouth-bass", "muskellunge"],
    closed: [],
    water: ["rivers", "lakes"],
    note: "Michigan lets anglers catch and immediately release bass and muskellunge all year; keeping bass is allowed from the Saturday before Memorial Day (23 May in 2026) to 31 December and keeping muskellunge from the first Saturday in June to 15 March.",
    regulator: MI_REG,
    source: MI_SRC,
    checked: CHECKED,
  },
  {
    id: "us-mi-detroit-all-year",
    countryCode: "US",
    admin1: MI,
    regionSlug: RS,
    near: { ...DETROIT, km: 25 },
    species: ["yellow-perch", "black-crappie", "bluegill", "channel-catfish", "lake-whitefish", "burbot"],
    closed: [],
    water: ["rivers", "lakes"],
    note: "Open all year in Michigan's guide: yellow perch, crappie, bluegill, catfish, lake whitefish and burbot.",
    regulator: MI_REG,
    source: MI_SRC,
    checked: CHECKED,
  },
  {
    id: "us-mi-detroit-lakes-all-year",
    countryCode: "US",
    admin1: MI,
    regionSlug: RS,
    near: { ...DETROIT, km: 25 },
    species: ["walleye", "northern-pike"],
    closed: [],
    water: ["lakes"],
    note: "Walleye and northern pike are open all year in Lake St. Clair, the St. Clair River, the Detroit River and the Lower Peninsula Great Lakes; Lower Peninsula inland waters run from the last Saturday in April to 15 March, so a creek or inland lake near the city follows those dates.",
    regulator: MI_REG,
    source: MI_SRC,
    checked: CHECKED,
  },
  {
    id: "us-mi-detroit-bass-release",
    countryCode: "US",
    admin1: MI,
    regionSlug: RS,
    near: { ...DETROIT, km: 25 },
    species: ["largemouth-bass", "smallmouth-bass", "muskellunge"],
    closed: [],
    water: ["rivers", "lakes"],
    note: "Michigan lets anglers catch and immediately release bass and muskellunge all year; on Lake St. Clair, the St. Clair River and the Detroit River keeping bass is allowed from the third Saturday in June (20 June in 2026) to 31 December and keeping muskellunge from the first Saturday in June to 31 December (elsewhere bass from the Saturday before Memorial Day and muskellunge to 15 March).",
    regulator: MI_REG,
    source: MI_SRC,
    checked: CHECKED,
  },
  {
    id: "us-wi-milwaukee-lake-michigan-all-year",
    countryCode: "US",
    admin1: WI,
    regionSlug: RS,
    near: { ...MILWAUKEE, km: 25 },
    species: ["brown-trout", "rainbow-trout", "steelhead", "brook-trout", "lake-trout", "coho-salmon", "chinook-salmon"],
    closed: [],
    water: ["rivers", "lakes"],
    note: "Wisconsin lists trout and salmon in Lake Michigan and its tributaries as continuous (no closed season). Inland waters away from the lake use the inland trout dates.",
    regulator: WI_REG,
    source: "https://dnr.wisconsin.gov/topic/Fishing/seasons/trout",
    checked: CHECKED,
  },
  {
    id: "us-wi-milwaukee-lake-michigan-pike-all-year",
    countryCode: "US",
    admin1: WI,
    regionSlug: RS,
    near: { ...MILWAUKEE, km: 25 },
    species: ["northern-pike"],
    closed: [],
    water: ["lakes"],
    note: "Wisconsin's northern pike page lists Lake Michigan as continuous (no closed season); inland waters run from the first Saturday in May to the first Sunday in March.",
    regulator: WI_REG,
    source: "https://dnr.wisconsin.gov/topic/Fishing/seasons/npike",
    checked: CHECKED,
  },
  {
    id: "us-mn-minneapolis-all-year",
    countryCode: "US",
    admin1: MN,
    regionSlug: RS,
    near: { ...MINNEAPOLIS, km: 30 },
    species: ["black-crappie", "bluegill", "yellow-perch", "channel-catfish"],
    closed: [],
    water: ["rivers", "lakes"],
    note: "Open continuously in Minnesota's regulations: crappie, sunfish, perch and channel catfish.",
    regulator: MN_REG,
    source: MN_SRC,
    checked: CHECKED,
  },

  // ======================================== Ontario ========================================
  // ---- FMZ 19: Windsor ----
  {
    id: "ca-on-fmz19-bass",
    countryCode: "CA",
    admin1: ON,
    regionSlug: RS,
    ...FMZ19_AT,
    species: ["smallmouth-bass", "largemouth-bass"],
    closed: [{ from: "12-01", to: "06-26" }],
    note:
      "Smallmouth and largemouth bass (one combined limit) are open from the fourth Saturday in June (27 June in 2026) to 30 November. Ontario's summary says it is illegal to try to catch a fish whose season is closed, even to release it." +
      FMZ19_END,
    regulator: FMZ19_REG,
    source: FMZ19_SRC,
    checked: CHECKED,
  },
  {
    id: "ca-on-fmz19-muskellunge",
    countryCode: "CA",
    admin1: ON,
    regionSlug: RS,
    ...FMZ19_AT,
    species: ["muskellunge"],
    closed: [{ from: "12-16", to: "06-05" }],
    note:
      "Muskellunge is open from the first Saturday in June (6 June in 2026) to 15 December; one fish a day on a sport licence, which must be longer than 112 cm, none on a conservation licence." +
      FMZ19_END,
    regulator: FMZ19_REG,
    source: FMZ19_SRC,
    checked: CHECKED,
  },
  {
    id: "ca-on-fmz19-lake-trout",
    countryCode: "CA",
    admin1: ON,
    regionSlug: RS,
    ...FMZ19_AT,
    species: ["lake-trout"],
    closed: [{ from: "10-01", to: "11-30" }],
    water: ["lakes"],
    note: "Lake trout is open from 1 January to 30 September and from 1 December to 31 December, and closed from 1 October to 30 November." + FMZ19_END,
    regulator: FMZ19_REG,
    source: FMZ19_SRC,
    checked: CHECKED,
  },
  {
    id: "ca-on-fmz19-open-all-year",
    countryCode: "CA",
    admin1: ON,
    regionSlug: RS,
    ...FMZ19_AT,
    species: [],
    closed: [],
    water: ["rivers", "lakes"],
    note:
      "Ontario's FMZ 19 page lists walleye and sauger, northern pike, brown trout, rainbow trout, Pacific salmon, Atlantic salmon (one fish, none on a conservation licence), lake whitefish, channel catfish, crappie, sunfish and yellow perch as open all year; lake sturgeon is closed all year. " +
      ON_LICENCE +
      "",
    regulator: FMZ19_REG,
    source: FMZ19_SRC,
    checked: CHECKED,
  },

  // ---- FMZ 16: London ----
  {
    id: "ca-on-fmz16-london-walleye",
    countryCode: "CA",
    admin1: ON,
    regionSlug: RS,
    near: { ...LONDON, km: 20 },
    species: ["walleye"],
    closed: [{ from: "03-16", to: "05-08" }],
    note:
      "Walleye and sauger are open from 1 January to 15 March and from the second Saturday in May (9 May in 2026) to 31 December; not more than one over 46 cm may be kept." + FMZ16_END,
    regulator: FMZ16_REG,
    source: FMZ16_SRC,
    checked: CHECKED,
  },
  {
    id: "ca-on-fmz16-london-pike",
    countryCode: "CA",
    admin1: ON,
    regionSlug: RS,
    near: { ...LONDON, km: 20 },
    species: ["northern-pike"],
    closed: [{ from: "04-01", to: "05-08" }],
    note: "Northern pike is open from 1 January to 31 March and from the second Saturday in May (9 May in 2026) to 31 December." + FMZ16_END,
    regulator: FMZ16_REG,
    source: FMZ16_SRC,
    checked: CHECKED,
  },
  {
    id: "ca-on-fmz16-london-muskellunge",
    countryCode: "CA",
    admin1: ON,
    regionSlug: RS,
    near: { ...LONDON, km: 20 },
    species: ["muskellunge"],
    closed: [{ from: "12-16", to: "06-05" }],
    note:
      "Muskellunge is open from the first Saturday in June (6 June in 2026) to 15 December; one fish a day on a sport licence, which must be longer than 91 cm (112 cm on the lower Thames below Chatham), none on a conservation licence." +
      FMZ16_END,
    regulator: FMZ16_REG,
    source: FMZ16_SRC,
    checked: CHECKED,
  },
  {
    id: "ca-on-fmz16-london-bass",
    countryCode: "CA",
    admin1: ON,
    regionSlug: RS,
    near: { ...LONDON, km: 20 },
    species: ["smallmouth-bass", "largemouth-bass"],
    closed: [{ from: "12-01", to: "06-26" }],
    note:
      "Smallmouth and largemouth bass (one combined limit) are open from the fourth Saturday in June (27 June in 2026) to 30 November. Ontario's summary says it is illegal to try to catch a fish whose season is closed, even to release it." +
      FMZ16_END,
    regulator: FMZ16_REG,
    source: FMZ16_SRC,
    checked: CHECKED,
  },
  {
    id: "ca-on-fmz16-london-lake-trout",
    countryCode: "CA",
    admin1: ON,
    regionSlug: RS,
    near: { ...LONDON, km: 20 },
    species: ["lake-trout"],
    closed: [{ from: "10-01", to: "12-31" }],
    water: ["lakes"],
    note: "Lake trout is open from 1 January to 30 September in FMZ 16 and closed from 1 October to 31 December." + FMZ16_END,
    regulator: FMZ16_REG,
    source: FMZ16_SRC,
    checked: CHECKED,
  },
  {
    id: "ca-on-fmz16-london-notes",
    countryCode: "CA",
    admin1: ON,
    regionSlug: RS,
    near: { ...LONDON, km: 20 },
    species: [],
    closed: [],
    water: ["rivers", "lakes"],
    note:
      "Ontario's FMZ 16 page sets brook, brown and rainbow trout and Pacific and Atlantic salmon from the fourth Saturday in April (25 April in 2026) to 30 September, but lists brown trout and rainbow trout as open all year on the North Thames River main branch in Middlesex County, and Atlantic salmon, brown trout, Pacific salmon and rainbow trout as open all year on the Thames main branch. Yellow perch, channel catfish, crappie, sunfish and lake whitefish are open all year. " +
      ON_LICENCE,
    regulator: FMZ16_REG,
    source: FMZ16_SRC,
    checked: CHECKED,
  },

  {
    id: "ca-on-fmz16-toronto-rivers-walleye",
    countryCode: "CA",
    admin1: ON,
    regionSlug: RS,
    near: { ...TORONTO, km: 30 },
    species: ["walleye"],
    closed: [{ from: "03-16", to: "05-08" }],
    water: ["rivers"],
    note: "Walleye and sauger are open from 1 January to 15 March and from the second Saturday in May (9 May in 2026) to 31 December in FMZ 16." + FMZ16_TRIB_END,
    regulator: FMZ16_REG,
    source: FMZ16_SRC,
    checked: CHECKED,
  },
  {
    id: "ca-on-fmz16-toronto-rivers-pike",
    countryCode: "CA",
    admin1: ON,
    regionSlug: RS,
    near: { ...TORONTO, km: 30 },
    species: ["northern-pike"],
    closed: [{ from: "04-01", to: "05-08" }],
    water: ["rivers"],
    note: "Northern pike is open from 1 January to 31 March and from the second Saturday in May (9 May in 2026) to 31 December in FMZ 16." + FMZ16_TRIB_END,
    regulator: FMZ16_REG,
    source: FMZ16_SRC,
    checked: CHECKED,
  },
  {
    id: "ca-on-fmz16-toronto-rivers-muskellunge",
    countryCode: "CA",
    admin1: ON,
    regionSlug: RS,
    near: { ...TORONTO, km: 30 },
    species: ["muskellunge"],
    closed: [{ from: "12-16", to: "06-05" }],
    water: ["rivers"],
    note: "Muskellunge is open from the first Saturday in June (6 June in 2026) to 15 December in FMZ 16; it must be longer than 91 cm, one a day on a sport licence, none on a conservation licence." + FMZ16_TRIB_END,
    regulator: FMZ16_REG,
    source: FMZ16_SRC,
    checked: CHECKED,
  },
  {
    id: "ca-on-fmz16-toronto-rivers-bass",
    countryCode: "CA",
    admin1: ON,
    regionSlug: RS,
    near: { ...TORONTO, km: 30 },
    species: ["smallmouth-bass", "largemouth-bass"],
    closed: [{ from: "12-01", to: "06-26" }],
    water: ["rivers"],
    note: "Smallmouth and largemouth bass (one combined limit) are open from the fourth Saturday in June (27 June in 2026) to 30 November in FMZ 16." + FMZ16_TRIB_END,
    regulator: FMZ16_REG,
    source: FMZ16_SRC,
    checked: CHECKED,
  },
  {
    id: "ca-on-fmz16-hamilton-rivers-walleye",
    countryCode: "CA",
    admin1: ON,
    regionSlug: RS,
    near: { ...HAMILTON, km: 20 },
    species: ["walleye"],
    closed: [{ from: "03-16", to: "05-08" }],
    water: ["rivers"],
    note: "Walleye and sauger are open from 1 January to 15 March and from the second Saturday in May (9 May in 2026) to 31 December in FMZ 16." + FMZ16_TRIB_END +
      " On the Grand River downstream of the Onondaga–Tuscarora township line (Caledonia and below) the page gives walleye and northern pike a different season: open 1 January to the last day of February and from the second Saturday in May to 31 December.",
    regulator: FMZ16_REG,
    source: FMZ16_SRC,
    checked: CHECKED,
  },
  {
    id: "ca-on-fmz16-hamilton-rivers-pike",
    countryCode: "CA",
    admin1: ON,
    regionSlug: RS,
    near: { ...HAMILTON, km: 20 },
    species: ["northern-pike"],
    closed: [{ from: "04-01", to: "05-08" }],
    water: ["rivers"],
    note: "Northern pike is open from 1 January to 31 March and from the second Saturday in May (9 May in 2026) to 31 December in FMZ 16." + FMZ16_TRIB_END +
      " On the Grand River downstream of the Onondaga–Tuscarora township line (Caledonia and below) the page gives walleye and northern pike a different season: open 1 January to the last day of February and from the second Saturday in May to 31 December.",
    regulator: FMZ16_REG,
    source: FMZ16_SRC,
    checked: CHECKED,
  },
  {
    id: "ca-on-fmz16-hamilton-rivers-muskellunge",
    countryCode: "CA",
    admin1: ON,
    regionSlug: RS,
    near: { ...HAMILTON, km: 20 },
    species: ["muskellunge"],
    closed: [{ from: "12-16", to: "06-05" }],
    water: ["rivers"],
    note: "Muskellunge is open from the first Saturday in June (6 June in 2026) to 15 December in FMZ 16; it must be longer than 91 cm, one a day on a sport licence, none on a conservation licence." + FMZ16_TRIB_END,
    regulator: FMZ16_REG,
    source: FMZ16_SRC,
    checked: CHECKED,
  },
  {
    id: "ca-on-fmz16-hamilton-rivers-bass",
    countryCode: "CA",
    admin1: ON,
    regionSlug: RS,
    near: { ...HAMILTON, km: 20 },
    species: ["smallmouth-bass", "largemouth-bass"],
    closed: [{ from: "12-01", to: "06-26" }],
    water: ["rivers"],
    note: "Smallmouth and largemouth bass (one combined limit) are open from the fourth Saturday in June (27 June in 2026) to 30 November in FMZ 16." + FMZ16_TRIB_END,
    regulator: FMZ16_REG,
    source: FMZ16_SRC,
    checked: CHECKED,
  },

  {
    id: "ca-on-fmz16-toronto-rivers-notes",
    countryCode: "CA",
    admin1: ON,
    regionSlug: RS,
    near: { ...TORONTO, km: 30 },
    species: [],
    closed: [],
    water: ["rivers"],
    note:
      "Ontario's FMZ 16 page sets brown trout, rainbow trout, Pacific and Atlantic salmon from the fourth Saturday in April (25 April in 2026) to 30 September across the zone, but lists the lower reaches of named Lake Ontario tributaries (among them the Credit, Don, Humber, Rouge and Grindstone) as open all year for those fish, and gives their upstream reaches a longer season to 31 December. It also names fish sanctuaries in parts of the Credit, Humber and Grindstone that close in autumn, so read the page for the stretch you fish before you go. " +
      ON_LICENCE,
    regulator: FMZ16_REG,
    source: FMZ16_SRC,
    checked: CHECKED,
  },
  {
    id: "ca-on-fmz16-hamilton-rivers-notes",
    countryCode: "CA",
    admin1: ON,
    regionSlug: RS,
    near: { ...HAMILTON, km: 20 },
    species: [],
    closed: [],
    water: ["rivers"],
    note:
      "Ontario's FMZ 16 page sets brown trout, rainbow trout, Pacific and Atlantic salmon from the fourth Saturday in April (25 April in 2026) to 30 September across the zone, but lists the lower reaches of named Lake Ontario tributaries (among them the Credit, Don, Humber, Rouge and Grindstone) as open all year for those fish, and gives their upstream reaches a longer season to 31 December. It also names fish sanctuaries in parts of the Credit, Humber and Grindstone that close in autumn, so read the page for the stretch you fish before you go. " +
      ON_LICENCE,
    regulator: FMZ16_REG,
    source: FMZ16_SRC,
    checked: CHECKED,
  },

  // ---- FMZ 20: Toronto, Hamilton, Niagara-on-the-Lake, Kingston (open-all-year species, licence) ----
  {
    id: "ca-on-fmz20-open-all-year",
    countryCode: "CA",
    admin1: ON,
    regionSlug: RS,
    box: FMZ20_BOX,
    species: [],
    closed: [],
    water: ["rivers", "lakes"],
    note:
      "Ontario's FMZ 20 page lists brown trout, rainbow trout, Pacific salmon, lake whitefish, channel catfish, crappie, sunfish and yellow perch as open all year, Atlantic salmon as open all year (one fish over 63 cm, none on a conservation licence), and lake sturgeon as closed all year. FMZ 20 is Lake Ontario and connected waters; Ontario's FMZ 16 page lists the lower Credit, Don, Humber and Rouge among its own named waters, with different dates. " +
      ON_LICENCE,
    regulator: "Ontario MNRF (FMZ 20)",
    source: FMZ20_SRC,
    checked: CHECKED,
  },

  // ---- FMZ 18 and 20: Kingston (sources and reasons above, by FMZ18_SRC) ----
  {
    id: "ca-on-fmz18-fmz20-kingston-all-year",
    countryCode: "CA",
    admin1: ON,
    regionSlug: RS,
    near: { ...KINGSTON, km: 25 },
    species: ["yellow-perch", "channel-catfish", "black-crappie", "bluegill", "lake-whitefish", "brown-trout", "rainbow-trout", "steelhead", "chinook-salmon", "coho-salmon"],
    closed: [],
    water: ["rivers", "lakes"],
    note: "Open all year on both the FMZ 18 page (Kingston's inland lakes, rivers and creeks) and the FMZ 20 page (Lake Ontario and the St. Lawrence): yellow perch, channel catfish, crappie, sunfish, lake whitefish, brown trout, rainbow trout and Pacific salmon.",
    regulator: "Ontario MNRF (FMZ 18 and 20)",
    source: FMZ18_SRC,
    checked: "2026-11-14",
  },
  {
    id: "ca-on-fmz18-kingston-streams-brook-trout",
    countryCode: "CA",
    admin1: ON,
    regionSlug: RS,
    near: { ...KINGSTON, km: 25 },
    species: ["brook-trout"],
    closed: [],
    water: ["rivers"],
    note: "Brook trout and splake are open all year in FMZ 18." + FMZ18_KINGSTON_END + " FMZ 20 closes brook trout and splake all year.",
    regulator: FMZ18_REG,
    source: FMZ18_SRC,
    checked: "2026-11-14",
  },
  {
    id: "ca-on-fmz18-kingston-streams-walleye",
    countryCode: "CA",
    admin1: ON,
    regionSlug: RS,
    near: { ...KINGSTON, km: 25 },
    species: ["walleye"],
    closed: [{ from: "03-02", to: "05-08" }],
    water: ["rivers"],
    note: "Walleye and sauger are open in FMZ 18 from 1 January to 1 March and from the second Saturday in May (9 May in 2026) to 31 December." + FMZ18_KINGSTON_END,
    regulator: FMZ18_REG,
    source: FMZ18_SRC,
    checked: "2026-11-14",
  },
  {
    id: "ca-on-fmz18-kingston-streams-pike",
    countryCode: "CA",
    admin1: ON,
    regionSlug: RS,
    near: { ...KINGSTON, km: 25 },
    species: ["northern-pike"],
    closed: [{ from: "04-01", to: "05-08" }],
    water: ["rivers"],
    note: "Northern pike is open in FMZ 18 from 1 January to 31 March and from the second Saturday in May (9 May in 2026) to 31 December." + FMZ18_KINGSTON_END,
    regulator: FMZ18_REG,
    source: FMZ18_SRC,
    checked: "2026-11-14",
  },
  {
    id: "ca-on-fmz18-kingston-streams-bass",
    countryCode: "CA",
    admin1: ON,
    regionSlug: RS,
    near: { ...KINGSTON, km: 25 },
    species: ["smallmouth-bass", "largemouth-bass"],
    closed: [{ from: "12-16", to: "06-19" }],
    water: ["rivers"],
    note: "Largemouth and smallmouth bass (one combined limit) are open in FMZ 18 from the third Saturday in June (20 June in 2026) to 15 December." + FMZ18_KINGSTON_END,
    regulator: FMZ18_REG,
    source: FMZ18_SRC,
    checked: "2026-11-14",
  },
  {
    id: "ca-on-fmz18-kingston-streams-muskellunge",
    countryCode: "CA",
    admin1: ON,
    regionSlug: RS,
    near: { ...KINGSTON, km: 25 },
    species: ["muskellunge"],
    closed: [{ from: "12-16", to: "06-05" }],
    water: ["rivers"],
    note: "Muskellunge is open in FMZ 18 from the first Saturday in June (6 June in 2026) to 15 December." + FMZ18_KINGSTON_END,
    regulator: FMZ18_REG,
    source: FMZ18_SRC,
    checked: "2026-11-14",
  },
  {
    id: "ca-on-fmz18-kingston-streams-atlantic-salmon",
    countryCode: "CA",
    admin1: ON,
    regionSlug: RS,
    near: { ...KINGSTON, km: 25 },
    species: ["atlantic-salmon"],
    closed: [{ from: "01-01", to: "12-31" }],
    water: ["rivers"],
    note: "Atlantic salmon is closed all year in FMZ 18." + FMZ18_KINGSTON_END,
    regulator: FMZ18_REG,
    source: FMZ18_SRC,
    checked: "2026-11-14",
  },
  // Kingston's lake cards hold FMZ 18 and FMZ 20 waters together. These rows close a fish only on the days both zones close it, and the label's date
  //   is the first day either zone reopens it; the note says when the other zone reopens. Bass from 1 January to 10 May may be fished catch and
  //   release in Lake Ontario but not at all on the inland lakes: release-only days, with the inland closure in the note. (Fish-seasons check,
  //   14 November 2026: without these rows the April lake cards listed walleye, pike and bass as in season, when no Kingston water was open to them.)
  {
    id: "ca-on-fmz18-fmz20-kingston-lakes-walleye",
    countryCode: "CA",
    admin1: ON,
    regionSlug: RS,
    near: { ...KINGSTON, km: 25 },
    species: ["walleye"],
    closed: [{ from: "03-02", to: "05-01" }],
    water: ["lakes"],
    note: "Walleye and sauger are closed in both of Kingston's zones from 2 March: Lake Ontario (FMZ 20) reopens on the first Saturday in May (2 May in 2026), the inland lakes (FMZ 18) on the second Saturday (9 May).",
    regulator: "Ontario MNRF (FMZ 18 and 20)",
    source: FMZ18_SRC,
    checked: "2026-11-14",
  },
  {
    id: "ca-on-fmz18-fmz20-kingston-lakes-pike",
    countryCode: "CA",
    admin1: ON,
    regionSlug: RS,
    near: { ...KINGSTON, km: 25 },
    species: ["northern-pike"],
    closed: [{ from: "04-01", to: "05-01" }],
    water: ["lakes"],
    note: "Northern pike is closed in both of Kingston's zones from 1 April: Lake Ontario (FMZ 20) reopens on the first Saturday in May (2 May in 2026), the inland lakes (FMZ 18) on the second Saturday (9 May).",
    regulator: "Ontario MNRF (FMZ 18 and 20)",
    source: FMZ18_SRC,
    checked: "2026-11-14",
  },
  {
    id: "ca-on-fmz18-fmz20-kingston-lakes-bass",
    countryCode: "CA",
    admin1: ON,
    regionSlug: RS,
    near: { ...KINGSTON, km: 25 },
    species: ["smallmouth-bass", "largemouth-bass"],
    closed: [{ from: "05-11", to: "06-19" }],
    noKeep: [{ from: "01-01", to: "05-10" }],
    water: ["lakes"],
    note: "Bass in Kingston's still waters: on Lake Ontario (FMZ 20) catch and release only from 1 January to 10 May, then closed until the third Saturday in June (20 June in 2026) for largemouth and the first Saturday in July (4 July) for smallmouth, open to 31 December. On the inland lakes (FMZ 18) bass are closed from 16 December to the third Saturday in June (20 June), even to catch and release, and open to 15 December.",
    regulator: "Ontario MNRF (FMZ 18 and 20)",
    source: FMZ18_SRC,
    checked: "2026-11-14",
  },
  {
    id: "ca-on-fmz18-fmz20-kingston-lakes-muskellunge",
    countryCode: "CA",
    admin1: ON,
    regionSlug: RS,
    near: { ...KINGSTON, km: 25 },
    species: ["muskellunge"],
    closed: [{ from: "12-16", to: "06-05" }],
    water: ["lakes"],
    note: "Muskellunge is closed in both of Kingston's zones from 16 December: the inland lakes (FMZ 18) reopen on the first Saturday in June (6 June in 2026), Lake Ontario (FMZ 20) on the third Saturday (20 June).",
    regulator: "Ontario MNRF (FMZ 18 and 20)",
    source: FMZ18_SRC,
    checked: "2026-11-14",
  },
  {
    id: "ca-on-fmz18-fmz20-kingston-lakes-lake-trout",
    countryCode: "CA",
    admin1: ON,
    regionSlug: RS,
    near: { ...KINGSTON, km: 25 },
    species: ["lake-trout"],
    closed: [{ from: "10-01", to: "11-30" }],
    water: ["lakes"],
    note: "Lake trout is closed in both of Kingston's zones from 1 October to 30 November. Lake Ontario (FMZ 20) reopens on 1 December; the inland lakes (FMZ 18) stay closed until the fourth Saturday in May (23 May in 2026) and close again after 8 September.",
    regulator: "Ontario MNRF (FMZ 18 and 20)",
    source: FMZ18_SRC,
    checked: "2026-11-14",
  },
  {
    id: "ca-on-fmz18-fmz20-kingston-lakes-notes",
    countryCode: "CA",
    admin1: ON,
    regionSlug: RS,
    near: { ...KINGSTON, km: 25 },
    species: [],
    closed: [],
    water: ["lakes"],
    note:
      "Kingston's still waters fall in two zones with different dates, so only the days both zones close a fish are loaded as closed dates. Lake Ontario and the St. Lawrence (FMZ 20): walleye open 1 January to 1 March and from the first Saturday in May (2 May in 2026); pike 1 January to 31 March and from 2 May; largemouth and smallmouth bass catch and release only from 1 January to 10 May, then closed until the third Saturday in June (largemouth, 20 June) or the first Saturday in July (smallmouth, 4 July), open to 31 December; muskellunge 20 June to 15 December; lake trout closed 1 October to 30 November; brook trout closed all year; Atlantic salmon open all year (one over 63 cm). Inland lakes such as Inverary and Lacey (FMZ 18): walleye and pike open from the second Saturday in May (9 May in 2026); bass 20 June to 15 December; muskellunge from the first Saturday in June (6 June) to 15 December; lake trout from the fourth Saturday in May (23 May) to 8 September; brook trout open all year; Atlantic salmon closed all year. " +
      ON_LICENCE,
    regulator: "Ontario MNRF (FMZ 18 and 20)",
    source: FMZ18_SRC,
    checked: "2026-11-14",
  },
  // Niagara-on-the-Lake's river cards hold the Niagara (FMZ 20) and FMZ 16 creeks together: as at Kingston, a fish is closed only on the days both
  //   zones close it, and the label's date is the first day either zone reopens it; the note gives the other zone's date.
  {
    id: "ca-on-fmz16-fmz20-niagara-on-the-lake-rivers-walleye",
    countryCode: "CA",
    admin1: ON,
    regionSlug: RS,
    near: { ...NIAGARA_ON_THE_LAKE, km: 15 },
    species: ["walleye"],
    closed: [{ from: "03-16", to: "05-01" }],
    water: ["rivers"],
    note: "Walleye and sauger are closed on both the Niagara River (FMZ 20, from 2 March) and the creeks (FMZ 16, from 16 March); the Niagara reopens on the first Saturday in May (2 May in 2026), the creeks on the second Saturday (9 May).",
    regulator: "Ontario MNRF (FMZ 16 and 20)",
    source: FMZ16_SRC,
    checked: "2026-11-14",
  },
  {
    id: "ca-on-fmz16-fmz20-niagara-on-the-lake-rivers-pike",
    countryCode: "CA",
    admin1: ON,
    regionSlug: RS,
    near: { ...NIAGARA_ON_THE_LAKE, km: 15 },
    species: ["northern-pike"],
    closed: [{ from: "04-01", to: "05-01" }],
    water: ["rivers"],
    note: "Northern pike is closed on both the Niagara River (FMZ 20) and the creeks (FMZ 16) from 1 April; the Niagara reopens on the first Saturday in May (2 May in 2026), the creeks on the second Saturday (9 May).",
    regulator: "Ontario MNRF (FMZ 16 and 20)",
    source: FMZ16_SRC,
    checked: "2026-11-14",
  },
  {
    id: "ca-on-fmz16-fmz20-niagara-on-the-lake-rivers-largemouth",
    countryCode: "CA",
    admin1: ON,
    regionSlug: RS,
    near: { ...NIAGARA_ON_THE_LAKE, km: 15 },
    species: ["largemouth-bass"],
    closed: [{ from: "05-11", to: "06-19" }],
    noKeep: [{ from: "01-01", to: "05-10" }],
    water: ["rivers"],
    note: "Largemouth bass: on the Niagara River (FMZ 20) catch and release only from 1 January to 10 May, then closed until the third Saturday in June (20 June in 2026). On the creeks (FMZ 16) bass are closed from 1 December to the fourth Saturday in June (27 June), even to catch and release, and open to 30 November.",
    regulator: "Ontario MNRF (FMZ 16 and 20)",
    source: FMZ16_SRC,
    checked: "2026-11-14",
  },
  {
    id: "ca-on-fmz16-fmz20-niagara-on-the-lake-rivers-smallmouth",
    countryCode: "CA",
    admin1: ON,
    regionSlug: RS,
    near: { ...NIAGARA_ON_THE_LAKE, km: 15 },
    species: ["smallmouth-bass"],
    closed: [{ from: "05-11", to: "06-26" }],
    noKeep: [{ from: "01-01", to: "05-10" }],
    water: ["rivers"],
    note: "Smallmouth bass: on the Niagara River (FMZ 20) catch and release only from 1 January to 10 May, then closed until the first Saturday in July (4 July in 2026). On the creeks (FMZ 16) bass are closed from 1 December to the fourth Saturday in June (27 June), even to catch and release, and open to 30 November.",
    regulator: "Ontario MNRF (FMZ 16 and 20)",
    source: FMZ16_SRC,
    checked: "2026-11-14",
  },
  {
    id: "ca-on-fmz16-fmz20-niagara-on-the-lake-rivers-muskellunge",
    countryCode: "CA",
    admin1: ON,
    regionSlug: RS,
    near: { ...NIAGARA_ON_THE_LAKE, km: 15 },
    species: ["muskellunge"],
    closed: [{ from: "12-16", to: "06-05" }],
    water: ["rivers"],
    note: "Muskellunge is closed on both the Niagara River (FMZ 20) and the creeks (FMZ 16) from 16 December; the creeks reopen on the first Saturday in June (6 June in 2026), the Niagara on the third Saturday (20 June).",
    regulator: "Ontario MNRF (FMZ 16 and 20)",
    source: FMZ16_SRC,
    checked: "2026-11-14",
  },
  {
    id: "ca-on-fmz16-fmz20-niagara-on-the-lake-rivers-brook-trout",
    countryCode: "CA",
    admin1: ON,
    regionSlug: RS,
    near: { ...NIAGARA_ON_THE_LAKE, km: 15 },
    species: ["brook-trout"],
    closed: [{ from: "10-01", to: "04-24" }],
    water: ["rivers"],
    note: "Brook trout is closed all year on the Niagara River (FMZ 20); on the creeks (FMZ 16) it is open from the fourth Saturday in April (25 April in 2026) to 30 September.",
    regulator: "Ontario MNRF (FMZ 16 and 20)",
    source: FMZ16_SRC,
    checked: "2026-11-14",
  },
  {
    id: "ca-on-fmz16-fmz20-niagara-on-the-lake-rivers-notes",
    countryCode: "CA",
    admin1: ON,
    regionSlug: RS,
    near: { ...NIAGARA_ON_THE_LAKE, km: 15 },
    species: [],
    closed: [],
    water: ["rivers"],
    note:
      "The Niagara River below the falls is FMZ 20; the creeks at Niagara-on-the-Lake (Four Mile, Two Mile, the Welland River) are FMZ 16, with different dates, so only the days both zones close a fish are loaded as closed dates. FMZ 20 (the Niagara): walleye open 1 January to 1 March and from the first Saturday in May (2 May in 2026); pike 1 January to 31 March and from 2 May; bass catch and release only from 1 January to 10 May, then open from the third Saturday in June (largemouth, 20 June) or the first Saturday in July (smallmouth, 4 July); muskellunge 20 June to 15 December; brown and rainbow trout and salmon open all year; brook trout closed all year. FMZ 16 (the creeks): walleye open 1 January to 15 March and from the second Saturday in May (9 May); pike 1 January to 31 March and from 9 May; bass from the fourth Saturday in June (27 June) to 30 November; muskellunge from the first Saturday in June (6 June) to 15 December; brook, brown and rainbow trout and salmon from the fourth Saturday in April (25 April) to 30 September, except the lower Fifteen, Sixteen and Twenty Mile creeks below the QEW, open all year, and Twelve Mile Creek below Lakeport Road, which is FMZ 20. " +
      ON_LICENCE,
    regulator: "Ontario MNRF (FMZ 16 and 20)",
    source: FMZ16_SRC,
    checked: "2026-11-14",
  },

  // ======================================== Quebec ========================================
  // ---- Zone 8: Montreal ----
  {
    id: "ca-qc-z8-striped-bass",
    countryCode: "CA",
    admin1: QC,
    regionSlug: RS,
    near: { ...MONTREAL, km: 25 },
    species: ["striped-bass"],
    closed: [{ from: "01-01", to: "12-31" }],
    note: "Quebec's zone 8 page marks striped bass \"Fishing prohibited\" for the whole 2026 season.",
    regulator: QC8_REG,
    source: QC8_SRC,
    checked: CHECKED,
  },
  {
    id: "ca-qc-z8-open-all-year",
    countryCode: "CA",
    admin1: QC,
    regionSlug: RS,
    near: { ...MONTREAL, km: 25 },
    species: [],
    closed: [],
    water: ["rivers", "lakes"],
    note:
      "Quebec's zone 8 page gives zone-wide open periods for 2026, but it lists the Montreal-area waters (Lac Saint-Louis, the St. Lawrence from the Honoré-Mercier bridge to Tracy, the Rivière des Prairies, the Rivière des Mille Îles, Lac des Deux Montagnes and the Lachine canal) as regulatory exceptions, and their rules are not loaded here, so no open or closed dates are shown for these waters; check the zone's grid for the water you fish. For 2026-27 the page lists black crappie (30), rainbow smelt (120) and shad (5) from 1 April 2026 to 31 March 2027, and \"other species\" (those it does not name) with no limit. In Quebec a fishing licence is mandatory (with some exceptions); carry it with government-issued photo ID.",
    regulator: QC8_REG,
    source: QC8_SRC,
    checked: CHECKED,
  },

  // ---- Zone 6: Sherbrooke ----
  {
    id: "ca-qc-z6-striped-bass",
    countryCode: "CA",
    admin1: QC,
    regionSlug: RS,
    near: { ...SHERBROOKE, km: 20 },
    species: ["striped-bass"],
    closed: [{ from: "01-01", to: "12-31" }],
    note: "Quebec's zone 6 page marks striped bass (and sturgeon and copper redhorse) \"Fishing prohibited\" from 1 April 2026 to 31 March 2027.",
    regulator: QC6_REG,
    source: QC6_SRC,
    checked: CHECKED,
  },
  {
    id: "ca-qc-z6-notes",
    countryCode: "CA",
    admin1: QC,
    regionSlug: RS,
    near: { ...SHERBROOKE, km: 20 },
    species: [],
    closed: [],
    water: ["rivers", "lakes"],
    note: "Quebec's zone 6 page gives zone-wide open periods for 2026, but it lists the Magog and Saint-François rivers and lakes Memphrémagog, Massawippi and Magog among its regulatory exceptions, and their rules are not loaded here, so no open or closed dates are shown for these waters; check the zone's grid for the water you fish.",
    regulator: QC6_REG,
    source: QC6_SRC,
    checked: CHECKED,
  },
  {
    id: "ca-qc-z6-licence",
    countryCode: "CA",
    admin1: QC,
    regionSlug: RS,
    near: { ...SHERBROOKE, km: 20 },
    species: [],
    closed: [],
    water: ["rivers", "lakes"],
    note: "In Quebec a fishing licence is mandatory (with some exceptions); carry it with government-issued photo ID.",
    regulator: "Québec government (sport fishing licence)",
    source: "https://www.quebec.ca/en/tourism-recreation-sport/sporting-and-outdoor-activities/sport-fishing/fishing-licence",
    checked: CHECKED,
  },

  // ======================================== United States ========================================
  // ---- Vermont: Burlington (Lake Champlain) ----
  // source: Vermont Fish & Wildlife Board Fish Management Rule, 10 V.S.A. Appendix § 122 ("2025 Fish and Wildlife Reg., eff. Jan. 1, 2026"),
  //   read 2 November 2026 — §7.6(r) walleye, "General Waters and Lake Champlain": "First Saturday in May through March 15";
  //   §7.6(q) black bass, Lake Champlain, open-water fishing: "Second Saturday in June through Nov. 30" (general waters:
  //   "Second Saturday in June through March 15"); the catch-and-release row "Dec. 1 through the Friday before the second Saturday in
  //   June" names 16 listed waters and not Lake Champlain; Lake Champlain brook, brown and rainbow trout, lake trout and landlocked
  //   salmon, northern pike, yellow perch, muskellunge: "No closed season" (muskellunge catch and release with artificial lures and
  //   flies only); sauger and sturgeon: no open season.
  {
    id: "us-vt-walleye",
    countryCode: "US",
    admin1: VT,
    regionSlug: RS,
    near: { ...BURLINGTON, km: 25 },
    species: ["walleye"],
    closed: [{ from: "03-16", to: "05-01" }],
    note: "Vermont's rule sets the walleye season from the first Saturday in May (2 May in 2026) through 15 March, for general waters and Lake Champlain alike; minimum length 18 inches.",
    regulator: VT_REG,
    source: VT_SRC,
    checked: CHECKED,
  },
  {
    id: "us-vt-champlain-bass",
    countryCode: "US",
    admin1: VT,
    regionSlug: RS,
    near: { ...BURLINGTON, km: 25 },
    species: ["smallmouth-bass", "largemouth-bass"],
    closed: [],
    water: ["lakes"],
    note: "On Lake Champlain Vermont's rule sets the open-water bass harvest season from the second Saturday in June (13 June in 2026) through 30 November. Vermont Fish & Wildlife's own pages allow catch and release with artificial lures in open water all year, so no closed days are loaded for Lake Champlain bass; other Vermont lakes follow the general-waters rows, which run to 15 March.",
    regulator: VT_REG,
    source: VT_SRC,
    checked: CHECKED,
  },
  {
    id: "us-vt-champlain-open",
    countryCode: "US",
    admin1: VT,
    regionSlug: RS,
    near: { ...BURLINGTON, km: 25 },
    species: [],
    closed: [],
    water: ["lakes"],
    note: "Vermont's rule lists no closed season on Lake Champlain for brook, brown and rainbow trout, lake trout, landlocked salmon, northern pike and yellow perch. Muskellunge on the lake must be released (catch and release, artificial lures and flies only), and sauger has no open season (the bag limit for sturgeon is zero).",
    regulator: VT_REG,
    source: VT_SRC,
    checked: CHECKED,
  },

  // ---- New Hampshire: Concord ----
  // source: NH Fish and Game, "Fishing Seasons in NH", read 2 November 2026 — lake trout "All waters: January 1 to September 30";
  //   landlocked salmon April 1 to September 30; trout in rivers and streams January 1 to October 15, trout ponds 4th Saturday in
  //   April to October 15, all other waters no closed season; bass in rivers and streams January 1 to October 15, trout ponds 4th
  //   Saturday in April to October 15, catch and release May 15 to June 15 in every category.
  // source: NH Fish and Game, "NH Rivers and Streams Stocked with Trout and Open Year Round" (no date on page; read 2 November 2026) —
  //   "Merrimack River from the confluence of the Winnipesaukee River and the Pemigewasset River to the NH/MA border" and two
  //   Contoocook River segments are among the "Locations Where Anglers Can Fish for Stocked Trout All Year".
  //   https://www.wildlife.nh.gov/fishing-new-hampshire/trout-fishing-new-hampshire/nh-rivers-and-streams-stocked-trout-and-open-year
  {
    id: "us-nh-lake-trout",
    countryCode: "US",
    admin1: NH,
    regionSlug: RS,
    near: { ...CONCORD, km: 25 },
    species: ["lake-trout"],
    closed: [{ from: "10-01", to: "12-31" }],
    note: "New Hampshire's seasons page gives lake trout January 1 to September 30 in all waters, with ice fishing only from January 1 to March 31.",
    regulator: NH_REG,
    source: NH_SRC,
    checked: CHECKED,
  },
  {
    id: "us-nh-concord-notes",
    countryCode: "US",
    admin1: NH,
    regionSlug: RS,
    near: { ...CONCORD, km: 25 },
    species: [],
    closed: [],
    water: ["rivers", "lakes"],
    note:
      "New Hampshire's season depends on the water's category. Its seasons page gives trout, bass and other species January 1 to October 15 in rivers and streams and the fourth Saturday in April to October 15 in trout ponds, with no closed season in \"all other waters\", and lists bass as catch and release from 15 May to 15 June. A separate Fish and Game page lists the Merrimack River from the Winnipesaukee-Pemigewasset confluence to the Massachusetts line, and parts of the Contoocook River, among the waters where stocked trout can be fished all year. Check the current NH Freshwater Fishing Digest for your water.",
    regulator: NH_REG,
    source: NH_SRC,
    checked: CHECKED,
  },

  // ---- New York: Albany (tidal Hudson) ----
  // source: NYS DEC, Statewide Regulations Effective April 1, 2026 — walleye, northern pike "May 1 - Mar 15"; muskellunge "Jun 1 - Nov 30";
  //   black bass "Jun 15 - Nov 30", Dec 1 - Jun 14 "Catch and release only. Artificial lures only"; brown and rainbow trout in lakes and
  //   ponds year-round; inland trout streams Apr 1 - Oct 15 (Oct 16 - Mar 31 catch and release, artificial lures only); lake trout Apr 1 - Oct 15;
  //   landlocked Atlantic salmon, crappie, yellow perch, sunfish, lake whitefish year-round; sauger and lake sturgeon closed.
  // source: NYS DEC, Region 4 special regulations — no different season for the Hudson at Albany (the all-year catch-and-release rule runs from Troy Dam
  //   upstream); Tidal Hudson River special regulations — black bass "June 15 through November 30", "Fishing, including catch and release,
  //   is prohibited December 1 through June 14"; striped bass north of the George Washington Bridge April 1 to November 30, fishing
  //   including catch and release prohibited December 1 through March 31 above the Mario M. Cuomo Bridge; the American eel entry runs
  //   "from the Battery to Troy Dam".
  {
    id: "us-ny-albany-hudson-bass",
    countryCode: "US",
    admin1: NY,
    regionSlug: RS,
    near: { ...ALBANY, km: 10 },
    species: ["smallmouth-bass", "largemouth-bass"],
    closed: [{ from: "12-01", to: "06-14" }],
    water: ["rivers"],
    note: "On the tidal Hudson River and its tributaries to the first barrier fish can reach, black bass are open from 15 June to 30 November; fishing for them, including catch and release, is prohibited from 1 December to 14 June. On most other New York waters (the statewide table, including the Hudson above the Troy dam and the Mohawk) bass are catch and release only, with artificial lures, from 1 December to 14 June.",
    regulator: NY_REG,
    source: NY_HUDSON_SRC,
    checked: CHECKED,
  },
  {
    id: "us-ny-albany-hudson-striped-bass",
    countryCode: "US",
    admin1: NY,
    regionSlug: RS,
    near: { ...ALBANY, km: 25 },
    species: ["striped-bass"],
    closed: [{ from: "12-01", to: "03-31" }],
    water: ["rivers"],
    note: "On the tidal Hudson River north of the George Washington Bridge, striped bass are open from 1 April to 30 November (one fish of 23 to 28 inches); fishing for them, including catch and release, is prohibited from 1 December to 31 March above the Mario M. Cuomo Bridge.",
    regulator: NY_REG,
    source: NY_HUDSON_SRC,
    checked: CHECKED,
  },
  {
    id: "us-ny-albany-pike-walleye",
    countryCode: "US",
    admin1: NY,
    regionSlug: RS,
    near: { ...ALBANY, km: 25 },
    species: ["northern-pike", "walleye"],
    closed: [{ from: "03-16", to: "04-30" }],
    note: "New York's statewide table sets walleye and northern pike from 1 May to 15 March (15 inch minimum for walleye, 18 inch for pike). The tidal Hudson page says statewide seasons apply to species it does not list.",
    regulator: NY_REG,
    source: NY_STATE_SRC,
    checked: CHECKED,
  },
  {
    id: "us-ny-albany-muskellunge",
    countryCode: "US",
    admin1: NY,
    regionSlug: RS,
    near: { ...ALBANY, km: 25 },
    species: ["muskellunge"],
    closed: [{ from: "12-01", to: "05-31" }],
    note: "New York's statewide table sets muskellunge from 1 June to 30 November (one fish, 40 inch minimum).",
    regulator: NY_REG,
    source: NY_STATE_SRC,
    checked: CHECKED,
  },
  // Re-read 14 November 2026 for the audit of 10 November (checkers of 14 November), which found Albany's lake brook trout shown with typical
  //   months only: the statewide table ("Statewide Regulations Effective April 1, 2026") gives "Brook Trout (in lakes and ponds)" "April 1 - Oct 15"
  //   (5 a day) and "Lake Trout" "April 1 - Oct 15" (21 inches, 3 a day), while brown and rainbow trout and splake in lakes and ponds are "All year".
  //   No Region 4 or tidal Hudson rule gives these fish other dates near Albany.
  {
    id: "us-ny-albany-lakes-brook-trout",
    countryCode: "US",
    admin1: NY,
    regionSlug: RS,
    near: { ...ALBANY, km: 25 },
    species: ["brook-trout"],
    closed: [{ from: "10-16", to: "03-31" }],
    water: ["lakes"],
    note: "New York's statewide table opens brook trout in lakes and ponds from 1 April to 15 October (5 a day), so they are closed from 16 October to 31 March. Brown and rainbow trout in lakes and ponds are open all year.",
    regulator: NY_REG,
    source: NY_STATE_SRC,
    checked: "2026-11-14",
  },
  {
    id: "us-ny-albany-lake-trout",
    countryCode: "US",
    admin1: NY,
    regionSlug: RS,
    near: { ...ALBANY, km: 25 },
    species: ["lake-trout"],
    closed: [{ from: "10-16", to: "03-31" }],
    note: "New York's statewide table opens lake trout from 1 April to 15 October (at least 21 inches, 3 a day), so it is closed from 16 October to 31 March.",
    regulator: NY_REG,
    source: NY_STATE_SRC,
    checked: "2026-11-14",
  },
  {
    id: "us-ny-albany-notes",
    countryCode: "US",
    admin1: NY,
    regionSlug: RS,
    near: { ...ALBANY, km: 25 },
    species: [],
    closed: [],
    water: ["rivers", "lakes"],
    note: "New York's statewide table gives brown and rainbow trout in lakes and ponds, crappie, yellow perch, sunfish and lake whitefish year-round, and trout in inland trout streams 1 April to 15 October (catch and release with artificial lures only from 16 October to 31 March). Lake trout is open 1 April to 15 October (21 inch minimum). Sauger and sturgeon are closed.",
    regulator: NY_REG,
    source: NY_STATE_SRC,
    checked: CHECKED,
  },

  // ---- New York: Buffalo (Lake Erie and the upper Niagara River) ----
  // source: NYS DEC, Great Lakes and Tributaries special regulations — Lake Erie and tributaries, upper Niagara River and tributaries:
  //   northern pike "May 1 - March 15", walleye "May 1 - March 15", muskellunge and tiger muskellunge "June 15 - December 15", brown
  //   and rainbow trout, coho and Chinook "All year", lake trout "All year"; Lake Erie black bass "December 1 - June 14" (20 inch minimum,
  //   one fish) and "June 15 - November 30" (12 inch, five fish). Buffalo River and Cattaraugus Creek: seasonal rules September 1 - March 31.
  {
    id: "us-ny-buffalo-pike-walleye",
    countryCode: "US",
    admin1: NY,
    regionSlug: RS,
    near: { ...BUFFALO, km: 25 },
    species: ["northern-pike", "walleye"],
    closed: [{ from: "03-16", to: "04-30" }],
    note: "In Lake Erie, the upper Niagara River and their tributaries, New York sets walleye and northern pike from 1 May to 15 March (walleye 15 inch minimum, six a day; pike 22 inch minimum, five a day).",
    regulator: NY_REG,
    source: NY_GL_SRC,
    checked: CHECKED,
  },
  {
    id: "us-ny-buffalo-muskellunge",
    countryCode: "US",
    admin1: NY,
    regionSlug: RS,
    near: { ...BUFFALO, km: 25 },
    species: ["muskellunge"],
    closed: [{ from: "12-16", to: "06-14" }],
    note: "In Lake Erie, the upper Niagara River and their tributaries, muskellunge and tiger muskellunge are open from 15 June to 15 December (one fish, 54 inch minimum). Inland waters elsewhere in New York use the statewide dates, 1 June to 30 November.",
    regulator: NY_REG,
    source: NY_GL_SRC,
    checked: CHECKED,
  },
  {
    id: "us-ny-buffalo-notes",
    countryCode: "US",
    admin1: NY,
    regionSlug: RS,
    near: { ...BUFFALO, km: 25 },
    species: [],
    closed: [],
    water: ["rivers", "lakes"],
    note: "New York lists brown trout, rainbow trout (including steelhead), coho and Chinook salmon and lake trout as open all year in Lake Erie and the upper Niagara River. Lake Erie black bass are open all year at two size and limit settings (one fish of 20 inches from 1 December to 14 June, five of 12 inches from 15 June to 30 November). On the Buffalo River and Cattaraugus Creek the tributary rules apply from 1 September to 31 March, in daylight only. The page gives lake trout in the lower Niagara River (Lewiston and below) as 1 December to 30 September, not all year.",
    regulator: NY_REG,
    source: NY_GL_SRC,
    checked: CHECKED,
  },

  // ---- Ohio: Cleveland ----
  // source: Ohio DNR, 2026-27 Ohio Fishing Regulations (Publication 5085, valid March 1, 2026 to February 28, 2027), read 2 November 2026 —
  //   Lake Erie black bass March 1 - April 30 five a day, May 1 - June 26 one a day (18 inch minimum), June 27 onward five; walleye, yellow perch,
  //   trout and salmon by date with changing daily limits; statewide inland: black bass, walleye, muskellunge, northern pike, trout with no closed season
  //   listed; state-endangered fish (including lake sturgeon) protected in all Ohio waters; brook trout may not be taken in the Ashtabula,
  //   Chagrin, Conneaut and Grand rivers and their tributaries.
  {
    id: "us-oh-cleveland-notes",
    countryCode: "US",
    admin1: OH,
    regionSlug: RS,
    near: { ...CLEVELAND, km: 30 },
    species: [],
    closed: [],
    water: ["rivers", "lakes"],
    note: "Ohio's 2026-27 fishing booklet lists no closed season for black bass, walleye, muskellunge or northern pike; on Lake Erie the daily limits change by date (black bass one fish from 1 May to 26 June 2026, walleye and yellow perch limits from 1 May 2026 were to be announced in late April). Brook trout may not be taken in the Chagrin and Grand rivers and their tributaries, and state-endangered fish such as lake sturgeon are protected in all Ohio waters.",
    regulator: "Ohio Department of Natural Resources",
    source: OH_SRC,
    checked: CHECKED,
  },

  // ---- Michigan: Grand Rapids and Detroit ----
  // source: Michigan DNR, 2026 Michigan Fishing Regulations (in effect until 31 March 2027), seasons table p. 4-5 and p. 12-14, read 2 November 2026 —
  //   walleye and northern pike, Lower Peninsula inland waters, possession season "Last Sat. in April - March 15", Lower Peninsula Great Lakes,
  //   Lake St. Clair, St. Clair and Detroit rivers "Open All Year", no catch-and-release row for them; p. 9 "it is unlawful to fish in any body of water
  //   outside of the fishing season" and p. 11 "Take or attempt to take fish outside of the open season for that species"; bass "Catch-and-immediate-release on
  //   all waters" all year, possession "Sat. before Memorial Day - Dec. 31" (Lake St. Clair, St. Clair and Detroit rivers "3rd Sat. in June - Dec. 31");
  //   muskellunge catch and release all year, possession "1st Sat. in June - March 15" (Lake St. Clair, St. Clair and Detroit rivers to Dec. 31); yellow
  //   perch, crappie, bluegill, catfish, lake whitefish, burbot "Open All Year".
  {
    id: "us-mi-grand-rapids-pike-walleye",
    countryCode: "US",
    admin1: MI,
    regionSlug: RS,
    near: { ...GRAND_RAPIDS, km: 30 },
    species: ["walleye", "northern-pike"],
    closed: [{ from: "03-16", to: "04-24" }],
    note: "On Lower Peninsula inland waters Michigan's guide sets walleye and northern pike from the last Saturday in April (25 April in 2026) to 15 March. It lists no catch-and-release season for them and says it is unlawful to take or attempt to take fish outside the open season. The Great Lakes are open all year.",
    regulator: MI_REG,
    source: MI_SRC,
    checked: CHECKED,
  },
  {
    id: "us-mi-grand-rapids-notes",
    countryCode: "US",
    admin1: MI,
    regionSlug: RS,
    near: { ...GRAND_RAPIDS, km: 30 },
    species: [],
    closed: [],
    water: ["rivers", "lakes"],
    note: "Michigan lets anglers catch and release bass and muskellunge all year; keeping bass is allowed from the Saturday before Memorial Day (23 May in 2026) to 31 December and keeping muskellunge from the first Saturday in June to 15 March. Yellow perch, crappie, bluegill, catfish, lake whitefish and burbot are open all year; inland trout seasons depend on the stream or lake type.",
    regulator: MI_REG,
    source: MI_SRC,
    checked: CHECKED,
  },
  {
    id: "us-mi-detroit-notes",
    countryCode: "US",
    admin1: MI,
    regionSlug: RS,
    near: { ...DETROIT, km: 25 },
    species: [],
    closed: [],
    water: ["rivers", "lakes"],
    note: "Michigan lists walleye and northern pike as open all year in Lake St. Clair, the St. Clair River, the Detroit River and the Lower Peninsula Great Lakes (inland waters run from the last Saturday in April to 15 March). Bass and muskellunge may be caught and released all year; keeping bass is allowed from the third Saturday in June (20 June in 2026) to 31 December and keeping muskellunge from the first Saturday in June to 31 December on those waters. Yellow perch, crappie, bluegill and catfish are open all year.",
    regulator: MI_REG,
    source: MI_SRC,
    checked: CHECKED,
  },

  // ---- Illinois: Chicago ----
  // source: Illinois DNR, 2026 Illinois Fishing Information (effective April 1, 2026 through March 31, 2027), read 2 November 2026 —
  //   p. 9 "Sport fishing is open year-round, except as noted in the Site-Specific Regulations section"; p. 7 waters stocked with catchable rainbow
  //   trout have spring and/or fall closed seasons; Lake Michigan yellow perch limit 15 (also the Calumet and Chicago rivers); smelt
  //   "March 1 through April 30"; a Salmon Stamp is needed to take salmon or trout in Lake Michigan; lake sturgeon protected. The site-specific
  //   section for Lake Michigan and the Chicago waters could not be read.
  {
    id: "us-il-chicago-notes",
    countryCode: "US",
    admin1: IL,
    regionSlug: RS,
    near: { ...CHICAGO, km: 40 },
    species: [],
    closed: [],
    water: ["rivers", "lakes"],
    note: "Illinois says sport fishing is open year-round except as noted in its site-specific regulations; waters stocked with catchable rainbow trout have closed seasons (spring and/or fall), and a Salmon Stamp is needed to take salmon or trout in Lake Michigan. The yellow perch limit is 15 in Lake Michigan and the Calumet and Chicago rivers. Check the site-specific entry for the water you fish.",
    regulator: "Illinois DNR",
    source: IL_SRC,
    checked: CHECKED,
  },

  // ---- Wisconsin: Madison (inland waters) and Milwaukee (Lake Michigan) ----
  // source: Wisconsin DNR, Fishing seasons (regulation year 2026-2027, effective April 1, 2026), and the species pages for walleye, northern pike,
  //   muskellunge and trout, read 2 November 2026 — general inland waters walleye, sauger, hybrids and northern pike "May 2, 2026 to March 7, 2027"
  //   ("First Saturday in May to the first Sunday in March of the following year"); muskellunge "First Saturday in May to December 31 (open water only)";
  //   inland trout early catch-and-release season January 3 to April 3, 2026, general season streams April 4 to October 15, lakes May 2 to October 15;
  //   largemouth and smallmouth bass catch and release at all times outside the harvest dates; Lake Michigan and its tributaries trout and salmon "Continuous".
  //   https://dnr.wisconsin.gov/topic/Fishing/seasons/walleye, /npike, /musky, /trout
  {
    id: "us-wi-madison-walleye-pike",
    countryCode: "US",
    admin1: WI,
    regionSlug: RS,
    near: { ...MADISON, km: 25 },
    species: ["walleye", "northern-pike"],
    closed: [{ from: "03-08", to: "05-01" }],
    note: "On general inland waters Wisconsin sets walleye, sauger, hybrids and northern pike from the first Saturday in May to the first Sunday in March (2 May 2026 to 7 March 2027). The dates move each year, and some waters have their own dates in the regulations.",
    regulator: WI_REG,
    source: WI_SRC,
    checked: CHECKED,
  },
  {
    id: "us-wi-madison-muskellunge",
    countryCode: "US",
    admin1: WI,
    regionSlug: RS,
    near: { ...MADISON, km: 25 },
    species: ["muskellunge"],
    closed: [{ from: "01-01", to: "05-01" }],
    note: "On general inland waters Wisconsin sets muskellunge from the first Saturday in May (2 May in 2026) to 31 December, open water only.",
    regulator: WI_REG,
    source: "https://dnr.wisconsin.gov/topic/Fishing/seasons/musky",
    checked: CHECKED,
  },
  // Re-read 14 November 2026 for the audit of 10 November (checkers of 14 November), which found the trout row closing lakes from 16 October to
  //   2 January: the seasons table gives "Early catch-and-release inland trout" "January 3, 2026 (5 a.m.) - April 3, 2026", inland trout "in
  //   streams, springs, and spring ponds" "April 4, 2026 (5 a.m.) - Oct. 15, 2026", and "in lakes and ponds" "May 2, 2026 (5 a.m.) - Oct. 15,
  //   2026". The trout page says the early season is on "Early inland trout waters" from the first Saturday in January (3 January in 2026,
  //   2 January in 2027). So lakes and ponds stay closed until the first Saturday in May, and the early catch-and-release season is for streams:
  //   two rows, by kind of water. https://dnr.wisconsin.gov/topic/Fishing/seasons/trout
  {
    id: "us-wi-madison-trout-streams",
    countryCode: "US",
    admin1: WI,
    regionSlug: RS,
    near: { ...MADISON, km: 25 },
    species: ["brook-trout", "brown-trout", "rainbow-trout", "steelhead"],
    closed: [{ from: "10-16", to: "01-02" }],
    noKeep: [{ from: "01-03", to: "04-03" }],
    water: ["rivers"],
    note: "On Wisconsin's inland trout streams, springs and spring ponds the general season runs from 4 April to 15 October 2026. The early catch-and-release season, from the first Saturday in January (3 January in 2026, 2 January in 2027) to 3 April, is only on the streams the regulations list as early-season waters; others stay closed until 4 April. Some waters have their own dates.",
    regulator: WI_REG,
    source: WI_SRC,
    checked: "2026-11-14",
  },
  {
    id: "us-wi-madison-trout-lakes",
    countryCode: "US",
    admin1: WI,
    regionSlug: RS,
    near: { ...MADISON, km: 25 },
    species: ["brook-trout", "brown-trout", "rainbow-trout", "steelhead"],
    closed: [{ from: "10-16", to: "05-01" }],
    water: ["lakes"],
    note: "On Wisconsin's inland lakes and ponds the trout season runs from the first Saturday in May (2 May in 2026) to 15 October; the early catch-and-release season in January is for streams. Some waters have their own dates.",
    regulator: WI_REG,
    source: WI_SRC,
    checked: "2026-11-14",
  },
  // Re-read 14 November 2026 for the same audit, which found the note saying the page does not say where the bass zones are. The seasons table
  //   (regulation year 2026-2027) gives "Large And Smallmouth Bass Southern Zone Harvest" "May 2, 2026 - March 7, 2027" and "Catch And Release"
  //   "At all other times of the year", and links "Wisconsin Fishing Season Definitions", which draws the line "following State Highway 77, from
  //   its bridge over the St. Croix river east to State Highway 27", then Highway 27 south to Highway 64, east to Marinette, and from the Fox River
  //   bridge on Highway 29 east to Kewaunee: all north of 44.4° N. Madison (43.07° N) is in the Southern Zone.
  //   https://dnr.wisconsin.gov/topic/Fishing/seasons/definitions.html
  {
    id: "us-wi-madison-bass",
    countryCode: "US",
    admin1: WI,
    regionSlug: RS,
    near: { ...MADISON, km: 25 },
    species: ["largemouth-bass", "smallmouth-bass"],
    closed: [],
    noKeep: [{ from: "03-08", to: "05-01" }],
    water: ["rivers", "lakes"],
    note: "Madison is in Wisconsin's southern bass zone, which lies south of a line along Highways 77, 27, 64 and 29. There largemouth and smallmouth bass may be kept from the first Saturday in May to the first Sunday in March (2 May 2026 to 7 March 2027), and are catch and release at all other times.",
    regulator: WI_REG,
    source: WI_SRC,
    checked: "2026-11-14",
  },
  {
    id: "us-wi-milwaukee-notes",
    countryCode: "US",
    admin1: WI,
    regionSlug: RS,
    near: { ...MILWAUKEE, km: 25 },
    species: [],
    closed: [],
    water: ["rivers", "lakes"],
    note: "Wisconsin lists trout and salmon in Lake Michigan and its tributaries as \"continuous\" (no closed season). Inland waters use different dates.",
    regulator: WI_REG,
    source: "https://dnr.wisconsin.gov/topic/Fishing/seasons/trout",
    checked: CHECKED,
  },
  {
    id: "us-wi-milwaukee-pike-notes",
    countryCode: "US",
    admin1: WI,
    regionSlug: RS,
    near: { ...MILWAUKEE, km: 25 },
    species: [],
    closed: [],
    water: ["rivers", "lakes"],
    note: "Wisconsin's northern pike page lists Lake Michigan as continuous (no closed season); inland waters use different dates.",
    regulator: WI_REG,
    source: "https://dnr.wisconsin.gov/topic/Fishing/seasons/npike",
    checked: CHECKED,
  },
  {
    id: "us-wi-milwaukee-musky-notes",
    countryCode: "US",
    admin1: WI,
    regionSlug: RS,
    near: { ...MILWAUKEE, km: 25 },
    species: [],
    closed: [],
    water: ["rivers", "lakes"],
    note: "Wisconsin's muskellunge page gives Green Bay, Lake Michigan and Lake Michigan tributaries a season from the Saturday nearest Memorial Day to 31 December.",
    regulator: WI_REG,
    source: "https://dnr.wisconsin.gov/topic/Fishing/seasons/musky",
    checked: CHECKED,
  },

  // ---- Minnesota: Minneapolis ----
  // source: Minnesota DNR, 2026 Minnesota Fishing Regulations (March 2026 through February 28, 2027; "All calendar dates are for 2026 unless noted
  //   otherwise"), read 2 November 2026 — walleye and sauger "May 9, 2026 - Feb. 28, 2027"; northern pike, Southern Zone, "May 9, 2026 - Feb. 28, 2027"
  //   (minimum 24 inches); muskellunge and tiger muskellunge "June 6 - Nov. 30"; stream trout, streams (statewide except as listed) "April 11 - Sept. 30";
  //   stream trout, lakes, summer "May 9 - Oct. 31", winter "2026: Jan. 17 - March 31, 2027: Jan. 16 - March 31"; largemouth and smallmouth bass catch and
  //   release only March 1 - May 22, harvest from May 23, smallmouth harvest ends Sept. 13; panfish and channel catfish "Continuous".
  //   Mississippi River border-water pools (pp. 66-77) were not readable.
  {
    id: "us-mn-minneapolis-walleye-pike",
    countryCode: "US",
    admin1: MN,
    regionSlug: RS,
    near: { ...MINNEAPOLIS, km: 30 },
    species: ["walleye", "northern-pike"],
    closed: [{ from: "03-01", to: "05-08" }],
    note: "Minnesota's inland season for walleye, sauger and northern pike (North-central Zone, which includes Minneapolis: ten fish, not more than two over 26 inches, fish of 22 to 26 inches released; south of the Minnesota River the Southern Zone allows two fish, 24 inch minimum) runs from the opener, 9 May in 2026, to the end of February. The opener moves each year.",
    regulator: MN_REG,
    source: MN_SRC,
    checked: CHECKED,
  },
  {
    id: "us-mn-minneapolis-muskellunge",
    countryCode: "US",
    admin1: MN,
    regionSlug: RS,
    near: { ...MINNEAPOLIS, km: 30 },
    species: ["muskellunge"],
    closed: [{ from: "12-01", to: "06-05" }],
    note: "Minnesota's muskellunge and tiger muskellunge season runs from 6 June to 30 November in 2026; one fish, 54 inch minimum (40 inch for tiger muskellunge).",
    regulator: MN_REG,
    source: MN_SRC,
    checked: CHECKED,
  },
  {
    id: "us-mn-minneapolis-lake-trout",
    countryCode: "US",
    admin1: MN,
    regionSlug: RS,
    near: { ...MINNEAPOLIS, km: 30 },
    species: ["lake-trout"],
    closed: [
      { from: "10-01", to: "01-16" },
      { from: "04-01", to: "05-08" },
    ],
    water: ["lakes"],
    note: "Minnesota's statewide summer season for lake trout is 9 May to 30 September in 2026, with a winter season from 17 January to 31 March in 2026 (16 January in 2027) on lakes outside or partly outside the Boundary Waters; two fish.",
    regulator: MN_REG,
    source: MN_SRC,
    checked: CHECKED,
  },
  {
    id: "us-mn-minneapolis-trout-streams",
    countryCode: "US",
    admin1: MN,
    regionSlug: RS,
    near: { ...MINNEAPOLIS, km: 30 },
    species: ["brook-trout", "brown-trout", "rainbow-trout", "steelhead"],
    closed: [{ from: "10-01", to: "04-10" }],
    water: ["rivers"],
    note: "Minnesota's season for stream trout in streams is 11 April to 30 September in 2026 for streams statewide except those listed (southeast Minnesota and Lake Superior streams have their own dates). Streams in Dakota County follow the southeast rule: catch and release 1 January to 10 April and 15 September to 15 October, closed 16 October to 31 December.",
    regulator: MN_REG,
    source: MN_SRC,
    checked: CHECKED,
  },
  {
    id: "us-mn-minneapolis-trout-lakes",
    countryCode: "US",
    admin1: MN,
    regionSlug: RS,
    near: { ...MINNEAPOLIS, km: 30 },
    species: ["brook-trout", "brown-trout", "rainbow-trout", "steelhead"],
    closed: [
      { from: "11-01", to: "01-16" },
      { from: "04-01", to: "05-08" },
    ],
    water: ["lakes"],
    note: "Minnesota's season for stream trout in lakes is 9 May to 31 October in 2026, with a winter season from 17 January to 31 March in 2026 (16 January in 2027).",
    regulator: MN_REG,
    source: MN_SRC,
    checked: CHECKED,
  },
  {
    id: "us-mn-minneapolis-notes",
    countryCode: "US",
    admin1: MN,
    regionSlug: RS,
    near: { ...MINNEAPOLIS, km: 30 },
    species: [],
    closed: [],
    water: ["rivers", "lakes"],
    note: "Minnesota makes largemouth and smallmouth bass catch and release only from 1 March to 22 May 2026, with harvest from 23 May (smallmouth harvest ends 13 September, then catch and release again). Crappie, sunfish, perch and channel catfish are open continuously. A 2026-27 licence runs to 28 February 2027.",
    regulator: MN_REG,
    source: MN_SRC,
    checked: CHECKED,
  },
];

// =====================================================================================================================
// LAND RULES
// =====================================================================================================================

export const LAND: LandRule[] = [
  // ---- Ontario (outside the Ottawa circle, whose rules are in land-rules.ts) ----
  {
    id: "gl-ontario-provincial-parks",
    applies: (p) => inRegion(p) && is(p, "ON", "Ontario") && !nearOttawa(p),
    title: "Ontario provincial parks",
    rule: "Ontario Parks says foraging for any plant or fungal species is prohibited in provincial parks, and that removing any natural object from a provincial park is prohibited. The only exception it names is Indigenous communities exercising their harvesting rights.",
    source: { label: "Ontario Parks blog: foraging in provincial parks (published 15 April 2026)", url: "https://blog.ontarioparks.ca/?p=36243" },
    checked: CHECKED,
  },
  {
    id: "gl-ontario-conservation-areas",
    applies: (p) => inRegion(p) && is(p, "ON", "Ontario") && !nearOttawa(p),
    title: "Conservation authority land",
    rule: "Ontario Regulation 688/21 (Rules of Conduct in Conservation Areas) says no person shall, in a conservation area, cut, remove, injure or destroy a plant, tree, shrub, flower or other growing thing. It does not apply to conservation areas operated or managed by a municipality, or run under an agreement.",
    source: { label: "O. Reg. 688/21, Rules of Conduct in Conservation Areas (s. 4(b), s. 2)", url: "https://mvca.on.ca/wp-content/uploads/2024/04/Reg-688_21_Conduct-in-CAs.pdf" },
    checked: CHECKED,
  },
  {
    id: "gl-toronto-parks",
    applies: (p) => inRegion(p) && within(p, TORONTO, 15),
    title: "City of Toronto parks",
    rule: "Toronto Municipal Code Chapter 608 (Parks) forbids, in a park, breaking, injuring, defacing, destroying, moving or removing the whole or any part of a flower, plant material, fungus or tree. Moving or removing any part of a tree needs a permit.",
    source: { label: "City of Toronto: Municipal Code Chapter 608, Parks (s. 608-6)", url: "https://www.toronto.ca/legdocs/municode/1184_608.pdf" },
    checked: CHECKED,
  },
  {
    id: "gl-rouge-national-urban-park",
    applies: (p) => inRegion(p) && within(p, TORONTO, 30),
    title: "Rouge National Urban Park (Parks Canada)",
    rule: "Parks Canada's visitor guidelines for Rouge National Urban Park say not to collect, plant, remove or damage any natural, historical or agricultural objects in the park, and not to pick or damage crops or naturally growing vegetation on farmland.",
    source: { label: "Parks Canada: Rouge National Urban Park visitor guidelines", url: "https://parks.canada.ca/pn-np/on/rouge/securite-safety/regles-rules" },
    checked: CHECKED,
  },

  // ---- Quebec (outside the Ottawa circle) ----
  {
    id: "gl-quebec-national-parks",
    applies: (p) => inRegion(p) && is(p, "QC", "Quebec", "Québec") && !nearOttawa(p),
    title: "Quebec national parks (Parks Act)",
    rule: "Quebec's Règlement sur les parcs, article 20, forbids cutting, damaging, removing or introducing a tree, shrub, plant, mushroom or part of one in a park, outside scientific or management purposes. Gathering edible plant products for non-commercial purposes is allowed, except in a preservation zone or an extreme preservation zone.",
    source: { label: "Légis Québec: P-9, r. 25, Règlement sur les parcs, s. 20", url: "https://www.legisquebec.gouv.qc.ca/fr/ShowDoc/cr/p-9,%20r.%2025" },
    checked: CHECKED,
  },
  {
    id: "gl-quebec-wild-leek",
    applies: (p) => inRegion(p) && is(p, "QC", "Quebec", "Québec") && !nearOttawa(p),
    title: "Wild leek (ail des bois) in Quebec",
    rule: "Under Quebec's regulation on threatened or vulnerable plant species, wild leek may be harvested for personal use only up to 200 g of any of its parts, or 50 bulbs or 50 plants, a year. The exemption does not apply in a park under the Parks Act, in areas designated under the Natural Heritage Conservation Act, in wildlife preserves, on certain other listed sites, regional parks on state-owned land and the Boisé-de-Marly habitat, or in eight named Montréal parks.",
    source: { label: "Légis Québec: E-12.01, r. 3, s. 4 (current to 1 July 2026)", url: "https://www.legisquebec.gouv.qc.ca/en/document/cr/E-12.01,%20r.%203" },
    checked: CHECKED,
  },

  // ---- Vermont ----
  {
    id: "gl-vermont-state-lands",
    applies: (p) => inRegion(p) && is(p, "VT", "Vermont"),
    title: "Vermont state parks and Department of Forests, Parks and Recreation lands",
    rule: "Vermont's visitor-conduct rules say no plant may be uprooted or cut without a special written permit. Wild berries, fruits, seeds, nuts or mushrooms may be collected only for personal use, at the risk of the collector; commercial harvesting needs a special written permit.",
    source: { label: "Vermont State Parks: Rules and Regulations, Visitor Conduct (effective 24 August 2022), I.1 and I.2", url: "https://www.vtstateparks.com/sites/stateparks/files/documents/rules_current.pdf" },
    checked: CHECKED,
  },

  // ---- New Hampshire ----
  {
    id: "gl-new-hampshire-state-parks",
    applies: (p) => inRegion(p) && is(p, "NH", "New Hampshire"),
    title: "New Hampshire state parks",
    rule: "New Hampshire's state park rules (Ncr 731.05, adopted text of 24 June 2025) say no person shall remove, damage, deface, disturb or alter any structure, plant and the like on department properties, with the exception of lawful fishing.",
    source: { label: "NH State Parks: Ncr 730 Parks and Recreation, adopted text, Ncr 731.05", url: "https://www.nhstateparks.org/NHStateParks/media/NHStateParks/PDFs/Legislation/2025-49-Adopted-Text-Ncr-730.pdf" },
    checked: CHECKED,
  },

  // ---- Ohio ----
  {
    id: "gl-ohio-state-parks",
    applies: (p) => inRegion(p) && is(p, "OH", "Ohio"),
    title: "Ohio state parks",
    rule: "Ohio Administrative Code 1501:46-3-10 makes it unlawful to willfully or negligently pick, dig up, cut, mutilate or destroy plants in areas the Division of Parks and Watercraft administers, unless permitted. It says pine cones on the ground, berries, fruit, tree nuts and mushrooms may be carried away for personal use during daylight hours, except where a restriction is posted.",
    source: { label: "Ohio Administrative Code, Chapter 1501:46-3 (rule 1501:46-3-10, effective 30 June 2024)", url: "https://codes.ohio.gov/ohio-administrative-code/chapter-1501:46-3" },
    checked: CHECKED,
  },
  {
    id: "gl-cuyahoga-valley-np",
    applies: (p) => inRegion(p) && within(p, { lat: 41.24, lon: -81.55 }, 35),
    title: "Cuyahoga Valley National Park",
    rule: "The park's Superintendent's Compendium (7 April 2026) lets visitors gather reasonable quantities of edible fruit, berries and nuts by hand for personal use, but not from plants on the federal or Ohio rare, threatened or endangered lists. Mushrooms and bulbs may not be collected in any quantity.",
    source: { label: "NPS: Cuyahoga Valley National Park Superintendent's Compendium", url: "https://www.nps.gov/cuva/learn/management/superintendents-compendium.htm" },
    checked: CHECKED,
  },
  {
    id: "gl-cleveland-metroparks",
    applies: (p) => inRegion(p) && within(p, CLEVELAND, 30),
    title: "Cleveland Metroparks",
    rule: "The Cleveland Metroparks rules say removing any part of the Park District, including plants, tree limbs, rocks and leaves, is prohibited.",
    source: { label: "Cleveland Metroparks: Park Rules & Regulations", url: "https://www.clevelandmetroparks.com/about/cleveland-metroparks-organization/cleveland-metroparks-police-department-safety/park-rules-regulations" },
    checked: CHECKED,
  },

  // ---- New York ----
  // Day 5 audit (14 November 2026): Albany's "Where you may pick" had no rule for any land (New York's state park row was
  // only in northeast-coast.ts, within 40 km of New York City). 9 NYCRR § 375.1, "Activities absolutely prohibited",
  // (e): "No person shall make an excavation on or injure, destroy, deface, remove, fill in, tamper with or cut any real or
  //   personal property, tree or other plant life", on "property under the jurisdiction, custody and control of the
  //   office" (the Office of Parks, Recreation and Historic Preservation). No exception for berries, fruit, nuts or
  //   mushrooms. https://regulations.justia.com/states/new-york/title-9/subtitle-i/chapter-i/subchapter-a/part-375/section-375-1
  //   (read 14 November 2026). Statewide, so Buffalo gets it too.
  {
    id: "gl-ny-state-parks",
    applies: (p) => inRegion(p) && is(p, ...NY),
    title: "New York state parks (Office of Parks, Recreation and Historic Preservation)",
    rule: "New York's state park regulations (9 NYCRR 375.1(e)) forbid anyone to injure, destroy, remove or cut any tree or other plant life on state park property. The regulation gives no exception for berries, fruit, nuts or mushrooms.",
    source: { label: "9 NYCRR Subtitle I, § 375.1(e), Activities absolutely prohibited", url: "https://regulations.justia.com/states/new-york/title-9/subtitle-i/chapter-i/subchapter-a/part-375/section-375-1" },
    checked: "2026-11-14",
  },

  // ---- Michigan ----
  {
    id: "gl-michigan-state-parks",
    applies: (p) => inRegion(p) && is(p, "MI", "Michigan"),
    title: "Michigan state parks and recreation areas",
    rule: "Michigan DNR's state land rules for parks and recreation areas (R 299.922, unlawful acts generally) make it unlawful to destroy, damage or remove a tree, shrub or other vegetation such as wildflowers and grass. The rule does not apply to gathering mushrooms, berries and edible fruits or nuts for personal use, outside wildlife food plots.",
    source: { label: "Michigan DNR: Parks and Recreation Areas, State Land Rules (effective 29 January 2014)", url: "https://www.michigan.gov/dnr/-/media/Project/Websites/dnr/Documents/PRD/parks/AdministrativeRules-ParksRecAreas.pdf" },
    checked: CHECKED,
  },

  // ---- Illinois ----
  {
    id: "gl-cook-county-forest-preserves",
    applies: (p) => inRegion(p) && is(p, "IL", "Illinois") && within(p, CHICAGO, 25),
    title: "Forest Preserves of Cook County",
    rule: "The Forest Preserves of Cook County say collection of plants and animals is strictly prohibited, including collecting mushrooms, wildflowers or other wild plants and their seeds, and that anyone caught foraging or collecting is subject to a fine of $75 to $500 per offense.",
    source: { label: "Forest Preserves of Cook County: Rules & Frequently Asked Questions", url: "https://fpdcc.com/about/rules-regulations/" },
    checked: CHECKED,
  },

  // ---- Wisconsin ----
  {
    id: "gl-wisconsin-state-parks",
    applies: (p) => inRegion(p) && is(p, "WI", "Wisconsin"),
    title: "Wisconsin state parks and forests",
    rule: "Wisconsin DNR says it is against state law to destroy, molest, deface or remove any natural growth from the parks, but visitors may hand-pick edible fruits, edible nuts, wild mushrooms, wild asparagus and watercress for personal use. Collecting seeds from grasses and wildflowers is not allowed without written authorization.",
    source: { label: "Wisconsin DNR: Gathering in state parks and forests", url: "https://dnr.wisconsin.gov/topic/parks/rules/gathering" },
    checked: CHECKED,
  },
  {
    id: "gl-madison-conservation-parks",
    applies: (p) => inRegion(p) && within(p, MADISON, 10),
    title: "City of Madison conservation parks",
    rule: "Madison's Park Rules say that in its conservation parks all plants and animals are protected, disturbance or removal requires written permission, and the collection of any natural object, living or non-living, is prohibited under MGO 8.40.",
    source: { label: "City of Madison: Park Rules, Plants & Foraging (MGO 8.40)", url: "https://www.cityofmadison.com/parks/about/park-rules" },
    checked: CHECKED,
  },

  // ---- Minnesota ----
  {
    id: "gl-minnesota-state-parks",
    applies: (p) => inRegion(p) && is(p, "MN", "Minnesota"),
    title: "Minnesota state parks, recreation areas and state trails",
    rule: "Under Minnesota rule 6100.0900 it is illegal to dig up or damage plants in state parks, recreation areas, waysides and state forest recreation areas, and picking wildflowers or other plants is not allowed, edible or not. The exception is edible fruits and mushrooms, which may be gathered for personal consumption (the page's examples are a handful of berries or a few mushrooms); on state trails only edible fruit may be picked.",
    source: { label: "Minnesota DNR: Harvesting plants (page modified 9 October 2026)", url: "https://www.dnr.state.mn.us/state-parks/harvesting.html" },
    checked: CHECKED,
  },
  {
    id: "gl-minneapolis-parks",
    applies: (p) => inRegion(p) && within(p, MINNEAPOLIS, 10),
    title: "Minneapolis parks",
    rule: "The Minneapolis Park and Recreation Board says foraging (collecting wild food such as greens, berries or mushrooms) is prohibited in its parks. Harvesting edible fruit and nuts for personal consumption is allowed at specific locations, under Ordinance PB2-2, and not in natural areas, golf courses, gardens or bird sanctuaries.",
    source: { label: "Minneapolis Park & Recreation Board: Harvesting and Foraging", url: "https://www.minneapolisparks.org/activities-events/harvesting/" },
    checked: CHECKED,
  },
];
