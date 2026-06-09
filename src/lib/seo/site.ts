import type { Metadata } from "next";
import type { ColoringPage } from "@/lib/data/coloring-pages";

export const SITE_NAME = "Hello Kitty Coloring Pages";
export const SITE_TAGLINE = "Free Online Coloring for Kids";
export const SITE_DESCRIPTION =
  "Browse 50+ free Hello Kitty coloring pages online. Paint with brush or magic fill, save your art, and print — fun for kids on phone, tablet, or desktop.";
export const SITE_KEYWORDS = [
  "Hello Kitty coloring pages",
  "Hello Kitty coloring",
  "free coloring pages",
  "online coloring for kids",
  "Sanrio coloring pages",
  "printable coloring pages",
  "kids coloring games",
  "magic fill coloring",
  "cute cat coloring",
  "Hello Kitty printables",
];

const FALLBACK_SITE_URL = "http://localhost:3000";

export function getSiteUrl(): string {
  const url =
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : FALLBACK_SITE_URL);

  return url.replace(/\/$/, "");
}

export function absoluteUrl(path = "/"): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${getSiteUrl()}${normalizedPath}`;
}

export const DEFAULT_OG_IMAGE = "/assets/coloring-pages/birthday-kitty/line-art.jpg";

export function buildPageTitle(title: string): string {
  return `${title} | ${SITE_NAME}`;
}

export function getColorPageTitle(page: ColoringPage): string {
  return `${page.title} – Free Hello Kitty Coloring Page`;
}

export function getColorPageDescription(page: ColoringPage): string {
  const categoryHint =
    page.category === "holidays"
      ? "holiday-themed"
      : page.category === "friends"
        ? "friends-themed"
        : "everyday";

  return `Color "${page.title}" online for free! A ${categoryHint} Hello Kitty coloring page with brush and magic fill. Save, print, and play — made for kids.`;
}

export function getCategoryLabel(category: ColoringPage["category"]): string {
  switch (category) {
    case "friends":
      return "Friends";
    case "holidays":
      return "Holidays";
    case "daily-life":
      return "Daily Life";
    default:
      return "Coloring";
  }
}

export function createSharedMetadata(overrides: Metadata = {}): Metadata {
  const siteUrl = getSiteUrl();

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: SITE_NAME,
      template: `%s | ${SITE_NAME}`,
    },
    description: SITE_DESCRIPTION,
    keywords: SITE_KEYWORDS,
    applicationName: SITE_NAME,
    category: "kids",
    creator: SITE_NAME,
    publisher: SITE_NAME,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: SITE_NAME,
      title: SITE_NAME,
      description: SITE_DESCRIPTION,
      url: siteUrl,
      images: [
        {
          url: DEFAULT_OG_IMAGE,
          width: 791,
          height: 527,
          alt: "Hello Kitty birthday coloring page preview",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: SITE_NAME,
      description: SITE_DESCRIPTION,
      images: [DEFAULT_OG_IMAGE],
    },
    alternates: {
      canonical: siteUrl,
    },
    ...overrides,
  };
}

export function createColorPageMetadata(page: ColoringPage): Metadata {
  const title = getColorPageTitle(page);
  const description = getColorPageDescription(page);
  const canonicalPath = `/color/${page.id}`;

  return {
    title,
    description,
    keywords: [
      ...SITE_KEYWORDS,
      page.title,
      `${page.title} coloring page`,
      `Hello Kitty ${page.title}`,
      getCategoryLabel(page.category),
    ],
    openGraph: {
      title,
      description,
      url: absoluteUrl(canonicalPath),
      type: "website",
      images: [
        {
          url: page.lineArtSrc,
          width: 791,
          height: 527,
          alt: `${page.title} Hello Kitty coloring page line art`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [page.lineArtSrc],
    },
    alternates: {
      canonical: canonicalPath,
    },
  };
}
