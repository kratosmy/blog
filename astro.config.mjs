// @ts-check
import { defineConfig, envField } from "astro/config";
import vercel from "@astrojs/vercel";

import UnoCSS from "unocss/astro";
import remarkWikiLink from "./src/plugins/wiki-link/index.ts";
import { getPermalinks } from "./src/plugins/wiki-link/getPermalinks.ts";
import yaml from "@rollup/plugin-yaml";
import expressiveCode from "astro-expressive-code";

import remarkDirective from "remark-directive";
import { RDBilibiliPlugin } from "./src/plugins/remark-directive.mjs";
import { InternalLinkPlugin } from "./src/plugins/remark-internal-link.mjs";
import remarkObsidianCallout from "./src/plugins/callout/index.js";
import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [yaml()],
    build: {
      assets: "assets",
    },
  },
  compressHTML: false,
  experimental: {},
  serverIslands: true,

  // prefetch: true,
  site: "https://blog.kratosmy.uk",
  scopedStyleStrategy: "class",
  // trailingSlash: 'always',
  build: {
    format: "directory",
  },
  markdown: {
    syntaxHighlight: false,
    remarkRehype: {
      footnoteLabel: " ",
    },
    remarkPlugins: [
      remarkDirective,
      InternalLinkPlugin,
      [
        remarkWikiLink,
        {
          permalinks: getPermalinks("src/content/posts"),
          pathFormat: "obsidian-short",
          hrefTemplate: (permalink) => {
            const href = permalink.replaceAll("src/content/posts", "/") + "/";
            if (!href.startsWith("/")) return "/" + href;
            return href;
          },
        },
      ],
    ],
  },

  integrations: [
    UnoCSS(),
    expressiveCode({
      themeCssSelector: (theme) => {
        return "." + theme.type;
      },
    }),
    mdx(),
  ],
  output: "server",
  adapter: vercel({
    // functionPerRoute: false
  }),
});
