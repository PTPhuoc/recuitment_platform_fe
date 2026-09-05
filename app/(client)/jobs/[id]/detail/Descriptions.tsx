import LargeTextShow from "@/app/Component/LargeTextShow";
import { JobItemShow } from "@/app/libs/types";
import { cn } from "@/app/libs/utils";
type PageProps = {
  className?: string;
  job: JobItemShow;
};

// app/(client)/jobs/[id]/detail/Descriptions.tsx
export default function Descriptions({ className, job }: PageProps) {
  const descriptions = job.descriptions.sort((a, b) => a.index - b.index);
  return (
    <>
      {descriptions.map((item) => (
        <div key={item.id} className={cn("flex flex-col", className)}>
          <div className="flex gap-5 items-center">
            <p className="text-2xl font-bold shrink-0">{item.title}</p>
            <span className="w-full h-1 rounded-full bg-zinc-400 shrink"/>
          </div>
          <LargeTextShow content={JSON.parse(item.description)} />
        </div>
      ))}
    </>
  );
}
