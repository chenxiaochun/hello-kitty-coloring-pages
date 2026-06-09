import { COLORING_PAGES } from "@/lib/data/coloring-pages";

export function getRandomColoringPageId(): string {
  const index = Math.floor(Math.random() * COLORING_PAGES.length);
  return COLORING_PAGES[index]?.id ?? COLORING_PAGES[0].id;
}
