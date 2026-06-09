export type SavedArtwork = {
  id: string;
  pageId: string;
  pageTitle: string;
  imageDataUrl: string;
  savedAt: number;
};

const STORAGE_KEY = "hello-kitty-saved-art";
const MAX_SAVED = 12;

function readAll(): SavedArtwork[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as SavedArtwork[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeAll(items: SavedArtwork[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function listSavedArtworks(): SavedArtwork[] {
  return readAll().sort((a, b) => b.savedAt - a.savedAt);
}

export function saveArtwork(
  entry: Pick<SavedArtwork, "pageId" | "pageTitle" | "imageDataUrl">,
): SavedArtwork {
  const items = readAll();
  const saved: SavedArtwork = {
    id: crypto.randomUUID(),
    savedAt: Date.now(),
    ...entry,
  };

  items.unshift(saved);

  while (items.length > MAX_SAVED) {
    items.pop();
  }

  writeAll(items);
  return saved;
}

export function deleteSavedArtwork(id: string) {
  writeAll(readAll().filter((item) => item.id !== id));
}

export async function compressForGallery(pngDataUrl: string): Promise<string> {
  const img = await new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Failed to load artwork"));
    image.src = pngDataUrl;
  });

  const canvas = document.createElement("canvas");
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("Could not compress artwork");
  }

  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, 0, 0);
  return canvas.toDataURL("image/jpeg", 0.82);
}
