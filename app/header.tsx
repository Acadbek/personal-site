'use client'
import { TextEffect } from '@/components/ui/text-effect'
import Link from 'next/link'

const pages = ['home', 'projects', 'saved']

export function Header() {
  return (
    <header className="mb-8 flex items-center justify-between">
      <div className='w-full'>
        <nav className='flex items-center justify-between'>
          <Link
            href="/"
            className="font-medium text-black !capitalize dark:text-white"
          >
            Asadbek Nosirjonov
          </Link>

          <div className='flex items-center gap-5'>
            {pages.map((link, id) => (
              <Link href={link === 'home' ? '/' : `/${link}`} key={id}>{link}</Link>
            ))}
          </div>
        </nav>
        <TextEffect
          as="p"
          preset="fade"
          per="char"
          className="text-zinc-600 dark:text-zinc-500"
          delay={0.5}
        >
          Design Engineer & Pentester
        </TextEffect>
      </div>
    </header>
  )
}
