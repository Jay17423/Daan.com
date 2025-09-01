import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
    const isProfileComplete = localStorage.getItem('isProfileComplete') === 'true';
    const authToken = localStorage.getItem('authToken');

    if (!authToken) {
        // If there's no token, the user is not logged in
        return <Navigate to="/login" />;
    }
    
    if (!isProfileComplete) {
        // If the profile is not complete, redirect to the profile page
        return <Navigate to="/profile" />;
    }

    // If the profile is complete, render the requested component
    return <Outlet />;
};

export default ProtectedRoute;
