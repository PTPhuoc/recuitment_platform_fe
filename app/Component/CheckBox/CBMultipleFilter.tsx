import { cn } from "@/app/libs/utils";
import { Square, SquareDashed } from "lucide-react";

type CBFilterProps<T extends string | number> = {
  className?: string;
  lable: string;
  value: T[];
  defaultValue: T;
  outValue: (value: T[]) => void;
};

export default function CBMultipleFilter<T extends string | number>({
  className,
  lable,
  value,
  defaultValue,
  outValue,
}: CBFilterProps<T>) {
  const checked = value.some((item) => item === defaultValue);

  const handleOutValue = () => {
    if (checked) {
      outValue(value.filter((item) => item !== defaultValue));
    } else {
      outValue([...value, defaultValue]);
    }
  };

  return (
    <button
      className={cn(
        "group flex items-center gap-2 bg-white rounded-2xl px-3 py-1 cursor-pointer",
        className,
      )}
      onClick={(e) => {
        e.preventDefault();
        handleOutValue();
      }}
    >
      {!checked && <SquareDashed className="w-5 h-5 group-hover:hidden" />}
      <div
        className={`relative w-5 h-5 ${!checked && "hidden group-hover:block"}`}
      >
        <Square
          className={`absolute w-full h-full z-2 ${
            checked && "text-white"
          } duration-200 ease-in-out`}
        />
        <div
          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full z-1 rounded-sm duration-200 ease-in-out ${
            checked ? "scale-130 bg-blue-default" : "scale-0 bg-white"
          }`}
        ></div>
      </div>
      <p>{lable}</p>
    </button>
  );
}
