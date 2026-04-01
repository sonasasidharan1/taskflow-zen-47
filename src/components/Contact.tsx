import { useEffect, useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { getPortfolioSectionData, ContactData } from "@/services/portfolioService";
import { FirebaseError } from "firebase/app";

const Contact = () => {
  const [contactData, setContactData] = useState<ContactData | null>(null);

  useEffect(() => {
    const fetchContactData = async () => {
      try {
        const data = await getPortfolioSectionData<ContactData>("contact");
        setContactData(data);
      } catch (err) {
        // Public pages should still render with defaults if Firestore blocks unauthenticated reads.
        if (err instanceof FirebaseError && err.code === "permission-denied") {
          setContactData(null);
        } else {
          console.error("Error fetching contact data:", err);
        }
      }
    };

    fetchContactData();
  }, []);

  const contactInfo = [
    {
      icon: <Mail className="h-5 w-5" />,
      label: "Email",
      value: contactData?.email || "sona@example.com",
      href: `mailto:${contactData?.email || "sona@example.com"}`,
    },
    {
      icon: <Phone className="h-5 w-5" />,
      label: "Phone",
      value: contactData?.phone || "+1 (555) 123-4567",
      href: `tel:${(contactData?.phone || "+1 (555) 123-4567").replace(/\s+/g, "")}`,
    },
    {
      icon: <MapPin className="h-5 w-5" />,
      label: "Location",
      value: contactData?.location || "San Francisco, CA",
      href: "#",
    },
  ];

  return (
    <section id="contact" className="py-20 bg-secondary">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6">
            {contactData?.heading || "Contact"}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {contactData?.description ||
              "Let's discuss your next project or connect for opportunities."}
          </p>
        </div>

        <div className="flex justify-center">
          {/* Contact Information */}
          <div className="animate-fade-in max-w-md">
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <div 
                  key={index} 
                  className="flex items-center space-x-4 group hover-scale transform transition-all duration-300 hover:bg-accent/5 rounded-lg p-3 cursor-pointer animate-fade-in"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center group-hover:bg-accent/20 transition-colors duration-300 group-hover:scale-110 transform">
                    <div className="text-accent group-hover:scale-110 transition-transform duration-300">
                      {info.icon}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground group-hover:text-accent transition-colors duration-300">{info.label}</div>
                    {info.href !== "#" ? (
                      <a 
                        href={info.href}
                        className="text-foreground hover:text-accent transition-colors duration-300 group-hover:text-accent"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <div className="text-foreground group-hover:text-accent transition-colors duration-300">{info.value}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;