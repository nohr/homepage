"use client";

import Image from "next/image";
import VimeoVideo from "./vimeo-video";
import { useEffect } from "react";
import { useLenis } from "lenis/react";
import { AllPostQueryResult } from "@/sanity.types";
import { isPortrait } from "@/lib/projects";

export default function PreviewContent({
  project,
  className = "",
}: {
  project: AllPostQueryResult[number];
  className?: string;
}) {
  const cover = project.cover;
  const preview_video = project.vimeo;
  const lenis = useLenis();

  // Only mounted while its project is open: bring that entry into view.
  useEffect(() => {
    const entry = document.getElementById(project._id);
    if (entry) lenis?.scrollTo(entry, { offset: -90 });
  }, [lenis, project._id]);

  return (
    <div
      className={`relative flex justify-center pointer-events-none flex-1 h-fit items-start ${className}`}
    >
      {preview_video ? (
        <VimeoVideo
          portrait={isPortrait(project)}
          key={preview_video}
          id={preview_video}
        />
      ) : null}
      {cover?.url && !preview_video && (
        <Image
          src={cover.url}
          alt={cover.alt || project.name || ""}
          width={cover.width ?? 1600}
          height={cover.height ?? 900}
          placeholder={cover.lqip ? "blur" : "empty"}
          blurDataURL={cover.lqip ?? undefined}
          sizes="(min-width: 768px) 66vw, 100vw"
          priority
          className={`pointer-events-none  select-none object-contain -z-10 flex-1`}
        />
      )}
    </div>
  );
}
