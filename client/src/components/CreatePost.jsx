import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const CreatePost = () => {
    const [heading, setHeading] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [itemType, setItemType] = useState('food'); // Default value
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const api = axios.create({
        baseURL: 'http://127.0.0.1:8000',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        const payload = {
            heading: heading,
            description: description,
            image_url: imageUrl,
            item_type: itemType,
        };

        try {
            await api.post('/posts', payload);
            setMessage('Post created successfully! Redirecting to feed...');
            setTimeout(() => {
                navigate('/feed');
            }, 2000);
        } catch (err) {
            setError('Failed to create post. Please check your inputs.');
            console.error('Create post error:', err);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="max-w-2xl mx-auto mt-10 bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Create a New Donation Post</h2>
                
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="heading" className="block text-sm font-medium text-gray-700">Heading</label>
                        <input type="text" id="heading" value={heading} onChange={(e) => setHeading(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500" placeholder="e.g., Winter Clothes for Kids" required />
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500" placeholder="Describe the items you are donating" required />
                    </div>
                     <div>
                        <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">Image URL</label>
                        <input type="url" id="imageUrl" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500" placeholder="https://example.com/image.jpg" required />
                    </div>
                    <div>
                        <label htmlFor="itemType" className="block text-sm font-medium text-gray-700">Item Type</label>
                        <select id="itemType" value={itemType} onChange={(e) => setItemType(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500">
                            <option value="food">Food</option>
                            <option value="clothes">Clothes</option>
                            <option value="electronics">Electronics</option>
                        </select>
                    </div>

                    {message && <p className="text-sm text-center text-green-600">{message}</p>}
                    {error && <p className="text-sm text-center text-red-600">{error}</p>}
                    
                    <div>
                        <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                            Create Post
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreatePost;
