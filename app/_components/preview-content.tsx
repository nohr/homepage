"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import VimeoVideo from "./vimeo-video";
import { useEffect } from "react";
import { useLenis } from "lenis/react";
import { AllPostQueryResult } from "@/sanity.types";

export default function PreviewContent({
  project,
  className = "",
}: {
  project: AllPostQueryResult[number];
  className?: string;
}) {
  const searchParams = useSearchParams();
  const p = searchParams.get("p") ?? "";
  const preview_image = project.thumbnail?.blurhash;
  const preview_video = project.vimeo;
  const rank = project.rank;
  const lenis = useLenis();

  useEffect(() => {
    if (!document.querySelector(`#${CSS.escape(p)}`)) return;
    lenis?.scrollTo(`#${CSS.escape(p)}`, { offset: -90 });
  }, [lenis, p]);

  if (!searchParams.get("p")) return null;
  return (
    <div
      className={`relative flex justify-center items-center pointer-events-none flex-1 h-fit ${className}`}
    >
      {preview_video ? (
        <VimeoVideo
          rank={rank}
          key={preview_video ?? 0}
          id={preview_video ?? 0}
        />
      ) : null}
      {preview_image && !preview_video && (
        <Image
          src={preview_image}
          alt={preview_image}
          height={parseInt(
            preview_image.split("-")[1].split(".")[0].split("x")[0],
          )}
          width={parseInt(
            preview_image.split("-")[1].split(".")[0].split("x")[1],
          )}
          sizes="400px"
          priority
          className={`pointer-events-none  select-none object-contain -z-10 flex-1`}
        />
      )}
    </div>
  );
}
