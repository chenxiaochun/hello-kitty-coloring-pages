import { BottomNav } from "@/components/layout/BottomNav";
import { PageBackground } from "@/components/decor/PageBackground";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { MyArtGrid } from "@/components/my-art/MyArtGrid";
import { SectionTitle } from "@/components/ui/SectionTitle";

export default function MyArtPage() {
  return (
    <PageBackground>
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-4 pb-28 pt-2 sm:px-6">
        <section className="animate-fade-up">
          <SectionTitle sparkle>My Art</SectionTitle>
          <p className="mt-1 text-sm font-semibold text-[var(--ink-soft)]/80 sm:text-base">
            Your saved coloring masterpieces live here.
          </p>
        </section>
        <section className="mt-6 animate-fade-up animation-delay-100">
          <MyArtGrid />
        </section>
      </main>
      <BottomNav active="my-art" />
    </PageBackground>
  );
}
