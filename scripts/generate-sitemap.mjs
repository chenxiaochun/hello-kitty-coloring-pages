#!/usr/bin/env node
/**
 * Writes static sitemap XML files into public/ for Google Search Console.
 * Keeps format minimal: only <loc> + date-only <lastmod>, no priority tags.
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const SITE = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://hello-kitty-coloring-pages.fun"
).replace(/\/$/, "");

const catalog = JSON.parse(
  readFileSync(
    path.join(ROOT, "src/lib/data/coloring-page-catalog.json"),
    "utf8",
  ),
);

const lastmod = new Date().toISOString().slice(0, 10);

function escapeXml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function urlEntry(loc) {
  return `<url><loc>${escapeXml(loc)}</loc><lastmod>${lastmod}</lastmod></url>`;
}

const urls = [
  `${SITE}/`,
  `${SITE}/gallery`,
  `${SITE}/my-art`,
  ...catalog.map((page) => `${SITE}/color/${page.id}`),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(urlEntry).join("\n")}
</urlset>
`;

mkdirSync(path.join(ROOT, "public"), { recursive: true });

const outputs = ["sitemap.xml", "google-sitemap.xml"];
for (const name of outputs) {
  writeFileSync(path.join(ROOT, "public", name), xml, "utf8");
}

console.log(`Wrote ${outputs.join(", ")} (${urls.length} URLs, site=${SITE})`);
console.log("GSC: delete old entries, submit google-sitemap.xml");
