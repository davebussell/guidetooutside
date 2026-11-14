import Link from "next/link";
import { LocationSearch } from "@/components/LocationSearch";

/** A page inside the site that does not exist (a species, crop or zone that isn't in the guide). */
export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 py-20 text-center">
      <h1 className="font-display text-3xl font-semibold">Page not found</h1>
      <p className="mt-3 text-ink-2">Search for a town or postal code.</p>
      <div className="mt-6">
        <LocationSearch />
      </div>
      <p className="mt-6 text-sm">
        <Link href="/" className="underline">
          Home page
        </Link>
      </p>
    </div>
  );
}
