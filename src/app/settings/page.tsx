"use client";

import Layout from '../components/Layout';
import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('account');
  const [profileImageError, setProfileImageError] = useState(false);
  
  // Sample user data
  const user = {
    name: 'LeBron James',
    username: 'KingJames',
    email: 'lebron@example.com',
    phone: '+1 (555) 123-4567',
    avatar: '/avatars/lebron.jpg'
  };

  // Function to get initials from a name
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl">
        <div className="p-4 md:p-6 border-b border-gray-200 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-black">Settings</h1>
          <div className="flex items-center space-x-2">
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </button>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row">
          {/* Sidebar */}
          <div className="w-full md:w-64 md:border-r border-gray-200">
            <nav className="p-4 overflow-x-auto scrollbar-hide">
              <div className="md:hidden flex space-x-2 pb-4 overflow-x-auto scrollbar-hide">
                {['account', 'profile', 'privacy', 'notifications', 'security', 'appearance'].map((tab) => (
                  <button
                    key={tab}
                    className={`px-4 py-2 text-sm font-medium rounded-md whitespace-nowrap transition-all duration-200 ${
                      activeTab === tab 
                        ? 'bg-blue-100 text-blue-600 shadow-sm' 
                        : 'text-black hover:bg-gray-100'
                    }`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>
              
              <ul className="hidden md:block space-y-1">
                <li>
                  <button 
                    className={`w-full text-left px-4 py-2 rounded-lg ${activeTab === 'account' ? 'bg-blue-100 text-blue-600' : 'text-black hover:bg-gray-100'}`}
                    onClick={() => setActiveTab('account')}
                  >
                    Account
                  </button>
                </li>
                <li>
                  <button 
                    className={`w-full text-left px-4 py-2 rounded-lg ${activeTab === 'profile' ? 'bg-blue-100 text-blue-600' : 'text-black hover:bg-gray-100'}`}
                    onClick={() => setActiveTab('profile')}
                  >
                    Profile
                  </button>
                </li>
                <li>
                  <button 
                    className={`w-full text-left px-4 py-2 rounded-lg ${activeTab === 'privacy' ? 'bg-blue-100 text-blue-600' : 'text-black hover:bg-gray-100'}`}
                    onClick={() => setActiveTab('privacy')}
                  >
                    Privacy
                  </button>
                </li>
                <li>
                  <button 
                    className={`w-full text-left px-4 py-2 rounded-lg ${activeTab === 'notifications' ? 'bg-blue-100 text-blue-600' : 'text-black hover:bg-gray-100'}`}
                    onClick={() => setActiveTab('notifications')}
                  >
                    Notifications
                  </button>
                </li>
                <li>
                  <button 
                    className={`w-full text-left px-4 py-2 rounded-lg ${activeTab === 'security' ? 'bg-blue-100 text-blue-600' : 'text-black hover:bg-gray-100'}`}
                    onClick={() => setActiveTab('security')}
                  >
                    Security
                  </button>
                </li>
                <li>
                  <button 
                    className={`w-full text-left px-4 py-2 rounded-lg ${activeTab === 'appearance' ? 'bg-blue-100 text-blue-600' : 'text-black hover:bg-gray-100'}`}
                    onClick={() => setActiveTab('appearance')}
                  >
                    Appearance
                  </button>
                </li>
              </ul>
            </nav>
          </div>
          
          {/* Content */}
          <div className="flex-1 p-4 md:p-6">
            {activeTab === 'account' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold mb-2 text-black">Account Settings</h2>
                
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-0 mb-6 p-4 bg-gray-50 rounded-lg">
                  <div className="relative h-20 w-20 sm:mr-4 mx-auto sm:mx-0">
                    {!profileImageError ? (
                      <Image
                        src={user.avatar}
                        alt={user.name}
                        fill
                        className="rounded-full object-cover shadow-md border-2 border-white"
                        onError={() => setProfileImageError(true)}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-blue-100 text-blue-600 rounded-full font-bold text-2xl shadow-md border-2 border-white">
                        {getInitials(user.name)}
                      </div>
                    )}
                  </div>
                  <div className="space-y-6">
                    <h3 className="font-medium text-black">{user.name}</h3>
                    <p className="text-sm text-black">@{user.username}</p>
                  </div>
                  <button className="ml-auto bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm">
                    Change Photo
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-6">
                    <label htmlFor="name" className="block text-sm font-medium text-black mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black transition-colors duration-200 hover:border-blue-300"
                      defaultValue={user.name}
                    />
                  </div>
                  
                  <div className="space-y-6">
                    <label htmlFor="username" className="block text-sm font-medium text-black mb-1">
                      Username
                    </label>
                    <input
                      type="text"
                      id="username"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black transition-colors duration-200 hover:border-blue-300"
                      defaultValue={user.username}
                    />
                  </div>
                  
                  <div className="space-y-6">
                    <label htmlFor="email" className="block text-sm font-medium text-black mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black transition-colors duration-200 hover:border-blue-300"
                      defaultValue={user.email}
                    />
                  </div>
                  
                  <div className="space-y-6">
                    <label htmlFor="phone" className="block text-sm font-medium text-black mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black transition-colors duration-200 hover:border-blue-300"
                      defaultValue={user.phone}
                    />
                  </div>
                  
                  <div className="pt-4">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md mr-2 transition-all duration-200 transform hover:translate-y-[-1px] hover:shadow-md">
                      Save Changes
                    </button>
                    <button className="bg-gray-200 hover:bg-gray-300 text-black px-4 py-2 rounded-md transition-all duration-200">
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold mb-2 text-black">Profile Settings</h2>
                <p className="text-black">Update your profile information, bio, and sports interests.</p>
                
                <div className="mt-4 space-y-4">
                  <div className="space-y-6">
                    <label htmlFor="bio" className="block text-sm font-medium text-black mb-1">
                      Bio
                    </label>
                    <textarea
                      id="bio"
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black transition-colors duration-200 hover:border-blue-300"
                      defaultValue="4x NBA Champion. 4x NBA MVP. 19x NBA All-Star. 2x Olympic Gold Medalist. Entrepreneur. Philanthropist. #ThekidfromAKRON"
                    ></textarea>
                  </div>
                  
                  <div className="space-y-6">
                    <label className="block text-sm font-medium text-black mb-1">
                      Favorite Sports
                    </label>
                    <div className="space-y-2">
                      {['Basketball', 'Football', 'Soccer', 'Tennis', 'Golf'].map((sport) => (
                        <div key={sport} className="flex items-center">
                          <input
                            type="checkbox"
                            id={`sport-${sport}`}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            defaultChecked={sport === 'Basketball'}
                          />
                          <label htmlFor={`sport-${sport}`} className="ml-2 text-sm text-black">
                            {sport}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md mr-2 transition-all duration-200 transform hover:translate-y-[-1px] hover:shadow-md">
                      Save Changes
                    </button>
                    <button className="bg-gray-200 hover:bg-gray-300 text-black px-4 py-2 rounded-md transition-all duration-200">
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'privacy' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold mb-2 text-black">Privacy Settings</h2>
                <p className="text-black">Control who can see your profile and content.</p>
                
                <div className="mt-4 space-y-4">
                  <div className="space-y-6">
                    <label className="block text-sm font-medium text-black mb-1">
                      Profile Visibility
                    </label>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="visibility-public"
                          name="visibility"
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                          defaultChecked
                        />
                        <label htmlFor="visibility-public" className="ml-2 text-sm text-black">
                          Public - Anyone can see your profile
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="visibility-friends"
                          name="visibility"
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        />
                        <label htmlFor="visibility-friends" className="ml-2 text-sm text-black">
                          Friends Only - Only friends can see your profile
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="visibility-private"
                          name="visibility"
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        />
                        <label htmlFor="visibility-private" className="ml-2 text-sm text-black">
                          Private - Only you can see your profile
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md mr-2 transition-all duration-200 transform hover:translate-y-[-1px] hover:shadow-md">
                      Save Changes
                    </button>
                    <button className="bg-gray-200 hover:bg-gray-300 text-black px-4 py-2 rounded-md transition-all duration-200">
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold mb-2 text-black">Notification Settings</h2>
                <p className="text-black">Control how and when you receive notifications.</p>
                
                <div className="mt-4 space-y-4">
                  <div className="space-y-6">
                    <h3 className="text-md font-medium text-black mb-2">Email Notifications</h3>
                    <div className="space-y-2">
                      {['New friend requests', 'Messages', 'Post likes', 'Comments', 'Game updates'].map((item) => (
                        <div key={item} className="flex items-center justify-between">
                          <label htmlFor={`email-${item}`} className="text-sm text-black">
                            {item}
                          </label>
                          <div className="relative inline-block w-10 mr-2 align-middle select-none">
                            <input
                              type="checkbox"
                              id={`email-${item}`}
                              className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                              defaultChecked={['New friend requests', 'Messages'].includes(item)}
                            />
                            <label
                              htmlFor={`email-${item}`}
                              className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                            ></label>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <h3 className="text-md font-medium text-black mb-2">Push Notifications</h3>
                    <div className="space-y-2">
                      {['New friend requests', 'Messages', 'Post likes', 'Comments', 'Game updates'].map((item) => (
                        <div key={item} className="flex items-center justify-between">
                          <label htmlFor={`push-${item}`} className="text-sm text-black">
                            {item}
                          </label>
                          <div className="relative inline-block w-10 mr-2 align-middle select-none">
                            <input
                              type="checkbox"
                              id={`push-${item}`}
                              className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                              defaultChecked
                            />
                            <label
                              htmlFor={`push-${item}`}
                              className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                            ></label>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md mr-2 transition-all duration-200 transform hover:translate-y-[-1px] hover:shadow-md">
                      Save Changes
                    </button>
                    <button className="bg-gray-200 hover:bg-gray-300 text-black px-4 py-2 rounded-md transition-all duration-200">
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'security' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold mb-2 text-black">Security Settings</h2>
                <p className="text-black">Manage your password and account security.</p>
                
                <div className="mt-4 space-y-4">
                  <div className="space-y-6">
                    <label htmlFor="current-password" className="block text-sm font-medium text-black mb-1">
                      Current Password
                    </label>
                    <input
                      type="password"
                      id="current-password"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black transition-colors duration-200 hover:border-blue-300"
                    />
                  </div>
                  
                  <div className="space-y-6">
                    <label htmlFor="new-password" className="block text-sm font-medium text-black mb-1">
                      New Password
                    </label>
                    <input
                      type="password"
                      id="new-password"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black transition-colors duration-200 hover:border-blue-300"
                    />
                  </div>
                  
                  <div className="space-y-6">
                    <label htmlFor="confirm-password" className="block text-sm font-medium text-black mb-1">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      id="confirm-password"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black transition-colors duration-200 hover:border-blue-300"
                    />
                  </div>
                  
                  <div className="pt-4">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md mr-2 transition-all duration-200 transform hover:translate-y-[-1px] hover:shadow-md">
                      Change Password
                    </button>
                    <button className="bg-gray-200 hover:bg-gray-300 text-black px-4 py-2 rounded-md transition-all duration-200">
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'appearance' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold mb-2 text-black">Appearance Settings</h2>
                <p className="text-black">Customize how the app looks for you.</p>
                
                <div className="mt-4 space-y-4">
                  <div className="space-y-6">
                    <label className="block text-sm font-medium text-black mb-1">
                      Theme
                    </label>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="theme-light"
                          name="theme"
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                          defaultChecked
                        />
                        <label htmlFor="theme-light" className="ml-2 text-sm text-black">
                          Light
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="theme-dark"
                          name="theme"
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        />
                        <label htmlFor="theme-dark" className="ml-2 text-sm text-black">
                          Dark
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="theme-system"
                          name="theme"
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        />
                        <label htmlFor="theme-system" className="ml-2 text-sm text-black">
                          Use System Setting
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md mr-2 transition-all duration-200 transform hover:translate-y-[-1px] hover:shadow-md">
                      Save Changes
                    </button>
                    <button className="bg-gray-200 hover:bg-gray-300 text-black px-4 py-2 rounded-md transition-all duration-200">
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .toggle-checkbox:checked {
          right: 0;
          border-color: #3B82F6;
        }
        .toggle-checkbox:checked + .toggle-label {
          background-color: #3B82F6;
        }
        .toggle-checkbox {
          transition: all 0.3s ease-in-out;
        }
        .toggle-label {
          transition: background-color 0.3s ease-in-out;
        }
      `}</style>
    </Layout>
  );
}