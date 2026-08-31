import { JobItemShow } from "@/app/libs/types";
import {
  BriefcaseBusiness,
  CircleDollarSign,
  LinkIcon,
  MapPin,
  UserRoundCog,
} from "lucide-react";
import { CldImage } from "next-cloudinary";
import Link from "next/link";
import React from "react";

type JCDefaultProps = {
  job: JobItemShow;
  lang: "vie" | "eng";
  categoriesMap: Map<string, string>;
  onCategories: (category: Record<string, string>) => void;
  onNavigate: (job: JobItemShow) => void;
};

export default function JCDefault({
  job,
  categoriesMap,
  lang,
  onCategories,
  onNavigate,
}: JCDefaultProps) {
  const industries = job.require.industries?.slice(0, 3);
  const experienceShow =
    job.require.max_experience > 0 && job.require.min_experience > 0
      ? job.require.max_experience != job.require.min_experience
        ? `${job.require.min_experience} - ${job.require.max_experience} năm`
        : `${job.require.min_experience} năm`
      : job.require.max_experience > 0
        ? `Tối đa ${job.require.max_experience} năm`
        : job.require.min_experience > 0
          ? `Ít nhất ${job.require.min_experience} năm`
          : "Không yêu cầu kinh nghiệm";

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
    <div
      className="group flex flex-col p-2 gap-2 rounded-2xl border-2 border-blue-default min-w-0 shadow-none scale-100 duration-200 ease-in cursor-pointer hover:shadow-default hover:scale-[1.01]"
      onClick={() => onNavigate(job)}
    >
      <div className="flex gap-5">
        <div className="relative w-30 h-30 rounded-lg shadow overflow-hidden shrink-0">
          <CldImage
            alt={job.company_detail.name}
            src={job.company_detail.image}
            loading="eager"
            className="absolute object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            fill
          />
        </div>
        <div className="flex flex-col w-full min-w-0">
          <div className="flex items-center justify-between">
            <p className="text-zinc-400 font-bold truncate">
              {job.company_detail.name}
            </p>
            {job.source_link && (
              <Link
                href={job.source_link}
                target="_blank"
                className="text-blue-default cursor-pointer duration-200 ease-in-out hover:text-dark-blue active:text-dark-blue"
                title="Original Post"
                onClick={(e) => e.stopPropagation()}
              >
                <LinkIcon className="w-5 h-5" />
              </Link>
            )}
          </div>

          <p className="text-2xl font-bold line-clamp-2">{job.name}</p>
          <div className="flex gap-2 items-center text-dim-blue">
            <CircleDollarSign className="w-5 h-5" />
            <p className="text-dark-blue">{salaryShow}</p>
          </div>
          <div className="flex gap-2 items-center">
            <BriefcaseBusiness className="w-5 h-5 text-dim-blue" />
            {job.require.form_of_work.map((item, index) => (
              <React.Fragment key={item}>
                <div
                  className="text-dark-blue cursor-pointer duration-200 ease-in hover:text-blue-default hover:font-bold"
                  onClick={(e) => {
                    e.stopPropagation();
                    onCategories({ formOfWork: item });
                  }}
                >
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
      <div className="flex flex-wrap w-full items-center gap-2">
        {industries.length > 0 && (
          <div className="flex max-lg:w-full items-center gap-2 shrink-0 overflow-auto no-scroll">
            {industries.map((id) => (
              <p
                key={id}
                className="text-blue-default px-2 sm:py-1 border border-blue-default rounded-lg shrink-0 duration-200 ease-in hover:bg-blue-default hover:text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  onCategories({ industry: id });
                }}
              >
                {categoriesMap.get(id)}
              </p>
            ))}
            {industries.length > 3 && (
              <p className="text-blue-default font-bold">{`+${industries.length - 3}`}</p>
            )}
          </div>
        )}
        <div className="flex max-lg:w-full items-center gap-2 shrink-0 overflow-auto no-scroll">
          <div
            className="flex items-center gap-2 px-2 sm:py-1 text-blue-default border border-blue-default rounded-lg duration-200 ease-in hover:bg-blue-default hover:text-white shrink-0"
            onClick={(e) => {
              e.stopPropagation();
              onCategories({
                experience: (
                  job.require.max_experience - job.require.min_experience
                ).toString(),
              });
            }}
          >
            <UserRoundCog className="w-5 h-5" />
            <p>{experienceShow}</p>
          </div>
          <div
            className="flex items-center gap-2 px-2 sm:py-1 text-blue-default border border-blue-default rounded-lg duration-200 ease-in hover:bg-blue-default hover:text-white shrink-0"
            onClick={(e) => {
              e.stopPropagation();
              onCategories({ location: job.require.location });
            }}
          >
            <MapPin className="w-5 h-5" />
            <p>{categoriesMap.get(job.require.location)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
