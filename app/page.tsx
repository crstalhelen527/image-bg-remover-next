'use client'

import { useState, useCallback, useEffect } from 'react'
import { Upload, Download, Image as ImageIcon, CheckCircle, AlertCircle, RotateCw } from 'lucide-react'

export default function Home() {
  const [status, setStatus] = useState<'idle' | 'preview' | 'uploading' | 'processing' | 'completed' | 'error'>('idle')
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState('')
  const [originalImage, setOriginalImage] = useState('')
  const [processedImage, setProcessedImage] = useState('')
  const [fileInfo, setFileInfo] = useState<{ name: string; size: number } | null>(null)

  const handleFileSelect = useCallback((file: File) => {
    // 验证文件
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    if (!validTypes.includes(file.type)) {
      setError('不支持的文件格式。请上传 JPG、PNG 或 WebP 格式的图片。')
      setStatus('error')
      return
    }

    // 验证文件大小 (5MB)
    const maxSize = 5 * 1024 * 1024
    if (file.size > maxSize) {
      setError('文件过大。图片大小不能超过 5MB。')
      setStatus('error')
      return
    }

    // 重置状态
    setError('')
    setStatus('preview')
    setProgress(0)
    setFileInfo({
      name: file.name,
      size: file.size
    })

    // 预览原始图片
    const reader = new FileReader()
    reader.onload = (e) => {
      setOriginalImage(e.target?.result as string)
    }
    reader.readAsDataURL(file)
  }, [])

  const handleRemoveBackground = useCallback(async () => {
    if (!originalImage) return
    
    setStatus('uploading')
    setProgress(25)

    try {
      // 第一步：准备数据
      await new Promise(resolve => setTimeout(resolve, 300))
      setProgress(40)
      
      // 第二步：调用API
      setStatus('processing')
      setProgress(60)
      
      console.log('开始调用Remove.bg API...')
      
      const response = await fetch('/api/remove-bg', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image: originalImage,
          size: 'auto',
          format: 'png'
        }),
      })

      setProgress(80)
      
      const result = await response.json()
      
      if (!response.ok) {
        console.error('API调用失败:', result)
        throw new Error(result.message || '背景移除失败')
      }

      if (!result.success || !result.image) {
        throw new Error('API返回数据格式错误')
      }

      console.log('Remove.bg API调用成功，图片大小:', result.size || '未知')
      
      // 设置处理后的图片
      setProcessedImage(result.image)
      
      // 完成
      setProgress(100)
      await new Promise(resolve => setTimeout(resolve, 300))
      setStatus('completed')

    } catch (err) {
      console.error('处理错误:', err)
      setError(err instanceof Error ? err.message : '处理失败，请稍后重试')
      setStatus('error')
    }
  }, [originalImage])

  const handleFileInput = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      handleFileSelect(file)
    }
  }, [handleFileSelect])

  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.stopPropagation()
    
    const file = event.dataTransfer.files[0]
    if (file) {
      handleFileSelect(file)
    }
  }, [handleFileSelect])

  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.stopPropagation()
  }, [])

  const handleDownload = useCallback(() => {
    if (!processedImage) return
    
    const link = document.createElement('a')
    link.href = processedImage
    link.download = `background-removed-${Date.now()}.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }, [processedImage])

  const handleReset = useCallback(() => {
    setStatus('idle')
    setProgress(0)
    setError('')
    setOriginalImage('')
    setProcessedImage('')
    setFileInfo(null)
  }, [])

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg">
              <ImageIcon className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Image Background Remover
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            免费在线图片背景移除工具 · 使用AI技术一键去除背景 · 保护隐私安全
          </p>
        </header>

        {/* Main Content */}
        <main className="space-y-8">
          {/* Upload Area */}
          {status === 'idle' && (
            <div className="border-2 border-dashed border-blue-300 rounded-xl p-8 hover:border-blue-500 transition-colors">
              <div
                className="flex flex-col items-center justify-center p-12 rounded-lg bg-gradient-to-br from-blue-50 to-purple-50 cursor-pointer hover:from-blue-100 hover:to-purple-100 transition-all"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onClick={() => document.getElementById('file-input')?.click()}
              >
                <div className="p-6 bg-white rounded-2xl shadow-lg mb-6">
                  <Upload className="h-16 w-16 text-blue-500" />
                </div>
                <p className="text-lg font-medium text-gray-700 mb-2">
                  拖拽图片到此处
                </p>
                <p className="text-gray-500 mb-6">或点击选择文件</p>
                
                <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                  <ImageIcon className="h-4 w-4" />
                  选择图片
                </button>
                
                <input
                  id="file-input"
                  type="file"
                  accept=".jpg,.jpeg,.png,.webp"
                  className="hidden"
                  onChange={handleFileInput}
                />
                
                <div className="mt-8 text-sm text-gray-500 space-y-1">
                  <p>📁 支持格式：JPG、PNG、WebP</p>
                  <p>📏 最大尺寸：5MB</p>
                  <p>🛡️ 隐私保护：图片不存储到服务器</p>
                </div>
              </div>
            </div>
          )}

          {/* Preview State - 显示图片预览和移除背景按钮 */}
          {status === 'preview' && (
            <div className="space-y-6 animate-in">
              <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <ImageIcon className="h-8 w-8 text-blue-600" />
                  <h2 className="text-2xl font-bold text-blue-600">图片预览</h2>
                </div>
                <p className="text-gray-600">确认要移除这张图片的背景吗？</p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <ImageIcon className="h-5 w-5 text-blue-600" />
                  已选择图片
                </h3>
                <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center mb-4">
                  {originalImage ? (
                    <img
                      src={originalImage}
                      alt="原始图片"
                      className="max-w-full max-h-full object-contain"
                    />
                  ) : (
                    <ImageIcon className="h-16 w-16 text-gray-400" />
                  )}
                </div>
                
                {fileInfo && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="font-medium mb-2">文件信息：</p>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>📄 名称：{fileInfo.name}</p>
                      <p>📊 大小：{formatFileSize(fileInfo.size)}</p>
                      <p>📁 格式：{fileInfo.name.split('.').pop()?.toUpperCase()}</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
                  onClick={handleReset}
                >
                  <Upload className="h-4 w-4" />
                  重新选择
                </button>
                <button
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all flex items-center gap-2 shadow-lg"
                  onClick={handleRemoveBackground}
                >
                  <CheckCircle className="h-4 w-4" />
                  一键清除背景
                </button>
              </div>
            </div>
          )}

          {/* Processing State */}
          {(status === 'uploading' || status === 'processing') && (
            <div className="bg-white rounded-xl shadow-lg p-8 animate-in">
              <div className="text-center space-y-6">
                <div className="flex items-center justify-center gap-3">
                  <div className="animate-spin-slow">
                    <RotateCw className="h-8 w-8 text-blue-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    {status === 'uploading' ? '正在上传图片...' : '正在移除背景...'}
                  </h2>
                </div>
                
                <div className="space-y-4">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <p className="text-2xl font-bold text-blue-600">{progress}%</p>
                  <p className="text-gray-600">
                    {progress < 30 && '正在验证文件...'}
                    {progress >= 30 && progress < 60 && '正在上传图片...'}
                    {progress >= 60 && progress < 90 && '正在处理图片...'}
                    {progress >= 90 && '即将完成...'}
                  </p>
                </div>

                {fileInfo && (
                  <div className="bg-gray-50 rounded-lg p-4 max-w-md mx-auto">
                    <p className="font-medium mb-2">文件信息：</p>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>📄 名称：{fileInfo.name}</p>
                      <p>📊 大小：{formatFileSize(fileInfo.size)}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Completed State */}
          {status === 'completed' && (
            <div className="space-y-6 animate-in">
              <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                  <h2 className="text-2xl font-bold text-green-600">处理完成！</h2>
                </div>
                <p className="text-gray-600">背景已成功移除，可以下载处理后的图片</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Original Image */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <ImageIcon className="h-5 w-5 text-blue-600" />
                    原始图片
                  </h3>
                  <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
                    {originalImage ? (
                      <img
                        src={originalImage}
                        alt="原始图片"
                        className="max-w-full max-h-full object-contain"
                      />
                    ) : (
                      <ImageIcon className="h-16 w-16 text-gray-400" />
                    )}
                  </div>
                  {fileInfo && (
                    <p className="text-sm text-gray-500 mt-4 text-center">
                      {formatFileSize(fileInfo.size)}
                    </p>
                  )}
                </div>

                {/* Processed Image */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-green-600">
                    <CheckCircle className="h-5 w-5" />
                    处理后图片
                  </h3>
                  <div className="aspect-square bg-gradient-to-br from-blue-50 to-green-50 rounded-lg overflow-hidden flex items-center justify-center">
                    {processedImage ? (
                      <img
                        src={processedImage}
                        alt="处理后图片"
                        className="max-w-full max-h-full object-contain"
                      />
                    ) : (
                      <ImageIcon className="h-16 w-16 text-gray-400" />
                    )}
                  </div>
                  <p className="text-sm text-gray-500 mt-4 text-center">
                    PNG · 透明背景
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  className="px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors flex items-center gap-2"
                  onClick={handleReset}
                >
                  <Upload className="h-4 w-4" />
                  上传新图片
                </button>
                <button
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                  onClick={handleDownload}
                >
                  <Download className="h-4 w-4" />
                  下载图片
                </button>
              </div>
            </div>
          )}

          {/* Error State */}
          {status === 'error' && (
            <div className="bg-red-50 border border-red-200 rounded-xl shadow-lg p-8 animate-in">
              <div className="text-center space-y-6">
                <div className="flex items-center justify-center gap-3">
                  <AlertCircle className="h-8 w-8 text-red-600" />
                  <h2 className="text-2xl font-bold text-red-600">处理失败</h2>
                </div>
                
                <div className="space-y-4">
                  <p className="text-lg font-medium text-gray-700">{error}</p>
                  <p className="text-gray-500">请检查文件格式和大小后重试</p>
                </div>

                <button
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 mx-auto"
                  onClick={handleReset}
                >
                  <RotateCw className="h-4 w-4" />
                  重新上传
                </button>
              </div>
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="mt-16 border-t border-gray-200 pt-8">
          <div className="text-center text-gray-500 text-sm">
            <p>© 2026 Image Background Remover · 基于MIT开源协议</p>
            <p className="mt-2">使用Remove.bg API和Cloudflare部署</p>
          </div>
        </footer>
      </div>
    </div>
  )
}