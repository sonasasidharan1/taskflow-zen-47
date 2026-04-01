import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Award, Calendar } from "lucide-react";
import { FirebaseError } from "firebase/app";
import { EducationData, getPortfolioSectionData } from "@/services/portfolioService";

type NormalizedEducationItem = {
  degree: string;
  institution: string;
  year: string;
  gpa: string;
  description: string;
  achievements: string[];
};

const normalizeEducationData = (raw: any): EducationData | null => {
  if (!raw || typeof raw !== "object") return null;

  const fromEducation = Array.isArray(raw.education) ? raw.education : [];
  const fromDegrees = Array.isArray(raw.degrees) ? raw.degrees : [];

  const education: NormalizedEducationItem[] = (fromEducation.length ? fromEducation : fromDegrees).map(
    (item: any) => ({
      degree: item?.degree ?? "",
      institution: item?.institution ?? item?.university ?? "",
      year: item?.year ?? item?.period ?? "",
      gpa: item?.gpa ?? "",
      description: item?.description ?? "",
      achievements: Array.isArray(item?.achievements) ? item.achievements : [],
    })
  );

  const certifications = Array.isArray(raw.certifications) ? raw.certifications : [];

  return {
    heading: raw.heading ?? "Education & Certifications",
    description: raw.description ?? "",
    education,
    certifications,
  };
};

const Education = () => {
  const [educationData, setEducationData] = useState<EducationData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEducationData = async () => {
      try {
        const data = await getPortfolioSectionData<any>("education");
        setEducationData(normalizeEducationData(data));
      } catch (err) {
        if (err instanceof FirebaseError && err.code === "permission-denied") {
          setEducationData(null);
        } else {
          console.error("Error fetching education data:", err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchEducationData();
  }, []);

  const heading = educationData?.heading?.trim() || "Education & Certifications";
  const description = educationData
    ? educationData.description?.trim() ?? ""
    : "Add your education and certifications in the admin dashboard; they load from Firestore.";
  const education = educationData?.education ?? [];
  const certifications = educationData?.certifications ?? [];

  if (loading) {
    return (
      <section id="education" className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-4 text-center text-muted-foreground">
          Loading education…
        </div>
      </section>
    );
  }

  return (
    <section id="education" className="py-20 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6">
            {heading}
          </h2>
          {description ? (
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {description}
            </p>
          ) : null}
        </div>

        {/* Education */}
        <div className="mb-16">
          <h3 className="text-2xl font-serif font-semibold text-primary mb-8 flex items-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <GraduationCap className="h-6 w-6 mr-3 text-accent" />
            Education
          </h3>
          <div className="space-y-8">
            {education.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">
                No education entries yet. Sign in to the dashboard and save the Education tab.
              </p>
            ) : null}
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
            {certifications.length === 0 ? (
              <p className="text-muted-foreground text-center py-8 md:col-span-2 lg:col-span-3">
                No certifications yet.
              </p>
            ) : null}
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