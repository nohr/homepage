import Link from "next/link";
import Play from "./play-icon";
import ScrollLink from "./scroll-link";
import { Suspense } from "react";

export default function Nav() {
  return (
    <nav className="grid !text-white fixed z-40 p-4 top-0 left-0 gap-4 w-full mix-blend-exclusion dark:mix-blend-difference grid-cols-12 items-start *:w-fit">
      <Suspense>
        {/* Home */}
        <ScrollLink href="/" scrollTo={0} className="col-span-2 cursor-pointer">
          aitenoria aigbe
        </ScrollLink>
        {/* Tags */}
        <div className="flex flex-col col-start-5 col-span-2 *:w-fit *:cursor-pointer">
          <ScrollLink href="work" scrollTo="#work">
            Selected Works
          </ScrollLink>
          <ScrollLink
            params={{ name: "t", value: "graphics" }}
            href="work"
            scrollTo="#work"
          >
            Graphics
          </ScrollLink>
          <ScrollLink
            params={{ name: "t", value: "websites" }}
            href="work"
            scrollTo="#work"
          >
            Websites
          </ScrollLink>
          <ScrollLink
            params={{ name: "t", value: "interactive" }}
            href="work"
            scrollTo="#work"
          >
            Interactive
          </ScrollLink>
        </div>
        {/* Links */}
        <ScrollLink className="col-start-9" href="/about" scrollTo="#about">
          ABOUT
        </ScrollLink>
        <Link className="col-start-10" href="/shop">
          SHOP
        </Link>
        <Play />
        {process.env.NODE_ENV === "development" ? (
          <Link
            className="col-start-12 text-red-600 cursor-pointer"
            href="/studio"
          >
            STUDIO
          </Link>
        ) : null}
      </Suspense>
    </nav>
  );
}
