/**
 * /foraging/medicinal — the medicinal-plant record: what each plant has
 * traditionally been used for, by use, with its evidence rating and first
 * caution. Plant-first: there is no symptom lookup.
 */
import type { Metadata } from "next";
import { MEDICINAL, MEDICINAL_USES, medicinalFor } from "@/data/medicinal";
import { getSpecies } from "@/lib/species";
import { MEDICAL_DISCLAIMER, MedicinalCard, CautionBullet } from "@/components/foraging/Medicinal";
import { PlaceSearchCard } from "@/components/foraging/PlaceSearchCard";
import { StoryBlock } from "@/components/conservation/StoryBlock";
import { FoodPanel } from "@/components/conservation/FoodPanel";
import { NearbyOrgs } from "@/components/conservation/NearbyOrgs";
import { OrgsAnywhere } from "@/components/conservation/VisitorOrgs";

/** Hourly: the conservation story's invitations open and close by date, and the organisations' articles arrive daily. */
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Medicinal plants — what wild plants have traditionally been used for",
  description:
    "A plain, honest record of the traditional and folk medicinal uses of wild plants in Canada and the United States: the part used, what is actually known about it, and the interactions and cautions that come with it. Traditional use, not medical advice.",
  alternates: { canonical: "/foraging/medicinal" },
};

const BEFORE = [
  {
    lead: "Identification comes first, always.",
    text: "Several plants here have look-alikes that will kill you. Confirm with a regional field guide or an experienced forager before anything else.",
  },
  {
    lead: "Natural does not mean safe.",
    text: "The plants that do something are the ones that can also do harm — at the wrong dose, over too long, or alongside the wrong medicine.",
  },
  {
    lead: "Some situations are not for experimenting.",
    text: "Pregnancy or breastfeeding, children, kidney, liver or heart conditions, upcoming surgery, or any regular prescription — ask a pharmacist first. They will tell you for free.",
  },
];

export default function MedicinalPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12 sm:py-16">
      <p className="eyebrow text-moss">Foraging · traditional medicine</p>
      <h1 className="font-display mt-2 text-4xl sm:text-5xl font-semibold tracking-tight max-w-3xl">Medicinal plants: traditional uses and the evidence</h1>
      <p className="mt-4 text-lg text-ink-2 max-w-3xl">
        Many of the plants used in traditional medicine grow along roadsides and field edges. This is a record of {MEDICINAL.length} of them: the traditional use,
        the part used, what has been tested, and the known risks.
      </p>
      <section className="mt-8 rounded-tile bg-rust-soft p-6 sm:p-8 max-w-4xl">
        <div className="flex items-start gap-3">
          <svg
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            className="text-rust shrink-0 mt-0.5"
            aria-hidden="true"
          >
            <path d="M12 9v5" />
            <circle cx="12" cy="17.4" r="0.9" fill="currentColor" stroke="none" />
            <path d="M10.3 3.9 2.5 17.6A2 2 0 0 0 4.2 20.6h15.6a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" />
          </svg>
          <div>
            <h2 className="font-display text-xl font-semibold text-rust">Before reading further</h2>
            <p className="mt-2 text-ink-2">{MEDICAL_DISCLAIMER}</p>
            <ul className="mt-3 space-y-1.5 text-sm text-ink-2">
              {BEFORE.map((b) => (
                <CautionBullet key={b.lead}>
                  <span className="font-semibold">{b.lead}</span> {b.text}
                </CautionBullet>
              ))}
            </ul>
            <p className="mt-3 text-sm text-ink-2">
              We deliberately do not offer a “what should I take for this?” lookup. That is prescribing, and this is a field guide. What follows is organised by plant.
            </p>
          </div>
        </div>
      </section>
      <nav className="mt-10 flex flex-wrap gap-2">
        {MEDICINAL_USES.map((u) => (
          <a
            key={u.id}
            href={`#${u.id}`}
            className="rounded-full bg-surface border border-edge px-4 py-2 text-sm hover:border-moss hover:text-moss transition"
          >
            {u.label} <span className="text-ink-2 text-xs">{medicinalFor(u.id).length}</span>
          </a>
        ))}
      </nav>
      {MEDICINAL_USES.map((u) => (
        <section key={u.id} id={u.id} className="mt-14 scroll-mt-24">
          <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight">{u.label}</h2>
          <p className="mt-1 text-ink-2 max-w-2xl">{u.blurb}</p>
          <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {medicinalFor(u.id).map((m) => {
              const s = getSpecies(m.slug);
              return s ? <MedicinalCard key={m.slug} plant={m} species={s} /> : null;
            })}
          </ul>
        </section>
      ))}
      {/* The page's conservation story (who protects the at-risk medicinal plants), or the plain panel. Static page: the
          reader's country is applied to the story's steps in the browser. */}
      <div className="mt-16">
        <StoryBlock
          path="/foraging/medicinal"
          fallback={
            <NearbyOrgs id="who-looks-after" topic={["plants", "land"]} headingNear="Who looks after the wild plants near {town}">
              <OrgsAnywhere id="who-looks-after" topic={["plants", "land"]} heading="Who looks after wild plants and the land they grow on" />
            </NearbyOrgs>
          }
        />
      </div>
      {/* Foraging codes first, then the groups that share the harvest (the reader's own town once the browser knows it). */}
      <FoodPanel place={null} section="foraging" nearby className="mt-16" />
      <PlaceSearchCard
        className="mt-16"
        eyebrow="By place"
        title="Which of these grow in a given area"
        text="Enter a town or postal code to narrow the foraging guide to its ecological region and the current month, including which of these plants can be found now."
      />
      <p className="mt-10 text-xs text-ink-2 max-w-3xl">
        Educational information only, and no part of it is a substitute for professional medical advice, diagnosis or treatment. If you are unwell, see a doctor. If you
        think you have been poisoned, contact your local poison centre immediately — in Canada and the United States they answer around the clock and the call is free.
      </p>
    </div>
  );
}
