import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Image Background Remover - 免费在线图片背景移除工具',
  description: '使用Remove.bg API和Cloudflare部署的在线图片背景移除工具。支持拖拽上传，一键处理，保护隐私安全。',
  keywords: ['图片背景移除', 'Remove.bg', '在线工具', '图片处理', '背景去除'],
  openGraph: {
    title: 'Image Background Remover',
    description: '免费在线图片背景移除工具',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN">
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  )
}