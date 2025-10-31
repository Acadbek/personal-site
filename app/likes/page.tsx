import React from 'react'
import { getLikes } from '@/lib/github'
import LikesClient from './likes-client'

export const metadata = {
  title: 'My Likes',
  description: 'Collection of things I love'
}

export default async function LikesPage() {
  const likes = await getLikes()
  return <LikesClient likes={likes} />
}
