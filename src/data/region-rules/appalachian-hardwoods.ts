/**
 * Rules read from the regulator's own pages for the ecoregions "Appalachian" (appalachian) and "Central Hardwoods" (central-hardwoods): Asheville, Pittsburgh, Columbus, Indianapolis, Nashville and St. Louis.
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

export const CLOSED: ClosedSeason[] = [
// ======================= United States: North Carolina (Asheville) ======================================
// us-nc-hatchery-trout (closed-seasons.ts) reaches Asheville as a note (11 Nov 2026); us-nc-largemouth (southeastern.ts) no longer reaches it.
// source: NC Wildlife Resources Commission digest, "Mountain Trout Regulations: Counties A-M" (eregulations.com, "Last Updated: July 13, 2026"),
//   read 11 November 2026 — Buncombe County, Hatchery Supported: "Bent Creek (Rich Branch to N.C. Arboretum boundary line)", "Cane Creek
//   (S.R. 2785 bridge to S.R. 3138 bridge)", "Dillingham Creek (Corner Rock Creek to Ivy Creek)", "Ivy Creek (Ivy River) (Dillingham Creek to
//   U.S. 19-23 bridge)", "Lake Powhatan", "Reems Creek (Sugar Camp Fork to U.S. 19-23 bridge, except where posted against trespassing)",
//   "Stony Creek (confluence of Carter Creek and Mineral Creek to Dillingham Creek)", "Swannanoa River (River Walk Park in Black Mountain to
//   Wood Avenue bridge" (the entry locates the bridge at the N.C. 81 / U.S. 74A intersection in Asheville); Catch and Release/Artificial Flies
//   and Lures Only: "Carter Creek (game land portion)". Henderson County, Delayed Harvest: "North Fork Mills River (game land portion below the
//   Hendersonville watershed dam)". Haywood DH: "West Fork Pigeon River (Queen Creek to the first game land boundary upstream of Lake Logan)".
//   Madison DH: "Big Laurel Creek (N.C. 208 bridge to the U.S. 25-70 bridge)", "Shelton Laurel Creek (...)", "Spring Creek (...)". The French
//   Broad River is not listed. https://www.eregulations.com/northcarolina/fishing/mountain-trout-regulations-counties-a-m
// source: same digest, "General Mountain Trout Regulations" ("Last Updated: July 13, 2026") — Hatchery Supported: "Aug. 1, 2026 – Feb. 28, 2027",
//   "7 a.m. April 3, 2027 – July 31, 2027", closed "March 1, 2027 – April 2, 2027" "No fishing allowed", creel "7", size "None". Delayed Harvest:
//   "Oct. 1, 2026 – June 4, 2027" "No trout may be possessed", "Artificial lures with a single hook. Natural bait may not be possessed."; "No fishing
//   allowed from ½ hour after sunset on June 4, 2027, to 6:00 a.m. on June 5, 2027"; youth under 16 "from 6:00 a.m. until noon on June 5, 2027";
//   then "June 5, 2027 – July 31, 2027" creel 7. Wild Trout and Catch and Release waters: "No closed season". "all persons age 16 or older must
//   possess a valid North Carolina or Virginia fishing license to fish parkway waters". "Fishing is not allowed in Hatchery Supported Trout
//   Waters during the closed season except in" Linville Gorge and ten listed reservoirs (Lake Powhatan is not one). "Trout Fishing in
//   Undesignated Waters": no size or bait restrictions, creel seven trout a day, "with no closed season".
//   https://www.eregulations.com/northcarolina/fishing/general-mountain-trout-regulations
// source: 15A NCAC 10C .0316 Mountain Trout (Cornell LII; "Amended by North Carolina Register Volume 38, Issue 23, June 3, 2024 effective
//   8/1/2024") — undesignated waters: "The daily creel limit for trout in undesignated trout waters is seven fish." "There is no minimum size
//   limit for these fish." (h): "In designated Public Mountain Trout Waters the season for taking all species of fish is the same as the
//   trout fishing season." https://www.law.cornell.edu/regulations/north-carolina/15A-N-C-Admin-Code-10C-0316
// source: 15A NCAC 10C .0305 Largemouth Bass (Cornell LII; amended effective 1 August 2024) — (c) "There is no closed season, except in
//   waters identified in Paragraph (n) of this Rule." (Dare and Craven counties). The rule does not mention trout waters.
//   https://www.law.cornell.edu/regulations/north-carolina/15A-N-C-Admin-Code-10C-0305
// Checker, 11 November 2026: re-read all four pages. The note said the trout rule "states no season" for undesignated waters; the digest says
//   they have no closed season. us-nc-largemouth (southeastern.ts) is now kept out of the Appalachian part of North Carolina, so the
//   largemouth rule and .0316(h) are given here.
// source: NC digest, "Warm Water Game Fish Regulations" ("Last Updated: July 13, 2026") — smallmouth bass "14-inch minimum, except 2 may be less
//   than 14 inches", "5, including only 2 less than 14 inches"; muskellunge "42-inch minimum", "1"; walleye size "None", creel "8"; sauger
//   "15-inch minimum", "8"; crappie in waters west of I-77 (except Lake Chatuge) "8-inch minimum", "20 in combination"; no season stated for
//   any of them. https://www.eregulations.com/northcarolina/fishing/warm-water-game-fish-regulations
{
  id: "us-nc-asheville-trout-waters",
  countryCode: "US",
  admin1: ["NC", "North Carolina"],
  near: { lat: 35.5954, lon: -82.5508, km: 30 },
  species: [],
  closed: [],
  water: ["rivers", "lakes"],
  note: "North Carolina's 2026-27 trout rules list these designated waters near Asheville. Hatchery Supported: the Swannanoa River from Black Mountain down to the Wood Avenue bridge in Asheville, Bent Creek above the NC Arboretum, Lake Powhatan, and Cane, Reems, Ivy, Dillingham and Stony creeks. These waters are closed to all fishing, for every species, from 1 March to 2 April 2027 and reopen at 7 a.m. on 3 April 2027; 7 trout a day, no size limit. A Delayed Harvest water nearby is the North Fork Mills River in Henderson County (game land below the Hendersonville watershed dam). There, from 1 October 2026 to 4 June 2027, no trout may be kept and only single-hook artificial lures may be used. It is closed to all fishing from half an hour after sunset on 4 June to 6 a.m. on 5 June 2027, then open to anglers under 16 only until noon. Carter Creek (game land portion) is catch and release, artificial flies and lures only, with no closed season. The French Broad River is not listed as a designated trout water in Buncombe or Henderson County. In waters that are not designated, the digest allows 7 trout a day with no size limit or bait restriction, and no closed season. Largemouth bass have no closed season under the state's largemouth rule, but in designated trout waters the season for every species is the trout season. Anglers 16 and over need a North Carolina or Virginia licence to fish Blue Ridge Parkway waters. Other limits, with no season stated: smallmouth bass 5 a day, 14-inch minimum except 2 may be shorter; muskellunge 1, at least 42 inches; walleye 8, no minimum; crappie 20 combined, 8 inches minimum.",
  regulator: "NC Wildlife Resources Commission",
  source: "https://www.eregulations.com/northcarolina/fishing/mountain-trout-regulations-counties-a-m",
  checked: CHECKED,
},

// ======================= United States: Pennsylvania (Pittsburgh) =======================================
// source: 58 Pa. Code § 61.1 Commonwealth inland waters (Cornell LII; "amended December 10, 2021, effective 1/1/2022, 51 Pa.B. 7691 and 7697"),
//   read 11 November 2026 — table applies to "inland waters of this Commonwealth and the Youghiogheny Reservoir"; "WALLEYE and hybrids (Saugeye)
//   January 1-March 14; and 12:01 a.m. first Saturday in May to midnight, December 31" "15 inches 6"; "SAUGER 12 inches 6". The section does not
//   mention the Allegheny, Monongahela or Ohio rivers. https://law.cornell.edu/regulations/pennsylvania/58-Pa-Code-SS-61-1
// source (corroboration): PFBC "Commonwealth Inland Waters - 2025" (eregulations.com, "Last Updated: May 19, 2025") — walleye and saugeye "Jan. 1
//   through March 14 and May 3 through Dec. 31", "15 inches", "6" (3 May was the first Saturday in May 2025). The 2026 summary book lists walleye,
//   but its extracted table is scrambled and the 2026 row could not be read. First Saturday in May 2026 = 2 May.
// Checker, 11 November 2026: the 2026 Pennsylvania Fishing Summary's Commonwealth Inland Waters season column has one "Jan. 1 through March 14
//   and May 2 through Dec. 31" (walleye and saugeye; sizes "15 inches", "12 inches" for walleye and sauger, limits "6", "6"). 61.1(a): "It is
//   unlawful to take, catch, kill or possess fish except during the seasons specified in this section."; not a violation if a fish caught out
//   of season, from water where fishing for other species is lawful, "is immediately returned unharmed to the waters from which it was taken."
//   So the walleye gap is a closed season, not catch and release. https://www.pa.gov/content/dam/copapwp-pagov/en/fishandboat/documents/fishing/regulations/summarybook.pdf
{
  id: "us-pa-pittsburgh-walleye",
  countryCode: "US",
  admin1: ["PA", "Pennsylvania"],
  near: { lat: 40.4407, lon: -80.0026, km: 25 },
  species: ["walleye"],
  closed: [{ from: "03-15", to: "05-01" }],
  water: ["rivers", "lakes"],
  note: "Pennsylvania's inland waters rule (58 Pa. Code 61.1) and its 2026 summary open walleye and saugeye from 1 January to 14 March, and again from 12:01 a.m. on the first Saturday in May (2 May in 2026) to 31 December. Limit 6 a day, at least 15 inches. Outside the season walleye may not be taken or caught; one hooked while fishing lawfully for other species must be returned unharmed straight away. Sauger, not in this site's library, has a 12-inch minimum and a limit of 6.",
  regulator: "Pennsylvania Fish and Boat Commission (58 Pa. Code 61.1)",
  source: "https://law.cornell.edu/regulations/pennsylvania/58-Pa-Code-SS-61-1",
  checked: CHECKED,
},
// source: 58 Pa. Code § 61.1 (Cornell, as above) — bass: "January 1 to midnight the day before the second Saturday in April and October 1 to midnight
//   December 31" "15 inches 4 (combined species)"; "12:01 a.m. the second Saturday in April to 12:01 a.m. the second Saturday in June" "NO HARVEST-Catch
//   and immediate release only (No Tournaments Permitted)"; "12:01 a.m. the second Saturday in June to midnight September 30" "12 inches 6 (combined
//   species)". (The Cornell copy also has an older separate "Lakes" row; the 2025 summary has one row for all waters.)
// source: PFBC, 2026 Pennsylvania Fishing Summary (summarybook.pdf), read 11 November 2026 — "April 11 through June 12" "NO HARVEST - Catch and
//   immediate release only (no tournaments permitted)" (read in the Big Bass Program block; the extracted inland table is scrambled); "a bass is
//   immediately returned unharmed to the waters from which it was taken"; "navigational dam pools on the Ohio River drainage are “rivers.”"
//   https://www.pa.gov/content/dam/copapwp-pagov/en/fishandboat/documents/fishing/regulations/summarybook.pdf
//   In 2026 the second Saturday in April is 11 April and the second Saturday in June is 13 June, matching the summary's 11 April – 12 June.
// Checker, 11 November 2026: the summary's inland table heads its second species "BASS - Lakes, Rivers and Streams" and its first non-trout
//   seasons are "Jan. 1 through April 10 and Oct. 1 through Dec. 31", "April 11 through June 12", "June 13 through Sept. 30", with only two bass
//   sizes ("15 inches", "12 inches") and limits ("4", "6"), so the middle period has no harvest; page 11: "From April 11 to June 12: No
//   tournaments permitted." The code's dated "Lakes" block (first Saturday after April 11) is not in the 2026 summary.
{
  id: "us-pa-pittsburgh-bass",
  countryCode: "US",
  admin1: ["PA", "Pennsylvania"],
  near: { lat: 40.4407, lon: -80.0026, km: 25 },
  species: ["largemouth-bass", "smallmouth-bass"],
  closed: [],
  noKeep: [{ from: "04-11", to: "06-12" }],
  water: ["rivers", "lakes"],
  note: "Pennsylvania's inland bass seasons cover the whole year. From 1 January to 10 April and 1 October to 31 December, bass must be at least 15 inches, 4 a day combined. From 11 April to 12 June 2026 (second Saturday in April to the day before the second Saturday in June) it is catch and immediate release only, with no tournaments. From 13 June to 30 September the minimum is 12 inches, 6 a day. Releasing a bass unharmed straight away does not break the bass rules. The 2026 summary says the navigation pools of the Ohio River drainage count as rivers. Some lakes have special bass rules.",
  regulator: "Pennsylvania Fish and Boat Commission",
  source: "https://www.pa.gov/content/dam/copapwp-pagov/en/fishandboat/documents/fishing/regulations/summarybook.pdf",
  checked: CHECKED,
},
// source: 58 Pa. Code § 61.1 (Cornell, as above) — "MUSKELLUNGE and MUSKELLUNGE HYBRIDS Open year-round 40 inches 1"; "STRIPED BASS and STRIPED
//   BASS/WHITE BASS HYBRIDS Open year-round 20 inches 2 (combined species)"; "SUNFISH, YELLOW PERCH, CRAPPIES, CATFISH, ROCK BASS, SUCKERS, CARP,"
//   "WHITE BASS AND OTHER GAMEFISH NOT OTHERWISE LISTED" "Open year-round No minimum 50 (combined species)".
// source: 2026 Pennsylvania Fishing Summary — muskellunge footnote "* Except those species in waters listed in the Brood Stock Lakes Program.";
//   Brood Stock Lakes: "From April 1 through May 31, fishing for these species is permitted on a catch and release/no harvest basis."; panfish:
//   "Additional regulations may apply- see Panfish Enhancement Special Regulations-page 15." (2025 eregulations edition: same three "Open year-round".)
{
  id: "us-pa-pittsburgh-open",
  countryCode: "US",
  admin1: ["PA", "Pennsylvania"],
  near: { lat: 40.4407, lon: -80.0026, km: 25 },
  species: ["muskellunge", "striped-bass", "black-crappie", "bluegill", "yellow-perch", "channel-catfish", "common-carp"],
  closed: [],
  water: ["rivers", "lakes"],
  note: "Pennsylvania's inland waters rule (58 Pa. Code 61.1) lists these as open year-round. Muskellunge and hybrids: 1 a day, at least 40 inches. On Brood Stock Lakes they are catch and release only from 1 April to 31 May. Striped bass and striped-white bass hybrids: 2 a day combined, at least 20 inches. Sunfish, yellow perch, crappies, catfish, carp, white bass and other gamefish not otherwise listed: 50 a day combined, no minimum size. Panfish Enhancement waters have their own limits.",
  regulator: "Pennsylvania Fish and Boat Commission (58 Pa. Code 61.1)",
  source: "https://law.cornell.edu/regulations/pennsylvania/58-Pa-Code-SS-61-1",
  checked: CHECKED,
},
// source: 2026 Pennsylvania Fishing Summary — "TROUT OPENER April 4 Statewide"; "MENTORED YOUTH TROUT DAY March 28 (Statewide)"; "April 4 at 8 a.m.
//   through Sept. 7", "7 inches"; "Extended Season: Stocked trout waters Jan. 1 through Feb. 15 and Sept. 8 through Dec. 31"; "Extended Season: Waters
//   not managed as stocked trout waters Jan. 1 through Feb. 15 and Sept. 8 through Dec. 31"; "Stocked trout waters are closed to fishing from
//   February 16 to the opening day of the regular trout season in April" "unless included in the Stocked Trout Waters Open to Year-Round Fishing
//   Program"; "It is legal to fish for trout in Class A streams year-round, with no harvest beginning the day after Labor Day."; youth on Mentored
//   Youth Trout Day "may harvest up to two trout (combined species) with a minimum size of 7 inches."
// source: PFBC news release, 1 April 2026, "Opening Day of Trout Season This Saturday, April 4" — "Anglers can begin fishing at 8 a.m."; "anglers
//   may keep up to five trout (combined species) per day measuring at least seven inches long."; "During an extended season from September 8, 2026,
//   through February 15, 2027, the daily limit is three trout." https://www.pa.gov/agencies/fishandboat/newsroom/opening-day-trout-season-this-saturday-april4-apr2026
//   Not loaded as closed: stocked waters, Class A streams and Year-Round Program waters have different rules and cannot be told apart by a circle.
{
  id: "us-pa-pittsburgh-trout-note",
  countryCode: "US",
  admin1: ["PA", "Pennsylvania"],
  near: { lat: 40.4407, lon: -80.0026, km: 25 },
  species: [],
  closed: [],
  water: ["rivers", "lakes"],
  note: "Pennsylvania's 2026 regular trout season opened at 8 a.m. on 4 April and ran to Labor Day (7 September): 5 trout a day combined, at least 7 inches. The extended season runs from 8 September 2026 to 15 February 2027 with a limit of 3. Stocked trout waters are closed to all fishing from 16 February until the opener (8 a.m. on 4 April in 2026), unless they are in the Stocked Trout Waters Open to Year-Round Fishing Program. Class A wild trout streams may be fished for trout all year, but none may be kept from the day after Labor Day until the next opener. On Mentored Youth Trout Day (28 March 2026), youths could keep 2 trout of at least 7 inches. The pages do not list which waters around Pittsburgh are stocked, so no closing dates are loaded.",
  regulator: "Pennsylvania Fish and Boat Commission",
  source: "https://www.pa.gov/content/dam/copapwp-pagov/en/fishandboat/documents/fishing/regulations/summarybook.pdf",
  checked: CHECKED,
},

// ======================= United States: Ohio (Columbus) ===================================================
// source: Ohio DNR Division of Wildlife, 2026-27 Ohio Fishing Regulations (Publication 5085), "March 1, 2026 to February 28, 2027", read 11 November
//   2026 — no season statement for inland waters; statewide: "Largemouth, Smallmouth, & Spotted Bass 5 (singly or in combination) 12 inches";
//   "Muskellunge 1 None"; "Striped, Hybrid-Striped, & White Bass 30 (singly or in combination) No more than 4 over 15 inches"; "Trout 5 (singly or in
//   combination) None"; "Walleye, Sauger, & Saugeye 6 (singly or in combination) None"; "Channel Catfish (28 inches or larger) 1 (statewide) 28
//   inches". Crappie 30 daily, 9-inch minimum at "Hoover", "Alum Creek Lake", "O'Shaughnessy", "Delaware (including the Olentangy River upstream to
//   the Waldo dam, and Whetstone Creek upstream to State Route 229)". "The Ohio Department of Health recommends limiting fish consumption to one meal
//   per week" "unless a specific advisory is listed for a water body or type of fish." No advisory is named for the Scioto or Olentangy.
//   https://dam.assets.ohio.gov/image/upload/ohiodnr.gov/documents/wildlife/laws-regs-licenses/OhioFishingRegs_English.pdf
// source: OAC 1501:31-13-08 "Fish daily bag limits: protected species." (authenticated PDF, effective July 6, 2026) — "there is no daily bag limit for
//   the following species of fish statewide: crappie"; (L) 30 crappie in "Hoover reservoir in Franklin and Delaware counties upstream on Big Walnut
//   creek", "Alum Creek lake in Delaware county upstream to the state route 521 bridge in Kilbourne", "O'Shaughnessy reservoir in Delaware county
//   upstream in the Scioto river to the old bridge abutments". No season statement.
//   https://codes.ohio.gov/assets/laws/administrative-code/authenticated/1501/31/13/1501$31-13-08_20260706.pdf
// Checker, 11 November 2026: both re-read; Delaware Lake (about 44 km north) is outside the 30 km circle, so it is no longer named.
{
  id: "us-oh-columbus-note",
  countryCode: "US",
  admin1: ["OH", "Ohio"],
  near: { lat: 39.9623, lon: -83.0007, km: 30 },
  species: [],
  closed: [],
  water: ["rivers", "lakes"],
  note: "Ohio's 2026-27 fishing regulations (valid 1 March 2026 to 28 February 2027) give no season for inland waters, so no dates are loaded. Statewide daily limits:\n- Black bass: 5, at least 12 inches.\n- Muskellunge: 1, no minimum.\n- Walleye, sauger and saugeye: 6 combined, no minimum.\n- Striped, hybrid and white bass: 30, no more than 4 over 15 inches.\n- Trout: 5, no minimum.\n- Channel catfish: only 1 of 28 inches or more.\nCrappie have no statewide limit. At Hoover Reservoir, Alum Creek Lake and O'Shaughnessy Reservoir (with the Scioto upstream), the limit is 30 a day, at least 9 inches. Ohio's Department of Health advises eating no more than one meal of sport fish a week unless a water has its own advisory; none is named for the Scioto or Olentangy.",
  regulator: "Ohio DNR Division of Wildlife",
  source: "https://dam.assets.ohio.gov/image/upload/ohiodnr.gov/documents/wildlife/laws-regs-licenses/OhioFishingRegs_English.pdf",
  checked: CHECKED,
},

// ======================= United States: Indiana (Indianapolis) ============================================
// source: Indiana DNR, "Inland Trout Regulations" (eregulations.com, "Last Updated: February 19, 2026"; links the 2026 guide 26INFW_LR.pdf), read
//   11 November 2026 — "There is no closed season for taking trout from inland lakes."; bag "5, any combination of brook, rainbow, or brown trout; no
//   more than one may be brown trout"; "no minimum size limit for trout caught from lakes" except brown trout in named LaGrange County lakes and the
//   Brookville Lake tailwater. No water in Marion, Hamilton or Hendricks County is named. https://www.eregulations.com/indiana/fishing/inland-trout-regulations
{
  id: "us-in-indianapolis-trout-lakes",
  countryCode: "US",
  admin1: ["IN", "Indiana"],
  near: { lat: 39.7683, lon: -86.1584, km: 40 },
  species: ["rainbow-trout", "brown-trout", "brook-trout"],
  closed: [],
  water: ["lakes"],
  note: "Indiana DNR says there is no closed season for taking trout from inland lakes. The limit is 5 trout a day, of which no more than one may be a brown trout. There is no minimum size in lakes, apart from 18-inch brown trout rules on a few named waters far from Indianapolis. Lake Michigan has its own rules.",
  regulator: "Indiana DNR Division of Fish and Wildlife",
  source: "https://www.eregulations.com/indiana/fishing/inland-trout-regulations",
  checked: CHECKED,
},
// source: same trout page — "The opening day of trout season for inland streams is 6 a.m. local time on the last Saturday in April." (25 April 2026);
//   closed season from April 15 to opening day "while DNR staff complete the annual trout stockings" on the streams it lists (none near
//   Indianapolis); "Catch-and-release applies to all trout streams from Jan. 1 through April 14."
// source: Indiana DNR, Fishing Regulations (eregulations.com, "Last Updated: October 20, 2026"; 2026-27 guide) — no statewide season statement;
//   black bass lakes 5, 14 inches; rivers and streams 5, "No fish 12 to 15 inches may be kept, and no more than two fish over 15 inches may be kept.";
//   muskellunge and tiger muskie 1, 36 inches; walleye/sauger/saugeye 6 combined, walleye 14 inches south of SR 26 and 16 inches north of it; striped
//   bass 2; white and hybrid striped bass 12, "No more than two fish may exceed 17 inches."; crappie 25 [page shows "257", footnote 7]; channel catfish
//   in rivers and streams 13-inch minimum; Flat Fork Creek Park ponds A and B (Hamilton County): 5 channel catfish, 2 largemouth "at least 18 inches
//   long", 15 bluegill, redear and crappie combined. Eagle Creek, Geist, Morse and Fall Creek are not named. https://eregulations.com/indiana/fishing/fishing-regulations
{
  id: "us-in-indianapolis-note",
  countryCode: "US",
  admin1: ["IN", "Indiana"],
  near: { lat: 39.7683, lon: -86.1584, km: 35 },
  species: [],
  closed: [],
  water: ["rivers", "lakes"],
  note: "Indiana's 2026-27 regulations state no season for bass, walleye, muskellunge, crappie or catfish, so no dates are loaded for them. Trout in inland streams open at 6 a.m. on the last Saturday in April (25 April in 2026). Trout streams are catch and release only from 1 January to 14 April, and the streams the DNR lists (none near Indianapolis) are closed from 15 April to the opener. Daily limits:\n- Black bass in lakes: 5, at least 14 inches.\n- Black bass in rivers and streams: 5; none from 12 to 15 inches may be kept, and no more than 2 over 15 inches.\n- Muskellunge and tiger muskie: 1, at least 36 inches.\n- Walleye, sauger and saugeye: 6 combined; walleye at least 14 inches south of State Road 26 (16 inches north of it).\n- Striped bass: 2.\n- White and hybrid striped bass: 12, no more than 2 over 17 inches.\n- Crappie: 25.\n- Channel catfish in rivers and streams: at least 13 inches.\nAt the Flat Fork Creek Park ponds in Hamilton County, the limits are 2 largemouth of at least 18 inches, 5 channel catfish, and 15 bluegill, redear and crappie combined.",
  regulator: "Indiana DNR Division of Fish and Wildlife",
  source: "https://eregulations.com/indiana/fishing/fishing-regulations",
  checked: CHECKED,
},

// ======================= United States: Tennessee (Nashville) =============================================
// source: TWRA, Statewide Limits & Regulations (eregulations.com, "Last Updated: September 15, 2026"), read 11 November 2026 — black bass 5 combined,
//   no minimum; crappie 15, 10 inches (Region 1: 30, none); striped/hybrid 2 combined, 15 inches; white bass 15; muskellunge 1, 36 inches; sauger 10,
//   15 inches; walleye 5, 16 inches; trout 7, no more than 2 lake trout; catfish one over 34 inches a day; "Paddlefish may be harvested from April 24
//   through May 31." No closed season or year-round statement for game fish. https://www.eregulations.com:443/tennessee/fishing/statewide-limits-regulations
// source: TWRA, "Statewide Regulations and Creel and Length Limits" (tn.gov, lastModified 22 Oct 2026) — same limits; "Season open year-round in all
//   waters except:" applies only to gigging, snagging and archery. https://www.tn.gov/twra/fishing-regs/statewide-creel-length-limits.html
// source: TWRA "Region 2" (eregulations.com, "Last Updated: September 11, 2026") — "Reservoir full pool elevation is the boundary between reservoir and
//   tributary streams or rivers for harvest restrictions."; Cheatham ("Includes Stones River up to J. Percy Priest Dam."): largemouth "14 inch minimum
//   length limit", smallmouth "18 inch", striped/hybrid "2 per day in combination, 15 inch", crappie "30 per day in combination, 10 inch", walleye
//   "Five (5) per day, 16 inch", sauger "10 per day, 15 inch", paddlefish "season is open from April 24 through May 31"; Old Hickory: the same
//   (largemouth 14, smallmouth 18); Percy Priest: largemouth "15 inch", smallmouth "18 inch", striped/hybrid 2, 15 inches, crappie 30, 10 inches.
//   https://www.eregulations.com/tennessee/fishing/region-2
// source: TWRA, Statewide Fishing Regulation Exceptions (tn.gov, lastModified 22 Oct 2026) — Stones River "Confluence with the Cumberland River upstream
//   to J. Percy Priest Dam" "Regulations for Cheatham Reservoir apply."; Cedar Hill Pond (Nashville): black bass "One (1) per day, no size limit",
//   catfish 5, crappie 30, bluegill and redear 20 combined, trout 5. https://www.tn.gov/content/tn/twra/fishing-regs/fishing-regulation-exceptions.html
// source: TWRA, Tennessee Trout Regulations (lastModified 22 Oct 2026) — no rules for any Cumberland River tailwater; Caney Fork (Center Hill Dam to the
//   Cumberland): 5 trout, rainbow/brook/cutthroat "14–20 inch PLR", brown trout "One (1) per day, 24-inch minimum". https://www.tn.gov/twra/fishing-regs/trout-regulations.html
// source: TDEC, Radnor Lake Class II Natural-Scientific State Natural Area (no date) — "Fishing: No".
{
  id: "us-tn-nashville-note",
  countryCode: "US",
  admin1: ["TN", "Tennessee"],
  near: { lat: 36.1623, lon: -86.7743, km: 30 },
  species: [],
  closed: [],
  water: ["rivers", "lakes"],
  note: "TWRA's 2026 pages give limits but no season for bass, crappie, striped bass, walleye, sauger, muskellunge, trout or catfish, so no dates are loaded. On Cheatham Reservoir (with the Stones River up to Percy Priest Dam) and Old Hickory Reservoir, daily limits are: black bass 5 combined, largemouth at least 14 inches and smallmouth at least 18 inches; striped and hybrid bass 2 combined, at least 15 inches; crappie 30, at least 10 inches; walleye 5, at least 16 inches; sauger 10, at least 15 inches. On Percy Priest the largemouth minimum is 15 inches, with the same striped bass and crappie limits. Elsewhere the statewide limits apply: crappie 15 at 10 inches, muskellunge 1 at 36 inches, trout 7, and only one catfish over 34 inches a day. Paddlefish, not in this site's library, may be kept only from 24 April to 31 May. Cedar Hill Pond allows 1 black bass and 5 trout a day. TWRA lists no trout rules for the Cumberland River near Nashville. Fishing is not allowed at Radnor Lake State Natural Area.",
  regulator: "Tennessee Wildlife Resources Agency",
  source: "https://www.eregulations.com/tennessee/fishing/region-2",
  checked: CHECKED,
},

// ======================= United States: Missouri (St. Louis) ==============================================
// Not repeated: us-mo-impoundment-bass and us-mo-crappie-catfish-carp (great-plains.ts), which are statewide and reach St. Louis.
// source: MDC, "Walleye & Sauger: Regulations" (mdc.mo.gov; no date, copyright 2026), read 11 November 2026 — season "Jan 01, 2026 - Dec 31, 2026";
//   daily 4, possession 8, "minimum 15""; "Limits apply on all waters except on areas with special regulations". No closed season.
//   https://mdc.mo.gov/fishing/species/walleye-sauger
{
  id: "us-mo-stl-walleye",
  countryCode: "US",
  admin1: ["MO", "Missouri"],
  near: { lat: 38.6254, lon: -90.19, km: 30 },
  species: ["walleye"],
  closed: [],
  water: ["rivers", "lakes"],
  note: "The Missouri Department of Conservation gives walleye and sauger a 2026 season of 1 January to 31 December, the whole year. The limit is 4 a day (8 in possession), at least 15 inches, except on waters with special regulations. On the Mississippi, the Illinois side follows Illinois rules.",
  regulator: "Missouri Department of Conservation",
  source: "https://mdc.mo.gov/fishing/species/walleye-sauger",
  checked: CHECKED,
},
// source: MDC, Fishing Seasons and Limits (mdc.mo.gov/fishing/seasons; 2026 table; "This is NOT a legal document."), read 11 November 2026 — "White,
//   yellow, striped bass and hybrids": "January 1, 2026 to December 31, 2026", daily 15, possession 30, "You may keep up to four fish longer than 18”
//   per day."; Muskellunge: "January 1, 2026 to December 31, 2026", "Daily limit: 1 muskellunge or 1 northern pike", "minimum 36"".
//   https://mdc.mo.gov/fishing/seasons
{
  id: "us-mo-stl-striped-muskie",
  countryCode: "US",
  admin1: ["MO", "Missouri"],
  near: { lat: 38.6254, lon: -90.19, km: 30 },
  species: ["striped-bass", "muskellunge"],
  closed: [],
  water: ["rivers", "lakes"],
  note: "Missouri's 2026 seasons table lists white, yellow and striped bass and their hybrids, and muskellunge, as open from 1 January to 31 December 2026. White, yellow and striped bass and hybrids: 15 a day, no more than 4 longer than 18 inches. Muskellunge: 1 a day (or 1 northern pike), at least 36 inches. MDC says the table is a summary, not the legal text. On the Mississippi, the Illinois side follows Illinois rules.",
  regulator: "Missouri Department of Conservation",
  source: "https://mdc.mo.gov/fishing/seasons",
  checked: CHECKED,
},
// source: MDC, Fishing Regulations (mdc.mo.gov; copyright 2026), read 11 November 2026 — "Black bass fishing and possession is open year-round on the
//   Mississippi River," "all waters north of the south bank of the Missouri River," "the St. Francis River downstream from Wappapello Dam," and
//   streams in a southeast Missouri area bounded by a line from Cape Girardeau; "In the rest of the state, black bass from streams may not be
//   possessed March 1 - May 22, 2026." "Only catch-and-release fishing for black bass is allowed during this time in this area of the state."
//   (Checker, 11 November 2026: the reader had only the first clause; with the full sentence the Missouri River at St. Louis is in the
//   year-round area, and the Meramec, south of the Missouri and far from the southeast area, is not.) "You must be licensed in
//   Missouri to fish in Missouri tributaries of the Mississippi, Missouri and St. Francis rivers."; Illinois/Mississippi: "Must abide by the most
//   restrictive of the two states' regulations when fishing the other state's waters."; Forest Park: Catfish Cove, Cypress and Fishtail "Closed to
//   public fishing. Reserved for aquatic education programs only."; "Statewide regulations apply for all St. Louis area lakes, except for those listed
//   below." https://mdc.mo.gov/fishing/regulations
// source: MDC, Reciprocal Fishing Privileges (copyright 2026) — Illinois, Mississippi River: "May fish in the flowing waters of either state."; "May fish in
//   either state's adjacent backwaters and shared oxbow lakes."; "Must abide by the regulations of the state in which you are fishing, regardless of
//   where you are licensed." https://mdc.mo.gov/fishing/regulations/reciprocal-fishing-privileges
// source: MDC seasons table — nongame line methods "Daily limit: 50, except on the Mississippi River which has a daily and possession limit of 100."
//   Seasons table, black bass: "Non-Ozark Streams" January 1 to December 31, 2026; "Ozark Streams" "May 23, 2026 to February 28, 2027".
//   No stream black bass dates are loaded: the circle takes in the Mississippi and Missouri (open all year) as well as the Meramec.
{
  id: "us-mo-stl-notes",
  countryCode: "US",
  admin1: ["MO", "Missouri"],
  near: { lat: 38.6254, lon: -90.19, km: 30 },
  species: [],
  closed: [],
  water: ["rivers", "lakes"],
  note: "MDC says black bass may be fished for and kept all year on the Mississippi River and on all waters north of the Missouri River's south bank, which takes in the Missouri River at St. Louis. Streams south of the Missouri here, such as the Meramec, are outside that area: there, black bass from streams may not be kept from 1 March to 22 May 2026, and only catch and release is allowed. Under the Missouri-Illinois arrangement, anglers licensed in either state may fish the Mississippi's flowing waters, its backwaters and shared oxbow lakes. They must follow the rules of the state whose water they are in, and the stricter of the two states' rules in the other state's water. To fish Missouri tributaries you need a Missouri licence. In Forest Park, Catfish Cove, Cypress and Fishtail lakes are closed to public fishing (kept for education programmes), and MDC lists other St. Louis area lakes with their own limits. Nongame fish taken on lines: 100 a day on the Mississippi, 50 elsewhere.",
  regulator: "Missouri Department of Conservation",
  source: "https://mdc.mo.gov/fishing/regulations",
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

const ASHEVILLE = { lat: 35.5954, lon: -82.5508 };
const PITTSBURGH = { lat: 40.4407, lon: -80.0026 };
const COLUMBUS = { lat: 39.9623, lon: -83.0007 };
const NASHVILLE = { lat: 36.1623, lon: -86.7743 };

export const LAND: LandRule[] = [
// ---- North Carolina (Asheville) ----  (se-nc-state-parks in southeastern.ts is statewide and already reaches Asheville)
// NPS, Blue Ridge Parkway compendium, "36 CFR §2.1" ("Last updated: January 14, 2026"): "(c)(1), Fruits, berries, and nuts. Climbing trees to gather
//   fruits and nuts is prohibited."; "One gallon per person, per day, of the following edible fruits, berries, and nuts may be gathered" "for personal
//   use or consumption:" "Mushrooms and related edible fungi", blueberries, strawberries, blackberries/raspberries/wine berries, grapes, elderberries,
//   gooseberries/currants, huckleberries, cherries/plums, serviceberries; "One bushel per person, per day" of persimmons, black walnuts, hickory nuts,
//   American hazelnut, apples, pears, peaches; "Collection of American Chestnut burrs and/or seeds is prohibited."
{
  id: "ah-blue-ridge-parkway",
  applies: (p) => is(p, "NC", "North Carolina") && within(p, ASHEVILLE, 40),
  title: "Blue Ridge Parkway (National Park Service)",
  rule: "The Parkway's compendium lets each person gather, for their own use or to eat, up to one gallon a day of edible mushrooms and other fungi, blueberries, strawberries, blackberries, raspberries, wineberries, grapes, elderberries, gooseberries, currants, huckleberries, cherries, plums and serviceberries. It also allows up to one bushel a day of persimmons, black walnuts, hickory nuts, American hazelnuts, apples, pears and peaches. Climbing trees to reach fruit or nuts is prohibited, and so is collecting American chestnut burrs or seeds.",
  source: { label: "NPS: Blue Ridge Parkway compendium, 36 CFR 2.1 (page updated 14 January 2026)", url: "https://www.nps.gov/blri/learn/management/compendium-cfr-2-1.htm" },
  checked: CHECKED,
},
// NPS, Great Smoky Mountains NP Superintendent's Compendium (checker, 11 November 2026: the page is now headed "2026 SUPERINTENDENT'S COMPENDIUM";
//   no 2024 date or October 2025 amendment appears on it; the 2.1(c) text below is unchanged): "The following fruits, berries, nuts, and above ground fruiting bodies of certain fungi may be gathered" "by hand for personal use or
//   consumption (commercial use is prohibited):"; mushrooms "at least 100 feet away from roads, parking areas, picnic areas, campgrounds, structures,
//   or other facilities", "must be edible species only", "may only be the fruiting bodies growing on soil or rotting logs on the ground", "are limited
//   to 1 pound per person per day for all fungal species combined", not "from trees that are standing, including dead standing trees, or where
//   fruiting bodies are underground"; (c)(2)(i) "shall not exceed 1 pound per person per day for each species, except for apples, pears, and peaches";
//   no "climbing trees, using stools or ladders"; prohibited "within 200 feet of nature trails," "motor nature trails, handicapped accessible trails and
//   scientific and natural study areas"; "The collection of ramps is not allowed under 36 CFR or 54 USC."
{
  id: "ah-great-smoky-mountains",
  applies: (p) => is(p, "NC", "North Carolina") && within(p, ASHEVILLE, 60),
  title: "Great Smoky Mountains National Park (National Park Service)",
  rule: "The park's compendium lets visitors gather certain fruits, berries and nuts by hand for their own use, never for sale, up to 1 pound of each kind per person a day (apples, pears and peaches excepted). The list includes blueberries, strawberries, blackberries, black raspberries, grapes, elderberries, huckleberries, cherries, serviceberries, persimmons, black walnuts, hickory nuts, hazelnuts and red mulberries. Edible mushrooms may be picked only from soil or rotting logs on the ground, at least 100 feet from roads, parking areas, picnic areas, campgrounds and buildings. The limit is 1 pound per person a day for all fungi together, and none may come from standing trees or from underground. Nothing may be gathered within 200 feet of nature trails, motor nature trails, accessible trails or study areas. Climbing trees and using stools or ladders are prohibited, and ramps may not be collected.",
  source: { label: "NPS: Great Smoky Mountains National Park, 2026 Superintendent's Compendium, 36 CFR 2.1(c)", url: "https://www.nps.gov/grsm/learn/management/compendium.htm" },
  checked: CHECKED,
},
// USDA Forest Service, National Forests in North Carolina, "Forest Products Permits" (no date): "You do not need a permit to collect small amounts of:"
//   fruits and nuts, pinecones, mushrooms, some flowers and vegetation; "You cannot collect any portion of the American ginseng plant for personal or
//   commercial use."; "You cannot cut Christmas trees on the National Forests in North Carolina."; "Campers on national forest lands may collect firewood
//   without a permit while camping."; private land is "behind ONE red blaze", National Forest land "behind TWO red blazes". The page does not name
//   Pisgah or Nantahala.
{
  id: "ah-nc-national-forests-pisgah",
  applies: (p) => is(p, "NC", "North Carolina") && within(p, ASHEVILLE, 50),
  title: "Pisgah National Forest (National Forests in North Carolina, USDA Forest Service)",
  rule: "The Forest Service says no permit is needed to collect small amounts of fruits and nuts, pinecones, mushrooms and some flowers and vegetation for personal use in the National Forests in North Carolina; collecting any forest product in bulk or for sale needs a permit. No part of an American ginseng plant may be collected, for personal or commercial use, and Christmas trees may not be cut. Campers may gather wood from the ground for their campfire. Land behind one red blaze is private; national forest land is behind two.",
  source: { label: "USDA Forest Service: National Forests in North Carolina, Forest Products Permits", url: "https://fs.usda.gov/r08/northcarolina/permits/forest-products-permits" },
  checked: CHECKED,
},

// ---- Pennsylvania (Pittsburgh) ----
// Allegheny County, Parks Policies and Regulations (ordinance "effective as of March 27, 2006"; footer © 2026), Article I, Section 2: "Picking,
//   cutting, breaking, digging, defacing, injuring or removing" "Shrubs, flowers, trees, fungi, grass, turf, soil, rock formations, minerals or other
//   natural and cultural resources"; "Exceptions to these prohibitions will be recognized only upon possession and presentation of a written authorization"
//   "signed by the Director of the Parks Department," "by signs posted by authorized representatives of the Director," or "by immediate direction of a
//   county police officer." (Checker, 11 November 2026: the row named only the written authorization.)
{
  id: "ah-allegheny-county-parks",
  applies: (p) => is(p, "PA", "Pennsylvania") && within(p, PITTSBURGH, 35),
  title: "Allegheny County parks",
  rule: "Allegheny County's park rules prohibit picking, cutting, breaking, digging, injuring or removing shrubs, flowers, trees, fungi, grass, soil, rock or other natural resources in county parks. The rules name no exception for berries, nuts or mushrooms. Exceptions are recognized only with a written authorization signed by the Parks Director, by signs the Director's representatives post, or at a county police officer's direction.",
  source: { label: "Allegheny County: Parks Policies and Regulations (ordinance effective 27 March 2006), Article I, Section 2", url: "https://www.alleghenycounty.us/Parks-and-Events/Parks/About-County-Parks/Resources/Parks-Policies-and-Regulations" },
  checked: CHECKED,
},
// 17 Pa. Code § 11.211 Natural resources (Cornell LII; no history line): (a)(1) prohibited without written permission: "Cutting, picking, digging,
//   damaging or removing, in whole or in part, a living or dead tree, shrub or plant."; (b)(1) permitted: "Gathering edible fruits, nuts, berries and
//   fungi, in reasonable amounts, for one's own personal or family consumption." "This permission does not apply to wild plants listed in Chapter 45"
//   "as threatened, endangered, rare or vulnerable." (Philadelphia's row ne-... is limited to 40 km of Philadelphia.)
{
  id: "ah-pa-state-parks-pittsburgh",
  applies: (p) => is(p, "PA", "Pennsylvania") && within(p, PITTSBURGH, 80),
  title: "Pennsylvania state parks (DCNR)",
  rule: "Pennsylvania's state park rules (17 Pa. Code 11.211) prohibit cutting, picking, digging, damaging or removing any living or dead tree, shrub or plant without the Department's written permission. They allow gathering edible fruits, nuts, berries and fungi in reasonable amounts for your own or your family's use. The exception does not cover plants listed as threatened, endangered, rare or vulnerable.",
  source: { label: "17 Pa. Code § 11.211, Natural resources (Cornell LII)", url: "https://www.law.cornell.edu/regulations/pennsylvania/17-Pa-Code-SS-11-211" },
  checked: CHECKED,
},
// DCNR, Pennsylvania State Forests Rules and Regulations (no date; © 2026): prohibited without written DCNR permission: "Cutting, picking, digging,
//   damaging, or removing (in whole or in part) a living or dead plant, vine, shrub", also fungus, lichen and moss; "Removing peat, bark, mulch, pine
//   straw, or other natural resources"; permitted: "Gathering edible wild plants or plant parts for an individual's personal or family consumption"
//   "unless the plant is listed in Chapter 45" "as threatened, endangered, rare or vulnerable."
{
  id: "ah-pa-state-forests-pittsburgh",
  applies: (p) => is(p, "PA", "Pennsylvania") && within(p, PITTSBURGH, 80),
  title: "Pennsylvania state forests (DCNR)",
  rule: "DCNR's state forest rules prohibit cutting, picking, digging, damaging or removing any living or dead plant, vine or shrub, or any fungus, lichen or moss, without DCNR's written permission. They allow gathering edible wild plants or plant parts for your own or your family's use, unless the plant is listed as threatened, endangered, rare or vulnerable. The page does not say whether edible mushrooms count as edible wild plants.",
  source: { label: "DCNR: Pennsylvania State Forests Rules and Regulations", url: "https://www.pa.gov/agencies/dcnr/recreation/where-to-go/state-forests/rules-and-regulations.html" },
  checked: CHECKED,
},

// ---- Ohio (Columbus) ----  (the great-lakes-st-lawrence.ts Ohio row is limited to that region)
// OAC 1501:46-3-10 "Removal of plants and other natural materials." (effective June 30, 2024): "it is unlawful to willfully or negligently pick, dig up,
//   cut, mutilate, destroy, injure, disturb, move," ... "any tree or plant or portion thereof"; "Pine cones on the ground, berries, fruit, tree nuts,
//   mushrooms, and naturally-shed antlers may be carried away" "during daylight hours from any area except any area where a restriction against such
//   activities has been posted." "Such taking may be done for personal use only and not for commercial purposes."
{
  id: "ah-ohio-state-parks-columbus",
  applies: (p) => is(p, "OH", "Ohio") && within(p, COLUMBUS, 80),
  title: "Ohio state parks (Division of Parks and Watercraft)",
  rule: "Ohio Administrative Code 1501:46-3-10 makes it unlawful to willfully or negligently pick, dig up, cut or destroy any tree or plant, or part of one, unless a permit for scientific or educational work has been issued. Pine cones on the ground, berries, fruit, tree nuts, mushrooms and shed antlers may be taken in daylight for personal use only, not for sale, except where a posted sign forbids it.",
  source: { label: "Ohio Administrative Code 1501:46-3-10 (effective 30 June 2024)", url: "https://codes.ohio.gov/ohio-administrative-code/rule-1501:46-3-10" },
  checked: CHECKED,
},
// Franklin County Metropolitan Park District, Rules and Regulations (adopted 12 March 2019, effective 1 May 2019), Rule 1.1: "Persons shall utilize any
//   Park in such a way as to not injure, deface, destroy, or remove any natural feature" "including but not limited to bone, fungi, plant, or part
//   thereof" "with the exception of collecting leaves, mushrooms, fruits, or seeds in general picnic areas and other regularly mowed surfaces" "nor
//   shall any rock or mineral or any historical or archaeological feature be removed, destroyed or disturbed" "except as authorized by a special permit
//   issued by the Executive Director." (Checker, 11 November 2026: the mowed-surfaces words were missing, and the permit clause follows the rock and
//   mineral clause, so the row no longer offers it as a way to collect plants.)
{
  id: "ah-columbus-metro-parks",
  applies: (p) => is(p, "OH", "Ohio") && within(p, COLUMBUS, 40),
  title: "Columbus and Franklin County Metro Parks",
  rule: "Metro Parks' rules (Rule 1.1, in force since 1 May 2019) forbid injuring, defacing, destroying or removing any natural feature, including fungi, plants or parts of plants. The exception is collecting leaves, mushrooms, fruits or seeds in general picnic areas and other regularly mowed areas. Rocks, minerals and historical or archaeological features may not be removed or disturbed except under a special permit from the Executive Director.",
  source: { label: "Franklin County Metropolitan Park District: Rules and Regulations (effective 1 May 2019), Rule 1.1", url: "https://Www.metroparks.net/wp-content/uploads/2019/05/Rules-and-Regulations-2019.pdf" },
  checked: CHECKED,
},

// ---- Indiana (Indianapolis) ----
// 312 IAC 8-2-10 "Preservation of habitat and natural and cultural resources" (Cornell LII; readopted 2022): "Except as authorized by a license, a person
//   must not do any of the following within a DNR property:" "(3) Damage or collect a plant or pick flowers. Exempted from this subdivision are the
//   following:" berries, fruits, nuts, fallen cones, mushrooms, leaves, greens; "(4) Pick berries, fruits, nuts, fallen cones, mushrooms, leaves, or
//   greens on a nature preserve," "or another property administered by the division of nature preserves," "unless the property is located at" a state
//   park, reservoir property, fish and wildlife area or state forest; "(11) Regardless of whether taken lawfully, sell any material taken from a DNR property."
{
  id: "ah-indiana-dnr-properties",
  applies: (p) => is(p, "IN", "Indiana"),
  title: "Indiana DNR properties (state parks, reservoirs, fish and wildlife areas, state forests)",
  rule: "Indiana's rule for DNR properties (312 IAC 8-2-10) bars damaging or collecting plants and picking flowers, but exempts berries, fruits, nuts, fallen cones, mushrooms, leaves and greens. Those may not be picked on a nature preserve or other land of the Division of Nature Preserves unless it lies within a state park, reservoir property, fish and wildlife area or state forest. Nothing taken from a DNR property may be sold unless a licence allows it. The rule sets no quantity limit.",
  source: { label: "312 IAC 8-2-10, Preservation of habitat and natural and cultural resources (Cornell LII)", url: "https://www.law.cornell.edu/regulations/indiana/312-Ind-Admin-Code-8-2-10" },
  checked: CHECKED,
},

// ---- Tennessee (Nashville) ----
// Tenn. Comp. R. & Regs. 0400-02-02-.18 (Cornell LII; "Amendment filed June 14, 2010; effective September 12, 2010"): ¶3 "Gathering or collecting for
//   personal use reasonable quantities of natural products of a renewable nature" "including but not limited to fruits, berries, and driftwood is
//   permitted;" "however, the gathering or collecting of such products for the purpose of commercial sale" "or other commercial use is prohibited."
//   ¶5 "The destroying, digging, cutting, removing, or possession of any tree, shrub, or other plant is prohibited" "without a permit granted by the
//   Assistant Commissioner of Parks and Recreation."
{
  id: "ah-tennessee-state-parks",
  applies: (p) => is(p, "TN", "Tennessee"),
  title: "Tennessee state parks",
  rule: "Tennessee's state park rule (0400-02-02-.18) allows gathering reasonable quantities of renewable natural products, such as fruits, berries and driftwood, for personal use, but not for sale or other commercial use. Digging, cutting, removing or possessing any tree, shrub or other plant needs a permit from the Assistant Commissioner of Parks and Recreation. The rule does not name nuts or mushrooms.",
  source: { label: "Tenn. Comp. R. & Regs. 0400-02-02-.18 (effective 12 September 2010)", url: "https://www.law.cornell.edu/regulations/tennessee/Tenn-Comp-R-Regs-0400-02-02-.18" },
  checked: CHECKED,
},
// TDEC Division of Natural Areas, Radnor Lake Class II Natural-Scientific State Natural Area (no date): "Day use only"; "Fishing: No"; managed by the
//   "Division of Natural Areas"; "Owned by the State of Tennessee". Friends of Radnor Lake, "Rules and Regulations of a Natural Area" (modified
//   15 October 2020; not the regulator): "All Tennessee State Parks Rules and Regulations apply"; "Fishing, hunting, collection of any plants/flowers,
//   mushrooms, rocks, or artifacts is prohibited."
// Checker, 11 November 2026: both TDEC pages (this one and environment/natural-areas/what-we-do/sna/cb/radnor-lake.html, modified 11 July 2026)
//   list "Hunting: No", "Fishing: No", "Camping: No" and say nothing on collecting. The collecting ban is only on the Friends page, which cites the
//   State Natural Areas Preservation Act of 1971 but no section; the rule now says so.
{
  id: "ah-radnor-lake",
  applies: (p) => is(p, "TN", "Tennessee") && within(p, NASHVILLE, 20),
  title: "Radnor Lake State Natural Area",
  rule: "Tennessee's Division of Natural Areas lists Radnor Lake as day use only, with no fishing, hunting or camping; its pages say nothing about picking. The Friends of Radnor Lake, a support group rather than the regulator, posts rules saying all Tennessee State Parks rules apply there and that collecting any plants, flowers, mushrooms, rocks or artifacts is prohibited.",
  source: { label: "TDEC Division of Natural Areas: Radnor Lake State Natural Area", url: "https://www.tn.gov/environment/program-areas/na-natural-areas/natural-areas-middle-region/middle-region/na-na-radnor-lake.html" },
  checked: CHECKED,
},
// Metro Board of Parks and Recreation Policy Manual ("Revision Date: October 2026"), 3000.34(H) Bells Bend Camping Policy: "Gathering wood or plants,
//   whether live, dead, or downed, is prohibited."; "Removing or defacing any natural or manmade feature in the park is prohibited."
{
  id: "ah-nashville-bells-bend",
  applies: (p) => is(p, "TN", "Tennessee") && within(p, NASHVILLE, 25),
  title: "Bells Bend Park camping (Metro Nashville Parks)",
  rule: "Metro Parks' camping policy for Bells Bend Park forbids gathering wood or plants, whether living, dead or downed, and removing or defacing any natural feature in the park.",
  source: { label: "Metro Nashville Board of Parks and Recreation: Policy Manual (October 2026), 3000.34(H)", url: "https://www.nashville.gov/sites/default/files/2026-10/Metro-Board-of-Parks-Policy-Manual-OCTOBER-2026.pdf?ct=1791477105" },
  checked: CHECKED,
},
];
