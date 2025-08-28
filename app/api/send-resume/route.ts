import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import path from 'path';
import fs from 'fs';

export async function POST(request: Request) {
  try {
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

    // Email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'My Resume - Abhishek Kumar',
      text: 'Please find attached my resume. Thank you for your interest!',
      attachments: [
        {
          filename: 'Abhishek_Kumar_Resume.pdf',
          content: resumeBuffer,
        },
      ],
    };

    console.log('Attempting to send email to:', email);
    
    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.response);

    return NextResponse.json(
      { message: 'Resume sent successfully!' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error sending email:', error?.message || error);
    return NextResponse.json(
      { error: 'Failed to send resume. Please try again later.' },
      { status: 500 }
    );
  }
}