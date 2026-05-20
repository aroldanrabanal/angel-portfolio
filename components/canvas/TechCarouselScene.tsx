"use client";

import { Component, Suspense, useMemo, useRef, type ReactNode } from "react";
import { useFrame, type ThreeEvent } from "@react-three/fiber";
import { Billboard, Text, useTexture } from "@react-three/drei";
import * as THREE from "three";
import {
  TECH_CAROUSEL_ITEMS,
  deviconUrl,
  fibonacciSphere,
  type TechCarouselItem,
} from "@/lib/techCarouselItems";

const AUTO_ROTATE_Y = 0.003;
const SPHERE_RADIUS = 2.35;
const DAMPING = 0.04;

class TextureErrorBoundary extends Component<
  { fallback: ReactNode; children: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError(): { hasError: boolean } {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

type SceneProps = {
  active: boolean;
};

type CarouselState = {
  rotY: number;
  rotX: number;
  velY: number;
  velX: number;
  dragging: boolean;
  lastX: number;
  lastY: number;
};

function TechBadge({ item, position }: { item: TechCarouselItem; position: [number, number, number] }) {
  return (
    <Billboard position={position} follow>
      <group>
        <mesh position={[0, 0, -0.01]} renderOrder={0}>
          <planeGeometry args={[0.78, 0.92]} />
          <meshBasicMaterial
            color="#0a0a12"
            transparent
            opacity={0.72}
            depthWrite={false}
          />
        </mesh>
        <mesh position={[0, 0, -0.02]} renderOrder={0}>
          <planeGeometry args={[0.82, 0.96]} />
          <meshBasicMaterial
            color="#a374ff"
            transparent
            opacity={0.35}
            depthWrite={false}
          />
        </mesh>
        <Suspense fallback={<BadgeFallbackLabel item={item} y={0.1} />}>
          <TextureErrorBoundary fallback={<BadgeFallbackLabel item={item} y={0.1} />}>
            <BadgeLogo item={item} />
          </TextureErrorBoundary>
        </Suspense>
        <Text
          position={[0, -0.28, 0.03]}
          fontSize={0.085}
          color="#f4f0ff"
          anchorX="center"
          anchorY="middle"
          maxWidth={0.72}
          textAlign="center"
        >
          {item.name}
        </Text>
      </group>
    </Billboard>
  );
}

function BadgeFallbackLabel({ item, y }: { item: TechCarouselItem; y: number }) {
  return (
    <Text position={[0, y, 0.03]} fontSize={0.2} anchorX="center" anchorY="middle" color="#ffffff">
      {item.fallback ?? "◆"}
    </Text>
  );
}

function BadgeLogoWithIcon({ icon }: { icon: string }) {
  const texture = useTexture(deviconUrl(icon));
  const map = useMemo(() => {
    const cloned = texture.clone();
    cloned.colorSpace = THREE.SRGBColorSpace;
    return cloned;
  }, [texture]);

  return (
    <mesh position={[0, 0.1, 0.02]} renderOrder={1}>
      <planeGeometry args={[0.34, 0.34]} />
      <meshBasicMaterial
        map={map}
        transparent
        opacity={0.95}
        toneMapped={false}
        depthWrite={false}
      />
    </mesh>
  );
}

function BadgeLogo({ item }: { item: TechCarouselItem }) {
  if (!item.icon) {
    return <BadgeFallbackLabel item={item} y={0.1} />;
  }

  return <BadgeLogoWithIcon icon={item.icon} />;
}

function TechSphere({ active }: { active: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const state = useRef<CarouselState>({
    rotY: 0,
    rotX: 0,
    velY: AUTO_ROTATE_Y,
    velX: 0,
    dragging: false,
    lastX: 0,
    lastY: 0,
  });

  const positions = useMemo(
    () =>
      TECH_CAROUSEL_ITEMS.map((_, i) =>
        fibonacciSphere(i, TECH_CAROUSEL_ITEMS.length, SPHERE_RADIUS),
      ),
    [],
  );

  const onPointerDown = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    const s = state.current;
    s.dragging = true;
    s.lastX = e.clientX;
    s.lastY = e.clientY;
    const target = e.nativeEvent.target;
    if (target instanceof Element && "setPointerCapture" in target) {
      target.setPointerCapture(e.pointerId);
    }
  };

  const onPointerMove = (e: ThreeEvent<PointerEvent>) => {
    const s = state.current;
    if (!s.dragging) return;
    const dx = e.clientX - s.lastX;
    const dy = e.clientY - s.lastY;
    s.lastX = e.clientX;
    s.lastY = e.clientY;
    s.rotY += dx * 0.005;
    s.rotX += dy * 0.004;
    s.velY = dx * 0.0018;
    s.velX = dy * 0.0014;
  };

  const endDrag = () => {
    state.current.dragging = false;
  };

  useFrame(() => {
    const g = groupRef.current;
    if (!g || !active) return;

    const s = state.current;

    if (!s.dragging) {
      s.velY = THREE.MathUtils.lerp(s.velY, AUTO_ROTATE_Y, DAMPING);
      s.velX = THREE.MathUtils.lerp(s.velX, 0, DAMPING * 1.4);
      s.rotY += s.velY;
      s.rotX += s.velX;
      s.rotX = THREE.MathUtils.clamp(s.rotX, -0.55, 0.55);
    }

    g.rotation.y = s.rotY;
    g.rotation.x = s.rotX;
  });

  return (
    <>
      <mesh
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        onPointerCancel={endDrag}
      >
        <sphereGeometry args={[4.2, 16, 16]} />
        <meshBasicMaterial visible={false} />
      </mesh>

      <group ref={groupRef}>
        {TECH_CAROUSEL_ITEMS.map((item, i) => (
          <TechBadge key={item.name} item={item} position={positions[i]!} />
        ))}
      </group>
    </>
  );
}

export function TechCarouselScene({ active }: SceneProps) {
  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight position={[4, 6, 5]} intensity={0.9} color="#ffffff" />
      <directionalLight position={[-4, -2, -3]} intensity={0.45} color="#7c2fe8" />
      <pointLight position={[0, 0, 3]} intensity={0.35} color="#d6ff3e" />
      <Suspense fallback={null}>
        <TechSphere active={active} />
      </Suspense>
    </>
  );
}
