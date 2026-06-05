# Coloring Page Line Art Assets

Each page folder contains a high-quality line art image used by the gallery and coloring canvas.

```
{coloring-page-id}/
  line-art.jpg
```

## Current assets

Imported from [Monday Mandala Hello Kitty coloring pages](https://mondaymandala.com/hello-kitty-coloring-pages/) as visual references. These are intended for development/demo. **Replace with your own licensed artwork before public production.**

| Page ID | Reference theme |
|---------|-----------------|
| `birthday-kitty` | Happy Birthday Hello Kitty |
| `garden-party` | Princess Hello Kitty in Flower Field |
| `best-friends` | Hello Kitty with Pompompurin & Cinnamoroll |
| `spring-picnic` | Hello Kitty Enjoying Picnic |
| `hello-holiday` | Hello Kitty with Present & Christmas Tree |
| `tea-time` | Waitress Hello Kitty Serving Cake |
| `playground-fun` | Hello Kitty Playing in the Pool |
| `starlight-dream` | Winter Hello Kitty Fairy |

## Re-import reference assets

```bash
npm run import:line-art
```

Downloads previews into `_reference/`, crops the bottom watermark strip, and writes `line-art.jpg` for each page.

## Add or replace a page

1. Put your image at `public/assets/coloring-pages/your-id/line-art.jpg` (or `.png`)
2. Add the page in `src/lib/data/coloring-pages.ts`
3. Use portrait images around **791×1000** for best results

## Regenerate placeholder SVGs (legacy)

```bash
npm run generate:line-art
```
