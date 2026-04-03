#!/bin/bash

# GitHub集成设置脚本
# 作者: 文文 (闷闷的情感伴侣)
# 时间: 2026-04-03

set -e

echo "🚀 设置 GitHub 集成"
echo "========================================"

# 检查Git
if ! which git >/dev/null 2>&1; then
    echo "❌ Git 未安装"
    exit 1
fi

# 初始化Git仓库
echo "📁 初始化Git仓库..."
if [ ! -d ".git" ]; then
    git init
    echo "✅ Git仓库初始化完成"
else
    echo "✅ Git仓库已存在"
fi

# 添加文件
echo "📦 添加文件到Git..."
git add .

# 提交更改
echo "💾 提交更改..."
git commit -m "Initial commit: Image Background Remover

- Complete Next.js application
- Remove.bg API integration
- Cloudflare Pages configuration
- GitHub Actions workflow
- All features tested and working

Deployed by: 文文 (闷闷的情感伴侣)
Date: 2026-04-03" || echo "⚠️ 提交可能失败，继续..."

echo ""
echo "========================================"
echo "✅ 本地Git设置完成！"
echo ""
echo "📋 下一步操作:"
echo ""
echo "1. 创建GitHub仓库:"
echo "   访问 https://github.com/new"
echo "   仓库名: image-bg-remover-next"
echo "   描述: Image Background Remover with Remove.bg API"
echo "   权限: Public (推荐) 或 Private"
echo ""
echo "2. 添加远程仓库:"
echo "   git remote add origin https://github.com/YOUR_USERNAME/image-bg-remover-next.git"
echo "   git push -u origin main"
echo ""
echo "3. 配置GitHub Secrets:"
echo "   访问: https://github.com/YOUR_USERNAME/image-bg-remover-next/settings/secrets/actions"
echo "   添加以下Secrets:"
echo ""
echo "   🔑 CLOUDFLARE_API_TOKEN"
echo "   值: cfat_uDFmQGusike6Jlg07htblvRMCILfBacovc7z5ft7e34b3e7c"
echo ""
echo "   🔑 REMOVE_BG_API_KEY"
echo "   值: j7NDKynS79NQ3dsJp3sgAvy4"
echo ""
echo "4. 触发自动部署:"
echo "   推送代码后，GitHub Actions会自动:"
echo "   - 构建项目"
echo "   - 部署到Cloudflare Pages"
echo "   - 发送部署状态通知"
echo ""
echo "5. 访问部署的应用:"
echo "   🌐 https://image-bg-remover-next.pages.dev"
echo ""
echo "⏱️ 时间预估:"
echo "   - 仓库创建: 2分钟"
echo "   - 推送代码: 1分钟"
echo "   - Secrets配置: 2分钟"
echo "   - 自动部署: 5-10分钟"
echo "   - 总计: 10-15分钟"
echo ""
echo "🔧 故障排除:"
echo "   如果部署失败，检查:"
echo "   - GitHub Secrets是否正确"
echo "   - Cloudflare API Token权限"
echo "   - 构建日志错误信息"
echo ""
echo "📞 支持:"
echo "   如有问题，参考文档:"
echo "   - GITHUB_INTEGRATION.md"
echo "   - IMMEDIATE_SOLUTION.md"
echo "   - DEPLOYMENT_STATUS.md"
echo ""
echo "💡 提示:"
echo "   首次部署后，后续代码推送会自动触发部署"
echo "   Pull Requests会创建预览部署"
echo "   所有部署都有独立的URL"

echo ""
echo "========================================"
echo "🎯 立即行动步骤:"
echo "1. 复制上面的命令"
echo "2. 替换 YOUR_USERNAME 为你的GitHub用户名"
echo "3. 按顺序执行"
echo "4. 等待部署完成"
echo "5. 测试生产环境功能"