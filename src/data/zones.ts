/**
 * The ten hardiness-zone pages (/zones/2 … /zones/11) and the zone cards on
 * /zones.
 *
 * Extracted verbatim from the captured /zones/<n> pages: the title and
 * summary, the winter-low and frost cards, the "Places in Zone n" list (slug
 * and label as linked), and the gardening, fishing and foraging panels. The
 * "Extent" paragraph and the "Wild edibles in Zone n" cards are built by the
 * page (the latter: speciesInZone in src/lib/species.ts). The /zones index
 * shows `lowC`, `title`, `frostFree`, the number of places ("· n regions") and
 * the first five places.
 */

export type ZoneInfo = {
  zone: number;
  title: string;
  summary: string;
  /** "−29 to −23°C" */
  lowC: string;
  /** "−20 to −10°F" */
  lowF: string;
  /** "140–165" */
  frostFree: string;
  frostWindow: string;
  places: { slug: string; label: string }[];
  gardening: { intro: string; vegetables: string[]; fruit: string[]; perennials: string[]; notes: string[] };
  /** `species`: "Principal species" */
  fishing: { intro: string; species: string[] };
  foraging: { intro: string; species: string[] };
};

export const ZONES: ZoneInfo[] = [
 {
  "zone": 2,
  "title": "Subarctic and boreal: a season of eight to ten weeks under very long days.",
  "summary": "Zone 2 is boreal and subarctic country — the Yukon, the Northwest Territories, northern Manitoba, Alberta, Ontario and Quebec, and the coldest towns of the Canadian Shield. (Whitehorse, Yellowknife and Thompson officially sit in zone 1, colder still; this is the nearest guide.) Winters are long and severe, but the growing season, though only eight to ten weeks long, runs under 18–20 hours of daylight, and cool-season crops grow astonishingly fast. Permafrost, thin soils and late snowmelt matter as much as the calendar.",
  "lowC": "−45 to −40°C",
  "lowF": "−50 to −40°F",
  "frostFree": "60–90",
  "frostWindow": "Roughly early June to late August; frost is possible in any month.",
  "places": [
   {
    "slug": "fort-mcmurray-alberta",
    "label": "Fort McMurray, AB"
   },
   {
    "slug": "thompson-manitoba",
    "label": "Thompson, MB"
   },
   {
    "slug": "timmins-ontario",
    "label": "Timmins, ON"
   },
   {
    "slug": "val-d-or-quebec",
    "label": "Val-d'Or, QC"
   },
   {
    "slug": "whitehorse-yukon",
    "label": "Whitehorse, YT"
   },
   {
    "slug": "yellowknife-northwest-territories",
    "label": "Yellowknife, NT"
   }
  ],
  "gardening": {
   "intro": "Gardening here is about heat capture and speed: raised beds that warm early, dark mulch, cold frames and greenhouses, and varieties bred for the north. Almost everything warm-season is started indoors or grown under cover.",
   "vegetables": [
    "Potatoes (the northern staple)",
    "Cabbage, kale, kohlrabi and broccoli",
    "Turnips, rutabaga and radishes",
    "Peas and fava beans",
    "Lettuce, spinach and Asian greens",
    "Carrots in raised beds",
    "Greenhouse tomatoes and cucumbers"
   ],
   "fruit": [
    "Haskap (blue honeysuckle), the most reliable zone 2 fruit",
    "Saskatoon berry",
    "Currants and gooseberries",
    "Hardy raspberries (e.g. 'Boyne')",
    "Rhubarb",
    "Strawberries with winter mulch"
   ],
   "perennials": [
    "Siberian iris",
    "Peony",
    "Delphinium",
    "Bleeding heart",
    "Hardy roses of the Parkland and Explorer series",
    "Lilac"
   ],
   "notes": [
    "Start brassicas and lettuce indoors in April; transplant under row cover as soon as beds thaw.",
    "Use raised beds or hills — soil warms weeks earlier and drains snowmelt.",
    "Choose the earliest-maturing variety of anything you plant; days-to-maturity numbers assume warmer nights than you get.",
    "Protect against a frost on any night below 5°C; keep row cover within reach all summer."
   ]
  },
  "fishing": {
   "intro": "Some of the best freshwater fishing on the continent, in huge cold lakes and rivers. Open-water season is short but intense; ice fishing runs half the year. Lake trout, northern pike, Arctic grayling and walleye dominate; Arctic char and salmon in the right drainages.",
   "species": [
    "Lake trout",
    "Northern pike",
    "Arctic grayling",
    "Walleye",
    "Whitefish",
    "Arctic char (Arctic drainages)",
    "Chinook and chum salmon (Yukon River)"
   ]
  },
  "foraging": {
   "intro": "A compressed but rich season: berries carpet the tundra and burns in August, and the boreal forest gives up mushrooms, spruce tips and fireweed. Bears are a constant consideration.",
   "species": [
    "Blueberries and bog bilberries",
    "Cloudberries (bakeapples) in bogs",
    "Lingonberries and crowberries",
    "Wild cranberries",
    "Fireweed shoots and flowers",
    "Spruce tips (spring)",
    "Boletes and morels after burns",
    "Labrador tea"
   ]
  }
 },
 {
  "zone": 3,
  "title": "Northern prairie and boreal edge: cold winters, hot bright summers.",
  "summary": "Zone 3 covers Saskatoon and Regina, Winnipeg and Thunder Bay, the Saguenay, and the Minnesota–North Dakota border country up to Fairbanks. Winters are severe and dry; summers are genuinely warm with long days, which is why prairie gardens are so productive despite a season of barely three months. Wind and chinook thaws (in Alberta) are as hard on plants as the cold itself.",
  "lowC": "−40 to −34°C",
  "lowF": "−40 to −30°F",
  "frostFree": "90–115",
  "frostWindow": "Roughly late May to mid-September.",
  "places": [
   {
    "slug": "regina-saskatchewan",
    "label": "Regina, SK"
   },
   {
    "slug": "saguenay-quebec",
    "label": "Saguenay, QC"
   },
   {
    "slug": "saskatoon-saskatchewan",
    "label": "Saskatoon, SK"
   },
   {
    "slug": "thunder-bay-ontario",
    "label": "Thunder Bay, ON"
   },
   {
    "slug": "winnipeg-manitoba",
    "label": "Winnipeg, MB"
   },
   {
    "slug": "fairbanks-alaska",
    "label": "Fairbanks, AK"
   },
   {
    "slug": "international-falls-minnesota",
    "label": "International Falls, MN"
   }
  ],
  "gardening": {
   "intro": "Prairie gardening: fast-maturing vegetables, serious mulching, shelterbelts against wind, and tough fruit bred by the University of Saskatchewan and Morden. Tomatoes and squash succeed with transplants and a warm site.",
   "vegetables": [
    "Potatoes",
    "Peas and beans (bush)",
    "Carrots, beets and parsnips",
    "Cabbage, broccoli and cauliflower",
    "Onions from sets or transplants",
    "Lettuce, spinach and chard",
    "Short-season tomatoes ('Sub-Arctic', 'Manitoba')",
    "Zucchini and early winter squash from transplants"
   ],
   "fruit": [
    "Haskap",
    "Saskatoon berry",
    "Sour cherries ('Romance' series: 'Carmine Jewel', 'Romeo', 'Juliet')",
    "Hardy apples ('Norland', 'Goodland', 'Prairie Sensation')",
    "Raspberries",
    "Currants and gooseberries",
    "Rhubarb"
   ],
   "perennials": [
    "Peony",
    "Daylily",
    "Hosta (sheltered)",
    "Sedum",
    "Monarda",
    "Explorer and Parkland roses",
    "Lilac and dogwood shrubs"
   ],
   "notes": [
    "Direct-sow peas and spinach as soon as soil can be worked in late April; wait for the May long weekend for tender crops.",
    "Plant on the north side of a windbreak or fence; wind desiccation kills more evergreens than cold.",
    "Mulch perennials after freeze-up, not before, to prevent voles and heaving.",
    "Water trees and shrubs deeply in October before the ground freezes."
   ]
  },
  "fishing": {
   "intro": "Walleye country. The prairie and Shield lakes and rivers hold outstanding walleye, pike and perch, with lake trout in the deeper Shield lakes and trophy pike in shallow weedy bays. Ice fishing is a major season.",
   "species": [
    "Walleye",
    "Northern pike",
    "Yellow perch",
    "Lake trout",
    "Lake whitefish",
    "Goldeye (prairie rivers)",
    "Burbot through the ice",
    "Stocked rainbow trout in pothole lakes"
   ]
  },
  "foraging": {
   "intro": "Boreal and aspen-parkland foraging: saskatoons and chokecherries along coulees, morels after spring fires, and a strong fall mushroom season in the spruce.",
   "species": [
    "Saskatoon berries (July)",
    "Chokecherries and pin cherries",
    "Wild raspberries and strawberries",
    "Highbush and lowbush cranberries",
    "Morels in burned forest (spring)",
    "Boletes and chanterelles (August–September)",
    "Wild rose hips",
    "Stinging nettle and lamb's quarters"
   ]
  }
 },
 {
  "zone": 4,
  "title": "Cold winters with dependable snow cover; a season of about four months.",
  "summary": "Zone 4 runs through Edmonton and Calgary, Prince George, Sudbury, Fargo and Laramie, and across the Dakotas and the northern Rockies. Snow cover is usually dependable, which protects perennials, and summers are warm enough for a complete vegetable garden including tomatoes, corn and squash from transplants.",
  "lowC": "−34 to −29°C",
  "lowF": "−30 to −20°F",
  "frostFree": "110–140",
  "frostWindow": "Roughly mid-May to late September.",
  "places": [
   {
    "slug": "calgary-alberta",
    "label": "Calgary, AB"
   },
   {
    "slug": "edmonton-alberta",
    "label": "Edmonton, AB"
   },
   {
    "slug": "prince-george-british-columbia",
    "label": "Prince George, BC"
   },
   {
    "slug": "sudbury-ontario",
    "label": "Sudbury, ON"
   },
   {
    "slug": "fargo-north-dakota",
    "label": "Fargo, ND"
   },
   {
    "slug": "grand-forks-north-dakota",
    "label": "Grand Forks, ND"
   },
   {
    "slug": "laramie-wyoming",
    "label": "Laramie, WY"
   }
  ],
  "gardening": {
   "intro": "A satisfying zone: nearly everything grows if you respect the frost dates. Start warm-season crops indoors, pick mid-season rather than late varieties, and rely on snow and mulch to carry perennials through.",
   "vegetables": [
    "Tomatoes (early and mid-season)",
    "Peppers from strong transplants",
    "Sweet corn (early hybrids)",
    "Winter squash and pumpkins",
    "Beans, peas and cucumbers",
    "Garlic (fall-planted)",
    "All the brassicas and root crops",
    "Melons under plastic mulch in warm sites"
   ],
   "fruit": [
    "Apples (‘Honeycrisp’, ‘Haralson’, ‘Zestar!’)",
    "Plums (hybrid and hardy European types)",
    "Sour cherries",
    "Haskap and saskatoon",
    "Raspberries and blackberries (hardy types)",
    "Grapes (‘Valiant’, ‘Frontenac’, ‘Marquette’)",
    "Strawberries",
    "Blueberries in acidic soil"
   ],
   "perennials": [
    "Peony, iris and daylily",
    "Hosta and astilbe",
    "Coneflower and rudbeckia",
    "Hydrangea paniculata",
    "Lilac, ninebark and dogwood",
    "Hardy roses"
   ],
   "notes": [
    "Last frost is usually the third week of May but a late-May frost happens most years — keep covers ready until June.",
    "Plant garlic in early October and mulch after the ground freezes.",
    "Snow is your friend; avoid clearing it off beds and shrubs.",
    "Choose apples on hardy rootstock and protect trunks from rabbits and sunscald."
   ]
  },
  "fishing": {
   "intro": "Walleye, pike, lake trout and smallmouth bass in the Shield and prairie lakes; brook trout in the cold streams; trout and grayling in the Rockies. Winter ice fishing is as popular as summer.",
   "species": [
    "Walleye",
    "Northern pike",
    "Smallmouth bass",
    "Lake trout",
    "Brook trout",
    "Yellow perch and crappie",
    "Muskellunge (Ontario, Minnesota)",
    "Rainbow and cutthroat trout (foothills)"
   ]
  },
  "foraging": {
   "intro": "Classic northern foraging: a good spring for fiddleheads and morels, wild berries all summer, and a serious mushroom and nut season in fall.",
   "species": [
    "Fiddleheads (ostrich fern)",
    "Morels (May)",
    "Wild leeks/ramps (eastern part of the zone)",
    "Wild strawberries, raspberries and blueberries",
    "Chanterelles, boletes and lobster mushrooms",
    "Hazelnuts",
    "Highbush cranberries",
    "Wild plums and chokecherries"
   ]
  }
 },
 {
  "zone": 5,
  "title": "Much of southern Canada and the northern United States.",
  "summary": "Zone 5 includes Ottawa, Montréal, Québec City, Sherbrooke and the Maritimes, plus Vermont, New Hampshire, Minneapolis, Duluth, Madison, Des Moines and Bozeman. Winters are cold and snowy, summers hot and humid (or hot and dry on the plains), and the five-month season supports almost any temperate crop. It is the reference zone for most seed-catalogue advice.",
  "lowC": "−29 to −23°C",
  "lowF": "−20 to −10°F",
  "frostFree": "140–165",
  "frostWindow": "Roughly early-to-mid May to early-to-mid October.",
  "places": [
   {
    "slug": "charlottetown-prince-edward-island",
    "label": "Charlottetown, PE"
   },
   {
    "slug": "fredericton-new-brunswick",
    "label": "Fredericton, NB"
   },
   {
    "slug": "moncton-new-brunswick",
    "label": "Moncton, NB"
   },
   {
    "slug": "montreal-quebec",
    "label": "Montréal, QC"
   },
   {
    "slug": "ottawa-ontario",
    "label": "Ottawa, ON"
   },
   {
    "slug": "quebec-city-quebec",
    "label": "Québec City, QC"
   },
   {
    "slug": "saint-john-new-brunswick",
    "label": "Saint John, NB"
   },
   {
    "slug": "sherbrooke-quebec",
    "label": "Sherbrooke, QC"
   },
   {
    "slug": "bozeman-montana",
    "label": "Bozeman, MT"
   },
   {
    "slug": "burlington-vermont",
    "label": "Burlington, VT"
   },
   {
    "slug": "concord-new-hampshire",
    "label": "Concord, NH"
   },
   {
    "slug": "des-moines-iowa",
    "label": "Des Moines, IA"
   },
   {
    "slug": "duluth-minnesota",
    "label": "Duluth, MN"
   },
   {
    "slug": "madison-wisconsin",
    "label": "Madison, WI"
   },
   {
    "slug": "minneapolis-minnesota",
    "label": "Minneapolis, MN"
   }
  ],
  "gardening": {
   "intro": "Everything from asparagus to zucchini. The limiting factors are usually spring soil temperature, midsummer humidity (disease) and, on the plains, water. Fall gardening is under-used and rewarding here.",
   "vegetables": [
    "Tomatoes of every type",
    "Peppers and eggplant",
    "Sweet corn",
    "Cucumbers, melons and squash",
    "Beans, peas and edamame",
    "Garlic and onions",
    "Brassicas, roots and greens spring and fall",
    "Sweet potatoes in warm sites"
   ],
   "fruit": [
    "Apples and pears",
    "Plums and sour cherries",
    "Peaches in sheltered sites",
    "Grapes (hybrid and some vinifera)",
    "Raspberries, blackberries and blueberries",
    "Strawberries",
    "Kiwi (hardy Actinidia arguta)",
    "Hazelnuts"
   ],
   "perennials": [
    "Peony, iris, daylily, hosta",
    "Coneflower, phlox and salvia",
    "Hydrangea (paniculata and arborescens)",
    "Roses (most shrub types)",
    "Lavender in well-drained soil",
    "Japanese maple in sheltered spots"
   ],
   "notes": [
    "Direct-sow cool crops in mid-April; transplant tomatoes around the Victoria Day / Memorial Day weekend.",
    "Sow a second round of carrots, beets, kale and lettuce in late July for a fall harvest that outlasts the first frost.",
    "Plant garlic mid-October; harvest early-to-mid July.",
    "Mulch heavily in summer to hold moisture and suppress disease splash."
   ]
  },
  "fishing": {
   "intro": "Great variety: bass and walleye in the big lakes and rivers, pike and musky in the weeds, trout in the cold streams and Great Lakes tributaries, and Atlantic salmon and striped bass in the Maritime rivers.",
   "species": [
    "Smallmouth and largemouth bass",
    "Walleye",
    "Northern pike and muskellunge",
    "Brook, brown and rainbow trout",
    "Lake trout and landlocked salmon",
    "Yellow perch, crappie and sunfish",
    "Steelhead and salmon (Great Lakes tributaries)",
    "Striped bass and Atlantic salmon (Maritimes)"
   ]
  },
  "foraging": {
   "intro": "The richest foraging in the north: ramps and fiddleheads in spring, a big berry summer, then apples, nuts and the full fall mushroom flush in the hardwood forests.",
   "species": [
    "Ramps / wild leeks",
    "Fiddleheads",
    "Morels",
    "Wild strawberries, raspberries, blackberries and blueberries",
    "Elderflowers and elderberries",
    "Chanterelles, hen of the woods, chicken of the woods, giant puffballs",
    "Wild apples, black walnuts and hickory nuts (butternut is Endangered in Ontario and federally in Canada: leave it alone)",
    "Staghorn sumac and rose hips"
   ]
  }
 },
 {
  "zone": 6,
  "title": "Great Lakes and Northeast: a season long enough for most crops.",
  "summary": "Zone 6 wraps the southern Great Lakes — Kingston, London, Buffalo, Chicago, Detroit, Milwaukee — and reaches to Halifax, Portland (Maine), Albany, Columbus, Omaha, Kansas City and Denver’s Front Range. Lake moderation delays both spring and fall frost near the water. The season is long enough for late tomatoes, sweet potatoes, peaches and a proper fall garden.",
  "lowC": "−23 to −18°C",
  "lowF": "−10 to 0°F",
  "frostFree": "160–190",
  "frostWindow": "Roughly late April to late October.",
  "places": [
   {
    "slug": "halifax-nova-scotia",
    "label": "Halifax, NS"
   },
   {
    "slug": "kingston-ontario",
    "label": "Kingston, ON"
   },
   {
    "slug": "london-ontario",
    "label": "London, ON"
   },
   {
    "slug": "albany-new-york",
    "label": "Albany, NY"
   },
   {
    "slug": "buffalo-new-york",
    "label": "Buffalo, NY"
   },
   {
    "slug": "chicago-illinois",
    "label": "Chicago, IL"
   },
   {
    "slug": "columbus-ohio",
    "label": "Columbus, OH"
   },
   {
    "slug": "denver-colorado",
    "label": "Denver, CO"
   },
   {
    "slug": "detroit-michigan",
    "label": "Detroit, MI"
   },
   {
    "slug": "grand-rapids-michigan",
    "label": "Grand Rapids, MI"
   },
   {
    "slug": "indianapolis-indiana",
    "label": "Indianapolis, IN"
   },
   {
    "slug": "kansas-city-missouri",
    "label": "Kansas City, MO"
   },
   {
    "slug": "milwaukee-wisconsin",
    "label": "Milwaukee, WI"
   },
   {
    "slug": "omaha-nebraska",
    "label": "Omaha, NE"
   },
   {
    "slug": "portland-maine",
    "label": "Portland, ME"
   }
  ],
  "gardening": {
   "intro": "A generous zone where heat-loving crops ripen fully and many borderline perennials survive with mulch. Near the lakes, spring arrives late but fall lingers — plan for a long harvest tail.",
   "vegetables": [
    "Long-season tomatoes and paste types",
    "Peppers, eggplant and okra",
    "Sweet potatoes and melons",
    "Sweet corn (successions)",
    "Winter squash and pumpkins",
    "Garlic, leeks and onions",
    "Spring and fall brassicas, roots and greens",
    "Overwintered spinach and kale under cover"
   ],
   "fruit": [
    "Peaches, nectarines and apricots",
    "Apples, pears and Asian pears",
    "Sweet and sour cherries",
    "Grapes including many vinifera",
    "Figs in protected sites (‘Chicago Hardy’)",
    "Blueberries, raspberries and blackberries",
    "Pawpaw and persimmon (American)",
    "Hardy kiwi"
   ],
   "perennials": [
    "Hydrangea macrophylla (with protection)",
    "Roses of all kinds",
    "Lavender, rosemary (marginal)",
    "Japanese maple",
    "Boxwood and yew",
    "Crape myrtle (hardy cultivars, marginal)"
   ],
   "notes": [
    "Near the Great Lakes, wait for soil to warm — a mid-May tomato transplant usually catches an early-May one.",
    "Use fall to your advantage: sow kale, spinach, carrots and turnips through August; they hold into December.",
    "Plant garlic late October to early November.",
    "Peaches want a sloped, frost-draining site; avoid low pockets."
   ]
  },
  "fishing": {
   "intro": "Great Lakes fishing at its best — salmon and steelhead runs, trophy smallmouth, walleye and perch — plus bass, catfish and crappie in the inland lakes and reservoirs, and striped bass and mackerel off the Atlantic coast.",
   "species": [
    "Smallmouth and largemouth bass",
    "Walleye and yellow perch (Lake Erie)",
    "Chinook and coho salmon, steelhead and brown trout (Great Lakes)",
    "Muskellunge and northern pike",
    "Channel and flathead catfish",
    "Crappie and bluegill",
    "Striped bass, bluefish and mackerel (New England coast)",
    "Carp (increasingly popular on the fly)"
   ]
  },
  "foraging": {
   "intro": "Rich deciduous forests give a long foraging calendar: ramps and morels in April, berries and elderflower in summer, then pawpaws, nuts and one of the best fall mushroom seasons anywhere.",
   "species": [
    "Ramps and morels (April–May)",
    "Fiddleheads",
    "Mulberries and serviceberries",
    "Black raspberries and wineberries",
    "Pawpaws (September)",
    "Black walnuts, hickory nuts, hazelnuts",
    "Chicken of the woods, hen of the woods, lion's mane, oyster mushrooms",
    "Autumn olive and wild grapes"
   ]
  }
 },
 {
  "zone": 7,
  "title": "Mid-Atlantic, Upper South and the sheltered corners of Canada.",
  "summary": "Zone 7 covers the Northeast’s cities (Boston, New York City, Philadelphia, Pittsburgh, Cleveland) down to Richmond and Washington, the Upper South (Nashville, Asheville, St. Louis, Oklahoma City), the high Southwest (Albuquerque) and the intermountain West (Boise, Spokane), plus Canada’s warmest pockets — Hamilton, Toronto’s lakeshore, Windsor, the Niagara fruit belt and the Okanagan. Winters are short with occasional hard freezes; summers are hot and, east of the plains, humid.",
  "lowC": "−18 to −12°C",
  "lowF": "0 to 10°F",
  "frostFree": "180–220",
  "frostWindow": "Roughly mid-April to early November.",
  "places": [
   {
    "slug": "hamilton-ontario",
    "label": "Hamilton, ON"
   },
   {
    "slug": "kelowna-british-columbia",
    "label": "Kelowna, BC"
   },
   {
    "slug": "niagara-on-the-lake-ontario",
    "label": "Niagara-on-the-Lake, ON"
   },
   {
    "slug": "toronto-ontario",
    "label": "Toronto, ON"
   },
   {
    "slug": "windsor-ontario",
    "label": "Windsor, ON"
   },
   {
    "slug": "albuquerque-new-mexico",
    "label": "Albuquerque, NM"
   },
   {
    "slug": "asheville-north-carolina",
    "label": "Asheville, NC"
   },
   {
    "slug": "boise-idaho",
    "label": "Boise, ID"
   },
   {
    "slug": "boston-massachusetts",
    "label": "Boston, MA"
   },
   {
    "slug": "cleveland-ohio",
    "label": "Cleveland, OH"
   },
   {
    "slug": "nashville-tennessee",
    "label": "Nashville, TN"
   },
   {
    "slug": "new-york-new-york",
    "label": "New York, NY"
   },
   {
    "slug": "oklahoma-city-oklahoma",
    "label": "Oklahoma City, OK"
   },
   {
    "slug": "philadelphia-pennsylvania",
    "label": "Philadelphia, PA"
   },
   {
    "slug": "pittsburgh-pennsylvania",
    "label": "Pittsburgh, PA"
   },
   {
    "slug": "richmond-virginia",
    "label": "Richmond, VA"
   },
   {
    "slug": "spokane-washington",
    "label": "Spokane, WA"
   },
   {
    "slug": "st-louis-missouri",
    "label": "St. Louis, MO"
   },
   {
    "slug": "washington-district-of-columbia",
    "label": "Washington, DC"
   }
  ],
  "gardening": {
   "intro": "Two full seasons: a spring garden, a heat-loving summer garden and a fall garden that runs to Thanksgiving, with hardy greens overwintering outdoors. Heat and humidity, not cold, are the main challenges in the east; drought in the west.",
   "vegetables": [
    "Tomatoes, peppers and eggplant (heat-tolerant varieties for July–August)",
    "Okra, sweet potatoes and southern peas",
    "Melons and watermelons",
    "Spring and fall broccoli, cabbage and cauliflower",
    "Overwintering kale, collards, spinach and garlic",
    "Beans, cucumbers and squash in succession",
    "Fall carrots, beets and turnips",
    "Lettuce spring and fall (bolts in summer)"
   ],
   "fruit": [
    "Peaches, nectarines and plums",
    "Figs (outdoors, unprotected in most sites)",
    "Apples and pears (low-chill not needed)",
    "Grapes including vinifera (Niagara, Okanagan, Virginia)",
    "Blueberries and blackberries",
    "Persimmons (American and hardy Asian)",
    "Pomegranate and pawpaw (marginal/regional)",
    "Muscadines in the southern part"
   ],
   "perennials": [
    "Crape myrtle",
    "Camellia (sasanqua and hardy japonica)",
    "Rosemary and lavender outdoors",
    "Southern magnolia",
    "Hydrangea macrophylla",
    "Gardenia (hardy cultivars, marginal)"
   ],
   "notes": [
    "Plant tomatoes in mid-April; set out a second planting in early July to carry through fall.",
    "In the humid east, prioritise disease-resistant varieties and drip irrigation.",
    "Sow fall brassicas in late July/August — fall is the best season for them here.",
    "Garlic goes in late October–November; plant hardy greens in September for winter picking."
   ]
  },
  "fishing": {
   "intro": "Warm-water fishing year-round: largemouth bass, crappie, catfish and stripers in the big reservoirs and rivers, smallmouth in the Appalachian and Ozark streams, trout in the mountains and tailwaters, and striped bass, bluefish and flounder along the Atlantic coast.",
   "species": [
    "Largemouth and smallmouth bass",
    "Striped bass and hybrid stripers (reservoirs and coast)",
    "Crappie and bluegill",
    "Channel, blue and flathead catfish",
    "Trout in tailwaters and mountain streams",
    "Walleye and sauger (Missouri, Tennessee rivers)",
    "Bluefish, flounder and weakfish (Mid-Atlantic coast)",
    "Steelhead and salmon (Idaho, Washington rivers)"
   ]
  },
  "foraging": {
   "intro": "Long seasons on both ends: ramps and morels in March–April, a summer of berries and mulberries, then pawpaws, persimmons, nuts and mushrooms deep into November. The Southwest adds piñon nuts and prickly pear.",
   "species": [
    "Morels and ramps (early spring)",
    "Mulberries, wineberries and blackberries",
    "Pawpaws and persimmons (fall)",
    "Black walnuts, hickories, chestnuts (Chinese) and pecans",
    "Chanterelles (summer), hen of the woods and lion's mane (fall)",
    "Wild grapes and muscadines",
    "Piñon nuts and prickly pear (Southwest)",
    "Chickweed, dandelion and wild onion through winter"
   ]
  }
 },
 {
  "zone": 8,
  "title": "Two very different zone 8s: the mild Pacific Northwest and the hot South.",
  "summary": "Zone 8 is the Deep South and Southern Plains — Baltimore and the Carolinas down to Atlanta, Memphis, Little Rock and Dallas — and, out west, the valleys just inland from the Pacific coast and Victoria, BC. Both share light winters, but the Northwest has cool, dry summers and wet winters while the South has long, hot, humid summers — so what thrives differs a great deal.",
  "lowC": "−12 to −7°C",
  "lowF": "10 to 20°F",
  "frostFree": "210–260",
  "frostWindow": "Roughly late March to mid-November (later spring, longer fall on the coast).",
  "places": [
   {
    "slug": "victoria-british-columbia",
    "label": "Victoria, BC"
   },
   {
    "slug": "atlanta-georgia",
    "label": "Atlanta, GA"
   },
   {
    "slug": "baltimore-maryland",
    "label": "Baltimore, MD"
   },
   {
    "slug": "charlotte-north-carolina",
    "label": "Charlotte, NC"
   },
   {
    "slug": "dallas-texas",
    "label": "Dallas, TX"
   },
   {
    "slug": "little-rock-arkansas",
    "label": "Little Rock, AR"
   },
   {
    "slug": "memphis-tennessee",
    "label": "Memphis, TN"
   },
   {
    "slug": "raleigh-north-carolina",
    "label": "Raleigh, NC"
   }
  ],
  "gardening": {
   "intro": "In the Northwest: superb cool-season and berry gardening, winter vegetables outdoors, and tomatoes that need a warm wall. In the South: a hot summer garden bracketed by two cool-season gardens, with winter greens grown outdoors and heat stopping lettuce and peas by May.",
   "vegetables": [
    "Year-round kale, chard, leeks and brassicas (Northwest)",
    "Winter greens, collards, carrots and onions outdoors (South)",
    "Tomatoes, peppers and eggplant (heat lovers thrive in the South; choose early types in the Northwest)",
    "Okra, sweet potatoes, southern peas and melons (South)",
    "Peas, fava beans and overwintered garlic",
    "Artichokes as perennials",
    "Potatoes and salad greens spring and fall",
    "Cucumbers and summer squash in succession"
   ],
   "fruit": [
    "Blueberries, raspberries and blackberries (Northwest standouts)",
    "Figs, persimmons and pomegranates",
    "Peaches and plums (South); apples, pears and Asian pears (Northwest)",
    "Table and wine grapes; muscadines (South)",
    "Citrus in protected sites (satsuma, kumquat in the South)",
    "Kiwi and hardy kiwi",
    "Loquat (South)",
    "Strawberries as perennials"
   ],
   "perennials": [
    "Camellia, rhododendron and azalea",
    "Rosemary, lavender and bay as shrubs",
    "Crape myrtle and gardenia (South)",
    "Hardy fuchsia and hebe (Northwest)",
    "Palms (windmill palm; sabal in the South)",
    "Hydrangea macrophylla (blooms reliably)"
   ],
   "notes": [
    "Northwest: plant tomatoes in late May against a south wall; grow winter vegetables sown in July–August.",
    "South: plant tomatoes mid-March and again in late July; grow lettuce and peas in fall and winter, not summer.",
    "Garlic in October–November; harvest in June.",
    "Watch chill hours when choosing fruit trees — southern varieties need fewer, coastal varieties more."
   ]
  },
  "fishing": {
   "intro": "Pacific salmon, steelhead and sea-run cutthroat in the Northwest rivers, plus halibut, lingcod and rockfish in the salt; in the South, largemouth bass, crappie and catfish in the reservoirs, redfish and speckled trout on the coasts, and year-round open-water fishing almost everywhere.",
   "species": [
    "Chinook, coho and pink salmon; steelhead (Northwest)",
    "Sea-run cutthroat, rainbow trout and kokanee",
    "Halibut, lingcod and rockfish (BC and Washington coast)",
    "Largemouth bass (Southern reservoirs)",
    "Crappie, bream and catfish",
    "Striped and hybrid striped bass",
    "Redfish, speckled trout and flounder (Southern coasts)",
    "White bass and sand bass runs (Texas)"
   ]
  },
  "foraging": {
   "intro": "The Northwest is arguably the best mushroom foraging on the continent — chanterelles, king boletes and matsutake in fall, morels in spring — with salmonberries, huckleberries and seaweed on the coast. The South offers pecans, muscadines, persimmons, chanterelles and a mild winter for greens.",
   "species": [
    "Pacific golden chanterelles, king boletes, matsutake, hedgehogs (Northwest fall)",
    "Morels, especially after fires (Northwest spring)",
    "Salmonberries, thimbleberries, huckleberries and salal",
    "Nettles, miner's lettuce and fiddleheads",
    "Seaweeds and shellfish (check closures and licences)",
    "Pecans, black walnuts and hickories (South)",
    "Muscadines, persimmons and mayhaws (South)",
    "Chanterelles in summer oak-pine woods (South)"
   ]
  }
 },
 {
  "zone": 9,
  "title": "Nearly frost-free: the main growing season shifts to winter.",
  "summary": "Zone 9 covers the Gulf Coast from Houston to Jacksonville, central Texas, the deserts of Tucson and Las Vegas, California’s Central Valley and Bay Area, and the mild Pacific coast from Portland and Seattle up to Vancouver and Nanaimo. Frost is light and occasional; summer heat (and in the desert, drought) is the season to work around. The most productive months are often October through May.",
  "lowC": "−7 to −1°C",
  "lowF": "20 to 30°F",
  "frostFree": "260–330",
  "frostWindow": "Occasional light frost December–February; many years have none.",
  "places": [
   {
    "slug": "nanaimo-british-columbia",
    "label": "Nanaimo, BC"
   },
   {
    "slug": "vancouver-british-columbia",
    "label": "Vancouver, BC"
   },
   {
    "slug": "austin-texas",
    "label": "Austin, TX"
   },
   {
    "slug": "houston-texas",
    "label": "Houston, TX"
   },
   {
    "slug": "jacksonville-florida",
    "label": "Jacksonville, FL"
   },
   {
    "slug": "las-vegas-nevada",
    "label": "Las Vegas, NV"
   },
   {
    "slug": "new-orleans-louisiana",
    "label": "New Orleans, LA"
   },
   {
    "slug": "portland-oregon",
    "label": "Portland, OR"
   },
   {
    "slug": "sacramento-california",
    "label": "Sacramento, CA"
   },
   {
    "slug": "san-antonio-texas",
    "label": "San Antonio, TX"
   },
   {
    "slug": "san-jose-california",
    "label": "San Jose, CA"
   },
   {
    "slug": "savannah-georgia",
    "label": "Savannah, GA"
   },
   {
    "slug": "seattle-washington",
    "label": "Seattle, WA"
   },
   {
    "slug": "tucson-arizona",
    "label": "Tucson, AZ"
   }
  ],
  "gardening": {
   "intro": "Two seasons: a long, mild ‘cool’ season for everything a northern gardener grows in summer, and a hot season for the true heat lovers. Shade cloth, mulch and irrigation matter more than frost protection.",
   "vegetables": [
    "Tomatoes in early spring and again in fall (skip peak summer in Texas and the desert)",
    "Peppers, eggplant, okra, sweet potatoes, southern peas and Malabar spinach in summer",
    "Lettuce, spinach, brassicas, carrots, beets and peas from October to April",
    "Onions and garlic planted in fall",
    "Melons and watermelons",
    "Beans spring and fall",
    "Cucumbers and squash spring and fall",
    "Herbs year-round; basil in summer, cilantro in winter"
   ],
   "fruit": [
    "Citrus: satsuma, Meyer lemon, orange, grapefruit, kumquat (protect on the coldest nights)",
    "Figs, pomegranates and persimmons",
    "Peaches and plums (low-chill varieties)",
    "Loquat and jujube",
    "Blueberries (rabbiteye and southern highbush)",
    "Muscadines and table grapes",
    "Avocado (California, sheltered Gulf sites)",
    "Olives (California, Texas)"
   ],
   "perennials": [
    "Bougainvillea and lantana",
    "Rosemary, sage and lavender as shrubs",
    "Agave, yucca and prickly pear (Southwest)",
    "Citrus and olive as ornamentals",
    "Plumbago and salvia",
    "Palms and cycads"
   ],
   "notes": [
    "Plant tomatoes in February–March for a May–June harvest; a second crop set out in August ripens in November.",
    "Grow your salad garden in winter; summer is for okra, peppers and sweet potatoes.",
    "Desert: shade cloth from June to September and deep, infrequent watering.",
    "Cover citrus and young fruit trees on the few freezing nights; a string of incandescent lights under a sheet works."
   ]
  },
  "fishing": {
   "intro": "Year-round fishing: largemouth bass (including Florida-strain giants), crappie and catfish inland; redfish, speckled trout, flounder and tarpon on the Gulf; stripers and salmon in California; and cold-season trout in the desert tailwaters. The British Columbia coast adds salmon, halibut and lingcod.",
   "species": [
    "Largemouth bass (trophy fisheries in Texas, Florida, California)",
    "Crappie, bluegill and catfish",
    "Redfish, speckled trout and flounder (Gulf Coast)",
    "Tarpon, snook and sheepshead (Florida)",
    "Striped bass (California Delta, Texas reservoirs)",
    "Rainbow trout in tailwaters and winter stockings",
    "Chinook salmon and halibut (British Columbia coast)",
    "Tilapia and peacock bass (southern Florida canals)"
   ]
  },
  "foraging": {
   "intro": "Foraging runs on a different clock: winter and spring greens, wild citrus and loquats, prickly pear fruit and mesquite pods in the desert, pecans and persimmons in fall, and a mild winter for chanterelles and oyster mushrooms after rain.",
   "species": [
    "Prickly pear fruit (tunas) and pads (nopales)",
    "Mesquite pods, palo verde beans and cholla buds (Southwest)",
    "Pecans, black walnuts and acorns",
    "Loquats, feral citrus and figs",
    "Dewberries, mayhaws and mustang grapes (Texas, Gulf)",
    "Chanterelles and oyster mushrooms after autumn and winter rains",
    "Miner's lettuce, chickweed and wild mustard in winter",
    "Seaweed, clams and oysters (BC and California coasts, with licence)"
   ]
  }
 },
 {
  "zone": 10,
  "title": "Subtropical: mild winters, and summer heat that limits many crops.",
  "summary": "Zone 10 is the Florida peninsula from Orlando and Tampa to Fort Myers, coastal Southern California from Santa Barbara to Los Angeles, the southern tip of Texas, and Phoenix, the hottest of the desert cities. Frost is rare. Florida’s year is shaped by the hot wet summer; California’s by the dry summer and mild wet winter. Tropical fruit becomes practical, and the traditional vegetable garden runs from October to May.",
  "lowC": "−1 to 4°C",
  "lowF": "30 to 40°F",
  "frostFree": "330–365",
  "frostWindow": "Rare; a light frost every few years inland.",
  "places": [
   {
    "slug": "brownsville-texas",
    "label": "Brownsville, TX"
   },
   {
    "slug": "fort-myers-florida",
    "label": "Fort Myers, FL"
   },
   {
    "slug": "los-angeles-california",
    "label": "Los Angeles, CA"
   },
   {
    "slug": "orlando-florida",
    "label": "Orlando, FL"
   },
   {
    "slug": "phoenix-arizona",
    "label": "Phoenix, AZ"
   },
   {
    "slug": "santa-barbara-california",
    "label": "Santa Barbara, CA"
   },
   {
    "slug": "tampa-florida",
    "label": "Tampa, FL"
   }
  ],
  "gardening": {
   "intro": "Grow vegetables in the cool season, tropical fruit year-round, and treat summer as a time for heat-proof crops, cover crops and soil building (in Florida) or careful irrigation (in California). Chill hours are too low for most temperate fruit.",
   "vegetables": [
    "Tomatoes, peppers and eggplant planted September–February",
    "Lettuce, brassicas, carrots, beets and peas October–March",
    "Okra, sweet potatoes, southern peas, yard-long beans and roselle in summer",
    "Chayote, cassava, taro and Seminole pumpkin (Florida)",
    "Herbs: basil year-round, cilantro in winter",
    "Beans and cucumbers in fall and spring",
    "Sweet corn in spring",
    "Tropical spinach substitutes (Malabar, Okinawa, longevity spinach)"
   ],
   "fruit": [
    "Mango, avocado and lychee (Florida; avocado in California)",
    "Banana and papaya",
    "Citrus of every kind",
    "Guava, passionfruit and dragon fruit",
    "Starfruit, jackfruit and sapodilla (South Florida)",
    "Figs, pomegranates and low-chill peaches",
    "Macadamia and cherimoya (California)",
    "Pineapple in containers"
   ],
   "perennials": [
    "Bougainvillea, hibiscus and plumeria",
    "Bird of paradise",
    "Palms of all kinds",
    "Succulents and aloes (California)",
    "Ixora and croton (Florida)",
    "Rosemary and lavender (California)"
   ],
   "notes": [
    "Reverse the northern calendar: your main planting date is October.",
    "Florida: build soil constantly (mulch, compost, cover crops) and plant nematode-resistant varieties.",
    "California: irrigate deeply and mulch; plant most things in fall so winter rains establish them.",
    "Fruit trees need protection from wind more than cold; stake and prune for hurricanes/Santa Anas."
   ]
  },
  "fishing": {
   "intro": "Saltwater dominates: snook, tarpon, redfish and permit on the Florida flats, sailfish and mahi offshore, and largemouth bass and peacock bass in the lakes and canals. In California, halibut, calico bass, yellowtail and surf perch, plus trout in the mountains. Everything fishes year-round.",
   "species": [
    "Snook, tarpon and redfish (Florida inshore)",
    "Largemouth bass (Lake Okeechobee) and peacock bass (canals)",
    "Permit, bonefish and sea trout (Keys and flats)",
    "Mahi, sailfish, kingfish and grouper offshore",
    "Halibut, calico bass and white seabass (California)",
    "Yellowtail and surf perch",
    "Speckled trout and redfish (South Texas bays)",
    "Bluegill and crappie in freshwater"
   ]
  },
  "foraging": {
   "intro": "Fruit falls from trees in the suburbs, and the wild offers sea grapes, cocoplum, prickly pear, seaweed and mushrooms after rains. Identification and land rules matter; many public lands prohibit harvesting.",
   "species": [
    "Sea grapes and cocoplum (Florida coast)",
    "Feral mango, avocado, citrus and loquat (with permission)",
    "Prickly pear fruit and pads",
    "Saw palmetto berries and hearts of palm (only from felled trees)",
    "Chanterelles and oyster mushrooms after summer rains (Florida)",
    "Miner's lettuce, wild fennel, mustard and nasturtium (California)",
    "Acorns and walnuts (California)",
    "Seaweed, mussels and clams (California, licence required; check red-tide closures)"
   ]
  }
 },
 {
  "zone": 11,
  "title": "Tropical: no frost; the seasons are wet and dry.",
  "summary": "Zone 11 is the southern tip of Florida — Miami, Fort Lauderdale, the Everglades fringe and the Keys — the coast of San Diego, and the lowlands of Hawaiʻi. It has never frozen in living memory in most of it. The year is not warm and cold but wet and dry: a long humid summer of afternoon storms, and a dry, breezy winter that is the gardening season. Hurricane season (June to November) is the weather that actually matters.",
  "lowC": "4 to 10°C",
  "lowF": "40 to 50°F",
  "frostFree": "365",
  "frostWindow": "None. Record lows sit a few degrees above freezing.",
  "places": [
   {
    "slug": "fort-lauderdale-florida",
    "label": "Fort Lauderdale, FL"
   },
   {
    "slug": "miami-florida",
    "label": "Miami, FL"
   },
   {
    "slug": "san-diego-california",
    "label": "San Diego, CA"
   }
  ],
  "gardening": {
   "intro": "The northern calendar is turned upside down: vegetables go in from October to February, and summer is for tropical fruit, heat-loving perennials and soil-building. Rock and sand soils need endless organic matter, nematodes are a constant, and nearly all temperate fruit fails for want of winter chill.",
   "vegetables": [
    "Tomatoes, peppers and eggplant planted October–January",
    "Lettuce, arugula, kale, broccoli, carrots and beets November–February",
    "Beans, cucumbers and squash in fall and late winter",
    "Okra, sweet potatoes, southern peas, Seminole pumpkin and yard-long beans through the summer",
    "Cassava, taro, malanga, boniato and chaya",
    "Tropical greens: Malabar, Okinawa and longevity spinach, katuk",
    "Herbs: basil, lemongrass, culantro and Cuban oregano year-round; cilantro and dill in winter",
    "Pineapple, ginger and turmeric in beds and containers"
   ],
   "fruit": [
    "Mango, avocado and lychee",
    "Banana, papaya and plantain",
    "Citrus, where greening disease allows",
    "Jackfruit, sapodilla, mamey and sugar apple",
    "Guava, passionfruit, dragon fruit and starfruit",
    "Coconut and breadfruit (the Keys and Hawaiʻi)",
    "Carambola, longan and jaboticaba",
    "Surinam cherry and Barbados cherry (acerola)"
   ],
   "perennials": [
    "Plumeria, hibiscus and bougainvillea",
    "Heliconia, ginger and bird of paradise",
    "Palms, cycads and bromeliads",
    "Orchids grown outdoors on trees",
    "Crotons, ixora and firebush for the butterflies",
    "Native wild coffee, cocoplum and sea grape as hedges"
   ],
   "notes": [
    "Your main planting date is October; by May the vegetable garden is mostly done.",
    "Build soil constantly — compost, mulch and summer cover crops — because sand and limestone hold almost nothing.",
    "Plant nematode-resistant varieties and solarize beds under clear plastic in the summer heat.",
    "Stake and prune fruit trees for wind, keep them small enough to cover or harvest before a storm, and plan for hurricane season from June.",
    "Water deeply in the dry winter; most of the year's rain falls June to October."
   ]
  },
  "fishing": {
   "intro": "Some of the best inshore fishing anywhere: snook, tarpon, redfish and sea trout in the bays and mangroves; bonefish and permit on the flats of Biscayne Bay and the Keys; sailfish, mahi, kingfish and grouper a few kilometres offshore. The canals and lakes hold largemouth bass and introduced peacock bass that fish all year.",
   "species": [
    "Snook, tarpon and redfish (bays and mangrove shorelines)",
    "Bonefish, permit and barracuda (the flats)",
    "Spotted sea trout and snapper (grass flats and bridges)",
    "Peacock bass and largemouth bass (canals and lakes)",
    "Mahi, sailfish, kingfish and wahoo offshore",
    "Grouper and snapper on the reefs (seasons and limits are strict)",
    "Mangrove snapper and sheepshead from docks and bridges",
    "In Hawaiʻi: papio and ulua (jacks), oʻio (bonefish) and shore-cast moi"
   ]
  },
  "foraging": {
   "intro": "Fruit drops from suburban trees most of the year, and the coast gives sea grapes, cocoplum and coconuts. The wild is mostly protected — the Everglades, the state parks and the national wildlife refuges prohibit harvesting — so ask, pick from what is offered, and learn the manchineel tree before you touch any beach fruit.",
   "species": [
    "Sea grapes (August–October) and cocoplum on the coast",
    "Coconuts from the ground on public beaches, where allowed",
    "Feral mango, avocado, starfruit, loquat and citrus, with the owner's permission",
    "Surinam cherry and Barbados cherry hedges",
    "Saw palmetto berries in late summer (a traditional medicine crop; the plant is protected on public land)",
    "Chanterelles, oyster mushrooms and ringless honey mushrooms after the summer rains",
    "Purslane, Spanish needle (bidens) greens and pepper grass in vacant lots",
    "Hawaiʻi: guava, strawberry guava, passionfruit (liliko'i) and mountain apple on trails where picking is allowed"
   ]
  }
 }
];

export const getZone = (n: number) => ZONES.find((z) => z.zone === n);
