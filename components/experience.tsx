import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin } from "lucide-react"

export function Experience() {
  const experiences = [
    {
      company: "Programming.com",
      position: "Software Developer",
      duration: "Apr 2025 - Present",
      location: "Bangalore",
      achievements: [
        "Worked as a Backend Engineer on designing and implementing a scalable, event-driven microservices architecture in the e-commerce domain",
        "Implemented Kafka for real-time data synchronization across distributed systems (e.g., DY data sync and Kapture data sync)",
        "Integrated AppsFlyer Data Locker for marketing campaign analytics and attribution tracking, ensuring accurate campaign performance insights",
        "Built cron jobs for automated data sync and updates, improving consistency and reliability",
      ],
      technologies: ["Node.js", "Kafka", "Microservices", "Event-Driven Architecture", "AppsFlyer", "E-commerce"],
    },
    {
      company: "Appiness Interactive",
      position: "Software Developer",
      duration: "Aug 2024 - Feb 2025",
      location: "Remote",
      achievements: [
        "Developed and maintained backend services for a real-time eSports gaming application, leaderboard systems, and performance optimization",
        "Improved and maintained multiple backend services",
        "Optimized API by optimizing database queries",
        "Fixed existing bugs to give a fault-tolerant system",
        "Worked on microservice architecture to ensure scalability for high loads",
      ],
      technologies: ["Node.js", "Microservices", "Database Optimization", "API Development", "eSports"],
    },
    {
      company: "TravelOMedia",
      position: "Nodejs Developer",
      duration: "Aug 2023 - Jun 2024",
      location: "Hybrid",
      achievements: [
        "Worked as a BE developer on multiple projects, adding value by implementing business logic and APIs",
        "Single-handedly architected and developed the MVP backend of a fintech platform using Go, including API design, database integration, and core business logic",
        "Contributed to the development of a scalable application for authentication and JWT token validation, and created a CRM security profile",
        "Deployed applications on Amazon EC2 instances, App Runner, other hosting providers, Render, Vercel, and implemented CI/CD pipeline automation for streamlined deployment processes",
        "Rewrote and redesigned the whole application to the ExpressJS framework",
        "Built an e-commerce site single-handedly, all server-side code, and deployed on EC2",
      ],
      technologies: ["Node.js", "Go", "Express.js", "AWS EC2", "JWT", "CI/CD", "E-commerce", "Fintech"],
    },
    {
      company: "Hardcipher",
      position: "Nodejs Developer",
      duration: "Feb 2021 - July 2023",
      location: "Remote",
      achievements: [
        "Worked as a BE developer on a web application, DB design, and building the backend",
        "Refactored the existing application and optimized database queries for improved performance and reduced memory usage",
        "Contributed to the development of scalable Microservice Architecture projects, where I was responsible for BE and DB design, development, and maintenance",
        "Gathering requirements and implementing all business logic, Rest APIs in Golang, and test them",
        "Designed and developed a career and admin module to implement the business logic",
        "Collaborated with the front-end team to implement the latest development",
        "Provided technical guidance and mentorship to junior team members, fostering their professional growth and development",
        "Fixes bugs, improves the logic and implementations",
        "Designed and developed backend multiple MVC architecture projects with team coordination and collaborated with different team members",
        "Redesigned and refactored a number of APIs and Modules to improve performance",
      ],
      technologies: ["Node.js", "Go", "Microservices", "REST APIs", "Database Design", "Mentoring", "MVC Architecture"],
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
