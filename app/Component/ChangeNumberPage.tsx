"use client";

import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
import { cn } from "../libs/utils";
import { useState } from "react";
import Loader from "./Loader";

type PageValue = {
  classButton?: string;
  className?: string;
  classDisabled?: string;
  classWaiting?: string;
  next: string | null;
  previous: string | null;
  onNextPage?: (url: string) => Promise<string> | string;
  onPreviousPage?: (url: string) => Promise<string> | string;
};

export default function ChangeNumberPage({
  classButton,
  className,
  classDisabled,
  classWaiting,
  next,
  previous,
  onNextPage,
  onPreviousPage,
}: PageValue) {
  const [isWaiting, setIsWaiting] = useState({
    next: false,
    previous: false,
  });

  const handleChangePage = async (
    url: string | null,
    type: "next" | "previous",
  ) => {
    if (!url) return;
    setIsWaiting((prev) => ({ ...prev, [type]: true }));
    if (type === "next" && onNextPage) {
      await onNextPage(url);
    }
    if (type === "previous" && onPreviousPage) {
      await onPreviousPage(url);
    }
    setIsWaiting((prev) => ({ ...prev, [type]: false }));
  };

  return (
    <div className={cn("flex gap-2 items-center justify-center", className)}>
      <button
        className={
          isWaiting.previous
            ? cn("p-1 rounded-lg border-2 border-blue-default", classWaiting)
            : previous
              ? cn(
                  "p-1 bg-blue-default rounded-lg text-light-blue border-2 border-blue-default scale-100 duration-200 ease-in cursor-pointer hover:bg-white hover:text-blue-default active:scale-95",
                  classButton,
                )
              : cn(
                  "p-1 bg-zinc-300 rounded-lg text-white border-2 border-zinc-300 duration-200 ease-in",
                  classDisabled,
                )
        }
        disabled={!previous || isWaiting.previous}
        onClick={async () => await handleChangePage(previous, "previous")}
      >
        {isWaiting.previous ? (
          <Loader width="24px" />
        ) : (
          <ArrowBigLeft className="w-6 h-6" />
        )}
      </button>
      <button
        className={
          isWaiting.next
            ? cn("p-1 rounded-lg border-2 border-blue-default", classWaiting)
            : next
              ? cn(
                  "p-1 bg-blue-default rounded-lg text-light-blue border-2 border-blue-default scale-100 duration-200 ease-in cursor-pointer hover:bg-white hover:text-blue-default active:scale-95",
                  classButton,
                )
              : cn(
                  "p-1 bg-zinc-300 rounded-lg text-white border-2 border-zinc-300 duration-200 ease-in",
                  classDisabled,
                )
        }
        disabled={!next || isWaiting.next}
        onClick={async () => await handleChangePage(next, "next")}
      >
        {isWaiting.next ? (
          <Loader width="24px" />
        ) : (
          <ArrowBigRight className="w-6 h-6" />
        )}
      </button>
    </div>
  );
}
