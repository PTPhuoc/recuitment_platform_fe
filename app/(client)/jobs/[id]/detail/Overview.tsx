import { JobItemShow } from "@/app/libs/types";
import { cn, getStringDate } from "@/app/libs/utils";
import { BriefcaseBusiness, CircleDollarSign } from "lucide-react";
import { CldImage } from "next-cloudinary";
import React from "react";

type PageProps = {
  className?: string;
  job: JobItemShow;
  lang: "vie" | "eng";
  categoriesMap: Map<string, string>;
};


// app/(client)/jobs/[id]/detail/Overview.tsx
export default function Overview({ className, job, lang, categoriesMap }: PageProps) {

  const salaryShow =
    job.require.max_salary > 0 && job.require.min_salary > 0
      ? job.require.max_salary != job.require.min_salary
        ? `${job.require.min_salary.toLocaleString(lang === "vie" ? "vi-VN" : "en-US")} - ${job.require.max_salary.toLocaleString(lang === "vie" ? "vi-VN" : "en-US")} VND`
        : `${job.require.min_salary.toLocaleString(lang === "vie" ? "vi-VN" : "en-US")} VND`
      : job.require.max_salary > 0
        ? `${job.require.max_salary.toLocaleString(lang === "vie" ? "vi-VN" : "en-US")} VND`
        : job.require.min_salary > 0
          ? `${job.require.min_salary.toLocaleString(lang === "vie" ? "vi-VN" : "en-US")} VND`
          : "Thỏa thuận";

  return (
    <div className={cn("flex gap-5 bg-white p-5 sm:rounded-2xl items-center", className)}>
      <div className="relative sm:w-35 sm:h-35 w-20 h-20 shadow-default sm:rounded-lg overflow-hidden">
        <CldImage
          src={job.company_detail.image}
          alt={job.company_detail.name}
          loading="eager"
          className="absolute object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          fill
        />
      </div>
      <div className="flex-1 min-w-0 flex flex-col w-full">
        <div className="flex gap-5 items-center justify-between">
          <p className="text-blue-default font-bold">
            {job.company_detail.name}
          </p>
          <p className="text-zinc-400 font-bold">
            {getStringDate(job.date_created)}
          </p>
        </div>
        <h3 className="sm:text-4xl text-2xl font-semibold line-clamp-2">
          {job.name}
        </h3>
        <div className="flex gap-2 items-center text-dim-blue">
          <CircleDollarSign className="w-5 h-5" />
          <p className="text-dark-blue duration-200 ease-in hover:text-blue-default hover:font-bold">
            {salaryShow}
          </p>
        </div>
        <div className="flex gap-2 items-center">
          <BriefcaseBusiness className="w-5 h-5 text-dim-blue" />
          {job.require.form_of_work.map((item, index) => (
            <React.Fragment key={item}>
              <div className="duration-200 ease-in hover:text-blue-default hover:font-bold">
                {categoriesMap.get(item)}
              </div>
              {index + 1 < job.require.form_of_work.length && (
                <span className="text-zinc-400"> | </span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
