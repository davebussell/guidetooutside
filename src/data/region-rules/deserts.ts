/**
 * Rules read from the regulator's own pages for the ecoregion "Deserts" (deserts): Albuquerque, Boise, Las Vegas, Tucson and Phoenix.
 *
 * CLOSED: closed-season rows (same shape and standard as src/data/closed-seasons.ts: a regulator, the page it
 * was read from, the date it was read, dates written as the regulator gives them).
 * LAND: where-you-may-pick rules (same shape and standard as src/data/land-rules.ts: the regulator's wording,
 * kept inside the source, with the page and the date it was read).
 *
 * Read 13 November 2026 (Day 4 of the regional audit). Nothing here is inferred: a row exists only where the page
 * was opened and read.
 */
import type { ClosedSeason } from "../closed-seasons";
import type { LandPlace, LandRule } from "../land-rules";

/** Date every page below was opened and read. */
const CHECKED = "2026-11-13";

export const CLOSED: ClosedSeason[] = [
// ======================= United States: Idaho (Boise) ===============================================================
// source: Idaho Fish and Game, "Idaho Fishing 2025–2027 Seasons & Rules", "2nd Edition 2026" (file dated 7-28-26), read 13 November 2026.
//   p. 25, Southwest Region: "All Waters Open All Year, except as modified in the Special Rule Waters on Pages 27-29."
//   General limits: "Trout limit is 6, all species combined"; "Brook Trout limit is 25"; "Kokanee limit is 6"; "Whitefish limit is 25";
//   "Bass limit is 6, both species combined", "None under 12 inches"; "The possession limit is 3-times the daily bag limit."
//   p. 29: "Boise River from the mouth upstream to Lucky Peak Dam (lower Boise River)": "From the downstream side of the East Parkcenter
//   Bridge to the upstream side of the West Parkcenter Bridge" "Trout limit is 2, none under 14 inches"; "All other sections of the lower
//   Boise River - Southwest Region general rules apply". McDevitt Pond and Parkcenter Pond: "Trout limit is 2". M.K. Nature Center:
//   "Closed to fishing". There is no special-rule entry for Lucky Peak Reservoir (it appears only as the boundary "Lucky Peak Dam").
//   p. 4: "Any person 14 years of age or older must buy a fishing license."
//   https://idfg.idaho.gov/sites/default/files/2025-2027_fishrules2ndedition_final_update_7-28-26.pdf
// source: IDFG Idaho Fishing Planner, "Boise River, Barber Dam to Lucky Peak" (Ada County; modified 2026-10-12 when first read, 2026-11-13 on
//   the re-read): "All Waters Open All Year", Southwest Region general rules apply;
//   "Fishing is not allowed within the posted upstream and downstream boundary of any fish weir or trap."
// Re-read 13 November 2026 (checker): the circle (20 km) takes in the lower Boise River, Lucky Peak Reservoir (dam about 15 km; no special
//   rule) and the Boise ponds; Arrowrock Reservoir (about 23 km) and Lake Lowell (about 37 km; bass catch-and-release 1 January to 30 June)
//   lie outside it. The one closed water inside it, the M.K. Nature Center (about 2 km), is in the note, not a closed row.
//   https://idfg.idaho.gov/ifwis/fishingplanner/water/72030
{
  id: "us-id-boise-open",
  countryCode: "US",
  admin1: ["ID", "Idaho"],
  near: { lat: 43.6166, lon: -116.2009, km: 20 },
  species: ["rainbow-trout", "brown-trout", "brook-trout", "kokanee", "largemouth-bass", "black-crappie", "bluegill", "channel-catfish", "common-carp"],
  closed: [],
  note:
    "Idaho's 2025-27 fishing rules (second edition, 2026) open every Southwest Region water all year, except the special-rule waters they list. The Boise River from its mouth up to Lucky Peak Dam follows the region's general rules, except between the East and West Parkcenter bridges in Boise, where the trout limit is 2, none under 14 inches. General daily limits are 6 trout of all kinds together, 25 brook trout, 6 kokanee, 6 largemouth and smallmouth bass together (none under 12 inches) and 25 whitefish; you may hold three times the daily limit. McDevitt Pond and Parkcenter Pond have a 2-trout limit, the M.K. Nature Center is closed to fishing, and no one may fish inside the posted boundaries of a fish weir or trap. Anglers 14 and older need an Idaho fishing licence.",
  regulator: "Idaho Department of Fish and Game (Southwest Region)",
  source: "https://idfg.idaho.gov/sites/default/files/2025-2027_fishrules2ndedition_final_update_7-28-26.pdf",
  checked: CHECKED,
},
// source: same booklet, p. 25: "Fishing for salmon is prohibited unless a salmon season is specifically opened for that water";
//   "Fishing for steelhead is prohibited unless a steelhead season is specifically opened for that water"; its steelhead definition covers
//   "the Boise River from its mouth upstream to Barber Dam during steelhead seasons". p. 10: "Sturgeon fishing is open statewide, all year,
//   except for the Kootenai River"; "Where open, sturgeon is catch-and-release only." p. 4: anyone fishing for salmon or steelhead also
//   needs a permit. The steelhead season dates are on p. 53, which was not in the text read.
{
  id: "us-id-boise-steelhead-salmon",
  countryCode: "US",
  admin1: ["ID", "Idaho"],
  near: { lat: 43.6166, lon: -116.2009, km: 20 },
  species: [],
  closed: [],
  water: ["rivers"],
  note:
    "In Idaho's Southwest Region, fishing for steelhead or salmon is not allowed unless a season is opened for that water, so no dates are loaded here. The rules' steelhead definition covers the Boise River from its mouth up to Barber Dam during a steelhead season. Anglers who fish for salmon or steelhead need a permit on top of the licence. Sturgeon may be fished all year but must be released.",
  regulator: "Idaho Department of Fish and Game (Southwest Region)",
  source: "https://idfg.idaho.gov/sites/default/files/2025-2027_fishrules2ndedition_final_update_7-28-26.pdf",
  checked: CHECKED,
},

// ======================= United States: Nevada (Las Vegas) ==========================================================
// source: Nevada fishing regulations (NDOW guide published by eRegulations), Southern Region Regulations, "Last Updated: September 23, 2026",
//   read 13 November 2026 — Southern Region General Regulations: "Open year around, any hour of the day or night."; general limit "10 trout and
//   15 warmwater game fish of which not more than 10 may be black bass." Lake Mead and Lake Mohave: "Year round; any hour of the day or night,
//   except in areas as posted."; "5 trout, 6 black bass, 25 catfish and 15 crappie. No limit on striped bass. No limit on other game fish."
//   2026 change: "Size and number limit removed entirely – unlimited striped bass of any size now allowed". Clark County Community Fishing
//   Ponds (Boulder City Pond at Veteran's Memorial Park, Lorenzi Park Pond, Mesquite Hafen Lane Pond, Sunset Park Pond, Floyd Lamb Park Pond):
//   "Year round; hours are when the park is open to public use.", limit 3 game fish. "CLARK COUNTY CLOSED WATERS: Lakes Mead and Mohave and
//   the Colorado River areas as posted", the areas immediately above and below Hoover and Davis dams, marinas, boats moored in marinas and
//   mooring areas unless the NPS posts otherwise (Calville Bay Marina, Boulder Harbor, Hemenway Harbor, Las Vegas Boat Harbor/Lake Mead
//   Marina; Cottonwood Cove), Spring Mountain Ranch State Park Pond, waters at Veteran's Memorial Park except the Boulder City Pond, waters in
//   the Clark County Wetlands Park on Las Vegas Wash, and Cornerstone Park as posted by Henderson. Licence: "Persons under 12 years of age are
//   not required to have a fishing license."; "Persons 12 years of age or older must have either a Nevada fishing license or a Nevada
//   Interstate Boundary Waters license;" "a Nevada short-term fishing permit or an Arizona fishing license." (under "Interstate Waters
//   Fishing License Information", for Lake Mead, Mohave and the Colorado River).
//   https://www.eregulations.com/nevada/fishing/southern-region-regulations
// Re-read 13 November 2026 (checker): the closure is "areas as posted immediately above and below Hoover and Davis Dams", not every posted
//   area of the lakes. Distances from the town centre: Clark County Wetlands Park about 14 km, Cornerstone Park about 17 km, Spring Mountain
//   Ranch about 30 km, the Boulder City pond and Boulder Harbor about 33 km, Hemenway Harbor and the Las Vegas Boat Harbor about 37 km,
//   Hoover Dam about 41 km, Calville Bay about 41 km (all on or beside Lake Mead, which the 40 km circle reaches); Mesquite (about 119 km),
//   Willow Beach and Lake Mohave (55 km and more) lie outside it, so they are left out of the note.
{
  id: "us-nv-las-vegas-open",
  countryCode: "US",
  admin1: ["NV", "Nevada"],
  near: { lat: 36.1674, lon: -115.1484, km: 40 },
  species: ["rainbow-trout", "largemouth-bass", "striped-bass", "channel-catfish", "black-crappie", "bluegill", "common-carp"],
  closed: [],
  note:
    "Nevada's 2026 regulations open the Southern Region all year, at any hour of the day or night, with a general limit of 10 trout and 15 warmwater game fish, no more than 10 of them black bass. Lake Mead is open all year except in posted areas; its daily limits are 5 trout, 6 black bass, 25 catfish and 15 crappie, and from 2026 Nevada sets no limit on striped bass. The Clark County community ponds near town (Lorenzi, Sunset, Floyd Lamb and the Boulder City pond at Veterans Memorial Park) allow 3 game fish a day while the park is open. These are closed: the posted areas just above and below Hoover Dam; unless the Park Service posts otherwise, Lake Mead's harbors, marinas, boats moored in marinas and mooring areas (Calville Bay, Boulder Harbor, Hemenway Harbor and the Las Vegas Boat Harbor and Lake Mead Marina complex); Las Vegas Wash and every water in the Clark County Wetlands Park; Cornerstone Park in Henderson as posted; the Spring Mountain Ranch State Park pond; and Veterans Memorial Park waters other than the Boulder City pond. No licence is needed under 12. On Lake Mead and the Colorado River, anglers 12 and older need a Nevada fishing licence or Interstate Boundary Waters licence, a Nevada short-term permit, or an Arizona fishing licence.",
  regulator: "Nevada Department of Wildlife (Southern Region)",
  source: "https://www.eregulations.com/nevada/fishing/southern-region-regulations",
  checked: CHECKED,
},
// source: National Park Service, Lake Mead National Recreation Area, Superintendent's Compendium 2026 ("Last updated: June 11, 2026"; the
//   update is signed 6-8-26), read 13 November 2026 — fishing rules follow the states "except where otherwise specifically restricted by federal
//   law or this Compendium"; "Fishing is prohibited in harbors, in or from marinas, from boats moored within marinas, and in mooring areas"; it
//   "may be permitted within harbors when posted with appropriate signs"; Saddle Island "closed to all fishing, hiking, and other land-based
//   uses"; "Fishing from vessels, float tubes and other floating devices is prohibited in the designated Lake Mead SCUBA Dive Area."
//   https://www.nps.gov/lake/learn/management/superintendent-s-compendium.htm
//   Re-read 13 November 2026 (checker): 36 CFR 2.3 says fishing rules "are governed by applicable, Arizona and Nevada fishing regulations";
//   "Fishing may be permitted within harbors when posted with appropriate signs."; the Saddle Island closure (near Boulder Beach) is the
//   water-treatment facility area, "closed to all fishing, hiking, and other land-based uses."
// source: NPS, Lake Mead NRA fishing page ("Last updated: September 16, 2025"): "our park lies within two states and each has their own
//   specific fishing regulations." https://www.nps.gov/lake/planyourvisit/fishing.htm
// source: AZGFD, Commission Order 40 ("Last Updated: April 8, 2025"), Region 3 (Kingman), Lake Mead: "The limit is 5 trout; the limit is 20
//   striped bass 20 inches in length or larger"; closed: "Posted portions and the area immediately above Hoover Dam."
//   https://www.eregulations.com/arizona/fishing/special-regulations-and-seasons-fish-commission-order-40
{
  id: "us-nv-lake-mead-nra-fishing",
  countryCode: "US",
  admin1: ["NV", "Nevada"],
  near: { lat: 36.1674, lon: -115.1484, km: 40 },
  species: [],
  closed: [],
  water: ["lakes", "rivers"],
  note:
    "Lake Mead National Recreation Area lies in both Nevada and Arizona, and the National Park Service's 2026 compendium applies each state's fishing rules, with limits of its own. Fishing is not allowed in harbors, in or from marinas, from boats moored in marinas or in mooring areas, though signs may allow it within a harbor. The water-treatment area on Saddle Island, near Boulder Beach, is closed to all fishing, and fishing from boats, float tubes or other floating devices is banned in the designated SCUBA dive area. Arizona's 2025-26 rules for Lake Mead still limit striped bass of 20 inches or longer to 20 a day, while Nevada's 2026 rules set no striped bass limit.",
  regulator: "National Park Service (Lake Mead National Recreation Area)",
  source: "https://www.nps.gov/lake/learn/management/superintendent-s-compendium.htm",
  checked: CHECKED,
},

// ======================= United States: Arizona (Tucson) ============================================================
// source: Arizona Game and Fish Department, 2025 & 2026 Arizona Fishing Regulations (eRegulations; pages "Last Updated: April 8, 2025", index
//   "Last Updated: October 27, 2026"), read 13 November 2026 — General Statewide Fishing Regulations and Bag Limits: "Open Statewide Jan. 1,
//   2025, through Dec. 31, 2026" (booklet p. 4). Statewide daily limits: trout 4, bass 6, striped bass 10, walleye 6, channel and flathead
//   catfish 10, crappie and sunfish unlimited; possession twice the daily limit. "you must have a valid fishing license, as applicable, in your
//   possession if you are 10 years of age or older." "No live baitfish may be used or possessed while on any waters in Coconino, Apache,
//   Navajo, Pima and Cochise counties."
// source: AZGFD, Special Regulations and Seasons – Fish: Commission Order 40 ("Last Updated: April 8, 2025"), Region 5 (Tucson): Waters and
//   Areas Closed to Fishing — "Lower Sabino Canyon", from the East and West forks' confluence "downstream to the U.S. Forest Service boundary in
//   Pima County"; "No watercraft allowed on: Frye Mesa Reservoir, Rose Canyon Lake."; Kennedy Lake, Lakeside Lake, Silverbell Park Lake and
//   Sahuarita Lake: "The limit is 4 catfish; 4 trout; 2 bass, minimum size 13 inches; 10 sunfish." Patagonia Lake and Sonoita Creek are not listed.
//   https://www.eregulations.com/arizona/fishing/special-regulations-and-seasons-fish-commission-order-40
// Re-read 13 November 2026 (checker): Region 5 "Waters and Areas Closed to Fishing" also lists, inside the circle, "Archer Lake at Christopher
//   Columbus Park in Pima County" (about 9 km) and "Kino Environmental Restoration Project in Pima County" (about 7 km); "Cienega Creek Posted
//   portions in Pima County" lies mostly outside it (the preserve is about 39 km). Rose Canyon Lake (about 31 km) is outside the 30 km circle,
//   so its no-watercraft rule is left out. Statewide limits from Bag Limits ("Last Updated: April 8, 2025"): trout "4 Any combination",
//   bass "6 Any combination", catfish (channel and flathead) "10 Any combination", crappie and sunfishes "Unlimited"; "Statewide possession
//   limits are twice (2x) the daily bag limit for each species". https://www.eregulations.com/arizona/fishing/bag-limits
//   Written as a note, not an open-all-year row: the season holds only "through Dec. 31, 2026", and an open-all-year row has no end date, so it
//   would go on printing "Open all year" in 2027. The 2027-28 rules were still proposals in AZGFD's bulletin of 24 June 2026
//   (https://content.govdelivery.com/accounts/AZGFD/bulletins/41d9511), which gives no season dates; the eRegulations index (27 October 2026)
//   still shows the 2025-2026 cover. Reload when the 2027-28 rules are published.
{
  id: "us-az-tucson-note",
  countryCode: "US",
  admin1: ["AZ", "Arizona"],
  near: { lat: 32.2229, lon: -110.9748, km: 30 },
  species: [],
  closed: [],
  note:
    "Arizona's 2025-26 fishing regulations open fishing statewide from 1 January 2025 to 31 December 2026. The rules for 2027 onwards are not loaded, so no season is shown here. Statewide daily limits are 4 trout, 6 bass and 10 channel and flathead catfish, with no limit on crappie or sunfish, and you may hold twice the daily limit. Tucson's Community Fishing lakes (Kennedy, Lakeside, Silverbell and Sahuarita) allow 4 catfish, 4 trout, 2 bass of at least 13 inches and 10 sunfish a day. These are closed to fishing: Lower Sabino Canyon, from where the East and West forks meet down to the Forest Service boundary; Archer Lake in Christopher Columbus Park; and the Kino Environmental Restoration Project. Live baitfish may not be used or held on any water in Pima County, and anglers 10 and older need a licence.",
  regulator: "Arizona Game and Fish Department (Region 5, Tucson)",
  source: "https://www.eregulations.com/arizona/fishing/special-regulations-and-seasons-fish-commission-order-40",
  checked: CHECKED,
},

// ======================= United States: Arizona (Phoenix) ===========================================================
// source: AZGFD, 2025 & 2026 Arizona Fishing Regulations (as above): "Open Statewide Jan. 1, 2025, through Dec. 31, 2026"; booklet p. 20:
//   "See page 46 for information on Lake Pleasant, Salt River, Tonto Creek and Verde River." and "Other seasonal closures may be in effect within
//   some areas due to bald eagle breeding closures and/or Wildlife Area closures (Roosevelt Lake)." Page 46 was not in the text read, so this row
//   is a note.
// source: Commission Order 40, Region 6 (Mesa): Apache, Canyon and Saguaro lakes: "Limit is 15 crappie. The limit is 5 catfish, any combination,
//   when taken by bow and arrow."; closed: "Posted areas immediately below Roosevelt Dam (Roosevelt Lake)", "Posted areas immediately below Horse
//   Mesa Dam (Apache Lake)", "Posted areas immediately below Mormon Flat Dam (Canyon Lake)". Community Fishing Program: "Each water in the
//   managed Community Fishing Program is designated as either a Lake or a Pond."; lake/pond limits catfish 4/2, trout 4/2, bass 2/1 (13 inches
//   or more), sunfish 10/5, white amur 1/1 (30 inches or more); listed waters include Tempe Town Lake, Encanto Park Lake, Papago Park Ponds,
//   Steele Indian School Park Pond and Kiwanis Park Lake; Crystal Gardens Wetlands (Avondale) and The Pond at Town Hall (Gilbert) are
//   catch-and-release for all resident species; Water Ranch Lake (Gilbert) is catch-and-release for bass and sunfish.
//   https://www.eregulations.com/arizona/fishing/special-regulations-and-seasons-fish-commission-order-40
// Re-read 13 November 2026 (checker): Region 6 also closes "Posted areas immediately below Waddell Dam (Lake Pleasant)" and Chase Creek (Gila
//   County), and says "Each water ... is designated as either a Lake or a Pond and has been named accordingly." The waters and closures of the
//   Salt River lakes (Saguaro about 52 km, Canyon about 61 km, Apache and Roosevelt farther) and Lake Pleasant (about 48 km) lie outside the
//   30 km circle, as do Water Ranch Lake (about 33 km) and Painted Sky Park at Blossom Rock (about 48 km), so they are left out of the note;
//   Crystal Gardens Wetlands (about 24 km) and the Pond at Town Hall (about 29 km) are inside it. Booklet p. 46 is not in the text of either
//   PDF (eRegulations 25AZFW_LR.pdf and AZGFD's 2025-26-Fishing-Regulations_260130.pdf both stop near p. 33). AZGFD's bald eagle bulletin of
//   2 December 2025 (https://content.govdelivery.com/accounts/AZGFD/bulletins/3fdf000) closes posted areas to foot, vehicle or watercraft entry,
//   mostly from Dec. 1 to June 30 (Lake Pleasant's Lower Agua Fria Arm "from Dec. 15 to June 15"); every area it names (Verde River, Tonto Creek,
//   Salt River below Stewart Mountain Dam and upstream, Lake Pleasant) is 40 km or more from the town centre, and the 2026-27 bulletin was not
//   found. Still a note: the statewide season ends "Dec. 31, 2026" (see the Tucson row).
{
  id: "us-az-phoenix-note",
  countryCode: "US",
  admin1: ["AZ", "Arizona"],
  near: { lat: 33.4484, lon: -112.0741, km: 30 },
  species: [],
  closed: [],
  note:
    "Arizona's 2025-26 fishing regulations open fishing statewide from 1 January 2025 to 31 December 2026. The rules for 2027 onwards are not loaded, so no season is shown here. Statewide daily limits are 4 trout, 6 bass and 10 channel and flathead catfish, with no limit on crappie or sunfish, and you may hold twice the daily limit. Each Community Fishing water in the Valley is designated a lake or a pond, and named so: lakes such as Tempe Town Lake and Encanto Park Lake allow 4 catfish, 4 trout, 2 bass of at least 13 inches and 10 sunfish a day; ponds such as Papago Park Ponds and Steele Indian School Park Pond allow 2 catfish, 2 trout, 1 bass of at least 13 inches and 5 sunfish. Crystal Gardens Wetlands in Avondale and the Pond at Town Hall in Gilbert are catch-and-release only for every species. Anglers 10 and older need a licence.",
  regulator: "Arizona Game and Fish Department (Region 6, Mesa)",
  source: "https://www.eregulations.com/arizona/fishing/special-regulations-and-seasons-fish-commission-order-40",
  checked: CHECKED,
},

// ======================= United States: New Mexico (Albuquerque) ====================================================
// source: New Mexico Department of Wildlife, "New Mexico Fishing Rules and Information 2026–27" (cover "v.08.04.26"; listed as current on the
//   Current Publications page, modified 2026-10-07), read 13 November 2026 — no statewide open-season sentence in the text read. p. 18: "When
//   water temperatures are cool, between Nov. 1–March 31, Winter Trout Waters" "are stocked with hatchery-reared rainbow trout."; lakes include
//   "Liam Knight Pond" and "Tingley Beach"; "Drains: Albuquerque, Belen Riverside, Bernalillo, Corrales and Peralta."; trout "5 per day 10 in
//   possession". p. 21: "Tingley Beach South Pond within the Albuquerque Conservancy Park." "artificial fly or lure with a single, barbless hook",
//   "Catch and release only." p. 36: Tingley Beach Kid's Pond "Open sunrise to sunset; Special Trout Water, South Pond only; Winter Trout Water;"
//   "Special Summer Catfish Water; No trotlines; No boats or flotation devices;" "Children's pond open to anglers 11 years of age and younger."
//   p. 31: Special Summer Catfish Waters "2 per day", "The possession limit is four fish." p. 35: Liam Knight Pond (Corrales Community Pond)
//   Special Summer Catfish and Winter Trout Water, no trotlines. p. 7: "anglers 12 years and older must possess a valid New Mexico Fishing License".
//   https://wildlife.dgf.nm.gov/download/2026-2027-new-mexico-fishing-rules-and-info/?wpdmdl=54201
// Re-read 13 November 2026 (checker): the p. 36 entry is headed "Tingley Beach Kid's Pond", and "Open sunrise to sunset" appears only there;
//   p. 38 lists Tingley Beach among "Waters where no boats or flotation devices are allowed"; "The Albuquerque area drains and Tingley Beach
//   are stocked weekly during the winter months."; Special Summer Catfish Waters: "Many small lakes and ponds are stocked from May–Sept.",
//   "Trotlines may not be used in Special Summer Catfish Waters." Corrales is about 18 km from the town centre, Bernalillo about 26 km,
//   Peralta about 28 km and Belen about 48 km.
{
  id: "us-nm-albuquerque-note",
  countryCode: "US",
  admin1: ["NM", "New Mexico"],
  near: { lat: 35.0841, lon: -106.651, km: 25 },
  species: [],
  closed: [],
  note:
    "New Mexico's 2026-27 fishing rules give daily limits but no statewide season wording, so no dates are loaded. Tingley Beach, Liam Knight Pond in Corrales and the Albuquerque, Corrales and Bernalillo drains are Winter Trout Waters, stocked with rainbow trout while the water is cool, between 1 November and 31 March (the drains and Tingley Beach weekly); the booklet also names the Peralta and Belen Riverside drains, farther south. The trout limit is 5 a day, 10 in possession. No boats or flotation devices are allowed at Tingley Beach. Its South Pond is catch-and-release only, with an artificial fly or lure on a single barbless hook, and its Kid's Pond, open sunrise to sunset, is for anglers 11 and younger. Tingley Beach and Liam Knight Pond are also Special Summer Catfish Waters, stocked from May to September, with a limit of 2 catfish a day (4 in possession) and no trotlines. Anglers 12 and older need a New Mexico fishing licence.",
  regulator: "New Mexico Department of Wildlife",
  source: "https://wildlife.dgf.nm.gov/download/2026-2027-new-mexico-fishing-rules-and-info/?wpdmdl=54201",
  checked: CHECKED,
},
// source: same booklet, pp. 41-42, fish consumption advisories (Northwest chart): "Rio Grande (US I-25 to 550)": "Channel catfish NA* Mercury,
//   PCBs"; "White bass 1 1 Mercury, PCBs". Re-read 13 November 2026 (checker): the chart gives "the number of meals (8 ounces) that can be
//   safely eaten each month" by fish length; "No Advisory (NA) indicates an advisory is unnecessary." So channel catfish carry no advisory
//   there; the size columns of white bass's two "1" values did not come through. The segment is printed only as "US I-25 to 550".
{
  id: "us-nm-albuquerque-rio-grande-advisory",
  countryCode: "US",
  admin1: ["NM", "New Mexico"],
  near: { lat: 35.0841, lon: -106.651, km: 25 },
  species: [],
  closed: [],
  water: ["rivers"],
  note:
    "New Mexico's 2026-27 fishing rules advise eating no more than one 8-ounce meal a month of white bass, for the sizes tested, from the Rio Grande segment the booklet labels \"US I-25 to 550\", because of mercury and PCBs. They list no advisory for channel catfish there.",
  regulator: "New Mexico Department of Wildlife",
  source: "https://wildlife.dgf.nm.gov/download/2026-2027-new-mexico-fishing-rules-and-info/?wpdmdl=54201",
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

const ALBUQUERQUE = { lat: 35.0841, lon: -106.651 };
const BOISE = { lat: 43.6166, lon: -116.2009 };
const LAS_VEGAS = { lat: 36.1674, lon: -115.1484 };
const TUCSON = { lat: 32.2229, lon: -110.9748 };
const PHOENIX = { lat: 33.4484, lon: -112.0741 };

export const LAND: LandRule[] = [

// NPS, Lake Mead NRA Superintendent's Compendium 2026 (last updated 11 June 2026; signed 6-8-26), 36 CFR 2.1(c)(1): "Native fruits, berries, and
//   nuts may be gathered by hand for personal use or consumption with the following conditions:" "One quart per day per person"; no 2.1(c)(2) entry;
//   s. 1.6 permits list "Specimen collection (Take plant, fish, wildlife, rocks or minerals)".
{
  id: "lake-mead-nra",
  applies: (p) => is(p, "NV", "Nevada") && within(p, LAS_VEGAS, 60),
  title: "Lake Mead National Recreation Area (National Park Service)",
  rule: "The National Park Service's 2026 compendium for Lake Mead National Recreation Area says native fruits, berries and nuts may be gathered by hand for personal use or eating, up to one quart per person a day. It says nothing about seeds or mushrooms. Taking plant specimens under the research-specimen rule (36 CFR 2.5) needs a permit.",
  source: { label: "NPS: Lake Mead NRA Superintendent's Compendium (2026), 36 CFR 2.1(c)(1)", url: "https://www.nps.gov/lake/learn/management/superintendent-s-compendium.htm" },
  checked: CHECKED,
},
// Saguaro National Park: not loaded (checker, 13 November 2026). The compendium in force was "Approved January 08, 2026"; its page
//   (https://www.nps.gov/sagu/learn/management/compendium.htm, "Last updated: January 8, 2026") shows the 36 CFR 2.1 heading with no text,
//   links no PDF and offers signed copies only by email request or at park headquarters. The 2024 compendium's fruit rule is superseded and
//   cannot stand for 2026.
// NPS, Petroglyph National Monument 2026 Superintendent's Compendium ("FINAL Jan 8 2026"; digital signature 2026-01-12): "(c)(1) Collecting of any
//   plant material or vegetative products including berries is prohibited."; s. 1.6 permits: "Collection of plants, fruits, berries, nuts, or other
//   similar natural resource products by tribal or non-tribal entities."
{
  id: "petroglyph-national-monument",
  applies: (p) => is(p, "NM", "New Mexico") && within(p, ALBUQUERQUE, 25),
  title: "Petroglyph National Monument (National Park Service)",
  rule: "Petroglyph National Monument's 2026 compendium prohibits collecting any plant material or plant products, berries included. Its list of activities that need a permit includes collecting plants, fruits, berries or nuts, whether by tribal or non-tribal groups.",
  source: { label: "NPS: Petroglyph National Monument Superintendent's Compendium (2026), 36 CFR 2.1(c)(1)", url: "https://www.nps.gov/petr/learn/management/upload/2026-Superintendent-Compendium-FINAL-Jan-8-2026-2.pdf" },
  checked: CHECKED,
},
// eCFR, 43 CFR 8365.1-5 (up to date as of 6/09/2026): (b) "Except on developed recreation sites and areas, or where otherwise prohibited and
//   posted," "it is permissible to collect from the public lands reasonable amounts of the following for noncommercial purposes:" (1) "Commonly
//   available renewable resources such as flowers, berries, nuts, seeds, cones and leaves;" (c) collecting "for sale or barter to commercial dealers"
//   needs "a contract or permit from an authorized officer".
{
  id: "blm-public-lands",
  applies: (p) => [ALBUQUERQUE, BOISE, LAS_VEGAS, TUCSON, PHOENIX].some((c) => within(p, c, 60)),
  title: "Bureau of Land Management public lands",
  rule: "Federal rules for Bureau of Land Management public lands (43 CFR 8365.1-5) allow reasonable amounts of commonly available renewable resources, such as flowers, berries, nuts, seeds, cones and leaves, to be collected for noncommercial purposes. This does not apply on developed recreation sites and areas, or where collecting is prohibited and posted. Collecting to sell or barter to commercial dealers needs a contract or permit. The rule does not name mushrooms.",
  source: { label: "eCFR: 43 CFR 8365.1-5, Property and resources", url: "https://www.ecfr.gov/current/title-43/subtitle-B/chapter-II/subchapter-H/part-8360/subpart-8365/section-8365.1-5" },
  checked: CHECKED,
},
// USFS, Boise National Forest, Nonwood Products (last updated 10 June 2025): "Mushroom harvesting on the Boise National Forest is currently for
//   personal use only."; "No permit is required to harvest mushrooms for personal use."; 5 gallons per person per day, 10 gallons in possession;
//   "Mushrooms are used for non-commercial purposes and cannot be sold for profit." Berries and other plants are not covered.
{
  id: "boise-national-forest-mushrooms",
  applies: (p) => is(p, "ID", "Idaho") && within(p, BOISE, 60),
  title: "Boise National Forest (U.S. Forest Service)",
  rule: "The Boise National Forest says mushroom harvesting is currently for personal use only and needs no permit, up to 5 gallons per person a day and 10 gallons held at one time. The mushrooms may not be sold. The page does not cover berries or other plants.",
  source: { label: "U.S. Forest Service: Boise National Forest, nonwood products", url: "https://www.fs.usda.gov/r04/boise/forest-products/nonwood-products" },
  checked: CHECKED,
},
// Arizona State Parks & Trails, Agency Rules and Regulations page (no date; full text at apps.azsos.gov/public_services/Title_12/12-08.pdf, not
//   read), R12-8-103 Vandalism: "Within a state park, a person shall not deface, injure, destroy, remove, or use, without authority, any:" "Wildlife,
//   plant, or animal; or" "Archaeological, geological, or historical object."
{
  id: "arizona-state-parks",
  applies: (p) => is(p, "AZ", "Arizona"),
  title: "Arizona state parks",
  rule: "Arizona State Parks' rule R12-8-103 says that within a state park, no one may deface, injure, destroy, remove or use any plant, animal or wildlife, or any archaeological, geological or historical object, without authority. It names no personal-use exception and does not mention fruit or cactus by name.",
  source: { label: "Arizona State Parks & Trails: Agency Rules and Regulations (R12-8-103)", url: "https://azstateparks.com/agency-rules-regulations" },
  checked: CHECKED,
},
// IDAPA 26.01.20, Rules Governing the Administration of Park and Recreation Areas and Facilities, current edition (history notes run to 7-1-26;
//   adminrules.idaho.gov/rules/current redirects to files.dfm.idaho.gov), s. 175.09 Protection of Historical, Cultural and Natural Resources:
//   "The digging, destruction or removal of historical, cultural or natural resources is prohibited." "Collection for scientific and educational
//   purposes may be allowed through a permit." Same wording as the 2024 archive the first reader used; no section names plants, berries,
//   mushrooms or foraging.
{
  id: "idaho-state-parks",
  applies: (p) => is(p, "ID", "Idaho"),
  title: "Idaho state parks and recreation areas",
  rule: "Idaho's rules for state park and recreation areas (IDAPA 26.01.20, section 175.09) forbid digging, destroying or removing historical, cultural or natural resources. Collecting for scientific or educational purposes may be allowed by permit. The rule does not name plants, berries or mushrooms.",
  source: { label: "Idaho Administrative Code: IDAPA 26.01.20, s. 175.09 (current edition)", url: "https://adminrules.idaho.gov/rules/current/26/260120.pdf" },
  checked: CHECKED,
},
// City of Albuquerque, Open Space Rules, Regulations & Etiquette (no date; enforced under "Bernalillo County Ordinance 88-9 and City of Albuquerque
//   Revised Ordinances, R.O. 1974, 5-6"): "Do not disturb, cut, chop, and/or remove any tree, shrub, plant, cactus, and/or grass."; "Chopping or
//   removal of firewood is strictly prohibited in Open Space." No exception named.
{
  id: "albuquerque-open-space",
  applies: (p) => is(p, "NM", "New Mexico") && within(p, ALBUQUERQUE, 25),
  title: "City of Albuquerque Open Space",
  rule: "The City of Albuquerque's Open Space rules tell visitors not to disturb, cut, chop or remove any tree, shrub, plant, cactus or grass, and they strictly prohibit chopping or removing firewood. The page names no exception and does not mention fruit, seeds or mushrooms.",
  source: { label: "City of Albuquerque: Open Space Rules, Regulations & Etiquette", url: "https://www.cabq.gov/parksandrecreation/open-space/open-space-rules-regulations-etiquette" },
  checked: CHECKED,
},
];
