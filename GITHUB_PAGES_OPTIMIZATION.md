# GitHub Pages 性能优化指南

## ✅ 已实施的优化

### 1. 构建优化
- **Terser 压缩**: 移除 console 和 debugger，最小化 JS
- **文件名哈希**: 所有资源带哈希值，利于长期缓存
- **CSS 代码分割**: 按需加载 CSS 模块
- **自动内联小样式**: `inlineStylesheets: 'auto'` 减少请求数

### 2. Service Worker 缓存策略
- **静态资源**: Cache First（缓存优先）
- **HTML 页面**: Network First（网络优先）
- **自动清理**: 旧版本缓存自动删除
- **离线支持**: 网络失败时回退到缓存

### 3. 资源优化
- **Gzip 压缩**: 所有文本资源预压缩
- **长期缓存**: 静态资源 1 年缓存
- **字体优化**: 预加载关键字体，CORS 支持

### 4. 预加载策略
- **Prefetch**: 视口内链接自动预加载
- **资源提示**: 关键资源预加载

## 🚀 Lighthouse 分数提升建议

### 在你的布局文件中添加这些 meta 标签：

```html
<!-- 性能优化 -->
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="dns-prefetch" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.googleapis.com" crossorigin>

<!-- 资源提示 -->
<link rel="preload" as="image" href="/blog/favicon.ico">

<!-- PWA 支持 -->
<meta name="theme-color" content="#ffffff">
<link rel="manifest" href="/blog/manifest.json">

<!-- Service Worker 注册 -->
<script>
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/blog/sw.js', { scope: '/blog/' })
        .then(reg => console.log('SW registered'))
        .catch(err => console.log('SW registration failed'));
    });
  }
</script>
```

## 📊 性能对比

### GitHub Pages vs Cloudflare

**GitHub Pages 劣势：**
- ❌ 无全球 CDN（仅美国节点）
- ❌ 无边缘计算
- ❌ 无自动图片优化
- ❌ 带宽限制（100GB/月）

**通过优化可以弥补：**
- ✅ Service Worker 本地缓存（减少重复请求）
- ✅ 资源预压缩（减少传输大小）
- ✅ 长期缓存策略（减少服务器请求）
- ✅ 预加载和预连接（减少延迟）

## 🎯 预期 Lighthouse 分数

优化后应该能达到：
- **Performance**: 90-95+
- **Accessibility**: 95-100
- **Best Practices**: 95-100
- **SEO**: 95-100

## 💡 进一步优化建议

### 1. 图片优化
```bash
# 使用 sharp 或 imagemin 压缩图片
pnpm add -D @astrojs/image sharp
```

### 2. 字体优化
- 使用 `font-display: swap` 避免 FOIT
- 子集化字体文件（只包含使用的字符）
- 考虑使用系统字体栈

### 3. 第三方脚本优化
- 已使用 Partytown 将分析脚本移到 Web Worker
- 延迟加载非关键脚本

### 4. 考虑使用 CDN
虽然 GitHub Pages 本身不是全球 CDN，但可以：
- 使用 jsDelivr CDN 加载字体和库
- 图片托管到 Cloudinary 或 Imgur
- 使用 Cloudflare 作为 GitHub Pages 的前置代理

### 5. 监控性能
```bash
# 使用 Lighthouse CI
pnpm add -D @lhci/cli

# 在 CI 中运行性能测试
lhci autorun
```

## 🔧 测试命令

```bash
# 本地构建测试
pnpm build
pnpm preview

# 使用 Lighthouse 测试
npx lighthouse http://localhost:4321/blog/ --view

# 检查资源大小
du -sh dist/*
```

## 📝 注意事项

1. **Service Worker 更新**: 修改 SW 后记得更新版本号
2. **缓存策略**: 平衡缓存时间和内容更新频率
3. **Base Path**: 所有路径都要包含 `/blog` 前缀
4. **GitHub Pages 限制**: 
   - 文件大小 < 100MB
   - 仓库大小 < 1GB
   - 带宽 100GB/月
   - 每小时构建次数 < 10

## 🎉 总结

通过这些优化，你的 GitHub Pages 站点应该能达到接近 Cloudflare 的性能表现。虽然无法完全替代全球 CDN，但对于个人博客来说已经足够快了。

关键是利用好：
- ✅ 浏览器缓存
- ✅ Service Worker
- ✅ 资源压缩
- ✅ 预加载策略
- ✅ 代码分割

这些都是在客户端层面的优化，不依赖服务器端的 CDN 能力。
