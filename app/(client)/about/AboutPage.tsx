"use client";

import { setLoad } from "@/app/store/slices/webSlice";
import { AppDispatch, RootState } from "@/app/store/store";
import {
  AppWindow,
  ArrowUpRight,
  Building,
  Database,
  Dot,
  FileUser,
  Funnel,
  PanelsTopLeft,
  Server,
  ShieldUser,
  Split,
} from "lucide-react";
import { RiNextjsFill } from "react-icons/ri";
import {
  SiCloudinary,
  SiDjango,
  SiEslint,
  SiFacebook,
  SiFigma,
  SiGit,
  SiGithub,
  SiMega,
  SiPostgresql,
  SiPostman,
  SiPrettier,
  SiRailway,
  SiReacthookform,
  SiRedux,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
  SiX,
} from "react-icons/si";
import { CiLinkedin } from "react-icons/ci";
import {} from "react-icons";
import { CldImage } from "next-cloudinary";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";

// app/(client)/about/AboutPage.tsx
export default function AboutPage() {
  const { lang } = useSelector((state: RootState) => state.web);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(setLoad(false));
  }, []);
  return (
    <div className="flex flex-col w-full gap-5">
      <div className="flex flex-col items-center justify-center w-full bg-white h-70 px-5">
        <h2 className="sm:text-5xl text-3xl font-bold text-center">
          Building a Real-World Recruitment Platform – For Learning
        </h2>
        <p className="text-zinc-500 font-bold text-center">
          FUJob is a personal project designed to simulate a full-featured
          recruitment ecosystem. It's my playground for mastering modern web
          development, from authentication to deployment.
        </p>
      </div>
      <div className="flex items-stretch">
        <div className="flex-1 max-lg:hidden"></div>
        <div className="flex gap-5 flex-8 flex-col">
          <div className="relative flex items-center bg-white">
            <div className="relative lg:w-150 sm:w-70 w-full max-sm:h-100 h-70">
              <CldImage
                src="https://res.cloudinary.com/dlorwajri/image/upload/v1788201507/about_1_egyu3f.webp"
                alt="about_1"
                loading="eager"
                className="absolute object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                fill
              />
            </div>
            <div className="max-sm:absolute max-sm:bottom-0 max-sm:right-0 max-sm:bg-light-blue-blur flex-1 flex flex-col p-5">
              <h3 className="text-3xl font-bold">What is FUJob</h3>
              <p className="text-justify">
                FUJob is not a commercial recruitment platform – it's a personal
                project built with a clear goal: to replicate the complexity of
                a real-world recruitment system and push my technical
                boundaries. From user authentication and job posting to
                real-time search and admin dashboards, every feature is crafted
                to mirror what you'd find in a production-level application.
              </p>
            </div>
          </div>
        </div>
        <div className="flex-1 max-lg:hidden"></div>
      </div>
      <div className="flex items-stretch">
        <div className="flex-1 max-lg:hidden"></div>
        <div className="flex gap-5 flex-8 flex-col bg-white">
          <div className="relative flex items-center">
            <div className="z-1 max-sm:absolute max-sm:bottom-0 max-sm:right-0 max-sm:bg-light-blue-blur flex-1 flex flex-col p-5">
              <h3 className="text-3xl font-bold">Project Objectives</h3>
              <p>
                This project is more than just a recruitment website. It was
                built with the goal of exploring and practicing the full
                lifecycle of a real-world software system. Every feature is
                designed to serve as a learning opportunity, helping me master
                modern development techniques from frontend to backend and
                database management.
              </p>
            </div>
            <div className="relative lg:w-150 sm:w-70 w-full max-sm:h-100 h-70">
              <CldImage
                src="https://res.cloudinary.com/dlorwajri/image/upload/v1788201506/about_2_kjb7ph.webp"
                alt="about_2"
                loading="eager"
                className="absolute object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                fill
              />
            </div>
          </div>
          <div className="w-full h-px bg-dark-blue" />
          <h3 className="text-3xl font-bold px-5">Key Areas of Focus</h3>
          <div className="w-full grid sm:grid-cols-2 grid-cols-1 gap-5 px-5 pb-5">
            <div className="flex flex-col bg-zinc-100 rounded-xl shadow-default">
              <div className="flex gap-5 items-center px-5 py-3 bg-dark-blue rounded-xl text-white">
                <AppWindow className="w-8 h-8" />
                <h4 className="font-bold text-2xl">Frontend Development</h4>
              </div>
              <p className="px-5 py-3">
                Building responsive, user-friendly interfaces with Next.js App
                Router, React, Tailwind CSS, and TypeScript. Focus on user
                experience (UX), performance optimization, and accessibility.
              </p>
            </div>
            <div className="flex flex-col bg-zinc-100 rounded-xl shadow-default">
              <div className="flex gap-5 items-center px-5 py-3 bg-dark-blue rounded-xl text-white">
                <Server className="w-8 h-8" />
                <h4 className="font-bold text-2xl">Backend Development</h4>
              </div>
              <p className="px-5 py-3">
                Developing RESTful APIs with Django REST Framework, handling
                business logic, authentication, and authorization. Designing
                secure, scalable, and well-documented API endpoints.
              </p>
            </div>
            <div className="flex flex-col bg-zinc-100 rounded-xl shadow-default">
              <div className="flex gap-5 items-center px-5 py-3 bg-dark-blue rounded-xl text-white">
                <Database className="w-8 h-8" />
                <h4 className="font-bold text-2xl">Database Design</h4>
              </div>
              <p className="px-5 py-3">
                Designing relational databases, optimizing queries, and modeling
                complex relationships between core entities: companies, job
                postings, candidates, and applications.{" "}
              </p>
            </div>
            <div className="flex flex-col bg-zinc-100 rounded-xl shadow-default">
              <div className="flex gap-5 items-center px-5 py-3 bg-dark-blue rounded-xl text-white">
                <ShieldUser className="w-8 h-8" />
                <h4 className="font-bold text-2xl">
                  Authentication & Authorization
                </h4>
              </div>
              <p className="px-5 py-3">
                Implementing JWT-based authentication (Access + Refresh Tokens)
                with HttpOnly cookies, role-based access control (admin,
                employer, candidate), and route protection.{" "}
              </p>
            </div>
            <div className="flex flex-col bg-zinc-100 rounded-xl shadow-default">
              <div className="flex gap-5 items-center px-5 py-3 bg-dark-blue rounded-xl text-white">
                <Funnel className="w-8 h-8" />
                <h4 className="font-bold text-2xl">Job Search & Filtering</h4>
              </div>
              <p className="px-5 py-3">
                Building flexible search and filtering functionality by job
                title, industry, location, salary range, work type, and more.
                Optimizing query performance for large datasets.
              </p>
            </div>
            <div className="flex flex-col bg-zinc-100 rounded-xl shadow-default">
              <div className="flex gap-5 items-center px-5 py-3 bg-dark-blue rounded-xl text-white">
                <Building className="w-8 h-8" />
                <h4 className="font-bold text-2xl">Company Management</h4>
              </div>
              <p className="px-5 py-3">
                Implementing full CRUD operations for company profiles,
                including logo upload, company description, industry
                classification, locations, and company size.
              </p>
            </div>
            <div className="flex flex-col bg-zinc-100 rounded-xl shadow-default">
              <div className="flex gap-5 items-center px-5 py-3 bg-dark-blue rounded-xl text-white">
                <FileUser className="w-8 h-8" />
                <h4 className="font-bold text-2xl">Candidate Management</h4>
              </div>
              <p className="px-5 py-3">
                Managing candidate profiles (CV, skills, experience, education)
                and linking them to application history.
              </p>
            </div>
            <div className="flex flex-col bg-zinc-100 rounded-xl shadow-default">
              <div className="flex gap-5 items-center px-5 py-3 bg-dark-blue rounded-xl text-white">
                <Split className="w-8 h-8" />
                <h4 className="font-bold text-2xl">Application Workflow</h4>
              </div>
              <p className="px-5 py-3">
                Simulating the complete application lifecycle – from submission
                by candidates, review by employers, to status updates (pending,
                reviewed, rejected, hired).
              </p>
            </div>
            <div className="flex flex-col bg-zinc-100 rounded-xl shadow-default">
              <div className="flex gap-5 items-center px-5 py-3 bg-dark-blue rounded-xl text-white">
                <PanelsTopLeft className="w-8 h-8" />
                <h4 className="font-bold text-2xl">Data Processing</h4>
              </div>
              <p className="px-5 py-3">
                Processing and visualizing recruitment statistics (job counts,
                applicant numbers, application rates) on an admin dashboard.
              </p>
            </div>
          </div>
        </div>
        <div className="flex-1 max-lg:hidden"></div>
      </div>
      <div className="flex items-stretch">
        <div className="flex-1 max-lg:hidden"></div>
        <div className="flex flex-8 flex-col bg-white gap-5 pb-5">
          <div className="relative w-full h-20">
            <CldImage
              src="https://res.cloudinary.com/dlorwajri/image/upload/v1785093073/jobs_page_1_skvlml.webp"
              alt="about_3"
              loading="eager"
              className="absolute z-1 object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              fill
            />
            <h3 className="absolute z-2 w-full h-full flex items-center p-5 text-3xl font-bold text-white">
              Key Features - What can you do?
            </h3>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex flex-col px-5">
              <div className="flex items-center gap-1">
                <h4 className="font-bold text-2xl shrink-0">For Job Seekers</h4>
                <div className="w-full h-px bg-dark-blue" />
              </div>
              <div className="flex items-center gap-2">
                <Dot className="w-5 h-5 text-blue-default shrink-0" />
                <p>
                  <span className="font-bold">Search jobs:</span> Find
                  opportunities by keywords, titles, or skills
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Dot className="w-5 h-5 text-blue-default shrink-0" />
                <p>
                  <span className="font-bold">Filter jobs:</span> Narrow down by
                  industry, location, salary, experience level, and work type
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Dot className="w-5 h-5 text-blue-default shrink-0" />
                <p>
                  <span className="font-bold">Explore companies:</span> Browse
                  company profiles and learn about their culture
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Dot className="w-5 h-5 text-blue-default shrink-0" />
                <p>
                  <span className="font-bold">View job details:</span> Get full
                  information about roles, requirements, and benefits
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Dot className="w-5 h-5 text-blue-default shrink-0" />
                <p>
                  <span className="font-bold">Save jobs:</span> Bookmark
                  positions you're interested in for later
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Dot className="w-5 h-5 text-blue-default shrink-0" />
                <p>
                  <span className="font-bold">Apply for jobs:</span> Submit
                  applications directly through the platform
                </p>
              </div>
            </div>
            <div className="flex flex-col px-5">
              <div className="flex items-center gap-1">
                <h4 className="font-bold text-2xl shrink-0">For Employers</h4>
                <div className="w-full h-px bg-dark-blue" />
              </div>
              <div className="flex items-center gap-2">
                <Dot className="w-5 h-5 text-blue-default shrink-0" />
                <p>
                  <span className="font-bold">Manage company:</span> Create and
                  update company profiles with logo, description, and contact
                  details
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Dot className="w-5 h-5 text-blue-default shrink-0" />
                <p>
                  <span className="font-bold">Create jobs:</span> Post new job
                  openings with detailed descriptions and requirements
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Dot className="w-5 h-5 text-blue-default shrink-0" />
                <p>
                  <span className="font-bold">Manage job postings:</span> Edit,
                  close, or delete listings, and track application statuses
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Dot className="w-5 h-5 text-blue-default shrink-0" />
                <p>
                  <span className="font-bold">Manage candidates:</span> Review
                  applicant profiles, shortlist candidates, and update statuses
                </p>
              </div>
            </div>
            <div className="flex flex-col px-5">
              <div className="flex items-center gap-1">
                <h4 className="font-bold text-2xl shrink-0">For Admins</h4>
                <div className="w-full h-px bg-dark-blue" />
              </div>
              <div className="flex items-center gap-2">
                <Dot className="w-5 h-5 text-blue-default shrink-0" />
                <p>
                  <span className="font-bold">Manage users:</span> View,
                  activate, or deactivate user accounts and assign roles
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Dot className="w-5 h-5 text-blue-default shrink-0" />
                <p>
                  <span className="font-bold">Manage companies:</span> Review,
                  approve, edit, or remove company profiles
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Dot className="w-5 h-5 text-blue-default shrink-0" />
                <p>
                  <span className="font-bold">Manage jobs:</span> Oversee all
                  job postings, flag or remove inappropriate content
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Dot className="w-5 h-5 text-blue-default shrink-0" />
                <p>
                  <span className="font-bold">Manage locations:</span> Maintain
                  a structured list of locations (country → city → district)
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Dot className="w-5 h-5 text-blue-default shrink-0" />
                <p>
                  <span className="font-bold">Manage categories:</span> Create
                  and update industry, education, and work type categories
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 max-lg:hidden"></div>
      </div>
      <div className="flex items-stretch">
        <div className="flex-1 max-lg:hidden"></div>
        <div className="flex gap-5 flex-8 flex-col bg-white py-5">
          <h3 className="text-3xl font-bold px-5">Technologies Used</h3>
          <div className="flex flex-wrap gap-5 px-5 items-stretch justify-center">
            <div className="flex flex-col flex-1 min-w-80 gap-5 p-5 rounded-xl border-2 border-blue-default">
              <h4 className="text-2xl font-bold">Frontend</h4>
              <div className="flex flex-wrap gap-5">
                <div className="flex gap-2 items-center px-3 py-1 bg-blue-default rounded-lg">
                  <RiNextjsFill className="w-5 h-5 text-white" />
                  <p className="text-white">Next.js</p>
                </div>
                <div className="flex gap-2 items-center px-3 py-1 bg-blue-default rounded-lg">
                  <SiTypescript className="w-5 h-5 text-white" />
                  <p className="text-white">TypeScript</p>
                </div>
                <div className="flex gap-2 items-center px-3 py-1 bg-blue-default rounded-lg">
                  <SiTailwindcss className="w-5 h-5 text-white" />
                  <p className="text-white">Tailwind CSS</p>
                </div>
                <div className="flex gap-2 items-center px-3 py-1 bg-blue-default rounded-lg">
                  <SiRedux className="w-5 h-5 text-white" />
                  <p className="text-white">Redux Toolkit</p>
                </div>
                <div className="flex gap-2 items-center px-3 py-1 bg-blue-default rounded-lg">
                  <SiReacthookform className="w-5 h-5 text-white" />
                  <p className="text-white">React Hook Form</p>
                </div>
                <div className="flex gap-2 items-center px-3 py-1 bg-blue-default rounded-lg">
                  <p className="text-white">TipTap</p>
                </div>
                <div className="flex gap-2 items-center px-3 py-1 bg-blue-default rounded-lg">
                  <p className="text-white">ApexCharts</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col flex-1 min-w-80 gap-5 p-5 rounded-xl border-2 border-blue-default">
              <h4 className="text-2xl font-bold">Backend</h4>
              <div className="flex flex-wrap gap-5">
                <div className="flex gap-2 items-center px-3 py-1 bg-blue-default rounded-lg">
                  <SiDjango className="w-5 h-5 text-white" />
                  <p className="text-white">Django</p>
                </div>
                <div className="flex gap-2 items-center px-3 py-1 bg-blue-default rounded-lg">
                  <SiDjango className="w-5 h-5 text-white" />
                  <p className="text-white">Django REST Framework</p>
                </div>
                <div className="flex gap-2 items-center px-3 py-1 bg-blue-default rounded-lg">
                  <SiPostgresql className="w-5 h-5 text-white" />
                  <p className="text-white">PostgreSQL</p>
                </div>
                <div className="flex gap-2 items-center px-3 py-1 bg-blue-default rounded-lg">
                  <p className="text-white">JWT</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col flex-1 min-w-80 gap-5 p-5 rounded-xl border-2 border-blue-default">
              <h4 className="text-2xl font-bold">Infrastructure</h4>
              <div className="flex flex-wrap gap-5">
                <div className="flex gap-2 items-center px-3 py-1 bg-blue-default rounded-lg">
                  <SiVercel className="w-5 h-5 text-white" />
                  <p className="text-white">Vercel</p>
                </div>
                <div className="flex gap-2 items-center px-3 py-1 bg-blue-default rounded-lg">
                  <SiRailway className="w-5 h-5 text-white" />
                  <p className="text-white">Railway</p>
                </div>
                <div className="flex gap-2 items-center px-3 py-1 bg-blue-default rounded-lg">
                  <SiCloudinary className="w-5 h-5 text-white" />
                  <p className="text-white">Cloudinary</p>
                </div>
                <div className="flex gap-2 items-center px-3 py-1 bg-blue-default rounded-lg">
                  <SiMega className="w-5 h-5 text-white" />
                  <p className="text-white">MEGA</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col flex-1 min-w-80 gap-5 p-5 rounded-xl border-2 border-blue-default">
              <h4 className="text-2xl font-bold">Tools</h4>
              <div className="flex flex-wrap gap-5">
                <div className="flex gap-2 items-center px-3 py-1 bg-blue-default rounded-lg">
                  <SiGit className="w-5 h-5 text-white" />
                  <p className="text-white">Git</p>
                </div>
                <div className="flex gap-2 items-center px-3 py-1 bg-blue-default rounded-lg">
                  <SiGithub className="w-5 h-5 text-white" />
                  <p className="text-white">GitHub</p>
                </div>
                <div className="flex gap-2 items-center px-3 py-1 bg-blue-default rounded-lg">
                  <SiFigma className="w-5 h-5 text-white" />
                  <p className="text-white">Figma</p>
                </div>
                <div className="flex gap-2 items-center px-3 py-1 bg-blue-default rounded-lg">
                  <SiEslint className="w-5 h-5 text-white" />
                  <p className="text-white">ESLint</p>
                </div>
                <div className="flex gap-2 items-center px-3 py-1 bg-blue-default rounded-lg">
                  <SiPrettier className="w-5 h-5 text-white" />
                  <p className="text-white">Prettier</p>
                </div>
                <div className="flex gap-2 items-center px-3 py-1 bg-blue-default rounded-lg">
                  <SiPostman className="w-5 h-5 text-white" />
                  <p className="text-white">Postman</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 max-lg:hidden"></div>
      </div>
      <div className="flex items-stretch">
        <div className="flex-1 max-lg:hidden"></div>
        <div className="flex flex-8 flex-col bg-white py-5">
          <h3 className="text-3xl font-bold px-5">Data & Transparency</h3>
          <div className="flex flex-col gap-2">
            <div className="flex flex-col px-5">
              <div className="flex items-center gap-2">
                <Dot className="w-5 h-5 text-blue-default shrink-0" />
                <p>
                  <span className="font-bold">Non-commercial project:</span>{" "}
                  This is a personal portfolio project built for educational
                  purposes. It is not a commercial recruitment platform.
                </p>
              </div>
            </div>
            <div className="flex flex-col px-5">
              <div className="flex items-center gap-2">
                <Dot className="w-5 h-5 text-blue-default shrink-0" />
                <p>
                  <span className="font-bold">Data sources:</span> Some job
                  postings, company information, and location data displayed on
                  this platform may be sourced from publicly available datasets
                  or APIs. These sources are clearly cited where applicable.
                </p>
              </div>
            </div>
            <div className="flex flex-col px-5">
              <div className="flex items-center gap-2">
                <Dot className="w-5 h-5 text-blue-default shrink-0" />
                <p>
                  <span className="font-bold">External attribution:</span> Job
                  postings or company profiles that are sourced from external
                  providers will include a "source" link or attribution whenever
                  possible.
                </p>
              </div>
            </div>
            <div className="flex flex-col px-5">
              <div className="flex items-center gap-2">
                <Dot className="w-5 h-5 text-blue-default shrink-0" />
                <p>
                  <span className="font-bold">Disclaimer:</span> FUJob is not
                  affiliated with, endorsed by, or officially connected to any
                  of the companies featured on this platform, unless explicitly
                  stated.
                </p>
              </div>
            </div>
            <div className="flex flex-col px-5">
              <div className="flex items-center gap-2">
                <Dot className="w-5 h-5 text-blue-default shrink-0" />
                <p>
                  <span className="font-bold">Content requests:</span> If you
                  are a data owner or authorized representative and have
                  concerns about any content displayed on this site, please
                  reach out through the information provided below. We will
                  review your request and take appropriate action.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 max-lg:hidden"></div>
      </div>
      <div className="flex items-stretch">
        <div className="flex-1 max-lg:hidden"></div>
        <div className="flex flex-8 bg-white items-stretch">
          <div className="flex-1 flex flex-col py-5">
            <h3 className="text-3xl font-bold px-5">Contact</h3>
            <div className="flex flex-col px-5 gap-3">
              <p className=" text-zinc-700">
                Have feedback, questions, or just want to connect?
              </p>
              <div className="flex flex-wrap gap-4 items-center">
                <a
                  href="https://www.facebook.com/phan.tan.phuoc.883243/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-dark-blue text-white rounded-lg hover:bg-blue-default ease-in duration-200"
                >
                  <SiFacebook className="w-5 h-5" />
                  <span>Facebook</span>
                </a>
                <a
                  href="https://x.com/FatToNhuLike"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-dark-blue text-white rounded-lg hover:bg-blue-default ease-in duration-200"
                >
                  <SiX className="w-5 h-5" />
                  <span>X</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/tân-phước-phan-407a73330"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-dark-blue text-white rounded-lg hover:bg-blue-default ease-in duration-200"
                >
                  <CiLinkedin className="w-5 h-5" />
                  <span>LinkedIn</span>
                </a>
              </div>
              <div className="mt-3 p-4 rounded-xl border border-blue-default">
                <div className="flex flex-col gap-2">
                  <p>
                    <span className="font-bold">Frontend:</span>{" "}
                    <a
                      href="https://github.com/PTPhuoc/recuitment_platform_fe.git"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-default font-bold hover:underline"
                    >
                      PTPhuoc/recuitment_platform_fe.git
                    </a>
                  </p>
                  <p>
                    <span className="font-bold">Backend:</span>{" "}
                    <a
                      href="https://github.com/PTPhuoc/recuitment_platform_be.git"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-default font-bold hover:underline"
                    >
                      PTPhuoc/recuitment_platform_be.git
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative flex-2 max-sm:hidden">
            <CldImage
              src="https://res.cloudinary.com/dlorwajri/image/upload/v1788211468/about_contact_gfuf9u.webp"
              alt="about_4"
              loading="eager"
              className="absolute z-1 object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              fill
            />
          </div>
        </div>
        <div className="flex-1 max-lg:hidden"></div>
      </div>
      <div className="flex items-stretch">
        <div className="flex-1 max-lg:hidden"></div>
        <div className="flex max-sm:flex-col flex-8 items-center h-70 bg-dark-blue lg:rounded-2xl py-5">
          <div className="flex-1 flex flex-col items-center justify-center">
            <h3 className="sm:text-7xl text-4xl sm:w-3/4 font-bold px-5 text-white">Begin your career</h3>
            <p className="text-white sm:text-justify text-center sm:w-3/4 px-5 mt-3">
              Find your dream job and join our community of talented professionals.
            </p>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <Link
              href="/jobs"
              className="font-bold flex items-center gap-2 px-4 py-2 bg-white text-dark-blue border-2 border-white rounded-lg hover:bg-dark-blue hover:text-white ease-in duration-200"
            >
              <p> Explore Jobs</p>
              <ArrowUpRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
        <div className="flex-1 max-lg:hidden"></div>
      </div>
    </div>
  );
}
