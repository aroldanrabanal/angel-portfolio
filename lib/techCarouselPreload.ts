import * as THREE from "three";
import { TECH_CAROUSEL_ITEMS, deviconUrl } from "@/lib/techCarouselItems";

const loader = new THREE.TextureLoader();
loader.setCrossOrigin("anonymous");

let preloadPromise: Promise<void> | null = null;

export function getTechIconUrls(): string[] {
  return TECH_CAROUSEL_ITEMS.filter((item) => item.icon).map((item) =>
    deviconUrl(item.icon!),
  );
}

/** Warm CDN textures before the WebGL carousel mounts. */
export function preloadTechCarouselIcons(): Promise<void> {
  if (preloadPromise) return preloadPromise;

  const urls = getTechIconUrls();
  preloadPromise = Promise.all(
    urls.map(
      (url) =>
        new Promise<void>((resolve) => {
          loader.load(
            url,
            (texture) => {
              texture.colorSpace = THREE.SRGBColorSpace;
              texture.needsUpdate = true;
              resolve();
            },
            undefined,
            () => resolve(),
          );
        }),
    ),
  ).then(() => undefined);

  return preloadPromise;
}

export function preloadTechCarouselChunk(): void {
  void import("@/components/canvas/TechCarouselCanvas");
}
