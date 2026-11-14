/** JSON-LD for the Learn, games and kids pages: a breadcrumb trail and the page's own entity, in one graph. */
import { SITE } from "@/lib/site";

export function breadcrumbLd(trail: [name: string, path: string][]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: trail.map(([name, path], i) => ({ "@type": "ListItem", position: i + 1, name, item: `${SITE.url}${path}` })),
  };
}

export function jsonLd(graph: object[]): string {
  return JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(/</g, "\\u003c");
}
