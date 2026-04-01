import { Card, CardContent } from "@/components/ui/card";
import { Briefcase } from "lucide-react";

type ExperienceProject = {
  name: string;
  type: string;
  description: string;
};

type ExperienceItem = {
  role: string;
  company: string;
  location: string;
  period: string;
  responsibilities: string[];
  projects: ExperienceProject[];
};

const experiences: ExperienceItem[] = [
  {
    role: "Software Engineer",
    company: "Geesesquads",
    location: "Kochi, India",
    period: "Oct 2024 - Present",
    responsibilities: [
      "Developed ReactJS application.",
      "Implemented custom UI components using ReactJS.",
      "Collaborated with the design team to implement user interface elements by product requirements.",
      "Built efficient, reusable, and reliable code by utilizing best practices in software development.",
      "Utilized version control systems like Git to manage source code changes.",
    ],
    projects: [
      {
        name: "Floris 3",
        type: "Website / Blockchain platform",
        description:
          "A multi-tenant blockchain platform that empowers users to easily create and sell custom tokens. Users can compile Solidity smart contracts directly within the platform (generating ABI and bytecode) and deploy them to the blockchain. The platform also features a builder for creating and selling custom widgets. As the Technical Leader, I managed the development team, designed the project architecture, and handled task planning. The system integrates Stripe for subscription management and utilizes a robust backend infrastructure leveraging AWS (Lambda, S3, Cognito) and PostgreSQL.",
      },
      {
        name: "Skiline (Brickell Platform)",
        type: "Full-Stack Multi-Repo Platform",
        description:
          "A large-scale property/storage management platform built as a multi-repository system with both an Admin Portal and a Tenant Portal. The Admin Portal is designed for internal teams to manage tenants, leases, units, maintenance, billing, notifications, and operational configurations, while the Tenant Portal enables customers to browse facilities/units, check availability, and complete rental and account-related workflows. The frontend is built using a microfrontend architecture (host + remotes) and the backend is organized into Strapi-based domain services for core, tenant/lease, operations, and billing/finance (including payment gateway integration and webhooks). Technologies include ReactJS, TypeScript, Vite, Module Federation, React Router, Tailwind CSS, Radix UI, Yarn Workspaces, Strapi v5, Node.js, MySQL, AWS S3, AWS SQS, JWT-based auth tooling, Nodemailer, Docker/Docker Compose, ESLint, and Prettier.",
      },
      {
        name: "MAOS Perfomanze",
        type: "Web Application (Multi-Tenant HR & Operations Platform)",
        description:
          "An enterprise HR/operations management platform with multi-tenant support. It includes tenant onboarding, super-admin tenant/plan management, employee directory, onboarding/offboarding, leave and absence workflows, time tracking/timesheets, organization and role/permission configuration, client/project pipeline modules, and campaign/email template management. Technologies include ReactJS, TypeScript, Vite, React Router, Tailwind CSS, shadcn/ui (Radix UI), TanStack React Query, React Hook Form, Zod, Firebase (Auth/Firestore), Firebase Cloud Functions, Google Cloud Tasks, SendGrid, Algolia, i18next, Storybook, Vitest, ESLint, and Prettier.",
      },
      {
        name: "IPEnergy",
        type: "Full-Stack Web Platform",
        description:
          "An energy assessment and project-tracking platform where users can create projects, work through chapter-based questionnaires, submit answers, track completion progress, collaborate through comments/notes, manage files, and generate PDF outputs from collected data. The frontend provides a secure dashboard and detailed project workspace with multilingual support, while the backend exposes modular APIs for auth, users, projects, chapters, questions, answers, comments, notes, uploads, and file export/download workflows. Technologies include ReactJS, Vite, React Router, CoreUI, Tailwind CSS, i18next, Axios, Firebase Hosting, Firebase Authentication, Firebase Admin SDK, Firebase Cloud Functions (Node.js), ExpressJS, Google Cloud Functions (Python), xhtml2pdf (PDF generation), Firebase Storage, Archiver (ZIP downloads), and Chart.js.",
      },
    ],
  },
  {
    role: "MEARN Stack Developer Intern",
    company: "Luminar Technolab",
    location: "Kozhikode, India",
    period: "Oct 2023 - Apr 2024",
    responsibilities: [],
    projects: [],
  },
];

const Experience = () => {
  return (
    <section id="experience" className="py-20 bg-secondary">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6">
            Experience
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Roles, responsibilities, and selected projects from my professional work.
          </p>
        </div>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <Card
              key={`${exp.company}-${index}`}
              className="shadow-soft hover:shadow-medium transition-all duration-500 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                    <Briefcase className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-primary">{exp.role}</h3>
                    <p className="text-accent font-medium">
                      {exp.company} | {exp.location} | {exp.period}
                    </p>
                  </div>
                </div>

                {exp.responsibilities.length > 0 ? (
                  <div>
                    <p className="font-medium text-primary mb-2">Responsibilities:</p>
                    <ul className="list-disc pl-5 space-y-1 text-foreground">
                      {exp.responsibilities.map((item, itemIndex) => (
                        <li key={itemIndex}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                {exp.projects.length > 0 ? (
                  <div className="space-y-4">
                    <p className="font-medium text-primary">Projects:</p>
                    {exp.projects.map((project, projectIndex) => (
                      <div
                        key={projectIndex}
                        className="rounded-lg border border-border p-4 bg-card"
                      >
                        <p className="font-semibold text-primary">
                          {project.name}{" "}
                          <span className="text-muted-foreground font-normal">| {project.type}</span>
                        </p>
                        <p className="text-foreground mt-2 leading-relaxed">{project.description}</p>
                      </div>
                    ))}
                  </div>
                ) : null}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
