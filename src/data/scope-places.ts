/**
 * Where a region's prose holds: named waters, mountain ranges and areas, for
 * src/lib/place-scope.ts.
 *
 * The audit of 10 November 2026 (Acadian Forest, Northeast Coast and
 * Southeastern regions) found region text printed under every town's name as
 * if it were the town's own: the Bay of Fundy at Charlottetown, Halifax,
 * Portland and Fredericton; the Chesapeake and Long Island Sound at Boston,
 * Philadelphia, Richmond and Washington; barrier islands, swamps, longleaf and
 * the gopher tortoise at Atlanta, Charlotte and Raleigh. The only switches then
 * were the Great Lakes shore (src/lib/great-lakes.ts) and the leaf-on season.
 * This file holds the rest of the geography the prose needs, each entry with
 * its source; nothing here is printed.
 *
 * NEAR: a water or range drawn as points (towns and landmarks on its shore or
 * crest, at their usual coordinates; not a published outline) with a reach in km. A town "is near" when its
 * centre is within the reach of the nearest point. The reach is a working rule,
 * like NEAR_GREAT_LAKE_KM: short enough that the feature is the town's own.
 *
 * FALL_LINE: the Atlantic Seaboard fall line, the edge between the Piedmont and
 * the Atlantic Coastal Plain, through the cities Wikipedia names as lying on it
 * (https://en.wikipedia.org/wiki/Atlantic_Seaboard_fall_line, read 11 Nov 2026:
 * New Brunswick NJ, Trenton, Philadelphia, Wilmington, Havre de Grace,
 * Baltimore, Washington, Fredericksburg, Richmond, Petersburg, Goldsboro,
 * Smithfield, Fayetteville, Columbia, Augusta, Macon, Columbus GA, Wetumpka,
 * Tuscaloosa; Goldsboro is left out here because it lies east of Smithfield
 * and would fold the line back on itself). South-east of it is the coastal
 * plain; its northern limit is New Brunswick, so nothing is said north of there.
 *
 * BOXES: areas as latitude/longitude boxes, coarse by design and used only for
 * the region text named in each comment.
 */

export type LatLon = [number, number];

export type NearId =
  | "bay-of-fundy"
  | "chesapeake-bay"
  | "long-island-sound"
  | "gulf-coast-belt"
  | "everglades"
  | "salish-sea"
  | "great-smoky-mountains"
  | "southern-blue-ridge"
  | "lake-victoria"
  | "nile-valley"
  | "redwood-belt"
  | "central-florida-lakes"
  | "desert-reservoirs";

export const NEAR: Record<NearId, { name: string; km: number; pts: LatLon[]; source: string }> = {
  // The Bay of Fundy and its arms: Passamaquoddy Bay, the Saint John shore, Annapolis Basin, Minas Basin and Cobequid
  // Bay, Chignecto Bay, Shepody Bay and the Petitcodiac estuary, whose Fundy tides reach Moncton as the tidal bore
  // (https://www.moncton.ca/en/things-do/tidal-bore; src/lib/water-setting.ts TIDAL_REACHES). Fredericton, 85 km up
  // the Saint John River, Halifax (57 km from the Avon estuary at Windsor), Charlottetown and Portland are outside.
  "bay-of-fundy": {
    name: "the Bay of Fundy",
    km: 15,
    source: "landmark coordinates; the Petitcodiac's Fundy tide: https://www.moncton.ca/en/things-do/tidal-bore",
    pts: [
      [45.07, -67.05], [45.06, -66.46], [45.25, -66.07], [45.36, -65.53], [45.6, -64.95], [45.59, -64.78], [45.82, -64.57],
      [45.85, -64.58], [45.95, -64.65], [46.08, -64.78], [45.69, -64.45], [45.82, -64.27], [45.33, -64.95], [45.33, -64.78],
      [45.4, -64.33], [45.33, -64.5], [45.1, -64.33], [44.99, -64.14], [45.32, -63.5], [45.36, -63.33], [45.05, -65.06],
      [44.74, -65.52], [44.65, -65.76],
    ],
  },
  // The Chesapeake's shores from the Susquehanna mouth to the Virginia capes, with the Patapsco's mouth at North Point.
  // Baltimore's harbour is the Patapsco estuary, 20 km above it (water-setting TIDAL_REACHES); Washington (46 km from
  // Chesapeake Beach) and Richmond stand on tidal rivers far up from the bay.
  "chesapeake-bay": {
    name: "the Chesapeake",
    km: 25,
    source: "landmark coordinates; the Patapsco estuary: https://en.wikipedia.org/wiki/Patapsco_River",
    pts: [
      [39.54, -76.08], [39.29, -76.27], [39.2, -76.44], [39.14, -76.24], [39.01, -76.4], [38.97, -76.48], [38.97, -76.33],
      [38.71, -76.34], [38.69, -76.53], [38.39, -76.38], [38.3, -76.25], [38.04, -76.32], [38.0, -76.03], [37.83, -76.0],
      [37.62, -76.28], [37.3, -76.27], [37.27, -76.02], [37.0, -76.31], [36.93, -76.01],
    ],
  },
  // Long Island Sound from Throgs Neck, where the East River opens into it at the Bronx and Queens, to Orient Point
  // and New London. New York City borders it; Boston is 150 km from its eastern end.
  "long-island-sound": {
    name: "Long Island Sound",
    km: 25,
    source: "landmark coordinates",
    pts: [
      [40.8, -73.79], [40.86, -73.72], [40.89, -73.77], [40.89, -73.53], [41.03, -73.54], [41.07, -73.41], [40.91, -73.36],
      [41.16, -73.18], [40.96, -73.07], [41.25, -72.91], [41.26, -72.68], [41.0, -72.55], [41.27, -72.35], [41.16, -72.24],
      [41.31, -72.09],
    ],
  },
  // The Gulf of Mexico's shore from the Rio Grande to Cape Sable. The Gulf Coast region's bayou, marsh and Gulf
  // stories hold within this belt (a working rule: Houston is 73 km from the Gulf at Galveston, New Orleans about
  // 80 km from Grand Isle); Little Rock and Memphis, 500 km inland, are in the region for its bottomland forest.
  "gulf-coast-belt": {
    name: "the Gulf of Mexico",
    km: 100,
    source: "landmark coordinates",
    pts: [
      [26.07, -97.16], [27.8, -97.4], [28.69, -95.97], [29.3, -94.8], [29.73, -93.87], [29.8, -93.33], [29.55, -91.85],
      [29.24, -90.0], [29.15, -89.25], [30.39, -88.89], [30.23, -88.03], [30.33, -87.17], [30.15, -85.66], [29.72, -84.98],
      [29.14, -83.03], [27.6, -82.75], [26.14, -81.8], [25.12, -81.09],
    ],
  },
  // The Everglades' eastern edge and interior: Loxahatchee, Water Conservation Area 3, Shark Valley on the Tamiami
  // Trail, Taylor Slough and Flamingo (Everglades National Park). Miami and Fort Lauderdale are about 35 km from it;
  // Fort Myers (120 km), Tampa and Orlando are not.
  everglades: {
    name: "the Everglades",
    km: 40,
    source: "landmark coordinates (Everglades National Park and the water conservation areas)",
    pts: [[26.35, -80.4], [26.15, -80.5], [26.0, -80.75], [25.76, -80.55], [25.76, -80.77], [25.38, -80.61], [25.14, -80.92]],
  },
  // The Salish Sea: the Strait of Georgia, Puget Sound and the Strait of Juan de Fuca's inner part. Vancouver,
  // Nanaimo, Victoria and Seattle stand on it; Portland, Oregon, is on the Willamette, 240 km south.
  "salish-sea": {
    name: "the Salish Sea",
    km: 15,
    source: "landmark coordinates",
    pts: [
      [47.05, -122.9], [47.27, -122.45], [47.6, -122.35], [47.98, -122.22], [48.12, -122.76], [48.12, -123.43], [48.42, -123.37],
      [48.75, -122.5], [49.29, -123.1], [49.17, -123.93], [50.02, -125.24],
    ],
  },
  // The Great Smoky Mountains: Gregory Bald, Clingmans Dome, Mount LeConte and Mount Sterling (Great Smoky Mountains
  // National Park). Asheville is about 50 km from Mount Sterling; Pittsburgh is 600 km away.
  "great-smoky-mountains": {
    name: "the Great Smoky Mountains",
    km: 60,
    source: "summit coordinates (Great Smoky Mountains National Park)",
    pts: [[35.52, -83.86], [35.56, -83.5], [35.65, -83.44], [35.7, -83.1]],
  },
  // The high Southern Blue Ridge from Mount Rogers to Brasstown Bald: Mount Rogers, Grandfather Mountain, Roan Mountain,
  // Mount Mitchell, Mount Pisgah, Richland Balsam, Clingmans Dome, Mount LeConte, Standing Indian and Brasstown Bald.
  // The Appalachian region's day stories and landscape items about coves and ridges, laurel hells, spruce-fir peaks and
  // windward rain were written for these mountains; the audit of 11 November 2026 found them printed at Pittsburgh, on
  // the Western Allegheny Plateau 400 km to the north. Asheville is about 26 km from Mount Pisgah.
  "southern-blue-ridge": {
    name: "the Southern Blue Ridge",
    km: 40,
    source: "summit coordinates",
    pts: [
      [36.66, -81.54], [36.1, -81.81], [36.1, -82.12], [35.76, -82.27], [35.42, -82.75], [35.37, -82.99], [35.56, -83.5],
      [35.65, -83.44], [35.04, -83.53], [34.87, -83.81],
    ],
  },
  // Lake Victoria's shore: Kisumu on the Winam Gulf, Jinja, Kampala's Port Bell, Entebbe, Bukoba, Mwanza and Musoma.
  "lake-victoria": {
    name: "Lake Victoria",
    km: 25,
    source: "landmark coordinates",
    pts: [[-0.1, 34.75], [0.43, 33.2], [0.29, 32.65], [0.06, 32.46], [-1.33, 31.81], [-2.52, 32.9], [-1.5, 33.8]],
  },
  // The irrigated Nile valley and delta from the Khartoum confluence to Rosetta and Damietta, with Kafr el-Dawwar on
  // the western delta behind Alexandria.
  "nile-valley": {
    name: "the Nile valley and delta",
    km: 30,
    source: "landmark coordinates",
    pts: [
      [15.61, 32.53], [24.09, 32.9], [25.69, 32.64], [27.18, 31.18], [28.1, 30.75], [30.04, 31.24], [30.79, 31.0], [31.04, 31.38],
      [31.03, 30.47], [31.13, 30.13], [31.4, 30.42], [31.42, 31.81],
    ],
  },
  // The coast redwood's natural range: "an irregular coastal strip about 724 km (450 mi) long and generally 8 to 56 km
  // (5 to 35 mi) wide", from "two groves on the Chetco River in the extreme southwest corner of Oregon" to "Salmon
  // Creek Canyon in the Santa Lucia Mountains of southern Monterey County", and "limited to areas where heavy summer
  // fogs from the ocean provide a humid atmosphere" (Silvics of North America, Sequoia sempervirens,
  // https://research.fs.usda.gov/silvics/redwood, read 13 Nov 2026). Drawn through redwood parks along the strip:
  // Loeb (Chetco River), Jedediah Smith, Prairie Creek, Humboldt Redwoods, Montgomery Woods, Hendy Woods, Armstrong,
  // Muir Woods, Redwood Regional Park, Purisima Creek, Portola, Big Basin, Sanborn (on the Santa Cruz Mountains' east
  // slope above Saratoga), Henry Cowell, Pfeiffer Big Sur and Salmon Creek. Audit of 13 November 2026: the redwoods
  // "sit exactly in" the fog belt was printed at Los Angeles, Santa Barbara, San Diego and Sacramento. San Jose is
  // about 19 km from Sanborn; Sacramento is about 100 km from the nearest, Redwood Regional Park.
  "redwood-belt": {
    name: "the redwood belt",
    km: 25,
    source: "park coordinates; the range: https://research.fs.usda.gov/silvics/redwood",
    pts: [
      [42.11, -124.19], [41.79, -124.09], [41.36, -124.02], [40.35, -123.92], [39.23, -123.4], [39.07, -123.47], [38.54, -123.01],
      [37.9, -122.58], [37.81, -122.16], [37.43, -122.37], [37.25, -122.22], [37.17, -122.22], [37.23, -122.06], [37.04, -122.06],
      [36.25, -121.78], [35.81, -121.36],
    ],
  },
  // Central Florida's lake district: "An estimated 7,800 lakes in Florida are greater than 1 acre in surface area. Of
  // these, 35 percent are located in just four counties: Lake, Orange, Osceola, and Polk" (USGS Circular 1137,
  // https://pubs.usgs.gov/publication/cir1137, read 13 Nov 2026). Drawn through the four counties' towns: Leesburg,
  // Tavares and Clermont (Lake), Orlando and Winter Park (Orange), Kissimmee and St. Cloud (Osceola), Lakeland, Winter
  // Haven, Bartow and Lake Wales (Polk). Audit of 13 November 2026: "thousands of lakes" was printed at Miami, Fort
  // Lauderdale and Fort Myers. Orlando is in Orange County; Tampa is 50 km from Lakeland.
  "central-florida-lakes": {
    name: "central Florida's lake district",
    km: 25,
    source: "town coordinates; the counties: https://pubs.usgs.gov/publication/cir1137",
    pts: [
      [28.81, -81.88], [28.8, -81.73], [28.55, -81.77], [28.54, -81.38], [28.6, -81.34], [28.29, -81.41], [28.25, -81.28],
      [28.04, -81.95], [28.02, -81.73], [27.9, -81.84], [27.9, -81.59],
    ],
  },
  // The big reservoirs of the dry West and the tailwaters below their dams: Hoover Dam and Las Vegas Bay (Lake Mead),
  // Davis Dam (Lake Mohave, Hoover's tailwater), Parker Dam (Lake Havasu), Glen Canyon Dam (Lake Powell), Roosevelt Dam
  // and Stewart Mountain Dam (the Salt River's Roosevelt and Saguaro lakes), New Waddell Dam (Lake Pleasant), Elephant
  // Butte Dam (the Rio Grande), and Lucky Peak and Arrowrock dams (the Boise River). The deserts landscape's "a few big
  // reservoirs and tailwaters" holds within this reach (a working rule: Las Vegas is 26 km from Las Vegas Bay, Phoenix
  // 48 km from Lake Pleasant, Boise 15 km from Lucky Peak). Audit of 13 November 2026: it was printed at Tucson, 160 km
  // from Roosevelt Dam; Albuquerque is 220 km from Elephant Butte.
  "desert-reservoirs": {
    name: "the big desert reservoirs",
    km: 50,
    source: "dam coordinates",
    pts: [
      [36.02, -114.74], [36.12, -114.86], [35.2, -114.57], [34.3, -114.14], [36.94, -111.48], [33.67, -111.16], [33.57, -111.54],
      [33.85, -112.27], [33.16, -107.19], [43.53, -116.06], [43.6, -115.92],
    ],
  },
};

/** The fall line, north-east to south-west (see the header). */
export const FALL_LINE: LatLon[] = [
  [40.49, -74.45], // New Brunswick, NJ
  [40.22, -74.76], // Trenton
  [39.95, -75.16], // Philadelphia
  [39.74, -75.55], // Wilmington
  [39.55, -76.09], // Havre de Grace
  [39.29, -76.61], // Baltimore
  [38.9, -77.04], // Washington
  [38.3, -77.46], // Fredericksburg
  [37.54, -77.44], // Richmond
  [37.23, -77.4], // Petersburg
  [35.51, -78.34], // Smithfield, NC
  [35.05, -78.88], // Fayetteville
  [34.0, -81.03], // Columbia, SC
  [33.47, -81.97], // Augusta, GA
  [32.84, -83.63], // Macon
  [32.46, -84.99], // Columbus, GA
  [32.54, -86.21], // Wetumpka, AL
  [33.21, -87.57], // Tuscaloosa
];
/** Towns within this distance of the fall line stand where the Piedmont meets the coastal plain (Philadelphia to Richmond). */
export const FALL_LINE_KM = 25;

export type Box = { minLat: number; maxLat: number; minLon: number; maxLon: number };

export type BoxId =
  | "microtidal-seas"
  | "saguaro-range"
  | "hot-deserts"
  | "gopher-tortoise-states"
  | "water-tupelo-west"
  | "bald-cypress-west"
  | "coastal-prairie"
  | "madrean-sky-islands"
  | "north-american-monsoon"
  | "snake-river-plain"
  | "valley-oak-range"
  | "central-valley"
  | "florida-northern-half"
  | "rockland-hammock"
  | "florida-atlantic-coast";

export const BOXES: Record<BoxId, { boxes: Box[]; source: string }> = {
  // Seas whose tides are a few tens of centimetres: the Mediterranean (two boxes, so the Bay of Biscay at Bilbao and
  // the Atlantic coasts of Portugal and Andalusia stay outside), the Black Sea, and the Baltic with the Kattegat and the
  // Oslofjord. A coast here is not "tidal" (the Mediterranean landscape's "almost tideless sea").
  "microtidal-seas": {
    source: "coarse boxes around the seas named",
    boxes: [
      { minLat: 30, maxLat: 42.5, minLon: -5.6, maxLon: 3.5 },
      { minLat: 30, maxLat: 46.5, minLon: 3.5, maxLon: 42 },
      { minLat: 53.8, maxLat: 60.8, minLon: 9.8, maxLon: 30.5 },
      { minLat: 60.8, maxLat: 66.5, minLon: 16.5, maxLon: 26 },
    ],
  },
  // NPS: the saguaro "only grows in the Sonoran Desert", "ranging mostly from central Arizona down into Sonora"
  // (https://www.nps.gov/sagu/learn/nature/saguaro.htm, read 11 Nov 2026). Phoenix and Tucson; not Las Vegas (Mojave).
  "saguaro-range": { source: "https://www.nps.gov/sagu/learn/nature/saguaro.htm", boxes: [{ minLat: 26, maxLat: 34.9, minLon: -114.9, maxLon: -110.4 }] },
  // Creosotebush, the plant of the hot deserts: "throughout the Mojave, Sonoran, and Chihuahuan deserts", north only
  // into southern Nevada and Utah's south-west corner (USDA FEIS, read 11 Nov 2026). Las Vegas, Phoenix and Tucson;
  // not Boise (Great Basin sagebrush), Albuquerque (above the Chihuahuan Desert's northern tip), or Los Angeles and San
  // Diego (west of the mountains that bound the Mojave and Colorado deserts).
  "hot-deserts": {
    source: "https://www.fs.usda.gov/database/feis/plants/shrub/lartri/all.html",
    boxes: [
      { minLat: 33.6, maxLat: 37.3, minLon: -118, maxLon: -110 },
      { minLat: 26, maxLat: 33.6, minLon: -116.3, maxLon: -110 },
      { minLat: 25, maxLat: 34.6, minLon: -110, maxLon: -101.5 },
    ],
  },
  // The gopher tortoise lives in the longleaf pine savannas of Louisiana, Mississippi, Alabama, Florida, Georgia and
  // South Carolina (NRCS, read 11 Nov 2026), on the coastal plain: not North Carolina, and in South Carolina only the
  // south. The box keeps it south of 33.8° N; place-scope also requires the coastal plain.
  "gopher-tortoise-states": {
    source: "https://www.nrcs.usda.gov/programs-initiatives/working-lands-for-wildlife/gopher-tortoise",
    boxes: [{ minLat: 24.5, maxLat: 33.8, minLon: -94.1, maxLon: -79 }],
  },
  // Water tupelo, the tupelo of the cypress-tupelo swamps, grows west along the Gulf only to south-eastern Texas, and
  // north up the Mississippi valley to southern Illinois (Silvics of North America, Nyssa aquatica, read 11 Nov 2026).
  // Used for the Gulf Coast region's landscape: Houston, New Orleans, Little Rock and Memphis, not Brownsville.
  "water-tupelo-west": { source: "https://www.srs.fs.usda.gov/pubs/misc/ag_654/volume_2/nyssa/aquatica.htm", boxes: [{ minLat: 28.5, maxLat: 37.2, minLon: -96, maxLon: -87.5 }] },
  // Bald cypress, west of the Appalachians: along the Gulf coastal plain "west to Central Texas and southeastern
  // Oklahoma", and "inland up the Mississippi River to southernmost Illinois and Indiana" (Wikipedia, Taxodium
  // distichum, citing Koeser et al. 2017, Trees: South Florida and the Keys, pp. 296-7; read 11 Nov 2026). The source
  // names no stand on the lower Rio Grande, so the box stops north of Brownsville. Used for the Gulf Coast region's
  // cypress stories (audit of 11 November 2026: cypress knees and cypress tops at Brownsville): Houston, New Orleans,
  // Little Rock and Memphis.
  "bald-cypress-west": {
    source: "https://en.wikipedia.org/wiki/Bald_cypress",
    boxes: [
      { minLat: 28, maxLat: 31.5, minLon: -99.5, maxLon: -84 },
      { minLat: 31.5, maxLat: 37.5, minLon: -95.5, maxLon: -88 },
    ],
  },
  // The coastal prairie lies "along the coastal plain of southwestern Louisiana and southcentral Texas", the southern
  // tip of the tallgrass prairie; about 100 ha are left in Louisiana and about 100,000 ha in Texas (USGS Fact Sheet
  // FS-019-00, https://pubs.usgs.gov/publication/fs01900, read 11 Nov 2026). The Gulf Coast landscape's "prairie
  // remnants" hold here: Houston, not New Orleans (south-eastern Louisiana), Memphis, Little Rock or Brownsville (audit
  // of 11 November 2026).
  "coastal-prairie": { source: "https://pubs.usgs.gov/publication/fs01900", boxes: [{ minLat: 27.5, maxLat: 30.8, minLon: -98, maxLon: -91.8 }] },
  // The Madrean sky islands: "a complex of small mountain ranges in southern and southeastern Arizona, southwestern New
  // Mexico, and northwestern Mexico", north to where the region "merges into the higher elevation eastern Mogollon Rim"
  // and the White Mountains; the Santa Catalina and Santa Rita Mountains stand by Tucson; "surrounded at lower elevations
  // by the arid Sonoran and Chihuahuan deserts" and isolated from one another and from the Sierra Madre Occidental since
  // the ice ages (Wikipedia, Madrean Sky Islands, https://en.wikipedia.org/wiki/Madrean_Sky_Islands, read 13 Nov 2026).
  // West to the Baboquivari Mountains (111.6° W) and north to 33.3° N, below the Rim. Audit of 13 November 2026: the sky
  // islands were printed at Boise, Albuquerque, Phoenix and Las Vegas; Tucson only.
  "madrean-sky-islands": { source: "https://en.wikipedia.org/wiki/Madrean_Sky_Islands", boxes: [{ minLat: 29.5, maxLat: 33.3, minLon: -111.8, maxLon: -107.5 }] },
  // The North American monsoon: "Most of New Mexico, along with Arizona, receive 40-60% of their annual precipitation
  // totals during the monsoon season", reaching "even the Mojave Desert of southeastern California and extreme southern
  // Nevada" (NWS El Paso, https://www.weather.gov/epz/monsoon_background, read 13 Nov 2026). Two boxes: Arizona and New
  // Mexico, and the Mojave of south-eastern California with Nevada's southern tip (south of 35.8° N). Audit of 13
  // November 2026: a "summer monsoon cell" and monsoon towers were printed at Boise. Albuquerque, Phoenix and Tucson; not
  // Boise, and not Las Vegas, 140 km north of the tip (the safe side).
  "north-american-monsoon": {
    source: "https://www.weather.gov/epz/monsoon_background",
    boxes: [
      { minLat: 31.3, maxLat: 37, minLon: -114.8, maxLon: -103 },
      { minLat: 33.9, maxLat: 35.8, minLon: -116.8, maxLon: -114.6 },
    ],
  },
  // The Snake River Plain: "Potential natural vegetation is mostly sagebrush steppe"; it "follows the Snake River across
  // Idaho, stretching roughly 400 miles (640 km) from the Wyoming border to Eastern Oregon" and "includes lowland areas
  // from Boise to Vale" (Wikipedia, Snake River Plain (ecoregion), EPA Level III,
  // https://en.wikipedia.org/wiki/Snake_River_Plain_(ecoregion), read 13 Nov 2026). Audit of 13 November 2026:
  // "sagebrush steppe" was printed at Albuquerque (EPA 22m Albuquerque Basin: sand scrub and desert grassland). Boise.
  "snake-river-plain": { source: "https://en.wikipedia.org/wiki/Snake_River_Plain_(ecoregion)", boxes: [{ minLat: 42.3, maxLat: 44.4, minLon: -117.4, maxLon: -111 }] },
  // Valley oak "is distributed from Shasta County south through the Central Valley and lower-elevation foothills and
  // valleys of the Sierra Nevada and Coast Ranges to Los Angeles County" (USDA FEIS, Quercus lobata,
  // https://www.fs.usda.gov/database/feis/plants/tree/quelob/all.html, read 13 Nov 2026). Two boxes: Shasta County to the
  // Tehachapis, and the south coast to Los Angeles County's southern edge (33.7° N) and eastern edge (117.65° W). Audit
  // of 13 November 2026: "valley oak woodlands" was printed at San Diego. Sacramento, San Jose, Santa Barbara and Los
  // Angeles.
  "valley-oak-range": {
    source: "https://www.fs.usda.gov/database/feis/plants/tree/quelob/all.html",
    boxes: [
      { minLat: 36, maxLat: 41.3, minLon: -124, maxLon: -119 },
      { minLat: 33.7, maxLat: 36, minLon: -121.6, maxLon: -117.65 },
    ],
  },
  // The Central Valley floor, from Red Bluff to Bakersfield, drawn round its towns (Chico, Woodland, Davis, Sacramento,
  // Lodi, Stockton, Tracy, Modesto, Merced, Los Banos, Fresno, Visalia, Delano, Bakersfield); the Coast Ranges' valleys
  // (Napa, San Jose, Gilroy, Hollister) are outside. Coast live oak grows "along the Coast, Transverse, Peninsular, and
  // Sierra de Juarez ranges", with only "Limited inland populations ... along watercourses in the Central Valley" (USDA
  // FEIS, Quercus agrifolia, https://www.fs.usda.gov/database/feis/plants/tree/queagr/all.html, read 13 Nov 2026), and
  // the chaparral is on the hills round the valley, not its floor. Audit of 13 November 2026: coast live oak woodlands,
  // chaparral hills, dew on the chaparral and its fire-opened seed banks were printed at Sacramento, about 40 km from
  // the Sierra foothills. Sacramento.
  "central-valley": {
    source: "valley-floor town coordinates; coast live oak: https://www.fs.usda.gov/database/feis/plants/tree/queagr/all.html",
    boxes: [
      { minLat: 38.25, maxLat: 39.4, minLon: -121.95, maxLon: -121 },
      { minLat: 39.4, maxLat: 40.75, minLon: -122.35, maxLon: -121.6 },
      { minLat: 37.3, maxLat: 38.25, minLon: -121.5, maxLon: -120.3 },
      { minLat: 36, maxLat: 37.3, minLon: -120.9, maxLon: -119.2 },
      { minLat: 35, maxLat: 36, minLon: -119.9, maxLon: -118.85 },
    ],
  },
  // "Most of Florida's springs are located in the northern half of the state" (USGS Fact Sheet FS-151-95, Springs of
  // Florida, https://pubs.usgs.gov/fs/1995/0151/report.pdf, read 13 Nov 2026): Florida north of 27.75° N, half way up
  // from Key West (24.5°) to the Georgia line (31°). Used only for the Florida landscape's "spring-fed rivers" (audit of
  // 13 November 2026: printed at Miami, Fort Lauderdale and Fort Myers). Orlando and Tampa.
  "florida-northern-half": { source: "https://pubs.usgs.gov/fs/1995/0151/report.pdf", boxes: [{ minLat: 27.75, maxLat: 31, minLon: -87.7, maxLon: -80 }] },
  // Rockland hammock, Florida's tropical hardwood forest on limestone: on the Miami Rock Ridge "from around downtown
  // Miami southwest to Mahogany Hammock in Everglades National Park", throughout the Keys, and "to a very limited extent"
  // in the Big Cypress (FNAI, Rockland Hammock, https://www.fnai.org/PDFs/NC/Rockland_Hammock_Final_2010.pdf, read 13 Nov
  // 2026). The ridge and the Keys, north to downtown Miami; the Big Cypress's few stands are left out (the safe side).
  // Audit of 13 November 2026: "These hammocks are Caribbean forest" was printed at Orlando, Tampa and Fort Myers. Miami.
  "rockland-hammock": { source: "https://www.fnai.org/PDFs/NC/Rockland_Hammock_Final_2010.pdf", boxes: [{ minLat: 24.4, maxLat: 25.79, minLon: -81.9, maxLon: -80.1 }] },
  // Florida's Atlantic shore from Biscayne Bay to the St. Marys River, in three boxes (Miami to Vero Beach; Melbourne to
  // Daytona Beach; St. Augustine to Fernandina Beach); the Gulf shore (Naples, Fort Myers, Tampa Bay) and the interior
  // (Orlando, Okeechobee) are outside. Used with the open coast (water-setting `coast` "on") for the Florida story's sea
  // turtles "on the Atlantic beaches" (audit of 13 November 2026: printed at Tampa). Miami and Fort Lauderdale.
  "florida-atlantic-coast": {
    source: "coarse boxes along the shore",
    boxes: [
      { minLat: 24.9, maxLat: 27.6, minLon: -80.75, maxLon: -79.8 },
      { minLat: 27.6, maxLat: 29.5, minLon: -81.2, maxLon: -80.2 },
      { minLat: 29.5, maxLat: 30.75, minLon: -81.7, maxLon: -81 },
    ],
  },
};
