/**
 * The facts panels of the 88 fish pages (/wildlife/<slug>): "<name> facts",
 * the size slider (FishSize props), "Questions people ask about <name>" and
 * "Checked against these sources".
 *
 * Extracted verbatim from the captured /wildlife/<slug> pages and the FishSize
 * client props in their RSC payloads. Field names follow the live
 * FishFacts type (src/lib/facts-types.ts in the 7 October source, seen in the
 * session transcript); its `tempC` pair is not printed anywhere on the live
 * site and could not be recovered. The "Size" row is derived:
 * `Most adults ${a}–${b} cm (${round(a/2.54)}–${round(b/2.54)} in); the largest
 * measured about ${max} cm (${round(max/2.54)} in).` — identical on all 88
 * pages. The FAQ heading uses the fish name without its bracketed part,
 * lower-cased. Every page reads "last reviewed October 2026" (FACTS_REVIEWED
 * in edible-facts.ts).
 */

export type FishShape = "torpedo" | "trout" | "deep" | "eel" | "flat";

export type FishFacts = {
  /** "Also called" */
  otherNames: string;
  family: string;
  /** "Native range" */
  nativeRange: string;
  /** "Introduced to" */
  introduced?: string;
  habitat: string;
  /** "Water temperature" */
  temp: string;
  /** Most adults, cm. */
  typicalCm: [number, number];
  /** The largest measured, cm. */
  maxCm: number;
  record: string;
  lifespan: string;
  /** "What it eats" */
  diet: string;
  spawning: string;
  /** "Young fish" */
  young?: string;
  /** "Teeth and mouth" */
  mouth?: string;
  /** "Look-alikes" */
  lookalikes: string;
  eating: string;
  status?: string;
  /** The FishSize silhouette, where it is not the default. */
  shape?: FishShape;
  faqs: { q: string; a: string }[];
  sources: { label: string; url: string }[];
};

export const FISH_FACTS: Record<string, FishFacts> = {
 "walleye": {
  "otherNames": "Pickerel or yellow pickerel in much of Canada; doré (doré jaune) in Quebec. It is not a true pickerel — those are small members of the pike family (Esox), such as chain and grass pickerel.",
  "family": "Percidae, the perch family. The walleye is its largest member.",
  "nativeRange": "Most of Canada east of the Rockies and the north-central United States: the Arctic, St. Lawrence–Great Lakes and Mississippi basins, from Labrador and Quebec west to the Mackenzie River in the Northwest Territories, and south to Alabama and Arkansas.",
  "introduced": "Stocked across much of the United States; some states have self-sustaining populations, others keep them going with yearly stocking. It is now spreading in the Canadian part of the Columbia River system.",
  "habitat": "Big lakes and rivers. It does well in large, shallow, murky lakes and in the deeper water of clear ones, over rock, gravel or sand. Its light-shy eyes send it deep or into shade on bright days; it moves shallow to feed at dusk and after dark.",
  "temp": "Cool water. Preferred range about 19–23°C (66–73°F). It spawns in spring when the water is about 4–11°C (39–52°F).",
  "record": "IGFA all-tackle world record: 11.34 kg (25 lb), Mabry Harper, Old Hickory Lake, Tennessee, 1960. It has been questioned over the years but still stands. Ontario’s record is 10.1 kg (22.3 lb), from the Niagara River in 1943.",
  "lifespan": "Usually given as 12–26 years; the oldest aged about 29.",
  "diet": "Mostly fish — yellow perch above all, but whatever is plentiful, including young bass, pike and sunfish. Also insects, crayfish, snails, frogs and mudpuppies. It feeds hardest at dawn, dusk and through the night.",
  "spawning": "In spring, from about March to June depending on latitude, over rock shoals in rivers and lakes when the water is 4–11°C. There is no nest and no parental care; a big female can release over 600,000 eggs.",
  "young": "Males mature at 2–4 years and females at 3–6. Growth is slower in the north, and females grow faster than males.",
  "mouth": "A large mouth reaching past the middle of the eye, with sharp canine teeth. Handle by the body, not the lip. Its cousin the yellow perch has no canines.",
  "lookalikes": "Sauger is the close look-alike: a walleye has a bold white tip on the lower lobe of the tail, while a sauger has rows of black dots on the spiny dorsal fin and no white tail tip. Their hybrid is the saugeye. Yellow perch is deeper-bodied, with bold vertical bars and no canine teeth.",
  "eating": "One of the most prized eating fish in fresh water, with thick, white fillets. Check your province or state’s fish consumption advisory, especially for large predators.",
  "status": "Common and secure across its range (global rank G5).",
  "typicalCm": [
   30,
   76
  ],
  "maxCm": 107,
  "shape": "torpedo",
  "faqs": [
   {
    "q": "Where do walleye live?",
    "a": "Across most of Canada east of the Rockies and the north-central United States — from Labrador and Quebec to the Northwest Territories, and south to Alabama and Arkansas. Look in big lakes and rivers: deep or shaded by day, then up on shoals and weed edges to feed at dusk."
   },
   {
    "q": "What is a “wild eye” fish?",
    "a": "Almost certainly the walleye. Its eye has a reflective layer, like a cat’s, that lets it hunt in dim light and makes it look glassy or whitish out of the water. A “wall-eye” is an old word for an eye with a whitish iris — hence the name."
   },
   {
    "q": "Is a walleye a pickerel?",
    "a": "Same fish, different name. Much of Canada calls the walleye pickerel or yellow pickerel, and Quebec calls it doré. Biologically it belongs to the perch family. True pickerels, like chain and grass pickerel, are small members of the pike family."
   },
   {
    "q": "Do walleye have teeth?",
    "a": "Yes — sharp canine teeth, set in a big mouth that reaches past the middle of the eye. Hold a walleye by the body, not the lip. The yellow perch, a close cousin, has no canines, which is a quick way to tell a small walleye from a perch."
   },
   {
    "q": "How big do walleye get?",
    "a": "Most adults are 30–76 cm (12–30 in) and 0.2–4.2 kg (under 10 lb); the average walleye is around 1 kg (2 lb). The IGFA all-tackle world record is 11.34 kg (25 lb), from Old Hickory Lake, Tennessee, in 1960."
   },
   {
    "q": "How do you tell a walleye from a sauger?",
    "a": "Look at the tail and the first dorsal fin. A walleye has a bright white tip on the lower lobe of its tail. A sauger has rows of distinct black dots on the spiny dorsal fin and lacks the white tip. Sauger also stay smaller."
   }
  ],
  "sources": [
   {
    "label": "USGS Nonindigenous Aquatic Species — Walleye",
    "url": "https://nas.er.usgs.gov/queries/FactSheet.aspx?speciesID=831"
   },
   {
    "label": "Fisheries and Oceans Canada — Walleye",
    "url": "https://www.dfo-mpo.gc.ca/species-especes/profiles-profils/walleye-dore-jaune-eng.html"
   },
   {
    "label": "Ontario Freshwater Fishes Life History Database — Walleye",
    "url": "https://www.ontariofishes.ca/fish_detail.php?FID=156"
   },
   {
    "label": "Michigan DNR — Walleye",
    "url": "https://www.michigan.gov/dnr/education/michigan-species/fish-species/walleye"
   },
   {
    "label": "FishBase — Sander vitreus",
    "url": "https://www.fishbase.se/summary/Sander-vitreus.html"
   }
  ]
 },
 "smallmouth-bass": {
  "otherNames": "Smallie, northern smallmouth bass; achigan à petite bouche in Quebec.",
  "family": "Centrarchidae, the sunfish family — with largemouth bass, crappies and bluegill.",
  "nativeRange": "The St. Lawrence–Great Lakes, Hudson Bay (Red River) and Mississippi basins, from southern Quebec west to North Dakota and south to northern Alabama and eastern Oklahoma, plus Atlantic and Gulf drainages from Virginia to central Texas.",
  "introduced": "Widely stocked across the United States, western North America, Europe and Africa. In Arizona it has wiped out or reduced some native fish, and it eats young Pacific salmon on their way to sea.",
  "habitat": "Clear, rocky water: gravel-bottomed runs and flowing pools of rivers, and rocky or sandy shallows of lakes, often 5–7 m (16–23 ft) deep. It likes to wait near rock ledges, islands, docks and weedy banks.",
  "temp": "Cool to warm water. Preferred range about 20–27°C (68–81°F); Quebec biologists put its favourite near 20°C. Spawning starts at about 16–18°C (61–64°F).",
  "record": "IGFA all-tackle world record: 5.41 kg (11 lb 15 oz), David Hayes, Dale Hollow Lake on the Tennessee–Kentucky line, 1955. The record was struck in 1996 and reinstated in 2005. Ontario’s record is 4.46 kg (9 lb 13 oz), from Birchbark Lake in 1954.",
  "lifespan": "Usually 8–18 years; the oldest aged about 26.",
  "diet": "Crayfish, fish, frogs, insects and aquatic insect larvae — at the surface, in mid-water or on the bottom. Young start on plankton, then insects. In winter it gathers near the bottom and barely feeds until March.",
  "spawning": "Late spring to early summer, once the water reaches 16–18°C. The male sweeps a nest 30–180 cm (1–6 ft) across on sand or gravel, often beside a log or rock, in 0.6–6 m (2–20 ft) of water. He guards the eggs until they hatch in 4–10 days, then the fry for a few days. Many return to the same nest site year after year.",
  "young": "Young smallmouth have a tail that is orange at the base, then a black band, then a pale tip — a handy tell. Males mature at about 3–5 years, females at 4–6.",
  "mouth": "The upper jaw reaches only to about the middle of the eye, never past it. The eye is red or orange, and a dark band runs through it across the cheek.",
  "lookalikes": "Largemouth bass: its jaw runs past the back of the eye, its two dorsal fins are almost separate (joined on a smallmouth), and it wears a dark stripe along the side rather than vertical bars. The jaw test is clearest on adults.",
  "eating": "Firm, white fillets, but many anglers release bass — especially big fish and nest-guarding males in spring. Check your province or state’s fish consumption advisory, especially for large predators.",
  "typicalCm": [
   25,
   46
  ],
  "maxCm": 69,
  "shape": "deep",
  "faqs": [
   {
    "q": "How big do smallmouth bass get?",
    "a": "Most adults are 25–46 cm (10–18 in) and 0.2–1.3 kg (under 3 lb). In the St. Lawrence and its river lakes they can top 4 kg (9 lb). The IGFA all-tackle record is 5.41 kg (11 lb 15 oz), from Dale Hollow Lake on the Tennessee–Kentucky line, 1955."
   },
   {
    "q": "Where are smallmouth bass native?",
    "a": "Eastern-central North America: the Great Lakes, St. Lawrence and Mississippi basins from southern Quebec to North Dakota, south to northern Alabama and eastern Oklahoma. In Quebec it lives in many southern watersheds and down the St. Lawrence to about Montmagny. Elsewhere it was stocked."
   },
   {
    "q": "How do you tell a smallmouth from a largemouth bass?",
    "a": "Check the jaw: on a smallmouth it ends below the middle of the eye; on a largemouth it runs past the back of the eye. Smallmouth are bronze-brown with vertical bars; largemouth are green with a dark side stripe. Smallmouth dorsal fins are joined, largemouth fins nearly separate."
   },
   {
    "q": "What do baby smallmouth bass look like?",
    "a": "Small, bronze-brown and barred, with a three-colour tail: orange at the base, a black band, then a pale edge. That tail marking is the easiest way to tell a young smallmouth from a young largemouth."
   },
   {
    "q": "When do smallmouth bass spawn?",
    "a": "In late spring and early summer, when the water warms to about 16–18°C (61–64°F). The male builds a gravel nest and guards the eggs and fry on his own, which is why many areas protect bass during the spawn."
   },
   {
    "q": "Are smallmouth bass invasive?",
    "a": "Outside their native range, they can be. In Arizona they have wiped out or reduced some native fish, and in Pacific salmon rivers they eat young salmon heading to sea. Never move live fish from one water to another."
   }
  ],
  "sources": [
   {
    "label": "USGS Nonindigenous Aquatic Species — Smallmouth Bass",
    "url": "https://nas.er.usgs.gov/queries/FactSheet.aspx?speciesID=396"
   },
   {
    "label": "Gouvernement du Québec — Achigan à petite bouche",
    "url": "https://www.quebec.ca/agriculture-environnement-et-ressources-naturelles/faune/animaux-sauvages-quebec/fiches-especes-fauniques/achigan-petite-bouche"
   },
   {
    "label": "Ontario Freshwater Fishes Life History Database — Smallmouth Bass",
    "url": "https://www.ontariofishes.ca/fish_detail.php?FID=129"
   },
   {
    "label": "Bassmaster — World record smallmouth back in the record book",
    "url": "https://www.bassmaster.com/news/world-record-smallmouth-david-l-hayes-back-record-book"
   },
   {
    "label": "FishBase — Micropterus dolomieu",
    "url": "https://www.fishbase.se/summary/Micropterus-dolomieu.html"
   }
  ]
 },
 "largemouth-bass": {
  "otherNames": "Bass, black bass, green bass; achigan à grande bouche in Quebec. Long published as Micropterus salmoides; newer references call it Micropterus nigricans.",
  "family": "Centrarchidae, the sunfish family. It is one of the black basses (genus Micropterus).",
  "nativeRange": "The St. Lawrence–Great Lakes, Hudson Bay (Red River) and Mississippi basins from southern Quebec to Minnesota and south to the Gulf coast; Atlantic drainages from North Carolina to Florida; and Gulf drainages from southern Florida into northern Mexico.",
  "introduced": "Stocked for sport across almost all of the United States, including Hawaii and Puerto Rico, and in Europe, Asia and Africa. Where it is introduced it often cuts down small native fish.",
  "habitat": "Warm, shallow, weedy water: lakes, bays, ponds, marshes, reservoirs and slow river backwaters, usually less than 6 m (20 ft) deep, around weeds, logs and docks. A freshwater fish that also lives in brackish tidal rivers and coastal marshes.",
  "temp": "Warm water. Preferred range about 26–30°C (79–86°F). It lies nearly dormant through the winter, and spawns at about 15–21°C (59–70°F).",
  "record": "IGFA all-tackle world record: 10.09 kg (22 lb 4 oz) — a tie between George Perry’s fish from Montgomery Lake, Georgia (1932) and Manabu Kurita’s from Lake Biwa, Japan (2009). Ontario’s record is 4.73 kg (10.4 lb).",
  "lifespan": "Usually given as 12–23 years.",
  "diet": "Fish first, plus crayfish and frogs. Young fish eat small crustaceans and insects before moving on to fish. It sometimes eats its own kind.",
  "spawning": "Late spring or early summer, at about 15–21°C. The male sweeps a nest in shallow water, and guards the eggs and then the young fry.",
  "young": "Juveniles show the dark side stripe clearly and a dusky black edge on the tail. The jaw is shorter in young fish, so the “past the eye” test works best on adults.",
  "mouth": "A big mouth: in adults the upper jaw reaches back past the eye. Unlike many predators, it has no teeth on its tongue.",
  "lookalikes": "Smallmouth bass: the jaw stops at mid-eye, the two dorsal fins are joined, and it has vertical bars instead of a side stripe. Florida bass looks almost the same and is told apart mainly by genetics, scale counts and larger size.",
  "eating": "FishBase rates it an excellent food fish, but many bass anglers release their fish. Check your province or state’s fish consumption advisory, especially for large predators.",
  "typicalCm": [
   30,
   53
  ],
  "maxCm": 97,
  "shape": "deep",
  "faqs": [
   {
    "q": "Can largemouth bass live in salt water?",
    "a": "Not in the sea — it is a freshwater fish — but it copes with brackish water. In Alabama’s Mobile-Tensaw Delta, largemouth bass stayed put even when the water reached 15 parts per thousand salt, and young bass grew faster in the saltier downstream reaches. Biologists treat these coastal bass as distinct populations."
   },
   {
    "q": "Is the Florida bass a different species?",
    "a": "Yes. A 2022 genetic study showed largemouth bass and Florida bass are two separate species. Florida bass, long called Micropterus salmoides floridanus (or M. floridanus), now takes the name M. salmoides, and the largemouth becomes M. nigricans. Florida bass grow bigger, and the two interbreed where Florida bass are stocked."
   },
   {
    "q": "What kind of fish is a largemouth bass?",
    "a": "A black bass — genus Micropterus — in the sunfish family, alongside the smallmouth and Florida bass. The 2022 genetic study recognised 19 species of black bass in all, several of them not yet formally named."
   },
   {
    "q": "Where do largemouth bass live?",
    "a": "Native to eastern North America, from southern Quebec and the Great Lakes to the Gulf coast and northern Mexico. It has been stocked almost everywhere since — across nearly all of the United States and on several continents. Look for it in warm, weedy, shallow water — under 6 m (20 ft)."
   },
   {
    "q": "How big do largemouth bass get?",
    "a": "Most adults are 30–53 cm (12–21 in) and 0.4–2.1 kg (1–4.6 lb). The largest reach about 97 cm (38 in). The IGFA all-tackle record is 10.09 kg (22 lb 4 oz), shared by fish from Georgia (1932) and Lake Biwa, Japan (2009)."
   },
   {
    "q": "How do you tell a largemouth from a smallmouth?",
    "a": "On an adult largemouth the upper jaw reaches past the back of the eye; on a smallmouth it stops at mid-eye. Largemouth are green with a dark stripe along the side; smallmouth are bronze with vertical bars."
   }
  ],
  "sources": [
   {
    "label": "USGS Nonindigenous Aquatic Species — Largemouth Bass",
    "url": "https://nas.er.usgs.gov/queries/FactSheet.aspx?speciesID=401"
   },
   {
    "label": "Kim, Taylor & Near (2022), Phylogenomics and species delimitation of the Black Basses — Scientific Reports",
    "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC9170712"
   },
   {
    "label": "Ontario Freshwater Fishes Life History Database — Largemouth Bass",
    "url": "https://www.ontariofishes.ca/fish_detail.php?FID=130"
   },
   {
    "label": "American Fisheries Society — Largemouth Bass in Coastal Estuaries (Mobile-Tensaw Delta)",
    "url": "https://afs.confex.com/afs/2013/webprogram/Paper12219.html"
   },
   {
    "label": "FishBase — Micropterus salmoides",
    "url": "https://www.fishbase.se/summary/Micropterus-salmoides.html"
   }
  ]
 },
 "northern-pike": {
  "otherNames": "Pike, jackfish, great northern pike, and pickerel in some places; grand brochet in Quebec.",
  "family": "Esocidae, the pike family — with muskellunge and the pickerels.",
  "nativeRange": "Circumpolar: across the northern parts of North America, Europe and Asia. In North America, the Atlantic, Arctic, Pacific, Great Lakes and Mississippi basins from Labrador to Alaska, south to Pennsylvania, Missouri and Nebraska.",
  "introduced": "Stocked or spread into many waters outside that range, where it can sharply reduce its prey and reshape the fish community. Quebec treats it as invasive where it doesn’t occur naturally.",
  "habitat": "Clear, weedy bays of lakes and slow, weedy rivers. Shallow in spring and fall; in summer heat it moves to deeper, cooler water.",
  "temp": "Cool water. Preferred range about 17–24°C (63–75°F). It spawns right after ice-out, at about 4–11°C (39–52°F).",
  "record": "IGFA all-tackle world record: 25 kg (55 lb 1 oz), Lothar Louis, Lake of Grefeern, Germany, 1986. Ontario’s record is 19.11 kg (42.1 lb).",
  "lifespan": "Usually 10–26 years; the oldest aged about 30.",
  "diet": "An opportunist that eats whatever is easy: mostly fish (other pike included), plus crayfish, frogs, small mammals and young waterfowl. It can swallow prey a third to half its own length. Young eat insect larvae and small crustaceans.",
  "spawning": "In spring, right after the ice goes out, by day, in flooded marshes and weedy shallows. A big female swims with one or two smaller males, scattering eggs that stick to plants. They hatch in 12–14 days, with no parental care.",
  "young": "For the first 6–10 days, newly hatched fry hang from plants by an adhesive gland on the head. Juveniles have light bars on a dark body rather than spots. Few survive, but those that do grow fast; most mature at 2–6 years.",
  "mouth": "A long, flat, duck-bill snout and large, sharp teeth. Use long pliers or a jaw spreader, and a wire or heavy leader.",
  "lookalikes": "Muskellunge: dark markings on a light body (pike is the reverse), 6–9 pores under each side of the lower jaw (pike usually 5), and more pointed tail tips. Pickerels are much smaller; the chain pickerel has a chain-like pattern. The tiger muskie is a pike × muskie hybrid. “Silver pike” is a pike colour phase without the pale spots.",
  "eating": "Good-tasting, firm white flesh, but bony — which is why many anglers release pike. Check your province or state’s fish consumption advisory, especially for large predators.",
  "status": "Secure over most of its range. In Quebec, pike are considered precarious in some waters, including Lac Saint-François and the St. Lawrence.",
  "typicalCm": [
   46,
   100
  ],
  "maxCm": 150,
  "shape": "torpedo",
  "faqs": [
   {
    "q": "What is the northern pike’s range?",
    "a": "It is circumpolar — native across northern North America, Europe and Asia. In North America it runs from Labrador to Alaska and south to Pennsylvania, Missouri and Nebraska, and it is found in almost all of Quebec. Elsewhere it has been stocked or spread by people."
   },
   {
    "q": "What is a northern pike?",
    "a": "A long, torpedo-shaped predator of the pike family: dark green with rows of pale, bean-shaped spots, a duck-bill snout full of teeth, and the dorsal fin set far back near the tail. It ambushes fish from the weeds. It is one of the most widespread freshwater fish in the northern hemisphere."
   },
   {
    "q": "Do northern pike have sharp teeth?",
    "a": "Yes — large, sharp teeth that cut skin and light fishing line. Unhook them with long pliers or a jaw spreader, keep fingers out of the gill area, and use a wire or heavy leader."
   },
   {
    "q": "How do you tell a pike from a muskie?",
    "a": "Pike have light spots on a dark body; muskies have dark spots or bars on a light body. For certainty, count the pores under one side of the lower jaw: a pike usually has five, a muskie six to nine. Pike tail tips are also rounder."
   },
   {
    "q": "How big do northern pike get?",
    "a": "Most adults are 46–100 cm (18–39 in) and 0.6–6 kg (1–13 lb); females grow bigger than males. The largest reach about 1.5 m (5 ft). The IGFA all-tackle record is 25 kg (55 lb 1 oz), from Lake of Grefeern, Germany, in 1986."
   },
   {
    "q": "Is northern pike good to eat?",
    "a": "Yes — the flesh is good-tasting, firm and white. The catch is the bones: pike are bony, and many anglers release them for that reason. Check your local consumption advisory before keeping big ones."
   },
   {
    "q": "What is a silver pike?",
    "a": "A colour phase of the northern pike that lacks the usual pale spots. It is the same species, not a hybrid or a separate fish."
   }
  ],
  "sources": [
   {
    "label": "USGS Nonindigenous Aquatic Species — Northern Pike",
    "url": "https://nas.er.usgs.gov/queries/FactSheet.aspx?speciesID=676"
   },
   {
    "label": "Gouvernement du Québec — Grand brochet",
    "url": "https://www.quebec.ca/agriculture-environnement-et-ressources-naturelles/faune/animaux-sauvages-quebec/fiches-especes-fauniques/grand-brochet"
   },
   {
    "label": "Ontario Freshwater Fishes Life History Database — Northern Pike",
    "url": "https://www.ontariofishes.ca/fish_detail.php?FID=86"
   },
   {
    "label": "Connecticut DEEP — Northern Pike",
    "url": "https://portal.ct.gov/deep/fishing/freshwater/freshwater-fishes-of-connecticut/northern-pike"
   },
   {
    "label": "FishBase — Esox lucius",
    "url": "https://www.fishbase.se/summary/Esox-lucius.html"
   }
  ]
 },
 "muskellunge": {
  "otherNames": "Muskie or musky, lunge; maskinongé (or maski) in Quebec. Often misspelled “muskelunge.”",
  "family": "Esocidae, the pike family — and its largest member.",
  "nativeRange": "The St. Lawrence–Great Lakes and Mississippi basins, from Quebec to southeastern Manitoba, south in the Appalachians to Georgia and west to Iowa. In Quebec: the St. Lawrence above Quebec City and rivers including the Ottawa, Richelieu, Saint-Maurice and Saint-François.",
  "introduced": "Stocked into many lakes in and beyond its range; about a quarter of Wisconsin’s muskie populations come from stocking. Quebec treats it as invasive where it doesn’t occur naturally.",
  "habitat": "Clear, weedy lakes, bays and slow rivers, especially larger lakes with deep basins close by. It lurks along weed edges and drop-offs near deeper water or current, sliding deeper in summer heat.",
  "temp": "Warm-cool water. Preferred range about 22–26°C (72–79°F); Quebec biologists give 20–26°C. It spawns at about 9–16°C (48–61°F).",
  "record": "IGFA all-tackle world record: 30.61 kg (67 lb 8 oz), Cal Johnson, Lac Courte Oreilles, Wisconsin, 1949 — though muskie records have been argued over for decades. Ontario’s record is 29.48 kg (65 lb).",
  "lifespan": "Usually 15–30 years. Females grow faster and live longer than males.",
  "diet": "Mostly fish, and it prefers big ones — suckers, perch, sunfish. Now and then frogs, crayfish, muskrats and waterfowl. An ambush hunter that often feeds at night, early morning and dusk.",
  "spawning": "In spring after ice-out, late April to early June, by day, when the water reaches about 12.5°C (55°F). A big female with one or two smaller males scatters eggs over flooded shallows; they settle among plants without sticking and hatch in 8–14 days.",
  "young": "Young muskies grow very fast. They mature at about 3–5 years.",
  "mouth": "A duck-bill snout and large, sharp, fang-like teeth. Scales cover only the upper half of the cheek and gill cover. Bring long pliers, a big net and a wire leader.",
  "lookalikes": "Northern pike: light spots on a dark body, usually five pores under each side of the jaw (a muskie has six or more), and rounder tail tips. The tiger muskie, a sterile pike × muskie hybrid, has dark marks on a light body like a muskie, but rounded tail tips.",
  "eating": "Rarely kept. Muskie fishing is mostly catch-and-release, and legal sizes are large — Minnesota’s minimum is 137 cm (54 in). Check your province or state’s fish consumption advisory, especially for large predators.",
  "typicalCm": [
   71,
   122
  ],
  "maxCm": 183,
  "shape": "torpedo",
  "faqs": [
   {
    "q": "How big do muskellunge get?",
    "a": "Most adults are 71–122 cm (28–48 in) and 2.4–15.5 kg (5–34 lb). The largest reach about 1.8 m (6 ft). The IGFA all-tackle record is 30.61 kg (67 lb 8 oz), from Wisconsin in 1949; Ontario’s record is 29.48 kg (65 lb)."
   },
   {
    "q": "How do you tell a muskie from a northern pike?",
    "a": "Count the pores on the underside of one side of the lower jaw: a muskie has six or more, a pike five or fewer. Muskies also have dark bars or spots on a light body — the reverse of a pike — and more pointed tail tips."
   },
   {
    "q": "Where do muskellunge live?",
    "a": "In east-central North America: the Great Lakes, St. Lawrence and upper Mississippi, from Quebec to southeastern Manitoba and south in the Appalachians to Georgia. They like clear, weedy lakes and slow rivers, usually big water with deep basins nearby."
   },
   {
    "q": "Why is the muskie called the fish of 10,000 casts?",
    "a": "Because they are hard to catch. Minnesota biologists say that is mostly because there are so few muskies in any one lake, not because they are craftier than other fish."
   },
   {
    "q": "What is a tiger muskie?",
    "a": "A hybrid of the northern pike and the muskellunge. It happens naturally where the two overlap, and hatcheries raise it for stocking. It is sterile, has dark marks on a light body like a muskie, and has rounded tail tips like a pike."
   },
   {
    "q": "How do you spell muskellunge?",
    "a": "Muskellunge — double “l” in the middle, then “lunge.” Most anglers just say muskie or musky, and in Quebec it is the maskinongé."
   }
  ],
  "sources": [
   {
    "label": "USGS Nonindigenous Aquatic Species — Muskellunge",
    "url": "https://nas.er.usgs.gov/queries/FactSheet.aspx?speciesID=679"
   },
   {
    "label": "Gouvernement du Québec — Maskinongé",
    "url": "https://www.quebec.ca/agriculture-environnement-et-ressources-naturelles/faune/animaux-sauvages-quebec/fiches-especes-fauniques/maskinonge"
   },
   {
    "label": "Minnesota DNR — Muskellunge",
    "url": "https://www.dnr.state.mn.us/fish/muskellunge/index.html"
   },
   {
    "label": "Ontario Freshwater Fishes Life History Database — Muskellunge",
    "url": "https://www.ontariofishes.ca/fish_detail.php?FID=88"
   }
  ]
 },
 "lake-trout": {
  "otherNames": "Laker, lake charr; touladi (also truite grise, “grey trout”) in Quebec. A deep-water form in Lake Superior is called the siscowet.",
  "family": "Salmonidae, the trout and salmon family. Despite the name it is a char (genus Salvelinus), like brook trout.",
  "nativeRange": "Only North America. Northern Canada and Alaska — missing from the southern Prairies — south to New England, the Maritimes and the Great Lakes. A few Montana lakes hold native or glacial-relict populations.",
  "introduced": "Stocked into deep lakes in several western states, including California, Colorado, Idaho, Washington and Wyoming. In Yellowstone Lake it is now too abundant to eradicate.",
  "habitat": "Deep, cold, clear, well-oxygenated lakes. Shallow in spring, fall and winter; in summer it follows cold water down, often 30–60 m (100–200 ft) in the Great Lakes. In the far north it also uses big rivers.",
  "temp": "Cold water. Preferred range about 9–13°C (48–55°F); Michigan biologists give 4–13°C (40–55°F). It spawns in fall at about 8–13°C (46–55°F).",
  "record": "IGFA all-tackle world record: 32.65 kg (72 lb), Lloyd Bull, Great Bear Lake, Northwest Territories, 1995. Ontario’s record is 28.63 kg (63 lb).",
  "lifespan": "Long-lived and slow-growing: commonly 15–30 years. Maturity takes 6–7 years in southern Quebec and up to 13 in the north.",
  "diet": "Mostly fish — ciscoes and whitefish first, also smelt, alewife, sculpins and perch — plus crustaceans, insects and the odd small mammal. In lakes without prey fish, lake trout live on plankton and bottom invertebrates; those populations grow slower, stay smaller and die younger.",
  "spawning": "In fall — September in the north, October–November in the south — at night, over rubble and boulders, often less than 2 m (6 ft) deep. Eggs lodge between the rocks and hatch 4–5 months later, February to April. Many fish return to the same shoal every year.",
  "young": "Fry stay down among the rocks until the yolk sac is used up — about two months — then head for deep water.",
  "mouth": "Well-developed teeth, and an upper jaw that reaches past the eye.",
  "lookalikes": "Brook trout has red spots with blue halos and a nearly square tail; lake trout has no red spots and a deeply forked tail. Splake, a lake trout × brook trout hybrid, shares features of both.",
  "eating": "Good eating, fresh or smoked. Because they grow slowly, a big lake trout is an old fish — let the giants go. Check your province or state’s fish consumption advisory, especially for large predators.",
  "status": "Great Lakes stocks collapsed between 1935 and 1965 from overfishing and the sea lamprey, and the native stocks of Lakes Michigan, Erie and Ontario were lost, and nearly so in Huron; only Lake Superior's survived. In Quebec, lake trout populations have improved under tighter rules over the past 30 years.",
  "typicalCm": [
   38,
   91
  ],
  "maxCm": 150,
  "shape": "trout",
  "faqs": [
   {
    "q": "Where are lake trout native to?",
    "a": "Only North America: most of Canada and Alaska (but not the southern Prairies), south to New England, the Maritimes and the Great Lakes. Lake trout in many western US lakes were stocked."
   },
   {
    "q": "Is a lake trout really a trout?",
    "a": "No — it is a char, in the same genus (Salvelinus) as brook trout and Arctic char, and its other English name is lake charr. In Quebec it is the touladi."
   },
   {
    "q": "How big do lake trout get?",
    "a": "Most adults are 38–91 cm (15–36 in) and 0.4–7 kg (1–15 lb); Michigan biologists put the average adult at 4–4.5 kg (9–10 lb). The largest reach about 1.5 m. The IGFA all-tackle record is 32.65 kg (72 lb), from Great Bear Lake, NWT, in 1995."
   },
   {
    "q": "How long do lake trout live?",
    "a": "Commonly 15–30 years. They grow slowly and may not spawn until 6–7 years old in southern Quebec, or 13 in the far north — which is why the big ones are worth releasing."
   },
   {
    "q": "How deep do lake trout live?",
    "a": "In summer they follow cold water down below the thermocline — often 30–60 m (100–200 ft) in the Great Lakes. In spring, fall and winter they come up into 3–9 m (10–30 ft) of water, which is when shore and ice anglers do best."
   },
   {
    "q": "What is a siscowet?",
    "a": "A deep-water form of lake trout found in Lake Superior, living at 80 m (260 ft) and deeper. It is the same species, adapted to the deepest parts of the lake."
   },
   {
    "q": "What is a splake?",
    "a": "A hybrid of a lake trout and a brook trout (speckled trout). It shows features of both parents."
   }
  ],
  "sources": [
   {
    "label": "USGS Nonindigenous Aquatic Species — Lake Trout",
    "url": "https://nas.er.usgs.gov/queries/FactSheet.aspx?speciesID=942"
   },
   {
    "label": "Gouvernement du Québec — Touladi",
    "url": "https://www.quebec.ca/agriculture-environnement-et-ressources-naturelles/faune/animaux-sauvages-quebec/fiches-especes-fauniques/touladi"
   },
   {
    "label": "Ontario Freshwater Fishes Life History Database — Lake Trout",
    "url": "https://www.ontariofishes.ca/fish_detail.php?FID=113"
   },
   {
    "label": "Michigan DNR — Lake Trout",
    "url": "https://www.michigan.gov/dnr/education/michigan-species/fish-species/lake-trout"
   }
  ]
 },
 "brook-trout": {
  "otherNames": "Speckled trout, speckle or brookie across much of Canada; squaretail in New England; omble de fontaine (also truite mouchetée) in Quebec. Careful: on the US Gulf and southeast coasts, “speckled trout” means the spotted seatrout, a saltwater drum — a different fish entirely.",
  "family": "Salmonidae. Despite the name it is a char (genus Salvelinus), like lake trout and Arctic char.",
  "nativeRange": "Northeastern North America: Newfoundland, Labrador and Quebec, the James Bay and Hudson Bay drainages west to northeastern Manitoba, the Great Lakes and upper Mississippi (Minnesota, Wisconsin, Iowa), and Atlantic drainages south to Virginia — then along the Appalachians to northern Georgia.",
  "introduced": "Widely stocked in western North America, and in South America, New Zealand, Asia and Europe. In Quebec it is the most stocked fish of all.",
  "habitat": "Cold, clear, well-oxygenated streams, rivers, ponds and lakes, where summer water stays below about 20°C (68°F). Some populations run to sea for part of the summer; Great Lakes fish that spawn in tributaries are called coasters.",
  "temp": "Cold water. Preferred range about 13–17°C (55–63°F). It struggles if water stays above about 20°C (68°F), though it can live in water up to 24°C (75°F).",
  "record": "IGFA all-tackle world record: 6.57 kg (14 lb 8 oz), Dr. J.W. Cook, Nipigon River, Ontario, 1915 — the longest-standing trout record.",
  "lifespan": "Short-lived. Most anglers catch fish of 2–3 years, few live past 6, and Canadian fish rarely pass 8.",
  "diet": "Insects above all — mayflies, stoneflies, caddisflies, midges and land insects — plus worms, leeches, crustaceans, snails and small fish. Fish only become important once a brook trout is 25–30 cm (10–12 in) long.",
  "spawning": "In fall, late September to November, by day. The female sweeps a redd in gravel where groundwater wells up, in streams or spring-fed lake shallows, and lays 500–5,000 eggs. They overwinter in the gravel and hatch in early spring.",
  "young": "Parr (young stream trout) have about nine or fewer dark oval parr marks along the side, with red or yellow spots between them, a clear-edged adipose fin, and the white-edged lower fins of the adult. Most mature at 2–3 years.",
  "mouth": "A large mouth; the jaw reaches well past the back of the eye. Small sharp teeth line the jaws and, as in all chars, sit only at the front of the vomer, the bone in the roof of the mouth. Big spawning males grow a hooked lower jaw.",
  "lookalikes": "Lake trout (no red spots, deeply forked tail), brown trout (dark spots on a light body — the reverse of a brookie), and rainbow trout (black spots, pink side band). Splake and tiger trout are hybrids of brook trout with lake and brown trout.",
  "eating": "Excellent eating and the most sought-after fish in Quebec. Wild populations are easily overfished, so follow local limits and keep only what you need. Check your province or state’s fish consumption advisory, especially for large predators.",
  "status": "Declining in parts of its range. Quebec estimates more than half its populations are overexploited and only one in five southern Quebec lake populations is healthy; it has all but vanished from urban and farm areas.",
  "typicalCm": [
   13,
   51
  ],
  "maxCm": 86,
  "shape": "trout",
  "faqs": [
   {
    "q": "Do brook trout have teeth?",
    "a": "Yes. Small, sharp teeth line both jaws, and like all chars they have a small patch at the front of the vomer, the bone in the roof of the mouth. They are for gripping insects and small fish. Big spawning males also grow a hooked lower jaw."
   },
   {
    "q": "How big is an adult brook trout?",
    "a": "Most adults are 13–51 cm (5–20 in). In Quebec the usual catch is 15–32 cm (6–13 in) and 100 g to 1 kg; wild stream fish are often smaller. Some Quebec fish pass 55 cm (22 in). The world record is 6.57 kg (14 lb 8 oz)."
   },
   {
    "q": "What does an adult brook trout look like?",
    "a": "A dark olive to black back covered in pale, worm-like marks, red spots ringed in blue on the sides, and lower fins edged white, then black. The tail is nearly square. In fall, spawning males turn fiery orange-red below with a black belly line and a hooked jaw."
   },
   {
    "q": "What do juvenile speckled trout look like?",
    "a": "Young brook (speckled) trout, called parr, have about nine or fewer dark oval parr marks along the sides, small red or yellow spots, and the white-edged lower fins of the adult. A young rainbow has no red spots and a dark border on its adipose fin."
   },
   {
    "q": "Is a speckled trout the same as a brook trout?",
    "a": "In Canada, yes — speckled trout, speckle and brookie all mean brook trout, and in Quebec it is the omble de fontaine or truite mouchetée. On the US Gulf and southeast coasts, “speckled trout” means spotted seatrout, a saltwater drum. See our speckled trout page for that fish."
   },
   {
    "q": "Is a brook trout really a trout?",
    "a": "No — it is a char, a close cousin of lake trout and Arctic char in the genus Salvelinus. Chars have light markings on a dark body and no black spots, which is why a brookie looks so different from a rainbow or a brown."
   },
   {
    "q": "What kinds of fish are in Quebec?",
    "a": "Quebec’s main sport fish include brook trout (omble de fontaine), the most sought-after and most stocked; walleye (doré jaune); northern pike (grand brochet); lake trout (touladi); yellow perch (perchaude); smallmouth and largemouth bass (achigans); muskellunge (maskinongé) and Atlantic salmon. Rainbow and brown trout are stocked but not native."
   }
  ],
  "sources": [
   {
    "label": "Gouvernement du Québec — Omble de fontaine",
    "url": "https://www.quebec.ca/agriculture-environnement-et-ressources-naturelles/faune/animaux-sauvages-quebec/fiches-especes-fauniques/omble-fontaine"
   },
   {
    "label": "Maine Inland Fisheries & Wildlife — Brook Trout Biology & Management",
    "url": "https://www.maine.gov/IFW/docs/Biology_and_Management.pdf"
   },
   {
    "label": "Connecticut DEEP — Brook Trout",
    "url": "https://portal.ct.gov/deep/fishing/freshwater/freshwater-fishes-of-connecticut/brook-trout"
   },
   {
    "label": "Ontario Freshwater Fishes Life History Database — Brook (speckled) Trout",
    "url": "https://www.ontariofishes.ca/fish_detail.php?FID=110"
   }
  ]
 },
 "rainbow-trout": {
  "otherNames": "Rainbow; steelhead for fish that run to sea or into the Great Lakes; Kamloops trout; truite arc-en-ciel in Quebec.",
  "family": "Salmonidae — a Pacific trout, in the same genus (Oncorhynchus) as the Pacific salmon.",
  "nativeRange": "Mostly west of the Rockies: Pacific drainages from the Kuskokwim River, Alaska, to Baja California, plus the upper Mackenzie (Arctic) basin in Alberta and BC, inland basins of southern Oregon, and the Pacific coast of northeast Asia.",
  "introduced": "Stocked in most US states, across Canada and around the world, usually to be caught. Quebec now treats it as an invasive exotic outside the zones where stocking is allowed.",
  "habitat": "Cold, clear rivers with gravel riffles and pools, and cool lakes. Steelhead grow up in the sea or the Great Lakes and run up rivers to spawn.",
  "temp": "Cold water. Preferred range about 12–18°C (54–64°F), though Quebec estimates adults prefer 16.5–21°C.",
  "record": "IGFA all-tackle world record: 21.77 kg (48 lb), Sean Konrad, Lake Diefenbaker, Saskatchewan, 2009. Ontario’s record is 18.45 kg (40.7 lb).",
  "lifespan": "Usually 3–8 years; the oldest aged about 11.",
  "diet": "Insects and their larvae, crustaceans, snails, worms, leeches, fish eggs and small fish. It feeds mostly near the bottom but also at the surface; big lake and sea-run fish eat mostly fish.",
  "spawning": "Mostly in spring — March to June, at about 4–10°C (39–50°F) — though some strains spawn in fall. The female digs several redds in shallow, gravelly, well-oxygenated riffles; eggs hatch in 4–7 weeks.",
  "young": "Parr have a dark-edged adipose fin, no red or yellow spots, and parr marks spaced wider apart than the marks are wide. They mature at 3–5 years.",
  "mouth": "A large mouth; the jaw reaches past the back of the eye. Spawning males’ jaws and teeth change shape.",
  "lookalikes": "Brown trout has black and red spots with pale halos and few spots on the tail. Brook trout has light spots on a dark body. Rainbow’s tail is covered in neat rows of small black spots, and the adipose fin has a black border.",
  "eating": "Good eating fresh or smoked, and farmed in many countries. Check your province or state’s fish consumption advisory, especially for large predators.",
  "typicalCm": [
   18,
   73
  ],
  "maxCm": 123,
  "shape": "trout",
  "faqs": [
   {
    "q": "Is a steelhead a rainbow trout?",
    "a": "Yes. Steelhead are rainbow trout that migrate — to the sea on the Pacific coast, or into the Great Lakes — then return up rivers to spawn. It is the same species; steelhead come back silvery and much bigger than stream rainbows."
   },
   {
    "q": "Where are rainbow trout native?",
    "a": "Mostly west of the Rockies — Pacific drainages from Alaska to Baja California, the upper Mackenzie basin in Alberta and BC, and the Pacific coast of northeast Asia. Everywhere else, including Ontario, Quebec and the Great Lakes, rainbows were stocked."
   },
   {
    "q": "How big do rainbow trout get?",
    "a": "Stream and stocked-lake rainbows are usually 20–45 cm (8–18 in). Lake-run fish grow much larger, and the biggest reach about 1.2 m. The IGFA all-tackle record is 21.77 kg (48 lb), from Lake Diefenbaker, Saskatchewan, in 2009."
   },
   {
    "q": "How do you tell a rainbow trout from a brown trout?",
    "a": "Look at the tail and spots. A rainbow has rows of small black spots all over the tail, no pale halos, and usually a pink band down the side. A brown has larger black and red spots ringed in pale halos, and few or no spots on the tail."
   },
   {
    "q": "When do rainbow trout spawn?",
    "a": "Mostly in spring, from about March to June, in shallow gravel riffles at 4–10°C (39–50°F). Some strains spawn in fall. The female digs several nests (redds), and the eggs hatch in about 4–7 weeks."
   }
  ],
  "sources": [
   {
    "label": "USGS Nonindigenous Aquatic Species — Rainbow Trout",
    "url": "https://nas.er.usgs.gov/queries/FactSheet.aspx?speciesID=910"
   },
   {
    "label": "Gouvernement du Québec — Truite arc-en-ciel",
    "url": "https://www.quebec.ca/agriculture-environnement-et-ressources-naturelles/faune/animaux-sauvages-quebec/fiches-especes-fauniques/truite-arc-en-ciel"
   },
   {
    "label": "Ontario Freshwater Fishes Life History Database — Rainbow Trout",
    "url": "https://www.ontariofishes.ca/fish_detail.php?FID=103"
   },
   {
    "label": "Connecticut DEEP — Rainbow Trout",
    "url": "https://portal.ct.gov/deep/fishing/freshwater/freshwater-fishes-of-connecticut/rainbow-trout"
   }
  ]
 },
 "brown-trout": {
  "otherNames": "German brown, Loch Leven trout; sea trout for fish that run to sea; truite brune (also truite fario, truite allemande) in Quebec.",
  "family": "Salmonidae — a true trout in the genus Salmo, the same genus as the Atlantic salmon.",
  "nativeRange": "Europe, northern Africa and western Asia.",
  "introduced": "First brought to North America in 1883, from Germany, and stocked in Michigan’s Pere Marquette River. It has since been stocked in almost every US state, and in Ontario and southern Quebec. Quebec treats it as an invasive exotic outside the zones where stocking is allowed.",
  "habitat": "Cool rivers and streams with gravel, undercut banks, logs and deep runs, plus lakes and Great Lakes shorelines. It tolerates warmer, murkier water than brook trout. Some go to sea to feed and come back silvery.",
  "temp": "Cool water. Preferred range about 15–18°C (59–64°F); it can tolerate water up to about 24°C (75°F). It spawns in water of about 6–9°C (43–48°F).",
  "record": "IGFA all-tackle world record: 20.1 kg (44 lb 5 oz), Seumas Petrie, Ohau Canal, Twizel, New Zealand, 2020. Ontario’s record is 15.59 kg (34.4 lb).",
  "lifespan": "Usually 5–12 years in Ontario waters.",
  "diet": "Mostly fish once it is big, plus aquatic insect larvae, crustaceans, snails and frogs. Young eat insects. It feeds mostly at dusk, and the big ones after dark.",
  "spawning": "Late fall, about October to November, in cold, clear, shallow gravel in streams and sometimes lakes. The female digs a nest, the male fertilises the eggs, and she covers them with gravel.",
  "young": "Parr usually have 10–11 parr marks, red or yellow spots on the sides, and a reddish-orange edge to the adipose fin. The tail is slightly forked in young fish and square in adults. Males mature at 2–4 years, females at 3–5.",
  "mouth": "A large mouth and well-developed teeth, including a sharp zigzag row down the middle of the roof of the mouth. In adults the jaw reaches well past the eye; spawning males may grow a hooked lower jaw.",
  "lookalikes": "Atlantic salmon has a forked tail, a slim wrist and no spots on the adipose fin. Rainbow trout has rows of black spots across the tail. Brook trout has light spots on a dark body — a brown has dark spots on a light one. The tiger trout is a brown × brook hybrid.",
  "eating": "Good eating, and most stocked browns are kept soon after stocking. Check your province or state’s fish consumption advisory, especially for large predators.",
  "typicalCm": [
   18,
   61
  ],
  "maxCm": 137,
  "shape": "trout",
  "faqs": [
   {
    "q": "What is the brown trout’s range?",
    "a": "It is native to Europe, northern Africa and western Asia. People have carried it much farther: it now lives across most of the United States, in Ontario and southern Quebec, and as far away as New Zealand, where the current world record was caught."
   },
   {
    "q": "When did brown trout come to North America?",
    "a": "In 1883, when fish from Germany were stocked in Michigan’s Pere Marquette River by the US Fish Commission. That German start is why many anglers still call it the German brown."
   },
   {
    "q": "How big do brown trout get?",
    "a": "Stream browns are commonly 20–50 cm (8–20 in); lake and Great Lakes fish grow far bigger, and the largest reach about 1.4 m. The IGFA all-tackle record is 20.1 kg (44 lb 5 oz), from New Zealand’s Ohau Canal in 2020."
   },
   {
    "q": "How do you tell a brown trout from a brook trout?",
    "a": "A brown has dark spots on a light, buttery body; a brook trout is the reverse, with pale worm-like marks on a dark back. Brook trout also have bold white-then-black edges on the lower fins, which browns lack."
   },
   {
    "q": "Can brown trout live in salt water?",
    "a": "Yes. Some brown trout go to sea to feed, then return to fresh water to spawn — these are sea trout, and they come back silvery. In Quebec they turn up now and then in eastern rivers and on Anticosti Island."
   },
   {
    "q": "Do brown trout have teeth?",
    "a": "Yes, well-developed ones — including a sharp zigzag row down the middle of the roof of the mouth. They help it hold fish, its main food once it is big."
   }
  ],
  "sources": [
   {
    "label": "USGS Nonindigenous Aquatic Species — Brown Trout",
    "url": "https://nas.er.usgs.gov/queries/FactSheet.aspx?speciesID=931"
   },
   {
    "label": "Gouvernement du Québec — Truite brune",
    "url": "https://www.quebec.ca/agriculture-environnement-et-ressources-naturelles/faune/animaux-sauvages-quebec/fiches-especes-fauniques/truite-brune"
   },
   {
    "label": "Ontario Freshwater Fishes Life History Database — Brown Trout",
    "url": "https://www.ontariofishes.ca/fish_detail.php?FID=108"
   },
   {
    "label": "Connecticut DEEP — Brown Trout",
    "url": "https://portal.ct.gov/deep/fishing/freshwater/freshwater-fishes-of-connecticut/brown-trout"
   }
  ]
 },
 "yellow-perch": {
  "otherNames": "Perch, lake perch, American perch; perchaude in Quebec.",
  "family": "Percidae, the perch family — with walleye and sauger.",
  "nativeRange": "The Atlantic, Arctic, Great Lakes and Mississippi basins, from Nova Scotia and Quebec west to Great Slave Lake in the Northwest Territories, south to Ohio, Illinois and Nebraska, and down the Atlantic coast to South Carolina.",
  "introduced": "Introduced in many waters outside that range — including, accidentally or illegally, several lakes in Quebec. In the West it competes with trout for food and eats young trout.",
  "habitat": "Lakes, ponds and slow rivers with clear water and some weed, usually shallower than 9 m (30 ft). Travels in schools of same-sized fish, and stays active all winter under the ice. It tolerates some salt and even lives in brackish water.",
  "temp": "Cool water. Preferred range about 18–24°C (64–75°F); Quebec biologists put its favourite near 20°C. It spawns at about 6–12°C (43–54°F).",
  "record": "IGFA all-tackle world record: 1.91 kg (4 lb 3 oz), Bordentown, New Jersey, 1865 — a record that has stood for over 150 years. Ontario’s record is about 1.1 kg (2 lb 7 oz).",
  "lifespan": "Usually given as 7–12 years.",
  "diet": "Insect larvae, crayfish and other invertebrates, fish eggs and small fish. It feeds by day, especially at dawn and dusk, and rests on the bottom at night.",
  "spawning": "Early spring, when the water is about 6–12°C — one of the first fish to spawn. At night or early morning in the shallows, the female drapes long, jelly-like ribbons of eggs over plants, branches and fallen trees. Eggs hatch in about 10 days, with no parental care.",
  "young": "Juveniles look like small, pale adults and often school with other small fish. Males mature at about 3 years, females at 4 — younger in heavily fished lakes.",
  "mouth": "A moderate mouth with many small teeth but no canines, and a sharp spine at the back of the gill cover.",
  "lookalikes": "Walleye and sauger: longer and slimmer, with sharp canine teeth and no bold bars. A perch is deeper-bodied and golden-yellow with five to eight (usually about seven) dark vertical bars.",
  "eating": "Excellent eating and one of the most popular panfish, especially through the ice. Check your province or state’s fish consumption advisory, especially for large predators.",
  "typicalCm": [
   11,
   30
  ],
  "maxCm": 50,
  "shape": "deep",
  "faqs": [
   {
    "q": "How big do yellow perch get?",
    "a": "Most adults are 11–30 cm (4.5–12 in) and weigh under 300 g (10 oz); in Quebec the usual catch is 14–23 cm. The largest reach about 50 cm (20 in). The IGFA all-tackle record is 1.91 kg (4 lb 3 oz), from Bordentown, New Jersey, in 1865."
   },
   {
    "q": "Where do yellow perch live?",
    "a": "Across eastern and central North America, from Nova Scotia and Quebec west to Great Slave Lake, south to Ohio and Nebraska and down the Atlantic coast to South Carolina. Look in clear, weedy lakes and ponds, usually shallower than 9 m (30 ft), in schools."
   },
   {
    "q": "How do you tell a yellow perch from a walleye?",
    "a": "A perch is golden-yellow with bold dark vertical bars and no canine teeth. A walleye is longer, olive-gold without bars, has sharp canines and a white tip on the lower tail. When in doubt, check for canine teeth."
   },
   {
    "q": "When do yellow perch spawn?",
    "a": "Early spring, when the water reaches about 6–12°C (43–54°F) — often just after ice-out. Females lay long, jelly-like ribbons of eggs over plants and sunken branches in the shallows, and the eggs hatch in about 10 days."
   },
   {
    "q": "Do yellow perch bite in winter?",
    "a": "Yes. Perch stay active under the ice all winter and keep feeding, which makes them a mainstay of ice fishing. Find one and you usually find a school."
   }
  ],
  "sources": [
   {
    "label": "USGS Nonindigenous Aquatic Species — Yellow Perch",
    "url": "https://nas.er.usgs.gov/queries/FactSheet.aspx?speciesID=820"
   },
   {
    "label": "Gouvernement du Québec — Perchaude",
    "url": "https://www.quebec.ca/agriculture-environnement-et-ressources-naturelles/faune/animaux-sauvages-quebec/fiches-especes-fauniques/perchaude"
   },
   {
    "label": "Ontario Freshwater Fishes Life History Database — Yellow Perch",
    "url": "https://www.ontariofishes.ca/fish_detail.php?FID=149"
   },
   {
    "label": "Connecticut DEEP — Yellow Perch",
    "url": "https://portal.ct.gov/deep/fishing/freshwater/freshwater-fishes-of-connecticut/yellow-perch"
   }
  ]
 },
 "black-crappie": {
  "otherNames": "Crappie, calico bass; marigane noire (also crapet calico) in Quebec.",
  "family": "Centrarchidae, the sunfish family.",
  "nativeRange": "So widely stocked that the original range is hard to pin down. Presumably the St. Lawrence, Great Lakes and Mississippi basins from Quebec to Manitoba and south to the Gulf, plus Atlantic drainages from Virginia to Florida and Gulf drainages west to Texas.",
  "introduced": "Widely introduced in western North America and elsewhere. In the US Northwest it eats young salmon.",
  "habitat": "Clear, quiet, weedy water over sand or mud: ponds, small lakes, bays of larger lakes, marshes and slow river backwaters. It schools around brush, fallen trees, boulders and docks.",
  "temp": "Warm-cool water. Preferred range about 21–25°C (70–77°F). It spawns when the water nears 20°C (68°F).",
  "record": "IGFA all-tackle world record: 2.47 kg (5 lb 7 oz), Lionel Ferguson, a private pond in Tennessee, 2018. Ontario’s record is 1.71 kg (3.8 lb).",
  "lifespan": "Usually 8–13 years; the oldest aged about 15.",
  "diet": "Up to about 15 cm (6 in) long, mostly plankton and insect larvae; bigger crappie eat small fish, insects and crustaceans. It feeds mostly in mid-water at dusk, at night and early morning, and stays active in winter.",
  "spawning": "In Quebec, late May to mid-July when the water nears 20°C; farther south, as early as April. Males fan shallow nests 20–38 cm (8–15 in) across in 25–60 cm (10–24 in) of water, in loose colonies, and guard the eggs (hatching in 3–5 days) and fry.",
  "young": "Juveniles are slimmer than adults, with only a hint of the adult pattern. They mature at about 2 years.",
  "mouth": "A large, upturned mouth reaching below the middle of the eye, with a jutting lower jaw and many fine teeth.",
  "lookalikes": "White crappie: usually 6 dorsal spines (black crappie has 7–8) and dark blotches lined up in vertical bands; the two sometimes hybridize. Sunfish have 10–12 dorsal spines and a dark ear flap. Bass have 3 anal spines; crappies have about 6.",
  "eating": "A popular food fish. Check your province or state’s fish consumption advisory, especially for large predators.",
  "typicalCm": [
   18,
   35
  ],
  "maxCm": 49,
  "shape": "deep",
  "faqs": [
   {
    "q": "How do you tell a black crappie from a white crappie?",
    "a": "Count the dorsal spines: a black crappie has 7 or 8, a white crappie usually 6. Black crappie are speckled with irregular dark blotches; on white crappie the blotches line up into vertical bands. Hybrids with in-between features do occur."
   },
   {
    "q": "How big do black crappie get?",
    "a": "Most adults are 18–35 cm (7–14 in) and weigh about 0.5 kg (1 lb) or less. The largest reach about 49 cm (19 in). The IGFA all-tackle record is 2.47 kg (5 lb 7 oz), from a private pond in Tennessee in 2018."
   },
   {
    "q": "Where are black crappie native?",
    "a": "Probably eastern and central North America, from Quebec to Manitoba and south to the Gulf and Florida — but it has been stocked so widely that the original range is hard to pin down. In Quebec it lives in the south and down the St. Lawrence to about Rivière-Ouelle."
   },
   {
    "q": "What else are black crappie called?",
    "a": "Calico bass is another common name. In Quebec it is the marigane noire, or crapet calico. Plain “crappie” covers both the black and white species."
   },
   {
    "q": "When do black crappie spawn?",
    "a": "When the water nears 20°C (68°F): April in the south, late May to mid-July in Quebec. Males fan shallow nests in colonies near weeds and guard the eggs, so spring is when crappie are most often found in the shallows."
   }
  ],
  "sources": [
   {
    "label": "USGS Nonindigenous Aquatic Species — Black Crappie",
    "url": "https://nas.er.usgs.gov/queries/FactSheet.aspx?speciesID=409"
   },
   {
    "label": "Gouvernement du Québec — Marigane noire",
    "url": "https://www.quebec.ca/agriculture-environnement-et-ressources-naturelles/faune/animaux-sauvages-quebec/fiches-especes-fauniques/marigane-noire"
   },
   {
    "label": "Ontario Freshwater Fishes Life History Database — Black Crappie",
    "url": "https://www.ontariofishes.ca/fish_detail.php?FID=132"
   },
   {
    "label": "Connecticut DEEP — Black Crappie",
    "url": "https://portal.ct.gov/deep/fishing/freshwater/freshwater-fishes-of-connecticut/black-crappie"
   },
   {
    "label": "FishBase — Pomoxis nigromaculatus",
    "url": "https://www.fishbase.se/summary/Pomoxis-nigromaculatus.html"
   }
  ]
 },
 "bluegill": {
  "otherNames": "Bream, blue sunfish, sunfish; crapet arlequin in Quebec.",
  "family": "Centrarchidae, the sunfish family.",
  "nativeRange": "The St. Lawrence–Great Lakes and Mississippi basins from Quebec and New York to Minnesota and south to the Gulf; Atlantic and Gulf coast drainages from the Cape Fear River to the Rio Grande in Texas and New Mexico; and northern Mexico. In Canada it is native to southern Ontario and southern Quebec.",
  "introduced": "Now found across almost all of the United States. In California it pushes the native Sacramento perch off its spawning grounds.",
  "habitat": "Warm, shallow, weedy water: small lakes, ponds, weedy bays of larger lakes, and slow pools of creeks and rivers. Big ones drop deeper in summer heat; in winter they gather in groups and stay active.",
  "temp": "Warm water. Preferred range about 24–30°C (75–86°F). It spawns at about 19–26°C (66–79°F).",
  "record": "IGFA all-tackle world record: 2.15 kg (4 lb 12 oz), T.S. Hudson, Ketona Lake, Alabama, 1950. Ontario’s record is 0.83 kg (1.8 lb).",
  "lifespan": "Up to about 8–11 years.",
  "diet": "Insects and their larvae, small crustaceans, snails, worms, small fish and some plants. Fry eat zooplankton. It feeds at the surface, in mid-water and on the bottom.",
  "spawning": "June to August in the north. Males sweep round nests 50–65 cm (20–26 in) across on gravel, sand or mud, often packed in colonies, and guard the eggs (hatching in 3–5 days) and fry. Spawning males turn dark with a burnt-orange breast.",
  "young": "Juveniles are grey-brown above and steely blue on the sides, with clear vertical bars. Males mature at 2 years or more, females at 3–4.",
  "mouth": "A small mouth that doesn’t reach the front of the eye, with many small teeth.",
  "lookalikes": "Other sunfish: the bluegill’s ear flap is solid black to the edge, while pumpkinseed and green sunfish have a coloured margin, and a rock bass has a vague dark spot that doesn’t reach the edge. The dark spot at the back of the soft dorsal fin is another bluegill mark, though a green sunfish has one too — along with a much bigger mouth. Bluegill often hybridize with pumpkinseed.",
  "eating": "Good eating, and a classic first fish for children. Check your province or state’s fish consumption advisory, especially for large predators.",
  "typicalCm": [
   14,
   25
  ],
  "maxCm": 41,
  "shape": "deep",
  "faqs": [
   {
    "q": "Where are bluegill native to?",
    "a": "Eastern and central North America: the Great Lakes, St. Lawrence and Mississippi basins from Quebec to Minnesota and south to the Gulf, plus coastal drainages from the Carolinas to Texas and northern Mexico. In Canada it is native to southern Ontario and southern Quebec."
   },
   {
    "q": "What does a bluegill look like?",
    "a": "A deep, flat, round sunfish with a small mouth, long pointed pectoral fins, and a solid black ear flap. The back is olive to dark brown, the sides greenish-blue with faint vertical bars, and there is a dark spot at the back of the soft dorsal fin. Breeding males have an orange-red breast."
   },
   {
    "q": "What is the bluegill’s range today?",
    "a": "Far wider than its native range. It has been stocked into ponds and lakes across almost all of the United States. In Quebec it is established in the south — the Richelieu, Châteauguay and Ottawa basins and the St. Lawrence to about Saint-Nicolas."
   },
   {
    "q": "How big do bluegill get?",
    "a": "Most adults are 14–25 cm (5.5–10 in) and 50–340 g (2–12 oz). The largest reach about 41 cm (16 in). The IGFA all-tackle record is 2.15 kg (4 lb 12 oz), from Ketona Lake, Alabama, in 1950."
   },
   {
    "q": "How do you tell a bluegill from a pumpkinseed?",
    "a": "Look at the ear flap. On a bluegill it is solid black right to the edge; a pumpkinseed’s has a coloured margin. Bluegill also have a dark spot at the back of the soft dorsal fin. The two often hybridize."
   },
   {
    "q": "Are there bluegill in Canada?",
    "a": "Yes — they are native to southern Ontario and southern Quebec. In Quebec they are the crapet arlequin, well established in the Richelieu, Châteauguay and Ottawa river basins and along the St. Lawrence."
   }
  ],
  "sources": [
   {
    "label": "USGS Nonindigenous Aquatic Species — Bluegill",
    "url": "https://nas.er.usgs.gov/queries/FactSheet.aspx?speciesID=385"
   },
   {
    "label": "Gouvernement du Québec — Crapet arlequin",
    "url": "https://www.quebec.ca/agriculture-environnement-et-ressources-naturelles/faune/animaux-sauvages-quebec/fiches-especes-fauniques/crapet-arlequin"
   },
   {
    "label": "Ontario Freshwater Fishes Life History Database — Bluegill",
    "url": "https://www.ontariofishes.ca/fish_detail.php?FID=127"
   },
   {
    "label": "Connecticut DEEP — Bluegill",
    "url": "https://portal.ct.gov/deep/fishing/freshwater/freshwater-fishes-of-connecticut/bluegill"
   },
   {
    "label": "Connecticut DEEP — Green Sunfish",
    "url": "https://portal.ct.gov/deep/fishing/freshwater/freshwater-fishes-of-connecticut/green-sunfish"
   }
  ]
 },
 "channel-catfish": {
  "otherNames": "Channel cat, spotted catfish, northern catfish; barbue de rivière in Quebec.",
  "family": "Ictaluridae, the North American catfishes — with blue and flathead catfish and the bullheads.",
  "nativeRange": "The St. Lawrence–Great Lakes, Hudson Bay (Red River) and Missouri–Mississippi basins, from southern Quebec to southern Manitoba and Montana, south to the Gulf. Possibly also native on the Atlantic and Gulf slopes from the Susquehanna River to Florida and west to northern Mexico.",
  "introduced": "Stocked widely outside its range, including the upper Colorado basin, and established in most waters where it was introduced. In Mexico it hybridizes with the threatened Yaqui catfish.",
  "habitat": "Deep pools and runs of rivers over sand, gravel or rock, plus reservoirs and lakes. It hides under logs and rocks by day and moves into shallow water at night. Tolerant of murky water, low oxygen and heat.",
  "temp": "Warm water. Preferred range about 25–31°C (77–88°F), and it tolerates up to about 35°C (95°F). It spawns at about 18–27°C (64–81°F).",
  "record": "IGFA all-tackle world record: 26.3 kg (58 lb), Santee-Cooper Reservoir, South Carolina, 1964. Ontario’s record is 15.13 kg (33.4 lb).",
  "lifespan": "Commonly 15 years or more, and up to about 27.",
  "diet": "Fish, crayfish, clams, snails, aquatic insect larvae, worms and some plants. It finds food largely by smell and taste through its barbels, mostly near the bottom, by day or night.",
  "spawning": "Late spring and summer — from about June in Quebec — at 18–27°C. The male makes a nest in a dark, sheltered spot such as a hole, undercut bank or log jam, then fans and guards the eggs, which hatch in 5–10 days, and minds the fry.",
  "young": "Young fish are slimmer, with scattered black spots on the sides that fade with age. They mature at about 5–7 years.",
  "mouth": "Four pairs of barbels (whiskers) around the mouth; the long ones at the corners are more than three times as long as those by the nostrils. No scales. The dorsal and each pectoral fin start with a stiff spine edged with small teeth that can puncture skin.",
  "lookalikes": "Blue catfish: the outer edge of the anal fin is straight (rounded on a channel cat). White catfish: broader head and shorter anal fin (channel cats have 25–29 anal rays). Bullheads: square or rounded tail, not forked.",
  "eating": "Good eating and widely eaten, fresh, smoked or frozen. Check your province or state’s fish consumption advisory, especially for large predators.",
  "typicalCm": [
   36,
   76
  ],
  "maxCm": 132,
  "shape": "torpedo",
  "faqs": [
   {
    "q": "What is the channel catfish’s range?",
    "a": "Native to the Great Lakes, St. Lawrence, Red River and Missouri–Mississippi basins, from southern Quebec to southern Manitoba and Montana, south to the Gulf. It may also be native along the Atlantic and Gulf coasts. It has been stocked across much of the rest of the United States."
   },
   {
    "q": "Where do channel catfish live?",
    "a": "In rivers above all — deep pools and runs over sand, gravel or rock — and also reservoirs and lakes. By day they hold under logs and in deep holes; at night they move shallow to feed. They handle warm, murky water that other fish avoid."
   },
   {
    "q": "How big do channel catfish get?",
    "a": "Most adults are 36–76 cm (14–30 in) and 0.4–4 kg (1–9 lb). In the St. Lawrence they can pass 9 kg (20 lb), and the largest reach about 1.3 m. The IGFA all-tackle record is 26.3 kg (58 lb), from Santee-Cooper Reservoir, South Carolina, in 1964."
   },
   {
    "q": "How do you tell a channel catfish from a blue catfish?",
    "a": "Check the anal fin: a channel cat’s has a rounded outer edge, a blue cat’s a straight one. Blue catfish also grow much bigger. Both have deeply forked tails, unlike bullheads."
   },
   {
    "q": "Are there channel catfish in Canada?",
    "a": "Yes. They are native to southern Quebec (mainly the St. Lawrence and its tributaries), southern Ontario, and southern Manitoba in the Red River system. In Quebec they are called barbue de rivière."
   },
   {
    "q": "Are channel catfish spines dangerous?",
    "a": "They can hurt. The dorsal and pectoral fins each start with a stiff, serrated spine that can puncture skin. Hold a channel cat firmly from behind the dorsal and pectoral fins."
   }
  ],
  "sources": [
   {
    "label": "USGS Nonindigenous Aquatic Species — Channel Catfish",
    "url": "https://nas.er.usgs.gov/queries/FactSheet.aspx?speciesID=2341"
   },
   {
    "label": "Gouvernement du Québec — Barbue de rivière",
    "url": "https://www.quebec.ca/agriculture-environnement-et-ressources-naturelles/faune/animaux-sauvages-quebec/fiches-especes-fauniques/barbue-riviere"
   },
   {
    "label": "Ontario Freshwater Fishes Life History Database — Channel Catfish",
    "url": "https://www.ontariofishes.ca/fish_detail.php?FID=78"
   },
   {
    "label": "Connecticut DEEP — Channel Catfish",
    "url": "https://portal.ct.gov/deep/fishing/freshwater/freshwater-fishes-of-connecticut/channel-catfish"
   }
  ]
 },
 "chinook-salmon": {
  "otherNames": "King salmon; spring salmon in BC; tyee for a big one (traditionally 13.6 kg / 30 lb or more at Campbell River, BC); blackmouth, for its black gums; quinnat; saumon chinook in French.",
  "family": "Salmonidae — the largest of the Pacific salmon (genus Oncorhynchus).",
  "nativeRange": "Pacific and Arctic drainages from Point Hope, Alaska, to the Ventura River in California, and across the North Pacific in northeast Asia. At sea it ranges from Monterey Bay to the Chukchi Sea.",
  "introduced": "Stocked in the Great Lakes from the 1870s, but only took hold after Michigan planted them in 1967, partly to control alewife. Now in all five Great Lakes; in Lake Huron about seven of every eight are wild-spawned.",
  "habitat": "Born in rivers and streams, grows up at sea (or in the Great Lakes), then returns to its home river to spawn. In the lakes it roams open water 15–60 m (50–200 ft) deep, in or below the thermocline.",
  "temp": "Cold water. Preferred range about 12–16°C (54–61°F). In the Great Lakes it has been found close to its upper lethal limit of about 22°C (72°F), following prey. It spawns at about 5.5–14.5°C (42–58°F).",
  "record": "IGFA all-tackle world record: 44.11 kg (97 lb 4 oz), Les Anderson, Kenai River, Alaska, 1985. Ontario’s record is 21.04 kg (46.4 lb).",
  "lifespan": "Chinook mature at 2–7 years, most at 3–4, and every one dies after spawning. The oldest recorded are about 9.",
  "diet": "In rivers, insects, amphipods and other small crustaceans; at sea and in the Great Lakes, mostly fish — alewife and smelt in the lakes.",
  "spawning": "Summer and fall — September to October in the Great Lakes. Adults return to the stream where they hatched and turn olive-brown, red or purplish; males grow a hooked upper jaw. Females dig gravel nests (redds). All die after spawning.",
  "young": "Fry and parr stay in fresh water anywhere from a few months to three years — most about a year on the Pacific, only a few months in the Great Lakes. Parr wear well-developed parr marks: dark vertical bars and spots. Before going to sea they fade to a silvery smolt with a dark back.",
  "mouth": "Black gums at the base of the teeth, and a black lining inside the mouth — the best tell from coho.",
  "lookalikes": "Coho salmon: white or grey gums, and spots mostly on the upper lobe of the tail. Chinook: black gums, and small black spots on the back and on both lobes of the tail. Steelhead: pale mouth and gums.",
  "eating": "Excellent eating. The flesh is almost always red; a rare white-fleshed variety is a genetic quirk, and many anglers rate it just as highly. Check your province or state’s fish consumption advisory, especially for large predators.",
  "status": "On the US West Coast, two chinook populations are listed as endangered and seven as threatened under the Endangered Species Act; none are listed in Alaska.",
  "typicalCm": [
   51,
   89
  ],
  "maxCm": 150,
  "shape": "torpedo",
  "faqs": [
   {
    "q": "What is a chinook salmon parr?",
    "a": "A young chinook still living in its home stream. It has well-developed parr marks — dark vertical bars and spots — along the sides. After a few months to three years it turns into a silvery smolt, the marks fade, and it heads for the sea (or the lake)."
   },
   {
    "q": "What is a red chinook salmon?",
    "a": "Usually, a chinook with the normal deep-red flesh, as opposed to a rare “white” chinook, whose meat is white or ivory because it can’t store the red pigment from its food — an inherited trait. It can also mean a spawning chinook, which turns olive-brown to red in the river."
   },
   {
    "q": "Why is the chinook called king salmon?",
    "a": "It is the largest Pacific salmon — hence king. It is also called spring salmon in BC, and a big one is a tyee — traditionally 13.6 kg (30 lb) or more at Campbell River. Tyee comes from the Chinook Jargon word for chief."
   },
   {
    "q": "How big do chinook salmon get?",
    "a": "Mature Pacific chinook are typically about 90 cm (3 ft) and 13.6 kg (30 lb); Great Lakes adults are usually 51–89 cm (20–35 in) and 1.3–6.6 kg (3–15 lb). The largest reach about 1.5 m. The IGFA all-tackle record is 44.11 kg (97 lb 4 oz), Kenai River, Alaska, 1985."
   },
   {
    "q": "Are there chinook salmon in the Great Lakes?",
    "a": "Yes, in all five. They were stocked from the 1870s but only established after Michigan’s 1967 plantings. Many are still stocked, but most Lake Huron chinook are now wild-spawned. They run up rivers in late summer and fall."
   },
   {
    "q": "How do you tell a chinook from a coho salmon?",
    "a": "Look in the mouth. A chinook has black gums at the base of its teeth; a coho’s gums are white or grey. Chinook also have small black spots on both lobes of the tail, while coho spots are mostly on the upper lobe."
   }
  ],
  "sources": [
   {
    "label": "NOAA Fisheries — Chinook Salmon",
    "url": "https://www.fisheries.noaa.gov/species/chinook-salmon"
   },
   {
    "label": "USGS Nonindigenous Aquatic Species — Chinook Salmon",
    "url": "https://nas.er.usgs.gov/queries/FactSheet.aspx?speciesID=920"
   },
   {
    "label": "Ontario Freshwater Fishes Life History Database — Chinook Salmon",
    "url": "https://www.ontariofishes.ca/fish_detail.php?FID=104"
   },
   {
    "label": "Dictionary of Canadianisms on Historical Principles — tyee",
    "url": "https://dchp.arts.ubc.ca/entries/tyee"
   },
   {
    "label": "FishBase — Oncorhynchus tshawytscha",
    "url": "https://www.fishbase.se/summary/Oncorhynchus-tshawytscha.html"
   }
  ]
 },
 "coho-salmon": {
  "otherNames": "Silver salmon, or just silvers, on the Pacific coast. Also called hooknose, silversides and blueback. In the Great Lakes it is simply coho.",
  "family": "Salmonidae (salmon, trout, char and whitefish)",
  "nativeRange": "The North Pacific and its rivers: from Point Hope, Alaska, south to Monterey Bay, California, and in Asia from northern Japan to Russia's Anadyr River. Most abundant from southeast Alaska to central Oregon.",
  "introduced": "The Great Lakes. A first small stocking went into Lake Erie in 1933; large plantings in Lakes Michigan and Superior began in 1966, and some tributaries now hold self-sustaining runs.",
  "habitat": "The ocean, or a Great Lake, for most of its adult life, then back to the small gravel streams where it hatched. Young coho spend one to three winters in streams, and up to five in lakes, before going to sea.",
  "temp": "Cool water. Young coho prefer about 12–14°C (54–57°F). Adults prefer about 12–14.5°C on the way upstream and hold back when rivers reach about 21°C (70°F). They spawn in water of roughly 4–9°C (40–49°F).",
  "record": "IGFA all-tackle world record: 15.08 kg (33 lb 4 oz), caught by Jerry Lifton in the Salmon River at Pulaski, New York, on 27 September 1989. A Lake Ontario fish.",
  "lifespan": "About three years for most: a year or more in fresh water, then about 18 months at sea. Some males, called jacks, come back after only six months in salt water. Every coho dies after spawning.",
  "diet": "In streams, aquatic insects, plankton and salmon eggs. At sea, mostly fish and squid: herring, sand lance, anchovies and sardines, plus young pink and chum salmon.",
  "spawning": "In fall. Alaska fish enter spawning streams from July to November; farther south, runs come in fall and early winter. The female digs a gravel nest (a redd) and lays about 2,400–4,500 eggs, which hatch in six to seven weeks. All coho die after spawning.",
  "young": "Newly hatched alevins stay in the gravel until the yolk sac is used up. The young then hold territories in the stream for one to three winters, feeding on insects, before heading to sea as silvery smolts.",
  "mouth": "Gums at the base of the teeth are white to light grey, set in a dark mouth. A chinook's gums are black.",
  "lookalikes": "Chinook salmon: black gums and black spots on both lobes of the tail. A coho has pale gums and spots on the upper tail lobe only.",
  "eating": "Excellent, and a good source of omega-3 fats, protein, vitamin B12 and selenium. Great Lakes fish come with size-based eating advice; check Ontario's Guide to Eating Ontario Fish or your state's guide before keeping a limit.",
  "status": "Wild runs vary. In the United States one coho population unit is listed as endangered and three as threatened under the Endangered Species Act.",
  "typicalCm": [
   61,
   76
  ],
  "maxCm": 108,
  "shape": "torpedo",
  "faqs": [
   {
    "q": "What is a coho salmon?",
    "a": "A coho is a Pacific salmon (Oncorhynchus kisutch), also called silver salmon. It hatches in a stream, lives there a year or more, feeds at sea for about 18 months, then returns to its home stream to spawn and die. Stocked coho live the same way in the Great Lakes."
   },
   {
    "q": "How big do coho salmon get?",
    "a": "Most adults are 61–76 cm (24–30 in) and 3.6–5.4 kg (8–12 lb). The IGFA world record is 15.08 kg (33 lb 4 oz), caught in 1989 in New York's Salmon River, a Lake Ontario tributary."
   },
   {
    "q": "How do you tell a coho from a chinook?",
    "a": "Look in the mouth and at the tail. A coho has white or pale grey gums and black spots only on the upper lobe of the tail. A chinook has black gums and spots on both tail lobes."
   },
   {
    "q": "Are there coho salmon in the Great Lakes?",
    "a": "Yes. Coho were first stocked in Lake Erie in 1933, and large plantings in Lakes Michigan and Superior began in 1966. They gather at river mouths in late summer and run up tributaries in fall. Some streams now have wild, self-sustaining runs."
   },
   {
    "q": "When do coho salmon run?",
    "a": "In fall. In Alaska they enter spawning streams from July to November. Farther south, and in the Great Lakes, fish stage off river mouths in late summer and run upstream in fall and early winter."
   },
   {
    "q": "Do coho salmon die after spawning?",
    "a": "Yes, every one. The female buries her eggs in a gravel nest, the eggs hatch six to seven weeks later, and the adults die soon after spawning."
   }
  ],
  "sources": [
   {
    "label": "NOAA Fisheries: Coho salmon",
    "url": "https://www.fisheries.noaa.gov/species/coho-salmon"
   },
   {
    "label": "Alaska Dept. of Fish and Game: Coho salmon",
    "url": "https://www.adfg.alaska.gov/index.cfm?adfg=cohosalmon.main"
   },
   {
    "label": "USGS Nonindigenous Aquatic Species: Coho salmon",
    "url": "https://nas.er.usgs.gov/queries/FactSheet.aspx?SpeciesID=908"
   },
   {
    "label": "California Water Boards: Effects of temperature on steelhead, coho and chinook",
    "url": "https://www.waterboards.ca.gov/northcoast/water_issues/programs/tmdls/shasta_river/060707/28appendixaetheeffectsoftemperatureonsteelheadtroutcohosalmonandchinooksalmonbiologyandfunction.pdf"
   }
  ]
 },
 "steelhead": {
  "otherNames": "Steelie. A sea-run rainbow trout; in the Great Lakes, a lake-run one. Runs are named for when fish enter the river: fall-run, summer-run, winter-run and spring-run.",
  "family": "Salmonidae (salmon, trout, char and whitefish)",
  "nativeRange": "Pacific coast rivers from Alaska's Kuskokwim River south through British Columbia, Washington, Oregon and California toward Baja California. Sea-run fish feed in the North Pacific.",
  "introduced": "The Great Lakes, where rainbow trout have been stocked since the 1870s; USGS records them in Michigan from 1876. Lake-run fish now return to tributaries on both the Canadian and US shores. Rainbows have been stocked on every continent except Antarctica.",
  "habitat": "Cold rivers for spawning and for the first two to five years of life, then the ocean or a Great Lake to grow. Returning adults hold in deep slots, runs and tailouts.",
  "temp": "Cold to cool. On wild food, young steelhead grow fastest at about 13–16°C (55–61°F). In Alaska they spawn once rivers reach 6–9°C (43–48°F).",
  "record": "The IGFA files steelhead under rainbow trout. That all-tackle record is 21.77 kg (48 lb), a lake-grown rainbow from Lake Diefenbaker, Saskatchewan, in 2009. The famous sea-run giant is a 19.1 kg (42 lb 2 oz) steelhead from Bell Island, Alaska, in 1970, which held the IGFA record until Lake Diefenbaker rainbows beat it in 2007.",
  "lifespan": "Usually 5–8 years, up to about 11. Alaska's oldest known steelhead was 11: five years in fresh water and six at sea. Great Lakes steelhead typically live four to six years.",
  "diet": "Zooplankton, insects, crustaceans, molluscs, fish eggs and small fish. In the Great Lakes, adults feed mainly on alewives and rainbow smelt.",
  "spawning": "In spring, over gravel. Great Lakes fish enter tributaries from late October to early May and spawn mostly in March and April. Alaska fish spawn from mid-April to early June. Unlike Pacific salmon, many survive: in Alaska 20–30% return to spawn again.",
  "young": "Juveniles live in the river for two to five years (often three in Alaska, about two in the Great Lakes, where they leave at about 20 cm or 8 in), then head out as silvery smolts.",
  "lookalikes": "Resident rainbow trout are the same fish; a fresh steelhead is chrome-bright, with the trout colours showing through a silver sheen that fades in the river. Coho share many rivers: a coho's tail spots are on the upper lobe only, while a steelhead has rows of small black spots across the whole tail.",
  "eating": "Good eating, cooked like salmon. Many wild runs are protected and must be released, and Great Lakes fish carry size-based consumption advice. Check local rules and eating guides.",
  "status": "In the United States, one steelhead population unit (Southern California) is listed as endangered and ten as threatened under the Endangered Species Act.",
  "typicalCm": [
   60,
   76
  ],
  "maxCm": 114,
  "shape": "trout",
  "faqs": [
   {
    "q": "What is a steelhead?",
    "a": "A steelhead is a rainbow trout that goes to sea, or out into a Great Lake, to grow, then returns to its river to spawn. It is the same species (Oncorhynchus mykiss) as the rainbow in a stream, just bigger and silver."
   },
   {
    "q": "Is a steelhead a trout or a salmon?",
    "a": "A trout: a rainbow trout. It shares a genus with the Pacific salmon and lives like one, going to sea and coming back to spawn. But unlike Pacific salmon, a steelhead can survive spawning and return to spawn again."
   },
   {
    "q": "What is the difference between steelhead and rainbow trout?",
    "a": "Only the life they lead. Steelhead migrate to sea or into a big lake; rainbows stay in fresh water. Steelhead come back larger and chrome-silver, and the rainbow's pink band shows through more the longer they spend in the river."
   },
   {
    "q": "Are Great Lakes steelhead real steelhead?",
    "a": "They are lake-run rainbow trout. Rainbows have been stocked into the Great Lakes since the 1870s, and took up the same migration: grow in the lake, then run up tributaries between late October and early May to spawn."
   },
   {
    "q": "How big do steelhead get?",
    "a": "Great Lakes adults average about 2.7–3.2 kg (6–7 lb). Sea-run fish can reach about 114 cm (45 in). The best-known giant is a 19.1 kg (42 lb 2 oz) steelhead caught at Bell Island, Alaska, in 1970."
   },
   {
    "q": "Do steelhead die after spawning?",
    "a": "Not always. Steelhead can spawn more than once. In Alaska, 20–30% of adults return to spawn again, and larger, older females survive best."
   },
   {
    "q": "When do steelhead run?",
    "a": "Mostly fall through spring. Great Lakes fish enter rivers from late October to early May and spawn in March and April. In Alaska, runs enter rivers in spring, summer or fall, but all of them spawn in spring."
   }
  ],
  "sources": [
   {
    "label": "NOAA Fisheries: Steelhead trout",
    "url": "https://www.fisheries.noaa.gov/species/steelhead-trout"
   },
   {
    "label": "Alaska Dept. of Fish and Game: Steelhead",
    "url": "https://www.adfg.alaska.gov/index.cfm?adfg=steelhead.main"
   },
   {
    "label": "Michigan DNR: Steelhead",
    "url": "https://www.michigan.gov/dnr/education/michigan-species/fish-species/steelhead"
   },
   {
    "label": "USGS Nonindigenous Aquatic Species: Rainbow trout",
    "url": "https://nas.er.usgs.gov/queries/FactSheet.aspx?speciesID=910"
   },
   {
    "label": "IGFA world records: Rainbow trout",
    "url": "https://igfa.org/member-services/world-record/common-name/Trout,%20rainbow"
   },
   {
    "label": "California Water Boards: Effects of temperature on steelhead, coho and chinook",
    "url": "https://www.waterboards.ca.gov/northcoast/water_issues/programs/tmdls/shasta_river/060707/28appendixaetheeffectsoftemperatureonsteelheadtroutcohosalmonandchinooksalmonbiologyandfunction.pdf"
   }
  ]
 },
 "atlantic-salmon": {
  "otherNames": "Salmon, sea-run salmon. A grilse is a fish back after one winter at sea; a kelt or black salmon is a spent fish after spawning; parr and smolt are the young stages. The landlocked form is the ouananiche of Quebec, also called landlocked or Sebago salmon.",
  "family": "Salmonidae (salmon, trout, char and whitefish)",
  "nativeRange": "Both sides of the North Atlantic: Quebec and Atlantic Canada, New England (now only a handful of Maine rivers), Iceland, southern Greenland, and Europe and northwest Russia, from north of the Arctic Circle south to Portugal. In Quebec, sea-run fish use rivers of the Quebec City region, North Shore, Saguenay, Lower St. Lawrence, Gaspésie and Ungava Bay.",
  "introduced": "Ouananiche have been stocked beyond their native lakes in Quebec. Farmed Atlantic salmon are raised in net pens, and escapes carry genetic and disease risks for wild fish.",
  "habitat": "Cold rivers connected to the sea, with clean gravel for spawning. Young fish hold in riffles with strong current and rough gravel. At sea they range across the North Atlantic. Ouananiche spend their whole lives in lakes and rivers.",
  "temp": "Cold. Young salmon grow best at about 15–20°C (59–68°F); warmer water stresses them. Hot summers can keep a river above 20°C (68°F) for weeks, and on New Brunswick's Miramichi, rivers close to angling once the water stays at 20°C or warmer for two nights running.",
  "record": "IGFA all-tackle world record: 35.89 kg (79 lb 2 oz), caught by Henrik Henriksen in Norway's Tana River in 1928.",
  "lifespan": "Usually 3–7 years. Unlike Pacific salmon, some survive spawning and come back to spawn again.",
  "diet": "Young salmon eat aquatic insect larvae, other invertebrates and plankton. At sea, adults eat mostly fish, especially capelin, and crustaceans. Adults usually stop feeding once they enter the river to spawn.",
  "spawning": "In autumn, on gravel in shallow, flowing water. Adults enter rivers from spring through September. A female back after two winters at sea lays about 7,500 eggs. Survivors, called kelts, drift back to sea and may return to spawn again.",
  "young": "Parr are brown to bronze, with dark vertical bars and red and black spots. After two to five years in the river they turn silvery, with nearly black backs, and go to sea as smolts. Most return after two winters at sea; those back after one winter are grilse.",
  "lookalikes": "Brown trout share many rivers. An Atlantic salmon has a sparse scattering of small black spots on the upper half of the body and few or none on the tail; a brown trout usually has red spots with pale halos as well as black ones.",
  "eating": "Excellent, but wild Atlantic salmon is tightly managed: many rivers are catch-and-release only, and some are closed. Most Atlantic salmon in shops is farmed.",
  "status": "Near Threatened on the IUCN Red List. The Gulf of Maine population is listed as endangered in the United States. Quebec rates its salmon as stable since the 2000s, despite year-to-year swings.",
  "typicalCm": [
   45,
   110
  ],
  "maxCm": 150,
  "shape": "torpedo",
  "faqs": [
   {
    "q": "What is an Atlantic salmon?",
    "a": "The salmon of the North Atlantic (Salmo salar). It hatches in a cold river, grows there for two to five years, feeds at sea, then returns home to spawn. Unlike Pacific salmon it can survive spawning. It is a close cousin of the brown trout."
   },
   {
    "q": "How big do Atlantic salmon get?",
    "a": "Adults typically run 45–110 cm (18–43 in). Sea-run fish average 3.6–5.4 kg (8–12 lb), and fish of 14 kg (30 lb) or more turn up. The IGFA world record, from Norway's Tana River in 1928, weighed 35.89 kg (79 lb 2 oz)."
   },
   {
    "q": "Do Atlantic salmon die after spawning?",
    "a": "Not all of them. Spent fish, called kelts or black salmon, drift back to sea, and some return to spawn again in later years. That is a real difference from Pacific salmon, which all die."
   },
   {
    "q": "What is a grilse?",
    "a": "A grilse is an Atlantic salmon that comes back to its river after just one winter at sea. It is smaller than the multi-sea-winter salmon, most of which return after two years at sea."
   },
   {
    "q": "What is an ouananiche?",
    "a": "The landlocked Atlantic salmon of Quebec: the same species, living its whole life in fresh water. It is native to lakes of Saguenay–Lac-Saint-Jean, the North Shore and northern Quebec, and has been stocked elsewhere. It is also called landlocked or Sebago salmon."
   },
   {
    "q": "Are Atlantic salmon endangered?",
    "a": "It depends where. The IUCN lists the species as Near Threatened worldwide, and the Gulf of Maine population is endangered in the United States. Quebec rates its salmon as stable. Many rivers are catch-and-release or closed, so check river-by-river rules."
   },
   {
    "q": "Where do Atlantic salmon live?",
    "a": "In the North Atlantic and the cold rivers that feed it: Quebec and Atlantic Canada, a few Maine rivers, Iceland, Greenland, and Europe from northern Norway to Portugal. Ouananiche live in Quebec's lakes."
   }
  ],
  "sources": [
   {
    "label": "NOAA Fisheries: Atlantic salmon",
    "url": "https://www.fisheries.noaa.gov/species/atlantic-salmon-protected"
   },
   {
    "label": "Gouvernement du Québec: Saumon atlantique",
    "url": "https://www.quebec.ca/agriculture-environnement-et-ressources-naturelles/faune/animaux-sauvages-quebec/fiches-especes-fauniques/saumon-atlantique"
   },
   {
    "label": "Conservation Physiology: Thermal stress in wild juvenile Atlantic salmon",
    "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC5386008"
   },
   {
    "label": "IGFA world records: Atlantic salmon",
    "url": "https://igfa.org/member-services/world-record/common-name/Salmon,%20Atlantic"
   }
  ]
 },
 "striped-bass": {
  "otherNames": "Striper, linesider, and rockfish or 'rock' around Chesapeake Bay. Often misspelled 'stripped bass'.",
  "family": "Moronidae (temperate basses)",
  "nativeRange": "Atlantic rivers and estuaries from the St. Lawrence and New Brunswick south to Florida's St. Johns River, and Gulf rivers from Florida to Louisiana. In Canada, fish spawn in the St. Lawrence, the Miramichi (southern Gulf of St. Lawrence) and the Shubenacadie River (Bay of Fundy).",
  "introduced": "The Pacific coast, starting in California in the 1800s, and now from British Columbia to Mexico. Also stocked into many inland lakes and reservoirs, where some populations are landlocked.",
  "habitat": "Surf, rips, estuaries and rocky shores in summer; rivers in spring to spawn. Juveniles stay in estuaries and sounds for two to four years. Atlantic fish move north in summer and south in winter. Shubenacadie River fish overwinter in Grand Lake, Nova Scotia.",
  "temp": "Cool to mild. Adults tracked in a reservoir chose about 13–19°C (55–66°F) through the year, averaging 17.5°C in the growing season, and they seem to prefer water cooler than about 22°C (72°F) where oxygen allows. Spawning starts as rivers warm past about 10–15°C (50–59°F).",
  "record": "IGFA all-tackle world record: 37.14 kg (81 lb 14 oz), caught by Greg Myerson in Long Island Sound off Westbrook, Connecticut, on 4 August 2011. The IGFA keeps a separate landlocked record: 31.55 kg (69 lb 9 oz), Black Warrior River, Alabama, 2013.",
  "lifespan": "Up to about 30 years. In the southern Gulf of St. Lawrence they pass 27 years and over a metre long.",
  "diet": "Larvae eat zooplankton; juveniles eat insect larvae, small crustaceans and larval fish. Adults eat fish (alewives, herring, smelt, eels, sand lance, silversides) plus squid, crabs and sea worms. They stop feeding shortly before spawning.",
  "spawning": "In spring, in fresh or brackish river water. Males mature at about two to four years (from about 35 cm in Canada), females at four to eight (from about 45 cm). Shubenacadie fish spawn at about 15–16°C. Most of the US Atlantic migratory stock comes from Chesapeake Bay, with the Hudson and Delaware rivers next.",
  "young": "Larvae drift in the river and eat zooplankton. Juveniles live in estuaries and coastal sounds for two to four years before joining the migrating adults.",
  "lookalikes": "In stocked reservoirs it shares water with white bass and the white bass × striped bass hybrid ('wiper'), which look similar. A striped bass has seven or eight prominent black stripes running along the scale rows, one of them on the lateral line.",
  "eating": "Good eating: low-fat protein and a source of selenium. Consumption advisories for striped bass vary from state to state and province to province; check the local guide.",
  "status": "The Atlantic coastal stock is assessed as overfished, though overfishing is not occurring. In Canada (COSEWIC, 2012): the St. Lawrence River and Bay of Fundy populations are Endangered; the southern Gulf of St. Lawrence population is of Special Concern.",
  "typicalCm": [
   40,
   100
  ],
  "maxCm": 152,
  "shape": "torpedo",
  "faqs": [
   {
    "q": "What is a striped bass?",
    "a": "A big, silver, sea-going bass (Morone saxatilis) with seven or eight dark stripes down each side. It spawns in rivers in spring and spends the rest of the year along the coast, or, where stocked, in large reservoirs."
   },
   {
    "q": "How big do striped bass get?",
    "a": "Adults commonly run from 40 cm to over a metre (16–40 in). The IGFA world record is 37.14 kg (81 lb 14 oz), from Long Island Sound in 2011. They can live about 30 years."
   },
   {
    "q": "Are there striped bass in Canada?",
    "a": "Yes: in the St. Lawrence, the southern Gulf of St. Lawrence (the Miramichi) and the Bay of Fundy. The St. Lawrence population had vanished by the late 1960s. Quebec restocked it from 2002 with Miramichi fish, and wild spawning resumed in 2008."
   },
   {
    "q": "Is it striped bass or stripped bass?",
    "a": "Striped bass, for the stripes. 'Stripped bass' is a common misspelling. Anglers usually just say striper, and around Chesapeake Bay it is called rockfish."
   },
   {
    "q": "What do striped bass eat?",
    "a": "Mostly other fish: alewives, herring, smelt, eels, sand lance and silversides, plus squid, crabs and sea worms. That is why anglers follow the bait: find the birds working a school of baitfish, and the stripers are often underneath."
   },
   {
    "q": "Where do striped bass spawn?",
    "a": "In fresh or brackish river water in spring. Chesapeake Bay produces most of the US Atlantic coast's migrating stripers, with the Hudson and Delaware rivers next. In Canada they spawn in the St. Lawrence, the Miramichi and the Shubenacadie."
   }
  ],
  "sources": [
   {
    "label": "NOAA Fisheries: Atlantic striped bass",
    "url": "https://www.fisheries.noaa.gov/species/atlantic-striped-bass"
   },
   {
    "label": "COSEWIC assessment and status report: Striped bass (2012)",
    "url": "https://wildlife-species.canada.ca/species-risk-registry/virtual_sara/files/COSEWIC/sr_bar_raye_striped_bass_1213a_e.pdf"
   },
   {
    "label": "Fisheries and Oceans Canada: The striped bass returns to the St. Lawrence",
    "url": "https://dfo-mpo.gc.ca/species-especes/publications/sara-lep/stripedbass-barraye/index-eng.html"
   },
   {
    "label": "USGS: The fundamental thermal niche of adult landlocked striped bass",
    "url": "https://pubs.usgs.gov/publication/70029335"
   }
  ]
 },
 "arctic-grayling": {
  "otherNames": "Grayling, American grayling, and 'sailfish of the north' for its dorsal fin.",
  "family": "Salmonidae (salmon, trout, char, whitefish and grayling)",
  "nativeRange": "Alaska and northern Canada west of Hudson Bay: Yukon, the Northwest Territories and Nunavut (not the Arctic islands), and the north of BC, Alberta, Saskatchewan and Manitoba. Also in Canada's Flathead River (BC) and Belly River (Alberta), a small native population in Montana, and Siberia west to the Kara River.",
  "introduced": "Transplanted to waters in Vermont, Wyoming, Colorado, Utah, Arizona, Nevada and California.",
  "habitat": "Clear, cold, well-oxygenated rivers and lakes. Adults hold in open water of medium to large rivers and lake outlets, and run up rocky creeks to spawn. They rarely enter salt water.",
  "temp": "Cold. In a lab study, young grayling grew faster as water warmed up to 18°C (64°F); above that their survival fell, and none survived above 22°C (72°F).",
  "record": "IGFA all-tackle world record: 2.69 kg (5 lb 15 oz), caught by Jeanne Branson in the Katseyedie River, Northwest Territories, on 16 August 1967.",
  "lifespan": "Slow-growing and long-lived for its size: aged to 32 years in Alaska, and sometimes 20 in Canada's Far North. Most first spawn at four to seven years.",
  "diet": "Mostly insects drifting in the current: black flies, mayflies, stoneflies and caddisflies. Also land insects, salmon eggs, small fish, and now and then a small mammal such as a lemming. Young fish start on zooplankton.",
  "spawning": "In spring, often migrating under the ice to reach spawning streams early. They spawn over gravel in shallow, current-swept water with no nest. A female lays 1,500–30,000 eggs, and the fry hatch about three weeks later.",
  "young": "Fry reach 5–10 cm (2–4 in) by the end of their first summer, moving from zooplankton to insects.",
  "lookalikes": "Whitefish share its rivers and silvery look, but only a grayling carries the tall, sail-like dorsal fin edged in red and dotted with red, aqua or purple spots.",
  "eating": "Edible, and eaten fresh: fried, broiled or baked. A minor commercial fish.",
  "status": "Least Concern worldwide (IUCN).",
  "typicalCm": [
   25,
   46
  ],
  "maxCm": 76,
  "shape": "trout",
  "faqs": [
   {
    "q": "What is an Arctic grayling?",
    "a": "A northern member of the salmon family (Thymallus arcticus) with a huge, sail-like dorsal fin spotted in red, aqua and purple. It lives in clear, cold rivers and lakes across Alaska and northern Canada and eats mostly drifting insects."
   },
   {
    "q": "Where do Arctic grayling live?",
    "a": "In Canada, west of Hudson Bay: Yukon, the Northwest Territories, Nunavut, and the north of BC, Alberta, Saskatchewan and Manitoba. Also nearly all of Alaska, Siberia, and a small native population in Montana. They have been transplanted to several western US states."
   },
   {
    "q": "How big do grayling get?",
    "a": "Most are 25–30 cm (10–12 in) at maturity; anything over 46 cm (18 in) is a big one. The IGFA world record is 2.69 kg (5 lb 15 oz), from the Katseyedie River, Northwest Territories, in 1967."
   },
   {
    "q": "What do grayling eat?",
    "a": "Mostly insects drifting in the current: black flies, mayflies, stoneflies and caddisflies. That is why they rise so readily to small dry flies. They also take salmon eggs, small fish and, now and then, a small mammal."
   },
   {
    "q": "How long do Arctic grayling live?",
    "a": "A long time for a small fish. In cold northern water they grow slowly and have been aged to 32 years in Alaska. Most spawn for the first time at four to seven years old."
   },
   {
    "q": "Is a grayling a trout?",
    "a": "No, but it is a relative. Grayling belong to the salmon family, alongside trout, char and whitefish, in a genus of their own, Thymallus."
   }
  ],
  "sources": [
   {
    "label": "Alaska Dept. of Fish and Game: Arctic grayling",
    "url": "https://www.adfg.alaska.gov/index.cfm?adfg=arcticgrayling.main"
   },
   {
    "label": "The Canadian Encyclopedia: Grayling",
    "url": "https://prod-front.thecanadianencyclopedia.ca/en/article/grayling"
   },
   {
    "label": "Transactions of the AFS: Temperature, growth and survival of Arctic grayling juveniles (abstract)",
    "url": "https://openpolar.no/Record/crwiley:10.1002%2Ftafs.10453"
   },
   {
    "label": "IGFA world records: Arctic grayling",
    "url": "https://igfa.org/member-services/world-record/common-name/Grayling,%20Arctic"
   }
  ]
 },
 "lake-whitefish": {
  "otherNames": "Whitefish, common whitefish, eastern or Great Lakes whitefish, humpback whitefish (its small head makes the back look humped), Sault whitefish, gizzard fish.",
  "family": "Salmonidae (whitefish subfamily)",
  "nativeRange": "Most of Canada, in Atlantic, Arctic and Pacific drainages, south into New England, the Great Lakes basin and central Minnesota. In Alaska, the Copper and Susitna river drainages.",
  "habitat": "Large, deep, cold lakes and some big rivers; occasionally brackish water. Usually 15–37 m (50–120 ft) deep, sometimes to 128 m. They move shallow in spring, deep in summer as the shallows warm, onto shoals to spawn in late fall, then back to deep water.",
  "temp": "Cold. Usually found in water of about 8–14°C (46–57°F); young fish prefer about 16–17°C. They spawn once water drops below about 7°C (45°F), and the eggs develop best at about 3–8°C through the winter.",
  "record": "IGFA all-tackle world record: 6.52 kg (14 lb 6 oz), caught by Dennis Laycock at Meaford, Ontario, on Georgian Bay, on 21 May 1984. Ontario's own record is heavier: 6.7 kg (14.8 lb). The largest on record is a 19 kg (42 lb) fish from Lake Superior in 1918.",
  "lifespan": "Often up to about 25 years; the oldest recorded reached 50.",
  "diet": "A bottom feeder with a small mouth: aquatic insect larvae, amphipods (scuds), fingernail clams, snails, opossum shrimp, midge larvae, fish eggs and small fish. Young eat zooplankton.",
  "spawning": "From mid-October to early December, at night, over gravel, rubble or small rocks near shore. A female lays 10,000–130,000 eggs. They incubate all winter (about 133 days at 1.7°C) and hatch in early spring.",
  "young": "Hatch in early spring and feed on zooplankton and small insect larvae. Young whitefish are food for lake trout, salmon, pike, walleye and burbot.",
  "mouth": "Small and set underneath, with the blunt snout overhanging it: built for picking food off the bottom. Two small flaps of skin sit between the nostrils.",
  "lookalikes": "Round whitefish, which is slimmer and round in cross-section. The lake whitefish is deeper-bodied and oval in cross-section, with two flaps of skin between the nostrils and a deeply forked tail.",
  "eating": "Very good, and the basis of subsistence and commercial fisheries across the north for generations. Excellent smoked, and the roe is made into caviar. Check the provincial or state eating guide for the lake you fish.",
  "status": "Least Concern worldwide (IUCN).",
  "typicalCm": [
   30,
   65
  ],
  "maxCm": 100,
  "shape": "trout",
  "faqs": [
   {
    "q": "What is a lake whitefish?",
    "a": "A silvery, deep-bodied member of the salmon family (Coregonus clupeaformis) that lives in big, cold northern lakes. It has a small mouth under a blunt snout and feeds on the bottom. It has fed northern communities, and the Great Lakes commercial fishery, for generations."
   },
   {
    "q": "How big do lake whitefish get?",
    "a": "Most are 30–65 cm (12–26 in) and 0.9–1.8 kg (2–4 lb). The IGFA world record is 6.52 kg (14 lb 6 oz), from Meaford, Ontario, in 1984. The largest ever recorded, from Lake Superior in 1918, weighed 19 kg (42 lb)."
   },
   {
    "q": "Where do you find lake whitefish in winter?",
    "a": "Over the deep basins and flats of big, cold lakes, usually right on the bottom. They move onto shallow shoals to spawn in late fall, then drift back deeper under the ice. A small jigging spoon or tungsten jig worked on bottom finds them."
   },
   {
    "q": "When do lake whitefish spawn?",
    "a": "From mid-October to early December, at night, over gravel and rock near shore, once the water drops below about 7°C (45°F). The eggs sit on the bottom all winter and hatch in early spring."
   },
   {
    "q": "Are lake whitefish good to eat?",
    "a": "Yes. They have supported commercial and subsistence fisheries across the north for generations. They are excellent smoked, and their roe is made into caviar."
   },
   {
    "q": "How long do lake whitefish live?",
    "a": "Commonly up to about 25 years, and the oldest on record reached 50. Fish in cold, northern lakes grow slowly and tend to live longest."
   }
  ],
  "sources": [
   {
    "label": "Ontario: Lake whitefish",
    "url": "https://www.ontario.ca/page/lake-whitefish"
   },
   {
    "label": "Minnesota DNR: Lake whitefish",
    "url": "https://dnr.state.mn.us/minnaqua/speciesprofile/lake_whitefish.html"
   },
   {
    "label": "Animal Diversity Web: Coregonus clupeaformis",
    "url": "https://animaldiversity.org/accounts/Coregonus_clupeaformis/"
   },
   {
    "label": "FishBase: Coregonus clupeaformis",
    "url": "https://fishbase.org/summary/234"
   }
  ]
 },
 "burbot": {
  "otherNames": "Eelpout, lawyer, ling, cusk, freshwater cod, and loche or mariah in the Northwest Territories. Also 'poor man's lobster', for the way it eats.",
  "family": "Lotidae (burbots and lings), in the cod order. Older references put it in Gadidae, the cod family.",
  "nativeRange": "All around the north above about 40°N: Europe, Asia and North America. Across Canada and Alaska, south into the Great Lakes states and as far as Missouri and Kansas.",
  "habitat": "Deep, cold lakes and large rivers over almost any bottom (silt, mud, gravel, rubble), often around rocks and crevices. Most active at night and in winter; they move shallow to spawn under the ice and sit deep through summer.",
  "temp": "Cold. Adults keep to water of about 12°C (54°F) and colder, and avoid water much above 13°C (55°F). They spawn under the ice.",
  "record": "IGFA all-tackle world record: 11.40 kg (25 lb 2 oz), caught by Sean Konrad in Lake Diefenbaker, Saskatchewan, on 27 March 2010. The fish was about 104 cm (41 in) long.",
  "lifespan": "Burbot older than 20 years are not uncommon. They grow slowly: five to seven years to reach 46 cm (18 in), about the size at which most spawn for the first time.",
  "diet": "Young burbot eat insects, water fleas and other small invertebrates. By age five or six they eat almost nothing but fish (whitefish, sculpins, lampreys, perch, pike, walleye, trout and other burbot), plus fish eggs, and now and then a mouse or shrew.",
  "spawning": "In midwinter under the ice, from about January to March depending on latitude, over gravel in the shallows or on offshore reefs and shoals. Eggs are tiny, about 1 mm across. A big female can release more than a million.",
  "young": "Newly hatched larvae drift in open water, eating tiny crustaceans and zooplankton. By their first autumn they are about 11–12 cm (4–5 in) long.",
  "mouth": "One soft, whisker-like barbel hangs from the tip of the chin.",
  "lookalikes": "People take burbot for eels, and Ontario lists bowfin as its look-alike. The tells: a single barbel on the chin, a long, thin anal fin, and small embedded scales that make it feel smooth and slimy.",
  "eating": "Very good eating, hence 'poor man's lobster'. The liver is large and rich in vitamins A and D; Gwich'in families along the lower Mackenzie River have long valued burbot livers as food. As fish-eaters, burbot carry some mercury, so follow local consumption advice.",
  "status": "Least Concern worldwide (IUCN). Not recorded in Britain since 1970. Restoration work is under way for burbot in the Kootenai River of Idaho.",
  "typicalCm": [
   40,
   73
  ],
  "maxCm": 152,
  "shape": "eel",
  "faqs": [
   {
    "q": "What is a burbot?",
    "a": "A freshwater relative of cod (Lota lota), and the only member of its group that lives its whole life in fresh water. It is long and eel-like, mottled brown and yellow, with one barbel on its chin, and lives in deep, cold lakes and big rivers."
   },
   {
    "q": "How big do burbot get?",
    "a": "Most are about 40–73 cm (16–29 in); in Alaska they average 1.4–2.3 kg (3–5 lb). The IGFA world record is 11.4 kg (25 lb 2 oz), about 104 cm (41 in) long, from Lake Diefenbaker, Saskatchewan, in 2010."
   },
   {
    "q": "Is a burbot an eel?",
    "a": "No. It only looks like one. A burbot is a fish of the cod group, with a single barbel hanging from its chin and small scales buried in slimy skin. The long tail and slick feel are what fool people."
   },
   {
    "q": "Where do burbot live?",
    "a": "Across the north of the world above about 40°N. In Canada they live in lakes and big rivers across most of the country, and they reach south into the Great Lakes states and as far as Kansas."
   },
   {
    "q": "Can you eat burbot?",
    "a": "Yes, and it is very good: the reason it is called 'poor man's lobster'. The large liver is prized too; it is rich in vitamins A and D, and Gwich'in families on the lower Mackenzie River have long eaten burbot livers. Follow local mercury advice."
   },
   {
    "q": "When do burbot spawn?",
    "a": "In midwinter, under the ice, usually between January and March. They gather in the shallows or on offshore reefs and release huge numbers of tiny eggs. That is why burbot fishing peaks after dark in the ice season."
   },
   {
    "q": "How long do burbot live?",
    "a": "Burbot older than 20 years are not uncommon in Alaska. They grow slowly, taking five to seven years to reach 46 cm (18 in), about when most spawn for the first time."
   }
  ],
  "sources": [
   {
    "label": "Alaska Dept. of Fish and Game: Burbot",
    "url": "https://www.adfg.alaska.gov/index.cfm?adfg=burbot.main"
   },
   {
    "label": "Illinois-Indiana Sea Grant: Species spotlight, burbot",
    "url": "https://iiseagrant.org/species-spotlight-burbot"
   },
   {
    "label": "Cott et al. 2018, Arctic Science: Traditional burbot fishery and liver nutrition, lower Mackenzie River",
    "url": "https://grrb.nt.ca/wp-content/uploads/2021/04/Cott-et-al.2018_Arctic-Sci_trad-methods_burbot.pdf"
   },
   {
    "label": "Wyoming Game and Fish: Burbot",
    "url": "https://wgfd.wyo.gov/media/1440/download"
   },
   {
    "label": "Ontario: Burbot",
    "url": "https://www.ontario.ca/page/burbot"
   },
   {
    "label": "FishBase: Lota lota",
    "url": "https://www.fishbase.se/summary/Lota-lota.html"
   }
  ]
 },
 "redfish": {
  "otherNames": "Red drum, channel bass, spottail bass, red bass, or just 'red'. Young fish are puppy drum or rat reds; big spawners are bull reds. In Atlantic Canada and New England, 'redfish' means a different fish: the deep-water ocean perch (Sebastes).",
  "family": "Sciaenidae (drums and croakers)",
  "nativeRange": "The Atlantic coast from Massachusetts to Key West, Florida, and around the Gulf of Mexico to Tuxpan, Mexico. Found in estuaries all around Florida.",
  "habitat": "Shallow bay edges 0.3–1.2 m (1–4 ft) deep with seagrass, soft mud and oyster reef; marsh creeks for the young; surf, passes, nearshore reefs and oil platforms for big adults. They range from nearly fresh estuaries out to water at least 15 m (50 ft) deep.",
  "temp": "Warm. Spawning and early growth happen at about 22–30°C (72–86°F). Juveniles tolerate about 8.5–33.5°C (47–92°F), and young fish move to deeper, steadier water in cold snaps.",
  "record": "IGFA all-tackle world record: 42.69 kg (94 lb 2 oz), caught by David Deuel at Avon, on North Carolina's Hatteras Island, on 7 November 1984.",
  "lifespan": "The oldest aged red drum were about 37–38 years old, and a few as old as 60 have been reported.",
  "diet": "A bottom feeder. Young fish eat small crabs, shrimp and marine worms; adults eat blue crabs, shrimp and fish such as menhaden, spot and anchovies.",
  "spawning": "Late summer and fall, mid-August to mid-October on the Gulf, near passes, inlets and beaches in salty water. Males drum by vibrating muscles against the swim bladder to call females. Fish mature at three to five years, males at about 71 cm (28 in) and females about 84 cm (33 in).",
  "young": "Puppy drum spend their first three years or so in bays, marsh creeks and the surf near passes. They grow to about 28 cm (11 in) in the first year and 43–56 cm (17–22 in) by the second. Young fish have a diamond-shaped tail.",
  "mouth": "Inferior and horizontal: set low under a rounded snout, for rooting crabs and shrimp off the bottom. Small teeth in bands on both jaws. No chin barbels and no big canine teeth.",
  "lookalikes": "Black drum is chunky and high-backed, with many whisker-like barbels under the chin and no tail spot. Spotted seatrout have two big canine teeth. A red drum is copper-bronze, with a black eyespot (sometimes several) at the base of the tail.",
  "eating": "Good eating, and smaller fish are considered better table fare than big bull reds.",
  "status": "A management success: after strict limits, stocks rebounded. Commercial harvest is prohibited in Florida. Least Concern worldwide (IUCN).",
  "typicalCm": [
   46,
   100
  ],
  "maxCm": 155,
  "shape": "torpedo",
  "faqs": [
   {
    "q": "What are redfish?",
    "a": "In the southern US, redfish means red drum (Sciaenops ocellatus): a copper-bronze coastal fish with a black spot at the base of the tail. It lives from Massachusetts to Mexico, mostly in shallow bays, marshes and surf, and is one of the most popular inshore fish on the Gulf and Atlantic coasts."
   },
   {
    "q": "What are the types of redfish?",
    "a": "Two unrelated fish share the name. Red drum is the inshore redfish of the southern US. In Atlantic Canada and New England, redfish means ocean perch: three deep-water, bright red Sebastes species, such as the Acadian redfish, that bear live young and often live to 40. Pacific rockfish are their cousins."
   },
   {
    "q": "Where do redfish live?",
    "a": "Red drum live along the Atlantic coast from Massachusetts to Florida and around the Gulf of Mexico to Tuxpan, Mexico. Young fish use marsh creeks, grass flats and oyster bars; big adults move to the surf, passes, nearshore reefs and oil platforms."
   },
   {
    "q": "What is redfish habitat?",
    "a": "Shallow water at the edge of the bay: 0.3–1.2 m (1–4 ft) deep over seagrass, soft mud and oyster reef, from nearly fresh marsh to salty surf. On a rising tide they push into inches of water to root for crabs, often with their tails showing."
   },
   {
    "q": "Are there redfish in Florida?",
    "a": "Yes, in estuaries all around the state, from the Panhandle to the Keys and up the Atlantic coast. Florida manages them as a recreational-only fish with a slot limit and regional bag limits, and the Indian River Lagoon is catch-and-release only. Check FWC's current rules before keeping one."
   },
   {
    "q": "What does a red drum's mouth look like?",
    "a": "Underslung. The mouth sits low and flat under a rounded snout, built for rooting food off the bottom, with bands of small teeth rather than fangs. A black drum's mouth is similar but has whisker-like barbels under the chin; a red drum has none."
   },
   {
    "q": "How big do red drum get?",
    "a": "In South Carolina they average about 46 cm (18 in) and 1.2 kg (2.6 lb), and offshore bull reds are often over 14 kg (30 lb). The IGFA world record is 42.69 kg (94 lb 2 oz), from Hatteras Island, North Carolina, in 1984."
   }
  ],
  "sources": [
   {
    "label": "Texas Parks and Wildlife: Red drum",
    "url": "https://tpwd.texas.gov/huntwild/wild/species/reddrum"
   },
   {
    "label": "South Carolina DNR: Red drum",
    "url": "https://dnr.sc.gov/marine/species/reddrum.html"
   },
   {
    "label": "ASMFC: Atlantic sciaenid habitat, red drum",
    "url": "https://asmfc.org/wp-content/uploads/2025/02/AtlanticSciaenidHabitat_RedDrum.pdf"
   },
   {
    "label": "Fisheries and Oceans Canada: Redfish (ocean perch)",
    "url": "https://www.dfo-mpo.gc.ca/species-especes/profiles-profils/redfish-sebaste-eng.html"
   }
  ]
 },
 "speckled-trout": {
  "otherNames": "Spotted seatrout, speckled seatrout, spotted trout, speck, spotted weakfish and gator trout. In Canada, 'speckled trout' means something else: the brook trout, a char.",
  "family": "Sciaenidae (drums and croakers). Not a trout.",
  "nativeRange": "The Atlantic coast from Cape Cod, Massachusetts, to southern Florida, and throughout the Gulf of Mexico into Mexico. Most abundant from Chesapeake Bay south; found in every major Florida estuary.",
  "habitat": "Estuaries, shallow coastal bays and sounds over sand and seagrass, to about 10 m (33 ft), plus salt marshes and tidal pools. Seagrass flats in summer; deeper holes, channels and rivers in cold weather.",
  "temp": "Warm-temperate. Most comfortable at about 16–27°C (60–80°F): on seagrass flats in the warm months, in deeper, steadier water when it cools. Hard freezes can cause mass die-offs.",
  "record": "IGFA all-tackle world record: 7.92 kg (17 lb 7 oz), caught by Craig Carson at Fort Pierce, Florida, on 11 May 1995.",
  "lifespan": "Usually up to about 8–10 years; the oldest reported was 18.",
  "diet": "Larvae eat copepods; juveniles eat mysids and grass shrimp. Adults eat fish (anchovies, silversides, pinfish, mullet, croaker, menhaden) and shrimp.",
  "spawning": "April to September, at night, in deeper parts of estuaries near inlets and passes with good tidal flow. Males drum to attract females, and a female spawns many times through the season.",
  "young": "Juveniles grow up in seagrass beds and small marsh creeks, eating mysid and grass shrimp. The young have a pointed, lance-shaped tail and reach about 20 cm (8 in) in their first year. Some mature by the end of their first year; others at two or three.",
  "mouth": "Two large, curved canine teeth at the tip of the upper jaw; the rest are small, and there are none on the roof of the mouth or the tongue.",
  "lookalikes": "Weakfish, a close cousin, lacks the bold round black spots scattered over the back and onto the dorsal fin and tail. The Canadian 'speckled trout' (brook trout) is a freshwater char, with red spots ringed in blue.",
  "eating": "An important food fish throughout its range, usually eaten fresh: steamed, broiled or baked.",
  "status": "Least Concern worldwide (IUCN). Florida manages it with a slot limit and regional bag limits; check FWC's current rules.",
  "typicalCm": [
   25,
   61
  ],
  "maxCm": 100,
  "shape": "trout",
  "faqs": [
   {
    "q": "What is a speckled trout?",
    "a": "In the southern US, a speckled trout is the spotted seatrout (Cynoscion nebulosus): a silver-grey coastal fish with round black spots and two big canine teeth. Despite the name, it is not a trout but a member of the drum and croaker family."
   },
   {
    "q": "Are spotted sea trout and speckled trout the same fish?",
    "a": "Yes. Along the Gulf and southeast Atlantic coasts, 'speckled trout', 'speck' and 'spotted seatrout' all mean Cynoscion nebulosus. 'Speckled sea trout' and 'spotted trout' are the same fish again."
   },
   {
    "q": "What is a speckled trout in Canada?",
    "a": "A brook trout (Salvelinus fontinalis), the native char of eastern Canada's cold streams. It has nothing to do with the saltwater speckled trout of the Gulf; see our brook trout page."
   },
   {
    "q": "Where do you find spotted seatrout in Florida?",
    "a": "In every major estuary around the state. Look over seagrass flats in the warm months, and in deeper holes, channels and rivers when the water cools. Florida uses a slot limit and regional bag limits; check FWC's current rules."
   },
   {
    "q": "What do juvenile speckled trout look like, and where do they live?",
    "a": "Young seatrout grow up in seagrass beds and small marsh creeks, eating mysid and grass shrimp. They have a pointed, lance-shaped tail and reach about 20 cm (8 in) in their first year; at six to eight weeks old they often gather in schools of up to 50."
   },
   {
    "q": "Do speckled trout have teeth?",
    "a": "Yes: two large, curved canine teeth at the tip of the upper jaw, easy to see when the mouth is open. The rest of the teeth are small."
   },
   {
    "q": "How big do speckled trout get?",
    "a": "Most are 0.45–1.4 kg (1–3 lb), and 25–61 cm (10–24 in) long. Fish over 4.5 kg (10 lb) are rare. The IGFA world record is 7.92 kg (17 lb 7 oz), from Fort Pierce, Florida, in 1995."
   }
  ],
  "sources": [
   {
    "label": "Florida Museum: Spotted seatrout",
    "url": "https://www.floridamuseum.ufl.edu/discover-fish/species-profiles/spotted-seatrout"
   },
   {
    "label": "ASMFC: Spotted seatrout",
    "url": "https://asmfc.org/species/spotted-seatrout/"
   },
   {
    "label": "South Carolina DNR: Spotted seatrout",
    "url": "https://dnr.sc.gov/marine/species/spottedseatrout.html"
   },
   {
    "label": "The Canadian Encyclopedia: Char (brook or speckled trout)",
    "url": "https://prod-front.thecanadianencyclopedia.ca/en/article/char"
   },
   {
    "label": "FishBase: Cynoscion nebulosus",
    "url": "https://www.fishbase.se/summary/Cynoscion-nebulosus.html"
   }
  ]
 },
 "snook": {
  "otherNames": "Common snook, linesider, sergeant fish, robalo. Not a salmon, and not related to one.",
  "family": "Centropomidae (snooks)",
  "nativeRange": "The warm western Atlantic: from North Carolina (strays reach New York) through the Gulf of Mexico and Caribbean to Rio de Janeiro, Brazil. In Florida, most abundant from Cape Canaveral south through the Keys and up the Gulf coast to Cedar Key.",
  "habitat": "Mangrove shorelines, beaches, passes, river mouths, nearshore reefs, salt marsh and seagrass, usually shallower than 20 m. Snook often move into fresh water, and juveniles stay in rivers and estuaries.",
  "temp": "Warm. Snook do best in water of about 25–31°C (77–88°F), growing fastest near 28°C (82°F), and barely feed below 20°C (68°F). Cold water kills juveniles at about 9–14°C (48–57°F) and adults at roughly 6–12°C (43–54°F); a January 2010 cold snap sharply cut southwest Florida's snook.",
  "record": "IGFA all-tackle world record: 24.32 kg (53 lb 10 oz), caught by Gilbert Ponce at Parismina Ranch, on Costa Rica's Atlantic coast, on 18 October 1978.",
  "lifespan": "Up to about 20 years. The oldest aged in Florida were an 18-year-old female and a 15-year-old male.",
  "diet": "Larvae and small juveniles eat copepods and tiny crustaceans. From about 4.5 cm long they switch to fish, shrimp and crabs; gobies, mojarras and anchovies are common prey.",
  "spawning": "Late spring through early fall (about April to October, peaking in July and August) in salty water at passes, inlets, river mouths and beaches. Snook change sex: they mature as males, and some become females later, at 24–82 cm and one to seven years old.",
  "young": "Juveniles shelter in rivers, creeks and mangrove backwaters, eating tiny crustaceans. Males can mature in their first year, at 15–20 cm.",
  "mouth": "A big mouth with a protruding lower jaw under a sloping forehead. No teeth on the upper jawbone, just bands of fine teeth.",
  "lookalikes": "Other snook species (genus Centropomus) are smaller; the common snook is the largest in the family, and the bold black lateral line running right into the tail marks it.",
  "eating": "An excellent food fish. In Florida snook cannot be bought or sold, so the only one you eat is one you catch legally: with a snook permit, in open season and inside the slot.",
  "status": "Recovered in Florida: stocks are above FWC's management goal on both coasts. Seasons still close in winter and during summer spawning.",
  "typicalCm": [
   50,
   84
  ],
  "maxCm": 140,
  "shape": "torpedo",
  "faqs": [
   {
    "q": "What is a snook?",
    "a": "A snook (Centropomus undecimalis) is a warm-water fish of Florida's coasts, the Gulf and the Caribbean, living around mangroves, passes, beaches and river mouths. It is silvery-gold, with a bold black line down its side and a protruding lower jaw, and is a prized gamefish."
   },
   {
    "q": "Is a snook a salmon?",
    "a": "No. Snook and salmon are unrelated. Salmon are cold-water fish of the family Salmonidae. The snook belongs to its own tropical family, Centropomidae, and dies when water falls much below about 12°C (54°F). For salmon, see our coho and chinook pages."
   },
   {
    "q": "Where do snook live in Florida?",
    "a": "Mostly the southern half: from Cape Canaveral south through the Keys on the Atlantic side, and up the Gulf coast to about Cedar Key. Look around mangrove shorelines, bridges, passes, beaches and river mouths. Young snook stay up creeks and rivers."
   },
   {
    "q": "How big do snook get?",
    "a": "A common size is about 50 cm (20 in), and big fish pass a metre (40 in); the largest reach about 1.3–1.4 m. The IGFA world record is 24.32 kg (53 lb 10 oz), from Costa Rica in 1978."
   },
   {
    "q": "Why do snook seasons close?",
    "a": "To protect them when they are most vulnerable: during summer spawning, and in winter, when cold water stresses them. Snook barely feed below 20°C (68°F), and water of roughly 6–12°C (43–54°F) kills adults; a cold snap in January 2010 sharply cut southwest Florida's population."
   },
   {
    "q": "Do snook change sex?",
    "a": "Yes. Snook mature as males, and some turn into females later, anywhere from 24 to 82 cm long and one to seven years old. That is why the biggest snook are females."
   },
   {
    "q": "Are snook good to eat?",
    "a": "Yes, snook is an excellent food fish. In Florida it cannot be sold, so you only eat one you catch yourself, legally: with a snook permit, in open season and inside the slot."
   }
  ],
  "sources": [
   {
    "label": "Florida Museum: Common snook",
    "url": "https://www.floridamuseum.ufl.edu/discover-fish/species-profiles/centropomus-undecimalis/"
   },
   {
    "label": "Florida FWC: Snook regulations",
    "url": "https://myfwc.com/fishing/saltwater/recreational/snook/"
   },
   {
    "label": "FishBase: Centropomus undecimalis",
    "url": "https://www.fishbase.se/summary/Centropomus-undecimalis.html"
   },
   {
    "label": "World Aquaculture Society: Snook culture",
    "url": "https://was.org/Magazine/ArticleContent/149"
   }
  ]
 },
 "halibut": {
  "otherNames": "Halibut, Alaskan halibut, northern or right halibut. Anglers call small ones 'chickens'.",
  "family": "Pleuronectidae (right-eyed flounders)",
  "nativeRange": "The North Pacific: from Santa Barbara, California, north through BC to the Bering Sea and Nome, Alaska, and across to northern Japan and the Sea of Okhotsk. Most common in the central Gulf of Alaska, especially around Kodiak Island.",
  "habitat": "On the bottom over sand, gravel, mud or rock, usually 6–300 m (20–1,000 ft) deep and as deep as about 1,100 m (3,600 ft). Big fish winter along the edge of the continental shelf and move into shallower coastal water, about 27–274 m, for summer. Some travel more than 3,200 km (2,000 mi).",
  "temp": "Cold. Pacific halibut favour water of about 3–8°C (37–46°F).",
  "record": "IGFA all-tackle world record: 208.2 kg (459 lb), caught by Jack Tragis near Dutch Harbor (Unalaska), Alaska, on 11 June 1996.",
  "lifespan": "Up to about 55 years, in both sexes. Females grow faster and get much bigger than males.",
  "diet": "Young halibut eat plankton, krill and small fish. Adults eat herring, sand lance, capelin, smelt, pollock, sablefish, cod, rockfish and sculpins, plus octopus, crabs, clams and sometimes smaller halibut.",
  "spawning": "November to March, peaking December to February, in deep water off the edge of the continental shelf at about 90–460 m (300–1,500 ft). A big female lays 500,000 to 4 million eggs, which hatch in 12–20 days. Males mature at about 8 years; half of females are mature by about 12.",
  "young": "Eggs and larvae drift. When a larva is about 2.5 cm (1 in) long, its left eye moves to the right side of the head. By about six months it settles to the bottom in shallow water near shore, dark side up, and moves deeper as it grows.",
  "lookalikes": "Atlantic halibut, its near-twin in another ocean. Among Pacific flatfish, a halibut is the big one: diamond-shaped, about a third as wide as long, eyes on the right (dark) side, with a crescent-shaped tail.",
  "eating": "Excellent, lean eating: about 110 calories and 21 g of protein per 100 g raw, low in saturated fat and sodium. Check provincial or state fish consumption guides.",
  "status": "Not overfished. Canada and the United States have managed Pacific halibut together through the International Pacific Halibut Commission since 1923, with catch limits set each year.",
  "typicalCm": [
   80,
   90
  ],
  "maxCm": 267,
  "shape": "flat",
  "faqs": [
   {
    "q": "How big do Pacific halibut get?",
    "a": "Females can pass 2.4 m (8 ft) and 225 kg (500 lb); the longest confirmed was 267 cm (105 in). Males stay much smaller. Sport-caught halibut are usually 7–9 kg (15–20 lb). The IGFA world record is 208.2 kg (459 lb), from Dutch Harbor, Alaska, in 1996."
   },
   {
    "q": "How long do halibut live?",
    "a": "Up to about 55 years, for both males and females. Females grow faster and get much bigger. Males mature at about eight years, and half of females are mature by about twelve."
   },
   {
    "q": "Why do halibut have both eyes on one side?",
    "a": "They start life as ordinary, upright larvae. When a young halibut is about 2.5 cm (1 in) long, its left eye moves over to the right side. By about six months it settles to the bottom, dark side up and white side down."
   },
   {
    "q": "Is Pacific halibut the same as Atlantic halibut?",
    "a": "No, but they are close cousins in the same genus. Pacific halibut live from California to Alaska and Japan. Atlantic halibut live from Labrador and Greenland to Europe and south to Virginia, and US Atlantic stocks are overfished and rebuilding."
   },
   {
    "q": "How deep do halibut live?",
    "a": "Usually 6–300 m (20–1,000 ft), and as deep as about 1,100 m. Big fish spend winter along the edge of the continental shelf, where they spawn, and come into shallower coastal water for summer, which is when anglers find them."
   },
   {
    "q": "What is a chicken halibut?",
    "a": "The Alaskan anglers' name for a small halibut. Most sport-caught fish weigh 7–9 kg (15–20 lb), though fish over 68 kg (150 lb) are caught often enough."
   }
  ],
  "sources": [
   {
    "label": "Alaska Dept. of Fish and Game: Pacific halibut",
    "url": "https://www.adfg.alaska.gov/index.cfm?adfg=halibut.main"
   },
   {
    "label": "Alaska Dept. of Fish and Game: Wildlife Notebook, Pacific halibut",
    "url": "https://www.adfg.alaska.gov/static/education/wns/pacific_halibut.pdf"
   },
   {
    "label": "NOAA Fisheries: Pacific halibut",
    "url": "https://www.fisheries.noaa.gov/species/pacific-halibut"
   },
   {
    "label": "Washington Dept. of Fish and Wildlife: Pacific halibut",
    "url": "https://wdfw.wa.gov/species-habitats/species/hippoglossus-stenolepis"
   },
   {
    "label": "NOAA Fisheries: Atlantic halibut",
    "url": "https://www.fisheries.noaa.gov/species/atlantic-halibut"
   }
  ]
 },
 "lingcod": {
  "otherNames": "Ling, cultus cod, blue cod, green cod, buffalo cod. Neither a true cod nor a ling.",
  "family": "Hexagrammidae (greenlings)",
  "nativeRange": "Only the west coast of North America, from Kodiak Island and the Alaska Peninsula south through BC and Washington to Baja California. Most abundant off BC and Washington.",
  "habitat": "Rocky reefs and pinnacles, mostly 10–100 m (33–330 ft) deep, recorded to about 475 m. Juveniles are often near kelp beds and rocks closer to shore.",
  "temp": "Cold coastal water. In a Puget Sound hatchery study, lingcod eggs hatched best at about 9°C (48°F), did poorly at 6°C and 12°C, and did not hatch at 15°C (59°F).",
  "record": "IGFA all-tackle world record: 37.45 kg (82 lb 9 oz), caught by Robert Hammond in the Gulf of Alaska off Homer on 27 July 2007.",
  "lifespan": "Females live to about 20 years (25 has been recorded); males to about 14.",
  "diet": "Larvae eat copepods and other zooplankton; juveniles eat young herring and other small fish. Adults eat almost anything: rockfish, herring, sand lance, whole pink or coho salmon, squid, octopus, crab, and other lingcod.",
  "spawning": "Winter. Males claim nest sites on shallow rock in late fall. Females lay egg masses in crevices from December to March, peaking mid-January to mid-March; a big female can lay up to about 490,000 eggs. The male guards the nest for 8–10 weeks until the eggs hatch, and his guarding appears essential to success.",
  "young": "Larvae drift in the plankton. Juveniles grow fast, almost 30 cm (a foot) in the first year and about 45 cm by age two. Males mature at about two; females at three to five years, at 61–75 cm.",
  "mouth": "A big, slightly upturned mouth with a projecting lower jaw and 18 large, sharp, inward-pointing teeth. The upper jaw reaches back past the eye.",
  "lookalikes": "Not a cod: Pacific cod belong to a different family. A lingcod has a long body, a huge toothy mouth, mottled brown or grey colour, and one long dorsal fin with a deep notch between its spiny and soft parts. It has no swim bladder, so it does not bloat when reeled up from depth.",
  "eating": "Excellent: flaky, low in fat, and high in vitamin B12 and selenium. Some fish have blue-green raw flesh; it is harmless and turns white when cooked.",
  "status": "US stocks are not overfished. In BC, the Strait of Georgia population has been at low abundance and closed to commercial fishing since the early 1990s.",
  "typicalCm": [
   61,
   91
  ],
  "maxCm": 152,
  "shape": "torpedo",
  "faqs": [
   {
    "q": "Is a lingcod a cod?",
    "a": "No. Despite the name, a lingcod is neither a cod nor a ling. It belongs to the greenling family (Hexagrammidae) and lives only on the Pacific coast of North America."
   },
   {
    "q": "Why is lingcod meat blue?",
    "a": "Some lingcod have blue-green raw flesh: about 13% in southeast Alaska and 20% or more farther south, more often in females. The cause is not proven (a bile pigment, biliverdin, is suspected). It is harmless and turns white when cooked."
   },
   {
    "q": "How big do lingcod get?",
    "a": "Up to about 1.5 m (5 ft). Females are much bigger than males, which rarely pass 90 cm. Oregon catches average 61–91 cm (2–3 ft). The IGFA world record is 37.45 kg (82 lb 9 oz), from off Homer, Alaska, in 2007."
   },
   {
    "q": "Where do lingcod live?",
    "a": "Only on the west coast of North America, from Alaska to Baja California, and most abundant off BC and Washington. They live on rocky reefs and pinnacles, mostly 10–100 m deep, and ambush fish from the rocks."
   },
   {
    "q": "When do lingcod spawn?",
    "a": "In winter. Females lay egg masses in rock crevices from December to March, and the male guards the nest for 8–10 weeks until the eggs hatch, driving off egg-eating fish."
   },
   {
    "q": "How long do lingcod live?",
    "a": "Females live to about 20 years, and 25 has been recorded. Males live to about 14."
   }
  ],
  "sources": [
   {
    "label": "Fisheries and Oceans Canada: Lingcod",
    "url": "https://www.dfo-mpo.gc.ca/species-especes/profiles-profils/lingcod-morue-lingue-eng.html"
   },
   {
    "label": "NOAA Fisheries: Lingcod",
    "url": "https://www.fisheries.noaa.gov/species/lingcod"
   },
   {
    "label": "US Fish and Wildlife Service: Lingcod (podcast transcript)",
    "url": "https://www.fws.gov/sites/default/files/documents/Lingcod.pdf"
   },
   {
    "label": "Cook et al. 2005, Aquaculture Research: Salinity and temperature during lingcod egg incubation",
    "url": "https://doi.org/10.1111/J.1365-2109.2005.01346.X"
   }
  ]
 },
 "kokanee": {
  "otherNames": "Landlocked sockeye, silver trout, landlocked red salmon.",
  "family": "Salmonidae (salmon, trout, char and whitefish)",
  "nativeRange": "Lakes of British Columbia, Yukon, Alaska, Washington, Idaho and Oregon, plus Russia and Japan.",
  "introduced": "Stocked into many lakes and reservoirs in western and northeastern US states, from California (since 1941), Colorado and Utah to Maine, New York and Vermont.",
  "habitat": "Deep, cold, clear lakes and reservoirs. Near the surface early in the season and in low light, then deeper as lakes stratify: often 9–18 m (30–60 ft) or more by mid to late summer.",
  "temp": "Cool. Kokanee prefer about 10–13°C (50–55°F) and tolerate up to about 15°C (59°F).",
  "record": "IGFA all-tackle world record: 4.37 kg (9 lb 10 oz), caught by Ronald Campbell in Wallowa Lake, Oregon, on 13 June 2010. It beat a 9 lb 6 oz fish from Okanagan Lake, BC, caught in 1988.",
  "lifespan": "Short. Most spawn and die at two to four years old (usually three in BC; often two or three in California reservoirs); some live to five or older.",
  "diet": "Almost entirely zooplankton, strained from the water with fine gill rakers. Fry feed on plankton along the lakeshore.",
  "spawning": "In fall. Kokanee turn bright red with olive-green heads, and males grow a long hooked jaw and a humped back. Stream spawners run up tributaries in September and early October; shore spawners use gravel lake beaches later in fall, into November. They stop feeding as they mature, and all die after spawning.",
  "young": "Fry hide by day at first, then feed on plankton along the lakeshore before moving out to open water.",
  "mouth": "Fine gill rakers for straining zooplankton. Spawning males develop a long, hooked jaw.",
  "lookalikes": "Sockeye salmon are the same species but go to sea and grow much larger. Rainbow trout in the same lakes have rows of black spots across the tail and a pink side stripe; kokanee have bright silver sides and a dark blue-green back until they colour up to spawn.",
  "eating": "Good eating, fresh or smoked. Kokanee stop feeding once they mature and all die after spawning, so fish in bright red fall colours are near the end of their lives.",
  "typicalCm": [
   25,
   43
  ],
  "maxCm": 67,
  "shape": "trout",
  "faqs": [
   {
    "q": "What is a kokanee?",
    "a": "A kokanee is a sockeye salmon that never goes to sea. It lives its whole life in a lake, eating zooplankton, and at about three years old it runs up a stream or onto a gravel shore, turns bright red, spawns and dies."
   },
   {
    "q": "What is the difference between kokanee and sockeye?",
    "a": "They are the same species, Oncorhynchus nerka. Sockeye usually spend two to three years at sea and come back at 1.8–6.8 kg (4–15 lb). Kokanee stay in fresh water and usually reach 25–43 cm (10–17 in)."
   },
   {
    "q": "How big do kokanee get?",
    "a": "Most are 25–30 cm (10–12 in), with 38–43 cm (15–17 in) fish in rich lakes. The IGFA world record is 4.37 kg (9 lb 10 oz), from Wallowa Lake, Oregon, in 2010; the record before it came from Okanagan Lake, BC."
   },
   {
    "q": "How do you fish for kokanee?",
    "a": "Find the depth where the water is about 10–13°C (50–55°F). Early in the season kokanee are near the surface; by mid to late summer they are often 9–18 m (30–60 ft) down. Troll slowly at that depth and watch the sonar for schools."
   },
   {
    "q": "Why do kokanee turn red?",
    "a": "It is their spawning colour. In fall, mature kokanee turn bright red with olive-green heads, and the males grow a hooked jaw and a hump. They stop eating, spawn, and die."
   },
   {
    "q": "Where do kokanee live?",
    "a": "Natively, in lakes of BC, Yukon, Alaska, Washington, Idaho and Oregon, and in Russia and Japan. They have been stocked in many other western lakes and reservoirs; California has had them since 1941."
   }
  ],
  "sources": [
   {
    "label": "California Dept. of Fish and Wildlife: Kokanee",
    "url": "https://wildlife.ca.gov/Fishing/Inland/Kokanee"
   },
   {
    "label": "Idaho Fish and Game: Gearing up for kokanee fishing",
    "url": "https://idfg.idaho.gov/press/gearing-kokanee-fishing"
   },
   {
    "label": "Lake Country Museum: Kokanee biology",
    "url": "https://www.lakecountrymuseum.com/collections-exhibits/the-kokanee-salmon-heritage-project/biology/"
   },
   {
    "label": "IGFA world records: Kokanee",
    "url": "https://igfa.org/member-services/world-record/common-name/Kokanee"
   },
   {
    "label": "NOAA Fisheries: Sockeye salmon",
    "url": "https://www.fisheries.noaa.gov/species/sockeye-salmon"
   }
  ]
 },
 "european-perch": {
  "otherNames": "Perch, common perch, Eurasian perch; redfin or redfin perch in Australia. Perche in French, Barsch in German, baars in Dutch, abborre in Swedish, ahven in Finnish.",
  "family": "Percidae, the perch family — with the zander and ruffe, and North America's yellow perch and walleye.",
  "nativeRange": "Most of Europe, north to the top of Scandinavia, and east across Siberia to the Kolyma River, plus the Aral Sea basin. Naturally absent from the Iberian Peninsula, central Italy and the Adriatic basin.",
  "introduced": "Spain, central and southern Italy, Cyprus, Morocco, South Africa, Australia and New Zealand. In Australia it has harmed native fish, including the endangered Macquarie perch, and New South Wales declares it a noxious species.",
  "habitat": "Almost any still or slow water: lakes of every kind, ponds, canals, slow rivers and brackish lagoons, and the low-salt waters of the Baltic, where perch grow big on herring. It avoids cold, fast water. Small perch school in the shallows; big ones hold deeper, near drop-offs and cover.",
  "temp": "Cool to warm water; FishBase gives about 10–22°C (50–72°F). It spawns in spring — anywhere from February to July, depending on how far north it lives.",
  "record": "IGFA all-tackle world record: 2.9 kg (6 lb 6 oz), Kalle Vaaranen, Kökar, Åland Islands, Finland, 2010. The British record is 2.806 kg (6 lb 3 oz), shared by two fish caught in 2011.",
  "lifespan": "Up to about 22 years, though most perch caught are much younger.",
  "diet": "Young perch eat zooplankton, then bottom insects and shrimps; from about 12 cm long they turn to fish, smaller perch included. They feed by day, hardest around sunrise and sunset, and take whatever is plentiful.",
  "spawning": "In spring, in the shallows. Several males follow each ripe female, and she lays her eggs in a long white ribbon of jelly — up to a metre long — draped over sunken branches, reeds or weed.",
  "young": "Larvae live in open water, then move inshore during their first summer. Males mature at 1–2 years and females at 2–4. In crowded lakes perch can stunt into great numbers of small fish.",
  "mouth": "A large mouth with bands of tiny bristle-like teeth but no canines. The gill cover ends in a sharp spine, and the first dorsal fin's spines are sharp too.",
  "lookalikes": "Yellow perch, its North American twin, is so close that it has sometimes been treated as a subspecies — where you are tells you which. Zander is slimmer, with grey fins and long canine teeth. Ruffe is small, spotted rather than barred, and its two dorsal fins are joined.",
  "eating": "Excellent: firm, white and not too bony. Perch fillets are a classic of Lake Geneva and the other Alpine lakes. Check local consumption advice for big fish from industrial waters.",
  "status": "Common and widespread; IUCN Least Concern.",
  "typicalCm": [
   15,
   35
  ],
  "maxCm": 60,
  "faqs": [
   {
    "q": "How big do European perch get?",
    "a": "Most are 15–35 cm (6–14 in) and well under 1 kg; a perch over 1.5 kg (3 lb) is a specimen almost anywhere. The IGFA world record is 2.9 kg (6 lb 6 oz), from the Åland Islands, Finland, in 2010. The biggest perch grow in the brackish Baltic, where they feed on herring."
   },
   {
    "q": "Is a European perch the same as a yellow perch?",
    "a": "Nearly, but not quite. They are separate species — Perca fluviatilis in Europe and Asia, Perca flavescens in North America — yet they look, behave and taste almost the same and can interbreed, so some biologists have treated the yellow perch as a subspecies of the European one."
   },
   {
    "q": "When do perch spawn?",
    "a": "In spring, as the shallows warm — from February in the south to June or July in the far north. The female lays her eggs in a long ribbon of jelly, up to a metre long, over sunken branches and weed."
   },
   {
    "q": "Why is the perch called redfin?",
    "a": "For its red-orange pelvic and anal fins. In Australia, where it was introduced in the 1800s, redfin is its usual name — and there it is an invasive pest that has harmed native fish."
   },
   {
    "q": "Is perch good to eat?",
    "a": "Yes — it is one of the best-eating freshwater fish in Europe, firm, white and not very bony. Fried perch fillets are a classic around Lake Geneva and the other Alpine lakes."
   }
  ],
  "sources": [
   {
    "label": "FishBase — Perca fluviatilis",
    "url": "https://www.fishbase.se/summary/Perca-fluviatilis.html"
   },
   {
    "label": "IGFA world records — Perch, European",
    "url": "https://igfa.org/member-services/world-record/common-name/Perch,%20European"
   },
   {
    "label": "British Record (Rod Caught) Fish Committee — coarse fish records, January 2026",
    "url": "https://anglingtrust.net/wp-content/uploads/2026/02/BRFC_COARSE_FISH_LISTINGS_Jan-30-2026.pdf"
   },
   {
    "label": "Wikipedia — European perch",
    "url": "https://en.wikipedia.org/wiki/European_perch"
   }
  ]
 },
 "zander": {
  "otherNames": "Pikeperch; sandre in French, snoekbaars in Dutch, Zander in German, gös in Swedish, kuha in Finnish, süllő in Hungarian, sudak in Russian.",
  "family": "Percidae — the largest member of the perch family, and a close cousin of North America's walleye and sauger.",
  "nativeRange": "The Caspian, Baltic, Black Sea and Aral basins, the Elbe in the North Sea basin and the Maritsa in the Aegean — from Germany and southern Scandinavia east into Russia and Central Asia, north to about 65°N in Finland.",
  "introduced": "Widely: Britain (first at Woburn Abbey in 1878, then the Great Ouse Relief Channel in the Fens), the Netherlands, France, Switzerland, Spain, Portugal and Italy, plus Morocco, Tunisia and Anatolia. Several countries report harm to native fish since.",
  "habitat": "Big, turbid rivers, canals, reservoirs and nutrient-rich lowland lakes, and brackish coastal lagoons and estuaries. Its eyes work well in low light, so it thrives in coloured water and feeds at dawn, dusk and through the night.",
  "temp": "Cool to warm water; FishBase gives about 6–22°C (43–72°F). It spawns in April and May in most places, when the water on the spawning grounds reaches about 10–14°C (50–57°F).",
  "record": "IGFA all-tackle world record: 11.48 kg (25 lb 4 oz), Jurg Scherrer, Lago Maggiore, Switzerland, June 2016. The British record is 9.667 kg (21 lb 5 oz), from the River Severn at Tewkesbury in 2007.",
  "lifespan": "Up to about 17 years.",
  "diet": "Fish, from an early age: adults hunt shoaling open-water fish, and young zander switch from plankton to fish fry quickly.",
  "spawning": "In pairs, at dawn or at night, mostly in April–May (exceptionally from late February to July). The male clears a shallow nest about 50 cm across in sand or gravel or among exposed plant roots, usually in 1–3 m of murky water, then guards the eggs and fry.",
  "young": "Juveniles are silvery and may show stripes, darkening as they grow. Most zander mature at about 4 years, though anywhere from 3 to 10 depending on growth.",
  "mouth": "Powerful jaws with many sharp teeth and two long canines at the front of each jaw. Unhook with long-nosed pliers, and use a wire trace where pike share the water.",
  "lookalikes": "Perch: deeper body, bold bars, red lower fins and no canines. The Volga pikeperch of the Danube and Volga is smaller, with broader bars and no long canines. North America's walleye is very close — where you are usually decides it.",
  "eating": "Excellent — firm, white, mild fillets with few bones, and among the most prized freshwater fish in central Europe. Check local consumption advice for big fish.",
  "status": "Common; IUCN Least Concern. Non-native across western Europe.",
  "typicalCm": [
   40,
   70
  ],
  "maxCm": 100,
  "faqs": [
   {
    "q": "What is a zander?",
    "a": "A big European member of the perch family (Sander lucioperca) and the walleye's close cousin: slim, glassy-eyed, with long canine teeth. It is native to large, murky rivers and lakes from Germany and southern Scandinavia east to Central Asia, and has been introduced across western Europe and North Africa."
   },
   {
    "q": "Is a zander a cross between a pike and a perch?",
    "a": "No — it is a species in its own right, in the perch family. The name pikeperch comes from its long, pike-like body and teeth on a perch's build, with two dorsal fins, the first one spiny."
   },
   {
    "q": "Is zander the same as walleye?",
    "a": "No, but they are close relatives in the genus Sander, whose European and North American branches split about 20 million years ago. One real difference: a male zander builds a nest and guards the eggs and fry, while walleye scatter their eggs and leave."
   },
   {
    "q": "How big do zander get?",
    "a": "Most are 40–70 cm (16–28 in). The largest reach about a metre and up to 20 kg in the published record. The IGFA world record is 11.48 kg (25 lb 4 oz), from Lago Maggiore in 2016."
   },
   {
    "q": "Is zander good to eat?",
    "a": "Yes — white, firm and mild, with few bones. It is one of the most prized eating fish in central Europe and a restaurant staple from Germany to Hungary."
   }
  ],
  "sources": [
   {
    "label": "FishBase — Sander lucioperca",
    "url": "https://www.fishbase.se/summary/Sander-lucioperca.html"
   },
   {
    "label": "IGFA world records — Zander",
    "url": "https://igfa.org/member-services/world-record/common-name/Zander"
   },
   {
    "label": "British Record (Rod Caught) Fish Committee — coarse fish records, January 2026",
    "url": "https://anglingtrust.net/wp-content/uploads/2026/02/BRFC_COARSE_FISH_LISTINGS_Jan-30-2026.pdf"
   },
   {
    "label": "Wikipedia — Zander",
    "url": "https://en.wikipedia.org/wiki/Zander"
   }
  ]
 },
 "common-carp": {
  "otherNames": "Carp, European carp; wild carp for the slim, fully scaled river form. Mirror carp carry a few big scales, leather carp almost none, and koi are a Japanese ornamental strain. Karpfen in German, carpe in French, karp in Polish.",
  "family": "Cyprinidae, the carp and minnow family.",
  "nativeRange": "Wild carp are native only to rivers draining to the Black, Caspian and Aral seas; the Danube's wild river carp is thought to be the ancestor of Europe's carp. Kept in ponds since Roman times, carp were spread across the rest of Europe long ago.",
  "introduced": "Almost worldwide. In North America it has been recorded in every US state except Alaska (in Florida it is established only in the panhandle) and lives across southern Canada. It is also widespread in Africa — from Morocco and the Nile to Kenya, South Africa and Madagascar — and in Australia and South America, where it is often a pest.",
  "habitat": "Warm, slow or still water with soft bottoms and plenty of weed: lowland rivers, lakes, ponds, reservoirs and canals, and slightly brackish water. Tough and adaptable, it does well in big, turbid rivers and is most active at dawn and dusk.",
  "temp": "Warm water. The FAO gives best growth at 23–30°C (73–86°F), but carp survive cold winters and tolerate a very wide range. European carp begin to spawn at about 17–18°C (63–64°F).",
  "record": "IGFA all-tackle world record: 34.35 kg (75 lb 11 oz), Leo van der Gugten, Lac de St. Cassien, France, 1987.",
  "lifespan": "Long-lived: FishBase gives 38 years as the oldest reported.",
  "diet": "An omnivore that roots in the bottom for insect larvae, worms, snails and small mussels, and eats seeds and plant matter; it also sucks insects off the surface. The rooting muddies the water and tears out water plants.",
  "spawning": "Late spring and early summer, in warm, shallow, weedy margins and flooded meadows, often with a lot of splashing. The sticky eggs cling to plants, and the larvae survive only in very warm, shallow, weedy water.",
  "young": "Fry live among shallow weed. Maturity depends on warmth rather than age: in temperate water it takes several years, and males mature sooner than females.",
  "mouth": "No teeth in the jaws: a rubbery mouth that shoots out into a tube, with two pairs of barbels (the upper pair short), and strong grinding teeth in the throat.",
  "lookalikes": "Crucian carp, Prussian carp and goldfish have no barbels. Grass carp is long and slim with no barbels. Barbel has four barbels but a low body and a short dorsal fin — a carp's dorsal fin is long. In North America, buffaloes and carpsuckers also lack barbels.",
  "eating": "A traditional food fish — carp is the Christmas Eve dish in Poland, Czechia and Slovakia — but bony. Most carp anglers in western Europe release their fish. Check consumption advice for fish from industrial rivers.",
  "status": "IUCN Least Concern as a species, but truly wild river carp are rare and declining, harmed by river engineering and by breeding with escaped farm and ornamental stock.",
  "typicalCm": [
   35,
   80
  ],
  "maxCm": 129,
  "faqs": [
   {
    "q": "Are carp native to Europe?",
    "a": "Only in the southeast. Wild carp are native to rivers draining to the Black, Caspian and Aral seas, the Danube among them. The Romans kept carp in ponds, monasteries farmed them through the Middle Ages, and people carried them across the rest of Europe — and later the world."
   },
   {
    "q": "What is the difference between a common carp and a mirror carp?",
    "a": "They are the same species. A common carp is fully scaled; a mirror carp is a farm-bred form with a few large, shiny, irregular scales; a leather carp has almost none. Koi are an ornamental strain bred in Japan."
   },
   {
    "q": "How big do carp get?",
    "a": "Most are 35–80 cm (14–31 in). The largest measured about 1.3 m. The IGFA world record is 34.35 kg (75 lb 11 oz), from Lac de St. Cassien in southern France in 1987."
   },
   {
    "q": "Are carp invasive in North America?",
    "a": "Yes. Common carp were brought over in the 1800s and are now recorded in every US state except Alaska and across southern Canada. Their rooting muddies the water and rips out the water plants that ducks and native fish depend on."
   },
   {
    "q": "Do carp have teeth?",
    "a": "Not in the mouth. A carp has toothless, rubbery lips and grinds its food with flat teeth in the throat, called pharyngeal teeth."
   }
  ],
  "sources": [
   {
    "label": "FishBase — Cyprinus carpio",
    "url": "https://www.fishbase.se/summary/Cyprinus-carpio.html"
   },
   {
    "label": "FAO Cultured Aquatic Species — Common carp",
    "url": "https://www.fao.org/fi/static-media/FI/CDrom/aquaculture/I1129m/file/en/en_commoncarp.htm"
   },
   {
    "label": "USGS Nonindigenous Aquatic Species — Common Carp",
    "url": "https://nas.er.usgs.gov/queries/FactSheet.aspx?speciesID=4"
   },
   {
    "label": "IGFA world records — Carp, common",
    "url": "https://igfa.org/member-services/world-record/common-name/Carp,%20common"
   }
  ]
 },
 "tench": {
  "otherNames": "Doctor fish, from an old belief that its slime healed other fish. The golden tench is an ornamental pond strain. Tanche in French, Schleie in German, tenca in Spanish and Italian.",
  "family": "Tincidae — long placed in the carp family, but recent genetic studies give it a family of its own.",
  "nativeRange": "Most of Europe and western Asia, east to the Yenisei. Naturally absent from Ireland, Scandinavia north of about 61°N, the eastern Adriatic basin, and western and southern Greece.",
  "introduced": "Ireland, North America, Chile, Australia, South Africa, Zimbabwe and Morocco. In Quebec it was brought illegally to a fish farm in 1986 and escaped through the Richelieu River into the St. Lawrence; it is now dense in the Richelieu, Lake Champlain and Lac Saint-Pierre, and has been seen as far as the Bay of Quinte on Lake Ontario. It is also established in British Columbia's Columbia and Okanagan systems and in parts of the western United States.",
  "habitat": "Still or slow, warm water with mud or clay bottoms and lots of weed: lakes, ponds, gravel pits, canals and backwaters. It survives low oxygen better than almost any other fish — even where carp cannot — and often spends the winter half-buried in the mud.",
  "temp": "Warm water; FishBase gives about 4–24°C (39–75°F). It spawns in early summer, once the shallows reach around 19–20°C (66–68°F).",
  "record": "IGFA all-tackle world record: 4.64 kg (10 lb 3 oz), Dan Dellerfjord, Ljungbyån, Sweden, 1985. The British record is heavier: 6.899 kg (15 lb 3 oz), from a private fishery at Staines, Surrey, in 2001.",
  "lifespan": "Long-lived for its size: tench up to 18 years old have been aged in a Norwegian lake.",
  "diet": "Bottom food, mostly taken at night: midge larvae, snails, pea mussels and other small animals, plus detritus and plant matter. Big adults often live mainly on molluscs.",
  "spawning": "In summer, among dense weed in shallow still water. Each female lays batch after batch of small, sticky green eggs on the plants, every couple of weeks for about two months — up to 300,000 eggs in a season. The larvae hang on the plants until their yolk is used up.",
  "young": "Fry stay hidden in thick weed and can grow fast. Males mature at 2–3 years and females at 3–7. A male has much larger, spoon-shaped pelvic fins that reach past the vent — the easy way to sex an adult tench.",
  "mouth": "A small, fleshy mouth with one tiny barbel at each corner, and no teeth in the jaws.",
  "lookalikes": "Carp has a long dorsal fin and big scales. Crucian carp is deep, bronze and has no barbels. Nothing else in fresh water combines olive-green colour, thick slime, tiny scales and small red eyes.",
  "eating": "Edible, and once valued — it can be cooked like carp — but rarely eaten today; anglers almost always return tench.",
  "status": "IUCN Least Concern; it has declined locally where rivers were engineered and backwaters lost.",
  "typicalCm": [
   20,
   45
  ],
  "maxCm": 70,
  "faqs": [
   {
    "q": "Why is the tench called the doctor fish?",
    "a": "Because of an old belief that sick fish healed by rubbing against its thick slime. There is nothing in it, but the name stuck — and the tench really is unusually slimy, with tiny scales sunk in a thick skin."
   },
   {
    "q": "Are there tench in Canada?",
    "a": "Yes, in Quebec and British Columbia. In Quebec they escaped from an illegal fish farm into the Richelieu River after 1986 and now live at high density in the Richelieu, Lake Champlain and Lac Saint-Pierre; they have been seen in Lake Ontario's Bay of Quinte. They are invasive: Ontario prohibits possessing or moving them, and sightings should be reported."
   },
   {
    "q": "How do you catch tench?",
    "a": "Fish the bottom close to weed at dawn in early summer, with sweetcorn, maggots, worms or small pellets on a float or a small feeder. Patches of tiny bubbles rising near the lilies often mark feeding tench."
   },
   {
    "q": "How big do tench get?",
    "a": "Most are 20–45 cm (8–18 in) and under 2 kg. The IGFA world record is 4.64 kg (10 lb 3 oz), from Sweden in 1985; Britain's record is 6.899 kg (15 lb 3 oz), from Surrey in 2001."
   }
  ],
  "sources": [
   {
    "label": "FishBase — Tinca tinca",
    "url": "https://www.fishbase.se/summary/Tinca-tinca.html"
   },
   {
    "label": "USGS Nonindigenous Aquatic Species — Tench",
    "url": "https://nas.er.usgs.gov/queries/FactSheet.aspx?speciesID=652"
   },
   {
    "label": "Invasive Species Centre — Tench",
    "url": "https://www.invasivespeciescentre.ca/tench/"
   },
   {
    "label": "British Record (Rod Caught) Fish Committee — coarse fish records, January 2026",
    "url": "https://anglingtrust.net/wp-content/uploads/2026/02/BRFC_COARSE_FISH_LISTINGS_Jan-30-2026.pdf"
   }
  ]
 },
 "roach": {
  "otherNames": "Common roach; gardon in French, Rotauge or Plötze in German, blankvoorn in Dutch, mört in Swedish, särki in Finnish.",
  "family": "Leuciscidae, the Eurasian minnows (formerly included in the carp family, Cyprinidae).",
  "nativeRange": "Europe north of the Pyrenees and Alps, east to the Urals and on across Siberia, north to about 69°N in Scandinavia. Naturally absent from Iberia, Italy, the Adriatic basin and Britain north of about 56°N.",
  "introduced": "Ireland, Spain, northeastern Italy (where it is invasive) and Morocco.",
  "habitat": "Almost everywhere in the lowlands: nutrient-rich lakes, ponds, canals, slow rivers and backwaters, and brackish lagoons and Baltic coasts. In fast rivers it needs slack backwaters to see out the winter.",
  "temp": "Very tolerant — roach survive from near freezing to around 31°C, and FishBase gives about 10–20°C (50–68°F) as their range. Spawning runs from about March to June as the water warms.",
  "record": "IGFA all-tackle world record: 1.84 kg (4 lb 1 oz), R. Jones, Colwick, Nottingham, England, 1975. The British record is slightly heavier at 1.9 kg (4 lb 3 oz), shared by fish from Northern Ireland (2006) and Oxfordshire (2024).",
  "lifespan": "Up to about 14 years.",
  "diet": "Bottom invertebrates, zooplankton, plant material and detritus, switching between them as food and danger allow.",
  "spawning": "From March to June, in shoals, among dense weed in backwaters, lakes and flooded meadows, or over plants and gravel in shallow current. The pale yellow eggs stick to plants and roots, and roach tend to spawn in the same place every year.",
  "young": "Fry live in weedy margins. In spring the males grow rough white spawning tubercles on the head and body.",
  "mouth": "A small, toothless mouth set level at the front of the head.",
  "lookalikes": "Rudd: upturned mouth, golden flanks, brighter red fins, and a dorsal fin set well behind the pelvic fins (on a roach it sits directly above them). Dace: slimmer, with a yellowish eye. Roach × bream hybrids are common — deeper than a roach, with a longer anal fin.",
  "eating": "Edible but bony; there is little commercial fishing for it, and in western Europe anglers almost always return it.",
  "status": "IUCN Least Concern; abundant.",
  "typicalCm": [
   15,
   30
  ],
  "maxCm": 50,
  "faqs": [
   {
    "q": "How do you tell a roach from a rudd?",
    "a": "Look at the mouth and the dorsal fin. A rudd's mouth points upward and its dorsal fin starts well behind the pelvic fins; a roach's mouth is level and its dorsal fin sits directly above them. Rudd are also more golden, with redder fins."
   },
   {
    "q": "How big do roach get?",
    "a": "Most are 15–30 cm (6–12 in) and a few hundred grams; a roach of 1 kg (2 lb) is a fish of a lifetime. The IGFA world record is 1.84 kg (4 lb 1 oz), from England in 1975."
   },
   {
    "q": "What do roach eat?",
    "a": "A bit of everything: insect larvae, small snails, zooplankton, algae and plant matter. That is why maggots, casters, bread and hemp all catch them."
   },
   {
    "q": "Are roach invasive?",
    "a": "Outside their native range they can be. Roach have been introduced to Ireland, Spain and northeastern Italy — where they are counted invasive — and to Morocco, and they compete with native fish for food."
   }
  ],
  "sources": [
   {
    "label": "FishBase — Rutilus rutilus",
    "url": "https://www.fishbase.se/summary/Rutilus-rutilus.html"
   },
   {
    "label": "IGFA world records — Roach",
    "url": "https://igfa.org/member-services/world-record/common-name/Roach"
   },
   {
    "label": "British Record (Rod Caught) Fish Committee — coarse fish records, January 2026",
    "url": "https://anglingtrust.net/wp-content/uploads/2026/02/BRFC_COARSE_FISH_LISTINGS_Jan-30-2026.pdf"
   },
   {
    "label": "Wikipedia — Common roach",
    "url": "https://en.wikipedia.org/wiki/Common_roach"
   }
  ]
 },
 "common-bream": {
  "otherNames": "Bream, bronze bream; big ones are 'slabs' and small silvery ones 'skimmers' to British anglers. Brème in French, Brachse or Blei in German, brasem in Dutch, braxen in Swedish, lahna in Finnish.",
  "family": "Leuciscidae, the Eurasian minnows (formerly included in the carp family, Cyprinidae).",
  "nativeRange": "Most of Europe, from the Adour in southwest France east to the Pechora and on to the Aral basin. Naturally absent from Iberia, Italy, the Adriatic basin, Scotland, and Scandinavia north of Bergen and about 67°N in Finland.",
  "introduced": "Ireland, Spain and northeastern Italy; also Lake Baikal and parts of Siberia.",
  "habitat": "Big, warm, nutrient-rich lowland lakes, reservoirs and canals, the lower reaches of slow rivers, backwaters and brackish estuaries. It travels in big shoals over soft bottoms.",
  "temp": "Temperate; FishBase gives about 10–24°C (50–75°F). It spawns from April to June when the water is around 12–20°C (54–68°F).",
  "record": "IGFA all-tackle world record: 6.01 kg (13 lb 3 oz), Luis Kilian Rasmussen, Hagbyån, Sweden, 1984. The British record is far heavier: 10.291 kg (22 lb 11 oz), Scot Crook, Ferry Lagoon, Cambridgeshire, 2012.",
  "lifespan": "Up to about 23 years.",
  "diet": "A bottom feeder: midge larvae and other insect larvae, small crustaceans, snails and small mussels, and plants; big bream may take small fish. When zooplankton is thick it can switch to filter-feeding. Young bream eat zooplankton.",
  "spawning": "April to June, in shallow, densely vegetated backwaters, floodplains and lake margins. Males grow white spawning tubercles on the head.",
  "young": "Young bream are silvery and flat, turning bronze as they grow. They spend their first year or two in backwaters, then move out to the main river to feed.",
  "mouth": "A toothless mouth that shoots forward into a tube to suck food out of the mud.",
  "lookalikes": "Silver bream: smaller and silvery, with a bigger eye and reddish bases to the paired fins. Roach × bream hybrids: in between, with a shorter anal fin than a bream. Roach and ide are much less deep-bodied.",
  "eating": "Soft, bony and mild; eaten fresh, smoked or dried in eastern Europe, but almost always returned in the west.",
  "status": "IUCN Least Concern.",
  "typicalCm": [
   30,
   55
  ],
  "maxCm": 82,
  "faqs": [
   {
    "q": "How big do bream get?",
    "a": "Most adults are 30–55 cm (12–22 in) and 1–4 kg. The IGFA world record is 6.01 kg (13 lb 3 oz), from Sweden in 1984, but Britain's record is much bigger: 10.291 kg (22 lb 11 oz), from a Cambridgeshire lake in 2012."
   },
   {
    "q": "What is the difference between a common bream and a silver bream?",
    "a": "Common bream grow far bigger and turn bronze with age. Silver bream stay small and silvery, with a larger eye and reddish bases to the pectoral and pelvic fins. Small common bream are silvery too, so check the eye and fins."
   },
   {
    "q": "What is a skimmer bream?",
    "a": "A young common bream — flat, silvery and about plate-sized. Anglers call them skimmers; they turn bronze as they grow into 'slabs'."
   },
   {
    "q": "Is bream good to eat?",
    "a": "It is edible but soft and bony, with a mild taste. Bream is eaten fresh, smoked or dried in eastern Europe; in western Europe anglers almost always return it."
   }
  ],
  "sources": [
   {
    "label": "FishBase — Abramis brama",
    "url": "https://www.fishbase.se/summary/Abramis-brama.html"
   },
   {
    "label": "IGFA world records — Bream",
    "url": "https://igfa.org/member-services/world-record/common-name/Bream"
   },
   {
    "label": "British Record (Rod Caught) Fish Committee — coarse fish records, January 2026",
    "url": "https://anglingtrust.net/wp-content/uploads/2026/02/BRFC_COARSE_FISH_LISTINGS_Jan-30-2026.pdf"
   },
   {
    "label": "Wikipedia — Common bream",
    "url": "https://en.wikipedia.org/wiki/Common_bream"
   }
  ]
 },
 "barbel": {
  "otherNames": "Common barbel; barbeau in French, Barbe in German, barbeel in Dutch, brzana in Polish.",
  "family": "Cyprinidae, the carp family.",
  "nativeRange": "Europe north of the Pyrenees and Alps, from the Adour in France east to the Neman in Lithuania, and from the Danube to the Dnieper in the Black Sea basin; in England, the southeast north to Yorkshire. It is also found in almost all of France's Mediterranean rivers.",
  "introduced": "Elsewhere in England, including the Wear, Tees and Medway and most western rivers, and northern and central Italy. Spain, Portugal and much of Italy have native barbels of other species.",
  "habitat": "Clear, medium to large rivers with fast current over gravel — the 'barbel zone' — occasionally lakes. By day barbel shoal under overhanging trees and bridges; they are most active at dawn and dusk, and often winter in big groups in slower water.",
  "temp": "Temperate; FishBase gives about 10–24°C (50–75°F). It spawns from May to July, after migrating upstream.",
  "record": "IGFA all-tackle world record: 7.80 kg (17 lb 3 oz), Luca Ronchi, Italy, 2023. The British record is heavier: 10.014 kg (22 lb 1 oz), Simon Baker, King's Weir on the River Lea, 2025.",
  "lifespan": "FishBase gives 15 years as the oldest reported.",
  "diet": "Bottom invertebrates — insect larvae, small crustaceans, snails and mussels — rooted from the gravel with its barbels, plus small fish and sometimes algae.",
  "spawning": "May to July, on clean gravel in very shallow, fast riffles, after a run upstream. The eggs are poisonous.",
  "young": "Larvae and juveniles keep to the bottom in very shallow water along the bank, moving out into faster water as they grow.",
  "mouth": "Underslung, with thick, fleshy lips and four barbels — two at the front of the upper lip and two at the corners of the mouth.",
  "lookalikes": "Gudgeon is tiny and has just two barbels. Carp is deep-bodied with a long dorsal fin. In Spain, Portugal and Italy the barbels are different native species, such as the Iberian and Italian barbels.",
  "eating": "Edible but bony, and the roe is poisonous; in Britain barbel are returned as a matter of course.",
  "status": "IUCN Least Concern. It declined badly with pollution, dams and river engineering in central Europe and is recovering in cleaned-up rivers.",
  "typicalCm": [
   30,
   70
  ],
  "maxCm": 120,
  "faqs": [
   {
    "q": "Are barbel eggs poisonous?",
    "a": "Yes. Barbel roe is poisonous and can cause a nasty stomach upset, so never eat it. The flesh is edible but bony, and most anglers release barbel anyway."
   },
   {
    "q": "When can you fish for barbel in England?",
    "a": "From 16 June to 14 March on rivers. The coarse fish close season shuts rivers, streams and drains in England from 15 March to 15 June, which covers the barbel's spawning time. Most enclosed stillwaters and canals stay open all year."
   },
   {
    "q": "How big do barbel get?",
    "a": "Most are 30–70 cm (12–28 in) and 1–5 kg. Britain's record is 10.014 kg (22 lb 1 oz), from the River Lea in 2025; the IGFA all-tackle record is 7.80 kg (17 lb 3 oz), from Italy in 2023."
   },
   {
    "q": "Where do barbel live?",
    "a": "In fast, clean, gravelly rivers across Europe north of the Pyrenees and Alps — from France and England east to Lithuania and the Danube and Dnieper. In England they are native to the southeast and were stocked into the Severn and many other western rivers."
   }
  ],
  "sources": [
   {
    "label": "FishBase — Barbus barbus",
    "url": "https://www.fishbase.se/summary/Barbus-barbus.html"
   },
   {
    "label": "IGFA world records — Barbel",
    "url": "https://igfa.org/member-services/world-record/common-name/Barbel"
   },
   {
    "label": "British Record (Rod Caught) Fish Committee — coarse fish records, January 2026",
    "url": "https://anglingtrust.net/wp-content/uploads/2026/02/BRFC_COARSE_FISH_LISTINGS_Jan-30-2026.pdf"
   },
   {
    "label": "GOV.UK — Freshwater rod fishing rules: when and where you can fish",
    "url": "https://www.gov.uk/freshwater-rod-fishing-rules/when-and-where-you-can-fish"
   }
  ]
 },
 "chub": {
  "otherNames": "European chub; formerly Leuciscus cephalus. Chevesne in French, Döbel or Aitel in German, färna in Swedish, turpa in Finnish. Italy's cavedano is a separate, native species.",
  "family": "Leuciscidae, the Eurasian minnows (formerly included in the carp family, Cyprinidae).",
  "nativeRange": "From the Atlantic rivers of France (south to the Adour) east to the Caspian, White and Barents Sea basins; Britain north to about 56°N; southern Finland and Sweden north to about Stockholm; and France's Mediterranean rivers from the Var to the Hérault. Naturally absent from Italy and the Adriatic basin.",
  "habitat": "Rivers of every size, from small streams to big lowland rivers, most common in runs of riffles and pools; also large lakes, from which it runs up inflowing streams to spawn. Adults are often solitary; young fish shoal.",
  "temp": "Wide-tolerant; FishBase gives about 4–20°C (39–68°F). It spawns from about May into summer, once the water reaches about 14°C (57°F).",
  "record": "IGFA all-tackle world record: 3.45 kg (7 lb 10 oz), Joachim Ochmann, River Main, Germany, 2017. The British record is 4.224 kg (9 lb 5 oz), Andy Maker, from a southern stillwater in 2007.",
  "lifespan": "Up to about 22 years.",
  "diet": "Almost anything: insects, worms, crustaceans and plant material, and — in big chub — mainly fish. One of the least fussy feeders in fresh water.",
  "spawning": "In fast water over gravel. Males gather on the shallows and follow ripe females with much splashing; each female spawns more than once, with several males, and the sticky eggs lodge among the stones.",
  "young": "Larvae and fry live in very shallow water along the bank. Chub often hybridise with bleak.",
  "mouth": "A big, wide mouth with thick white lips, able to take crayfish and small fish whole. No teeth in the jaws.",
  "lookalikes": "Dace: slimmer and smaller, with concave edges to the dorsal and anal fins (a chub's anal fin is convex and reddish). Ide: smaller scales and a deeper body. Roach: red eye and a much smaller mouth.",
  "eating": "Poor — soft, bony and bland; chub are almost always returned.",
  "status": "IUCN Least Concern.",
  "typicalCm": [
   25,
   50
  ],
  "maxCm": 60,
  "faqs": [
   {
    "q": "How do you tell a chub from a dace?",
    "a": "Look at the anal fin: a chub's has a rounded, convex edge and is usually reddish; a dace's is concave and pale. Chub are also much thicker-set, with a bigger head and mouth."
   },
   {
    "q": "How big do chub get?",
    "a": "Most are 25–50 cm (10–20 in) and up to about 2 kg. The IGFA world record is 3.45 kg (7 lb 10 oz), from Germany's River Main in 2017; Britain's record is 4.224 kg (9 lb 5 oz), from 2007."
   },
   {
    "q": "What do chub eat?",
    "a": "Nearly anything they can fit in their wide mouths: insects, worms, crayfish, plant matter and, when they are big, other fish. Anglers catch them on bread, cheese paste, slugs, worms and small lures."
   },
   {
    "q": "Can you catch chub in winter?",
    "a": "Yes — chub keep feeding in cold water when most river fish go quiet, which makes them a favourite winter target. Fish slow, deep glides near cover with bread, cheese paste or worms."
   }
  ],
  "sources": [
   {
    "label": "FishBase — Squalius cephalus",
    "url": "https://www.fishbase.se/summary/Squalius-cephalus.html"
   },
   {
    "label": "IGFA world records — Chub",
    "url": "https://igfa.org/member-services/world-record/common-name/Chub"
   },
   {
    "label": "British Record (Rod Caught) Fish Committee — coarse fish records, January 2026",
    "url": "https://anglingtrust.net/wp-content/uploads/2026/02/BRFC_COARSE_FISH_LISTINGS_Jan-30-2026.pdf"
   },
   {
    "label": "Wikipedia — Squalius cephalus",
    "url": "https://en.wikipedia.org/wiki/Squalius_cephalus"
   }
  ]
 },
 "european-grayling": {
  "otherNames": "Grayling, common grayling, 'the lady of the stream'; ombre in French, Äsche in German, temolo in Italian, harr in Swedish, harjus in Finnish. The genus name Thymallus refers to a faint smell of thyme said to hang on a fresh fish.",
  "family": "Salmonidae — a member of the salmon and trout family, with the small adipose fin to show it.",
  "nativeRange": "Europe from England, Wales and France (west to the Loire, and the Rhône) east to the Urals: the North Sea, Baltic, White Sea, Black Sea and Caspian basins, and the northern Adriatic basin east to the Soča. Absent from Ireland and the south of Europe.",
  "introduced": "Scotland and much of southern and central Finland. It was put into Morocco in 1948 but seems not to have become established.",
  "habitat": "Cold, clean, well-oxygenated, fast rivers with gravel or stone bottoms, holding in hollows behind boulders and shaded water. In Scandinavia it also lives in clear lakes and the low-salt northern Baltic.",
  "temp": "Cold water; FishBase gives about 6–18°C (43–64°F). It spawns in spring on shallow gravel.",
  "record": "IGFA all-tackle world record: 2.18 kg (4 lb 12 oz), Adriano Gargantini, the Drava at Steinfeld, Austria, 2009.",
  "lifespan": "Up to about 14 years.",
  "diet": "Mostly insects and their nymphs and larvae, plus small worms, crustaceans, snails and zooplankton, some plant matter, and occasionally small fish such as minnows.",
  "spawning": "In spring, on clean gravel in shallow runs about 20–40 cm deep with a moderate current.",
  "young": "Fry keep to shallow, slack water at the edges before moving out into the current.",
  "mouth": "Small and set low on the head, with tiny teeth — built for picking nymphs off the bottom.",
  "lookalikes": "Arctic grayling, of northern Canada, Alaska and Siberia, is very similar; the European grayling has 5–8 spines at the front of the dorsal fin and 3–4 in the anal fin, which the Arctic grayling lacks. Whitefish have a small dorsal fin; trout have a bigger mouth and spots.",
  "eating": "Good when fresh, but grayling stocks are fragile in many rivers and most anglers release them.",
  "status": "IUCN Least Concern overall, but listed on Appendix III of the Bern Convention, declining in many rivers, and critically endangered in the Baltic Sea.",
  "typicalCm": [
   25,
   40
  ],
  "maxCm": 60,
  "faqs": [
   {
    "q": "What is a grayling?",
    "a": "A member of the salmon and trout family with a tall, sail-like dorsal fin, silver-grey flanks and a small mouth. It lives in cold, clean, fast rivers from England and France to the Urals, and in clear Scandinavian lakes, and it feeds mostly on insects — which makes it a favourite fly-fishing fish."
   },
   {
    "q": "When is the grayling season in England?",
    "a": "On rivers in England and Wales, grayling follow the coarse season: 16 June to 14 March. That makes them the fly angler's winter fish, open long after the trout season closes. In Scotland, where they were introduced, there is no closed season for grayling."
   },
   {
    "q": "Are there grayling in Ireland?",
    "a": "No. Grayling are native to England and Wales and were introduced to Scotland, but Ireland has none."
   },
   {
    "q": "How big do grayling get?",
    "a": "Most are 25–40 cm (10–16 in) and under 1 kg; a 1.5 kg (3 lb) grayling is a fish of a lifetime. The IGFA world record is 2.18 kg (4 lb 12 oz), from the Drava in Austria in 2009."
   }
  ],
  "sources": [
   {
    "label": "FishBase — Thymallus thymallus",
    "url": "https://www.fishbase.se/summary/Thymallus-thymallus.html"
   },
   {
    "label": "IGFA world records — Grayling",
    "url": "https://igfa.org/member-services/world-record/common-name/Grayling"
   },
   {
    "label": "Wikipedia — Thymallus thymallus",
    "url": "https://en.wikipedia.org/wiki/Thymallus_thymallus"
   }
  ]
 },
 "arctic-char": {
  "otherNames": "Char or charr; omble chevalier in French, Seesaibling in German, röding in Swedish, røye in Norwegian, bleikja in Icelandic, torgoch ('red belly') in Welsh, and iqaluk in Inuktitut. Some taxonomists split the Alpine char (Salvelinus umbla) and several British and Irish lake chars into species of their own.",
  "family": "Salmonidae — a char, like the brook trout and lake trout.",
  "nativeRange": "Circumpolar: Iceland, Scandinavia, northern Russia and Siberia, the Arctic islands, Alaska, northern Canada and Greenland, with landlocked Ice Age relic populations in cold lakes of the Alps, Britain and Ireland, Quebec, Maine and New Hampshire.",
  "introduced": "Stocked into many Alpine and Pyrenean lakes, where it often breeds, and farmed widely for food.",
  "habitat": "Cold, clear, deep lakes and the deep runs and pools of northern rivers. Sea-run fish feed along Arctic coasts in summer and return to fresh water in autumn; landlocked fish spend their whole lives in lakes, often very deep.",
  "temp": "Very cold water; FishBase gives about 4–16°C (39–61°F). It is extremely sensitive to pollution and to warming.",
  "record": "IGFA all-tackle world record: 14.77 kg (32 lb 9 oz), Jeffery Ward, Tree River, Nunavut (then the Northwest Territories), 1981. A 14.83 kg (32 lb 11 oz) char from the same river was awaiting IGFA approval in 2026.",
  "lifespan": "Up to about 40 years in the cold, slow-growing north.",
  "diet": "In lakes: zooplankton, amphipods, snails, insects and fish. Sea-run char feed hard at sea in summer, eat little in fresh water, and do not feed at all while migrating.",
  "spawning": "In autumn and early winter, usually over pebbles and stones in lakes; males hold territories and pair with females as they become ready. Some Norwegian sea-run stocks spawn in fast riffles. Char can spawn several times in a lifetime.",
  "young": "In many lakes char split into distinct forms that live side by side — Iceland's Thingvallavatn holds four, from small bottom-feeders to big fish-eaters.",
  "mouth": "A large mouth with small teeth; spawning males grow a hooked lower jaw (a kype).",
  "lookalikes": "Brook trout: worm-like markings on the back and dorsal fin. Lake trout: a deeply forked tail and pale spots all over a grey body. Brown trout: dark spots on a lighter body, the reverse of a char's light spots on dark. Dolly Varden, on the Pacific side, is almost identical.",
  "eating": "Superb — pink, delicate and prized. Omble chevalier is a luxury of Alpine lake cooking, and farmed Arctic char is widely sold.",
  "status": "IUCN Least Concern as a species, but many small lake populations in Britain, Ireland and the Alps are isolated and vulnerable.",
  "typicalCm": [
   30,
   60
  ],
  "maxCm": 107,
  "faqs": [
   {
    "q": "Where do Arctic char live?",
    "a": "All around the top of the world: Iceland, Scandinavia, Arctic Russia, Alaska, northern Canada and Greenland. Farther south they survive as landlocked Ice Age relics in deep, cold lakes — in the Alps, Britain and Ireland, Quebec and Maine."
   },
   {
    "q": "What is the most northerly freshwater fish?",
    "a": "The Arctic char. No other freshwater fish lives as far north — it is the only fish in Lake Hazen on Ellesmere Island, Nunavut, near 82°N."
   },
   {
    "q": "Is Arctic char a trout or a salmon?",
    "a": "Neither, exactly: it is a char (genus Salvelinus), in the same family as trout and salmon. Brook trout and lake trout are chars too, despite their names."
   },
   {
    "q": "How big do Arctic char get?",
    "a": "Landlocked char in southern lakes are often only 20–40 cm (8–16 in); sea-run Arctic fish commonly reach 60 cm and several kilograms. The IGFA world record is 14.77 kg (32 lb 9 oz), from Nunavut's Tree River in 1981."
   }
  ],
  "sources": [
   {
    "label": "FishBase — Salvelinus alpinus",
    "url": "https://www.fishbase.se/summary/Salvelinus-alpinus.html"
   },
   {
    "label": "IGFA world records — Char, Arctic",
    "url": "https://igfa.org/member-services/world-record/common-name/Char,%20Arctic"
   },
   {
    "label": "Wikipedia — Arctic char",
    "url": "https://en.wikipedia.org/wiki/Arctic_char"
   }
  ]
 },
 "wels-catfish": {
  "otherNames": "Wels, sheatfish, European catfish; silure glane in French, Wels or Waller in German, siluro in Spanish and Italian, harcsa in Hungarian, sum in Polish and Czech, mal in Swedish.",
  "family": "Siluridae, the sheatfishes — a different family from North America's channel and blue catfish (Ictaluridae).",
  "nativeRange": "Central and eastern Europe and western Asia: the North Sea, Baltic, Black Sea, Caspian and Aral basins, north to southern Sweden, plus several Aegean rivers and Turkey. Absent from the rest of the Mediterranean basin.",
  "introduced": "Widely through western and southern Europe — Spain (into the Ebro in 1974, and now in all of Spain's main rivers), Italy, France (including the Tarn, in 1983) and stocked lakes in Britain — and Tunisia and Kazakhstan. Several countries report harm to native fish.",
  "habitat": "Large and medium lowland rivers, backwaters, deep water below dams, reservoirs and well-vegetated lakes, and sometimes brackish water in the Baltic and Black seas. A nocturnal hunter, near the bottom and in mid-water.",
  "temp": "Temperate; FishBase gives about 4–20°C (39–68°F), but wels grow fastest and spread most in the warm rivers of the south.",
  "record": "IGFA all-tackle world record: 134.97 kg (297 lb 9 oz), Attila Zsedely, River Po, Italy, March 2010. The British record is 68.12 kg (150 lb 3 oz), from Chigborough Fisheries, Essex, in 2024.",
  "lifespan": "Very long-lived: a Swedish study found a wels at least 70 years old, and FishBase cites up to 80.",
  "diet": "Larvae and young eat invertebrates and small fish. Adults eat fish, crayfish, frogs, water birds and small mammals — and in the River Tarn at Albi, France, wels have learned to lunge out onto the bank to catch pigeons.",
  "spawning": "In late spring and summer, in shallow, weedy water. The male defends a small territory, builds a nest of plant material or cleans a patch of roots, and guards the eggs until they hatch in 3–10 days, depending on the temperature.",
  "young": "Larvae and young fish live on the bottom. In warm water wels can mature at 2–3 years.",
  "mouth": "An enormous mouth lined with bands of small, rasp-like teeth, with two long barbels on the upper jaw and four short ones beneath.",
  "lookalikes": "Burbot has one chin barbel and two dorsal fins. North American bullheads and channel catfish have an adipose fin and stout fin spines; the wels has neither — just a tiny dorsal fin and a very long anal fin. Aristotle's catfish, in western Greece, is a much smaller relative.",
  "eating": "Eaten widely in central and eastern Europe — harcsapaprikás is a Hungarian classic — but big, old fish can carry contaminants; check local advice.",
  "status": "IUCN Least Concern. Native but endangered in Sweden, where it survives in a handful of waters and is protected from fishing; invasive in Spain, Italy, France and other places it has been introduced.",
  "typicalCm": [
   80,
   160
  ],
  "maxCm": 273,
  "faqs": [
   {
    "q": "How big do wels catfish get?",
    "a": "Most caught are 0.8–1.6 m (2.5–5 ft) long. The largest with solid evidence measured 2.73 m and weighed 130 kg; old tales of 5 m, 300 kg giants rest on mistakes. The IGFA world record is 134.97 kg (297 lb 9 oz), from Italy's River Po in 2010."
   },
   {
    "q": "Do wels catfish really eat pigeons?",
    "a": "Yes. In the River Tarn at Albi, in southern France, researchers filmed wels lunging out of the water onto gravel banks to grab pigeons, then wriggling back in — a hunting trick the introduced fish seem to have learned there."
   },
   {
    "q": "Are wels catfish invasive?",
    "a": "Where they have been introduced, yes. Wels were put into Spain's Ebro in 1974 and now live in all of Spain's main rivers; they have also spread in Italy and France, eating native fish. In Sweden, by contrast, the native wels is endangered and protected."
   },
   {
    "q": "What should I do if I catch a wels in Sweden?",
    "a": "Release it straight away, handling it carefully. The wels is strongly threatened in Sweden and protected from fishing; it survives only in a few systems, such as the Emån, Lake Båven, Lake Möckeln and the Helge å."
   }
  ],
  "sources": [
   {
    "label": "FishBase — Silurus glanis",
    "url": "https://www.fishbase.se/summary/Silurus-glanis.html"
   },
   {
    "label": "Cucherousset et al. (2012), Freshwater killer whales: beaching behavior of an alien fish to hunt land birds — PLOS ONE",
    "url": "https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0050840"
   },
   {
    "label": "Länsstyrelsen Kalmar län — Mal (wels catfish)",
    "url": "https://www.lansstyrelsen.se/kalmar/djur/hotade-arter/hotade-djur-och-vaxter/mal.html"
   },
   {
    "label": "The Local Spain — How a 200-kilo fish is putting Spain's rivers at risk",
    "url": "https://www.thelocal.es/20230929/how-a-200-kilo-fish-is-putting-spains-rivers-at-risk"
   }
  ]
 },
 "european-whitefish": {
  "otherNames": "Common whitefish; lavaret in French, féra or palée in western Switzerland, Felchen or Renke in southern Germany and Austria, Maräne in northern Germany, sik in Swedish and Norwegian, siika in Finnish; powan, schelly and gwyniad in Scotland, England and Wales.",
  "family": "Salmonidae — the whitefish branch of the salmon family.",
  "nativeRange": "Taken broadly, as most anglers and many biologists do (the 'Coregonus lavaretus complex'), it ranges from Britain and the Alps across northern and central Europe to Siberia, including the Baltic. In the narrow sense, some authorities restrict the name to Lake Bourget and Lac d'Aiguebelette in France (it formerly lived in Lake Geneva too) and treat other populations as separate species.",
  "introduced": "Stocked widely within Europe, and introduced to Iran.",
  "habitat": "Cold, deep, clean lakes, where shoals follow the zooplankton up and down; also brackish Baltic coasts and estuaries, where some forms run up rivers to spawn.",
  "temp": "Cold water; FishBase gives about 4–16°C (39–61°F).",
  "record": "The IGFA lists it as powan: 5.39 kg (11 lb 14 oz), Allan Englund, Skräbeån at Nymölla, Sweden, December 1994.",
  "lifespan": "Varies widely between lakes and forms; no single figure fits the whole complex.",
  "diet": "Mostly zooplankton or bottom invertebrates, and larger crustaceans in brackish water. Bigger fish also take insects from the surface and eat fish fry.",
  "spawning": "In autumn and early winter (September to December, depending on the water), on gravel in shallow water near shore, at night. Different populations in the same lake may spawn at different times, and some run up rivers to spawn.",
  "young": "Within single lakes whitefish split into look-alike forms — plankton-eaters and bottom-feeders, with different numbers of gill rakers — that have evolved again and again since the Ice Age.",
  "mouth": "Small, with a slightly overhanging upper jaw under a short, tapered snout.",
  "lookalikes": "Vendace: smaller, with a jutting lower jaw. Peled (introduced): jaws of equal length. Grayling: a huge dorsal fin. North America's lake whitefish is a separate but very similar species.",
  "eating": "Excellent — mild, white and flaky; smoked whitefish and fried Felchen are staples of the lake country in the Alps and Scandinavia.",
  "status": "In the narrow sense (Lake Bourget and Aiguebelette), IUCN Vulnerable. More broadly, many populations are common and fished, but Britain's powan, schelly and gwyniad are rare relics and legally protected.",
  "typicalCm": [
   25,
   50
  ],
  "maxCm": 73,
  "faqs": [
   {
    "q": "Is European whitefish the same as lake whitefish?",
    "a": "No. Lake whitefish (Coregonus clupeaformis) is the North American species; the European whitefish (Coregonus lavaretus) lives in Europe and Siberia. They look and behave much alike and fill the same place in cold, deep lakes."
   },
   {
    "q": "Can you fish for powan or schelly in Britain?",
    "a": "No. Britain's few whitefish lakes — Loch Lomond and Loch Eck for powan, a handful of Lake District lakes for schelly, and Bala Lake (Llyn Tegid) for gwyniad — hold rare relic populations that are legally protected."
   },
   {
    "q": "How do you catch whitefish?",
    "a": "With tiny nymphs, usually several on one line, jigged slowly at the depth the shoal is feeding on plankton — the classic method on the Alpine lakes. In Scandinavia they are also taken through the ice on small jigs and flies."
   },
   {
    "q": "Why are there so many names for European whitefish?",
    "a": "Because whitefish vary so much from lake to lake that biologists still argue over how many species there are. Many lakes have their own local form and local name — lavaret, féra, Felchen, Renke, sik, powan — and some authorities treat each as a separate species."
   }
  ],
  "sources": [
   {
    "label": "FishBase — Coregonus lavaretus",
    "url": "https://www.fishbase.se/summary/Coregonus-lavaretus.html"
   },
   {
    "label": "IGFA world records — Powan",
    "url": "https://igfa.org/member-services/world-record/common-name/Powan"
   },
   {
    "label": "Wikipedia — Coregonus lavaretus",
    "url": "https://en.wikipedia.org/wiki/Coregonus_lavaretus"
   },
   {
    "label": "JNCC — Habitats Directive Article 17 report (2019): Coregonus lavaretus in Scotland",
    "url": "https://hub.jncc.gov.uk/jncc-assets/Art17/S6353-SC-Habitats-Directive-Art17-2019.pdf"
   }
  ]
 },
 "european-sea-bass": {
  "otherNames": "Bass (in Britain and Ireland), European seabass; loup de mer or bar in French, lubina in Spanish, robalo in Portuguese, branzino or spigola in Italian, lavraki in Greek.",
  "family": "Moronidae, the temperate basses — the same family as North America's striped bass.",
  "nativeRange": "The northeast Atlantic from Morocco to Norway, including Britain and Ireland, the whole Mediterranean, and the southern Black Sea. Strays reach the Baltic and as far south as Senegal, and it has recently spread into the northern Red Sea through the Suez Canal.",
  "habitat": "Inshore: surf beaches, rocky shores, estuaries, lagoons and sometimes the lower reaches of rivers, down to about 100 m. In the north it moves inshore and into estuaries in summer and offshore into deeper water in winter. Young bass school; adults are more solitary.",
  "temp": "Temperate to warm; FishBase gives about 8–24°C (46–75°F).",
  "record": "IGFA all-tackle world record: 10.89 kg (24 lb), Morgan Walsh, off Ireland, 2025. The British shore record is 8.958 kg (19 lb 12 oz), Portsmouth Dockyard, 2012; the boat record is 8.876 kg (19 lb 9 oz), off Reculver, Kent, 1987.",
  "lifespan": "Up to about 30 years; slow-growing in the north.",
  "diet": "Shrimps, crabs, molluscs and fish. Young bass eat mostly invertebrates and take more fish as they grow; big adults are mainly fish-eaters.",
  "spawning": "Once a year, in groups, offshore, in winter or spring depending on the region; the eggs float. In the Mediterranean bass mature at 2–4 years; in the Atlantic later — males at 4–7 and females at 5–8.",
  "young": "Young bass school in estuaries and harbours for their first years. In England and Wales many estuaries are designated bass nursery areas, with restrictions on fishing for bass.",
  "mouth": "A large mouth; sharp spines on the gill cover and a sharp-edged gill cover, plus a spiny first dorsal fin.",
  "lookalikes": "Spotted sea bass, in the south of the range, has black spots on its back and sides. Grey mullet has a tiny mouth and no gill-cover spines. In North America, the striped bass is its close cousin.",
  "eating": "Excellent. Much of the branzino and loup de mer in shops is farmed — it is one of the main farmed fish of the Mediterranean.",
  "status": "IUCN Near Threatened. After the northern stock fell sharply, the EU and UK brought in strict angling and commercial limits from 2015, reviewed every year.",
  "typicalCm": [
   35,
   70
  ],
  "maxCm": 103,
  "faqs": [
   {
    "q": "What are the sea bass rules for anglers?",
    "a": "They change every year. In 2026, in UK waters and the northern EU waters around them (the North Sea, Channel, Irish Sea and Celtic Sea), anglers could only catch and release bass in February and March; for the rest of the year they could keep three a day, each at least 42 cm. In the Bay of Biscay the EU daily limit is two."
   },
   {
    "q": "Is European sea bass the same as striped bass?",
    "a": "No, but they are cousins in the same family, Moronidae. Both are hard-fighting predators of surf, rocks and estuaries, and both follow the bait close inshore."
   },
   {
    "q": "How big do sea bass get?",
    "a": "Most anglers' bass are 35–70 cm (14–28 in); a bass over 4.5 kg (10 lb) is a specimen in Britain. The largest reach about a metre and 12 kg. The IGFA world record is 10.89 kg (24 lb), caught off Ireland in 2025."
   },
   {
    "q": "Why is the minimum size for bass 42 cm?",
    "a": "Because bass grow slowly and mature late in the north — females often at 5–8 years — so a 42 cm limit gives more of them the chance to spawn before they can be kept."
   }
  ],
  "sources": [
   {
    "label": "FishBase — Dicentrarchus labrax",
    "url": "https://www.fishbase.se/summary/Dicentrarchus-labrax.html"
   },
   {
    "label": "IGFA world records — Bass, European",
    "url": "https://igfa.org/member-services/world-record/common-name/Bass,%20European"
   },
   {
    "label": "GOV.UK — Bass fishing guidance 2026",
    "url": "https://www.gov.uk/government/publications/bass-industry-guidance-2026/bass-fishing-guidance-2025"
   },
   {
    "label": "Netherlands Enterprise Agency (RVO) — Seabass rules in EU waters",
    "url": "https://english.rvo.nl/topics/seabass"
   }
  ]
 },
 "gilthead-seabream": {
  "otherNames": "Gilt-head bream, gilthead; dorade royale in French, dorada in Spanish, dourada in Portuguese, orata in Italian, tsipoura in Greek.",
  "family": "Sparidae, the sea breams and porgies.",
  "nativeRange": "The Mediterranean and the eastern Atlantic from Britain and Ireland south to Senegal and the Canary Islands; rare in the Black Sea.",
  "habitat": "Seagrass beds, sandy bottoms and the surf zone, usually shallower than 30 m though adults go down to 150 m. In spring it moves into brackish lagoons and estuaries. Mostly solitary or in small groups.",
  "temp": "Warm water: best growth at about 18–26°C (64–79°F), and very sensitive to cold — the FAO gives 4°C (39°F) as its lower lethal limit.",
  "record": "IGFA all-tackle world record: 7.36 kg (16 lb 3 oz), Jean Serra, an estuary near Brest, France, 2000. The British shore record is 5.499 kg (12 lb 2 oz), Kingsbridge Estuary, Devon, 2017.",
  "lifespan": "Up to about 14 years.",
  "diet": "Mainly shellfish — mussels, oysters and clams — plus crabs and other crustaceans, and some plant matter.",
  "spawning": "From October to December in open water; the eggs float. Gilthead change sex: they mature as males at about 2 years (20–30 cm), and many become females at 2–3 years (33–40 cm).",
  "young": "The larvae drift for roughly six to seven weeks before settling; young fish move into lagoons and estuaries in spring.",
  "mouth": "Strong jaws with four to six pointed, canine-like teeth at the front and rows of blunt, rounded crushing teeth behind — made for cracking mussels.",
  "lookalikes": "Black sea bream is grey with faint lines and no gold bar. Two-banded and sharpsnout seabreams have dark bands across the body. The gold bar between the eyes and the dark spot on the gill cover make a gilthead.",
  "eating": "Excellent, and a Mediterranean favourite grilled whole or baked in salt. Most sold is farmed — it is one of the Mediterranean's main farmed fish.",
  "status": "IUCN Least Concern.",
  "typicalCm": [
   25,
   50
  ],
  "maxCm": 70,
  "faqs": [
   {
    "q": "Why is it called gilthead?",
    "a": "For the gold bar across its forehead between the eyes — the 'gilt head'. The French dorade and Spanish dorada both mean 'golden' too."
   },
   {
    "q": "Do gilthead bream change sex?",
    "a": "Yes. Gilthead are protandrous: every fish starts life as a male, maturing at about two years, and many become females at two to three. In farmed fish, the presence of older females can hold younger ones back from changing."
   },
   {
    "q": "Are there gilthead bream in the UK?",
    "a": "Yes, in small numbers, mostly in the estuaries of Devon and Cornwall, and in Ireland. Britain's shore record of 5.499 kg (12 lb 2 oz) came from the Kingsbridge Estuary in 2017. Its heartland is the Mediterranean and the Atlantic coasts of Iberia and France."
   },
   {
    "q": "What do gilthead bream eat?",
    "a": "Mostly shellfish — mussels, oysters, clams — and crabs, crushed with rows of strong, rounded back teeth. That is why crab, mussel and prawn are the baits to use."
   }
  ],
  "sources": [
   {
    "label": "FishBase — Sparus aurata",
    "url": "https://www.fishbase.se/summary/Sparus-aurata.html"
   },
   {
    "label": "FAO Cultured Aquatic Species — Gilthead seabream",
    "url": "https://www.fao.org/fishery/docs/CDrom/aquaculture/I1129m/file/en/en_giltheadseabr.htm"
   },
   {
    "label": "IGFA world records — Seabream, gilthead",
    "url": "https://igfa.org/member-services/world-record/common-name/Seabream,%20gilthead"
   },
   {
    "label": "British Record (Rod Caught) Fish Committee — sea fish records, June 2026",
    "url": "https://anglingtrust.net/wp-content/uploads/2026/06/BRFC_SEA_FISH_LISTINGS_June-2026.pdf"
   }
  ]
 },
 "atlantic-mackerel": {
  "otherNames": "Mackerel, common mackerel; maquereau in French, caballa in Spanish, sgombro in Italian, makrell in Norwegian, makrill in Swedish.",
  "family": "Scombridae, the mackerels and tunas.",
  "nativeRange": "Both sides of the North Atlantic — from Labrador to the US mid-Atlantic coast in the west, and from Iceland and Norway south to North Africa in the east — and the Mediterranean.",
  "habitat": "Open water over the continental shelf, in huge schools near the surface in summer and deeper offshore in winter. It comes inshore in spring as the sea warms.",
  "temp": "Cool water; mackerel move inshore in spring when the sea reaches about 11–14°C (52–57°F).",
  "record": "IGFA all-tackle world record: 1.6 kg (3 lb 8 oz), Lorenzo Roca, L'Ampolla, Spain, 2015. The British boat record is heavier: 2.79 kg (6 lb 2 oz), off Penberth Cove, Cornwall, 1984.",
  "lifespan": "Up to about 17 years.",
  "diet": "Zooplankton and small fish, hunted mostly by day.",
  "spawning": "In batches through spring and summer, in open water; the eggs and larvae drift in the plankton. After spawning, adults feed hard in small, fast-moving shoals.",
  "young": "Larvae grow quickly in the plankton, and young mackerel school close inshore by late summer.",
  "mouth": "A pointed head and a wide mouth with small teeth.",
  "lookalikes": "Atlantic chub mackerel has a swim bladder, a bigger eye, and spots or wavy lines on its lower sides; the Atlantic mackerel has a plain silver belly and no swim bladder. Horse mackerel (scad) has a row of bony plates along its side.",
  "eating": "Superb fresh, grilled or smoked — oily and rich — but it spoils fast, so ice it at once.",
  "status": "IUCN Least Concern as a species, but both Atlantic stocks are in trouble. ICES advised a cut of about 70% in the northeast Atlantic catch for 2026, with the stock below its safe biological limit; in Canada the stock has been in the critical zone since 2011 and the commercial fishery remains closed.",
  "typicalCm": [
   25,
   40
  ],
  "maxCm": 60,
  "shape": "torpedo",
  "faqs": [
   {
    "q": "Is it OK to catch mackerel?",
    "a": "Yes, in moderation. Take only what you will eat, and follow local limits: in Canada, recreational anglers may keep 20 mackerel a day, fishing one line with up to three hooks. The northeast Atlantic stock is low too, so put the rest back."
   },
   {
    "q": "Do mackerel have a swim bladder?",
    "a": "No — the Atlantic mackerel has no swim bladder, which is one way to tell it from its close relative, the Atlantic chub mackerel, which does."
   },
   {
    "q": "How big do mackerel get?",
    "a": "Most are 25–40 cm (10–16 in) and under 1 kg. The largest reach about 60 cm and 3.4 kg. The IGFA world record is 1.6 kg (3 lb 8 oz), from Spain in 2015; Britain's boat record, from Cornwall in 1984, is 2.79 kg (6 lb 2 oz)."
   },
   {
    "q": "When are the mackerel in?",
    "a": "In northern Europe and Atlantic Canada, mackerel come inshore in late spring and summer — June to September are the peak months — then move offshore and deeper for the winter."
   }
  ],
  "sources": [
   {
    "label": "FishBase — Scomber scombrus",
    "url": "https://www.fishbase.se/summary/Scomber-scombrus.html"
   },
   {
    "label": "Fisheries and Oceans Canada — Atlantic mackerel, NAFO subareas 3 and 4 (2025–2026)",
    "url": "https://www.dfo-mpo.gc.ca/fisheries-peches/decisions/fm-2025-gp/atl-16-eng.html"
   },
   {
    "label": "Marine and Freshwater Research Institute (Iceland) — ICES advice on mackerel for 2026",
    "url": "https://www.hafogvatn.is/static/extras/images/mackerel_2025_advice_en.html"
   },
   {
    "label": "British Record (Rod Caught) Fish Committee — sea fish records, June 2026",
    "url": "https://anglingtrust.net/wp-content/uploads/2026/06/BRFC_SEA_FISH_LISTINGS_June-2026.pdf"
   }
  ]
 },
 "pollack": {
  "otherNames": "European pollock (in American English), lythe in Scotland, callig on the Isle of Man; lieu jaune in French, abadejo in Spanish, lyr in Norwegian. Not to be confused with North America's 'pollock', usually the saithe.",
  "family": "Gadidae, the cod family.",
  "nativeRange": "The northeast Atlantic from Iceland, the Faroes and Norway south through the North Sea, Britain and Ireland to the Bay of Biscay and the Atlantic coast of Iberia, with a few records from the southern Baltic.",
  "habitat": "Rocky coasts, kelp forests, reefs and wrecks, from the shallows down to about 200 m. Young pollack spend two or three years close inshore among rocks, kelp, sandy shores and estuaries; bigger fish move offshore to rocky ground and wrecks at 40–100 m.",
  "temp": "Cool temperate water. In a growth study, juvenile pollack grew best at about 12–15°C (54–59°F).",
  "record": "IGFA all-tackle world record: 12.41 kg (27 lb 6 oz), Robert Milkins, Salcombe, Devon, 1986. The British boat record is heavier: 13.267 kg (29 lb 4 oz), off Dungeness, Kent, 1987; the shore record is 8.277 kg (18 lb 4 oz), Abbotsbury, Dorset, 1986.",
  "lifespan": "Fast-growing and fairly short-lived: up to about 15 years.",
  "diet": "Mostly fish, especially shoaling baitfish such as sandeels, plus crustaceans and squid. Young pollack eat small crustaceans and fish fry.",
  "spawning": "Offshore, in late winter and spring; the spawning grounds are poorly known, and some Norwegian fjord populations seem to spawn locally. Dense shoals gather on the spawning grounds.",
  "young": "Juveniles live near the coast for two or three years, sometimes schooling with young saithe; some defend small feeding territories and grunt at rivals.",
  "mouth": "A large mouth with a strongly jutting lower jaw, and no chin barbel.",
  "lookalikes": "Saithe (coalfish — called pollock in North America): a straight, pale lateral line, greenish-black back and a less jutting jaw. Cod: a chin barbel and a pale lateral line. Pouting: deep, coppery and barred, with a chin barbel.",
  "eating": "Good but drier than cod, with a fine flavour; best very fresh.",
  "status": "IUCN Least Concern globally, but Celtic Seas pollack are at low levels. Ireland brought in a three-fish daily bag limit on 1 June 2026, and the UK agreed a three-fish limit too.",
  "typicalCm": [
   40,
   80
  ],
  "maxCm": 130,
  "faqs": [
   {
    "q": "What is the difference between pollack and pollock?",
    "a": "In Europe, pollack is Pollachius pollachius, the bronze-green fish of rocks and wrecks. In North America, 'pollock' usually means its cousin the saithe or coalfish (Pollachius virens). A pollack's lateral line curves up over the pectoral fin; a saithe's runs straight."
   },
   {
    "q": "Is there a bag limit for pollack?",
    "a": "In Ireland, yes: since 1 June 2026 each angler may keep three pollack a day, then fish on catch-and-release. The UK agreed a three-fish limit as well. Check the current rules wherever you fish."
   },
   {
    "q": "How big do pollack get?",
    "a": "Most are 40–80 cm (16–31 in); shore fish are usually smaller, wreck fish bigger. The largest reach about 1.3 m and 18 kg. The IGFA world record is 12.41 kg (27 lb 6 oz), from Salcombe, Devon, in 1986."
   },
   {
    "q": "Where do you catch pollack?",
    "a": "Over rough ground: rocky headlands, kelp beds, reefs and wrecks along Atlantic coasts from Norway to Iberia. Small pollack come close inshore in summer; the biggest live on deep offshore wrecks."
   }
  ],
  "sources": [
   {
    "label": "FishBase — Pollachius pollachius",
    "url": "https://www.fishbase.se/summary/Pollachius-pollachius.html"
   },
   {
    "label": "Inland Fisheries Ireland — Conservation measures introduced for recreational fishing of pollack",
    "url": "https://www.fisheriesireland.ie/news/media-releases/conservation-measures-introduced-for-recreational-fishing-of-pollack"
   },
   {
    "label": "Ifremer — Effects of temperature on the growth of pollack juveniles",
    "url": "https://archimer.ifremer.fr/doc/00000/1122/"
   },
   {
    "label": "British Record (Rod Caught) Fish Committee — sea fish records, June 2026",
    "url": "https://anglingtrust.net/wp-content/uploads/2026/06/BRFC_SEA_FISH_LISTINGS_June-2026.pdf"
   }
  ]
 },
 "atlantic-cod": {
  "otherNames": "Cod; codling for young fish; skrei for the Barents Sea cod that come to the Norwegian coast to spawn. Morue or cabillaud in French, bacalao in Spanish (above all for salt cod), torsk in the Scandinavian languages, Dorsch or Kabeljau in German, þorskur in Icelandic.",
  "family": "Gadidae, the cod family.",
  "nativeRange": "The North Atlantic and the edge of the Arctic: from Ungava Bay and Labrador south to Cape Hatteras in the west; Greenland and Iceland; and from the Barents Sea along the European coast to the Bay of Biscay, including the North Sea and the Baltic.",
  "habitat": "From the shoreline down to about 600 m, usually 150–200 m. Young cod need shallow, complex cover — seagrass, gravel, rocks and boulders; adults live deeper and colder, schooling above the bottom by day and spreading out to feed at night.",
  "temp": "Cold water: FishBase gives about 0–15°C (32–59°F). Cod spawn at 0–12°C, preferring 0–6°C (32–43°F).",
  "record": "IGFA all-tackle world record: 47.02 kg (103 lb 10 oz), Michael Eisele, Sørøya, Norway, April 2013. The British boat record is 26.478 kg (58 lb 6 oz), North Sea off Whitby, 1992.",
  "lifespan": "Up to about 25 years, though few cod live that long in fished stocks.",
  "diet": "Omnivorous: invertebrates and fish, young cod included, eaten mostly at dawn and dusk.",
  "spawning": "In winter and early spring, in big schools offshore at or near the bottom in 50–200 m of water. Norway's skrei migrate from the Barents Sea to spawn along the coast, especially around Lofoten.",
  "young": "Juveniles hide in shallow, complex habitat — eelgrass, kelp, gravel and boulders — for their first years. Small cod are called codling.",
  "mouth": "A big mouth, the upper jaw overhanging the lower, and a single barbel on the chin.",
  "lookalikes": "Haddock: a black lateral line and a dark 'thumbprint' above the pectoral fin. Pollack and saithe: a jutting lower jaw and no real chin barbel. Ling: long and eel-like. Whiting: slim and silvery, with a dark spot at the base of the pectoral fin.",
  "eating": "Excellent; follow the local rules on what you may keep.",
  "status": "Listed as Vulnerable in an old (1996) IUCN assessment. Stocks vary enormously: Canada's northern cod collapsed and commercial fishing has been under a moratorium since 1992; Baltic cod have collapsed and recreational cod fishing there has been widely banned; the Barents Sea cod off northern Norway remain large.",
  "typicalCm": [
   50,
   100
  ],
  "maxCm": 200,
  "faqs": [
   {
    "q": "How big do cod get?",
    "a": "Most rod-caught cod are 50–100 cm (20–39 in). The largest on record reached about 2 m and 96 kg. The IGFA world record is 47.02 kg (103 lb 10 oz), from Sørøya in northern Norway in 2013."
   },
   {
    "q": "Can you fish for cod in the Baltic?",
    "a": "In most of it, not at present. Both Baltic cod stocks have collapsed, and the EU has banned recreational cod fishing across much of the Baltic — in the east since 2020, and in the west too in recent years. Check the current rules before planning a trip."
   },
   {
    "q": "What is skrei?",
    "a": "Norwegian for the cod that migrate each winter from the Barents Sea to spawn along Norway's coast, especially around Lofoten. They are big, lean fish in prime condition, and the season — roughly January to April — is the peak of Norwegian cod fishing."
   },
   {
    "q": "Can you fish for cod in Newfoundland?",
    "a": "Yes, in the recreational groundfish fishery, which has set seasons and daily limits each year from Fisheries and Oceans Canada. Northern cod are still rebuilding after the collapse that led to the 1992 moratorium."
   }
  ],
  "sources": [
   {
    "label": "FishBase — Gadus morhua",
    "url": "https://www.fishbase.se/summary/Gadus-morhua.html"
   },
   {
    "label": "IGFA world records — Cod, Atlantic",
    "url": "https://igfa.org/member-services/world-record/common-name/Cod,%20Atlantic"
   },
   {
    "label": "British Record (Rod Caught) Fish Committee — sea fish records, June 2026",
    "url": "https://anglingtrust.net/wp-content/uploads/2026/06/BRFC_SEA_FISH_LISTINGS_June-2026.pdf"
   },
   {
    "label": "Fisheries Secretariat — Commission proposes fishing opportunities for 2026 in the Baltic Sea",
    "url": "https://www.fishsec.org/2025/08/27/commission-proposes-fishing-opportunities-for-2026-in-the-baltic-sea/"
   }
  ]
 },
 "european-eel": {
  "otherNames": "Eel; glass eels and elvers when young, yellow eels while growing, silver eels when they head back to sea. Anguille in French, anguila in Spanish, Aal in German, paling in Dutch, ål in Swedish and Danish.",
  "family": "Anguillidae, the freshwater eels.",
  "nativeRange": "The Atlantic coast from Scandinavia to Morocco, and the Baltic, Mediterranean and Black seas, with the rivers and lakes that drain to them. It spawns far away, in the Sargasso Sea in the western Atlantic.",
  "habitat": "Every kind of water connected to the sea — streams, big rivers, lakes, ponds, canals, estuaries and coasts — living on the bottom, hidden under stones, in mud or in crevices. Some never leave estuaries and coastal water.",
  "temp": "Temperate; FishBase gives about 4–20°C (39–68°F). It feeds most in warm summer months and goes quiet in winter.",
  "record": "IGFA all-tackle world record: 3.6 kg (7 lb 14 oz), Christoph Lave, River Aare at Büren, Switzerland, 1992, tied with a 3.59 kg fish from Sweden's Lyckebyån (1988). The British record is 5.074 kg (11 lb 3 oz), from a southern stillwater in 2024. In England every eel must now be returned.",
  "lifespan": "Eels spend 6–12 years (males) or 9–20 years (females) growing in fresh water before they migrate; FishBase gives 23 years as the oldest reported. They spawn once, far out at sea, and die.",
  "diet": "Almost any small animal on the bottom: insect larvae, worms, snails, crustaceans and small fish, and carrion. Mostly active at night.",
  "spawning": "Silver eels swim thousands of kilometres to the Sargasso Sea to spawn and die there. In 2022 scientists followed satellite-tagged eels from the Azores towards the Sargasso — the first direct evidence of the journey. No one has yet watched them spawn.",
  "young": "Transparent, leaf-shaped larvae drift to Europe on the Gulf Stream over about 7–11 months, turn into glass eels 6–8 cm long, and swim up estuaries and rivers. They darken into elvers, then grow on as yellow eels.",
  "mouth": "A wide mouth with small teeth; the lower jaw juts beyond the upper.",
  "lookalikes": "American eel: almost identical, told apart by vertebra counts or DNA; both spawn in the Sargasso Sea. Conger eel: a sea fish whose upper jaw overhangs the lower, with the dorsal fin starting just behind the pectoral fins. Lampreys have no jaws and no paired fins.",
  "eating": "Once a staple — smoked, jellied or stewed — but the species is critically endangered, and eel cannot yet be bred in captivity, so every farmed eel began as a wild-caught glass eel.",
  "status": "Critically Endangered on the IUCN Red List. Numbers arriving in Europe have fallen by around 90% (possibly 98%) since the 1970s. Listed on CITES Appendix II; the EU eel regulation (2007) requires national recovery plans, and ICES advises zero catches of all life stages.",
  "typicalCm": [
   35,
   80
  ],
  "maxCm": 133,
  "faqs": [
   {
    "q": "Is it legal to fish for eels?",
    "a": "It depends where, and in many places, no. Ireland has closed its eel fishery since 2009; in England anglers must return every eel they catch, including in coastal waters; and recreational eel fishing is banned in EU waters of the Mediterranean and Black Sea. Elsewhere there are closed seasons and licences. The kindest rule: never keep one."
   },
   {
    "q": "Why are European eels endangered?",
    "a": "Because far fewer young eels are reaching Europe — roughly 90% fewer than in the 1970s. Dams and weirs block their way upriver, hydroelectric turbines kill migrating silver eels, parasites and pollution weaken them, and glass eels have been heavily fished and smuggled for the farming trade."
   },
   {
    "q": "Where do eels breed?",
    "a": "In the Sargasso Sea, in the western Atlantic, thousands of kilometres from Europe. The larvae drift back on the Gulf Stream. In 2022, satellite-tagged eels released from the Azores were tracked heading into the Sargasso — the first direct evidence — but no one has yet seen them spawn."
   },
   {
    "q": "What should I do if I catch an eel by accident?",
    "a": "Unhook it quickly and gently, ideally without lifting it from the water, and let it go. If the hook is deep, cut the line as close to the mouth as you can rather than tearing it out."
   }
  ],
  "sources": [
   {
    "label": "FishBase — Anguilla anguilla",
    "url": "https://www.fishbase.se/summary/Anguilla-anguilla.html"
   },
   {
    "label": "European Commission — European eel",
    "url": "https://oceans-and-fisheries.ec.europa.eu/ocean-health/eel_en"
   },
   {
    "label": "Wright et al. (2022), First direct evidence of adult European eels migrating to their breeding place in the Sargasso Sea — Scientific Reports",
    "url": "https://orbit.dtu.dk/en/publications/first-direct-evidence-of-adult-european-eels-migrating-to-their-b/"
   },
   {
    "label": "GOV.UK — Environment Agency rod fishing byelaws: national byelaws for England",
    "url": "https://www.gov.uk/government/publications/environment-agency-rod-fishing-byelaws-full-national-byelaws-for-england"
   }
  ]
 },
 "nile-perch": {
  "otherNames": "Capitaine in French-speaking Africa; mbuta or mputa (Luo) and sangara in Tanzania; also African snook and African barramundi. ‘Victoria perch’ is a trade name — and a misleading one, since the fish is not native to Lake Victoria.",
  "family": "Latidae, the lates perches — a close cousin of the barramundi of Asia and Australia.",
  "nativeRange": "The Nile–Sudan region of Africa: the Nile, Lake Chad, and the Niger, Volta and Senegal basins, plus the Congo basin and Lakes Albert and Turkana. Lake Nasser, behind the Aswan High Dam, holds Nile perch from the river itself.",
  "introduced": "Released into Lake Victoria and Uganda’s Lake Kyoga in the 1950s, and it now dominates both. It is listed among the world’s 100 worst invasive species, and the United States lists it as injurious wildlife.",
  "habitat": "Lakes, river channels and even irrigation canals. Adults live deep — 10–60 m (33–200 ft) — wherever there is enough oxygen; juveniles stay in shallow water near shore.",
  "temp": "Warm water only. A tropical fish (FishBase): the lakes and rivers it lives in run roughly 22–30°C (72–86°F).",
  "record": "IGFA all-tackle world record: 104.32 kg (230 lb), William Toth, Lake Nasser, Egypt, 20 December 2000. Nets have taken bigger: FishBase notes a 180 cm, 164 kg fish from Lake Albert, and the species is reported to reach 200 kg.",
  "lifespan": "Up to about 16 years in the wild; males tend to die younger than females.",
  "diet": "Fish above all, including its own kind. In Lake Victoria it first ate out the native cichlids and now lives largely on small shrimp and minnows. Juveniles eat zooplankton, then insects and larger crustaceans.",
  "spawning": "In Lake Victoria, breeding peaks from March to June. A female sheds 3–15 million small eggs that hatch in about 20 hours, with no parental care. Fish mature at about 3 years and roughly 50–85 cm.",
  "young": "Juveniles are brownish with paler marbling on the head and sides, and live in the shallows until they grow big enough to move deep.",
  "mouth": "A large, protrusible mouth with a slightly jutting lower jaw and bands of fine, bristle-like teeth — no fangs. The gill cover carries a strong spine and the cheek bones are serrated, so lift big fish with care.",
  "lookalikes": "Its own cousins: Lake Turkana and Lake Tanganyika each have smaller endemic Lates species. Outside Africa, the barramundi (Lates calcarifer) is very similar but smaller. Nile tilapia shares its lakes but is a small, deep-bodied, plant-eating cichlid.",
  "eating": "A major food and export fish, with firm white fillets shipped from Lake Victoria to Europe. Its flesh is fatty enough that it is smoked locally rather than sun-dried.",
  "status": "Least Concern on the IUCN Red List. Heavy and sometimes illegal netting has shrunk the average fish in Lake Victoria.",
  "typicalCm": [
   50,
   130
  ],
  "maxCm": 200,
  "faqs": [
   {
    "q": "How big do Nile perch get?",
    "a": "Up to about 2 m (6 ft 7 in) and 200 kg (440 lb). The IGFA rod-and-reel world record is 104.32 kg (230 lb), from Lake Nasser, Egypt, in 2000, and commercial nets on Lake Albert have landed a 164 kg fish."
   },
   {
    "q": "Why is the Nile perch in Lake Victoria?",
    "a": "It was released there in the 1950s to create a big commercial and sport fishery. Commercially it worked — Nile perch became a major export — but it is blamed for the extinction or near-extinction of hundreds of the lake’s native cichlid species."
   },
   {
    "q": "Where can you catch a Nile perch?",
    "a": "Lake Nasser in southern Egypt is the classic trophy water. The Nile below Murchison Falls and Lake Victoria in Uganda, Kenya and Tanzania, Lake Turkana in Kenya, and the big West African rivers — the Niger, Volta and Senegal — all hold them."
   },
   {
    "q": "Is a Nile perch the same as a tilapia?",
    "a": "No. The Nile perch is a huge predatory lates perch, related to the barramundi. The Nile tilapia is a much smaller, mostly plant-eating cichlid. The two share the Nile and Lake Victoria, and both are important food fish."
   }
  ],
  "sources": [
   {
    "label": "FishBase — Lates niloticus",
    "url": "https://www.fishbase.se/summary/Lates-niloticus.html"
   },
   {
    "label": "Animal Diversity Web (University of Michigan) — Lates niloticus",
    "url": "https://animaldiversity.org/accounts/Lates_niloticus/"
   },
   {
    "label": "USDA National Invasive Species Information Center — Nile perch",
    "url": "https://www.invasivespeciesinfo.gov/aquatic/fish-and-other-vertebrates/nile-perch"
   },
   {
    "label": "IGFA — World Records search",
    "url": "https://igfa.org/igfa-world-records-search/"
   }
  ]
 },
 "nile-tilapia": {
  "otherNames": "Tilapia; bolti (bulti) in Egypt. In Zimbabwe and Zambia anglers call tilapias ‘bream’. Tilapias are sometimes marketed as St. Peter’s fish.",
  "family": "Cichlidae, the cichlids.",
  "nativeRange": "The Nile basin (including Lakes Albert, Edward and Tana), Lake Kivu, Lake Tanganyika, the Awash and Omo rivers, Lake Turkana and other Ethiopian and Kenyan Rift lakes, and in West Africa the Senegal, Gambia, Volta, Niger, Benue and Chad basins. Also the coastal rivers of Israel.",
  "introduced": "Farmed around the world. Established in Africa outside its range in Lake Victoria, Lake Kariba and the Zambezi, Madagascar, Mauritius and Réunion. South Africa, Malawi and Zambia have banned further stocking because it hybridises with local tilapias.",
  "habitat": "Almost any fresh water — rivers, lakes, dams, canals and irrigation channels — from sea level to about 1,830 m (6,000 ft). It copes with brackish water but not full sea water for long.",
  "temp": "Warm water. FAO gives a preferred range of 31–36°C (88–97°F); it survives about 12–42°C and breeds only once the water reaches about 24°C (75°F).",
  "record": "IGFA all-tackle world record: 6.01 kg (13 lb 3 oz), Sarel van Rooyen, Antelope Island, Lake Kariba, Zimbabwe, 5 July 2002 — from an introduced population.",
  "lifespan": "FishBase records 9 years; FAO notes it can live longer than 10.",
  "diet": "Mainly phytoplankton and algae, with detritus, plants and insect larvae; young fish eat more animal food than adults.",
  "spawning": "Males dig shallow pits in firm sand. The female takes the eggs into her mouth and carries them, then the fry, for one to two weeks. In warm water it spawns again and again, about every 30 days, and matures in as little as 3–6 months.",
  "young": "Fry shelter in the mother’s mouth until the yolk is used up; even small fish show the striped tail.",
  "mouth": "A small mouth with fine teeth for grazing algae — no fangs.",
  "lookalikes": "Blue tilapia lacks the striped tail and has a red edge to the dorsal fin. Mozambique tilapia has no regular tail stripes, and its breeding males turn black with a pointed snout. Redbreast tilapia (Coptodon rendalli) shows a red-pink chest. Farmed strains and hybrids often cannot be told apart by eye.",
  "eating": "Excellent: mild white fillets. It is the most important tilapia in fish farming worldwide.",
  "status": "Least Concern on the IUCN Red List. Outside its native range it is invasive, and it threatens other tilapias by hybridising with them.",
  "typicalCm": [
   20,
   40
  ],
  "maxCm": 60,
  "faqs": [
   {
    "q": "How do you identify a Nile tilapia?",
    "a": "Look at the tail. A Nile tilapia has regular dark vertical stripes running right across the tail fin at every age — the single best tell. It is deep-bodied and grey-brown with faint bars, and breeding males turn reddish, especially on the fins."
   },
   {
    "q": "How big do Nile tilapia get?",
    "a": "Most are 20–40 cm (8–16 in). They can reach about 60 cm (24 in) and more than 5 kg (11 lb). The IGFA world record is 6.01 kg (13 lb 3 oz), from Lake Kariba, Zimbabwe, in 2002."
   },
   {
    "q": "Is it safe to wade where tilapia live?",
    "a": "Not everywhere. In much of Africa the warm, still, weedy water tilapia love can carry bilharzia (schistosomiasis), a parasite spread by freshwater snails that gets in through the skin. Where it occurs, fish from a boat, jetty or dry bank, and tell a doctor about the exposure if you feel unwell after a trip."
   },
   {
    "q": "Why have some countries banned stocking Nile tilapia?",
    "a": "Because it hybridises with local tilapias and outcompetes them. South Africa, Malawi and Zambia have banned further stocking; in the Zambezi and Limpopo it is already hybridising with the native Mozambique tilapia."
   }
  ],
  "sources": [
   {
    "label": "FishBase — Oreochromis niloticus",
    "url": "https://www.fishbase.se/summary/Oreochromis-niloticus.html"
   },
   {
    "label": "FAO Cultured Aquatic Species — Nile tilapia",
    "url": "https://www.fao.org/fishery/docs/CDrom/aquaculture/I1129m/file/en/en_niletilapia.htm"
   },
   {
    "label": "Wikipedia — Nile tilapia",
    "url": "https://en.wikipedia.org/wiki/Nile_tilapia"
   },
   {
    "label": "World Health Organization — Schistosomiasis fact sheet",
    "url": "https://www.who.int/news-room/fact-sheets/detail/schistosomiasis"
   }
  ]
 },
 "mozambique-tilapia": {
  "otherNames": "Blue kurper in South Africa (blou kurper in Afrikaans); in southern Africa tilapias are often just called bream.",
  "family": "Cichlidae, the cichlids.",
  "nativeRange": "South-eastern Africa: the lower Zambezi and lower Shire, the Limpopo system, and the coastal plains from the Zambezi delta south to about Algoa Bay in the Eastern Cape.",
  "introduced": "Carried around the tropics for fish farming and mosquito control, and listed among the world’s 100 worst invasive species. In Africa it has been moved into Namibia, Madagascar, the Seychelles and elsewhere.",
  "habitat": "Standing water: dams, ponds, swamps, coastal lakes and blind estuaries, usually over mud and among weed. It is absent from fast water and usually from high altitudes, and it grows and breeds in fresh, brackish and even sea water.",
  "temp": "Warm water: FishBase gives about 17–35°C (63–95°F). When oxygen runs low it gulps air at the surface.",
  "record": "IGFA all-tackle world record: 3.11 kg (6 lb 13 oz), Eugene Kruger, Loskop Dam, South Africa, 4 April 2003.",
  "lifespan": "Up to about 11 years.",
  "diet": "Mostly algae, phytoplankton and detritus, with some zooplankton, insect larvae, shrimps and worms. Young fish eat more animal food; big ones sometimes eat small fish.",
  "spawning": "Through the warm months. Territorial males dig spawning pits, turn black and court females; the female broods eggs and fry in her mouth. Normally mature at about 15 cm, but stunted fish in crowded ponds can breed at 6–7 cm and just two months old.",
  "young": "Fry stay close to the brooding female and dart back into her mouth when threatened.",
  "mouth": "Small, with very fine teeth. Breeding males grow enlarged jaws that give a pointed, duck-bill snout and a concave forehead.",
  "lookalikes": "Nile tilapia has regular vertical stripes across the tail. Three-spotted tilapia (Oreochromis andersonii) of the Zambezi and Okavango shows three dark spots along the side. Redbreast tilapia has a red-pink chest. Hybrids blur all of these.",
  "eating": "Mild, white and good, especially fried whole.",
  "status": "Vulnerable on the IUCN Red List (2017): Nile tilapia stocked into its range hybridise with it, and pure Mozambique tilapia are expected to disappear from the Zambezi and Limpopo.",
  "typicalCm": [
   15,
   35
  ],
  "maxCm": 39,
  "faqs": [
   {
    "q": "What is a blue kurper?",
    "a": "The South African name for the Mozambique tilapia (blou kurper in Afrikaans), a deep-bodied cichlid of warm dams, ponds and coastal lakes from the Zambezi to the Eastern Cape. It is a popular, good-eating panfish."
   },
   {
    "q": "Why do some tilapia turn black?",
    "a": "They are breeding males. A male Mozambique tilapia guarding a spawning pit turns black, with a white throat and red edges to the dorsal and tail fins, and grows a pointed, duck-bill snout. Females and non-breeding males stay silvery with a few dark blotches."
   },
   {
    "q": "Can Mozambique tilapia live in salt water?",
    "a": "Yes. It grows and breeds in fresh, brackish and sea water, which is why it is common in blind estuaries and coastal lakes — and why it has done so well where people have released it."
   },
   {
    "q": "Is the Mozambique tilapia endangered?",
    "a": "It is listed as Vulnerable. The threat is not fishing but farmed Nile tilapia, which interbreed with it; pure Mozambique tilapia are expected to vanish from the Zambezi and Limpopo. Ironically, it is itself one of the world’s worst invaders elsewhere."
   }
  ],
  "sources": [
   {
    "label": "FishBase — Oreochromis mossambicus",
    "url": "https://www.fishbase.se/summary/Oreochromis-mossambicus.html"
   },
   {
    "label": "Wikipedia — Mozambique tilapia",
    "url": "https://en.wikipedia.org/wiki/Mozambique_tilapia"
   },
   {
    "label": "IGFA — World Records search",
    "url": "https://igfa.org/igfa-world-records-search/"
   }
  ]
 },
 "tigerfish": {
  "otherNames": "African tigerfish or just ‘tiger’; tiervis in Afrikaans; ngwesh.",
  "family": "Alestidae, the African tetras — a giant, toothy relative of the little tetras in aquarium tanks.",
  "nativeRange": "Much of Africa: the Niger, Benue, Senegal, Volta and Chad basins in the west, the Nile and Omo, the whole Congo basin and Lake Tanganyika, and south through the Zambezi (including Lake Kariba), the Okavango, the Rovuma and Rufiji, and the Limpopo to the Pongola River in South Africa.",
  "habitat": "Large, warm, well-oxygenated rivers and lakes. All but the biggest fish rove in schools of like-sized fish; large tigers hunt alone. They sit near the surface by day and nearer the bottom at night.",
  "temp": "Warm water: FishBase gives 22–28°C (72–82°F).",
  "record": "IGFA all-tackle world record: 16.1 kg (35 lb 7 oz), Jennifer Daynes, Lake Kariba, Zimbabwe, 12 September 2001.",
  "lifespan": "FishBase gives a maximum reported age of 8 years.",
  "diet": "Fish, almost entirely, once past about 10 cm — whatever is most plentiful, especially small tetras, barbs and, in Kariba, the introduced kapenta (Limnothrissa). At Schroda Dam in South Africa they leap from the water to catch barn swallows in flight.",
  "spawning": "Thought to spawn over a few days in December or January, as rivers rise with the first rains. Eggs are laid among flooded vegetation near the shore, and the young shelter there until the water drops.",
  "mouth": "Big, sharp, conical teeth that overlap the jaws even when the mouth is closed, replaced in sets. They cut light line and hands alike.",
  "lookalikes": "Goliath tigerfish of the Congo basin is far heavier, with much bigger teeth. Other tigerfish species live in the Nile and West Africa; the African tigerfish is the one with bold dark stripes along the upper sides.",
  "eating": "Bony, but an important food fish across its range. Most sport anglers release their tigers.",
  "status": "Least Concern. In South Africa it lives only in lowveld rivers, has declined with dams, pollution and water abstraction, and is protected in some reserves.",
  "typicalCm": [
   35,
   70
  ],
  "maxCm": 105,
  "shape": "torpedo",
  "faqs": [
   {
    "q": "Can tigerfish really catch birds?",
    "a": "Yes. At Schroda Dam in South Africa, researchers filmed tigerfish leaping out of the water to catch barn swallows in flight, with about one attempt in four succeeding. It is the only freshwater fish known to do this."
   },
   {
    "q": "Where is the best tigerfish fishing?",
    "a": "The Zambezi and Lake Kariba are the classic waters, along with the Okavango and Tanzania’s rivers. On the Zambezi the best months are roughly August to November, when the water is low, clear and warming; the Kariba International Tiger Fish Tournament is normally held in October."
   },
   {
    "q": "How big do tigerfish get?",
    "a": "Most fish caught weigh a few kilograms; FishBase gives a maximum of 105 cm (41 in) fork length and 28 kg. The IGFA all-tackle record is 16.1 kg (35 lb 7 oz), from Lake Kariba in 2001."
   },
   {
    "q": "Do you need a wire leader for tigerfish?",
    "a": "Yes. Their interlocking, razor-sharp teeth slice through monofilament and braid. Use a short wire trace, sharp hooks and a firm strike — the bony mouth makes them notoriously hard to hook."
   }
  ],
  "sources": [
   {
    "label": "FishBase — Hydrocynus vittatus",
    "url": "https://www.fishbase.se/summary/Hydrocynus-vittatus.html"
   },
   {
    "label": "SANBI Red List of South African Species — Tigerfish",
    "url": "https://speciesstatus.sanbi.org/assessment/last-assessment/174/"
   },
   {
    "label": "Wikipedia — Hydrocynus vittatus",
    "url": "https://en.wikipedia.org/wiki/Hydrocynus_vittatus"
   },
   {
    "label": "Aardvark McLeod — In pursuit of African tigers: when to go",
    "url": "https://www.aardvarkmcleod.com/in-pursuit-of-african-tigers-a-short-summary-of-when-to-go/"
   }
  ]
 },
 "goliath-tigerfish": {
  "otherNames": "Giant tigerfish; mbenga, the Congo name.",
  "family": "Alestidae, the African tetras.",
  "nativeRange": "The Congo River basin, from the lower Congo up to the upper Lualaba and Lake Upemba, in the Democratic Republic of the Congo and the Republic of the Congo; also reported from Lake Tanganyika.",
  "habitat": "Lakes and large rivers, especially fast, oxygen-rich water in deep channels. It ambushes prey from the calmer eddies beside rapids.",
  "temp": "Warm, tropical water: FishBase gives 23–26°C (73–79°F).",
  "record": "IGFA all-tackle world record: 44 kg (97 lb), Raymond Houtmans, Zaire (Congo) River, Kinshasa, 9 July 1988.",
  "lifespan": "Not well studied.",
  "diet": "Fish — anything it can overpower, including smaller goliaths. It is known to bite chunks out of prey too big to swallow.",
  "spawning": "Females gather to spawn along riverbanks and lakeshores, scattering thousands of eggs among thick vegetation, with no parental care. The larvae eat plankton before moving on to fish.",
  "mouth": "The signature: large, dagger-shaped teeth about 2.5 cm long, spaced along the jaws and fitting into grooves when the mouth closes, replaced in sets.",
  "lookalikes": "The African tigerfish (Hydrocynus vittatus), which shares the Congo, is slimmer and smaller, with bold dark stripes; the goliath is the heavy, thick-bodied one with the enormous teeth.",
  "eating": "Eaten fresh and dried in Central Africa, where dried fish is a key source of protein.",
  "status": "Least Concern on the IUCN Red List.",
  "typicalCm": [
   60,
   110
  ],
  "maxCm": 133,
  "shape": "torpedo",
  "faqs": [
   {
    "q": "How big is a goliath tigerfish?",
    "a": "FishBase gives a maximum of 133 cm (52 in) fork length and 50 kg (110 lb). The IGFA all-tackle world record is 44 kg (97 lb), caught in the Congo River at Kinshasa in 1988."
   },
   {
    "q": "Where do goliath tigerfish live?",
    "a": "Only in the Congo River basin — the main river, the Lualaba and Lake Upemba — with reports from Lake Tanganyika. It is the largest member of the tigerfish genus and is found nowhere else."
   },
   {
    "q": "Is the goliath tigerfish dangerous?",
    "a": "To fish, very. To people, it deserves respect: its teeth are about 2.5 cm (1 in) long and it can take a chunk out of a large fish. Handle it only with long pliers and a firm grip, and fish its rivers with an experienced guide."
   }
  ],
  "sources": [
   {
    "label": "FishBase — Hydrocynus goliath",
    "url": "https://www.fishbase.se/summary/Hydrocynus-goliath.html"
   },
   {
    "label": "Wikipedia — Hydrocynus goliath",
    "url": "https://en.wikipedia.org/wiki/Hydrocynus_goliath"
   },
   {
    "label": "IGFA — World Records search",
    "url": "https://igfa.org/igfa-world-records-search/"
   }
  ]
 },
 "sharptooth-catfish": {
  "otherNames": "Barbel in South Africa (baber in Afrikaans); African catfish, North African catfish. The species name comes from its type locality, the Gariep — the Khoekhoe name for the Orange River.",
  "family": "Clariidae, the air-breathing catfishes.",
  "nativeRange": "Almost all of Africa except the Maghreb, the Upper Guinea coast, most of Cameroon-to-Gabon Lower Guinea and the Cape, plus the Middle East (Israel, Jordan, Lebanon, Syria and southern Turkey).",
  "introduced": "Spread worldwide for fish farming since the 1980s. In South Africa it has invaded Western and Eastern Cape rivers, partly through water-transfer schemes.",
  "habitat": "Quiet water above all: vegetated edges of rivers and lakes, swamps, floodplain pools, canals and dams, usually over soft mud — though it turns up in rapids too. It breathes air with a special organ behind the gills and can cross land at night.",
  "temp": "Tolerant: FishBase gives 8–35°C (46–95°F). It feeds and grows best in warm summer water.",
  "record": "IGFA all-tackle world record: 42.18 kg (93 lb), Hennie Moller, Orange River at Kakamas, South Africa, 23 April 2003.",
  "lifespan": "Up to about 15 years.",
  "diet": "Almost anything: insects, plankton, snails, crabs, shrimp, fish, frogs, young birds, carrion, fruit and seeds. It feeds mostly at night, and occasionally at the surface.",
  "spawning": "In the rainy season, at night, on newly flooded plains and shallow margins. Pairs spawn after aggressive courtship and scatter the eggs widely; there is no parental care. Larvae swim within 2–3 days, and the young stay on the floodplain until they are 1.5–2.5 cm long.",
  "mouth": "A broad, terminal mouth with bands of small, fine teeth and four pairs of barbels (whiskers). The real hazard is the pectoral-fin spines.",
  "lookalikes": "Vundu has a large fatty (adipose) fin behind the dorsal fin and even longer whiskers; the sharptooth catfish has no adipose fin at all — just one long dorsal fin.",
  "eating": "Good, and widely farmed — in much of Africa it sells for more than tilapia because it can be sold live. Hybrids with vundu (‘hetero-clarias’) are farmed for their white flesh.",
  "status": "Least Concern on the IUCN Red List; a pest where it has been introduced.",
  "typicalCm": [
   50,
   100
  ],
  "maxCm": 170,
  "faqs": [
   {
    "q": "Can catfish walk on land?",
    "a": "The sharptooth catfish can, after a fashion. It breathes air through an organ behind its gills and uses its strong pectoral spines to wriggle overland at night, from a drying pool to new water. It can also survive buried in mud between rainy seasons."
   },
   {
    "q": "How big do African sharptooth catfish get?",
    "a": "Up to 1.7 m (5 ft 7 in) and about 60 kg (130 lb), though most anglers’ fish are under a metre. The IGFA all-tackle record is 42.18 kg (93 lb), from the Orange River at Kakamas, South Africa, in 2003."
   },
   {
    "q": "Why is it called barbel in South Africa?",
    "a": "For its whiskers — barbels. South African anglers simply call the sharptooth catfish ‘barbel’ (baber in Afrikaans). It is not related to the European barbel, which is a carp."
   },
   {
    "q": "How do you tell a sharptooth catfish from a vundu?",
    "a": "Look behind the dorsal fin. A vundu has a big fatty adipose fin almost as long as the dorsal; a sharptooth catfish has no adipose fin, just one very long dorsal fin running down its back."
   }
  ],
  "sources": [
   {
    "label": "FishBase — Clarias gariepinus",
    "url": "https://www.fishbase.se/summary/Clarias-gariepinus.html"
   },
   {
    "label": "Wikipedia — Clarias gariepinus",
    "url": "https://en.wikipedia.org/wiki/Clarias_gariepinus"
   },
   {
    "label": "IGFA — World Records search",
    "url": "https://igfa.org/igfa-world-records-search/"
   }
  ]
 },
 "vundu": {
  "otherNames": "Also called sampa, cur, lenda or certa in parts of its range.",
  "family": "Clariidae, the air-breathing catfishes.",
  "nativeRange": "The Nile (rare in its lower reaches), the Congo system, the upper and middle Zambezi, Lakes Tanganyika, Edward and Rukwa, and in West Africa the Gambia, Senegal, Niger, Benue, Volta and Lake Chad basins and coastal rivers from Guinea to Gabon.",
  "habitat": "Large, deep rivers — in the main channel or deep pools — and big lakes and backwaters, including Lake Kariba. Uncommon wherever it lives.",
  "temp": "Warm, tropical water: FishBase gives 22–23°C (72–73°F).",
  "record": "IGFA all-tackle world record: 32.5 kg (71 lb 10 oz), Rob Konschel, Lake Kariba, Zimbabwe, 26 December 2000. The species is reported to reach 55 kg.",
  "lifespan": "12 years or more.",
  "diet": "Anything: insects and invertebrates when small; fish and small vertebrates when large. It scavenges carcasses and the offal from riverside villages, finding food by smell and vibration more than sight.",
  "spawning": "Little is published about how wild vundu spawn. Fish farms breed it routinely, and cross it with the sharptooth catfish.",
  "mouth": "A wide mouth with broad tooth plates and very long barbels that reach back almost to the pelvic fins. The pectoral spine has strong, downward-pointing serrations.",
  "lookalikes": "Sharptooth catfish has no adipose fin and shorter whiskers. The vundu’s tail often shows a pale cross-bar, and the back of its adipose fin is blackish.",
  "eating": "Eaten wherever it is caught, and farmed in West Africa.",
  "status": "Least Concern on the IUCN Red List, though it has declined locally.",
  "typicalCm": [
   60,
   120
  ],
  "maxCm": 150,
  "faqs": [
   {
    "q": "What is the largest freshwater fish in southern Africa?",
    "a": "The vundu, at up to 1.5 m (5 ft) and 55 kg (121 lb). Bull sharks that run up rivers grow bigger, but they are sea fish. The IGFA vundu record is 32.5 kg (71 lb 10 oz), from Lake Kariba in 2000."
   },
   {
    "q": "What bait do you use for vundu?",
    "a": "Something that smells. Kariba anglers use fatty meat, blood baits — and, famously, bars of blue soap — fished on the bottom of deep holes at night, on heavy tackle with steel leaders and big hooks."
   },
   {
    "q": "Where do vundu live?",
    "a": "In big, deep rivers and lakes across sub-Saharan Africa and up the Nile: the Zambezi and Lake Kariba, the Congo, Lake Tanganyika, the Niger and Volta. It is uncommon everywhere, and most active at night."
   }
  ],
  "sources": [
   {
    "label": "FishBase — Heterobranchus longifilis",
    "url": "https://www.fishbase.se/summary/Heterobranchus-longifilis.html"
   },
   {
    "label": "Wikipedia — Vundu",
    "url": "https://en.wikipedia.org/wiki/Vundu"
   },
   {
    "label": "IGFA — World Records search",
    "url": "https://igfa.org/igfa-world-records-search/"
   },
   {
    "label": "KastKing — That vundu that you do (Kariba baits and methods)",
    "url": "https://kastking.com/blogs/fishing-stories/that-vundu-that-you-do"
   }
  ]
 },
 "smallmouth-yellowfish": {
  "otherNames": "Orange–Vaal smallmouth yellowfish. Formerly Barbus aeneus.",
  "family": "Cyprinidae, the carp and minnow family — a large African barb.",
  "nativeRange": "The Orange–Vaal river system: from its sources in Lesotho and the Mpumalanga highveld to the Atlantic at Oranjemund, through South Africa, Lesotho, Botswana and Namibia.",
  "introduced": "Moved into the Gouritz, Great Fish, Kei and Limpopo (Olifants) systems, and Kyle Dam in Zimbabwe; it has become invasive in some Eastern Cape rivers.",
  "habitat": "Clear, flowing water of large rivers over sand and rock, and large impoundments. Adults are fairly territorial, often keeping to a stretch of 20 m or so.",
  "temp": "A warm-temperate river fish of hot summers and cold winters. Spawning starts once the water passes about 19°C (66°F) in spring.",
  "record": "No IGFA all-tackle category. FishBase lists a maximum published weight of 7.8 kg; FOSAF puts the species at up to 50 cm and 7 kg.",
  "lifespan": "Up to about 12 years. It grows slowly, taking almost seven years to reach maturity at about 30 cm fork length.",
  "diet": "Omnivorous bottom feeder: insect larvae, water fleas, snails, small mussels, crabs, shrimps, small fish, algae and detritus.",
  "spawning": "Spring to midsummer — October to February — once the water passes 19°C, usually after the first good rains. Small shoals run up to shallow gravel beds in flowing water; eggs go into a saucer-shaped nest and are covered with gravel. A 45 cm female carries about 30,000 eggs.",
  "mouth": "A small mouth, built for picking food off the bottom; no teeth in the jaws.",
  "lookalikes": "Largemouth yellowfish, in the same rivers, has a longer, heavier head and a much bigger mouth, and is a fish-eater. Other yellowfish species live in other river systems.",
  "eating": "Edible, and readily caught by subsistence anglers on worms, crabs and minnows; most sport anglers release them.",
  "status": "Least Concern, but vulnerable to pollution, water abstraction, over-harvesting and alien fish. Angling for it on the Vaal is a major industry.",
  "typicalCm": [
   30,
   45
  ],
  "maxCm": 50,
  "faqs": [
   {
    "q": "When is the best time to fish for smallmouth yellowfish?",
    "a": "October, for size and numbers, according to the Federation of Southern African Flyfishers; April and May are also good. They can be caught all year, but summer floods colour the rivers."
   },
   {
    "q": "How do you catch smallmouth yellowfish on fly?",
    "a": "Dead-drift nymphs through riffles and glides — a heavy dropper with a smaller caddis pupa or mayfly nymph is the standard rig, often fished Czech-style on a short line. In pools, black or olive Woolly Buggers and strip leeches work."
   },
   {
    "q": "How big do smallmouth yellowfish get?",
    "a": "Up to about 50 cm (20 in) and 7–8 kg (15–17 lb). They grow slowly: a fish takes almost seven years to reach 30 cm and maturity, which is why anglers release the big ones."
   }
  ],
  "sources": [
   {
    "label": "FishBase — Labeobarbus aeneus",
    "url": "https://www.fishbase.se/summary/Labeobarbus-aeneus.html"
   },
   {
    "label": "Wikipedia — Smallmouth yellowfish",
    "url": "https://en.wikipedia.org/wiki/Smallmouth_yellowfish"
   },
   {
    "label": "FOSAF — Guide to yellowfish",
    "url": "https://fosaf.co.za/guide-yellowfish.php"
   }
  ]
 },
 "largemouth-yellowfish": {
  "otherNames": "Orange–Vaal largemouth yellowfish; formerly Barbus kimberleyensis. The Free State’s provincial fish emblem.",
  "family": "Cyprinidae, the carp and minnow family — a large African barb.",
  "nativeRange": "Endemic to the Orange–Vaal (Orange–Senqu) system and its larger tributaries, such as the Riet, in South Africa, Lesotho and Namibia.",
  "habitat": "Deep pools (over 2 m) of large rivers, and the slow water above weirs and dams; it also does well in dams. Needs plenty of cover and clean water. It roams farther than the smallmouth, often 4–6 km.",
  "temp": "A warm-temperate river fish; it spawns in midsummer. Most are caught when the rivers are low, clear and cool in winter.",
  "record": "IGFA all-tackle world record: 9.52 kg (21 lb), Ian Couryer, Vaal River, South Africa, 8 March 2005. FishBase lists fish to 82.5 cm fork length and 22.2 kg.",
  "lifespan": "12 years or more. It grows slowly, reaching 30 cm only after about five years.",
  "diet": "Insects and small crustaceans when young; above about 30 cm it eats almost nothing but fish.",
  "spawning": "Midsummer to late summer, around December and January, over gravel beds in running water. A large female can lay more than 60,000 eggs in a season. Weirs, dams and silt have cut it off from many spawning grounds.",
  "mouth": "A large mouth on a long, heavy head — the obvious difference from the smallmouth.",
  "lookalikes": "Smallmouth yellowfish, in the same rivers, has a shorter head and a small mouth and feeds on the bottom. If in doubt, release it.",
  "eating": "Do not keep it: it is protected, and toxins build up in its flesh as a top predator in polluted water.",
  "status": "Near Threatened (IUCN and SANBI). Listed under South Africa’s Threatened or Protected Species (TOPS) regulations, which require every fish caught to be released immediately. Surveys after drought have found no fry in some dams.",
  "typicalCm": [
   40,
   70
  ],
  "maxCm": 83,
  "faqs": [
   {
    "q": "Can you keep a largemouth yellowfish?",
    "a": "No. It is Near Threatened and listed under South Africa’s TOPS regulations, which prescribe immediate catch-and-release of every largemouth yellowfish. Wet your hands, keep the fight short, and get it back in the water fast."
   },
   {
    "q": "Where can you catch largemouth yellowfish?",
    "a": "The Orange River below Gariep Dam holds more than the Vaal, and the lower Vaal between Bloemhof Dam and Douglas is good. Van der Kloof Dam produces outstanding fishing. Most are caught from May to September, when the rivers are low and clear."
   },
   {
    "q": "How big do largemouth yellowfish get?",
    "a": "Up to about 82.5 cm (32 in) and 22 kg (49 lb), making it the largest scaled fish native to southern Africa. The IGFA all-tackle record is 9.52 kg (21 lb), from the Vaal River in 2005."
   }
  ],
  "sources": [
   {
    "label": "FishBase — Labeobarbus kimberleyensis",
    "url": "https://www.fishbase.se/summary/Labeobarbus-kimberleyensis.html"
   },
   {
    "label": "SANBI Red List of South African Species — Largemouth yellowfish",
    "url": "https://speciesstatus.sanbi.org/assessment/last-assessment/91/"
   },
   {
    "label": "FOSAF — Guide to yellowfish",
    "url": "https://fosaf.co.za/guide-yellowfish.php"
   },
   {
    "label": "Wikipedia — Largemouth yellowfish",
    "url": "https://en.wikipedia.org/wiki/Largemouth_yellowfish"
   }
  ]
 },
 "dusky-kob": {
  "otherNames": "Kob, kabeljou or ‘salmon’ in South Africa; mulloway or jewfish in Australia; Japanese meagre (its FAO and IGFA name).",
  "family": "Sciaenidae, the drums and croakers — a cousin of the red drum.",
  "nativeRange": "The Indo-West Pacific: the African south-east coast from the Cape of Good Hope (False Bay) to southern Mozambique; Pakistan and north-west India; Korea, Japan and China; and southern Australia.",
  "habitat": "Juveniles depend on estuaries, usually staying in their home estuary for the first three to five years. Adults live from the surf zone out to about 120 m (390 ft), and still come into estuaries and the surf.",
  "temp": "Temperate to subtropical coastal water — from South Africa’s cool south coast to warm KwaZulu-Natal, roughly 14–25°C (57–77°F).",
  "record": "IGFA all-tackle world record (as Japanese meagre): 66.75 kg (147 lb 2 oz), Ronnie Botha, Sundays River, Port Elizabeth (Gqeberha), South Africa, 22 November 1998.",
  "lifespan": "Long-lived: the oldest aged was 42 years. It takes 5–7 years to mature, at about 90 cm.",
  "diet": "Mysid shrimp when small, then fish, squid and other cephalopods as it grows; a bottom feeder that also hunts through the water column.",
  "spawning": "Adults from the Western and Eastern Cape migrate up to KwaZulu-Natal to spawn in winter and spring. The young recruit into estuaries along the coast.",
  "young": "Juvenile kob are found only inshore and in estuaries; their tail is angular, becoming more rounded in big fish.",
  "mouth": "A large mouth; no barbels. Lift big fish with support under the belly.",
  "lookalikes": "Silver kob (Argyrosomus inodorus) looks almost identical; it is mainly a boat-caught fish of deeper water and the cooler west and south coasts, while estuary and surf kob east of Cape Agulhas are mostly dusky kob. Scientists separate them by the swim bladder and ear stones. Geelbek has a bright yellow mouth.",
  "eating": "Excellent eating, but wild kob is on the WWF-SASSI red list — don’t buy it. Farmed kob from tanks and ponds is a green-list choice.",
  "status": "Endangered on the IUCN Red List (2018). South Africa’s stock is rated overfished, at roughly 1–4.5% of its unfished level.",
  "typicalCm": [
   50,
   110
  ],
  "maxCm": 181,
  "faqs": [
   {
    "q": "How big do dusky kob get?",
    "a": "Up to about 1.8–2 m (6 ft) and 75–80 kg (165–176 lb). The IGFA world record, listed as Japanese meagre, is 66.75 kg (147 lb 2 oz), from the Sundays River at Port Elizabeth (Gqeberha) in 1998."
   },
   {
    "q": "What is the bag limit for kob in South Africa?",
    "a": "From the shore and in estuaries east of Cape Agulhas: one kob a day, at least 60 cm. From a boat at sea between Cape Agulhas and the Umtamvuna River: five a day at 50 cm or more, but only one over 110 cm. West of Cape Agulhas: five at 50 cm. Check the current rules before you fish."
   },
   {
    "q": "Are kob endangered?",
    "a": "Dusky kob is listed as Endangered by the IUCN, and South Africa’s breeding stock is down to a few percent of its unfished size. It lives to 42 years and takes 5–7 years to breed, so every big female released matters."
   },
   {
    "q": "Is a dusky kob the same as a mulloway?",
    "a": "Yes — the same species, Argyrosomus japonicus. Australians call it mulloway or jewfish; South Africans call it kob or kabeljou; its FAO name is Japanese meagre."
   }
  ],
  "sources": [
   {
    "label": "FishBase — Argyrosomus japonicus",
    "url": "https://www.fishbase.se/summary/Argyrosomus-japonicus.html"
   },
   {
    "label": "WWF-SASSI — Dusky kob",
    "url": "https://wwfsassi.co.za/sassi-list/fish?id=56"
   },
   {
    "label": "Conservation Mag — Anglers and scientists fight to save the dusky kob",
    "url": "https://conservationmag.org/en/wildlife/anglers-and-scientists-fight-to-save-the-dusky-kob"
   },
   {
    "label": "Marine Living Resources Act regulations — recreational size and bag limits",
    "url": "https://source.acts.co.za/marine-living-resources-act-1998/r1111_annexure_7__recreational.php"
   }
  ]
 },
 "galjoen": {
  "otherNames": "Black bream or blackfish in KwaZulu-Natal. Long known as Coracinus capensis.",
  "family": "Dichistiidae, the galjoens — a family of just two species.",
  "nativeRange": "Southern Africa only: from southern Angola and Namibia around the Cape to about Durban.",
  "habitat": "Inshore reefs, rocky shores and the sandy gullies between them, usually in rough, turbulent water at shallow depths, often right at the shoreline. Most galjoen stay in one home area; in a study of some 25,000 tagged fish, about 95% stayed local.",
  "temp": "Cool temperate water. In captivity they spawned at 16–21°C (61–70°F).",
  "record": "No IGFA all-tackle category. FishBase lists a maximum of 80 cm and 6.5 kg; most fish are far smaller.",
  "lifespan": "Poorly documented; FishBase gives no maximum age.",
  "diet": "Red bait (sea squirts), small black mussels, white mussels, barnacles, and red and coralline seaweeds.",
  "spawning": "October to March, peaking in December, in deeper water; the closed season from mid-October covers most of it. Females mature at about 34 cm and males at about 31 cm, and a female spawns many times a season.",
  "mouth": "Small, with thick lips and strong, curved incisors at the front for crushing mussels and barnacles.",
  "lookalikes": "Banded galjoen (Dichistius multifasciatus), further east, has many bold dark bars. Blacktail has a black spot at the base of the tail; zebra has bold vertical stripes. A plain black or silver-bronze galjoen with a deep body and thick lips is the national fish.",
  "eating": "A traditional Cape fish, grilled with lemon and butter and served with fresh bread and apricot jam — but it is a no-sale species on the SASSI red list, so the only way to eat one is to catch it yourself, with a permit.",
  "status": "Near Threatened in South Africa’s 2018 National Biodiversity Assessment; stocks are depleted and held up largely by no-take marine protected areas.",
  "typicalCm": [
   30,
   50
  ],
  "maxCm": 80,
  "faqs": [
   {
    "q": "What is South Africa’s national fish?",
    "a": "The galjoen (Dichistius capensis). Margaret Smith, wife of the ichthyologist J. L. B. Smith, suggested it as a marine counterpart to the springbok. It lives only on the coasts of southern Africa, from Angola to about Durban."
   },
   {
    "q": "When is galjoen closed season?",
    "a": "From 15 October to the last day of February. Outside it, recreational anglers with a permit may keep two a day at 35 cm or more. Galjoen may not be sold."
   },
   {
    "q": "Why do galjoen change colour?",
    "a": "For camouflage. A galjoen living among dark rocks is almost black; one over sand is silver-bronze, and it can switch almost instantly. The scientific name Coracinus, used for many years, means raven-black."
   },
   {
    "q": "What is the best bait for galjoen?",
    "a": "Red bait or mussel, the food it eats in the wild, on a small strong hook in the white water right against the rocks."
   }
  ],
  "sources": [
   {
    "label": "FishBase — Dichistius capensis",
    "url": "https://www.fishbase.se/summary/Dichistius-capensis.html"
   },
   {
    "label": "WWF-SASSI — Galjoen",
    "url": "https://wwfsassi.co.za/sassi-list/fish?id=144"
   },
   {
    "label": "Marine Living Resources Act regulations — closed seasons",
    "url": "https://source.acts.co.za/marine-living-resources-act-1998/r1111_annexure_2__closed_season.php"
   },
   {
    "label": "University of Cape Town thesis — Suitability of the galjoen for mariculture in South Africa",
    "url": "https://open.uct.ac.za/items/cd8ef20a-ac64-40c7-aa97-8235fddd790d"
   }
  ]
 },
 "snoek": {
  "otherNames": "Barracouta in Australia and New Zealand; zeesnoek to early Dutch settlers (snoek is Dutch for pike). Sometimes listed as Leionura atun. Not the snook of Florida.",
  "family": "Gempylidae, the snake mackerels.",
  "nativeRange": "Cool waters of the Southern Hemisphere: southern Africa from Angola to Algoa Bay (mostly between the Kunene River and Cape Agulhas), Tristan da Cunha, southern Australia, New Zealand, Chile, Peru and Argentina.",
  "habitat": "Continental shelves and around islands, usually 100–500 m deep, in schools near the bottom or in midwater; sometimes at the surface at night. In the Cape it comes inshore after pilchards and anchovies.",
  "temp": "Cool: it prefers 13–18°C (55–64°F).",
  "record": "IGFA all-tackle world record: 7.67 kg (16 lb 15 oz), Bruce Jackson, Río Palvitad, Chile, 28 March 2017.",
  "lifespan": "Up to about 10 years (FishBase); Australian fish live about 11.",
  "diet": "Pilchards (sardines) and anchovies above all, plus hake, squid and krill; young snoek eat lanternfish, krill and amphipods.",
  "spawning": "Off South Africa, in winter and spring (May to November, peaking June to October), along the shelf break of the western Agulhas Bank and the west coast at 150–400 m. The larvae drift to nursery grounds north of Cape Columbine. Half are mature at 3 years and about 73 cm.",
  "mouth": "Several pairs of fang-like teeth in the upper jaw, with more on the roof of the mouth. They cut deep.",
  "lookalikes": "Barracuda are rounder, with two widely separated dorsal fins and no finlets. The snoek’s long, spiny first dorsal fin with a black membrane, and the finlets behind its fins, are the tells.",
  "eating": "Oily, rich and bony (the bones are big and easy to lift out after cooking). A Cape classic braaied with an apricot-jam glaze, or smoked.",
  "status": "Not evaluated by the IUCN. Inshore handline catches in the Cape have fallen since the late 1970s, while trawl catches have held steadier.",
  "typicalCm": [
   60,
   90
  ],
  "maxCm": 150,
  "shape": "torpedo",
  "faqs": [
   {
    "q": "Is snoek the same fish as snook?",
    "a": "No. Snoek (Thyrsites atun) is a cold-water snake mackerel of the Southern Hemisphere, prized in the Cape. Snook (Centropomus) is a warm-water inshore fish of Florida and the Caribbean. The names come from the Dutch word snoek, for pike."
   },
   {
    "q": "When is snoek season in the Cape?",
    "a": "Snoek move through the southern Benguela from about April to September, and the traditional inshore ‘snoek run’ on the west coast peaked from May to July. That inshore run has become less reliable, and boats find snoek at other times of year."
   },
   {
    "q": "How big do snoek get?",
    "a": "Most are 60–90 cm (24–35 in); the species reaches about 1.5 m (59 in) and 6–7 kg. The IGFA world record is 7.67 kg (16 lb 15 oz), from Chile in 2017."
   },
   {
    "q": "What are the rules for snoek in South Africa?",
    "a": "Recreational anglers may keep ten snoek a day, each at least 60 cm long. Check the current regulations before you fish."
   }
  ],
  "sources": [
   {
    "label": "FishBase — Thyrsites atun",
    "url": "https://www.fishbase.se/summary/Thyrsites-atun.html"
   },
   {
    "label": "University of Cape Town — Snoek Thyrsites atun in South African waters: biology, distribution and fishery",
    "url": "https://open.uct.ac.za/items/82ccd5c9-a19d-4777-a815-9ddcda26935c/full"
   },
   {
    "label": "Fishes of Australia — Barracouta, Thyrsites atun",
    "url": "https://fishesofaustralia.net.au/home/species/711"
   },
   {
    "label": "Marine Living Resources Act regulations — recreational size and bag limits",
    "url": "https://source.acts.co.za/marine-living-resources-act-1998/r1111_annexure_7__recreational.php"
   }
  ]
 },
 "yellowtail-amberjack": {
  "otherNames": "Yellowtail or Cape yellowtail in South Africa; yellowtail kingfish or kingfish in Australia and New Zealand; hiramasa in sushi bars; southern yellowtail to the IGFA.",
  "family": "Carangidae, the jacks and trevallies.",
  "nativeRange": "Southern Hemisphere waters — South Africa, Australia, New Zealand, Chile and the islands between. Similar fish off California and Japan are now usually treated as separate species.",
  "habitat": "Rocky reefs, pinnacles, kelp edges and offshore islands, from the surface to about 50 m and sometimes far deeper; large shoals of young fish range offshore. South African fish move up the east coast with the winter sardine run.",
  "temp": "Prefers warmer water, about 18–24°C (64–75°F), though it is often caught cooler.",
  "record": "IGFA all-tackle world record (southern yellowtail): 52 kg (114 lb 10 oz) — a tie between Mike Godfrey, Tauranga, New Zealand (1984), and David Lugton, White Island, New Zealand (1987).",
  "lifespan": "A South African study aged males to 7 years and females to 8; FishBase gives 12 years worldwide.",
  "diet": "Small shoaling fish such as pilchards above all, plus squid and crustaceans.",
  "spawning": "In South Africa, a long season from November to February, peaking in December and January. Females mature at about 55 cm fork length and males about 58 cm, at roughly 2–4 years old.",
  "young": "Juveniles are yellow with black bands, often found far offshore under floating weed; by about 30 cm they take on adult colours.",
  "lookalikes": "Greater amberjack is deeper-bodied with a darker band through the eye and a duskier tail. Giant trevally and other kingfish have hard scutes on the tail base; the yellowtail does not.",
  "eating": "Excellent fresh, grilled or raw. Line-caught South African yellowtail is a WWF-SASSI green-list choice.",
  "status": "Least Concern on the IUCN Red List; the second most commonly caught species in South Africa’s linefishery.",
  "typicalCm": [
   60,
   100
  ],
  "maxCm": 250,
  "shape": "torpedo",
  "faqs": [
   {
    "q": "When is yellowtail season in Cape Town?",
    "a": "Summer into autumn is the main Cape season, around Cape Point, False Bay and the Agulhas Bank. In winter, many move up the east coast with the sardine run, and KwaZulu-Natal gets its turn."
   },
   {
    "q": "How big do yellowtail get?",
    "a": "Most South African fish are 60–100 cm (24–39 in). The species can reach well over 1.5 m, and the IGFA world record is 52 kg (114 lb 10 oz), shared by two fish from New Zealand."
   },
   {
    "q": "Is yellowtail sustainable to eat?",
    "a": "Line-caught South African yellowtail is on WWF-SASSI’s green list — fast-growing, quick to mature and fertile. Fish from gillnets and beach seines are ‘think twice’ because of bycatch."
   },
   {
    "q": "What is the bag limit for yellowtail in South Africa?",
    "a": "Ten a day with no minimum size. Letting fish under about 55–60 cm go gives them a chance to spawn first."
   }
  ],
  "sources": [
   {
    "label": "FishBase — Seriola lalandi",
    "url": "https://www.fishbase.se/summary/Seriola-lalandi.html"
   },
   {
    "label": "WWF-SASSI — Yellowtail",
    "url": "https://wwfsassi.co.za/sassi-list/fish?id=113"
   },
   {
    "label": "University of Cape Town — The diet, reproductive biology, age and growth of yellowtail in South Africa",
    "url": "https://open.uct.ac.za/items/6ff7e1b7-cd7b-45f4-831e-f7d95f5c48c5"
   },
   {
    "label": "Two Oceans Aquarium — Giant yellowtail (Cape yellowtail)",
    "url": "https://www.aquarium.co.za/animals/giant-yellowtail-cape-yellowtail"
   }
  ]
 },
 "giant-trevally": {
  "otherNames": "GT; giant kingfish in South Africa; ulua in Hawaii; also lowly or barrier trevally.",
  "family": "Carangidae, the jacks and trevallies. The largest of the Caranx jacks.",
  "nativeRange": "The tropical Indo-Pacific: from the Red Sea and the whole East African coast to South Africa, across the Indian Ocean islands — the Seychelles, Madagascar, the Maldives — and east to Japan, Australia and Hawaii.",
  "habitat": "Young fish in estuaries, shallow bays and lagoons, often in murky water; adults on reefs, reef channels, atolls and offshore banks, alone or in pairs. Off South Africa it hunts mostly by day, especially at dawn and dusk.",
  "temp": "Tropical: FishBase gives 26–29°C (79–84°F).",
  "record": "IGFA all-tackle world record: 72.8 kg (160 lb 7 oz), Keiki Hamasaki, Tokara, Kagoshima, Japan, 22 May 2006.",
  "lifespan": "Growth studies suggest a 1 m fish is about 8 years old and a 1.7 m giant about 24.",
  "diet": "Mostly fish, including eels, plus squid, octopus, mantis shrimp, crabs and lobsters.",
  "spawning": "In southern Africa from July to March, peaking November to March, in schools gathering over reefs and banks at set phases of the moon. It matures at about 60 cm and three years old.",
  "young": "Larvae are silver with six dark bars. Juveniles live in estuaries, even in nearly fresh water, before moving out to reefs.",
  "mouth": "A big, strong mouth with small teeth; the steep, blunt forehead is the giveaway.",
  "lookalikes": "Bluefin trevally is smaller, with electric-blue fins and dark spots. Bigeye and brassy trevally are smaller, and the bigeye has the bigger eye. A GT’s steep head, sheer bulk and naked breast with a small patch of scales in front of the belly fins set it apart.",
  "eating": "Rated anything from poor to excellent, but big fish can carry ciguatera toxin, so large GTs are best released.",
  "status": "Least Concern on the IUCN Red List.",
  "typicalCm": [
   60,
   120
  ],
  "maxCm": 170,
  "faqs": [
   {
    "q": "Where can you catch a giant trevally in Africa?",
    "a": "Along the whole east coast, from the Red Sea through Kenya, Tanzania and Mozambique to KwaZulu-Natal, and above all around the Indian Ocean islands. The remote outer atolls of the Seychelles are among the most famous places in the world to catch one on fly."
   },
   {
    "q": "How big do giant trevally get?",
    "a": "Up to 1.7 m (5 ft 7 in) and about 80 kg (176 lb). The IGFA all-tackle world record is 72.8 kg (160 lb 7 oz), from Japan in 2006."
   },
   {
    "q": "Can you eat giant trevally?",
    "a": "Small ones, carefully. Large GTs are a known source of ciguatera, a fish poisoning from reef toxins that builds up the food chain. Most anglers release them, and catch-and-release is increasingly the norm."
   }
  ],
  "sources": [
   {
    "label": "FishBase — Caranx ignobilis",
    "url": "https://www.fishbase.se/summary/Caranx-ignobilis.html"
   },
   {
    "label": "Wikipedia — Giant trevally",
    "url": "https://en.wikipedia.org/wiki/Giant_trevally"
   },
   {
    "label": "IGFA — World Records search",
    "url": "https://igfa.org/igfa-world-records-search/"
   }
  ]
 },
 "african-threadfin": {
  "otherNames": "Giant African threadfin; threadfin.",
  "family": "Polynemidae, the threadfins.",
  "nativeRange": "The tropical eastern Atlantic off West Africa, from Senegal to Angola, with a single record from Mauritania.",
  "habitat": "Shallow coastal water over sand and mud, surf beaches and estuaries; occasionally brackish and even fresh water. The very largest fish are found only in the sea.",
  "temp": "Tropical coastal water, roughly 24–29°C (75–84°F) along the Gulf of Guinea.",
  "record": "IGFA all-tackle world record: 55.4 kg (122 lb 2 oz), Stephan Bellingan, Barra do Kwanza, Angola, 20 July 2015.",
  "lifespan": "Not well studied.",
  "diet": "Crustaceans and fish.",
  "spawning": "Little is published on its spawning.",
  "mouth": "Set low under a pointed, semi-transparent snout.",
  "lookalikes": "Other threadfins are much smaller. The four long white filaments under a bright yellow pectoral fin, on a big silver fish, mark this one.",
  "eating": "Fair to good eating, and an important commercial fish along the West African coast.",
  "status": "Least Concern on the IUCN Red List.",
  "typicalCm": [
   80,
   150
  ],
  "maxCm": 200,
  "faqs": [
   {
    "q": "What is a threadfin?",
    "a": "A fish with long, free rays — threads — under its pectoral fins, which it uses to feel for prey on the bottom. The giant African threadfin has four of them, white, beneath a bright yellow fin."
   },
   {
    "q": "How big do giant African threadfin get?",
    "a": "Up to about 2 m (6 ft 7 in) and 75 kg (165 lb), with 1.5 m common. The IGFA world record is 55.4 kg (122 lb 2 oz), from the mouth of the Kwanza River in Angola, in 2015."
   },
   {
    "q": "Where do giant African threadfin live?",
    "a": "Along the West African coast from Senegal to Angola, in surf, shallow sandy and muddy bays, and river mouths. They enter estuaries and occasionally fresh water, but the biggest stay at sea."
   }
  ],
  "sources": [
   {
    "label": "FishBase — Polydactylus quadrifilis",
    "url": "https://www.fishbase.se/summary/Polydactylus-quadrifilis.html"
   },
   {
    "label": "Wikipedia — Giant African threadfin",
    "url": "https://en.wikipedia.org/wiki/Giant_African_threadfin"
   },
   {
    "label": "IGFA — World Records search",
    "url": "https://igfa.org/igfa-world-records-search/"
   }
  ]
 },
 "bluefish": {
  "otherNames": "Elf or shad in South Africa; tailor in Australia; bluefish, blue, chopper and — for young fish — snapper blue in North America. IGFA also lists marine piranha, rock salmon and Hatteras blue.",
  "family": "Pomatomidae — the only living member of its family.",
  "nativeRange": "Warm-temperate and subtropical seas almost worldwide, but absent from the eastern and north-western Pacific. In the eastern Atlantic from Portugal to South Africa, including the Mediterranean and Black Sea, Madeira and the Canaries; in the western Atlantic from Canada and Bermuda to Argentina; along East Africa, Madagascar, southern Oman, south-west India, Australia and New Zealand.",
  "habitat": "Open coastal water over the shelf, most common along surf beaches and rocky headlands in clean, high-energy water; adults also enter estuaries and harbours. From the surface down to about 200 m (650 ft).",
  "temp": "Warm-temperate to subtropical. AquaMaps puts its preferred surface water at about 14–27°C (57–81°F), and FishBase notes that it moves to warmer water in winter and cooler water in summer.",
  "record": "IGFA all-tackle world record: 14.4 kg (31 lb 12 oz), James Hussey, Hatteras, North Carolina, USA, 30 January 1972. The South African angling record is 10.3 kg (22 lb 11 oz).",
  "lifespan": "Up to about 14 years (FishBase). ASMFC gives 12 years for the US Atlantic stock, and South African elf have been aged to 10.",
  "diet": "Fish above all — sardines (pilchards), anchovies, menhaden and other shoaling fish — with squid and crustaceans. Elf under 10 cm eat more crustaceans than fish.",
  "spawning": "A batch spawner. South African elf mature at about one year and 25 cm and spawn over 30–75 m of water off KwaZulu-Natal from September to March, peaking October to December. US fish mature at two and spawn in spring and summer between Massachusetts and Florida. A female sheds 400,000 to 2 million eggs.",
  "young": "In South Africa, young-of-the-year gather in shallow bays less than 20 m deep along the southern Cape coast. Small American bluefish are called snappers.",
  "mouth": "A large mouth with a single row of sharp, flattened, knife-edged teeth of even size in each jaw — enough to cut light line and fingers.",
  "lookalikes": "Leerfish (garrick) has a wavy, S-shaped lateral line and black-tipped fin lobes. Greater amberjack has a gap between its dorsal fins and no spine in the second; mackerels have rows of small finlets before the tail, which the bluefish lacks.",
  "eating": "Good when very fresh. The flesh is oily and spoils quickly, so eat it the day it is caught, or smoke it. Like other large predators it carries some mercury — follow local advice on how often to eat it.",
  "status": "Vulnerable on the IUCN Red List (2014). South Africa’s stock was rated overexploited in its last per-recruit assessment; the US Atlantic stock remains under a rebuilding plan but was assessed in 2025 as not overfished.",
  "typicalCm": [
   30,
   60
  ],
  "maxCm": 130,
  "faqs": [
   {
    "q": "Is elf the same fish as bluefish?",
    "a": "Yes. Elf and shad are South African names for Pomatomus saltatrix — the bluefish of North America and the tailor of Australia — a single species found in warm seas almost worldwide."
   },
   {
    "q": "When is elf season in South Africa?",
    "a": "Elf are closed from 1 October to 30 November. They are summer and autumn fish in the Cape and move up to KwaZulu-Natal for the winter, where they spawn in spring, so the KwaZulu-Natal surf fishes best from about June to September."
   },
   {
    "q": "Do bluefish bite people?",
    "a": "They can. Bluefish are aggressive and have bitten anglers handling them and, rarely, people in the water among feeding schools. Unhook them with long pliers and keep hands away from the mouth."
   },
   {
    "q": "How big do bluefish get?",
    "a": "Most are 30–60 cm (12–24 in). The IGFA world record is 14.4 kg (31 lb 12 oz), caught off Hatteras, North Carolina, in 1972; South Africa’s record elf weighed 10.3 kg."
   }
  ],
  "sources": [
   {
    "label": "FishBase — Pomatomus saltatrix",
    "url": "https://www.fishbase.se/summary/Pomatomus-saltatrix.html"
   },
   {
    "label": "Mann (ed.), Southern African Marine Linefish Species Profiles — ORI Special Publication 9 (2013)",
    "url": "https://www.oritag.org.za/Content/UserContent/documents/Southern_African_Marine_Linefish_Species_Profiles.pdf"
   },
   {
    "label": "WWF-SASSI — Elf",
    "url": "https://wwfsassi.co.za/sassi-list/fish?id=40"
   },
   {
    "label": "Atlantic States Marine Fisheries Commission — Bluefish",
    "url": "https://asmfc.org/species/bluefish"
   },
   {
    "label": "IGFA — World Records search",
    "url": "https://igfa.org/igfa-world-records-search/"
   },
   {
    "label": "Wikipedia — Bluefish",
    "url": "https://en.wikipedia.org/wiki/Bluefish"
   }
  ]
 },
 "white-steenbras": {
  "otherNames": "Pignose grunter; witsteenbras or wit steenbras in Afrikaans.",
  "family": "Sparidae, the seabreams and porgies.",
  "nativeRange": "Endemic to South Africa, from the Orange River mouth to KwaZulu-Natal. The main stock lives along the Western and Eastern Cape coasts; it is rare in KwaZulu-Natal and scarce on the Northern Cape coast.",
  "habitat": "Sandy and mixed sand-and-rock shores from the surf zone to about 25 m (80 ft). Juveniles depend on estuaries — mainly from the Berg to the Eastern Cape — for their first two or three years, then live in the surf zone before ranging more widely as adults.",
  "temp": "Warm-temperate coastal water. AquaMaps puts its preferred surface water at about 14–24°C (57–75°F).",
  "record": "No IGFA all-tackle category. The South African shore-angling record is 26.3 kg (58 lb), kept by the South African Shore Angling Association; the longest fish measured was 137.6 cm.",
  "lifespan": "25–30 years.",
  "diet": "Worms, crabs and other crustaceans, sand-dwelling clams, mysid shrimps and sea urchins. It blows a strong jet of water into a burrow to flush out the animal inside.",
  "spawning": "Late winter, July and August, close inshore off a few river mouths on the former Transkei coast of the Eastern Cape. The larvae drift south and west and enter estuaries at 18–50 mm. Fish mature at about six years and 65 cm.",
  "young": "Young fish live in the lower, sandy reaches of estuaries, feed on the banks at night and keep to a small home range.",
  "mouth": "A small mouth under a pointed snout, with tiny teeth at the front of the jaws and crushing molars further back.",
  "lookalikes": "Its relatives the West Coast steenbras (Lithognathus aureti), of Namibia and the Northern Cape, and the sand steenbras (Lithognathus mormyrus) are easily confused with it. Spotted grunter shares its estuaries and its prawn-blowing habit but is covered in small brown spots.",
  "eating": "A no-sale species in South Africa: only recreational anglers with a permit may take it, and WWF-SASSI asks them to release it.",
  "status": "Endangered on the IUCN Red List (2024). The stock collapsed after decades of beach-seine, purse-seine and shore-angling catches; commercial catches were banned in 2001, and numbers have since risen inside protected areas such as De Hoop.",
  "typicalCm": [
   40,
   80
  ],
  "maxCm": 138,
  "faqs": [
   {
    "q": "What is the bag limit for white steenbras?",
    "a": "One fish per person a day, at least 60 cm long, on a DFFE recreational permit. It is a no-sale species. Because most white steenbras only mature at about 65 cm, WWF-SASSI asks anglers to tag and release every one."
   },
   {
    "q": "Why is it called the pignose grunter?",
    "a": "For its pointed nose and its habit of rooting on sandbanks: it blows jets of water into the burrows of prawns and worms to flush them out, often in water barely deep enough to cover it."
   },
   {
    "q": "Is the white steenbras endangered?",
    "a": "Yes. It is listed as Endangered by the IUCN. Shore-angler catch rates fell by about 90% between the 1970s and the 1990s, and the stock was assessed as collapsed. It lives 25–30 years and needs about six years to breed, so recovery is slow."
   },
   {
    "q": "Where do white steenbras breed?",
    "a": "Off a handful of river mouths on the former Transkei coast in July and August. The young drift with the currents and settle in estuaries all the way west to the Berg River, where they live for their first two or three years."
   }
  ],
  "sources": [
   {
    "label": "FishBase — Lithognathus lithognathus",
    "url": "https://www.fishbase.se/summary/Lithognathus-lithognathus.html"
   },
   {
    "label": "Mann (ed.), Southern African Marine Linefish Species Profiles — ORI Special Publication 9 (2013)",
    "url": "https://www.oritag.org.za/Content/UserContent/documents/Southern_African_Marine_Linefish_Species_Profiles.pdf"
   },
   {
    "label": "WWF-SASSI — White steenbras",
    "url": "https://wwfsassi.co.za/sassi-list/fish?id=103"
   },
   {
    "label": "SANParks — Protecting South Africa’s endangered white steenbras: lessons from two estuaries (2024)",
    "url": "https://www.sanparks.org/conservation/scientific-services/stories/protecting-south-africas-endangered-white-steenbras-lessons-from-two-estuaries"
   },
   {
    "label": "Two Oceans Aquarium — White steenbras",
    "url": "https://www.aquarium.co.za/animals/white-steenbras"
   },
   {
    "label": "FOSAF — Saltwater fly-fishing report, Garden Route",
    "url": "https://www.fosaf.org.za/report-garden-route.php"
   }
  ]
 },
 "hottentot-seabream": {
  "otherNames": "Hottentot, hotnot or hotnotvis; kaapse galjoen. WWF-SASSI now lists it as Cape bream.",
  "family": "Sparidae, the seabreams and porgies.",
  "nativeRange": "Endemic to south-western Africa, from Angola to Port Alfred; most abundant between Port Nolloth and Cape Agulhas.",
  "habitat": "Rocky reefs and kelp beds from the shallows to about 55 m (180 ft); juveniles stay in shallow kelp. A resident that forms small shoals and keeps to its home reef.",
  "temp": "Cool temperate water. Reef Life Survey has recorded it in water of 14.8–19.3°C (59–67°F).",
  "record": "IGFA all-tackle world record: 1.7 kg (3 lb 12 oz), Byron Ashington, Cape Point, South Africa, 28 May 1989.",
  "lifespan": "Up to 21 years.",
  "diet": "Omnivorous: mainly seaweed, with amphipods, crabs, shrimps, worms, molluscs, sea urchins, red bait and the odd small fish.",
  "spawning": "Throughout the year, with peaks in winter and summer, across its whole range. Fish mature at four to five years and about 20–22 cm.",
  "mouth": "Small, with rows of incisor-like teeth for cropping weed and molars for cracking shells.",
  "lookalikes": "Blue hottentot (Pachymetopon aeneum) has a cobalt-blue head and a blue-streaked, bronze-yellow body. Bronze bream (Pachymetopon grande, ‘bruin hottentot’) is another close cousin.",
  "eating": "Good eating and a WWF-SASSI green-list (best choice) fish when line-caught in South Africa.",
  "status": "Least Concern on the IUCN Red List. The West Coast stock was last assessed (2011) at about 55% of its unfished level — optimally exploited.",
  "typicalCm": [
   22,
   35
  ],
  "maxCm": 54,
  "faqs": [
   {
    "q": "What is the bag limit for hottentot?",
    "a": "Ten a day at 22 cm or more, on a DFFE recreational permit, within South Africa’s overall limit of ten fish per person per day."
   },
   {
    "q": "Where do you catch hottentot?",
    "a": "Over rocky reef and kelp on the Cape west coast and around the Peninsula — from rock ledges, breakwaters and harbour walls, or on inshore reefs from a small boat. It is most common between Port Nolloth and Cape Agulhas."
   },
   {
    "q": "What is the best bait for hottentot?",
    "a": "Red bait, mussel, prawn or a small strip of squid on a small hook, fished on the bottom beside the kelp. It is an omnivore that eats more seaweed than anything else, so it bites gently."
   }
  ],
  "sources": [
   {
    "label": "FishBase — Pachymetopon blochii",
    "url": "https://www.fishbase.se/summary/Pachymetopon-blochii.html"
   },
   {
    "label": "Mann (ed.), Southern African Marine Linefish Species Profiles — ORI Special Publication 9 (2013)",
    "url": "https://www.oritag.org.za/Content/UserContent/documents/Southern_African_Marine_Linefish_Species_Profiles.pdf"
   },
   {
    "label": "WWF-SASSI — Cape bream (hottentot)",
    "url": "https://wwfsassi.co.za/sassi-list/fish?id=50"
   },
   {
    "label": "Reef Life Survey — Pachymetopon blochii",
    "url": "https://reeflifesurvey.com/species/pachymetopon-blochii/"
   },
   {
    "label": "IGFA — World Records search",
    "url": "https://igfa.org/igfa-world-records-search/"
   }
  ]
 },
 "white-musselcracker": {
  "otherNames": "Brusher, cracker, silver steenbras, beenbek, sandbloue, biskop or wit mosselkraker.",
  "family": "Sparidae, the seabreams and porgies — the only species in its genus.",
  "nativeRange": "Endemic to South Africa, from Cape Point to the Thukela River in KwaZulu-Natal; the main stock lies between southern KwaZulu-Natal and False Bay. Old records from Djibouti and Mozambique are doubtful.",
  "habitat": "High-profile inshore reefs down to about 20 m (65 ft). Juveniles live in rock pools, gullies and shallow reefs.",
  "temp": "Warm-temperate to subtropical coastal water. AquaMaps puts its preferred surface water at about 14–24°C (58–75°F).",
  "record": "No IGFA all-tackle category. The South African spearfishing record is 22.2 kg (49 lb), from 1974; the largest fish measured in research was 102.9 cm fork length.",
  "lifespan": "Up to 31 years.",
  "diet": "Snails, sea urchins, crabs and other crustaceans, bristle worms and green seaweed.",
  "spawning": "August to January on the south-east Cape coast, in spawning aggregations; part of the adult stock migrates east to the Transkei and southern KwaZulu-Natal to spawn. Fish mature at about five and a half years and 35 cm fork length.",
  "young": "Small juveniles live in intertidal rock pools and shallow gullies and stay close to home until they are about 55 cm fork length.",
  "mouth": "Massive, strongly built jaws with four incisor-like teeth at the front of each, the middle two enlarged and curved.",
  "lookalikes": "Black musselcracker (poenskop, Cymatoceps nasutus) is darker, and big adults grow a large fleshy ‘nose’; it is a commercial species with a one-a-day limit at 50 cm.",
  "eating": "A no-sale species in South Africa: only permit-holding recreational anglers may take it.",
  "status": "Near Threatened on the IUCN Red List (2024). Stocks are estimated to have fallen to about 20% of historical levels.",
  "typicalCm": [
   40,
   80
  ],
  "maxCm": 120,
  "faqs": [
   {
    "q": "What is the bag limit for white musselcracker?",
    "a": "Two a day at 60 cm or more, on a DFFE recreational permit. It is a no-sale species."
   },
   {
    "q": "When is the best time for white musselcracker?",
    "a": "In KwaZulu-Natal, winter — catch rates peak in June and July. On the south-east Cape coast, spring and summer, from about August to December, when the fish gather to spawn."
   },
   {
    "q": "How old do white musselcrackers get?",
    "a": "Up to 31 years. They take about five and a half years to mature, which, with their habit of gathering to spawn, makes them easy to over-fish."
   }
  ],
  "sources": [
   {
    "label": "FishBase — Sparodon durbanensis",
    "url": "https://www.fishbase.se/summary/Sparodon-durbanensis.html"
   },
   {
    "label": "Mann (ed.), Southern African Marine Linefish Species Profiles — ORI Special Publication 9 (2013)",
    "url": "https://www.oritag.org.za/Content/UserContent/documents/Southern_African_Marine_Linefish_Species_Profiles.pdf"
   },
   {
    "label": "WWF-SASSI — White musselcracker",
    "url": "https://wwfsassi.co.za/sassi-list/fish?id=69"
   },
   {
    "label": "Wikipedia — Sparodon",
    "url": "https://en.wikipedia.org/wiki/Sparodon"
   }
  ]
 },
 "leerfish": {
  "otherNames": "Garrick, leervis or leerie in South Africa; liche in French; leerfish is its FAO and IGFA name.",
  "family": "Carangidae, the jacks and pompanos.",
  "nativeRange": "The eastern Atlantic from the southern Bay of Biscay to South Africa, including the Mediterranean and the western Black Sea, and up the South African east coast to about Maputo. Scarce between the Kunene mouth and Table Bay; the Namibian–Angolan stock is separate from South Africa’s.",
  "habitat": "Near-surface coastal water from the surf zone to about 50 m (165 ft), seldom more than 500 m from shore; it enters estuaries and occasionally the lower reaches of rivers. Eastern and Western Cape estuaries are important nurseries.",
  "temp": "Warm-temperate to subtropical. AquaMaps puts its preferred surface water at about 18–28°C (64–82°F).",
  "record": "IGFA all-tackle world record: 27.8 kg (61 lb 4 oz), Jose Oriol Ribalta, L’Ampolla, Spain, 30 April 2000. The South African angling record is heavier, at 32.2 kg (71 lb).",
  "lifespan": "Up to about 10 years in South African waters.",
  "diet": "Fish — mullet above all, with sardines and other shoaling fish and squid. Young fish also eat crustaceans.",
  "spawning": "South African fish migrate to KwaZulu-Natal in winter and spawn there from September to November, probably north of Durban; the eggs and larvae drift south. Fish mature at about four years and 80 cm fork length (85 cm for females).",
  "young": "Juveniles up to about 12 cm carry brownish-black bars and are common in Cape estuaries and coastal shallows.",
  "mouth": "A large mouth with a slender upper jaw that reaches below or beyond the back of the eye.",
  "lookalikes": "Wave garrick (largespot pompano, Trachinotus botla) is bluish-black above with one to five large spots along the lateral line. Bluefish (elf) has a single row of sharp, knife-edged teeth; the garrick’s wavy lateral line is the surest tell.",
  "eating": "Eaten around the Mediterranean, where it supports commercial fisheries. In South Africa it is a no-sale species, and WWF-SASSI asks anglers to release it.",
  "status": "Least Concern on the IUCN Red List globally, but listed as Vulnerable in South Africa’s 2018 National Biodiversity Assessment; the South African adult stock was assessed in 2008 as collapsed.",
  "typicalCm": [
   60,
   110
  ],
  "maxCm": 180,
  "faqs": [
   {
    "q": "Is a garrick the same as a leerfish?",
    "a": "Yes. Garrick and leervis are South African names for Lichia amia, the leerfish of Europe — one species found from the Bay of Biscay and the Mediterranean down the West African coast to South Africa."
   },
   {
    "q": "When are garrick in the Cape estuaries?",
    "a": "Mostly in summer. Adults migrate to KwaZulu-Natal for the winter to spawn, then return to the Cape, where they hunt mullet at estuary mouths such as those of the Garden Route."
   },
   {
    "q": "What is the size limit for garrick?",
    "a": "In South Africa, 70 cm, with two a day on a DFFE recreational permit, and the fish may not be sold. Females mature at about 85 cm, so releasing fish under that size helps the collapsed stock rebuild."
   }
  ],
  "sources": [
   {
    "label": "FishBase — Lichia amia",
    "url": "https://www.fishbase.se/summary/Lichia-amia.html"
   },
   {
    "label": "Mann (ed.), Southern African Marine Linefish Species Profiles — ORI Special Publication 9 (2013)",
    "url": "https://www.oritag.org.za/Content/UserContent/documents/Southern_African_Marine_Linefish_Species_Profiles.pdf"
   },
   {
    "label": "WWF-SASSI — Garrick",
    "url": "https://wwfsassi.co.za/sassi-list/fish?id=42"
   },
   {
    "label": "Mr Goodfish — Leerfish",
    "url": "https://www.mrgoodfish.com/en/seafood/leerfish"
   },
   {
    "label": "IGFA — World Records search",
    "url": "https://igfa.org/igfa-world-records-search/"
   },
   {
    "label": "FOSAF — Saltwater fly-fishing report, Garden Route",
    "url": "https://www.fosaf.org.za/report-garden-route.php"
   }
  ]
 },
 "spotted-grunter": {
  "otherNames": "Spotty, tiger, knorhaan, spikkel knorder or inkolokolo in South Africa; smallspotted grunter.",
  "family": "Haemulidae, the grunts.",
  "nativeRange": "The western Indian Ocean: from the Gulf of Aden down the East African coast to Cape Point and the south-western Cape, Madagascar and the Seychelles, and along the Asian coast from Yemen and the Persian Gulf to north-west India.",
  "habitat": "Estuaries and shallow coastal water over soft sand and mud, down to about 50 m (160 ft). It tolerates fresh water and adults sometimes move up to the river–estuary boundary.",
  "temp": "Warm-temperate to tropical. AquaMaps puts its preferred surface water at about 18–28°C (64–82°F).",
  "record": "IGFA all-tackle world record: 2.92 kg (6 lb 7 oz), Riyaz Hussain, Durban, South Africa, 6 October 2024. The South African angling record is far heavier: 9.5 kg (21 lb), from Durban in 1949.",
  "lifespan": "About 15 years, and up to 19 in KwaZulu-Natal.",
  "diet": "Burrowing animals — sand and mud prawns, pencil bait and other bivalves, worms and amphipods — which it blows out of the mud with a jet of water.",
  "spawning": "At sea near estuary mouths and in harbours, in KwaZulu-Natal from about August to December; ripe fish have also been found in the Breede estuary in summer. Males mature at about two and a half years, females at three.",
  "young": "Young fish settle in estuaries, which serve as nurseries, and have no spots at first.",
  "mouth": "Small, with moderately thick lips, and two pores and a central pit on the chin.",
  "lookalikes": "Javelin grunter (Pomadasys kaakan) of KwaZulu-Natal and Mozambique is golden-green above as an adult, and its young show faint vertical bars of small spots rather than a scatter of spots. White steenbras feeds the same way but is plain silver.",
  "eating": "Good eating, but a no-sale species in South Africa and WWF-SASSI asks anglers to release it.",
  "status": "Least Concern on the IUCN Red List (2018), but listed as Vulnerable in South Africa’s 2018 National Biodiversity Assessment; KwaZulu-Natal’s stock was rated overexploited.",
  "typicalCm": [
   35,
   60
  ],
  "maxCm": 91,
  "faqs": [
   {
    "q": "What is the bag limit for spotted grunter?",
    "a": "Five a day at 40 cm or more, on a DFFE recreational permit. It may not be sold, and spearfishing is banned in all South African estuaries."
   },
   {
    "q": "Where is the best spotted grunter fishing?",
    "a": "In the estuaries of the Eastern Cape and KwaZulu-Natal — the Kromme, Swartkops, Kowie and Great Fish, Durban harbour, St Lucia and Kosi Bay — and in the Western Cape the Breede and the Garden Route estuaries, best from spring to autumn."
   },
   {
    "q": "Do spotted grunter leave their estuary?",
    "a": "Rarely. Tagging shows that 95% are recaptured within 3.5 km of where they were tagged. They go to sea to spawn and can be flushed out by floods and storms, but most live in one estuary."
   }
  ],
  "sources": [
   {
    "label": "FishBase — Pomadasys commersonnii",
    "url": "https://www.fishbase.se/summary/Pomadasys-commersonnii.html"
   },
   {
    "label": "Mann (ed.), Southern African Marine Linefish Species Profiles — ORI Special Publication 9 (2013)",
    "url": "https://www.oritag.org.za/Content/UserContent/documents/Southern_African_Marine_Linefish_Species_Profiles.pdf"
   },
   {
    "label": "WWF-SASSI — Spotted grunter",
    "url": "https://wwfsassi.co.za/sassi-list/fish?id=44"
   },
   {
    "label": "Wikipedia — Pomadasys commersonnii",
    "url": "https://en.wikipedia.org/wiki/Pomadasys_commersonnii"
   },
   {
    "label": "IGFA — World Records search",
    "url": "https://igfa.org/igfa-world-records-search/"
   },
   {
    "label": "FOSAF — Saltwater fly-fishing report, Garden Route",
    "url": "https://www.fosaf.org.za/report-garden-route.php"
   }
  ]
 },
 "white-seabream": {
  "otherNames": "Sargo or sar in the Mediterranean; blacktail, dassie or kolstert in South Africa, where WWF-SASSI lists it as Diplodus sargus capensis. FishBase and ORI now treat the southern African fish as a separate species, Diplodus capensis.",
  "family": "Sparidae, the seabreams and porgies.",
  "nativeRange": "White seabream: the Atlantic from Brittany to Gibraltar, the Mediterranean and the south-western Black Sea. Blacktail: southern Africa in two separate populations — southern Angola and Namibia, and Cape Point east to southern Mozambique — and southern Madagascar.",
  "habitat": "Rocky coasts and the surf zone beside them, usually shallower than 50 m (165 ft); Mediterranean fish also use seagrass beds. Young blacktail live in rock pools, gullies, estuary mouths and the surf of sandy beaches.",
  "temp": "Warm-temperate. AquaMaps puts the Mediterranean fish’s preferred surface water at about 17–23°C (62–73°F) and the Cape blacktail’s at about 16–26°C (60–79°F).",
  "record": "IGFA all-tackle world record (white seabream): 1.87 kg (4 lb 1 oz), Anthony Loddo, Gibraltar Bay, Gibraltar, 28 April 1996. The South African angling record for blacktail is 2.7 kg (6 lb).",
  "lifespan": "Up to 10 years for Mediterranean white seabream; Cape blacktail have been aged to 21.",
  "diet": "Seaweed, sponges, mussels and other shellfish, sea urchins, worms, crabs and amphipods.",
  "spawning": "Mediterranean fish spawn in early spring (March to May in the Gulf of Tunis). Cape blacktail spawn in small groups on inshore reefs — June to September in KwaZulu-Natal, August to March in the Eastern Cape — and mature at about three years. Some fish change sex as they grow.",
  "young": "Young fish show faint vertical bars and shelter in rock pools, gullies and estuary mouths.",
  "mouth": "Thin lips, with eight incisor-like teeth at the front of each jaw and rows of molars behind.",
  "lookalikes": "In the Cape, zebra (Diplodus hottentotus) carries bold dark crossbars, and galjoen is deeper and heavier with thick lips. In Europe several other Diplodus seabreams share the rocks; the white seabream combines nine alternating bars with the black saddle on the tail stalk and a black spot above the pectoral fin.",
  "eating": "A minor food fish in the Mediterranean, where it is also farmed. In South Africa blacktail is a no-sale species, and its flesh is not highly regarded.",
  "status": "Least Concern on the IUCN Red List, both as white seabream (2011) and as Cape blacktail (2009).",
  "typicalCm": [
   20,
   30
  ],
  "maxCm": 45,
  "faqs": [
   {
    "q": "Is a blacktail the same as a white seabream?",
    "a": "Closely related, and long treated as one species: the South African blacktail was described as a subspecies, Diplodus sargus capensis, and WWF-SASSI still uses that name. FishBase and South African scientists now rank it as a species in its own right, Diplodus capensis."
   },
   {
    "q": "What is the bag limit for blacktail?",
    "a": "Five a day at 20 cm or more, on a DFFE recreational permit. It is a no-sale species."
   },
   {
    "q": "What is the best bait for blacktail or sargo?",
    "a": "Prawn, mussel or red bait on a small, strong hook, fished light in the white water beside the rocks. It feeds in the surf mostly around dawn."
   }
  ],
  "sources": [
   {
    "label": "FishBase — Diplodus sargus",
    "url": "https://www.fishbase.se/summary/Diplodus-sargus.html"
   },
   {
    "label": "FishBase — Diplodus capensis",
    "url": "https://www.fishbase.se/summary/Diplodus-capensis.html"
   },
   {
    "label": "Mann (ed.), Southern African Marine Linefish Species Profiles — ORI Special Publication 9 (2013)",
    "url": "https://www.oritag.org.za/Content/UserContent/documents/Southern_African_Marine_Linefish_Species_Profiles.pdf"
   },
   {
    "label": "WWF-SASSI — Blacktail",
    "url": "https://wwfsassi.co.za/sassi-list/fish?id=33"
   },
   {
    "label": "Wikipedia — Diplodus capensis",
    "url": "https://en.wikipedia.org/wiki/Diplodus_capensis"
   },
   {
    "label": "Arrêté du 26 octobre 2012 — minimum sizes for French recreational sea fishing (consolidated 2018)",
    "url": "https://www.pecheapied-responsable.fr/sites/default/files/2019-05/21_AM26102012.pdf"
   },
   {
    "label": "IGFA — World Records search",
    "url": "https://igfa.org/igfa-world-records-search/"
   }
  ]
 },
 "red-roman": {
  "otherNames": "Roman, rooi roman, roman seabream.",
  "family": "Sparidae, the seabreams and porgies.",
  "nativeRange": "Endemic to southern Africa, from Namibia round the Cape; the stock lies mainly between Cape Point and Port St Johns, and it is very rare on the west coast.",
  "habitat": "High- and low-profile reefs from close inshore down to about 100 m (330 ft); juveniles live on shallow reefs to 30 m. Each fish holds a small home range of 1,000–3,000 m² and shelters in caves during cold upwelling.",
  "temp": "Cool temperate. AquaMaps puts its preferred surface water at about 14–16°C (57–61°F), within a range of roughly 13–25°C.",
  "record": "IGFA all-tackle world record: 2.00 kg (4 lb 7 oz), Graham Doman, Struisbaai, South Africa (listed by IGFA as ‘Stryis Bay’), 1 May 2024. The South African spearfishing record is 4.57 kg (10 lb 1 oz), from 1993.",
  "lifespan": "Up to 17–19 years.",
  "diet": "Feather stars, brittle stars, squid and cuttlefish, crabs and worms; young fish eat worms and small crustaceans.",
  "spawning": "October to January in the Eastern Cape and November to February near Goukamma, after paired courtship well above the reef. Females mature at two and a half to three and a half years and about 18 cm; the biggest become territorial males.",
  "mouth": "A strong mouth with prominent canine teeth at the front.",
  "lookalikes": "Other members of its genus — the dageraad (Chrysoblephus cristiceps) and Englishman (Chrysoblephus anglicus) among them — share its reefs; the roman’s blue bar between the eyes and white saddle on the back set it apart.",
  "eating": "Good eating; WWF-SASSI rates line-caught South African roman orange — think twice.",
  "status": "Least Concern on the IUCN Red List (2024 assessment). Historically overfished, with signs of recovery; marine protected areas have proved very effective for it.",
  "typicalCm": [
   25,
   35
  ],
  "maxCm": 50,
  "faqs": [
   {
    "q": "What is the bag limit for red roman?",
    "a": "Two a day at 30 cm or more, on a DFFE recreational permit. Red roman mature at about 18 cm, well under the legal size, which has helped the stock hold up."
   },
   {
    "q": "Why do red roman change sex?",
    "a": "They are protogynous hermaphrodites: every roman starts adult life as a female, and the largest become territorial males. Heavy fishing removes the big fish, which can skew the sex ratio towards females."
   },
   {
    "q": "Can you fish for red roman around Cape Town?",
    "a": "Yes, with a permit, outside the protected zones. The Table Mountain National Park MPA has six restricted zones — Karbonkelberg, Cape of Good Hope, Paulsberg, Castle Rock, Boulders and St James — where no fishing is allowed (snoek may be fished beyond the 35 m line at Karbonkelberg)."
   }
  ],
  "sources": [
   {
    "label": "FishBase — Chrysoblephus laticeps",
    "url": "https://www.fishbase.se/summary/Chrysoblephus-laticeps.html"
   },
   {
    "label": "Mann (ed.), Southern African Marine Linefish Species Profiles — ORI Special Publication 9 (2013)",
    "url": "https://www.oritag.org.za/Content/UserContent/documents/Southern_African_Marine_Linefish_Species_Profiles.pdf"
   },
   {
    "label": "WWF-SASSI — Red roman",
    "url": "https://wwfsassi.co.za/sassi-list/fish?id=87"
   },
   {
    "label": "Wikipedia — Chrysoblephus laticeps",
    "url": "https://en.wikipedia.org/wiki/Chrysoblephus_laticeps"
   },
   {
    "label": "Wikipedia — Table Mountain National Park Marine Protected Area",
    "url": "https://en.wikipedia.org/wiki/Table_Mountain_National_Park_Marine_Protected_Area"
   },
   {
    "label": "IGFA — World Records search",
    "url": "https://igfa.org/igfa-world-records-search/"
   }
  ]
 },
 "cape-kurper": {
  "otherNames": "Cape kurper. In South Africa ‘kurper’ is also used for tilapias such as the blue kurper (Mozambique tilapia).",
  "family": "Anabantidae, the climbing gouramis.",
  "nativeRange": "The Western and Eastern Cape: coastal rivers from the Coega River near Gqeberha west to the Cape Flats and north to the Verlorenvlei. Introduced into the Olifants system near Clanwilliam.",
  "habitat": "Varied — from rocky, swift streams to slow, weedy water — but it prefers quiet margins with cover among rocks, roots and submerged branches. It can breathe air at the surface.",
  "temp": "Subtropical to warm-temperate fresh water: FishBase gives 18–22°C (64–72°F).",
  "record": "None kept: it is a protected indigenous fish that must be released, not a sport species.",
  "lifespan": "Not well documented.",
  "diet": "Insects and other invertebrates, small fish and crabs.",
  "spawning": "In summer. The male defends a territory on the bottom, courts the female with bubble-blowing and display, then drives her away and guards the eggs and the newly hatched larvae, which stick to the nest site.",
  "young": "Larvae cling to the bottom of the nest under the male’s guard until they can swim.",
  "lookalikes": "Introduced bass and bluegill, whose young can look similar, now share many of its streams. The kurper’s yellow to golden-brown body with dark markings running onto the dorsal and anal fins, and the breeding male’s dark bars and blackened fins, are its marks.",
  "eating": "Not eaten: indigenous fish caught in the Western Cape must be released alive.",
  "status": "Data Deficient on the IUCN Red List (2017). Genetic work suggests it is probably several distinct species, and many populations have declined through habitat loss and predation by introduced bass. The Western Cape holds South Africa’s highest concentration of threatened freshwater fish.",
  "typicalCm": [
   10,
   15
  ],
  "maxCm": 25,
  "faqs": [
   {
    "q": "Can I keep a Cape kurper?",
    "a": "No. In the Western Cape no indigenous freshwater fish may be killed when caught by an angler; all must be released alive. Fishing public inland waters needs a CapeNature freshwater angling licence, and keeping or moving indigenous fish needs a permit."
   },
   {
    "q": "Why is the Cape kurper threatened?",
    "a": "Mainly because introduced predators — largemouth, smallmouth and spotted bass — eat it, and because dams, pollution and water abstraction have damaged its rivers. Climate change adds to the pressure."
   },
   {
    "q": "How does the Cape kurper breed?",
    "a": "In summer the male stakes out a nest on the bottom, turns dark with bold bars, courts a female with bubbles and display, then chases her off and guards the eggs and larvae alone."
   }
  ],
  "sources": [
   {
    "label": "FishBase — Sandelia capensis",
    "url": "https://www.fishbase.se/summary/Sandelia-capensis.html"
   },
   {
    "label": "Wikipedia — Sandelia capensis",
    "url": "https://en.wikipedia.org/wiki/Sandelia_capensis"
   },
   {
    "label": "CapeNature — Code of Practice for Freshwater Recreational Angling in the Western Cape",
    "url": "https://www.capenature.co.za/uploads/files/Code-of-Practice-for-Freshwater-Recreational-Angling-in-the-Western-Cape.pdf"
   },
   {
    "label": "CapeNature — Transport and utilisation of indigenous freshwater fishes in the Western Cape (policy, November 2025)",
    "url": "https://www.capenature.co.za/uploads/files/Transport-and-utilisation-of-indigenous-freshwater-fishes-in-the-WCP-Policy-Nov.-2025.pdf"
   }
  ]
 },
 "common-dentex": {
  "otherNames": "Dentex; IGFA also lists dentice, denton and dente.",
  "family": "Sparidae, the seabreams and porgies.",
  "nativeRange": "The north-eastern Atlantic from the Bay of Biscay to Cape Blanc in Mauritania, the Canaries and Madeira, and the whole Mediterranean into the western Black Sea; commonest south of 40°N. Rare as far north as the British Isles.",
  "habitat": "Hard bottoms — rock and rubble — down to 200 m (650 ft), but usually 15–50 m (50–165 ft). Adults are solitary; young fish school.",
  "temp": "Warm-temperate. AquaMaps puts its preferred surface water at about 16–22°C (61–72°F).",
  "record": "IGFA all-tackle world record: 14.25 kg (31 lb 6 oz), Torsten Wetzel, Los Cristianos, Tenerife, Canary Islands, Spain, 29 January 1999.",
  "lifespan": "Long-lived: fish up to 36 years old have been aged off Corsica.",
  "diet": "Fish, squid, octopus and other molluscs.",
  "spawning": "In spring — March to May in the Mediterranean — when adults gather for two or three weeks in the warmer water near the surface. Both sexes mature at two to four years.",
  "young": "Young fish are greyish with black spots on the back and upper flanks, and turn pink as they grow.",
  "mouth": "Rows of canine-like teeth, the outer row largest and the four to six at the front of each jaw strongly enlarged.",
  "lookalikes": "Other dentex, such as the pink dentex (Dentex gibbosus), are easily confused with it. The common dentex’s tells are its rows of strong canine teeth and, in young fish, black spots on the back.",
  "eating": "A highly valued food fish around the Mediterranean; Spain and Bosnia and Herzegovina also report farming it.",
  "status": "Vulnerable on the IUCN Red List: numbers fell by more than 30% over the three generations to 2009. It is far more abundant inside marine protected areas than outside them.",
  "typicalCm": [
   35,
   70
  ],
  "maxCm": 100,
  "faqs": [
   {
    "q": "How big does a dentex get?",
    "a": "Most are about 50 cm (20 in); the species reaches 1 m (39 in) and over 14 kg (31 lb). The IGFA world record is 14.25 kg (31 lb 6 oz), from Tenerife in the Canary Islands in 1999."
   },
   {
    "q": "When is the best time to fish for dentex?",
    "a": "Dentex are caught all year, but warm-season days are favoured, and most fishing is done in daylight with live bait, big lures or jigs worked near the bottom."
   },
   {
    "q": "Why is the dentex Vulnerable?",
    "a": "It is long-lived, slow-growing and large, which makes it easy to over-fish. Mediterranean catches fell by about a third and West African catches by about two-thirds, and it is now scarce outside marine reserves."
   }
  ],
  "sources": [
   {
    "label": "FishBase — Dentex dentex",
    "url": "https://www.fishbase.se/summary/Dentex-dentex.html"
   },
   {
    "label": "FishBase — Dentex dentex population characteristics",
    "url": "https://www.fishbase.se/PopDyn/PopCharList.php?ID=439&GenusName=Dentex&SpeciesName=dentex"
   },
   {
    "label": "Wikipedia — Common dentex",
    "url": "https://en.wikipedia.org/wiki/Common_dentex"
   },
   {
    "label": "BaitYourHook — Dentex fishing",
    "url": "https://www.baityourhook.com/dentex-fishing"
   },
   {
    "label": "IGFA — World Records search",
    "url": "https://igfa.org/igfa-world-records-search/"
   }
  ]
 },
 "flathead-grey-mullet": {
  "otherNames": "Striped mullet (its IGFA name), grey mullet, black mullet, sea mullet and common mullet; flathead mullet in South Africa.",
  "family": "Mugilidae, the mullets.",
  "nativeRange": "Coastal waters of tropical, subtropical and temperate seas worldwide: the Atlantic from Nova Scotia to Brazil and from the Bay of Biscay to South Africa, including the Mediterranean and Black Sea; the Indian Ocean from South Africa to India; the Pacific from Japan to Australia and from California to Chile. Genetic work suggests it is a complex of closely related species.",
  "habitat": "Coastal water, estuaries, lagoons, mangroves and rivers, sometimes far upstream, from the surface to about 10 m; schools over sand and mud. It moves freely between fresh, brackish and salt water.",
  "temp": "Wide-ranging. AquaMaps puts its preferred surface water, across tropical and temperate coasts, at about 16–28°C (61–82°F); FishBase gives 8–24°C (46–75°F).",
  "record": "IGFA all-tackle world record (as striped mullet): 4.71 kg (10 lb 6 oz), Scott Lindner, Upper Laguna Madre, Texas, USA, 13 March 2009.",
  "lifespan": "Up to about 16 years.",
  "diet": "Microscopic algae, detritus and small bottom animals, grazed by day; larvae eat zooplankton.",
  "spawning": "At sea, in schools that move offshore, at different times of year in different places — in South Africa between May and November, often near estuary mouths. Females shed 0.8–2.6 million eggs; fish mature at three to four years.",
  "young": "Larvae drift back inshore, and juveniles depend on estuaries as nurseries.",
  "mouth": "Small, with a thin upper lip and fine teeth; a fatty (adipose) eyelid covers most of the eye.",
  "lookalikes": "Other grey mullets — the thick-lipped, thin-lipped and golden grey mullets of Europe and the harder (Chelon richardsonii) of the Cape — look much alike. The flathead grey mullet’s tells are its broad, flat head, the fatty eyelid over most of the eye, and a thin upper lip without papillae.",
  "eating": "An important food fish worldwide, fried, smoked or baked; its salted, pressed roe is bottarga in Italy, avgotaraho in Greece and karasumi in Japan.",
  "status": "Least Concern on the IUCN Red List (2022).",
  "typicalCm": [
   30,
   50
  ],
  "maxCm": 100,
  "faqs": [
   {
    "q": "How do you catch a mullet on a rod?",
    "a": "Usually with bread. Mullet graze on algae and detritus and seldom take lures; in estuaries and harbours, anglers loose-feed or groundbait with bread and fish a pinch of bread on a small hook under a light float."
   },
   {
    "q": "Can mullet live in fresh water?",
    "a": "Yes. The flathead grey mullet moves freely between salt, brackish and fresh water, often running far up rivers, though it returns to the sea to spawn."
   },
   {
    "q": "What is bottarga?",
    "a": "The salted, pressed and dried roe of the flathead grey mullet (and some other fish) — bottarga in Italy, avgotaraho in Greece and karasumi in Japan."
   }
  ],
  "sources": [
   {
    "label": "FishBase — Mugil cephalus",
    "url": "https://www.fishbase.se/summary/Mugil-cephalus.html"
   },
   {
    "label": "Mann (ed.), Southern African Marine Linefish Species Profiles — ORI Special Publication 9 (2013)",
    "url": "https://www.oritag.org.za/Content/UserContent/documents/Southern_African_Marine_Linefish_Species_Profiles.pdf"
   },
   {
    "label": "Wikipedia — Flathead grey mullet",
    "url": "https://en.wikipedia.org/wiki/Flathead_grey_mullet"
   },
   {
    "label": "ORI — Marine recreational fishing regulations in South Africa",
    "url": "https://www.oritag.org.za/Content/UserContent/documents/Linefishing-regs-for-the-smart-phone-interactive.pdf"
   },
   {
    "label": "Sea Angler — The kit you need to catch estuary mullet",
    "url": "https://www.seaangler.co.uk/?p=6722"
   },
   {
    "label": "IGFA — World Records search",
    "url": "https://igfa.org/igfa-world-records-search/"
   }
  ]
 },
 "garfish": {
  "otherNames": "Garpike (its IGFA name), sea needle, needlefish; hornfisk in Danish.",
  "family": "Belonidae, the needlefishes.",
  "nativeRange": "The north-eastern Atlantic, from Norway and the Baltic to the Canaries and Cape Verde, the Mediterranean and the Black Sea.",
  "habitat": "Near the surface in open coastal water; it moves into shallow, often brackish, water over seagrass in spring to spawn and returns to the open sea in autumn.",
  "temp": "Cool to warm-temperate. AquaMaps puts its preferred surface water at about 9–20°C (48–68°F).",
  "record": "IGFA all-tackle world record (as garpike): 1.18 kg (2 lb 9 oz), David Mesure, La Teste, France, 14 May 2002.",
  "lifespan": "About 8 years.",
  "diet": "Small fish — herring, sprats, sandeels, anchovies and sticklebacks — and free-swimming crustaceans.",
  "spawning": "May and June in seagrass beds. The eggs carry long, sticky threads that anchor them to the blades of seagrass.",
  "young": "Young garfish have greatly elongated jaws and lack the black lobe at the back of the dorsal fin.",
  "mouth": "Both jaws drawn out into a long beak with comparatively large, widely spaced teeth; the lower jaw is slightly longer.",
  "lookalikes": "The needlefishes of warmer seas belong to the same family and look much the same; in European waters the garfish is the common one.",
  "eating": "Good, and very popular in Denmark. The bones are green from a harmless pigment, biliverdin, which puts some people off.",
  "status": "Least Concern on the IUCN Red List (2012).",
  "typicalCm": [
   45,
   75
  ],
  "maxCm": 104,
  "faqs": [
   {
    "q": "Why are garfish bones green?",
    "a": "Because of biliverdin, a bile pigment. The colour is harmless and the fish is good to eat — garfish is popular in Denmark — but the green skeleton puts some people off."
   },
   {
    "q": "When do garfish come inshore?",
    "a": "In April and May, ahead of spawning in May and June over seagrass beds. In Denmark and the Baltic they arrive in May and early June; they stay through the summer and head back to the open sea in autumn."
   },
   {
    "q": "How big do garfish get?",
    "a": "Most are 45–75 cm (18–30 in) and well under 1 kg; the largest recorded reach about 1 m (3 ft 5 in) and 1.4 kg. The IGFA world record, listed as garpike, is 1.18 kg (2 lb 9 oz), from La Teste, France, in 2002."
   }
  ],
  "sources": [
   {
    "label": "FishBase — Belone belone",
    "url": "https://www.fishbase.se/summary/Belone-belone.html"
   },
   {
    "label": "FishBase — Belone belone population characteristics",
    "url": "https://www.fishbase.se/PopDyn/PopCharList.php?ID=47&GenusName=Belone&SpeciesName=belone"
   },
   {
    "label": "Wikipedia — Garfish",
    "url": "https://en.wikipedia.org/wiki/Garfish"
   },
   {
    "label": "Global FlyFisher — Belone belone, Danish inshore species",
    "url": "https://globalflyfisher.com/node/13554"
   },
   {
    "label": "IGFA — World Records search",
    "url": "https://igfa.org/igfa-world-records-search/"
   }
  ]
 },
 "ballan-wrasse": {
  "otherNames": "Ballan; the largest wrasse of north-west European coasts.",
  "family": "Labridae, the wrasses.",
  "nativeRange": "The north-eastern Atlantic from Norway to Morocco, including Madeira, the Azores and the Canaries. Mediterranean records are doubtful and probably brown wrasse.",
  "habitat": "Rocks, reefs, kelp and seaweed from 1 to about 50 m (3–165 ft), usually 2–30 m; young fish often in the intertidal zone.",
  "temp": "Cool temperate. AquaMaps puts its preferred surface water at about 10–14°C (50–58°F); FishBase gives a tolerance of 5–25°C.",
  "record": "IGFA all-tackle world record: 4.35 kg (9 lb 9 oz), Bertrand Kron, Clogher Head, Co. Kerry, Ireland, 20 August 1983.",
  "lifespan": "Up to 34 years.",
  "diet": "Mussels and other shellfish pulled from rock faces, crabs and small lobsters, crushed by powerful teeth in the throat. It has no stomach.",
  "spawning": "The male builds a nest of seaweed in a rock crevice; one or more females lay eggs in it, and he guards them for one to two weeks until the larvae hatch and drift away.",
  "young": "Young fish match their habitat, from pale to bright emerald green.",
  "mouth": "Small, with thick, wrinkled lips and a single row of strong teeth, sharp in young fish and worn blunt in old ones.",
  "lookalikes": "Corkwing wrasse is much smaller and has a small dark spot on the tail stalk. In the Mediterranean, the brown wrasse (Labrus merula) is the similar large wrasse.",
  "eating": "Eaten in Orkney and Galway, but not highly regarded in most of Britain and Ireland; most anglers release it.",
  "status": "Least Concern on the IUCN Red List (2008). It is now heavily fished as a live cleaner fish for salmon farms — ballan make up about 72% of Scotland’s wild wrasse landings — and is also bred for the purpose.",
  "typicalCm": [
   30,
   50
  ],
  "maxCm": 66,
  "faqs": [
   {
    "q": "Do ballan wrasse change sex?",
    "a": "Yes. Every ballan wrasse starts life as a female, and a few change into males after four to fourteen years. The largest fish are almost certainly males."
   },
   {
    "q": "What is the best time to catch ballan wrasse?",
    "a": "Summer into autumn, in daylight. Wrasse feed only by day and catches fall away as the light fades; autumn is often the best time for a specimen."
   },
   {
    "q": "Why are wrasse used on salmon farms?",
    "a": "They eat sea lice off farmed salmon. Ballan wrasse are one of five wrasse species trapped wild for the purpose, and are now also farmed to reduce pressure on wild stocks."
   }
  ],
  "sources": [
   {
    "label": "FishBase — Labrus bergylta",
    "url": "https://www.fishbase.se/summary/Labrus-bergylta.html"
   },
   {
    "label": "Wikipedia — Ballan wrasse",
    "url": "https://en.wikipedia.org/wiki/Ballan_wrasse"
   },
   {
    "label": "Hard Rock Fishing — Wrasse fishing FAQ",
    "url": "https://hard.rockfishing.co.uk/wrasse-fishing-faq/"
   },
   {
    "label": "Scottish Government — Wild wrasse fishery: summary up to and including 2024",
    "url": "https://www.gov.scot/publications/wild-wrasse-fishery-summary-up-including-2024/"
   },
   {
    "label": "IGFA — World Records search",
    "url": "https://igfa.org/igfa-world-records-search/"
   }
  ]
 },
 "black-seabream": {
  "otherNames": "Black bream in Britain; griset or dorade grise in French.",
  "family": "Sparidae, the seabreams and porgies.",
  "nativeRange": "The eastern Atlantic from Scandinavia to northern Namibia, including Madeira, the Canaries and Cape Verde, the Mediterranean and the western Black Sea.",
  "habitat": "Seagrass beds and rocky and sandy bottoms from about 5 to 300 m (16–985 ft). It often gathers in large schools and spends the winter in deeper water offshore.",
  "temp": "Temperate to warm-temperate. AquaMaps puts its preferred surface water at about 12–25°C (53–77°F).",
  "record": "IGFA all-tackle world record: 1.9 kg (4 lb 3 oz), Patrick Sebile, Bonifacio, Corsica, France, 16 September 2002.",
  "lifespan": "Up to about 14 years.",
  "diet": "Seaweed and small bottom animals, especially crustaceans.",
  "spawning": "April to July in Britain, earlier further south. The male digs a crater-like nest in sand or gravel over flat bedrock, the female lays in it, and he guards the eggs until they hatch. A protogynous hermaphrodite: fish mature first as females.",
  "mouth": "A small mouth with several rows of thin, conical teeth, the outer ones enlarged at the front.",
  "lookalikes": "Gilthead seabream has a large black spot on the gill cover; the black seabream has no dark spots, only faint lines and bars.",
  "eating": "A valued food fish, especially in Portugal and around the Mediterranean.",
  "status": "Least Concern on the IUCN Red List (2009). Nest sites are vulnerable to disturbance, and removing the guarding males reduces breeding success.",
  "typicalCm": [
   25,
   35
  ],
  "maxCm": 60,
  "faqs": [
   {
    "q": "When is black bream season in the UK?",
    "a": "Late spring and summer, when adults come inshore to nest along the south coast. In winter they move to deeper water offshore and shore catches dry up."
   },
   {
    "q": "What are the rules at Kingmere?",
    "a": "Kingmere Rocks off Sussex is a Marine Conservation Zone protecting Britain’s most important known black bream nesting site. Part of it is closed to angling from 1 April to 30 June, anglers may keep four bream a day in the rest of the zone, and the Sussex IFCA minimum size is 23 cm."
   },
   {
    "q": "Why do black bream make nests?",
    "a": "The males dig crater-shaped nests in gravel or sand for the females’ eggs, then guard them from predators and keep them clean until they hatch."
   }
  ],
  "sources": [
   {
    "label": "FishBase — Spondyliosoma cantharus",
    "url": "https://www.fishbase.se/summary/Spondyliosoma-cantharus.html"
   },
   {
    "label": "FishBase — Spondyliosoma cantharus population characteristics",
    "url": "https://www.fishbase.se/PopDyn/PopCharList.php?ID=1356&GenusName=Spondyliosoma&SpeciesName=cantharus"
   },
   {
    "label": "Wikipedia — Black seabream",
    "url": "https://en.wikipedia.org/wiki/Black_seabream"
   },
   {
    "label": "Marine Conservation Society Good Fish Guide — Black bream",
    "url": "https://www.mcsuk.org/goodfishguide/species/black-bream/wild/881/"
   },
   {
    "label": "Angling Trust — Kingmere Marine Conservation Zone",
    "url": "https://anglingtrust.net/kingmere-marine-conservation-zone-2/"
   },
   {
    "label": "IGFA — World Records search",
    "url": "https://igfa.org/igfa-world-records-search/"
   }
  ]
 },
 "european-flounder": {
  "otherNames": "Flounder or white fluke; flet in French.",
  "family": "Pleuronectidae, the righteye flounders.",
  "nativeRange": "Coastal and brackish waters of Europe from the White Sea and the Baltic to the Mediterranean, the Black Sea and the North African coast; established in Iceland since 1999.",
  "introduced": "Carried to the North American Great Lakes in ships’ ballast water in the 1970s, but only a few were ever found and it probably did not breed there.",
  "habitat": "Mud and sand from the shore down to about 100 m (330 ft), and estuaries, where it spends much of the year; it often runs far up rivers into fresh water.",
  "temp": "Cool temperate. AquaMaps puts its preferred surface water at about 9–16°C (48–61°F); FishBase gives a tolerance of 5–25°C.",
  "record": "IGFA all-tackle world record: 2.93 kg (6 lb 7 oz), Anne Karin Lothe, Maurangerfjorden, Norway, 10 January 2004.",
  "lifespan": "Up to 15 years.",
  "diet": "Worms, shrimps, snails and bivalves, and small fish; young fish eat plankton and insect larvae.",
  "spawning": "Adults move to deeper, warmer water at sea in winter and spawn there in spring; each female sheds 0.4–2 million eggs. The larvae ride the tides into estuaries and up rivers.",
  "young": "Larvae and young flounder ride the tides upstream into rivers, cued by salinity, food and water temperature.",
  "mouth": "Small, at the end of a bluntly pointed snout.",
  "lookalikes": "Plaice has smooth skin, a bony ridge behind the eyes and bright orange spots. The flounder may show reddish spots too, but its rough skin and the prickly bumps along the lateral line and fin bases give it away. The two sometimes hybridise.",
  "eating": "A commercial food fish, sold fresh and frozen in Europe.",
  "status": "Least Concern on the IUCN Red List (2022).",
  "typicalCm": [
   25,
   40
  ],
  "maxCm": 60,
  "faqs": [
   {
    "q": "Can flounder live in fresh water?",
    "a": "Yes. Unlike other European flatfish, the flounder regularly runs up rivers and feeds in fresh water before returning to the sea to spawn. In Britain it has been found as far inland as Montgomeryshire on the River Severn."
   },
   {
    "q": "How do you tell a flounder from a plaice?",
    "a": "Run a finger along the lateral line: a flounder is rough, with rows of prickly bumps along it and at the base of the fins. A plaice is smooth, with bright orange spots and a bony ridge behind the eyes."
   },
   {
    "q": "When is the best time to catch flounder?",
    "a": "Spring through autumn in estuaries and shallow bays. In late winter and early spring many adults are offshore spawning, and catches drop."
   }
  ],
  "sources": [
   {
    "label": "FishBase — Platichthys flesus",
    "url": "https://www.fishbase.se/summary/Platichthys-flesus.html"
   },
   {
    "label": "Wikipedia — European flounder",
    "url": "https://en.wikipedia.org/wiki/European_flounder"
   },
   {
    "label": "British Sea Fishing — Flounder",
    "url": "https://britishseafishing.co.uk/flounder/"
   },
   {
    "label": "Fishes of the Great Lakes Region (University of Michigan) — European flounder",
    "url": "https://quod.lib.umich.edu/f/fish5ic/x-212/212"
   },
   {
    "label": "The tale of the founder flounder: origin of a recently established fish in Icelandic waters",
    "url": "https://iris.landsbokasafn.is/en/publications/the-tale-of-the-founder-flounder-assessing-the-origin-of-a-recent/"
   },
   {
    "label": "IGFA — World Records search",
    "url": "https://igfa.org/igfa-world-records-search/"
   }
  ]
 },
 "great-barracuda": {
  "otherNames": "Barracuda, ’cuda, sea pike or giant sea pike.",
  "family": "Sphyraenidae, the barracudas.",
  "nativeRange": "Tropical and subtropical seas except the eastern Pacific: the Indo-Pacific from the Red Sea and East Africa to Hawaiʻi and French Polynesia; the western Atlantic from Massachusetts and Bermuda through the Caribbean to Brazil; the eastern Atlantic from Mauritania and Senegal to Nigeria and São Tomé. In South Africa mainly from KwaZulu-Natal northwards.",
  "habitat": "Near the surface over reefs, seagrass, wrecks and channels, down to about 100 m (330 ft); juveniles live in mangroves, estuaries and sheltered inner reefs.",
  "temp": "Tropical. AquaMaps puts its preferred surface water at about 25–29°C (77–84°F).",
  "record": "IGFA all-tackle world record: 39.55 kg (87 lb 3 oz), Christian Loranger, Christmas Island, Kiribati, 23 September 2012.",
  "lifespan": "Up to about 18 years.",
  "diet": "Fish — needlefish, halfbeaks, puffers, jacks and mullet among them — with squid and sometimes shrimp.",
  "spawning": "In summer in the tropics; in the western Atlantic from about April to October, peaking July to September. Males mature at about two years and 55 cm fork length, females at three years and 70 cm.",
  "young": "Young fish live among mangroves and reed beds in estuaries; small ones have a forked tail and irregular dark blotches along the sides.",
  "mouth": "A large mouth with a jutting lower jaw and strong, fang-like teeth of unequal size, set in sockets in the jaws and the roof of the mouth.",
  "lookalikes": "Pickhandle barracuda (Sphyraena jello) of the Indian Ocean has dark bars that cross the lateral line and a largely yellow tail. Wahoo has a snout as long as the rest of its head and a long first dorsal fin of 23–27 spines.",
  "eating": "Sold fresh, dried or salted, but barracuda are a known source of ciguatera poisoning in many tropical waters; FishBase notes it has not been reported from them in the eastern Atlantic.",
  "status": "Least Concern on the IUCN Red List (2013).",
  "typicalCm": [
   60,
   120
  ],
  "maxCm": 200,
  "faqs": [
   {
    "q": "Is barracuda safe to eat?",
    "a": "Not reliably. Barracuda can carry ciguatera toxin from reef food chains in many tropical waters, though FishBase notes no reports from the eastern Atlantic. Ask locally before eating one."
   },
   {
    "q": "Are barracuda dangerous to swimmers?",
    "a": "Rarely. FishBase records that they occasionally attack people with a single, fierce strike — serious but rarely fatal. Keep hands well clear of a hooked fish’s teeth."
   },
   {
    "q": "How big do great barracuda get?",
    "a": "Most adults are 60–100 cm (24–39 in); the species reaches 2 m (6 ft 7 in). The IGFA world record is 39.55 kg (87 lb 3 oz), from Christmas Island, Kiribati, in 2012."
   }
  ],
  "sources": [
   {
    "label": "FishBase — Sphyraena barracuda",
    "url": "https://www.fishbase.se/summary/Sphyraena-barracuda.html"
   },
   {
    "label": "Mann (ed.), Southern African Marine Linefish Species Profiles — ORI Special Publication 9 (2013)",
    "url": "https://www.oritag.org.za/Content/UserContent/documents/Southern_African_Marine_Linefish_Species_Profiles.pdf"
   },
   {
    "label": "Wikipedia — Great barracuda",
    "url": "https://en.wikipedia.org/wiki/Great_barracuda"
   },
   {
    "label": "Florida Fish and Wildlife Conservation Commission — Great barracuda",
    "url": "https://myfwc.com/fishing/saltwater/recreational/barracuda/"
   },
   {
    "label": "IGFA — World Records search",
    "url": "https://igfa.org/igfa-world-records-search/"
   }
  ]
 },
 "atlantic-tarpon": {
  "otherNames": "Tarpon, silver king.",
  "family": "Megalopidae, the tarpons.",
  "nativeRange": "The Atlantic: from Nova Scotia and Bermuda through the Gulf of Mexico and the Caribbean to Brazil, and from Mauritania to Angola; stray fish have reached Portugal, the Azores and south-western France.",
  "habitat": "Coastal water, bays, estuaries, mangrove lagoons and rivers, usually shallower than 15 m (50 ft); it often enters fresh water, and a few populations complete their lives there.",
  "temp": "Tropical and subtropical. AquaMaps puts its preferred surface water at about 22–28°C (72–82°F); FishBase records a tolerance of 10–40°C.",
  "record": "IGFA all-tackle world record: 129.98 kg (286 lb 9 oz), Max Domecq, Rubane, Guinea-Bissau, 20 March 2003.",
  "lifespan": "Up to 55 years.",
  "diet": "Shoaling fish — sardines, anchovies, mullet, snook and cichlids — and crabs and shrimp.",
  "spawning": "At sea. Females are enormously fertile: a 2 m fish is estimated to carry over 12 million eggs. The transparent, ribbon-like larvae drift into estuaries.",
  "young": "The larvae drift into estuaries, and young tarpon grow up in estuaries and lagoons, where breathing air lets them cope with oxygen-poor water.",
  "mouth": "A large, upturned mouth with fine teeth and a long bony plate on the throat.",
  "lookalikes": "Ladyfish (Elops species) are slimmer and silvery, with much smaller scales — more than 100 along the lateral line in the American ladyfish — and no long trailing dorsal ray.",
  "eating": "Bony and generally thought poor in the United States, where it is almost always released, but eaten fresh or salted in parts of its range. Ciguatera has been reported.",
  "status": "Vulnerable on the IUCN Red List (2018).",
  "typicalCm": [
   90,
   180
  ],
  "maxCm": 250,
  "faqs": [
   {
    "q": "Can you keep a tarpon in Florida?",
    "a": "Only to claim a record. Florida’s tarpon fishery is catch-and-release; one tarpon tag per person per year may be bought when pursuing a state or world record. Fish of 40 in (102 cm) or more must stay in the water otherwise."
   },
   {
    "q": "Where was the biggest tarpon caught?",
    "a": "In West Africa. The IGFA all-tackle world record, 129.98 kg (286 lb 9 oz), came from Rubane in Guinea-Bissau’s Bijagós Islands in 2003."
   },
   {
    "q": "When is tarpon season in West Africa?",
    "a": "Through the dry season. Outfitters in Guinea-Bissau fish from about November to May, with a peak from March to May; at Port-Gentil in Gabon the season runs from October to May."
   },
   {
    "q": "How do tarpon breathe air?",
    "a": "Their swim bladder connects to the gut and works like a primitive lung: tarpon roll at the surface to gulp air, which lets them live in warm, oxygen-poor lagoons and creeks."
   }
  ],
  "sources": [
   {
    "label": "FishBase — Megalops atlanticus",
    "url": "https://www.fishbase.se/summary/Megalops-atlanticus.html"
   },
   {
    "label": "Wikipedia — Atlantic tarpon",
    "url": "https://en.wikipedia.org/wiki/Atlantic_tarpon"
   },
   {
    "label": "Florida Fish and Wildlife Conservation Commission — Tarpon",
    "url": "https://myfwc.com/fishing/saltwater/recreational/tarpon/"
   },
   {
    "label": "Fishing World Guide — Guinea-Bissau",
    "url": "https://www.fishingworldguide.com/en/guinea-bissau"
   },
   {
    "label": "Frontiers Travel — Port-Gentil tarpon experience",
    "url": "https://www.frontierstravel.com/port-gentil-tarpon-experience"
   },
   {
    "label": "IGFA — World Records search",
    "url": "https://igfa.org/igfa-world-records-search/"
   }
  ]
 },
 "narrow-barred-spanish-mackerel": {
  "otherNames": "King mackerel, couta, ’cuda or katonkel in South Africa; kingfish in East Africa; Spaniard in Australia. Not the king mackerel (Scomberomorus cavalla) of the western Atlantic.",
  "family": "Scombridae, the tunas and mackerels.",
  "nativeRange": "The Indo-West Pacific, from South Africa and the Red Sea along the coasts of East Africa and southern Asia to China, Japan, Australia and Fiji; also St Helena, and a migrant through the Suez Canal into the eastern Mediterranean. In South Africa common in KwaZulu-Natal, rarely as far south as Mossel Bay.",
  "habitat": "Open water from the edge of the continental shelf to shallow coastal water, drop-offs and reef slopes, often in murky, low-salinity water.",
  "temp": "Tropical. AquaMaps puts its preferred surface water at about 22–29°C (72–84°F).",
  "record": "IGFA all-tackle world record: 44.91 kg (99 lb), Michael Wilkinson, Scottburgh, KwaZulu-Natal, South Africa, 14 March 1982. The South African angling record is 46.4 kg (102 lb), from 1995.",
  "lifespan": "Up to 14 years in South African waters and about 22 years elsewhere.",
  "diet": "Shoaling fish — anchovies, sardines, jacks and small mackerels — with squid and prawns.",
  "spawning": "In spring and summer, roughly September to March, mainly off Mozambique, and further south into KwaZulu-Natal in good years. Females mature at about one and a half years.",
  "young": "Juveniles are often spotted and live inshore and in estuaries and large bays.",
  "mouth": "A long jaw reaching to the back of the eye, with strong, flattened, knife-like teeth.",
  "lookalikes": "Queen mackerel (Scomberomorus plurilineatus) has broken lines along the sides and a lateral line that curves down gently. Wahoo has a snout as long as the rest of its head and a longer first dorsal fin, with 23–27 spines against the couta’s 15–18.",
  "eating": "An important food fish, marketed mainly fresh, and also dried, salted, smoked and canned. Line-caught South African fish are WWF-SASSI orange (think twice); Mozambique’s are red (don’t buy).",
  "status": "Near Threatened on the IUCN Red List (2022). The KwaZulu-Natal and southern Mozambique stock was assessed in 2013 as optimally exploited in South Africa but over-exploited in Mozambique.",
  "typicalCm": [
   80,
   130
  ],
  "maxCm": 240,
  "faqs": [
   {
    "q": "Is a couta the same as a king mackerel?",
    "a": "In South Africa, yes — couta and king mackerel are both names for Scomberomorus commerson. It is not the king mackerel of Florida and the Gulf of Mexico, which is a different species, Scomberomorus cavalla."
   },
   {
    "q": "When do couta come to KwaZulu-Natal?",
    "a": "In summer, roughly November to March, when shoals move south from Mozambique to feed. Strong years may be linked to above-average rainfall in Mozambique."
   },
   {
    "q": "What is the bag limit for king mackerel in South Africa?",
    "a": "Ten a day, with no size limit and no closed season, on a DFFE recreational permit. Scientists have recommended cutting the limit to five."
   }
  ],
  "sources": [
   {
    "label": "FishBase — Scomberomorus commerson",
    "url": "https://www.fishbase.se/summary/Scomberomorus-commerson.html"
   },
   {
    "label": "Mann (ed.), Southern African Marine Linefish Species Profiles — ORI Special Publication 9 (2013)",
    "url": "https://www.oritag.org.za/Content/UserContent/documents/Southern_African_Marine_Linefish_Species_Profiles.pdf"
   },
   {
    "label": "WWF-SASSI — King mackerel",
    "url": "https://wwfsassi.co.za/sassi-list/fish?id=63"
   },
   {
    "label": "Wikipedia — Narrow-barred Spanish mackerel",
    "url": "https://en.wikipedia.org/wiki/Narrow-barred_Spanish_mackerel"
   },
   {
    "label": "IGFA — World Records search",
    "url": "https://igfa.org/igfa-world-records-search/"
   }
  ]
 },
 "crevalle-jack": {
  "otherNames": "Jack crevalle, common jack, couvalli jack, black cavalli or crevalle; carangue crevalle in French. West African catch statistics lump it with the longfin crevalle jack.",
  "family": "Carangidae, the jacks and pompanos.",
  "nativeRange": "Both sides of the Atlantic, mostly over the continental shelf. In the west from Nova Scotia (only as rare strays) and Massachusetts, where it is a regular summer visitor, through the Gulf of Mexico and the Greater Antilles to Uruguay; in the east from Mauritania to Angola. Old Mediterranean and Canary Islands records were other jacks.",
  "habitat": "Coastal water from the shoreline and shallow flats out to about 350 m (1,150 ft), usually less than 200 m; adults run up rivers. Juveniles crowd into brackish estuaries, lagoons and mangroves over mud, near sandy beaches and on seagrass beds.",
  "temp": "Tropical to subtropical. AquaMaps puts its preferred surface water at about 20–28°C (67–82°F). It cannot survive the winter north of Cape Hatteras, and water below about 9°C (48°F) kills it.",
  "record": "IGFA all-tackle world record: 30 kg (66 lb 2 oz), Carlos Alberto Leal Simoes, Barra do Dande, Angola, 1 June 2010.",
  "lifespan": "At least 20 years: Gulf of Mexico fish have been aged to 20 from their otoliths.",
  "diet": "Mostly fish — in the Gulf of Guinea, anchovies and sardines above all — with shrimps, crabs and squid. Young West African fish eat small fish and juvenile shrimps, which can make up half or more of their diet in the dry season.",
  "spawning": "Offshore or over inshore reefs, in big pre-spawning schools, with pelagic eggs. In Ghana spawning runs over a long season with a peak from about October to January; off southern Florida it runs from about March to September. Males mature at about 55 cm and four to five years, females at about 66 cm and five to six years.",
  "young": "Young fish live in West African lagoons all year — in Ghana’s Keta lagoon in every month — and return to the sea at about 12 cm. On the US coast young-of-the-year reach estuaries as far north as New York in summer and must move south before winter.",
  "mouth": "A large mouth reaching to below the back of the eye, with an outer row of strong teeth and enlarged canines at the tip of the lower jaw.",
  "lookalikes": "Longfin crevalle jack (Caranx fischeri), described from West Africa in 2007, shares its coast: it has more dorsal and anal rays, longer fin lobes and an anal-fin lobe that is white at the front, where the crevalle jack’s is lemon yellow. Horse-eye jack (Caranx latus) has a fully scaled chest.",
  "eating": "Edible but coarse, dark and strong-tasting; small fish bled at once are best. It is sold fresh, frozen, salted and smoked, and West Africa’s beach-seine catches once supported a large dried-fish trade. Ciguatera has been reported.",
  "status": "Least Concern on the IUCN Red List (2018). West African landings, which combine it with the longfin crevalle jack, topped 15,000 t a year in Ghana and Angola in some years of the 1950s to 1970s; such catches no longer occur.",
  "typicalCm": [
   40,
   90
  ],
  "maxCm": 129,
  "faqs": [
   {
    "q": "What is the world record crevalle jack?",
    "a": "30 kg (66 lb 2 oz), caught at Barra do Dande, Angola, in June 2010, according to the IGFA. West Africa grows the biggest crevalle jacks: the previous record, 26.5 kg (58 lb 6 oz), came from Barra do Kwanza, also in Angola, in 2000."
   },
   {
    "q": "Is crevalle jack good to eat?",
    "a": "Edible, but not highly rated: the flesh is dark, coarse and strong-tasting. Choose a smaller fish, bleed it as soon as it is landed and eat it fresh or smoked. Ciguatera has been reported, so ask locally before eating a big one from tropical reefs."
   },
   {
    "q": "How do you tell a crevalle jack from a longfin crevalle jack?",
    "a": "Look at the anal fin. The crevalle jack’s anal-fin lobe is lemon yellow and the underside of its tail stalk is yellow too; the longfin crevalle jack’s anal lobe is white at the front and its fin lobes are longer. Both live in West Africa and were treated as one species until 2007."
   },
   {
    "q": "When are crevalle jacks inshore in West Africa?",
    "a": "They are caught all year, but big shoals move inshore from about September to December: in Ghana spawning peaks from October to January, and in Nigeria the fish arrive from September to November."
   }
  ],
  "sources": [
   {
    "label": "FishBase — Caranx hippos",
    "url": "https://www.fishbase.se/summary/Caranx-hippos.html"
   },
   {
    "label": "Smith-Vaniz and Carpenter, Review of the crevalle jacks, Caranx hippos complex — Fishery Bulletin 105(2) (2007)",
    "url": "https://spo.nmfs.noaa.gov/sites/default/files/pdf-content/2007/1052/smith.pdf"
   },
   {
    "label": "Jefferson et al., Age, growth and diet of crevalle jack in the Gulf of Mexico — Fisheries Management and Ecology 29(5) (2022)",
    "url": "https://doi.org/10.1111/fme.12550"
   },
   {
    "label": "Florida Museum — Crevalle jack",
    "url": "https://www.floridamuseum.ufl.edu/discover-fish/species-profiles/caranx-hippos/"
   },
   {
    "label": "Wikipedia — Crevalle jack",
    "url": "https://en.wikipedia.org/wiki/Crevalle_jack"
   },
   {
    "label": "Wikipedia — Longfin crevalle jack",
    "url": "https://en.wikipedia.org/wiki/Longfin_crevalle_jack"
   },
   {
    "label": "IGFA — World Records search",
    "url": "https://igfa.org/igfa-world-records-search/"
   }
  ]
 },
 "west-african-ladyfish": {
  "otherNames": "Ladyfish or tenpounder; guinée in French. FishBase and FAO call it the West African ladyfish, and it is often confused with the Senegalese ladyfish (Elops senegalensis), which shares its coast.",
  "family": "Elopidae, the ladyfishes — close cousins of the tarpons.",
  "nativeRange": "The eastern Atlantic coast of West Africa, from Mauritania to Angola and perhaps Namibia.",
  "habitat": "Shallow coastal water over sand and mud, from the shore and some way up tidal rivers to the edge of the shelf at about 50 m (165 ft). It enters lagoons and estuaries, and sometimes fresh water, as in the Cross River in Nigeria and the Kouilou in Congo.",
  "temp": "Tropical. AquaMaps puts its preferred surface water at about 25–28°C (77–82°F).",
  "record": "IGFA keeps no separate category for the West African ladyfish. Its record for the Senegalese ladyfish, which is easily confused with it, is 5.9 kg (13 lb 0 oz), Gerard Cittadini, Bijagós Archipelago, Guinea-Bissau, 12 April 1994.",
  "lifespan": "Not well documented.",
  "diet": "Small fish — sardines and other herrings above all — with crustaceans and molluscs; big ones also take insects.",
  "spawning": "At sea. Like tarpon, ladyfish hatch as transparent, ribbon-like leptocephalus larvae that drift inshore and shrink as they change into small fish.",
  "mouth": "A large, terminal mouth with bands of fine teeth and a bony plate (the gular plate) between the arms of the lower jaw.",
  "lookalikes": "Senegalese ladyfish has smaller scales — 92 to 100 along the lateral line against 72 to 83 — and fewer gill rakers, so the two are hard to tell apart in the hand. Atlantic tarpon has huge scales, an upturned mouth and a long trailing ray on the dorsal fin.",
  "eating": "Bony, like all ladyfish, but landed commercially and eaten along the West African coast.",
  "status": "Least Concern on the IUCN Red List (2020).",
  "typicalCm": [
   30,
   60
  ],
  "maxCm": 100,
  "faqs": [
   {
    "q": "Is a ladyfish a kind of tarpon?",
    "a": "A close cousin. Ladyfish and tarpon belong to the same order and both start life as see-through, ribbon-like larvae. The ladyfish is slim, with small scales and no long trailing dorsal ray, and rarely tops a metre; the tarpon is deep-bodied, with huge scales, and grows to over 2 m."
   },
   {
    "q": "How do you catch ladyfish?",
    "a": "On light tackle, with small spoons, spinners, shallow plugs or flies worked through lagoon channels and river mouths on a moving tide, or a strip of fish under a float. They leap hard and often throw the hook."
   },
   {
    "q": "How big do West African ladyfish get?",
    "a": "Most are 30–60 cm (12–24 in); the largest recorded reach about 1 m (39 in)."
   }
  ],
  "sources": [
   {
    "label": "FishBase — Elops lacerta",
    "url": "https://www.fishbase.se/summary/Elops-lacerta.html"
   },
   {
    "label": "FishBase — Elops senegalensis",
    "url": "https://www.fishbase.se/summary/Elops-senegalensis.html"
   },
   {
    "label": "IGFA — World Records search",
    "url": "https://igfa.org/igfa-world-records-search/"
   }
  ]
 },
 "blackchin-tilapia": {
  "otherNames": "Black-chinned tilapia, blackchin mouthbrooder or silvery tilapia; ‘saltwater tilapia’ in Hawaii; gloria or tilapiang arroyo in the Philippines. Formerly Tilapia melanotheron, T. heudelotii and T. leonensis.",
  "family": "Cichlidae, the cichlids.",
  "nativeRange": "Brackish lagoons and estuaries of West Africa, from Mauritania to Cameroon.",
  "introduced": "Established in Florida — in the Tampa Bay system and the Indian River lagoon — and on Oʻahu, Hawaii, and invasive in the Philippines, including Manila Bay, and in Thailand, where it was found spreading in 2012 after an import for farming trials in 2010 and became a national priority in 2024.",
  "habitat": "Shallow, sheltered water less than about 3 m (10 ft) deep in lagoons, estuaries and mangroves. It survives anything from fresh water to lagoons far saltier than the sea, but in West Africa it keeps to brackish water.",
  "temp": "Warm water only. The Gulf of Guinea lagoons it lives in stay roughly 25–31°C (77–88°F) all year. In laboratory tests it stopped moving at 10–12°C and died at about 7°C (45°F).",
  "record": "IGFA keeps no category for blackchin tilapia.",
  "lifespan": "Not well documented.",
  "diet": "Algae and the film of life on submerged surfaces, detritus, small bivalves and zooplankton, picked up in bites, mostly at night.",
  "spawning": "All year round in the warm West African lagoons. Unusually, the female leads the courtship and digs the nest pit; once the eggs are fertilised, the male picks them up and carries them in his mouth. They hatch after about five days, and the young stay in his mouth for a little over a week more. Fish mature at about 12–13 cm.",
  "young": "Released from the father’s mouth as free-swimming fry about two weeks after spawning.",
  "mouth": "Small, with up to a few hundred tiny teeth set in three to six rows.",
  "lookalikes": "Guinean tilapia (Coptodon guineensis), the other lagoon tilapia of the coast, has a strongly arched head and a tail that is grey above and yellow below, and no black chin. Nile tilapia, in fresh water upstream, has regular dark bars across its tail fin.",
  "eating": "A popular food fish in West Africa’s lagoon fisheries, fried, grilled or smoked, and also farmed.",
  "status": "Least Concern on the IUCN Red List (2019) in its native range; a damaging invasive species where it has been introduced.",
  "typicalCm": [
   12,
   20
  ],
  "maxCm": 28,
  "faqs": [
   {
    "q": "Why is it called the blackchin tilapia?",
    "a": "For the dark patches on the chin and throat of adult fish. In the Philippines the mark earned it the nickname gloria, after former president Gloria Macapagal-Arroyo and the mole on her cheek."
   },
   {
    "q": "Which parent carries the eggs?",
    "a": "The father. In most mouthbrooding tilapias the female broods the eggs, but in the blackchin the male picks up the fertilised eggs and keeps them and the newly hatched young in his mouth for about two weeks."
   },
   {
    "q": "Is blackchin tilapia invasive?",
    "a": "Outside West Africa, yes. It is established in Florida and Hawaii and spreading in the Philippines and Thailand, where it has damaged shrimp and fish farms and coastal wetlands; Thailand made its control a national priority in 2024. Never move live tilapia from one water to another."
   }
  ],
  "sources": [
   {
    "label": "FishBase — Sarotherodon melanotheron",
    "url": "https://www.fishbase.se/summary/Sarotherodon-melanotheron.html"
   },
   {
    "label": "FishBase — Coptodon guineensis",
    "url": "https://www.fishbase.se/summary/Coptodon-guineensis.html"
   },
   {
    "label": "US Fish and Wildlife Service — Blackchin tilapia, Ecological Risk Screening Summary (2026)",
    "url": "https://www.fws.gov/sites/default/files/documents/2026-02/ecological-risk-screening-summary-blackchin-tilapia-feb-2026.pdf"
   },
   {
    "label": "Wikipedia — Blackchin tilapia",
    "url": "https://en.wikipedia.org/wiki/Blackchin_tilapia"
   }
  ]
 },
 "cassava-croaker": {
  "otherNames": "Cassava drum, croaker or simply cassava in English-speaking West Africa; bar and otolithe sénégalais in French; corvina and rainha in Portuguese.",
  "family": "Sciaenidae, the drums and croakers.",
  "nativeRange": "The West African coast from Morocco to Angola, but rare north of Senegal; also reported from Namibia.",
  "habitat": "Coastal water over mud, sand and rock from the shore to about 70 m (230 ft). Smaller fish live in shallow water, but rarely enter estuaries.",
  "temp": "Tropical. AquaMaps puts its preferred surface water at about 24–28°C (76–82°F); it is seldom found in water cooler than 16°C (61°F).",
  "record": "IGFA all-tackle world record: 14.2 kg (31 lb 4 oz), Michel Delaunay, Bubaque Island, Guinea-Bissau, 4 August 2009.",
  "lifespan": "At least 8 years — the oldest recorded, from the mouth of the Congo River (FishBase).",
  "diet": "Small fish — FishBase records the fry of the long-finned herring — with prawns, shrimps and crabs.",
  "spawning": "November to March in the Gulf of Guinea, in water of 22–25°C (72–77°F). Fish mature at about 35 cm.",
  "young": "Small fish live in shallow coastal water.",
  "mouth": "Large and oblique, with a slightly jutting lower jaw, bands of fine teeth and a pair of large canines at the front of the upper jaw. The inside of the gill cover is black.",
  "lookalikes": "Longneck croaker (Pseudotolithus typus) grows larger, has an even smaller eye and an upper jaw that reaches past the eye, and its young enter estuaries and rivers. Bobo croaker (Pseudotolithus elongatus) is smaller, with a larger eye and a very strong second anal spine, and lives close inshore and in lagoons.",
  "eating": "Excellent, with white, flaky flesh; West Africa’s most important bottom fish for food and a mainstay of coastal markets.",
  "status": "Endangered on the IUCN Red List (2020), for a decline inferred from catch rates and the weight of fishing along the coast.",
  "typicalCm": [
   35,
   60
  ],
  "maxCm": 114,
  "faqs": [
   {
    "q": "Why is it called a croaker?",
    "a": "Croakers and drums make a loud drumming or croaking sound by vibrating muscles against the swim bladder, and you can often hear it when one is landed."
   },
   {
    "q": "Is the cassava croaker endangered?",
    "a": "Yes. The IUCN listed it as Endangered in 2020 because heavy trawl and canoe fishing along the West African coast have sharply reduced it. Keep only what you need and return fish under about 35 cm, the size at which they mature."
   },
   {
    "q": "How big do cassava croakers get?",
    "a": "Most are 35–60 cm (14–24 in), and the species reaches 114 cm (45 in). The IGFA world record is 14.2 kg (31 lb 4 oz), from Bubaque Island in Guinea-Bissau’s Bijagós archipelago, in 2009."
   }
  ],
  "sources": [
   {
    "label": "FishBase — Pseudotolithus senegalensis",
    "url": "https://www.fishbase.se/summary/Pseudotolithus-senegalensis.html"
   },
   {
    "label": "FishBase — Pseudotolithus typus",
    "url": "https://www.fishbase.se/summary/Pseudotolithus-typus.html"
   },
   {
    "label": "FishBase — Pseudotolithus elongatus",
    "url": "https://www.fishbase.se/summary/Pseudotolithus-elongatus.html"
   },
   {
    "label": "Wikipedia — Pseudotolithus senegalensis",
    "url": "https://en.wikipedia.org/wiki/Pseudotolithus_senegalensis"
   },
   {
    "label": "IGFA — World Records search",
    "url": "https://igfa.org/igfa-world-records-search/"
   }
  ]
 },
 "gorean-snapper": {
  "otherNames": "Gorean lagoon snapper or pink snapper; vivaneau de Gorée in French; luciano da Goreia in Portuguese.",
  "family": "Lutjanidae, the snappers.",
  "nativeRange": "The West African coast from Senegal to Congo, mostly in the Gulf of Guinea and around the Cape Verde Islands.",
  "habitat": "Rocky bottoms and coral reefs from the shore to about 50 m (165 ft). Young fish are common in coastal water, particularly in estuaries, and sometimes in the lower reaches of rivers.",
  "temp": "Tropical. AquaMaps puts its preferred surface water at about 25–28°C (76–82°F).",
  "record": "IGFA all-tackle world record: 7.26 kg (16 lb 0 oz), Leon Mark Weeks, Port-Gentil, Gabon, 11 April 2022.",
  "lifespan": "Not well documented.",
  "diet": "Fish and bottom-living invertebrates such as crabs and shrimps.",
  "spawning": "Little studied. Like other snappers it spawns at sea, and its young settle in estuaries and coastal shallows.",
  "young": "Juveniles are plain brownish and live in estuaries and coastal shallows; studies have measured them at about 8–20 cm.",
  "mouth": "A pointed head with a broad bone below the eye; the upper jaw reaches to about the middle of the eye, and both jaws carry canine teeth.",
  "lookalikes": "African red snapper (Lutjanus agennes) has no blue line on the cheek and very dark tips to the pelvic fins; African brown snapper (Lutjanus dentatus) is smoky grey, with scale rows that rise obliquely above the lateral line. The Gorean snapper’s scale rows on the back run parallel to the lateral line, and the blue line under its eye is the best tell.",
  "eating": "A good table fish, marketed fresh.",
  "status": "Data Deficient on the IUCN Red List (2013).",
  "typicalCm": [
   30,
   50
  ],
  "maxCm": 80,
  "faqs": [
   {
    "q": "Where does the name Gorean snapper come from?",
    "a": "From Gorée, the small island off Dakar in Senegal, after which the species was named."
   },
   {
    "q": "How big do Gorean snappers get?",
    "a": "Most are 30–50 cm (12–20 in), and the species reaches about 80 cm (31 in). Off Lagos, fish sampled in 2008–2010 reached 56 cm and 3 kg; the IGFA world record is 7.26 kg (16 lb 0 oz), from Port-Gentil, Gabon, in 2022."
   },
   {
    "q": "How do I tell a Gorean snapper from an African red snapper?",
    "a": "Look under the eye: the Gorean snapper has a thin blue line, whole or broken, from the upper jaw to the corner of the gill cover. The African red snapper has none, has very dark tips to its pelvic fins and grows much larger — its IGFA record is 60 kg."
   }
  ],
  "sources": [
   {
    "label": "FishBase — Lutjanus goreensis",
    "url": "https://www.fishbase.se/summary/Lutjanus-goreensis.html"
   },
   {
    "label": "FishBase — Lutjanus goreensis population characteristics",
    "url": "https://www.fishbase.se/PopDyn/PopCharList.php?ID=1439&GenusName=Lutjanus&SpeciesName=goreensis"
   },
   {
    "label": "FishBase — Lutjanus agennes",
    "url": "https://www.fishbase.se/summary/Lutjanus-agennes.html"
   },
   {
    "label": "FishBase — Lutjanus dentatus",
    "url": "https://www.fishbase.se/summary/Lutjanus-dentatus.html"
   },
   {
    "label": "IGFA — World Records search",
    "url": "https://igfa.org/igfa-world-records-search/"
   }
  ]
 },
 "silver-catfish": {
  "otherNames": "Silver catfish or bagrid catfish in Nigeria, and obokun in Yoruba; mâchoiron in French-speaking West Africa, a name it shares with its relatives.",
  "family": "Claroteidae, the claroteid catfishes; long placed with the bagrid catfishes, hence ‘bagrid catfish’.",
  "nativeRange": "West and west-central Africa from Senegal to Cabinda in Angola, reported north to Mauritania and south to the lower Congo River and the coastal rivers of Angola.",
  "habitat": "Rivers, lakes, reservoirs and brackish coastal lagoons; adults keep to shallow water less than about 4 m (13 ft) deep over mud and fine sand.",
  "temp": "Warm water: FishBase gives 22–28°C (72–82°F).",
  "record": "IGFA keeps no category for it. The largest recorded fish measured 65 cm to the base of the tail (FishBase).",
  "lifespan": "Not well documented.",
  "diet": "Omnivorous on the bottom: seeds, insects, small clams and detritus; larger fish take more prawns, crabs and small fish.",
  "spawning": "Once a year. In Nigeria’s Badagry lagoon the fish ripen from October and spawn in December and January, in pairs, in dark hollows over sand or mud. Females mature at about 29–32 cm and males at 30–35 cm total length.",
  "mouth": "A rather small mouth under a pointed snout, with a broad band of teeth in the upper jaw and four pairs of barbels.",
  "lookalikes": "Its smaller relative Chrysichthys auratus usually has the first branched dorsal ray drawn out into a long filament. Sea catfishes, which share the lagoons, have no barbels at the nostrils; sharptooth catfish has a long dorsal fin with no spine and no small fleshy fin before the tail.",
  "eating": "Highly valued fresh or smoked in Nigeria and Côte d’Ivoire, where it is also farmed.",
  "status": "Least Concern on the IUCN Red List (2019).",
  "typicalCm": [
   25,
   45
  ],
  "maxCm": 65,
  "faqs": [
   {
    "q": "What is the silver catfish of Lagos?",
    "a": "Chrysichthys nigrodigitatus, a claroteid catfish of rivers, lakes and brackish lagoons from Senegal to Angola. In the Lagos, Lekki and Badagry lagoons it is one of the most valued food fish, and it is farmed in Nigeria."
   },
   {
    "q": "When does the silver catfish spawn?",
    "a": "Once a year. A study in Badagry lagoon found the fish ripening from October and spawning in December and January, in pairs, in dark hollows on the bottom."
   },
   {
    "q": "Is the silver catfish dangerous to handle?",
    "a": "Its dorsal fin and each pectoral fin carry a stiff, sharp spine that can give a painful wound. Hold the fish firmly behind the head and keep your fingers clear of the spines."
   }
  ],
  "sources": [
   {
    "label": "FishBase — Chrysichthys nigrodigitatus",
    "url": "https://www.fishbase.se/summary/Chrysichthys-nigrodigitatus.html"
   },
   {
    "label": "FishBase — Chrysichthys auratus",
    "url": "https://www.fishbase.se/summary/Chrysichthys-auratus.html"
   },
   {
    "label": "Ezenwa, A study of the reproductive biology of the catfish Chrysichthys nigrodigitatus in Nigeria — University of Lagos thesis (1981)",
    "url": "https://ir.unilag.edu.ng/items/79131786-ac98-4482-a961-b07e31891064"
   }
  ]
 },
 "milkfish": {
  "otherNames": "Bangus in the Philippines, bandeng or bolu in Indonesia, awa in Hawaii.",
  "family": "Chanidae — the only living member of its family.",
  "nativeRange": "The tropical and subtropical Indo-Pacific, from South Africa and the Red Sea to Hawaii and the Marquesas, north to Japan and south to Victoria, Australia; and the eastern Pacific from San Pedro, California, to the Galápagos.",
  "habitat": "Offshore water and shallow coastal bays around continents and islands where the sea is warmer than about 20°C; schools gather where reefs are well developed. It often enters estuaries, and occasionally fresh water.",
  "temp": "Tropical. AquaMaps puts its preferred surface water at about 21–29°C (70–84°F); FishBase records it in water of 15–43°C in ponds and lagoons.",
  "record": "IGFA all-tackle world record: 19.73 kg (43 lb 7 oz), Javier Vairo Puig, Bocana el Cordonsillo, Costa del Sol, El Salvador, 1 February 2012.",
  "lifespan": "Up to about 15 years (FishBase).",
  "diet": "Cyanobacteria, soft algae and small bottom invertebrates, and even the eggs and larvae of other fish; the larvae eat zooplankton.",
  "spawning": "At night, in clear, shallow water over sand or coral no more than about 30 km from shore, and only in full-strength sea water. A female sheds up to 5 million eggs, which hatch in about a day; the larvae drift for two to three weeks before heading inshore. Wild fish take three to five years to mature.",
  "young": "Older larvae settle in mangroves, estuaries and coastal lagoons, and juveniles return to the sea to mature. Wild fry gathered along shores and river mouths have stocked fish ponds in South-East Asia for centuries.",
  "mouth": "Small and toothless.",
  "lookalikes": "Bonefish and ladyfish are also silver and fork-tailed, but the bonefish has a pointed snout with the mouth underneath and the ladyfish a large, toothed mouth. Mullets have two separate dorsal fins; the milkfish has one.",
  "eating": "Excellent but very bony, with many fine bones in the flesh; deboned ‘boneless bangus’ is sold across the Philippines. One of the most important farmed fish in South-East Asia, sold fresh, smoked, canned and frozen.",
  "status": "Least Concern on the IUCN Red List (2016).",
  "typicalCm": [
   60,
   100
  ],
  "maxCm": 180,
  "faqs": [
   {
    "q": "Can you catch milkfish on a rod?",
    "a": "Yes, but it takes patience: milkfish graze on algae and seldom take ordinary baits or lures. Fly anglers on the Seychelles atolls catch them with small algae flies cast to feeding fish, and once hooked they make long, fast runs."
   },
   {
    "q": "Why is milkfish so bony?",
    "a": "Its flesh is laced with fine intermuscular bones. In the Philippines and Indonesia, where it is a staple farmed fish, much of it is sold deboned or pressure-cooked until the bones soften."
   },
   {
    "q": "Where do milkfish live in Africa?",
    "a": "Along the East African coast from the Red Sea to South Africa, and around Madagascar, the Seychelles and Mauritius — over sand flats, in lagoons and in the mangrove estuaries where the young grow up."
   }
  ],
  "sources": [
   {
    "label": "FishBase — Chanos chanos",
    "url": "https://www.fishbase.se/summary/Chanos-chanos.html"
   },
   {
    "label": "Wikipedia — Milkfish",
    "url": "https://en.wikipedia.org/wiki/Milkfish"
   },
   {
    "label": "IGFA — World Records search",
    "url": "https://igfa.org/igfa-world-records-search/"
   }
  ]
 },
 "mangrove-red-snapper": {
  "otherNames": "River snapper, rock salmon or river roman in South Africa; mangrove jack in Australia; also mangrove snapper, red snapper and red bream.",
  "family": "Lutjanidae, the snappers.",
  "nativeRange": "The tropical Indo-West Pacific: from the Red Sea and Persian Gulf down the East African coast to South Africa — estuaries as far south as Gqeberha (Port Elizabeth) — and east to Samoa and the Line Islands, north to the Ryukyus and south to Australia. It has reached the eastern Mediterranean through the Suez Canal but is not established there.",
  "habitat": "Juveniles and young adults live in mangrove estuaries, tidal creeks and the lower reaches of rivers, among rocks and mangrove roots, where they tolerate very low salinity. Adults move out to coral and rocky reefs down to 80–120 m (260–400 ft).",
  "temp": "Tropical to subtropical. AquaMaps puts its preferred surface water at about 23–29°C (74–85°F); FishBase gives a range of 16–30°C.",
  "record": "IGFA all-tackle world record: 11.62 kg (25 lb 9 oz), Takuya Kano, Ashizuri Misaki, Kochi, Japan, 3 May 2006. South African records are heavier: 14.1 kg (31 lb) on shore tackle and 16.6 kg (36 lb 10 oz) by spearfishing.",
  "lifespan": "Long-lived: aged to 31 years in Papua New Guinea and up to 39 years off eastern Australia.",
  "diet": "Mostly at night: mullet and other baitfish ambushed from under ledges and mangrove roots in estuaries; on reefs, small fish, crabs and crayfish.",
  "spawning": "At sea on offshore reefs — off northern KwaZulu-Natal and Mozambique, it is thought, in South African waters — in the southern spring and summer, October to March in Queensland, and through the year nearer the equator. Spawning peaks around the full moon. In Queensland males mature at about 47 cm and females at 53 cm fork length.",
  "young": "Thirty to fifty days after hatching, juveniles of 2–5 cm move into mangrove estuaries and the lower reaches of freshwater streams. They carry about eight pale bars on the sides and two blue lines across the cheek.",
  "mouth": "Prominent canine teeth at the front of both jaws, for seizing prey — and fingers.",
  "lookalikes": "Two-spot red snapper (red bass, Lutjanus bohar) of the reefs is darker, with a deep groove from the nostril to the eye and scale rows that rise obliquely from the lateral line; it is a well-known carrier of ciguatera. The river snapper’s scale rows on the back run more or less parallel to the lateral line.",
  "eating": "Excellent: firm, sweet, white flesh, and a valuable market and farmed fish in Asia. In South Africa it is a no-sale species. Ciguatera has been reported.",
  "status": "Least Concern on the IUCN Red List (2015). In South Africa catch rates in the Kosi Bay fisheries fell between the 1980s and 1990s, and the loss of estuary habitat in KwaZulu-Natal is thought to have hit it hard.",
  "typicalCm": [
   40,
   80
  ],
  "maxCm": 150,
  "faqs": [
   {
    "q": "Is a river snapper the same as a mangrove jack?",
    "a": "Yes. River snapper, rock salmon and river roman are South African names for Lutjanus argentimaculatus, which Australians call the mangrove jack and the FAO and IGFA the mangrove red snapper."
   },
   {
    "q": "What is the bag limit for river snapper in South Africa?",
    "a": "Five a day at 40 cm or more, on a DFFE recreational permit. It is a recreational species and may not be sold."
   },
   {
    "q": "Where do you catch river snapper?",
    "a": "In estuaries and mangrove creeks, tight against rocks, ledges, fallen trees and mangrove roots — Kosi Bay and St Lucia in KwaZulu-Natal and the creeks of the East African coast. The big adults live on offshore reefs and are taken from boats."
   }
  ],
  "sources": [
   {
    "label": "FishBase — Lutjanus argentimaculatus",
    "url": "https://www.fishbase.se/summary/Lutjanus-argentimaculatus.html"
   },
   {
    "label": "FishBase — Lutjanus bohar",
    "url": "https://www.fishbase.se/summary/Lutjanus-bohar.html"
   },
   {
    "label": "Mann (ed.), Southern African Marine Linefish Species Profiles — ORI Special Publication 9 (2013)",
    "url": "https://www.oritag.org.za/Content/UserContent/documents/Southern_African_Marine_Linefish_Species_Profiles.pdf"
   },
   {
    "label": "ORI — Marine recreational fishing regulations in South Africa",
    "url": "https://www.oritag.org.za/Content/UserContent/documents/Linefishing-regs-for-the-smart-phone-interactive.pdf"
   },
   {
    "label": "Wikipedia — Mangrove red snapper",
    "url": "https://en.wikipedia.org/wiki/Mangrove_red_snapper"
   },
   {
    "label": "IGFA — World Records search",
    "url": "https://igfa.org/igfa-world-records-search/"
   }
  ]
 },
 "talang-queenfish": {
  "otherNames": "Largemouth queenfish, giant queenfish, giant leatherskin, leatherskin or leatherjacket; often simply queenfish or queenie.",
  "family": "Carangidae, the jacks and pompanos; some recent classifications place the queenfishes with the pompanos in Trachinotidae.",
  "nativeRange": "The Indo-West Pacific, from South Africa, the Red Sea and the Persian Gulf east through Indonesia and Papua New Guinea to New Caledonia, north to southern Japan and south to Western Australia and New South Wales. In southern Africa from Algoa Bay north through KwaZulu-Natal and Mozambique; it was first described from Fort Dauphin (Tolagnaro), Madagascar.",
  "habitat": "Coastal water down to about 50 m (165 ft), often near reefs and offshore islands, usually in small groups. It enters estuaries and turbid water but avoids very low salinity.",
  "temp": "Tropical. AquaMaps puts its preferred surface water at about 24–29°C (76–85°F).",
  "record": "IGFA all-tackle world record: 17.89 kg (39 lb 7 oz), Craig Oliver, Umkomaas, South Africa, 23 May 2010.",
  "lifespan": "Up to 15–16 years in northern Australia.",
  "diet": "Small pelagic and bottom fish, squid, mantis shrimps and swimming crabs. Young fish rasp scales and skin from other fish, then move on to mysids, small prawns and fish.",
  "spawning": "Not studied in African waters. In northern Australia it spawns over a long season, from about August or September to March, and females mature at four to five years and about 64 cm fork length.",
  "young": "Small juveniles have not been recorded in South African estuaries, but sub-adults are fairly common in St Lucia, Durban Bay and Richards Bay.",
  "mouth": "A large mouth with several rows of very sharp teeth; young fish have specialised teeth for scraping scales.",
  "lookalikes": "Doublespotted queenfish (Scomberoides lysan) is usually smaller, with a row of dark spots on each side of the lateral line; needlescaled queenfish (Scomberoides tol) is smaller still, with the outer half of the dorsal-fin lobe black. The talang has a single row of big blotches and no dark tip to the dorsal lobe.",
  "eating": "Edible, with firm white flesh, and best bled and eaten fresh. In South Africa it is mainly a sport fish, seldom caught commercially.",
  "status": "Least Concern on the IUCN Red List (2015). Not assessed in South Africa; in northern Australia a 2006 assessment found the stock overfished.",
  "typicalCm": [
   60,
   100
  ],
  "maxCm": 120,
  "faqs": [
   {
    "q": "How big do queenfish get?",
    "a": "Most are 60–100 cm (24–39 in), and the species reaches 120 cm (47 in). The IGFA world record, 17.89 kg (39 lb 7 oz), was caught at Umkomaas, KwaZulu-Natal, in 2010."
   },
   {
    "q": "Are queenfish spines venomous?",
    "a": "Their dorsal and anal spines are sharp, and anglers report painful wounds from them; FishBase records venomous fin spines in a smaller relative, the needlescaled queenfish. Handle any queenfish with a cloth or lip grip and keep clear of the spines."
   },
   {
    "q": "When is the best time for queenfish in South Africa?",
    "a": "Summer. They are most plentiful in KwaZulu-Natal in the warm months, when shore, ski-boat and estuary anglers catch them, particularly in St Lucia and Durban Bay."
   }
  ],
  "sources": [
   {
    "label": "FishBase — Scomberoides commersonnianus",
    "url": "https://www.fishbase.se/summary/Scomberoides-commersonnianus.html"
   },
   {
    "label": "FishBase — Scomberoides lysan",
    "url": "https://www.fishbase.se/summary/Scomberoides-lysan.html"
   },
   {
    "label": "Wikipedia — Doublespotted queenfish",
    "url": "https://en.wikipedia.org/wiki/Doublespotted_queenfish"
   },
   {
    "label": "FishBase — Scomberoides tol",
    "url": "https://www.fishbase.se/summary/Scomberoides-tol.html"
   },
   {
    "label": "Mann (ed.), Southern African Marine Linefish Species Profiles — ORI Special Publication 9 (2013)",
    "url": "https://www.oritag.org.za/Content/UserContent/documents/Southern_African_Marine_Linefish_Species_Profiles.pdf"
   },
   {
    "label": "ORI — Marine recreational fishing regulations in South Africa",
    "url": "https://www.oritag.org.za/Content/UserContent/documents/Linefishing-regs-for-the-smart-phone-interactive.pdf"
   },
   {
    "label": "Wikipedia — Scomberoides commersonnianus",
    "url": "https://en.wikipedia.org/wiki/Scomberoides_commersonnianus"
   },
   {
    "label": "IGFA — World Records search",
    "url": "https://igfa.org/igfa-world-records-search/"
   }
  ]
 },
 "spangled-emperor": {
  "otherNames": "Blue emperor, mata-hari or scavenger in South Africa; changu on the Swahili coast; sand snapper, north-west snapper and yellow sweetlip in Australia; sheri in the Persian Gulf.",
  "family": "Lethrinidae, the emperors.",
  "nativeRange": "The Indo-West Pacific, from the Red Sea, the Persian Gulf and East Africa to southern Japan, Samoa and Australia. In South Africa it is confirmed only as far south as Sodwana Bay; emperors further south were described in 2022 as a separate species, Lethrinus scoparius.",
  "habitat": "Coral and rocky reefs, sand between reefs, coralline lagoons, seagrass beds and mangroves, from about 10 to 75 m (33–250 ft). Adults live alone or in small schools and move deeper as they age.",
  "temp": "Tropical. AquaMaps puts its preferred surface water at about 23–29°C (73–84°F).",
  "record": "IGFA all-tackle world record: 9.45 kg (20 lb 13 oz), Takuya Kano, Muroto, Kochi, Japan, 19 September 2002.",
  "lifespan": "Up to 28 years (FishBase).",
  "diet": "Sea urchins and other echinoderms, molluscs and crustaceans, with some worms and small fish.",
  "spawning": "Not studied in African waters. Studies elsewhere report spawning through the year or with spring and summer peaks, on shallow reefs. Fish mature at about 28–46 cm, at three to nine years; some appear to change from female to male while still young.",
  "young": "Juveniles form large schools over shallow, sheltered sand, seagrass and mangroves.",
  "mouth": "A long snout with thick lips, canine teeth at the front of the jaws and rounded or molar-like teeth at the sides for crushing shells.",
  "lookalikes": "Pink ear emperor (Lethrinus lentjan) is smaller, with a red edge to the gill cover and sometimes a red pectoral base. Lethrinus scoparius, the emperor of KwaZulu-Natal south of Sodwana and of the Eastern Cape, was long taken for the spangled emperor.",
  "eating": "Excellent, and a highly commercial fish. FishBase notes that Indian Ocean fish may have a coppery or iodine taste or smell. Ciguatera has been reported.",
  "status": "Least Concern on the IUCN Red List (2023).",
  "typicalCm": [
   40,
   70
  ],
  "maxCm": 87,
  "faqs": [
   {
    "q": "Is the spangled emperor found in South Africa?",
    "a": "Only in the far north of KwaZulu-Natal: it is confirmed south to Sodwana Bay and caught from the shore from Kosi Bay northwards. The similar emperors caught further south, off KwaZulu-Natal and the Eastern Cape, were described as a separate species, Lethrinus scoparius, in 2022."
   },
   {
    "q": "What is the best bait for spangled emperor?",
    "a": "Squid, crab, prawn or cut fish on the bottom over sand next to reef. It feeds on sea urchins, shellfish and crabs, so a crab bait is hard to beat; small jigs and soft plastics dragged slowly along the bottom also work."
   },
   {
    "q": "How big do spangled emperors get?",
    "a": "Most are 40–70 cm (16–28 in), and the largest reach 87 cm (34 in). The IGFA world record is 9.45 kg (20 lb 13 oz), from Muroto, Japan, in 2002."
   }
  ],
  "sources": [
   {
    "label": "FishBase — Lethrinus nebulosus",
    "url": "https://www.fishbase.se/summary/Lethrinus-nebulosus.html"
   },
   {
    "label": "FishBase — Lethrinus lentjan",
    "url": "https://www.fishbase.se/summary/Lethrinus-lentjan.html"
   },
   {
    "label": "Mann (ed.), Southern African Marine Linefish Species Profiles — ORI Special Publication 9 (2013)",
    "url": "https://www.oritag.org.za/Content/UserContent/documents/Southern_African_Marine_Linefish_Species_Profiles.pdf"
   },
   {
    "label": "ORI — Marine recreational fishing regulations in South Africa",
    "url": "https://www.oritag.org.za/Content/UserContent/documents/Linefishing-regs-for-the-smart-phone-interactive.pdf"
   },
   {
    "label": "Wikipedia — Lethrinus nebulosus",
    "url": "https://en.wikipedia.org/wiki/Lethrinus_nebulosus"
   },
   {
    "label": "IGFA — World Records search",
    "url": "https://igfa.org/igfa-world-records-search/"
   }
  ]
 }
};

/** The "Size" row of a fish's facts. */
export const sizeText = (f: Pick<FishFacts, "typicalCm" | "maxCm">) =>
  `Most adults ${f.typicalCm[0]}–${f.typicalCm[1]} cm (${Math.round(f.typicalCm[0] / 2.54)}–${Math.round(f.typicalCm[1] / 2.54)} in); the largest measured about ${f.maxCm} cm (${Math.round(f.maxCm / 2.54)} in).`;
