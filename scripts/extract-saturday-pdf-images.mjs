/**
 * One-off: extract Saturday Night images from PDF (Python/PyMuPDF) then optimize to WebP.
 * Re-run after updating the source PDF path below.
 */
import sharp from "sharp";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { existsSync } from "fs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "images", "saturday-night");

const jobs = [
  { input: "hero.png", output: "hero.webp", width: 1200, quality: 82 },
  { input: "mechanics-player.png", output: "mechanics-player.webp", width: 900, quality: 80 },
  { input: "mechanics-enemies.png", output: "mechanics-enemies.webp", width: 900, quality: 80 },
  { input: "level-hud.png", output: "level-hud.webp", width: 900, quality: 80 },
  { input: "enemies-highlight.png", output: "enemies-highlight.webp", width: 900, quality: 80 },
];

for (const { input, output, width, quality } of jobs) {
  const inPath = join(root, input);
  if (!existsSync(inPath)) {
    console.warn(`Skip ${input} — not found`);
    continue;
  }
  const outPath = join(root, output);
  await sharp(inPath)
    .rotate()
    .resize({ width, withoutEnlargement: true })
    .webp({ quality, effort: 6 })
    .toFile(outPath);
  const { statSync } = await import("fs");
  console.log(`${output}: ${Math.round(statSync(outPath).size / 1024)} KB`);
}
