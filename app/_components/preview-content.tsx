"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import VimeoVideo from "./vimeo-video";

export default function PreviewContent({
  className = "",
}: {
  className?: string;
}) {
  const searchParams = useSearchParams();
  if (!searchParams.get("p")) return null;
  const p = JSON.parse(searchParams.get("p") ?? "");
  const preview_image = p.pi;
  const preview_video = p.pv;
  const rank = p.r;
  return (
    <div
      className={`relative flex justify-center items-center pointer-events-none flex-1 h-fit ${className}`}
    >
      {preview_video ? (
        <VimeoVideo
          rank={rank}
          key={preview_video ?? 0}
          id={parseInt(preview_video) ?? 0}
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
