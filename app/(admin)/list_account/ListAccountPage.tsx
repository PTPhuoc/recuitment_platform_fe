"use client";

import ButtonDefault from "@/app/Component/ButtonDefault";
import ChangeNumberPage from "@/app/Component/ChangeNumberPage";
import DateSearch from "@/app/Component/DateSearch";
import InputSearch from "@/app/Component/InputSearch";
import ListSearch from "@/app/Component/ListSearch";
import { getStringDate, syncScroll } from "@/app/libs/utils";
import { setLoad } from "@/app/store/slices/webSlice";
import { AppDispatch } from "@/app/store/store";
import { Ban, PackageOpen, SquarePen, Trash2 } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

type AccountValue = {
  count: 1;
  next: string | null;
  previous: string | null;
  results: Array<{
    id: string;
    email: string;
    phone_number: string;
    role: "admin" | "employer" | "candidate";
    status: "active" | "ban";
    date_created: string;
  }>;
  status: string;
} | null;

const listRole = {
  vie: [
    { name: "Quản trị viên", value: "admin" },
    { name: "Ứng viên", value: "admin" },
    { name: "Nhà tuyển dụng", value: "admin" },
  ],
};

const listStatus = {
  vie: [
    { name: "Hoạt động", value: "active" },
    { name: "Cấm", value: "ban" },
  ],
};

type PageProps = {
  listSearch: AccountValue;
  setListSearch: React.Dispatch<React.SetStateAction<AccountValue>>;
  getAccounts: () => void;
  handleSearch: (email: string, role: string, status: string, dateCreated: Date | "") => Promise<string>;
  handleDelete: (message: string) => Promise<boolean>;
};

export default function ListAccountPage({
  listSearch,
  setListSearch,
  getAccounts,
  handleSearch,
  handleDelete,
}: PageProps) {
  const [searchValue, setSearchValue] = useState<{
    email: string;
    role: string;
    status: string;
    dateCreated: Date | "";
  }>({
    email: "",
    role: "",
    status: "",
    dateCreated: "",
  });
  const [isAdvance, setIsAdvance] = useState(false);
  const divTitle = useRef<HTMLDivElement>(null);
  const divTable = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
  const cleanup = syncScroll({ containerRef: divTitle, targetRef: divTable });
  return cleanup;
}, []);

  useEffect(() => {
    getAccounts();
  }, []);

  useEffect(() => {
    if (listSearch) dispatch(setLoad(false));
  }, [listSearch]);

  return (
    <>
      <div className="flex flex-col w-3/4 max-lg:w-[95%] max-sm:w-full h-full gap-2 py-3 max-lg:py-2 items-stretch overflow-auto no-scroll">
        <div className="p-3 bg-blue-default sm:rounded-2xl shadow-default">
          <p className="font-bold text-light-blue">Danh sách Tài khoản</p>
        </div>
        <div className="flex-1 flex flex-col gap-2 p-3 bg-white rounded-2xl shadow-default">
          <div className="flex gap-2 items-center flex-wrap">
            <InputSearch
              lable="Email"
              className="flex-3 w-full rounded-xl"
              outValue={(value) =>
                setSearchValue({ ...searchValue, email: value })
              }
            />
            <ButtonDefault
              disabled={false}
              lable="Tìm kiếm"
              className="flex-1 rounded-xl px-2 shadow-default"
              funsHandle={async () => {
                return await handleSearch(searchValue.email, searchValue.role, searchValue.status, searchValue.dateCreated);
              }}
            />
          </div>
          <div
            className={`flex flex-col duration-200 ease-in ${isAdvance ? "gap-2" : "gap-0"}`}
          >
            <div
              className={`flex gap-2 items-center flex-wrap duration-200 ease-in-out ${isAdvance ? "max-h-full" : "max-h-0 overflow-hidden"}`}
            ><DateSearch
                className="flex-1 z-3"
                maxCurrentYear={false}
                outValue={(value) =>
                  setSearchValue({ ...searchValue, dateCreated: value })
                }
              />
              <ListSearch
                className="flex-1 z-2"
                listValue={listRole.vie}
                attrSearch="name"
                attrGet="value"
                lable="Vai trò"
                outValue={(value) =>
                  setSearchValue({ ...searchValue, role: value })
                }
              />
              <ListSearch
                className="flex-1 z-1"
                listValue={listStatus.vie}
                attrSearch="name"
                attrGet="value"
                lable="Trạng thái"
                outValue={(value) =>
                  setSearchValue({ ...searchValue, status: value })
                }
              />
              
            </div>
            <button
              className="h-10 p-1 rounded-xl border-2 text-blue-default border-blue-default bg-white scale-100 font-bold shadow-default duration-200 ease-in hover:bg-blue-default hover:text-white active:scale-95"
              onClick={() => setIsAdvance(!isAdvance)}
            >
              {isAdvance ? "Thu gọn" : "Tìm kiếm nâng cao"}
            </button>
          </div>
          <div className="flex-1 flex flex-col gap-2 p-1 border-2 border-blue-default rounded-xl">
            <div ref={divTitle} className="overflow-auto no-scroll">
              <div className="w-full grid gap-2 grid-cols-5 text-center font-bold max-xl:min-w-150">
                <p className="p-1 bg-light-blue rounded-lg">Email</p>
                <p className="p-1 bg-light-blue rounded-lg">Vai trò</p>
                <p className="p-1 bg-light-blue rounded-lg">Trạng thái</p>
                <p className="p-1 bg-light-blue rounded-lg">Ngày tạo</p>
                <p className="p-1 bg-light-blue rounded-lg">Tùy chọn</p>
              </div>
            </div>
            <div ref={divTable} className="overflow-auto no-scroll">
              <div className="flex flex-col gap-2 min-h-50 max-xl:min-w-150">
                {listSearch?.results && listSearch.results.length > 0 ? (
                  listSearch.results.map((item) => (
                    <React.Fragment key={item.id}>
                      <div className="h-px w-full bg-light-blue"></div>
                      <div
                        key={item.id}
                        className="group w-full grid gap-2 grid-cols-5 rounded-lg border-2 border-white duration-200 ease-in hover:border-light-blue"
                      >
                        <p className="flex items-center truncate p-1 border-2 border-zinc-200 rounded-lg duration-200 ease-in group-hover:border-white">
                          {item.email}
                        </p>
                        <p className="flex items-center p-1 border-2 border-zinc-200 rounded-lg duration-200 ease-in group-hover:border-white">
                          {item.role}
                        </p>
                        <p className="flex items-center p-1 border-2 border-zinc-200 rounded-lg duration-200 ease-in group-hover:border-white">
                          {item.status}
                        </p>
                        <p className="flex items-center p-1 border-2 border-zinc-200 rounded-lg duration-200 ease-in group-hover:border-white">
                          {getStringDate({ value: item.date_created })}
                        </p>
                        <div className="flex justify-center items-center p-1 gap-1 border-2 border-zinc-200 rounded-lg duration-200 ease-in group-hover:border-white">
                          {item.role === "admin" ? (
                            <Ban className="w-5 h-5" />
                          ) : (
                            <>
                              <button
                                className="p-1 bg-blue-default text-light-blue border-2 border-blue-default rounded-md scale-100 duration-200 ease-in hover:bg-white hover:text-blue-default active:scale-95"
                                onClick={(e) => {
                                  e.stopPropagation();
                                }}
                              >
                                <SquarePen className="w-5 h-5" />
                              </button>
                              <button
                                className="p-1 bg-red-400 text-light-blue border-2 border-red-400 rounded-md scale-100 duration-200 ease-in hover:bg-white hover:text-red-400 active:scale-95"
                                onClick={async (e) => {
                                  e.stopPropagation();
                                  await handleDelete(item.email);
                                }}
                              >
                                <Trash2 className="w-5 h-5" />
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    </React.Fragment>
                  ))
                ) : (
                  <div className="flex-1 flex flex-col justify-center items-center">
                    <PackageOpen className="h-20 w-20 text-zinc-400" />
                    <p className="font-bold text-zinc-400">
                      Không tìm thấy tài khoản
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
          <ChangeNumberPage
            next={listSearch?.next ?? null}
            previous={listSearch?.previous ?? null}
          />
        </div>
      </div>
    </>
  );
}
