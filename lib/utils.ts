import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

export function validateImageFile(file: File): { valid: boolean; error?: string } {
  // 验证文件类型
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
  if (!validTypes.includes(file.type)) {
    return { 
      valid: false, 
      error: '不支持的文件格式。请上传 JPG、PNG 或 WebP 格式的图片。' 
    }
  }

  // 验证文件大小 (5MB)
  const maxSize = 5 * 1024 * 1024 // 5MB
  if (file.size > maxSize) {
    return { 
      valid: false, 
      error: '文件过大。图片大小不能超过 5MB。' 
    }
  }

  return { valid: true }
}

export async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      const result = reader.result as string
      resolve(result.split(',')[1]) // 移除 data:image/png;base64, 前缀
    }
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

export function mockRemoveBgAPI(base64Data: string): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      // 创建模拟的处理后图片
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')!
      
      // 加载原始图片
      const img = new Image()
      img.onload = () => {
        canvas.width = img.width
        canvas.height = img.height
        
        // 模拟背景移除效果
        ctx.drawImage(img, 0, 0)
        
        // 添加透明效果模拟
        ctx.globalAlpha = 0.7
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        
        // 返回处理后的图片
        resolve(canvas.toDataURL('image/png'))
      }
      
      img.src = `data:image/png;base64,${base64Data}`
    }, 2000) // 模拟2秒处理时间
  })
}