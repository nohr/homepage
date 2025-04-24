import { Suspense } from "react";
import { Scan } from "./Scan";
import { useFrame } from "@react-three/fiber";
// import { Perf } from "r3f-perf";

function Scene() {
  useFrame((state) => {
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
      <Scan />

      {/* {process.env.NODE_ENV === "development" ? ( */}
      {/*   <Perf className="!absolute !bottom-2 !left-auto !right-2 !top-auto z-[99] !hidden  md:!block" /> */}
      {/* ) : null} */}
    </Suspense>
  );
}

export default Scene;
