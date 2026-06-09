"use client";

import { useEffect, useState } from "react";
import {
  deleteSavedArtwork,
  listSavedArtworks,
  type SavedArtwork,
} from "@/lib/art/saved-artwork";
import { downloadDataUrl } from "@/lib/color/export-artwork";

function formatDate(timestamp: number) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(timestamp));
}

export function MyArtGrid() {
  const [items, setItems] = useState<SavedArtwork[]>([]);

  useEffect(() => {
    setItems(listSavedArtworks());
  }, []);

  function handleDelete(id: string) {
    deleteSavedArtwork(id);
    setItems(listSavedArtworks());
  }

  function handleDownload(item: SavedArtwork) {
    downloadDataUrl(item.imageDataUrl, `${item.pageId}-my-art.jpg`);
  }

  if (items.length === 0) {
    return (
      <div className="rounded-[24px] border-2 border-dashed border-[var(--kitty-pink)] bg-white px-6 py-12 text-center">
        <p aria-hidden className="text-4xl">
          🖍️
        </p>
        <p className="mt-3 font-display text-lg font-bold text-[var(--bow-red)]">
          No artwork yet!
        </p>
        <p className="mt-2 text-sm font-semibold text-[var(--ink-soft)]/80">
          Tap Save while coloring to keep your masterpiece here.
        </p>
        <a
          href="/gallery"
          className="mt-6 inline-flex min-h-12 items-center justify-center rounded-full border-2 border-[var(--kitty-pink)] bg-[var(--soft-pink)] px-6 font-display text-sm font-bold text-[var(--bow-red)] active:scale-95"
        >
          Pick a picture to color
        </a>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
      {items.map((item) => (
        <article
          key={item.id}
          className="overflow-hidden rounded-[24px] border-2 border-[var(--kitty-pink)] bg-white shadow-[0_6px_0_var(--soft-pink)]"
        >
          <div className="aspect-[4/3] bg-white">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.imageDataUrl}
              alt={item.pageTitle}
              className="h-full w-full object-contain"
            />
          </div>
          <div className="space-y-2 px-3 py-3">
            <p className="truncate font-display text-sm font-bold text-[var(--bow-red)]">
              {item.pageTitle}
            </p>
            <p className="text-xs font-semibold text-[var(--ink-soft)]/70">
              {formatDate(item.savedAt)}
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => handleDownload(item)}
                className="min-h-10 flex-1 rounded-full border-2 border-[var(--kitty-pink)] bg-[var(--soft-pink)] px-3 font-display text-xs font-bold text-[var(--bow-red)] active:scale-95"
              >
                Download
              </button>
              <button
                type="button"
                onClick={() => handleDelete(item.id)}
                className="min-h-10 rounded-full border-2 border-[var(--kitty-pink)] bg-white px-3 font-display text-xs font-bold text-[var(--ink-soft)] active:scale-95"
              >
                Delete
              </button>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
