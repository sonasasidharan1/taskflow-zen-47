import { useEffect, useMemo, useState } from "react";
import { Github, Linkedin, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { getPortfolioSectionData, ContactData } from "@/services/portfolioService";
import { FirebaseError } from "firebase/app";
import QRCode from "qrcode";

const Contact = () => {
  const [contactData, setContactData] = useState<ContactData | null>(null);
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);

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

  useEffect(() => {
    const generateQr = async () => {
      try {
        // When running locally, window.location.origin will be `http://localhost:...`.
        // Scanning from another device will fail. Use VITE_SITE_URL in .env for a real domain.
        const configuredBase = import.meta.env.VITE_SITE_URL as
          | string
          | undefined;
        const baseUrl = (configuredBase ?? window.location.origin).replace(/\/$/, "");

        // We only need to jump to the Contact section, which is an in-page anchor.
        const contactAnchorUrl = `${baseUrl}#contact`;
        const dataUrl = await QRCode.toDataURL(contactAnchorUrl, {
          margin: 1,
          width: 180,
          errorCorrectionLevel: "M",
        });
        setQrDataUrl(dataUrl);
      } catch (e) {
        console.error("Failed to generate QR:", e);
      }
    };

    generateQr();
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

        <div className="grid md:grid-cols-2 gap-10 items-start">
          <div className="animate-fade-in max-w-md mx-auto md:mx-0">
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-4 group hover:scale-[1.02] transform transition-all duration-300 hover:bg-accent/5 rounded-lg p-3 cursor-pointer animate-fade-in"
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center group-hover:bg-accent/20 transition-colors duration-300 group-hover:scale-110 transform">
                    <div className="text-accent group-hover:scale-110 transition-transform duration-300">
                      {info.icon}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground group-hover:text-accent transition-colors duration-300">
                      {info.label}
                    </div>
                    {info.href !== "#" ? (
                      <a
                        href={info.href}
                        className="text-foreground hover:text-accent transition-colors duration-300 group-hover:text-accent"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <div className="text-foreground group-hover:text-accent transition-colors duration-300">
                        {info.value}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="animate-fade-in-up">
            <div className="relative mx-auto md:mx-0 h-full">
              <div className="absolute -inset-1 bg-gradient-primary opacity-30 rounded-2xl blur-md" />
              <div className="relative rounded-2xl border border-border/60 bg-card shadow-soft p-6">
                <h3 className="text-lg font-semibold text-primary mb-2">
                  Scan to open Contact
                </h3>
                <p className="text-muted-foreground mb-4">
                  QR will open this page at the Contact section (GitHub, LinkedIn, and Mail).
                </p>

                <div className="flex items-center gap-6">
                  <div className="rounded-xl bg-background/40 p-3 border border-border/60">
                    {qrDataUrl ? (
                      <img
                        src={qrDataUrl}
                        alt="Contact QR code"
                        width={180}
                        height={180}
                        className="rounded-lg"
                      />
                    ) : (
                      <div className="h-[180px] w-[180px] rounded-lg bg-accent/10 animate-pulse" />
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <div className="font-medium text-primary mb-2">Quick options</div>
                    <div className="space-y-2">
                      <a
                        href="https://github.com/sonasasidharan"
                        className="block hover:text-accent transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        GitHub
                      </a>
                      <a
                        href="https://www.linkedin.com/in/sona-k-web"
                        className="block hover:text-accent transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        LinkedIn
                      </a>
                      <a
                        href={`mailto:${contactData?.email || "sona@example.com"}`}
                        className="block hover:text-accent transition-colors"
                      >
                        Mail
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;