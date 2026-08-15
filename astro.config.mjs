// @ts-check
import { unified } from '@astrojs/markdown-remark'
import sitemap from '@astrojs/sitemap'
import yaml from '@rollup/plugin-yaml'
import expressiveCode from 'astro-expressive-code'
import { defineConfig } from 'astro/config'

/** Keep the page title as the sole h1 while preserving Markdown section order. */
function demoteMarkdownH1() {
  return (tree) => {
    const nodes = [tree]
    while (nodes.length > 0) {
      const node = nodes.pop()
      if (!node || typeof node !== 'object') continue
      if (node.type === 'element' && node.tagName === 'h1') node.tagName = 'h2'
      if (Array.isArray(node.children)) nodes.push(...node.children)
    }
  }
}

export default defineConfig({
  vite: {
    plugins: [yaml()],
  },
  compressHTML: true,
  devToolbar: {
    enabled: false,
  },
  prefetch: false,
  site: 'https://blog.changshaking.xyz',
  scopedStyleStrategy: 'class',
  build: {
    format: 'directory',
    inlineStylesheets: 'auto',
    assets: '_astro',
  },
  markdown: {
    processor: unified({
      rehypePlugins: [demoteMarkdownH1],
      remarkRehype: {
        footnoteLabel: ' ',
      },
    }),
  },
  integrations: [
    expressiveCode({
      themes: ['catppuccin-latte', 'catppuccin-mocha'],
      emitExternalStylesheet: true,
      removeUnusedThemes: true,
      shiki: {
        bundledLangs: ['c', 'cpp'],
      },
      frames: false,
      textMarkers: false,
      themeCssSelector: (theme) => `.${theme.type}`,
      useDarkModeMediaQuery: false,
      styleOverrides: {
        borderRadius: '0',
        borderWidth: '0',
        codeFontFamily:
          '"Google Sans Code", "Fira Code", "JetBrains Mono", Consolas, "Courier New", monospace',
      },
    }),
    sitemap(),
  ],
  output: 'static',
})
