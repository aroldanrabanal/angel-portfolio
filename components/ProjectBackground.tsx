"use client";

import { useMemo, useRef } from "react";
import { useCanvasFrameloop, useTabVisible } from "@/lib/useCanvasFrameloop";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { WebGLCanvas } from "@/components/canvas/WebGLCanvas";

const PARTICLE_COUNT = 250;
const ACCENT = "#8A3FE8";

const vertexShader = /* glsl */ `
  attribute float aSize;
  void main() {
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = aSize * (280.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec3 uColor;
  void main() {
    float dist = length(gl_PointCoord - vec2(0.5));
    if (dist > 0.5) discard;
    float alpha = 1.0 - smoothstep(0.25, 0.5, dist);
    gl_FragColor = vec4(uColor, alpha * 0.85);
  }
`;

function ProjectParticles() {
  const groupRef = useRef<THREE.Group>(null);

  const { geometry, material } = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const sizes = new Float32Array(PARTICLE_COUNT);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 6;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 6;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6;
      sizes[i] = 0.015 + Math.random() * 0.015;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));

    const mat = new THREE.ShaderMaterial({
      uniforms: { uColor: { value: new THREE.Color(ACCENT) } },
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    return { geometry: geo, material: mat };
  }, []);

  useFrame(() => {
    const g = groupRef.current;
    if (!g) return;
    g.rotation.y += 0.0005;
  });

  return (
    <group ref={groupRef}>
      <points geometry={geometry} material={material} frustumCulled={false} />
    </group>
  );
}

type Props = {
  reduceMotion?: boolean;
};

export function ProjectBackground({ reduceMotion = false }: Props) {
  const tabVisible = useTabVisible();
  const frameloop = useCanvasFrameloop(tabVisible);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
      {!reduceMotion ? (
        <div className="absolute inset-0 h-full w-full">
        <WebGLCanvas
          camera={{ position: [0, 0, 5], fov: 50 }}
          dpr={[1, 1.25]}
          frameloop={frameloop}
          gl={{
            antialias: false,
            alpha: true,
            powerPreference: "default",
            failIfMajorPerformanceCaveat: false,
            stencil: false,
          }}
          style={{ background: "transparent", width: "100%", height: "100%" }}
        >
          <ProjectParticles />
        </WebGLCanvas>
        </div>
      ) : null}

      <div
        className="fixed inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(circle at center, var(--violet-soft) 0%, transparent 70%)",
          opacity: 0.04,
        }}
      />
    </div>
  );
}
