/**
 * Rules read from the regulator's own pages for the ecoregion "Florida Peninsula" (florida-peninsula): Fort Myers, Orlando, Tampa, Fort Lauderdale and Miami.
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

const FORT_MYERS = { lat: 26.6406, lon: -81.8723 };
const ORLANDO = { lat: 28.5421, lon: -81.3790 };
const TAMPA = { lat: 27.9450, lon: -82.4583 };
const FORT_LAUDERDALE = { lat: 26.1223, lon: -80.1434 };
const MIAMI = { lat: 25.7742, lon: -80.1936 };

export const CLOSED: ClosedSeason[] = [
// ======================= Salt water: snook, by FWC region =========================================================
// source: Florida FWC, Snook recreational regulations (myfwc.com; no page date, "Copyright 1999 - 2026"), read 13 November 2026 —
//   rules apply in inland, state and adjacent federal waters. Charlotte Harbor region: from 27°04.727’ N near the Venice Municipal
//   Airport south to 26°15.227’ N near Vanderbilt Beach Rd in Collier County; it includes "the Caloosahatchee, Myakka, and Peace rivers
//   and their tributaries" and excludes Lake Okeechobee. Closed season "December 1 – end of February, and May 1 – September 30";
//   "Not less than 28” or more than 33” total length"; one fish per person per day; "Hook and line only"; "A snook permit and a
//   recreational fishing license are required". https://myfwc.com/fishing/saltwater/recreational/snook/
// source: Fla. Admin. Code 68B-21.005, Seasons (Cornell LII; amended effective 1 January 2024), read 13 November 2026 — in a closed
//   region no person may "harvest or land a snook" or possess one; Charlotte Harbor and Southwest: closed May 1 – September 30 and
//   December 1 – the last day of February. https://www.law.cornell.edu/regulations/florida/Fla-Admin-Code-Ann-R-68B-21-005
// source (checker, 13 November 2026): FWC news releases "Snook seasonal closure in Gulf starts Dec. 1" (11-24-2021) and "Snook seasonal
//   closure in Atlantic starts Dec. 15" (12-03-2021) — "Anglers may continue to catch and release snook during the closed season."
//   https://myfwc.com/news/all-news/snook-1121/ and https://myfwc.com/news/all-news/snook-1221/
//   The snook page's own wording is "Regulations apply in all inland, state and adjacent federal waters." So the closed months close
//   harvest, not fishing: they are `noKeep`, not `closed` (checker's fix; the reader had loaded them as closed).
// Scope: Fort Myers, the Caloosahatchee estuary, Pine Island Sound and Sanibel lie between Vanderbilt Beach Rd (26°15.227’ N) and the
//   Venice airport (27°04.727’ N). A 35 km circle reaches Pine Island Sound and stays inside both lines. "rivers" is included because
//   the region names the rivers and the rule covers inland waters.
{
  id: "us-fl-fort-myers-snook",
  countryCode: "US",
  admin1: ["FL", "Florida"],
  near: { ...FORT_MYERS, km: 35 },
  species: ["snook"],
  closed: [],
  noKeep: [{ from: "12-01", to: "02-29" }, { from: "05-01", to: "09-30" }],
  water: ["sea", "estuary", "rivers"],
  note: "FWC's Charlotte Harbor snook region runs from near the Venice airport south to Vanderbilt Beach Road in Collier County, and includes the Caloosahatchee and its tributaries. Snook may be kept there only from 1 March to 30 April and from 1 October to 30 November. From 1 December to the end of February and from 1 May to 30 September, FWC's season rule bars harvesting, landing or keeping a snook, but FWC says anglers may still catch and release snook in the closed season. In season the limit is 1 a day, 28 to 33 inches long, hook and line only, and you need a snook permit as well as a recreational fishing licence.",
  regulator: "Florida FWC (Charlotte Harbor snook region)",
  source: "https://myfwc.com/fishing/saltwater/recreational/snook/",
  checked: CHECKED,
},
// source: FWC Snook page, as above — Tampa Bay region: from Fred Howard Park (near the Pasco/Pinellas line) south to State Road 64 in
//   Manatee County; it includes the Alafia, Braden, Manatee and Hillsborough rivers and their tributaries, and excludes Palma Sola Bay and
//   all Anclote River waters. Closed season "December 1 – end of February, and May 1 – August 31"; 28" to 33" total length; one per
//   person per day. 68B-21.005: Tampa Bay closed May 1 to August 31 and December 1 to the last day of February.
// Scope: Tampa is about 40 km from Fred Howard Park and about 50 km from SR 64, so a 30 km circle stays in the region.
{
  id: "us-fl-tampa-snook",
  countryCode: "US",
  admin1: ["FL", "Florida"],
  near: { ...TAMPA, km: 30 },
  species: ["snook"],
  closed: [],
  noKeep: [{ from: "12-01", to: "02-29" }, { from: "05-01", to: "08-31" }],
  water: ["sea", "estuary", "rivers"],
  note: "FWC's Tampa Bay snook region runs from Fred Howard Park, at the Pasco–Pinellas line, south to State Road 64 in Manatee County, and includes the Hillsborough, Alafia, Manatee and Braden rivers. Snook may be kept only from 1 March to 30 April and from 1 September to 30 November. From 1 December to the end of February and from 1 May to 31 August, FWC's rule bars harvesting, landing or keeping a snook, but FWC says anglers may still catch and release snook in the closed season. The Big Bend region to the north has the same season. In season the limit is 1 a day, 28 to 33 inches long, hook and line only, with a snook permit and a recreational fishing licence.",
  regulator: "Florida FWC (Tampa Bay snook region)",
  source: "https://myfwc.com/fishing/saltwater/recreational/snook/",
  checked: CHECKED,
},
// source: FWC Snook page, as above — Southeast region: from the Martin/Palm Beach county line south to the Miami-Dade/Monroe county line;
//   it includes the Hillsboro, Miami, North New River and West Palm Beach canals and the Loxahatchee River and its tributaries, and
//   excludes Lake Okeechobee and Everglades National Park; separate regulations apply in Biscayne National Park. Closed season
//   "December 15 – January 31, and June 1 – August 31"; "Not less than 28” or more than 32” total length"; one per person per day.
//   68B-21.005: Southeast closed June 1 to August 31 and December 15 to January 31.
// Scope: Fort Lauderdale (Broward) and Miami (Miami-Dade) are both in the Southeast region. The snook page puts "all waters of Everglades
//   National Park" in the Southwest region (closed months as Charlotte Harbor). The park's north-east edge on the Tamiami Trail (the L-31N
//   levee) is only about 30 km from central Miami, so the Miami circle is cut to 25 km (checker) to keep the park out; the Fort Lauderdale
//   circle (30 km) does not reach it.
{
  id: "us-fl-fort-lauderdale-snook",
  countryCode: "US",
  admin1: ["FL", "Florida"],
  near: { ...FORT_LAUDERDALE, km: 30 },
  species: ["snook"],
  closed: [],
  noKeep: [{ from: "12-15", to: "01-31" }, { from: "06-01", to: "08-31" }],
  water: ["sea", "estuary", "rivers"],
  note: "FWC's Southeast snook region runs from the Martin–Palm Beach county line south to the Miami-Dade–Monroe line, and includes the Hillsboro and North New River canals. Snook may be kept only from 1 February to 31 May and from 1 September to 14 December. From 15 December to 31 January and from 1 June to 31 August, FWC's rule bars harvesting, landing or keeping a snook, but FWC says anglers may still catch and release snook in the closed season. In season the limit is 1 a day, 28 to 32 inches long, hook and line only, with a snook permit and a recreational fishing licence.",
  regulator: "Florida FWC (Southeast snook region)",
  source: "https://myfwc.com/fishing/saltwater/recreational/snook/",
  checked: CHECKED,
},
{
  id: "us-fl-miami-snook",
  countryCode: "US",
  admin1: ["FL", "Florida"],
  near: { ...MIAMI, km: 25 },
  species: ["snook"],
  closed: [],
  noKeep: [{ from: "12-15", to: "01-31" }, { from: "06-01", to: "08-31" }],
  water: ["sea", "estuary", "rivers"],
  note: "FWC's Southeast snook region covers Miami-Dade's waters, including the Miami Canal, but not Everglades National Park, which is in the Southwest region with different dates. Snook may be kept only from 1 February to 31 May and from 1 September to 14 December. From 15 December to 31 January and from 1 June to 31 August, FWC's rule bars harvesting, landing or keeping a snook, but FWC says anglers may still catch and release snook in the closed season. In season the limit is 1 a day, 28 to 32 inches long, hook and line only, with a snook permit and a recreational fishing licence. In Biscayne National Park, snook also count toward the park's 10-fish combined bag limit.",
  regulator: "Florida FWC (Southeast snook region)",
  source: "https://myfwc.com/fishing/saltwater/recreational/snook/",
  checked: CHECKED,
},

// ======================= Salt water: red drum, by FWC region ======================================================
// source: FWC, Red Drum (Redfish) recreational regulations (no page date; "Copyright 1999 - 2026"), read 13 November 2026 — every region
//   except Indian River Lagoon (catch-and-release only) "Open year-round". Charlotte Harbor: "The northern boundary is located near the
//   Venice Municipal Airport" and it "extends south to near Vanderbilt Beach Road in Collier County"; 18" to 27" total length; 1 fish per
//   person, 2 fish vessel limit. Tampa Bay: northern boundary "at Fred Howard Park, near the border of Pasco and Pinellas counties",
//   "extends south to State Road 64 in Manatee County"; 1 per person, 2 per vessel. Southeast: from "the Martin-Palm Beach county border"
//   south "to the Miami-Dade/Monroe County line"; 1 fish per person per day, 2 fish vessel limit; "Special regulations apply in Biscayne
//   National Park". All regions: hook and line and cast nets only; no spearing, gigging, bowfishing, snatch hooking, or multiple hooks
//   with natural bait; fish kept whole until landed; no captain or crew limit on for-hire trips. https://myfwc.com/fishing/saltwater/recreational/red-drum/
{
  id: "us-fl-fort-myers-red-drum",
  countryCode: "US",
  admin1: ["FL", "Florida"],
  near: { ...FORT_MYERS, km: 35 },
  species: ["redfish"],
  closed: [],
  water: ["sea", "estuary"],
  note: "FWC's Charlotte Harbor red drum region runs from near the Venice airport south to near Vanderbilt Beach Road in Collier County, and is open year-round. The limit is 1 fish per person, 18 to 27 inches long, and 2 per boat. Only hook and line and cast nets may be used: no spearing, gigging, bowfishing or snatch hooking. Captains and crew on for-hire trips may not keep a limit.",
  regulator: "Florida FWC (Charlotte Harbor red drum region)",
  source: "https://myfwc.com/fishing/saltwater/recreational/red-drum/",
  checked: CHECKED,
},
{
  id: "us-fl-tampa-red-drum",
  countryCode: "US",
  admin1: ["FL", "Florida"],
  near: { ...TAMPA, km: 30 },
  species: ["redfish"],
  closed: [],
  water: ["sea", "estuary"],
  note: "FWC's Tampa Bay red drum region runs from Fred Howard Park, at the Pasco–Pinellas line, south to State Road 64 in Manatee County, and is open year-round. The limit is 1 fish per person, 18 to 27 inches long, and 2 per boat. Only hook and line and cast nets may be used: no spearing, gigging, bowfishing or snatch hooking.",
  regulator: "Florida FWC (Tampa Bay red drum region)",
  source: "https://myfwc.com/fishing/saltwater/recreational/red-drum/",
  checked: CHECKED,
},
{
  id: "us-fl-fort-lauderdale-red-drum",
  countryCode: "US",
  admin1: ["FL", "Florida"],
  near: { ...FORT_LAUDERDALE, km: 30 },
  species: ["redfish"],
  closed: [],
  water: ["sea", "estuary"],
  note: "FWC's Southeast red drum region runs from the Martin–Palm Beach county line south to the Miami-Dade–Monroe line, and is open year-round. The limit is 1 fish per person a day, 18 to 27 inches long, and 2 per boat. Only hook and line and cast nets may be used.",
  regulator: "Florida FWC (Southeast red drum region)",
  source: "https://myfwc.com/fishing/saltwater/recreational/red-drum/",
  checked: CHECKED,
},
{
  id: "us-fl-miami-red-drum",
  countryCode: "US",
  admin1: ["FL", "Florida"],
  near: { ...MIAMI, km: 30 },
  species: ["redfish"],
  closed: [],
  water: ["sea", "estuary"],
  note: "FWC's Southeast red drum region, which includes Miami-Dade's waters, is open year-round. The limit is 1 fish per person a day, 18 to 27 inches long, and 2 per boat, hook and line or cast net only. Biscayne National Park has special rules: red drum count toward its 10-fish combined bag limit.",
  regulator: "Florida FWC (Southeast red drum region)",
  source: "https://myfwc.com/fishing/saltwater/recreational/red-drum/",
  checked: CHECKED,
},

// ======================= Salt water: spotted seatrout, by FWC region ==============================================
// source: FWC, Spotted Seatrout recreational regulations (no page date; banner "New spotted seatrout regional management regulations are
//   now in effect"), read 13 November 2026 — Charlotte Harbor: waters between the Sarasota Bay Region and a due west line from
//   26°15.227' N, 81°49.412' W in Collier County, including "all waters and tributaries of the Caloosahatchee, Myakka, and Peace rivers",
//   excluding Lake Okeechobee. Tampa Bay: south of the Fred Howard Park Causeway line and north of SR 64 in Manatee County, plus "all waters
//   of Hillsborough County"; it includes the Alafia, Braden, Manatee and Hillsborough rivers. Southeast: south of the Martin-Palm Beach
//   line, north of the Miami-Dade/Monroe line, excluding Everglades National Park; "Special regulations apply for this species when
//   fishing in Biscayne National Park." All three: open year-round; "Not less than 15” or more than 19” total length"; three per person
//   per day; "May possess one fish over 19 inches per vessel"; "if fishing from shore, one fish over 19 inches per person, included in the bag
//   limit" (checker, 13 November 2026). Hook and line and cast net
//   only. https://myfwc.com/fishing/saltwater/recreational/spotted-seatrout/
{
  id: "us-fl-fort-myers-seatrout",
  countryCode: "US",
  admin1: ["FL", "Florida"],
  near: { ...FORT_MYERS, km: 35 },
  species: ["speckled-trout"],
  closed: [],
  water: ["sea", "estuary"],
  note: "Under FWC's 2026 regional rules, its Charlotte Harbor spotted seatrout region, which includes the Caloosahatchee and its tributaries, is open year-round. The limit is 3 a day, 15 to 19 inches long, and one fish over 19 inches may be kept per boat (or per person when fishing from shore) as part of the limit. Only hook and line and cast nets may be used.",
  regulator: "Florida FWC (Charlotte Harbor seatrout region)",
  source: "https://myfwc.com/fishing/saltwater/recreational/spotted-seatrout/",
  checked: CHECKED,
},
{
  id: "us-fl-tampa-seatrout",
  countryCode: "US",
  admin1: ["FL", "Florida"],
  near: { ...TAMPA, km: 30 },
  species: ["speckled-trout"],
  closed: [],
  water: ["sea", "estuary"],
  note: "Under FWC's 2026 regional rules, its Tampa Bay spotted seatrout region, which takes in all of Hillsborough County's waters, is open year-round. The limit is 3 a day, 15 to 19 inches long, and one fish over 19 inches may be kept per boat (or per person when fishing from shore) as part of the limit. Only hook and line and cast nets may be used.",
  regulator: "Florida FWC (Tampa Bay seatrout region)",
  source: "https://myfwc.com/fishing/saltwater/recreational/spotted-seatrout/",
  checked: CHECKED,
},
{
  id: "us-fl-fort-lauderdale-seatrout",
  countryCode: "US",
  admin1: ["FL", "Florida"],
  near: { ...FORT_LAUDERDALE, km: 30 },
  species: ["speckled-trout"],
  closed: [],
  water: ["sea", "estuary"],
  note: "Under FWC's 2026 regional rules, its Southeast spotted seatrout region, from the Martin–Palm Beach line to the Miami-Dade–Monroe line, is open year-round. The limit is 3 a day, 15 to 19 inches long, and one fish over 19 inches may be kept per boat (or per person when fishing from shore) as part of the limit.",
  regulator: "Florida FWC (Southeast seatrout region)",
  source: "https://myfwc.com/fishing/saltwater/recreational/spotted-seatrout/",
  checked: CHECKED,
},
{
  id: "us-fl-miami-seatrout",
  countryCode: "US",
  admin1: ["FL", "Florida"],
  near: { ...MIAMI, km: 30 },
  species: ["speckled-trout"],
  closed: [],
  water: ["sea", "estuary"],
  note: "Under FWC's 2026 regional rules, its Southeast spotted seatrout region, which covers Miami-Dade's waters but not Everglades National Park, is open year-round. The limit is 3 a day, 15 to 19 inches long, and one fish over 19 inches may be kept per boat (or per person when fishing from shore) as part of the limit. Biscayne National Park has special rules for seatrout, which count toward its 10-fish combined limit.",
  regulator: "Florida FWC (Southeast seatrout region)",
  source: "https://myfwc.com/fishing/saltwater/recreational/spotted-seatrout/",
  checked: CHECKED,
},

// ======================= Salt water: statewide species (whole Florida Peninsula ecoregion) =======================
// These rules are statewide, so they are scoped to the florida-peninsula ecoregion (Florida south of 29.5° N). That covers all four
//   coastal towns and does not repeat Jacksonville's rows (southeastern).
// source: FWC, Tarpon recreational regulations (no page date), read 13 November 2026 — "Tarpon is a catch-and-release only fishery.";
//   "One tarpon tag per person per year may be purchased when in pursuit of a Florida state or world record."; "Tarpon over 40 inches MUST
//   remain in the water unless in pursuit of a state or world record using a tarpon tag."; "Vessel, transport and shipment limited to one
//   fish."; "Hook and line only."; no season. Boca Grande Pass: weighted gear hanging below the hook is barred "when fishing for any species
//   year-round within Boca Grande Pass"; in April, May and June "No more than three fishing lines may be deployed from a vessel at any one
//   time" and no breakaway gear. https://myfwc.com/fishing/saltwater/recreational/tarpon/
{
  id: "us-fl-pen-tarpon",
  countryCode: "US",
  admin1: ["FL", "Florida"],
  regionSlug: ["florida-peninsula"],
  species: ["atlantic-tarpon"],
  closed: [],
  noKeep: [{ from: "01-01", to: "12-31" }],
  water: ["sea", "estuary"],
  note: "FWC says tarpon is catch-and-release only in Florida's state and federal waters, all year. The one exception is a single tarpon tag a year per person, bought to try for a Florida or world record. Tarpon over 40 inches must stay in the water unless a tag is being used, and hook and line is the only legal gear. In Boca Grande Pass, weighted gear that hangs below the hook is banned all year for every species. In April, May and June a boat there may fish no more than three lines, and breakaway gear is banned.",
  regulator: "Florida FWC",
  source: "https://myfwc.com/fishing/saltwater/recreational/tarpon/",
  checked: CHECKED,
},
// source: FWC, Bluefish recreational regulations (no page date), read 13 November 2026 — Gulf state and federal waters: 12" fork length,
//   "10 per harvester (includes Monroe County)"; Atlantic state waters: "12" fork length", "3 fish per person from Nassau through Miami-Dade
//   counties" ("Effective Oct. 26, 2020"); Atlantic federal waters: no size limit, 3 per person on private boats and 5 on for-hire boats;
//   no season. https://myfwc.com/fishing/saltwater/recreational/bluefish/
{
  id: "us-fl-pen-bluefish",
  countryCode: "US",
  admin1: ["FL", "Florida"],
  regionSlug: ["florida-peninsula"],
  species: [],
  closed: [],
  water: ["sea", "estuary"],
  note: "FWC's bluefish page gives no season, so no dates are loaded. On the Gulf coast, including Fort Myers, Tampa Bay and Monroe County, the limit in state and federal waters is 10 per person, at least 12 inches to the fork of the tail. On the Atlantic coast from Nassau to Miami-Dade, including Fort Lauderdale and Miami, the state-waters limit is 3 a day of at least 12 inches. In Atlantic federal waters there is no size limit, and the limit is 3 a day from a private boat or 5 on a for-hire boat.",
  regulator: "Florida FWC",
  source: "https://myfwc.com/fishing/saltwater/recreational/bluefish/",
  checked: CHECKED,
},
// source: FWC, Barracuda recreational regulations (no page date), read 13 November 2026 — South Florida, "all waters off Collier, Monroe,
//   Miami-Dade, Broward, Palm Beach, and Martin counties": "15-36" fork length with 1 fish greater than 36" per person or vessel per day",
//   "2 fish per person, 6 per vessel", "Open year-round"; separate regulations in Biscayne National Park. Rest of state: minimum size
//   "None", "2 fish or 100 pounds, whichever is more", "Open year-round". https://myfwc.com/fishing/saltwater/recreational/barracuda/
{
  id: "us-fl-pen-barracuda",
  countryCode: "US",
  admin1: ["FL", "Florida"],
  regionSlug: ["florida-peninsula"],
  species: ["great-barracuda"],
  closed: [],
  water: ["sea", "estuary"],
  note: "FWC lists great barracuda as open year-round. Off Collier, Monroe, Miami-Dade, Broward, Palm Beach and Martin counties the limit is 2 per person and 6 per boat, 15 to 36 inches to the fork of the tail, with one fish over 36 inches allowed per person or boat a day. Elsewhere, including off Lee, Hillsborough and Pinellas counties, there is no minimum size and the limit is 2 fish or 100 pounds, whichever is more. In Biscayne National Park barracuda also count toward a 10-fish combined limit.",
  regulator: "Florida FWC",
  source: "https://myfwc.com/fishing/saltwater/recreational/barracuda/",
  checked: CHECKED,
},
// source: FWC, Mullet recreational regulations (no page date), read 13 November 2026 — Gulf and Atlantic state waters; applies to Mugil
//   cephalus (striped mullet), M. curema (silver or white), M. gyrans and M. rubrioculus; "50 fish per person" per day; vessel "50 fish from
//   Sept. 1-Jan. 31; 100 fish from Feb. 1-Aug. 31"; size "None"; "Open year-round"; gear "hook and line, spears, gigs, seine, cast net";
//   "spearfishing mullet in fresh water prohibited"; "More restrictive seasonal bag limits apply to portions of Pinellas County."; "Seasonal
//   night closures apply in portions of Charlotte County." https://myfwc.com/fishing/saltwater/recreational/mullet
// source: Fla. Admin. Code 68B-39.0045, Striped Mullet: Seasonal Recreational and Commercial Bag Limit for Portion of Pinellas County
//   (Cornell LII; effective 16 May 2019) — "During the period beginning October 1 each year and continuing through January 31", 5 striped
//   mullet a day in Riviera Bay, Bayou Grande ("Papy's Bayou"), Placido Bayou, Snell Isle Harbour, Coffee Pot Bayou and connecting waters.
//   https://www.law.cornell.edu/regulations/florida/Fla-Admin-Code-Ann-R-68B-39-0045
{
  id: "us-fl-pen-mullet",
  countryCode: "US",
  admin1: ["FL", "Florida"],
  regionSlug: ["florida-peninsula"],
  species: ["flathead-grey-mullet"],
  closed: [],
  water: ["sea", "estuary"],
  note: "FWC lists mullet, striped mullet among them, as open year-round in Florida's Gulf and Atlantic state waters. The limit is 50 per person a day, with no size limit. A boat may hold 50 from 1 September to 31 January and 100 from 1 February to 31 August. Legal gear is hook and line, spears, gigs, seines and cast nets, but mullet may not be speared in fresh water. In some Pinellas County bayous (Riviera Bay, Papy's Bayou, Placido Bayou, Snell Isle Harbour and Coffee Pot Bayou) the limit is 5 striped mullet a day from 1 October to 31 January. FWC also notes seasonal night closures in parts of Charlotte County, but does not say where.",
  regulator: "Florida FWC",
  source: "https://myfwc.com/fishing/saltwater/recreational/mullet",
  checked: CHECKED,
},
// source: FWC, Unregulated Species (no page date), read 13 November 2026 — "jack crevalle" is named among popular unregulated sport fish;
//   bag limit "Two fish or 100 pounds per person, per day - whichever is more" (the page cites s. 379.361, Florida Statutes); lionfish are
//   excepted; legal gear "hook and line, spears, gigs, haul seines and cast nets"; no season. https://myfwc.com/fishing/saltwater/recreational/unregulated/
{
  id: "us-fl-pen-crevalle-jack",
  countryCode: "US",
  admin1: ["FL", "Florida"],
  regionSlug: ["florida-peninsula"],
  species: [],
  closed: [],
  water: ["sea", "estuary"],
  note: "FWC lists jack crevalle among the saltwater sport fish with no rules of their own. Those fish fall under a general limit of two fish or 100 pounds per person a day, whichever is more. The page gives no season, so no dates are loaded. Legal gear is hook and line, spears, gigs, haul seines and cast nets. In Biscayne National Park, crevalle jack count toward the park's 10-fish combined limit.",
  regulator: "Florida FWC",
  source: "https://myfwc.com/fishing/saltwater/recreational/unregulated/",
  checked: CHECKED,
},

// ======================= Salt water: Biscayne National Park (Miami) ================================================
// source: FWC, Biscayne National Park recreational regulations (no page date), read 13 November 2026 — rules "in addition to other
//   fishing regulations"; from July 1, 2020, a 10-fish aggregate bag limit per person inside the park covering drums (spotted seatrout,
//   redfish, black drum), jacks (including crevalle jack), great barracuda, "snook species", snappers, groupers and others, and species
//   limits still apply; larger park minimum sizes for gray, lane, mutton, schoolmaster and yellowtail snapper, red grouper, two grunts and
//   gray triggerfish; bonefish pre-spawning closed area (about 1.74 square miles; effective March 1, 2026): "Fishing and the possession
//   of fish are prohibited from March 1 through May 31". https://myfwc.com/fishing/saltwater/recreational/bnp/
// source: NPS, Biscayne National Park Superintendent's Compendium (approved 17 September 2025; page "Last updated: June 22, 2026") — 36
//   CFR 2.3: fishing prohibited in Boca Chita Key Harbor, Elliott Key Harbor (except from the maintenance dock just south of it), the NPS
//   boat basin at Convoy Point, the Convoy Point entrance road, the north side of Adams Key dock and the north end of the Convoy Point
//   picnic area; no cast netting along the Convoy Point jetty and footbridge. https://www.nps.gov/bisc/learn/management/superintendents-compendium.htm
// source: NPS, Biscayne "Fishing and Lobstering" ("Last updated: July 20, 2022") — "Fishing shall be in accordance with the laws and
//   regulations of the State of Florida"; size and bag limits for many species are "more stringent within the park boundaries"; harvest
//   barred for goliath and Nassau grouper, queen conch, sawfish and sea turtles. https://www.nps.gov/bisc/planyourvisit/fishing.htm
//   (Checker, 13 November 2026: the licence sentence the reader quoted was not found on re-reading, so it is dropped from the note.)
// Scope: the park's waters begin just south of Key Biscayne, about 12 km from central Miami.
{
  id: "us-fl-biscayne-np-fishing",
  countryCode: "US",
  admin1: ["FL", "Florida"],
  near: { ...MIAMI, km: 35 },
  species: [],
  closed: [],
  water: ["sea", "estuary"],
  note: "Biscayne National Park follows Florida's fishing rules, plus stricter ones FWC set for the park in 2020. Each angler may keep no more than 10 fish in total (a combined bag limit) from a list that includes snook, red drum, spotted seatrout, crevalle jack and great barracuda, and each species' own limit still applies. Several snappers, red grouper, grunts and gray triggerfish have larger minimum sizes in the park. Since 1 March 2026, fishing and keeping fish are banned from 1 March to 31 May in a bonefish pre-spawning area of about 1.74 square miles. The park bans fishing in Boca Chita Key and Elliott Key harbors (except from the maintenance dock just south of Elliott Key Harbor), in the boat basin and other spots at Convoy Point, and off the north side of the Adams Key dock. Goliath and Nassau grouper, queen conch, sawfish and sea turtles may not be taken.",
  regulator: "Florida FWC and National Park Service (Biscayne National Park)",
  source: "https://myfwc.com/fishing/saltwater/recreational/bnp/",
  checked: CHECKED,
},

// ======================= Everglades National Park (Miami) ==========================================================
// source: NPS, Everglades National Park Compendium 2026 (page "Last updated: August 31, 2026"), read 13 November 2026 — only blue crabs,
//   stone crab claws, marine finfish, shrimp, freshwater fish (not ornamental tropical fish) and saltwater baitfish may be taken; state
//   limits apply "except as modified by 36 CFR 7.45"; "The bag limit per person shall be ten for any finfish species having no limit.";
//   "The maximum daily possession limit, of all finfish species in aggregate, shall be 20 fish per person."; no limit on non-native
//   species; no fishing at Flamingo Marina and boat ramps, Gulf Coast Marina, Mrazek Pond, Eco Pond, the Flamingo breezeway seawall,
//   Paurotis Pond when closed, and the Gator Park, Safari Park and Coopertown airboat concession properties; Joe Bay and Snag Bay
//   catch-and-release only; cast nets over 20 feet prohibited. https://www.nps.gov/ever/learn/management/compendium.htm
// source: NPS, Everglades "Fishing" ("Last updated: February 25, 2025") — "A Florida freshwater fishing license is required to fish in
//   freshwater or to possess fresh water species."; a saltwater licence for salt water; "Fishing shall be in accordance with the laws and
//   regulations of the State of Florida". https://home.nps.gov/ever/planyourvisit/fishing.htm/index.htm
//   Checker, 13 November 2026: the same page lists freshwater closures at the Main Visitor Center lakes, the Royal Palm area, Chekika Lake,
//   the first 3 miles of the Main Park Road including Taylor Slough, and the Shark Valley Tram Road; Eco, Mrazek and Coot Bay ponds closed
//   "at any time"; Flamingo Marina and boat ramps closed sunrise to sunset; and, under freshwater, live or dead fish (minnows and shiners
//   included), amphibians and non-preserved fish eggs or roe may not be used as bait (the reader's doubt 7: it is a freshwater rule).
// Scope: the airboat properties on the Tamiami Trail and the Shark Valley and main entrances are 35 to 60 km from Miami. Within 60 km the
//   park's waters are fresh (Florida Bay and the marinas are farther), so the row is limited to rivers and lakes and the note to fresh water.
{
  id: "us-fl-everglades-np-fishing",
  countryCode: "US",
  admin1: ["FL", "Florida"],
  near: { ...MIAMI, km: 60 },
  species: [],
  closed: [],
  water: ["rivers", "lakes"],
  note: "In Everglades National Park, fishing follows Florida's laws, and you need a Florida freshwater licence to fish in fresh water. The park's 2026 compendium caps each angler at 20 fish a day of all kinds, and 10 of any finfish with no state limit; non-native fish have no limit. Fishing is banned at the Gator Park, Safari Park and Coopertown airboat sites on the Tamiami Trail. The park's fishing page also closes the Main Visitor Center lakes, the Royal Palm area, Chekika Lake, the first 3 miles of the Main Park Road (Taylor Slough included) and the Shark Valley Tram Road. In fresh water, live or dead fish, amphibians and unpreserved fish eggs may not be used as bait.",
  regulator: "National Park Service (Everglades National Park)",
  source: "https://www.nps.gov/ever/learn/management/compendium.htm",
  checked: CHECKED,
},

// ======================= Fresh water: statewide rule and local fish management areas ==============================
// source: Fla. Admin. Code 68A-23.005, Bag Limits, Length Limits, Open Season: Freshwater Fish (Cornell LII; amended effective 1 July 2024),
//   read 13 November 2026 — (1) "The open season for fishing shall be from July 1 until June 30 of the following year", except as other
//   rules provide; (6)(a) "Five (5) black bass, of which only one may be 16 inches or longer in total length."; (6)(b) "Twenty-five (25)
//   crappie."; (6)(c) "Fifty (50) in the aggregate for all other panfish."; (6)(d) "Two (2) butterfly peacock bass, only one (1) of which
//   can be greater than 17 inches total length"; no speckled peacock bass may be killed or possessed; (8)(a) south and east of the
//   Suwannee, 20 striped, white and sunshine bass combined, "no more than 6 of which may be more than 24 inches total length". The waters
//   the rule closes or protects (Silver Glen Springs, Salt Springs, the Rainbow River headwaters, Wildcat Lake, Farm-13/Stickmarsh,
//   Kenansville Reservoir, Headwaters and Egan lakes, Lake Okeechobee's 10-inch crappie minimum, Lake Talquin, the Chipola River, Lake
//   Seminole) are none of them in Lee, Orange, Osceola, Hillsborough, Broward or Miami-Dade County.
//   https://www.law.cornell.edu/regulations/florida/Fla-Admin-Code-Ann-R-68A-23-005
// source: FWC, General freshwater regulations (no page date) — the same limits; "No person shall have in his possession more than two days’
//   bag limit of freshwater game fish." https://myfwc.com/fishing/freshwater/regulations/general/
// source: FWC, Fish Management Areas (no page date) — the page lists no FMAs in Lee or Collier County; a licence is required "for residents
//   from 16 to 64 years of age, and for nonresidents 16 or more years of age"; FMAs "may be temporarily closed" for drawdowns.
//   https://myfwc.com/fishing/freshwater/regulations/fish-management-areas/
// source (checker, 13 November 2026): 68A-20.005 (Cornell LII; effective 22 December 2024) lists no FMA in Lee, Collier or Hendry County,
//   but in Charlotte County, Webb Lake ("The use of boats propelled by gasoline motors is prohibited"; 20 panfish; no bluegill or redear
//   under 8 inches; fishing only during posted hours) and Marl Pits 1 and 3 (20 panfish, 8-inch minimum) and Marl Pit 2 (10 bluegill or
//   redear, 10-inch minimum). Webb Lake and the pits are in the Babcock-Webb area, roughly 20 to 25 km north of Fort Myers (checker's map reading), inside the circle.
{
  id: "us-fl-fresh-fort-myers",
  countryCode: "US",
  admin1: ["FL", "Florida"],
  near: { ...FORT_MYERS, km: 30 },
  species: ["largemouth-bass", "black-crappie", "bluegill", "striped-bass", "channel-catfish"],
  closed: [],
  water: ["rivers", "lakes"],
  note: "Florida's freshwater fish rule (68A-23.005) sets the open season from 1 July to 30 June of the next year, the whole year, except where its rules say otherwise. None of the waters it closes or protects is in Lee County, and FWC lists no fish management area in Lee or Collier County. Just north, in Charlotte County, FWC's Webb Lake and Marl Pits fish management areas have their own limits: 20 panfish a day, with no bluegill or redear under 8 inches (10 fish of at least 10 inches in Marl Pit 2), and on Webb Lake fishing only in posted hours and no gasoline motors. Daily limits elsewhere:\n- Black bass: 5, only 1 of them 16 inches or longer.\n- Crappie: 25.\n- Panfish such as bluegill: 50 combined.\n- Striped, white and sunshine bass: 20 combined, no more than 6 over 24 inches.\n- Butterfly peacock bass: 2, only 1 over 17 inches. Speckled peacock bass may not be kept.\nNo one may hold more than two days' limit of freshwater game fish.",
  regulator: "Florida FWC (68A-23.005)",
  source: "https://www.law.cornell.edu/regulations/florida/Fla-Admin-Code-Ann-R-68A-23-005",
  checked: CHECKED,
},
// source: 68A-23.005 and the FWC general page, as above.
// source: Fla. Admin. Code 68A-20.005, Specific Fish Management Area Regulations (Cornell LII; amended effective 22 December 2024), read
//   13 November 2026, with FWC's Fish Management Areas page — Orange County: Lake Ivanhoe ("Cast nets are prohibited."; 20 panfish); Lake
//   Santiago in Demetree Park (no boats, no cast nets, 20 panfish); Hal Scott Lake ("No person shall kill or possess any black bass.", no
//   gasoline motors, 20 panfish); Bear Creek Park (no cast nets, 20 panfish); Shadow Bay Park ("No person shall take in any one day more
//   than five bluegill.", bluegill at least 12 inches, no black bass, one channel catfish of at least 30 inches); Clear Lake and Lake Lawne
//   (no cast nets); Starke Lake (no channel catfish limit; no cast nets or minnow seines); Turkey Lake (20 panfish, no black bass, no
//   gasoline motors except sanctioned events); Lake Underhill (20 panfish, no black bass, no cast nets). Seminole County: Secret Lake Park
//   (no personal watercraft, no cast nets, 20 panfish). Osceola County: Lake Tohopekaliga and East Lake Tohopekaliga ("No daily bag limit
//   for channel catfish"; "Nongame fish may be taken by castnets, dip nets, seines, trotlines, set lines, bush hooks, and traps.").
//   Neither 68A-23.005 nor 68A-20.005 names the Butler Chain or the St. Johns River near Orlando. https://www.law.cornell.edu/regulations/florida/Fla-Admin-Code-Ann-R-68A-20-005
// Scope: 40 km reaches Lake Tohopekaliga and East Lake Tohopekaliga to the south and part of the upper St. Johns to the east.
{
  id: "us-fl-fresh-orlando",
  countryCode: "US",
  admin1: ["FL", "Florida"],
  near: { ...ORLANDO, km: 40 },
  species: ["largemouth-bass", "black-crappie", "bluegill", "striped-bass", "channel-catfish"],
  closed: [],
  water: ["rivers", "lakes"],
  note: "Florida's freshwater fish rule (68A-23.005) sets the open season from 1 July to 30 June of the next year, the whole year. None of the waters it closes is in Orange or Osceola County, and it names no special rules for the Butler Chain or the upper St. Johns. Statewide daily limits are 5 black bass (only 1 of 16 inches or more), 25 crappie, 50 panfish and 20 striped and sunshine bass. FWC's fish management areas in Orange and Seminole counties add their own rules:\n- No black bass may be kept from Turkey Lake, Lake Underhill, Hal Scott Lake or the waters of Shadow Bay Park.\n- In Shadow Bay Park the limit is 5 bluegill of at least 12 inches and 1 channel catfish of at least 30 inches.\n- Lake Ivanhoe, Lake Underhill, Turkey Lake, Bear Creek Park, Demetree Park's Lake Santiago and Secret Lake Park have a 20-panfish limit, and cast nets are banned on several of them, Clear Lake and Lake Lawne among them.\nOn Lake Tohopekaliga and East Lake Tohopekaliga there is no daily limit on channel catfish, and nongame fish may also be taken with cast nets, seines, trotlines and traps. You need a licence from age 16 (residents up to 64), and fish management areas may close for drawdowns.",
  regulator: "Florida FWC (68A-23.005, 68A-20.005)",
  source: "https://www.law.cornell.edu/regulations/florida/Fla-Admin-Code-Ann-R-68A-23-005",
  checked: CHECKED,
},
// source: 68A-23.005 and 68A-20.005, as above — Hillsborough County: Al Lopez Park Lake, Dover District Park Lake, Steven J. Wortham Park
//   Lake, Bobby Hicks Park Pond and Gadsden Park Pond ("The use or possession of castnets or minnow seines is prohibited."; "No person shall
//   take in any one day more than 20 panfish, in the aggregate."; no internal-combustion boats on the last two); Lake Thonotosassa ("No daily
//   bag limit for channel catfish."; trotlines from sunset until 9:00 a.m., Sunday through Thursday); Edward Medard Park Reservoir ("No person
//   shall use any gear other than hook and line or rod and reel" to take and possess game and nongame fish — checker's correction: the
//   reader had "game fish" only; licensed commercial fishers may cast-net nongame fish Tuesday to Friday). Pinellas County: Lake Tarpon and Lake
//   Seminole (no channel catfish limit; trotlines), Freedom Lake Park and Largo Central Park Nature Preserve (no cast nets, 20 panfish),
//   Walsingham Park Lake (20 bluegill and redear; 4 sunshine or palmetto bass of at least 10 inches).
//   Checker: Lake Seminole and Walsingham Park (both about 34 to 36 km west of Tampa) lie outside the 30 km circle, so the note no longer
//   names their rules; Lake Tarpon sits at the circle's edge.
// source: Hillsborough County, "Conservation parks and nature preserves rules" ("Last Modified: 7/7/2025") — "Where fishing is allowed, you
//   must follow state regulations."; a valid Florida fishing licence "to fish in all Hillsborough County parks and nature preserves".
//   https://hcfl.gov/residents/parks-and-leisure/outdoor-recreation/rules-and-expectations
{
  id: "us-fl-fresh-tampa",
  countryCode: "US",
  admin1: ["FL", "Florida"],
  near: { ...TAMPA, km: 30 },
  species: ["largemouth-bass", "black-crappie", "bluegill", "striped-bass", "channel-catfish"],
  closed: [],
  water: ["rivers", "lakes"],
  note: "Florida's freshwater fish rule (68A-23.005) sets the open season from 1 July to 30 June of the next year, the whole year. None of the waters it closes is in Hillsborough or Pinellas County, and it names no special rule for the Hillsborough River. Statewide daily limits are 5 black bass (only 1 of 16 inches or more), 25 crappie, 50 panfish and 20 striped and sunshine bass. FWC's fish management areas add local rules:\n- Al Lopez, Dover District and Steven J. Wortham park lakes and the Bobby Hicks and Gadsden park ponds: 20 panfish a day, no cast nets or minnow seines.\n- Lake Thonotosassa: no daily limit on channel catfish, and trotlines allowed from sunset to 9 a.m., Sunday to Thursday.\n- Edward Medard Park Reservoir: game and nongame fish by hook and line or rod and reel only.\n- Pinellas County's fish management areas, Lake Tarpon and Freedom Lake Park among them, have their own rules; Lake Tarpon has no channel catfish limit.\nHillsborough County requires a Florida fishing licence in all its parks and preserves.",
  regulator: "Florida FWC (68A-23.005, 68A-20.005)",
  source: "https://www.law.cornell.edu/regulations/florida/Fla-Admin-Code-Ann-R-68A-23-005",
  checked: CHECKED,
},
// source: 68A-23.005 and 68A-20.005, as above — Broward County: Plantation Heritage Park Lake ("No person shall take in any one day more
//   than 20 panfish, in the aggregate."; no bluegill or redear sunfish "less than eight inches in total length").
// source: Fla. Admin. Code 68A-15.064, Specific Regulations for Wildlife Management Areas – South Region (Cornell LII; amended effective
//   1 July 2024) — Everglades and Francis S. Taylor WMA: "Fishing and frogging - Throughout year."; legal to take: game, "fish, frogs and
//   furbearers". https://www.law.cornell.edu/regulations/florida/Fla-Admin-Code-Ann-R-68A-15-064
// source (checker, 13 November 2026): USFWS, Arthur R. Marshall Loxahatchee NWR, Facility Rules and Policies (no date) — "We allow fishing
//   on all areas of the refuge, except those areas posted as closed to fishing or closed to the public."; "We only allow the use of rods
//   and reels and poles and lines, and anglers must attend them at all times."; cast nets, seines, trotlines and jugs prohibited; an
//   entrance pass is required. https://www.fws.gov/refuge/arthur-r-marshall-loxahatchee/visit-us/rules-policies
// Scope: 35 km so the circle reaches the eastern edge of the Everglades WMA west of the city; the refuge's south end, on the Hillsboro
//   Canal, is about 25 km north-west of Fort Lauderdale.
{
  id: "us-fl-fresh-fort-lauderdale",
  countryCode: "US",
  admin1: ["FL", "Florida"],
  near: { ...FORT_LAUDERDALE, km: 35 },
  species: ["largemouth-bass", "black-crappie", "bluegill", "striped-bass", "channel-catfish"],
  closed: [],
  water: ["rivers", "lakes"],
  note: "Florida's freshwater fish rule (68A-23.005) sets the open season from 1 July to 30 June of the next year, the whole year. None of the waters it closes is in Broward County. FWC's rule for the Everglades and Francis S. Taylor Wildlife Management Area allows fishing and frogging there throughout the year. Daily limits:\n- Black bass: 5, only 1 of them 16 inches or longer.\n- Crappie: 25.\n- Panfish such as bluegill: 50.\n- Striped and sunshine bass: 20.\n- Butterfly peacock bass: 2, only 1 over 17 inches. Speckled peacock bass may not be kept.\nOn Plantation Heritage Park Lake, a fish management area, the limit is 20 panfish, and bluegill and redear under 8 inches must be released. In the Loxahatchee National Wildlife Refuge, fishing is allowed except in areas posted closed, with attended rods and reels or poles and lines only, and an entrance pass is needed.",
  regulator: "Florida FWC (68A-23.005)",
  source: "https://www.law.cornell.edu/regulations/florida/Fla-Admin-Code-Ann-R-68A-23-005",
  checked: CHECKED,
},
// source: 68A-23.005, 68A-20.005 and 68A-15.064, as above — Miami-Dade County: the north-most Tropical Park lake and Doral Glades Park (20
//   panfish; no bluegill or redear sunfish under eight inches).
{
  id: "us-fl-fresh-miami",
  countryCode: "US",
  admin1: ["FL", "Florida"],
  near: { ...MIAMI, km: 30 },
  species: ["largemouth-bass", "black-crappie", "bluegill", "striped-bass", "channel-catfish"],
  closed: [],
  water: ["rivers", "lakes"],
  note: "Florida's freshwater fish rule (68A-23.005) sets the open season from 1 July to 30 June of the next year, the whole year. None of the waters it closes is in Miami-Dade County. FWC's rule for the Everglades and Francis S. Taylor Wildlife Management Area allows fishing and frogging there throughout the year. Daily limits: 5 black bass (only 1 of 16 inches or more), 25 crappie, 50 panfish, and 2 butterfly peacock bass with only 1 over 17 inches. Speckled peacock bass may not be kept. On the north-most lake in Tropical Park and in Doral Glades Park, both fish management areas, the limit is 20 panfish, and bluegill and redear under 8 inches must be released. Everglades National Park has its own rules.",
  regulator: "Florida FWC (68A-23.005)",
  source: "https://www.law.cornell.edu/regulations/florida/Fla-Admin-Code-Ann-R-68A-23-005",
  checked: CHECKED,
},

// ======================= City and county fishing rules (notes) ===================================================
// source: City of Orlando, "City of Orlando Park Rules" (no page date), read 13 November 2026 — "Fishing is not allowed in Lake Eola, Spring
//   Lake or other City lakes where “no fishing” signs are posted." https://www.orlando.gov/Parks-the-Environment/City-of-Orlando-Park-Rules
{
  id: "us-fl-orlando-city-lakes",
  countryCode: "US",
  admin1: ["FL", "Florida"],
  near: { ...ORLANDO, km: 12 },
  species: [],
  closed: [],
  water: ["lakes"],
  note: "The City of Orlando does not allow fishing in Lake Eola, in Spring Lake, or in other city lakes posted with no-fishing signs.",
  regulator: "City of Orlando",
  source: "https://www.orlando.gov/Parks-the-Environment/City-of-Orlando-Park-Rules",
  checked: CHECKED,
},
// source: City of Fort Lauderdale, "Park Rules & Regulations" (no page date), read 13 November 2026 — 2.4 "Fishing is permitted in designated
//   areas"; 7.4(b) fishing or netting on the sandy beach between N.E. 18th Street and N.E. 23rd Street "only during the hours of 9:00 a.m.
//   through 4:00 p.m." (6 p.m. on weekends and national holidays); "Fishing or netting of fish is prohibited from or under any bridge in the
//   city", and from piers, docks and wharves at Port Everglades. https://www.parks.fortlauderdale.gov/parks/park-rules
{
  id: "us-fl-fort-lauderdale-city-fishing",
  countryCode: "US",
  admin1: ["FL", "Florida"],
  near: { ...FORT_LAUDERDALE, km: 12 },
  species: [],
  closed: [],
  water: ["sea", "estuary", "rivers"],
  note: "Fort Lauderdale's park rules allow fishing or netting on the sand of the public beach between NE 18th and NE 23rd streets only from 9 a.m. to 4 p.m. on weekdays, and to 6 p.m. on weekends and national holidays. Fishing is banned from or under any bridge in the city, and from the piers, docks and wharves of Port Everglades. In city parks, fishing is allowed only in designated areas.",
  regulator: "City of Fort Lauderdale",
  source: "https://www.parks.fortlauderdale.gov/parks/park-rules",
  checked: CHECKED,
},
// source: Broward County Parks, Customer Code of Conduct (no page date), read 13 November 2026 — item 3 prohibits "Capturing, annoying,
//   feeding, or disturbing any animal, wildlife, waterfowl, or living thing", "With the exception for catch-and-release fishing with the
//   appropriate fishing license, where authorized." https://www.broward.org/parks/generalinfo/codeofconduct
//   Checker: the reader's "so fish ... are to be released" went past the code's words and is cut. Plantation Heritage Park (a Broward
//   County park, to the checker's knowledge; not confirmed on a page read today) is also an FWC fish management area with a 20-panfish
//   limit (68A-20.005); the two texts read differently there, which the notes leave side by side.
{
  id: "us-fl-broward-county-parks-fishing",
  countryCode: "US",
  admin1: ["FL", "Florida"],
  near: { ...FORT_LAUDERDALE, km: 30 },
  species: [],
  closed: [],
  note: "Broward County's park code of conduct bans capturing, feeding or disturbing any animal or living thing in county parks. Its only exception is catch-and-release fishing with the proper licence, where fishing is authorized; the code names no exception for keeping fish.",
  regulator: "Broward County Parks and Recreation",
  source: "https://www.broward.org/parks/generalinfo/codeofconduct",
  checked: CHECKED,
},
// source: Lee County Ordinance No. 18-12, "Lee County Parks and Recreation Ordinance" (adopted 20 March 2018), read 13 November 2026 —
//   7.1 "Fishing is authorized in park waters in accordance with Florida law and Federal law"; 7.2 "No person shall fish off-shore from any
//   type of vessel" "within 200 feet of any 'swimming only' exclusion area" (checker: the 200-foot rule is for boats), nor where bathing or
//   swimming is permitted, nor where posted "no fishing"; "Fishing with nets, spears, bow and
//   arrow, snatch hooks and gigs is prohibited at all times."; "Cast netting is prohibited from the fishing piers."; no fishing from shore
//   at "Dog Beach"; Exhibit A, Lynn Hall Park pier: "No shark fish ing is allowed.", no baiting or chumming, no net, spear, snatch or trap
//   fishing; "All accidental shark catches must be cut loose."; 7.3 "No person on park property shall engage in commercial fishing", nor buy or
//   sell finfish or shellfish there. https://www.leegov.com/bocc/Ordinances/18-12.pdf
{
  id: "us-fl-lee-county-parks-fishing",
  countryCode: "US",
  admin1: ["FL", "Florida"],
  near: { ...FORT_MYERS, km: 35 },
  species: [],
  closed: [],
  note: "Lee County's parks ordinance allows fishing in park waters under Florida and federal law. It is not allowed where swimming is permitted, from a boat within 200 feet of a swimming-only area, where posted, or from shore at Dog Beach. Fishing with nets, spears, bows, snatch hooks and gigs is banned at all times, and cast nets may not be used from fishing piers. On the Lynn Hall Park pier, shark fishing and chumming are not allowed, and accidentally hooked sharks must be cut loose. Commercial fishing, and buying or selling fish or shellfish, are not allowed on park property.",
  regulator: "Lee County Parks and Recreation (Ordinance 18-12)",
  source: "https://www.leegov.com/bocc/Ordinances/18-12.pdf",
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
// ---- National Park Service ----
// NPS, Everglades National Park Compendium 2026 (page "Last updated: August 31, 2026"): under "2.1 – Preservation of Natural, Cultural and
//   Archeological Resources" the only collecting allowed is "Dead wood on the ground, including driftwood, may be collected for use as fuel in
//   campfires within the park". The words gather, fruit, berries, seashell and mushroom do not appear anywhere on the page.
//   36 CFR 2.1 (eCFR, "up to date as of 10/22/2026"): (a)(1)(ii) "Plants or the parts or products thereof"; (c)(1) the superintendent
//   "may designate certain fruits, berries, nuts, or unoccupied seashells"; (c)(3)(i) "Gathering or possessing undesignated natural products"
//   prohibited; (c)(3)(v) "Sale or commercial use of natural products" prohibited.
{
  id: "fp-everglades-np",
  applies: (p) => is(p, "FL", "Florida") && within(p, MIAMI, 60),
  title: "Everglades National Park (National Park Service)",
  rule: "Everglades National Park's 2026 compendium names no fruits, berries, nuts or seashells that visitors may gather. The only collecting it allows is dead wood lying on the ground, driftwood included, for campfires in the park. Under the federal park rule (36 CFR 2.1), removing plants or any part of them, and gathering any natural product the superintendent has not designated, is prohibited, as is selling natural products.",
  source: { label: "NPS: Everglades National Park Compendium 2026 (page updated 31 August 2026), 36 CFR 2.1", url: "https://www.nps.gov/ever/learn/management/compendium.htm" },
  checked: CHECKED,
},
// NPS, Biscayne National Park Superintendent's Compendium (approved 17 September 2025; page "Last updated: June 22, 2026"): "Collection, for
//   personal use, of ripe coconuts found on the ground is permitted."; "Coconuts still on the trees may not be collected or disturbed.";
//   "Personal and commercial collecting of seashells, occupied or unoccupied, is prohibited."; "The harvest of blue land crabs is prohibited
//   at Convoy Point."; dead and down wood only near the Elliott Key ocean-side campground fire ring and on Adams Key.
{
  id: "fp-biscayne-np",
  applies: (p) => is(p, "FL", "Florida") && within(p, MIAMI, 45),
  title: "Biscayne National Park (National Park Service)",
  rule: "Biscayne's compendium lets visitors collect ripe coconuts found on the ground for their own use, but coconuts still on the trees may not be taken or disturbed. Collecting seashells, empty or occupied, is prohibited, and so is taking blue land crabs at Convoy Point. Dead and fallen wood, driftwood included, may be gathered only right beside the Elliott Key oceanside campground's fire ring and in the developed areas of Adams Key. The compendium designates nothing else, and the federal park rule (36 CFR 2.1) bars gathering any natural product that is not designated.",
  source: { label: "NPS: Biscayne National Park Superintendent's Compendium (approved 17 September 2025), 36 CFR 2.1", url: "https://www.nps.gov/bisc/learn/management/superintendents-compendium.htm" },
  checked: CHECKED,
},
// NPS, Big Cypress National Preserve Compendium (PDF "BICY-Compendium-Jan-2026"; signature block names Superintendent Thomas P. Forsyth,
//   date line blank), 2.1(c)(1-3): "Citrus fruits and bananas may be collected for personal consumption. The picking of palmetto berries is
//   prohibited."; 2.1(a)(4): "Only dead wood lying on the ground may be collected as fuel for campfires within the Preserve."; "This wood
//   cannot be removed from the Preserve."
// Fla. Admin. Code 68A-15.064 (Cornell LII; effective 1 July 2024), Big Cypress WMA: (d)(2) "The removal of any plant is prohibited.";
//   (d)(10) collection of plants and other natural objects "is allowed only" "in accordance with written permits obtained in advance from
//   the National Park Service."
{
  id: "fp-big-cypress",
  applies: (p) => is(p, "FL", "Florida") && (within(p, MIAMI, 75) || within(p, FORT_MYERS, 70)),
  title: "Big Cypress National Preserve (National Park Service)",
  rule: "Big Cypress's 2026 compendium lets visitors collect citrus fruit and bananas to eat themselves, and bans picking palmetto berries. Only dead wood lying on the ground may be gathered, for campfires, and it may not be taken out of the preserve. The compendium names nothing else that may be gathered. FWC's rule for the Big Cypress Wildlife Management Area bans removing any plant, and allows plants to be collected only under a written permit from the National Park Service.",
  source: { label: "NPS: Big Cypress National Preserve Compendium (January 2026), 36 CFR 2.1(c); Fla. Admin. Code 68A-15.064", url: "https://www.nps.gov/bicy/learn/management/upload/BICY-Compendium-Jan-2026-508-Compliant.pdf" },
  checked: CHECKED,
},

// ---- National wildlife refuges ----
// USFWS, J.N. "Ding" Darling NWR, "Laws and Regulations" (no date): "Visitors may not take any animal or plants, except as authorized."
//   Its "Rules and Policies" page (no date) has fishing and crabbing rules but nothing on collecting. 50 CFR 27.51 (eCFR, "up to date as
//   of 10/15/2026"): "Disturbing, injuring, spearing, poisoning, destroying, collecting" plants or animals on any national wildlife
//   refuge is prohibited unless a special permit or another rule in the subchapter allows it.
{
  id: "fp-ding-darling-nwr",
  applies: (p) => is(p, "FL", "Florida") && within(p, FORT_MYERS, 35),
  title: "J.N. \"Ding\" Darling National Wildlife Refuge, Sanibel (U.S. Fish and Wildlife Service)",
  rule: "The refuge says visitors may not take any animal or plant unless it is authorized. The federal refuge rule (50 CFR 27.51) bans disturbing, injuring, destroying or collecting plants on any national wildlife refuge without a special permit or another rule that allows it. The refuge's pages name no exception for fruit, nuts, mushrooms or shells.",
  source: { label: "USFWS: J.N. \"Ding\" Darling NWR, Laws and Regulations; eCFR 50 CFR 27.51 (current to 15 October 2026)", url: "https://www.fws.gov/refuge/jn-ding-darling/what-we-do/laws-regulations" },
  checked: CHECKED,
},
// USFWS, Egmont Key NWR, Facility Rules and Policies (no date): "The collection, destruction or disturbance of plants, animals or refuge
//   property is prohibited."; "(Deceased) Seashells are the only item that may be collected."; "Take/collect live shells or artifacts"
//   listed under Do Not; "Several beaches are closed to visitors year-round to support nesting colonial seabird habitat."
{
  id: "fp-egmont-key-nwr",
  applies: (p) => is(p, "FL", "Florida") && within(p, TAMPA, 50),
  title: "Egmont Key National Wildlife Refuge, mouth of Tampa Bay (U.S. Fish and Wildlife Service)",
  rule: "Egmont Key refuge bans collecting, destroying or disturbing plants, animals or refuge property. Dead seashells are the only thing visitors may collect; live shells and artifacts may not be taken. Several beaches are closed all year for nesting seabirds.",
  source: { label: "USFWS: Egmont Key NWR, Facility Rules and Policies", url: "https://www.fws.gov/refuge/egmont-key/visit-us/rules-policies" },
  checked: CHECKED,
},
// USFWS, Arthur R. Marshall Loxahatchee NWR, Facility Rules and Policies (no date): "The collecting or taking of plants, animals, minerals,
//   and/or artifacts or parts thereof is prohibited."
{
  id: "fp-loxahatchee-nwr",
  applies: (p) => is(p, "FL", "Florida") && within(p, FORT_LAUDERDALE, 45),
  title: "Arthur R. Marshall Loxahatchee National Wildlife Refuge (U.S. Fish and Wildlife Service)",
  rule: "The refuge prohibits collecting or taking plants, animals, minerals or artifacts, or any part of them.",
  source: { label: "USFWS: Arthur R. Marshall Loxahatchee NWR, Facility Rules and Policies", url: "https://www.fws.gov/refuge/arthur-r-marshall-loxahatchee/visit-us/rules-policies" },
  checked: CHECKED,
},

// ---- Water management districts ----
// Scope (checker, 13 November 2026): no page read today says which district holds land near which town. The circles follow the districts'
//   well-known territories (South Florida: Lee, Broward and Miami-Dade, whose Water Conservation Areas make up the Everglades and Francis S.
//   Taylor WMA; Southwest Florida: Hillsborough; St. Johns River: north and east Orange and Seminole). Each rule names its own district's land
//   and says nothing about anyone else's, so a circle that also takes in another district's land does not carry the rule onto it.
// SFWMD, Chapter 40E-7 public use rule (PDF on sfwmd.gov): 40E-7.537 General Prohibitions (amended 7-12-06), for "all District lands unless
//   otherwise specified": (2) "Destroying, defacing, or removing any natural resource or native plant, including the felling of dead trees.";
//   40E-7.521 (amended 8-28-12): "Natural Resources" means water, soils, flora and fauna; "District land" means management areas, stormwater
//   treatment areas, impoundment areas, rights-of-way and unassigned vacant tracts.
{
  id: "fp-sfwmd-lands",
  applies: (p) => is(p, "FL", "Florida") && (within(p, FORT_MYERS, 40) || within(p, FORT_LAUDERDALE, 40) || within(p, MIAMI, 40)),
  title: "South Florida Water Management District lands",
  rule: "The district's public use rule (40E-7.537) bans destroying, defacing or removing any natural resource or native plant on district land, including cutting down dead trees. The rule counts all plant life (flora) as a natural resource, and it names no exception for picking fruit, berries or mushrooms.",
  source: { label: "SFWMD: Rule 40E-7.537, General Prohibitions (amended 12 July 2006)", url: "https://www.sfwmd.gov/sites/default/files/40E-7-511_rule_public_access.pdf" },
  checked: CHECKED,
},
// SWFWMD, 40D-9.191 Plant or Animal Removal, Destruction, or Harassment (Justia, current through 24 June 2025; amended 6-23-21): "Removing,
//   destroying, or harassing animals or plants, including the felling of dead trees," "from or on District Lands is prohibited" except for
//   research, hunting and fishing authorized by permit or Special Use Authorization, or District land-management removals.
{
  id: "fp-swfwmd-lands",
  applies: (p) => is(p, "FL", "Florida") && within(p, TAMPA, 40),
  title: "Southwest Florida Water Management District lands",
  rule: "The district's land use rule (40D-9.191) bans removing, destroying or harassing plants or animals on district land, including cutting down dead trees. The only exceptions are research, hunting and fishing authorized by permit or special use authorization, and the district's own land management work.",
  source: { label: "SWFWMD: Fla. Admin. Code 40D-9.191 (amended 23 June 2021)", url: "https://regulations.justia.com/states/florida/40/40d/chapter-40d-9/section-40d-9-191/" },
  checked: CHECKED,
},
// SJRWMD, Chapter 40C-9 ("Revised November 3, 2015"): 40C-9.210 (amended 6-7-04): "All plants and animals on District Lands are protected.";
//   removal prohibited except authorized research, hunting, gathering and fishing under a permit or Special Use Authorization, and District
//   land-management removals; "the sale or harvest of wetland trees and plants is prohibited on all District Lands". SJRWMD news, "Visit
//   District lands but please don't pick the berries" (5 August 2021): "Harvesting saw palmetto berries, critical to the survival of many
//   native wildlife species, is prohibited" on public properties, "including the District's conservation lands."
{
  id: "fp-sjrwmd-lands",
  applies: (p) => is(p, "FL", "Florida") && within(p, ORLANDO, 40),
  title: "St. Johns River Water Management District lands",
  rule: "The district's land use rule (40C-9.210) protects all plants and animals on district land. Removing them is allowed only for research, hunting, gathering or fishing under a permit or special use authorization, and harvesting or selling wetland trees and plants is banned. In 2021 the district reminded visitors that harvesting saw palmetto berries is prohibited on its conservation lands.",
  source: { label: "SJRWMD: Chapter 40C-9 (revised 3 November 2015), rule 40C-9.210", url: "https://aws.sjrwmd.com/SJRWMD/permitting/40C-9.pdf" },
  checked: CHECKED,
},

// ---- County and city parks ----
// Lee County Ordinance No. 18-12, Lee County Parks and Recreation Ordinance (adopted 20 March 2018): 3.1 parks include "parks, wayside parks,
//   parkways, preserves and open spaces"; 5.1 no digging or removing "any soil, rocks, stones, trees, shrubs, plants, live shells or downed
//   timber" without a special written permit; 5.2 no picking "the flowers or seeds of any tree, plant or shrub" and no removing "any tree or
//   plant or part thereof", except in designated areas such as gardens or with the Director's permission.
{
  id: "fp-lee-county-parks",
  applies: (p) => is(p, "FL", "Florida") && within(p, FORT_MYERS, 35),
  title: "Lee County parks and preserves",
  rule: "Lee County's parks ordinance, which covers its parks, preserves and beaches, forbids removing plants, trees, shrubs, live shells or fallen wood without a written permit. It also forbids picking the flowers or seeds of any plant, or removing any plant or part of one, except in areas set aside for it such as gardens or with the parks director's permission.",
  source: { label: "Lee County Ordinance 18-12, Parks and Recreation Ordinance (adopted 20 March 2018), sections 5.1-5.2", url: "https://www.leegov.com/bocc/Ordinances/18-12.pdf" },
  checked: CHECKED,
},
// Hillsborough County, "Conservation parks and nature preserves rules" ("Last Modified: 7/7/2025"): under the general rules for all
//   Hillsborough County conservation parks and nature preserves, "All plants and animals are protected"; full ordinances in Municode
//   Chapter 38 (not read).
{
  id: "fp-hillsborough-conservation-parks",
  applies: (p) => is(p, "FL", "Florida") && within(p, TAMPA, 30),
  title: "Hillsborough County conservation parks and nature preserves",
  rule: "Hillsborough County's general rules for all its conservation parks and nature preserves say that all plants and animals are protected. The page names no exception for picking fruit, berries or mushrooms.",
  source: { label: "Hillsborough County: Conservation parks and nature preserves rules (modified 7 July 2025)", url: "https://hcfl.gov/residents/parks-and-leisure/outdoor-recreation/rules-and-expectations" },
  checked: CHECKED,
},
// Broward County Parks, Customer Code of Conduct (no date): item 12 "Defacing, destroying, altering, or otherwise vandalizing any park
//   property" including "grounds, signs, plants, trees"; item 13 "Removing, destroying, mutilating, or in any manner altering any landscape",
//   including "lawns, shrubs, plants, flowers, sand, soil, or a designated habitat area".
{
  id: "fp-broward-county-parks",
  applies: (p) => is(p, "FL", "Florida") && within(p, FORT_LAUDERDALE, 30),
  title: "Broward County parks",
  rule: "Broward County's park code of conduct prohibits removing, destroying or altering any part of the landscape, including shrubs, plants, flowers, sand, soil and habitat areas. It also prohibits damaging park plants and trees. It does not mention picking fruit or mushrooms separately.",
  source: { label: "Broward County Parks: Customer Code of Conduct (items 12-13)", url: "https://www.broward.org/parks/generalinfo/codeofconduct" },
  checked: CHECKED,
},
// City of Fort Lauderdale, Park Rules & Regulations (no date): 2.3 no person shall "pick the flowers or seeds of any tree or plant existing on
//   City property"; "Removal of any plant, flower, tree, shrub, or similar foliage from City property, parks, or park facilities", "without
//   the prior written approval of the City, is strictly prohibited"; 7.5(g) "Beach sea oat and dune plantings are protected".
{
  id: "fp-fort-lauderdale-city-parks",
  applies: (p) => is(p, "FL", "Florida") && within(p, FORT_LAUDERDALE, 12),
  title: "City of Fort Lauderdale parks and beaches",
  rule: "Fort Lauderdale's park rules forbid picking the flowers or seeds of any tree or plant on city property. Removing any plant, flower, tree or shrub from city property or parks without the city's written approval is strictly prohibited. Sea oats and dune plantings on the beach may not be cut, damaged or removed.",
  source: { label: "City of Fort Lauderdale: Park Rules & Regulations (sections 2.3, 7.5(g))", url: "https://www.parks.fortlauderdale.gov/parks/park-rules" },
  checked: CHECKED,
},
// Miami-Dade County Parks, Rules and Regulations (no page date; Code sec. 26-1), Rule 8(c): "No person shall damage or remove plants or
//   plant materials, trees or parts thereof", nor remove "any flowers, nuts, seeds, or fruits whatsoever"; "except that park personnel may
//   be empowered to make such removals"; scientists and botany students may get a permit for specimen collecting (checker: the reader had
//   "botanists"; the ordinance numbers 59-14, 86-64 and 95-82 attach to other parts of Rule 8); civil penalty for "Removal of plants or
//   plant material", $100.00 (schedule 8CC-10).
{
  id: "fp-miami-dade-county-parks",
  applies: (p) => is(p, "FL", "Florida") && within(p, MIAMI, 30),
  title: "Miami-Dade County parks",
  rule: "Miami-Dade County's park rules (Code section 26-1, Rule 8(c)) forbid damaging or removing plants, trees or any part of them, and removing any flowers, nuts, seeds or fruit at all. Only park staff may remove them, and scientists and botany students may get a special permit to collect specimens. The listed fine for removing plants is $100.",
  source: { label: "Miami-Dade County Parks: Rules and Regulations (Code sec. 26-1, Rule 8(c))", url: "https://www.miamidade.gov/global/recreation/rules-regulations.page" },
  checked: CHECKED,
},
];
