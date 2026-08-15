---
name: John Wick
description: A quiet bilingual personal journal built as a chronological bamboo-and-paper archive.
colors:
  paper: "#e7e8dc"
  ink: "#344a38"
  muted-ink: "#536858"
  quiet-ink: "#586b5d"
  rule: "#aeb8aa"
  soft-surface: "#d7dbcf"
  code-surface: "#dfe2d7"
  dark-paper: "#2b2f2b"
  dark-ink: "#d1e3c8"
typography:
  display:
    fontFamily: "Arvo, Noto Serif SC, Source Han Serif SC, Songti SC, Noto Sans CJK SC, Microsoft YaHei, PingFang SC, sans-serif"
    fontSize: "1.875rem"
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Arvo, Noto Serif SC, Source Han Serif SC, Songti SC, Noto Sans CJK SC, Microsoft YaHei, PingFang SC, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  code:
    fontFamily: "Google Sans Code, Source Code Pro, Consolas, monospace"
    fontSize: "0.82rem"
    fontWeight: 400
    lineHeight: 1.6
  article-title:
    fontFamily: "Arvo, Noto Serif SC, Source Han Serif SC, Songti SC, sans-serif"
    fontSize: "clamp(1.85rem, 6vw, 2.35rem)"
    fontWeight: 700
    lineHeight: 1.25
  archive-year:
    fontFamily: "Arvo, Noto Serif SC, Source Han Serif SC, Songti SC, sans-serif"
    fontSize: "2rem"
    fontWeight: 700
    lineHeight: 1.25
  prose-h2:
    fontFamily: "Arvo, Noto Serif SC, Source Han Serif SC, Songti SC, sans-serif"
    fontSize: "1.65rem"
    fontWeight: 700
    lineHeight: 1.3
  prose-h3:
    fontFamily: "Arvo, Noto Serif SC, Source Han Serif SC, Songti SC, sans-serif"
    fontSize: "1.35rem"
    fontWeight: 700
    lineHeight: 1.35
  prose-h4:
    fontFamily: "Arvo, Noto Serif SC, Source Han Serif SC, Songti SC, sans-serif"
    fontSize: "1.1rem"
    fontWeight: 700
    lineHeight: 1.4
  heading-medium:
    fontFamily: "Arvo, Noto Serif SC, Source Han Serif SC, Songti SC, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 700
    lineHeight: 1.25
  heading-small:
    fontFamily: "Arvo, Noto Serif SC, Source Han Serif SC, Songti SC, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 700
    lineHeight: 1.25
  label:
    fontFamily: "Arvo, Noto Serif SC, Source Han Serif SC, Songti SC, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
  small:
    fontFamily: "Arvo, Noto Serif SC, Source Han Serif SC, Songti SC, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: 1.5
  micro:
    fontFamily: "Arvo, Noto Serif SC, Source Han Serif SC, Songti SC, sans-serif"
    fontSize: "0.7rem"
    fontWeight: 400
    lineHeight: 1.5
spacing:
  page-gutter: "1rem"
  archive-gap: "4rem"
  content-width: "38rem"
  touch-target: "2.75rem"
---

# Design System: John Wick

## Overview

**Creative North Star: "The Personal Archive Ledger"**

The blog feels like an author's durable paper journal translated directly to the web: restrained, chronological, and led by typography. It favors immense outer whitespace, a narrow reading measure, visible dates, and ordinary underlined text over product chrome. Bilingual and theme controls remain available but deliberately recede behind the writing.

**Key Characteristics:**
- One centered 38rem editorial column
- Warm bamboo-paper palette with a soft charcoal dark adaptation
- Arvo slab-serif voice for both identity and reading
- Year-led archive rows with a fixed desktop date gutter
- Square, flat surfaces with no cards, pills, gradients, or shadows

## Colors

The palette evokes a misted bamboo grove: warm sage paper, restrained bamboo-green ink, and a soft charcoal night surface. Hierarchy still comes from weight, spacing, and density rather than decorative color.

### Primary
- **Bamboo Ink** (`#344a38`): headings, body copy, active navigation, and links on the warm light field.
- **Mist Paper** (`#e7e8dc`): a sage-tinted reading surface that avoids stark white.

### Neutral
- **Muted Bamboo** (`#536858`): metadata, controls, footer copy, and hover state.
- **Quiet Bamboo** (`#586b5d`): supporting interface detail and scrollbars while retaining AA contrast.
- **Rule** (`#aeb8aa`): table rules and separators.
- **Charcoal Grove** (`#2b2f2b`) and **Moonlit Bamboo** (`#d1e3c8`): a gray-green dark surface and pale-green primary content.

**The Bamboo-Ink Rule.** Navigation, links, focus, selection, and browser surfaces derive from the same bamboo-green family; color creates atmosphere without becoming decoration.

## Typography

- **Display Font:** Arvo with a broad platform CJK serif/sans fallback chain
- **Body Font:** Arvo with a broad platform CJK serif/sans fallback chain
- **Label/Mono Font:** Google Sans Code for code only

**Character:** A sturdy slab serif gives the archive a personal, slightly technical journal voice while remaining readable. Code uses a true monospace because it is content, never decoration.

### Hierarchy
- **Display** (700, `1.875rem`, 1.25): masthead and article titles.
- **Archive Year** (700, `2rem`, 1.25): primary chronological anchors.
- **Body** (400, `1rem`, 1.6): navigation and archive text.
- **Article Body** (400, `1rem`, 1.75): long-form reading.
- **Label** (400–700, `0.75–0.875rem`): dates, metadata, controls, and footer.

**The Serif-First Rule.** Use the reading face for every interface label except actual code or tabular source material.

## Layout

The site is a single centered column capped at `38rem`. Mobile uses a `1rem` gutter; at `800px` the root scale rises from 16px to 18px and horizontal container padding drops to zero. Archive sections are separated by roughly `4rem`. On desktop each row has a `5rem` date column, `2rem` gap, and a wrapping title; on mobile the date stacks above an indented title. Article content uses the full column with headings receiving more space above than below.

## Elevation & Depth

The design is entirely flat. It uses whitespace, typographic weight, neutral tone shifts, and one-pixel rules instead of shadows or floating surfaces.

**The Flat Ledger Rule.** Do not add shadows, floating cards, translucent layers, or decorative depth.

## Shapes

Corners remain square and boundaries are rarely boxed. Underlines are one pixel. Blockquotes use a one-pixel left rule; tables use horizontal rules. Pills are not part of the system.

## Components

### Archive Entry
A quiet date/title pair grouped beneath a large year. The title keeps a native underline; hover draws a second ledger-like rule from left to right while the date darkens. Motion is removed under `prefers-reduced-motion`.

### Navigation
Text-only, compact, and underlined. Active items use ink and 700 weight; inactive items use muted ink. Mobile keeps the same simple row rather than becoming a menu.

### Theme and Language Controls
Small underlined text controls at the masthead's right edge. They retain a 2.75rem touch target, expose localized accessible names, and use no icon container or background. Theme control offers the opposite palette from system mode and a direct return to Auto.

### Article
A back link precedes the title. Date and reading statistics align quietly to the right. Prose remains flat, with square shadowless code blocks, one-pixel blockquote rules, full-width responsive media, and scrollable tables. The ending exposes article topics, chronological newer/older links, and a return to the archive.

### Tags
Tags are plain vertical text links with quiet post counts, never chips or badges. A filtered archive keeps the same year/date anatomy as the main index.

## Do's and Don'ts

### Do:
- **Do** let chronology, whitespace, and typography create hierarchy.
- **Do** wrap long Chinese and English titles at every width.
- **Do** preserve parallel light and dark bamboo roles with independently verified contrast.
- **Do** keep focus rings, selection, and scrollbar colors consistent with ink and paper.
- **Do** keep one page-level heading, localized dates and control names, and 2.75rem touch targets for persistent controls.

### Don't:
- **Don't** use card grids, thumbnails, summaries, or promotional heroes for the archive.
- **Don't** use rounded pills for tags or theme controls.
- **Don't** add gradients, shadows, unrelated accent hues, or decorative icon tiles.
- **Don't** truncate post titles.
