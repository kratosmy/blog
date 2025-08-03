// @ts-check
import { defineConfig } from 'astro/config'

import yaml from '@rollup/plugin-yaml'
import expressiveCode from 'astro-expressive-code'
import UnoCSS from 'unocss/astro'

import mdx from '@astrojs/mdx'
import icon from 'astro-icon'

import cloudflare from '@astrojs/cloudflare'

import sitemap from '@astrojs/sitemap'

import partytown from '@astrojs/partytown'

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [yaml()],
    build: {
      assetsDir: 'assets',
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['lodash', 'luxon'],
          },
        },
      },
    },
  },
  compressHTML: true,
  devToolbar: {
    enabled: false,
  },
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },
  site: 'https://johnwick.blog',
  scopedStyleStrategy: 'class',
  // trailingSlash: 'always',
  build: {
    format: 'directory',
  },
  markdown: {
    shikiConfig: {
      theme: 'everforest-dark',
    },
    syntaxHighlight: 'shiki',
    remarkRehype: {
      footnoteLabel: ' ',
    },
  },

  integrations: [
    UnoCSS({
      injectReset: false,
    }),
    expressiveCode({
      themeCssSelector: (theme) => {
        return '.' + theme.type
      },
      styleOverrides: {
        borderRadius: '0.5rem',
      },
    }),
    mdx(),
    sitemap(),
    partytown({
      config: {
        forward: ['dataLayer.push'],
      },
    }),
    icon({
      iconDir: 'src/assets/icons',
    }),
  ],
  output: 'server',
  adapter: cloudflare(),
})
