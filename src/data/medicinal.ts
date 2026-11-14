/**
 * The medicinal-plant record: 30 wild plants with their traditional use, the
 * part used, an evidence rating, what has been tested and the cautions —
 * plant-first, with no symptom lookup.
 *
 * Extracted verbatim from the "Traditional medicinal use" panel on each
 * captured /foraging/<slug> page and from /foraging/medicinal (the eight use
 * categories, their blurbs, and the order the plants are listed in each).
 * MEDICINAL is in an order consistent with every category list on that page.
 */

export type Evidence = "studied" | "mixed" | "traditional";
export type MedicinalUse = "digestive" | "skin" | "respiratory" | "immune" | "circulatory" | "joints" | "nutritive" | "urinary";

export type MedicinalPlant = {
  /** The species slug (/foraging/<slug>#medicinal). */
  slug: string;
  evidence: Evidence;
  /** "Traditional use" */
  use: string;
  /** "Part used, and how" */
  part: string;
  /** "Evidence": what has been tested. */
  evidenceNote: string;
  /** The first is the one quoted on /foraging/medicinal ("Caution: …"). */
  cautions: string[];
  /** The categories it is listed under, in the order the species page tags them. */
  uses: MedicinalUse[];
};

/** The evidence badge, and the line under the evidence text explaining the rating. */
export const EVIDENCE: Record<Evidence, { label: string; note: string }> = {
  studied: { label: "Studied in people", note: "Has been tested in human trials. That does not mean it works for everyone, or that a home preparation matches what was tested." },
  mixed: { label: "Some evidence, mixed", note: "Some laboratory or small-trial evidence exists, and it is mixed or preliminary. Treat claims made for it with caution." },
  traditional: { label: "Traditional use only", note: "Documented traditional use, but little or no clinical testing. Historical use is not evidence of effect or of safety." },
};

/** The use categories of /foraging/medicinal, in page order (#id anchors). */
export const MEDICINAL_USES: { id: MedicinalUse; label: string; blurb: string }[] = [
 {
  "id": "digestive",
  "label": "Digestion & appetite",
  "blurb": "Bitters, carminatives and gentle laxatives — the oldest and best-documented corner of folk medicine."
 },
 {
  "id": "skin",
  "label": "Skin & wounds",
  "blurb": "Poultices, washes and salves for scrapes, stings, burns and rashes, applied to the skin rather than swallowed."
 },
 {
  "id": "respiratory",
  "label": "Coughs & colds",
  "blurb": "Demulcent and expectorant plants used in teas and syrups for winter coughs and sore throats."
 },
 {
  "id": "immune",
  "label": "Immune support",
  "blurb": "Plants taken at the first sign of a cold, or as a winter tonic. Evidence here is thin and much overstated."
 },
 {
  "id": "circulatory",
  "label": "Heart & circulation",
  "blurb": "Long-standing cardiac and vascular traditions. This is the category where self-treatment is most dangerous."
 },
 {
  "id": "joints",
  "label": "Joints & muscles",
  "blurb": "Anti-inflammatory traditions, mostly applied externally as liniments and compresses."
 },
 {
  "id": "nutritive",
  "label": "Nourishment",
  "blurb": "Not medicine so much as food that happens to be dense in vitamins, minerals and fibre."
 },
 {
  "id": "urinary",
  "label": "Kidneys & urinary",
  "blurb": "Diuretics and soothing plants for the urinary tract."
 }
];

export const MEDICINAL: MedicinalPlant[] = [
 {
  "slug": "dandelion",
  "evidence": "mixed",
  "use": "A bitter tonic taken before meals to encourage appetite and digestion, and as a spring diuretic — the old French name pissenlit is not subtle about it.",
  "part": "Root, dug in autumn, dried and decocted; young leaves eaten raw or as a tea.",
  "evidenceNote": "A genuine diuretic effect has been measured in small studies; the liver and 'detox' claims made for it are not supported.",
  "cautions": [
   "A real diuretic — it can add to the effect of prescription diuretics and affect potassium and lithium levels.",
   "Avoid if you have gallstones or a bile-duct obstruction; the bitters increase bile flow.",
   "Common allergen for people sensitive to ragweed, daisies and chrysanthemums."
  ],
  "uses": [
   "digestive",
   "urinary",
   "nutritive"
  ]
 },
 {
  "slug": "burdock-root",
  "evidence": "traditional",
  "use": "A long-standing tonic for stubborn skin complaints in both European and Chinese tradition, and eaten as gobo in Japan.",
  "part": "First-year root, dug in autumn, eaten as a vegetable or decocted.",
  "evidenceNote": "Mostly laboratory work. The skin tradition is old and consistent but has not been confirmed in trials.",
  "cautions": [
   "Easily confused with deadly nightshade root when dug — burdock leaves are huge, heart-shaped and woolly-white underneath. Be certain before you dig.",
   "May lower blood sugar, adding to diabetes medication.",
   "Avoid in pregnancy — it has a traditional reputation for stimulating the uterus.",
   "Related to ragweed and daisies; a common allergen."
  ],
  "uses": [
   "skin",
   "digestive"
  ]
 },
 {
  "slug": "plantain-leaf",
  "evidence": "traditional",
  "use": "The classic field poultice across Europe and North America for stings, bites, nettle rash and small cuts — the first thing many people learn.",
  "part": "Fresh leaf, crushed or chewed and applied to the skin.",
  "evidenceNote": "Laboratory work supports anti-inflammatory and wound-healing activity; the specific field use has not been tested in trials.",
  "cautions": [
   "External use on small, clean injuries only. A deep, dirty or spreading wound needs proper care.",
   "Do not use on a puncture wound or anything that might be infected.",
   "Anaphylaxis after a sting is a medical emergency — call for help, do not reach for a leaf."
  ],
  "uses": [
   "skin"
  ]
 },
 {
  "slug": "elderberry",
  "evidence": "studied",
  "use": "The best-known winter cold and flu preparation in European and North American folk medicine, taken as a syrup at the first sign of a cold.",
  "part": "Ripe black berries, always cooked, made into a syrup. Never the raw berry, leaf, bark or stem.",
  "evidenceNote": "Several small human trials suggest elderberry syrup shortens cold and flu symptoms modestly; the trials are small and mostly industry-funded.",
  "cautions": [
   "Raw berries, leaves, bark and stems contain a cyanide-forming compound and cause vomiting and diarrhoea. Cook the berries and strip every bit of stem.",
   "Red elderberry is a different species and is not used this way.",
   "Because it acts on the immune system, ask a doctor first if you take immunosuppressants or have an autoimmune condition."
  ],
  "uses": [
   "immune",
   "respiratory"
  ]
 },
 {
  "slug": "elderflower",
  "evidence": "traditional",
  "use": "A traditional tea for feverish colds and blocked sinuses, usually combined with peppermint and yarrow.",
  "part": "Fresh or dried flower heads, infused as a tea or made into a cordial.",
  "evidenceNote": "Long and consistent traditional use across Europe; almost no clinical testing of the flower on its own.",
  "cautions": [
   "Strip the flowers from the green stems, which carry the same toxic compounds as the rest of the plant.",
   "Same immune caution as the berry."
  ],
  "uses": [
   "respiratory",
   "immune"
  ]
 },
 {
  "slug": "hawthorn",
  "evidence": "studied",
  "use": "The central heart plant of European herbal tradition, used over long periods as a tonic for the ageing heart and circulation.",
  "part": "Berries, and traditionally leaf and flower, as a tea or tincture.",
  "evidenceNote": "Reviewed in human trials for chronic heart failure with modest results, always as an addition to medical treatment and never as a replacement.",
  "cautions": [
   "This is the category where self-treatment does real harm. If you have any heart condition, speak to your doctor before taking hawthorn at all.",
   "Interacts with digoxin, beta-blockers, nitrates and blood-pressure medication.",
   "Heart symptoms — chest pain, breathlessness, swelling, palpitations — need a doctor, not a tea.",
   "The seeds contain cyanide-forming compounds; do not crush or eat them."
  ],
  "uses": [
   "circulatory"
  ]
 },
 {
  "slug": "nettle",
  "evidence": "mixed",
  "use": "Taken as a spring tonic for its iron, calcium and vitamin content, and long used as a tea for aching joints and as a mild diuretic.",
  "part": "Young spring tops, cooked or dried for tea. Cooking or drying destroys the sting entirely.",
  "evidenceNote": "Small trials suggest some benefit for hay fever and for joint pain used alongside anti-inflammatories; it is genuinely nutrient-dense as a vegetable.",
  "cautions": [
   "Diuretic — care alongside prescription diuretics or lithium.",
   "May lower blood pressure and blood sugar, so it can add to medication for either.",
   "Contains vitamin K, which works against warfarin.",
   "Never eat it raw, and avoid old summer growth: the gritty crystals it forms by then irritate the kidneys."
  ],
  "uses": [
   "nutritive",
   "joints",
   "urinary"
  ]
 },
 {
  "slug": "juniper-berries",
  "evidence": "traditional",
  "use": "A digestive and urinary remedy across northern Europe, and the flavour of gin.",
  "part": "Ripe blue cones, a few at a time, as a seasoning or a short-term tea.",
  "evidenceNote": "Traditional use; the diuretic action is plausible but the clinical picture is thin.",
  "cautions": [
   "Avoid entirely in pregnancy — a documented uterine stimulant with a long history as an abortifacient.",
   "Avoid with kidney disease; prolonged use has been linked to kidney irritation.",
   "Do not take it for more than a few weeks at a time.",
   "Only Juniperus communis; some junipers are not safe."
  ],
  "uses": [
   "digestive",
   "urinary"
  ]
 },
 {
  "slug": "rose-hips",
  "evidence": "studied",
  "use": "A winter source of vitamin C — Britain harvested them nationally during the Second World War — and taken in Scandinavia as a powder for stiff joints.",
  "part": "Ripe hips after the first frost, seeds and their irritant hairs removed, then dried for tea or cooked into syrup.",
  "evidenceNote": "Trials of a standardised rosehip powder show a small improvement in osteoarthritis pain; the vitamin C content is real but drops sharply with heat and storage.",
  "cautions": [
   "The hairs around the seeds are a mechanical irritant — the old itching-powder — so strain thoroughly.",
   "High vitamin C intake can matter if you have kidney stones or haemochromatosis.",
   "May affect how the body handles some medicines at large doses; keep it to tea-scale amounts."
  ],
  "uses": [
   "nutritive",
   "joints",
   "immune"
  ]
 },
 {
  "slug": "wintergreen",
  "evidence": "traditional",
  "use": "Chewed and brewed by many North American First Nations for aching muscles and joints and for sore throats; the source of the flavour and of methyl salicylate, the compound aspirin was developed from.",
  "part": "Leaves, infused as a tea. The essential oil is a different and far more dangerous thing.",
  "evidenceNote": "The active compound is well understood; the leaf tea itself has not been meaningfully studied.",
  "cautions": [
   "Wintergreen essential oil is genuinely dangerous — a teaspoon can kill a child. Never take the oil internally and keep it away from children.",
   "The leaf is a salicylate, like aspirin: avoid if you are allergic to aspirin, on blood thinners, or before surgery.",
   "Never give it to a child or teenager with a viral illness, for the same reason aspirin is not given — the risk of Reye's syndrome.",
   "Avoid in pregnancy."
  ],
  "uses": [
   "joints",
   "respiratory"
  ]
 },
 {
  "slug": "chaga",
  "evidence": "traditional",
  "use": "A tea across Siberia, Scandinavia and the northern First Nations, drunk as a daily winter tonic.",
  "part": "The hard black conk from a living birch, chipped and simmered for hours as a decoction.",
  "evidenceNote": "Widely sold on claims that outrun the evidence: laboratory and animal work only, with no good human trials for any of the effects usually advertised.",
  "cautions": [
   "High in oxalates — linked to kidney damage in case reports of heavy long-term use, and a real risk if you have any kidney disease.",
   "May lower blood sugar and slow clotting: care with diabetes medication, warfarin and before surgery.",
   "Because it acts on the immune system, ask a doctor first with autoimmune conditions or immunosuppressants.",
   "Take only from living birch, and sparingly — it grows back over decades, if at all."
  ],
  "uses": [
   "immune"
  ]
 },
 {
  "slug": "chicken-of-the-woods",
  "evidence": "traditional",
  "use": "Eaten as food rather than medicine, though it appears in folk practice as a strengthening food during recovery.",
  "part": "Young tender edges, thoroughly cooked.",
  "evidenceNote": "No meaningful clinical evidence. Its interest is culinary.",
  "cautions": [
   "A significant minority of people react badly to it — nausea, swollen lips, dizziness — even when it is correctly identified and well cooked.",
   "Avoid specimens from eucalyptus, conifers or yew, which can carry the host's toxins.",
   "Try a small amount the first time, cooked through, and wait a day."
  ],
  "uses": [
   "nutritive"
  ]
 },
 {
  "slug": "sheep-sorrel",
  "evidence": "traditional",
  "use": "Chewed on the trail as a thirst-quencher, and a component of several traditional tonic mixtures.",
  "part": "Young leaves, raw in small amounts.",
  "evidenceNote": "No good evidence for any medicinal claim; it appears in commercial formulas whose claims are not supported.",
  "cautions": [
   "High in oxalic acid: keep to small amounts, and avoid if you have kidney stones, gout or rheumatoid arthritis.",
   "Not for regular or large-quantity eating."
  ],
  "uses": [
   "nutritive"
  ]
 },
 {
  "slug": "lambs-quarters",
  "evidence": "traditional",
  "use": "One of the most nutritious wild greens on the continent, eaten as a strengthening food rather than as a remedy.",
  "part": "Young leaves and tops, cooked like spinach.",
  "evidenceNote": "Its value is nutritional and well established as a vegetable; it is not a medicine.",
  "cautions": [
   "Contains oxalates like spinach — cook it, and go easy if you are prone to kidney stones.",
   "Concentrates nitrates from fertilised ground; avoid plants from field edges and manured soil."
  ],
  "uses": [
   "nutritive"
  ]
 },
 {
  "slug": "chickweed",
  "evidence": "traditional",
  "use": "A cooling salve for itchy, irritated skin in European folk practice, and a mild spring green.",
  "part": "Whole fresh plant, as a salad green or infused into an oil or salve for external use.",
  "evidenceNote": "Traditional use only; essentially untested.",
  "cautions": [
   "Contains saponins — eating large quantities can upset the stomach.",
   "Scarlet pimpernel grows in the same places, looks similar before flowering and is toxic. Chickweed has a single line of hairs running up one side of the stem."
  ],
  "uses": [
   "skin",
   "nutritive"
  ]
 },
 {
  "slug": "staghorn-sumac",
  "evidence": "traditional",
  "use": "A sharp vitamin-C drink used across eastern North America, and gargled for sore throats.",
  "part": "Ripe red drupes, steeped in cold water — never boiled — and strained through cloth.",
  "evidenceNote": "Traditional use. Its tartness is malic acid rather than vitamin C in the quantity often claimed.",
  "cautions": [
   "Red upright fruit clusters only. Poison sumac has drooping white berries and grows in wet ground — it causes a severe rash.",
   "Related to mango and cashew; people sensitive to those may react.",
   "High in tannins, which can upset the stomach in quantity."
  ],
  "uses": [
   "nutritive",
   "respiratory"
  ]
 },
 {
  "slug": "yarrow",
  "evidence": "traditional",
  "use": "The battlefield wound herb of European tradition, named for Achilles, and a hot tea for feverish colds.",
  "part": "Leaf and flower — fresh leaf pressed on a cut, or dried flowers as a tea.",
  "evidenceNote": "Long tradition, laboratory support for anti-inflammatory activity, no good human trials.",
  "cautions": [
   "Poison hemlock and water hemlock have similar feathery foliage and are lethal. Yarrow's leaves are flat, soft and strongly aromatic; hemlock's stems are smooth and often purple-blotched. If you are not certain, do not pick it.",
   "Avoid in pregnancy.",
   "In the daisy family — a common allergen — and it can cause photosensitivity.",
   "May add to the effect of blood thinners and sedatives."
  ],
  "uses": [
   "skin",
   "respiratory"
  ]
 },
 {
  "slug": "wild-violet",
  "evidence": "traditional",
  "use": "A gentle demulcent tea for dry coughs and a cooling application for irritated skin.",
  "part": "Leaves and flowers, as a tea or a soothing infused oil.",
  "evidenceNote": "Traditional use; among the gentlest plants here, and among the least studied.",
  "cautions": [
   "The root causes vomiting — leaves and flowers only.",
   "Confirm you have a true violet: several toxic plants have heart-shaped leaves."
  ],
  "uses": [
   "respiratory",
   "skin"
  ]
 },
 {
  "slug": "wild-fennel",
  "evidence": "mixed",
  "use": "Chewed after meals for wind and bloating from the Mediterranean to South Asia, and given as a weak tea for infant colic in many traditions.",
  "part": "Seeds, chewed or infused; fronds as a herb.",
  "evidenceNote": "Small trials support its use for bloating and for colic; the colic tradition also carries a real risk, below.",
  "cautions": [
   "Poison hemlock looks very like fennel and is lethal. Fennel smells strongly of aniseed when crushed and hemlock smells foul — but do not rely on smell alone, and never pick it unless you are certain.",
   "Do not give fennel preparations to infants: there are case reports of harm, and colic needs a doctor's assessment.",
   "Has mild oestrogenic activity — avoid in pregnancy and with hormone-sensitive conditions.",
   "Can increase sensitivity to sunlight."
  ],
  "uses": [
   "digestive",
   "respiratory"
  ]
 },
 {
  "slug": "cattail-shoots",
  "evidence": "traditional",
  "use": "Used across many North American First Nations on small burns, cuts and stings.",
  "part": "The gel from between the young leaves, applied externally.",
  "evidenceNote": "Traditional use; not studied.",
  "cautions": [
   "Cattail absorbs what is in its water. Never take it from a ditch, a roadside or downstream of farmland or industry.",
   "Iris rhizomes grow in the same marshes and are toxic; iris leaves are flat and fan out from a single plane."
  ],
  "uses": [
   "skin"
  ]
 },
 {
  "slug": "wood-sorrel",
  "evidence": "traditional",
  "use": "A sharp trailside nibble, traditionally chewed for thirst.",
  "part": "Leaves, raw and in small amounts.",
  "evidenceNote": "No medicinal evidence; it is a pleasant sour green.",
  "cautions": [
   "Oxalic acid again — small amounts only, and avoid with kidney stones or gout."
  ],
  "uses": [
   "nutritive"
  ]
 },
 {
  "slug": "miners-lettuce",
  "evidence": "mixed",
  "use": "Eaten by gold-rush miners for its vitamin C, as a scurvy preventative — one of the few genuinely medicinal uses of a wild green in North American history.",
  "part": "Whole young plant, raw.",
  "evidenceNote": "The vitamin C content is real and the historical use makes sense; nothing beyond that has been tested.",
  "cautions": [
   "No significant cautions as a food. Wash it — it grows low and in damp ground."
  ],
  "uses": [
   "nutritive"
  ]
 },
 {
  "slug": "spruce-tips",
  "evidence": "traditional",
  "use": "A vitamin C tea across the boreal north — the drink credited with saving Cartier's crew from scurvy at Stadacona in 1536 — and a syrup for winter coughs.",
  "part": "Bright new spring growth, as tea or syrup.",
  "evidenceNote": "The scurvy history is well documented; the cough use is traditional.",
  "cautions": [
   "Yew is deadly and has flat, soft, dark needles with no woody peg where they join the twig. Spruce needles are square, sharp and sit on little pegs. Be certain.",
   "Avoid in pregnancy and with kidney problems, as with most concentrated conifer preparations."
  ],
  "uses": [
   "respiratory",
   "nutritive"
  ]
 },
 {
  "slug": "raspberry",
  "evidence": "mixed",
  "use": "Raspberry leaf tea has a long tradition in late pregnancy and as a mild astringent for upset stomachs.",
  "part": "Leaf, dried and infused; fruit as food.",
  "evidenceNote": "Studied in late pregnancy with inconsistent results — no clear benefit and no clear harm in the trials, which were small.",
  "cautions": [
   "Despite the tradition, do not use raspberry leaf in pregnancy without your midwife or doctor's agreement.",
   "Dry the leaves properly: wilting leaves of raspberry and its relatives can produce cyanide compounds. Use them fresh or fully dried, never in between."
  ],
  "uses": [
   "digestive",
   "nutritive"
  ]
 },
 {
  "slug": "chokecherry",
  "evidence": "traditional",
  "use": "Wild cherry bark syrups are an old cough preparation; the fruit was dried into pemmican across the plains.",
  "part": "Cooked fruit pulp only, stones strained out completely.",
  "evidenceNote": "Traditional; the sedative-cough reputation of the bark is not backed by trials.",
  "cautions": [
   "The stones, leaves and bark contain cyanide-forming compounds. Never crush the stones, and keep children away from the raw plant.",
   "Livestock die from eating wilted chokecherry leaves — the same chemistry.",
   "Always cook the fruit and strain the stones out."
  ],
  "uses": [
   "respiratory"
  ]
 },
 {
  "slug": "blueberry",
  "evidence": "mixed",
  "use": "Eaten as food; the fruit's pigments are the basis of a great many circulatory and eyesight claims.",
  "part": "Fruit, eaten; leaves are not used.",
  "evidenceNote": "Good evidence that it is an excellent food; the specific eyesight and memory claims made for it are far ahead of what has been shown.",
  "cautions": [
   "Do not make tea from the leaves — prolonged use has been associated with toxicity."
  ],
  "uses": [
   "nutritive",
   "circulatory"
  ]
 },
 {
  "slug": "hen-of-the-woods",
  "evidence": "mixed",
  "use": "Eaten as food; sold widely as maitake on immune and blood-sugar claims.",
  "part": "Fresh young clusters, cooked.",
  "evidenceNote": "Laboratory and small preliminary work only. The supplement claims are far ahead of the evidence.",
  "cautions": [
   "May lower blood sugar and blood pressure, adding to medication for either.",
   "May slow clotting — care with blood thinners and before surgery."
  ],
  "uses": [
   "immune",
   "nutritive"
  ]
 },
 {
  "slug": "lions-mane",
  "evidence": "mixed",
  "use": "Eaten as food; heavily marketed on memory and nerve claims.",
  "part": "Fresh fruiting body, cooked.",
  "evidenceNote": "A handful of very small human studies with mixed results. Nothing here justifies the claims made in the supplement aisle.",
  "cautions": [
   "Skin rashes and breathing difficulty have been reported by a few people.",
   "May slow clotting — care with blood thinners and before surgery."
  ],
  "uses": [
   "nutritive"
  ]
 },
 {
  "slug": "mulberry",
  "evidence": "mixed",
  "use": "Eaten as food; the leaf has a separate blood-sugar tradition in Asia.",
  "part": "Ripe fruit.",
  "evidenceNote": "Mulberry leaf extract has some evidence for blunting blood-sugar spikes; that is a standardised extract, not a handful of fruit.",
  "cautions": [
   "Unripe fruit and the milky sap cause stomach upset and can be mildly hallucinogenic.",
   "If you take diabetes medication, leaf preparations could add to it."
  ],
  "uses": [
   "nutritive"
  ]
 },
 {
  "slug": "cranberry",
  "evidence": "studied",
  "use": "The best-known folk approach to recurrent urinary infections in North America.",
  "part": "Fruit and unsweetened juice.",
  "evidenceNote": "Systematic reviews find it may reduce how often urinary infections recur in some groups; it does not treat an infection you already have.",
  "cautions": [
   "A urinary infection needs antibiotics. Fever, back pain or blood means see a doctor today.",
   "Interacts with warfarin — several case reports of raised INR.",
   "Acidic and high in oxalate: care with reflux and with a history of kidney stones."
  ],
  "uses": [
   "urinary"
  ]
 }
];

export const getMedicinal = (slug: string) => MEDICINAL.find((m) => m.slug === slug);
/** The plants listed under a use, in page order. */
export const medicinalFor = (use: MedicinalUse) => MEDICINAL.filter((m) => m.uses.includes(use));
