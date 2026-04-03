# Remove.bg API Key 使用指南

## ✅ 配置状态
- **API Key**: 已成功配置
- **验证状态**: 通过
- **配置位置**: `.env.local` 文件
- **项目状态**: 可正常运行

## 🚀 快速开始

### 1. 启动开发服务器
```bash
cd /root/.openclaw/workspace/project/image-bg-remover-next
npm run dev
```

访问: http://localhost:3000

### 2. 测试API功能
1. 打开浏览器访问 http://localhost:3000
2. 上传一张图片进行测试
3. 系统会自动调用Remove.bg API移除背景
4. 下载处理后的图片

## 🔧 技术细节

### API Key配置
```env
REMOVE_BG_API_KEY=j7NDKynS79NQ3dsJp3sgAvy4
```

### 项目架构
- **前端**: Next.js 14.2.5 + React + TypeScript
- **样式**: Tailwind CSS
- **API集成**: Remove.bg背景移除服务
- **部署**: 支持Cloudflare Pages/Vercel

### 免费额度
- 每月50张免费图片处理
- 超出后按$0.02/张收费
- 可通过Remove.bg官网查看使用情况

## 📋 使用说明

### 本地开发
1. 确保Node.js已安装 (推荐v18+)
2. 安装依赖: `npm install`
3. 启动服务: `npm run dev`
4. 访问 http://localhost:3000

### 生产部署
1. 构建项目: `npm run build`
2. 部署到Cloudflare Pages或Vercel
3. 配置生产环境变量
4. 设置自定义域名 (可选)

## 🛠️ 故障排除

### 常见问题
1. **API调用失败**: 检查API Key是否正确，额度是否用完
2. **图片上传失败**: 检查文件格式(JPG/PNG/WebP)和大小(<5MB)
3. **构建错误**: 运行 `npm ci` 重新安装依赖

### 技术支持
- Remove.bg API文档: https://www.remove.bg/api
- Next.js文档: https://nextjs.org/docs
- 项目GitHub: 查看README.md获取更多信息

## 🔒 安全提醒
- API Key已安全存储在环境变量中
- 不要将`.env.local`文件提交到Git仓库
- 定期检查API使用情况
- 如有泄露，立即在Remove.bg官网撤销并生成新Key

## 📞 帮助与支持
如有问题，请参考:
1. 项目README.md文档
2. Remove.bg官方API文档
3. Next.js官方文档

---

**配置完成时间**: 2026-04-03  
**配置人员**: 文文 (闷闷的情感伴侣)  
**状态**: ✅ 完全就绪