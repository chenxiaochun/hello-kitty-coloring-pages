import { Suspense } from "react";
import { BottomNav } from "@/components/layout/BottomNav";
import { PageBackground } from "@/components/decor/PageBackground";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { GalleryContent } from "@/components/gallery/GalleryContent";
import { SectionTitle } from "@/components/ui/SectionTitle";

export default function GalleryPage() {
  return (
    <PageBackground>
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-0 pb-28 pt-2">
        <section className="animate-fade-up px-4 sm:px-6">
          <SectionTitle sparkle>Gallery</SectionTitle>
          <p className="mt-1 text-sm font-semibold text-[var(--ink-soft)]/80 sm:text-base">
            Tap a picture to start coloring!
          </p>
        </section>
        <section className="mt-5 px-4 sm:px-6">
          <Suspense fallback={<p className="text-[var(--ink-soft)]">Loading...</p>}>
            <GalleryContent />
          </Suspense>
        </section>
      </main>
      <BottomNav active="gallery" />
    </PageBackground>
  );
}
