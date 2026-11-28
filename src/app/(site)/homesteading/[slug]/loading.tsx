import { PlaceSkeleton } from "@/components/PlaceSkeleton";
import { LoaderUnlessSlug } from "@/components/LoaderUnlessSlug";
import { TOPICS } from "@/data/homestead/topics";

const TOPIC_SLUGS = TOPICS.map((t) => t.slug);

export default function Loading() {
  return (
    <LoaderUnlessSlug skip={TOPIC_SLUGS}>
      <PlaceSkeleton topic="homesteading" />
    </LoaderUnlessSlug>
  );
}
