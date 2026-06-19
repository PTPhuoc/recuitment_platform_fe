"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
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

  const currentValueRef = useRef<string | undefined>(value);

  const parentMap = useMemo(() => {
    const map = new Map<string, { name: string; parent_id: string }>();
    listSearch.forEach((item) =>
      map.set(item.value, { name: item.name, parent_id: item.parent_id }),
    );
    return map;
  }, [listSearch]);

  const findParent = (parentId: string) => {
    const list = [];
    let currentId = parentId;
    while (currentId && parentMap.has(currentId)) {
      const item = parentMap.get(currentId)!;
      list.push(item.name);
      currentId = item.parent_id;
    }
    return list;
  };

  useEffect(() => {
    if (value !== currentValueRef.current) {
      currentValueRef.current = value;
      if (value) {
        const listParent = findParent(value);
        const name =
          listParent.length > 0
            ? listParent.join(", ")
            : listSearch.find((item) => item.value === value)?.name || "";
        setInputValue(name);
      } else {
        setInputValue("");
      }
    }
  }, [value, listSearch, findParent]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleBlur = () => {
    setIsFocus(false);
    const trimmed = inputValue.trim();
    if (trimmed) {
      const matched = listSearch.find(
        (item) => item.name.toLowerCase() === trimmed.toLowerCase(),
      );
      if (matched) {
        outValue(matched.value);
        currentValueRef.current = matched.value;
      } else {
        outValue("");
        currentValueRef.current = "";
      }
    } else {
      outValue("");
      currentValueRef.current = "";
    }
  };

  const handleSelect = (item: {
    name: string;
    subName: string;
    value: string;
  }) => {
    const fullName = item.name + (item.subName ? ", " + item.subName : "");
    setInputValue(fullName);
    outValue(item.value);
    currentValueRef.current = item.value;
    setIsFocus(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputValue) {
        const firstValue = inputValue.split(", ")[0];
        const search = handleSearch({
          listSearch: listSearch ?? null,
          attrSearch: "name",
          value: firstValue,
        });
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
    return () => clearTimeout(timer);
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
              `flex w-30 items-center gap-2 px-2 rounded-xl font-bold shrink-0 ${
                disabled
                  ? "bg-zinc-300 text-white"
                  : "bg-light-blue text-blue-default"
              }`,
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
            onChange={handleInputChange}
            onFocus={() => setIsFocus(true)}
            onBlur={handleBlur}
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
              currentValueRef.current = "";
            }}
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div
          className={cn(
            `absolute w-full top-full left-0 mt-1 flex flex-col bg-zinc-200 rounded-xl border-2 border-blue-default gap-px overflow-auto no-scroll ${
              isFocus ? "max-h-25 opacity-100" : "max-h-0 opacity-0"
            } duration-200 ease-in-out group-hover:max-h-25 group-hover:opacity-100`,
          )}
        >
          {!disabled && inputValue && listSuggest && listSuggest.length > 0 ? (
            listSuggest.map((item, index) => (
              <button
                key={index}
                className="flex flex-col items-start p-1 bg-white duration-200 ease-in hover:bg-blue-default hover:text-light-blue"
                onClick={() => handleSelect(item)}
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
