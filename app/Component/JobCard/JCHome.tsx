import { RootState } from "@/app/store/store";
import { CircleDollarSign, LinkIcon, UserRoundCog } from "lucide-react";
import Link from "next/link";
import { useSelector } from "react-redux";
import ImageShow from "../ImageShow";
import { useRouter } from "next/navigation";
import { cn } from "@/app/libs/utils";
import { JobItem } from "@/app/libs/types";

type IndustrieMap = Map<string, string>;

type PageProps = {
  job: JobItem;
  industrieMap: IndustrieMap;
  parentDiv?: string;
  navigate: (url: string) => void;
};

// app/Component/JobCard/JCHome.tsx
export default function JCHome({
  job,
  industrieMap,
  parentDiv,
  navigate,
}: PageProps) {
  const { lang } = useSelector((state: RootState) => state.web);
  const router = useRouter();
  const nameIndustries =
    job.require.industries?.map((id) => ({
      id: id,
      name: industrieMap.get(id),
    })) ?? [];

  const experienceShow =
    job.require.max_experience > 0 && job.require.min_experience > 0
      ? job.require.max_experience != job.require.min_experience
        ? `${job.require.min_experience} - ${job.require.max_experience} năm`
        : `${job.require.min_experience} năm`
      : job.require.max_experience > 0
        ? `${job.require.max_experience} năm`
        : job.require.min_experience > 0
          ? `${job.require.min_experience} năm`
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
      key={job.id}
      onClick={() => navigate(`/jobs/${job.id}/detail`)}
      className={cn("w-100 max-md:w-80 h-full shrink-0", parentDiv)}
    >
      <div
        className="flex flex-col p-5 gap-5 w-full h-full rounded-lg shadow-default border-2 border-blue-default scale-100 cursor-pointer duration-200 ease-in-out hover:border-dark-blue hover:scale-105"
        onClick={() => router.push(`/jobs/${job.id}/detail`)}
      >
        <div className="flex flex-1 items-center">
          <p className="flex-1 text-2xl font-bold line-clamp-2">{job.name}</p>
          <Link
            href={job.source_link}
            target="_blank"
            className="p-2 rounded-full border-2 border-blue-default bg-blue-default text-white duration-200 ease-in-out hover:bg-white hover:text-blue-default"
            title="Original Post"
            onClick={(e) => e.stopPropagation()}
          >
            <LinkIcon className="w-5 h-5" />
          </Link>
        </div>
        <div className="flex flex-3 flex-col gap-2">
          <div className="flex flex-1 flex-wrap content-start gap-2 items-start">
            {nameIndustries.length > 0 &&
              nameIndustries.slice(0, 5).map((item) => {
                return (
                  <p
                    key={item.id}
                    className="text-sm font-bold px-5 py-1 border-2 rounded-full"
                  >
                    {item.name}
                  </p>
                );
              })}
          </div>
          <div className="flex items-center">
            <div className="p-2 rounded-full bg-dark-blue">
              <UserRoundCog className="text-white w-5 h-5" />
            </div>
            <span className="w-10 h-1 bg-dark-blue"></span>
            <p className="text-sm font-bold px-5 py-1 border-dark-blue border-2 rounded-full">
              {experienceShow}
            </p>
          </div>
          <div className="flex items-center">
            <div className="p-2 rounded-full bg-dark-blue">
              <CircleDollarSign className="text-white w-5 h-5" />
            </div>
            <span className="w-10 h-1 bg-dark-blue"></span>
            <p className="text-sm font-bold px-5 py-1 border-dark-blue border-2 rounded-full">
              {salaryShow}
            </p>
          </div>
          <span className="w-full h-px bg-zinc-500" />
        </div>
        <div className="flex-1 flex items-center gap-5">
          <div className="w-15 h-15">
            <ImageShow
              link={job.company_detail.image}
              alt={job.company_detail.name}
              typeShape="fixed"
            />
          </div>
          <button
            className="px-3 py-1 rounded-2xl shadow-none duration-200 ease-in-out hover:shadow-default hover:font-bold"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/companies/${job.company}/detail`);
            }}
          >
            {job.company_detail.name}
          </button>
        </div>
      </div>
    </div>
  );
}
