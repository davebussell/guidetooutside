/**
 * A page's story (`storyFor(path)`): the conservation thread written into one
 * of the most-read pages. A wide photograph of the subject (credited), the
 * eyebrow and heading, the paragraphs in a reading measure, the open
 * invitation(s) it features (one as the feature, two as cards), the ways in
 * as a numbered row (each with its effort and one button), the organisations
 * it is about as compact cards, and their latest articles.
 *
 * It sits in the slot of the page's "who looks after this" panel and replaces
 * it: with no story for the path, or a story told for other countries than
 * the reader's, the `fallback` (the plain panel) renders instead.
 *
 * `place`: the visitor's place on a dynamic page (`null` when none is
 * remembered); `undefined` on a static page, where the country-dependent
 * parts are decided in the browser (StoryCountry).
 */
import Image from "next/image";
import { invitationBySlug, orgBySlug, storyFor, type Organisation, type Story } from "@/data/conservation";
import { withExtras } from "@/lib/conservation/cards";
import { continentOfCountry, countryLabel, countryWords, HUB_CONTINENT_LABEL } from "@/lib/conservation/geo-words";
import { invitationsBySlug, orgDisplayName, toFeature } from "@/lib/conservation/invitations";
import type { MatchPlace } from "@/lib/conservation/match";
import { orgNews } from "@/lib/conservation/news";
import { countryServed } from "@/lib/scope";
import { InvitationCard, InvitationFeature } from "./InvitationFeature";
import { OrgCard } from "./OrgCard";
import { OrgNews } from "./OrgNews";
import { DISCLOSURE } from "./OrgsPanel";
import { CountryGate, CountrySteps } from "./StoryCountry";
import { StepsBlock, type StepData } from "./StorySteps";

/** Whether a story is told for this reader (a story for certain countries, and a reader known to be elsewhere, is not). */
export function storyApplies(story: Story, place: MatchPlace | null | undefined): boolean {
  if (!story.countries?.length) return true;
  // A story told only for parked countries (src/lib/scope.ts) is not told.
  if (!story.countries.some((c) => countryServed(c))) return false;
  const cc = place?.countryCode;
  return !cc || story.countries.includes(cc);
}

const visitLabel = (o: Organisation) => {
  const n = o.shortName && o.name.length > 28 ? o.shortName : o.name;
  return n.length <= 28 ? `Visit ${n}` : "Visit their site";
};

const listWords = (xs: string[]) => (xs.length <= 1 ? xs.join("") : `${xs.slice(0, -1).join(", ")} and ${xs[xs.length - 1]}`);

/** "In Canada", "In the US and Canada", "In Europe" (a long list on one continent), "In 12 countries". */
function whereOf(countries: string[]): string {
  if (countries.length <= 3) return `In ${listWords(countries.map(countryWords))}`;
  const conts = [...new Set(countries.map(continentOfCountry))];
  if (conts.length === 1 && conts[0] !== "international") return `In ${HUB_CONTINENT_LABEL[conts[0]]}`;
  if (conts.length === 2 && !conts.includes("international")) return `In ${HUB_CONTINENT_LABEL[conts[0]]} and ${HUB_CONTINENT_LABEL[conts[1]]}`;
  return `In ${countries.length} countries`;
}

function stepsOf(story: Story): StepData[] {
  return (
    story.steps
      // A step that exists only in parked countries (src/lib/scope.ts) is not shown; one for several countries names the served ones.
      .filter((st) => !st.countries?.length || st.countries.some((c) => countryServed(c)))
      .map((st, i): StepData => {
        const countries = st.countries?.filter((c) => countryServed(c)) ?? [];
        const inv = st.invitation ? invitationsBySlug([st.invitation], undefined)[0] : undefined;
        // A step whose invitation has closed still lands on the organisation running it.
        const org = orgBySlug(inv?.org.slug ?? st.org ?? (st.invitation ? invitationBySlug(st.invitation)?.org : undefined) ?? "");
        const base = { key: `${i}-${st.text.slice(0, 24)}`, effort: st.effort, text: st.text, ...(countries.length ? { countries, where: whereOf(countries) } : {}) };
        if (inv) return { ...base, href: st.url ?? inv.invitation.url, label: inv.invitation.cta, way: "invitation", org: { slug: inv.org.slug, name: orgDisplayName(inv.org) } };
        if (org) return { ...base, href: st.url ?? org.links.home, label: visitLabel(org), way: st.url ? "story" : "home", org: { slug: org.slug, name: orgDisplayName(org) } };
        return { ...base, way: "home" };
      })
  );
}

const whyOf = (o: Organisation) => (o.scope === "international" || !o.countryCode ? "International" : countryLabel(o.countryCode));

function Credit({ photo }: { photo: NonNullable<Story["photo"]> }) {
  return (
    <figcaption className="font-display px-5 pt-3 text-right text-[13px] italic leading-snug text-ink-2 sm:px-8 lg:px-12">
      Photograph:{" "}
      <a href={photo.source} target="_blank" rel="noopener nofollow" className="underline decoration-line underline-offset-2 hover:text-ink">
        {photo.author}
      </a>{" "}
      ·{" "}
      <a href={photo.licenseUrl} target="_blank" rel="noopener nofollow" className="underline decoration-line underline-offset-2 hover:text-ink">
        {photo.license}
      </a>
    </figcaption>
  );
}

async function StoryBody({ story, place, id }: { story: Story; place: MatchPlace | null | undefined; id: string }) {
  const cc = place?.countryCode || "";
  const invites = invitationsBySlug(story.invitations ?? [], place).map((m) => toFeature(m, { showWhere: !place }));
  const featured = invites.slice(0, invites.length >= 2 ? 2 : 1);
  const allSteps = stepsOf(story);
  const needsClientSteps = place === undefined && allSteps.some((s) => s.countries?.length);
  // The story's order, except that a reader whose country is known meets their own country's body first.
  const orgs = story.orgs
    .map((s) => orgBySlug(s))
    .filter((o): o is Organisation => !!o)
    .map((o, i) => ({ o, i, home: !!cc && o.countryCode === cc && o.scope !== "international" }))
    .sort((a, b) => (a.home === b.home ? a.i - b.i : a.home ? -1 : 1))
    .map((x) => x.o);
  const [cards, news] = await Promise.all([
    withExtras(
      orgs.slice(0, 3).map((o) => ({ org: o, why: whyOf(o) })),
      place ?? null,
      featured.length === 1 ? featured[0] : null,
      { only: story.invitations ?? [] },
    ),
    orgNews(story.orgs, { limit: 3 }),
  ]);
  return (
    <section className="gto-band overflow-hidden rounded-feature bg-moss-soft" aria-labelledby={id}>
      {story.photo && (
        <figure>
          <div className="relative aspect-[3/2] bg-paper-2 sm:aspect-[21/9]">
            <Image src={story.photo.src} alt={story.photo.alt} fill sizes="(min-width: 1152px) 1152px, 100vw" className="object-cover" />
          </div>
          <Credit photo={story.photo} />
        </figure>
      )}
      <div className={`px-5 pb-8 sm:px-8 sm:pb-10 lg:px-12 lg:pb-12 ${story.photo ? "pt-6 sm:pt-8" : "pt-8 sm:pt-10 lg:pt-12"}`}>
        <p className="eyebrow text-moss">Get involved · {story.eyebrow}</p>
        <h2 id={id} className="font-display mt-2 max-w-4xl text-3xl leading-[1.1] tracking-tight sm:text-5xl">
          {story.heading}
        </h2>
        <div className="font-display mt-6 max-w-[65ch] space-y-4 text-[18px] leading-[1.7] text-ink sm:text-[19px]">
          {story.paragraphs.map((p) => (
            <p key={p.slice(0, 40)}>{p}</p>
          ))}
        </div>

        {featured.length === 1 && <InvitationFeature inv={featured[0]} className="mt-10" />}
        {featured.length === 2 && (
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {featured.map((f) => (
              <InvitationCard key={f.slug} inv={f} />
            ))}
          </div>
        )}

        {needsClientSteps ? <CountrySteps steps={allSteps} id={`${id}-ways`} /> : <StepsBlock steps={allSteps} country={cc || null} id={`${id}-ways`} />}

        {cards.length > 0 && (
          <div className="mt-12">
            <h3 className="font-display text-2xl tracking-tight sm:text-3xl">The organisations</h3>
            <div className={`mt-5 grid gap-5 ${cards.length > 1 ? "md:grid-cols-2" : "max-w-xl"} ${cards.length > 2 ? "lg:grid-cols-3" : ""}`}>
              {cards.map((c) => (
                // Their articles have a row of their own below, so the cards carry no "Latest" line.
                <OrgCard key={c.org.slug} org={{ ...c.org, news: null }} why={c.why} compact />
              ))}
            </div>
          </div>
        )}

        <OrgNews items={news} heading="Latest from them" className="mt-12" id={`${id}-news`} />

        <p className="mt-10 max-w-3xl text-xs leading-relaxed text-ink-2">
          Written by this guide from the organisations&apos; own pages. {DISCLOSURE}
        </p>
      </div>
    </section>
  );
}

export async function StoryBlock({ path, place, fallback, id = "story" }: { path: string; place?: MatchPlace | null; fallback?: React.ReactNode; id?: string }) {
  const story = storyFor(path);
  if (!story || !storyApplies(story, place)) return <>{fallback ?? null}</>;
  const body = <StoryBody story={story} place={place} id={id} />;
  // On a static page the reader's country is only known in the browser.
  if (story.countries?.length && place === undefined) {
    return (
      <CountryGate countries={story.countries} fallback={fallback}>
        {body}
      </CountryGate>
    );
  }
  return body;
}

/** Whether the page has a story at all (for pages that place the panel differently when it does). */
export const hasStory = (path: string) => !!storyFor(path);
