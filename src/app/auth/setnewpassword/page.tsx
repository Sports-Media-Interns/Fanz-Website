'use client'
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { getAuth, verifyPasswordResetCode, confirmPasswordReset } from "firebase/auth";
import Link from 'next/link';

const SetNewPassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [oobCode, setOobCode] = useState('');
    const [isVerifying, setIsVerifying] = useState(true);

    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        // Get the action code (oobCode) from the URL
        const code = searchParams?.get('oobCode');

        if (!code) {
            setError('Invalid password reset link');
            setIsVerifying(false);
            return;
        }

        setOobCode(code);

        // Verify the action code
        const auth = getAuth();
        verifyPasswordResetCode(auth, code)
            .then(() => {
                setIsVerifying(false);
            })
            .catch((error) => {
                setError('This password reset link is invalid or has expired');
                setIsVerifying(false);
            });
    }, [searchParams]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');

        // Basic validation
        if (newPassword !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (newPassword.length < 6) {
            setError('Password must be at least 6 characters long');
            return;
        }

        setIsLoading(true);

        try {
            // Confirm the password reset
            const auth = getAuth();
            await confirmPasswordReset(auth, oobCode, newPassword);
            setSuccess(true);
        } catch (error) {
            setError('Failed to reset password. Please try again.');
            console.error('Password reset error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#3BB4E5] via-[#2A91F5] to-[#1A2A8F] flex justify-center items-center p-4">
            {/* Background elements (same as your reset password page) */}

            <div className="w-full max-w-md z-10 bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden">
                <div className="p-8 md:p-10">
                    {isVerifying ? (
                        <div className="text-center py-8">
                            <div className="animate-spin h-10 w-10 border-4 border-white border-t-transparent rounded-full mx-auto mb-4"></div>
                            <p className="text-white">Verifying your reset link...</p>
                        </div>
                    ) : error && !oobCode ? (
                        <div className="text-center py-8">
                            <div className="w-16 h-16 bg-red-100 rounded-full mx-auto flex items-center justify-center mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-medium text-white mb-2">Invalid Link</h3>
                            <p className="text-white-600 mb-6">{error}</p>
                            <Link href="/auth/reset-password" className="text-[#3BB4E5] hover:text-[#1A2A8F] font-medium transition-colors">
                                Request a new password reset link
                            </Link>
                        </div>
                    ) : success ? (
                        <div className="text-center py-8">
                            <div className="w-16 h-16 bg-green-100 rounded-full mx-auto flex items-center justify-center mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-medium text-white mb-2">Password Reset Successful</h3>
                            <p className="text-white-600 mb-6">
                                Your password has been successfully updated. You can now log in with your new password.
                            </p>
                            <Link href="/auth/login" className="text-[#3BB4E5] hover:text-[#1A2A8F] font-medium transition-colors">
                                Go to Login
                            </Link>
                        </div>
                    ) : (
                        <>
                            <div className="flex items-center mb-8">
                                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#3BB4E5]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                        <path d="M7 11V7a5 5 0 0110 0v4"></path>
                                    </svg>
                                </div>
                                <h1 className="text-2xl font-bold ml-3 text-white">FanZ</h1>
                            </div>

                            <h2 className="text-2xl font-bold text-white mb-2">Set New Password</h2>
                            <p className="text-white-600 mb-8">Create a new password for your account</p>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="new-password" className="block text-sm font-medium text-white mb-1">
                                        New Password
                                    </label>
                                    <input
                                        type="password"
                                        id="new-password"
                                        className="w-full px-4 py-3 rounded-lg bg-white/70 backdrop-blur-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#3BB4E5] focus:border-transparent transition-all duration-200"
                                        placeholder="Enter new password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        required
                                        minLength={6}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="confirm-password" className="block text-sm font-medium text-white mb-1">
                                        Confirm Password
                                    </label>
                                    <input
                                        type="password"
                                        id="confirm-password"
                                        className="w-full px-4 py-3 rounded-lg bg-white/70 backdrop-blur-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#3BB4E5] focus:border-transparent transition-all duration-200"
                                        placeholder="Confirm new password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
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
                                    {isLoading ? 'Updating...' : 'Reset Password'}
                                </button>
                            </form>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SetNewPassword;