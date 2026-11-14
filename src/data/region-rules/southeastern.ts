/**
 * Rules read from the regulator's own pages for the ecoregion "Southeastern" (southeastern): Atlanta, Savannah, Charlotte, Raleigh and Jacksonville.
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

/** Date every page below was opened and read. */
const CHECKED = "2026-11-10";

const ATLANTA = { lat: 33.7545, lon: -84.3898 };
const SAVANNAH = { lat: 32.0790, lon: -81.0921 };
const CHARLOTTE = { lat: 35.2272, lon: -80.8431 };
const RALEIGH = { lat: 35.7804, lon: -78.6391 };
const JACKSONVILLE = { lat: 30.3262, lon: -81.6579 };

export const CLOSED: ClosedSeason[] = [
// ======================= United States: Georgia, fresh water (Atlanta, Savannah) =================================
// source: Georgia DNR Wildlife Resources Division, 2026 Georgia fishing regulations, "General Regulations" (online edition of
//   the guide on eregulations.com, "Last Updated: August 27, 2026"), read 10 November 2026 — "There is no closed season for
//   fishing in freshwater in Georgia except for the following:" (1) "the Chattahoochee River and its tributaries from the
//   Columbia Lock and Dam to the GA Hwy 91 bridge", the Flint River below the Albany dams to US Hwy 84 and Spring Creek to
//   GA Hwy 253 "are CLOSED to striped bass fishing and spear fishing from May 1 - October 31 each year"; (2) Lake Seminole: all
//   fishing in marked areas around five fish refuges "prohibited from May 1 - October 31 each year"; (3) Coosa River: lake
//   sturgeon "CLOSED"; (4) Noodling or grabbling "open March 1 - July 15 statewide in freshwater".
//   Striped/white/hybrid bass: "The minimum length is 27 inches on the Savannah River and its tributaries downstream of
//   J. Strom Thurmond Dam" "(2 fish limit)"; "The minimum length for all fish is 22 inches on the North Newport River, Medway River
//   including Mount Hope Creek, Little Ogeechee River, Ogeechee River; ..."; "Daily limits differ on certain waters shared by Georgia
//   and South Carolina." https://www.eregulations.com/georgia/fishing/general-regulations
// source: same guide, "Agreements with Bordering States" ("Last Updated: August 27, 2026"), re-read 10-11 November 2026 by the
//   checker — South Carolina: the Savannah River from its mouth to the Tugaloo/Seneca junction and its reservoirs; tributaries not
//   covered; either state's freshwater licence; "does not cover commercial fishing or saltwater sport fishing"; striped, hybrid and
//   white bass "Savannah River downstream of the Clarks Hill dam": 2, 27-inch minimum; no closed season listed.
//   https://www.eregulations.com/georgia/fishing/agreements-with-bordering-states
{
  id: "us-ga-fresh-atlanta",
  countryCode: "US",
  admin1: ["GA", "Georgia"],
  near: { lat: 33.7545, lon: -84.3898, km: 30 },
  species: ["largemouth-bass", "black-crappie", "bluegill", "channel-catfish", "striped-bass", "common-carp"],
  closed: [],
  water: ["rivers", "lakes"],
  note: "Georgia's 2026 fishing regulations say freshwater fishing in Georgia has no closed season except on the waters they list. Striped bass fishing and spear fishing are closed from 1 May to 31 October on parts of the Flint River and Spring Creek, and on the Chattahoochee from Columbia Lock and Dam down to the GA 91 bridge, in the far southwest of the state. All fishing is barred over the same months around five marked fish refuges on Lake Seminole, and lake sturgeon may not be taken from the Coosa River. None of these waters is at Atlanta. Catching fish by hand (noodling) is open only from 1 March to 15 July.",
  regulator: "Georgia DNR Wildlife Resources Division",
  source: "https://www.eregulations.com/georgia/fishing/general-regulations",
  checked: CHECKED,
},
{
  id: "us-ga-fresh-savannah",
  countryCode: "US",
  admin1: ["GA", "Georgia"],
  near: { lat: 32.0790, lon: -81.0921, km: 30 },
  species: ["largemouth-bass", "black-crappie", "bluegill", "channel-catfish", "striped-bass"],
  closed: [],
  water: ["rivers", "lakes"],
  note: "Georgia's 2026 fishing regulations say freshwater fishing in Georgia has no closed season except on the listed waters in the southwest of the state and the Coosa River. On the Savannah River and its tributaries below J. Strom Thurmond Dam, striped, white and hybrid bass must be at least 27 inches long, with a limit of 2. On the Ogeechee and Little Ogeechee rivers the minimum is 22 inches. Under Georgia's agreement with South Carolina, either state's freshwater licence covers the Savannah River itself (not its tributaries), and the agreement lists no closed season there; it does not cover saltwater fishing.",
  regulator: "Georgia DNR Wildlife Resources Division",
  source: "https://www.eregulations.com/georgia/fishing/general-regulations",
  checked: CHECKED,
},

// source: Georgia regulations, "Trout Fishing" (eregulations.com, "Last Updated: August 27, 2026"), read 10 November 2026 —
//   "All designated trout waters are now open year round."; Delayed Harvest: "Chattahoochee River from Sope Creek (off Columns
//   Drive) downstream to US Hwy 41 (Cobb Parkway)", single-hook artificial lures and all trout released Nov. 1 to May 14;
//   Artificial lures only: "Chattahoochee River from GA Hwy 20 to the boat ramp at the National Park Service Medlock Bridge Park";
//   restricted hours on "the Chattahoochee River from Buford Dam to Peachtree Creek" (30 minutes before sunrise to 30 minutes
//   after sunset). https://www.eregulations.com/georgia/fishing/trout-fishing
// source: National Park Service, Chattahoochee River NRA, "Fishing on the Chattahoochee" ("Last updated: April 15, 2021") —
//   "There is no closed trout season for the river."; "All anglers are required to possess a trout stamp even if they are
//   fishing for other species."; Delayed Harvest "from November 1 to May 14 annually". https://www.nps.gov/chat/planyourvisit/fishing.htm
{
  id: "us-ga-chattahoochee-trout-atlanta",
  countryCode: "US",
  admin1: ["GA", "Georgia"],
  near: { lat: 33.7545, lon: -84.3898, km: 30 },
  species: ["rainbow-trout", "brown-trout"],
  closed: [],
  water: ["rivers"],
  note: "Georgia's 2026 regulations say all designated trout waters are open all year, and the National Park Service says the Chattahoochee has no closed trout season. From Sope Creek (off Columns Drive) to US 41 (Cobb Parkway), Delayed Harvest rules run from 1 November to 14 May: single-hook artificial lures only, and every trout must be released at once. From Buford Dam to Peachtree Creek, fishing is allowed only from half an hour before sunrise to half an hour after sunset. The Park Service's fishing page (last updated in 2021) says anglers on the river need a trout stamp even when they fish for other species.",
  regulator: "Georgia DNR Wildlife Resources Division",
  source: "https://www.eregulations.com/georgia/fishing/trout-fishing",
  checked: CHECKED,
},

// ======================= United States: Georgia, salt water (Savannah) ===========================================
// source: Georgia DNR Coastal Resources Division, "Recreational finfish season, limits, and sizes" (no page date; notes a change
//   "Effective Jan. 1, 2027"), read 10 November 2026 — State Regulations (0-3 nautical miles offshore): Red Drum "Season: All
//   year", limit 5, 14" to 23" TL (from 1 January 2027: 3 fish, 15" to 24" TL; pole and line only); Spotted Seatrout "Season:
//   All year", 15, 14" TL; Striped Bass, Saltwater "Season: All year", 2, 22" TL, and Savannah River "Season: All year", 2,
//   27" TL; Tarpon "Season: All year", 1, 68" FL; Flounder "All year", 15, 12" TL; Bluefish "Season: May 1 - Feb. 28 annually",
//   15, 12" FL; Cobia "March 1 - Oct. 31". A Georgia fishing license and a free Saltwater Information Program (SIP) permit,
//   valid 365 days and renewed yearly, are required in Georgia's saltwater bodies. https://coastalgadnr.org/limits
// source: Coastal Resources Division news release, "Bluefish fishery to temporarily close in state waters during March, April",
//   11 February 2026 — the recreational fishery closes "for the months of March and April 2026"; "Possession of Bluefish during
//   the closure period will be prohibited"; it "will reopen in May"; Georgia kept its 15-fish bag limit by closing two months a
//   year, in line with Atlantic States Marine Fisheries Commission measures. https://coastalgadnr.org/News/BluefishClosure2026
// Scope (checker, 10-11 November 2026): these rules hold in all Georgia salt water, but the circle keeps them to Savannah's coast.
//   Without it they matched every Georgia place, and the rules footer (regulatorFor, which does not filter by water) named the
//   Coastal Resources Division at Atlanta. Savannah is the only Georgia town on the site with salt water; Tybee Island and
//   Wassaw and Ossabaw sounds lie inside 40 km.
{
  id: "us-ga-salt-open",
  countryCode: "US",
  admin1: ["GA", "Georgia"],
  near: { ...SAVANNAH, km: 40 },
  species: ["redfish", "speckled-trout", "striped-bass", "atlantic-tarpon"],
  closed: [],
  water: ["sea", "estuary"],
  note: "Georgia's Coastal Resources Division lists red drum, spotted seatrout, striped bass and tarpon as open all year in Georgia's state salt waters, which run 3 nautical miles offshore. Limits:\n- Red drum: 5 a day, 14 to 23 inches long, pole and line only. From 1 January 2027 this becomes 3 a day, 15 to 24 inches.\n- Spotted seatrout: 15 a day, 14 inches minimum.\n- Striped bass: 2 a day, 22 inches minimum, or 27 inches on the Savannah River.\n- Tarpon: 1, at least 68 inches to the fork of the tail.\nIn salt water you need a Georgia fishing licence and the free Saltwater Information Program (SIP) permit, which is renewed every year. Flounder (15 fish, 12 inches) and cobia (open 1 March to 31 October) are not in the site's library.",
  regulator: "Georgia DNR Coastal Resources Division",
  source: "https://coastalgadnr.org/limits",
  checked: CHECKED,
},
{
  id: "us-ga-salt-bluefish",
  countryCode: "US",
  admin1: ["GA", "Georgia"],
  near: { ...SAVANNAH, km: 40 },
  species: ["bluefish"],
  closed: [{ from: "03-01", to: "04-30" }],
  water: ["sea", "estuary"],
  note: "Georgia's Coastal Resources Division gives bluefish in state salt waters a season of 1 May to the end of February each year, so they are closed in March and April. Its February 2026 notice says no bluefish may be kept during the closure, and that the two closed months let Georgia keep its 15-fish daily limit. In season the limit is 15 a day, at least 12 inches to the fork of the tail.",
  regulator: "Georgia DNR Coastal Resources Division",
  source: "https://coastalgadnr.org/limits",
  checked: CHECKED,
},

// ======================= United States: North Carolina (Charlotte, Raleigh) =====================================
// The statewide Hatchery Supported trout row (us-nc-hatchery-trout) is in src/data/closed-seasons.ts and is not repeated.
// source: 15A NCAC 10C .0305, Largemouth Bass (NC Administrative Code as shown on Cornell LII; history to an amendment effective
//   1 August 2024), read 10 November 2026 — (c) "There is no closed season, except in waters identified in Paragraph (n) of this
//   Rule."; (n) no possession in Jean Guite Creek (Dare County) and the Martin Marietta Park ponds (Craven County); (g) a 14-inch
//   minimum size limit in Lake Raleigh and other named waters. Re-read by the checker on Cornell LII: the state's own copy (OAH,
//   reports.oah.state.nc.us) refuses automated readers (robots), and no WRC copy of .0305 was opened.
//   https://www.law.cornell.edu/regulations/north-carolina/15A-N-C-Admin-Code-10C-0305
// source: NC Wildlife Resources Commission regulations digest, "Warm Water Game Fish Regulations" (eregulations.com, "Last
//   Updated: July 13, 2026") — largemouth and smallmouth bass, all public waters: "14-inch minimum, except 2 may be less than 14
//   inches", "5, including only 2 less than 14 inches". https://www.eregulations.com/northcarolina/fishing/warm-water-game-fish-regulations
// Day 3 check (11 November 2026): .0305(c) re-read on Cornell LII (unchanged). 15A NCAC 10C .0316(h) (Cornell LII, amended effective
//   1 August 2024): "In designated Public Mountain Trout Waters the season for taking all species of fish is the same as the trout fishing
//   season", so largemouth in Hatchery Supported waters are closed from 1 March to the first Friday in April. Those waters cannot be picked
//   out by a region, so the row is kept off the Appalachian part of the state (Asheville), where us-nc-asheville-trout-waters
//   (region-rules/appalachian-hardwoods.ts) gives both rules in a note. https://www.law.cornell.edu/regulations/north-carolina/15A-N-C-Admin-Code-10C-0316
{
  id: "us-nc-largemouth",
  countryCode: "US",
  admin1: ["NC", "North Carolina"],
  regionSlug: ["southeastern"],
  species: ["largemouth-bass"],
  closed: [],
  water: ["rivers", "lakes"],
  note: "North Carolina's largemouth bass rule (15A NCAC 10C .0305) has no closed season. The only exceptions are Jean Guite Creek in Dare County and the Martin Marietta Park ponds in Craven County, where none may be kept. Separately, the mountain trout rule (.0316) makes the season for all fish in designated Public Mountain Trout Waters the same as the trout season. In most public waters the 2026 digest sets a limit of 5 a day, with a 14-inch minimum except that 2 may be shorter. The rule sets other limits on named waters, among them a straight 14-inch minimum on Lake Raleigh.",
  regulator: "NC Wildlife Resources Commission (15A NCAC 10C .0305)",
  source: "https://www.law.cornell.edu/regulations/north-carolina/15A-N-C-Admin-Code-10C-0305",
  checked: "2026-11-11",
},
// source: NC Wildlife Resources Commission, 15A NCAC 10C .0314 Striped Bass (WRC copy of the proposed temporary amendment; Codifier
//   received 5 December 2025), read 10 November 2026 — (c) "There is no closed season, except for waters identified in Paragraphs
//   (i) through (l)(m) of this Rule."; the paragraphs name the Tar-Pamlico and Neuse (i), "the Tar, Pungo, Neuse, Pungo and Cape
//   Fear rivers ... extending upstream to the first impoundment", "other inland fishing waters east of Interstate 95", the Martin
//   Marietta Park ponds (j), the Roanoke River Striped Bass Management Area, the northeastern sounds and rivers, and proclamation
//   authority. Cornell LII's copy of the rule in force has the same paragraph (c) ("Paragraphs (i) through (l)"). Neither text
//   names the Catawba River, Lake Norman, Mountain Island Lake or Lake Wylie. (a) "four fish in [th]e aggregate"; (b) general
//   minimum 20 inches. https://www.ncwildlife.gov/15a-ncac-10c-0314-striped-bass/download
//   Checker, 10-11 November 2026: re-read the WRC copy and Cornell LII's copy (amended effective 1 August 2024); the WRC proposed-rule
//   page (comment period ended 31 January 2026) proposes the April season on the Tar-Pamlico and Neuse, and the WRC striped bass page
//   says the Commission approved it for 2026.
// source: NC digest, Warm Water Game Fish Regulations (updated 13 July 2026) — striped bass and Bodie bass, inland impoundments and
//   tributaries (general): "20-inch minimum", "4 in combination"; no row for Lake Norman, Mountain Island Lake, Lake Wylie or the
//   Catawba River. https://www.eregulations.com/northcarolina/fishing/warm-water-game-fish-regulations
{
  id: "us-nc-striped-bass-charlotte",
  countryCode: "US",
  admin1: ["NC", "North Carolina"],
  near: { ...CHARLOTTE, km: 40 },
  species: ["striped-bass"],
  closed: [],
  water: ["rivers", "lakes"],
  note: "North Carolina's striped bass rule (15A NCAC 10C .0314) has no closed season except on the waters it names: the Tar, Pungo, Neuse and Cape Fear rivers up to their first impoundments, other inland waters east of Interstate 95, the Roanoke River and the northeastern sounds. The Catawba River and its lakes at Charlotte (Lake Norman, Mountain Island Lake and Lake Wylie) are not among them. In North Carolina's waters there, the rule's general limits apply: 4 striped bass and hybrids (Bodie bass) combined, at least 20 inches long. Lake Wylie is shared with South Carolina, whose rules were not read.",
  regulator: "NC Wildlife Resources Commission (15A NCAC 10C .0314)",
  source: "https://www.ncwildlife.gov/15a-ncac-10c-0314-striped-bass/download",
  checked: CHECKED,
},
// source: NC Wildlife Resources Commission proclamation, harvest of striped bass (dated 03/19/2026; consistent with NC Division of
//   Marine Fisheries proclamation FF-19-2026), read 10 November 2026 — "From 12:00 AM on Wednesday, April 1, 2026, through 11:59 PM
//   on Thursday, April 30, 2026"; Neuse River and tributaries "upstream of a line shore to shore" from Cooper Point (35.035722 N,
//   76.933275 W) to Fisher Landing Point (35.002583 N, 76.97623 W); 18-inch minimum, "no fish between 22 and 27 inches (total
//   length) may be taken or possessed", one fish a day; harvest closes 1 May 2026; outside the season fish "shall be immediately
//   returned". https://www.ncwildlife.gov/harvest-striped-bass-proclamation-march-20-2026/download
// source: NC WRC press release, 20 March 2026, "Wildlife agency opens striped bass harvest season in Tar-Pamlico and Neuse rivers" —
//   season "from April 1 through April 30"; in the tributaries downstream of the lines "the season for taking and possessing striped
//   bass and striped bass hybrids is closed year-round". NC WRC Striped Bass Fishing Information page (undated): "All striped bass
//   caught in waters without open seasons must be released immediately."; mandatory harvest reporting.
//   https://www.ncwildlife.gov/news/press-releases/2026/03/20/wildlife-agency-opens-striped-bass-harvest-season-tar-pamlico-and-neuse-rivers
//   The rule text (paragraph (i)) gives no upstream limit for the Neuse waters, and paragraph (j) uses "the first impoundment"
//   without naming one, so it is not loaded as a closed row at Raleigh.
{
  id: "us-nc-neuse-striped-bass-raleigh",
  countryCode: "US",
  admin1: ["NC", "North Carolina"],
  near: { lat: 35.7804, lon: -78.6391, km: 30 },
  species: [],
  closed: [],
  water: ["rivers"],
  note: "North Carolina's 2026 striped bass rule gives the Neuse River and its tributaries, upstream of a line between Cooper Point (Pamlico County) and Fisher Landing Point (Craven County), a harvest season of 1 to 30 April only. In that month the limit is 1 fish of at least 18 inches, none between 22 and 27 inches, and every fish kept must be reported. The Wildlife Resources Commission says striped bass caught where no season is open must be released at once. The pages do not say how far up the Neuse this reaches, so no closing dates are loaded for the Neuse at Raleigh or for Falls Lake and Jordan Lake.",
  regulator: "NC Wildlife Resources Commission",
  source: "https://www.ncwildlife.gov/harvest-striped-bass-proclamation-march-20-2026/download",
  checked: CHECKED,
},

// ======================= United States: Florida (Jacksonville) ===================================================
// source: Florida Fish and Wildlife Conservation Commission (FWC), Red Drum (Redfish) recreational regulations (no page date;
//   copyright 1999-2026), read 10 November 2026 — Northeast region: "The northern boundary is located at the Florida-Georgia border
//   and extends south to Lytle Avenue/South Causeway in New Smyrna Beach"; "Open year-round"; "Not less than 18" no more than 27"
//   total length"; "1 fish per person per day; 4 fish per vessel limit". https://myfwc.com/fishing/saltwater/recreational/red-drum/
{
  id: "us-fl-ne-red-drum",
  countryCode: "US",
  admin1: ["FL", "Florida"],
  near: { lat: 30.3262, lon: -81.6579, km: 40 },
  species: ["redfish"],
  closed: [],
  water: ["sea", "estuary"],
  note: "FWC's Northeast red drum region runs from the Georgia line south to New Smyrna Beach and is open year-round. The limit is 1 fish a day, 18 to 27 inches long, and 4 per boat.",
  regulator: "Florida FWC (Northeast region)",
  source: "https://myfwc.com/fishing/saltwater/recreational/red-drum/",
  checked: CHECKED,
},
// source: FWC, Spotted Seatrout recreational regulations (no page date), read 10 November 2026 — Northeast Region: "All Florida
//   Waters and adjacent federal waters lying south of the Florida-Georgia border and north of the Indian River Lagoon Region", and
//   all waters of Volusia County north and west of that region "including all waters of the St. Johns River and its tributaries";
//   "Open year-round"; "Not less than 15" or more than 19" total length"; "Three fish per person per day"; "May not possess fish
//   larger than 19 inches total length". https://myfwc.com/fishing/saltwater/recreational/spotted-seatrout/
// source: FWC news release "02-04-2026" — "These new regulations will go into effect on April 1, 2026."; Northeast recreational:
//   no closed season. https://myfwc.com/news/all-news/spotted-seatrout-0226/
{
  id: "us-fl-ne-seatrout",
  countryCode: "US",
  admin1: ["FL", "Florida"],
  near: { lat: 30.3262, lon: -81.6579, km: 40 },
  species: ["speckled-trout"],
  closed: [],
  water: ["sea", "estuary"],
  note: "FWC's Northeast spotted seatrout region covers Florida's waters from the Georgia line south to the Indian River Lagoon region, including the St. Johns River and its tributaries. Under rules in force since 1 April 2026 it is open year-round for recreational anglers. The limit is 3 fish a day, 15 to 19 inches long, and no fish over 19 inches may be kept.",
  regulator: "Florida FWC (Northeast region)",
  source: "https://myfwc.com/fishing/saltwater/recreational/spotted-seatrout/",
  checked: CHECKED,
},
// source: FWC, Snook recreational regulations (no page date), read 10 November 2026 — Northeast and Indian River Lagoon closed season
//   "December 15 – January 31, and June 1 – August 31"; slot "Not less than 28” or more than 32” total length"; "One fish per person
//   per day"; "Snook permit and recreational fishing license"; the Northeast region includes "the waters of the St. Johns River and its
//   tributaries"; its northern coastal boundary is the Florida-Georgia border. Snook is not in the site's fish library: note only.
//   https://myfwc.com/fishing/saltwater/recreational/snook/
{
  id: "us-fl-ne-snook",
  countryCode: "US",
  admin1: ["FL", "Florida"],
  near: { lat: 30.3262, lon: -81.6579, km: 40 },
  species: ["snook"],
  closed: [],
  // Day 4 re-read (13 Nov 2026): snook is now in the library, and FWC's closed season bars keeping snook, not catching
  //   and releasing them (rule 68B-21.005; FWC releases snook-1121 and snook-1221), so the closed months are `noKeep`.
  noKeep: [
    { from: "12-15", to: "01-31" },
    { from: "06-01", to: "08-31" },
  ],
  water: ["sea", "estuary"],
  note: "FWC's snook season in its Northeast region, which includes the St. Johns River and its tributaries, is closed to keeping snook from 15 December to 31 January and from 1 June to 31 August; snook caught then must be released. In the open months the limit is 1 fish a day, 28 to 32 inches long, and you need a snook permit as well as a recreational fishing licence.",
  regulator: "Florida FWC (Northeast region)",
  source: "https://myfwc.com/fishing/saltwater/recreational/snook/",
  checked: CHECKED,
},
// source: FWC, Tarpon recreational regulations (no page date), read 10 November 2026 — "Tarpon is a catch-and-release only fishery.";
//   "One tarpon tag per person per year may be purchased when in pursuit of a Florida state or world record."; "Tarpon over 40 inches
//   MUST remain in the water unless in pursuit of a state or world record using a tarpon tag." No season or closed season stated.
//   https://myfwc.com/fishing/saltwater/recreational/tarpon/
{
  id: "us-fl-tarpon",
  countryCode: "US",
  admin1: ["FL", "Florida"],
  near: { lat: 30.3262, lon: -81.6579, km: 40 },
  species: [],
  closed: [],
  water: ["sea", "estuary"],
  note: "FWC says tarpon is catch-and-release only in Florida. One tarpon tag a year may be bought, and only by someone trying for a Florida or world record. Tarpon over 40 inches must stay in the water unless a tag is being used. The page gives no season, so no dates are loaded.",
  regulator: "Florida FWC",
  source: "https://myfwc.com/fishing/saltwater/recreational/tarpon/",
  checked: CHECKED,
},
// source: FWC, Bluefish recreational regulations (no page date; copyright 1999-2026), read by the checker 10-11 November 2026 —
//   "Effective Oct. 26, 2020: The recreational daily bag limit is three fish per person along the Atlantic coast from Nassau through
//   Miami-Dade."; Atlantic state waters: "Minimum size limit: 12" fork length", "Daily bag limit: 3 fish per person from Nassau through
//   Miami-Dade counties"; Atlantic federal waters: "Minimum size limit: none", 3 per person on private recreational vessels and 5 on
//   for-hire vessels; no season stated. Added because the Jacksonville fishing page prints a bluefish card (audit of 10 November 2026).
//   https://myfwc.com/fishing/saltwater/recreational/bluefish/
{
  id: "us-fl-ne-bluefish",
  countryCode: "US",
  admin1: ["FL", "Florida"],
  near: { lat: 30.3262, lon: -81.6579, km: 40 },
  species: [],
  closed: [],
  water: ["sea", "estuary"],
  note: "FWC's bluefish page gives no season. In Atlantic state waters from Nassau County to Miami-Dade, the limit is 3 bluefish a day, at least 12 inches to the fork of the tail. In Atlantic federal waters there is no size limit, and the limit is 3 a day from a private boat or 5 on a for-hire boat. No dates are loaded.",
  regulator: "Florida FWC",
  source: "https://myfwc.com/fishing/saltwater/recreational/bluefish/",
  checked: CHECKED,
},
// source: Fla. Admin. Code 68A-23.005, "Bag Limits, Length Limits, Open Season: Freshwater Fish" (as shown on Cornell LII; most recent
//   amendment effective 1 July 2024), read 10 November 2026 — (1) "The open season for fishing shall be from July 1 until June 30 of
//   the following year, except as otherwise provided by these rules."; black bass "Five (5) black bass, of which only one may be
//   16 inches or longer in total length";
//   "Twenty-five (25) crappie"; "Fifty (50) in the aggregate for all other panfish"; south and east of the Suwannee River "the daily
//   aggregate bag limit of striped bass and sunshine bass shall be 20", no more than six over 24 inches; no St. Johns River rule.
//   Checker, 10-11 November 2026: the waters the rule closes or protects are Silver Glen Springs, Salt Springs, the Rainbow River
//   headwaters, Wildcat Lake (Ocala National Forest), the Chipola River (shoal bass) and areas in Indian River and Brevard counties;
//   none is in Duval, Nassau, Clay, Baker or St. Johns County. The state's own copy (flrules.org, effective 1 July 2024) showed
//   only the rule's history, not its text, so the text was read on Cornell LII.
//   https://www.law.cornell.edu/regulations/florida/Fla-Admin-Code-Ann-R-68A-23-005
// source: FWC, Freshwater Fishing Regulations page (no page date) — "There are no new freshwater regulation changes for 2026-2027.";
//   General statewide limits page: "20 Striped bass, white bass , and sunshine bass", only 6 of 24 inches or longer.
//   https://myfwc.com/fishing/freshwater/regulations/general/
{
  id: "us-fl-fresh-jacksonville",
  countryCode: "US",
  admin1: ["FL", "Florida"],
  near: { lat: 30.3262, lon: -81.6579, km: 30 },
  species: ["largemouth-bass", "black-crappie", "bluegill", "striped-bass", "channel-catfish"],
  closed: [],
  water: ["rivers", "lakes"],
  note: "Florida's freshwater fish rule (68A-23.005) sets the open season for fishing from 1 July to 30 June of the next year, the whole year, except where its rules say otherwise. The waters it closes, or where no black bass may be kept, are all far from Jacksonville, and fish and wildlife management areas follow their own rules. FWC's freshwater page says there are no new freshwater rule changes for 2026-27. Daily limits:\n- Black bass: 5, only 1 of them 16 inches or longer.\n- Crappie: 25.\n- Panfish such as bluegill: 50.\n- Striped and sunshine bass: 20 combined, no more than 6 of them 24 inches or longer.",
  regulator: "Florida FWC (68A-23.005)",
  source: "https://www.law.cornell.edu/regulations/florida/Fla-Admin-Code-Ann-R-68A-23-005",
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

export const LAND: LandRule[] = [
// ---- Georgia ----
// Ga. Comp. R. & Regs. 391-5-1-.04 Resource Protection (amended eff. 28 March 2006; text read on Cornell LII because rules.sos.ga.gov
//   shows no text without JavaScript): no person shall possess, remove etc. "in or from any site" "(ii) Plants or the parts or products
//   thereof"; (1)(c) "The site manager may designate certain fruits, berries, nuts, or pine needles which may be gathered by hand" "for
//   personal use or consumption", may limit size and quantity or restrict consumption to the site; "The sale or commercial use of such
//   products is prohibited." Mushrooms are not named.
{
  id: "se-georgia-state-parks",
  applies: (p) => is(p, "GA", "Georgia"),
  title: "Georgia state parks and historic sites",
  rule: "Georgia's state park rule (391-5-1-.04) bars removing or possessing plants, or any part or product of a plant, from a park or historic site. A site manager may name certain fruits, berries, nuts or pine needles that visitors may gather by hand for their own use. The manager may limit how much is taken or require it to be eaten on site, and selling what is gathered is not allowed. The rule does not name mushrooms.",
  source: { label: "Georgia Rules and Regulations 391-5-1-.04, Resource Protection (amended effective 28 March 2006)", url: "https://www.law.cornell.edu/regulations/georgia/Ga-Comp-R-Regs-R-391-5-1-.04" },
  checked: CHECKED,
},
// NPS, Chattahoochee River NRA Superintendent's Compendium (signed 13 January 2026, page last updated 13 January 2026), 36 CFR 2.1(c):
//   "The gathering, by hand, of native and non-native fruits, berries and nuts for personal use or consumption is allowed."; "Each gatherer
//   is allowed one (1) gallon, per day."; "Gathering of plants or mushrooms is strictly prohibited, unless authorized by permit."; no
//   ladders or climbing; collections "within reach of the ground"; sale or commercial use of gathered fruits, berries and nuts
//   prohibited (on the 2026 page itself, as the checker re-read it; the reader had it from the 2019 page only).
{
  id: "se-chattahoochee-river-nra",
  applies: (p) => is(p, "GA", "Georgia") && within(p, ATLANTA, 45),
  title: "Chattahoochee River National Recreation Area (National Park Service)",
  rule: "The recreation area's 2026 compendium lets visitors pick fruits, berries and nuts, native or not, by hand for their own use or to eat, up to one gallon per person per day. Picking must be done from the ground, with no ladders or climbing. Gathering plants or mushrooms is not allowed without a permit, and what is gathered may not be sold or used commercially.",
  source: { label: "NPS: Chattahoochee River NRA Superintendent's Compendium (signed 13 January 2026), 36 CFR 2.1(c)", url: "https://www.nps.gov/chat/learn/management/superintendents-compendium-2025.htm" },
  checked: CHECKED,
},
// City of Atlanta, Park Use Rules and Guidelines (no page date): Sec. 110-59(a)(9) prohibits to "Knowingly, or through reckless behavior,
//   destroy or damage the lawn, plants, walls, road" etc. without written permission of the Commissioner or designee; Sec. 110-56(a)
//   violator reimburses damage "including but not limited to its infrastructure or plants". Picking/foraging not mentioned.
{
  id: "se-atlanta-city-parks",
  applies: (p) => is(p, "GA", "Georgia") && within(p, ATLANTA, 15),
  title: "City of Atlanta parks",
  rule: "Atlanta's park rules (City Code section 110-59) prohibit knowingly or recklessly destroying or damaging a park's lawn, plants or other features without written permission from the Parks Commissioner. Anyone who damages park plants by breaking a rule must pay for the repair. The rules do not mention picking or foraging.",
  source: { label: "City of Atlanta: Park Use Rules and Guidelines (Code sec. 110-59, 110-56)", url: "https://www.atlantaga.gov/government/departments/department-parks-recreation/office-of-parks/park-use-rules-and-guidelines" },
  checked: CHECKED,
},
// NPS, Fort Pulaski National Monument Superintendent's Compendium ("current as of January 6, 2026"; page last updated 10 June 2026),
//   2.1(c)(1): "Only the following natural products may be gathered for personal, non-commercial use or consumption in the designated
//   quantities listed below:" "Blackberries - ½ gallon per person per day"; "Figs – ½ gallon per person per day"; "Pinecones - 1 bushel per
//   person per day"; "Pine straw - 1 pick-up load or 5 garbage bags quarterly".
{
  id: "se-fort-pulaski",
  applies: (p) => is(p, "GA", "Georgia") && within(p, SAVANNAH, 30),
  title: "Fort Pulaski National Monument (National Park Service)",
  rule: "Fort Pulaski's compendium lets visitors gather only the products it lists, for their own non-commercial use: blackberries and figs, half a gallon of each per person per day; pinecones, one bushel per person per day; and pine straw, one pickup load or five garbage bags a quarter. The list does not include mushrooms or any other plants.",
  source: { label: "NPS: Fort Pulaski National Monument Superintendent's Compendium (current as of 6 January 2026), 36 CFR 2.1(c)", url: "https://www.nps.gov/fopu/learn/management/compendium.htm" },
  checked: CHECKED,
},

// ---- North Carolina ----
// NC Division of Parks and Recreation, Guidelines to Park Rules and Regulations (no page date): "The removal, destruction or injury of any
//   plant, fungus, mineral, or artifact in any state park is prohibited" "unless with an approved collection permit for scientific or
//   educational purposes"; Research Activity permit requests for personal or commercial collecting are denied. Rule: 07 NCAC 13B .0201
//   (eff. 1 May 2018; Justia, current through 16 June 2025).
{
  id: "se-nc-state-parks",
  applies: (p) => is(p, "NC", "North Carolina"),
  title: "North Carolina state parks",
  rule: "North Carolina State Parks prohibits removing, destroying or injuring plants, fungi, minerals or artifacts in its parks unless a collection permit for scientific or educational work has been approved. It says requests to collect for personal or commercial use are denied.",
  source: { label: "NC State Parks: Guidelines to Park Rules and Regulations (07 NCAC 13B .0201)", url: "https://www.ncparks.gov/about-us/guidelines-park-rules-and-regulations" },
  checked: CHECKED,
},
// 36 CFR 327.14 Public property (eCFR, "up to date as of 10/21/2026"): destruction, injury, defacement, removal or alteration of public
//   property including "vegetative growth" prohibited without the District Commander's written permission; cutting or gathering trees or
//   parts of trees needs written permission; no fruit/nut/mushroom exception. NC State Parks page: Falls Lake, Jordan Lake and Kerr Lake
//   state recreation area lands are owned by the U.S. Army Corps of Engineers.
{
  id: "se-usace-falls-jordan",
  applies: (p) => is(p, "NC", "North Carolina") && within(p, RALEIGH, 45),
  title: "U.S. Army Corps of Engineers land at Falls Lake and Jordan Lake",
  rule: "Federal rules for Corps of Engineers water projects (36 CFR 327.14) forbid destroying, injuring, removing or altering public property, including growing vegetation, without the District Commander's written permission. Cutting or gathering trees or parts of trees also needs written permission. The rule names no exception for fruit, nuts or mushrooms. North Carolina State Parks says the land of its Falls Lake and Jordan Lake recreation areas is owned by the Corps.",
  source: { label: "eCFR: 36 CFR 327.14, Public property (current to 21 October 2026)", url: "https://www.ecfr.gov/current/title-36/chapter-III/part-327/section-327.14" },
  checked: CHECKED,
},
// City of Raleigh, Annie Louise Wilkerson, MD Nature Preserve Park Rules ("Updated: Aug 27, 2026"): "Collection of any plants, animals,
//   rocks, fungi, or artifacts in the park is prohibited." No city code section cited.
{
  id: "se-raleigh-wilkerson-preserve",
  applies: (p) => is(p, "NC", "North Carolina") && within(p, RALEIGH, 20),
  title: "Annie Louise Wilkerson, MD Nature Preserve Park (City of Raleigh)",
  rule: "Raleigh's posted rules for this nature preserve forbid collecting plants, animals, rocks, fungi or artifacts anywhere in the park.",
  source: { label: "City of Raleigh: Annie Louise Wilkerson, MD Nature Preserve Park Rules (updated 27 August 2026)", url: "https://www.raleighnc.gov/parks/annie-louise-wilkerson-md-nature-preserve-park-rules" },
  checked: CHECKED,
},

// ---- Florida ----
// Florida State Parks FAQ 1.8 "Are Florida State Park visitors permitted to forage, collect or take any items found within the park?"
//   (no date): cannot "forage for food" or take items like driftwood, leaves, pine needles; exceptions only for research/academic study
//   with a DEP permit, and "empty seashells, sea glass or shark teeth found between the water line and toe of the sand dunes". Rule
//   62D-2.013 (Cornell LII; last amended 19 December 1999): (4)(a) no person shall "pick the flowers or seeds of any plant or tree";
//   (4)(b) no removal of plant life; (7) collection needs a permit.
{
  id: "se-florida-state-parks",
  applies: (p) => is(p, "FL", "Florida"),
  title: "Florida state parks",
  rule: "Florida State Parks says visitors may not forage for food in its parks, or take plant or animal items such as leaves, pine needles or driftwood. Its park rule (62D-2.013) also forbids removing plant life or picking the flowers or seeds of any plant. The only exceptions are collecting for research or academic study under a Department of Environmental Protection permit, and taking empty seashells, sea glass or shark teeth from beaches between the water line and the foot of the dunes.",
  source: { label: "Florida State Parks FAQ 1.8 (foraging and collecting) and Fla. Admin. Code 62D-2.013", url: "https://www.floridastateparks.org/taxonomy/term/86?page=1" },
  checked: CHECKED,
},
// NPS, Timucuan Ecological and Historic Preserve Superintendent's Compendium (page last updated 3 June 2026), "Gathering natural products
//   for personal consumption [36 CFR 2.1(c)]", All areas: "A reasonable quantity - up to one gallon per group per day - of blueberries,
//   grapes, hickory nuts and other fruits" may be gathered for personal use; "Taking of edible plants, plant parts, stems, leaves, flowers,
//   roots, tubers or other parts" "except seeds and seed-bearing parts as noted above is prohibited"; up to one gallon per group per day of
//   unoccupied seashells within 10 feet of the tidal zone of navigable waters; shell mounds, middens and scatters may not be disturbed.
{
  id: "se-timucuan-preserve",
  applies: (p) => is(p, "FL", "Florida") && within(p, JACKSONVILLE, 35),
  title: "Timucuan Ecological and Historic Preserve, including Fort Caroline (National Park Service)",
  rule: "The preserve's compendium allows up to one gallon per group per day of blueberries, grapes, hickory nuts and other fruits to be gathered for personal use. Taking edible plants or their stems, leaves, flowers, roots or tubers is prohibited. Up to one gallon per group per day of empty seashells may be taken along navigable shorelines, but shell mounds and middens may not be disturbed. The compendium does not name mushrooms.",
  source: { label: "NPS: Timucuan Ecological and Historic Preserve Superintendent's Compendium (page updated 3 June 2026), 36 CFR 2.1(c)", url: "https://www.nps.gov/timu/learn/management/superintendent-s-compendium.htm" },
  checked: CHECKED,
},
// City of Jacksonville Ordinance Code, Chapter 28 Part 7 Rules and Enforcement (PDF on jacksonville.gov; Ord. 2007-839-E, § 7):
//   Sec. 28.708(a) unlawful "to cut, mark, remove, break or climb upon or in any way injure, damage or deface the trees, shrubs, plants,
//   turf"; 28.708(b) unlawful "to pick or remove any vegetation in any park, beach, dock, marina or other recreational facility".
//   Posted PARK RULES (undated; Ordinance Code 614.103 and 614.138): "DISTURBANCE OF WILDLIFE OR VEGETATION IS PROHIBITED".
{
  id: "se-jacksonville-city-parks",
  applies: (p) => is(p, "FL", "Florida") && within(p, JACKSONVILLE, 30),
  title: "City of Jacksonville parks, beaches and recreation facilities",
  rule: "Jacksonville's Ordinance Code (section 28.708) makes it unlawful to pick or remove vegetation anywhere in the city's parks, beaches, docks, marinas and other recreation facilities. It also bans cutting, removing or damaging their trees, shrubs, plants or turf. The city's posted park rules prohibit disturbing wildlife or vegetation.",
  source: { label: "City of Jacksonville: Ordinance Code Chapter 28, Part 7 (sec. 28.708)", url: "https://www.jacksonville.gov/getattachment/Departments/Parks-and-Recreation/Recreation-and-Community-Programming/Chapter-28-Part-7-RULES_AND_ENFORCEMENT.pdf.aspx?lang=en-US" },
  checked: CHECKED,
},
];
