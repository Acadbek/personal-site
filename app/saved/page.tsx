import React from 'react'
import { getLikes } from '@/lib/github'
import LikesClient from './likes-client'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AN - Saved',
  description: 'View your saved and bookmarked items. Access your favorite projects and resources in one place.',
  keywords: ['saved', 'bookmarks', 'favorites', 'collection'],
  openGraph: {
    title: 'AN - Saved',
    description: 'View your saved and bookmarked items.',
    url: 'https://nosirjonov.uz/saved',
    siteName: 'AN',
    images: [
      {
        url: 'https://yoursite.com/og-saved.jpg',
        width: 1200,
        height: 630,
        alt: 'Saved Items Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AN - Saved',
    description: 'View your saved and bookmarked items.',
    images: ['https://yoursite.com/og-saved.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function LikesPage() {
  const likes = await getLikes()
  return <LikesClient likes={likes} />
}
