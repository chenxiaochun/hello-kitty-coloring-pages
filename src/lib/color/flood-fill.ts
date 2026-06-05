type Rgba = { r: number; g: number; b: number; a: number };

/** Pixels darker than this are treated as line-art boundaries (black ink on white paper). */
const LINE_LUMINANCE_THRESHOLD = 210;

function getLuminance(r: number, g: number, b: number): number {
  return 0.299 * r + 0.587 * g + 0.114 * b;
}

function isLineBoundary(lineData: Uint8ClampedArray, idx: number): boolean {
  const alpha = lineData[idx + 3];
  if (alpha < 20) return false;

  const r = lineData[idx];
  const g = lineData[idx + 1];
  const b = lineData[idx + 2];
  return getLuminance(r, g, b) < LINE_LUMINANCE_THRESHOLD;
}

function parseHexColor(hex: string): Rgba {
  const normalized = hex.replace("#", "");
  const value =
    normalized.length === 3
      ? normalized
          .split("")
          .map((c) => c + c)
          .join("")
      : normalized;

  return {
    r: parseInt(value.slice(0, 2), 16),
    g: parseInt(value.slice(2, 4), 16),
    b: parseInt(value.slice(4, 6), 16),
    a: 255,
  };
}

function matchesFillTarget(
  data: Uint8ClampedArray,
  idx: number,
  targetAlpha: number,
  targetRgb: [number, number, number],
): boolean {
  const alpha = data[idx + 3];
  if (targetAlpha < 20) return alpha < 20;

  return (
    alpha > 200 &&
    data[idx] === targetRgb[0] &&
    data[idx + 1] === targetRgb[1] &&
    data[idx + 2] === targetRgb[2]
  );
}

/** Flood fill on the color layer, bounded by dark pixels in the line art. */
export function floodFill(
  imageData: ImageData,
  lineArtData: ImageData,
  x: number,
  y: number,
  fillColorHex: string,
): boolean {
  const { width, height } = imageData;
  const data = imageData.data;
  const lineData = lineArtData.data;

  const startX = Math.floor(x);
  const startY = Math.floor(y);
  if (startX < 0 || startX >= width || startY < 0 || startY >= height) {
    return false;
  }

  const startIdx = (startY * width + startX) * 4;
  if (isLineBoundary(lineData, startIdx)) {
    return false;
  }

  const fillColor = parseHexColor(fillColorHex);
  const targetAlpha = data[startIdx + 3];
  const targetRgb: [number, number, number] = [
    data[startIdx],
    data[startIdx + 1],
    data[startIdx + 2],
  ];

  if (
    targetAlpha > 200 &&
    targetRgb[0] === fillColor.r &&
    targetRgb[1] === fillColor.g &&
    targetRgb[2] === fillColor.b
  ) {
    return false;
  }

  const visited = new Uint8Array(width * height);
  const stack = [startX, startY];
  let filled = false;

  while (stack.length > 0) {
    const py = stack.pop()!;
    const px = stack.pop()!;

    if (px < 0 || px >= width || py < 0 || py >= height) continue;

    const pixelIndex = py * width + px;
    if (visited[pixelIndex]) continue;
    visited[pixelIndex] = 1;

    const idx = pixelIndex * 4;
    if (isLineBoundary(lineData, idx)) continue;
    if (!matchesFillTarget(data, idx, targetAlpha, targetRgb)) continue;

    data[idx] = fillColor.r;
    data[idx + 1] = fillColor.g;
    data[idx + 2] = fillColor.b;
    data[idx + 3] = fillColor.a;
    filled = true;

    stack.push(px + 1, py, px - 1, py, px, py + 1, px, py - 1);
  }

  return filled;
}

export function loadLineArtData(
  src: string,
  width: number,
  height: number,
): Promise<ImageData> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Could not read line art"));
        return;
      }
      ctx.drawImage(img, 0, 0, width, height);
      resolve(ctx.getImageData(0, 0, width, height));
    };
    img.onerror = () => reject(new Error(`Failed to load line art: ${src}`));
    img.src = src;
  });
}
