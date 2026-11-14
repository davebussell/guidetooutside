import type { Metadata } from "next";
import Link from "next/link";
import { POPULAR_LOCATIONS } from "@/lib/site";
import { LocationSearch } from "@/components/LocationSearch";
import { NewsletterForm } from "@/components/NewsletterForm";
import { PlaceFinder } from "@/components/PlaceFinder";
import { YourPlaceBanner } from "@/components/here/YourPlaceBanner";

export const metadata: Metadata = {
  title: "The ground by location — surface deposits, bedrock, soil and watersheds",
  description:
    "Enter your town for the surface deposits and bedrock the geologic maps show there, with their age ranges, the soil as a model estimates it, the lakes and rivers within reach, a modelled river flow, and where your water goes after it leaves.",
};

const GIVES = [
  "The surface deposits and bedrock the geologic maps show, with their age ranges",
  "What kind of rock or deposit each one is, and how that kind forms",
  "The soil's modelled texture and pH, where the soil model has values",
  "Named lakes, rivers and streams within about 20 km",
  "A modelled river flow, labelled as an estimate and not a gauge reading",
  "The full chain of water from your street to the ocean",
];

/** /ground: the section front page — what a local ground guide shows, three short essays, and the places. */
export default function GroundIndex() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12 sm:py-16">
      <div className="max-w-3xl">
        <p className="eyebrow text-bark">The ground</p>
        <h1 className="font-display mt-2 text-4xl sm:text-5xl font-semibold tracking-tight">Everything here starts with the rock.</h1>
        <p className="mt-5 text-lg text-ink-2 leading-relaxed">
          What grows in your garden, what swims in your river and what comes up in your woods are all downstream of two things you cannot change: what
          lies under the soil — rock, or the clay, sand and till that ice and seas left on it — and the route the water takes away. Enter your town and
          we&apos;ll show you what the geologic maps show there, the surface deposits and the bedrock with their age ranges, the soil as a model
          estimates it, and the chain of rivers your rain joins on its way to the sea.
        </p>
        <YourPlaceBanner section="ground" />
        <div id="search" className="mt-8">
          <LocationSearch large />
          <p className="mt-2 text-sm text-ink-2">
            Town or postal code, anywhere in Canada or the United States — or use your location.{" "}
            <a href="#find" className="underline decoration-line hover:text-ink">
              Browse cities, regions and zones
            </a>
            .
          </p>
        </div>
      </div>

      <section className="mt-14 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <div className="grid gap-10">
          <div>
            <p className="eyebrow">What your local guide gives you</p>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {GIVES.map((g) => (
                <li key={g} className="card px-4 py-3 text-sm text-ink-2">
                  {g}
                </li>
              ))}
            </ul>
          </div>
          <article>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold">Why acid soil and sweet soil sit forty minutes apart</h2>
            <div className="mt-3 space-y-3 text-ink-2 leading-relaxed">
              <p>
                Rain is faintly acid. What that acid meets underground decides everything above it. Limestone and marble dissolve in it and release
                calcium, which leaves the soil sweet, the water hard and the ground full of the fissures and springs that hard water makes. Granite and
                gneiss barely react at all, so nothing neutralises the acid, and the soil stays sour, thin and hungry over rock that has not moved in a
                billion years.
              </p>
              <p>
                That is why a gardener on the Canadian Shield can grow blueberries by accident and fights for cabbages, while a gardener an hour away
                on Ordovician limestone has the opposite problem. Same climate, same weather, same seed packet — different rock.
              </p>
              <p>
                One caution: where ice or a sea has laid a blanket of till, clay or sand over the rock, the soil takes its chemistry from that blanket
                instead, so the bedrock alone does not tell you what is in a particular garden. That is why each ground page shows the surface deposits and
                the bedrock as two separate layers.
              </p>
              <p>
                <Link href="/ground/rocks" className="font-medium text-moss hover:underline">
                  The kinds of rock, and how each one forms →
                </Link>
              </p>
            </div>
          </article>
          <article>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold">A watershed is the only map that water reads</h2>
            <div className="mt-3 space-y-3 text-ink-2 leading-relaxed">
              <p>
                Everywhere on land belongs to exactly one basin, and the boundary between two of them can run down the middle of a field. Rain falling
                on one side of that line reaches the Gulf of Mexico; rain on the other reaches Hudson Bay. Nothing on the ground marks it, which is why
                almost nobody knows which one they live in.
              </p>
              <p>
                It is worth knowing because it is the unit everything in the water actually obeys. What washes off the land upstream arrives
                downstream; a fish that migrates can only reach what its own basin connects to; and the reason the same species is native in one river
                and invasive in the next is usually that the two have never been joined.
              </p>
            </div>
          </article>
          <article>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold">What a river figure does and does not tell you</h2>
            <div className="mt-3 space-y-3 text-ink-2 leading-relaxed">
              <p>
                A discharge figure on its own means little: the same number can be a trickle on a big river and a flood on a small creek. What matters is
                how it compares with what normally flows past that point on that date, and that needs a long gauge record for that river. The river figure
                on these pages is a modelled estimate, not a gauge reading, so it is shown without a verdict. For the real thing, use the current readings
                from the river authority or national gauge network for your river.
              </p>
              <p>
                Low water concentrates fish and makes them nervous, and warms fast enough that a hard fight can kill one you meant to release. High
                water pushes them into the slack edges and makes crossings that are normally nothing genuinely dangerous. Both are worth knowing before
                you leave the house.
              </p>
            </div>
          </article>
        </div>
        <aside className="grid gap-6 content-start">
          <div className="card p-5">
            <p className="eyebrow">Popular areas</p>
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {POPULAR_LOCATIONS.slice(0, 12).map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/ground/${p.slug}`}
                    className="inline-block rounded-full border border-edge bg-surface px-3 py-1 text-sm hover:border-moss hover:text-moss"
                  >
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </section>

      <div className="mt-20">
        <PlaceFinder section="ground" accent="text-bark" />
      </div>

      <section className="mt-16 card p-8 grid gap-6 md:grid-cols-[1.3fr_1fr] items-center bg-moss text-paper border-moss min-w-0 [&>*]:min-w-0">
        <div>
          <h2 className="font-display text-2xl font-semibold">The Weekly Field Note</h2>
          <p className="mt-1 text-paper/90 text-sm">One email a week, tuned to your area. Unsubscribe anytime.</p>
        </div>
        <NewsletterForm source="topic-ground" />
      </section>
    </div>
  );
}
