import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ColorCanvas } from "@/components/color/ColorCanvas";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  COLORING_PAGES,
  getColoringPage,
} from "@/lib/data/coloring-pages";
import { buildColorPageJsonLd } from "@/lib/seo/json-ld";
import { createColorPageMetadata } from "@/lib/seo/site";

type ColorPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  return COLORING_PAGES.map((page) => ({ id: page.id }));
}

export async function generateMetadata({
  params,
}: ColorPageProps): Promise<Metadata> {
  const { id } = await params;
  const page = getColoringPage(id);

  if (!page) {
    return {};
  }

  return createColorPageMetadata(page);
}

export default async function ColorPage({ params }: ColorPageProps) {
  const { id } = await params;
  const page = getColoringPage(id);

  if (!page) {
    notFound();
  }

  return (
    <>
      <JsonLd data={buildColorPageJsonLd(page)} />
      <ColorCanvas page={page} />
    </>
  );
}
