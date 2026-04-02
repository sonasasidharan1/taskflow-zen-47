import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Code, Palette, Zap, Download, LucideProps, FileText, GitBranch } from "lucide-react";
import { getPortfolioSectionData, AboutData } from '@/services/portfolioService';
import { Skeleton } from '@/components/ui/skeleton';
import { FirebaseError } from "firebase/app";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// A helper to dynamically render icons from their string names
const iconComponents: { [key: string]: React.FC<LucideProps> } = {
  code: Code,
  palette: Palette,
  zap: Zap,
  git: GitBranch,
  // Add other lucide-react icons here as you need them
};

/** Shown in the Skills grid (alongside any skills from Firestore). */
const staticSkills: Array<{ name: string; icon: string; description: string }> = [
  {
    name: "Core",
    icon: "code",
    description: "HTML, CSS, Javascript, Redux",
  },
  {
    name: "Web technologies",
    icon: "palette",
    description: "ReactJS, NextJS, Tailwind CSS, Shadcn UI, microfrontend",
  },
  {
    name: "Version control",
    icon: "git",
    description: "Github",
  },
  {
    name: "Backend technologies",
    icon: "zap",
    description: "ExpressJS, Strapi",
  },
];

const About = () => {
  const [aboutData, setAboutData] = useState<AboutData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [resumeOpen, setResumeOpen] = useState(false);
  const resumeFileName = "SONA_K.pdf";
  const resumeHref = `/${encodeURIComponent(resumeFileName)}`;

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const data = await getPortfolioSectionData<AboutData>('about');
        setAboutData(data);
      } catch (err) {
        // Public pages should still render with defaults if Firestore blocks unauthenticated reads.
        if (err instanceof FirebaseError && err.code === "permission-denied") {
          setAboutData(null);
        } else {
          console.error('Error fetching about data:', err);
          setError('Failed to load content.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  if (loading) return <AboutSkeleton />;
  if (error) return <section id="about" className="py-20 text-center text-destructive">{error}</section>;

  const skills = [...staticSkills, ...(aboutData?.skills ?? [])].filter((skill) => {
    const name = (skill?.name ?? "").toString().toLowerCase().trim();
    const description = (skill?.description ?? "").toString().toLowerCase().trim();

    // Removes the unwanted card shown as "react" with description "skills".
    const isBadReactSkillsCard =
      name.includes("react") && description.includes("skills");

    return !isBadReactSkillsCard;
  });

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

        {/* Resume Download Section */}
        {/* <div className="mb-16 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-gradient-primary/10 shadow-soft">
            <div className="absolute -top-24 -right-20 h-72 w-72 rounded-full bg-accent/25 blur-3xl" />
            <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />

            <div className="relative p-8 md:p-10">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div className="max-w-2xl">
                  <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/40 px-3 py-1 text-accent">
                    <FileText className="h-4 w-4" />
                    <span className="text-sm font-medium">Resume</span>
                  </div>

                  <h3 className="mt-4 text-3xl md:text-4xl font-serif font-semibold text-primary">
                    {aboutData?.resume.heading || "Interested in Working Together?"}
                  </h3>

                  <p className="mt-3 text-muted-foreground leading-relaxed">
                    {aboutData?.resume.description ||
                      "Download my resume to learn more about my experience, skills, and achievements."}
                  </p>
                </div>

                <div className="flex items-center justify-center md:justify-end">
                  <Button
                    className="bg-accent hover:bg-accent/90 text-accent-foreground font-medium px-7 py-3 rounded-full shadow-medium transform transition-all duration-300 hover:-translate-y-0.5 hover:shadow-medium"
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
                  >
                    <Download className="h-4 w-4 mr-2" />
                    View & Download Resume
                  </Button>
                </div>
              </div>
            </div>
          </div>
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
        </Dialog> */}

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <h3 className="text-2xl font-serif font-semibold text-primary mb-6">
              {aboutData?.journey.heading || 'My Journey'}
            </h3>
            <p className="text-foreground leading-relaxed">
              {aboutData?.journey.description ||
                "What started as a simple interest in technology has evolved into a journey of constant learning, building, and innovation. I strive to create solutions that are not only functional but also meaningful."}
            </p>
          </div>

          <div className="animate-scale-in space-y-6" style={{ animationDelay: '0.4s' }}>
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

        <div className="mb-8 text-center md:text-left">
          <h3 className="text-2xl font-serif font-semibold text-primary">Skills</h3>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill, index) => {
            const IconComponent = iconComponents[skill.icon.toLowerCase()] || Code;
            return (
              <Card
                key={`${skill.name}-${index}`}
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