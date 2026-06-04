import Link from "next/link";

type PillButtonProps = {
  href: string;
  label: string;
  icon: string;
  variant?: "primary" | "secondary" | "accent";
};

const variantClasses = {
  primary:
    "bg-[var(--kitty-pink)] text-white border-[var(--bow-red)] shadow-[0_5px_0_var(--bow-red)] hover:-translate-y-0.5",
  secondary:
    "bg-white text-[var(--bow-red)] border-[var(--kitty-pink)] shadow-[0_5px_0_var(--kitty-pink)] hover:-translate-y-0.5",
  accent:
    "bg-[var(--candy-yellow)] text-[var(--ink-soft)] border-[#f5b942] shadow-[0_5px_0_#f5b942] hover:-translate-y-0.5",
};

export function PillButton({
  href,
  label,
  icon,
  variant = "primary",
}: PillButtonProps) {
  return (
    <Link
      href={href}
      className={`flex min-h-14 items-center justify-center gap-2 rounded-full border-2 px-6 py-3 font-display text-base font-bold transition-all active:translate-y-0.5 active:scale-[0.98] sm:min-h-16 sm:text-lg ${variantClasses[variant]}`}
    >
      <span aria-hidden className="text-xl">
        {icon}
      </span>
      <span>{label}</span>
    </Link>
  );
}
