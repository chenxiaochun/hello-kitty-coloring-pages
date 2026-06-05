import sharp from "sharp";
import { access, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const OUT_DIR = path.join(ROOT, "public/assets/coloring-pages");
const REF_DIR = path.join(ROOT, "_reference");

/** Maps our page ids → Monday Mandala preview assets (reference only). */
const PAGE_SOURCES = {
  "birthday-kitty": "Happy-Birthday-Hello-Kitty-Coloring-Page-791x1024.jpg",
  "garden-party": "Princess-Hello-Kitty-In-Flower-Field-791x1024.jpg",
  "best-friends": "Hello-Kitty-With-Pompompurin-And-Cinnamoroll-791x1024.jpg",
  "spring-picnic": "Hello-Kitty-Enjoying-Picnic-791x1024.jpg",
  "hello-holiday":
    "Hello-Kitty-With-Present-And-Christmas-Tree-Coloring-In-791x1024.jpg",
  "tea-time": "Waitress-Hello-Kitty-Serving-Cake-Coloring-Sheet-791x1024.jpg",
  "playground-fun":
    "Hello-Kitty-Playing-In-The-Pool-With-Friends-791x1024.jpg",
  "starlight-dream": "Coloring-Sheet-Of-Winter-Hello-Kitty-Fairy-791x1024.jpg",
};

const PAGE_CONFIG = {
  "birthday-kitty": { bottomTrim: 96 },
  "garden-party": { bottomTrim: 120 },
  "best-friends": { bottomTrim: 120 },
  "spring-picnic": { bottomTrim: 112 },
  "hello-holiday": { bottomTrim: 100 },
  "tea-time": { bottomTrim: 108 },
  "playground-fun": { bottomTrim: 140, rightStripWidth: 118 },
  "starlight-dream": { bottomTrim: 100 },
};

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

async function removeWatermark(inputPath, outputPath, pageId) {
  const config = PAGE_CONFIG[pageId] ?? { bottomTrim: 100 };
  const image = sharp(inputPath);
  const { width, height } = await image.metadata();

  if (!width || !height) {
    throw new Error(`Could not read image dimensions: ${inputPath}`);
  }

  const cropHeight = Math.max(1, height - config.bottomTrim);

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

await mkdir(OUT_DIR, { recursive: true });

const manifest = [];

for (const [pageId, filename] of Object.entries(PAGE_SOURCES)) {
  const source = await ensureReference(filename);
  const pageDir = path.join(OUT_DIR, pageId);
  await mkdir(pageDir, { recursive: true });

  const output = path.join(pageDir, "line-art.jpg");
  const dimensions = await removeWatermark(source, output, pageId);

  manifest.push({
    id: pageId,
    lineArtSrc: `/assets/coloring-pages/${pageId}/line-art.jpg`,
    width: dimensions.width,
    height: dimensions.height,
    reference: filename,
    source: `${REMOTE_BASE}${filename}`,
  });

  console.log(`✓ ${pageId} (${dimensions.width}x${dimensions.height})`);
}

await writeFile(
  path.join(OUT_DIR, "manifest.json"),
  JSON.stringify(manifest, null, 2),
);

console.log("\nImported line art for", manifest.length, "pages.");
