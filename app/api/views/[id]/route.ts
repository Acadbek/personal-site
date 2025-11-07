import { kv } from '@vercel/kv';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  if (!id) {
    return NextResponse.json({ error: 'Invalid project ID' }, { status: 400 });
  }

  const key = `views:${id}`;

  try {
    const views = await kv.get(key) || 0;
    return NextResponse.json({ views });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  if (!id) {
    return NextResponse.json({ error: 'Invalid project ID' }, { status: 400 });
  }

  const key = `views:${id}`;

  try {
    const views = await kv.incr(key);
    return NextResponse.json({ views });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
