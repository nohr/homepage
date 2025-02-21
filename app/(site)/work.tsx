"use client";

import Screen from "@components/screen";
import { AllPostQueryResult } from "@/sanity.types";
import Image from "next/image";

export default function Work({ data }: { data: AllPostQueryResult }) {
  return (
    <Screen id="work" className="!pt-[16.67svh]">
      {data.map((post) => (
        <div
          key={post._id}
          onClick={() => console.log(post)}
          className="grid gap-2 grid-cols-2 grid-rows-2 col-span-2 row-span-2"
        >
          <div
            className={`col-span-2 row-span-1 pointer-events-none relative h-full overflow-hidden `}
          >
            {post.thumbnail?.video ? (
              <video
                autoPlay={false}
                playsInline
                disablePictureInPicture
                muted
                loop
                preload="metadata"
                poster={post.thumbnail?.blurhash ?? undefined}
                src={`${post.thumbnail.video}#t=0.01`}
                controls={false}
                className={`pointer-events-none absolute z-[1] h-full w-full scale-105 overflow-clip object-cover`}
              />
            ) : null}

            {post.thumbnail?.blurhash ? (
              <Image
                src={post.thumbnail.blurhash}
                alt={post.name ?? post._id + " blurhash"}
                fill
                sizes="400px"
                priority
                className={`pointer-events-none absolute select-none object-cover`}
              />
            ) : null}
          </div>
          <div className="flex flex-col row-start-2 col-span-2 row-span-1">
            {post.name}
          </div>
        </div>
      ))}
    </Screen>
  );
}
