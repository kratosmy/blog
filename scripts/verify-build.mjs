import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { extname, join, relative } from 'node:path'
import process from 'node:process'

const root = new URL('../dist/', import.meta.url)
const rootPath = root.pathname
const failures = []

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name)
    return statSync(path).isDirectory() ? walk(path) : [path]
  })
}

function expect(condition, message) {
  if (!condition) failures.push(message)
}

function count(text, pattern) {
  return Array.from(text.matchAll(pattern)).length
}

function outputPath(urlPath) {
  const clean = decodeURIComponent(urlPath.split(/[?#]/, 1)[0])
  const direct = join(rootPath, clean.replace(/^\//, ''))
  if (extname(clean)) return direct
  return clean.endsWith('/') ? join(direct, 'index.html') : direct
}

expect(existsSync(rootPath), 'dist/ is missing; run the build first')
if (!existsSync(rootPath)) {
  console.error(failures.join('\n'))
  process.exit(1)
}

const files = walk(rootPath)
const htmlFiles = files.filter((file) => file.endsWith('.html'))
const jsFiles = files.filter((file) => file.endsWith('.js'))
const cssFiles = files.filter((file) => file.endsWith('.css'))
const fontFiles = files.filter((file) => /\.(?:woff2?|ttf|otf)$/i.test(file))
const totalBytes = files.reduce((total, file) => total + statSync(file).size, 0)
const referencedJs = new Set()
let maxInlineCss = 0

expect(
  htmlFiles.length === 53,
  `expected 53 HTML pages, found ${htmlFiles.length}`,
)
for (const required of [
  'index.html',
  '404.html',
  'rss.xml',
  'sitemap-index.xml',
  'favicon.svg',
  'CNAME',
]) {
  expect(
    existsSync(join(rootPath, required)),
    `missing required artifact: ${required}`,
  )
}
expect(
  totalBytes <= 2 * 1024 * 1024,
  `artifact exceeds 2 MiB: ${totalBytes} bytes`,
)
expect(
  !existsSync(join(rootPath, 'chunks')),
  'dist/chunks must not contain prerender internals',
)
expect(
  !files.some((file) => file.endsWith('.gz')),
  'precompressed .gz sidecars must not be published',
)
expect(
  !files.some((file) => file.endsWith('.headers')),
  'unconsumed .headers files must not be published',
)
expect(
  !existsSync(join(rootPath, '_headers')),
  'unconsumed _headers policy must not be published',
)
expect(
  !existsSync(join(rootPath, 'sw.js')),
  'worker must not be published without an offline requirement',
)
expect(
  !fontFiles.some((file) => !file.endsWith('.woff2')),
  'only WOFF2 fonts may be published',
)
for (const file of files.filter((file) =>
  relative(rootPath, file).startsWith('_astro/'),
)) {
  expect(
    /\.[A-Za-z0-9_-]{5,}\.[^.]+$/.test(relative(rootPath, file)),
    `${relative(rootPath, file)}: immutable asset is not hashed`,
  )
}

for (const file of htmlFiles) {
  const rel = relative(rootPath, file)
  const html = readFileSync(file, 'utf8')
  expect(count(html, /<title(?:\s|>)/g) === 1, `${rel}: expected one title`)
  expect(
    count(html, /<link\s+rel="canonical"/g) === 1,
    `${rel}: expected one canonical`,
  )
  expect(count(html, /<h1(?:\s|>)/g) === 1, `${rel}: expected one h1`)
  if (rel === '404.html') {
    expect(
      /<meta\s+name="robots"\s+content="noindex, nofollow"/.test(html),
      `${rel}: missing noindex`,
    )
    expect(
      count(html, /hreflang=/g) === 0,
      `${rel}: 404 must not advertise alternates`,
    )
  } else {
    expect(
      count(html, /hreflang=/g) === 3,
      `${rel}: expected zh, en, and x-default alternates`,
    )
  }
  const inlineCss = Array.from(
    html.matchAll(/<style\b[^>]*>([\s\S]*?)<\/style>/g),
  ).reduce((total, match) => total + Buffer.byteLength(match[1]), 0)
  maxInlineCss = Math.max(maxInlineCss, inlineCss)

  const navigable = [
    ...html.matchAll(/<a\b[^>]*\bhref="([^"]+)"/g),
    ...html.matchAll(/<(?:script|img)\b[^>]*\bsrc="([^"]+)"/g),
    ...html.matchAll(
      /<link\b[^>]*\brel="(?:stylesheet|icon)"[^>]*\bhref="([^"]+)"/g,
    ),
  ].map((match) => match[1])

  for (const target of navigable) {
    if (!target.startsWith('/') || target.startsWith('//')) continue
    const path = outputPath(target)
    expect(existsSync(path), `${rel}: missing internal target ${target}`)
    if (target.split(/[?#]/, 1)[0].endsWith('.js')) referencedJs.add(path)
  }
}

for (const cssFile of cssFiles) {
  const css = readFileSync(cssFile, 'utf8')
  for (const match of css.matchAll(/url\((?:"|')?([^"')]+)(?:"|')?\)/g)) {
    const target = match[1]
    if (target.startsWith('data:') || target.startsWith('http')) continue
    const resolved = target.startsWith('/')
      ? join(rootPath, target.replace(/^\//, ''))
      : new URL(target, new URL(`file://${cssFile}`)).pathname
    expect(
      existsSync(resolved),
      `${relative(rootPath, cssFile)}: missing CSS asset ${target}`,
    )
  }
}

for (const jsFile of jsFiles) {
  expect(
    referencedJs.has(jsFile),
    `${relative(rootPath, jsFile)}: unreferenced JavaScript`,
  )
}
const cssBytes = cssFiles.reduce(
  (total, file) => total + statSync(file).size,
  0,
)
const jsBytes = jsFiles.reduce((total, file) => total + statSync(file).size, 0)
const fontBytes = fontFiles.reduce(
  (total, file) => total + statSync(file).size,
  0,
)
expect(cssBytes + maxInlineCss <= 32 * 1024, 'worst-case CSS exceeds 32 KiB')
expect(jsBytes <= 8 * 1024, 'external JavaScript exceeds 8 KiB')
expect(fontBytes <= 50 * 1024, 'font artifact exceeds 50 KiB')

const rss = readFileSync(join(rootPath, 'rss.xml'), 'utf8')
expect(rss.includes('<title>John Wick</title>'), 'RSS site title drifted')
expect(
  !rss.includes('kratosmy.github.io'),
  'RSS contains the stale site fallback',
)
expect(
  count(rss, /<item>/g) === 30,
  'RSS must contain all 30 published locale entries',
)

if (failures.length > 0) {
  console.error(`Artifact verification failed (${failures.length}):`)
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

console.log(
  `Artifact verified: ${htmlFiles.length} pages, ${files.length} files, ${totalBytes} bytes; ` +
    `${cssBytes} CSS, ${jsBytes} JS, ${fontBytes} fonts`,
)
