'use client'

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { CheckCircle, Mail, X } from "lucide-react"

interface ResumeDialogProps {
  isOpen: boolean
  onClose: () => void
  onDownload?: () => void
}

export function ResumeDialog({ isOpen, onClose, onDownload }: ResumeDialogProps) {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  // Helper to reset form state
  const resetForm = () => {
    setEmail("")
    setIsSubmitting(false)
    setIsSuccess(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const res = await fetch('/api/send-resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      let result
      try {
        result = await res.json()
      } catch (parseError) {
        result = {}
      }

      if (res.ok) {
        setIsSuccess(true)
        toast.success("Resume successfully sent to your email!", {
          description: "Check your inbox for the PDF attachment",
          duration: 5000,
        })
        // Close popup after 3 seconds to show success message
        setTimeout(() => {
          handleDialogClose()
        }, 3000)
      } else {
        // Handle rate limit errors
        if (res.status === 429) {
          const waitTime = result.retryAfter || 300
          const minutes = Math.ceil(waitTime / 60)
          toast.error("Too many requests", {
            description: result.details || `Please wait ${minutes} minute(s) before requesting again.`,
            duration: 6000,
          })
        } else {
          // Handle other errors
          const errorMessage = result.error || "Failed to send resume. Please try again."
          const errorDetails = result.details || "Make sure your email address is correct and try again."
          toast.error(errorMessage, {
            description: errorDetails,
            duration: 6000,
          })
        }
      }
    } catch (error: any) {
      console.error("Error submitting form:", error)
      toast.error("Something went wrong. Please try again.", {
        description: error?.message || "Network error occurred. Please check your connection.",
        duration: 6000,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Reset form when dialog is closed
  const handleDialogClose = () => {
    onClose()
    resetForm()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleDialogClose}>
      <DialogContent className="sm:max-w-[450px] p-0 overflow-hidden">
        {/* Header with gradient background */}
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white/20 rounded-full">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <DialogTitle className="text-xl font-bold text-white">
                  Get Your Resume
                </DialogTitle>
                <DialogDescription className="text-blue-100 mt-1">
                  Enter your email to receive my professional resume
                </DialogDescription>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDialogClose}
              className="text-white hover:bg-white/20 rounded-full p-2 h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Success State */}
        {isSuccess ? (
          <div className="p-8 text-center">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Resume Sent Successfully!
            </h3>
            <p className="text-gray-600 mb-6">
              Your resume has been sent to <span className="font-medium text-blue-600">{email}</span>
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <div className="flex items-center space-x-2 text-blue-800">
                <Mail className="h-4 w-4" />
                <span className="text-sm font-medium">Please check your inbox for the PDF attachment</span>
              </div>
            </div>
            <p className="text-sm text-gray-500">
              This dialog will close automatically in a few seconds...
            </p>
          </div>
        ) : (
          /* Form State */
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="space-y-3">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email Address
              </Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isSubmitting}
                  className="pl-10 h-12 text-base border-gray-300 focus:border-blue-500 focus:ring-blue-500 transition-colors"
                />
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
              <p className="text-xs text-gray-500">
                We'll send the resume as a PDF attachment to your email
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleDialogClose}
                disabled={isSubmitting}
                className="flex-1 h-12 border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium transition-all duration-200 transform hover:scale-105 disabled:transform-none disabled:opacity-70"
              >
                {isSubmitting ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Sending...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4" />
                    <span>Send Resume</span>
                  </div>
                )}
              </Button>
            </div>

            {/* Additional info */}
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <div className="text-sm text-gray-600">
                  <p className="font-medium text-gray-700 mb-1">What you'll receive:</p>
                  <ul className="space-y-1 text-gray-600">
                    <li>• Professional PDF resume</li>
                    <li>• Immediate download to your device</li>
                    <li>• Email copy for future reference</li>
                  </ul>
                </div>
              </div>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
