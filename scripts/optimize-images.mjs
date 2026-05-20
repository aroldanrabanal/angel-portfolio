import sharp from "sharp";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "images");

const jobs = [
  {
    input: "IMG-20260514-WA0024.jpg",
    output: "IMG-20260514-WA0024.webp",
    width: 1200,
    quality: 80,
  },
  {
    input: "foto-hero.jpeg",
    output: "foto-hero.webp",
    width: 640,
    quality: 85,
  },
];

for (const { input, output, width, quality } of jobs) {
  const inPath = join(root, input);
  const outPath = join(root, output);
  await sharp(inPath)
    .rotate()
    .resize({ width, withoutEnlargement: true })
    .webp({ quality, effort: 6 })
    .toFile(outPath);
  const { statSync } = await import("fs");
  console.log(`${output}: ${Math.round(statSync(outPath).size / 1024)} KB`);
}
