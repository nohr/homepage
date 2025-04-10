import { AllPostQueryResult } from "@/sanity.types";
import { clsx } from "clsx";
import { PortableText } from "next-sanity";
import { AiOutlineClose } from "react-icons/ai";
import PreviewContent from "./preview-content";

export default function ProjectEntry({
  project,
  openPreview,
  active,
}: {
  project: AllPostQueryResult[number];
  openPreview: (project: AllPostQueryResult[number]) => void;
  active: string;
}) {
  return (
    <div
      key={project._id}
      id={project._id}
      className={clsx(
        active === project._id && "mb-4 md:!grid-rows-[1.25rem,_1fr]",
        "flex flex-col gap-4 md:!grid md:grid-cols-6",
      )}
    >
      <h2
        className={clsx(
          active === project._id && "underline",
          active && active !== project._id && "opacity-50",
          "text-md cursor-pointer w-fit flex flex-row gap-1 items-end h-fit md:col-span-2 md:col-start-5",
        )}
        onClick={() => openPreview(project)}
      >
        {active === project._id && <AiOutlineClose className="!text-sm mb-1" />}
        {project.name}
      </h2>

      {active === project._id && (
        <>
          <PreviewContent className="md:order-last md:col-start-1 md:row-start-1 md:row-span-2 md:col-span-4" />

          <span className="dark:[&_*]:!text-zinc-400 [&_*]:!text-zinc-600 md:pl-1.5 md:col-span-2 ">
            {project.content !== null && project.content !== undefined ? (
              <PortableText value={project.content} />
            ) : null}
          </span>
        </>
      )}

      {/* {active === project._id && ( */}
      {/*   <> */}
      {/*     <br /> */}
      {/*     <br /> */}
      {/*   </> */}
      {/* )} */}
    </div>
  );
}
