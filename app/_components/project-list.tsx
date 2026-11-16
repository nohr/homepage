"use client";

import { AllPostQueryResult } from "@/sanity.types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import ProjectEntry from "./project-entry";
import { useLenis } from "lenis/react";
import {
  matchesTag,
  openProjectKey,
  projectHref,
  projectKey,
  workHref,
} from "@/lib/projects";

export default function ProjectList({
  projects,
}: {
  projects: AllPostQueryResult;
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const lenis = useLenis();
  const tag = searchParams.get("t");
  const legacyId = searchParams.get("p");

  // The open project is addressed by the URL: /work/<slug> (or /work/<_id>).
  const key = openProjectKey(pathname);
  const active =
    (key &&
      projects.find(
        (project) => projectKey(project) === key || project._id === key,
      )?._id) ||
    "";

  // Redirect legacy ?p=<_id> links to the project's own URL.
  useEffect(() => {
    if (!legacyId) return;
    const project = projects.find((project) => project._id === legacyId);
    router.replace(project ? projectHref(project, tag) : workHref(tag), {
      scroll: false,
    });
  }, [legacyId, projects, router, tag]);

  return (
    <div className="flex flex-col gap-4 mb-8 px-4 md:px-0 md:mb-0 md:gap-8 order-1 col-span-full">
      {projects
        .filter(
          (project) => matchesTag(project, tag) || project._id === active,
        )
        .map((project) => (
          <ProjectEntry
            key={project._id}
            project={project}
            href={
              active === project._id
                ? workHref(tag)
                : projectHref(project, tag)
            }
            onClose={() => lenis?.scrollTo("#work", { offset: -90 })}
            active={active}
          />
        ))}
    </div>
  );
}
