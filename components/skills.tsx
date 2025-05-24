import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function Skills() {
  const skillCategories = [
    {
      category: "Programming Languages",
      skills: ["JavaScript", "TypeScript", "Golang", "Core Java"],
      color: "bg-blue-100 text-blue-700",
    },
    {
      category: "Backend Frameworks",
      skills: ["Node.js", "Express.js", "NestJS", "Sails.js"],
      color: "bg-green-100 text-green-700",
    },
    {
      category: "Databases",
      skills: ["MongoDB", "PostgreSQL", "DynamoDB", "Redis"],
      color: "bg-purple-100 text-purple-700",
    },
    {
      category: "Cloud & DevOps",
      skills: ["AWS S3", "AWS EC2", "AWS ECS", "Docker", "CI/CD", "Jenkins"],
      color: "bg-orange-100 text-orange-700",
    },
    {
      category: "Message Queues & APIs",
      skills: ["Kafka", "SQS", "REST APIs", "JWT", "OAuth", "Swagger"],
      color: "bg-pink-100 text-pink-700",
    },
    {
      category: "Tools & Platforms",
      skills: ["Git/GitHub/GitLab", "Postman", "Jira", "Render", "Vercel"],
      color: "bg-indigo-100 text-indigo-700",
    },
  ]

  const softSkills = ["Leadership", "Hard work", "Adaptable", "Open-mindedness"]

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-800 mb-4">Skills & Technologies</h2>
          <p className="text-xl text-slate-600">Comprehensive technical expertise across the full development stack</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {skillCategories.map((category, index) => (
            <Card
              key={index}
              className="bg-white/70 backdrop-blur-sm border-slate-200 hover:shadow-lg transition-all duration-300"
            >
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">{category.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, i) => (
                    <Badge key={i} className={category.color}>
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-white/70 backdrop-blur-sm border-slate-200">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Soft Skills</h3>
            <div className="flex flex-wrap gap-2">
              {softSkills.map((skill, i) => (
                <Badge key={i} className="bg-slate-100 text-slate-700">
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
