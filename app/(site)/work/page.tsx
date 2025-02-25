import Screen from "@components/screen";
import Image from "next/image";
import { sanityFetch } from "@/sanity/lib/fetch";
import { allPostQuery } from "@/sanity/lib/queries";
import PortableText from "../portable-text";
import { AllPostQueryResult } from "@/sanity.types";
import VimeoVideo from "@/app/_components/vimeo-video";

export default async function WorkPage() {
  const data: AllPostQueryResult = await sanityFetch({ query: allPostQuery });
  const rank_styles = [
    "col-span-4 h-[25vh]",
    "col-span-6 h-[50vh]",
    "col-span-12 h-[75vh]",
  ];

  return (
    <Screen id="work" className="!pt-[16.67svh] ">
      {data.map((post) => (
        <div
          key={post._id}
          className={`grid gap-2 grid-cols-2 ${rank_styles[post.rank ?? 0]}`}
        >
          <div
            className={`row-start-1 col-span-2 row-span-2 pointer-events-none relative h-full overflow-hidden `}
          >
            {post?.vimeo ? <VimeoVideo id={post.vimeo} /> : null}
            {!post?.vimeo && post.thumbnail?.blurhash ? (
              <Image
                src={post.thumbnail.blurhash}
                alt={post.name ?? post._id + " blurhash"}
                fill
                sizes="400px"
                priority
                className={`pointer-events-none absolute select-none object-cover`}
              />
            ) : null}
          </div>
          <div className="flex flex-col row-start-3 col-span-2 row-span-1">
            {post.name}
            <span className="opacity-75">
              {post.content !== null && post.content !== undefined ? (
                //@ts-expect-error they fucked up the types
                <PortableText value={post.content} />
              ) : null}
            </span>
          </div>
        </div>
      ))}
    </Screen>
  );
}
