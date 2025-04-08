/* /auth/setnewpassword/page.tsx */
'use client'
import { useState, useEffect, Suspense } from 'react'; // Import Suspense
import { useRouter, useSearchParams } from 'next/navigation';
import { getAuth, verifyPasswordResetCode, confirmPasswordReset } from "firebase/auth";
import Link from 'next/link';

// Assuming Header is located at /app/components/Header.tsx
import Header from '@/app/components/Header'; 

// Create a wrapper component to use useSearchParams
const SetNewPasswordContent = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [oobCode, setOobCode] = useState<string | null>(null); // Allow null initially
    const [isVerifying, setIsVerifying] = useState(true); // Start verifying immediately

    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const code = searchParams?.get('oobCode');

        if (!code) {
            setError('Invalid or missing password reset code in the link.');
            setIsVerifying(false);
            setOobCode(null); // Ensure oobCode is null if no code found
            return;
        }

        setOobCode(code);
        const auth = getAuth();

        // Verify the action code
        verifyPasswordResetCode(auth, code)
            .then(() => {
                console.log("Password reset code verified successfully.");
                setIsVerifying(false);
                setError(''); // Clear any previous errors
            })
            .catch((error) => {
                console.error("Error verifying password reset code:", error);
                // Provide more specific error messages based on Firebase error codes
                if (error.code === 'auth/expired-action-code') {
                    setError('This password reset link has expired. Please request a new one.');
                } else if (error.code === 'auth/invalid-action-code') {
                    setError('This password reset link is invalid. Please request a new one.');
                } else if (error.code === 'auth/user-disabled') {
                     setError('Your account has been disabled.');
                 } else if (error.code === 'auth/user-not-found') {
                     setError('No account found associated with this reset link.');
                } else {
                    setError('Could not verify the password reset link. It might be invalid or expired.');
                }
                setIsVerifying(false);
                setOobCode(null); // Invalidate oobCode if verification fails
            });
    }, [searchParams]); // Dependency array includes searchParams

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');

        if (!oobCode) {
            setError('Cannot reset password without a valid code.');
            return;
        }

        if (newPassword !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        if (newPassword.length < 6) {
            setError('Password must be at least 6 characters long.');
            return;
        }

        setIsLoading(true);

        try {
            const auth = getAuth();
            await confirmPasswordReset(auth, oobCode, newPassword);
            setSuccess(true);
        } catch (error: any) {
            console.error('Password reset confirmation error:', error);
             // Provide more specific error messages based on Firebase error codes
             if (error.code === 'auth/weak-password') {
                 setError('Password is too weak. Please choose a stronger password.');
             } else if (error.code === 'auth/expired-action-code' || error.code === 'auth/invalid-action-code') {
                  setError('This password reset link is invalid or has expired. Please request a new one.');
                  setOobCode(null); // Invalidate oobCode as it's no longer usable
             } else {
                 setError('Failed to update password. Please try again.');
             }
        } finally {
            setIsLoading(false);
        }
    };

    // Render different states within the card
    const renderContent = () => {
        if (isVerifying) {
            return (
                <div className="text-center py-10">
                    <div className="animate-spin h-8 w-8 border-4 border-gray-300 border-t-blue-600 rounded-full mx-auto mb-4"></div>
                    <p className="text-gray-600">Verifying your reset link...</p>
                </div>
            );
        }

        if (error || !oobCode) { // Show error if verification failed or code is missing/invalid
            return (
                <div className="text-center py-10">
                    <div className="w-16 h-16 bg-red-100 rounded-full mx-auto flex items-center justify-center mb-4">
                        {/* Simple X icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-medium text-gray-900 mb-2">Link Error</h3>
                    <p className="text-gray-600 mb-6">{error || 'An unknown error occurred.'}</p> {/* Display specific error */}
                    <Link href="/auth/resetpassword" className="text-sm text-blue-600 hover:text-blue-500 font-medium transition-colors">
                        Request a new password reset link
                    </Link>
                </div>
            );
        }

        if (success) {
            return (
                 <div className="text-center py-10">
                    <div className="w-16 h-16 bg-green-100 rounded-full mx-auto flex items-center justify-center mb-4">
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                             <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                         </svg>
                     </div>
                     <h3 className="text-xl font-medium text-gray-900 mb-2">Password Updated</h3>
                     <p className="text-gray-600 mb-6">
                         Your password has been successfully updated.
                     </p>
                     <Link href="/auth/login" className="inline-block px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                         Proceed to Login
                     </Link>
                 </div>
            );
        }

        // Default: Show the password reset form
        return (
             <>
                 <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">
                     Set New Password
                 </h2>
                 <p className="text-gray-600 mb-6 text-center">
                     Choose a new password for your account.
                 </p>
                 <form onSubmit={handleSubmit} className="space-y-5">
                     <div>
                         <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 mb-1">
                             New Password
                         </label>
                         <input
                             type="password"
                             id="new-password"
                             className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                             placeholder="Enter new password (min. 6 characters)"
                             value={newPassword}
                             onChange={(e) => setNewPassword(e.target.value)}
                             required
                             minLength={6}
                             autoComplete="new-password"
                         />
                     </div>

                     <div>
                         <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">
                             Confirm New Password
                         </label>
                         <input
                             type="password"
                             id="confirm-password"
                             className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                             placeholder="Confirm your new password"
                             value={confirmPassword}
                             onChange={(e) => setConfirmPassword(e.target.value)}
                             required
                             autoComplete="new-password"
                         />
                     </div>

                      {/* Display Form-Specific Error Message */}
                     {error && ( // Show error only if it occurred during form submission (not verification)
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
                         {isLoading ? 'Updating Password...' : 'Update Password'}
                     </button>
                 </form>
             </>
        );
    };

    return (
        <div className="min-h-screen bg-gray-100">
             {/* We don't need Head here as layout likely handles it */}
            <Header />
             <main className="flex justify-center items-center py-12 px-4">
                <div className="w-full max-w-md bg-white p-6 md:p-8 rounded-lg shadow-md">
                    {renderContent()}
                </div>
            </main>
            {/* Optional Footer */}
        </div>
    );
};


// Wrap the component that uses useSearchParams with Suspense
const SetNewPasswordPage = () => (
    <Suspense fallback={<div>Loading...</div>}> {/* Basic fallback */}
        <SetNewPasswordContent />
    </Suspense>
);

export default SetNewPasswordPage;