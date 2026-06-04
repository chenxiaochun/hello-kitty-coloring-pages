import { ColoringPageCard } from "@/components/gallery/ColoringPageCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { getPopularPages } from "@/lib/data/coloring-pages";

export function RecommendedStrip() {
  const pages = getPopularPages();

  return (
    <section className="animate-fade-up animation-delay-200 px-4 sm:px-6">
      <SectionTitle sparkle>Today&apos;s Picks</SectionTitle>
      <div className="mt-4 flex gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {pages.map((page) => (
          <ColoringPageCard key={page.id} page={page} compact />
        ))}
      </div>
    </section>
  );
}
