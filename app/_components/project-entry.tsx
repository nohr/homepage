import { AllPostQueryResult } from "@/sanity.types";
import { clsx } from "clsx";
import { PortableText } from "next-sanity";
import Link from "next/link";
import { AiOutlineClose } from "react-icons/ai";
import PreviewContent from "./preview-content";
import { motion } from "motion/react";
import { projectMedium, projectYear } from "@/lib/projects";

export default function ProjectEntry({
  project,
  href,
  onClose,
  active,
}: {
  project: AllPostQueryResult[number];
  /** The project URL when closed, the list URL when open. */
  href: string;
  onClose: () => void;
  active: string;
}) {
  const isOpen = active === project._id;
  const details = [projectYear(project), projectMedium(project)]
    .filter(Boolean)
    .join(", ");

  return (
    <div
      key={project._id}
      id={project._id}
      className={clsx(
        isOpen && "mb-4 md:!grid-rows-[1.25rem,_1fr] md:h-[50vh]",
        "flex flex-col gap-4 md:!grid md:grid-cols-6",
      )}
    >
      <motion.h2
        whileHover={{ borderColor: "currentColor" }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className={clsx(
          isOpen && " !justify-self-start w-full !border-current",
          active && !isOpen && "opacity-50",

          "text-md w-fit px-1 border border-transparent rounded-full justify-self-end h-fit md:col-span-2 md:col-start-5 focus-within:!border-current",
        )}
      >
        <Link
          href={href}
          scroll={false}
          aria-expanded={isOpen}
          onClick={isOpen ? onClose : undefined}
          className="flex flex-row gap-1 items-end w-full cursor-pointer outline-none"
        >
          {isOpen && (
            <>
              <AiOutlineClose aria-hidden className="!text-sm mb-1" />
              <span className="sr-only">Close</span>
            </>
          )}
          <span>{project.name}</span>
          {details && <span className="opacity-50">{details}</span>}
        </Link>
      </motion.h2>

      {isOpen && (
        <>
          <PreviewContent
            project={project}
            className="md:order-last md:col-start-1 md:row-start-1 md:row-span-2 md:col-span-4 md:h-auto"
          />

          <span className="dark:[&_*]:!text-zinc-400 [&_*]:!text-zinc-600  md:col-span-2 ">
            {project.role ? <p className="mb-2">{project.role}</p> : null}
            {project.content !== null && project.content !== undefined ? (
              <PortableText value={project.content} />
            ) : null}
          </span>
        </>
      )}
    </div>
  );
}
