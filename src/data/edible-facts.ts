/**
 * The facts panels of the 161 wild-edible pages (/foraging/<species>): the
 * "<name> at a glance" list, the "Questions people ask about <name>" FAQs and
 * the "Checked against these sources" list.
 *
 * Extracted verbatim from the captured /foraging/<slug> pages. The FAQ heading
 * is the species name without its bracketed part, lower-cased; the first three
 * FAQs render open. Every page reads "last reviewed October 2026" (FACTS_REVIEWED).
 */

export type EdibleFacts = {
  /** "Also called" */
  otherNames?: string;
  family: string;
  /** "Where it grows" (the at-a-glance range, distinct from the species' habitat line) */
  range: string;
  /** "When to pick" */
  whenToPick: string;
  /** "Parts used" */
  partsUsed: string;
  /** "Is any of it poisonous?" */
  poisonous?: string;
  /** "More look-alikes to know" */
  moreLookalikes?: string;
  faqs: { q: string; a: string }[];
  /** "Checked against these sources" */
  sources: { label: string; url: string }[];
};

/** The review date printed on every facts and sources panel: <time dateTime="2026-10-02">last reviewed October 2026</time>. */
export const FACTS_REVIEWED = { iso: "2026-10-02", label: "October 2026" };

export const EDIBLE_FACTS: Record<string, EdibleFacts> = {
 "ramps": {
  "otherNames": "Wild leek, ail des bois (Quebec). A rarer narrow-leaved form is split off by some botanists as Allium burdickii.",
  "family": "Amaryllidaceae (the onion and garlic group)",
  "range": "Rich eastern hardwood forest: native in Quebec, Ontario, New Brunswick, Nova Scotia and Manitoba, and from Quebec south through the Appalachians to Georgia and west to Minnesota. Not a plant of the Prairies, BC or the western US.",
  "whenToPick": "Early spring, for a few weeks only. Leaves unfurl before the trees leaf out — usually April into May in southern Quebec and Ontario, earlier to the south — and die back before summer. The white flower heads rise on bare stalks in June–July, and the black seeds ripen in late summer and fall.",
  "partsUsed": "Leaves are the sustainable harvest: cut one leaf per plant and leave the bulb in the ground. Bulbs and the white or reddish stems are edible too, but digging kills the plant, and a ramp needs five to seven years before it first flowers. In Quebec every part counts toward the legal limit.",
  "moreLookalikes": "Death camas (Toxicoscordion and relatives) has narrow, grass-like leaves and an onion-like bulb with no onion smell. Every part is poisonous, and people have been poisoned after mistaking its bulbs for wild onions. The best-known species are western plants, outside ramp country, but it is the classic danger for anyone digging wild onions. Crush a fresh leaf each time you check: once your fingers smell of garlic, everything will.",
  "faqs": [
   {
    "q": "What is the rule for picking ramps (wild leeks) in Quebec?",
    "a": "Personal use only: at most 50 bulbs, 50 plants or 200 grams of any part, per person, per year. Selling wild leek, or picking it to sell, has been banned since 1995, and picking is forbidden outright in protected natural areas. Ail des bois is a designated vulnerable species in Quebec."
   },
   {
    "q": "How do you identify a ramp plant?",
    "a": "By one to four (usually two or three) broad, smooth leaves under 30 cm (12 in) tall, rising from a small bulb on a white or reddish-purple stem — and by smell. Crushed, a ramp smells strongly of onion and garlic. No onion smell, no ramp."
   },
   {
    "q": "What plants look like ramps?",
    "a": "Lily of the valley and false hellebore — both poisonous, both in the same spring woods, and neither smells of onion. False hellebore's leaves are ribbed and pleated; most people who eat it end up in hospital. In the west, death camas has narrow, grass-like leaves and a bulb with no onion smell."
   },
   {
    "q": "How do I find wild ramps?",
    "a": "Walk rich, moist hardwood forest in early spring, before the canopy leafs out, when the bright green patches stand out on the bare forest floor. Look on east- and north-facing slopes, by spring seeps and in drainages that stay damp all year, under maple, beech and basswood."
   },
   {
    "q": "When is wild leek season?",
    "a": "Early spring, and it is short: leaves come up in April or May and die back before summer. By the time the flower stalk appears in June or July, the leaves are gone. Seeds ripen in late summer and fall."
   },
   {
    "q": "How do I pick ramps without harming the patch?",
    "a": "Cut a single leaf from each plant with a knife or scissors and leave the bulb. Ramps are slow: a plant takes five to seven years to flower, and patches spread by slowly splitting bulbs. Take from a large colony, spread your picking out, and never clear a patch."
   }
  ],
  "sources": [
   {
    "label": "Gouvernement du Québec — authorised activities for threatened or vulnerable plants (ail des bois limit)",
    "url": "https://www.quebec.ca/agriculture-environnement-et-ressources-naturelles/flore/especes-floristiques-menacees-ou-vulnerables/autorisation-activite"
   },
   {
    "label": "Gouvernement du Québec news release — Québec veut mieux protéger l'ail des bois (2023)",
    "url": "https://newswire.ca/fr/news-releases/quebec-veut-mieux-proteger-l-ail-des-bois-840268051.html"
   },
   {
    "label": "Penn State Extension — Ramps (Allium tricoccum)",
    "url": "https://extension.psu.edu/ramps-allium-tricoccum"
   },
   {
    "label": "Northern New England Poison Center — False hellebore",
    "url": "https://www.nnepc.org/poisons/f/false-hellebore"
   },
   {
    "label": "VASCAN (Database of Vascular Plants of Canada) — Allium tricoccum",
    "url": "https://data.canadensys.net/vascan/name/Allium%20tricoccum"
   },
   {
    "label": "USDA Forest Service Fire Effects Information System — Foothill deathcamas",
    "url": "https://www.fs.usda.gov/database/feis/plants/forb/zigpan/all.html"
   }
  ]
 },
 "fiddleheads": {
  "otherNames": "Ostrich fern fiddleheads, crosiers, têtes de violon (Quebec)",
  "family": "Onocleaceae (ostrich fern and sensitive fern)",
  "range": "Floodplains, riverbanks and damp woods across southern Canada from the Maritimes west to BC, north into Alaska, and through the northern US. Ostrich fern spreads by runners into big colonies.",
  "whenToPick": "Late April to early June, depending on latitude and how fast the spring warms. Pick while the coil is still tightly wound, as soon as the fiddleheads stand 2.5–5 cm (1–2 in) above the ground. Once a coil loosens and the leaflets begin to open, it is past.",
  "partsUsed": "Only the tightly coiled young fronds of ostrich fern. Rub off as much of the brown papery husk as you can and wash in several changes of cold water. Opened fronds, and the fiddleheads of other ferns, are not eaten.",
  "poisonous": "Raw or undercooked ostrich fern fiddleheads cause food poisoning — diarrhea, nausea, vomiting, cramps and headache, 30 minutes to 12 hours after eating. Health Canada: boil 15 minutes or steam 10–12 minutes, discard the water, and do this before any sautéing or baking. Bracken fiddleheads contain a carcinogen (ptaquiloside); lady fern may contain thiaminase, which destroys vitamin B1.",
  "moreLookalikes": "Lady fern is the hardest to tell apart — it also has a U-shaped groove — and is not the recognised edible. Wood ferns (Dryopteris) are shaggy with brown scales, and many keep last year's green fronds lying around the new coils; an ostrich fern crown has no green winter leaves, only stiff, dark brown fertile spikes. Interrupted fern, like cinnamon fern, is woolly and has been linked to suspected poisonings.",
  "faqs": [
   {
    "q": "When do you pick fiddleheads?",
    "a": "In spring, from late April to early June depending on where you live, while the coils are tight and only 2.5–5 cm (1–2 in) above the ground. They come in clusters of three to twelve per crown. Once a coil begins to unroll into a leaf, leave it."
   },
   {
    "q": "How do you identify ostrich fern fiddleheads?",
    "a": "Three things together: a smooth stem, not fuzzy, with a deep U-shaped groove on the inside like a celery stalk; brown papery scales that rub off easily; and a coil about 2.5 cm (1 in) across. Last year's dark brown fertile spikes often stand in the middle of the clump."
   },
   {
    "q": "Are wood fern fiddleheads edible?",
    "a": "They are not a recognised edible — pick only ostrich fern. Wood ferns (Dryopteris) grow in the same woods; their young coils are thickly covered in brown scales, and many keep last year's green fronds lying around the base. An ostrich fern crown has no green leaves left over from winter."
   },
   {
    "q": "Which fiddleheads are poisonous?",
    "a": "Treat every fern except ostrich fern as not for eating. Bracken is carcinogenic. Cinnamon and interrupted ferns are woolly and have been linked to suspected poisonings. Lady fern closely resembles ostrich fern and may contain thiaminase. If a fiddlehead has fuzz instead of papery scales, it is not ostrich fern."
   },
   {
    "q": "How long do you cook fiddleheads?",
    "a": "Boil them 15 minutes or steam them 10–12 minutes, until tender, and throw out the water. Do this first even if the recipe then sautés, stir-fries or bakes them. Health Canada says raw or undercooked fiddleheads cause food poisoning within 30 minutes to 12 hours."
   },
   {
    "q": "How many fiddleheads can I take from one fern?",
    "a": "Never more than half the coils from any one crown. Taking every coil year after year weakens the plant and can kill it. Many careful pickers take only one or two per clump and spread out over a large stand."
   }
  ],
  "sources": [
   {
    "label": "Health Canada — Food safety and fiddleheads",
    "url": "https://recalls-rappels.canada.ca/en/alert-recall/food-safety-and-fiddleheads-0"
   },
   {
    "label": "University of Maine Cooperative Extension — Facts on Fiddleheads (Bulletin 4198)",
    "url": "https://extension.umaine.edu/publications/4198e/"
   },
   {
    "label": "Alaska Plant Materials Center — Plant profile: Fiddleheads",
    "url": "https://plants.alaska.gov/pdf/Fiddleheads.pdf"
   },
   {
    "label": "Minnesota Wildflowers — Ostrich fern",
    "url": "https://minnesotawildflowers.info/fern/ostrich-fern"
   }
  ]
 },
 "morel": {
  "otherNames": "Yellow morel, white morel, black morel, sponge mushroom, morille (Quebec)",
  "family": "Morchellaceae",
  "range": "Across southern Canada and most of the US. Black morels come up under ash and aspen, white and yellow morels under hardwoods and in old orchards, half-free morels in moist oak-hickory woods, and burn morels in conifer forest the spring after a wildfire.",
  "whenToPick": "Spring, as the soil warms — mostly May in southern Quebec and Ontario, earlier to the south and later northward and upslope. In Michigan, black morels lead in early to mid May and white morels follow in late May. Burn morels flush the first spring after a fire.",
  "partsUsed": "The whole mushroom, cap and stem, always well cooked. Slice each one lengthwise first: a true morel is hollow from cap tip to stem base, with the cap joined to the stem (at its lower edge, or halfway up in the half-free morel).",
  "poisonous": "Morels are poisonous raw. In a 2023 outbreak linked to a Montana restaurant, 51 people fell ill and two died after eating morels served raw or lightly cooked; the toxin is still unknown. Cook them thoroughly — the FDA notes even that is no guarantee — and start with a modest portion. False morels (Gyromitra) contain gyromitrin, which the body turns into monomethylhydrazine.",
  "moreLookalikes": "Early false morel (Verpa bohemica): a wrinkled rather than pitted cap that hangs completely free of the stem, attached only at the very top, with cotton-candy wisps inside. The half-free morel, a true morel, also has a skirt-like cap, but it joins about halfway down and the inside is hollow.",
  "faqs": [
   {
    "q": "How do you tell a true morel from a false morel?",
    "a": "Slice it lengthwise. A true morel is completely hollow, with a cap of deep pits rimmed by ridges, fused to the stem. False morels (Gyromitra) have lobed, brain-like wrinkles and are chambered or cottony inside; Verpa's cap hangs free from the top of a cotton-filled stem."
   },
   {
    "q": "Can you eat morels raw?",
    "a": "No. Morels are poisonous raw and must be well cooked. In 2023, morels served raw or lightly cooked at a Montana restaurant made 51 people ill, and two died. Cook them through and don't eat a huge plateful the first time."
   },
   {
    "q": "Why are false morels dangerous?",
    "a": "Gyromitra contains gyromitrin, which becomes monomethylhydrazine — a rocket-fuel compound — in the body. Symptoms start 6–12 hours after eating; severe cases bring liver and kidney damage, seizures and occasionally death. Boiling drives the toxin into the steam, so cooking them is itself a hazard."
   },
   {
    "q": "Where do morels grow?",
    "a": "Around dying elms and old apple orchards, under ash and aspen, in river bottoms, in moist oak-hickory woods, and in burned conifer forest the spring after a fire. Michigan finds black morels first under ash and aspen, white morels later under hardwoods."
   },
   {
    "q": "When is morel season?",
    "a": "Spring — in southern Canada, mostly May, starting earlier to the south and at low elevation. Black morels come first, with yellow and white morels a couple of weeks behind; burn morels appear in the first spring after a forest fire."
   }
  ],
  "sources": [
   {
    "label": "Michigan DNR — Morel identification",
    "url": "https://www.michigan.gov/dnr/things-to-do/morels/morel-identification"
   },
   {
    "label": "US FDA — Investigation of illnesses: morel mushrooms (May 2023)",
    "url": "https://www.fda.gov/food/outbreaks-foodborne-illness/investigation-illnesses-morel-mushrooms-may-2023"
   },
   {
    "label": "Beaty Biodiversity Museum, UBC — Gyromitra esculenta (false morel)",
    "url": "https://explore.beatymuseum.ubc.ca/mushroomsup/G_esculenta.html"
   },
   {
    "label": "MushroomExpert.com — Verpa bohemica",
    "url": "https://www.mushroomexpert.com/verpa_bohemica.html"
   }
  ]
 },
 "nettle": {
  "otherNames": "Common nettle, ortie (Quebec)",
  "family": "Urticaceae (nettle family)",
  "range": "Across Canada and the US in rich, damp ground — streambanks, poorly drained pasture, old barnyards and woodland edges. It spreads by underground runners into dense patches.",
  "whenToPick": "Best in spring while young and before flowering, April to June in southern Canada. After flowering the plant turns stemmy, but plants that are cut back, or a wet autumn, send up a second flush of tender tops you can pick in September.",
  "partsUsed": "Young tops and leaves, always cooked or dried. Older stems are tough and fibrous. The flowers are tiny and cream-coloured, appearing from early summer.",
  "poisonous": "The stinging hairs inject histamine, serotonin, acetylcholine and other irritants. Cooking or soaking removes the sting, and dried leaves are used for tea; raw leaves sting the mouth. Pick with gloves and scissors.",
  "moreLookalikes": "Wood nettle (Laportea canadensis) of moist, shady hardwood forest stings too, though it has fewer stinging hairs; tell it by its alternate leaves — stinging nettle's leaves are all in opposite pairs.",
  "faqs": [
   {
    "q": "How do you identify stinging nettle?",
    "a": "A plant usually 30 cm to 1.8 m (1–6 ft) tall with a square, four-angled stem, leaves in opposite pairs that are lance- to heart-shaped with coarse teeth, and bristly stinging hairs on stem and leaves. Tiny cream flowers appear at the leaf joints from early summer."
   },
   {
    "q": "When should you pick nettles?",
    "a": "In spring, while the plants are young and before they flower — take the top few pairs of leaves. After flowering they turn stemmy. Cut plants, or a wet autumn, produce a second flush of tender growth you can pick in fall."
   },
   {
    "q": "How do you take the sting out of nettles?",
    "a": "Cook them, or soak them in water. Cooking or soaking removes the histamine and other irritants in the stinging hairs, so blanched or souped nettle doesn't sting, and dried leaves are used for tea. Handle the fresh plants with gloves."
   },
   {
    "q": "What is the difference between wood nettle and stinging nettle?",
    "a": "Leaf arrangement. Stinging nettle has opposite leaves only; wood nettle has at least some alternate leaves and grows in moist, shady hardwood forest. Both sting — wood nettle just has fewer stinging hairs."
   },
   {
    "q": "Can you eat nettles raw?",
    "a": "Not as picked — the hairs sting the mouth and throat. Blanching, cooking or soaking removes the sting, and then nettle can go anywhere spinach does."
   }
  ],
  "sources": [
   {
    "label": "Minnesota Wildflowers — Stinging nettle (Urtica dioica)",
    "url": "https://www.minnesotawildflowers.info/flower/stinging-nettle"
   },
   {
    "label": "Wikipedia — Urtica dioica (sting and culinary use)",
    "url": "https://en.wikipedia.org/wiki/Urtica_dioica"
   },
   {
    "label": "Iowa State University Extension — Stinging nettle",
    "url": "https://crops.extension.iastate.edu/encyclopedia/stinging-nettle"
   },
   {
    "label": "Illinois Wildflowers — Wood nettle",
    "url": "https://conditions.illinoiswildflowers.info/woodland/plants/wood_nettle.htm"
   }
  ]
 },
 "dandelion": {
  "otherNames": "Common dandelion, pissenlit (Quebec)",
  "family": "Asteraceae (daisy family)",
  "range": "Introduced from Eurasia and now found in all 50 US states, every Canadian province and territory, and Mexico — lawns, fields, roadsides and any disturbed ground.",
  "whenToPick": "Leaves are mildest in early spring before the first flowers, and again in cool autumn weather. It flowers from March or April through late fall, heaviest in late spring. Dig roots in fall or early spring.",
  "partsUsed": "All of it: young leaves raw or cooked, flowers for fritters, tea and wine, and roots roasted. Leaves, stalks and roots all bleed a milky sap when broken.",
  "moreLookalikes": "Red-seeded dandelion (Taraxacum erythrospermum) is a close relative with smaller flowers and red to purplish-brown seeds. A true dandelion carries one flower on each hollow, leafless stalk, and the outer row of green bracts under the flower curls downward.",
  "faqs": [
   {
    "q": "Where can I forage near me?",
    "a": "Start with your own yard or land you have permission to use, then check the rules. In Canada's national parks, removing any plant needs a permit. In US national parks, gathering is banned except for fruits, berries or nuts a park superintendent has specifically allowed. Provincial, state and city parks set their own rules — ask first."
   },
   {
    "q": "How do you identify a dandelion?",
    "a": "A flat rosette of deeply lobed leaves with sharp, irregular teeth; a hollow, leafless stalk carrying a single yellow flower head; and milky sap from any broken leaf, stalk or root. Under the flower, the outer row of green bracts spreads or curls downward."
   },
   {
    "q": "When are dandelion greens least bitter?",
    "a": "In early spring, before the plant flowers, and again in cool autumn weather. Pick the young inner leaves. Bitterness builds once the plant is in full bloom."
   },
   {
    "q": "Is it safe to eat dandelions from my lawn?",
    "a": "Once you're sure it's a dandelion, the plant is edible from root to flower, so the question is the lawn. Skip any that has been sprayed with weed killer or weed-and-feed, sits beside a busy road, or serves as a dog run."
   }
  ],
  "sources": [
   {
    "label": "USDA Forest Service Fire Effects Information System — Taraxacum officinale",
    "url": "https://www.fs.usda.gov/database/feis/plants/forb/taroff/all.html"
   },
   {
    "label": "Minnesota Wildflowers — Common dandelion",
    "url": "https://www.minnesotawildflowers.info/flower/common-dandelion"
   },
   {
    "label": "Government of Canada — National Parks General Regulations (s. 10)",
    "url": "https://laws-lois.justice.gc.ca/eng/regulations/SOR-78-213/FullText.html"
   },
   {
    "label": "US Code of Federal Regulations — 36 CFR 2.1, national park resource gathering",
    "url": "https://www.ecfr.gov/current/title-36/chapter-I/part-2/section-2.1"
   }
  ]
 },
 "wild-asparagus": {
  "otherNames": "Garden asparagus gone wild, asperge (Quebec)",
  "family": "Asparagaceae",
  "range": "Native to Europe, Africa and Asia, and escaped from gardens and farms to roadsides, ditches, fence lines and railway embankments across much of the US and southern Canada.",
  "whenToPick": "Spears in spring — usually May in southern Canada, earlier to the south — and the same crown keeps sending up new spears for weeks. Find a patch the autumn before, when the feathery fronds and red berries stand out, or look in spring for last year's dry, straw-coloured stalks.",
  "partsUsed": "Only the young spears, snapped where they break cleanly. Once a spear branches and goes ferny it is too tough. Peel thick stems.",
  "poisonous": "The hard red berries on female plants can cause stomach upset. Handling young, raw shoots gives some people contact dermatitis — wear gloves if you react.",
  "moreLookalikes": "Ornamental asparagus fern (Asparagus aethiopicus), a garden and house plant that escapes in warm regions, also has red berries and is listed as toxic to dogs; it does not make edible spears.",
  "faqs": [
   {
    "q": "How do you identify wild asparagus?",
    "a": "In spring, by the spears — just like store asparagus — often coming up beside last year's dead stalks. In summer and fall the same plant is a feathery bush of soft, needle-like leaves in whorls, and female plants carry hard, shiny red berries."
   },
   {
    "q": "Where does wild asparagus grow?",
    "a": "Wherever it escaped from old gardens and farms: roadsides, ditches, fence lines, railway embankments and old homesteads, usually in full sun. Avoid patches along sprayed or heavily travelled roads."
   },
   {
    "q": "When do you pick wild asparagus?",
    "a": "In spring, while the spears are young and the tips still tightly closed. Snap each one where it breaks cleanly, take a few spears per crown, and let the rest grow into ferns so the plant stays strong for next year."
   },
   {
    "q": "Are asparagus berries poisonous?",
    "a": "Mildly. The red berries on mature female plants can cause stomach upset and shouldn't be eaten. Young raw spears can also irritate the skin of sensitive people."
   }
  ],
  "sources": [
   {
    "label": "NC State Extension Plant Toolbox — Asparagus officinalis",
    "url": "https://plants.ces.ncsu.edu/plants/asparagus-officinalis/"
   },
   {
    "label": "Lady Bird Johnson Wildflower Center — Ask Mr. Smarty Plants: asparagus fern",
    "url": "https://www.wildflower.org/expert/show.php?id=7444"
   }
  ]
 },
 "spruce-tips": {
  "otherNames": "Spruce buds, bourgeons d'épinette (Quebec)",
  "family": "Pinaceae (pine family)",
  "range": "Spruces cover the boreal forest across Canada and Alaska and run south into the northeastern states and the western mountains. Any native spruce gives usable tips.",
  "whenToPick": "Late spring, in a short window: pick when the new tips are just pushing out of their brown papery casings. Trees in warm, sunny, low spots go first. Once the tips harden, form proper needles and lose their bright green, the resin takes over and they are no longer good for cooking.",
  "partsUsed": "Only the soft new growth at the branch ends. Pull off and discard the papery casing.",
  "moreLookalikes": "Yews are the danger, and they are not only garden shrubs. Canada yew (ground hemlock) is a native, knee-high evergreen shrub of damp woods from Newfoundland to Manitoba, and Pacific yew is a native understory tree in BC and the Pacific Northwest. Yews have flat, soft, very dark needles, plain paler green underneath with no white lines, no resin smell, and a red, cup-shaped berry (aril) instead of a cone; every part except the red flesh is poisonous, including the seed inside it. Spruce needles are square and roll in the fingers. Fir needles are flat like yew's, so check the underside — fir has two white stripes there, smells of resin when crushed, and carries upright cones.",
  "faqs": [
   {
    "q": "When do you pick spruce tips?",
    "a": "In late spring, just as the new growth pushes out of its brown papery casing. At that stage the tips are soft, bright green and taste fresh and citrusy. As they harden and form needles the resin builds, and they're no longer good for cooking."
   },
   {
    "q": "How do you harvest spruce tips without hurting the tree?",
    "a": "Pull a few tips gently from each tree and move on, spreading your picking over many trees. Each tip is that branch's growth for the year, so don't strip one tree, and leave the top shoot of young trees alone."
   },
   {
    "q": "What conifer looks like spruce but is poisonous?",
    "a": "Yew. Its needles are flat, soft, very dark green above and plain paler green beneath — no white stripes — and it bears red, cup-shaped berries with a seed inside, never cones. Canada yew grows wild as a low shrub in eastern woods; Pacific yew is a forest tree in the west. Everything but the red flesh is poisonous. Fir needles are flat too, so look for fir's two white lines underneath and its resin smell."
   },
   {
    "q": "How do you use spruce tips?",
    "a": "Fresh in salads, steeped as tea, or cooked into syrup, infused oil, flavoured salt, shortbread and pickles. The flavour is citrusy and resinous, so a small handful goes a long way."
   }
  ],
  "sources": [
   {
    "label": "Anchorage Daily News — Spruce tips are a tasty reward for backyard foraging",
    "url": "https://www.adn.com/culture/food-drink/2016/05/26/spruce-tips-are-a-tasty-reward-for-backyard-foraging/"
   },
   {
    "label": "Southcentral Foundation (Alaska) — Edible spruce tips",
    "url": "https://www.southcentralfoundation.com/wp-content/uploads/2019/04/319_SpruceTips.pdf"
   },
   {
    "label": "Cornell University — Poisonous plants: yew",
    "url": "https://poisonousplants.ansci.cornell.edu/yew.html"
   },
   {
    "label": "USDA Forest Service Fire Effects Information System — Taxus canadensis (Canada yew)",
    "url": "https://www.fs.usda.gov/database/feis/plants/shrub/taxcan/all.html"
   }
  ]
 },
 "cattail-shoots": {
  "otherNames": "Broadleaf cattail, common cattail, quenouille (Quebec)",
  "family": "Typhaceae",
  "range": "Freshwater to slightly brackish marshes, ponds, lake edges, ditches and slow rivers right across North America — native to every US state except Hawaii and found throughout southern Canada.",
  "whenToPick": "Shoots in early spring, once they are up and growing (later in Canada than farther south). Young green flower spikes follow in late spring and early summer, pollen in summer, and the starchy rhizomes are best in fall.",
  "partsUsed": "Spring shoots: cut at the base and peeled down to the tender white-to-pale-green core. Young green flower spikes: steamed or boiled like baby corn. Pollen: shaken into a bag for baking. Rhizomes: dried and pounded for starch.",
  "moreLookalikes": "Yellow flag iris, an invasive in many wetlands, is the main danger: its sword-shaped leaves fan out from the base in one flat plane, and its stem is flattened or elliptical with a vein down the centre. It is poisonous, with the most toxin in the rhizome. A cattail shoot is round and spongy inside.",
  "faqs": [
   {
    "q": "How do you harvest cattail shoots?",
    "a": "In spring, cut a young shoot off at its base, then peel away the outer leaves until you reach the tender white core — it looks like a leek. Eat it fresh or lightly cooked, and only from clean water."
   },
   {
    "q": "How do you tell cattail from iris?",
    "a": "Cut the shoot. Cattail is round and spongy inside. Iris leaves fan out flat from the base, and the stem is flattened or elliptical with a vein down the centre. Iris is poisonous — if you can't tell, leave it."
   },
   {
    "q": "What parts of a cattail can you eat?",
    "a": "Four, through the year: the white inner shoots in spring, the young green flower spikes (like baby corn) in early summer, the yellow pollen in summer, and the starchy rhizomes in fall."
   },
   {
    "q": "Can you eat cattail shoots raw?",
    "a": "They are eaten fresh or lightly cooked, but only from clean water — cattails take up whatever is in the marsh. Washington State's school foraging guide advises washing harvested parts with boiling water before eating."
   }
  ],
  "sources": [
   {
    "label": "USDA Forest Service Fire Effects Information System — Typha latifolia",
    "url": "https://www.fs.usda.gov/database/feis/plants/graminoid/typlat/all.html"
   },
   {
    "label": "Washington Office of Superintendent of Public Instruction — Cattail",
    "url": "https://ospi.k12.wa.us/sites/default/files/2023-10/cattail.pdf"
   },
   {
    "label": "NC State Extension Plant Toolbox — Iris pseudacorus (yellow flag iris)",
    "url": "https://plants.ces.ncsu.edu/plants/iris-pseudacorus/"
   }
  ]
 },
 "wild-violet": {
  "otherNames": "Common blue violet, dooryard violet, violette (Quebec)",
  "family": "Violaceae (violet family)",
  "range": "Common through eastern and central Canada and the US — lawns, woodland edges, shaded banks and roadsides.",
  "whenToPick": "Spring, while flowering — April and May in southern Canada. Violets grow actively in spring and again in fall and fade in summer heat; young leaves are best in spring.",
  "partsUsed": "Flowers and young leaves. Later in the season violets also make small green flowers that never open; these self-fertilise and set the seed.",
  "poisonous": "Eat the leaves and flowers only — the roots are not eaten.",
  "moreLookalikes": "Lesser celandine (Ficaria verna), an invasive of damp spring woods and lawns, has glossy, kidney- to heart-shaped leaves with smooth edges and bright yellow flowers of eight or more narrow petals. It contains protoanemonin, an irritant, and is poisonous. Violet leaves have rounded teeth all round the edge and five-petalled purple, blue or white flowers.",
  "faqs": [
   {
    "q": "How do you identify wild violets?",
    "a": "Heart- to oval-shaped leaves with rounded teeth along the edge, rising in a clump straight from the ground, and five-petalled violet-blue flowers with dark veins, each on its own leafless stalk. Some plants have smooth leaves, others hairy, and some flowers are white."
   },
   {
    "q": "Are wild violets edible?",
    "a": "The flowers and young leaves are, once you are sure of the plant; the roots are not. Flowers go in salads or are candied, and leaves are mild and thicken soup. African violets are unrelated houseplants and are not edible."
   },
   {
    "q": "What looks like a violet but is poisonous?",
    "a": "Lesser celandine. It has glossy, kidney-shaped leaves with smooth edges and bright yellow flowers with eight or more narrow petals, and it contains an irritant, protoanemonin. Violets have toothed leaf edges and five-petalled purple, blue or white flowers."
   },
   {
    "q": "When do wild violets bloom?",
    "a": "In spring — April and May in southern Canada. After the showy flowers, violets make small green flowers that never open; their pods later split and fling the seeds, and ants carry them away."
   }
  ],
  "sources": [
   {
    "label": "University of Illinois Extension — Embracing the common blue violet",
    "url": "https://extension.illinois.edu/blogs/good-growing/2017-06-07-embracing-common-blue-violet"
   },
   {
    "label": "University of Minnesota Extension — Wild violet",
    "url": "https://extension.umn.edu/weeds/wild-violet"
   },
   {
    "label": "Penn State Extension — Lesser celandine",
    "url": "https://extension.psu.edu/lesser-celandine"
   },
   {
    "label": "NC State Extension Plant Toolbox — Ranunculus ficaria (toxicity)",
    "url": "https://plants.ces.ncsu.edu/plants/ranunculus-ficaria/"
   }
  ]
 },
 "wild-strawberry": {
  "otherNames": "Virginia strawberry, fraise des champs (Quebec)",
  "family": "Rosaceae (rose family)",
  "range": "Sunny fields, woodland edges, roadsides and railway banks across nearly all of southern Canada and the US.",
  "whenToPick": "Early summer. Plants flower from April to June, and berries follow in June and early July across southern Canada, a little earlier to the south. Ripe berries are fully red and slip off easily.",
  "partsUsed": "The berries, eaten fresh — they spoil within hours of picking.",
  "moreLookalikes": "Woodland strawberry (Fragaria vesca), in moister, shadier spots, is also edible: its berry is longer than wide with seeds raised on the surface, and the end tooth of each leaflet is as large as its neighbours. Wild strawberry's seeds sit in little pits, and its end tooth is smaller than the teeth beside it.",
  "faqs": [
   {
    "q": "How do you identify wild strawberries?",
    "a": "Three coarsely toothed leaflets per leaf, with the tooth at the tip shorter than its neighbours; runners that root to form new plants; white five-petalled flowers with yellow centres; and a small red berry with its seeds set in shallow pits."
   },
   {
    "q": "What is the difference between wild strawberry and mock strawberry?",
    "a": "Flower colour and taste. Mock strawberry has yellow flowers with leafy green bracts beneath, and a round berry that points up at the sky and tastes of almost nothing. Wild strawberry has white flowers and a fragrant berry that hangs down."
   },
   {
    "q": "When are wild strawberries ripe?",
    "a": "In early summer — usually June into early July in southern Canada, a little earlier to the south. Ripe berries are fully red and come away from the stem easily. They don't keep, so eat them on the spot."
   },
   {
    "q": "Are there different kinds of wild strawberries?",
    "a": "Two common native ones: wild (Virginia) strawberry of sunny fields, with seeds sunk in pits, and woodland strawberry of shadier places, with a longer berry and raised seeds. Both are edible. The yellow-flowered mock strawberry is an introduced weed."
   }
  ],
  "sources": [
   {
    "label": "Minnesota Wildflowers — Wild strawberry (Fragaria virginiana)",
    "url": "https://www.minnesotawildflowers.info/flower/wild-strawberry"
   },
   {
    "label": "University of Minnesota Extension — Mock strawberry",
    "url": "https://extension.umn.edu/identify-invasive-species/mock-strawberry"
   },
   {
    "label": "Minnesota Wildflowers — Woodland strawberry (Fragaria vesca)",
    "url": "https://www.minnesotawildflowers.info/flower/woodland-strawberry"
   }
  ]
 },
 "serviceberry": {
  "otherNames": "Saskatoon, juneberry, shadbush, shadblow, amélanchier (Quebec). Saskatoon (Amelanchier alnifolia) is the western and prairie species; downy, Canadian and smooth serviceberries (A. arborea, A. canadensis, A. laevis) are the eastern ones.",
  "family": "Rosaceae (rose family)",
  "range": "Saskatoon from southern Alaska and BC across the Prairies to Ontario and southwestern Quebec, south to California, Utah and Colorado; the eastern serviceberries through Quebec, the Maritimes and the eastern US. Widely planted in towns.",
  "whenToPick": "Early summer. The fruit ripens one to two months after the white spring blossom — June in much of the east, hence 'juneberry', and July to September for saskatoons, depending on latitude and elevation. Ripe fruit has turned from red to dark purple or blue-black.",
  "partsUsed": "The fruit, raw or cooked — pies, jam, syrup, dried. Each berry-like pome holds 4–10 small, soft seeds that are eaten along with it.",
  "poisonous": "The ripe fruit is a long-used food, but the young twigs and leaves carry cyanogenic glycosides — captive mule deer fed only saskatoon twigs died within a week. Don't chew or steep the twigs or leaves.",
  "moreLookalikes": "Common buckthorn has shiny purple-black berries on short stalks along the twigs, with no crown at the tip, and is poisonous (vomiting, diarrhea). Blueberries also have a crown but grow on low shrubs and are full of tiny seeds.",
  "faqs": [
   {
    "q": "What do serviceberries look like?",
    "a": "Small round fruit, 6–12 mm (¼–½ in) across, hanging in clusters at the branch tips and ripening from red to dark purple or blue-black, with a waxy bloom and a little crown at the end. They grow on a shrub or small tree 1–8 m tall with oval, finely toothed leaves."
   },
   {
    "q": "When are serviceberries ripe?",
    "a": "One to two months after flowering — June in much of the east, which is why they're called juneberries, and July to September for saskatoons on the Prairies and in the west. Pick when they are dark purple and soft; red ones aren't ready."
   },
   {
    "q": "What is the difference between a huckleberry and a serviceberry?",
    "a": "How they grow and what's inside. Serviceberries hang in clusters at the branch ends of a tall shrub or small tree, ripen earlier, and hold 4–10 soft seeds. Mountain huckleberries hang singly under the twigs of a shrub under 2 m, ripen late July to September, and hold dozens of tiny seeds."
   },
   {
    "q": "Are serviceberries poisonous?",
    "a": "The ripe fruit, correctly identified, is not — it is a long-used wild food for pies, jam and syrup. The young twigs and leaves are another matter: they contain cyanogenic glycosides, so don't chew them or make tea from them."
   },
   {
    "q": "Is a saskatoon the same as a serviceberry?",
    "a": "Yes. Saskatoon is the western and prairie serviceberry, Amelanchier alnifolia. Its eastern relatives go by juneberry, shadbush and serviceberry. All bear similar edible fruit."
   }
  ],
  "sources": [
   {
    "label": "USDA Forest Service Fire Effects Information System — Amelanchier alnifolia",
    "url": "https://www.fs.usda.gov/database/feis/plants/shrub/amealn/all.html"
   },
   {
    "label": "University of Wisconsin–Madison Extension — Serviceberry, Amelanchier",
    "url": "https://hort.extension.wisc.edu/articles/serviceberry-amelanchier/"
   },
   {
    "label": "St. Olaf College Natural Lands — Poisonous berries of Minnesota",
    "url": "https://wp.stolaf.edu/naturallands/poisonous-berries-of-minnesota/"
   },
   {
    "label": "USDA Forest Service, Gifford Pinchot NF — Big huckleberry sustainability analysis",
    "url": "https://www.fs.usda.gov/media/252929"
   }
  ]
 },
 "mulberry": {
  "otherNames": "Red mulberry (Morus rubra, native) and white mulberry (Morus alba, introduced from Asia); mûrier (the tree, in French)",
  "family": "Moraceae (mulberry and fig family)",
  "range": "Red mulberry is native from southern Ontario through the eastern and central US. In Canada it is endangered: fewer than 250 mature trees survive, in Essex County, Chatham-Kent and the Niagara–Hamilton area. Outside those sites, a wild mulberry in Canada is almost certainly white mulberry, an Asian tree now naturalised across North America, or a hybrid of the two.",
  "whenToPick": "Early to mid summer — May and June in the southern US, around mid-July for red mulberry in southern Ontario. Ripe fruit falls at a shake of the branch.",
  "partsUsed": "Ripe fruit, raw or cooked. White mulberry's ripe fruit can be white, pink, red or purple-black, so colour alone doesn't tell you it's ripe — softness and sweetness do.",
  "poisonous": "Unripe fruit and the milky sap in leaves and young shoots are mildly toxic and can upset the stomach; the sap can also irritate skin.",
  "moreLookalikes": "Telling the two mulberries apart: red mulberry leaves are rough on top and soft-hairy underneath; white mulberry leaves are glossy. Both vary on one tree from plain ovals to mitten shapes and three-lobed leaves.",
  "faqs": [
   {
    "q": "When are mulberries ripe?",
    "a": "Early to mid summer — May and June in the southern US, around mid-July in southern Ontario. Ripe mulberries are soft and sweet and drop when you shake the branch, so spread a sheet underneath. Unripe ones are hard, sour and can upset your stomach."
   },
   {
    "q": "How do you tell a red mulberry from a white mulberry?",
    "a": "By the leaves: red mulberry's are rough on top and softly hairy underneath; white mulberry's are glossy. Fruit colour won't settle it — white mulberry fruit can ripen white, pink or nearly black. Red mulberry is endangered in Canada; report one to Ontario's Natural Heritage Information Centre."
   },
   {
    "q": "Are unripe mulberries poisonous?",
    "a": "Mildly. NC State Extension lists unripe mulberries and the milky sap in the leaves and shoots as low-severity poisons that can upset the stomach, and the sap may irritate skin. Ripe fruit from a tree you are sure is a mulberry is fine to eat."
   },
   {
    "q": "Is a mulberry the same as a blackberry?",
    "a": "No. The fruit looks alike, but mulberries grow on trees — red mulberry reaches 6–18 m (20–59 ft) — while blackberries grow on thorny, arching canes. Both are edible."
   }
  ],
  "sources": [
   {
    "label": "NC State Extension Plant Toolbox — Morus rubra",
    "url": "https://plants.ces.ncsu.edu/plants/morus-rubra/common-name/mulberry"
   },
   {
    "label": "NC State Extension Plant Toolbox — Morus alba",
    "url": "https://plants.ces.ncsu.edu/plants/all/morus-alba/"
   },
   {
    "label": "Government of Ontario — Red mulberry (species at risk)",
    "url": "https://www.ontario.ca/page/red-mulberry-species-risk"
   },
   {
    "label": "Environment and Climate Change Canada — Red mulberry recovery strategy: executive summary",
    "url": "https://www.canada.ca/en/environment-climate-change/services/species-risk-public-registry/recovery-strategies/red-mulberry/executive-summary.html"
   }
  ]
 },
 "elderflower": {
  "otherNames": "American elder, common elderberry, black elderberry (Sambucus canadensis, also treated as Sambucus nigra subsp. canadensis), sureau (Quebec). The European elder, Sambucus nigra, is the elderflower of classic cordial recipes.",
  "family": "Viburnaceae (formerly Adoxaceae; older books put elders in the honeysuckle family)",
  "range": "Floodplains, wet ditches, thickets, woodland and marsh edges and meadows through eastern and central North America, including southern Quebec, Ontario and the Maritimes.",
  "whenToPick": "Early to mid summer, weeks after red elderberry has finished — from May in Alabama to July and August in Minnesota; late June into July is usual in southern Canada. Pick heads on a dry morning when most flowers are open and fresh, before they brown.",
  "partsUsed": "The tiny cream flowers, snipped or stripped from their stalks, for cordial, fritters and wine; later, the fully ripe purple-black berries, cooked. Not the leaves, stems, bark, roots or unripe berries.",
  "poisonous": "Leaves, stems, bark, roots and unripe berries contain cyanogenic glycosides that can release cyanide. In 1983, eleven people in California fell ill after drinking juice from elderberries pressed with their leaves and branches. The CDC notes fresh flowers carry some of the same compound, so strip away green stalks and keep raw elderflower to modest amounts.",
  "moreLookalikes": "Red elderberry (Sambucus racemosa): egg-shaped to pyramidal flower clusters in April–June, bright red berries, and orange-brown pith in two-year-old twigs — common elder's pith stays white. Its berries are said to be inedible and even toxic; leave it. Devil's walking stick (Aralia spinosa) of the southeastern US has huge white flower clusters and compound leaves, but its stems bristle with sharp spines.",
  "faqs": [
   {
    "q": "How do you identify elderflower?",
    "a": "A many-stemmed woody shrub with opposite, compound leaves of 5–11 finely toothed leaflets (usually 7), twigs dotted with large pores, and flat to slightly domed heads of tiny five-petalled cream flowers, 8–25 cm (3–10 in) across, at the branch tips."
   },
   {
    "q": "How do you tell elderflower from red elderberry?",
    "a": "By shape and timing. Common elder's flower heads are broad and flat-topped and open in early to mid summer. Red elderberry blooms weeks earlier, in spring, in egg- or pyramid-shaped clusters, and its berries turn bright red. Split a two-year-old twig: common elder's pith is white, red elder's orange-brown."
   },
   {
    "q": "How do you tell elder from water hemlock and poison hemlock?",
    "a": "Elder is a woody shrub with bark; the hemlocks are soft-stemmed plants of the carrot family. Poison hemlock has smooth, purple-spotted stems and ferny, musty-smelling leaves; water hemlock grows in wet ground. Both can kill. Never pick a white flower head from a non-woody stem."
   },
   {
    "q": "Are elderflowers poisonous?",
    "a": "The flowers are the part people use, but the rest of the plant is the problem: leaves, stems, bark, roots and unripe berries contain cyanogenic glycosides. Snip away as much green stalk as you can, never add leaves to a brew, and keep raw elderflower to cordial-sized amounts."
   },
   {
    "q": "When does elderflower bloom?",
    "a": "Early to mid summer, weeks after red elderberry — from May in Alabama to July and August in Minnesota. In southern Quebec and Ontario, late June into July is typical."
   },
   {
    "q": "Is elderflower a tree or a shrub?",
    "a": "In North America, a shrub: American elder grows as a clump of many woody stems with white pith rather than a single trunk. The European elder of cordial recipes can grow into a small tree. Either way it has bark — the quickest way to rule out the deadly hemlocks."
   }
  ],
  "sources": [
   {
    "label": "Minnesota Wildflowers — Common elderberry (Sambucus canadensis)",
    "url": "https://www.minnesotawildflowers.info/shrub/common-elderberry"
   },
   {
    "label": "Minnesota Wildflowers — Red-berried elder (Sambucus racemosa)",
    "url": "https://www.minnesotawildflowers.info/shrub/red-berried-elder"
   },
   {
    "label": "Alabama Cooperative Extension — American elderberry production guide (look-alikes, toxicity)",
    "url": "https://www.aces.edu/blog/topics/crop-production/american-elderberry-commercial-production-guide/"
   },
   {
    "label": "CDC MMWR — Poisoning from elderberry juice, California (1984)",
    "url": "https://www.cdc.gov/mmwr/preview/mmwrhtml/00000311.htm"
   }
  ]
 },
 "chanterelle": {
  "otherNames": "Golden chanterelle, girolle. The name Cantharellus cibarius belongs to a European species; North America has several golden chanterelles of its own, including the Pacific golden chanterelle (C. formosus) in the west.",
  "family": "Cantharellaceae (now often placed in Hydnaceae)",
  "range": "Hardwood and mixed forest east of the Rockies, and Douglas fir, western hemlock and Sitka spruce forest in BC and the Pacific Northwest. Chanterelles grow from soil as partners of living trees, not from wood.",
  "whenToPick": "Summer into early fall in the east, after warm, soaking rain; fall and early winter on the Pacific coast.",
  "partsUsed": "The whole mushroom, cooked. Firm, dry specimens keep best.",
  "moreLookalikes": "False chanterelle (Hygrophoropsis aurantiaca): soft and flimsy, brighter orange, with thin true gills that fork repeatedly, growing from conifer litter or rotten wood. Woolly chanterelle (Turbinellus floccosus): a deep trumpet with a scaly orange top and whitish ridges; it causes stomach upset.",
  "faqs": [
   {
    "q": "How do you identify a golden chanterelle?",
    "a": "Egg-yolk to apricot colour, a cap that becomes a shallow funnel, and blunt, forked ridges — false gills — running down the stem, more like melted wax than knife-thin plates. The flesh inside is whitish. It grows from the ground, singly or scattered, not in tight clusters on wood."
   },
   {
    "q": "What is the difference between a chanterelle and a jack-o'-lantern?",
    "a": "Jack-o'-lanterns grow in dense clusters on stumps or buried roots of hardwoods, especially oaks, have sharp true gills, and are orange right through the flesh. Chanterelles grow from soil, rarely in tight clusters, with blunt false gills and pale flesh. Jack-o'-lanterns cause nausea and vomiting."
   },
   {
    "q": "What is a false chanterelle?",
    "a": "Hygrophoropsis aurantiaca — a soft, flimsy orange mushroom with thin, true gills that fork again and again, growing from conifer litter or well-rotted wood. A real chanterelle is firm and sturdy, with thick, blunt ridges."
   },
   {
    "q": "Where and when do chanterelles grow?",
    "a": "East of the Rockies, in hardwood and mixed forest from summer into early fall, after warm rains. On the Pacific coast, the Pacific golden chanterelle fruits in fall and early winter under Douglas fir, western hemlock and Sitka spruce."
   },
   {
    "q": "Are chanterelles safe to eat?",
    "a": "Golden chanterelles, once identified with certainty and cooked, have no known toxins, though a rare few people are allergic. The real risk is a jack-o'-lantern or false chanterelle mistaken for one, so check the gills, the flesh colour and what it is growing from."
   }
  ],
  "sources": [
   {
    "label": "MushroomExpert.com — Cantharellus cibarius",
    "url": "https://www.mushroomexpert.com/cantharellus_cibarius.html"
   },
   {
    "label": "Beaty Biodiversity Museum, UBC — Cantharellus formosus (Pacific golden chanterelle)",
    "url": "https://explore.beatymuseum.ubc.ca/mushroomsup/C_formosus.html"
   },
   {
    "label": "MushroomExpert.com — Omphalotus illudens (jack-o'-lantern)",
    "url": "https://www.mushroomexpert.com/omphalotus_illudens.html"
   },
   {
    "label": "MushroomExpert.com — Hygrophoropsis aurantiaca (false chanterelle)",
    "url": "https://www.mushroomexpert.com/hygrophoropsis_aurantiaca.html"
   }
  ]
 },
 "raspberry": {
  "otherNames": "American red raspberry, wild red raspberry, framboise (Quebec). The native North American form is Rubus idaeus subsp. strigosus.",
  "family": "Rosaceae (rose family)",
  "range": "From Alaska across Canada to Newfoundland, south to North Carolina and Tennessee in the east and to Arizona and California in the west.",
  "whenToPick": "July and August over most of southern Canada; July to September in the far north. A patch keeps ripening for weeks, so go back every few days.",
  "partsUsed": "The fruit, fresh or cooked.",
  "moreLookalikes": "Black raspberry (Rubus occidentalis), also edible, has canes with a whitish waxy bloom and cat's-claw prickles that arch over to root at the tips, and purple-black fruit that still comes off hollow. Bittersweet nightshade has smooth, glossy, egg-shaped red berries — not a cluster of drupelets — and is poisonous.",
  "faqs": [
   {
    "q": "Where do wild raspberries grow?",
    "a": "In sunny, disturbed ground: burns, old clearcuts, logging roads, old fields and forest edges, often in dense thickets. Wild red raspberry grows from Alaska to Newfoundland and south through much of the US."
   },
   {
    "q": "How do you identify a wild raspberry plant?",
    "a": "Upright or arching canes 0.5–3 m (1.6–10 ft) tall, bristly or prickly, with shreddy yellow-brown bark; leaves of three to five leaflets, white or grey and hairy underneath; and red fruit made of many small drupelets that pulls off whole, leaving a hollow cup."
   },
   {
    "q": "When are wild raspberries ripe?",
    "a": "Mostly July and August, into September in the north. A ripe berry is fully red and slips off its white core with the lightest pull; if you have to tug, leave it another day."
   },
   {
    "q": "What is the difference between a raspberry and a blackberry?",
    "a": "Pick one and look inside. A raspberry comes off hollow, leaving its core on the plant; a blackberry takes its white core with it. Black raspberries are black but hollow, and their canes wear a whitish, waxy bloom."
   },
   {
    "q": "Are there poisonous berries that look like raspberries?",
    "a": "Bittersweet nightshade is the one to know. It grows along the same edges and has glossy, egg-shaped red berries. A raspberry is a cluster of little beads with a hollow centre; a nightshade berry is a single smooth, shiny berry."
   }
  ],
  "sources": [
   {
    "label": "USDA Forest Service Fire Effects Information System — Rubus idaeus",
    "url": "https://www.fs.usda.gov/database/feis/plants/shrub/rubida/all.html"
   },
   {
    "label": "Minnesota Seasons — Black raspberry",
    "url": "https://minnesotaseasons.com/Plants/black_raspberry.html"
   },
   {
    "label": "St. Olaf College Natural Lands — Poisonous berries of Minnesota",
    "url": "https://wp.stolaf.edu/naturallands/poisonous-berries-of-minnesota/"
   }
  ]
 },
 "salmonberry": {
  "family": "Rosaceae (rose family)",
  "range": "The Pacific coast from southern Alaska and the Aleutians through coastal BC, western Washington and Oregon to northwestern California, and inland to Idaho; most abundant below about 800 m (2,600 ft).",
  "whenToPick": "One of the first wild berries of the year on the coast: June–July in the south of its range, July–August in the north and at higher elevations. The magenta flowers open from March or April.",
  "partsUsed": "The fruit, fresh. Yellow, orange and deep red are all normal ripe colours.",
  "moreLookalikes": "Thimbleberry grows alongside it but has no prickles, large soft maple-shaped leaves and white flowers. Both are edible.",
  "faqs": [
   {
    "q": "What does salmonberry look like?",
    "a": "A tall shrub, 2–4 m (7–13 ft), with scattered weak prickles, leaves mostly of three leaflets, showy magenta flowers in spring, and a raspberry-like fruit that ripens yellow, orange or deep red."
   },
   {
    "q": "When are salmonberries ripe?",
    "a": "June to July in Oregon and Washington, July to August farther north and at higher elevations. Colour varies from bush to bush, so judge by softness and taste — a ripe one pulls free easily."
   },
   {
    "q": "Where do salmonberries grow?",
    "a": "In moist to wet ground along the Pacific coast — stream banks, forest openings and edges, and damp roadside thickets — from Alaska through coastal BC to northwestern California, mostly below 800 m (2,600 ft)."
   },
   {
    "q": "What is the difference between salmonberry and thimbleberry?",
    "a": "Salmonberry has prickles, three-part leaves and magenta flowers. Thimbleberry has no thorns at all, large soft maple-shaped leaves and white to pink flowers, and its flat red berry is softer."
   }
  ],
  "sources": [
   {
    "label": "USDA Forest Service Fire Effects Information System — Rubus spectabilis",
    "url": "https://www.fs.usda.gov/database/feis/plants/shrub/rubspe/all.html"
   },
   {
    "label": "USDA Forest Service Fire Effects Information System — Rubus parviflorus",
    "url": "https://www.fs.usda.gov/database/feis/plants/shrub/rubpar/all.html"
   }
  ]
 },
 "blueberry": {
  "otherNames": "Lowbush blueberry, wild blueberry, bleuet (Quebec)",
  "family": "Ericaceae (heath family)",
  "range": "From Labrador and Newfoundland west to Manitoba and Minnesota, south to northern Illinois and through New England and the Appalachians to Virginia. Relatives called blueberries and huckleberries fill in the West.",
  "whenToPick": "Midsummer to late summer, about 50 days after the May–June flowers — July to mid-August in Maine, later farther north and at elevation. Berries ripen unevenly, so a patch can be picked more than once.",
  "partsUsed": "Berries, raw or cooked. They freeze well spread on trays the day you pick.",
  "moreLookalikes": "Common buckthorn: shiny purple-black berries on short stalks along the twigs of a tall shrub — poisonous. Canada moonseed: a vine with blue-black, bloom-dusted berries in grape-like clusters, each holding a single crescent-shaped seed — poisonous. Virginia creeper: small, firm purplish-black berries on red-pink stalks, on a climbing vine.",
  "faqs": [
   {
    "q": "How do you identify wild blueberries?",
    "a": "A low shrub 5–60 cm (2–24 in) tall with small oval leaves and white bell-shaped flowers in spring, on acidic sandy or rocky ground. The berries are 4–11 mm, dusty blue with a silvery bloom, crowned with a little five-pointed star at the tip, and full of tiny soft seeds."
   },
   {
    "q": "When do you pick wild blueberries?",
    "a": "Midsummer to late summer, about 50 days after flowering. In Maine the harvest runs from July to mid-August; farther north and higher up it comes later. Go back to a good patch more than once, since berries ripen unevenly."
   },
   {
    "q": "How can you tell if a wild blueberry is ripe?",
    "a": "It is navy blue all over, with a powdery silver-white coating, plump and smooth-skinned. Any red or green near the stem means wait; shrivelled berries are past it."
   },
   {
    "q": "What poisonous berries look like blueberries?",
    "a": "Common buckthorn, Canada moonseed and Virginia creeper. Buckthorn has shiny purple-black berries on a tall shrub; moonseed is a vine with grape-like clusters and one crescent-shaped seed per berry; Virginia creeper's berries sit on red-pink stalks. A wild blueberry grows on a low shrub and wears a crown at the tip."
   },
   {
    "q": "What is the difference between a blueberry and a huckleberry?",
    "a": "In the east, check seeds and leaves. Black huckleberry (Gaylussacia) has ten seeds per berry and yellow resin dots under its leaves (use a hand lens); blueberries have many tiny seeds and no resin dots. In the west, 'huckleberry' usually means a Vaccinium, the blueberry's own genus."
   },
   {
    "q": "Where do wild blueberries grow best?",
    "a": "In open, acidic ground: barrens, rocky outcrops, sandy riverbanks, upland bogs and open mixed woods. They thrive after fire — the plants resprout from underground stems and are back in force two or three years after a burn."
   }
  ],
  "sources": [
   {
    "label": "USDA Forest Service Fire Effects Information System — Vaccinium angustifolium",
    "url": "https://www.fs.usda.gov/database/feis/plants/shrub/vacang/all.html"
   },
   {
    "label": "University of Maine Cooperative Extension — Wild Blueberries (Bulletin 4263)",
    "url": "https://extension.umaine.edu/publications/4263e/"
   },
   {
    "label": "Illinois Wildflowers — Black huckleberry (Gaylussacia baccata)",
    "url": "https://illinoiswildflowers.info/savanna/plants/bl_huckleberry.htm"
   },
   {
    "label": "St. Olaf College Natural Lands — Poisonous berries of Minnesota",
    "url": "https://wp.stolaf.edu/naturallands/poisonous-berries-of-minnesota/"
   }
  ]
 },
 "huckleberry": {
  "otherNames": "Big huckleberry, thinleaf or black huckleberry, mountain huckleberry (Vaccinium membranaceum, which now includes what was called globe huckleberry). In the east, 'huckleberry' usually means black huckleberry, Gaylussacia baccata.",
  "family": "Ericaceae (heath family)",
  "range": "Mountain forest from Alaska and BC south through the Cascades and Olympics to California, and east through Alberta and the northern Rockies to Wyoming, with outlying populations as far east as Ontario and Michigan. In the Cascades it is most common at 900–1,800 m (3,000–5,900 ft).",
  "whenToPick": "Late July to late September, varying with elevation, slope and the year. Flowers bloom from mid-May to early July, and a hard late frost can wipe out a season's crop.",
  "partsUsed": "The berries, raw or cooked. They freeze well.",
  "moreLookalikes": "Serviceberry (edible) grows as a taller shrub or small tree, with fruit in clusters at the branch ends and 4–10 soft seeds per berry. Common buckthorn's shiny purple-black berries grow on short stalks along the twigs and are poisonous.",
  "faqs": [
   {
    "q": "What do huckleberries look like?",
    "a": "Round, sweet berries, very dark reddish-purple to black, often shiny but sometimes dusted with a waxy bloom. They hang one at a time from the underside of the twigs rather than in bunches, and are large for a wild blueberry relative."
   },
   {
    "q": "How do you identify a huckleberry bush?",
    "a": "A deciduous shrub from ankle height to about 2 m (6.5 ft), with elliptical leaves up to 5 cm (2 in) long, pointed at the tip and finely toothed. Creamy-pink, bell-shaped flowers, then berries, hang singly under the twigs. Look in mountain forest openings and old burns."
   },
   {
    "q": "When is huckleberry picking season?",
    "a": "Late July to late September, depending on elevation, slope and the year's weather. Lower, sunnier slopes ripen first, so move uphill as the season goes on. Open or lightly treed sites bear best; under a closed canopy the bushes produce few berries."
   },
   {
    "q": "How do you know huckleberries are ripe?",
    "a": "They are very dark reddish-purple to black all the way round and plump. Red or green berries are unripe and sour. Ripening runs over weeks across a slope, so a good patch is worth more than one visit."
   },
   {
    "q": "What is the difference between a huckleberry and a serviceberry?",
    "a": "Huckleberries hang singly under the twigs of a shrub under 2 m and hold dozens of tiny seeds. Serviceberries hang in clusters at the branch tips of a shrub or small tree up to 8 m, ripen earlier, and hold 4–10 soft seeds. Both are edible."
   },
   {
    "q": "Are eastern huckleberries the same as western huckleberries?",
    "a": "No. Western huckleberries are Vaccinium, the blueberry genus — one Washington national forest alone has a dozen species. The eastern black huckleberry is Gaylussacia: each berry has ten seeds, and the leaves have yellow resin dots underneath. Both are edible."
   }
  ],
  "sources": [
   {
    "label": "USDA Forest Service, Gifford Pinchot NF — Big huckleberry sustainability analysis",
    "url": "https://www.fs.usda.gov/media/252929"
   },
   {
    "label": "USDA Forest Service Fire Effects Information System — Vaccinium membranaceum",
    "url": "https://www.fs.usda.gov/database/feis/plants/shrub/vacmem/all.html"
   },
   {
    "label": "Illinois Wildflowers — Black huckleberry (Gaylussacia baccata)",
    "url": "https://illinoiswildflowers.info/savanna/plants/bl_huckleberry.htm"
   },
   {
    "label": "USDA Forest Service Fire Effects Information System — Amelanchier alnifolia",
    "url": "https://www.fs.usda.gov/database/feis/plants/shrub/amealn/all.html"
   }
  ]
 },
 "thimbleberry": {
  "otherNames": "Western thimbleberry",
  "family": "Rosaceae (rose family)",
  "range": "Western North America from Alaska and BC south to northern Mexico and east through Alberta and the Rockies, with outlying populations around the Great Lakes, including Ontario, Michigan and Minnesota.",
  "whenToPick": "Mid to late summer. Flowers open from May to July, and the fruit follows — mostly in August and September across much of the range, earlier in some warm, low sites.",
  "partsUsed": "The fruit, fresh or cooked into jam. Too soft to carry far.",
  "moreLookalikes": "Salmonberry, on the coast, has prickles, three-part leaves and magenta flowers. Both are edible.",
  "faqs": [
   {
    "q": "How do you identify thimbleberry?",
    "a": "A thornless shrub up to 3 m (10 ft) with huge, soft, maple-shaped leaves up to 20 cm (8 in) across, white to pale pink flowers up to 5 cm (2 in) wide, and a flat red dome of a berry that lifts off like a thimble."
   },
   {
    "q": "When are thimbleberries ripe?",
    "a": "Mostly August and September across the range, earlier in some warm, low spots. Ripe ones are soft, bright red and let go at a touch. They crush easily, so pick into a shallow container."
   },
   {
    "q": "Where do thimbleberries grow?",
    "a": "In moist forest edges, clearings, streamsides and road cuts across the west, from sea level to the subalpine, and in a few pockets around the Great Lakes, including Ontario and Michigan."
   },
   {
    "q": "Are thimbleberries edible raw?",
    "a": "Yes — once you're sure of the plant, ripe thimbleberries are eaten fresh, right off the bush, since they don't keep. If you gather enough, cook them into jam the same day."
   }
  ],
  "sources": [
   {
    "label": "USDA Forest Service Fire Effects Information System — Rubus parviflorus",
    "url": "https://www.fs.usda.gov/database/feis/plants/shrub/rubpar/all.html"
   },
   {
    "label": "USDA Forest Service Fire Effects Information System — Rubus spectabilis",
    "url": "https://www.fs.usda.gov/database/feis/plants/shrub/rubspe/all.html"
   }
  ]
 },
 "prickly-pear": {
  "otherNames": "Tuna (the fruit), nopal and nopales (the pads); Engelmann, plains, eastern and coast prickly pear",
  "family": "Cactaceae (cactus family)",
  "range": "Deserts of the Southwest (Engelmann's prickly pear); the Great Plains north into southern Alberta and Saskatchewan (plains prickly pear) and the dry valleys of BC's interior (brittle prickly pear); the eastern US (eastern prickly pear); and coastal southern California (coast prickly pear). In Canada, eastern prickly pear survives at only two sites, both on Lake Erie in Ontario, where it is endangered.",
  "whenToPick": "Young pads (nopales) in spring and early summer. Fruit ripens in late summer and fall: plains prickly pear about two and a half months after its June–July flowers, by September. Ripe fruit has turned from green to red, magenta or purple.",
  "partsUsed": "Fruit (tunas), peeled, for eating, juice, syrup and jelly; young pads (nopales), with bristles removed, raw or cooked. The hard seeds are usually strained out.",
  "faqs": [
   {
    "q": "How do you pick prickly pear fruit?",
    "a": "With tongs and thick gloves. Twist ripe fruit off the pad, then burn off or scrub away the tufts of hair-fine glochids before you peel it. The glochids are barbed, lodge in skin and cause lasting irritation, so keep your hands away from your eyes."
   },
   {
    "q": "When is prickly pear fruit ripe?",
    "a": "Late summer into fall, once the fruit has turned fully red, magenta or purple. Plains prickly pear is ripe by about September; eastern prickly pear fruit matures in late summer and can hang on through winter."
   },
   {
    "q": "Can you eat prickly pear pads?",
    "a": "Yes — the young pads, called nopales, are eaten raw or cooked once the bristles are removed. Grill them whole, or slice and sauté."
   },
   {
    "q": "Does prickly pear grow in Canada?",
    "a": "Yes. Plains prickly pear grows on dry grassland in southern Alberta and Saskatchewan, and brittle prickly pear in BC's dry interior valleys. Eastern prickly pear clings on at the only two sites in Canada, both sand spits on Lake Erie in Ontario, where it is endangered and protected by law — don't pick it there."
   },
   {
    "q": "What can I forage around San Diego?",
    "a": "Coast prickly pear is one of the most visible wild foods: it grows in coastal sage scrub and chaparral across southern California and bears edible purplish-red fruit up to 5 cm (2 in) long. Check who manages the land before you pick — many parks and reserves don't allow it."
   }
  ],
  "sources": [
   {
    "label": "USDA Forest Service Fire Effects Information System — Opuntia polyacantha",
    "url": "https://www.fs.usda.gov/database/feis/plants/cactus/opupol/all.html"
   },
   {
    "label": "NC State Extension Plant Toolbox — Opuntia humifusa",
    "url": "https://plants.ces.ncsu.edu/plants/opuntia-humifusa/"
   },
   {
    "label": "Government of Ontario — Eastern prickly-pear cactus (species at risk)",
    "url": "https://www.ontario.ca/page/eastern-prickly-pear-cactus"
   },
   {
    "label": "Calscape (California Native Plant Society) — Coast prickly pear",
    "url": "https://calscape.org/Opuntia-littoralis-()"
   }
  ]
 },
 "blackberry": {
  "otherNames": "Allegheny blackberry, common blackberry, mûre (Quebec). On the Pacific coast the big roadside thickets are usually Himalayan blackberry (Rubus armeniacus), an introduced species.",
  "family": "Rosaceae (rose family)",
  "range": "Wild blackberries of one kind or another grow across southern Canada and the US. In the east the common one is Allegheny blackberry; on the Pacific coast, introduced Himalayan and cutleaf blackberries form huge thickets alongside the native trailing blackberry.",
  "whenToPick": "Mostly August into September in southern Canada, with the same patch ripening for weeks. Berries turn green, then red, then black; glossy black is still tart, dull black and soft is ripe. Himalayan blackberry ripens over a long stretch from summer into fall.",
  "partsUsed": "The fruit, raw or cooked.",
  "moreLookalikes": "Black raspberry is also black and edible, but comes off its core hollow; its round canes wear a whitish, waxy bloom, while blackberry canes are angled, with vertical grooves.",
  "faqs": [
   {
    "q": "How do you identify a blackberry plant?",
    "a": "Arching canes 1–3.5 m (3–12 ft) long that turn dark red or purple, armed with broad-based prickles; leaves of mostly five leaflets spread like fingers, velvety underneath; white five-petalled flowers in long, narrow clusters; and berries that take their white core with them when picked."
   },
   {
    "q": "How do you tell a wild blackberry bush from black raspberry?",
    "a": "Pick a berry: a blackberry comes away with its core inside; a black raspberry is hollow. Then check the canes — black raspberry canes are round, coated in a whitish, waxy bloom and armed with cat's-claw prickles, while blackberry canes are angled and grooved."
   },
   {
    "q": "Why are my wild blackberries red?",
    "a": "They aren't ripe yet. Blackberries go from green to red to black as they ripen, and even glossy black ones are often sour. Wait until they are dull black and soft and drop into your hand."
   },
   {
    "q": "When are wild blackberries ripe?",
    "a": "Mostly August into September in southern Canada and the northern US, and the same patch keeps ripening for weeks. On the Pacific coast, Himalayan blackberry fruits over a long stretch from summer into fall."
   },
   {
    "q": "Why do some blackberry canes have no flowers?",
    "a": "They are first-year canes. Blackberries fruit on older canes: in its first year a cane grows long and leafy; the next year it sends out short side branches that flower and fruit, and it dies back soon after."
   }
  ],
  "sources": [
   {
    "label": "Minnesota Wildflowers — Allegheny blackberry (Rubus allegheniensis)",
    "url": "https://www.minnesotawildflowers.info/shrub/allegheny-blackberry"
   },
   {
    "label": "Minnesota Seasons — Black raspberry",
    "url": "https://minnesotaseasons.com/Plants/black_raspberry.html"
   },
   {
    "label": "USDA Forest Service Fire Effects Information System — Himalayan blackberry (Rubus armeniacus)",
    "url": "https://www.fs.usda.gov/database/feis/plants/shrub/rubspp/all.pdf"
   }
  ]
 },
 "chicken-of-the-woods": {
  "otherNames": "Sulphur shelf, chicken mushroom. Several species: Laetiporus sulphureus on eastern hardwoods, L. cincinnatus at the base of oaks, L. gilbertsonii on eucalyptus and oak in the west, and L. huroniensis and L. conifericola on conifers.",
  "family": "Laetiporaceae (bracket fungi)",
  "range": "East of the Rockies on oaks and other hardwoods, including southern Ontario and Quebec. Western species grow along the Pacific coast (on eucalyptus and oak) and in the mountains (on conifers).",
  "whenToPick": "Summer and fall, occasionally winter or spring. Best within a few days of appearing, while the edges are soft, thick and moist.",
  "partsUsed": "Only the tender outer margins of young, fresh brackets, cooked thoroughly. Older growth is tough and more likely to upset stomachs.",
  "poisonous": "Edible with caution. Chicken of the woods regularly causes stomach upsets — bloating, cramps, nausea, vomiting, diarrhea — in some people even when correctly identified. Old or undercooked specimens are the usual suspects. Eat young margins only, cook thoroughly, and start small.",
  "moreLookalikes": "Dyer's polypore (Phaeolus schweinitzii) grows from the roots at the base of conifers: a velvety brown to olive cap with yellow or orange pores that bruise brown. It is not a chicken of the woods and not one to eat. The rosette with a white pore surface at the base of an oak is L. cincinnatus, a true chicken of the woods.",
  "faqs": [
   {
    "q": "How do you identify chicken of the woods?",
    "a": "Overlapping fan-shaped shelves, bright orange on top, with a yellow underside of tiny pores — never gills — growing from standing or fallen trees, mostly oak and other hardwoods. A pinkish-orange rosette with a white pore surface at an oak's base is its relative L. cincinnatus."
   },
   {
    "q": "Is chicken of the woods safe to eat?",
    "a": "Edible with caution. Correctly identified and well cooked, most people eat it happily, but it regularly causes stomach upsets. Take only the young, soft outer edges, cook them thoroughly, and try a small amount the first time."
   },
   {
    "q": "Is chicken of the woods from eucalyptus or conifers dangerous?",
    "a": "It gets blamed more often. Foragers link reactions to chicken of the woods on eucalyptus and conifers, and both western species have been implicated — but reactions also follow eastern oak specimens, often old or undercooked ones. The cautious choice is young growth from hardwoods."
   },
   {
    "q": "When is chicken of the woods in season?",
    "a": "Summer and fall east of the Rockies, sometimes winter or spring. The fungus rots the tree's heartwood, so the same tree can fruit for years — note the spot. Pick within a few days of a flush, while the edges are still soft."
   },
   {
    "q": "Where does chicken of the woods grow?",
    "a": "On oaks and other hardwoods in the east — trunks, stumps and fallen logs. In the west, look on eucalyptus and oaks along the coast (L. gilbertsonii) and on conifers in the mountains (L. conifericola)."
   }
  ],
  "sources": [
   {
    "label": "MushroomExpert.com — Laetiporus sulphureus",
    "url": "https://www.mushroomexpert.com/laetiporus_sulphureus.html"
   },
   {
    "label": "MushroomExpert.com — The genus Laetiporus in North America",
    "url": "https://www.mushroomexpert.com/laetiporus.html"
   },
   {
    "label": "Bay Area Mycological Society — Western sulphur shelves",
    "url": "https://bayareamushrooms.org/mushroommonth/sulphur_shelf.html"
   },
   {
    "label": "MykoWeb, California Fungi — Laetiporus gilbertsonii",
    "url": "https://www.mykoweb.com/CAF/species/Laetiporus_gilbertsonii.html"
   },
   {
    "label": "MushroomExpert.com — Phaeolus schweinitzii (dyer's polypore)",
    "url": "https://www.mushroomexpert.com/phaeolus_schweinitzii.html"
   }
  ]
 },
 "hen-of-the-woods": {
  "otherNames": "Maitake, sheep's head, ram's head",
  "family": "Grifolaceae (polypores)",
  "range": "East of the Rockies, including southern Ontario and Quebec; rare in the west.",
  "whenToPick": "Late summer and fall — mostly September and October in southern Canada — often at the same tree year after year.",
  "partsUsed": "The whole rosette while young and tender. Trim off the tough central core and any old, yellowing edges.",
  "poisonous": "Most people eat it without trouble, but NAMA's poisoning registry holds several reports of stomach upset, chills and cramps after maitake. Cook it well and try a modest portion first.",
  "moreLookalikes": "Black-staining polypore (Meripilus sumstinei): larger, broader individual caps with smaller pores, and every surface bruises black when handled. Umbrella polypore (Polyporus umbellatus): a cluster of small, round, separate caps, each on its own stalk.",
  "faqs": [
   {
    "q": "How do you identify hen of the woods?",
    "a": "A large grey-brown rosette of overlapping, spoon-shaped caps on a branched white base at the foot of an oak. Underneath are pores — white to cream — not gills. It comes back to the same tree year after year."
   },
   {
    "q": "When is hen of the woods season?",
    "a": "Late summer through fall, mostly September and October in southern Canada and the northern US. Check the bases of big old oaks you already know."
   },
   {
    "q": "What looks like hen of the woods?",
    "a": "Black-staining polypore, with larger, broader caps that bruise black where you touch them, and umbrella polypore, whose small round caps each sit on a separate stalk. Press a cap and wait a few minutes before you decide."
   },
   {
    "q": "What's the difference between hen of the woods and chicken of the woods?",
    "a": "Colour and form. Hen of the woods is a grey-brown ruffled rosette at the base of an oak. Chicken of the woods is a stack of bright orange-and-yellow shelves growing out of a trunk or log. Both have pores, not gills."
   }
  ],
  "sources": [
   {
    "label": "MushroomExpert.com — Grifola frondosa",
    "url": "https://www.mushroomexpert.com/grifola_frondosa.html"
   },
   {
    "label": "NAMA — Summary of mushroom poisoning reports, 2018–2020 (M. W. Beug)",
    "url": "https://namyco.org/wp-content/uploads/2023/08/2018-2020_Summary_of_Mushroom_Poisoning_Reports_Corrected_final.pdf"
   }
  ]
 },
 "giant-puffball": {
  "family": "Agaricaceae (the puffballs, once their own family, Lycoperdaceae)",
  "range": "From the Great Plains eastward, including southern Ontario and Quebec; only occasionally reported in the Southwest and on the West Coast, where the scaly western giant puffball (Calvatia booniana) is more likely.",
  "whenToPick": "Late summer and early fall — August to October.",
  "partsUsed": "The white interior of a young fruiting body, sliced and cooked. Peel the skin if it's tough.",
  "poisonous": "Eat only puffballs that are pure white inside. Once the interior turns yellowish, olive or brown it is turning to spores, and over-mature puffballs — even cooked — have caused stomach upsets.",
  "moreLookalikes": "Common earthball (Scleroderma citrinum): a smaller ball with a hard, scaly, yellowish-brown skin, a thick white rind and a purple-grey to purple-black interior. Never eat a 'puffball' that is dark inside. The western giant puffball (Calvatia booniana) is covered in polygonal scales.",
  "faqs": [
   {
    "q": "How do you identify a giant puffball?",
    "a": "A smooth white ball, usually 20–30 cm (8–12 in) across and sometimes far bigger, sitting on the ground in a meadow, woodland edge or ditch. Slice it top to bottom: it must be solid pure white like fresh marshmallow, with no gills and no outline of a developing mushroom."
   },
   {
    "q": "When is a giant puffball too old to eat?",
    "a": "As soon as the inside is anything but pure white. It turns yellowish, then olive, then brown spore dust. Throw out any that show colour — over-mature puffballs cause stomach upsets."
   },
   {
    "q": "What looks like a giant puffball?",
    "a": "A young Amanita still in its egg — including the deadly destroying angel — and earthballs. Slicing tells both: an Amanita egg shows the silhouette of a cap and stem, and an earthball is purple-black inside a thick rind."
   },
   {
    "q": "When and where do giant puffballs grow?",
    "a": "Late summer and early fall, alone or in groups, in woods and in grass — meadow edges, drainage ditches, pastures and under brush. They are most common from the Great Plains east."
   }
  ],
  "sources": [
   {
    "label": "MushroomExpert.com — Calvatia gigantea",
    "url": "https://www.mushroomexpert.com/calvatia_gigantea.html"
   },
   {
    "label": "MushroomExpert.com — Scleroderma citrinum (common earthball)",
    "url": "https://www.mushroomexpert.com/scleroderma_citrinum.html"
   },
   {
    "label": "NAMA — Summary of mushroom poisoning reports, 2018–2020 (M. W. Beug)",
    "url": "https://namyco.org/wp-content/uploads/2023/08/2018-2020_Summary_of_Mushroom_Poisoning_Reports_Corrected_final.pdf"
   }
  ]
 },
 "king-bolete": {
  "otherNames": "Porcini, cep, penny bun. Boletus edulis is originally a European name; North America has more than a dozen edulis-like species, including the spring king (B. rex-veris) and B. variipes.",
  "family": "Boletaceae",
  "range": "Under conifers in the west — hemlock, spruce, pine and fir, with big flushes on the BC and Pacific coast — and with conifers and hardwoods across the boreal and mixed forest of the east.",
  "whenToPick": "Mostly fall; September to November on the BC coast. Some North American members of the group fruit in spring or summer, depending on elevation.",
  "partsUsed": "Cap and stem, cooked or dried. Firm young buttons with white, 'stuffed' pores are the prize; spongy old pores are often peeled away.",
  "poisonous": "Edible for most people once identified with certainty and cooked; a rare few get stomach upset.",
  "moreLookalikes": "Bitter bolete (Tylopilus felleus), under eastern conifers: pores white then pink, a dark brown, wide-meshed net on the stem, and an extremely bitter taste. In the west, red-pored boletes such as Rubroboletus eastwoodiae have orange or red pores that bruise blue to black, and are poisonous.",
  "faqs": [
   {
    "q": "How do you identify a king bolete?",
    "a": "A brown, bun-like cap; pores instead of gills, white and 'stuffed' when young and greenish-yellow with age; a thick, swollen stem with a fine pale net near the top; and flesh that doesn't change colour when cut or bruised."
   },
   {
    "q": "What is the bitter look-alike of porcini?",
    "a": "Bitter bolete, Tylopilus felleus. Its pores turn from white to pink, the net on its stem is dark brown and coarse, and its taste is extremely bitter — one in the pan spoils the whole dish."
   },
   {
    "q": "Where do king boletes grow?",
    "a": "On the ground under the trees they partner with: hemlock, spruce, pine and fir in the west, where coastal flushes follow the first autumn rains, and conifers and hardwoods in the east. Look mainly in fall."
   },
   {
    "q": "Which boletes should you avoid?",
    "a": "Any with red or orange pores, and any whose pores bruise blue or black when you press them — some of these are poisonous. A king bolete's pores are white to yellowish and don't stain."
   }
  ],
  "sources": [
   {
    "label": "MushroomExpert.com — Boletus edulis",
    "url": "https://www.mushroomexpert.com/boletus_edulis.html"
   },
   {
    "label": "Beaty Biodiversity Museum, UBC — Boletus edulis",
    "url": "https://explore.beatymuseum.ubc.ca/mushroomsup/B_edulis.html"
   },
   {
    "label": "MushroomExpert.com — Tylopilus felleus (bitter bolete)",
    "url": "https://www.mushroomexpert.com/tylopilus_felleus.html"
   }
  ]
 },
 "lobster-mushroom": {
  "family": "Hypocreaceae (parasitic moulds)",
  "range": "Widely distributed across Canada, the United States and Mexico, wherever its host mushrooms grow.",
  "whenToPick": "Summer and fall, or over winter in warm climates; mostly fall on the BC coast.",
  "partsUsed": "The whole transformed mushroom, scrubbed of soil and cooked. Inside, the flesh stays firm and white.",
  "poisonous": "Some people get stomach upset, sweating or a burning throat after eating lobster mushrooms, and NAMA's poisoning registry includes a few cases. Eat only young, firm, bright specimens, cooked, and start small.",
  "faqs": [
   {
    "q": "What is a lobster mushroom?",
    "a": "A mould, Hypomyces lactifluorum, that attacks another mushroom and covers it in a hard, pimply orange-red crust, reshaping it as it goes. The host is usually the short-stemmed Russula (Russula brevipes) or a milk cap such as Lactarius deceptivus or the peppery milk cap group."
   },
   {
    "q": "Where do lobster mushrooms grow?",
    "a": "Wherever their hosts do: on the ground in conifer and mixed forest, often half-buried in duff. On the BC coast they turn up under Sitka spruce, Douglas fir and western hemlock; across the east, in mixed woods where Russula and milk caps are common. Summer to fall."
   },
   {
    "q": "How do you know if a lobster mushroom is too old?",
    "a": "It has turned purple or magenta, gone soft, or smells strongly fishy. A good one is bright orange, firm, and white inside when cut. Leave the old ones in the forest."
   },
   {
    "q": "Are lobster mushrooms safe to eat?",
    "a": "Most people eat young, firm lobster mushrooms without trouble once they're identified with certainty and cooked, but some get stomach upset, sweating or a burning throat. Try a small portion the first time."
   }
  ],
  "sources": [
   {
    "label": "MushroomExpert.com — Hypomyces lactifluorum",
    "url": "https://www.mushroomexpert.com/hypomyces_lactifluorum.html"
   },
   {
    "label": "Beaty Biodiversity Museum, UBC — Hypomyces lactifluorum (lobster mushroom)",
    "url": "https://explore.beatymuseum.ubc.ca/mushroomsup/H_lactifluorum.html"
   },
   {
    "label": "NAMA — Summary of mushroom poisoning reports, 2018–2020 (M. W. Beug)",
    "url": "https://namyco.org/wp-content/uploads/2023/08/2018-2020_Summary_of_Mushroom_Poisoning_Reports_Corrected_final.pdf"
   }
  ]
 },
 "matsutake": {
  "otherNames": "Pine mushroom, American matsutake. Tricholoma matsutake is the Eurasian species, the 'Japanese pine mushroom'; North America has its own — T. murrillianum in the west, T. magnivelare in the east and T. mesoamericanum in Mexico.",
  "family": "Tricholomataceae",
  "range": "West: conifer forest with pines, Douglas fir, western hemlock and spruce, from BC south. East (T. magnivelare): the upper Midwest and northeast, south through the Appalachians, with hard pines — jack, red and pitch pine — and eastern hemlock.",
  "whenToPick": "Fall into early winter.",
  "partsUsed": "The whole mushroom. Firm young buttons with the veil still closed are the most prized; slice thin for broth or rice.",
  "moreLookalikes": "Tricholoma caligatum has a similar brown-scaly look but grows with hardwoods, lacks the matsutake smell and is often bitter.",
  "faqs": [
   {
    "q": "What is the Japanese pine mushroom?",
    "a": "Tricholoma matsutake, the matsutake of Japan, Korea and Eurasia, prized for its spicy aroma. North America has close relatives that go by the same name: T. murrillianum, the western pine mushroom, and T. magnivelare in the east."
   },
   {
    "q": "How do you identify a matsutake mushroom?",
    "a": "A dense, heavy, white to brownish mushroom with brown scales on cap and stem, white gills, a thick white veil that leaves a flaring ring, and firm, rubbery flesh. Above all, the smell: spicy, like cinnamon red-hot candy mixed with dirty gym socks."
   },
   {
    "q": "Where do matsutake grow?",
    "a": "In the west, in conifer duff under pines, Douglas fir, western hemlock and spruce. In the east, T. magnivelare grows with jack, red and pitch pine and eastern hemlock, from the upper Midwest and northeast down the Appalachians. Fall into early winter."
   },
   {
    "q": "How do you tell matsutake from Amanita smithiana?",
    "a": "Dig it up whole. Smith's amanita has a torpedo-shaped bulb at the stem base, and its stem often snaps off cleanly; a matsutake's stem tapers into the ground and resists when wiggled. The amanita lacks the spicy smell. If in doubt, throw it out."
   },
   {
    "q": "What happens if you eat Amanita smithiana?",
    "a": "Vomiting and diarrhea within about six hours, then kidney injury that shows up one to four days later and can need dialysis. People have eaten it believing they had matsutake. Get medical help at once if you suspect it."
   }
  ],
  "sources": [
   {
    "label": "MushroomExpert.com — Tricholoma magnivelare",
    "url": "https://www.mushroomexpert.com/tricholoma_magnivelare.html"
   },
   {
    "label": "Beaty Biodiversity Museum, UBC — Tricholoma murrillianum (western pine mushroom)",
    "url": "https://explore.beatymuseum.ubc.ca/mushroomsup/T_murrillianum.html"
   },
   {
    "label": "Journal of Urgent Care Medicine — Foraged mushroom toxicity presenting with acute kidney injury",
    "url": "https://www.jucm.com/foraged-mushroom-toxicity-presenting-to-urgent-care-with-acute-kidney-injury/"
   },
   {
    "label": "FUNGI Magazine — M. W. Beug on mushroom poisonings (Amanita smithiana)",
    "url": "https://www.fungimag.com/summer-09-articles/Beug.pdf"
   }
  ]
 },
 "oyster-mushroom": {
  "otherNames": "Oyster fungus, pleurote (Quebec). Three common North American species: Pleurotus ostreatus (cold weather), P. pulmonarius (warm weather) and P. populinus (only on aspen and cottonwood).",
  "family": "Pleurotaceae",
  "range": "Across Canada and the US on dead and dying hardwood — logs, stumps and standing trees — and occasionally on conifers.",
  "whenToPick": "P. ostreatus fruits in cold weather, from late fall through early spring (roughly October to April), including winter thaws. The paler P. pulmonarius takes over from late April through September. Look after soaking rain or a thaw.",
  "partsUsed": "Caps and the tender part of the stem, cooked. Trim off tough stem bases.",
  "moreLookalikes": "Angel wings (Pleurocybella porrigens): thinner, pure white, stemless, and only on conifer wood; linked to a 2004 outbreak of illness and deaths in Japan, mostly among older people with kidney disease, and not recommended. Crepidotus: small shelf mushrooms with a brown spore print. Lentinellus: gills with saw-toothed edges.",
  "faqs": [
   {
    "q": "Where do oyster mushrooms grow?",
    "a": "On wood: dead standing trees, logs and stumps of hardwoods such as poplar, aspen, beech and maple, occasionally conifers. They form overlapping shelves, often high on a trunk. The classic oyster fruits in cold weather, so look after rain or a winter thaw."
   },
   {
    "q": "What kinds of oyster mushroom grow wild?",
    "a": "Three main ones: Pleurotus ostreatus, brownish, fruiting from about October to April; P. pulmonarius, paler and often smaller, from late April to September; and P. populinus, found only on aspen and cottonwood. They look very alike and are all used the same way."
   },
   {
    "q": "How do you identify a brown oyster mushroom?",
    "a": "Brown oysters are usually Pleurotus ostreatus in cold weather — caps pale to dark brown, fading to buff. Check for shelving clusters on wood, white to greyish gills running down into a stubby off-centre stem or none, and a white to lilac spore print. A brown spore print rules it out."
   },
   {
    "q": "What mushrooms look like oyster mushrooms?",
    "a": "Angel wings — thinner, pure white and only on conifer wood, linked to deaths in Japan. Crepidotus — small, with a brown spore print. Lentinellus — gills with saw-toothed edges. Jack-o'-lanterns — orange, with sharp gills. A spore print and a look at the wood settle most cases."
   },
   {
    "q": "Is it true oyster mushrooms eat worms?",
    "a": "Yes. Oyster mushroom threads grow tiny lollipop-shaped structures that release 3-octanone, a volatile chemical that paralyses and kills nematodes, which the fungus then feeds on. Researchers at Academia Sinica in Taiwan described how it works in 2023."
   },
   {
    "q": "Can you eat oyster mushrooms raw?",
    "a": "Cook them. Like other wild mushrooms, oysters should be cooked through; NAMA's poisoning registry includes a case of stomach upset after oysters eaten raw. Once identified with certainty and cooked, they are a good first mushroom for beginners."
   }
  ],
  "sources": [
   {
    "label": "MushroomExpert.com — Pleurotus ostreatus",
    "url": "https://www.mushroomexpert.com/pleurotus_ostreatus.html"
   },
   {
    "label": "Beaty Biodiversity Museum, UBC — Pleurocybella porrigens (angel wings)",
    "url": "https://explore.beatymuseum.ubc.ca/mushroomsup/P_porrigens.html"
   },
   {
    "label": "Tom Volk's Fungus of the Month (University of Wisconsin) — Pleurotus ostreatus",
    "url": "https://botit.botany.wisc.edu/toms_fungi/oct98.html"
   },
   {
    "label": "Phys.org — 3-octanone identified as the toxic agent in oyster mushrooms (2023)",
    "url": "https://phys.org/news/2023-01-octanone-toxic-agent-oyster-mushrooms.html"
   }
  ]
 },
 "lions-mane": {
  "otherNames": "Bearded tooth fungus, pom-pom mushroom",
  "family": "Hericiaceae",
  "range": "Across North America from Canada to Mexico, and in Europe and Asia — on hardwoods, especially oaks, and also beech and maple.",
  "whenToPick": "Late summer and fall; winter and spring in warmer climates.",
  "partsUsed": "The whole spine-covered clump while it is white. Once it yellows or browns it is past its best.",
  "poisonous": "NAMA's poisoning registry includes a few reports of stomach upset after lion's mane, raw and cooked. Cook it, and try a small amount first.",
  "moreLookalikes": "Its relatives bear's head tooth (Hericium americanum) and comb tooth (H. coralloides) are branched, with spines along the branches. Young ones can start as a single clump and branch later, so judge from a mature specimen.",
  "faqs": [
   {
    "q": "How do you identify lion's mane mushroom?",
    "a": "A single, unbranched white clump of soft spines 1–4 cm (½–1½ in) long, hanging like a beard from a tough hidden base, usually from a wound on a hardwood. It yellows or browns with age and gives a white spore print."
   },
   {
    "q": "Where does lion's mane grow?",
    "a": "On hardwoods, especially oaks, often from a wound, a broken limb or an old scar on the trunk, sometimes well above your head. It grows across North America from Canada to Mexico."
   },
   {
    "q": "What looks like lion's mane?",
    "a": "Mainly its own relatives: bear's head tooth and comb tooth, which are branched rather than a single clump. Young ones can start out as a clump and branch later, so make sure your specimen is mature before you name it."
   },
   {
    "q": "When is lion's mane in season?",
    "a": "Late summer and fall in the north; winter and spring in warmer climates. Pick it while it is pure white and soft — yellowish or brown tips mean it is ageing."
   }
  ],
  "sources": [
   {
    "label": "MushroomExpert.com — Hericium erinaceus",
    "url": "https://www.mushroomexpert.com/hericium_erinaceus.html"
   },
   {
    "label": "NAMA — Summary of mushroom poisoning reports, 2018–2020 (M. W. Beug)",
    "url": "https://namyco.org/wp-content/uploads/2023/08/2018-2020_Summary_of_Mushroom_Poisoning_Reports_Corrected_final.pdf"
   }
  ]
 },
 "hazelnut": {
  "otherNames": "American hazelnut (Corylus americana) and beaked hazelnut (Corylus cornuta), noisetier (Quebec); California hazelnut on the Pacific coast",
  "family": "Betulaceae (birch family)",
  "range": "Beaked hazelnut: north-central BC east to Newfoundland, south to the Dakotas, Iowa and Michigan and down the Appalachians. American hazelnut: Maine west to Saskatchewan, south to Oklahoma and Georgia, including Manitoba, Ontario and Quebec. California hazelnut: southwestern BC south to California.",
  "whenToPick": "Beaked hazelnut ripens in August–September, California hazelnut September–November, American hazelnut in late summer to early fall. Pick as the husks turn tan — jays and rodents take most of the crop fast.",
  "partsUsed": "The nut, raw or roasted, once dried and shelled. Husks and shells are discarded.",
  "faqs": [
   {
    "q": "What kinds of wild hazelnut grow in Canada?",
    "a": "Beaked hazelnut, from BC to Newfoundland, and American hazelnut in Manitoba, Saskatchewan, Ontario and Quebec. On the BC coast, the local form is California hazelnut. All three bear edible nuts."
   },
   {
    "q": "How do you tell beaked hazelnut from American hazelnut?",
    "a": "By the husk. Beaked hazelnut's nut sits inside a stiff, bristly husk drawn out into a tube two to four times the nut's length — wear gloves, the bristles prickle. American hazelnut's nut is wrapped in two ragged, leafy bracts."
   },
   {
    "q": "When are wild hazelnuts ripe?",
    "a": "Late summer to early fall — August and September for beaked hazelnut. Pick as the husks turn from green to tan, even slightly early, because jays, squirrels and other rodents strip the bushes quickly."
   },
   {
    "q": "How do you prepare wild hazelnuts?",
    "a": "Let them dry in their husks for a couple of weeks, then husk, crack and eat them raw or roasted. Wild nuts are small, so gather a good bagful."
   }
  ],
  "sources": [
   {
    "label": "USDA Forest Service Fire Effects Information System — Corylus cornuta",
    "url": "https://www.fs.usda.gov/database/feis/plants/shrub/corcor/all.html"
   },
   {
    "label": "USDA Forest Service Fire Effects Information System — Corylus americana",
    "url": "https://www.fs.usda.gov/database/feis/plants/shrub/corame/all.html"
   }
  ]
 },
 "black-walnut": {
  "otherNames": "Eastern black walnut, noyer noir (Quebec)",
  "family": "Juglandaceae (walnut family)",
  "range": "Native from western Vermont and Massachusetts west through New York, southern Ontario and central Michigan to southern Minnesota, and south to the Gulf states, Oklahoma and Texas. Widely planted beyond that.",
  "whenToPick": "Nuts mature in September and October and drop shortly after the leaves fall. Gather them as soon as they are down, before the squirrels do.",
  "partsUsed": "The kernel, after husking, washing and curing. Husks, leaves and bark are not eaten.",
  "poisonous": "The tree produces juglone, which stunts or kills many plants growing beneath it, and NC State Extension lists black walnut as a problem for dogs and horses. The husk juice stains skin and clothing heavily — wear gloves.",
  "moreLookalikes": "Butternut (Juglans cinerea) has 11–17 leaflets including one at the tip, chocolate-brown chambered pith, a fuzzy 'moustache' above each leaf scar and oblong, sticky, ridged husks. It is listed as Endangered in Ontario and federally in Canada (Government of Ontario; Government of Canada, Species at Risk Act Schedule 1), so leave it alone. Hickories and pecan are also confused with black walnut, but their husks split open; a black walnut husk doesn't.",
  "faqs": [
   {
    "q": "How do you identify black walnut leaves?",
    "a": "Long compound leaves, 30–60 cm (12–24 in), with 15–23 narrow, pointed, finely toothed leaflets along the stalk. Crushed, the leaves and twigs have a strong smell. Butternut's leaves are shorter, with 11–17 leaflets and one leaflet always at the tip."
   },
   {
    "q": "How do you identify a black walnut tree?",
    "a": "Dark bark in a rough diamond pattern; long compound leaves of 15–23 leaflets; round green husks the size of a tennis ball that don't split open and stain your hands; and, in a split twig, pith divided into chambers by thin buff walls. The leaf scars look like a monkey's face."
   },
   {
    "q": "How do you tell black walnut from butternut?",
    "a": "Split a twig: butternut's pith is chocolate brown, black walnut's buff. Butternut has 11–17 leaflets with one at the tip, a fuzzy fringe above each leaf scar, and oblong, sticky, ridged husks. Butternut is listed as Endangered in Ontario and federally in Canada — leave it be."
   },
   {
    "q": "When do you harvest black walnuts?",
    "a": "In September and October, once the nuts fall, soon after the leaves drop. Collect them promptly — squirrels are quick — then husk them outdoors with gloves, wash them, and cure the nuts for a few weeks before cracking."
   },
   {
    "q": "Are black walnuts poisonous?",
    "a": "The nuts are edible. The tree makes juglone, which stunts many plants beneath it, and NC State Extension lists black walnut as a problem for dogs and horses. The husks stain skin and clothing heavily."
   }
  ],
  "sources": [
   {
    "label": "NC State Extension Plant Toolbox — Juglans nigra",
    "url": "https://plants.ces.ncsu.edu/plants/juglans-nigra/"
   },
   {
    "label": "USDA Forest Service, Silvics of North America — Black walnut",
    "url": "https://www.srs.fs.usda.gov/pubs/misc/ag_654/volume_2/juglans/nigra.htm"
   },
   {
    "label": "NC State Extension Plant Toolbox — Juglans cinerea (butternut)",
    "url": "https://plants.ces.ncsu.edu/plants/juglans-cinerea/"
   },
   {
    "label": "Government of Ontario — Butternut (species at risk)",
    "url": "https://ontario.ca/page/butternut-species-risk"
   },
   {
    "label": "Government of Canada — COSEWIC assessment and status report on the butternut, 2017 (Endangered; SARA Schedule 1)",
    "url": "https://www.canada.ca/en/environment-climate-change/services/species-risk-public-registry/cosewic-assessments-status-reports/butternut-2017.html"
   }
  ]
 },
 "pawpaw": {
  "otherNames": "Paw paw, common pawpaw.",
  "family": "Annonaceae, the custard-apple family — mostly tropical fruit trees.",
  "range": "The eastern United States, mostly in river valleys and creek bottoms, and just into Canada: a rare Carolinian tree in southern Ontario, where only scattered wild stands survive in the southern forests.",
  "whenToPick": "Late August into October, earlier in the south. A ripe pawpaw gives slightly when gently squeezed and has a strong, fruity smell. Skin colour is not a reliable sign — ripe fruit can still be green. The fruit on one tree ripens over one to two weeks, so check every day or two.",
  "partsUsed": "Only the ripe pulp. The skin and the large brown seeds are not eaten, and neither are the leaves or twigs. Tree-ripened fruit keeps three to five days at room temperature, one to three weeks in the fridge, and about a year as frozen pulp.",
  "poisonous": "The seeds, skin, leaves and stems contain acetogenins. Eating the skin or seeds causes stomach and intestinal pain, and handling the fruit gives some people a skin rash — gloves help if you pick a lot. Researchers have also found acetogenins in ripe pulp and have called for study of whether eating large amounts over time is harmful, so treat pawpaws as a seasonal treat, not a daily staple.",
  "faqs": [
   {
    "q": "When are pawpaws ripe?",
    "a": "Late August to October across most of the range. A ripe pawpaw gives slightly to a gentle squeeze and smells strongly fruity. Don’t go by colour — ripe ones can still be green. Many drop when ripe, so check under the trees every day or two."
   },
   {
    "q": "Can you eat pawpaw skin and seeds?",
    "a": "No. Eat only the pulp. The skin and seeds can cause stomach and intestinal pain, and the seeds should never be chewed or ground. Some people also get a rash from handling the fruit."
   },
   {
    "q": "Do pawpaws grow in Canada?",
    "a": "Yes, just. Pawpaw is a rare Carolinian tree in southern Ontario, where scattered wild stands remain in the southern forests. Most of its wild range is in the eastern United States."
   },
   {
    "q": "How long do pawpaws keep?",
    "a": "Not long. Tree-ripened pawpaws last three to five days at room temperature and one to three weeks in the fridge. For longer, scoop out the pulp and freeze it — it keeps about a year."
   }
  ],
  "sources": [
   {
    "label": "NC State Extension: Asimina triloba",
    "url": "https://plants.ces.ncsu.edu/plants/asimina-triloba/"
   },
   {
    "label": "University of Kentucky: Pawpaw (harvest and storage)",
    "url": "https://publications.ca.uky.edu/sites/publications.ca.uky.edu/files/pawpaw.pdf"
   },
   {
    "label": "University of Guelph Arboretum: Pawpaw",
    "url": "https://arboretum.uoguelph.ca/thingstosee/trees/pawpaw"
   },
   {
    "label": "PubMed: acetogenins in ripe pawpaw fruit (2009)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/19711911/"
   }
  ]
 },
 "persimmon": {
  "otherNames": "Common persimmon.",
  "family": "Ebenaceae, the ebony family.",
  "range": "The eastern and central United States, from Connecticut, New Jersey and Pennsylvania west to Illinois and Kansas, and south to Florida and Texas. It does not grow wild in Canada.",
  "whenToPick": "September to November, and some trees hold fruit well into winter. Ripe fruit is soft all the way through, often wrinkled, and frequently already on the ground. Frost is not needed — softness is the sign.",
  "partsUsed": "The soft ripe pulp, raw or cooked into pudding and quick breads. Each fruit holds one to eight flat seeds, which are spat out or sieved away.",
  "poisonous": "Unripe persimmons are very high in tannin. Eating a lot of unripe fruit can form a hard mass in the stomach (a phytobezoar) that may need surgery to remove. Ripe fruit eaten now and then carries little of that risk.",
  "faqs": [
   {
    "q": "Do persimmons need frost to ripen?",
    "a": "No. Despite the old saying, American persimmons ripen without frost — softness is the sign, not the weather. A ripe one is squishy, often wrinkled, and may already have dropped. If it’s firm, it will still be astringent."
   },
   {
    "q": "When are wild persimmons ripe?",
    "a": "From September to November, depending on the tree and the year, and some trees hold fruit well into winter. Collect soft fruit from the ground or pick the ones that are soft through on the branch."
   },
   {
    "q": "Why does an unripe persimmon make your mouth pucker?",
    "a": "Tannin. Unripe fruit is loaded with it, and it dries your mouth like felt. Wait until the fruit is soft all the way through. Don’t eat unripe persimmons in quantity — they can form a hard mass in the stomach."
   },
   {
    "q": "Do persimmons grow in Canada?",
    "a": "Not in the wild. The American persimmon’s native range runs from Connecticut and Pennsylvania west to Kansas, and south to Florida and Texas."
   }
  ],
  "sources": [
   {
    "label": "Purdue Extension (FNR): The fruit of the gods from an Indiana tree",
    "url": "https://purdue.edu/fnr/extension/the-fruit-of-the-gods-from-an-indiana-tree"
   },
   {
    "label": "USDA Forest Service FEIS: Diospyros virginiana",
    "url": "https://www.fs.usda.gov/database/feis/plants/tree/diovir/all.html"
   }
  ]
 },
 "elderberry": {
  "otherNames": "American elder, common elderberry; also classed as Sambucus nigra subsp. canadensis.",
  "family": "Viburnaceae (formerly Adoxaceae), the viburnum family.",
  "range": "American elder grows across most of eastern and central North America, including Manitoba, Quebec and the Maritimes, and most US states. In the far west its place is taken by blue elderberry, which has a whitish waxy bloom on its dark blue fruit.",
  "whenToPick": "Mid-August to September in most of the east. Pick whole clusters only when every berry is fully dark purple-black; unripe berries are not to be eaten. Elderberries spoil quickly — pick in the cool of the day and process the fruit the same day.",
  "partsUsed": "The ripe berries, always cooked, for syrup, jelly, pies and wine; and the flowers (see elderflower). Strip every berry from the stems. Leaves, stems, bark and roots are not used, and must never be crushed into juice.",
  "poisonous": "Leaves, stems, bark and roots — and to a lesser degree raw and unripe berries — contain cyanide-forming glycosides and an alkaloid that cause nausea, vomiting and diarrhea. In 1983, eleven people in Monterey County, California, fell ill after drinking juice made from elderberries crushed with their leaves and branches; eight were flown to hospital, and one was admitted. Cooking fully ripe, stem-free berries removes the risk.",
  "moreLookalikes": "Red elderberry (Sambucus racemosa) has red berries; it is more toxic than blue or black elderberries, and food-safety specialists advise not using it for jams or juice.",
  "faqs": [
   {
    "q": "Can you eat elderberries raw?",
    "a": "No — cook them. Raw elderberries, especially unripe ones, contain compounds that can cause nausea and vomiting. Cooking fully ripe berries removes the risk. Strip off every bit of green stem first, and never crush leaves or stems into juice."
   },
   {
    "q": "When are elderberries ripe?",
    "a": "Mid-August to September in most of the east. A cluster is ready when every berry is deep purple-black. Leave clusters that still have green or red berries — unripe fruit is not safe to eat."
   },
   {
    "q": "How do I identify an elderberry bush?",
    "a": "A many-stemmed shrub with opposite leaves divided into several toothed leaflets, flat-topped clusters of white flowers in early summer, then heavy, flat clusters of tiny purple-black berries on reddish stems. Pokeweed, the common double, is a non-woody plant with berries in a long hanging spike."
   },
   {
    "q": "Are red elderberries edible?",
    "a": "Treat them as not edible. Red elderberry is more toxic than the blue and black kinds, and food-safety specialists advise against using it for jams, jellies or juice."
   }
  ],
  "sources": [
   {
    "label": "CDC MMWR (1984): Poisoning from elderberry juice — California",
    "url": "https://www.cdc.gov/mmwr/preview/mmwrhtml/00000311.htm"
   },
   {
    "label": "Oregon State University Extension: Play it safe when preserving elderberries",
    "url": "https://extension.oregonstate.edu/catalog/pub/em-9446-play-it-safe-when-preserving-elderberries"
   },
   {
    "label": "NC State Extension: Sambucus canadensis",
    "url": "https://plants.ces.ncsu.edu/plants/sambucus-canadensis/common-name/elderberry/"
   }
  ]
 },
 "rose-hips": {
  "otherNames": "Hips; the fruit of wild roses such as prickly rose (Rosa acicularis), Woods’ rose (R. woodsii), Virginia rose (R. virginiana), smooth rose (R. blanda) and Nootka rose (R. nutkana), and of the beach rose (R. rugosa), an Asian import.",
  "family": "Rosaceae, the rose family.",
  "range": "Anywhere wild roses grow, which is nearly everywhere in Canada and the US. Prickly rose runs right across the boreal forest from Alaska and the Yukon to Quebec. Woods’ rose covers the west, from Ontario and Manitoba to Alaska and south to Texas. Virginia and smooth roses grow in the east, Nootka rose in the Pacific Northwest, and beach rose on Atlantic dunes.",
  "whenToPick": "Late summer into winter, once hips are fully red or orange-red. Many foragers wait for the first frost, which softens the hips and sweetens them. Woods’ rose and many others hold their hips on the bush all winter, so there is no rush.",
  "partsUsed": "The fleshy shell of the hip, raw, dried for tea, or cooked into jelly and syrup. The seeds and the fine hairs packed around them are scraped out — the hairs are an irritant, once sold as itching powder. The petals are also eaten or made into jelly.",
  "moreLookalikes": "Bittersweet nightshade (Solanum dulcamara): glossy, oval red berries in loose hanging clusters on a scrambling vine with purple, swept-back petals and a yellow centre — highly toxic, all parts. Yew (Taxus): a single red cup with a dark seed showing at the open end, on an evergreen with flat needles — the seed is highly toxic. Amur and other bush honeysuckles: small dark-red berries in pairs that cause severe diarrhea. American and Oriental bittersweet (Celastrus): orange husks that split to show red seeds, on a twining vine — poisonous. The rose hip’s tell: a prickly rose cane, usually a dried crown of sepals at the tip, and many hard, hairy seeds inside.",
  "faqs": [
   {
    "q": "When do you pick rose hips?",
    "a": "From late summer into winter, once they’re fully red or orange-red. Many foragers wait until after the first frost, which softens and sweetens them. The hips of many wild roses stay on the bush all winter, so you can pick well into the cold months."
   },
   {
    "q": "How do you identify rose hips?",
    "a": "A rose hip is a round or oval red-orange fruit, about 1–2.5 cm (½–1 in) across, on a prickly rose cane, usually topped with a dried crown of sepals. Cut one open: it’s packed with hard, pale seeds wrapped in fine, itchy hairs. No seeds and hairs, no rose hip."
   },
   {
    "q": "Are there rose hip look-alikes?",
    "a": "Yes. Bittersweet nightshade has shiny red berries on a vine and is highly toxic; yew has single red cups around a poisonous seed; bush honeysuckles have small paired red berries. None has a rose’s prickly cane, dried sepal crown or hairy, many-seeded inside."
   },
   {
    "q": "Where do rose hips grow?",
    "a": "Anywhere wild roses do — almost everywhere in Canada and the US: forest edges, clearings, riverbanks, prairie, roadsides, hedgerows and dunes. Prickly rose covers the boreal north, Woods’ rose the west, Virginia and smooth roses the east, and beach rose the Atlantic coast."
   },
   {
    "q": "Can you eat rose hips raw?",
    "a": "Yes, the flesh — once identified with certainty. Halve the hip and scrape out the seeds and hairs first; the hairs are an irritant. Most people dry the shells for tea or cook them into jelly and syrup."
   },
   {
    "q": "Are rose hips high in vitamin C?",
    "a": "Yes. Wild rose hips are rich in vitamin C — one analysis found about 426 mg per 100 g of hips. Levels vary a lot from bush to bush and product to product."
   }
  ],
  "sources": [
   {
    "label": "USDA NRCS Plant Guide: Woods’ rose",
    "url": "https://plants.usda.gov/DocumentLibrary/plantguide/pdf/pg_rowo.pdf"
   },
   {
    "label": "Wikipedia: Rose hip",
    "url": "https://en.wikipedia.org/wiki/Rose_hip"
   },
   {
    "label": "NC State Extension: Solanum dulcamara (bittersweet nightshade)",
    "url": "https://plants.ces.ncsu.edu/plants/solanum-dulcamara/common-name/wolfgrape/"
   },
   {
    "label": "NC State Extension: Taxus baccata (yew)",
    "url": "https://plants.ces.ncsu.edu/plants/taxus-baccata/"
   },
   {
    "label": "NC State Extension: Lonicera maackii (Amur honeysuckle)",
    "url": "https://plants.ces.ncsu.edu/plants/lonicera-maackii/"
   }
  ]
 },
 "staghorn-sumac": {
  "family": "Anacardiaceae, the cashew family — the same family as mango, cashew, poison ivy and poison sumac.",
  "range": "Eastern North America: Cape Breton, Nova Scotia, PEI, New Brunswick and southern Quebec, west through southern Ontario and northern Michigan to northern Minnesota, and south to Iowa, Illinois, Tennessee and northern Georgia.",
  "whenToPick": "Clusters are usually ripe by September — deep red and coated with sticky, sour hairs. Touch one and lick your finger: strongly tart means ready. Pick after a few dry days; rain rinses the tart coating away. The clusters stay on the plant through winter.",
  "partsUsed": "The fuzzy red fruit clusters, soaked in cold water for a pink, lemony drink or dried and rubbed through a sieve as a spice. Strain out the hairs and hard seeds. Leaves, bark and sap are not used.",
  "poisonous": "Staghorn sumac is not poisonous, but it belongs to the cashew family, so if you are allergic to cashews or mangoes, be cautious and check with your doctor before trying it.",
  "moreLookalikes": "Poison sumac (Toxicodendron vernix) grows in bogs, marshes, swamps and wet riverbank thickets. It has 7 to 13 smooth-edged, shiny leaflets on red stalks and loose, drooping clusters of smooth, dull yellowish-white berries. Its urushiol causes a poison-ivy rash, and smoke from burning it can inflame the lungs dangerously. Staghorn has toothed leaflets, velvety twigs and upright, fuzzy red cones on dry ground.",
  "faqs": [
   {
    "q": "Is staghorn sumac poisonous?",
    "a": "No — staghorn sumac, identified with certainty, is not poisonous; its fuzzy red clusters make a lemony drink. The one to avoid is poison sumac, which grows in wet ground and has drooping clusters of smooth whitish berries. Sumac is a cashew and mango relative, so if you are allergic to either, be cautious."
   },
   {
    "q": "How do I tell staghorn sumac from poison sumac?",
    "a": "Look at the fruit and the ground. Staghorn: upright cones of fuzzy red berries, toothed leaflets, velvety twigs, dry roadsides and old fields. Poison sumac: loose, drooping clusters of smooth whitish berries, smooth-edged leaflets on red stalks, in swamps and bogs."
   },
   {
    "q": "When is staghorn sumac ready to pick?",
    "a": "Usually by September. Pick clusters that are deep red and taste sharply sour when you touch one and lick your finger, ideally after a few dry days — rain rinses away the tart coating. The clusters stay on all winter."
   },
   {
    "q": "How do you make sumac lemonade?",
    "a": "Soak a few ripe clusters in cold water for about an hour, rubbing them to release the sour coating. Strain through a cloth to catch the hairs and seeds, then sweeten to taste — it needs only a little sugar."
   }
  ],
  "sources": [
   {
    "label": "USDA Forest Service FEIS: Rhus typhina",
    "url": "https://www.fs.usda.gov/database/feis/plants/tree/rhutyp/all.html"
   },
   {
    "label": "Minnesota Wildflowers: Staghorn sumac",
    "url": "https://www.minnesotawildflowers.info/shrub/staghorn-sumac"
   },
   {
    "label": "NC State Extension: Toxicodendron vernix (poison sumac)",
    "url": "https://plants.ces.ncsu.edu/plants/toxicodendron-vernix/"
   },
   {
    "label": "NC State Extension: Rhus typhina (staghorn sumac)",
    "url": "https://plants.ces.ncsu.edu/plants/rhus-typhina/"
   }
  ]
 },
 "wild-grape": {
  "otherNames": "Riverbank grape. Other wild grapes include fox grape (Vitis labrusca), frost grape (V. vulpina) and summer grape (V. aestivalis).",
  "family": "Vitaceae, the grape family (which also includes Virginia creeper and porcelain berry).",
  "range": "Riverbank grape is the most widespread wild grape of southern Canada and the northern US, along rivers, floodplains, fence rows and woodland edges. Fox, frost and summer grapes join it farther south and east; riverbank and fox grape both grow wild in Vermont and the rest of New England.",
  "whenToPick": "September and October. The grapes turn blue-black with a white bloom before they are sweet; wait until they are dark all through, slightly soft, and taste sweet-tart rather than green. Riverbank grapes are often sour until after a frost.",
  "partsUsed": "The fruit, crushed and strained for juice, jelly and wine; and the young leaves, blanched for stuffing. Each grape has one to four seeds, which are strained out.",
  "moreLookalikes": "Virginia creeper (Parthenocissus quinquefolia): blue-black berries hidden in the leaves in late summer, but its leaves have five separate toothed leaflets and its tendrils end in sticky discs. The berries contain oxalic acid and are poisonous. Porcelain berry (Ampelopsis): an invasive vine whose berries ripen to speckled white, lilac, green and turquoise and are held upright above the stem; its bark does not shred and its pith is white, where a grape’s is brown. Not a food plant.",
  "faqs": [
   {
    "q": "When do you pick wild grapes?",
    "a": "September and October. Wait until the grapes are blue-black all the way through, slightly soft, and taste sweet-tart rather than green. Riverbank grapes are often sour until after the first frost, which takes the edge off."
   },
   {
    "q": "How do you identify wild grapes?",
    "a": "A woody climbing vine with shreddy, peeling bark; forked tendrils opposite the leaves; big, heart-shaped, toothed leaves, usually three-lobed; and hanging clusters of small blue-black grapes with a white bloom. Each grape holds one to four egg-shaped seeds."
   },
   {
    "q": "What looks like wild grapes but is poisonous?",
    "a": "Canada moonseed is the dangerous one: no tendrils, untoothed leaves, and each fruit holds a single crescent-shaped seed. It can be fatal. Virginia creeper berries are also poisonous — its leaves have five separate leaflets. Porcelain berry has speckled pastel berries held upright."
   },
   {
    "q": "Are wild grapes edible?",
    "a": "Yes — true wild grapes (Vitis) are edible once identified with certainty, though most are small, seedy and sour. They’re best for juice, jelly and wine. Check the seeds of every batch for moonseed’s single crescent."
   },
   {
    "q": "What wild grapes grow in Vermont?",
    "a": "Riverbank grape and fox grape both grow wild in Vermont. Riverbank grape has nearly hairless, glossy leaves and small fruit; fox grape has bigger grapes, rusty-brown fuzz under the leaves, and tendrils at almost every node. Both are edible."
   },
   {
    "q": "Can you eat wild grape leaves?",
    "a": "Yes — the young, tender leaves of true wild grapes are blanched and used for stuffing, like vine leaves. Be sure of the vine: moonseed has untoothed leaves and no tendrils."
   }
  ],
  "sources": [
   {
    "label": "Minnesota Wildflowers: Riverbank grape",
    "url": "https://www.minnesotawildflowers.info/shrub/riverbank-grape"
   },
   {
    "label": "NC State Extension: Menispermum canadense (moonseed)",
    "url": "https://plants.ces.ncsu.edu/plants/menispermum-canadense/"
   },
   {
    "label": "NC State Extension: Parthenocissus quinquefolia (Virginia creeper)",
    "url": "https://plants.ces.ncsu.edu/plants/parthenocissus-quinquefolia/"
   },
   {
    "label": "University of Maryland Extension: Porcelain-berry",
    "url": "https://extension.umd.edu/resource/invasives-your-woodland-porcelain-berry"
   },
   {
    "label": "Go Botany (Native Plant Trust): Vitis labrusca (fox grape)",
    "url": "https://gobotany.nativeplanttrust.org/species/vitis/labrusca/"
   },
   {
    "label": "Go Botany (Native Plant Trust): Vitis riparia (riverbank grape)",
    "url": "https://gobotany.nativeplanttrust.org/species/vitis/riparia/"
   }
  ]
 },
 "highbush-cranberry": {
  "otherNames": "American highbush cranberry, American cranberrybush; also classed as Viburnum opulus var. americanum. Not a true cranberry. In Alaska and the boreal north, ‘highbush cranberry’ also means the smaller Viburnum edule.",
  "family": "Viburnaceae (formerly Adoxaceae), the viburnum family (with the elders).",
  "range": "Moist thickets, forest edges, swamps, fens and streambanks across much of Canada and the northern US. In the boreal north and Alaska, the smaller Viburnum edule is picked the same way.",
  "whenToPick": "Late summer through autumn. Berries turn translucent scarlet in late summer but are sharp and musty; they soften after the first frost and sweeten a little. Picked just before frost they are more acidic.",
  "partsUsed": "The ripe berries, cooked and strained for jelly, sauce and syrup. Each berry has one large flat seed, which is why they are strained rather than baked into pies.",
  "moreLookalikes": "European guelder rose (Viburnum opulus var. opulus), planted in gardens, looks almost identical but its berries are more bitter. The tell is the glands at the top of the leaf stalk: guelder rose has short, cup-shaped glands with a distinct rim; American highbush cranberry has flat or domed glands, taller than wide, with no rim. Hybrids blur it. Red baneberry (Actaea rubra), a knee-high herb of moist woods, has glossy red berries with a dark spot at the tip; it is highly poisonous.",
  "faqs": [
   {
    "q": "Is highbush cranberry a real cranberry?",
    "a": "No. It’s a viburnum, a shrub related to the elders, not a bog cranberry. The name comes from its tart, red, cranberry-like fruit, which makes excellent jelly."
   },
   {
    "q": "When do you pick highbush cranberries?",
    "a": "From late summer through autumn. Picked before frost they’re sharper; after the first frost they soften and sweeten a little. Either way they’re best cooked into jelly or sauce and strained."
   },
   {
    "q": "Why do highbush cranberries smell bad?",
    "a": "They have a naturally musty smell and flavour. It’s normal and doesn’t mean they’ve spoiled. Frost softens the flavour a little, and cooking with sugar makes a well-loved jelly."
   },
   {
    "q": "How do I tell American highbush cranberry from European guelder rose?",
    "a": "Check the glands at the top of the leaf stalk with a hand lens. American: flat or domed glands, taller than wide, no rim. Guelder rose: shorter, cup-shaped glands with a distinct rim, and more bitter berries. Hybrids blur the line."
   }
  ],
  "sources": [
   {
    "label": "Minnesota Wildflowers: American highbush cranberry",
    "url": "https://www.minnesotawildflowers.info/shrub/american-highbush-cranberry"
   },
   {
    "label": "University of Alaska Fairbanks Extension: Highbush cranberries",
    "url": "https://uaf.edu/ces/publications/database/food/files/pdfs/FNH-00112_Highbush_Cranberries.pdf"
   },
   {
    "label": "NC State Extension: Viburnum opulus",
    "url": "https://plants.ces.ncsu.edu/plants/viburnum-opulus/"
   },
   {
    "label": "NC State Extension: Actaea rubra (red baneberry)",
    "url": "https://plants.ces.ncsu.edu/plants/actaea-rubra/"
   }
  ]
 },
 "cranberry": {
  "otherNames": "Large cranberry, American cranberry. Small cranberry (Vaccinium oxycoccos) is picked the same way.",
  "family": "Ericaceae, the heath family (with blueberries and lingonberries).",
  "range": "Large cranberry grows wild from Newfoundland west to Ontario, and in the northeastern US, Great Lakes and Appalachians as far south as North Carolina and Tennessee. Small cranberry covers far more ground: Alaska and across Canada to Labrador and Newfoundland, south into New England, the northern Great Lakes states, and western Washington and Oregon.",
  "whenToPick": "September into October; small cranberry can ripen from August. Pick berries that are shiny and dark red all over. Many hang on the vines through winter.",
  "partsUsed": "The berries, for sauce, juice, drying and freezing. Very sour raw.",
  "moreLookalikes": "Winterberry holly (Ilex verticillata) grows in wet, acidic ground and carries bright red berries on an upright shrub; the berries and leaves can cause vomiting and diarrhea. A cranberry is never a shrub you look up at — it trails through the moss on thin, wiry stems with leathery leaves under 2 cm (¾ in) long.",
  "faqs": [
   {
    "q": "Where do wild cranberries grow?",
    "a": "In sphagnum bogs, fens and floating moss mats, in full sun. Large cranberry runs from Newfoundland to Ontario and through the northeastern US; small cranberry grows in bogs across Canada and Alaska and south into the northern states."
   },
   {
    "q": "When are wild cranberries ripe?",
    "a": "From September into October, and small cranberry from August. Pick berries that are shiny and dark red all over. Many hang on through the winter, so late pickers still find some."
   },
   {
    "q": "How do I tell large cranberry from small cranberry?",
    "a": "Large cranberry has bigger leaves, 8–17 mm (⅓–⅔ in) long, flatter with rounded tips, and berries up to about 1.7 cm (⅔ in). Small cranberry is smaller in every part, with narrower, less flat leaves. Both are edible and picked the same way."
   }
  ],
  "sources": [
   {
    "label": "Minnesota Wildflowers: Large cranberry",
    "url": "https://www.minnesotawildflowers.info/shrub/large-cranberry"
   },
   {
    "label": "USDA Forest Service FEIS: Vaccinium oxycoccos",
    "url": "https://www.fs.usda.gov/database/feis/plants/shrub/vacoxy/all.html"
   },
   {
    "label": "Wikipedia: Vaccinium macrocarpon",
    "url": "https://en.wikipedia.org/wiki/Vaccinium_macrocarpon"
   },
   {
    "label": "NC State Extension: Ilex verticillata (winterberry)",
    "url": "https://plants.ces.ncsu.edu/plants/ilex-verticillata/"
   }
  ]
 },
 "chokecherry": {
  "otherNames": "Choke cherry.",
  "family": "Rosaceae, the rose family (with plums and cherries).",
  "range": "Coast to coast: Newfoundland to British Columbia, and south to North Carolina, Tennessee, Missouri, Kansas, Oklahoma, Texas, New Mexico, California and northern Mexico.",
  "whenToPick": "Mid-August to September across most of Canada. The cherries turn red first and are not ripe until they are dark red-purple to nearly black and slightly soft. Even fully ripe they are astringent, but noticeably sweeter.",
  "partsUsed": "The fruit flesh, cooked and strained for syrup, jelly and wine, or dried. The pits are strained out whole. Leaves, twigs, bark and pits are not food.",
  "poisonous": "Leaves, stems, bark and the seed inside the pit contain cyanogenic glycosides (mainly prunasin) that release hydrogen cyanide when crushed, frost-damaged or digested. New shoots and young leaves carry the most, and wilted or frosted leaves are a known danger to livestock. Cooking or drying destroys most of these compounds, but never crush or grind the pits when making juice.",
  "moreLookalikes": "Common buckthorn (Rhamnus cathartica) is the one that fools people: glossy black berries about 6 mm (¼ in) across with usually 4 seeds each, in small clumps along the twigs rather than long hanging strings, on a shrub with nearly opposite leaves, curving veins and often a thorn at the twig tip. The berries cause nausea, vomiting and diarrhea. Black cherry (Prunus serotina) is edible: a much bigger tree with narrower leaves, rusty hairs along the underside of the midrib, and dark scaly plates on older bark.",
  "faqs": [
   {
    "q": "How do you identify a chokecherry tree?",
    "a": "A shrub or small tree, 3–8 m (10–25 ft), with smooth grey-brown bark marked by pale horizontal lines, oval leaves with fine sharp teeth ending in an abrupt point, and hanging strings of 20 or more dark red to black cherries, each with one stone."
   },
   {
    "q": "When are chokecherries ripe?",
    "a": "Mid-August to September in most places. They go from red to dark red-purple or nearly black and turn slightly soft. Ripe ones are sweeter but still puckery; bright red ones need more time."
   },
   {
    "q": "Are chokecherries poisonous?",
    "a": "The fruit flesh is edible once identified with certainty, but the pits, leaves, bark and twigs contain compounds that release cyanide. Strain out the pits whole — never crush or grind them — and cook the juice. Cooking and drying destroy most of what remains."
   },
   {
    "q": "How do I tell chokecherry from buckthorn?",
    "a": "Chokecherry berries hang in long strings, each with one stone, and its leaves are alternate. Buckthorn’s black berries sit in small clumps along the twig, usually hold 4 seeds, and its leaves are nearly opposite with curved veins and a thorn at the twig tip. Buckthorn berries are a harsh laxative."
   },
   {
    "q": "What’s the difference between chokecherry and black cherry?",
    "a": "Both are edible, cooked and pitted. Black cherry grows into a tree over 15 m (50 ft), with narrower leaves, rusty hairs along the midrib underneath, and dark scaly bark. Chokecherry stays a shrub or small tree with broader leaves and smooth bark."
   }
  ],
  "sources": [
   {
    "label": "USDA Forest Service FEIS: Prunus virginiana",
    "url": "https://www.fs.usda.gov/database/feis/plants/tree/pruvir/all.html"
   },
   {
    "label": "SARE: Chokecherry fact sheet",
    "url": "https://projects.sare.org/media/pdf/C/h/o/Chokecherry-fact-sheet.pdf"
   },
   {
    "label": "Minnesota Wildflowers: Chokecherry",
    "url": "https://www.minnesotawildflowers.info/shrub/chokecherry"
   },
   {
    "label": "NC State Extension: Rhamnus cathartica (common buckthorn)",
    "url": "https://plants.ces.ncsu.edu/plants/rhamnus-cathartica/"
   },
   {
    "label": "Minnesota Wildflowers: Common buckthorn",
    "url": "https://www.minnesotawildflowers.info/shrub/common-buckthorn"
   }
  ]
 },
 "wild-apple": {
  "otherNames": "Feral apple, common apple; ‘crabapple’ for small, sour kinds.",
  "family": "Rosaceae, the rose family.",
  "range": "Not native: the cultivated apple was brought to North America by settlers and has gone wild along farm edges, fields, forest edges and roadsides across southern Canada and much of the US. A few native crabapples, such as sweet crabapple (Malus coronaria), also grow wild.",
  "whenToPick": "Late August to October, depending on the tree. An apple is ripening when its background colour turns from green to greenish-yellow; it is ripe when it tastes sweet rather than starchy and comes away with a gentle lift and twist.",
  "partsUsed": "The fruit, raw or cooked. Cores and seeds are discarded.",
  "poisonous": "Apple seeds contain amygdalin, which releases cyanide when the seeds are crushed or chewed. Core the fruit, don’t chew the seeds, and strain seeds out of pressings.",
  "moreLookalikes": "In south Florida and the Keys, manchineel (Hippomane mancinella) grows on seacoasts and among mangroves and bears bright green ‘little apples’ 2.5–5 cm (1–2 in) across. Every part is poisonous, and eating it can be lethal. Apples do not grow wild on tropical beaches.",
  "faqs": [
   {
    "q": "Are wild apples safe to eat?",
    "a": "Yes, once you’re sure it’s an apple tree — feral apples are ordinary apples gone wild, and each tree’s fruit tastes different. Taste one before picking a bagful, and skip trees beside busy roads or in sprayed orchards."
   },
   {
    "q": "When are wild apples ripe?",
    "a": "Late August to October. Look for the green background colour turning greenish-yellow, taste for sweetness rather than a starchy film on your teeth, and lift and twist — a ripe apple comes away easily."
   },
   {
    "q": "Are apple seeds poisonous?",
    "a": "They contain amygdalin, which can release cyanide when the seeds are crushed or chewed. Don’t eat or grind the seeds; core the fruit and strain seeds out of juice."
   },
   {
    "q": "What’s the difference between a crabapple and a wild apple?",
    "a": "Mostly fruit size. Cultivated apples gone wild usually bear fruit 6–12 cm (2½–5 in) across; crabapples are much smaller — some barely 1 cm. Both are apples (Malus), and both are used cooked."
   }
  ],
  "sources": [
   {
    "label": "Go Botany (Native Plant Trust): Malus pumila",
    "url": "https://gobotany.nativeplanttrust.org/species/malus/pumila/"
   },
   {
    "label": "University of Minnesota Extension: Growing apples",
    "url": "https://extension.umn.edu/fruit/growing-apples"
   },
   {
    "label": "Molecules (2021), PMC: Amygdalin toxicity and content in plant seeds",
    "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC8069783/"
   },
   {
    "label": "UF/IFAS: Hippomane mancinella (manchineel)",
    "url": "https://ask.ifas.ufl.edu/publication/FR370"
   }
  ]
 },
 "acorn": {
  "otherNames": "Oak nuts.",
  "family": "Fagaceae, the beech family.",
  "range": "Oaks grow across southern Canada and nearly all of the US — woodlots, savannas, parks and city streets. They fall into two groups: white oaks, with rounded leaf lobes, and red oaks, with bristle-tipped lobes.",
  "whenToPick": "September to November, as the acorns drop. Gather them as soon as they fall. White-oak acorns mature in a single year and sprout in the fall soon after dropping, so process them quickly; red-oak acorns take two years on the tree and sprout the following spring.",
  "partsUsed": "The nut meat, after leaching. Shell, chop or grind, then soak in cold water, changing it daily until the water stays clear and the meal is no longer bitter — five days to two weeks. Dry the meal for flour.",
  "poisonous": "Raw acorns are full of tannins, which are bitter, astringent and hard on the stomach. They must be leached before eating.",
  "moreLookalikes": "Horse chestnut and buckeye (Aesculus) nuts are large, glossy brown seeds with a pale scar, released from a leathery, often prickly capsule; they have no scaly cap. They are highly toxic. An acorn always sits in, or has come out of, a scaly cup.",
  "faqs": [
   {
    "q": "Can you eat acorns?",
    "a": "Yes, once leached. All acorns are edible, but they’re full of bitter tannins that must be soaked out first. Chop or grind the nuts and soak them in cold water, changing it daily until the water runs clear and the taste is mild."
   },
   {
    "q": "Which acorns are best to eat?",
    "a": "White-oak acorns — from oaks with rounded leaf lobes — have fewer tannins, and some are almost sweet. Red-oak acorns, from oaks with bristle-tipped lobes, are more bitter and need longer leaching."
   },
   {
    "q": "How long does it take to leach acorns?",
    "a": "With cold water, five days to two weeks, changing the water daily. It’s done when the water stays clear and a nibble isn’t bitter. Chopping or grinding first speeds it up."
   },
   {
    "q": "When do acorns fall?",
    "a": "September to November. White-oak acorns ripen in one year and sprout soon after they drop; red-oak acorns take two years and sprout the next spring. Collect them fresh and discard any with holes or that float."
   }
  ],
  "sources": [
   {
    "label": "Missouri Department of Conservation: Oaks",
    "url": "https://mdc.mo.gov/discover-nature/field-guide/oaks"
   },
   {
    "label": "McClung Museum (University of Tennessee): Plant of the month — acorn",
    "url": "https://mcclungmuseum.utk.edu/2022/11/29/plantofthemonth-acorn/"
   },
   {
    "label": "Grow Native! (Missouri Prairie Foundation): Acorns",
    "url": "https://grownative.org/?p=4249"
   },
   {
    "label": "NC State Extension: Aesculus hippocastanum (horse chestnut)",
    "url": "https://plants.ces.ncsu.edu/plants/aesculus-hippocastanum/"
   }
  ]
 },
 "pecan": {
  "otherNames": "Native pecan, wild pecan.",
  "family": "Juglandaceae, the walnut family (with hickories).",
  "range": "Native mainly to the bottomlands of the Mississippi River valley — from southern Indiana, Illinois, southeastern Iowa and eastern Kansas south to central Texas and east to western Mississippi and Tennessee — and to Mexico. Widely planted beyond that. It does not grow wild in Canada.",
  "whenToPick": "Nuts mature in September and October and fall from September into December. Ripe husks turn from green to brown, dry out and split into four sections.",
  "partsUsed": "The kernel. Husks and shells are discarded.",
  "moreLookalikes": "Buckeye and horse chestnut (Aesculus) nuts are glossy brown seeds with a pale scar, in a leathery, often prickly capsule — not in a four-part husk. They are highly toxic.",
  "faqs": [
   {
    "q": "When are wild pecans ready?",
    "a": "When the husks turn brown, dry and split into four sections. Nuts mature in September and October, and they keep dropping from September into December."
   },
   {
    "q": "How do I identify a pecan tree?",
    "a": "A tall tree of river bottoms with long compound leaves of 9 to 17 narrow, pointed, toothed leaflets, and oval nuts 2.5–7.5 cm (1–3 in) long in green husks that dry brown and split into four."
   },
   {
    "q": "How do I tell pecan from bitternut hickory?",
    "a": "Bitternut hickory’s thin husk is four-winged above the middle, and its kernel is intensely bitter and astringent — too bitter to eat. Pecan husks split fully into four and the nut inside is sweet."
   },
   {
    "q": "Do pecans grow wild in Canada?",
    "a": "No. Pecan’s native range is the Mississippi valley, from southern Indiana, Illinois and Iowa south to Texas, plus Mexico. It’s planted farther afield, but wild pecans aren’t a Canadian forage."
   }
  ],
  "sources": [
   {
    "label": "USDA Forest Service FEIS: Carya illinoinensis",
    "url": "https://www.fs.usda.gov/database/feis/plants/tree/carill/all.html"
   },
   {
    "label": "NC State Extension: Carya illinoinensis",
    "url": "https://plants.ces.ncsu.edu/plants/carya-illinoinensis/"
   },
   {
    "label": "USDA Forest Service, Silvics of North America: Bitternut hickory",
    "url": "https://www.srs.fs.usda.gov/pubs/misc/ag_654/volume_2/carya/cordiformis.htm"
   }
  ]
 },
 "hickory-nut": {
  "otherNames": "Shagbark hickory.",
  "family": "Juglandaceae, the walnut family (with pecan and black walnut).",
  "range": "Southern Quebec and southern Ontario, and in the US from southern Maine west to southeastern Minnesota and Nebraska, and south to Georgia, Alabama, Mississippi, Louisiana and eastern Texas.",
  "whenToPick": "Nuts ripen in September and October and fall from September through December. Husks turn from green to brown-black, dry out and split cleanly to the base into four. Good crops come every one to three years, with light crops in between.",
  "partsUsed": "The sweet kernel. The husk and the hard shell are discarded.",
  "moreLookalikes": "Bitternut hickory (Carya cordiformis): a thin, yellowish-green husk that is four-winged above the middle, and an intensely bitter, astringent kernel — too bitter to eat. Buckeye and horse chestnut (Aesculus): glossy brown nuts with a pale scar in a leathery or prickly capsule — highly toxic.",
  "faqs": [
   {
    "q": "What does a hickory nut look like?",
    "a": "In the husk: a round green ball with four seams, darkening to brown-black as it ripens. Out of it: a pale, hard, slightly flattened nut, four-angled toward the tip and rounded at the base. Inside is a sweet kernel, like a small pecan."
   },
   {
    "q": "How do I identify a shagbark hickory?",
    "a": "By its bark: grey strips that peel away from the trunk in long, loose plates curling out at the ends — the most distinctive of all the hickories. Add long compound leaves and nuts in thick husks that split into four."
   },
   {
    "q": "When do hickory nuts fall?",
    "a": "They ripen in September and October and drop from September into December. Ripe husks turn brown to black and split all the way to the base. Good crops come every one to three years."
   },
   {
    "q": "Are all hickory nuts good to eat?",
    "a": "No. Shagbark is the prized one. Bitternut hickory’s kernel is so bitter and astringent it’s inedible. And make sure you haven’t picked up buckeyes or horse chestnuts — glossy nuts with a pale scar — which are toxic."
   }
  ],
  "sources": [
   {
    "label": "USDA Forest Service, Silvics of North America: Shagbark hickory",
    "url": "https://www.srs.fs.usda.gov/pubs/misc/ag_654/volume_2/carya/ovata.htm"
   },
   {
    "label": "USDA Forest Service, Silvics of North America: Bitternut hickory",
    "url": "https://www.srs.fs.usda.gov/pubs/misc/ag_654/volume_2/carya/cordiformis.htm"
   },
   {
    "label": "NC State Extension: Aesculus hippocastanum (horse chestnut)",
    "url": "https://plants.ces.ncsu.edu/plants/aesculus-hippocastanum/"
   }
  ]
 },
 "hawthorn": {
  "otherNames": "Haws (the fruit).",
  "family": "Rosaceae, the rose family.",
  "range": "Hawthorns grow across southern Canada and nearly all of the US. There are many native species, which hybridize freely, and the European common hawthorn (Crataegus monogyna) has spread from hedges into the wild and is invasive in places.",
  "whenToPick": "September and October. Haws are ripe when fully coloured — usually red — and slightly soft. Just-ripe haws have the most pectin for jelly; overripe ones have the least. Some species hold their fruit into late winter.",
  "partsUsed": "The flesh of ripe haws, cooked into jelly, sauce, ketchup or fruit leather after pressing the pulp through a sieve to leave the stones behind. Flowers and very young spring leaves are also nibbled. The seeds are not eaten.",
  "poisonous": "The hard seeds are not eaten. Treat them like apple and cherry seeds: strain them out whole, don’t crush them into jelly or leather, and take extra care with children. Hawthorn also acts on the heart: it may interfere with digoxin and add to the effect of blood thinners, and people on heart-failure medicines should not use it medicinally without their doctor.",
  "moreLookalikes": "Bittersweet nightshade and bush honeysuckles carry red berries along the same hedgerows. Neither grows on a thorny tree, and neither has the hard stones of a haw; both are poisonous.",
  "faqs": [
   {
    "q": "Is hawthorn poisonous to humans?",
    "a": "The fruit flesh isn’t — haws are eaten in jelly and sauces once identified with certainty. The seeds are not eaten: strain them out whole, as you would apple or cherry seeds. Hawthorn also affects the heart, so anyone on heart medication should ask a doctor first."
   },
   {
    "q": "What are haws?",
    "a": "Haws are hawthorn fruit: small red apple-like fruits, 6–13 mm (¼–½ in) across, each holding one to five hard stones, in clusters on a thorny small tree. They taste mild and mealy, like a dry apple."
   },
   {
    "q": "Can you eat hawthorn berries raw?",
    "a": "A few, once you’re sure of the tree — spit out the stones and don’t chew them. Most people cook haws into jelly or leather, pressing the pulp through a sieve so the seeds stay behind."
   },
   {
    "q": "When are hawthorn berries ripe?",
    "a": "September and October in most areas. Pick them fully coloured and slightly soft. Just-ripe haws have the most pectin, which is what sets hawthorn jelly; some species hold their fruit into late winter."
   },
   {
    "q": "Does hawthorn interact with medications?",
    "a": "It can. Hawthorn may interfere with digoxin and add to the effect of blood thinners, and medical sources say people on heart-failure medicines shouldn’t use it without their doctor’s supervision. That applies to medicinal doses, but it’s worth knowing."
   },
   {
    "q": "How do I identify a hawthorn tree?",
    "a": "A small, often shrubby tree with long, straight thorns, lobed or toothed leaves, flat clusters of white flowers in late spring, and clusters of red haws in autumn. Cut a haw open: one to five hard stones means hawthorn."
   }
  ],
  "sources": [
   {
    "label": "NCCIH (NIH): Hawthorn",
    "url": "https://www.nccih.nih.gov/health/hawthorn"
   },
   {
    "label": "Memorial Sloan Kettering: Hawthorn",
    "url": "https://www.mskcc.org/cancer-care/integrative-medicine/herbs/hawthorn"
   },
   {
    "label": "Drugs.com: Hawthorn",
    "url": "https://www.drugs.com/npp/hawthorn.html"
   },
   {
    "label": "Eat The Weeds: The Crataegus clan — food and poison",
    "url": "https://www.eattheweeds.com/the-crataegus-clan-food-poison-2/"
   }
  ]
 },
 "wintergreen": {
  "otherNames": "Teaberry, checkerberry, eastern teaberry.",
  "family": "Ericaceae, the heath family.",
  "range": "Eastern Canada and the north-central and eastern US, in acidic woods under pine and oak.",
  "whenToPick": "Berries ripen from September and often last through the winter, so they can be found under snow. Leaves can be picked any time of year.",
  "partsUsed": "The red berries, raw or in desserts, and the leaves for tea. The wintergreen flavour is methyl salicylate, the compound in oil of wintergreen.",
  "poisonous": "Methyl salicylate is a close relative of aspirin. In the plant it is dilute, but distilled oil of wintergreen is about 98% methyl salicylate, and as little as 4 mL has killed a child. Never make or swallow the oil. People allergic to aspirin, on blood thinners such as warfarin, or with bleeding disorders should avoid wintergreen products.",
  "faqs": [
   {
    "q": "Are wintergreen berries edible?",
    "a": "Yes, once you’re sure of the plant: crush a leaf and it should smell unmistakably of wintergreen. The berries are eaten raw or baked into pies, and taste mildly minty."
   },
   {
    "q": "Is wintergreen poisonous?",
    "a": "The berries and leaf tea are traditional foods, but the flavour is methyl salicylate, an aspirin relative. Concentrated oil of wintergreen is deadly in small amounts — about a teaspoon has killed young children. Avoid wintergreen if you’re allergic to aspirin or take blood thinners."
   },
   {
    "q": "When can you pick wintergreen berries?",
    "a": "From September on. The berries often hang on through the winter, so they’re one of the few wild fruits you can find in the snow. The leaves can be picked any time of year."
   }
  ],
  "sources": [
   {
    "label": "NC State Extension: Gaultheria procumbens",
    "url": "https://plants.ces.ncsu.edu/plants/gaultheria-procumbens/"
   },
   {
    "label": "Drugs.com: Wintergreen",
    "url": "https://www.drugs.com/npp/wintergreen.html"
   },
   {
    "label": "Journal of Emergency Medicine (2007): Methyl salicylate exposure in toddlers",
    "url": "https://www.qxmd.com/r/17239735"
   }
  ]
 },
 "salal": {
  "family": "Ericaceae, the heath family (with wintergreen and huckleberries).",
  "range": "The Pacific coast from southeast Alaska and central British Columbia south to southern California, mostly west of the Cascades and Coast Ranges, in coastal conifer forest and salt-sprayed coastal scrub.",
  "whenToPick": "August to October, from late July in the warmest spots, depending on latitude and elevation; berries can stay on the shrub until December. Pick them dark purple to blue-black and soft.",
  "partsUsed": "The berries — botanically fleshy sepals — eaten fresh, dried or mashed into cakes, or made into jam and jelly, often mixed with other berries. The leaves were used to line cooking pits but are not eaten.",
  "faqs": [
   {
    "q": "Are salal berries edible?",
    "a": "Yes, once identified with certainty. Salal berries are sweet with a slightly mealy texture. Indigenous peoples of the coast ate them fresh and dried them into cakes; today they go into jam and jelly, often mixed with other berries."
   },
   {
    "q": "When are salal berries ripe?",
    "a": "From late July to October, depending on how far north and how high up you are, and they can stay on the shrub until December. Pick them when dark purple to blue-black and soft."
   },
   {
    "q": "How do I identify salal?",
    "a": "An evergreen shrub from knee- to head-high with thick, glossy, egg-shaped leaves 5–10 cm (2–4 in) long, white-to-pink urn-shaped flowers in spring, and rows of hairy dark berries along a reddish stalk in late summer."
   }
  ],
  "sources": [
   {
    "label": "USDA Forest Service FEIS: Gaultheria shallon",
    "url": "https://www.fs.usda.gov/database/feis/plants/shrub/gausha/all.html"
   },
   {
    "label": "Native Plants PNW: Salal",
    "url": "https://nativeplantspnw.com/salal-gaultheria-shallon"
   }
  ]
 },
 "sea-grape": {
  "otherNames": "Seagrape.",
  "family": "Polygonaceae, the buckwheat family.",
  "range": "Coastal central and south Florida (USDA zones 10–11), on beaches, dunes and coastal hammocks. It does not grow in Canada.",
  "whenToPick": "Late summer and fall. Grapes in a cluster ripen unevenly, deepening from green to red to purple. Only female plants bear fruit.",
  "partsUsed": "The ripe purple fruit, raw or made into jelly; the taste is often compared to muscadine grapes. Each grape holds a large seed.",
  "moreLookalikes": "Manchineel (Hippomane mancinella) shares south Florida’s seacoasts and the Keys, often among mangroves. Its leaves are oval, 5–10 cm (2–4 in) long and very finely toothed, with a small gland where the leaf meets the stalk — not sea grape’s big round leaves. Its fruit is a single bright-green ‘little apple’ 2.5–5 cm (1–2 in) across, not a grape cluster. The milky sap blisters skin, smoke from burning it can injure the eyes, and eating any part can be lethal.",
  "faqs": [
   {
    "q": "Are sea grapes edible?",
    "a": "Yes, once identified with certainty: the ripe purple fruit is eaten raw or made into jelly, with a taste often compared to muscadine grapes. Sea grape is a coastal shrub or tree with big, round, red-veined leaves — not a vine."
   },
   {
    "q": "When are sea grapes ripe?",
    "a": "In late summer and fall in south Florida. Grapes in a cluster ripen unevenly, from green to red to deep purple. Pick the soft purple ones and leave the rest to finish."
   },
   {
    "q": "Can you pick sea grapes on Florida beaches?",
    "a": "Generally, no. Florida law protects dune vegetation, and UF/IFAS says sea grape growing along the shoreline is off-limits — it can’t be damaged, or its fruit taken, without a permit. Look instead for sea grape planted in landscapes away from the waterfront, with the owner’s permission."
   },
   {
    "q": "What poisonous tree looks like a sea grape?",
    "a": "Manchineel. It grows on the same south Florida coasts and Keys, but its leaves are small, oval and finely toothed — not round — and its fruit is a single small green apple, not a cluster. Every part is poisonous; don’t touch it."
   }
  ],
  "sources": [
   {
    "label": "UF/IFAS Gardening Solutions: Seagrape",
    "url": "https://gardeningsolutions.ifas.ufl.edu/plants/trees-and-shrubs/trees/seagrape/"
   },
   {
    "label": "UF/IFAS: Hippomane mancinella (manchineel)",
    "url": "https://ask.ifas.ufl.edu/publication/FR370"
   }
  ]
 },
 "beach-plum": {
  "family": "Rosaceae, the rose family (with cherries and other plums).",
  "range": "The Atlantic coast from the Canadian Maritimes south to northern Virginia, mostly on older dune systems where salt spray is lighter. In Maine it is extremely rare and listed as endangered; it is fairly widespread in Massachusetts and Connecticut.",
  "whenToPick": "August through September. Plums turn from green to dusty blue-purple — occasionally brick red or yellow — and soften. Flavour varies a lot from bush to bush, from sweet to tart or bitter, so taste as you go.",
  "partsUsed": "The fruit, for jelly, jam, syrup, juice and wine. Pits are strained out; leaves are not used.",
  "poisonous": "The pits contain hydrocyanic acid (cyanide), and like other wild plums and cherries the leaves carry cyanide-forming compounds too. Don’t crack or grind the pits, and don’t eat the kernels.",
  "moreLookalikes": "American plum (Prunus americana), inland, has larger petals and red to yellow fruit; Allegheny plum has smaller fruit, 10–12 mm across. They are close relatives. Before eating any dark fruit from a dune shrub, confirm it is a plum: a single pit, oval toothed leaves, no thorny rose canes or vine.",
  "faqs": [
   {
    "q": "How do you identify beach plum?",
    "a": "A low, sprawling shrub of coastal dunes with oval, toothed leaves that are hairy underneath, white spring flowers, and round, dusty blue-purple plums 1.5–2.5 cm (½–1 in) across, each with one pit. Colour occasionally runs to red or yellow."
   },
   {
    "q": "When are beach plums ripe?",
    "a": "August through September. They’re ready when they’ve turned from green to dusty purple and give a little. Flavour varies a lot from bush to bush — some sweet, some sour or bitter — so taste before you pick a bucketful."
   },
   {
    "q": "Are beach plums poisonous?",
    "a": "The fruit is edible once identified with certainty, but the pits and leaves contain cyanide compounds. Cook the fruit whole and strain it, or pit it first — just don’t crack or grind the pits."
   },
   {
    "q": "Where do beach plums grow?",
    "a": "On sandy coasts from the Canadian Maritimes to northern Virginia, mostly on older, sheltered dunes away from the heaviest salt spray. Dunes are fragile and often protected, so pick from paths rather than trampling them."
   }
  ],
  "sources": [
   {
    "label": "USDA NRCS Plant Guide: Beach plum",
    "url": "https://plants.usda.gov/DocumentLibrary/plantguide/pdf/pg_prma2.pdf"
   },
   {
    "label": "Go Botany (Native Plant Trust): Prunus maritima",
    "url": "https://gobotany.nativeplanttrust.org/species/prunus/maritima/"
   }
  ]
 },
 "juniper-berries": {
  "otherNames": "Common juniper. The ‘berries’ are really fleshy seed cones.",
  "family": "Cupressaceae, the cypress family.",
  "range": "Circumboreal. In Canada it is recorded in every province and territory — the Yukon, the Northwest Territories and Nunavut included; in the US it runs through New England to the Carolinas, across the Great Lakes states to Minnesota and Nebraska, and through the western mountains to Washington, California, Arizona and New Mexico. It grows on dry, open, rocky hillsides, sand terraces and barrens.",
  "whenToPick": "The cones take two, sometimes three, growing seasons to ripen, so one bush carries green unripe ‘berries’ and blue-black ripe ones at the same time. Ripe cones turn a waxy, dusty blue-black, mostly from August to October of their second year. Pick only the dark blue ones.",
  "partsUsed": "The ripe blue cones, dried and crushed as a seasoning for game, sauerkraut and cabbage — a few at a time. Needles and wood are not eaten.",
  "poisonous": "Juniper contains strong volatile oils, so it is used a few berries at a time. The European Medicines Agency does not recommend juniper in pregnancy or breastfeeding, or for people with severe kidney disease. Juniper oil and other concentrated extracts are not kitchen ingredients. Savin (Juniperus sabina), a European shrub planted in gardens, is poisonous in all parts.",
  "moreLookalikes": "Eastern red cedar (Juniperus virginiana) is a tree with mostly scale-like leaves and small blue cones that ripen in one year. Some people use them, but NC State lists the fruit as low toxicity, with diarrhea possible in large amounts — common juniper is the one for cooking. Ornamental junipers, including savin and its hybrids: don’t use any you can’t name to species.",
  "faqs": [
   {
    "q": "When are juniper berries in season?",
    "a": "Ripe common juniper berries are picked from late summer through autumn, mostly August to October. But berries are on the bush most of the year, because each takes two or three seasons to ripen. Pick the dusty blue-black ones and leave the green."
   },
   {
    "q": "When are juniper berries ripe?",
    "a": "When they’ve turned dark blue-black with a pale, waxy bloom. On common juniper that happens in the second — occasionally the third — year after flowering, mostly from August to October. Green berries on the same branch are a later crop."
   },
   {
    "q": "Why does my juniper have green and blue berries at the same time?",
    "a": "Because common juniper cones take about two years, sometimes three, to ripen. A bush holds this year’s green cones and older blue ones together. Pick only the blue."
   },
   {
    "q": "What types of juniper berries can you eat?",
    "a": "Common juniper (Juniperus communis) is the one used for gin and cooking. Some people use eastern red cedar cones, but extension sources list them as mildly toxic in quantity. Avoid savin (J. sabina), which is poisonous, and any ornamental juniper you can’t identify."
   },
   {
    "q": "How do I identify common juniper?",
    "a": "A low, spreading or bushy evergreen of dry, rocky, open ground, with sharp needles in whorls of three, each with a single white stripe along the upper side. The ‘berries’ are small, round cones, green at first and dusty blue-black when ripe."
   },
   {
    "q": "Are juniper berries safe in pregnancy?",
    "a": "No — avoid them. European medicines regulators don’t recommend juniper in pregnancy or breastfeeding, or for anyone with serious kidney disease. For everyone else, a few dried berries in a stew is the normal kitchen amount."
   }
  ],
  "sources": [
   {
    "label": "USDA Forest Service FEIS: Juniperus communis",
    "url": "https://www.fs.usda.gov/database/feis/plants/shrub/juncom/all.html"
   },
   {
    "label": "European Medicines Agency: EU herbal monograph, Juniperus communis (juniper berry)",
    "url": "https://www.ema.europa.eu/en/documents/herbal-monograph/final-european-union-herbal-monograph-juniperus-communis-l-pseudo-fructus-galbulus-revision-1_en.pdf"
   },
   {
    "label": "NC State Extension: Juniperus virginiana (eastern redcedar)",
    "url": "https://plants.ces.ncsu.edu/plants/juniperus-virginiana/common-name/eastern-redcedar/"
   },
   {
    "label": "Natural Medicines (via Vitaly): Savin tops",
    "url": "https://vital.ly/trc/Savin-tops/monograph=1162"
   }
  ]
 },
 "chaga": {
  "family": "Hymenochaetaceae, a family of bracket and crust fungi.",
  "range": "On living birch in cold northern forests across Canada and the northern US.",
  "whenToPick": "Any time of year, but late autumn to early spring is easiest: the leaves are down and the black mass stands out on white bark. Chaga grows for years, so there is no ‘ripe’ moment — take part of a conk and leave the rest attached.",
  "partsUsed": "The sterile conk — black, cracked crust and rusty orange-brown, corky interior — broken into chunks and simmered for tea. The birch wood underneath is not used.",
  "poisonous": "Chaga is high in oxalate. Doctors have reported oxalate kidney damage in people who took chaga daily for months; some needed dialysis and did not recover kidney function. It may also increase bleeding risk with blood thinners such as warfarin and add to the blood-sugar-lowering effect of diabetes medicines. People with kidney problems should avoid it.",
  "moreLookalikes": "Black knot, a fungal disease of cherries, plums and chokecherries, makes hard, knobby black galls along branches — on Prunus, never on birch. Burls are solid wood inside, with no orange-brown interior.",
  "faqs": [
   {
    "q": "How do I identify chaga?",
    "a": "Look on living birch for a black, deeply cracked, charcoal-like lump bursting from the trunk. Break a piece off: the inside should be rusty orange-brown and corky. Woody inside means a burl; not on birch means it isn’t chaga."
   },
   {
    "q": "Is chaga tea safe to drink?",
    "a": "Many people drink it occasionally, but chaga is high in oxalate, and doctors have reported kidney damage in people who took it daily for months. Avoid it if you have kidney disease, and ask a doctor first if you take blood thinners or diabetes medicine."
   },
   {
    "q": "When is the best time to harvest chaga?",
    "a": "Late autumn through early spring, when the birches are bare and the black conks are easy to spot. Take only part of a conk and leave the rest so it keeps growing."
   },
   {
    "q": "What looks like chaga?",
    "a": "Birch burls, which are solid wood inside, and black knot, a hard black fungal gall on cherry and plum branches. Chaga grows only on birch and is orange-brown and corky inside."
   }
  ],
  "sources": [
   {
    "label": "Memorial Sloan Kettering: Chaga mushroom",
    "url": "https://www.mskcc.org/cancer-care/integrative-medicine/herbs/chaga-mushroom"
   },
   {
    "label": "PubMed: chaga oxalate nephropathy case reports",
    "url": "https://pubmed.ncbi.nlm.nih.gov/?term=chaga+oxalate+nephropathy"
   },
   {
    "label": "University of Minnesota Extension: Black knot",
    "url": "https://extension.umn.edu/plant-diseases/black-knot"
   }
  ]
 },
 "miners-lettuce": {
  "family": "Montiaceae (formerly placed in the purslane family).",
  "range": "Western North America from British Columbia — frequent in the southwest and southeast of the province — south through the western mountains and coast to Mexico and Guatemala. It has also gone wild in western Europe and elsewhere.",
  "whenToPick": "The cool, wet months: late winter to early summer in most of its range. It flowers from February to May or June and fades as the ground warms and dries.",
  "partsUsed": "Leaves, stems and flowers, raw in salads or cooked like spinach. Not the roots.",
  "poisonous": "Like spinach, wild plants can sometimes build up a lot of oxalate. Enjoy it as one green among several rather than in big daily helpings.",
  "moreLookalikes": "Young plants have only long-stalked, heart-shaped leaves before the round, disc-like leaf appears, and are harder to recognize. Wait until the flower stem has come up through the disc before picking.",
  "faqs": [
   {
    "q": "Can you eat miner’s lettuce raw?",
    "a": "Yes, once identified with certainty — leaves, stems and flowers are eaten raw in salads or cooked like spinach. Like spinach it contains oxalate, so enjoy it as one green among several rather than in huge daily amounts."
   },
   {
    "q": "When is miner’s lettuce in season?",
    "a": "In the cool, wet months: late winter through spring in most of its range, flowering from February to May or June. It fades once the soil dries and the weather warms."
   },
   {
    "q": "How do I identify miner’s lettuce?",
    "a": "A low, succulent plant up to about 30 cm (1 ft), where a round, disc-like leaf wraps right around the stem and a cluster of tiny white or pink five-petalled flowers rises from its centre. Young plants have only heart-shaped leaves on long stalks."
   },
   {
    "q": "Why is it called miner’s lettuce?",
    "a": "Gold Rush miners in California ate it to fend off scurvy — it’s a good source of vitamin C."
   }
  ],
  "sources": [
   {
    "label": "Wikipedia: Claytonia perfoliata",
    "url": "https://en.wikipedia.org/wiki/Claytonia_perfoliata"
   },
   {
    "label": "E-Flora BC: Claytonia perfoliata",
    "url": "https://linnet.geog.ubc.ca/Atlas/Atlas.aspx?sciname=Claytonia%20perfoliata"
   }
  ]
 },
 "wild-fennel": {
  "otherNames": "Common fennel. Garden bulb fennel (Florence fennel, var. azoricum) is the same species.",
  "family": "Apiaceae, the carrot family — which also holds poison hemlock and water hemlock.",
  "range": "A Mediterranean plant gone wild across much of the US — all but the northern plains and a handful of other states — and very common throughout California, where it forms dense stands in fields and on islands and is treated as an invasive weed.",
  "whenToPick": "Young shoots and fronds in spring; flowers and pollen from late spring through summer; seeds from summer into autumn. In the west, flowering starts in early May and seed can form from May to early November.",
  "partsUsed": "Everything above ground: young shoots and fronds, flower heads, pollen and seeds. Wild fennel does not form the swollen bulb of garden fennel, and its stalks get tough as they age.",
  "moreLookalikes": "Water hemlock (Cicuta maculata): wet meadows, ditches and pond or stream banks; purple-striped or mottled hollow stems with cross-walls at the nodes; leaves divided into toothed leaflets, not threads; white flowers. Every part is highly toxic, the roots most of all. Dill: also feathery and yellow-flowered, but an annual that smells of dill, not anise.",
  "faqs": [
   {
    "q": "Can you eat wild fennel?",
    "a": "Yes, once identified with certainty — fronds, young shoots, flowers, pollen and seeds are all used. The catch is poison hemlock, which grows in the same places. Wild fennel has yellow flowers and smells strongly of anise; hemlock has white flowers, purple-spotted stems and a musty smell."
   },
   {
    "q": "What’s the difference between wild fennel and fennel?",
    "a": "They’re the same species, Foeniculum vulgare. Garden bulb fennel is a variety (Florence fennel) with swollen leaf bases that form a bulb. Wild, or common, fennel never forms a bulb, but its fronds, pollen and seeds carry the same anise flavour."
   },
   {
    "q": "When is the best time to pick fennel?",
    "a": "Young shoots and fronds in spring; flower heads and pollen from late spring through summer; seeds from late summer into autumn. Cut rather than pull — wild fennel is a perennial and comes back from its root."
   },
   {
    "q": "How do I tell fennel from poison hemlock?",
    "a": "Check three things. Flowers: fennel yellow, hemlock white. Smell: fennel anise, hemlock musty. Stem: fennel smooth and bluish-green with a waxy bloom; hemlock smooth with purple or red blotches. Both stems can be hollow, so don’t rely on that. Any doubt, leave it."
   },
   {
    "q": "Is wild fennel invasive?",
    "a": "In California, yes — it forms dense stands in fields and on coastal islands and is managed as an invasive weed. Picking it does no harm there, but pick only where you know nothing has been sprayed."
   },
   {
    "q": "Is wild fennel the same as dill?",
    "a": "No. Dill is a separate, annual plant that smells of dill pickles. Both have feathery leaves and yellow flower umbrellas, and both are edible, but only fennel smells and tastes of anise."
   }
  ],
  "sources": [
   {
    "label": "Washington State Noxious Weed Control Board: Foeniculum vulgare",
    "url": "https://www.nwcb.wa.gov/images/weeds/Foeniculum-vulgare-final.pdf"
   },
   {
    "label": "King County Noxious Weeds: Poison hemlock",
    "url": "https://kingcounty.gov/en/legacy/services/environment/animals-and-plants/noxious-weeds/weed-identification/poison-hemlock.aspx"
   },
   {
    "label": "NC State Extension: Conium maculatum (poison hemlock)",
    "url": "https://plants.ces.ncsu.edu/plants/conium-maculatum/"
   },
   {
    "label": "NC State Extension: Cicuta maculata (water hemlock)",
    "url": "https://plants.ces.ncsu.edu/plants/cicuta-maculata/"
   }
  ]
 },
 "plantain-leaf": {
  "otherNames": "Common plantain, greater plantain. Not related to the cooking banana called plantain.",
  "family": "Plantaginaceae, the plantain family.",
  "range": "Native to Europe and Asia and now found throughout North America on lawns, paths and packed soil. Indigenous peoples called it ‘white man’s footprint’ because it followed European settlement.",
  "whenToPick": "Young leaves from spring into early summer are best; older leaves turn tough and stringy. Flower spikes appear from early summer on.",
  "partsUsed": "Young leaves, raw or cooked like spinach; leaves crushed as a traditional poultice for stings and scrapes.",
  "poisonous": "Eating large quantities can lower blood pressure — eat it as one green among many.",
  "faqs": [
   {
    "q": "How do you identify plantain?",
    "a": "A flat rosette of broad oval leaves, 5–20 cm (2–8 in) long, with five to seven strong, stringy veins running from the base toward the tip, and pencil-thin spikes of tiny greenish flowers from the centre. Tear a leaf slowly: the veins pull out like strings."
   },
   {
    "q": "Is broadleaf plantain the same as the banana-like plantain?",
    "a": "No. The cooking plantain is a kind of banana. Broadleaf plantain is an unrelated lawn weed whose young leaves are eaten as a green."
   },
   {
    "q": "Can you eat plantain leaves raw?",
    "a": "Yes — young leaves, once identified with certainty, can go raw into salads or be cooked like spinach. Older leaves are stringy. Don’t pick from lawns that may be sprayed or where dogs are walked."
   },
   {
    "q": "What plant looks like plantain but is poisonous?",
    "a": "Young foxglove. Its first-year rosette of big, coarse leaves can look similar, and every part is poisonous to the heart. Plantain has a few parallel veins running end to end that pull out as strings; foxglove’s leaves are fuzzy and net-veined."
   }
  ],
  "sources": [
   {
    "label": "NC State Extension: Plantago major",
    "url": "https://plants.ces.ncsu.edu/plants/plantago-major/"
   },
   {
    "label": "NC State Extension: Digitalis purpurea (foxglove)",
    "url": "https://plants.ces.ncsu.edu/plants/digitalis-purpurea/"
   }
  ]
 },
 "yarrow": {
  "otherNames": "Common yarrow, milfoil.",
  "family": "Asteraceae, the daisy family.",
  "range": "Right across Canada and the US. Yarrow is native to temperate Europe, Asia and North America, and European strains have spread here too.",
  "whenToPick": "Young leaves in spring, in small amounts; flowers from early summer into fall, picked freshly opened for tea.",
  "partsUsed": "Leaves and flowers, in small amounts, raw or cooked, mostly as tea. Both are bitter.",
  "poisonous": "Yarrow contains traces of thujone, and drug references advise avoiding it in pregnancy. It should not be used by anyone allergic to the daisy family (ragweed, chrysanthemums, marigolds). Contact dermatitis is the most commonly reported reaction — wear gloves if your skin is sensitive.",
  "faqs": [
   {
    "q": "Is yarrow edible?",
    "a": "In small amounts, once identified with certainty. The leaves and flowers are bitter and mostly used for tea or as a herb. Avoid it in pregnancy and if you’re allergic to the daisy family."
   },
   {
    "q": "How do I tell yarrow from poison hemlock?",
    "a": "Yarrow’s leaves are soft, flat and finely feathery on a hairy stem, and smell sharply aromatic; its flowers are tiny daisies in flat-topped clusters. Poison hemlock is taller, with a smooth, hollow stem blotched purple, a musty smell, and umbrella-shaped clusters of five-petalled flowers."
   },
   {
    "q": "Can yarrow cause a rash?",
    "a": "Yes. Contact dermatitis is the most commonly reported reaction to yarrow, so wear gloves when picking if your skin is sensitive."
   }
  ],
  "sources": [
   {
    "label": "NC State Extension: Achillea millefolium",
    "url": "https://plants.ces.ncsu.edu/plants/achillea-millefolium/"
   },
   {
    "label": "Drugs.com: Yarrow",
    "url": "https://www.drugs.com/npp/yarrow.html"
   },
   {
    "label": "King County Noxious Weeds: Poison hemlock",
    "url": "https://kingcounty.gov/en/legacy/services/environment/animals-and-plants/noxious-weeds/weed-identification/poison-hemlock.aspx"
   }
  ]
 },
 "sheep-sorrel": {
  "otherNames": "Common sheep sorrel, red sorrel.",
  "family": "Polygonaceae, the buckwheat family (with the docks).",
  "range": "Eurasian in origin, now naturalized across most of Canada and the US in open, disturbed places on poor, acidic, sandy or gravelly soil. It spreads by creeping roots and forms patches.",
  "whenToPick": "Leaves can be picked from spring into autumn; young leaves are the most tender.",
  "partsUsed": "Leaves and tender stems, raw as a tart garnish, in salads, or cooked into sauces.",
  "poisonous": "The leaves contain significant amounts of soluble oxalates, which can harm the kidneys if a large quantity is eaten. Use it as a seasoning, not a salad base.",
  "faqs": [
   {
    "q": "Is sheep sorrel edible?",
    "a": "Yes, in small amounts, once identified with certainty. The arrow-shaped leaves taste sharply lemony and are used as a garnish, in salads or in sauces. It’s high in oxalates, so treat it as a seasoning, not a salad base."
   },
   {
    "q": "How do I identify sheep sorrel?",
    "a": "Look for small, arrowhead-shaped leaves with two lobes flaring out at the base, on thin stems 10–60 cm (4–24 in) tall, in patches on sandy or acidic ground. Female plants carry spikes of tiny red flowers. Nibble a leaf: it should taste sour, like lemon."
   },
   {
    "q": "Is sheep sorrel the same as wood sorrel?",
    "a": "No. Sheep sorrel is a dock relative with arrow-shaped leaves; wood sorrel (Oxalis) has three heart-shaped leaflets like a clover. Both taste lemony because both contain oxalic acid."
   }
  ],
  "sources": [
   {
    "label": "NC State Extension: Rumex acetosella",
    "url": "https://plants.ces.ncsu.edu/plants/rumex-acetosella/"
   },
   {
    "label": "USDA Forest Service FEIS: Rumex acetosella",
    "url": "https://www.fs.usda.gov/database/feis/plants/forb/rumace/all.html"
   }
  ]
 },
 "lambs-quarters": {
  "otherNames": "Lambsquarters, white goosefoot, fat hen.",
  "family": "Amaranthaceae, the amaranth family (formerly the goosefoot family).",
  "range": "Across Canada and the US wherever soil has been disturbed — gardens, fields, construction sites. It is often one of the first weeds to appear on newly turned ground.",
  "whenToPick": "Late spring to midsummer for leaves and tender tips, before the plant flowers; seeds from late summer into fall.",
  "partsUsed": "Young leaves and shoot tips, cooked like spinach; seeds, cooked, or dried and ground into flour.",
  "poisonous": "The leaves and seeds contain saponins and oxalic acid; large amounts can upset digestion. NC State Extension advises cooking, steaming or freezing them before eating.",
  "faqs": [
   {
    "q": "What does lamb’s quarters look like?",
    "a": "An upright weed, 10 cm to 2 m (4 in to 6 ft) tall, with diamond- to goosefoot-shaped, irregularly toothed leaves that look dusted with white flour, especially on young growth. Stems are often striped green and purple. Water beads up and rolls off the leaves."
   },
   {
    "q": "Can you eat lamb’s quarters raw?",
    "a": "It’s best cooked. The leaves contain saponins and oxalic acid, and NC State Extension advises cooking, steaming or freezing them before eating. Cook it like spinach."
   },
   {
    "q": "How do I tell lamb’s quarters from nightshade?",
    "a": "Lamb’s quarters has a white, mealy coating on young leaves that feels powdery and makes water bead; nightshade leaves are plain green without it. Later, nightshade carries small green-then-black berries; lamb’s quarters has only tight clusters of tiny green flowers."
   },
   {
    "q": "Are lamb’s quarters seeds edible?",
    "a": "Yes, cooked. Indigenous peoples ground the dried seeds into flour, and the plant is a relative of quinoa. Rinse the seeds well and cook them like a grain."
   }
  ],
  "sources": [
   {
    "label": "NC State Extension: Chenopodium album",
    "url": "https://plants.ces.ncsu.edu/plants/chenopodium-album/"
   },
   {
    "label": "Minnesota Wildflowers: Lamb’s-quarters",
    "url": "https://www.minnesotawildflowers.info/flower/lambs-quarters"
   }
  ]
 },
 "purslane": {
  "otherNames": "Common purslane, verdolaga.",
  "family": "Portulacaceae, the purslane family.",
  "range": "Across southern Canada and the whole US, on hot, sunny, disturbed ground: sidewalk cracks, garden beds and gravel.",
  "whenToPick": "Midsummer to early autumn, once the heat arrives. Pick young, tender stem tips before the plant sets seed.",
  "partsUsed": "Stems, leaves and flowers, raw or cooked, with a slightly sour, salty taste.",
  "poisonous": "Contains oxalates, which can be harmful in large amounts — a salad ingredient, not a daily bowlful.",
  "moreLookalikes": "Spotted spurge (Euphorbia maculata) forms flat mats in the same cracks, with slender hairy stems, small leaves often marked with a dark spot, and white milky sap. The sap irritates skin, blisters the lips and mouth if eaten, and can damage the eyes. Break a stem: purslane’s sap is clear and its leaves are thick and fleshy. Moss rose (Portulaca grandiflora), a garden relative, has bigger, showier flowers.",
  "faqs": [
   {
    "q": "How do I identify purslane?",
    "a": "A low mat of smooth, reddish, fleshy stems with thick, glossy, paddle-shaped leaves clustered at the joints, and small yellow five-petalled flowers that open only in the morning. No hairs, and clear — not milky — sap."
   },
   {
    "q": "How do I tell purslane from spurge?",
    "a": "Snap a stem. Spurge bleeds white milky sap that irritates skin and eyes; purslane’s sap is clear. Spurge stems are thin and hairy with small flat leaves, often with a dark spot; purslane’s are thick, smooth and succulent."
   },
   {
    "q": "Can you eat purslane raw?",
    "a": "Yes, once identified with certainty: stems, leaves and flowers are eaten raw in salads or cooked, with a slightly sour, salty crunch. It contains oxalates, so keep portions moderate."
   }
  ],
  "sources": [
   {
    "label": "NC State Extension: Portulaca oleracea",
    "url": "https://plants.ces.ncsu.edu/plants/portulaca-oleracea/"
   },
   {
    "label": "NC State Extension: Euphorbia maculata (spotted spurge)",
    "url": "https://plants.ces.ncsu.edu/plants/euphorbia-maculata/"
   }
  ]
 },
 "burdock-root": {
  "otherNames": "Common burdock (Arctium minus); great burdock (A. lappa), the species grown in Japan as gobo.",
  "family": "Asteraceae, the daisy family.",
  "range": "Both burdocks came from Europe and Asia and are now common weeds of barnyards, ditches, fence lines and waste ground across southern Canada and most of the US.",
  "whenToPick": "Dig first-year roots from late summer through fall, or the next spring before the plant sends up its flower stalk. Once it bolts in its second year, the root turns woody.",
  "partsUsed": "The long taproot of first-year plants, scrubbed or peeled, sliced and cooked.",
  "poisonous": "Burdock root is a food, but store-bought burdock root tea has poisoned people. In a 1978 case reported in JAMA, and another reported in 1984, commercial ‘burdock’ tea contained atropine, the poison of deadly nightshade (belladonna); belladonna root mixed into the harvest is the usual explanation. Burdock can also cause allergic reactions in people sensitive to the daisy family.",
  "moreLookalikes": "Common cocklebur (Xanthium strumarium): rough, sandpapery, triangular leaves with irregular lobes. Its seedlings are highly toxic — eating them killed 19 of 76 people in a documented outbreak in Bangladesh. Rhubarb: smooth, glossy leaves on thick, celery-like red or green stalks; the leaves are poisonous. Dock (Rumex): long, narrow leaves without the woolly underside. Burdock leaves are huge, heart-shaped at the base, wavy-edged and pale underneath.",
  "faqs": [
   {
    "q": "What’s the link between burdock and nightshade?",
    "a": "Store-bought burdock root tea has been contaminated with belladonna (deadly nightshade). People were poisoned by atropine in commercial burdock tea in cases reported in 1978 and 1984. The contamination happened in commercial harvesting; digging a first-year burdock rosette you’ve identified yourself avoids it."
   },
   {
    "q": "How do you identify burdock?",
    "a": "First-year burdock is a ground-level rosette of huge leaves, 30–60 cm (1–2 ft) long, heart-shaped at the base, wavy-edged and pale underneath. In the second year it sends up a branched stalk with purple thistle-like flowers that become hooked burs."
   },
   {
    "q": "What plants look like burdock?",
    "a": "Rhubarb (smooth, glossy leaves, thick celery-like stalks, poisonous leaves), cocklebur (rough, sandpapery, triangular leaves; toxic seedlings), foxglove (soft, hairy leaves; every part poisonous) and dock (long narrow leaves; harmless). Burdock’s leaves are huge, heart-shaped and pale underneath."
   },
   {
    "q": "Are burdock leaf stalks hollow?",
    "a": "It depends on the species. Common burdock (Arctium minus) has hollow leaf stalks; great burdock (A. lappa), the cultivated gobo, has solid ones. So a hollow stalk tells you which burdock you have, not whether it’s burdock."
   },
   {
    "q": "When do you dig burdock root?",
    "a": "From late summer through fall of the plant’s first year, or early the next spring before the flower stalk starts. Choose rosettes with no stalk. The root runs deep, so bring a spade and patience."
   },
   {
    "q": "Is burdock root the same as gobo?",
    "a": "Gobo is great burdock (Arctium lappa), grown in Japan for its long roots. Common burdock (A. minus), the wild one along North American fences and ditches, is used the same way."
   }
  ],
  "sources": [
   {
    "label": "JAMA (1978): Burdock root tea poisoning — case report involving a commercial preparation",
    "url": "https://www.e-lactancia.org/media/papers/BurdockIntoxication01-JAMA1978.pdf"
   },
   {
    "label": "RxList: Burdock",
    "url": "https://www.rxlist.com/supplements/burdock.htm"
   },
   {
    "label": "Minnesota Wildflowers: Common burdock",
    "url": "https://www.minnesotawildflowers.info/flower/common-burdock"
   },
   {
    "label": "PLoS One (2010, via CDC Stacks): Fatal outbreak from eating Xanthium strumarium seedlings",
    "url": "https://stacks.cdc.gov/view/cdc/22932"
   }
  ]
 },
 "maple-sap": {
  "otherNames": "Maple water.",
  "family": "Sapindaceae, the soapberry family (maples were once given their own family, Aceraceae).",
  "range": "Sugar maple grows from Nova Scotia and New Brunswick west through Quebec and Ontario to Manitoba, and south to Georgia and northeastern Texas. Quebec alone makes about 72% of the world’s maple syrup.",
  "whenToPick": "Late winter to spring, in a run that usually lasts four to eight weeks. Sap flows on days above freezing after nights below. The season ends when the buds break: late sap gives syrup a ‘buddy’ off-flavour.",
  "partsUsed": "The sap, drunk fresh or boiled down to syrup or sugar.",
  "moreLookalikes": "Black maple and red maple are also tapped for syrup, and so, sometimes, is Manitoba maple (box elder).",
  "faqs": [
   {
    "q": "When do you tap maple trees?",
    "a": "In late winter, when days rise above freezing and nights still drop below. That’s usually between February and April, depending on where you live, and the run lasts four to eight weeks. Stop when the buds break."
   },
   {
    "q": "How much sap does it take to make a litre of syrup?",
    "a": "About 40 litres, but it depends on the sap’s sugar. At 1.5% sugar you need about 57 litres; at 3.5% only about 25. Sap from the main syrup maples usually runs 2–5% sugar."
   },
   {
    "q": "When is maple syrup done boiling?",
    "a": "When it reaches about 4°C (7°F) above the boiling point of water where you are, which brings it to 66% sugar. Under-boiled syrup is watery and spoils quickly; over-boiled syrup crystallizes."
   },
   {
    "q": "Can you drink maple sap straight from the tree?",
    "a": "Many people do — fresh sap is clear and faintly sweet. Collect it in clean food-grade containers, keep it cold, and drink or boil it as soon as you can: like milk, it sours if it sits, especially in the sun."
   },
   {
    "q": "Which maples can you tap?",
    "a": "Sugar, black and red maples are the main syrup trees, and sugar and black maple sap is the sweetest. Manitoba maple (box elder) is sometimes tapped too."
   }
  ],
  "sources": [
   {
    "label": "Wikipedia: Maple syrup",
    "url": "https://en.wikipedia.org/wiki/Maple_syrup"
   },
   {
    "label": "USDA Forest Service FEIS: Acer saccharum",
    "url": "https://www.fs.usda.gov/database/feis/plants/tree/acesac/all.html"
   },
   {
    "label": "Ohio State University Extension: Hobby maple syrup production",
    "url": "https://ohioline.osu.edu/factsheet/f-36"
   },
   {
    "label": "University of Maine Cooperative Extension: How to tap maple trees and make maple syrup (Bulletin 7036)",
    "url": "https://extension.umaine.edu/publications/7036e/"
   }
  ]
 },
 "wood-sorrel": {
  "otherNames": "Common yellow woodsorrel, yellow wood sorrel, sourgrass.",
  "family": "Oxalidaceae, the wood-sorrel family.",
  "range": "Native to North America and East Asia, and found in lawns, gardens, woodland edges and pavement cracks across southern Canada and the US.",
  "whenToPick": "Spring to fall; it flowers mostly from July to October. Leaves, flowers and green seed pods can be picked whenever they are fresh.",
  "partsUsed": "Leaves, stems, flowers and seed pods, raw as a sour garnish, in salads, or steeped for a lemony drink. The raw seed pods are juicy and tart, a little like rhubarb.",
  "poisonous": "All parts contain soluble oxalates. Oxalic acid can block the body’s absorption of calcium, and kidney damage is possible if large amounts are eaten — keep to small amounts.",
  "faqs": [
   {
    "q": "Is wood sorrel edible?",
    "a": "Yes, in small amounts, once identified with certainty. Leaves, flowers and green seed pods all have a bright, lemony sourness. It’s high in oxalic acid, so treat it as a garnish or nibble rather than a salad green."
   },
   {
    "q": "How can I tell wood sorrel from clover?",
    "a": "Wood sorrel’s three leaflets are heart-shaped, notched at the outer edge, and fold down at night; its flowers are small, yellow and five-petalled. Clover’s leaflets are rounded or oval, and its flowers are round white or pink heads. Taste settles it: sorrel is sour."
   },
   {
    "q": "Why do wood sorrel leaves fold up?",
    "a": "The leaflets curl up at night and open again in the morning. It’s a handy clue at dusk, alongside the heart-shaped leaflets and small yellow flowers."
   }
  ],
  "sources": [
   {
    "label": "NC State Extension: Oxalis stricta",
    "url": "https://plants.ces.ncsu.edu/plants/oxalis-stricta/"
   },
   {
    "label": "Wikipedia: Oxalis stricta",
    "url": "https://en.wikipedia.org/wiki/Oxalis_stricta"
   }
  ]
 },
 "chickweed": {
  "otherNames": "Common chickweed, starwort.",
  "family": "Caryophyllaceae, the pink (carnation) family.",
  "range": "From Eurasia and North Africa, now throughout Canada and the US in garden beds, lawns and field edges, in moist soil.",
  "whenToPick": "The cool seasons: late winter and early spring above all, and again in autumn — through the winter where it is mild. It fades in summer heat.",
  "partsUsed": "Leaves, stems, flowers and seeds, raw in salads and pesto or lightly cooked. The taste is mild, like spinach or corn silk.",
  "poisonous": "Contains saponins, which the body absorbs poorly; thorough cooking breaks them down if you eat a lot.",
  "moreLookalikes": "Mouse-ear chickweed (Cerastium) has the same notched white flowers but is densely hairy all over; common chickweed is smooth except for its line of hairs. Spurges that sprawl in the same beds bleed white milky sap; chickweed’s sap is clear.",
  "faqs": [
   {
    "q": "How do you identify chickweed?",
    "a": "A sprawling, bright-green mat of weak stems with small, oval, pointed leaves in opposite pairs and tiny white star flowers whose five petals are split so deeply they look like ten. The giveaway: a single line of fine hairs running up the stem."
   },
   {
    "q": "How do I tell chickweed from mouse-ear chickweed?",
    "a": "Common chickweed is mostly smooth, with a single line of hairs along the stem. Mouse-ear chickweed is densely hairy all over, with fuzzy leaves. Gently pull a common chickweed stem apart, too — it has a stretchy inner core."
   },
   {
    "q": "Is chickweed edible raw?",
    "a": "Yes, once identified with certainty. Leaves, stems and flowers go raw into salads or pesto, with a mild, spinach-like taste. It contains saponins, which the body absorbs poorly; cooking breaks them down if you eat a lot."
   },
   {
    "q": "When does chickweed grow?",
    "a": "It’s a cool-season plant: most lush in late winter and early spring, and again in autumn, staying green all winter where it’s mild. It fades in summer heat."
   }
  ],
  "sources": [
   {
    "label": "NC State Extension: Stellaria media",
    "url": "https://plants.ces.ncsu.edu/plants/stellaria-media/"
   },
   {
    "label": "Minnesota Wildflowers: Common chickweed",
    "url": "https://www.minnesotawildflowers.info/flower/common-chickweed"
   }
  ]
 },
 "dulse": {
  "otherNames": "Dillisk.",
  "family": "Palmariaceae, a family of red seaweeds.",
  "range": "Cold northern coasts of the Atlantic and Pacific. It grows in the intertidal zone from mid-tide down to more than 20 m (65 ft), on rocks and on the stalks of kelp, on sheltered and exposed shores alike. It has long been eaten, and used as a folk remedy, in Atlantic Canada, Ireland and Iceland.",
  "whenToPick": "Commonly found from June to September and picked by hand at low tide. In Maine, wild sea vegetables are mostly harvested in early spring.",
  "partsUsed": "The fronds, rinsed of sand and snails, sun-dried, and eaten as a snack, fried into chips, or crumbled into soups, chowder and bread.",
  "faqs": [
   {
    "q": "Where does dulse grow?",
    "a": "On rocks and on kelp stalks in the intertidal zone of cold North Atlantic and North Pacific shores, from mid-tide to more than 20 m (65 ft) deep. In Atlantic Canada and Maine it’s gathered at low tide."
   },
   {
    "q": "How do you harvest dulse?",
    "a": "At low tide, by hand, cutting the fronds and leaving the small disc-shaped holdfast on the rock so it regrows. Rinse off sand and snails, then dry in the sun. Avoid sewage outfalls, storm drains and marinas."
   },
   {
    "q": "Do you need a licence to pick dulse?",
    "a": "Rules vary. In Maine, individuals may take up to 50 lb (about 23 kg) a day for personal use, under Department of Marine Resources rules. Canadian provinces and other states set their own rules, so check with your fisheries department before harvesting."
   },
   {
    "q": "How do I identify dulse?",
    "a": "Flat, leathery, deep red-purple blades with no midrib, often split into broad hand-like lobes 3–8 cm wide and up to 50 cm (20 in) long, sometimes with small leaflets along the edges, attached by a small disc."
   }
  ],
  "sources": [
   {
    "label": "Wikipedia: Palmaria palmata",
    "url": "https://en.wikipedia.org/wiki/Palmaria_palmata"
   },
   {
    "label": "Maine Sea Grant: Seaweed (Maine seafood guide)",
    "url": "https://seagrant.umaine.edu/maine-seafood-guide/seaweed/"
   }
  ]
 },
 "wild-rice": {
  "otherNames": "Manoomin (Ojibwe), northern wild rice.",
  "family": "Poaceae, the grass family. A different genus (Zizania) from Asian rice (Oryza).",
  "range": "Shallow lakes and slow streams of the Great Lakes region and the boreal forest: northern Ontario, Manitoba, Saskatchewan and Alberta, and Minnesota, Wisconsin, Michigan and Idaho. Southern wild rice (Zizania aquatica) grows along the St. Lawrence and the Atlantic and Gulf coasts.",
  "whenToPick": "Late August into September. Ripe grain falls into the canoe with a gentle brush of the knocking sticks. If heads are still giving empty hulls or milky seeds, the bed needs more time — stop and come back.",
  "partsUsed": "The grain, parched, hulled and winnowed before cooking.",
  "poisonous": "Ergot, a highly toxic fungus, can infect wild rice. Infected grains show pink or purplish blotches or growths, from grain-sized to several times larger. Pick them out before processing; ergot is dangerous if eaten.",
  "faqs": [
   {
    "q": "When is wild rice ready to harvest?",
    "a": "Usually late August into September. Ripe grain drops into the canoe with a gentle brush of the knocking sticks. If you’re getting empty hulls or milky seeds, the bed isn’t ready — stop and give it more time."
   },
   {
    "q": "Do you need a licence to harvest wild rice?",
    "a": "Usually, yes. Minnesota and Wisconsin regulate ricing — hours, boat size and the length of the knocking sticks — and tribes set their own rules on reservation and ceded-territory waters. In Ontario, check with the province and local First Nations before you go."
   },
   {
    "q": "Is wild rice actually rice?",
    "a": "Not quite. It’s a native North American grass in its own genus, Zizania, separate from Asian rice (Oryza). Northern wild rice is an annual that grows back from seed in shallow water each year."
   },
   {
    "q": "What is ergot on wild rice?",
    "a": "A toxic fungus that replaces some grains with pink-to-purple growths, from grain-sized to several times larger. Pick out any discoloured or oversized grains before parching; ergot is dangerous if eaten."
   }
  ],
  "sources": [
   {
    "label": "Wikipedia: Wild rice",
    "url": "https://en.wikipedia.org/wiki/Wild_rice"
   },
   {
    "label": "Great Lakes Indian Fish & Wildlife Commission: Manoomin (wild rice) regulations",
    "url": "https://glifwc.org/WildRice/"
   }
  ]
 },
 "garlic-mustard": {
  "otherNames": "Jack-by-the-hedge, hedge garlic, poor man’s mustard, alliaire officinale (Quebec).",
  "family": "Brassicaceae, the mustard family (which also includes cabbage, horseradish, watercress and the toothworts).",
  "range": "A European biennial brought over in the 1800s as a kitchen herb, now the dominant woodland invader from Nova Scotia and New Brunswick through southern Quebec and Ontario, New England, the Great Lakes states and the Ohio valley, south through the Appalachians to Georgia and west to the eastern Plains, with established outposts around Edmonton, Denver, Salt Lake City, Portland, Seattle and Vancouver and a small population at Juneau. It is not recorded in Florida, the Gulf coast, the desert Southwest or Hawaii.",
  "whenToPick": "Spring is the main season: the second-year stalks shoot up in April and May in southern Ontario and Quebec (a month earlier in Virginia, later toward Thunder Bay), and leaves, buds and tender stems are best just before and as the flowers open. First-year rosettes are green and pickable from October until snow and again as soon as it melts, and they are the mildest. By June the stalks are tough and bitter and the pods are forming; the ripe black seeds can be gathered in July and August for a mustard.",
  "partsUsed": "Leaves (raw in small amounts, better cooked), flower buds and flowering tops (like a bitter broccoli raab), tender stems, the white taproot (grated raw like a mild horseradish) and the ripe seeds (ground as mustard). Chop the greens and let them sit a few minutes, or blanch them, before eating in quantity. Older leaves turn very bitter.",
  "poisonous": "Garlic mustard releases hydrogen cyanide when its cells are crushed, the same defence found in cassava and lima beans, though at lower levels. Chopping lets most of it escape within minutes, and soaking or cooking brings it down to negligible amounts. Raw garlic mustard is for a leaf or two in a salad now and then, not a daily raw pesto.",
  "moreLookalikes": "Toothworts (Cardamine) and sweet cicely bloom in the same woods in the same weeks with white flowers; toothwort leaves are deeply divided or three-parted and sweet cicely’s are ferny, and neither smells of garlic (sweet cicely smells of anise). White avens has three-parted basal leaves and hooked seed heads. Young stinging nettle is sometimes mistaken for a leafy garlic mustard stalk — nettle has opposite leaves and stinging hairs, garlic mustard has alternate leaves and no hairs to speak of. The garlic smell when a leaf is crushed settles every one of these.",
  "faqs": [
   {
    "q": "Is garlic mustard edible?",
    "a": "Yes, once you have confirmed the garlic smell. The young leaves, flower buds, stems, roots and seeds are all eaten, and it was carried to North America as a food plant. It is strongest and bitterest raw, so most people chop it and cook it, which also drives off the cyanide-releasing compounds it carries. Because it is a damaging invader, pulling and eating as much as you can is a kindness to the woods."
   },
   {
    "q": "How do you identify garlic mustard?",
    "a": "Crush a leaf: it smells of garlic, and no look-alike does. First-year plants are a low rosette of kidney-shaped leaves with scalloped edges; second-year plants send up a stalk 30–100 cm (1–3 ft) tall with triangular, coarsely toothed leaves, clusters of small white four-petalled flowers in spring and thin upright seed pods afterwards. Pull one and the taproot is white with a distinct S-bend at the top."
   },
   {
    "q": "Can you eat garlic mustard raw?",
    "a": "In small amounts, occasionally. Raw garlic mustard releases hydrogen cyanide when chewed — less than cassava or lima beans, but real. Chopping it and letting it sit a few minutes releases most of the gas; blanching or cooking takes care of the rest. A few leaves in a salad are fine; a big raw pesto every day is not."
   },
   {
    "q": "When is the best time to pick garlic mustard?",
    "a": "Early spring, as the flower stalks rise and before they open — April and May in the Great Lakes and St. Lawrence country — and the first-year rosettes in late fall and very early spring, when they are mildest. The plant turns bitter and stringy once it is in full flower and seed in June."
   },
   {
    "q": "What looks like garlic mustard?",
    "a": "Violets, ground ivy (creeping Charlie), henbit and young nettle can all pass for a first-year rosette, and toothwort and sweet cicely share its white spring flowers. None of them smells of garlic. Ground ivy and henbit have square stems and opposite leaves; violet leaves are pointed with finer teeth; nettle stings; toothwort and sweet cicely have divided leaves."
   },
   {
    "q": "Is garlic mustard safe for kids to pick?",
    "a": "It is one of the better plants for children to learn, because the test is a smell, not a judgement call, and pulling it does the forest a favour. Teach them to crush and sniff every plant before it goes in the bag, and to eat it cooked at home rather than raw by the handful. Keep small children away from sprayed trail edges and have everyone wash their hands — the roots carry soil."
   },
   {
    "q": "Why should I bag garlic mustard instead of composting it?",
    "a": "Because a pulled plant in flower can still ripen its seeds, and each plant makes hundreds that stay viable in the soil for at least seven years. State and provincial agencies ask that flowering or seeding plants go in sealed bags for the trash or be burned, never into the compost or the brush pile. Rosettes and pre-flowering plants can simply be eaten or left to dry on bare pavement."
   }
  ],
  "sources": [
   {
    "label": "Minnesota Wildflowers: Garlic mustard",
    "url": "https://www.minnesotawildflowers.info/flower/garlic-mustard"
   },
   {
    "label": "Wisconsin DNR: Garlic mustard (Alliaria petiolata)",
    "url": "https://dnr.wisconsin.gov/topic/Invasives/fact/GarlicMustard.html"
   },
   {
    "label": "University of Minnesota Extension: Garlic mustard (identification and look-alikes)",
    "url": "https://extension.umn.edu/identify-invasive-species/garlic-mustard"
   },
   {
    "label": "USDA Forest Service Fire Effects Information System: Alliaria petiolata",
    "url": "https://www.fs.usda.gov/database/feis/plants/forb/allpet/all.html"
   },
   {
    "label": "National Geographic: Invasive garlic mustard hurts native species (cyanide and edibility)",
    "url": "https://www.nationalgeographic.com/environment/article/garlic-mustard-toxic-invader-power-waning-edible-cyanide"
   },
   {
    "label": "VASCAN (Database of Vascular Plants of Canada): Alliaria petiolata",
    "url": "https://data.canadensys.net/vascan/name/Alliaria%20petiolata"
   }
  ]
 },
 "red-clover": {
  "otherNames": "Purple clover, meadow clover, trèfle rouge (Quebec). White clover (Trifolium repens) and alsike clover (T. hybridum) are eaten the same way.",
  "family": "Fabaceae, the pea and bean family (which also includes alfalfa, vetches, lupines and black locust).",
  "range": "Native to Europe and western Asia and sown across North America as hay and pasture since colonial times; now naturalised in every province and territory and essentially every state, from Yukon and interior Alaska roadsides to Georgia, and in the upland pastures of Hawaii. It thins out in the hot, wet Florida peninsula and the low deserts, where it only persists under irrigation. Vermont made it the state flower.",
  "whenToPick": "Flowers from late May into September in the middle of its range, with the heaviest flush in June and July and a second one after hay fields are cut; a month earlier in the mid-Atlantic, into October on the Pacific coast, and July and August in the north. Pick heads that are fully coloured, firm and springy, in the morning after the dew has dried. Young leaves are best in spring before the plant flowers.",
  "partsUsed": "Flower heads, fresh (pulled apart over salads and into fritters) or dried for tea and infused honey; young leaves and shoots, briefly cooked, as they are tough and hard to digest raw; the dried heads and seed pods have been ground into flour in lean times. Brown, dried-on-the-plant heads have no flavour and can carry mould. The stems are not eaten.",
  "poisonous": "Nothing acutely poisonous, but red clover is rich in isoflavones that act weakly like estrogen, which is why herbal references and the U.S. National Center for Complementary and Integrative Health caution against it in pregnancy and breastfeeding, and why people on blood thinners or with hormone-sensitive conditions are told to avoid concentrated preparations. A tea or a few flowers is a different thing from a daily supplement, but the cautions are the tradition. Eaten in quantity, the flowers are filling and poorly digested. Livestock problems — bloat on lush pasture, the drooling ‘slobbers’ caused by a black-patch fungus (Rhizoctonia leguminicola) on red clover hay in hot humid weather, and bleeding from mouldy sweet clover (Melilotus, a different plant) — are farm matters, not foraging ones; just do not pick mouldy or blackened plants.",
  "moreLookalikes": "Alsike clover (Trifolium hybridum) has pink-and-white heads on a stalk above the leaves and leaflets without the chevron; it is edible. White clover (T. repens) creeps, with white heads on long leafless stalks; edible. Rabbit-foot clover has soft, fuzzy grey-pink heads; harmless. Bird’s-foot trefoil carries yellow pea flowers and five leaflets. Red clover’s tell is the pair of leaves tucked directly under each pink head, and the pale V on every leaflet.",
  "faqs": [
   {
    "q": "Is red clover edible?",
    "a": "Yes, once identified with certainty: the pink flower heads are the part most people use, fresh in salads and fritters or dried for tea, and the young leaves can be cooked. It is not a bulk vegetable — the flowers are filling and hard to digest in quantity, and tradition cautions against it in pregnancy and alongside blood thinners."
   },
   {
    "q": "How do you identify red clover?",
    "a": "Three oval leaflets, each with a pale V-shaped chevron across its middle, on softly hairy stems 15–60 cm (6–24 in) tall; and round to egg-shaped pink-purple heads 2–3 cm (about 1 in) across, made of dozens of small pea-shaped flowers, each head sitting right on top of a pair of leaves. White clover creeps and holds its white heads on bare stalks; crown vetch has ladders of many small leaflets."
   },
   {
    "q": "When do you pick red clover flowers?",
    "a": "From late May through September in southern Canada and the northern US, with the biggest flush in June and July and another after fields are mown. Pick heads that are fully pink, firm and fresh — never brown or papery ones, which have lost their flavour and may be mouldy — in the morning once the dew has dried."
   },
   {
    "q": "What looks like red clover and is dangerous?",
    "a": "Crown vetch is the one to learn: it grows on the same road banks with pink clover-like flower heads, but its leaves are made of 11 or more small leaflets in pairs along a central stalk, never three, and it is not a food plant. True vetches have tendrils and flowers in loose spikes. The three-leaflet, chevron-marked leaf is red clover’s signature."
   },
   {
    "q": "Is red clover safe during pregnancy?",
    "a": "The usual advice is no. Red clover contains isoflavones that act weakly like estrogen, and the National Center for Complementary and Integrative Health notes that red clover preparations may be unsafe in pregnancy and while breastfeeding. Herbal references also advise against it for anyone on blood-thinning medication or with a hormone-sensitive condition. A single flower in a salad is not a supplement, but if in doubt, leave it."
   },
   {
    "q": "Can children eat clover from the lawn?",
    "a": "Clover flowers from an unsprayed lawn are a safe first forage for children — pull the little florets out and suck the nectar from the base, the way generations have. Teach them the three leaflets with the pale V, and to leave the brown heads and the ones the bees are working. Skip lawns that are treated, and anywhere dogs are walked."
   },
   {
    "q": "What is the difference between red clover and white clover?",
    "a": "Red clover stands up on hairy stems with pink-purple heads sitting directly above a pair of leaves and leaflets marked with a pale chevron. White clover creeps along the ground on runners, with white (sometimes pink-tinged) heads on long bare stalks and leaflets that may or may not carry a chevron. Both are eaten the same way."
   }
  ],
  "sources": [
   {
    "label": "Minnesota Wildflowers: Red clover",
    "url": "https://www.minnesotawildflowers.info/flower/red-clover"
   },
   {
    "label": "NC State Extension: Trifolium pratense",
    "url": "https://plants.ces.ncsu.edu/plants/trifolium-pratense"
   },
   {
    "label": "USDA NRCS Plant Guide: Red clover",
    "url": "https://plants.sc.egov.usda.gov/DocumentLibrary/plantguide/pdf/pg_trpr2.pdf"
   },
   {
    "label": "National Center for Complementary and Integrative Health: Red clover",
    "url": "https://www.nccih.nih.gov/health/red-clover"
   },
   {
    "label": "Ohio State University Extension: Blackpatch, forage legumes and slaframine intoxication",
    "url": "https://agcrops.osu.edu/newsletter/corn-newsletter/24-2021/blackpatch-forage-legumes-and-slaframine-intoxication"
   },
   {
    "label": "Ohio State Weed Guide: Crownvetch (Securigera varia)",
    "url": "https://weedguide.cfaes.osu.edu/singlerecord.asp?id=31"
   }
  ]
 },
 "chicory": {
  "otherNames": "Blue sailors, succory, coffeeweed, chicorée sauvage (Quebec). Belgian endive and radicchio are cultivated forms of the same species.",
  "family": "Asteraceae, the daisy family (which also includes dandelion, lettuce, sunflower and ragweed).",
  "range": "A Eurasian perennial, introduced as a root crop and forage and now naturalised across southern Canada from the Maritimes to British Columbia and in nearly every state. It is thickest on the gravel shoulders of the Great Lakes and St. Lawrence country, the Northeast, the Midwest, the Front Range of Colorado, the Great Basin valleys and California’s Central Valley. It is sparse in the boreal forest, Alaska, the hot low deserts, the Gulf coast and the Florida peninsula, and not established in Hawaii. Colorado lists it as a noxious weed.",
  "whenToPick": "Two seasons. Leaves: the rosette in March, April and early May before the flower stalk rises, when they are merely bitter rather than punishing, and again from new growth in October (in Texas and the South it is a cool-weather green of winter and early spring). Roots: October and November after the tops have died back and the root has stored its starch, or March and April before the stalk rises; a first-year rosette with no old stalk beside it gives the fattest, least woody root. The blue flowers run from late June to October and can be picked any morning they are open.",
  "partsUsed": "The taproot, scrubbed, chopped, roasted slowly until dark brown and brittle, then ground and brewed alone or blended with coffee; young rosette leaves, raw in small amounts or boiled in a change of water; the flowers, raw or pickled; and the blanched inner leaves if a root is dug and forced in the dark, which is how Belgian endive is made. Stalk leaves and old rosette leaves are too bitter and tough to bother with.",
  "poisonous": "Nothing poisonous in the plant itself, and chicory root has been drunk for centuries. It belongs to the daisy family, so people allergic to ragweed, chamomile or lettuce can react to it, and the milky sap can irritate sensitive skin. Its real hazard is where it grows: roadside roots sit in soil that collects road salt, exhaust metals and herbicide.",
  "moreLookalikes": "Dandelion rosettes have hairless, deeply toothed leaves with a single hollow flower stalk and no branching; chicory’s rosette leaves are rough-hairy on the underside, often with a reddish midrib, and its flower stem is stiff, branched and leafy. Wild lettuce (Lactuca) can carry pale blue flowers but they are small, under 1.5 cm (½ in), in an open panicle; its leaves often have a prickly midrib. Sow thistle and cat’s ear are yellow-flowered. None of these is dangerous — all are bitter daisy-family greens — but only chicory has the big sky-blue morning flowers and the coffee root.",
  "faqs": [
   {
    "q": "Is wild chicory edible?",
    "a": "Yes, once identified with certainty — it is the same species as Belgian endive and radicchio. The roasted root is the famous coffee stretcher of New Orleans, and the young rosette leaves are a bitter spring green. The only cautions are a daisy-family allergy and the roadside soil it loves, so dig well away from traffic."
   },
   {
    "q": "How do you identify chicory?",
    "a": "In flower it is unmistakable: sky-blue flowers 3–4 cm (1–1½ in) across with square-ended, finely toothed petals, scattered along a stiff, branched, nearly leafless stem up to 1.5 m (5 ft), opening in the morning and closed by early afternoon. Before flowering it is a dandelion-like rosette with a deep taproot, bitter milky sap, and leaves that are rough-hairy underneath."
   },
   {
    "q": "When do you dig chicory root?",
    "a": "In autumn after the tops die back — October and November in southern Ontario, Quebec and the Great Lakes states — or in early spring before the flower stalk starts up. Choose first-year rosettes with no dead stalk beside them; the roots of old flowering plants are woody. Dig deep: the taproot snaps easily and the top third is the best part."
   },
   {
    "q": "How do you make chicory coffee?",
    "a": "Scrub the roots, slice them thin, and roast them in a moderate oven, 175–200 °C (350–400 °F), until they are dark brown all the way through and snap cleanly — usually an hour or more, stirring now and then. Grind and brew like coffee, about a tablespoon per cup, alone or mixed half and half with ground coffee. It is caffeine-free with a roasted, slightly sweet bitterness."
   },
   {
    "q": "What looks like chicory?",
    "a": "Before it flowers, dandelion and wild lettuce rosettes: dandelion leaves are hairless with one hollow flower stalk, and wild lettuce has small pale flowers and often a prickly midrib. Both are bitter and harmless. Once the big blue flowers open on a branched stiff stem, nothing else in a Canadian or American ditch looks like chicory."
   },
   {
    "q": "Why do chicory flowers close in the afternoon?",
    "a": "Each flower lasts a single day and opens with the morning light, closing by midday or early afternoon in hot sun — which is why a roadside that was blue on the way to work is bare green on the way home. On cool, cloudy days they stay open longer. If you want to photograph or pick the flowers, go before noon."
   },
   {
    "q": "Is chicory safe for kids to pick?",
    "a": "The plant is safe once identified, but its favourite spots are not: chicory grows on road shoulders, gravel lots and railway edges. Let children pick the morning flowers from a field or an unsprayed yard, and leave the digging of roots to an adult who can get well back from traffic and wash the soil off properly."
   }
  ],
  "sources": [
   {
    "label": "Minnesota Wildflowers: Chicory",
    "url": "https://minnesotawildflowers.info/flower/chicory"
   },
   {
    "label": "Illinois Wildflowers: Common chicory",
    "url": "https://illinoiswildflowers.info/weeds/plants/chicory.htm"
   },
   {
    "label": "Wisconsin Horticulture (UW–Madison Extension): Chicory, Cichorium intybus",
    "url": "https://hort.extension.wisc.edu/articles/chicory-cichorium-intybus/"
   },
   {
    "label": "Utah State University Extension Range Plants: Chicory",
    "url": "https://extension.usu.edu/rangeplants/forbs-herbaceous/chicory"
   },
   {
    "label": "Hawaii-Pacific Weed Risk Assessment (Plant Pono): Cichorium intybus",
    "url": "https://plantpono.org/hpwra/cichorium-intybus/"
   },
   {
    "label": "VASCAN: Cichorium intybus",
    "url": "https://data.canadensys.net/vascan/name/Cichorium%20intybus"
   }
  ]
 },
 "wild-bergamot": {
  "otherNames": "Bee balm, horsemint, purple bergamot, monarde fistuleuse (Quebec). The western form with smaller leaves is var. menthifolia. Scarlet bee balm (Monarda didyma, Oswego tea) is the red garden cousin.",
  "family": "Lamiaceae, the mint family (which also includes oregano, thyme, basil and ground ivy).",
  "range": "Native across most of the continent: from Quebec and New Brunswick west through southern Ontario, the Prairie provinces and the Peace country of BC and the Northwest Territories, and south through New England, the Great Lakes, the Appalachians and the whole Great Plains to Georgia, Texas, Arizona and Idaho. It is a prairie and dry-meadow plant at heart and is absent from the Pacific coast, California, Florida and Hawaii except as a garden escape. In the Maritimes and Maine it is uncommon in the wild and most often met as a garden plant gone over the fence.",
  "whenToPick": "Leaves from June until the plant flowers, when they are most aromatic and least coarse; flowers in July and August in the Great Lakes and Prairie country (late June in the Ohio valley, August in the north and at altitude). Pick on a dry morning once the dew has lifted, and dry the leaves and flower heads in the shade, where they keep their scent for a year. The leaves turn mildewy and tough by late August in most years.",
  "partsUsed": "Leaves, fresh or dried, as tea and as an oregano or thyme substitute in savoury cooking; flower heads, fresh, pulled into individual florets over salads, or dried whole for tea; flowering tops hung in bunches to dry. Stems and roots are not used. The flavour is strong — a pinch, not a handful.",
  "poisonous": "Nothing poisonous, but it is a potent herb: its oil carries the same compounds that give oregano and thyme their bite, and a strong brew is harsh. People with a mint-family or oregano sensitivity can react. Tradition keeps it as a seasoning and a tea, and there is no reason to eat it as a bulk green.",
  "moreLookalikes": "Spotted bee balm (Monarda punctata) has yellow, purple-spotted flowers stacked in tiers above showy pink bracts and grows in sand; it is used as a tea too. Lemon bee balm (M. citriodora) of the southern Plains is an annual with lavender tiers and a lemon smell. Wild basil (Clinopodium vulgare) is smaller with pinker, bristly-bracted whorls and a milder smell; harmless. Nothing dangerous shares the combination of square stem, opposite oregano-scented leaves and a single shaggy lavender head.",
  "faqs": [
   {
    "q": "Is wild bergamot edible?",
    "a": "Yes, once identified with certainty: the leaves and flowers are a traditional tea and a strong oregano-like seasoning, fresh or dried. It is a herb rather than a vegetable — a pinch in a dish or a few leaves in a pot of tea. Its one firm identifier is the smell: rub a leaf and it should smell like oregano and thyme."
   },
   {
    "q": "How do you identify wild bergamot?",
    "a": "A square, usually hairy stem 60–120 cm (2–4 ft) tall; opposite, toothed, lance-shaped leaves that smell strongly of oregano when rubbed; and, in July and August, a single shaggy, rounded head of lavender-pink tubular flowers 3–5 cm (1–2 in) across, each flower two-lipped with the stamens poking out, above a collar of pale, often pink-tinged bracts. It grows in dry sunny ground, often in drifts."
   },
   {
    "q": "What is the difference between wild bergamot and bee balm?",
    "a": "Both are bee balms. Wild bergamot (Monarda fistulosa) is the lavender-flowered native of dry prairies and road cuts across the continent; scarlet bee balm (M. didyma), the one in most gardens, has bright red flowers and red-tinged bracts and grows wild only in moist eastern woods and streamsides. Both are used the same way; the red one tastes more of Earl Grey and the lavender one more of oregano."
   },
   {
    "q": "When do you harvest wild bergamot?",
    "a": "Leaves from June until bloom, when they are richest in oil and still tender; flowers at the height of bloom in July and August in southern Canada and the northern US, earlier to the south. Pick on a dry morning, and dry bunches in the shade — they keep their scent and colour for a year."
   },
   {
    "q": "How did Indigenous peoples use wild bergamot?",
    "a": "It is a well-documented medicine plant across the Plains and Great Lakes. Blackfoot people made poultices of the leaves for skin and a tea for sore throats; the Lakota brewed the flower heads as a tea for colds; the Ojibwe, Menominee and Ho-Chunk used it medicinally; and the Oneida honour it as the sixth medicine given by the Creator. Those are traditions, not prescriptions — and a reason to pick lightly and never from a reserve or a restoration planting."
   },
   {
    "q": "Is wild bergamot safe for children?",
    "a": "Yes as a plant to touch and smell — crushing a leaf and guessing ‘oregano!’ is a good game — and as a mild tea. It is strongly flavoured, so children will not eat much of it. Keep them from pulling up whole plants: the flower heads feed bumblebees and hummingbird moths, and a patch takes years to build."
   }
  ],
  "sources": [
   {
    "label": "Minnesota Wildflowers: Wild bergamot",
    "url": "https://www.minnesotawildflowers.info/flower/wild-bergamot"
   },
   {
    "label": "Iowa State University Extension: Growing bee balm in the home garden",
    "url": "https://yardandgarden.extension.iastate.edu/how-to/growing-bee-balm-home-garden"
   },
   {
    "label": "The Herb Society of America blog: Cooking with Monarda",
    "url": "https://blog.herbsociety.org/?p=5959"
   },
   {
    "label": "Wikipedia: Monarda fistulosa (range and documented Indigenous uses)",
    "url": "https://en.wikipedia.org/wiki/Monarda_fistulosa"
   },
   {
    "label": "VASCAN: Monarda fistulosa",
    "url": "https://data.canadensys.net/vascan/name/Monarda%20fistulosa"
   }
  ]
 },
 "ground-ivy": {
  "otherNames": "Creeping Charlie, gill-over-the-ground, alehoof, run-away-robin, lierre terrestre (Quebec).",
  "family": "Lamiaceae, the mint family (which also includes henbit, dead-nettles, selfheal and wild mint).",
  "range": "A European perennial, carried over by settlers as a pot-herb and brewing plant and now one of the commonest lawn weeds of the continent: every province from Newfoundland to British Columbia, every state, and a foothold in Alaska. It is thickest in the moist East — the Maritimes, the St. Lawrence and Great Lakes lowlands, New England, the Ohio valley, the Southeast piedmont — and on the Pacific coast. It thins out on the dry Plains and in the mountain West, and is essentially absent from the Gulf coast, the Florida peninsula, the deserts and Hawaii.",
  "whenToPick": "Early spring, when the new leaves are small, bright and least bitter — March to May in the Great Lakes and St. Lawrence country, February in the mid-Atlantic — and again in September and October after the summer heat. It flowers in April and May; the flowering tops are the traditional tea and brewing harvest. By midsummer the leaves are tough and the smell harsh. It stays green under snow and can be picked in any mild spell of winter.",
  "partsUsed": "Young leaves and flowering tops: a few chopped into soup, stuffing or an omelette as a bitter aromatic herb, or dried for tea. Before hops reached England it bittered and cleared ale, which is where ‘alehoof’ and ‘gill’ (from the French guiller, to ferment) come from. Stems and roots are not used. It is a seasoning quantity, not a salad.",
  "poisonous": "Ground ivy is poisonous to horses that eat large amounts, fresh or in hay, with sweating, drooling, dilated pupils and laboured breathing; cases are rare because the plant tastes bitter, and rarely fatal. For people it contains volatile oils, including a small amount of pulegone, the compound that makes pennyroyal dangerous — the concentration in ground ivy is a small fraction of pennyroyal’s, but it is a reason to keep servings small and to leave it alone in pregnancy. Not a plant to juice or eat by the bowlful.",
  "moreLookalikes": "Henbit (Lamium amplexicaule) and purple dead-nettle (L. purpureum) are upright spring annuals of the same family with pink-purple flowers; henbit’s upper leaves clasp the stem and dead-nettle’s are triangular and purplish at the top, and both are edible. Common mallow has round scalloped leaves of a similar size but round stems, alternate leaves and no smell. First-year garlic mustard rosettes have kidney-shaped leaves too, on round stems, alternate, and smell of garlic. Violets have pointed heart-shaped leaves on round stalks and no smell. Only ground ivy combines creeping square stems that root at the nodes, opposite leaves and that sharp minty-skunky smell.",
  "faqs": [
   {
    "q": "Is creeping Charlie edible?",
    "a": "Yes, in small amounts, once identified by its creeping square stems, opposite scalloped leaves and sharp mint smell. The young leaves and flowering tops are a traditional bitter pot-herb and tea and were used to flavour ale before hops. It is not a bulk green: eat it as a seasoning, and skip it in pregnancy because of its volatile oils."
   },
   {
    "q": "How do you identify ground ivy?",
    "a": "Long trailing stems that are square in cross-section and root wherever a node touches soil; round to kidney-shaped leaves with scalloped edges, in opposite pairs on long stalks; small blue-violet two-lipped flowers in the leaf axils in April and May; and a strong, slightly skunky mint smell when you crush a leaf. Round-stemmed or scentless, it is something else."
   },
   {
    "q": "Is ground ivy poisonous to horses?",
    "a": "Yes, in quantity. Horses that eat a lot of ground ivy, fresh or in hay, can show sweating, heavy salivation, dilated pupils and laboured breathing. Poisoning is uncommon because the plant is bitter and horses avoid it when they have better forage, and it is rarely fatal, but it should be kept out of paddocks and hay fields."
   },
   {
    "q": "What looks like ground ivy?",
    "a": "Henbit and purple dead-nettle (both edible mints that stand upright rather than creep), common mallow (round stems, no smell, cheese-wheel fruits), young garlic mustard (round stems, garlic smell) and violets (pointed leaves, no smell). The square creeping stem and the mint smell settle it."
   },
   {
    "q": "When do you pick ground ivy?",
    "a": "Early spring, from the first thaw to the end of flowering in May, when the leaves are small and least bitter, and again in autumn after the heat breaks. It stays green all winter and can be picked in a mild January. Summer leaves are tough and harsh."
   },
   {
    "q": "Is creeping Charlie safe for children?",
    "a": "As a plant to find, crush and smell on a lawn walk, yes, and a leaf nibbled will do no harm. It is not something to let children graze on: it is bitter, strongly aromatic and best kept to a seasoning. Pick it from unsprayed ground — ground ivy is one of the most-sprayed lawn weeds in North America — and away from where dogs go."
   }
  ],
  "sources": [
   {
    "label": "Minnesota Wildflowers: Ground ivy",
    "url": "https://minnesotawildflowers.info/flower/ground-ivy"
   },
   {
    "label": "USDA NRCS: Ground ivy / creeping Charlie (identification, range, toxicity to horses)",
    "url": "https://www.nrcs.usda.gov/sites/default/files/2022-09/GroundIvy-CreepingCharlie.pdf"
   },
   {
    "label": "NC State Extension: Glechoma hederacea",
    "url": "https://plants.ces.ncsu.edu/plants/glechoma-hederacea/"
   },
   {
    "label": "Wikipedia: Glechoma hederacea (history of use, volatile oils)",
    "url": "https://en.wikipedia.org/wiki/Glechoma_hederacea"
   },
   {
    "label": "VASCAN: Glechoma hederacea",
    "url": "https://data.canadensys.net/vascan/name/Glechoma%20hederacea"
   }
  ]
 },
 "selfheal": {
  "otherNames": "Heal-all, all-heal, carpenter’s herb, woundwort, brunelle commune (Quebec). Two forms: the native var. lanceolata with narrower leaves, and the Eurasian var. vulgaris with broader egg-shaped leaves.",
  "family": "Lamiaceae, the mint family (which also includes ground ivy, wild mint and bugleweed).",
  "range": "Found across the whole temperate world. In North America the native lance-leaved form grows from Alaska and Yukon through every province south to Guatemala, and the European form has naturalised alongside it in lawns and trail edges everywhere people have settled — the Maritimes, the St. Lawrence and Great Lakes lowlands, the Northeast, the Appalachians, the Midwest, the Southeast and Gulf states, the Pacific coast and California, and the wetter uplands of Hawaii. It is scarce on the dry open Plains, in the deserts and in the Florida peninsula.",
  "whenToPick": "June to September in southern Canada and the northern US, when the purple flower heads are showing; late May in the mid-Atlantic and Pacific Northwest, and into October where autumns are mild. Pick the flowering tops with a few leaves while the heads still carry open flowers — once a head has gone brown and bristly its season is done. Young leaves can be gathered from April on, before the plant bolts.",
  "partsUsed": "Leaves and flowering tops, raw in salads when young, cooked as a mild pot-herb, or dried for the tea long used in European and Chinese herbal tradition (where the dried heads are xia ku cao). The flavour is mild and slightly bitter; a quick rinse or blanch takes the edge off. Roots are not used.",
  "poisonous": "No known toxicity, and no part of the plant is considered poisonous. The practical cautions are about where it grows — treated lawns, roadsides and dog runs — and about the usual mint-family sensitivities in a few people.",
  "moreLookalikes": "Field milkwort (Polygala sanguinea) makes a similar stubby pink-purple head but has alternate, narrow leaves on a round stem. Wild basil (Clinopodium vulgare) has fuzzy pink flower whorls at the top of the stem and a faint oregano smell. Henbit and dead-nettles flower in spring in whorls up the stem. None is dangerous, and none has selfheal’s tight, barrel-shaped head of overlapping fringed bracts on a square stem.",
  "faqs": [
   {
    "q": "Is selfheal edible?",
    "a": "Yes, once identified with certainty: the leaves and flowering tops are eaten raw when young, cooked as a mild green, or dried for tea. It has no known toxicity. Its flavour is bland and slightly bitter, so it is more of an addition to a salad or soup than a dish on its own."
   },
   {
    "q": "How do you identify heal-all?",
    "a": "A square stem, low and sprawling in mown lawns or upright to 30 cm (1 ft) in meadows; opposite oval to lance-shaped leaves with almost no teeth; and a short, stubby, club-shaped flower head 2–5 cm (1–2 in) long made of overlapping, fringed, often purple-tinged bracts, with purple hooded flowers emerging a few at a time. After flowering the brown bristly head stays on all winter."
   },
   {
    "q": "What looks like selfheal?",
    "a": "Bugleweed (Ajuga reptans), the garden ground cover, has glossy, often bronze leaves in a rosette and blue flowers in whorls up a leafy spike rather than in one tight bracted head; it is not a food plant. Field milkwort has a similar pink head but alternate leaves on a round stem. Other small mints share the square stem but not the barrel-shaped head."
   },
   {
    "q": "When do you harvest selfheal?",
    "a": "While it is in flower — June to September across most of its range, with young leaves available from April. Cut the flowering tops with a few leaves on a dry day and use them fresh or dry them in the shade. Leave the roots: it regrows within weeks and spreads by runners."
   },
   {
    "q": "Is selfheal native to North America?",
    "a": "Partly. The narrow-leaved form, var. lanceolata, is native from Alaska to Guatemala and is a genuine wildflower of open woods and streamsides. The broad-leaved var. vulgaris came from Europe and is the lawn weed. Botanists still argue over how to separate them, and they are used the same way."
   },
   {
    "q": "Is selfheal safe for kids?",
    "a": "Yes — it is one of the safer lawn plants for a child to learn, with nothing poisonous in it and a distinctive knobby head that is hard to confuse with anything else once seen. Teach them the square stem and the barrel of fringed bracts, pick from unsprayed grass, and wash what comes home."
   }
  ],
  "sources": [
   {
    "label": "Minnesota Wildflowers: Self-heal",
    "url": "https://minnesotawildflowers.info/flower/self-heal"
   },
   {
    "label": "Missouri Department of Conservation: Self-heal (heal-all)",
    "url": "https://mdc.mo.gov/discover-nature/field-guide/self-heal-heal-all"
   },
   {
    "label": "NC State Extension: Prunella vulgaris subsp. lanceolata",
    "url": "https://plants.ces.ncsu.edu/plants/prunella-vulgaris-subsp-lanceolata/"
   },
   {
    "label": "VASCAN: Prunella vulgaris",
    "url": "https://data.canadensys.net/vascan/name/Prunella%20vulgaris"
   }
  ]
 },
 "wild-mint": {
  "otherNames": "Canada mint, American wild mint, field mint, menthe du Canada (Quebec). Older books call it Mentha arvensis or M. arvensis var. canadensis; the Eurasian corn mint, M. arvensis proper, is a separate species that is occasionally naturalised.",
  "family": "Lamiaceae, the mint family (which also includes peppermint, spearmint, bugleweed and pennyroyal).",
  "range": "The only mint native to North America, and found across almost all of it: every province and territory from Newfoundland west, plus Yukon and the Northwest Territories, Alaska, New England and New York, the Great Lakes states, the Midwest, the Prairies, the Rockies, the Great Basin, the Pacific coast and California’s wetlands. It is a plant of the north and west; south of the Ohio valley it is scattered and confined to mountain streams, and it is absent from the Southeast lowlands, the Gulf coast, Florida, the low deserts and Hawaii.",
  "whenToPick": "June through September, with the strongest flavour just before and during flowering in July and August in the Great Lakes, St. Lawrence and Prairie country; a few weeks later in the boreal forest and the mountains, from late May on the Pacific coast and in the Ohio valley. Pick on a dry morning and use fresh, or dry it quickly in the shade. After hard frost the leaves blacken and are finished.",
  "partsUsed": "Leaves and flowering tops, fresh or dried: tea, mint sauce, jelly, iced drinks, with peas and potatoes, anywhere garden mint goes. Pinch the top few pairs of leaves and the plant branches and regrows. Roots and old woody stems are not used.",
  "poisonous": "Wild mint itself is as safe as garden mint, in the amounts anyone would use. The danger is the look-alike: the pennyroyals (American Hedeoma pulegioides and European Mentha pulegium) are rich in pulegone, and pennyroyal essential oil has caused liver failure and death at doses of a few teaspoons; pennyroyal tea has traditionally been used to bring on menstruation and must be avoided in pregnancy. Learn pennyroyal’s smaller size, tiny nearly toothless leaves and harsher, more pungent smell, and when in doubt do not brew it.",
  "moreLookalikes": "Spearmint and peppermint, escaped from gardens along the same streams, carry their flowers in a spike at the top of the stem rather than in whorls down the leaf axils; both are edible. Bugleweed and water horehound (Lycopus americanus, L. uniflorus) match wild mint’s wet habitat, square stem, opposite leaves and axillary flower whorls almost exactly, but their flowers are white with only two stamens and their crushed leaves have no mint smell; they are not eaten. Hedge-nettle (Stachys) and skullcap (Scutellaria) grow in the same ditches with square stems and no mint smell. The rule: no clean mint smell, no mint.",
  "faqs": [
   {
    "q": "Is wild mint edible?",
    "a": "Yes, once identified with certainty by its square stem, opposite toothed leaves, flowers in whorls at the leaf axils and strong clean mint smell. It is used exactly like garden mint — tea, sauce, jelly, drinks. The one plant to learn and avoid is pennyroyal, which smells minty but is smaller with tiny leaves and a harsher scent, and whose oil is dangerously toxic."
   },
   {
    "q": "How do you identify wild mint?",
    "a": "A square, usually hairy stem 20–60 cm (8–24 in) tall in wet ground; opposite, toothed, oval to lance-shaped leaves; small pink, lavender or white tubular flowers in tight rings around the stem at the leaf axils, never in a spike at the tip; and a strong, clean mint smell when a leaf is crushed. If the flowers crown the stem it is a spearmint or peppermint; if there is no mint smell it is a bugleweed or something else entirely."
   },
   {
    "q": "What looks like wild mint and is poisonous?",
    "a": "Pennyroyal. American pennyroyal is a slender annual under 40 cm (16 in) with small, nearly toothless leaves and tiny flowers in the leaf axils, and European pennyroyal creeps; both smell minty but harsher and more pungent. Pennyroyal oil has killed people at doses of a few teaspoons, and even the tea must be avoided in pregnancy. Bugleweed and water horehound look alike too but have no smell and white flowers; they are not dangerous, just not mint."
   },
   {
    "q": "When do you pick wild mint?",
    "a": "From June into September, best just before and during flowering in July and August across southern Canada and the northern US. Pick the top few pairs of leaves on a dry morning; the plant branches and gives you a second picking within weeks. Dry it in the shade and it keeps its flavour for a year."
   },
   {
    "q": "Where does wild mint grow?",
    "a": "In wet ground: lakeshores, riverbanks, beaver meadows, ditches, the damp low corner of a hayfield. You will often smell a patch before you see it, when you step on it along a shoreline. It is a northern and western plant — common across Canada, Alaska, the Great Lakes, the Prairies and the mountain West, scattered and rare south of the Ohio valley."
   },
   {
    "q": "Can children pick wild mint?",
    "a": "Yes, with an adult confirming the first plant of the patch. The smell test is one children do well, and mint tea they picked themselves is a good first forage. Teach them that a minty smell alone is not enough — it has to be the clean, familiar mint, on a plant with flowers in rings down the stem — and keep them from picking at the waterline below a farm or an outfall."
   }
  ],
  "sources": [
   {
    "label": "Minnesota Wildflowers: Wild mint",
    "url": "https://www.minnesotawildflowers.info/flower/wild-mint"
   },
   {
    "label": "Go Botany (Native Plant Trust): Mentha canadensis",
    "url": "https://gobotany.nativeplanttrust.org/species/mentha/canadensis/"
   },
   {
    "label": "Drugs.com professional monograph: Pennyroyal (pulegone toxicity)",
    "url": "https://www.drugs.com/npp/pennyroyal.html"
   },
   {
    "label": "VASCAN: Mentha canadensis",
    "url": "https://data.canadensys.net/vascan/name/Mentha%20canadensis"
   }
  ]
 },
 "goldenrod": {
  "otherNames": "Canada goldenrod, common goldenrod, verge d’or du Canada (Quebec). Tall goldenrod (Solidago altissima), which takes over in the South, and western Canada goldenrod (S. lepida) of the Rockies and Pacific Northwest are so close that many botanists have treated them as one species, and all three are used the same way.",
  "family": "Asteraceae, the daisy family (which also includes ragweed, chamomile, chicory and the toxic ragworts).",
  "range": "Native and abundant across the continent’s open country: from Newfoundland and Labrador west through Quebec, Ontario and the Prairies, in the boreal forest around Thunder Bay and Prince George, and through New England, the Great Lakes, the Appalachians, the Midwest and the Great Plains. South of the Ohio valley and along the Gulf coast the plant in the ditches is usually tall goldenrod; in the Rockies, interior BC, the Pacific Northwest and the Alaska panhandle it is western Canada goldenrod. Canada goldenrod itself is scarce in California, the low deserts and the Florida peninsula and absent from Hawaii.",
  "whenToPick": "Flowers from late July into October, peaking in late August and September in southern Canada and the northern US — a couple of weeks earlier in the Ohio valley, later on the Gulf coast. Pick the plumes when about half the flowers are open and the colour is bright; once they fade to tan and fluff they are done. Young leaves for cooking come from the new shoots in April and May.",
  "partsUsed": "The flowering tops, fresh or dried, steeped as tea; the flowers stripped from the stems for fritters, vinegar, cordial and infused honey; and the young spring leaves and shoot tips, cooked briefly as a green. The woody stems and roots are not used. Goldenrod honey, made by bees on these fields in September, is a harvest of its own.",
  "poisonous": "Nothing poisonous in goldenrod itself. It is a daisy-family plant, so people allergic to ragweed, chamomile, chrysanthemums or marigolds can react to the tea or the flowers on their skin. The serious danger is misidentification: tansy ragwort and the other ragworts and groundsels (Jacobaea, Senecio) bloom yellow at the same time and contain pyrrolizidine alkaloids that damage the liver cumulatively — a little at a time over weeks is as harmful as a lot at once. Keep goldenrod to a tea, and never brew anything with yellow daisy-like flowers and ragged lobed leaves.",
  "moreLookalikes": "Common ragweed (Ambrosia artemisiifolia) and giant ragweed grow in the same ditches and bloom in the same weeks, with spikes of small green flowers that nobody notices and leaves that are deeply divided and ferny (common) or three-lobed like a maple (giant); they shed the wind-borne pollen that causes late-summer hay fever, and they are not eaten. Tansy ragwort (Jacobaea vulgaris), a noxious weed of the Pacific Northwest and the Maritimes, stands 30–120 cm (1–4 ft) with ragged, deeply lobed leaves and flat-topped clusters of yellow daisies, each with about 13 distinct petals; every part is toxic and the flowers hold the most alkaloid. Common groundsel (Senecio vulgaris) is a small weed with petal-less yellow heads and lobed leaves, also toxic. Common tansy (Tanacetum vulgare) has flat clusters of yellow buttons over ferny leaves and a strong camphor smell; it contains thujone and is not a tea plant. Goldenrod’s tells are simple lance-shaped leaves, a plume rather than a flat cluster, and flowers so small no individual petals stand out.",
  "faqs": [
   {
    "q": "Is goldenrod edible?",
    "a": "Yes, once identified with certainty: the flowering tops make a mild tea, the flowers go into fritters, vinegar and cordial, and the young spring leaves can be cooked as a green. Keep it to those uses, and learn the toxic yellow look-alikes — tansy ragwort and the groundsels — before you pick, because they bloom in the same weeks."
   },
   {
    "q": "Does goldenrod cause hay fever?",
    "a": "No. Goldenrod pollen is heavy and sticky and is carried by bees and other insects; it does not blow on the wind in any amount that reaches your nose. The late-summer sneezing comes from ragweed, which flowers at the same time in the same ditches with inconspicuous green spikes and wind-borne pollen. Goldenrod gets the blame because it is the one you can see."
   },
   {
    "q": "How do you identify Canada goldenrod?",
    "a": "Stiff, unbranched stems 1–1.5 m (3–5 ft) tall in dense colonies, finely hairy in the upper half; alternate, lance-shaped, sharply toothed leaves with three strong veins and no basal rosette at flowering time; and from August a pyramidal plume of hundreds of tiny yellow flowers lined up along the upper side of arching branches. Tall goldenrod and western goldenrod are nearly identical and used the same way."
   },
   {
    "q": "What looks like goldenrod and is poisonous?",
    "a": "Tansy ragwort and the other ragworts and groundsels. They carry yellow daisy-like flowers with distinct petals — tansy ragwort’s have about 13 each — in flat-topped clusters over ragged, deeply lobed leaves, and they contain pyrrolizidine alkaloids that damage the liver over time. Common tansy, with yellow buttons over ferny leaves and a camphor smell, is not a tea plant either. Goldenrod’s flowers are too small to show petals, its leaves are simple and lance-shaped, and the head is a plume, not a flat cluster."
   },
   {
    "q": "When do you harvest goldenrod?",
    "a": "From late July to early October, at the peak of bloom in late August and September across southern Canada and the northern US, when about half the florets on a plume are open and the colour is bright. Snip the top third of a few stems from a large stand on a dry day and dry them hanging in the shade. Spring shoots for cooking are picked in April and May."
   },
   {
    "q": "What are the round lumps on goldenrod stems?",
    "a": "Galls — the plant’s response to an insect laying its egg inside the stem. The round ball gall is made by the goldenrod gall fly; a larva lives inside all winter and chickadees and downy woodpeckers peck them open for it. Cut one open in winter with a child and you will find a small white grub in a woody room. They do no harm to the plant you pick for tea."
   },
   {
    "q": "Is goldenrod safe for kids?",
    "a": "The plant is harmless to touch and a weak tea is fine for children, with the usual care for anyone with a ragweed or daisy allergy. The worry is the look-alikes: a child cannot be expected to tell goldenrod from ragwort, so an adult should pick, and the rule for small children is that nothing yellow goes in the mouth on a late-summer walk."
   }
  ],
  "sources": [
   {
    "label": "Minnesota Wildflowers: Canada goldenrod",
    "url": "https://www.minnesotawildflowers.info/flower/canada-goldenrod"
   },
   {
    "label": "USDA Forest Service Fire Effects Information System: Solidago canadensis",
    "url": "https://www.fs.usda.gov/database/feis/plants/forb/solcan/all.html"
   },
   {
    "label": "University of Vermont Extension: Goldenrod, a useful wildflower",
    "url": "https://www.uvm.edu/extension/news/goldenrod-useful-wildflower"
   },
   {
    "label": "University of Illinois Extension: Autumn allergies — don’t blame goldenrod",
    "url": "https://extension.illinois.edu/blogs/good-growing/2022-10-21-autumn-allergies-dont-blame-goldenrod"
   },
   {
    "label": "Washington State Noxious Weed Control Board: Tansy ragwort (Senecio jacobaea) written findings",
    "url": "https://www.nwcb.wa.gov/images/weeds/Senecio-jacobaea_1997.pdf"
   },
   {
    "label": "Washington State Noxious Weed Control Board: Common groundsel (PNW 466)",
    "url": "https://www.nwcb.wa.gov/images/weeds/common-groundsel-pnw466_King.pdf"
   }
  ]
 },
 "pineapple-weed": {
  "otherNames": "Wild chamomile, disc mayweed, rayless chamomile, matricaire odorante (Quebec). Older names: Matricaria matricarioides, Chamomilla suaveolens.",
  "family": "Asteraceae, the daisy family (which also includes true chamomile, the mayweeds, yarrow and ragweed).",
  "range": "Native to the Pacific Northwest and north-east Asia — botanists still disagree which side of the Bering Strait it started on — and spread along roads and railways across the rest of the continent in the 1800s and 1900s. It is now in every province and territory, Alaska, Yukon and the Northwest Territories, New England, the Great Lakes, the Appalachians, the Midwest, the Plains, the mountain West and California. A cool-season plant, it is scarce in the hot humid Southeast, the Gulf coast and Florida, nearly absent from the low deserts, and only an occasional stray in Hawaii.",
  "whenToPick": "May to August in southern Canada and the northern US, with the heads at their most fragrant in June and July; from April in the mid-Atlantic and the Pacific Northwest, and July and August in the Yukon and interior Alaska. It is an annual that keeps flowering on trampled ground all summer, so pick the plump green-yellow heads whenever they smell strongly of pineapple and leave the ones going brown. New seedlings often appear again in September.",
  "partsUsed": "The flower heads, fresh or dried, for tea, cordial, lemonade and syrup, or scattered fresh over fruit and ice cream; the young leaves can go in salads but taste mostly of green. Stems and roots are not used. Dry the heads on a screen out of the sun and they keep their scent for months.",
  "poisonous": "Nothing poisonous in pineapple weed, and it has been drunk as a tea for generations. As a daisy-family plant it can set off a reaction in people allergic to chamomile or ragweed, so take a sip before a cup. The risk lies in the ground it likes — gravel lots, driveways and road edges — and in the look-alike mayweed, whose sap blisters some people’s skin.",
  "moreLookalikes": "Stinking chamomile or mayweed (Anthemis cotula) grows on the same farm gateways and waste ground with the same ferny leaves, but it stands taller, carries white petals around a yellow dome, and smells rank and sour; its sap causes a rash and blisters in many people and it is not for tea. Scentless chamomile (Tripleurospermum inodorum), a noxious weed on the Prairies, is a bushy white daisy with no smell at all. German chamomile (Matricaria chamomilla), the tea plant, has white petals and a hollow receptacle, and smells sweet — it is edible and sometimes escapes. Dog fennel (Eupatorium capillifolium) of the South is a tall feathery plant with a balsam smell. The two tells together — no petals, and a pineapple smell when crushed — leave only pineapple weed.",
  "faqs": [
   {
    "q": "Is pineapple weed edible?",
    "a": "Yes, once identified with certainty — crush a head and it must smell of pineapple, and the head must have no petals. The flower heads make a tea close to chamomile, and go into lemonade, syrup and desserts. The only cautions are a chamomile or ragweed allergy and the dirty ground it grows on."
   },
   {
    "q": "How do you identify pineapple weed?",
    "a": "A low, hairless plant 5–30 cm (2–12 in) tall with finely divided, ferny leaves and cone- or dome-shaped yellow-green flower heads 5–10 mm (¼–⅓ in) across that have no petals at all — just the cone. Crush one between your fingers and it smells distinctly of pineapple. It grows on trampled, compacted ground: gravel, driveways, paths and farm gateways."
   },
   {
    "q": "What is the difference between pineapple weed and chamomile?",
    "a": "They are close cousins. German chamomile has white petals around its yellow cone and a sweet apple scent; pineapple weed has no petals and smells of pineapple. Both make a similar tea. The one to avoid is mayweed (stinking chamomile), which has white petals, a foul smell and sap that blisters skin."
   },
   {
    "q": "When do you pick pineapple weed?",
    "a": "From May through August across southern Canada and the northern US, best in June and July when the heads are plump and most fragrant; from April farther south, and in July and August in the far north. Pinch the heads off between finger and thumb, a few from each plant, and use them fresh or dry them on a screen in the shade."
   },
   {
    "q": "What looks like pineapple weed?",
    "a": "Mayweed, scentless chamomile and German chamomile all have the same ferny leaves and a yellow-centred head, but every one of them has white petals. Pineapple weed never does. Mayweed smells foul and can blister skin; scentless chamomile has no smell; German chamomile smells of apple and is a fine tea."
   },
   {
    "q": "Is pineapple weed safe for children to pick?",
    "a": "It is one of the best plants for children — low, common, unmistakable once they have smelled it, and nothing poisonous looks like it if they remember two rules: no petals, and it must smell of pineapple. Steer them off the driveway and the parking lot to a field edge or a quiet path, and let anyone with a chamomile allergy try a small sip of the tea first."
   }
  ],
  "sources": [
   {
    "label": "Minnesota Wildflowers: Pineapple-weed",
    "url": "https://minnesotawildflowers.info/flower/pineapple-weed"
   },
   {
    "label": "Eat The Weeds: Pineapple weed for your tea and salad (uses and look-alikes)",
    "url": "https://www.eattheweeds.com/matricaria-matricarioides-for-your-tea-salad-2"
   },
   {
    "label": "Wikipedia: Matricaria discoidea (origin and spread)",
    "url": "https://en.wikipedia.org/wiki/Matricaria_discoidea"
   },
   {
    "label": "VASCAN: Matricaria discoidea",
    "url": "https://data.canadensys.net/vascan/name/Matricaria%20discoidea"
   }
  ]
 },
 "common-mallow": {
  "otherNames": "Cheeseweed, cheeses, buttonweed, dwarf mallow, roundleaf mallow, mauve négligée (Quebec). Little mallow (Malva parviflora) of California and the Southwest, and round-leaved mallow (M. pusilla) of the Prairies, are used the same way.",
  "family": "Malvaceae, the mallow family (which also includes hollyhock, okra, hibiscus, cotton and the marsh mallow whose root gave the sweet its name).",
  "range": "A Eurasian annual or biennial that followed farming across the continent: introduced in every province from Newfoundland to British Columbia and the Northwest Territories and in nearly every state. It is most abundant in the drier, sunnier half — the Front Range of Colorado, the Great Basin, Utah, New Mexico, Nevada, the Prairies, the Pacific Northwest and California — and common in gardens and barnyards of southern Ontario, Quebec, New York, Pennsylvania and the Midwest. It is scarce in the humid Southeast, the Gulf coast and Florida, where little mallow and other species take over, and only occasional in the Maritimes and the boreal forest.",
  "whenToPick": "Leaves from May to October, best when young and before the summer heat toughens them — in mild climates it grows through the winter and spring leaves are picked in March. The ‘cheeses’, the green wheel-shaped fruits, come from July to September, and should be picked while still green, plump and tender, before the segments dry and separate. Mature seed for cooking is gathered when the wheels have dried brown in late summer and fall.",
  "partsUsed": "Young leaves, raw in salads or cooked as a mild green and soup thickener (they are mucilaginous, like okra, and give body to a broth); the green cheeses, eaten raw as a trail nibble, pickled like capers or added to stews; the flowers as a garnish; the mature seeds, cooked like a grain. The tough taproot and old stems are not eaten. Older leaves get stringy and hairy.",
  "poisonous": "Common mallow is not poisonous to people. It does pull nitrates out of rich soil and store them in its leaves, and mallow can accumulate nitrates on rich soil, and animals that graze little else but mallow for days develop a separate ‘staggers’ — which, for a forager, means picking young leaves in modest amounts from lean ground rather than the compost pile, the manure heap or a heavily fertilised bed, where any leafy green concentrates nitrate. Its one dangerous look-alike, creeping buttercup, is covered under look-alikes.",
  "moreLookalikes": "Creeping buttercup (Ranunculus repens) sprawls in the same damp lawn edges with leaves of a similar size, but its leaves are glossy, deeply cut into three toothed lobes and often pale-blotched, and its flowers are shiny yellow; fresh buttercup sap contains protoanemonin, which blisters the mouth and skin and inflames the gut, so it is never eaten raw. Ground ivy has round scalloped leaves of the same shape, but on square creeping stems with opposite leaves and a mint smell. Seedlings of garden geraniums and wild cranesbills (Geranium) have more deeply divided leaves and go on to make a long beaked fruit, never a cheese wheel. Marsh mallow (Althaea officinalis) is a tall velvety-leaved plant of salt marshes with bigger pink flowers; also edible. The notch where the leaf stalk meets the round leaf, the round stem and the wheel of segments settle common mallow.",
  "faqs": [
   {
    "q": "Is common mallow edible?",
    "a": "Yes, once identified with certainty — leaves, flowers, the green ‘cheese’ fruits and the mature seeds have all been eaten for centuries, and nothing in the plant is poisonous. The leaves are mild and a little slimy, like okra, which makes them a good soup thickener. Pick from lean ground rather than the manure pile, because mallow stores nitrates from rich soil."
   },
   {
    "q": "How do you identify common mallow?",
    "a": "A low sprawling plant from a tough taproot with round stems; round to kidney-shaped leaves 2–8 cm (1–3 in) across with five to seven shallow lobes, scalloped edges, soft hairs and a deep notch where the long stalk joins; small white to pale pink flowers with five notched petals and darker veins; and a flat, round fruit like a tiny wheel of cheese, split into a ring of a dozen or more wedge-shaped segments. The cheese wheel is the clincher."
   },
   {
    "q": "What looks like common mallow and is poisonous?",
    "a": "Creeping buttercup, which sprawls in the same damp lawn corners. Its leaves are glossy and deeply cut into three toothed lobes, often with pale blotches, and its flowers are shiny yellow. Fresh buttercup sap blisters the mouth and skin and irritates the stomach; it is never eaten raw. Mallow leaves are round, softly hairy and merely scalloped, and its flowers are white or pale pink."
   },
   {
    "q": "Can you eat the ‘cheeses’ on mallow?",
    "a": "Yes — the green, wheel-shaped fruits are the part children have nibbled for generations, with a mild nutty, slightly slimy bite. Pick them while they are still green and plump, from July to September, and eat them raw, pickle them like capers, or drop them into a stew. Once they dry brown the segments separate into seeds, which can be cooked like a grain."
   },
   {
    "q": "When do you pick mallow leaves?",
    "a": "From May to October, best in late spring before the leaves get large, hairy and stringy; in mild climates the plant grows through winter and March leaves are the tenderest of all. Take the young leaves and the growing tips, leave the taproot, and the plant keeps producing all season."
   },
   {
    "q": "Is common mallow safe for kids?",
    "a": "Yes — it is the classic children’s forage, the plant that gives ‘cheeses’ their name, and nothing in it is poisonous. Teach the notch at the leaf stalk, the round stem and the cheese wheel, and make sure they know the glossy, deeply cut leaf and yellow flower of buttercup, which grows beside it and should never go in the mouth. Pick away from sprayed lawns, dog walks and the manure pile."
   }
  ],
  "sources": [
   {
    "label": "Minnesota Wildflowers: Common mallow",
    "url": "https://minnesotawildflowers.info/flower/common-mallow"
   },
   {
    "label": "NC State Extension: Malva neglecta",
    "url": "https://plants.ces.ncsu.edu/plants/malva-neglecta/"
   },
   {
    "label": "University of Nevada, Reno Extension: Common mallow identification and management",
    "url": "https://extension.unr.edu/publication.aspx?PubID=3397"
   },
   {
    "label": "UC IPM: Little mallow / cheeseweed (nitrate accumulation)",
    "url": "https://ipm.ucanr.edu/PMG/WEEDS/little_mallow.html"
   },
   {
    "label": "Massey University Poisonous Plants: Dwarf mallow (Malva neglecta)",
    "url": "https://poisonousplants.massey.ac.nz/data/dwarf_mallow/dw_mallo.html"
   },
   {
    "label": "Cornell University Poisonous Plants: Ranunculin and protoanemonin (buttercups)",
    "url": "https://poisonousplants.ansci.cornell.edu/toxicagents/ranunculoside.html"
   },
   {
    "label": "VASCAN: Malva neglecta",
    "url": "https://data.canadensys.net/vascan/name/Malva%20neglecta"
   }
  ]
 },
 "wild-carrot": {
  "otherNames": "Queen Anne’s lace, bird’s nest, carotte sauvage (Quebec). The same species as the garden carrot, which was bred from it.",
  "family": "Apiaceae, the carrot family (which also includes parsnip, celery, dill — and poison hemlock and water hemlock).",
  "range": "Introduced from Europe and now a roadside weed in every province from British Columbia to Newfoundland and in nearly every state, thickest in southern Ontario and Quebec, the Great Lakes states, the northeast, the mid-south and the Pacific coast. It thins out on the northern prairies and in the far north, and is scarce in Florida and the deserts. Alaska and the territories have almost none.",
  "whenToPick": "Roots from first-year plants only: a rosette of ferny leaves with no flower stalk. Dig them in September–November, once the tops die back, or in March–April before the plant bolts; by the time a stalk rises the root is woody and useless. Flowers for fritters come June–September. The rosette season runs a few weeks later going north and uphill.",
  "partsUsed": "The thin white taproot, scrubbed and cooked — it is tougher and more fibrous than a garden carrot and best in stock, soup or stew. The flower umbels can be dipped in batter. The seeds have a long folk reputation as a contraceptive and are best left alone in pregnancy.",
  "poisonous": "Wild carrot itself is edible once identified with certainty, but its sap can cause a mild phototoxic rash on skin in sunlight, and the seeds carry that folk reputation around pregnancy. The real danger is misidentification: poison hemlock (coniine, respiratory paralysis) and water hemlock (cicutoxin, violent seizures within an hour) grow in the same regions and kill people every year. A single bite of water hemlock root can be fatal.",
  "moreLookalikes": "Fool’s parsley (Aethusa cynapium): a hairless European weed of gardens and waste ground, 30–60 cm (1–2 ft), with shiny ferny leaves, no bracts under the main umbel, no purple centre floret, and three or four long, narrow bracts hanging down beneath each little umbellet like a beard. Poisonous. Wild parsnip (Pastinaca sativa): yellow flowers, a grooved hairless stem and sap that burns badly in sunlight; its root is edible but the plant is not worth the burns. Caraway, yarrow and the many small white umbels of ditches: none has the hairy stem, carrot smell and bird’s-nest seed head together. Water parsnip (Sium suave): once-divided leaves with narrow toothed leaflets, wet ground, and often confused with water hemlock — leave the whole wet-ground group alone.",
  "faqs": [
   {
    "q": "How do you tell wild carrot from poison hemlock?",
    "a": "Feel and smell it. Wild carrot has a hairy, ribbed stem and leaf stalks and smells of carrot when crushed; poison hemlock is hairless and waxy with purple blotches on the stem, smells musty like mouse urine, and stands 1.5–3 m (5–10 ft) tall. Wild carrot also has a whorl of forked green bracts under the flower head and usually one dark purple floret in the middle. Hemlock has neither."
   },
   {
    "q": "What is water hemlock and how do I avoid it?",
    "a": "Water hemlock (Cicuta maculata, and C. douglasii in the west) is often called the most poisonous plant in North America. It grows in wet ground — ditches, pond edges, marshes — with a smooth, often purple-streaked stem, leaflets whose veins end in the notches between the teeth, and a bundle of fleshy roots whose base is divided into chambers that ooze a yellowish oily liquid. Never dig a wild root from wet ground, and never cut into a root to check: the sap is the poison."
   },
   {
    "q": "Can you eat the root of Queen Anne’s lace?",
    "a": "Yes, from first-year plants, once you are certain of the hairy stem and carrot smell. It is a thin, white, rather woody carrot, best cooked in soup or stock. Second-year roots, under a flowering plant, are tough and taste of little."
   },
   {
    "q": "When do you dig wild carrot?",
    "a": "Fall and early spring, from rosettes that have not yet sent up a stalk. In southern Ontario and Quebec that means September to November and again in April; the window is earlier in the south and later in the north. Flowers for fritters come in June–September."
   },
   {
    "q": "Is Queen Anne’s lace safe for children to pick?",
    "a": "Picking the flowers is fine for a child who can tell the hairy stem, but this is not a plant to let children identify alone, because poison hemlock grows in the same fields and a mouthful can kill. Teach the rule out loud: hairy stem and carrot smell, or leave it. Keep the sap off bare skin on sunny days — it can leave a rash."
   },
   {
    "q": "Is wild carrot native to North America?",
    "a": "No. It came from Europe and has spread across the continent; Minnesota and several other states list it as a noxious weed. Picking it does no harm to native plants, though the roots are not worth much effort."
   }
  ],
  "sources": [
   {
    "label": "Ontario weed identification guide: Wild carrot",
    "url": "https://www.ontario.ca/document/weed-identification-guide-ontario-crops/wild-carrot"
   },
   {
    "label": "Minnesota Wildflowers: Queen Anne’s lace",
    "url": "https://www.minnesotawildflowers.info/flower/queen-annes-lace"
   },
   {
    "label": "Iowa State University Extension: Wild carrot",
    "url": "https://crops.extension.iastate.edu/encyclopedia/wild-carrot"
   },
   {
    "label": "Cornell Weed ID: Poison hemlock",
    "url": "https://blogs.cornell.edu/weedid/poison-hemlock"
   },
   {
    "label": "USDA Forest Service: Water hemlock (Cicuta maculata)",
    "url": "https://www.fs.usda.gov/wildflowers/plant-of-the-week/cicuta_maculata.shtml"
   },
   {
    "label": "Minnesota Wildflowers: Fool’s parsley",
    "url": "https://www.minnesotawildflowers.info/flower/fools-parsley"
   }
  ]
 },
 "cow-parsnip": {
  "otherNames": "Indian celery, Indian rhubarb, pushki (Alaska), berce laineuse (Quebec). Older books call it Heracleum lanatum.",
  "family": "Apiaceae, the carrot family (which also includes giant hogweed, wild parsnip and the hemlocks).",
  "range": "Native across Canada from Newfoundland to British Columbia and north into the Yukon and Alaska, and through the northern and western United States — the Great Lakes, New England, the Appalachians, the Rockies and the whole Pacific coast down through California. Absent from the Deep South: Texas, Louisiana, Mississippi, Alabama, Florida, Arkansas, Oklahoma and South Carolina.",
  "whenToPick": "Spring, before the flowers open: roughly April in the Pacific Northwest and the mid-Atlantic, May into June in Quebec, Ontario and the mountains, later still in Alaska and at altitude. Pick leaf stalks while the leaf is still unfolding and bud stalks while the flower head is a tight green knob in its sheath. Once the umbel opens, the stalks turn fibrous and strong-tasting.",
  "partsUsed": "Young leaf stalks and the budding flower stalks, peeled of every bit of outer skin and strings, eaten raw or cooked; Indigenous cooks ate them with seal oil or oolichan grease and also roasted or boiled them. The leaves, flowers, mature stems, seeds and roots are not eaten. Peeling is not optional — the skin carries the burning compounds.",
  "poisonous": "The sap of every above-ground part contains furanocoumarins. On skin that then meets sunlight it causes phytophotodermatitis: redness, then painful blisters within 24–48 hours, and brown marks that can last for months. Unpeeled stalks blister the mouth. Giant hogweed does the same thing far worse. Wash with soap and cold water at once if sap touches skin, keep the area covered for 48 hours, and never let sap near the eyes.",
  "moreLookalikes": "Wild parsnip (Pastinaca sativa): yellow flowers, a grooved hairless stem, 1–1.5 m (3–5 ft), and sap that burns as badly as cow parsnip’s; an introduced weed of roadsides. Angelica (Angelica atropurpurea): smooth purple stem with no hairs, round ball-shaped flower heads, and leaves divided into many separate leaflets rather than three big maple-like lobes. Poison hemlock: see the entry — hairless, purple-blotched, fern-leaved, musty. Water hemlock: hairless, purple-streaked, leaflets with veins ending in the notches, chambered root, always in wet ground. Both hemlocks are deadly; cow parsnip’s huge three-part leaves and hairy, blotch-free stem rule them out.",
  "faqs": [
   {
    "q": "How do you tell cow parsnip from giant hogweed?",
    "a": "Size, blotches and bristles. Cow parsnip is 1–3 m (3–10 ft) with a stem 2.5–5 cm (1–2 in) thick, soft-hairy, ridged and green with no purple spots, and flower heads up to 30 cm (12 in) across with 15–30 rays. Giant hogweed is 3–5 m (10–16 ft), its stem 5–10 cm (2–4 in) thick with purple blotches and coarse white bristles, leaves up to 1.5 m (5 ft) across and flower heads up to 75 cm (2.5 ft) with 50 or more rays. Giant hogweed is established mainly in southern Ontario, parts of Quebec and Atlantic Canada, BC’s south coast, and in New York, Pennsylvania, Michigan, Maine, New England, Washington and Oregon."
   },
   {
    "q": "Is cow parsnip poisonous to touch?",
    "a": "The sap is. Handle it in gloves and long sleeves, especially on sunny days: sap on skin plus sunlight causes blisters within a day or two and dark marks that last months. The reaction is milder than giant hogweed’s but real, and children with bare arms should not be cutting it."
   },
   {
    "q": "Can you eat cow parsnip?",
    "a": "Yes — the young leaf stalks and flower-bud stalks, picked before flowering and peeled completely, are a traditional spring food across the Northwest, eaten raw like celery or cooked. Everything depends on the peeling and on being certain it is cow parsnip rather than a hemlock. Leaves, mature stems, seeds and roots are not eaten."
   },
   {
    "q": "Which Indigenous peoples eat cow parsnip?",
    "a": "Many. Kuhnlein and Turner documented its use by more than thirty nations of northwestern North America, including the Tlingit, Haida, Tsimshian, Kwakwaka’wakw, Nuu-chah-nulth, Coast Salish and interior peoples such as the Nlaka’pamux and Blackfoot. Leaf stalks and bud stalks were peeled and eaten fresh in spring, often with oolichan grease, and traditional knowledge was explicit that all the outer skin had to come off to avoid a burned mouth."
   },
   {
    "q": "When is cow parsnip season?",
    "a": "Spring, for a few weeks while the stalks are young and the flower head is still a closed green knob — April on the Pacific coast and in the mid-Atlantic, May to June in Quebec, Ontario and the Rockies, June into July in Alaska. After the white umbel opens the stalks are fibrous and strong."
   },
   {
    "q": "What should kids know about cow parsnip?",
    "a": "That the big-leaved plant in the ditch can burn, and that nothing in the carrot family is picked without an adult. Sap on skin on a sunny day blisters like a bad burn. If a child gets sap on them, wash with soap and cold water right away and keep that skin covered from the sun for two days."
   }
  ],
  "sources": [
   {
    "label": "USDA NRCS Plant Guide: Cow parsnip (Heracleum maximum)",
    "url": "https://nrcs.usda.gov/plantmaterials/mipmcpg14199.pdf"
   },
   {
    "label": "Cornell Weed ID: Cow parsnip",
    "url": "https://blogs.cornell.edu/weedid/cow-parsnip"
   },
   {
    "label": "New York DEC: Giant hogweed and its look-alikes",
    "url": "https://dec.ny.gov/sites/default/files/2026-08/gianthogweedlooklikefactsheet.pdf"
   },
   {
    "label": "Invasive Species Centre (Canada): Giant hogweed",
    "url": "https://www.invasivespeciescentre.ca/invasive-species/meet-the-species/invasive-plants/giant-hogweed/"
   },
   {
    "label": "Minnesota Department of Agriculture: Giant hogweed",
    "url": "https://www.mda.state.mn.us/sites/default/files/docs/2026-06/Giant_hogweed_2022_locked.pdf"
   },
   {
    "label": "Kuhnlein & Turner (1986), Cow-parsnip: an Indigenous vegetable of northwestern North America — Journal of Ethnobiology",
    "url": "https://ethnobiology.org/sites/default/files/pdfs/JoE/6-2/KuhnleinTurner1986.pdf"
   }
  ]
 },
 "common-milkweed": {
  "otherNames": "Silkweed, asclépiade commune or petits cochons (Quebec). Showy milkweed (Asclepias speciosa) of the west is eaten the same way by some foragers; this entry covers only common milkweed.",
  "family": "Apocynaceae, the dogbane family (which also includes dogbane, periwinkle and oleander).",
  "range": "Native to eastern North America: from New Brunswick and Nova Scotia through southern Quebec and Ontario to Manitoba and the edge of Saskatchewan, and south through the Great Lakes, the northeast and the Appalachians to Georgia, Oklahoma and Kansas. It is the milkweed of old fields and roadsides across that whole region, and thins out on the western plains. West of the Rockies it occurs only as a rare escape.",
  "whenToPick": "Shoots in May and early June, while they are under 20 cm (8 in) and snap cleanly; flower-bud clusters in late June and July, while the buds are tight and green to pale pink; firm young pods in July and August, under 4 cm (1.5 in) long and still soft when squeezed. Each window is a week or two earlier in the mid-Atlantic and later toward the Shield.",
  "partsUsed": "Shoots, tender top leaves, unopened flower buds, young pods and the white silk inside them — all boiled until tender in water that is thrown away. Mature leaves, stalks, roots and ripe pods are not eaten. Sam Thayer, who has eaten more of it than anyone writing, argues that common milkweed is not bitter and does not need the old ‘three changes of water’; that advice belongs to other milkweeds. A single boil and discard is still the sensible minimum.",
  "poisonous": "Every part of milkweed contains cardiac glycosides, most concentrated in the latex. Eating raw plant has caused nausea, vomiting, weakness and dangerous changes in heart rhythm; sap in the eye burns. America’s Poison Centers states plainly that it does not recommend eating milkweed even cooked, because there is little evidence on how much toxin cooking removes; the long Indigenous and rural tradition of eating it rests on boiling and discarding the water. Dogs, cats and horses are poisoned by it. Anyone who tastes bitterness should spit it out: it is dogbane, another milkweed, or one of the bitter strains of common milkweed found in parts of the Northeast, and none of them should be eaten.",
  "moreLookalikes": "Young pokeweed (Phytolacca americana): comes up at the same time as thick smooth shoots with a red-purple tinge, alternate leaves, no fuzz and no milky sap, from a huge taproot; all parts are poisonous — a few raw berries can kill a child — and this guide does not include it. Butterfly weed (Asclepias tuberosa): clear sap, hairy alternate leaves, orange flowers; not eaten. Swamp milkweed (A. incarnata): narrow leaves, branched stem, wet ground; bitter, not the one. Spreading dogbane (Apocynum androsaemifolium): a smaller, bushy, red-stemmed dogbane with drooping leaves and pink bell flowers; toxic.",
  "faqs": [
   {
    "q": "How do you tell milkweed from dogbane?",
    "a": "Not by the sap — both bleed white. Common milkweed is a single thick, unbranched, fuzzy green stem with big soft oval leaves, velvety underneath, and later fat warty pods; dogbane branches as it grows, its stems are slender, smooth and reddish, its leaves small and hairless, and its pods hang in long thin pairs. As shoots, milkweed is thick and fuzzy with leaves unfolding at 15–20 cm (6–8 in); dogbane shoots are thin, smooth and reddish and keep climbing before the leaves open."
   },
   {
    "q": "Is milkweed poisonous?",
    "a": "Raw, yes: it contains cardiac glycosides. The few human exposures poison centres describe caused little or no illness, but the glycosides can affect the heart, so poison centres treat it as potentially dangerous and do not recommend eating it even cooked. It has nonetheless been eaten as a boiled vegetable for centuries, and poison centres and foragers disagree on how safe that is. If you choose to eat it, boil it and discard the water, eat a modest portion, and never eat any milkweed that tastes bitter."
   },
   {
    "q": "Can you eat milkweed raw?",
    "a": "No. Raw milkweed shoots, buds and pods carry the glycosides and the sap; boiling until tender and pouring off the water is the whole basis of the tradition. Treat it like fiddleheads: never raw, never a light sauté from fresh."
   },
   {
    "q": "When do you pick milkweed shoots and pods?",
    "a": "Shoots in May and early June, under 20 cm (8 in), snapped where they break cleanly; bud clusters in late June and July before any flower opens; pods in July and August while they are under 4 cm (1.5 in) and firm. A pod is too old once the silk inside has started to turn from white to tan."
   },
   {
    "q": "Does picking milkweed hurt monarch butterflies?",
    "a": "Not if you pick lightly from a big colony. Common milkweed spreads by underground runners and regrows shoots and buds after cutting. Check each shoot and bud cluster for monarch eggs — pale ribbed dots on the underside of leaves — and striped caterpillars, and leave any plant that has them. Never strip a small patch."
   },
   {
    "q": "Is milkweed poisonous to dogs?",
    "a": "Yes. The ASPCA lists milkweed as toxic to dogs, cats and horses: vomiting, weakness, diarrhoea, slow or irregular heartbeat, and in serious cases seizures and collapse. Keep pets away from garden milkweed and from cut stems bleeding sap, and call a vet or animal poison line if a dog chews it."
   },
   {
    "q": "What should kids know about milkweed?",
    "a": "That the white sap stings eyes and should never go in the mouth — poison centres have handled children who chewed the plant and treat every such call as a possible poisoning. Children can watch the monarchs and pop the pods for silk in fall, but should wash their hands afterwards and leave the picking and cooking to an adult. Pokeweed, which comes up beside it with red stems and no milky sap, is far more dangerous and is never eaten."
   }
  ],
  "sources": [
   {
    "label": "USDA NRCS Plant Guide: Common milkweed (Asclepias syriaca)",
    "url": "https://plants.sc.egov.usda.gov/DocumentLibrary/plantguide/pdf/pg_assy.pdf"
   },
   {
    "label": "Minnesota Wildflowers: Common milkweed",
    "url": "https://www.minnesotawildflowers.info/flower/common-milkweed"
   },
   {
    "label": "Minnesota Wildflowers: Indian hemp (Apocynum cannabinum)",
    "url": "https://www.minnesotawildflowers.info/flower/indian-hemp"
   },
   {
    "label": "America’s Poison Centers: Milkweed can cause serious poisoning",
    "url": "https://www.poison.org/articles/milkweed-can-cause-serious-poisoning-204"
   },
   {
    "label": "ASPCA Animal Poison Control: Milkweed",
    "url": "https://www.aspca.org/pet-care/animal-poison-control/toxic-and-non-toxic-plants/milkweed"
   },
   {
    "label": "Sam Thayer, The Milkweed Phenomenon (The Forager, 2001)",
    "url": "https://wildflowers-and-weeds.com/Edible_Plants/Articles/Milkweed.htm"
   }
  ]
 },
 "jerusalem-artichoke": {
  "otherNames": "Sunchoke, sunroot, topinambour (Quebec), earth apple.",
  "family": "Asteraceae, the daisy family (which also includes the annual sunflower, lettuce and dandelion).",
  "range": "Native to the central and eastern United States, where it was grown by Indigenous farmers long before Europeans arrived — so long that its original range is blurred by cultivation. Today it grows wild along rivers and in old fields from Nova Scotia and southern Quebec through southern Ontario and Manitoba, and through the Great Lakes, the northeast, the Ohio Valley, the southern Appalachians and the eastern plains. VASCAN treats every Canadian population as introduced. It is rare in the far west and absent from Florida and the deserts.",
  "whenToPick": "After frost has killed the tops, from October through to the spring thaw, as long as the ground can be dug — the tubers are sweeter and easier to digest after a few hard frosts, and they keep best left in the ground. In March and April dig them before the new shoots draw them down. Southern stands can be dug all winter; on the Shield the window closes when the ground freezes.",
  "partsUsed": "The knobbly tubers, 3–10 cm (1–4 in), with white, red or purple skins. Scrub well — peeling is a fight and not needed — then roast, boil, slice raw into salads or pickle. The tops, flowers and seeds are not eaten. Store them in damp sand or a bag in the fridge; they shrivel quickly in dry air.",
  "poisonous": "Nothing poisonous, but the tubers store their energy as inulin rather than starch, and inulin ferments in the large intestine. A big first helping gives most people wind, bloating and cramps, sometimes severe. Start small, eat them cooked, and keep portions modest until you know how you respond; cold storage and frost reduce the effect, and NC State notes that boiling in lemon juice breaks some inulin down.",
  "moreLookalikes": "Giant sunflower (Helianthus giganteus): also tall and rough-stemmed, but its leaves are narrow and almost stalkless, and it has slender rhizomes with no fat tubers. Sawtooth sunflower (H. grosseserratus): a smooth, hairless stem with a waxy white bloom like a plum. Woodland and pale-leaved sunflowers: shorter, thinner-stemmed, often in shade. Cup plant and the rosinweeds: opposite leaves fused around the stem into cups, square stems, thick resinous sap. None of these is poisonous; none has the tubers. Where tall yellow daisies grow in a river thicket, dig before you decide.",
  "faqs": [
   {
    "q": "How do you identify Jerusalem artichoke in the wild?",
    "a": "A tall, rough sunflower — 1.5–3 m (5–10 ft) — with a stiff-hairy stem, broad sandpapery leaves on winged stalks, opposite low on the plant and alternate above, and flowers 5–9 cm (2–3.5 in) across with 10–20 narrow yellow rays around a yellow-green disk in August–October. It has the broadest leaves of the tall native sunflowers. The proof is underground: dig at the base of a clump for knobbly tubers on short runners."
   },
   {
    "q": "When do you dig sunchokes?",
    "a": "From the first hard frost until the shoots come up in spring — October to April in most of the Great Lakes and northeast, all winter farther south. Frost sweetens them and takes some of the gas out, and they keep better in the ground than in a cupboard, so dig as you need them."
   },
   {
    "q": "Why do Jerusalem artichokes cause gas?",
    "a": "Because their carbohydrate is inulin, which people cannot digest; gut bacteria ferment it instead. The result is wind and sometimes painful bloating, worst with a large raw serving. Eat a small portion the first time, cook them, and use tubers that have been through frost or a few weeks of cold storage."
   },
   {
    "q": "Are sunchokes safe for children and dogs?",
    "a": "The tubers are not poisonous to either, but a child or a dog that eats a lot will get a very sore, gassy stomach. Keep servings small for small people. None of the tall sunflowers it can be confused with is poisonous, and the tubers themselves are the proof, which makes it a good first dig for a family."
   },
   {
    "q": "Is Jerusalem artichoke invasive?",
    "a": "In a garden it behaves like one: every scrap of tuber left in the soil regrows, and a single planted tuber can make twenty. Grow it only in a contained bed or a big pot, and harvest wild stands freely — along rivers it is widely naturalized, and in Canada it counts as an introduced plant."
   },
   {
    "q": "Can you eat Jerusalem artichokes raw?",
    "a": "Yes — sliced thin they are crisp and nutty like a water chestnut. Raw is also when the inulin bites hardest, so keep raw servings small. Cooked, they roast and mash like a sweet, slightly smoky potato; do not overcook or they turn to mush."
   }
  ],
  "sources": [
   {
    "label": "Minnesota Wildflowers: Jerusalem artichoke",
    "url": "https://www.minnesotawildflowers.info/flower/jerusalem-artichoke"
   },
   {
    "label": "NC State Extension (Chatham County): Jerusalem artichokes",
    "url": "https://chatham.ces.ncsu.edu/jerusalem-artichokes"
   },
   {
    "label": "Minnesota Wildflowers: Sawtooth sunflower",
    "url": "https://www.minnesotawildflowers.info/flower/sawtooth-sunflower"
   },
   {
    "label": "VASCAN (Database of Vascular Plants of Canada): Helianthus tuberosus",
    "url": "https://data.canadensys.net/vascan/name/Helianthus%20tuberosus"
   }
  ]
 },
 "wapato": {
  "otherNames": "Broadleaf arrowhead, duck potato, Indian potato, katniss, sagittaire (Quebec); sqewth in Halkomelem. ‘Wapato’ is the Chinook Jargon name. Other arrowheads (Sagittaria cuneata, S. rigida and relatives) make smaller tubers and are eaten the same way.",
  "family": "Alismataceae, the water-plantain family.",
  "range": "Native in every province from British Columbia to Nova Scotia and Newfoundland, and in nearly every state — the Great Lakes and St. Lawrence, New England, the Atlantic and Gulf coastal plains, Florida, the Mississippi and Ohio valleys, the prairie potholes, and the lower Fraser, Columbia and Willamette in the Pacific Northwest. It is scarce in the dry interior west and the deserts except along rivers.",
  "whenToPick": "Fall, once the leaves yellow and collapse — September to November in most of the range, and on the mild Pacific coast the Katzie dug it from October right through February. The tubers are at their largest then; by late spring the plant has drawn them down to grow. Work when the water is low and the mud is soft.",
  "partsUsed": "The tubers, 2–5 cm (1–2 in), formed at the tips of runners up to 1 m (3 ft) from the plant. Always cooked — roasted in ashes the traditional way, or boiled, baked or fried — and peeled after cooking, when the skin slips off. Raw they are bitter and unpleasant. The leaves and flowers are not eaten.",
  "poisonous": "Wapato itself has nothing worse than a bitter raw tuber. The hazard is its neighbours: arrow arum (Peltandra virginica) and wild calla (Calla palustris), both arums whose roots and berries are packed with needle-like calcium oxalate crystals that cause instant burning and swelling of the mouth and throat; Indigenous cooks who used arrow arum dried or cooked it for hours first. Tubers felt out blind in the mud can come from any plant on that bank, so dig only under arrowhead leaves you have identified, and keep arum roots out of the basket.",
  "moreLookalikes": "Wild calla (Calla palustris): heart-shaped rather than arrow-shaped leaves, a white spathe and a head of red berries, in northern bogs; calcium oxalate. Water plantain (Alisma): oval leaves with no backward lobes and tiny white three-petalled flowers in an open spray; its root is acrid raw and not a wapato substitute. Bur-reed (Sparganium): strap leaves and spiky round seed balls. Arrowhead leaves themselves vary enormously — narrow and grass-like in deep water, broad in mud — so look for the whorls of three white flowers and the backward-pointing lobes with veins fanning from the stalk.",
  "faqs": [
   {
    "q": "How do you tell wapato from arrow arum?",
    "a": "By the veins and the flowers. Arrowhead’s veins fan out from the point where the stalk meets the blade and run to the tips of the lobes; arrow arum has a strong single midvein with side veins running out toward a vein along the leaf edge. Arrowhead carries white three-petalled flowers in whorls of three; arrow arum has a green hooded spathe and a drooping cluster of green-brown berries. Arrow arum’s root burns the mouth with calcium oxalate — never eat it."
   },
   {
    "q": "How do you harvest wapato?",
    "a": "The traditional way is to wade into the shallows in fall and work the mud with your feet until the tubers break free from their runners and float, then gather them from the surface — Lewis and Clark watched Chinookan women do it chest-deep from small canoes. A potato fork or rake works from the bank. Take a few from a big stand; the mud settles and the bed regrows."
   },
   {
    "q": "Who traditionally harvested wapato?",
    "a": "It was a staple and trade good across the Pacific Northwest and beyond. The Katzie First Nation of the Pitt River and lower Fraser tended wapato beds for thousands of years — a 3,800-year-old wapato garden with a rock-paved harvesting floor was excavated in Katzie territory at Pitt Meadows — and Chinookan peoples of the lower Columbia harvested it so heavily around Sauvie Island that Lewis and Clark called the place Wapato Island and the root ‘the most valuable of all their roots’. The Katzie are restoring their beds today."
   },
   {
    "q": "Can you eat wapato raw?",
    "a": "No — raw tubers are bitter and acrid. Roast them in coals or bake, boil or fry them, then slip the skins off; cooked, they taste between a potato and a chestnut, slightly sweet. They store well in a cool, damp place."
   },
   {
    "q": "Is it legal to dig wapato?",
    "a": "Often not where it grows best. Many wapato marshes lie inside national, provincial and state parks, wildlife refuges and conservation areas, where digging plants is prohibited, and private shorelines need the owner’s permission. Check the rules for the specific wetland, avoid waterfowl nesting season, and never dig a bed that an Indigenous community is tending or restoring."
   },
   {
    "q": "Is wapato safe for children?",
    "a": "The cooked tubers are a good, mild food for children, and treading them out of the mud is a game. The risks are the water and the neighbours: cold deep mud, and arrow arum and wild calla, whose roots burn the mouth. Let children gather the floating tubers while an adult chooses the plants, and cook everything."
   }
  ],
  "sources": [
   {
    "label": "Minnesota Wildflowers: Broad-leaf arrowhead",
    "url": "https://minnesotawildflowers.info/flower/broad-leaf-arrowhead"
   },
   {
    "label": "Virginia Institute of Marine Science: Arrowhead wetland plant report",
    "url": "https://www.ccrm.vims.edu/publications/wetlands_technical_reports/91-3-arrowhead.pdf"
   },
   {
    "label": "Wikipedia: Peltandra virginica (arrow arum)",
    "url": "https://en.wikipedia.org/wiki/Peltandra_virginica"
   },
   {
    "label": "US National Park Service: Wapato (Lewis and Clark)",
    "url": "https://www.nps.gov/articles/000/wapato.htm"
   },
   {
    "label": "Hoffmann et al. (2016), Engineered feature used to enhance gardening at a 3800-year-old site on the Pacific Northwest Coast — Science Advances",
    "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC5176348"
   },
   {
    "label": "Environment and Climate Change Canada: Eco-cultural restoration of wapato in Katzie territory",
    "url": "https://www.canada.ca/en/environment-climate-change/services/wildlife-habitat/conservation-funding-success-stories/eco-cultural-restoration-wapato-traditional-food.html"
   }
  ]
 },
 "groundnut": {
  "otherNames": "Hopniss (from the Lenape name), Indian potato, wild bean, potato bean, pénacs or patates en chapelet (Quebec). Not the peanut, which is also called groundnut in Britain.",
  "family": "Fabaceae, the pea family (which also includes beans, clover and hog peanut).",
  "range": "Native from Nova Scotia, New Brunswick, Prince Edward Island and southern Quebec through southern Ontario, and south through all of the eastern United States — New England, the Great Lakes, the Ohio and Mississippi valleys, the Appalachians, the Southeast and the Gulf coast — to Florida and east Texas. Scarce west of the Missouri; a few outliers reach Colorado.",
  "whenToPick": "Fall after frost has killed the vines, through to early spring before new growth — October and November in most of the range, and any thaw in winter. The tubers are edible all year but are fullest and sweetest in the cold months, and the dead vines in fall lead you to the roots. Note where a stand flowers in July–September and come back.",
  "partsUsed": "The tubers, strung along thin cord-like rhizomes just under the surface, usually 1–5 cm (0.5–2 in) across in wild plants and occasionally fist-sized. Scrub and cook thoroughly — boiled 20–30 minutes, then roasted, fried or mashed. The seeds in the pods are also edible cooked but small. The vine, leaves and flowers are not eaten.",
  "poisonous": "Raw tubers contain protease inhibitors, as beans do, and should always be cooked. More importantly, a small share of people react to groundnut — cramps, vomiting and diarrhoea, occasionally severe — and the reaction typically appears not on the first meal but on a later one, which points to an allergy. Cultivariable’s grower, after a bad reaction of his own, now boils them 30 minutes and advises keeping portions small for the first ten times you eat it; Sam Thayer reports a similar reaction in Nature’s Garden. Eat a little, wait a day, and stop at the first sign of trouble.",
  "moreLookalikes": "Hog peanut (Amphicarpaea bracteata): a thread-thin vine of the same thickets with three leaflets, pale pink-white flowers and a single edible seed that ripens underground — edible, but not this plant. Wild yam (Dioscorea villosa): heart-shaped single leaves, no pea flowers, a knotted horizontal root; not food. Trailing wild bean (Strophostyles helvola): three leaflets, pink flowers. Wisteria: a woody vine with 7–15 leaflets and blue-purple flower chains. Poison ivy: three leaflets on a woody, hairy-rooted climber — do not handle vines with threes. Groundnut is the only one with 5–7 leaflets, milky sap, maroon flowers and a chain of tubers.",
  "faqs": [
   {
    "q": "How do you identify groundnut?",
    "a": "A soft twining vine, 1–3 m (3–10 ft), with pinnate leaves of 5–7 oval, pointed leaflets and, in July–September, dense clusters of fragrant maroon-brown pea flowers. Break a stem and it bleeds a little milky sap, which almost no other pea does. Trace the thin root and you find the tubers strung along it like beads."
   },
   {
    "q": "When do you dig groundnuts?",
    "a": "From fall frost to early spring — October and November are easiest, when the dead vines still mark the spot and the tubers are full. Any winter thaw works. Spring digging is fine until the new shoots appear and start drawing the tubers down."
   },
   {
    "q": "Are groundnuts safe to eat?",
    "a": "Cooked thoroughly and identified with certainty, they are a good food — nutty, dense and about three times the protein of a potato. The caveat is the allergy: a minority of people get violently sick after a few meals. Start with a few tubers, wait a day, and keep portions small the first several times."
   },
   {
    "q": "What looks like groundnut?",
    "a": "Hog peanut is the closest vine, but it has three leaflets and no tuber chain. Wild yam has heart-shaped leaves. Nothing with 5–7 leaflets, milky sap and beaded tubers is anything else. Avoid handling any three-leaflet climber until you have ruled out poison ivy."
   },
   {
    "q": "Is groundnut the food the Pilgrims ate?",
    "a": "Yes — groundnut was a staple for Indigenous peoples across the east, and the New England colonists leaned on it through their first hard winters. ‘Hopniss’ comes from the Lenape. The tubers store well, which is what made it a cold-weather food."
   },
   {
    "q": "Can kids eat groundnuts?",
    "a": "Cooked, in small amounts, once the family has eaten them a few times without trouble. Because the allergic reaction tends to show up on a later meal, do not make it a big part of a child’s dinner until you know how everyone responds."
   }
  ],
  "sources": [
   {
    "label": "Illinois Wildflowers: Groundnut",
    "url": "https://illinoiswildflowers.info/savanna/plants/groundnut.html"
   },
   {
    "label": "Northern Woodlands: Groundnuts",
    "url": "https://northernwoodlands.org/outside_story/article/groundnuts"
   },
   {
    "label": "Cultivariable: How to grow groundnut (with the allergy notes)",
    "url": "https://www.cultivariable.com/instructions/root-crops/how-to-grow-groundnut/"
   },
   {
    "label": "University of Michigan Herbarium, Climbers of Michigan: Apios americana",
    "url": "https://climbers.lsa.umich.edu/apios-americana"
   },
   {
    "label": "VASCAN (Database of Vascular Plants of Canada): Apios americana",
    "url": "https://data.canadensys.net/vascan/name/Apios%20americana"
   }
  ]
 },
 "evening-primrose": {
  "otherNames": "Common evening primrose, evening star, king’s cure-all, onagre bisannuelle (Quebec). The oil sold in capsules is pressed from its seeds.",
  "family": "Onagraceae, the evening primrose family (which also includes fireweed and fuchsia). Not related to true primroses.",
  "range": "Native across southern Canada from British Columbia to Newfoundland and through most of the United States east of the Rockies, commonest in the northeast, the Great Lakes, the Ohio Valley and the Southeast; introduced and scattered on the Pacific coast. A plant of disturbed ground that has followed roads and railways everywhere.",
  "whenToPick": "Roots in October and November from first-year rosettes — no stalk, just the flat rosette — or in March and April before they bolt; once a stalk shows, the root is tough and bitter. Young leaves and shoots in spring, flower buds and flowers July–October, seeds from the dry capsules in fall. Rosettes stay green under snow, so warm spells all winter are fair game in the south.",
  "partsUsed": "The pinkish taproot of first-year plants, scrubbed, sliced and boiled in one or two changes of water — peppery, with a parsnip sweetness. Young leaves and the first spring shoots, cooked. Flower buds and flowers, raw or cooked. The tiny seeds, toasted or ground. Second-year roots and mature leaves are too tough and strong to bother with.",
  "poisonous": "Nothing seriously poisonous, but the raw root and shoots carry an irritant that makes the throat tickle and burn, and a minority of people find them scratchy even after cooking. Taste a small cooked piece before you commit to a dish. The real caution is the rosette stage, where several unrelated plants look alike — see foxglove below.",
  "moreLookalikes": "Foxglove (Digitalis purpurea): a biennial rosette, naturalized across the Pacific Northwest and common as a garden escape elsewhere, with soft, downy, deeply wrinkled grey-green leaves, woolly underneath, on winged stalks, and no clean white midrib; every part contains cardiac glycosides and can kill. Common mullein: a thick felted rosette, grey-woolly on both sides. Curly dock: hairless, with strongly crisped wavy edges and a papery sheath at the leaf base. Other evening primroses (cutleaf, small-flowered, biennial relatives): lookalike rosettes that are not dangerous and are used the same way. Learn the white-midribbed, lightly hairy, often red-flecked leaf, and never dig a rosette you cannot name.",
  "faqs": [
   {
    "q": "How do you identify evening primrose in its first year?",
    "a": "A flat rosette of long, narrow, slightly hairy leaves 10–30 cm (4–12 in) long, each with a conspicuous white or pink midrib and often red flecks, over a pink-red taproot. Nearby you will usually find last year’s dead stalks, 1–2 m (3–6 ft) tall, with woody four-chambered seed capsules up the stem. Mullein is woolly and dock is hairless and crisped; neither has the white midrib."
   },
   {
    "q": "What part of evening primrose is edible?",
    "a": "The first-year root, cooked; young leaves and shoots, cooked; the flower buds and flowers; and the seeds. The root is the main harvest — peppery and parsnip-like after boiling in a change of water. Second-year roots are woody."
   },
   {
    "q": "When do you dig evening primrose root?",
    "a": "Late fall or very early spring, from rosettes that have not bolted — October and November, or March and April in the Great Lakes and northeast. In mild regions any winter thaw works. Once the flower stalk appears, leave the plant to bloom and set seed for next year’s rosettes."
   },
   {
    "q": "Can you eat evening primrose raw?",
    "a": "The flowers and buds, yes. The root and shoots are better cooked: raw they leave a peppery, scratchy burn in the throat that some people feel even after cooking. Boil the root in a change of water and taste a piece before serving it."
   },
   {
    "q": "What poisonous plant looks like evening primrose?",
    "a": "Foxglove, at the rosette stage. Foxglove leaves are soft, wrinkled and downy, woolly underneath, with no white midrib; evening primrose leaves are narrower, lightly hairy and have that white or pink midrib. Foxglove is deadly — it is the source of digitalis — and is common in Pacific Northwest clearings and in gardens. If you are not sure of the rosette, wait for the flowers."
   },
   {
    "q": "Is evening primrose safe for children?",
    "a": "The flowers are a fine thing for a child to taste at dusk, and the cooked root is harmless beyond a throat tickle. Keep the digging to an adult, because the rosette can be confused with foxglove in gardens and in the west. Nothing about the plant is toxic to dogs."
   }
  ],
  "sources": [
   {
    "label": "Minnesota Wildflowers: Common evening primrose",
    "url": "https://www.minnesotawildflowers.info/flower/common-evening-primrose"
   },
   {
    "label": "Ontario weed identification guide: Yellow evening-primrose",
    "url": "https://www.ontario.ca/document/weed-identification-guide-ontario-crops/yellow-evening-primrose"
   },
   {
    "label": "UMass Extension weed identification: Common evening primrose",
    "url": "https://www.umass.edu/agriculture-food-environment/landscape/publications-resources/weed-identification/common-evening-primrose--oenothera-biennis"
   },
   {
    "label": "Missouri Department of Conservation: Common evening primrose",
    "url": "https://mdc.mo.gov/node/219514"
   },
   {
    "label": "Eat The Weeds: Oenothera biennis, foraging standby",
    "url": "https://eattheweeds.com/oenothera-biennis-foraging-standby-2"
   },
   {
    "label": "Cornell University poisonous plants: Digitalis (foxglove)",
    "url": "https://poisonousplants.ansci.cornell.edu/digitalis.html"
   }
  ]
 },
 "watercress": {
  "otherNames": "Cresson de fontaine (Quebec); also written Rorippa nasturtium-aquaticum in older books. One-row watercress (Nasturtium microphyllum) is a near-identical relative, eaten the same way.",
  "family": "Brassicaceae, the mustard family (which also includes cabbage, radish and garlic mustard).",
  "range": "Introduced from Europe and now naturalized in cold springs and spring-fed streams across southern Canada and most of the United States — commonest in the Great Lakes states, Pennsylvania and the Appalachians, the Ozarks and the mid-south, the Texas Hill Country, the Rockies, the Great Basin and desert spring systems, the Pacific Northwest and especially California. It is sparse in the Maritimes and on the Canadian Shield, where few streams stay unfrozen. Some states list it as invasive.",
  "whenToPick": "Spring and fall: March to May before it flowers heavily, and again September into November when cold water sweetens it. In summer, once it has flowered, the leaves turn hot and bitter; in a hard winter it dies back under ice, though spring-fed runs that stay above freezing carry it year-round. Cut the growing tips above the waterline and the mat regrows.",
  "partsUsed": "Leaves and tender stems, cut from the top 15 cm (6 in) of the plant. Cooked — in soup, wilted in butter, steamed or stir-fried — unless the water is one you would drink untreated; then raw in salad and sandwiches. Flowers and buds are eaten too. Roots and the lower, muddy stems are left in the stream.",
  "poisonous": "The plant is safe to eat once identified; the water it grows in may not be. Watercress downstream of grazing sheep, cattle or goats can carry the encysted larvae of the sheep liver fluke (Fasciola hepatica), which cling to the leaves and infect people who eat it raw — the CDC names raw watercress as the classic source. Human cases are rare in Canada and the US, but the parasite lives in livestock in parts of the continent, and a wild stream below a pasture is exactly where it would be. Untreated water also brings Giardia, E. coli and farm chemicals. Cooking destroys the fluke and the microbes; rinsing does not reliably remove the cysts.",
  "moreLookalikes": "Water parsnip (Sium suave): a carrot-family plant of the same shallows with once-divided leaves of narrow, sharply toothed leaflets, a ridged stem, and a carrot smell rather than mustard; not eaten here because of its resemblance to water hemlock. Bittercress (Cardamine pensylvanica): a smaller, upright mustard of the same banks, edible and peppery. Brooklime (Veronica americana): round, paired, undivided leaves and tiny blue flowers; edible but bitter. Fool’s watercress (Helosciadium nodiflorum) and hemlock water-dropwort are European look-alikes that are essentially absent from North America. In the Pacific Northwest, Pacific water-parsley (Oenanthe sarmentosa), a hemlock relative with once- or twice-divided toothed leaflets and hollow sprawling stems, grows in the same creeks; leave it. Whatever you cut, examine the whole handful for stray carrot-family leaves before it goes in the bag.",
  "faqs": [
   {
    "q": "How do you identify watercress?",
    "a": "Floating or sprawling mats in cold running water, with hollow, hairless stems that root from every node; pinnate leaves of 3–9 rounded leaflets, the end one largest and nearly round; small white four-petalled flowers in loose clusters from April to July; and a clean peppery mustard bite when you chew a leaf. Mustard taste plus the rooting hollow stem is the identification — but only taste a plant you have already ruled out as a carrot relative."
   },
   {
    "q": "Is wild watercress safe to eat raw?",
    "a": "Only from water you would drink: a spring source with no livestock, farms, roads or septic systems upstream. Anywhere else, the risk is liver fluke from grazing animals and Giardia and bacteria from the water, none of which you can see or wash off. Cook it, which solves all three, or grow a sprig in a pot at home."
   },
   {
    "q": "What is liver fluke and does watercress really carry it?",
    "a": "Fasciola hepatica is a flatworm parasite of sheep, cattle and goats; its larvae leave water snails and form cysts on aquatic plants, and people who eat those plants raw become infected, with fever, pain and long-term liver damage. The CDC names raw watercress as the usual source. It is uncommon in Canada and the US but present wherever livestock graze near streams. Cooking kills the cysts."
   },
   {
    "q": "What looks like watercress and is dangerous?",
    "a": "Water hemlock, which grows on the same wet banks and sometimes up through watercress mats, and is deadly. It stands upright rather than floating, with a smooth hollow stem often streaked purple, leaflets that are narrow and sharply toothed with veins running to the notches between the teeth, and a chambered root with yellow oily sap. It has no mustard taste, but you never taste-test a suspected hemlock — check every handful by eye."
   },
   {
    "q": "When is watercress in season?",
    "a": "Spring, from March to May depending on latitude, and again from September to November. Summer plants that have flowered are hot and bitter, and most streams lose it under ice in winter, except spring runs that stay unfrozen."
   },
   {
    "q": "Can kids pick watercress?",
    "a": "Yes, with scissors above the waterline from a clean spring — it is one of the easiest wild greens to recognize once they know the peppery taste and the rooting stem. The rules to teach: nothing from a ditch or a pasture stream, nothing eaten raw unless an adult knows the water, and nothing with narrow, sharp-toothed leaves goes in the bag."
   }
  ],
  "sources": [
   {
    "label": "Minnesota Wildflowers: Watercress",
    "url": "https://www.minnesotawildflowers.info/flower/watercress"
   },
   {
    "label": "USDA Forest Service, Plant of the Week: Watercress (Nasturtium officinale)",
    "url": "https://www.fs.usda.gov/wildflowers/plant-of-the-week/nasturtium_officinale.shtml"
   },
   {
    "label": "US CDC: Clinical overview of Fasciola (liver fluke)",
    "url": "https://www.cdc.gov/liver-flukes/hcp/clinical-overview-fasciola/index.html"
   },
   {
    "label": "Galloway Wild Foods: Watercress — edibility, distribution and identification",
    "url": "https://gallowaywildfoods.com/watercress-edibility-distribution-and-identification/"
   },
   {
    "label": "USDA Forest Service: Water hemlock (Cicuta maculata)",
    "url": "https://www.fs.usda.gov/wildflowers/plant-of-the-week/cicuta_maculata.shtml"
   }
  ]
 },
 "wild-sarsaparilla": {
  "otherNames": "Rabbit root, salsepareille or aralie à tige nue (Quebec). Not the tropical sarsaparilla (Smilax) of old soda-fountain syrups, for which it was a northern substitute.",
  "family": "Araliaceae, the ginseng family (which also includes American ginseng, spikenard, devil’s club and English ivy).",
  "range": "Native and common in forest across Canada from Newfoundland to British Columbia, north to the southern Northwest Territories and Yukon, and through the northern United States — New England, New York, the Great Lakes states, the Black Hills, the northern Rockies to Colorado, and down the Appalachians to North Carolina. One of the most abundant woodland wildflowers of the boreal forest and Shield. Absent from the south, the plains proper and the Pacific coast south of British Columbia.",
  "whenToPick": "Rhizomes in spring (April–May, as the leaves unfold copper-coloured) or in fall (September–October, as they yellow), when the plant is easiest to find and the roots are full. Flowers come in May–June and the blue-black berries in July–August. Dig from colonies large enough that a metre of rhizome will not be missed.",
  "partsUsed": "The long, horizontal, aromatic rhizome, which runs just under the leaf litter and connects the colony. Dig a 30–60 cm (1–2 ft) length, wash, chop and simmer for tea or a root-beer-flavoured syrup; dried, it keeps for winter. The young spring shoots have been eaten cooked in some traditions. Leaves and berries are not eaten.",
  "poisonous": "The berries are left alone: Minnesota Wildflowers notes they may cause sickness, and the University of Alberta’s collections record them as inedible raw and as making most people ill even in jelly. Birds, foxes and chipmunks eat them. The rhizome is a flavouring and a traditional tea, not a food to eat in quantity; no particular toxicity is recorded, but this guide makes no claims about its effects.",
  "moreLookalikes": "American ginseng (Panax quinquefolius): the same family and the same rich woods, with a single stem topped by a whorl of 3–5 palmate leaves (leaflets spreading from one point like fingers), a single ball of greenish flowers above the leaves and red berries. It is protected or regulated across its range and heavily poached; do not dig anything with palmate leaves and a flower stalk above them. Dwarf ginseng (Panax trifolius): tiny, with a white flower ball and yellow berries. Jack-in-the-pulpit: one or two leaves of three leaflets, a hooded flower, red berries and a corm full of calcium oxalate — not a sarsaparilla and not food. Young ash or hickory seedlings: woody, with true buds.",
  "faqs": [
   {
    "q": "How do you identify wild sarsaparilla?",
    "a": "One leaf stalk rising straight from the ground and dividing at about 20–40 cm (8–16 in) into three branches, each carrying 3–5 finely toothed, oval, pointed leaflets, so the plant looks like three compound leaves on a single stem. Underneath it, a separate shorter stalk with no leaves carries usually three round clusters of tiny greenish-white flowers in May–June, then blue-black berries. The flower stalk below the leaf is the giveaway."
   },
   {
    "q": "Does wild sarsaparilla look like poison ivy?",
    "a": "In early spring, before the leaflets expand, yes — both show glossy reddish new leaves in threes. Poison ivy’s leaves have three leaflets each, often coarsely toothed or lobed and uneven, on a plant that climbs, sprawls or stands as a small shrub; sarsaparilla’s one stalk splits into three branches of 3–5 finely serrated leaflets and never climbs. Minnesota Wildflowers makes the same distinction. When in doubt, touch nothing with three leaflets."
   },
   {
    "q": "Can you eat wild sarsaparilla berries?",
    "a": "No. They are reported to make people ill, and no reliable source treats them as food. Leave them for the thrushes and chipmunks. The part people use is the rhizome, for flavour."
   },
   {
    "q": "What was wild sarsaparilla used for?",
    "a": "Its rhizome has a sweet, aromatic, slightly liquorice taste and was simmered into tea and used as a northern substitute for tropical sarsaparilla and sassafras in home-made root beer; Go Botany and Illinois Wildflowers both record that use. Many First Nations prepared the root as a beverage and as a traditional remedy. This guide describes those uses as tradition and makes no claims about effects."
   },
   {
    "q": "How do you tell wild sarsaparilla from spikenard and bristly sarsaparilla?",
    "a": "Spikenard (Aralia racemosa) is a big, bushy plant 1–2 m (3–6 ft) tall with a dark, branching leafy stem, 9–21 leaflets per leaf division and purple berries in a long, drooping plume. Bristly sarsaparilla (Aralia hispida) has a bristly, woody base, leaves up the stem, several flower clusters at the top, and grows in sandy, open ground. Neither is dangerous; both are related plants with their own traditions."
   },
   {
    "q": "Is wild sarsaparilla safe for children?",
    "a": "The tea is a mild, old-fashioned drink that children can taste, and the plant itself does no harm to handle. The berries are the thing to warn about — dark, shiny and tempting in July and August, and they can make a child sick. Teach that woodland berries are checked with an adult first."
   }
  ],
  "sources": [
   {
    "label": "Minnesota Wildflowers: Wild sarsaparilla",
    "url": "https://www.minnesotawildflowers.info/flower/wild-sarsaparilla"
   },
   {
    "label": "Illinois Wildflowers: Wild sarsaparilla",
    "url": "https://illinoiswildflowers.info/woodland/plants/wild_sarsaparilla.htm"
   },
   {
    "label": "Go Botany (Native Plant Trust): Aralia nudicaulis",
    "url": "https://gobotany.nativeplanttrust.org/species/Aralia/nudicaulis/"
   },
   {
    "label": "University of Alberta Museums: Aralia nudicaulis (wild sarsaparilla)",
    "url": "https://search.museums.ualberta.ca/g/1-4926/12-87164"
   },
   {
    "label": "Manitoba Agriculture: Wild sarsaparilla",
    "url": "https://gov.mb.ca/agriculture/crops/crop-management/wild-sarsaparilla.html"
   },
   {
    "label": "VASCAN (Database of Vascular Plants of Canada): Aralia nudicaulis",
    "url": "https://data.canadensys.net/vascan/name/Aralia%20nudicaulis"
   }
  ]
 },
 "sochan": {
  "otherNames": "Cutleaf coneflower, green-headed coneflower, tall coneflower, wild golden glow, rudbeckie laciniée (Quebec). ‘Sochan’ is the Cherokee name. The double-flowered garden form ‘Golden Glow’ (‘Hortensia’) is the same species.",
  "family": "Asteraceae, the daisy family (which also includes black-eyed Susan, sunflower and Jerusalem artichoke).",
  "range": "Native from southern Quebec and Ontario west to Manitoba and south through the whole eastern United States — New England, the Great Lakes, the Ohio Valley, the Appalachians, the Southeast and the eastern plains — with a western variety (var. ampla) in the Rockies from Wyoming through Colorado to New Mexico and Arizona. Commonest in the southern Appalachians, the Midwest and Minnesota, and recorded as far east as the Maritimes, where it is scarce.",
  "whenToPick": "Spring, when the basal leaves and shoots are tender — March to May in the Smokies and the mid-south, April to June in the Great Lakes, Quebec and the mountains — and again in September and October, when the plants put out a second flush of basal leaves after flowering. Stop picking once the flower stalks shoot up in early summer; the leaves turn tough and strong. The Cherokee gathering season in Great Smoky Mountains National Park runs from March into early summer (March 1 to May 31 under the 2019 agreement; the park now describes it as March to June).",
  "partsUsed": "Young basal leaves and the tender tips and stems of spring shoots, and the fall rosette leaves, always cooked: blanched in boiling water, then fried in a little fat the Cherokee way, or steamed, sautéed or folded into soups and eggs. It tastes of celery and mild greens. Flowers, seeds and roots are not eaten. Pick leaves from many plants rather than stripping one, and never dig the crown.",
  "poisonous": "Reported poisonous to livestock: Canadian records list poisonings and deaths of pigs, sheep and horses that grazed cutleaf coneflower in quantity, and Illinois Wildflowers calls the foliage somewhat poisonous to some herbivores. People have eaten it cooked for a very long time without recorded harm, which is why this guide says cooked and not raw. Mature summer leaves are strong and not eaten.",
  "moreLookalikes": "Giant ragweed (Ambrosia trifida): three-lobed leaves on a tall plant in the same bottomlands, but the leaves are opposite, rough-hairy and without the broad terminal lobe, and the stem is hairy; not toxic, not food. Gray-headed coneflower (Ratibida pinnata): lobed leaves but hairy stems, narrower lobes and a grey-brown cone. Wild golden glow: the double ‘Golden Glow’ cultivar of sochan itself, run wild around old farmsteads — the same leaves and edible the same way. In western mountain meadows and streambanks, monkshood (Aconitum columbianum) and larkspur (Delphinium) grow with sochan and have deeply cut leaves; theirs are palmate, cut from a single point into many narrow fingers, on stems without a waxy bloom, and every part is deadly. That confusion is a precaution, not a documented poisoning — but learn western sochan in flower before you pick its rosettes.",
  "faqs": [
   {
    "q": "How do you identify sochan?",
    "a": "In spring, a clump of long-stalked basal leaves deeply cut into 3–7 lobes — the Cherokee comparison is a turkey’s foot — with a broad end lobe, on smooth stalks, often with a reddish cast at the base, in moist ground. In summer it is unmistakable: a smooth, hairless, waxy blue-green stem 1–3 m (3–10 ft) tall with drooping yellow rays around a green cone. Other coneflowers have hairy stems and dark cones."
   },
   {
    "q": "What is the Cherokee sochan agreement with Great Smoky Mountains National Park?",
    "a": "In March 2019 the Eastern Band of Cherokee Indians and the park signed an agreement under the National Park Service’s plant-gathering rule (36 CFR 2.6) allowing enrolled members to gather sochan in the park, which sits on Cherokee ancestral land and had been closed to the harvest since its creation. Permits — 36 in the first year, now up to 50 a season — let families gather set amounts through the spring, with monitoring that has so far found no harm to the plants. It is a permit program for tribal members, not a general opening; everyone else may not pick in the park."
   },
   {
    "q": "When do you pick sochan?",
    "a": "Spring, while the leaves are young — March to May in the southern Appalachians, April to June farther north and in the mountains — and again in September and October when a second crop of basal leaves appears. Once the stalk bolts, wait for fall."
   },
   {
    "q": "How do you cook sochan?",
    "a": "Blanch the leaves and tender stems in boiling water, drain, then fry in a little fat — the traditional Cherokee preparation, often with pork — or steam and sauté them as you would chard. Young spring shoots cook quickly; older leaves want chopping and a few more minutes. Always cooked."
   },
   {
    "q": "Is sochan poisonous?",
    "a": "Not to people who cook it, as far as a long record shows; but the foliage has poisoned pigs, sheep and horses that grazed it, so it is not a raw salad green and mature leaves are left alone. Cook it and eat it as a vegetable, not by the bucket."
   },
   {
    "q": "What looks like sochan?",
    "a": "Black-eyed Susan and gray-headed coneflower have hairy stems and dark cones and are not eaten. Buttercups share the wet meadows with glossy lobed leaves and are acrid and toxic raw. Giant ragweed has opposite, hairy, three-lobed leaves. In the Rockies, monkshood and larkspur — deadly — have deeply cut, hand-shaped leaves on similar wet ground; do not pick cut-leaved rosettes there that you have not seen flower."
   },
   {
    "q": "Is sochan safe for children?",
    "a": "Cooked sochan is a mild green that children eat readily, and picking leaves from a big streamside stand is good work for small hands once an adult has named the plant. The rules: an adult chooses the clump, nothing raw, and in western mountains no cut-leaved rosette is picked at all unless the family watched it bloom last summer."
   }
  ],
  "sources": [
   {
    "label": "Minnesota Wildflowers: Cut-leaf coneflower",
    "url": "https://www.minnesotawildflowers.info/flower/cut-leaf-coneflower"
   },
   {
    "label": "Illinois Wildflowers: Cutleaf coneflower",
    "url": "https://illinoiswildflowers.info/savanna/plants/cl_coneflower.htm"
   },
   {
    "label": "US National Park Service, Great Smoky Mountains: Sochan gathering, a Cherokee tradition",
    "url": "https://home.nps.gov/grsm/learn/historyculture/sochan-gathering-a-cherokee-tradition.htm"
   },
   {
    "label": "Cherokee One Feather: Park, Tribe sign sochan agreement (2019)",
    "url": "https://theonefeather.com/2019/03/25/park-tribe-sign-sochan-agreement/"
   },
   {
    "label": "Weeds Canada: Plants of Canada and the northern US poisonous to livestock",
    "url": "https://weedscanada.ca/plants_poisonous_animals.htm"
   },
   {
    "label": "VASCAN (Database of Vascular Plants of Canada): Rudbeckia laciniata",
    "url": "https://data.canadensys.net/vascan/name/Rudbeckia%20laciniata"
   }
  ]
 },
 "beechnut": {
  "otherNames": "American beech, beech mast, hêtre à grandes feuilles (Quebec). The planted European beech (Fagus sylvatica), with darker bark and fewer, blunter leaf teeth, bears the same kind of nut.",
  "family": "Fagaceae, the beech family (which also includes the oaks and chestnuts).",
  "range": "Native across the eastern forest: Nova Scotia, Prince Edward Island, New Brunswick, southern Quebec and Ontario west to the Lake Huron shore, and south through New England, the Appalachians and the Ohio Valley to the Gulf states, with its western edge in Wisconsin and Illinois in the north and east Texas and south-eastern Oklahoma in the south. It is a tree of rich, well-drained slopes in company with sugar maple, yellow birch and hemlock, and of the beech–magnolia forests of the Gulf coastal plain.",
  "whenToPick": "Late September and October. The soft-bristled husks open on the tree after the first hard frosts and the nuts shower down over a week or two, so gather fast — squirrels, jays, bears and turkeys are after the same crop. A beech starts bearing at about 40 years and makes a big crop only every two or three years; in the years between, most husks are empty, and even in a mast year many nuts on a lone tree are hollow. Pinch a nut: a full one is firm and plump, an empty one caves in.",
  "partsUsed": "The kernel inside the small three-sided nut, after you peel off the thin brown shell. Roast lightly in a dry pan before eating any quantity; roasted nuts can also be ground into a flour or a coffee-like drink. The husk is discarded. Young spring leaves are recorded as a cooked green, and the inner bark as a famine flour, but neither is a reason to harm a tree.",
  "poisonous": "Raw beechnuts eaten by the handful can cause stomach upset — the seed carries a bitter glycoside (sometimes called fagin) and oxalates that heat breaks down. NC State Extension rates the whole genus a low-severity poison for this reason. A few raw nuts are the traditional nibble; a bowlful should be roasted.",
  "moreLookalikes": "American chestnut and planted Chinese chestnut (Castanea) drop burrs the size of a tennis ball armoured in needle-sharp spines, holding two or three big flat-sided nuts — edible, and nothing like a beechnut in scale. Horse chestnut and buckeye (Aesculus) are the poisonous ones: a smooth or sparsely spined leathery husk that splits to free one or two large, glossy, mahogany nuts with a pale eye, under a tree with hand-shaped compound leaves in opposite pairs. Beech leaves are simple and alternate, and its nut would fit three abreast on a buckeye.",
  "faqs": [
   {
    "q": "Can you eat beechnuts raw?",
    "a": "A few, yes — they taste sweet and a little like a pine nut. More than a small handful raw can upset the stomach, because the seed contains a bitter glycoside and oxalates that cooking destroys. Toast them briefly in a dry pan before snacking in earnest, and roast any batch you grind for flour."
   },
   {
    "q": "When do beechnuts fall?",
    "a": "Late September into October, after the first hard frosts open the husks. The drop is fast, a week or two, and wildlife clears the ground almost as it falls. Good crops come only every two or three years; in an off year nearly every husk is empty."
   },
   {
    "q": "How do you identify an American beech?",
    "a": "By its bark first: smooth, pale grey and unbroken even on a trunk a metre across, which is why people carve it. Then the buds, long, slender and sharply pointed like a cigar; the oval, coarsely toothed leaves with straight parallel veins; and the pale dead leaves that hang on young trees all winter. The nuts come two to a soft-prickled husk that splits into four."
   },
   {
    "q": "What looks like a beechnut but is poisonous?",
    "a": "Buckeye and horse chestnut nuts, which are big, round, glossy brown with a pale scar, and come one or two to a smooth leathery or lightly spined husk under a tree with hand-shaped compound leaves. They are toxic and can be fatal. A beechnut is a small three-sided triangle, barely 2 cm (¾ in) long, in a bristly four-part husk under a smooth grey-barked tree with simple leaves."
   },
   {
    "q": "Why are the beech trees dying?",
    "a": "Beech bark disease, a scale insect followed by a canker fungus, has been killing large beeches across the Maritimes, Quebec, Ontario and the north-eastern US for decades. Since 2012 beech leaf disease, caused by a microscopic nematode, has spread from Ohio through the north-east into southern Ontario and kills saplings within a few years; its sign is dark bands between the leaf veins. Diseased trees make few sound nuts."
   },
   {
    "q": "Are beechnuts safe for children?",
    "a": "Shelled and roasted, yes, in small amounts, like any tree nut — and anyone with a tree-nut allergy should treat them as a nut. Teach children the husk: beechnuts come in a soft, bristly four-part husk and are tiny; a big shiny brown nut from a leathery husk is a buckeye or horse chestnut and must not go in the mouth."
   }
  ],
  "sources": [
   {
    "label": "NC State Extension — Fagus (beech)",
    "url": "https://plants.ces.ncsu.edu/plants/fagus/"
   },
   {
    "label": "Go Botany (Native Plant Trust) — Fagus grandifolia",
    "url": "https://gobotany.nativeplanttrust.org/species/fagus/grandifolia/"
   },
   {
    "label": "Nova Scotia Woodlot Management — Silvics of beech",
    "url": "https://novascotia.ca/natr/Education/woodlot/modules/module1/3beech.asp"
   },
   {
    "label": "Ontario.ca — Beech bark disease",
    "url": "https://www.ontario.ca/page/beech-bark-disease"
   },
   {
    "label": "US Forest Service pest alert — Beech leaf disease",
    "url": "https://www1.maine.gov/DACF/mfs/forest_health/downloads/US-Forest-Service-Pest-Alert-Beech-Leaf-Disease.pdf"
   },
   {
    "label": "NC State Extension — Aesculus hippocastanum (horse chestnut)",
    "url": "https://plants.ces.ncsu.edu/plants/aesculus-hippocastanum/"
   }
  ]
 },
 "white-pine": {
  "otherNames": "Eastern white pine, northern white pine, Weymouth pine, pin blanc (Quebec). Other five-needle pines — western white pine, sugar pine, whitebark and limber pine — are used the same way in the west.",
  "family": "Pinaceae, the pine family (which also includes the spruces, firs, larches and hemlocks).",
  "range": "Native from Newfoundland, the Maritimes and southern Quebec across Ontario to south-eastern Manitoba, and south through New England, the Great Lakes states and the Appalachians to northern Georgia. It is the tallest tree in the eastern forest and the provincial tree of Ontario. Beyond that range it is one of the most planted conifers in North America, so a five-needle pine in a prairie shelterbelt or a Pacific Northwest park is very likely this one.",
  "whenToPick": "Needles can be picked in any month; the new growth of late May and June is the softest and most citrusy, and midwinter is when the tea is most welcome. The yellow pollen sheds from the small male cones for a week or two around early June in southern Ontario and Quebec, earlier to the south. Inner bark is a spring harvest, when it peels, and only from a branch or a tree already down.",
  "partsUsed": "The needles, chopped and steeped in hot but not boiling water for a resinous, lemony tea — a small handful per cup is plenty. The pollen, tapped from the male cones into a bag, as a flour stretcher. The inner bark, dried and pounded, is a famine food of the north woods, not a treat, and stripping it from a living trunk kills the tree. The seeds inside the long cones are edible but tiny; western pines carry the pine nuts worth the trouble.",
  "poisonous": "Pine needles themselves are not poisonous, but two cautions stand. The needles of ponderosa, lodgepole and some other pines contain isocupressic acid, which causes late-term abortion in cattle; there is no reliable evidence for people either way, and the long-standing advice is that pregnant people avoid pine-needle tea altogether, white pine included. Second, strong pine tea drunk by the potful is hard on the stomach; keep it to a cup. The real danger is a wrong tree: yew, which is lethal.",
  "moreLookalikes": "Other eastern pines are safe and the needle count tells them apart: red pine and Scots pine have two long needles per bundle, jack pine two short twisted ones, pitch pine three; all can be used for tea. Spruce (square needles that roll in the fingers) and fir (flat needles with white lines beneath) are also used. Yew (Taxus canadensis, a low native forest shrub across the east, and the planted hedge yews) is the one that kills: flat, single, dark green needles in two rows, no bundles, no cones, a red fleshy cup around each seed, and no resin smell. Norfolk Island pine and Australian pine (Casuarina) are not pines; neither has needles in bundles.",
  "faqs": [
   {
    "q": "Is white pine needle tea safe to drink?",
    "a": "Once you are certain the tree is a pine — long needles in bundles of five, soft and bluish — a cup made from a small handful of chopped needles is a traditional drink across the north. Steep rather than boil, keep to a cup or two, and skip it in pregnancy: needles of several pines are known to cause abortion in cattle and nobody has proved the human case either way. Never use yew."
   },
   {
    "q": "How do you tell white pine from yew?",
    "a": "Count and feel the needles. White pine needles come in bundles of five, are 6–13 cm (2½–5 in) long, soft and flexible, and the tree carries long slender cones. Yew needles grow singly in two flat rows along the twig, are short and dark, and the shrub never has a cone — instead a red, fleshy cup around a single seed. Every part of yew except that red flesh is deadly, and it is planted as a hedge across the continent."
   },
   {
    "q": "Can pregnant women drink pine needle tea?",
    "a": "The usual advice is no. Ponderosa, lodgepole and some other pine needles contain a compound that causes late-term abortion in cattle, and because no one has tested the question in people, herbalists and foragers have long told pregnant people to leave all pine-needle tea alone. White pine has not been implicated specifically, but the caution stands."
   },
   {
    "q": "Does pine needle tea have vitamin C?",
    "a": "Fresh conifer needles do contain vitamin C, and the story everyone tells is Jacques Cartier’s crew at Stadacona (Quebec City) in the winter of 1535–36, saved from scurvy with a tea of bark and twigs the St. Lawrence Iroquoians called annedda. Which tree it was is uncertain — Parks Canada says probably eastern white cedar, and white pine is the other usual candidate. Enjoy the tea as a tea; it is not medicine."
   },
   {
    "q": "What should kids know about pine needle tea?",
    "a": "That tea comes only from a tree a grown-up has checked, and that the hedge in the yard may be a yew. Yew’s red berries look tempting and the flesh is harmless, but the seed inside and the needles are among the most poisonous things in a garden. If a child has chewed yew, call poison control at once."
   },
   {
    "q": "When do you collect white pine pollen?",
    "a": "For a week or two in late May or early June in the Great Lakes region, when the clusters of small yellow male cones at the branch tips puff yellow dust when tapped. Hold a paper bag under a cluster and shake. Earlier in the south, later in the north and uphill."
   }
  ],
  "sources": [
   {
    "label": "NC State Extension — Pinus strobus",
    "url": "https://plants.ces.ncsu.edu/plants/pinus-strobus/"
   },
   {
    "label": "Minnesota Wildflowers — White pine",
    "url": "https://minnesotawildflowers.info/tree/white-pine"
   },
   {
    "label": "Cornell University Poisonous Plants — Yew",
    "url": "https://poisonousplants.ansci.cornell.edu/yew.html"
   },
   {
    "label": "South Dakota State University Extension — Pine needles: another possible threat to beef cow pregnancies",
    "url": "https://extension.sdstate.edu/pine-needles-another-possible-threat-beef-cow-pregnancies"
   },
   {
    "label": "Parks Canada, Cartier-Brébeuf National Historic Site — Wintering (1535–1536)",
    "url": "https://parks.canada.ca/lhn-nhs/qc/cartierbrebeuf/culture/histoire-history/evenement-event/cartier/c"
   },
   {
    "label": "VASCAN (Database of Vascular Plants of Canada) — Pinus strobus",
    "url": "https://data.canadensys.net/vascan/name/Pinus%20strobus"
   }
  ]
 },
 "black-cherry": {
  "otherNames": "Wild black cherry, rum cherry, cerisier tardif (Quebec). Its smaller relatives chokecherry (Prunus virginiana) and pin cherry (P. pensylvanica) have their own uses and the same cyanide caution.",
  "family": "Rosaceae, the rose family (which also includes the plums, apples, hawthorns and serviceberries).",
  "range": "Native from Nova Scotia and southern Quebec across southern Ontario, and throughout the eastern US from Maine to Florida and west to Minnesota, the eastern Plains and the Texas Hill Country; distinct varieties grow in the mountains of Arizona, New Mexico and west Texas. It is a pioneer of fence lines and old fields, so it is as common on a Toronto ravine edge or a Pennsylvania roadside as in the forest. In Europe it is a serious invader.",
  "whenToPick": "August into early September in southern Ontario, Quebec and the Great Lakes states; from late July in the south and into mid-September in the Maritimes. The hanging clusters turn from red to purple-black over a couple of weeks and are at their best when fully black, slightly soft and sweet behind the bitterness. Birds strip a tree within days of ripening, so check often.",
  "partsUsed": "The flesh of the fully ripe fruit, cooked and strained: syrup, jelly, juice, wine and the old ‘cherry bounce’. Simmer whole, mash gently and sieve so the pits stay intact and out of the pot. Raw, the cherries are bittersweet and seedy, fine for a taste. Nothing else from the tree is food: not the pits, the leaves, the bark or the twigs, though the bark’s almond smell has made it a traditional flavouring.",
  "poisonous": "Leaves, twigs, bark and pits contain cyanogenic glycosides (prunasin and amygdalin) that release hydrogen cyanide when crushed or digested. Wilted leaves on a broken or cut branch are the most dangerous form and kill cattle, horses, sheep and goats every year — Purdue puts the lethal dose for a sheep at well under half a kilogram (a pound). A swallowed whole pit passes through intact; crushed pits, or a child chewing a mouthful of them, are the risk. Strain every pit out of anything you cook down.",
  "moreLookalikes": "Glossy buckthorn (Frangula alnus), another invader of wet ground, has untoothed leaves, red berries ripening to black scattered along the twig, no thorn and no almond smell — purgative like common buckthorn. Serviceberry has purple-black fruit in small clusters, but the fruit has a crown of dried sepals at its tip, like a tiny apple, and the leaves and twigs have no almond smell; it is edible. Peach-leaved and planted sweet cherries have larger fruit on long stalks in bunches, not in a hanging chain.",
  "faqs": [
   {
    "q": "Are wild black cherries edible?",
    "a": "Yes — the ripe, purple-black fruit of a tree you have identified with certainty is edible, though bitter enough that most people cook and strain it for syrup, jelly or juice rather than eating it by the handful. Remove every pit. The leaves, bark, twigs and pits contain cyanide-forming compounds and are not food."
   },
   {
    "q": "How do you identify a black cherry tree?",
    "a": "Three things. Young bark is smooth and dark with horizontal lines of pores, and old bark breaks into curled-up dark scales that people compare to burnt potato chips. The underside of each leaf has a row of rusty-brown hairs along the lower midrib. And a broken twig smells sharply of bitter almond. The fruit hangs in chains of 10 to 20 small cherries, each with its own stalk."
   },
   {
    "q": "What is the difference between black cherry and chokecherry?",
    "a": "Size and texture, mostly. Black cherry is a forest tree that can reach 25 m (80 ft) with scaly plated bark; chokecherry is a shrub or small tree with smooth bark and broader, more sharply toothed leaves. Chokecherry’s clusters are denser and its fruit far more astringent. Both are edible once cooked and strained, and both carry cyanide in pits and leaves."
   },
   {
    "q": "What looks like black cherry but is poisonous?",
    "a": "Common buckthorn, an invasive shrub of hedgerows and woodland edges. Its black berries sit in tight clusters at the leaf joints along the twig, not in hanging chains; most twigs end in a short thorn; the leaf veins curve toward the tip; and a scratched twig shows bright orange under the bark with no almond smell. The berries are a violent laxative. Cherry twigs are never thorny."
   },
   {
    "q": "Why are wilted cherry leaves dangerous?",
    "a": "Because wilting breaks down the leaf cells and lets the cyanide-forming compounds react, so a branch blown down in a pasture or a pile of prunings becomes far more toxic than the living leaves. Livestock eating wilted cherry leaves can die within hours. If you have black cherry on a fence line, clear fallen limbs before animals reach them, and do not toss prunings over a fence."
   },
   {
    "q": "Are black cherries safe for kids and dogs?",
    "a": "A child who eats a few ripe cherries and spits out the pits is fine; the worry is a mouthful of chewed pits or a child nibbling leaves or twigs, and in that case call poison control. For dogs the same applies — the flesh is harmless, the pits, stems and leaves are not, and a dog chewing a fallen branch should be stopped."
   }
  ],
  "sources": [
   {
    "label": "Minnesota Wildflowers — Black cherry",
    "url": "https://minnesotawildflowers.info/tree/black-cherry"
   },
   {
    "label": "NC State Extension — Prunus serotina",
    "url": "https://plants.ces.ncsu.edu/plants/all/prunus-serotina/"
   },
   {
    "label": "Purdue University Extension — Toxic plants: Black cherry",
    "url": "https://ag.purdue.edu/department/arge/PACs/sipac/toxic-plants/black-cherry.html"
   },
   {
    "label": "Minnesota Wildflowers — Common buckthorn",
    "url": "https://minnesotawildflowers.info/tree/common-buckthorn"
   }
  ]
 },
 "wild-plum": {
  "otherNames": "American plum (Prunus americana), Canada plum or red plum (P. nigra, prunier noir in Quebec) and Chickasaw plum (P. angustifolia) — three native plums that trade places across the continent and are gathered the same way.",
  "family": "Rosaceae, the rose family (which also includes the cherries, apples and hawthorns).",
  "range": "American plum is native from southern Ontario west through Manitoba to south-eastern Saskatchewan and across most of the US east of the Rockies, especially the Plains and the Midwest, and native, if scattered, in Quebec and New Brunswick. Canada plum takes over in the north-east — Quebec, Ontario, New Brunswick, Nova Scotia and Manitoba, south into New England and the upper Great Lakes — and is the plum of old Quebec farm hedges. Chickasaw plum covers the south-east and south-central US from the Carolinas to Texas and into Florida; its common name records the Chickasaw, who are thought to have planted it around their towns.",
  "whenToPick": "Mid-August to mid-September for American and Canada plums in southern Ontario, Quebec and the northern Plains; a little earlier in the Midwest. Chickasaw plum is a summer fruit, May to July in the Deep South. A plum is ready when its skin has turned fully red, orange or yellow with a dusty bloom, it gives slightly to the thumb, and it comes away from the twig with a gentle twist; the tart skin never fully sweetens, which is why these plums make such good jam. Shake a laden branch over a sheet.",
  "partsUsed": "The flesh and skin of the ripe fruit — eaten fresh, split and dried, or simmered and pressed through a food mill for jam, jelly, sauce, fruit leather and plum butter. The stone is discarded whole; do not crack it for the kernel. Nothing else on the shrub is eaten.",
  "poisonous": "Like all stone fruit, the pit kernels, leaves and twigs contain cyanogenic glycosides. A swallowed pit passes through intact and is not a poisoning, but chewed or crushed kernels release cyanide, and wilted leaves on broken branches can poison livestock. Keep the pits out of anything you cook down and never grind them.",
  "moreLookalikes": "Chokecherry and black cherry grow in the same hedgerows but hang their small dark fruit in long chains, where plums hang singly or in twos and threes on short stalks. Planted and escaped cherry plum (Prunus cerasifera), common in cities, has thornless twigs and purple or yellow fruit and is edible. Nanking cherry and sand cherry are low shrubs with small cherries, also edible. Any red or yellow fruit with a single flattened stone, a seam down one side and a bloom on the skin is a plum; count seeds if in doubt — a hawthorn or crabapple has several.",
  "faqs": [
   {
    "q": "Are wild plums edible?",
    "a": "Yes — American, Canada and Chickasaw plums are all native plums with sweet yellow flesh under a tart skin, edible fresh once fully ripe and better still as jam, sauce or fruit leather. Identify the shrub by its spur thorns, early white flowers and single-stoned fruit, and discard the pits whole."
   },
   {
    "q": "When are wild plums ripe?",
    "a": "Mid-August to mid-September across southern Canada and the northern US for American and Canada plums; May to July for Chickasaw plum in the South. Ripe fruit is fully coloured, slightly soft, has a powdery bloom and drops when the branch is shaken. Underripe plums are mouth-puckering and will not ripen much off the bush."
   },
   {
    "q": "How do you identify a wild plum thicket?",
    "a": "A dense stand of crooked shrubs or small trees 2–6 m (6–20 ft) tall, spreading from root suckers, with short side branches ending in a dull thorn. In spring it is a cloud of white five-petalled flowers before the leaves; in late summer, red, orange or yellow plums about 2–3 cm (1 in) across. The leaves are oval with sharp or glandular teeth; Canada plum’s are broader with red glands on the leaf stalk."
   },
   {
    "q": "What looks like a wild plum but is poisonous?",
    "a": "Common buckthorn shares the thorny twig tip and the hedgerow, but its fruit is a black berry with four seeds in clusters at the leaf joints, and it is a strong purgative. Nothing with a red or yellow single-stoned plum is dangerous, but do confirm the stone: hawthorn haws and crabapples have several seeds and are edible; buckthorn never looks like a plum once you cut it open."
   },
   {
    "q": "Can you eat the pits of wild plums?",
    "a": "No. The kernel inside the stone contains cyanide-forming compounds, as apricot and peach kernels do. Swallowing a pit whole by accident is not dangerous, but cracked or chewed kernels are, and the pits should be strained out of jam and sauce before the long simmer."
   },
   {
    "q": "Are wild plums safe for children?",
    "a": "Ripe wild plums are a good first foraged fruit for a child, with two rules: spit out the stone, and stay away from the black berries. A child should also know the thorns — plum spurs are short and stout and will scratch, which is reason enough to let an adult shake the branch."
   }
  ],
  "sources": [
   {
    "label": "Natural Resources Canada, Trees of Canada — American plum",
    "url": "https://tidcf.nrcan.gc.ca/en/trees/factsheet/445"
   },
   {
    "label": "Natural Resources Canada, Trees of Canada — Canada plum",
    "url": "https://tidcf.nrcan.gc.ca/en/trees/factsheet/447"
   },
   {
    "label": "Minnesota Seasons — American plum",
    "url": "https://minnesotaseasons.com/Plants/American_plum.html"
   },
   {
    "label": "NC State Extension — Prunus angustifolia (Chickasaw plum)",
    "url": "https://plants.ces.ncsu.edu/plants/prunus-angustifolia/"
   },
   {
    "label": "VASCAN (Database of Vascular Plants of Canada) — Prunus americana",
    "url": "https://data.canadensys.net/vascan/name/Prunus%20americana"
   },
   {
    "label": "Minnesota Wildflowers — Common buckthorn",
    "url": "https://minnesotawildflowers.info/tree/common-buckthorn"
   }
  ]
 },
 "black-locust": {
  "otherNames": "False acacia, yellow locust, robinier faux-acacia (Quebec); the flowers are the ‘acacia’ of French and Italian acacia fritters and acacia honey.",
  "family": "Fabaceae, the pea and bean family (which also includes redbud, honey locust and wisteria).",
  "range": "Native only to the central and southern Appalachians and the Ozarks. It was planted so widely for fence posts, honey and erosion control that it now grows wild in every one of the lower 48 states and in southern Ontario, Quebec, the Maritimes and British Columbia. It is counted invasive in parts of the Midwest, the Great Plains and the West, and Minnesota lists it as a noxious weed. It is abundant on roadsides, railway banks and old farmland from Toronto to Portland.",
  "whenToPick": "Late May into June in southern Ontario, Quebec and the Great Lakes region; May in the mid-Atlantic and the Ozarks; mid-June in the Maritimes. Each tree flowers for about ten days and a neighbourhood for two or three weeks, so watch for the first white clusters and the heavy honey scent and go that week. Pick clusters whose lower flowers are open and upper buds still closed; brown-edged flowers are past.",
  "partsUsed": "Only the flowers. Strip the open blossoms from the green stalk for salads, pancakes and ice cream, or dip whole clusters in a thin batter and fry them as fritters, stalk left on as a handle. Steep the flowers in hot sugar syrup for cordial, or in white wine. Remove as much of the green stem as you can; the flowers themselves are the sweet part. Bark, leaves, seeds, pods and wood are poisonous and never used.",
  "poisonous": "Every part of black locust except the flowers is poisonous: the bark, the leaves, the seeds in the flat brown pods, and the wood. The toxins, robin and robitin, are lectins related to those in raw kidney beans; symptoms are weakness, vomiting, bloody diarrhea, a weak pulse and cold limbs, and NC State rates it a high-severity poison for people, livestock and pets. Horses have died from chewing the bark of fence posts, and children have been poisoned by chewing twigs and bark. Nobody should eat the pods or seeds, raw or cooked.",
  "moreLookalikes": "Clammy locust (Robinia viscosa) and bristly locust (R. hispida) are shrubby relatives with pink flowers and sticky or bristly stems; their flowers are not the tradition and their other parts carry the same toxins. Yellowwood (Cladrastis kentukea) hangs white pea flowers in June too but has no spines and smooth grey bark; it is not a food plant. Kentucky coffeetree has huge doubly compound leaves and thick woody pods. A true acacia (Acacia) has yellow or cream pompom flowers and grows only in the far south.",
  "faqs": [
   {
    "q": "Are black locust flowers edible?",
    "a": "Yes — the open white flowers of black locust, picked in their one- to two-week season in late spring, are eaten raw, fried as fritters and made into syrup, and have been for centuries in Europe under the name acacia. Everything else on the tree — bark, leaves, seeds, pods, wood — is poisonous, so be certain of the tree and eat the flowers alone."
   },
   {
    "q": "How do you identify a black locust tree?",
    "a": "A medium tree with deeply furrowed, ropy grey-brown bark; feathery compound leaves of 7 to 19 small oval leaflets; a pair of short, sharp spines at the base of each leaf on young growth; and in late May or June, drooping 10–20 cm (4–8 in) clusters of white, sweet-smelling pea flowers followed by flat brown pods 5–10 cm (2–4 in) long that hang on through winter."
   },
   {
    "q": "What parts of black locust are poisonous?",
    "a": "The bark, leaves, seeds and pods, and the wood, all of which contain the lectins robin and robitin. Poisoning causes weakness, vomiting, bloody diarrhea and a slow, weak pulse and can be serious; it is best known in horses that chew fence posts or bark, and in children who chew twigs. The flowers are the exception and are the only part eaten."
   },
   {
    "q": "What looks like black locust but is poisonous?",
    "a": "Wisteria hangs similar racemes of pea flowers in May, but from a thick twining vine over a fence or pergola rather than a tree, nearly always in purple or lilac, with pods and seeds that are poisonous. Honey locust is a tree with branched thorns on the trunk and small greenish flowers, nothing you could mistake for a white cluster; the sweet pulp of its pods is a separate, edible matter. Redbud puts magenta flowers directly on the bark."
   },
   {
    "q": "When do black locust trees bloom?",
    "a": "For about ten days per tree between mid-May and mid-June, depending on where you live — earlier in Virginia and Missouri, late May around Toronto and Montreal, into June on the Maritime coast. The scent carries, and bees swarm the trees; when you smell honey on a warm evening, go and look."
   },
   {
    "q": "Is black locust safe around children and dogs?",
    "a": "The flowers, yes; the tree, no. Children should not chew the twigs or the bark, and the flat brown pods that litter the ground in autumn are not a bean to play at eating. Dogs and horses that chew the bark can be poisoned. If a child or pet has eaten any part but the flowers, call poison control."
   }
  ],
  "sources": [
   {
    "label": "NC State Extension — Robinia pseudoacacia",
    "url": "https://plants.ces.ncsu.edu/plants/robinia-pseudoacacia/"
   },
   {
    "label": "Minnesota Wildflowers — Black locust",
    "url": "https://www.minnesotawildflowers.info/tree/black-locust"
   },
   {
    "label": "Poison Control (America’s Poison Centers): Are black locust trees toxic?",
    "url": "https://poison.org/articles/are-black-locust-trees-toxic-221"
   },
   {
    "label": "NC State Extension — Wisteria sinensis",
    "url": "https://plants.ces.ncsu.edu/plants/wisteria-sinensis/"
   },
   {
    "label": "NC State Extension — Gleditsia triacanthos (honey locust)",
    "url": "https://plants.ces.ncsu.edu/plants/gleditsia-triacanthos/"
   },
   {
    "label": "VASCAN (Database of Vascular Plants of Canada) — Robinia pseudoacacia",
    "url": "https://data.canadensys.net/vascan/name/Robinia%20pseudoacacia"
   }
  ]
 },
 "redbud": {
  "otherNames": "Eastern redbud, Judas tree (a name shared with the European Cercis siliquastrum), gainier rouge (Quebec). Texas redbud is a thick-leaved subspecies; western redbud (Cercis occidentalis) is the California foothill species.",
  "family": "Fabaceae, the pea and bean family (which also includes black locust and wisteria).",
  "range": "Native through the eastern US from New Jersey and Pennsylvania west to southern Michigan, Iowa and eastern Nebraska, and south to Florida, Texas and north-eastern Mexico; it is the state tree of Oklahoma and a common understory tree of limestone woods from the Ohio valley to the Hill Country. In Canada it is native only — and probably — on Pelee Island in Lake Erie, but it is planted in gardens and streets across southern Ontario, Quebec and the Maritimes wherever winters allow. Western redbud, a shrubbier species with the same flowers on bare wood, grows in the California foothills.",
  "whenToPick": "Harvest is the flowering, and it is short: two to three weeks between late March and mid-May as you move north — early April in Missouri and the Carolinas, late April to mid-May in southern Ontario and New England. Buds are picked tight and pink for pickling; open flowers for salads and cooking. The flat green pods are a two-week harvest just after flowering, while they are still soft, thin and under 5 cm (2 in); once they toughen they are done.",
  "partsUsed": "Flower buds, pickled in vinegar like capers. Open flowers, raw in salads, folded into pancake and muffin batter, lightly fried, or steeped for a pink syrup or jelly. The very young pods, cooked like snow peas. Leaves and bark are not eaten, and the mature brown pods and seeds are too tough and bitter to bother with.",
  "poisonous": "Nothing poisonous is recorded in redbud, and the flowers are eaten raw by the handful. The one real hazard is spraying: redbud is a common street and lawn tree, and lawn herbicides and insecticides end up on its flowers, so pick from trees you know are untreated.",
  "moreLookalikes": "Crabapples, ornamental cherries and plums bloom pink in the same weeks, but their flowers have five separate rounded petals on stalks at the twig tips and open with the leaves; redbud’s are pea-shaped and grow in clusters straight out of old bark. Black locust and wisteria carry white or purple pea flowers in long hanging chains with compound leaves. Western redbud (Cercis occidentalis), of California, Arizona and Utah, is treated the same way by foragers, though its use is far less documented than the eastern tree’s; the Pomo and other Californian peoples prize its red winter twigs for basketry.",
  "faqs": [
   {
    "q": "Are redbud flowers edible?",
    "a": "Yes — the magenta pea flowers and tight buds of eastern redbud are eaten raw, pickled, fried and baked into breads, with a mild, slightly tart, pea-like taste, once you have confirmed the tree by its flowers on bare bark and its heart-shaped leaves. Pick from trees you know have not been sprayed."
   },
   {
    "q": "How do you identify a redbud tree?",
    "a": "In April or May, by small rosy-magenta pea flowers sprouting in clusters directly from the twigs, branches and even the trunk before any leaves show — no other tree in the east does this. After flowering, by broad heart-shaped leaves with smooth edges and a swollen joint where the stalk meets the blade, and by flat bean pods 5–10 cm (2–4 in) long that hang on through winter. It is a small tree, rarely over 10 m (30 ft)."
   },
   {
    "q": "When do redbuds bloom?",
    "a": "Late March to mid-April in the southern US, mid-April in the Ohio valley and mid-Atlantic, and late April to mid-May in southern Ontario, Michigan and New England, each tree for about two to three weeks. The flowers come before the leaves and are darkest while still in bud. Western redbud in California flowers from February to April."
   },
   {
    "q": "Can you eat redbud pods?",
    "a": "The very young ones, yes — picked within a couple of weeks of flowering while they are flat, green, soft and shorter than your little finger, they can be stir-fried or steamed like snow peas. They toughen quickly; the papery brown pods that hang on the tree all winter are not worth eating."
   },
   {
    "q": "Does redbud grow wild in Canada?",
    "a": "Only on Pelee Island in Lake Erie, and even there Natural Resources Canada says it is ‘probably’ native rather than certainly. Those few wild trees should be left alone. Everywhere else in southern Ontario, Quebec and the Maritimes, the redbuds you see are planted — and a planted tree in your own yard or a friend’s is the best source of flowers."
   },
   {
    "q": "Are redbud flowers safe for children?",
    "a": "Yes, from a tree you know is unsprayed: redbud has no poisonous parts and the flowers are a good first wild taste for a child. The lesson to attach is the identification — flowers growing straight out of bark — so that a child does not transfer the habit to every pink tree, since cherry and plum pits, and the yews often planted beside them, are a different matter."
   }
  ],
  "sources": [
   {
    "label": "Missouri Department of Conservation — Eastern redbud",
    "url": "https://mdc.mo.gov/discover-nature/field-guide/eastern-redbud"
   },
   {
    "label": "Natural Resources Canada, Trees of Canada — Redbud",
    "url": "https://tidcf.nrcan.gc.ca/en/trees/factsheet/415"
   },
   {
    "label": "NC State Extension — Cercis canadensis",
    "url": "https://plants.ces.ncsu.edu/plants/cercis-canadensis/"
   },
   {
    "label": "Illinois Wildflowers — Redbud",
    "url": "https://www.illinoiswildflowers.info/trees/plants/redbud.htm"
   },
   {
    "label": "Lady Bird Johnson Wildflower Center — Cercis canadensis",
    "url": "https://www.wildflower.org/plants/result.php?id_plant=CECA4"
   },
   {
    "label": "Wikipedia — Cercis occidentalis (western redbud)",
    "url": "https://en.wikipedia.org/wiki/Cercis_occidentalis"
   }
  ]
 },
 "mayapple": {
  "otherNames": "May apple, American mandrake, wild lemon, hog apple, podophylle pelté or pomme de mai (Quebec).",
  "family": "Berberidaceae, the barberry family (which also includes blue cohosh and the barberries).",
  "range": "Native to the eastern deciduous forest: southern Ontario and south-western Quebec, with an outlying native population in Nova Scotia, and throughout the eastern US from New England to Minnesota, south to Georgia and Louisiana and west into the woodlands of eastern Kansas, Oklahoma and Texas. It is absent from the Florida peninsula and the West. Colonies spread by rhizome and can be decades old and hundreds of leaves wide.",
  "whenToPick": "Late July into August across the Great Lakes region and the mid-Atlantic, from late June in the South and into early September in Minnesota. The flower opens in May under the leaves; the fruit swells green through June and July while the colony’s leaves yellow and collapse around it, and it is ripe only when it has turned soft, yellow and strongly fragrant and comes away at a touch or is already lying on the ground. Colonies fruit sparsely — only the two-leaved plants flower, and only cross-pollinated flowers set — so a good patch may offer a dozen fruit.",
  "partsUsed": "The flesh of the fully ripe fruit only, pressed through a sieve to leave behind the seeds and the skin: a spoonful fresh, or juice, jelly, preserves and a syrup that tastes of lemon, pineapple and guava. Treat it as a flavouring rather than a meal. Leaves, stems, roots, seeds, rind and any fruit that is still green or firm are poisonous and never eaten.",
  "poisonous": "The whole plant except the ripe fruit flesh — leaves, stems, rhizome and roots, seeds, the rind, and unripe fruit — contains podophyllotoxin, a cell poison that causes vomiting, severe diarrhea and, in serious cases, damage to the liver, kidneys, nerves and blood; NC State rates it a high-severity poison and poisonings have been recorded since the 1800s. Handling the root can inflame the skin. Even ripe fruit eaten in quantity causes diarrhea in some people, so keep to a few, and spit out or strain the seeds.",
  "moreLookalikes": "No other eastern wildflower makes a palm-sized umbrella leaf on a single stalk, so the plant is rarely mistaken; the mistakes are about ripeness and about the fruit alone. A green mayapple found on the ground in July looks like a small unripe apple or a lime and is poisonous. Ground cherries (Physalis) ripen to yellow in the same woods but sit inside a papery husk on a bushy plant. Wild cucumber and bur cucumber hang green spiny pods from vines. The twinned leaves of blue cohosh and the umbrella of umbrella-leaf (Diphylleia, in the southern Appalachians) are the nearest leaf shapes; neither has an edible fruit.",
  "faqs": [
   {
    "q": "Is mayapple fruit edible?",
    "a": "Only when fully ripe — soft, yellow, fragrant and usually fallen — and only the flesh, with the seeds and skin strained out. Ripe mayapple tastes of lemon and tropical fruit and is used for jelly, juice and a spoonful eaten fresh. Every other part of the plant, and any fruit still green or firm, contains podophyllotoxin and is poisonous."
   },
   {
    "q": "What parts of mayapple are poisonous?",
    "a": "Everything except the flesh of the ripe fruit: the leaves, stems, rhizome and roots, the seeds, the rind, and unripe fruit. The poison is podophyllotoxin, which causes severe vomiting and diarrhea and can injure the liver, kidneys and nerves. Touching the root can also inflame the skin. Eating too many ripe fruit gives some people diarrhea."
   },
   {
    "q": "When are mayapples ripe?",
    "a": "Late July and August in southern Ontario, Quebec, New York and the Great Lakes states; late June and July from Missouri south; into early September in Minnesota. Do not go by the calendar — a ripe fruit is yellow with no green left, soft enough to dent, smells sweet from a step away, and drops into your hand. If you have to tug, leave it."
   },
   {
    "q": "How do you identify mayapple?",
    "a": "By colonies of knee-high umbrella leaves, each 20–40 cm (8–16 in) across and cut into five to nine deep lobes, one leaf per stalk on the young plants and two on the mature ones. A single nodding white flower 3–5 cm (1–2 in) across opens in the fork of the two-leaved plants in May, hidden under the leaves, and becomes an egg-shaped fruit 3–5 cm (1½–2 in) long. No other common eastern wildflower makes an umbrella leaf on one stalk; the look-alikes below are the few that come close."
   },
   {
    "q": "Is mayapple dangerous for children?",
    "a": "Yes, and this is the plant to teach. Mayapple grows in parks, school woodlots and backyards, and its green summer fruit looks like a small apple or lime — a child who eats one unripe, or chews the leaves, can be seriously poisoned. The rule for kids is simple: never a green one, never off the plant, and nothing from this plant at all without an adult who knows it. If a child has eaten any part, call poison control."
   },
   {
    "q": "Is mayapple poisonous to dogs?",
    "a": "Yes — leaves, roots and unripe fruit poison dogs as they do people, and a dog that digs up and chews a rhizome can become very ill with vomiting and diarrhea. Keep dogs from chewing in a mayapple colony and call a vet if one has."
   },
   {
    "q": "Who eats mayapple fruit in the wild?",
    "a": "Eastern box turtles above all, which find the fallen fruit by smell and spread the seed through their droppings; raccoons, opossums and some birds take it too. A fallen fruit you leave behind is a turtle’s meal and a colony’s only way of travelling, so take a few and leave most."
   }
  ],
  "sources": [
   {
    "label": "NC State Extension — Podophyllum peltatum",
    "url": "https://plants.ces.ncsu.edu/plants/all/podophyllum-peltatum/"
   },
   {
    "label": "Missouri Department of Conservation — Mayapple",
    "url": "https://mdc.mo.gov/discover-nature/field-guide/mayapple"
   },
   {
    "label": "Illinois Wildflowers — Mayapple",
    "url": "https://www.illinoiswildflowers.info/woodland/plants/mayapple.htm"
   },
   {
    "label": "Minnesota Wildflowers — Mayapple",
    "url": "https://www.minnesotawildflowers.info/flower/mayapple"
   },
   {
    "label": "VASCAN (Database of Vascular Plants of Canada) — Podophyllum peltatum",
    "url": "https://data.canadensys.net/vascan/name/Podophyllum%20peltatum"
   }
  ]
 },
 "spicebush": {
  "otherNames": "Northern spicebush, wild allspice, Benjamin bush, feverbush, benjoin (Quebec).",
  "family": "Lauraceae, the laurel family (which also includes sassafras, bay laurel, cinnamon and avocado).",
  "range": "Native to the eastern deciduous forest from southern Ontario and southern Maine through New England, the mid-Atlantic and the Appalachians, west across Ohio, Indiana and Illinois to Missouri and eastern Oklahoma, and south to the Carolinas, Georgia, Louisiana and east Texas. In Canada it grows only in the Carolinian woods of south-western Ontario. It is a shrub of damp, rich ground — stream banks, floodplain forest and ravine bottoms — where it can be the commonest thing in the understory.",
  "whenToPick": "Twigs and leaves at any time of year: the twigs are at their most fragrant in late winter and early spring, when the yellow flowers open on bare wood in March or April, and the leaves from May to the first frost. Berries ripen from green through red in late August and September, hanging only on female shrubs, and are at full flavour when glossy, deep red and slightly soft; birds strip them fast, so September is the month. Pick a few twig tips from each of many bushes.",
  "partsUsed": "Young twigs and leaves, fresh or dried, simmered or steeped for a lemony, spicy tea. The ripe red berries, dried whole on a screen until the flesh is hard, then ground seed and all as a hot, peppery allspice for baking, sausages, squash and chai; fresh berries can also be frozen. The whole dried berry keeps its flavour better than ground. Nothing on the shrub is poisonous, but the oily berries go rancid if stored moist.",
  "moreLookalikes": "Sassafras is the close relative: spicy twigs too, but with lobed ‘mitten’ leaves on a tree, and dark blue fruit in red cups. Bush honeysuckles (Lonicera tatarica, L. morrowii and their hybrids), invasive across the same range, are the shrub most often confused: opposite leaves, hollow older twigs and translucent red or orange berries in pairs at the leaf joints that are mildly poisonous and taste bitter; crushed, they smell of nothing in particular. Winterberry holly (Ilex verticillata) keeps bright red berries tight along the twig into winter in the same swamps, with toothed leaves and no scent, and its berries cause vomiting. Spicebush leaves are alternate and smooth-edged, its twigs solid, and a scratched twig smells unmistakably of allspice and lemon.",
  "faqs": [
   {
    "q": "Is spicebush edible?",
    "a": "Yes — the twigs and leaves of spicebush make a traditional tea and the dried red berries are ground as a wild allspice, once you have confirmed the shrub by the sharp, spicy-citrus smell of a scratched twig. There is nothing poisonous on the plant; the smell is what separates it from the red-berried honeysuckles and hollies that grow beside it."
   },
   {
    "q": "How do you identify spicebush?",
    "a": "Scratch a twig: spicebush smells strongly and at once of allspice and lemon, and nothing else in the eastern understory does. Beyond that, a loose rounded shrub 2–4 m (6–12 ft) tall of damp woods, with smooth-edged oval leaves set alternately, slender twigs dotted with pale pores, clusters of tiny yellow flowers on bare wood in early spring, and on female plants glossy red oval berries about 1 cm (⅜ in) long in September."
   },
   {
    "q": "When do you pick spicebush berries?",
    "a": "September, in most of its range — late August in the South, into early October in southern Ontario and New England — when the berries have turned fully red and glossy and give slightly under the thumb. Only female shrubs fruit, and birds take the crop within a couple of weeks of ripening. Dry them whole on a screen out of the sun until they are hard, then grind as you need them."
   },
   {
    "q": "What looks like spicebush but is poisonous?",
    "a": "The invasive bush honeysuckles, whose red or orange berries come in pairs at the leaf joints on hollow twigs with leaves in opposite pairs; they are mildly poisonous and cause vomiting and diarrhea. Winterberry holly holds red berries tight to the twig through the winter, has toothed leaves and is poisonous too. Neither has any spice smell when a twig is scratched. No smell, no spicebush."
   },
   {
    "q": "How do you make spicebush tea?",
    "a": "Snip a small handful of twig tips, 10–15 cm (4–6 in) long, cut them into short lengths and simmer them gently in a litre (quart) of water for 15 to 20 minutes, or steep fresh or dried leaves in hot water for 10 minutes. The tea is pale, lemony and warming. Spicebush has been drunk this way in the eastern woodlands for a very long time; enjoy it as a drink, not as a remedy."
   },
   {
    "q": "Is spicebush safe for children?",
    "a": "Yes — there is nothing poisonous on a spicebush, and a child can learn the smell test and the red oval berries. The lesson to pair with it is that red berries in the same woods are not all alike: honeysuckle’s paired, see-through berries and winterberry’s tight red beads will make a child sick, so the rule is ‘scratch and smell with a grown-up before anything goes in your mouth’."
   }
  ],
  "sources": [
   {
    "label": "NC State Extension — Lindera benzoin",
    "url": "https://plants.ces.ncsu.edu/plants/lindera-benzoin/"
   },
   {
    "label": "Illinois Wildflowers — Spicebush",
    "url": "https://www.illinoiswildflowers.info/trees/plants/spicebush.htm"
   },
   {
    "label": "NC State Extension — Lonicera tatarica (Tatarian honeysuckle)",
    "url": "https://plants.ces.ncsu.edu/plants/lonicera-tatarica/"
   },
   {
    "label": "NC State Extension — Ilex verticillata (winterberry)",
    "url": "https://plants.ces.ncsu.edu/plants/ilex-verticillata/"
   },
   {
    "label": "VASCAN (Database of Vascular Plants of Canada) — Lindera benzoin",
    "url": "https://data.canadensys.net/vascan/name/Lindera%20benzoin"
   }
  ]
 },
 "sassafras": {
  "otherNames": "White sassafras, cinnamon wood, mitten tree, sassafras officinal (Quebec). The dried, ground young leaves are filé or gumbo filé.",
  "family": "Lauraceae, the laurel family (which also includes spicebush, bay laurel, cinnamon and avocado).",
  "range": "Native from southern Maine and extreme south-western Ontario west to Michigan, Illinois and Iowa, and south through the whole eastern US to central Florida and east Texas; historic stands in southern Wisconsin are gone. In Canada it grows wild only in the Carolinian zone of Ontario, around Lake Erie and the Niagara peninsula, where it is uncommon. It is a tree of old fields, fencerows and sandy, acid soils — a thicket-forming shrub at the northern edge and a tree of 20 m (65 ft) or more in the southern Appalachians.",
  "whenToPick": "Young leaves for filé from late May through July, picked while still tender and pale green, then dried out of the sun and ground fine. Root bark, where people still dig it, is traditionally taken in early spring or late autumn from the shallow lateral roots of a sucker in a thicket, so that the parent tree is undisturbed. Twigs can be chewed or steeped at any time of year, and the dark blue fruit of September is for birds, not people.",
  "partsUsed": "The leaves, dried and powdered as filé, which thickens and scents gumbo and contains little or no safrole — this is the use to favour. Young leaves and twig tips chewed fresh for their lemon-spice taste. The root bark, steeped for the traditional red tea or an old-fashioned root beer, carries most of the tree’s safrole and is the part US food law restricts. Wood and bark of the trunk are not used.",
  "poisonous": "Sassafras root bark and its oil are rich in safrole, which caused liver cancer in rats and mice and is listed by the US National Toxicology Program as reasonably anticipated to be a human carcinogen; the FDA banned safrole and sassafras oil from food in 1960 and still deems any food containing sassafras bark, such as sassafras tea, adulterated (21 CFR 189.180). The leaves, by contrast, were found in a 1997 analysis to contain no detectable safrole, which is why filé stays on the shelf. The honest summary: the cancer evidence is from animals given large doses, no one has shown harm from an occasional cup, and no one has shown it safe either. Daily root tea, root tea for children, and root tea in pregnancy are the uses to drop.",
  "moreLookalikes": "Red mulberry and white mulberry grow mitten and three-lobed leaves on the same tree too, but their leaves are toothed around the edge, sandpapery or glossy, and a broken leaf stalk oozes milky sap; their twigs do not smell of root beer, and their fruit is a blackberry-like cluster. Young tulip trees have big four-pointed leaves with a notched, squared-off tip. Spicebush, the sister shrub, has the spicy smell but only unlobed leaves and red berries. None of these is dangerous; the point is that only sassafras should be used as sassafras.",
  "faqs": [
   {
    "q": "Is sassafras tea safe to drink?",
    "a": "Root-bark tea is the one traditional wild drink with a real, documented caution: the root bark is rich in safrole, which caused liver cancer in laboratory rodents, and the US FDA has barred safrole and sassafras bark from food since 1960. No one has shown harm from an occasional cup, and no one has shown it safe; the sensible line is rare and weak, never daily, never for children or in pregnancy. The leaves contain little or no safrole, so filé is the part to enjoy freely."
   },
   {
    "q": "Why is sassafras banned?",
    "a": "Because of safrole, the main component of the root’s oil. In 1960 the FDA prohibited safrole and sassafras oil as food additives after they produced liver tumours in rats, and the regulation still in force (21 CFR 189.180) treats any food that contains sassafras bark, such as sassafras tea, as adulterated. Root beer has been flavoured with synthetic or safrole-free extracts ever since. Filé, made from the leaves, is not covered because the leaves carry little or no safrole."
   },
   {
    "q": "How do you identify a sassafras tree?",
    "a": "By three leaf shapes on one tree: a plain oval, a two-lobed ‘mitten’ with a thumb, and a three-lobed leaf, all smooth-edged, often on one twig. The young twigs are bright green and smell of root beer or lemon when scratched or snapped; the bark on old trunks is deeply furrowed and reddish-brown. Female trees carry dark blue oval fruit on bright red stalks in September. It suckers into thickets along old fencerows."
   },
   {
    "q": "What is filé powder and how do you make it?",
    "a": "Filé is the dried, finely ground young leaf of sassafras, first used by the Choctaw of the lower Mississippi and adopted into Louisiana gumbo, where a spoonful stirred in off the heat thickens the pot and gives it a faint root-beer scent. Pick tender leaves in late spring or early summer, dry them flat out of the sun until crisp, strip out the stalks and veins, grind fine and sift. Because the leaves contain little or no safrole, filé is sold and eaten freely."
   },
   {
    "q": "What looks like sassafras?",
    "a": "Mulberry, which can carry mitten-shaped and three-lobed leaves on the same tree — but mulberry leaves are toothed, the leaf stalk bleeds milky sap when snapped, and the twigs have no root-beer smell. Young tulip trees have squared-off, four-pointed leaves. Spicebush has the spicy smell on a shrub with unlobed leaves and red berries. None of these is poisonous, but none is sassafras."
   },
   {
    "q": "Is it safe for kids to chew sassafras twigs?",
    "a": "A twig chewed on a walk now and then is a small exposure and a long tradition, but given the safrole in the tree it is not something to make a habit of, and root-bark tea should not be given to children at all. If children want the taste, let them help make filé from the leaves, which carry little or no safrole. Teach them, too, that the dark blue berries are for birds."
   }
  ],
  "sources": [
   {
    "label": "NC State Extension — Sassafras albidum",
    "url": "https://plants.ces.ncsu.edu/plants/sassafras-albidum/"
   },
   {
    "label": "Illinois Wildflowers — Sassafras",
    "url": "https://www.illinoiswildflowers.info/trees/plants/sassafras.htm"
   },
   {
    "label": "21 CFR § 189.180 — Safrole (Cornell Legal Information Institute)",
    "url": "https://www.law.cornell.edu/cfr/text/21/189.180"
   },
   {
    "label": "Memorial Sloan Kettering Cancer Center — Sassafras",
    "url": "https://mskcc.org/cancer-care/integrative-medicine/herbs/sassafras"
   },
   {
    "label": "Wikipedia — Filé powder (safrole in leaves; Choctaw origin)",
    "url": "https://en.wikipedia.org/wiki/Fil%C3%A9_powder"
   },
   {
    "label": "VASCAN (Database of Vascular Plants of Canada) — Sassafras albidum",
    "url": "https://data.canadensys.net/vascan/name/Sassafras%20albidum"
   }
  ]
 },
 "autumn-olive": {
  "otherNames": "Autumnberry, Japanese silverberry, oleaster, chalef en ombelles (Quebec). Russian olive (Elaeagnus angustifolia) is the western relative; silverberry (E. commutata) the native one.",
  "family": "Elaeagnaceae, the oleaster family (which also includes Russian olive, silverberry and the buffaloberries).",
  "range": "Introduced from east Asia in the 1800s and planted by the million through the twentieth century for erosion control, mine reclamation and ‘wildlife food’. It is now invasive from New England and southern Ontario through the mid-Atlantic, the Appalachians and the whole Midwest to Nebraska and Kansas, south to the Carolinas and Tennessee, with newer footholds in Nova Scotia, New Brunswick, Minnesota and the Pacific Northwest. Michigan and several other states list it as restricted or prohibited; Minnesota lists it as a Restricted noxious weed — no sale or transport. Expect it on roadsides, highway banks, old fields, pasture edges and reclaimed strip mines.",
  "whenToPick": "Late September and October in southern Ontario, Quebec and the northern US, from mid-September in the mid-Atlantic. The berries turn red in late summer but stay chalky and astringent for weeks; wait until they are deep red, soft, and sweet-tart rather than mouth-drying — usually after the first frost — and strip them from the twig by the handful. A heavy bush gives kilograms, and the fruit hangs into November if the birds leave it.",
  "partsUsed": "The ripe berries, eaten fresh, or run through a food mill to leave the single soft seed behind: the pulp makes juice, a bright red fruit leather, sauce, jam and a sorbet, and freezes well. The seed is harmless but chewy. Leaves and flowers are not eaten. Autumn olive fruit was found by USDA researchers to carry up to 17 times the lycopene of a raw tomato, which is a pleasant fact about a free fruit, not a reason to eat it.",
  "poisonous": "Nothing in the plant is poisonous. Two practical cautions: unripe berries are astringent enough to upset a stomach if eaten in quantity, and because the shrub was planted on reclaimed mines and roadsides, Penn State notes it can move metals from contaminated soil into its fruit — so pick from old fields and pasture edges rather than mine spoil or the shoulder of a highway.",
  "moreLookalikes": "Russian olive (Elaeagnus angustifolia), the planted and invasive tree of the Prairies and the West, has long narrow silver leaves and mealy, yellowish-silver fruit, edible but dry. Silverberry (E. commutata), native across the Prairies and the north, is silver on both leaf faces and bears dry silver fruit. Thorny olive (E. pungens) is an evergreen invader of the South with fruit in spring. Among the red-berried natives, the autumn olive’s speckled, silver-scaled fruit and silver leaf undersides rule out dogwood, viburnum and holly at a glance, and the honeysuckles have paired, unspeckled berries and green leaves.",
  "faqs": [
   {
    "q": "Are autumn olive berries edible?",
    "a": "Yes — the small red berries of autumn olive, identified by their silver speckles and the silver undersides of the leaves, are edible and good once fully ripe, with a sweet-tart taste like a sour cherry. Picked too early they are chalky and astringent. There is nothing poisonous in the plant, and because it is invasive you can pick as much as you want."
   },
   {
    "q": "How do you identify autumn olive?",
    "a": "A spreading shrub 3–5 m (10–16 ft) tall with scattered thorns, leaves that are dull green above and silver-white underneath so that the bush flickers in wind, and in autumn thousands of small red berries, each finely dotted with silver or brown scales, each with one soft seed. In May it is covered in small cream trumpet flowers with a heavy sweet scent. Young twigs are silvery-brown and scaly."
   },
   {
    "q": "When are autumn olive berries ripe?",
    "a": "From late September into October across southern Canada and the northern US, often best right after the first frost; mid-September farther south. Colour alone misleads — the berries are red for weeks before they are ripe. Taste one: ripe fruit is soft and sweet-tart; unripe fruit dries your mouth out. Once ripe they strip off the twig by the handful."
   },
   {
    "q": "What looks like autumn olive but is poisonous?",
    "a": "Bush honeysuckle, which fruits red on roadsides at the same time: its berries are glossy and translucent, never speckled, hang in pairs at the leaf joints, and its leaves are green beneath, not silver — and they are mildly poisonous. Common buckthorn has black berries and green leaves. Any red berry dusted with silver scales on a silver-leaved shrub is an oleaster-family plant — autumn olive, or one of the native buffaloberries (Shepherdia), which have opposite leaves and are edible but bitter and best not eaten by the handful."
   },
   {
    "q": "Is it okay to pick autumn olive in a park or nature reserve?",
    "a": "Usually, and often welcomed — autumn olive is an invasive shrub that land managers cut and spray, and every berry picked is a seed not planted by a bird. Rules on harvesting still apply in national, provincial and state parks, so ask; many conservation areas run autumn olive pulls and are glad of pickers. Never plant it, compost whole berries, or move the seed."
   },
   {
    "q": "Is autumn olive safe for children and dogs?",
    "a": "Yes — the ripe berries are harmless to both, and the seed passes through. The useful lesson is the tell: silver speckles and a silver leaf underside mean autumn olive, while a shiny, unspeckled red berry in pairs is honeysuckle and goes in the bin. Keep children off busy roadsides, where most of these bushes grow."
   }
  ],
  "sources": [
   {
    "label": "Penn State Extension — Autumn olive",
    "url": "https://extension.psu.edu/autumn-olive"
   },
   {
    "label": "Minnesota Wildflowers — Autumn olive",
    "url": "https://www.minnesotawildflowers.info/shrub/autumn-olive"
   },
   {
    "label": "NC State Extension — Elaeagnus umbellata",
    "url": "https://plants.ces.ncsu.edu/plants/elaeagnus-umbellata/"
   },
   {
    "label": "USDA Agricultural Research Service (2001) — Tiny berry tops tomatoes in lycopene",
    "url": "https://www.ars.usda.gov/news-events/news/research-news/2001/tiny-berry-tops-tomatoes-in-lycopene/"
   },
   {
    "label": "Michigan Invasive Species Program — Autumn olive",
    "url": "https://www.michigan.gov/en/invasives/id-report/plants/shrubs/autumn-olive"
   },
   {
    "label": "VASCAN (Database of Vascular Plants of Canada) — Elaeagnus umbellata",
    "url": "https://data.canadensys.net/vascan/name/Elaeagnus%20umbellata"
   }
  ]
 },
 "fireweed": {
  "otherNames": "Rosebay willowherb (Britain), great willow-herb in some older North American books, épilobe à feuilles étroites (Quebec). Botanists have shuffled it between Epilobium angustifolium and Chamerion angustifolium; Chamaenerion is the current name and all three refer to the same plant.",
  "family": "Onagraceae, the evening-primrose family (which also includes the other willowherbs and fuchsia).",
  "range": "Native and abundant across the whole boreal belt from Alaska and Yukon to Labrador and Newfoundland, south through the Rockies, Cascades and coast ranges, and around the Great Lakes and St. Lawrence. In the east it thins out south of the Adirondacks and northern New England and is mostly a plant of high ground in the Appalachians. It is famous for carpeting burns and clear-cuts in the first few summers after a fire.",
  "whenToPick": "Two short seasons. Shoots: April–May in southern Ontario and Quebec, late May to June across the boreal north and in the mountains, while they are 15–30 cm (6–12 in) tall, still tender and snap cleanly; once the stem turns fibrous, stop. Flowers and buds: July into August in the middle of the range, with the spike opening from the bottom up, so a patch gives flowers for several weeks. Leaves for tea are best before flowering.",
  "partsUsed": "Young shoots, steamed or sautéed like asparagus (peel older ones). Young leaves, raw in small amounts or dried for tea. Flower buds and open flowers, raw in salads, or infused for jelly, syrup and a pale ‘fireweed honey’ made with sugar. The pith of mature stems is sweet and can be scraped out. The seed fluff and tough old stems are not used.",
  "poisonous": "Nothing poisonous, but mature leaves and strong tea are mildly laxative in quantity, and the raw leaves are bitter later in the season. Start small.",
  "moreLookalikes": "Dogbane (Apocynum) and common milkweed (Asclepias syriaca) are the spring risk, when all three come up as leafy shoots on disturbed ground. Both bleed white milky sap the moment a stem or leaf is snapped; fireweed’s sap is clear. Dogbane is poisonous and bitter; milkweed shoots are eaten by some foragers after boiling but should not be mistaken for fireweed. Later in the year the big-leaved willowherbs (Epilobium) are harmless relatives with smaller flowers, and purple loosestrife is covered in the main entry.",
  "faqs": [
   {
    "q": "Is fireweed edible?",
    "a": "Yes — once identified by its four-petalled magenta flowers, alternate leaves and the vein that loops along the leaf edge, every green part of fireweed has been eaten: shoots, young leaves, buds and flowers. It is a traditional spring vegetable across Alaska and the north. Nothing about it is poisonous, though strong tea is mildly laxative."
   },
   {
    "q": "How do you tell fireweed from purple loosestrife?",
    "a": "Count petals and feel the stem. Fireweed flowers have four broad petals on a round, often reddish stem with alternate leaves; purple loosestrife has five to seven narrow petals crowded into a tighter, darker spike on a square stem with opposite or whorled leaves. Loosestrife is an invasive wetland weed, not poisonous but not food, and worth reporting."
   },
   {
    "q": "When do you pick fireweed shoots?",
    "a": "In spring while the shoots are 15–30 cm (6–12 in) tall and snap cleanly — April or May in the south of its range, late May to June in the boreal north and the mountains. Once the stem is woody and the leaves have toughened the season is over. Flowers follow in July and August."
   },
   {
    "q": "What is fireweed jelly?",
    "a": "A rose-coloured jelly made by steeping the flowers in hot water, straining, and setting the infusion with sugar and pectin; it is a Yukon and Alaska staple sold at summer markets. Pick open, undamaged flowers from the lower half of the spike in July–August and leave the buds above to keep opening. The same infusion sweetened and reduced is sold as fireweed ‘honey’ or syrup."
   },
   {
    "q": "What looks like fireweed shoots in spring?",
    "a": "Dogbane and milkweed shoots, which come up on the same roadsides and disturbed ground. Snap one: dogbane and milkweed ooze milky white sap, and dogbane is poisonous. Fireweed shoots have clear sap, a reddish tinge, and narrow leaves with a pale midrib."
   },
   {
    "q": "Is fireweed safe for children to pick?",
    "a": "Yes, with the milky-sap rule. Fireweed is a good plant for children to learn: the summer flowers are unmistakable and a nibbled petal does no harm. For spring shoots, teach them to snap a stem and look for sap — milky white means put it down."
   }
  ],
  "sources": [
   {
    "label": "University of Alaska Fairbanks Cooperative Extension — Fireweed (FNH-00106)",
    "url": "https://uaf.edu/ces/publications/database/food/files/pdfs/FNH-00106-Fireweed-02-23-24.pdf"
   },
   {
    "label": "South Dakota State University Extension — What’s the difference between fireweed and purple loosestrife?",
    "url": "https://extension.sdstate.edu/plant-look-alikes-whats-difference-between-fireweed-and-purple-loosestrife"
   },
   {
    "label": "PEI Untamed — Fireweed",
    "url": "https://www.pei-untamed.com/post/fireweed"
   },
   {
    "label": "Wikipedia — Chamaenerion angustifolium",
    "url": "https://en.wikipedia.org/wiki/Chamaenerion_angustifolium"
   }
  ]
 },
 "lingonberry": {
  "otherNames": "Partridgeberry and redberry (Newfoundland and Labrador), foxberry (Nova Scotia), mountain cranberry, rock cranberry, lowbush cranberry (Alaska), cowberry (Britain), airelle rouge (Quebec). The North American plant is the small-leaved subspecies minus. Not the same plant as the paired-leaf partridgeberry (Mitchella repens) of eastern woods.",
  "family": "Ericaceae, the heath family (which also includes blueberries, cranberries, bearberry and Labrador tea).",
  "range": "Native across the whole north: Alaska, Yukon and all of boreal Canada east to Newfoundland and Labrador, and south into the Maritimes, northern Maine and New Hampshire, the Adirondacks, the Lake Superior shore of Minnesota, Wisconsin and Michigan, interior British Columbia and the Alberta Rockies. Newfoundland’s coastal barrens carry the biggest wild crop on the continent and a commercial partridgeberry harvest.",
  "whenToPick": "Late August into October, later than blueberries. The berries turn from white to a deep, even red and are at their best after the first hard frost, which softens the skin and takes down the acid — Newfoundlanders pick through October and into early November. Firm red berries hang on the plant through winter and can even be picked from under snow in spring, flavour intact if a little mushy.",
  "partsUsed": "Only the berries. They are too tart to eat by the handful but need no pectin and little cooking: sauce, jam, juice, partridgeberry pie and muffins, or simply mixed with sugar and left in the fridge, where they keep for weeks because of their natural benzoic acid. Leaves are not used for food.",
  "poisonous": "Nothing poisonous in the plant itself; the only risk is the red-berried look-alikes, above all baneberry.",
  "moreLookalikes": "Bunchberry (Cornus canadensis) grows in the same woods with red berries, but they sit in a bunch above a whorl of four to six broad leaves on a soft stem; edible but mealy. Wild cranberries (Vaccinium oxycoccos, V. macrocarpon) are relatives with larger, hollow-feeling berries on thread-thin vines in open bog. Wintergreen (Gaultheria procumbens) has single red berries and leaves that smell of wintergreen when crushed; edible. All three are harmless mistakes — the plant to rule out is baneberry, covered in the main entry.",
  "faqs": [
   {
    "q": "When do you pick partridgeberries in Newfoundland?",
    "a": "From mid-September through October and into early November, after the first frost has sweetened them. The province’s own berry guide puts prime picking in October and early November. Earlier berries are hard, pale and very sour; a frosted berry is dark red, slightly soft and comes away with a light pull."
   },
   {
    "q": "How do you identify lingonberry?",
    "a": "By a creeping evergreen mat 5–20 cm (2–8 in) high with small, thick, glossy leaves whose edges roll under, pale beneath with scattered dark bristly dots; look for the dots with a hand lens if you are unsure. The flowers are tiny white-to-pink bells with four fused petals, and the berries are firm, red and in small clusters at the shoot tips. Bearberry has no dots and five-petalled urn flowers."
   },
   {
    "q": "Is bearberry the same as lingonberry?",
    "a": "No, though they are often mixed up. Bearberry or kinnikinnick (Arctostaphylos uva-ursi) is a trailing evergreen of sandy and rocky ground with red berries that are edible but dry, mealy and nearly tasteless; its leaves are flat, spoon-shaped and unspotted underneath. Lingonberry grows in a denser upright mat, has rolled leaf edges with dark dots beneath, and its berries are juicy and tart."
   },
   {
    "q": "Can you eat lingonberries raw?",
    "a": "Yes, once identified — they are simply very tart until frost and most people prefer them cooked or sugared. In Scandinavia and Newfoundland the traditional way is to stir raw berries with sugar and let them stand, which makes a thick spreadable sauce without cooking. The seeds are tiny and eaten."
   },
   {
    "q": "Are lingonberries safe for children?",
    "a": "Yes, and they are a good berry for children because the plant is low, the berries are firm and the taste is sharp enough that nobody eats too many. The rule to teach is the plant, not the colour: red berries on a glossy evergreen mat, never red berries on a leafy upright plant with divided leaves, which could be baneberry."
   },
   {
    "q": "Where do lingonberries grow?",
    "a": "Across the boreal forest and tundra of Canada and Alaska and south into northern New England, the Great Lakes shore and the western mountains. Look on acidic, well-drained ground: coastal barrens and headlands, open spruce and jack-pine woods, rock outcrops and the drier hummocks in bogs. They often grow with crowberry, bearberry and reindeer lichen."
   }
  ],
  "sources": [
   {
    "label": "Minnesota Wildflowers — Lingonberry (Vaccinium vitis-idaea)",
    "url": "https://www.minnesotawildflowers.info/shrub/lingonberry"
   },
   {
    "label": "USDA Forest Service Fire Effects Information System — Vaccinium vitis-idaea",
    "url": "https://www.fs.usda.gov/database/feis/plants/shrub/vacvit/all.html"
   },
   {
    "label": "Dalhousie University Wild Blueberry Network — Lingonberry (partridgeberry) in Newfoundland and Labrador",
    "url": "https://dal.ca/sites/wild-blueberry/resources/otherwildberries/lingonberries.html"
   },
   {
    "label": "Newfoundland and Labrador Tourism — All about berries",
    "url": "https://www.newfoundlandlabrador.com/trip-ideas/travel-stories/all-about-berries"
   },
   {
    "label": "University of Wisconsin Horticulture Extension — Baneberry (Actaea spp.)",
    "url": "https://hort.extension.wisc.edu/articles/baneberry-actaea-spp/"
   }
  ]
 },
 "cloudberry": {
  "otherNames": "Bakeapple (Newfoundland and Labrador), aqpik (Inuktitut and Iñupiaq; appik, arpik in other dialects), atsalugpiaq and other names in Yup’ik, chicouté and plaquebière (Quebec), salmonberry (western Alaska only — elsewhere that name means Rubus spectabilis), baked-apple berry, knotberry, multebær.",
  "family": "Rosaceae, the rose family — it is a Rubus, a true relative of raspberries, though it makes no canes.",
  "range": "Native around the whole circumpolar north. In North America: Alaska, Yukon, the Northwest Territories and Nunavut, across the boreal provinces to Quebec, Labrador, Newfoundland and the Maritimes, and south in bogs to northern Maine, New Hampshire, the Adirondacks and, barely, northeastern Minnesota, where it is listed as threatened. Along the Pacific it follows coastal muskeg down the Alaska panhandle into British Columbia.",
  "whenToPick": "Late July to early September, a two- or three-week window in any one bog. In Labrador and northern Quebec the berries ripen in late July and August; across the island of Newfoundland mid-August to September; in Alaska when the salmon are running. Ripeness is colour and feel: hard red is unripe, and a ripe berry is soft, translucent amber-gold and slides off its stalk. Male and female flowers are on separate plants, so some patches flower every year and never fruit.",
  "partsUsed": "Only the berry, which is eaten whole with its large soft seeds. Fresh with cream or in Newfoundland bakeapple jam and sauce, in cheesecake, folded into akutaq in Alaska, or simply frozen; the berries are high in benzoic acid and keep remarkably well. The leaves and roots are not food.",
  "moreLookalikes": "Bunchberry (Cornus canadensis) shares the bog edge with a bunch of red berries above a whorl of leaves; edible, bland. Cranberries trail through the same moss with small red berries on thread-like vines; edible. Baneberry (Actaea) is poisonous but grows in rich woods, not open bog, as a bushy herb with compound leaves and stalked clusters of glossy red or white berries. None of them is amber.",
  "faqs": [
   {
    "q": "When is bakeapple season in Newfoundland and Labrador?",
    "a": "Mid-August through September on the island, and from late July in Labrador and the Great Northern Peninsula. Forteau in Labrador holds its Bakeapple Folk Festival in the second week of August, which is about peak. The berry is ripe when it has turned from red to soft amber and lets go of the stalk with a touch."
   },
   {
    "q": "How do you identify cloudberry?",
    "a": "By a single short stalk from the moss carrying two or three rounded, shallowly lobed leaves, one white flower in June and later one berry; there are no thorns, no canes and no clusters. The berry looks like a fat raspberry that ripens the wrong way, from red to amber. It grows only in sphagnum bog, muskeg and wet tundra."
   },
   {
    "q": "Why are red cloudberries hard and sour?",
    "a": "Because they are not ripe. Cloudberries begin red and firm and ripen to soft, translucent amber, the opposite of most berries, so beginners pick them too early. Leave red berries on the plant; they will be ready within a week or two. Ripe ones are so soft they should go into a hard-sided container, not a bag."
   },
   {
    "q": "Is a cloudberry the same as a salmonberry?",
    "a": "Only in western and northern Alaska, where ‘salmonberry’ is the everyday name for cloudberry because it ripens as the salmon run. Everywhere else, including coastal BC, Washington and southern Alaska, salmonberry means Rubus spectabilis, a tall thorny shrub with magenta flowers and orange-to-red raspberry-like fruit in June. Both are edible; just ask which plant someone means."
   },
   {
    "q": "Can you pick bakeapples anywhere?",
    "a": "Not in national or provincial parks and reserves, and not politely on a bog that a community or family has picked for generations — ask locally. Elsewhere on Crown land in Newfoundland and Labrador, Quebec and the territories, picking for your own table is allowed. Walk on the firm hummocks, pick only ripe berries, and leave plenty."
   },
   {
    "q": "Are cloudberries safe for children?",
    "a": "Yes — once identified, nothing about the plant is harmful and the soft, seedy berries are easy to eat. Bogs themselves are the hazard: wet holes, deep moss and in the north, bears picking the same patch. Keep small children on the hummocks and make noise."
   }
  ],
  "sources": [
   {
    "label": "Minnesota Wildflowers — Cloudberry (Rubus chamaemorus)",
    "url": "https://minnesotawildflowers.info/shrub/cloudberry"
   },
   {
    "label": "USDA Forest Service Fire Effects Information System — Rubus chamaemorus",
    "url": "https://www.fs.usda.gov/database/feis/plants/shrub/rubcha/all.html"
   },
   {
    "label": "Newfoundland and Labrador Tourism — All about berries",
    "url": "https://www.newfoundlandlabrador.com/trip-ideas/travel-stories/all-about-berries"
   },
   {
    "label": "SIKU (Inuit Knowledge Wiki) — Aqpik / Cloudberry",
    "url": "https://dev.siku.org/siku/profiles/wildlife/141/"
   },
   {
    "label": "Edible Alaska — Cloudberry sea",
    "url": "https://ediblealaska.ediblecommunities.com/food-thought/food-thought-cloudberry-sea/"
   }
  ]
 },
 "labrador-tea": {
  "otherNames": "Bog Labrador tea, Hudson’s Bay tea, muskeg tea (kâkikêpakwa and maskêkopakwa in Cree), mamaittuqutik (Inuktitut), thé du Labrador and lédon du Groenland (Quebec); formerly Ledum groenlandicum. Northern Labrador tea (R. tomentosum) replaces it in the Arctic and western Labrador tea / trapper’s tea (R. columbianum) in the western mountains, both used the same way with the same cautions.",
  "family": "Ericaceae, the heath family (which also includes the toxic bog laurel, sheep laurel and bog rosemary it grows beside, and the blueberries).",
  "range": "Native in every province and territory of Canada, from the Yukon and Northwest Territories to Newfoundland and Labrador, and across Alaska. In the US it follows peatland south through New England, the Adirondacks, northern Pennsylvania and New Jersey’s pine barrens, the upper Great Lakes states, and the mountains of Idaho, Montana, Washington and Oregon. Wherever there is sphagnum and black spruce, it is usually there.",
  "whenToPick": "The leaves are evergreen and can be gathered whenever the bog is reachable, but the safest time to learn and pick is June, when the white flower clusters confirm the plant and the pink-flowered laurels beside it are also in bloom and easy to rule out. New leaves are pale and lightly woolly; the rusty felt thickens through the summer. Many northern households gather in late summer and dry the leaves for the year.",
  "partsUsed": "Leaves only, fresh or dried, a few per cup. Pour water that has just boiled over them and steep 5–10 minutes, no longer, and do not boil or simmer the leaves. Flowers, stems and roots are not used. Keep it to a weak cup, not a daily pot.",
  "poisonous": "The whole plant contains ledol and grayanotoxins, the same family of compounds as in rhododendrons and mountain laurel. In weak, briefly steeped tea the amount is small; strong tea, boiled leaves, or several cups can cause headache, dizziness, vomiting, slowed pulse, low blood pressure and, at the extreme, cramps and loss of coordination. Pharmacological references note that safety in pregnancy and breastfeeding has not been established; the cautious tradition is to avoid it then, and to keep it from young children. Honey made from these heaths can carry the same toxins.",
  "moreLookalikes": "Sheep laurel or lambkill (Kalmia angustifolia) is the most dangerous because it is so common on the same ground: opposite or whorled leaves, flat and pale green beneath with no wool, and deep pink saucer flowers in a ring below the new growth; it has killed livestock and sickened people. Bog rosemary (Andromeda polifolia and A. glaucophylla) has narrow, needle-like blue-green leaves, powdery white and hairless beneath, with pink urn flowers; poisonous. Leatherleaf (Chamaedaphne calyculata) has small brown-scurfy leaves and a row of white bells; not toxic in the same way but not a tea plant. Every one of them fails the rusty-wool test.",
  "faqs": [
   {
    "q": "How do you identify Labrador tea?",
    "a": "Turn a mature leaf over. Labrador tea has a dense rusty-orange felt covering the underside, leaf edges that roll under, alternate (not paired) leaves, and rounded clusters of small white flowers in June. The wool is the whole identification: pale, smooth, white or powdery undersides belong to the poisonous laurels and bog rosemary."
   },
   {
    "q": "Is Labrador tea poisonous?",
    "a": "In quantity, yes. It contains ledol and grayanotoxins, and strong or boiled tea or many cups can cause dizziness, vomiting and a slowed pulse. A weak cup steeped a few minutes is how it has always been drunk, and that is the only way to use it. Pregnant people and young children should skip it."
   },
   {
    "q": "What is the difference between Labrador tea and bog laurel?",
    "a": "Bog laurel (Kalmia polifolia) has opposite leaves that are whitish and smooth underneath and pink saucer-shaped flowers; Labrador tea has alternate leaves with rusty wool underneath and white flowers. Bog laurel and its cousin sheep laurel are poisonous — grayanotoxins strong enough to kill sheep. The Alaskan rhyme is ‘pink, poisonous’."
   },
   {
    "q": "How do you make Labrador tea?",
    "a": "Put a few fresh or dried leaves — a teaspoon’s worth — in a cup, pour over water that has just come off the boil, and steep 5–10 minutes before straining. Do not boil the leaves in the pot, do not steep longer than 15 minutes, and do not drink several cups a day. The flavour is resinous and piney; it takes honey well."
   },
   {
    "q": "Who traditionally drinks Labrador tea?",
    "a": "It is a long-standing beverage across the north: Cree communities know it as muskeg tea (maskêkopakwa), Innu and Inuit households in Labrador and Nunavik gather it every summer, and Dene and Athabascan peoples use it in Alaska and the Northwest Territories. Hudson’s Bay Company traders adopted it when black tea ran short. Treat it as what it is, a traditional drink taken weak and in moderation."
   },
   {
    "q": "Is Labrador tea safe for children?",
    "a": "Not as a drink. The grayanotoxins that make strong tea risky for adults matter more in a small body, and there is no tradition of giving it to young children. Children can learn the plant — the orange wool under the leaf is a satisfying thing to find — but the tea is for adults, weak, and occasional."
   }
  ],
  "sources": [
   {
    "label": "UBC Coastal Plants — Rhododendron groenlandicum (Labrador tea)",
    "url": "https://blogs.ubc.ca/coastal-plants/plants-of-bc/entry/5"
   },
   {
    "label": "Juneau Empire, Planet Alaska — One of these could kill you, the other makes great tea",
    "url": "https://juneauempire.com/news/planet-alaska-one-of-these-could-kill-you-the-other-makes-great-tea"
   },
   {
    "label": "Drugs.com professional monograph — Labrador tea",
    "url": "https://www.drugs.com/npp/labrador-tea.html"
   },
   {
    "label": "Minnesota Wildflowers — Bog laurel (Kalmia polifolia)",
    "url": "https://www.minnesotawildflowers.info/shrub/bog-laurel"
   },
   {
    "label": "Cree Literacy Network — Muskeg tea: kâkikêpakwa, maskêkopakwa",
    "url": "https://creeliteracy.org/2016/03/13/muskeg-tea-kakikepakwa-maskekopakwa/"
   },
   {
    "label": "VASCAN — Rhododendron groenlandicum",
    "url": "https://data.canadensys.net/vascan/name/Rhododendron%20groenlandicum"
   }
  ]
 },
 "bunchberry": {
  "otherNames": "Dwarf dogwood, Canadian dwarf cornel, crackerberry, pigeonberry, quatre-temps (Quebec), ch’entq’ena (Dena’ina). Western bunchberry (Cornus unalaschkensis) of the Pacific coast and Alaska is nearly identical and used the same way.",
  "family": "Cornaceae, the dogwood family — bunchberry is a dogwood the size of a hand.",
  "range": "Native across Canada and Alaska from the treeline south: all of the boreal forest, the Maritimes, Quebec and Ontario, and in the US through New England, the Adirondacks and the upper Great Lakes, down the Appalachians at elevation to West Virginia and Virginia, and through the Rockies, Cascades and coast ranges, where it climbs to subalpine forest. One of the commonest forest-floor plants of the north.",
  "whenToPick": "August into September in the middle of its range — late July in warm lowlands, September at altitude and in the far north. The berries turn from green to a bright, glossy scarlet and stay on the plant for weeks; a ripe one is soft enough to squash between finger and thumb. Flowering is May–July, and a patch often shows flowers and fruit a few weeks apart.",
  "partsUsed": "The red berries, raw as a trail nibble or cooked into mixed jams, sauces and puddings, where their pectin helps other fruit set. Each holds one hard two-chambered stone, which is spat out or strained. Leaves, stems and roots are not food.",
  "poisonous": "Nothing poisonous. The berries are bland, mealy and seedy rather than harmful, and a child who eats a handful comes to no harm beyond a crunchy mouthful.",
  "moreLookalikes": "White baneberry or doll’s eyes (Actaea pachypoda) is the other poisonous one: white berries with a black dot on thick red stalks, above the same bushy compound leaves as red baneberry. Lingonberry and wintergreen are harmless evergreen neighbours with red berries on glossy leathery leaves. Canada mayflower (Maianthemum canadense) has speckled red berries on a stalk above one or two heart-shaped leaves; mildly purgative, not a food. Nothing else carries a bunch of berries inside a whorl of simple leaves.",
  "faqs": [
   {
    "q": "Are bunchberries edible?",
    "a": "Yes — once identified by the whorl of four to six leaves with the berry cluster sitting in the middle, bunchberries are edible raw or cooked. They are bland and mealy with a hard stone, so most people treat them as a trail nibble or add them to other fruit in jam. Nothing about the plant is poisonous."
   },
   {
    "q": "How do you identify bunchberry?",
    "a": "A plant 10–20 cm (4–8 in) tall with a single whorl of four to six oval, pointed leaves whose veins curve toward the tip the way a dogwood’s do. In early summer there are four white petal-like bracts around a knot of tiny flowers; by late summer a tight bunch of bright red berries sits in the centre of the leaf whorl. It grows in carpets in cool conifer woods."
   },
   {
    "q": "What poisonous berry looks like bunchberry?",
    "a": "Red baneberry (Actaea rubra), which fruits in the same woods at the same time. It is a bushy plant to 60 cm (2 ft) with large, divided, toothed leaves and a loose cluster of glossy red berries held on a stalk above the foliage, each berry with a black dot; a few can slow the heart and send a child to hospital. Bunchberry is ankle-high with simple leaves in a whorl and the berries sitting in that whorl, so the shape of the plant settles it."
   },
   {
    "q": "What should kids know about bunchberry?",
    "a": "That the plant is the rule, not the berry. A good game is to find the whorl of leaves first and only then look for the berries in the middle; if the berries are on a stalk above a leafy bush, walk away. Bunchberries are one of the safest wild berries for a child to learn on, because the plant is so distinctive and the fruit, though dull, is harmless."
   },
   {
    "q": "When do bunchberries ripen?",
    "a": "August and September across most of Canada and the northern US, a little earlier in warm lowland woods and later in the mountains and far north. The berries go from green to shiny red and hold on the plant for several weeks. The white ‘flowers’ you see in June are bracts; the fruit forms from the tiny true flowers in the centre."
   },
   {
    "q": "Do Indigenous peoples eat bunchberry?",
    "a": "Across the north the berries were eaten but rarely prized: the Dena’ina name means ‘crunchy’ and the Alutiiq name ‘gristly’, which tells you how they are regarded. Alutiiq cooks add them to berry dishes and jam, and elsewhere they were mixed with better fruit or stored with grease. They matter more to grouse, hares and bears."
   }
  ],
  "sources": [
   {
    "label": "Minnesota Wildflowers — Bunchberry (Cornus canadensis)",
    "url": "https://minnesotawildflowers.info/flower/bunchberry"
   },
   {
    "label": "USDA Forest Service Fire Effects Information System — Cornus canadensis",
    "url": "https://www.fs.usda.gov/database/feis/plants/forb/corcan/all.html"
   },
   {
    "label": "Kenai National Wildlife Refuge Notebook (Peninsula Clarion) — A common little plant with uncommon traits",
    "url": "https://www.peninsulaclarion.com/sports/refuge-notebook-a-common-little-plant-with-uncommon-traits"
   },
   {
    "label": "University of Wisconsin Horticulture Extension — Baneberry (Actaea spp.)",
    "url": "https://hort.extension.wisc.edu/articles/baneberry-actaea-spp/"
   }
  ]
 },
 "wild-currant": {
  "otherNames": "Covers the native currants and gooseberries: wild black currant (Ribes americanum), swamp red currant (R. triste), golden or clove currant (R. aureum), skunk currant (R. glandulosum), northern black currant (R. hudsonianum), wax currant (R. cereum), and the gooseberries — smooth or hairy-stem gooseberry (R. hirtellum), prickly gooseberry (R. cynosbati), and the western species. Gadelle and groseille in Quebec.",
  "family": "Grossulariaceae, the gooseberry family, of which Ribes is the only genus.",
  "range": "Native species of Ribes grow in nearly every part of Canada and the US outside the southeastern coastal plain, Florida and Hawaii. Black and red currants and the gooseberries fill the boreal forest, Maritimes, Great Lakes, Northeast, Appalachians and Midwest; golden currant runs through the Plains and the West; wax and sticky currants cover the western mountains and Great Basin ranges; coastal BC, Washington and Oregon have red-flowering, stink and trailing currants. European garden currants and gooseberries have also escaped around old farms.",
  "whenToPick": "July and August, with the first red currants in late June in warm areas and black currants and gooseberries running into early September in the north and mountains. A ripe currant is fully coloured, slightly soft and pulls from the chain with no tug; a ripe gooseberry gives to the thumb and has turned from hard green to translucent green, wine or purple depending on species. Both are sour until truly ripe.",
  "partsUsed": "The berries. Black currants (strong, musky) for jam, cordial and syrup; red, golden and skunk currants for jelly and juice; gooseberries topped and tailed for pie, fool and chutney, or eaten ripe from the bush. Each berry keeps a dry flower remnant at its tip, which is harmless and strained out in jelly. Leaves are not eaten; young black-currant leaves are sometimes used to scent a jar of pickles.",
  "poisonous": "Nothing poisonous in any native Ribes. Prickly gooseberry fruit is covered in stiff bristles and some currants have sticky glandular hairs, unpleasant but not harmful. Skunk currant smells of skunk when handled; the flavour of the berry is fine.",
  "moreLookalikes": "Highbush cranberry and squashberry (Viburnum) have translucent red berries in flat clusters above opposite, maple-like leaves — opposite, where Ribes leaves are alternate — and no tail on the berry; edible, tart. Bristly black currant (R. lacustre) is a Ribes with spiny stems and black bristly fruit, edible. Mountain ash and hawthorn berries are on trees. And on any lobed-leaf shrub with a berry chain, feel for the dried flower at the tip of the berry: nothing poisonous in these woods carries one.",
  "faqs": [
   {
    "q": "Are wild currants edible?",
    "a": "Yes — every native currant and gooseberry (Ribes) in Canada and the US has edible fruit once identified, by a lobed, maple-like leaf on a woody shrub and a dry flower ‘tail’ at the tip of every berry. Some are delicious and some are bland, bristly or skunky, but none is poisonous. Red berries without the tail are the ones to leave."
   },
   {
    "q": "How do you tell a currant from a gooseberry?",
    "a": "Thorns and numbers. Currants have smooth stems and six or more flowers and berries in a hanging chain; gooseberries carry one to three spines at each leaf node and hold one to four berries on short stalks, often bristly. Both have the same lobed leaves and the same tail on the fruit, and both are edible."
   },
   {
    "q": "What poisonous berries look like wild currants?",
    "a": "Red baneberry, whose glossy red berries each have a black dot and sit in a stalked cluster above big divided leaves on a soft herb, not a woody shrub; a few can be dangerous to a child. Bush honeysuckle (Lonicera), an invasive shrub with untoothed, paired leaves and red or orange berries in pairs; they cause vomiting. Neither has a lobed leaf or a tail on the berry."
   },
   {
    "q": "Why were currants banned in the United States?",
    "a": "Because Ribes is the alternate host of white pine blister rust, a fungus that kills white pines and needs both plants to complete its life cycle; the federal government banned growing currants and gooseberries in the early 1900s to protect the timber industry. The federal ban was lifted in 1966, but Maine, New Hampshire, Massachusetts and Rhode Island still regulate planting them. Picking wild Ribes was never the issue."
   },
   {
    "q": "When do wild currants ripen?",
    "a": "July and August across most of the continent — red currants first, from late June in the south, black currants and gooseberries through August and into early September in the north and at altitude. Pick when the berry is fully coloured and comes away from the chain with no tug; gooseberries are ready when they soften and turn translucent."
   },
   {
    "q": "Are wild currants safe for kids to pick?",
    "a": "Yes, with two rules: lobed leaf on a woody bush, and a little dry tail on the end of the berry. Teach children to find the tail before anything goes in a mouth, because that is what separates a currant from baneberry and honeysuckle. Expect scratched fingers from gooseberry thorns."
   }
  ],
  "sources": [
   {
    "label": "Minnesota Wildflowers — Wild black currant (Ribes americanum)",
    "url": "https://www.minnesotawildflowers.info/shrub/wild-black-currant"
   },
   {
    "label": "Minnesota Wildflowers — Swamp red currant (Ribes triste)",
    "url": "https://www.minnesotawildflowers.info/shrub/swamp-red-currant"
   },
   {
    "label": "Minnesota Wildflowers — Skunk currant (Ribes glandulosum)",
    "url": "https://www.minnesotawildflowers.info/shrub/skunk-currant"
   },
   {
    "label": "UMass Extension, New England Small Fruit Management Guide — Currants and gooseberries (white pine blister rust rules)",
    "url": "https://www.umass.edu/agriculture-food-environment/fruit/ne-small-fruit-management-guide/currants-gooseberries"
   },
   {
    "label": "NC State Extension — Lonicera tatarica (Tatarian honeysuckle)",
    "url": "https://plants.ces.ncsu.edu/plants/all/lonicera-tatarica/"
   },
   {
    "label": "University of Wisconsin Horticulture Extension — Baneberry (Actaea spp.)",
    "url": "https://hort.extension.wisc.edu/articles/baneberry-actaea-spp/"
   }
  ]
 },
 "nodding-onion": {
  "otherNames": "Nodding wild onion, lady’s leek, qw’uxwi’uc (Island Halkomelem), ail penché (Quebec). Wild chives (Allium schoenoprasum) across the north and prairie onion (A. stellatum) on the Plains are close relatives with the same onion smell and the same uses.",
  "family": "Amaryllidaceae, the onion and garlic group (which also includes ramps, chives and daffodils).",
  "range": "Native from British Columbia east through Alberta, Saskatchewan, Manitoba and Ontario, and in the US through the Rockies and Cascades, the Black Hills, the Great Lakes states, the Ohio and Tennessee valleys, the Ozarks, and down the Appalachians to Georgia and Alabama. It is absent from the Maritimes, New England, the Atlantic coastal plain, California and Florida, and it is uncommon or listed in several eastern states — special concern in Minnesota.",
  "whenToPick": "Leaves from May through July, before and during flowering, while they are still tender. Flowers in July and August, when the nodding pink umbel makes the plant unmistakable and is itself a garnish. Bulbs, if taken at all, in late summer after the leaves yellow or in early spring — but see the harvest note. Everything moves two to four weeks later in the mountains and the north.",
  "partsUsed": "Leaves, flower stalks and flowers, raw or cooked like chives. Bulbs, small and strong, cooked; Coast Salish households steamed them in pits, and Lewis and Clark ate them. Snip leaves and leave bulbs: a plant takes years to reach flowering size, and cutting half the leaves from a clump leaves it to grow on.",
  "poisonous": "Nothing poisonous in the plant itself for people. As with all onions, it is toxic to dogs and cats, which should not be fed any part. The danger is entirely in the look-alike.",
  "moreLookalikes": "In the east, mountain death camas or white camas (Anticlea elegans, formerly Zigadenus elegans) is the native danger: grass-like leaves, a bulb much like an onion’s, creamy white star flowers in an upright spike, no smell, and alkaloids described as more toxic than strychnine; it grows on prairies, fens and rocky shores from the Great Lakes to the Rockies. Star-of-Bethlehem (Ornithogalum), a garden escape with white six-petalled flowers and grass-like leaves, is also poisonous and smell-less. Blue-eyed grass and sedges are harmless clump-formers that fail the smell test. Prairie onion, wild chives and field garlic all smell of onion and are edible.",
  "faqs": [
   {
    "q": "How do you tell nodding onion from death camas?",
    "a": "Smell, then shape. Crush a leaf: nodding onion smells sharply of onion, and death camas (Toxicoscordion venenosum in the west, Anticlea elegans in the east and north) smells of nothing at all. Nodding onion carries pink or white bells in a cluster that hangs from a bent stem; death camas carries cream-white stars in an upright spike. Never dig a bulb you have not smelled the leaves of."
   },
   {
    "q": "Is nodding onion edible?",
    "a": "Yes — every part is edible once the plant has been identified by its onion smell and its nodding pink umbel, and it has been eaten by Indigenous peoples across its range for thousands of years. Use the leaves and flowers like chives and cook the small bulbs. Without the onion smell it is not an onion and must not be eaten."
   },
   {
    "q": "When do you harvest nodding onion?",
    "a": "Leaves in late spring and early summer, flowers in July and August, and bulbs — if at all — in autumn after the tops die back or in early spring. The greens are the sustainable harvest: cut a few leaves from each clump and leave the bulbs, since patches are slow to spread and the plant is uncommon across much of the east."
   },
   {
    "q": "Can death camas poisoning really happen from wild onions?",
    "a": "Yes, and it still does. In 2024 emergency physicians reported seven members of one family poisoned after foraging what they took for wild onions; death camas causes vomiting, a dangerously slow pulse and low blood pressure, and there is no antidote, only hospital support. Indigenous harvesters managed the risk by weeding death camas out of their onion and camas grounds. The onion smell is the whole test."
   },
   {
    "q": "Is nodding onion safe for children to pick?",
    "a": "Only with the smell test made into a habit: crush, sniff, and only then taste. Children learn it fast and enjoy it, and the pink flowers are a safe first thing to nibble because nothing poisonous has a nodding pink onion-scented umbel. Do not let a child pull up bulbs; that is where the deadly mistake lives."
   },
   {
    "q": "Is nodding onion poisonous to dogs?",
    "a": "Yes. All onions, garlic and chives, wild or cultivated, damage red blood cells in dogs and cats, and the effect builds with repeated small amounts. Do not feed pets any part of the plant and keep trimmings out of the compost they can reach."
   }
  ],
  "sources": [
   {
    "label": "Minnesota Wildflowers — Nodding wild onion (Allium cernuum)",
    "url": "https://www.minnesotawildflowers.info/flower/nodding-wild-onion"
   },
   {
    "label": "Minnesota Wildflowers — Mountain death camas (Zigadenus elegans)",
    "url": "https://www.minnesotawildflowers.info/flower/mountain-death-camas"
   },
   {
    "label": "Oregon State University Extension — Meadow deathcamas in the Pacific Northwest (PNW 104)",
    "url": "https://extension.oregonstate.edu/catalog/pub/pnw-104-meadow-deathcamas-pacific-northwest"
   },
   {
    "label": "Loma Linda University — Acute death camas (Toxicoscordion venenosum) poisoning in seven family members foraging for wild onions (Am J Emerg Med, 2024)",
    "url": "https://experts.llu.edu/en/publications/acute-death-camas-toxicoscordion-venenosum-plant-poisoning-in-sev/"
   },
   {
    "label": "Garry Oak Ecosystems Recovery Team — Allium cernuum",
    "url": "https://goert.ca/species/allium-cernuum/"
   },
   {
    "label": "Simon Fraser University, Halkomelem ethnobotany — Nodding onion",
    "url": "https://www.sfu.ca/halkeb/html/plants/onion.htm"
   }
  ]
 },
 "camas": {
  "otherNames": "Common camas, small camas, blue camas, quamash, kwetlal (Lekwungen), qém’es (Nez Perce). Great camas (Camassia leichtlinii), taller and later, is the second food species west of the Cascades; both are simply ‘camas’ to the people who harvest them.",
  "family": "Asparagaceae, the asparagus family (subfamily Agavoideae, with agave and yucca); older books put it in the lily family. Death camas is in a different family, Melanthiaceae.",
  "range": "Native to the Pacific Northwest and the interior west: southern Vancouver Island and the Gulf Islands, southwestern BC and the southwestern corner of Alberta; western Washington and Oregon, the Willamette Valley, and east of the Cascades through the Palouse, Idaho, western Montana, Utah and Wyoming; south to northern California. Camas prairies once covered tens of thousands of hectares; most have gone to farmland, pasture and towns, and the surviving meadows are small and often protected.",
  "whenToPick": "Bulbs are dug after flowering, when the seed pods have formed and the flowers have faded — June into July in lowland prairies, July at elevation — because that is the last moment the plant can be told from death camas by its flower stalk. Flowering is April–May on the coast and May–June inland. Bulbs dug in spring are smaller and the plant has not set seed.",
  "partsUsed": "The bulb, 1–3 cm (½–1 in) across, dug with a digging stick after the plant has been identified and flagged in flower. Traditionally it is pit-cooked for 24–48 hours, which converts its inulin to sweet, digestible fructose and turns the bulb dark brown and soft like a roasted fig; the cooked bulbs were eaten, pressed into cakes and dried for winter and trade. Leaves, flowers and seeds are not food. Slow-cooked a day or more in a modern oven or slow cooker it works; quickly cooked it is starchy and causes wind.",
  "poisonous": "Camas itself is not poisonous, but raw or briefly cooked bulbs are hard to digest and famously flatulent because the inulin has not broken down. The hazard is death camas, which grows in the same meadows and has an identical-looking bulb.",
  "moreLookalikes": "Mountain death camas (Anticlea elegans) joins meadow death camas in the mountains and north, with the same cream-white flowers and the same poison. Wild hyacinth (Camassia scilloides) is the eastern camas of the Midwest, pale blue and edible, outside this entry’s range. Blue-eyed grass and grass widows share the spring meadows with blue or purple flowers but have no bulb worth digging. Any plant with grass-like leaves and no flower stalk is unidentified and must stay in the ground.",
  "faqs": [
   {
    "q": "How do you tell camas from death camas?",
    "a": "Only by the flowers. Camas has blue to violet six-petalled stars in a loose spike; meadow death camas (Toxicoscordion venenosum) has small cream-white flowers in a denser spike, and mountain death camas (Anticlea elegans) has larger cream stars with a green heart on each petal. Below ground the bulbs are the same shape, colour and size and neither smells of anything. Mark plants in bloom with flags and dig only flagged plants after they fade."
   },
   {
    "q": "Is camas edible?",
    "a": "Yes — camas bulbs, correctly identified in flower and slow-cooked for a day or more, were one of the most important plant foods of western North America and are still harvested and pit-roasted by Coast Salish, Nez Perce, Kalapuya and other Plateau and Northwest nations. Raw or quickly cooked they are starchy and indigestible. Misidentified, the ‘camas’ may be death camas, which has killed foragers and livestock."
   },
   {
    "q": "Can I harvest camas?",
    "a": "In most places, no. Camas prairies are rare and culturally significant, nearly all surviving meadows are in parks, reserves, Garry oak restoration sites or Indigenous harvest areas where digging is prohibited, and many First Nations and Tribes are actively restoring them. If you want to taste camas, look for a community harvest event you have been invited to, or grow your own from nursery bulbs. Digging wild camas uninvited is both illegal in most places and a quiet kind of theft."
   },
   {
    "q": "Why is camas cooked for so long?",
    "a": "Because the bulb stores its energy as inulin, a fibre people cannot digest; 24–48 hours of steady, moist heat breaks it into fructose, which is why a pit-roasted camas bulb is sweet and brown like a roasted fig. Traditional pit ovens used hot rocks, wet vegetation and earth. A slow cooker on low for 24–36 hours does the same job; a quick boil does not."
   },
   {
    "q": "Who are the traditional camas harvesters?",
    "a": "Camas was a staple and a trade good for peoples from Vancouver Island to the Snake River: the Lekwungen and other Coast Salish nations tended camas meadows on southern Vancouver Island, the Kalapuya managed the Willamette Valley prairies with fire, and for the Nez Perce it was the most important root in trade, dug for weeks each summer at inherited family grounds. Lewis and Clark survived on it in 1805. Loss of camas prairies to settlers and grazing was one grievance behind the Nez Perce and Bannock wars."
   },
   {
    "q": "Is camas safe for children?",
    "a": "Not as a foraged food. The plant that kills in camas meadows is death camas, and no child can be expected to hold the flag-it-in-flower rule for weeks. Children can admire the blue meadows in May and learn why the white-flowered plant among them matters; the digging, where it is done at all, is adult work with permission."
   }
  ],
  "sources": [
   {
    "label": "USDA NRCS Plant Guide — Camassia quamash ssp. quamash (titled ‘Great camas’ by NRCS)",
    "url": "https://plants.sc.egov.usda.gov/DocumentLibrary/plantguide/pdf/cs_caquq.pdf"
   },
   {
    "label": "USDA Forest Service Fire Effects Information System — Camassia quamash",
    "url": "https://www.fs.usda.gov/database/feis/plants/forb/camqua/all.html"
   },
   {
    "label": "Oregon State University Extension — Meadow deathcamas in the Pacific Northwest (PNW 104)",
    "url": "https://extension.oregonstate.edu/catalog/pub/pnw-104-meadow-deathcamas-pacific-northwest"
   },
   {
    "label": "Minnesota Wildflowers — Mountain death camas (Zigadenus elegans)",
    "url": "https://www.minnesotawildflowers.info/flower/mountain-death-camas"
   },
   {
    "label": "VASCAN — Camassia quamash",
    "url": "https://data.canadensys.net/vascan/name/Camassia%20quamash"
   },
   {
    "label": "Wikipedia — Camassia quamash",
    "url": "https://en.wikipedia.org/wiki/Camassia_quamash"
   }
  ]
 },
 "oregon-grape": {
  "otherNames": "Tall Oregon grape, holly-leaved barberry, mahonia (Mahonia aquifolium in older books and garden labels). Dull or Cascade Oregon grape (Berberis nervosa), a knee-high plant with 9–19 leaflets, and creeping Oregon grape (B. repens), an ankle-high carpet of the Rockies and Great Basin, have the same berries and the same uses.",
  "family": "Berberidaceae, the barberry family (which also includes the barberries, mayapple and blue cohosh).",
  "range": "Native from the Alaska panhandle and coastal British Columbia through Washington, Oregon and northern California, and inland through interior BC, Idaho and western Montana; creeping Oregon grape carries the group through the Rockies to Alberta, Colorado, Utah, Arizona and New Mexico. Tall Oregon grape is planted everywhere as a hedge and has naturalised around towns in the East and Great Lakes, where the berries are just as usable.",
  "whenToPick": "August and September, when the clusters have turned from green through red to a dusty blue-black and the berries soften; in a warm lowland garden they can be ready in late July, and creeping Oregon grape in the mountains runs into October. Tart at any stage, they lose a little acid after frost. The yellow flowers open March–May, and bright flowers in spring usually mean a good crop.",
  "partsUsed": "The berries, cooked and strained for juice, jelly, syrup and wine, or dried; the seeds are large and the pulp scant, so the yield is in the juice. Traditionally eaten mixed with salal or other sweeter berries. The yellow roots and inner bark are not food; they are a dye and a bitter traditional medicine, and digging roots kills the plant.",
  "poisonous": "The whole plant contains berberine, a bitter yellow alkaloid concentrated in the roots and bark and present in smaller amounts in the berries. Berries in jelly or juice are fine for most people; a handful of raw berries can upset a child’s stomach, and herbal references advise avoiding berberine-rich plants in pregnancy and for infants. Do not make teas or tinctures from the root and bark on the strength of a foraging guide.",
  "moreLookalikes": "English holly (Ilex aquifolium), an invasive tree of Pacific Northwest woods, is the one people mean: same spiny glossy leaves at a glance, but each leaf is single and alternate, the wood is white, and the berries are red; the berries contain saponins and cause vomiting and diarrhoea in children and pets. Salal (Gaultheria shallon) grows in the same understory with dark blue berries but has oval, spineless leaves; edible and a traditional partner in dried cakes. Blue elderberry and blue huckleberry are the other blue fruits of western woods, both edible, neither with a holly leaf.",
  "faqs": [
   {
    "q": "Are Oregon grape berries edible?",
    "a": "Yes — once identified by the holly-like pinnate leaves, yellow spring flowers and yellow inner wood, the dusty-blue berries are edible, though so tart and seedy that almost everyone cooks them into juice, jelly or syrup. They contain a little berberine, so eat them as a preserve rather than by the handful, especially for children."
   },
   {
    "q": "How do you identify Oregon grape?",
    "a": "An evergreen shrub whose leaves are pinnate — a row of five to nine (or more) spiny, glossy leaflets along a central stalk, unlike holly’s single leaves — with upright clusters of small yellow flowers in spring and grape-like bunches of powdery blue-black berries in late summer. Nick a stem or root: the wood is bright yellow. Leaves often flush red or bronze in winter."
   },
   {
    "q": "What is the difference between Oregon grape and holly?",
    "a": "Leaves and berries. Holly has single spiny leaves set alternately along the twig and red berries in the leaf axils; Oregon grape has compound leaves made of several spiny leaflets, yellow flowers and blue berries in clusters at the shoot tips. Holly berries are mildly poisonous — vomiting and diarrhoea — and English holly is an invasive weed in Pacific Northwest forests."
   },
   {
    "q": "When do you pick Oregon grape?",
    "a": "August and September across most of its range, when the berries are fully blue-black with a dusty bloom and give slightly to the fingers; mountain creeping Oregon grape runs later. Taste one from the cluster: if it is green-sour rather than fruit-sour, wait a week. Frost softens them and takes a little acid off."
   },
   {
    "q": "Is Oregon grape poisonous to dogs or children?",
    "a": "The berries are low-risk: a few cause nothing, a lot can cause stomach upset or vomiting because of berberine, in children and in dogs alike. The roots and bark are far more concentrated and are not for eating by anyone. Jelly made from the strained juice is the family-friendly form."
   },
   {
    "q": "Why is Oregon grape the state flower of Oregon?",
    "a": "It was adopted in 1899 as a plant found across the whole state and useful to the people living there: a dye, a traditional medicine and a food. It grows wild from the coast to the Blue Mountains, and it is protected in Oregon’s state parks like every other plant, so pick it on private land or roadsides."
   }
  ],
  "sources": [
   {
    "label": "NC State Extension — Berberis aquifolium",
    "url": "https://plants.ces.ncsu.edu/plants/berberis-aquifolium"
   },
   {
    "label": "US National Park Service, Klamath Network — Oregon grape",
    "url": "https://www.nps.gov/articles/000/oregon-grape.htm"
   },
   {
    "label": "Virginia Department of Health — Toxic holiday plants (holly)",
    "url": "https://www.vdh.virginia.gov/environmental-health/tag/holly/"
   },
   {
    "label": "Wikipedia — Berberis aquifolium",
    "url": "https://en.wikipedia.org/wiki/Berberis_aquifolium"
   },
   {
    "label": "Wikipedia — Berberis repens",
    "url": "https://en.wikipedia.org/wiki/Berberis_repens"
   }
  ]
 },
 "pinyon": {
  "otherNames": "Piñon, Colorado pinyon, two-needle pinyon, neeshch’íí’ (Diné/Navajo), tuba (Northern Paiute). Single-leaf pinyon (Pinus monophylla) of Nevada, Utah and eastern California, and Mexican pinyon (P. cembroides) of west Texas and the borderlands, give the same nut; the brief names here cover all three.",
  "family": "Pinaceae, the pine family.",
  "range": "Native to the Colorado Plateau and southern Rockies — Utah, Colorado, Arizona and New Mexico, with fingers into Wyoming, Nevada, the Oklahoma and Texas panhandles and northern Mexico — at 1,400–2,300 m (4,500–7,500 ft). Single-leaf pinyon replaces it across the Great Basin ranges of Nevada, western Utah and eastern California. Pinyon–juniper woodland is the commonest forest type of the Southwest and the US has no native pinyon north of Wyoming.",
  "whenToPick": "Mid-September through October, after the first frosts have opened the cones and before birds, squirrels and rain take the seeds — a window of two or three weeks on any one hillside. Cones take two summers to mature and good crops come only every three to seven years, so ask locally whether it is a ‘piñon year’. Green cones can be picked in late August and dried on a tarp until they open, but tearing them off damages the tree.",
  "partsUsed": "The seeds, shelled and eaten raw or, better, roasted in the shell: 10–20 soft-shelled nuts per cone, with a resinous, buttery kernel. Traditional methods shake nuts onto a blanket or tarp and winnow out the needles; the nuts are then dried, roasted, and cracked. Needles and inner bark have been used in hard times and as tea, but the nut is the food. Pitch and cones are not eaten.",
  "poisonous": "Nothing poisonous about pinyon. Pine nuts are a tree nut for allergy purposes, and ‘pine mouth’ — a bitter or metallic taste that starts one or two days after eating and can last a week or more — is well documented from some imported Asian pine nuts (Pinus armandii among them) but not from pinyon; the FDA logged nearly 200 complaints in two years, all of which resolved without harm.",
  "moreLookalikes": "Other pines of the same country — ponderosa, limber, bristlecone — have edible but small or hard-shelled seeds; nothing dangerous, only disappointing, and limber pine seeds are worth gathering. Junipers grow mixed through the same woodland with blue ‘berries’ that are a seasoning, not a snack. Yew, the only deadly conifer, has flat soft needles in two rows and red fleshy cups instead of cones, and grows in the Pacific Northwest and the East, not in pinyon country. Nothing with a cone and a hard-shelled seed is poisonous.",
  "faqs": [
   {
    "q": "When is piñon season?",
    "a": "Mid-September to the end of October, after frost opens the cones, across New Mexico, Arizona, Colorado, Utah and Nevada; the nuts fall fast once the cones open, so a given stand gives two or three good weeks. Heavy crops come only every three to seven years. Nevada’s BLM and Forest Service announce the season each September, and New Mexicans simply pass the word."
   },
   {
    "q": "Do I need a permit to pick piñon nuts?",
    "a": "For personal use on most National Forest and BLM land in Nevada, New Mexico, Arizona, Colorado and Utah, no, up to a household limit that is commonly 25 lb (11 kg) a season; more than that, or any sale, needs a commercial permit from the district office. Rules differ by forest, so check the ranger district. National parks and monuments are closed to collecting, and Tribal lands are closed to non-members."
   },
   {
    "q": "How do you harvest pinyon nuts without harming the tree?",
    "a": "Spread a tarp under a tree whose cones have opened, shake the branches or tap them with a stick, and gather what falls; or pick fallen nuts straight off the ground, which is what most families do. Never cut or break branches, and do not strip green cones from a tree — both are prohibited on public land and ruin next year’s growth. Expect pitch on your hands."
   },
   {
    "q": "Who harvests piñon traditionally?",
    "a": "Piñon has fed people in the Southwest and Great Basin for thousands of years, with heavy harvesting in the archaeological record from about 1,400 years ago. For Diné (Navajo) families the autumn pick near places like Canyon de Chelly is a season of its own, for the Walker River Paiute and the Ely Shoshone it is marked with September festivals and prayers at pine-nut groves they regard as sacred ground, and Paiute harvests were organised across whole families, with roasted nuts ground into a winter staple. Tribal members have priority in some commercial permit areas; respect posted harvest areas."
   },
   {
    "q": "Are pinyon nuts safe for children?",
    "a": "Yes, with the usual tree-nut caution for anyone with allergies and the choking caution for very small children. Piñon picking is a family outing in the Southwest, and gathering nuts off the ground under a tree is as safe as foraging gets. Teach children to leave the sticky green cones alone and to watch for the ants that get there first."
   },
   {
    "q": "What is pine mouth, and do pinyon nuts cause it?",
    "a": "Pine mouth or pine nut syndrome is a bitter, metallic taste that appears one or two days after eating pine nuts and spoils everything you eat for a week or two, then goes away on its own. It has been traced to some imported Asian pine nuts, Pinus armandii in particular, and not to American pinyon. Nuts you gathered yourself from a pinyon tree are not the problem."
   }
  ],
  "sources": [
   {
    "label": "Utah State University Extension, Range Plants of Utah — Pinyon pine",
    "url": "https://extension.usu.edu/rangeplants/shrubs-and-trees/pinyon-twoneedle"
   },
   {
    "label": "USDA Forest Service Fire Effects Information System — Pinus edulis",
    "url": "https://www.fs.usda.gov/database/feis/plants/tree/pinedu/all.html"
   },
   {
    "label": "Bureau of Land Management Nevada — Pine nut harvest season on Nevada public lands (personal-use limits)",
    "url": "https://www.blm.gov/press-release/2016-pine-nut-harvest-season-kicks-nevada-public-lands"
   },
   {
    "label": "Pine mouth syndrome — an emerging food hypersensitivity? (Clin Transl Allergy, 2011)",
    "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC3354153"
   },
   {
    "label": "Nevada Current — Pine nuts, the climate crisis, tribal culture",
    "url": "https://nevadacurrent.com/?p=185902"
   },
   {
    "label": "Navajo Times — Going nuts: Diné piñon picking",
    "url": "https://navajotimes.com/ae/culture/going-nuts/"
   }
  ]
 },
 "wild-garlic": {
  "otherNames": "Ramsons, bear’s garlic, wood garlic, broad-leaved garlic, buckrams; ail des ours (France), Bärlauch (Germany), aglio orsino (Italy)",
  "family": "Amaryllidaceae (the onion and garlic group)",
  "range": "Temperate Europe from Ireland and Britain east to the Caucasus: common in lowland Britain and Ireland (absent only from the far north of Scotland, Orkney and Shetland), and through France, the Low Countries, Germany, Poland, the Alps and the Carpathians. An eastern subspecies takes over in the east and south-east. A plant of moist deciduous woodland, often with bluebells.",
  "whenToPick": "Leaves come up in late winter or early spring, before the trees leaf out — from late February in the mildest Atlantic woods, March and April further east and higher up. They are best before the flowers open, from April to June in Britain, and they yellow and die back by early summer.",
  "partsUsed": "Leaves, flower buds, flowers and green seed heads, raw or cooked. The narrow bulbs are edible too, but digging them kills the plant, and in Britain uprooting any wild plant without the landowner’s permission is an offence.",
  "moreLookalikes": "Lords-and-ladies (Arum maculatum) unfurls among wild garlic: open arum leaves are arrow-shaped with irregular edges and many veins in a net, often dark-spotted, where wild garlic leaves are smooth-edged with a single main vein. In the Alps and Carpathians, white false hellebore (Veratrum) has broad, pleated, strongly ribbed leaves spiralling up a stout stem, and has been eaten in salads and soups as wild garlic.",
  "faqs": [
   {
    "q": "What looks like wild garlic but is poisonous?",
    "a": "Lily of the valley, autumn crocus (meadow saffron), lords-and-ladies and, in the mountains, white false hellebore. All grow where wild garlic grows, none smells of garlic, and people are poisoned every spring after picking them by mistake. Autumn crocus has killed foragers: its colchicine has no antidote."
   },
   {
    "q": "How do you tell wild garlic from lily of the valley?",
    "a": "Look at how the leaves grow and smell them. Each wild garlic leaf rises on its own stalk from the ground, bright green and slightly glossy, and smells of garlic when crushed. Lily of the valley has two or three duller leaves wrapped around one reddish-purple stem, and no smell. In flower, wild garlic has a round head of white stars; lily of the valley has nodding white bells."
   },
   {
    "q": "When is wild garlic season?",
    "a": "Late winter to late spring. The leaves appear in February or March and are at their best before the flowers open in April and May; by early summer they have yellowed and gone."
   },
   {
    "q": "Can you eat wild garlic flowers?",
    "a": "Yes. The flowers can go raw into salads, and the buds and green seed heads are eaten too. The flavour of the whole plant is gentler than a garlic bulb."
   },
   {
    "q": "Is it legal to pick wild garlic?",
    "a": "Picking leaves for your own use is generally fine where you have access, but in Britain uprooting any wild plant without the landowner’s permission is an offence under the Wildlife and Countryside Act, and nature reserves have their own rules. Cut leaves; leave the bulbs."
   }
  ],
  "sources": [
   {
    "label": "Wikipedia — Allium ursinum (look-alikes and distribution)",
    "url": "https://en.wikipedia.org/wiki/Allium_ursinum"
   },
   {
    "label": "Woodland Trust — Wild garlic",
    "url": "https://www.woodlandtrust.org.uk/trees-woods-and-wildlife/plants/wild-flowers/wild-garlic/"
   },
   {
    "label": "Woodland Trust — Lily-of-the-valley",
    "url": "https://www.woodlandtrust.org.uk/trees-woods-and-wildlife/plants/wild-flowers/lily-of-the-valley/"
   },
   {
    "label": "Brvar et al., Critical Care (2004) — Case report: fatal poisoning with Colchicum autumnale (eaten as wild garlic)",
    "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC420069/"
   }
  ]
 },
 "mediterranean-asparagus": {
  "otherNames": "Spiny wild asparagus; asparago selvatico or asparago pungente (Italy), espárrago triguero (Spain), divlja šparoga (Croatia)",
  "family": "Asparagaceae",
  "range": "Throughout the Mediterranean Basin: Portugal, Spain and the Balearics, southern France, Italy and its islands, the Adriatic coast, Greece and Cyprus, and across the sea in Morocco, Algeria and Tunisia. A plant of dry, sunny scrub, mainly on limestone, from the coast up to about 1,300 m (4,300 ft).",
  "whenToPick": "The spears come up after the winter rains, from about February into April, earliest on warm coasts and later inland and uphill. The plant flowers in late summer, sometimes after storms, and its small berries ripen in winter.",
  "partsUsed": "Only the young spears. The old stems are woody and armed with sharp, needle-like cladodes, and the berries are not eaten.",
  "moreLookalikes": "Black bryony (Dioscorea communis) is a climbing vine of the same hedges and scrub whose young shoots are eaten cooked in a few places while their saponin content is low — but its tubers and berries are poisonous, and it is not a plant to learn from a description. If a shoot twines, leave it.",
  "faqs": [
   {
    "q": "When is wild asparagus season in the Mediterranean?",
    "a": "Late winter and spring: roughly February to April, after the winter rains. Warm coasts come first; inland hills follow a few weeks later."
   },
   {
    "q": "How do you find wild asparagus?",
    "a": "Learn the plant before the season: an evergreen tangle of stiff, prickly, needle-like ‘leaves’ in sunny scrub, olive groves and along old walls. In spring the thin new spears push up from the base of those clumps — once you have found one plant, look for its neighbours."
   },
   {
    "q": "Is wild asparagus the same as garden asparagus?",
    "a": "No. Asparagus acutifolius is a separate, evergreen, prickly species with pencil-thin spears and a stronger, more bitter flavour. Garden asparagus (A. officinalis) is a different plant, though it also grows wild in parts of Europe."
   },
   {
    "q": "How do you cook wild asparagus?",
    "a": "Briefly. Snap the spears where they break cleanly and scramble them with eggs — the classic way along the Croatian coast, in Spain and in Italy — or stir them into a risotto at the end."
   }
  ],
  "sources": [
   {
    "label": "Wikipedia — Asparagus acutifolius",
    "url": "https://en.wikipedia.org/wiki/Asparagus_acutifolius"
   },
   {
    "label": "Plants For A Future — Asparagus acutifolius",
    "url": "https://pfaf.org/user/Plant.aspx?LatinName=Asparagus+acutifolius"
   },
   {
    "label": "Wikipedia — Dioscorea communis (black bryony)",
    "url": "https://en.wikipedia.org/wiki/Dioscorea_communis"
   }
  ]
 },
 "common-sorrel": {
  "otherNames": "Sorrel, sour dock, meadow sorrel, sour ducks; oseille (France), Sauerampfer (Germany), szczaw (Poland)",
  "family": "Polygonaceae (dock family)",
  "range": "Grassland throughout Europe, from the northern Mediterranean coast to the north of Scandinavia, and on into Central Asia — meadows, verges, woodland edges, heath and moorland; commonest in the cool, damp north and west and scarce in the hot Mediterranean lowlands. Introduced in North America, Australia and New Zealand.",
  "whenToPick": "Leaves come up early in spring and are best young, before the reddish flower spikes rise in May and June; they toughen with age. Plants cut back by mowing or haymaking send up fresh leaves again.",
  "partsUsed": "Young leaves and shoots, raw or briefly cooked. Older leaves are tough and even more sour.",
  "poisonous": "Like all sorrels it is high in oxalic acid. A normal helping in a soup or sauce is fine; large, frequent amounts are not, especially for anyone prone to kidney stones.",
  "faqs": [
   {
    "q": "What does sorrel taste like?",
    "a": "Sharply lemony and sour — the old country names are ‘sour ducks’ and ‘vinegar plant’. The tartness comes from oxalic acid."
   },
   {
    "q": "How do you tell sorrel from lords-and-ladies?",
    "a": "Both have arrow-shaped leaves. Sorrel’s are matt, with two base lobes pointing straight back and a papery sheath where the leaf meets the stem. Lords-and-ladies leaves are glossy, wavy-edged, net-veined and often dark-spotted, and they burn the mouth at once. Learn the leaf by eye; don’t taste-test."
   },
   {
    "q": "Is sorrel the same as wood sorrel?",
    "a": "No. Wood sorrel (Oxalis) is an unrelated, clover-like little plant; it shares the sour taste because it shares the oxalic acid."
   },
   {
    "q": "Why is sorrel served with fish?",
    "a": "Its sharpness cuts rich fish, and French cooks have long paired the two — salmon with sorrel sauce, created by the Troisgros brothers in 1962, became an emblem of nouvelle cuisine."
   }
  ],
  "sources": [
   {
    "label": "Wikipedia — Sorrel (Rumex acetosa)",
    "url": "https://en.wikipedia.org/wiki/Sorrel"
   },
   {
    "label": "The Wildlife Trusts — Common sorrel",
    "url": "https://www.wildlifetrusts.org/wildlife-explorer/wildflowers/common-sorrel"
   },
   {
    "label": "Wikipedia — Arum maculatum (leaves mistaken for sorrel)",
    "url": "https://en.wikipedia.org/wiki/Arum_maculatum"
   }
  ]
 },
 "st-georges-mushroom": {
  "otherNames": "Maipilz (Germany), mousseron or tricholome de la Saint-Georges (France), marzolino or prugnolo (Italy), perretxiko (Basque Country), vårmousseron (Denmark)",
  "family": "Lyophyllaceae",
  "range": "Grassland across Europe, especially on chalk and limestone. Infrequent but locally plentiful in Britain and Ireland — the South Downs have rings that seem to be centuries old — common on the Swedish Baltic islands of Öland and Gotland, and picked in quantity in Romania, Hungary and Turkey, which export it to the markets of northern Spain.",
  "whenToPick": "Spring. In Britain it is usually up by St George’s Day, 23 April, and runs into June; in Italy it comes in March, and in Germany rarely before May. Pick in dry weather.",
  "partsUsed": "The whole mushroom, cooked. Older specimens are often maggoty — take firm young ones.",
  "faqs": [
   {
    "q": "When does St George’s mushroom appear?",
    "a": "In spring: from around 23 April in Britain until June, as early as March in Italy (where it is called marzolino) and from May in Germany (Maipilz). It is usually the first big edible mushroom of the year."
   },
   {
    "q": "What does St George’s mushroom smell like?",
    "a": "Strongly of wet flour, or cucumber — a smell called ‘mealy’. Cooking turns most of it into a rich flavour."
   },
   {
    "q": "What mushrooms can be mistaken for St George’s mushroom?",
    "a": "The deadly fibrecap (Inosperma erubescens), which fruits in the same places from late spring: a conical, silky-fibred cap that stains brick-red, and a brown spore print. It contains muscarine and has killed. Livid entoloma has a pink spore print; the small white lawn funnels have gills running down the stem. St George’s is stocky, white, mealy-smelling, with a white print."
   },
   {
    "q": "Where do St George’s mushrooms grow?",
    "a": "In grass — pastures, chalk downland, mown verges near hedges and woodland edges — often in rings that come back year after year."
   },
   {
    "q": "What should children know about mushrooms in the lawn?",
    "a": "Never to taste one. Small white funnel mushrooms in lawns and parks contain muscarine, and toddlers are the ones most likely to find them. If a child may have eaten a wild mushroom, keep a sample and call a poison centre straight away."
   }
  ],
  "sources": [
   {
    "label": "Wikipedia — Calocybe gambosa",
    "url": "https://en.wikipedia.org/wiki/Calocybe_gambosa"
   },
   {
    "label": "First Nature — Calocybe gambosa, St George’s Mushroom",
    "url": "https://www.first-nature.com/fungi/calocybe-gambosa.php"
   },
   {
    "label": "First Nature — Inocybe erubescens, Deadly Fibrecap",
    "url": "https://www.first-nature.com/fungi/inocybe-erubescens.php"
   }
  ]
 },
 "yellow-morel": {
  "otherNames": "Common morel, true morel, sponge morel; morille (France), Speisemorchel (Germany), spugnola (Italy)",
  "family": "Morchellaceae",
  "range": "Since DNA work in 2014 the name Morchella esculenta belongs to one yellow morel that is common in Europe (and reported from China); North America’s yellow morels now have other names. In Britain it is native but uncommon; on the continent it is widespread, especially on lime-rich soil.",
  "whenToPick": "Spring, in a short flush that depends on the weather: March to May in Britain, later northward and in the mountains.",
  "partsUsed": "The whole mushroom, cap and stem, always thoroughly cooked.",
  "poisonous": "Raw morels are poisonous, and old, decaying ones may be too. False morel (Gyromitra esculenta) contains gyromitrin, which the body turns into a rocket-fuel compound, monomethylhydrazine.",
  "moreLookalikes": "Black morels (the Morchella elata group) have darker, more pointed caps and are eaten the same way, always cooked; in Britain they often come up in bark mulch in flowerbeds.",
  "faqs": [
   {
    "q": "Where do morels grow in Europe?",
    "a": "In old orchards, river woods under ash and elm, copses, hedgerows, parks and disturbed ground, often on chalky or limestone soil. Black morels turn up in bark mulch and shrubberies."
   },
   {
    "q": "Can you eat morels raw?",
    "a": "No. Raw morels are poisonous and must always be cooked through."
   },
   {
    "q": "How do you tell a morel from a false morel?",
    "a": "Slice it lengthwise. A true morel is one continuous hollow from cap tip to stem base, with a honeycomb of pits. A false morel has a lobed, brain-like cap and is chambered or stuffed with cottony tissue inside; it grows on sandy soil under pine and can be fatal."
   }
  ],
  "sources": [
   {
    "label": "Wikipedia — Morchella esculenta",
    "url": "https://en.wikipedia.org/wiki/Morchella_esculenta"
   },
   {
    "label": "Woodland Trust — Morel",
    "url": "https://www.woodlandtrust.org.uk/trees-woods-and-wildlife/fungi-and-lichens/morel/"
   },
   {
    "label": "First Nature — Morchella esculenta, Morel",
    "url": "https://www.first-nature.com/fungi/morchella-esculenta.php"
   }
  ]
 },
 "birch-sap": {
  "otherNames": "Birch water, birch juice; mahla (Finland), kasemahl (Estonia), bērzu sula (Latvia), sok z brzozy (Poland), berezovyi sik (Ukraine), björksav (Sweden)",
  "family": "Betulaceae (birch family)",
  "range": "A traditional spring drink across the boreal and hemiboreal north and east of Europe — Finland, Sweden, Norway, the Baltic states, Poland, Belarus and Ukraine — and tapped in France, Scotland and elsewhere too. Silver birch itself grows across Europe as far south as Spain.",
  "whenToPick": "Only at the turn of winter and spring, while the sap is rising hard and before any green leaves appear — about a month in all. Once the leaves open, the sap turns bitter.",
  "partsUsed": "The sap, fresh or naturally fermented. Boiled down, it makes birch syrup, a rare and expensive product.",
  "faqs": [
   {
    "q": "When can you tap birch trees?",
    "a": "In early spring, before the leaves break — roughly March in the south and April in the Nordic countries. The run lasts about a month, and sap taken after the leaves open is bitter."
   },
   {
    "q": "How long does birch sap keep?",
    "a": "Barely: two to five days in the fridge. After two or three days it starts to ferment and turn sour. Freeze it if you want to keep it."
   },
   {
    "q": "Does tapping hurt a birch tree?",
    "a": "It wounds it. Tapping holes consistently stain the wood, and one study found decay spreading from more than half of old tap holes; birches tolerate tapping less well than maples. Drill one small hole in a big, healthy tree, and plug it when you finish."
   },
   {
    "q": "What does birch sap taste like?",
    "a": "Like very soft water with a faint sweetness and a silky feel. As it ferments it turns tart."
   }
  ],
  "sources": [
   {
    "label": "Wikipedia — Birch sap",
    "url": "https://en.wikipedia.org/wiki/Birch_sap"
   },
   {
    "label": "Woodland Trust — Silver birch",
    "url": "https://www.woodlandtrust.org.uk/trees-woods-and-wildlife/british-trees/a-z-of-british-trees/silver-birch/"
   }
  ]
 },
 "european-elderflower": {
  "otherNames": "Elder, black elder, European elder; sureau noir (France), Holunder (Germany), fläder (Sweden), hyld (Denmark), bez czarny (Poland)",
  "family": "Viburnaceae (formerly Adoxaceae)",
  "range": "Native from the Azores across Europe to Turkey and the Middle East, and common throughout Britain and Ireland; introduced to most other continents. The North American elder (Sambucus canadensis) is a close relative that some botanists treat as a subspecies.",
  "whenToPick": "Late May and June, a little later in the north and at altitude. A head is ready when nearly all its flowers are open, creamy and sweet-smelling; browning heads make a bitter, stale-smelling drink.",
  "partsUsed": "Flowers only, fresh or dried, for cordial, wine, tea and fritters.",
  "poisonous": "Apart from the flowers and the ripe berries, every part of the plant — leaves, stems, bark, unripe berries, and the seeds — contains sambunigrin, a cyanogenic glycoside. Strip the flowers off the stalks.",
  "moreLookalikes": "Hemlock water-dropwort, common along streams in Britain, Ireland and western Europe, has white umbels at the same time of year; it is a hairless herb with hollow stems and tuberous roots, and is one of the most poisonous plants in Europe. Dwarf elder (Sambucus ebulus) flowers later in summer on herbaceous stems.",
  "faqs": [
   {
    "q": "When is elderflower season?",
    "a": "Late May through June in most of Europe, a week or two later in the north and the mountains. Pick on a dry, sunny morning when the heads are fully open and fragrant."
   },
   {
    "q": "Can you eat elderflowers raw?",
    "a": "The flowers are the edible part, steeped in cordial, infused as tea, or dipped in batter for fritters. Leave the leaves and stalks out: they are poisonous."
   },
   {
    "q": "What looks like elderflower but is poisonous?",
    "a": "Hemlock and hemlock water-dropwort carry flat white flower heads too, but they are soft-stemmed herbs; elder is a woody shrub with bark. Dwarf elder looks like elder but dies back to the ground each winter and smells foul."
   },
   {
    "q": "How do you tell elder from walnut or rowan?",
    "a": "Elder’s leaves are in opposite pairs, with five to seven toothed leaflets; walnut’s and rowan’s alternate along the twig. Elder bark is corky and furrowed."
   }
  ],
  "sources": [
   {
    "label": "Wikipedia — Sambucus nigra",
    "url": "https://en.wikipedia.org/wiki/Sambucus_nigra"
   },
   {
    "label": "Woodland Trust — Elder",
    "url": "https://www.woodlandtrust.org.uk/trees-woods-and-wildlife/british-trees/a-z-of-british-trees/elder/"
   },
   {
    "label": "Wikipedia — Oenanthe crocata (hemlock water-dropwort)",
    "url": "https://en.wikipedia.org/wiki/Oenanthe_crocata"
   },
   {
    "label": "Wikipedia — Sambucus ebulus (dwarf elder)",
    "url": "https://en.wikipedia.org/wiki/Sambucus_ebulus"
   }
  ]
 },
 "sweet-cicely": {
  "otherNames": "Cicely, garden myrrh, sweet chervil; cerfeuil musqué (France), Süßdolde (Germany)",
  "family": "Apiaceae (carrot family)",
  "range": "Native to the mountains of southern and central Europe, from the Pyrenees through the Alps to the Caucasus. Long naturalized elsewhere, including Scandinavia: in Britain and Ireland it is most common in northern England and eastern Scotland, on verges, stream banks and woodland edges.",
  "whenToPick": "Leaves from early spring; flowers from April to the end of June (into July in deep shade); the long seeds are green and tender in early summer and ripen dark brown by late summer.",
  "partsUsed": "Leaves, raw or cooked; the green seeds; and the root, cooked like parsnip, which tastes of liquorice.",
  "moreLookalikes": "Hemlock water-dropwort is the deadliest: a hairless plant of wet ground whose leaves smell of parsley or celery and whose roots carry pale, finger-like tubers. Of 13 human poisonings recorded in Britain between 1900 and 1978, nine were fatal.",
  "faqs": [
   {
    "q": "What does sweet cicely taste like?",
    "a": "Sweet and strongly of aniseed. The leaves are used to sweeten tart fruit, the green seeds taste like aniseed sweets, and the root has a liquorice flavour."
   },
   {
    "q": "How do you tell sweet cicely from hemlock?",
    "a": "By the whole plant, never one feature. Sweet cicely is soft and downy, smells strongly of aniseed, often has white-flecked leaves, and sets long seeds 15–25 mm (⅝–1 in). Hemlock has a smooth, hairless stem blotched with purple and smells musty; hemlock water-dropwort is hairless, grows in wet ground and smells of parsley or celery. If you are not certain, walk away — these mistakes kill."
   },
   {
    "q": "Where does sweet cicely grow?",
    "a": "Wild in the mountains of southern and central Europe; in Britain on roadside verges, stream banks and woodland edges, especially in northern England and Scotland, where it thrives at higher altitudes than cow parsley."
   }
  ],
  "sources": [
   {
    "label": "Wikipedia — Cicely (Myrrhis odorata)",
    "url": "https://en.wikipedia.org/wiki/Cicely"
   },
   {
    "label": "First Nature — Myrrhis odorata, Sweet Cicely",
    "url": "https://www.first-nature.com/flowers/myrrhis-odorata.php"
   },
   {
    "label": "Wikipedia — Oenanthe crocata (hemlock water-dropwort)",
    "url": "https://en.wikipedia.org/wiki/Oenanthe_crocata"
   }
  ]
 },
 "marsh-samphire": {
  "otherNames": "Glasswort, common glasswort, pickleweed, sea asparagus; salicorne (France), Queller (Germany)",
  "family": "Amaranthaceae (formerly Chenopodiaceae)",
  "range": "Most coastlines of Europe: the salt marshes of the North Sea and the English Channel — East Anglia is the classic British picking ground — the Atlantic coasts of France and Iberia, the Baltic and the Mediterranean.",
  "whenToPick": "June to August, while the shoots are green and tender; after that they turn woody, and the plant flowers in August and September. Treat a bed as cut-and-come-again, with about a month between cuts.",
  "partsUsed": "The fleshy green tips. On older plants, pull the flesh off the stringy central thread with your teeth.",
  "faqs": [
   {
    "q": "When is samphire in season?",
    "a": "From June to August in Europe. After that the shoots go woody and the plant turns red or purple in autumn."
   },
   {
    "q": "How do you cook samphire?",
    "a": "Rinse well, then boil or steam for a few minutes in plenty of water with no salt added — it is salty enough — and finish with butter or olive oil. It goes with fish."
   },
   {
    "q": "Can you eat samphire raw?",
    "a": "Yes, young tips are crisp and salty raw, and samphire is also pickled."
   },
   {
    "q": "Is it legal to pick samphire?",
    "a": "Cutting a few tips is how it is gathered, but in Britain it is an offence to uproot any wild plant without the landowner’s permission, and many salt marshes are nature reserves or protected sites with their own rules. Cut, don’t pull, and take only what you need."
   }
  ],
  "sources": [
   {
    "label": "Wikipedia — Salicornia europaea",
    "url": "https://en.wikipedia.org/wiki/Salicornia_europaea"
   },
   {
    "label": "The Wildlife Trusts — Common glasswort",
    "url": "https://www.wildlifetrusts.org/wildlife-explorer/wildflowers/common-glasswort"
   },
   {
    "label": "legislation.gov.uk — Wildlife and Countryside Act 1981, section 13 (protection of wild plants)",
    "url": "https://www.legislation.gov.uk/ukpga/1981/69/section/13"
   }
  ]
 },
 "sea-beet": {
  "otherNames": "Wild spinach, sea spinach; bette maritime (France)",
  "family": "Amaranthaceae (formerly Chenopodiaceae)",
  "range": "The coasts of Europe, North Africa and south-west Asia: right round England, Wales and Ireland and into southern Scotland, down the Atlantic coasts of France, Spain and Portugal, and around the Mediterranean. Occasionally inland on waste ground.",
  "whenToPick": "A perennial that stays green almost all year. The leaves are most tender in spring and again in autumn; the plant flowers from July to September.",
  "partsUsed": "The leaves, raw or cooked, minus the tough stems. The root is thin and woody — sea beet is the wild ancestor of beetroot, sugar beet and chard, not a beetroot itself.",
  "faqs": [
   {
    "q": "Can you eat sea beet raw?",
    "a": "Yes — young leaves are good raw in salad. Larger ones are better wilted or cooked like spinach, with the stems stripped out."
   },
   {
    "q": "Is sea beet related to beetroot?",
    "a": "It is their wild ancestor: beetroot, sugar beet and Swiss chard were all bred from Beta vulgaris, and the wild sea beet is the same species."
   },
   {
    "q": "Where does sea beet grow?",
    "a": "Along the coast, at the top of sand and shingle beaches, on sea walls, cliffs and salt-marsh drift lines. In Britain it is found round almost every coast except the very north of Scotland."
   }
  ],
  "sources": [
   {
    "label": "Wikipedia — Sea beet",
    "url": "https://en.wikipedia.org/wiki/Sea_beet"
   },
   {
    "label": "The Wildlife Trusts — Sea beet",
    "url": "https://www.wildlifetrusts.org/wildlife-explorer/wildflowers/sea-beet"
   }
  ]
 },
 "wood-strawberry": {
  "otherNames": "Wild strawberry, wood strawberry, alpine strawberry; fraise des bois (France), Walderdbeere (Germany)",
  "family": "Rosaceae (rose family)",
  "range": "Throughout most of Europe, from the Mediterranean mountains to northern Scandinavia, and across much of the northern hemisphere, North America included. In Britain it grows almost everywhere except the far north of Scotland, though it is now classed as near threatened in England.",
  "whenToPick": "Flowers from April to July; berries from June, mostly June and July in the lowlands and later in the mountains and the north. A ripe berry lasts barely a day before something eats it.",
  "partsUsed": "The berries. The leaves have a long history in traditional remedies but are not food.",
  "faqs": [
   {
    "q": "What is the difference between wild strawberries and alpine strawberries?",
    "a": "They are the same species. Alpine strawberries are garden selections of Fragaria vesca that flower and fruit all summer, often without runners; the wild plant fruits once, in early summer."
   },
   {
    "q": "How do you tell a wild strawberry from a barren strawberry?",
    "a": "By the flowers and the fruit. Barren strawberry flowers from early spring with petals that have gaps between them and a notch at each tip, and it never makes a red berry. Wild strawberry petals are rounded and touch, and its leaves are shinier."
   },
   {
    "q": "When are wild strawberries ripe?",
    "a": "From June into August, depending on how far north and how high you are. They ripen a few at a time over weeks, so a patch is worth visiting more than once."
   },
   {
    "q": "Can children pick wild strawberries?",
    "a": "Yes, once you have shown them the plant: three shiny toothed leaflets, white flowers, and a small red berry with its seeds on the outside. Teach them to leave any red berry from a plant they can’t name, and to skip patches beside paths where dogs are walked."
   }
  ],
  "sources": [
   {
    "label": "Wikipedia — Fragaria vesca",
    "url": "https://en.wikipedia.org/wiki/Fragaria_vesca"
   },
   {
    "label": "Woodland Trust — Wild strawberry",
    "url": "https://www.woodlandtrust.org.uk/trees-woods-and-wildlife/plants/wild-flowers/wild-strawberry/"
   }
  ]
 },
 "girolle": {
  "otherNames": "Golden chanterelle, chanterelle; girolle (France), Pfifferling (Germany), kantarell (Sweden), kurka (Poland), finferlo (Italy)",
  "family": "Cantharellaceae",
  "range": "European. DNA studies have shown that Cantharellus cibarius in the strict sense is a European species, found from Scandinavia to the Mediterranean; North America’s golden chanterelles are a group of related species. Frequent but local in Britain and Ireland, under birch, oak, beech and conifers, with a preference for acid soil.",
  "whenToPick": "June or July to October in Britain and northern Europe, after warm rain, and into November in mild autumns. In southern Europe it fruits from October right through to the following March.",
  "partsUsed": "The whole mushroom, cooked.",
  "moreLookalikes": "Fool’s webcap (Cortinarius orellanus), an orange-brown webcap of oak and beech woods, was eaten as chanterelles by four people in Austria in 1997, who suffered kidney poisoning. Deadly webcap poisoned three people near Inverness in 1979 the same way; two needed kidney transplants.",
  "faqs": [
   {
    "q": "How do you tell a chanterelle from a false chanterelle?",
    "a": "Look underneath and break it open. A chanterelle has blunt, shallow ridges that fork and run down the stem, firm solid flesh that is pale inside, and an apricot smell. The false chanterelle is a brighter orange, softer, with thin, true, forking gills."
   },
   {
    "q": "Is a chanterelle the same as a girolle?",
    "a": "Yes. Girolle is the French market name for Cantharellus cibarius, the golden chanterelle."
   },
   {
    "q": "What poisonous mushrooms look like chanterelles?",
    "a": "In southern Europe, the Mediterranean jack-o’-lantern, which grows in orange clusters on stumps and olive roots and has sharp true gills. Everywhere, the webcaps (Cortinarius) — rusty-brown, with true gills and a rusty spore print — which have been eaten as chanterelles and destroy the kidneys, with symptoms days or weeks later."
   },
   {
    "q": "When is chanterelle season in Europe?",
    "a": "From early summer to autumn in the north — in Britain mostly July to October — and from October to March in the Mediterranean."
   }
  ],
  "sources": [
   {
    "label": "Wikipedia — Cantharellus cibarius",
    "url": "https://en.wikipedia.org/wiki/Cantharellus_cibarius"
   },
   {
    "label": "Woodland Trust — Chanterelle",
    "url": "https://www.woodlandtrust.org.uk/trees-woods-and-wildlife/fungi-and-lichens/chanterelle/"
   },
   {
    "label": "First Nature — Cantharellus cibarius, Chanterelle",
    "url": "https://www.first-nature.com/fungi/cantharellus-cibarius.php"
   },
   {
    "label": "Wikipedia — Cortinarius orellanus (fool’s webcap)",
    "url": "https://en.wikipedia.org/wiki/Cortinarius_orellanus"
   }
  ]
 },
 "bilberry": {
  "otherNames": "Blaeberry (Scotland), whortleberry, whinberry, wimberry, fraughan (Ireland), European blueberry; myrtille (France), Heidelbeere (Germany), mustikka (Finland)",
  "family": "Ericaceae (heather family)",
  "range": "Native to almost every country in Europe — absent only from Sardinia, Sicily, Crete, Cyprus, the Aegean islands, European Turkey, Crimea and southern European Russia. Enormous crops in the forests of Scandinavia and Finland; in Britain mainly the uplands of the north and west; in the south a mountain plant, up to about 2,350 m (7,700 ft). It also grows in western North America.",
  "whenToPick": "Flowers in April and May; the berries ripen from July to September — earliest in the lowlands of central Europe, later in the north and the mountains. Ripe berries are blue-black all over and come away at a touch.",
  "partsUsed": "The berries, raw or cooked. The leaves have been used in folk medicine but are not food.",
  "poisonous": "The leaves may be unsafe to eat; only the berries are food.",
  "moreLookalikes": "Herb Paris (Paris quadrifolia) of damp woods carries one blue-black berry on a stalk above a ring of four broad leaves. It is poisonous, though the berry tastes so bad that poisonings are rare.",
  "faqs": [
   {
    "q": "What is the difference between a bilberry and a blueberry?",
    "a": "The inside. A bilberry is purple-red all the way through and stains everything; a cultivated blueberry has pale flesh. Bilberries also grow one per stalk on a knee-high wild shrub, where blueberries hang in clusters on tall bushes."
   },
   {
    "q": "When are bilberries ripe?",
    "a": "July to September. They start in July in the lowlands and southern Britain and run into August and September in Scandinavia and the mountains."
   },
   {
    "q": "Where do bilberries grow?",
    "a": "On acid, nutrient-poor soil: pine, spruce, birch and oak woods, heath and moorland, often carpeting the ground in dappled shade."
   },
   {
    "q": "What should children know before picking bilberries?",
    "a": "To pick only from the low shrub with green, angled stems, and to bring you any other black berry first. Deadly nightshade has shiny black berries of a similar size, but they grow singly on a branching herb up to 1.5 m (5 ft) tall and sit in a green five-pointed star; a few can kill a child. Herb Paris holds a single blue-black berry above four leaves."
   }
  ],
  "sources": [
   {
    "label": "Wikipedia — Vaccinium myrtillus",
    "url": "https://en.wikipedia.org/wiki/Vaccinium_myrtillus"
   },
   {
    "label": "Woodland Trust — Bilberry",
    "url": "https://www.woodlandtrust.org.uk/trees-woods-and-wildlife/plants/wild-flowers/bilberry/"
   },
   {
    "label": "Wikipedia — Atropa bella-donna (deadly nightshade)",
    "url": "https://en.wikipedia.org/wiki/Atropa_bella-donna"
   },
   {
    "label": "Wikipedia — Paris quadrifolia (herb Paris)",
    "url": "https://en.wikipedia.org/wiki/Paris_quadrifolia"
   }
  ]
 },
 "rowan": {
  "otherNames": "Mountain ash, European mountain ash, quickbeam; pihlaja (Finland), Vogelbeere or Eberesche (Germany)",
  "family": "Rosaceae (rose family)",
  "range": "Almost all of Europe, from Madeira, the British Isles and Iceland east to Russia — though not native in southern Spain, southern Greece, Sardinia, the Balearics, the Azores or the Faroes. Most common in Britain in the north and west and the Scottish Highlands; up to about 2,000 m (6,600 ft) in the Alps and as far north as 71°N in Norway.",
  "whenToPick": "Berries colour in August and ripen into October. They are traditionally cut by the whole cluster after the first frost; a night in the freezer does the same job.",
  "partsUsed": "The berries, cooked. Raw ones are bitter; the seeds contain a glycoside and are best strained out of jelly.",
  "poisonous": "Raw berries contain parasorbic acid, which irritates the stomach lining and is laxative. Cooking, freezing or drying breaks it down.",
  "faqs": [
   {
    "q": "Are rowan berries poisonous?",
    "a": "Not once cooked. Raw they are bitter, astringent and laxative, because of parasorbic acid; cooking, drying or freezing breaks it down. They are rich in vitamin C."
   },
   {
    "q": "When do you pick rowan berries?",
    "a": "From late August to October, when they are fully scarlet-orange — ideally after the first frost, or freeze them overnight at home."
   },
   {
    "q": "What do you make with rowan berries?",
    "a": "Tart rowan jelly, the classic with lamb and game; also jam, syrup, chutney, wine and liqueurs. They are often mixed with crab apples for jelly."
   },
   {
    "q": "Is rowan the same as mountain ash?",
    "a": "Yes — mountain ash is another name for rowan. Despite the name it is not related to true ash trees (Fraxinus); it is in the rose family."
   },
   {
    "q": "Are rowan berries dangerous for children?",
    "a": "Raw rowan berries are not seriously poisonous, but they are bitter, irritate the stomach and act as a laxative, so teach children that the street-tree berries are for jelly, not snacking. Yew and cotoneaster in the same parks also have red fruit, and yew’s seed is deadly."
   }
  ],
  "sources": [
   {
    "label": "Wikipedia — Sorbus aucuparia",
    "url": "https://en.wikipedia.org/wiki/Sorbus_aucuparia"
   },
   {
    "label": "Woodland Trust — Rowan",
    "url": "https://www.woodlandtrust.org.uk/trees-woods-and-wildlife/british-trees/a-z-of-british-trees/rowan/"
   }
  ]
 },
 "sea-buckthorn": {
  "otherNames": "Sandthorn, sallowthorn, seaberry; tyrni (Finland), Sanddorn (Germany), cătină (Romania)",
  "family": "Elaeagnaceae (oleaster family)",
  "range": "Cold-temperate Europe and Asia. In Europe it is native on the North Sea coasts of eastern England, the Netherlands and Denmark, the Baltic coasts of Germany, Poland, Latvia and Finland, the Gulf of Bothnia and the Norwegian coast; in the Carpathians and in south-eastern Europe. Widely planted to hold dunes, and invasive on many coasts outside its native range.",
  "whenToPick": "The berries turn orange in August and ripen through September and October. They hang on into winter, feeding migrant thrushes.",
  "partsUsed": "The berries, usually juiced or cooked with sugar. The oily seeds and pulp are pressed for cosmetic oil.",
  "faqs": [
   {
    "q": "What does sea buckthorn taste like?",
    "a": "Intensely sour and a little astringent. The sourness is mostly malic acid and the astringency quinic acid, so most people sweeten it or mix it with other fruit."
   },
   {
    "q": "How do you pick sea buckthorn berries?",
    "a": "Carefully, with thick gloves. The berries cling tight and burst when pulled, so pickers often snip a few laden twigs, freeze them, and knock the frozen berries off into a bowl."
   },
   {
    "q": "Why does my sea buckthorn have no berries?",
    "a": "Male and female flowers grow on separate shrubs, and only the females fruit — with a male close enough to pollinate them."
   },
   {
    "q": "Where does sea buckthorn grow wild?",
    "a": "On coastal dunes and cliffs around the North Sea and Baltic, on river gravels in the mountains, and on dry slopes from the Carpathians east. In Britain it is native on the east coast of England and planted elsewhere."
   }
  ],
  "sources": [
   {
    "label": "Wikipedia — Sea buckthorn (Hippophae rhamnoides)",
    "url": "https://en.wikipedia.org/wiki/Sea_buckthorn"
   },
   {
    "label": "The Wildlife Trusts — Sea-buckthorn",
    "url": "https://www.wildlifetrusts.org/wildlife-explorer/trees-and-shrubs/sea-buckthorn"
   }
  ]
 },
 "european-elderberry": {
  "otherNames": "Elder, black elder, European elder; sureau noir (France), Holunder or Fliederbeere (Germany), fläder (Sweden), hyld (Denmark), bez czarny (Poland)",
  "family": "Viburnaceae (formerly Adoxaceae)",
  "range": "Native from the Azores across Europe to Turkey and the Middle East, and common throughout Britain and Ireland, in hedges, scrub, woodland edges, riverbanks and waste ground; introduced to most other continents.",
  "whenToPick": "The berries ripen from late summer into autumn — mostly late August and September. Take whole heads when every berry is glossy purple-black and the cluster droops under its weight.",
  "partsUsed": "Ripe berries, cooked: syrup, jelly, chutney, soup, wine, and in pies with apple or blackberry.",
  "poisonous": "Raw berries are mildly poisonous, and the seeds, leaves, stems and bark contain the cyanogenic glycoside sambunigrin; badly prepared berries cause nausea, vomiting and severe diarrhoea. Cook them through and remove every bit of green stalk.",
  "moreLookalikes": "Red-berried elder (Sambucus racemosa), a shrub of central European woods and mountains, flowers earlier in domed clusters and carries scarlet berries; treat them as not edible.",
  "faqs": [
   {
    "q": "Are raw elderberries poisonous?",
    "a": "Mildly. Raw berries, and the seeds and green parts, contain compounds that cause nausea, vomiting and diarrhoea. The ripe berries are eaten cooked; never eat the leaves or stalks."
   },
   {
    "q": "When are elderberries ripe?",
    "a": "In late August and September in most of Europe, when the clusters hang heavy and every berry is purple-black."
   },
   {
    "q": "What is the difference between elder and dwarf elder?",
    "a": "Elder is a woody shrub or small tree with corky bark and drooping berry heads. Dwarf elder (danewort) is a herb 1–2 m (3–6 ft) tall that dies back to the ground every winter, grows in patches, smells foul when bruised and holds its berry heads upright. Every part of dwarf elder is poisonous."
   },
   {
    "q": "Can children eat elderberries?",
    "a": "Only cooked, in syrups, jams and pies. Raw berries, leaves and stalks make people sick, and children are the ones most likely to graze on a hedge — teach them that elderberries go in the pot first."
   }
  ],
  "sources": [
   {
    "label": "Wikipedia — Sambucus nigra",
    "url": "https://en.wikipedia.org/wiki/Sambucus_nigra"
   },
   {
    "label": "Woodland Trust — Elder",
    "url": "https://www.woodlandtrust.org.uk/trees-woods-and-wildlife/british-trees/a-z-of-british-trees/elder/"
   },
   {
    "label": "Wikipedia — Sambucus ebulus (dwarf elder)",
    "url": "https://en.wikipedia.org/wiki/Sambucus_ebulus"
   }
  ]
 },
 "cornelian-cherry": {
  "otherNames": "European cornel, cornel cherry; cornouille (France), Kornelkirsche or Dirndl (Germany, Austria), corniolo (Italy), dren (Serbia, Bulgaria)",
  "family": "Cornaceae (dogwood family)",
  "range": "Native to southern and central Europe and south-west Asia, in woods and scrub especially on limestone — from eastern France and southern Germany through Austria, Czechia, Hungary, Romania and the Balkans to Italy, Greece and Turkey. Naturalized in Britain from old plantings.",
  "whenToPick": "Yellow flowers in February and March, ahead of forsythia; the fruit ripens in mid to late summer, mostly August and September, and is ready when it is deep red and soft enough to drop.",
  "partsUsed": "The flesh of the ripe fruit, raw or cooked. The single stone is not eaten.",
  "faqs": [
   {
    "q": "When are cornelian cherries ripe?",
    "a": "Late summer, usually August into September. Wait for dark ruby-red, soft fruit that falls when the branch is shaken; unripe ones are astringent."
   },
   {
    "q": "What do cornelian cherries taste like?",
    "a": "Tart — somewhere between cranberry and sour cherry. That is why they go into jam, syrup, sauces and fruit spirits rather than the fruit bowl."
   },
   {
    "q": "Is the cornelian cherry a real cherry?",
    "a": "No. It is a dogwood (Cornus); the name comes from its cherry-like red fruit, which holds a single stone."
   },
   {
    "q": "Can children eat cornelian cherries from the park?",
    "a": "Yes, once you are sure of the tree and the fruit is fully ripe — and the stone goes in the bin. Yew often grows in the same parks and also has red fruit, but it is an open cup showing a seed, and that seed is deadly."
   }
  ],
  "sources": [
   {
    "label": "Wikipedia — Cornus mas",
    "url": "https://en.wikipedia.org/wiki/Cornus_mas"
   },
   {
    "label": "Plants For A Future — Cornus mas",
    "url": "https://pfaf.org/user/Plant.aspx?LatinName=Cornus+mas"
   }
  ]
 },
 "saffron-milk-cap": {
  "otherNames": "Red pine mushroom, delicious milk cap; níscalo or robellón (Spain), rovelló (Catalonia), rydz (Poland), ryzhik (Russia)",
  "family": "Russulaceae",
  "range": "A European species of pine forest: the Mediterranean pinewoods of Spain, Portugal, southern France, Italy, Greece and Cyprus, north through central Europe to the pine forests of Scandinavia and Russia; widespread but uncommon in Britain and Ireland. It has travelled with planted pines to Chile, Australia, New Zealand and South Africa.",
  "whenToPick": "August to October in Britain and northern Europe. In Spain and around the Mediterranean the main flush follows the autumn rains, in October and November.",
  "partsUsed": "The whole mushroom, cooked, salted or pickled.",
  "faqs": [
   {
    "q": "How do you identify a saffron milk cap?",
    "a": "A carrot-orange cap with darker rings, growing under pine; break it and it bleeds carrot-orange milk, and bruised parts slowly turn green. The gills run a little down the short stem."
   },
   {
    "q": "Why did my urine turn red after eating saffron milk caps?",
    "a": "Eating a lot of them can turn urine orange to red. It is harmless and passes."
   },
   {
    "q": "What is the difference between saffron milk cap and false saffron milk cap?",
    "a": "Where they grow and what the milk does. The saffron milk cap is a pine mushroom whose orange milk stays orange; the false saffron milk cap grows under spruce, and its milk turns wine-red within ten to thirty minutes. Both are edible; the false one is often bitter and maggoty."
   },
   {
    "q": "Are there poisonous mushrooms that look like saffron milk caps?",
    "a": "The woolly milkcap, under birch, is pinker with a shaggy woolly rim and white, peppery milk, and it causes stomach upsets unless specially prepared. Any milk cap that bleeds white milk is not a saffron milk cap."
   }
  ],
  "sources": [
   {
    "label": "Wikipedia — Lactarius deliciosus",
    "url": "https://en.wikipedia.org/wiki/Lactarius_deliciosus"
   },
   {
    "label": "First Nature — Lactarius deliciosus, Saffron Milkcap",
    "url": "https://www.first-nature.com/fungi/lactarius-deliciosus.php"
   },
   {
    "label": "Wikipedia — Lactarius deterrimus (false saffron milkcap)",
    "url": "https://en.wikipedia.org/wiki/Lactarius_deterrimus"
   }
  ]
 },
 "parasol-mushroom": {
  "otherNames": "Parasol, snake’s hat; coulemelle or lépiote élevée (France), mazza di tamburo (Italy), Riesenschirmling (Germany), kania (Poland)",
  "family": "Agaricaceae",
  "range": "Widespread in temperate Europe on well-drained soil: frequent in southern Britain and Ireland, less so in northern England and Scotland except on sheltered coasts, and common across mainland Europe to the Mediterranean. Whether North American parasols are the same species is not yet settled.",
  "whenToPick": "July to November in Britain; summer and autumn across Europe, after rain.",
  "partsUsed": "The cap. The stem is too fibrous to eat, though some people dry and powder it.",
  "moreLookalikes": "The green-spored parasol (Chlorophyllum molybdites), the commonest cause of mushroom poisoning in North America, has greenish gills when mature, a green spore print and no snakeskin, and is reported to be spreading in Europe. Lepiota brunneoincarnata, a small parasol, has caused fatal poisonings in Spain.",
  "faqs": [
   {
    "q": "How do you identify a parasol mushroom?",
    "a": "By the full set: a big scaly cap 10–25 cm (4–10 in) across with a dark central bump, a tall stem with brown snakeskin banding, a thick double ring that slides up and down, free white gills and a white spore print. Young ones look like drumsticks."
   },
   {
    "q": "What is the difference between a parasol and a shaggy parasol?",
    "a": "The stem. A parasol’s stem is snakeskin-patterned; a shaggy parasol’s is smooth, and its flesh reddens when cut. Shaggy parasols upset many people’s stomachs, so leave them."
   },
   {
    "q": "Are small parasol mushrooms poisonous?",
    "a": "Some are deadly. Several small Lepiota species carry the same toxins as the death cap. Never pick a ‘parasol’ with a cap under 10 cm (4 in) across."
   },
   {
    "q": "Can you eat parasol mushroom stems?",
    "a": "Not as they are — they are tough and fibrous. Use the caps, and dry the stems for powder if you like."
   }
  ],
  "sources": [
   {
    "label": "Wikipedia — Macrolepiota procera",
    "url": "https://en.wikipedia.org/wiki/Macrolepiota_procera"
   },
   {
    "label": "First Nature — Macrolepiota procera, Parasol",
    "url": "https://www.first-nature.com/fungi/macrolepiota-procera.php"
   }
  ]
 },
 "black-trumpet": {
  "otherNames": "Horn of plenty, black chanterelle, trumpet of the dead; trompette de la mort (France), trombetta dei morti (Italy), Totentrompete (Germany)",
  "family": "Cantharellaceae",
  "range": "Generally common in woods across Europe, from the Mediterranean to southern Scandinavia, though rare in some countries such as the Netherlands; mainly under beech, oak and other broadleaves on heavy, chalky soil. Also in East Asia, North America and Australia.",
  "whenToPick": "June to November across Europe; in Britain mostly August to November.",
  "partsUsed": "The whole fruit body, cooked or dried.",
  "faqs": [
   {
    "q": "Why is it called trumpet of the dead?",
    "a": "The old story is that the trumpets coming up through the leaf litter were being played by the dead underground. The French and Catalan names mean the same thing."
   },
   {
    "q": "Are black trumpets hard to find?",
    "a": "Yes — they are almost black, on dark leaf litter, and hunters describe it as looking for black holes in the ground. Once you find one, look closely around it: they grow in groups."
   },
   {
    "q": "What can be mistaken for a black trumpet?",
    "a": "The rare ashen chanterelle, which is grey too but has shallow ridges like gills underneath; it is edible. A black trumpet is a thin, hollow funnel, sooty inside, with a smooth or faintly wrinkled paler outer surface — check every one for that shape."
   }
  ],
  "sources": [
   {
    "label": "Wikipedia — Craterellus cornucopioides",
    "url": "https://en.wikipedia.org/wiki/Craterellus_cornucopioides"
   },
   {
    "label": "First Nature — Craterellus cornucopioides, Horn of Plenty",
    "url": "https://www.first-nature.com/fungi/craterellus-cornucopioides.php"
   }
  ]
 },
 "hedgehog-mushroom": {
  "otherNames": "Wood hedgehog, sweet tooth, pig’s trotter; pied-de-mouton (France), Semmelstoppelpilz (Germany), steccherino dorato (Italy)",
  "family": "Hydnaceae",
  "range": "Broadly distributed in Europe, from the Mediterranean to Scandinavia, in coniferous and deciduous woods — one of the commonest tooth fungi. Red-listed as vulnerable in the Netherlands, Belgium and Germany. North America has related hedgehog species.",
  "whenToPick": "Summer to autumn; in Britain mainly from August to November.",
  "partsUsed": "The whole mushroom, cooked. Older ones can be bitter — boiling first takes it away.",
  "faqs": [
   {
    "q": "How do you identify a hedgehog mushroom?",
    "a": "Turn it over. From above it looks like a pale chanterelle or a dozen other buff mushrooms; underneath it has soft, crowded, pale spines instead of gills or ridges, and its firm white flesh bruises orange. That spiny underside is why it is a classic first mushroom."
   },
   {
    "q": "How do you clean hedgehog mushrooms?",
    "a": "Brush the cap and stem as you pick them, before soil works in between the spines. Older, gritty spines can be scraped off."
   },
   {
    "q": "Why are my hedgehog mushrooms bitter?",
    "a": "Older specimens develop a bitter taste, and ones from under conifers can taste strong. Boil them briefly and discard the water before cooking."
   }
  ],
  "sources": [
   {
    "label": "Wikipedia — Hydnum repandum",
    "url": "https://en.wikipedia.org/wiki/Hydnum_repandum"
   },
   {
    "label": "First Nature — Hydnum repandum, Wood Hedgehog",
    "url": "https://www.first-nature.com/fungi/hydnum-repandum.php"
   }
  ]
 },
 "yellowfoot": {
  "otherNames": "Winter chanterelle, trumpet chanterelle, funnel chanterelle, yellowlegs; trattkantarell (Sweden), suppilovahvero (Finland), chanterelle en tube (France)",
  "family": "Cantharellaceae",
  "range": "Temperate and cold Europe: very common and widespread in Scandinavia and Finland, patchy in Britain and Ireland (most abundant in west Wales, north-west England and Scotland), and in the hills and mountains further south. Also in North America and Asia.",
  "whenToPick": "Late in the season: September to November in Britain and Ireland, often after the golden chanterelles are over, until the hard frosts.",
  "partsUsed": "The whole mushroom, cooked or dried.",
  "moreLookalikes": "Deadly webcap (Cortinarius rubellus) is the one that matters. Between 1979 and 1993, 22 people in Sweden were poisoned by it, nine of whom needed kidney transplants; the edibles they thought they had picked included yellowfoot and chanterelles.",
  "faqs": [
   {
    "q": "What is a yellowfoot mushroom?",
    "a": "A small chanterelle relative, Craterellus tubaeformis, with a brown funnel cap, a hollow yellow stem and forked ridges instead of gills. It comes late in autumn in mossy conifer forest, often in huge numbers."
   },
   {
    "q": "What can be mistaken for yellowfoot?",
    "a": "Deadly webcap, which grows in the same mossy conifer woods and has destroyed foragers’ kidneys. It has true rusty-brown gills, a solid stem and a rusty spore print. Yellowfoot’s stem is hollow and its underside has blunt, forked ridges."
   },
   {
    "q": "When do winter chanterelles grow?",
    "a": "From September to the first hard frosts — in Britain and Ireland mostly September to November."
   }
  ],
  "sources": [
   {
    "label": "Wikipedia — Craterellus tubaeformis",
    "url": "https://en.wikipedia.org/wiki/Craterellus_tubaeformis"
   },
   {
    "label": "First Nature — Cantharellus tubaeformis, Trumpet Chanterelle",
    "url": "https://www.first-nature.com/fungi/cantharellus-tubaeformis.php"
   },
   {
    "label": "Wikipedia — Cortinarius rubellus (deadly webcap)",
    "url": "https://en.wikipedia.org/wiki/Cortinarius_rubellus"
   }
  ]
 },
 "sloe": {
  "otherNames": "Blackthorn; prunelle (France), Schlehe (Germany), endrina (Spain)",
  "family": "Rosaceae (rose family)",
  "range": "Native to Europe and western Asia, and locally in north-west Africa — hedgerows, scrub, copses and woodland edges, from Britain and Ireland to the Mediterranean and the Black Sea. Naturalized in parts of eastern North America.",
  "whenToPick": "White blossom in March and April, before the leaves. The sloes ripen in late autumn and are traditionally picked in October or November, after the first frosts have softened the skins; a night in the freezer has the same effect.",
  "partsUsed": "The fruit, steeped in spirit or cooked. In France the young spring shoots flavour épine wine.",
  "poisonous": "The stone, like all Prunus stones, contains compounds that release hydrogen cyanide. Never crush or eat the stones.",
  "faqs": [
   {
    "q": "When should you pick sloes?",
    "a": "Once they are dull blue-black and slightly soft — in Britain traditionally October or November, after the first frosts. If you pick earlier, freeze them overnight before using them."
   },
   {
    "q": "Can you eat sloes raw?",
    "a": "You can, but they are so astringent that one is usually enough. Frost or freezing softens them a little; they are really for gin, jelly and wine."
   },
   {
    "q": "How do you tell blackthorn from hawthorn?",
    "a": "In spring, blackthorn flowers on bare black twigs before its leaves open; hawthorn leafs first and flowers in May. In autumn, blackthorn has blue-black sloes with one stone, and hawthorn has red haws."
   },
   {
    "q": "Are sloes poisonous to children?",
    "a": "The flesh is not, and it is so sour that children rarely eat many. The stones should never be cracked or chewed, because they hold cyanide-releasing compounds. Make sure it came off a thorny bush: deadly nightshade’s shiny black berries grow on a soft, leafy herb."
   }
  ],
  "sources": [
   {
    "label": "Wikipedia — Prunus spinosa",
    "url": "https://en.wikipedia.org/wiki/Prunus_spinosa"
   },
   {
    "label": "Woodland Trust — Blackthorn",
    "url": "https://www.woodlandtrust.org.uk/trees-woods-and-wildlife/british-trees/a-z-of-british-trees/blackthorn/"
   }
  ]
 },
 "sweet-chestnut": {
  "otherNames": "Spanish chestnut, European chestnut; châtaigne or marron (France), castagna (Italy), castaña (Spain), Esskastanie (Germany)",
  "family": "Fagaceae (beech and oak family)",
  "range": "Native to southern Europe and Anatolia (the Woodland Trust adds North Africa), and spread by people across western and central Europe. The great chestnut country is the hills of Portugal, Spain, southern France, Italy, southern Switzerland and the Balkans; in Britain it is an old introduction, common as coppice in the south-east.",
  "whenToPick": "The nuts fall in October, with stragglers into November, when the spiny husks split on the tree or on the ground. The trees flower in late June and July in long, heavy-scented catkins.",
  "partsUsed": "The nuts — roasted, boiled, dried or milled into flour. Husks and leaves are not eaten.",
  "faqs": [
   {
    "q": "How do you tell sweet chestnuts from conkers?",
    "a": "By the husk and the nut. Sweet chestnut husks bristle with dense, needle-sharp spines and hold two or three nuts that are flat on one side with a pointed tuft. Horse chestnut husks have a few short, stubby spikes and usually hold one big, round, glossy conker with a pale scar and no point. The leaves differ too: one long toothed blade for sweet chestnut, a hand of five to seven leaflets for horse chestnut."
   },
   {
    "q": "Are conkers poisonous?",
    "a": "Yes. Raw horse chestnut seeds contain aesculin and saponins and cause sickness if eaten. Only sweet chestnuts are food."
   },
   {
    "q": "When do sweet chestnuts fall?",
    "a": "In October, sometimes into November. Collect them from the ground as the husks split, and choose plump, heavy nuts."
   },
   {
    "q": "What should children know about conkers?",
    "a": "That conkers are for games, not for eating — raw horse chestnuts make people sick. A sweet chestnut comes from a husk bristling with fine, needle-sharp spines and has a pointed tip; a round, glossy nut from a husk with a few stubby spikes is a conker."
   }
  ],
  "sources": [
   {
    "label": "Wikipedia — Sweet chestnut (Castanea sativa)",
    "url": "https://en.wikipedia.org/wiki/Sweet_chestnut"
   },
   {
    "label": "Woodland Trust — Sweet chestnut",
    "url": "https://www.woodlandtrust.org.uk/trees-woods-and-wildlife/british-trees/a-z-of-british-trees/sweet-chestnut/"
   },
   {
    "label": "Woodland Trust — Horse chestnut",
    "url": "https://www.woodlandtrust.org.uk/trees-woods-and-wildlife/british-trees/a-z-of-british-trees/horse-chestnut/"
   },
   {
    "label": "Wikipedia — Aesculus hippocastanum (horse chestnut toxicity)",
    "url": "https://en.wikipedia.org/wiki/Aesculus_hippocastanum"
   }
  ]
 },
 "strawberry-tree": {
  "otherNames": "Arbutus, Irish strawberry tree, Killarney strawberry tree; madroño (Spain), medronheiro (Portugal), corbezzolo (Italy), arbousier (France)",
  "family": "Ericaceae (heather family)",
  "range": "Around the Mediterranean — Portugal, Spain, western and south-eastern France, Italy, the Adriatic coast, Greece and Turkey — and south into Morocco, Algeria, Tunisia and Libya, with famous outlying populations in south-west and western Ireland. Hardy outdoors in zone 7 and warmer.",
  "whenToPick": "The fruit takes about a year to ripen and is ready from October into December, at the same time as the next flowers open. Frost at flowering time cuts the following year’s crop.",
  "partsUsed": "The fully ripe fruit, fresh or cooked. The leaves have folk-medicine uses but are not food.",
  "faqs": [
   {
    "q": "Can you eat strawberry tree fruit?",
    "a": "Yes, when fully ripe — deep red and soft. It is sweet but mild and gritty with small seeds, and bruises so easily that it rarely reaches shops. It is mostly made into jam, jelly and liqueurs."
   },
   {
    "q": "Why is it called unedo?",
    "a": "The name is credited to Pliny the Elder: unum tantum edo, ‘I eat only one’ — a comment on the fruit’s bland flavour and gritty texture."
   },
   {
    "q": "What is medronho?",
    "a": "A strong Portuguese brandy distilled from fermented strawberry-tree fruit. In Albania the fruit makes a rakia."
   },
   {
    "q": "Is the strawberry tree native to Ireland?",
    "a": "It grows wild in south-west and western Ireland, around Killarney especially, and was long thought native; recent genetic studies suggest it may have been brought by people thousands of years ago."
   }
  ],
  "sources": [
   {
    "label": "Wikipedia — Arbutus unedo",
    "url": "https://en.wikipedia.org/wiki/Arbutus_unedo"
   },
   {
    "label": "Plants For A Future — Arbutus unedo",
    "url": "https://pfaf.org/user/Plant.aspx?LatinName=Arbutus+unedo"
   }
  ]
 },
 "baobab": {
  "otherNames": "Monkey-bread tree, upside-down tree, cream of tartar tree; tebeldi (Sudan), kuka (Hausa)",
  "family": "Malvaceae (the mallow family, with hibiscus and cacao)",
  "range": "The dry savannas of tropical and southern Africa: the Sahel and Sudanian belt from Senegal to Sudan, the coastal savannas of the Gulf of Guinea, the dry country of Tanzania and the East African coast, and south through Zambia, Zimbabwe, Malawi, Mozambique, northern Botswana and northern Namibia. In South Africa it grows wild only in the warm, frost-free parts of Limpopo. It needs hot, dry, frost-free ground and is absent from the rainforest.",
  "whenToPick": "Leaves first: they appear shortly after the first rains and young ones are picked through the wet season. The fruit ripens later, in the dry season — harvest only once the shell is dry and brown and the seeds rattle, because fruit taken in the wet season goes mouldy. In southern Africa the trees flower October to December and fruit from about April to May. Dry pods keep for months.",
  "partsUsed": "Fruit pulp (raw, or soaked for drinks and porridge), young leaves (cooked, or dried and powdered), and seeds (sucked, roasted, or pressed for oil). Bark is stripped for fibre in many places, but in South Africa that, like any damage to the tree, needs a licence.",
  "faqs": [
   {
    "q": "When is baobab fruit ripe?",
    "a": "When the velvety outer shell has turned brown and dry and the seeds rattle inside when you shake it. Unripe fruit has a poorer, less lemony flavour, and fruit gathered in the wet season develops mould. In southern Africa the fruit is ready from about April."
   },
   {
    "q": "Can you eat baobab leaves?",
    "a": "Yes. Young baobab leaves are a much-used vegetable in West Africa, cooked in soups and sauces or dried and ground into a powder that flavours couscous and stews. They are rich in vitamin C. Pick young leaves in the rains, and only a few from each tree."
   },
   {
    "q": "Is it legal to pick baobab fruit in South Africa?",
    "a": "Yes, in small amounts for your own household. The baobab is a protected tree under the National Forests Act, and cutting, damaging or trading in it needs a licence, but a 2007 government exemption allows small, non-commercial quantities of fruit — up to half the fruit of any tree in natural, rural areas."
   },
   {
    "q": "How do you eat baobab fruit?",
    "a": "Crack the hard shell and pull out the dry, chalky pulp. Suck it off the seeds as it is, or soak it in water and strain it for a tart drink; it is also mixed into porridge, used to curdle milk, and, as a dry powder, used in place of cream of tartar in baking."
   }
  ],
  "sources": [
   {
    "label": "SANBI PlantZAfrica — Adansonia digitata",
    "url": "https://pza.sanbi.org/adansonia-digitata"
   },
   {
    "label": "World Agroforestry (ICRAF) Agroforestree Database — Adansonia digitata",
    "url": "https://apps.worldagroforestry.org/treedb/AFTPDFS/Adansonia_digitata.PDF"
   },
   {
    "label": "Access Agriculture — Proper handling of baobab fruits at harvest",
    "url": "https://assets.accessagriculture.org/s3fs-public/Proper_handling_of_baobab_fruits_at_harvest.pdf"
   },
   {
    "label": "Government Gazette 30183 (2007) — National Forests Act exemptions for protected trees",
    "url": "https://www.gov.za/sites/default/files/gcis_document/201409/30183a.pdf"
   }
  ]
 },
 "marula": {
  "otherNames": "Morula (Setswana, the source of the English name), jelly plum, elephant plum, cat thorn. The southern subspecies is now subsp. afra (long subsp. caffra); subsp. birrea grows in the Sahel and northeast Africa.",
  "family": "Anacardiaceae (the cashew and mango family)",
  "range": "From Ethiopia and the Sudano-Sahelian belt of West Africa south through East Africa to KwaZulu-Natal, and in Madagascar. The southern form is the one gathered in quantity: the Lowveld and bushveld of Limpopo, Mpumalanga and northern KwaZulu-Natal, Zimbabwe, Mozambique, Botswana and north-central Namibia. Seasons in the Sahel and East Africa differ from the southern months given here.",
  "whenToPick": "Late summer in southern Africa: the fruit ripens from February into March, sometimes into April, dropping green and turning yellow on the ground. Eat or use it within days, before it ferments. The harvest and the trade in the fruit last only two to three months.",
  "partsUsed": "Fruit flesh and juice, raw or fermented into beer; the kernels inside the stone, eaten raw, mixed with vegetables or pressed for oil. The bark is a traditional medicine and a source of rope fibre. Only female trees fruit.",
  "faqs": [
   {
    "q": "When is marula season?",
    "a": "February and March in southern Africa, sometimes running into April. The fruit falls while still green and ripens to pale yellow on the ground — pick up the yellow ones."
   },
   {
    "q": "Is it legal to pick marula fruit in South Africa?",
    "a": "For your own use, yes. Marula is on South Africa's list of protected trees, so no one may cut or damage a tree, or trade in its products, without a licence; a standing exemption allows small, non-commercial amounts — up to half a tree's fruit in natural, rural areas. In the former Venda it was a criminal offence to cut down a living marula."
   },
   {
    "q": "Do elephants get drunk on marula?",
    "a": "Almost certainly not. Elephants eat marula fruit, bark and branches in quantity, but despite the famous scenes in the 1974 film Animals Are Beautiful People, an elephant would need to eat an enormous amount of fermented fruit to feel any effect."
   },
   {
    "q": "Can you eat marula nuts?",
    "a": "Yes. The white kernels inside the stone are highly nutritious and eaten raw or with vegetables; the oil is part of the San diet. Getting them out of the hard, plugged stone is the difficult part."
   }
  ],
  "sources": [
   {
    "label": "SANBI PlantZAfrica — Sclerocarya birrea subsp. caffra",
    "url": "https://pza.sanbi.org/sclerocarya-birrea"
   },
   {
    "label": "Wikipedia — Sclerocarya birrea",
    "url": "https://en.wikipedia.org/wiki/Sclerocarya_birrea"
   },
   {
    "label": "Government Gazette 40521 (2016) — List of protected tree species under the National Forests Act",
    "url": "https://archive.opengazettes.org.za/archive/ZA/2016/government-gazette-ZA-vol-618-no-40521-dated-2016-12-23.pdf"
   },
   {
    "label": "Government Gazette 30183 (2007) — National Forests Act exemptions for protected trees",
    "url": "https://www.gov.za/sites/default/files/gcis_document/201409/30183a.pdf"
   }
  ]
 },
 "tamarind": {
  "otherNames": "Tamarindo; in Arabic tamr hindi, 'Indian date', which gave the English name",
  "family": "Fabaceae (the pea and bean family)",
  "range": "Native to tropical Africa, with its greatest diversity in the savannas from Senegal to Sudan. It grows wild across that savanna belt from the Atlantic to the far edge of Central Africa, and down the east of the continent through Ethiopia, Eritrea, Uganda, Kenya, Tanzania, Mozambique and Zimbabwe to Madagascar. Planted for shade and fruit almost everywhere warm.",
  "whenToPick": "The dry season. The tree flowers with its new leaves and needs a long, well-marked dry season to set fruit; heavy crops usually come every other year. Pods are ripe when the shell is brown and brittle and the pulp sticky and brown, and fully ripe fruit can hang on the tree for up to six months without spoiling.",
  "partsUsed": "Pulp (raw, in drinks, porridge and sauces); young leaves, flowers and baby pods as a sour seasoning; seeds only after soaking and boiling, then roasted or ground.",
  "poisonous": "Nothing poisonous in normal use. The pulp is laxative in quantity, and the seeds are inedible until soaked and boiled to remove the seed coat.",
  "faqs": [
   {
    "q": "Where is tamarind native?",
    "a": "Tropical Africa. It has been grown in India for so long that it is sometimes taken for an Indian plant, but its origin and greatest diversity are in the African savannas from Senegal to Sudan, where it still grows wild."
   },
   {
    "q": "When is tamarind ripe?",
    "a": "When the thin shell has turned brown and brittle and cracks easily, and the pulp inside is soft, sticky and brown. Pods ripen through the dry season and can stay on the tree for months."
   },
   {
    "q": "Can you eat tamarind seeds?",
    "a": "Only after soaking and boiling them to remove the seed coat; then they can be roasted or ground into flour. Don't eat them raw."
   },
   {
    "q": "How is tamarind used in Africa?",
    "a": "Above all as a drink: tamarind-ade is made in Sudan, Egypt, West Africa and on the East African coast. In West Africa a little tamarind goes into the millet porridge called toh, and in Uganda into millet porridge too."
   }
  ],
  "sources": [
   {
    "label": "National Research Council — Lost Crops of Africa, Vol. III: Fruits — Tamarind",
    "url": "https://nap.nationalacademies.org/read/11879/chapter/11"
   },
   {
    "label": "World Agroforestry (ICRAF) Agroforestree Database — Tamarindus indica",
    "url": "https://apps.worldagroforestry.org/treedb/AFTPDFS/Tamarindus_indica.PDF"
   },
   {
    "label": "Wikipedia — Tamarind",
    "url": "https://en.wikipedia.org/wiki/Tamarind"
   }
  ]
 },
 "monkey-orange": {
  "otherNames": "Natal orange, spiny monkey orange, elephant orange; mokotra (Madagascar), mtonga (Swahili), mzimbili (Nyanja)",
  "family": "Loganiaceae (the strychnine family)",
  "range": "Tropical and subtropical Africa from Senegal to Ethiopia and south to the Eastern Cape: bushveld, riverine fringes, sand forest and coastal bush in KwaZulu-Natal, Mozambique, Eswatini, Zimbabwe, Zambia, northern Botswana, northern Namibia and Angola, East Africa from coastal Kenya inland, and parts of Madagascar.",
  "whenToPick": "The fruit takes a long time to ripen and hangs on the tree for months; big crops follow good rains. In southern Africa the tree flowers from September to February, and in Zimbabwe and Botswana monkey oranges are mostly harvested and sold from about September to December. Seasons vary widely: in Kenya, fruit comes in August around Kitui and in January–February on the coast. Ripe fruit is yellow.",
  "partsUsed": "The sweet-sour pulp around the seeds, fresh, juiced or dried. The hard shells are used as sound boxes for musical instruments. Never the seeds or unripe fruit.",
  "poisonous": "The seeds and unripe fruit are toxic. SANBI warns that the seeds may be poisonous or purgative, and ICRAF that the seeds are toxic and unripe fruit poisonous; the unripe flesh is said to cause vomiting. The slippery seeds are easy to swallow whole by accident and usually pass through, but never chew or crush them.",
  "faqs": [
   {
    "q": "Are monkey orange seeds poisonous?",
    "a": "Treat them as poisonous. SANBI and ICRAF both warn that the seeds are toxic, and unripe fruit too; eat only the pulp of ripe fruit and spit the seeds out."
   },
   {
    "q": "How do you know a monkey orange is ripe?",
    "a": "The hard shell turns from green, often speckled with white, to yellow or orange, and the pulp inside is soft, brown and sweet-sour. Green fruit can be picked and kept, or buried, to ripen."
   },
   {
    "q": "Why do people bury monkey oranges?",
    "a": "To ripen and store them. The Basarwa (San) of Botswana pick green fruit and bury it in sand for several months; the hard shell keeps out rot and fruit flies, and as long as it isn't cracked the fruit comes out juicy and golden."
   },
   {
    "q": "What does monkey orange taste like?",
    "a": "Sweet and sour: descriptions range from a mix of citrus and pineapple to a lightly fermented, tart apple."
   }
  ],
  "sources": [
   {
    "label": "SANBI PlantZAfrica — Strychnos spinosa",
    "url": "https://pza.sanbi.org/strychnos-spinosa"
   },
   {
    "label": "National Research Council — Lost Crops of Africa, Vol. III: Fruits — Monkey Oranges",
    "url": "https://nap.nationalacademies.org/read/11879/chapter/24"
   },
   {
    "label": "World Agroforestry (ICRAF) — Useful trees of Zambia: Strychnos spinosa",
    "url": "https://apps.worldagroforestry.org/usefultrees/pdflib/Strychnos_spinosa_ZAM.pdf"
   },
   {
    "label": "UK Department for International Development — Monkey orange factsheet",
    "url": "https://assets.publishing.service.gov.uk/media/57a08cb5ed915d3cfd00155a/R7187_-_Monkey_orange_factsheet.pdf"
   }
  ]
 },
 "sycamore-fig": {
  "otherNames": "Sycomore, fig-mulberry; the tree of life of ancient Egypt",
  "family": "Moraceae (figs and mulberries)",
  "range": "Native across Africa south of the Sahel and north of the Tropic of Capricorn, except the rainforests of the centre-west: the savannas from Senegal to Sudan, Ethiopia, Eritrea and Somalia, East Africa, Zambia, Zimbabwe, Mozambique, northern Namibia and South Africa's far north, with outposts in Madagascar. Grown in Egypt since before the pharaohs.",
  "whenToPick": "All year. Flowering and fruiting go on year-round, and in southern Africa peak from July to December; neighbouring trees fruit at different times, which keeps their pollinating wasps alive.",
  "partsUsed": "Ripe figs, fresh, stewed or dried, or fermented into a drink. Leaves are livestock fodder; bark and latex are traditional medicines.",
  "poisonous": "The milky latex irritates skin and eyes. Otherwise nothing poisonous.",
  "faqs": [
   {
    "q": "Can you eat sycamore figs?",
    "a": "Yes. The figs are eaten fresh, stewed or dried, and fermented into a drink, though they are considered inferior to the common fig."
   },
   {
    "q": "Why are there insects inside wild figs?",
    "a": "A fig is a closed bunch of flowers pollinated from the inside by tiny fig wasps — for the sycamore fig, Ceratosolen arabicus — which breed in some of the flowers. Wild figs often hold wasps and other small creatures, so split each one before you eat it."
   },
   {
    "q": "Why did ancient Egyptians cut sycamore figs?",
    "a": "Gashing young figs makes them ripen without pollination. The fig wasp is extinct in Egypt, and figs found in ancient tombs carry the cut marks, showing the technique is thousands of years old."
   },
   {
    "q": "When do sycamore figs fruit?",
    "a": "Throughout the year, with a peak from July to December in southern Africa. Different trees fruit at different times, so there is usually one in fruit somewhere along a river."
   }
  ],
  "sources": [
   {
    "label": "World Agroforestry (ICRAF) Agroforestree Database — Ficus sycomorus",
    "url": "https://apps.worldagroforestry.org/treedb/AFTPDFS/Ficus_sycomorus.PDF"
   },
   {
    "label": "Wikipedia — Ficus sycomorus",
    "url": "https://en.wikipedia.org/wiki/Ficus_sycomorus"
   }
  ]
 },
 "shea": {
  "otherNames": "Shea butter tree, karité (French); formerly Butyrospermum parkii. The East African form is subsp. nilotica.",
  "family": "Sapotaceae (the sapodilla and star apple family)",
  "range": "Indigenous to the Guinea and Sudan savanna zone from Senegal to Sudan, in a belt 500–700 km wide, and to western Ethiopia and Uganda. It grows inland, cut off from the Gulf of Guinea by forest; only in Ghana and Nigeria does it come within 50 km of the coast. In Uganda it grows in the north, in districts such as Lira and Otuke.",
  "whenToPick": "The trees flower in the dry season (November to January, depending on latitude) and the fruit takes four to six months to ripen. It is gathered in the wet season, usually June to August, for about two and a half months. A tree gives a really good crop only about one year in three or four.",
  "partsUsed": "Fruit pulp (fresh), flowers (sometimes as fritters), and kernels, for shea butter, a cooking fat. The caterpillars of the shea moth, which feed only on its leaves, are collected and eaten too.",
  "poisonous": "The pulp is mildly laxative. Butter from stale or mouldy kernels is dark and bitter and may carry aflatoxin, and the press-cake left over contains saponins and tannins.",
  "faqs": [
   {
    "q": "Can you eat shea fruit?",
    "a": "Yes. The thin, sweet pulp of ripe shea fruit is widely eaten in the savanna, all the more because it ripens during the hungry months of land preparation and planting. It is very rich in vitamin C, and mildly laxative."
   },
   {
    "q": "When is shea fruit season?",
    "a": "In the rains, usually June to August depending on latitude. Fallen fruit is collected from the ground, because ripening and fully ripe fruit are hard to tell apart on the tree."
   },
   {
    "q": "Who harvests shea nuts?",
    "a": "Mostly women and children, who collect the fallen fruit — a woman may gather 20–45 kg (45–100 lb) a day — and women make the butter. Rights to the fruit depend on who holds the land."
   },
   {
    "q": "Is the shea tree protected?",
    "a": "By custom, and in places by law. Savanna farmers have protected shea trees for centuries by leaving them standing when they clear fields, and Uganda's National Environmental Management Authority has banned cutting them. Shorter fallows threaten natural regeneration."
   }
  ],
  "sources": [
   {
    "label": "PROTA (Plant Resources of Tropical Africa) — Vitellaria paradoxa",
    "url": "https://plantuse.plantnet.org/en/Vitellaria_paradoxa_(PROTA)"
   },
   {
    "label": "Wikipedia — Vitellaria",
    "url": "https://en.wikipedia.org/wiki/Vitellaria"
   }
  ]
 },
 "african-star-apple": {
  "otherNames": "White star apple; agbalumo (Yoruba), udara or udala (Igbo), udari (Efik), agwaluma or ciwoh (Hausa); long known as Chrysophyllum albidum",
  "family": "Sapotaceae (the sapodilla and star apple family)",
  "range": "The forests of tropical Africa, above all southern Nigeria, and also Ghana, Côte d'Ivoire and Cameroon, with reports east to Uganda. Most fruit comes from trees kept on farms and around villages.",
  "whenToPick": "The dry season: in Nigeria the fruit is in season from December to April, sometimes into May. Ripe fruit has turned orange, yellowish-peach or burnt orange.",
  "partsUsed": "The fruit flesh and the chewy skin. Not the seeds.",
  "faqs": [
   {
    "q": "What is agbalumo?",
    "a": "The Yoruba name for the African star apple, Gambeya albida (Chrysophyllum albidum). The Igbo call it udara, and in Hausa it is agwaluma or ciwoh. It is a favourite dry-season snack fruit in Nigeria."
   },
   {
    "q": "When is agbalumo season?",
    "a": "December to April, sometimes running into May."
   },
   {
    "q": "Can you eat the skin of the African star apple?",
    "a": "Yes. The skin is chewable and edible, and many people chew it like gum after eating the sweet inner flesh. Spit out the seeds."
   },
   {
    "q": "Why is it called a star apple?",
    "a": "Cut across, the fruit shows its five seeds arranged like a star around the centre."
   }
  ],
  "sources": [
   {
    "label": "BusinessDay (Nigeria) — Africa star apple: agbalumo, udara or ciwoh",
    "url": "https://businessday.ng/life/article/africa-star-apple-agbalumo-udara-or-ciwoh/"
   },
   {
    "label": "Wikipedia — Gambeya albida",
    "url": "https://en.wikipedia.org/wiki/Gambeya_albida"
   }
  ]
 },
 "desert-date": {
  "otherNames": "Egyptian balsam, soapberry tree, thorn tree, Egyptian myrobalan; lalob (Sudan)",
  "family": "Zygophyllaceae (sometimes given its own family, Balanitaceae)",
  "range": "Native to 29 African countries: along the Sahara's southern edge from the Atlantic to the Red Sea, the Nile valley (cultivated in Egypt for over 4,000 years), the Horn, and East Africa south into parts of southern Africa; also Arabia. Not in the rainforest, South Africa, Namibia or Madagascar.",
  "whenToPick": "Fruit ripens at the height of the dry season. In Nigeria ripe fruit comes in December and January, and occasionally later, from March to July. Dried fruit keeps like dates.",
  "partsUsed": "Pulp (fresh, dried, soaked for drinks or mixed into porridge), young leaves and tender shoots (boiled), flowers, and the kernel — as cooking oil, or as food only after long processing.",
  "poisonous": "Kernel, bark, roots and fruit contain saponins: laxative, and strong enough to kill water snails and stun fish. The bitter kernel must be cooked twice and then steeped for three to four days, or leached in hot water (60 °C) for two days, before it is eaten.",
  "faqs": [
   {
    "q": "Is desert date edible?",
    "a": "Yes. The ripe, sticky, bittersweet pulp is eaten fresh or dried like dates, made into drinks and sweets, and mixed into porridge; young leaves are cooked as a vegetable. The raw kernel is not eaten."
   },
   {
    "q": "How do you make desert date kernels edible?",
    "a": "By removing the bitter saponins: cook the kernels twice, then steep them for three to four days, or leach them in hot water at about 60 °C (140 °F) for two days. Pressed, the kernels also give a cooking oil."
   },
   {
    "q": "Why is balanites used against bilharzia?",
    "a": "Extracts of its bark and fruit kill the freshwater snails that carry bilharzia (schistosomiasis) and the tiny copepods (water crustaceans) that carry guinea worm. The same saponins are why the kernel needs processing."
   },
   {
    "q": "When is desert date ripe?",
    "a": "At the height of the dry season, when the fruit has turned from green to yellow or pale brown and the skin is crisp. In Nigeria that is mostly December and January."
   }
  ],
  "sources": [
   {
    "label": "National Research Council — Lost Crops of Africa, Vol. III: Fruits — Balanites",
    "url": "https://nap.nationalacademies.org/read/11879/chapter/3"
   },
   {
    "label": "World Agroforestry (ICRAF) Agroforestree Database — Balanites aegyptiaca",
    "url": "https://apps.worldagroforestry.org/treedb/AFTPDFS/Balanites_aegyptiaca.PDF"
   },
   {
    "label": "Wikipedia — Balanites aegyptiaca",
    "url": "https://en.wikipedia.org/wiki/Balanites_aegyptiaca"
   }
  ]
 },
 "eru": {
  "otherNames": "Okok, fumbwa or m'fumbua (Cameroon, DR Congo), okazi or ukazi (Igbo), afang (Efik, Ibibio), koko (French); African jointfir, wild spinach. The very similar Gnetum buchholzianum is sold and eaten as eru too.",
  "family": "Gnetaceae (a small family of gymnosperms, related to the conifers)",
  "range": "The humid forest of west-central Africa: Nigeria, Cameroon, Gabon, the Central African Republic, Republic of the Congo, DR Congo and Angola, in primary and secondary forest from sea level to 1,200 m. Most wild eru in trade comes from Cameroon, Gabon and the Central African Republic and is shipped to Nigeria.",
  "whenToPick": "All year: the vine keeps growing through the dry season and puts out new shoots where stems have been cut. Much collecting happens in the dry season, when the forest is easier to get into.",
  "partsUsed": "Leaves, finely shredded and cooked (occasionally eaten raw); the seeds, cooked, in Cameroon and DR Congo; the root tuber as a famine food.",
  "faqs": [
   {
    "q": "What is eru?",
    "a": "The leaves of Gnetum africanum and its close relative Gnetum buchholzianum, forest vines of west-central Africa, eaten as a vegetable. Eru soup is a Cameroonian classic, and in Nigeria the same leaves make okazi and afang soup."
   },
   {
    "q": "How do you prepare eru leaves?",
    "a": "Shred them into very thin strips and cook them with meat or fish, often in a groundnut stew, usually mixed with waterleaf to soften the tough leaves. Shredded leaves can be dried for later."
   },
   {
    "q": "Is eru over-harvested?",
    "a": "Yes, in many places. The usual way of collecting for the export trade — pulling stems down from the trees, and sometimes felling trees to reach them — destroys wild stands. Taking only side shoots or parts of stems lets the vine regrow, and three to four harvests a year seem possible."
   },
   {
    "q": "Can eru be grown?",
    "a": "Yes. It grows more easily from cuttings than from seed and needs shade and something to climb, such as rubber or oil-palm plantations. The Ibibio, Efik and Annang of Nigeria now grow it for food and sale, and nurseries in Cameroon are domesticating it."
   }
  ],
  "sources": [
   {
    "label": "PROTA (Plant Resources of Tropical Africa) — Gnetum africanum",
    "url": "https://plantuse.plantnet.org/en/Gnetum_africanum_(PROTA)"
   },
   {
    "label": "Wikipedia — Gnetum africanum",
    "url": "https://en.wikipedia.org/wiki/Gnetum_africanum"
   }
  ]
 },
 "amaranth-greens": {
  "otherNames": "Morogo or moroho (South Africa — a name shared with other wild greens), pigweed, African spinach, hanekam (Afrikaans), mchicha (Swahili), brède (French)",
  "family": "Amaranthaceae",
  "range": "Throughout Africa's tropical and subtropical farmland, wherever the ground is disturbed and fertile: wild, weedy and half-cultivated across West, Central, East and southern Africa and Madagascar, and probably in all of Africa's lowland areas. Several species are gathered — Amaranthus hybridus, A. dubius, A. spinosus, A. cruentus and others — and all are eaten the same way.",
  "whenToPick": "With the rains. Leaves are best young, before the plant flowers; a first cutting can come three to four weeks after the plants appear, and cutting 10–15 cm (4–6 in) above the ground leaves buds to regrow for more pickings every two or three weeks.",
  "partsUsed": "Young leaves and tender shoot tips, cooked. The seeds of grain amaranths are eaten too, but wild weedy plants are gathered for their leaves.",
  "poisonous": "Not poisonous, but the stems and leaves accumulate nitrate, especially on heavily fertilised ground, and contain oxalate at levels like other leafy greens. Cook in plenty of water and discard the water, as most African cooks do.",
  "moreLookalikes": "Datura is the one to know: it is deadly and its seedlings come up among the amaranth in maize fields. See the thorn apple hazard entry.",
  "faqs": [
   {
    "q": "What is morogo?",
    "a": "Morogo (or moroho) is the South African name for a group of dark leafy wild greens, amaranth (pigweed) chief among them, cooked like spinach and eaten with pap. It is a traditional dish and an important part of the diet in rural communities."
   },
   {
    "q": "Is wild amaranth safe to eat?",
    "a": "Yes, cooked. Boil it in plenty of water and pour the water off, since the plant can hold nitrate and oxalate, and gather it from clean ground away from roads, rubbish tips and sprayed fields."
   },
   {
    "q": "How do I tell amaranth from Datura seedlings?",
    "a": "Amaranth leaves are smooth-edged on long stalks, and the plant soon carries bristly spikes of tiny flowers. Datura leaves are larger, with coarse, irregular teeth and a rank smell when crushed, and the plant carries big trumpet flowers and spiny seed pods. Datura can kill; if in doubt, leave it out."
   },
   {
    "q": "When do you pick amaranth greens?",
    "a": "Young, before the plant flowers. Cut the tops 10–15 cm above the ground and the plant regrows for another picking a few weeks later."
   }
  ],
  "sources": [
   {
    "label": "PROTA (Plant Resources of Tropical Africa) — Amaranthus dubius",
    "url": "https://plantuse.plantnet.org/en/Amaranthus_dubius_(PROTA)"
   },
   {
    "label": "Wikipedia — Morogo",
    "url": "https://en.wikipedia.org/wiki/Morogo"
   },
   {
    "label": "Wikipedia — Datura",
    "url": "https://en.wikipedia.org/wiki/Datura"
   }
  ]
 },
 "spider-plant": {
  "otherNames": "Spiderplant, cat's whiskers, spider flower, bastard mustard; caya blanc, brède caya (French), mgagani (Swahili); also Gynandropsis gynandra",
  "family": "Cleomaceae (the spider-flowers, close to the cabbage family)",
  "range": "Probably in every country of tropical Africa, mostly near homes and fields, from sea level to 2,400 m, and in southern Africa south to Namibia and Botswana; less common in very humid climates. It is most valued as a vegetable in East and southern Africa, where it is sold in rural and city markets through the rains.",
  "whenToPick": "Traditionally picked at the start of the rainy season, when other vegetables are scarce. Leaves are best in the first weeks: they get more bitter as the plant ages, and yields fall by about nine-tenths by the tenth week.",
  "partsUsed": "Tender leaves, young shoots and sometimes flowers, cooked. The seeds give an edible oil when pressed, but are not eaten raw.",
  "poisonous": "The seeds contain glucosinolates and a sharp, mustard-like oil; thrown into water they kill fish. The glucosinolates also irritate skin.",
  "faqs": [
   {
    "q": "How do you cook spider plant?",
    "a": "Boil the leaves — many cooks pour off the first water to cut the bitterness — then cook them with milk, peanut paste or other greens such as amaranth and cowpea leaves. In Botswana and Namibia fresh leaves are boiled for about two hours with salt, pressed into small balls and sun-dried to keep until the next rains."
   },
   {
    "q": "Why is spider plant given to new mothers?",
    "a": "By tradition: in several communities boiled spiderplant leaves are given to women before and after childbirth, and to anyone who has lost blood, and a leaf infusion is used for anaemia. The leaves are rich in calcium and iron."
   },
   {
    "q": "When is spider plant in season?",
    "a": "In the rains. It is picked from the beginning of the rainy season and sold in markets while the rains last; dried leaves carry over into the dry season."
   },
   {
    "q": "How do I recognise spider plant?",
    "a": "By the hand-shaped leaves of usually five leaflets on a sticky, smelly stem, and by its flowers: four white or pinkish petals, with the purple stamens and the ovary held far out on a long stalk — the cat's whiskers."
   }
  ],
  "sources": [
   {
    "label": "PROTA (Plant Resources of Tropical Africa) — Cleome gynandra",
    "url": "https://plantuse.plantnet.org/en/Cleome_gynandra_(PROTA)"
   },
   {
    "label": "Wikipedia — Cleome gynandra",
    "url": "https://en.wikipedia.org/wiki/Cleome_gynandra"
   }
  ]
 },
 "num-num": {
  "otherNames": "Natal plum, big num-num, amathungulu (isiZulu)",
  "family": "Apocynaceae (the dogbane and oleander family — full of poisonous plants, which is why the thorns matter)",
  "range": "South Africa's east coast and southern Mozambique: coastal bush, coastal forest and sand dunes from Humansdorp in the Eastern Cape north through KwaZulu-Natal to Mozambique. Widely planted elsewhere as a salt-tolerant hedge.",
  "whenToPick": "Flowers from spring to midsummer, and the main crop ripens in summer, often with flowers and fruit on the bush at the same time; near the coast some fruit can be found through much of the year. Pick each fruit when fully red.",
  "partsUsed": "The ripe fruit, raw or as jam and jelly. Not the leaves, stems or sap.",
  "poisonous": "SANBI describes the white milky latex as non-toxic, though the University of California rates the plant as mildly toxic. Eat only the ripe fruit.",
  "moreLookalikes": "Bushman's poison (Acokanthera oppositifolia) is another spineless, poisonous relative. The forked spines are the num-num's signature.",
  "faqs": [
   {
    "q": "Is num-num fruit edible?",
    "a": "Yes. The large, oval red fruit of Carissa macrocarpa is edible raw and makes good jam and jelly; it is rich in vitamin C, magnesium and phosphorus. Eat only the ripe fruit."
   },
   {
    "q": "What looks like a num-num but is poisonous?",
    "a": "The dune poison-bush, Acokanthera oblongifolia. It grows in the same coastal bush from the Eastern Cape to KwaZulu-Natal, belongs to the same family, has scented white flowers and red fruit that ripens purple-black, and every part, fruit included, contains cardiac glycosides that slow the heart. It has no spines; a num-num has forked, Y-shaped thorns."
   },
   {
    "q": "When are num-nums ripe?",
    "a": "Mainly in summer, but the bush flowers and fruits over a long season and near the coast may carry some fruit through much of the year. Ripe fruit is deep glossy red and slightly soft."
   },
   {
    "q": "Is the white sap of num-num poisonous?",
    "a": "SANBI describes it as non-toxic. But milky sap is shared with poisonous relatives such as Acokanthera, so it proves nothing either way; the forked thorns are the test."
   }
  ],
  "sources": [
   {
    "label": "SANBI PlantZAfrica — Carissa macrocarpa",
    "url": "https://pza.sanbi.org/carissa-macrocarpa"
   },
   {
    "label": "SANBI PlantZAfrica — Acokanthera oblongifolia",
    "url": "https://pza.sanbi.org/acokanthera-oblongifolia"
   },
   {
    "label": "Wikipedia — Carissa macrocarpa",
    "url": "https://en.wikipedia.org/wiki/Carissa_macrocarpa"
   }
  ]
 },
 "sour-fig": {
  "otherNames": "Suurvy (Afrikaans), ice plant, vygie; the old English name 'Hottentot fig' uses a term now regarded as offensive",
  "family": "Aizoaceae (the vygie or fig-marigold family)",
  "range": "Native to South Africa's winter-rainfall west and south: coastal and inland slopes from Namaqualand in the Northern Cape through the Western Cape to the Eastern Cape. It has become a serious invader of coastal California, Australia and the Mediterranean, but in the Cape it belongs and is not threatened.",
  "whenToPick": "Flowers mainly in late winter and spring (August to October); the fruit turns yellow and sweet-smelling as it matures in late spring and summer. The sour fig itself is best once it has dried and wrinkled; the sweeter species are eaten fresh in summer.",
  "partsUsed": "The ripe fruit, fresh or dried, and jam made from it. The leaves are edible too, and their juice is a traditional remedy.",
  "faqs": [
   {
    "q": "Can you eat sour figs?",
    "a": "Yes. The ripe yellow fruit is eaten fresh or dried, and makes a very tart jam. Its sticky pulp tastes sour, salty and astringent — less sweet than the related Carpobrotus acinaciformis and C. deliciosus."
   },
   {
    "q": "When are sour figs ripe?",
    "a": "In late spring and summer, after the August–October flowering, when the fruit turns yellowish and smells sweet. They are at their best once dry and wrinkled."
   },
   {
    "q": "What was sour fig used for traditionally?",
    "a": "The Khoikhoi and other southern African peoples used the astringent leaf juice for diarrhoea, dysentery and stomach cramps, crushed leaves for sore throats, and the juice as a first remedy for bluebottle stings, burns and skin complaints."
   },
   {
    "q": "Is sour fig invasive?",
    "a": "Not in South Africa, where it is native. Outside its home — California, Australia, the Mediterranean and southern England — it smothers dunes and coastal cliffs and is a major invader."
   }
  ],
  "sources": [
   {
    "label": "SANBI PlantZAfrica — Carpobrotus edulis",
    "url": "https://pza.sanbi.org/carpobrotus-edulis"
   },
   {
    "label": "Babylonstoren — The sweet and the sour",
    "url": "https://blog.babylonstoren.com/the-sweet-and-the-sour/"
   },
   {
    "label": "Wikipedia — Carpobrotus edulis",
    "url": "https://en.wikipedia.org/wiki/Carpobrotus_edulis"
   }
  ]
 },
 "waterblommetjie": {
  "otherNames": "Cape pondweed, water hawthorn, vleikos",
  "family": "Aponogetonaceae (the cape-pondweeds)",
  "range": "Native to South Africa's winter-rainfall region, above all the Western Cape, where CapeNature knows it from at least 100 places, and into the winter-rainfall parts of the Northern and Eastern Cape. Naturalised in ponds in Chile, Argentina, Australia, New Zealand, the USA, the UK and parts of Europe.",
  "whenToPick": "Winter and spring, with the rain: flowering runs from about June to mid-October. In summer the pools dry out and the plant rests underground as a tuber.",
  "partsUsed": "Only the flowers and flower buds. Not the leaves or tubers.",
  "faqs": [
   {
    "q": "What is a waterblommetjie?",
    "a": "The edible flower spike of Aponogeton distachyos, a floating water plant native to the Cape's winter-rainfall vleis. The Afrikaans name means 'little water flower', and it is cooked as a vegetable, most famously in waterblommetjiebredie."
   },
   {
    "q": "When are waterblommetjies in season?",
    "a": "From about June to mid-October, while the plants flower in the winter rain."
   },
   {
    "q": "What part of the waterblommetjie do you eat?",
    "a": "Only the flowers and buds. They are cooked with onions, mutton or lamb and potatoes, often with a few leaves of the local sorrel, to make waterblommetjiebredie."
   },
   {
    "q": "Can I pick waterblommetjies in the wild?",
    "a": "Only with the landowner's permission and outside reserves. The plant is widespread and not threatened, but CapeNature notes that the impact of wild harvesting is unknown, and most waterblommetjies sold come from farm dams."
   }
  ],
  "sources": [
   {
    "label": "CapeNature — Aponogeton distachyos, the waterblommetjie",
    "url": "https://www.capenature.co.za/news/2023/aponogeton-distachyos-the-waterblommetjie"
   },
   {
    "label": "SANBI PlantZAfrica — Aponogeton distachyos",
    "url": "https://pza.sanbi.org/aponogeton-distachyos"
   },
   {
    "label": "Wikipedia — Aponogeton distachyos",
    "url": "https://en.wikipedia.org/wiki/Aponogeton_distachyos"
   }
  ]
 },
 "kei-apple": {
  "otherNames": "Kei-appel (Afrikaans); Dovyalis afra, until 2024 Dovyalis caffra — botanists retired the epithet 'caffra', from a slur, at the 2024 International Botanical Congress",
  "family": "Salicaceae (the willow family, in its modern broad sense)",
  "range": "Southern and eastern Africa: from the Kei River in the Eastern Cape, which gives it its name, north through KwaZulu-Natal, Eswatini, Mpumalanga and Limpopo to Zimbabwe, and up the eastern side of the continent to Tanzania. In Kenya it is grown mostly as a living fence.",
  "whenToPick": "Midsummer: the trees flower from about November and ripe fruit is around in December and January, often heavy enough to weigh the branches down. Ripe fruit is evenly apricot-orange and slightly soft.",
  "partsUsed": "The fruit — fresh with sugar, in jam and jelly, in desserts or pickled.",
  "faqs": [
   {
    "q": "Is Kei apple fruit edible?",
    "a": "Yes. The fruit is juicy and very acidic, high in malic acid; it is eaten fresh, usually with sugar, and makes excellent jam and jelly. It is acidic enough to pickle without vinegar."
   },
   {
    "q": "Why doesn't my Kei apple hedge fruit?",
    "a": "Because Kei apples come as male and female plants, and only females fruit. A female crops best with a male nearby, though some females set fruit without pollination."
   },
   {
    "q": "When are Kei apples ripe?",
    "a": "In midsummer, mostly December and January in South Africa."
   },
   {
    "q": "Where does the name Kei apple come from?",
    "a": "From the Kei River in South Africa's Eastern Cape, the southern end of its natural range."
   }
  ],
  "sources": [
   {
    "label": "Wikipedia — Kei apple",
    "url": "https://en.wikipedia.org/wiki/Kei_apple"
   },
   {
    "label": "SANBI PlantZAfrica — Dovyalis caffra",
    "url": "https://pza.sanbi.org/dovyalis-caffra"
   },
   {
    "label": "Random Harvest Indigenous Nursery — Dovyalis caffra",
    "url": "https://www.randomharvest.co.za/South-African-Indigenous-Plants/Show-Plant/PlantId/142/Plant/Dovyalis-caffra"
   }
  ]
 },
 "tulbaghia": {
  "otherNames": "Wild garlic, society garlic, pink agapanthus, sweet garlic; isihaqa and incinsini (isiZulu)",
  "family": "Amaryllidaceae (the onion and garlic family)",
  "range": "Indigenous to the Eastern Cape, KwaZulu-Natal and Limpopo, north to Zimbabwe; planted in gardens and along pavements throughout South Africa and far beyond, and naturalised as far away as Tanzania and Mexico.",
  "whenToPick": "Leaves can be picked through the growing season from spring to autumn; the flowers come from midsummer into autumn, January to April in South Africa.",
  "partsUsed": "Leaves and flowers, raw or cooked. The bulb is used in traditional medicine — boiled for coughs and colds, and as a Zulu medicine — rather than as food.",
  "poisonous": "Leaves and flowers have tested non-toxic and are eaten. Deaths and severe gut symptoms have been linked to medicines made from the plant, probably through heavy use or large doses; its steroidal saponins and sulphur compounds are suspected.",
  "faqs": [
   {
    "q": "Is wild garlic (Tulbaghia) edible?",
    "a": "Yes, the leaves and flowers. They are used like chives and garlic, and Zulu people cook them as a leafy vegetable and a hot, peppery seasoning for meat and potatoes. Tests found the leaves and flowers non-toxic."
   },
   {
    "q": "How do I tell Tulbaghia from agapanthus?",
    "a": "Crush a leaf: Tulbaghia smells strongly of garlic, agapanthus doesn't. Agapanthus leaves are also broader and glossier, and its flower heads are large balls of blue or white trumpets, where Tulbaghia carries a loose head of small lilac tubes."
   },
   {
    "q": "When does Tulbaghia violacea flower?",
    "a": "From midsummer into autumn — January to April in South Africa. The flowers smell of garlic when picked."
   }
  ],
  "sources": [
   {
    "label": "SANBI PlantZAfrica — Tulbaghia violacea",
    "url": "https://pza.sanbi.org/tulbaghia-violacea"
   },
   {
    "label": "Wikipedia — Tulbaghia violacea",
    "url": "https://en.wikipedia.org/wiki/Tulbaghia_violacea"
   }
  ]
 },
 "termite-mushroom": {
  "otherNames": "Omajowa (plural) and ejova (Otjiherero, Namibia), Termitenpilz (Namibian German), chi-ngulu-ngulu (T. titanicus, Zambia); about 50 species of Termitomyces",
  "family": "Lyophyllaceae",
  "range": "Wherever fungus-farming termites build their nests, across the savannas and forests of West, Central, East and southern Africa. Termitomyces schimperi alone runs from Côte d'Ivoire to DR Congo, Malawi, Mozambique and northern Namibia, where it fruits on the tall mounds of central and northern Namibia in areas with more than 350 mm of rain a year. T. titanicus grows in West Africa, Zambia and Katanga.",
  "whenToPick": "Only in the rains, right after soaking rain. In Namibia omajowa can appear after the first spring rains of 12 mm or more, but the main crop comes in January to March, the height of the rainy season; elsewhere the first heavy rains of each wet season bring the flush.",
  "partsUsed": "Cap and above-ground stem, cooked. In Namibia's Zambezi Region the long root is dried and used separately in traditional remedies.",
  "poisonous": "Termite mushrooms themselves are edible and highly regarded. The danger is entirely in the identification.",
  "moreLookalikes": "Death cap (Amanita phalloides) has arrived in South Africa, probably with imported plant material, and grows in cool, moist plantations rather than on termite mounds; South Africa has recorded deaths among people who picked and ate wild mushrooms. See the hazard entries for death cap and the green-spored parasol.",
  "faqs": [
   {
    "q": "How do you identify a termite mushroom?",
    "a": "By where and how it grows: it comes up out of a termite mound or nest, and its stem continues underground as a long, tough, tapering root leading down to the termites' fungus garden. Most have a pointed nipple at the centre of the cap. No root into a nest, no termite mushroom."
   },
   {
    "q": "When do omajowa appear in Namibia?",
    "a": "After soaking rains: a few after spring rains of 12 mm or more, and the main crop from January to March. They come up in groups of five to ten around the base of the mound, and can reappear on the same mound for many years if the fungus is left in place."
   },
   {
    "q": "What is the biggest edible mushroom in the world?",
    "a": "Termitomyces titanicus, a termite mushroom of West Africa, Zambia and Katanga, with a cap that can reach 1 m (3 ft) across on a stem up to 57 cm long. Common in Zambia, it was only described scientifically in 1980."
   },
   {
    "q": "What poisonous mushrooms look like termite mushrooms?",
    "a": "Amanitas, which rise from a bulb or cup at the base and often have a ring, and parasols such as the green-spored parasol, which has a ring and a green spore print. Neither has a long root running down into a termite nest."
   }
  ],
  "sources": [
   {
    "label": "Wikipedia — Termitomyces",
    "url": "https://en.wikipedia.org/wiki/Termitomyces"
   },
   {
    "label": "Wikipedia — Termitomyces schimperi",
    "url": "https://en.wikipedia.org/wiki/Termitomyces_schimperi"
   },
   {
    "label": "Travel News Namibia — Built of moon, mist and rain: mushrooms of the Zambezi",
    "url": "https://travelnam.com/built-moon-mist-rain-mushrooms-zambezi/"
   },
   {
    "label": "University of Namibia, International Science and Technology Journal of Namibia — ethnomycology of Termitomyces in the Zambezi Region",
    "url": "https://journals.unam.edu.na/index.php/ISTJN/article/download/1858/1379"
   }
  ]
 },
 "kalahari-truffle": {
  "otherNames": "ǁhabas or nabbas; formerly Terfezia pfeilii, and long misidentified as the Middle Eastern desert truffles Terfezia boudieri and T. claveryi",
  "family": "Pezizaceae (cup fungi and desert truffles)",
  "range": "The Kalahari — most of Botswana, the east of Namibia and the Northern Cape of South Africa — and other arid sandy country in southern Africa, including Angola, in soils of 94–97% sand.",
  "whenToPick": "In years with good summer rain, from April through to July. The truffles swell after rain and crack the sand above them; dry years give few or none.",
  "partsUsed": "The whole truffle, peeled and cooked.",
  "faqs": [
   {
    "q": "When is Kalahari truffle season?",
    "a": "From about April to July, after good summer rains. In a dry year there may be none."
   },
   {
    "q": "How do you find Kalahari truffles?",
    "a": "By the cracks. The truffle grows close to the surface, and as it swells with water after rain it lifts the sand into a small mound with tell-tale cracks; dig gently beneath them."
   },
   {
    "q": "Who eats Kalahari truffles?",
    "a": "The Khoisan peoples of the Kalahari have always gathered and valued them, and still do, now also for sale. Meerkats, hyenas, baboons and bat-eared foxes dig them up too."
   },
   {
    "q": "Is the Kalahari truffle related to European truffles?",
    "a": "Distantly. It is a desert truffle in the cup-fungus family, long lumped with the Terfezia desert truffles of North Africa and the Middle East, and given its own genus, Kalaharituber, in 2005 after it proved genetically distinct."
   }
  ],
  "sources": [
   {
    "label": "Australian National Botanic Gardens — Desert truffles (case study)",
    "url": "https://anbg.gov.au/fungi/case-studies/desert-truffles-aust.html"
   },
   {
    "label": "Trappe et al. (2009), USDA Forest Service — desert truffles of the African Kalahari",
    "url": "https://www.fs.usda.gov/pnw/pubs/journals/pnw_2009_trappe002.pdf"
   },
   {
    "label": "Wikipedia — Kalaharituber",
    "url": "https://en.wikipedia.org/wiki/Kalaharituber"
   }
  ]
 },
 "suring": {
  "otherNames": "Geelsuring (Afrikaans), Cape sorrel, Bermuda buttercup, soursob, sourgrass, goat's-foot. 'Suring', from the Dutch zuring, is the Cape name for any sour-sapped sorrel, but in Cape cooking it means this one.",
  "family": "Oxalidaceae (the wood-sorrels)",
  "range": "Native from Namibia through Namaqualand to the Western and Eastern Cape, very common on roadsides and in grassy places. It has become an invasive weed in coastal California, Mediterranean Europe, North Africa, the Middle East and Australia, spreading by its many small bulbs.",
  "whenToPick": "The Cape winter. It sprouts from its bulbs with the autumn rain, flowers from about June to October, and dies back to the bulbs in early summer; leaves and stalks are picked through the wet months.",
  "partsUsed": "Leaves and flower stalks, raw or cooked, as a souring herb. The petals give a yellow dye. Not the bulbs.",
  "poisonous": "Rich in oxalic acid, which gives the sour taste. Stock that gorge on it have died of chronic oxalate poisoning; for people, it is safe as a seasoning in small amounts, and boiling may reduce the risk.",
  "faqs": [
   {
    "q": "What is suring?",
    "a": "Suring is the Afrikaans word for sorrel. In Cape dishes it means the leaves of the yellow-flowered Oxalis pes-caprae that blooms in autumn and winter, though the word is also used for other sour-sapped plants such as docks."
   },
   {
    "q": "Is Oxalis pes-caprae edible?",
    "a": "Yes, in moderation. Its sour leaves and stalks are a traditional Cape seasoning — in waterblommetjiebredie, with dune spinach, or boiled in milk — and children chew the stalks. It is rich in oxalic acid, so treat it as a seasoning rather than a vegetable."
   },
   {
    "q": "When is suring in season?",
    "a": "In the Cape winter: it comes up with the autumn rain, flowers from about June to October, and dies back in early summer."
   },
   {
    "q": "Is suring a weed?",
    "a": "Not in South Africa, where it is native to the winter-rainfall Cape and Namibia. Abroad it is an invasive weed of coastal California, the Mediterranean, the Middle East and Australia."
   }
  ],
  "sources": [
   {
    "label": "Wikipedia — Oxalis pes-caprae",
    "url": "https://en.wikipedia.org/wiki/Oxalis_pes-caprae"
   },
   {
    "label": "Kew, Plants of the World Online — Oxalis pes-caprae",
    "url": "https://powo.science.kew.org/taxon/375259-1"
   },
   {
    "label": "Fernkloof Nature Reserve (Hermanus) — Oxalis pes-caprae var. pes-caprae",
    "url": "https://fernkloof.org.za/index.php/all-plants/plant-families/item/oxalis-pes-caprae-var-pes-caprae"
   },
   {
    "label": "Dictionary of South African English — suring",
    "url": "https://dsae.co.za/entry/suring/e07005"
   },
   {
    "label": "SANBI PlantZAfrica — Tetragonia decumbens (suring as the traditional seasoning)",
    "url": "https://pza.sanbi.org/tetragonia-decumbens"
   },
   {
    "label": "CapeNature — Flora permits (picking rules, section 63 of the Ordinance)",
    "url": "https://www.capenature.co.za/flora"
   }
  ]
 },
 "dune-spinach": {
  "otherNames": "Duinespinasie (Afrikaans), sea spinach",
  "family": "Aizoaceae (the ice-plant family), with New Zealand spinach",
  "range": "Coastal and estuarine sand dunes from southern Namibia round the Cape to the Eastern Cape. It has also become established in parts of Australia.",
  "whenToPick": "The new growth of the rainy season, which in the winter-rainfall Cape means roughly May to October, is the best to eat. It flowers from August to November.",
  "partsUsed": "The soft tips and leafy stems, cooked or raw.",
  "poisonous": "No toxicity is recorded. Its close relative New Zealand spinach (Tetragonia tetragonioides) contains oxalates, removed by blanching for a minute before cooking.",
  "faqs": [
   {
    "q": "Can you eat dune spinach?",
    "a": "Yes. Tetragonia decumbens is a local delicacy in southern Africa: the leaves and soft stems are eaten raw in salads, where they taste salty, or cooked like spinach."
   },
   {
    "q": "How do you cook dune spinach?",
    "a": "Wash it thoroughly to remove the clinging sand, then boil or steam it. Its flavour is mild, so it is traditionally cooked with a little suring (Oxalis pes-caprae) and finished with butter; the texture is slightly grainy."
   },
   {
    "q": "When is dune spinach at its best?",
    "a": "In the rainy season, when the plant puts out new growth — the winter months in the Cape."
   },
   {
    "q": "Why shouldn't you pull up dune spinach?",
    "a": "Because it holds the dunes together. It is an early coloniser of moist, moving sand, trapping seed and adding organic matter so that other plants can follow; take only tips, and it re-sprouts."
   }
  ],
  "sources": [
   {
    "label": "SANBI PlantZAfrica — Tetragonia decumbens",
    "url": "https://pza.sanbi.org/tetragonia-decumbens"
   },
   {
    "label": "Wikipedia — Tetragonia decumbens",
    "url": "https://en.wikipedia.org/wiki/Tetragonia_decumbens"
   },
   {
    "label": "Sogoni, Open Agriculture — Tetragonia decumbens, a wild leafy vegetable for bio-saline agriculture in South Africa",
    "url": "https://www.degruyterbrill.com/document/doi/10.1515/opag-2022-0368/html"
   },
   {
    "label": "Wikipedia — Tetragonia tetragonioides (oxalates and blanching)",
    "url": "https://en.wikipedia.org/wiki/Tetragonia_tetragonioides"
   },
   {
    "label": "CapeNature — Flora permits",
    "url": "https://www.capenature.co.za/flora"
   }
  ]
 },
 "cape-gooseberry": {
  "otherNames": "Golden berry (South Africa), goldenberry, Peruvian groundcherry, poha (Hawaii); uchuva and aguaymanto (South America); ntuntunu (Luganda)",
  "family": "Solanaceae (the nightshade family, with tomatoes)",
  "range": "Native to the Andes of Peru and Chile. Settlers grew it at the Cape of Good Hope before 1807, and in South Africa it is both cultivated and a common escape: iNaturalist holds some 1,900 research-grade wild records there, from the Western Cape to KwaZulu-Natal, the Lowveld and the Highveld. In East Africa it often runs wild as a harmless weed of gardens, fields, secondary scrub and abandoned plantations.",
  "whenToPick": "In South Africa the fruit ripens mainly from April to June, with some from March. In the East African highlands, seasons follow the local rains rather than these months. Ripe when the husk is dry and straw-coloured and the berry golden.",
  "partsUsed": "The ripe berry, fresh, in jam, chutney, puddings and sauces.",
  "poisonous": "Unripe fruit, flowers, leaves and stems contain solanine and solanidine alkaloids, which can poison people, cattle and horses.",
  "faqs": [
   {
    "q": "Is the Cape gooseberry native to the Cape?",
    "a": "No. It comes from the Andes of Peru and Chile, and was grown by settlers at the Cape of Good Hope before 1807. It has since run wild across much of South Africa and East Africa."
   },
   {
    "q": "When are Cape gooseberries ripe in South Africa?",
    "a": "Mainly from April to June. Pick them when the papery husk has dried to straw colour and the berry inside is fully golden-orange."
   },
   {
    "q": "Are unripe Cape gooseberries poisonous?",
    "a": "Yes. Unripe fruit, like the leaves, stems and flowers, contains solanine alkaloids. Eat only fully ripe, golden berries."
   },
   {
    "q": "How do I recognise a Cape gooseberry?",
    "a": "By the lantern: each berry hangs inside a papery, ten-ribbed husk. The plant is soft and velvety with heart-shaped leaves, and the bell-shaped yellow flowers have dark purple-brown blotches inside."
   }
  ],
  "sources": [
   {
    "label": "Wikipedia — Physalis peruviana",
    "url": "https://en.wikipedia.org/wiki/Physalis_peruviana"
   },
   {
    "label": "Morton, Fruits of Warm Climates — Cape gooseberry",
    "url": "https://growables.org/informationVeg/CapeGooseberryMorton.htm"
   },
   {
    "label": "World Agroforestry (ICRAF) — Useful trees and shrubs of Uganda: Physalis peruviana",
    "url": "https://apps.worldagroforestry.org/usefultrees/pdflib/Physalis_peruviana_UGA.pdf"
   },
   {
    "label": "iNaturalist — Physalis peruviana (research-grade observations)",
    "url": "https://www.inaturalist.org/taxa/51988"
   }
  ]
 },
 "wild-rosemary": {
  "otherNames": "Kapokbos, kapokbossie, wilderoosmaryn (Afrikaans)",
  "family": "Asteraceae (the daisy family; garden rosemary, despite the name, belongs to the mint family)",
  "range": "The Western and Eastern Cape and Namaqualand, mostly on clay and granite slopes. Coastal plants (subsp. africanus) have succulent leaves; inland plants (subsp. paniculatus) thinner ones.",
  "whenToPick": "Sprigs can be cut at any time of year. It flowers mainly in autumn and winter, and the flowering tops are the part traditionally used.",
  "partsUsed": "Leafy sprigs and flowering tops, as a herb and for tea. Not eaten as a vegetable.",
  "poisonous": "SANBI's monograph lists no known contraindications or adverse reactions. It contains sesquiterpene lactones, essential oil and tannins, and no alkaloids or cyanogenic glycosides were detected.",
  "faqs": [
   {
    "q": "Is wild rosemary the same as rosemary?",
    "a": "No. Wild rosemary, or kapokbos, is Eriocephalus africanus, a South African member of the daisy family; garden rosemary is a Mediterranean mint. They share a resinous scent, and kapokbos can be used in cooking in much the same way."
   },
   {
    "q": "How do you make wild rosemary tea?",
    "a": "Pour a cup of boiling water over one sprig. As a medicine, SANBI's monograph gives a third of a teacup (60 ml) three times a day of an infusion made with a tablespoon of dried herb to a litre of boiling water."
   },
   {
    "q": "Why is it called kapokbos?",
    "a": "Because after flowering the seed heads are wrapped in long white hairs that look like cotton wool or snow — kapok means snow in Afrikaans."
   },
   {
    "q": "Can I pick wild rosemary in the Western Cape?",
    "a": "Only with the landowner's written permission on land that is not yours, and with a permit within 90 m of the centre of a public road. It is common and not threatened, but never pick in a reserve."
   }
  ],
  "sources": [
   {
    "label": "SANBI PlantZAfrica — Eriocephalus africanus",
    "url": "https://pza.sanbi.org/eriocephalus-africanus"
   },
   {
    "label": "SANBI — Eriocephalus herba (medicinal plant monograph)",
    "url": "https://plantzafrica.com/medmonographs/eriocephafric.pdf"
   },
   {
    "label": "Wikipedia — Eriocephalus africanus",
    "url": "https://en.wikipedia.org/wiki/Eriocephalus_africanus"
   },
   {
    "label": "CapeNature — Nature Conservation Ordinance 19 of 1974 (section 63 and Schedule 4)",
    "url": "https://www.capenature.co.za/uploads/files/Nature-Conservation-Ordinance-19-of-1974_2021-05-31-075828_whkc.pdf"
   },
   {
    "label": "CapeNature — Western Cape Biodiversity Act",
    "url": "https://capenature.co.za/western-cape-biodiversity-act-2"
   }
  ]
 },
 "mussels": {
  "otherNames": "Black mussel (Choromytilus meridionalis), Mediterranean mussel (Mytilus galloprovincialis), brown mussel (Perna perna) and blue mussel (Mytilus edulis, with M. trossulus in the North Pacific); together 'rock mussels' in South African regulations",
  "family": "Mytilidae (the sea mussels)",
  "range": "South Africa: the black mussel from central Namibia to Gqeberha; the Mediterranean mussel, introduced and now the dominant low-shore mussel, from the Namibian border to Port Alfred; the brown mussel on the South and East coasts. Europe: the blue mussel from France's Atlantic coast north to Iceland, and the Mediterranean mussel in the Mediterranean and Black Sea and up the Atlantic to Britain. North America: the blue mussel on the Atlantic coast and the Pacific blue mussel in the north-west.",
  "whenToPick": "In the north, the old rule of eating wild mussels only in months with an R (September to April) keeps clear of the spring and summer, when toxic blooms are most likely — but blooms now come at other times too. In South Africa red tides occur most often in summer. Whatever the month, check the official warnings first.",
  "partsUsed": "The whole cooked animal inside the shell. Remove the beard.",
  "poisonous": "Mussels themselves are wholesome; the danger is what they filter from the water. Paralytic shellfish toxins, made by algae such as Alexandrium, cause tingling of the lips and tongue within minutes to hours, then numbness, dizziness, loss of balance, slurred speech and difficulty swallowing and breathing, and can kill. Diarrhetic toxins cause sickness and diarrhoea, and domoic acid confusion, seizures and memory loss. None is destroyed by cooking or freezing, and none changes the taste.",
  "faqs": [
   {
    "q": "Does cooking make red-tide mussels safe?",
    "a": "No. The algal toxins behind paralytic shellfish poisoning are heat-stable: cooking and freezing do not destroy them, and they don't change the taste. The only protection is not eating shellfish from an affected area."
   },
   {
    "q": "How do I know if mussels are safe to pick in South Africa?",
    "a": "Check for red-tide warnings from the Department of Forestry, Fisheries and the Environment (DFFE) before you go. When it issues one, all shellfish from that coast — from the shore, from deeper water or washed up — must not be eaten. Some blooms are colourless, so clear water proves nothing."
   },
   {
    "q": "Do I need a permit to pick mussels in South Africa?",
    "a": "Yes. The Marine Living Resources Act regulations forbid collecting any shellfish without a permit; recreational permits are sold at post offices. There is a daily bag limit for rock mussels (check current limits), they may be taken only by hand or with a blade no wider than 12 mm, no shellfish may be collected between sunset and sunrise, and marine protected areas have their own rules."
   },
   {
    "q": "What are the symptoms of paralytic shellfish poisoning?",
    "a": "Tingling or burning of the lips, tongue and fingertips, starting within minutes to a few hours of eating, then numbness, dizziness, loss of balance, slurred speech and trouble swallowing. Severe cases bring paralysis and breathing failure: get emergency help at once."
   },
   {
    "q": "Where else are mussels monitored?",
    "a": "Almost everywhere, but not always for foragers. In Britain the Food Standards Agency classifies harvesting areas, and France allows recreational gathering only in class A or B areas; Norway publishes Mattilsynet's mussel warning; Canada's DFO posts closures; California quarantines sport-harvested mussels from 1 May to 31 October; in Massachusetts the state classifies the beds and the town shellfish constable knows the current closures. Alaska tests only commercial shellfish, so its beaches are not monitored for pickers. Namibia's government monitors shellfish and issues warnings when toxins rise."
   }
  ],
  "sources": [
   {
    "label": "SAnews (DFFE) — Public warned not to harvest or eat wild shellfish from Saldanha Bay (May 2026)",
    "url": "https://www.sanews.gov.za/index.php/node/81786"
   },
   {
    "label": "SAnews (DFFE) — Public warned against consuming dead shellfish (January 2026)",
    "url": "https://www.sanews.gov.za/node/78945"
   },
   {
    "label": "Cape Argus — DFFE warns public against consuming shellfish amid ongoing red tide concerns (January 2026)",
    "url": "https://capeargus.co.za/news/2026-01-04-dffe-warns-public-against-consuming-shellfish-amid-ongoing-red-tide-concerns/"
   },
   {
    "label": "EWN — Red tide returns to SA's West Coast: what it is and why seafood warnings matter",
    "url": "https://ewn.co.za/2026/01/06/red-tide-returns-to-sa-s-west-coast-what-it-is-why-it-happens-and-why-seafood-warnings-matter"
   },
   {
    "label": "Marine Living Resources Act regulations, reg. 55 — Shellfish, red bait and other invertebrate fish",
    "url": "https://www.acts.co.za/marine-living-resources-act-1998/r1111_55__shellfish__red_bait_.php"
   },
   {
    "label": "Marine Living Resources Act regulations, reg. 56 — Size limits, gear restrictions and fishing methods",
    "url": "https://www.acts.co.za/marine-living-resources-act-1998/r1111_56__size_limits__gear_re.php"
   },
   {
    "label": "Oceanographic Research Institute — Recreational linefishing regulations (permits from the Post Office)",
    "url": "https://www.oritag.org.za/Content/UserContent/documents/Linefishing-regs-for-the-smart-phone-interactive.pdf"
   },
   {
    "label": "Wikipedia — Choromytilus meridionalis",
    "url": "https://en.wikipedia.org/wiki/Choromytilus_meridionalis"
   },
   {
    "label": "Wikipedia — Mytilus galloprovincialis",
    "url": "https://en.wikipedia.org/wiki/Mytilus_galloprovincialis"
   },
   {
    "label": "Wikipedia — Perna perna",
    "url": "https://en.wikipedia.org/wiki/Perna_perna"
   },
   {
    "label": "Wikipedia — Blue mussel",
    "url": "https://en.wikipedia.org/wiki/Blue_mussel"
   },
   {
    "label": "Food Standards Agency (GOV.UK) — Shellfish classification",
    "url": "https://www.gov.uk/government/publications/shellfish-classification/shellfish-classification"
   },
   {
    "label": "The Highland Council — Biotoxins affecting bivalve shellfish in Loch Eishort ('cooking does not remove risks')",
    "url": "https://www.highland.gov.uk/news/article/16722/biotoxins-affecting-bivalve-shellfish-in-coastal-waters-in-loch-eishort-isle-of-skye"
   },
   {
    "label": "ARS Nouvelle-Aquitaine — Pêche à pied récréative",
    "url": "https://www.nouvelle-aquitaine.ars.sante.fr/peche-pied-recreative-une-activite-ludique-et-traditionnelle-fortement-developpee-notamment-en"
   },
   {
    "label": "Norwegian Institute of Public Health (FHI) — Skjellforgiftning (shellfish poisoning)",
    "url": "https://fhi.no/sm/smittevernhandboka/sykdommer-a-a/skjellforgiftning"
   },
   {
    "label": "Fisheries and Oceans Canada — Harvest shellfish safely",
    "url": "https://www.dfo-mpo.gc.ca/shellfish-mollusques/safely-prudence-eng.htm"
   },
   {
    "label": "County of San Diego — Sport-harvested mussels quarantine",
    "url": "https://www.sandiegocounty.gov/content/sdc/deh/lwqd/mussel_quarantine.html"
   },
   {
    "label": "San Luis Obispo County — Annual quarantine of sport-harvested mussels ends October 31",
    "url": "https://www.slocounty.ca.gov/departments/health-agency/public-health/environmental-health-services/division-articles/annual-quarantine-of-sport-harvested-mussels-ends-october-31"
   },
   {
    "label": "Mass.gov — Shellfish classification areas",
    "url": "https://www.mass.gov/service-details/shellfish-classification-areas"
   },
   {
    "label": "AGU — Alaska Native tribes take lead on shellfish toxin testing where state falls short",
    "url": "https://news.agu.org/press-release/alaska-native-tribes-take-lead-on-shellfish-toxin-testing-where-state-falls-short/"
   },
   {
    "label": "The Namibian — Mussels",
    "url": "https://www.namibian.com.na/mussels/"
   }
  ]
 },
 "sea-lettuce": {
  "otherNames": "Green laver. Several closely related Ulva species are gathered under the name.",
  "family": "Ulvaceae (green seaweeds)",
  "range": "Practically worldwide: Europe and the Mediterranean, both coasts of North America, and Africa, where in South Africa it is most often recorded on the Cape coast. It grows on all but the most exposed rocky shores and into estuaries.",
  "whenToPick": "All year round. Choose young, bright green, firmly attached sheets.",
  "partsUsed": "The whole frond, raw, cooked or dried.",
  "faqs": [
   {
    "q": "Is sea lettuce edible?",
    "a": "Yes. It is eaten raw in salads and in soups in Scotland, sometimes mixed into Welsh laverbread, and served with rice in Japan and Korea. Rinse it well and take it only from clean water."
   },
   {
    "q": "Where should I not pick sea lettuce?",
    "a": "Anywhere the water may be polluted: harbours, marinas, outfalls and estuaries below towns. Sea lettuce grows most prolifically where nutrients are abundant, so a thick mat is a warning sign. Never gather it from drifts on the beach."
   },
   {
    "q": "Is rotting sea lettuce dangerous?",
    "a": "Yes. Heaps of decomposing green seaweed give off hydrogen sulphide, a toxic gas; during the 2009 blooms in Brittany it caused deaths. Keep away from thick, rotting drifts."
   },
   {
    "q": "Do I need a permit to collect seaweed?",
    "a": "In South Africa, yes: the Marine Living Resources Act regulations forbid collecting any aquatic plant without one. Washington State requires a licence and allows 4.5 kg (10 lb) wet weight a day; California sets the same daily limit and closes marine protected areas. Elsewhere, check local rules."
   }
  ],
  "sources": [
   {
    "label": "Wikipedia — Ulva lactuca",
    "url": "https://en.wikipedia.org/wiki/Ulva_lactuca"
   },
   {
    "label": "MarLIN (Marine Biological Association) — Sea lettuce",
    "url": "https://marlin.ac.uk/species/detail/1467"
   },
   {
    "label": "Scottish Wildlife Trust, Living Seas — Sea lettuce",
    "url": "https://snorkel.scottishwildlifetrust.org.uk/species/sea-lettuce"
   },
   {
    "label": "Marine Living Resources Act regulations, reg. 57 — Aquatic plants",
    "url": "https://www.acts.co.za/marine-living-resources-act-1998/r1111_57__aquatic_plants.php"
   },
   {
    "label": "Washington Department of Natural Resources — Seaweed",
    "url": "https://dnr.wa.gov/seaweed"
   },
   {
    "label": "California Department of Fish and Wildlife — Recreational harvest of kelp and other marine algae",
    "url": "https://www.wildlife.ca.gov/Conservation/Marine/Kelp/Recreational-Harvest"
   }
  ]
 },
 "sea-bamboo": {
  "otherNames": "Kelp, Cape kelp, kelp weed",
  "family": "Kelps (order Laminariales; long placed in the family Alariaceae)",
  "range": "The southern Atlantic coast of Africa, from the far south of South Africa to northern Namibia, most common on the West Coast and in Namibia. It forms kelp forests in shallow water to about 8 m (26 ft).",
  "whenToPick": "All year. Washed-up plants are most plentiful after storms; the fronds can grow up to 13 mm (½ in) a day.",
  "partsUsed": "Fronds and stalk, cooked, pickled or dried, in small amounts.",
  "poisonous": "Brown kelps can hold very high levels of iodine, enough to exceed safe intakes; France's food-safety agency (ANSES) warns against eating them with thyroid, heart or kidney disease, on iodine or lithium medication, or when pregnant or breastfeeding without medical advice.",
  "faqs": [
   {
    "q": "Can you eat Cape kelp?",
    "a": "Yes, in small amounts. Cape foragers pickle it and cook it into dishes such as kelp lasagne and falafel. Commercially, it is harvested mainly as feed for farmed abalone and for agricultural supplements."
   },
   {
    "q": "Can I collect washed-up kelp in South Africa?",
    "a": "Not without a permit. The Marine Living Resources Act regulations forbid collecting or removing any aquatic plant without one, and the coast from Port Nolloth to Port St Johns is divided into seaweed concession areas whose rules cover beach-cast kelp as well as living plants. Ask DFFE first."
   },
   {
    "q": "How big does sea bamboo grow?",
    "a": "Up to 12–15 m (40–50 ft) long, the largest kelp in South Africa. A hollow, gas-filled stalk lifts a bulb and a tangle of strap-like fronds to the surface."
   },
   {
    "q": "Is kelp high in iodine?",
    "a": "Yes. Brown kelps are among the richest sources of iodine in the diet, enough to exceed the safe upper intake; eat kelp as a seasoning, and not at all with a thyroid condition or in pregnancy without medical advice."
   }
  ],
  "sources": [
   {
    "label": "Wikipedia — Ecklonia maxima",
    "url": "https://en.wikipedia.org/wiki/Ecklonia_maxima"
   },
   {
    "label": "Two Oceans Aquarium — Sea bamboo",
    "url": "https://aquarium.co.za/animals/sea-bamboo"
   },
   {
    "label": "Save Our Seas Foundation — Underwater forests",
    "url": "https://saveourseas.com/sosf-shark-education-centre/underwater-forests/"
   },
   {
    "label": "Department of Agriculture, Forestry and Fisheries — Seaweed fishery policy, Government Gazette 2015 (FAOLEX)",
    "url": "https://faolex.fao.org/docs/pdf/saf150531.pdf"
   },
   {
    "label": "Marine Living Resources Act regulations, reg. 57 — Aquatic plants",
    "url": "https://www.acts.co.za/marine-living-resources-act-1998/r1111_57__aquatic_plants.php"
   },
   {
    "label": "ANSES — Seaweed consumption: remain vigilant to the risk of excess iodine intake",
    "url": "https://www.anses.fr/en/node/134881"
   },
   {
    "label": "People and Plants International — Kelp (Ecklonia maxima, Laminaria pallida)",
    "url": "https://peopleandplants.org/kelp"
   }
  ]
 },
 "rock-samphire": {
  "otherNames": "Sea fennel, samphire; perce-pierre, 'rock piercer' (France), paccasassi (Italy's Conero coast)",
  "family": "Apiaceae (the carrot family)",
  "range": "Atlantic coasts from Ireland and Britain to Portugal and Macaronesia, the whole Mediterranean, including North Africa from Morocco to Egypt, and the Black Sea coasts of Bulgaria, Romania and Crimea. In Ireland it is less frequent in the north and north-west.",
  "whenToPick": "Young leaves and shoots in spring and early summer. It flowers from June to September, and the leaves coarsen as it does.",
  "partsUsed": "Leaves and young stems, raw, cooked or pickled.",
  "faqs": [
   {
    "q": "What is the difference between rock samphire and marsh samphire?",
    "a": "They are unrelated plants that share a name. Rock samphire is a fleshy-leaved member of the carrot family growing on cliffs and rocks; marsh samphire (glasswort) is a leafless, jointed succulent of salt-marsh mud."
   },
   {
    "q": "Is rock samphire edible?",
    "a": "Yes. Its leaves and stems are cooked or pickled, and fresh leaves can go into salads; in Italy it is served as an antipasto, paccasassi del Conero."
   },
   {
    "q": "Why did Shakespeare call gathering samphire a 'dreadful trade'?",
    "a": "Because the gatherers hung from sea cliffs to reach it. In King Lear, Edgar describes a man hanging half-way down the cliff at Dover to gather samphire, and calls it a 'dreadful trade'."
   },
   {
    "q": "When does rock samphire flower?",
    "a": "From June to September, in flat umbels of small yellow-green flowers."
   }
  ],
  "sources": [
   {
    "label": "Wikipedia — Crithmum",
    "url": "https://en.wikipedia.org/wiki/Crithmum"
   },
   {
    "label": "Kew, Plants of the World Online — Crithmum maritimum",
    "url": "https://powo.science.kew.org/taxon/840827-1"
   },
   {
    "label": "Irish Wildflowers — Rock samphire",
    "url": "https://irishwildflowers.ie/pages/229a.html"
   },
   {
    "label": "Parc national des Calanques — Sea fennel",
    "url": "https://calanques-parcnational.fr/en/sea-fennel"
   },
   {
    "label": "legislation.gov.uk — Wildlife and Countryside Act 1981, section 13",
    "url": "https://www.legislation.gov.uk/ukpga/1981/69/section/13"
   }
  ]
 },
 "carrageen": {
  "otherNames": "Irish moss, carrageen moss, jelly moss; carraigín (Irish)",
  "family": "Gigartinaceae (red seaweeds)",
  "range": "Both sides of the North Atlantic: in Europe from Iceland, the Faroes and Norway to southern Spain, on every British and Irish coast; in North America from Labrador to New Jersey.",
  "whenToPick": "Cut at low spring tides from late spring to early autumn, when the plants are fullest; it grows on the mid to lower shore and in pools.",
  "partsUsed": "The whole frond, fresh or dried, cooked to release its jelly.",
  "faqs": [
   {
    "q": "What is carrageen moss used for?",
    "a": "Above all for carrageen moss pudding, an Irish blancmange set by the seaweed's natural jelly. It also thickens soups, jellies and aspics, and its extract, carrageenan (E407), thickens ice cream and other foods."
   },
   {
    "q": "How do you make carrageen moss pudding?",
    "a": "Soak a small handful of dried carrageen, simmer it in milk for about 20 minutes, strain, then sweeten and flavour the milk and leave it to set; some cooks fold in whisked egg."
   },
   {
    "q": "How do I tell carrageen from false Irish moss?",
    "a": "Carrageen's fronds are flat and fork repeatedly into a fan with rounded tips. False Irish moss (Mastocarpus stellatus) has channelled, often twisted fronds with thickened edges, and its reproductive bodies sit in small pimple-like bumps on the surface."
   },
   {
    "q": "Why does carrageen shine blue?",
    "a": "The branch tips, especially of female plants, show a blue-violet iridescence under water."
   }
  ],
  "sources": [
   {
    "label": "Wikipedia — Chondrus crispus",
    "url": "https://en.wikipedia.org/wiki/Chondrus_crispus"
   },
   {
    "label": "MarLIN (Marine Biological Association) — Carrageen",
    "url": "https://www.marlin.ac.uk/species/detail/1444"
   },
   {
    "label": "AlgaeBase / The Seaweed Site — Chondrus crispus fact sheet",
    "url": "https://seaweed.algaebase.org/pdf/Individual%20FS/Chondrus%20crispus.pdf"
   },
   {
    "label": "Smithsonian Magazine — A brief history of Ireland's carrageen moss pudding",
    "url": "https://www.smithsonianmag.com/travel/brief-history-of-irelands-carrageen-moss-pudding-180980697/"
   },
   {
    "label": "ANSES — Seaweed consumption and excess iodine",
    "url": "https://www.anses.fr/en/node/134881"
   }
  ]
 },
 "sea-purslane": {
  "otherNames": "Halimione portulacoides, Obione portulacoides; lus an ghaill (Irish)",
  "family": "Amaranthaceae (the goosefoot family)",
  "range": "Salt marshes of western and southern Europe — the coasts of Britain and Ireland (most frequent in the south and east of Ireland), the North Sea, the Atlantic and the Mediterranean — and North Africa from Morocco to Egypt.",
  "whenToPick": "An evergreen shrub whose leaves can be picked through the growing season, best when young and tender in spring and summer. It flowers from July to September.",
  "partsUsed": "The leaves and soft tips, raw, cooked or pickled.",
  "faqs": [
   {
    "q": "Is sea purslane edible?",
    "a": "Yes. Its thick leaves are crunchy and naturally salty, eaten raw in salads or cooked as a pot-herb, steamed or fried, and pickled."
   },
   {
    "q": "Is sea purslane the same as purslane?",
    "a": "No. Sea purslane is a salt-marsh shrub of the goosefoot family; purslane (Portulaca oleracea) is a succulent garden weed. They share only a name and a succulent leaf."
   },
   {
    "q": "Where does sea purslane grow?",
    "a": "On the drier parts of salt marshes and along the edges of tidal creeks and pools, where the highest tides flood it, and sometimes on dunes."
   }
  ],
  "sources": [
   {
    "label": "Wikipedia — Halimione portulacoides",
    "url": "https://en.wikipedia.org/wiki/Halimione_portulacoides"
   },
   {
    "label": "Kew, Plants of the World Online — Atriplex portulacoides",
    "url": "https://powo.science.kew.org/taxon/164072-1"
   },
   {
    "label": "Irish Wildflowers — Sea purslane",
    "url": "https://irishwildflowers.ie/pages/378a.html"
   },
   {
    "label": "The Foraging Course Company — Foraging guide: sea purslane",
    "url": "https://foragingcoursecompany.co.uk/post/foraging-guide-sea-purslane"
   },
   {
    "label": "legislation.gov.uk — Wildlife and Countryside Act 1981, section 13",
    "url": "https://www.legislation.gov.uk/ukpga/1981/69/section/13"
   }
  ]
 },
 "alexanders": {
  "otherNames": "Alisander, horse celery, black lovage, wild celery, wild parsley, Macedonian parsley",
  "family": "Apiaceae (the carrot family — the family of hemlock and hemlock water-dropwort)",
  "range": "Native around the Mediterranean, from Macaronesia and Iberia to Turkey and North Africa. In Britain and Ireland it is an old introduction, probably Roman, common on most coasts and inland in the south, and spreading along salted roads; in the north it keeps to sheltered coasts.",
  "whenToPick": "Stems can be cut from February and are best as the first flower buds appear in late March and April. It flowers from April to June, and the seeds turn black in July and August.",
  "partsUsed": "Young stems and leaf stalks (peeled and cooked), leaves, flowers, and roots dug in winter — every part is edible.",
  "moreLookalikes": "Hemlock water-dropwort (Oenanthe crocata) grows in damp grassland, wet woods and along streams, rivers and canals throughout Britain and Ireland and down the Atlantic coast to Portugal: white flowers in June and July, flat, divided leaves, and pale, fleshy root tubers called dead man's fingers. See the hazard entries for hemlock water-dropwort and poison hemlock.",
  "faqs": [
   {
    "q": "Is alexanders edible?",
    "a": "Yes, every part. Young stems are peeled and cooked like asparagus, young leaves go into salads and soups, and the roots were once dug in winter. It was a familiar pot-herb until celery replaced it in the 18th century."
   },
   {
    "q": "How do you tell alexanders from hemlock water-dropwort?",
    "a": "By the flowers and leaves: alexanders has yellow-green flowers and glossy leaves divided into broad, blunt-toothed leaflets; hemlock water-dropwort has white flowers, flat, finely divided leaves and grows in wet ground. Hemlock water-dropwort is deadly, so if it isn't in yellow-green flower and you aren't certain, leave it."
   },
   {
    "q": "When is alexanders in season?",
    "a": "From February to April. The stems can be cut from February and are at their best as the first flower buds appear in late March and April; the plant flowers from April to June."
   },
   {
    "q": "Why is alexanders so common by the sea in Britain?",
    "a": "It is a Mediterranean plant, probably brought by the Romans, and too tender for hard frost, so in the north it survives mainly on the milder coasts. Road salting has helped it spread inland."
   }
  ],
  "sources": [
   {
    "label": "Wikipedia — Smyrnium olusatrum",
    "url": "https://en.wikipedia.org/wiki/Smyrnium_olusatrum"
   },
   {
    "label": "First Nature — Smyrnium olusatrum, Alexanders",
    "url": "https://www.first-nature.com/flowers/smyrnium-olusatrum.php"
   },
   {
    "label": "BSBI — Smyrnium (archaeophyte in Britain and Ireland)",
    "url": "https://bsbi.org/taxa/2cd4p9h.3hx4s3/smyrnium"
   },
   {
    "label": "Woodland Trust — Foraging in February (alexanders)",
    "url": "https://woodlandtrust.org.uk/blog/2018/02/foraging-in-february/"
   },
   {
    "label": "Wild Bristol — Alexanders",
    "url": "https://wildbristol.uk/groups/wild-flowers/archaeophyte/alexanders/"
   },
   {
    "label": "Wikipedia — Oenanthe crocata (hemlock water-dropwort)",
    "url": "https://en.wikipedia.org/wiki/Oenanthe_crocata"
   },
   {
    "label": "Canal & River Trust — Hemlock water dropwort",
    "url": "https://canalrivertrust.org.uk/things-to-do/canal-and-river-wildlife/plant-species/hemlock-water-dropwort"
   }
  ]
 },
 "caper": {
  "otherNames": "Caper bush, Flinders rose",
  "family": "Capparaceae",
  "range": "Native to almost every country round the Mediterranean — Spain, Portugal, France, Italy and its islands, the Balkans, Greece, Turkey and North Africa from Morocco to Egypt — and on into western and central Asia.",
  "whenToPick": "Buds form from about April to September, most heavily in the hottest months; each flower lasts a day, so pick bushes every morning or two. Caper berries follow in summer.",
  "partsUsed": "Flower buds (capers) and fruit (caper berries), cured. Dried leaves have been used in place of rennet in cheese-making.",
  "faqs": [
   {
    "q": "Are capers flower buds?",
    "a": "Yes. Capers are the unopened flower buds of Capparis spinosa, picked by hand each morning; the smallest buds are the most prized."
   },
   {
    "q": "Can you eat capers raw?",
    "a": "Not as a rule. Fresh buds are sun-dried and cured in brine, salt, or salt and vinegar, which lets an enzyme release their mustard-oil flavour (from glucocapparin)."
   },
   {
    "q": "What are caper berries?",
    "a": "The fruit that forms if a bud is left to flower: much larger, on a long stalk, and pickled to eat like olives."
   },
   {
    "q": "Can I pick wild capers?",
    "a": "Where it is allowed and the plant is not on a protected monument. In Italy's national parks, for example, collecting wild plants is forbidden outside farmed land unless the park's rules allow it."
   }
  ],
  "sources": [
   {
    "label": "Wikipedia — Capparis spinosa",
    "url": "https://en.wikipedia.org/wiki/Capparis_spinosa"
   },
   {
    "label": "Kew, Plants of the World Online — Capparis spinosa",
    "url": "https://powo.science.kew.org/taxon/146789-1"
   },
   {
    "label": "University of Wisconsin–Madison Extension — Capers, Capparis spinosa",
    "url": "https://hort.extension.wisc.edu/articles/capers-capparis-spinosa"
   },
   {
    "label": "Università di Palermo (IRIS) — Diversity and conservation of Capparis",
    "url": "https://iris.unipa.it/retrieve/23e35b16-cb60-4b8f-b797-1e435d021d31/Diversity%20and%20conservation%20Capparis.pdf"
   },
   {
    "label": "Legge 6 dicembre 1991 n. 394, framework law on protected areas (ISPRA)",
    "url": "https://development.isprambiente.gov.it/files/carta-della-natura/Legge_06_12_1991_394.pdf"
   }
  ]
 },
 "carob": {
  "otherNames": "St John's bread, locust bean, locust tree; algarrobo (Spain), alfarroba or garrofa (Portugal), garrofer (Catalonia)",
  "family": "Fabaceae (the pea and bean family)",
  "range": "Native to the eastern and central Mediterranean and North Africa — Greece, Cyprus, Turkey, the Levant, Italy and its islands, southern France, Spain, Morocco, Algeria, Tunisia and Libya — and long naturalised in the west, from Portugal's Algarve to the Balearics. Spain grows the most.",
  "whenToPick": "The pods take about a year to ripen and are gathered in late summer and early autumn, before the winter rains, when they have turned dark brown. Trees flower in autumn.",
  "partsUsed": "The pod pulp, raw, roasted and ground into flour, or boiled into syrup. The seeds give locust bean gum but are too hard to eat.",
  "poisonous": "Nothing poisonous, but the pods contain up to 1.5% tannins, which interfere with the body's use of protein.",
  "faqs": [
   {
    "q": "Can you eat carob pods straight from the tree?",
    "a": "Yes, when they are ripe, dark brown and dry: the pulp is sweet and chewed as a snack. Spit out the seeds, which are very hard."
   },
   {
    "q": "When are carob pods ripe?",
    "a": "In late summer and early autumn, before the winter rains. The pods take a full year to mature, so flowers and green pods can be on the tree together."
   },
   {
    "q": "Why do only some carob trees have pods?",
    "a": "Because most carob trees are either male or female, and only females bear pods."
   },
   {
    "q": "Where does the word 'carat' come from?",
    "a": "From the carob seed. The carat takes its name, through the Arabic qīrāṭ, from the Greek name for the seed."
   }
  ],
  "sources": [
   {
    "label": "Wikipedia — Carob",
    "url": "https://en.wikipedia.org/wiki/Carob"
   },
   {
    "label": "Kew, Plants of the World Online — Ceratonia siliqua",
    "url": "https://powo.science.kew.org/taxon/485647-1"
   },
   {
    "label": "Morton, Fruits of Warm Climates — Carob",
    "url": "https://growables.com/information/TropicalFruit/CarobMorton.htm"
   },
   {
    "label": "Mahmiyat — Carob tree, Ceratonia siliqua",
    "url": "https://mahmiyat.ps/en/flora-and-fauna/277.html"
   },
   {
    "label": "Legge 6 dicembre 1991 n. 394, framework law on protected areas (ISPRA)",
    "url": "https://development.isprambiente.gov.it/files/carta-della-natura/Legge_06_12_1991_394.pdf"
   }
  ]
 },
 "myrtle": {
  "otherNames": "Common myrtle, true myrtle; mirto (Italy)",
  "family": "Myrtaceae (the myrtle family)",
  "range": "Native round the whole Mediterranean — Iberia, southern France, Corsica, Sardinia, Italy, the Balkans, Greece, Turkey and North Africa from Morocco to Libya — and into Macaronesia and western Asia. In Sardinia it is common near the coast below about 800 m.",
  "whenToPick": "The berries begin to colour in August and September and ripen from November into January, sometimes February.",
  "partsUsed": "Ripe berries and leaves, above all for liqueur.",
  "faqs": [
   {
    "q": "When are myrtle berries ripe?",
    "a": "From November into January, sometimes February, when they have turned fully blue-black."
   },
   {
    "q": "What is mirto?",
    "a": "A Sardinian liqueur made by steeping myrtle in alcohol: red mirto from the ripe berries, white mirto from the leaves."
   },
   {
    "q": "How do I recognise myrtle?",
    "a": "By its small leaves in opposite pairs, sweetly aromatic when crushed, its white five-petalled flowers with a brush of stamens, and its blue-black berries in winter. Laurustinus, which grows alongside, has much larger leaves."
   },
   {
    "q": "How should you pick myrtle berries?",
    "a": "By hand, berries only. Cutting whole fruiting shoots, a common shortcut that ignores the long-standing advice, puts wild plants under heavy pressure."
   }
  ],
  "sources": [
   {
    "label": "Wikipedia — Myrtus communis",
    "url": "https://en.wikipedia.org/wiki/Myrtus_communis"
   },
   {
    "label": "Kew, Plants of the World Online — Myrtus communis",
    "url": "https://powo.science.kew.org/taxon/599719-1"
   },
   {
    "label": "Medda & Mulas (2021), Sustainability — Fruit quality characters of myrtle selections",
    "url": "https://www.mdpi.com/2071-1050/13/16/8785"
   },
   {
    "label": "Wikipedia — Viburnum tinus (laurustinus)",
    "url": "https://en.wikipedia.org/wiki/Viburnum_tinus"
   },
   {
    "label": "Legge 6 dicembre 1991 n. 394, framework law on protected areas (ISPRA)",
    "url": "https://development.isprambiente.gov.it/files/carta-della-natura/Legge_06_12_1991_394.pdf"
   }
  ]
 }
};
