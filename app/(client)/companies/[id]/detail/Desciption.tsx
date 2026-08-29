import { cn } from "@/app/libs/utils";

type PageProps = {
  className?: string;
  desc: string;
};

export default function Desciption({ className, desc }: PageProps) {
  return (
    <div className={cn("flex flex-col", className)}>
      <p className="text-2xl font-bold sm:px-5 px-2 w-full bg-zinc-200">Mô tả</p>
      <p className="flex-1 sm:p-5 p-2 text-justify overflow-auto scroll-box">{desc}</p>
    </div>
  );
}
