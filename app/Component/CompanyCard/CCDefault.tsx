import { CompanyItemShow } from "@/app/libs/types";
import { cn } from "@/app/libs/utils";
import { BriefcaseBusiness, MapPin, SquareArrowOutUpRight } from "lucide-react";
import { CldImage } from "next-cloudinary";
import React from "react";

type PageProps = {
  className?: string;
  company: CompanyItemShow;
  locaMap: Map<string, Record<string, string>>;
  categoriesMap: Map<string, string>;
  onNavigate: (id: string) => void;
};

export default function CCDefault({
  className,
  company,
  locaMap,
  categoriesMap,
  onNavigate,
}: PageProps) {
  const fullLocation = (location: string[]) => {
    const listLocation: string[] = [];
    location.forEach((loc) => {
      let loca: string[] = [];
      let item = locaMap.get(loc);
      while (item?.parent_id) {
        loca.push(item.name);
        item = locaMap.get(item.parent_id);
      }
      listLocation.push(loca.join(", "));
    });
    return listLocation;
  };

  const companySize = (companySize: string) => {
    if (companySize.startsWith("-"))
      return `Dưới ${companySize.slice(1)} nhân viên`;
    if (companySize.endsWith("+"))
      return `Hơn ${companySize.slice(0, -1)} nhân viên`;
    return `${companySize.split("-").join(" - ")} nhân viên`;
  };

  return (
    <div
      key={company.id}
      className={cn(
        "flex items-center gap-5 bg-white border-2 border-white sm:rounded-2xl p-3 cursor-pointer duration-200 ease-in hover:border-blue-default hover:shadow-default active:border-blue-default hover:scale-[1.01] active:shadow-default",
        className,
      )}
      onClick={(e) => {
        e.stopPropagation();
        onNavigate(company.id);
      }}
    >
      <div className="relative w-35 h-35 rounded-lg shadow-default shrink-0 overflow-hidden max-sm:hidden">
        <CldImage
          src={company.logo_url}
          alt={company.name}
          loading="eager"
          className="absolute object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          fill
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 min-w-0">
        <div className="flex items-stretch gap-2">
          <div className="relative w-20 h-20 rounded-lg shadow-default shrink-0 overflow-hidden sm:hidden">
            <CldImage
              src={company.logo_url}
              alt={company.name}
              loading="eager"
              className="absolute object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              fill
            />
          </div>
          <div className="flex flex-1 flex-col min-w-0">
            <p className="text-4xl font-bold truncate">{company.name}</p>
            <p className="font-bold text-zinc-500">
              {companySize(company.company_size)}
            </p>
          </div>
          <div className="self-start">
            <a
              href={company.website_url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
            >
              <SquareArrowOutUpRight className="text-blue-default w-5 h-5 cursor-pointer duration-200 ease-in hover:text-dark-blue" />
            </a>
          </div>
        </div>
        <div className="flex w-full items-center gap-2">
          <MapPin className="w-5 h-5 shrink-0" />
          {fullLocation(company.locations).map((loc, index) => (
            <div
              className="flex w-full gap-2 items-center overflow-auto no-scroll"
              key={index}
            >
              <p>{loc}</p>
              {index + 1 < fullLocation(company.locations).length && <p> | </p>}
            </div>
          ))}
        </div>
        {company.industries.length > 0 && (
          <div className="flex w-full items-center gap-2">
            <BriefcaseBusiness className="w-5 h-5 shrink-0" />
            <div className="flex w-full gap-2 items-center overflow-auto no-scroll">
              {company.industries.map((id) => (
                <p
                  key={id}
                  className="text-blue-default px-2 border border-blue-default rounded-lg shrink-0 duration-200 ease-in hover:bg-blue-default hover:text-white"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  {categoriesMap.get(id)}
                </p>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
