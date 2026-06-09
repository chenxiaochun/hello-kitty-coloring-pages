"use client";

import { useRouter } from "next/navigation";
import { getRandomColoringPageId } from "@/lib/data/surprise";

export function SurpriseMeButton() {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.push(`/color/${getRandomColoringPageId()}`)}
      className="flex min-h-14 w-full items-center justify-center gap-2 rounded-full border-2 border-[#f5b942] bg-[var(--candy-purple)] px-6 py-3 font-display text-base font-bold text-white shadow-[0_5px_0_#b48aff] transition-all hover:-translate-y-0.5 active:translate-y-0.5 active:scale-[0.98] sm:min-h-16 sm:text-lg"
    >
      <span aria-hidden className="text-xl">
        🎲
      </span>
      <span>Surprise Me</span>
    </button>
  );
}
