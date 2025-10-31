import React from 'react'
import { getLikeById, getLikes } from '@/lib/github'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'

type Props = {
  params: { id: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const like = await getLikeById(params.id)

  if (!like) {
    return {
      title: 'Not Found'
    }
  }

  return {
    title: like.title,
    description: like.description !== 'N/A' ? like.description : 'View this like',
    openGraph: {
      title: like.title,
      description: like.description !== 'N/A' ? like.description : undefined,
      images: like.imageUrl ? [like.imageUrl] : undefined,
    }
  }
}

export async function generateStaticParams() {
  const likes = await getLikes()
  return likes.map((like) => ({
    id: like.number.toString(),
  }))
}

export default async function LikeDetailPage({ params }: Props) {
  const like = await getLikeById(params.id)

  if (!like) {
    notFound()
  }

  return (
    <div>
      <div>
        {/* Back button */}
        <Link
          href="/likes"
          className="inline-flex items-center gap-2 mb-6 text-xs hover:text-zinc-400 transition"
        >
          <span>←</span> Back
        </Link>

        {/* Main Card */}
        <article>
          {/* Image */}
          {like.imageUrl && (
            <div className="aspect-[16/9] relative h-96 w-full">
              <Image
                src={like.imageUrl}
                alt={like.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Content */}
          <div>
            {/* Category badge */}
            <div className="flex items-center gap-2 mb-4">
              <span className=" text-blue-700 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2">
                {getCategoryEmoji(like.category)} {like.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl font-bold mb-4">
              {like.title}
            </h1>

            {/* Description */}
            {like.description !== 'N/A' && (
              <div className="prose prose-lg max-w-none mb-6">
                <p className="text-gray-700 leading-relaxed">
                  {like.description}
                </p>
              </div>
            )}

            {/* Divider */}
            <div className="border-t my-6"></div>

            {/* Links Section */}
            <div className="space-y-4 mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Links</h3>

              <div className="space-y-3">
                <Link
                  href={like.pageUrl}
                  target="_blank"
                  className="flex items-center gap-3 p-3 border rounded-lg hover:border-blue-300 transition group"
                >
                  <span className="text-2xl">🔗</span>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900 group-hover:text-blue-600">
                      Visit Page
                    </div>
                    <div className="text-sm text-gray-500 truncate">
                      {like.pageUrl}
                    </div>
                  </div>
                  <span className="text-gray-400 group-hover:text-blue-600">→</span>
                </Link>

                {like.src !== 'N/A' && (
                  <Link
                    href={like.src}
                    target="_blank"
                    className="flex items-center gap-3 p-3 border rounded-lg hover:bg-purple-50 hover:border-purple-300 transition group"
                  >
                    <span className="text-2xl">📖</span>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900 group-hover:text-purple-600">
                        Original Source
                      </div>
                      <div className="text-sm text-gray-500 truncate">
                        {like.src}
                      </div>
                    </div>
                    <span className="text-gray-400 group-hover:text-purple-600">→</span>
                  </Link>
                )}
              </div>
            </div>

            {/* Tags */}
            {like.tags.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Tags</h3>
                <div className="flex gap-2 flex-wrap">
                  {like.tags.map(tag => (
                    <span
                      key={tag}
                      className="text-gray-700 px-3 py-1.5 rounded-full text-sm font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Divider */}
            <div className="border-t my-6"></div>

            {/* Metadata */}
            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center gap-4">
                <time>
                  Added on {new Date(like.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
              </div>

              <Link
                href={like.githubUrl}
                target="_blank"
                className="hover:text-gray-700 transition flex items-center gap-1"
              >
                <span>View on GitHub</span>
                <span>↗</span>
              </Link>
            </div>
          </div>
        </article>
      </div>
    </div>
  )
}

function getCategoryEmoji(category: string): string {
  const emojis: Record<string, string> = {
    youtube: '📺',
    book: '📚',
    movie: '🎬',
    article: '📰',
    tool: '🛠️',
    design: '🎨',
    other: '📌'
  }
  return emojis[category] || '📌'
}
