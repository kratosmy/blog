/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
  // 在这里添加你的环境变量类型
  // 例如: readonly PUBLIC_API_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
