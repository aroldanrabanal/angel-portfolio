"use client";

import {
  Component,
  useCallback,
  useEffect,
  useState,
  type ComponentProps,
  type ErrorInfo,
  type ReactNode,
} from "react";
import { Canvas, type RootState } from "@react-three/fiber";
type CanvasProps = ComponentProps<typeof Canvas>;

export type WebGLCanvasProps = Omit<CanvasProps, "children"> & {
  children: ReactNode;
  /** Rendered if the context is lost or never becomes ready (e.g. GPU block). */
  fallback?: ReactNode;
};

type BoundaryProps = {
  children: ReactNode;
  onBlock: () => void;
};

type BoundaryState = { hasError: boolean };

class CanvasErrorBoundary extends Component<BoundaryProps, BoundaryState> {
  state: BoundaryState = { hasError: false };

  static getDerivedStateFromError(): BoundaryState {
    return { hasError: true };
  }

  componentDidCatch(_error: Error, _info: ErrorInfo) {
    this.props.onBlock();
  }

  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}

/**
 * Defers WebGL creation one frame (helps React Strict Mode double-mount in dev),
 * skips the Canvas when WebGL is unavailable, and unmounts after
 * `webglcontextlost` so the page can recover instead of spamming errors.
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

  const handleCreated = useCallback(
    (state: RootState) => {
      const canvas = state.gl.domElement;
      const onLost = (e: Event) => {
        e.preventDefault();
        setBlocked(true);
      };
      const onRestored = () => setBlocked(false);
      canvas.addEventListener("webglcontextlost", onLost, false);
      canvas.addEventListener("webglcontextrestored", onRestored, false);
      onCreated?.(state);
    },
    [onCreated],
  );

  const handleBlock = useCallback(() => setBlocked(true), []);

  if (!ready || blocked) {
    return <>{fallback}</>;
  }

  return (
    <CanvasErrorBoundary onBlock={handleBlock}>
      <Canvas onCreated={handleCreated} {...rest}>
        {children}
      </Canvas>
    </CanvasErrorBoundary>
  );
}
