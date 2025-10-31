"use client";

import React, { useMemo } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

type Like = {
  id: string | number;
  category: string;
  number: number;
  title: string;
  description: string;
  createdAt: string;
  tags: string[];
  src: string;
  pageUrl: string;
};

export default function LikesClient({ likes }: { likes: Like[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const selectedCategory = searchParams.get('category') || 'all';
  const searchQuery = searchParams.get('q') || '';

  const categories = useMemo(() => {
    const allCategories = likes.map(like => like.category);
    return ['all', ...Array.from(new Set(allCategories))];
  }, [likes]);

  const searchedLikes = useMemo(() => {
    if (!searchQuery) {
      return likes;
    }

    const lowerQuery = searchQuery.toLowerCase();

    return likes.filter(like =>
      like.title.toLowerCase().includes(lowerQuery) ||
      (like.description && like.description.toLowerCase().includes(lowerQuery)) ||
      like.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
    );
  }, [likes, searchQuery]);

  const filteredLikes = useMemo(() => {
    if (selectedCategory === 'all') {
      return searchedLikes;
    }
    return searchedLikes.filter(like => like.category === selectedCategory);
  }, [searchedLikes, selectedCategory]);

  const grouped = useMemo(() => {
    return filteredLikes.reduce((acc, like) => {
      if (!acc[like.category]) {
        acc[like.category] = [];
      }
      acc[like.category].push(like);
      return acc;
    }, {} as Record<string, Like[]>);
  }, [filteredLikes]);

  const handleCategoryClick = (category: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (category === 'all') {
      params.delete('category');
    } else {
      params.set('category', category);
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    const params = new URLSearchParams(searchParams.toString());

    if (query) {
      params.set('q', query);
    } else {
      params.delete('q');
    }

    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div>
      <div className="mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search by title, description, or tag..."
          className="w-full px-3 h-8 bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-white/50"
        />
      </div>

      <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryClick(category)}
            className={`
              flex-shrink-0 px-4 py-1.5 text-sm font-medium capitalize transition-colors
              ${selectedCategory === category
                ? 'bg-white text-black'
                : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
              }
            `}
          >
            {category}
          </button>
        ))}
      </div>

      {selectedCategory === 'all' && Object.entries(grouped).map(([category, items]) => (
        <section key={category} className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <h2 className="capitalize flex items-center text-xl font-semibold">
              {category}
            </h2>
            <span className="text-xs font-mono rounded-full bg-zinc-800 px-2 py-0.5 text-zinc-400">
              {items.length}
            </span>
          </div>
          <ItemList items={items} />
        </section>
      ))}

      {selectedCategory !== 'all' && (
        <ItemList items={filteredLikes} />
      )}

      {likes.length === 0 && (
        <div className="text-center py-20">
          <p className="text-6xl mb-4">📭</p>
          <h2 className="text-2xl font-bold text-gray-700 mb-2">No likes yet</h2>
          <p className="text-gray-500">Start adding things you love with the extension!</p>
        </div>
      )}

      {likes.length > 0 && filteredLikes.length === 0 && (
        <div className="text-center py-20">
          <p className="text-6xl mb-4">📭</p>
          <h2 className="text-2xl font-bold text-gray-700 mb-2">No items found</h2>

          {searchQuery && selectedCategory === 'all' && (
            <p className="text-gray-500">No results found for "{searchQuery}".</p>
          )}

          {searchQuery && selectedCategory !== 'all' && (
            <p className="text-gray-500">No results found for "{searchQuery}" in the "{selectedCategory}" category.</p>
          )}

          {!searchQuery && selectedCategory !== 'all' && (
            <p className="text-gray-500">There are no items in the "{selectedCategory}" category.</p>
          )}
        </div>
      )}
    </div>
  );
}

function ItemList({ items }: { items: Like[] }) {
  return (
    <div className="border-l border-l-zinc-800 divide-y divide-zinc-800">
      {items.map((item) => (
        <div
          key={item.id}
          className="block px-4 py-4 transition-all group"
        >
          <div className="flex justify-between items-start gap-4">
            <Link href={`/likes/${item.number}`} className="flex-1 min-w-0">
              <h3 className="font-medium group-hover:text-zinc-400 transition mb-1.5 truncate">
                {item.title}
              </h3>

              {item.description !== 'N/A' && (
                <p className="text-gray-500 text-sm line-clamp-2 mb-3">
                  {item.description}
                </p>
              )}

              <div className="flex items-center gap-4 text-xs text-gray-500">
                <time>
                  {new Date(item.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric', month: 'short', day: 'numeric'
                  })}
                </time>
                {item.tags.length > 0 && (
                  <div className="flex gap-2">
                    {item.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-400">
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
              className='flex-shrink-0 p-2 mt-1 items-center justify-center border border-zinc-700 hover:bg-zinc-800'
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 32 32"><path fill="#888888" d="M10 6v2h12.59L6 24.59L7.41 26L24 9.41V22h2V6z" /></svg>
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
