"use client";

import InputAddressDefault from "@/app/Component/InputAddressDefault";
import InputCheckDefault from "@/app/Component/InputCheckDefault";
import InputImage from "@/app/Component/InputImage";
import InputNumberDefault from "@/app/Component/InputNumberDefault";
import InputSelectAddress from "@/app/Component/InputSelectAddress";
import InputSelectDefault from "@/app/Component/InputSelectDefault";
import InputTextDefault from "@/app/Component/InputTextDefault";
import ListSearch from "@/app/Component/ListSearch";
import TextAreaDefault from "@/app/Component/TextAreaDefault";
import { useToast } from "@/app/hook/ToastContext";
import { useCategories } from "@/app/hook/useCategories";
import { Relist } from "@/app/libs/utils";
import { setLoad } from "@/app/store/slices/webSlice";
import { AppDispatch } from "@/app/store/store";
import axios, { AxiosResponse } from "axios";
import { Plus, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

type CompanyInfo = {
  id: string;
  name: string;
  tradingName: string;
  logo: string;
  coverImage: string;
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
    id: "",
    name: "",
    tradingName: "",
    logo: "",
    coverImage: "",
    websiteUrl: "",
    size: "",
    industry: [],
    location: [],
    description: "",
    emailDomain: "",
    isClaimed: false,
    isVerified: true,
  });
  const { data: categories, isLoading, error } = useCategories("vie");
  const [category, setCategory] = useState<{
    industry: { name: string; value: string }[];
    location: { name: string; value: string; parent_id: string }[];
    formOfWork: { name: string; value: string }[];
    jobLevel: { name: string; value: string }[];
    education: { name: string; value: string }[];
  }>({
    industry: [],
    location: [],
    formOfWork: [],
    jobLevel: [],
    education: [],
  });
  const { addToast } = useToast();
  const [logo, setLogo] = useState<File | null>(null);
  const [cover, setCover] = useState<File | null>(null);
  const [isOpen, setIsOpen] = useState({
    advance: false,
    create: true,
  });

  const handleWithToast = async (
    funcFetch: () => Promise<AxiosResponse<any, any, {}>>,
    funcSuccess: (response: AxiosResponse<any, any, {}>) => void,
  ) => {
    try {
      const response = await funcFetch();
      if (response.data.status === "Success") {
        funcSuccess(response);
        addToast({
          type: "success",
          description: "Fetch status: " + response.data.status,
          title: "Success",
        });
        return "Success";
      } else {
        addToast({
          type: "error",
          description: "Fetch status: " + response.data.status,
          title: "Error",
        });
        return response.data.status;
      }
    } catch (error: any) {
      addToast({
        title: "Lỗi",
        description: `${error.response.statusText ?? "No response received"}`,
        type: "error",
      });
      return error.response.statusText ?? "No response received";
    }
  };

  const handleSave = async () => {
    const formData = new FormData();
    const { logo, coverImage, ...rest } = companyInfo;
    if (logo) formData.append("logo", logo);
    if (coverImage) formData.append("coverImage", coverImage);
    formData.append("info", JSON.stringify(rest));
    return await handleWithToast(
      async () => await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}company/save/`, formData, { withCredentials: true }),
      (response) => {
        
      })
  };

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
      setCategory({
        industry: Relist(categories.industry),
        location: Relist(categories.location),
        formOfWork: Relist(categories.formOfWork),
        jobLevel: Relist(categories.jobLevel),
        education: Relist(categories.education),
      });
    }
  }, [isLoading, error, categories]);

  useEffect(() => {
    console.log(companyInfo);
  }, [companyInfo]);

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
                  link={companyInfo.coverImage}
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
            <InputSelectDefault
              label="Lĩnh vực công ty"
              listSearch={category.industry}
              value={companyInfo.industry}
              classAll="rounded-lg"
              classLabel="rounded-md w-40"
              className="z-3"
              outValue={(value) =>
                setCompanyInfo({ ...companyInfo, industry: value })
              }
            />
            <InputSelectAddress
              label="Địa chỉ công ty"
              value={companyInfo.location}
              listSearch={category.location}
              classAll="rounded-lg"
              classLabel="rounded-md w-40"
              className="z-2"
              outValue={(value) =>
                setCompanyInfo({ ...companyInfo, location: value })
              }
            />
            <div className="flex gap-2 items-center">
              <InputCheckDefault
                value={companyInfo.isClaimed}
                lable="Đã được nhận"
                classAll="rounded-lg"
                classLabel="rounded-md w-40"
                outValue={(value) =>
                  setCompanyInfo({ ...companyInfo, isClaimed: value })
                }
              />
              <InputCheckDefault
                value={companyInfo.isVerified}
                lable="Đã được xác minh"
                classAll="rounded-lg"
                classLabel="rounded-md w-40"
                outValue={(value) =>
                  setCompanyInfo({ ...companyInfo, isVerified: value })
                }
              />
            </div>
            <TextAreaDefault
              label="Mô tả"
              classAll="rounded-lg"
              classLabel="rounded-md w-40"
              value={companyInfo.description}
              outValue={(value) =>
                setCompanyInfo({ ...companyInfo, description: value })
              }
            />
          </div>
        </div>
      </div>
    </>
  );
}
