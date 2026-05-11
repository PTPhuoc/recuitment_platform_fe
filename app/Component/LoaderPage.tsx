"use client";

import { useSelector } from "react-redux";
import { cn } from "../libs/utils";
import { RootState } from "../store/store";
import { useEffect, useState } from "react";

type PageValue = {
  className?: string;
};

export default function LoaderPage({ className = "fixed" }: PageValue) {
  const { isLoad } = useSelector((state: RootState) => state.web);
  const [isAnimate, setIsAnimate] = useState(false);
  const [isDisable, setIsDisable] = useState(true);

  useEffect(() => {
    if (isLoad) {
      setIsAnimate(true);
      setIsDisable(false)
    } else {
      const time1 = setTimeout(() => {
        setIsAnimate(false);
      }, 500);
      const time2 = setTimeout(() => {
        setIsDisable(true)
      }, 1000)
      return () => {
        clearTimeout(time1);
        clearTimeout(time2)
      };
    }
  }, [isLoad]);

  return (
    <div
      className={cn(
        `flex justify-center items-center z-50 w-full h-full bg-zinc-100 ${className + (isAnimate ? " opacity-100" : " opacity-0")} duration-500 ease-in-out ${isDisable && "hidden"}`,
      )}
    >
      <div
        className={`flex justify-center items-center bg-white rounded-lg duration-500 ease-in-out ${isAnimate ? "h-80 w-80" : "h-full w-full"}`}
      >
        <div
          className={`${isAnimate ? "opacity-100" : "opacity-0"} flex items-center text-[100px] font-bold duration-500 ease-in-out`}
        >
          <p className="text-loader-to-right">FU</p>
          <p className="text-loader-to-left">Jobs</p>
        </div>
      </div>
    </div>
  );
}
