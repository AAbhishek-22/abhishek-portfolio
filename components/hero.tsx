'use client'

import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail, Phone } from "lucide-react"
import { useState } from "react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { toast } from "sonner"

export const Hero = () => {
  const [isDownloading, setIsDownloading] = useState(false)

  const copyToClipboard = async (text: string) => {
    try {
      // Try using the Clipboard API first
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        toast.success('Copied to clipboard!');
      } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
          document.execCommand('copy');
          toast.success('Copied to clipboard!');
        } catch (err) {
          toast.error('Failed to copy text');
        }
        
        textArea.remove();
      }
    } catch (err) {
      toast.error('Failed to copy text');
    }
  };

  const downloadResume = async () => {
    try {
      setIsDownloading(true)
      const response = await fetch('/resume.pdf')
      
      if (!response.ok) {
        throw new Error('Failed to download resume')
      }

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = 'Abhishek-Resume.pdf'
      document.body.appendChild(link)
      link.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(link)
    } catch (error) {
      console.error('Error downloading resume:', error)
      alert('Failed to download resume. Please try again later.')
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <section className="flex flex-col items-center justify-center min-h-screen py-12">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8">
          <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden shadow-xl">
            <img
              src="/abhishek.jpeg"
              alt="Abhishek Kumar"
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-slate-800 mb-4">
            Abhishek Kumar
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 mb-2">
            Software Developer
          </p>
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
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => copyToClipboard('kumarabhishek0947@gmail.com')}
                  className="text-slate-600 hover:text-blue-600 transition-colors duration-200"
                >
                  <Mail className="h-6 w-6" />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Click to copy email</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => copyToClipboard('+919871948174')}
                  className="text-slate-600 hover:text-blue-600 transition-colors duration-200"
                >
                  <Phone className="h-6 w-6" />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Click to copy phone number</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <a
            href="https://github.com/AAbhishek18"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-600 hover:text-blue-600 transition-colors duration-200"
          >
            <Github className="h-6 w-6" />
          </a>
          <a
            href="https://www.linkedin.com/in/abhishek-kumar-0542ba72/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-600 hover:text-blue-600 transition-colors duration-200"
          >
            <Linkedin className="h-6 w-6" />
          </a>
        </div>
      </div>
      
      <Button
        className="mt-6"
        onClick={downloadResume}
        disabled={isDownloading}
      >
        {isDownloading ? 'Downloading...' : 'Download Resume'}
      </Button>
    </section>
  )
}