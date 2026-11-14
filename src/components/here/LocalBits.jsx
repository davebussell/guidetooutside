"use client";
// Restored from client module 82937 (exports: LocalAnswer, NearYouLine, RegionChips, RockUnderYou, YourRegionBanner, YourRegionMark, YourRegsCard)
import * as n from "react/jsx-runtime";
import * as i from "next/link";
import * as s from "@/lib/use-here";
import * as a from "@/lib/the-region";
import * as t from "@/lib/ecoregions";
import * as r from "@/lib/species";
import { useRegion } from "@/lib/use-region";
import { regsForContext } from "@/lib/region-regs";
import { continentServed } from "@/lib/scope";
let o = {
    AB: {
      agency: "Alberta Environment and Protected Areas",
      url: "https://www.alberta.ca/fishing-regulations",
    },
    BC: {
      agency: "BC Freshwater Fishing Regulations Synopsis",
      url: "https://www2.gov.bc.ca/gov/content/sports-culture/recreation/fishing-hunting/fishing",
    },
    MB: {
      agency: "Manitoba Fisheries Branch",
      url: "https://www.gov.mb.ca/nrnd/fish-wildlife/fish/",
    },
    NB: {
      agency: "New Brunswick Natural Resources – Fish",
      url: "https://www2.gnb.ca/content/gnb/en/departments/erd/natural_resources/content/fish.html",
    },
    NL: {
      agency: "Fisheries and Oceans Canada – Newfoundland & Labrador",
      url: "https://www.dfo-mpo.gc.ca/fisheries-peches/recreational-recreative/index-eng.html",
    },
    NS: {
      agency: "Nova Scotia Sportfishing",
      url: "https://novascotia.ca/fish/sportfishing/",
    },
    NT: {
      agency: "Government of Northwest Territories – Sport Fishing",
      url: "https://www.gov.nt.ca/ecc/en/services/sport-fishing",
    },
    NU: {
      agency: "Government of Nunavut – Fishing",
      url: "https://www.gov.nu.ca/en/environment/fishing",
    },
    ON: {
      agency: "Ontario Fishing Regulations Summary",
      url: "https://www.ontario.ca/page/fishing-ontario",
    },
    PE: {
      agency: "Prince Edward Island – Fishing & Angling",
      url: "https://www.princeedwardisland.ca/en/topic/fishing-and-angling",
    },
    QC: {
      agency: "Québec – Sport Fishing (MELCCFP)",
      url: "https://www.quebec.ca/en/tourism-and-recreation/sporting-and-outdoor-activities/sport-fishing",
    },
    SK: {
      agency: "Saskatchewan Anglers' Guide",
      url: "https://www.saskatchewan.ca/residents/parks-culture-heritage-and-sport/hunting-trapping-and-angling/angling",
    },
    YT: {
      agency: "Yukon Fishing Regulations Summary",
      url: "https://yukon.ca/en/outdoor-recreation-and-wildlife/fishing",
    },
  },
  l = {
    AL: {
      agency: "Alabama Wildlife & Freshwater Fisheries",
      url: "https://www.outdooralabama.com/fishing",
    },
    AK: {
      agency: "Alaska Department of Fish and Game",
      url: "https://www.adfg.alaska.gov/index.cfm?adfg=fishing.main",
    },
    AZ: {
      agency: "Arizona Game & Fish Department",
      url: "https://www.azgfd.com/fishing/",
    },
    AR: {
      agency: "Arkansas Game and Fish Commission",
      url: "https://www.agfc.com/fishing/",
    },
    CA: {
      agency: "California Department of Fish and Wildlife",
      url: "https://wildlife.ca.gov/Fishing",
    },
    CO: {
      agency: "Colorado Parks & Wildlife",
      url: "https://cpw.state.co.us/fishing",
    },
    CT: {
      agency: "Connecticut DEEP Fishing",
      url: "https://portal.ct.gov/deep/fishing",
    },
    DE: {
      agency: "Delaware Division of Fish & Wildlife",
      url: "https://dnrec.delaware.gov/fish-wildlife/fishing/",
    },
    FL: {
      agency: "Florida Fish and Wildlife Conservation Commission",
      url: "https://myfwc.com/fishing/",
    },
    GA: {
      agency: "Georgia DNR Wildlife Resources Division",
      url: "https://georgiawildlife.com/fishing",
    },
    HI: {
      agency: "Hawaiʻi Division of Aquatic Resources",
      url: "https://dlnr.hawaii.gov/dar/fishing/",
    },
    ID: {
      agency: "Idaho Department of Fish and Game",
      url: "https://idfg.idaho.gov/fish",
    },
    IL: {
      agency: "Illinois DNR Fishing",
      url: "https://dnr.illinois.gov/fishing.html",
    },
    IN: {
      agency: "Indiana DNR Fish & Wildlife",
      url: "https://www.in.gov/dnr/fish-and-wildlife/fishing/",
    },
    IA: {
      agency: "Iowa DNR Fishing",
      url: "https://www.iowadnr.gov/fishing",
    },
    KS: {
      agency: "Kansas Department of Wildlife & Parks",
      url: "https://ksoutdoors.gov/Fishing",
    },
    KY: {
      agency: "Kentucky Fish & Wildlife",
      url: "https://fw.ky.gov/Fish/Pages/default.aspx",
    },
    LA: {
      agency: "Louisiana Wildlife and Fisheries",
      url: "https://www.wlf.louisiana.gov/page/fishing",
    },
    ME: {
      agency: "Maine Inland Fisheries & Wildlife",
      url: "https://www.maine.gov/ifw/fishing-boating/fishing/",
    },
    MD: {
      agency: "Maryland DNR Fishing",
      url: "https://dnr.maryland.gov/fisheries/",
    },
    MA: {
      agency: "MassWildlife Fishing",
      url: "https://www.mass.gov/fishing",
    },
    MI: {
      agency: "Michigan DNR Fishing",
      url: "https://www.michigan.gov/dnr/things-to-do/fishing",
    },
    MN: {
      agency: "Minnesota DNR Fishing",
      url: "https://www.dnr.state.mn.us/fishing/index.html",
    },
    MS: {
      agency: "Mississippi Wildlife, Fisheries & Parks",
      url: "https://www.mdwfp.com/fishing-boating/",
    },
    MO: {
      agency: "Missouri Department of Conservation",
      url: "https://mdc.mo.gov/fishing",
    },
    MT: {
      agency: "Montana Fish, Wildlife & Parks",
      url: "https://fwp.mt.gov/fish",
    },
    NE: {
      agency: "Nebraska Game and Parks",
      url: "https://outdoornebraska.gov/fishing/",
    },
    NV: {
      agency: "Nevada Department of Wildlife",
      url: "https://www.ndow.org/fishing/",
    },
    NH: {
      agency: "New Hampshire Fish and Game",
      url: "https://www.wildlife.nh.gov/fishing-new-hampshire",
    },
    NJ: {
      agency: "New Jersey Fish & Wildlife",
      url: "https://dep.nj.gov/njfw/fishing/",
    },
    NM: {
      agency: "New Mexico Game & Fish",
      url: "https://www.wildlife.state.nm.us/fishing/",
    },
    NY: {
      agency: "New York State DEC Fishing",
      url: "https://dec.ny.gov/things-to-do/fishing",
    },
    NC: {
      agency: "North Carolina Wildlife Resources Commission",
      url: "https://www.ncwildlife.org/fishing",
    },
    ND: {
      agency: "North Dakota Game and Fish",
      url: "https://gf.nd.gov/fishing",
    },
    OH: {
      agency: "Ohio DNR Division of Wildlife",
      url: "https://ohiodnr.gov/discover-and-learn/safety-conservation/about-odnr/division-wildlife/fishing",
    },
    OK: {
      agency: "Oklahoma Department of Wildlife Conservation",
      url: "https://www.wildlifedepartment.com/fishing",
    },
    OR: {
      agency: "Oregon Department of Fish & Wildlife",
      url: "https://myodfw.com/fishing",
    },
    PA: {
      agency: "Pennsylvania Fish & Boat Commission",
      url: "https://www.fishandboat.com/",
    },
    RI: {
      agency: "Rhode Island DEM Fish & Wildlife",
      url: "https://dem.ri.gov/natural-resources-bureau/fish-wildlife/fishing",
    },
    SC: {
      agency: "South Carolina DNR",
      url: "https://www.dnr.sc.gov/fishing.html",
    },
    SD: {
      agency: "South Dakota Game, Fish and Parks",
      url: "https://gfp.sd.gov/fishing/",
    },
    TN: {
      agency: "Tennessee Wildlife Resources Agency",
      url: "https://www.tn.gov/twra/fishing.html",
    },
    TX: {
      agency: "Texas Parks & Wildlife",
      url: "https://tpwd.texas.gov/fishboat/fish/",
    },
    UT: {
      agency: "Utah Division of Wildlife Resources",
      url: "https://wildlife.utah.gov/fishing.html",
    },
    VT: {
      agency: "Vermont Fish & Wildlife",
      url: "https://vtfishandwildlife.com/fish",
    },
    VA: {
      agency: "Virginia Department of Wildlife Resources",
      url: "https://dwr.virginia.gov/fishing/",
    },
    WA: {
      agency: "Washington Department of Fish & Wildlife",
      url: "https://wdfw.wa.gov/fishing",
    },
    WV: {
      agency: "West Virginia Division of Natural Resources",
      url: "https://wvdnr.gov/fishing/",
    },
    WI: {
      agency: "Wisconsin DNR Fishing",
      url: "https://dnr.wisconsin.gov/topic/fishing",
    },
    WY: {
      agency: "Wyoming Game & Fish Department",
      url: "https://wgfd.wyo.gov/fishing-and-boating",
    },
    DC: {
      agency: "DC Department of Energy & Environment – Fishing",
      url: "https://doee.dc.gov/service/fishing-district",
    },
  },
  g = {
    alberta: "AB",
    "british columbia": "BC",
    manitoba: "MB",
    "new brunswick": "NB",
    "newfoundland and labrador": "NL",
    "nova scotia": "NS",
    "northwest territories": "NT",
    nunavut: "NU",
    ontario: "ON",
    "prince edward island": "PE",
    quebec: "QC",
    québec: "QC",
    saskatchewan: "SK",
    yukon: "YT",
    alabama: "AL",
    alaska: "AK",
    arizona: "AZ",
    arkansas: "AR",
    california: "CA",
    colorado: "CO",
    connecticut: "CT",
    delaware: "DE",
    florida: "FL",
    georgia: "GA",
    hawaii: "HI",
    hawaiʻi: "HI",
    idaho: "ID",
    illinois: "IL",
    indiana: "IN",
    iowa: "IA",
    kansas: "KS",
    kentucky: "KY",
    louisiana: "LA",
    maine: "ME",
    maryland: "MD",
    massachusetts: "MA",
    michigan: "MI",
    minnesota: "MN",
    mississippi: "MS",
    missouri: "MO",
    montana: "MT",
    nebraska: "NE",
    nevada: "NV",
    "new hampshire": "NH",
    "new jersey": "NJ",
    "new mexico": "NM",
    "new york": "NY",
    "north carolina": "NC",
    "north dakota": "ND",
    ohio: "OH",
    oklahoma: "OK",
    oregon: "OR",
    pennsylvania: "PA",
    "rhode island": "RI",
    "south carolina": "SC",
    "south dakota": "SD",
    tennessee: "TN",
    texas: "TX",
    utah: "UT",
    vermont: "VT",
    virginia: "VA",
    washington: "WA",
    "west virginia": "WV",
    wisconsin: "WI",
    wyoming: "WY",
    "district of columbia": "DC",
  };
export const LocalAnswer = function ({ section: e, children: a }) {
  let t = (0, s.useHere)();
  return t.place ? (
    <section className="mt-12 card p-6 sm:p-8">
      <p className="eyebrow text-moss">Local guide</p>
      <h2 className="font-display mt-1 text-2xl font-semibold">
        {"This week in "}
        {t.town}
      </h2>
      <p className="mt-2 max-w-2xl text-sm text-ink-2">
        {"The local page lists "}
        {"fishing" === e ? "the species active" : "gardening" === e ? "the garden tasks" : "the wild foods in season"}
        {" this week, based on "}
        {t.town}&apos;s weather, soil and season.
      </p>
      <i.default
        href={`/${e}/${t.place.slug}`}
        className="mt-4 inline-flex items-center gap-2 rounded-full bg-moss px-5 py-2.5 font-semibold text-paper transition hover:bg-moss-2"
      >
        {"fishing" === e ? "Fishing" : "gardening" === e ? "Gardening" : "Foraging"}
        {" in "}
        {t.town}
        {" →"}
      </i.default>
    </section>
  ) : (
    <>{a}</>
  );
};
export const NearYouLine = function ({ regions: e, months: a, section: o, verb: l = "active" }) {
  let g,
    h = (0, s.useHere)();
  if (!h.place || !h.region || !h.month) return null;
  let c = !!(g = h.region.slug) && ("all" === e || e.includes(g)),
    d = a.includes((0, t.libraryMonth)(h.month, h.region.slug, e)),
    u = `/${o}/${h.place.slug}`;
  return (
    <div
      className={`mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 rounded-tile border px-4 py-2.5 text-sm ${c ? "border-moss/40 bg-moss-soft" : "border-line bg-paper-2/60"}`}
    >
      <span className="text-ink">
        {c ? (
          <>
            <span className="font-semibold">Recorded in your region</span>
            {" ("}
            {h.region.name}){" "}
            {d ? (
              <>
                {"· "}
                <span className="font-semibold text-moss">{l}</span>
                {" in "}
                {(0, r.monthName)(h.month)}
                {" near "}
                {h.town}
              </>
            ) : (
              <>
                {"· not usually "}
                {l}
                {" in "}
                {(0, r.monthName)(h.month)}
              </>
            )}
          </>
        ) : (
          <>
            <span className="font-semibold">Not recorded in your region</span>
            {" ("}
            {h.region.name}
            {"); relevant when travelling, not near "}
            {h.town}.
          </>
        )}
      </span>
      <i.default href={u} className="font-semibold text-moss hover:underline">
        {"fishing" === o ? "Fishing" : "gardening" === o ? "Gardening" : "Foraging"}
        {" guide for "}
        {h.town}
        {" →"}
      </i.default>
    </div>
  );
};
export const RegionChips = function ({ regions: e }) {
  let a = (0, s.useHere)(),
    t = a.region?.slug;
  return (
    <ul className="mt-3 flex flex-wrap gap-2">
      {e.map((e) => {
        let s = e.slug === t;
        return (
          <li key={e.slug}>
            <i.default
              href={`/regions/${e.slug}`}
              className={`inline-block rounded-full border px-3.5 py-1.5 text-sm transition ${s ? "border-moss bg-moss text-paper" : "border-edge bg-surface hover:border-moss hover:text-moss"}`}
            >
              {e.name}
              {s && <span className="ml-1.5 text-xs opacity-90">· your region</span>}
            </i.default>
          </li>
        );
      })}
    </ul>
  );
};
export const RockUnderYou = function ({ here: e }) {
  let a = (0, s.useHere)();
  if (!a.place) return null;
  if (a.loading) return <div className="h-11 animate-pulse rounded-tile bg-paper-2/60" aria-hidden="true" />;
  if (!a.rock) return null;
  let t = e === a.rock.slug;
  return (
    <div
      className={`flex flex-wrap items-center gap-x-4 gap-y-1 rounded-tile border px-4 py-3 text-sm ${t ? "border-moss/40 bg-moss-soft" : "border-line bg-paper-2/60"}`}
    >
      <p className="text-ink">
        {t ? (
          <>
            <span className="font-semibold">
              {"This is the bedrock the geologic map shows under "}
              {a.town}
            </span>
            {a.rock.unit ? (
              <>
                {", mapped as "}
                {a.rock.unit}.
              </>
            ) : (
              "."
            )}
          </>
        ) : (
          <>
            <span className="font-semibold">
              {"The geologic map shows "}
              {a.rock.name.toLowerCase()}
              {" as the bedrock under "}
              {a.town}
            </span>
            {a.rock.unit ? (
              <>
                {" ("}
                {a.rock.unit})
              </>
            ) : null}
            {e ? ", not this one." : "."}
          </>
        )}
      </p>
      {!t && (
        <i.default href={`/ground/rocks/${a.rock.slug}`} className="font-semibold text-moss hover:underline">
          {a.rock.name}
          {" →"}
        </i.default>
      )}
      <i.default href={`/ground/${a.place.slug}`} className="text-ink-2 underline decoration-line hover:text-ink">
        {"Geology of "}
        {a.town}
      </i.default>
    </div>
  );
};
export const YourRegionBanner = function ({ here: e }) {
  let t = (0, s.useHere)();
  if (!t.place || !t.region) return null;
  let r = e === t.region.slug;
  return (
    <div
      className={`flex flex-wrap items-center gap-x-4 gap-y-1 rounded-tile border px-4 py-3 text-sm ${r ? "border-moss/40 bg-moss-soft" : "border-line bg-paper-2/60"}`}
    >
      <p className="text-ink">
        {r ? (
          <>
            <span className="font-semibold">Your region.</span> {t.town}
            {" is in "}
            {(0, a.theRegion)(t.region.name)}.
          </>
        ) : (
          <>
            <span className="font-semibold">
              {t.town}
              {" is in "}
              {(0, a.theRegion)(t.region.name)}
            </span>
            {e ? ", not the region on this page." : "."}
          </>
        )}
      </p>
      {!r && (
        <i.default href={`/regions/${t.region.slug}`} className="font-semibold text-moss hover:underline">
          Your region →
        </i.default>
      )}
    </div>
  );
};
export const YourRegionMark = function ({ slug: e }) {
  let i = (0, s.useHere)();
  return i.region?.slug !== e ? null : (
    <span className="ml-2 rounded-full bg-moss px-2 py-0.5 text-[11px] font-semibold text-paper">your region</span>
  );
};
export const YourRegsCard = function () {
  let e = (0, s.useHere)(),
    ctx = useRegion();
  // A place remembered from a parked continent (src/lib/scope.ts) gets no regulator: its country's table is not listed.
  if (!e.place || !continentServed(ctx.continent)) return null;
  // Canada and the US by province or state (the inlined tables above); every other country through the
  // 142-entry directory in src/lib/regs.ts, so a reader in Lisbon or Nairobi gets DGRM or the Kenya Fisheries
  // Service and never a North American default.
  let i = g[e.place.label.split(",").slice(1).join(",").trim().toLowerCase()],
    a = i ? (o[i] ?? l[i]) : regsForContext(ctx),
    family = ctx.regulatorFamily === "state" ? "state" : ctx.regulatorFamily === "province" ? "province" : "country";
  return a ? (
    <section className="rounded-tile bg-moss-soft p-5">
      <p className="eyebrow text-moss">
        {"Your regulator · "}
        {e.town}
      </p>
      <h2 className="font-display mt-1 text-xl font-semibold">{a.agency}</h2>
      {a.note && <p className="mt-1 text-sm text-ink-2">{a.note}</p>}
      <a
        href={a.url}
        target="_blank"
        rel="noopener"
        className="mt-3 inline-flex items-center gap-2 rounded-full bg-moss px-4 py-2 text-sm font-semibold text-paper hover:bg-moss-2"
      >
        Official regulations →
      </a>
    </section>
  ) : ctx.known ? (
    <section className="rounded-tile border border-line bg-paper-2/60 p-5">
      <p className="eyebrow text-moss">
        {"Your regulator · "}
        {e.town}
      </p>
      <p className="mt-1 text-sm text-ink">
        {"The directory has no entry yet for your "}
        {family}
        {". Recreational fishing permits there are usually handled by the national fisheries ministry or the park, lodge or district fisheries office; ask before you fish, and tell us the official page if you know it."}
      </p>
    </section>
  ) : null;
};
