import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

const MyClaims = () => {
    const [claimedPosts, setClaimedPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [feedback, setFeedback] = useState('');

    const api = axios.create({
        baseURL: 'http://127.0.0.1:8000',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
    });

    const fetchClaimedPosts = async () => {
        try {
            setLoading(true);
            const response = await api.get('/posts/claimed-by-others/');
            setClaimedPosts(response.data);
            setError('');
        } catch (err) {
            setError('Failed to fetch your claimed posts.');
            console.error('Fetch claimed posts error:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchClaimedPosts();
    }, []);

    const handleConfirm = async (postId) => {
        try {
            setFeedback(`Confirming claim for post ${postId}...`);
            await api.patch(`/posts/${postId}/confirm?confirm=true`);
            setFeedback(`Claim for post ${postId} confirmed successfully!`);
            // Refresh list after action
            fetchClaimedPosts();
        } catch (err) {
            setFeedback(`Failed to confirm claim for post ${postId}.`);
            console.error('Confirm claim error:', err);
        }
    };

    const handleReject = async (postId) => {
        try {
            setFeedback(`Rejecting claim for post ${postId}...`);
            await api.patch(`/posts/${postId}/reject`);
            setFeedback(`Claim for post ${postId} rejected successfully!`);
            // Refresh list after action
            fetchClaimedPosts();
        } catch (err) {
            setFeedback(`Failed to reject claim for post ${postId}.`);
            console.error('Reject claim error:', err);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="container mx-auto p-4 sm:p-6 lg:p-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Manage Claims on Your Posts</h1>

                {loading && <p className="text-center text-gray-600">Loading claims...</p>}
                {error && <p className="text-center text-red-600 bg-red-100 p-3 rounded-md">{error}</p>}
                {feedback && <p className="text-center text-blue-600 bg-blue-100 p-3 rounded-md mb-4">{feedback}</p>}

                {!loading && !error && (
                    <div className="bg-white rounded-lg shadow-md overflow-hidden">
                        <ul className="divide-y divide-gray-200">
                            {claimedPosts.map((post) => (
                                <li key={post.id} className="p-4 flex flex-col sm:flex-row items-center justify-between">
                                    <div className="flex items-center mb-4 sm:mb-0">
                                        <img src={post.image_url} alt={post.heading} className="w-16 h-16 object-cover rounded-md mr-4" />
                                        <div>
                                            <p className="font-semibold text-gray-800">{post.heading.replace(/"/g, '')}</p>
                                            <p className="text-sm text-gray-500">Claimed by: {post.claimed_by_user_email || 'A user'}</p>
                                        </div>
                                    </div>
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => handleConfirm(post.id)}
                                            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm"
                                        >
                                            Confirm
                                        </button>
                                        <button
                                            onClick={() => handleReject(post.id)}
                                            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm"
                                        >
                                            Reject
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                {!loading && claimedPosts.length === 0 && !error && (
                    <p className="text-center text-gray-500 mt-10">You have no pending claims to review.</p>
                )}
            </div>
        </div>
    );
};

export default MyClaims;
