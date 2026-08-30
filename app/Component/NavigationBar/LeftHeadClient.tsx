"use client";
import { setLoad } from "@/app/store/slices/webSlice";
import { AppDispatch } from "@/app/store/store";
import { X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { useDispatch } from "react-redux";

type PageProps = {
  className?: string;
  isOpen: boolean;
  onActive: (value: boolean) => void;
};

export default function LeftHeadClient({
  className,
  isOpen,
  onActive,
}: PageProps) {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch<AppDispatch>();
  return (
    <div
      className={`fixed z-5 top-0 left-0 w-full h-screen duration-200 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      onClick={(e) => {
        e.stopPropagation();
        onActive(false);
      }}
    >
      <div className="flex flex-col gap-1 w-3/4 h-full bg-white py-2">
        <div className="flex items-center gap-5 px-5">
          <button
            className="cursor-pointer sm:hidden"
            onClick={() => onActive(!isOpen)}
          >
            <X className="text-dark-blue w-8 h-8" />
          </button>
          <button
            className="px-3 rounded-2xl"
            disabled={pathname === "/"}
            onClick={() => {
              dispatch(setLoad(true));
              router.push("/");
            }}
          >
            <h1 className="group text-5xl font-bold text-dark-blue duration-200 ease-in-out hover:scale-105 cursor-pointer">
              <span className="text-blue-default duration-200 ease-in-out group-hover:text-dark-blue">
                FU
              </span>
              <span className="text-dark-blue duration-200 ease-in-out group-hover:text-blue-default">
                Job
              </span>
            </h1>
          </button>
        </div>
        <div className="flex flex-col gap-px py-px bg-zinc-500">
          <button
            className="text-left cursor-pointer p-5 bg-white duration-200 ease-in-out hover:bg-blue-default hover:text-white active:bg-blue-default active:text-white"
            disabled={pathname === "/"}
            onClick={() => {
              dispatch(setLoad(true));
              router.push("/");
            }}
          >
            Home
          </button>
          <button
            className="text-left cursor-pointer p-5 bg-white duration-200 ease-in-out hover:bg-blue-default hover:text-white active:bg-blue-default active:text-white"
            disabled={pathname === "/jobs"}
            onClick={() => {
              dispatch(setLoad(true));
              router.push("/jobs");
            }}
          >
            Jobs
          </button>
         
          <button
            className="text-left cursor-pointer p-5 bg-white duration-200 ease-in-out hover:bg-blue-default hover:text-white active:bg-blue-default active:text-white"
            disabled={pathname === "/companies"}
            onClick={() => {
              dispatch(setLoad(true));
              router.push("/companies");
            }}
          >
            Companies
          </button>
          <button
            className="text-left cursor-pointer p-5 bg-white duration-200 ease-in-out hover:bg-blue-default hover:text-white active:bg-blue-default active:text-white"
            disabled={pathname === "/about"}
            onClick={() => {
              dispatch(setLoad(true));
              router.push("/about");
            }}
          >
            About
          </button>
        </div>
      </div>
    </div>
  );
}
