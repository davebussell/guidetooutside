/**
 * Closed seasons and standing bans, by regulator: the overlay the fishing
 * pages lay over the library's activity months (round 2, L8).
 *
 * The library's `months` say when a fish is worth fishing for; they say
 * nothing about whether it may be fished for. Where a regulator closes a
 * species for part of the year (Lake Ontario lake trout, South African elf),
 * or bans it outright (Oslofjord cod), the page must say so and never lead
 * with the closed fish. Each row is scoped to the place by country, by
 * province or state name or code, by ecoregion, or by a box or circle on the
 * map, and every row carries the regulator and the page it was read from, on
 * the date it was read. A row with an empty `closed` list and named species is
 * the regulator's "open all year" for those species (the page prints the
 * regulator's season for them); a row with an empty `closed` list and no
 * species is a note: the page was opened and the note says what it states, but
 * no closing dates are loaded from it, so the fish shown there are typical
 * angling months, not legal ones.
 *
 * Dates are "MM-DD", inclusive at both ends; a range whose `to` is before its
 * `from` wraps the new year. "02-29" stands for "the last day of February".
 * Movable dates (the first Saturday in May) are written for 2026 and said so
 * in the note.
 *
 * Species are creature slugs from src/data/creatures.json; "*" means every
 * species (a water closed to all fishing). `water` limits a row to the fishing
 * page's water groups (sea, estuary, rivers, lakes); absent, it applies to all.
 */
import type { WaterGroup } from "@/lib/fish-habitats";
import { REGION_CLOSED_SEASONS } from "./region-rules";

export type ClosedRange = { from: string; to: string };

export type ClosedSeason = {
  id: string;
  /** ISO 3166-1 alpha-2. */
  countryCode: string;
  /** Province, state or region names or codes the rule is limited to (case-insensitive; "ON", "Ontario"). */
  admin1?: string[];
  /** Ecoregion slugs the rule is limited to. */
  regionSlug?: string[];
  /** A circle on the map the rule is limited to. */
  near?: { lat: number; lon: number; km: number };
  /** A box on the map the rule is limited to (degrees). */
  box?: { minLat?: number; maxLat?: number; minLon?: number; maxLon?: number };
  /** Creature slugs, or ["*"] for every species. */
  species: string[];
  closed: ClosedRange[];
  /**
   * Days the species may be fished for but not kept: every fish caught must be released. The fishing pages treat these days
   * as not in season and say "catch and release only", with the regulator (src/lib/fishing-waters.ts). Added after the audit
   * of 10 November 2026: Boston's cod may be kept only from 1 September to 31 October, and the page still said "In season
   * now" in November. A `closed` range on the same day wins.
   */
  noKeep?: ClosedRange[];
  /** The kinds of water the rule applies to; absent, all of them. */
  water?: WaterGroup[];
  /** One or two plain sentences for the page and the writer. */
  note: string;
  /** "Ontario MNRF (FMZ 20)" — the short name shown after the dash. */
  regulator: string;
  /** The regulator's page, or the page the rule was read from. */
  source: string;
  /** Date read, ISO. */
  checked: string;
};

const CHECKED = "2026-10-14";

/**
 * Lake Ontario's west end and north shore (FMZ 20), as a box: Toronto, Hamilton and Niagara-on-the-Lake. The audit of 10 November 2026 (checkers of
 * 14 November) found the box reaching east to 74.2° W, so Kingston's inland lakes, which are FMZ 18, carried FMZ 20 dates. It now stops at 77° W;
 * Kingston's rows, by zone, are in region-rules/great-lakes-st-lawrence.ts (which uses the same box).
 */
const FMZ20 = { minLat: 42.8, maxLat: 44.6, minLon: -80.2, maxLon: -77.0 };
const ONTARIO = ["ON", "Ontario"];
const FMZ20_SRC = "https://www.ontario.ca/document/ontario-fishing-regulations-summary/fisheries-management-zone-20";
const FMZ20_REG = "Ontario MNRF (FMZ 20)";

/** Ottawa: the Ottawa River at Ottawa is Ontario FMZ 12 (the Rideau River and Rideau Canal are FMZ 18, with different dates). */
const OTTAWA = { lat: 45.4209, lon: -75.6901, km: 30 };
const FMZ12_SRC = "https://www.ontario.ca/document/ontario-fishing-regulations-summary/fisheries-management-zone-12";
const FMZ12_ORDER = "https://www.ontario.ca/page/sport-fishing-variation-order-fisheries-management-zone-12";
const FMZ12_REG = "Ontario MNRF (FMZ 12)";
const FMZ12_NOTE_END = " This is the Ottawa River at Ottawa (FMZ 12, on the Ontario bank); the Rideau River and Rideau Canal are FMZ 18, with different dates.";
const CHECKED_FMZ12 = "2026-11-02";

/** The Oslofjord and the Skagerrak coast inside the baseline from Telemark to the Swedish border. */
const OSLOFJORD_COD = { minLat: 58.8, maxLat: 60.0, minLon: 9.3, maxLon: 11.6 };
/** The inner Oslofjord: Oslo and Akershus north of Drøbak. */
const INNER_OSLOFJORD = { minLat: 59.65, maxLat: 60.0, minLon: 10.3, maxLon: 10.95 };

const BAVARIA = ["Bavaria", "Bayern", "BY"];
const BAVARIA_SRC = "https://www.gesetze-bayern.de/Content/Pdf/BayAVFiG-ANL_1?all=False";
const BAVARIA_REG = "Bavarian AVBayFiG (Schonzeiten)";

const POLAND_SRC =
  "https://www.infor.pl/akt-prawny/DZU.2023.200.0001373,rozporzadzenie-ministra-rolnictwa-i-rozwoju-wsi-w-sprawie-szczegolowych-warunkow-ochrony-i-polowu-ryb-w-powierzchniowych-wodach-srodladowych.html";
const POLAND_REG = "Polish inland fishing regulation (Dz.U. 2023 poz. 1373)";

const PORTUGAL_SRC = "https://informador.pt/legislacao/diploma/portaria-n-o-360-2017/";
const PORTUGAL_REG = "ICNF (Portaria 360/2017)";

const DFFE_SRC = "https://source.acts.co.za/marine-living-resources-act-1998/r1111_annexure_2__closed_season.php";
const DFFE_REG = "DFFE (Marine Living Resources Act, Annexure 2)";

/**
 * FMZ 20 is Lake Ontario "and connected waters" (the page names the Niagara River, Hamilton Harbour and the St. Lawrence River).
 * The lower reaches of the Toronto and Hamilton tributaries are FMZ 16 instead (rows in region-rules/great-lakes-st-lawrence.ts), so
 * the FMZ 20 rows below apply to lake sections in the box only. Until the audit of 10 November 2026 (checkers of 14 November) they also
 * applied to river sections in circles round Niagara-on-the-Lake (the Niagara River) and Kingston (the St. Lawrence). But a town's river
 * cards hold all its rivers together: Niagara-on-the-Lake's creeks are FMZ 16 and Kingston's (the Cataraqui and its creeks) FMZ 18, so the
 * FMZ 20 dates were printed on them. Those towns' river cards now carry their own rows and notes in great-lakes-st-lawrence.ts.
 */
const fmz20Waters = (r: ClosedSeason): ClosedSeason[] => [{ ...r, water: ["lakes"] }];

export const CLOSED_SEASONS: ClosedSeason[] = [
  // ---- Canada: Ontario, FMZ 20 (Toronto, Hamilton, Oshawa, Kingston) -----
  // source: Ontario Fishing Regulations Summary, Fisheries Management Zone 20 — lake trout
  //   "January 1 to September 30 and December 1 to December 31"; walleye "January 1 to March 1 and
  //   first Saturday in May to December 31"; largemouth bass "third Saturday in June to December 31"
  //   (catch-and-release only Jan 1–May 10); smallmouth "first Saturday in July to December 31";
  //   northern pike "January 1 to March 31 and first Saturday in May to December 31"; muskellunge
  //   "third Saturday in June to December 15"; brown and rainbow trout, Pacific salmon open all year.
  {
    id: "ca-on-fmz20-lake-trout",
    countryCode: "CA",
    admin1: ONTARIO,
    box: FMZ20,
    species: ["lake-trout"],
    closed: [{ from: "10-01", to: "11-30" }],
    water: ["lakes"],
    note: "Lake trout is closed in Lake Ontario (FMZ 20) from 1 October to 30 November for spawning. The inland lakes north of the city are FMZ 16 and 17, with their own seasons.",
    regulator: FMZ20_REG,
    source: FMZ20_SRC,
    checked: CHECKED,
  },
  ...[
  {
    id: "ca-on-fmz20-walleye",
    countryCode: "CA",
    admin1: ONTARIO,
    box: FMZ20,
    species: ["walleye"],
    closed: [{ from: "03-02", to: "05-01" }],
    note: "Walleye and sauger are closed in FMZ 20 from 2 March to the first Saturday in May (2 May in 2026).",
    regulator: FMZ20_REG,
    source: FMZ20_SRC,
    checked: CHECKED,
  },
  {
    id: "ca-on-fmz20-largemouth",
    countryCode: "CA",
    admin1: ONTARIO,
    box: FMZ20,
    species: ["largemouth-bass"],
    closed: [{ from: "05-11", to: "06-19" }],
    // The page's "early catch and release" season, 1 January to 10 May, was only in the note; the audit of 10 November 2026 (checkers of
    // 14 November) asked for it as release-only days, so the cards say so (re-read 14 November 2026).
    noKeep: [{ from: "01-01", to: "05-10" }],
    note: "Largemouth bass in FMZ 20: catch-and-release only from 1 January to 10 May, closed from 11 May to the third Saturday in June (20 June in 2026), then open to 31 December.",
    regulator: FMZ20_REG,
    source: FMZ20_SRC,
    checked: CHECKED,
  },
  {
    id: "ca-on-fmz20-smallmouth",
    countryCode: "CA",
    admin1: ONTARIO,
    box: FMZ20,
    species: ["smallmouth-bass"],
    closed: [{ from: "05-11", to: "07-03" }],
    noKeep: [{ from: "01-01", to: "05-10" }],
    note: "Smallmouth bass in FMZ 20: catch-and-release only from 1 January to 10 May, closed from 11 May to the first Saturday in July (4 July in 2026), then open to 31 December.",
    regulator: FMZ20_REG,
    source: FMZ20_SRC,
    checked: CHECKED,
  },
  {
    id: "ca-on-fmz20-pike",
    countryCode: "CA",
    admin1: ONTARIO,
    box: FMZ20,
    species: ["northern-pike"],
    closed: [{ from: "04-01", to: "05-01" }],
    note: "Northern pike is closed in FMZ 20 from 1 April to the first Saturday in May (2 May in 2026).",
    regulator: FMZ20_REG,
    source: FMZ20_SRC,
    checked: CHECKED,
  },
  {
    id: "ca-on-fmz20-muskellunge",
    countryCode: "CA",
    admin1: ONTARIO,
    box: FMZ20,
    species: ["muskellunge"],
    closed: [{ from: "12-16", to: "06-19" }],
    note: "Muskellunge is open in FMZ 20 from the third Saturday in June (20 June in 2026) to 15 December; one fish over 137 cm on a sport licence.",
    regulator: FMZ20_REG,
    source: FMZ20_SRC,
    checked: CHECKED,
  },
  // source: FMZ 20 page ("Updated: August 04, 2026"), read 14 November 2026: "The following species are not present in this Zone and are closed to
  //   fishing all year": brook trout and splake. Missing until the audit of 10 November 2026 (checkers of 14 November).
  {
    id: "ca-on-fmz20-brook-trout",
    countryCode: "CA",
    admin1: ONTARIO,
    box: FMZ20,
    species: ["brook-trout"],
    closed: [{ from: "01-01", to: "12-31" }],
    note: "Ontario's FMZ 20 page says brook trout and splake are not present in Lake Ontario and its connected waters and are closed to fishing all year.",
    regulator: FMZ20_REG,
    source: FMZ20_SRC,
    checked: "2026-11-14",
  },
  ].flatMap(fmz20Waters),

  // ---- Canada: Ontario, FMZ 12 (the Ottawa River at Ottawa) --------------------
  // source: Ontario Fishing Regulations Summary, Fisheries Management Zone 12 (page updated 4 August 2026), read
  //   2 November 2026 — "Zone 12 consists of Lake Temiskaming and the Ottawa River, including the Madawaska and
  //   Mississippi Rivers to the first dam"; walleye and sauger "January 1 to March 31 and Friday before third Saturday
  //   in May to December 31" (S-5, C-2; "must be less than 40 centimetres from March 1 to June 15"); northern pike the
  //   same season (S-6, C-2); muskellunge "Friday before third Saturday in June to December 15" (S-1, "must be greater
  //   than 137 centimetres", C-0); "Largemouth and smallmouth bass combined" "Friday before fourth Saturday in June to
  //   November 30" (S-6, C-2); brown and rainbow trout "Friday before fourth Saturday in April to September 30";
  //   lake sturgeon "closed all year"; "The following species are not present in this Zone and are closed to fishing
  //   all year: Pacific salmon"; channel catfish and yellow perch open all year.
  // source: Sport fishing variation order FMZ 12, SF-2023/12 (in force 1 January 2023, page updated 1 August 2024) writes
  //   the same dates as close times: walleye and pike "April 1 to the Thursday before the 3rd Saturday in May"; muskellunge
  //   "January 1 to the Thursday before the 3rd Saturday in June and December 16 to December 31"; bass "January 1 to the
  //   Thursday before the 4th Saturday in June and December 1 to December 31"; trout "January 1 to the Thursday before the
  //   4th Saturday in April and October 1 to December 31". 2026 calendar: third Saturday in May 16 May, in June 20 June;
  //   fourth Saturday in April 25 April, in June 27 June.
  // source: Ontario summary, General fishing regulations (updated 4 August 2026) — "It is illegal to attempt to catch fish
  //   for which the season is closed, even if you are going to release them."
  // source: Quebec zone 25 (Ottawa River, Quebec bank), https://peche.faune.gouv.qc.ca/RegPec/en/Info/Reglements?id_zone=29 —
  //   for 2026 the same opening dates: walleye and pike 15 May, muskellunge 19 June, bass 26 June, trout 24 April.
  {
    id: "ca-on-fmz12-walleye",
    countryCode: "CA",
    admin1: ONTARIO,
    near: OTTAWA,
    species: ["walleye"],
    closed: [{ from: "04-01", to: "05-14" }],
    note:
      "Walleye and sauger are closed from 1 April to the Thursday before the third Saturday in May (14 May in 2026), open the rest of the year; from 1 March to 15 June only fish under 40 cm may be kept." +
      FMZ12_NOTE_END,
    regulator: FMZ12_REG,
    source: FMZ12_SRC,
    checked: CHECKED_FMZ12,
  },
  {
    id: "ca-on-fmz12-pike",
    countryCode: "CA",
    admin1: ONTARIO,
    near: OTTAWA,
    species: ["northern-pike"],
    closed: [{ from: "04-01", to: "05-14" }],
    note: "Northern pike is closed from 1 April to the Thursday before the third Saturday in May (14 May in 2026), open the rest of the year." + FMZ12_NOTE_END,
    regulator: FMZ12_REG,
    source: FMZ12_SRC,
    checked: CHECKED_FMZ12,
  },
  {
    id: "ca-on-fmz12-muskellunge",
    countryCode: "CA",
    admin1: ONTARIO,
    near: OTTAWA,
    species: ["muskellunge"],
    closed: [{ from: "12-16", to: "06-18" }],
    note:
      "Muskellunge is open from the Friday before the third Saturday in June (19 June in 2026) to 15 December; one fish a day on a sport licence, which must be longer than 137 cm, none on a conservation licence." +
      FMZ12_NOTE_END,
    regulator: FMZ12_REG,
    source: FMZ12_SRC,
    checked: CHECKED_FMZ12,
  },
  {
    id: "ca-on-fmz12-bass",
    countryCode: "CA",
    admin1: ONTARIO,
    near: OTTAWA,
    species: ["smallmouth-bass", "largemouth-bass"],
    closed: [{ from: "12-01", to: "06-25" }],
    note:
      "Smallmouth and largemouth bass (one combined limit) are open from the Friday before the fourth Saturday in June (26 June in 2026) to 30 November. Ontario's summary says it is illegal to try to catch a fish whose season is closed, even to release it." +
      FMZ12_NOTE_END,
    regulator: FMZ12_REG,
    source: FMZ12_SRC,
    checked: CHECKED_FMZ12,
  },
  {
    id: "ca-on-fmz12-trout",
    countryCode: "CA",
    admin1: ONTARIO,
    near: OTTAWA,
    species: ["rainbow-trout", "steelhead", "brown-trout"],
    closed: [{ from: "10-01", to: "04-23" }],
    note:
      "Brown trout and rainbow trout are open from the Friday before the fourth Saturday in April (24 April in 2026) to 30 September, and closed from 1 October." +
      FMZ12_NOTE_END,
    regulator: FMZ12_REG,
    source: FMZ12_SRC,
    checked: CHECKED_FMZ12,
  },
  {
    id: "ca-on-fmz12-pacific-salmon",
    countryCode: "CA",
    admin1: ONTARIO,
    near: OTTAWA,
    species: ["coho-salmon", "chinook-salmon"],
    closed: [{ from: "01-01", to: "12-31" }],
    note: "Ontario's FMZ 12 page says Pacific salmon (coho, Chinook) are not present in this zone and are closed to fishing all year." + FMZ12_NOTE_END,
    regulator: FMZ12_REG,
    source: FMZ12_SRC,
    checked: CHECKED_FMZ12,
  },
  {
    id: "ca-on-fmz12-lake-sturgeon",
    countryCode: "CA",
    admin1: ONTARIO,
    near: OTTAWA,
    species: ["lake-sturgeon"],
    closed: [{ from: "01-01", to: "12-31" }],
    note: "Lake sturgeon is closed to fishing all year in FMZ 12." + FMZ12_NOTE_END,
    regulator: FMZ12_REG,
    source: FMZ12_SRC,
    checked: CHECKED_FMZ12,
  },
  {
    id: "ca-on-fmz12-all-year",
    countryCode: "CA",
    admin1: ONTARIO,
    near: OTTAWA,
    species: ["channel-catfish", "yellow-perch"],
    closed: [],
    note: "Channel catfish and yellow perch are open all year in FMZ 12." + FMZ12_NOTE_END,
    regulator: FMZ12_REG,
    source: FMZ12_SRC,
    checked: CHECKED_FMZ12,
  },
  // source: Ontario summary, Recreational fishing licences and fees (updated 4 August 2026) — "Most people require a
  //   recreational fishing licence or deemed licence to legally fish in Ontario"; the Outdoors Card must be carried with any
  //   licence other than a 1-day licence; Sport licence "full catch and possession fishing privileges", Conservation licence
  //   "a reduced catch and possession limit"; licence-free days 2026: 14–16 February, 9–10 May, 20–21 June, 27 June–5 July.
  // source: Ontario summary, General fishing regulations — Ontario–Quebec boundary: the Ottawa River south of the Témiscamingue
  //   dam may be fished with an Ontario or a Quebec resident licence; fish caught there count toward Ontario limits.
  {
    id: "ca-on-fmz12-licence",
    countryCode: "CA",
    admin1: ONTARIO,
    near: OTTAWA,
    species: [],
    closed: [],
    note:
      "In Ontario most people need a recreational fishing licence and must carry an Outdoors Card (unless it is a 1-day licence); a Sport licence gives full limits, a Conservation licence reduced ones. Channel catfish and yellow perch are open all year in FMZ 12. The Ottawa River is a boundary water with Quebec: Ontario's summary allows an Ontario or a Quebec resident licence on it and counts fish caught there toward Ontario limits, and the Quebec bank is Quebec fishing zone 25.",
    regulator: FMZ12_REG,
    source: FMZ12_SRC,
    checked: CHECKED_FMZ12,
  },

  // ---- Norway: the Oslofjord -------------------------------------------------
  // source: Fiskeridirektoratet, Sak 30/2022 Evaluering av tiltak i Oslofjorden — cod fishing banned
  //   inside the baseline from Telemark to the Swedish border since 15 June 2019 (høstingsforskriften §40a)
  //   https://www.fiskeridir.no/Yrkesfiske/Dokumenter/Reguleringsmoetet2/november-2022/saksdokumenter/Sak-30-2022-Evaluering-tiltak-Oslofjorden.pdf
  // source: Teknisk Ukeblad, 15 June 2019 — the ban runs "fra Ellingsvik, like sør for Kragerø i Telemark,
  //   helt over til svenskegrensen"; a cod that is still alive must be released
  //   https://www.tu.no/artikler/na-er-det-forbudt-a-fiske-torsk-pa-ostlandet/467779
  // source: Bærum kommune, Fiskeforbud i Oslofjorden — "Det er forbudt å fiske torsk i hele Oslofjorden hele året"
  //   https://www.baerum.kommune.no/tjenester/natur-friluftsliv-og-naturmangfold/sjo-og-batliv/fiskeforbud-i-oslofjorden/
  {
    id: "no-oslofjord-cod",
    countryCode: "NO",
    box: OSLOFJORD_COD,
    species: ["atlantic-cod"],
    closed: [{ from: "01-01", to: "12-31" }],
    water: ["sea", "estuary"],
    note: "Fishing for cod has been banned in the whole Oslofjord and along the Skagerrak coast from Telemark to the Swedish border since 15 June 2019. A cod taken by rod must be released alive.",
    regulator: "Fiskeridirektoratet",
    source: "https://www.fiskeridir.no/Yrkesfiske/Dokumenter/Reguleringsmoetet2/november-2022/saksdokumenter/Sak-30-2022-Evaluering-tiltak-Oslofjorden.pdf",
    checked: CHECKED,
  },
  // source: Regjeringen, "Nullfiskeområder i Oslofjorden trer i kraft 1. januar" — "I nullfiskeområdene vil alt
  //   fiske bli forbudt, også stangfiske fra land"; crab fishing with a line for children excepted
  //   https://www.regjeringen.no/no/aktuelt/nullfiskeomrader-i-oslofjorden-trer-i-kraft-1.-januar/id3144208/
  // source: Bærum kommune — "Indre Oslofjord er den delen av Oslofjorden som ligger i Oslo og Akershus nord for Drøbak"
  // source: Miljødirektoratet, January 2026 — rod fishing for salmon and sea trout banned in the three zones from 1 January 2026
  //   https://www.miljodirektoratet.no/aktuelt/fagmeldinger/2026/januar-2026/forbud-mot-fiske-etter-laks-og-sjoorret-i-oslofjorden/
  {
    id: "no-inner-oslofjord-zero",
    countryCode: "NO",
    box: INNER_OSLOFJORD,
    species: ["*"],
    closed: [{ from: "01-01", to: "12-31" }],
    water: ["sea", "estuary"],
    note: "The inner Oslofjord north of Drøbak is a zero-fishing zone from 1 January 2026: all fishing is banned all year, including rod fishing from the shore and for salmon and sea trout. Crab fishing with a line for children is the one exception.",
    regulator: "Fiskeridirektoratet (nullfiskeområde)",
    source: "https://www.regjeringen.no/no/aktuelt/nullfiskeomrader-i-oslofjorden-trer-i-kraft-1.-januar/id3144208/",
    checked: CHECKED,
  },

  // ---- South Africa: DFFE, the sea -------------------------------------------
  // source: Marine Living Resources Act regulations, Annexure 2 (closed seasons) — elf/shad
  //   "1 September to 30 November"; galjoen "15 October to the last day of February"
  {
    id: "za-dffe-elf",
    countryCode: "ZA",
    species: ["bluefish"],
    closed: [{ from: "09-01", to: "11-30" }],
    water: ["sea", "estuary"],
    note: "Elf (shad) is closed nationally from 1 September to 30 November. A recreational angling permit is needed for the sea.",
    regulator: DFFE_REG,
    source: DFFE_SRC,
    checked: CHECKED,
  },
  {
    id: "za-dffe-galjoen",
    countryCode: "ZA",
    species: ["galjoen"],
    closed: [{ from: "10-15", to: "02-29" }],
    water: ["sea"],
    note: "Galjoen is closed nationally from 15 October to the last day of February.",
    regulator: DFFE_REG,
    source: DFFE_SRC,
    checked: CHECKED,
  },
  // source: CapeNature, Angling licences — "An angling licence is required to fish for freshwater fish in the
  //   Western Cape" (Nature Conservation Ordinance s.53); no closed season is given on the regulator's pages
  //   https://www.capenature.co.za/permits/angling-licences
  {
    id: "za-wc-freshwater-licence",
    countryCode: "ZA",
    admin1: ["Western Cape", "WC"],
    species: [],
    closed: [],
    water: ["rivers", "lakes"],
    note: "Freshwater fishing in the Western Cape needs a CapeNature angling licence (R45). CapeNature publishes no closed season; angling clubs set their own trout rules on some rivers.",
    regulator: "CapeNature",
    source: "https://www.capenature.co.za/permits/angling-licences",
    checked: CHECKED,
  },

  // ---- England: rivers ---------------------------------------------------------
  // source: GOV.UK, Freshwater rod fishing rules — "You cannot fish for coarse fish and eels on rivers from the
  //   15 March to 15 June"; stillwaters and canals open all year subject to byelaws; trout and salmon seasons
  //   are set by local byelaws. https://www.gov.uk/freshwater-rod-fishing-rules/when-and-where-you-can-fish
  // source: Environment Agency, Appendix 3d (grayling) — "the current close season is 15th March until 15th
  //   June, inclusive" https://assets.publishing.service.gov.uk/government/uploads/system/uploads/attachment_data/file/770798/Appendix_3d_Review_of_available_literature_-_grayling.pdf
  {
    id: "gb-england-coarse-rivers",
    countryCode: "GB",
    admin1: ["England"],
    species: ["roach", "common-bream", "european-perch", "northern-pike", "common-carp", "tench", "chub", "barbel", "zander", "european-eel", "european-grayling"],
    closed: [{ from: "03-15", to: "06-15" }],
    water: ["rivers"],
    note: "Coarse fish, grayling and eels are closed on rivers, streams and drains in England from 15 March to 15 June. Most canals and stillwaters stay open; brown trout and salmon seasons are set by local byelaws.",
    regulator: "Environment Agency",
    source: "https://www.gov.uk/freshwater-rod-fishing-rules/when-and-where-you-can-fish",
    checked: CHECKED,
  },

  // ---- Germany: Bavaria --------------------------------------------------------
  // source: AVBayFiG, Anlage (Schonzeiten, Schonmaße) — Äsche "1. Januar bis 30. April"; Bachforelle
  //   "1. Oktober bis 15. März"; Regenbogenforelle "15. Dezember bis 15. März"; Hecht and Zander
  //   "15. Februar bis 30. April"; Barbe and Schleie "1. Mai bis 30. Juni"; Renke "15. Oktober bis 31. Dezember";
  //   no Schonzeit for Wels, Karpfen, Flussbarsch, Bachsaibling.
  {
    id: "de-by-grayling",
    countryCode: "DE",
    admin1: BAVARIA,
    species: ["european-grayling"],
    closed: [{ from: "01-01", to: "04-30" }],
    note: "Grayling is closed in Bavaria from 1 January to 30 April (minimum size 35 cm).",
    regulator: BAVARIA_REG,
    source: BAVARIA_SRC,
    checked: CHECKED,
  },
  {
    id: "de-by-brown-trout",
    countryCode: "DE",
    admin1: BAVARIA,
    species: ["brown-trout"],
    closed: [{ from: "10-01", to: "03-15" }],
    note: "Brown trout (and lake trout, Seeforelle) are closed in Bavaria from 1 October to 15 March.",
    regulator: BAVARIA_REG,
    source: BAVARIA_SRC,
    checked: CHECKED,
  },
  {
    id: "de-by-rainbow-trout",
    countryCode: "DE",
    admin1: BAVARIA,
    species: ["rainbow-trout"],
    closed: [{ from: "12-15", to: "03-15" }],
    note: "Rainbow trout is closed in Bavaria from 15 December to 15 March.",
    regulator: BAVARIA_REG,
    source: BAVARIA_SRC,
    checked: CHECKED,
  },
  {
    id: "de-by-pike-zander",
    countryCode: "DE",
    admin1: BAVARIA,
    species: ["northern-pike", "zander"],
    closed: [{ from: "02-15", to: "04-30" }],
    note: "Pike and zander are closed in Bavaria from 15 February to 30 April (minimum size 50 cm).",
    regulator: BAVARIA_REG,
    source: BAVARIA_SRC,
    checked: CHECKED,
  },
  {
    id: "de-by-barbel-tench",
    countryCode: "DE",
    admin1: BAVARIA,
    species: ["barbel", "tench"],
    closed: [{ from: "05-01", to: "06-30" }],
    note: "Barbel and tench are closed in Bavaria from 1 May to 30 June.",
    regulator: BAVARIA_REG,
    source: BAVARIA_SRC,
    checked: CHECKED,
  },
  {
    id: "de-by-whitefish",
    countryCode: "DE",
    admin1: BAVARIA,
    species: ["european-whitefish"],
    closed: [{ from: "10-15", to: "12-31" }],
    note: "Renke (whitefish) is closed in Bavaria from 15 October to 31 December.",
    regulator: BAVARIA_REG,
    source: BAVARIA_SRC,
    checked: CHECKED,
  },

  // ---- Poland ------------------------------------------------------------------
  // source: Rozporządzenie Ministra Rolnictwa i Rozwoju Wsi z dnia 12 lipca 2023 r. w sprawie szczegółowych
  //   warunków ochrony i połowu ryb w powierzchniowych wodach śródlądowych (Dz.U. 2023 poz. 1373), § 7 —
  //   szczupak 1 Jan–30 Apr; sandacz and lipień 1 Mar–31 May; pstrąg potokowy 1 Sep–31 Jan in the Vistula
  //   above the San mouth and the San, 1 Sep–31 Dec elsewhere; sum 1 Jan–31 May; brzana 1 Jan–30 Jun;
  //   węgorz 1 Dec–31 Mar; miętus 1 Dec–end Feb; sieja 15 Oct–31 Dec; troć and łosoś 1 Oct–31 Dec
  //   (1 Dec–end Feb in the lower Vistula); okoń, płoć, leszcz, karp, lin, kleń, jaź, boleń: none.
  {
    id: "pl-pike",
    countryCode: "PL",
    species: ["northern-pike"],
    closed: [{ from: "01-01", to: "04-30" }],
    note: "Pike is closed in Poland from 1 January to 30 April.",
    regulator: POLAND_REG,
    source: POLAND_SRC,
    checked: CHECKED,
  },
  {
    id: "pl-zander-grayling",
    countryCode: "PL",
    species: ["zander", "european-grayling"],
    closed: [{ from: "03-01", to: "05-31" }],
    note: "Zander and grayling are closed in Poland from 1 March to 31 May.",
    regulator: POLAND_REG,
    source: POLAND_SRC,
    checked: CHECKED,
  },
  {
    id: "pl-brown-trout",
    countryCode: "PL",
    species: ["brown-trout"],
    closed: [{ from: "09-01", to: "12-31" }],
    note: "Brown trout is closed in Poland from 1 September to 31 December, and to 31 January in the Vistula above the San, the San, and the Odra above the Bystrzyca.",
    regulator: POLAND_REG,
    source: POLAND_SRC,
    checked: CHECKED,
  },
  {
    id: "pl-brown-trout-vistula",
    countryCode: "PL",
    // The Vistula basin from the San mouth upstream (Kraków, Warsaw's tributaries drain to the lower Vistula,
    // but the regulation's January month applies to the Vistula and its tributaries above the San mouth).
    box: { minLat: 49.0, maxLat: 50.9, minLon: 18.8, maxLon: 23.0 },
    species: ["brown-trout"],
    closed: [{ from: "01-01", to: "01-31" }],
    note: "In the upper Vistula and the San the brown trout close season runs to 31 January.",
    regulator: POLAND_REG,
    source: POLAND_SRC,
    checked: CHECKED,
  },
  {
    id: "pl-wels",
    countryCode: "PL",
    species: ["wels-catfish"],
    closed: [{ from: "01-01", to: "05-31" }],
    note: "Wels is closed in Poland from 1 January to 31 May.",
    regulator: POLAND_REG,
    source: POLAND_SRC,
    checked: CHECKED,
  },
  {
    id: "pl-barbel",
    countryCode: "PL",
    species: ["barbel"],
    closed: [{ from: "01-01", to: "06-30" }],
    note: "Barbel is closed in Poland from 1 January to 30 June.",
    regulator: POLAND_REG,
    source: POLAND_SRC,
    checked: CHECKED,
  },
  {
    id: "pl-eel",
    countryCode: "PL",
    species: ["european-eel"],
    closed: [{ from: "12-01", to: "03-31" }],
    note: "Eel is closed in Poland from 1 December to 31 March.",
    regulator: POLAND_REG,
    source: POLAND_SRC,
    checked: CHECKED,
  },
  {
    id: "pl-burbot",
    countryCode: "PL",
    species: ["burbot"],
    closed: [{ from: "12-01", to: "02-29" }],
    note: "Burbot is closed in Poland from 1 December to the end of February (not in the lower Odra).",
    regulator: POLAND_REG,
    source: POLAND_SRC,
    checked: CHECKED,
  },
  {
    id: "pl-whitefish",
    countryCode: "PL",
    species: ["european-whitefish"],
    closed: [{ from: "10-15", to: "12-31" }],
    note: "Sieja (whitefish) is closed in Poland from 15 October to 31 December.",
    regulator: POLAND_REG,
    source: POLAND_SRC,
    checked: CHECKED,
  },
  {
    id: "pl-salmon",
    countryCode: "PL",
    species: ["atlantic-salmon"],
    closed: [{ from: "10-01", to: "12-31" }],
    note: "Salmon and sea trout are closed in Poland from 1 October to 31 December (1 December to the end of February in the Vistula below Włocławek), with extra no-fishing days in some months.",
    regulator: POLAND_REG,
    source: POLAND_SRC,
    checked: CHECKED,
  },

  // ---- Portugal ----------------------------------------------------------------
  // source: Portaria n.º 360/2017 (pesca lúdica e desportiva em águas interiores), art. 9.º — truta-de-rio
  //   1 Mar–31 Jul; achigã in still waters 1 Jan–15 Mar and 15 May–31 Dec, all year in rivers; barbo and
  //   boga 1 Jan–15 Mar and 15 Jun–31 Dec; lúcio and carpa all year.
  {
    id: "pt-trout",
    countryCode: "PT",
    species: ["brown-trout"],
    closed: [{ from: "08-01", to: "02-29" }],
    note: "River trout may be fished in Portugal from 1 March to 31 July (to 31 August or 30 September on a few listed waters); closed the rest of the year.",
    regulator: PORTUGAL_REG,
    source: PORTUGAL_SRC,
    checked: CHECKED,
  },
  {
    id: "pt-largemouth-stillwater",
    countryCode: "PT",
    species: ["largemouth-bass"],
    closed: [{ from: "03-16", to: "05-14" }],
    water: ["lakes"],
    note: "Largemouth bass (achigã) is closed in Portugal's reservoirs and lakes from 16 March to 14 May; in rivers it may be fished all year, and as an exotic species it may not be returned alive.",
    regulator: PORTUGAL_REG,
    source: PORTUGAL_SRC,
    checked: CHECKED,
  },
  {
    id: "pt-barbel",
    countryCode: "PT",
    species: ["barbel"],
    closed: [{ from: "03-16", to: "06-14" }],
    note: "Barbel and boga are closed in Portugal from 16 March to 14 June.",
    regulator: PORTUGAL_REG,
    source: PORTUGAL_SRC,
    checked: CHECKED,
  },

  // ---- United States -----------------------------------------------------------
  // source: NC Wildlife Resources Commission, Trout fishing in North Carolina — Hatchery Supported waters
  //   closed from 1 March through the first Friday in April, reopening 7:00 a.m. on the first Saturday in April;
  //   Delayed Harvest waters catch-and-release, single-hook artificials only, from 1 October until half an hour after
  //   sunset on the Friday before the first Saturday in June, then closed to all fishing until 6 a.m. that Saturday,
  //   open to anglers under 16 only until noon; Wild Trout waters open all year.
  //   https://www.ncwildlife.gov/fishing/trout-fishing-north-carolina
  // Day 2 re-read (10 Nov 2026): the WRC page names no designated trout water at Charlotte or Raleigh, so the row is
  //   limited to the Appalachian ecoregion (Asheville) until the WRC county list is read.
  // Day 3 check (11 Nov 2026): turned into a note. The closure is only for designated Hatchery Supported waters, which a
  //   region cannot pick out, and it closes them to every species, not only trout: 15A NCAC 10C .0316(h), "In designated
  //   Public Mountain Trout Waters the season for taking all species of fish is the same as the trout fishing season."
  //   (https://www.law.cornell.edu/regulations/north-carolina/15A-N-C-Admin-Code-10C-0316). The WRC digest, "General Mountain
  //   Trout Regulations" (updated 13 July 2026): Hatchery Supported closed "March 1, 2027 – April 2, 2027", "No fishing
  //   allowed", reopening "7 a.m. April 3, 2027"; "Fishing is not allowed in Hatchery Supported Trout Waters during the closed
  //   season except in" Linville Gorge and ten listed reservoirs; undesignated waters with trout: seven a day, no size or bait
  //   restriction, "with no closed season". https://www.eregulations.com/northcarolina/fishing/general-mountain-trout-regulations
  //   The WRC page also says "There is no closed season for fishing on power reservoirs and city water supply reservoirs
  //   designated as trout waters." The designated waters near Asheville are in us-nc-asheville-trout-waters
  //   (region-rules/appalachian-hardwoods.ts).
  {
    id: "us-nc-hatchery-trout",
    countryCode: "US",
    admin1: ["NC", "North Carolina"],
    regionSlug: ["appalachian"],
    species: [],
    closed: [],
    water: ["rivers", "lakes"],
    note: "North Carolina's Hatchery Supported trout waters are closed to all fishing, for every species, from 1 March through the first Friday in April (to 3 April in 2026; 1 March to 2 April in 2027) and reopen at 7 a.m. on the first Saturday in April (4 April in 2026; 3 April in 2027). Some designated reservoirs and the Linville Gorge waters stay open. Delayed Harvest waters are catch and release for trout, with single-hook artificial lures only, from 1 October until half an hour after sunset on the Friday before the first Saturday in June (5 June in 2026; 4 June in 2027). They are then closed to all fishing until 6 a.m. that Saturday, open only to anglers under 16 until noon, and open to all from noon, 7 trout a day, until 30 September. Wild Trout and Catch and Release waters are open all year. Waters that are not designated as Public Mountain Trout Waters have no closed season for trout (7 a day, no size limit). These rules apply only to the waters the Commission designates, so no closing dates are loaded.",
    regulator: "NC Wildlife Resources Commission",
    source: "https://www.ncwildlife.gov/fishing/trout-fishing-north-carolina",
    checked: "2026-11-11",
  },
  // source: Colorado Parks and Wildlife, Fishing season dates and fees — no statewide closed season; waters
  //   "can be temporarily closed" at low flows or in drought. https://cpw.state.co.us/thingstodo/Pages/FishingSeasonDatesFees.aspx
  {
    id: "us-co-open",
    countryCode: "US",
    admin1: ["CO", "Colorado"],
    species: [],
    closed: [],
    note: "Colorado Parks and Wildlife says lakes, ponds and streams can be closed temporarily when water storage or stream flow drops too low, and that drought can bring fishing closures. Its page gives annual licences as valid from 1 March to 31 March of the following year. No seasonal closing dates are loaded from it.",
    regulator: "Colorado Parks and Wildlife",
    source: "https://cpw.state.co.us/thingstodo/Pages/FishingSeasonDatesFees.aspx",
    checked: "2026-11-02",
  },
  // source: Arizona Game and Fish Department, "Arizona's Community Fishing Program" (no page date), read 13 November 2026:
  //   "Phoenix area – 29 waters", "Tucson area – 4 waters", "Yuma area – 5 waters", "Town of Payson – Green Valley Lakes";
  //   rainbow trout "Stocked in the winter."; channel catfish "Stocked in the spring and fall."; licence: "a fishing license,
  //   a combo hunt & fish license, or a short-term license" (no age given). The old address, azgfd.com/fishing/community/,
  //   failed twice on 13 November 2026. https://www.azgfd.com/fishing-2/where-to-fish/community-fishing/
  {
    id: "us-az-open",
    countryCode: "US",
    admin1: ["AZ", "Arizona"],
    species: [],
    closed: [],
    note: "Arizona Game and Fish's Community Fishing Program covers 29 waters in the Phoenix area, 4 in the Tucson area, 5 around Yuma and the Green Valley Lakes in Payson. Rainbow trout are stocked in winter and channel catfish in spring and autumn. Its page points anglers to a fishing licence, a combination hunt and fish licence or a short-term licence. No closing dates are loaded from it.",
    regulator: "Arizona Game and Fish Department",
    source: "https://www.azgfd.com/fishing-2/where-to-fish/community-fishing/",
    checked: "2026-11-13",
  },

  // ---- Kenya -------------------------------------------------------------------
  // source: Fisheries Management and Development (Recreational Fisheries) Regulations, 2024 (L.N. 127/2024) —
  //   a recreational licence is issued by "the respective county government" (reg 4); catch-and-release
  //   "to the extent possible" (regs 5, 13); no closed seasons set. https://new.kenyalaw.org/akn/ke/act/ln/2024/127/eng@2024-08-02
  {
    id: "ke-recreational",
    countryCode: "KE",
    species: [],
    closed: [],
    note: "Kenya's 2024 recreational fisheries regulations set no closed season. A recreational licence from the county government is required, and catch-and-release is expected where possible.",
    regulator: "Kenya Fisheries Service / county governments",
    source: "https://new.kenyalaw.org/akn/ke/act/ln/2024/127/eng@2024-08-02",
    checked: CHECKED,
  },

  // ---- Nigeria -----------------------------------------------------------------
  // source: Inland Fisheries Act (Nigeria), s. 9 — a State Commissioner may close "such area or season as he may
  //   deem fit"; explosives, poison and electricity banned (s. 6); no standing closed season.
  //   https://placng.org/lawsofnigeria/print.php?sn=206
  {
    id: "ng-inland",
    countryCode: "NG",
    species: [],
    closed: [],
    note: "Nigeria's Inland Fisheries Act sets no standing closed season; a state may close an area or a season by notice. Ask locally before fishing the lagoon creeks, and never use poison or explosives.",
    regulator: "Federal Ministry of Marine and Blue Economy / Lagos State",
    source: "https://placng.org/lawsofnigeria/print.php?sn=206",
    checked: CHECKED,
  },
  // Rows read region by region from the regulators' own pages: src/data/region-rules/.
  ...REGION_CLOSED_SEASONS,
];
