"use client";

import Header from './Header';
import Navigation from './Navigation';
import RightSidebar from './RightSidebar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="container mx-auto px-4 flex relative">
        {/* Left Navigation - hidden on mobile, visible on tablet and up */}
        <div className="hidden md:block md:sticky md:top-16 md:self-start md:pt-4">
          <Navigation />
        </div>
        
        {/* Main Content - full width on mobile, adjusted on larger screens */}
        <div className="flex-1 flex justify-center items-start py-4 pb-20 md:pb-6 md:px-6">
          {/* 
            We need to account for both the left navigation and right sidebar
            to ensure the content is truly centered on the page
          */}
          <div className="w-full max-w-2xl mx-auto md:mx-0 transition-all duration-300 ease-in-out">
            {children}
          </div>
        </div>
        
        {/* Right Sidebar - hidden on mobile and tablet, visible on desktop */}
        <div className="hidden lg:block lg:sticky lg:top-16 lg:self-start lg:pt-4">
          <RightSidebar />
        </div>
      </div>
    </div>
  );
}