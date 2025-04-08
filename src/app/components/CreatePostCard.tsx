"use client";

import Image from 'next/image';
import { useState } from 'react';

export default function CreatePostCard() {
  const [postText, setPostText] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [profileImageError, setProfileImageError] = useState(false);

  // Function to get initials from a name
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  const userName = "LeBron James";

  const handleFocus = () => {
    setIsExpanded(true);
  };

  const handleCancel = () => {
    setPostText('');
    setIsExpanded(false);
  };

  const handlePost = () => {
    // In a real app, this would send the post to the server
    console.log('Posting:', postText);
    setPostText('');
    setIsExpanded(false);
  };

  return (
    <div className="bg-white rounded-lg shadow mb-4 overflow-hidden">
      <div className="p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0 relative h-10 w-10">
            {!profileImageError ? (
              <Image
                src="/avatars/lebron.jpg"
                alt="Your profile"
                fill
                className="rounded-full object-cover"
                onError={() => setProfileImageError(true)}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-blue-600 text-white rounded-full font-medium">
                {getInitials(userName)}
              </div>
            )}
          </div>
          <div className="ml-3 flex-1">
            <textarea
              placeholder="Share your sports thoughts, highlights, or game predictions..."
              className="w-full border border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-black placeholder-black"
              rows={isExpanded ? 4 : 1}
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
              onFocus={handleFocus}
            />
          </div>
        </div>

        {isExpanded && (
          <div className="mt-3 flex justify-between">
            <div className="flex space-x-2">
              <button className="flex items-center text-black hover:text-black">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Photo
              </button>
              <button className="flex items-center text-black hover:text-black">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Video
              </button>
              <button className="flex items-center text-black hover:text-black">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Feeling
              </button>
            </div>
            <div className="flex space-x-2">
              <button 
                className="px-4 py-1 text-black hover:bg-gray-100 rounded-md"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button 
                className={`px-4 py-1 bg-blue-500 text-white rounded-md ${postText.trim() ? 'hover:bg-blue-600' : 'opacity-50 cursor-not-allowed'}`}
                disabled={!postText.trim()}
                onClick={handlePost}
              >
                Post
              </button>
            </div>
          </div>
        )}

        {!isExpanded && (
          <div className="mt-3 flex justify-between border-t pt-3">
            <button className="flex items-center justify-center w-1/3 text-black hover:bg-gray-100 py-1 rounded-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Game Highlights
            </button>
            <button className="flex items-center justify-center w-1/3 text-black hover:bg-gray-100 py-1 rounded-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Sports Photo
            </button>
            <button className="flex items-center justify-center w-1/3 text-black hover:bg-gray-100 py-1 rounded-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Game Prediction
            </button>
          </div>
        )}
      </div>
    </div>
  );
} 