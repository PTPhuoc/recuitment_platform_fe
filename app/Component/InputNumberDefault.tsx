"use client";

import { cn } from "../libs/utils";
import { PenLine, X } from "lucide-react";

type InputNumberProps = {
  className?: string;
  classDisable?: string;
  placeholder?: string;
  value?: number | "";
  lable?: string;
  outValue: (value: number | "") => void;
  disabled?: boolean;
  max?: number;
  min?: number;
};

export default function InputNumberDefault({
  className,
  classDisable,
  placeholder,
  value,
  lable,
  outValue,
  disabled,
  max,
  min,
}: InputNumberProps) {
  const handleOutValue = (
    e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) => {
    const newValue = e.target.value.replace(/[^0-9]/g, "");
    const parsedValue = parseInt(newValue, 10);
    if (!isNaN(parsedValue)) {
      if (max !== undefined && parsedValue > max) {
        outValue(max);
      } else if (min !== undefined && parsedValue < min) {
        outValue(min);
      } else {
        outValue(parsedValue);
      }
    } else {
      outValue("");
    }
  };

  return (
    <div
      className={
        disabled
          ? cn(
              "flex p-1 gap-2 items-center bg-white border-2 border-zinc-200 rounded-2xl shadow-default",
              classDisable,
            )
          : cn(
              "flex p-1 gap-2 items-center bg-white border-2 border-blue-default rounded-2xl shadow-default",
              className,
            )
      }
    >
      <div className="flex-1 flex gap-1 flex-wrap">
        <div
          className={`flex w-30 items-center gap-2 px-2 rounded-xl ${disabled ? "bg-zinc-300 text-white" : "bg-light-blue text-blue-default"}  font-bold shrink-0 ease-in duration-200`}
        >
          <PenLine className="w-5 h-5 max-lg:hidden" />
          {lable && <p className="flex-1 text-center">{lable}</p>}
        </div>
        <input
          value={value}
          name={lable}
          type="text"
          className="px-1 flex-1 outline-none min-w-50"
          placeholder={placeholder}
          onChange={(e) => handleOutValue(e)}
        />
      </div>
      <div className="flex h-full items-end">
        <button
          className="p-1 bg-blue-default rounded-xl text-light-blue border-2 border-blue-default scale-100 duration-200 ease-in hover:bg-light-blue hover:text-blue-default active:scale-95"
          onClick={() => {
            outValue("");
          }}
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
