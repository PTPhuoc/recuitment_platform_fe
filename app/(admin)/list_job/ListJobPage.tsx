"use client";

import { setLoad } from "@/app/store/slices/webSlice";
import { AppDispatch } from "@/app/store/store";
import { Plus, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

type JobItem = {
  id: string;
  company: string;
  name: string
  source_link: string;
  description: string;
  status: "pending" | "active" | "ban"
  date_limited: Date
  date_created: Date
  descriptions: {id: string, job: string, title: string, description: string, index: number}[]
  require: {
    id: string;
    job: string;
    form_of_job: string
    
  }
}

type PageValue = {
  jobs: {
    count: number | 0;
    next: string | null;
    previous: string | null;
    results: any[];
    status: "Success";
  } | null;
};

export default function ListJobPage({ jobs }: PageValue) {
  const dispatch = useDispatch<AppDispatch>();
  const [isOpen, setIsOpen] = useState({
    advance: false,
    create: false,
  });
  useEffect(() => {
    dispatch(setLoad(false));
  }, []);
  return (
    <>
      <div className="flex flex-col w-3/4 max-lg:w-[95%] max-sm:w-full h-full gap-3 max-lg:gap-2 py-3 max-lg:py-2 items-stretch overflow-auto no-scroll">
        <div className="flex justify-between items-center p-3 bg-blue-default sm:rounded-2xl shadow-default">
          <p className="font-bold text-light-blue">Danh sách Tuyển dụng</p>
          <button
            className="bg-light-blue text-blue-default border-2 border-light-blue rounded-md scale-100 duration-200 ease-in hover:bg-blue-default hover:text-white active:scale-95"
            onClick={() => setIsOpen({ ...isOpen, create: true })}
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
        <div className="flex-1 flex flex-col gap-3 p-3 bg-white rounded-2xl shadow-default"></div>
        <div
          className={`fixed top-0 left-0 z-2 flex w-full h-full justify-end duration-500 ease-in-out ${isOpen.create ? "translate-x-0" : "translate-x-full"}`}
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen({ ...isOpen, create: false });
          }}
        >
          <div
            className="flex flex-col gap-3 max-lg:gap-2 py-3 max-lg:py-2 w-2/5 max-lg:w-[64%] max-sm:w-full border-l-2 border-dark-blue h-full bg-white shadow-default"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-3 bg-blue-default shadow-default">
              <p className="font-bold text-light-blue">Tạo tuyển dụng</p>
              <button
                className="bg-light-blue text-blue-default border-2 border-light-blue rounded-md scale-100 duration-200 ease-in hover:bg-blue-default hover:text-white active:scale-95"
                onClick={() => setIsOpen({ ...isOpen, create: false })}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
