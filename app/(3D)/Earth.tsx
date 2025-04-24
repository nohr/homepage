import { forwardRef } from "react";
import { Mesh, SphereGeometry, Material, Object3DEventMap } from "three";

const Earth = forwardRef<
  Mesh<SphereGeometry, Material | Material[], Object3DEventMap>,
  Mesh
>((props, ref) => (
  <mesh {...props} ref={ref}>
    <sphereGeometry args={[1, 30, 15]} />
    <meshPhysicalMaterial color="#fff" />
  </mesh>
));

Earth.displayName = "Earth";
export default Earth;
