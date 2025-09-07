import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider';
import { adminEmail } from '../firebase/config';

const PrivateRoute = () => {
    const { currentUser } = useAuth();

    // Check if a user is logged in and if their email matches the admin email
    const isAdmin = currentUser && currentUser.email === adminEmail;

    if (!isAdmin) {
        // Redirect to home page if not authorized
        return <Navigate to="/" />;
    }

    return <Outlet />;
};

export default PrivateRoute;