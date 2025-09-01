import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [feedback, setFeedback] = useState("");

  // Axios instance with auth token
  const api = axios.get({
    baseURL: "http://127.0.0.1:8000",
    withCredentials: true, // ✅ put this inside the same object
  });

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await api.get("/posts/feed/");
        setPosts(response.data);
        setError("");
      } catch (err) {
        setError("Failed to fetch posts. Please try again later.");
        console.error("Fetch posts error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleClaim = async (postId) => {
    try {
      setFeedback(`Claiming post ${postId}...`);
      await api.post(`/posts/${postId}/claim`);
      setFeedback(`Post ${postId} claimed successfully!`);
      // Visually remove the post from the feed after claiming
      setPosts(posts.filter((p) => p.id !== postId));
    } catch (err) {
      setFeedback(
        `Failed to claim post ${postId}. It might have already been claimed.`
      );
      console.error("Claim post error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Donation Feed</h1>

        {loading && (
          <p className="text-center text-gray-600">Loading posts...</p>
        )}
        {error && (
          <p className="text-center text-red-600 bg-red-100 p-3 rounded-md">
            {error}
          </p>
        )}
        {feedback && (
          <p className="text-center text-green-600 bg-green-100 p-3 rounded-md mb-4">
            {feedback}
          </p>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-transform duration-300"
              >
                <img
                  src={post.image_url}
                  alt={post.heading}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {post.heading.replace(/"/g, "")}
                  </h2>
                  <p className="text-gray-600 mt-2">
                    {post.description.replace(/"/g, "")}
                  </p>
                  <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full capitalize">
                      {post.item_type}
                    </span>
                    <span>{post.city}</span>
                  </div>
                  <button
                    onClick={() => handleClaim(post.id)}
                    className="mt-4 w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-colors"
                  >
                    Claim Item
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        {!loading && posts.length === 0 && !error && (
          <p className="text-center text-gray-500 mt-10">
            No donations available at the moment. Check back later!
          </p>
        )}
      </div>
    </div>
  );
};

export default Feed;
