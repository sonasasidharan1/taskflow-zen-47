import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Award, Calendar } from "lucide-react";

const Education = () => {
  const education = [
    {
      degree: "Master of Science in Computer Science",
      institution: "Stanford University",
      year: "2018 - 2020",
      gpa: "3.9/4.0",
      achievements: ["Dean's List", "Research Assistant", "Machine Learning Specialization"],
      description: "Focused on advanced algorithms, machine learning, and web technologies. Completed thesis on 'Optimizing Web Performance using AI-driven Techniques'."
    },
    {
      degree: "Bachelor of Science in Computer Engineering",
      institution: "University of California, Berkeley",
      year: "2014 - 2018",
      gpa: "3.8/4.0",
      achievements: ["Magna Cum Laude", "Programming Club President", "Hackathon Winner"],
      description: "Comprehensive study of computer systems, programming, and software engineering principles. Active participant in coding competitions and open-source projects."
    }
  ];

  const certifications = [
    {
      name: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      year: "2023",
      credentialId: "AWS-SA-2023-001"
    },
    {
      name: "Google Cloud Professional Developer",
      issuer: "Google Cloud",
      year: "2022",
      credentialId: "GCP-PD-2022-045"
    },
    {
      name: "React Advanced Certification",
      issuer: "React Training",
      year: "2021",
      credentialId: "RT-ADV-2021-078"
    }
  ];

  return (
    <section id="education" className="py-20 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6">
            Education & Certifications
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            My academic journey and professional certifications that have shaped my expertise in web development and technology.
          </p>
        </div>

        {/* Education */}
        <div className="mb-16">
          <h3 className="text-2xl font-serif font-semibold text-primary mb-8 flex items-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <GraduationCap className="h-6 w-6 mr-3 text-accent" />
            Education
          </h3>
          <div className="space-y-8">
            {education.map((edu, index) => (
              <Card 
                key={index} 
                className="shadow-soft hover:shadow-medium transition-all duration-500 animate-fade-in hover-scale group"
                style={{ animationDelay: `${0.3 + index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                    <div className="flex-1">
                      <h4 className="text-xl font-semibold text-primary mb-2 group-hover:text-accent transition-colors duration-300">
                        {edu.degree}
                      </h4>
                      <p className="text-accent font-medium mb-1">{edu.institution}</p>
                      <div className="flex items-center text-muted-foreground mb-2">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>{edu.year}</span>
                        <span className="mx-3">•</span>
                        <span>GPA: {edu.gpa}</span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-foreground leading-relaxed mb-4">
                    {edu.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {edu.achievements.map((achievement, achievementIndex) => (
                      <span
                        key={achievementIndex}
                        className="px-3 py-1 text-xs font-medium bg-accent/10 text-accent rounded-full transition-all duration-300 hover:bg-accent/20 hover:scale-105"
                      >
                        {achievement}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div>
          <h3 className="text-2xl font-serif font-semibold text-primary mb-8 flex items-center animate-fade-in" style={{ animationDelay: '0.5s' }}>
            <Award className="h-6 w-6 mr-3 text-accent" />
            Professional Certifications
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <Card 
                key={index} 
                className="shadow-soft hover:shadow-medium transition-all duration-500 animate-fade-in hover-scale group text-center"
                style={{ animationDelay: `${0.6 + index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <div className="flex justify-center mb-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center group-hover:bg-accent/20 transition-colors duration-300">
                      <Award className="h-6 w-6 text-accent" />
                    </div>
                  </div>
                  <h4 className="text-lg font-semibold text-primary mb-2 group-hover:text-accent transition-colors duration-300">
                    {cert.name}
                  </h4>
                  <p className="text-accent font-medium mb-1">{cert.issuer}</p>
                  <p className="text-sm text-muted-foreground mb-2">{cert.year}</p>
                  <p className="text-xs text-muted-foreground">
                    ID: {cert.credentialId}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;