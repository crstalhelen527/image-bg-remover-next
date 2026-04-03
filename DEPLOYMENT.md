# 部署指南

本文档介绍如何将Image Background Remover (Next.js版本) 部署到生产环境。

## 📋 部署选项

### 选项1: Cloudflare Pages (推荐)
- 免费额度充足
- 全球CDN加速
- 自动HTTPS
- 与Workers无缝集成

### 选项2: Vercel
- Next.js官方部署平台
- 优秀的开发者体验
- 自动预览部署

### 选项3: 自托管
- 任何支持Node.js的服务器
- 完全控制权
- 需要自行配置SSL和CDN

## 🚀 Cloudflare Pages部署

### 前提条件
- [ ] Cloudflare账号
- [ ] Remove.bg API密钥
- [ ] GitHub/GitLab仓库

### 步骤1: 准备项目
```bash
# 安装依赖
npm install

# 构建项目
npm run build

# 测试构建结果
npm start
```

### 步骤2: 配置环境变量
在Cloudflare Pages设置中添加：
```
REMOVE_BG_API_KEY=your_remove_bg_api_key
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://your-domain.pages.dev
```

### 步骤3: 连接Git仓库
1. 登录Cloudflare Dashboard
2. 进入Pages → Create a project
3. 连接你的Git仓库
4. 配置构建设置：
   - **Build command**: `npm run build`
   - **Build output directory**: `.next`
   - **Root directory**: `/`

### 步骤4: 配置自定义域名
1. 在Pages项目设置中点击"Custom domains"
2. 添加你的域名
3. 按照提示配置DNS记录

## 🔧 环境配置

### 开发环境 (.env.local)
```env
REMOVE_BG_API_KEY=your_remove_bg_api_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 生产环境 (Cloudflare Pages)
```env
REMOVE_BG_API_KEY=your_remove_bg_api_key
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://your-domain.pages.dev
```

### 获取Remove.bg API密钥
1. 访问 https://www.remove.bg/api
2. 注册账号
3. 在Dashboard获取API密钥
4. 免费额度：50张/月

## 📊 监控与日志

### Cloudflare Analytics
- 访问Pages项目Analytics面板
- 查看请求量、带宽使用
- 监控错误率

### 应用日志
```bash
# 查看构建日志
在Cloudflare Pages的Deployments中查看

# 查看运行时日志
在Pages项目的Functions日志中查看
```

### 性能监控
- **Web Vitals**: 使用Next.js Analytics
- **API响应时间**: 监控Remove.bg API性能
- **错误率**: 关注API调用失败率

## 🛡️ 安全配置

### API密钥保护
1. **永远不要**将API密钥提交到代码仓库
2. 使用环境变量存储敏感信息
3. 定期轮换API密钥
4. 限制API调用频率

### 访问控制
1. 配置CORS策略
2. 设置请求频率限制
3. 启用Cloudflare WAF
4. 监控异常访问模式

### 数据安全
1. 图片不存储到磁盘
2. 使用HTTPS传输
3. 定期安全审计
4. 保持依赖更新

## 🔄 持续集成/持续部署

### GitHub Actions配置
创建`.github/workflows/deploy.yml`：
```yaml
name: Deploy to Cloudflare Pages

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - name: Deploy to Cloudflare Pages
        uses: cloudflare/pages-action@v1
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          projectName: image-bg-remover-next
          directory: .next
```

### 环境变量配置
在GitHub仓库设置中添加：
- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`
- `REMOVE_BG_API_KEY` (通过Cloudflare Pages环境变量设置)

## 🚨 故障排除

### 常见问题

#### 构建失败
```bash
# 检查依赖
npm ci

# 清除缓存
rm -rf .next node_modules
npm install

# 检查TypeScript错误
npx tsc --noEmit
```

#### API调用失败
1. 检查API密钥是否正确
2. 验证API额度是否用完
3. 检查网络连接
4. 查看Remove.bg服务状态

#### 图片上传问题
1. 检查文件格式和大小限制
2. 验证浏览器File API支持
3. 检查CORS配置
4. 查看浏览器控制台错误

### 调试工具
```bash
# 本地调试
npm run dev

# 生产环境调试
在Cloudflare Pages中启用预览部署

# API调试
使用curl测试API端点：
curl -X POST https://your-domain/api/remove-bg \
  -H "Content-Type: application/json" \
  -d '{"image":"base64_data"}'
```

## 📈 性能优化

### 构建优化
1. 启用Next.js静态导出
2. 优化图片加载
3. 代码分割和懒加载
4. 服务端渲染优化

### 运行时优化
1. 启用缓存策略
2. 优化API响应时间
3. 减少不必要的重渲染
4. 监控内存使用

### CDN优化
1. 配置合适的缓存头
2. 启用Brotli压缩
3. 优化资源加载顺序
4. 使用HTTP/2或HTTP/3

## 🔄 更新与维护

### 版本更新
```bash
# 更新依赖
npm update

# 更新Next.js
npm install next@latest

# 重新部署
npm run build
# 然后通过Git推送触发自动部署
```

### 数据备份
1. 定期备份环境变量
2. 导出配置设置
3. 保存部署日志
4. 备份自定义域名配置

### 安全更新
1. 定期运行`npm audit`
2. 更新安全补丁
3. 审查第三方依赖
4. 监控安全公告

## 📞 支持与帮助

### 文档资源
- [Next.js文档](https://nextjs.org/docs)
- [Cloudflare Pages文档](https://developers.cloudflare.com/pages/)
- [Remove.bg API文档](https://www.remove.bg/api)
- [Tailwind CSS文档](https://tailwindcss.com/docs)

### 问题反馈
1. **GitHub Issues**: 技术问题和功能请求
2. **Cloudflare社区**: 部署和基础设施问题
3. **Remove.bg支持**: API相关问题

### 紧急联系
- **服务中断**: 检查Cloudflare状态页
- **安全漏洞**: 立即撤销API密钥
- **数据泄露**: 检查日志和访问记录

## 🎯 最佳实践

### 开发实践
1. 使用TypeScript进行类型检查
2. 编写单元测试和集成测试
3. 遵循代码规范
4. 定期代码审查

### 部署实践
1. 使用预览部署测试更改
2. 监控生产环境性能
3. 设置回滚策略
4. 定期备份配置

### 运维实践
1. 设置监控告警
2. 定期安全扫描
3. 性能基准测试
4. 用户反馈收集

---

**最后更新**: 2026-04-02  
**版本**: v2.0.0  
**状态**: 生产就绪