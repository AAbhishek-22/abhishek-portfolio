import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, Phone, MapPin, Github, Linkedin } from "lucide-react"

export function Contact() {
  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "kumarabhishek0947@gmail.com",
      href: "mailto:kumarabhishek0947@gmail.com",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+91-9871948174",
      href: "tel:+919871948174",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "India",
      href: "#",
    },
  ]

  const socialLinks = [
    {
      icon: Github,
      label: "GitHub",
      href: "#",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "#",
    },
  ]

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-800 mb-4">Get In Touch</h2>
          <p className="text-xl text-slate-600">
            Ready to collaborate on your next project? Let's discuss how I can help bring your ideas to life.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Information */}
          <Card className="bg-white/70 backdrop-blur-sm border-slate-200">
            <CardHeader>
              <CardTitle className="text-xl text-slate-800">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {contactInfo.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-50 transition-colors duration-200"
                >
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                    <item.icon className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800">{item.label}</p>
                    <p className="text-slate-600">{item.value}</p>
                  </div>
                </a>
              ))}
            </CardContent>
          </Card>

          {/* Call to Action */}
          <Card className="bg-white/70 backdrop-blur-sm border-slate-200">
            <CardHeader>
              <CardTitle className="text-xl text-slate-800">Let's Work Together</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-slate-600">
                I'm always interested in new opportunities and exciting projects. Whether you need a backend developer,
                system architect, or technical consultant, I'd love to hear from you.
              </p>

              <div className="space-y-3">
                <Button asChild className="w-full bg-blue-600 hover:bg-blue-700">
                  <a href="mailto:kumarabhishek0947@gmail.com">
                    <Mail className="h-4 w-4 mr-2" />
                    Send Email
                  </a>
                </Button>

                <Button variant="outline" asChild className="w-full">
                  <a href="tel:+919871948174">
                    <Phone className="h-4 w-4 mr-2" />
                    Call Now
                  </a>
                </Button>
              </div>

              <div className="flex justify-center space-x-4 pt-4">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    className="w-10 h-10 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors duration-200"
                  >
                    <link.icon className="h-5 w-5 text-slate-600" />
                  </a>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center mt-16 pt-8 border-t border-slate-200">
          <p className="text-slate-600">© 2025 Abhishek Kumar. Built with Next.js and Tailwind CSS.</p>
        </div>
      </div>
    </section>
  )
}
