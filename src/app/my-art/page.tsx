import type { Metadata } from "next";
import { BottomNav } from "@/components/layout/BottomNav";
import { PageBackground } from "@/components/decor/PageBackground";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { MyArtGrid } from "@/components/my-art/MyArtGrid";
import { JsonLd } from "@/components/seo/JsonLd";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { buildBreadcrumbJsonLd } from "@/lib/seo/json-ld";
import { absoluteUrl, createSharedMetadata } from "@/lib/seo/site";

export const metadata: Metadata = createSharedMetadata({
  title: "My Art – Saved Coloring Pages",
  description:
    "View and download your saved Hello Kitty coloring artwork. Your masterpieces are stored locally in your browser.",
  alternates: {
    canonical: "/my-art",
  },
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: "My Art – Saved Hello Kitty Coloring Pages",
    description: "Your saved Hello Kitty coloring artwork.",
    url: absoluteUrl("/my-art"),
  },
});

export default function MyArtPage() {
  return (
    <PageBackground>
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "My Art", path: "/my-art" },
        ])}
      />
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
