/**
 * Regenerates data/portfolio.es.json from data/portfolio.en.json using
 * Google Cloud Translation API v2.
 *
 *   $env:GOOGLE_TRANSLATE_API_KEY="..."   # PowerShell
 *   npm run translate:portfolio
 *
 * Enable "Cloud Translation API" for the key's GCP project. Never commit keys.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const enPath = path.join(root, "data", "portfolio.en.json");
const esPath = path.join(root, "data", "portfolio.es.json");

const key = process.env.GOOGLE_TRANSLATE_API_KEY;
if (!key) {
  console.error("Missing GOOGLE_TRANSLATE_API_KEY");
  process.exit(1);
}

function pathToString(path) {
  let s = "";
  for (const p of path) {
    if (typeof p === "number") s += `[${p}]`;
    else s = s ? `${s}.${p}` : p;
  }
  return s;
}

function shouldSkipTranslate(key, value, pathStr) {
  if (typeof value !== "string" || !value.trim()) return true;
  if (/^https?:\/\//i.test(value)) return true;
  if (/^mailto:/i.test(value)) return true;
  if (/^tel:/i.test(value)) return true;
  if (/^\/[\w./-]+$/i.test(value)) return true;
  if (key === "monogram") return true;
  if (key === "accent") return true;
  if (key === "id" && /^[a-z]\d+$/i.test(value)) return true;
  if (pathStr.includes(".tags[")) return true;
  if (pathStr.includes(".trustStrip[")) return true;
  if (pathStr.includes(".stack.items[")) return true;
  return false;
}

/** @param {unknown} node @param {(string|number)[]} path @param {{path:(string|number)[], text:string}[]} out */
function walkStrings(node, path, out) {
  if (Array.isArray(node)) {
    node.forEach((item, i) => walkStrings(item, [...path, i], out));
    return;
  }
  if (node !== null && typeof node === "object") {
    for (const k of Object.keys(node)) walkStrings(node[k], [...path, k], out);
    return;
  }
  if (typeof node === "string") {
    const key = typeof path[path.length - 1] === "string" ? path[path.length - 1] : "";
    const pathStr = pathToString(path);
    if (!shouldSkipTranslate(key, node, pathStr)) {
      out.push({ path: [...path], text: node });
    }
  }
}

function setByPath(obj, path, value) {
  let cur = obj;
  for (let i = 0; i < path.length - 1; i++) {
    cur = cur[path[i]];
  }
  cur[path[path.length - 1]] = value;
}

async function translateBatch(q) {
  const url = `https://translation.googleapis.com/language/translate/v2?key=${encodeURIComponent(key)}`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      q,
      source: "en",
      target: "es",
      format: "text",
    }),
  });
  const raw = await res.text();
  if (!res.ok) {
    throw new Error(`Translate API ${res.status}: ${raw}`);
  }
  const json = JSON.parse(raw);
  return json.data.translations.map((t) => t.translatedText);
}

const BATCH = 80;

async function main() {
  const enRaw = JSON.parse(fs.readFileSync(enPath, "utf8"));
  const clone = structuredClone(enRaw);
  const jobs = [];
  walkStrings(clone, [], jobs);
  console.log(`Collected ${jobs.length} strings to translate.`);

  for (let i = 0; i < jobs.length; i += BATCH) {
    const slice = jobs.slice(i, i + BATCH);
    const out = await translateBatch(slice.map((j) => j.text));
    slice.forEach((j, k) => {
      setByPath(clone, j.path, out[k]);
    });
    console.log(`Translated ${Math.min(i + BATCH, jobs.length)} / ${jobs.length}`);
  }

  fs.writeFileSync(esPath, `${JSON.stringify(clone, null, 2)}\n`, "utf8");
  console.log(`Wrote ${path.relative(root, esPath)}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
