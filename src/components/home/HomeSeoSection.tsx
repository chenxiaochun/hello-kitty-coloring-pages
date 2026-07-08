import Link from "next/link";
import {
  CATEGORIES,
  type Category,
} from "@/lib/data/coloring-pages";
import {
  HOME_FAQ,
  HOME_SEO,
  getCategoryPageCount,
} from "@/lib/seo/page-content";

const CATEGORY_LINKS = CATEGORIES.filter((category) => category.id !== "all");

export function HomeSeoSection() {
  return (
    <section
      aria-labelledby="home-seo-heading"
      className="mx-4 mt-4 space-y-8 rounded-[28px] border-2 border-[var(--kitty-pink)] bg-white px-6 py-8 sm:mx-6 sm:px-8"
    >
      <div>
        <h2
          id="home-seo-heading"
          className="font-display text-xl font-bold text-[var(--bow-red)] sm:text-2xl"
        >
          {HOME_SEO.heading}
        </h2>
        {HOME_SEO.intro.map((paragraph) => (
          <p
            key={paragraph.slice(0, 32)}
            className="mt-3 text-sm font-medium leading-relaxed text-[var(--ink-soft)] sm:text-base"
          >
            {paragraph}
          </p>
        ))}
      </div>

      <div>
        <h3 className="font-display text-lg font-bold text-[var(--bow-red)]">
          How It Works
        </h3>
        <ol className="mt-3 grid gap-3 sm:grid-cols-3">
          {HOME_SEO.steps.map((step) => (
            <li
              key={step.title}
              className="rounded-[20px] border-2 border-[var(--soft-pink)] bg-[var(--cream-white)] px-4 py-3"
            >
              <span className="font-display text-sm font-bold text-[var(--bow-red)] sm:text-base">
                {step.title}
              </span>
              <span className="mt-1 block text-xs font-semibold text-[var(--ink-soft)]/80 sm:text-sm">
                {step.body}
              </span>
            </li>
          ))}
        </ol>
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
          Why Kids Love It
        </h3>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm font-medium leading-relaxed text-[var(--ink-soft)] sm:text-base">
          {HOME_SEO.reasons.map((reason) => (
            <li key={reason}>{reason}</li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="font-display text-lg font-bold text-[var(--bow-red)]">
          Frequently Asked Questions
        </h3>
        <dl className="mt-4 space-y-4">
          {HOME_FAQ.map((item) => (
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
