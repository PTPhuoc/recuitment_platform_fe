"use client";

import JCDefault from "@/app/Component/JobCard/JCDefault";
import { JobItemShow } from "@/app/libs/types";
import { cn } from "@/app/libs/utils";
import { setLoad } from "@/app/store/slices/webSlice";
import { AppDispatch } from "@/app/store/store";
import { PackageOpen } from "lucide-react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

type PageProps = {
  className?: string;
  lang: "vie" | "eng";
  categoriesMap: Map<string, string>;
  jobs: JobItemShow[];
};

export default function JobsOfCompany({
  className,
  lang,
  categoriesMap,
  jobs,
}: PageProps) {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        className,
      )}
    >
      <p className="text-2xl font-bold sm:px-5 px-2">Tuyển dụng của công ty</p>
      <div className="flex-1 flex flex-col gap-5 sm:p-5 p-2 overflow-auto scroll-box">
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <JCDefault
              key={job.id}
              job={job}
              categoriesMap={categoriesMap}
              lang={lang}
              onCategories={() => {}}
              onJob={(job) => {
                dispatch(setLoad(true));
                router.push(`/jobs/${job.id}/detail`);
              }}
            />
          ))
        ) : (
          <div className="w-full h-full flex flex-col justify-center items-center">
            <PackageOpen className="w-50 h-50 text-zinc-400" />
            <p className="text-zinc-400 font-bold">Không tìm thấy tuyển dụng</p>
          </div>
        )}
      </div>
    </div>
  );
}
