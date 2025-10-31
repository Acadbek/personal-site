import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { Header } from './header'
import { Footer } from './footer'
import { ThemeProvider } from 'next-themes'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ffffff',
}

export const metadata: Metadata = {
  title: {
    template: '%s | Asadbek Nosirjonov',
    default: 'AN',
  },
  icons: {
    icon: '/logo.ico',
  },
  description:
    'Asadbek Nosirjonov - Web pentester & Frontend Developer specializing in modern, responsive websites with React, Vue, and more.',
  keywords: [
    'Asadbek Nosirjonov',
    'void ui',
    'voidui',
    'design engineer',
    'Frotend',
    'Uzbekistan developer',
    'void',
    'shadcn registry',
    'Asadbek Nosirjonov',
    'asadbek',
    'asad',
    'Frontend Developer',
    'Web Developer',
    'React Developer',
    'Uzbekistan Developer',
    'JavaScript',
    'Portfolio',
    'Penetration Testing',
    'Web Pentester',
    'Web Security',
  ],
  authors: [{ name: 'Asadbek Nosirjonov', url: 'https://nosirjonov.uz' }],
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://nosirjonov.uz',
  },
  openGraph: {
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
    siteName: 'Asadbek Nosirjonov Portfolio',
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

const geist = Geist({
  variable: '--font-geist',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geist.variable} ${geistMono.variable} bg-white tracking-tight !lowercase antialiased dark:bg-zinc-950`}
      >
        <ThemeProvider
          enableSystem={true}
          attribute="class"
          storageKey="theme"
          defaultTheme="system"
        >
          <div className="flex min-h-screen w-full flex-col font-[family-name:var(--font-inter-tight)]">
            <div className="relative mx-auto w-full max-w-screen-sm flex-1 px-4 pt-20">
              <Header />
              {children}
              <Footer />
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
