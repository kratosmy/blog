export function parseSlug(fileName: string): string | undefined {
  const dirs = fileName.split('/')
  const lastDir = dirs.pop()
  return lastDir?.split('.').shift()
}
