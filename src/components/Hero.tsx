import { Button } from "@/components/ui/button";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";

const Hero = () => {
  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-secondary relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fade-in-up">
        <div className="mb-8">
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-primary mb-4">
            Sona K
          </h1>
          <h2 className="text-xl md:text-2xl text-muted-foreground mb-6">
            Creative Web Developer
          </h2>
          <p className="text-lg text-foreground max-w-2xl mx-auto leading-relaxed">
            I craft beautiful, functional digital experiences that bring ideas to life. 
            Specializing in modern web technologies with a passion for clean design and seamless user interactions.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-12">
          <Button
            onClick={() => scrollToSection("portfolio")}
            className="bg-accent hover:bg-accent/90 text-accent-foreground font-medium px-8 py-3 rounded-full shadow-medium"
          >
            View My Work
          </Button>
          <Button
            variant="outline"
            onClick={() => scrollToSection("contact")}
            className="border-accent text-accent hover:bg-accent hover:text-accent-foreground px-8 py-3 rounded-full"
          >
            Get In Touch
          </Button>
        </div>

        <div className="flex justify-center space-x-6">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-accent transition-colors duration-200"
          >
            <Github className="h-6 w-6" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-accent transition-colors duration-200"
          >
            <Linkedin className="h-6 w-6" />
          </a>
          <a
            href="mailto:sona@example.com"
            className="text-muted-foreground hover:text-accent transition-colors duration-200"
          >
            <Mail className="h-6 w-6" />
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <button
          onClick={() => scrollToSection("about")}
          className="text-muted-foreground hover:text-accent transition-colors duration-200"
        >
          <ArrowDown className="h-6 w-6" />
        </button>
      </div>
    </section>
  );
};

export default Hero;