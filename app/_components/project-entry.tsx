import { AllPostQueryResult } from "@/sanity.types";
import { clsx } from "clsx";
import { PortableText } from "next-sanity";
import { AiOutlineClose } from "react-icons/ai";
import PreviewContent from "./preview-content";
import { motion } from "motion/react";

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
        active === project._id &&
          "mb-4 md:!grid-rows-[1.25rem,_1fr] md:h-[50vh]",
        "flex flex-col gap-4 md:!grid md:grid-cols-6",
      )}
    >
      <motion.h2
        whileHover={{ borderColor: "currentColor" }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className={clsx(
          active === project._id &&
            " !justify-self-start w-full !border-current",
          active && active !== project._id && "opacity-50",

          "text-md cursor-pointer w-fit px-1 border border-transparent rounded-full flex flex-row gap-1 justify-self-end items-end h-fit md:col-span-2 md:col-start-5",
        )}
        onClick={() => openPreview(project)}
      >
        {active === project._id && <AiOutlineClose className="!text-sm mb-1" />}
        {project.name}
      </motion.h2>

      {active === project._id && (
        <>
          <PreviewContent
            project={project}
            className="md:order-last md:col-start-1 md:row-start-1 md:row-span-2 md:col-span-4 md:h-auto"
          />

          <span className="dark:[&_*]:!text-zinc-400 [&_*]:!text-zinc-600  md:col-span-2 ">
            {project.content !== null && project.content !== undefined ? (
              <PortableText value={project.content} />
            ) : null}
          </span>
        </>
      )}
    </div>
  );
}
