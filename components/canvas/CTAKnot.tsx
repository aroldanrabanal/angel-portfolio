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
  liteMotion?: boolean;
  className?: string;
};

function StaticCTAKnot({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 grid place-items-center ${className}`}
    >
      <div
        className="relative h-[min(70vw,420px)] w-[min(70vw,420px)] rounded-full border border-white/20 shadow-[0_0_96px_rgba(214,255,62,0.18)]"
        style={{
          background:
            "radial-gradient(circle at 42% 35%, rgba(255,255,255,0.92), rgba(245,245,250,0.46) 31%, rgba(163,116,255,0.32) 54%, rgba(10,10,15,0) 74%)",
          transform: "rotate(14deg) scale(0.94)",
        }}
      >
        <span className="absolute left-[14%] top-[48%] h-[2px] w-[72%] rotate-6 bg-white/60" />
        <span className="absolute inset-[26%] rounded-[45%] border border-[color:var(--lime)]/55" />
      </div>
    </div>
  );
}

export function CTAKnot({ reduceMotion = false, liteMotion = false, className = "" }: Props) {
  if (reduceMotion || liteMotion) {
    return <StaticCTAKnot className={className} />;
  }

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
