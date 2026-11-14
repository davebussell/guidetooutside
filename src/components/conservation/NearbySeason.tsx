"use client";
/**
 * The season band for the visitor's own town on a page rendered once for
 * everyone (the homepage, the section landings): the server draws the band
 * for no place (passed as children); once the browser knows the remembered
 * place it asks /conservation/near.json for that town's invitations and
 * redraws the same frame. Nothing changes when no place is remembered, the
 * request fails or the town has nothing open.
 */
import { useEffect, useState } from "react";
import { usePlace } from "@/lib/hooks";
import type { FeatureInvitation } from "@/lib/conservation/invitations";
import { nearUrl, type NearPlace } from "@/lib/conservation/near";
import { cookiePlace } from "@/lib/conservation/visitor-client";
import { SeasonBandView } from "./SeasonBandView";

type Query = { topics?: string[]; fromHome?: boolean; family?: boolean; openOnly?: boolean };

export function NearbySeason({
  query,
  month,
  headingNear,
  lede,
  id,
  className,
  children,
}: {
  query: Query;
  month: string;
  headingNear: string;
  lede?: string;
  id: string;
  className?: string;
  children: React.ReactNode;
}) {
  const stored = usePlace() as NearPlace | null;
  const [answer, setAnswer] = useState<{ town: string; items: FeatureInvitation[] } | null>(null);
  const key = JSON.stringify([stored?.slug, query]);

  useEffect(() => {
    const place = stored?.slug ? stored : cookiePlace();
    if (!place?.slug || !Number.isFinite(place.lat) || !Number.isFinite(place.lon)) return;
    const q = new URLSearchParams({ invites: "3" });
    if (query.fromHome) q.set("fromHome", "1");
    if (query.family) q.set("family", "1");
    if (query.openOnly) q.set("openOnly", "1");
    const ac = new AbortController();
    fetch(`${nearUrl(place, { topic: query.topics, limit: 1 })}&${q.toString()}`, { signal: ac.signal })
      .then((r) => (r.ok ? (r.json() as Promise<{ place: { name: string }; invitations?: FeatureInvitation[] }>) : null))
      .then((a) => a?.invitations?.length && setAnswer({ town: a.place.name, items: a.invitations }))
      .catch(() => {});
    return () => ac.abort();
    // `key` stands for the place and the query.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  if (!answer) return <>{children}</>;
  return <SeasonBandView items={answer.items} month={month} heading={headingNear.replace(/\{town\}/g, answer.town)} lede={lede} id={id} className={className} />;
}
