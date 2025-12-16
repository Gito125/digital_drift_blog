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
        <div className="bg-background border border-foreground/10 rounded-xl shadow-md p-6 animate-pulse">
          <div className="h-6 bg-foreground/10 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-foreground/10 rounded w-full mb-2"></div>
          <div className="h-4 bg-foreground/10 rounded w-full mb-2"></div>
          <div className="h-4 bg-foreground/10 rounded w-2/3"></div>
        </div>
        <div className="bg-background border border-foreground/10 rounded-xl shadow-md p-6 animate-pulse">
          <div className="h-6 bg-foreground/10 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-foreground/10 rounded w-full mb-2"></div>
          <div className="h-4 bg-foreground/10 rounded w-full mb-2"></div>
          <div className="h-4 bg-foreground/10 rounded w-2/3"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post._id} className="bg-background border border-foreground/10 rounded-xl shadow-md overflow-hidden hover:shadow-lg hover:border-accent/50 transition-all group">
            <div className="p-6">
              <h3 className="text-xl font-heading font-semibold mb-2 text-foreground group-hover:text-accent transition-colors">{post.title}</h3>
              <p className="text-foreground/70 text-sm mb-2 line-clamp-2">{post.excerpt}</p>
              <div className="text-xs text-foreground/50 mb-4">
                {post.publishedAt ? 
                  (typeof post.publishedAt === 'string' ?
                    new Date(post.publishedAt).toLocaleDateString() :
                    post.publishedAt.toLocaleDateString())
                  : 'Not published'}
              </div>
              <Link href={`/blog/${post.slug}`} className="text-accent hover:underline text-sm font-medium inline-flex items-center gap-1">
                Read Article 
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          </div>
        ))
      ) : (
        <div className="col-span-2 text-center py-8">
          <p className="text-foreground/70">No recent posts available.</p>
        </div>
      )}
    </div>
  );
}