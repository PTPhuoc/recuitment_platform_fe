import { cn } from "@/app/libs/utils";

type PageProps = {
  className?: string;
  desc: string;
};

export default function Desciption({ className, desc }: PageProps) {
  return (
    <div className={cn("flex flex-col gap-5 sm:p-5 p-2", className)}>
      <p className="text-2xl font-bold">Mô tả</p>
      <p className="flex-1 text-justify overflow-auto scroll-box">{desc}</p>
    </div>
  );
}
