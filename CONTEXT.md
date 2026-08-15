# Domain model — kratos.blog

Personal static blog (Astro). Vocabulary for architecture and agents.

## Terms

| Term | Meaning |
|------|---------|
| **Post** | A normalized, published entry from the `posts` collection: frontmatter + body, scoped by locale via Content Layer ID prefix (`zh/…`, `en/…`). |
| **pathSlug** | Post identifier without locale prefix (URL segment under `/posts/`). |
| **Locale** | Site language: `zh` (default) or `en`. Encoded in URL prefixes; root `/` is Chinese. |
| **Tag** | Optional label on a Post. URL form is hyphenated (`tagSlug`); frontmatter may use spaces. |
| **Draft** | Canonical unpublished flag. Ingestion accepts legacy `isDraft` once and normalizes it to `draft`; every consumer uses the same publication rule. |
| **Reading stats** | Derived word/char count and minutes from post body (language inferred from content). |
| **Posts module** | Sole runtime adapter over `astro:content` for normalized lists, detail rendering, tags, static paths, and complete RSS items (`src/utils/content.ts`). |
| **Locale module** | Sole seam for language detection, canonical/alternate paths, active navigation, and translation (`src/utils/locale.ts`). |
| **Publishing module** | Sole seam for site identity, canonical/hreflang facts, descriptions, OpenGraph facts, and feed identity (`src/utils/publishing.ts`). |
| **Theme policy** | Pure Auto/dark/light state transitions shared by the no-flash document bootstrap and interactive control (`src/utils/theme.ts`). |

## URL policy

- Chinese home: `/` (also `/zh/`)
- English home: `/en/`
- Posts: `/{locale}/posts/{pathSlug}/`
- Tags index: `/{locale}/tags/` (root `/tags/` also serves Chinese)
- Tag filter: `/{locale}/tags/{tagSlug}/`

## Non-goals (for now)

- Projects portfolio surface (removed until real data exists)
- Wired markdown callout plugins (CSS/deps removed until product need)
- Vercel / Partytown / analytics adapters (static GitHub Pages only)
- MDX parsing until an authored `.mdx` entry exists
- Offline caching/worker interception until offline reading is a product requirement
