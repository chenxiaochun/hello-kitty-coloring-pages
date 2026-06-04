type PageBackgroundProps = {
  children: React.ReactNode;
};

export function PageBackground({ children }: PageBackgroundProps) {
  return (
    <div className="relative min-h-full overflow-hidden bg-[var(--cream-white)]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--kitty-pink) 1.5px, transparent 1.5px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-8 top-24 text-4xl opacity-30"
      >
        ✨
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute left-4 top-40 text-3xl opacity-25"
      >
        ♥
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-32 right-6 text-3xl opacity-20"
      >
        ★
      </div>
      <div className="relative">{children}</div>
    </div>
  );
}
