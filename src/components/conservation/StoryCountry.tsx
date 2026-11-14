"use client";
/**
 * The two parts of a story that depend on where the reader is, on pages that
 * are rendered once for everyone (static): the steps filtered to the reader's
 * country (and the untagged ones), and the whole story for a story told for
 * certain countries, which gives way to the page's plain panel for a reader
 * known to be elsewhere. Until the country is known everything shows, as the
 * server rendered it.
 */
import { useVisitorCountry } from "@/lib/conservation/visitor-client";
import { StepsBlock, type StepData } from "./StorySteps";

export function CountrySteps({ steps, id }: { steps: StepData[]; id: string }) {
  return <StepsBlock steps={steps} country={useVisitorCountry()} id={id} />;
}

export function CountryGate({ countries, fallback, children }: { countries: string[]; fallback?: React.ReactNode; children: React.ReactNode }) {
  const cc = useVisitorCountry();
  if (cc && !countries.includes(cc)) return <>{fallback ?? null}</>;
  return <>{children}</>;
}
