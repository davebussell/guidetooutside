/**
 * What /ground/rocks and the rock pages share: the soil badge each rock
 * wears, and the toy that goes with each family ("Make it erupt", "Lay down
 * layers, then squash them", "Heat it and squeeze it"). Surface deposits have
 * no toy of their own.
 */
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

