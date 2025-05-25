import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Github, ExternalLink } from "lucide-react"

export function Projects() {
  const projects = [
    {
      title: "Product Management & E-commerce",
      description:
        "Full-featured e-commerce platform with user management, product catalog, shopping cart, and order processing. Built with modern backend architecture similar to Flipkart and Amazon.",
      technologies: ["JavaScript", "Node.js", "Express.js", "MongoDB", "JWT", "AWS S3"],
      features: ["User Authentication", "Product Management", "Shopping Cart", "Order Processing"],
      githubUrl: "#",
    },
    {
      title: "CAN-Platform",
      description:
        "A dedicated social community platform designed for cancer patients and survivors to share experiences, provide mutual support, and connect with healthcare professionals.",
      technologies: ["Node.js", "NestJS", "TypeScript", "MongoDB"],
      features: ["Social Community", "Healthcare Integration", "Support System", "User Profiles"],
      githubUrl: "#",
    },
    {
      title: "GETYOLO - Student Credit Card",
      description:
        "Fintech platform that provides credit card services specifically designed for college students, with tailored features and approval processes.",
      technologies: ["Node.js", "NestJS", "TypeScript", "MongoDB"],
      features: ["Credit Assessment", "Student Verification", "Financial Services", "Secure Transactions"],
      githubUrl: "#",
    },
    {
      title: "Fanclash Classic MMF/Switch Fantasy",
      description:
        "Esports gaming application based on real-life events across different sports segments. Features fantasy gaming, real-time updates, and competitive gameplay.",
      technologies: ["Node.js", "MongoDB", "JavaScript", "TypeScript", "Sails.js", "Express.js", "Kafka", "AWS S3"],
      features: ["Real-time Gaming", "Fantasy Sports", "Event Management", "Scalable Architecture"],
      githubUrl: "#",
    },
    {
      title: "ManagESG - Sustainability Management Platform",
      description:
        "A cloud-based ESG (Environmental, Social, Governance) platform designed to help organizations track sustainability KPIs, manage documentation, integrate third-party APIs, and generate AI-driven reports aligned with global standards like GRESB, ISSB, and CSRD.",
      technologies: ["Node.js", "TypeScript", "Express.js", "MongoDB", "AWS S3", "GitLab"],
      features: [
        "ESG KPI Tracking",
        "Document Upload & Management",
        "AI-Powered Due Diligence",
        "Third-Party API Integration",
        "Role-Based Access Control",
        "GDPR Compliance",
        "Cloud Deployment (AWS/Azure)"
      ],
      githubUrl: "#"
    }
    
  ]

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-800 mb-4">Featured Projects</h2>
          <p className="text-xl text-slate-600">
            Showcasing some of my best work in backend development and system architecture
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Card
              key={index}
              className="bg-white/70 backdrop-blur-sm border-slate-200 hover:shadow-lg transition-all duration-300"
            >
              <CardHeader>
                <CardTitle className="text-xl text-slate-800">{project.title}</CardTitle>
                <p className="text-slate-600">{project.description}</p>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <h4 className="font-semibold text-slate-700 mb-2">Key Features:</h4>
                  <ul className="grid grid-cols-2 gap-1">
                    {project.features.map((feature, i) => (
                      <li key={i} className="text-sm text-slate-600 flex items-center">
                        <span className="text-blue-600 mr-2">•</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-slate-700 mb-2">Technologies:</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, i) => (
                      <Badge key={i} variant="secondary" className="bg-blue-100 text-blue-700 text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button size="sm" variant="outline" asChild>
                    <a href={project.githubUrl} className="flex items-center">
                      <Github className="h-4 w-4 mr-2" />
                      Code
                    </a>
                  </Button>
                  <Button size="sm" asChild>
                    <a href="#" className="flex items-center">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Demo
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
