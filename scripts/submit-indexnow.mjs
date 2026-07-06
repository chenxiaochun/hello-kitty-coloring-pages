#!/usr/bin/env node
/**
 * Notify search engines of all site URLs via IndexNow (Bing, Yandex, etc.).
 * Does not replace GSC, but helps Bing index faster.
 */
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const SITE = "https://hello-kitty-coloring-pages.fun";
const INDEXNOW_KEY = "hkcp-indexnow-key-2026";
const KEY_FILE = path.join(ROOT, "public", `${INDEXNOW_KEY}.txt`);

const catalog = JSON.parse(
  readFileSync(
    path.join(ROOT, "src/lib/data/coloring-page-catalog.json"),
    "utf8",
  ),
);

const urlList = [
  `${SITE}/`,
  `${SITE}/gallery`,
  ...catalog.map((p) => `${SITE}/color/${p.id}`),
];

writeFileSync(KEY_FILE, INDEXNOW_KEY, "utf8");

const body = {
  host: "hello-kitty-coloring-pages.fun",
  key: INDEXNOW_KEY,
  keyLocation: `${SITE}/${INDEXNOW_KEY}.txt`,
  urlList,
};

const endpoints = [
  "https://api.indexnow.org/indexnow",
  "https://www.bing.com/indexnow",
];

for (const endpoint of endpoints) {
  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(body),
  });
  console.log(`${endpoint} → ${res.status} ${res.statusText}`);
}

console.log(`Submitted ${urlList.length} URLs via IndexNow`);
