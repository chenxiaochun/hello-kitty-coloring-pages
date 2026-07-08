import type { Metadata } from "next";
import { BottomNav } from "@/components/layout/BottomNav";
import { PageBackground } from "@/components/decor/PageBackground";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { HeroBanner } from "@/components/home/HeroBanner";
import { HomeSeoSection } from "@/components/home/HomeSeoSection";
import { QuickActions } from "@/components/home/QuickActions";
import { RecommendedStrip } from "@/components/home/RecommendedStrip";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildGalleryItemListJsonLd } from "@/lib/seo/json-ld";
import { buildHomeFaqJsonLd } from "@/lib/seo/page-content";
import {
  SITE_DESCRIPTION,
  SITE_NAME,
  absoluteUrl,
  createSharedMetadata,
} from "@/lib/seo/site";

export const metadata: Metadata = createSharedMetadata({
  title: "Free Hello Kitty Coloring Pages Online",
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${SITE_NAME} – Free Online Coloring for Kids`,
    description: SITE_DESCRIPTION,
    url: absoluteUrl("/"),
  },
});

export default function Home() {
  return (
    <PageBackground>
      <JsonLd data={[buildGalleryItemListJsonLd(), buildHomeFaqJsonLd()]} />
      <SiteHeader />
      <main className="mx-auto flex max-w-5xl flex-col gap-8 pb-28 pt-2">
        <HeroBanner />
        <QuickActions />
        <RecommendedStrip />
        <HomeSeoSection />
      </main>
      <BottomNav active="home" />
    </PageBackground>
  );
}
