import LargeTextShow from "@/app/Component/LargeTextShow";
import { JobItemShow } from "@/app/libs/types";
type PageProps = {
  job: JobItemShow;
};

// app/(client)/jobs/[id]/detail/Descriptions.tsx
export default function Descriptions({ job }: PageProps) {
  const descriptions = job.descriptions.sort((a, b) => a.index - b.index);
  return (
    <>
      {descriptions.map((item) => (
        <div key={item.id} className="flex flex-col">
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
