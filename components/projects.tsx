import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Github, ExternalLink } from "lucide-react"

export function Projects() {
  const projects = [
    {
      title: "Product Management & E-commerce",
      description:
        "The project has 4 features: User, Product, Order, and Cart. Users can create accounts, add products to cart, and place orders like Flipkart and Amazon.",
      technologies: ["JavaScript", "Node.js", "Express.js", "MongoDB", "JWT", "middleware", "AWS S3"],
      features: ["User Management", "Product Management", "Shopping Cart", "Order Processing"],
      githubUrl: "#",
    },
    {
      title: "GETYOLO - Student Credit Card",
      description:
        "This is a fintech project that provides a credit card to college students.",
      technologies: ["Go (Golang)", "Gin", "MongoDB", "Redis"],
      features: ["Credit Card Services", "Student Verification", "Financial Services", "Secure Transactions"],
      githubUrl: "#",
    },
    {
      title: "Fanclash Classic MMF/Switch Fantasy - Esports & Fantasy Gaming",
      description:
        "The project is an esports gaming application based on real-life events in different sports segments.",
      technologies: ["NodeJS", "MongoDB", "JavaScript", "Typescript", "Sails", "ExpressJS", "JWT", "Kafka", "middleware", "AWS S3"],
      features: ["Real-time Gaming", "Fantasy Sports", "Event Management", "Scalable Architecture"],
      githubUrl: "#",
    },
    {
      title: "Tira Beauty (Reliance Retail) - E-Commerce & Beauty Platform",
      description:
        "This is an omnichannel beauty e-commerce platform — Tira Beauty — designed to manage large-scale product catalogs, seamless order processing, and unified online-offline shopping experiences.",
      technologies: ["JavaScript", "Node.js", "Express.js", "MongoDB", "Kafka", "Redis"],
      features: [
        "Omnichannel E-commerce",
        "Large-scale Product Catalog",
        "Order Processing",
        "Online-Offline Integration"
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
