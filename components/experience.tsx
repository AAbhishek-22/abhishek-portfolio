import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin } from "lucide-react"

export function Experience() {
  const experiences = [
    {
      company: "Appiness Interactive",
      position: "Software Developer",
      duration: "Aug 2024 - Feb 2025",
      location: "Remote",
      achievements: [
        "Worked as a backend engineer on esports Gaming Application",
        "Created and Maintained multiple backend services",
        "Optimized API by optimizing database queries",
        "Fixed existing bugs to give a fault tolerant system",
        "Worked on microservice architecture to ensure scalability for high loads",
      ],
      technologies: ["Node.js", "Microservices", "Database Optimization", "API Development"],
    },
    {
      company: "TravelOMedia",
      position: "Node.js Developer",
      duration: "Aug 2023 - Jun 2024",
      location: "Remote",
      achievements: [
        "Worked as a BE developer on multiple projects, adding value by implementing business logic and APIs",
        "Developed backend of projects from the scratch single-handedly",
        "Contributed to the development of a scalable application for authentication and JWT token validation",
        "Deployed applications on Amazon EC2 instances, App Runner, Render, Vercel",
        "Implemented CI/CD pipeline automation for streamlined deployment processes",
        "Rewrite and redesigned shift whole application to the Express.js framework",
        "Built an ecommerce application single-handedly and deployed on EC2",
      ],
      technologies: ["Node.js", "Express.js", "AWS EC2", "JWT", "CI/CD", "E-commerce"],
    },
    {
      company: "Hardcipher",
      position: "Node.js Developer",
      duration: "Apr 2022 - July 2023",
      location: "Remote",
      achievements: [
        "Worked as a BE developer on web applications, DB design, building the backend",
        "Refactored existing applications and optimized database queries for improved performance",
        "Contributed to the development of scalable Microservice Architecture projects",
        "Gathering requirements and implement all business logic, create Rest APIs",
        "Design and developed career and admin module implement the business logic",
        "Provided technical guidance and mentorship to junior team members",
        "Fixed bugs, improved the logics and implementations",
      ],
      technologies: ["Node.js", "Microservices", "REST APIs", "Database Design", "Mentoring"],
    },
    {
      company: "Janbask",
      position: "Software Engineer",
      duration: "Feb 2021 - Mar 2022",
      location: "Remote",
      achievements: [
        "Worked on edutech and eCommerce domain",
        "Worked on projects with team coordination and collaborated with different team members",
        "Worked on web application, designed and built MVC architecture",
        "Redesigned and refactored APIs and Modules to improve performance",
        "Worked on Agile Methodologies to streamline project workflows",
      ],
      technologies: ["Node.js", "MVC Architecture", "Agile", "E-commerce", "EdTech"],
    },
  ]

  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-800 mb-4">Experience</h2>
          <p className="text-xl text-slate-600">
            4+ years of professional development experience across various domains
          </p>
        </div>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <Card
              key={index}
              className="bg-white/70 backdrop-blur-sm border-slate-200 hover:shadow-lg transition-all duration-300"
            >
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <CardTitle className="text-xl text-slate-800">{exp.position}</CardTitle>
                    <p className="text-lg font-semibold text-blue-600 mt-1">{exp.company}</p>
                  </div>
                  <div className="flex flex-col md:items-end mt-2 md:mt-0">
                    <div className="flex items-center text-slate-600 mb-1">
                      <Calendar className="h-4 w-4 mr-2" />
                      {exp.duration}
                    </div>
                    <div className="flex items-center text-slate-600">
                      <MapPin className="h-4 w-4 mr-2" />
                      {exp.location}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-4">
                  {exp.achievements.map((achievement, i) => (
                    <li key={i} className="text-slate-600 flex items-start">
                      <span className="text-blue-600 mr-2 mt-1.5">•</span>
                      {achievement}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech, i) => (
                    <Badge key={i} variant="secondary" className="bg-blue-100 text-blue-700">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
