// uno.config.ts
import {
  defineConfig,
  presetMini,
  presetTypography,
  presetUno,
  presetIcons,
  transformerDirectives,
} from 'unocss'

export default defineConfig({
  injectReset: false,
  mode: 'per-module',
  injectEntry: process.env['NODE_ENV'] === 'development',
  transformers: [transformerDirectives()],
  presets: [
    presetUno(),
    presetIcons({
      collections: {
        tabler: () =>
          import('@iconify/json/json/tabler.json').then((i) => i.default),
        hugeicons: () =>
          import('@iconify/json/json/hugeicons.json').then((i) => i.default),
        'line-md': () =>
          import('@iconify/json/json/line-md.json').then((i) => i.default),
        ph: () => import('@iconify/json/json/ph.json').then((i) => i.default),
      },
    }),
    presetTypography({
      cssExtend: {
        a: {
          'font-size': '.9em',
        },
        li: {
          'word-break': 'break-all',
        },
        'li code': {
          'white-space': 'pre-wrap',
          'word-break': 'break-word',
          margin: '0.2rem',
          padding: '0.15em 0.3em',
          'border-radius': '0.2em',
          'background-color': 'var(--color-code-bg)',
          'font-family':
            '"Google Sans Code", "Fira Code", "JetBrains Mono", Consolas, "Courier New", monospace',
        },
        'li code::after': {
          content: 'none',
        },
        'li code::before': {
          content: 'none',
        },
        'a:hover': {
          color: 'rgb(var(--color-text-link-hover))',
        },
        'pre,code': {
          'white-space': 'pre-wrap',
          'word-break': 'break-word',
          margin: '0.2rem',
          padding: '0.15em 0.3em',
          'border-radius': '0.2em',
          'background-color': 'var(--color-code-bg)',
          'font-family':
            '"Google Sans Code", "Fira Code", "JetBrains Mono", Consolas, "Courier New", monospace',
        },
        'p code::after': {
          content: 'none',
        },
        'p code::before': {
          content: 'none',
        },
        'blockquote p': {
          'word-break': 'break-all',
        },
        'blockquote code': {
          'white-space': 'pre-wrap',
          'word-break': 'break-word',
          margin: '0.2rem',
          padding: '0.15em 0.3em',
          'border-radius': '0.2em',
          'background-color': 'var(--color-code-bg)',
          'font-family':
            '"Google Sans Code", "Fira Code", "JetBrains Mono", Consolas, "Courier New", monospace',
        },
      },
    }),
  ],
  theme: {
    fontWeight: {
      medium: '500',
      semibold: '600',
      bold: '900',
      extrabold: '800',
    },
  },
})
