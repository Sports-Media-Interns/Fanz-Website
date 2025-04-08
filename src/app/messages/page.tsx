"use client";

import Layout from '../components/Layout';
import Image from 'next/image';
import { useState } from 'react';

export default function MessagesPage() {
  const [activeChat, setActiveChat] = useState<number | null>(1);
  const [messageText, setMessageText] = useState('');
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  // Sample data for conversations
  const conversations = [
    {
      id: 1,
      name: 'LeBron James',
      avatar: '/avatars/lebron.jpg',
      lastMessage: 'Great game last night!',
      time: '2m',
      unread: 2,
      online: true
    },
    {
      id: 2,
      name: 'Serena Williams',
      avatar: '/avatars/serena.jpg',
      lastMessage: 'Are you coming to the charity event?',
      time: '1h',
      unread: 0,
      online: true
    },
    {
      id: 3,
      name: 'Cristiano Ronaldo',
      avatar: '/avatars/ronaldo.jpg',
      lastMessage: 'Thanks for the support!',
      time: '3h',
      unread: 0,
      online: false
    },
    {
      id: 4,
      name: 'Tom Brady',
      avatar: '/avatars/brady.jpg',
      lastMessage: 'Let me know what you think about the play.',
      time: '1d',
      unread: 0,
      online: true
    },
    {
      id: 5,
      name: 'Naomi Osaka',
      avatar: '/avatars/osaka.jpg',
      lastMessage: 'See you at the tournament!',
      time: '2d',
      unread: 0,
      online: false
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

  const handleSendMessage = () => {
    if (messageText.trim()) {
      console.log('Sending message:', messageText);
      setMessageText('');
    }
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="flex flex-col md:flex-row h-[calc(100vh-180px)] md:h-[calc(100vh-140px)]">
          {/* Conversations List - Hidden on mobile when chat is active */}
          <div className={`${activeChat ? 'hidden md:block' : 'block'} md:w-1/3 border-r border-gray-200 overflow-y-auto`}>
            <div className="sticky top-0 z-10 bg-white p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-black">Messages</h2>
                {activeChat && (
                  <button 
                    className="md:hidden p-2 rounded-full hover:bg-gray-100"
                    onClick={() => setActiveChat(null)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                )}
              </div>
              <div className="mt-2 relative">
                <input
                  type="text"
                  placeholder="Search messages"
                  className="w-full py-2 pl-10 pr-4 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-black placeholder-black"
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="divide-y divide-gray-200">
              {conversations.map((conversation) => (
                <div 
                  key={conversation.id}
                  className={`flex items-center p-4 cursor-pointer transition-all duration-200 hover:bg-gray-50 ${activeChat === conversation.id ? 'bg-blue-50' : ''}`}
                  onClick={() => setActiveChat(conversation.id)}
                >
                  <div className="relative flex-shrink-0">
                    <div className="relative h-12 w-12 rounded-full overflow-hidden shadow-sm">
                      {!imageErrors[`conv-${conversation.id}`] ? (
                        <Image
                          src={conversation.avatar}
                          alt={conversation.name}
                          fill
                          className="object-cover"
                          onError={() => handleImageError(`conv-${conversation.id}`)}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-blue-100 text-blue-600 rounded-full font-medium">
                          {getInitials(conversation.name)}
                        </div>
                      )}
                    </div>
                    {conversation.online && (
                      <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-500 ring-2 ring-white"></span>
                    )}
                  </div>
                  <div className="ml-4 flex-1 min-w-0"> {/* min-width-0 helps with text truncation */}
                    <div className="flex justify-between items-center">
                      <h3 className="text-sm font-medium text-black truncate">{conversation.name}</h3>
                      <span className="text-xs text-gray-500 ml-2 flex-shrink-0">{conversation.time}</span>
                    </div>
                    <div className="flex justify-between items-center mt-1">
                      <p className="text-xs text-gray-500 truncate max-w-[180px]">{conversation.lastMessage}</p>
                      {conversation.unread > 0 && (
                        <span className="bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center ml-2 flex-shrink-0">
                          {conversation.unread}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Chat Area */}
          <div className={`${activeChat ? 'block' : 'hidden md:block'} md:w-2/3 flex flex-col w-full`}>
            {activeChat ? (
              <>
                {/* Chat Header */}
                <div className="sticky top-0 z-10 bg-white p-4 border-b border-gray-200 flex items-center shadow-sm">
                  <button 
                    className="md:hidden p-2 mr-2 rounded-full hover:bg-gray-100"
                    onClick={() => setActiveChat(null)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <div className="relative h-10 w-10 rounded-full overflow-hidden shadow-sm">
                    {!imageErrors[`active-${activeChat}`] ? (
                      <Image
                        src={conversations.find(c => c.id === activeChat)?.avatar || ''}
                        alt={conversations.find(c => c.id === activeChat)?.name || ''}
                        fill
                        className="object-cover"
                        onError={() => handleImageError(`active-${activeChat}`)}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-blue-100 text-blue-600 rounded-full font-medium">
                        {getInitials(conversations.find(c => c.id === activeChat)?.name || '')}
                      </div>
                    )}
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-black">{conversations.find(c => c.id === activeChat)?.name}</h3>
                    <p className="text-xs text-green-500">
                      {conversations.find(c => c.id === activeChat)?.online ? 'Online' : 'Offline'}
                    </p>
                  </div>
                  <div className="ml-auto flex space-x-2">
                    <button className="p-2 rounded-full hover:bg-gray-100">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </button>
                    <button className="p-2 rounded-full hover:bg-gray-100">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </button>
                    <button className="p-2 rounded-full hover:bg-gray-100">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                      </svg>
                    </button>
                  </div>
                </div>
                
                {/* Messages */}
                <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
                  <div className="space-y-6 max-w-3xl mx-auto">
                    {/* Sample messages - in a real app, these would come from a database */}
                    <div className="flex items-start space-x-2">
                      <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center shadow-sm">
                        {!imageErrors[`avatar-${activeChat}-other`] ? (
                          <Image
                            src={conversations.find(c => c.id === activeChat)?.avatar || ''}
                            alt={conversations.find(c => c.id === activeChat)?.name || ''}
                            width={32}
                            height={32}
                            className="rounded-full"
                            onError={() => handleImageError(`avatar-${activeChat}-other`)}
                          />
                        ) : (
                          <span className="text-sm font-medium text-gray-600">
                            {getInitials(conversations.find(c => c.id === activeChat)?.name || '')}
                          </span>
                        )}
                      </div>
                      <div className="max-w-[75%]">
                        <div className="bg-white rounded-2xl py-2 px-4 shadow-sm border border-gray-200">
                          <p className="text-sm text-black">Hey, how's it going? Did you watch the game last night?</p>
                        </div>
                        <span className="text-xs text-gray-500 mt-1 ml-2 block">10:30 AM</span>
                      </div>
                    </div>
                    
                    <div className="flex items-end justify-end">
                      <div className="max-w-[75%]">
                        <div className="bg-blue-600 text-white rounded-2xl py-2 px-4 shadow-sm">
                          <p className="text-sm">Yes, it was amazing! Our team played really well.</p>
                        </div>
                        <span className="text-xs text-gray-500 mt-1 mr-2 block text-right">10:35 AM</span>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-2">
                      <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center shadow-sm">
                        {!imageErrors[`avatar-${activeChat}-other`] ? (
                          <Image
                            src={conversations.find(c => c.id === activeChat)?.avatar || ''}
                            alt={conversations.find(c => c.id === activeChat)?.name || ''}
                            width={32}
                            height={32}
                            className="rounded-full"
                            onError={() => handleImageError(`avatar-${activeChat}-other`)}
                          />
                        ) : (
                          <span className="text-sm font-medium text-gray-600">
                            {getInitials(conversations.find(c => c.id === activeChat)?.name || '')}
                          </span>
                        )}
                      </div>
                      <div className="max-w-[75%]">
                        <div className="bg-white rounded-2xl py-2 px-4 shadow-sm border border-gray-200">
                          <p className="text-sm text-black">That last-minute goal was incredible! Are you going to the next match?</p>
                        </div>
                        <span className="text-xs text-gray-500 mt-1 ml-2 block">10:40 AM</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Message Input */}
                <div className="p-4 border-t border-gray-200 bg-white sticky bottom-0 z-10 shadow-sm">
                  <div className="flex items-center max-w-3xl mx-auto">
                    <button className="p-2 rounded-full hover:bg-gray-100 mr-2 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                      </svg>
                    </button>
                    <button className="p-2 rounded-full hover:bg-gray-100 mr-2 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </button>
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        placeholder="Type a message..."
                        className="w-full py-3 px-4 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-black placeholder-gray-500 transition-all"
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      />
                      <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1.5 rounded-full hover:bg-gray-200 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </button>
                    </div>
                    <button 
                      className="p-3 rounded-full bg-blue-600 hover:bg-blue-700 ml-2 text-white transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                      onClick={handleSendMessage}
                      disabled={!messageText.trim()}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center bg-gray-50 p-6">
                <div className="text-center max-w-md mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-200">
                  <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-black mb-2">Your messages</h3>
                  <p className="text-gray-600 mb-6">Connect with your favorite athletes and sports fans. Select a conversation to start chatting.</p>
                  <div className="flex justify-center space-x-2">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
                      New Message
                    </button>
                    <button className="px-4 py-2 bg-gray-200 text-black rounded-lg hover:bg-gray-300 transition-colors">
                      Find Friends
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}