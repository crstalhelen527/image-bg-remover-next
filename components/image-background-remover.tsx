'use client'

import { useState, useCallback } from 'react'
import { Upload, Image as ImageIcon, Download, RotateCw, CheckCircle, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { validateImageFile, fileToBase64, mockRemoveBgAPI, formatFileSize } from '@/lib/utils'

type ProcessStatus = 'idle' | 'uploading' | 'processing' | 'completed' | 'error'

export default function ImageBackgroundRemover() {
  const [status, setStatus] = useState<ProcessStatus>('idle')
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState<string>('')
  const [originalImage, setOriginalImage] = useState<string>('')
  const [processedImage, setProcessedImage] = useState<string>('')
  const [fileInfo, setFileInfo] = useState<{ name: string; size: number; type: string } | null>(null)

  const handleFileSelect = useCallback(async (file: File) => {
    // 验证文件
    const validation = validateImageFile(file)
    if (!validation.valid) {
      setError(validation.error!)
      setStatus('error')
      return
    }

    // 重置状态
    setError('')
    setStatus('uploading')
    setProgress(25)
    setFileInfo({
      name: file.name,
      size: file.size,
      type: file.type.split('/')[1].toUpperCase()
    })

    try {
      // 预览原始图片
      const reader = new FileReader()
      reader.onload = (e) => {
        setOriginalImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)

      // 模拟上传进度
      await new Promise(resolve => setTimeout(resolve, 500))
      setProgress(50)
      setStatus('processing')

      // 转换为Base64并处理
      const base64Data = await fileToBase64(file)
      
      // 模拟处理进度
      await new Promise(resolve => setTimeout(resolve, 1000))
      setProgress(75)

      // 调用模拟API
      const result = await mockRemoveBgAPI(base64Data)
      setProcessedImage(result)
      
      // 完成
      setProgress(100)
      await new Promise(resolve => setTimeout(resolve, 500))
      setStatus('completed')

    } catch (err) {
      setError('处理失败，请稍后重试')
      setStatus('error')
    }
  }, [])

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

  return (
    <div className="space-y-8">
      {/* 上传区域 */}
      {status === 'idle' && (
        <Card className="border-2 border-dashed border-blue-300 hover:border-blue-500 transition-colors">
          <CardHeader>
            <CardTitle className="flex items-center justify-center gap-2">
              <Upload className="h-6 w-6 text-blue-600" />
              上传图片
            </CardTitle>
            <CardDescription className="text-center">
              拖拽图片到此处，或点击选择文件
            </CardDescription>
          </CardHeader>
          <CardContent>
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
              
              <Button size="lg" className="gap-2">
                <ImageIcon className="h-4 w-4" />
                选择图片
              </Button>
              
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
          </CardContent>
        </Card>
      )}

      {/* 处理状态 */}
      {(status === 'uploading' || status === 'processing') && (
        <Card className="animate-in">
          <CardHeader>
            <CardTitle className="flex items-center justify-center gap-2">
              <div className="animate-spin-slow">
                <RotateCw className="h-6 w-6 text-blue-600" />
              </div>
              处理中...
            </CardTitle>
            <CardDescription className="text-center">
              {status === 'uploading' ? '正在上传图片...' : '正在移除背景...'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Progress value={progress} />
            
            <div className="text-center space-y-2">
              <p className="text-sm text-gray-600">
                {progress < 30 && '正在验证文件...'}
                {progress >= 30 && progress < 60 && '正在上传图片...'}
                {progress >= 60 && progress < 90 && '正在处理图片...'}
                {progress >= 90 && '即将完成...'}
              </p>
              <p className="text-2xl font-bold text-blue-600">{progress}%</p>
            </div>

            {fileInfo && (
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="font-medium mb-2">文件信息：</p>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>📄 名称：{fileInfo.name}</p>
                  <p>📊 大小：{formatFileSize(fileInfo.size)}</p>
                  <p>🎨 格式：{fileInfo.type}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* 完成状态 */}
      {status === 'completed' && (
        <div className="space-y-6 animate-in">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-center gap-2 text-green-600">
                <CheckCircle className="h-6 w-6" />
                处理完成！
              </CardTitle>
              <CardDescription className="text-center">
                背景已成功移除，可以下载处理后的图片
              </CardDescription>
            </CardHeader>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 原始图片 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ImageIcon className="h-5 w-5 text-blue-600" />
                  原始图片
                </CardTitle>
              </CardHeader>
              <CardContent>
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
                    {fileInfo.type} · {formatFileSize(fileInfo.size)}
                  </p>
                )}
              </CardContent>
            </Card>

            {/* 处理后图片 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-600">
                  <CheckCircle className="h-5 w-5" />
                  处理后图片
                </CardTitle>
              </CardHeader>
              <CardContent>
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
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="outline"
              size="lg"
              className="gap-2"
              onClick={handleReset}
            >
              <Upload className="h-4 w-4" />
              上传新图片
            </Button>
            <Button
              variant="success"
              size="lg"
              className="gap-2"
              onClick={handleDownload}
            >
              <Download className="h-4 w-4" />
              下载图片
            </Button>
          </div>
        </div>
      )}

      {/* 错误状态 */}
      {status === 'error' && (
        <Card className="border-red-200 bg-red-50 animate-in">
          <CardHeader>
            <CardTitle className="flex items-center justify-center gap-2 text-red-600">
              <AlertCircle className="h-6 w-6" />
              处理失败
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <p className="text-lg font-medium text-gray-700 mb-2">{error}</p>
              <p className="text-gray-500">请检查文件格式和大小后重试</p>
            </div>
            
            <div className="flex justify-center">
              <Button
                variant="default"
                size="lg"
                className="gap-2"
                onClick={handleReset}
              >
                <RotateCw className="h-4 w-4" />
                重新上传
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}