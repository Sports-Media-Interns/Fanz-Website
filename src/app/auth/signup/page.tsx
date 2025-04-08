/* /auth/signup/page.tsx */
'use client'
import Link from 'next/link';
import { useState, FormEvent, useEffect } from 'react';
import Head from 'next/head';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation'; // Use next/navigation

// Assuming Header is located at /app/components/Header.tsx
import Header from '@/app/components/Header'; 

const Signup: React.FC = () => {
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [passwordError, setPasswordError] = useState<string>('');
    const [authError, setAuthError] = useState<string>('');
    const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);

    const router = useRouter();

    // Check if passwords match
    useEffect(() => {
        if (password && confirmPassword && password !== confirmPassword) {
            setPasswordError('Passwords do not match.');
        } else {
            setPasswordError('');
        }
    }, [password, confirmPassword]);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Reset errors/success message on new submission
        setPasswordError('');
        setAuthError('');
        setShowSuccessMessage(false);

        if (password !== confirmPassword) {
            setPasswordError('Passwords do not match.');
            return;
        }
        if (password.length < 6) { // Example: Minimum password length check
             setPasswordError('Password must be at least 6 characters long.');
             return;
        }


        setIsLoading(true);

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Create user document in Firestore
            await setDoc(doc(db, "users", user.uid), {
                uid: user.uid, // Store uid for easier querying
                firstName: firstName.trim(),
                lastName: lastName.trim(),
                email: user.email,
                createdAt: serverTimestamp() // Use server timestamp
                // Add other default fields like profileImageUrl: null, bio: '', etc.
            });

            // Registration successful
            setShowSuccessMessage(true);
            // Don't redirect automatically, let the success message show with a link/button

        } catch (error: any) {
            console.error('Signup error:', error);
            // Handle specific Firebase errors
            if (error.code === 'auth/email-already-in-use') {
                setAuthError('This email address is already registered. Please log in or use a different email.');
            } else if (error.code === 'auth/invalid-email') {
                setAuthError('Please enter a valid email address.');
            } else if (error.code === 'auth/weak-password') {
                setAuthError('Password is too weak. Please choose a stronger password (at least 6 characters).');
            } else {
                setAuthError('Failed to create account. Please try again.');
            }
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div className="min-h-screen bg-gray-100">
            <Head>
                <title>Sign Up | FanZ</title>
                <meta name="description" content="Create your FanZ account" />
            </Head>

            <Header />

            <main className="flex justify-center items-center py-12 px-4">
                <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md">

                     {/* Show Success Message Instead of Form */}
                    {showSuccessMessage ? (
                        <div className="text-center py-10">
                             <div className="w-16 h-16 bg-green-100 rounded-full mx-auto flex items-center justify-center mb-4">
                                 <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                     <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                 </svg>
                             </div>
                             <h3 className="text-xl font-medium text-gray-900 mb-2">Account Created!</h3>
                             <p className="text-gray-600 mb-6">
                                 Welcome to FanZ! Your account has been successfully created.
                             </p>
                             <button
                                 onClick={() => router.push('/auth/login')}
                                 className="inline-block px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                             >
                                 Proceed to Login
                             </button>
                         </div>
                    ) : (
                        // Show Signup Form
                         <>
                             <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">
                                 Create Your Account
                             </h2>
                             <p className="text-gray-600 mb-6 text-center">
                                 Join the FanZ community today!
                             </p>

                             {/* Display Auth Error Message */}
                             {authError && (
                                 <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                                     <p>{authError}</p>
                                 </div>
                             )}

                             <form onSubmit={handleSubmit} className="space-y-4">
                                 {/* First Name and Last Name */}
                                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                     <div>
                                         <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                                             First Name
                                         </label>
                                         <input
                                             type="text"
                                             id="firstName"
                                             className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                                             placeholder="Enter first name"
                                             value={firstName}
                                             onChange={(e) => setFirstName(e.target.value)}
                                             required
                                             autoComplete="given-name"
                                         />
                                     </div>
                                     <div>
                                         <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                                             Last Name
                                         </label>
                                         <input
                                             type="text"
                                             id="lastName"
                                             className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                                             placeholder="Enter last name"
                                             value={lastName}
                                             onChange={(e) => setLastName(e.target.value)}
                                             required
                                             autoComplete="family-name"
                                         />
                                     </div>
                                 </div>

                                 {/* Email */}
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

                                 {/* Password */}
                                 <div>
                                     <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                         Password
                                     </label>
                                     <input
                                         type="password"
                                         id="password"
                                         className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                                         placeholder="Create a password (min. 6 characters)"
                                         value={password}
                                         onChange={(e) => setPassword(e.target.value)}
                                         required
                                         minLength={6}
                                         autoComplete="new-password"
                                     />
                                 </div>

                                 {/* Confirm Password */}
                                 <div>
                                     <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                                         Confirm Password
                                     </label>
                                     <input
                                         type="password"
                                         id="confirmPassword"
                                         className={`w-full px-4 py-2 rounded-md border ${passwordError ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500' } focus:outline-none focus:ring-2 focus:border-transparent transition duration-200`}
                                         placeholder="Confirm your password"
                                         value={confirmPassword}
                                         onChange={(e) => setConfirmPassword(e.target.value)}
                                         required
                                         autoComplete="new-password"
                                     />
                                     {passwordError && <p className="text-xs mt-1 text-red-600">{passwordError}</p>}
                                 </div>

                                 {/* Terms Agreement */}
                                 <div className="flex items-start">
                                     <input
                                         id="terms"
                                         name="terms"
                                         type="checkbox"
                                         className="h-4 w-4 mt-0.5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                         required
                                     />
                                     <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                                         I agree to the <Link href="/terms" className="text-blue-600 hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>.
                                     </label>
                                 </div>

                                 {/* Submit Button */}
                                 <button
                                     type="submit"
                                     className="w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200 disabled:opacity-50"
                                     disabled={isLoading || !!passwordError}
                                 >
                                     {isLoading ? (
                                         <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                             <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                             <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                         </svg>
                                     ) : null}
                                     {isLoading ? 'Creating Account...' : 'Create Account'}
                                 </button>
                             </form>

                            {/* Optional: Social Logins */}
                             {/* <div className="mt-6">
                                 <div className="relative">
                                     <div className="absolute inset-0 flex items-center">
                                         <div className="w-full border-t border-gray-300" />
                                     </div>
                                     <div className="relative flex justify-center text-sm">
                                         <span className="px-2 bg-white text-gray-500">Or sign up with</span>
                                     </div>
                                 </div>
                                 <div className="mt-6 grid grid-cols-2 gap-3">
                                     // Add social signup buttons here
                                 </div>
                             </div> */}

                             <div className="mt-6 text-center">
                                 <p className="text-sm text-gray-600">
                                     Already have an account?{' '}
                                     <Link href="/auth/login" className="text-blue-600 hover:text-blue-500 font-medium transition-colors">
                                         Sign in
                                     </Link>
                                 </p>
                             </div>
                         </>
                    )}
                </div>
            </main>
             {/* Optional Footer */}
        </div>
    );
};

export default Signup;