/**
 * The seven fish that swim in the lake-through-the-year diagram on /fishing,
 * each with the water temperature it seeks (°C). Taken from the LakeYear
 * client props on the captured live page; the temperature pairs are printed
 * nowhere else on the site.
 */
export const LAKE_FISH: { slug: string; name: string; tempC: [number, number] }[] = [
  { slug: "lake-trout", name: "Lake trout", tempC: [9, 13] },
  { slug: "walleye", name: "Walleye", tempC: [19, 23] },
  { slug: "northern-pike", name: "Northern pike", tempC: [17, 24] },
  { slug: "smallmouth-bass", name: "Smallmouth bass", tempC: [20, 27] },
  { slug: "largemouth-bass", name: "Largemouth bass", tempC: [26, 30] },
  { slug: "yellow-perch", name: "Yellow perch", tempC: [18, 24] },
  { slug: "burbot", name: "Burbot", tempC: [4, 12] },
];
