import LargeTextShow from "@/app/Component/LargeTextShow";
import { JobItem } from "@/app/libs/types";
type PageProps = {
  job: JobItem;
};

// app/(client)/jobs/[id]/detail/Descriptions.tsx
export default function Descriptions({ job }: PageProps) {
  const descriptions = job.descriptions
    .map((item) => ({ ...item, description: JSON.parse(item.description) }))
    .sort((a, b) => a.index - b.index);
  return (
    <>
      {descriptions.map((item) => (
        <div key={item.id} className="flex flex-col">
          <p className="text-2xl font-bold">{item.title}</p>
          <LargeTextShow content={item.description} />
        </div>
      ))}
    </>
  );
}
