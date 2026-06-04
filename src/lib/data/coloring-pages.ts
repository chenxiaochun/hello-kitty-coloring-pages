export type Category = "friends" | "holidays" | "daily-life";

export type ColoringPage = {
  id: string;
  title: string;
  category: Category;
  popular?: boolean;
  thumbnailVariant: 1 | 2 | 3 | 4 | 5 | 6;
};

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
    thumbnailVariant: 1,
  },
  {
    id: "garden-party",
    title: "Garden Party",
    category: "daily-life",
    popular: true,
    thumbnailVariant: 2,
  },
  {
    id: "best-friends",
    title: "Best Friends",
    category: "friends",
    popular: true,
    thumbnailVariant: 3,
  },
  {
    id: "spring-picnic",
    title: "Spring Picnic",
    category: "daily-life",
    thumbnailVariant: 4,
  },
  {
    id: "hello-holiday",
    title: "Holiday Bow",
    category: "holidays",
    thumbnailVariant: 5,
  },
  {
    id: "tea-time",
    title: "Tea Time",
    category: "daily-life",
    popular: true,
    thumbnailVariant: 6,
  },
  {
    id: "playground-fun",
    title: "Playground Fun",
    category: "friends",
    thumbnailVariant: 1,
  },
  {
    id: "starlight-dream",
    title: "Starlight Dream",
    category: "holidays",
    thumbnailVariant: 2,
  },
];

export function getColoringPage(id: string): ColoringPage | undefined {
  return COLORING_PAGES.find((page) => page.id === id);
}

export function getPopularPages(): ColoringPage[] {
  return COLORING_PAGES.filter((page) => page.popular);
}
