import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import InputField from './InputField';
import axios from 'axios';

const ResetPassword = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        // Pre-fill email from the location state passed by ForgotPassword page
        if (location.state?.email) {
            setEmail(location.state.email);
        }
    }, [location.state]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        if (newPassword !== confirmPassword) {
            setError('New passwords do not match.');
            return;
        }

        const payload = {
            email,
            otp,
            new_password: newPassword,
            confirm_password: confirmPassword
        };

        try {
            await axios.post('http://127.0.0.1:8000/auth/reset-password/', payload);
            setMessage('Password has been reset successfully! Redirecting to login...');
            
            // Redirect to login page after a short delay
            setTimeout(() => {
                navigate('/login');
            }, 2000);

        } catch (err) {
            setError('Failed to reset password. Please check your OTP and try again.');
            console.error('Reset Password error:', err);
        }
    };

    return (
        <div
            className="min-h-screen w-full flex flex-col items-center justify-center bg-cover bg-center"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1517495306984-f84210c9c24a?ixlib-rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80')" }}
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
                        Reset Your Password
                    </h2>
                    <p className="text-gray-600">An OTP was sent to your email. Please enter it below.</p>
                </div>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <InputField id="email" label="Email Address" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required readOnly/>
                    <InputField id="otp" label="OTP" type="text" value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="123456" required />
                    <InputField id="newPassword" label="New Password" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="••••••••" required />
                    <InputField id="confirmPassword" label="Confirm New Password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="••••••••" required />

                    {message && <p className="text-sm text-center text-green-600">{message}</p>}
                    {error && <p className="text-sm text-center text-red-600">{error}</p>}

                    <div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-transform transform hover:scale-105 mt-4"
                        >
                            Reset Password
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;

