import { Metadata } from 'next';
import ProjectClient from './project-client'

export const metadata: Metadata = {
  title: 'AN - Projects',
  description: 'Browse through our collection of innovative projects and development work. Discover creative solutions and technical implementations.',
  keywords: [
    'Asadbek Nosirjonov projects',
    'React projects showcase',
    'Next.js applications',
    'TypeScript projects',
    'projects',
    'software',
    'nosirjonov projects',
    'asadbek projects',
    'beautiful website',
    'work'
  ],
  alternates: {
    canonical: 'https://nosirjonov.uz/projects',
  },
  openGraph: {
    locale: 'en_US',
    type: 'website',
    url: 'https://nosirjonov.uz/projects',
    title: 'AN - Projects',
    description:
      'Discover innovative web applications and security tools built by Asadbek Nosirjonov. From frontend masterpieces to penetration testing utilities.',
    images: [
      {
        url: 'https://nosirjonov.uz/projects-preview.webp',
        width: 1200,
        height: 630,
        alt: 'AN Projects Portfolio',
        type: 'image/webp',
      },
    ],
    siteName: 'AN',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@malfoyintech',
    creator: '@malfoyintech',
    title: 'AN - Projects',
    description:
      'Innovative web development projects and security tools by Asadbek Nosirjonov from Uzbekistan.',
    images: ['https://nosirjonov.uz/projects-preview.webp'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ProjectsPage() {
  return <>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'Projects by Asadbek Nosirjonov',
          description: 'Portfolio of web development and security projects',
          url: 'https://nosirjonov.uz/projects',
          author: {
            '@type': 'Person',
            name: 'Asadbek Nosirjonov',
            url: 'https://nosirjonov.uz',
            jobTitle: 'Design Engineer & Web Pentester',
          },
          inLanguage: 'en-US',
          isPartOf: {
            '@type': 'WebSite',
            name: 'Asadbek Nosirjonov',
            url: 'https://nosirjonov.uz',
          },
        }),
      }}
    />
    <ProjectClient />
  </>
}
