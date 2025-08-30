// src/components/auth/UpdatePassword.js
import React, { useState } from 'react';
import InputField from './InputField';

const UpdatePassword = () => {
  const [curr_password, setCurrPassword] = useState('');
  const [new_password, setNewPassword] = useState('');
  const [confirm_password, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (new_password !== confirm_password) {
      alert("New passwords do not match!");
      return;
    }
    const payload = { curr_password, new_password, confirm_password };

    // API call to /auth/update-password/ would go here
    console.log('Submitting to /auth/update-password/:', payload);
  };

  return (
     <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Update Your Password</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
            <InputField id="curr_password" label="Current Password" type="password" value={curr_password} onChange={(e) => setCurrPassword(e.target.value)} />
            <InputField id="new_password" label="New Password" type="password" value={new_password} onChange={(e) => setNewPassword(e.target.value)} />
            <InputField id="confirm_password" label="Confirm New Password" type="password" value={confirm_password} onChange={(e) => setConfirmPassword(e.target.value)} />
            
            <div>
                <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                    Update Password
                </button>
            </div>
        </form>
    </div>
  );
};

export default UpdatePassword;