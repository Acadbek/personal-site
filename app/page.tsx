import type { Metadata } from 'next'
import HomeClient from './home-client'

export const metadata: Metadata = {
  title: {
    template: 'AN - %s',
    default: 'AN - Design Engineer, Web Pentester',
  },
  icons: {
    icon: '/logo.ico',
  },
  description:
    'Asadbek Nosirjonov - Web pentester & Frontend Developer specializing in modern, responsive websites with React, Vue, and more.',
  keywords: [
    'Asadbek Nosirjonov',
    'asadbek portfolio',
    'asadbek',
    'nosirjonov',

    'React projects showcase',
    'Next.js portfolio projects',
    'TypeScript web applications',
    'Tailwind CSS projects',

    'frontend developer portfolio Uzbekistan',
    'web security projects',
    'penetration testing tools portfolio',
    'cybersecurity portfolio projects',

    'Tashkent web developer projects',
    'Uzbekistan developer portfolio',

    'modern web app examples',
    'responsive website portfolio',
    'open source projects React',
    'full stack developer work',
  ],
  verification: {
    google: '_taaFq4JQrp4Mg4Zs6eNMLT0T7Zd-nU4GstYDnE6txs',
    yandex: 'e53e8044e3df5d6b',
  },
  creator: 'Asadbek Nosirjonov',
  publisher: 'Asadbek Nosirjonov',
  authors: [{ name: 'Asadbek Nosirjonov', url: 'https://nosirjonov.uz' }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1
    },
  },
  alternates: {
    canonical: 'https://nosirjonov.uz',
  },
  openGraph: {
    locale: 'en_US',
    type: 'website',
    url: 'https://nosirjonov.uz',
    title: 'Asadbek Nosirjonov | Web Pentester & Frontend Developer',
    description:
      'Explore the works of Asadbek Nosirjonov, a passionate frontend developer creating responsive, modern, and fast web applications.',
    images: [
      {
        url: 'https://nosirjonov.uz/preview.png',
        width: 1200,
        height: 630,
        alt: 'Asadbek Nosirjonov Portfolio Preview',
      },
    ],
    siteName: 'Asadbek Nosirjonov',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@malfoyintech',
    creator: '@malfoyintech',
    title: 'Asadbek Nosirjonov | Web Pentester & Frontend Developer',
    description:
      'Check out the work of Asadbek Nosirjonov, a frontend developer from Uzbekistan focused on great web experiences.',
    images: ['https://nosirjonov.uz/preview.png'],
  },
}

export default function Home() {
  return <HomeClient />
}
