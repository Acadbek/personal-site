import { Metadata } from 'next';
import ProjectClient from './project-client'

export const metadata: Metadata = {
  title: 'AN - Projects',
  description: 'Browse through our collection of innovative projects and development work. Discover creative solutions and technical implementations.',
  keywords: ['projects', 'portfolio', 'web development', 'software', 'nosirjonov projects', 'asadbek projects', 'beautiful website', 'work'],
  openGraph: {
    title: 'Projects | AN',
    description: 'Browse through our collection of innovative projects and development work.',
    url: 'https://nosirjonov.uz/projects',
    siteName: 'AN',
    images: [
      {
        url: 'https://yoursite.com/og-projects.jpg',
        width: 1200,
        height: 630,
        alt: 'Projects Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Projects | AN',
    description: 'Browse through our collection of innovative projects.',
    images: ['https://yoursite.com/og-projects.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
};


export default function page() {
  return <ProjectClient />
}
