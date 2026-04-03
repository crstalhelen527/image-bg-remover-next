import { Github, Shield, Cloud, Zap } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-gray-200 pt-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Shield className="h-5 w-5 text-blue-600" />
            隐私与安全
          </h3>
          <p className="text-gray-600 text-sm">
            所有图片处理均在内存中进行，不会保存到任何服务器。
            处理完成后立即清除图片数据，保护您的隐私安全。
          </p>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Cloud className="h-5 w-5 text-purple-600" />
            技术栈
          </h3>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
              Next.js 15
            </span>
            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
              Tailwind CSS
            </span>
            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
              Cloudflare
            </span>
            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
              Remove.bg API
            </span>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Zap className="h-5 w-5 text-pink-600" />
            使用限制
          </h3>
          <ul className="text-gray-600 text-sm space-y-2">
            <li className="flex items-center gap-2">
              <div className="h-2 w-2 bg-green-500 rounded-full"></div>
              免费额度：每月50张
            </li>
            <li className="flex items-center gap-2">
              <div className="h-2 w-2 bg-green-500 rounded-full"></div>
              文件大小：最大5MB
            </li>
            <li className="flex items-center gap-2">
              <div className="h-2 w-2 bg-green-500 rounded-full"></div>
              支持格式：JPG, PNG, WebP
            </li>
          </ul>
        </div>
      </div>
      
      <div className="border-t border-gray-200 pt-6 flex flex-col md:flex-row justify-between items-center">
        <div className="text-gray-500 text-sm mb-4 md:mb-0">
          © 2026 Image Background Remover · 基于MIT开源协议
        </div>
        <a
          href="https://github.com/crstalhelen527/image-background-remover"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
        >
          <Github className="h-4 w-4" />
          查看GitHub项目
        </a>
      </div>
    </footer>
  )
}