import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const Profile = () => {
    const [profileData, setProfileData] = useState({
        full_name: '',
        phone_number: '',
        local_address: '',
        city: '',
        state: '',
        country: '',
        pincode: ''
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false); // For loading state on submit
    const navigate = useNavigate();

    // Create a memoized instance of the API client to avoid re-creation on every render
    const api = React.useMemo(() => axios.create({
        baseURL: 'http://127.0.0.1:8000',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('authToken')}` }
    }), []);

    // Fetch existing profile data on component mount
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await api.get('/profile/');
                if (response.data) {
                    setProfileData(response.data);
                }
            } catch (err) {
                console.log("No existing profile found, user can create one.");
            }
        };
        fetchProfile();
    }, [api]); // Dependency array ensures this runs only once when the component mounts
    
    const handleChange = (e) => {
        setProfileData({ ...profileData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        setIsLoading(true);
        
        try {
            await api.post('/profile/', profileData);
            setMessage('Profile updated successfully! Redirecting...');
            localStorage.setItem('isProfileComplete', 'true');
            setTimeout(() => navigate('/feed'), 1500);
        } catch (err) {
            setError('Failed to update profile. Please ensure all fields are correct.');
            console.error('Profile update error:', err.response ? err.response.data : err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div 
            className="min-h-screen w-full bg-cover bg-center"
            // style={{ backgroundImage: "url('https://images.unsplash.com/photo-1593113598332-cd288d649414?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}
        >
            <div className="absolute inset-0 bg-black opacity-60"></div>
            <div className="relative z-10">
                <Navbar />
                <div className="max-w-4xl mx-auto mt-10 mb-10 bg-white bg-opacity-80 backdrop-blur-sm p-8 rounded-xl shadow-2xl">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-800">Your Profile</h2>
                        <p className="text-gray-600 mt-2">Please complete your details to start donating and claiming items.</p>
                    </div>
                    
                    <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
                        {Object.keys(profileData).map((key) => (
                            <div key={key}>
                                <label htmlFor={key} className="block text-sm font-medium text-gray-700 capitalize">{key.replace(/_/g, ' ')}</label>
                                <input
                                    type={key === 'phone_number' || key === 'pincode' ? 'tel' : 'text'}
                                    id={key}
                                    name={key}
                                    value={profileData[key] || ''}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-shadow"
                                    required
                                />
                            </div>
                        ))}
                        <div className="md:col-span-2 mt-4">
                            {message && <p className="text-sm text-center font-semibold text-green-700">{message}</p>}
                            {error && <p className="text-sm text-center font-semibold text-red-600">{error}</p>}
                            <button 
                                type="submit" 
                                disabled={isLoading}
                                className="w-full mt-4 flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-gray-400 transition-all transform hover:scale-105"
                            >
                                {isLoading ? 'Saving...' : 'Save Profile'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Profile;

