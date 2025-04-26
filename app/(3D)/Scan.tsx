export const dynamic = "force-dynamic";

import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { memo, useRef, useMemo, useCallback, useEffect } from "react";
import { Group, Vector2, Vector3, Points } from "three";
import { PCDLoader } from "three/addons/loaders/PCDLoader.js";
import * as THREE from "three";
import { useSearchParams } from "next/navigation";
import { useUIStore } from "@/hooks/useUIStore";

export const Scan = memo(function Scan() {
  const { size } = useThree();
  const [head, body] = useLoader(PCDLoader, [
    "/models/head.pcd",
    "/models/body.pcd",
  ]);
  const headRef = useRef<Points>(null);
  const bodyRef = useRef<Points>(null);
  const groupRef = useRef<Group>(null);
  const searchParams = useSearchParams();
  const mod = 3.2;
  const frameCount = useRef(0);
  const lastPointer = useRef(new Vector2());
  const setLoaded = useUIStore((state) => state.setLoaded);

  // Memoize the material to prevent recreation on each render
  const mat = useMemo(() => {
    return new THREE.PointsMaterial({
      size: size.width >= 768 ? 0.65 : size.width < 450 ? 0.2 : 0.75,
      fog: false,
      color: window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "#b3b3b3"
        : "#c3c3c3",
      toneMapped: false,
      opacity: 1,
      sizeAttenuation: false,
    });
  }, [size.width]);

  // Optimize mouse movement handler with throttling
  const handleMouseMove = useCallback(
    (mouse: Vector2) => {
      if (size.width < 768 || !groupRef.current) return;
      // Skip small movements to reduce calculations
      if (
        lastPointer.current &&
        Math.abs(mouse.x - lastPointer.current.x) < 0.001 &&
        Math.abs(mouse.y - lastPointer.current.y) < 0.001
      ) {
        return;
      }

      // Update last pointer position
      lastPointer.current.copy(mouse);

      const tar = new Vector3((mouse.x * mod * 2) / 1, mouse.y * mod - 2, 3);
      headRef.current?.lookAt(tar.x, tar.y - 1.5, tar.z);
      bodyRef.current?.lookAt(
        tar.x * 0.25,
        tar.y / 2,
        groupRef.current?.position.z + 2,
      );
    },
    [size.width],
  );

  // Optimize breathing animation
  const handleBreath = useCallback(() => {
    if (searchParams.get("p") || !groupRef.current) return;
    groupRef.current.position.y += Math.sin(Date.now() / 1500) / 250;
  }, [searchParams]);

  const handleReturnAttention = useCallback(() => {
    if (!groupRef.current) return;
    headRef.current?.lookAt(0, -1.5, groupRef.current?.position.z + 2);
    bodyRef.current?.lookAt(0, -1.5, groupRef.current?.position.z + 2);
  }, []);

  // Memoize position calculation
  const groupPosition = useMemo(() => {
    return [size.width >= 768 ? 0 : 0, 1.5, -3.5] as [number, number, number];
  }, [size.width]);

  useEffect(() => {
    if (groupRef.current) {
      setLoaded(true);
      groupRef.current.position.lerp(
        new Vector3(
          groupRef.current.position.x,
          groupRef.current.position.y,
          6,
        ),
        0.05,
      );
      handleReturnAttention();
    }
  }, [handleReturnAttention, setLoaded]);

  const handleExitScene = useCallback(
    (scene: THREE.Scene) => {
      if (!groupRef.current) return;
      handleReturnAttention();
      groupRef.current.position.lerp(
        new Vector3(
          groupRef.current.position.x,
          groupRef.current.position.y,
          6,
        ),
        0.05,
      );
      setTimeout(() => {
        if (groupRef.current) {
          groupRef.current.visible = false;
          scene.remove(groupRef.current);
        }
      }, 750);
    },
    [handleReturnAttention],
  );

  useFrame(({ pointer, scene }) => {
    if (!groupRef.current) return;

    // Handle path changes
    if (searchParams.get("p")) {
      handleExitScene(scene);
      return;
    } else {
      // Only add to scene if not already there
      if (!groupRef.current.parent) {
        scene.add(groupRef.current);
      }

      if (groupRef.current.position.z > -3.5) {
        groupRef.current.position.lerp(
          new Vector3(
            groupRef.current.position.x,
            groupRef.current.position.y,
            -3.5,
          ),
          0.05,
        );
      }

      groupRef.current.visible = true;

      // Increment frame counter
      frameCount.current += 1;

      // Wait before only processing mouse movements every other frame
      setTimeout(() => {
        if (frameCount.current % 2 === 0) {
          handleMouseMove(pointer);
        }
      }, 1750);

      // Only update breathing every 3 frames
      if (frameCount.current % 3 === 0) {
        handleBreath();
      }
    }
  });

  return (
    <group
      ref={groupRef}
      position={groupPosition}
      rotation={[0, 0, 0]}
      scale={size.width < 768 ? 0.07 : 0.16}
      name="scan"
    >
      <points ref={headRef} geometry={head.geometry} material={mat} />
      <points ref={bodyRef} geometry={body.geometry} material={mat} />
    </group>
  );
});
