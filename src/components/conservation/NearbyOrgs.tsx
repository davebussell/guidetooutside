"use client";
/**
 * The visitor's own organisations on a static page. The server renders the
 * no-place panel (`OrgsAnywhere`, passed as children); once the browser knows
 * the remembered place (RememberPlace's `gto:place` entry, or the `gto_place`
 * cookie it also writes), this asks `/conservation/near.json` and draws the
 * matches in the same frame, with the invitation the answer features. Nothing
 * changes when no place is remembered or the request fails.
 */
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePlace } from "@/lib/hooks";
import { nearUrl, type NearAnswer, type NearPlace } from "@/lib/conservation/near";
import { cookiePlace } from "@/lib/conservation/visitor-client";
import { DISCLOSURE, OrgsPanel, RegionLink } from "./OrgsPanel";

const fill = (s: string, town: string) => s.replace(/\{town\}/g, town);

export function NearbyOrgs({
  topic,
  species,
  limit = 3,
  headingNear,
  lede,
  ecoGuideLede = false,
  id,
  children,
}: {
  topic: string[];
  species?: string[];
  limit?: number;
  /** "Who looks after the pollinators near {town}". */
  headingNear: string;
  /** With "{town}"; the default names the town and carries the disclosure. */
  lede?: string;
  /** Lead with the ecoregional pollinator planting guide when the library has one for the visitor's region. */
  ecoGuideLede?: boolean;
  id?: string;
  children: React.ReactNode;
}) {
  const stored = usePlace() as NearPlace | null;
  const [answer, setAnswer] = useState<NearAnswer | null>(null);
  const key = JSON.stringify([stored?.slug, topic, species, limit]);

  useEffect(() => {
    const place = stored?.slug ? stored : cookiePlace();
    if (!place?.slug || !Number.isFinite(place.lat) || !Number.isFinite(place.lon)) return;
    const ac = new AbortController();
    fetch(nearUrl(place, { topic, species, limit }), { signal: ac.signal })
      .then((r) => (r.ok ? (r.json() as Promise<NearAnswer>) : null))
      .then((a) => a && setAnswer(a))
      .catch(() => {});
    return () => ac.abort();
    // `key` stands for the place and the options.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  if (!answer || !answer.matches.length) return <>{children}</>;
  const town = answer.place.name;
  const guide = ecoGuideLede ? answer.ecoGuide : null;
  return (
    <OrgsPanel
      id={id}
      heading={fill(headingNear, town)}
      lede={
        guide ? (
          <>
            <Link href={`/conservation/${guide.slug}`} className="font-medium text-moss underline-offset-2 hover:underline">
              {guide.name}
            </Link>{" "}
            publishes an ecoregional planting guide for your part of the {guide.region}: the native plants that feed bees and butterflies where you live. {DISCLOSURE}
          </>
        ) : lede ? (
          fill(lede, town)
        ) : (
          `The organisations working on this near ${town}, closest first. ${DISCLOSURE}`
        )
      }
      matches={answer.matches.map((m) => ({ org: m.org, why: m.why }))}
      feature={answer.feature ?? null}
      footer={<RegionLink countryCode={answer.place.countryCode} />}
    />
  );
}
