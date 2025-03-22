'use client'
import Link from 'next/link';
import Head from 'next/head';
import { useState, FormEvent, useEffect } from 'react';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const ResetPassword: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
    const [animatedElements, setAnimatedElements] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        // Add a slight delay before showing animations to ensure smooth transition
        const timer = setTimeout(() => setAnimatedElements(true), 100);
        return () => clearTimeout(timer);
    }, []);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const auth = getAuth();
            await sendPasswordResetEmail(auth, email);
            setIsSubmitted(true);
        } catch (error: any) {
            // Handle specific Firebase error codes
            if (error.code === 'auth/user-not-found') {
                setError('No account exists with this email address.');
            } else if (error.code === 'auth/invalid-email') {
                setError('Please enter a valid email address.');
            } else if (error.code === 'auth/too-many-requests') {
                setError('Too many attempts. Please try again later.');
            } else {
                setError('Failed to send reset email. Please try again.');
            }
            console.error('Reset password error:', error);
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#3BB4E5] via-[#2A91F5] to-[#1A2A8F] flex justify-center items-center p-4">
            <Head>
                <title>Reset Password | FanZ</title>
                <meta name="description" content="Reset your FanZ password" />
            </Head>

            {/* Home button */}
            <div className="absolute top-4 left-4 z-20">
                <Link href="/" className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-4 py-2 rounded-full transition-all duration-200 shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7m-14 0l2 2m0 0l7 7 7-7m-14 0l2-2" />
                    </svg>
                    <span>Home</span>
                </Link>
            </div>

            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#1A2A8F]/30 to-[#3BB4E5]/30 rounded-full filter blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-[#3BB4E5]/30 to-[#2A91F5]/30 rounded-full filter blur-3xl translate-y-1/2 -translate-x-1/2"></div>

            <div className="absolute inset-0 bg-gradient-to-br from-[#3BB4E5]/10 via-[#2A91F5]/10 to-[#1A2A8F]/10 backdrop-blur-sm z-0"></div>

            <div className="w-full max-w-md z-10 bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden">
                <div className="p-8 md:p-10">
                    <div className={`transition-all duration-1000 ${animatedElements ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <div className="flex items-center mb-8">
                            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#3BB4E5]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z" />
                                </svg>
                            </div>
                            <h1 className="text-2xl font-bold ml-3 text-white">FanZ</h1>
                        </div>

                        <h2 className="text-2xl font-bold text-white mb-2">Reset Password</h2>
                        <p className="text-white-600 mb-8">Enter your email address and we'll send you instructions to reset your password</p>

                        {!isSubmitted ? (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-white mb-1">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        className="w-full px-4 py-3 rounded-lg bg-white/70 backdrop-blur-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#3BB4E5] focus:border-transparent transition-all duration-200"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>

                                {error && (
                                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                                        <span className="block sm:inline">{error}</span>
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-gradient-to-r from-[#3BB4E5] to-[#1A2A8F] hover:from-[#27A0D1] hover:to-[#152375] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3BB4E5] transition-all duration-200"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                    ) : null}
                                    {isLoading ? 'Sending...' : 'Reset Password'}
                                </button>
                            </form>
                        ) : (
                            <div className="text-center py-6">
                                <div className="w-16 h-16 bg-green-100 rounded-full mx-auto flex items-center justify-center mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-medium text-white mb-2">Check your email</h3>
                                <p className="text-white-600 mb-6">
                                    We've sent password reset instructions to <span className="font-medium">{email}</span>
                                </p>
                                <button
                                    onClick={() => setIsSubmitted(false)}
                                    className="text-[#3BB4E5] hover:text-[#1A2A8F] font-medium transition-colors"
                                >
                                    Didn't receive the email? Try again
                                </button>
                            </div>
                        )}

                        <div className="mt-8 text-center">
                            <div className="flex justify-center space-x-6">
                                <Link href="/auth/login" className="text-white hover:text-[#1A2A8F] font-medium transition-colors">
                                    Back to Login
                                </Link>
                                <Link href="/" className="text-white hover:text-[#1A2A8F] font-medium transition-colors flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                                    </svg>
                                    Home
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;