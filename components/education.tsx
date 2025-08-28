import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GraduationCap, Trophy, Calendar } from "lucide-react"

export function Education() {
  const achievements = [
    {
      title: "Mr. Corporate at GU campus",
      type: "Leadership Award",
      icon: Trophy,
    },
    {
      title: "Runner-up in HealthTech Hackathon",
      type: "July 2017",
      icon: Trophy,
    },
    {
      title: "Winner in Impromptu Speech Competition",
      type: "September 2016",
      icon: Trophy,
    },
  ]

  return (
    <section id="education" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-800 mb-4">Education & Achievements</h2>
          <p className="text-xl text-slate-600">Academic background and notable accomplishments</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Education */}
          <Card className="bg-white/70 backdrop-blur-sm border-slate-200 hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mr-4">
                  <GraduationCap className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <CardTitle className="text-xl text-slate-800">Bachelor of Technology</CardTitle>
                  <p className="text-blue-600 font-semibold">Galgotias University</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center text-slate-600">
                  <Calendar className="h-4 w-4 mr-2" />
                  July 2015 - May 2019
                </div>
                <p className="text-slate-700">
                  <span className="font-semibold">Major:</span> Mechanical Engineering
                </p>
              
                <Badge className="bg-green-100 text-green-700">Engineering Graduate</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card className="bg-white/70 backdrop-blur-sm border-slate-200 hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-xl text-slate-800 flex items-center">
                <Trophy className="h-6 w-6 text-yellow-600 mr-3" />
                Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-slate-50">
                    <achievement.icon className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-slate-800">{achievement.title}</h4>
                      <p className="text-sm text-slate-600">{achievement.type}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
