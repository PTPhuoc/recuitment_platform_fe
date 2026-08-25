import { JobItemShow } from "@/app/libs/types";
import { cn } from "@/app/libs/utils";
import { ContactRound, School, UserRoundCog, UsersRound } from "lucide-react";

type PageProps = {
  className?: string;
  job: JobItemShow;
  categoriesMap: Map<string, string>;
};

export default function Requires({ className, job, categoriesMap }: PageProps) {
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

  return (
    <div className={cn("flex flex-col gap-5 items-center bg-white p-5 sm:rounded-2xl",className)}>
      <p className="w-full text-2xl font-bold">Yêu cầu khác</p>
      <div className="flex w-full items-center justify-between gap-5">
        <div className="flex gap-2 items-center shrink-0">
          <div className="p-2 border-2 border-blue-default rounded-lg">
            <UserRoundCog className="w-5 h-5 text-blue-default" />
          </div>
          <p>Kinh nghiệm</p>
        </div>
        <p className="text-right">{experienceShow}</p>
      </div>
      <div className="flex w-full items-center justify-between gap-5">
        <div className="flex gap-2 items-center shrink-0">
          <div className="p-2 border-2 border-blue-default rounded-lg">
            <School className="w-5 h-5 text-blue-default" />
          </div>
          <p>Học vấn</p>
        </div>
        <p className="text-right">
          {job.require.educations.length > 0
            ? job.require.educations
                .map((id) => categoriesMap.get(id))
                .join(", ")
            : "Không yêu cầu học vấn"}
        </p>
      </div>
      <div className="flex w-full items-center justify-between gap-5">
        <div className="flex gap-2 items-center shrink-0">
          <div className="p-2 border-2 border-blue-default rounded-lg">
            <ContactRound className="w-5 h-5 text-blue-default" />
          </div>
          <p>Cấp bật</p>
        </div>
        <p className="text-right">
          {job.require.job_level.length > 0
            ? job.require.job_level
                .map((id) => categoriesMap.get(id))
                .join(", ")
            : "Không yêu cầu cấp bật"}
        </p>
      </div>
      <div className="flex w-full items-center justify-between">
        <div className="flex gap-2 items-center shrink-0">
          <div className="p-2 border-2 border-blue-default rounded-lg">
            <UsersRound className="w-5 h-5 text-blue-default" />
          </div>
          <p>Số lượng</p>
        </div>
        <p className="text-right">{job.require.quantity}</p>
      </div>
    </div>
  );
}
