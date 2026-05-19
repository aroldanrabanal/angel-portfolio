let cached: boolean | null = null;

/**
 * Cheap client-side probe — avoids mounting R3F when the GPU/context is blocked
 * (sandboxed browsers, enterprise policies, software rendering disabled, etc.).
 */
export function canUseWebGL(): boolean {
  if (typeof document === "undefined") return false;
  if (cached !== null) return cached;

  try {
    const canvas = document.createElement("canvas");
    const options = { failIfMajorPerformanceCaveat: false } as const;
    const gl =
      canvas.getContext("webgl2", options) ??
      canvas.getContext("webgl", options) ??
      canvas.getContext("experimental-webgl", options);
    cached = gl != null;
  } catch {
    cached = false;
  }

  return cached;
}
