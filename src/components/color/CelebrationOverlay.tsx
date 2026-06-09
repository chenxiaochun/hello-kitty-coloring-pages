"use client";

import { useEffect } from "react";

const SPARKLES = ["🎀", "⭐", "✨", "💖", "🌸"];

type CelebrationOverlayProps = {
  show: boolean;
  onDone: () => void;
};

export function CelebrationOverlay({ show, onDone }: CelebrationOverlayProps) {
  useEffect(() => {
    if (!show) return;

    const timer = window.setTimeout(onDone, 1600);
    return () => window.clearTimeout(timer);
  }, [show, onDone]);

  if (!show) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[100] flex items-center justify-center"
      aria-live="polite"
      aria-label="Artwork saved celebration"
    >
      <div className="absolute inset-0 bg-white/30 backdrop-blur-[1px]" />
      <div className="relative animate-fade-up rounded-[28px] border-2 border-[var(--kitty-pink)] bg-white px-8 py-6 text-center shadow-[0_10px_0_var(--soft-pink)]">
        <p aria-hidden className="text-5xl">
          🎉
        </p>
        <p className="mt-3 font-display text-xl font-bold text-[var(--bow-red)]">
          Saved to My Art!
        </p>
        <p className="mt-1 text-sm font-semibold text-[var(--ink-soft)]/80">
          Great job — keep coloring!
        </p>
      </div>
      {SPARKLES.map((sparkle, index) => (
        <span
          key={`${sparkle}-${index}`}
          aria-hidden
          className="celebration-sparkle absolute text-3xl"
          style={{
            left: `${12 + index * 16}%`,
            top: `${18 + (index % 3) * 22}%`,
            animationDelay: `${index * 90}ms`,
          }}
        >
          {sparkle}
        </span>
      ))}
    </div>
  );
}
