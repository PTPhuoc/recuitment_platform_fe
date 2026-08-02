import CBSingleFilter from "@/app/Component/CheckBox/CBSingleFilter";
import { Triangle } from "lucide-react";

type SalaryFilterProps = {
  value: string;
  isOpen: boolean;
  outStatus: (value: boolean) => void;
  outValue: (value: string) => void;
};

// app/(client)/jobs/SalaryFilter.tsx
export default function SalaryFilter({
  value,
  isOpen,
  outStatus,
  outValue,
}: SalaryFilterProps) {
  return (
    <div className="flex flex-col bg-zinc-200 rounded-2xl">
      <button
        className="group flex items-center justify-between px-3 py-1 rounded-2xl border-2 border-blue-default bg-white"
        onClick={() => outStatus(!isOpen)}
      >
        <p className="text-2xl font-bold">Mức Lương</p>
        <Triangle
          className={`w-5 h-5 cursor-pointer duration-200 ease-in-out ${isOpen ? "rotate-180 fill-dark-blue" : "fill-white group-hover:rotate-180"}`}
        />
      </button>
      <div
        className={`flex overflow-auto mx-2 gap-2 no-scroll duration-200 ease-in-out ${isOpen ? "max-h-50 my-2" : "max-h-0 my-0"}`}
      >
        <div className="flex-1 flex flex-col gap-2">
          <CBSingleFilter
            lable="Thỏa thuận"
            className="rounded-xl"
            value={value}
            defaultValue="0"
            outValue={(value) => outValue(value ? value : "")}
          />
          <CBSingleFilter
            lable="Dưới 5 triệu"
            className="rounded-xl"
            value={value}
            defaultValue="+5000000"
            outValue={(value) => outValue(value ? value : "")}
          />
          <CBSingleFilter
            lable="5 - 10 triệu"
            className="rounded-xl"
            value={value}
            defaultValue="5000000-10000000"
            outValue={(value) => outValue(value ? value : "")}
          />
          <CBSingleFilter
            lable="10 - 15 triệu"
            className="rounded-xl"
            value={value}
            defaultValue="10000000-15000000"
            outValue={(value) => outValue(value ? value : "")}
          />
          <CBSingleFilter
            lable="15 - 20 triệu"
            className="rounded-xl"
            value={value}
            defaultValue="15000000-20000000"
            outValue={(value) => outValue(value ? value : "")}
          />
          <CBSingleFilter
            lable="20 - 25 triệu"
            className="rounded-xl"
            value={value}
            defaultValue="20000000-25000000"
            outValue={(value) => outValue(value ? value : "")}
          />
        </div>
        <div className="flex-1 flex flex-col gap-2">
          <CBSingleFilter
            lable="25 - 30 triệu"
            className="rounded-xl"
            value={value}
            defaultValue="25000000-30000000"
            outValue={(value) => outValue(value ? value : "")}
          />
          <CBSingleFilter
            lable="30 - 35 triệu"
            className="rounded-xl"
            value={value}
            defaultValue="30000000-35000000"
            outValue={(value) => outValue(value ? value : "")}
          />
          <CBSingleFilter
            lable="35 - 40 triệu"
            className="rounded-xl"
            value={value}
            defaultValue="35000000-40000000"
            outValue={(value) => outValue(value ? value : "")}
          />
          <CBSingleFilter
            lable="40 - 45 triệu"
            className="rounded-xl"
            value={value}
            defaultValue="40000000-45000000"
            outValue={(value) => outValue(value ? value : "")}
          />
          <CBSingleFilter
            lable="45 - 50 triệu"
            className="rounded-xl"
            value={value}
            defaultValue="40000000-50000000"
            outValue={(value) => outValue(value ? value : "")}
          />
          <CBSingleFilter
            lable="Trên 50 triệu"
            className="rounded-xl"
            value={value}
            defaultValue="50000000+"
            outValue={(value) => outValue(value ? value : "")}
          />
        </div>
      </div>
    </div>
  );
}
