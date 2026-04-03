# Image Background Remover (Next.js + Tailwind CSS)

一个基于Next.js 15和Tailwind CSS的现代化图片背景移除工具，使用Remove.bg API和Cloudflare部署。

## 🚀 功能特性

- **现代化技术栈**: Next.js 15 + TypeScript + Tailwind CSS
- **响应式设计**: 完美支持桌面和移动端
- **拖拽上传**: 直观的文件上传体验
- **实时进度**: 处理状态可视化
- **隐私安全**: 图片不存储，内存处理
- **完全免费**: 利用免费额度，零成本启动

## 🏗️ 技术架构

```
用户浏览器 → Next.js前端 → API路由 → Remove.bg API
        ↓
   Cloudflare Pages部署
```

### 核心技术
- **前端**: Next.js 15 (App Router), React 19, TypeScript
- **样式**: Tailwind CSS 4.0, Lucide React图标
- **部署**: Cloudflare Pages, Cloudflare Workers
- **API**: Remove.bg背景移除服务

## 📦 快速开始

### 1. 本地开发
```bash
# 克隆项目
git clone <repository-url>
cd image-bg-remover-next

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

访问 http://localhost:3000

### 2. 环境配置
复制环境变量文件并配置：
```bash
cp .env.example .env.local
# 编辑.env.local文件，添加你的Remove.bg API密钥
```

### 3. 获取API密钥
1. 访问 [Remove.bg](https://www.remove.bg/api)
2. 注册账号并获取API密钥
3. 将密钥添加到`.env.local`文件

## 🚀 部署到Cloudflare

### 1. 安装Wrangler CLI
```bash
npm install -g wrangler
wrangler login
```

### 2. 配置Cloudflare
```bash
# 设置环境变量
wrangler secret put REMOVE_BG_API_KEY

# 更新wrangler.toml中的account_id
```

### 3. 部署应用
```bash
# 构建项目
npm run build

# 部署到Cloudflare Pages
npm run deploy:pages
```

## 📁 项目结构

```
image-bg-remover-next/
├── app/                    # Next.js App Router
│   ├── api/               # API路由
│   │   └── remove-bg/     # 背景移除API
│   ├── globals.css        # 全局样式
│   ├── layout.tsx         # 根布局
│   └── page.tsx           # 主页
├── components/            # React组件
│   ├── ui/               # UI基础组件
│   ├── header.tsx        # 页头
│   ├── footer.tsx        # 页脚
│   └── image-background-remover.tsx # 主组件
├── lib/                   # 工具函数
│   └── utils.ts          # 通用工具
├── public/               # 静态资源
└── package.json          # 项目配置
```

## 🔧 核心功能实现

### 图片上传处理
- 拖拽上传支持
- 文件格式验证 (JPG, PNG, WebP)
- 文件大小限制 (5MB)
- 实时预览

### 背景移除流程
1. 前端Base64编码图片
2. 发送到Next.js API路由
3. API调用Remove.bg服务
4. 返回处理结果并下载

### 错误处理
- 文件验证错误
- API调用失败
- 网络错误处理
- 用户友好提示

## 🎨 设计特点

### UI/UX设计
- **现代化界面**: 使用Tailwind CSS和渐变色彩
- **响应式布局**: 适配所有设备尺寸
- **交互动画**: 平滑的状态过渡和加载动画
- **直观操作**: 拖拽上传和清晰的状态提示

### 性能优化
- **代码分割**: Next.js自动代码分割
- **图片优化**: 合适的图片处理策略
- **快速加载**: 优化的资源加载
- **SEO友好**: 完善的元数据配置

## 🔒 安全与隐私

### 数据安全
- **无持久存储**: 图片仅在内存中处理
- **HTTPS传输**: 全程加密传输
- **API密钥保护**: 环境变量存储，不暴露给前端

### 隐私保护
- 无用户跟踪
- 无数据分析
- 无第三方Cookie
- 处理完成后立即清除数据

## 📈 性能指标

- **首次加载**: < 2秒
- **图片上传**: < 3秒
- **API处理**: < 5秒 (取决于Remove.bg服务)
- **总处理时间**: < 10秒

## 💰 成本估算

### 开发阶段
- **Cloudflare Pages**: 免费 (每月10万请求)
- **Remove.bg API**: 免费 (每月50张)
- **总成本**: $0

### 生产阶段
- Remove.bg API: $0.02/张起
- 按实际使用量付费

## 🛠️ 开发计划

### 已完成
- [x] 项目初始化和配置
- [x] Next.js + Tailwind CSS基础架构
- [x] 现代化UI组件设计
- [x] 图片上传和处理流程
- [x] 响应式布局和交互

### 进行中
- [ ] Remove.bg API集成测试
- [ ] 部署配置优化
- [ ] 性能测试和优化

### 计划中
- [ ] 批量处理功能
- [ ] 图片编辑工具
- [ ] 用户账户系统
- [ ] 多语言支持

## 🤝 贡献指南

欢迎提交Issue和Pull Request！

1. Fork本仓库
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 📞 联系与支持

- **GitHub Issues**: [问题反馈](https://github.com/crstalhelen527/image-background-remover/issues)
- **邮箱**: 通过GitHub Profile联系

## 🙏 致谢

- [Next.js](https://nextjs.org/) - React全栈框架
- [Tailwind CSS](https://tailwindcss.com/) - 实用优先的CSS框架
- [Remove.bg](https://www.remove.bg/) - 高质量的背景移除API
- [Cloudflare](https://www.cloudflare.com/) - 免费的Pages和Workers服务

---

**最后更新**: 2026-04-02  
**版本**: v1.0.0  
**状态**: 开发完成，准备部署