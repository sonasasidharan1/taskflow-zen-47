import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";

type Project = {
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveUrl: string;
  githubUrl?: string;
};

const Portfolio = () => {
  const projects: Project[] = [
    {
      title: "Recipe App",
      description:
        "Browse, search, and explore recipes with a clean frontend experience—deployed on Vercel.",
      image: "/portfolio-recipe.jpg",
      tags: ["React", "Vercel", "Frontend"],
      liveUrl: "https://recipe-frontend-gray.vercel.app/",
    },
    {
      title: "Task Management",
      description:
        "Organize tasks and workflows in a focused task-management UI, hosted as a live demo.",
      image: "/portfolio-task-management.jpg",
      tags: ["React", "Vercel", "Productivity"],
      liveUrl: "https://task-frontend-blush-ten.vercel.app/",
    },
    {
      title: "Media Player",
      description:
        "A web-based media player interface for playback and controls in the browser.",
      image: "/portfolio-media-player.jpg",
      tags: ["JavaScript", "Vercel", "UI"],
      liveUrl: "https://media-player-puce.vercel.app/",
    },
    {
      title: "Project Fair",
      description:
        "A project showcase / fair-style frontend for presenting work and demos.",
      image: "/portfolio-project-fair.jpg",
      tags: ["React", "Vercel", "Portfolio"],
      liveUrl: "https://project-fair-chi-eight.vercel.app/",
    },
  ];

  return (
    <section id="portfolio" className="py-16 bg-secondary">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6">
            My Portfolio
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Here are some of my recent projects that showcase my skills in web development, 
            design, and problem-solving. Each project represents a unique challenge and learning experience.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <Card 
              key={index} 
              className="group shadow-soft hover:shadow-lg transition-all duration-500 animate-fade-in overflow-hidden hover-scale transform hover:-translate-y-1 cursor-pointer will-change-transform"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-36 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center space-x-2 pointer-events-none group-hover:pointer-events-auto backdrop-blur-sm"
                >
                  <Button
                    size="sm"
                    variant="secondary"
                    asChild
                    className="shadow-medium transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300"
                    style={{ transitionDelay: '0.1s' }}
                  >
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Live Demo
                    </a>
                  </Button>
                  {project.githubUrl ? (
                    <Button
                      size="sm"
                      variant="outline"
                      asChild
                      className="bg-background/90 hover:bg-background transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 hover-scale"
                      style={{ transitionDelay: "0.2s" }}
                    >
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4 mr-2" />
                        Code
                      </a>
                    </Button>
                  ) : null}
                </div>
              </div>
              
              <CardHeader className="p-4 pb-0 group-hover:bg-accent/5 transition-colors duration-300">
                <CardTitle className="text-lg font-semibold text-primary group-hover:text-accent transition-colors duration-300 line-clamp-1">
                  {project.title}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="p-4 pt-2 group-hover:bg-accent/5 transition-colors duration-300">
                <p className="text-muted-foreground mb-3 text-sm leading-relaxed group-hover:text-foreground transition-colors duration-300 line-clamp-3">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-2.5 py-0.5 text-xs font-medium bg-accent/10 text-accent rounded-full transition-all duration-300 hover:bg-accent/20 cursor-pointer"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;