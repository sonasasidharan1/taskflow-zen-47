import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";

const Portfolio = () => {
  const projects = [
    {
      title: "E-Commerce Platform",
      description: "A modern e-commerce solution built with React and Node.js, featuring real-time inventory management and seamless payment integration.",
      image: "/placeholder.svg",
      tags: ["React", "Node.js", "MongoDB", "Stripe"],
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      title: "Task Management App",
      description: "A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
      image: "/placeholder.svg",
      tags: ["Vue.js", "Firebase", "Tailwind CSS", "PWA"],
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      title: "Portfolio Website",
      description: "A responsive portfolio website for a creative agency, featuring smooth animations and an intuitive content management system.",
      image: "/placeholder.svg",
      tags: ["Next.js", "Sanity", "Framer Motion", "TypeScript"],
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      title: "Weather Dashboard",
      description: "An interactive weather dashboard with location-based forecasts, data visualization, and weather alerts functionality.",
      image: "/placeholder.svg",
      tags: ["React", "D3.js", "Weather API", "Chart.js"],
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      title: "Social Media App",
      description: "A full-stack social media application with real-time messaging, image sharing, and advanced privacy controls.",
      image: "/placeholder.svg",
      tags: ["React Native", "GraphQL", "PostgreSQL", "AWS"],
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      title: "Learning Platform",
      description: "An online learning platform with video streaming, progress tracking, and interactive quizzes for educational content.",
      image: "/placeholder.svg",
      tags: ["Angular", "Node.js", "Socket.io", "MySQL"],
      liveUrl: "#",
      githubUrl: "#"
    }
  ];

  return (
    <section id="portfolio" className="py-20 bg-secondary">
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card 
              key={index} 
              className="group shadow-soft hover:shadow-lg transition-all duration-500 animate-fade-in overflow-hidden hover-scale transform hover:-translate-y-2 cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center space-x-4">
                  <Button
                    size="sm"
                    variant="secondary"
                    asChild
                    className="shadow-medium transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 hover-scale"
                    style={{ transitionDelay: '0.1s' }}
                  >
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Live Demo
                    </a>
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    asChild
                    className="bg-background/90 hover:bg-background transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 hover-scale"
                    style={{ transitionDelay: '0.2s' }}
                  >
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4 mr-2" />
                      Code
                    </a>
                  </Button>
                </div>
              </div>
              
              <CardHeader className="group-hover:bg-accent/5 transition-colors duration-300">
                <CardTitle className="text-xl font-semibold text-primary group-hover:text-accent transition-colors duration-300">
                  {project.title}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="pt-0 group-hover:bg-accent/5 transition-colors duration-300">
                <p className="text-muted-foreground mb-4 leading-relaxed group-hover:text-foreground transition-colors duration-300">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-3 py-1 text-xs font-medium bg-accent/10 text-accent rounded-full transition-all duration-300 hover:bg-accent/20 hover:scale-105 cursor-pointer"
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