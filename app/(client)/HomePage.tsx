"use client";

import { SquareArrowOutUpRight } from "lucide-react";
import { CldImage } from "next-cloudinary";
import Link from "next/link";
import { useEffect } from "react";
import useIntersectionObserver from "../hook/useIntersectionObserver";

export default function HomePage() {
  useEffect(() => {
    const moveTop = useIntersectionObserver({
      target: "move-top",
      insert: "move-active",
    });
    const clearDust = useIntersectionObserver({
      target: "dust",
      insert: "clear",
    });
    return () => {
      moveTop.disconnect();
      clearDust.disconnect();
    };
  }, []);

  return (
    <div className="w-full flex flex-col items-center">
      <div className="relative flex w-full h-screen items-center justify-end bg-white shrink-0">
        <div className="relative w-3/4 max-sm:w-full h-full rounded-bl-full overflow-hidden">
          <CldImage
            src="https://res.cloudinary.com/dlorwajri/image/upload/v1783201177/fujob_home_1_mfiqr8.webp"
            alt="background_home_1"
            loading="eager"
            className="absolute object-cover dust"
            sizes="(max-width: 768px) 100vw, 50vw"
            fill
          />
        </div>
        <div className="absolute top-0 left-0 px-10 max-sm:px-5 gap-10 flex flex-col justify-center h-full w-full">
          <h1 className="text-9xl max-sm:text-8xl font-bold text-dim-blue move-top">
            Find Your Dream Job
          </h1>
          <p className="font-bold text-zinc-500 move-top max-sm:text-light-blue">
            Discover thousands of verified job opportunities from trusted
            companies. <br /> Search by skills, company, or location and take
            the next step in your career.
          </p>
          <div className="flex gap-5 max-sm:flex-col items-center">
            <div className="move-top">
              <Link
                href="/job"
                className="w-50 p-3 flex gap-5 items-center bg-dark-blue text-white rounded-2xl border-2 border-dark-blue duration-200 ease-in hover:bg-white hover:text-dark-blue"
              >
                <p className="font-bold flex-1 text-center">Find Jobs</p>
                <SquareArrowOutUpRight className="h-5 w-5" />
              </Link>
            </div>
            <div className="move-top">
              <Link
                href="/company"
                className="w-50 p-3 flex gap-5 items-center justify-center bg-dark-blue text-white rounded-2xl border-2 border-dark-blue duration-200 ease-in hover:bg-white hover:text-dark-blue"
              >
                <p className="font-bold flex-1 text-center">Browse Companies</p>
                <SquareArrowOutUpRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-screen shrink-0"></div>
    </div>
  );
}
