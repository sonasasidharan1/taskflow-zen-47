import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Code, Palette, Zap, Download } from "lucide-react";

const About = () => {
  const skills = [
    {
      icon: <Code className="h-8 w-8 text-accent" />,
      title: "Frontend Development",
      description: "Expert in React, TypeScript, and modern web technologies"
    },
    {
      icon: <Palette className="h-8 w-8 text-accent" />,
      title: "UI/UX Design",
      description: "Creating intuitive and beautiful user experiences"
    },
    {
      icon: <Zap className="h-8 w-8 text-accent" />,
      title: "Performance",
      description: "Optimizing for speed and exceptional user experience"
    }
  ];

  return (
    <section id="about" className="py-20 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6">
            About Me
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            I'm a passionate web developer with over 5 years of experience creating digital experiences 
            that are not only functional but also beautiful and intuitive. I believe in the power of 
            clean code, thoughtful design, and continuous learning.
          </p>
        </div>

        {/* Download CV Section */}
        <div className="text-center mb-16 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <div className="bg-gradient-primary rounded-lg p-8 shadow-medium hover:shadow-lg transition-all duration-300">
            <h3 className="text-2xl font-serif font-semibold text-accent-foreground mb-4">
              Interested in Working Together?
            </h3>
            <p className="text-accent-foreground/80 mb-6 max-w-2xl mx-auto">
              Download my resume to learn more about my experience, skills, and achievements. 
              Let's discuss how I can contribute to your next project.
            </p>
            <Button
              className="bg-background/20 hover:bg-background/30 text-accent-foreground border border-accent-foreground/20 hover:border-accent-foreground/40 font-medium px-8 py-3 rounded-full shadow-medium hover-scale transform transition-all duration-300"
              onClick={() => {
                // In a real application, this would download an actual CV file
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
              My Journey
            </h3>
            <p className="text-foreground leading-relaxed mb-4">
              My journey in web development started with a curiosity about how websites work. 
              What began as a hobby quickly turned into a passion, and now I specialize in 
              creating modern, responsive web applications.
            </p>
            <p className="text-foreground leading-relaxed">
              I love working with cutting-edge technologies and am always eager to learn new tools 
              and frameworks. When I'm not coding, you can find me exploring design trends, 
              contributing to open-source projects, or sharing knowledge with the developer community.
            </p>
          </div>
          
          <div className="animate-scale-in" style={{ animationDelay: '0.4s' }}>
            <div className="bg-gradient-primary rounded-lg p-8 text-center shadow-medium hover:shadow-lg transform transition-all duration-300 hover-scale">
              <div className="space-y-6">
                <div className="transform transition-transform duration-300 hover:scale-110">
                  <div className="text-4xl font-bold text-accent-foreground mb-2">50+</div>
                  <div className="text-accent-foreground/80">Projects Completed</div>
                </div>
                <div className="transform transition-transform duration-300 hover:scale-110">
                  <div className="text-4xl font-bold text-accent-foreground mb-2">5+</div>
                  <div className="text-accent-foreground/80">Years Experience</div>
                </div>
                <div className="transform transition-transform duration-300 hover:scale-110">
                  <div className="text-4xl font-bold text-accent-foreground mb-2">∞</div>
                  <div className="text-accent-foreground/80">Cups of Coffee</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {skills.map((skill, index) => (
            <Card 
              key={index} 
              className="shadow-soft hover:shadow-medium transition-all duration-500 animate-fade-in hover-scale group cursor-pointer"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-4 transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
                  {skill.icon}
                </div>
                <h4 className="text-xl font-semibold text-primary mb-3 group-hover:text-accent transition-colors duration-300">
                  {skill.title}
                </h4>
                <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                  {skill.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;