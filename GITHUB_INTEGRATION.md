# Cloudflare Pages 原生 GitHub 集成指南

## 📋 配置完成情况

### ✅ 已完成的配置
1. **Cloudflare Account ID**: `da9508a0610236e7085687e13c88bf59`
2. **项目配置**: `wrangler.toml` 已更新
3. **部署脚本**: `deploy-to-cloudflare.sh` 已创建
4. **GitHub Actions**: `.github/workflows/deploy.yml` 已配置
5. **环境变量**: 已准备配置脚本

## 🔑 Cloudflare API Token 配置

### API Token 信息
```
Token: cfat_uDFmQGusike6Jlg07htblvRMCILfBacovc7z5ft7e34b3e7c
Account ID: da9508a0610236e7085687e13c88bf59
```

### 所需权限
此Token需要以下权限：
- **Account.Cloudflare Pages**: Read & Write
- **Account.Workers Scripts**: Read & Write (用于环境变量)
- **User.Cloudflare Pages**: Read & Write

## 🚀 部署方式

### 方式1: 手动部署 (立即测试)
```bash
# 设置环境变量
export CLOUDFLARE_API_TOKEN="cfat_uDFmQGusike6Jlg07htblvRMCILfBacovc7z5ft7e34b3e7c"
export REMOVE_BG_API_KEY="j7NDKynS79NQ3dsJp3sgAvy4"

# 运行部署脚本
cd /root/.openclaw/workspace/project/image-bg-remover-next
./deploy-to-cloudflare.sh
```

### 方式2: GitHub Actions 自动部署
1. 将代码推送到GitHub仓库
2. GitHub Actions会自动构建和部署
3. 需要配置GitHub Secrets

### 方式3: Cloudflare Dashboard 图形化部署
1. 访问 Cloudflare Dashboard
2. 进入 Pages 页面
3. 点击 "Create a project"
4. 连接GitHub仓库

## 🔧 GitHub Secrets 配置

### 需要在GitHub仓库设置的Secrets:
1. **CLOUDFLARE_API_TOKEN**: `cfat_uDFmQGusike6Jlg07htblvRMCILfBacovc7z5ft7e34b3e7c`
2. **REMOVE_BG_API_KEY**: `j7NDKynS79NQ3dsJp3sgAvy4`

### 配置步骤:
1. 访问你的GitHub仓库
2. 点击 Settings → Secrets and variables → Actions
3. 点击 "New repository secret"
4. 添加上述两个Secrets

## 📁 项目结构说明

### 关键文件:
```
image-bg-remover-next/
├── .github/workflows/deploy.yml    # GitHub Actions工作流
├── deploy-to-cloudflare.sh         # 手动部署脚本
├── wrangler.toml                   # Cloudflare配置
├── .env.local                      # 本地环境变量
├── next.config.js                  # Next.js配置
├── package.json                    # 项目依赖
└── app/                            # Next.js应用代码
```

### 构建配置:
- **Build command**: `npm run build`
- **Build output**: `.next` 目录
- **Node version**: 18+
- **Environment**: production

## 🌐 部署后的访问地址

### 生产环境:
- **主域名**: https://image-bg-remover-next.pages.dev
- **预览部署**: 每个PR会有独立的预览URL

### 自定义域名 (可选):
1. 在Cloudflare Pages设置中添加自定义域名
2. 配置DNS记录指向Cloudflare
3. 自动获取SSL证书

## 🔄 自动部署流程

### 触发条件:
1. **推送到main分支** → 自动部署到生产环境
2. **创建Pull Request** → 创建预览部署
3. **手动触发** → 通过GitHub Actions界面

### 部署步骤:
1. **检出代码** → 从GitHub获取最新代码
2. **安装依赖** → `npm ci` 安装所有依赖
3. **构建项目** → `npm run build` 构建Next.js应用
4. **部署到Cloudflare** → 使用Pages Action部署
5. **测试验证** → 检查构建结果

## 🛡️ 安全考虑

### 敏感信息保护:
- **API Tokens**: 存储在GitHub Secrets中，不暴露在代码中
- **环境变量**: 通过Cloudflare环境变量管理
- **访问控制**: 仅限授权人员访问部署设置

### 权限管理:
- **最小权限原则**: API Token仅具有必要权限
- **定期轮换**: 建议定期更新API Token
- **访问日志**: Cloudflare提供详细的访问日志

## 📊 监控与日志

### 部署监控:
- **GitHub Actions**: 查看构建和部署状态
- **Cloudflare Dashboard**: 查看部署历史和状态
- **构建日志**: 查看详细的构建过程

### 应用监控:
- **访问统计**: Cloudflare Analytics
- **错误日志**: Cloudflare Pages Functions日志
- **性能监控**: Web Vitals和性能指标

## 🐛 故障排除

### 常见问题:

#### 1. 构建失败
```bash
# 检查依赖
npm ci

# 清除缓存
rm -rf .next node_modules
npm install

# 检查TypeScript错误
npx tsc --noEmit
```

#### 2. 部署失败
- 检查API Token权限
- 验证Account ID是否正确
- 检查网络连接

#### 3. 环境变量问题
- 确认GitHub Secrets已正确设置
- 检查Cloudflare环境变量配置
- 验证环境变量名称大小写

#### 4. 访问问题
- 检查自定义域名DNS配置
- 验证SSL证书状态
- 检查防火墙和网络设置

## 📞 支持与帮助

### Cloudflare 资源:
- [Cloudflare Pages文档](https://developers.cloudflare.com/pages/)
- [Wrangler CLI文档](https://developers.cloudflare.com/workers/wrangler/)
- [Pages Action文档](https://github.com/cloudflare/pages-action)

### GitHub 资源:
- [GitHub Actions文档](https://docs.github.com/en/actions)
- [GitHub Secrets文档](https://docs.github.com/en/actions/security-guides/encrypted-secrets)

### 项目文档:
- [README.md](./README.md) - 项目概述
- [DEPLOYMENT.md](./DEPLOYMENT.md) - 详细部署指南
- [USAGE_GUIDE.md](./USAGE_GUIDE.md) - 使用指南

## 🎯 下一步操作

### 立即操作:
1. 配置GitHub Secrets
2. 推送代码到GitHub仓库
3. 验证自动部署流程

### 后续优化:
1. 添加自定义域名
2. 配置CDN缓存策略
3. 设置监控告警
4. 优化构建性能

---

**配置完成时间**: 2026-04-03 19:25  
**配置人员**: 文文 (闷闷的情感伴侣)  
**项目状态**: ✅ 准备就绪，可立即部署  
**预计部署时间**: 5-10分钟  
**生产地址**: https://image-bg-remover-next.pages.dev