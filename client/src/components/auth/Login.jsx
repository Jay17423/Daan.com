import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import InputField from './InputField';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

     const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            // Step 1: Authenticate the user. The backend will set the cookie automatically.
            const payload = { email, password };
            // Use standard axios with withCredentials for the login request itself.
            await axios.post('http://127.0.0.1:8000/auth/login/', payload, { withCredentials: true });

            // The browser now has the httponly cookie.
            // You don't need to extract or save any token here.

            // Step 2: Check the user's profile status using the centralized API client.
            // The `api` client will automatically include the new cookie in its request.
            try {
                const profileResponse = await api.get('/profile/');
                const profile = profileResponse.data;

                if (profile && profile.full_name && profile.city) {
                    localStorage.setItem('isProfileComplete', 'true');
                    navigate('/feed');
                } else {
                    localStorage.setItem('isProfileComplete', 'false');
                    navigate('/profile');
                }
            } catch (profileError) {
                // This will run if the profile doesn't exist yet.
                localStorage.setItem('isProfileComplete', 'false');
                navigate('/profile');
            }

        } catch (loginError) {
            setError('Login failed. Please check your email and password.');
            console.error('Login Error:', loginError.response ? loginError.response.data : loginError.message);
        }
    };

    return (
        <div 
            className="min-h-screen w-full flex items-center justify-center bg-cover bg-center"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1593113598332-cd288d649414?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}
        >
            <div className="absolute inset-0 bg-black opacity-50"></div>
            
            <div className="absolute top-5 left-5 z-10">
                <Link to="/" className="font-medium text-white hover:text-green-300 transition-colors">
                    &larr; Back to Home
                </Link>
            </div>
            
            <div className="relative bg-white bg-opacity-80 backdrop-blur-sm shadow-xl rounded-2xl p-8 sm:p-10 w-full max-w-md">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-800">
                        Welcome Back
                    </h2>
                    <p className="text-gray-600">Sign in to continue to your account</p>
                </div>
                
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <InputField 
                        id="email" 
                        label="Email address" 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        placeholder="you@example.com"
                        required
                    />
                    <InputField 
                        id="password" 
                        label="Password" 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        placeholder="••••••••"
                        required
                    />
                    
                    {error && <p className="text-sm text-center text-red-600">{error}</p>}

                    <div className="flex items-center justify-end text-sm">
                        <Link to="/forgot-password" className="font-medium text-green-600 hover:text-green-500 transition-colors">
                            Forgot your password?
                        </Link>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-transform transform hover:scale-105"
                        >
                            Sign In
                        </button>
                    </div>
                </form>

                <p className="mt-8 text-center text-sm text-gray-600">
                    Don't have an account?{' '}
                    <Link to="/signup" className="font-medium text-green-600 hover:text-green-500 transition-colors">
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;

