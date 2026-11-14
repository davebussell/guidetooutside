#!/usr/bin/env python3
"""
Build src/data/water-grid.json: where the sea, the big lakes and the big rivers
are, on a regular latitude/longitude grid over North America, Europe and
Africa, from Natural Earth 1:10m. Read by src/lib/water-setting.ts, so a place
knows its coast, lake and river without a network call.

Layers (one value per cell, run-length encoded per row):
  coast  2 within 10 km of the sea, 1 within 30 km (Natural Earth coastline)
  lake   1-based index into `lakes` for cells on or within 10 km of a lake of
         100 km² or more, largest first, so a neighbourhood minimum is the
         biggest lake near (named by `name_en`)
  river  1-based index into `rivers` for cells within 4 km of a river of
         scalerank ≤ 6 (river and lake centrelines, named by `name_en`)

Each row is a flat list of [gap, length, value] triples: `gap` cells of 0, then
`length` cells of `value`, from the start of the row or the end of the last run.

usage: python3 scripts/build-water-grid.py [natural-earth dir]
The directory holds ne_10m_coastline.geojson, ne_10m_lakes.geojson and
ne_10m_rivers_lake_centerlines.geojson from the natural-earth-vector
repository (downloaded when missing; its names differ from the zipped
shapefiles on naciscdn in places — "Rhein", "Zapadnaya Dvina" — and the live
grid was built from these). Needs numpy and Pillow.

After the generic rasterisation, PINNED_TOWNS sets the cells of the pre-built
towns whose result the live grid recorded differently (its river rasteriser is
lost); every other place gets the generic answer.
"""
import json, math, os, sys, urllib.request

import numpy as np
from PIL import Image, ImageDraw

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..")
OUT = os.path.join(ROOT, "src", "data", "water-grid.json")
NE = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, ".cache", "natural-earth")

STEP = float(os.environ.get("WATER_GRID_STEP", "0.05"))
LAT0, LAT1 = -36.0, 82.0
LON0, LON1 = -180.0, 60.0
ROWS = int(round((LAT1 - LAT0) / STEP))
COLS = int(round((LON1 - LON0) / STEP))
KM_PER_DEG = 111.195  # mean Earth radius 6371 km
ON_KM, NEAR_KM = 10.0, 30.0
MIN_LAKE_KM2 = 100.0
# A lake counts for the cells on and around it: its shore anglers live a few kilometres off.
LAKE_KM = float(os.environ.get("WATER_GRID_LAKE_KM", "10"))
MAX_RIVER_RANK = 6
RIVER_KINDS = set(os.environ.get("WATER_GRID_RIVER_KINDS", "River,Lake Centerline").split(","))
RIVER_KM = float(os.environ.get("WATER_GRID_RIVER_KM", "4"))
RIVER_ORDER = os.environ.get("WATER_GRID_RIVER_ORDER", "first")

# The lost build computed lake areas a little differently where a lake has
# islands (within 0.04%); these are the areas the live grid carried, so the
# place pages print the same figures.
PINNED_TOWNS = {
    # slug: the big river the live grid gave the town's own cell (None: none).
    "ottawa-ontario": "Ottawa",
    "belgrade-serbia": "Danube",
    "khartoum-sudan": "Blue Nile",
    "kinshasa-dr-congo": "Congo",
    "brazzaville-republic-of-the-congo": "Congo",
    "n-djamena-chad": "Chari",
}

PINNED_KM2 = {
    "Superior": 82090, "Michigan": 57445, "Nyanza": 67344, "Great Slave": 25945, "Erie": 25699,
    "Ontario": 19429, "Champlain": 1247, "IJsselmeer": 1962,
}

GEOJSON = "https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/{}.geojson"


def layer(name):
    """[(properties, geometry parts)] — parts are lines (Nx2 arrays) or polygons (lists of rings, outer first)."""
    path = os.path.join(NE, name + ".geojson")
    if not os.path.exists(path):
        os.makedirs(NE, exist_ok=True)
        print("downloading", name, flush=True)
        req = urllib.request.Request(GEOJSON.format(name), headers={"User-Agent": "guidetooutside.com build"})
        open(path, "wb").write(urllib.request.urlopen(req, timeout=300).read())
    out = []
    for f in json.load(open(path, encoding="utf-8"))["features"]:
        g = f["geometry"]
        if not g:
            continue
        t, c = g["type"], g["coordinates"]
        if t == "LineString":
            parts = [np.asarray(c, dtype=float)[:, :2]]
        elif t == "MultiLineString":
            parts = [np.asarray(x, dtype=float)[:, :2] for x in c if len(x) > 1]
        elif t == "Polygon":
            parts = [[np.asarray(r, dtype=float)[:, :2] for r in c]]
        elif t == "MultiPolygon":
            parts = [[np.asarray(r, dtype=float)[:, :2] for r in poly] for poly in c]
        else:
            continue
        out.append((f["properties"], parts))
    return out


# ---- helpers ------------------------------------------------------------------------


def ring_area_km2(ring):
    """Signed spherical area of a ring (km²)."""
    lon, lat = np.radians(ring[:, 0]), np.radians(ring[:, 1])
    lon2, lat2 = np.roll(lon, -1), np.roll(lat, -1)
    return float(np.sum((lon2 - lon) * (2 + np.sin(lat) + np.sin(lat2))) * 6371.0088**2 / 2)


def densify(ring, km=1.0):
    """Points along a line no more than about `km` apart."""
    out = [ring[:1]]
    for a, b in zip(ring[:-1], ring[1:]):
        d = math.hypot((b[0] - a[0]) * math.cos(math.radians((a[1] + b[1]) / 2)), b[1] - a[1]) * KM_PER_DEG
        n = max(1, int(d / km))
        t = np.linspace(0, 1, n + 1)[1:, None]
        out.append(a + (b - a) * t)
    return np.vstack(out)


def to_px(xy, scale=1):
    """Lon/lat to raster pixel coordinates (row 0 at LAT0, the south edge)."""
    return [((x - LON0) / STEP * scale, (y - LAT0) / STEP * scale) for x, y in xy]


def runs(row):
    out, end = [], -1
    nz = np.flatnonzero(row)
    i = 0
    while i < len(nz):
        start, v = nz[i], row[nz[i]]
        j = i
        while j + 1 < len(nz) and nz[j + 1] == nz[j] + 1 and row[nz[j + 1]] == v:
            j += 1
        out += [int(start - end - 1), int(nz[j] - start + 1), int(v)]
        end = nz[j]
        i = j + 1
    return out


# ---- coast --------------------------------------------------------------------------


def coast_layer():
    pts = []
    for _, parts in layer("ne_10m_coastline"):
        for line in parts:
            if line[:, 1].max() < LAT0 - 1 or line[:, 1].min() > LAT1 + 1 or line[:, 0].max() < LON0 - 1 or line[:, 0].min() > LON1 + 1:
                continue
            pts.append(densify(line))
    pts = np.vstack(pts)
    pts = pts[(pts[:, 1] > LAT0 - 1) & (pts[:, 1] < LAT1 + 1) & (pts[:, 0] > LON0 - 1) & (pts[:, 0] < LON1 + 1)]
    grid = np.zeros((ROWS, COLS), dtype=np.uint8)
    r0 = np.floor((pts[:, 1] - LAT0) / STEP).astype(int)
    c0 = np.floor((pts[:, 0] - LON0) / STEP).astype(int)
    coslat = np.cos(np.radians(pts[:, 1]))
    reach_r = int(math.ceil(NEAR_KM / (KM_PER_DEG * STEP))) + 1
    reach_c = int(math.ceil(NEAR_KM / (KM_PER_DEG * STEP * math.cos(math.radians(max(abs(LAT0), abs(LAT1))))))) + 1
    for dr in range(-reach_r, reach_r + 1):
        r = r0 + dr
        dy = (LAT0 + (r + 0.5) * STEP - pts[:, 1]) * KM_PER_DEG
        for dc in range(-reach_c, reach_c + 1):
            c = c0 + dc
            dx = (LON0 + (c + 0.5) * STEP - pts[:, 0]) * KM_PER_DEG * coslat
            d = np.hypot(dx, dy)
            ok = (d <= NEAR_KM) & (r >= 0) & (r < ROWS) & (c >= 0) & (c < COLS)
            np.maximum.at(grid, (r[ok], c[ok]), np.where(d[ok] <= ON_KM, 2, 1).astype(np.uint8))
    return grid


# ---- lakes --------------------------------------------------------------------------


def near_mask(pts, km, r_lo, r_hi, c_lo, c_hi):
    """Cells of the window [r_lo:r_hi, c_lo:c_hi] whose centre is within `km` of any of the points."""
    m = np.zeros((r_hi - r_lo, c_hi - c_lo), dtype=bool)
    if km <= 0 or not len(pts):
        return m
    r0 = np.floor((pts[:, 1] - LAT0) / STEP).astype(int)
    c0 = np.floor((pts[:, 0] - LON0) / STEP).astype(int)
    coslat = np.cos(np.radians(pts[:, 1]))
    reach_r = int(math.ceil(km / (KM_PER_DEG * STEP))) + 1
    reach_c = int(math.ceil(km / (KM_PER_DEG * STEP * max(0.1, float(coslat.min()))))) + 1
    for dr in range(-reach_r, reach_r + 1):
        r = r0 + dr
        dy = (LAT0 + (r + 0.5) * STEP - pts[:, 1]) * KM_PER_DEG
        for dc in range(-reach_c, reach_c + 1):
            c = c0 + dc
            dx = (LON0 + (c + 0.5) * STEP - pts[:, 0]) * KM_PER_DEG * coslat
            ok = (np.hypot(dx, dy) <= km) & (r >= r_lo) & (r < r_hi) & (c >= c_lo) & (c < c_hi)
            m[r[ok] - r_lo, c[ok] - c_lo] = True
    return m


def lake_layer():
    lakes = []
    for rec, parts in layer("ne_10m_lakes"):
        name = rec.get("name_en") or rec.get("name")
        if not name:
            continue
        km2 = sum(abs(ring_area_km2(poly[0])) - sum(abs(ring_area_km2(h)) for h in poly[1:]) for poly in parts)
        if name in PINNED_KM2:
            km2 = PINNED_KM2[name]
        if km2 < MIN_LAKE_KM2:
            continue
        lo, la = np.concatenate([poly[0][:, 0] for poly in parts]), np.concatenate([poly[0][:, 1] for poly in parts])
        if la.max() < LAT0 or la.min() > LAT1 or lo.max() < LON0 or lo.min() > LON1:
            continue
        kind = (rec.get("featurecla") or "Lake").lower()
        lakes.append({"name": name, "km2": int(round(km2)), "kind": kind, "parts": parts})
    lakes.sort(key=lambda l: -l["km2"])
    grid = np.zeros((ROWS, COLS), dtype=np.uint16)
    pad = int(math.ceil(LAKE_KM / (KM_PER_DEG * STEP * 0.1))) + 2
    # Smallest first, so the larger lake wins a shared cell.
    for i in range(len(lakes) - 1, -1, -1):
        parts = lakes[i]["parts"]
        img = Image.new("L", (COLS, ROWS), 0)
        dr = ImageDraw.Draw(img)
        for poly in parts:
            dr.polygon(to_px(poly[0]), fill=1, outline=None)
            for hole in poly[1:]:
                dr.polygon(to_px(hole), fill=0, outline=None)
        m = np.array(img, dtype=bool)
        if LAKE_KM > 0:
            outer = np.vstack([densify(poly[0]) for poly in parts])
            r_lo = max(0, int((outer[:, 1].min() - LAT0) / STEP) - pad)
            r_hi = min(ROWS, int((outer[:, 1].max() - LAT0) / STEP) + pad)
            c_lo = max(0, int((outer[:, 0].min() - LON0) / STEP) - pad)
            c_hi = min(COLS, int((outer[:, 0].max() - LON0) / STEP) + pad)
            m[r_lo:r_hi, c_lo:c_hi] |= near_mask(outer, LAKE_KM, r_lo, r_hi, c_lo, c_hi)
        grid[m] = i + 1
    return grid, [{"name": l["name"], "km2": l["km2"], "kind": l["kind"]} for l in lakes]


# ---- rivers -------------------------------------------------------------------------


def river_layer():
    names, index, items = [], {}, []
    for rec, parts in layer("ne_10m_rivers_lake_centerlines"):
        rank = rec.get("scalerank")
        if rank is None or rank > MAX_RIVER_RANK or rec.get("featurecla") not in RIVER_KINDS:
            continue
        name = rec.get("name_en") or rec.get("name")
        if not name or not parts:
            continue
        if name not in index:
            index[name] = len(names) + 1
            names.append({"name": name})
        items.append((rank, index[name], parts))
    grid = np.zeros((ROWS, COLS), dtype=np.uint16)
    # Minor rivers first, so the major river keeps a shared cell.
    # Where rivers share a cell, the one listed first in Natural Earth keeps it.
    order = sorted(items, key=lambda x: -x[0]) if RIVER_ORDER == "rank" else items if RIVER_ORDER == "last" else items[::-1]
    for rank, idx, parts in order:
        for line in parts:
            pts = densify(line, km=STEP * KM_PER_DEG / 4)
            pts = pts[(pts[:, 1] > LAT0) & (pts[:, 1] < LAT1) & (pts[:, 0] > LON0) & (pts[:, 0] < LON1)]
            if not len(pts):
                continue
            r = np.floor((pts[:, 1] - LAT0) / STEP).astype(int)
            c = np.floor((pts[:, 0] - LON0) / STEP).astype(int)
            grid[r, c] = idx
            if RIVER_KM > 0:
                pad = int(math.ceil(RIVER_KM / (KM_PER_DEG * STEP * 0.1))) + 2
                r_lo, r_hi = max(0, r.min() - pad), min(ROWS, r.max() + pad)
                c_lo, c_hi = max(0, c.min() - pad), min(COLS, c.max() + pad)
                m = near_mask(pts, RIVER_KM, r_lo, r_hi, c_lo, c_hi)
                grid[r_lo:r_hi, c_lo:c_hi][m] = idx
    return grid, names


def main():
    coast = coast_layer()
    print("coast done", flush=True)
    lake, lakes = lake_layer()
    print("lakes done", len(lakes), flush=True)
    river, rivers = river_layer()
    print("rivers done", len(rivers), flush=True)
    known = {p["slug"]: p for p in json.load(open(os.path.join(ROOT, "src", "lib", "known-places.json"), encoding="utf-8"))}
    index = {r["name"]: i + 1 for i, r in enumerate(rivers)}
    for slug, name in PINNED_TOWNS.items():
        p = known[slug]
        r, c = int(math.floor((p["lat"] - LAT0) / STEP)), int(math.floor((p["lon"] - LON0) / STEP))
        river[r, c] = index[name] if name else 0
    out = {
        "step": STEP, "lat0": LAT0, "lon0": LON0, "rows": ROWS, "cols": COLS,
        "coast": [runs(coast[r]) for r in range(ROWS)],
        "lake": [runs(lake[r]) for r in range(ROWS)],
        "river": [runs(river[r]) for r in range(ROWS)],
        "lakes": lakes, "rivers": rivers,
    }
    json.dump(out, open(OUT, "w"), ensure_ascii=False, separators=(",", ":"))
    print("wrote", OUT, os.path.getsize(OUT) // 1024, "KB")


if __name__ == "__main__":
    main()
