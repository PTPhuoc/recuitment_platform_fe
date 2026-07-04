"use client";

import { cn } from "@/app/libs/utils";
import { setRole, setUser } from "@/app/store/slices/authSlice";
import { AppDispatch, RootState } from "@/app/store/store";
import { getOrRefresh } from "@/app/store/Thunks/authThuk";
import { UserCircle } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

type PageProps = {
  className?: string;
};

// app/Component/NavigationBar/HeadHomeClient.tsx
export default function HeadHomeClient({ className }: PageProps) {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (user.id) return;
    dispatch(getOrRefresh())
      .unwrap()
      .then((rs) => {
        dispatch(setUser({ id: rs.id, email: rs.email }));
        dispatch(setRole(rs.role));
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div
      className={cn(
        "flex w-full z-10 h-20 max-sm:h-15 justify-between items-center px-10 py-2 bg-white shadow-default",
        className,
      )}
    >
      <div className="flex items-center gap-10">
        <button
          className="px-3 rounded-2xl"
          disabled={pathname === "/"}
          onClick={() => router.push("/")}
        >
          <h1 className="group text-5xl font-bold text-dark-blue duration-200 ease-in-out hover:scale-105 cursor-pointer">
            <span className="text-blue-default duration-200 ease-in-out group-hover:text-dark-blue">
              FU
            </span>
            <span className="text-dark-blue duration-200 ease-in-out group-hover:text-blue-default">
              Job
            </span>
          </h1>
        </button>
        <div className="flex gap-2 items-center max-sm:hidden">
          <button
            className="group relative font-bold w-20 cursor-pointer"
            disabled={pathname === "/"}
            onClick={() => router.push("/")}
          >
            <span
              className={`absolute left-0 bottom-0 w-full h-1 bg-blue-default duration-200 ease-in-out ${pathname === "/" ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`}
            />
            Home
          </button>
          <button
            className="group relative font-bold w-20 cursor-pointer"
            disabled={pathname === "/job"}
            onClick={() => router.push("/job")}
          >
            <span
              className={`absolute left-0 bottom-0 w-full h-1 bg-blue-default duration-200 ease-in-out ${pathname === "/job" ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`}
            />
            Job
          </button>
          <button
            className="group relative font-bold w-20 cursor-pointer"
            disabled={pathname === "/company"}
            onClick={() => router.push("/company")}
          >
            <span
              className={`absolute left-0 bottom-0 w-full h-1 bg-blue-default duration-200 ease-in-out ${pathname === "/company" ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`}
            />
            Company
          </button>
          <button
            className="group relative font-bold w-20 cursor-pointer"
            disabled={pathname === "/about"}
            onClick={() => router.push("/about")}
          >
            <span
              className={`absolute left-0 bottom-0 w-full h-1 bg-blue-default duration-200 ease-in-out ${pathname === "/about" ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`}
            />
            About
          </button>
        </div>
      </div>
      <button
        className="p-2 rounded-full bg-blue-default text-white border-2 border-blue-default cursor-pointer duration-200 ease-in hover:bg-white hover:text-blue-default"
        disabled={pathname === "/profile"}
        onClick={() =>
          user.id
            ? user.role === "admin"
              ? router.push("/dashboard")
              : router.push("/profile")
            : router.push("/login")
        }
      >
        <UserCircle />
      </button>
    </div>
  );
}
