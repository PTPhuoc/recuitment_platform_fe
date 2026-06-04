"use client";

import { PenLine, X } from "lucide-react";
import { cn } from "../libs/utils";

type InputProps = {
  className?: string;
  classLabel?: string;
  classDisable?: string;
  classAll?: string;
  disabled?: boolean;
  placeholder?: string;
  value?: string;
  label?: string;
  regex?: RegExp;
  outValue: (value: string) => void;
};

export default function InputTextDefault({
  className,
  classLabel,
  classDisable,
  classAll,
  disabled = false,
  placeholder,
  value = "",
  label,
  regex,
  outValue,
}: InputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (regex) {
      outValue(newValue.replace(regex, ""));
    } else {
      outValue(newValue);
    }
  };

  return (
    <div
      className={
        disabled
          ? cn(
              "flex p-1 gap-2 items-center bg-white border-2 border-zinc-300 rounded-2xl shadow-default",
              classDisable,
              classAll,
            )
          : cn(
              "flex p-1 gap-2 items-center bg-white border-2 border-blue-default rounded-2xl shadow-default",
              className,
              classAll,
            )
      }
    >
      <div className="flex-1 flex gap-1 flex-wrap">
        <div
          className={
            disabled
              ? cn(
                  "flex w-30 items-center gap-2 px-2 rounded-xl bg-zinc-300 text-white font-bold shrink-0",
                  classLabel,
                  classDisable,
                  classAll,
                )
              : cn(
                  "flex w-30 items-center gap-2 px-2 rounded-xl bg-light-blue text-blue-default font-bold shrink-0",
                  classLabel,
                  classAll,
                )
          }
        >
          <PenLine className="w-5 h-5 max-lg:hidden" />
          {label && <p className="flex-1 text-center">{label}</p>}
        </div>
        <input
          value={value}
          name={label}
          type="text"
          disabled={disabled}
          className="px-1 flex-1 outline-none min-w-50"
          placeholder={placeholder}
          onChange={handleChange}
        />
      </div>
      <div className="flex h-full items-end">
        <button
          className={
            disabled
              ? cn(
                  "p-1 bg-zinc-300 rounded-xl text-white border-2 border-zinc-300 scale-100 duration-200 ease-in",
                  classDisable,
                  classAll,
                )
              : cn(
                  "p-1 bg-blue-default rounded-xl text-light-blue border-2 border-blue-default scale-100 duration-200 ease-in hover:bg-light-blue hover:text-blue-default active:scale-95",
                  classAll,
                )
          }
          disabled={disabled}
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
