"use client";

import { Canvas } from "@react-three/fiber";
import { Scan } from "./Scan";

export default function Canva() {
  const document = globalThis.document;
  return (
    <Canvas
      linear
      className="!pointer-events-none !fixed !top-0"
      eventSource={document?.body}
      eventPrefix="client"
    >
      <Scan />
    </Canvas>
  );
}
