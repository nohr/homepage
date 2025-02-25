"use client";

import { useEffect, useRef } from "react";
import Player from "@vimeo/player";

export default function VimeoVideo({ id }: { id: number | undefined }) {
  const playerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const options = {
      id: id,
      loop: true,
      autoplay: true,
      muted: true,
      controls: false,
      airplay: false,
      chromecast: false,
      background: true,
      autopause: false,
      responsive: true,
    };

    if (playerRef.current !== null) {
      const player = new Player(playerRef.current, options);

      // player.on("play", () => {
      //   console.log("play");
      // });
    }
  }, [id]);

  return (
    <>
      <div className="h-full " ref={playerRef}></div>
    </>
  );
}
