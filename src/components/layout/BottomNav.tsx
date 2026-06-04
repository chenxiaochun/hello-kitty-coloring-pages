import Link from "next/link";

const NAV_ITEMS = [
  { href: "/", label: "Home", icon: "🏠" },
  { href: "/gallery", label: "Gallery", icon: "🖼️" },
] as const;

type BottomNavProps = {
  active?: "home" | "gallery";
};

export function BottomNav({ active = "home" }: BottomNavProps) {
  return (
    <nav
      aria-label="Main navigation"
      className="fixed bottom-0 left-0 right-0 z-50 border-t-2 border-[var(--soft-pink)] bg-white/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-sm"
    >
      <ul className="mx-auto flex max-w-lg items-center justify-center gap-3">
        {NAV_ITEMS.map((item) => {
          const isActive =
            (item.href === "/" && active === "home") ||
            (item.href === "/gallery" && active === "gallery");

          return (
            <li key={item.href} className="flex-1">
              <Link
                href={item.href}
                className={`flex min-h-14 flex-col items-center justify-center gap-1 rounded-[20px] px-4 py-2 text-sm font-bold transition-transform active:scale-95 ${
                  isActive
                    ? "bg-[var(--soft-pink)] text-[var(--bow-red)]"
                    : "text-[var(--ink-soft)] hover:bg-[var(--soft-pink)]/50"
                }`}
              >
                <span aria-hidden className="text-xl leading-none">
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
