import { kv } from '@vercel/kv'
import { NextRequest, NextResponse } from 'next/server'

type RouteContext = {
  params: Promise<{
    id: string
  }>
}

export async function GET(request: NextRequest, context: RouteContext) {
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

export async function POST(request: NextRequest, context: RouteContext) {
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
