"use client";

import { Canvas } from "@react-three/fiber";
import Scene from "./Scene";

export default function Canva() {
  const document = globalThis.document;
  return (
    <Canvas
      suppressHydrationWarning={true}
      linear
      className="!pointer-events-none !fixed !top-0 !-z-10"
      style={{
        height: "100lvh",
      }}
      eventSource={document?.body}
      eventPrefix="client"
      dpr={[1, 2]}
      gl={{
        powerPreference: "high-performance",
      }}
      camera={{ position: [0, 0.2, 3.2], zoom: 2 }}
    >
      <Scene />
    </Canvas>
  );
}
