"use client";

import { cn, handleSearch } from "@/app/libs/utils";
import { BriefcaseBusiness, MapPin, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type InputValue = {
  name: string;
  industry: string;
  location: string;
};

type Industries = {
  name: string;
  value: string;
  slug: string;
};

type Locations = {
  name: string;
  value: string;
  slug: string;
  parent_id: string;
};

type Categories = {
  industry: Industries[];
  location: Locations[];
};

type PageProps = {
  className?: string;
  value: InputValue;
  categories: Categories;
  outValue: (value: {
    name: string;
    industry: string;
    location: string;
  }) => void;
};

// app/Component/Input/JobSearch.tsx
export default function JobSearch({
  className,
  value,
  categories,
  outValue,
}: PageProps) {
  const [inputValue, setInputValue] = useState<InputValue>({
    name: "",
    industry: "",
    location: "",
  });
  const [industryList, setIndustryList] = useState<Industries[]>([]);
  const [locationList, setLocationList] = useState<Locations[]>([]);
  const [inputTarget, setInputTarget] = useState<
    "name" | "industry" | "location" | ""
  >("");
  const { industryMap, locationMap } = useMemo(() => {
    const industryMap = new Map<string, string>();
    const locationMap = new Map<string, Record<"name" | "parent_id", string>>();
    categories.industry.forEach((item) =>
      industryMap.set(item.value, item.name),
    );
    categories.location.forEach((item) =>
      locationMap.set(item.value, {
        name: item.name,
        parent_id: item.parent_id,
      }),
    );
    return { industryMap, locationMap };
  }, [categories]);

  const reLocationList: Locations[] = useMemo(() => {
    return categories.location.map((item) => {
      let allName = [item.name];
      let parentId = item.parent_id;
      while (parentId) {
        const parentName = locationMap.get(parentId)?.name;
        parentName && allName.push(parentName);
        parentId = locationMap.get(parentId)?.parent_id ?? "";
      }
      return {
        ...item,
        name: allName.join(", "),
      };
    });
  }, [categories.location]);

  useEffect(() => {
    setIndustryList(
      handleSearch(inputValue.industry, categories.industry, "name"),
    );
  }, [inputValue.industry, categories.industry]);

  useEffect(() => {
    setLocationList(handleSearch(inputValue.location, reLocationList, "name"));
  }, [inputValue.location, reLocationList]);

  useEffect(() => {
    setInputValue(() => {
      const industryValue = industryMap.get(value.industry);
      return {
        name: value.name,
        industry: industryValue ?? value.industry,
        location: locationMap.get(value.location)?.name ?? value.location,
      };
    });
  }, [value]);

  return (
    <div
      className={cn(
        "w-full bg-white flex max-lg:flex-col items-stretch sm:gap-2 rounded-2xl shadow-default",
        className,
      )}
    >
      <div className="flex-1 flex items-stretch p-3">
        <div className="p-2 bg-white border-2 border-blue-default rounded-xl">
          <Search className="w-6 h-6 text-blue-default" />
        </div>
        <input
          className="w-full border-b-2 border-blue-default outline-none px-2 duration-200 ease-in hover:border-dark-blue"
          placeholder="Tên tuyển dụng"
          value={inputValue.name}
          onChange={(e) => outValue({ ...inputValue, name: e.target.value })}
        />
      </div>
      <span className="h-full w-px bg-blue-default max-lg:hidden" />
      <div className="flex-1 flex sm:gap-2 max-sm:flex-col items-stretch">
        <div className="relative group flex-1 z-2 flex items-stretch p-3">
          <div className="p-2 bg-white border-2 border-blue-default rounded-xl">
            <BriefcaseBusiness className="w-6 h-6 text-blue-default" />
          </div>
          <input
            className="w-full border-b-2 border-blue-default outline-none px-2 duration-200 ease-in hover:border-dark-blue"
            placeholder="Nghề nghiệp"
            onFocus={() => setInputTarget("industry")}
            onBlur={() => {
              setInputTarget("");
              outValue(inputValue);
            }}
            value={inputValue.industry}
            onChange={(e) =>
              setInputValue({ ...inputValue, industry: e.target.value })
            }
          />
          <div
            className={`absolute right-0 top-[105%] flex gap-px flex-col w-full max-h-0 rounded-xl border-2 border-blue-default bg-light-blue overflow-auto no-scroll ${inputTarget === "industry" ? "max-h-50" : "opacity-0 group-hover:max-h-50 group-hover:opacity-100"} duration-200 ease-in-out`}
          >
            {industryList.length > 0 ? (
              industryList.map((item) => (
                <button
                  key={item.value}
                  className="px-2 py-1 bg-white shrink-0 duration-200 ease-in hover:bg-blue-default hover:text-white"
                  onClick={() =>
                    outValue({ ...inputValue, industry: item.value })
                  }
                >
                  {item.name}
                </button>
              ))
            ) : (
              <p className="px-2 py-1 text-center bg-white">Không tìm thấy</p>
            )}
          </div>
        </div>
        <span className="h-full w-px bg-blue-default max-sm:hidden" />
        <div className="relative group flex-1 z-1 flex items-stretch p-3">
          <div className="p-2 bg-white border-2 border-blue-default rounded-xl">
            <MapPin className="w-6 h-6 text-blue-default" />
          </div>
          <input
            className="w-full border-b-2 border-blue-default outline-none px-2 duration-200 ease-in hover:border-dark-blue"
            placeholder="Vị trí"
            value={inputValue.location}
            onFocus={() => setInputTarget("location")}
            onBlur={() => {
              setInputTarget("");
              outValue(inputValue);
            }}
            onChange={(e) =>
              setInputValue({ ...inputValue, location: e.target.value })
            }
          />
          <div
            className={`absolute right-0 top-[105%] flex gap-px flex-col w-full max-h-0 rounded-xl border-2 border-blue-default bg-light-blue overflow-auto no-scroll ${inputTarget === "location" ? "max-h-50" : "opacity-0 group-hover:max-h-50 group-hover:opacity-100"} duration-200 ease-in-out`}
          >
            {locationList.length > 0 ? (
              locationList.map((item) => (
                <button
                  key={item.value}
                  className="px-2 py-1 bg-white text-start truncate shrink-0 duration-200 ease-in hover:bg-blue-default hover:text-white"
                  onClick={() =>
                    outValue({ ...inputValue, location: item.value })
                  }
                >
                  {item.name}
                </button>
              ))
            ) : (
              <p className="px-2 py-1 text-center bg-white">Không tìm thấy</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
