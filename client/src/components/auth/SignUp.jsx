// src/components/auth/SignUp.js
import React, { useState } from 'react';
import InputField from './InputField';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { username, email, password };
    
    // In a real app, you would make an API call here
    console.log('Submitting to /auth/signup/:', payload);
    // e.g., fetch('http://127.0.0.1:8000/auth/signup/', { method: 'POST', body: JSON.stringify(payload), ... })
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Create your account
            </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <InputField id="username" label="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    <InputField id="email" label="Email address" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <InputField id="password" label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

                    <div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                            Sign up
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  );
};

export default SignUp;