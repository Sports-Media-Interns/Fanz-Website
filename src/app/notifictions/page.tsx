"use client";

import Layout from '../components/Layout';
import Image from 'next/image';
import { useState } from 'react';

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  // Sample data for notifications
  const notifications = [
    {
      id: 1,
      type: 'like',
      user: {
        name: 'LeBron James',
        avatar: '/avatars/lebron.jpg'
      },
      content: 'liked your post about the Lakers game',
      time: '2 minutes ago',
      read: false
    },
    {
      id: 2,
      type: 'comment',
      user: {
        name: 'Serena Williams',
        avatar: '/avatars/serena.jpg'
      },
      content: 'commented on your photo: "Great form on that serve!"',
      time: '1 hour ago',
      read: false
    },
    {
      id: 3,
      type: 'friend',
      user: {
        name: 'Cristiano Ronaldo',
        avatar: '/avatars/ronaldo.jpg'
      },
      content: 'accepted your friend request',
      time: '3 hours ago',
      read: true
    },
    {
      id: 4,
      type: 'mention',
      user: {
        name: 'Tom Brady',
        avatar: '/avatars/brady.jpg'
      },
      content: 'mentioned you in a comment: "I agree with @user, that was an incredible play!"',
      time: '1 day ago',
      read: true
    },
    {
      id: 5,
      type: 'event',
      user: {
        name: 'NBA Official',
        avatar: '/avatars/nba.jpg'
      },
      content: 'Lakers vs. Warriors game starts in 30 minutes',
      time: '2 days ago',
      read: true
    },
    {
      id: 6,
      type: 'like',
      user: {
        name: 'Naomi Osaka',
        avatar: '/avatars/osaka.jpg'
      },
      content: 'liked your comment on the US Open post',
      time: '3 days ago',
      read: true
    }
  ];

  // Function to get initials from a name
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  const handleImageError = (id: string) => {
    setImageErrors(prev => ({ ...prev, [id]: true }));
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'like':
        return (
          <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center text-red-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
        );
      case 'comment':
        return (
          <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
        );
      case 'friend':
        return (
          <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
        );
      case 'mention':
        return (
          <div className="h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </div>
        );
      case 'event':
        return (
          <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        );
      default:
        return (
          <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
    }
  };

  const filteredNotifications = activeTab === 'all' 
    ? notifications 
    : activeTab === 'unread' 
      ? notifications.filter(n => !n.read) 
      : notifications.filter(n => n.type === activeTab);

  return (
    <Layout>
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl">
        <div className="p-4 md:p-6 border-b border-gray-200 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-black">Notifications</h1>
          <div className="flex items-center space-x-2">
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Tabs - Improved for mobile with horizontal scrolling */}
        <div className="flex border-b border-gray-200 overflow-x-auto px-2 md:px-4 py-1 md:py-2 scrollbar-hide">
          <button
            className={`px-3 md:px-4 py-2 text-sm font-medium rounded-md mr-1 md:mr-2 transition-all duration-200 ${
              activeTab === 'all' 
                ? 'bg-blue-100 text-blue-600 shadow-sm' 
                : 'text-black hover:bg-gray-100'
            }`}
            onClick={() => setActiveTab('all')}
          >
            All
          </button>
          <button
            className={`px-3 md:px-4 py-2 text-sm font-medium rounded-md mr-1 md:mr-2 transition-all duration-200 ${
              activeTab === 'unread' 
                ? 'bg-blue-100 text-blue-600 shadow-sm' 
                : 'text-black hover:bg-gray-100'
            }`}
            onClick={() => setActiveTab('unread')}
          >
            Unread
          </button>
          <button
            className={`px-3 md:px-4 py-2 text-sm font-medium rounded-md mr-1 md:mr-2 transition-all duration-200 ${
              activeTab === 'like' 
                ? 'bg-blue-100 text-blue-600 shadow-sm' 
                : 'text-black hover:bg-gray-100'
            }`}
            onClick={() => setActiveTab('like')}
          >
            Likes
          </button>
          <button
            className={`px-3 md:px-4 py-2 text-sm font-medium rounded-md mr-1 md:mr-2 transition-all duration-200 ${
              activeTab === 'comment' 
                ? 'bg-blue-100 text-blue-600 shadow-sm' 
                : 'text-black hover:bg-gray-100'
            }`}
            onClick={() => setActiveTab('comment')}
          >
            Comments
          </button>
          <button
            className={`px-3 md:px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
              activeTab === 'friend' 
                ? 'bg-blue-100 text-blue-600 shadow-sm' 
                : 'text-black hover:bg-gray-100'
            }`}
            onClick={() => setActiveTab('friend')}
          >
            Friend Requests
          </button>
        </div>
        
        {/* Notifications List - Improved styling and responsiveness */}
        <div className="divide-y divide-gray-200">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification) => (
              <div 
                key={notification.id} 
                className={`p-4 md:p-5 hover:bg-gray-50 transition-colors duration-200 cursor-pointer ${!notification.read ? 'bg-blue-50' : ''}`}
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-3 md:mr-4">
                    <div className="relative h-12 w-12 rounded-full overflow-hidden shadow-sm border border-gray-200">
                      {!imageErrors[`notif-${notification.id}`] ? (
                        <Image
                          src={notification.user.avatar}
                          alt={notification.user.name}
                          fill
                          className="object-cover"
                          onError={() => handleImageError(`notif-${notification.id}`)}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-blue-100 text-blue-600 rounded-full font-medium">
                          {getInitials(notification.user.name)}
                        </div>
                      )}
                      {!notification.read && (
                        <span className="absolute top-0 right-0 block h-3 w-3 rounded-full bg-blue-500 ring-2 ring-white"></span>
                      )}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0"> {/* min-width-0 helps with text truncation */}
                    <div className="flex items-start justify-between mb-1">
                      <p className="text-sm md:text-base text-black pr-2">
                        <span className="font-medium">{notification.user.name}</span> {notification.content}
                      </p>
                      <div className="flex-shrink-0 ml-2">
                        {getNotificationIcon(notification.type)}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-gray-500">{notification.time}</p>
                      <button className="text-xs text-blue-600 hover:text-blue-800 transition-colors duration-200">
                        {notification.read ? 'Mark as unread' : 'Mark as read'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 md:p-12 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <h3 className="mt-4 text-lg font-medium text-gray-900">No notifications</h3>
              <p className="mt-1 text-sm text-gray-500">You're all caught up!</p>
              <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200">
                Refresh
              </button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}