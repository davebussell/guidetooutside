/**
 * The homestead year as tasks keyed to climate signals rather than dates, so
 * one list serves both hemispheres and the tropics: a task comes due when its
 * signal arrives where the reader lives (src/lib/homestead/signals.ts works out
 * when that is). Sources: src/data/homestead/SOURCES.md, cited per task.
 */
import type { SourceId } from "./sources";

export type Signal =
  /** Daylight falls below / rises above `hours`; the window runs `window` days either side unless `offset` says otherwise. */
  | { kind: "daylight-down"; hours: 12 | 14; offset?: [number, number] }
  | { kind: "daylight-up"; hours: 12 | 14; offset?: [number, number] }
  /** Days from the average last spring frost / first autumn frost. */
  | { kind: "frost-spring"; offset: [number, number] }
  | { kind: "frost-fall"; offset: [number, number] }
  /** The span of average nights below `temp`: its start, its whole length, or its end, shifted by `offset` days. */
  | { kind: "nights-below"; temp: 0 | 4; phase: "start" | "during" | "end"; offset?: [number, number] }
  /** The span of average afternoons above `temp`. */
  | { kind: "days-above"; temp: 30; phase: "during" }
  /** Afternoons rising past / falling below the bees' 13 °C foraging threshold. */
  | { kind: "bees"; phase: "start" | "end" }
  /** Days from the first day of the heating season. */
  | { kind: "heating"; offset: [number, number] }
  /** The first month of the rainy / dry season, shifted by `offset` days. */
  | { kind: "rains"; offset: [number, number] }
  | { kind: "dry"; offset: [number, number] }
  /** Between the average last spring frost and first autumn frost, or all year where frost is rare. */
  | { kind: "frost-free" };

export type SignalFamily = "daylight" | "frost" | "freezing" | "heat" | "bees" | "heating" | "rain";

export type HomesteadTask = {
  id: string;
  family: SignalFamily;
  /** The topic page it belongs to (slug under /homesteading). */
  topic: string;
  title: string;
  detail: string;
  signal: Signal;
  /** When the signal comes, in words, for the calendar ("As daylight falls below 14 hours"). */
  when: string;
  sources: SourceId[];
};

export const SIGNAL_FAMILIES: { id: SignalFamily; eyebrow: string; title: string; text: string }[] = [
  {
    id: "daylight",
    eyebrow: "Day length",
    title: "As the days shorten and lengthen",
    text: "Laying and breeding follow the length of the day, which depends only on latitude and date. Near the equator the day stays close to 12 hours all year and these signals never come.",
  },
  {
    id: "frost",
    eyebrow: "Frost dates",
    title: "Around the last spring frost and the first autumn frost",
    text: "The average frost dates for the place: from nearby weather stations where there are any, otherwise from the climate reanalysis. Where frost is rare these tasks do not apply.",
  },
  {
    id: "freezing",
    eyebrow: "Freezing nights",
    title: "When the average night falls below freezing",
    // The audit of 10 November 2026 found the ERA5 grid's dates 7–17 days late in the Acadian towns and 3 weeks late at
    // Richmond against ECCC and NOAA station normals. Day 5 audit, 14 November 2026: 74 towns now read a station's
    // monthly normals (scripts/build-station-normals.ts), so the text names both sources and each town's line says which.
    text: "Worked out from the monthly average lows of the nearest weather station whose normals we have read, or, where there is none, of the ERA5 weather-model grid, a 30 km average that can put these dates days or weeks off a station's. Each town's page says which. Single nights freeze earlier and later than the average, so the start of this span is a deadline, not a first warning.",
  },
  {
    id: "heat",
    eyebrow: "Hot days",
    title: "When the average afternoon passes 30 °C",
    text: "Heat, not cold, is what hurts most homestead animals. Hens' body temperature rises above 27 °C and rabbits stop coping at 35 °C.",
  },
  {
    id: "bees",
    eyebrow: "Bee weather",
    title: "When afternoons pass 13 °C, and when they fall below it",
    text: "Honeybees rarely fly below 13 °C, so the bee year opens and closes with the average afternoon temperature.",
  },
  {
    id: "heating",
    eyebrow: "The heating season",
    title: "Before the months that carry the heating need",
    text: "The heating season is read from heating degree days: the months that each carry at least a twentieth of the year's need.",
  },
  {
    id: "rain",
    eyebrow: "Rain",
    title: "Ahead of the rains, the dry months and the warm season",
    text: "Rainy and dry months come from the place's monthly rainfall. Where rain falls through the year there is no rainy season to prepare for.",
  },
];

export const TASKS: HomesteadTask[] = [
  {
    id: "hens-light-down",
    family: "daylight",
    topic: "laying-hens",
    title: "Laying slows as the days shorten",
    detail:
      "Hens need about 14 hours of light to keep laying; below 12 hours laying falls and often stops. To keep a flock laying, add light before dawn to hold a 14- to 16-hour day, never more than 16, with at least 6 hours of darkness, so the hens still go to roost at dusk. Otherwise let the flock rest.",
    signal: { kind: "daylight-down", hours: 14 },
    when: "As daylight falls below 14 hours",
    sources: ["vtLaying", "azLighting"],
  },
  {
    id: "hens-light-up",
    family: "daylight",
    topic: "laying-hens",
    title: "Days pass 14 hours: natural laying light again",
    detail: "Daylight alone now gives the 14-hour day that keeps hens laying. The Arizona schedule switches added light off once natural daylight passes 14 hours.",
    signal: { kind: "daylight-up", hours: 14 },
    when: "As daylight rises above 14 hours",
    sources: ["azLighting", "vtLaying"],
  },
  {
    id: "goats-season",
    family: "daylight",
    topic: "dairy-goats",
    title: "Does come into season as the days shorten",
    detail:
      "Dairy goats are seasonal breeders: in the north, does come into season from late August to mid-March, mostly September to January. Kids arrive 145 to 155 days after breeding, about five months on. Anglo-Nubians have a longer breeding season than the Swiss breeds.",
    signal: { kind: "daylight-down", hours: 12, offset: [-28, 28] },
    when: "Around the day daylight falls below 12 hours",
    sources: ["isuGoats", "osuNubian"],
  },
  {
    id: "covers-spring",
    family: "frost",
    topic: "season-extension",
    title: "Put cold frames and low tunnels in place",
    detail:
      "Covers can add as much as two to four weeks at the start of the season. Vent cold frames on sunny days, and open tunnels or cut vents before it passes 32 °C (90 °F) underneath.",
    signal: { kind: "frost-spring", offset: [-28, -14] },
    when: "Four to two weeks before the last spring frost",
    sources: ["wsuSeason", "ncsuSeason"],
  },
  {
    id: "harvest-cure",
    family: "frost",
    topic: "food-storage",
    title: "Harvest and cure crops for storage",
    detail: "Cure potatoes for 14 days at 10–16 °C (50–60 °F) before storing them, and cure onions at room temperature for two to four weeks.",
    signal: { kind: "frost-fall", offset: [-28, 0] },
    when: "In the four weeks before the first autumn frost",
    sources: ["umnStorage"],
  },
  {
    id: "covers-fall",
    family: "frost",
    topic: "season-extension",
    title: "Cover crops before the first frost",
    detail:
      "Row covers and low tunnels give 2–3 °C (4–5 °F) of frost protection and can stretch the harvest by two to four weeks. Medium covers protect to about −2 °C, heavy covers to −4 °C. Pin them down against the wind.",
    signal: { kind: "frost-fall", offset: [-14, 7] },
    when: "From two weeks before the first autumn frost",
    sources: ["ncsuSeason", "wsuSeason"],
  },
  {
    id: "manure-autumn",
    family: "frost",
    topic: "compost",
    title: "Spread raw manure on cleared beds",
    detail:
      "Raw manure has to be worked into the soil at least 120 days before harvesting crops that touch the soil, and 90 days before other food crops: the same in the US organic standard (USDA) and Canada's (CAN/CGSB-32.310). Spread on beds cleared after the first frost, it has the winter to break down. The rest of the manure and bedding can go into a hot compost pile.",
    signal: { kind: "frost-fall", offset: [0, 30] },
    when: "In the month after the first autumn frost",
    sources: ["usdaManure", "cgsbOrganic", "uriCompost"],
  },
  {
    id: "barrels-drain",
    family: "freezing",
    topic: "rainwater",
    title: "Drain and disconnect rain barrels",
    detail:
      "Disconnect before the first hard freeze: water expands about 9 % as it freezes, enough to split a full barrel. The date here is worked out from monthly averages (each town's page names the station or the weather-model grid they come from), so if the forecast brings a hard freeze sooner, drain them sooner. Store barrels under cover or upside down, strapped against the wind, and fit a downspout extension to carry roof water away from the house.",
    signal: { kind: "nights-below", temp: 0, phase: "start", offset: [-21, 0] },
    when: "In the three weeks before average nights fall below 0 °C (monthly averages)",
    sources: ["psuRainBarrel"],
  },
  {
    id: "water-freeze",
    family: "freezing",
    topic: "laying-hens",
    title: "Keep water open on freezing nights",
    detail:
      "Hens and ducks cannot break ice. Check water several times a day or set the waterer on a heater; give goats warmed water. Replace metal or plastic perches with flat wooden ones that birds can cover with their feathers.",
    signal: { kind: "nights-below", temp: 0, phase: "start", offset: [0, 21] },
    when: "As average nights fall below 0 °C (monthly averages)",
    sources: ["umdWinter", "nmsuGoats"],
  },
  {
    id: "kits-cold",
    family: "freezing",
    topic: "meat-rabbits",
    title: "Deep, insulated nest boxes for winter litters",
    detail:
      "Newborn kits need at least 28 °C, and a good fur-lined nest holds its middle at 30–35 °C. In freezing weather give the nest box deep bedding and insulation: in the USDA's experience, winter litters survived −26 to −29 °C (−15 to −20 °F) in well-insulated boxes with a good wool nest.",
    signal: { kind: "nights-below", temp: 0, phase: "during" },
    when: "While average nights stay below 0 °C (monthly averages)",
    sources: ["faoRabbits", "usdaRabbits"],
  },
  {
    id: "barrels-reconnect",
    family: "freezing",
    topic: "rainwater",
    title: "Reconnect rain barrels",
    detail: "Wait until the last hard freeze has passed. Winter is the time to clean out sediment and replace worn valves, screens and hoses.",
    signal: { kind: "nights-below", temp: 0, phase: "end", offset: [0, 21] },
    when: "Once average nights rise back above 0 °C (monthly averages)",
    sources: ["psuRainBarrel"],
  },
  {
    id: "cellar-cool",
    family: "freezing",
    topic: "food-storage",
    title: "Night air can now cool the root cellar",
    detail:
      "Open the vents on cold nights and close them whenever it is warmer outside than in the cellar. Keep a thermometer in the coldest spot and another outdoors, and keep apples and pears apart from vegetables: their ethylene damages them.",
    signal: { kind: "nights-below", temp: 4, phase: "start", offset: [0, 28] },
    when: "As average nights fall below 4 °C (monthly averages)",
    sources: ["purdueStorage"],
  },
  {
    id: "heat",
    family: "heat",
    topic: "laying-hens",
    title: "Hot days: shade, cool water and moving air",
    detail:
      "Shade the west side of runs, keep several shaded waterers of cool water, collect eggs often, and keep rabbit hutches out of direct sun with air moving through. Hens' body temperature rises above 27 °C and laying may fall above 32–35 °C; rabbits suffer heat prostration at 35 °C. Goats need shade in extreme heat.",
    signal: { kind: "days-above", temp: 30, phase: "during" },
    when: "While average afternoons stay above 30 °C",
    sources: ["omafraHeat", "azHeat", "faoRabbits", "nmsuGoats"],
  },
  {
    id: "bees-start",
    family: "bees",
    topic: "honeybees",
    title: "Bees begin to forage",
    detail: "Honeybees rarely fly below 13 °C (55 °F). As afternoons pass it, colonies start foraging, strong ones first. Open hives only on warm days above 10 °C (50 °F).",
    signal: { kind: "bees", phase: "start" },
    when: "As average afternoons rise past 13 °C",
    sources: ["pnwBees", "ufBees"],
  },
  {
    id: "bees-end",
    family: "bees",
    topic: "honeybees",
    title: "Foraging ends: judge the winter stores",
    detail:
      "Lift the back of each hive: a hive that lifts easily probably needs food. A colony short of stores can be fed sugar syrup, two parts sugar to one part water, in autumn. In the far north a colony needs about 41 kg (90 lb) of honey to come through winter.",
    signal: { kind: "bees", phase: "end" },
    when: "As average afternoons fall below 13 °C",
    sources: ["ufBees", "pnwBees"],
  },
  {
    id: "wood-split",
    family: "heating",
    topic: "wood-heat",
    title: "Split and stack next winter's wood",
    detail:
      "Split wood needs at least six months to dry below 20 % moisture; beech and spruce get there within a year if stored well, while unsplit rounds can take two years. Stack it off the ground in sun and wind, with the top covered and the sides open.",
    signal: { kind: "heating", offset: [-213, -152] },
    when: "Seven to five months before the heating season",
    sources: ["epaBurn", "lwfFirewood"],
  },
  {
    id: "chimney",
    family: "heating",
    topic: "wood-heat",
    title: "Chimney swept, alarms tested",
    detail:
      "Have a licensed professional clean and inspect the chimney and vents every year, and test carbon-monoxide alarms; there should be one on every level of the house and outside sleeping areas.",
    signal: { kind: "heating", offset: [-45, 0] },
    when: "In the six weeks before the heating season",
    sources: ["bcHeating", "cpscCo"],
  },
  {
    id: "rains-prepare",
    family: "rain",
    topic: "rainwater",
    title: "Before the rains: gutters, screens and the first-flush diverter",
    detail: "Clean the gutters and the first-flush diverter and check the screens, so the first storms wash the roof into the diverter and not into the tank.",
    signal: { kind: "rains", offset: [-21, 0] },
    when: "In the three weeks before the rainy season",
    sources: ["twdbRain", "cdcRain"],
  },
  {
    id: "dry-ration",
    family: "rain",
    topic: "rainwater",
    title: "The dry months begin: the tank has to last",
    detail: "Storage has to carry you through the longest spell without rain. The roof-water figures for your town show how much the dry months draw down a tank.",
    signal: { kind: "dry", offset: [-14, 14] },
    when: "As the dry season begins",
    sources: ["twdbRain"],
  },
  {
    id: "mosquitoes",
    family: "rain",
    topic: "rainwater",
    title: "Screen barrels or empty them every 10 days",
    detail: "Mosquitoes breed in standing water: screen every opening where water enters a barrel or tank, or empty it at least every 10 days.",
    signal: { kind: "frost-free" },
    when: "Through the frost-free season, or all year where frost is rare",
    sources: ["cdcRain"],
  },
];
