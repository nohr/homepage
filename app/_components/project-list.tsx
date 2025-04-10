"use client";

import { AllPostQueryResult } from "@/sanity.types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import useQueryString from "@/hooks/useQueryString";
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
  const createQueryString = useQueryString();
  const tag = searchParams.get("t");

  useEffect(() => {
    if (!searchParams.get("p")) {
      setActive("");
      return;
    }
    const p = JSON.parse(searchParams.get("p") ?? "");
    if (p.p) setActive(p.p);
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
    <div className="flex flex-col gap-4 mb-8 md:mb-0 md:gap-8 order-1 col-span-full">
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
