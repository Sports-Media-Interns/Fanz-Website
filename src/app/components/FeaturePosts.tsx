"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

// Sample data for featured posts
const featuredPosts = [
  {
    id: 1,
    title: "Champions League Quarterfinals Preview",
    excerpt: "Breaking down the key matchups and predictions for the upcoming Champions League quarterfinals.",
    author: "Michael Johnson",
    authorImage: "/avatars/michael.jpg",
    category: "Football",
    date: "2 hours ago",
    likes: 1243,
    comments: 89,
    image: "/posts/champions-league.jpg"
  },
  {
    id: 2,
    title: "NBA Playoff Race Heats Up",
    excerpt: "With just weeks left in the regular season, the battle for playoff positioning intensifies in both conferences.",
    author: "Sarah Williams",
    authorImage: "/avatars/sarah.jpg",
    category: "Basketball",
    date: "5 hours ago",
    likes: 876,
    comments: 52,
    image: "/posts/nba-playoffs.jpg"
  },
  {
    id: 3,
    title: "Formula 1 Season Opener: What We Learned",
    excerpt: "Key takeaways from the first race of the season and what it means for the championship battle ahead.",
    author: "David Chen",
    authorImage: "/avatars/david.jpg",
    category: "F1",
    date: "1 day ago",
    likes: 1567,
    comments: 124,
    image: "/posts/f1-opener.jpg"
  },
  {
    id: 4,
    title: "Tennis Grand Slam Preview",
    excerpt: "Can anyone challenge the dominance of the top seeds? Our expert analysis of the upcoming tournament.",
    author: "Emma Rodriguez",
    authorImage: "/avatars/emma.jpg",
    category: "Tennis",
    date: "2 days ago",
    likes: 743,
    comments: 38,
    image: "/posts/tennis-slam.jpg"
  }
];

export default function FeaturedPosts() {
  // State to track image loading errors
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  const [avatarErrors, setAvatarErrors] = useState<Record<string, boolean>>({});

  const handleImageError = (id: number) => {
    setImageErrors(prev => ({ ...prev, [id]: true }));
  };

  const handleAvatarError = (id: number) => {
    setAvatarErrors(prev => ({ ...prev, [id]: true }));
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Trending in Sports
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            The latest and most popular discussions in the sports world
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {featuredPosts.map((post) => (
            <div key={post.id} className="flex flex-col rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
              <div className="flex-shrink-0 relative h-48">
                {!imageErrors[post.id] ? (
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    style={{ objectFit: 'cover' }}
                    className="w-full h-full"
                    onError={() => handleImageError(post.id)}
                  />
                ) : (
                  <div className="image-fallback w-full h-full flex items-center justify-center">
                    <span>{post.category} Image</span>
                  </div>
                )}
                <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-2 py-1 m-2 rounded">
                  {post.category}
                </div>
              </div>
              <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                <div className="flex-1">
                  <Link href={`/post/${post.id}`} className="block">
                    <h3 className="text-xl font-semibold text-gray-900 hover:text-blue-600">
                      {post.title}
                    </h3>
                    <p className="mt-3 text-base text-gray-500">
                      {post.excerpt}
                    </p>
                  </Link>
                </div>
                <div className="mt-6 flex items-center">
                  <div className="flex-shrink-0 relative h-10 w-10">
                    {!avatarErrors[post.id] ? (
                      <Image
                        className="rounded-full"
                        src={post.authorImage}
                        alt={post.author}
                        fill
                        style={{ objectFit: 'cover' }}
                        onError={() => handleAvatarError(post.id)}
                      />
                    ) : (
                      <div className="avatar-fallback rounded-full w-full h-full">
                        {post.author.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">
                      {post.author}
                    </p>
                    <div className="flex space-x-1 text-sm text-gray-500">
                      <time dateTime="2020-03-16">{post.date}</time>
                    </div>
                  </div>
                  <div className="ml-auto flex space-x-3 text-sm text-gray-500">
                    <span className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      {post.likes}
                    </span>
                    <span className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      {post.comments}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-10 text-center">
          <Link 
            href="/explore" 
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
          >
            View All Posts
            <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
} 