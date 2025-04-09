"use client";

import { AllPostQueryResult } from "@/sanity.types";
import { clsx } from "clsx";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import useQueryString from "@/hooks/useQueryString";
import { PortableText } from "next-sanity";
import { AiOutlineClose } from "react-icons/ai";
import PreviewContent from "./preview-content";
import { useLenis } from "lenis/react";
import ProjectEntry from "./project-entry";

export default function ProjectList({
  projects,
}: {
  projects: AllPostQueryResult;
}) {
  const [active, setActive] = useState<string>("");
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const lenis = useLenis();
  const createQueryString = useQueryString();
  const tag = searchParams.get("t");

  useEffect(() => {
    if (!searchParams.get("p")) return;
    const p = JSON.parse(searchParams.get("p") ?? "");
    if (p.p) setActive(p.p);
    else setActive("");
  }, [searchParams, tag]);

  function openPreview(project: AllPostQueryResult[number]) {
    if (active === project._id) {
      setActive("");
      const nextParams = new URLSearchParams(searchParams.toString());
      nextParams.delete("p");
      router.push(pathname + "?" + nextParams.toString(), {
        scroll: false,
      });

      return;
    }

    // lenis?.scrollTo(`#${project._id}`);
    router.push(
      pathname +
        createQueryString(
          "p",
          JSON.stringify({
            p: project._id,
            pv: project.vimeo,
            pi: project.thumbnail?.blurhash,
            r: project.rank,
          }),
        ),
      { scroll: false },
    );
  }

  return (
    <div className="flex flex-col gap-4 md:gap-8 order-1 col-span-full">
      {projects
        .filter((project) => (!tag ? true : project.medium === tag))
        .map((project) => (
          <ProjectEntry
            key={project._id}
            project={project}
            openPreview={openPreview}
            active={active}
          />
        ))}
    </div>
  );
}
