"use client";

import InputImage from "@/app/Component/InputImage";
import InputNumberDefault from "@/app/Component/InputNumberDefault";
import InputTextDefault from "@/app/Component/InputTextDefault";
import ListSearch from "@/app/Component/ListSearch";
import { useToast } from "@/app/hook/ToastContext";
import { useCategories } from "@/app/hook/useCategories";
import { Relist } from "@/app/libs/utils";
import { setLoad } from "@/app/store/slices/webSlice";
import { AppDispatch } from "@/app/store/store";
import { Plus, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

type CompanyInfo = {
  name: string;
  tradingName: string;
  logo: string;
  cover: string;
  websiteUrl: string;
  size: string;
  industry: string[];
  location: string[];
  description: string;
  emailDomain: string;
  isClaimed: boolean;
  isVerified: boolean;
};

// app/(admin)/list_company/ListCompanyPage.tsx
export default function ListCompanyPage() {
  const dispatch = useDispatch<AppDispatch>();
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>({
    name: "",
    tradingName: "",
    logo: "",
    cover: "",
    websiteUrl: "",
    size: "",
    industry: [],
    location: [],
    description: "",
    emailDomain: "",
    isClaimed: true,
    isVerified: true,
  });
  const { data: categories, isLoading, error } = useCategories("vie");
  const [listIndistry, setListIndustry] = useState<
    { name: string; value: string }[]
  >([]);
  const { addToast } = useToast();
  const [logo, setLogo] = useState<File | null>(null);
  const [cover, setCover] = useState<File | null>(null);
  const [isOpen, setIsOpen] = useState({
    advance: false,
    create: true,
  });

  useEffect(() => {
    dispatch(setLoad(false));
  }, []);

  useEffect(() => {
    if (isLoading) {
      addToast({
        type: "info",
        description: "Loading categories...",
        title: "Please wait",
      });
    } else if (error) {
      addToast({
        type: "error",
        description: "Categories Message: " + error.message,
        title: "Error",
      });
    }
    if (categories) {
      addToast({
        type: "success",
        description: "Categories loaded successfully.",
        title: "Success",
      });
      console.log(Relist(categories.industry));
      setListIndustry(Relist(categories.industry));
    }
  }, [isLoading, error, categories]);

  return (
    <>
      <div className="flex z-1 flex-col  w-3/4 max-lg:w-[95%] max-sm:w-full h-full gap-3 max-lg:gap-2 py-3 max-lg:py-2 items-stretch overflow-auto no-scroll">
        <div className="flex justify-between items-center p-3 bg-blue-default sm:rounded-2xl shadow-default">
          <p className="font-bold text-light-blue">Danh sách Công ty</p>
          <button
            className="bg-light-blue text-blue-default border-2 border-light-blue rounded-md scale-100 duration-200 ease-in hover:bg-blue-default hover:text-white active:scale-95"
            onClick={() => setIsOpen({ ...isOpen, create: true })}
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
        <div className="flex-1 flex flex-col gap-3 p-3 bg-white rounded-2xl shadow-default"></div>
      </div>
      <div
        className={`fixed top-0 left-0 z-2 flex w-full h-full justify-end duration-500 ease-in-out ${isOpen.create ? "translate-x-0" : "translate-x-full"}`}
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen({ ...isOpen, create: false });
        }}
      >
        <div
          className="flex flex-col gap-3 max-lg:gap-2 py-3 max-lg:py-2 w-2/5 max-lg:w-[64%] max-sm:w-full border-l-2 border-dark-blue h-full bg-white shadow-default"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center p-3 bg-blue-default shadow-default">
            <p className="font-bold text-light-blue">Tạo công ty</p>
            <button
              className="bg-light-blue text-blue-default border-2 border-light-blue rounded-md scale-100 duration-200 ease-in hover:bg-blue-default hover:text-white active:scale-95"
              onClick={() => setIsOpen({ ...isOpen, create: false })}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="flex-1 flex flex-col gap-2 px-3">
            <div className="relative flex flex-col h-60">
              <div className="flex-5">
                <InputImage
                  className="w-full h-full"
                  link={companyInfo.cover}
                  outValue={(value) => setCover(value)}
                />
              </div>
              <div className="flex-1"></div>
              <InputImage
                className="absolute bottom-0 left-10"
                link={companyInfo.logo}
                outValue={(value) => setLogo(value)}
              />
            </div>
            <InputTextDefault
              lable="Tên công ty"
              classAll="rounded-lg"
              classLabel="rounded-md w-40"
              value={companyInfo.name}
              outValue={(value) =>
                setCompanyInfo({ ...companyInfo, name: value })
              }
            />
            <InputTextDefault
              lable="Tên thương mại"
              classAll="rounded-lg"
              classLabel="rounded-md w-40"
              value={companyInfo.tradingName}
              outValue={(value) =>
                setCompanyInfo({ ...companyInfo, tradingName: value })
              }
            />
            <InputTextDefault
              lable="Địa chỉ website"
              classAll="rounded-lg"
              classLabel="rounded-md w-40"
              value={companyInfo.websiteUrl}
              outValue={(value) =>
                setCompanyInfo({ ...companyInfo, websiteUrl: value })
              }
            />
            <InputTextDefault
              lable="Quy mô công ty"
              classAll="rounded-lg"
              classLabel="rounded-md w-40"
              regex={/[^0-9-]/}
              value={companyInfo.size}
              outValue={(value) =>
                setCompanyInfo({ ...companyInfo, size: value })
              }
            />
            
          </div>
        </div>
      </div>
    </>
  );
}
