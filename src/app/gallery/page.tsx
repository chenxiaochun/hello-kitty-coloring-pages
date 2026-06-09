import type { Metadata } from "next";
import { Suspense } from "react";
import { BottomNav } from "@/components/layout/BottomNav";
import { PageBackground } from "@/components/decor/PageBackground";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { GalleryContent } from "@/components/gallery/GalleryContent";
import { GallerySeoSection } from "@/components/seo/GallerySeoSection";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  buildBreadcrumbJsonLd,
  buildGalleryItemListJsonLd,
} from "@/lib/seo/json-ld";
import { buildGalleryFaqJsonLd } from "@/lib/seo/page-content";
import { absoluteUrl, createSharedMetadata } from "@/lib/seo/site";

export const metadata: Metadata = createSharedMetadata({
  title: "Hello Kitty Coloring Pages Gallery",
  description:
    "Browse 35+ free Hello Kitty coloring pages by category — Friends, Holidays, and Daily Life. Pick a picture and start coloring online.",
  alternates: {
    canonical: "/gallery",
  },
  openGraph: {
    title: "Hello Kitty Coloring Pages Gallery",
    description:
      "Browse free Hello Kitty coloring pages and start coloring online instantly.",
    url: absoluteUrl("/gallery"),
  },
});

export default function GalleryPage() {
  return (
    <PageBackground>
      <JsonLd
        data={[
          buildGalleryItemListJsonLd(),
          buildGalleryFaqJsonLd(),
          buildBreadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Gallery", path: "/gallery" },
          ]),
        ]}
      />
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-0 pb-28 pt-2">
        <section className="animate-fade-up px-4 sm:px-6">
          <h1 className="font-display text-xl font-bold text-[var(--bow-red)] sm:text-2xl">
            Hello Kitty Coloring Pages Gallery
            <span aria-hidden className="ml-2 inline-block text-lg">
              ✨
            </span>
          </h1>
          <p className="mt-1 text-sm font-semibold text-[var(--ink-soft)]/80 sm:text-base">
            Tap a picture to start coloring!
          </p>
        </section>
        <section className="mt-5 px-4 sm:px-6">
          <Suspense fallback={<p className="text-[var(--ink-soft)]">Loading...</p>}>
            <GalleryContent />
          </Suspense>
        </section>
        <div className="px-4 sm:px-6">
          <GallerySeoSection />
        </div>
      </main>
      <BottomNav active="gallery" />
    </PageBackground>
  );
}
