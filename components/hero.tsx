'use client'

import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail, Phone } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { toast } from "sonner"
import { ResumeDialog } from "@/components/resume-dialog"

export const Hero = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const imageRef = useRef<HTMLDivElement>(null)
  const [isMoving, setIsMoving] = useState(true)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    let interval: NodeJS.Timeout

    const moveImage = () => {
      if (!imageRef.current || !isMoving || isHovered) return

      // Get window dimensions
      const windowWidth = window.innerWidth
      const windowHeight = window.innerHeight
      
      // Calculate random position within window bounds
      // Keeping some margin from edges
      const margin = 100
      const maxX = windowWidth - margin
      const maxY = windowHeight - margin
      
      const randomX = Math.random() * (maxX - margin) - (maxX / 2)
      const randomY = Math.random() * (maxY - margin) - (maxY / 2)

      // Apply the new position with smooth transition
      imageRef.current.style.transform = `translate(${randomX}px, ${randomY}px)`
    }

    // Move image every 2 seconds if moving is enabled
    if (isMoving && !isHovered) {
      interval = setInterval(moveImage, 2000)
      // Initial position
      moveImage()
    }

    return () => {
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [isMoving, isHovered])

  const handleImageClick = () => {
    setIsMoving(!isMoving)
  }

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

  return (
    <section className="flex flex-col items-center justify-center min-h-screen py-12 relative">
      <div 
        ref={imageRef}
        className="w-32 h-32 rounded-full overflow-hidden shadow-xl border-4 border-blue-500 hover:border-blue-600 transition-all duration-1000 absolute cursor-pointer"
        style={{ zIndex: 1 }}
        onClick={handleImageClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img
          src="/abhishek.jpeg"
          alt="Abhishek Kumar"
          className="w-full h-full object-cover"
        />
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="absolute inset-0" />
            </TooltipTrigger>
            <TooltipContent>
              <p>{isMoving ? 'Click to stop movement' : 'Click to start movement'}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="max-w-4xl mx-auto text-center relative" style={{ zIndex: 2 }}>
        <div className="mb-8">
          <div className="w-32 h-32 mx-auto mb-6"></div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-slate-800 mb-4">
            Abhishek Kumar
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 mb-2">
            Node.js | Golang Developer
          </p>
          <p className="text-lg text-slate-500 mb-8">
            4<sup>+</sup> Years of Experience • Backend Specialist • Microservices Expert
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
        onClick={() => setIsDialogOpen(true)}
      >
        Get Resume
      </Button>

      <ResumeDialog 
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)} onDownload={function (): void {
          throw new Error("Function not implemented.")
        } }      />
    </section>
  )
}