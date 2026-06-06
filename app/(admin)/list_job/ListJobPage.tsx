"use client";

import ButtonDefault from "@/app/Component/ButtonDefault";
import DatePicker from "@/app/Component/DateSearch";
import InputAddressDefault from "@/app/Component/InputAddressDefault";
import InputNumberDefault from "@/app/Component/InputNumberDefault";
import InputSelectDefault from "@/app/Component/InputSelectDefault";
import InputTextDefault from "@/app/Component/InputTextDefault";
import InputTextEditer from "@/app/Component/InputTextEditer";
import ListSearch from "@/app/Component/ListSearch";
import { useToast } from "@/app/hook/ToastContext";
import { useCategories } from "@/app/hook/useCategories";
import { Relist } from "@/app/libs/utils";
import { setLoad } from "@/app/store/slices/webSlice";
import { AppDispatch } from "@/app/store/store";
import axios, { AxiosError, AxiosResponse } from "axios";
import { ArrowDown, ArrowUp, Plus, PlusIcon, Trash, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const listStatus = [
  { id: "pending", name: "Pending" },
  { id: "active", name: "Active" },
  { id: "ban", name: "Ban" },
];

type JobItem = {
  id: string;
  company: string;
  name: string;
  source_link: string;
  description: Record<string, any>;
  status: "pending" | "active" | "ban" | string;
  date_limited: Date | "";
  descriptions: {
    id: string;
    job: string;
    title: string;
    description: Record<string, any>;
    index: number;
  }[];
  require: {
    id: string;
    job: string;
    location: string;
    form_of_work: string[];
    educations: string[];
    industries: string[];
    min_salary: number;
    max_salary: number;
    min_experience: number;
    max_experience: number;
  };
};

type JobPaginate = {
  count: number | 0;
  next: string | null;
  previous: string | null;
  results: JobItem[];
  status: "Success";
} | null;

type PageProps = {
  initJob: JobPaginate;
};

// app/(admin)/list_job/ListJobPage.tsx
export default function ListJobPage({ initJob }: PageProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { addToast } = useToast();
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
  const [jobPaginate, setJobPaginate] = useState<JobPaginate>(initJob);
  const [jobInfo, setJobInfo] = useState<JobItem>({
    id: "",
    company: "",
    name: "",
    source_link: "",
    description: {},
    status: "active",
    date_limited: "",
    descriptions: [],
    require: {
      id: "",
      job: "",
      location: "",
      form_of_work: [],
      educations: [],
      industries: [],
      min_salary: 0,
      max_salary: 0,
      min_experience: 0,
      max_experience: 0,
    },
  });
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

  const handleDelete = (index: number) => {
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

  const handleGet = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}job/many_search/`,
      );
      if (response.data.status === "Success") {
        setJobPaginate(response.data.jobs);
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
    await handleWithToast(
      async () =>
        await axios.post(
          `${process.env.NEXT_PUBLIC_SERVER_URL}job/save/`,
          data,
          { withCredentials: true },
        ),
      async (response) => {
        await handleGet();
      },
    );
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

  useEffect(() => {
    console.log(jobInfo);
  }, [jobInfo]);

  return (
    <>
      <div className="flex flex-col w-3/4 max-lg:w-[95%] max-sm:w-full h-full gap-3 max-lg:gap-2 py-3 max-lg:py-2 items-stretch overflow-auto no-scroll">
        <div className="flex justify-between items-center p-3 bg-blue-default sm:rounded-2xl shadow-default">
          <p className="font-bold text-light-blue">Danh sách Tuyển dụng</p>
          <button
            className="bg-light-blue text-blue-default border-2 border-light-blue rounded-md scale-100 duration-200 ease-in hover:bg-blue-default hover:text-white active:scale-95"
            onClick={() => setIsOpen({ ...isOpen, create: true })}
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
        <div className="flex-1 flex flex-col gap-3 p-3 bg-white rounded-2xl shadow-default"></div>
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
                outValue={(value) => setJobInfo({ ...jobInfo, company: value })}
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
                attrGet="id"
                attrSearch="name"
                label="Trạng thái"
                value={jobInfo.status}
                classAll="rounded-lg"
                classLabel="rounded-md w-40"
                listValue={listStatus}
                outValue={(value) => setJobInfo({ ...jobInfo, status: value })}
              />
              <DatePicker
                classAll="rounded-lg"
                classLabel="rounded-md w-40"
                label="Ngày hết hạn"
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
                className="z-4"
                classLabel="rounded-md w-40"
                label="Địa điểm"
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
                className="z-3"
                classLabel="rounded-md w-40"
                label="Hình thức làm việc"
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
                className="z-2"
                classLabel="rounded-md w-40"
                label="Học vấn"
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
                className="z-1"
                classLabel="rounded-md w-40"
                label="Ngành nghề"
                listSearch={category.industry}
                value={jobInfo.require.industries}
                outValue={(value) =>
                  setJobInfo({
                    ...jobInfo,
                    require: { ...jobInfo.require, industries: value },
                  })
                }
              />
              <InputNumberDefault
                classAll="rounded-lg"
                className="z-1"
                classLabel="rounded-md w-40"
                label="Lương tối đa"
                value={jobInfo.require.max_salary}
                outValue={(value) =>
                  setJobInfo({
                    ...jobInfo,
                    require: {
                      ...jobInfo.require,
                      max_salary: value ? value : 0,
                    },
                  })
                }
              />
              <InputNumberDefault
                classAll="rounded-lg"
                className="z-1"
                classLabel="rounded-md w-40"
                label="Lương tối thiểu"
                value={jobInfo.require.min_salary}
                outValue={(value) =>
                  setJobInfo({
                    ...jobInfo,
                    require: {
                      ...jobInfo.require,
                      min_salary: value ? value : 0,
                    },
                  })
                }
              />
              <InputNumberDefault
                classAll="rounded-lg"
                className="z-1"
                classLabel="rounded-md w-40"
                label="Kinh nghiệm tối đa"
                value={jobInfo.require.max_experience}
                outValue={(value) =>
                  setJobInfo({
                    ...jobInfo,
                    require: {
                      ...jobInfo.require,
                      max_experience: value ? value : 0,
                    },
                  })
                }
              />
              <InputNumberDefault
                classAll="rounded-lg"
                className="z-1"
                classLabel="rounded-md w-45"
                label="Kinh nghiệm tối thiểu"
                value={jobInfo.require.min_experience}
                outValue={(value) =>
                  setJobInfo({
                    ...jobInfo,
                    require: {
                      ...jobInfo.require,
                      min_experience: value ? value : 0,
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
                      <button
                        className="flex items-center justify-center p-2 rounded-lg bg-red-400 border-2 border-red-400 text-white duration-200 ease-in hover:bg-white hover:text-red-400"
                        onClick={() => handleDelete(item.index)}
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
