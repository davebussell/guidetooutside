/**
 * Rules read from the regulator's own pages for the ecoregion "Northeast Coast" (northeast-coast): Boston, New York, Philadelphia, Richmond, Washington and Baltimore.
 *
 * CLOSED: closed-season rows (same shape and standard as src/data/closed-seasons.ts: a regulator, the page it
 * was read from, the date it was read, dates written as the regulator gives them).
 * LAND: where-you-may-pick rules (same shape and standard as src/data/land-rules.ts: the regulator's wording,
 * kept inside the source, with the page and the date it was read).
 *
 * Read 10 November 2026 (Day 2 of the regional audit). Nothing here is inferred: a row exists only where the page
 * was opened and read.
 */
import type { ClosedSeason } from "../closed-seasons";
import type { LandPlace, LandRule } from "../land-rules";

const CHECKED = "2026-11-10";
const BOSTON = { lat: 42.3588, lon: -71.0578 };
const NEW_YORK = { lat: 40.7127, lon: -74.0060 };
const PHILADELPHIA = { lat: 39.9527, lon: -75.1635 };
const RICHMOND = { lat: 37.5385, lon: -77.4343 };
const WASHINGTON = { lat: 38.8951, lon: -77.0364 };
const BALTIMORE = { lat: 39.2909, lon: -76.6108 };

export const CLOSED: ClosedSeason[] = [
  // ======================= Massachusetts (Boston) =======================
  // source: MassWildlife, "Freshwater fishing regulations" (mass.gov; no edition or updated date on the page, footer © 2026), read 10 November 2026 —
  //   seasons table: Trout (Statewide) "Jan. 1 – Dec. 31", 6 a day; Black Bass (Largemouth and Smallmouth) "Jan. 1 – Dec. 31", 12 in., 5;
  //   Northern Pike "Jan. 1 – Dec. 31", 28 in., 1; Walleye "Jan. 1 – Dec. 31", 14 in., 5; "All Other Freshwater Species" "Jan. 1 – Dec. 31";
  //   Smelt "Jan. 1 – Feb. 28; May 16 – Dec. 31". The Quabbin and Wachusett/Sudbury reservoirs have DCR seasons. The page names no Boston-area
  //   water (not the Charles, Mystic or Neponset). Its eight catch-and-release areas are all outside Greater Boston.
  //   https://www.mass.gov/info-details/freshwater-fishing-regulations
  {
    id: "us-ma-boston-freshwater-all-year",
    countryCode: "US",
    admin1: ["MA", "Massachusetts"],
    near: { ...BOSTON, km: 25 },
    species: ["brook-trout", "brown-trout", "rainbow-trout", "largemouth-bass", "smallmouth-bass", "northern-pike", "walleye", "black-crappie", "yellow-perch", "bluegill", "channel-catfish", "common-carp"],
    closed: [],
    water: ["rivers", "lakes"],
    note: "MassWildlife's seasons table gives trout, black bass, northern pike and walleye an open season of 1 January to 31 December, and gives the same dates to all other freshwater species (crappie, perch, sunfish, catfish and carp among them). Limits apply: trout 6 a day; bass 12 inches, 5 a day; pike 28 inches, 1 a day; walleye 14 inches, 5 a day. The Sudbury, Wachusett and Quabbin reservoirs west of Boston have their own DCR seasons.",
    regulator: "MassWildlife (Massachusetts Division of Fisheries and Wildlife)",
    source: "https://www.mass.gov/info-details/freshwater-fishing-regulations",
    checked: CHECKED,
  },
  // source: Massachusetts Division of Marine Fisheries, "Recreational saltwater fishing regulations" (the page says it "was last updated on
  //   April 28, 2026"), read 10 November 2026. Striped bass: "28" to less than 31"", season "Year Round", 1 fish; inline circle hooks required
  //   with natural bait; gaffing prohibited. Bluefish: "Year Round", 5 fish (shore and private boats) or 7 (for-hire). Mackerel: "Year Round",
  //   25 fish (private) or 50 (for-hire). General notes: "For any dates not listed in the "Season" column, the recreational fishery is closed",
  //   and during closed seasons retention is prohibited and "all catch must be released". A note under the table still reads "Rules are subject
  //   to change for 2025." Gulf of Maine is "all waters north of Cape Cod, including Cape Cod Bay". Footnote 8: "All recreational anglers are
  //   required to use inline circle hooks when fishing for striped bass with whole or cut natural baits"; "gaffing striped bass is prohibited".
  //   Footnote 4: "The limits listed apply to state-waters only."
  // source (checker, 10 November 2026): DMF, 2026 Recreational Angler Rules Poster ("as of May 1, 2026") — Striped Bass "Year round", 28" to less
  //   than 31", 1 fish; Bluefish "Year round", 5 fish; Atlantic Mackerel "Year round", 25 fish.
  //   https://www.mass.gov/doc/recreational-saltwater-fishing-limits-poster/download
  // source (checker): NOAA Fisheries GARFO, "What Can I Catch?" (last updated 10/02/2026) — striped bass: "No recreational fishing allowed in
  //   federal waters." https://www.fisheries.noaa.gov/new-england-mid-atlantic/recreational-fishing/recreational-fishing-regulations-species
  {
    id: "us-ma-boston-sea-all-year",
    countryCode: "US",
    admin1: ["MA", "Massachusetts"],
    near: { ...BOSTON, km: 25 },
    species: ["striped-bass", "bluefish", "atlantic-mackerel"],
    closed: [],
    water: ["sea", "estuary"],
    note: "Massachusetts' Division of Marine Fisheries lists striped bass, bluefish and mackerel with a year-round season in state waters (its 2026 poster agrees). Striped bass: one fish a day, 28 inches to less than 31, inline circle hooks with natural bait, no gaffing. Bluefish: 5 a day from shore or a private boat, 7 on a for-hire boat. Mackerel: 25 a day for private anglers, 50 on a for-hire boat. NOAA Fisheries allows no recreational striped bass fishing in federal waters, offshore of state waters.",
    regulator: "Massachusetts Division of Marine Fisheries",
    source: "https://www.mass.gov/info-details/recreational-saltwater-fishing-regulations",
    checked: CHECKED,
  },
  // source: same DMF page — "Cod (4, 5) * Western Gulf of Maine": min 23", season "Sept 1 - Oct 31", 1 fish. Footnote 5: "It is unlawful to fish
  //   with hook and line gear in the Winter Cod Conservation Closure from November 15 through January 31"; "It is unlawful to take cod from the
  //   Spring Cod Conservation Closure from April 16 through July 21" (closure maps are in 322 CMR 8.07 and are not on the page). Southern New
  //   England state waters are closed to cod retention. Footnote 4: "The limits listed apply to state-waters only." The page also says DMF
  //   "expects there will be new recreational cod and haddock rules later this summer".
  // source (checker): DMF 2026 Recreational Angler Rules Poster ("as of May 1, 2026") — Atlantic Cod "Western Gulf of Maine: Sept 1 - Oct 31 /
  //   23" / 1 fish"; "Southern New England: CLOSED".
  // source (checker): NOAA Fisheries, Amendment 25 to the Northeast Multispecies FMP, final rule, 91 FR (30 June 2026), FR Doc. 2026-13153 —
  //   "This rule is effective June 30, 2026." WGOM cod: "a recreational possession limit of one fish, and a recreational open season of
  //   September 1–October 31", 23-inch minimum; the final rule "does not include the May season that was originally proposed".
  //   https://www.govinfo.gov/content/pkg/FR-2026-06-30/pdf/2026-13153.pdf (status from NOAA's Northeast Multispecies plan page: "Final Rule",
  //   effective 06/30/2026). NOAA's recreational groundfish page (last updated 09/22/2026) lists the same. So the 2026 Boston cod rule is final and
  //   in force, but it closes retention, not fishing: DMF's general note says catch must be released outside the season, so no closed range;
  //   the days outside the season are `noKeep` (catch and release only), which the pages print with the regulator (fix of 11 November 2026:
  //   the audit of 10 November found Boston's cod "In season now" in November while this was a note).
  // source (checker): 322 CMR 8.07(1), Winter Cod Conservation Zone (mass.gov PDF; regulation page dated 04/26/2024) — straight lines joining
  //   42°21.0'N at the MA coast, 42°21.0'N 70°40.0'W, 42°23.6'N 70°39.2'W, 42°27.5'N 70°42.4'W and 42°27.5'N at the MA coast; "The restricted
  //   season shall be November 15th through January 31st"; no fishing with gear capable of catching cod, hook and line included. 8.07(2), Spring
  //   Cod Conservation Zone: 42°30.0'–42°33.0'N, 70°38.5'–70°44.5'W, April 16 through July 21.
  //   https://www.mass.gov/doc/322-cmr-8-coastal-fisheries-conservation-and-management/download
  {
    id: "us-ma-boston-cod",
    countryCode: "US",
    admin1: ["MA", "Massachusetts"],
    near: { ...BOSTON, km: 25 },
    species: ["atlantic-cod"],
    closed: [],
    noKeep: [{ from: "11-01", to: "08-31" }],
    water: ["sea", "estuary"],
    note: "In the western Gulf of Maine (waters north of Cape Cod), Massachusetts lists a 2026 cod season of 1 September to 31 October: one fish a day, at least 23 inches. NOAA's federal rule, in force since 30 June 2026, sets the same season in federal waters. Outside that season cod may not be kept and must be released. Hook-and-line fishing is barred from 15 November to 31 January in the Winter Cod Conservation Zone, which runs from the coast between latitudes 42°21' and 42°27.5' N out to about 70°40' W, just north-east of Boston Harbor. Taking cod is barred from 16 April to 21 July in the Spring Cod Conservation Zone, a box at 42°30' to 42°33' N and 70°38.5' to 70°44.5' W (322 CMR 8.07).",
    regulator: "Massachusetts Division of Marine Fisheries",
    source: "https://www.mass.gov/info-details/recreational-saltwater-fishing-regulations",
    checked: CHECKED,
  },
  // source: MassWildlife freshwater page — "Anglers ages 15 years or older need a license to fish"; licences are free for ages 15–17 and 70+.
  // source: DMF, "Get a Recreational Saltwater Fishing Permit" (no date on the page) — "If you're 16 or older, you need a recreational saltwater
  //   fishing permit". Exemptions: under 16; anglers on permitted for-hire vessels; disabled persons under M.G.L. c. 19C; non-residents holding a
  //   CT, NH or RI permit. Anglers 60 and over pay no fee but must still get a permit.
  //   https://www.mass.gov/how-to/get-a-recreational-saltwater-fishing-permit
  {
    id: "us-ma-boston-licence",
    countryCode: "US",
    admin1: ["MA", "Massachusetts"],
    near: { ...BOSTON, km: 25 },
    species: [],
    closed: [],
    note: "In Massachusetts, anglers 15 and older need a freshwater fishing licence (free at 15 to 17 and at 70 and over). In salt water, anyone 16 or older needs a recreational saltwater fishing permit. Anglers 60 and over pay no fee but still need the permit, and anglers on permitted for-hire boats are exempt.",
    regulator: "MassWildlife and Massachusetts Division of Marine Fisheries",
    source: "https://www.mass.gov/how-to/get-a-recreational-saltwater-fishing-permit",
    checked: CHECKED,
  },

  // ======================= New York (New York City) =======================
  // source: NYS DEC, Statewide Freshwater Fishing Seasons, Sizes, and Catch Limits ("Statewide Regulations Effective April 1, 2026"), read
  //   10 November 2026. "All year": crappie (10 in., 25), yellow perch (50), sunfish (25), and brown and rainbow trout and splake in lakes and ponds.
  //   Black bass "June 15 - Nov 30" (12 in., 5); "Dec 1 - June 14" "Catch and Release only. Artificial lures only".
  //   Walleye, northern pike and pickerel "May 1 - Mar 15"; muskellunge "June 1 - Nov 30"; trout in inland trout streams "April 1 - Oct 15".
  // source: NYS DEC, Region 2 Special Fishing Regulations (New York City; no date on the page) — "Statewide seasons and limits apply, except as
  //   listed below"; "All fish, All year, catch and release only" for Central Park (all waters), Prospect Park Lake, Indian Lake (Crotona Park),
  //   Baisley Pond and Brooks Lake.
  //   https://dec.ny.gov/things-to-do/freshwater-fishing/regulations/region-2-special-fishing
  // source: NYS DEC, General Freshwater Fishing Regulations (no date on the page) — "A person may not fish for a species (including catch and
  //   release) during the closed season for that species on a given water."
  {
    id: "us-ny-nyc-panfish-all-year",
    countryCode: "US",
    admin1: ["NY", "New York"],
    near: { ...NEW_YORK, km: 20 },
    species: ["black-crappie", "yellow-perch", "bluegill"],
    closed: [],
    water: ["rivers", "lakes"],
    note: "New York's statewide table (effective 1 April 2026) lists crappie, yellow perch and sunfish as open all year. The city's Region 2 page makes Central Park's waters, Prospect Park Lake, Indian Lake in Crotona Park, Baisley Pond and Brooks Lake catch and release only for all fish, all year.",
    regulator: "New York State DEC",
    source: "https://dec.ny.gov/things-to-do/freshwater-fishing/regulations/statewide-season-sizes-catch-limits",
    checked: CHECKED,
  },
  {
    id: "us-ny-nyc-lakes-trout-all-year",
    countryCode: "US",
    admin1: ["NY", "New York"],
    near: { ...NEW_YORK, km: 20 },
    species: ["brown-trout", "rainbow-trout"],
    closed: [],
    water: ["lakes"],
    note: "New York's statewide table lists brown and rainbow trout in lakes and ponds as open all year (5 a day, only 2 longer than 12 inches). Trout in inland trout streams are open 1 April to 15 October. Central Park's waters and Prospect Park Lake are catch and release only all year.",
    regulator: "New York State DEC",
    source: "https://dec.ny.gov/things-to-do/freshwater-fishing/regulations/statewide-season-sizes-catch-limits",
    checked: CHECKED,
  },
  {
    id: "us-ny-nyc-lakes-bass-all-year",
    countryCode: "US",
    admin1: ["NY", "New York"],
    near: { ...NEW_YORK, km: 20 },
    species: ["largemouth-bass", "smallmouth-bass"],
    closed: [],
    water: ["lakes"],
    note: "Under New York's statewide table, black bass may be kept from 15 June to 30 November (12 inches, 5 a day). From 1 December to 14 June they are catch and release only, with artificial lures only. The Region 2 lakes it names (Central Park, Prospect Park Lake and others) are catch and release only all year. The tidal Hudson has a different rule.",
    regulator: "New York State DEC",
    source: "https://dec.ny.gov/things-to-do/freshwater-fishing/regulations/statewide-season-sizes-catch-limits",
    checked: CHECKED,
  },
  {
    id: "us-ny-nyc-freshwater-notes",
    countryCode: "US",
    admin1: ["NY", "New York"],
    near: { ...NEW_YORK, km: 20 },
    species: [],
    closed: [],
    water: ["rivers", "lakes"],
    note: "New York City's Region 2 rules make every water in Central Park, Prospect Park Lake, Indian Lake (Crotona Park), Baisley Pond and Brooks Lake catch and release only for all fish, all year; other city waters follow the statewide table. That table sets walleye, northern pike and pickerel from 1 May to 15 March, muskellunge from 1 June to 30 November and trout in inland trout streams from 1 April to 15 October. DEC's general rules say you may not fish for a species during its closed season, even to release it.",
    regulator: "New York State DEC (Region 2, New York City)",
    source: "https://dec.ny.gov/things-to-do/freshwater-fishing/regulations/region-2-special-fishing",
    checked: CHECKED,
  },
  // source: NYS DEC, Tidal Hudson River Special Regulations (no date on the page), read 10 November 2026. "Statewide seasons and limits apply,
  //   except as listed below." Black bass in the "Tidal Hudson River and all tributaries to the first impassable barrier by fish": June 15 to
  //   November 30 (15 in., 5); fishing including catch and release is prohibited December 1 through June 14. American eel: "From the Battery to
  //   the Troy Dam", bait only, 9–14 in., 25 a day, "No eels may be possessed for food". American shad: "Fishing for or possession prohibited".
  //   Striped bass rules here cover only the Hudson north of the George Washington Bridge. (Checker: the page gives no overall definition of the
  //   tidal Hudson; "From the Battery to the Troy Dam" belongs to the eel entry only.)
  // source: General Freshwater Fishing Regulations — the Marine and Coastal District includes "all other tidal waters, including the Hudson River
  //   upstream to the Mario M. Cuomo Bridge".
  {
    id: "us-ny-nyc-tidal-hudson-notes",
    countryCode: "US",
    admin1: ["NY", "New York"],
    near: { ...NEW_YORK, km: 15 },
    species: [],
    closed: [],
    water: ["estuary", "rivers"],
    note: "On the tidal Hudson and its tributaries up to the first barrier fish cannot pass, black bass are open from 15 June to 30 November (15 inches, 5 a day), and fishing for them, even catch and release, is prohibited from 1 December to 14 June. From the Battery to the Troy Dam, eels may be taken for bait only (9 to 14 inches, 25 a day), never kept for food. Fishing for American shad is prohibited. DEC counts the Hudson up to the Mario M. Cuomo Bridge as part of its Marine and Coastal District; its saltwater table has one striped bass rule south of the George Washington Bridge and another north of it.",
    regulator: "New York State DEC (tidal Hudson River)",
    source: "https://dec.ny.gov/things-to-do/freshwater-fishing/regulations/tidal-hudson-river-special-regulations",
    checked: CHECKED,
  },
  // source: NYS DEC, Recreational Saltwater Fishing Regulations ("Regulations were last changed on May 12, 2026 and are subject to change at any
  //   time"), read 10 November 2026. "Striped Bass: marine waters (beginning at the Hudson River south of George Washington Bridge) & Delaware
  //   River": "Slot size: 28" - 31"", 1, "April 15 - Dec 15". Striped bass, Hudson north of the GWB: 23–28", 1, "April 1 - Nov 30". Inline
  //   circle hooks are required with bait. Bluefish: no size limit, 5 (7 on party/charter boats), "All year". Atlantic cod: 23", 5,
  //   "Sept 1 - May 31". Red drum: "All year", no limit under 27", fish over 27" "shall not be possessed". American shad: "No possession allowed";
  //   river herring south of the GWB: no possession. "All anglers (16 years and older) fishing in New York's Marine & Coastal District must enroll"
  //   in the Recreational Marine Fishing Registry. The page does not say whether catch and release is allowed outside an open season.
  // source (checker): NOAA Fisheries, Amendment 25 final rule (FR Doc. 2026-13153, "effective June 30, 2026") — "a zero fish possession limit for
  //   SNE cod for all recreational fishermen"; the SNE cod stock area runs south to the "Outer Banks, NC, and 35°00′ N lat."
  //   https://www.govinfo.gov/content/pkg/FR-2026-06-30/pdf/2026-13153.pdf
  // source (checker): NYS DEC, Environmental Notice Bulletin, 22 July 2026 — proposed 6 NYCRR Part 40 amendment "will prohibit possession of
  //   Atlantic Cod by recreational anglers for consistency with federal rules"; New York "is not required to adopt these federal changes";
  //   comments to 28 September 2026. https://dec.ny.gov/news/environmental-notice-bulletin/2026-07-22/public-notice/statewide-notice-of-proposed-rule-making-to-amend-6-nycrr-part-40-marine-fish-atlantic-cod
  // source (checker): NYS DEC, Proposed, Emergency and Recently Adopted Regulations, Marine Resources (read 10 November 2026) — "6 NYCRR Part 40-
  //   Marine Fish (Atlantic Cod)" is still listed as proposed, "Comment period is closed", with no adoption or effective date. So New York's
  //   zero-possession rule is not in force; DEC's limits page still shows cod Sept 1 - May 31. No closed range is loaded.
  //   https://www.dec.ny.gov/regulatory/proposed-emergency-recently-adopted-regulations/marine-resources
  {
    id: "us-ny-nyc-sea-all-year",
    countryCode: "US",
    admin1: ["NY", "New York"],
    near: { ...NEW_YORK, km: 15 },
    species: ["bluefish", "redfish"],
    closed: [],
    water: ["sea", "estuary"],
    note: "New York's saltwater table (last changed 12 May 2026) lists bluefish and red drum as open all year. Bluefish: no size limit, 5 a day (7 on party and charter boats). Red drum: no minimum size, and fish over 27 inches may not be kept.",
    regulator: "New York State DEC (Marine and Coastal District)",
    source: "https://dec.ny.gov/things-to-do/saltwater-fishing/recreational-fishing-regulations",
    checked: CHECKED,
  },
  {
    id: "us-ny-nyc-marine-notes",
    countryCode: "US",
    admin1: ["NY", "New York"],
    near: { ...NEW_YORK, km: 15 },
    species: [],
    closed: [],
    water: ["sea", "estuary"],
    note: "In New York's marine waters, starting with the Hudson south of the George Washington Bridge, the 2026 open season for striped bass is 15 April to 15 December: one fish of 28 to 31 inches, with inline circle hooks when using bait. North of that bridge it is 1 April to 30 November, one fish of 23 to 28 inches. The table does not say whether fish may be caught and released outside these seasons. DEC's table still lists Atlantic cod from 1 September to 31 May (23 inches, 5 a day). Since 30 June 2026, however, a federal rule has allowed no recreational cod to be kept from the Southern New England stock area, which reaches south to North Carolina. In July 2026 DEC proposed banning possession in state waters to match; that rule had not been adopted when this was read. Anglers 16 and over must enrol in the Recreational Marine Fishing Registry.",
    regulator: "New York State DEC (Marine and Coastal District)",
    source: "https://dec.ny.gov/things-to-do/saltwater-fishing/recreational-fishing-regulations",
    checked: CHECKED,
  },

  // ======================= Pennsylvania (Philadelphia) =======================
  // source: Pennsylvania Fish and Boat Commission, 2026 Pennsylvania Fishing Summary (summarybook.pdf; cover and "COMMONWEALTH INLAND WATERS-2026"),
  //   read 10 November 2026. Page 13, "DELAWARE RIVER AND ESTUARY (including tributaries to limits of tidal influence)": Striped Bass and Hybrid
  //   Striped Bass "From the Pennsylvania state line upstream to Calhoun Street Bridge; Jan. 1 through March 31 and June 1 through Dec. 31†" and
  //   "April 1 through May 31†"; "From Calhoun Street Bridge upstream - open year-round"; sizes "28 to less than 31 inches†" and "22 to less than
  //   26 inches†"; daily "1†". "It is unlawful for any person to gaff or attempt to gaff any Striped Bass at any time when fishing."
  //   †Bait in the tidal Delaware Estuary and its tributaries needs non-offset (inline) circle hooks. The Schuylkill's upper tidal limit is
  //   "Fairmount Dam". The extracted text lists seasons and sizes in separate blocks, so the pairing of slot to period is read from their order.
  //   (Checker, re-read 10 November 2026: the season fragments run "Jan. 1 through March 31 and June 1 through Dec. 31†", "April 1 through May 31†",
  //   "From Calhoun Street Bridge upstream - open year-round" and the sizes "28 to less than 31 inches†", "22 to less than 26 inches†", "28 to less
  //   than 31 inches"; the order and the † marks, which go only with the tidal rows, agree on the pairing.)
  {
    id: "us-pa-philadelphia-delaware-striped-bass-all-year",
    countryCode: "US",
    admin1: ["PA", "Pennsylvania"],
    near: { ...PHILADELPHIA, km: 20 },
    species: ["striped-bass"],
    closed: [],
    water: ["estuary", "rivers"],
    note: "On the tidal Delaware from the Pennsylvania state line up to the Calhoun Street Bridge (Trenton), the 2026 summary gives striped bass two seasons that cover the whole year. From 1 January to 31 March and 1 June to 31 December the slot is 28 to under 31 inches; from 1 April to 31 May it is 22 to under 26 inches; one fish a day. Gaffing is unlawful, and bait in the tidal estuary needs inline circle hooks. The Schuylkill above Fairmount Dam follows Pennsylvania's inland rules, which are not loaded here.",
    regulator: "Pennsylvania Fish and Boat Commission (Delaware River estuary)",
    source: "https://www.pa.gov/content/dam/copapwp-pagov/en/fishandboat/documents/fishing/regulations/summarybook.pdf",
    checked: CHECKED,
  },
  // source: same 2026 summary — Delaware River and Estuary table, bass row: "Jan. 1 through April 10 and June 13 through Dec. 31" and "April 11
  //   through June 12" (NO HARVEST, catch and immediate release). Page 11, Smallmouth and Largemouth Bass: "From April 11 to June 12: No tournaments
  //   permitted"; "From January 1 to April 10 and June 13 to December 31:". Commonwealth Inland Waters table: "Jan. 1 through April 10 and Oct. 1
  //   through Dec. 31", "April 11 through June 12", "June 13 through Sept. 30", and "NO HARVEST - Catch and immediate release only (no tournaments
  //   permitted)". The inland rows are not clearly tied to species in the extracted text.
  // (Checker, re-read 10 November 2026: the inland table's species run "BASS - Lakes, Rivers and Streams" second, after trout, and its first
  //   non-trout seasons are "Jan. 1 through April 10 and Oct. 1 through Dec. 31", "April 11 through June 12", "June 13 through Sept. 30". Page 11:
  //   "It is not a violation of the bass regulations if a bass is immediately returned unharmed to the waters from which it was taken." The tie of
  //   the "NO HARVEST" line to the Delaware's April 11 – June 12 bass row could not be confirmed in the extracted text, so the note no longer says it.)
  {
    id: "us-pa-philadelphia-bass-all-year",
    countryCode: "US",
    admin1: ["PA", "Pennsylvania"],
    near: { ...PHILADELPHIA, km: 20 },
    species: ["largemouth-bass", "smallmouth-bass"],
    closed: [],
    note: "Pennsylvania's 2026 summary gives bass seasons that cover the whole year, and says a bass returned unharmed straight away does not break the bass rules. On inland waters bass may be kept from 1 January to 10 April and from 13 June to 31 December, and from 11 April to 12 June it is catch and immediate release only, with no tournaments. The Delaware River and estuary splits its bass seasons on the same dates, with its own sizes and limits. Some lakes have special bass rules.",
    regulator: "Pennsylvania Fish and Boat Commission",
    source: "https://www.pa.gov/content/dam/copapwp-pagov/en/fishandboat/documents/fishing/regulations/summarybook.pdf",
    checked: CHECKED,
  },
  // source: same 2026 summary — Unlawful Acts, p. 9: in stocked trout waters, "To fish (includes taking baitfish and fishbait) from February 16 to
  //   8:00 a.m. on the opening day of trout season"; "Exceptions are certain specially regulated waters and Stocked Trout Waters Open to Year-round
  //   Fishing". Cover: "TROUT OPENER April 4 Statewide"; the regular season is "April 4 at 8 a.m. through Sept. 7"; "Extended Season: Stocked trout
  //   waters Jan. 1 through Feb. 15 and Sept. 8 through Dec. 31". Class A wild trout streams are open all year, with no harvest from the day after
  //   Labor Day to the opener. Licence: "A current license, on their person, is required of persons age 16 and over to fish or angle for any
  //   species of fish"; "A current Pennsylvania trout permit is required to fish for trout". Saltwater Angler Registry: "Anglers who target or catch
  //   shad, striped bass and river herring from the Delaware River below Trenton Falls" must register. Delaware estuary: river herring closed
  //   year-round; American shad catch and release only in all Delaware River tributaries.
  {
    id: "us-pa-philadelphia-notes",
    countryCode: "US",
    admin1: ["PA", "Pennsylvania"],
    near: { ...PHILADELPHIA, km: 20 },
    species: [],
    closed: [],
    water: ["rivers", "lakes", "estuary"],
    note: "Pennsylvania's stocked trout waters are closed to all fishing from 16 February until 8 a.m. on opening day (4 April in 2026), except stocked waters open to year-round fishing and some specially regulated waters. The extended season runs from 1 January to 15 February and from 8 September to 31 December. Anglers 16 and over need a licence, and a trout permit to fish for trout. Anglers targeting shad, striped bass or river herring in the Delaware below Trenton Falls must also register. River herring are closed all year in the Delaware River and estuary, and American shad are catch and release only in all the Delaware's tributaries.",
    regulator: "Pennsylvania Fish and Boat Commission",
    source: "https://www.pa.gov/content/dam/copapwp-pagov/en/fishandboat/documents/fishing/regulations/summarybook.pdf",
    checked: CHECKED,
  },

  // ======================= Virginia (Richmond) =======================
  // source: Virginia DWR, General Freshwater Fishing Regulations (page modified 31 December 2025), read 10 November 2026 — "There is a continuous,
  //   year-round season for all freshwater fish, with the following exceptions:" (special times and closures for certain trout waters, and seasons
  //   for special methods of taking nongame fish). "It shall be unlawful to fish or to collect bait from March 1 through June 15 within 300 feet of
  //   Boshers Dam Fishway" (north bank of the James). "All fishing on inland waters requires a freshwater fishing license, unless license exempt."
  //   Regulations for anadromous striped bass "above and below the fall line" are "set by the Virginia Marine Resources Commission".
  // source: DWR, 2026 Virginia Freshwater Fishing & Boating, creel and length limits (creel-and-length-limits.pdf) — statewide: bass 5 a day;
  //   crappie 25; sunfish 50; walleye 18 in., 5; muskellunge 40 in., 1; channel, white and flathead catfish 20; trout 6, 7 in. James River from the
  //   Jackson–Cowpasture confluence "downstream to the 14th St. Bridge in Richmond": "No largemouth or smallmouth bass 14 to 22 inches, only 1 per
  //   day longer than 22 inches". Tidal James below the fall line: blue catfish, no daily limit except 1 over 32 in.
  // source: DWR, Trout Season and Limits (last modified 3 January 2024) — "Virginia's trout season is open year-round", with exceptions for certain waters.
  {
    id: "us-va-richmond-freshwater-all-year",
    countryCode: "US",
    admin1: ["VA", "Virginia"],
    near: { ...RICHMOND, km: 20 },
    species: ["largemouth-bass", "smallmouth-bass", "black-crappie", "bluegill", "yellow-perch", "channel-catfish", "walleye", "muskellunge", "common-carp"],
    closed: [],
    water: ["rivers", "lakes"],
    note: "Virginia's Department of Wildlife Resources says there is a continuous, year-round season for all freshwater fish. Its exceptions are certain trout waters and some special methods of taking nongame fish. On the James from the Jackson–Cowpasture confluence down to Richmond's 14th Street Bridge, bass of 14 to 22 inches must be released and only one longer than 22 inches may be kept each day.",
    regulator: "Virginia Department of Wildlife Resources",
    source: "https://dwr.virginia.gov/fishing/regulations/general/",
    checked: CHECKED,
  },
  {
    id: "us-va-richmond-notes",
    countryCode: "US",
    admin1: ["VA", "Virginia"],
    near: { ...RICHMOND, km: 20 },
    species: [],
    closed: [],
    water: ["rivers", "lakes"],
    note: "Fishing or collecting bait within 300 feet of the Boshers Dam fishway on the James (north bank) is unlawful from 1 March to 15 June. Virginia's trout season is open year-round, but some trout waters have their own times and closures (6 trout a day, 7-inch minimum statewide). A freshwater licence is needed on inland waters unless exempt. In the tidal James below the fall line, blue catfish have no daily limit except one fish over 32 inches.",
    regulator: "Virginia Department of Wildlife Resources",
    source: "https://dwr.virginia.gov/fishing/regulations/general/",
    checked: CHECKED,
  },
  // source: Virginia Administrative Code, 4VAC20-252, Pertaining to Atlantic Striped Bass (Virginia Marine Resources Commission; law.lis.virginia.gov),
  //   read 10 November 2026. 4VAC20-252-80 (eff. April 1, 2024): Chesapeake Bay and its tributaries spring/summer recreational season "shall be May
  //   16 through June 15, inclusive", 19 to 24 inches, "one fish per person". 4VAC20-252-90 (eff. April 1, 2024): fall season "shall be October 4
  //   through December 31, inclusive", same limits. "Chesapeake Bay and its tributaries" means "all tidal waters of the Chesapeake Bay and its
  //   tributaries within Virginia". The James spawning reach runs from the Dancing Point–New Sunken Meadow Creek line up to the City Point–Packs
  //   Point line (Hopewell); its April 1 – May 31 rule (4VAC20-252-30 D) concerns gill nets. No provision speaks to rod-and-reel catch and release
  //   outside the seasons.
  {
    id: "us-va-richmond-striped-bass-notes",
    countryCode: "US",
    admin1: ["VA", "Virginia"],
    near: { ...RICHMOND, km: 20 },
    species: [],
    closed: [],
    water: ["rivers", "estuary"],
    note: "Virginia Wildlife Resources says the Marine Resources Commission sets the rules for sea-run striped bass, above and below the fall line. The Commission's rule (4VAC20-252) gives the Chesapeake Bay and its tidal tributaries two recreational seasons: 16 May to 15 June and 4 October to 31 December, one fish a day of 19 to 24 inches. The rule does not say whether striped bass may be caught and released outside those seasons. The James spawning reach is downstream of Richmond, below City Point.",
    regulator: "Virginia Marine Resources Commission (4VAC20-252)",
    source: "https://law.lis.virginia.gov/admincodefull/title4/agency20/chapter252/",
    checked: CHECKED,
  },

  // ======================= District of Columbia (Washington) =======================
  // source: DC Department of Energy and Environment, "Regulated Fishing Activities" (no updated date on the page; footer © 2023), read 10 November
  //   2026 — "The Director of DOEE, pursuant to 19 DCMR § 1503.1(g), hereby announces that the 2026 striped bass season begins May 16" "and concludes
  //   December 31, 2026"; one fish a day, 19 to 24 inches. Species table: striped bass "Prohibited**", footnote "Unless season is posted". Fine
  //   schedule: "Take/Catch/Possess Striped Bass/Hybrid Striped Bass (Out of Season)", $100.
  {
    id: "us-dc-striped-bass",
    countryCode: "US",
    admin1: ["DC", "District of Columbia"],
    near: { ...WASHINGTON, km: 20 },
    species: ["striped-bass"],
    closed: [{ from: "01-01", to: "05-15" }],
    note: "DC's Department of Energy and Environment announced a 2026 striped bass season from 16 May to 31 December: one fish a day, 19 to 24 inches. Outside a posted season the species is listed as prohibited, and DC's fine schedule includes catching striped bass out of season.",
    regulator: "DC Department of Energy and Environment",
    source: "https://doee.dc.gov/service/regulated-fishing-activities",
    checked: CHECKED,
  },
  // source: same DOEE page — Largemouth and Smallmouth Bass "Min. Length: 12(*) inches; Creel limit: 5 per day", "*15 inches, March 1 thru June 15";
  //   Walleye "Min. Length: 14 inches; Creel limit: 1 per day"; Yellow Perch "Min. Length: 8 inches; Creel limit: 3 per day"; Channel Catfish
  //   "Min. Length: 12 inches; Creel limit: 3 per day"; Northern pike "Prohibited". Shad, hickory shad, blueback herring and alewife: possession
  //   prohibited (coast-wide moratorium); "Take, catch, or possess any species of sturgeon" is prohibited; northern snakehead "DO NOT RETURN IT TO THE
  //   WATER"; rod, hook and line only, no more than three lines; cast and seine nets and snagging prohibited.
  // source: DOEE, Fishing License info card (file dated 2023; no year on its face) — "Any person, age 16 to 64, fishing in District of Columbia
  //   waters" needs a current DC licence, including from the Virginia shoreline or National Park land.
  //   https://doee.dc.gov/sites/default/files/dc/sites/ddoe/service_content/attachments/Fishing%20License%20info%20Card%202023.pdf
  {
    id: "us-dc-notes",
    countryCode: "US",
    admin1: ["DC", "District of Columbia"],
    near: { ...WASHINGTON, km: 20 },
    species: [],
    closed: [],
    note: "DC lists no season dates for most fish, only limits. Largemouth and smallmouth bass: 12 inches (15 inches from 1 March to 15 June), 5 a day combined. Walleye: 14 inches, 1 a day. Yellow perch: 8 inches, 3 a day. Channel catfish: 12 inches, 3 a day. Northern pike are prohibited, shad and river herring may not be possessed, sturgeon may not be taken, and northern snakehead must not be returned to the water. Anyone aged 16 to 64 fishing DC waters needs a DC licence, including from the Virginia shore or National Park land.",
    regulator: "DC Department of Energy and Environment",
    source: "https://doee.dc.gov/service/regulated-fishing-activities",
    checked: CHECKED,
  },

  // ======================= Maryland (Baltimore) =======================
  // source: Maryland DNR, Striped Bass Regulations Maps page (2026 rules for the Chesapeake Bay and tidal tributaries), read 10 November 2026:
  //   "Aug. 1 – Aug. 31": "All areas closed to striped bass fishing." "No targeting." "Attempting to catch striped bass is illegal during this time period."
  //   Jan. 1 – Feb. 28: "All areas open to catch and release fishing only." Mar. 1 – Apr. 30: catch and release only in the bay below the Abbey
  //   Point–Worton Point line; "Spawning rivers and the Upper Bay spawning area are off limits." May 1 – 15: harvest in the bay from the Brewerton
  //   Channel to the Virginia line, excluding bays, sounds, tributaries, creeks and rivers (with named exceptions). May 16 – 31: harvest in the bay
  //   south of the Hart-Miller Island–Tolchester line, tributaries excluded except those named. June 1 – July 31 and Sept. 1 – Dec. 5: "All areas
  //   open"; "1 fish per person per day. Must be at least 19" and cannot exceed 24"". Dec. 6 – 31: catch and release only, no harvest.
  // source: eRegulations, Maryland Striped Bass (2026 Maryland Fishing guide; "Last Updated: September 16, 2026") — same periods; the August line
  //   reads "Attempting to catch striped bass is illegal during this time period."
  // source: Maryland DNR news release, 31 March 2026 — "Spawning rivers will remain closed to targeting from March 1 to May 31": the Choptank, Chester,
  //   Manokin, Nanticoke, Patuxent, Transquaking and Wicomico, plus the Upper Bay spawning area including the Susquehanna Flats. The Patapsco is not named.
  //   https://news.maryland.gov/dnr/2026/03/31/marylands-2026-striped-bass-season-opens-for-catch-and-release-fishing-in-april/
  {
    id: "us-md-baltimore-striped-bass-august",
    countryCode: "US",
    admin1: ["MD", "Maryland"],
    near: { ...BALTIMORE, km: 20 },
    species: ["striped-bass"],
    closed: [{ from: "08-01", to: "08-31" }],
    noKeep: [{ from: "12-06", to: "04-30" }],
    water: ["sea", "estuary"],
    note: "Maryland closes all of the Chesapeake Bay and its tidal tributaries to striped bass fishing from 1 to 31 August 2026, and trying to catch them is illegal. Harvest seasons in 2026 are 1 May to 31 July (in May only in listed parts of the bay) and 1 September to 5 December, one fish of 19 to 24 inches. The rest of the year is catch and release only.",
    regulator: "Maryland DNR (Chesapeake Bay and tidal tributaries)",
    source: "https://dnr.maryland.gov/fisheries/Pages/sb_reg_maps.aspx",
    checked: CHECKED,
  },
  {
    id: "us-md-baltimore-striped-bass-notes",
    countryCode: "US",
    admin1: ["MD", "Maryland"],
    near: { ...BALTIMORE, km: 20 },
    species: [],
    closed: [],
    water: ["sea", "estuary"],
    note: "Maryland's 2026 Chesapeake striped bass rules: catch and release only from 1 January to 30 April. From 1 March that is limited to the bay below the Abbey Point–Worton Point line. Harvest is allowed from 1 to 15 May in the bay from the Brewerton Channel south, and from 16 to 31 May south of the Hart-Miller Island–Tolchester line; tributaries are excluded in May except those named. Harvest everywhere from 1 June to 31 July and 1 September to 5 December. Closed in August. Catch and release from 6 to 31 December. Seven named spawning rivers and the Upper Bay spawning area are closed to targeting from 1 March to 31 May. These pages do not name the Patapsco, so check DNR's maps for Baltimore Harbor.",
    regulator: "Maryland DNR (Chesapeake Bay and tidal tributaries)",
    source: "https://dnr.maryland.gov/fisheries/Pages/sb_reg_maps.aspx",
    checked: CHECKED,
  },
  // source: eRegulations, Maryland Chesapeake Bay Seasons, Sizes & Limits (2026 guide; "Last Updated: September 16, 2026"), read 10 November 2026 —
  //   "Chesapeake Bay and Its Tidal tributaries": largemouth/smallmouth bass "Open Year Round", "15 inches" for "March 1–June 15", "12 inches" for
  //   "June 16 through last day in February", 5 combined; yellow perch "Open Year Round", 9 in., 5; Catfish "Open Year Round"; bluefish "Open Year
  //   Round", 8 in., 5 shore or private boat / 7 for-hire; red drum "Open Year Round", 18–26 in., 3; spotted seatrout "Open Year Round", 14 in., 4;
  //   chain pickerel "May 1–March 14"; alewife, American shad, Atlantic sturgeon, blueback herring, hickory shad and shortnose sturgeon "CLOSED".
  // source: eRegulations, Maryland Freshwater Seasons, Sizes & Limits (2026 guide; "Last Updated: September 16, 2026") — nontidal: largemouth and
  //   smallmouth bass open June 16 through the last day of February, 12 in., with catch and release permitted at all times; "Open Year Round" for walleye
  //   (except Deep Creek Lake and the Youghiogheny below the Route 42 bridge, closed March 1 – April 15), northern pike (30 in.), chain pickerel,
  //   muskellunge and tiger muskie (36 in.), crappie, bluegill and sunfish, yellow perch (rivers and streams 9 in.; lakes and ponds no minimum), channel
  //   catfish, carp, and striped bass and hybrids in lakes and ponds (18 in.); keeping striped bass caught in nontidal streams and rivers is illegal.
  //   Trout are "Open Year Round" statewide, but put-and-take and special trout management areas have different rules.
  {
    id: "us-md-baltimore-bass-all-year",
    countryCode: "US",
    admin1: ["MD", "Maryland"],
    near: { ...BALTIMORE, km: 20 },
    species: ["largemouth-bass", "smallmouth-bass"],
    closed: [],
    note: "In Maryland's tidal waters, largemouth and smallmouth bass are open year round: 5 a day combined, 15 inches from 1 March to 15 June and 12 inches the rest of the year. In nontidal waters bass may be kept from 16 June to the last day of February (12 inches), and catch and release is permitted at all times.",
    regulator: "Maryland DNR",
    source: "https://www.eregulations.com/maryland/fishing/chesapeake-bay-seasons-sizes-limits",
    checked: CHECKED,
  },
  {
    id: "us-md-baltimore-perch-catfish-all-year",
    countryCode: "US",
    admin1: ["MD", "Maryland"],
    near: { ...BALTIMORE, km: 20 },
    species: ["yellow-perch", "channel-catfish"],
    closed: [],
    note: "Maryland lists yellow perch and catfish as open year round in the Chesapeake Bay and its tidal tributaries, and yellow perch and channel catfish as open year round in nontidal waters. Tidal yellow perch must be 9 inches, 5 a day. Nontidal perch in rivers and streams must be 9 inches; in lakes and ponds there is no minimum.",
    regulator: "Maryland DNR",
    source: "https://www.eregulations.com/maryland/fishing/chesapeake-bay-seasons-sizes-limits",
    checked: CHECKED,
  },
  {
    id: "us-md-baltimore-tidal-all-year",
    countryCode: "US",
    admin1: ["MD", "Maryland"],
    near: { ...BALTIMORE, km: 20 },
    species: ["bluefish", "redfish", "speckled-trout"],
    closed: [],
    water: ["sea", "estuary"],
    note: "Maryland lists bluefish, red drum and spotted seatrout as open year round in the Chesapeake Bay and its tidal tributaries. Bluefish: 8 inches, 5 a day from shore or a private boat, 7 on a for-hire boat. Red drum: 18 to 26 inches, 3 a day. Spotted seatrout: 14 inches, 4 a day, and may not be used as bait. Shad, river herring and sturgeon are closed.",
    regulator: "Maryland DNR (Chesapeake Bay and tidal tributaries)",
    source: "https://www.eregulations.com/maryland/fishing/chesapeake-bay-seasons-sizes-limits",
    checked: CHECKED,
  },
  {
    id: "us-md-baltimore-nontidal-all-year",
    countryCode: "US",
    admin1: ["MD", "Maryland"],
    near: { ...BALTIMORE, km: 20 },
    species: ["walleye", "northern-pike", "muskellunge", "black-crappie", "bluegill", "common-carp"],
    closed: [],
    water: ["rivers", "lakes"],
    note: "Maryland's nontidal (freshwater) table lists walleye (15 inches), northern pike (30 inches), muskellunge (36 inches), crappie, bluegill and other sunfish, and carp as open year round. The only walleye closure it names is far to the west, at Deep Creek Lake and the Youghiogheny River below the Route 42 bridge (1 March to 15 April).",
    regulator: "Maryland DNR (nontidal waters)",
    source: "https://www.eregulations.com/maryland/fishing/freshwater-seasons-sizes-limits",
    checked: CHECKED,
  },
  {
    id: "us-md-baltimore-lakes-striped-bass-all-year",
    countryCode: "US",
    admin1: ["MD", "Maryland"],
    near: { ...BALTIMORE, km: 20 },
    species: ["striped-bass"],
    closed: [],
    water: ["lakes"],
    note: "In Maryland's nontidal lakes and ponds, striped bass and hybrid striped bass are open year round: 18 inches, 2 a day, only one over 30 inches. Keeping striped bass caught in nontidal streams and rivers is illegal.",
    regulator: "Maryland DNR (nontidal waters)",
    source: "https://www.eregulations.com/maryland/fishing/freshwater-seasons-sizes-limits",
    checked: CHECKED,
  },
  // source: Maryland DNR, Sport Fishing & Crabbing Licenses (no date on the page) — "Individuals under the age of 16 are not required to obtain a
  //   license"; state law "requires all persons recreationally fishing in the tidal waters of the State to be licensed", with exceptions, and some
  //   anglers instead need a free Maryland Saltwater Angler Registration. The nontidal licence covers fresh waters; a trout stamp is required for ages
  //   16 and up. https://dnr.maryland.gov/pages/service_fishing_license.aspx
  {
    id: "us-md-baltimore-licence",
    countryCode: "US",
    admin1: ["MD", "Maryland"],
    near: { ...BALTIMORE, km: 20 },
    species: [],
    closed: [],
    note: "In Maryland, anglers under 16 need no licence. Others need a nontidal licence for fresh water, plus a trout stamp at 16 and over to fish for trout. In tidal water they need a Chesapeake Bay and Coastal Sport licence, or in some cases (for example from a free fishing pier or on a licensed boat) a free Saltwater Angler Registration. Maryland's 2026 nontidal table lists trout as open year round, but put-and-take and special trout management areas have different rules.",
    regulator: "Maryland DNR",
    source: "https://dnr.maryland.gov/pages/service_fishing_license.aspx",
    checked: CHECKED,
  },
];


// ============================================================================================================
// LAND: who says whether you may pick, read on the owner's own page (10 November 2026).
// ============================================================================================================

type Pt = { lat: number; lon: number };
const kmBetween = (a: Pt, b: Pt) => {
  const r = Math.PI / 180;
  const dLat = (b.lat - a.lat) * r;
  const dLon = (b.lon - a.lon) * r;
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(a.lat * r) * Math.cos(b.lat * r) * Math.sin(dLon / 2) ** 2;
  return 2 * 6371 * Math.asin(Math.sqrt(h));
};
/** Canadian provinces among the codes used here; every other code is a US state (or DC). */
const CANADIAN = new Set(["PE", "NB", "NS"]);
const within = (p: LandPlace, c: Pt, km: number) => kmBetween(c, p) <= km;
const is = (p: LandPlace, code: string, name: string) =>
  p.countryCode === (CANADIAN.has(code) ? "CA" : "US") && (p.admin1Code === code || p.admin1 === name);

// helpers defined by the region file: within(p, CENTRE, km), is(p, code, name)
export const LAND: LandRule[] = [
  // 56 RCNY § 1-04(b) (NYC Parks rules, via American Legal Publishing; amended City Record 6/13/2017): (b)(1)(iii) "No person shall deface, write upon,
  //   sever, mutilate, kill or remove from the ground any plants, flowers, shrubs or other vegetation under the jurisdiction of the Department without
  //   permission of the Commissioner"; (b)(1)(i) trees; (b)(4) no possessing any plant "in any park except where such possession is specifically
  //   designated to be permissible by the Commissioner". Fruit and mushrooms are not named.
  {
    id: "nec-nyc-parks",
    applies: (p) => is(p, "NY", "New York") && within(p, NEW_YORK, 25),
    title: "New York City parks (NYC Parks)",
    rule: "New York City's park rules (56 RCNY 1-04(b)) say no person may sever, kill or remove from the ground any plants, flowers, shrubs or other vegetation in the city's parks without the Parks Commissioner's permission, or cut or remove any tree. Possessing any plant or other vegetation in a park is also barred, except where the Commissioner designates it permissible. The rules do not name fruit, nuts or mushrooms.",
    source: { label: "Rules of the City of New York, Title 56, § 1-04(b) (amended 13 June 2017)", url: "https://codelibrary.amlegal.com/codes/newyorkcity/latest/NYCrules/0-0-0-87750" },
    checked: CHECKED,
  },
  // 9 NYCRR § 375.1(e), Injury to property (OPRHP regulations PDF, "Current through State Register: June 14, 2017"; Justia's copy is current through
  //   25 September 2024 with the same wording): "No person shall make an excavation on or injure, destroy, deface, remove, fill in, tamper with or cut"
  //   "any real or personal property, tree or other plant life." No exception for berries, fruit, nuts or mushrooms.
  {
    id: "nec-ny-state-parks",
    applies: (p) => is(p, "NY", "New York") && within(p, NEW_YORK, 40),
    title: "New York state parks (Office of Parks, Recreation and Historic Preservation)",
    rule: "New York's state park regulations (9 NYCRR 375.1(e)) forbid anyone to injure, destroy, remove or cut any tree or other plant life on state park property. The regulation gives no exception for berries, fruit, nuts or mushrooms.",
    source: { label: "NYS OPRHP regulations, 9 NYCRR Subtitle I, § 375.1(e)", url: "https://parks.ny.gov/documents/inside-our-agency/Rulemaking/OPRHPRegulations9NYCRRSubtitleI.pdf" },
    checked: CHECKED,
  },
  // 302 CMR 12.04(21): "No person may damage, disturb or remove any DCR property or resource, real, natural, personal, cultural or historic," except
  //   lawful hunting, fishing or trapping "or other written authorization by the Department"; 12.04(24): "No tree or other vegetation shall be planted
  //   or removed from DCR property unless authorized by the Division Director." No exception for berries, fruit or mushrooms. No version date on the
  //   PDF; the mass.gov regulation page lists 302 CMR 12 as under review with a draft amendment.
  {
    id: "nec-ma-dcr",
    applies: (p) => is(p, "MA", "Massachusetts") && within(p, BOSTON, 40),
    title: "Massachusetts Department of Conservation and Recreation (DCR) parks and reservations",
    rule: "Massachusetts DCR's rules (302 CMR 12.04) say no person may damage, disturb or remove any natural resource on DCR property except through lawful hunting, fishing or trapping or with the Department's written authorization. No tree or other vegetation may be removed unless the Division Director authorizes it. The rules give no exception for berries, fruit, nuts or mushrooms.",
    source: { label: "302 CMR 12.00, Parks and Recreation Rules, 12.04(21) and (24)", url: "https://www.mass.gov/doc/302-cmr-1200-parks-and-recreation-rules/download" },
    checked: CHECKED,
  },
  // City of Boston, Parks rules and regulations page (last updated 10/30/25): Section 2(e), except under the auspices of public authority, no one may "dig up,
  //   cut, break, remove, deface, defile, or take any tree, bush, plant, turf"; CBC 16-19.4 (the Common, the Public Garden and other public grounds): no
  //   one may "dig up, cut, break, deface, defile, ill-use, handle, take or remove any turf, flower, plant, bush, tree". Fines up to $50.
  {
    id: "nec-boston-parks",
    applies: (p) => is(p, "MA", "Massachusetts") && within(p, BOSTON, 12),
    title: "City of Boston parks, the Common and the Public Garden",
    rule: "Boston's park rules forbid anyone, except under public authority, to dig up, cut, break, remove or take any tree, bush, plant or turf in a city park. The city ordinance for the Common, the Public Garden and other public grounds (16-19.4) forbids taking or removing any turf, flower, plant, bush or tree. Neither names fruit, nuts or mushrooms.",
    source: { label: "City of Boston: Parks rules and regulations (s. 2(e); CBC 16-19.4)", url: "https://www.boston.gov/departments/parks-and-recreation/parks-rules-and-regulations" },
    checked: CHECKED,
  },
  // 17 Pa. Code § 11.211 (DCNR state parks rules PDF, undated): (a)(1) prohibits "Cutting, picking, digging, damaging or removing, in whole or in part, a
  //   living or dead tree, shrub or plant" without written permission; (b)(1) allows "Gathering edible fruits, nuts, berries and fungi, in reasonable
  //   amounts, for one's own personal or family consumption", except wild plants Chapter 45 lists as threatened, endangered, rare or vulnerable.
  {
    id: "nec-pa-state-parks",
    applies: (p) => is(p, "PA", "Pennsylvania") && within(p, PHILADELPHIA, 40),
    title: "Pennsylvania state parks (DCNR)",
    rule: "Pennsylvania's state park rules (17 Pa. Code 11.211) prohibit cutting, picking, digging, damaging or removing any living or dead tree, shrub or plant without the Department's written permission. They allow gathering edible fruits, nuts, berries and fungi in reasonable amounts for your own or your family's use. The exception does not cover plants listed as threatened, endangered, rare or vulnerable.",
    source: { label: "DCNR: Pennsylvania State Parks Rules and Regulations (17 Pa. Code § 11.211)", url: "https://elibrary.dcnr.pa.gov/PDFProvider.ashx?PromptToSave=False&Size=137675&ViewerMode=2&action=PDFStream&chksum=&docID=1736679&docName=PennsylvaniaStateParks_Rules_Regulations&nativeExt=pdf&overlay=0&revision=0" },
    checked: CHECKED,
  },
  // Philadelphia Parks & Recreation regulations (cover dated August 2023, "2023. 08. 03 v.17"), § 401(B): "No person may prune, spray, plant, cut down,
  //   break or remove any tree, plant, shrub, vine, flower," "flower bed or turf within any Park and Recreation Facility" without Department approval.
  //   "Park" includes "Fairmount Park"; Wissahickon Creek Park is named. Fruit, nuts and mushrooms are not mentioned.
  {
    id: "nec-philadelphia-parks",
    applies: (p) => is(p, "PA", "Pennsylvania") && within(p, PHILADELPHIA, 20),
    title: "Philadelphia city parks, including Fairmount Park and the Wissahickon",
    rule: "Philadelphia Parks & Recreation's regulations (section 401(B)) say no person may cut down, break or remove any tree, plant, shrub, vine, flower, flower bed or turf in any city park or recreation facility, Fairmount Park included, without the Department's approval. The regulations do not mention fruit, nuts or mushrooms.",
    source: { label: "Philadelphia Parks & Recreation regulations, August 2023 (s. 401(B))", url: "https://www.phila.gov/media/20240228151106/Parks-and-Recreation-regulations-update-202308.pdf" },
    checked: CHECKED,
  },
  // NPS, Independence NHP Superintendent's Compendium (official signature dated 29 January 2026; page updated 18 June 2026), under 36 CFR 2.1: "The gathering of
  //   fallen fruit from the ginkgo trees throughout the park is permitted." "Fruit still on the tree may not be picked."
  {
    id: "nec-independence-nhp",
    applies: (p) => is(p, "PA", "Pennsylvania") && within(p, PHILADELPHIA, 3),
    title: "Independence National Historical Park (National Park Service)",
    rule: "The park's compendium (signed 29 January 2026) allows fallen fruit from the ginkgo trees to be gathered anywhere in the park, but fruit still on a tree may not be picked.",
    source: { label: "NPS: Independence NHP Superintendent's Compendium", url: "https://www.nps.gov/inde/learn/management/compendium.htm" },
    checked: CHECKED,
  },
  // 36 CFR 2.1 (eCFR, up to date as of 8/06/2026; checker re-read it "up to date as of 10/22/2026", same wording): (a)(1)(ii) prohibits possessing, destroying, removing or disturbing "Plants or the parts or products thereof";
  //   (c)(1) the superintendent may designate fruits, berries, nuts or unoccupied seashells for hand gathering for personal use; (c)(3) "Gathering or possessing
  //   undesignated natural products" is prohibited. NPS, Valley Forge NHP compendium (page updated 16 July 2026): no 2.1(c) designation.
  {
    id: "nec-valley-forge-nhp",
    applies: (p) => is(p, "PA", "Pennsylvania") && within(p, PHILADELPHIA, 35),
    title: "Valley Forge National Historical Park (National Park Service)",
    rule: "Federal park rule 36 CFR 2.1 prohibits removing plants or parts of them in national park areas, and allows gathering only of fruits, nuts or berries a superintendent designates. Valley Forge's compendium page (updated 16 July 2026) designates none.",
    source: { label: "NPS: Valley Forge NHP Superintendent's Compendium, with 36 CFR 2.1", url: "https://www.nps.gov/vafo/learn/management/compendium.htm" },
    checked: CHECKED,
  },
  // 4VAC5-30-50, Flowers, plants, minerals, etc. (eff. March 2, 2022): "No person shall remove, destroy, cut down, scar, mutilate, injure, deface, take, or gather
  //   in any manner any tree" (and flowers, ferns, shrubs, rocks, plants, minerals) unless a special scientific collecting permit is held; "Edible fruits, berries,
  //   fungi, or nuts may be collected for personal or individual use only."
  {
    id: "nec-va-state-parks",
    applies: (p) => is(p, "VA", "Virginia") && within(p, RICHMOND, 40),
    title: "Virginia state parks",
    rule: "Virginia's state park regulation (4VAC5-30-50) forbids removing, cutting, taking or gathering any tree, flower, fern, shrub, plant or mineral in a park without a special scientific collecting permit. It says edible fruits, berries, fungi or nuts may be collected for personal or individual use only.",
    source: { label: "Virginia Administrative Code 4VAC5-30-50 (eff. 2 March 2022)", url: "https://law.lis.virginia.gov/admincode/title4/agency5/chapter30/section50/" },
    checked: CHECKED,
  },
  // NPS, Richmond National Battlefield Park compendium (signed 8 September 2026; page updated 11 September 2026; covers Richmond NBP and Maggie L. Walker NHS):
  //   "Blackberries, Raspberries, Blueberries: 1 quart per person, per day"; "White Oak Acorns, Black Oak Acorns, Walnuts: 1 quart, per person, per day";
  //   "Pinecones: 1 basket 5-gallon basket, per person, per day"; "The gathering of these products is restricted to immediate trail use and prohibited on or near
  //   historic features"; "Collecting or gathering dead wood on the ground is prohibited." Mushrooms are not on the list.
  {
    id: "nec-richmond-battlefield",
    applies: (p) => is(p, "VA", "Virginia") && within(p, RICHMOND, 30),
    title: "Richmond National Battlefield Park (National Park Service)",
    rule: "The park's compendium (signed 8 September 2026) allows blackberries, raspberries and blueberries (1 quart a person a day), white and black oak acorns and walnuts (1 quart a person a day), and pinecones (one 5-gallon basket a person a day) to be gathered by hand for personal use. It restricts gathering to 'immediate trail use' and prohibits it on or near historic features such as earthworks. Collecting dead wood is prohibited, and mushrooms are not on the list.",
    source: { label: "NPS: Richmond National Battlefield Park Superintendent's Compendium", url: "https://www.nps.gov/rich/learn/management/superintendent-s-compendium.htm" },
    checked: CHECKED,
  },
  // NPS, Rock Creek Park compendium (approved 28 August 2026; page updated 4 September 2026): "No fruits, nuts, berries, seeds, mushrooms, or cut greenery may be
  //   gathered or collected" for personal or business use; applies to all areas Rock Creek Park administers (the page lists Glover Archbold Park, Battleground
  //   National Cemetery, Fort Stevens and the Civil War Defenses of Washington among them).
  {
    id: "nec-rock-creek-park",
    applies: (p) => is(p, "DC", "District of Columbia") && within(p, WASHINGTON, 15),
    title: "Rock Creek Park and the areas it administers (National Park Service)",
    rule: "Rock Creek Park's compendium (approved 28 August 2026) says no fruits, nuts, berries, seeds, mushrooms or cut greenery may be gathered or collected in the park or the other areas it administers, which the page lists as including Glover Archbold Park and Fort Stevens.",
    source: { label: "NPS: Rock Creek Park Superintendent's Compendium", url: "https://www.nps.gov/rocr/learn/management/rock-creek-park-superintendent-compendium.htm" },
    checked: CHECKED,
  },
  // 36 CFR 2.1 as above; NPS, National Mall and Memorial Parks compendium (approved 5 November 2026; rescinds the version of 11 September 2026): no 2.1(c)
  //   designation; the only plant-gathering entry is a permit for federally recognized tribes under 36 CFR 2.6. (Checker: page "Last updated: November 9, 2026";
  //   its text never cites 36 CFR 2.1.)
  {
    id: "nec-national-mall",
    applies: (p) => is(p, "DC", "District of Columbia") && within(p, WASHINGTON, 5),
    title: "National Mall and Memorial Parks (National Park Service)",
    rule: "Federal park rule 36 CFR 2.1 prohibits removing plants or parts of them in national park areas, and allows gathering only of fruits, nuts or berries a superintendent designates. The National Mall and Memorial Parks compendium (approved 5 November 2026) designates none.",
    source: { label: "NPS: National Mall and Memorial Parks Superintendent's Compendium, with 36 CFR 2.1", url: "https://www.nps.gov/nama/learn/management/superintendent-s-compendium.htm" },
    checked: CHECKED,
  },
  // Checker, 10 November 2026: the reader used the "2025 Superintendent's Compendium" (signed 30 December 2024; page updated 23 April 2025), whose 2.1(c)(1)
  //   let blueberries, blackberries, grapes, paw-paws, raspberries and walnuts be gathered (under one quart) at listed sites. The park's Laws and Policies page
  //   (https://www.nps.gov/nace/learn/management/lawsandpolicies.htm, updated 10 September 2026) now links only the 2026 compendium:
  //   NPS, National Capital Parks-East, "2026 Superintendent's Compendium" (signed by the superintendent 31 December 2025; page "Last updated: September 10, 2026").
  //   Its "36 CFR §2.1 – PRESERVATION OF NATURAL, CULTURAL AND ARCHEOLOGICAL RESOURCES" heading has no text under it before §2.2 (read twice): no fruit, nut or berry
  //   is designated. Areas listed include Anacostia Park, Fort Chaplin, Fort Davis, Fort Dupont Park, Fort Mahan, Fort Stanton, Kenilworth Park and Aquatic
  //   Gardens (DC) and Fort Foote, Fort Washington Park, Greenbelt Park, Oxon Cove Park and Oxon Hill Farm, and Piscataway Park (MD). 36 CFR 2.1 as above.
  {
    id: "nec-national-capital-parks-east",
    applies: (p) => (is(p, "DC", "District of Columbia") || is(p, "MD", "Maryland")) && within(p, WASHINGTON, 25),
    title: "National Capital Parks-East, including Anacostia Park (National Park Service)",
    rule: "Federal park rule 36 CFR 2.1 prohibits removing plants or parts of them in national park areas, and allows gathering only of fruits, nuts or berries a superintendent designates. The 2026 compendium for National Capital Parks-East (signed 31 December 2025), which covers Anacostia Park, Fort Dupont Park, Greenbelt Park, Fort Washington Park, Oxon Cove Park and others, designates none. The berry and walnut allowance in its 2025 edition is not in it.",
    source: { label: "NPS: National Capital Parks-East, 2026 Superintendent's Compendium, with 36 CFR 2.1", url: "https://www.nps.gov/nace/learn/management/2026-superintendents-compendium.htm" },
    checked: CHECKED,
  },
  // NPS, C&O Canal NHP Superintendent's Compendium 2026 ("Effective September 11, 2026"; digitally signed 10 September 2026): 2.1(c)(1) "Edible fruits, nuts,
  //   berries, and mushrooms may be gathered by hand for personal use or consumption." "Commercial use is prohibited." Removal "cannot disturb the remainder of the
  //   plant." Per person per day: 1 bushel of walnuts, hickory nuts, acorns, apples; 1/2 gallon of cherries, blackberries, raspberries, dewberries, strawberries,
  //   huckleberries, elderberries, paw paws, mushrooms; no limit on wine berries.
  {
    id: "nec-co-canal",
    applies: (p) => (is(p, "DC", "District of Columbia") || is(p, "MD", "Maryland")) && within(p, WASHINGTON, 30),
    title: "Chesapeake and Ohio Canal National Historical Park (National Park Service)",
    rule: "The C&O Canal's compendium (effective 11 September 2026) allows edible fruits, nuts, berries and mushrooms to be gathered by hand for personal use, without disturbing the rest of the plant; commercial use is prohibited. Daily limits per person are 1 bushel of walnuts, hickory nuts, acorns or apples, and half a gallon of cherries, blackberries, raspberries, dewberries, strawberries, huckleberries, elderberries, pawpaws or mushrooms. Wineberries have no limit.",
    source: { label: "NPS: C&O Canal NHP Superintendent's Compendium 2026", url: "https://www.nps.gov/choh/learn/management/upload/CHOH-Supt-Compendium-2026-508a.pdf" },
    checked: CHECKED,
  },
  // COMAR 08.07.06.13 (Use of State Parks: Plants, Rocks, Minerals, and Animals; regs.maryland.gov, no date shown): "In a State park an individual may not:"
  //   "Remove, disturb, damage, or destroy a plant, rock, mineral, or animal;" "Cut down, remove, or destroy a tree"; "The Service may issue permits for the
  //   removal of any item listed in this regulation." No exception for fruit, nuts or mushrooms.
  {
    id: "nec-md-state-parks",
    applies: (p) => is(p, "MD", "Maryland") && within(p, BALTIMORE, 40),
    title: "Maryland state parks",
    rule: "Maryland's rule for state parks (COMAR 08.07.06.13) says that in a state park an individual may not remove, disturb, damage or destroy a plant, or cut down or remove a tree. The Park Service may issue permits for removal. The rule gives no exception for berries, nuts or mushrooms.",
    source: { label: "COMAR 08.07.06.13, Plants, Rocks, Minerals, and Animals", url: "https://regs.maryland.gov/us/md/exec/comar/08.07.06.13" },
    checked: CHECKED,
  },
  // Rules and Regulations of the City of Baltimore, Department of Recreation and Parks, Park Management and Use (issued and effective 20 September 2013), Rule 25(a):
  //   "No person shall, in any park, cut, destroy, break, prune off, deface," "set fire to, mutilate, injure, disturb, sever from the ground," "or remove any
  //   growing thing, including but not limited to any plant," "flower, flower bed, shrub, tree, growth, grass, or any branch," "stem, fruit, or leaf thereof."
  //   25(d): no possessing such material "if such articles were taken from the park." Acts done under a permit are lawful; the Director "may waive any provision".
  //   (Checker: the permit clause is Section I.B.5, "Any act otherwise prohibited by these Rules and Regulations shall be lawful if performed under ... a permit";
  //   the waiver sentence sits in Rules 54.F and 55.)
  {
    id: "nec-baltimore-parks",
    applies: (p) => is(p, "MD", "Maryland") && within(p, BALTIMORE, 15),
    title: "Baltimore City parks",
    rule: "Baltimore's park rules (in effect from 20 September 2013, rule 25) say no person may, in any park, cut, injure, disturb, sever from the ground or remove any growing thing. That covers any plant, flower, shrub or tree and any branch, stem, fruit or leaf of one. No one may have such material in their possession in a park if it was taken from the park. Acts done under a permit are lawful, and the Director may waive a rule.",
    source: { label: "Baltimore City Recreation and Parks: Rules and Regulations, Park Management and Use (Rule 25)", url: "https://codes.baltimorecity.gov/us/md/cities/baltimore/cobra/attachments/22.08-Park_Management_and_Use.pdf" },
    checked: CHECKED,
  },
];
