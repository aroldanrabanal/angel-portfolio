"use client";

import { Suspense, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import {
  Environment,
  MeshTransmissionMaterial,
  Float,
} from "@react-three/drei";
import * as THREE from "three";
import { WebGLCanvas } from "@/components/canvas/WebGLCanvas";

function Knot({ reduceMotion }: { reduceMotion: boolean }) {
  const ref = useRef<THREE.Mesh>(null);
  const geo = useMemo(() => new THREE.TorusKnotGeometry(1, 0.34, 128, 24, 3, 4), []);

  useFrame((state, delta) => {
    const m = ref.current;
    if (!m) return;
    if (reduceMotion) return;
    m.rotation.x += delta * 0.18;
    m.rotation.y += delta * 0.12;
    // subtle scroll-coupled wobble
    const t = state.clock.elapsedTime;
    m.position.y = Math.sin(t * 0.6) * 0.04;
  });

  return (
    <mesh ref={ref} geometry={geo}>
      <MeshTransmissionMaterial
        transmission={1}
        thickness={1.4}
        roughness={0.05}
        ior={1.45}
        chromaticAberration={0.45}
        anisotropy={0.35}
        anisotropicBlur={0.25}
        distortion={0.25}
        distortionScale={0.4}
        temporalDistortion={0.1}
        backside
        samples={4}
        resolution={384}
        clearcoat={1}
        clearcoatRoughness={0.05}
        attenuationColor="#a374ff"
        attenuationDistance={1.2}
        color="#ffffff"
      />
    </mesh>
  );
}

type Props = {
  reduceMotion?: boolean;
  liteMotion?: boolean;
  className?: string;
};

function StaticHeroKnot({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 grid place-items-center ${className}`}
    >
      <div
        className="relative h-[min(62vw,360px)] w-[min(62vw,360px)] rounded-[38%_62%_48%_52%] border border-white/20 shadow-[0_0_80px_rgba(110,34,214,0.38)]"
        style={{
          background:
            "radial-gradient(circle at 35% 24%, rgba(255,255,255,0.92), rgba(163,116,255,0.58) 34%, rgba(110,34,214,0.26) 58%, rgba(214,255,62,0.12) 72%, transparent 78%)",
          transform: "rotate(-18deg)",
        }}
      >
        <span className="absolute left-[18%] top-[50%] h-[2px] w-[68%] -rotate-12 bg-[color:var(--lime)]/70" />
        <span className="absolute inset-[20%] rounded-full border border-white/25" />
      </div>
    </div>
  );
}

export function HeroKnot({ reduceMotion = false, liteMotion = false, className = "" }: Props) {
  if (reduceMotion || liteMotion) {
    return <StaticHeroKnot className={className} />;
  }

  return (
    <div className={`pointer-events-none absolute inset-0 ${className}`}>
      <WebGLCanvas
        camera={{ position: [0, 0, 4.2], fov: 38 }}
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
        <ambientLight intensity={0.4} />
        <directionalLight position={[4, 6, 5]} intensity={1.2} color="#ffffff" />
        <directionalLight position={[-5, -3, -2]} intensity={0.6} color="#7c2fe8" />
        <pointLight position={[0, 0, 4]} intensity={0.7} color="#ff7be5" />

        <Suspense fallback={null}>
          <Float
            speed={reduceMotion ? 0 : 1.1}
            rotationIntensity={reduceMotion ? 0 : 0.25}
            floatIntensity={reduceMotion ? 0 : 0.5}
          >
            <Knot reduceMotion={reduceMotion} />
          </Float>
          <Environment preset="city" />
        </Suspense>
      </WebGLCanvas>
    </div>
  );
}
