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
  "birthday-kitty":
    "Happy-Birthday-Hello-Kitty-Coloring-Page-791x1024.jpg",
  "garden-party":
    "Princess-Hello-Kitty-In-Flower-Field-791x1024.jpg",
  "best-friends":
    "Hello-Kitty-With-Pompompurin-And-Cinnamoroll-791x1024.jpg",
  "spring-picnic":
    "Hello-Kitty-Enjoying-Picnic-791x1024.jpg",
  "hello-holiday":
    "Hello-Kitty-With-Present-And-Christmas-Tree-Coloring-In-791x1024.jpg",
  "tea-time":
    "Waitress-Hello-Kitty-Serving-Cake-Coloring-Sheet-791x1024.jpg",
  "playground-fun":
    "Hello-Kitty-Playing-In-The-Pool-With-Friends-791x1024.jpg",
  "starlight-dream":
    "Coloring-Sheet-Of-Winter-Hello-Kitty-Fairy-791x1024.jpg",
};

const REMOTE_BASE =
  "https://mondaymandala.com/wp-content/uploads/";

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

function cropWatermark(inputPath, outputPath) {
  // Trim bottom strip where MondayMandala watermark sits (original height 1024).
  execSync(
    `sips -c 975 791 "${inputPath}" --out "${outputPath}" 2>/dev/null || cp "${inputPath}" "${outputPath}"`,
    { stdio: "pipe" },
  );
}

await mkdir(OUT_DIR, { recursive: true });

for (const [pageId, filename] of Object.entries(PAGE_SOURCES)) {
  const source = await ensureReference(filename);
  const pageDir = path.join(OUT_DIR, pageId);
  await mkdir(pageDir, { recursive: true });

  const output = path.join(pageDir, "line-art.jpg");
  cropWatermark(source, output);
  console.log(`✓ ${pageId} ← ${filename}`);
}

const manifest = Object.entries(PAGE_SOURCES).map(([id, file]) => ({
  id,
  lineArtSrc: `/assets/coloring-pages/${id}/line-art.jpg`,
  reference: file,
  source: `${REMOTE_BASE}${file}`,
}));

await writeFile(
  path.join(OUT_DIR, "manifest.json"),
  JSON.stringify(manifest, null, 2),
);

console.log("\nImported line art for", manifest.length, "pages.");
