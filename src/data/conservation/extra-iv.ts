/**
 * Organisations added for open invitations (agent IV): bodies that run a
 * count, survey or event we feature but were not yet in the continent files.
 * Same schema and verification rules as the continent files: every URL in
 * `links` fetched on 26 October 2026 and answering 200, plus a second source
 * (a public register or a partner's page naming the programme).
 */
import type { Organisation } from "./types";

const V = "2026-10-26";

export const EXTRA_IV_ORGS: Organisation[] = [
  {
    slug: "the-tree-council",
    name: "The Tree Council",
    scope: "national",
    continent: "europe",
    countryCode: "GB",
    topics: ["forests", "youth"],
    areas: [{ kind: "country", countries: ["GB"] }],
    blurb:
      "A UK tree charity that runs National Tree Week at the start of each planting season and a UK-wide network of volunteer Tree Wardens. It also gives schools resources and training through its young learning programme.",
    asks: ["Join or hold a National Tree Week event", "Volunteer as a Tree Warden", "Bring the young learning programme into your school"],
    links: {
      home: "https://treecouncil.org.uk/",
      events: "https://treecouncil.org.uk/seasonal-campaigns/national-tree-week/",
      volunteer: "https://treecouncil.org.uk/tree-wardens/",
      youth: "https://treecouncil.org.uk/young-learning/",
      donate: "https://treecouncil.org.uk/who-we-are/support-us/donate-to-plant-and-protect-trees/",
    },
    registry: {
      body: "Charity Commission",
      id: "279000",
      url: "https://register-of-charities.charitycommission.gov.uk/en/charity-search/-/charity-details/279000",
    },
    kind: "charity",
    verified: V,
    sources: [
      "https://treecouncil.org.uk/",
      "https://treecouncil.org.uk/seasonal-campaigns/national-tree-week/",
      "https://treecouncil.org.uk/tree-wardens/",
      "https://register-of-charities.charitycommission.gov.uk/en/charity-search/-/charity-details/279000",
    ],
  },
  {
    slug: "ocean-wise",
    name: "Ocean Wise Conservation Association",
    shortName: "Ocean Wise",
    scope: "national",
    continent: "north-america",
    countryCode: "CA",
    topics: ["water", "wildlife", "youth"],
    areas: [{ kind: "country", countries: ["CA", "US"] }],
    blurb:
      "A Vancouver conservation charity that runs the Ocean Wise Shoreline Cleanup, in which volunteers clear and record litter wherever water meets land, along with youth programmes and whale research. The cleanups began on a Stanley Park beach in 1994 and now run across Canada and in the United States.",
    asks: ["Join a shoreline cleanup near you", "Lead a cleanup with your school, group or friends", "Join an Ocean Wise youth programme"],
    links: {
      home: "https://ocean.org/",
      volunteer: "https://ocean.org/action/join-a-shoreline-cleanup/",
      events: "https://ocean.org/action/lead-a-shoreline-cleanup/",
      youth: "https://ocean.org/educate_empower/youth-programs/",
    },
    registry: { body: "CRA", id: "119282119RR0001", url: "https://apps.cra-arc.gc.ca/ebci/hacc/srch/pub/dsplyQckVw/119282119RR0001/0" },
    kind: "charity",
    places: ["vancouver-british-columbia"],
    // Its home page, "Who we are" (read 13 November 2026): "From Vancouver to Toronto".
    placeSources: { "vancouver-british-columbia": "https://ocean.org/" },
    verified: V,
    sources: [
      "https://ocean.org/pollution-plastics/shoreline-cleanup/",
      "https://ocean.org/action/lead-a-shoreline-cleanup/",
      "https://ocean.org/action/join-a-shoreline-cleanup/",
      "https://apps.cra-arc.gc.ca/ebci/hacc/srch/pub/dsplyQckVw/119282119RR0001/0",
    ],
  },
  // A university programme (FitzPatrick Institute of African Ornithology, University of Cape Town), so no
  // charity register entry; the second source is SANBI's BIRDIE project page, which names CWAC as one of the
  // two citizen-science bird datasets it draws on.
  {
    slug: "cwac",
    name: "Coordinated Waterbird Counts",
    shortName: "CWAC",
    scope: "regional",
    continent: "africa",
    topics: ["birds", "water"],
    areas: [{ kind: "country", countries: ["ZA", "KE"] }],
    blurb:
      "A citizen-science programme, started in 1992 and curated by a university ornithology institute in Cape Town, in which volunteers count the waterbirds on registered wetlands twice a year. Counts run across South Africa and Kenya, in a summer window from mid-January to mid-February and through July.",
    asks: ["Adopt a registered wetland near you", "Count it once between 15 January and 15 February", "Count it again in July"],
    links: {
      home: "https://cwac.birdmap.africa/",
      volunteer: "https://cwac.birdmap.africa/sites.php",
      join: "https://sabap2.birdmap.africa/register",
    },
    kind: "programme",
    founded: 1992,
    verified: V,
    sources: [
      "https://cwac.birdmap.africa/",
      "https://cwac.birdmap.africa/about.php",
      "https://cwac.birdmap.africa/instructions_protocol.php",
      "https://www.sanbi.org/biodiversity/building-knowledge/biodiversity-monitoring-assessment/freshwater-programme-birdie-project",
    ],
  },
];
