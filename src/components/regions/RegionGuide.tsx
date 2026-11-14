/**
 * The regional guide proper, below a region page's opening: the region at a
 * glance, its towns compared, what they share and what differs, who looks
 * after it (the conservation library's organisations), the year across the
 * region, two places side by side, and the neighbours. All of it
 * is computed here on the server from the site's own records; the compare
 * widget and the table sort are the only client parts, and they get their
 * data as props.
 */
import { LocationSearch } from "@/components/LocationSearch";
import { anyLocalOrgs, compareOrgs, neighboursOf, regionOrgs, regionSeason, regionStats, sharedAndDiffering } from "@/lib/regions";
import { CompareTowns } from "./CompareTowns";
import { RegionGlance } from "./RegionGlance";
import { RegionNeighbours } from "./RegionNeighbours";
import { RegionOrgs } from "./RegionOrgs";
import { RegionShared } from "./RegionShared";
import { SeasonRibbon } from "./SeasonRibbon";
import { TownTable } from "./TownTable";
import { gardenCount } from "@/lib/conservation/gardens";

export function RegionGuide({ slug, name }: { slug: string; name: string }) {
  const stats = regionStats(slug);
  const season = regionSeason(slug);
  const shared = sharedAndDiffering(slug);
  const neighbours = neighboursOf(slug);
  const orgs = regionOrgs(slug);
  const withOrgs = anyLocalOrgs(orgs.towns);
  // The client parts get only what they read: the table the counts, the compare widget the bodies for its subjects.
  const orgCounts = Object.fromEntries(Object.entries(orgs.towns).map(([s, o]) => [s, { local: o.local, nearby: o.nearby }]));
  const towns = stats.towns;
  const few = towns.length <= 2;

  return (
    <div className="grid gap-16">
      <RegionGlance figures={stats.figures} towns={towns.length} regionName={name} />

      <section aria-labelledby="towns">
        <p className="eyebrow text-moss">The towns of the region</p>
        <h2 id="towns" className="font-display mt-1 text-3xl font-semibold tracking-tight sm:text-4xl">
          {towns.length ? `${towns.length} ${towns.length === 1 ? "town" : "towns"}, compared` : "No pre-built towns yet"}
        </h2>
        <p className="mt-2 max-w-3xl text-ink-2">
          {towns.length > 2
            ? "Every pre-built town the map puts in the region, coldest zone first. Sort by any column; each town's name opens its own guide, where these numbers are read from the same records."
            : towns.length
              ? `Only ${towns.length === 1 ? "one pre-built town falls" : "two pre-built towns fall"} in the region so far, so the table is short. Search your own town: it is classified into its region in the same way and its guide gives it the same numbers.`
              : "Search a town in the region and its guide gives these numbers for that spot; it is classified here by its coordinates in the same way."}
        </p>
        {towns.length > 0 && (
          <div className="mt-6">
            <TownTable towns={towns} regionName={name} orgs={orgCounts} gardens={Object.fromEntries(towns.map((t) => [t.slug, gardenCount(t.slug)]))} />
          </div>
        )}
        {few && (
          <div className="mt-6 max-w-2xl">
            <LocationSearch />
          </div>
        )}
      </section>

      <RegionShared data={shared} towns={towns} regionName={name} />

      <RegionOrgs data={orgs} towns={towns} regionName={name} />

      <SeasonRibbon season={season} regionName={name} />

      <section aria-labelledby="compare">
        <p className="eyebrow text-moss">Compare two places</p>
        <h2 id="compare" className="font-display mt-1 text-3xl font-semibold tracking-tight sm:text-4xl">
          Two towns, side by side
        </h2>
        <p className="mt-2 max-w-3xl text-ink-2">
          Pick any two of the region&rsquo;s pre-built towns. The lines that differ are set in bold; below them, what the libraries give one town and not the other by the
          zone and coast rules and the crop calendar{withOrgs ? "; and the local organisations each has in our library" : ""}. No data beyond this page is read.
        </p>
        <div className="mt-6">
          <CompareTowns towns={towns} lib={shared.library} regionName={name} orgs={compareOrgs(orgs.towns)} />
        </div>
      </section>

      <RegionNeighbours neighbours={neighbours} regionName={name} towns={towns.length} />
    </div>
  );
}
