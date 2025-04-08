"use client";

import Layout from '../components/Layout';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function ProfilePage() {
  const [coverImageError, setCoverImageError] = useState(false);
  const [profileImageError, setProfileImageError] = useState(false);
  const [postImageError, setPostImageError] = useState(false);

  // Function to get initials from a name
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  const profileName = "LeBron James";

  return (
    <Layout>
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        {/* Cover Photo */}
        <div className="relative h-64 w-full bg-blue-600">
          {!coverImageError ? (
            <Image
              src="/profile/basketball-court.jpg"
              alt="Cover Photo"
              fill
              className="object-cover"
              onError={() => setCoverImageError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-blue-600 text-white">
              <span className="text-2xl font-bold">Basketball Court</span>
            </div>
          )}
          
          {/* Profile Picture */}
          <div className="absolute -bottom-16 left-8">
            <div className="relative h-32 w-32 border-4 border-white rounded-full">
              {!profileImageError ? (
                <Image
                  src="/avatars/lebron.jpg"
                  alt="Profile Picture"
                  fill
                  className="rounded-full object-cover"
                  onError={() => setProfileImageError(true)}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-blue-600 text-white rounded-full font-bold text-4xl">
                  {getInitials(profileName)}
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Profile Info */}
        <div className="pt-20 px-8 pb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold">{profileName}</h1>
              <p className="text-gray-600">@KingJames • Professional Basketball Player</p>
              <div className="flex items-center mt-2 text-sm text-gray-600">
                <div className="flex items-center mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>Los Angeles, CA</span>
                </div>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>Joined December 2003</span>
                </div>
              </div>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium">
              Edit Profile
            </button>
          </div>
          
          <div className="mt-6">
            <p className="text-gray-800">
              4x NBA Champion. 4x NBA MVP. 19x NBA All-Star. 2x Olympic Gold Medalist. 
              Entrepreneur. Philanthropist. #ThekidfromAKRON
            </p>
          </div>
          
          <div className="mt-6 flex space-x-8">
            <div>
              <span className="font-bold text-gray-900">3,456</span>
              <span className="text-gray-600 ml-1">Posts</span>
            </div>
            <div>
              <span className="font-bold text-gray-900">52.7M</span>
              <span className="text-gray-600 ml-1">Followers</span>
            </div>
            <div>
              <span className="font-bold text-gray-900">823</span>
              <span className="text-gray-600 ml-1">Following</span>
            </div>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="border-t border-gray-200">
          <div className="flex">
            <button className="flex-1 py-4 px-6 text-center border-b-2 border-blue-600 font-medium text-blue-600">
              Posts
            </button>
            <button className="flex-1 py-4 px-6 text-center text-gray-600 hover:bg-gray-50">
              Photos
            </button>
            <button className="flex-1 py-4 px-6 text-center text-gray-600 hover:bg-gray-50">
              Videos
            </button>
            <button className="flex-1 py-4 px-6 text-center text-gray-600 hover:bg-gray-50">
              About
            </button>
          </div>
        </div>
      </div>
      
      {/* Posts Section */}
      <div className="max-w-4xl mx-auto mt-6 space-y-6">
        {/* Sample Post */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-4">
            <div className="flex items-center">
              <div className="relative h-10 w-10 mr-3">
                {!profileImageError ? (
                  <Image
                    src="/avatars/lebron.jpg"
                    alt="Profile Picture"
                    fill
                    className="rounded-full object-cover"
                    onError={() => setProfileImageError(true)}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-blue-600 text-white rounded-full font-medium">
                    {getInitials(profileName)}
                  </div>
                )}
              </div>
              <div>
                <h3 className="font-medium">{profileName}</h3>
                <p className="text-xs text-gray-500">3 days ago</p>
              </div>
            </div>
            
            <div className="mt-3">
              <p className="text-gray-800">
                Great win tonight! The team showed incredible resilience and determination. 
                Proud of our effort on both ends of the floor. #LakeShow #NBAPlayoffs
              </p>
            </div>
            
            <div className="mt-4">
              <div className="relative h-80 w-full rounded-lg overflow-hidden">
                {!postImageError ? (
                  <Image
                    src="/posts/lakers-celebration.jpg"
                    alt="Lakers Celebration"
                    fill
                    className="object-cover"
                    onError={() => setPostImageError(true)}
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex flex-col items-center justify-center text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-sm">Lakers Celebration Image</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="mt-4 flex items-center justify-between text-gray-500 border-t border-gray-100 pt-3">
              <div className="flex items-center space-x-2">
                <button className="flex items-center space-x-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  <span>245K</span>
                </button>
                <button className="flex items-center space-x-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <span>18.2K</span>
                </button>
                <button className="flex items-center space-x-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                  <span>42.5K</span>
                </button>
              </div>
              <button className="text-sm text-blue-600 font-medium">
                View all comments
              </button>
            </div>
          </div>
        </div>
        
        {/* More posts would go here */}
      </div>
    </Layout>
  );
} 