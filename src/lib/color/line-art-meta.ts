export type LineArtDimensions = {
  width: number;
  height: number;
};

export const DEFAULT_LINE_ART_SIZE: LineArtDimensions = {
  width: 791,
  height: 928,
};

export function loadLineArtDimensions(src: string): Promise<LineArtDimensions> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      resolve({ width: img.naturalWidth, height: img.naturalHeight });
    };
    img.onerror = () => reject(new Error(`Failed to load line art dimensions: ${src}`));
    img.src = src;
  });
}
