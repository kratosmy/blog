# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Readers who visit John Wick's personal blog in Chinese or English to browse and read technical notes, essays, media records, and observations about life.

## Product Purpose

A static personal publishing site that keeps the author's writing easy to discover by date or tag and comfortable to read across desktop and mobile. Success means readers can quickly find an article, switch language or theme when needed, and stay focused on the writing.

## Positioning

A bilingual, hand-authored personal archive that keeps technical and cultural writing together in one quiet, chronological reading experience rather than separating them into product-like content categories.

## Operating Context

Readers typically arrive at the chronological post index, follow a post or tag, read long-form Markdown content, and may switch between Chinese and English or light and dark themes. RSS remains available for subscribers.

## Capabilities and Constraints

- Astro static site deployed to GitHub Pages.
- Chinese is the default locale; English uses `/en/` routes.
- Preserve existing posts, URLs, tags, RSS, language switching, theme switching, reading statistics, and metadata.
- The redesign applies to the full blog: home indexes, post pages, tag pages, and the 404 page.
- Keep the site lightweight and responsive; do not add a backend or fabricate content.

## Brand Commitments

- Site name: John Wick.
- Preserve the current bilingual content and functional behavior.
- Replace the current visual treatment with a cohesive system closely inspired by `https://jeiwan.net/`: narrow editorial column, serif-led typography, chronological archive rhythm, understated underlined links, generous vertical spacing, and minimal ornament.
- Retain a well-crafted dark theme as an adaptation of that reference rather than removing existing functionality.

## Evidence on Hand

- Real bilingual posts live in `src/content/posts/zh/` and `src/content/posts/en/`.
- Locale copy lives in `src/locales/`.
- Current routing and content behavior are implemented under `src/pages/`, `src/layouts/`, `src/components/`, and `src/utils/`.
- No testimonials, audience metrics, commercial claims, or custom photography are available; future work must not invent them.

## Product Principles

1. Reading comes before interface decoration.
2. Preserve the integrity and addressability of the existing archive.
3. Make bilingual and theme controls present but quiet.
4. Let chronology and typography provide the primary wayfinding.
5. Prefer durable static behavior over unnecessary client-side complexity.
