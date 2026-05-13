"use client";

import { useEffect, useState } from "react";
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
  value?: string[];
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
  value,
  outValue,
}: InputSelectDefaultProps) {
  const [inputValue, setInputValue] = useState<string>("");
  const [selected, setSelected] = useState<{ name: string; value: string }[]>(
    [],
  );
  const [listValue, setListValue] = useState(listSearch);
  const [isFocus, setIsFocus] = useState(false);

  //Add item and aviod item had existed in list
  const handleAddSelected = (item: { name: string; value: string }) => {
    if (selected && selected.length > 0) {
      const isExist = selected.some((i) => i.value === item.value);
      if (!isExist) {
        setSelected([...selected, item]);
        outValue([...selected.map((i) => i.value), item.value]);
      }
    } else {
      setSelected([item]);
      outValue([item.value]);
    }
  };

  const handleRemoveSelected = (item: { name: string; value: string }) => {
    const newSelected = selected.filter((i) => i.value !== item.value);
    setSelected(newSelected);
    outValue(newSelected.map((i) => i.value));
  };

  useEffect(() => {
    if (value && value.length > 0) {
      const reSelected = value.map((item) => {
        const thisName = listSearch.find((i) => i.value === item)?.name || "";
        return {
          name: thisName,
          value: item,
        };
      });
      setSelected(reSelected);
    }
  }, [value]);

  useEffect(() => {
    setListValue(
      handleSearch({
        listSearch: listSearch ?? null,
        attrSearch: "name",
        value: inputValue,
      }),
    );
  }, [inputValue, listSearch]);

  return (
    <div
      className={cn(
        "flex flex-col border-2 border-blue-default rounded-2xl shadow-default",
        classAll,
      )}
    >
      <div
        className={
          disabled
            ? cn(
                "z-2 w-full left-0 relative flex flex-col p-1 gap-2 bg-zinc-200 rounded-2xl",
                classDisable,
                classAll,
              )
            : cn(
                "group z-2 w-full left-0 relative flex flex-col p-1 gap-2 bg-white rounded-2xl",
                className,
                classAll,
              )
        }
      >
        <div className="flex-1 flex gap-1 flex-wrap">
          <div
            className={cn(
              "flex w-30 items-center gap-2 px-2 rounded-xl bg-light-blue text-blue-default font-bold shrink-0",
              classLabel,
              classAll,
            )}
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
          <div className="flex h-full items-end">
            <button
              className={cn(
                "p-1 bg-blue-default rounded-xl text-light-blue border-2 border-blue-default scale-100 duration-200 ease-in hover:bg-light-blue hover:text-blue-default active:scale-95",
                classAll,
              )}
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
      {selected && selected.length > 0 && (
        <span className="w-full h-px bg-blue-default"></span>
      )}
      {selected && selected.length > 0 && (
        <div className={cn(`flex flex-wrap gap-1 bg-white p-1`, classAll)}>
          {selected.map((item) => (
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
