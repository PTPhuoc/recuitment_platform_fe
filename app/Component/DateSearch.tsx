"use client";
import { useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";
import { vi } from "date-fns/locale";
import { CalendarDays } from "lucide-react";
import { cn } from "../libs/utils";

type PageProps = {
  classAll?: string;
  classDisable?: string;
  className?: string;
  classLabel?: string;
  label?: string;
  disabled?: boolean;
  dateValue?: Date | string | "";
  maxCurrentYear?: boolean;
  outValue: (value: Date | "") => void;
};

export default function DatePicker({
  className,
  classAll,
  classDisable,
  classLabel,
  label,
  disabled = false,
  dateValue,
  maxCurrentYear = false,
  outValue,
}: PageProps) {
  const currentDate = new Date();
  const [inputValue, setInputValue] = useState<{
    date: number | "";
    month: number | "";
    year: number | "";
  }>({ date: "", month: "", year: "" });
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
    if (dateValue && dateValue !== "") {
      const converDate = new Date(dateValue);
      setInputValue({
        date: converDate.getDate(),
        month: converDate.getMonth() + 1,
        year: converDate.getFullYear(),
      });
      setSelected(converDate);
    } else {
      setInputValue({
        date: "",
        month: "",
        year: "",
      });
      setSelected(undefined);
    }
  }, [dateValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.replace(/[^0-9]/g, "");
    setInputValue({ ...inputValue, [e.target.name]: newValue });
  };

  const handleOutValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (e.target.name === "date") {
      const matchDate = mathValueDate(value);
      setInputValue({ ...inputValue, date: matchDate });
      if (inputValue.month && inputValue.year && matchDate) {
        const newDate = new Date(
          inputValue.year,
          inputValue.month - 1,
          matchDate,
        );
        setSelected(newDate);
        outValue(newDate);
      } else {
        outValue("");
      }
    }
    if (e.target.name === "month") {
      const matchMonth = mathValueMonth(value);
      setInputValue({ ...inputValue, month: matchMonth });
      if (inputValue.date && inputValue.year && matchMonth) {
        const newDate = new Date(
          inputValue.year,
          matchMonth - 1,
          inputValue.date,
        );
        setSelected(newDate);
        outValue(newDate);
      } else {
        outValue("");
      }
    }
    if (e.target.name === "year") {
      const matchYear = mathValueYear(value);
      setInputValue({ ...inputValue, year: matchYear });
      if (inputValue.date && inputValue.month && matchYear) {
        const newDate = new Date(
          matchYear,
          inputValue.month - 1,
          inputValue.date,
        );
        setSelected(newDate);
        outValue(newDate);
      } else {
        outValue("");
      }
    }
  };

  return (
    <div
      className={
        disabled
          ? cn(
              "relative flex items-stretch min-w-50 h-10 p-1 rounded-xl border-2 border-zinc-300",
              classDisable,
              classAll,
            )
          : cn(
              "group relative flex items-stretch min-w-50 h-10 p-1 rounded-xl border-2 border-blue-default",
              className,
              classAll,
            )
      }
    >
      <div className="flex-1 flex gap-2 items-stretch z-2">
        <div
          className={cn(
            `flex items-center gap-2 px-2 rounded-xl ${disabled ? "bg-zinc-300 text-white" : "bg-light-blue text-blue-default"}  font-bold`,
            classLabel,
            classAll,
          )}
        >
          <CalendarDays className="h-5 w-5" />
          {label && <p className="flex-1 text-center">{label}</p>}
        </div>
        <div className="flex items-center gap-1">
          <input
            type="text"
            name="date"
            inputMode="numeric"
            disabled={disabled}
            value={inputValue.date}
            placeholder="dd"
            className="w-7 outline-none text-center"
            onFocus={() => setIsOpen(true)}
            onBlur={(e) => {
              handleOutValue(e);
              setIsOpen(false);
            }}
            onChange={(e) => handleChange(e)}
          />
          <p>/</p>
          <input
            type="text"
            name="month"
            inputMode="numeric"
            disabled={disabled}
            value={inputValue.month}
            placeholder="MM"
            className="w-7 outline-none text-center"
            onFocus={() => setIsOpen(true)}
            onBlur={(e) => {
              handleOutValue(e);
              setIsOpen(false);
            }}
            onChange={(e) => handleChange(e)}
          />
          <p>/</p>
          <input
            type="text"
            name="year"
            inputMode="numeric"
            disabled={disabled}
            value={inputValue.year}
            placeholder="yyyy"
            className="w-10 outline-none text-center"
            onFocus={() => setIsOpen(true)}
            onChange={(e) => handleChange(e)}
            onBlur={(e) => {
              handleOutValue(e);
              setIsOpen(false);
            }}
          />
        </div>
      </div>
      <div
        className={cn(
          `absolute w-full max-w-70 top-full left-0 mt-1 z-1 bg-white rounded-xl border-2 border-transparent duration-200 ease-in group-hover:border-blue-default ${isOpen && "border-blue-default"}`,
          classAll,
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
