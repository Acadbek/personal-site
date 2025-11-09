import { kv } from '@vercel/kv'
import { NextRequest, NextResponse } from 'next/server'

type RouteContext = {
  params: Promise<{
    id: string
  }>
}

export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params
    
    if (!id) {
      return NextResponse.json({ error: 'Invalid project ID' }, { status: 400 })
    }

    const key = `views:${id}`
    const views = (await kv.get<number>(key)) || 0
    
    return NextResponse.json({ views })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error', details: String(error) },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params
    
    if (!id) {
      return NextResponse.json({ error: 'Invalid project ID' }, { status: 400 })
    }

    const key = `views:${id}`
    const views = await kv.incr(key)
    
    return NextResponse.json({ views })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error', details: String(error) },
      { status: 500 },
    )
  }
}

export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}
