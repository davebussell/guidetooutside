/**
 * Every source the Homesteading section draws on, by id. The topic pages list
 * the ones they used ("Checked against these sources") and cite them in their
 * JSON-LD; src/data/homestead/SOURCES.md records what was taken from each.
 * All were read in October 2026.
 */
export type HomesteadSource = { title: string; publisher: string; url: string; year?: string };

export const HOMESTEAD_REVIEWED = "2026-10-12";

export const SOURCES = {
  vtLaying: {
    title: "Why Have My Hens Stopped Laying? 5 Factors that Impact Egg Production",
    publisher: "Virginia Cooperative Extension (Jacobs and Clauer)",
    url: "https://pubs.ext.vt.edu/2902/2902-1097.html",
    year: "2022",
  },
  azLighting: {
    title: "Lighting Schedules for Arizona Backyard Laying Flocks",
    publisher: "University of Arizona Cooperative Extension (Wright)",
    url: "https://extension.arizona.edu/publication/lighting-schedules-arizona-backyard-laying-flocks",
    year: "2026",
  },
  osuCoop: {
    title: "Living on the land: Backyard chicken coop design (EC 1644)",
    publisher: "Oregon State University Extension Service",
    url: "https://extension.oregonstate.edu/sites/default/files/catalog/auto/EC1644.pdf",
    year: "2014, reviewed 2023",
  },
  omafraHeat: {
    title: "Heat stress in commercial layers",
    publisher: "Ontario Ministry of Agriculture, Food and Agribusiness",
    url: "https://www.ontario.ca/page/heat-stress-commercial-layers",
    year: "2020, updated 2026",
  },
  okstateWater: {
    title: "Water management key to helping chickens beat the heat",
    publisher: "Oklahoma State University Extension",
    url: "https://news.okstate.edu/articles/agriculture/2020/stotts_water-hot-chickens.html",
    year: "2020",
  },
  azHeat: {
    title: "Managing Backyard Chickens During Periods of Extreme Summer Temperature",
    publisher: "Small and Backyard Poultry, Cooperative Extension (Wright, University of Arizona)",
    url: "https://poultry.extension.org/articles/poultry-management/managing-backyard-chickens-during-extreme-summer-temperatures/",
  },
  umdWinter: {
    title: "Winter Weather and Small Flocks",
    publisher: "University of Maryland Extension",
    url: "https://extension.umd.edu/resource/winter-weather-and-small-flocks",
    year: "2022",
  },
  cdcPoultry: {
    title: "Backyard Poultry",
    publisher: "US Centers for Disease Control and Prevention",
    url: "https://www.cdc.gov/healthy-pets/about/backyard-poultry.html",
    year: "2025",
  },
  lcChantecler: {
    title: "Chantecler Chicken",
    publisher: "The Livestock Conservancy",
    url: "https://livestockconservancy.org/heritage-breeds/heritage-breeds-list/chantecler-chicken/",
  },
  lcWyandotte: {
    title: "Wyandotte Chicken",
    publisher: "The Livestock Conservancy",
    url: "https://livestockconservancy.org/heritage-breeds/heritage-breeds-list/wyandotte-chicken/",
  },
  lcPlymouthRock: {
    title: "Plymouth Rock Chicken",
    publisher: "The Livestock Conservancy",
    url: "https://livestockconservancy.org/heritage-breeds/heritage-breeds-list/plymouth-rock-chicken/",
  },
  lcBrahma: {
    title: "Brahma Chicken",
    publisher: "The Livestock Conservancy",
    url: "https://livestockconservancy.org/heritage-breeds/heritage-breeds-list/brahma-chicken/",
  },
  lcSussex: {
    title: "Sussex Chicken",
    publisher: "The Livestock Conservancy",
    url: "https://livestockconservancy.org/heritage-breeds/heritage-breeds-list/sussex-chicken/",
  },
  lcRir: {
    title: "Rhode Island Red Chicken",
    publisher: "The Livestock Conservancy",
    url: "https://livestockconservancy.org/heritage-breeds/heritage-breeds-list/rhode-island-red-chicken/",
  },
  lcAustralorp: {
    title: "Australorp Chicken",
    publisher: "The Livestock Conservancy",
    url: "https://livestockconservancy.org/heritage-breeds/heritage-breeds-list/australorp-chicken/",
  },
  lcLeghorn: {
    title: "Leghorn Chicken",
    publisher: "The Livestock Conservancy",
    url: "https://livestockconservancy.org/heritage-breeds/heritage-breeds-list/leghorn-chicken/",
  },
  nakedNeck: {
    title: "The Naked Neck Gene in the Domestic Chicken: A Genetic Strategy to Mitigate the Impact of Heat Stress in Poultry Production",
    publisher: "Fernandes et al., Animals 13:1007",
    url: "https://doi.org/10.3390/ani13061007",
    year: "2023",
  },
  lcCampbell: {
    title: "Khaki Campbell Duck",
    publisher: "The Livestock Conservancy",
    url: "https://livestockconservancy.org/heritage-breeds/heritage-breeds-list/khaki-campbell-duck/",
  },
  lcRunner: {
    title: "Runner Duck",
    publisher: "The Livestock Conservancy",
    url: "https://livestockconservancy.org/heritage-breeds/heritage-breeds-list/runner-duck/",
  },
  rvcDuck: {
    title: "Duck Care Sheet",
    publisher: "Royal Veterinary College, Exotics Service",
    url: "https://www.rvc.ac.uk/Media/Default/small-animal/documents/RVC-Duck-health-care-sheet-2020Aug.pdf",
    year: "2020",
  },
  pnwBees: {
    title: "Evaluating Honey Bee Colonies for Pollination (PNW 623)",
    publisher: "Pacific Northwest Extension (Sagili and Burgett)",
    url: "https://pollinators.msu.edu/sites/_pollinators/assets/File/pnw623.pdf",
    year: "2011",
  },
  kangJung: {
    title: "Threshold Temperature for the Outdoor Flight Activity of Honey Bee, Apis mellifera under Overwintering Conditions",
    publisher: "Kang and Jung, Journal of Apiculture 39(4)",
    url: "https://agris.fao.org/search/en/records/67f4dcece01f7420ea853250",
    year: "2024",
  },
  ufBees: {
    title: "Overwintering Honey Bee Colonies in Northern Climates (ENY-161)",
    publisher: "University of Florida IFAS Extension (Ellis and Hammons)",
    url: "https://ask.ifas.ufl.edu/publication/IN1006/pdf",
    year: "2013, revised 2022",
  },
  aaaaiStings: {
    title: "Stinging Insect Allergy",
    publisher: "American Academy of Allergy, Asthma & Immunology",
    url: "https://www.aaaai.org/tools-for-the-public/conditions-library/allergies/stinging-insect-allergy",
    year: "2026",
  },
  nmsuGoats: {
    title: "Housing and Working Facilities for Dairy Goats (Guide D-703)",
    publisher: "New Mexico State University (Hagevoort, Smith and Rivera)",
    url: "https://pubs.nmsu.edu/_d/D703/",
    year: "2011",
  },
  isuGoats: {
    title: "Beginner Dairy Goat Fact Sheet",
    publisher: "Iowa State University Extension (Tranel)",
    url: "https://polk.extension.wisc.edu/files/2011/08/DairyGOATSFactSheet06.pdf",
    year: "2006",
  },
  adga: {
    title: "Breed Standards",
    publisher: "American Dairy Goat Association",
    url: "https://adga.org/breed-standards/",
  },
  osuSaanen: {
    title: "Saanen Goats",
    publisher: "Oklahoma State University, Breeds of Livestock",
    url: "https://breeds.okstate.edu/goats/saanen-goats.html",
  },
  osuToggenburg: {
    title: "Toggenburg Goats",
    publisher: "Oklahoma State University, Breeds of Livestock",
    url: "https://breeds.okstate.edu/goats/toggenburg-goats.html",
  },
  osuNubian: {
    title: "Anglo-Nubian Goats",
    publisher: "Oklahoma State University, Breeds of Livestock",
    url: "https://breeds.okstate.edu/goats/anglo-nubian-goats.html",
    year: "2021",
  },
  defraGoats: {
    title: "Code of recommendations for the welfare of livestock: Goats",
    publisher: "Defra (UK)",
    url: "https://assets.publishing.service.gov.uk/media/64a2d59545b6a2000c3d47bd/Code_of_recommendations_for_the_welfare_of_livestock_goats.pdf",
    year: "1989",
  },
  bgsGoats: {
    title: "Keeping Goats: Basic Requirements",
    publisher: "British Goat Society",
    url: "https://www.britishgoatsociety.com/wp-content/uploads/2015/01/Web_2-Basic-Requirements.pdf",
  },
  cdcRawMilk: {
    title: "Raw Milk",
    publisher: "US Centers for Disease Control and Prevention",
    url: "https://www.cdc.gov/food-safety/foods/raw-milk.html",
    year: "2025",
  },
  usuRabbits: {
    title: "Rabbit Breeding and Management: A Guide for Producers",
    publisher: "Utah State University Extension (Okoh and Hadfield)",
    url: "https://extension.usu.edu/small-acreage-livestock/research/rabbit-breeding-and-management-a-guide-for-producers",
    year: "2025",
  },
  osuRabbits: {
    title: "Raising Rabbits for Meat: Providing Basic Care (EC 1655)",
    publisher: "Oregon State University Extension Service",
    url: "https://extension.oregonstate.edu/sites/default/files/documents/ec1655.pdf",
    year: "2018",
  },
  usdaRabbits: {
    title: "Commercial Rabbit Raising (Agriculture Handbook 309)",
    publisher: "US Department of Agriculture, Agricultural Research Service",
    url: "https://ageconsearch.umn.edu/record/322040/files/ah309rev.pdf",
    year: "1966, revised 1971",
  },
  faoRabbits: {
    title: "The rabbit: husbandry, health and production, chapter 6",
    publisher: "FAO (Lebas, Coudert, Rouvier and de Rochambeau)",
    url: "https://www.fao.org/4/x5082e/X5082E0e.htm",
    year: "1986",
  },
  twdbRain: {
    title: "The Texas Manual on Rainwater Harvesting, third edition",
    publisher: "Texas Water Development Board",
    url: "https://www.twdb.texas.gov/publications/brochures/conservation/doc/RainwaterHarvestingManual_3rdedition.pdf",
    year: "2005",
  },
  cdcRain: {
    title: "Collecting Rainwater and Your Health: An Overview",
    publisher: "US Centers for Disease Control and Prevention",
    url: "https://www.cdc.gov/drinking-water/about/collecting-rainwater-and-your-health-an-overview.html",
    year: "2024",
  },
  psuRainBarrel: {
    title: "Rain Barrel Winter Maintenance: Don't Forget to Disconnect!",
    publisher: "Penn State Extension (Yencha)",
    url: "https://extension.psu.edu/rain-barrel-winter-maintenance-dont-forget-to-disconnect",
    year: "2022",
  },
  epaBurn: {
    title: "Best Wood-Burning Practices",
    publisher: "US Environmental Protection Agency, Burn Wise",
    url: "https://19january2025snapshot.epa.gov/burnwise/best-wood-burning-practices",
    year: "2024",
  },
  lwfFirewood: {
    title: "Scheitholz: Produktion, Lagerung, Kennzahlen (Merkblatt 20)",
    publisher: "Bavarian State Institute of Forestry (LWF)",
    url: "https://lwf.bayern.de/mam/cms04/service/dateien/mb20_scheitholz_2025_rz_web_bf.pdf",
    year: "2025",
  },
  gwdd: {
    title: "Global Wood Density Database (data for Chave et al., Towards a worldwide wood economics spectrum, Ecology Letters 12)",
    publisher: "Zanne et al., Dryad",
    url: "https://doi.org/10.5061/dryad.234",
    year: "2009",
  },
  munalula: {
    title: "An evaluation of South African fuelwood with regards to calorific value and environmental impact",
    publisher: "Munalula and Meincken, Biomass and Bioenergy 33(3)",
    url: "https://agris.fao.org/search/en/records/65df36e84c5aef494fe0e7d6",
    year: "2009",
  },
  wattleEthiopia: {
    title: "Acacia mearnsii (black wattle), Useful Trees and Shrubs of Ethiopia",
    publisher: "World Agroforestry",
    url: "https://apps.worldagroforestry.org/usefultrees/pdflib/Acacia_mearnsii_ETH.pdf",
  },
  ukyFirewood: {
    title: "Comparison of Properties Affecting Firewood",
    publisher: "University of Kentucky, Forestry",
    url: "https://www.uky.edu/Ag/Forestry/McLaren/firewood_properties.htm",
  },
  sfrsChimney: {
    title: "Chimney Safety, Stoves and Carbon Monoxide",
    publisher: "Scottish Fire and Rescue Service",
    url: "https://www.firescotland.gov.uk/media/dcrj5uy0/sfrs_chimneysafety_leaflet_v5_digital.pdf",
    year: "2024",
  },
  bcHeating: {
    title: "Heating fire safety toolkit",
    publisher: "Province of British Columbia, Office of the Fire Commissioner",
    url: "https://www2.gov.bc.ca/gov/content/safety/public-safety/fire-safety/fire-safety-education/fire-safety-toolkits/heating-fire-safety-toolkit",
  },
  cpscCo: {
    title: "Carbon Monoxide Information Center",
    publisher: "US Consumer Product Safety Commission",
    url: "https://www.cpsc.gov/Safety-Education/Safety-Education-Centers/Carbon-Monoxide-Information-Center",
  },
  hcCo: {
    title: "Carbon monoxide: Overview",
    publisher: "Health Canada",
    url: "https://www.canada.ca/en/health-canada/services/air-quality/indoor-air-contaminants/keep-carbon-monoxide-out-your-home.html",
    year: "2024",
  },
  usdaFirewood: {
    title: "Baby, it's cold outside. Time to stock up on firewood.",
    publisher: "US Department of Agriculture",
    url: "https://www.usda.gov/node/19395",
    year: "2015",
  },
  metOfficeHdd: {
    title: "Large uncertainties in trends of energy demand for heating and cooling under climate change (Table 1: the UK Met Office degree-day equations)",
    publisher: "Deroubaix et al., Nature Communications 12:5197",
    url: "https://doi.org/10.1038/s41467-021-25504-8",
    year: "2021",
  },
  noaaNormals: {
    // The check behind the page's heating degree days (Erbs, Klein and Beckman 1983, ASHRAE Journal 25(6):60–65): the
    // paper itself was not reached, so the registry links the NOAA normals the method was checked against.
    title: "U.S. Climate Normals 1991–2020, monthly (heating degree days and mean temperature)",
    publisher: "NOAA National Centers for Environmental Information",
    url: "https://www.ncei.noaa.gov/access/services/data/v1?dataset=normals-monthly-1991-2020&stations=USW00014739,USW00013889&dataTypes=MLY-TAVG-NORMAL,MLY-HTDD-NORMAL,MLY-TAVG-STDDEV&format=csv",
    year: "2021",
  },
  noaaSolar: {
    title: "General Solar Position Calculations",
    publisher: "NOAA Global Monitoring Division",
    url: "https://gml.noaa.gov/grad/solcalc/solareqns.PDF",
  },
  uriCompost: {
    title: "Composting Livestock Manure",
    publisher: "University of Rhode Island Cooperative Extension",
    url: "https://web.uri.edu/safewater/protecting-water-quality-at-home/animal-waste/small-acreage-livestock/composting-livestock-manure/",
  },
  usdaManure: {
    title: "Soil Building: Manures and Composts",
    publisher: "US Department of Agriculture, Agricultural Marketing Service (National Organic Program)",
    url: "https://www.ams.usda.gov/grades-standards/soil-building-manures-composts",
  },
  cgsbOrganic: {
    title: "Comparison between CAN/CGSB-32.310-2015 amended 2018 and CAN/CGSB-32.310-2020, Section 5: Crop production (clause 5.5.2.5, raw manure)",
    publisher: "Organic Federation of Canada",
    url: "https://organicfederation.ca/sites/documents/5%20Compared%20standards%20Crop%20production.pdf",
  },
  epaCompost: {
    title: "Composting At Home",
    publisher: "US Environmental Protection Agency",
    url: "https://www.epa.gov/recycle/composting-home",
  },
  umnStorage: {
    title: "Harvesting and storing home garden vegetables",
    publisher: "University of Minnesota Extension (Tong)",
    url: "https://extension.umn.edu/vegetables/harvesting-and-storing-home-garden-vegetables",
    year: "reviewed 2026",
  },
  purdueStorage: {
    title: "Storing Vegetables and Fruits at Home (HO-125)",
    publisher: "Purdue Extension (Lerner and Dana)",
    url: "https://ag.purdue.edu/department/hla/extension/extension-publications-library/ext-pubs/ho-125-w.html",
  },
  ncsuSeason: {
    title: "Appendix E. Season Extenders and Greenhouses (AG-831)",
    publisher: "NC State Extension (Gunter)",
    url: "https://content.ces.ncsu.edu/appendix-e-season-extenders-and-greenhouses",
    year: "2022",
  },
  wsuSeason: {
    title: "Season Extenders",
    publisher: "WSU Extension Master Gardeners, Skagit County (Kintner)",
    url: "https://wpcdn.web.wsu.edu/wp-extension/uploads/sites/2073/2023/12/Season-Extenders.pdf",
    year: "2023",
  },
} satisfies Record<string, HomesteadSource>;

export type SourceId = keyof typeof SOURCES;

export const sourceOf = (id: SourceId): HomesteadSource => SOURCES[id];
