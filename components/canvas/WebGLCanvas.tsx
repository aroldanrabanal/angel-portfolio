"use client";

import {
  useCallback,
  useEffect,
  useState,
  type ComponentProps,
  type ReactNode,
} from "react";
import { Canvas, type RootState } from "@react-three/fiber";

type CanvasProps = ComponentProps<typeof Canvas>;

export type WebGLCanvasProps = Omit<CanvasProps, "children"> & {
  children: ReactNode;
  /** Rendered if the context is lost or never becomes ready (e.g. GPU block). */
  fallback?: ReactNode;
};

/**
 * Defers WebGL creation one frame (helps React Strict Mode double-mount in dev)
 * and unmounts the Canvas after `webglcontextlost` so the page can recover
 * instead of spamming blocked-context errors.
 */
export function WebGLCanvas({
  children,
  fallback = null,
  onCreated,
  ...rest
}: WebGLCanvasProps) {
  const [ready, setReady] = useState(false);
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const handleCreated = useCallback((state: RootState) => {
    const canvas = state.gl.domElement;
    const onLost = (e: Event) => {
      e.preventDefault();
      setBlocked(true);
    };
    canvas.addEventListener("webglcontextlost", onLost, false);
    onCreated?.(state);
  }, [onCreated]);

  if (!ready || blocked) {
    return <>{fallback}</>;
  }

  return (
    <Canvas onCreated={handleCreated} {...rest}>
      {children}
    </Canvas>
  );
}
