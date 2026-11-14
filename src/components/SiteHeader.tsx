import Link from "next/link";
import { Logo } from "./Logo";
import { AlmanacBar } from "./AlmanacBar";
import { MegaMenu } from "./MegaMenu";
import { LocationChip } from "./LocationChip";
import { MobileMenu } from "./MobileMenu";

export function SiteHeader() {
  return (
    <header className="gto-solid border-b border-line/70 bg-white backdrop-blur sticky top-0 z-30">
      <div className="mx-auto max-w-6xl 2xl:max-w-[88rem] px-4 sm:px-6 h-20 flex items-center gap-3 sm:gap-4">
        <Link href="/" className="flex items-center shrink-0" title="Guide to Outside — home">
          <Logo />
        </Link>
        <div className="hidden 2xl:block shrink min-w-0">
          <AlmanacBar />
        </div>
        <div className="ml-auto flex items-center self-stretch gap-2 lg:gap-3 min-w-0">
          <MegaMenu />
          <div className="hidden lg:block">
            <LocationChip />
          </div>
          <div className="flex items-center gap-2 lg:hidden">
            <LocationChip compact />
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  );
}
