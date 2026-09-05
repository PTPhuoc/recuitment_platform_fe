"use client";

import ButtonDefault from "@/app/Component/ButtonDefault";
import JobSearch from "@/app/Component/Input/JobSearch";
import { useCategories } from "@/app/hook/useCategories";
import { Relist } from "@/app/libs/utils";
import { AppDispatch, RootState } from "@/app/store/store";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ListSingleFilter from "@/app/Component/CheckBox/ListSingleFilter";
import ListMultipleFilter from "@/app/Component/CheckBox/ListMultipleFilter";
import { Categories, JobItemShow, JobPaginate } from "@/app/libs/types";
import JCDefault from "@/app/Component/JobCard/JCDefault";
import { Funnel, PackageOpen } from "lucide-react";
import { useRouter } from "next/navigation";
import { setLoad } from "@/app/store/slices/webSlice";
import BG2 from "@/app/svgs/BG2.svg";
import Image from "next/image";
import axios from "axios";
import ChangeNumberPage from "@/app/Component/ChangeNumberPage";
import useIntersectionObserver from "@/app/hook/useIntersectionObserver";

type PageProps = {
  jobPaginate: JobPaginate;
};

type JobSearchProps = {
  name: string;
  location: string;
  industry: string;
  salary: string;
  experience: string;
  jobLevel: string;
  form_of_work: string[];
  educations: string[];
  page: number;
};

type JobFilterProps = {
  salary: boolean;
  exprience: boolean;
  jobLevel: boolean;
  form_of_work: boolean;
  education: boolean;
};

// app/(client)/jobs/page.tsx
export default function JobsPage({ jobPaginate }: PageProps) {
  const { lang } = useSelector((state: RootState) => state.web);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const categories = useCategories(lang);
  const [jobs, setJobs] = useState<JobItemShow[]>(jobPaginate.results);
  const [paginate, setPaginate] = useState<JobPaginate>(jobPaginate);
  const [isFilter, setIsFilter] = useState(false);
  const [search, setSearch] = useState<JobSearchProps>({
    name: "",
    location: "",
    industry: "",
    salary: "",
    experience: "",
    jobLevel: "",
    form_of_work: [],
    educations: [],
    page: paginate.page,
  });
  const [jobFilter, setJobFilter] = useState<JobFilterProps>({
    salary: false,
    exprience: false,
    jobLevel: false,
    form_of_work: false,
    education: false,
  });

  const [category, setCategory] = useState<Categories>({
    industry: [],
    location: [],
    formOfWork: [],
    jobLevel: [],
    education: [],
    salary: [],
    exprience: [],
  });

  const categoriesMap = useMemo(() => {
    const map = new Map<string, string>();
    category.industry.forEach((item) => map.set(item.value, item.name));
    category.location.forEach((item) => map.set(item.value, item.name));
    category.formOfWork.forEach((item) => map.set(item.value, item.name));
    category.jobLevel.forEach((item) => map.set(item.value, item.name));
    category.education.forEach((item) => map.set(item.value, item.name));
    category.salary.forEach((item) => map.set(item.value, item.name));
    category.exprience.forEach((item) => map.set(item.value, item.name));
    return map;
  }, [category]);

  const handleSearch = async () => {
    try {
      let params: string[] = [];
      Object.entries(search).forEach(([key, value]) => {
        if (
          (key === "form_of_work" || key === "educations") &&
          Array.isArray(value) &&
          value.length > 0
        ) {
          value.forEach((item) => params.push(`${key}=${item}`));
        } else if (!Array.isArray(value) && value !== "") {
          params.push(`${key}=${value}`);
        }
      });
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}job/many_search/?${params.join("&")}`,
      );
      if (response.data.status === "Success") {
        setJobs(response.data.results);
        setPaginate(response.data);
        router.push(`/jobs?${params.join("&")}`, {
          scroll: false,
        });
      }
      return response.data.status;
    } catch (error: any) {
      return error.response.statusText ?? "No response received";
    }
  };

  const handleFilter = (filter: {
    name?: string;
    location?: string;
    industry?: string;
    salary?: string;
    experience?: string;
    jobLevel?: string;
    formOfWork?: string;
    education?: string;
    page?: number;
  }) => {
    const { formOfWork, education } = filter;
    setSearch((prev) => {
      return {
        ...prev,
        ...filter,
        form_of_work: formOfWork
          ? !search.form_of_work.includes(formOfWork)
            ? [...search.form_of_work, formOfWork]
            : search.form_of_work
          : search.form_of_work,
        educations: education
          ? !search.educations.includes(education)
            ? [...search.educations, education]
            : search.educations
          : search.educations,
      };
    });
  };

  const handleChangePage = async (url: string) => {
    try {
      const response = await axios.get(url);
      if (response.data.status === "Success") {
        setPaginate(response.data);
        setJobs(response.data.results);
      }
      return response.data.status;
    } catch (error: any) {
      return error.response.statusText ?? "No response received";
    }
  };

  useEffect(() => {
    if (categories.data) {
      setCategory({
        industry: Relist(categories.data.industry),
        location: Relist(categories.data.location),
        formOfWork: Relist(categories.data.formOfWork),
        jobLevel: Relist(categories.data.jobLevel),
        education: Relist(categories.data.education),
        salary: Relist(categories.data.salary),
        exprience: Relist(categories.data.exprience),
      });
    }
  }, [categories.data]);

  useEffect(() => {
    const move = useIntersectionObserver({
      target: ["move-top", "move-bottom", "drop"],
      insert: "perform",
      threshold: 0,
    });
    return () => move.disconnect();
  }, []);

  useEffect(() => {
    dispatch(setLoad(false));
  }, []);

  return (
    <div className="flex flex-col w-full sm:gap-5">
      <div className="relative flex flex-col sm:gap-5 gap-2 items-center justify-center w-full h-100">
        <Image
          src={BG2}
          alt="ButtonBG2"
          className="absolute object-cover shadow-default"
          fill
          loading="eager"
        />
        <div className="z-3 flex flex-col py-1 rounded-full items-center">
          <p className="text-7xl max-sm:text-6xl font-bold text-dark-blue text-center move-bottom">
            Find <span className="max-lg:hidden">Your Dream</span> Job
          </p>
          <p className="text-2xl font-bold text-dim-blue text-center max-lg:hidden move-bottom">
            Explore thousands of opportunities and find the job that fits your
            future.
          </p>
          <p className="text-2xl font-bold text-dim-blue text-center lg:hidden move-bottom">
            Your next career move starts here
          </p>
        </div>
        <JobSearch
          className="z-2 sm:w-3/4 w-[90%] move-bottom"
          value={search}
          categories={{
            industry: category.industry,
            location: category.location,
          }}
          outValue={(value) => setSearch({ ...search, ...value })}
        />
        <div className="move-bottom">
          <ButtonDefault
            label="Tìm kiếm"
            className="w-30 h-15 shadow-default move-bottom"
            classLoad="w-30 h-15 shadow-default"
            classDisabled="w-30 h-15 move-bottom"
            funsHandle={async () => await handleSearch()}
          />
        </div>
      </div>
      <div className="flex w-full items-stretch">
        <div className="flex-1 max-lg:hidden"></div>
        <div className="flex gap-5 sm:px-5 flex-8">
          <div className="flex-1 flex flex-col gap-5 max-sm:hidden">
            <div className="sticky top-3 py-3 flex flex-col gap-3 w-full rounded-2xl bg-white shadow-default overflow-hidden move-top">
              <h2 className="text-3xl font-bold text-blue-default px-5">
                Bộ lọc
              </h2>
              <div className="w-full h-full flex flex-col gap-3 px-3 overflow-auto scroll-box">
                <ListSingleFilter
                  className="rounded-xl"
                  lable="Mức lương"
                  categories={category.salary}
                  value={search.salary}
                  isOpen={jobFilter.salary}
                  outStatus={(value) =>
                    setJobFilter({ ...jobFilter, salary: value })
                  }
                  outValue={(value) => setSearch({ ...search, salary: value })}
                />
                <ListSingleFilter
                  className="rounded-xl"
                  lable="Kinh nghiệm"
                  categories={category.exprience}
                  value={search.experience}
                  isOpen={jobFilter.exprience}
                  outStatus={(value) =>
                    setJobFilter({ ...jobFilter, exprience: value })
                  }
                  outValue={(value) =>
                    setSearch({ ...search, experience: value })
                  }
                />
                <ListSingleFilter
                  className="rounded-xl"
                  lable="Cấp bật"
                  categories={category.jobLevel}
                  isOpen={jobFilter.jobLevel}
                  value={search.jobLevel}
                  outStatus={(value) =>
                    setJobFilter({ ...jobFilter, jobLevel: value })
                  }
                  outValue={(value) =>
                    setSearch({ ...search, jobLevel: value })
                  }
                />
                <ListMultipleFilter
                  className="rounded-xl"
                  lable="Hình thức làm việc"
                  categories={category.formOfWork}
                  isOpen={jobFilter.form_of_work}
                  value={search.form_of_work}
                  outStatus={(value) =>
                    setJobFilter({ ...jobFilter, form_of_work: value })
                  }
                  outValue={(value) =>
                    setSearch({ ...search, form_of_work: value })
                  }
                />
                <ListMultipleFilter
                  className="rounded-xl"
                  lable="Học vấn"
                  categories={category.education}
                  isOpen={jobFilter.education}
                  value={search.educations}
                  outStatus={(value) =>
                    setJobFilter({ ...jobFilter, education: value })
                  }
                  outValue={(value) =>
                    setSearch({ ...search, educations: value })
                  }
                />
              </div>
            </div>
          </div>
          <div className="relative flex-2 flex flex-col ms:p-5 p-3 sm:gap-3 gap-2 bg-white border-2 border-dashed border-dark-blue sm:rounded-2xl shadow-default move-top">
            <div
              className={`absolute z-1 top-0 left-0 flex flex-col gap-3 px-3 w-full bg-white overflow-auto scroll-box duration-200 ease-in-out ${isFilter ? "h-full min-h-200" : "h-0 min-h-0"}`}
            >
              <div className="text-white bg-white opacity-0 p-4">
                <p>Bộ lọc</p>
              </div>
              <ListSingleFilter
                className="rounded-xl"
                lable="Mức lương"
                categories={category.salary}
                value={search.salary}
                isOpen={jobFilter.salary}
                outStatus={(value) =>
                  setJobFilter({ ...jobFilter, salary: value })
                }
                outValue={(value) => setSearch({ ...search, salary: value })}
              />
              <ListSingleFilter
                className="rounded-xl"
                lable="Kinh nghiệm"
                categories={category.exprience}
                value={search.experience}
                isOpen={jobFilter.exprience}
                outStatus={(value) =>
                  setJobFilter({ ...jobFilter, exprience: value })
                }
                outValue={(value) =>
                  setSearch({ ...search, experience: value })
                }
              />
              <ListSingleFilter
                className="rounded-xl"
                lable="Cấp bật"
                categories={category.jobLevel}
                isOpen={jobFilter.jobLevel}
                value={search.jobLevel}
                outStatus={(value) =>
                  setJobFilter({ ...jobFilter, jobLevel: value })
                }
                outValue={(value) => setSearch({ ...search, jobLevel: value })}
              />
              <ListMultipleFilter
                className="rounded-xl"
                lable="Hình thức làm việc"
                categories={category.formOfWork}
                isOpen={jobFilter.form_of_work}
                value={search.form_of_work}
                outStatus={(value) =>
                  setJobFilter({ ...jobFilter, form_of_work: value })
                }
                outValue={(value) =>
                  setSearch({ ...search, form_of_work: value })
                }
              />
              <ListMultipleFilter
                className="rounded-xl"
                lable="Học vấn"
                categories={category.education}
                isOpen={jobFilter.education}
                value={search.educations}
                outStatus={(value) =>
                  setJobFilter({ ...jobFilter, education: value })
                }
                outValue={(value) =>
                  setSearch({ ...search, educations: value })
                }
              />
            </div>
            <button
              className="z-1 flex items-center gap-5 p-2 bg-white border-2 border-blue-default rounded-xl sm:hidden duration-200 ease-in hover:bg-blue-default hover:text-white hover:shadow-default active:bg-blue-default active:text-white"
              onClick={() => setIsFilter(!isFilter)}
            >
              <Funnel className="w-5 h-5" />
              <p>Bộ lọc</p>
            </button>
            {jobs.length > 0 ? (
              <>
                {jobs.map((job) => (
                  <JCDefault
                    key={job.id}
                    job={job}
                    categoriesMap={categoriesMap}
                    lang={lang}
                    onCategories={(category) => handleFilter({ ...category })}
                    onNavigate={(job) => {
                      dispatch(setLoad(true));
                      router.push(`/jobs/${job.id}/detail`);
                    }}
                  />
                ))}
                <ChangeNumberPage
                  next={paginate.next}
                  previous={paginate.previous}
                  pageNumber={paginate.page}
                  onNextPage={handleChangePage}
                  onPreviousPage={handleChangePage}
                />
              </>
            ) : (
              <div className="w-full h-full flex flex-col justify-center items-center">
                <PackageOpen className="w-50 h-50 text-zinc-400" />
                <p className="text-zinc-400 font-bold">
                  Không tìm thấy tuyển dụng
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="flex-1 max-lg:hidden"></div>
      </div>
    </div>
  );
}
