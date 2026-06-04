"use client";

import { useSearchParams } from "next/navigation";
import { ColoringPageCard } from "@/components/gallery/ColoringPageCard";
import {
  CATEGORIES,
  COLORING_PAGES,
  type Category,
} from "@/lib/data/coloring-pages";

export function GalleryContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category") ?? "all";
  const sortParam = searchParams.get("sort");

  const activeCategory = CATEGORIES.some((c) => c.id === categoryParam)
    ? categoryParam
    : "all";

  let pages = COLORING_PAGES;

  if (sortParam === "popular") {
    pages = pages.filter((page) => page.popular);
  }

  if (activeCategory !== "all") {
    pages = pages.filter((page) => page.category === (activeCategory as Category));
  }

  return (
    <>
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((category) => {
          const isActive = category.id === activeCategory;
          const href =
            category.id === "all"
              ? sortParam === "popular"
                ? "/gallery?sort=popular"
                : "/gallery"
              : sortParam === "popular"
                ? `/gallery?category=${category.id}&sort=popular`
                : `/gallery?category=${category.id}`;

          return (
            <a
              key={category.id}
              href={href}
              className={`min-h-12 rounded-full border-2 px-4 py-2 font-display text-sm font-bold transition-all active:scale-95 sm:text-base ${
                isActive
                  ? "border-[var(--bow-red)] bg-[var(--kitty-pink)] text-white"
                  : "border-[var(--kitty-pink)] bg-white text-[var(--ink-soft)] hover:bg-[var(--soft-pink)]"
              }`}
              style={
                isActive
                  ? undefined
                  : { borderColor: category.accent, color: "var(--ink-soft)" }
              }
            >
              {category.label}
            </a>
          );
        })}
      </div>

      {pages.length === 0 ? (
        <div className="mt-10 rounded-[24px] border-2 border-dashed border-[var(--kitty-pink)] bg-white px-6 py-12 text-center">
          <p aria-hidden className="text-4xl">
            🎀
          </p>
          <p className="mt-3 font-display text-lg font-bold text-[var(--bow-red)]">
            No coloring pages yet — check back soon!
          </p>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {pages.map((page) => (
            <ColoringPageCard key={page.id} page={page} />
          ))}
        </div>
      )}
    </>
  );
}
