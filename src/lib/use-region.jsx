"use client";
/**
 * The reader's region context on the client, from the remembered place
 * (src/lib/hooks usePlace reads the `gto:place` entry RememberPlace writes).
 * The server snapshot is the neutral context, so a page renders neutral words
 * ("Town or postal code") and switches to the reader's own after hydration
 * without a mismatch.
 */
import { useMemo } from "react";
import { usePlace } from "@/lib/hooks";
import { regionContext } from "@/lib/region-context";

/** @returns {import("@/lib/region-context").RegionContext} */
export function useRegion() {
  const place = usePlace();
  return useMemo(() => regionContext(place), [place]);
}
