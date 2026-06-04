type SectionTitleProps = {
  children: React.ReactNode;
  sparkle?: boolean;
};

export function SectionTitle({ children, sparkle = false }: SectionTitleProps) {
  return (
    <h2 className="font-display text-xl font-bold text-[var(--bow-red)] sm:text-2xl">
      {children}
      {sparkle ? (
        <span aria-hidden className="ml-2 inline-block text-lg">
          ✨
        </span>
      ) : null}
    </h2>
  );
}
