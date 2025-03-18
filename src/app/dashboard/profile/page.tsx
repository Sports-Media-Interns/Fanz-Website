'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { auth } from '@/app/components/firebase';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';

// Define a type for the profile state
interface ProfileData {
    firstName: string;
    lastName: string;
    email: string | null;
    userId: string;
    createdAt: string;
    loading: boolean;
}


const Profile: React.FC = () => {
    const [profile, setProfile] = useState<any>(
        {
            firstName: '',
            lastName: '',
            email: '',
            userId: '',
            createdAt: '',
            loading: true
        }
    );
    const router = useRouter();
    const db = getFirestore();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
            if (currentUser) {
                // Set basic auth info
                setProfile((prev: ProfileData) => ({
                    ...prev,
                    email: currentUser.email,
                    userId: currentUser.uid,
                    createdAt: currentUser.metadata?.creationTime || '',
                }));

                // Fetch user profile data from Firestore
                try {
                    const userDocRef = doc(db, "users", currentUser.uid);
                    const userDoc = await getDoc(userDocRef);

                    if (userDoc.exists()) {
                        const userData = userDoc.data();
                        setProfile((prev: ProfileData) => ({
                            ...prev,
                            firstName: userData.firstName || '',
                            lastName: userData.lastName || '',
                            loading: false
                        }));
                    } else {
                        setProfile((prev: ProfileData) => ({ ...prev, loading: false }));
                    }
                } catch (error) {
                    console.error("Error fetching user profile:", error);
                    setProfile((prev: ProfileData) => ({ ...prev, loading: false }));
                }
            } else {
                // If not logged in, redirect to login page
                router.push('/auth/login');
            }
        });

        return () => unsubscribe();
    }, [router]);

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            router.push('/auth/login');
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    if (profile.loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-[#3BB4E5] via-[#2A91F5] to-[#1A2A8F] flex justify-center items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#3BB4E5] via-[#2A91F5] to-[#1A2A8F]">
            {/* Navigation */}
            <nav className="bg-white/10 backdrop-blur-md shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <div className="flex-shrink-0 flex items-center">
                                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#3BB4E5]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z" />
                                    </svg>
                                </div>
                                <h1 className="text-xl font-bold ml-3 text-white">FanZ</h1>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <span className="text-white">{profile.email}</span>
                            <button
                                onClick={handleSignOut}
                                className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition duration-200"
                            >
                                Sign Out
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main content */}
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="bg-white/10 backdrop-blur-xl shadow-xl rounded-2xl overflow-hidden">
                    <div className="p-8">
                        <div className="flex flex-col md:flex-row">
                            <div className="md:w-1/3 flex justify-center md:justify-start">
                                <div className="w-36 h-36 rounded-full bg-gradient-to-br from-[#3BB4E5] to-[#1A2A8F] flex items-center justify-center text-white text-4xl font-bold border-4 border-white/30">
                                    {profile.firstName ? profile.firstName.charAt(0).toUpperCase() : profile.email?.charAt(0)?.toUpperCase() || 'U'}
                                </div>
                            </div>
                            <div className="md:w-2/3 mt-6 md:mt-0 md:ml-8">
                                <h2 className="text-2xl font-bold text-white mb-2">User Profile</h2>
                                <div className="bg-white/20 rounded-lg p-6 backdrop-blur-sm">
                                    <div className="mb-4 flex gap-4">
                                        <div className="w-1/2">
                                            <label className="block text-sm font-medium text-white mb-1">First Name</label>
                                            <div className="text-white font-medium bg-white/10 rounded-lg px-4 py-3">
                                                {profile.firstName || 'Not available'}
                                            </div>
                                        </div>
                                        <div className="w-1/2">
                                            <label className="block text-sm font-medium text-white mb-1">Last Name</label>
                                            <div className="text-white font-medium bg-white/10 rounded-lg px-4 py-3">
                                                {profile.lastName || 'Not available'}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-white mb-1">Email</label>
                                        <div className="text-white font-medium bg-white/10 rounded-lg px-4 py-3">
                                            {profile.email || 'Not available'}
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-white mb-1">User ID</label>
                                        <div className="text-white font-medium bg-white/10 rounded-lg px-4 py-3 truncate">
                                            {profile.userId || 'Not available'}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-white mb-1">Account Created</label>
                                        <div className="text-white font-medium bg-white/10 rounded-lg px-4 py-3">
                                            {profile.createdAt
                                                ? new Date(profile.createdAt).toLocaleString()
                                                : 'Not available'}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action cards */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 shadow-lg transition-transform hover:scale-105 duration-300">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#3BB4E5] to-[#2A91F5] flex items-center justify-center mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Edit Profile</h3>
                        <p className="text-white/80 mb-4">Update your personal information and preferences</p>
                        <Link href="/dashboard/edit-profile" className="inline-block bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition duration-200">
                            Edit Profile
                        </Link>
                    </div>

                    <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 shadow-lg transition-transform hover:scale-105 duration-300">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#2A91F5] to-[#1A2A8F] flex items-center justify-center mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Friends</h3>
                        <p className="text-white/80 mb-4">Connect with friends and see their updates</p>
                        <Link href="/dashboard/friends" className="inline-block bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition duration-200">
                            View Friends
                        </Link>
                    </div>

                    <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 shadow-lg transition-transform hover:scale-105 duration-300">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#3BB4E5] to-[#1A2A8F] flex items-center justify-center mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Create Post</h3>
                        <p className="text-white/80 mb-4">Share your thoughts, photos, and updates</p>
                        <Link href="/dashboard/create-post" className="inline-block bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition duration-200">
                            New Post
                        </Link>
                    </div>
                </div>

                {/* Recent activity section */}
                <div className="mt-8 bg-white/10 backdrop-blur-xl rounded-2xl p-8 shadow-xl">
                    <h3 className="text-2xl font-bold text-white mb-6">Recent Activity</h3>
                    <div className="space-y-4">
                        <div className="flex items-center p-4 bg-white/10 rounded-xl">
                            <div className="w-10 h-10 rounded-full bg-[#3BB4E5] flex items-center justify-center text-white font-bold">
                                U
                            </div>
                            <div className="ml-4">
                                <p className="text-white">Welcome to FanZ! Your profile is now set up.</p>
                                <p className="text-white/60 text-sm">Just now</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Profile;