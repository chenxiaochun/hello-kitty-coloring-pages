#!/usr/bin/env node
/**
 * Batch "Request Indexing" in Google Search Console (must be logged in).
 *
 * Usage:
 *   node scripts/gsc-request-indexing.mjs
 *   node scripts/gsc-request-indexing.mjs --day 1
 *   node scripts/gsc-request-indexing.mjs --start 10 --limit 10
 *
 * Opens Chrome with your profile. Keep the GSC tab in foreground; don't click away.
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const SITE = "https://hello-kitty-coloring-pages.fun";
const RESOURCE = "sc-domain:hello-kitty-coloring-pages.fun";
const LOG_PATH = path.join(ROOT, "marketing/gsc-indexing-log.json");
const PLAN_PATH = path.join(ROOT, "marketing/gsc-indexing-plan.json");

const catalog = JSON.parse(
  readFileSync(
    path.join(ROOT, "src/lib/data/coloring-page-catalog.json"),
    "utf8",
  ),
);

const ALL_URLS = [
  `${SITE}/`,
  `${SITE}/gallery`,
  ...catalog.map((p) => `${SITE}/color/${p.id}`),
];

function parseArgs() {
  const args = process.argv.slice(2);
  let start = 0;
  let limit = ALL_URLS.length;
  let day = null;
  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--start") start = Number(args[++i] ?? 0);
    if (args[i] === "--limit") limit = Number(args[++i] ?? limit);
    if (args[i] === "--day") day = Number(args[++i]);
  }

  if (day != null) {
    const plan = JSON.parse(readFileSync(PLAN_PATH, "utf8"));
    const entry = plan.days.find((d) => d.day === day);
    if (!entry) {
      throw new Error(`Day ${day} not found in ${PLAN_PATH}`);
    }
    console.log(`Day ${day} (${entry.date}): ${entry.label}`);
    return entry.urls;
  }

  return ALL_URLS.slice(start, start + limit);
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function inspectAndRequest(page, url) {
  const searchInput = page.locator('input[aria-label*="检查"]');
  await searchInput.click();
  await searchInput.fill(url);
  await sleep(400);
  await page.getByRole("button", { name: "搜索" }).click();
  await sleep(8000);

  const bodyText = await page.locator("body").innerText();
  const indexed =
    bodyText.includes("网址已收录") || bodyText.includes("网页已编入索引");
  const notIndexed =
    bodyText.includes("网址尚未收录") || bodyText.includes("未编入索引");

  const requestBtn = page.getByRole("button", { name: /请求编入索引/ });
  let requested = false;
  let requestError = null;

  if (await requestBtn.count()) {
    try {
      await requestBtn.first().click({ timeout: 5000 });
      requested = true;
      await sleep(5000);
      const confirm = page.getByRole("button", {
        name: /^(确定|知道了|提交|关闭)$/,
      });
      if (await confirm.count()) {
        await confirm.first().click().catch(() => {});
        await sleep(1500);
      }
    } catch (error) {
      requestError = String(error);
    }
  }

  return { url, indexed, notIndexed, requested, requestError };
}

async function main() {
  const urls = parseArgs();
  mkdirSync(path.dirname(LOG_PATH), { recursive: true });

  const userDataDir = path.join(
    process.env.HOME ?? "",
    "Library/Application Support/Google/Chrome",
  );

  console.log(`Requesting indexing for ${urls.length} URLs...`);
  console.log("If Chrome asks to quit other instances, close Chrome and re-run.\n");

  const context = await chromium.launchPersistentContext(userDataDir, {
    channel: "chrome",
    headless: false,
    viewport: { width: 1400, height: 900 },
    args: ["--profile-directory=Default"],
  });

  const page = context.pages()[0] ?? (await context.newPage());
  await page.goto(
    `https://search.google.com/search-console?resource_id=${encodeURIComponent(RESOURCE)}`,
    { waitUntil: "domcontentloaded" },
  );
  await sleep(3000);

  const results = [];
  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    process.stdout.write(`[${i + 1}/${urls.length}] ${url} ... `);
    try {
      const result = await inspectAndRequest(page, url);
      results.push(result);
      console.log(
        result.requested
          ? "requested"
          : result.indexed
            ? "already indexed"
            : "skipped",
      );
    } catch (error) {
      const fail = { url, error: String(error) };
      results.push(fail);
      console.log("error");
    }
    await sleep(2000);
  }

  let existing = [];
  try {
    existing = JSON.parse(readFileSync(LOG_PATH, "utf8"));
  } catch {
    existing = [];
  }
  writeFileSync(
    LOG_PATH,
    JSON.stringify([...existing, ...results], null, 2),
  );

  console.log(`\nDone. Log: ${LOG_PATH}`);
  await context.close();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
