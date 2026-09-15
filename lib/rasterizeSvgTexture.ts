import * as THREE from "three";

const DEFAULT_SIZE = 128;

/** Shared cache so preload and the carousel reuse the same textures. */
const texturePromises = new Map<string, Promise<THREE.CanvasTexture>>();

function forceSvgSize(svg: string, size: number): string {
  return svg.replace(/<svg\b([^>]*)>/i, (_match, attrs: string) => {
    const cleaned = String(attrs).replace(
      /\s(?:width|height)=(?:"[^"]*"|'[^']*'|[^\s>]+)/gi,
      "",
    );
    return `<svg${cleaned} width="${size}" height="${size}">`;
  });
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Image load failed: ${src}`));
    img.src = src;
  });
}

/**
 * WebGL cannot reliably upload raw SVG sources (0×0 / bad image data +
 * immutable texture errors). Rasterize to a fixed-size canvas first.
 */
export async function rasterizeSvgToTexture(
  url: string,
  size = DEFAULT_SIZE,
): Promise<THREE.CanvasTexture> {
  const res = await fetch(url, { mode: "cors" });
  if (!res.ok) throw new Error(`SVG fetch failed (${res.status}): ${url}`);

  const svgText = forceSvgSize(await res.text(), size);
  const blob = new Blob([svgText], { type: "image/svg+xml;charset=utf-8" });
  const objectUrl = URL.createObjectURL(blob);

  try {
    const image = await loadImage(objectUrl);
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("2D canvas context unavailable");

    ctx.clearRect(0, 0, size, size);
    ctx.drawImage(image, 0, 0, size, size);

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.generateMipmaps = true;
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.needsUpdate = true;
    return texture;
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}

export function loadRasterizedSvgTexture(
  url: string,
  size = DEFAULT_SIZE,
): Promise<THREE.CanvasTexture> {
  let pending = texturePromises.get(url);
  if (!pending) {
    pending = rasterizeSvgToTexture(url, size).catch((err) => {
      texturePromises.delete(url);
      throw err;
    });
    texturePromises.set(url, pending);
  }
  return pending;
}

export function preloadRasterizedSvgTextures(urls: string[]): Promise<void> {
  return Promise.all(
    urls.map((url) =>
      loadRasterizedSvgTexture(url).then(
        () => undefined,
        () => undefined,
      ),
    ),
  ).then(() => undefined);
}
