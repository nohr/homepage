import Link from "next/link";
import ScrollLink from "./scroll-link";
import { Suspense } from "react";

export default function Nav() {
  return (
    <nav className="grid !text-white fixed z-40 p-4 top-0 left-0 gap-4 w-full mix-blend-exclusion dark:mix-blend-difference grid-cols-12 items-start *:w-fit">
      <Suspense>
        {/* Home */}
        <ScrollLink href="/" scrollTo={0} className="col-span-3 cursor-pointer">
          aitenoria aigbe
          <svg
            id="Layer_2"
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            viewBox="0 0 144.1 59.7"
            className="fill-current"
          >
            <path d="M141.8,28.8c.5-8,5.1-10.6-.2-19.7-8.2-13.8-33-9.5-45.2-3.3-11,5.5-23.6,18.6-25.4,32,0-3.9-.2-7.3,0-9,.5-8,5.1-10.6-.2-19.7C62.6-4.6,37.8-.3,25.6,5.8,11.5,12.9-5.5,32.6,1.7,49.3c6.1,14.1,29.9,11.5,41.5,5.9,5.9-2.8,8.9-7.6,14.5-9.9.3,3.6-1.2,9.6,1.9,12,2.1,1.7,9.2,2.2,10.8,0,.8-1.1.8-6.6.8-12.6.3,1.5.7,3.1,1.4,4.6,6.1,14.1,30,11.5,41.5,5.9,5.9-2.8,8.9-7.6,14.5-9.9.3,3.6-1.2,9.6,1.9,12,2.1,1.7,9.2,2.2,10.8,0s.3-23.5.6-28.5ZM50.4,29.8c.6,0,1.2.5,1.2,1.2s-.5,1.2-1.2,1.2-1.2-.5-1.2-1.2.5-1.2,1.2-1.2ZM38,48.7C3.5,57.5,11.4,12.8,39,8.6c3-.5,5.6-.5,7.8-.1-1.4.2-2.9.6-4.4,1.2-9.9,3.8-17.1,14.1-16,23.1s10.1,13.2,20,9.4c1.8-.7,3.4-1.6,5-2.6-3.4,4.3-8,7.7-13.4,9.1ZM122,29.8c.6,0,1.2.5,1.2,1.2s-.5,1.2-1.2,1.2-1.2-.5-1.2-1.2.5-1.2,1.2-1.2ZM108.8,48.7c-34.5,8.8-26.6-35.8.9-40,3.1-.5,5.9-.5,8.2,0-1.3.2-2.7.6-4,1.1-9.9,3.8-17.1,14.1-16,23.1s10.1,13.2,20,9.4c1.2-.4,2.3-1,3.3-1.6-3.3,3.8-7.6,6.8-12.5,8.1Z" />
          </svg>
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
        {process.env.NODE_ENV === "development" ? (
          <Link
            className="col-start-12 text-red-600 cursor-pointer"
            href="/studio"
            target="_blank"
          >
            STUDIO
          </Link>
        ) : null}
      </Suspense>
    </nav>
  );
}
