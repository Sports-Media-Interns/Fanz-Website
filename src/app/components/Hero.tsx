"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function Hero() {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="relative bg-gray-900 overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-blue-600 opacity-80"></div>
        <div className="relative h-full w-full">
          {!imageError ? (
            <Image 
              src="/hero-bg.jpg" 
              alt="Sports background" 
              fill
              style={{ objectFit: 'cover' }}
              priority
              className="mix-blend-overlay"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="hero-fallback w-full h-full"></div>
          )}
        </div>
      </div>
      
      {/* Hero content */}
      <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
          Connect with Sports Fans Worldwide
        </h1>
        <p className="mt-6 text-xl text-blue-100 max-w-3xl">
          Join the ultimate community for sports enthusiasts. Share your passion, follow your favorite teams, and never miss a moment of the action.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <Link 
            href="/signup" 
            className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Join Now
          </Link>
          <Link 
            href="/explore" 
            className="inline-flex items-center justify-center px-5 py-3 border border-blue-400 text-base font-medium rounded-md text-white hover:bg-blue-800"
          >
            Explore Content
          </Link>
        </div>
        
        {/* Featured stats */}
        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-blue-800 bg-opacity-50 rounded-lg p-6 backdrop-blur-sm">
            <div className="text-3xl font-bold text-white">2.5M+</div>
            <div className="text-blue-200">Active Users</div>
          </div>
          <div className="bg-blue-800 bg-opacity-50 rounded-lg p-6 backdrop-blur-sm">
            <div className="text-3xl font-bold text-white">150+</div>
            <div className="text-blue-200">Sports Covered</div>
          </div>
          <div className="bg-blue-800 bg-opacity-50 rounded-lg p-6 backdrop-blur-sm">
            <div className="text-3xl font-bold text-white">10K+</div>
            <div className="text-blue-200">Daily Posts</div>
          </div>
          <div className="bg-blue-800 bg-opacity-50 rounded-lg p-6 backdrop-blur-sm">
            <div className="text-3xl font-bold text-white">24/7</div>
            <div className="text-blue-200">Live Updates</div>
          </div>
        </div>
      </div>
    </div>
  );
} 