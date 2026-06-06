import catalog from "./coloring-page-catalog.json";

export type Category = "friends" | "holidays" | "daily-life";

export type ColoringPage = {
  id: string;
  title: string;
  category: Category;
  popular?: boolean;
  lineArtSrc: string;
};

export function getLineArtSrc(id: string, filename = "line-art.jpg"): string {
  return `/assets/coloring-pages/${id}/${filename}`;
}

export const CATEGORIES: { id: Category | "all"; label: string; accent: string }[] = [
  { id: "all", label: "All", accent: "var(--kitty-pink)" },
  { id: "friends", label: "Friends", accent: "var(--candy-blue)" },
  { id: "holidays", label: "Holidays", accent: "var(--candy-yellow)" },
  { id: "daily-life", label: "Daily Life", accent: "var(--candy-purple)" },
];

export const COLORING_PAGES: ColoringPage[] = catalog.map((entry) => ({
  id: entry.id,
  title: entry.title,
  category: entry.category as Category,
  ...(entry.popular ? { popular: true } : {}),
  lineArtSrc: getLineArtSrc(entry.id),
}));

export function getColoringPage(id: string): ColoringPage | undefined {
  return COLORING_PAGES.find((page) => page.id === id);
}

export function getPopularPages(): ColoringPage[] {
  return COLORING_PAGES.filter((page) => page.popular);
}
