"use client";

import React from "react";
import { cn } from "../libs/utils";

type TextAreaProps = {
  className?: string;
  classDisable?: string;
  classAll?: string;
  classLabel?: string;
  disabled?: boolean;
  label?: string;
  value: string;
  outValue: (value: string) => void;
};

export default function TextAreaDefault({
  classAll,
  className,
  classDisable,
  classLabel,
  disabled,
  label,
  value,
  outValue,
}: TextAreaProps) {
  return (
    <div
      className={
        disabled
          ? cn(
              "flex flex-col p-1 bg-white border-2 border-zinc-300 rounded-2xl shadow-default overflow-hidden h-50",
              classDisable,
              classAll,
            )
          : cn(
              "flex flex-col p-1 bg-white border-2 border-blue-default rounded-2xl shadow-default overflow-hidden h-50",
              className,
              classAll,
            )
      }
    >
      {label && (
        <label
          className={
            disabled
              ? cn(
                  "text-center px-2 bg-zinc-300 text-white font-bold self-start rounded-2xl duration-200 ease-in",
                  classLabel,
                  classDisable,
                  classAll,
                )
              : cn(
                  "text-center px-2 bg-light-blue font-bold text-blue-default self-start rounded-2xl duration-200 ease-in",
                  classLabel,
                )
          }
        >
          {label}
        </label>
      )}
      <textarea
        className="flex-1 p-2 rounded-2xl outline-none scroll-box"
        value={value}
        onChange={(e) => outValue(e.target.value)}
        disabled={disabled}
      ></textarea>
    </div>
  );
}
