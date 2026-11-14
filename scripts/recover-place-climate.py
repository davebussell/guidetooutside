#!/usr/bin/env python3
"""
Recover the climate normals of the pre-built towns from the live site.

The 8 October 2026 workspace reset lost src/data/place-normals.json and
src/data/place-frost.json. Every pre-built town's guide page on the live site
serialised its full climate record into the page (the GuideLoader fallback),
so the records are read back from the captured pages, exactly as the live site
used them. The two towns whose pages carried a stored AI guide instead
(Cape Town, Lagos) are read from the Blobs backup (temps:v1) and from the
climate chart on their pages (the chart's bars and band encode the monthly
rain and temperatures exactly).

usage: python3 scripts/recover-place-climate.py <capture/html dir> <blobs-guides.jsonl>
writes src/data/place-normals.json (one {place, climate} per town, in the
order of src/lib/known-places.json) and src/data/place-frost.json (station
frost normals, by slug, for the towns that have them).
"""
import json, os, re, sys

ROOT = os.path.join(os.path.dirname(__file__), "..")
CAP = sys.argv[1] if len(sys.argv) > 1 else "/home/claude/rebuild/capture/html"
BLOBS = sys.argv[2] if len(sys.argv) > 2 else "/home/claude/rebuild/blobs-guides.jsonl"
sys.path.insert(0, "/home/claude/rebuild/tools")
from rsc import client_uses  # noqa: E402

known = json.load(open(os.path.join(ROOT, "src/lib/known-places.json")))


def resolve(obj, root):
    if isinstance(obj, str) and obj.startswith("$") and ":fallback:data:" in obj:
        x = root
        for p in obj.split(":fallback:data:")[1].split(":"):
            x = x[int(p)] if isinstance(x, list) else x[p]
        return x
    if isinstance(obj, list):
        return [resolve(o, root) for o in obj]
    if isinstance(obj, dict):
        return {k: resolve(v, root) for k, v in obj.items()}
    return obj


def from_page(slug):
    f = f"{CAP}/guide/{slug}.html"
    if not os.path.exists(f):
        return None
    _, uses, _ = client_uses(open(f, encoding="utf-8").read())
    for u in uses:
        if u["export"] == "GuideLoader":
            d = u["props"]["fallback"]["data"]
            return resolve(d, d)["climate"]
    return None


def blob(key):
    with open(BLOBS) as fh:
        for line in fh:
            if f'"k":"{key}"' in line or f'"k": "{key}"' in line:
                o = json.loads(line)
                v = o["v"]
                return json.loads(v) if isinstance(v, str) else v
    return None


def from_chart(slug):
    """Monthly rain and temperatures, read back from the page's ClimateYear chart."""
    t = open(f"{CAP}/guide/{slug}.html", encoding="utf-8").read()
    i = t.find("The year in")
    s = t[t.find("<svg", i): t.find("</svg>", i)]
    heights = [float(h) for h in re.findall(r'height="([\d.]+)" class="fill-azure', s)]
    lab = re.findall(r'<text x="30" y="([\d.]+)" text-anchor="end" class="fill-azure text-\[10px\]">(\d+)<', s)
    y, v = float(lab[-1][0]), int(lab[-1][1])
    scale = (168 - (y - 3)) / v
    rain = [round(h / scale) for h in heights]
    temps = re.findall(r'<text x="570" y="([\d.]+)" class="fill-rust text-\[10px\]">(-?\d+)', s)
    (y0, t0), (y1, t1) = (float(temps[0][0]) - 3, int(temps[0][1])), (float(temps[-1][0]) - 3, int(temps[-1][1]))
    per = (y0 - y1) / (t1 - t0)
    band = [tuple(map(float, x.split(","))) for x in re.findall(r"[ML]([\d.]+,[\d.]+)", re.findall(r'<path d="([^"]+)"', s)[0])]
    to_t = lambda yy: round(t0 + (y0 - yy) / per, 1)
    mx = [to_t(b[1]) for b in band[:12]]
    mn = [to_t(b[1]) for b in band[12:]][::-1]
    elev = re.search(r"about ([\d,]+) m above sea level", re.sub(r"<!-- -->", "", t))
    return rain, mx, mn, int(elev.group(1).replace(",", "")) if elev else None


normals, frost = [], {}
for p in known:
    slug = p["slug"]
    c = from_page(slug)
    if c is None and slug == "cape-town-south-africa":
        c = blob("temps:v1:-33.92:18.42")["value"]["climate"]
    if c is None and slug == "lagos-nigeria":
        rain, mx, mn, elev = from_chart(slug)
        # Not shown anywhere on the live pages: the zone card is only drawn for
        # zones 1-12. The ERA5 extreme low on the Lagos lagoon coast is about
        # 20 °C (Abidjan, the same coast, reads 20.2), which is zone 13b.
        c = {
            "yearsSampled": 10, "meanAnnualExtremeMinC": 20.0, "zone": "13b", "zoneNumber": 13,
            "lastSpringFrost": "Rare", "firstFallFrost": "Rare", "lastSpringFrostDoy": 0, "firstFallFrostDoy": 366,
            "frostFreeDays": 366, "frostSource": "grid", "frostSpreadDays": None, "frostStations": None,
            "monthlyMeanMax": mx, "monthlyMeanMin": mn, "zoneSource": "estimated", "estimated": True,
            "monthlyRainMm": rain, "elevationM": elev,
        }
    if c is None:
        print("missing", slug, file=sys.stderr)
        continue
    normals.append({"place": p, "climate": c})
    if c.get("frostSource") == "stations":
        frost[slug] = {k: c[k] for k in ("lastSpringFrost", "firstFallFrost", "lastSpringFrostDoy", "firstFallFrostDoy", "frostFreeDays", "frostSpreadDays", "frostStations") if k in c}
        frost[slug]["lat"] = p["lat"]
        frost[slug]["lon"] = p["lon"]

json.dump(normals, open(os.path.join(ROOT, "src/data/place-normals.json"), "w"), ensure_ascii=False, separators=(",", ":"))
json.dump(frost, open(os.path.join(ROOT, "src/data/place-frost.json"), "w"), ensure_ascii=False, indent=0)
print(len(normals), "normals,", len(frost), "station frost records")
