import { Suspense, useRef } from "react";
import { Scan } from "./Scan";
import { useFrame } from "@react-three/fiber";
import Earth from "./Earth";
import { Mesh, SphereGeometry } from "three";
// import { Perf } from "r3f-perf";

function Scene() {
  const earthRef = useRef<Mesh<SphereGeometry>>(null);

  useFrame(({ scene, frameloop, setFrameloop }) => {
    // handle frameloop
    if (!scene.children[0] && frameloop === "always") {
      // wait 500ms before switching to demand
      setTimeout(() => {
        setFrameloop("demand");
      }, 500);
    } else if (scene.children.length > 0 && frameloop === "demand") {
      setFrameloop("always");
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
