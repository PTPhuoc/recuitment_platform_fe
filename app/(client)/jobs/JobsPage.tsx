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
import { PackageOpen } from "lucide-react";
import { useRouter } from "next/navigation";
import { setLoad } from "@/app/store/slices/webSlice";
import BG2 from "@/app/svgs/BG2.svg";
import Image from "next/image";
import axios from "axios";

type PageProps = {
  jobPaginate: JobPaginate;
};

type JobSearchProps = {
  name: string;
  location: string;
  industry: string;
  salary: string;
  exprience: string;
  jobLevel: string;
  form_of_work: string[];
  educations: string[];
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
  const [search, setSearch] = useState<JobSearchProps>({
    name: "",
    location: "",
    industry: "",
    salary: "",
    exprience: "",
    jobLevel: "",
    form_of_work: [],
    educations: [],
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

  const handleSearch = async (filter: {
    name?: string;
    location?: string;
    industry?: string;
    salary?: string;
    exprience?: string;
    jobLevel?: string;
    formOfWork?: string[];
    education?: string[];
  }) => {
    const {
      name,
      location,
      industry,
      salary,
      exprience,
      jobLevel,
      formOfWork,
      education,
    } = filter;
    try {
      setSearch({
        name: name ?? search.name,
        location: location ?? search.location,
        industry: industry ?? search.industry,
        salary: salary ?? search.salary,
        exprience: exprience ?? search.exprience,
        jobLevel: jobLevel ?? search.jobLevel,
        form_of_work: formOfWork ?? search.form_of_work,
        educations: education ?? search.educations,
      });
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
    dispatch(setLoad(false));
  }, []);

  useEffect(() => {
    console.log("search", search);
  }, [search]);

  return (
    <div className="flex flex-col w-full">
      <div className="relative flex flex-col sm:gap-5 gap-2 items-center justify-center w-full h-100">
        <Image
          src={BG2}
          alt="ButtonBG2"
          className="absolute object-cover shadow-default"
          fill
          loading="eager"
        />
        <div className="z-3 flex flex-col py-1 rounded-full items-center">
          <p className="text-7xl max-sm:text-6xl font-bold text-dark-blue text-center">
            Find <span className="max-lg:hidden">Your Dream</span> Job
          </p>
          <p className="text-2xl font-bold text-dim-blue text-center max-lg:hidden">
            Explore thousands of opportunities and find the job that fits your
            future.
          </p>
          <p className="text-2xl font-bold text-dim-blue text-center lg:hidden">
            Your next career move starts here
          </p>
        </div>
        <JobSearch
          className="z-2 sm:w-3/4 w-[90%]"
          value={search}
          categories={{
            industry: category.industry,
            location: category.location,
          }}
          outValue={(value) => setSearch({ ...search, ...value })}
        />
        <ButtonDefault
          label="Tìm kiếm"
          className="w-30 h-15 shadow-default"
          classLoad="w-30 h-15 shadow-default"
          classDisabled="w-30 h-15"
          funsHandle={async () => await handleSearch({ ...search })}
        />
      </div>
      <div className="flex w-full items-stretch">
        <div className="flex-1 max-lg:hidden"></div>
        <div className="flex gap-5 sm:p-5 flex-8 h-screen min-h-200">
          <div className="flex-1 flex flex-col gap-5 max-sm:hidden">
            <div className="sticky top-3 py-3 flex flex-col gap-3 w-full rounded-2xl bg-white shadow-default overflow-hidden">
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
                  value={search.exprience}
                  isOpen={jobFilter.exprience}
                  outStatus={(value) =>
                    setJobFilter({ ...jobFilter, exprience: value })
                  }
                  outValue={(value) =>
                    setSearch({ ...search, exprience: value })
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
          <div className="flex-2 flex flex-col ms:p-5 p-3 sm:gap-3 gap-2 bg-white border-2 border-dashed border-dark-blue rounded-2xl shadow-default overflow-auto scroll-box">
            {jobs.length > 0 ? (
              jobs.map((job) => (
                <JCDefault
                  key={job.id}
                  job={job}
                  categoriesMap={categoriesMap}
                  lang={lang}
                  onCategories={(category) => handleSearch({ ...category })}
                  onNavigate={(job) => {
                    dispatch(setLoad(true));
                    router.push(`/jobs/${job.id}/detail`);
                  }}
                />
              ))
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
      <div className="w-full h-screen"></div>
    </div>
  );
}
