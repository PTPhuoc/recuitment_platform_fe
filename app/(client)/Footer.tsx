"use client";

import Link from "next/link";
import { 
  SiGithub,  
  SiFacebook, 
  SiYoutube 
} from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";
import { Dot } from "lucide-react";

// app/(client)/Footer.tsx
export default function Footer() {
  return (
    <footer className="w-full bg-dark-blue text-white">
      <div className="container mx-auto px-5 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex flex-col gap-3">
            <h2 className="text-3xl font-bold">
              <span className="text-blue-default">FU</span>Job
            </h2>
            <p className=" text-gray-300 leading-relaxed">
              A modern recruitment platform built for learning and skill 
              development. Connecting talent with opportunity – one job at a time.
            </p>
            <div className="flex gap-3 mt-2">
              <a
                href="https://github.com/your-username/fujob"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/10 rounded-full hover:bg-blue-default transition duration-200"
                aria-label="GitHub"
              >
                <SiGithub className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com/in/your-profile"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/10 rounded-full hover:bg-blue-default transition duration-200"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-2 bg-white/10 rounded-full hover:bg-blue-default transition duration-200"
                aria-label="Facebook"
              >
                <SiFacebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-2 bg-white/10 rounded-full hover:bg-blue-default transition duration-200"
                aria-label="YouTube"
              >
                <SiYoutube className="w-5 h-5" />
              </a>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="text-2xl font-bold text-blue-default mb-1">For Job Seekers</h4>
            <Link href="/jobs" className=" text-gray-300 hover:text-white transition">
              Browse Jobs
            </Link>
            <Link href="/companies" className=" text-gray-300 hover:text-white transition">
              Explore Companies
            </Link>
            <Link href="#" className=" text-gray-300 hover:text-white transition">
              Career Advice
            </Link>
            <Link href="#" className=" text-gray-300 hover:text-white transition">
              Salary Insights
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="text-2xl font-bold text-blue-default mb-1">For Employers</h4>
            <Link href="#" className=" text-gray-300 hover:text-white transition">
              Post a Job
            </Link>
            <Link href="#" className=" text-gray-300 hover:text-white transition">
              Company Dashboard
            </Link>
            <Link href="#" className=" text-gray-300 hover:text-white transition">
              Candidate Search
            </Link>
            <Link href="#" className=" text-gray-300 hover:text-white transition">
              Pricing
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="text-2xl font-bold text-blue-default mb-1">About FUJob</h4>
            <Link href="/about" className=" text-gray-300 hover:text-white transition">
              About Us
            </Link>
            <Link href="/contact" className=" text-gray-300 hover:text-white transition">
              Contact
            </Link>
            <Link href="#" className=" text-gray-300 hover:text-white transition">
              Privacy Policy
            </Link>
            <Link href="#" className=" text-gray-300 hover:text-white transition">
              Terms of Service
            </Link>
          </div>
        </div>
        <div className="w-full h-px bg-white/20 my-6" />
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3  text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} FUJob. Built with for learning and growth.
          </p>
          <p className="flex items-center gap-1">
            <span>This is a personal portfolio project</span>
            <Dot className="w-3 h-3" />
            <span>Not a commercial platform</span>
          </p>
        </div>
      </div>
    </footer>
  );
}