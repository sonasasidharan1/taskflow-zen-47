import React from 'react';
import { auth } from '../firebase/config';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';

const Dashboard = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        await signOut(auth);
        navigate('/');
    };

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="mt-2">Welcome, admin! This is your protected dashboard.</p>
            <Button onClick={handleLogout} className="mt-4">Logout</Button>
        </div>
    );
};

export default Dashboard;