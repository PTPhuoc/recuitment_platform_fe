"use client";

import { createContext, useCallback, useContext, useState } from "react";
import Toast from "../Component/Toast";

type ToastType = {
  id: string;
  title: string;
  description: string;
  type: "success" | "error" | "info";
  duration?: number;
};

type ToastContextType = {
  toasts: ToastType[];
  addToast: (toast:  Omit<ToastType, "id">) => void;
  removeToast: (id: string) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

// ../hook/ToastContext.tsx
export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<ToastType[]>([]);

  // Generate a unique ID for each toast
  const createId = () => {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
};


  // Add a new toast to the list
  const addToast = useCallback((toast: Omit<ToastType, "id">) => {
    setToasts((prevToasts) => [...prevToasts, { ...toast, id: createId() }]);
  }, []);

  // Remove a toast by its ID
  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      <div
        className={`fixed flex flex-col-reverse gap-2 z-40 top-2 right-2 w-100 max-h-100 duration-200 ease-in-out overflow-auto no-scroll ${toasts.length > 0 ? "translate-x-0" : "translate-x-full"}`}
      >
        {toasts.map((toast) => (
          <Toast key={toast.id} initToast={toast} />
        ))}
      </div>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
