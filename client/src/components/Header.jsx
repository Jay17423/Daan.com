// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <header className="bg-white/80 backdrop-blur-md fixed top-0 left-0 right-0 z-50 shadow-sm">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center py-4">
        <Link to="/" className="flex items-center space-x-2">
          <svg className="h-8 w-8 text-green-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 3.5a1.5 1.5 0 013 0V4a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-.5a1.5 1.5 0 000 3h.5a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-.5a1.5 1.5 0 00-3 0v.5a1 1 0 01-1 1H6a1 1 0 01-1-1v-3a1 1 0 011-1h.5a1.5 1.5 0 000-3H6a1 1 0 01-1-1V6a1 1 0 011-1h3a1 1 0 001-1v-.5z" />
          </svg>
          <span className="text-2xl font-bold text-gray-800">DAAN</span>
        </Link>
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/#categories" className="text-gray-600 hover:text-green-600 transition-colors">Categories</Link>
          <Link to="/#how-it-works" className="text-gray-600 hover:text-green-600 transition-colors">How It Works</Link>
          <Link to="/#volunteer" className="text-gray-600 hover:text-green-600 transition-colors">Volunteer</Link>
        </nav>
        <div className="hidden md:flex items-center space-x-4">
            <Link to="/login" className="text-gray-600 font-medium hover:text-green-600 transition-colors">
                Login
            </Link>
            <Link to="/signup" className="bg-green-600 text-white font-semibold px-5 py-2 rounded-lg hover:bg-green-700 transition-transform transform hover:scale-105 shadow-lg">
                Sign Up
            </Link>
        </div>
      </div>
    </div>
  </header>
);

export default Header;