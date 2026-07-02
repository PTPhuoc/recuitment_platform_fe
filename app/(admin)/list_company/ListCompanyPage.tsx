"use client";

import ButtonDefault from "@/app/Component/ButtonDefault";
import ChangeNumberPage from "@/app/Component/ChangeNumberPage";
import ImageShow from "@/app/Component/ImageShow";
import InputCheckDefault from "@/app/Component/InputCheckDefault";
import InputImage from "@/app/Component/InputImage";
import InputSelectAddress from "@/app/Component/InputSelectAddress";
import InputSelectDefault from "@/app/Component/InputSelectDefault";
import InputTextDefault from "@/app/Component/InputTextDefault";
import { usePopup } from "@/app/Component/Popup";
import TextAreaDefault from "@/app/Component/TextAreaDefault";
import { useToast } from "@/app/hook/ToastContext";
import { useCategories } from "@/app/hook/useCategories";
import { checkField, Relist, trimAllField } from "@/app/libs/utils";
import { setLoad } from "@/app/store/slices/webSlice";
import { AppDispatch } from "@/app/store/store";
import axios, { AxiosResponse } from "axios";
import { PackageOpen, Plus, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

type CompanyPaginate = {
  count: number | 0;
  next: string | null;
  previous: string | null;
  results: CompanyItem[];
  status: string;
} | null;

type CompanyItem = {
  id: string;
  name: string;
  slug: string;
  trading_name: string;
  logo_url: string;
  logo_public_id: string;
  cover_url: string;
  cover_public_id: string;
  website_url: string;
  company_size: string;
  industries: string[];
  locations: string[];
  description: string;
  email_domain: string;
  is_claimed: boolean;
  is_verified: boolean;
};

type PageProps = {
  initCompany: CompanyPaginate;
};

// app/(admin)/list_company/ListCompanyPage.tsx
export default function ListCompanyPage({ initCompany }: PageProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [companyInfo, setCompanyInfo] = useState<CompanyItem>({
    id: "",
    name: "",
    slug: "",
    trading_name: "",
    logo_url: "",
    logo_public_id: "",
    cover_url: "",
    cover_public_id: "",
    website_url: "",
    company_size: "",
    industries: [],
    locations: [],
    description: "",
    email_domain: "",
    is_claimed: false,
    is_verified: true,
  });
  const [paginate, setPaginate] = useState<CompanyPaginate>(initCompany);
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
  const popup = usePopup();
  const router = useRouter();
  const [logo, setLogo] = useState<File | null>(null);
  const [cover, setCover] = useState<File | null>(null);
  const [isOpen, setIsOpen] = useState({
    advance: false,
    create: false,
  });
  const [search, setSearch] = useState({
    name: "",
    page: 1,
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

  const handleGet = async () => {
    return await handleWithToast(
      async () =>
        await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}company/many_search/?page=${search.page}&name=${search.name}`,
        ),
      (response) => {
        setPaginate(response.data);
        setSearch({ name: search.name, page: 1 });
        router.push(`/list_company?name=${search.name}&page=${search.page}`, {
          scroll: false,
        });
      },
    );
  };

  const handleChangePage = async (link: string, type: "next" | "previous") => {
    const response = await axios.get(link);
    if (response.data.status === "Success") {setPaginate(response.data), setSearch({...search, page: search.page + (type === "next" ? 1 : -1)})};
    return response.data.status;
  };

  const handleSave = async () => {
    const formData = new FormData();
    if (logo) formData.append("logo", logo);
    if (cover) formData.append("coverImage", cover);
    const trimData = trimAllField({
      ...companyInfo, slug: companyInfo.name.toLowerCase()
    });
    formData.append("data", JSON.stringify(trimData));
    return await handleWithToast(
      async () =>
        await axios.post(
          `${process.env.NEXT_PUBLIC_SERVER_URL}company/save/`,
          formData,
          { withCredentials: true },
        ),
      async (response) => {
        setCompanyInfo({
          id: "",
          name: "",
          slug: "",
          trading_name: "",
          logo_url: "",
          logo_public_id: "",
          cover_url: "",
          cover_public_id: "",
          website_url: "",
          company_size: "",
          industries: [],
          locations: [],
          description: "",
          email_domain: "",
          is_claimed: false,
          is_verified: true,
        });
        await handleGet();
      },
    );
  };

  const handleDelete = async (id: string) => {
    return await handleWithToast(
      async () =>
        await axios.delete(
          `${process.env.NEXT_PUBLIC_SERVER_URL}company/item/?id=${id}`,
          { withCredentials: true },
        ),
      async (response) => {
        await handleGet();
      },
    );
  };

  const check = () => {
    const {
      id,
      logo_url,
      logo_public_id,
      cover_url,
      cover_public_id,
      description,
      is_claimed,
      is_verified,
      trading_name,
      slug,
      ...rest
    } = companyInfo;
    return checkField(rest);
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
        education: Relist(categories.education)
      });
    }
  }, [isLoading, error, categories]);

  // useEffect(() => {
  //   console.log(companyInfo);
  // }, [companyInfo]);

  return (
    <>
      <div className="flex z-1 flex-col w-3/4 max-lg:w-[95%] max-sm:w-full min-w-0 h-screen gap-3 max-lg:gap-2 py-3 max-lg:py-2 items-stretch overflow-auto no-scroll">
        <div className="flex justify-between items-center p-3 bg-blue-default sm:rounded-2xl shadow-default">
          <p className="font-bold text-light-blue">Danh sách Công ty</p>
          <button
            className="bg-light-blue text-blue-default border-2 border-light-blue rounded-md scale-100 duration-200 ease-in hover:bg-blue-default hover:text-white active:scale-95"
            onClick={() => setIsOpen({ ...isOpen, create: true })}
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
        <div className="flex-1 flex flex-col gap-3 p-3 bg-white rounded-2xl shadow-default">
          <div className="flex gap-2 max-md:flex-col">
            <InputTextDefault
              label="Tên công ty"
              placeholder="Nhập tên công ty"
              className="flex-5"
              classDisable="flex-5"
              classAll="rounded-xl"
              value={search.name}
              outValue={(value) => setSearch({ ...search, name: value })}
            />
            <ButtonDefault
              label="Tìm kiếm"
              classAll="flex-1"
              funsHandle={async () => {
                return await handleGet();
              }}
            />
          </div>
          <div className="flex-1 p-2 flex flex-col gap-2 border-2 border-blue-default rounded-xl min-w-0 overflow-auto no-scroll">
            {paginate && paginate.results?.length > 0 ? (
              paginate.results.map((item) => (
                <div
                  key={item.id}
                  className="flex p-2 gap-2 items-center rounded-lg border-2 border-light-blue shadow-default duration-200 ease-in hover:border-dark-blue active:shadow-none"
                  onClick={() => {
                    setIsOpen({ ...isOpen, create: true });
                    setCompanyInfo({
                      ...item,
                    });
                  }}
                >
                  <ImageShow
                    link={item.logo_url}
                    alt={item.name}
                    typeShape="square"
                    classImage="object-contain"
                    className="rounded-lg"
                  />
                  <div className="flex-1 flex flex-col min-w-0">
                    <p className="font-bold text-[30px] truncate">{item.name}</p>
                    <p>{item.trading_name}</p>
                  </div>
                  <ButtonDefault
                    label="Xóa"
                    className="bg-red-400 border-red-400 hover:text-red-400"
                    classAll="w-30 max-md:w-15"
                    funsHandle={() => {
                      popup({
                        isOpen: true,
                        message: `Bạn có chắc muốn xóa Công ty: ${item.name}`,
                        title: "Xóa Công ty",
                        typeSubmit: "YrN",
                        handleFuns: () => handleDelete(item.id),
                      });
                      return "Success";
                    }}
                  />
                </div>
              ))
            ) : (
              <div className="flex-1 flex flex-col justify-center items-center">
                <PackageOpen className="h-20 w-20 text-zinc-400" />
                <p className="font-bold text-zinc-400">
                  Không tìm thấy Công ty nào
                </p>
              </div>
            )}
          </div>
          <ChangeNumberPage
            next={paginate?.next || null}
            previous={paginate?.previous || null}
            onNextPage={(url) => handleChangePage(url, "next")}
            onPreviousPage={(url) => handleChangePage(url, "previous")}
          />
        </div>
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
          <div className="flex-1 flex flex-col gap-2 px-3 overflow-auto no-scroll">
            <div className="relative flex flex-col h-60 shrink-0">
              <div className="flex-5">
                <InputImage
                  className="w-full h-full"
                  link={companyInfo.cover_url}
                  outValue={(value) => setCover(value)}
                />
              </div>
              <div className="flex-1"></div>
              <InputImage
                className="absolute bottom-0 left-10"
                link={companyInfo.logo_url}
                outValue={(value) => setLogo(value)}
              />
            </div>
            <InputTextDefault
              label="Tên công ty"
              classAll="rounded-lg"
              classLabel="rounded-md w-40"
              value={companyInfo.name}
              outValue={(value) =>
                setCompanyInfo({ ...companyInfo, name: value })
              }
            />
            <InputTextDefault
              label="Tên thương mại"
              classAll="rounded-lg"
              classLabel="rounded-md w-40"
              value={companyInfo.trading_name}
              outValue={(value) =>
                setCompanyInfo({ ...companyInfo, trading_name: value })
              }
            />
            <InputTextDefault
              label="Địa chỉ website"
              classAll="rounded-lg"
              classLabel="rounded-md w-40"
              placeholder="https://your_website"
              value={companyInfo.website_url}
              outValue={(value) =>
                setCompanyInfo({ ...companyInfo, website_url: value })
              }
            />
            <InputTextDefault
              label="Tên domain"
              classAll="rounded-lg"
              classLabel="rounded-md w-40"
              placeholder="your_domain.com"
              value={companyInfo.email_domain}
              outValue={(value) =>
                setCompanyInfo({ ...companyInfo, email_domain: value })
              }
            />
            <InputTextDefault
              label="Quy mô công ty"
              classAll="rounded-lg"
              classLabel="rounded-md w-40"
              placeholder="10 - 50"
              regex={/[^0-9-+ ]/}
              value={companyInfo.company_size}
              outValue={(value) =>
                setCompanyInfo({ ...companyInfo, company_size: value })
              }
            />
            <InputSelectDefault
              label="Lĩnh vực công ty"
              listSearch={category.industry}
              value={companyInfo.industries}
              classAll="rounded-lg"
              classLabel="rounded-md w-40"
              className="z-3"
              outValue={(value) =>
                setCompanyInfo({ ...companyInfo, industries: value })
              }
            />
            <InputSelectAddress
              label="Địa chỉ công ty"
              value={companyInfo.locations}
              listSearch={category.location}
              classAll="rounded-lg"
              classLabel="rounded-md w-40"
              className="z-2"
              outValue={(value) =>
                setCompanyInfo({ ...companyInfo, locations: value })
              }
            />
            <div className="flex gap-2 items-center">
              <InputCheckDefault
                value={companyInfo.is_claimed}
                label="Đã được nhận"
                classAll="rounded-lg"
                classLabel="rounded-md w-40"
                outValue={(value) =>
                  setCompanyInfo({ ...companyInfo, is_claimed: value })
                }
              />
              <InputCheckDefault
                value={companyInfo.is_verified}
                label="Đã được xác minh"
                classAll="rounded-lg"
                classLabel="rounded-md w-40"
                outValue={(value) =>
                  setCompanyInfo({ ...companyInfo, is_verified: value })
                }
              />
            </div>
            <TextAreaDefault
              label="Mô tả"
              className="shrink-0"
              classAll="rounded-lg"
              classLabel="rounded-md w-40"
              value={companyInfo.description}
              outValue={(value) =>
                setCompanyInfo({ ...companyInfo, description: value })
              }
            />
            <div className="flex gap-2 items-center justify-end">
              {companyInfo.id && (
                <ButtonDefault
                  label="Hủy"
                  className="bg-red-400 border-red-400 hover:text-red-400"
                  classAll="w-50"
                  funsHandle={() => {
                    setCompanyInfo({
                      id: "",
                      name: "",
                      slug: "",
                      trading_name: "",
                      logo_url: "",
                      logo_public_id: "",
                      cover_url: "",
                      cover_public_id: "",
                      website_url: "",
                      company_size: "",
                      industries: [],
                      locations: [],
                      description: "",
                      email_domain: "",
                      is_claimed: false,
                      is_verified: true,
                    });
                    return "Success";
                  }}
                />
              )}
              <ButtonDefault
                label={companyInfo.id ? "Câp nhật" : "Xác nhận"}
                classAll="w-50"
                funsHandle={async () => {
                  return await handleSave();
                }}
                disabled={!check()}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
