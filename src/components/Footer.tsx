import { Github, Linkedin, Mail, Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: "GitHub",
      href: "https://github.com",
      icon: <Github className="h-5 w-5" />
    },
    {
      name: "LinkedIn", 
      href: "https://linkedin.com",
      icon: <Linkedin className="h-5 w-5" />
    },
    {
      name: "Email",
      href: "mailto:sona@example.com",
      icon: <Mail className="h-5 w-5" />
    }
  ];

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-serif font-bold mb-4">Sona K</h3>
            <p className="text-primary-foreground/80 leading-relaxed">
              Creative web developer passionate about crafting beautiful, 
              functional digital experiences that make a difference.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <nav className="space-y-2">
              {["Home", "About", "Portfolio", "Blog", "Contact"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="block text-primary-foreground/80 hover:text-accent transition-colors duration-200"
                >
                  {item}
                </button>
              ))}
            </nav>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Connect With Me</h4>
            <div className="space-y-3 mb-6">
              <p className="text-primary-foreground/80">
                <a 
                  href="mailto:sona@example.com"
                  className="hover:text-accent transition-colors duration-200"
                >
                  sona@example.com
                </a>
              </p>
              <p className="text-primary-foreground/80">San Francisco, CA</p>
            </div>
            
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-foreground/80 hover:text-accent transition-colors duration-200"
                  aria-label={link.name}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-primary-foreground/60 text-sm mb-4 md:mb-0">
            © {currentYear} Sona K. All rights reserved.
          </p>
          <p className="text-primary-foreground/60 text-sm flex items-center">
            Made with <Heart className="h-4 w-4 mx-1 text-accent" /> and lots of coffee
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;