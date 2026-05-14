"use client";

import { Suspense, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Environment, ContactShadows, Float } from "@react-three/drei";
import * as THREE from "three";
import { WebGLCanvas } from "@/components/canvas/WebGLCanvas";

function ChromeKnot({ reduceMotion }: { reduceMotion: boolean }) {
  const ref = useRef<THREE.Mesh>(null);
  const geo = useMemo(() => new THREE.TorusKnotGeometry(1, 0.32, 128, 24, 2, 3), []);

  useFrame((_, delta) => {
    if (reduceMotion) return;
    const m = ref.current;
    if (!m) return;
    m.rotation.y += delta * 0.22;
    m.rotation.x += delta * 0.06;
  });

  return (
    <mesh ref={ref} geometry={geo}>
      <meshPhysicalMaterial
        color="#f5f5fa"
        metalness={1}
        roughness={0.04}
        envMapIntensity={1.6}
        clearcoat={1}
        clearcoatRoughness={0.05}
      />
    </mesh>
  );
}

type Props = {
  reduceMotion?: boolean;
  className?: string;
};

export function CTAKnot({ reduceMotion = false, className = "" }: Props) {
  return (
    <div className={`pointer-events-none absolute inset-0 ${className}`}>
      <WebGLCanvas
        camera={{ position: [0, 0.3, 4], fov: 36 }}
        dpr={[1, 1.25]}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "default",
          failIfMajorPerformanceCaveat: false,
          stencil: false,
        }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.35} />
        <directionalLight
          position={[3, 5, 4]}
          intensity={1.4}
          color="#ffffff"
        />
        <directionalLight
          position={[-4, -2, -3]}
          intensity={0.7}
          color="#a374ff"
        />
        <Suspense fallback={null}>
          <Float
            speed={reduceMotion ? 0 : 0.9}
            rotationIntensity={reduceMotion ? 0 : 0.3}
            floatIntensity={reduceMotion ? 0 : 0.6}
          >
            <ChromeKnot reduceMotion={reduceMotion} />
          </Float>
          <ContactShadows
            position={[0, -1.6, 0]}
            opacity={0.6}
            scale={6}
            blur={2.4}
            far={4}
            color="#000000"
          />
          <Environment preset="studio" />
        </Suspense>
      </WebGLCanvas>
    </div>
  );
}
