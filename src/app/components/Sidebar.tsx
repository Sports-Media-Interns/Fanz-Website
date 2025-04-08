"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

// Sample data for trending topics
const trendingTopics = [
  { id: 1, name: "#ChampionsLeague", count: "12.5K posts" },
  { id: 2, name: "#NBAPlayoffs", count: "8.3K posts" },
  { id: 3, name: "#F1Monaco", count: "6.7K posts" },
  { id: 4, name: "#Wimbledon", count: "5.2K posts" },
  { id: 5, name: "#OlympicGames", count: "4.9K posts" }
];

// Sample data for suggested users
const suggestedUsers = [
  { 
    id: 1, 
    name: "ESPN", 
    username: "@espn", 
    avatar: "/avatars/espn.jpg", 
    verified: true,
    followers: "24.5M"
  },
  { 
    id: 2, 
    name: "LeBron James", 
    username: "@kingjames", 
    avatar: "/avatars/lebron.jpg", 
    verified: true,
    followers: "52.1M"
  },
  { 
    id: 3, 
    name: "Serena Williams", 
    username: "@serenawilliams", 
    avatar: "/avatars/serena.jpg", 
    verified: true,
    followers: "15.8M"
  },
  { 
    id: 4, 
    name: "Formula 1", 
    username: "@f1", 
    avatar: "/avatars/f1.jpg", 
    verified: true,
    followers: "9.7M"
  }
];

// Sample data for upcoming events
const upcomingEvents = [
  {
    id: 1,
    title: "Champions League Final",
    date: "May 28, 2023",
    time: "8:00 PM BST",
    teams: "Real Madrid vs Liverpool",
    image: "/events/ucl-final.jpg"
  },
  {
    id: 2,
    title: "NBA Finals Game 1",
    date: "June 2, 2023",
    time: "9:00 PM ET",
    teams: "Boston Celtics vs Golden State Warriors",
    image: "/events/nba-finals.jpg"
  },
  {
    id: 3,
    title: "French Open Final",
    date: "June 11, 2023",
    time: "3:00 PM CEST",
    teams: "Men's Singles",
    image: "/events/french-open.jpg"
  }
];

export default function Sidebar() {
  // State to track image loading errors
  const [userAvatarErrors, setUserAvatarErrors] = useState<Record<string, boolean>>({});
  const [eventImageErrors, setEventImageErrors] = useState<Record<string, boolean>>({});

  const handleUserAvatarError = (id: number) => {
    setUserAvatarErrors(prev => ({ ...prev, [id]: true }));
  };

  const handleEventImageError = (id: number) => {
    setEventImageErrors(prev => ({ ...prev, [id]: true }));
  };

  return (
    <aside className="w-full lg:w-80 space-y-8">
      {/* Search */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="w-full bg-gray-100 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Trending Topics */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="bg-blue-600 text-white px-4 py-2 font-medium">
          Trending Topics
        </div>
        <div className="p-4">
          <ul className="space-y-3">
            {trendingTopics.map((topic) => (
              <li key={topic.id} className="flex justify-between items-center">
                <Link href={`/topic/${topic.id}`} className="text-blue-600 hover:underline">
                  {topic.name}
                </Link>
                <span className="text-xs text-gray-500">{topic.count}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 text-center">
            <Link href="/trending" className="text-sm text-blue-600 hover:underline">
              See all trending topics
            </Link>
          </div>
        </div>
      </div>

      {/* Who to follow */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="bg-blue-600 text-white px-4 py-2 font-medium">
          Who to Follow
        </div>
        <div className="p-4">
          <ul className="space-y-4">
            {suggestedUsers.map((user) => (
              <li key={user.id} className="flex items-center">
                <div className="flex-shrink-0 relative h-10 w-10">
                  {!userAvatarErrors[user.id] ? (
                    <Image
                      className="rounded-full"
                      src={user.avatar}
                      alt={user.name}
                      fill
                      style={{ objectFit: 'cover' }}
                      onError={() => handleUserAvatarError(user.id)}
                    />
                  ) : (
                    <div className="avatar-fallback rounded-full w-full h-full">
                      {user.name.charAt(0)}
                    </div>
                  )}
                </div>
                <div className="ml-3 flex-1 min-w-0">
                  <div className="flex items-center">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {user.name}
                    </p>
                    {user.verified && (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 truncate">
                    {user.username} • {user.followers} followers
                  </p>
                </div>
                <button className="ml-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium py-1 px-3 rounded-full">
                  Follow
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-4 text-center">
            <Link href="/suggestions" className="text-sm text-blue-600 hover:underline">
              Show more
            </Link>
          </div>
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="bg-blue-600 text-white px-4 py-2 font-medium">
          Upcoming Events
        </div>
        <div className="p-4">
          <ul className="space-y-4">
            {upcomingEvents.map((event) => (
              <li key={event.id} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                <div className="flex space-x-3">
                  <div className="flex-shrink-0 relative h-16 w-16">
                    {!eventImageErrors[event.id] ? (
                      <Image
                        className="rounded-md"
                        src={event.image}
                        alt={event.title}
                        fill
                        style={{ objectFit: 'cover' }}
                        onError={() => handleEventImageError(event.id)}
                      />
                    ) : (
                      <div className="image-fallback rounded-md w-full h-full flex items-center justify-center text-xs">
                        {event.title.split(' ')[0]}
                      </div>
                    )}
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">{event.title}</h4>
                    <p className="text-xs text-gray-500">{event.teams}</p>
                    <div className="mt-1 flex items-center text-xs text-gray-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {event.date} • {event.time}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-4 text-center">
            <Link href="/events" className="text-sm text-blue-600 hover:underline">
              View all events
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
} 