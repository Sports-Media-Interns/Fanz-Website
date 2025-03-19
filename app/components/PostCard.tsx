"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface PostCardProps {
  post: {
    id: number;
    author: {
      name: string;
      avatar: string;
      verified?: boolean;
    };
    time: string;
    content: string;
    images?: string[];
    likes: number;
    comments: number;
    shares: number;
  };
}

export default function PostCard({ post }: PostCardProps) {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes);
  const [showAllImages, setShowAllImages] = useState(false);
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});
  const [authorImageError, setAuthorImageError] = useState(false);

  const handleLike = () => {
    if (liked) {
      setLikesCount(likesCount - 1);
    } else {
      setLikesCount(likesCount + 1);
    }
    setLiked(!liked);
  };

  const handleImageError = (index: number) => {
    setImageErrors(prev => ({ ...prev, [index]: true }));
  };

  const displayImages = showAllImages ? post.images : post.images?.slice(0, 3);

  return (
    <div className="bg-white rounded-lg shadow mb-4 overflow-hidden">
      {/* Post Header */}
      <div className="p-4 flex items-start">
        <div className="flex-shrink-0 relative h-10 w-10">
          {!authorImageError ? (
            <Image
              src={post.author.avatar}
              alt={post.author.name}
              fill
              className="rounded-full object-cover"
              onError={() => setAuthorImageError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-blue-600 text-white rounded-full font-medium">
              {post.author.name.charAt(0)}
            </div>
          )}
        </div>
        <div className="ml-3 flex-1">
          <div className="flex items-center">
            <Link href={`/profile/${post.id}`} className="font-medium text-black hover:underline">
              {post.author.name}
            </Link>
            {post.author.verified && (
              <svg className="ml-1 h-4 w-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            )}
          </div>
          <p className="text-xs text-black">{post.time}</p>
        </div>
        <button className="ml-auto p-1 rounded-full hover:bg-gray-100">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-black" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
          </svg>
        </button>
      </div>

      {/* Post Content */}
      <div className="px-4 pb-2">
        <p className="text-black whitespace-pre-line">{post.content}</p>
      </div>

      {/* Post Images */}
      {post.images && post.images.length > 0 && (
        <div className={`mt-2 ${post.images.length === 1 ? '' : 'grid grid-cols-2 gap-1'}`}>
          {displayImages?.map((image, index) => (
            <div 
              key={index} 
              className={`relative ${post.images?.length === 1 ? 'h-96 w-full' : 'h-48'} ${index === 0 && post.images?.length === 3 ? 'col-span-2' : ''}`}
            >
              {!imageErrors[index] ? (
                <Image
                  src={image}
                  alt={`Post image ${index + 1}`}
                  fill
                  className="object-cover"
                  onError={() => handleImageError(index)}
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              )}
              
              {/* Show more images overlay */}
              {index === 2 && post.images && post.images.length > 3 && !showAllImages && (
                <button 
                  onClick={() => setShowAllImages(true)}
                  className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white font-bold text-xl"
                >
                  +{post.images.length - 3} more
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Post Stats */}
      <div className="px-4 py-2 border-t border-gray-200 mt-2">
        <div className="flex justify-between text-xs text-black">
          <div>
            {likesCount > 0 && (
              <span className="flex items-center">
                <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-blue-100 text-blue-500 mr-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                  </svg>
                </span>
                {likesCount}
              </span>
            )}
          </div>
          <div className="flex space-x-4">
            {post.comments > 0 && <span>{post.comments} comments</span>}
            {post.shares > 0 && <span>{post.shares} shares</span>}
          </div>
        </div>
      </div>

      {/* Post Actions */}
      <div className="px-4 py-2 border-t border-gray-200 flex">
        <button 
          className={`flex items-center justify-center w-1/3 py-1 rounded-md hover:bg-gray-100 ${liked ? 'text-blue-500' : 'text-black'}`}
          onClick={handleLike}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill={liked ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={liked ? 0 : 2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
          </svg>
          Like
        </button>
        <button className="flex items-center justify-center w-1/3 py-1 rounded-md text-black hover:bg-gray-100">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          Comment
        </button>
        <button className="flex items-center justify-center w-1/3 py-1 rounded-md text-black hover:bg-gray-100">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
          Share
        </button>
      </div>
    </div>
  );
} 