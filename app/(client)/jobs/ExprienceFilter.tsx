import CBSingleFilter from "@/app/Component/CheckBox/CBSingleFilter";
import { Triangle } from "lucide-react";

type ExprienceFilterProps = {
  value: string;
  isOpen: boolean;
  outStatus: (value: boolean) => void;
  outValue: (value: string) => void;
};

// app/(client)/jobs/ExprienceFilter.tsx
export default function ExprienceFilter({
  value,
  isOpen,
  outStatus,
  outValue,
}: ExprienceFilterProps) {
  return (
    <div className="flex flex-col bg-zinc-200 rounded-2xl">
      <button
        className="group flex items-center justify-between px-3 py-1 rounded-2xl border-2 border-blue-default bg-white"
        onClick={() => outStatus(!isOpen)}
      >
        <p className="text-2xl font-bold">Kinh nghiệm</p>
        <Triangle
          className={`w-5 h-5 cursor-pointer duration-200 ease-in-out ${isOpen ? "rotate-180 fill-dark-blue" : "fill-white group-hover:rotate-180"}`}
        />
      </button>
      <div
        className={`flex flex-col overflow-auto mx-2 gap-2 no-scroll duration-200 ease-in-out ${isOpen ? "max-h-50 my-2" : "max-h-0 my-0"}`}
      >
        <CBSingleFilter
          lable="Không yêu cầu"
          className="rounded-xl"
          value={value}
          defaultValue="0"
          outValue={(value) => outValue(value ? value : "")}
        />
        <CBSingleFilter
          lable="1 năm"
          className="rounded-xl"
          value={value}
          defaultValue="1"
          outValue={(value) => outValue(value ? value : "")}
        />
        <CBSingleFilter
          lable="2 năm"
          className="rounded-xl"
          value={value}
          defaultValue="2"
          outValue={(value) => outValue(value ? value : "")}
        />
        <CBSingleFilter
          lable="3 năm"
          className="rounded-xl"
          value={value}
          defaultValue="3"
          outValue={(value) => outValue(value ? value : "")}
        />
        <CBSingleFilter
          lable="4 năm"
          className="rounded-xl"
          value={value}
          defaultValue="4"
          outValue={(value) => outValue(value ? value : "")}
        />
        <CBSingleFilter
          lable="5+ năm"
          className="rounded-xl"
          value={value}
          defaultValue="5+"
          outValue={(value) => outValue(value ? value : "")}
        />
      </div>
    </div>
  );
}
