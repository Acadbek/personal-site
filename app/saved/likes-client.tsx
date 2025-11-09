'use client'

import React, { useMemo } from 'react'
import { motion } from 'motion/react'
import Link from 'next/link'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'

type Like = {
  id: string | number
  category: string
  number: number
  title: string
  description: string
  createdAt: string
  tags: string[]
  src: string
  pageUrl: string
}

const VARIANTS_CONTAINER = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const VARIANTS_SECTION = {
  hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
}

const TRANSITION_SECTION = {
  duration: 0.3,
}

export default function LikesClient({ likes }: { likes: Like[] }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const selectedCategory = searchParams.get('category') || 'all'
  const urlSearchQuery = searchParams.get('q') || ''

  const [searchQuery, setSearchQuery] = React.useState(urlSearchQuery)

  const categories = useMemo(() => {
    const allCategories = likes.map((like) => like.category)
    return ['all', ...Array.from(new Set(allCategories))]
  }, [likes])

  React.useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString())

      if (searchQuery) {
        params.set('q', searchQuery)
      } else {
        params.delete('q')
      }

      router.replace(`${pathname}?${params.toString()}`, { scroll: false })
    }, 300)

    return () => clearTimeout(timer)
  }, [searchQuery, pathname, searchParams, router])

  React.useEffect(() => {
    setSearchQuery(urlSearchQuery)
  }, [urlSearchQuery])

  const searchedLikes = useMemo(() => {
    if (!searchQuery) {
      return likes
    }

    const lowerQuery = searchQuery.toLowerCase()

    return likes.filter(
      (like) =>
        like.title.toLowerCase().includes(lowerQuery) ||
        (like.description &&
          like.description.toLowerCase().includes(lowerQuery)) ||
        like.tags.some((tag) => tag.toLowerCase().includes(lowerQuery)),
    )
  }, [likes, searchQuery])

  const filteredLikes = useMemo(() => {
    if (selectedCategory === 'all') {
      return searchedLikes
    }
    return searchedLikes.filter((like) => like.category === selectedCategory)
  }, [searchedLikes, selectedCategory])

  const grouped = useMemo(() => {
    return filteredLikes.reduce(
      (acc, like) => {
        if (!acc[like.category]) {
          acc[like.category] = []
        }
        acc[like.category].push(like)
        return acc
      },
      {} as Record<string, Like[]>,
    )
  }, [filteredLikes])

  const handleCategoryClick = (category: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (category === 'all') {
      params.delete('category')
    } else {
      params.set('category', category)
    }
    router.push(`${pathname}?${params.toString()}`)
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  return (
    <motion.main
      className="space-y-24"
      variants={VARIANTS_CONTAINER}
      initial="hidden"
      animate="visible"
    >
      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <div className="mb-4">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search by title, description, or tag..."
            className="h-8 w-full border text-xs sm:text-sm dark:border-zinc-700 dark:bg-zinc-900 px-3 dark:text-white dark:placeholder-zinc-500 focus:ring-2 dark:focus:ring-white/50 focus:outline-none"
          />
        </div>

        <div className="mb-6 flex items-center gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={`flex-shrink-0 px-4 py-1.5 text-sm font-medium capitalize transition-colors ${selectedCategory === category
                ? 'dark:bg-white dark:text-black bg-zinc-100 text-black hover:opacity-90'
                : 'dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700 border dark:border-none'
                } `}
            >
              {category}
            </button>
          ))}
        </div>

        {selectedCategory === 'all' &&
          Object.entries(grouped).map(([category, items]) => (
            <section key={category} className="mb-12">
              <div className="mb-4 flex items-center gap-3">
                <h2 className="flex items-center text-xl font-semibold capitalize">
                  {category}
                </h2>
                <span className="rounded-full dark:bg-zinc-800 px-2 py-0.5 font-mono text-xs dark:text-zinc-400 bg-zinc-100">
                  {items.length}
                </span>
              </div>
              <ItemList items={items} />
            </section>
          ))}

        {selectedCategory !== 'all' && <ItemList items={filteredLikes} />}

        {likes.length === 0 && (
          <div className="py-20 text-center">
            <p className="mb-4 text-6xl">📭</p>
            <h2 className="mb-2 text-2xl font-bold text-gray-700">
              No likes yet
            </h2>
            <p className="text-gray-500">
              Start adding things you love with the extension!
            </p>
          </div>
        )}

        {likes.length > 0 && filteredLikes.length === 0 && (
          <div className="py-20 text-center">
            <p className="mb-4 text-6xl">📭</p>
            <h2 className="mb-2 text-2xl font-bold text-gray-700">
              No items found
            </h2>

            {searchQuery && selectedCategory === 'all' && (
              <p className="text-gray-500">
                No results found for "{searchQuery}".
              </p>
            )}

            {searchQuery && selectedCategory !== 'all' && (
              <p className="text-gray-500">
                No results found for "{searchQuery}" in the "{selectedCategory}"
                category.
              </p>
            )}

            {!searchQuery && selectedCategory !== 'all' && (
              <p className="text-gray-500">
                There are no items in the "{selectedCategory}" category.
              </p>
            )}
          </div>
        )}
      </motion.section>
    </motion.main>
  )
}

function ItemList({ items }: { items: Like[] }) {
  return (
    <div className="divide-y dark:divide-zinc-800 border-l dark:border-l-zinc-800">
      {items.map((item) => (
        <div key={item.id} className="group block px-4 py-4 transition-all">
          <div className="flex items-start justify-between gap-4">
            <Link href={`/saved/${item.number}`} className="min-w-0 flex-1">
              <h3 className="font-base group relative truncate text-zinc-900 dark:text-zinc-50 mb-1.5 font-medium transition">
                {item.title}
                <span className="absolute bottom-0.5 left-0 block h-[1px] w-full max-w-0 bg-zinc-900 transition-all duration-400 group-hover:max-w-full dark:bg-zinc-50"></span>
              </h3>

              {item.description !== 'N/A' && (
                <p className="mb-3 line-clamp-2 text-sm text-gray-500">
                  {item.description}
                </p>
              )}

              <div className="flex items-center gap-4 text-xs text-gray-500">
                <time className='text-nowrap flex-shrink-0'>
                  {new Date(item.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </time>
                {item.tags.length > 0 && (
                  <div className="flex gap-2 overflow-x-auto scrollbar-hide min-w-0">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="flex-shrink-0 rounded text-nowrap dark:bg-zinc-800 bg-zinc-100 px-2 py-0.5 dark:text-zinc-400 text-zinc-500"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </Link>

            <a
              target="_blank"
              rel="noopener noreferrer"
              href={item.src != 'N/A' ? item.src : item.pageUrl}
              className="mt-1 flex-shrink-0 items-center justify-center border dark:border-zinc-700 p-2 dark:hover:bg-zinc-800 hover:bg-zinc-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 32 32"
              >
                <path
                  fill="#888888"
                  d="M10 6v2h12.59L6 24.59L7.41 26L24 9.41V22h2V6z"
                />
              </svg>
            </a>
          </div>
        </div>
      ))}
    </div>
  )
}
