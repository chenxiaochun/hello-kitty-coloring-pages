import sharp from "sharp";
import { access, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const OUT_DIR = path.join(ROOT, "public/assets/coloring-pages");
const SOURCE_DIR = path.join(ROOT, "_ai-source");
const CATALOG_PATH = path.join(ROOT, "src/lib/data/coloring-page-catalog.json");

const TARGET_WIDTH = 791;
const WHITE_THRESHOLD = 235;

async function processLineArt(sourcePath, outputPath) {
  const image = sharp(sourcePath);
  const { width, height } = await image.metadata();

  if (!width || !height) {
    throw new Error(`Could not read image: ${sourcePath}`);
  }

  const targetHeight = Math.round((height / width) * TARGET_WIDTH);

  const { data, info } = await sharp(sourcePath)
    .resize(TARGET_WIDTH, targetHeight, { fit: "inside", withoutEnlargement: false })
    .flatten({ background: "#ffffff" })
    .removeAlpha()
    .greyscale()
    .raw()
    .toBuffer({ resolveWithObject: true });

  for (let i = 0; i < data.length; i++) {
    data[i] = data[i] >= WHITE_THRESHOLD ? 255 : 0;
  }

  await sharp(data, {
    raw: { width: info.width, height: info.height, channels: 1 },
  })
    .jpeg({ quality: 92 })
    .toFile(outputPath);

  return { width: info.width, height: info.height };
}

const catalog = JSON.parse(await readFile(CATALOG_PATH, "utf8"));

await mkdir(OUT_DIR, { recursive: true });

const manifest = [];

for (const entry of catalog) {
  const sourceFile = entry.sourceFile ?? `${entry.id}.png`;
  const sourcePath = path.join(SOURCE_DIR, sourceFile);

  try {
    await access(sourcePath);
  } catch {
    console.warn(`⚠ skip ${entry.id}: missing ${sourcePath}`);
    continue;
  }

  const pageDir = path.join(OUT_DIR, entry.id);
  await mkdir(pageDir, { recursive: true });

  const output = path.join(pageDir, "line-art.jpg");
  const dimensions = await processLineArt(sourcePath, output);

  manifest.push({
    id: entry.id,
    lineArtSrc: `/assets/coloring-pages/${entry.id}/line-art.jpg`,
    ...dimensions,
    sourceFile,
  });

  console.log(`✓ ${entry.id} (${dimensions.width}x${dimensions.height})`);
}

await writeFile(
  path.join(OUT_DIR, "manifest.json"),
  JSON.stringify(manifest, null, 2),
);

console.log("\nInstalled AI line art for", manifest.length, "pages.");
