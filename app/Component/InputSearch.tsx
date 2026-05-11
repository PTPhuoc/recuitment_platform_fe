"use client";

import { useEffect, useState } from "react";
import { cn } from "../libs/utils";
import { Search, X } from "lucide-react";

type InputValue = {
  lable?: string;
  className?: string;
  outValue: (value: string) => void;
};

export default function InputSearch({
  lable,
  className,
  outValue,
}: InputValue) {
  const [valueInput, setValueInput] = useState("");

  useEffect(() => {
    const time = setTimeout(() => {
      const value = typeof valueInput === "string" ? valueInput.trim() : "";
      outValue(value);
    }, 1000);
    return () => clearTimeout(time);
  }, [valueInput]);

  return (
    <div
      className={cn(
        "flex h-10 p-1 gap-2 items-stretch bg-white border-2 border-blue-default rounded-2xl shadow-default",className
      )}
    >
      <div className="flex items-center gap-2 px-2 rounded-xl bg-light-blue text-blue-default font-bold">
        <Search className="h-5 w-5" />
        {lable && <p>{lable}</p>}
      </div>

      <input
        className="w-full outline-none"
        type="text"
        value={valueInput}
        onChange={(e) => setValueInput(e.target.value)}
      />
      <button
        className="px-2 bg-blue-default rounded-xl text-light-blue border-2 border-blue-default scale-100 duration-200 ease-in hover:bg-light-blue hover:text-blue-default active:scale-95"
        onClick={() => {
          setValueInput("");
          outValue("");
        }}
      >
        <X className="h-5 w-5" />
      </button>
    </div>
  );
}
