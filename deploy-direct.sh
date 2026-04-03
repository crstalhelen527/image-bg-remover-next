#!/bin/bash

# 直接部署到Cloudflare Pages
set -e

echo "🚀 直接部署到 Cloudflare Pages..."
echo "========================================"

# 检查构建输出
if [ ! -d ".next" ]; then
    echo "❌ .next 目录不存在，请先运行 npm run build"
    exit 1
fi

echo "📦 准备部署文件..."
# 创建临时目录
TEMP_DIR=$(mktemp -d)
cp -r .next/* "$TEMP_DIR/"
cp -r public/* "$TEMP_DIR/" 2>/dev/null || true

echo "📤 上传到 Cloudflare Pages..."
# 使用curl直接上传
curl -X POST \
  -H "Authorization: Bearer cfat_uDFmQGusike6Jlg07htblvRMCILfBacovc7z5ft7e34b3e7c" \
  -F "files=@$TEMP_DIR/index.html" \
  -F "files=@$TEMP_DIR/404.html" \
  -F "files=@$TEMP_DIR/favicon.ico" \
  "https://api.cloudflare.com/client/v4/accounts/da9508a0610236e7085687e13c88bf59/pages/projects/image-bg-remover-next/deployments" \
  --progress-bar 2>&1 | tee /tmp/deploy.log

echo ""
echo "========================================"
echo "✅ 部署请求已发送！"
echo ""
echo "📋 部署信息:"
echo "   项目ID: d4f2fd8b-8002-486e-a563-b1322e52adca"
echo "   子域名: image-bg-remover-next.pages.dev"
echo "   创建时间: 2026-04-03 19:31"
echo ""
echo "⏳ 部署状态:"
echo "   部署可能需要几分钟时间完成"
echo "   请稍后访问: https://image-bg-remover-next.pages.dev"
echo ""
echo "🔍 检查部署状态:"
echo "   curl -H 'Authorization: Bearer cfat_uDFmQGusike6Jlg07htblvRMCILfBacovc7z5ft7e34b3e34b3e7c' \\"
echo "        'https://api.cloudflare.com/client/v4/accounts/da9508a0610236e7085687e13c88bf59/pages/projects/image-bg-remover-next/deployments'"
echo ""
echo "💡 提示:"
echo "   1. 首次部署可能需要5-10分钟"
echo "   2. 部署完成后会自动分配SSL证书"
echo "   3. 可以配置自定义域名"