"use client";

import { AllPostQueryResult } from "@/sanity.types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import useQueryString from "@/hooks/useQueryString";

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
    return () => {
      setActive("");
    };
  }, [tag]);

  return (
    <div className="flex flex-col gap-4 md:gap-8 md:col-span-2 md:col-start-5">
      {projects
        .filter((project) => (!tag ? true : project.medium === tag))
        .map((project) => (
          <motion.div
            style={
              active === project._id ? { textDecoration: "underline" } : {}
            }
            onHoverStart={() => {
              if (active === project._id) return;
              setActive(project._id);
              if (project.vimeo)
                router.push(
                  pathname + createQueryString("pv", `${project.vimeo}`),
                  { scroll: false },
                );
              else if (project.thumbnail?.blurhash)
                router.push(
                  pathname +
                    createQueryString("pi", project.thumbnail.blurhash),
                  { scroll: false },
                );
            }}
            key={project._id}
            className="flex flex-row gap-4 cursor-pointer w-fit"
          >
            <p className="text-md ">{project.name}</p>
          </motion.div>
        ))}
    </div>
  );
}
