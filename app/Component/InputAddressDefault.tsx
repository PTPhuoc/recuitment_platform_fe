"use client";

import React, { useEffect, useMemo, useState } from "react";
import { cn, handleSearch } from "../libs/utils";
import { MapPin, X } from "lucide-react";

type InputAddressProps = {
  className?: string;
  classAll?: string;
  classDisable?: string;
  classLabel?: string;
  disabled?: boolean;
  placeholder?: string;
  listSearch: { name: string; value: string; parent_id: string }[];
  value?: string;
  label?: string;
  outValue: (value: string) => void;
};

// app/Component/InputAddressDefault.tsx
export default function InputAddressDefault({
  className,
  classAll,
  classDisable,
  classLabel,
  disabled = false,
  placeholder,
  listSearch,
  value,
  label,
  outValue,
}: InputAddressProps) {
  const [inputValue, setInputValue] = useState<string>("");
  const [listSuggest, setListSuggest] = useState<
    { name: string; subName: string; value: string }[]
  >([]);
  const [isFocus, setIsFocus] = useState(false);

  const parentMap = useMemo(() => {
    const map = new Map<string, { name: string; parent_id: string }>();
    listSearch.forEach((item) =>
      map.set(item.value, { name: item.name, parent_id: item.parent_id }),
    );
    return map;
  }, [listSearch]);

  const findParent = (parentId: string) => {
    let list = [];
    let currentId = parentId;
    while (currentId && parentMap.has(currentId)) {
      const item = parentMap.get(currentId)!;
      list.push(item.name);
      currentId = item.parent_id;
    }
    return list;
  };

  useEffect(() => {
    const time = setTimeout(() => {
      const search = handleSearch({
        listSearch: listSearch ?? null,
        attrSearch: "name",
        value: inputValue,
      });
      if (search.length > 0) {
        const addSubName = search.map((item) => {
          return {
            name: item.name,
            subName: findParent(item.parent_id)?.join(", ") || "",
            value: item.value,
          };
        });
        setListSuggest(addSubName);
      }
    }, 300);
    return () => clearTimeout(time);
  }, [inputValue, listSearch]);

  return (
    <div className={cn("flex flex-col gap-1", classAll)}>
      <div
        className={
          disabled
            ? cn(
                "relative flex p-1 gap-2 items-center bg-zinc-200 border-2 border-zinc-300 rounded-2xl shadow-default",
                classDisable,
                classAll,
              )
            : cn(
                "group relative flex p-1 gap-2 items-center bg-white border-2 border-blue-default rounded-2xl shadow-default",
                className,
                classAll,
              )
        }
      >
        <div className="flex-1 flex gap-1 flex-wrap">
          <div
            className={cn(
              `flex w-30 items-center gap-2 px-2 rounded-xl font-bold shrink-0 ${disabled ? "bg-zinc-300 text-white" : "bg-light-blue text-blue-default"}`,
              classLabel,
              classAll,
            )}
          >
            <MapPin className="w-5 h-5 max-lg:hidden" />
            {label && <p className="flex-1 text-center">{label}</p>}
          </div>
          <input
            value={inputValue}
            name={label}
            type="text"
            disabled={disabled}
            className="px-1 flex-1 outline-none min-w-50"
            placeholder={placeholder}
            onChange={(e) => setInputValue(e.target.value)}
            onClick={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
          />
        </div>
        <div className="flex h-full items-end">
          <button
            className={cn(
              "p-1 bg-blue-default rounded-xl text-light-blue border-2 border-blue-default scale-100 duration-200 ease-in hover:bg-light-blue hover:text-blue-default active:scale-95",
              classAll,
            )}
            onClick={() => {
              setInputValue("");
              outValue("");
            }}
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div
          className={cn(
            `absolute w-full top-full left-0 mt-1 flex flex-col bg-zinc-200 rounded-xl border-2 border-blue-default gap-px overflow-auto no-scroll ${isFocus ? "max-h-25 opacity-100" : "max-h-0 opacity-0"} duration-200 ease-in-out group-hover:max-h-25 group-hover:opacity-100`,
          )}
        >
          {!disabled && inputValue && listSuggest && listSuggest.length > 0 ? (
            listSuggest.map((item, index) => (
              <button
                key={index}
                className="flex flex-col items-start p-1 bg-white duration-200 ease-in hover:bg-blue-default hover:text-light-blue"
                onClick={(e) => {
                  e.stopPropagation();
                  setInputValue(
                    item.name + (item.subName ? ", " + item.subName : ""),
                  );
                  outValue(item.value);
                }}
              >
                <p className="font-bold">{item.name}</p>
                <p>{item.subName}</p>
              </button>
            ))
          ) : (
            <p className="text-center bg-white py-1">
              {!inputValue ? "Nhập điểm tìm kiếm" : "Không tìm thấy điểm"}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
