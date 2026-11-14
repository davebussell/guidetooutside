/**
 * Rules read from the regulator's own pages for the ecoregion "Acadian Forest" (acadian-forest): Charlottetown, Fredericton, Moncton, Saint John, Halifax and Portland.
 *
 * CLOSED: closed-season rows (same shape and standard as src/data/closed-seasons.ts: a regulator, the page it
 * was read from, the date it was read, dates written as the regulator gives them).
 * LAND: where-you-may-pick rules (same shape and standard as src/data/land-rules.ts: the regulator's wording,
 * kept inside the source, with the page and the date it was read).
 *
 * Read 10 November 2026 (Day 2 of the regional audit). Nothing here is inferred: a row exists only where the page
 * was opened and read. Re-read row by row by an independent checker on 11 November 2026; changes are marked "Checker".
 */
import type { ClosedSeason } from "../closed-seasons";
import type { LandPlace, LandRule } from "../land-rules";

/** Date every page below was opened and read. */
const CHECKED = "2026-11-10";

// ---- Centres (degrees; the integrator defines these once) -------------------------------------------------------
const CHARLOTTETOWN = { lat: 46.2354, lon: -63.1265 };
const FREDERICTON = { lat: 45.9488, lon: -66.6292 };
const MONCTON = { lat: 46.0986, lon: -64.8004 };
const SAINT_JOHN = { lat: 45.2788, lon: -66.0585 };
const HALIFAX = { lat: 44.6486, lon: -63.5859 };
const PORTLAND = { lat: 43.6574, lon: -70.2587 };

// The 2026-27 summary's own page on gnb.ca (published 2026/03/25), which links the booklet. Checker's re-read, 11 November 2026:
//   the booklet's gnb.ca PDF (https://www.gnb.ca/content/dam/GNB3/c/fishnb---pechenb/doc/Fish.pdf) refuses automated reads
//   (robots), and the older www2.gnb.ca/.../Fish/Fish.pdf address now serves the 2022 edition ("Regular season 2022 • Winter
//   2023"), so it is not cited. The rows below were checked against a copy of the same 2026-27 booklet (cover "Regular Season
//   2026 - Winter 2027", print code "25-02372 | 2026.03"; text ends at p. 48) posted by the Municipality of Tantramar:
//   https://tantramarnb.com/sites/default/files/2026-06/GNB%20Fishing%20Regulations%202026-2027.pdf
const NB_FISH_SRC = "https://www.gnb.ca/en/campaign/fish-nb-days/fish-2026-27.html";
// Maritime Provinces Fishery Regulations (SOR/93-55, current to 2026-10-19), Part XVII Trout (page 9) and Schedule IX (page 20).
const MPFR_TROUT = "https://laws-lois.justice.gc.ca/eng/regulations/SOR-93-55/page-9.html";
const DFO_GULF_GROUND = "https://www.inter.dfo-mpo.gc.ca/en/gvo-2026-011";
const DFO_MAR_DIAD = "https://dfo-mpo.gc.ca/fisheries-peches/recreational-recreative/maritimes/diadrom-eng.html";
const DFO_MAR_PELAG = "https://dfo-mpo.gc.ca/fisheries-peches/recreational-recreative/maritimes/pelag-eng.html";
const DFO_MAR_GROUND = "https://www.dfo-mpo.gc.ca/fisheries-peches/recreational-recreative/maritimes/groundfish-poisson-fond-eng.html";
const NS_HANDBOOK = "https://www.novascotia.ca/sites/default/files/documents/1-2412/anglers-handbook-en.pdf";
const PEI_SUMMARY = "https://www.princeedwardisland.ca/sites/default/files/23d9/Angling%20Summary.pdf";

export const CLOSED: ClosedSeason[] = [
  // ======================= Canada: New Brunswick (Fredericton, Saint John, Moncton) ===============================
  // source: NB Fish 2026-2027 Regulations Summary (Natural Resources and Energy Development; "Regular Season 2026 to Winter 2027",
  //   printed March 2026; gnb.ca landing page published 2026/03/25), read 10 November 2026. RFA boundaries (pp. 36-48):
  //   Lower Saint John = "All lakes, rivers, and streams of the Saint John River drainage and tributaries downstream" "from the Covered
  //   Bridge at Hartland to the Saint John Harbour Bridge"; Inner Bay of Fundy = "All lakes, rivers, and streams draining into the Bay of
  //   Fundy eastward of the Saint John harbor bridge"; Southwest = draining "westward from the Saint John Harbour Bridge"; Southeast = "All
  //   lakes, rivers, and streams draining into the Gulf of St. Lawrence and Northumberland Strait south of Point Escuminac".
  //   Southeast, Inner Bay, Lower Saint John and Southwest: "There is no open season for sea-run Atlantic salmon."
  // source: DFO Maritimes Region, Diadromous species page (date modified 2026-04-07): "Salmon angling seasons in all SFAs in the Maritimes
  //   Region (SFA 19-23) are closed due to conservation concerns" "with the exception of three rivers (Middle, Baddeck and North rivers) in
  //   SFA 19 (Cape Breton East)"; map caption "Maritimes Region Salmon Fishing Areas (SFAs) 23 in New Brunswick and 19 to 22 in Nova Scotia."
  {
    id: "ca-nb-fredericton-atlantic-salmon",
    countryCode: "CA",
    admin1: ["NB", "New Brunswick"],
    near: { ...FREDERICTON, km: 20 },
    species: ["atlantic-salmon"],
    closed: [{ from: "01-01", to: "12-31" }],
    water: ["rivers", "estuary"],
    note:
      "New Brunswick's 2026-27 summary says there is no open season for sea-run Atlantic salmon in the Lower Saint John area, which is the Saint John River and its tributaries from Hartland down to the Saint John Harbour Bridge. DFO also says salmon angling is closed in every Maritimes Region salmon fishing area, including SFA 23 in New Brunswick. Landlocked salmon (the same species) may be fished only in the lakes and streams the summary lists.",
    regulator: "NB Natural Resources and Energy Development; Fisheries and Oceans Canada (Maritimes)",
    source: NB_FISH_SRC,
    checked: CHECKED,
  },
  {
    id: "ca-nb-saint-john-atlantic-salmon",
    countryCode: "CA",
    admin1: ["NB", "New Brunswick"],
    near: { ...SAINT_JOHN, km: 20 },
    species: ["atlantic-salmon"],
    closed: [{ from: "01-01", to: "12-31" }],
    water: ["rivers", "sea", "estuary"],
    note:
      "Saint John sits at the Saint John Harbour Bridge, where three of New Brunswick's fishing areas meet: the Lower Saint John, the Inner Bay of Fundy and the Southwest. The 2026-27 summary says each has no open season for sea-run Atlantic salmon. DFO says salmon angling is closed in all Maritimes Region salmon areas, SFA 23 in New Brunswick among them. Landlocked salmon (the same species) is closed except on listed waters: Loch Lomond Reservoir and Second Lake run 1 May to 30 September, and Ratcliffe Brook 15 April to 30 September, so this closure does not cover landlocked salmon on Ratcliffe Brook in that season.",
    regulator: "NB Natural Resources and Energy Development; Fisheries and Oceans Canada (Maritimes)",
    source: NB_FISH_SRC,
    checked: CHECKED,
  },
  {
    id: "ca-nb-moncton-atlantic-salmon",
    countryCode: "CA",
    admin1: ["NB", "New Brunswick"],
    near: { ...MONCTON, km: 25 },
    species: ["atlantic-salmon"],
    closed: [{ from: "01-01", to: "12-31" }],
    water: ["rivers", "estuary"],
    note:
      "Around Moncton, waters draining to the Bay of Fundy (the Petitcodiac) are in New Brunswick's Inner Bay of Fundy area. Waters draining to the Northumberland Strait are in the Southeast area. The 2026-27 summary says neither has an open season for sea-run Atlantic salmon, and DFO says salmon angling is closed in all Maritimes Region salmon areas.",
    regulator: "NB Natural Resources and Energy Development; Fisheries and Oceans Canada (Maritimes)",
    source: NB_FISH_SRC,
    checked: CHECKED,
  },

  // source: NB Fish 2026-2027 summary — trout (brook, brown, rainbow; lake trout and arctic char in some RFAs): Lower Saint John (p. 40),
  //   Inner Bay of Fundy (p. 38), Southeast (p. 36): rivers/brooks/streams "Apr 15 - Sept 15"; lakes/ponds/reservoirs "May 1 - Sept 15";
  //   Southwest (p. 44): Apr 15 - Sept 15 except boundary waters with Maine (Apr 15 - Sept 30). "Refer to 'Exceptions and special
  //   regulations' listed below for water specifc regulations." Lower Saint John exceptions (p. 43): Saint John River "from the Mactaquac
  //   dam downstream to a line drawn across the river from the mouth of Springhill Brook" "(Hartt Island Campground) to the western
  //   Fredericton city limit on the north side of the river" — "Closed to angling" (no dates). Winter season Jan 1 - Mar 31 on listed
  //   "Designated Inland, Designated International and Designated Tidal waters (see pages 55-59)" (pp. 55-59 not in the text read).
  //   Checker: no exception in these four RFAs gives trout a season past Sept 15 or before Apr 15 (Southwest boundary waters aside).
  // source: Maritime Provinces Fishery Regulations, SOR/93-55 (Justice Laws, current to 2026-10-19), Part XVII Trout, close-time table
  //   item 12: "Inland and tidal waters of New Brunswick not set out in items 6 to 11." — "Sept. 16 to Apr. 14" (items 6-11 name First
  //   Green Lake, the Restigouche, northern counties, Queens/Sunbury surface mine ponds and the Shepody above Harvey Bank). s. 104(a): the
  //   Part does not apply to angling or set lines "in the waters set out in Schedule IX" from January 1 to March 31. Schedule IX ("Winter
  //   Fishing Waters in New Brunswick", page 20) names lakes, ponds and reservoirs; its only river entry is "Mactaquac Lake on the Saint
  //   John River, from the Mactaquac Dam upstream to the Grafton Bridge in Woodstock". No tidal waters and no river at the three towns.
  {
    id: "ca-nb-fredericton-trout-rivers",
    countryCode: "CA",
    admin1: ["NB", "New Brunswick"],
    near: { ...FREDERICTON, km: 20 },
    species: ["brook-trout", "brown-trout", "rainbow-trout"],
    closed: [{ from: "09-16", to: "04-14" }],
    water: ["rivers"],
    note:
      "In New Brunswick's Lower Saint John area, which takes in Fredericton, the 2026-27 summary opens trout in rivers, brooks and streams from 15 April to 15 September. The federal Maritime Provinces Fishery Regulations set the same close time, 16 September to 14 April, for New Brunswick's inland and tidal waters; the winter waters they list (1 January to 31 March) are lakes and ponds, not the rivers at Fredericton. The Saint John River is closed to angling from the Mactaquac dam down to Fredericton's western city limit on the north side (Hartt Island). Waters in the summary's exceptions table have their own rules.",
    regulator: "NB Natural Resources and Energy Development (Lower Saint John RFA); Maritime Provinces Fishery Regulations",
    source: MPFR_TROUT,
    checked: CHECKED,
  },
  {
    id: "ca-nb-saint-john-trout-rivers",
    countryCode: "CA",
    admin1: ["NB", "New Brunswick"],
    near: { ...SAINT_JOHN, km: 20 },
    species: ["brook-trout", "brown-trout", "rainbow-trout"],
    closed: [{ from: "09-16", to: "04-14" }],
    water: ["rivers"],
    note:
      "Around Saint John the Lower Saint John, Inner Bay of Fundy and Southwest areas meet. The 2026-27 summary opens trout in rivers, brooks and streams from 15 April to 15 September in all three. The only longer season is on the Southwest's boundary waters with Maine, which are far from Saint John. The federal Maritime Provinces Fishery Regulations set the same close time, 16 September to 14 April, for New Brunswick's inland and tidal waters; the winter waters they list (1 January to 31 March) are lakes and ponds, not rivers. Named waters in the summary's exceptions tables have their own gear and bag rules.",
    regulator: "NB Natural Resources and Energy Development (Lower Saint John, Inner Bay of Fundy and Southwest RFAs); Maritime Provinces Fishery Regulations",
    source: MPFR_TROUT,
    checked: CHECKED,
  },
  {
    id: "ca-nb-moncton-trout-rivers",
    countryCode: "CA",
    admin1: ["NB", "New Brunswick"],
    near: { ...MONCTON, km: 25 },
    species: ["brook-trout", "brown-trout", "rainbow-trout"],
    closed: [{ from: "09-16", to: "04-14" }],
    water: ["rivers"],
    note:
      "Moncton's rivers fall in New Brunswick's Inner Bay of Fundy area (the Petitcodiac drainage) or its Southeast area (streams to the Northumberland Strait). In both, the 2026-27 summary opens trout in rivers, brooks and streams from 15 April to 15 September, and the federal Maritime Provinces Fishery Regulations set the same close time, 16 September to 14 April, for New Brunswick's inland and tidal waters; the winter waters they list are lakes and ponds, not rivers. Under a DFO order, parts of the Petitcodiac, Little and Pollett rivers west of the city are also closed to all angling from 15 April to 15 May (see the Petitcodiac row). Named waters in the summary's exceptions tables have their own rules.",
    regulator: "NB Natural Resources and Energy Development (Inner Bay of Fundy and Southeast RFAs); Maritime Provinces Fishery Regulations",
    source: MPFR_TROUT,
    checked: CHECKED,
  },

  // source: DFO Maritimes Region, MAR-VAR-2026-060, "ORDER VARYING THE CLOSE TIMES FOR ANGLING IN CERTAIN WATERS OF NEW BRUNSWICK"
  //   (issued and published March 27, 2026): angling for "any species of fish" prohibited annually from April 15 to May 15, inclusive,
  //   until December 31, 2029, in: Petitcodiac River from the mouth of Boundary Creek (46° 2.985' N, 64° 58.652' W) upstream to the bridge
  //   near the Petitcodiac Baptist Church; Little River from its mouth upstream to 46° 0.348' N, 64° 58.992' W; Pollett River from its
  //   mouth to a point near Sanitorium Road; The Beaman Hole. Written as a note: the closed stretches lie about 15 to 35 km west of Moncton
  //   (Boundary Creek mouth 46.050 N, 64.978 W; church bridge 45.934 N, 65.177 W; Beaman Hole about 45.866 N, 65.098 W) and do not
  //   cover every river in the town's circle.
  {
    id: "ca-nb-moncton-petitcodiac-closure",
    countryCode: "CA",
    admin1: ["NB", "New Brunswick"],
    near: { ...MONCTON, km: 40 },
    species: [],
    closed: [],
    water: ["rivers"],
    note:
      "A DFO variation order (MAR-VAR-2026-060) closes these waters to angling for every species from 15 April to 15 May each year, until 31 December 2029: the Petitcodiac River from the mouth of Boundary Creek upstream to the bridge near the Petitcodiac Baptist Church, the lower Little River, the lower Pollett River up to near Sanitorium Road, and the Beaman Hole. The closed stretches lie west of Moncton; the order does not cover the river through the city.",
    regulator: "Fisheries and Oceans Canada (Maritimes Region), MAR-VAR-2026-060",
    source: "https://www.inter.dfo-mpo.gc.ca/en/mar-var-2026-060",
    checked: CHECKED,
  },

  // source: NB Fish 2026-2027 summary — lakes/ponds trout "May 1 - Sept 15" (pp. 36, 38, 40); landlocked salmon: Lower Saint John
  //   (p. 40) Newcastle Creek Apr 15 - Sept 30; Grand, Oromocto, Second Eel and Yoho lakes May 1 - Sept 30; Inner Bay (p. 38) Ratcliffe
  //   Brook Apr 15 - Sept 30, Loch Lomond Reservoir and Second Lake May 1 - Sept 30 (limit 1); "Landlocked salmon angling is closed in all
  //   waters other than those listed". Smallmouth bass general: rivers Apr 15 - Sept 15, lakes May 1 - Sept 15, 5 a day, 10-60 cm.
  //   Managed waters (p. 41): "Tidal portions of the following Saint John River and all tributaries downstream of the Mactaquac Dam":
  //   "Apr 15 - June 30" "0"; "July 1 - Sept 15" "2" "30 cm" "60 cm"; "Sept 16 - Nov 30" "0". Non-tidal managed rivers (Kennebecasis
  //   below Bloomfield Station bridge, Hammond below French Village bridge, Nashwaak below Durham Bridge, Oromocto below Route 101):
  //   Apr 15 - June 30 "0", July 1 - Sept 15 "2", Sept 16 - Oct 15 "0". Mandatory retention from April 1, 2026 (p. 7): black crappie
  //   (all RFAs); chain pickerel and muskellunge (Southeast, Inner Bay among others); largemouth bass (Southeast, Inner Bay, Upper Saint
  //   John among others); smallmouth bass (Restigouche, Chaleur, Miramichi, Southeast). Non-sport fish (perch, pickerel): "Angling for
  //   these species is only permitted when a sportfish season is open on the waterbody you are fishing."
  {
    id: "ca-nb-fredericton-lakes-bass-note",
    countryCode: "CA",
    admin1: ["NB", "New Brunswick"],
    near: { ...FREDERICTON, km: 20 },
    species: [],
    closed: [],
    note:
      "In New Brunswick's Lower Saint John area the 2026-27 summary opens trout in lakes and ponds from 1 May to 15 September. Landlocked salmon is open only on listed waters: Grand, Oromocto, Second Eel and Yoho lakes from 1 May to 30 September, and Newcastle Creek from 15 April. Smallmouth bass are open 15 April to 15 September in rivers and 1 May to 15 September in lakes. Managed waters have their own bass rules: on the tidal Saint John River below the Mactaquac Dam no bass may be kept from 15 April to 30 June or from 16 September to 30 November, and 2 a day (30 to 60 cm) may be kept from 1 July to 15 September. The Nashwaak below Durham Bridge follows the same pattern but ends on 15 October. Many lakes are open in winter (1 January to 31 March) only if listed for it. Black crappie must be kept.",
    regulator: "NB Natural Resources and Energy Development (Lower Saint John RFA)",
    source: NB_FISH_SRC,
    checked: CHECKED,
  },
  {
    id: "ca-nb-saint-john-lakes-bass-note",
    countryCode: "CA",
    admin1: ["NB", "New Brunswick"],
    near: { ...SAINT_JOHN, km: 20 },
    species: [],
    closed: [],
    note:
      "Around Saint John the 2026-27 summary opens trout in lakes and ponds from 1 May to 15 September. Landlocked salmon is open in Loch Lomond Reservoir and Second Lake from 1 May to 30 September (1 a day) and in Ratcliffe Brook from 15 April. Smallmouth bass are open 15 April to 15 September in rivers and 1 May to 15 September in lakes (5 a day, 10 to 60 cm). On the Kennebecasis below Bloomfield Station, no bass may be kept from 15 April to 30 June or from 16 September to 15 October, and 2 a day (30 to 60 cm) from 1 July to 15 September; the Hammond below French Village has the same limits but is closed before 1 May. On the tidal Saint John River and its tributaries below the Mactaquac Dam the no-keep autumn period runs to 30 November. In the Inner Bay of Fundy area, largemouth bass, chain pickerel, muskellunge and black crappie must be kept. The winter season (1 January to 31 March) is open only on listed waters.",
    regulator: "NB Natural Resources and Energy Development",
    source: NB_FISH_SRC,
    checked: CHECKED,
  },
  {
    id: "ca-nb-moncton-lakes-bass-note",
    countryCode: "CA",
    admin1: ["NB", "New Brunswick"],
    near: { ...MONCTON, km: 25 },
    species: [],
    closed: [],
    note:
      "Around Moncton the 2026-27 summary opens trout in lakes and ponds from 1 May to 15 September in both the Inner Bay of Fundy and Southeast areas. In the Inner Bay of Fundy area smallmouth bass are open 15 April to 15 September in rivers and 1 May to 15 September in lakes (5 a day, 10 to 60 cm). From 1 April 2026 a licence condition requires anglers to keep certain species they catch: in the Southeast area smallmouth bass, largemouth bass, chain pickerel, muskellunge and black crappie, and in the Inner Bay of Fundy area largemouth bass, chain pickerel, muskellunge and black crappie. Some non-sport fish may be angled only while a sport-fish season is open on that water. The winter season (1 January to 31 March) is open only on listed waters.",
    regulator: "NB Natural Resources and Energy Development",
    source: NB_FISH_SRC,
    checked: CHECKED,
  },

  // source: NB Fish 2026-2027 summary, non-sport fish tables, headers "SEASON" with sub-headers "NON-TIDAL TIDAL": Inner Bay (p. 38-39)
  //   "Striped bass Open sport fish season** Jan 1 to Dec 29 1 68 cm 150 cm"; Lower Saint John "Striped bass Closed after Oct 15 Jan 1 -
  //   Dec 29 1 68 cm 150 cm"; Southwest "Open sport fish season** Jan 1 - Dec 29". p. 6: for the Restigouche, Chaleur, Miramichi and
  //   Southeast RFAs, striped bass measures "not available" at printing; see DFO.
  // source: DFO Maritimes Region, Diadromous species page (2026-04-07): striped bass tidal waters "Open year-round."; inland "Open season
  //   corresponds to the longest open season for sport fish"; "The daily Striped bass bag and possession limit is one (1)."; 68 to 150 cm.
  // source: DFO Gulf Region, Striped Bass Recreational Fishery, southern Gulf of St. Lawrence 2026 (Moncton, April 14, 2026): tidal waters
  //   April 15th to October 31st; NB inland "May 1st to September 15th"; 4 a day, 50-65 cm.
  //   Written as notes: the NB summary and the DFO Maritimes page give different tidal dates, and Moncton's circle reaches both the Fundy
  //   and the Gulf coast.
  {
    id: "ca-nb-fredericton-striped-bass-note",
    countryCode: "CA",
    admin1: ["NB", "New Brunswick"],
    near: { ...FREDERICTON, km: 20 },
    species: [],
    closed: [],
    note:
      "For striped bass, New Brunswick's 2026-27 summary prints \"Closed after Oct 15\" in the non-tidal column of the Lower Saint John table and 1 January to 29 December in the tidal column. The limit is 1 a day, 68 to 150 cm. DFO's Maritimes Region page says striped bass are open all year in tidal waters and follow the longest sport-fish season in inland waters. Because the two do not agree, no striped bass dates are loaded here.",
    regulator: "NB Natural Resources and Energy Development; Fisheries and Oceans Canada (Maritimes)",
    source: NB_FISH_SRC,
    checked: CHECKED,
  },
  {
    id: "ca-nb-saint-john-striped-bass-note",
    countryCode: "CA",
    admin1: ["NB", "New Brunswick"],
    near: { ...SAINT_JOHN, km: 20 },
    species: [],
    closed: [],
    note:
      "For striped bass, New Brunswick's 2026-27 summary gives 1 January to 29 December for tidal water in the Inner Bay of Fundy, Lower Saint John and Southwest areas. In non-tidal water they may be angled only while a sport-fish season is open, and the Lower Saint John table says closed after 15 October. The limit is 1 a day, 68 to 150 cm. DFO's Maritimes Region page says tidal waters are open year-round, with the same limit and sizes and no licence. Because the two do not agree, no dates are loaded.",
    regulator: "NB Natural Resources and Energy Development; Fisheries and Oceans Canada (Maritimes)",
    source: DFO_MAR_DIAD,
    checked: CHECKED,
  },
  {
    id: "ca-nb-moncton-striped-bass-note",
    countryCode: "CA",
    admin1: ["NB", "New Brunswick"],
    near: { ...MONCTON, km: 25 },
    species: [],
    closed: [],
    note:
      "Moncton's circle reaches two DFO regions. On the Bay of Fundy side, including the Petitcodiac, DFO's Maritimes page says striped bass are open all year in tidal waters (1 a day, 68 to 150 cm), while New Brunswick's summary prints 1 January to 29 December for tidal water in the Inner Bay of Fundy area. On the Northumberland Strait side, DFO's 2026 Gulf notice opens tidal waters 15 April to 31 October and New Brunswick inland waters 1 May to 15 September (4 a day, 50 to 65 cm). No dates are loaded.",
    regulator: "Fisheries and Oceans Canada (Maritimes and Gulf regions); NB Natural Resources and Energy Development",
    source: DFO_MAR_DIAD,
    checked: CHECKED,
  },

  // source: DFO Maritimes Region, Pelagics page (date modified 2025-05-14): mackerel "Open season April 1 to December 31 in tidal waters";
  //   "All tidal waters"; "No licence required"; "The daily and total possession limit is 20 Atlantic mackerel per person when fishing
  //   recreationally"; one line, no more than three hooks; "As of 2025, there is no minimum legal size."
  //   Scope (Diadromous page intro, same region): "inland and tidal (coastal) waters of Nova Scotia from Cape North in Cape Breton," "along
  //   the Atlantic Coast and the waters of the Bay of Fundy, to the border between New Brunswick and the State of Maine."
  // source: DFO Gulf Region, "Recreational Fishing for Mackerel" (May 8, 2025, marked IN EFFECT; Mackerel page modified 2026-11-09):
  //   southern Gulf of St Lawrence (MFA 16) "April 1st to December 31st", 20 a day.
  {
    id: "ca-nb-saint-john-mackerel",
    countryCode: "CA",
    admin1: ["NB", "New Brunswick"],
    near: { ...SAINT_JOHN, km: 20 },
    species: ["atlantic-mackerel"],
    closed: [{ from: "01-01", to: "03-31" }],
    water: ["sea", "estuary"],
    note:
      "DFO's Maritimes Region page opens mackerel in all tidal waters, the Bay of Fundy included, from 1 April to 31 December. The limit is 20 a day and in possession, with no minimum size and one line of up to three hooks. No licence is needed.",
    regulator: "Fisheries and Oceans Canada (Maritimes Region)",
    source: DFO_MAR_PELAG,
    checked: CHECKED,
  },
  {
    id: "ca-nb-moncton-mackerel",
    countryCode: "CA",
    admin1: ["NB", "New Brunswick"],
    near: { ...MONCTON, km: 25 },
    species: ["atlantic-mackerel"],
    closed: [{ from: "01-01", to: "03-31" }],
    water: ["sea", "estuary"],
    note:
      "Both of Moncton's coasts give the same mackerel season. DFO's Maritimes page (Bay of Fundy) and its Gulf Region notice (southern Gulf, in effect since 8 May 2025) both open recreational mackerel from 1 April to 31 December, 20 a day, with one line of up to three hooks in tidal waters.",
    regulator: "Fisheries and Oceans Canada (Maritimes and Gulf regions)",
    source: DFO_MAR_PELAG,
    checked: CHECKED,
  },

  // source: DFO Maritimes Region, Recreational groundfish page (date modified 2023-07-31): "The Maritimes Region is divided into two areas
  //   for the purpose of managing the recreational groundfish fishery:" "Halifax Harbour and West", "including the Bay of Fundy" — "Open from
  //   February 1st until December 31st"; "No cod may be retained except for the period between the 3rd Saturday in June to Labour Day";
  //   "only 5 cod may be retained as part of the daily bag limit of 10 groundfish." "Hartlen Point (at the entrance to Halifax Harbour) East
  //   to Cape North" — "Open from the 3rd Saturday in June to the end of Labour Day"; "The daily groundfish bag limit is 5 in total". No licence.
  {
    id: "ca-nb-saint-john-cod",
    countryCode: "CA",
    admin1: ["NB", "New Brunswick"],
    near: { ...SAINT_JOHN, km: 20 },
    species: ["atlantic-cod"],
    closed: [{ from: "01-01", to: "01-31" }],
    noKeep: [{ from: "09-08", to: "06-19" }],
    water: ["sea", "estuary"],
    note:
      "DFO manages recreational groundfish in the Bay of Fundy as part of its Halifax Harbour and West area, open 1 February to 31 December with no licence. Cod may be kept only from the third Saturday in June to Labour Day (20 June to 7 September in 2026), up to 5 within a daily limit of 10 groundfish; at other times in the season they must be released.",
    regulator: "Fisheries and Oceans Canada (Maritimes Region)",
    source: DFO_MAR_GROUND,
    checked: CHECKED,
  },
  // source (added by the checker): DFO Gulf Region, GVO-2026-011, Close Time and Quota Variation Order, recreational groundfish, Division
  //   4T (issued, published and in force April 13, 2026; revoked January 1, 2027): waters not opened by the windows are closed "to
  //   recreational fishing for groundfish beginning on April 13, 2026 to December 31, 2026". New Brunswick, within 50 m of the coast:
  //   Apr 15 - Jul 15 and Aug 22 - Oct 1, fifteen groundfish with no cod; Jul 16 - Aug 21 (sunrise to sunset) "Limit B" (fifteen
  //   groundfish, up to five cod and/or white hake). Other New Brunswick waters: Jul 16 - Aug 21 only. Bay of Fundy side: DFO Maritimes
  //   groundfish page as above. Written as a note: Moncton's circle reaches the Fundy side (Maritimes Region) and, at its edge near
  //   Shediac, the Northumberland Strait (Gulf Region), and the two closed periods do not overlap.
  {
    id: "ca-nb-moncton-cod-note",
    countryCode: "CA",
    admin1: ["NB", "New Brunswick"],
    near: { ...MONCTON, km: 25 },
    species: [],
    closed: [],
    water: ["sea", "estuary"],
    note:
      "Moncton's circle reaches two DFO regions with different groundfish rules. On the Bay of Fundy side, DFO's Maritimes page opens recreational groundfish from 1 February to 31 December, and cod may be kept only from the third Saturday in June to Labour Day (20 June to 7 September in 2026). On the Northumberland Strait side, DFO's 2026 Gulf order allows groundfishing within 50 m of the shore from 15 April to 1 October, keeps cod only from 16 July to 21 August, and closes all waters from 2 October to 31 December 2026. No cod dates are loaded here.",
    regulator: "Fisheries and Oceans Canada (Maritimes and Gulf regions)",
    source: DFO_GULF_GROUND,
    checked: CHECKED,
  },

  // source: NB Fish 2026-2027 summary, p. 13-15, p. 23 — "Anglers 16 years of age and older require a provincial licence while angling in
  //   inland waters."; "Angling licences are not required in tidal waters."; "Your season Angling Licence is valid from April 15 until March
  //   31 of the following year."; Fish NB Days "JUNE 6-7, 2026 AND FEBRUARY 13-15, 2027".
  {
    id: "ca-nb-licence",
    countryCode: "CA",
    admin1: ["NB", "New Brunswick"],
    species: [],
    closed: [],
    note:
      "In New Brunswick anglers 16 and older need a provincial licence to fish inland waters; under-16s need none for species other than Atlantic salmon. No angling licence is needed in tidal waters. A season licence runs from 15 April to 31 March and covers the winter season. On Fish NB Days (6-7 June 2026 and 13-15 February 2027) no licence is needed, but all limits and closures apply.",
    regulator: "NB Natural Resources and Energy Development",
    source: NB_FISH_SRC,
    checked: CHECKED,
  },

  // ======================= Canada: Nova Scotia (Halifax) =========================================================
  // source: DFO Maritimes Region, Diadromous species page (2026-04-07) — salmon closed in all SFAs 19-23 except Middle, Baddeck and North
  //   rivers (SFA 19). Nova Scotia 2026 Salmon Regulations overview: SFA 20 (Eastern Shore) "Closed all year"; SFA 21 (Southwestern Nova
  //   Scotia) "Closed all year"; SFA 22 (Upper Bay of Fundy) "Closed all year"; daily and yearly catch-and-retain limits zero.
  {
    id: "ca-ns-halifax-atlantic-salmon",
    countryCode: "CA",
    admin1: ["NS", "Nova Scotia"],
    near: { ...HALIFAX, km: 25 },
    species: ["atlantic-salmon"],
    closed: [{ from: "01-01", to: "12-31" }],
    water: ["rivers", "sea", "estuary"],
    note:
      "DFO says salmon angling is closed in all Maritimes Region salmon fishing areas (SFAs 19 to 23) except three Cape Breton rivers, where it is catch-and-release only. Nova Scotia's 2026 salmon overview lists SFA 20 (Eastern Shore), SFA 21 (Southwestern Nova Scotia) and SFA 22 (Upper Bay of Fundy) as closed all year, and sets the catch-and-retain limit at zero in the areas still open.",
    regulator: "Fisheries and Oceans Canada (Maritimes); Government of Nova Scotia",
    source: DFO_MAR_DIAD,
    checked: CHECKED,
  },
  // source: Nova Scotia Anglers' Handbook and 2026 Summary of Regulations, RFA 3 "Halifax and Lunenburg Counties" (pp. 37-42): trout
  //   (brook/brown/rainbow) "Inland waters - Apr 1 to Sep 30 except the waters referred to in the listings below."; "From Sep 1 to Sep 30,
  //   no Brook Trout may be retained and natural bait is prohibited in all waters."; "Tidal waters of Halifax County (Halifax Harbour and
  //   East) — Apr 15 to Sep 30."; "Tidal waters of Halifax County (West of Halifax Harbour) and Lunenburg County - Apr 1 to Sep 30."
  //   Listed Halifax rivers have fly-only stretches or closures (Sackville, Little Sackville, Musquodoboit, East River Sheet Harbour);
  //   the Ingram River entry closes only "from a point 23 m downstream from the Highway 3 bridge to a point 23 m upstream from that
  //   bridge, including tributaries, CLOSED ALL YEAR"; no Halifax river is listed with a longer season. Within 25 km of Halifax the
  //   listings are the Sackville ("50 m below the Shore Drive Bridge, near Bedford" up to "200 m upstream from the Lucasville Road
  //   Bridge") and Little Sackville (to the outlet of Feely Lake), artificial fly only "Jun 1 to the end of all fishing seasons".
  {
    id: "ca-ns-halifax-trout-rivers",
    countryCode: "CA",
    admin1: ["NS", "Nova Scotia"],
    near: { ...HALIFAX, km: 25 },
    species: ["brook-trout", "brown-trout", "rainbow-trout"],
    closed: [{ from: "10-01", to: "03-31" }],
    water: ["rivers"],
    note:
      "Nova Scotia's 2026 handbook puts Halifax County in RFA 3, where inland waters are open for brook, brown and rainbow trout from 1 April to 30 September, except for the waters it lists. From 1 to 30 September no brook trout may be kept and natural bait is banned. Near Halifax, stretches of the Sackville and Little Sackville rivers are fly-fishing only from 1 June; listed waters farther out have closures of their own. Some Halifax lakes are open longer (see the lakes row).",
    regulator: "Government of Nova Scotia, Anglers' Handbook 2026 (RFA 3)",
    source: NS_HANDBOOK,
    checked: CHECKED,
  },
  // Checker: the 8 km circle holds Halifax Harbour, Bedford Basin and the Northwest Arm; open coast west of the harbour mouth (Herring
  //   Cove) is about 9 km out. Maritime Provinces Fishery Regulations (SOR/93-55, current to 2026-10-19), Part XVII item 3: "Inland and
  //   tidal waters of the Counties of Antigonish, Cape Breton, Colchester, Cumberland, Halifax, Hants..." "Oct. 1 to Apr. 14", excluding
  //   waters "of Halifax County west of Highway 102 and west of Halifax Harbour" (item 5: "Oct. 1 to Mar. 31").
  {
    id: "ca-ns-halifax-trout-tidal",
    countryCode: "CA",
    admin1: ["NS", "Nova Scotia"],
    near: { ...HALIFAX, km: 8 },
    species: ["brook-trout", "brown-trout", "rainbow-trout"],
    closed: [{ from: "10-01", to: "04-14" }],
    water: ["sea", "estuary"],
    note:
      "Nova Scotia's 2026 handbook opens trout in the tidal waters of Halifax County from Halifax Harbour eastward from 15 April to 30 September. Tidal waters west of the harbour open earlier, on 1 April. No licence is needed in tidal waters, but the season and limits apply. From 1 to 30 September no brook trout may be kept.",
    regulator: "Government of Nova Scotia, Anglers' Handbook 2026 (RFA 3)",
    source: NS_HANDBOOK,
    checked: CHECKED,
  },
  // source: same handbook, RFA 3 — "EXTENDED SEASONS FOR RAINBOW TROUT AND/OR BROOK TROUT": "OPEN ALL YEAR. The bag limit is reduced to
  //   two (2) Trout, either species or combined, Oct 1 to Mar 31." — "Albro Lake, Lewis Lake and Round Lake at Jerry Lawrence Park, Maynard
  //   Lake, Penhorn Lake, First Lake," "Cow Bay Pond, Tucker Lake, Williams Lake, Halifax County." Smallmouth Bass: "Apr 1 to Oct 31. Bag
  //   limit five (5) bass, except for waters referred to in the listings below."; "EXTENDED SEASONS FOR SMALLMOUTH BASS": "Apr 1 to Dec 31.
  //   Bag limit three (3) bass." for "Banook Lake and Micmac Lake, Halifax County"; further list ends "Tucker Lake, Halifax County, OPEN ALL
  //   YEAR."; some Halifax County lakes catch and release only. Checker: the bass entry also makes retention mandatory east of Highway
  //   102 (from its junction with Highway 104, through Highway 118 and Highway 107, to Ross Road near Upper Lawrencetown), where the bass
  //   season coincides with the trout season; Grand Lake (Shubenacadie), Morris Lake and Big Mushamush Lake: no bass kept May 1 - June 15.
  {
    id: "ca-ns-halifax-lakes-bass-note",
    countryCode: "CA",
    admin1: ["NS", "Nova Scotia"],
    near: { ...HALIFAX, km: 25 },
    species: [],
    closed: [],
    water: ["lakes"],
    note:
      "Trout in Halifax County lakes follow RFA 3's inland season (1 April to 30 September), except the lakes the 2026 handbook lists as open all year for rainbow and brook trout. Those are Albro, Lewis and Round lakes at Jerry Lawrence Park, Maynard, Penhorn and First lakes, Cow Bay Pond, Tucker Lake and Williams Lake, where the limit drops to 2 trout from 1 October to 31 March. Smallmouth bass are open 1 April to 31 October (5 a day). East of a line along Highways 102, 118 and 107 to Ross Road near Upper Lawrencetown, every smallmouth bass caught must be kept and the bass season follows the trout season. Banook and Micmac lakes run to 31 December (3 a day), other listed lakes have extended seasons, and Tucker Lake is listed as open all year. Several Halifax County lakes are catch-and-release only.",
    regulator: "Government of Nova Scotia, Anglers' Handbook 2026 (RFA 3)",
    source: NS_HANDBOOK,
    checked: CHECKED,
  },
  // source: DFO Maritimes, Diadromous species page (2026-04-07): striped bass tidal waters "Open year-round."; exception: closed April 1 to
  //   June 30 on the Annapolis River, NS, Hebbs Landing to the Lawrencetown bridge; "No licence required when fishing in tidal waters."
  //   NS Anglers' Handbook 2026 (pp. 11-12): "Tidal waters open all year, except closed Apr 1 to Jun 30 on the Annapolis River"; one fish,
  //   "not less than 68 cm (26.8 in) overall length", not more than 150 cm; Shubenacadie and Stewiacke rivers and Grand Lake have spring
  //   closures and release periods.
  {
    id: "ca-ns-halifax-striped-bass",
    countryCode: "CA",
    admin1: ["NS", "Nova Scotia"],
    near: { ...HALIFAX, km: 25 },
    species: ["striped-bass"],
    closed: [],
    water: ["sea", "estuary"],
    note:
      "DFO's Maritimes Region page and Nova Scotia's 2026 handbook both list striped bass as open all year in tidal waters. The only tidal closure they name is on the Annapolis River, far from Halifax. The limit is 1 a day, 68 to 150 cm, and no licence is needed in tidal waters. In inland waters the season follows the longest sport-fish season on that water, and the Shubenacadie, Stewiacke and Grand Lake have spring rules of their own.",
    regulator: "Fisheries and Oceans Canada (Maritimes Region); Government of Nova Scotia",
    source: DFO_MAR_DIAD,
    checked: CHECKED,
  },
  {
    id: "ca-ns-halifax-mackerel",
    countryCode: "CA",
    admin1: ["NS", "Nova Scotia"],
    near: { ...HALIFAX, km: 25 },
    species: ["atlantic-mackerel"],
    closed: [{ from: "01-01", to: "03-31" }],
    water: ["sea", "estuary"],
    note:
      "DFO's Maritimes Region page opens mackerel in all tidal waters from 1 April to 31 December. The limit is 20 a day and in possession, with no minimum size and one line of up to three hooks. No licence is needed.",
    regulator: "Fisheries and Oceans Canada (Maritimes Region)",
    source: DFO_MAR_PELAG,
    checked: CHECKED,
  },
  {
    id: "ca-ns-halifax-cod",
    countryCode: "CA",
    admin1: ["NS", "Nova Scotia"],
    near: { ...HALIFAX, km: 8 },
    species: ["atlantic-cod"],
    closed: [{ from: "01-01", to: "01-31" }],
    noKeep: [{ from: "09-08", to: "06-19" }],
    water: ["sea", "estuary"],
    note:
      "In DFO's Halifax Harbour and West groundfish area, recreational groundfishing is open 1 February to 31 December with no licence. Cod may be kept only from the third Saturday in June to Labour Day (20 June to 7 September in 2026), up to 5 within a daily limit of 10 groundfish. East of Hartlen Point, at the harbour mouth, groundfish are open only from the third Saturday in June to the end of Labour Day, 5 a day in all.",
    regulator: "Fisheries and Oceans Canada (Maritimes Region)",
    source: DFO_MAR_GROUND,
    checked: CHECKED,
  },
  // source: NS Anglers' Handbook 2026 (pp. 17-18): must "purchase a general fishing licence or a Salmon fishing licence" (exceptions listed);
  //   under 16 no licence; 16 and 17 free; "No licence is required to angle in tidal waters" (seasons and limits apply); "2026 fishing
  //   licences are valid from the date of issue to March 31, 2027."
  {
    id: "ca-ns-licence",
    countryCode: "CA",
    admin1: ["NS", "Nova Scotia"],
    species: [],
    closed: [],
    note:
      "Nova Scotia's 2026 handbook says anglers need a general or a salmon fishing licence. Residents and non-residents under 16 need none, and 16- and 17-year-olds get one at no cost. No licence is needed to angle in tidal waters, but seasons and limits apply. 2026 licences are valid to 31 March 2027.",
    regulator: "Government of Nova Scotia, Anglers' Handbook 2026",
    source: NS_HANDBOOK,
    checked: CHECKED,
  },

  // ======================= Canada: Prince Edward Island (Charlottetown) ==========================================
  // source: PEI 2026 Angling Summary (cover: "2026 Angling Summary"), p. 7: brook trout "Regular season: April 15 to September 15. Daily
  //   limit of 8 brook trout (only 1 > 40cm)"; "Catch and release season: September 16 to September 30, single barbless fly and barbless
  //   lure only (no natural bait)."; "No brook trout can be retained." No water is named where brook trout may be fished after Sept 30.
  //   p. 6: "No provincial angling licence is required to fish in 'tidal waters' but seasons and bag limits remain in effect."
  //   Checker: p. 22: "Glenfinnan Lake and O'Keefes Lake are open to angling year round", "Catch and release only" (both lakes lie
  //   within this circle), so the row no longer covers lakes. Maritime Provinces Fishery Regulations (SOR/93-55, current to 2026-10-19),
  //   Part XVII item 14: "Inland and tidal waters of Prince Edward Island not set out in item 13." — "Oct. 1 to Apr. 14" (item 13:
  //   Glenfinnan, O'Keefes and Afton Lakes, "Oct. 16 to Apr. 14").
  {
    id: "ca-pe-charlottetown-brook-trout",
    countryCode: "CA",
    admin1: ["PE", "Prince Edward Island"],
    near: { ...CHARLOTTETOWN, km: 25 },
    species: ["brook-trout"],
    closed: [{ from: "10-01", to: "04-14" }],
    water: ["rivers", "sea", "estuary"],
    note:
      "PEI's 2026 summary sets the brook trout season at 15 April to 15 September (8 a day, only one over 40 cm). From 16 to 30 September brook trout are catch-and-release only, with a single barbless fly or lure and no natural bait. The summary names no river where brook trout may be fished after 30 September, and it says seasons and limits also apply in tidal waters; the federal regulations close trout in PEI's inland and tidal waters from 1 October to 14 April. Some named waters (parts of the West River) have their own rules. Lakes are not covered here: Glenfinnan Lake and O'Keefes Lake are open all year, catch-and-release only.",
    regulator: "Government of Prince Edward Island (2026 Angling Summary)",
    source: PEI_SUMMARY,
    checked: CHECKED,
  },
  // source: same, p. 8 and pp. 19-21: rainbow trout "Regular season: April 15 to September 15th. Limit of 8 rainbow trout (only 1 > 40cm)";
  //   "Extended season: September 16th to Dec 31st at identified areas on select rivers"; "Limit of 3 rainbow trout per day (no size
  //   restriction)."; "Note: Some areas have an earlier closure date"; Hillsborough River "Downstream from Route 351 in Cherry Hill"; North
  //   River "Downstream from the North York River Road in Milton"; West River "All waters downstream from the 'Foot Bridge' on the Green Road
  //   in Bonshaw"; "Hyde Pond in Cornwall will be open from September 16-November 30."; register and logbook required. No winter trout season.
  //   Written as a note: extended-season sections lie inside the Charlottetown circle.
  {
    id: "ca-pe-charlottetown-rainbow-note",
    countryCode: "CA",
    admin1: ["PE", "Prince Edward Island"],
    near: { ...CHARLOTTETOWN, km: 25 },
    species: [],
    closed: [],
    note:
      "PEI's 2026 summary sets the rainbow trout season at 15 April to 15 September (8 a day, only one over 40 cm). An extended season from 16 September to 31 December applies only on identified sections of select rivers. Near Charlottetown these include the Hillsborough below Route 351 at Cherry Hill, the North River below North York River Road at Milton, the West River below the Green Road footbridge at Bonshaw, and listed sections of the Clyde, Pisquid, Vernon and Orwell rivers. There the limit is 3 a day, a single barbless fly or lure is required, and anglers must register and keep a logbook; some areas close earlier, such as Hyde Pond in Cornwall (16 September to 30 November). Glenfinnan Lake and O'Keefes Lake are open all year, catch-and-release only.",
    regulator: "Government of Prince Edward Island (2026 Angling Summary)",
    source: PEI_SUMMARY,
    checked: CHECKED,
  },
  // source: same, p. 8: Atlantic salmon "Regular season: June 1st to September 15th"; "Extended season: Sept 16th to Oct 31st on select
  //   sections of Morell River and Mill River."; "All angling for Atlantic salmon is catch and release only with a single barbless artificial fly."
  // source: DFO Gulf Region, Atlantic Salmon Recreational Fishing for the Gulf Region in 2026 (April 9, 2026; modified 2026-08-12): PEI
  //   (SFA 17) "catch and release limit of 2 salmon per day during the open salmon fishing season"; "Barbless artificial fly only."
  //   Checker: the extended Morell sections (Leards Pond, the main branch from the Forks to MacKay's, the west and east branches to
  //   Oct 15) lie about 30 km or more from Charlottetown (West Branch Morell at about 46.31 N, 62.70 W); Mill River is at Bloomfield,
  //   western PEI. The circle is cut to 20 km to keep them out.
  {
    id: "ca-pe-charlottetown-atlantic-salmon",
    countryCode: "CA",
    admin1: ["PE", "Prince Edward Island"],
    near: { ...CHARLOTTETOWN, km: 20 },
    species: ["atlantic-salmon"],
    closed: [{ from: "09-16", to: "05-31" }],
    water: ["rivers", "estuary"],
    note:
      "PEI's 2026 summary sets the Atlantic salmon season at 1 June to 15 September, catch-and-release only, with a single barbless artificial fly (no spinners, weights or bead heads). An extended season to 31 October covers only select sections of the Morell and Mill rivers, outside this circle. DFO's 2026 Gulf notice sets a catch-and-release limit of 2 salmon a day.",
    regulator: "Government of Prince Edward Island; Fisheries and Oceans Canada (Gulf Region, SFA 17)",
    source: PEI_SUMMARY,
    checked: CHECKED,
  },
  // source: DFO Gulf Region, Striped Bass Recreational Fishery in the southern Gulf of St. Lawrence 2026 (Moncton, April 14, 2026): "waters
  //   adjacent to the Maritime Provinces in the southern Gulf of St. Lawrence"; tidal waters April 15th to October 31st (PEI, NS, NB); inland
  //   PEI "April 15th to September 15th"; "Anglers can retain a maximum of four (4) striped bass per day"; "minimum length of 50 cm to a
  //   maximum length of 65 cm"; single barbless hooks in tidal waters. PEI summary p. 38: "Striped bass regulations were not available at
  //   time of printing."
  {
    id: "ca-pe-charlottetown-striped-bass-tidal",
    countryCode: "CA",
    admin1: ["PE", "Prince Edward Island"],
    near: { ...CHARLOTTETOWN, km: 25 },
    species: ["striped-bass"],
    closed: [{ from: "11-01", to: "04-14" }],
    water: ["sea", "estuary"],
    note:
      "DFO's 2026 striped bass notice for the southern Gulf of St. Lawrence opens tidal waters around PEI from 15 April to 31 October. The limit is 4 a day and 4 in possession, 50 to 65 cm total length. Single barbless hooks are required, and fishing hours are set (from 1 July, 04:00 to midnight).",
    regulator: "Fisheries and Oceans Canada (Gulf Region)",
    source: "https://www.glf.dfo-mpo.gc.ca/en/striped-bass-recreational-fishery-southern-gulf-st-lawrence-2026",
    checked: CHECKED,
  },
  {
    id: "ca-pe-charlottetown-striped-bass-inland",
    countryCode: "CA",
    admin1: ["PE", "Prince Edward Island"],
    near: { ...CHARLOTTETOWN, km: 25 },
    species: ["striped-bass"],
    closed: [{ from: "09-16", to: "04-14" }],
    water: ["rivers", "lakes"],
    note:
      "DFO's 2026 striped bass notice for the southern Gulf opens PEI's inland waters from 15 April to 15 September, with one line and three hooks. Limits are 4 a day, 50 to 65 cm.",
    regulator: "Fisheries and Oceans Canada (Gulf Region)",
    source: "https://www.glf.dfo-mpo.gc.ca/en/striped-bass-recreational-fishery-southern-gulf-st-lawrence-2026",
    checked: CHECKED,
  },
  {
    id: "ca-pe-charlottetown-mackerel",
    countryCode: "CA",
    admin1: ["PE", "Prince Edward Island"],
    near: { ...CHARLOTTETOWN, km: 25 },
    species: ["atlantic-mackerel"],
    closed: [{ from: "01-01", to: "03-31" }],
    water: ["sea", "estuary"],
    note:
      "DFO's recreational mackerel notice for the southern Gulf of St. Lawrence (dated 8 May 2025 and marked in effect) sets the season at 1 April to 31 December. The limit is 20 a day and in possession, with no minimum size and one line of up to three hooks in tidal waters.",
    regulator: "Fisheries and Oceans Canada (Gulf Region)",
    source: "https://www.glf.dfo-mpo.gc.ca/en/node/316",
    checked: CHECKED,
  },
  // source (added by the checker): DFO Gulf Region, GVO-2026-011, Close Time and Quota Variation Order, recreational groundfish, Division
  //   4T (issued, published and in force April 13, 2026; revoked January 1, 2027): waters not opened by the windows are closed "to
  //   recreational fishing for groundfish beginning on April 13, 2026 to December 31, 2026". PEI, within 50 m of the coastline: Apr 15 -
  //   Jul 31 and Sep 6 - Oct 1 "Limit A" (five groundfish, zero cod, white hake, haddock, pollock, skate, halibut and wolffish); Aug 1 -
  //   Sep 5 (sunrise to sunset) "Limit B" (fifteen groundfish, up to five cod and/or white hake). Other PEI waters: Aug 1 - Sep 5 only.
  //   Loaded as closed: the days closed in both zones (Apr 13-14, Oct 2 - Dec 31). Jan 1 - Apr 12 fell under the revoked 2025 order and
  //   is not loaded. Zero-cod windows are release periods, given in the note.
  {
    id: "ca-pe-charlottetown-cod",
    countryCode: "CA",
    admin1: ["PE", "Prince Edward Island"],
    near: { ...CHARLOTTETOWN, km: 25 },
    species: ["atlantic-cod"],
    closed: [
      { from: "04-13", to: "04-14" },
      { from: "10-02", to: "12-31" },
    ],
    noKeep: [
      { from: "04-15", to: "07-31" },
      { from: "09-06", to: "10-01" },
    ],
    water: ["sea", "estuary"],
    note:
      "DFO's 2026 Gulf Region order for recreational groundfish (GVO-2026-011, in force from 13 April 2026) closes the waters around PEI to groundfishing except in set windows. Within 50 m of the shore groundfish are open from 15 April to 1 October, but cod may be kept only from 1 August to 5 September, sunrise to sunset, with up to 5 cod or white hake within 15 groundfish; at other times no cod may be kept. Farther out, groundfishing is open only from 1 August to 5 September. All waters are closed from 2 October to 31 December 2026. The rule for 1 January to 12 April was not read.",
    regulator: "Fisheries and Oceans Canada (Gulf Region), GVO-2026-011",
    source: DFO_GULF_GROUND,
    checked: CHECKED,
  },
  // source: PEI 2026 Angling Summary p. 3, 5, 6: "Youth are not required to obtain an angling licence."; Wildlife Conservation Fund licence
  //   needed by licensed anglers ($20; $13 at 65+; $0 for Canadian Armed Forces members and veterans with ID); "No provincial angling licence
  //   is required to fish in 'tidal waters' but seasons and bag limits remain in effect."; "No licence will be required to fish over the
  //   Victoria Day long weekend, May 15-18 inclusive."
  {
    id: "ca-pe-licence",
    countryCode: "CA",
    admin1: ["PE", "Prince Edward Island"],
    species: [],
    closed: [],
    note:
      "On PEI anglers under 16 need no licence. Others need an angling licence plus a Wildlife Conservation Fund licence ($20, or $13 at 65 and over; free for Canadian Armed Forces members and veterans with ID). No provincial licence is needed in tidal waters, but seasons and limits apply. No licence was needed over the Victoria Day weekend, 15 to 18 May 2026.",
    regulator: "Government of Prince Edward Island (2026 Angling Summary)",
    source: PEI_SUMMARY,
    checked: CHECKED,
  },

  // ======================= United States: Maine (Portland) =======================================================
  // source: Maine IF&W, General Fishing Law Seasons and Bag Limits (2026; links the 2026 law book) and 2026 Open Water and Ice Fishing Laws
  //   ("not valid after December 31, 2026"): South Zone counties include Cumberland; lakes and ponds "January 1 to December 31: Open to ice
  //   and open water fishing."; rivers, streams and brooks (both zones) "From April 1 to August 15: Open to open water fishing.", Aug 16 to
  //   Sep 30 artificial lures or flies only (1 landlocked salmon, 1 brook trout a day), "From October 1 to March 31: Closed to all fishing."
  //   Brook trout 5 a day but 2 from South Zone lakes and ponds; bass (South Zone) 2 a day, only one over 14 inches. Special laws (law book
  //   pp. 7-14, A to C only readable): Chaffin Pond, Windham "From October 1 - November 30: ALO, S-7"; Aldens Pond, Gorham "CI, S-9".
  //   Checker: turned into a note (as Quebec's zone rows were). The general law is subject to water-by-water special laws, one water
  //   inside the circle (Aldens Pond) is closed to ice fishing and restricted to some anglers, and the special laws for the other
  //   Portland-area lakes (letters D onward: Highland, Little Sebago, Sebago and others) could not be read: the 2026 law book's text
  //   (90,076 characters) ends in the C entries.
  {
    id: "us-me-portland-lakes-note",
    countryCode: "US",
    admin1: ["ME", "Maine"],
    near: { ...PORTLAND, km: 25 },
    species: [],
    closed: [],
    water: ["lakes"],
    note:
      "Cumberland County is in Maine's South Zone, where the 2026 general law opens lakes and ponds to ice and open-water fishing from 1 January to 31 December. General limits apply, such as 2 brook trout a day from South Zone lakes and 2 bass a day with only one over 14 inches. Many waters have special laws that differ, and those for most lakes near Portland could not be read, so no open-all-year label is loaded. Chaffin Pond in Windham is artificial lures only, with trout, salmon and togue released, from 1 October to 30 November. Aldens Pond in Gorham is closed to ice fishing and open only to anglers under 16 or holders of certain complimentary licences.",
    regulator: "Maine Department of Inland Fisheries and Wildlife (South Zone)",
    source: "https://www.maine.gov/ifw/fishing-boating/fishing/laws-rules/statewide-laws.html",
    checked: CHECKED,
  },
  {
    id: "us-me-portland-rivers-note",
    countryCode: "US",
    admin1: ["ME", "Maine"],
    near: { ...PORTLAND, km: 25 },
    species: [],
    closed: [],
    water: ["rivers"],
    note:
      "Under Maine's 2026 general law, rivers, streams and brooks are open to fishing from 1 April to 15 August. From 16 August to 30 September they are open to artificial lures or flies only, with 1 landlocked salmon and 1 brook trout a day. From 1 October to 31 March they are closed to all fishing. The law book's water-by-water special laws change these dates on some waters, and the entries for rivers near Portland could not be read, so no dates are loaded here.",
    regulator: "Maine Department of Inland Fisheries and Wildlife",
    source: "https://www.maine.gov/ifw/fishing-boating/fishing/laws-rules/statewide-laws.html",
    checked: CHECKED,
  },
  // source: Maine DMR, 2026 Sea Run Sportfish regulations ("current as of March 19, 2026"): "It is unlawful to angle, take or possess any
  //   Atlantic salmon from all Maine waters"; incidental catch released, "At no time should the Atlantic salmon be removed from the water."
  //   Maine IF&W 2026 table: "Sea-run Atlantic Salmon" — "Endangered or Threatened Species - No Fishing Permitted".
  //   Checker: limited to tidal water. IF&W's 2026 general law opens rivers, streams and brooks from April 1 to September 30 with a
  //   landlocked salmon limit (1 a day from Aug 16), so a year-round closure of the species on Portland's rivers would be wrong for
  //   landlocked salmon; the sea-run ban for rivers is in the note.
  {
    id: "us-me-portland-atlantic-salmon",
    countryCode: "US",
    admin1: ["ME", "Maine"],
    near: { ...PORTLAND, km: 25 },
    species: ["atlantic-salmon"],
    closed: [{ from: "01-01", to: "12-31" }],
    water: ["sea", "estuary"],
    note:
      "Maine DMR's 2026 sea-run rules make it unlawful to angle for, take or possess Atlantic salmon in any Maine waters, coastal waters included. A salmon caught by accident must be released without being lifted from the water. Maine IF&W lists sea-run Atlantic salmon as endangered, with no fishing permitted, in rivers too. Landlocked salmon (the same species) has its own season in lakes and rivers under IF&W's inland laws.",
    regulator: "Maine Department of Marine Resources; Maine Department of Inland Fisheries and Wildlife",
    source: "https://www.maine.gov/dmr/sites/maine.gov.dmr/files/inline-files/2026_searun_regs.pdf",
    checked: CHECKED,
  },
  // source: Maine DMR, 2026 Maine Striped Bass Regulations ("current as of March 25, 2026"): "OPEN SEASON January 1 through December 31,
  //   inclusive (except the Kennebec watershed, see Special Regulations sheet)"; one fish a day; "Fish can be harvested between 28 inches and
  //   31 inches inclusive total length."; "It is unlawful to use any hook other than a non-offset circle hook when using bait."; Saco River:
  //   fishing prohibited upstream of the Route 9/Main Street bridge to the head of tide ("Cataract Dam"). Saco is about 24 km from Portland,
  //   so the circle is kept to 20 km.
  {
    id: "us-me-portland-striped-bass",
    countryCode: "US",
    admin1: ["ME", "Maine"],
    near: { ...PORTLAND, km: 20 },
    species: ["striped-bass"],
    closed: [],
    water: ["sea", "estuary"],
    note:
      "Maine DMR's 2026 rules open striped bass statewide from 1 January to 31 December. The exception is the Kennebec watershed (with the Sheepscot and Androscoggin), which is outside this circle. The limit is 1 a day, 28 to 31 inches total length, and bait may be used only on a non-offset circle hook. Waters within 150 feet of a dam with a fishway, or of any part of a fishway, are closed to fishing for all species. DMR also bars fishing on the Saco River above the Route 9 bridge up to the Cataract Dam, just outside this circle.",
    regulator: "Maine Department of Marine Resources",
    source: "https://www.maine.gov/dmr/sites/maine.gov.dmr/files/inline-files/2026_striped_bass_regs%20-%20ADA%20compliant.pdf",
    checked: CHECKED,
  },
  // source: Maine DMR, 2026 Maine Saltwater Recreational Fishing Regulations, groundfish and other finfish ("current as of July 1, 2026";
  //   posted July 14, 2026): Atlantic cod "Size: Minimum size 23 inches." "Bag limit: 1 fish per angler per day." "Season: Sept 1 – Oct 31, inclusive."
  {
    id: "us-me-portland-cod",
    countryCode: "US",
    admin1: ["ME", "Maine"],
    near: { ...PORTLAND, km: 25 },
    species: ["atlantic-cod"],
    closed: [{ from: "11-01", to: "08-31" }],
    water: ["sea", "estuary"],
    note:
      "Maine DMR's saltwater rules (current as of 1 July 2026) open Atlantic cod only from 1 September to 31 October, with 1 a day at a minimum of 23 inches.",
    regulator: "Maine Department of Marine Resources",
    source: "https://www.maine.gov/dmr/sites/maine.gov.dmr/files/inline-files/2026_sportfish_regs_Gabrielle%20Page_0.pdf",
    checked: CHECKED,
  },
  // source: same sheet: Atlantic mackerel "Size: No minimum size" "Bag limit: 25 fish per angler per day" (no season listed); bluefish no
  //   minimum size, 5 a day (no season listed). DMR MAPA-4 adoption notices (June 25, 2026): Chapter 52.02(1)(A) mackerel 20 -> 25 per person
  //   per calendar day; Chapter 43.01(A) bluefish 5 a day "until December 31, 2026", then "Beginning January 1, 2027" 3 a day. Haddock:
  //   "Cannot possess from March 1 through March 31 inclusive." Checker: the sheet re-read 11 November 2026; the MAPA-4 notices were not
  //   re-opened, so the note keeps to the sheet.
  {
    id: "us-me-portland-mackerel-bluefish-note",
    countryCode: "US",
    admin1: ["ME", "Maine"],
    near: { ...PORTLAND, km: 25 },
    species: [],
    closed: [],
    water: ["sea", "estuary"],
    note:
      "Maine DMR's saltwater rules (current as of 1 July 2026) list no season for Atlantic mackerel or bluefish: mackerel are 25 a day and bluefish 5 a day, neither with a minimum size. Haddock may not be possessed from 1 to 31 March.",
    regulator: "Maine Department of Marine Resources",
    source: "https://www.maine.gov/dmr/sites/maine.gov.dmr/files/inline-files/2026_sportfish_regs_Gabrielle%20Page_0.pdf",
    checked: CHECKED,
  },
  // source: Maine IF&W, Fishing License Requirements and Fees (2026): "A valid Maine fishing license is required for anyone 16 years of age or
  //   older." (inland waters); free fishing days February 14-15 and May 30-31, 2026. DMR sheet: "a Maine law may require you to register with
  //   the Maine Saltwater Recreational Fishing Registry."
  {
    id: "us-me-licence",
    countryCode: "US",
    admin1: ["ME", "Maine"],
    species: [],
    closed: [],
    note:
      "A Maine fishing licence is needed by anyone 16 or older to fish inland waters. On the 2026 free fishing days (14-15 February and 30-31 May) anyone could fish without one, though all other rules applied. For salt water, DMR says a Maine law may require registration with the Saltwater Recreational Fishing Registry.",
    regulator: "Maine Department of Inland Fisheries and Wildlife; Maine Department of Marine Resources",
    source: "https://www.maine.gov/ifw/fishing-boating/fishing/laws-rules/license-requirements.html",
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

// Centres used below (degrees). Town centres as in section 1; park centres are approximate.
// CHARLOTTETOWN 46.2354, -63.1265 · FREDERICTON 45.9488, -66.6292 · MONCTON 46.0986, -64.8004 · SAINT_JOHN 45.2788, -66.0585
// HALIFAX 44.6486, -63.5859 · PORTLAND 43.6574, -70.2587
const FUNDY_NP = { lat: 45.61, lon: -65.08 };            // about 59 km from Moncton
const KOUCHIBOUGUAC_NP = { lat: 46.8, lon: -64.97 };
const KEJIMKUJIK_NP = { lat: 44.4, lon: -65.25 };

export const LAND: LandRule[] = [
  // Parks Canada, Fundy National Park, Visitor guidelines (date modified 2025-08-08): "It is illegal to collect plants, mushrooms, berries,
  //   animals, animal parts (including antlers)," "fossils, driftwood, rocks, signs, or any other historic or natural object."; no personal-use exception.
  {
    id: "fundy-national-park",
    applies: (p) => is(p, "NB", "New Brunswick") && within(p, FUNDY_NP, 65),
    title: "Fundy National Park (Parks Canada)",
    rule: "Parks Canada says it is illegal to collect plants, mushrooms, berries, animals or animal parts, fossils, driftwood, rocks or any other natural or historic object in Fundy National Park. The page names no personal-use exception.",
    source: { label: "Parks Canada: Fundy National Park visitor guidelines", url: "https://parks.canada.ca/pn-np/nb/fundy/visit/regles-rules" },
    checked: CHECKED,
  },
  // Parks Canada, PEI National Park, Visitor guidelines (date modified 2025-07-28): "to refrain from picking flowers or taking unusually shaped
  //   rocks or patterned shells."; "The National Park General Regulations prohibit the removal of natural objects."; "The minimum fine is $150."
  //   National Parks General Regulations (SOR/78-213, current to 2026-10-19) s. 10: "No person shall remove, deface, damage or destroy any flora
  //   or natural objects in a Park," except under a permit (ss. 11(1), 12(1)) or a land-use authorization; s. 2 "flora" includes fungi.
  {
    id: "pei-national-park",
    applies: (p) => is(p, "PE", "Prince Edward Island") && within(p, CHARLOTTETOWN, 40),
    title: "Prince Edward Island National Park (Parks Canada)",
    rule: "Parks Canada asks visitors to Prince Edward Island National Park not to pick flowers or take unusual rocks or patterned shells. It says the National Park General Regulations prohibit removing natural objects, with a minimum fine of $150. The regulations (s. 10) bar removing any flora, which they define to include fungi, except under a permit.",
    source: { label: "Parks Canada: PEI National Park visitor guidelines; National Parks General Regulations s. 10", url: "https://parks.canada.ca/pn-np/pe/pei-ipe/visit/visiteurs-visitors" },
    checked: CHECKED,
  },
  // Parks Canada, Kouchibouguac National Park, Visitor guidelines (date modified 2025-08-08): "It is illegal to collect plants, mushrooms,
  //   berries, animals, animal parts (including antlers)," ...; "It is illegal to remove, deface, damage or destroy any flora or natural objects
  //   in a park" "except in accordance with a permit."
  {
    id: "kouchibouguac-national-park",
    applies: (p) => is(p, "NB", "New Brunswick") && within(p, KOUCHIBOUGUAC_NP, 25),
    title: "Kouchibouguac National Park (Parks Canada)",
    rule: "Parks Canada says it is illegal to collect plants, mushrooms, berries, animals, fossils, driftwood, rocks or any other natural or historic object in Kouchibouguac National Park. It also says it is illegal to remove, damage or destroy any flora or natural object in the park except under a permit.",
    source: { label: "Parks Canada: Kouchibouguac National Park visitor guidelines", url: "https://parks.canada.ca/pn-np/nb/kouchibouguac/visit/reg/guidelines-directives" },
    checked: CHECKED,
  },
  // Parks Canada, Kejimkujik National Park and National Historic Site, Visitor guidelines (date modified 2026-08-18): "It is illegal to collect
  //   plants, mushrooms, berries, animals, animal parts (including antlers)," "fossils, driftwood, rocks, signs or any other historic or natural object."
  //   Checker: the page's title and introduction name only "Kejimkujik National Park and National Historic Site"; it names Kejimkujik
  //   Seaside only for other rules (metal detectors), so Seaside was dropped from this rule's reach.
  {
    id: "kejimkujik-national-park",
    applies: (p) => is(p, "NS", "Nova Scotia") && within(p, KEJIMKUJIK_NP, 30),
    title: "Kejimkujik National Park and National Historic Site (Parks Canada)",
    rule: "Parks Canada says it is illegal to collect plants, mushrooms, berries, animals, fossils, driftwood, rocks or any other natural or historic object in Kejimkujik. The page names no exception for picking.",
    source: { label: "Parks Canada: Kejimkujik visitor guidelines", url: "https://parks.canada.ca/pn-np/ns/kejimkujik/securite-safety/regles-rules" },
    checked: CHECKED,
  },
  // New Brunswick, General Regulation - Parks Act, N.B. Reg. 85-104 ("consolidated to November 2, 2004"; later amending regulations 2014-64
  //   and 2017-46 read and do not touch s. 3), s. 3(1): "Subject to subsection (2), no person in a provincial park shall" (a) "cut, damage or
  //   remove any plant, shrub, flower or tree," (b) "remove any artifact or natural object,"; s. 3(2): employees at work, or "if he has the
  //   written permission of the Minister."
  {
    id: "nb-provincial-parks",
    applies: (p) => is(p, "NB", "New Brunswick"),
    title: "New Brunswick provincial parks",
    rule: "New Brunswick's General Regulation under the Parks Act (85-104, s. 3) says no one in a provincial park may cut, damage or remove any plant, shrub, flower or tree, or remove any artifact or natural object. The exceptions are park staff at work and anyone with the Minister's written permission. The regulation does not name berries or mushrooms.",
    source: { label: "New Brunswick: General Regulation - Parks Act, N.B. Reg. 85-104 (s. 3)", url: "https://laws.gnb.ca/en/document/ar/85-104" },
    checked: CHECKED,
  },
  // Nova Scotia, Provincial Parks Regulations (N.S. Reg. 69/1989, amended to N.S. Reg. 120/2025, effective June 17, 2025), s. 22: "Except
  //   with the permission of the Minister, no person while in a park shall" (a) "cut, damage or remove any plant, shrub, flower or tree."
  //   (b) "remove any artifact or object of natural curiosity or interest."
  {
    id: "ns-provincial-parks",
    applies: (p) => is(p, "NS", "Nova Scotia"),
    title: "Nova Scotia provincial parks",
    rule: "Nova Scotia's Provincial Parks Regulations (s. 22) say that, except with the Minister's permission, no one in a provincial park may cut, damage or remove any plant, shrub, flower or tree, or remove any object of natural curiosity or interest. The regulations do not name berries or fungi.",
    source: { label: "Nova Scotia: Provincial Parks Regulations (s. 22)", url: "https://novascotia.ca/just/regulations/regs/ppregs.htm" },
    checked: CHECKED,
  },
  // The Bay of Fundy mussel ban (DFO Maritimes, invertebrates page) is in src/data/harvest-bans.ts, which scopes it to the
  //   whole bay and keeps mussels out of the "in season" lists there; it is not repeated here.
  // Maine Bureau of Parks and Lands, Gathering page (© 2021, no update date): "Gathering is only allowed on Maine's Public Lands, not on Maine
  //   State Parks and Historic Sites" "which do not allow gathering or collecting of any kind." Park Rules ("Rules for State Parks and Historic
  //   Sites"), Rule 1: "The removal, molesting, injury or damage of anything natural, physical, prehistorical, or historical" "within these areas
  //   is strictly prohibited except as outlined in section 20 regarding hunting, trapping and firearms."
  {
    id: "maine-state-parks",
    applies: (p) => is(p, "ME", "Maine"),
    title: "Maine state parks and historic sites",
    rule: "Maine's Bureau of Parks and Lands says state parks and historic sites allow no gathering or collecting of any kind; gathering is allowed only on Maine's Public Lands. Its park rules prohibit removing or damaging anything natural in state parks and historic sites, apart from what the hunting and trapping rule allows.",
    source: { label: "Maine Bureau of Parks and Lands: Gathering; Park Rules (Rule 1)", url: "https://www.maine.gov/DACF/parks/hunting_fishing/gathering.shtml" },
    checked: CHECKED,
  },
  // Same Gathering page: "No Permits needed for:" "Berry picking," "Fiddlehead picking," "Mushroom collecting"; "Permits Required for:"
  //   "Firewood Cutting," "Fir Tipping," "Ash Trees," "Birch Bark"; "Gather but leave enough to reseed and feed wildlife."
  {
    id: "maine-public-lands",
    applies: (p) => is(p, "ME", "Maine"),
    title: "Maine Public Lands (Bureau of Parks and Lands)",
    rule: "The Bureau of Parks and Lands says berry picking, fiddlehead picking and mushroom collecting need no permit on Maine's Public Lands. Firewood cutting, fir tipping, ash trees and birch bark need a permit. It asks gatherers to leave enough to reseed and to feed wildlife, and gives no quantities.",
    source: { label: "Maine Bureau of Parks and Lands: Gathering", url: "https://www.maine.gov/DACF/parks/hunting_fishing/gathering.shtml" },
    checked: CHECKED,
  },
];
