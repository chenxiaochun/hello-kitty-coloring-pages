import { SurpriseMeButton } from "@/components/home/SurpriseMeButton";
import { PillButton } from "@/components/ui/PillButton";
import { SectionTitle } from "@/components/ui/SectionTitle";

export function QuickActions() {
  return (
    <section className="animate-fade-up animation-delay-100 px-4 sm:px-6">
      <SectionTitle>Where do you want to go?</SectionTitle>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <PillButton
          href="/gallery"
          label="Browse Gallery"
          icon="🖼️"
          variant="primary"
        />
        <SurpriseMeButton />
        <PillButton
          href="/color/birthday-kitty"
          label="Start Coloring"
          icon="✏️"
          variant="secondary"
        />
        <PillButton
          href="/gallery?sort=popular"
          label="Popular"
          icon="⭐"
          variant="accent"
        />
      </div>
    </section>
  );
}
