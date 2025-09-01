import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import InputField from './InputField';
import axios from 'axios';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const payload = { email };

        try {
            // API call to send the OTP
            await axios.post('http://127.0.0.1:8000/auth/forgot-password/', payload);
            // On success, navigate to the reset password page with the email in state
            navigate('/reset-password', { state: { email: email } });
        } catch (err) {
            setError('Failed to send reset link. Please check the email and try again.');
            console.error('Forgot Password error:', err);
        }
    };

    return (
        <div
            className="min-h-screen w-full flex flex-col items-center justify-center bg-cover bg-center"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1517495306984-f84210c9c24a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80')" }}
        >
            <div className="absolute inset-0 bg-black opacity-75"></div>

            <div className="absolute top-5 left-5 z-10">
                <Link to="/" className="font-medium text-white hover:text-green-300 transition-colors">
                    &larr; Back to Home
                </Link>
            </div>

            <div className="relative bg-white bg-opacity-80 backdrop-blur-sm shadow-xl rounded-2xl p-8 sm:p-10 w-full max-w-md">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-800">
                        Forgot Your Password?
                    </h2>
                    <p className="text-gray-600">No problem. Enter your email to get an OTP.</p>
                </div>

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <InputField
                        id="email"
                        label="Email Address"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        required
                    />
                    
                    {error && <p className="text-sm text-center text-red-600">{error}</p>}

                    <div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-transform transform hover:scale-105"
                        >
                            Send OTP
                        </button>
                    </div>
                </form>

                <p className="mt-8 text-center text-sm text-gray-600">
                    Remembered your password?{' '}
                    <Link to="/login" className="font-medium text-green-600 hover:text-green-500 transition-colors">
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default ForgotPassword;

