import { Card, CardContent } from "@/components/ui/card"
import { Code, Database, Cloud, Zap } from "lucide-react"

export function About() {
  const highlights = [
    {
      icon: Code,
      title: "Backend Development",
      description: "Expert in Node.js, Express.js, and modern JavaScript frameworks",
    },
    {
      icon: Database,
      title: "Database Design",
      description: "Proficient in MongoDB, PostgreSQL, and database optimization",
    },
    {
      icon: Cloud,
      title: "Cloud & DevOps",
      description: "AWS services, CI/CD pipelines, and containerization with Docker",
    },
    {
      icon: Zap,
      title: "Performance",
      description: "Microservices architecture and high-performance API development",
    },
  ]

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-800 mb-4">About Me</h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Passionate Node.js developer with 4 years of experience building scalable backend systems, microservices,
            and high-performance applications. I specialize in creating robust APIs and optimizing database performance
            for enterprise-level applications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item, index) => (
            <Card
              key={index}
              className="bg-white/70 backdrop-blur-sm border-slate-200 hover:shadow-lg transition-all duration-300"
            >
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-blue-100 flex items-center justify-center">
                  <item.icon className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">{item.title}</h3>
                <p className="text-slate-600 text-sm">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
