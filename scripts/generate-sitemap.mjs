#!/usr/bin/env node
/**
 * Writes a static public/sitemap.xml for reliable Google Search Console fetch.
 * Run before `next build` so Vercel serves the file as a plain static asset.
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

const lastmod = new Date().toISOString();

function escapeXml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function urlEntry(loc, priority) {
  return `  <url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${lastmod}</lastmod>
    <priority>${priority}</priority>
  </url>`;
}

const staticRoutes = [
  { path: "/", priority: "1.0" },
  { path: "/gallery", priority: "0.9" },
  { path: "/my-art", priority: "0.5" },
];

const entries = [
  ...staticRoutes.map(({ path: p, priority }) =>
    urlEntry(`${SITE}${p === "/" ? "" : p}`, priority),
  ),
  ...catalog.map((page) =>
    urlEntry(
      `${SITE}/color/${page.id}`,
      page.popular ? "0.85" : "0.75",
    ),
  ),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join("\n")}
</urlset>
`;

mkdirSync(path.join(ROOT, "public"), { recursive: true });
const outPath = path.join(ROOT, "public/sitemap.xml");
writeFileSync(outPath, xml, "utf8");
// Alternate filename helps GSC recover from a cached "Couldn't fetch" on sitemap.xml.
writeFileSync(path.join(ROOT, "public/sitemap-v2.xml"), xml, "utf8");

console.log(`Wrote ${outPath} (${entries.length} URLs, site=${SITE})`);
console.log("Also wrote public/sitemap-v2.xml (use in GSC if sitemap.xml stays stuck).");
