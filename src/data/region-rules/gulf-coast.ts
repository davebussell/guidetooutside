/**
 * Rules read from the regulator's own pages for the ecoregion "Gulf Coast" (gulf-coast): Little Rock, Memphis, Houston, New Orleans and Brownsville.
 *
 * CLOSED: closed-season rows (same shape and standard as src/data/closed-seasons.ts: a regulator, the page it
 * was read from, the date it was read, dates written as the regulator gives them).
 * LAND: where-you-may-pick rules (same shape and standard as src/data/land-rules.ts: the regulator's wording,
 * kept inside the source, with the page and the date it was read).
 *
 * Read 11 November 2026 (Day 3 of the regional audit). Nothing here is inferred: a row exists only where the page
 * was opened and read.
 */
import type { ClosedSeason } from "../closed-seasons";
import type { LandPlace, LandRule } from "../land-rules";

/** Date every page below was opened and read. */
const CHECKED = "2026-11-11";

const LITTLE_ROCK = { lat: 34.7465, lon: -92.2896 };
const MEMPHIS = { lat: 35.146, lon: -90.0518 };
const HOUSTON = { lat: 29.7589, lon: -95.3677 };
const NEW_ORLEANS = { lat: 29.9561, lon: -90.0734 };
const BROWNSVILLE = { lat: 25.9024, lon: -97.4982 };

export const CLOSED: ClosedSeason[] = [
  // ======================= United States: Arkansas (Little Rock) ==================================================
  // source: Arkansas Game and Fish Commission, Code N1.01 Game Fish Daily Limits (no general date on the page), read 11 November
  //   2026 — statewide daily limits: "Black Basses 10 (including no more than 4 Smallmouth)", Crappie 30, "Catfish (except Bullhead)"
  //   10, Walleye 6, Sauger 6, White Bass 25, "Striped Bass or Hybrid (Combination)" 6, "Bream (over 4 inches length)" 50, Trout 5;
  //   Arkansas River: an additional 10 channel catfish; striped/hybrid combined 10 "on the Arkansas River and connecting lakes";
  //   "Alligator gar longer than 36 inches may not be harvested from noon May 1 – noon July 1 statewide." No other season given.
  //   https://apps.agfc.com/regulations/N1.01 (read at apps.agfc.com:443)
  // source: AGFC Code Book N1.02, Length and Protected Length Limits ("As of April 4, 2026") — "BLACK BASS: It is unlawful to
  //   possess black bass as follows:" "Largemouth bass less than 14 inches on the Arkansas River and its tributaries."
  //   https://apps.agfc.com/regulations/pdf/c238e8bc-d50f-4dd3-94eb-2fbb7c4018e1
  {
    id: "us-ar-little-rock-limits",
    countryCode: "US",
    admin1: ["AR", "Arkansas"],
    near: { ...LITTLE_ROCK, km: 30 },
    species: [],
    closed: [],
    note: "The Arkansas Game and Fish Commission's statewide limits table gives no season dates for bass, crappie, catfish, walleye, sauger, white bass, striped bass, bream or trout, so none are loaded. Statewide daily limits: 10 black bass (no more than 4 smallmouth), 30 crappie, 10 catfish, 6 walleye, 6 sauger, 25 white bass, 6 striped and hybrid bass combined, 50 bream over 4 inches and 5 trout. On the Arkansas River, 10 extra channel catfish may be kept, and striped and hybrid bass are limited to 10 combined on the river and connecting lakes. Largemouth bass under 14 inches may not be kept on the river or its tributaries. Alligator gar over 36 inches may not be kept anywhere in Arkansas from noon on 1 May to noon on 1 July.",
    regulator: "Arkansas Game and Fish Commission",
    source: "https://apps.agfc.com/regulations/N1.01",
    checked: CHECKED,
  },
  // source: AGFC Lake Maumelle fishing-map page (no date), read 11 November 2026 — owner "Central Arkansas Water"; "Boats must be at
  //   least 14 feet long."; "Fishing and boating are prohibited in the restricted zone near the dam."; swimming, bathing, wading
  //   prohibited; canoes and boats under 9 hp only west of the Arkansas Highway 10 bridge; "Commercial fishing and fishing by seine,
  //   net, trap, gig, jug line, yo-yo or set line are prohibited."; "Trotlines may be used only in the trotline permitted zone.";
  //   "Fishing from roads, bridges or docks is prohibited."; "Anglers may fish only from boats and designated bank fishing areas."
  //   No creel, size or season information. https://intranet.agfc.com/en/zone-map/fishing-map/650
  {
    id: "us-ar-lake-maumelle",
    countryCode: "US",
    admin1: ["AR", "Arkansas"],
    near: { ...LITTLE_ROCK, km: 35 },
    species: [],
    closed: [],
    water: ["lakes"],
    note: "Lake Maumelle, owned by Central Arkansas Water, has its own rules on the AGFC's lake page. Fish only from a boat at least 14 feet long or from designated bank-fishing areas, never from roads, bridges or docks. Fishing and boating are banned in the restricted zone near the dam, and swimming and wading are not allowed. Canoes and boats with motors under 9 hp may be used only west of the Highway 10 bridge. Trotlines are allowed only in the permitted zone and must carry the owner's details; nets, seines, traps, gigs, jug lines, yo-yos and set lines are banned. The page lists no special limits or seasons.",
    regulator: "Arkansas Game and Fish Commission",
    source: "https://intranet.agfc.com/en/zone-map/fishing-map/650",
    checked: CHECKED,
  },

  // ======================= United States: Tennessee (Memphis) =====================================================
  // source: TWRA, Fishing Regulation Exceptions (last modified 22 Oct 2026), read 11 November 2026 — Mississippi River "Includes
  //   adjacent sloughs, bayous, and all river runs and chutes that are accessible by boat from the river proper": "Black Bass: 10 per
  //   day, no length limit."; "Sunfish/Bream: 50 per day"; "Catfish: no creel limit, only one (1) fish over 34 inches in length may be
  //   harvested per day."; "Crappie: 50 per day"; "Striped Bass and Hybrid Striped Bass: Six (6) per day"; "Sauger: Six (6) per day";
  //   "White Bass: 30 per day, no length limit." No season or closure. https://www.tn.gov/content/tn/twra/fishing-regs/fishing-regulation-exceptions.html
  // source: TWRA, Statewide Regulations and Creel and Length Limits (last modified 22 Oct 2026) — Arkansas: "This state agrees to honor
  //   either license on the flowing waters of the Mississippi River", excluding WMAs and the Wolf, Loosahatchie, Hatchie, Forked Deer
  //   and Obion rivers; Arkansas creel, size, trotline and equipment rules on Ikes Chute, Hopefield Chute, Mosquito Lake, Mound City
  //   Lake, Island 40 Chute and Lake Neark.
  // source: AGFC H1.03 Reciprocal License Agreement on the Mississippi River (executed "January 16, 2007") — "the flowing waters of the
  //   Mississippi River, adjacent sloughs, bayous, and old river runs" reachable by boat; residents follow the laws of the state where
  //   fishing; "Hopefield Chute (Dacus Lake)" among the waters under Arkansas creel and size limits. https://apps.agfc.com/regulations/H1.03
  // source: AGFC N1.01 — Mississippi River area "between the main levees": crappie 50 daily; white bass 50 daily, 100 possession.
  {
    id: "us-tn-mississippi-memphis",
    countryCode: "US",
    admin1: ["TN", "Tennessee"],
    near: { ...MEMPHIS, km: 25 },
    species: [],
    closed: [],
    water: ["rivers"],
    note: "TWRA gives the Mississippi River, with its sloughs, bayous, runs and chutes reachable by boat, its own daily limits: 10 black bass, 50 sunfish, 50 crappie, 6 striped and hybrid bass, 6 sauger and 30 white bass, all with no length limit. There is no catfish limit, but only one over 34 inches may be kept a day. No season dates are given. Under the Tennessee–Arkansas agreement, a licence from either state is valid on the flowing river, but not on wildlife management areas or on the Wolf, Loosahatchie, Hatchie, Forked Deer or Obion rivers. Anglers follow the rules of the state they are in. Arkansas limits and gear rules apply to everyone on Hopefield Chute (Dacus Lake), Ikes Chute, Mosquito Lake, Mound City Lake, Island 40 Chute and Lake Neark. Arkansas's own table allows 50 crappie and 50 white bass a day between the main levees.",
    regulator: "Tennessee Wildlife Resources Agency",
    source: "https://www.tn.gov/content/tn/twra/fishing-regs/fishing-regulation-exceptions.html",
    checked: CHECKED,
  },
  // source: TWRA, Statewide Regulations and Creel and Length Limits (last modified 22 Oct 2026), read 11 November 2026 — black bass
  //   "No more than 5 black bass per day"; crappie 15, 10-inch minimum, Region 1: 30, no minimum "unless otherwise noted for specific
  //   waters"; redear 20; catfish "Only one (1) catfish over 34 inches may be harvested per day."; striped/hybrid 2, 15-inch; white bass 15;
  //   sauger 10, 15-inch; walleye 5, 16-inch; trout 7; muskellunge 1, 36-inch; "Paddlefish may be harvested from April 24 through May 31."
  //   No other season; the page does not say which counties are in Region 1. https://www.tn.gov/twra/fishing-regs/statewide-creel-length-limits.html
  // source: TWRA exceptions page (22 Oct 2026) — "Forked Deer, Hatchie, Loosahatchie, Obion, and Wolf Rivers (includes tributaries)":
  //   "Crappie: 30 per day, no length limit."; Meeman-Shelby Forest State Park (Poplar Tree Lake): "Largemouth Bass: 10 fish per day,
  //   18" maximum size limit. Only one (1) fish longer than 18" may be harvested."; bluegill/redear 20 combined; Cameron Brown Park Pond
  //   (Germantown, Community Fishing Program): "Rod & reel, hand lines, poles only"; catfish 5, bluegill/redear 20, black bass 1,
  //   crappie 30, trout 5 — one set of limits for all six Community Fishing Program waters, not for this pond alone. No closed
  //   seasons for these waters. The statewide page's "Season open year-round in all waters except:" sits under "Methods other
  //   Than Rod and Reel" (grabbling, gigging, snagging), so it is not an open season for rod and reel.
  // source: TWRA, West Tennessee Region 1 WMA page (modified 3 Sep 2026), checked 11 November 2026 — lists "Meeman-Shelby WMA";
  //   names no counties. https://www.tn.gov/twra/wildlife-management-areas/west-tennessee-r1.html
  {
    id: "us-tn-memphis-limits",
    countryCode: "US",
    admin1: ["TN", "Tennessee"],
    near: { ...MEMPHIS, km: 30 },
    species: [],
    closed: [],
    note: "TWRA's statewide limits page gives no season dates for game fish except paddlefish, which may be kept only from 24 April to 31 May, so no dates are loaded. Statewide daily limits: 5 black bass, no minimum length; 2 striped and hybrid bass, at least 15 inches; 15 white bass; 5 walleye, at least 16 inches; 10 sauger, at least 15 inches; 20 redear and no limit on bluegill; 7 trout. Only one catfish over 34 inches may be kept a day. Crappie are 15 a day, at least 10 inches, but the page gives a Region 1 exception of 30 a day with no minimum, and it does not say which counties Region 1 covers; TWRA's West Tennessee Region 1 page lists Meeman-Shelby WMA. On the Wolf, Loosahatchie and Hatchie rivers the crappie limit is 30, with no length limit. At Poplar Tree Lake in Meeman-Shelby Forest State Park the limit is 10 largemouth bass, with only one over 18 inches, and 20 bluegill and redear combined. Cameron Brown Park pond in Germantown is a Community Fishing Program water: rods, hand lines and poles only, and the program's daily limits of 5 catfish, 20 bluegill and redear, 1 black bass, 30 crappie and 5 trout.",
    regulator: "Tennessee Wildlife Resources Agency",
    source: "https://www.tn.gov/twra/fishing-regs/statewide-creel-length-limits.html",
    checked: CHECKED,
  },

  // ======================= United States: Texas, salt water (Houston) ============================================
  // source: TPWD Outdoor Annual, Drum Bag & Length Limits ("Valid Sep. 1, 2026 through Aug. 31, 2027."), read 11 November 2026 — red
  //   drum daily bag 3, min 20 in, max 28 in; "During a license year, one red drum over the stated maximum length limit may be retained"
  //   with a Red Drum Tag, and one with a Bonus Red Drum Tag, in addition to the daily bag; black drum 5, 14–30 in, one over 52 in; no
  //   season, closure or bay-system rule on the page; limits apply in Texas waters to 9 nautical miles.
  //   https://tpwd.texas.gov/regulations/outdoor-annual/fishing/saltwater-fishing/bag-length-limits/drum-bag-length-limits
  // source: TPWD, Seatrout Bag & Length Limits (valid 1 Sep 2026 – 31 Aug 2027) — daily bag 3, min 15 in, max 20 in; "one spotted
  //   seatrout over 28” may be retained" per licence year with a Spotted Seatrout Tag (and one with a Bonus tag); no season or area rule.
  //   https://tpwd.texas.gov/regulations/outdoor-annual/fishing/saltwater-fishing/bag-length-limits/seatrout-bag-length-limits/
  // source: TPWD, General Fishing Regulations (valid 2026-27) — "A saltwater endorsement is required to fish in coastal waters".
  {
    id: "us-tx-salt-houston",
    countryCode: "US",
    admin1: ["TX", "Texas"],
    near: { ...HOUSTON, km: 45 },
    species: [],
    closed: [],
    water: ["sea", "estuary"],
    note: "Texas Parks and Wildlife's saltwater limits for 1 September 2026 to 31 August 2027 give no season or closure for red drum or spotted seatrout, so no dates are loaded. The pages set no separate rules for Galveston Bay. Limits in Texas waters, out to 9 nautical miles:\n- Red drum: 3 a day, 20 to 28 inches. One fish over 28 inches may be kept each licence year with a Red Drum Tag, and one more with a Bonus Red Drum Tag; tagged fish do not count toward the daily limit.\n- Spotted seatrout: 3 a day, 15 to 20 inches. One fish over 28 inches may be kept each licence year with a Spotted Seatrout Tag, and one more with a Bonus tag.\nThe possession limit is twice the daily limit unless stated otherwise. You need a Texas fishing licence with a saltwater endorsement to fish coastal waters.",
    regulator: "Texas Parks and Wildlife Department",
    source: "https://tpwd.texas.gov/regulations/outdoor-annual/fishing/saltwater-fishing/bag-length-limits/drum-bag-length-limits",
    checked: CHECKED,
  },
  // source: TPWD, Flounder Bag & Length Limits (valid 1 Sep 2026 – 31 Aug 2027), read 11 November 2026 — all flounder species: "Daily
  //   bag is 5 fish except Nov 1 - Dec 14 (fishery closed; bag limit = 0)."; min 15 in; "Possession limit = the daily bag."
  //   Flounder is not in the site's fish library: note only.
  //   https://tpwd.texas.gov/regulations/outdoor-annual/fishing/saltwater-fishing/bag-length-limits/flounder-bag-length-limits
  {
    id: "us-tx-salt-flounder-houston",
    countryCode: "US",
    admin1: ["TX", "Texas"],
    near: { ...HOUSTON, km: 45 },
    species: [],
    closed: [],
    water: ["sea", "estuary"],
    note: "Flounder are not in this site's fish library. Texas Parks and Wildlife closes the flounder fishery from 1 November to 14 December, when the daily limit is 0. The rest of the year the limit is 5 a day, at least 15 inches long, and the possession limit is the same as the daily limit.",
    regulator: "Texas Parks and Wildlife Department",
    source: "https://tpwd.texas.gov/regulations/outdoor-annual/fishing/saltwater-fishing/bag-length-limits/flounder-bag-length-limits",
    checked: CHECKED,
  },
  // source: TPWD, Fish Consumption Bans and Advisories (issued by Texas DSHS; page last modified 23 January 2025), read 11 November 2026 —
  //   Houston Ship Channel and contiguous waters north of the Fred Hartman Bridge, including the San Jacinto River below the Lake Houston
  //   dam: "Persons should not consume blue crabs or any species of fish from these waters."; Clear Creek above Clear Lake: no fish;
  //   Upper Galveston Bay: adults one 8-ounce meal a month of catfish, spotted seatrout, blue crab, none for children under 12 and women of
  //   childbearing age; Galveston Bay incl. Trinity, West, East and Chocolate bays: catfish, same advice; Lake Isabell (Harris County):
  //   largemouth bass, two 8-ounce servings a month for adults. None of these is a possession ban.
  //   https://tpwd.texas.gov/regulations/outdoor-annual/fishing/general-rules-regulations/fish-consumption-bans-and-advisories
  {
    id: "us-tx-advisories-houston",
    countryCode: "US",
    admin1: ["TX", "Texas"],
    near: { ...HOUSTON, km: 45 },
    species: [],
    closed: [],
    note: "Texas health advisories, printed by Texas Parks and Wildlife, say not to eat any fish or blue crabs from the Houston Ship Channel and connected waters north of the Fred Hartman Bridge, including the San Jacinto River below the Lake Houston dam, or any fish from Clear Creek above Clear Lake. In Upper Galveston Bay, adults should eat no more than one 8-ounce meal a month of catfish, spotted seatrout or blue crab, and children under 12 and women who may become pregnant should eat none. The same catfish advice covers the rest of Galveston Bay, including Trinity, West and East bays. In Lake Isabell (Harris County), adults should eat no more than two 8-ounce meals of largemouth bass a month. These are advisories, not bans on keeping fish.",
    regulator: "Texas Parks and Wildlife Department (Texas DSHS advisories)",
    source: "https://tpwd.texas.gov/regulations/outdoor-annual/fishing/general-rules-regulations/fish-consumption-bans-and-advisories",
    checked: CHECKED,
  },

  // ======================= United States: Texas, salt water and the Rio Grande (Brownsville) =====================
  // source: TPWD drum and seatrout pages as above (valid 1 Sep 2026 – 31 Aug 2027).
  // source: TPWD, Snook Bag & Length Limits (valid 1 Sep 2026 – 31 Aug 2027) — daily bag 1, min 24 in, max 28 in; no season.
  //   https://tpwd.texas.gov/regulations/outdoor-annual/fishing/saltwater-fishing/bag-length-limits/snook-bag-length-limits
  // source: TPWD, Tarpon Bag & Length Limits (same validity) — daily bag 1, "Min Length: 85 inches"; no season; the page as read names no tag.
  //   https://tpwd.texas.gov/regulations/outdoor-annual/fishing/saltwater-fishing/bag-length-limits/tarpon-bag-length-limits
  // source: TPWD, Saltwater Freeze Events (last modified 16 Aug 2024) — TPWD "may close one or more of the sites listed below for saltwater
  //   fishing until the threat from the freeze event is over"; sites include Port Isabel, San Martin Lake, Gayman Channel/Bahia Grande,
  //   Brazos Santiago Pass South Jetty; closures posted online and given to news media.
  //   https://tpwd.texas.gov/regulations/outdoor-annual/fishing/saltwater-fishing/saltwater-freeze-events
  {
    id: "us-tx-salt-brownsville",
    countryCode: "US",
    admin1: ["TX", "Texas"],
    near: { ...BROWNSVILLE, km: 45 },
    species: [],
    closed: [],
    water: ["sea", "estuary"],
    note: "Texas Parks and Wildlife's saltwater limits for 1 September 2026 to 31 August 2027 give no season or closure for red drum, spotted seatrout, snook or tarpon, so no dates are loaded. The pages set no separate rules for the Lower Laguna Madre. Limits:\n- Red drum: 3 a day, 20 to 28 inches. One fish over 28 inches may be kept each licence year with a Red Drum Tag, and one more with a Bonus tag.\n- Spotted seatrout: 3 a day, 15 to 20 inches. One fish over 28 inches may be kept each licence year with a Spotted Seatrout Tag, and one more with a Bonus tag.\n- Snook: 1 a day, 24 to 28 inches.\n- Tarpon: 1 a day, at least 85 inches.\nDuring a freeze, Texas Parks and Wildlife may close listed sites to saltwater fishing until the danger has passed. The sites include Port Isabel, San Martin Lake, Gayman Channel and Bahia Grande, and the Brazos Santiago Pass South Jetty. You need a Texas fishing licence with a saltwater endorsement to fish coastal waters.",
    regulator: "Texas Parks and Wildlife Department",
    source: "https://tpwd.texas.gov/regulations/outdoor-annual/fishing/saltwater-fishing/bag-length-limits/snook-bag-length-limits",
    checked: CHECKED,
  },
  // source: TPWD Flounder Bag & Length Limits, as for Houston.
  {
    id: "us-tx-salt-flounder-brownsville",
    countryCode: "US",
    admin1: ["TX", "Texas"],
    near: { ...BROWNSVILLE, km: 45 },
    species: [],
    closed: [],
    water: ["sea", "estuary"],
    note: "Flounder are not in this site's fish library. Texas Parks and Wildlife closes the flounder fishery from 1 November to 14 December, when the daily limit is 0. The rest of the year the limit is 5 a day, at least 15 inches long, and the possession limit is the same as the daily limit.",
    regulator: "Texas Parks and Wildlife Department",
    source: "https://tpwd.texas.gov/regulations/outdoor-annual/fishing/saltwater-fishing/bag-length-limits/flounder-bag-length-limits",
    checked: CHECKED,
  },
  // source: TPWD, Requirements for Federal, State & Border Waters (last modified 27 Jan 2023), read 11 November 2026 — Mexico (Tamaulipas,
  //   Nuevo León, Coahuila, Chihuahua): "A recreational fishing license or Permiso de Pesca Deportiva" is "required to fish in Mexican
  //   waters"; general Border Waters section: "All fish landed in Texas must comply with Texas bag and length limits." "No exceptions."
  //   The page does not name the Rio Grande, so the note does not either.
  //   https://tpwd.texas.gov/regulations/outdoor-annual/licenses/fishing-licenses-stamps-tags-packages/requirements-for-federal-state-border-waters
  // source: TPWD, Freshwater/Saltwater Boundaries (last modified 6 Aug 2024) — "All public waters east and south of the following boundary
  //   are considered salt water:" "beginning at the International Toll Bridge in Brownsville, northward along U.S. Hwy. 77"; not salt
  //   water: "Fort Brown Resaca, Resaca de la Guerra, Resaca de la Palma, Resaca de los Cuates, Resaca de los Fresnos," "Resaca Rancho
  //   Viejo and Town Resaca in Cameron County". TPWD freshwater exceptions page (valid 2026-27): no Cameron County, Rio Grande or resaca
  //   entry; "On fresh waters not listed here, statewide limits apply."
  {
    id: "us-tx-rio-grande-brownsville",
    countryCode: "US",
    admin1: ["TX", "Texas"],
    near: { ...BROWNSVILLE, km: 25 },
    species: [],
    closed: [],
    water: ["rivers", "lakes", "estuary"],
    note: "For the Mexican side of the border, Texas Parks and Wildlife says a Mexican sport-fishing permit (Permiso de Pesca Deportiva) is needed to fish in Mexican waters, and that every fish landed in Texas must meet Texas limits, with no exceptions. Its freshwater–saltwater boundary starts at the International Toll Bridge in Brownsville and runs north along U.S. Highway 77; waters east and south of that line are salt water. Brownsville's resacas, including Resaca de la Palma, Resaca de la Guerra and Fort Brown Resaca, are listed as fresh water. TPWD lists no special rules for them, so the statewide freshwater limits apply.",
    regulator: "Texas Parks and Wildlife Department",
    source: "https://tpwd.texas.gov/regulations/outdoor-annual/licenses/fishing-licenses-stamps-tags-packages/requirements-for-federal-state-border-waters",
    checked: CHECKED,
  },

  // ======================= United States: Louisiana (New Orleans) ================================================
  // source: LDWF, Saltwater Seasons & Limits (no page date), read 11 November 2026 — Red Drum "18 inches minimum total length", "27 inches
  //   maximum total length", "Four per person per day", "None over 27-inch maximum total length", "Open year-round in state waters";
  //   captain and crew on for-hire trips may not keep red drum; "Take or possession of Red Drum in federal waters is prohibited."; Spotted
  //   Seatrout "13” min total length", "20” max total length", "15 daily per person with no more than 2 over 20” max total length", "Open
  //   year-round in state waters"; Striped Mullet "100 pounds per person per day", open year-round in state waters; Black Drum 5, 16–27 in,
  //   one over 27 in, open year-round; two days' limit on land, one day's limit on the water; anglers 18 and over need a Basic Fishing License
  //   and a Saltwater Fishing License. https://wlf.louisiana.gov/fishing/saltwater-seasons-limits
  // source: LDWF, 2026 Louisiana Recreational Fishing Regulations ("UPDATED SEPTEMBER 21, 2026") — same red drum and seatrout limits; saltwater
  //   area includes "the saltwater lakes known as Lake Maurepas, Lake Pontchartrain, Lake St. Catherine"; saltwater line runs along "the
  //   Intracoastal Waterway to the Rigolets in Orleans Parish" and "the Mississippi River to the Industrial Canal".
  //   https://www.wlf.louisiana.gov/assets/Resources/Publications/Regulations/26LAFW.pdf
  //   Striped mullet is Mugil cephalus, the library's flathead-grey-mullet.
  {
    id: "us-la-salt-new-orleans",
    countryCode: "US",
    admin1: ["LA", "Louisiana"],
    near: { ...NEW_ORLEANS, km: 40 },
    species: ["redfish", "speckled-trout", "flathead-grey-mullet"],
    closed: [],
    water: ["sea", "estuary"],
    note: "Louisiana Wildlife and Fisheries lists red drum, spotted seatrout and striped mullet as open year-round in Louisiana's state waters. Its 2026 regulations count Lake Pontchartrain as one of the state's saltwater lakes. Limits:\n- Red drum: 4 a day, 18 to 27 inches, none over 27 inches. Captains and crew on a for-hire trip may not keep any, and none may be taken or kept in federal waters.\n- Spotted seatrout: 15 a day, 13 to 20 inches, with no more than 2 over 20 inches. Captains and crew of a chartered boat may not keep any.\n- Striped mullet: 100 pounds per person a day.\nYou may hold two days' limits of red drum or seatrout on land, but only one day's limit while fishing or on the water. Anglers 18 and older need a Basic Fishing License and a Saltwater Fishing License.",
    regulator: "Louisiana Department of Wildlife and Fisheries",
    source: "https://wlf.louisiana.gov/fishing/saltwater-seasons-limits",
    checked: CHECKED,
  },
  // source: LDWF Saltwater Seasons & Limits — Southern Flounder: size "None", "10 per person per day", season "year-round in state waters,
  //   except October 15-November 30."; 2026 regulations pamphlet: "No Size Limit 10 daily per person", "No possession allowed from Oct. 15 -
  //   Nov. 30". Flounder is not in the site's fish library: note only.
  {
    id: "us-la-salt-flounder-new-orleans",
    countryCode: "US",
    admin1: ["LA", "Louisiana"],
    near: { ...NEW_ORLEANS, km: 40 },
    species: [],
    closed: [],
    water: ["sea", "estuary"],
    note: "Southern flounder are not in this site's fish library. Louisiana Wildlife and Fisheries gives them a year-round season in state waters except 15 October to 30 November, and its 2026 regulations say none may be kept in those weeks. The rest of the year the limit is 10 a day, with no size limit.",
    regulator: "Louisiana Department of Wildlife and Fisheries",
    source: "https://wlf.louisiana.gov/fishing/saltwater-seasons-limits",
    checked: CHECKED,
  },
  // source: LDWF, Freshwater Creel & Size Limits (no page date), read 11 November 2026 — black bass "All state waters except the below", no
  //   size limit, "10 per day"; crappie "50 per day; 100 fish possession limit"; sunfish no limit; catfish minimums blue 12 in, channel 11 in,
  //   flathead 14 in, "100 per day in aggregate"; striped and hybrid "Five per day, with no more than two over 30 inches total length"; white
  //   bass 50, yellow bass 50; exceptions for the Lower Atchafalaya Basin (effective 8/1/2026), Toledo Bend, Sabine River, Caddo Lake, Poverty
  //   Point Reservoir, Eagle Lake, Bussey Brake, D'Arbonne Lake, False River and Grand Bayou Reservoir; no
  //   closed season listed for finfish; "If you're age 18 or older, you must have a Basic Fishing License to fish recreationally in freshwater".
  //   https://wlf.louisiana.gov/fishing/freshwater-creel-size-limits
  {
    id: "us-la-freshwater-new-orleans",
    countryCode: "US",
    admin1: ["LA", "Louisiana"],
    near: { ...NEW_ORLEANS, km: 40 },
    species: [],
    closed: [],
    water: ["rivers", "lakes"],
    note: "Louisiana Wildlife and Fisheries' freshwater limits page lists no closed season for game fish, but it does not say they are open all year, so no dates are loaded. Statewide limits: 10 black bass a day with no size limit; 50 crappie a day (100 in possession); 100 catfish a day combined, with minimum lengths of 12 inches for blue, 11 for channel and 14 for flathead; 5 striped and hybrid bass a day, no more than 2 over 30 inches; 50 white bass and 50 yellow bass; no limit on bream. Anglers 18 and older need a Basic Fishing License for fresh water. The page sets separate limits for several named waters, among them the Lower Atchafalaya Basin, Toledo Bend, the Sabine River, Caddo Lake and False River.",
    regulator: "Louisiana Department of Wildlife and Fisheries",
    source: "https://wlf.louisiana.gov/fishing/freshwater-creel-size-limits",
    checked: CHECKED,
  },
  // source: USFWS, Bayou Sauvage Urban NWR, Facility Rules and Policies (no date), read 11 November 2026 (added by the checker) —
  //   Fishing: "Sport fishing and shell fishing are permitted year-round in accordance with state regulations" "inside the Hurricane
  //   Protection Levee" "and permitted only after 12 p.m. outside the levee during the state teal season and from November 1 – January
  //   31."; Prohibited Activities: "All commercial fin and shell fishing"; "The use of trotlines, limb lines, slat traps."
  //   No teal-season dates on the page. https://www.fws.gov/refuge/bayou-sauvage-urban/visit-us/rules-policies
  {
    id: "us-la-bayou-sauvage-fishing",
    countryCode: "US",
    admin1: ["LA", "Louisiana"],
    near: { ...NEW_ORLEANS, km: 35 },
    species: [],
    closed: [],
    note: "Bayou Sauvage Urban National Wildlife Refuge allows sport fishing and shellfishing year-round under state rules inside the hurricane protection levee. Outside the levee, fishing is allowed only after noon during the state teal season and from 1 November to 31 January. Commercial fishing, trotlines, limb lines and slat traps are banned on the refuge.",
    regulator: "U.S. Fish and Wildlife Service (Bayou Sauvage Urban NWR)",
    source: "https://www.fws.gov/refuge/bayou-sauvage-urban/visit-us/rules-policies",
    checked: CHECKED,
  },
];


// ============================================================================================================
// LAND: who says whether you may pick, read on the owner's own page (11 November 2026).
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
  // ---- Arkansas ----
  // AGFC Code 19.16 Removal of Objects Prohibited (approved 26 Oct 2023, effective 27 Oct 2023): "It is unlawful to remove any objects,
  //   including rocks, fruits, nuts, acorns, artifacts, plants, etc.," "from any Commission-controlled property, without permission from the
  //   Commission."; endangered plants need a Scientific Collection Permit; natural areas managed with the Arkansas Natural Heritage Commission
  //   need its permit; Maumelle River WMA "without a permit from Central Arkansas Water"; no personal-use exception. Penalty Class 1.
  {
    id: "gc-arkansas-agfc-land",
    applies: (p) => is(p, "AR", "Arkansas"),
    title: "Arkansas Game and Fish Commission land, including Maumelle River WMA",
    rule: "The Arkansas Game and Fish Commission's rule 19.16 makes it unlawful to remove any objects from land the Commission controls without its permission. The rule names fruits, nuts, acorns, plants and rocks among those objects. Removing endangered plants needs a Scientific Collection Permit. Natural areas managed with the Arkansas Natural Heritage Commission need that commission's permit, and on the Maumelle River WMA any removal needs a permit from Central Arkansas Water. The rule has no exception for picking to eat, and it does not name mushrooms.",
    source: { label: "Arkansas Game and Fish Commission: Code 19.16, Removal of Objects Prohibited (effective 27 October 2023)", url: "https://apps.agfc.com/regulations/19.16" },
    checked: CHECKED,
  },

  // ---- Tennessee ----
  // Tenn. Comp. R. & Regs. 0400-02-02-.18 (Cornell LII; subtitle 0400-02 "Division of State Parks and Division of Natural Areas", chapter
  //   0400-02-02 "Public Use and Recreation"; amended effective 12 September 2010): (1) "intentional or wanton destruction, defacement, or
  //   removal of any natural or cultural feature" prohibited unless permitted under .23; (3) "Gathering or collecting for personal use
  //   reasonable quantities of natural products of a renewable nature", "including but not limited to" fruits, berries and driftwood, is
  //   allowed, commercial gathering prohibited; (5) "destroying, digging, cutting, removing, or possession of any tree, shrub, or other plant
  //   is prohibited" without a permit from the Assistant Commissioner of Parks and Recreation. TWRA's exceptions page names "Meeman-Shelby
  //   Forest State Park".
  {
    id: "gc-tennessee-state-parks",
    applies: (p) => is(p, "TN", "Tennessee"),
    title: "Tennessee state parks and state natural areas, including Meeman-Shelby Forest State Park",
    rule: "Tennessee's public-use rule for state parks and natural areas (0400-02-02-.18) allows visitors to gather reasonable quantities of renewable natural products, such as fruits and berries, for personal use. Gathering them to sell is prohibited. Destroying, digging, cutting, removing or possessing any tree, shrub or other plant needs a permit from the Assistant Commissioner of Parks and Recreation. Removing natural features is barred without a scientific collecting permit. The rule does not name nuts or mushrooms.",
    source: { label: "Tenn. Comp. R. & Regs. 0400-02-02-.18 (amended effective 12 September 2010)", url: "https://www.law.cornell.edu/regulations/tennessee/Tenn-Comp-R-Regs-0400-02-02-.18" },
    checked: CHECKED,
  },

  // ---- Texas (Houston) ----
  // City of Houston, Park Safety and Park Rules (no date): "Plants and animals are protected - do not remove or molest" (no section cited
  //   for this line); the page separately lists Code of Ordinances Chapter 32, Article I, Section 32-6 "Trees, shrubs and plants in public
  //   property", title only. Ordinance text not opened.
  {
    id: "gc-houston-city-parks",
    applies: (p) => is(p, "TX", "Texas") && within(p, HOUSTON, 30),
    title: "City of Houston parks",
    rule: "Houston Parks and Recreation's park rules say plants and animals in city parks are protected and must not be removed or disturbed. The page also lists the city's Code of Ordinances, Chapter 32, section 32-6, on trees, shrubs and plants on public property. It does not name fruit, nuts or mushrooms.",
    source: { label: "City of Houston: Park Safety and Park Rules", url: "https://www.houstontx.gov/parks/parkrules.html" },
    checked: CHECKED,
  },
  // Rules and Regulations for County Parks in Harris County, Texas (Commissioners Court, under Local Government Code ch. 320; effective
  //   1 September 2015, s. 33), s. 9 Plant Life: "No person shall willfully destroy or remove any tree, shrub, vine, wildflower, grass, fern,
  //   moss", leaves, cones, dead or downed wood or any other plant life, except with the Superintendent's consent or under the
  //   Superintendent's direct supervision.
  {
    id: "gc-harris-county-parks",
    applies: (p) => is(p, "TX", "Texas") && within(p, HOUSTON, 45),
    title: "Harris County parks",
    rule: "Harris County's rules for county parks (effective 1 September 2015, section 9) say no one may willfully destroy or remove any tree, shrub, vine, wildflower, grass, fern or moss, or leaves, cones, dead or downed wood or any other plant life, from a park. The only exception is when the Superintendent consents or directly supervises. The rule does not name fruit, nuts or mushrooms.",
    source: { label: "Harris County: Rules and Regulations for County Parks (section 9)", url: "https://www2.harriscountytx.gov/docs/parkregulations.pdf" },
    checked: CHECKED,
  },

  // ---- Texas (Brownsville) ----
  // USFWS, Laguna Atascosa NWR, Facility Rules and Policies (no date): "Disturbing or collecting plants, animals and artifacts is strictly
  //   prohibited."; "The refuge has a no-take policy." 50 CFR 27.51 (eCFR, read 11 Nov 2026, showed "up to date as of 6/10/2026"): disturbing, injuring, destroying or
  //   collecting any plant or animal on a refuge "is prohibited except by special permit unless otherwise permitted under this subchapter C."
  {
    id: "gc-laguna-atascosa-nwr",
    applies: (p) => is(p, "TX", "Texas") && within(p, BROWNSVILLE, 45),
    title: "Laguna Atascosa National Wildlife Refuge (U.S. Fish and Wildlife Service)",
    rule: "The refuge's rules page says disturbing or collecting plants, animals or artifacts is strictly prohibited, and that the refuge has a no-take policy. The federal refuge rule (50 CFR 27.51) bans disturbing, injuring, destroying or collecting any plant on a national wildlife refuge without a special permit, unless another refuge rule allows it.",
    source: { label: "U.S. Fish and Wildlife Service: Laguna Atascosa NWR, Rules and Policies; with 50 CFR 27.51", url: "https://www.fws.gov/refuge/laguna-atascosa/visit-us/rules-policies" },
    checked: CHECKED,
  },
  // NPS, Palo Alto Battlefield NHP Superintendent's Compendium (signature "January, 7, 2026"; page last updated 16 January 2026): 36 CFR
  //   2.1(a)(1)(ii) "Plants or the parts or products thereof"; 2.1(b) Palo Alto: "public use shall be confined to the Visitor Center, picnic
  //   area, and designated trails"; Resaca de la Palma unit: Contact Station, restroom, picnic area and designated trails; 2.1(c)(1): "The
  //   collection of fruits, berries, and or any plant material is prohibited."
  {
    id: "gc-palo-alto-battlefield",
    applies: (p) => is(p, "TX", "Texas") && within(p, BROWNSVILLE, 20),
    title: "Palo Alto Battlefield National Historical Park and its Resaca de la Palma unit (National Park Service)",
    rule: "The park's compendium (signed January 2026) prohibits collecting fruits, berries or any plant material. Visitors must keep to the visitor center, picnic area and designated trails at Palo Alto, and to the contact station, restrooms, picnic area and designated trails at the Resaca de la Palma unit. The federal park rule it reprints (36 CFR 2.1) bans removing plants or any part of them.",
    source: { label: "NPS: Palo Alto Battlefield NHP Superintendent's Compendium (January 2026), 36 CFR 2.1", url: "https://www.nps.gov/paal/learn/management/superintendent-compendium.htm" },
    checked: CHECKED,
  },

  // ---- Louisiana (New Orleans) ----
  // NPS, Jean Lafitte NHP&P Superintendent's Compendium ("Updated: June 25, 2026"; approved by the Superintendent): 2.1(c)(1) "Only the
  //   natural items listed may be gathered."; "Up to one (1) gallon per person" per day: dewberries and blackberries, muscadine and other
  //   wild grapes, elderberries, mulberries, pecans, pomegranates; "Up to one (1) quart per person" per day: "edible mushrooms, thistles,
  //   maypops", persimmons, wild onions; 2.5(a) a permit is required for collecting any natural resource. No unit is named in 2.1(c);
  //   the compendium's provisions "apply to all lands and waters administered by the National Park Service within the boundaries of"
  //   the park (so Barataria Preserve and Chalmette Battlefield included).
  {
    id: "gc-jean-lafitte",
    applies: (p) => is(p, "LA", "Louisiana") && within(p, NEW_ORLEANS, 35),
    title: "Jean Lafitte National Historical Park and Preserve (National Park Service)",
    rule: "The park's compendium (updated 25 June 2026) allows only the items it lists to be gathered, for personal use and to eat. Each person may take up to one gallon a day of dewberries and blackberries, muscadines and other wild grapes, elderberries, mulberries, pecans and pomegranates. Each person may also take up to one quart a day of edible mushrooms, thistles, maypops, persimmons and wild onions. Nothing else may be gathered, and collecting other natural resources needs a permit.",
    source: { label: "NPS: Jean Lafitte NHP and Preserve Superintendent's Compendium (updated 25 June 2026), 36 CFR 2.1(c)", url: "https://www.nps.gov/jela/learn/management/superintendents-compendium.htm" },
    checked: CHECKED,
  },
  // LAC 25:IX.303 Park Property and Environment (Office of State Parks, Title 25 Part IX, March 2025 edition on lastateparks.com; Justia copy
  //   "Current through Register Vol. 51, No. 06, Jun 20, 2025"), B: "No person shall intentionally remove, damage, disturb, or destroy any OSP
  //   property"; "Property" includes "natural features, cultural features wildlife, plants"; C: no timber cutting without written permission;
  //   no personal-use exception in the text read.
  {
    id: "gc-louisiana-state-parks",
    applies: (p) => is(p, "LA", "Louisiana"),
    title: "Louisiana state parks and historic sites (Office of State Parks)",
    rule: "Louisiana's Office of State Parks rule (LAC 25:IX.303) says no one may intentionally remove, damage, disturb or destroy park property, and it defines that property to include natural features, wildlife and plants. No timber may be cut without written permission. The rule names no exception for picking fruit, nuts or mushrooms.",
    source: { label: "Louisiana Office of State Parks: LAC Title 25, Part IX, section 303 (March 2025 edition)", url: "https://www.lastateparks.com/sites/default/files/2025-07/Office%20of%20State%20Parks%20Title%2025%20Revised%20March%202025.pdf" },
    checked: CHECKED,
  },
  // New Orleans City Park, Park Rules & Policies (published 24 Sept 2022, last modified 24 Aug 2026): "Visitors are prohibited from picking,
  //   damaging, removing or defacing any flowers, plants, grass, trees" and shrubbery; "Trees, plants and fauna shall not be introduced or
  //   disturbed"; visitors "are subject to the laws of the United States, State of Louisiana, and City of New Orleans Code of Ordinances".
  {
    id: "gc-new-orleans-city-park",
    applies: (p) => is(p, "LA", "Louisiana") && within(p, NEW_ORLEANS, 10),
    title: "New Orleans City Park",
    rule: "City Park's rules forbid visitors to pick, damage, remove or deface any flowers, plants, grass, trees or shrubs, and say plants and animals must not be disturbed. The rules do not name fruit, nuts or mushrooms.",
    source: { label: "New Orleans City Park: Park Rules & Policies (updated 24 August 2026)", url: "https://neworleanscitypark.org/park-rules-policies/" },
    checked: CHECKED,
  },
  // USFWS, Bayou Sauvage Urban NWR, Facility Rules and Policies (no date), Prohibited Activities: "Cutting, removing, or damaging trees and
  //   other plant matter". 50 CFR 27.51 as above.
  {
    id: "gc-bayou-sauvage-nwr",
    applies: (p) => is(p, "LA", "Louisiana") && within(p, NEW_ORLEANS, 35),
    title: "Bayou Sauvage Urban National Wildlife Refuge (U.S. Fish and Wildlife Service)",
    rule: "The refuge's rules page lists cutting, removing or damaging trees and other plant matter among its prohibited activities. The federal refuge rule (50 CFR 27.51) bans disturbing, injuring, destroying or collecting any plant on a national wildlife refuge without a special permit, unless another refuge rule allows it.",
    source: { label: "U.S. Fish and Wildlife Service: Bayou Sauvage Urban NWR, Rules and Policies; with 50 CFR 27.51", url: "https://www.fws.gov/refuge/bayou-sauvage-urban/visit-us/rules-policies" },
    checked: CHECKED,
  },
];
