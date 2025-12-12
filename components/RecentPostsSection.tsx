'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Post } from '@/models/Post';

export default function RecentPostsSection() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRecentPosts() {
      try {
        const response = await fetch('/api/posts?limit=2&page=1');
        const data = await response.json();
        
        if (data.posts) {
          setPosts(data.posts);
        }
      } catch (error) {
        console.error('Error loading recent posts:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchRecentPosts();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 animate-pulse">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 animate-pulse">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post._id} className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
            <div className="p-6">
              <h3 className="text-xl font-heading font-semibold mb-2 text-text">{post.title}</h3>
              <p className="text-text/70 text-sm mb-2 line-clamp-2">{post.excerpt}</p>
              <div className="text-xs text-text/60 mb-4">
                {post.publishedAt ? 
                  (typeof post.publishedAt === 'string' ?
                    new Date(post.publishedAt).toLocaleDateString() :
                    post.publishedAt.toLocaleDateString())
                  : 'Not published'}
              </div>
              <Link href={`/blog/${post.slug}`} className="text-accent hover:underline text-sm font-medium">
                Read Article →
              </Link>
            </div>
          </div>
        ))
      ) : (
        <div className="col-span-2 text-center py-8">
          <p className="text-text">No recent posts available.</p>
        </div>
      )}
    </div>
  );
}