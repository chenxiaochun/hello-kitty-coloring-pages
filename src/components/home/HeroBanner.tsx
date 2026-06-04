export function HeroBanner() {
  return (
    <section className="animate-fade-up px-4 sm:px-6">
      <div className="relative overflow-hidden rounded-[28px] border-2 border-[var(--kitty-pink)] bg-gradient-to-br from-[var(--soft-pink)] via-white to-[var(--soft-pink)] px-6 py-8 shadow-[0_8px_0_var(--kitty-pink)] sm:py-10">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-4 -top-4 h-24 w-24 rounded-full bg-[var(--candy-yellow)]/30 blur-2xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-0 left-8 h-20 w-20 rounded-full bg-[var(--candy-blue)]/25 blur-2xl"
        />
        <div className="relative flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
          <div
            aria-hidden
            className="flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-full border-2 border-[var(--bow-red)] bg-white text-5xl shadow-[0_4px_0_var(--bow-red)]"
          >
            🎀
          </div>
          <div className="max-w-xl">
            <h1 className="font-display text-2xl font-bold text-[var(--bow-red)] sm:text-3xl">
              Welcome to the Coloring Playground!
            </h1>
            <p className="mt-2 text-base font-semibold text-[var(--ink-soft)] sm:text-lg">
              Pick a picture, grab your colors, and create something sweet.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
