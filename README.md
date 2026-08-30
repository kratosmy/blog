# John Wick

Bilingual personal archive at [blog.changshaking.xyz](https://blog.changshaking.xyz).
Chinese is the default locale; English lives under `/en/`.

Static Astro on GitHub Pages. The only client script is the theme island.

## Artifact budgets

`scripts/verify-build.mjs` refuses a `dist/` that breaks these:

| Check | Limit |
| --- | --- |
| HTML pages | 53 |
| Total | ≤ 2 MiB |
| CSS, including inline | ≤ 32 KiB |
| External JS | ≤ 8 KiB |
| Fonts | ≤ 50 KiB, WOFF2 only |
| Stylesheets | none — all CSS is inlined |
| Forbidden | Service Worker, `.gz` sidecars, `_headers`, unreferenced JS, GitHub-hosted social image |

## Commands

```bash
pnpm install
pnpm test
pnpm build
pnpm dev
```

Content lives in the `src/content` submodule.

## Hosting

GitHub Pages does not honor `_headers`. The verifier rejects publishing one. If Cloudflare sits in front:

1. Turn off Web Analytics. The injected `beacon.min.js` is larger than all first-party JS.
2. Cache `_astro/*` at the edge for a year. Those files are content-hashed.

See [CONTEXT.md](CONTEXT.md) for the domain model and [DESIGN.md](DESIGN.md) for the visual system.
