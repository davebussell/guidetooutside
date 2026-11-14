/**
 * Where to check the rules, for places the closed-season table
 * (src/data/closed-seasons.ts) does not cover yet.
 *
 * The fishing page says "No regulator rules are loaded for <province, state or
 * country> yet. Check <regulator> before you fish." and links the regulator's
 * own fishing page from here. Only pages that have been opened and confirmed to
 * be the fish and wildlife regulator's page for that jurisdiction are listed
 * (`verified` is the date it was opened); a jurisdiction not listed gets the
 * sentence without a link.
 *
 * `admin1` lists the province or state names and codes as place-normals.json
 * writes them (case-insensitive); an entry with no `admin1` is the whole country.
 * An entry for the province or state wins over the country's.
 */
export type RegulatorPage = { name: string; url: string; verified: string };

type Entry = RegulatorPage & { countryCode: string; admin1?: string[] };

/** The date every page below was opened and checked. */
const V = "2026-11-02";

export const REGULATOR_PAGES: Entry[] = [
  // ---- Canada (11 provinces and territories occur in the data; Yukon could not be opened) ----
  { countryCode: "CA", admin1: ["ON", "Ontario"], name: "Ontario fishing regulations summary (Ministry of Natural Resources)", url: "https://www.ontario.ca/document/ontario-fishing-regulations-summary", verified: V },
  { countryCode: "CA", admin1: ["QC", "Quebec", "Québec"], name: "Gouvernement du Québec, sport fishing", url: "https://www.quebec.ca/en/tourism-and-recreation/sporting-and-outdoor-activities/sport-fishing", verified: V },
  { countryCode: "CA", admin1: ["BC", "British Columbia"], name: "Province of British Columbia, freshwater fishing regulations", url: "https://www2.gov.bc.ca/gov/content/sports-culture/recreation/fishing-hunting/fishing/fishing-regulations", verified: V },
  { countryCode: "CA", admin1: ["AB", "Alberta"], name: "Government of Alberta, fishing regulations", url: "https://www.alberta.ca/fishing-hunting-and-trapping-regulations", verified: V },
  { countryCode: "CA", admin1: ["NB", "New Brunswick"], name: "New Brunswick Natural Resources and Energy Development, go fishing", url: "https://www2.gnb.ca/content/gnb/en/departments/erd/fish-and-wildlife/content/go-fishing.html", verified: V },
  { countryCode: "CA", admin1: ["MB", "Manitoba"], name: "Manitoba Natural Resources and Indigenous Futures, recreational fishing", url: "https://www.manitoba.ca/nrnd/fish-wildlife/fish/recreational_fishing/index.html", verified: V },
  { countryCode: "CA", admin1: ["SK", "Saskatchewan"], name: "Government of Saskatchewan, angling regulations", url: "https://www.saskatchewan.ca/residents/parks-culture-heritage-and-sport/hunting-trapping-and-angling/angling/regulations", verified: V },
  { countryCode: "CA", admin1: ["NT", "Northwest Territories"], name: "Government of the Northwest Territories, sport fishing regulations", url: "https://www.gov.nt.ca/ecc/en/services/get-fishing-licence/general-regulations", verified: V },
  { countryCode: "CA", admin1: ["PE", "PEI", "Prince Edward Island"], name: "Government of Prince Edward Island, hunting, angling and trapping", url: "https://www.princeedwardisland.ca/en/topic/hunting-angling-and-trapping", verified: V },
  { countryCode: "CA", admin1: ["NS", "Nova Scotia"], name: "Government of Nova Scotia, sportfishing", url: "https://www.novascotia.ca/programs-and-services/sportfishing-licensing", verified: V },
  // ---- United States (37 of the 38 states and districts in the data; Nevada's site disallows automated reading) ----
  { countryCode: "US", admin1: ["AK", "Alaska"], name: "Alaska Department of Fish and Game, sport fishing regulations", url: "https://www.adfg.alaska.gov/index.cfm?adfg=fishingSportFishingInfo.whatiseo", verified: V },
  { countryCode: "US", admin1: ["AR", "Arkansas"], name: "Arkansas Game and Fish Commission, fishing guidebook", url: "https://www.agfc.com/regulations/guidebooks/", verified: V },
  { countryCode: "US", admin1: ["AZ", "Arizona"], name: "Arizona Game and Fish Department, fishing licenses and regulations", url: "https://www.azgfd.com/fishing-2/licenses-and-regulations/", verified: V },
  { countryCode: "US", admin1: ["CA", "California"], name: "California Department of Fish and Wildlife, regulations", url: "https://wildlife.ca.gov/Regulations", verified: V },
  { countryCode: "US", admin1: ["CO", "Colorado"], name: "Colorado Parks and Wildlife, fishing", url: "https://cpw.state.co.us/activities/fishing/fishing-licenses-and-dates", verified: V },
  { countryCode: "US", admin1: ["DC", "District of Columbia"], name: "DC Department of Energy and Environment, fishing in the District", url: "https://doee.dc.gov/service/fishdc", verified: V },
  { countryCode: "US", admin1: ["FL", "Florida"], name: "Florida Fish and Wildlife Conservation Commission, freshwater fishing regulations", url: "https://myfwc.com/fishing/freshwater/regulations/", verified: V },
  { countryCode: "US", admin1: ["GA", "Georgia"], name: "Georgia Wildlife Resources Division, fishing", url: "https://georgiawildlife.com/fishing/angler-resources", verified: V },
  { countryCode: "US", admin1: ["IA", "Iowa"], name: "Iowa Department of Natural Resources, fishing regulations", url: "https://www.iowadnr.gov/things-do/fishing/regulations-laws", verified: V },
  { countryCode: "US", admin1: ["ID", "Idaho"], name: "Idaho Fish and Game, seasons and rules", url: "https://idfg.idaho.gov/rules", verified: V },
  { countryCode: "US", admin1: ["IN", "Indiana"], name: "Indiana DNR Fish and Wildlife, fishing guide and regulations", url: "https://www.in.gov/dnr/fish-and-wildlife/fishing/fishing-guide-and-regulations/", verified: V },
  { countryCode: "US", admin1: ["LA", "Louisiana"], name: "Louisiana Department of Wildlife and Fisheries, recreational fishing", url: "https://www.wlf.louisiana.gov/page/recreational-fishing", verified: V },
  { countryCode: "US", admin1: ["MA", "Massachusetts"], name: "MassWildlife, freshwater fishing regulations", url: "https://www.mass.gov/info-details/freshwater-fishing-regulations", verified: V },
  { countryCode: "US", admin1: ["MD", "Maryland"], name: "Maryland Department of Natural Resources, recreational fishing", url: "https://dnr.maryland.gov/fisheries/pages/recreational/md_fishing.aspx", verified: V },
  { countryCode: "US", admin1: ["ME", "Maine"], name: "Maine Department of Inland Fisheries and Wildlife, statewide fishing laws", url: "https://www.maine.gov/ifw/fishing-boating/fishing/laws-rules/statewide-laws.html", verified: V },
  { countryCode: "US", admin1: ["MI", "Michigan"], name: "Michigan DNR, fishing regulations", url: "https://www.michigan.gov/dnr/things-to-do/fishing/fishing-regulations", verified: V },
  { countryCode: "US", admin1: ["MN", "Minnesota"], name: "Minnesota DNR, fishing", url: "https://www.dnr.state.mn.us/fishing/index.html", verified: V },
  { countryCode: "US", admin1: ["MO", "Missouri"], name: "Missouri Department of Conservation, fishing regulations", url: "https://mdc.mo.gov/fishing/regulations", verified: V },
  { countryCode: "US", admin1: ["MT", "Montana"], name: "Montana Fish, Wildlife and Parks, fishing regulations", url: "https://fwp.mt.gov/fish/regulations", verified: V },
  { countryCode: "US", admin1: ["NC", "North Carolina"], name: "North Carolina Wildlife Resources Commission, regulations", url: "https://www.ncwildlife.gov/fishing/regulations", verified: V },
  { countryCode: "US", admin1: ["ND", "North Dakota"], name: "North Dakota Game and Fish Department, fishing regulations", url: "https://gf.nd.gov/regulations/fishing", verified: V },
  { countryCode: "US", admin1: ["NE", "Nebraska"], name: "Nebraska Game and Parks Commission, fishing guide", url: "https://outdoornebraska.gov/guides-maps/fishing-guides-reports/fishing-guide/", verified: V },
  { countryCode: "US", admin1: ["IL", "Illinois"], name: "Illinois Department of Natural Resources, fishing regulations guide", url: "https://dnr.illinois.gov/content/dam/soi/en/web/dnr/publications/documents/00000953.pdf", verified: V },
  { countryCode: "US", admin1: ["NH", "New Hampshire"], name: "New Hampshire Fish and Game, fishing seasons", url: "https://wildlife.nh.gov/fishing-new-hampshire/fishing-seasons-nh", verified: V },
  { countryCode: "US", admin1: ["NM", "New Mexico"], name: "New Mexico Department of Wildlife, fishing", url: "https://wildlife.dgf.nm.gov/fishing/", verified: V },
  { countryCode: "US", admin1: ["NY", "New York"], name: "New York State DEC, freshwater fishing regulations", url: "https://dec.ny.gov/things-to-do/freshwater-fishing/regulations", verified: V },
  { countryCode: "US", admin1: ["OH", "Ohio"], name: "Ohio Department of Natural Resources, fishing regulations", url: "https://ohiodnr.gov/buy-and-apply/hunting-fishing-boating/fishing-resources/fishing-regulations", verified: V },
  { countryCode: "US", admin1: ["OK", "Oklahoma"], name: "Oklahoma Department of Wildlife Conservation, fishing regulations", url: "https://www.wildlifedepartment.com/fishing/regs", verified: V },
  { countryCode: "US", admin1: ["OR", "Oregon"], name: "Oregon Department of Fish and Wildlife, fishing regulation updates", url: "https://myodfw.com/articles/regulation-updates", verified: V },
  { countryCode: "US", admin1: ["PA", "Pennsylvania"], name: "Pennsylvania Fish and Boat Commission", url: "https://www.pa.gov/agencies/fishandboat", verified: V },
  { countryCode: "US", admin1: ["TN", "Tennessee"], name: "Tennessee Wildlife Resources Agency, fishing", url: "https://www.tn.gov/twra/fishing.html", verified: V },
  { countryCode: "US", admin1: ["TX", "Texas"], name: "Texas Parks and Wildlife, fishing regulations (Outdoor Annual)", url: "https://tpwd.texas.gov/regulations/outdoor-annual/fishing/", verified: V },
  { countryCode: "US", admin1: ["VA", "Virginia"], name: "Virginia Department of Wildlife Resources, freshwater fishing regulations", url: "https://dwr.virginia.gov/fishing/regulations/", verified: V },
  { countryCode: "US", admin1: ["VT", "Vermont"], name: "Vermont Fish and Wildlife Department, fishing regulations", url: "https://vtfishandwildlife.com/fish/fishing-regulations", verified: V },
  { countryCode: "US", admin1: ["WA", "Washington"], name: "Washington Department of Fish and Wildlife, fishing regulations", url: "https://wdfw.wa.gov/fishing/regulations", verified: V },
  { countryCode: "US", admin1: ["WI", "Wisconsin"], name: "Wisconsin DNR, fishing regulations", url: "https://dnr.wisconsin.gov/topic/fishing/regulations", verified: V },
  { countryCode: "US", admin1: ["WY", "Wyoming"], name: "Wyoming Game and Fish Department, regulations", url: "https://wgfd.wyo.gov/regulations", verified: V },
  // ---- Countries ----
  { countryCode: "IE", name: "Inland Fisheries Ireland", url: "https://www.fisheriesireland.ie/", verified: V },
  { countryCode: "NO", name: "Fiskeridirektoratet (Norwegian Directorate of Fisheries), sea angling rules", url: "https://www.fiskeridir.no/english/sea-angling-in-norway/regulations", verified: V },
  { countryCode: "SE", name: "Havs- och vattenmyndigheten, rules for recreational fishing", url: "https://www.havochvatten.se/fiske-och-handel/regler-och-lagar/fiskeregler-for-fritidsfiske.html", verified: V },
  { countryCode: "FR", name: "French ministries, freshwater fishing (Pêche en eau douce)", url: "https://www.ecologie.gouv.fr/politiques-publiques/peche-eau-douce", verified: V },
  { countryCode: "DK", name: "LFST (Danish agency for food, agriculture and fisheries), recreational fishing rules", url: "https://www.lfst.dk/lyst-og-fritidsfiskeri/fisketegn/regler-for-lyst-og-fritidsfiskeri", verified: V },
];

const norm = (s: string) => s.trim().toLowerCase();

/** The verified regulator page for a place (its province or state first, then its country), or null. */
export function regulatorPageFor(place: { countryCode?: string; admin1?: string; admin1Code?: string }): RegulatorPage | null {
  const cc = place.countryCode?.toUpperCase();
  if (!cc) return null;
  const mine = [place.admin1, place.admin1Code].filter((x): x is string => !!x).map(norm);
  const inCountry = REGULATOR_PAGES.filter((e) => e.countryCode === cc);
  const hit = inCountry.find((e) => e.admin1?.some((a) => mine.includes(norm(a)))) ?? inCountry.find((e) => !e.admin1);
  return hit ? { name: hit.name, url: hit.url, verified: hit.verified } : null;
}

/**
 * Tidal (salt) waters have their own regulator where the province's or state's
 * page is for fresh water. Only Canada's federal pages that were opened and
 * confirmed (Fisheries and Oceans Canada: Pacific Region for British Columbia,
 * Maritimes Region for Nova Scotia and New Brunswick, Gulf Region for Prince
 * Edward Island) are listed; elsewhere the fishing page says nothing about tidal
 * waters beyond the page it already links.
 *
 * Audit of 10 November 2026: PEI was sent to the Maritimes Region, whose page says the region runs from the northern
 * tip of Cape Breton to the New Brunswick–Maine border and links the Gulf Region's page; the Gulf Region's own notices
 * cover "eastern New Brunswick, Gulf Nova Scotia and Prince Edward Island". The provinces' Gulf shores (eastern New
 * Brunswick, Nova Scotia's Northumberland Strait side) are Gulf Region too, but no town on them is among the places;
 * Moncton, Saint John, Fredericton and Halifax drain to the Bay of Fundy or the Atlantic, which are Maritimes Region.
 * // source: https://www.dfo-mpo.gc.ca/fisheries-peches/recreational-recreative/maritimes/index-eng.html (read 2026-11-11)
 * // source: https://www.glf.dfo-mpo.gc.ca/en/conservation-measures-clams-eastern-new-brunswick-gulf-nova-scotia-and-prince-edward-island (read 2026-11-11)
 */
const TIDAL_PAGES: Entry[] = [
  { countryCode: "CA", admin1: ["BC", "British Columbia"], name: "Fisheries and Oceans Canada, recreational fishing in British Columbia (tidal waters)", url: "https://www.pac.dfo-mpo.gc.ca/fm-gp/rec/index-eng.html", verified: V },
  { countryCode: "CA", admin1: ["NS", "Nova Scotia", "NB", "New Brunswick"], name: "Fisheries and Oceans Canada, Maritimes Region recreational fisheries (tidal waters)", url: "https://www.dfo-mpo.gc.ca/fisheries-peches/recreational-recreative/maritimes/index-eng.html", verified: V },
  { countryCode: "CA", admin1: ["PE", "PEI", "Prince Edward Island"], name: "Fisheries and Oceans Canada, Gulf Region recreational fisheries (tidal waters)", url: "https://www.glf.dfo-mpo.gc.ca/en/recreational-fisheries", verified: "2026-11-11" },
];

/** The verified regulator page for the tidal waters of a place, or null. */
export function tidalPageFor(place: { countryCode?: string; admin1?: string; admin1Code?: string }): RegulatorPage | null {
  const cc = place.countryCode?.toUpperCase();
  if (!cc) return null;
  const mine = [place.admin1, place.admin1Code].filter((x): x is string => !!x).map(norm);
  const hit = TIDAL_PAGES.find((e) => e.countryCode === cc && e.admin1?.some((a) => mine.includes(norm(a))));
  return hit ? { name: hit.name, url: hit.url, verified: hit.verified } : null;
}
