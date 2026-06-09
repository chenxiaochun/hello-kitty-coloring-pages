import {
  COLORING_PAGES,
  type ColoringPage,
} from "@/lib/data/coloring-pages";
import {
  SITE_DESCRIPTION,
  SITE_NAME,
  absoluteUrl,
  getCategoryLabel,
  getColorPageDescription,
  getSiteUrl,
} from "@/lib/seo/site";

export function buildWebsiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: getSiteUrl(),
    inLanguage: "en-US",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${absoluteUrl("/gallery")}?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function buildWebApplicationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: getSiteUrl(),
    applicationCategory: "GameApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    audience: {
      "@type": "PeopleAudience",
      audienceType: "Children",
      suggestedMinAge: 4,
      suggestedMaxAge: 10,
    },
  };
}

export function buildGalleryItemListJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${SITE_NAME} Gallery`,
    description: "Free Hello Kitty coloring pages you can color online.",
    numberOfItems: COLORING_PAGES.length,
    itemListElement: COLORING_PAGES.map((page, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: page.title,
      url: absoluteUrl(`/color/${page.id}`),
      image: absoluteUrl(page.lineArtSrc),
    })),
  };
}

export function buildColorPageJsonLd(page: ColoringPage) {
  const pageUrl = absoluteUrl(`/color/${page.id}`);
  const imageUrl = absoluteUrl(page.lineArtSrc);

  return [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: page.title,
      description: getColorPageDescription(page),
      url: pageUrl,
      inLanguage: "en-US",
      isPartOf: {
        "@type": "WebSite",
        name: SITE_NAME,
        url: getSiteUrl(),
      },
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: imageUrl,
        contentUrl: imageUrl,
        name: `${page.title} line art`,
        description: `Hello Kitty ${page.title} printable coloring page`,
        width: 791,
        height: 527,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "ImageObject",
      name: `${page.title} Hello Kitty Coloring Page`,
      description: getColorPageDescription(page),
      contentUrl: imageUrl,
      url: imageUrl,
      encodingFormat: "image/jpeg",
      width: 791,
      height: 527,
      isAccessibleForFree: true,
      keywords: [
        "Hello Kitty coloring page",
        page.title,
        getCategoryLabel(page.category),
      ].join(", "),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: getSiteUrl(),
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Gallery",
          item: absoluteUrl("/gallery"),
        },
        {
          "@type": "ListItem",
          position: 3,
          name: page.title,
          item: pageUrl,
        },
      ],
    },
  ];
}

export function buildBreadcrumbJsonLd(
  items: { name: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
