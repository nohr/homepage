// import Link from "next/link";
import ScrollLink from "./scroll-link";
import { Suspense } from "react";
import { TagQueryResult } from "@/sanity.types";

export default function Nav({ tags }: { tags: TagQueryResult }) {
  return (
    <nav className="grid !text-white fixed z-40 p-4 top-0 left-0 gap-4 w-full grid-span-full h-[16.67svh] mix-blend-exclusion dark:mix-blend-difference grid-cols-6 md:grid-cols-12 items-start *:w-fit">
      <Suspense>
        {/* Home */}
        <ScrollLink
          href="/"
          scrollTo={0}
          className="order-1 col-span-2 md:col-span-4 cursor-pointer flex flex-col gap-2"
        >
          aitenoria aigbe
          <svg
            id="Layer_2"
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            viewBox="0 0 144.12 59.7"
            className="fill-current overflow-visible"
          >
            <path d="M141.8,28.8c.46-8.03,5.12-10.63-.21-19.65-8.15-13.79-32.96-9.48-45.15-3.34-10.97,5.52-23.62,18.56-25.4,31.93-.08-3.9-.15-7.29-.06-8.94.46-8.03,5.12-10.63-.21-19.65C62.61-4.65,37.8-.33,25.62,5.81,11.48,12.93-5.49,32.55,1.71,49.28c6.09,14.14,29.95,11.45,41.52,5.93,5.87-2.81,8.89-7.6,14.53-9.88.3,3.57-1.23,9.59,1.86,12.02,2.12,1.67,9.25,2.12,10.77-.04.75-1.07.84-6.6.77-12.59.28,1.54.72,3.07,1.37,4.57,6.09,14.14,29.95,11.45,41.52,5.93,5.87-2.81,8.89-7.6,14.53-9.88.3,3.57-1.23,9.59,1.86,12.02,2.12,1.67,9.25,2.12,10.77-.04,1.55-2.21.3-23.47.59-28.5ZM38.02,48.66C3.54,57.49,11.41,12.85,38.96,8.61c2.97-.46,5.55-.48,7.78-.15-1.44.22-2.92.58-4.44,1.16-9.94,3.78-17.08,14.13-15.95,23.12s10.11,13.22,20.05,9.44c1.77-.67,3.44-1.56,5-2.6-3.43,4.29-8.02,7.71-13.39,9.08ZM108.84,48.66c-34.48,8.83-26.62-35.8.94-40.05,3.14-.48,5.85-.48,8.16-.09-1.31.23-2.65.58-4.02,1.1-9.94,3.78-17.08,14.13-15.95,23.12s10.11,13.22,20.05,9.44c1.15-.44,2.26-.97,3.33-1.58-3.32,3.8-7.6,6.79-12.53,8.05Z" />
          </svg>
        </ScrollLink>
        {/* Tags */}
        <div className="flex flex-col order-2 justify-between h-full md:h-min md:col-start-5 col-span-2 *:w-fit *:cursor-pointer">
          <ScrollLink href="work" scrollTo="#work">
            Selected Works
          </ScrollLink>
          {tags.map(
            (tag) =>
              tag.title && (
                <ScrollLink
                  key={tag._id}
                  params={{ name: "t", value: tag.slug?.current ?? "" }}
                  href="work"
                  scrollTo="#work"
                >
                  {tag.title}
                </ScrollLink>
              ),
          )}
        </div>
        {/* Links */}
        <ScrollLink
          className="order-3 col-start-5 md:col-start-9"
          href="/about"
          scrollTo="#about"
        >
          ABOUT
        </ScrollLink>
        <a
          className="order-3 col-start-6 justify-self-end md:col-start-12"
          target="_blank"
          href="https://aitenoria.gumroad.com"
          rel="noreferrer noopener"
        >
          SHOP
        </a>
      </Suspense>
    </nav>
  );
}
