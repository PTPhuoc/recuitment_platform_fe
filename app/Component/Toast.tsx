"use client";

import { CircleAlert, CircleCheck, Info, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useToast } from "../hook/ToastContext";
import { set } from "date-fns";

type ToastType = {
  id: string;
  title: string;
  description: string;
  type: "success" | "error" | "info";
  duration?: number;
};

const ToastIcon = {
  success: <CircleCheck className="w-10 h-10 shrink-0" />,
  error: <CircleAlert className="w-10 h-10 shrink-0" />,
  info: <Info className="w-10 h-10 shrink-0" />,
};

// ../component/Toast.tsx
export default function Toast({ initToast }: { initToast: ToastType }) {
  const { removeToast } = useToast();
  const [toast, setToast] = useState<ToastType | null>(null);
  const [isShow, setIsShow] = useState(true);

  const handleClose = () => {
    setIsShow(false);
  };

  useEffect(() => {
    const onAnimate = setTimeout(() => {
      setToast(initToast);
    }, 100);
    const offAnimate = setTimeout(() => {
      setIsShow(false);
    }, initToast.duration || 3000);
    const hideElement = setTimeout(
      () => {
        handleClose();
      },
      (initToast.duration || 3000) + 300,
    );
    return () => {
      clearTimeout(onAnimate);
      clearTimeout(offAnimate);
      clearTimeout(hideElement);
    };
  }, []);

  useEffect(() => {
    if (!isShow) {
      setToast(null);
      const time = setTimeout(() => {
        removeToast(initToast.id);
      }, 300);
      return () => clearTimeout(time);
    }
  }, [isShow]);

  return (
    <div
      className={`flex items-stretch w-full h-15 border rounded-lg bg-white overflow-hidden shrink-0 ${toast ? "translate-x-0" : "translate-x-full"} duration-300`}
    >
      <div
        className={`flex items-center justify-center p-1 text-white ${initToast.type === "success" ? "bg-green-400" : initToast.type === "error" ? "bg-red-400" : "bg-blue-default"}`}
      >
        {ToastIcon[initToast.type]}
      </div>
      <div className="relative flex-1 flex items-center">
        <div
          style={{
            transitionDuration: `${initToast.duration || 3000}ms`,
          }}
          className={`absolute z-1 bg-[rgba(161,227,249,0.3)] h-full left-0 top-0 ease-linear ${toast ? "w-full" : "w-0"}`}
        ></div>
        <p className="flex-1 z-2 px-2 line-clamp-2 font-bold">
          {initToast.description}
        </p>
        <button
          className="h-full p-1 text-zinc-400 cursor-pointer duration-200 ease-in hover:text-zinc-600"
          onClick={(e) => {
            e.stopPropagation();
            handleClose();
          }}
        >
          <X className="w-10 h-10" />
        </button>
      </div>
    </div>
  );
}
