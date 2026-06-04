"use client";

import React from "react";
import { cn } from "../libs/utils";

type InputCheckProps = {
  className?: string;
  classDisable?: string;
  classAll?: string;
  classLabel?: string;
  disabled?: boolean;
  label?: string;
  value: boolean;
  outValue: (value: boolean) => void;
};

// app/Component/InputCheckDefault.tsx
export default function InputCheckDefault({
  className,
  classDisable,
  classAll,
  classLabel,
  disabled = false,
  label,
  value = false,
  outValue,
}: InputCheckProps) {
  const id = React.useId();

  return (
    <div
      className={
        disabled
          ? cn(
              "flex p-1 gap-2 items-center self-start bg-white border-2 border-zinc-300 rounded-2xl shadow-default",
              classDisable,
              classAll,
            )
          : cn(
              "flex p-1 gap-2 items-center self-start bg-white border-2 border-blue-default rounded-2xl shadow-default",
              className,
              classAll,
            )
      }
    >
      {label && (
        <label
          htmlFor={id}
          className={
            disabled
              ? cn("cursor-not-allowed", classLabel, classDisable, classAll)
              : cn("cursor-pointer", classLabel, classAll)
          }
        >
          {label}
        </label>
      )}
      <div className="flex items-center checkbox-wrapper-2">
        <input
          id={id}
          type="checkbox"
          className="sc-gJwTLC ikxBAC"
          checked={value}
          disabled={disabled}
          onChange={(e) => outValue(e.target.checked)}
        />
      </div>
    </div>
  );
}
