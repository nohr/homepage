import Screen from "@components/screen";
import Image from "next/image";
import { sanityFetch } from "@/sanity/lib/fetch";
import { allPostQuery } from "@/sanity/lib/queries";
import PortableText from "../portable-text";
import { AllPostQueryResult } from "@/sanity.types";
import VimeoVideo from "@/app/_components/vimeo-video";
import { Suspense } from "react";

export default async function WorkPage() {
  const data: AllPostQueryResult = await sanityFetch({ query: allPostQuery });
  const rank_styles = [
    "md:col-span-2 h-min",
    "md:col-span-3",
    "col-span-full",
    "md:col-span-2 h-min",
    "md:col-span-4",
    "md:col-span-4",
  ];

  const image_styles = [
    "aspect-video",
    "aspect-video",
    "aspect-video",
    "",
    "aspect-3/2",
    "aspect-square",
  ];

  function ProjectCard({ project }: { project: AllPostQueryResult[number] }) {
    return (
      <div
        key={project._id}
        className={`grid gap-2 ${rank_styles[project.rank ?? 0]}`}
      >
        <div
          className={`row-start-1 col-span-2 row-span-2 pointer-events-none relative h-full overflow-hidden ${image_styles[project.rank ?? 0]}`}
        >
          <Suspense>
            {project.vimeo ? <VimeoVideo id={project.vimeo ?? 0} /> : null}
            {!project.vimeo && project.thumbnail?.blurhash ? (
              <Image
                src={project.thumbnail.blurhash}
                alt={project.name ?? project._id + " blurhash"}
                fill
                sizes="400px"
                priority
                className={`pointer-events-none absolute select-none object-cover -z-10`}
              />
            ) : null}
          </Suspense>
        </div>
        <div className="flex flex-col row-start-3 col-span-2 row-span-1 px-4 md:px-0">
          {project.name}{" "}
          {process.env.NODE_ENV === "development" ? project.rank : null}
          <span className="dark:[&_*]:!text-zinc-400">
            {project.content !== null && project.content !== undefined ? (
              //@ts-expect-error they fucked up the types
              <PortableText value={project.content} />
            ) : null}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <Screen id="work" className="!pt-[16.67svh] ">
        {data.map((project) => (
          <ProjectCard key={project._id} project={project} />
        ))}
      </Screen>
    </div>
  );
}
