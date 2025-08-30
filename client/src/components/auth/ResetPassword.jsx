// src/components/auth/ResetPassword.js
import React, { useState, useEffect } from 'react';
import InputField from './InputField';

const ResetPassword = () => {
  // In a real app, the token would come from the URL query parameters
  // const urlParams = new URLSearchParams(window.location.search);
  // const initialToken = urlParams.get('token');
  
  const [token, setToken] = useState('');
  const [new_password, setNewPassword] = useState('');
  const [confirm_password, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (new_password !== confirm_password) {
      alert("Passwords do not match!");
      return;
    }
    // The email might be included or derived from the token on the backend
    const payload = { token, new_password, confirm_password };

    // API call to /auth/reset-password/ would go here
    console.log('Submitting to /auth/reset-password/:', payload);
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Reset Your Password</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
            <InputField id="token" label="Reset Token" value={token} onChange={(e) => setToken(e.target.value)} placeholder="Enter the token from your email" />
            <InputField id="new_password" label="New Password" type="password" value={new_password} onChange={(e) => setNewPassword(e.target.value)} />
            <InputField id="confirm_password" label="Confirm New Password" type="password" value={confirm_password} onChange={(e) => setConfirmPassword(e.target.value)} />
            
            <div>
                <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                    Set New Password
                </button>
            </div>
        </form>
    </div>
  );
};

export default ResetPassword;