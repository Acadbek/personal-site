import React from 'react'
import { getLikes } from '@/lib/github'
import LikesClient from './likes-client'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AN - Saved',
  description: 'View your saved and bookmarked items. Access your favorite projects and resources in one place.',
  keywords: [
    'saved web development projects',
    'bookmarked portfolio items',
    'favorite React projects collection',
    'curated developer resources',
    'web development inspiration saved',
    'personal project collection',
    'developer bookmark manager',
    'portfolio favorites archive',
  ],
  alternates: {
    canonical: 'https://nosirjonov.uz/saved',
  },
  openGraph: {
    title: 'AN - Saved',
    description: 'View your saved and bookmarked items.',
    url: 'https://nosirjonov.uz/saved',
    siteName: 'AN',
    images: [
      {
        url: 'https://nosirjonov.uz/saved-preview.webp',
        width: 1200,
        height: 630,
        alt: 'Saved Items Collection',
        type: 'image/webp',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@malfoyintech',
    creator: '@malfoyintech',
    title: 'Saved Items | Asadbek Nosirjonov',
    description: 'Your bookmarked projects and favorite resources.',
    images: ['https://nosirjonov.uz/saved-preview.webp'],
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default async function LikesPage() {
  const likes = await getLikes()
  return <>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'SavedPage',
          name: 'Projects by Asadbek Nosirjonov',
          description: 'Portfolio of web development and security projects',
          url: 'https://nosirjonov.uz/saved',
          creator: {
            '@type': 'Person',
            name: 'Asadbek Nosirjonov',
            url: 'https://nosirjonov.uz',
          },
        }),
      }}
    />
    <LikesClient likes={likes} />
  </>
}
