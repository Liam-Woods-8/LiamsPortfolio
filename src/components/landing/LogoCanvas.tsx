"use client";

import { Canvas } from "@react-three/fiber";
import { SpinningLogo } from "./SpinningLogo";

export function LogoCanvas({ onEnter }: { onEnter?: () => void }) {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 0.2, 8], fov: 38 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
      onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
    >
      <SpinningLogo onEnter={onEnter} />
    </Canvas>
  );
}
