import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";

const Navbar = () => {
    const navigate = useNavigate();


const handleLogout = async () => {
  try {
    // Call backend logout API (with credentials for cookies)
    await axios.post("http://127.0.0.1:8000/auth/logout/", {}, { withCredentials: true });

    // Clear local storage
    localStorage.removeItem("authToken");
    localStorage.removeItem("isProfileComplete");

    // Redirect to login
    navigate("/login");
  } catch (error) {
    console.error("Logout failed:", error);
    // Even if backend fails, clear local session
    localStorage.removeItem("authToken");
    localStorage.removeItem("isProfileComplete");
    navigate("/login");
  }
};


    return (
        <nav className="bg-white bg-opacity-80 backdrop-blur-sm shadow-lg sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/feed" className="text-2xl font-bold text-green-600">
                            DAAN
                        </Link>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            <Link
                                to="/feed"
                                className="text-gray-700 hover:bg-green-600 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                            >
                                Feed
                            </Link>
                            <Link
                                to="/create-post"
                                className="text-gray-700 hover:bg-green-600 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                            >
                                Create Post
                            </Link>
                            <Link
                                to="/my-claims"
                                className="text-gray-700 hover:bg-green-600 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                            >
                                My Claims
                            </Link>
                             <Link
                                to="/profile"
                                className="text-gray-700 hover:bg-green-600 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                            >
                                Profile
                            </Link>
                        </div>
                    </div>
                    <div className="hidden md:block">
                         <button
                            onClick={handleLogout}
                            className="ml-4 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

