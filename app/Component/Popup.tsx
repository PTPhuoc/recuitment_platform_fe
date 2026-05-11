"use client";

import { X } from "lucide-react";
import { createContext, useCallback, useContext, useState } from "react";

type PopupValue = {
  title: string;
  message: string;
  typeSubmit: "N" | "YrN" | "Y";
  isOpen: boolean;
  handleFuns?: () => Promise<boolean> | boolean;
};

type PopupContextType = {
  showPopup: (popupValue: PopupValue) => Promise<boolean>;
};

const PopupContext = createContext<PopupContextType | null>(null);

export function PopupProvider({ children }: { children: React.ReactNode }) {
  const [popupValue, setPopupValue] = useState<{
    option: PopupValue | null;
    resolve?: (value: boolean) => void;
  }>({
    option: null,
  });

  const [popupStatus, setPopupStatus] = useState<"pending" | "handling">(
    "pending",
  );

  const showPopup = useCallback((newContent: PopupValue): Promise<boolean> => {
    return new Promise((resolve) => {
      setPopupValue({
        option: newContent,
        resolve: resolve,
      });
    });
  }, []);

  const handlePopup = async () => {
    setPopupStatus("handling");
    await popupValue?.option?.handleFuns?.();
    popupValue?.resolve?.(true);
    setPopupValue({ option: null, resolve: undefined });
    setPopupStatus("pending");
  };

  const closePopup = () => {
    popupValue?.resolve?.(false);
    setPopupValue({ option: null, resolve: undefined });
    setPopupStatus("pending");
  };

  return (
    <PopupContext.Provider value={{ showPopup }}>
      {children}
      {popupValue?.option?.isOpen && (
        <div
          className="z-50 fixed w-full h-full flex justify-center items-center max-sm:items-end bg-light-blue-blur"
          onClick={async (e) => {
            e.stopPropagation();
            popupValue.option?.typeSubmit === "Y"
              ? await handlePopup()
              : closePopup();
          }}
        >
          <div className="w-2/5 max-xl:w-3/4 max-sm:w-full h-3/4 flex flex-col p-2 gap-2 bg-white sm:border-2 sm:border-mim-blue sm:rounded-2xl shadow-default min-h-60">
            <div className="flex px-2 py-1 items-center justify-between bg-milk-blue rounded-lg">
              <p className="text-[40px]">{popupValue.option.title}</p>
              <button
                className={
                  popupStatus === "pending"
                    ? "p-1 bg-dim-blue text-light-blue border-2 border-dim-blue rounded-lg scale-100 duration-200 ease-in hover:bg-light-blue hover:text-dim-blue active:scale-95"
                    : "p-1 bg-zinc-400 text-white border-2 border-zinbg-zinc-400 rounded-lg duration-200 ease-in"
                }
                disabled={popupStatus === "handling"}
                onClick={async (e) => {
                  e.stopPropagation();
                  popupValue.option?.typeSubmit === "Y"
                    ? await handlePopup()
                    : closePopup();
                }}
              >
                <X className="w-7 h-7" />
              </button>
            </div>
            <div className="flex-1 flex items-center justify-center p-2 border-2 border-light-blue rounded-lg shadow-default">
              <p className="text-center">{popupValue.option.message}</p>
            </div>
            <div className="flex items-center gap-2">
              {popupValue.option.typeSubmit === "YrN" ? (
                <>
                  <button
                    className={
                      popupStatus === "pending"
                        ? "flex-1 py-2 bg-dim-blue text-light-blue font-bold border-2 border-dim-blue rounded-lg shadow-default scale-100 duration-200 ease-in hover:bg-light-blue hover:text-dim-blue active:scale-95"
                        : "flex-1 flex items-center justify-center py-2 bg-white text-light-blue font-bold border-2 border-dim-blue rounded-lg shadow-default duration-200 ease-in"
                    }
                    disabled={popupStatus === "handling"}
                    onClick={async (e) => {
                      e.stopPropagation();
                      await handlePopup();
                    }}
                  >
                    {popupStatus === "pending" ? (
                      "Xác nhận"
                    ) : (
                      <div className="loader"></div>
                    )}
                  </button>
                  <button
                    className="flex-1 py-2 bg-red-400 text-white font-bold border-2 border-red-400 rounded-lg shadow-default scale-100 duration-200 ease-in hover:bg-white hover:text-red-400 active:scale-95"
                    disabled={popupStatus === "handling"}
                    onClick={(e) => {
                      e.stopPropagation();
                      closePopup();
                    }}
                  >
                    Hủy
                  </button>
                </>
              ) : popupValue.option.typeSubmit === "N" ? (
                <button
                  className="flex-1 py-2 bg-dim-blue text-light-blue font-bold border-2 border-dim-blue rounded-lg shadow-default scale-100 duration-200 ease-in hover:bg-light-blue hover:text-dim-blue active:scale-95"
                  disabled={popupStatus === "handling"}
                  onClick={(e) => {
                    e.stopPropagation();
                    closePopup();
                  }}
                >
                  Đóng
                </button>
              ) : (
                <button
                  className="flex-1 py-2 bg-dim-blue text-light-blue font-bold border-2 border-dim-blue rounded-lg shadow-default scale-100 duration-200 ease-in hover:bg-light-blue hover:text-dim-blue active:scale-95"
                  disabled={popupStatus === "handling"}
                  onClick={async (e) => {
                    e.stopPropagation();
                    await handlePopup();
                  }}
                >
                  Xác nhận
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </PopupContext.Provider>
  );
}

export const usePopup = () => {
  const ctx = useContext(PopupContext);
  if (!ctx) throw new Error("usePopup must be used within PopupProvider");
  return ctx.showPopup;
};
