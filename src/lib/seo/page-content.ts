import {
  COLORING_PAGES,
  type Category,
  type ColoringPage,
} from "@/lib/data/coloring-pages";
import { getCategoryLabel } from "@/lib/seo/site";

/**
 * Unique, page-specific scene descriptions.
 * Keeping these distinct per page prevents 50+ near-duplicate coloring pages
 * (which suppresses indexing) and adds relevant, theme-specific keywords.
 */
const PAGE_SCENES: Record<string, string> = {
  "birthday-kitty":
    "balloons, a frosted birthday cake, and cheerful party hats",
  "garden-kitty":
    "blooming flowers, leafy vines, and butterflies drifting through a sunny garden",
  "best-friends-kitty":
    "Hello Kitty hugging a best friend surrounded by little hearts and bows",
  "spring-picnic-kitty":
    "a picnic blanket, a basket of treats, and fresh springtime flowers",
  "holiday-kitty": "a big festive bow and sparkling holiday ornaments",
  "tea-time-kitty":
    "a cozy teapot, matching teacups, and a plate of sweet cookies",
  "playground-kitty": "a slide, swings, and a sandbox full of playground fun",
  "starlight-kitty": "twinkling stars, a crescent moon, and dreamy soft clouds",
  "boba-kitty": "a tall cup of bubble tea with a wide straw and round pearls",
  "butterfly-kitty":
    "a breezy meadow filled with fluttering butterflies and wildflowers",
  "unicorn-kitty":
    "a magical unicorn with a flowing mane, a spiral horn, and sparkles",
  "beach-kitty":
    "a sandy beach with a bucket, a spade, and gentle rolling waves",
  "rainy-kitty": "an umbrella, rain boots, and splashy puddles with raindrops",
  "reading-kitty": "a comfy reading chair and a cozy stack of storybooks",
  "baking-kitty": "a mixing bowl, a rolling pin, and a warm tray of cookies",
  "halloween-kitty": "a carved pumpkin, a pointy witch hat, and swooping bats",
  "valentine-kitty": "floating hearts, a rose, and a sweet little love letter",
  "snow-kitty": "falling snowflakes, a cozy scarf, and a cheerful snowman",
  "space-kitty": "a rocket ship, ringed planets, and bright shining stars",
  "music-kitty": "dancing musical notes, a microphone, and a little guitar",
  "easter-kitty": "decorated Easter eggs and a friendly hopping bunny",
  "pool-kitty": "a sparkling pool, a float ring, and splashes of water",
  "camping-kitty": "a tent, a crackling campfire, and tall pine trees",
  "fishing-kitty": "a fishing rod, a little boat, and fish leaping from the water",
  "skating-kitty": "shiny ice skates, snowflakes, and a smooth frozen pond",
  "soccer-kitty": "a soccer ball, a goal net, and a grassy playing field",
  "painter-kitty": "a paint palette, a set of brushes, and an artist's easel",
  "kite-kitty": "a diamond kite with a long ribbon tail in a breezy sky",
  "bicycle-kitty": "a bicycle with a woven basket and a shiny ringing bell",
  "daniel-kitty":
    "Hello Kitty spending the day with her friend Dear Daniel",
  "gift-kitty": "wrapped presents topped with big, curly ribbon bows",
  "candy-kitty": "swirly lollipops, candy canes, and jars of sweet treats",
  "rainbow-kitty": "a bright arching rainbow, fluffy clouds, and warm sunshine",
  "pirate-kitty": "a pirate hat, a rolled treasure map, and a sailing ship",
  "sleepy-kitty": "a cozy bed, a soft night cap, and a sleepy crescent moon",
  "school-kitty": "a backpack, sharpened pencils, and a stack of school books",
  "library-kitty": "tall bookshelves and an armful of borrowed library books",
  "train-kitty":
    "a choo-choo train with round wheels and puffs of steam",
  "airplane-kitty": "an airplane, fluffy clouds, and a packed travel suitcase",
  "farm-kitty": "a red barn, friendly farm animals, and a bale of hay",
  "ballet-kitty": "a twirly tutu, ballet slippers, and flowing ribbons",
  "gardening-kitty": "a watering can, flower pots, and tiny new seedlings",
  "supermarket-kitty": "a shopping cart brimming with groceries and snacks",
  "hot-air-balloon-kitty":
    "a colorful hot air balloon floating gently over rolling hills",
  "dentist-kitty": "a toothbrush, a shiny happy tooth, and a big smile",
  "thanksgiving-kitty":
    "a turkey feast, round pumpkins, and colorful autumn leaves",
  "fireworks-kitty": "bursting fireworks lighting up the night sky",
  "new-year-kitty": "party horns, falling confetti, and a countdown clock",
  "mothers-day-kitty":
    "a bouquet of flowers and a heart-filled card for mom",
  "pumpkin-patch-kitty": "rows of round pumpkins and twisting autumn vines",
  "pajama-party-kitty":
    "cozy pajamas, fluffy pillows, and slippers ready for a sleepover",
  "picnic-friends-kitty":
    "a picnic blanket in the park with friends and tasty snacks",
  "my-melody-kitty":
    "Hello Kitty's friend My Melody in her hood with a warm cup of tea",
};

export function getColorPageScene(page: ColoringPage): string | undefined {
  return PAGE_SCENES[page.id];
}

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
  const scene = PAGE_SCENES[page.id];
  const sceneSentence = scene
    ? ` This picture features ${scene}, all drawn as clean black-and-white line art waiting for your colors.`
    : "";

  return `Welcome to our ${page.title} Hello Kitty coloring page — a ${categoryLabel} design you can color online for free.${sceneSentence} It works right in your browser on phones, tablets, and computers, so kids can start creating in seconds.`;
}

export function getColorPageBodyParagraphs(page: ColoringPage): string[] {
  const categoryLabel = getCategoryLabel(page.category);
  const scene = PAGE_SCENES[page.id];
  const sceneLine = scene
    ? `As you color this ${page.title.toLowerCase()} scene, look for ${scene} to bring to life with your favorite shades. `
    : "";

  return [
    `Use the brush tool to draw freely, switch to Magic Fill to tap and color large areas, or combine both for a neat finished picture. When you are done, tap Save to download your artwork or keep it in My Art, and use Print if you want a paper copy for crayons and markers.`,
    `${sceneLine}This ${page.title.toLowerCase()} sheet is part of our ${categoryLabel} collection. It is designed for children ages 4–10 who love Hello Kitty, cute characters, and creative play. No account is required — just pick your colors and enjoy.`,
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

export const HOME_SEO = {
  heading: "Color Hello Kitty Online — Free, Fun, and No Downloads",
  intro: [
    "Hello Kitty Coloring Pages is a free online coloring playground made for kids. Choose from dozens of hand-drawn Hello Kitty pictures — birthdays, beaches, holidays, unicorns, and more — then color them right in your browser. There is nothing to install and no account to create.",
    "Every picture is a clean black-and-white line drawing, just like a printable coloring book, so children can fill each area with any colors they imagine. Grown-ups can use it as a quiet-time activity, a rainy-day boredom buster, or a screen-friendly creative break.",
  ],
  steps: [
    {
      title: "1. Pick a picture",
      body: "Browse the gallery or tap Surprise Me to open a random Hello Kitty coloring page.",
    },
    {
      title: "2. Color it in",
      body: "Paint with the brush or tap Magic Fill to flood a whole area with your chosen color.",
    },
    {
      title: "3. Save or print",
      body: "Download your finished art, keep it in My Art, or print it out for crayons and markers.",
    },
  ],
  reasons: [
    "Completely free with no sign-up, ads-free coloring for kids.",
    "Touch-friendly for phones and tablets, plus mouse support on computers.",
    "Magic Fill makes coloring quick and satisfying for younger children.",
    "Undo, save, and print so no picture is ever ruined.",
  ],
};

export const HOME_FAQ = [
  {
    question: "Do I need to download anything to color Hello Kitty pages?",
    answer:
      "No. Everything runs in your web browser. Just open a picture and start coloring — there is nothing to install and no sign-up.",
  },
  {
    question: "How many Hello Kitty coloring pages are there?",
    answer: `There are currently ${COLORING_PAGES.length} free Hello Kitty coloring pages across Friends, Holidays, and Daily Life themes, with new ones added regularly.`,
  },
  {
    question: "Is this Hello Kitty coloring site good for young kids?",
    answer:
      "Yes. It is designed for children ages 4–10. Magic Fill lets little ones color large areas with a single tap, while the brush is great for kids who want more detail.",
  },
] as const;

export function buildHomeFaqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: HOME_FAQ.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
