import React from 'react'
import { getLikeById, getLikes } from '@/lib/github'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'

type Props = {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const like = await getLikeById(id)

  if (!like) {
    return {
      title: 'Not Found',
    }
  }

  return {
    title: like.title,
    description:
      like.description !== 'N/A' ? like.description : 'View this like',
    openGraph: {
      title: like.title,
      description: like.description !== 'N/A' ? like.description : undefined,
      images: like.imageUrl ? [like.imageUrl] : undefined,
    },
  }
}

export async function generateStaticParams() {
  const likes = await getLikes()
  return likes.map((like) => ({
    id: like.number.toString(),
  }))
}

export default async function LikeDetailPage({ params }: Props) {
  const { id } = await params
  const like = await getLikeById(id)

  if (!like) {
    notFound()
  }

  return (
    <div>
      <div>
        {/* Back button */}
        <Link
          href="/saved"
          className="mb-6 inline-flex items-center gap-2 text-xs transition hover:text-zinc-400"
        >
          <span>←</span> Back
        </Link>

        {/* Main Card */}
        <article>
          {/* Image */}
          {like.imageUrl && (
            <div className="relative aspect-[16/9] h-96 w-full">
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
            <div className="mb-4 flex items-center gap-2">
              <span className="flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium text-blue-700">
                {getCategoryEmoji(like.category)} {like.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="mb-4 text-4xl font-bold font-season">{like.title}</h1>

            {/* Description */}
            {like.description !== 'N/A' && (
              <div className="prose prose-lg mb-6 max-w-none">
                <p className="leading-relaxed text-gray-700">
                  {like.description}
                </p>
              </div>
            )}

            {/* Divider */}
            <div className="my-6 border-t"></div>

            {/* Links Section */}
            <div className="mb-6 space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 font-season">Links</h3>

              <div className="space-y-3">
                <Link
                  href={like.pageUrl}
                  target="_blank"
                  className="group flex items-center gap-3 rounded-lg border p-3 transition hover:border-blue-300"
                >
                  <span className="text-2xl">🔗</span>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900 group-hover:text-blue-600">
                      Visit Page
                    </div>
                    <div className="truncate text-sm text-gray-500">
                      {like.pageUrl}
                    </div>
                  </div>
                  <span className="text-gray-400 group-hover:text-blue-600">
                    →
                  </span>
                </Link>

                {like.src !== 'N/A' && (
                  <Link
                    href={like.src}
                    target="_blank"
                    className="group flex items-center gap-3 rounded-lg border p-3 transition hover:border-purple-300 hover:bg-purple-50"
                  >
                    <span className="text-2xl">📖</span>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900 group-hover:text-purple-600">
                        Original Source
                      </div>
                      <div className="truncate text-sm text-gray-500">
                        {like.src}
                      </div>
                    </div>
                    <span className="text-gray-400 group-hover:text-purple-600">
                      →
                    </span>
                  </Link>
                )}
              </div>
            </div>

            {/* Tags */}
            {like.tags.length > 0 && (
              <div className="mb-6">
                <h3 className="mb-3 text-lg font-semibold text-gray-900 font-season">
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {like.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full px-3 py-1.5 text-sm font-medium text-gray-700"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Divider */}
            <div className="my-6 border-t"></div>

            {/* Metadata */}
            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center gap-4">
                <time>
                  Added on{' '}
                  {(() => {
                    try {
                      return new Date(like.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      });
                    } catch {
                      return 'Invalid date';
                    }
                  })()}
                </time>
              </div>

              <Link
                href={like.githubUrl}
                target="_blank"
                className="flex items-center gap-1 transition hover:text-gray-700"
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
    other: '📌',
  }
  return emojis[category] || '📌'
}
