"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import type { ColoringPage } from "@/lib/data/coloring-pages";
import { ThumbnailArt } from "@/components/gallery/ThumbnailArt";

const PALETTE = [
  "#FF6B9D",
  "#E84C6F",
  "#FFD166",
  "#7EC8E3",
  "#C9A0FF",
  "#FFFFFF",
  "#5C4A5A",
  "#FFB3C9",
];

type ColorCanvasProps = {
  page: ColoringPage;
};

export function ColorCanvas({ page }: ColorCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeColor, setActiveColor] = useState(PALETTE[0]);
  const [isDrawing, setIsDrawing] = useState(false);

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

  function startDrawing(event: React.PointerEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current;
    const point = getPoint(event);
    if (!canvas || !point) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.strokeStyle = activeColor;
    ctx.lineWidth = 14;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(point.x, point.y);
    setIsDrawing(true);
    canvas.setPointerCapture(event.pointerId);
  }

  function draw(event: React.PointerEvent<HTMLCanvasElement>) {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    const point = getPoint(event);
    if (!canvas || !point) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.strokeStyle = activeColor;
    ctx.lineTo(point.x, point.y);
    ctx.stroke();
  }

  function stopDrawing(event: React.PointerEvent<HTMLCanvasElement>) {
    if (!isDrawing) return;
    setIsDrawing(false);
    canvasRef.current?.releasePointerCapture(event.pointerId);
  }

  function clearCanvas() {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  return (
    <div className="flex min-h-screen flex-col bg-[var(--cream-white)]">
      <header className="flex items-center justify-between gap-3 border-b-2 border-[var(--soft-pink)] bg-white px-4 py-3">
        <Link
          href="/gallery"
          className="flex min-h-12 min-w-12 items-center justify-center rounded-full border-2 border-[var(--kitty-pink)] bg-[var(--soft-pink)] px-4 font-display text-sm font-bold text-[var(--bow-red)] active:scale-95"
        >
          ← Back
        </Link>
        <h1 className="truncate font-display text-base font-bold text-[var(--bow-red)] sm:text-lg">
          {page.title}
        </h1>
        <div className="flex gap-2">
          <button
            type="button"
            className="min-h-12 rounded-full border-2 border-[var(--kitty-pink)] bg-white px-3 font-display text-xs font-bold text-[var(--ink-soft)] active:scale-95 sm:px-4 sm:text-sm"
          >
            Save
          </button>
          <button
            type="button"
            className="min-h-12 rounded-full border-2 border-[var(--bow-red)] bg-[var(--kitty-pink)] px-3 font-display text-xs font-bold text-white active:scale-95 sm:px-4 sm:text-sm"
          >
            Print
          </button>
        </div>
      </header>

      <div className="flex flex-1 flex-col items-center justify-center p-4">
        <div className="relative w-full max-w-2xl overflow-hidden rounded-[24px] border-2 border-[var(--kitty-pink)] bg-white shadow-[0_8px_0_var(--soft-pink)]">
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center p-8 opacity-90">
            <ThumbnailArt variant={page.thumbnailVariant} className="h-full w-full max-h-80" />
          </div>
          <canvas
            ref={canvasRef}
            width={800}
            height={800}
            className="relative z-10 aspect-square w-full touch-none"
            onPointerDown={startDrawing}
            onPointerMove={draw}
            onPointerUp={stopDrawing}
            onPointerLeave={stopDrawing}
            aria-label={`Coloring canvas for ${page.title}`}
          />
        </div>
      </div>

      <footer className="border-t-2 border-[var(--soft-pink)] bg-white px-4 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
        <div className="mx-auto flex max-w-2xl flex-wrap items-center justify-center gap-3">
          {PALETTE.map((color) => (
            <button
              key={color}
              type="button"
              aria-label={`Select color ${color}`}
              onClick={() => setActiveColor(color)}
              className={`h-12 w-12 rounded-full border-2 transition-transform active:scale-90 ${
                activeColor === color
                  ? "scale-110 border-[var(--bow-red)] ring-4 ring-[var(--soft-pink)]"
                  : "border-[var(--ink-soft)]/20"
              }`}
              style={{ backgroundColor: color }}
            />
          ))}
          <button
            type="button"
            onClick={clearCanvas}
            className="min-h-12 rounded-full border-2 border-[var(--kitty-pink)] bg-[var(--soft-pink)] px-5 font-display text-sm font-bold text-[var(--bow-red)] active:scale-95"
          >
            Clear
          </button>
        </div>
      </footer>
    </div>
  );
}
