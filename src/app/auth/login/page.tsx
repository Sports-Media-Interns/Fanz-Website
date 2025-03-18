'use client'
import Link from 'next/link';
import { useState, FormEvent, useEffect } from 'react';
import Head from 'next/head';

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [animatedElements, setAnimatedElements] = useState<boolean>(false);

    useEffect(() => {
        // Add a slight delay before showing animations to ensure smooth transition
        const timer = setTimeout(() => setAnimatedElements(true), 100);
        return () => clearTimeout(timer);
    }, []);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        setTimeout(() => {
            console.log('Login attempt with:', email);
            setIsLoading(false);
            // Handle login logic here
        }, 1200);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#3BB4E5] via-[#2A91F5] to-[#1A2A8F] flex justify-center items-center p-4">
            <Head>
                <title>Login | Connect</title>
                <meta name="description" content="Sign in to your Connect account" />
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

            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#1A2A8F]/30 to-[#3BB4E5]/30 rounded-full filter blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-[#3BB4E5]/30 to-[#2A91F5]/30 rounded-full filter blur-3xl translate-y-1/2 -translate-x-1/2"></div>

            <div className="absolute inset-0 bg-gradient-to-br from-[#3BB4E5]/10 via-[#2A91F5]/10 to-[#1A2A8F]/10 backdrop-blur-sm z-0"></div>

            <div className="w-full max-w-6xl z-10 flex flex-col md:flex-row bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden">
                {/* Left side - Branding */}
                <div className="w-full md:w-1/2 bg-gradient-to-br from-[#3BB4E5] to-[#1A2A8F] p-8 md:p-12 flex flex-col justify-between text-white relative overflow-hidden">
                    <div className={`transition-all duration-1000 ${animatedElements ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <div className="flex items-center mb-8">
                            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#3BB4E5]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z" />
                                </svg>
                            </div>
                            <h1 className="text-2xl font-bold ml-3">FanZ</h1>
                        </div>

                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Welcome to your social world</h2>
                        <p className="text-lg text-[#D9F2FF] mb-8">Connect with friends, share moments, and build your network.</p>
                    </div>

                    {/* Animated circles */}
                    <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-white/10 rounded-full"></div>
                    <div className="absolute -bottom-16 -right-16 w-40 h-40 bg-white/5 rounded-full"></div>

                    <div className={`transition-all duration-1000 delay-300 ${animatedElements ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <div className="flex items-center gap-4">
                            <div className="flex -space-x-2">
                                <div className="w-10 h-10 rounded-full border-2 border-[#1A2A8F] bg-[#3BB4E5]"></div>
                                <div className="w-10 h-10 rounded-full border-2 border-[#1A2A8F] bg-[#87CEF6]"></div>
                                <div className="w-10 h-10 rounded-full border-2 border-[#1A2A8F] bg-[#D9F2FF]"></div>
                            </div>
                            <p className="text-sm">Join millions of people already connected</p>
                        </div>
                    </div>
                </div>

                {/* Right side - Login Form */}
                <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                    <div className={`transition-all duration-700 delay-500 ${animatedElements ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <h2 className="text-2xl font-bold text-white-800 mb-2">Welcome Back</h2>
                        <p className="text-white-600 mb-8">Sign in to access your account</p>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-white mb-1">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    className="w-full px-4 py-3 rounded-lg bg-white/70 text-black backdrop-blur-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#3BB4E5] focus:border-transparent transition-all duration-200"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            <div>
                                <div className="flex justify-between items-center mb-1">
                                    <label htmlFor="password" className="block text-sm font-medium text-white">
                                        Password
                                    </label>
                                    <Link href="/auth/resetpassword" className="text-sm text-white hover:text-gray-300 transition-colors">
                                        Forgot Your Password?
                                    </Link>
                                </div>
                                <input
                                    type="password"
                                    id="password"
                                    className="w-full px-4 py-3 rounded-lg bg-white/70 text-black backdrop-blur-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#3BB4E5] focus:border-transparent transition-all duration-200"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 text-[#3BB4E5] border-gray-300  rounded focus:ring-[#3BB4E5]"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-white">
                                    Remember me
                                </label>
                            </div>

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
                                {isLoading ? 'Signing in...' : 'Sign in'}
                            </button>
                        </form>

                        <div className="mt-8 text-center">
                            <p className="text-white-600">
                                Don&apos;t have an account?{' '}
                                <Link href="/auth/signup" className="text-[#3BB4E5] hover:text-[#1A2A8F] font-medium transition-colors">
                                    Create account
                                </Link>
                            </p>
                        </div>

                        <div className="mt-8 flex items-center justify-center">
                            <div className="h-px bg-gray-300 w-full"></div>
                            <p className="text-sm text-white-500 px-4 text-center">Or continue with</p>
                            <div className="h-px bg-gray-300 w-full"></div>
                        </div>

                        <div className="mt-6 grid grid-cols-2 gap-2">
                            <button
                                type="button"
                                className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3BB4E5]"
                            >
                                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.602-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.087.636-1.337-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.022.8-.223 1.654-.333 2.504-.337.85.004 1.705.114 2.504.336 1.909-1.29 2.747-1.022 2.747-1.022.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.934.359.31.678.92.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.48C19.138 20.16 22 16.416 22 12c0-5.523-4.477-10-10-10z" />
                                </svg>
                            </button>
                            <button
                                type="button"
                                className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3BB4E5]"
                            >
                                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2.917 16.083c-2.258 0-4.083-1.825-4.083-4.083s1.825-4.083 4.083-4.083c1.103 0 2.024.402 2.735 1.067l-1.107 1.068c-.304-.292-.834-.63-1.628-.63-1.394 0-2.531 1.155-2.531 2.579 0 1.424 1.138 2.579 2.531 2.579 1.616 0 2.224-1.162 2.316-1.762h-2.316v-1.4h3.855c.036.204.064.408.064.677.001 2.332-1.563 3.988-3.919 3.988zm9.917-3.5h-1.75v1.75h-1.167v-1.75h-1.75v-1.166h1.75v-1.75h1.167v1.75h1.75v1.166z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;