# Coloring Page Line Art Assets

Each page folder contains a high-quality line art image used by the gallery and coloring canvas.

```
{coloring-page-id}/
  line-art.jpg
```

## Current assets

20 **AI-generated Hello Kitty** coloring pages. Source PNGs live in `_ai-source/` (gitignored); processed JPGs are committed under this folder.

## Install from AI source PNGs

After adding or updating PNGs in `_ai-source/` and entries in `src/lib/data/coloring-page-catalog.json`:

```bash
npm run install:ai-line-art
```

Resizes to ~791px wide and writes `line-art.jpg` for each catalog entry.

## Add a new page

1. Add `{sourceFile}.png` to `_ai-source/`
2. Add the page to `src/lib/data/coloring-page-catalog.json`
3. Run `npm run install:ai-line-art`
