/**
 * Fish-consumption advisories: how much of a water's catch a health or environment agency says is safe to eat (Day 3
 * audit, 11 November 2026). The fishing pages showed walleye and channel catfish "in season" on Pittsburgh's three rivers
 * and on the Mississippi at St. Louis with no word of the PCB and mercury advice their states publish for those very fish.
 *
 * The rows follow the closed-seasons pattern (src/data/closed-seasons.ts): each is scoped to the place by country, state
 * or province, a circle on the map, the kinds of water on the fishing page and, where the advice is for named rivers, the
 * town's great rivers (water-setting `bigRiver` or `confluence`); each names the fish as the advisory does, the waters in
 * its words, the advice, who it is for, the agency, the page it was read from and the date read. `species` are library
 * slugs the advice covers ("*" for every fish), so the page can print the advice beside each fish it names; a row whose
 * fish are not in the library (sturgeon, buffalo) has none and is printed with the water only.
 *
 * Only the advice is printed, never a judgement of it: "No more than one meal a month" is the agency's line, and the
 * page names the agency and links its page.
 */
import type { WaterGroup } from "@/lib/fish-habitats";

export type FishAdvisory = {
  id: string;
  /** ISO 3166-1 alpha-2. */
  countryCode: string;
  /** State or province names or codes (case-insensitive). */
  admin1?: string[];
  /** A circle on the map the advice is limited to. */
  near?: { lat: number; lon: number; km: number };
  /** Circles the advice does not reach: where a water's own, later advice is printed instead (Day 4 audit). */
  notNear?: { lat: number; lon: number; km: number }[];
  /** Only where one of these is among the town's great rivers (water-setting `bigRiver`, or a `confluence`'s rivers). */
  rivers?: string[];
  /** The fishing page's kinds of water the advice is printed with; absent, all of them. */
  water?: WaterGroup[];
  /** Library slugs the advice covers, or ["*"] for every fish. Empty when none of its fish is in the library. */
  species: string[];
  /** The fish as the advisory names them. */
  fish: string;
  /** Where it applies, in the advisory's words. */
  waters: string;
  /** The advice, in the advisory's words made plain. */
  advice: string;
  /** Who the advice is for, when it is not everyone. */
  who?: string;
  /** What the advice is for, where the advisory says. */
  contaminant?: string;
  /** "Pennsylvania 2026 fish consumption advisories". */
  agency: string;
  source: string;
  /** Date read, ISO. */
  checked: string;
};

// source: 2026 Commonwealth of Pennsylvania Fish Consumption Advisories (Pennsylvania Fishing Summary, p. 38), read
//   11 November 2026. Ohio River (Allegheny and Beaver Cos.), "From Lock & Dam 2 on the Monongahela River and Lock & Dam 2
//   on the Allegheny River to the Montgomery Lock & Dam": 1 meal/month, PCB, "Based on advisories issued by Ohio River
//   Valley Water Sanitation Commission". Allegheny River pools 2, 3 and 4: carp and channel catfish, 1 meal/month, PCB.
//   Monongahela River pools 2 and 3: carp, 1 meal/month, PCB. Statewide: "eat no more than one meal (1/2 pound) per week
//   of sport fish caught in the state's waterways".
const PA_SRC =
  "https://files.dep.state.pa.us/Water/Drinking%20Water%20and%20Facility%20Regulation/WaterQualityPortalFiles/FishConsumption/FishAdvisory/FCA_SummaryBookExcerpt_2026.pdf";
const PA = "Pennsylvania 2026 fish consumption advisories";
/** Pittsburgh's three rivers, at the town: the pools named run 25 to 50 km up and down stream, so the circle is the town's. */
const PITTSBURGH = { lat: 40.4407, lon: -80.0026, km: 25 };

// source: Missouri Department of Health and Senior Services, "Missouri Fish Advisory: A Guide to Eating Missouri Fish"
//   (summary, "Revised: March 2024", posted March 2026), read 11 November 2026. Mississippi and Missouri rivers, all
//   consumers: flathead, channel and blue catfish over 17 inches, one meal a week; common carp over 21 inches, one meal a
//   week; buffalo, one meal a month; shovelnose sturgeon (excluding eggs), one meal a month; sturgeon eggs, do not eat
//   (PCBs, chlordane, mercury). Sensitive populations, all Missouri water bodies: largemouth, spotted and smallmouth bass
//   and walleye over 12 inches, and flathead, channel and blue catfish over 30 inches, one meal a month (mercury).
const MO_SRC = "https://health.mo.gov/sites/health/files/media/pdf/2026/03/fishadvisorysummary.pdf";
const MO = "Missouri DHSS fish advisory";
const MO_SENSITIVE = "pregnant women, women of childbearing age, nursing mothers and children under 13";

// source: Texas Department of State Health Services, Fish and Shellfish Consumption Advisory ADV-55 (revising ADV-49 of
//   26 June 2013), read 11 November 2026: "The Houston Ship Channel and all contiguous waters north of the Fred Hartman
//   Bridge, State Highway 146" and "the San Jacinto River below the Lake Houston Dam"; all species of fish and blue crab;
//   women of childbearing age and children under 12 should not eat them; women past childbearing age and adult men, no
//   more than one 8-ounce meal a month (PCBs, dioxins).
const TX_SRC = "https://www.dshs.texas.gov/sites/default/files/seafood/PDF2/Active/ADV-55-Signed.pdf";

const READ = "2026-11-11";

// Day 4 audit (13 November 2026): Sacramento, San Jose and Los Angeles showed striped bass in season with no word of
// California's advice, and the Florida pages none of Florida's.
// source: OEHHA press release, 16 November 2022, "Updated statewide advisory for fish that migrate offers safe eating
//   advice": women 18-49 and children 1-17 "should not eat Striped Bass or White Sturgeon"; women 50 and over and men 18 and
//   over, "one total serving per week of Striped Bass or White Sturgeon"; it "covers these species when caught in anadromous
//   waters (waters with access to the ocean)", "rivers, estuaries, and coastal waters" (read 13 November 2026). OEHHA's own
//   advisories for San Francisco Bay (2023) and San Diego Bay (2018) are printed by the regulator rows for San Jose and San
//   Diego (src/data/region-rules/mediterranean-california.ts), so this row leaves those circles out rather than print two
//   different servings for one bay.
const CA_STATEWIDE_SRC = "https://oehha.ca.gov/fish/press-release/press-release-fish/updated-statewide-advisory-fish-migrate-offers-safe-eating";
// source: OEHHA, "Sacramento River and Northern Delta" advisory (issued or last updated 16 November 2022; mercury, PBDEs or
//   PCBs): covers "the Sacramento River from just below Shasta Lake to where it joins the San Joaquin River in Pittsburg" and
//   the Delta north of Highway 12. Women 50 and over and men: black bass 1 serving a week, catfish 2, striped bass 1, white
//   sturgeon 1, Sacramento pikeminnow 1. Women 18-49 and children 1-17: these five under "DO NOT EAT". The page's text is
//   flattened, so the "DO NOT EAT" grouping was read from its order; the statewide release above gives the same "should not
//   eat" for striped bass (read 13 November 2026). The page's other servings are not printed here.
const CA_SAC_SRC = "https://www.oehha.ca.gov/fish/advisories/sacramento-river-and-northern-delta";
const SACRAMENTO = { lat: 38.5811, lon: -121.4939, km: 30 };
/** San Francisco Bay at San Jose, and San Diego Bay: their own OEHHA advice is in the regulator rows. */
const CA_BAYS = [
  { lat: 37.3362, lon: -121.8906, km: 30 },
  { lat: 32.7174, lon: -117.1628, km: 30 },
];
// source: Florida Department of Health, "Florida Fish Consumption Recommendations Guidebook" (list for 2025 dated 31 October
//   2025, file updated April 2026), marine table, "All coastal waters", "All coastal counties": red drum, spotted seatrout,
//   snook and bluefish, "One per month"; crevalle jack and great barracuda, "One per month", "All coastal waters (excluding
//   Florida Bay, Biscayne Bay, and Florida Keys)"; striped, white and fantail mullet, "Two per week". Florida Bay, Biscayne
//   Bay and the Florida Keys (Miami-Dade and Monroe counties): crevalle jack and great barracuda "DO NOT EAT" (mercury).
//   The guidebook gives one line for everyone, with no separate line for women and children (read 13 November 2026).
const FL_SRC = "https://www.floridahealth.gov/wp-content/uploads/2026/01/Florida-Fish-Consumption-Recommendations-Guidebook-2025-Final_Updated-April-2026.pdf";
const FL = "Florida DOH fish consumption guidebook";
/** Biscayne Bay (and Florida Bay and the Keys beyond it): Miami, not Fort Lauderdale, 55 km north. */
const BISCAYNE = { lat: 25.65, lon: -80.22, km: 30 };
const READ_D4 = "2026-11-13";

// ---- Day 5 audit (checkers of 14 November 2026, on the audit of 10 November): Albany, Portland, Spokane, Seattle, Madison, San Antonio,
//   Vancouver Island and Yellowknife showed fish in season with no word of the advice their health agencies publish for those waters.
//   Every page below was read on 14 November 2026.
const READ_D5 = "2026-11-14";
// source: New York State Department of Health, "Fish Advisories for the Hudson River & Tributaries" ("Revised: April 2026"): "Hudson River,
//   Federal Dam at Troy to Rip Van Winkle Bridge at Catskill" (Rensselaer, Albany, Columbia, Greene counties): yellow perch, rock bass, blueback
//   herring, alewife "Up to 1 meal/month" (general population), "DON'T EAT" (sensitive population: people who may become pregnant, under 50, and
//   children under 15); "All other fish (including Striped bass and Walleye)" "DON'T EAT" for both; chemical of concern PCBs. The Troy dam is
//   about 11 km north of the city, so the circle stops short of the river above it (a different reach with its own advice).
const NY_HUDSON_SRC = "https://www.health.ny.gov/environmental/outdoors/fish/health_advisories/regional/hudson_river_and_tributaries.htm";
const NY_HUDSON = "New York State Department of Health, Hudson River advisories";
const ALBANY = { lat: 42.6512, lon: -73.755, km: 10 };
const HUDSON_WATERS = "the Hudson River from the Federal Dam at Troy down to the Rip Van Winkle Bridge at Catskill";
// source: Oregon Health Authority, "Lower Willamette Fish Advisory" (first issued 2004, updated 2018): covers "the Sellwood Bridge to the Columbia
//   River" and "the Multnomah Channel to the Sauvie Island Bridge"; black crappie 2 meals a month (4 if fillet only); bass (including smallmouth),
//   brown bullhead and carp "Do not eat"; "Walleye and other resident fish" should not be eaten; PCBs and mercury; one set of advice for everyone;
//   migratory fish (salmon, steelhead, shad, trout) are not covered and are recommended.
const OR_LW_SRC = "https://www.oregon.gov/oha/PH/HEALTHYENVIRONMENTS/RECREATION/FISHCONSUMPTION/Pages/Lower-Willamette-Fish-Advisory.aspx";
const OR_LW = "Oregon Health Authority, Lower Willamette advisory";
const PORTLAND_OR = { lat: 45.5202, lon: -122.6742, km: 20 };
const LW_WATERS = "the Willamette River from the Sellwood Bridge down to the Columbia, and the Multnomah Channel to the Sauvie Island Bridge";
// source: Washington State Department of Health, "Spokane River Fish Advisory" fact sheet (DOH 334-164, "Updated 2009"; listed on DOH's advisory
//   publications page, read 14 November 2026): "From Upriver Dam to the Idaho Border": "Do Not Eat Fish", "Catch & Release Only"; "From Nine Mile Dam
//   to Upriver Dam": largescale sucker "Do Not Eat", all other species "One meal per month"; "This advisory is for everyone"; PCBs and PBDEs. The
//   DOH advisories page also gives two statewide mercury advisories "for every waterbody in Washington State", for children and women who are or
//   may become pregnant or nursing mothers: northern pikeminnow "DO NOT EAT"; largemouth and smallmouth bass "Limit to 2 meals per month".
//   https://doh.wa.gov/community-and-environment/food/fish/advisories
const WA_SPOKANE_SRC = "https://doh.wa.gov/sites/default/files/legacy/Documents/Pubs/334-164.pdf";
const WA_DOH = "Washington State Department of Health";
const SPOKANE = { lat: 47.6572, lon: -117.4235, km: 20 };
// source: WA DOH, Lower Duwamish River advisory sign (DOH 334-330, June 2013): "DO NOT EAT crab, shellfish, or bottom-feeding fish due to pollution";
//   "EAT SALMON"; Chinook (king) "Limit: 4 meals per month"; blackmouth (resident Chinook caught in winter) "2 meals per month".
//   Lake Washington advisory sign (DOH 334-263, June 2009): northern pikeminnow and carp "DO NOT EAT these fish due to chemical pollution"; cutthroat
//   trout 1 meal a month; yellow perch 1 meal a week; sockeye, rainbow trout and pumpkinseed 2 to 3 meals a week. (The WDFW regulations booklet's
//   "Eat Fish, Choose Wisely" table, updated 19 September 2025, lists Lake Washington carp, cutthroat, largemouth and smallmouth bass and
//   pikeminnow as "Everyone should not eat"; that table is WDFW's, not the health department's own page, so only the sign is printed.)
const WA_DUWAMISH_SRC = "https://doh.wa.gov/sites/default/files/legacy/Documents/Pubs/334-330.pdf";
const WA_LAKE_WA_SRC = "https://doh.wa.gov/sites/default/files/legacy/Documents/Pubs/334-263.pdf";
const SEATTLE = { lat: 47.6038, lon: -122.3301, km: 15 };
// source: Wisconsin DNR, "PFAS Fish Consumption Advisories Of The Yahara River" (no date on the page): applies to "Wingra Creek, Lake Monona,
//   Starkweather Creek, Lake Waubesa, Upper and Lower Mud Lake, Lake Kegonsa and the Yahara River downstream to the Rock River in Rock County";
//   "The DNR did not issue PFAS-based fish consumption advisories for Lake Mendota or Lake Wingra"; everyone, all sizes: black crappie, largemouth
//   bass, northern pike, walleye, white bass and yellow perch "DO NOT EAT"; bluegill, freshwater drum, pumpkinseed and yellow bass 1 serving a month.
//   (DNR's news release of 18 January 2023 gave white bass one meal a month; the page as read now says do not eat, and the page is what is printed.)
const WI_YAHARA_SRC = "https://dnr.wisconsin.gov/topic/PFAS/FishAdvisoryYaharaRiver.html";
const WI_YAHARA = "Wisconsin DNR, Yahara chain PFAS advisory";
const MADISON = { lat: 43.0747, lon: -89.3842, km: 20 };
const YAHARA_WATERS = "Lake Monona, Lake Waubesa, Upper and Lower Mud Lake, Lake Kegonsa, Wingra Creek, Starkweather Creek and the Yahara River down to the Rock River (not Lake Mendota or Lake Wingra)";
// source: Texas DSHS, Water Bodies with Advisories, Bans and FAQs by region (read 14 November 2026): Leon Creek (Bexar County) lists Advisory 42 as the
//   advisory and Advisory 26 (2003) among "Rescinded Advisories or Bans", so ADV-42 is printed, not ADV-26 as the audit named it. ADV-42's signed
//   PDF has no machine-readable text; DSHS's ADV-42 questions and answers (June 2010): "The advisory area begins at the Old U.S. Highway 90 Bridge and
//   extends downstream to the Loop 410 Bridge", "persons should not consume any species of fish from Leon Creek", PCBs. DSHS's 2024 Lower Leon Creek
//   addendum recommends that "DSHS continue the consumption advisory (ADV-42)" and describes its reach as "from State Highway 90 to Rodriquez Park".
//   https://www.dshs.texas.gov/seafood/advisories-bans.aspx
const TX_LEON_SRC = "https://www.dshs.texas.gov/sites/default/files/seafood/PDF2/FAQs/Leon-Creek-QA-2010.pdf";
const SAN_ANTONIO = { lat: 29.4246, lon: -98.4951, km: 20 };
// source: 2025-2027 BC Freshwater Fishing Regulations Synopsis, Region 1 (Vancouver Island), "MERCURY ADVISORY": "Mercury levels in larger Smallmouth
//   Bass in lakes on Vancouver Island and the Gulf Islands may be above national guidelines."; the general public, "especially children and women of
//   child bearing age", and pregnant and breastfeeding women are advised to limit how much smallmouth bass they eat; it points to HealthLinkBC. No size,
//   lake list or meal count is given, so none is printed.
const BC_R1_SRC = "https://www2.gov.bc.ca/assets/gov/sports-recreation-arts-and-culture/outdoor-recreation/fishing-and-hunting/freshwater-fishing/region_1_vancouver_island.pdf";
// source: Government of the Northwest Territories, Health and Social Services, "Arsenic in Lake Water Around Yellowknife" ("Last Reviewed: May 17,
//   2024"): in the map's orange, red and purple zones "avoid fishing, swimming, and harvesting berries, mushrooms and other edible plants"; lakes to
//   keep avoiding: David, Fox, Frame, Gar, Handle, Jackfish, Kam, Niven, Peg, Meg and Rat lakes (arsenic 52 parts per billion and above). HSS
//   "Swimming and fishing FAQs" (November 2019): "avoid eating fish from lakes with high levels of arsenic in the water (above 52 ppb)"; fish from
//   Back Bay and Yellowknife Bay are considered safe.
const NT_ARSENIC_SRC = "https://www.hss.gov.nt.ca/en/newsroom/arsenic-lake-water-around-Yellowknife";
const YELLOWKNIFE = { lat: 62.454, lon: -114.3774, km: 15 };

export const FISH_ADVISORIES: FishAdvisory[] = [
  {
    id: "pa-ohio-river-pittsburgh",
    countryCode: "US",
    admin1: ["PA", "Pennsylvania"],
    near: PITTSBURGH,
    water: ["rivers"],
    species: ["walleye", "smallmouth-bass", "largemouth-bass", "black-crappie", "channel-catfish", "common-carp"],
    fish: "All suckers, black crappie, carp, channel and flathead catfish, freshwater drum, hybrid striped bass, largemouth, smallmouth and spotted bass, sauger, walleye, white bass and white crappie",
    waters: "the Ohio River from Lock & Dam 2 on the Allegheny and Lock & Dam 2 on the Monongahela down to the Montgomery Lock & Dam",
    advice: "No more than one meal a month",
    contaminant: "PCBs",
    agency: PA,
    source: PA_SRC,
    checked: READ,
  },
  {
    id: "pa-allegheny-pools-2-4",
    countryCode: "US",
    admin1: ["PA", "Pennsylvania"],
    near: PITTSBURGH,
    water: ["rivers"],
    species: ["common-carp", "channel-catfish"],
    fish: "Carp and channel catfish",
    waters: "the Allegheny River, pools 2 to 4 (Lock & Dam 2 up to Lock & Dam 5)",
    advice: "No more than one meal a month",
    contaminant: "PCBs",
    agency: PA,
    source: PA_SRC,
    checked: READ,
  },
  {
    id: "pa-monongahela-pools-2-3",
    countryCode: "US",
    admin1: ["PA", "Pennsylvania"],
    near: PITTSBURGH,
    water: ["rivers"],
    species: ["common-carp"],
    fish: "Carp",
    waters: "the Monongahela River, pools 2 and 3 (Locks & Dam 2 up to Locks & Dam 4)",
    advice: "No more than one meal a month",
    contaminant: "PCBs",
    agency: PA,
    source: PA_SRC,
    checked: READ,
  },
  {
    id: "pa-statewide",
    countryCode: "US",
    admin1: ["PA", "Pennsylvania"],
    species: ["*"],
    fish: "Sport fish",
    waters: "every water in Pennsylvania, unless a water's own advice is stricter",
    advice: "No more than one meal (half a pound) a week",
    agency: PA,
    source: PA_SRC,
    checked: READ,
  },
  {
    id: "mo-big-rivers-catfish",
    countryCode: "US",
    admin1: ["MO", "Missouri"],
    rivers: ["Mississippi", "Missouri"],
    water: ["rivers"],
    species: ["channel-catfish"],
    fish: "Flathead, channel and blue catfish over 17 inches",
    waters: "the Mississippi and Missouri rivers",
    advice: "No more than one meal a week",
    contaminant: "PCBs, chlordane and mercury",
    agency: MO,
    source: MO_SRC,
    checked: READ,
  },
  {
    id: "mo-big-rivers-carp",
    countryCode: "US",
    admin1: ["MO", "Missouri"],
    rivers: ["Mississippi", "Missouri"],
    water: ["rivers"],
    species: ["common-carp"],
    fish: "Common carp over 21 inches",
    waters: "the Mississippi and Missouri rivers",
    advice: "No more than one meal a week",
    contaminant: "PCBs, chlordane and mercury",
    agency: MO,
    source: MO_SRC,
    checked: READ,
  },
  {
    id: "mo-big-rivers-sturgeon-buffalo",
    countryCode: "US",
    admin1: ["MO", "Missouri"],
    rivers: ["Mississippi", "Missouri"],
    water: ["rivers"],
    species: [],
    fish: "Shovelnose sturgeon and buffalo",
    waters: "the Mississippi and Missouri rivers",
    advice: "No more than one meal a month; do not eat sturgeon eggs",
    contaminant: "PCBs, chlordane and mercury",
    agency: MO,
    source: MO_SRC,
    checked: READ,
  },
  {
    id: "mo-statewide-sensitive-bass-walleye",
    countryCode: "US",
    admin1: ["MO", "Missouri"],
    species: ["largemouth-bass", "smallmouth-bass", "walleye"],
    fish: "Largemouth, spotted and smallmouth bass and walleye over 12 inches",
    waters: "every water in Missouri",
    advice: "No more than one meal a month",
    who: MO_SENSITIVE,
    contaminant: "mercury",
    agency: MO,
    source: MO_SRC,
    checked: READ,
  },
  {
    id: "mo-statewide-sensitive-catfish",
    countryCode: "US",
    admin1: ["MO", "Missouri"],
    species: ["channel-catfish"],
    fish: "Flathead, channel and blue catfish over 30 inches",
    waters: "every water in Missouri",
    advice: "No more than one meal a month",
    who: MO_SENSITIVE,
    contaminant: "mercury",
    agency: MO,
    source: MO_SRC,
    checked: READ,
  },
  {
    id: "tx-adv-55-houston-ship-channel",
    countryCode: "US",
    admin1: ["TX", "Texas"],
    // The Fred Hartman Bridge (Baytown) is about 35 km east of downtown Houston: the circle is the town's.
    near: { lat: 29.76, lon: -95.37, km: 40 },
    water: ["rivers", "estuary"],
    species: ["*"],
    fish: "All fish and blue crab",
    waters: "the Houston Ship Channel and all contiguous waters north of the Fred Hartman Bridge (State Highway 146), and the San Jacinto River below the Lake Houston Dam",
    advice: "Women of childbearing age and children under 12: none. Other adults: no more than one 8-ounce meal a month",
    contaminant: "PCBs and dioxins",
    agency: "Texas DSHS advisory ADV-55",
    source: TX_SRC,
    checked: READ,
  },
  {
    id: "ca-statewide-anadromous-striped-bass",
    countryCode: "US",
    admin1: ["CA", "California"],
    notNear: CA_BAYS,
    water: ["sea", "estuary"],
    species: ["striped-bass"],
    fish: "Striped bass and white sturgeon",
    waters: "California's waters with access to the ocean: rivers, estuaries and coastal waters",
    advice: "Women 18 to 49 and children 1 to 17: do not eat. Women 50 and over and men: no more than one serving a week, of the two together",
    agency: "California OEHHA statewide advisory",
    source: CA_STATEWIDE_SRC,
    checked: READ_D4,
  },
  {
    id: "ca-sacramento-river-do-not-eat",
    countryCode: "US",
    admin1: ["CA", "California"],
    near: SACRAMENTO,
    rivers: ["Sacramento"],
    water: ["rivers"],
    species: ["largemouth-bass", "smallmouth-bass", "channel-catfish", "striped-bass"],
    fish: "Black bass, catfish, striped bass, white sturgeon and Sacramento pikeminnow",
    waters: "the Sacramento River from below Shasta Lake to Pittsburg, and the Delta north of Highway 12",
    advice: "Women 18 to 49 and children 1 to 17: do not eat. Women 50 and over and men: one serving a week (catfish: two)",
    contaminant: "mercury, PBDEs or PCBs",
    agency: "California OEHHA, Sacramento River and Northern Delta",
    source: CA_SAC_SRC,
    checked: READ_D4,
  },
  {
    id: "fl-coastal-drum-seatrout-snook-bluefish",
    countryCode: "US",
    admin1: ["FL", "Florida"],
    water: ["sea", "estuary"],
    species: ["redfish", "speckled-trout", "snook", "bluefish"],
    fish: "Red drum, spotted seatrout, snook and bluefish",
    waters: "all of Florida's coastal waters",
    advice: "No more than one meal a month",
    agency: FL,
    source: FL_SRC,
    checked: READ_D4,
  },
  {
    id: "fl-coastal-jack-barracuda",
    countryCode: "US",
    admin1: ["FL", "Florida"],
    notNear: [BISCAYNE],
    water: ["sea", "estuary"],
    species: ["crevalle-jack", "great-barracuda"],
    fish: "Crevalle jack and great barracuda",
    waters: "Florida's coastal waters, except Florida Bay, Biscayne Bay and the Keys",
    advice: "No more than one meal a month",
    agency: FL,
    source: FL_SRC,
    checked: READ_D4,
  },
  {
    id: "fl-biscayne-jack-barracuda",
    countryCode: "US",
    admin1: ["FL", "Florida"],
    near: BISCAYNE,
    water: ["sea", "estuary"],
    species: ["crevalle-jack", "great-barracuda"],
    fish: "Crevalle jack and great barracuda",
    waters: "Florida Bay, Biscayne Bay and the Florida Keys",
    advice: "Do not eat",
    contaminant: "mercury",
    agency: FL,
    source: FL_SRC,
    checked: READ_D4,
  },
  {
    id: "fl-coastal-mullet",
    countryCode: "US",
    admin1: ["FL", "Florida"],
    water: ["sea", "estuary"],
    species: ["flathead-grey-mullet"],
    fish: "Striped, white and fantail mullet",
    waters: "all of Florida's coastal waters",
    advice: "No more than two meals a week",
    agency: FL,
    source: FL_SRC,
    checked: READ_D4,
  },

  // ---- Day 5 audit (sources above, by READ_D5) ----
  {
    id: "ny-hudson-troy-catskill-perch",
    countryCode: "US",
    admin1: ["NY", "New York"],
    near: ALBANY,
    rivers: ["Hudson"],
    water: ["rivers"],
    species: ["yellow-perch"],
    fish: "Yellow perch, rock bass, blueback herring and alewife",
    waters: HUDSON_WATERS,
    advice: "People who may become pregnant (under 50) and children under 15: do not eat. Everyone else: up to one meal a month",
    contaminant: "PCBs",
    agency: NY_HUDSON,
    source: NY_HUDSON_SRC,
    checked: READ_D5,
  },
  {
    id: "ny-hudson-troy-catskill-all-other",
    countryCode: "US",
    admin1: ["NY", "New York"],
    near: ALBANY,
    rivers: ["Hudson"],
    water: ["rivers"],
    species: ["walleye", "striped-bass", "smallmouth-bass", "largemouth-bass", "northern-pike", "channel-catfish", "common-carp", "black-crappie", "bluegill", "brown-trout", "rainbow-trout", "muskellunge"],
    fish: "All other fish, striped bass and walleye among them",
    waters: HUDSON_WATERS,
    advice: "Do not eat",
    contaminant: "PCBs",
    agency: NY_HUDSON,
    source: NY_HUDSON_SRC,
    checked: READ_D5,
  },
  {
    id: "or-lower-willamette-crappie",
    countryCode: "US",
    admin1: ["OR", "Oregon"],
    near: PORTLAND_OR,
    rivers: ["Willamette"],
    water: ["rivers"],
    species: ["black-crappie"],
    fish: "Black crappie",
    waters: LW_WATERS,
    advice: "No more than two meals a month (four if you eat the fillet only)",
    contaminant: "PCBs and mercury",
    agency: OR_LW,
    source: OR_LW_SRC,
    checked: READ_D5,
  },
  {
    id: "or-lower-willamette-resident-fish",
    countryCode: "US",
    admin1: ["OR", "Oregon"],
    near: PORTLAND_OR,
    rivers: ["Willamette"],
    water: ["rivers"],
    species: ["smallmouth-bass", "largemouth-bass", "common-carp", "walleye", "channel-catfish", "yellow-perch", "bluegill"],
    fish: "Bass, brown bullhead, carp, walleye and other resident fish (not salmon, steelhead, shad or trout, which migrate)",
    waters: LW_WATERS,
    advice: "Do not eat",
    contaminant: "PCBs and mercury",
    agency: OR_LW,
    source: OR_LW_SRC,
    checked: READ_D5,
  },
  {
    id: "wa-spokane-river-upriver-dam-idaho",
    countryCode: "US",
    admin1: ["WA", "Washington"],
    near: SPOKANE,
    water: ["rivers"],
    species: ["*"],
    fish: "All fish",
    waters: "the Spokane River from Upriver Dam up to the Idaho border",
    advice: "Do not eat: catch and release only",
    contaminant: "PCBs and PBDEs",
    agency: WA_DOH,
    source: WA_SPOKANE_SRC,
    checked: READ_D5,
  },
  {
    id: "wa-spokane-river-nine-mile-upriver",
    countryCode: "US",
    admin1: ["WA", "Washington"],
    near: SPOKANE,
    water: ["rivers"],
    species: ["*"],
    fish: "All fish except largescale sucker, which should not be eaten",
    waters: "the Spokane River from Nine Mile Dam up to Upriver Dam, through the city",
    advice: "No more than one meal a month",
    contaminant: "PCBs and PBDEs",
    agency: WA_DOH,
    source: WA_SPOKANE_SRC,
    checked: READ_D5,
  },
  {
    id: "wa-statewide-bass-sensitive",
    countryCode: "US",
    admin1: ["WA", "Washington"],
    species: ["largemouth-bass", "smallmouth-bass"],
    fish: "Largemouth and smallmouth bass",
    waters: "every water in Washington",
    advice: "No more than two meals a month",
    who: "children, and women who are or may become pregnant or are nursing",
    contaminant: "mercury",
    agency: WA_DOH,
    source: "https://doh.wa.gov/community-and-environment/food/fish/advisories",
    checked: READ_D5,
  },
  {
    id: "wa-lower-duwamish",
    countryCode: "US",
    admin1: ["WA", "Washington"],
    near: SEATTLE,
    // The Lower Duwamish is the tidal waterway that empties into Elliott Bay: Seattle's harbour shore is on the sea cards, and its river cards
    // may hold no named waters, so the advice goes with both.
    water: ["rivers", "estuary", "sea"],
    species: [],
    fish: "Bottom-feeding fish, crab and shellfish",
    waters: "the Lower Duwamish River",
    advice: "Do not eat. Salmon is the safer choice (see the Chinook line)",
    agency: WA_DOH,
    source: WA_DUWAMISH_SRC,
    checked: READ_D5,
  },
  {
    id: "wa-lower-duwamish-chinook",
    countryCode: "US",
    admin1: ["WA", "Washington"],
    near: SEATTLE,
    // The Lower Duwamish is the tidal waterway that empties into Elliott Bay: Seattle's harbour shore is on the sea cards, and its river cards
    // may hold no named waters, so the advice goes with both.
    water: ["rivers", "estuary", "sea"],
    species: ["chinook-salmon"],
    fish: "Chinook (king) salmon",
    waters: "the Lower Duwamish River",
    advice: "No more than four meals a month; blackmouth (young Chinook caught in winter) no more than two",
    agency: WA_DOH,
    source: WA_DUWAMISH_SRC,
    checked: READ_D5,
  },
  {
    id: "wa-lake-washington-carp",
    countryCode: "US",
    admin1: ["WA", "Washington"],
    near: SEATTLE,
    water: ["lakes"],
    species: ["common-carp"],
    fish: "Carp and northern pikeminnow",
    waters: "Lake Washington",
    advice: "Do not eat",
    contaminant: "chemical pollution",
    agency: WA_DOH,
    source: WA_LAKE_WA_SRC,
    checked: READ_D5,
  },
  {
    id: "wa-lake-washington-perch",
    countryCode: "US",
    admin1: ["WA", "Washington"],
    near: SEATTLE,
    water: ["lakes"],
    species: ["yellow-perch"],
    fish: "Yellow perch",
    waters: "Lake Washington",
    advice: "No more than one meal a week",
    agency: WA_DOH,
    source: WA_LAKE_WA_SRC,
    checked: READ_D5,
  },
  {
    id: "wi-yahara-pfas-do-not-eat",
    countryCode: "US",
    admin1: ["WI", "Wisconsin"],
    near: MADISON,
    water: ["rivers", "lakes"],
    species: ["black-crappie", "largemouth-bass", "northern-pike", "walleye", "yellow-perch"],
    fish: "Black crappie, largemouth bass, northern pike, walleye, white bass and yellow perch, all sizes",
    waters: YAHARA_WATERS,
    advice: "Do not eat",
    contaminant: "PFAS",
    agency: WI_YAHARA,
    source: WI_YAHARA_SRC,
    checked: READ_D5,
  },
  {
    id: "wi-yahara-pfas-one-a-month",
    countryCode: "US",
    admin1: ["WI", "Wisconsin"],
    near: MADISON,
    water: ["rivers", "lakes"],
    species: ["bluegill"],
    fish: "Bluegill, pumpkinseed, freshwater drum and yellow bass, all sizes",
    waters: YAHARA_WATERS,
    advice: "No more than one serving a month",
    contaminant: "PFAS",
    agency: WI_YAHARA,
    source: WI_YAHARA_SRC,
    checked: READ_D5,
  },
  {
    id: "tx-adv-42-leon-creek",
    countryCode: "US",
    admin1: ["TX", "Texas"],
    near: SAN_ANTONIO,
    water: ["rivers"],
    species: ["*"],
    fish: "All fish",
    waters: "Leon Creek from the Old US Highway 90 bridge downstream (to the Loop 410 bridge in DSHS's 2010 notes; to Rodriguez Park in its 2024 review)",
    advice: "Do not eat",
    contaminant: "PCBs",
    agency: "Texas DSHS advisory ADV-42",
    source: TX_LEON_SRC,
    checked: READ_D5,
  },
  {
    id: "bc-r1-smallmouth-mercury-victoria",
    countryCode: "CA",
    admin1: ["BC", "British Columbia"],
    near: { lat: 48.4283, lon: -123.365, km: 30 },
    water: ["lakes"],
    species: ["smallmouth-bass"],
    fish: "Smallmouth bass, the larger ones most",
    waters: "lakes on Vancouver Island and the Gulf Islands",
    advice: "Limit how much you eat",
    who: "everyone, and especially children and women who are pregnant, breastfeeding or may become pregnant",
    contaminant: "mercury",
    agency: "BC Freshwater Fishing Regulations Synopsis 2025-27, Region 1",
    source: BC_R1_SRC,
    checked: READ_D5,
  },
  {
    id: "bc-r1-smallmouth-mercury-nanaimo",
    countryCode: "CA",
    admin1: ["BC", "British Columbia"],
    near: { lat: 49.1639, lon: -123.9381, km: 30 },
    water: ["lakes"],
    species: ["smallmouth-bass"],
    fish: "Smallmouth bass, the larger ones most",
    waters: "lakes on Vancouver Island and the Gulf Islands",
    advice: "Limit how much you eat",
    who: "everyone, and especially children and women who are pregnant, breastfeeding or may become pregnant",
    contaminant: "mercury",
    agency: "BC Freshwater Fishing Regulations Synopsis 2025-27, Region 1",
    source: BC_R1_SRC,
    checked: READ_D5,
  },
  {
    id: "nt-yellowknife-arsenic-lakes",
    countryCode: "CA",
    admin1: ["NT", "Northwest Territories"],
    near: YELLOWKNIFE,
    water: ["lakes"],
    species: ["*"],
    fish: "All fish",
    waters: "Kam, Frame, Niven, Rat, Jackfish, Fox, Handle, Gar, David, Peg and Meg lakes, and other lakes near Giant Mine with high arsenic (fish from Yellowknife Bay and Back Bay are considered safe)",
    advice: "Avoid fishing there and eating the fish",
    contaminant: "arsenic",
    agency: "Government of the Northwest Territories, Health and Social Services",
    source: NT_ARSENIC_SRC,
    checked: READ_D5,
  },
];
