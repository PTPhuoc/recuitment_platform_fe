"use client";

import { useState } from "react";
import Loader from "./Loader";
import { cn } from "../libs/utils";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { fetchRefreshToken } from "../store/Thunks/authThuk";
import { useRouter } from "next/navigation";
import { usePopup } from "./Popup";

type ButtonValue = {
  className?: string;
  classDisabled?: string;
  classLoad?: string;
  classAll?: string;
  label?: string;
  offLale?: boolean;
  disabled?: boolean;
  funsHandle?: () => Promise<string> | string;
  icon?: React.ReactNode;
};

export default function ButtonDefault({
  className,
  classDisabled,
  classLoad,
  classAll,
  label,
  offLale = false,
  disabled = false,
  funsHandle,
  icon,
}: ButtonValue) {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const popup = usePopup();
  const [isLoad, setIsLoad] = useState(false);

  const handleClick = async () => {
    if (!funsHandle || disabled) return;
    setIsLoad(true);
    try {
      const result = await funsHandle();
      if (result === "Unauthorized") {
        const refreshToken = await dispatch(fetchRefreshToken());
        if (fetchRefreshToken.rejected.match(refreshToken)) {
          await popup({
            isOpen: true,
            message: "Phiên đăng nhập của bạn đã hết hạn. Hãy đăng nhập lại!",
            title: "Phiên đăng nhập",
            typeSubmit: "Y",
            handleFuns: () => {
              router.push("/login");
              return true;
            },
          });
        } else {
          
          await funsHandle();
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoad(false);
    }
  };

  return (
    <button
      className={
        isLoad
          ? cn(
              "py-1 px-2 bg-white font-bold text-blue-default border-2 border-blue-default rounded-lg duration-200 ease-in cursor-wait",
              classLoad, classAll
            )
          : disabled
            ? cn(
                "flex items-center py-1 px-2 border-2 border-zinc-400 text-white bg-zinc-400 rounded-lg duration-200 ease-in cursor-not-allowed",
                classDisabled, classAll
              )
            : cn(
                "flex items-center py-1 px-2 border-2 border-blue-default duration-200 ease-in bg-blue-default font-bold text-white rounded-lg scale-100 hover:bg-white hover:text-blue-default active:scale-95 cursor-pointer",
                className, classAll
              )
      }
      onClick={(e) => {
        e.stopPropagation();
        handleClick();
      }}
      disabled={isLoad || disabled}
    >
      {isLoad ? (
        <Loader />
      ) : (
        <>
          {icon && (
            <div className="flex-1 flex items-center justify-center ">
              {icon}
            </div>
          )}
          {label && (
            <p
              className={
                "transition-all duration-200 ease-in-out overflow-hidden text-nowrap " +
                (offLale
                  ? "flex-0 max-w-0 opacity-0"
                  : "flex-4 max-w-full opacity-100")
              }
            >
              {label}
            </p>
          )}
        </>
      )}
    </button>
  );
}
