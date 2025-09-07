import React, { useEffect, useState } from 'react';
import { auth } from '../firebase/config';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { getPortfolioData, PortfolioData } from '../services/portfolioService';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import HeroForm from '../components/dashboard/HeroForm';
// Import other forms as you create them
// import AboutForm from '@/components/dashboard/AboutForm';

const Dashboard = () => {
    const navigate = useNavigate();
    const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getPortfolioData();
                // Initialize with default data if Firestore document doesn't exist
                setPortfolioData(data ?? { hero: { name: '', title: '', subtitle: '' }, about: { description: '' } });
            } catch (err) {
                console.error(err);
                setError('Failed to fetch portfolio data. Please try again later.');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleLogout = async () => {
        await signOut(auth);
        navigate('/');
    };

    if (loading) return <div className="p-8">Loading dashboard...</div>;
    if (error) return <div className="p-8 text-destructive">{error}</div>;

    return (
        <div className="container mx-auto p-4 md:p-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                <Button onClick={handleLogout} variant="outline">Logout</Button>
            </div>

            <Tabs defaultValue="hero" className="w-full">
                <TabsList>
                    <TabsTrigger value="hero">Hero</TabsTrigger>
                    <TabsTrigger value="about">About</TabsTrigger>
                    <TabsTrigger value="experience" disabled>Experience</TabsTrigger>
                    <TabsTrigger value="education" disabled>Education</TabsTrigger>
                    <TabsTrigger value="portfolio" disabled>Portfolio</TabsTrigger>
                    <TabsTrigger value="contact" disabled>Contact</TabsTrigger>
                </TabsList>
                <TabsContent value="hero">{portfolioData && <HeroForm initialData={portfolioData.hero} />}</TabsContent>
                <TabsContent value="about">{/* {portfolioData && <AboutForm initialData={portfolioData.about} />} */}</TabsContent>
            </Tabs>
        </div>
    );
};

export default Dashboard;