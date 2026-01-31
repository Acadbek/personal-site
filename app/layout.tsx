import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import LocalFont from 'next/font/local'
import './globals.css'
import { Header } from './header'
import { Footer } from './footer'
import { ThemeProvider } from 'next-themes'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ffffff',
}

const geist = Geist({
  variable: '--font-geist',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

const season = LocalFont({
  src: '../public/fonts/season.ttf',
  variable: '--font-season',
})

export const metadata: Metadata = {
  title: {
    template: '%s',
    default: 'AN',
  },
  icons: {
    icon: '/logo.ico',
  },
  openGraph: {
    locale: 'en_US'
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geist.variable} ${geistMono.variable} ${season.variable} bg-white tracking-tight !lowercase antialiased dark:bg-zinc-950`}
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

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Asadbek Nosirjonov',
              alternateName: 'AN',
              url: 'https://nosirjonov.uz',
              image: 'https://nosirjonov.uz/profile.jpg',
              jobTitle: 'Design Engineer & Web Pentester',
              worksFor: {
                '@type': 'Organization',
                name: 'Freelance',
              },
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Tashkent',
                addressCountry: 'UZ',
              },
              sameAs: [
                'https://twitter.com/malfoyintech',
                'https://github.com/Acadbek',
                'https://www.linkedin.com/in/asadnosirov/',
              ],
              knowsAbout: [
                'Web Development',
                'React',
                'Next.js',
                'Penetration Testing',
                'Web Security',
                'TypeScript',
              ],
            }),
          }}
        />
      </body>
    </html>
  )
}
