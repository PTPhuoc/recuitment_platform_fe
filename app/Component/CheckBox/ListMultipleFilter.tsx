"use client";

import CBMultipleFilter from "@/app/Component/CheckBox/CBMultipleFilter";
import { cn } from "@/app/libs/utils";
import { Triangle } from "lucide-react";
import { useMemo } from "react";

type ListMultipleFilterProps = {
  className?: string;
  value: string[];
  lable: string;
  isOpen: boolean;
  categories: { name: string; value: string; slug: string }[];
  outStatus: (value: boolean) => void;
  outValue: (value: string[]) => void;
};

// app/(client)/CheckBox/ListMultipleFilter.tsx
export default function ListMultipleFilter({
  className,
  value,
  isOpen,
  lable,
  categories,
  outStatus,
  outValue,
}: ListMultipleFilterProps) {
  const lableMap = useMemo(() => {
    const map = new Map<string, string>();
    categories.forEach((item) => map.set(item.value, item.name));
    return map;
  }, [categories]);

  const findLable = (value: string[]) => {
    return value.map((item) => lableMap.get(item)).join(", ");
  };

  return (
    <div className="flex flex-col bg-zinc-200 rounded-2xl">
      <button
        className={cn(
          "group flex items-center justify-between px-3 py-1 rounded-2xl border-2 border-blue-default bg-white",
          className,
        )}
        onClick={() => outStatus(!isOpen)}
      >
        <div className="flex items-center gap-2">
          <p className="text-2xl font-bold">{lable}</p>
          {value.length > 0 && (
            <>
              <span>-</span>
              <p className="truncate">{findLable(value)}</p>
            </>
          )}
        </div>
        <Triangle
          className={`w-5 h-5 cursor-pointer duration-200 ease-in-out ${isOpen ? "rotate-180 fill-dark-blue" : "fill-white group-hover:rotate-180"}`}
        />
      </button>
      <div
        className={`flex flex-col overflow-auto mx-2 gap-2 no-scroll duration-200 ease-in-out ${isOpen ? "max-h-50 my-2" : "max-h-0 my-0"}`}
      >
        {categories.map((item) => (
          <CBMultipleFilter
            key={item.value}
            lable={item.name}
            className="rounded-xl"
            value={value}
            defaultValue={item.value}
            outValue={(value) => outValue(value)}
          />
        ))}
      </div>
    </div>
  );
}
