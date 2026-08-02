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
  value: string[];
  label?: string;
  outValue: (value: string[]) => void;
};

// app/Component/InputSelectAddress.tsx
export default function InputSelectAddress({
  className,
  classAll,
  classDisable,
  classLabel,
  disabled = false,
  placeholder,
  listSearch,
  value = [],
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

  const findParent = (id: string) => {
    let list = [];
    let currentItem = parentMap.get(id);
    while (currentItem?.parent_id && parentMap.has(currentItem.parent_id)) {
      const item = parentMap.get(currentItem.parent_id)!;
      list.push(item.name);
      currentItem = item;
    }
    return list;
  };

  const selectedItems = useMemo(() => {
    return value.map((id) => ({
      name: parentMap.get(id)?.name || "",
      subName: findParent(id)?.join(", ") || "",
      value: id,
    }));
  }, [value, parentMap]);

  const handleAddSelected = (id: string) => {
    if (!value.includes(id)) {
      outValue([...value, id]);
    }
  };

  const handleRemoveSelected = (id: string) => {
    outValue(value.filter((v) => v !== id));
  };

  useEffect(() => {
    const time = setTimeout(() => {
      if (inputValue) {
        const firstValue = inputValue.split(", ")[0];
        const search = handleSearch(firstValue, listSearch, "name");
        if (search.length > 0) {
          const addSubName = search.map((item) => ({
            name: item.name,
            subName: findParent(item.parent_id)?.join(", ") || "",
            value: item.value,
          }));
          setListSuggest(addSubName);
        } else {
          setListSuggest([]);
        }
      } else {
        setListSuggest([]);
      }
    }, 300);
    return () => clearTimeout(time);
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
            ? cn("relative flex p-1 gap-2 items-center", classDisable, classAll)
            : cn(
                "group relative flex p-1 gap-2 items-center",
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
              setInputValue("");
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
                  handleAddSelected(item.value);
                  setInputValue("");
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
      {selectedItems && selectedItems.length > 0 && (
        <span className="w-full h-px bg-blue-default"></span>
      )}
      {selectedItems && selectedItems.length > 0 && (
        <div className={cn(`flex flex-col gap-1 bg-white p-1`, classAll)}>
          {selectedItems.map((item) => (
            <div
              key={item.value}
              className={cn(
                "flex items-center justify-between px-2 gap-2 bg-dim-blue rounded-2xl",
                classAll,
              )}
            >
              <p className="text-white">
                {item.name + (item.subName ? ", " + item.subName : "")}
              </p>
              <div className="flex h-full items-center">
                <button
                  className={cn(
                    "text-white duration-200 ease-in hover:bg-white hover:text-dim-blue cursor-pointer",
                    classAll,
                  )}
                  onClick={() => handleRemoveSelected(item.value)}
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
