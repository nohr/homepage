"use client";

import ProjectCard from "@/app/_components/project-card";
import { useSearchParams } from "next/navigation";
import { AllPostQueryResult } from "@/sanity.types";

export default function Projects({ data }: { data: AllPostQueryResult }) {
  const searchParams = useSearchParams();

  console.log(searchParams.get("t"));
  return (
    <>
      {data
        .filter((project) =>
          !searchParams.get("t")
            ? true
            : project.medium === searchParams.get("t"),
        )
        .map((project) => (
          <ProjectCard
            key={project._id}
            project={project}
            filter={searchParams.get("t")}
          />
        ))}
    </>
  );
}
