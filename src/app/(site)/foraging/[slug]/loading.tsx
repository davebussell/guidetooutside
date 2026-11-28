import { PlaceSkeleton } from "@/components/PlaceSkeleton";
import { LoaderUnlessSlug } from "@/components/LoaderUnlessSlug";
import { ALL_SPECIES } from "@/lib/species";

const SPECIES_SLUGS = ALL_SPECIES.map((s) => s.slug);

export default function Loading() {
  return (
    <LoaderUnlessSlug skip={SPECIES_SLUGS}>
      <PlaceSkeleton topic="foraging" />
    </LoaderUnlessSlug>
  );
}
