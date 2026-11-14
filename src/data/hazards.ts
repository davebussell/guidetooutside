/**
 * The hazard roster: poisonous and dangerous plants and fungi a forager may
 * meet, matched against the species recorded near a place (the "Hazards"
 * panel of /foraging/<town>).
 *
 * Extracted from the stored flora records in the Netlify Blobs backup
 * (`rec:v1:flora:*` → value.hazards[].hazard, the live objects with the live
 * field names), checked word for word against every hazard card on the
 * captured /foraging/<town> pages. 63 entries were recovered. Two more existed
 * on the live site — public/hazards/ has photographs for Conocybe filaris and
 * Clitocybe dealbata — but neither was ever recorded near a captured place, so
 * their text could not be recovered. Photographs and credits:
 * src/data/hazard-images.json, keyed by the slug of `latin`.
 */

export type HazardSeverity = "deadly" | "serious" | "irritant";

export type Hazard = {
  /** Binomial, or the genus when `genus` is set ("Senecio (the whole genus)"). */
  latin: string;
  genus?: boolean;
  name: string;
  group: "plant" | "fungus";
  severity: HazardSeverity;
  /** "Mistaken for": true wherever the plant or fungus is recorded. */
  confusedWith: string;
  /**
   * What holds only on one continent (where it grows wild or where the poisoning happened): a sentence added to
   * "Mistaken for", and a name used in place of `name`, for places on that continent only (audit, 5 November 2026:
   * South African and European notes were printed on Great Plains pages; audit of 10 November 2026: "naboom",
   * "syringa" and "tickberry" were part of the names printed on US pages, and stored records kept the old text).
   * Applied when the card is shown (hazardHere), never stored into a record.
   */
  regional?: { continent: "africa" | "europe" | "north-america"; text?: string; name?: string };
  /** "Distinguishing features" */
  tell: string;
  /** "Effects" */
  effect: string;
};

export const SEVERITY_LABEL: Record<HazardSeverity, string> = {
  deadly: "Potentially fatal",
  serious: "Serious poisoning",
  irritant: "Irritant",
};

export const HAZARDS: Hazard[] = [
 {
  "latin": "Datura",
  "genus": true,
  "name": "Thorn apple (Datura)",
  "group": "plant",
  "severity": "deadly",
  "confusedWith": "Young plants come up among wild greens in fields and gardens, and children eat the seeds.",
  "regional": { "continent": "africa", "text": "In southern and East Africa it grows among amaranth (morogo) in maize fields." },
  "tell": "A coarse, rank-smelling plant with large, irregularly toothed leaves, big upright trumpet flowers, white or purple, and a spiny, walnut-sized capsule packed with small dark seeds. Amaranth has smooth-edged leaves and only bristly flower spikes.",
  "effect": "Atropine and scopolamine: dry mouth, hot flushed skin, a racing heart, huge pupils, then delirium and hallucinations that can last a day or more. It has killed adults and children."
 },
 {
  "latin": "Ricinus communis",
  "name": "Castor oil plant",
  "group": "plant",
  "severity": "deadly",
  "confusedWith": "Its mottled seeds look like beans, or like fat ticks, and children pick them up; it grows as a weed on riverbanks, roadsides and rubbish heaps.",
  "regional": { "continent": "africa", "text": "It is a common weed across Africa." },
  "tell": "Big, glossy, hand-shaped leaves with five to eleven pointed, toothed lobes, often flushed red; spiny three-lobed seed capsules; and smooth, shiny, bean-like seeds mottled brown and grey with a small pale cap at one end.",
  "effect": "Ricin. Four to eight chewed seeds are considered a lethal dose for an adult: burning mouth, then bloody diarrhoea, dehydration and collapse over several days. Seeds swallowed whole may pass unbroken, but never count on it."
 },
 {
  "latin": "Lantana camara",
  "name": "Lantana",
  "group": "plant",
  "severity": "serious",
  "confusedWith": "Blackberry-like clusters of small dark berries that children pick.",
  "regional": { "continent": "africa", "name": "Lantana (tickberry)", "text": "It smothers forest edges, roadsides and farmland across East and southern Africa." },
  "tell": "A scrambling shrub with square, prickly stems, rough leaves that smell sharp when crushed, flat clusters of tiny flowers that change colour as they age (yellow to orange, pink or red), and tight bunches of small berries ripening green to glossy purple-black.",
  "effect": "The green, unripe berries are the dangerous ones: vomiting, diarrhoea and difficulty breathing have been reported in people. Livestock that eat the leaves suffer liver damage and severe sunburn."
 },
 {
  "latin": "Euphorbia",
  "genus": true,
  "name": "Euphorbias (milk bushes, pencil tree)",
  "group": "plant",
  "severity": "serious",
  "confusedWith": "Cacti such as prickly pear: some succulent euphorbias look just like them.",
  "regional": { "continent": "africa", "name": "Euphorbias (milk bushes, naboom, pencil tree)", "text": "Many African euphorbias are spiny, leafless succulents that look exactly like cacti, and pencil-stick hedges of Euphorbia tirucalli stand around farms and villages." },
  "tell": "Break a stem: a euphorbia bleeds white milky latex at once. Cacti such as prickly pear bleed clear or slimy sap, and their spines grow from small fuzzy cushions; euphorbia spines grow singly or in pairs, never from a cushion.",
  "effect": "The latex burns skin and mouth, and in the eye can cause temporary blindness. Wear gloves and eye protection near a cut plant, and never rub your eyes."
 },
 {
  "latin": "Cascabela thevetia",
  "name": "Yellow oleander",
  "group": "plant",
  "severity": "deadly",
  "confusedWith": "Nothing edible, but it is grown as a hedge and garden shrub, and children play with the hard seeds.",
  "regional": { "continent": "africa", "text": "It is a common hedge and garden shrub across tropical Africa." },
  "tell": "Narrow, glossy, willow-like leaves; funnel-shaped flowers, usually yellow, sometimes apricot or white; and a fleshy fruit that ripens red to black around one large, hard seed. Twigs bleed milky sap.",
  "effect": "Cardiac glycosides that drying and cooking do not destroy: vomiting, then a dangerously slow, irregular heartbeat. Every part is toxic; swallowing the seeds is a common means of suicide in South Asia."
 },
 {
  "latin": "Nerium oleander",
  "name": "Oleander",
  "group": "plant",
  "severity": "deadly",
  "confusedWith": "Nothing edible, but it is planted along roads and in gardens everywhere, and its straight green stems look like ready-made skewers.",
  "tell": "A shrub with long, narrow, leathery leaves in pairs or threes, each with a strong pale midrib; clusters of pink, white or red flowers; and long, thin pods of fluffy seeds.",
  "effect": "Cardiac glycosides in every part. It is bitter, so serious poisoning is uncommon, but toddlers have died after eating the leaves. Never use its stems as skewers or its leaves for tea."
 },
 {
  "latin": "Melia azedarach",
  "name": "Chinaberry",
  "group": "plant",
  "severity": "serious",
  "confusedWith": "Children pick up the berries under the trees, which are planted for shade.",
  "regional": { "continent": "africa", "name": "Chinaberry (syringa)", "text": "It has run wild in South Africa, where it is called syringa." },
  "tell": "A tree with large, twice-divided leaves of toothed leaflets, sprays of fragrant lilac flowers in spring, and smooth, round, marble-sized berries that turn yellow and hang on the bare branches through winter.",
  "effect": "Neurotoxins concentrated in the fruit: vomiting, bloody diarrhoea, confusion and convulsions a few hours after eating. Poisoning has followed as few as six to nine fruits."
 },
 {
  "latin": "Acokanthera",
  "genus": true,
  "name": "Poison-bush (Acokanthera)",
  "group": "plant",
  "severity": "deadly",
  "confusedWith": "Num-num (Natal plum), in the same family, with the same glossy leaves, sweet-scented white flowers and red fruit.",
  "regional": { "continent": "africa", "text": "The dune poison-bush grows in the same coastal bush as num-num, from the Eastern Cape to KwaZulu-Natal." },
  "tell": "Look for thorns. A num-num carries sharp, forked, Y-shaped spines; Acokanthera has none, and its fruit ripens from red to purple-black.",
  "effect": "Cardiac glycosides that slow the heart. Every part is toxic, the fruit included — especially unripe — and the seeds."
 },
 // Audit of 10 November 2026 (Day 4, the five Florida towns): "A single seed, well chewed, can kill an adult or a child"
 // had no source giving a per-seed figure, and the case report the auditor read (Reedman, Shih and Hung, West J Emerg Med
 // 2008, https://westjem.com/?p=3571) describes a patient who swallowed 10 ground seeds and recovered; "far more potent
 // than ricin" had no source either. The effect now says what the German Federal Institute for Risk Assessment says, per
 // seed and per age:
 // source: BfR Communication No. 024/2019, "Jequirity bean, castor oil plant & Co.", 3 July 2019 (read 2026-11-13):
 //   "With 75 μg (micrograms), even a single seed contains enough abrin to induce severe poisoning in an adult"; "In
 //   children, a dose between 75 μg and 150 μg can lead to death"; "If the seed is swallowed whole, the risk of poisoning
 //   is low due to the sturdy outer shell", the toxin being released when the shell is damaged (drilled for jewellery,
 //   chewed); symptoms "can occur after a few hours to two days"; "Ricin has a great structural similarity to abrin"
 //   https://www.bfr.bund.de/cm/349/jequirity-bean-castor-oil-plant-and-co-exotic-souvenirs-can-contain-poisonous-plant-seeds.pdf
 // source: CDC, Abrin (chemical fact sheet, last reviewed 11 June 2026; read 2026-11-13): "Within several days, the
 //   person's liver, spleen, and kidneys might stop working, and the person could die"
 //   https://cdc.gov/chemical-emergencies/chemical-fact-sheets/abrin.html
 {
  "latin": "Abrus precatorius",
  "name": "Rosary pea (crab's eye)",
  "group": "plant",
  "severity": "deadly",
  "confusedWith": "Nothing anyone eats on purpose — but the glossy scarlet seeds with a black eye are strung as beads and lucky charms, and children pick them up and chew them.",
  "tell": "A slender twining vine with feathery leaves of many small paired leaflets, and short pods that curl open to show hard, shiny, pea-sized seeds: bright red with one black spot.",
  "effect": "Abrin, a poison much like the castor bean's ricin. Once the hard seed coat is broken, by chewing or by drilling for beads, one seed holds enough to poison an adult severely, and one or two can kill a child; a seed swallowed whole carries a low risk. Vomiting, diarrhoea and cramps start a few hours to two days later; within several days the liver and kidneys can fail."
 },
 {
  "latin": "Phytolacca americana",
  "name": "Pokeweed",
  "group": "plant",
  "severity": "serious",
  "confusedWith": "The berries look like elderberries.",
  "regional": { "continent": "north-america", "text": "Its shoots are a traditional green in the American South." },
  "tell": "Thick magenta stem and berries in a drooping raceme, each with a flattened top. Elderberries sit in a flat-topped cluster on green stems.",
  "effect": "Roots, seeds and mature plant are toxic; the young shoots are eaten only after several changes of boiling water, and people are hospitalised every year for skipping that."
 },
 {
  "latin": "Senecio",
  "genus": true,
  "name": "Ragworts and groundsels (Senecio)",
  "group": "plant",
  "severity": "deadly",
  "confusedWith": "Wild greens and herbal teas.",
  "regional": { "continent": "africa", "text": "Senecio in home-grown wheat flour poisoned whole families in South Africa's George district in 1918." },
  "tell": "Daisy-family plants with yellow flower heads (with or without petals), each head wrapped in a single row of narrow green bracts, often black-tipped, and seeds carrying white fluffy parachutes. A yellow daisy you can't name does not go in the pot.",
  "effect": "Pyrrolizidine alkaloids, which baking does not destroy. They block the small veins of the liver (veno-occlusive disease): pain, a swollen liver and fluid in the belly, and in many cases cirrhosis. Children are the most vulnerable."
 },
 {
  "latin": "Nicotiana glauca",
  "name": "Tree tobacco",
  "group": "plant",
  "severity": "deadly",
  "confusedWith": "Wild greens: its large, soft leaves have been picked and cooked as a spinach. It grows as a weed of roadsides, dry riverbeds and waste ground.",
  "regional": { "continent": "africa", "text": "It is an invasive weed in many parts of Africa." },
  "tell": "A lanky, hairless shrub or small tree with bluish-grey, rubbery, oval leaves up to 20 cm long, and loose clusters of narrow yellow tubular flowers about 5 cm long at the branch tips. No edible green has that waxy blue-grey colour and yellow trumpet.",
  "effect": "Anabasine, a nicotine relative: muscle weakness and paralysis that can stop the breathing after a meal of the cooked leaves. Every part is poisonous, raw or cooked, and ingestion has been fatal."
 },
 {
  "latin": "Ranunculus",
  "genus": true,
  "name": "Buttercups",
  "group": "plant",
  "severity": "irritant",
  "confusedWith": "Young greens gathered in damp meadows, and marsh marigold.",
  "tell": "Glossy five-petalled yellow flowers; the leaves are acrid and burn the tongue when tasted raw.",
  "effect": "Blisters the mouth and skin. Cooking destroys it, which is why marsh marigold is always boiled."
 },
 {
  "latin": "Amanita muscaria",
  "name": "Fly agaric",
  "group": "fungus",
  "severity": "serious",
  "confusedWith": "Rarely mistaken once it is open — but the buttons, before the cap expands, look like white eggs and get picked as puffballs.",
  "tell": "Cut any 'puffball' in half. Solid white all the way through is a puffball; the outline of a cap, gills and stem inside is an Amanita button.",
  "effect": "Ibotenic acid and muscimol: nausea, then confusion, agitation and deep sedation for several hours. Not usually fatal, but genuinely dangerous in children."
 },
 {
  "latin": "Hypholoma fasciculare",
  "name": "Sulphur tuft",
  "group": "fungus",
  "severity": "serious",
  "confusedWith": "Honey mushrooms and other autumn clusters on stumps.",
  "tell": "Sulphur-yellow to greenish gills and a bitter taste on the tip of the tongue. Honey mushroom has white to cream gills and a white spore print.",
  "effect": "Prolonged vomiting; in quantity it has caused liver damage."
 },
 {
  "latin": "Gloriosa superba",
  "name": "Flame lily",
  "group": "plant",
  "severity": "deadly",
  "confusedWith": "Wild yams and sweet potatoes: its pale, finger-like tubers have been dug and cooked as both.",
  "tell": "A climbing lily that clings with tendrils at the tips of its narrow, glossy leaves, and has spectacular flowers of six wavy, swept-back petals, red edged with yellow. Any tuber dug from under a climber with tendril-tipped leaves is not a yam.",
  "effect": "Colchicine. Burning throat, vomiting and diarrhoea within two to six hours, then failing blood, nerves and breathing over the following days. About 60 mg of colchicine is considered lethal, and the tubers and seeds are rich in it."
 },
 {
  "latin": "Chlorophyllum molybdites",
  "name": "Green-spored parasol",
  "group": "fungus",
  "severity": "serious",
  "confusedWith": "Shaggy parasol and true parasol mushroom, which it grows beside in lawns and parks.",
  "tell": "Take a spore print: this one is green, and its mature gills take on a dirty green tinge. Edible parasols print white.",
  "effect": "The most common cause of mushroom poisoning in North America. Violent vomiting and diarrhoea for hours; rarely fatal but regularly hospitalising."
 },
 {
  "latin": "Lepiota",
  "genus": true,
  "name": "Small parasols (Lepiota)",
  "group": "fungus",
  "severity": "deadly",
  "confusedWith": "Shaggy parasol and true parasol mushroom, which are larger relatives worth eating.",
  "tell": "The dangerous ones are small — a cap under about 8 cm — with brown scales on a pale ground and a ring. Size is the whole distinction, and it is not a comfortable one, so the safe rule is to leave every small scaly parasol alone.",
  "effect": "Several small Lepiota species carry amatoxins and have killed adults. There is no benefit that justifies the risk."
 },
 {
  "latin": "Toxicodendron radicans",
  "name": "Poison ivy",
  "group": "plant",
  "severity": "serious",
  "confusedWith": "Boxelder seedlings, Virginia creeper, and raspberry canes — it grows through everything worth picking.",
  "tell": "Three leaflets, the middle one on a longer stalk, and a hairy aerial rootlet on the climbing vine. Virginia creeper has five.",
  "effect": "Urushiol causes a blistering rash for weeks. Burning it is far worse — the smoke carries it into the lungs."
 },
 {
  "latin": "Scleroderma citrinum",
  "name": "Common earthball",
  "group": "fungus",
  "severity": "serious",
  "confusedWith": "Puffballs — it is round and it is on the ground.",
  "tell": "Cut it. An earthball has a thick hard rind and turns purple-black and marbled inside very early. An edible puffball is soft and pure white throughout, like a marshmallow.",
  "effect": "Violent gastrointestinal illness; the spore dust irritates the lungs."
 },
 {
  "latin": "Amanita bisporigera",
  "name": "Eastern destroying angel",
  "group": "fungus",
  "severity": "deadly",
  "confusedWith": "Button mushrooms, meadow mushrooms, and young puffballs picked before they open.",
  "tell": "Pure white gills that never turn pink or brown, and a sac-like cup at the very base of the stem — it sits below the soil, so you have to dig the whole mushroom up to see it. A puffball cut in half is solid white throughout; a young destroying angel shows the outline of a mushroom inside.",
  "effect": "Amatoxins destroy the liver. You feel fine for six to twelve hours, then violently ill, then apparently better — that false recovery is the liver failing. One cap is a lethal dose for an adult."
 },
 {
  "latin": "Omphalotus illudens",
  "name": "Jack-o'-lantern",
  "group": "fungus",
  "severity": "serious",
  "confusedWith": "Chanterelles — the colour is close enough that this is the classic beginner's mistake.",
  "tell": "True gills: sharp, blade-like, crowded, not forking. A chanterelle has blunt, forking ridges that run down the stem, grows singly from soil, and smells of apricots. Jack-o'-lanterns grow in tight clusters on wood or buried roots.",
  "effect": "Severe cramps, vomiting and diarrhoea lasting a day or more."
 },
 {
  "latin": "Toxicodendron diversilobum",
  "name": "Poison oak",
  "group": "plant",
  "severity": "serious",
  "confusedWith": "Oak seedlings and blackberry thickets on the Pacific coast.",
  "tell": "Three leaflets with scalloped oak-like lobes, glossy above, the middle leaflet on the longest stalk.",
  "effect": "The same urushiol rash as poison ivy, often more severe."
 },
 {
  "latin": "Omphalotus olivascens",
  "name": "Western jack-o'-lantern",
  "group": "fungus",
  "severity": "serious",
  "confusedWith": "Chanterelles, on the Pacific coast.",
  "tell": "Clustered on wood, with true sharp gills and an olive flush. Chanterelles have blunt forking ridges and come up singly from the ground.",
  "effect": "Severe gastrointestinal poisoning."
 },
 {
  "latin": "Amanita ocreata",
  "name": "Western destroying angel",
  "group": "fungus",
  "severity": "deadly",
  "confusedWith": "Button mushrooms and young puffballs, in oak country on the Pacific coast.",
  "tell": "White throughout, ring on the stem, sac-like base below the soil line. Fruits in spring under oaks, when people are out for morels.",
  "effect": "Amatoxin poisoning: delayed onset, then liver and kidney failure."
 },
 {
  "latin": "Mandragora autumnalis",
  "name": "Mandrake",
  "group": "plant",
  "severity": "serious",
  "confusedWith": "Borage, spinach and other winter greens gathered in Mediterranean fields and gardens.",
  "tell": "No stem: a flat rosette of large, wrinkled, dark green leaves pressed to the ground, with violet flowers in autumn or yellow-orange, tomato-like berries sitting in its centre. Borage stands up on stems covered in stiff bristles, with blue star-shaped flowers.",
  "effect": "Tropane alkaloids, like deadly nightshade’s: blurred vision, wide pupils, dry mouth, racing heart, vomiting, agitation and hallucinations."
 },
 {
  "latin": "Paxillus involutus",
  "name": "Brown roll-rim",
  "group": "fungus",
  "severity": "deadly",
  "confusedWith": "Assorted brown gilled mushrooms; it was eaten as an edible in Europe for generations.",
  "tell": "Inrolled felty cap margin, gills that bruise dark brown and can be rubbed off the cap, growing under birch.",
  "effect": "Sensitises the immune system over repeated meals, then one day triggers it to destroy the eater's own red blood cells. People have died after eating it safely for years."
 },
 {
  "latin": "Arisaema triphyllum",
  "name": "Jack-in-the-pulpit",
  "group": "plant",
  "severity": "serious",
  "confusedWith": "Trilliums and other spring woodland plants; the corm was used as food after long drying.",
  "tell": "Three leaflets on a tall stalk and a hooded flower like a pitcher with a lid.",
  "effect": "Needle-like calcium oxalate crystals that burn and swell the mouth and throat immediately. Swelling can close an airway."
 },
 {
  "latin": "Conium maculatum",
  "name": "Poison hemlock",
  "group": "plant",
  "severity": "deadly",
  "confusedWith": "Queen Anne's lace, wild chervil, cow parsley and garden parsley.",
  "tell": "The stem is hairless, smooth and blotched with purple, and the crushed leaves smell musty and unpleasant — some say of mouse. Queen Anne's lace has a bristly-hairy green stem and smells of carrot.",
  "effect": "Paralysis that climbs from the feet until breathing stops, with the mind clear throughout. This is what killed Socrates."
 },
 {
  "latin": "Amanita phalloides",
  "name": "Death cap",
  "group": "fungus",
  "severity": "deadly",
  "confusedWith": "Paddy straw mushrooms, young Agaricus, and anything picked as a 'field mushroom'.",
  "tell": "Greenish to olive cap with a faint metallic sheen, white gills, a ring, and a sac-like volva at the base. Introduced with European trees and now widespread, especially under oaks.",
  "effect": "Responsible for most fatal mushroom poisonings worldwide. Half a cap can kill an adult; symptoms start only after the damage is done."
 },
 {
  "latin": "Actaea rubra",
  "name": "Red baneberry",
  "group": "plant",
  "severity": "deadly",
  "confusedWith": "Red currants and other woodland berries.",
  "tell": "Glossy red berries in a tight cluster on a stout stalk, above compound toothed leaves. No currant-like flower remnant at the tip.",
  "effect": "As white baneberry: severe cardiac effects from a small number of berries."
 },
 {
  "latin": "Actaea pachypoda",
  "name": "White baneberry",
  "group": "plant",
  "severity": "deadly",
  "confusedWith": "Nothing edible, but the berries are conspicuous and children pick them.",
  "tell": "Porcelain-white berries each with a single black dot, on thick red stalks — the common name is doll's eyes.",
  "effect": "Cardiac sedative: a few berries cause severe symptoms in a child."
 },
 {
  "latin": "Chamaeleon gummifer",
  "name": "Distaff thistle (stemless atractylis)",
  "group": "plant",
  "severity": "deadly",
  "confusedWith": "Wild artichoke and other thistles eaten in North Africa; and children chew the sticky gum that oozes from it.",
  "tell": "A stemless thistle: a flat rosette of spiny leaves on the ground with a single big pinkish flower head sitting right in the middle, ringed by spiny bracts, in late summer and autumn. Its long root and the ripe head ooze a white or yellowish gum.",
  "effect": "Atractyloside and carboxyatractyloside shut down the cells' energy supply, with vomiting, convulsions and liver and kidney failure. It is a common cause of plant poisoning in Morocco: at least 98 deaths between 1981 and 2004, most of them children."
 },
 {
  "latin": "Taxus baccata",
  "name": "Yew",
  "group": "plant",
  "severity": "deadly",
  "confusedWith": "Its sweet red arils look like berries, and it lines churchyards, parks and hedges where foragers pick spruce tips and juniper.",
  "tell": "Flat, dark green needles in two rows, plain green underneath with no white stripes, and red fleshy cups open at one end with a hard seed showing. No cones, no resin smell.",
  "effect": "Taxine alkaloids stop the heart. The needles and the seed inside the red flesh are poisonous, there is no antidote, and about 50 g of needles can kill an adult."
 },
 {
  "latin": "Omphalotus olearius",
  "name": "Mediterranean jack-o’-lantern",
  "group": "fungus",
  "severity": "serious",
  "confusedWith": "Chanterelles, in southern Europe.",
  "tell": "Bright orange clusters growing from stumps and buried roots — especially of olive trees — with sharp, true, crowded gills running down the stem, and the same orange right through the flesh. A chanterelle grows singly from the soil, has blunt forking ridges, and is pale inside.",
  "effect": "Illudin S: severe cramps, vomiting and diarrhoea. Not normally fatal."
 },
 {
  "latin": "Aconitum",
  "genus": true,
  "name": "Monkshood",
  "group": "plant",
  "severity": "deadly",
  "confusedWith": "Wild horseradish and other roots, and its young leaves resemble several edible greens.",
  "tell": "Hooded blue-purple flowers and deeply palmate divided leaves. Every part, including the root.",
  "effect": "Absorbed through the skin as well as eaten. Numbness, then heart rhythm failure."
 },
 {
  "latin": "Sambucus ebulus",
  "name": "Dwarf elder (danewort)",
  "group": "plant",
  "severity": "serious",
  "confusedWith": "Elder — it carries the same flat white flower heads and black berries.",
  "tell": "Not a shrub: soft green stems 1–2 m (3–6 ft) tall that die back to the ground every winter, growing in dense patches from creeping roots, with leaves that smell foul when crushed and berry heads held upright. Elder is woody, with corky bark, and its ripe berry heads droop.",
  "effect": "Every part is poisonous, the seeds especially: vomiting and diarrhoea."
 },
 {
  "latin": "Sambucus racemosa",
  "name": "Red elderberry",
  "group": "plant",
  "severity": "serious",
  "confusedWith": "Common elderberry, which is gathered in quantity for syrup and wine.",
  "tell": "Bright red berries in a domed, cone-shaped cluster. Edible elders carry blue-black berries in a flat-topped cluster.",
  "effect": "Raw berries, and the seeds, stems and leaves of all elders, carry cyanogenic compounds. Red elder is the one that reliably makes people sick."
 },
 {
  "latin": "Galerina marginata",
  "name": "Deadly galerina",
  "group": "fungus",
  "severity": "deadly",
  "confusedWith": "Honey mushrooms, velvet shank, and sheathed woodtuft — all wood-growing clusters picked in autumn.",
  "tell": "Small brown cap on dead conifer wood, a ring on the stem, and a rusty-brown spore print. Honey mushroom drops a white print. Take a print before you cook anything you gathered off a log.",
  "effect": "Carries the same amatoxins as the death cap in a far smaller body. A handful is enough."
 },
 {
  "latin": "Amanita pantherina",
  "name": "Panther cap",
  "group": "fungus",
  "severity": "serious",
  "confusedWith": "The blusher and other brown Amanitas some foragers eat.",
  "tell": "Brown cap with white warts, a ring, and a distinct rim at the top of the bulbous base. The blusher stains pink-red where damaged; this does not.",
  "effect": "A stronger dose of the same compounds as fly agaric, with more hospital admissions and occasional deaths."
 },
 {
  "latin": "Agaricus xanthodermus",
  "name": "Yellow stainer",
  "group": "fungus",
  "severity": "serious",
  "confusedWith": "Field, horse and wood mushrooms — about half the poisonings among people who gather Agaricus mushrooms are this one.",
  "tell": "Scratch the cap edge or cut the base of the stem: it turns an instant, bright chrome-yellow that later fades brown, and smells of ink or carbolic soap — more strongly as it cooks. Edible field and horse mushrooms smell pleasant and yellow only slowly and faintly, if at all.",
  "effect": "Sweating, flushing, severe cramps, vomiting and diarrhoea. Some people eat it without trouble, which keeps its reputation muddled; it is banned from sale in Italy."
 },
 {
  "latin": "Menispermum canadense",
  "name": "Moonseed",
  "group": "plant",
  "severity": "deadly",
  "confusedWith": "Wild grapes. It climbs beside them and fruits in the same blue-black clusters.",
  "tell": "Split a fruit and look at the seed. A grape holds two or more round seeds; moonseed holds a single flat crescent. The leaves have no true lobed points and the vine has no tendrils.",
  "effect": "Contains an alkaloid related to curare. Children have died from eating the berries as grapes."
 },
 {
  "latin": "Rubroboletus satanas",
  "name": "Devil’s bolete",
  "group": "fungus",
  "severity": "serious",
  "confusedWith": "Ceps (penny bun, porcini), which share its oak and beech woods on chalk, and the red-pored boletes some Europeans eat.",
  "tell": "A chalky white to grey-buff cap, blood-red pores that turn blue when touched, a swollen red stem covered in a fine net, flesh that blues when cut, and a rotten smell in age. A cep has white, then yellow to olive pores that never turn red or blue.",
  "effect": "Violent gastroenteritis — hours of vomiting and diarrhoea. Its colours and smell put most people off, so poisonings are rare."
 },
 {
  "latin": "Solanum dulcamara",
  "name": "Bittersweet nightshade",
  "group": "plant",
  "severity": "serious",
  "confusedWith": "Its red berries get picked as currants or tomatoes by children.",
  "tell": "Purple flowers with a yellow beak, leaves with a pair of small lobes at the base, and berries that ripen green to orange to red on the same cluster.",
  "effect": "Solanine: burning throat, vomiting, and in a child, worse."
 },
 {
  "latin": "Rhamnus cathartica",
  "name": "Common buckthorn",
  "group": "plant",
  "severity": "irritant",
  "confusedWith": "Chokecherries and wild blueberries.",
  "tell": "Thorn-tipped twigs, leaves with curved veins running to the tip, and black berries with three or four seeds. Chokecherry has one stone.",
  "effect": "A powerful laxative, which is where the name comes from. Not dangerous, but a memorable mistake."
 },
 {
  "latin": "Inocybe",
  "genus": true,
  "name": "Fibrecaps (Inocybe)",
  "group": "fungus",
  "severity": "serious",
  "confusedWith": "Little brown and buff mushrooms picked in lawns, parks and woods by people after fairy ring champignons or anything ‘meadow-ish’.",
  "regional": { "continent": "europe", "text": "In Europe they are also picked by people after St George’s mushroom." },
  "tell": "Small brown or straw-coloured caps, often with a pointed centre and radiating fibres that split at the rim, gills turning grey-brown to snuff-brown, a brown spore print, and often a spermatic or green-corn smell. There are hundreds of species, separated only under a microscope — leave every one.",
  "effect": "Many contain muscarine: sweating, salivation, tears, cramps, blurred vision and a slow heart within 15–30 minutes. Atropine reverses it; a large dose can stop breathing."
 },
 {
  "latin": "Digitalis purpurea",
  "name": "Foxglove",
  "group": "plant",
  "severity": "deadly",
  "confusedWith": "Comfrey and mullein at the rosette stage, both of which are gathered for tea.",
  "tell": "Foxglove leaves are finely toothed with a strongly netted underside; comfrey leaves are untoothed and bristly, and mullein is thickly woolly and soft as felt.",
  "effect": "Cardiac glycosides. A cup of tea made from the wrong rosette has killed."
 },
 {
  "latin": "Tricholoma equestre",
  "name": "Man on horseback",
  "group": "fungus",
  "severity": "serious",
  "confusedWith": "Nothing — it was a prized edible until recently.",
  "tell": "Yellow gills and yellow-tinged flesh, in sandy pine woods.",
  "effect": "Repeated large meals have caused rhabdomyolysis — muscle breakdown severe enough to kill. Its edible reputation is out of date."
 },
 {
  "latin": "Cicuta maculata",
  "name": "Water hemlock",
  "group": "plant",
  "severity": "deadly",
  "confusedWith": "Wild parsnip, water parsnip, wild carrot and angelica — every white-flowered umbel a forager digs.",
  "tell": "Slice the root base lengthwise: water hemlock is chambered, with hollow cross-partitions, and oozes an oily yellow sap that smells of raw parsnip. The stem is streaked or blotched purple. It grows with its feet in water.",
  "effect": "The most violently toxic plant in North America. A piece of root the size of a walnut kills an adult, with convulsions starting within the hour."
 },
 {
  "latin": "Convallaria majalis",
  "name": "Lily of the valley",
  "group": "plant",
  "severity": "deadly",
  "confusedWith": "Ramps and wild garlic — it comes up in the same woods at the same time, with the same shape of leaf.",
  "tell": "Crush a leaf. Ramps smell unmistakably of onion and garlic; lily of the valley smells green and of nothing else. If it does not smell of onion, it is not a ramp. Ramps also have a reddish-purple stalk base.",
  "effect": "Cardiac glycosides that disturb the heart's rhythm. Every part is toxic, including the water cut flowers have stood in."
 },
 {
  "latin": "Atropa bella-donna",
  "name": "Deadly nightshade",
  "group": "plant",
  "severity": "deadly",
  "confusedWith": "Bilberries and cherries — its sweet, shiny black berries tempt children.",
  "tell": "A branching herb up to 1.5 m (5 ft) with dull purple, bell-shaped flowers and single, glossy black berries the size of a cherry, each sitting in a green five-pointed star. Bilberries grow on a knee-high shrub; black nightshade’s berries are smaller, dull and in clusters.",
  "effect": "Atropine and scopolamine: dry mouth, wide pupils, racing heart, fever, delirium and hallucinations. A few berries can kill a child."
 },
 {
  "latin": "Taxus canadensis",
  "name": "Canada yew",
  "group": "plant",
  "severity": "deadly",
  "confusedWith": "Its red arils look like berries and taste sweet; conifer foragers also take spruce and fir tips nearby.",
  "tell": "Flat dark needles in two rows, and fleshy red cups open at the end with a hard seed showing. Spruce and fir tips come from cones and bear no fruit.",
  "effect": "The needles and seed are cardiotoxic and there is no effective antidote; the fleshy cup itself is not, which is exactly what makes it dangerous."
 },
 {
  "latin": "Colchicum autumnale",
  "name": "Autumn crocus (meadow saffron)",
  "group": "plant",
  "severity": "deadly",
  "confusedWith": "Wild garlic — its leaves come up in spring in the same damp meadows and woodland edges.",
  "tell": "In spring, a stalkless tuft of a few broad, glossy, strap-like leaves wrapped round one another, often with a green seed pod in the middle, and no smell of garlic. Wild garlic leaves rise one by one on their own thin stalks and smell strongly of garlic. The pink, crocus-like flowers come in autumn with no leaves at all.",
  "effect": "Colchicine: vomiting and diarrhoea 4 to 12 hours later, then failure of the heart, lungs, kidneys and bone marrow over the following days. There is no antidote, and foragers who ate it as wild garlic have died."
 },
 {
  "latin": "Gyromitra esculenta",
  "name": "False morel",
  "group": "fungus",
  "severity": "deadly",
  "confusedWith": "True morels — it fruits in the same woods at the same time of spring.",
  "tell": "Cut it top to bottom. A true morel is hollow from cap to stem base and its cap is pitted like a honeycomb and fused to the stem. A false morel is lobed and brain-like, cottony or chambered inside, and the cap hangs free.",
  "effect": "Contains a compound that breaks down to rocket fuel — gyromitrin, which becomes monomethylhydrazine. Traditionally eaten after boiling in some regions; it has still killed people, and the vapour alone is hazardous."
 },
 {
  "latin": "Cortinarius orellanus",
  "name": "Fool’s webcap",
  "group": "fungus",
  "severity": "deadly",
  "confusedWith": "Chanterelles — four people in Austria were poisoned in 1997 after picking it as one — and other orange-brown mushrooms of oak and beech woods.",
  "tell": "Orange-brown to tawny all over, with thick gills that turn rust-brown and a rusty-brown spore print. A chanterelle is egg-yolk yellow, has blunt forking ridges instead of gills, and drops a pale print.",
  "effect": "Orellanine destroys the kidneys, and the first symptoms can come days to weeks after the meal. In Bydgoszcz, Poland, in 1952, 102 people were poisoned and 11 died; kidney failure is often permanent."
 },
 {
  "latin": "Entoloma sinuatum",
  "name": "Livid entoloma",
  "group": "fungus",
  "severity": "serious",
  "confusedWith": "The miller, and aborted entoloma, which is eaten in eastern North America.",
  "tell": "Pink spore print and gills that turn salmon-pink with age, on a stout pale mushroom growing from soil under hardwoods.",
  "effect": "One of the commonest causes of serious mushroom poisoning in Europe: hours of vomiting, and liver damage in quantity."
 },
 {
  "latin": "Lactarius torminosus",
  "name": "Woolly milkcap",
  "group": "fungus",
  "severity": "serious",
  "confusedWith": "Saffron milk cap and the other orange milk caps eaten across Europe.",
  "tell": "A pinkish-salmon cap with darker rings and a shaggy, woolly, inrolled rim, white peppery milk, and always near birch. A saffron milk cap is carrot-orange with a smooth rim, bleeds carrot-orange milk, grows under pine and bruises green.",
  "effect": "Raw or lightly cooked, it causes nausea, vomiting and diarrhoea — torminosus means ‘causing colic’. In Finland and Russia it is eaten only after parboiling and salting, which destroys the irritant."
 },
 {
  "latin": "Collybia rivulosa",
  "name": "Fool’s funnel",
  "group": "fungus",
  "severity": "serious",
  "confusedWith": "Fairy ring champignon and the miller, which grow in the same lawns and pastures, often in rings.",
  "tell": "A small, chalky white to buff funnel cap 3–4 cm (1½ in) across, often frosted or faintly ringed, with crowded white gills running down the stem. Fairy ring champignon has a tan, bell-shaped cap, widely spaced gills that do not run down the stem, and a tough stem that twists without snapping.",
  "effect": "Muscarine — it is called the sweating mushroom: salivation, sweating and streaming eyes within 15–30 minutes, then cramps, vomiting, blurred vision and laboured breathing. Atropine is the antidote; deaths are rare. Formerly Clitocybe rivulosa, and often lumped with the ivory funnel."
 },
 {
  "latin": "Veratrum viride",
  "name": "False hellebore",
  "group": "plant",
  "severity": "deadly",
  "confusedWith": "Ramps, and skunk cabbage — it emerges in the same wet spring woods.",
  "tell": "Deeply pleated, strongly ribbed leaves that clasp a stout stem, in a spiralling rosette. No onion smell at all. Ramps have smooth flat leaves rising separately from the ground.",
  "effect": "Slows the heart and drops blood pressure hard, within minutes to hours. A frequent cause of serious spring poisonings."
 },
 {
  "latin": "Amanita virosa",
  "name": "Destroying angel",
  "group": "fungus",
  "severity": "deadly",
  "confusedWith": "Button and meadow mushrooms, and young puffballs.",
  "tell": "All white — cap, gills and stem — with a ring on the stem and a sac-like volva buried at the base. Any all-white gilled mushroom growing from the ground near trees is one to leave.",
  "effect": "The same amatoxins as the eastern destroying angel: delayed liver failure, frequently fatal without a transplant."
 },
 {
  "latin": "Cortinarius rubellus",
  "name": "Deadly webcap",
  "group": "fungus",
  "severity": "deadly",
  "confusedWith": "Chanterelles and edible boletes gathered in the same conifer woods.",
  "tell": "Rusty-brown spore print and a cobwebby veil across the young gills that leaves a rusty band on the stem. Treat the whole webcap group as inedible — the genus is enormous and not reliably sorted in the field.",
  "effect": "Destroys the kidneys, and does it slowly: symptoms can be two to three weeks after the meal, long after anyone connects the two."
 },
 {
  "latin": "Heracleum mantegazzianum",
  "name": "Giant hogweed",
  "group": "plant",
  "severity": "serious",
  "confusedWith": "Cow parsnip and angelica, both of which are eaten.",
  "tell": "Enormous — three to five metres — with a stem thicker than a wrist, bristly and blotched with dark purple, and umbels the size of a dinner plate. Cow parsnip rarely passes two metres.",
  "effect": "Sap plus sunlight burns the skin, with blisters and scarring that recur for years. In the eyes it can blind."
 },
 {
  "latin": "Arum maculatum",
  "name": "Lords-and-ladies (cuckoo pint)",
  "group": "plant",
  "severity": "serious",
  "confusedWith": "Wild garlic and sorrel, among whose leaves it grows in spring; children pick its berries.",
  "tell": "Glossy, arrow-shaped leaves with wavy edges and a net of veins, often dark-spotted; then a hooded pale green sheath round a purple or yellow club, and in late summer a stalk of bright red berries. Wild garlic leaves have smooth edges, one main vein and a garlic smell; sorrel leaves are matt with a papery sheath at the base.",
  "effect": "Needle-like oxalate crystals burn the mouth and throat at once and can swell the airway. The instant pain usually stops people before they swallow much, but it is one of the commonest plant poisonings."
 }
];

const binomial = (latin: string) => latin.replace(/\s+(spp?\.|sp\.)$/i, "").trim().toLowerCase();
const BY_LATIN = new Map(HAZARDS.filter((h) => !h.genus).map((h) => [binomial(h.latin), h]));
const BY_GENUS = new Map(HAZARDS.filter((h) => h.genus).map((h) => [h.latin.toLowerCase(), h]));

/** The roster entry a recorded taxon belongs to: by binomial, else by genus. */
export function hazardFor(latin: string): Hazard | undefined {
  const l = binomial(latin);
  return BY_LATIN.get(l) ?? BY_GENUS.get(l.split(" ")[0]);
}

/**
 * The roster entry as a card for a place on `continent`: the current roster's text (so a record stored before a
 * wording was fixed shows today's), with the continent's name and sentence where the entry has one. `regional` is
 * left off the result, so nothing applies it twice. Null when the roster no longer holds the entry.
 */
export function hazardHere(h: Pick<Hazard, "latin">, continent?: string | null): Hazard | null {
  const cur = hazardFor(h.latin);
  if (!cur) return null;
  const { regional, ...rest } = cur;
  const r = regional && regional.continent === continent ? regional : undefined;
  return { ...rest, name: r?.name ?? cur.name, confusedWith: r?.text ? `${cur.confusedWith} ${r.text}` : cur.confusedWith };
}

/** The photograph slug of a hazard: "Hypholoma fasciculare" → "hypholoma-fasciculare". */
export const hazardSlug = (h: Pick<Hazard, "latin">) => h.latin.toLowerCase().replace(/[^a-z]+/g, "-").replace(/^-|-$/g, "");
