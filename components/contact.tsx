"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, Phone, MapPin, Github, Linkedin, Send, Loader2, CheckCircle } from "lucide-react"
import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useToast } from "@/components/ui/use-toast"

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
})

type FormValues = z.infer<typeof formSchema>

export function Contact() {
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
    console.log("Starting form submission...");
    setIsLoading(true)
    setIsSuccess(false)
    
    try {
      console.log("Submitting form with email:", data.email);
      const response = await fetch("/api/send-resume/route", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log("API response:", result);
      console.log("Response status:", response.status);
      console.log("Response ok:", response.ok);

      if (!response.ok) {
        console.error("Response not ok:", response.status, result);
        throw new Error(result.error || "Failed to send resume");
      }

      console.log("Success! Setting success state...");
      console.log("Current isSuccess before setting:", isSuccess);
      
      // Show success toast
      toast({
        title: "Success!",
        description: "Resume has been sent to your email successfully.",
      })
      
      // Set success state
      setIsSuccess(true)
      console.log("isSuccess set to true");
      
      // Reset form
      form.reset()
      console.log("Form reset completed");
      
      // Don't auto-reset success state - let user control it
      // setTimeout(() => {
      //   setIsSuccess(false)
      // }, 3000)
      
    } catch (error: any) {
      console.error("Form submission error:", error);
      console.error("Error details:", error.message);
      toast({
        title: "Error",
        description: "Failed to send resume. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
      console.log("Loading state set to false");
    }
  }

  // Debug effect to monitor state changes
  useEffect(() => {
    console.log("State changed - isSuccess:", isSuccess, "isLoading:", isLoading);
  }, [isSuccess, isLoading]);

  console.log("Component render - isSuccess:", isSuccess, "isLoading:", isLoading);

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

          {/* Call to Action and Resume Request */}
          <div className="space-y-6">
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
              </CardContent>
            </Card>
            
            {/* Resume Request Form */}
            <Card className="bg-white/70 backdrop-blur-sm border-slate-200">
              <CardHeader>
                <CardTitle className="text-xl text-slate-800">Get My Resume</CardTitle>
              </CardHeader>
              <CardContent>
                {isSuccess ? (
                  <div className="text-center py-8">
                    <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-green-700 mb-2">Resume Sent Successfully!</h3>
                    <p className="text-green-600 mb-4">Your resume has been sent to your email address.</p>
                    <Button 
                      onClick={() => setIsSuccess(false)}
                      variant="outline"
                      className="bg-white hover:bg-green-50"
                    >
                      Send Another Resume
                    </Button>
                  </div>
                ) : (
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="your.email@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button 
                        type="submit" 
                        className="w-full bg-blue-600 hover:bg-blue-700"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="mr-2 h-4 w-4" />
                            Send Resume to Email
                          </>
                        )}
                      </Button>
                    </form>
                  </Form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex justify-center space-x-4 pt-8">
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors duration-200"
            >
              <link.icon className="h-5 w-5 text-slate-600" />
            </a>
          ))}
        </div>
        {/* Footer */}
        <div className="text-center mt-16 pt-8 border-t border-slate-200">
          <p className="text-slate-600">© 2025 Abhishek Kumar.</p>
        </div>
      </div>
    </section>
  )
}
