"use client";

import Layout from '../components/Layout';
import { useState } from 'react';

export default function ExplorePage() {
  const [activeTab, setActiveTab] = useState('trending');

  const categories = [
    { id: 'trending', name: 'Trending' },
    { id: 'basketball', name: 'Basketball' },
    { id: 'football', name: 'Football' },
    { id: 'soccer', name: 'Soccer' },
    { id: 'tennis', name: 'Tennis' },
    { id: 'formula1', name: 'Formula 1' },
  ];

  return (
    <Layout>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-black">Explore Sports</h1>
          <p className="text-black mt-1">Discover trending topics and popular sports content</p>
        </div>
        
        {/* Category Tabs */}
        <div className="flex border-b border-gray-200 overflow-x-auto">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                activeTab === category.id 
                  ? 'bg-blue-100 text-blue-600' 
                  : 'text-black hover:bg-gray-100'
              }`}
              onClick={() => setActiveTab(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>
        
        {/* Content Area */}
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="h-48 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">Sports Image {item}</span>
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-black">
                    {activeTab === 'trending' 
                      ? `Trending Topic ${item}` 
                      : `${categories.find(c => c.id === activeTab)?.name} Highlight ${item}`}
                  </h3>
                  <p className="text-black mt-1">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.
                  </p>
                  <div className="mt-2 flex justify-between items-center">
                    <span className="text-sm text-black">1.2K views</span>
                    <button className="text-blue-600 text-sm font-medium">View Details</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
} 