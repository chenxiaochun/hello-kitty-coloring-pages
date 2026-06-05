export type Category = "friends" | "holidays" | "daily-life";

export type ColoringPage = {
  id: string;
  title: string;
  category: Category;
  popular?: boolean;
  /** Path under /public, e.g. /assets/coloring-pages/birthday-kitty/line-art.svg */
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

export const COLORING_PAGES: ColoringPage[] = [
  {
    id: "birthday-kitty",
    title: "Birthday Kitty",
    category: "holidays",
    popular: true,
    lineArtSrc: getLineArtSrc("birthday-kitty"),
  },
  {
    id: "garden-party",
    title: "Garden Party",
    category: "daily-life",
    popular: true,
    lineArtSrc: getLineArtSrc("garden-party"),
  },
  {
    id: "best-friends",
    title: "Best Friends",
    category: "friends",
    popular: true,
    lineArtSrc: getLineArtSrc("best-friends"),
  },
  {
    id: "spring-picnic",
    title: "Spring Picnic",
    category: "daily-life",
    lineArtSrc: getLineArtSrc("spring-picnic"),
  },
  {
    id: "hello-holiday",
    title: "Holiday Bow",
    category: "holidays",
    lineArtSrc: getLineArtSrc("hello-holiday"),
  },
  {
    id: "tea-time",
    title: "Tea Time",
    category: "daily-life",
    popular: true,
    lineArtSrc: getLineArtSrc("tea-time"),
  },
  {
    id: "playground-fun",
    title: "Playground Fun",
    category: "friends",
    lineArtSrc: getLineArtSrc("playground-fun"),
  },
  {
    id: "starlight-dream",
    title: "Starlight Dream",
    category: "holidays",
    lineArtSrc: getLineArtSrc("starlight-dream"),
  },
];

export function getColoringPage(id: string): ColoringPage | undefined {
  return COLORING_PAGES.find((page) => page.id === id);
}

export function getPopularPages(): ColoringPage[] {
  return COLORING_PAGES.filter((page) => page.popular);
}
