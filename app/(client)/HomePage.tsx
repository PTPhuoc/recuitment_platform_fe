"use client";

import { SquareArrowOutUpRight } from "lucide-react";
import { CldImage } from "next-cloudinary";
import Link from "next/link";
import { useEffect, useMemo } from "react";
import useIntersectionObserver from "../hook/useIntersectionObserver";
import useLatestJobs from "../hook/useLatestJobs";
import JCHome from "../Component/JobCard/JCHome";
import { useSelector } from "react-redux";
import { useCategories } from "../hook/useCategories";
import { RootState } from "../store/store";

// app/(client)/page.tsx
export default function HomePage() {
  const { lang } = useSelector((state: RootState) => state.web);
  const categories = useCategories(lang);
  const latestJobs = useLatestJobs(3);

  const industriesMap = useMemo(() => {
    const map = new Map<string, string>();
    categories.data?.industry.forEach((item) =>
      map.set(item.id, item.translations[0].name),
    );
    return map;
  }, [categories.data?.industry]);

  useEffect(() => {
    const move = useIntersectionObserver({
      target: ["move-top", "move-left", "move-right", "move-bottom", "drop"],
      insert: "perform",
    });
    const clearDust = useIntersectionObserver({
      target: ["dust"],
      insert: "clear",
    });
    const rollLeft = useIntersectionObserver({
      target: ["roll"],
      insert: "spread",
    });
    return () => {
      move.disconnect();
      clearDust.disconnect();
      rollLeft.disconnect();
    };
  }, [latestJobs.data]);

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
                href="/jobs"
                className="w-50 p-3 flex gap-5 items-center bg-dark-blue text-white rounded-2xl border-2 border-dark-blue duration-200 ease-in shadow-default hover:bg-white hover:text-dark-blue"
              >
                <p className="font-bold flex-1 text-center">Find Jobs</p>
                <SquareArrowOutUpRight className="h-5 w-5" />
              </Link>
            </div>
            <div className="move-top">
              <Link
                href="/company"
                className="w-50 p-3 flex gap-5 items-center justify-center bg-dark-blue text-white rounded-2xl border-2 border-dark-blue duration-200 ease-in shadow-default hover:bg-white hover:text-dark-blue"
              >
                <p className="font-bold flex-1 text-center">Browse Companies</p>
                <SquareArrowOutUpRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="relative w-full h-130 shrink-0">
        <div className="absolute top-0 left-0 w-full h-full p-10 max-sm:p-2 roll">
          <div className="bg-white w-full h-full"></div>
        </div>
        <div className="absolute flex top-0 left-0 w-full h-full p-10 max-sm:p-2">
          <div className="flex flex-1 gap-5 shrink-0 overflow-hidden">
            <div className="flex-1 relative shrink-0">
              <CldImage
                src="https://res.cloudinary.com/dlorwajri/image/upload/v1784475627/fujob_home_2_gz5t3o.webp"
                alt="background_home_1"
                loading="eager"
                className="absolute object-cover move-right"
                sizes="(max-width: 768px) 100vw, 50vw"
                fill
              />
            </div>
            <div className="flex-2 flex flex-col p-5 gap-5 shrink-0">
              <h1 className="text-7xl font-bold text-dim-blue move-right">
                Why <span className="text-blue-default">FU</span>
                <span className="text-dark-blue">Job</span>?
              </h1>
              <span className="h-1 w-full bg-dark-blue move-right" />
              <div className="flex-1 flex justify-center items-center move-right">
                <p className="w-3/4 max-sm:w-full text-center font-bold text-zinc-500">
                  FUJob is a modern recruitment platform built to bridge the gap
                  between talented professionals and forward-thinking companies.
                  We believe that finding the right job – or the right talent –
                  should be simple, transparent, and efficient.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex max-sm:flex-col w-full h-100 max-lg:h-110 max-sm:h-auto items-stretch shrink-0 bg-white">
        <div className="flex-1 p-5 gap-5 flex flex-col items-start">
          <h1 className="text-7xl font-bold text-dim-blue drop">
            New opportunities for you
          </h1>
          <p className="flex-1 font-bold text-zinc-500 drop">
            FUJob's mission is to make recruitment fair, fast, and frictionless
            – for both talent and employers.
          </p>
          <div className="drop">
            <Link
            href="/jobs"
            className="p-3 flex gap-5 items-center bg-dark-blue text-white rounded-2xl border-2 border-dark-blue duration-200 ease-in shadow-default hover:bg-white hover:text-dark-blue"
          >
            <p className="font-bold flex-1 text-center">Find more Jobs</p>
            <SquareArrowOutUpRight className="h-5 w-5" />
          </Link>
          </div>
          
        </div>
        <span className="w-1 h-full bg-dark-blue move-right max-md:hidden"></span>
        <div className="flex-3 flex p-5 gap-5 items-stretch overflow-auto no-scroll">
          {latestJobs.data?.map((item) => (
            <JCHome key={item.id} job={item} industrieMap={industriesMap} parentDiv="move-right"/>
          ))}
        </div>
      </div>
    </div>
  );
}
