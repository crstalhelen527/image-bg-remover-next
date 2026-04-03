#!/bin/bash

# Cloudflare Pages 部署脚本
# 作者: 文文 (闷闷的情感伴侣)
# 时间: 2026-04-03

set -e  # 遇到错误时退出

echo "🚀 开始部署到 Cloudflare Pages..."
echo "========================================"

# 检查必要的工具
echo "🔧 检查工具..."
which wrangler >/dev/null 2>&1 || { echo "❌ wrangler 未安装"; exit 1; }
which git >/dev/null 2>&1 || { echo "❌ git 未安装"; exit 1; }
which npm >/dev/null 2>&1 || { echo "❌ npm 未安装"; exit 1; }

# 检查环境变量
echo "🔑 检查环境变量..."
if [ -z "$CLOUDFLARE_API_TOKEN" ]; then
    echo "❌ 环境变量 CLOUDFLARE_API_TOKEN 未设置"
    echo "请设置: export CLOUDFLARE_API_TOKEN=你的API令牌"
    exit 1
fi

if [ -z "$REMOVE_BG_API_KEY" ]; then
    echo "❌ 环境变量 REMOVE_BG_API_KEY 未设置"
    echo "请设置: export REMOVE_BG_API_KEY=你的Remove.bg API密钥"
    exit 1
fi

# 检查项目配置
echo "📁 检查项目配置..."
if [ ! -f "wrangler.toml" ]; then
    echo "❌ wrangler.toml 文件不存在"
    exit 1
fi

if [ ! -f "package.json" ]; then
    echo "❌ package.json 文件不存在"
    exit 1
fi

# 安装依赖
echo "📦 安装依赖..."
npm ci --silent || npm install --silent

# 构建项目
echo "🏗️  构建项目..."
npm run build

# 设置Cloudflare环境变量
echo "🔐 设置Cloudflare环境变量..."
echo "设置 REMOVE_BG_API_KEY..."
wrangler secret put REMOVE_BG_API_KEY <<< "$REMOVE_BG_API_KEY"

# 部署到Cloudflare Pages
echo "🚀 部署到Cloudflare Pages..."
echo "使用账户ID: da9508a0610236e7085687e13c88bf59"

# 检查是否已登录
echo "🔑 检查Cloudflare登录状态..."
if ! wrangler whoami >/dev/null 2>&1; then
    echo "⚠️  未检测到Cloudflare登录，请手动运行: wrangler login"
    echo "然后重新运行此脚本"
    exit 1
fi

# 部署
echo "📤 开始部署..."
wrangler pages deploy .next --project-name=image-bg-remover-next --branch=main

echo "========================================"
echo "✅ 部署完成！"
echo ""
echo "📋 部署信息:"
echo "   项目名称: image-bg-remover-next"
echo "   账户ID: da9508a0610236e7085687e13c88bf59"
echo "   分支: main"
echo ""
echo "🔗 访问地址:"
echo "   https://image-bg-remover-next.pages.dev"
echo ""
echo "📊 管理面板:"
echo "   https://dash.cloudflare.com/da9508a0610236e7085687e13c88bf59/pages"
echo ""
echo "🔄 GitHub集成说明:"
echo "   1. 访问 https://dash.cloudflare.com/"
echo "   2. 进入 Pages 页面"
echo "   3. 点击 'Connect to Git'"
echo "   4. 选择你的GitHub仓库"
echo "   5. 配置构建设置:"
echo "      - Build command: npm run build"
echo "      - Build output directory: .next"
echo "      - Root directory: /"
echo "   6. 添加环境变量:"
echo "      - REMOVE_BG_API_KEY: $REMOVE_BG_API_KEY"
echo "      - NODE_ENV: production"
echo ""
echo "💡 提示: 部署后可能需要几分钟才能生效"