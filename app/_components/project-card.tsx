import { AllPostQueryResult } from "@/sanity.types";
import Image from "next/image";
import PortableText from "@/app/_components/portable-text";
import VimeoVideo from "@/app/_components/vimeo-video";

export default function ProjectCard({
  project,
  filter,
}: {
  project: AllPostQueryResult[number];
  filter: string | null;
}) {
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
  return (
    <div
      className={`grid gap-2 ${rank_styles[filter ? 0 : (project.rank ?? 0)]}`}
    >
      {/* Image/Video */}
      <div
        className={`flex justify-center items-center row-start-1 col-span-2 row-span-2 pointer-events-none relative h-full overflow-hidden ${image_styles[project.rank ?? 0]}`}
      >
        {project.vimeo ? (
          <VimeoVideo key={project.vimeo ?? 0} id={project.vimeo ?? 0} />
        ) : null}
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
      </div>

      {/* Description */}
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
