import React, { useState } from 'react';
import { AboutData } from '@/services/portfolioService';
import { uploadResume, updateAboutData } from '@/services/aboutService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Trash2 } from 'lucide-react';

interface AboutFormProps {
    initialData: AboutData;
}

const AboutForm: React.FC<AboutFormProps> = ({ initialData }) => {
    const [formData, setFormData] = useState<AboutData>(initialData);
    const [resumeFile, setResumeFile] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        const keys = name.split('.');
        setFormData(prev => {
            // Deep copy to avoid direct state mutation
            const newData = JSON.parse(JSON.stringify(prev));
            let current: any = newData;
            for (let i = 0; i < keys.length - 1; i++) {
                // If a nested object doesn't exist, create it.
                if (current[keys[i]] === undefined) {
                    current[keys[i]] = {};
                }
                current = current[keys[i]];
            }
            current[keys[keys.length - 1]] = keys.includes('projects') || keys.includes('experience') ? Number(value) : value;
            return newData;
        });
    };

    const handleSkillChange = (index: number, field: 'name' | 'icon' | 'description', value: string) => {
        const newSkills = [...(formData.skills || [])];
        newSkills[index][field] = value;
        setFormData(prev => ({ ...prev, skills: newSkills }));
    };

    const addSkill = () => {
        setFormData(prev => ({ ...prev, skills: [...(prev?.skills || []), { name: '', icon: '', description: '' }] }));
    };

    const removeSkill = (index: number) => {
        const newSkills = (formData.skills || []).filter((_, i) => i !== index);
        setFormData(prev => ({ ...prev, skills: newSkills }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setResumeFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            let dataToSave = { ...formData };

            // If a new resume file is selected, upload it first
            if (resumeFile) {
                const { fileName, fileUrl } = await uploadResume(resumeFile);
                dataToSave.resume = { ...dataToSave.resume, fileName, fileUrl };
            }

            await updateAboutData(dataToSave);
            toast({
                title: 'Success!',
                description: 'About section updated successfully.',
            });
        } catch (error) {
            console.error('Failed to update about section:', error);
            toast({
                title: 'Error',
                description: 'Failed to update about section. ' + (error instanceof Error ? error.message : ''),
                variant: 'destructive',
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>About Section</CardTitle>
                <CardDescription>Update the content for the "About Me" page.</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* About Section */}
                    <div className="space-y-2">
                        <Label htmlFor="about.heading">About Heading</Label>
                        <Input id="about.heading" name="heading" value={formData?.heading || ''} onChange={handleInputChange} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="about.description">About Description</Label>
                        <Textarea id="about.description" name="description" value={formData?.description || ''} onChange={handleInputChange} rows={4} />
                    </div>

                    {/* Resume Section */}
                    <div className="space-y-2">
                        <Label htmlFor="resume.heading">Resume Heading</Label>
                        <Input id="resume.heading" name="resume.heading" value={formData?.resume?.heading || ''} onChange={handleInputChange} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="resume.description">Resume Description</Label>
                        <Textarea id="resume.description" name="resume.description" value={formData?.resume?.description || ''} onChange={handleInputChange} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="resume.file">Resume File (PDF)</Label>
                        <Input id="resume.file" type="file" accept=".pdf" onChange={handleFileChange} />
                        <p className="text-sm text-muted-foreground">Current file: {formData?.resume?.fileName || 'None'}</p>
                    </div>

                    {/* Journey Section */}
                    <div className="space-y-2">
                        <Label htmlFor="journey.heading">Journey Heading</Label>
                        <Input id="journey.heading" name="journey.heading" value={formData?.journey?.heading || ''} onChange={handleInputChange} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="journey.description">Journey Description</Label>
                        <Textarea id="journey.description" name="journey.description" value={formData?.journey?.description || ''} onChange={handleInputChange} rows={4} />
                    </div>

                    {/* Metrics */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2"><Label htmlFor="metrics.projects">Projects Completed</Label><Input id="metrics.projects" name="metrics.projects" type="number" value={formData?.metrics?.projects || 0} onChange={handleInputChange} /></div>
                        <div className="space-y-2"><Label htmlFor="metrics.experience">Years of Experience</Label><Input id="metrics.experience" name="metrics.experience" type="number" value={formData?.metrics?.experience || 0} onChange={handleInputChange} /></div>
                    </div>

                    {/* Skills Section */}
                    <div className="space-y-4">
                        <Label>Skills</Label>
                        {(formData.skills || []).map((skill, index) => (
                            <div key={index} className="p-4 border rounded-lg space-y-3">
                                <div className="flex items-center gap-2">
                                    <Input placeholder="Skill Name (e.g., React)" value={skill.name || ''} onChange={(e) => handleSkillChange(index, 'name', e.target.value)} />
                                    <Input placeholder="Icon Name (e.g., 'react')" value={skill.icon || ''} onChange={(e) => handleSkillChange(index, 'icon', e.target.value)} />
                                </div>
                                <Textarea placeholder="Skill description..." value={skill.description || ''} onChange={(e) => handleSkillChange(index, 'description', e.target.value)} />
                                <Button type="button" variant="destructive" size="icon" onClick={() => removeSkill(index)}><Trash2 className="h-4 w-4" /></Button>
                            </div>
                        ))}
                        <Button type="button" variant="outline" onClick={addSkill}>Add Skill</Button>
                    </div>

                    <Button type="submit" disabled={isLoading}>{isLoading ? 'Saving...' : 'Save Changes'}</Button>
                </form>
            </CardContent>
        </Card>
    );
};

export default AboutForm;