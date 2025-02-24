"use client";

import { useEffect, useRef } from "react";
import Player from "@vimeo/player";

export default function VimeoVideo({ id }: { id: string | undefined }) {
  const playerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const options = {
      id: id,
      loop: true,
      autoplay: true,
      muted: true,
      controls: false,
      airplay: false,
      background: true,
    };

    if (playerRef.current !== null) {
      const player = new Player(playerRef.current, options);

      player.on("play", () => {
        console.log("play");
      });
    }
  }, [id]);

  return (
    <>
      <div
        className="h-full [&_iframe]:h-full [&_iframe]:w-full "
        ref={playerRef}
      ></div>
    </>
  );
}
