"use client";

import React, { useEffect, useRef } from "react";
import AdminLeftBar from "../Component/AdminLeftBar";
import { AppDispatch, RootState } from "../store/store";
import { fetchRefreshToken, fetchUserInfo } from "../store/Thunks/authThuk";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { setRole, setUser, setStatus } from "../store/slices/authSlice";
import BottomBarAdmin from "../Component/AdminBottomBar";
import { setLeftBar } from "../store/slices/webSlice";
import LoaderPage from "../Component/LoaderPage";
import { ToastProvider } from "../hook/ToastContext";

type PageValue = {
  user: {
    id: string;
    email: string;
    role: "pending" | "admin" | "employer" | "candidate";
  } | null;
  children: React.ReactNode;
};

// app/(admin)/LayoutPage.tsx
export default function LayoutPage({ children, user }: PageValue) {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const userInfo = useSelector((state: RootState) => state.auth);
  const webState = useSelector((state: RootState) => state.web);

  useEffect(() => {
    if (userInfo.status === "login") router.push("/login");
    if (user && !userInfo.id) {
      dispatch(setUser({ id: user.id, email: user.email }));
      dispatch(setRole(user.role));
      dispatch(setStatus("valid"));
    } else if (userInfo.status === "off") {
      dispatch(fetchRefreshToken()).then((rs) => {
        if (fetchRefreshToken.fulfilled.match(rs)) {
          dispatch(fetchUserInfo());
        } else {
          router.push("/login");
        }
      });
    }
  }, [userInfo.status]);

  return (
    <ToastProvider>
      <div className="w-screen lg:h-screen flex items-stretch">
        <div className="max-md:hidden z-1 h-screen">
          <AdminLeftBar />
        </div>
        <div className="relative z-1 w-full flex justify-center min-h-0">
          <LoaderPage className="absolute w-full h-screen" />
          {userInfo.id && children}
        </div>
        <div
          className={`z-2 fixed w-full h-full md:hidden ${webState.isLeftBar ? "translate-x-0" : "-translate-x-full"} duration-200 ease-in-out`}
          onClick={(e) => {
            e.stopPropagation();
            dispatch(setLeftBar(false));
          }}
        >
          <AdminLeftBar />
        </div>
        <BottomBarAdmin />
      </div>
    </ToastProvider>
  );
}
