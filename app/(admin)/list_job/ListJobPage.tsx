"use client";

import ButtonDefault from "@/app/Component/ButtonDefault";
import ChangeNumberPage from "@/app/Component/ChangeNumberPage";
import DatePicker from "@/app/Component/DateSearch";
import ImageShow from "@/app/Component/ImageShow";
import InputAddressDefault from "@/app/Component/InputAddressDefault";
import InputSelectDefault from "@/app/Component/InputSelectDefault";
import InputTextDefault from "@/app/Component/InputTextDefault";
import InputTextEditer from "@/app/Component/InputTextEditer";
import ListSearch from "@/app/Component/ListSearch";
import { usePopup } from "@/app/Component/Popup";
import { getNameStatus, getStatus } from "@/app/constants/job/status";
import { useToast } from "@/app/hook/ToastContext";
import { useCategories } from "@/app/hook/useCategories";
import { JobItemEdit, JobItemShow } from "@/app/libs/types";
import { getStringDate, Relist, validateNumber } from "@/app/libs/utils";
import { setLoad } from "@/app/store/slices/webSlice";
import { AppDispatch, RootState } from "@/app/store/store";
import axios, {  AxiosResponse } from "axios";
import {
  ArrowDown,
  ArrowUp,
  PackageOpen,
  Plus,
  PlusIcon,
  Trash,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

type Paginate = {
  page: number;
  total_page: number;
  count: number | 0;
  next: string | null;
  previous: string | null;
  results: JobItemShow[];
  status: "Success";
} | null;

type PageProps = {
  initJob: Paginate;
  nameJob?: string;
  statusJob?: "pending" | "active" | "ban" | "";
};

// app/(admin)/list_job/ListJobPage.tsx
export default function ListJobPage({
  initJob,
  nameJob,
  statusJob,
}: PageProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { lang } = useSelector((state: RootState) => state.web);
  const { addToast } = useToast();
  const popup = usePopup();
  const router = useRouter();
  const { data: categories, isLoading, error } = useCategories("vie");
  const [category, setCategory] = useState<{
    industry: { name: string; value: string }[];
    location: { name: string; value: string; parent_id: string }[];
    formOfWork: { name: string; value: string }[];
    jobLevel: { name: string; value: string }[];
    education: { name: string; value: string }[];
    company: { id: string; name: string }[];
  }>({
    industry: [],
    location: [],
    formOfWork: [],
    jobLevel: [],
    education: [],
    company: [],
  });
  const [paginate, setPaginate] = useState<Paginate>(initJob);
  const [jobInfo, setJobInfo] = useState<JobItemEdit>({
    id: "",
    company: "",
    company_detail: {
      name: "",
      image: "",
    },
    name: "",
    source_link: "",
    description: {},
    status: "active",
    date_limited: "",
    date_created: "",
    descriptions: [],
    require: {
      id: "",
      job: "",
      location: "",
      quantity: 1,
      form_of_work: [],
      educations: [],
      industries: [],
      job_level: [],
      min_salary: 0,
      max_salary: 0,
      min_experience: 0,
      max_experience: 0,
    },
  });
  const [isOpen, setIsOpen] = useState({
    advance: false,
    create: false,
  });
  const [jobSearch, setJobSearch] = useState<{
    name: string;
    status: "" | "pending" | "active" | "ban";
  }>({
    name: nameJob || "",
    status: statusJob || "",
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

  const handleChangedescriptions = (value: {
    id: string;
    job: string;
    title: string;
    description: Record<string, any>;
    index: number;
  }) => {
    if (jobInfo.descriptions.length > 0) {
      const newDescriptions = jobInfo.descriptions.map((item) =>
        item.index === value.index ? value : item,
      );
      setJobInfo((prev) => {
        return { ...prev, descriptions: newDescriptions };
      });
    } else {
      setJobInfo((prev) => {
        return { ...prev, descriptions: [value] };
      });
    }
  };

  const handleMoveUp = (currentItem: {
    id: string;
    job: string;
    title: string;
    description: Record<string, any>;
    index: number;
  }) => {
    let tempObject: {
      id: string;
      job: string;
      title: string;
      description: Record<string, any>;
      index: number;
    } | null = null;
    let tempIndex = currentItem.index;
    const newDescriptions = jobInfo.descriptions.map((item, index) => {
      if (index === tempIndex - 1) {
        tempObject = { ...item, index: item.index + 1 };
        return { ...currentItem, index: currentItem.index - 1 };
      }
      if (index === tempIndex) {
        return tempObject ? tempObject : item;
      }
      return item;
    });
    setJobInfo((prev) => {
      return { ...prev, descriptions: newDescriptions };
    });
  };

  const handleMoveDown = (currentItem: {
    id: string;
    job: string;
    title: string;
    description: Record<string, any>;
    index: number;
  }) => {
    let tempIndex = currentItem.index;
    let tempObject = jobInfo.descriptions[tempIndex + 1];
    const newDescriptions = jobInfo.descriptions.map((item, index) => {
      if (index === tempIndex) {
        return tempObject ? { ...tempObject, index: tempIndex } : item;
      }
      if (index === tempIndex + 1) {
        return { ...currentItem, index: currentItem.index + 1 };
      }
      return item;
    });
    setJobInfo((prev) => {
      return { ...prev, descriptions: newDescriptions };
    });
  };

  const handleDeleteDecriptions = (index: number) => {
    const newDescriptions: {
      id: string;
      job: string;
      title: string;
      description: Record<string, any>;
      index: number;
    }[] = [];
    jobInfo.descriptions.forEach((item) => {
      if (item.index !== index) {
        newDescriptions.push(
          item.index > index ? { ...item, index: item.index - 1 } : item,
        );
      }
    });
    setJobInfo((prev) => {
      return { ...prev, descriptions: newDescriptions };
    });
  };

  const handleGet = async (
    name: string,
    companyName: string,
    status: "pending" | "active" | "ban" | "",
    page: string,
  ) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}job/many_search/?name=${name}&company=${companyName}&status=${status}`,
      );
      if (response.data.status === "Success") {
        router.push(
          `/list_job?name=${name}&company=${companyName}&status=${status}&page=${page}`,
          {
            scroll: false,
          },
        );
        setPaginate(response.data);
      }
      return response.data.status;
    } catch (err: any) {
      console.log(
        `Error: ${err.response.statusText ?? "No response received"}`,
      );
      return err.response.statusText ?? "No response received";
    }
  };

  const handleSave = async () => {
    const data = {
      ...jobInfo,
      description: JSON.stringify(jobInfo.description),
      descriptions: jobInfo.descriptions.map((item) => ({
        ...item,
        description: JSON.stringify(item.description),
      })),
    };
    return await handleWithToast(
      async () =>
        await axios.post(
          `${process.env.NEXT_PUBLIC_SERVER_URL}job/save/`,
          data,
          { withCredentials: true },
        ),
      async (response) => {
        if (paginate && paginate.page === 1) {
          if (jobInfo.id) {
            const rewriteJob = paginate.results.map((item) =>
              item.id === jobInfo.id ? response.data.job : item,
            );
            setPaginate({ ...paginate, results: rewriteJob });
          } else {
            setPaginate({
              ...paginate,
              results: [response.data.job, ...paginate.results],
            });
          }
        }
        resetState();
      },
    );
  };

  const handleDeleteJob = (id: string) => {
    return handleWithToast(
      async () =>
        await axios.delete(
          `${process.env.NEXT_PUBLIC_SERVER_URL}job/item/?id=${id}`,
          { withCredentials: true },
        ),
      async (response) => {
        if (paginate) {
          setPaginate({
            ...paginate,
            results: paginate.results.filter((item) => item.id !== id),
          });
        }
      },
    );
  };

  const handleChangePage = async (url: string | null) => {
    if (!url) return "No Url";
    return handleWithToast(
      async () => await axios.get(url),
      async (response) => {
        if (response.data.status === "Success") {
          setPaginate(response.data);
        }
      },
    );
  };

  const resetState = () => {
    setJobInfo({
      id: "",
      company: "",
      company_detail: {
        name: "",
        image: "",
      },
      name: "",
      source_link: "",
      description: {},
      status: "active",
      date_limited: "",
      date_created: "",
      descriptions: [],
      require: {
        id: "",
        job: "",
        location: "",
        quantity: 1,
        form_of_work: [],
        educations: [],
        industries: [],
        job_level: [],
        min_salary: 0,
        max_salary: 0,
        min_experience: 0,
        max_experience: 0,
      },
    });
    setIsOpen({
      create: false,
      advance: false,
    });
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
        company: categories.company,
      });
    }
  }, [isLoading, error, categories]);

  return (
    <>
      <div className="flex z-1 flex-col w-3/4 max-lg:w-[95%] max-sm:w-full min-w-0 h-screen gap-3 max-lg:gap-2 py-3 max-lg:py-2 items-stretch overflow-auto no-scroll">
        <div className="flex justify-between items-center p-3 bg-blue-default sm:rounded-2xl shadow-default">
          <p className="font-bold text-light-blue">Danh sách Tuyển dụng</p>
          <button
            className="bg-light-blue text-blue-default border-2 border-light-blue rounded-md scale-100 duration-200 ease-in hover:bg-blue-default hover:text-white active:scale-95"
            onClick={() => setIsOpen({ ...isOpen, create: true })}
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
        <div className="flex-1 flex flex-col gap-3 p-3 bg-white rounded-2xl shadow-default">
          <div className="flex gap-2 max-lg:flex-col">
            <InputTextDefault
              value={jobSearch.name}
              classAll="rounded-lg"
              label="Tên tuyển dụng"
              classLabel="w-40"
              className="flex-1"
              classDisable="flex-1"
              outValue={(value) => setJobSearch({ ...jobSearch, name: value })}
            />
            <ListSearch
              label="Trạng thái"
              classAll="rounded-lg"
              value={jobSearch.status}
              listValue={getStatus(lang)}
              attrSearch="name"
              attrGet="value"
              outValue={(value) =>
                setJobSearch({ ...jobSearch, status: value })
              }
            />
            <ButtonDefault
              label="Tìm kiếm"
              funsHandle={async () => {
                return handleGet(
                  jobSearch.name,
                  jobSearch.name,
                  jobSearch.status,
                  "1",
                );
              }}
            />
          </div>
          <div className="flex-1 p-2 flex flex-col gap-2 border-2 border-blue-default rounded-xl min-w-0 overflow-auto no-scroll">
            {paginate && paginate.results?.length > 0 ? (
              paginate.results.map((item, index) => (
                <div
                  key={item.id}
                  className="flex p-2 gap-2 items-end rounded-lg border-2 border-light-blue shadow-default duration-200 ease-in hover:border-dark-blue active:shadow-none cursor-pointer"
                  onClick={() => {
                    const descriptions = item.descriptions.map((desc) => {
                      return {
                        ...desc,
                        description: JSON.parse(desc.description),
                      };
                    });
                    setJobInfo({
                      ...item,
                      description: JSON.parse(item.description),
                      descriptions: descriptions.sort(
                        (a, b) => a.index - b.index,
                      ),
                    });
                    setIsOpen({ ...isOpen, create: true });
                  }}
                >
                  <ImageShow
                    link={item.company_detail.image}
                    alt={item.name}
                    typeShape="fixed"
                    classImage="object-contain"
                    className="rounded-lg max-w-30 max-sm:max-w-20 max-[400px]:hidden"
                  />
                  <div className="flex-1 flex flex-col min-w-0">
                    <p className="font-bold text-[30px] truncate">
                      {item.name}
                    </p>
                    <p className="truncate font-bold text-zinc-500">
                      {item.company_detail.name}
                    </p>
                    <p>Ngày tạo: {getStringDate(item.date_created)}</p>
                    <p>Trạng thái: {getNameStatus(item.status, lang)}</p>
                  </div>
                  <ButtonDefault
                    label="Xóa"
                    className="bg-red-400 border-red-400 hover:text-red-400"
                    classAll="w-30 max-md:w-15"
                    funsHandle={() => {
                      popup({
                        isOpen: true,
                        message: `Bạn có chắc muốn xóa Tuyển dụng: ${item.name}`,
                        title: "Xóa Tuyển dụng",
                        typeSubmit: "YrN",
                        handleFuns: () => handleDeleteJob(item.id),
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
                  Không tìm thấy Tuyển dụng nào
                </p>
              </div>
            )}
          </div>
          <ChangeNumberPage
            next={paginate?.next ?? null}
            previous={paginate?.previous ?? null}
            pageNumber={paginate?.page}
            onNextPage={async () =>
              await handleChangePage(paginate?.next ?? null)
            }
            onPreviousPage={async () =>
              await handleChangePage(paginate?.previous ?? null)
            }
          />
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
              <p className="font-bold text-light-blue">Tạo tuyển dụng</p>
              <button
                className="bg-light-blue text-blue-default border-2 border-light-blue rounded-md scale-100 duration-200 ease-in hover:bg-blue-default hover:text-white active:scale-95"
                onClick={() => setIsOpen({ ...isOpen, create: false })}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 flex flex-col gap-2 px-3 overflow-auto no-scroll">
              <div className="flex gap-2 items-center">
                <p className="font-bold">Thông tin chung</p>
                <span className="flex-1 border-b-2 border-dark-blue"></span>
              </div>
              <InputTextDefault
                label="Tên tuyển dụng"
                value={jobInfo.name}
                outValue={(value) => setJobInfo({ ...jobInfo, name: value })}
                classAll="rounded-lg"
                classLabel="rounded-md w-40"
              />
              <ListSearch
                attrGet="id"
                attrSearch="name"
                label="Công ty tuyển"
                classAll="rounded-lg"
                classLabel="rounded-md w-40"
                listValue={category.company}
                outValue={(value) =>
                  setJobInfo({
                    ...jobInfo,
                    company: value,
                  })
                }
                value={jobInfo.company}
              />
              <InputTextDefault
                label="Đường dẩn nguồn"
                value={jobInfo.source_link}
                outValue={(value) =>
                  setJobInfo({ ...jobInfo, source_link: value })
                }
                classAll="rounded-lg"
                classLabel="rounded-md w-40"
                placeholder="https://name_website/"
              />
              <ListSearch
                attrGet="value"
                attrSearch="name"
                label="Trạng thái"
                value={jobInfo.status}
                classAll="rounded-lg"
                classLabel="rounded-md w-40"
                className="z-7"
                listValue={getStatus(lang)}
                outValue={(value) => setJobInfo({ ...jobInfo, status: value })}
              />
              <DatePicker
                classAll="rounded-lg"
                classLabel="rounded-md w-40"
                label="Ngày hết hạn"
                className="z-6"
                dateValue={jobInfo.date_limited}
                outValue={(value) =>
                  setJobInfo({ ...jobInfo, date_limited: value })
                }
              />
              <div className="flex gap-2 items-center">
                <p className="font-bold">Yêu cầu tuyển dụng</p>
                <span className="flex-1 border-b-2 border-dark-blue"></span>
              </div>
              <InputAddressDefault
                classAll="rounded-lg"
                className="z-5"
                classLabel="rounded-md w-40"
                label="Địa điểm"
                placeholder="Nhập địa điểm"
                listSearch={category.location}
                value={jobInfo.require.location}
                outValue={(value) =>
                  setJobInfo({
                    ...jobInfo,
                    require: { ...jobInfo.require, location: value },
                  })
                }
              />
              <InputSelectDefault
                classAll="rounded-lg"
                className="z-4"
                classLabel="rounded-md w-40"
                label="Hình thức làm việc"
                placeholder="Nhập hình thức làm việc"
                listSearch={category.formOfWork}
                value={jobInfo.require.form_of_work}
                outValue={(value) =>
                  setJobInfo({
                    ...jobInfo,
                    require: { ...jobInfo.require, form_of_work: value },
                  })
                }
              />
              <InputSelectDefault
                classAll="rounded-lg"
                className="z-3"
                classLabel="rounded-md w-40"
                label="Học vấn"
                placeholder="Nhập học vấn"
                listSearch={category.education}
                value={jobInfo.require.educations}
                outValue={(value) =>
                  setJobInfo({
                    ...jobInfo,
                    require: { ...jobInfo.require, educations: value },
                  })
                }
              />
              <InputSelectDefault
                classAll="rounded-lg"
                className="z-2"
                classLabel="rounded-md w-40"
                label="Ngành nghề"
                placeholder="Nhập ngành nghề"
                listSearch={category.industry}
                value={jobInfo.require.industries}
                outValue={(value) =>
                  setJobInfo({
                    ...jobInfo,
                    require: { ...jobInfo.require, industries: value },
                  })
                }
              />
              <InputSelectDefault
                classAll="rounded-lg"
                className="z-2"
                classLabel="rounded-md w-40"
                label="Cấp bật"
                placeholder="Nhập Cấp bật"
                listSearch={category.jobLevel}
                value={jobInfo.require.job_level}
                outValue={(value) =>
                  setJobInfo({
                    ...jobInfo,
                    require: { ...jobInfo.require, job_level: value },
                  })
                }
              />
              <InputTextDefault
                classAll="rounded-lg"
                className="z-1"
                classLabel="rounded-md w-40"
                label="Lương tối đa"
                placeholder="15000000"
                regex={/[^0-9]/g}
                value={jobInfo.require.max_salary?.toString() || ""}
                outValue={(value) =>
                  setJobInfo({
                    ...jobInfo,
                    require: {
                      ...jobInfo.require,
                      max_salary: validateNumber(value, undefined, 0),
                    },
                  })
                }
              />
              <InputTextDefault
                classAll="rounded-lg"
                className="z-1"
                classLabel="rounded-md w-40"
                label="Lương tối thiểu"
                placeholder="1000000"
                regex={/[^0-9]/g}
                value={jobInfo.require.min_salary?.toString() || ""}
                outValue={(value) =>
                  setJobInfo({
                    ...jobInfo,
                    require: {
                      ...jobInfo.require,
                      min_salary: validateNumber(value, undefined, 0),
                    },
                  })
                }
              />
              <InputTextDefault
                classAll="rounded-lg"
                className="z-1"
                classLabel="rounded-md w-40"
                label="Kinh nghiệm tối đa"
                placeholder="5"
                regex={/[^0-9]/g}
                value={jobInfo.require.max_experience?.toString() || ""}
                outValue={(value) =>
                  setJobInfo({
                    ...jobInfo,
                    require: {
                      ...jobInfo.require,
                      max_experience: validateNumber(value, 100, 0),
                    },
                  })
                }
              />
              <InputTextDefault
                classAll="rounded-lg"
                className="z-1"
                classLabel="rounded-md w-45"
                label="Kinh nghiệm tối thiểu"
                placeholder="0"
                regex={/[^0-9]/g}
                value={jobInfo.require.min_experience?.toString() || ""}
                outValue={(value) =>
                  setJobInfo({
                    ...jobInfo,
                    require: {
                      ...jobInfo.require,
                      min_experience: validateNumber(value, 100, 0),
                    },
                  })
                }
              />
              <InputTextDefault
                classAll="rounded-lg"
                className="z-1"
                classLabel="rounded-md w-45"
                label="Số lượng"
                regex={/[^0-9]/g}
                value={jobInfo.require.quantity?.toString() || ""}
                outValue={(value) =>
                  setJobInfo({
                    ...jobInfo,
                    require: {
                      ...jobInfo.require,
                      quantity: validateNumber(value, 100, 0),
                    },
                  })
                }
              />
              <div className="flex gap-2 items-center">
                <p className="font-bold">Mô tả tuyển dụng</p>
                <span className="flex-1 border-b-2 border-dark-blue"></span>
              </div>
              {jobInfo.descriptions.length > 0 &&
                jobInfo.descriptions.map((item, index) => (
                  <div
                    key={item.index}
                    className="flex flex-col gap-2 p-2 rounded-lg bg-white border-2 border-blue-default"
                  >
                    <div className="flex gap-2">
                      <InputTextDefault
                        classAll="rounded-lg"
                        className="flex-1"
                        classLabel="rounded-md w-45"
                        label="Tiêu đề"
                        placeholder={`Tiêu đề ${index + 1}`}
                        value={item.title}
                        outValue={(value) =>
                          handleChangedescriptions({
                            ...item,
                            title: value,
                          })
                        }
                      />
                      <div className="flex max-[450px]:flex-col gap-2">
                        <button
                          className={`flex items-center justify-center p-2 rounded-lg bg-white border-2 ${item.index === 0 ? "border-zinc-400 text-zinc-400 cursor-not-allowed" : "border-blue-default text-blue-default hover:bg-blue-default hover:text-white cursor-pointer"} duration-200 ease-in`}
                          disabled={item.index === 0}
                          onClick={() => handleMoveUp({ ...item })}
                        >
                          <ArrowUp className="w-5 h-5" />
                        </button>
                        <button
                          className={`flex items-center justify-center p-2 rounded-lg bg-white border-2 ${item.index === jobInfo.descriptions.length - 1 ? "border-zinc-400 text-zinc-400 cursor-not-allowed" : "border-blue-default text-blue-default hover:bg-blue-default hover:text-white cursor-pointer"} duration-200 ease-in`}
                          disabled={
                            item.index === jobInfo.descriptions.length - 1
                          }
                          onClick={() => handleMoveDown({ ...item })}
                        >
                          <ArrowDown className="w-5 h-5" />
                        </button>
                      </div>

                      <button
                        className="flex items-center justify-center p-2 rounded-lg bg-red-400 border-2 border-red-400 text-white duration-200 ease-in hover:bg-white hover:text-red-400"
                        onClick={() => handleDeleteDecriptions(item.index)}
                      >
                        <Trash className="w-5 h-5" />
                      </button>
                    </div>
                    <InputTextEditer
                      classAll="rounded-lg"
                      classLabel="rounded-md w-45"
                      label="Mô tả"
                      placeholder={`Mô tả ${index + 1}`}
                      value={item.description}
                      outValue={(value) =>
                        handleChangedescriptions({
                          ...item,
                          description: value,
                        })
                      }
                    />
                  </div>
                ))}
              <button
                className="flex items-center justify-center p-2 rounded-lg bg-white border-2 border-blue-default text-blue-default duration-200 ease-in hover:bg-blue-default hover:text-white"
                onClick={() => {
                  setJobInfo({
                    ...jobInfo,
                    descriptions: [
                      ...jobInfo.descriptions,
                      {
                        id: "",
                        job: "",
                        title: "",
                        description: {},
                        index: jobInfo.descriptions.length,
                      },
                    ],
                  });
                }}
              >
                <PlusIcon className="w-5 h-5" />
              </button>
              <div className="flex gap-2 items-stretch">
                {jobInfo.id && (
                  <button
                    onClick={() => resetState()}
                    className="flex-1 rounded-lg bg-red-400 border-2 border-red-400 text-white duration-200 ease-in hover:bg-white hover:text-red-400"
                  >
                    Hủy
                  </button>
                )}
                <ButtonDefault
                  label="Lưu"
                  classAll="flex-1 rounded-lg"
                  funsHandle={async () => {
                    return await handleSave();
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
