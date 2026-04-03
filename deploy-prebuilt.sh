#!/bin/bash
# 预构建部署脚本
# 在本地构建，然后直接部署构建结果到Cloudflare Pages

set -e

echo "🚀 开始预构建部署到Cloudflare Pages"

# 1. 清理和构建
echo "📦 清理旧构建..."
rm -rf .next
rm -rf out

echo "🔨 构建项目..."
npm run build

echo "✅ 构建完成!"

# 2. 准备部署文件
echo "📁 准备部署文件..."
# Next.js构建输出在 .next 目录
# Cloudflare Pages需要 .next 目录

# 3. 部署到Cloudflare Pages
echo "🚀 部署到Cloudflare Pages..."
if command -v wrangler &> /dev/null; then
    echo "使用Wrangler CLI部署..."
    # 设置环境变量
    export CLOUDFLARE_API_TOKEN="cfat_uDFmQGusike6Jlg07htblvRMCILfBacovc7z5ft7e34b3e7c"
    export REMOVE_BG_API_KEY="j7NDKynS79NQ3dsJp3sgAvy4"
    
    # 部署
    npx wrangler pages deploy .next --project-name=image-bg-remover-next --branch=main
else
    echo "⚠️ Wrangler未安装，请先安装: npm install -g wrangler"
    echo "📋 手动部署步骤:"
    echo "1. 访问: https://dash.cloudflare.com/"
    echo "2. 进入 Pages → image-bg-remover-next"
    echo "3. 点击 '上传资产'"
    echo "4. 选择 .next 目录"
    echo "5. 点击 '部署网站'"
fi

echo "🎉 部署完成!"
echo "🌐 生产地址: https://image-bg-remover-next.pages.dev"
echo "📊 本地测试: http://82.156.191.42:3000"