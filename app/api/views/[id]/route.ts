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
    console.log('GET request for ID:', id)
    
    if (!id) {
      return NextResponse.json({ error: 'Invalid project ID' }, { status: 400 })
    }

    const key = `views:${id}`
    const views = (await kv.get<number>(key)) || 0
    
    console.log('Views for', key, ':', views)
    return NextResponse.json({ views })
  } catch (error) {
    console.error('GET Error:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: String(error) },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params
    console.log('POST request for ID:', id)
    
    if (!id) {
      return NextResponse.json({ error: 'Invalid project ID' }, { status: 400 })
    }

    const key = `views:${id}`
    const views = await kv.incr(key)
    
    console.log('Incremented views for', key, ':', views)
    return NextResponse.json({ views })
  } catch (error) {
    console.error('POST Error:', error)
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
