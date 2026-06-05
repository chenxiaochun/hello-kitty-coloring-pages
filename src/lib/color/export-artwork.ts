export async function compositeArtwork(
  strokeCanvas: HTMLCanvasElement,
  lineArtSrc: string,
  width: number,
  height: number,
): Promise<string> {
  const output = document.createElement("canvas");
  output.width = width;
  output.height = height;
  const ctx = output.getContext("2d");
  if (!ctx) {
    throw new Error("Could not create export canvas");
  }

  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, width, height);

  const lineArt = await loadImage(lineArtSrc);
  ctx.drawImage(lineArt, 0, 0, width, height);
  ctx.drawImage(strokeCanvas, 0, 0, width, height);
  return output.toDataURL("image/png");
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load line art: ${src}`));
    img.src = src;
  });
}

export function downloadDataUrl(dataUrl: string, filename: string) {
  const link = document.createElement("a");
  link.href = dataUrl;
  link.download = filename;
  link.click();
}

export function printDataUrl(dataUrl: string, title: string) {
  const printWindow = window.open("", "_blank");
  if (!printWindow) {
    return;
  }

  printWindow.document.write(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <title>${title}</title>
        <style>
          body { margin: 0; display: flex; justify-content: center; align-items: center; min-height: 100vh; }
          img { max-width: 100%; height: auto; }
          @media print { body { margin: 0; } img { max-width: 100%; page-break-inside: avoid; } }
        </style>
      </head>
      <body>
        <img src="${dataUrl}" alt="${title}" onload="window.print(); window.onafterprint = function() { window.close(); }" />
      </body>
    </html>
  `);
  printWindow.document.close();
}
