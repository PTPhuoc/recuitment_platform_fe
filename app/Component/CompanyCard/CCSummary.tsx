import { cn } from "@/app/libs/utils";
import { CldImage } from "next-cloudinary";

type PageProps = {
  className?: string;
  company: string;
  company_detail: {
    name: string;
    image: string;
  };
  onNavigate: (id: string) => void;
};

export default function CCSummary({
  className,
  company,
  company_detail,
  onNavigate,
}: PageProps) {
  return (
    <div className={cn("flex items-center justify-between bg-white sm:rounded-2xl p-3", className)}>
      <div className="flex gap-5 items-center">
        <div className="relative w-20 h-20 rounded-lg shadow-default overflow-hidden">
          <CldImage
            src={company_detail.image}
            alt={company_detail.name}
            loading="eager"
            className="absolute object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            fill
          />
        </div>
        <p className="font-bold text-blue-default">{company_detail.name}</p>
      </div>
      <button
        className="px-3 py-1 rounded-lg bg-white text-blue-default border-2 border-blue-default cursor-pointer duration-200 ease-in hover:bg-blue-default hover:text-white hover:shadow-default active:bg-blue-default active:text-white active:shadow-default active:scale-95"
        onClick={(e) => {
          e.stopPropagation();
          onNavigate(company);
        }}
      >
        Chi tiết
      </button>
    </div>
  );
}
