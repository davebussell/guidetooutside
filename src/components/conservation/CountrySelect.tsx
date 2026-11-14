"use client";
/**
 * The hub's country filter: a plain GET form (it works without script, with
 * its button), which also submits itself as soon as a country is chosen.
 */
import { useRouter } from "next/navigation";

export type CountryOption = { code: string; label: string; count: number };
export type CountryGroup = { label: string; options: CountryOption[] };

export function CountrySelect({ groups, value, topic, role }: { groups: CountryGroup[]; value?: string; topic?: string; role?: string }) {
  const router = useRouter();
  const go = (country: string) => {
    const q = new URLSearchParams();
    if (topic) q.set("topic", topic);
    if (role) q.set("role", role);
    if (country) q.set("country", country);
    const qs = q.toString();
    router.push(`/conservation${qs ? `?${qs}` : ""}#library`, { scroll: false });
  };
  return (
    <form action="/conservation#library" method="get" className="flex flex-wrap items-center gap-2" onSubmit={(e) => {
        e.preventDefault();
        go(String(new FormData(e.currentTarget).get("country") ?? ""));
      }}
    >
      {topic && <input type="hidden" name="topic" value={topic} />}
      {role && <input type="hidden" name="role" value={role} />}
      <label htmlFor="hub-country" className="text-sm text-ink-2">
        Country
      </label>
      <select
        id="hub-country"
        name="country"
        defaultValue={value ?? ""}
        onChange={(e) => go(e.target.value)}
        className="h-10 min-w-0 max-w-full rounded-full border border-edge bg-surface px-4 text-sm focus:border-moss focus:outline-none focus:ring-2 focus:ring-moss/25"
      >
        <option value="">Every country</option>
        {groups.map((g) => (
          <optgroup key={g.label} label={g.label}>
            {g.options.map((o) => (
              <option key={o.code} value={o.code}>
                {o.label} ({o.count})
              </option>
            ))}
          </optgroup>
        ))}
      </select>
      <noscript>
        <button type="submit" className="h-10 rounded-full border border-edge bg-surface px-4 text-sm hover:border-moss">
          Show
        </button>
      </noscript>
    </form>
  );
}
