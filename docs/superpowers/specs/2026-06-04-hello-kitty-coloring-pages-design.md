# Hello Kitty Coloring Pages — Design Spec

**Date:** 2026-06-04  
**Status:** Approved

## Overview

An English-only coloring pages website for children. Primary flow: browse a gallery of line-art pages, then open a full-screen online coloring experience. Visual direction: classic Hello Kitty pink (A) with light candy accents (B).

## Audience & Goals

- **Primary users:** Children (ages ~4–10)
- **Core features:** Gallery browse + online coloring (both required)
- **Language:** English only, no i18n
- **Device priority:** Touch-first (tablets and phones)

## Information Architecture

```
Home (/)
├── Hero banner
├── Quick actions: Browse Gallery · Start Coloring · Popular
└── Today's Picks (horizontal scroll)

Gallery (/gallery)
├── Category filter: All · Friends · Holidays · Daily Life
└── Grid of coloring page cards

Color (/color/[id])
├── Full-screen canvas
├── Bottom toolbar: colors · brush · eraser · undo · clear
└── Top bar: Back · Save · Print
```

**Navigation:** Bottom tab bar — Home · Gallery · (future: My Art)

## Visual Design

### Keywords

Classic Kitty Pink · Rounded · Bows · Polka dots · Light sparkle

### Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `--kitty-pink` | `#FF6B9D` | Buttons, headings, active states |
| `--soft-pink` | `#FFE4EC` | Card backgrounds, sections |
| `--cream-white` | `#FFFBF7` | Page background |
| `--bow-red` | `#E84C6F` | Primary CTA, bow accents |
| `--candy-yellow` | `#FFD166` | Category tags |
| `--candy-blue` | `#7EC8E3` | Category tags |
| `--candy-purple` | `#C9A0FF` | Category tags |
| `--ink-soft` | `#5C4A5A` | Body text, line art borders |

**Rule:** 70% pink/white · 20% red/deep pink · 10% candy accents. No full-page rainbow gradients.

### Typography

| Role | Font |
|------|------|
| Display / headings | Fredoka |
| Body / UI | Nunito |

Minimum tap target: 48×48px. Icons always paired with text labels.

### Shape & Components

- Card radius: 24px
- Button radius: 999px (pill), min height 56px
- Cards: white fill, 2px pink border, soft shadow
- Active press: `scale(0.96)`

### Decor (light B accent)

- Corner sparkles/stars at 20–40% opacity
- Polka-dot background pattern
- Wavy or dotted dividers
- No excessive animation or glitter overload

### Motion

- Page enter: staggered fade-up (80ms delay)
- Button hover: slight scale up; active: scale down
- Coloring: color-swatch pop on select
- Keep animations short and soft

## Copy (English)

| Context | Text |
|---------|------|
| Site title | Hello Kitty Coloring Pages |
| Nav | Home · Gallery · Color |
| Home CTAs | Browse Gallery · Start Coloring · Popular |
| Categories | All · Friends · Holidays · Daily Life |
| Color toolbar | Back · Save · Print · Undo · Clear |
| Empty state | No coloring pages yet — check back soon! |

## Accessibility

- Contrast ratio ≥ 4.5:1 for text
- Touch targets ≥ 48px
- Icon + label on all interactive elements

## Out of Scope (v1)

- User accounts / saved artwork persistence
- Multi-language support
- Print-optimized PDF generation (Print button is UI placeholder)
