import { Suspense, useRef } from "react";
import { Scan } from "./Scan";
import { useFrame } from "@react-three/fiber";
import Earth from "./Earth";
import { Mesh, Points, Sphere, SphereGeometry } from "three";
// import { Perf } from "r3f-perf";

function Scene() {
  const headRef = useRef<Points>(null);
  const bodyRef = useRef<Points>(null);
  const earthRef = useRef<Mesh<SphereGeometry>>(null);

  useFrame((state) => {
    console.log(state.scene.children);
    // handle frameloop
    if (!state.scene.children[0] && state.frameloop === "always") {
      // wait 500ms before switching to demand
      setTimeout(() => {
        state.setFrameloop("demand");
      }, 500);
    } else if (
      state.scene.children.length > 0 &&
      state.frameloop === "demand"
    ) {
      state.setFrameloop("always");
    }
  });

  return (
    <Suspense fallback={null}>
      <ambientLight intensity={10} />
      <Scan />
      {/* @ts-expect-error issue with props*/}
      <Earth ref={earthRef} scale={1} position={[0, -1.5, 0.3]} />
      {/* {process.env.NODE_ENV === "development" ? ( */}
      {/*   <Perf className="!absolute !bottom-2 !left-auto !right-2 !top-auto z-[99] !hidden  md:!block" /> */}
      {/* ) : null} */}
    </Suspense>
  );
}

export default Scene;
