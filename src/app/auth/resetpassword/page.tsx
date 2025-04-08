/* /auth/resetpassword/page.tsx */
'use client'
import Link from 'next/link';
import Head from 'next/head';
import { useState, FormEvent } from 'react';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

// Assuming Header is located at /app/components/Header.tsx
import Header from '@/app/components/Header'; 

const ResetPassword: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setIsSubmitted(false); // Reset submitted state on new attempt

        try {
            const auth = getAuth();
            await sendPasswordResetEmail(auth, email);
            setIsSubmitted(true);
        } catch (error: any) {
            // Handle specific Firebase error codes
            if (error.code === 'auth/user-not-found') {
                setError('No account found with this email address.');
            } else if (error.code === 'auth/invalid-email') {
                setError('Please enter a valid email address.');
            } else if (error.code === 'auth/too-many-requests') {
                setError('Too many password reset attempts. Please try again later.');
            } else {
                setError('Failed to send password reset email. Please check the email address and try again.');
            }
            console.error('Reset password error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Head>
                <title>Reset Password | FanZ</title>
                <meta name="description" content="Reset your FanZ password" />
            </Head>

            {/* Use the standard Header */}
            <Header />

            <main className="flex justify-center items-center py-12 px-4">
                <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">

                    {/* Logo (Optional, can be removed if Header has it prominently) */}
                    {/* <div className="flex justify-center mb-6">
                         <Link href="/" className="flex items-center">
                            // Your Logo Component or Image here
                             <span className="text-2xl font-bold text-blue-600">FanZ</span>
                         </Link>
                    </div> */}
                    
                    <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">
                        Reset Your Password
                    </h2>
                    
                    {!isSubmitted ? (
                        <>
                            <p className="text-gray-600 mb-6 text-center">
                                Enter your email address below.
                            </p>
                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                                        placeholder="you@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        autoComplete="email"
                                    />
                                </div>

                                {/* Display Error Message */}
                                {error && (
                                    <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                                        <p>{error}</p>
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    className="w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200 disabled:opacity-50"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                    ) : null}
                                    {isLoading ? 'Sending Reset Link...' : 'Send Reset Link'}
                                </button>
                            </form>
                        </>
                    ) : (
                        // Success State
                        <div className="text-center py-6">
                            <div className="w-16 h-16 bg-green-100 rounded-full mx-auto flex items-center justify-center mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-medium text-gray-900 mb-2">Check Your Email</h3>
                            <p className="text-gray-600 mb-6">
                                We've sent password reset instructions to <span className="font-medium text-gray-800">{email}</span>. Please check your inbox (and spam folder).
                            </p>
                            <button
                                onClick={() => { setIsSubmitted(false); setError(''); }} // Allow user to try again
                                className="text-sm text-blue-600 hover:text-blue-500 font-medium transition-colors"
                            >
                                Didn't receive it? Send again
                            </button>
                        </div>
                    )}

                    <div className="mt-6 text-center">
                        <Link href="/auth/login" className="text-sm text-blue-600 hover:text-blue-500 font-medium transition-colors">
                            Back to Login
                        </Link>
                    </div>
                </div>
            </main>
            
             {/* Optional: Add a simple Footer if desired */}
             {/* <footer className="text-center py-4 text-gray-500 text-sm">
                  © 2023 FanZ.us
             </footer> */}
        </div>
    );
};

export default ResetPassword;