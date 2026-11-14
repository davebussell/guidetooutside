/**
 * Rules read from the regulator's own pages for the ecoregion "Boreal North and Taiga" (boreal-north): Thompson, Whitehorse, Yellowknife and Fairbanks.
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

// ---- Circles used to scope rows to a town (centres from src/lib/known-places.json) -----------------------------------
const THOMPSON = { lat: 55.743347, lon: -97.863464, km: 30 };
const WHITEHORSE = { lat: 60.721571, lon: -135.054932, km: 30 };
const YELLOWKNIFE = { lat: 62.4540807, lon: -114.377385, km: 25 };
const FAIRBANKS = { lat: 64.837845, lon: -147.716675, km: 20 };

export const CLOSED: ClosedSeason[] = [
  // ======================= Canada: Manitoba (Thompson) ============================================================
  // source: Manitoba Natural Resources and Indigenous Futures, "ANGLERS' GUIDE 2026" ("The regulations in this guide take effect on
  //   April 1, 2026"), read 14 November 2026. The guide has four divisions: Southern, Northwest, North Central and Northeast.
  //   Northwest and North Central season tables: Walleye/Sauger closed "May 1 to and including May 15, 2026", open "May 16, 2026 to
  //   and including April 30, 2027"; Lake Sturgeon closed May 1 to June 30; "All Other Species Open year-round"; live bait fish not
  //   permitted. Northeast: "Generally open to angling all year (refer to map on page 16 for the Northeast Division boundary)."
  //   Provincial limits: "Walleye (Pickerel) & Sauger (either or combined) 4 None may exceed 55 cm"; "Northern Pike (Jackfish) 4 None
  //   may exceed 75 cm"; "Lake Trout 1 None may exceed 65 cm"; "Brook Trout (except stocked trout waters) 1 None may exceed 45 cm";
  //   "Arctic Grayling 3 None may exceed 40 cm"; "Yellow Perch 25"; "Lake Whitefish 10". "In Manitoba, anglers must use barbless
  //   hooks." "Barbless hooks may have barbs on the shank for holding bait." Licence: "must have a Manitoba Angling Licence on their
  //   person" unless exempt; Manitoba residents 65 and older exempt with proof of age and residency.
  //   https://www.manitoba.ca/nrnd/fish-wildlife/pubs/fish_wildlife/fish/angling-guide.pdf
  // Zone: NOT PLACED. The guide's division boundaries are only on its p. 16 map, which does not come through as text; Thompson is
  //   named only as the "Northeast Region (Thompson)" office and in "Thompson Creek" (North Central; closed May 1 to May 31; the guide
  //   gives no location). Burntwood River and Paint Lake are not named. Setting Lake (North Central) and Snow Lake/Wekusko (Northwest)
  //   are the nearest named waters, both outside the circle. The federal Manitoba Fishery Regulations define a Division only as
  //   "named and described in Plan of Survey 18297D" (s. 2, version 2023-04-01 to 2026-10-19), which was not available. So a note,
  //   not a closed row.
  {
    id: "ca-mb-thompson-note",
    countryCode: CA,
    admin1: ["MB", "Manitoba"],
    near: THOMPSON,
    species: [],
    closed: [],
    note:
      "Manitoba's 2026 Anglers' Guide splits the north into the Northwest, North Central and Northeast divisions, but shows the boundaries only on a map, so Thompson's division is not loaded here. In the Northwest and North Central divisions, walleye and sauger were closed from 1 May to 15 May 2026 and are open from 16 May 2026 to 30 April 2027, lake sturgeon are closed 1 May to 30 June, all other species are open year-round, and live bait fish may not be used; the Northeast is generally open all year. Province-wide, anglers must use barbless hooks (barbs on the shank to hold bait are allowed). Limits are 4 walleye and sauger together (none over 55 cm), 4 northern pike (none over 75 cm), 1 lake trout (none over 65 cm), 1 brook trout outside stocked waters (none over 45 cm), 3 Arctic grayling (none over 40 cm), 25 yellow perch and 10 lake whitefish. A Manitoba angling licence is needed unless exempt; Manitoba residents 65 and over do not need one.",
    regulator: "Manitoba Natural Resources and Indigenous Futures",
    source: "https://www.manitoba.ca/nrnd/fish-wildlife/pubs/fish_wildlife/fish/angling-guide.pdf",
    checked: CHECKED,
  },

  // ======================= Canada: Yukon (Whitehorse) =============================================================
  // UNREADABLE: Government of Yukon, Yukon fishing regulations summary 2026-27 (landing page https://yukon.ca/en/yukon-fishing-regulations-summary,
  //   "A summary of fishing regulations for the 2026-27 licensing year", updated 2026-03-16). The PDF
  //   (https://yukon.ca/sites/default/files/env-fishing-regulations-summary_0.pdf, listed in search as "REGULATIONS SUMMARY 2026") refused
  //   (client error). The older env/env-fishing-regulations-summary.pdf is the 2018-19 edition and is not used.
  //   Tried again 14 November 2026 for the audit of 10 November (checkers of 14 November): the PDF refused again (client error), the landing page
  //   (date modified 2026-03-16) carries no regulation text, and yukon.ca/en/fishing-regulations names no closed season, only "Be aware of fishing
  //   closures". Still UNREADABLE, so whether Yukon applies the Schedule V close times in 2026-27 is still not confirmed, and they stay a note.
  // source: Yukon Territory Fishery Regulations, C.R.C., c. 854 (Justice Laws, "current to 2026-10-19", last amended 2023-06-23), read
  //   14 November 2026. s. 8(4): "No person shall fish in the waters set out in column I of an item of Schedule V" "during the close
  //   time set out in column II of that item." Schedule V, Part I Lakes: item 1 "Any lake" "November 1 to November 30"; Part II Rivers:
  //   item 1 Yukon River (a) "upstream from Whitehorse Dam", (b) "from Whitehorse Dam downstream to Robert Campbell Bridge", (c) "from
  //   Robert Campbell Bridge downstream to Canada/USA boundary", each "December 1 to December 31"; item 7 "Any other river, creek or
  //   stream not specified in this Part" "December 1 to December 31".
  //   s. 7(13): "No person shall angle from July 1 until October 15, except with a single-pointed barbless hook" in the Klondike,
  //   Takhini, Yukon, Morley, Smart, Lapie, Teslin and Firth rivers and Blind Creek. s. 8.1(2): artificial flies only "in the Yukon River
  //   from the Whitehorse Dam downstream to the Robert Campbell Bridge from July 15 to September 30;" and "in the Takhini River from
  //   Kusawa Lake downstream to its confluence with the Yukon River from August 20 to September 15". s. 9(2) (no retention of whitefish,
  //   cisco, lake trout or inconnu 1 Sept to 31 Oct, grayling 1 May to 15 June) does not apply to a person who "holds an angling
  //   licence" (s. 9(2.1)(a)), so it is left out. Schedule VI Part I ("Waters in Which No Person Shall Angle Except with a Barbless
  //   Hook") item 6.2 Chadburn Lake (the coordinates came through as 60°03′N, 134°57′W; see doubts). Schedule IV, all waters other than
  //   the listed ones (none near Whitehorse): rainbow trout 5 and 10; lake trout "3, of which only 1 may be greater than 65 cm" (6 in
  //   possession); Arctic grayling "5, of which only 1 may be greater than 40 cm" (10); northern pike "5, of which only 1 may be greater
  //   than 75 cm" (10); burbot 5 and 10; lake whitefish 5 and 10; kokanee 5 and 10; minimum length 20 cm for most species.
  //   https://laws-lois.justice.gc.ca/eng/regulations/C.R.C.,_c._854/page-8.html (Schedule V); page-2.html (ss. 7-9); page-7.html (Schedule IV);
  //   page-9.html (Schedule VI)
  // The two close times are written as a note, not closed rows: the 2024-25 Yukon summary (emrlibrary.gov.yk.ca, read only as a check,
  //   not as a source) lists closed times "only for specific waters" and no November or December closure, and the 2026-27 summary could
  //   not be read, so it is not certain that these Schedule V close times are what Yukon applies in 2026-27. Schwatka Lake is the
  //   reservoir above Whitehorse Dam; the schedules do not name it, so whether it counts as "any lake" or as the Yukon River "upstream
  //   from Whitehorse Dam" is not stated.
  // source: Fisheries and Oceans Canada, "Recreational fishery regulations in the Yukon Transboundary area" (date modified 2025-04-03):
  //   "It's against the law to fish within 23 metres (75´) downstream of the entrance to the Whitehorse Rapids Fish Ladder."; Wolf Creek
  //   and McIntyre Creek (Alaska Highway to the Yukon River): all salmon must be released, year-round; Yukon River July 1 to October 15
  //   single-pointed barbless hooks "with a gap of less than 20 mm (3/4″) only". https://www.pac.dfo-mpo.gc.ca/yukon/regs-eng.html
  {
    id: "ca-yt-whitehorse-note",
    countryCode: CA,
    admin1: ["YT", "Yukon"],
    near: WHITEHORSE,
    species: [],
    closed: [],
    note:
      "The federal Yukon Territory Fishery Regulations (current to 19 October 2026) list a close time of 1 to 30 November for any lake, and 1 to 31 December for the Yukon River and every other river and stream; Yukon's 2026-27 summary could not be read to confirm how these apply, so they are not loaded as closed dates. From 1 July to 15 October, anglers on the Yukon and Takhini rivers may use only a single-pointed barbless hook (gap under 20 mm, says Fisheries and Oceans Canada). Only artificial flies may be used on the Yukon River from Whitehorse Dam down to the Robert Campbell Bridge from 15 July to 30 September, and on the Takhini River below Kusawa Lake from 20 August to 15 September. No one may fish within 23 m downstream of the Whitehorse Rapids Fish Ladder entrance, and every salmon caught in Wolf Creek or McIntyre Creek must be released. Chadburn Lake is barbless-hook only. General daily limits are 5 rainbow trout, 3 lake trout (one over 65 cm), 5 Arctic grayling (one over 40 cm), 5 northern pike (one over 75 cm), 5 burbot, 5 lake whitefish and 5 kokanee, with double that in possession.",
    regulator: "Yukon Territory Fishery Regulations (Fisheries and Oceans Canada)",
    source: "https://laws-lois.justice.gc.ca/eng/regulations/C.R.C.,_c._854/page-8.html",
    checked: CHECKED,
  },
  // source: Fisheries and Oceans Canada, "Agreement - Yukon River chinook salmon 2024 to 2030" (date modified 2024-05-08), read 14 November
  //   2026: the Parties agree to a "suspension of directed Chinook commercial, sport, domestic, and personal use fisheries" in the mainstem
  //   Yukon River and its Canadian tributaries for one full life cycle (seven years), which "will remain in effect regardless of run
  //   abundance." https://www.pac.dfo-mpo.gc.ca/fm-gp/salmon-saumon/yukon-chinook-agreement-quinnat-accord/index-eng.html
  // source: DFO, "Yukon River chinook, fall chum and coho salmon integrated fisheries management plan summary 2026" (modified 2026-07-30):
  //   recreational opportunities are considered only when the projected run meets escapement and First Nation needs; the recreational
  //   fishing plan is in Appendix 5 of the full IFMP, which is not online. https://www.pac.dfo-mpo.gc.ca/fm-gp/mplans/smon-yukon-ifmp-pgip-sm-eng.html
  // source: Yukon Territory Fishery Regulations s. 7(16): no licence holder shall angle for salmon "without a Salmon Conservation Catch
  //   Card"; s. 7(17): not for "Kokanee salmon and salmon caught from salmon stocked lakes."
  // Closed all year because the suspension runs through the 2030 season regardless of run size; reload after 2030. Chum and coho are not
  //   loaded: no 2026 DFO notice for them was found.
  {
    id: "ca-yt-whitehorse-chinook-closed",
    countryCode: CA,
    admin1: ["YT", "Yukon"],
    near: WHITEHORSE,
    species: ["chinook-salmon"],
    closed: [{ from: "01-01", to: "12-31" }],
    water: ["rivers"],
    note:
      "Under the Canada-Alaska agreement for Yukon River chinook (2024 to 2030), sport fishing for chinook in the Yukon River and its Canadian tributaries is suspended for seven years, whatever the size of the run. Anyone angling for other salmon needs a Salmon Conservation Catch Card on top of the licence (not for kokanee or salmon in stocked lakes).",
    regulator: "Fisheries and Oceans Canada (Yukon River chinook agreement)",
    source: "https://www.pac.dfo-mpo.gc.ca/fm-gp/salmon-saumon/yukon-chinook-agreement-quinnat-accord/index-eng.html",
    checked: CHECKED,
  },

  // ======================= Canada: Northwest Territories (Yellowknife) ============================================
  // source: Government of the Northwest Territories, "Northwest Territories Sport Fishing Regulations Guide", April 1, 2026 to March 31,
  //   2027 (https://www.gov.nt.ca/ecc/en/content/nwt-sport-fishing-guide), read 14 November 2026: "Only barbless hooks are permitted for
  //   angling in the Northwest Territories." "A Sport Fishing Licence is required by everyone except:" NWT or Canadian residents under
  //   16 and "OVER 65 – NWT or Canadian Resident AND be 65 years of age or older." No general open-season sentence.
  // source: GNWT, Closed Waters and special permit areas (no date shown): "YELLOWKNIFE RIVER" "between Prosperous Lake and Bluefish Lake"
  //   (62°39'N, 114°15'W) closed "September 1 - October 31"; Baker Creek (62°29′10″N, 114°21′36″W) closed "April 15 - June 15".
  //   https://www.gov.nt.ca/ecc/en/services/get-fishing-licence/closed-waters-and-special-permit-areas
  // source: GNWT, Fish species and catch limits (no date shown; three-value rows are for April 1 – Aug 14, Aug 15 – Oct 31 and Nov 1 –
  //   March 31; walleye two-value rows for Apr 1–Jun 6 and Jun 7–Mar 31): Great Slave Lake and tributaries (mouth to 1 km upstream): lake
  //   trout 2 / 3, only one over 70 cm fork length in possession; northern pike 3 / 5; inconnu 1 / 2. Walleye, all other NWT waters
  //   1/4 daily, 1/7 possession; "Kam and Grace Lakes and connector stream" 0/4 daily, 0/7 possession. Arctic grayling, Baker Creek 0 / 0
  //   "Catch and release only"; all other waters 3 / 5. Lake whitefish 5 / 10; burbot 5 / 10. "Group fishing is NOT permitted."
  //   https://www.gov.nt.ca/ecc/en/Fish-Species-Catch-Limits
  // source: GNWT, General Regulations (no date shown): ice fishing at most 2 lines, no more than 2 hooks a line, within 50 m of the
  //   lines; fishing within 23 m downstream of any obstruction, fishway or leap is an offence.
  //   https://www.gov.nt.ca/ecc/en/services/get-fishing-licence/general-regulations
  // A note, not closed rows: both closures are for single waters (the Yellowknife River section is about 21 km north of town, Baker Creek
  //   runs through town), and a closed row would close every river in the circle.
  {
    id: "ca-nt-yellowknife-note",
    countryCode: CA,
    admin1: ["NT", "Northwest Territories"],
    near: YELLOWKNIFE,
    species: [],
    closed: [],
    note:
      "The Northwest Territories' 2026-27 sport fishing guide gives no territory-wide season, but closes named waters: the Yellowknife River between Prosperous Lake and Bluefish Lake is closed 1 September to 31 October, and Baker Creek is closed to all fishing 15 April to 15 June, with Arctic grayling there catch-and-release only. Only barbless hooks may be used anywhere in the territory. In Great Slave Lake, Yellowknife Bay included, and its tributaries up to 1 km from the mouth, limits are 2 lake trout a day (3 in possession, only one over 70 cm), 3 northern pike (5) and 1 inconnu (2). Walleye are limited to 1 a day from 1 April to 6 June and 4 a day after; in Kam and Grace lakes and the stream between them, no walleye may be kept from 1 April to 6 June. Other limits are 3 Arctic grayling (5 in possession), 5 lake whitefish (10) and 5 burbot (10). No one may fish within 23 m downstream of an obstruction or fishway, and ice anglers may use at most 2 lines. Everyone needs a licence except NWT or Canadian residents under 16 or 65 and over.",
    regulator: "Government of the Northwest Territories (Environment and Climate Change)",
    source: "https://www.gov.nt.ca/ecc/en/Fish-Species-Catch-Limits",
    checked: CHECKED,
  },

  // ======================= United States: Alaska (Fairbanks) ======================================================
  // source: Alaska Department of Fish and Game, 2026 Northern Alaska Sport Fishing Regulations Summary, Tanana River Area, pp. 20-23
  //   (cover: "Effective until the 2027 summary is issued"; "Sport Fishing Licenses ARE Required."), read 14 November 2026:
  //   "Fishing is open year-round for all species unless otherwise noted below or in special regulations." Arctic grayling "5 per day,
  //   5 in possession, no size limit"; northern pike "5 per day, 5 in possession, only 1 of which may be 30 inches or longer"; lake trout
  //   "2 per day, 2 in possession"; burbot (all lakes) "5 per day, 5 in possession", (flowing waters) "15 per day, 15 in possession";
  //   whitefish "15 per day, 15 in possession". Chena River Drainage (including Badger or Chena Slough): "Open year-round to sport
  //   fishing."; "Only one unbaited, single-hook, artificial lure or fly may be used" (treble hooks allowed for species other than salmon);
  //   "Bait may only be used on a single hook with a gap between point and shank larger than ¾ inch."; grayling downstream of the ADF&G
  //   marker 300 feet below the Chena River dam: April 1-May 31 "Catch-and-release fishing only.", June 1-March 31 "1 per day, 1 in
  //   possession"; upstream of the marker: "Catch-and-release fishing only." Chatanika River Drainage: "Open year-round to sport fishing
  //   for species other than northern pike."; "April 15-October 14: Open to northern pike fishing." Stocked lakes (other than Harding
  //   Lake): "10 per day, 10 in possession, in combination, only 2 of which may be lake trout."
  //   https://www.adfg.alaska.gov/static/regulations/fishregulations/PDFs/northern/2026northern_sfregs_tanana.pdf
  // source: ADF&G news release NRID 3961 (8 December 2025), changes effective with the 2026 summary: the Tolovana River drainage
  //   "(including Minto Flats, Minto Lakes, Tatalina River, Chatanika River, Goldstream Creek)" northern pike season opens April 15 and
  //   still closes October 14; lower Chena River grayling youth-only weekends repealed.
  //   https://www.adfg.alaska.gov/sf/EONR/index.cfm?ADFG=region.NR&Year=2025&NRID=3961
  // Circle 20 km: the Chena below the dam (the dam and marker are about 25 km east, outside it), the Tanana near town and Goldstream
  //   Creek (Chatanika/Tolovana drainage) lie inside; Piledriver Slough (catch-and-release only), Bathing Beauty Pond and Harding Lake lie
  //   outside it. Northern pike are left out of the open-all-year species because Goldstream Creek, inside the circle, is closed to pike
  //   15 October to 14 April; salmon are in the next row.
  {
    id: "us-ak-fairbanks-open",
    countryCode: US,
    admin1: ["AK", "Alaska"],
    near: FAIRBANKS,
    species: ["arctic-grayling", "burbot", "lake-whitefish", "rainbow-trout", "lake-trout"],
    closed: [],
    note:
      "Alaska's 2026 Northern sport fishing summary opens the Tanana River area to all species year-round unless a water's own rules say otherwise, and the Chena River (with Badger Slough) is open year-round. On the Chena below the dam, Arctic grayling are catch-and-release only from 1 April to 31 May and 1 a day the rest of the year; only one unbaited single-hook lure or fly may be used, and bait only on a single hook with a gap wider than 3/4 inch. Elsewhere the area limits are 5 grayling, 5 northern pike (one 30 inches or longer), 2 lake trout and 15 whitefish a day, and burbot 5 a day in lakes and 15 in flowing water. Stocked lakes allow 10 fish a day together, no more than 2 of them lake trout. Northern pike in the Chatanika and Tolovana drainage, Goldstream Creek included, may be fished only from 15 April to 14 October. A sport fishing licence is required.",
    regulator: "Alaska Department of Fish and Game (Tanana River Area)",
    source: "https://www.adfg.alaska.gov/static/regulations/fishregulations/PDFs/northern/2026northern_sfregs_tanana.pdf",
    checked: CHECKED,
  },
  // source: same summary, Tanana River Area: king salmon "Closed to king salmon fishing including catch-and-release fishing in 2026 by
  //   emergency order."; chum and coho combined "3 per day, 3 in possession"; Chena upstream of the marker 300 feet below the dam:
  //   "Closed to all salmon fishing. All salmon caught must be released immediately."
  // source: ADF&G Emergency Order 3-KS-U-01-26 (released 18 February 2026, effective 12:01 a.m. 19 February, until "11:59 p.m. Wednesday,
  //   September 30, 2026"): all waters of the Tanana River drainage, including the Chena, Goodpaster and Salcha rivers; "prohibits sport
  //   fishing for king salmon, including catch-and-release fishing"; kings hooked incidentally must be released without removing them
  //   from the water. https://www.adfg.alaska.gov/sf/EONR/index.cfm?ADFG=region.NR&Year=2026&NRID=3997
  // source: ADF&G Region 3 emergency order list (2026): NRID 4051 (17 June) Tanana River drainage chum salmon sport fishery closed;
  //   NRID 4076 (8 July) that closure rescinded. NRID 4082, EO 3-CS-Y-18-2026 (released 15 July, effective 22 July to 31 December 2026):
  //   chum sport fishing closed in state waters of the Yukon River drainage "excluding the Tanana River drainage."
  //   https://adfg.alaska.gov/sf/EONR/index.cfm?ADFG=region.R3
  // A note: the 2026 king closure has expired and next year's will come by its own emergency order, so no dates are loaded.
  {
    id: "us-ak-fairbanks-salmon",
    countryCode: US,
    admin1: ["AK", "Alaska"],
    near: FAIRBANKS,
    species: [],
    closed: [],
    water: ["rivers"],
    note:
      "Salmon in the Tanana River drainage are managed by emergency order. In 2026 an order closed all sport fishing for king (chinook) salmon in the drainage, the Chena included, catch-and-release too, from 19 February to 30 September; a king hooked by chance had to be released without taking it from the water. A chum closure on the Tanana drainage from 17 June was lifted on 8 July, while chum fishing stays closed to 31 December 2026 in the rest of the Yukon River drainage. The standing limit for chum and coho together is 3 a day, and the Chena above the marker 300 feet below the dam is closed to all salmon fishing. Check ADF&G's emergency orders before fishing for salmon.",
    regulator: "Alaska Department of Fish and Game (Tanana River Area)",
    source: "https://www.adfg.alaska.gov/sf/EONR/index.cfm?ADFG=region.NR&Year=2026&NRID=3997",
    checked: CHECKED,
  },
];

// ============================================================================================================
// LAND: who says whether you may pick, read on the owner's own page (14 November 2026).
// Manitoba: the province-wide "mb-provincial-parks" rule (Manitoba Parks, Foraging in Provincial Parks) is already loaded in
//   great-plains.ts and applies at Thompson, so it is not repeated here.
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
const inAdmin = (p: LandPlace, country: string, code: string, name: string) =>
  p.countryCode === country && (p.admin1Code === code || p.admin1 === name);

export const LAND: LandRule[] = [
  // Yukon Parks General Regulation, O.I.C. 2025/53 (effective 27 March 2025; landing page "Date modified: 2026-09-02" says it "applies to
  //   all 56 designated territorial parks"), s. 8(1): "Except as otherwise provided by this Regulation, a sign posted under section 5," "a
  //   person may undertake the following activities in a park without a park permit:" (d) "harvesting wild fruits and berries for personal
  //   consumption;" (e) "pulling and removing invasive plant species;". s. 5(5): an activity a park's management plan or interim guidelines
  //   do not permit in a land use zone is not authorized there. Mushrooms are not named.
  {
    id: "yukon-territorial-parks",
    applies: (p) => inAdmin(p, CA, "YT", "Yukon"),
    title: "Yukon territorial parks",
    rule: "Yukon's Parks General Regulation (2025), which covers all 56 territorial parks, allows anyone to harvest wild fruits and berries for personal consumption, and to pull and remove invasive plants, without a park permit, unless a posted sign or the park's management plan says otherwise. It does not mention mushrooms.",
    source: { label: "Yukon: Parks General Regulation, O.I.C. 2025/53, s. 8(1)", url: "https://laws.yukon.ca/cms/images/LEGISLATION/SUBORDINATE/2025/2025-0053/2025-0053.pdf" },
    checked: CHECKED,
  },
  // NWT Territorial Parks Regulations, RRNWT 1990, c. T-13 (latest amendment listed R-025-2025): s. 5.1 "Subject to the Forest Management
  //   Act and these regulations, no person shall cut, damage, use or transport timber" "that is standing or has fallen in a Territorial
  //   Park."; s. 1(3) "Nothing in these regulations shall be interpreted so as to affect Aboriginal rights."; s. 22 a commercial use permit
  //   is needed for any business, commercial or scientific activity in a park. No provision names berries, mushrooms or other plants.
  {
    id: "nwt-territorial-parks",
    applies: (p) => inAdmin(p, CA, "NT", "Northwest Territories"),
    title: "Northwest Territories territorial parks",
    rule: "The Territorial Parks Regulations forbid cutting, damaging, using or moving standing or fallen timber in a territorial park, and any commercial or scientific activity there needs a commercial use permit. They do not mention berries, mushrooms or other plants, and they do not affect Aboriginal rights.",
    source: { label: "NWT: Territorial Parks Regulations, RRNWT 1990, c. T-13 (s. 5.1, s. 22)", url: "https://www.justice.gov.nt.ca/en/files/legislation/territorial-parks/territorial-parks.r2.pdf" },
    checked: CHECKED,
  },
  // 11 AAC 12.170 (Disturbance of Natural Objects), Alaska Administrative Code, text as published by Justia ("Current through February 24,
  //   2025"; the Division of Parks' own Chapter 12 page, https://dnr.alaska.gov/parks/regstatu/chap12.htm, lists the section by title only
  //   and points to the Legislature's infobase): (a) no person may "disturb, damage, deface, or remove natural objects" unless allowed;
  //   (b) people may gather "berries, fruits, mushrooms, and similar edibles for personal consumption", not for sale or distribution.
  {
    id: "alaska-state-parks",
    applies: (p) => inAdmin(p, US, "AK", "Alaska"),
    title: "Alaska state parks",
    rule: "Alaska's state park rules (11 AAC 12.170) forbid disturbing, damaging or removing natural objects such as plants, but allow berries, fruits, mushrooms and similar edibles to be gathered for personal consumption. Gathering them to sell or give out is not allowed.",
    source: { label: "Alaska Administrative Code, 11 AAC 12.170 (Justia copy, current through 24 February 2025)", url: "https://regulations.justia.com/states/alaska/title-11/part-2/chapter-12/article-1/section-11-aac-12-170" },
    checked: CHECKED,
  },
  // Alaska DNR, Division of Mining, Land and Water, Non-Timber Forest Products Commercial Harvest Permit (no date shown): "No permit is
  //   required to harvest reasonable quantities of NTFP for personal use."; NTFP include "mushrooms, berries, bark, burls, conks, cones,
  //   boughs"; commercial harvest needs a "Limited Non-Timber Forest Products Commercial Harvest Permit", which "only authorizes harvest
  //   on general state-owned lands" and "does not authorize harvest on private, state parks, University of Alaska…" land; on state forest
  //   land such as the Tanana Valley State Forest, "coordinate with the Division of Forestry Regional Forester". The page does not say
  //   which lands the personal-use sentence covers.
  {
    id: "alaska-state-land-ntfp",
    applies: (p) => inAdmin(p, US, "AK", "Alaska") && within(p, FAIRBANKS, 80),
    title: "Alaska general state land (Division of Mining, Land and Water)",
    rule: "Alaska's Department of Natural Resources says no permit is needed to harvest reasonable quantities of non-timber forest products, such as berries and mushrooms, for personal use. Commercial harvest needs a permit, which covers only general state land, not state parks, private or university land; for state forest land such as the Tanana Valley State Forest, commercial harvesters must work with the Division of Forestry's regional forester.",
    source: { label: "Alaska DNR: Non-Timber Forest Products Commercial Harvest Permit", url: "https://dnr.alaska.gov/mlw/lands/permitting/ntfp-commercial-harvest-permit/" },
    checked: CHECKED,
  },
];
