"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import VimeoVideo from "./vimeo-video";

export default function PreviewContent() {
  const searchParams = useSearchParams();
  const preview_image = searchParams.get("pi");
  const preview_video = searchParams.get("pv");

  return (
    <div className="flex justify-center items-center pointer-events-none flex-1 h-fit">
      {preview_video ? (
        <VimeoVideo
          key={preview_video ?? 0}
          id={parseInt(preview_video) ?? 0}
        />
      ) : null}
      {preview_image && (
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
          className={`pointer-events-none select-none object-contain -z-10 flex-1`}
        />
      )}
    </div>
  );
}
