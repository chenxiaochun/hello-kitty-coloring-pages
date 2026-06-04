import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="relative z-10 flex items-center justify-between px-4 py-4 sm:px-6">
      <Link href="/" className="group flex items-center gap-3">
        <span
          aria-hidden
          className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-[var(--kitty-pink)] bg-white text-xl shadow-[0_4px_0_var(--kitty-pink)] transition-transform group-active:scale-95"
        >
          🎀
        </span>
        <div>
          <p className="font-display text-lg font-bold leading-tight text-[var(--bow-red)] sm:text-xl">
            Hello Kitty
          </p>
          <p className="text-xs font-semibold text-[var(--ink-soft)]/70 sm:text-sm">
            Coloring Pages
          </p>
        </div>
      </Link>
    </header>
  );
}
