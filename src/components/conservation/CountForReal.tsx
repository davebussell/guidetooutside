/**
 * "Count for real" — the Learn pages' panel: Roots & Shoots (the national
 * chapter for the visitor's country when the library has one, else the
 * international programme), the nearest youth or bird body for the visitor's
 * remembered town and the country's BirdLife partner (whose counts and atlases
 * the tallies feed), with why a count sent to a real survey is the lesson.
 * The best open count or survey for the visitor's town is featured above the
 * cards. Reads the place cookie, so it is for dynamic pages only and should sit
 * inside a Suspense boundary.
 */
import { orgBySlug, type Organisation } from "@/data/conservation";
import { panelFor } from "@/lib/conservation/cards";
import { orgsAnywhere, orgsFor, type OrgMatch } from "@/lib/conservation/match";
import { visitorPlace } from "@/lib/conservation/visitor";
import { LocationSearch } from "@/components/LocationSearch";
import { DISCLOSURE, OrgsPanel, RegionLink, type PanelMatch } from "./OrgsPanel";

const isRootsAndShoots = (o: Organisation) => o.network === "Roots & Shoots" || o.slug.startsWith("roots-and-shoots");

export async function CountForReal({ id = "count-for-real" }: { id?: string }) {
  const place = await visitorPlace();
  const near: OrgMatch[] = place ? orgsFor(place, { topic: ["youth", "birds"] }).filter((m) => m.topical) : orgsAnywhere({ topic: ["youth", "birds"] });
  // The country's own Roots & Shoots when there is one; the international programme otherwise.
  const chapter = near.find((m) => isRootsAndShoots(m.org) && m.tier >= 1);
  const global = orgBySlug("roots-and-shoots");
  const first: PanelMatch | null = chapter ? { org: chapter.org, why: chapter.why } : global ? { org: global, why: "International programme" } : null;
  // Then the nearest youth or bird body, and the country's BirdLife partner (whose surveys the counts go to) when there is one.
  const others = near.filter((m) => !isRootsAndShoots(m.org));
  const birdlife = others.find((m) => m.org.network === "BirdLife International" && m.tier >= 1);
  const local = others.find((m) => m !== birdlife);
  const picked = [local, birdlife].filter((m): m is OrgMatch => !!m);
  const rest = [...picked, ...others.filter((m) => !picked.includes(m))].slice(0, first ? 2 : 3);
  const matches: PanelMatch[] = [...(first ? [first] : []), ...rest.map((m) => ({ org: m.org, why: m.why }))];
  // The count to join this season, for the visitor's town or (with none) one done from a window.
  const panel = await panelFor(matches, place, ["birds", "youth", "wildlife"]);

  return (
    <OrgsPanel
      id={id}
      heading={place ? `Count for real, near ${place.name}` : "Count for real"}
      lede={
        <>
          A tally of the birds at the feeder, sent to a survey that scientists read, is a number that matters to someone beyond the family: it joins the counts of thousands
          of others and shows which birds are doing well and which are not. That is the lesson whole — look closely, count honestly, write it down and send it where it
          will be used. {DISCLOSURE}
        </>
      }
      matches={panel.cards}
      feature={panel.feature}
      compact
      footer={<RegionLink countryCode={place?.countryCode} label={place ? "All organisations in your region →" : "Browse every organisation by country →"} />}
    >
      {!place && (
        <div className="mt-5 max-w-xl">
          <p className="text-sm font-medium">Enter your town for the programmes near you</p>
          <div className="mt-2">
            <LocationSearch />
          </div>
        </div>
      )}
    </OrgsPanel>
  );
}
