import React, { useState, useEffect } from 'react';
import { getPortfolioSectionData, HeroData } from '@/services/portfolioService';
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";

const Hero = () => {
  const [heroData, setHeroData] = useState<HeroData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const data = await getPortfolioSectionData<HeroData>('hero');
        setHeroData(data);
      } catch (err) {
        console.error('Error fetching hero data:', err);
        setError('Failed to load content.');
      } finally {
        setLoading(false);
      }
    };

    fetchHeroData();
  }, []);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  if (loading) {
    return <HeroSkeleton />;
  }

  if (error) {
    return <section id="home" className="min-h-screen flex items-center justify-center text-center p-4 text-destructive">{error}</section>;
  }

  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-secondary relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-accent/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/3 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-primary mb-4 hover-scale">
            {heroData?.name || 'Your Name'}
          </h1>
          <h2 className="text-xl md:text-2xl text-muted-foreground mb-6 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            {heroData?.title || 'Your Title'}
          </h2>
          <p className="text-lg text-foreground max-w-2xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.6s' }}>
            {heroData?.subtitle || 'A catchy and descriptive subtitle about what you do.'}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-12 animate-scale-in" style={{ animationDelay: '0.8s' }}>
          <Button
            onClick={() => scrollToSection("portfolio")}
            className="bg-accent hover:bg-accent/90 text-accent-foreground font-medium px-8 py-3 rounded-full shadow-medium hover-scale transform transition-all duration-300 hover:shadow-lg"
          >
            View My Work
          </Button>
          <Button
            variant="outline"
            onClick={() => scrollToSection("contact")}
            className="border-accent text-accent hover:bg-accent hover:text-accent-foreground px-8 py-3 rounded-full hover-scale transform transition-all duration-300"
          >
            Get In Touch
          </Button>
        </div>

        <div className="flex justify-center space-x-6 animate-fade-in" style={{ animationDelay: '1s' }}>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-accent transition-all duration-300 hover-scale transform hover:rotate-12"
          >
            <Github className="h-6 w-6" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-accent transition-all duration-300 hover-scale transform hover:rotate-12"
          >
            <Linkedin className="h-6 w-6" />
          </a>
          <a
            href="mailto:sona@example.com"
            className="text-muted-foreground hover:text-accent transition-all duration-300 hover-scale transform hover:rotate-12"
          >
            <Mail className="h-6 w-6" />
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <button
          onClick={() => scrollToSection("about")}
          className="text-muted-foreground hover:text-accent transition-all duration-300 hover-scale group"
        >
          <ArrowDown className="h-6 w-6 group-hover:translate-y-1 transition-transform duration-300" />
        </button>
      </div>
    </section>
  );
};

// Skeleton component for the loading state to match the layout
const HeroSkeleton = () => (
  <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-secondary relative overflow-hidden">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
      <div className="mb-8">
        <Skeleton className="h-16 md:h-20 w-3/4 mx-auto mb-4" />
        <Skeleton className="h-8 w-1/2 mx-auto mb-6" />
        <div className="space-y-2 max-w-2xl mx-auto">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-5/6" />
        </div>
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-12">
        <Skeleton className="h-11 w-36 rounded-full" />
        <Skeleton className="h-11 w-36 rounded-full" />
      </div>
    </div>
  </section>
);

export default Hero;