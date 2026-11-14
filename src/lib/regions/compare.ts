/**
 * Two towns side by side: the climate lines that differ, and what the
 * libraries give one and not the other. Pure, so the client compare widget
 * runs it on the rows and library the region page hands it.
 */
import { SHORT, degC, frostFreeText, frostText, metres, mm, waterLabel, RAIN_WORDS } from "./format";
import type { LibItem, OrgRef, RegionLibrary, TownOrgs, TownRow } from "./types";

export type CompareLine = {
  key: string;
  label: string;
  a: string;
  b: string;
  /** The two values differ. */
  differs: boolean;
  /** One line on how the value was read. */
  method: string;
};

export type Comparison = {
  a: TownRow;
  b: TownRow;
  lines: CompareLine[];
  /** Library items in `a` and not in `b`, and the other way round, by kind. */
  onlyA: LibItem[];
  onlyB: LibItem[];
  shared: number;
  /** Crops could not be compared for one town (no rain record). */
  cropsUnknown: string[];
  /** Sentences on who looks after each town, when the region's towns have local organisations. */
  orgNotes: string[];
};

const monthName = (m: number | null) => (m == null ? "—" : SHORT[m - 1]);

/** The subjects the comparison names an organisation for, and what a town without one lacks. */
const ORG_SUBJECTS = [
  { key: "water", topics: ["water", "fish"], label: "Water and fish", noun: "water body", phrase: (t: TownRow) => `its ${WATER_WORD[t.water]}` },
  { key: "birds", topics: ["birds"], label: "Birds", noun: "bird group", phrase: () => "its birds" },
  { key: "land", topics: ["land", "plants", "forests"], label: "Land and plants", noun: "land or plant group", phrase: () => "its land and wild plants" },
] as const;

/** The subjects the comparison reads, so the page hands the client only those. */
export const COMPARE_TOPICS = [...new Set(ORG_SUBJECTS.flatMap((s) => s.topics))];

/** The town organisations cut to what the compare widget reads (the counts and the bodies for its subjects). */
export function compareOrgs(orgs: Record<string, TownOrgs>): Record<string, TownOrgs> {
  return Object.fromEntries(
    Object.entries(orgs).map(([slug, o]) => [slug, { local: o.local, nearby: o.nearby, best: Object.fromEntries(COMPARE_TOPICS.filter((t) => o.best[t]).map((t) => [t, o.best[t]])) }]),
  );
}

const WATER_WORD: Record<TownRow["water"], string> = { coast: "coast", "near-coast": "coast", lake: "lake", river: "river", inland: "water" };

/** Whether any town of the region has a local organisation; with none, the organisation lines are left out. */
export const anyLocalOrgs = (orgs: Record<string, TownOrgs> | undefined) => !!orgs && Object.values(orgs).some((o) => o.local > 0);

/** The town's body for a subject: the first at tier 3 across the subject's topics, else the first at tier 2. */
function bodyFor(o: TownOrgs | undefined, topics: readonly string[]): OrgRef | undefined {
  const refs = topics.map((t) => o?.best[t as keyof TownOrgs["best"]]).filter((r): r is OrgRef => !!r);
  return refs.find((r) => r.tier === 3) ?? refs[0];
}

const bodyText = (r: OrgRef | undefined) => (!r ? "None in our library yet" : r.tier === 3 ? r.short : `${r.short} (across ${r.across ?? "the region"})`);

/** The comparison table's organisation lines: how many local bodies, and the one for water, birds and land. */
export function orgCompareLines(a: TownRow, b: TownRow, orgs: Record<string, TownOrgs>): CompareLine[] {
  const oa = orgs[a.slug];
  const ob = orgs[b.slug];
  const count = (o: TownOrgs | undefined) => (!o || !o.local ? "None in our library yet" : `${o.local}${o.nearby ? ` (${o.nearby} nearby)` : ""}`);
  return [
    {
      key: "orgs",
      label: "Local organisations",
      a: count(oa),
      b: count(ob),
      differs: count(oa) !== count(ob),
      method: "Organisations in the site's conservation library whose home water, radius or listed towns take in the town (nearby), or whose province, state or region does. National and international bodies cover both towns and are left out.",
    },
    ...ORG_SUBJECTS.map((s) => {
      const ra = bodyFor(oa, s.topics);
      const rb = bodyFor(ob, s.topics);
      return {
        key: `org-${s.key}`,
        label: s.label,
        a: bodyText(ra),
        b: bodyText(rb),
        differs: (ra?.slug ?? "") !== (rb?.slug ?? ""),
        method: "The library's best match at the town for the subject: one whose water, radius or listed towns take in the town first, then one working across its province, state or region.",
      };
    }),
  ];
}

/** "Ottawa has a Waterkeeper for its river (Ottawa Riverkeeper); Thunder Bay does not yet have a local water body in our library." */
export function orgNotes(a: TownRow, b: TownRow, orgs: Record<string, TownOrgs>): string[] {
  const out: string[] = [];
  const oa = orgs[a.slug];
  const ob = orgs[b.slug];
  if (!oa?.local && !ob?.local) return ["Neither town has a local organisation in our library yet; the national bodies above cover both."];
  for (const s of ORG_SUBJECTS) {
    const near = (o: TownOrgs | undefined) => {
      const r = bodyFor(o, s.topics);
      return r?.tier === 3 ? r : undefined;
    };
    const ra = near(oa);
    const rb = near(ob);
    const has = (t: TownRow, r: OrgRef) => (s.key === "water" && r.network === "Waterkeeper Alliance" ? `a Waterkeeper for ${s.phrase(t)}, ${r.name}` : `${r.name} for ${s.phrase(t)}`);
    const lacks = (t: TownRow, o: TownOrgs | undefined) => {
      const wide = bodyFor(o, s.topics);
      return `${t.name} does not yet have a local ${s.noun} in our library${wide ? `; ${wide.short} works across ${wide.across ?? "the region"}` : ""}`;
    };
    // The second town's body is named without repeating what it is for, unless that differs (a river and a lake, a Waterkeeper and not).
    const also = (t: TownRow, r: OrgRef, first: OrgRef) => (has(t, r).replace(r.name, "") !== has(a, first).replace(first.name, "") ? has(t, r) : r.name);
    if (ra && rb) out.push(ra.slug === rb.slug ? `${a.name} and ${b.name} share ${ra.name} for ${s.label.toLowerCase()}.` : `${a.name} has ${has(a, ra)}; ${b.name} has ${also(b, rb, ra)}.`);
    else if (ra) out.push(`${a.name} has ${has(a, ra)}; ${lacks(b, ob)}.`);
    else if (rb) out.push(`${b.name} has ${has(b, rb)}; ${lacks(a, oa)}.`);
  }
  return out;
}

/** The lines of the comparison table, with each value as the town page prints it; with the region's town organisations, their lines too. */
export function compareLines(a: TownRow, b: TownRow, orgs?: Record<string, TownOrgs>): CompareLine[] {
  const line = (key: string, label: string, f: (t: TownRow) => string, method: string, same?: (t: TownRow) => unknown): CompareLine => {
    const va = f(a);
    const vb = f(b);
    const eq = same ? same(a) === same(b) : va === vb;
    return { key, label, a: va, b: vb, differs: !eq, method };
  };
  return [
    line("zone", "Hardiness zone", (t) => t.zone ?? "—", "Official USDA 2023 or NRCan map where one covers the town; otherwise from the ten-year mean annual extreme minimum (ERA5)."),
    line("frost", "Frost", frostText, "GHCN station normals within 15 km where there are stations; otherwise the ERA5 daily minimum read at 4.5 °C."),
    line("frostFree", "Frost-free season", frostFreeText, "Days between the average last spring and first autumn frost."),
    line("rain", "Precipitation a year",(t) => (t.rainMm == null ? "—" : `${mm(t.rainMm)}, ${t.rain ? RAIN_WORDS[t.rain] : ""}`), "Monthly totals of rain and melted snow: a weather station's 1991–2020 record within 15 km where there is one (NOAA GHCN-Daily), otherwise ten years of ERA5; the pattern from the share falling in the summer half of the year."),
    line("wettest", "Wettest · driest month", (t) => (t.wettest ? `${monthName(t.wettest)} · ${monthName(t.driest)}` : "—"), "The months with the largest and smallest average total."),
    line("cold", "Coldest month", (t) => (t.coldestC == null ? "—" : `${degC(t.coldestC)} (${monthName(t.coldestMonth)})`), "Mean of the daily highs and lows of the coldest month.", (t) => Math.round(t.coldestC ?? -999)),
    line("hot", "Hottest month", (t) => (t.warmestC == null ? "—" : `${degC(t.warmestC)} (${monthName(t.warmestMonth)})`), "Mean of the daily highs and lows of the warmest month.", (t) => Math.round(t.warmestC ?? -999)),
    line("water", "Water", waterLabel, "Natural Earth: the sea within about 10 km (near: 30 km), a big lake or a big river at the town.", (t) => `${t.water}:${t.waterName}`),
    line("elev", "Elevation", (t) => metres(t.elevationM), "The ERA5 grid cell's elevation (Open-Meteo)."),
    line("regime", "Climate", (t) => (t.regimeName ? `${t.regimeName} (Köppen ${t.koppen})` : "—"), "Köppen–Geiger class from the twelve monthly means and totals (temperatures from the ERA5 weather-model grid); two classes where the town sits within half a degree, or a tenth of its rain, of the line between them."),
    ...(orgs && anyLocalOrgs(orgs) ? orgCompareLines(a, b, orgs) : []),
  ];
}

/** What is in one town and not the other, from the region's library (and, given the town organisations, who looks after each). */
export function compareTowns(a: TownRow, b: TownRow, lib: RegionLibrary, orgs?: Record<string, TownOrgs>): Comparison {
  const ia = new Set(lib.byTown[a.slug] ?? []);
  const ib = new Set(lib.byTown[b.slug] ?? []);
  const cropsUnknown = [a, b].filter((t) => lib.noCrops.includes(t.slug)).map((t) => t.name);
  // When one town's crops are unknown, crops are left out of both sides rather than shown as a difference.
  const skipCrops = cropsUnknown.length > 0;
  const keep = (i: number) => !(skipCrops && lib.items[i].kind === "crop");
  const onlyA = [...ia].filter((i) => !ib.has(i) && keep(i)).map((i) => lib.items[i]);
  const onlyB = [...ib].filter((i) => !ia.has(i) && keep(i)).map((i) => lib.items[i]);
  const shared = [...ia].filter((i) => ib.has(i) && keep(i)).length;
  return { a, b, lines: compareLines(a, b, orgs), onlyA, onlyB, shared, cropsUnknown, orgNotes: orgs && anyLocalOrgs(orgs) ? orgNotes(a, b, orgs) : [] };
}

/**
 * The town in the list that differs most from `a`: the widest gap in zone,
 * then in the coldest month, then in rain — the comparison worth opening on.
 */
export function mostDifferent(a: TownRow, towns: TownRow[]): TownRow | undefined {
  const score = (t: TownRow) =>
    Math.abs((t.zoneNumber ?? a.zoneNumber ?? 0) - (a.zoneNumber ?? 0)) * 100 +
    Math.abs((t.coldestC ?? a.coldestC ?? 0) - (a.coldestC ?? 0)) * 3 +
    Math.abs((t.rainMm ?? a.rainMm ?? 0) - (a.rainMm ?? 0)) / 100 +
    (t.coast !== a.coast ? 2 : 0) -
    // A town with no rain record compares with dashes; open on a full record where there is one.
    (t.hasRain ? 0 : 1000);
  return towns.filter((t) => t.slug !== a.slug).sort((x, y) => score(y) - score(x))[0];
}
