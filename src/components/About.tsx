import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Code, Palette, Zap, Download, LucideProps } from "lucide-react";
import { getPortfolioSectionData, AboutData } from '@/services/portfolioService';
import { Skeleton } from '@/components/ui/skeleton';

// A helper to dynamically render icons from their string names
const iconComponents: { [key: string]: React.FC<LucideProps> } = {
  code: Code,
  palette: Palette,
  zap: Zap,
  // Add other lucide-react icons here as you need them
};

const About = () => {
  const [aboutData, setAboutData] = useState<AboutData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const data = await getPortfolioSectionData<AboutData>('about');
        setAboutData(data);
      } catch (err) {
        console.error('Error fetching about data:', err);
        setError('Failed to load content.');
      } finally {
        setLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  if (loading) return <AboutSkeleton />;
  if (error) return <section id="about" className="py-20 text-center text-destructive">{error}</section>;

  return (
    <section id="about" className="py-20 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6">
            {aboutData?.heading || 'About Me'}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {aboutData?.description || 'A passionate developer with experience creating digital experiences that are not only functional but also beautiful and intuitive.'}
          </p>
        </div>

        {/* Download CV Section */}
        <div className="text-center mb-16 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <div className="bg-gradient-primary rounded-lg p-8 shadow-medium hover:shadow-lg transition-all duration-300">
            <h3 className="text-2xl font-serif font-semibold text-accent-foreground mb-4">
              {aboutData?.resume.heading || 'Interested in Working Together?'}
            </h3>
            <p className="text-accent-foreground/80 mb-6 max-w-2xl mx-auto">
              {aboutData?.resume.description || 'Download my resume to learn more about my experience, skills, and achievements.'}
            </p>
            <Button
              className="bg-background/20 hover:bg-background/30 text-accent-foreground border border-accent-foreground/20 hover:border-accent-foreground/40 font-medium px-8 py-3 rounded-full shadow-medium hover-scale transform transition-all duration-300"
              onClick={() => {
                // This part is still a placeholder for file download functionality
                const link = document.createElement('a');
                link.href = '/placeholder.svg'; // Replace with actual CV file path
                link.download = 'Sona_K_Resume.pdf';
                link.click();
              }}
            >
              <Download className="h-4 w-4 mr-2" />
              Download Resume
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <h3 className="text-2xl font-serif font-semibold text-primary mb-6">
              {aboutData?.journey.heading || 'My Journey'}
            </h3>
            <p className="text-foreground leading-relaxed mb-4">
              {aboutData?.journey.description || 'My journey in web development started with a curiosity about how websites work. What began as a hobby quickly turned into a passion.'}
            </p>
          </div>

          <div className="animate-scale-in" style={{ animationDelay: '0.4s' }}>
            <div className="bg-gradient-primary rounded-lg p-8 text-center shadow-medium hover:shadow-lg transform transition-all duration-300 hover-scale">
              <div className="space-y-6">
                <div className="transform transition-transform duration-300 hover:scale-110">
                  <div className="text-4xl font-bold text-accent-foreground mb-2">{aboutData?.metrics.projects || '0'}+</div>
                  <div className="text-accent-foreground/80">Projects Completed</div>
                </div>
                <div className="transform transition-transform duration-300 hover:scale-110">
                  <div className="text-4xl font-bold text-accent-foreground mb-2">{aboutData?.metrics.experience || '0'}+</div>
                  <div className="text-accent-foreground/80">Years Experience</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {(aboutData?.skills || []).map((skill, index) => {
            const IconComponent = iconComponents[skill.icon.toLowerCase()] || Code;
            return (
              <Card
                key={index}
                className="shadow-soft hover:shadow-medium transition-all duration-500 animate-fade-in hover-scale group cursor-pointer"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center mb-4 transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
                    <IconComponent className="h-8 w-8 text-accent" />
                  </div>
                  <h4 className="text-xl font-semibold text-primary mb-3 group-hover:text-accent transition-colors duration-300">
                    {skill.name}
                  </h4>
                  <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                    {skill.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default About;

const AboutSkeleton = () => (
  <section id="about" className="py-20 bg-background">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <Skeleton className="h-12 w-1/3 mx-auto mb-6" />
        <Skeleton className="h-5 w-4/5 mx-auto mb-2" />
        <Skeleton className="h-5 w-3/5 mx-auto" />
      </div>
      <div className="text-center mb-16">
        <Skeleton className="h-52 w-full rounded-lg" />
      </div>
      <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <Skeleton className="h-8 w-1/4 mb-6" />
          <Skeleton className="h-5 w-full mb-2" />
          <Skeleton className="h-5 w-full mb-2" />
          <Skeleton className="h-5 w-2/3" />
        </div>
        <Skeleton className="h-64 w-full rounded-lg" />
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        <Skeleton className="h-48 w-full rounded-lg" />
        <Skeleton className="h-48 w-full rounded-lg" />
        <Skeleton className="h-48 w-full rounded-lg" />
      </div>
    </div>
  </section>
);