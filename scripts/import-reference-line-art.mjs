import sharp from "sharp";
import { access, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const OUT_DIR = path.join(ROOT, "public/assets/coloring-pages");
const REF_DIR = path.join(ROOT, "_reference");
const CATALOG_PATH = path.join(ROOT, "src/lib/data/coloring-page-catalog.json");

const REMOTE_BASE = "https://mondaymandala.com/wp-content/uploads/";

function luminance(r, g, b) {
  return 0.299 * r + 0.587 * g + 0.114 * b;
}

function eraseWatermarkPixels(data, width, height, config) {
  const bottomRight = {
    startX: width - Math.floor(width * 0.55),
    startY: height - 120,
    threshold: 242,
  };

  const rightStripWidth = config.rightStripWidth ?? 0;
  const rightStrip = {
    startX: width - rightStripWidth,
    startY: Math.floor(height * 0.22),
    threshold: 248,
  };

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const inBottomRight =
        x >= bottomRight.startX && y >= bottomRight.startY;
      const inRightStrip =
        rightStripWidth > 0 &&
        x >= rightStrip.startX &&
        y >= rightStrip.startY;

      if (!inBottomRight && !inRightStrip) continue;

      const idx = (y * width + x) * 3;
      const lum = luminance(data[idx], data[idx + 1], data[idx + 2]);
      const threshold = inRightStrip ? rightStrip.threshold : bottomRight.threshold;

      if (lum < threshold) {
        data[idx] = 255;
        data[idx + 1] = 255;
        data[idx + 2] = 255;
      }
    }
  }
}

async function ensureReference(filename) {
  const localPath = path.join(REF_DIR, filename);
  try {
    await access(localPath);
  } catch {
    await mkdir(REF_DIR, { recursive: true });
    const url = `${REMOTE_BASE}${filename}`;
    execSync(`curl -sL "${url}" -o "${localPath}"`, { stdio: "inherit" });
  }
  return localPath;
}

async function removeWatermark(inputPath, outputPath, config) {
  const bottomTrim = config.bottomTrim ?? 100;
  const image = sharp(inputPath);
  const { width, height } = await image.metadata();

  if (!width || !height) {
    throw new Error(`Could not read image dimensions: ${inputPath}`);
  }

  const cropHeight = Math.max(1, height - bottomTrim);

  const { data, info } = await sharp(inputPath)
    .extract({ left: 0, top: 0, width, height: cropHeight })
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  eraseWatermarkPixels(data, info.width, info.height, config);

  await sharp(data, {
    raw: { width: info.width, height: info.height, channels: 3 },
  })
    .jpeg({ quality: 92 })
    .toFile(outputPath);

  return { width: info.width, height: info.height };
}

const catalog = JSON.parse(await readFile(CATALOG_PATH, "utf8"));

await mkdir(OUT_DIR, { recursive: true });

const manifest = [];

for (const entry of catalog) {
  const { id, source } = entry;
  const config = {
    bottomTrim: entry.bottomTrim,
    rightStripWidth: entry.rightStripWidth,
  };

  const ref = await ensureReference(source);
  const pageDir = path.join(OUT_DIR, id);
  await mkdir(pageDir, { recursive: true });

  const output = path.join(pageDir, "line-art.jpg");
  const dimensions = await removeWatermark(ref, output, config);

  manifest.push({
    id,
    lineArtSrc: `/assets/coloring-pages/${id}/line-art.jpg`,
    width: dimensions.width,
    height: dimensions.height,
    reference: source,
    source: `${REMOTE_BASE}${source}`,
  });

  console.log(`✓ ${id} (${dimensions.width}x${dimensions.height})`);
}

await writeFile(
  path.join(OUT_DIR, "manifest.json"),
  JSON.stringify(manifest, null, 2),
);

console.log("\nImported line art for", manifest.length, "pages.");
