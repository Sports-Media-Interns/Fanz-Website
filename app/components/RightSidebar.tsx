"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

// Sample data for friend requests
const friendRequests = [
  {
    id: 1,
    name: 'Cristiano Ronaldo',
    avatar: '/avatars/ronaldo.jpg',
    mutualFriends: 3
  },
  {
    id: 2,
    name: 'Serena Williams',
    avatar: '/avatars/serena.jpg',
    mutualFriends: 5
  }
];

// Sample data for online friends
const onlineFriends: Array<{
  id: number;
  name: string;
  avatar: string;
  status: string;
  lastActive?: string;
}> = [
  {
    id: 1,
    name: 'LeBron James',
    avatar: '/avatars/lebron.jpg',
    status: 'online'
  },
  {
    id: 2,
    name: 'Lionel Messi',
    avatar: '/avatars/messi.jpg',
    status: 'online'
  },
  {
    id: 3,
    name: 'Tom Brady',
    avatar: '/avatars/brady.jpg',
    status: 'online'
  },
  {
    id: 4,
    name: 'Naomi Osaka',
    avatar: '/avatars/osaka.jpg',
    status: 'away'
  },
  {
    id: 5,
    name: 'Lewis Hamilton',
    avatar: '/avatars/hamilton.jpg',
    status: 'offline'
  }
];

export default function RightSidebar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'bg-green-500';
      case 'away':
        return 'bg-yellow-500';
      case 'offline':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const handleImageError = (id: string) => {
    setImageErrors(prev => ({ ...prev, [id]: true }));
  };

  // Function to get initials from a name
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  const filteredFriends = onlineFriends.filter(friend => 
    friend.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-80 bg-white shadow-sm rounded-lg my-4 overflow-hidden transition-all duration-300 ease-in-out hover:shadow-md">
      {/* Friend Requests */}
      <div className="p-4 border-b">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-black">Friend requests</h2>
          <Link href="/friend-requests" className="text-sm text-blue-500 hover:underline">All</Link>
        </div>
        
        {friendRequests.length > 0 ? (
          <div className="mt-2 space-y-3">
            {friendRequests.map((request) => (
              <div key={request.id} className="flex items-center">
                <div className="relative h-10 w-10 mr-3">
                  {!imageErrors[`request-${request.id}`] ? (
                    <Image
                      src={request.avatar}
                      alt={request.name}
                      fill
                      className="rounded-full object-cover"
                      onError={() => handleImageError(`request-${request.id}`)}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-blue-100 text-blue-600 rounded-full font-bold">
                      {getInitials(request.name)}
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-black">{request.name}</p>
                  <p className="text-xs text-black">{request.mutualFriends} mutual friends</p>
                </div>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 bg-blue-600 text-white text-xs rounded-md hover:bg-blue-700">
                    Accept
                  </button>
                  <button className="px-3 py-1 bg-gray-200 text-black text-xs rounded-md hover:bg-gray-300">
                    Decline
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-black">No friend requests</p>
        )}
      </div>

      {/* Online Friends */}
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-black">Online Friends</h2>
          <button className="text-black hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
            </svg>
          </button>
        </div>

        <div className="relative mb-4">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search athletes"
            className="block w-full bg-gray-100 border border-transparent rounded-full py-1.5 pl-10 pr-3 text-black placeholder-black focus:outline-none focus:bg-white focus:border-gray-300"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="mt-2 space-y-3">
          {filteredFriends.map((friend) => (
            <div key={friend.id} className="flex items-center">
              <div className="relative h-8 w-8 mr-3">
                <div className={`absolute bottom-0 right-0 h-2.5 w-2.5 ${getStatusColor(friend.status)} rounded-full border-2 border-white z-10`}></div>
                {!imageErrors[`friend-${friend.id}`] ? (
                  <Image
                    src={friend.avatar}
                    alt={friend.name}
                    fill
                    className="rounded-full object-cover"
                    onError={() => handleImageError(`friend-${friend.id}`)}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-blue-100 text-blue-600 rounded-full font-bold text-xs">
                    {getInitials(friend.name)}
                  </div>
                )}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-black">{friend.name}</p>
                <p className="text-xs text-black">{friend.status === 'online' ? 'Active now' : friend.lastActive}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto p-4 text-xs text-black border-t">
        <div className="flex space-x-4 mb-2">
          <Link href="/terms" className="hover:underline text-black">Terms</Link>
          <Link href="/privacy" className="hover:underline text-black">Privacy policy</Link>
          <Link href="/about" className="hover:underline text-black">About</Link>
        </div>
        <p className="text-black">© 2023 Fanz.us</p>
      </div>
    </div>
  );
}