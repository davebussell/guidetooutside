import Link from "next/link";
import { LocationSearch } from "@/components/LocationSearch";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

/** An address that matches no route at all: the root layout has no header, so this brings its own. */
export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
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
      </main>
      <SiteFooter />
    </>
  );
}
