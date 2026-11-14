"use client";
// Restored from client module 46015 (exports: ZONE_COLORS, ZoneMap)
import * as l from "react/jsx-runtime";
import * as t from "react";
import * as a from "next/navigation";
import * as o from "@/lib/place-cookie";
import * as n from "@/lib/ecoregions";
import * as regionContext from "@/lib/region-context";
import { continentServed } from "@/lib/scope";
/** Is the point on a continent the site serves (src/lib/scope.ts)? A parked one gets no zone, region or guide link. */
const servedAt = (lat, lon) => continentServed((0, n.classifyEcoregion)(lat, lon)?.continent);
let r = [
    {
      label: "Toronto, ON",
      slug: "toronto-ontario",
      lat: 43.65,
      lon: -79.38,
    },
    {
      label: "Montréal, QC",
      slug: "montreal-quebec",
      lat: 45.5,
      lon: -73.57,
    },
    {
      label: "Vancouver, BC",
      slug: "vancouver-british-columbia",
      lat: 49.28,
      lon: -123.12,
    },
    {
      label: "Calgary, AB",
      slug: "calgary-alberta",
      lat: 51.05,
      lon: -114.07,
    },
    {
      label: "Ottawa, ON",
      slug: "ottawa-ontario",
      lat: 45.42,
      lon: -75.7,
    },
    {
      label: "Halifax, NS",
      slug: "halifax-nova-scotia",
      lat: 44.65,
      lon: -63.58,
    },
    {
      label: "Winnipeg, MB",
      slug: "winnipeg-manitoba",
      lat: 49.9,
      lon: -97.14,
    },
    {
      label: "Kingston, ON",
      slug: "kingston-ontario",
      lat: 44.23,
      lon: -76.48,
    },
    {
      label: "Sherbrooke, QC",
      slug: "sherbrooke-quebec",
      lat: 45.4,
      lon: -71.89,
    },
    {
      label: "Seattle, WA",
      slug: "seattle-washington",
      lat: 47.61,
      lon: -122.33,
    },
    {
      label: "Portland, OR",
      slug: "portland-oregon",
      lat: 45.52,
      lon: -122.68,
    },
    {
      label: "Minneapolis, MN",
      slug: "minneapolis-minnesota",
      lat: 44.98,
      lon: -93.27,
    },
    {
      label: "Chicago, IL",
      slug: "chicago-illinois",
      lat: 41.88,
      lon: -87.63,
    },
    {
      label: "Burlington, VT",
      slug: "burlington-vermont",
      lat: 44.48,
      lon: -73.21,
    },
    {
      label: "Buffalo, NY",
      slug: "buffalo-new-york",
      lat: 42.89,
      lon: -78.88,
    },
    {
      label: "Denver, CO",
      slug: "denver-colorado",
      lat: 39.74,
      lon: -104.99,
    },
    {
      label: "Asheville, NC",
      slug: "asheville-north-carolina",
      lat: 35.6,
      lon: -82.55,
    },
    {
      label: "Austin, TX",
      slug: "austin-texas",
      lat: 30.27,
      lon: -97.74,
    },
    {
      label: "Atlanta, GA",
      slug: "atlanta-georgia",
      lat: 33.75,
      lon: -84.39,
    },
    {
      label: "Portland, ME",
      slug: "portland-maine",
      lat: 43.66,
      lon: -70.26,
    },
  ],
  i = {
    "0a": "#d6d6ff",
    "0b": "#c4c4f7",
    "1a": "#d7c8f5",
    "1b": "#c9b5f0",
    "2a": "#c0a2eb",
    "2b": "#b48ee6",
    "3a": "#8fa4e6",
    "3b": "#7fb3e6",
    "4a": "#7fc8e6",
    "4b": "#8ad9e3",
    "5a": "#8fd9c9",
    "5b": "#8fd9a6",
    "6a": "#a5db85",
    "6b": "#c2df7a",
    "7a": "#dfe07a",
    "7b": "#f0e07a",
    "8a": "#f3cf73",
    "8b": "#f2b86b",
    "9a": "#f1a065",
    "9b": "#ee8a62",
    "10a": "#ea6f5e",
    "10b": "#e05a5a",
    "11a": "#d44a67",
    "11b": "#c93f73",
    "12a": "#b8397f",
    "12b": "#a5338a",
    "13a": "#912f92",
    "13b": "#7d2b96",
  };
export { i as ZONE_COLORS };

/** Ray casting: is [lon, lat] inside a ring of [lon, lat] vertices? */
function inRing(ring, lon, lat) {
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [xi, yi] = ring[i],
      [xj, yj] = ring[j];
    if (yi > lat !== yj > lat && lon < ((xj - xi) * (lat - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}
/** The official half-zone whose polygon holds the point, or null outside the USDA / NRCan maps. */
function zoneInPolygons(geo, lat, lon) {
  if (!geo) return null;
  for (const f of geo.features) {
    const polys = f.geometry.type === "Polygon" ? [f.geometry.coordinates] : f.geometry.type === "MultiPolygon" ? f.geometry.coordinates : [];
    for (const poly of polys) {
      if (!poly.length || !inRing(poly[0], lon, lat)) continue;
      if (poly.slice(1).some((hole) => inRing(hole, lon, lat))) continue;
      return f.properties.z;
    }
  }
  return null;
}

export const ZoneMap = function ({ initial: e }) {
  let s = (0, t.useRef)(null),
    c = (0, t.useRef)(null),
    geoRef = (0, t.useRef)(null),
    d = (0, a.useRouter)(),
    [u, f] = (0, t.useState)("loading"),
    [b, g] = (0, t.useState)(""),
    [m, p] = (0, t.useState)(false);
  // `computed`: the point is outside the USDA / NRCan polygons and the zone came from /api/zone (ten years of winter lows).
  function h(e, l, t, a, o, computed) {
    let r = (0, n.classifyEcoregion)(t, a),
      i = o ? o.replace(/[ab]$/, "") : null,
      s = i && Number(i) >= 2 && 11 >= Number(i) ? `<a href="/zones/${i}" class="underline">Zone ${i} regional guide</a><br/>` : "",
      note = computed?.failed
        ? `<div style="margin-top:2px;font-size:12px;color:var(--ink-2)">No climate record could be read for this point; the nearest town's local guide has its zone.</div>`
        : computed
          ? `<div style="margin-top:2px;font-size:12px;color:var(--ink-2)">${computed.minC != null ? `Computed: coldest night averages ${computed.minC} °C` : "Computed from ten years of winter lows"}${computed.rhs ? ` · RHS ${computed.rhs}` : ""}</div>`
          : o
            ? ""
            : `<div style="margin-top:2px;font-size:12px;color:var(--ink-2)">Working out the zone for this point…</div>`;
    e.popup({
      maxWidth: 260,
    })
      .setLatLng([t, a])
      .setContent(
        `<div style="font-family:inherit;line-height:1.35">
          <div style="font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-2)">${computed && !computed.failed ? "USDA-equivalent zone · computed" : o ? "Hardiness zone · official map" : "Hardiness zone"}</div>
          <div style="font-size:22px;font-weight:600">${o ?? "—"}</div>
          ${note}
          <div style="margin-top:4px;color:var(--ink-2)">${r.name}</div>
          <div style="margin-top:8px;font-size:13px">
            <a href="/guide?lat=${t.toFixed(4)}&lon=${a.toFixed(4)}" class="underline" style="font-weight:600;color:var(--moss)">This week's local guide →</a><br/>
            ${s}
            <a href="/regions/${r.slug}" class="underline">${r.name} guide</a>
          </div>
        </div>`,
      )
      .openOn(l);
  }
  /**
   * The zone at a point: the official polygon when the point is on the USDA /
   * NRCan maps, otherwise the zone /api/zone computes from the point's own
   * winter lows (Europe, Africa, the edges of the maps), the way every local
   * guide computes it. A point on a parked continent (src/lib/scope.ts) gets
   * neither: only a line saying what the guide covers.
   */
  function resolveAt(L, map, lat, lon) {
    const official = zoneInPolygons(geoRef.current, lat, lon);
    if (official) {
      h(L, map, lat, lon, official);
      return;
    }
    if (!servedAt(lat, lon)) {
      L.popup({
        maxWidth: 260,
      })
        .setLatLng([lat, lon])
        .setContent(
          `<div style="font-family:inherit;line-height:1.35">
          <div style="font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-2)">Outside the guide</div>
          <div style="margin-top:4px">The guide covers Canada and the United States.</div>
        </div>`,
        )
        .openOn(map);
      return;
    }
    h(L, map, lat, lon, undefined);
    fetch(`/api/zone?lat=${lat.toFixed(4)}&lon=${lon.toFixed(4)}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((z) => {
        if (!c.current) return;
        if (!z?.zone) {
          h(L, map, lat, lon, undefined, { failed: true });
          return;
        }
        const eco = (0, n.classifyEcoregion)(lat, lon),
          rhs = eco?.continent === "europe" && null != z.minC ? (0, regionContext.rhsRatingFor)(z.minC).code : null;
        h(L, map, lat, lon, z.zone, { minC: z.minC ?? null, rhs });
      })
      .catch(() => c.current && h(L, map, lat, lon, undefined, { failed: true }));
  }
  async function x(e) {
    if ((e.preventDefault(), b.trim() && c.current)) {
      p(true);
      try {
        let e = await fetch(`/api/geocode?q=${encodeURIComponent(b.trim())}`);
        if (!e.ok) throw Error();
        let l = await e.json();
        c.current.setView([l.lat, l.lon], 8);
        resolveAt(window.L, c.current, l.lat, l.lon);
      } catch {
      } finally {
        p(false);
      }
    }
  }
  return (
    (0, t.useEffect)(() => {
      let l,
        t = false;
      return (
        (window.L
          ? Promise.resolve(window.L)
          : new Promise((e, l) => {
              let t = document.createElement("link");
              ((t.rel = "stylesheet"),
                (t.href = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css"),
                document.head.appendChild(t));
              let a = document.createElement("script");
              ((a.src = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js"),
                (a.onload = () => e(window.L)),
                (a.onerror = l),
                document.head.appendChild(a));
            })
        )
          .then(async (a) => {
            if (t || !s.current) return;
            let n = (function () {
                try {
                  let e = localStorage.getItem(o.PLACE_KEY),
                    place = e ? JSON.parse(e) : null;
                  // A place remembered from a parked continent is not where the map opens.
                  return place && servedAt(place.lat, place.lon) ? place : null;
                } catch {
                  return null;
                }
              })(),
              u =
                e ??
                (n
                  ? {
                      lat: n.lat,
                      lon: n.lon,
                      zoom: 7,
                    }
                  : null);
            ((c.current = l =
              a
                .map(s.current, {
                  preferCanvas: true,
                  zoomControl: true,
                  worldCopyJump: true,
                })
                .setView([u?.lat ?? 47, u?.lon ?? -96], u?.zoom ?? 4)),
              !e &&
                n &&
                a
                  .circleMarker([n.lat, n.lon], {
                    radius: 7,
                    color: "#fbfaf6",
                    weight: 2,
                    fillColor: "#3f6b4b",
                    fillOpacity: 1,
                  })
                  .addTo(l)
                  .bindTooltip(n.label.split(",")[0], {
                    permanent: true,
                    direction: "top",
                    offset: [0, -8],
                  }),
              a
                .tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}", {
                  attribution: "Basemap © Esri, HERE, Garmin, OpenStreetMap contributors",
                  maxZoom: 13,
                })
                .addTo(l),
              a
                .tileLayer(
                  "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Reference/MapServer/tile/{z}/{y}/{x}",
                  {
                    maxZoom: 13,
                    pane: "overlayPane",
                    opacity: 0.9,
                  },
                )
                .addTo(l));
            let b = await fetch("/zones.geojson"),
              g = await b.json();
            geoRef.current = g;
            if (!t) {
              for (let e of (a
                .geoJSON(g, {
                  style: (e) => ({
                    color: "#24302a",
                    weight: 0.3,
                    opacity: 0.25,
                    fillColor: i[e.properties.z] ?? "#ccc",
                    fillOpacity: 0.6,
                  }),
                  onEachFeature: (e, t) => {
                    t.on("click", (t) => {
                      a.DomEvent.stopPropagation(t);
                      h(a, l, t.latlng.lat, t.latlng.lng, e.properties.z);
                    });
                  },
                })
                .addTo(l)
                .bringToBack(),
              r))
                a.circleMarker([e.lat, e.lon], {
                  radius: 5,
                  color: "#24302a",
                  weight: 1,
                  fillColor: "#fbfaf6",
                  fillOpacity: 1,
                })
                  .addTo(l)
                  .bindTooltip(e.label, {
                    direction: "top",
                    offset: [0, -6],
                  })
                  .on("click", () => d.push(`/guide/${e.slug}`));
              // Outside the two official maps (Europe, Africa, the oceans' edges) a click still answers:
              // the zone is computed for the point by /api/zone, the way every local guide computes it,
              // unless the point is on a parked continent (resolveAt).
              l.on("click", (e) => resolveAt(a, l, e.latlng.lat, e.latlng.lng));
              f("ready");
            }
          })
          .catch(() => f("error")),
        () => {
          ((t = true), l && l.remove());
        }
      );
    }, []),
    (
      <div>
        <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
          <form onSubmit={x} className="flex flex-1 gap-2">
            <input
              value={b}
              onChange={(e) => g(e.target.value)}
              placeholder="Jump to a town or postal code"
              aria-label="Search the map"
              className="flex-1 w-0 min-w-0 rounded-full border border-edge bg-surface px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-moss/25"
            />
            <button
              type="submit"
              disabled={m}
              className="rounded-full bg-moss text-paper px-4 py-2 text-sm font-semibold hover:bg-moss-2 disabled:opacity-60"
            >
              Go
            </button>
          </form>
          <button
            type="button"
            onClick={function () {
              navigator.geolocation?.getCurrentPosition((e) => {
                if (!c.current) return;
                c.current.setView([e.coords.latitude, e.coords.longitude], 9);
                resolveAt(window.L, c.current, e.coords.latitude, e.coords.longitude);
              });
            }}
            className="rounded-full border border-edge bg-surface px-4 py-2 text-sm hover:border-moss"
          >
            Use my location
          </button>
        </div>
        <div className="relative mt-3 rounded-card overflow-hidden border border-line">
          <div ref={s} className="h-[70vh] min-h-[420px] w-full bg-paper-2" />
          {"ready" !== u && (
            <div className="absolute inset-0 flex items-center justify-center bg-paper/70 text-sm text-ink-2">
              {"loading" === u ? "Loading zones…" : "The map could not load. Please refresh."}
            </div>
          )}
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5 items-center text-xs text-ink-2">
          <span className="mr-1 font-semibold text-ink">Zones</span>
          {["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"].map((e) => (
            <span key={e} className="inline-flex items-center gap-1 rounded-md border border-line bg-surface px-1.5 py-0.5">
              <span
                className="inline-block w-3 h-3 rounded-sm"
                style={{
                  background: i[`${e}a`],
                }}
              />
              <span
                className="inline-block w-3 h-3 rounded-sm -ml-1"
                style={{
                  background: i[`${e}b`],
                }}
              />
              {e}
            </span>
          ))}
        </div>
      </div>
    )
  );
};
