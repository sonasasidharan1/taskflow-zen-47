import React, { useState } from 'react';
import { HeroData, updatePortfolioSection } from '@/services/portfolioService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';

interface HeroFormProps {
    initialData: HeroData;
}

const HeroForm: React.FC<HeroFormProps> = ({ initialData }) => {
    const [formData, setFormData] = useState<HeroData>(initialData);
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await updatePortfolioSection('hero', formData);
            toast({
                title: 'Success!',
                description: 'Hero section updated successfully.',
            });
        } catch (error) {
            console.error('Failed to update hero section:', error);
            toast({
                title: 'Error',
                description: 'Failed to update hero section.',
                variant: 'destructive',
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Hero Section</CardTitle>
                <CardDescription>Update the content for the main hero section of your portfolio.</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2"><Label htmlFor="name">Name</Label><Input id="name" name="name" value={formData.name} onChange={handleChange} /></div>
                    <div className="space-y-2"><Label htmlFor="title">Title</Label><Input id="title" name="title" value={formData.title} onChange={handleChange} /></div>
                    <div className="space-y-2"><Label htmlFor="subtitle">Subtitle</Label><Input id="subtitle" name="subtitle" value={formData.subtitle} onChange={handleChange} /></div>
                    <Button type="submit" disabled={isLoading}>{isLoading ? 'Saving...' : 'Save Changes'}</Button>
                </form>
            </CardContent>
        </Card>
    );
};

export default HeroForm;