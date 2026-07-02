"use client";

import { List } from "lucide-react";
import { cn, handleSearch } from "../libs/utils";
import { useEffect, useMemo, useState } from "react";

type ListSearchValue<T, K extends keyof T, S extends keyof T> = {
  label?: string;
  className?: string;
  classAll?: string;
  classDisable?: string;
  classLabel?: string;
  placeholder?: string;
  listValue: T[] | null;
  attrSearch: S;
  attrGet: K;
  value: string;
  disable?: boolean;
  outValue: (value: T[K]) => void;
};

export default function ListSearch<T, K extends keyof T, S extends keyof T>({
  value = "",
  label,
  className,
  classAll,
  classDisable,
  classLabel,
  placeholder,
  listValue,
  attrSearch,
  attrGet,
  disable = false,
  outValue,
}: ListSearchValue<T, K, S>) {
  const [searchValue, setSearchValue] = useState<string>("");
  const [isFocus, setIsFocus] = useState(false);
  const [listSearch, setListSearch] = useState(listValue);

  const displayName = useMemo(() => {
    if (!value) return "";
    const found = listValue?.find(item => item[attrGet] === value);
    return found ? String(found[attrSearch] ?? "") : "";
  }, [value, listValue, attrGet, attrSearch]);

  useEffect(() => {
    setSearchValue(displayName);
  }, [displayName]);

  useEffect(() => {
    setListSearch(
      handleSearch({
        listSearch: listValue ?? null,
        attrSearch: attrSearch,
        value: searchValue.trim(),
      })
    );
  }, [searchValue, listValue, attrSearch]);

  return (
    <div
      className={
        disable
          ? cn(
              "relative flex flex-wrap bg-white items-stretch p-1 rounded-xl border-2 border-zinc-400 shadow-default min-w-50",
              classDisable, classAll
            )
          : cn(
              `group relative flex flex-wrap bg-white items-stretch p-1 rounded-xl border-2 border-blue-default shadow-default min-w-50`,
              className, classAll
            )
      }
    >
      <div
        className={cn(`flex w-30 items-center gap-2 px-2 rounded-xl font-bold shrink-0 ${disable ? "bg-zinc-300 text-white" : "bg-light-blue text-blue-default"}`, classLabel, classAll)}
      >
        <List className="w-5 h-5" />
        {label && <p className="flex-1 text-center">{label}</p>}
      </div>
      <input
        value={searchValue}
        type="text"
        disabled={disable}
        className="flex-1 px-2 min-w-50 outline-none"
        placeholder={placeholder}
        onFocus={() => !disable && setIsFocus(true)}
        onBlur={() => !disable && setIsFocus(false)}
        onChange={(e) => !disable && setSearchValue(e.target.value)}
      />
      <div
        className={cn(
          `absolute w-full top-full left-0 mt-1 flex flex-col bg-zinc-200 rounded-xl border-2 border-blue-default gap-px overflow-auto no-scroll ${isFocus ? "max-h-25 opacity-100" : "max-h-0 opacity-0"} duration-200 ease-in-out group-hover:max-h-25 group-hover:opacity-100`,
        )}
      >
        {!disable && listSearch && listSearch.length > 0 ? (
          listSearch.map((item, index) => (
            <button
              key={index}
              className="py-1 bg-white duration-200 ease-in hover:bg-blue-default hover:text-light-blue"
              onClick={(e) => {
                e.stopPropagation();
                outValue(item[attrGet]);
                setSearchValue(String(item[attrSearch]));
              }}
            >
              {String(item[attrSearch])}
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
  );
}
