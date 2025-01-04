// @ts-check
import { defineConfig } from "astro/config";

import UnoCSS from "unocss/astro";
import yaml from "@rollup/plugin-yaml";
import expressiveCode from "astro-expressive-code";

import remarkDirective from "remark-directive";
import mdx from "@astrojs/mdx";
import icon from "astro-icon";

import cloudflare from "@astrojs/cloudflare";

import sitemap from "@astrojs/sitemap";

import partytown from "@astrojs/partytown";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [yaml()],
    build: {
      assetsDir: "assets",
    },
  },
  compressHTML: false,
  experimental: {},
  devToolbar: {
    enabled: true
  },
  // prefetch: true,
  site: "https://blog.changshaking.com",
  scopedStyleStrategy: "class",
  // trailingSlash: 'always',
  build: {
    format: "directory",
  },
  markdown: {
    shikiConfig: {
      theme: 'everforest-dark',
    },
    syntaxHighlight: 'shiki',
    remarkRehype: {
      footnoteLabel: " ",
    }
  },

  integrations: [UnoCSS(), expressiveCode({
    themeCssSelector: (theme) => {
      return "." + theme.type;
    },
  }), mdx(), sitemap(), partytown(), icon()],
  output: "server",
  adapter: cloudflare(),
});