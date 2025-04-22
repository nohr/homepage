"use client";

import { Canvas } from "@react-three/fiber";
import { Scan } from "./Scan";

export default function Canva() {
  const document = globalThis.document;
  return (
    <Canvas
      linear
      className="!pointer-events-none !fixed !top-0"
      style={{
        height: "100lvh",
      }}
      eventSource={document?.body}
      eventPrefix="client"
      dpr={[1, 2]}
      gl={{
        powerPreference: "high-performance",
      }}
    >
      <Scan />
    </Canvas>
  );
}
