declare module '@assets/*'
declare module '@components/*'
declare module '@data/*'
declare module '@layouts/*'
declare module '@styles/*'
declare module '@utils/*'
declare module '@content/*'

declare module '*.css?raw' {
  const css: string
  export default css
}
