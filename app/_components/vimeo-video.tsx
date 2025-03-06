"use client";

import { useEffect, useRef, useState } from "react";
import Player from "@vimeo/player";
import { PiSpinnerBold } from "react-icons/pi";

export default function VimeoVideo({ id }: { id: number | undefined }) {
  const [loaded, setLoaded] = useState(false);
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
      playsinline: true,
      pip: false,
      dnt: true,
    };

    if (playerRef.current !== null) {
      const player = new Player(playerRef.current, options);

      // player.on("play", () => {
      //   console.log("play");
      // });
      player.on("bufferend", () => setLoaded(true));
    }
  }, [id]);

  return (
    <>
      <div className="h-full" ref={playerRef}></div>
      {!loaded ? (
        <div className="h-full w-full flex justify-center">
          <PiSpinnerBold className="my-auto opacity-50 text-3xl animate-spin" />
        </div>
      ) : null}
    </>
  );
}
