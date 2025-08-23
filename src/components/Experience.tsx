import { Card, CardContent } from "@/components/ui/card";
import { Building2, Calendar, MapPin, ChevronRight } from "lucide-react";

const Experience = () => {
  const experiences = [
    {
      position: "Senior Frontend Developer",
      company: "TechCorp Solutions",
      location: "San Francisco, CA",
      period: "2022 - Present",
      type: "Full-time",
      description: "Leading the development of enterprise-level web applications using React, TypeScript, and modern web technologies. Responsible for architecting scalable frontend solutions and mentoring junior developers.",
      achievements: [
        "Increased application performance by 40% through code optimization and lazy loading",
        "Led a team of 5 developers in building a complex dashboard for 10,000+ users",
        "Implemented automated testing reducing bugs by 60%",
        "Mentored 3 junior developers, helping them advance their careers"
      ],
      technologies: ["React", "TypeScript", "Next.js", "Tailwind CSS", "GraphQL", "Jest", "Cypress"]
    },
    {
      position: "Frontend Developer",
      company: "Digital Innovations Inc.",
      location: "San Francisco, CA",
      period: "2020 - 2022",
      type: "Full-time",
      description: "Developed responsive web applications for various clients including e-commerce platforms, corporate websites, and web applications. Collaborated closely with designers and backend developers.",
      achievements: [
        "Built 15+ responsive websites from scratch using React and Vue.js",
        "Improved user engagement by 35% through better UX design implementation",
        "Integrated payment systems and third-party APIs for e-commerce solutions",
        "Reduced development time by 25% by creating reusable component libraries"
      ],
      technologies: ["React", "Vue.js", "JavaScript", "SCSS", "Node.js", "MongoDB", "Stripe API"]
    },
    {
      position: "Junior Web Developer",
      company: "StartupXYZ",
      location: "Berkeley, CA",
      period: "2019 - 2020",
      type: "Full-time",
      description: "Started my professional journey building web applications and learning modern development practices. Worked on both frontend and backend development in a fast-paced startup environment.",
      achievements: [
        "Developed and maintained 5 client websites using HTML, CSS, and JavaScript",
        "Assisted in migrating legacy PHP applications to modern React-based solutions",
        "Implemented responsive design principles improving mobile user experience",
        "Contributed to open-source projects and company's technical blog"
      ],
      technologies: ["HTML5", "CSS3", "JavaScript", "PHP", "MySQL", "Bootstrap", "Git"]
    },
    {
      position: "Web Development Intern",
      company: "Creative Agency Co.",
      location: "San Francisco, CA",
      period: "Summer 2018",
      type: "Internship",
      description: "Summer internship focused on learning web development fundamentals and working on real client projects under supervision of senior developers.",
      achievements: [
        "Completed 3 client projects including portfolio websites and landing pages",
        "Learned version control using Git and collaborative development practices",
        "Gained experience in client communication and project management",
        "Received offer for full-time position upon graduation"
      ],
      technologies: ["HTML", "CSS", "JavaScript", "jQuery", "WordPress", "Photoshop"]
    }
  ];

  return (
    <section id="experience" className="py-20 bg-secondary">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6">
            Professional Experience
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            My professional journey in web development, showcasing growth, achievements, and the impact I've made at each organization.
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-accent/20"></div>

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div 
                key={index}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                } animate-fade-in`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Timeline dot */}
                <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-accent rounded-full border-4 border-background shadow-lg z-10"></div>

                <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'} ml-12 md:ml-0`}>
                  <Card className="shadow-soft hover:shadow-medium transition-all duration-500 hover-scale group">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-primary mb-1 group-hover:text-accent transition-colors duration-300">
                            {exp.position}
                          </h3>
                          <div className="flex items-center text-accent font-medium mb-2">
                            <Building2 className="h-4 w-4 mr-2" />
                            {exp.company}
                          </div>
                          <div className="flex flex-col sm:flex-row sm:items-center text-sm text-muted-foreground mb-3 space-y-1 sm:space-y-0 sm:space-x-4">
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              {exp.period}
                            </div>
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 mr-1" />
                              {exp.location}
                            </div>
                            <span className="px-2 py-1 text-xs bg-accent/10 text-accent rounded-full">
                              {exp.type}
                            </span>
                          </div>
                        </div>
                      </div>

                      <p className="text-foreground leading-relaxed mb-4">
                        {exp.description}
                      </p>

                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-primary mb-2">Key Achievements:</h4>
                        <ul className="space-y-1">
                          {exp.achievements.map((achievement, achievementIndex) => (
                            <li key={achievementIndex} className="flex items-start text-sm text-muted-foreground">
                              <ChevronRight className="h-3 w-3 mt-0.5 mr-2 text-accent flex-shrink-0" />
                              <span className="group-hover:text-foreground transition-colors duration-300">
                                {achievement}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold text-primary mb-2">Technologies Used:</h4>
                        <div className="flex flex-wrap gap-2">
                          {exp.technologies.map((tech, techIndex) => (
                            <span
                              key={techIndex}
                              className="px-2 py-1 text-xs font-medium bg-accent/10 text-accent rounded-full transition-all duration-300 hover:bg-accent/20 hover:scale-105"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;