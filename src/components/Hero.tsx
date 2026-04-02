import React, { useState, useEffect } from 'react';
import { getPortfolioSectionData, HeroData } from '@/services/portfolioService';
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ArrowDown, Download, Github, Linkedin, Mail } from "lucide-react";
import { FirebaseError } from "firebase/app";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const WhatsAppIcon = ({ className = "h-6 w-6" }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M20.52 3.48A11.86 11.86 0 0 0 12.06 0C5.5 0 .16 5.34.16 11.9c0 2.1.55 4.15 1.6 5.96L0 24l6.29-1.65a11.86 11.86 0 0 0 5.77 1.47h.01c6.56 0 11.9-5.34 11.9-11.9 0-3.18-1.24-6.16-3.45-8.44Zm-8.45 18.33h-.01a9.9 9.9 0 0 1-5.05-1.38l-.36-.21-3.73.98.99-3.63-.23-.37a9.9 9.9 0 0 1-1.52-5.3c0-5.48 4.45-9.93 9.92-9.93 2.65 0 5.14 1.03 7.01 2.91a9.86 9.86 0 0 1 2.9 7.01c0 5.47-4.45 9.92-9.92 9.92Zm5.44-7.42c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.66.15-.2.3-.76.96-.93 1.16-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.47-.89-.79-1.49-1.77-1.66-2.06-.18-.3-.02-.46.13-.61.14-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.08-.15-.66-1.59-.9-2.18-.24-.57-.49-.49-.66-.5h-.57c-.2 0-.52.08-.8.38-.27.3-1.04 1.02-1.04 2.48 0 1.47 1.07 2.88 1.22 3.08.15.2 2.1 3.2 5.09 4.49.71.3 1.27.48 1.7.62.72.23 1.38.2 1.9.12.58-.09 1.75-.72 2-1.42.25-.7.25-1.3.18-1.42-.08-.12-.27-.2-.57-.35Z"
    />
  </svg>
);

const Hero = () => {
  const [heroData, setHeroData] = useState<HeroData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [resumeOpen, setResumeOpen] = useState(false);

  const resumeFileName = "SONA_K.pdf";
  const resumeHref = `/${encodeURIComponent(resumeFileName)}`;

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const data = await getPortfolioSectionData<HeroData>('hero');
        setHeroData(data);
      } catch (err) {
        // Public pages should still render with defaults if Firestore blocks unauthenticated reads.
        if (err instanceof FirebaseError && err.code === "permission-denied") {
          setHeroData(null);
        } else {
          console.error('Error fetching hero data:', err);
          setError('Failed to load content.');
        }
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
          <div className="mb-8 flex justify-center">
            <div className="relative h-36 w-36 md:h-44 md:w-44 rounded-full p-1 bg-gradient-primary shadow-medium">
              <img
                src="/profile.jpg"
                alt="Profile"
                className="h-full w-full rounded-full object-cover border-4 border-background"
                loading="eager"
              />
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-primary mb-4 hover-scale">
            {heroData?.name || 'Sona K'}
          </h1>
          <h2 className="text-xl md:text-2xl text-muted-foreground mb-6 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            {heroData?.title || 'Software Engineer'}
          </h2>
          <p className="text-lg text-foreground max-w-2xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.6s' }}>
            {heroData?.subtitle ||
              'What started as a simple interest in technology has evolved into a journey of constant learning, building, and innovation. I strive to create solutions that are not only functional but also meaningful.'}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row sm:flex-wrap items-center justify-center gap-4 sm:gap-6 mb-12 animate-scale-in" style={{ animationDelay: '0.8s' }}>
          <Button
            variant="outline"
            onClick={() => scrollToSection("contact")}
            className="border-accent text-accent hover:bg-accent hover:text-accent-foreground px-8 py-3 rounded-full hover-scale transform transition-all duration-300"
          >
            Get In Touch
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              setResumeOpen(true);

              // Trigger download as well (works for files in /public).
              const link = document.createElement("a");
              link.href = resumeHref;
              link.download = resumeFileName;
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}
            className="border-accent text-accent hover:bg-accent hover:text-accent-foreground px-8 py-3 rounded-full hover-scale transform transition-all duration-300"
          >
            <Download className="h-4 w-4 mr-2" />
            Download Resume
          </Button>
        </div>

        <Dialog open={resumeOpen} onOpenChange={setResumeOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Resume Preview</DialogTitle>
            </DialogHeader>
            <div className="w-full">
              <iframe
                src={resumeHref}
                title="Resume PDF Preview"
                className="w-full h-[70vh] rounded-md border border-border/60"
              />
            </div>
          </DialogContent>
        </Dialog>

        <div className="flex justify-center space-x-6 animate-fade-in" style={{ animationDelay: '1s' }}>
          <a
            href="https://github.com/sonasasidharan"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-accent transition-all duration-300 hover-scale transform hover:rotate-12"
            aria-label="GitHub"
          >
            <Github className="h-6 w-6" />
          </a>
          <a
            href="https://www.linkedin.com/in/sona-k-web"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-accent transition-all duration-300 hover-scale transform hover:rotate-12"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-6 w-6" />
          </a>
          <a
            href="mailto:sonasasidharank2002@gmail.com"
            className="text-muted-foreground hover:text-accent transition-all duration-300 hover-scale transform hover:rotate-12"
            aria-label="Email"
          >
            <Mail className="h-6 w-6" />
          </a>
          <a
            href="https://wa.me/9961146641"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-accent transition-all duration-300 hover-scale transform hover:rotate-12"
            aria-label="WhatsApp"
          >
            <WhatsAppIcon className="h-6 w-6" />
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