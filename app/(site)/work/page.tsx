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
    "grid-cols-2 grid-rows-[1fr_1fr_0.5fr] col-span-4 h-[25vw]",
    "grid-cols-2 grid-rows-[1fr_1fr_0.5fr] col-span-6 h-[40vw]",
    "grid-cols-2 grid-rows-[1fr_1fr_0.5fr] col-span-12 h-[75vw]",
    "grid-cols-2 grid-rows-[1fr_1fr_0.5fr] col-span-4 h-[72vw]",
    "grid-cols-2 grid-rows-[1fr_1fr_0.5fr] col-span-8 h-[40vw]",
  ];

  return (
    <div>
      {/* fiat house */}
      <Screen id="work" className="!pt-[16.67svh] ">
        <div
          key={data[0]._id}
          className={`grid gap-2 grid-cols-2 grid-rows-[1fr_1fr_0.5fr] col-span-12 h-[75vw]`}
        >
          <div
            className={`row-start-1 col-span-2 row-span-2 pointer-events-none relative h-full overflow-hidden `}
          >
            <VimeoVideo id={data[0].vimeo ?? 0} />
          </div>
          <div className="flex flex-col row-start-3 col-span-2 row-span-1">
            {data[0].name}{" "}
            {process.env.NODE_ENV === "development" ? data[0].rank : null}
            <span className="opacity-75">
              {data[0].content !== null && data[0].content !== undefined ? (
                //@ts-expect-error they fucked up the types
                <PortableText value={data[0].content} />
              ) : null}
            </span>
          </div>
        </div>
      </Screen>
      <Screen className=" ">
        {/* nest center */}
        <div
          key={data[1]._id}
          className={`grid gap-2 grid-cols-2 grid-rows-[1fr_1fr_0.5fr] col-span-4 h-[25vw]`}
        >
          <div
            className={`row-start-1 col-span-2 row-span-2 pointer-events-none relative h-full overflow-hidden `}
          >
            <VimeoVideo id={data[1].vimeo ?? 0} />
          </div>
          <div className="flex flex-col row-start-3 col-span-2 row-span-1">
            {data[1].name}{" "}
            {process.env.NODE_ENV === "development" ? data[1].rank : null}
            <span className="opacity-75">
              {data[1].content !== null && data[1].content !== undefined ? (
                //@ts-expect-error they fucked up the types
                <PortableText value={data[1].content} />
              ) : null}
            </span>
          </div>
        </div>

        {/* tour360 */}
        <div
          key={data[2]._id}
          className={`grid gap-2 ${rank_styles[data[2].rank ?? 0]}`}
        >
          <div
            className={`row-start-1 col-span-2 row-span-2 pointer-events-none relative h-full overflow-hidden `}
          >
            <VimeoVideo id={data[2].vimeo ?? 0} />
          </div>
          <div className="flex flex-col row-start-3 col-span-2 row-span-1">
            {data[2].name}{" "}
            {process.env.NODE_ENV === "development" ? data[2].rank : null}
            <span className="opacity-75">
              {data[2].content !== null && data[2].content !== undefined ? (
                //@ts-expect-error they fucked up the types
                <PortableText value={data[2].content} />
              ) : null}
            </span>
          </div>
        </div>
      </Screen>
      <Screen className=" ">
        {/* hand pose ui */}
        <div
          key={data[3]._id}
          className={`grid gap-2 grid-cols-2 grid-rows-[1fr_1fr_0.5fr] col-span-4 h-[25vw]`}
        >
          <div
            className={`row-start-1 col-span-2 row-span-2 pointer-events-none relative h-full overflow-hidden `}
          >
            {data[3].thumbnail?.blurhash ? (
              <Image
                src={data[3].thumbnail.blurhash}
                alt={data[3].name ?? data[3]._id + " blurhash"}
                fill
                sizes="400px"
                priority
                className={`pointer-events-none absolute select-none object-cover -z-10`}
              />
            ) : null}
          </div>
          <div className="flex flex-col row-start-3 col-span-2 row-span-1">
            {data[3].name}{" "}
            {process.env.NODE_ENV === "development" ? data[3].rank : null}
            <span className="opacity-75">
              {data[3].content !== null && data[3].content !== undefined ? (
                //@ts-expect-error they fucked up the types
                <PortableText value={data[3].content} />
              ) : null}
            </span>
          </div>
        </div>
      </Screen>
    </div>
  );
}
