"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useToast } from "@/components/ui/use-toast"
import { Mail, Phone, MapPin, Github, Linkedin, Send, Loader2, CheckCircle } from "lucide-react"
import { useState } from "react"

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
})

type FormValues = z.infer<typeof formSchema>

export function Footer() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const { toast } = useToast()
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  })

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true)
    setIsSuccess(false)
    
    try {
      const response = await fetch("/api/send-resume", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to send resume");
      }
      
      // Show success toast
      toast({
        title: "Success!",
        description: "Resume has been sent to your email successfully.",
      })
      
      // Set success state
      setIsSuccess(true)
      
      // Reset form
      form.reset()
      
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to send resume. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

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
      href: "https://github.com/AAbhishek18",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/abhishek-kumar-0542ba72/",
    },
  ]

  return (
    <footer className="bg-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold mb-4">Abhishek Kumar</h3>
            <p className="text-slate-300 mb-6 max-w-md">
              Backend Developer & System Architect with expertise in building scalable, 
              high-performance applications and microservices architecture.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition-colors duration-200"
                >
                  <link.icon className="h-5 w-5 text-slate-300" />
                </a>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-3">
              {contactInfo.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="flex items-center space-x-3 text-slate-300 hover:text-white transition-colors duration-200"
                >
                  <item.icon className="h-4 w-4" />
                  <span className="text-sm">{item.value}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Resume Form */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Get My Resume</h4>
            {isSuccess ? (
              <div className="text-center py-4">
                <CheckCircle className="h-8 w-8 text-green-400 mx-auto mb-2" />
                <p className="text-sm text-green-400 mb-3">Resume Sent!</p>
                <Button 
                  onClick={() => setIsSuccess(false)}
                  variant="outline"
                  size="sm"
                  className="text-white border-slate-600 hover:bg-slate-800"
                >
                  Send Another
                </Button>
              </div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm text-slate-300">Email</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="your.email@example.com" 
                            {...field}
                            className="bg-slate-800 border-slate-600 text-white placeholder:text-slate-400"
                          />
                        </FormControl>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />
                  <Button 
                    type="submit" 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-sm"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-3 w-3" />
                        Send Resume
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            )}
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-slate-800 mt-12 pt-8 text-center">
          <p className="text-slate-400">© 2025 Abhishek Kumar. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
