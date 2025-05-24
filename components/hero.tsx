import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail, Phone } from "lucide-react"

export function Hero() {
  return (
   <section id="home" className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
  <div className="max-w-4xl mx-auto text-center">
    <div className="mb-8">
      <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden shadow-xl">
        <img
          src="/abhishek.jpeg"
          alt="Abhishek Kumar"
          className="w-full h-full object-cover"
        />
      </div>
      <h1 className="text-5xl md:text-7xl font-bold text-slate-800 mb-4">Abhishek Kumar</h1>
      <p className="text-xl md:text-2xl text-slate-600 mb-2">Node.js Developer</p>
      <p className="text-lg text-slate-500 mb-8">
        4 Years of Experience • Backend Specialist • Microservices Expert
      </p>
    </div>

    <div className="flex flex-wrap justify-center gap-4 mb-8">
      <Button asChild className="bg-blue-600 hover:bg-blue-700">
        <a href="#contact">Get In Touch</a>
      </Button>
      <Button variant="outline" asChild>
        <a href="#projects">View Projects</a>
      </Button>
    </div>
  


        <div className="flex justify-center space-x-6">
          <a
            href="mailto:kumarabhishek0947@gmail.com"
            className="text-slate-600 hover:text-blue-600 transition-colors duration-200"
          >
            <Mail className="h-6 w-6" />
          </a>
          <a href="tel:+919871948174" className="text-slate-600 hover:text-blue-600 transition-colors duration-200">
            <Phone className="h-6 w-6" />
          </a>
          <a href="#" className="text-slate-600 hover:text-blue-600 transition-colors duration-200">
            <Github className="h-6 w-6" />
          </a>
          <a href="#" className="text-slate-600 hover:text-blue-600 transition-colors duration-200">
            <Linkedin className="h-6 w-6" />
          </a>
        </div>
      </div>
    </section>
  )
}
