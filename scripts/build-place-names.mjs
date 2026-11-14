// Writes src/data/place-names.json: { slug: label } for every SERVED town in place-normals.json.
// The loading screens are client components and must not pull the whole climate table into the
// browser just to name the town. A parked town (src/lib/scope.ts) is left out, so its address shows
// no town name while it loads and then "Location not found". scripts/check-day.ts fails if this file
// and the served towns drift apart.
import { readFileSync, writeFileSync } from "node:fs";
const scope = readFileSync(new URL("../src/lib/scope.ts", import.meta.url), "utf8");
const served = JSON.parse(/SERVED_COUNTRIES: readonly string\[\] = (\[[^\]]*\])/.exec(scope)[1]);
const normals = JSON.parse(readFileSync(new URL("../src/data/place-normals.json", import.meta.url)));
const names = Object.fromEntries(normals.filter((n) => served.includes(n.place.countryCode)).map((n) => [n.place.slug, n.place.label]));
writeFileSync(new URL("../src/data/place-names.json", import.meta.url), JSON.stringify(names) + "\n");
console.log(`place-names.json: ${Object.keys(names).length} towns (served: ${served.join(", ")})`);
