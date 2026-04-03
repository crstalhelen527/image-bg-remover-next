# 🚀 快速启动指南

## 1分钟完成Cloudflare Pages部署

### 步骤1: 准备环境变量
```bash
# 在终端中执行
export CLOUDFLARE_API_TOKEN="cfat_uDFmQGusike6Jlg07htblvRMCILfBacovc7z5ft7e34b3e7c"
export REMOVE_BG_API_KEY="j7NDKynS79NQ3dsJp3sgAvy4"
```

### 步骤2: 运行部署脚本
```bash
cd /root/.openclaw/workspace/project/image-bg-remover-next
./deploy-to-cloudflare.sh
```

### 步骤3: 访问部署的应用
- **生产地址**: https://image-bg-remover-next.pages.dev
- **等待时间**: 1-3分钟部署生效

## 📋 验证部署

### 检查项目:
1. 访问 https://image-bg-remover-next.pages.dev
2. 上传测试图片
3. 验证背景移除功能

### 检查管理面板:
1. 访问 https://dash.cloudflare.com/
2. 登录后进入 Pages
3. 查看部署状态和日志

## 🔧 故障快速修复

### 如果部署失败:
```bash
# 重新安装依赖
npm ci

# 重新构建
npm run build

# 重新部署
./deploy-to-cloudflare.sh
```

### 如果功能不正常:
1. 检查环境变量是否设置正确
2. 查看Cloudflare Pages日志
3. 验证Remove.bg API额度

## 📞 紧急联系

### 需要帮助?
1. 检查本文档的"故障排除"部分
2. 查看Cloudflare Dashboard错误信息
3. 联系技术支持

---

**部署就绪时间**: 2026-04-03 19:26  
**预计完成时间**: 5分钟内  
**状态**: ✅ 所有配置已完成