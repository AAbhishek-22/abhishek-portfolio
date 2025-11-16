import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import path from 'path';
import fs from 'fs';

// Rate limiting store (in production, consider using Redis or database)
interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

// Rate limit configuration - 2 requests per 5 minutes
const RATE_LIMIT_MAX_REQUESTS = 2;
const RATE_LIMIT_WINDOW_MS = 5 * 60 * 1000; // 5 minutes

// Helper function to get client IP
function getClientIP(request: Request): string {
  // Check for forwarded headers (common with proxies)
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    const ips = forwarded.split(',').map(ip => ip.trim());
    console.log('Forwarded IPs:', ips);
    return ips[0];
  }
  
  // Check for real IP header
  const realIP = request.headers.get('x-real-ip');
  if (realIP) {
    console.log('Real IP:', realIP);
    return realIP;
  }
  
  // For development, use a fallback
  const fallbackIP = 'localhost';
  console.log('Using fallback IP:', fallbackIP);
  return fallbackIP;
}

// Rate limiting function
function checkRateLimit(clientIP: string): { allowed: boolean; remaining: number; resetTime: number } {
  const now = Date.now();
  const entry = rateLimitStore.get(clientIP);
  
  console.log('Rate limit check for IP:', clientIP);
  console.log('Current entry:', entry);
  console.log('Current time:', now);
  
  if (!entry || now > entry.resetTime) {
    // First request or window expired, create new entry
    const resetTime = now + RATE_LIMIT_WINDOW_MS;
    const newEntry = { count: 1, resetTime };
    rateLimitStore.set(clientIP, newEntry);
    
    console.log('New rate limit entry created:', newEntry);
    
    // Clean up old entries to prevent memory leaks
    cleanupOldEntries();
    
    return { allowed: true, remaining: RATE_LIMIT_MAX_REQUESTS - 1, resetTime };
  }
  
  if (entry.count >= RATE_LIMIT_MAX_REQUESTS) {
    // Rate limit exceeded
    console.log('Rate limit exceeded for IP:', clientIP);
    return { allowed: false, remaining: 0, resetTime: entry.resetTime };
  }
  
  // Increment count
  entry.count++;
  rateLimitStore.set(clientIP, entry);
  
  console.log('Rate limit updated for IP:', clientIP, 'New count:', entry.count);
  
  return { allowed: true, remaining: RATE_LIMIT_MAX_REQUESTS - entry.count, resetTime: entry.resetTime };
}

// Cleanup function to prevent memory leaks
function cleanupOldEntries() {
  const now = Date.now();
  let cleanedCount = 0;
  for (const [key, entry] of rateLimitStore.entries()) {
    if (now > entry.resetTime) {
      rateLimitStore.delete(key);
      cleanedCount++;
    }
  }
  console.log('Cleaned up', cleanedCount, 'old rate limit entries');
}

export async function POST(request: Request) {
  try {
    // Get client IP for rate limiting
    const clientIP = getClientIP(request);
    console.log('Processing request from IP:', clientIP);
    
    // Check rate limit
    const rateLimit = checkRateLimit(clientIP);
    console.log('Rate limit result:', rateLimit);
    
    if (!rateLimit.allowed) {
      const resetTime = new Date(rateLimit.resetTime);
      const waitTime = Math.ceil((rateLimit.resetTime - Date.now()) / 1000);
      
      console.log('Rate limit exceeded. Wait time:', waitTime, 'seconds');
      
      return NextResponse.json(
        { 
          error: 'Rate limit exceeded. Too many resume requests.',
          details: `You can request another resume in ${waitTime} seconds.`,
          resetTime: resetTime.toISOString(),
          retryAfter: waitTime
        },
        { 
          status: 429,
          headers: {
            'Retry-After': waitTime.toString(),
            'X-RateLimit-Limit': RATE_LIMIT_MAX_REQUESTS.toString(),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': resetTime.toISOString()
          }
        }
      );
    }

    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Check env variables
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      return NextResponse.json(
        { error: 'Email configuration is missing.' },
        { status: 500 }
      );
    }

    // Create a transporter with Gmail app password
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Get resume file path
    const resumePath = path.join(process.cwd(), 'public', 'resume.pdf');
    
    // Check if resume file exists
    if (!fs.existsSync(resumePath)) {
      console.error('Resume file not found at path:', resumePath);
      return NextResponse.json(
        { error: 'Resume file not found' },
        { status: 500 }
      );
    }

    // Read file as buffer
    const resumeBuffer = fs.readFileSync(resumePath);

    // Email options for the requester
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'My Resume - Abhishek Kumar',
      text: `Hi there,

Thank you for your interest in my profile! I've attached my resume as requested.

Best regards,
Abhishek Kumar`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #1e40af; margin-bottom: 20px;">My Resume - Abhishek Kumar</h2>
          <p style="color: #374151; line-height: 1.6;">Hi there,</p>
          <p style="color: #374151; line-height: 1.6;">Thank you for your interest in my profile! I've attached my resume as requested.</p>
          <p style="color: #374151; line-height: 1.6;">If you have any questions or would like to discuss potential opportunities, feel free to reach out.</p>
          
          <div style="margin-top: 40px; margin-bottom: 30px;">
            <p style="color: #000000; margin-bottom: 10px; font-size: 14px;">Thank You & Regards,</p>
            <p style="color: #ca1a0eff; font-size: 20px; font-weight: bold; margin: 5px 0;">Abhishek Kumar</p>
            <p style="color: #374151; font-size: 14px; margin: 5px 0;">Backend Developer, Exp.: 4.5 yrs</p>
            <p style="color: #6B7280; font-size: 8px; margin: 10px 0;">NodeJs | ExpressJs | NestJs | Golang | MongoDB | AWS | Kafka | Docker | K8s | Jenkins</p>
            
            <hr style="border: none; border-top: 1px solid #E5E7EB; margin: 20px 0;">
            
            <div style="margin-top: 15px;">
              <p style="color: #374151; font-size: 14px; margin: 8px 0;">
                <span style="display: inline-block; width: 24px; height: 24px; margin-right: 10px; background-color: #3B82F6; border-radius: 4px; text-align: center; line-height: 24px; color: white; font-weight: bold; font-size: 13px; vertical-align: middle;">✉</span>
                <a href="mailto:kumarabhishek0947@gmail.com" style="color: #2563EB; text-decoration: underline; vertical-align: middle;">kumarabhishek0947@gmail.com</a>
              </p>
              <p style="color: #374151; font-size: 14px; margin: 8px 0;">
                <span style="display: inline-block; width: 24px; height: 24px; margin-right: 10px; background-color: #10B981; border-radius: 4px; text-align: center; line-height: 24px; color: white; font-size: 13px; vertical-align: middle;">☎</span>
                <a href="tel:+919871948174" style="color: #374151; text-decoration: none; vertical-align: middle;">+91-9871948174</a>
              </p>
            </div>
            
            <div style="margin-top: 15px;">
              <a href="https://www.linkedin.com/in/abhishek-kumar-0542ba72/" target="_blank" style="display: inline-block; margin-right: 15px; text-decoration: none;">
                <span style="display: inline-block; width: 32px; height: 32px; background-color: #0077B5; border-radius: 4px; text-align: center; line-height: 32px; color: white; font-weight: bold; font-size: 16px;">in</span>
              </a>
              <a href="https://github.com/AAbhishek18" target="_blank" style="display: inline-block; text-decoration: none;">
                <span style="display: inline-block; width: 32px; height: 32px; background-color: #000000; border-radius: 4px; text-align: center; line-height: 32px; color: white; font-size: 20px;">⚫</span>
              </a>
            </div>
          </div>
        </div>
      `,
      attachments: [
        {
          filename: 'Abhishek_Kumar_Resume.pdf',
          content: resumeBuffer,
        },
      ],
    };

    // Email options for your notification
    const notificationMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Send to yourself
      subject: 'Resume Request - Portfolio Notification',
      text: `New Resume Request

Someone has requested your resume from your portfolio website.

Requester Email: ${email}
Request Time: ${new Date().toLocaleString('en-US', { 
        timeZone: 'Asia/Kolkata',
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })}
Client IP: ${clientIP}

You can follow up with them at: ${email}

Best regards,
Your Portfolio Website`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #dc2626;"> New Resume Request</h2>
          <p>Someone has requested your resume from your portfolio website.</p>
          
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #374151;">Request Details:</h3>
            <p><strong>Requester Email:</strong> <a href="mailto:${email}" style="color: #1e40af;">${email}</a></p>
            <p><strong>Request Time:</strong> ${new Date().toLocaleString('en-US', { 
                timeZone: 'Asia/Kolkata',
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}</p>
            <p><strong>Client IP:</strong> <code style="background-color: #e5e7eb; padding: 2px 4px; border-radius: 3px;">${clientIP}</code></p>
          </div>
          
          <p>You can follow up with them at: <a href="mailto:${email}" style="color: #1e40af;">${email}</a></p>
          
          <div style="margin-top: 30px; padding: 15px; background-color: #fef3c7; border-left: 4px solid #f59e0b; border-radius: 4px;">
            <p style="margin: 0; color: #92400e;">
              <strong>💡 Tip:</strong> Consider following up with this person to discuss potential opportunities!
            </p>
          </div>
          
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">
          <p style="font-size: 12px; color: #6b7280;">
            This notification was sent automatically from your portfolio website.
          </p>
        </div>
      `,
    };

    console.log('Attempting to send resume to:', email);
    console.log('Client IP:', clientIP, 'Rate limit remaining:', rateLimit.remaining);
    
    // Send both emails
    const [resumeEmail, notificationEmail] = await Promise.all([
      transporter.sendMail(mailOptions),
      transporter.sendMail(notificationMailOptions)
    ]);
    
    console.log('Resume email sent successfully:', resumeEmail.response);
    console.log('Notification email sent successfully:', notificationEmail.response);

    return NextResponse.json(
      { 
        message: 'Resume sent successfully!',
        rateLimit: {
          remaining: rateLimit.remaining,
          resetTime: new Date(rateLimit.resetTime).toISOString()
        }
      },
      { 
        status: 200,
        headers: {
          'X-RateLimit-Limit': RATE_LIMIT_MAX_REQUESTS.toString(),
          'X-RateLimit-Remaining': rateLimit.remaining.toString(),
          'X-RateLimit-Reset': new Date(rateLimit.resetTime).toISOString()
        }
      }
    );
  } catch (error: any) {
    console.error('Error sending email:', error?.message || error);
    console.error('Full error:', error);
    
    // Provide more specific error messages
    let errorMessage = 'Failed to send resume. Please try again later.';
    let errorDetails = 'An unexpected error occurred.';
    
    if (error?.code === 'EAUTH' || error?.responseCode === 535) {
      errorMessage = 'Email authentication failed.';
      errorDetails = 'Please check your email credentials in the environment variables.';
    } else if (error?.code === 'ECONNECTION' || error?.code === 'ETIMEDOUT') {
      errorMessage = 'Connection error.';
      errorDetails = 'Unable to connect to the email server. Please check your internet connection.';
    } else if (error?.message) {
      errorDetails = error.message;
    }
    
    return NextResponse.json(
      { 
        error: errorMessage,
        details: errorDetails
      },
      { status: 500 }
    );
  }
}