// app/api/views/[id]/route.ts

import { kv } from '@vercel/kv'
import { NextRequest, NextResponse } from 'next/server'

// 1. Next.js 15 uchun to'g'ri tip
type RouteContext = {
  params: Promise<{
    id: string
  }>
}

// GET so'rovini qabul qilish
export async function GET(request: NextRequest, context: RouteContext) {
  // 2. await bilan params ni olamiz
  const { id } = await context.params

  if (!id) {
    return NextResponse.json({ error: 'Invalid project ID' }, { status: 400 })
  }

  const key = `views:${id}`

  try {
    const views = (await kv.get<number>(key)) || 0
    return NextResponse.json({ views })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}

// POST so'rovini qabul qilish
export async function POST(request: NextRequest, context: RouteContext) {
  // 2. await bilan params ni olamiz
  const { id } = await context.params

  if (!id) {
    return NextResponse.json({ error: 'Invalid project ID' }, { status: 400 })
  }

  const key = `views:${id}`

  try {
    const views = await kv.incr(key)
    return NextResponse.json({ views })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}
