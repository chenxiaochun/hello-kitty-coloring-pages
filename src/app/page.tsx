import { BottomNav } from "@/components/layout/BottomNav";
import { PageBackground } from "@/components/decor/PageBackground";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { HeroBanner } from "@/components/home/HeroBanner";
import { QuickActions } from "@/components/home/QuickActions";
import { RecommendedStrip } from "@/components/home/RecommendedStrip";

export default function Home() {
  return (
    <PageBackground>
      <SiteHeader />
      <main className="mx-auto flex max-w-5xl flex-col gap-8 pb-28 pt-2">
        <HeroBanner />
        <QuickActions />
        <RecommendedStrip />
      </main>
      <BottomNav active="home" />
    </PageBackground>
  );
}
