"use client";
/**
 * The food band for the reader's own town on a page rendered once for
 * everyone (the landings, the gardening reference pages, Learn, the fish
 * pages): the server draws the no-place band (passed as children); once the
 * browser knows the remembered place (RememberPlace's `gto:place` entry, or
 * the `gto_place` cookie) it asks /conservation/food.json and draws the
 * town's band in the same frame. Nothing changes when no place is
 * remembered, the request fails or the town has nothing to show.
 */
import { useEffect, useState } from "react";
import { usePlace } from "@/lib/hooks";
import type { FoodBandData } from "@/lib/conservation/food";
import { foodUrl, type FoodQuery } from "@/lib/conservation/food-near";
import type { NearPlace } from "@/lib/conservation/near";
import { cookiePlace } from "@/lib/conservation/visitor-client";
import { FoodBandView, FoodLibraryLink } from "./FoodBandView";

export function NearbyFood({ query, className, children }: { query: FoodQuery; className?: string; children?: React.ReactNode }) {
  const stored = usePlace() as NearPlace | null;
  const [data, setData] = useState<FoodBandData | null>(null);
  const key = JSON.stringify([stored?.slug, query]);

  useEffect(() => {
    const place = stored?.slug ? stored : cookiePlace();
    if (!place?.slug || !Number.isFinite(place.lat) || !Number.isFinite(place.lon)) return;
    const ac = new AbortController();
    fetch(foodUrl(place, query), { signal: ac.signal })
      .then((r) => (r.ok ? (r.json() as Promise<{ band: FoodBandData | null }>) : null))
      .then((a) => a?.band && setData(a.band))
      .catch(() => {});
    return () => ac.abort();
    // `key` stands for the place and the query.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  if (!data) return <>{children}</>;
  return <FoodBandView data={data} className={className} footer={<FoodLibraryLink countryCode={data.place?.countryCode} />} />;
}
