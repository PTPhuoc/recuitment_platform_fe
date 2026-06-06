"use client";

import ButtonDefault from "@/app/Component/ButtonDefault";
import ChangeNumberPage from "@/app/Component/ChangeNumberPage";
import InputTextDefault from "@/app/Component/InputTextDefault";
import ListSearch from "@/app/Component/ListSearch";
import { usePopup } from "@/app/Component/Popup";
import { useToast } from "@/app/hook/ToastContext";
import { checkField } from "@/app/libs/utils";
import { setLoad } from "@/app/store/slices/webSlice";
import { AppDispatch, RootState } from "@/app/store/store";
import axios from "axios";
import { el } from "date-fns/locale";
import { PackageOpen, Plus, X } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const listLang = [
  { name: "Tiếng Việt", value: "vie" },
  { name: "Tiếng Anh", value: "eng" },
];

type IndustryItem = {
  id: string;
  slug: string;
  translations: Array<{
    id: string;
    industry_id: string;
    language_code: "vie" | "eng";
    name: string;
  }>;
};

type IndustryPagenigation = {
  count: number;
  next: string | null;
  previous: string | null;
  results: IndustryItem[] | [];
  status: string;
};

type IndusTryPageProps = {
  initIndustry: IndustryPagenigation | null;
  initName: string | "";
  initSlug: string | "";
  initLang: string | "";
};

export default function IndustryPage({
  initIndustry,
  initName,
  initSlug,
  initLang,
}: IndusTryPageProps) {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const popup = usePopup();
  const { lang } = useSelector((state: RootState) => state.web);
  const { addToast } = useToast();
  const [industryList, setIndustryList] = useState<IndustryPagenigation>(
    initIndustry ?? {
      count: 1,
      next: null,
      previous: null,
      results: [],
      status: "Success",
    },
  );
  const [itemExists, setItemExists] = useState<{
    id: string;
    slug: string;
    translations: {
      language_code: "vie" | "eng";
      name: string;
    };
  } | null>(null);
  const [search, setSearch] = useState({
    name: initName,
    slug: initSlug,
    lang: lang,
  });
  const [industry, setIndustry] = useState({
    id: "",
    name: "",
    slug: "",
    lang: lang,
  });
  const [previewLang, setPreviewLang] = useState<
    | {
        id: string;
        industry_id: string;
        slug: string;
        name: string;
        language_code: "vie" | "eng";
      }[]
    | null
  >(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleSave = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}industry/save/`,
        { ...industry },
        { withCredentials: true },
      );
      if (response.data.status === "Success") {
        setIndustry({ id: "", name: "", slug: "", lang: lang });
        setIsOpen(false);
        await handleSearch(search.name, search.slug, search.lang);
      } else {
        addToast({
          title: "Lỗi lưu",
          description: response.data.message,
          type: "error",
        });
      }
      return response.data.status;
    } catch (error: any) {
      addToast({
        title: "Lỗi lưu",
        description: error.response.statusText ?? "No response received",
        type: "error",
      });
      return error.response.statusText ?? "No response received";
    }
  };

  const handleCheckExists = (lang: string, slug: string, name: string) => {
    if (industryList?.results.length === 0) return null;
    const slugExists = industryList.results.find((item) => item.slug === slug);
    if (slugExists?.translations && slugExists.translations.length > 0) {
      const translation = slugExists.translations.find(
        (item) =>
          item.language_code === lang &&
          item.name.toLowerCase().includes(name.toLowerCase()),
      );
      if (translation) {
        return {
          id: slugExists.id,
          slug: slugExists.slug,
          translations: translation,
        };
      }
    }
    return null;
  };

  const handleSearch = async (name: string, slug: string, lang: string) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}industry/many_search/`,
        {
          params: { name, slug, lang },
        },
      );
      if (response.data.status === "Success") {
        router.push(`/industry?name=${name}&slug=${slug}&lang=${lang}`, {
          scroll: false,
        });
        setIndustryList(response.data);
      } else {
        setIndustryList({
          count: 1,
          next: null,
          previous: null,
          results: [],
          status: response.data.status,
        });
        addToast({
          title: "Lỗi tìm kiếm",
          description: response.data.message,
          type: "error",
        });
      }
      return response.data.status;
    } catch (error: any) {
      addToast({
        title: "Lỗi tìm kiếm",
        description: `${error.response.statusText ?? "No response received"}`,
        type: "error",
      });
      return error.response.statusText ?? "No response received";
    }
  };

  const handleChangePage = async (url: string | null) => {
    if (!url) return "No url";
    try {
      const response = await axios.get(url);
      if (response.data.status === "Success") {
        setIndustryList(response.data);
      } else {
        addToast({
          title: "Lỗi tìm kiếm",
          description: response.data.message,
          type: "error",
        });
      }
      return response.data.status;
    } catch (error: any) {
      addToast({
        title: "Lỗi tìm kiếm",
        description: `${error.response.statusText ?? "No response received"}`,
        type: "error",
      });
      return error.response.statusText ?? "No response received";
    }
  };

  const handleDeleteSlug = async (id: string) => {
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_SERVER_URL}industry/slug/?id=${id}`,
        { withCredentials: true },
      );
      if (response.data.status === "Success") {
        await handleSearch(search.name, search.slug, search.lang);
        return response.data.status;
      } else {
        addToast({
          title: "Lỗi xóa",
          description: response.data.message,
          type: "error",
        });
        return response.data.status;
      }
    } catch (error: any) {
      addToast({
        title: "Lỗi tìm kiếm",
        description: `${error.response.statusText ?? "No response received"}`,
        type: "error",
      });
      return error.response.statusText ?? "No response received";
    }
  };

  const handleDeleteTranslation = async (id: string) => {
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_SERVER_URL}industry/translation/?id=${id}`,
        { withCredentials: true },
      );
      if (response.data.status === "Success") {
        await handleSearch(search.name, search.slug, search.lang);
        return response.data.status;
      } else {
        addToast({
          title: "Lỗi xóa",
          description: response.data.message,
          type: "error",
        });
        return response.data.status;
      }
    } catch (error: any) {
      addToast({
        title: "Lỗi tìm kiếm",
        description: `${error.response.statusText ?? "No response received"}`,
        type: "error",
      });
      return error.response.statusText ?? "No response received";
    }
  };

  useEffect(() => {
    if (industry.lang) {
      const time = setTimeout(() => {
        setItemExists(
          handleCheckExists(industry.lang, industry.slug, industry.name),
        );
      }, 500);
      return () => clearTimeout(time);
    }
  }, [industry]);

  useEffect(() => {
    dispatch(setLoad(false));
  }, []);

  return (
    <>
      <div className="flex flex-col w-3/4 max-lg:w-[95%] max-sm:w-full gap-3 max-lg:gap-2 py-3 max-lg:py-2 items-stretch overflow-auto no-scroll min-h-0">
        <div className="flex items-center justify-between p-3 bg-blue-default sm:rounded-2xl shadow-default">
          <p className="font-bold text-light-blue">Danh sách Nghề nghiệp</p>
          <button
            className="bg-light-blue text-blue-default border-2 border-light-blue rounded-md scale-100 duration-200 ease-in hover:bg-blue-default hover:text-white active:scale-95"
            onClick={() => setIsOpen(true)}
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
        <div className="flex-1 flex flex-col gap-2 p-3 bg-white rounded-2xl shadow-default min-h-0">
          <div className="flex items-stretch gap-3 flex-wrap">
            <InputTextDefault
              className="flex-1"
              outValue={(value) => setSearch({ ...search, name: value })}
              value={search.name}
              label="Tên"
            />
            <InputTextDefault
              className="flex-1"
              outValue={(value) => setSearch({ ...search, slug: value })}
              value={search.slug}
              label="Tên chung"
            />
          </div>
          <div className="flex items-stretch gap-3 flex-wrap">
            <ListSearch
              className="z-1 flex-2"
              listValue={listLang}
              attrSearch="name"
              attrGet="value"
              value={initLang ?? search.lang}
              placeholder="Chọn ngôn ngữ"
              label="Ngôn ngữ"
              outValue={(value: any) => setSearch({ ...search, lang: value })}
            />
            <ButtonDefault
              label="Tìm kiếm"
              funsHandle={async () =>
                await handleSearch(search.name, search.slug, search.lang)
              }
              className="flex-1 min-w-50"
              classLoad="flex-1 min-w-50"
              classDisabled="flex-1 min-w-50"
            />
          </div>
          <div className="flex-1 flex gap-2 max-lg:flex-col min-h-0">
            <div className="flex-1 flex flex-col gap-2 p-2 rounded-xl border-2 border-blue-default shadow-default">
              <div className="grid grid-cols-3 gap-2">
                <p className="p-1 bg-light-blue rounded-lg text-center">ID</p>
                <p className="p-1 bg-light-blue rounded-lg text-center">
                  Tên chung
                </p>
                <p className="p-1 bg-light-blue rounded-lg text-center">
                  Tùy chọn
                </p>
              </div>
              <div className="flex-1 flex flex-col gap-2 overflow-auto no-scroll max-lg:max-h-100 min-h-100">
                {industryList.results && industryList.results.length > 0 ? (
                  industryList.results.map((item) => (
                    <React.Fragment key={item.id}>
                      <div className="h-px w-full bg-light-blue shrink-0"></div>
                      <div
                        className="group w-full grid gap-2 grid-cols-3 rounded-lg border-2 border-white duration-200 ease-in cursor-pointer hover:border-light-blue"
                        onClick={(e) => {
                          e.stopPropagation();
                          setPreviewLang(
                            item.translations && item.translations.length > 0
                              ? item.translations.map((i) => {
                                  return {
                                    id: i.id,
                                    industry_id: i.industry_id,
                                    slug: item.slug,
                                    name: i.name,
                                    language_code: i.language_code,
                                  };
                                })
                              : null,
                          );
                        }}
                      >
                        <p className="flex items-center truncate p-1 border-2 border-zinc-200 rounded-lg duration-200 ease-in group-hover:border-white">
                          {item.id}
                        </p>
                        <p className="flex items-center p-1 border-2 border-zinc-200 rounded-lg duration-200 ease-in overflow-auto no-scroll group-hover:border-white">
                          {item.slug}
                        </p>
                        <div className="flex gap-2 items-center justify-center duration-200 ease-in group-hover:border-white">
                          <ButtonDefault
                            label="Thêm"
                            funsHandle={() => {
                              setIndustry({
                                ...industry,
                                id: "",
                                slug: item.slug,
                              });
                              setIsOpen(true);
                              return "Success";
                            }}
                          />
                          <ButtonDefault
                            label="Xóa"
                            className="border-red-400 bg-red-400 hover:text-red-400"
                            funsHandle={() => {
                              popup({
                                isOpen: true,
                                message: "Bạn có chắc muốn xóa " + item.slug,
                                title: "Xóa Nghề nghiệp",
                                typeSubmit: "YrN",
                                handleFuns: async () =>
                                  await handleDeleteSlug(item.id),
                              });
                              return "Success";
                            }}
                          />
                        </div>
                      </div>
                    </React.Fragment>
                  ))
                ) : (
                  <div className="flex-1 flex flex-col justify-center items-center">
                    <PackageOpen className="h-20 w-20 text-zinc-400" />
                    <p className="font-bold text-zinc-400">
                      Không tìm thấy Ngành nghề nào
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div className="flex-1 flex flex-col p-2 gap-2 rounded-xl border-2 border-blue-default shadow-default">
              <div className="grid grid-cols-3 gap-2">
                <p className="p-1 bg-light-blue rounded-lg text-center">
                  Ngôn ngữ
                </p>
                <p className="p-1 bg-light-blue rounded-lg text-center">Tên</p>
                <p className="p-1 bg-light-blue rounded-lg text-center">
                  Tùy chọn
                </p>
              </div>
              <div className="flex-1 flex flex-col gap-2 overflow-auto no-scroll max-lg:max-h-100 min-h-100">
                {previewLang && previewLang.length > 0 ? (
                  previewLang.map((item) => (
                    <React.Fragment key={item.id}>
                      <div className="h-px w-full bg-light-blue shrink-0"></div>
                      <div className="group w-full grid gap-2 grid-cols-3 rounded-lg border-2 border-white duration-200 ease-in hover:border-light-blue">
                        <p className="flex items-center truncate p-1 border-2 border-zinc-200 rounded-lg duration-200 ease-in group-hover:border-white">
                          {item.language_code}
                        </p>
                        <p className="flex items-center text-nowrap p-1 border-2 border-zinc-200 rounded-lg duration-200 ease-in overflow-auto no-scroll group-hover:border-white">
                          {item.name}
                        </p>
                        <div className="flex gap-2 items-center justify-center duration-200 ease-in group-hover:border-white">
                          <ButtonDefault
                            label="Sửa"
                            funsHandle={() => {
                              setIndustry({
                                ...industry,
                                id: item.industry_id,
                                slug: item.slug,
                                name: item.name,
                                lang: item.language_code,
                              });
                              setIsOpen(true);
                              return "Success";
                            }}
                          />
                          <ButtonDefault
                            label="Xóa"
                            className="border-red-400 bg-red-400 hover:text-red-400"
                            funsHandle={() => {
                              popup({
                                isOpen: true,
                                message:
                                  "Bạn có chắc muốn xóa bản dịch " + item.name,
                                title: "Xóa bản dịch Nghề nghiệp",
                                typeSubmit: "YrN",
                                handleFuns: async () =>
                                  await handleDeleteTranslation(item.id),
                              });
                              return "Success";
                            }}
                          />
                        </div>
                      </div>
                    </React.Fragment>
                  ))
                ) : (
                  <div className="flex-1 flex flex-col justify-center items-center">
                    <PackageOpen className="h-20 w-20 text-zinc-400" />
                    <p className="font-bold text-zinc-400">
                      Ngành nghề này chưa có bản dịch nào
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
          <ChangeNumberPage
            next={industryList.next ?? null}
            onNextPage={async () => {
              return await handleChangePage(industryList.next);
            }}
            previous={industryList.previous ?? null}
            onPreviousPage={async () => {
              return await handleChangePage(industryList.previous);
            }}
          />
        </div>
      </div>
      <div
        className={`fixed top-0 left-0 z-2 flex w-full h-full justify-end duration-500 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"}`}
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(false);
        }}
      >
        <div
          className="flex flex-col gap-3 max-lg:gap-2 py-3 max-lg:py-2 w-1/4 max-lg:w-1/2 max-sm:w-full border-l-2 border-dark-blue h-full bg-white shadow-default"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center p-3 bg-blue-default shadow-default">
            <p className="font-bold text-light-blue">
              Tạo danh mục Nghề nghiệp
            </p>
            <button
              className="bg-light-blue text-blue-default border-2 border-light-blue rounded-md scale-100 duration-200 ease-in hover:bg-blue-default hover:text-white active:scale-95"
              onClick={() => setIsOpen(false)}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="flex-1 flex flex-col gap-3 px-3">
            <InputTextDefault
              className="rounded-xl"
              label="Tên chung"
              placeholder="Tên chung"
              value={industry.slug}
              outValue={(value) => setIndustry({ ...industry, slug: value })}
            />
            <ListSearch
              className="z-1"
              listValue={listLang}
              attrSearch="name"
              attrGet="value"
              value={industry.lang}
              placeholder="Chọn ngôn ngữ"
              label="Ngôn ngữ"
              outValue={(value: any) =>
                setIndustry({ ...industry, lang: value })
              }
            />
            <InputTextDefault
              className="rounded-xl"
              label="Tên"
              placeholder="Tên lĩnh vực"
              value={industry.name}
              outValue={(value) => setIndustry({ ...industry, name: value })}
            />
            <div className="flex gap-3 items-center">
              <ButtonDefault
                className="flex-1 rounded-xl"
                classDisabled="flex-1 rounded-xl"
                classLoad="flex-1 rounded-xl"
                label="Lưu Nghề nghiệp"
                disabled={
                  !checkField({
                    name: industry.name,
                    lang: industry.lang,
                    slug: industry.slug,
                  }) ||
                  (itemExists !== null && itemExists.id !== industry.id)
                }
                funsHandle={async () => await handleSave()}
              />
              {industry.id && (
                <ButtonDefault
                  disabled={false}
                  className="flex-1 rounded-xl bg-red-400 border-red-400 hover:text-red-400"
                  label="Hủy cập nhật"
                  funsHandle={() => {
                    setIndustry({ id: "", name: "", slug: "", lang: lang });
                    return "Success";
                  }}
                />
              )}
            </div>
            <div className="flex-1 flex flex-col gap-3">
              {industry.lang ? (
                itemExists ? (
                  <>
                    <div className="flex items-center gap-2">
                      <p className="w-30 text-center text-blue-default font-bold rounded-xl bg-light-blue">
                        ID
                      </p>
                      <p className="flex-1 border-b-2 border-dark-blue">
                        {itemExists.id}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <p className="w-30 text-center text-blue-default font-bold rounded-xl bg-light-blue">
                        Tên chung
                      </p>
                      <p className="flex-1 border-b-2 border-dark-blue">
                        {itemExists.slug}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <p className="w-30 text-center text-blue-default font-bold rounded-xl bg-light-blue">
                        Ngôn ngữ
                      </p>
                      <p className="flex-1 border-b-2 border-dark-blue">
                        {itemExists.translations
                          ? itemExists.translations.language_code
                          : "Chưa đặt ngôn ngữ"}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <p className="w-30 text-center text-blue-default font-bold rounded-xl bg-light-blue">
                        Tên
                      </p>
                      <p className="flex-1 border-b-2 border-dark-blue">
                        {itemExists.translations
                          ? itemExists.translations.name
                          : "Chưa đặt tên"}
                      </p>
                    </div>
                    <ButtonDefault
                      disabled={false}
                      label="Sử dụng"
                      className="rounded-xl"
                      funsHandle={() => {
                        setIndustry({
                          id: itemExists.id,
                          slug: itemExists.slug,
                          lang: itemExists.translations?.language_code ?? lang,
                          name: itemExists.translations?.name ?? "",
                        });
                        return "Success";
                      }}
                    />
                  </>
                ) : (
                  <p className="flex-1 flex justify-center items-center font-bold text-zinc-400">
                    Không tìm thấy
                  </p>
                )
              ) : (
                <p className="flex-1 flex justify-center items-center font-bold text-zinc-400">
                  Chờ ngôn ngữ
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
