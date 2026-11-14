/**
 * Breeds for the homestead animals, with the climate fit their sources state.
 * `cold` and `heat` record only what a source says; "unstated" means the
 * source is silent, not that the breed copes badly. Sources: see
 * src/data/homestead/SOURCES.md (Livestock Conservancy breed pages, the
 * American Dairy Goat Association, Oklahoma State University's Breeds of
 * Livestock, USDA Agriculture Handbook 309, Fernandes et al. 2023).
 */
import type { SourceId } from "./sources";

export type Animal = "hen" | "duck" | "goat" | "rabbit";
/** "cool": the source says the breed does best in cooler conditions, which is not the same as cold-hardy. */
export type Fit = "suited" | "cool" | "poor" | "unstated";

export type Breed = {
  name: string;
  animal: Animal;
  /** What the breed is kept for. */
  use: string;
  /** Cold climates: "suited" where the source calls it cold-hardy, "cool" where it says best in cooler conditions. */
  cold: Fit;
  /** Hot climates: "suited" where the source calls it heat-tolerant. */
  heat: Fit;
  /** One plain line from the source. */
  note: string;
  source: SourceId;
};

export const BREEDS: Breed[] = [
  // Laying hens
  {
    name: "Chantecler",
    animal: "hen",
    use: "Eggs and meat",
    cold: "suited",
    heat: "poor",
    note: "Bred in Quebec from 1908 for cold winters: a small cushion comb and almost no wattles resist frostbite. Up to 220 light-brown eggs a year, a good winter layer; does not do well in warm climates.",
    source: "lcChantecler",
  },
  {
    name: "Brahma",
    animal: "hen",
    use: "Eggs and meat",
    cold: "suited",
    heat: "poor",
    note: "Pea comb; long known as the chicken least troubled by cold, and lays most of its eggs from October to May. Does not tolerate heat well. Mud on the feathered feet can freeze, so it needs dry ground.",
    source: "lcBrahma",
  },
  {
    name: "Wyandotte",
    animal: "hen",
    use: "Eggs and meat",
    cold: "suited",
    heat: "unstated",
    note: "A low rose comb and a cold-hardy build. Brown eggs; hens about 3 kg (6.5 lb).",
    source: "lcWyandotte",
  },
  {
    name: "Plymouth Rock",
    animal: "hen",
    use: "Eggs and meat",
    cold: "suited",
    heat: "unstated",
    note: "Cold-hardy because it feathers early. About 200 large brown eggs a year; hens are good sitters and mothers.",
    source: "lcPlymouthRock",
  },
  {
    name: "Sussex",
    animal: "hen",
    use: "Eggs and meat",
    cold: "suited",
    heat: "poor",
    note: "Does well in winter but is not fond of heat. 200 to 250 tan to brown eggs a year; often broody.",
    source: "lcSussex",
  },
  {
    name: "Rhode Island Red",
    animal: "hen",
    use: "Eggs and meat",
    cold: "unstated",
    heat: "unstated",
    note: "Known for hardiness and for laying in marginal conditions: 200 to 300 brown eggs a year from about six months old.",
    source: "lcRir",
  },
  {
    name: "Australorp",
    animal: "hen",
    use: "Eggs",
    cold: "unstated",
    heat: "poor",
    note: "250 or more tinted to light-brown eggs a year. The black plumage overheats, so it needs ample shade in warm weather.",
    source: "lcAustralorp",
  },
  {
    name: "Leghorn",
    animal: "hen",
    use: "Eggs",
    cold: "suited",
    heat: "suited",
    note: "Both cold and heat tolerant; 150 to 320 white eggs a year, rarely broody, often flighty. Choose the rose-comb form for cold places: the large single comb is prone to frostbite.",
    source: "lcLeghorn",
  },
  {
    name: "Naked Neck",
    animal: "hen",
    use: "Eggs and meat",
    cold: "unstated",
    heat: "suited",
    note: "The naked-neck gene leaves the neck bare, which lets the bird shed heat; such birds adapt, perform and breed better than fully feathered birds in hot, humid climates.",
    source: "nakedNeck",
  },
  // Ducks
  {
    name: "Khaki Campbell",
    animal: "duck",
    use: "Eggs",
    cold: "suited",
    heat: "suited",
    note: "Averages 250 to 340 eggs a year from 5 to 7 months old. Good in both hot and cold climates, from deserts reaching 38 °C (100 °F) to winters below −18 °C (0 °F) for weeks. An active forager.",
    source: "lcCampbell",
  },
  {
    name: "Runner",
    animal: "duck",
    use: "Eggs",
    cold: "suited",
    heat: "suited",
    note: "Good strains lay more than 250 white or blue-green eggs a year. The most active forager of all duck breeds; does well in both cold and hot climates.",
    source: "lcRunner",
  },
  // Dairy goats
  {
    name: "Anglo-Nubian",
    animal: "goat",
    use: "Milk",
    cold: "unstated",
    heat: "suited",
    note: "The dairy breed best suited to hot conditions, and used to improve local goats in tropical countries. Less milk than the Swiss breeds but 4 to 5% butterfat, and a longer breeding season.",
    source: "osuNubian",
  },
  {
    name: "Alpine",
    animal: "goat",
    use: "Milk",
    cold: "suited",
    heat: "suited",
    note: "Thrives in any climate while keeping good health and production. Does at least 76 cm (30 in) tall and 61 kg (135 lb).",
    source: "adga",
  },
  {
    name: "LaMancha",
    animal: "goat",
    use: "Milk",
    cold: "unstated",
    heat: "unstated",
    note: "Developed in the United States; produces well in a variety of climates and conditions.",
    source: "adga",
  },
  {
    name: "Saanen",
    animal: "goat",
    use: "Milk",
    cold: "cool",
    heat: "poor",
    note: "A heavy milker from Switzerland's Saanen valley, sensitive to heat and strong sun: it does best in cooler conditions and shade is essential. Milk 3 to 4% fat.",
    source: "osuSaanen",
  },
  {
    name: "Toggenburg",
    animal: "goat",
    use: "Milk",
    cold: "cool",
    heat: "unstated",
    note: "The oldest known dairy breed, from Switzerland; performs best in cooler conditions. Average fat test 3.7%.",
    source: "osuToggenburg",
  },
  {
    name: "Nigerian Dwarf",
    animal: "goat",
    use: "Milk",
    cold: "unstated",
    heat: "unstated",
    note: "A small goat, 43 to 57 cm (17 to 22.5 in) tall, giving a proportionate amount of milk with high butterfat.",
    source: "adga",
  },
  // Meat rabbits
  {
    name: "New Zealand White",
    animal: "rabbit",
    use: "Meat",
    cold: "unstated",
    heat: "unstated",
    note: "With the Californian, the most desirable white meat breed for production in the USDA handbook.",
    source: "usdaRabbits",
  },
  {
    name: "Californian",
    animal: "rabbit",
    use: "Meat",
    cold: "unstated",
    heat: "unstated",
    note: "A medium meat breed of 3.6 to 4.8 kg (8 to 10.5 lb) at maturity.",
    source: "usdaRabbits",
  },
  {
    name: "Champagne d'Argent",
    animal: "rabbit",
    use: "Meat",
    cold: "unstated",
    heat: "unstated",
    note: "A meat and show breed of 4.1 to 5.4 kg (9 to 12 lb) at maturity.",
    source: "usdaRabbits",
  },
];

export const ANIMAL_LABEL: Record<Animal, string> = {
  hen: "Laying hens",
  duck: "Ducks",
  goat: "Dairy goats",
  rabbit: "Meat rabbits",
};

export const ANIMAL_TOPIC: Record<Animal, string> = {
  hen: "laying-hens",
  duck: "ducks",
  goat: "dairy-goats",
  rabbit: "meat-rabbits",
};

export const breedsOf = (animal: Animal) => BREEDS.filter((b) => b.animal === animal);
