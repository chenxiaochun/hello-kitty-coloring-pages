"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { ColoringPage } from "@/lib/data/coloring-pages";
import { LineArtImage } from "@/components/gallery/LineArtImage";
import {
  ColorToolbar,
  getBrushPixelSize,
  type BrushSizeId,
  type ColoringMode,
  type ToolMode,
} from "@/components/color/ColorToolbar";
import {
  compositeArtwork,
  downloadDataUrl,
  printDataUrl,
} from "@/lib/color/export-artwork";
import { floodFill, loadLineArtData } from "@/lib/color/flood-fill";
import {
  DEFAULT_LINE_ART_SIZE,
  loadLineArtDimensions,
  type LineArtDimensions,
} from "@/lib/color/line-art-meta";

const MAX_HISTORY = 30;

type ColorCanvasProps = {
  page: ColoringPage;
};

export function ColorCanvas({ page }: ColorCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lineArtDataRef = useRef<ImageData | null>(null);
  const historyRef = useRef<string[]>([]);
  const historyIndexRef = useRef(0);
  const didDrawRef = useRef(false);

  const [coloringMode, setColoringMode] = useState<ColoringMode>("brush");
  const [activeColor, setActiveColor] = useState("#FF6B9D");
  const [tool, setTool] = useState<ToolMode>("brush");
  const [brushSize, setBrushSize] = useState<BrushSizeId>("medium");
  const [isDrawing, setIsDrawing] = useState(false);
  const [canUndo, setCanUndo] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [fillPulse, setFillPulse] = useState(false);
  const [lineArtReady, setLineArtReady] = useState(false);
  const [artSize, setArtSize] = useState<LineArtDimensions>(DEFAULT_LINE_ART_SIZE);

  const saveSnapshot = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dataUrl = canvas.toDataURL();
    const trimmed = historyRef.current.slice(0, historyIndexRef.current + 1);
    trimmed.push(dataUrl);

    if (trimmed.length > MAX_HISTORY) {
      trimmed.shift();
    }

    historyRef.current = trimmed;
    historyIndexRef.current = trimmed.length - 1;
    setCanUndo(historyIndexRef.current > 0);
  }, []);

  const restoreSnapshot = useCallback((dataUrl: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
    };
    img.src = dataUrl;
  }, []);

  useEffect(() => {
    saveSnapshot();
  }, [saveSnapshot]);

  useEffect(() => {
    let cancelled = false;

    loadLineArtDimensions(page.lineArtSrc)
      .then((dimensions) => {
        if (cancelled) return;
        setArtSize(dimensions);
        return loadLineArtData(
          page.lineArtSrc,
          dimensions.width,
          dimensions.height,
        );
      })
      .then((imageData) => {
        if (!cancelled && imageData) {
          lineArtDataRef.current = imageData;
          setLineArtReady(true);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setLineArtReady(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [page.lineArtSrc]);

  function getPoint(event: React.PointerEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    return {
      x: (event.clientX - rect.left) * scaleX,
      y: (event.clientY - rect.top) * scaleY,
    };
  }

  function applyStrokeStyle(ctx: CanvasRenderingContext2D) {
    const lineWidth = getBrushPixelSize(brushSize);

    if (tool === "eraser") {
      ctx.globalCompositeOperation = "destination-out";
      ctx.strokeStyle = "rgba(0,0,0,1)";
      ctx.lineWidth = lineWidth * 1.4;
    } else {
      ctx.globalCompositeOperation = "source-over";
      ctx.strokeStyle = activeColor;
      ctx.lineWidth = lineWidth;
    }

    ctx.lineCap = "round";
    ctx.lineJoin = "round";
  }

  function handleMagicFill(point: { x: number; y: number }) {
    const canvas = canvasRef.current;
    const lineArtData = lineArtDataRef.current;
    if (!canvas || !lineArtData) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const filled = floodFill(imageData, lineArtData, point.x, point.y, activeColor);

    if (!filled) return;

    ctx.putImageData(imageData, 0, 0);
    saveSnapshot();
    setFillPulse(true);
    window.setTimeout(() => setFillPulse(false), 220);
  }

  function handlePointerDown(event: React.PointerEvent<HTMLCanvasElement>) {
    const point = getPoint(event);
    if (!point) return;

    if (coloringMode === "magic-fill") {
      handleMagicFill(point);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    applyStrokeStyle(ctx);
    ctx.beginPath();
    ctx.moveTo(point.x, point.y);
    setIsDrawing(true);
    didDrawRef.current = false;
    canvas.setPointerCapture(event.pointerId);
  }

  function draw(event: React.PointerEvent<HTMLCanvasElement>) {
    if (coloringMode !== "brush" || !isDrawing) return;

    const canvas = canvasRef.current;
    const point = getPoint(event);
    if (!canvas || !point) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    applyStrokeStyle(ctx);
    ctx.lineTo(point.x, point.y);
    ctx.stroke();
    didDrawRef.current = true;
  }

  function stopDrawing(event: React.PointerEvent<HTMLCanvasElement>) {
    if (coloringMode !== "brush" || !isDrawing) return;

    setIsDrawing(false);
    canvasRef.current?.releasePointerCapture(event.pointerId);

    if (didDrawRef.current) {
      saveSnapshot();
    }
  }

  function undo() {
    if (historyIndexRef.current <= 0) return;

    historyIndexRef.current -= 1;
    restoreSnapshot(historyRef.current[historyIndexRef.current]);
    setCanUndo(historyIndexRef.current > 0);
  }

  function clearCanvas() {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    saveSnapshot();
  }

  async function exportArtwork(): Promise<string> {
    const canvas = canvasRef.current;
    if (!canvas) {
      throw new Error("Canvas not ready");
    }

    return compositeArtwork(
      canvas,
      page.lineArtSrc,
      artSize.width,
      artSize.height,
    );
  }

  async function handleSave() {
    setIsExporting(true);
    try {
      const dataUrl = await exportArtwork();
      downloadDataUrl(dataUrl, `${page.id}-colored.png`);
    } finally {
      setIsExporting(false);
    }
  }

  async function handlePrint() {
    setIsExporting(true);
    try {
      const dataUrl = await exportArtwork();
      printDataUrl(dataUrl, page.title);
    } finally {
      setIsExporting(false);
    }
  }

  const canvasCursor =
    coloringMode === "magic-fill" ? "cursor-pointer" : "cursor-crosshair";

  return (
    <div className="flex min-h-screen flex-col bg-[var(--cream-white)]">
      <header className="flex items-center justify-between gap-3 border-b-2 border-[var(--soft-pink)] bg-white px-4 py-3">
        <Link
          href="/gallery"
          className="flex min-h-12 items-center justify-center rounded-full border-2 border-[var(--kitty-pink)] bg-[var(--soft-pink)] px-4 font-display text-sm font-bold text-[var(--bow-red)] active:scale-95"
        >
          ← Back
        </Link>
        <h1 className="truncate font-display text-base font-bold text-[var(--bow-red)] sm:text-lg">
          {page.title}
        </h1>
        <div className="flex gap-2">
          <button
            type="button"
            disabled={isExporting}
            onClick={handleSave}
            className="min-h-12 rounded-full border-2 border-[var(--kitty-pink)] bg-white px-3 font-display text-xs font-bold text-[var(--ink-soft)] active:scale-95 disabled:opacity-50 sm:px-4 sm:text-sm"
          >
            Save
          </button>
          <button
            type="button"
            disabled={isExporting}
            onClick={handlePrint}
            className="min-h-12 rounded-full border-2 border-[var(--bow-red)] bg-[var(--kitty-pink)] px-3 font-display text-xs font-bold text-white active:scale-95 disabled:opacity-50 sm:px-4 sm:text-sm"
          >
            Print
          </button>
        </div>
      </header>

      <div className="flex flex-1 flex-col items-center justify-center p-4">
        <div
          className={`relative w-full max-w-2xl overflow-hidden rounded-[24px] border-2 border-[var(--kitty-pink)] bg-white shadow-[0_8px_0_var(--soft-pink)] transition-transform duration-200 ${
            fillPulse ? "scale-[1.01]" : ""
          }`}
          style={{ aspectRatio: `${artSize.width} / ${artSize.height}` }}
        >
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <LineArtImage
              src={page.lineArtSrc}
              alt={`${page.title} line art`}
              priority
              className="h-full w-full"
            />
          </div>
          <canvas
            ref={canvasRef}
            width={artSize.width}
            height={artSize.height}
            className={`relative z-10 h-full w-full touch-none ${canvasCursor}`}
            onPointerDown={handlePointerDown}
            onPointerMove={draw}
            onPointerUp={stopDrawing}
            onPointerLeave={stopDrawing}
            onPointerCancel={stopDrawing}
            aria-label={`Coloring canvas for ${page.title}`}
          />
          {coloringMode === "magic-fill" && !lineArtReady ? (
            <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/60 font-display text-sm font-semibold text-[var(--ink-soft)]">
              Loading magic fill...
            </div>
          ) : null}
        </div>
      </div>

      <ColorToolbar
        coloringMode={coloringMode}
        activeColor={activeColor}
        tool={tool}
        brushSize={brushSize}
        canUndo={canUndo}
        onColoringModeChange={setColoringMode}
        onColorChange={(color) => {
          setActiveColor(color);
          if (coloringMode === "brush") {
            setTool("brush");
          }
        }}
        onToolChange={setTool}
        onBrushSizeChange={setBrushSize}
        onUndo={undo}
        onClear={clearCanvas}
      />
    </div>
  );
}
