import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'
import { createSupabaseAdminClient } from '@/lib/supabase'
import { hashSessionToken } from '@/lib/auth-security'

const sharp = require('sharp')

function resolveAppRootDir() {
  const cwd = process.cwd()
  const candidates = [cwd, join(cwd, 'aierxuan-website')]
  for (const candidate of candidates) {
    if (existsSync(join(candidate, 'next.config.ts')) && existsSync(join(candidate, 'src', 'app'))) {
      return candidate
    }
  }
  return cwd
}

async function ensureAdminAuth() {
  const cookieStore = await cookies()
  const sessionToken = cookieStore.get('admin_session')?.value
  if (!sessionToken) {
    return { ok: false as const, error: 'Unauthorized: no admin session' }
  }
  const supabase = createSupabaseAdminClient()
  const hashedToken = hashSessionToken(sessionToken)
  const { data, error } = await (supabase.rpc as any)('validate_admin_session', { token: hashedToken }) as { data: any[] | null, error: any }
  if (error || !data || data.length === 0) {
    return { ok: false as const, error: 'Unauthorized: invalid or expired session' }
  }
  return { ok: true as const }
}

export async function POST(request: NextRequest) {
  // 上传必须是登录后的管理员才能操作
  const auth = await ensureAdminAuth()
  if (!auth.ok) {
    return NextResponse.json({ success: false, error: auth.error }, { status: 401 })
  }

  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const type = formData.get('type') as string || 'blog' // 'blog' or 'product'

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No file provided' },
        { status: 400 }
      )
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { success: false, error: 'Invalid file type. Only images are allowed.' },
        { status: 400 }
      )
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { success: false, error: 'File size exceeds 5MB limit' },
        { status: 400 }
      )
    }

    // Generate unique filename
    const timestamp = Date.now()
    const randomString = Math.random().toString(36).substring(2, 15)

    // Determine upload directory based on type
    const uploadSubDir = type === 'product' ? 'products' : 'blog'
    const appPublicDir = join(resolveAppRootDir(), 'public')
    const cwdPublicDir = join(process.cwd(), 'public')
    const publicDirs = appPublicDir === cwdPublicDir ? [appPublicDir] : [appPublicDir, cwdPublicDir]
    const uploadDirs = publicDirs.map((dir) => join(dir, 'uploads', uploadSubDir))
    for (const dir of uploadDirs) {
      if (!existsSync(dir)) {
        await mkdir(dir, { recursive: true })
      }
    }

    // Convert file to buffer and compress with sharp
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Compress and convert to WebP
    const compressedBuffer = await sharp(buffer)
      .resize(1920, null, { withoutEnlargement: true })
      .webp({ quality: 80 })
      .toBuffer()

    // Save as WebP
    const webpFilename = `${timestamp}-${randomString}.webp`
    await Promise.all(uploadDirs.map((dir) => writeFile(join(dir, webpFilename), compressedBuffer)))

    // Return the public URL
    const url = `/uploads/${uploadSubDir}/${webpFilename}`

    return NextResponse.json({
      success: true,
      url,
      filename: webpFilename
    })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to upload file' },
      { status: 500 }
    )
  }
}
