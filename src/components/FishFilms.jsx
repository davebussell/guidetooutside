"use client";
// Restored from client module 96978 (exports: FishFilms)
import * as n from "react/jsx-runtime";
import * as i from "@/lib/use-here";
import * as s from "@/lib/the-region";
import * as t from "@/lib/ecoregions";
import * as c from "@/components/SpeciesVideos";
function a(e) {
  return 12 === e || e <= 2 ? "winter" : e <= 5 ? "spring" : e <= 8 ? "summer" : "fall";
}
let r = {
    spring: "spring",
    summer: "summer",
    fall: "autumn",
    winter: "winter",
  },
  o = {
    "boreal-north": ["boreal-forest", "western-mountains"],
    "boreal-forest": ["great-lakes-st-lawrence", "boreal-north", "acadian-forest"],
    "acadian-forest": ["northeast-coast", "great-lakes-st-lawrence", "boreal-forest"],
    "great-lakes-st-lawrence": ["boreal-forest", "northeast-coast", "appalachian", "central-hardwoods"],
    "northeast-coast": ["acadian-forest", "great-lakes-st-lawrence", "appalachian"],
    appalachian: ["great-lakes-st-lawrence", "central-hardwoods", "northeast-coast", "southeastern"],
    "central-hardwoods": ["appalachian", "great-lakes-st-lawrence", "southeastern", "great-plains"],
    southeastern: ["gulf-coast", "central-hardwoods", "florida-peninsula", "appalachian"],
    "gulf-coast": ["southeastern", "florida-peninsula", "great-plains"],
    "florida-peninsula": ["gulf-coast", "southeastern"],
    "great-plains": ["central-hardwoods", "western-mountains", "boreal-forest"],
    "western-mountains": ["pacific-maritime", "great-plains", "boreal-north", "deserts"],
    "pacific-maritime": ["western-mountains", "mediterranean-california"],
    "mediterranean-california": ["pacific-maritime", "deserts", "western-mountains"],
    deserts: ["mediterranean-california", "western-mountains"],
    "hawaii-tropics": ["mediterranean-california"],
  };
function l(e, n, i, s = 3) {
  let t = a(i),
    r = e
      .map((e) => {
        let i, s, a;
        return {
          v: e,
          s:
            ((i = e.seasons.includes(t)),
            (s = !!n && e.regions.includes(n)),
            (a = !!n && e.regions.some((e) => o[n]?.includes(e))),
            s && i ? 5 : (a && i) || (!n && i) ? 3 : +!!s),
        };
      })
      .filter((e) => e.s > 0)
      .sort((e, n) => n.s - e.s || (n.v.date ?? "").localeCompare(e.v.date ?? ""));
  if (n) return r.slice(0, s).map((e) => e.v);
  let c = new Map(),
    d = [];
  for (let { v: e } of r) {
    let n = e.regions[0] ?? "";
    if (!((c.get(n) ?? 0) >= 2) && (c.set(n, (c.get(n) ?? 0) + 1), d.push(e), d.length >= s)) break;
  }
  return d;
}
export const FishFilms = function ({ name: e, videos: o, month: d }) {
  let h = (0, i.useHere)(),
    g = h.month || d,
    u = h.region?.slug ?? null,
    m = a(g),
    f = r[m],
    p = u ? l(o, u, g, 4) : [],
    w = p.length > 0,
    x = w ? p : l(o, null, g, 4);
  if (!x.length) return null;
  let b = w && x.some((e) => u && e.regions.includes(u)),
    y = e.toLowerCase();
  return (
    <section className="mt-12" id="local-videos">
      <p className="eyebrow text-azure">
        {"Video · "}
        {f}
      </p>
      <h2 className="font-display mt-1 text-2xl sm:text-3xl font-semibold tracking-tight">
        {w ? `Fishing for ${y} in your region: ${f}` : `Fishing for ${y}: ${f}`}
      </h2>
      <p className="mt-1.5 max-w-3xl text-sm text-ink-2">
        {w
          ? b
            ? `Videos filmed in ${h.region ? (0, s.theRegion)(h.region.name) : "the region"}${h.town ? `, the region that includes ${h.town},` : ""} in ${f}: the waters, depths and baits used there at this time of year.`
            : `No ${f} videos from ${h.region ? (0, s.theRegion)(h.region.name) : "the region"} yet; these are from neighbouring regions at the same time of year.`
          : h.region
            ? `No ${f} video for ${y} from ${(0, s.theRegion)(h.region.name)}; these are from where ${y} are fished at this time of year.`
            : `Videos for this season from across the ${y}'s range. Set a location to show videos from your own region.`}{" "}
        Check the regulations for the water before fishing.
      </p>
      <div className={`mt-5 grid gap-5 sm:grid-cols-2 ${x.length >= 3 ? "lg:grid-cols-3" : ""} ${x.length >= 4 ? "xl:grid-cols-4" : ""}`}>
        {x.map((e) => {
          let i, s;
          return (
            <c.VideoCard
              key={e.id}
              v={e}
              tag={
                ((i = e.regions.map((e) => (0, t.getEcoregion)(e)?.name).filter(Boolean)[0] ?? ""),
                [i, (s = m && e.seasons.includes(m) ? m : e.seasons[0]) ? r[s] : ""].filter(Boolean).join(" · "))
              }
            />
          );
        })}
      </div>
    </section>
  );
};
