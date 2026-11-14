/**
 * What /ground/rocks and the rock pages share: the soil badge each rock
 * wears, and the toy that goes with each family ("Make it erupt", "Lay down
 * layers, then squash them", "Heat it and squeeze it"). Surface deposits have
 * no toy of their own.
 */
import { Volcano } from "@/components/kids/Volcano";
import { Layers } from "@/components/toys/Layers";
import { Squeeze } from "@/components/kids/Squeeze";
import type { Rock, RockFamily, SoilEffect } from "@/lib/rocks";

export const FAMILY_ORDER: RockFamily[] = ["igneous", "sedimentary", "metamorphic", "deposit"];

/** The badge on each rock card: "Acid soil", "Neutral", "Sweet soil". */
export const SOIL_BADGE: Record<SoilEffect, { label: string; className: string }> = {
  acid: { label: "Acid soil", className: "bg-gold-fill/25 text-ink" },
  neutral: { label: "Neutral", className: "bg-paper-2 text-ink-2" },
  alkaline: { label: "Sweet soil", className: "bg-moss-soft text-moss" },
};

/** "Soil pH usually 4.5–5.5" → "usually 4.5–5.5". */
export const phRange = (r: Rock) => r.ph.replace(/^Soil pH /, "");

type FamilyToy = { art: string; title: string; intro: string; toy: React.ReactNode };

export const FAMILY_TOY: Partial<Record<RockFamily, FamilyToy>> = {
  igneous: {
    art: "sun",
    title: "Make it erupt",
    intro:
      "Hold the button to push hot, melted rock up from deep underground. Cooled fast in the air it is basalt; cooled slowly underground, with time for crystals to grow, it is granite.",
    toy: <Volcano />,
  },
  sedimentary: {
    art: "shell",
    title: "Lay down layers, then squash them",
    intro:
      "Drop sand, mud and shells on the bottom of a sea, a thousand years a layer — then hold to squash them for millions of years into sandstone, shale and limestone, with a fossil inside.",
    toy: <Layers />,
  },
  metamorphic: {
    art: "stone",
    title: "Heat it and squeeze it",
    intro: "Turn up the heat and the squeeze, deep underground, and watch shale become slate, then schist, then gneiss — changed, without ever melting.",
    toy: <Squeeze />,
  },
};
