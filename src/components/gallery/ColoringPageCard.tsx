import Link from "next/link";
import type { ColoringPage } from "@/lib/data/coloring-pages";
import { LineArtImage } from "./LineArtImage";

type ColoringPageCardProps = {
  page: ColoringPage;
  compact?: boolean;
};

export function ColoringPageCard({ page, compact = false }: ColoringPageCardProps) {
  return (
    <Link
      href={`/color/${page.id}`}
      className={`group block overflow-hidden rounded-[24px] border-2 border-[var(--kitty-pink)] bg-white shadow-[0_6px_0_var(--soft-pink)] transition-all hover:-translate-y-1 hover:shadow-[0_10px_0_var(--soft-pink)] active:scale-[0.98] ${
        compact ? "min-w-[160px] flex-shrink-0 sm:min-w-[180px]" : ""
      }`}
    >
      <div className="aspect-square overflow-hidden bg-[var(--soft-pink)]/30 p-3">
        <LineArtImage
          src={page.lineArtSrc}
          alt={`${page.title} coloring page`}
          className="transition-transform group-hover:scale-105"
        />
      </div>
      <div className="border-t-2 border-[var(--soft-pink)] px-3 py-3">
        <p className="font-display text-sm font-bold text-[var(--bow-red)] sm:text-base">
          {page.title}
        </p>
      </div>
    </Link>
  );
}
