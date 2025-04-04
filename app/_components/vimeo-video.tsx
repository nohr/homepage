"use client";

import { useEffect, useRef, useState } from "react";
import Player from "@vimeo/player";
import { PiSpinnerBold } from "react-icons/pi";

export default function VimeoVideo({ id }: { id: number | undefined }) {
  const [loaded, setLoaded] = useState(false);
  const playerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (playerRef.current !== null) {
      const player = new Player(playerRef.current, {
        id: id,
        loop: true,
        autoplay: false,
        muted: true,
        controls: false,
        background: true,
        autopause: false,
        responsive: true,
        playsinline: true,
        pip: false,
        dnt: true,
      });

      player.on("bufferend", () => setLoaded(true));
    }
  }, [id]);

  return (
    <>
      {!loaded ? (
        <PiSpinnerBold className="absolute text-3xl animate-spin" />
      ) : null}
      <div className="h-full w-full" ref={playerRef}></div>
    </>
  );
}
