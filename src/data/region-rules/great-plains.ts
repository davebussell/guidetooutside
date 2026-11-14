/**
 * Rules read from the regulator's own pages for the ecoregion "Prairies & Great Plains" (great-plains).
 *
 * CLOSED: closed-season rows (same shape and standard as src/data/closed-seasons.ts: a regulator, the page it
 * was read from, the date it was read, dates written as the regulator gives them).
 * LAND: where-you-may-pick rules (same shape and standard as src/data/land-rules.ts: the regulator's wording,
 * kept inside the source, with the page and the date it was read).
 *
 * Nothing here is inferred. A row exists only where the page was opened and read.
 */
import type { ClosedSeason } from "../closed-seasons";
import type { LandPlace, LandRule } from "../land-rules";

/** Date every page below was opened and read. */
const CHECKED = "2026-11-02";

const US = "US";
const CA = "CA";

// ---- Circles used to scope rows to a town (the regulator's rule is for a water or zone, not a point) ----------------
const REGINA = { lat: 50.4452, lon: -104.6189, km: 30 };
const SASKATOON = { lat: 52.1318, lon: -106.6608, km: 25 };
const WINNIPEG = { lat: 49.8951, lon: -97.1384, km: 60 };
const CALGARY = { lat: 51.0447, lon: -114.0719, km: 20 };
const EDMONTON = { lat: 53.5461, lon: -113.4938, km: 25 };

export const CLOSED: ClosedSeason[] = [
  // ======================= Canada: Saskatchewan (Regina) ==========================================================
  // source: Government of Saskatchewan, Season Dates and Limits, read 2 November 2026 — one open season per management
  //   zone, 2026-27: Southern Zone "May 5, 2026" to "March 31, 2027"; Central Zone May 15; Northern Zone May 25 to April 15, 2027.
  //   The page does not say which towns are in which zone.
  // source: 2026-27 Anglers Guide (Government of Saskatchewan, valid 1 April 2026 to 31 March 2027), pp. 10-13 — Buffalo Pound
  //   Lake (map 2C) and Condie Reservoir (2C), the large waters nearest Regina, are listed under the Southern Zone; the guide
  //   says lakes crossed by a zone border go in the zone to the north of it; pages 10-27 list waters with their own dates.
  //   Regina is placed in the Southern Zone from those two listings, not from the guide's map (which the text does not carry).
  {
    id: "ca-sk-southern-zone-regina",
    countryCode: CA,
    admin1: ["SK", "Saskatchewan"],
    near: REGINA,
    species: ["walleye", "northern-pike", "yellow-perch", "burbot"],
    closed: [{ from: "04-01", to: "05-04" }],
    note:
      "Saskatchewan sets one open season for each of three management zones. For the Southern Zone, which the 2026-27 guide lists for Buffalo Pound Lake and Condie Reservoir near Regina, it is 5 May 2026 to 31 March 2027, so fishing is closed from 1 April to 4 May (the opening date is the guide's for 2026). Waters the guide lists by name can have their own dates or closures.",
    regulator: "Saskatchewan Ministry of Environment (Southern Zone)",
    source: "https://www.saskatchewan.ca/residents/parks-culture-heritage-and-sport/hunting-trapping-and-angling/angling/season-dates-and-limits",
    checked: CHECKED,
  },

  // ======================= Canada: Saskatchewan (Saskatoon) =======================================================
  // The audit of 10 November 2026 (checkers of 14 November) found no Saskatchewan row at Saskatoon, and the page showing walleye "Year-round".
  // source: Government of Saskatchewan, Season Dates and Limits (no page date), read 14 November 2026: Southern Zone "May 5, 2026" to "March 31,
  //   2027"; Central Zone "May 15, 2026" to "March 31, 2027"; Northern Zone "May 25, 2026" to "April 15, 2027". The page does not name towns.
  //   https://www.saskatchewan.ca/residents/parks-culture-heritage-and-sport/hunting-trapping-and-angling/angling/season-dates-and-limits
  // source: 2026-27 Saskatchewan Anglers Guide ("The contents of this guide apply from April 1, 2026 to March 31, 2027"), read 14 November 2026:
  //   "All lakes intersected by zone borders fall into the zone immediately north of that border."; the Southern Zone special regulations list
  //   "Saskatoon Trout Pond" (map 4B, stocked trout limit 1), Waldheim Pond and Redberry Pond (4B, north of the city), Blackstrap Reservoir and
  //   Brightwater Reservoir (3B, south of it) and Melfort Pond (4C); no Central Zone water has a map reference in 3B-4C (the Central Zone list starts
  //   at 5A). Saskatoon is placed in the Southern Zone from the pond in the city and the Southern Zone waters north of it; the guide's map itself
  //   cannot be read as text. https://publications.saskatchewan.ca/api/v1/products/128321/formats/153858/download
  {
    id: "ca-sk-southern-zone-saskatoon",
    countryCode: CA,
    admin1: ["SK", "Saskatchewan"],
    near: SASKATOON,
    species: ["walleye", "northern-pike", "yellow-perch", "burbot"],
    closed: [{ from: "04-01", to: "05-04" }],
    note:
      "Saskatchewan sets one open season for each of three management zones. Its 2026-27 guide lists the Saskatoon Trout Pond, and ponds north of the city at Waldheim and Redberry, in the Southern Zone, whose season is 5 May 2026 to 31 March 2027, so fishing is closed from 1 April to 4 May (the opening date is the guide's for 2026). Waters the guide lists by name can have their own rules: the Saskatoon Trout Pond allows 1 stocked trout a day, and the causeway on Blackstrap Reservoir is closed to angling all year.",
    regulator: "Saskatchewan Ministry of Environment (Southern Zone)",
    source: "https://www.saskatchewan.ca/residents/parks-culture-heritage-and-sport/hunting-trapping-and-angling/angling/season-dates-and-limits",
    checked: "2026-11-14",
  },

  // ======================= Canada: Manitoba (Winnipeg) ============================================================
  // source: Manitoba Anglers' Guide 2026 (Manitoba Natural Resources and Indigenous Futures; regulations take effect 1 April 2026),
  //   read 2 November 2026 — Southern Division: walleye/sauger closed "April 6, 2026" to "May 8, 2026", open May 9, 2026 to
  //   April 4, 2027; lake sturgeon closed May 1 to June 15; lake trout closed Sept 15 to Oct 31; "All Other Species" no
  //   closed season. The Red River (Canada/US border to Lake Winnipeg) and the Assiniboine River are listed among the Southern
  //   Division waters. The Red River from Lockport Dam to Lake Winnipeg and the Assiniboine from the Portage Diversion to
  //   Highway 240 are closed to all fishing 6 April to 8 May 2026.
  {
    id: "ca-mb-southern-walleye",
    countryCode: CA,
    admin1: ["MB", "Manitoba"],
    near: WINNIPEG,
    species: ["walleye"],
    // The guide's closure for 2026 was 6 April to 8 May; it gives the 2026-27 season as 9 May 2026 to 4 April 2027 and no dates for 2027.
    closed: [{ from: "04-06", to: "05-08" }],
    note:
      "In Manitoba's Southern Division, which the 2026 guide gives for the Red and Assiniboine rivers, walleye and sauger were closed from 6 April to 8 May 2026, and the 2026-27 season runs from 9 May 2026 to 4 April 2027. On the Red River, walleye and sauger under 35 cm must be released. The Red River below Lockport Dam and the Assiniboine from the Portage Diversion to Highway 240 are closed to all fishing in the same weeks.",
    regulator: "Manitoba Natural Resources and Indigenous Futures (Southern Division)",
    source: "https://www.manitoba.ca/nrnd/fish-wildlife/pubs/fish_wildlife/fish/angling-guide.pdf",
    checked: CHECKED,
  },
  {
    id: "ca-mb-southern-other-species",
    countryCode: CA,
    admin1: ["MB", "Manitoba"],
    near: WINNIPEG,
    species: ["northern-pike", "yellow-perch", "channel-catfish", "smallmouth-bass", "burbot", "common-carp", "bluegill", "black-crappie"],
    closed: [],
    note:
      "Manitoba's 2026 guide lists no closed season in the Southern Division for \"All Other Species\", the group that holds the fish named here, so they are open year-round there. Named waters can differ: the Red River below Lockport Dam is closed to all fishing from 6 April to 8 May 2026, and the St. Andrews Lock and Dam area is closed 1 April to 15 November. A Manitoba angling licence is needed unless exempt; Manitoba residents 65 and over do not need one.",
    regulator: "Manitoba Natural Resources and Indigenous Futures (Southern Division)",
    source: "https://www.manitoba.ca/nrnd/fish-wildlife/pubs/fish_wildlife/fish/angling-guide.pdf",
    checked: CHECKED,
  },

  // ======================= Canada: Alberta (Calgary, Edmonton) ====================================================
  // source: Alberta Guide to Sportfishing Regulations 2026 (effective 1 April 2026 to 31 March 2027),
  //   https://www.albertaregulations.ca/fishingregs/ — Eastern Slopes zone ES1 is the Oldman and Bow river watersheds
  //   (Bow "upstream of Highway 24 near Carseland"); ES1 waterbody table (ES1.pdf): Bow River, Banff National Park downstream
  //   to Bassano Dam including Reservoir — "OPEN ALL YEAR", bait ban, trout limit 0; Elbow River from Glenmore Reservoir
  //   downstream to the Bow — OPEN ALL YEAR, bait ban; Glenmore Reservoir OPEN MAY 1 TO OCT. 31; Bearspaw Reservoir OPEN ALL YEAR.
  {
    id: "ca-ab-es1-calgary-rivers",
    countryCode: CA,
    admin1: ["AB", "Alberta"],
    near: CALGARY,
    species: ["rainbow-trout", "steelhead", "brown-trout", "brook-trout", "northern-pike", "burbot"],
    closed: [],
    water: ["rivers"],
    note:
      "Alberta's 2026 guide lists the Bow River from Banff National Park to Bassano Dam (which takes in Calgary) and the Elbow River below the Glenmore Reservoir as open all year, with a bait ban; the guide prints 0 for trout and for four other limit cells for the Bow, so check its table before keeping any fish. Glenmore Reservoir is listed as open 1 May to 31 October. Fish Creek and the Elbow River from Highway 22 to Glenmore Reservoir are listed as open only 16 June to 31 October. Streams in zone ES1 that the guide does not list by name are closed from 1 November to 15 June (zone default page).",
    regulator: "Alberta Environment and Protected Areas (zone ES1)",
    source: "https://www.albertaregulations.ca/pdfs/fishing-regs/ES1.pdf",
    checked: CHECKED,
  },
  // source: same guide, PP2 waterbody table (PP2.pdf): North Saskatchewan River, mainstem downstream of Highway 22/39
  //   (Drayton Valley) to the Alberta/Saskatchewan border — "OPEN ALL YEAR", bait allowed, walleye/sauger limit 0.
  //   PP2 boundary: the North Saskatchewan River watershed downstream of Highway 22/39; the Parkland-Prairie/Northern Boreal
  //   zone boundary follows the north terrace of the river valley, so tributaries entering from the north can fall in a
  //   different zone and are not covered here.
  //   Releasing fish (Regulations and Information, pp. 20-22): a fish that cannot be legally kept, such as a species with a
  //   limit of 0, must be released immediately.
  {
    id: "ca-ab-pp2-edmonton-nsr",
    countryCode: CA,
    admin1: ["AB", "Alberta"],
    near: EDMONTON,
    species: ["walleye", "northern-pike", "yellow-perch", "burbot", "rainbow-trout", "steelhead", "brown-trout"],
    closed: [],
    water: ["rivers"],
    note:
      "Alberta's 2026 guide lists the North Saskatchewan River mainstem below Highway 22/39 (Drayton Valley), the river through Edmonton, as open all year with bait allowed. The limit it prints for walleye and sauger is 0, and the guide says a fish that may not be kept must be released immediately. Creeks that run into the river are listed separately and are not covered here.",
    regulator: "Alberta Environment and Protected Areas (zone PP2)",
    source: "https://www.albertaregulations.ca/pdfs/fishing-regs/PP2.pdf",
    checked: CHECKED,
  },
  // source: Alberta Guide to Sportfishing Regulations 2026, Licences and Costs — an active Wildlife Identification Number (WiN)
  //   is needed before a recreational sportfishing licence is bought; Alberta residents under 16 or 65 and older do not need a
  //   licence to fish with rod and reel but must follow the regulations.
  {
    id: "ca-ab-licence-calgary",
    countryCode: CA,
    admin1: ["AB", "Alberta"],
    near: CALGARY,
    species: [],
    closed: [],
    note:
      "In Alberta an angler needs an active Wildlife Identification Number (WiN) before buying a sportfishing licence; Alberta residents under 16 or 65 and older do not need a licence to fish with rod and reel, but must follow the regulations.",
    regulator: "Alberta Environment and Protected Areas",
    source: "https://www.albertaregulations.ca/pdfs/fishing-regs/Licences-Costs.pdf",
    checked: CHECKED,
  },
  {
    id: "ca-ab-licence-edmonton",
    countryCode: CA,
    admin1: ["AB", "Alberta"],
    near: EDMONTON,
    species: [],
    closed: [],
    note:
      "In Alberta an angler needs an active Wildlife Identification Number (WiN) before buying a sportfishing licence; Alberta residents under 16 or 65 and older do not need a licence to fish with rod and reel, but must follow the regulations.",
    regulator: "Alberta Environment and Protected Areas",
    source: "https://www.albertaregulations.ca/pdfs/fishing-regs/Licences-Costs.pdf",
    checked: CHECKED,
  },

  // ======================= United States: North Dakota (Fargo, Grand Forks) =======================================
  // source: North Dakota Game and Fish Department, 2026-2028 Fishing Guide (fishing year 1 April 2026 to 31 March 2028) — "all
  //   waters of the state" are open to fishing year-round, with the exceptions listed (OWLS Pond and State Fair Pond closed
  //   sunset to sunrise, posted areas, most national wildlife refuges, Garrison Dam tailrace); no closed season is given for
  //   any species recorded near the towns; muskellunge under 48 inches must be released; pallid, shovelnose and lake sturgeon
  //   must be released; Red River and Bois de Sioux: northern pike and walleye/sauger limited to 3 daily; boat and ice anglers
  //   between the banks may use either state's licence, shore anglers need the licence of the state they stand in.
  // Re-read 14 November 2026 (the audit of 10 November, checkers of 14 November, could not find the shore-angler line): the guide says those
  //   fishing the Red River or Bois de Sioux "in a boat or on the ice" with "a valid fishing license from either North Dakota or Minnesota" "may
  //   fish the river(s) between the banks", those "on the shoreline" "must have a valid fishing license from the state in which they are fishing",
  //   and "While on the water or ice, anglers must comply with the regulations of the state for which they are licensed." The note now keeps to
  //   those words.
  {
    id: "us-nd-open",
    countryCode: US,
    admin1: ["ND", "North Dakota"],
    species: [
      "walleye", "northern-pike", "yellow-perch", "largemouth-bass", "smallmouth-bass", "black-crappie", "bluegill",
      "channel-catfish", "common-carp", "muskellunge", "burbot", "rainbow-trout", "steelhead", "brown-trout",
    ],
    closed: [],
    note:
      "North Dakota's 2026-28 fishing guide opens all waters to fishing year-round except the places it lists (a few ponds at night, posted areas, most national wildlife refuges, the Garrison Dam tailrace). It gives no closed season for walleye, pike, perch, bass, crappie, bluegill, catfish, trout, burbot or muskellunge. Muskellunge under 48 inches and pallid, shovelnose and lake sturgeon must be released. On the Red River, anglers in a boat or on the ice can fish between the banks with a North Dakota or a Minnesota licence and must follow the rules of the state that licensed them; anglers on the shore need a licence from the state they are fishing in.",
    regulator: "North Dakota Game and Fish Department",
    source: "https://gf.nd.gov/gnf/regulations/docs/fish/Fishing-Guide-2026-2028.pdf",
    checked: CHECKED,
  },

  // ======================= United States: Iowa (Des Moines) =======================================================
  // source: Iowa Administrative Code, Natural Resource Commission [571], chapter 81, rule 81.1 (Iowa DNR's seasons, limits table;
  //   chapter file dated 7 January 2026) — "Continuous" open season for walleye/sauger/saugeye, northern pike, muskellunge,
  //   black bass, crappie, bluegill, yellow perch, channel catfish and trout; the dated seasons in 81.2(1) and 81.2(6) are for named lakes (West and East
  //   Okoboji and Spirit lakes, border lakes); black bass and trout may be posted catch-and-release by water.
  {
    id: "us-ia-continuous",
    countryCode: US,
    admin1: ["IA", "Iowa"],
    species: [
      "walleye", "northern-pike", "muskellunge", "largemouth-bass", "smallmouth-bass", "black-crappie", "bluegill",
      "yellow-perch", "channel-catfish", "rainbow-trout", "steelhead", "brown-trout", "brook-trout",
    ],
    closed: [],
    note:
      "Iowa's fishing rules (chapter 81) give these fish a \"continuous\" open season; the chapter's dated walleye and muskellunge seasons are for named lakes such as Spirit Lake and the Okoboji lakes. The chapter says a water can be posted catch-and-release for black bass or trout, and trout need a trout fee on top of the licence.",
    regulator: "Iowa Natural Resource Commission (Iowa DNR), 571 IAC 81",
    source: "https://www.legis.iowa.gov/docs/iac/chapter/01-07-2026.571.81.pdf",
    checked: CHECKED,
  },

  // ======================= United States: Nebraska (Omaha) ========================================================
  // source: Nebraska Game and Parks Commission, 2026 Fishing Guide page — hook-and-line fishing "allowed year-round throughout
  //   the state, except as noted or as posted at an area"; pallid and lake sturgeon, bowfin and American eel are species of
  //   concern with no harvest allowed; some lakes are catch-and-release only; Lake Minatare and Lake Winters Creek closed
  //   15 October to 14 January or as posted.
  {
    id: "us-ne-open",
    countryCode: US,
    admin1: ["NE", "Nebraska"],
    species: [
      "walleye", "northern-pike", "yellow-perch", "largemouth-bass", "smallmouth-bass", "black-crappie", "bluegill",
      "channel-catfish", "common-carp", "muskellunge", "burbot", "rainbow-trout", "steelhead", "brown-trout", "brook-trout",
    ],
    closed: [],
    note:
      "Nebraska's 2026 fishing guide says hook-and-line fishing is allowed year-round throughout the state, except as noted or as posted at an area. Some lakes are catch-and-release only, and Lake Minatare and Lake Winters Creek are listed as closed from 15 October to 14 January or as posted. Pallid and lake sturgeon, bowfin and American eel may not be kept.",
    regulator: "Nebraska Game and Parks Commission",
    source: "https://outdoornebraska.gov/guides-maps/fishing-guides-reports/fishing-guide/",
    checked: CHECKED,
  },

  // ======================= United States: Oklahoma (Oklahoma City) ================================================
  // source: Oklahoma Department of Wildlife Conservation, 2026-27 Oklahoma Fishing and Hunting Regulations — rod and reel
  //   "throughout the year" statewide unless a Public Fishing Waters rule restricts it; the statewide limits table
  //   (https://www.wildlifedepartment.com/fishing/regs/statewide-daily-size-limits) gives no season for black bass, striped bass,
  //   white bass, crappie, channel catfish or walleye; the only statewide closure named is alligator gar, 1 to 31 May.
  {
    id: "us-ok-open",
    countryCode: US,
    admin1: ["OK", "Oklahoma"],
    species: ["largemouth-bass", "smallmouth-bass", "striped-bass", "black-crappie", "bluegill", "channel-catfish", "common-carp", "walleye"],
    closed: [],
    note:
      "Oklahoma's 2026-27 regulations allow rod-and-reel fishing throughout the year statewide unless a Public Fishing Waters rule restricts it, and the statewide limits table lists no season for bass, crappie, catfish or walleye. The one statewide closure it names is alligator gar, 1 to 31 May. A licence is needed unless exempt.",
    regulator: "Oklahoma Department of Wildlife Conservation",
    source: "https://www.wildlifedepartment.com/Magazine/2026/2026-27%20Oklahoma%20Fishing%20and%20Hunting%20Regulations.pdf",
    checked: CHECKED,
  },

  // ======================= United States: Texas (Dallas, Austin, San Antonio) =====================================
  // source: Texas Parks and Wildlife Department, Outdoor Annual, Freshwater Bag and Length Limits ("Valid Sep. 1, 2026 through
  //   Aug. 31, 2027."), re-read 11 November 2026 by the Day 3 checker — statewide daily bags and minimum lengths only; the page
  //   has no season wording at all (no "open all year", "no closed season" or "year-round"), so this row is a note, not an
  //   open-all-year row (it named 10 species until 11 November 2026). Largemouth, smallmouth, spotted, Alabama and Guadalupe
  //   bass "5 fish for any combination", largemouth and smallmouth 14-inch minimum; striped and hybrid "5 in any combination",
  //   18 in; white bass 25, 10 in; crappie 25, 10 in; sunfish no limit; channel and blue catfish 25, "only 10 can be 20 inches or
  //   greater"; flathead 5, 18 in; rainbow and brown trout 5; walleye 5, "only 2 can be less than 16 inches"; "Certain areas may
  //   be temporarily closed to fishing" during alligator gar spawning; "Special regulations may apply to certain waterbodies."
  // source: TPWD, Exceptions to Freshwater Harvest Regulations (valid 2026-27) — "On fresh waters not listed here, statewide limits
  //   apply."; no season wording. TPWD General Fishing Regulations (valid 2026-27) — "a freshwater endorsement is required for
  //   inland waters"; no season wording.
  {
    id: "us-tx-freshwater",
    countryCode: US,
    admin1: ["TX", "Texas"],
    species: [],
    closed: [],
    water: ["rivers", "lakes"],
    note:
      "Texas Parks and Wildlife's statewide freshwater limits (valid 1 September 2026 to 31 August 2027) give daily limits but no season dates for bass, crappie, sunfish, catfish, trout or walleye, and they do not say these fish are open all year, so no dates are loaded. Daily limits: 5 black bass in any combination (largemouth and smallmouth at least 14 inches); 5 striped and hybrid bass, at least 18 inches; 25 white bass and 25 crappie, at least 10 inches; no limit on sunfish; 25 channel and blue catfish, no more than 10 of them 20 inches or longer; 5 trout; 5 walleye. Some areas may be closed for a time while alligator gar spawn, and some named waters have their own rules. A freshwater endorsement is needed to fish inland waters.",
    regulator: "Texas Parks and Wildlife Department",
    source: "https://tpwd.texas.gov/regulations/outdoor-annual/fishing/freshwater-fishing/bag-length-limits",
    checked: "2026-11-11",
  },

  // ======================= United States: Missouri (Kansas City) ==================================================
  // source: Missouri Department of Conservation, Fishing Seasons and Limits page (2026 table, "not a legal document") — black bass
  //   in impoundments and non-Ozark streams "Jan 1 to Dec 31, 2026" (Ozark streams 23 May 2026 to 28 February 2027); black and
  //   white crappie, channel, blue and flathead catfish, and common carp (nongame) 1 January to 31 December 2026. The page does
  //   not place Kansas City relative to the Ozark streams, so no stream rule for black bass is loaded.
  {
    id: "us-mo-impoundment-bass",
    countryCode: US,
    admin1: ["MO", "Missouri"],
    species: ["largemouth-bass", "smallmouth-bass"],
    closed: [],
    water: ["lakes"],
    note:
      "Missouri's 2026 seasons table lists black bass in impoundments (lakes) as open 1 January to 31 December 2026. Streams are handled separately (Ozark streams have a later opening), so this covers lakes only.",
    regulator: "Missouri Department of Conservation",
    source: "https://mdc.mo.gov/fishing/seasons",
    checked: CHECKED,
  },
  {
    id: "us-mo-crappie-catfish-carp",
    countryCode: US,
    admin1: ["MO", "Missouri"],
    species: ["black-crappie", "channel-catfish", "common-carp"],
    closed: [],
    note:
      "Missouri's 2026 seasons table lists crappie, channel catfish and the common carp (nongame fish) as open 1 January to 31 December 2026.",
    regulator: "Missouri Department of Conservation",
    source: "https://mdc.mo.gov/fishing/seasons",
    checked: CHECKED,
  },
];


// ============================================================================================================
// LAND: who says whether you may pick, read on the owner's own page (2 November 2026).
// ============================================================================================================

type Pt = { lat: number; lon: number };
const kmBetween = (a: Pt, b: Pt) => {
  const r = Math.PI / 180;
  const dLat = (b.lat - a.lat) * r;
  const dLon = (b.lon - a.lon) * r;
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(a.lat * r) * Math.cos(b.lat * r) * Math.sin(dLon / 2) ** 2;
  return 2 * 6371 * Math.asin(Math.sqrt(h));
};
const inCircle = (c: Pt, radiusKm: number) => (p: LandPlace) => kmBetween(c, p) <= radiusKm;
const inProvince = (code: string, name: string) => (p: LandPlace) => p.countryCode === CA && (p.admin1Code === code || p.admin1 === name);
const inState = (code: string, name: string) => (p: LandPlace) => p.countryCode === US && (p.admin1Code === code || p.admin1 === name);
const both = (...tests: ((p: LandPlace) => boolean)[]) => (p: LandPlace) => tests.every((t) => t(p));

export const LAND: LandRule[] = [
  // ---- Canada: Manitoba ----------------------------------------------------------------------------------------
  // Manitoba Parks, Foraging in Provincial Parks: "small amounts of berries, mushrooms, and nuts" for personal use without a permit,
  //   if the species is not protected under federal or provincial law; commercial harvest needs a permit; no numeric limit; specific
  //   parks may have additional restrictions.
  {
    id: "mb-provincial-parks",
    applies: inProvince("MB", "Manitoba"),
    title: "Manitoba provincial parks",
    rule: "Manitoba Parks says anyone may gather small amounts of berries, mushrooms and nuts for personal use in provincial parks without a permit, as long as the species is not protected under federal or provincial law. Harvesting to sell or trade needs a permit, and individual parks may have extra restrictions.",
    source: { label: "Manitoba Parks: Foraging in Provincial Parks", url: "https://www.gov.mb.ca/sd/parks/recreation-and-activities/foraging/" },
    checked: CHECKED,
  },
  // City of Winnipeg Parks By-law No. 85/2009 (passed 27 May 2009, in force 1 June 2009), s. 17(a): disturbing, removing or damaging a
  //   tree, branch, flower, plant or other vegetation in a park is prohibited unless authorized (s. 7: by the CAO); fruit, berries and
  //   fungi are not named.
  {
    id: "winnipeg-parks-bylaw",
    applies: both(inProvince("MB", "Manitoba"), inCircle({ lat: 49.8951, lon: -97.1384 }, 40)),
    title: "City of Winnipeg parks",
    rule: "The Parks By-law (No. 85/2009) says no one may disturb, remove or damage a tree, branch, flower, plant or other vegetation in a park unless it is authorized. The by-law does not name fruit, berries or fungi.",
    source: { label: "City of Winnipeg: Parks By-law No. 85/2009 (s. 17)", url: "https://clkapps.winnipeg.ca/DMIS/Documents/DocExt/BL/2009/2009.85.pdf" },
    checked: CHECKED,
  },

  // ---- Canada: Saskatchewan ------------------------------------------------------------------------------------
  // Provincial Capital Commission bylaws (Wascana Centre, as of 9 June 2023): Bylaw 3 (Parks and Open Spaces) s. 7(b) lists destroying,
  //   cutting, pruning, mowing or removing any plant material as regulated conduct; a Commission permit is needed (Bylaw 3 s. 6,
  //   Bylaw 2 s. 5) unless a Commission sign authorizes the activity.
  {
    id: "regina-wascana-centre",
    applies: both(inProvince("SK", "Saskatchewan"), inCircle({ lat: 50.4452, lon: -104.6189 }, 8)),
    title: "Wascana Centre (Provincial Capital Commission)",
    rule: "The Provincial Capital Commission's Parks and Open Spaces bylaw (Bylaw 3) lists destroying, cutting, pruning, mowing or removing any plant material as regulated conduct in Wascana Centre. It needs a Commission permit unless a Commission sign allows it.",
    source: { label: "Provincial Capital Commission bylaws (Bylaw 3, s. 6-7; version in force from 24 May 2023, certified 9 June 2023)", url: "https://wascana.ca/pub/pcc-bylaws_as-of-june-9-2023.pdf" },
    checked: CHECKED,
  },
  // Meewasin Valley Authority, Bylaw No. 001 (Public Parks Bylaw; in effect 12 November 2004), s. 7(b): in the parks listed in Schedule A, no
  //   person shall uproot, fell or remove the whole or part of any shrub or tree, "except as may be authorized" in writing or by a sign.
  //   Flowers, fruit, berries and mushrooms are not named.
  {
    id: "saskatoon-meewasin-parks",
    applies: both(inProvince("SK", "Saskatchewan"), inCircle({ lat: 52.1332, lon: -106.67 }, 30)),
    title: "Meewasin Valley Authority parks",
    rule: "The Meewasin Valley Authority's Public Parks Bylaw (No. 001) says that in the parks listed in its schedule, no person shall uproot, fell or remove the whole or part of any shrub or tree, unless the Authority authorizes it in writing or by a sign. The bylaw does not name flowers, fruit, berries or mushrooms.",
    source: { label: "Meewasin Valley Authority: Bylaw No. 001, Public Parks Bylaw (s. 7)", url: "https://meewasin.com/wp-content/uploads/2019/11/Bylaw-001-Public-Park.pdf" },
    checked: CHECKED,
  },

  // ---- Canada: Alberta -----------------------------------------------------------------------------------------
  // City of Calgary, Good park user reference guide: "Leave all natural materials" (trees, flowers, berries, plants); cites Parks and Pathways
  //   Bylaw 11M2019. City bylaws page (Parks & Pathways Bylaw overview): "don't collect plant or animal material or cause damage". Mushrooms not named.
  {
    id: "calgary-parks",
    applies: both(inProvince("AB", "Alberta"), inCircle({ lat: 51.0447, lon: -114.0719 }, 25)),
    title: "City of Calgary parks",
    rule: "The City of Calgary's guide for park users, which cites the Parks and Pathways Bylaw 11M2019, asks visitors to leave all natural materials, including trees, flowers, berries and plants, and the City's bylaw page says not to collect plant or animal material in parks. Neither page names mushrooms.",
    source: { label: "City of Calgary: Good park user reference guide, and bylaws-by-topic page", url: "https://www.calgary.ca/parks/activities/user-guide.html" },
    checked: CHECKED,
  },
  // Parks Canada, Elk Island National Park visitor guidelines: collecting natural or historic objects is illegal (plants, mushrooms, berries,
  //   animal parts such as antlers, fossils, driftwood, rocks, signs); no personal-use exception on the page.
  {
    id: "elk-island-national-park",
    applies: both(inProvince("AB", "Alberta"), inCircle({ lat: 53.6, lon: -112.85 }, 60)),
    title: "Elk Island National Park (Parks Canada)",
    rule: "Parks Canada says collecting natural or historic objects in the park is illegal, and its list includes plants, mushrooms and berries as well as antlers, fossils, driftwood and rocks. The page names no personal-use exception.",
    source: { label: "Parks Canada: Elk Island National Park visitor guidelines", url: "https://parks.canada.ca/pn-np/ab/elkisland/securite-safety/comportements-guidelines" },
    checked: CHECKED,
  },

  // ---- United States: North Dakota -----------------------------------------------------------------------------
  // North Dakota Game and Fish, Wildlife Management Areas regulations (N.D.A.C. 30-04-02-07): removing plants, trees, shrubs, vines, sod, crops,
  //   gravel, firewood needs a permit from the director; "Berries and fruit may be picked for noncommercial use" unless signs at public road
  //   entries prohibit it; mushrooms and nuts are not mentioned.
  {
    id: "nd-wildlife-management-areas",
    applies: inState("ND", "North Dakota"),
    title: "North Dakota wildlife management areas",
    rule: "North Dakota Game and Fish says berries and fruit may be picked for noncommercial use on wildlife management areas, unless signs at the public road entries prohibit it. Cutting or removing plants, trees, shrubs or vines needs a permit from the director. The rule does not mention mushrooms or nuts.",
    source: { label: "North Dakota Game and Fish: Wildlife Management Areas", url: "https://gf.nd.gov/wma" },
    checked: CHECKED,
  },
  // Revised and Restated Ordinances of the Park District of the City of Fargo, approved 11 August 2026 (in force about 28 August 2026), s. 8 item 5:
  //   unlawful to damage or deface Park Property, including shrubbery, trees, other vegetation; picking and foraging not mentioned; s. 8 item 2 and s. 13: posted rules.
  {
    id: "fargo-park-district",
    applies: both(inState("ND", "North Dakota"), inCircle({ lat: 46.8772, lon: -96.7898 }, 15)),
    title: "Fargo Park District parks",
    rule: "The Fargo Park District's ordinances (approved 11 August 2026) make it unlawful to damage or deface park property, including shrubbery, trees and other vegetation. They do not mention picking or foraging, and they also make it unlawful to break the District's posted rules.",
    source: { label: "Fargo Park District: Revised and Restated Ordinances (s. 8)", url: "https://fargoparks.com/sites/default/files/2026-08/Ordinance%20-Final-%208.12.2026.pdf" },
    checked: CHECKED,
  },

  // ---- United States: Iowa -------------------------------------------------------------------------------------
  // Iowa Code 461A.41, "Removing plants, flowers, or fruit": bars removing, destroying, injuring or defacing trees, shrubs, plants, flowers or their
  //   fruit on state-owned land and waters under the Natural Resource Commission's jurisdiction; exceptions: scientific removal with written permission,
  //   commission staff managing the land, and gathering or removal allowed under commission rules (chapter 17A). Nuts and mushrooms not named.
  {
    id: "iowa-state-land",
    applies: inState("IA", "Iowa"),
    title: "Iowa state-owned parks and other land under the Natural Resource Commission",
    rule: "Iowa Code section 461A.41 bars removing, destroying, injuring or defacing trees, shrubs, plants, flowers or their fruit on state-owned land and water under the Natural Resource Commission's jurisdiction. It exempts removal for scientific purposes with written permission, and gathering that the Commission's own rules allow. It does not name nuts or mushrooms.",
    source: { label: "Iowa Code 461A.41: Removing plants, flowers, or fruit", url: "https://www.legis.iowa.gov/docs/code/461A.41.pdf" },
    checked: CHECKED,
  },

  // ---- United States: Colorado ---------------------------------------------------------------------------------
  // Colorado Parks and Wildlife Commission, Chapter P-1 (Parks and Outdoor Recreation Lands; effective 2 March 2022), 100.C.2: prohibited to remove,
  //   destroy, mutilate, modify or deface any tree, shrub, or other plant or vegetation, including dead timber and forest litter, and natural objects;
  //   exceptions: firewood in designated areas, noxious weeds, recreational gold mining in the Arkansas Headwaters Recreation Area.
  {
    id: "colorado-state-parks",
    applies: inState("CO", "Colorado"),
    title: "Colorado state parks",
    rule: "Colorado Parks and Wildlife's rules for state parks (Chapter P-1, rule 100.C.2) prohibit removing, destroying, mutilating or defacing any tree, shrub or other plant or vegetation, and objects of natural or environmental interest. The exceptions it names are firewood from designated areas, noxious weeds and recreational gold mining in the Arkansas Headwaters Recreation Area, except where signs prohibit them. The rule does not name berries, mushrooms or flowers.",
    source: { label: "Colorado Parks and Wildlife: Chapter P-1, Parks and Outdoor Recreation Lands (100.C.2)", url: "https://cpw.state.co.us/sites/default/files/dam/epcnlzqihv/ch-p-1-as-approved.pdf" },
    checked: CHECKED,
  },
  // U.S. Forest Service, Arapaho and Roosevelt National Forests and Pawnee National Grassland, Permits page: many special forest products need a
  //   Personal or Commercial Use permit; mushrooms named; "edible or decorative material" listed; no quantities on the page.
  {
    id: "arapaho-roosevelt-national-forests",
    applies: both(inState("CO", "Colorado"), inCircle({ lat: 39.7392, lon: -104.9903 }, 90)),
    title: "Arapaho and Roosevelt National Forests (U.S. Forest Service)",
    rule: "The Forest Service says many special forest products in the Arapaho and Roosevelt National Forests need a Personal or Commercial Use permit. It names mushrooms and lists edible or decorative material, and the permits page gives no quantities.",
    source: { label: "U.S. Forest Service: Arapaho and Roosevelt National Forests and Pawnee National Grassland, permits", url: "https://www.fs.usda.gov/r02/arp/permits" },
    checked: CHECKED,
  },

  // ---- United States: Missouri ---------------------------------------------------------------------------------
  // Missouri Department of Conservation, 3 CSR 10-11.135 Wild Plants, Plant Products, and Mushrooms (text in force, 2018 version; the page also shows a
  //   proposed amendment published 17 March 2025): nuts, berries, fruits, edible wild greens and mushrooms may be taken on Department areas only for
  //   personal consumption unless further restricted; barred at Cape Girardeau Conservation Campus Nature Center, Conservation Commission Headquarters,
  //   Powder Valley, Runge, Springfield and Twin Pines nature/education centers (the proposal adds Shoal Creek); at Burr Oak Woods and Rockwoods only mushrooms.
  // Day 3 check (11 November 2026), Missouri Secretary of State, Code of State Regulations, 3 CSR 10-11 (current; rule pages dated 7/31/25):
  //   3 CSR 10-11.135 "Amended: Filed Feb. 7, 2025, effective Aug. 30, 2025" (the March 2025 proposal is now in force). (1) "Nuts, berries, fruits,
  //   edible wild greens, and mushrooms may be taken only for personal consumption" unless further restricted; (1)(A) barred at Cape Girardeau
  //   Conservation Nature Center, Conservation Commission Headquarters, Powder Valley Conservation Nature Center, Prairie Fork Conservation Area, Runge
  //   Conservation Nature Center, Shoal Creek Conservation Education Center, Springfield Conservation Nature Center and Twin Pines Conservation Education
  //   Center; (1)(B) "On Burr Oak Woods Conservation Area and Rockwoods Reservation only mushrooms may be taken."; (1)(C) "On areas designated by the
  //   Conservation Commission as Missouri Natural Areas, taking edible wild greens is prohibited." https://www.sos.mo.gov/cmsimages/adrules/csr/current/3csr/3c10-11.pdf
  {
    id: "missouri-conservation-areas",
    applies: inState("MO", "Missouri"),
    title: "Missouri Department of Conservation areas",
    rule: "The Missouri Department of Conservation's rule (3 CSR 10-11.135, as amended in force from 30 August 2025) says nuts, berries, fruits, edible wild greens and mushrooms may be taken on its areas only for your own consumption, unless a further restriction applies. Taking them is barred at the eight sites the rule lists: its nature and education centers (Powder Valley among them), the Conservation Commission headquarters and Prairie Fork Conservation Area. Burr Oak Woods and Rockwoods Reservation allow mushrooms only, and on designated Missouri Natural Areas edible wild greens may not be taken.",
    source: { label: "Missouri Code of State Regulations (Secretary of State): 3 CSR 10-11.135, Wild Plants, Plant Products, and Mushrooms", url: "https://www.sos.mo.gov/cmsimages/adrules/csr/current/3csr/3c10-11.pdf" },
    checked: "2026-11-11",
  },
  // Missouri State Parks, Laws and Regulations: removing plants, animals, rocks, downed timber, artifacts or relics is prohibited without the state
  //   park director's written permission; no personal-use exception on the page; flowers, fruit, nuts, mushrooms and berries are not named.
  // Day 3 check (11 November 2026): the regulation itself has a personal-use exception. Missouri Secretary of State, Code of State Regulations,
  //   10 CSR 90-2.040 Park Property (current; pages dated 11/30/25; "Amended: Filed June 7, 2018, effective Feb. 28, 2019"), (4)(A) no person shall
  //   "pick the flowers of any plant species" or "collect or remove flowers or other plant parts" "without written permission from the director";
  //   (4)(B) "Persons may collect wild edible fruit, berries, seeds, and nuts (excluding below-ground plant parts)" "in a quantity not to exceed a
  //   one (1) gallon container" "for personal consumption within a state park or state historic site."; (4)(C) "For personal consumption outside a
  //   state park or state historic site," "persons may collect edible mushrooms by hand in a quantity not to exceed a two (2) gallon container."
  //   https://www.sos.mo.gov/cmsimages/adrules/csr/current/10csr/10c90-2.pdf
  {
    id: "missouri-state-parks",
    applies: inState("MO", "Missouri"),
    title: "Missouri state parks and historic sites",
    rule: "Missouri's state park rule (10 CSR 90-2.040) forbids picking flowers, or collecting or removing flowers or other plant parts, without the director's written permission. It makes two exceptions. Wild edible fruit, berries, seeds and nuts, but no below-ground parts, may be collected up to a one-gallon container, to be eaten within the state park or historic site. Edible mushrooms may be collected by hand up to a two-gallon container, to be eaten outside the park.",
    source: { label: "Missouri Code of State Regulations (Secretary of State): 10 CSR 90-2.040, Park Property, section (4)", url: "https://www.sos.mo.gov/cmsimages/adrules/csr/current/10csr/10c90-2.pdf" },
    checked: "2026-11-11",
  },

  // ---- United States: Nebraska ---------------------------------------------------------------------------------
  // Nebraska Game and Parks Commission, Hunt morels (Foraging): state parks, state recreation areas and Game and Parks wildlife management areas are
  //   "open to the public for mushroom hunting"; other state and federal lands may have their own requirements, including a harvesting permit;
  //   the page gives no quantity or commercial rules and is not the regulation text.
  {
    id: "nebraska-state-lands",
    applies: inState("NE", "Nebraska"),
    title: "Nebraska state parks, recreation areas and wildlife management areas",
    rule: "Nebraska Game and Parks says state parks, state recreation areas and its wildlife management areas are open to the public for mushroom hunting. It adds that other state and federal land may have its own requirements, including a harvesting permit. The page gives no quantity limits and does not cover other plants.",
    source: { label: "Nebraska Game and Parks: Hunt morels", url: "https://outdoornebraska.gov/learn/outdoor-skills/foraging/hunt-morels/" },
    checked: CHECKED,
  },

  // ---- United States: Texas ------------------------------------------------------------------------------------
  // Texas Parks and Wildlife, State Park Rules: "federal and state laws prohibit collecting plants, animals, and artifacts"; no personal-use exception on the page.
  {
    id: "texas-state-parks",
    applies: inState("TX", "Texas"),
    title: "Texas state parks",
    rule: "Texas Parks and Wildlife says federal and state laws prohibit collecting plants, animals and artifacts in state parks. Its park rules page names no personal-use exception.",
    source: { label: "Texas Parks and Wildlife: State park rules", url: "https://tpwd.texas.gov/state-parks/park-information/rules" },
    checked: CHECKED,
  },
  // City of Dallas Code, Sec. 32-3 "Injury to trees, shrubs, fences, etc." (as hosted by American Legal Publishing): unlawful to cut, break, deface or
  //   otherwise injure trees, shrubs, plants, grass, turf and other park property; picking flowers or fruit is not named.
  {
    id: "dallas-parks",
    applies: both(inState("TX", "Texas"), inCircle({ lat: 32.7767, lon: -96.797 }, 30)),
    title: "City of Dallas parks",
    rule: "The Dallas City Code makes it unlawful in the city's parks to cut, break, deface or otherwise injure trees, shrubs, plants, grass or turf, or other park property. The rule does not name picking flowers or fruit.",
    source: { label: "Dallas City Code: injury to trees, shrubs, fences, etc.", url: "https://codelibrary.amlegal.com/codes/dallas/latest/dallas_tx/0-0-0-115010" },
    checked: CHECKED,
  },
  // City of Austin, notice of proposed Rule R161-26.29 (posted 24 August 2026), which carries forward unchanged the park-use rule R0161-14.25, s. 1.1.20
  //   Protected Resources: no intentionally injuring, cutting or removing live plants or fungi without the director's approval; fruits and nuts that have fallen
  //   to the ground may be gathered; picking fruits or nuts is prohibited unless in an area designated and posted for it.
  {
    id: "austin-parks",
    applies: both(inState("TX", "Texas"), inCircle({ lat: 30.2672, lon: -97.7431 }, 25)),
    title: "City of Austin parks",
    rule: "Austin Parks and Recreation's park-use rule (section 1.1.20, carried forward without change in a rule notice dated 24 August 2026) says people may not intentionally injure, thrash or remove live plants or fungi without the director's approval. Fruits and nuts that have fallen to the ground may be gathered, but picking them is prohibited unless the area is designated and posted for it.",
    source: { label: "City of Austin: notice of proposed Rule R161-26.29, Parks Criteria Manual (s. 1.1.20)", url: "https://services.austintexas.gov/edims/document.cfm?id=479895" },
    checked: CHECKED,
  },
];
