import { notFound } from "next/navigation";
import { ColorCanvas } from "@/components/color/ColorCanvas";
import { getColoringPage } from "@/lib/data/coloring-pages";

type ColorPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ColorPage({ params }: ColorPageProps) {
  const { id } = await params;
  const page = getColoringPage(id);

  if (!page) {
    notFound();
  }

  return <ColorCanvas page={page} />;
}
