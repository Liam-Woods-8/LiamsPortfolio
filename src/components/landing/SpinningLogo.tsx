"use client";

import { useFrame } from "@react-three/fiber";
import { ContactShadows } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

const LOGO_PATH = "/images/woodsLiam_logo.png";

function useLogoTexture(url: string) {
  const [texture, setTexture] = useState<THREE.Texture | null | "pending">(
    "pending",
  );

  useEffect(() => {
    let cancelled = false;
    const loader = new THREE.TextureLoader();
    loader.load(
      url,
      (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace;
        tex.anisotropy = 8;
        if (!cancelled) setTexture(tex);
      },
      undefined,
      () => {
        if (!cancelled) setTexture(null);
      },
    );
    return () => {
      cancelled = true;
    };
  }, [url]);

  return texture;
}

function SpinningMesh({
  map,
  onEnter,
}: {
  map: THREE.Texture | null;
  onEnter?: () => void;
}) {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (mesh.current) mesh.current.rotation.y += delta * 0.14;
  });

  const materials = useMemo(() => {
    const edge = new THREE.MeshStandardMaterial({
      color: "#1c1917",
      roughness: 0.88,
      metalness: 0.04,
    });
    if (!map) {
      const fill = new THREE.MeshStandardMaterial({
        color: "#44403c",
        roughness: 0.65,
        metalness: 0.08,
      });
      return [edge, edge, edge, edge, fill, edge];
    }
    const face = new THREE.MeshStandardMaterial({
      map,
      roughness: 0.55,
      metalness: 0.02,
    });
    return [edge, edge, edge, edge, face, edge];
  }, [map]);

  return (
    <mesh
      ref={mesh}
      castShadow
      receiveShadow
      material={materials}
      onClick={(e) => {
        e.stopPropagation();
        onEnter?.();
      }}
      onPointerOver={() => {
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        document.body.style.cursor = "auto";
      }}
    >
      <boxGeometry args={[6.6, 3.3, 0.22]} />
    </mesh>
  );
}

export function SpinningLogo({ onEnter }: { onEnter?: () => void }) {
  const textureState = useLogoTexture(LOGO_PATH);
  const map = textureState === "pending" ? null : textureState;

  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight
        position={[6, 8, 6]}
        intensity={1.15}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <directionalLight position={[-4, 2, -3]} intensity={0.35} color="#fecaca" />
      <SpinningMesh map={map} onEnter={onEnter} />
      <ContactShadows
        position={[0, -1.15, 0]}
        opacity={0.35}
        scale={16}
        blur={2.2}
        far={5}
        color="#0c0a09"
      />
    </>
  );
}
