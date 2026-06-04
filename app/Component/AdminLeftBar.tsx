"use client";

import { usePathname, useRouter } from "next/navigation";
import ButtonDefault from "./ButtonDefault";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { fetchLogout } from "../store/Thunks/authThuk";
import {
  BookUser,
  Briefcase,
  Building2,
  LogOut,
  ChartPie,
  ListPlus,
  ToolCase,
  BookType,
  FileUser,
  GraduationCap,
  MapPin,
} from "lucide-react";
import { setShrinkBar } from "../store/slices/adminSlice";
import { setLoad } from "../store/slices/webSlice";
import { useState } from "react";

export default function AdminLeftBar() {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch<AppDispatch>();
  const [isOpen, setIsOpen] = useState(false);
  const adminState = useSelector((state: RootState) => state.admin);
  return (
    <div
      className={`${adminState.isShrinkBar ? "w-20" : "w-60"} z-10 flex flex-col h-full items-stretch bg-blue-default shrink-0 duration-200 ease-in-out`}
      onClick={(e) => e.stopPropagation()}
    >
      <button
        className="flex items-center justify-center text-center p-5 text-[50px] font-bold text-light-blue cursor-pointer scale-100 duration-200 ease-in-out hover:scale-105"
        onClick={(e) => {
          e.stopPropagation();
          dispatch(setShrinkBar(!adminState.isShrinkBar));
        }}
      >
        <p>FU </p>
        <p
          className={
            "flex items-center transition-all duration-200 ease-in-out overflow-hidden text-nowrap " +
            (adminState.isShrinkBar
              ? "flex items-center max-w-0 opacity-0"
              : "max-w-full opacity-100")
          }
        >
          <span className="text-dark-blue">Job</span>
          <span className="max-lg:hidden">Admin</span>
        </p>
      </button>
      <div className="h-1 bg-light-blue"></div>
      <div className="flex-1 flex flex-col items-stretch justify-between gap-2 p-2 overflow-auto no-scroll">
        <div className="flex flex-col items-stretch gap-2">
          <ButtonDefault
            label={"Bảng điều khiển"}
            offLale={adminState.isShrinkBar}
            disabled={pathname === "/dashboard"}
            className={`rounded-md shadow-default border-2 border-light-blue ${pathname === "/dashboard" ? "bg-dark-blue text-light-blue hover:bg-dark-blue hover:text-light-blue" : " bg-light-blue text-blue-default hover:bg-dark-blue hover:text-light-blue active:shadow-none"}`}
            classDisabled="rounded-md shadow-default border-2 border-dark-blue bg-dark-blue text-light-blue"
            funsHandle={() => {
              dispatch(setLoad(true));
              router.push("/dashboard");
              return "Success";
            }}
            icon={<ChartPie className="h-6 w-6" />}
          />
          <ButtonDefault
            label={"Danh sách tài khoản"}
            offLale={adminState.isShrinkBar}
            disabled={pathname === "/list_account"}
            className={`rounded-md shadow-default border-2 border-light-blue ${pathname === "/list_account" ? "bg-dark-blue text-light-blue hover:bg-dark-blue hover:text-light-blue" : " bg-light-blue text-blue-default hover:bg-dark-blue hover:text-light-blue active:shadow-none"}`}
            classDisabled="rounded-md shadow-default border-2 border-dark-blue bg-dark-blue text-light-blue"
            funsHandle={() => {
              dispatch(setLoad(true));
              router.push("/list_account");
              return "Success";
            }}
            icon={<BookUser className="h-6 w-6" />}
          />
          <ButtonDefault
            label={"Danh sách tuyển dụng"}
            offLale={adminState.isShrinkBar}
            disabled={pathname === "/list_job"}
            className={`rounded-md shadow-default border-2 border-light-blue ${pathname === "/list_job" ? "bg-dark-blue text-light-blue hover:bg-dark-blue hover:text-light-blue" : " bg-light-blue text-blue-default hover:bg-dark-blue hover:text-light-blue active:shadow-none"}`}
            classDisabled="rounded-md shadow-default border-2 border-dark-blue bg-dark-blue text-light-blue"
            funsHandle={() => {
              dispatch(setLoad(true));
              router.push("/list_job");
              return "Success";
            }}
            icon={<Briefcase className="h-6 w-6" />}
          />
          <ButtonDefault
            label={"Danh sách công ty"}
            offLale={adminState.isShrinkBar}
            disabled={pathname === "/list_company"}
            className={`rounded-md shadow-default border-2 border-light-blue ${pathname === "/list_company" ? "bg-dark-blue text-light-blue hover:bg-dark-blue hover:text-light-blue" : " bg-light-blue text-blue-default hover:bg-dark-blue hover:text-light-blue active:shadow-none"}`}
            classDisabled="rounded-md shadow-default border-2 border-dark-blue bg-dark-blue text-light-blue"
            funsHandle={() => {
              dispatch(setLoad(true));
              router.push("/list_company");
              return "Success";
            }}
            icon={<Building2 className="h-6 w-6" />}
          />
          <div className="flex flex-col items-stretch w-full bg-zinc-200 rounded-lg overflow-hidden duration-200 ease-in-out">
            <button
              className={`flex items-center text-center py-1 h-10 rounded-md shadow-default border-2 border-light-blue duration-200 ease-in font-bold scale-100 ${isOpen ? "bg-dark-blue text-light-blue hover:bg-dark-blue hover:text-light-blue" : " bg-light-blue text-blue-default hover:bg-dark-blue hover:text-light-blue active:shadow-none"}`}
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(!isOpen);
              }}
            >
              <div className="flex flex-1 justify-center">
                <ListPlus className="h-6 w-6" />
              </div>
              <p
                className={
                  "transition-all duration-200 ease-in-out overflow-hidden text-nowrap " +
                  (adminState.isShrinkBar
                    ? "flex-0 max-w-0 opacity-0"
                    : "flex-4 max-w-full opacity-100")
                }
              >
                Danh sách Danh mục
              </p>
            </button>
            <div
              className={`flex flex-col gap-1 duration-200 ease-in-out overflow-auto no-scroll ${isOpen ? "max-h-50 p-1" : "max-h-0 p-0"}`}
            >
              <ButtonDefault
                label={"Danh sách Nghề nghiệp"}
                offLale={adminState.isShrinkBar}
                disabled={pathname === "/industry"}
                className={`rounded-md shadow-default border-2 border-dark-blue ${pathname === "/industry" ? "bg-dark-blue text-light-blue hover:bg-dark-blue hover:text-light-blue" : " bg-light-blue text-blue-default hover:bg-dark-blue hover:text-light-blue active:shadow-none"}`}
                classDisabled="rounded-md shadow-default border-2 border-dark-blue bg-dark-blue text-light-blue"
                funsHandle={() => {
                  dispatch(setLoad(true));
                  router.push("/industry");
                  return "Success";
                }}
                icon={<ToolCase className="h-6 w-6" />}
              />
              <ButtonDefault
                label={"Danh sách Cấp bậc"}
                offLale={adminState.isShrinkBar}
                disabled={pathname === "/job_level"}
                className={`rounded-md shadow-default border-2 border-dark-blue ${pathname === "/job_level" ? "bg-dark-blue text-light-blue hover:bg-dark-blue hover:text-light-blue" : " bg-light-blue text-blue-default hover:bg-dark-blue hover:text-light-blue active:shadow-none"}`}
                classDisabled="rounded-md shadow-default border-2 border-dark-blue bg-dark-blue text-light-blue"
                funsHandle={() => {
                  dispatch(setLoad(true));
                  router.push("/job_level");
                  return "Success";
                }}
                icon={<BookType className="h-6 w-6" />}
              />
              <ButtonDefault
                label={"Danh sách Hình thức"}
                offLale={adminState.isShrinkBar}
                disabled={pathname === "/form_of_work"}
                className={`rounded-md shadow-default border-2 border-dark-blue ${pathname === "/form_of_work" ? "bg-dark-blue text-light-blue hover:bg-dark-blue hover:text-light-blue" : " bg-light-blue text-blue-default hover:bg-dark-blue hover:text-light-blue active:shadow-none"}`}
                classDisabled="rounded-md shadow-default border-2 border-dark-blue bg-dark-blue text-light-blue"
                funsHandle={() => {
                  dispatch(setLoad(true));
                  router.push("/form_of_work");
                  return "Success";
                }}
                icon={<FileUser className="h-6 w-6" />}
              />
              <ButtonDefault
                label={"Danh sách Học vấn"}
                offLale={adminState.isShrinkBar}
                disabled={pathname === "/education"}
                className={`rounded-md shadow-default border-2 border-dark-blue ${pathname === "/education" ? "bg-dark-blue text-light-blue hover:bg-dark-blue hover:text-light-blue" : " bg-light-blue text-blue-default hover:bg-dark-blue hover:text-light-blue active:shadow-none"}`}
                classDisabled="rounded-md shadow-default border-2 border-dark-blue bg-dark-blue text-light-blue"
                funsHandle={() => {
                  dispatch(setLoad(true));
                  router.push("/education");
                  return "Success";
                }}
                icon={<GraduationCap className="h-6 w-6" />}
              />
              <ButtonDefault
                label={"Danh sách Địa chỉ"}
                offLale={adminState.isShrinkBar}
                disabled={pathname === "/location"}
                className={`rounded-md shadow-default border-2 border-dark-blue ${pathname === "/location" ? "bg-dark-blue text-light-blue hover:bg-dark-blue hover:text-light-blue" : " bg-light-blue text-blue-default hover:bg-dark-blue hover:text-light-blue active:shadow-none"}`}
                classDisabled="rounded-md shadow-default border-2 border-dark-blue bg-dark-blue text-light-blue"
                funsHandle={() => {
                  dispatch(setLoad(true));
                  router.push("/location");
                  return "Success";
                }}
                icon={<MapPin className="h-6 w-6" />}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col items-stretch">
          <ButtonDefault
            label={"Đăng xuất"}
            offLale={adminState.isShrinkBar}
            disabled={false}
            className={`bg-red-400 rounded-md border-2 border-red-400 shadow-default hover:text-red-400 active:shadow-none`}
            funsHandle={async () => {
              await dispatch(fetchLogout());
              router.push("/login");
              return "Success";
            }}
            icon={<LogOut className="h-6 w-6" />}
          />
        </div>
      </div>
    </div>
  );
}
