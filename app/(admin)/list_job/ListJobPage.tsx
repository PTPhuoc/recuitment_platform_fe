"use client";

import { setLoad } from "@/app/store/slices/webSlice";
import { AppDispatch } from "@/app/store/store";
import { Plus } from "lucide-react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

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
  useEffect(() => {
    dispatch(setLoad(false));
  }, []);
  return (
    <>
      <div className="flex flex-col w-3/4 max-lg:w-[95%] max-sm:w-full h-full gap-3 max-lg:gap-2 py-3 max-lg:py-2 items-stretch overflow-auto no-scroll">
        <div className="flex justify-between items-center p-3 bg-blue-default sm:rounded-2xl shadow-default">
          <p className="font-bold text-light-blue">Danh sách Tuyển dụng</p>
          <button className="bg-light-blue text-blue-default border-2 border-light-blue rounded-md scale-100 duration-200 ease-in hover:bg-blue-default hover:text-white active:scale-95">
            <Plus className="w-5 h-5" />
          </button>
        </div>
        <div className="flex-1 flex flex-col gap-3 p-3 bg-white rounded-2xl shadow-default"></div>
      </div>
    </>
  );
}
