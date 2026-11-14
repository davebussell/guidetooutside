/**
 * Rules read from the regulator's own pages for the ecoregion "Western Mountains" (western-mountains): Kelowna, Spokane, Bozeman and Laramie.
 *
 * CLOSED: closed-season rows (same shape and standard as src/data/closed-seasons.ts: a regulator, the page it
 * was read from, the date it was read, dates written as the regulator gives them).
 * LAND: where-you-may-pick rules (same shape and standard as src/data/land-rules.ts: the regulator's wording,
 * kept inside the source, with the page and the date it was read).
 *
 * Read 14 November 2026 (Day 5 of the regional audit). Nothing here is inferred: a row exists only where the page
 * was opened and read.
 */
import type { ClosedSeason } from "../closed-seasons";
import type { LandPlace, LandRule } from "../land-rules";

/** Date every page below was opened and read. */
const CHECKED = "2026-11-14";

const US = "US";
const CA = "CA";

// ---- Town centres (src/lib/known-places.json) -------------------------------------------------------------------
const KELOWNA_PT = { lat: 49.8879177, lon: -119.495902 };
const SPOKANE_PT = { lat: 47.6571934, lon: -117.42351 };
const BOZEMAN_PT = { lat: 45.6794293, lon: -111.044047 };
const LARAMIE_PT = { lat: 41.3116442, lon: -105.5917876 };

// ---- Circles used to scope rows to a town (the regulator's rule is for a water or zone, not a point) ----------------
const KELOWNA_STREAMS = { ...KELOWNA_PT, km: 15 };
const KELOWNA_LAKES = { ...KELOWNA_PT, km: 30 };
const SPOKANE_RIVERS = { ...SPOKANE_PT, km: 12 };
const SPOKANE_LAKES = { ...SPOKANE_PT, km: 30 };
const BOZEMAN = { ...BOZEMAN_PT, km: 25 };
const LARAMIE = { ...LARAMIE_PT, km: 30 };

const BC_R8_SRC =
  "https://www2.gov.bc.ca/assets/gov/sports-recreation-arts-and-culture/outdoor-recreation/fishing-and-hunting/freshwater-fishing/region_8_okanagan.pdf";
const BC_R8_REG = "Province of British Columbia (Region 8, Okanagan)";
const WA_REG = "Washington Department of Fish and Wildlife";
const MT_REGS_PAGE = "https://fwp.mt.gov/fish/regulations";
const MT_REG = "Montana Fish, Wildlife & Parks (Central District)";
const WY_CH46 = "https://wgfd.wyo.gov/media/32906/download?inline";
const WY_REG = "Wyoming Game and Fish Commission (Chapter 46)";

export const CLOSED: ClosedSeason[] = [
  // ======================= Canada: British Columbia, Region 8 Okanagan (Kelowna) ==================================
  // source: 2025-2027 BC Freshwater Fishing Regulations Synopsis, Region 8 - Okanagan (region_8_okanagan.pdf), read 14 November 2026.
  //   Region 8 general regulations: "No fishing: (spring closure) in any stream in Region 8 from Apr 1-June 30 (see tables for
  //   exceptions)."; "Single barbless hook: must be used in all streams of Region 8, all year."; daily quotas "Trout/char: 5, but
  //   not more than" "1 over 50 cm", "4 from streams (only 2 over 30 cm)"; "Kokanee: 5 (none from streams)".
  //   Kelowna is placed in Region 8 by the waters at the town that the tables list: "OKANAGAN LAKE 8-10" and "MISSION CREEK 8-10".
  //   Table rows in or near the circle: "MISSION CREEK 8-10 No Fishing from falls at Gallagher Canyon to Okanagan Lake";
  //   "POWERS CREEK 8-11 No Fishing downstream of Hwy 97 bridge to Okanagan Lake". Provincial section (pw_regulations_guide.pdf):
  //   "When no date is listed, the regulations apply all year." The only spring-closure exemptions listed in units 8-8, 8-9,
  //   8-10, 8-11 and 8-22 are Eneas Creek and Trout Creek above the trestle (both at Summerland, outside the circle).
  {
    id: "ca-bc-r8-stream-spring-closure-kelowna",
    countryCode: CA,
    admin1: ["BC", "British Columbia"],
    near: KELOWNA_STREAMS,
    species: ["*"],
    closed: [{ from: "04-01", to: "06-30" }],
    water: ["rivers"],
    note:
      "BC's 2025-2027 synopsis closes every stream in Region 8 (Okanagan), which takes in Kelowna, to fishing from 1 April to 30 June each year, and requires a single barbless hook in all Region 8 streams all year. Some creeks at Kelowna are closed longer: Mission Creek from the falls at Gallagher Canyon down to Okanagan Lake, and Powers Creek below the Highway 97 bridge, are listed with no fishing and no dates, which the synopsis says means all year. No kokanee may be kept from streams, and no more than 4 trout a day may come from streams.",
    regulator: BC_R8_REG,
    source: BC_R8_SRC,
    checked: CHECKED,
  },
  // source: same Region 8 synopsis, re-read 14 November 2026 — regional quotas: "Bass: 0 quota, CLOSED TO FISHING (see tables for exceptions)";
  //   "Yellow perch: 0 quota, CLOSED TO FISHING (see tables for exceptions)". The waters the tables open to bass or perch are lakes, except
  //   Christina Creek (8-15, near Christina Lake) and the Okanagan River (8-1, from Penticton south): no stream within 15 km of Kelowna is among
  //   them. The audit of 10 November 2026 (checkers of 14 November) found this a note while the page listed perch in season. In streams it is now a
  //   closed row. Lakes stay a note: Okanagan Lake (at the town) and Shannon Lake allow 8 bass and 20 perch a day, Wood, Ellison and Kalamalka
  //   perch only, while ponds the tables do not list are closed, and the lake cards cover them all together.
  {
    id: "ca-bc-r8-streams-bass-perch-kelowna",
    countryCode: CA,
    admin1: ["BC", "British Columbia"],
    near: KELOWNA_STREAMS,
    species: ["smallmouth-bass", "largemouth-bass", "yellow-perch"],
    closed: [{ from: "01-01", to: "12-31" }],
    water: ["rivers"],
    note:
      "BC's 2025-2027 Region 8 synopsis sets a quota of zero for bass and yellow perch and closes them to fishing except on the waters its tables list. No stream near Kelowna is listed, so bass and perch are closed in the creeks here all year. Okanagan Lake and Shannon Lake are open to both (8 bass and 20 perch a day).",
    regulator: BC_R8_REG,
    source: BC_R8_SRC,
    checked: CHECKED,
  },
  // source: same Region 8 synopsis, read 14 November 2026 — "OKANAGAN LAKE 8-10 Rainbow trout daily quota = 2 (only one over 50 cm),
  //   bass daily quota = 8, yellow perch daily quota = 20"; "WOOD LAKE 8-22" "No Ice Fishing" "No Fishing for kokanee Sept 1-Mar 31"
  //   "Kokanee daily quota = 3, Apr 1-Aug 31"; "KALAMALKA LAKE 8-22 Kokanee daily quota = 5, Yellow perch daily quota = 20";
  //   "ELLISON LAKE 8-8 Yellow perch daily quota = 20"; "SHANNON LAKE 8-11 Bass daily quota = 8, yellow perch daily quota = 20".
  //   Regional quotas: "Bass: 0 quota, CLOSED TO FISHING (see tables for exceptions)"; "Yellow perch: 0 quota, CLOSED TO FISHING
  //   (see tables for exceptions)". The synopsis gives no general season for lakes; the provincial section says "Most waters in
  //   B.C. are open to fishing for some species 24 hours of the day, every day of the year." Not "open all year" for named
  //   species, so this is a note. (The text extracted from the PDF also printed "No Fishing July 30-Sept 15" in the Okanagan
  //   Lake row; the in-season changes page, updated 26 August 2026, gives that closure for the Okanagan River and does not list
  //   Okanagan Lake, so it is not loaded: see the report.) Re-read 14 November 2026: the extracted text again prints the line inside the
  //   Okanagan Lake block, after the speed-restriction line and before "OKANAGAN RIVER 8-1"; the same dates are given to the Okanagan River
  //   Oxbows (8-1). The PDF's column layout cannot be seen in the extracted text, so it cannot be settled whether the line belongs to the lake or
  //   spills over from a neighbouring entry. Still not loaded: closing the whole lake would be a large claim on doubtful evidence.
  {
    id: "ca-bc-r8-lakes-kelowna",
    countryCode: CA,
    admin1: ["BC", "British Columbia"],
    near: KELOWNA_LAKES,
    species: [],
    closed: [],
    water: ["lakes"],
    note:
      "BC's 2025-2027 Region 8 synopsis sets no general closed season for lakes, so no dates are loaded here. On Okanagan Lake the daily quota is 2 rainbow trout (only one over 50 cm), 8 bass and 20 yellow perch. Region 8 closes bass and yellow perch to fishing except on the waters its tables list; Okanagan, Kalamalka, Ellison, Wood and Shannon lakes are among them. Wood Lake is closed to ice fishing and to kokanee fishing from 1 September to 31 March; Kalamalka Lake allows 5 kokanee a day.",
    regulator: BC_R8_REG,
    source: BC_R8_SRC,
    checked: CHECKED,
  },
  // source: 2025-2027 BC Freshwater Fishing Regulations Synopsis, provincial section (pw_regulations_guide.pdf), read 14 November 2026 —
  //   "You must have a valid basic licence to sport fish for any species of fish in non-tidal waters" (16 and over); BC residents under
  //   16 "may sport fish without any licence or stamp (but must abide by the regulations)"; non-residents under 16 must be with a
  //   licence holder 16 or older; a Conservation Surcharge Stamp is needed to fish for steelhead anywhere in B.C.
  {
    id: "ca-bc-licence-kelowna",
    countryCode: CA,
    admin1: ["BC", "British Columbia"],
    near: KELOWNA_LAKES,
    species: [],
    closed: [],
    note:
      "In British Columbia anglers 16 and over need a basic freshwater fishing licence for any species in non-tidal waters. BC residents under 16 may fish without a licence but must follow the regulations; non-residents under 16 must fish with a licence holder aged 16 or older.",
    regulator: "Province of British Columbia",
    source:
      "https://www2.gov.bc.ca/assets/gov/sports-recreation-arts-and-culture/outdoor-recreation/fishing-and-hunting/freshwater-fishing/pw_regulations_guide.pdf",
    checked: CHECKED,
  },

  // ======================= United States: Washington, Eastern region (Spokane) ====================================
  // WDFW's regulations page (https://wdfw.wa.gov/fishing/regulations) gives the sport fishing rules pamphlet as the eRegulations
  //   edition, "July 1, 2026 - June 30, 2027". Pages read 14 November 2026:
  // source: Columbia Basin Rivers Special Rules: O-S ("Last Updated: October 5, 2026") — SPOKANE RIVER - SPOKANE CO., "from Nine Mile
  //   Dam upstream to the Idaho/Washington state line": "Selective gear rules."; Trout "Sat. before Memorial Day-Mar. 15" "No min.
  //   size. Daily limit 2. Release all trout other than hatchery rainbow trout."; Other game fish "Sat. before Memorial Day-Mar. 15"
  //   "Catch-and-release."
  // source: Columbia Basin Rivers Special Rules: L-N (October 5, 2026) — Little Spokane River from the SR 291 Bridge to Chain Lake, and
  //   upstream of the culvert 1/4 mile above Chain Lake: all game fish "Sat. before Memorial Day-Oct. 31"; whitefish only
  //   "Dec. 1-Last Day of Feb."; inlet to Chain Lake to the culvert: "CLOSED WATERS". Latah (Hangman) Creek is not listed.
  // source: Statewide Freshwater Regulations ("Last Updated: June 18, 2026") — "Rivers, streams and beaver ponds are open the Saturday
  //   before Memorial Day through October 31."
  // The Spokane River season and the statewide stream season differ (the Spokane River stays open to 15 March), and a circle round
  //   the town cannot tell them apart, so this is a note. Saturday before Memorial Day = 23 May in 2026.
  // WDFW emergency rules page (https://wdfw.wa.gov/fishing/regulations/emergency-rules), read 14 November 2026: no rule title names a
  //   Spokane water.
  {
    id: "us-wa-spokane-rivers",
    countryCode: US,
    admin1: ["WA", "Washington"],
    near: SPOKANE_RIVERS,
    species: [],
    closed: [],
    water: ["rivers"],
    note:
      "WDFW's 2026-27 rules open the Spokane River from Nine Mile Dam up to the Idaho line from the Saturday before Memorial Day (23 May in 2026) to 15 March, under selective gear rules. Only hatchery rainbow trout may be kept there (2 a day); other trout and all other game fish must be released. Streams without their own rule, such as Hangman (Latah) Creek, follow the statewide season, the Saturday before Memorial Day to 31 October. The Little Spokane River above the SR 291 bridge has that season too, with a whitefish-only season from 1 December to the end of February.",
    regulator: WA_REG,
    source: "https://www.eregulations.com/washington/fishing/columbia-basin-rivers-special-rules-o-s",
    checked: CHECKED,
  },
  // source: Statewide Freshwater Regulations (June 18, 2026) — "Lakes, ponds, and reservoirs are open to fishing for game fish (except
  //   Dolly Varden/bull trout and grass carp) year-round."
  // source: Eastside Lakes Special Rules A-F, G-P, Q-Z (October 5, 2026) — Spokane County lakes with their own seasons: Amber "Mar.
  //   1-Nov. 30" (selective gear; trout min. 18", 1 a day); Badger, Chapman, Clear, Williams, West Medical "4th Sat. in Apr.-Oct. 31";
  //   Downs "Mar. 1-Sept. 30"; Fish Lake and Fishtrap "4th Sat. in Apr.-Sept. 30"; Liberty "Mar. 1-Oct. 31"; Medical "Mar. 1-Nov. 30"
  //   (selective gear; trout min. 14", 2 a day); Hog Canyon "1st Fri. after Thanksgiving-Mar. 31"; Eloika, Silver and Bear "Year-round";
  //   LONG LAKE (LAKE SPOKANE), "from Long Lake Dam to Nine Mile Dam, including Little Spokane River from the mouth to the SR 291 Bridge":
  //   all game fish "Year-round".
  // The lakes near Spokane have many seasons, so this is a note.
  {
    id: "us-wa-spokane-lakes",
    countryCode: US,
    admin1: ["WA", "Washington"],
    near: SPOKANE_LAKES,
    species: [],
    closed: [],
    water: ["lakes"],
    note:
      "WDFW's statewide rule opens lakes, ponds and reservoirs to game fish year-round, but many Spokane County lakes have their own seasons in the 2026-27 rules. Long Lake (Lake Spokane, from Nine Mile Dam to Long Lake Dam), Eloika and Silver lakes are open year-round. Clear, Badger, Chapman, Williams and West Medical lakes open the fourth Saturday in April (25 April in 2026) to 31 October; Medical and Amber lakes 1 March to 30 November, under selective gear rules; Liberty Lake 1 March to 31 October; Downs Lake 1 March to 30 September; Fish and Fishtrap lakes the fourth Saturday in April to 30 September; Hog Canyon Lake the first Friday after Thanksgiving (27 November in 2026) to 31 March.",
    regulator: WA_REG,
    source: "https://www.eregulations.com/washington/fishing/statewide-freshwater-regulations",
    checked: CHECKED,
  },

  // ======================= United States: Montana, Central District (Bozeman) =====================================
  // source: Montana FWP, Fishing Regulations page (https://fwp.mt.gov/fish/regulations), read 14 November 2026 — General Fishing Seasons
  //   table, Central District: Rivers & Streams "Open all year, unless otherwise specified in Exceptions to Standard Regulations.";
  //   Lakes & Reservoirs "Open all year"; for waters listed in the Exceptions "these regulations take the place of the Standard
  //   Regulations."
  // source: 2026 Fishing Regulations (2026-fishing-regulations-final-for-web.pdf) — "valid March 1, 2026, through the end of Feb.
  //   2027"; "CENTRAL FISHING DISTRICT – page 50", "EASTERN FISHING DISTRICT – page 79". The text read stopped before page 50, so the
  //   Central District exceptions (the Gallatin, East Gallatin, Hyalite and the Bozeman ponds) could NOT be read.
  // source: FWP, 2027 fishing regulation proposals (scoping, comments to May 2026), Proposal 28 — East Gallatin River current regulation
  //   "(Page 57)": "Northern pike: no limit." "Closed to fishing from boats/vessels." Page 57 lies in the Central District pages
  //   (50-78), which is how Bozeman's waters are placed in the Central District.
  // Because the exceptions for the Bozeman waters were not read, both rows are notes.
  {
    id: "us-mt-central-rivers-bozeman",
    countryCode: US,
    admin1: ["MT", "Montana"],
    near: BOZEMAN,
    species: [],
    closed: [],
    water: ["rivers"],
    note:
      "Montana FWP's standard season for rivers and streams in the Central District, which takes in the Gallatin Valley, is open all year unless a water's own exception says otherwise. The exceptions for the Gallatin, the East Gallatin and the creeks round Bozeman are in the 2026 regulations booklet (valid 1 March 2026 to the end of February 2027), which could not be read here, so no dates are loaded. FWP's 2027 proposals give the current East Gallatin rule as closed to fishing from boats or vessels.",
    regulator: MT_REG,
    source: MT_REGS_PAGE,
    checked: CHECKED,
  },
  {
    id: "us-mt-central-lakes-bozeman",
    countryCode: US,
    admin1: ["MT", "Montana"],
    near: BOZEMAN,
    species: [],
    closed: [],
    water: ["lakes"],
    note:
      "Montana FWP's standard season for lakes and reservoirs in the Central District is open all year, but a water listed in the 2026 booklet's exceptions follows its own rule instead. Those exceptions could not be read here, so no dates are loaded for the lakes and ponds round Bozeman.",
    regulator: MT_REG,
    source: MT_REGS_PAGE,
    checked: CHECKED,
  },
  // Re-read 14 November 2026 (audit of 10 November, checkers of 14 November, doubted the AIS and child lines): the booklet's licence table gives
  //   ages 0-11 "No license required. Must observe all limits and regulations."; "The AIS Prevention Pass is required for individuals 16 and over who
  //   fish in Montana."; residents 12-15 pay no AIS fee; "valid March 1, 2026, through the end of Feb. 2027". The note stands as written.
  // source: 2026 Fishing Regulations booklet, licence section — "most anglers need a Conservation License and a Fishing License"; "A
  //   Conservation License is needed before you can buy any fishing or hunting license."; "The AIS Prevention Pass is required for
  //   individuals 16 and over who fish in Montana."; children 0-11 need no licence but must follow limits and regulations.
  {
    id: "us-mt-licence-bozeman",
    countryCode: US,
    admin1: ["MT", "Montana"],
    near: BOZEMAN,
    species: [],
    closed: [],
    note:
      "In Montana most anglers need a Conservation License, which must be bought first, and a Fishing License; anglers 16 and over also need an Aquatic Invasive Species Prevention Pass. Children under 12 need no licence but must follow the limits and regulations.",
    regulator: "Montana Fish, Wildlife & Parks",
    source: "https://fwp.mt.gov/binaries/content/assets/fwp/fish/regulations/2026-fishing-regulations-final-for-web.pdf",
    checked: CHECKED,
  },

  // ======================= United States: Wyoming (Laramie) =========================================================
  // source: Wyoming Game and Fish Commission, Chapter 46 Fishing Regulations ("CH 46 Final July 2025"; "These regulations are effective
  //   January 1, 2026"), read 14 November 2026 — Section 3(a): "Fishing is permitted year-round twenty-four (24) hours a day in any
  //   waters of this state", with the exceptions set out in Sections 17, 20, 22, 25, 28 and 32. Section 31: "Area 5 means the North
  //   Platte River, Sweetwater River and South Platte River drainages." Section 32 (Area 5), subsections (a) to (w) read in full: the
  //   only closed periods are Bump Sullivan (Nov 1 to last day of Feb) and Springer (Nov 1 to Feb 15) reservoirs in Goshen County,
  //   Edness Kimball Wilkins State Park ponds and part of Grayrocks Reservoir (closed year-round) and two North Platte sections in
  //   Natrona County (Apr 1 to May 15); none is in Albany County. 32(a) brook trout 6 a day in lakes, 32(b) 16 in streams, 32(c) 16
  //   combined, in Albany and seven other counties; 32(d) burbot and northern pike "nongame", all caught must be killed immediately,
  //   in the same counties; 32(m) "Huck Finn Pond in Albany County": unlawful for anyone 14 or older to fish. Section 9: state fish
  //   rearing ponds and hatcheries closed all year. No other section sets a closed period in Albany County.
  // The 2026 brochure (https://wgfd.wyo.gov/media/33248/download?inline) was UNREADABLE (refused twice).
  {
    id: "us-wy-laramie-open",
    countryCode: US,
    admin1: ["WY", "Wyoming"],
    near: LARAMIE,
    species: ["rainbow-trout", "brown-trout", "brook-trout", "lake-trout", "walleye", "yellow-perch", "common-carp"],
    closed: [],
    note:
      "Wyoming's fishing regulation (Chapter 46, in force from 1 January 2026) allows fishing year-round, 24 hours a day, in any water of the state except where it says otherwise, and none of the area exceptions it lists closes a water in Albany County. State fish rearing ponds and hatcheries are closed, and at Huck Finn Pond in Albany County no one 14 or older may fish. In Albany County the brook trout limit is 6 a day from lakes and 16 from streams, and any burbot or northern pike caught must be killed at once.",
    regulator: WY_REG,
    source: WY_CH46,
    checked: CHECKED,
  },
];

// ============================================================================================================
// LAND: who says whether you may pick, read on the owner's own page (14 November 2026).
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
  // ---- Canada: British Columbia (Kelowna) ----------------------------------------------------------------------
  // BC Parks, Responsible recreation (no date shown): "Removing anything from a BC Park is usually illegal."; "Only First Nations and
  //   special permit holders have permission to harvest or gather certain items."; "Do not remove mushrooms, berries, flowers, fossils,
  //   wood, shells, or cultural artifacts."
  {
    id: "bc-parks-kelowna",
    applies: both(inProvince("BC", "British Columbia"), inCircle(KELOWNA_PT, 60)),
    title: "BC provincial parks",
    rule: "BC Parks says removing anything from a BC park is usually illegal, and asks visitors not to remove mushrooms, berries, flowers, fossils, wood, shells or cultural artifacts. It says only First Nations and special-permit holders may harvest or gather certain items.",
    source: { label: "BC Parks: Responsible recreation", url: "https://bcparks.ca/plan-your-trip/visit-responsibly/responsible-recreation" },
    checked: CHECKED,
  },

  // ---- United States: Washington (Spokane) ---------------------------------------------------------------------
  // WAC 352-28-030 Harvest of edibles (Washington State Parks and Recreation Commission; WSR 08-05-009, effective 9 March 2008), as
  //   published by the Washington State Legislature: no commercial harvest on park lands; (1) mushrooms, berries, nuts and other edibles
  //   may be harvested for personal consumption up to "two gallons per person per day" unless otherwise posted, not in natural area
  //   preserves; (3) raking and other damaging methods banned; (4) the director may close areas, posted at the entrance and park office.
  {
    id: "washington-state-parks",
    applies: inState("WA", "Washington"),
    title: "Washington state parks",
    rule: "Washington's state park rule (WAC 352-28-030) allows mushrooms, berries, nuts and other edible plants to be gathered for personal consumption, up to two gallons per person per day unless the park posts otherwise, but not in natural area preserves. Commercial harvest is not allowed, raking and other methods that damage the ground are banned, and the park director may close areas to harvest by posting them.",
    source: {
      label: "Washington State Legislature: WAC 352-28-030, Harvest of edibles",
      url: "https://lawfilesext.leg.wa.gov/law/WAC/WAC%20352%20%20TITLE/WAC%20352%20-%2028%20%20CHAPTER/WAC%20352%20-%2028%20-030.htm",
    },
    checked: CHECKED,
  },
  // U.S. Forest Service, Idaho Panhandle National Forests, Permits (last updated 4 June 2026): "The National Forest requires a free, mushroom
  //   harvesting permit."; "everyone is welcome to gather huckleberries for personal use."; "Commercial gathering of huckleberries is not
  //   permitted on the Idaho Panhandle National Forests." No amounts given.
  // Colville National Forest non-wood products page: UNREADABLE (refused twice); its permits page lists "Mushrooms" with no text.
  {
    id: "idaho-panhandle-national-forests",
    applies: inCircle(SPOKANE_PT, 90),
    title: "Idaho Panhandle National Forests (U.S. Forest Service)",
    rule: "The Forest Service says everyone may gather huckleberries for personal use on the Idaho Panhandle National Forests, but commercial huckleberry picking is not permitted. Picking mushrooms there requires a free mushroom harvesting permit. The page gives no amounts.",
    source: { label: "U.S. Forest Service: Idaho Panhandle National Forests, permits", url: "https://www.fs.usda.gov/r01/idahopanhandle/permits" },
    checked: CHECKED,
  },

  // ---- United States: Montana (Bozeman) ------------------------------------------------------------------------
  // U.S. Forest Service, Custer Gallatin National Forest, Permits (last updated 19 October 2026): "Berry Picking - No permit is required for
  //   recreational berry picking, up to 10 gallons."; "No permit is required for incidental use harvesting, up to five gallons per season";
  //   "No raking, digging, or other ground disturbances are allowed when collecting mushrooms."; "A special use permit is required for any
  //   commercial activity". Northern Region mushroom page (last updated 27 October 2026): incidental use, no permit, up to one gallon in
  //   possession and five gallons a season; a free Personal Use permit allows up to 5 gallons a day, 20 a season (the page's permit terms
  //   are dated 2025).
  {
    id: "custer-gallatin-national-forest",
    applies: both(inState("MT", "Montana"), inCircle(BOZEMAN_PT, 60)),
    title: "Custer Gallatin National Forest (U.S. Forest Service)",
    rule: "The Forest Service says no permit is needed on the Custer Gallatin National Forest for recreational berry picking up to 10 gallons, or for incidental mushroom picking up to five gallons a season, with no raking, digging or other ground disturbance. Any commercial activity needs a special use permit.",
    source: { label: "U.S. Forest Service: Custer Gallatin National Forest, permits", url: "https://www.fs.usda.gov/r01/custergallatin/permits" },
    checked: CHECKED,
  },
  // Montana FWP, Public use rules (for "public use sites", "including state parks, wildlife management areas (WMAs) and fishing access sites
  //   (FASs)"; page metadata 21 February 2024): "While in a public use site it is prohibited to:" "damage, destroy, or possess any natural
  //   features, developed features, or vegetation;". No personal-use exception on the page.
  {
    id: "montana-fwp-public-use-sites",
    applies: inState("MT", "Montana"),
    title: "Montana state parks, wildlife management areas and fishing access sites (FWP)",
    rule: "Montana Fish, Wildlife & Parks' public use rules, which cover its state parks, wildlife management areas and fishing access sites, prohibit damaging, destroying or possessing any natural features or vegetation there. The page names no personal-use exception for berries or mushrooms.",
    source: { label: "Montana FWP: Public use rules", url: "https://fwp.mt.gov/conservation/wildlife-management-areas/public-use-rules" },
    checked: CHECKED,
  },

  // ---- United States: Wyoming (Laramie) ------------------------------------------------------------------------
  // U.S. Forest Service, Medicine Bow-Routt National Forests and Thunder Basin National Grassland, Permits (last updated 13 June 2025): "The
  //   public may harvest a range of forest products from the Medicine Bow-Routt National Forests," "including firewood, plant and tree
  //   transplants, ferns, mushrooms, Christmas trees, and more." Non-wood products page (last updated 25 July 2025): "Forest product
  //   permits allow the public the opportunity to harvest for recreational and personal use."; "Forest Products should not be collected
  //   from active timber sale areas."; for permits and limits, contact the ranger district. Neither page gives amounts or names berries.
  {
    id: "medicine-bow-routt-national-forests",
    applies: both(inState("WY", "Wyoming"), inCircle(LARAMIE_PT, 60)),
    title: "Medicine Bow-Routt National Forests (U.S. Forest Service)",
    rule: "The Forest Service says the public may harvest forest products, including mushrooms, ferns and plant transplants, from the Medicine Bow-Routt National Forests, and that forest product permits cover recreational and personal use. Its pages give no amounts and do not say which products need a permit; they send visitors to the ranger district office, and say nothing should be collected from active timber sale areas.",
    source: { label: "U.S. Forest Service: Medicine Bow-Routt National Forests, non-wood forest products", url: "https://www.fs.usda.gov/r02/mbrtb/forest-products/nonwood-products" },
    checked: CHECKED,
  },
  // Wyoming State Parks and Historic Sites rules, 024-1 Wyo. Code R. § 1-15, Preservation of Public Property (eff. 16 November 2021; read on
  //   Cornell LII's copy of the Wyoming Administrative Code): (a) no removing or disturbing public property, including plants, without the
  //   superintendent's permission; (b) gathering fruits and berries by hand for personal use is permitted for "only such fruits and berries
  //   as the superintendent may designate"; none for sale; (d) no destroying, digging, cutting, removing or possessing trees, shrubs or plants.
  {
    id: "wyoming-state-parks",
    applies: inState("WY", "Wyoming"),
    title: "Wyoming state parks and historic sites",
    rule: "Wyoming's state park rules prohibit removing or possessing trees, shrubs or plants. Fruits and berries may be picked by hand for personal use only where the park superintendent has designated them, and never for sale. The rule names no allowance for mushrooms or nuts.",
    source: { label: "Wyoming Administrative Code 024-1, ch. 1, § 15: Preservation of Public Property (Cornell LII copy)", url: "https://www.law.cornell.edu/regulations/wyoming/024-1-Wyo-Code-R-SS-1-15" },
    checked: CHECKED,
  },
];
