/* /app/auth/signup/page.tsx (or your signup route) */
'use client'; // Required for hooks like useFormState, useFormStatus, useState, useEffect

import React, { useState, useEffect } from 'react'; // Import React
import Link from 'next/link';
import Head from 'next/head'; // Keep for setting page title/meta
import { useRouter } from 'next/navigation'; // Can still be used for navigation if needed elsewhere

// Import the server action and hooks
import { signup } from './actions'; // Adjust path if actions.ts is elsewhere
import { useFormState, useFormStatus } from 'react-dom';

// Assuming Header is still a separate component
import Header from '@/app/components/Header'; // Adjust path if needed

// Define the initial state shape for useFormState
const initialState = {
  message: '',
};

// Submit Button component using useFormStatus
function SubmitButton({ disabled }: { disabled: boolean }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      disabled={pending || disabled} // Disable if pending or explicitly disabled (e.g., password mismatch)
      aria-disabled={pending || disabled}
    >
      {pending ? (
        <>
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Creating Account...
        </>
      ) : (
        'Create Account'
      )}
    </button>
  );
}


const SignupPage: React.FC = () => {
  // State for client-side password confirmation check
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');

  // useFormState hook to manage form submission and feedback from the server action
  // It wires the form to the 'signup' server action
  const [state, formAction] = useFormState(signup, initialState);

  // const router = useRouter(); // Keep if needed for other navigation, e.g., navigating away on success message click

  // Client-side validation effect for password matching
  useEffect(() => {
    if (password && confirmPassword && password !== confirmPassword) {
      setPasswordError('Passwords do not match.');
    } else {
      setPasswordError('');
    }
  }, [password, confirmPassword]);

  // Determine message type for styling
  const isErrorMessage = state?.message?.toLowerCase().includes('error') || state?.message?.toLowerCase().includes('failed');
  const isSuccessMessage = state?.message?.toLowerCase().includes('success');


  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Sign Up | FanZ</title>
        <meta name="description" content="Create your FanZ account" />
      </Head>

      <Header />

      <main className="flex justify-center items-center py-12 px-4">
        <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md">
          {/* Check for the specific success message from the action */}
          {isSuccessMessage && state.message.includes('check your email') ? (
            // Display "Check Email" message
            <div className="text-center py-10">
                <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto flex items-center justify-center mb-4">
                    {/* Simple Mail Icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">Check Your Email</h3>
                <p className="text-gray-600 mb-6" aria-live="polite">
                    {state.message} {/* Display the exact message from server action */}
                </p>
                 <Link href="/auth/login" className="text-blue-600 hover:text-blue-500 font-medium transition-colors">
                    Back to Login
                 </Link>
            </div>
           ) : (
            // Display Signup Form
            <>
              <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">
                Create Your Account
              </h2>
              <p className="text-gray-600 mb-6 text-center">
                Join the FanZ community today!
              </p>

              {/* Display Server Action Error/Success Messages */}
              {state?.message && !state.message.includes('check your email') && ( // Don't show generic message if "check email" is shown
                <div
                  aria-live="polite" // Important for screen readers
                  className={`mb-4 p-3 border rounded ${
                    isErrorMessage
                      ? 'bg-red-100 border-red-400 text-red-700'
                      : 'bg-green-100 border-green-400 text-green-700' // Generic success styling if needed
                  }`}
                >
                  <p>{state.message}</p>
                </div>
              )}

              {/* Form now uses formAction from useFormState */}
              <form action={formAction} className="space-y-4">
                {/* First Name and Last Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName" // Name attribute is crucial for FormData
                      className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                      placeholder="Enter first name"
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
                      name="lastName" // Name attribute
                      className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                      placeholder="Enter last name"
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
                    name="email" // Name attribute
                    className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                    placeholder="you@example.com"
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
                    name="password" // Name attribute
                    className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                    placeholder="Create a password (min. 6 characters)"
                    value={password} // Keep state binding for client-side check
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
                    // No 'name' needed as it's only for client-side check
                    className={`w-full px-4 py-2 rounded-md border ${passwordError ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'} focus:outline-none focus:ring-2 focus:border-transparent transition duration-200`}
                    placeholder="Confirm your password"
                    value={confirmPassword} // Keep state binding for client-side check
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    autoComplete="new-password"
                  />
                  {/* Display client-side password mismatch error */}
                  {passwordError && <p className="text-xs mt-1 text-red-600">{passwordError}</p>}
                </div>

                {/* Terms Agreement */}
                <div className="flex items-start">
                  <input
                    id="terms"
                    name="terms" // Keep name if you need to check this server-side (though often just 'required' is enough)
                    type="checkbox"
                    className="h-4 w-4 mt-0.5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    required
                  />
                  <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                    I agree to the <Link href="/terms" className="text-blue-600 hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>.
                  </label>
                </div>

                {/* Submit Button Component */}
                {/* Disable button if passwords don't match client-side */}
                <SubmitButton disabled={!!passwordError} />
              </form>

              {/* Optional: Social Logins (would need separate actions/logic) */}
              {/* ... */}

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

export default SignupPage;