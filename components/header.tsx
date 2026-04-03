import { Sparkles } from 'lucide-react'

export default function Header() {
  return (
    <header className="text-center mb-12">
      <div className="flex items-center justify-center gap-3 mb-4">
        <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg">
          <Sparkles className="h-8 w-8 text-white" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          Image Background Remover
        </h1>
      </div>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        免费在线图片背景移除工具 · 使用AI技术一键去除背景 · 保护隐私安全
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
          🚀 简单易用
        </span>
        <span className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
          🛡️ 隐私安全
        </span>
        <span className="px-4 py-2 bg-pink-100 text-pink-700 rounded-full text-sm font-medium">
          💰 完全免费
        </span>
        <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium">
          📱 响应式设计
        </span>
      </div>
    </header>
  )
}