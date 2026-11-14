import type { Place, RegsLink } from "./types";

/**
 * Official fishing-regulation sources: every Canadian province and territory,
 * every US state, and the countries of Europe and Africa that keep a reliable
 * official page. Root agency pages are used deliberately — they rarely move,
 * and each links to the current year's rules. Recovered from the live
 * /fishing/regulations directory.
 *
 * Also the country's rule on picking wild plants and fungi (`forageLawFor`),
 * shown on the foraging guide.
 */

export type RegsEntry = RegsLink & { code: string };
export type CountryRegs = RegsLink & { code: string; country: string };

export const REGS_CA: RegsEntry[] = [
  {"code": "AB", "agency": "Alberta Environment and Protected Areas", "url": "https://www.alberta.ca/fishing-regulations"},
  {"code": "BC", "agency": "BC Freshwater Fishing Regulations Synopsis", "url": "https://www2.gov.bc.ca/gov/content/sports-culture/recreation/fishing-hunting/fishing"},
  {"code": "MB", "agency": "Manitoba Fisheries Branch", "url": "https://www.gov.mb.ca/nrnd/fish-wildlife/fish/"},
  {"code": "NB", "agency": "New Brunswick Natural Resources – Fish", "url": "https://www2.gnb.ca/content/gnb/en/departments/erd/natural_resources/content/fish.html"},
  {"code": "NL", "agency": "Fisheries and Oceans Canada – Newfoundland & Labrador", "url": "https://www.dfo-mpo.gc.ca/fisheries-peches/recreational-recreative/index-eng.html"},
  {"code": "NS", "agency": "Nova Scotia Sportfishing", "url": "https://novascotia.ca/fish/sportfishing/"},
  {"code": "NT", "agency": "Government of Northwest Territories – Sport Fishing", "url": "https://www.gov.nt.ca/ecc/en/services/sport-fishing"},
  {"code": "NU", "agency": "Government of Nunavut – Fishing", "url": "https://www.gov.nu.ca/en/environment/fishing"},
  {"code": "ON", "agency": "Ontario Fishing Regulations Summary", "url": "https://www.ontario.ca/page/fishing-ontario"},
  {"code": "PE", "agency": "Prince Edward Island – Fishing & Angling", "url": "https://www.princeedwardisland.ca/en/topic/fishing-and-angling"},
  {"code": "QC", "agency": "Québec – Sport Fishing (MELCCFP)", "url": "https://www.quebec.ca/en/tourism-and-recreation/sporting-and-outdoor-activities/sport-fishing"},
  {"code": "SK", "agency": "Saskatchewan Anglers' Guide", "url": "https://www.saskatchewan.ca/residents/parks-culture-heritage-and-sport/hunting-trapping-and-angling/angling"},
  {"code": "YT", "agency": "Yukon Fishing Regulations Summary", "url": "https://yukon.ca/en/outdoor-recreation-and-wildlife/fishing"},
];

export const REGS_US: RegsEntry[] = [
  {"code": "AL", "agency": "Alabama Wildlife & Freshwater Fisheries", "url": "https://www.outdooralabama.com/fishing"},
  {"code": "AK", "agency": "Alaska Department of Fish and Game", "url": "https://www.adfg.alaska.gov/index.cfm?adfg=fishing.main"},
  {"code": "AZ", "agency": "Arizona Game & Fish Department", "url": "https://www.azgfd.com/fishing/"},
  {"code": "AR", "agency": "Arkansas Game and Fish Commission", "url": "https://www.agfc.com/fishing/"},
  {"code": "CA", "agency": "California Department of Fish and Wildlife", "url": "https://wildlife.ca.gov/Fishing"},
  {"code": "CO", "agency": "Colorado Parks & Wildlife", "url": "https://cpw.state.co.us/fishing"},
  {"code": "CT", "agency": "Connecticut DEEP Fishing", "url": "https://portal.ct.gov/deep/fishing"},
  {"code": "DE", "agency": "Delaware Division of Fish & Wildlife", "url": "https://dnrec.delaware.gov/fish-wildlife/fishing/"},
  {"code": "FL", "agency": "Florida Fish and Wildlife Conservation Commission", "url": "https://myfwc.com/fishing/"},
  {"code": "GA", "agency": "Georgia DNR Wildlife Resources Division", "url": "https://georgiawildlife.com/fishing"},
  {"code": "HI", "agency": "Hawaiʻi Division of Aquatic Resources", "url": "https://dlnr.hawaii.gov/dar/fishing/"},
  {"code": "ID", "agency": "Idaho Department of Fish and Game", "url": "https://idfg.idaho.gov/fish"},
  {"code": "IL", "agency": "Illinois DNR Fishing", "url": "https://dnr.illinois.gov/fishing.html"},
  {"code": "IN", "agency": "Indiana DNR Fish & Wildlife", "url": "https://www.in.gov/dnr/fish-and-wildlife/fishing/"},
  {"code": "IA", "agency": "Iowa DNR Fishing", "url": "https://www.iowadnr.gov/fishing"},
  {"code": "KS", "agency": "Kansas Department of Wildlife & Parks", "url": "https://ksoutdoors.gov/Fishing"},
  {"code": "KY", "agency": "Kentucky Fish & Wildlife", "url": "https://fw.ky.gov/Fish/Pages/default.aspx"},
  {"code": "LA", "agency": "Louisiana Wildlife and Fisheries", "url": "https://www.wlf.louisiana.gov/page/fishing"},
  {"code": "ME", "agency": "Maine Inland Fisheries & Wildlife", "url": "https://www.maine.gov/ifw/fishing-boating/fishing/"},
  {"code": "MD", "agency": "Maryland DNR Fishing", "url": "https://dnr.maryland.gov/fisheries/"},
  {"code": "MA", "agency": "MassWildlife Fishing", "url": "https://www.mass.gov/fishing"},
  {"code": "MI", "agency": "Michigan DNR Fishing", "url": "https://www.michigan.gov/dnr/things-to-do/fishing"},
  {"code": "MN", "agency": "Minnesota DNR Fishing", "url": "https://www.dnr.state.mn.us/fishing/index.html"},
  {"code": "MS", "agency": "Mississippi Wildlife, Fisheries & Parks", "url": "https://www.mdwfp.com/fishing-boating/"},
  {"code": "MO", "agency": "Missouri Department of Conservation", "url": "https://mdc.mo.gov/fishing"},
  {"code": "MT", "agency": "Montana Fish, Wildlife & Parks", "url": "https://fwp.mt.gov/fish"},
  {"code": "NE", "agency": "Nebraska Game and Parks", "url": "https://outdoornebraska.gov/fishing/"},
  {"code": "NV", "agency": "Nevada Department of Wildlife", "url": "https://www.ndow.org/fishing/"},
  {"code": "NH", "agency": "New Hampshire Fish and Game", "url": "https://www.wildlife.nh.gov/fishing-new-hampshire"},
  {"code": "NJ", "agency": "New Jersey Fish & Wildlife", "url": "https://dep.nj.gov/njfw/fishing/"},
  {"code": "NM", "agency": "New Mexico Game & Fish", "url": "https://www.wildlife.state.nm.us/fishing/"},
  {"code": "NY", "agency": "New York State DEC Fishing", "url": "https://dec.ny.gov/things-to-do/fishing"},
  {"code": "NC", "agency": "North Carolina Wildlife Resources Commission", "url": "https://www.ncwildlife.org/fishing"},
  {"code": "ND", "agency": "North Dakota Game and Fish", "url": "https://gf.nd.gov/fishing"},
  {"code": "OH", "agency": "Ohio DNR Division of Wildlife", "url": "https://ohiodnr.gov/discover-and-learn/safety-conservation/about-odnr/division-wildlife/fishing"},
  {"code": "OK", "agency": "Oklahoma Department of Wildlife Conservation", "url": "https://www.wildlifedepartment.com/fishing"},
  {"code": "OR", "agency": "Oregon Department of Fish & Wildlife", "url": "https://myodfw.com/fishing"},
  {"code": "PA", "agency": "Pennsylvania Fish & Boat Commission", "url": "https://www.fishandboat.com/"},
  {"code": "RI", "agency": "Rhode Island DEM Fish & Wildlife", "url": "https://dem.ri.gov/natural-resources-bureau/fish-wildlife/fishing"},
  {"code": "SC", "agency": "South Carolina DNR", "url": "https://www.dnr.sc.gov/fishing.html"},
  {"code": "SD", "agency": "South Dakota Game, Fish and Parks", "url": "https://gfp.sd.gov/fishing/"},
  {"code": "TN", "agency": "Tennessee Wildlife Resources Agency", "url": "https://www.tn.gov/twra/fishing.html"},
  {"code": "TX", "agency": "Texas Parks & Wildlife", "url": "https://tpwd.texas.gov/fishboat/fish/"},
  {"code": "UT", "agency": "Utah Division of Wildlife Resources", "url": "https://wildlife.utah.gov/fishing.html"},
  {"code": "VT", "agency": "Vermont Fish & Wildlife", "url": "https://vtfishandwildlife.com/fish"},
  {"code": "VA", "agency": "Virginia Department of Wildlife Resources", "url": "https://dwr.virginia.gov/fishing/"},
  {"code": "WA", "agency": "Washington Department of Fish & Wildlife", "url": "https://wdfw.wa.gov/fishing"},
  {"code": "WV", "agency": "West Virginia Division of Natural Resources", "url": "https://wvdnr.gov/fishing/"},
  {"code": "WI", "agency": "Wisconsin DNR Fishing", "url": "https://dnr.wisconsin.gov/topic/fishing"},
  {"code": "WY", "agency": "Wyoming Game & Fish Department", "url": "https://wgfd.wyo.gov/fishing-and-boating"},
  {"code": "DC", "agency": "DC Department of Energy & Environment – Fishing", "url": "https://doee.dc.gov/service/fishing-district"},
];

export const REGS_EUROPE: CountryRegs[] = [
  {"code": "AL", "country": "Albania", "agency": "Albania Ministry of Agriculture and Rural Development", "url": "https://bujqesia.gov.al/", "note": "Amateur fishing authorisations are issued locally, so ask the municipality or local angling association before you fish."},
  {"code": "AD", "country": "Andorra", "agency": "Govern d'Andorra – Pesca", "url": "https://www.govern.ad/ca/tematiques/medi-ambient-i-sostenibilitat/pesca", "note": "A season fishing permit from the government is required, now fully digital through e-Tràmits; the high lakes open later than the rivers."},
  {"code": "AT", "country": "Austria", "agency": "Oesterreich.gv.at – Fishing (rules by state)", "url": "https://www.oesterreich.gv.at/de/themen/reisen_und_freizeit/freizeit-in-der-natur/fischen", "note": "Each state issues its own fishing card (Fischerkarte, with guest cards for visitors), and you also need a permit (Lizenz) from whoever holds the fishing rights."},
  {"code": "BY", "country": "Belarus", "agency": "Belarus Ministry of Natural Resources and Environmental Protection", "url": "https://minpriroda.gov.by/ru", "note": "Amateur rod fishing on public waters is free; leased waters sell their own permits, and spawning-season bans apply."},
  {"code": "BE", "country": "Belgium", "agency": "Flanders – Fishing licence (visverlof)", "url": "https://www.vlaanderen.be/visverlof", "note": "Flanders and Wallonia each sell their own inland fishing licence (visverlof / permis de pêche); recreational line fishing at sea needs no licence."},
  {"code": "BA", "country": "Bosnia & Herzegovina", "agency": "Federation of BiH Ministry of Agriculture, Water Management and Forestry", "url": "https://fmpvs.gov.ba/", "note": "Permits are sold by the angling association that manages each fishing area; rules differ between the Federation and Republika Srpska."},
  {"code": "BG", "country": "Bulgaria", "agency": "Executive Agency for Fisheries and Aquaculture (IARA) – e-services", "url": "https://iara.government.bg/wps/portal/iara-site-en/administrative-services-en/e-services-en", "note": "A recreational fishing ticket from IARA is required; it can be bought online through the agency's e-services."},
  {"code": "HR", "country": "Croatia", "agency": "Gov.hr – Marine recreational and sport fisheries", "url": "https://www.gov.hr/en/marine-recreational-and-sport-fisheries/1542", "note": "Sea angling, from shore or boat, needs a recreational licence (daily to annual, sold online); freshwater permits are sold by local angling clubs."},
  {"code": "CY", "country": "Cyprus", "agency": "Cyprus Department of Fisheries and Marine Research – Amateur fishing licence", "url": "https://licence.dfmr.moa.gov.cy/licence-application", "note": "A licence is needed to fish from a boat, with a speargun or in the reservoirs (dams); casting a line from the shore needs none."},
  {"code": "CZ", "country": "Czechia", "agency": "Czech Anglers' Union (Český rybářský svaz)", "url": "https://www.rybsvaz.cz/", "note": "You need a fishing card (rybářský lístek) from a municipal office plus a permit (povolenka) for the water, mostly sold by the Czech Anglers' Union."},
  {"code": "DK", "country": "Denmark", "agency": "Danish fishing licence (fisketegn) – official guidance", "url": "https://lfst.dk/lyst-og-fritidsfiskeri/fisketegn", "note": "Rod-and-line anglers need the national licence (lystfiskertegn), sold at fisketegn.dk; most lakes and streams also need a local permit."},
  {"code": "EE", "country": "Estonia", "agency": "Estonian Environmental Board – Fishing rights", "url": "https://keskkonnaamet.ee/en/wildlife-nature-protection/fishing/fishing-rights", "note": "One simple hand line is free on public waters; spinning, fly and other gear need paid fishing rights, and salmon and trout rivers need a fishing card."},
  {"code": "FO", "country": "Faroe Islands", "agency": "Visit Faroe Islands – Freshwater angling", "url": "https://visitfaroeislands.com/en/see-do/activities/adventure-sports/freshwater-angling", "note": "Freshwater fishing needs a permit bought locally; many lakes and rivers are privately owned, so check before you cast."},
  {"code": "FI", "country": "Finland", "agency": "Metsähallitus Eräluvat – Fishing", "url": "https://www.eraluvat.fi/en/fishing", "note": "Simple rod-and-line angling and ice fishing are free; lure fishing needs the national fisheries management fee (ages 18–69), and rapids need the owner's permit."},
  {"code": "FR", "country": "France", "agency": "Fédération Nationale de la Pêche en France", "url": "https://www.federationpeche.fr/", "note": "Freshwater fishing needs a carte de pêche, sold online through the angling federations; sea angling needs no licence, but size limits apply."},
  {"code": "DE", "country": "Germany", "agency": "German Angling Association (DAFV)", "url": "https://www.dafv.de/", "note": "No national licence: each state issues its own fishing licence (Fischereischein; some sell tourist licences), and you also need a permit (Erlaubnisschein) from the water's owner."},
  {"code": "GI", "country": "Gibraltar", "agency": "HM Government of Gibraltar – Marine protection permits", "url": "https://www.gibraltar.gov.gi/environment/marine-strategy/marine-protection-permits", "note": "Recreational rod-and-line fishing from land or a boat needs a permit under the Marine Protection Regulations."},
  {"code": "GR", "country": "Greece", "agency": "Hellenic Coast Guard – Fisheries control (recreational fishing FAQ)", "url": "https://alieia.hcg.gr/faq/faq_eng.php", "note": "No licence is needed to angle at sea, but there is a 5 kg daily catch limit, spearfishers must be 16 or older, and foreign-flagged boats may not fish."},
  {"code": "GG", "country": "Guernsey", "agency": "States of Guernsey – Fishing", "url": "https://www.gov.gg/fishing", "note": "Minimum landing sizes set by the States apply to every fish you keep."},
  {"code": "HU", "country": "Hungary", "agency": "Hungarian National Angling Association (MOHOSZ)", "url": "https://www.mohosz.hu/", "note": "You need a state fishing ticket (állami horgászjegy, with a tourist version for visitors) plus a ticket for the water, both sold at horgaszjegy.hu."},
  {"code": "IS", "country": "Iceland", "agency": "Directorate of Fisheries (Fiskistofa)", "url": "https://island.is/s/fiskistofa", "note": "Freshwater fishing rights belong to landowners, so buy a permit from the river's fishing association or a lake card; used fishing gear must be disinfected on entry to Iceland."},
  {"code": "IE", "country": "Ireland", "agency": "Inland Fisheries Ireland", "url": "https://www.fisheriesireland.ie/", "note": "Salmon and sea trout need a state licence; most coarse, pike and sea angling is free, but many game waters need a permit from the owner or club."},
  {"code": "IM", "country": "Isle of Man", "agency": "Isle of Man Government – Recreational fishing", "url": "https://www.gov.im/categories/leisure-and-entertainment/recreational-fishing/", "note": "Freshwater angling needs a government licence; sea angling needs none, but any salmon or sea trout caught at sea must be released."},
  {"code": "IT", "country": "Italy", "agency": "MASAF – Recreational sea fishing", "url": "https://www.masaf.gov.it/flex/cm/pages/ServeBLOB.php/L/IT/IDPagina/190", "note": "Sea anglers must register online with the ministry's sport-fishing census; freshwater licences are issued by each region."},
  {"code": "JE", "country": "Jersey", "agency": "Government of Jersey – Fishing regulations", "url": "https://www.gov.je/Industry/FarmingFishing/Fishing/Pages/FishingRegulations.aspx", "note": "Recreational sea angling needs no licence, but minimum sizes and bag limits, including for bass, apply."},
  {"code": "XK", "country": "Kosovo", "agency": "Kosovo Ministry of Agriculture, Forestry and Rural Development – Livestock and fisheries", "url": "https://mbpzhr.rks-gov.net/divizioni-per-politikat-e-mbareshtimit-te-kafsheve-shpezeve-bleteve-dhe-peshkatarise/", "note": "Ask the local angling association or municipality about permits before fishing."},
  {"code": "LV", "country": "Latvia", "agency": "Latvian Ministry of Agriculture – Angling", "url": "https://www.zm.gov.lv/en/angling", "note": "An angling card (makšķerēšanas karte) is needed on public and private lakes and rivers, plus an extra licence on 'licensed' waters."},
  {"code": "LT", "country": "Lithuania", "agency": "Lithuanian Environmental Protection Department – Recreational fishing permits", "url": "https://aad.lrv.lt/en/memos-on-environmental-requirements/fishing/recreational-fishing-permits/", "note": "An amateur angler's ticket is needed on state waters (sold online and at shop checkouts); under-18s, pensioners and disabled people fish free."},
  {"code": "LU", "country": "Luxembourg", "agency": "Guichet.lu – Fishing permit for inland waters", "url": "https://guichet.public.lu/en/citoyens/loisirs/permis-licences/peche/permis-peche-eaux-interieures.html", "note": "Inland waters need a state fishing permit; the border rivers shared with Germany need a separate one."},
  {"code": "MT", "country": "Malta", "agency": "Malta Department of Fisheries and Aquaculture", "url": "https://dfa.gov.mt/en/", "note": "Check the department's rules on recreational licences, minimum sizes and seasonal bag limits (such as for lampuki) before fishing."},
  {"code": "MD", "country": "Moldova", "agency": "Moldova Environment Agency – ePescuit", "url": "https://e-pescuit.mediu.gov.md/", "note": "Recreational fishing permits for Moldova's rivers and lakes are issued online through ePescuit, for residents and visitors."},
  {"code": "MC", "country": "Monaco", "agency": "Monaco Public Service – Angling from the shore", "url": "https://monservicepublic.gouv.mc/en/themes/free-time/sport-and-recreation/permits-and-certificates/how-to-angle-for-fish-from-the-shore", "note": "Shore angling is allowed only in authorised spots and needs a declaration to the Department of Maritime Affairs, valid three years."},
  {"code": "ME", "country": "Montenegro", "agency": "Montenegro Ministry of Agriculture, Forestry and Water Management – Fisheries", "url": "https://www.gov.me/mpsv/ribarstvo-2", "note": "Recreational permits are needed for both sea and freshwater fishing; national parks such as Lake Skadar sell their own."},
  {"code": "NL", "country": "Netherlands", "agency": "Rijksoverheid – Applying for a VISpas", "url": "https://www.rijksoverheid.nl/vraag-en-antwoord/visserij/vispas-aanvragen", "note": "Most inland waters need a VISpas (from vispas.nl or a local club); sea angling needs no licence."},
  {"code": "MK", "country": "North Macedonia", "agency": "North Macedonia Ministry of Agriculture, Forestry and Water Economy", "url": "https://www.mzsv.gov.mk/", "note": "A recreational fishing licence is required; buy it from the club or concessionaire that manages the fishing area."},
  {"code": "NO", "country": "Norway", "agency": "Norwegian Environment Agency – Fishing fee (fiskeravgift)", "url": "https://www.miljodirektoratet.no/ansvarsomrader/arter-naturtyper/fiske/nar-kan-jeg-fiske-laks-sjoorret-og-sjoroye/betale-fiskeravgift/", "note": "Salmon, sea trout and sea char need the state fishing fee (18+) plus a local fishing card; other freshwater fishing needs a local card; rod fishing in the sea is free."},
  {"code": "PL", "country": "Poland", "agency": "Biznes.gov.pl – Recreational sea fishing permit", "url": "https://www.biznes.gov.pl/pl/portal/ou1187", "note": "Inland you need an angling card (karta wędkarska) plus a permit from whoever manages the water, usually the Polish Angling Association (PZW); sea angling needs this separate permit."},
  {"code": "PT", "country": "Portugal", "agency": "DGRM – Recreational fishing licence (pesca lúdica)", "url": "https://www.dgrm.pt/licenca-de-pesca-ludica", "note": "Sea angling needs a pesca lúdica licence; inland waters need a separate freshwater licence."},
  {"code": "RO", "country": "Romania", "agency": "National Agency for Fisheries and Aquaculture (ANPA)", "url": "https://www.anpa.ro/", "note": "A free electronic recreational permit from ANPA covers public waters; waters leased to angling associations sell their own permits."},
  {"code": "RU", "country": "Russia", "agency": "Federal Agency for Fishery (Rosrybolovstvo) – Amateur fishing", "url": "https://fish.gov.ru/otraslevaya-deyatelnost/lyubitelskoe-i-sportivnoe-rybolovstvo/", "note": "Amateur fishing on public waters is free under the 2018 amateur-fishing law; regional rules set daily limits and spawning bans."},
  {"code": "RS", "country": "Serbia", "agency": "Serbia Ministry of Environmental Protection", "url": "https://www.ekologija.gov.rs/", "note": "A recreational permit from the manager of each fishing area is required; local angling associations and the public forest enterprises sell them."},
  {"code": "SK", "country": "Slovakia", "agency": "Slovak Anglers' Union (SRZ)", "url": "https://srzrada.sk/", "note": "You need a state fishing card (rybársky lístok) from a district office plus a permit (povolenie) for the waters, sold by the anglers' union."},
  {"code": "SI", "country": "Slovenia", "agency": "Fishing Association of Slovenia (Ribiška zveza Slovenije)", "url": "https://www.ribiska-zveza.si/", "note": "Day permits for rivers and lakes are sold by local fishing clubs (ribiške družine); sea angling needs a separate state permit."},
  {"code": "ES", "country": "Spain", "agency": "MITECO – Inland fishing and the autonomous communities", "url": "https://www.miteco.gob.es/en/biodiversidad/temas/conservacion-de-la-biodiversidad/conservacion-de-la-biodiversidad-en-espana/cb_esp_cons_especies_caza_pesca_contin.html", "note": "No national licence: each autonomous community sells its own inland and sea-angling licences, and an inter-regional licence covers several regions."},
  {"code": "SE", "country": "Sweden", "agency": "Swedish Agency for Marine and Water Management – Recreational fishing rules", "url": "https://www.havochvatten.se/fiske-och-handel/regler-och-lagar/fiskeregler-for-fritidsfiske.html", "note": "Hand-tackle angling is free along the coast and in the five largest lakes; elsewhere buy a fishing card (fiskekort) from the local fishery association."},
  {"code": "CH", "country": "Switzerland", "agency": "Swiss Fishing Federation (SFV-FSP)", "url": "https://sfv-fsp.ch/de/", "note": "Each canton sells its own licences (Patente); longer-term licences usually require the SaNa competence certificate, short-term visitor permits usually do not."},
  {"code": "UA", "country": "Ukraine", "agency": "State Agency for Fisheries (Derzhrybagentstvo) – Amateur fishing", "url": "https://darg.gov.ua/diialnist/liubytelske-rybalstvo", "note": "Amateur fishing on public waters needs no licence (daily limit 3 kg plus one fish), but martial-law closures apply in many areas."},
  {"code": "GB", "country": "United Kingdom", "agency": "GOV.UK – Rod fishing licence", "url": "https://www.gov.uk/fishing-licences", "note": "England, Wales and the Border Esk need an Environment Agency rod licence (age 13+); the rest of Scotland needs none but the owner's permission, and Northern Ireland needs its own licence and permit."},
];

export const REGS_AFRICA: CountryRegs[] = [
  {"code": "DZ", "country": "Algeria", "agency": "Algeria Ministry of Agriculture, Rural Development and Fisheries", "url": "https://madr.gov.dz/", "note": "Permits for recreational anglers are handled locally: ask at the lodge, park office or district fisheries office before you fish."},
  {"code": "BJ", "country": "Benin", "agency": "Benin Ministry of Agriculture, Livestock and Fisheries (MAEP)", "url": "https://agriculture.gouv.bj/", "note": "Permits for recreational anglers are handled locally: ask at the lodge, park office or district fisheries office before you fish."},
  {"code": "CM", "country": "Cameroon", "agency": "Cameroon Ministry of Livestock, Fisheries and Animal Industries (MINEPIA)", "url": "https://www.minepia.cm/", "note": "Permits for recreational anglers are handled locally: ask at the lodge, park office or district fisheries office before you fish."},
  {"code": "CV", "country": "Cape Verde", "agency": "Government of Cabo Verde", "url": "https://www.governo.cv/", "note": "Sport fishing is licensed under national law; big-game charters normally hold the licence, so confirm with your operator."},
  {"code": "CI", "country": "Côte d’Ivoire", "agency": "Côte d'Ivoire Ministry of Animal and Fisheries Resources", "url": "https://www.ressourcesanimales.gouv.ci/accueil/", "note": "Permits for recreational anglers are handled locally: ask at the lodge, park office or district fisheries office before you fish."},
  {"code": "GH", "country": "Ghana", "agency": "Ghana Fisheries Commission", "url": "https://www.fishcom.gov.gh/", "note": "Permits for recreational anglers are handled locally: ask at the lodge, park office or district fisheries office before you fish."},
  {"code": "KE", "country": "Kenya", "agency": "Kenya Fisheries Service", "url": "https://kefs.go.ke/", "note": "Since the 2024 Recreational Fisheries Regulations every recreational angler needs a licence (daily to annual), issued through the county government."},
  {"code": "LS", "country": "Lesotho", "agency": "Government of Lesotho", "url": "https://www.gov.ls/", "note": "A fishing permit is needed for Lesotho's rivers and dams; highland lodges sell monthly and annual permits valid nationwide."},
  {"code": "LR", "country": "Liberia", "agency": "Liberia National Fisheries and Aquaculture Authority (NaFAA)", "url": "https://www.nafaa.gov.lr/", "note": "Permits for recreational anglers are handled locally: ask at the lodge, park office or district fisheries office before you fish."},
  {"code": "MR", "country": "Mauritania", "agency": "Mauritania Ministry of Fisheries and Maritime Economy", "url": "https://www.peches.gov.mr/", "note": "Permits for recreational anglers are handled locally: ask at the lodge, park office or district fisheries office before you fish."},
  {"code": "MU", "country": "Mauritius", "agency": "Mauritius Ministry of Blue Economy – Fisheries", "url": "https://blueconomy.govmu.org/Pages/Fisheries.aspx", "note": "Ask the Fisheries Division or your charter operator about the rules; marine parks and fishing reserves restrict what you may take."},
  {"code": "YT", "country": "Mayotte", "agency": "Mayotte Marine Natural Park", "url": "https://parc-marin-mayotte.fr/", "note": "Fishing and shellfish gathering in the lagoon follow prefectoral rules and the marine park's protections; check before you fish."},
  {"code": "MA", "country": "Morocco", "agency": "Maroc.ma – Freshwater fishing season (ANEF)", "url": "https://www.maroc.ma/fr/actualites/peche-continentale-ouverture-officielle-de-la-saison-2026-2027", "note": "Freshwater fishing is regulated by the National Agency for Water and Forests (ANEF), which sets the season, quotas, minimum sizes and no-kill waters."},
  {"code": "MZ", "country": "Mozambique", "agency": "Mozambique National Fisheries Administration (ADNAP)", "url": "https://adnap.gov.mz/", "note": "Recreational and sport fishing, at sea and inland, is licensed under the 2021 regulation; lodges and charters usually arrange it, so confirm with them."},
  {"code": "NA", "country": "Namibia", "agency": "Namibia Ministry of Fisheries and Marine Resources", "url": "https://mfmr.gov.na/", "note": "A recreational angling licence is required both on the coast and on inland rivers; buy it at ministry offices."},
  {"code": "NG", "country": "Nigeria", "agency": "Nigeria Federal Ministry of Marine and Blue Economy", "url": "https://fmmbe.gov.ng/", "note": "Permits for recreational anglers are handled locally: ask at the lodge, park office or district fisheries office before you fish."},
  {"code": "RE", "country": "Réunion", "agency": "Carte de pêche – French angling federations", "url": "https://www.cartedepeche.fr/", "note": "Freshwater fishing needs a French carte de pêche from the Réunion angling federation, sold online; sea angling needs none, but the west-coast marine reserve limits fishing."},
  {"code": "RW", "country": "Rwanda", "agency": "Rwanda Ministry of Agriculture and Animal Resources", "url": "https://www.minagri.gov.rw/", "note": "Permits for recreational anglers are handled locally: ask at the lodge, park office or district fisheries office before you fish."},
  {"code": "SN", "country": "Senegal", "agency": "Senegal Ministry of Fisheries and Maritime Economy", "url": "https://mpem.gouv.sn/", "note": "Permits for recreational anglers are handled locally: ask at the lodge, park office or district fisheries office before you fish."},
  {"code": "SC", "country": "Seychelles", "agency": "Seychelles Fishing Authority", "url": "https://www.sfa.sc/", "note": "Fishing charters operate under SFA licences, so ask your operator about permits; marine national parks have their own rules."},
  {"code": "SL", "country": "Sierra Leone", "agency": "Sierra Leone Ministry of Fisheries and Marine Resources", "url": "https://www.mfmr.gov.sl/", "note": "Permits for recreational anglers are handled locally: ask at the lodge, park office or district fisheries office before you fish."},
  {"code": "ZA", "country": "South Africa", "agency": "Department of Forestry, Fisheries and the Environment", "url": "https://www.dffe.gov.za/", "note": "Sea and estuary angling needs a DFFE recreational permit (online or at the Post Office); freshwater angling licences are issued by the provinces."},
  {"code": "SS", "country": "South Sudan", "agency": "South Sudan Ministry of Livestock and Fisheries", "url": "https://mlf.gov.ss/", "note": "Permits for recreational anglers are handled locally: ask at the lodge, park office or district fisheries office before you fish."},
  {"code": "SH", "country": "St. Helena", "agency": "St Helena Government – Fishing licence system", "url": "https://www.sainthelena.gov.sh/new-fishing-licence-system/", "note": "Any fishing from a boat needs a licence, which has a recreational category for angling, spearfishing and lobster potting."},
  {"code": "TZ", "country": "Tanzania", "agency": "Tanzania Ministry of Livestock and Fisheries", "url": "https://www.mifugouvuvi.go.tz/", "note": "Permits for recreational anglers are handled locally: ask at the lodge, park office or district fisheries office before you fish."},
  {"code": "TG", "country": "Togo", "agency": "Togo Ministry of Agriculture, Fisheries, Animal Resources and Food Sovereignty", "url": "https://agriculture.gouv.tg/", "note": "Permits for recreational anglers are handled locally: ask at the lodge, park office or district fisheries office before you fish."},
  {"code": "TN", "country": "Tunisia", "agency": "Tunisia Ministry of Agriculture, Water Resources and Fisheries", "url": "https://www.agriculture.tn/", "note": "Permits for recreational anglers are handled locally: ask at the lodge, park office or district fisheries office before you fish."},
  {"code": "UG", "country": "Uganda", "agency": "Uganda Ministry of Agriculture, Animal Industry and Fisheries", "url": "https://www.agriculture.go.ug/", "note": "Ask your lodge about sport-fishing permits; inside national parks such as Murchison Falls, Uganda Wildlife Authority rules apply."},
  {"code": "ZM", "country": "Zambia", "agency": "Zambia Ministry of Fisheries and Livestock", "url": "https://www.mfl.gov.zm/", "note": "Permits for recreational anglers are handled locally: ask at the lodge, park office or district fisheries office before you fish."},
  {"code": "ZW", "country": "Zimbabwe", "agency": "Zimbabwe Parks and Wildlife Management Authority (ZimParks)", "url": "https://zimparks.org.zw/", "note": "Fishing in national and recreational parks, including the Kariba shoreline, falls under ZimParks; buy any permit at the park office or through your lodge."},
];

/**
 * A country's rule on picking wild plants and fungi, by ISO 3166 alpha-2 code. Empty on purpose.
 *
 * It held one-line statements of law for 26 European countries and South Africa with no source and no
 * date, which the 2 November 2026 audit of the Ottawa pages ruled out: a printed legal claim must be a
 * regulator's own rule with its source and the date it was read. An entry goes back in only with all
 * of that, region by region as each country's rule is read from the statute or the agency page.
 */
export type ForageLaw = { text: string; source: string; url: string; checked: string };
export const FORAGE_LAW: Record<string, ForageLaw> = {};

const byCode = (rows: RegsEntry[]) => new Map(rows.map((r) => [r.code, r]));
const CA = byCode(REGS_CA);
const US = byCode(REGS_US);
const WORLD = byCode([...REGS_EUROPE, ...REGS_AFRICA]);
const link = ({ agency, url, note }: RegsLink): RegsLink => (note ? { agency, url, note } : { agency, url });

/** The official regulation source for a province or state (CA/US), or for a country elsewhere. */
export function getRegsLink(place: Pick<Place, "countryCode" | "admin1Code">): RegsLink | null {
  const cc = place.countryCode.toUpperCase();
  const row = cc === "CA" ? CA.get(place.admin1Code ?? "") : cc === "US" ? US.get(place.admin1Code ?? "") : WORLD.get(cc);
  return row ? link(row) : null;
}

/** The country's rule on foraging, where we have one. */
export function forageLawFor(place: Pick<Place, "countryCode">): string | null {
  const law = FORAGE_LAW[place.countryCode.toUpperCase()];
  return law ? `${law.text} (${law.source}, checked ${law.checked}.)` : null;
}
