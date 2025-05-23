"use client";

import { AllPostQueryResult } from "@/sanity.types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import useQueryString from "@/hooks/useQueryString";
import ProjectEntry from "./project-entry";
import { useLenis } from "lenis/react";

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
    const p = searchParams.get("p");
    if (!p) {
      setActive("");
      return;
    } else setActive(p);
  }, [searchParams, tag, lenis]);

  function openPreview(project: AllPostQueryResult[number]) {
    if (active === project._id) {
      setActive("");
      lenis?.scrollTo("#work");
      const nextParams = new URLSearchParams(searchParams.toString());
      nextParams.delete("p");
      router.push(pathname + "?" + nextParams.toString(), {
        scroll: false,
      });

      return;
    }

    router.push(pathname + createQueryString("p", project._id), {
      scroll: false,
    });
  }

  return (
    <div className="flex flex-col gap-4 mb-8 px-4 md:px-0 md:mb-0 md:gap-8 order-1 col-span-full">
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
