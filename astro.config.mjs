// @ts-check
import { defineConfig } from "astro/config";

import UnoCSS from "unocss/astro";
import yaml from "@rollup/plugin-yaml";
import expressiveCode from "astro-expressive-code";

import remarkDirective from "remark-directive";
import mdx from "@astrojs/mdx";

import cloudflare from "@astrojs/cloudflare";

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
  site: "https://blog.changshaking.com",
  scopedStyleStrategy: "class",
  // trailingSlash: 'always',
  build: {
    format: "directory",
  },
  markdown: {
    theme: 'everforest-dark',
    syntaxHighlight: 'shiki',
    remarkRehype: {
      footnoteLabel: " ",
    }
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
  adapter: cloudflare(),
});