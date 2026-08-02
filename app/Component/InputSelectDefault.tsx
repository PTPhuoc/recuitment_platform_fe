"use client";

import { useEffect, useMemo, useState } from "react";
import { cn, handleSearch } from "../libs/utils";
import { PenLine, X } from "lucide-react";

type InputSelectDefaultProps = {
  className?: string;
  classAll?: string;
  classLabel?: string;
  label?: string;
  classDisable?: string;
  disabled?: boolean;
  listSearch: { name: string; value: string }[];
  placeholder?: string;
  value: string[];
  outValue: (value: string[]) => void;
};

export default function InputSelectDefault({
  className,
  classAll,
  classDisable,
  classLabel,
  label,
  disabled = false,
  listSearch,
  placeholder,
  value = [],
  outValue,
}: InputSelectDefaultProps) {
  const [inputValue, setInputValue] = useState<string>("");
  const [listValue, setListValue] = useState(listSearch);
  const [isFocus, setIsFocus] = useState(false);

  const selectedItems = useMemo(() => {
    return value.map((v) => {
      const found = listSearch.find((item) => item.value === v);
      return { name: found?.name || "", value: v };
    });
  }, [value, listSearch]);

  const handleAddSelected = (item: { name: string; value: string }) => {
    if (!value.includes(item.value)) {
      outValue([...value, item.value]);
    }
  };

  const handleRemoveSelected = (item: { name: string; value: string }) => {
    outValue(value.filter((v) => v !== item.value));
  };

  useEffect(() => {
    setListValue(handleSearch(inputValue, listSearch, "name"));
  }, [inputValue, listSearch]);

  return (
    <div
      className={
        disabled
          ? cn(
              "flex flex-col bg-white border-2 border-zinc-300 rounded-2xl shadow-default",
              classDisable,
              classAll,
            )
          : cn(
              "flex flex-col bg-white border-2 border-blue-default rounded-2xl shadow-default",
              className,
              classAll,
            )
      }
    >
      <div
        className={
          disabled
            ? cn(
                "z-2 w-full left-0 relative flex flex-col p-1 gap-2 bg-white",
                classDisable,
                classAll,
              )
            : cn(
                "group z-2 w-full left-0 relative flex flex-col p-1 gap-2 bg-white",
                className,
                classAll,
              )
        }
      >
        <div className="flex gap-2 items-center">
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
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onClick={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              name={label}
              type="text"
              disabled={disabled}
              className="px-1 flex-1 outline-none min-w-50"
              placeholder={placeholder}
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
              disabled
              onClick={() => setInputValue("")}
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
        <div
          className={cn(
            `absolute z-3 w-full top-full left-0 mt-1 flex flex-col bg-zinc-200 rounded-xl border-2 border-blue-default gap-px overflow-auto no-scroll ${isFocus ? "max-h-25 opacity-100" : "max-h-0 opacity-0"} duration-200 ease-in-out group-hover:max-h-25 group-hover:opacity-100`,
          )}
        >
          {!disabled && listValue && listValue.length > 0 ? (
            listValue.map((item, index) => (
              <button
                key={index}
                className="py-1 bg-white duration-200 ease-in hover:bg-blue-default hover:text-light-blue cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddSelected(item);
                  setInputValue("");
                }}
              >
                {item.name}
              </button>
            ))
          ) : (
            <p className="text-center bg-white py-1">
              {listValue && listValue.length === 0
                ? "Danh sách trống"
                : "Không tìm thấy"}
            </p>
          )}
        </div>
      </div>
      {selectedItems && selectedItems.length > 0 && (
        <span className="w-full h-px bg-blue-default"></span>
      )}
      {selectedItems && selectedItems.length > 0 && (
        <div className={cn(`flex flex-wrap gap-1 bg-white p-1`, classAll)}>
          {selectedItems.map((item) => (
            <div
              key={item.value}
              className={cn(
                "flex items-center px-2 gap-2 bg-dim-blue rounded-2xl",
                classAll,
              )}
            >
              <p className="text-white">{item.name}</p>
              <div className="flex h-full items-center">
                <button
                  className={cn(
                    "text-white duration-200 ease-in hover:bg-white hover:text-dim-blue cursor-pointer",
                    classAll,
                  )}
                  onClick={() => handleRemoveSelected(item)}
                >
                  <X className="h-5 w-5 " />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
