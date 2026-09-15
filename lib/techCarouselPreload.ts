import { TECH_CAROUSEL_ITEMS, deviconUrl } from "@/lib/techCarouselItems";
import { preloadRasterizedSvgTextures } from "@/lib/rasterizeSvgTexture";

export function getTechIconUrls(): string[] {
  return TECH_CAROUSEL_ITEMS.filter((item) => item.icon).map((item) =>
    deviconUrl(item.icon!),
  );
}

/** Warm CDN SVGs (rasterized) before the WebGL carousel mounts. */
export function preloadTechCarouselIcons(): Promise<void> {
  return preloadRasterizedSvgTextures(getTechIconUrls());
}

export function preloadTechCarouselChunk(): void {
  void import("@/components/canvas/TechCarouselCanvas");
}
