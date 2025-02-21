"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { ReactNode } from "react";

export default function ScrollWrapper({ children }: { children: ReactNode }) {
  const lenis = useLenis(({ scroll }) => {
    // called every scroll
  });
  return <ReactLenis root>{children}</ReactLenis>;
}
