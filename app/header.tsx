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
              <Link className='font-base group relative inline-block font-[450] text-zinc-900 dark:text-zinc-50' href={link === 'home' ? '/' : `/${link}`} key={id}>{link}
                <span className="absolute bottom-0.5 left-0 block h-[1px] w-full max-w-0 bg-zinc-900 transition-all duration-200 group-hover:max-w-full dark:bg-zinc-50"></span>
              </Link>
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
