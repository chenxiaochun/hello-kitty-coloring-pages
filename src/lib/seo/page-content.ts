import {
  COLORING_PAGES,
  type Category,
  type ColoringPage,
} from "@/lib/data/coloring-pages";
import { getCategoryLabel } from "@/lib/seo/site";

export function getRelatedPages(
  page: ColoringPage,
  limit = 4,
): ColoringPage[] {
  const others = COLORING_PAGES.filter((entry) => entry.id !== page.id);

  const sameCategory = others
    .filter((entry) => entry.category === page.category)
    .sort((a, b) => Number(Boolean(b.popular)) - Number(Boolean(a.popular)));

  const rest = others.filter((entry) => entry.category !== page.category);

  return [...sameCategory, ...rest].slice(0, limit);
}

export function getCategoryPageCount(category: Category): number {
  return COLORING_PAGES.filter((page) => page.category === category).length;
}

export function getColorPageHeading(page: ColoringPage): string {
  return `Free Hello Kitty ${page.title} Coloring Page`;
}

export function getColorPageIntro(page: ColoringPage): string {
  const categoryLabel = getCategoryLabel(page.category).toLowerCase();

  return `Welcome to our ${page.title} Hello Kitty coloring page — a ${categoryLabel} design you can color online for free. This printable-style line art works on phones, tablets, and computers, so kids can start creating in seconds.`;
}

export function getColorPageBodyParagraphs(page: ColoringPage): string[] {
  const categoryLabel = getCategoryLabel(page.category);

  return [
    `Use the brush tool to draw freely, switch to Magic Fill to tap and color large areas, or combine both for a neat finished picture. When you are done, tap Save to download your artwork or keep it in My Art, and use Print if you want a paper copy for crayons and markers.`,
    `This ${page.title.toLowerCase()} sheet is part of our ${categoryLabel} collection. It is designed for children ages 4–10 who love Hello Kitty, cute characters, and creative play. No account is required — just pick your colors and enjoy.`,
    `Looking for more? Browse similar Hello Kitty coloring pages in the gallery, try Surprise Me on the home page for a random picture, or explore other ${categoryLabel} designs below.`,
  ];
}

export function getColorPageTips(): string[] {
  return [
    "Start with light colors and add darker shades on top.",
    "Magic Fill works best when you tap inside open white areas.",
    "Use Undo if you want to try a different color choice.",
    "Save your favorite finished pages to My Art for later.",
  ];
}

export const GALLERY_SEO = {
  heading: "Free Hello Kitty Coloring Pages Online",
  intro: [
    "Explore our growing gallery of Hello Kitty coloring pages — all free to color online. Kids can pick a picture, paint with a brush or magic fill, save their artwork, and print when they are done.",
    "Whether you are planning a birthday activity, a rainy afternoon, or a classroom break, these cute Sanrio-style sheets are ready on any device. No downloads or sign-up required.",
  ],
  categoryIntro:
    "Browse by theme to find the perfect sheet: Friends adventures, Holiday celebrations, or everyday Daily Life scenes.",
};

export const GALLERY_FAQ = [
  {
    question: "Are these Hello Kitty coloring pages free?",
    answer:
      "Yes. Every coloring page on this site is free to use online. Kids can color, save, and print without creating an account.",
  },
  {
    question: "Can I color Hello Kitty pages on a phone or tablet?",
    answer:
      "Yes. The coloring tool is touch-friendly and works on phones, tablets, and desktop browsers.",
  },
  {
    question: "What is Magic Fill coloring?",
    answer:
      "Magic Fill lets kids tap an area on the picture to fill it with their chosen color — great for younger children who want quick, satisfying results.",
  },
  {
    question: "How do I print a Hello Kitty coloring page?",
    answer:
      "Open any picture, color it if you like, then tap Print. You can also save the image and print it from your device later.",
  },
] as const;

export function buildGalleryFaqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: GALLERY_FAQ.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
