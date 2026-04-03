import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { image, size = 'auto', format = 'png' } = await request.json()

    if (!image) {
      return NextResponse.json(
        { error: 'Missing image data', message: '请提供图片数据' },
        { status: 400 }
      )
    }

    // 获取Remove.bg API Key
    const apiKey = process.env.REMOVE_BG_API_KEY
    
    if (!apiKey) {
      return NextResponse.json(
        { 
          error: 'API key not configured', 
          message: 'Remove.bg API密钥未配置',
          details: '请检查环境变量REMOVE_BG_API_KEY'
        },
        { status: 500 }
      )
    }

    console.log('调用Remove.bg API，图片大小:', image.length, '字符')
    
    // Remove.bg API调用
    const apiUrl = 'https://api.remove.bg/v1.0/removebg'
    
    // 移除Base64前缀（data:image/png;base64,）
    const base64Data = image.includes('base64,') 
      ? image.split('base64,')[1] 
      : image
    
    try {
      // 转换Base64为Buffer
      const imageBuffer = Buffer.from(base64Data, 'base64')
      
      // 创建FormData
      const formData = new FormData()
      formData.append('image_file', new Blob([imageBuffer]), 'image.png')
      formData.append('size', size)
      formData.append('format', format)
      
      console.log('发送请求到Remove.bg API...')
      
      // 调用Remove.bg API
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'X-Api-Key': apiKey,
        },
        body: formData,
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error('Remove.bg API错误:', response.status, errorText)
        
        let errorMessage = '背景移除失败'
        if (response.status === 401) {
          errorMessage = 'API密钥无效'
        } else if (response.status === 402) {
          errorMessage = 'API额度已用完'
        } else if (response.status === 422) {
          errorMessage = '图片格式不支持或质量太差'
        } else if (response.status === 429) {
          errorMessage = '请求过于频繁，请稍后重试'
        }
        
        return NextResponse.json(
          { 
            error: 'Remove.bg API error',
            message: errorMessage,
            details: errorText,
            status: response.status
          },
          { status: response.status }
        )
      }

      console.log('Remove.bg API调用成功')
      
      // 获取处理后的图片
      const resultBlob = await response.blob()
      const resultBuffer = await resultBlob.arrayBuffer()
      const resultBase64 = Buffer.from(resultBuffer).toString('base64')
      
      // 返回Base64格式的图片
      return NextResponse.json({
        success: true,
        image: `data:image/${format};base64,${resultBase64}`,
        format: format,
        size: resultBuffer.byteLength
      })

    } catch (fetchError) {
      console.error('Fetch error:', fetchError)
      throw fetchError
    }

  } catch (error) {
    console.error('API处理错误:', error)
    
    return NextResponse.json(
      { 
        error: 'Internal server error', 
        message: '服务器内部错误，请稍后重试',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
}