import Link from "next/link";
import {
  CATEGORIES,
  COLORING_PAGES,
  type Category,
} from "@/lib/data/coloring-pages";
import {
  GALLERY_FAQ,
  GALLERY_SEO,
  getCategoryPageCount,
} from "@/lib/seo/page-content";

const CATEGORY_LINKS = CATEGORIES.filter((category) => category.id !== "all");

export function GallerySeoSection() {
  return (
    <section
      aria-labelledby="gallery-seo-heading"
      className="mt-12 space-y-8 rounded-[28px] border-2 border-[var(--kitty-pink)] bg-white px-6 py-8 sm:px-8"
    >
      <div>
        <h2
          id="gallery-seo-heading"
          className="font-display text-xl font-bold text-[var(--bow-red)] sm:text-2xl"
        >
          {GALLERY_SEO.heading}
        </h2>
        {GALLERY_SEO.intro.map((paragraph) => (
          <p
            key={paragraph.slice(0, 32)}
            className="mt-3 text-sm font-medium leading-relaxed text-[var(--ink-soft)] sm:text-base"
          >
            {paragraph}
          </p>
        ))}
        <p className="mt-3 text-sm font-medium leading-relaxed text-[var(--ink-soft)] sm:text-base">
          {GALLERY_SEO.categoryIntro} We currently offer{" "}
          <strong>{COLORING_PAGES.length} free coloring pages</strong> and add
          more regularly.
        </p>
      </div>

      <div>
        <h3 className="font-display text-lg font-bold text-[var(--bow-red)]">
          Browse by Category
        </h3>
        <ul className="mt-3 grid gap-3 sm:grid-cols-3">
          {CATEGORY_LINKS.map((category) => (
            <li key={category.id}>
              <Link
                href={`/gallery?category=${category.id}`}
                className="block rounded-[20px] border-2 border-[var(--soft-pink)] bg-[var(--cream-white)] px-4 py-3 transition-colors hover:bg-[var(--soft-pink)]"
              >
                <span className="font-display text-sm font-bold text-[var(--bow-red)] sm:text-base">
                  Hello Kitty {category.label} Coloring Pages
                </span>
                <span className="mt-1 block text-xs font-semibold text-[var(--ink-soft)]/75">
                  {getCategoryPageCount(category.id as Category)} pictures
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="font-display text-lg font-bold text-[var(--bow-red)]">
          Frequently Asked Questions
        </h3>
        <dl className="mt-4 space-y-4">
          {GALLERY_FAQ.map((item) => (
            <div
              key={item.question}
              className="rounded-[20px] border-2 border-[var(--soft-pink)] bg-[var(--cream-white)] px-4 py-3"
            >
              <dt className="font-display text-sm font-bold text-[var(--bow-red)] sm:text-base">
                {item.question}
              </dt>
              <dd className="mt-2 text-sm font-medium leading-relaxed text-[var(--ink-soft)]">
                {item.answer}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
