import type { Metadata } from "next";
import Link from "next/link";
import { CREATURES, FISH, GARDEN_LIFE, GROUP_LABEL, creaturesNow, type Creature, type CreatureGroup } from "@/lib/nature";
import { monthName } from "@/lib/species";
import { CreatureCard } from "@/components/NatureCard";
import { LocationSearch } from "@/components/LocationSearch";
import { ActiveNearYou } from "@/components/here/ActiveNearYou";
import { YoungNaturalists } from "@/components/learn/YoungNaturalists";
import { SeasonBand } from "@/components/conservation/SeasonBand";

/** The month-dependent count ("In October, 83 of them are active") is re-read twice a day. */
/** Hourly: the season band's invitations open and close by date. */
export const revalidate = 3600;

const TITLE = "Field guide — fish, pollinators, beneficials and pests";
const DESCRIPTION =
  "Photographs and plain identification for the sport fish, pollinators, beneficial insects, garden pests and soil life of Canada and the United States, with the months each one is active.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/wildlife" },
};

/** Each group's section on the index, in library order, with the line under its heading. */
const GROUPS: { group: CreatureGroup; intro: string }[] = [
  { group: "fish", intro: "Where each species holds, how to identify it, and the method that usually takes it." },
  { group: "pollinator", intro: "Most fruit and many vegetables depend on insect pollination. The principal pollinators and how to recognise them." },
  { group: "beneficial", intro: "Predators and parasitoids that keep pests in check without intervention, provided spraying does not kill them." },
  { group: "soil", intro: "Earthworms and other soil organisms that break down organic matter and build soil structure." },
  { group: "pest", intro: "The pests worth acting on, and control methods other than broad-spectrum sprays." },
];

function GroupSection({ group, intro, items }: { group: CreatureGroup; intro: string; items: Creature[] }) {
  return (
    <section className="mt-12">
      <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight">{GROUP_LABEL[group]}</h2>
      <p className="mt-1 text-ink-2 max-w-2xl">{intro}</p>
      <div className="mt-5">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((c) => (
            <CreatureCard key={c.slug} creature={c} priority={false} />
          ))}
        </ul>
      </div>
    </section>
  );
}

export default function WildlifePage() {
  const month = new Date().getMonth() + 1;
  const active = creaturesNow(CREATURES, month).length;
  const of = (g: CreatureGroup) => CREATURES.filter((c) => c.group === g);
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 sm:py-12">
      <p className="eyebrow text-azure">Species</p>
      <h1 className="font-display mt-1 text-4xl sm:text-5xl font-semibold tracking-tight max-w-3xl">Fish, pollinators, beneficial insects and pests</h1>
      <p className="mt-3 text-lg text-ink-2 max-w-2xl">
        {CREATURES.length}
        {" species across Canada and the United States: "}
        {FISH.length}
        {" sport fish and "}
        {GARDEN_LIFE.length}{" "}
        {"garden insects and soil organisms, each photographed and described. In "}
        {monthName(month)}
        {","}{" "}
        {active}
        {" of them are active."}
      </p>
      <div className="mt-8 card p-5 sm:p-6 max-w-2xl">
        <p className="eyebrow text-moss">Active species by place</p>
        <p className="mt-1 text-sm text-ink-2">Enter a town or postal code to narrow every page to its ecological region and this week&apos;s weather.</p>
        <div className="mt-3">
          <LocationSearch />
        </div>
      </div>
      <ActiveNearYou creatures={CREATURES.map((c) => ({ slug: c.slug, name: c.name, group: c.group, months: c.months, regions: c.regions }))} />
      <nav className="mt-10 flex flex-wrap gap-2">
        {GROUPS.map(({ group }) => (
          <a
            key={group}
            href={`#${group}`}
            className="rounded-full bg-surface border border-edge px-4 py-2 text-sm hover:border-moss hover:text-moss transition"
          >
            {GROUP_LABEL[group]} <span className="text-ink-2 text-xs">{of(group).length}</span>
          </a>
        ))}
      </nav>
      <SeasonBand
        topics={["birds", "wildlife", "pollinators"]}
        nearby
        heading="Get involved this season: birds, wildlife and pollinators"
        headingNear="Birds, wildlife and pollinators: get involved near {town}"
        lede="Counts and surveys of birds, bees and wildlife run by the conservation organisations in our library; each button opens their own page."
        id="get-involved"
        className="mt-12"
      />
      <div id="fish" className="scroll-mt-24">
        <GroupSection group="fish" intro={GROUPS[0].intro} items={of("fish")} />
      </div>
      <div id="garden" className="scroll-mt-24">
        {GROUPS.slice(1).map(({ group, intro }) => (
          <div key={group} id={group} className="scroll-mt-24">
            <GroupSection group={group} intro={intro} items={of(group)} />
          </div>
        ))}
      </div>
      <div className="mt-14">
        <YoungNaturalists panel="wildlife" />
      </div>
      <section className="mt-14 card p-6 sm:p-8">
        <h2 className="font-display text-2xl font-semibold">Seasonal conditions</h2>
        <p className="mt-2 text-ink-2 max-w-2xl">
          Frost, soil temperature, day length, rain and the moon govern when each of these species is active. With a location set, every page reads them from
          the local forecast.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link href="/almanac" className="rounded-full bg-moss text-paper px-5 py-2.5 text-sm font-semibold hover:bg-moss-2">
            Almanac
          </Link>
          <Link href="/foraging/calendar" className="rounded-full bg-surface border border-edge px-5 py-2.5 text-sm font-semibold hover:border-moss">
            Foraging calendar
          </Link>
        </div>
      </section>
    </div>
  );
}
