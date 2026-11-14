/**
 * The food band for a section ("Grow, share and eat well"): see
 * src/lib/conservation/food.ts for what it holds and ./FoodBandView for how
 * it is drawn. With a place, the band for that town, or nothing when the
 * library has nothing for it. With none, the national and international
 * bodies for the section's roles and a town search; `nearby` lets the
 * browser redraw it for the reader's remembered town (static pages).
 */
import { LocationSearch } from "@/components/LocationSearch";
import type { FoodRole } from "@/data/conservation";
import { foodBand, type FoodBandData, type FoodOptions, type FoodSection } from "@/lib/conservation/food";
import type { MatchPlace } from "@/lib/conservation/match";
import { FoodBandView, FoodLibraryLink } from "./FoodBandView";
import { NearbyFood } from "./NearbyFood";

export type FoodPanelProps = Omit<FoodOptions, "fish"> & {
  place: (MatchPlace & { name?: string }) | null;
  /** A fish page: the creature's slug, name and water ("salt", "fresh", "both"). */
  fish?: { slug: string; name: string; water?: string };
  /** Static pages: redraw for the reader's remembered town in the browser. */
  nearby?: boolean;
  /** Precomputed band (a page that needed its organisations first). */
  data?: FoodBandData | null;
  className?: string;
};

/** The town search's label, in the section's words. */
const SEARCH_LABEL: Record<FoodSection, string> = {
  gardening: "Enter your town for the gardens and groups near you",
  seeds: "Enter your town for the seed libraries and gardens near you",
  kitchen: "Enter your town for the markets and food groups near you",
  foraging: "Enter your town for the codes and groups near you",
  fishing: "Enter your town for the seafood guide for your country",
  homesteading: "Enter your town for the farms and food groups near you",
  learn: "Enter your town for the gardens and farms near you",
  resources: "Enter your town for the gardens and groups near you",
};

export async function FoodPanel({ place, nearby = false, data, className = "", ...opts }: FoodPanelProps) {
  const band = data !== undefined ? data : await foodBand(place, opts);
  if (place) return band ? <FoodBandView data={band} className={className} footer={<FoodLibraryLink countryCode={place.countryCode} />} /> : null;
  const view = band ? (
    <FoodBandView data={band} className={className} footer={<FoodLibraryLink />}>
      <div className="mt-5 max-w-xl">
        <p className="text-sm font-medium">{SEARCH_LABEL[opts.section]}</p>
        <div className="mt-2">
          <LocationSearch />
        </div>
      </div>
    </FoodBandView>
  ) : null;
  if (!nearby) return view;
  const roles: FoodRole[] | undefined = opts.roles;
  return (
    <NearbyFood query={{ section: opts.section, roles, gardens: opts.gardens, fish: opts.fish?.slug, fruit: opts.fruit, compact: opts.compact }} className={className}>
      {view}
    </NearbyFood>
  );
}
