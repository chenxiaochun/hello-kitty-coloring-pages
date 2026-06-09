import Link from "next/link";
import { ColoringPageCard } from "@/components/gallery/ColoringPageCard";
import { CATEGORIES, type ColoringPage } from "@/lib/data/coloring-pages";
import {
  getColorPageBodyParagraphs,
  getColorPageHeading,
  getColorPageIntro,
  getColorPageTips,
  getRelatedPages,
} from "@/lib/seo/page-content";
import { getCategoryLabel } from "@/lib/seo/site";

type ColorPageSeoSectionProps = {
  page: ColoringPage;
};

export function ColorPageSeoSection({ page }: ColorPageSeoSectionProps) {
  const relatedPages = getRelatedPages(page);
  const categoryLabel = getCategoryLabel(page.category);
  const categoryHref = `/gallery?category=${page.category}`;

  return (
    <section
      aria-labelledby="color-page-seo-heading"
      className="border-t-2 border-[var(--soft-pink)] bg-white px-4 py-10 sm:px-6"
    >
      <div className="mx-auto max-w-3xl">
        <h2
          id="color-page-seo-heading"
          className="font-display text-xl font-bold text-[var(--bow-red)] sm:text-2xl"
        >
          {getColorPageHeading(page)}
        </h2>
        <p className="mt-3 text-sm font-medium leading-relaxed text-[var(--ink-soft)] sm:text-base">
          {getColorPageIntro(page)}
        </p>
        {getColorPageBodyParagraphs(page).map((paragraph) => (
          <p
            key={paragraph.slice(0, 40)}
            className="mt-3 text-sm font-medium leading-relaxed text-[var(--ink-soft)] sm:text-base"
          >
            {paragraph}
          </p>
        ))}

        <div className="mt-6 rounded-[20px] border-2 border-[var(--soft-pink)] bg-[var(--cream-white)] px-4 py-4">
          <h3 className="font-display text-base font-bold text-[var(--bow-red)]">
            Coloring Tips for Kids
          </h3>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm font-medium text-[var(--ink-soft)]">
            {getColorPageTips().map((tip) => (
              <li key={tip}>{tip}</li>
            ))}
          </ul>
        </div>

        <p className="mt-6 text-sm font-medium text-[var(--ink-soft)]">
          More in this collection:{" "}
          <Link
            href={categoryHref}
            className="font-bold text-[var(--bow-red)] underline decoration-[var(--kitty-pink)] underline-offset-2"
          >
            Hello Kitty {categoryLabel} coloring pages
          </Link>
          {" · "}
          <Link
            href="/gallery"
            className="font-bold text-[var(--bow-red)] underline decoration-[var(--kitty-pink)] underline-offset-2"
          >
            View full gallery
          </Link>
        </p>
      </div>

      {relatedPages.length > 0 ? (
        <div className="mx-auto mt-10 max-w-5xl">
          <h3 className="font-display text-lg font-bold text-[var(--bow-red)]">
            You Might Also Like
          </h3>
          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {relatedPages.map((related) => (
              <ColoringPageCard key={related.id} page={related} />
            ))}
          </div>
        </div>
      ) : null}

      <nav
        aria-label="Category links"
        className="mx-auto mt-8 flex max-w-3xl flex-wrap gap-2"
      >
        {CATEGORIES.filter((category) => category.id !== "all").map(
          (category) => (
            <Link
              key={category.id}
              href={`/gallery?category=${category.id}`}
              className="min-h-10 rounded-full border-2 border-[var(--kitty-pink)] bg-[var(--soft-pink)] px-4 py-2 font-display text-xs font-bold text-[var(--bow-red)] active:scale-95 sm:text-sm"
            >
              {category.label}
            </Link>
          ),
        )}
      </nav>
    </section>
  );
}
