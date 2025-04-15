"use client";

import { useEffect, useRef, useState } from "react";
import Player from "@vimeo/player";
import { PiSpinnerBold } from "react-icons/pi";

export default function VimeoVideo({
  id,
  rank,
  blurhash,
}: {
  id: number | undefined;
  rank: number | null;
  blurhash?: string;
}) {
  const [loaded, setLoaded] = useState(false);
  const playerRef = useRef<HTMLDivElement>(null);
  const portraitStyle =
    rank === 3 ? "h-[50svh] md:h-full aspect-[9/16]" : "flex-1 ";

  useEffect(() => {
    if (playerRef.current !== null) {
      const player = new Player(playerRef.current, {
        id: id,
        muted: true,
        background: true,
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
        blurhash ? null : (
          <PiSpinnerBold className="absolute text-3xl animate-spin" />
        )
      ) : null}
      <div
        className={`[&_iframe]:shadow-lg ${portraitStyle}`}
        ref={playerRef}
      ></div>
    </>
  );
}
