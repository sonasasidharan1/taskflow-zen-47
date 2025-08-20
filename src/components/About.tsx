import { Card, CardContent } from "@/components/ui/card";
import { Code, Palette, Zap } from "lucide-react";

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

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div className="animate-fade-in-up">
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
          
          <div className="animate-scale-in">
            <div className="bg-gradient-primary rounded-lg p-8 text-center shadow-medium">
              <div className="text-4xl font-bold text-accent-foreground mb-2">50+</div>
              <div className="text-accent-foreground/80 mb-4">Projects Completed</div>
              <div className="text-4xl font-bold text-accent-foreground mb-2">5+</div>
              <div className="text-accent-foreground/80 mb-4">Years Experience</div>
              <div className="text-4xl font-bold text-accent-foreground mb-2">∞</div>
              <div className="text-accent-foreground/80">Cups of Coffee</div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {skills.map((skill, index) => (
            <Card key={index} className="shadow-soft hover:shadow-medium transition-shadow duration-300 animate-fade-in-up">
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  {skill.icon}
                </div>
                <h4 className="text-xl font-semibold text-primary mb-3">
                  {skill.title}
                </h4>
                <p className="text-muted-foreground">
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