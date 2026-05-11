"use client";
import { useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";
import { vi } from "date-fns/locale";
import { CalendarDays } from "lucide-react";
import { cn } from "../libs/utils";

type PageProps = {
  className?: string;
  dateValue?: Date;
  maxCurrentYear?: boolean;
  outValue: (value: Date | "") => void;
};

export default function DatePicker({
  className,
  dateValue,
  maxCurrentYear = false,
  outValue,
}: PageProps) {
  const currentDate = new Date();
  const [inputValue, setInputValue] = useState<{
    date: number | "";
    month: number | "";
    year: number | "";
  }>(
    (() => {
      if (dateValue) {
        return {
          date: dateValue.getDate(),
          month: dateValue.getMonth() + 1,
          year: dateValue.getFullYear(),
        };
      } else {
        return {
          date: "",
          month: "",
          year: "",
        };
      }
    })(),
  );
  const [isDate, setIsDate] = useState({
    match: true,
    message: "",
  });
  const [selected, setSelected] = useState<Date>();
  const [isOpen, setIsOpen] = useState(false);

  const mathValueDate = (value: string) => {
    if (value === "") return "";
    const number = Number(value);
    if (number < 1) return 1;
    if (number > 32) return 32;
    return number;
  };

  const mathValueMonth = (value: string) => {
    if (value === "") return "";
    const number = Number(value);
    if (number < 1) return 1;
    if (number > 12) return 12;
    return number;
  };

  const mathValueYear = (value: string) => {
    if (value === "") return "";
    const number = Number(value);
    const currentYear = currentDate.getFullYear();
    if (number < 1800) return 1800;
    if (maxCurrentYear && number > currentYear) return currentYear;
    if (number > currentYear + 50) return currentYear + 50;
    return number;
  };

  const termValueYear = (value: string) => {
    if (value === "") return "";
    const number = Number(value);
    const currentYear = currentDate.getFullYear();
    if (maxCurrentYear && number > currentYear) return currentYear;
    if (number > currentYear + 50) return currentYear + 50;
    return number;
  };

  const handleDateSelect = (value: Date | undefined) => {
    if (value) {
      setInputValue({
        date: value.getDate(),
        month: value.getMonth() + 1,
        year: value.getFullYear(),
      });
      setSelected(value);
      outValue(value);
    }
  };

  useEffect(() => {
    if (inputValue.date && inputValue.month && inputValue.year) {
      const matchDate = new Date(
        inputValue.year,
        inputValue.month - 1,
        inputValue.date,
      );
      if (inputValue.date !== matchDate.getDate()) {
        const dateInMonth = new Date(
          inputValue.year,
          inputValue.month,
          0,
        ).getDate();
        setIsDate({
          match: false,
          message: `Tháng ${inputValue.month} chỉ có ${dateInMonth} ngày`,
        });
        outValue("");
      } else {
        setIsDate({ match: true, message: "" });
        const newDate = new Date(
          inputValue.year,
          inputValue.month - 1,
          inputValue.date,
        );
        setSelected(newDate);
        outValue(newDate);
      }
    } else {
      outValue("");
    }
  }, [inputValue]);

  return (
    <div
      className={cn(
        "group relative flex items-stretch min-w-50 h-10 p-1 rounded-xl border-2 border-blue-default",
        className,
      )}
    >
      <p
        className={`absolute z-1 left-0 px-1 mb-1 rounded-sm w-full text-white bg-red-400 transition-all duration-200 ease-in-out ${isDate.match ? "bottom-0" : "bottom-full"}`}
      >
        {isDate.message}
      </p>
      <div className="flex-1 flex gap-2 items-stretch z-2">
        <div className="flex items-center gap-2 px-2 rounded-xl bg-light-blue text-blue-default font-bold">
          <CalendarDays className="h-5 w-5" />
        </div>
        <div className="flex items-center gap-1">
          <input
            type="text"
            inputMode="numeric"
            value={inputValue.date}
            className="w-7 outline-none text-center"
            onFocus={() => setIsOpen(true)}
            onBlur={() => setIsOpen(false)}
            onChange={(e) => {
              let val = e.target.value;
              val = val.replace(/[^0-9]/g, "");
              setInputValue({ ...inputValue, date: mathValueDate(val) });
            }}
          />
          <p>/</p>
          <input
            type="text"
            inputMode="numeric"
            value={inputValue.month}
            className="w-7 outline-none text-center"
            onFocus={() => setIsOpen(true)}
            onBlur={() => setIsOpen(false)}
            onChange={(e) => {
              let val = e.target.value;
              val = val.replace(/[^0-9]/g, "");
              setInputValue({ ...inputValue, month: mathValueMonth(val) });
            }}
          />
          <p>/</p>
          <input
            type="text"
            inputMode="numeric"
            value={inputValue.year}
            className="w-7 outline-none text-center"
            onFocus={() => setIsOpen(true)}
            onChange={(e) => {
              let val = e.target.value;
              val = val.replace(/[^0-9]/g, "");
              setInputValue({ ...inputValue, year: termValueYear(val) });
            }}
            onBlur={(e) => {
              let val = e.target.value;
              val = val.replace(/[^0-9]/g, "");
              setInputValue({ ...inputValue, year: mathValueYear(val) });
              setIsOpen(false);
            }}
          />
        </div>
      </div>
      <div
        className={cn(
          `absolute w-full top-full left-0 mt-1 z-1 bg-white rounded-xl border-2 border-transparent duration-200 ease-in group-hover:border-blue-default ${isOpen && "border-blue-default"}`,
        )}
      >
        <div
          className={cn(
            `overflow-hidden duration-200 ease-in-out max-h-0 group-hover:max-h-80 ${isOpen && "max-h-80"}`,
          )}
        >
          <DayPicker
            mode="single"
            selected={selected}
            onSelect={(value) => handleDateSelect(value)}
            locale={vi}
            className="p-1 min-h-50"
            classNames={{
              caption_label: "p-1 bg-blue-default text-white rounded-sm",
              month_grid: "w-full",
              months: "w-full",
              day_button:
                "w-full text-center p-1 rounded-sm duration-200 ease-in hover:bg-blue-default hover:text-white",
              focused: "bg-blue-default text-white rounded-sm",
              weekdays: "text-blue-default",
            }}
          />
        </div>
      </div>
    </div>
  );
}
