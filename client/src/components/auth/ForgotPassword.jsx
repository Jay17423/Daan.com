// src/components/auth/ForgotPassword.js
import React, { useState } from 'react';
import InputField from './InputField';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { email };

    // API call to /auth/forgot-password/ would go here
    console.log('Submitting to /auth/forgot-password/:', payload);
    alert('If an account with that email exists, a password reset link has been sent.');
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">Forgot Password</h2>
        <p className="text-center text-gray-600 mb-8">
            Enter your email and we'll send you a link to reset your password.
        </p>
        <form className="space-y-6" onSubmit={handleSubmit}>
            <InputField id="email" label="Email Address" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            
            <div>
                <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                    Send Reset Link
                </button>
            </div>
        </form>
    </div>
  );
};

export default ForgotPassword;