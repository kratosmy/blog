# Domain model — kratos.blog

Personal static blog (Astro). Vocabulary for architecture and agents.

## Terms

| Term | Meaning |
|------|---------|
| **Post** | A published content entry in the `posts` collection: frontmatter + body, scoped by locale via slug prefix (`zh/…`, `en/…`). |
| **pathSlug** | Post path without locale prefix (URL segment under `/posts/`). |
| **Locale** | Site language: `zh` (default) or `en`. Encoded in URL prefixes; root `/` is Chinese. |
| **Tag** | Optional label on a Post. URL form is hyphenated (`tagSlug`); frontmatter may use spaces. |
| **Reading stats** | Derived word/char count and minutes from post body (language inferred from content). |
| **Posts module** | Sole adapter over `astro:content` for list, detail, tags, and RSS mapping (`src/utils/content.ts`). |
| **Locale module** | Sole seam for language detection, home/nav/toggle URLs, and translation (`src/utils/locale.ts`). |

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
