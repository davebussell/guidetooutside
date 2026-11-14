/**
 * The town table less the parked countries (src/lib/scope.ts): what every list, search, nearest-town lookup and
 * scheduled job reads. Import this in place of ./known-places.json; only the build checks and the data-building
 * scripts read the whole table.
 */
import ALL from "./known-places.json";
import { countryServed } from "./scope";

const SERVED = (ALL as { countryCode: string }[]).filter((p) => countryServed(p.countryCode));

export default SERVED as typeof ALL;
