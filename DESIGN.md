---
name: John Wick
description: A quiet bilingual personal journal built as a chronological paper-and-ink archive.
colors:
  paper: "#fbfbfb"
  ink: "#303030"
  muted-ink: "#686868"
  quiet-ink: "#85817b"
  rule: "#c9c6c0"
  soft-surface: "#e9e7e3"
  code-surface: "#efede9"
  dark-paper: "#1c1b1a"
  dark-ink: "#ebe8e2"
typography:
  display:
    fontFamily: "Arvo, Noto Serif SC, Songti SC, STSong, SimSun, serif"
    fontSize: "1.875rem"
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Arvo, Noto Serif SC, Songti SC, STSong, SimSun, serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  code:
    fontFamily: "Google Sans Code, Source Code Pro, Consolas, monospace"
    fontSize: "0.82rem"
    fontWeight: 400
    lineHeight: 1.6
spacing:
  page-gutter: "1rem"
  archive-gap: "4rem"
  content-width: "38rem"
---

# Design System: John Wick

## Overview

**Creative North Star: "The Personal Archive Ledger"**

The blog feels like an author's durable paper journal translated directly to the web: restrained, chronological, and led by typography. It favors immense outer whitespace, a narrow reading measure, visible dates, and ordinary underlined text over product chrome. Bilingual and theme controls remain available but deliberately recede behind the writing.

**Key Characteristics:**
- One centered 38rem editorial column
- Paper-and-ink neutral palette with a faithful dark adaptation
- Arvo slab-serif voice for both identity and reading
- Year-led archive rows with a fixed desktop date gutter
- Square, flat surfaces with no cards, pills, gradients, or shadows

## Colors

The palette uses warm near-neutrals so hierarchy comes from weight, spacing, and density rather than accent color.

### Primary
- **Ink** (`#303030`): headings, body copy, active navigation, and links on the light paper field.
- **Paper** (`#fbfbfb`): the uninterrupted light surface.

### Neutral
- **Muted Ink** (`#686868`): metadata, controls, footer copy, and hover state.
- **Quiet Ink** (`#85817b`): supporting interface detail and scrollbars.
- **Rule** (`#c9c6c0`): table rules and separators.
- **Dark Paper** (`#1c1b1a`) and **Dark Ink** (`#ebe8e2`): dark-theme surface and primary content.

**The Ink-Only Rule.** Do not introduce a brand accent for navigation or links; the writing stays monochrome.

## Typography

**Display Font:** Arvo with Chinese serif fallbacks  
**Body Font:** Arvo with Chinese serif fallbacks  
**Label/Mono Font:** Google Sans Code for code only

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
Small underlined text controls at the masthead's right edge. They retain at least a 2rem hit target, expose accessible names, and use no icon container or background.

### Article
A back link precedes the title. Date and reading statistics align quietly to the right. Prose remains flat, with square code blocks, one-pixel blockquote rules, full-width responsive media, and scrollable tables.

### Tags
Tags are plain vertical text links, never chips or badges. A filtered archive keeps the same year/date anatomy as the main index.

## Do's and Don'ts

### Do:
- **Do** let chronology, whitespace, and typography create hierarchy.
- **Do** wrap long Chinese and English titles at every width.
- **Do** preserve parallel light and dark neutral roles.
- **Do** keep focus rings, selection, and scrollbar colors consistent with ink and paper.

### Don't:
- **Don't** use card grids, thumbnails, summaries, or promotional heroes for the archive.
- **Don't** use rounded pills for tags or theme controls.
- **Don't** add gradients, shadows, colored accents, or decorative icon tiles.
- **Don't** truncate post titles.
