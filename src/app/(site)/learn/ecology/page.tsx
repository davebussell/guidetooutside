import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ActivityArt } from "@/components/learn/ActivityArt";
import { BeaverPond } from "@/components/kids/BeaverPond";
import { Decomposers } from "@/components/toys/Decomposers";
import { FoodChain } from "@/components/toys/FoodChain";
import { FoodWeb } from "@/components/toys/FoodWeb";
import { LandSkyEyebrow, LandSkyNav } from "@/components/kids/LandSkyNav";
import { LivingSort } from "@/components/learn/LivingSort";
import { Tile } from "@/components/learn/family";
import { VideoCard } from "@/components/VideoCard";
import { WaterCycle } from "@/components/toys/WaterCycle";
import { BOOKS } from "@/lib/books";
import { KID_VIDEOS } from "@/data/kid-videos";
import { StoryBlock } from "@/components/conservation/StoryBlock";
import { NearbyOrgs } from "@/components/conservation/NearbyOrgs";
import { OrgsAnywhere } from "@/components/conservation/VisitorOrgs";

/** Hourly: the conservation story's invitations open and close by date, and the organisations' articles arrive daily. */
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "What's an ecosystem? A hands-on guide to ecology for kids",
  description:
    "Ecology for two- to six-year-olds, one big idea at a time, each one to play with: sort the living from the non-living at a pond, build food chains, take the wolves out of a food web, rot a log into soil, send a raindrop round the water cycle, and help a beaver build a pond full of life.",
  alternates: { canonical: "/learn/ecology" },
};

export default function EcologyPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 sm:py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            '{"@context":"https://schema.org","@graph":[{"@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://guidetooutside.com/"},{"@type":"ListItem","position":2,"name":"For Kids","item":"https://guidetooutside.com/learn"},{"@type":"ListItem","position":3,"name":"What\'s an ecosystem?","item":"https://guidetooutside.com/learn/ecology"}]},{"@type":"Article","headline":"What\'s an ecosystem? A hands-on guide to ecology for kids","description":"Six big ideas of ecology, each one to play with.","mainEntityOfPage":"https://guidetooutside.com/learn/ecology","articleSection":"For Kids","publisher":{"@id":"https://guidetooutside.com/#organization"},"isAccessibleForFree":true}]}',
        }}
      />
      <div className="max-w-3xl">
        <LandSkyEyebrow>What’s an ecosystem?</LandSkyEyebrow>
        <h1 className="font-display mt-2 text-4xl sm:text-5xl font-semibold tracking-tight">Everything out there is connected</h1>
        <p className="mt-4 text-lg leading-relaxed text-ink-2">
          Ecology is the study of how living things fit together with each other and with the sun, the water and the ground. It sounds big, but it is
          six ideas a four-year-old can hold — and each one below is something to play with first, then go and find outside.
        </p>
      </div>
      <div className="mt-6">
        <LandSkyNav current="ecology" />
      </div>
      <section className="mt-10">
        <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">Six big ideas</h2>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <Tile art="water" title="1. What is an ecosystem?" note="Living things and non-living things, working together" href="#ecosystem" />
          <Tile art="sun" title="2. Food chains" note="All the energy starts with the sun" href="#chain" />
          <Tile art="bird" title="3. Food webs, and taking one away" note="Everything is connected" href="#web" />
          <Tile art="mushroom" title="4. Decomposers: turning old things into soil" note="Nothing is wasted" href="#decomposers" />
          <Tile art="cloud" title="5. The water cycle" note="The same water goes round and round" href="#water" />
          <Tile art="stick" title="6. The beaver: a keystone species" note="One animal can build a home for hundreds" href="#keystone" />
        </div>
      </section>
      <div className="mt-12 grid gap-16">
        <section aria-labelledby="ecosystem-h" className="grid gap-6">
          <div className="max-w-3xl">
            <p className="eyebrow text-moss">
              {"Big idea "}
              {1}
            </p>
            <h2 id="ecosystem-h" className="font-display mt-1 text-3xl font-semibold tracking-tight sm:text-4xl">
              Living things and non-living things, working together
            </h2>
          </div>
          <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
            <section id="ecosystem" className="card scroll-mt-24 p-4 sm:p-6">
              <div className="flex items-center gap-3">
                <ActivityArt art="water" className="h-12 w-12 shrink-0 sm:h-14 sm:w-14" />
                <div className="min-w-0">
                  <p className="eyebrow text-moss">Try it</p>
                  <h2 className="font-display text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">What is an ecosystem?</h2>
                </div>
              </div>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-ink-2">
                Tap each thing at the pond, then tap Living or Not living. When everything is sorted, see how they all connect.
              </p>
              <div className="mt-4">
                <LivingSort />
              </div>
            </section>
            <div className="grid gap-4">
              <div className="card p-5">
                <p className="eyebrow">For the grown-up</p>
                <p className="mt-2 text-sm leading-relaxed text-ink-2">
                  An ecosystem is a place and everything in it — the living things (plants, animals, fungi, the tiniest bacteria) and the non-living
                  things they need (sunlight, water, air, rock and soil) — all working together. A pond is one; so is a forest, a meadow, or the
                  underside of a log. The test a four-year-old can use for &apos;living&apos; is the one scientists start with too: does it eat (or make its own
                  food), grow, and have babies?
                </p>
              </div>
              <div className="card p-5">
                <p className="eyebrow">Words to know</p>
                <dl className="mt-2 grid gap-2">
                  <div>
                    <dt className="font-display text-lg font-semibold leading-tight text-moss">ecosystem</dt>
                    <dd className="text-sm text-ink-2">a place and all its living and non-living things, working together</dd>
                  </div>
                  <div>
                    <dt className="font-display text-lg font-semibold leading-tight text-moss">living</dt>
                    <dd className="text-sm text-ink-2">it eats or makes food, it grows, it has young</dd>
                  </div>
                  <div>
                    <dt className="font-display text-lg font-semibold leading-tight text-moss">habitat</dt>
                    <dd className="text-sm text-ink-2">the home an animal needs: food, water, shelter and space</dd>
                  </div>
                </dl>
              </div>
              <ReadTogether isbn="9781338243314" />
              <ReadTogether isbn="9781452136462" />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:max-w-[calc(61.5%-12px)]">
            <VideoCard video={KID_VIDEOS.find((v) => v.id === "iK-kl97xoqI")!} />
          </div>
        </section>
        <section aria-labelledby="chain-h" className="grid gap-6">
          <div className="max-w-3xl">
            <p className="eyebrow text-moss">
              {"Big idea "}
              {2}
            </p>
            <h2 id="chain-h" className="font-display mt-1 text-3xl font-semibold tracking-tight sm:text-4xl">
              All the energy starts with the sun
            </h2>
          </div>
          <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
            <section id="chain" className="card scroll-mt-24 p-4 sm:p-6">
              <div className="flex items-center gap-3">
                <ActivityArt art="sun" className="h-12 w-12 shrink-0 sm:h-14 sm:w-14" />
                <div className="min-w-0">
                  <p className="eyebrow text-moss">Try it</p>
                  <h2 className="font-display text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">Food chains</h2>
                </div>
              </div>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-ink-2">
                Pick a meadow, a pond or a forest. Start with the sun, then tap who eats what, in order.
              </p>
              <div className="mt-4">
                <FoodChain />
              </div>
            </section>
            <div className="grid gap-4">
              <div className="card p-5">
                <p className="eyebrow">For the grown-up</p>
                <p className="mt-2 text-sm leading-relaxed text-ink-2">
                  Plants and algae (and some bacteria) make food out of sunlight, air and water — they are the producers. Everything else is a
                  consumer: a grasshopper eats the grass, a snake eats the grasshopper, a hawk eats the snake. The arrows in a food chain point from
                  the eaten to the eater, because they show where the energy goes. At each step most of the energy is used up for living, which is why
                  there are always fewer hawks than grasshoppers.
                </p>
              </div>
              <div className="card p-5">
                <p className="eyebrow">Words to know</p>
                <dl className="mt-2 grid gap-2">
                  <div>
                    <dt className="font-display text-lg font-semibold leading-tight text-moss">producer</dt>
                    <dd className="text-sm text-ink-2">a plant: it makes its own food from sunlight</dd>
                  </div>
                  <div>
                    <dt className="font-display text-lg font-semibold leading-tight text-moss">consumer</dt>
                    <dd className="text-sm text-ink-2">an animal: it eats other living things</dd>
                  </div>
                  <div>
                    <dt className="font-display text-lg font-semibold leading-tight text-moss">predator / prey</dt>
                    <dd className="text-sm text-ink-2">the hunter, and the one it hunts</dd>
                  </div>
                </dl>
              </div>
              <ReadTogether isbn="9780761451150" />
              <ReadTogether isbn="9781553651635" />
            </div>
          </div>
        </section>
        <section aria-labelledby="web-h" className="grid gap-6">
          <div className="max-w-3xl">
            <p className="eyebrow text-moss">
              {"Big idea "}
              {3}
            </p>
            <h2 id="web-h" className="font-display mt-1 text-3xl font-semibold tracking-tight sm:text-4xl">
              Everything is connected
            </h2>
          </div>
          <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
            <section id="web" className="card scroll-mt-24 p-4 sm:p-6">
              <div className="flex items-center gap-3">
                <ActivityArt art="bird" className="h-12 w-12 shrink-0 sm:h-14 sm:w-14" />
                <div className="min-w-0">
                  <p className="eyebrow text-moss">Try it</p>
                  <h2 className="font-display text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">Food webs, and taking one away</h2>
                </div>
              </div>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-ink-2">
                Tap an animal to see what it eats and what eats it. Then take the wolves away — or the mice — and watch what happens to everyone else.
              </p>
              <div className="mt-4">
                <FoodWeb />
              </div>
            </section>
            <div className="grid gap-4">
              <div className="card p-5">
                <p className="eyebrow">For the grown-up</p>
                <p className="mt-2 text-sm leading-relaxed text-ink-2">
                  Real animals eat more than one thing, so food chains cross and join into a food web. That is why taking one kind away changes the
                  others. When wolves were brought back to places like Yellowstone, the elk (a big kind of deer) had to keep moving, and in some
                  places young trees along the rivers began to grow again. The story is simpler here than in real life, but the idea is exactly right:
                  a web is only as strong as its threads.
                </p>
              </div>
              <div className="card p-5">
                <p className="eyebrow">Words to know</p>
                <dl className="mt-2 grid gap-2">
                  <div>
                    <dt className="font-display text-lg font-semibold leading-tight text-moss">food web</dt>
                    <dd className="text-sm text-ink-2">all the food chains in a place, joined together</dd>
                  </div>
                  <div>
                    <dt className="font-display text-lg font-semibold leading-tight text-moss">balance</dt>
                    <dd className="text-sm text-ink-2">enough of each kind, not too many and not too few</dd>
                  </div>
                </dl>
              </div>
              <ReadTogether isbn="9780761451150" />
            </div>
          </div>
        </section>
        <section aria-labelledby="decomposers-h" className="grid gap-6">
          <div className="max-w-3xl">
            <p className="eyebrow text-moss">
              {"Big idea "}
              {4}
            </p>
            <h2 id="decomposers-h" className="font-display mt-1 text-3xl font-semibold tracking-tight sm:text-4xl">
              Nothing is wasted
            </h2>
          </div>
          <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
            <section id="decomposers" className="card scroll-mt-24 p-4 sm:p-6">
              <div className="flex items-center gap-3">
                <ActivityArt art="mushroom" className="h-12 w-12 shrink-0 sm:h-14 sm:w-14" />
                <div className="min-w-0">
                  <p className="eyebrow text-moss">Try it</p>
                  <h2 className="font-display text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">
                    Decomposers: turning old things into soil
                  </h2>
                </div>
              </div>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-ink-2">
                Slide time forward — or hold to speed it up — and watch a fallen log turn back into soil, and something new grow out of it.
              </p>
              <div className="mt-4">
                <Decomposers />
              </div>
            </section>
            <div className="grid gap-4">
              <div className="card p-5">
                <p className="eyebrow">For the grown-up</p>
                <p className="mt-2 text-sm leading-relaxed text-ink-2">
                  When a tree falls, the forest&apos;s recyclers move in: bark beetles, fungi, carpenter ants, millipedes, woodlice, worms and bacteria far
                  too small to see. Bit by bit they eat the wood and turn it back into soil, full of the food new plants need. In a northern forest a
                  big log can take decades to disappear, and seedlings often sprout right on top of it — foresters call it a nurse log. (Around here
                  yellow birch and hemlock are the famous ones.)
                </p>
              </div>
              <div className="card p-5">
                <p className="eyebrow">Words to know</p>
                <dl className="mt-2 grid gap-2">
                  <div>
                    <dt className="font-display text-lg font-semibold leading-tight text-moss">decomposer</dt>
                    <dd className="text-sm text-ink-2">a living thing that breaks down dead things into soil</dd>
                  </div>
                  <div>
                    <dt className="font-display text-lg font-semibold leading-tight text-moss">fungus</dt>
                    <dd className="text-sm text-ink-2">a mushroom&apos;s family: not a plant, and a great recycler</dd>
                  </div>
                  <div>
                    <dt className="font-display text-lg font-semibold leading-tight text-moss">nurse log</dt>
                    <dd className="text-sm text-ink-2">a rotting log that new trees grow out of</dd>
                  </div>
                </dl>
              </div>
              <ReadTogether isbn="9780064451994" />
            </div>
          </div>
        </section>
        <section aria-labelledby="water-h" className="grid gap-6">
          <div className="max-w-3xl">
            <p className="eyebrow text-moss">
              {"Big idea "}
              {5}
            </p>
            <h2 id="water-h" className="font-display mt-1 text-3xl font-semibold tracking-tight sm:text-4xl">
              The same water goes round and round
            </h2>
          </div>
          <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
            <section id="water" className="card scroll-mt-24 p-4 sm:p-6">
              <div className="flex items-center gap-3">
                <ActivityArt art="cloud" className="h-12 w-12 shrink-0 sm:h-14 sm:w-14" />
                <div className="min-w-0">
                  <p className="eyebrow text-moss">Try it</p>
                  <h2 className="font-display text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">The water cycle</h2>
                </div>
              </div>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-ink-2">
                Drag the sun up to warm the lake, then blow the cloud over the mountain, and follow one drop all the way round.
              </p>
              <div className="mt-4">
                <WaterCycle />
              </div>
            </section>
            <div className="grid gap-4">
              <div className="card p-5">
                <p className="eyebrow">For the grown-up</p>
                <p className="mt-2 text-sm leading-relaxed text-ink-2">
                  The sun warms the lake and the leaves, and water rises as invisible vapour (evaporation — plants breathe water out too). High up
                  where it is cold the vapour gathers into clouds (condensation). When the drops get heavy they fall as rain or snow (precipitation),
                  and run downhill in streams or soak into the ground (collection), back to the lake and the sea. No new water is ever made: the water
                  in your glass has been round this loop many, many times.
                </p>
              </div>
              <div className="card p-5">
                <p className="eyebrow">Words to know</p>
                <dl className="mt-2 grid gap-2">
                  <div>
                    <dt className="font-display text-lg font-semibold leading-tight text-moss">evaporation</dt>
                    <dd className="text-sm text-ink-2">water warming up and rising into the air</dd>
                  </div>
                  <div>
                    <dt className="font-display text-lg font-semibold leading-tight text-moss">condensation</dt>
                    <dd className="text-sm text-ink-2">water vapour cooling into cloud drops</dd>
                  </div>
                  <div>
                    <dt className="font-display text-lg font-semibold leading-tight text-moss">precipitation</dt>
                    <dd className="text-sm text-ink-2">rain, snow or hail falling from a cloud</dd>
                  </div>
                </dl>
              </div>
              <ReadTogether isbn="9780152163723" />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:max-w-[calc(61.5%-12px)]">
            <VideoCard video={KID_VIDEOS.find((v) => v.id === "LjqtfzeQ0nI")!} />
          </div>
        </section>
        <section aria-labelledby="keystone-h" className="grid gap-6">
          <div className="max-w-3xl">
            <p className="eyebrow text-moss">
              {"Big idea "}
              {6}
            </p>
            <h2 id="keystone-h" className="font-display mt-1 text-3xl font-semibold tracking-tight sm:text-4xl">
              One animal can build a home for hundreds
            </h2>
          </div>
          <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
            <section id="keystone" className="card scroll-mt-24 p-4 sm:p-6">
              <div className="flex items-center gap-3">
                <ActivityArt art="stick" className="h-12 w-12 shrink-0 sm:h-14 sm:w-14" />
                <div className="min-w-0">
                  <p className="eyebrow text-moss">Try it</p>
                  <h2 className="font-display text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">The beaver: a keystone species</h2>
                </div>
              </div>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-ink-2">
                Tap the beaver to add sticks to the dam, and watch the stream become a pond — and who moves in.
              </p>
              <div className="mt-4">
                <BeaverPond />
              </div>
            </section>
            <div className="grid gap-4">
              <div className="card p-5">
                <p className="eyebrow">For the grown-up</p>
                <p className="mt-2 text-sm leading-relaxed text-ink-2">
                  A keystone is the stone at the top of an arch that holds the others up; a keystone species is an animal that holds an ecosystem
                  together. A beaver&apos;s dam turns a narrow stream into a pond and a wetland, and in come frogs, ducks, herons, dragonflies, muskrats,
                  moose, otters and fish that could never live in the stream. Take the beaver away and the pond drains, and they leave again.
                </p>
              </div>
              <div className="card p-5">
                <p className="eyebrow">Words to know</p>
                <dl className="mt-2 grid gap-2">
                  <div>
                    <dt className="font-display text-lg font-semibold leading-tight text-moss">keystone species</dt>
                    <dd className="text-sm text-ink-2">an animal the whole place depends on</dd>
                  </div>
                  <div>
                    <dt className="font-display text-lg font-semibold leading-tight text-moss">wetland</dt>
                    <dd className="text-sm text-ink-2">land that is wet much of the time: marsh, swamp, pond edge</dd>
                  </div>
                  <div>
                    <dt className="font-display text-lg font-semibold leading-tight text-moss">biodiversity</dt>
                    <dd className="text-sm text-ink-2">how many different kinds of living things live in a place</dd>
                  </div>
                </dl>
              </div>
              <ReadTogether isbn="9780385386524" />
              <ReadTogether isbn="9781590782538" />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:max-w-[calc(61.5%-12px)]">
            <VideoCard video={KID_VIDEOS.find((v) => v.id === "2eVc8VjKWaE")!} />
          </div>
        </section>
      </div>
      {/* Learning ecology by doing it: the page's conservation story (the counts and the clubs), or the plain panel. */}
      <div className="mt-16">
        <StoryBlock
          path="/learn/ecology"
          fallback={
            <NearbyOrgs id="who-looks-after" topic={["youth", "birds", "wildlife"]} headingNear="Where young naturalists can join in near {town}">
              <OrgsAnywhere id="who-looks-after" topic={["youth", "birds", "wildlife"]} heading="Where young naturalists can join in" />
            </NearbyOrgs>
          }
        />
      </div>
      <p className="mt-8 max-w-3xl text-xs text-ink-2">
        {
          "The pictures are simple on purpose: real food webs have far more threads, and real numbers go up and down for many reasons at once. Every animal and plant in them lives in Canada or the northern United States. The books were each checked against their library record; the videos play from YouTube’s privacy-enhanced player only when tapped."
        }{" "}
        <Link href="/learn" className="text-moss underline hover:no-underline">
          Back to For Kids
        </Link>
      </p>
    </div>
  );
}

/** A picture book to read together after the section. */
function ReadTogether({ isbn }: { isbn: string }) {
  const b = BOOKS.find((x) => x.isbn === isbn)!;
  return (
    <div className="card flex gap-4 p-4">
      <Image
        src={`/books/${b.isbn}.webp`}
        alt=""
        width={72}
        height={100}
        className="h-[100px] w-[72px] shrink-0 rounded-md object-cover"
      />
      <div className="min-w-0">
        <p className="eyebrow">Read together · ages {b.ages}</p>
        <p className="font-display mt-0.5 text-lg font-semibold leading-tight">{b.title}</p>
        <p className="text-xs text-ink-2">{b.author}</p>
        <p className="mt-1 text-sm leading-snug text-ink-2">{b.blurb}</p>
      </div>
    </div>
  );
}
