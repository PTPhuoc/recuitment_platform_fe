"use client";

import ButtonDefault from "@/app/Component/ButtonDefault";
import JobSearch from "@/app/Component/Input/JobSearch";
import { useCategories } from "@/app/hook/useCategories";
import { Relist } from "@/app/libs/utils";
import { RootState } from "@/app/store/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ListSingleFilter from "@/app/Component/CheckBox/ListSingleFilter";
import ListMultipleFilter from "@/app/Component/CheckBox/ListMultipleFilter";

type JobSearchProps = {
  name: string;
  location: string;
  industry: string;
  salary: string;
  exprience: string;
  jobLevel: string;
  formOfWork: string[];
  education: string[];
};

type JobFilterProps = {
  salary: boolean;
  exprience: boolean;
  jobLevel: boolean;
  formOfWork: boolean;
  education: boolean;
};

type Categories = {
  industry: { name: string; value: string; slug: string }[];
  location: { name: string; value: string; slug: string; parent_id: string }[];
  formOfWork: { name: string; value: string; slug: string }[];
  jobLevel: { name: string; value: string; slug: string }[];
  education: { name: string; value: string; slug: string }[];
  salary: { name: string; value: string; slug: string }[];
  exprience: { name: string; value: string; slug: string }[];
};

// app/(client)/jobs/page.tsx
export default function JobsPage() {
  const { lang } = useSelector((state: RootState) => state.web);
  const categories = useCategories(lang);
  const [jobSearch, setJobSearch] = useState<JobSearchProps>({
    name: "",
    location: "",
    industry: "",
    salary: "",
    exprience: "",
    jobLevel: "",
    formOfWork: [],
    education: [],
  });
  const [jobFilter, setJobFilter] = useState<JobFilterProps>({
    salary: false,
    exprience: false,
    jobLevel: false,
    formOfWork: false,
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

  useEffect(() => console.log(jobSearch), [jobSearch]);

  return (
    <div className="flex flex-col w-full">
      <div className="relative w-full h-100">
        <JobBGPage
          className="absolute w-full h-full shadow-default"
          preserveAspectRatio="xMidYMid slice"
        />
        <div className="absolute z-3 w-full h-full flex flex-col sm:gap-5 gap-2 justify-center items-center">
          <div className="flex flex-col px-10 py-1 rounded-full items-center">
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
            className="w-3/4"
            value={jobSearch}
            categories={{
              industry: category.industry,
              location: category.location,
            }}
            outValue={(value) => setJobSearch({ ...jobSearch, ...value })}
          />
          <ButtonDefault
            label="Tìm kiếm"
            className="w-30 h-15 shadow-default"
          />
        </div>
      </div>
      <div className="flex gap-5 p-5 w-full h-screen min-h-150">
        <div className="flex-1 flex flex-col gap-5 max-sm:hidden">
          <div className="sticky top-5 flex flex-col gap-5 w-full p-5 bg-white rounded-2xl shadow-default overflow-auto no-scroll">
            <ListSingleFilter
              className="rounded-xl"
              lable="Mức lương"
              categories={category.salary}
              value={jobSearch.salary}
              isOpen={jobFilter.salary}
              outStatus={(value) =>
                setJobFilter({ ...jobFilter, salary: value })
              }
              outValue={(value) =>
                setJobSearch({ ...jobSearch, salary: value })
              }
            />
            <ListSingleFilter
              className="rounded-xl"
              lable="Kinh nghiệm"
              categories={category.exprience}
              value={jobSearch.exprience}
              isOpen={jobFilter.exprience}
              outStatus={(value) =>
                setJobFilter({ ...jobFilter, exprience: value })
              }
              outValue={(value) =>
                setJobSearch({ ...jobSearch, exprience: value })
              }
            />
            <ListSingleFilter
              className="rounded-xl"
              lable="Cấp bật"
              categories={category.jobLevel}
              isOpen={jobFilter.jobLevel}
              value={jobSearch.jobLevel}
              outStatus={(value) =>
                setJobFilter({ ...jobFilter, jobLevel: value })
              }
              outValue={(value) =>
                setJobSearch({ ...jobSearch, jobLevel: value })
              }
            />
            <ListMultipleFilter
              className="rounded-xl"
              lable="Hình thức làm việc"
              categories={category.formOfWork}
              isOpen={jobFilter.formOfWork}
              value={jobSearch.formOfWork}
              outStatus={(value) =>
                setJobFilter({ ...jobFilter, formOfWork: value })
              }
              outValue={(value) =>
                setJobSearch({ ...jobSearch, formOfWork: value })
              }
            />
            <ListMultipleFilter
              className="rounded-xl"
              lable="Học vấn"
              categories={category.education}
              isOpen={jobFilter.education}
              value={jobSearch.education}
              outStatus={(value) =>
                setJobFilter({ ...jobFilter, education: value })
              }
              outValue={(value) =>
                setJobSearch({ ...jobSearch, education: value })
              }
            />
          </div>
        </div>
        <div className="flex-2 bg-white border-2 border-dashed border-dark-blue rounded-2xl shadow-default">
          
        </div>
      </div>
      <div className="w-full h-screen"></div>
    </div>
  );
}

const JobBGPage = ({
  className,
  preserveAspectRatio = "xMidYMid meet",
}: {
  className?: string;
  preserveAspectRatio?: string;
}) => {
  return (
    <svg
      className={className}
      preserveAspectRatio={preserveAspectRatio}
      viewBox="0 0 500 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_1_2)">
        <rect width="500" height="500" fill="url(#paint0_linear_1_2)" />
        <g filter="url(#filter0_d_1_2)">
          <circle cx="-29" cy="163" r="150" fill="#A1E3F9" />
        </g>
        <g filter="url(#filter1_f_1_2)">
          <ellipse cx="-29" cy="162.5" rx="94" ry="96.5" fill="white" />
        </g>
        <g filter="url(#filter2_d_1_2)">
          <circle cx="46" cy="49" r="150" fill="#A1E3F9" />
        </g>
        <g filter="url(#filter3_f_1_2)">
          <ellipse cx="46" cy="48.5" rx="94" ry="96.5" fill="white" />
        </g>
        <g filter="url(#filter4_f_1_2)">
          <ellipse cx="493" cy="5.5" rx="120" ry="123.5" fill="white" />
        </g>
        <g filter="url(#filter5_d_1_2)">
          <circle cx="400" cy="520" r="150" fill="#A1E3F9" />
          <circle cx="400" cy="520" r="148" stroke="white" strokeWidth="4" />
        </g>
        <g filter="url(#filter6_f_1_2)">
          <ellipse cx="400" cy="519.5" rx="94" ry="96.5" fill="white" />
        </g>
      </g>
      <defs>
        <filter
          id="filter0_d_1_2"
          x="-183"
          y="13"
          width="308"
          height="308"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_1_2"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_1_2"
            result="shape"
          />
        </filter>
        <filter
          id="filter1_f_1_2"
          x="-157"
          y="32"
          width="256"
          height="261"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="17"
            result="effect1_foregroundBlur_1_2"
          />
        </filter>
        <filter
          id="filter2_d_1_2"
          x="-108"
          y="-101"
          width="308"
          height="308"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_1_2"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_1_2"
            result="shape"
          />
        </filter>
        <filter
          id="filter3_f_1_2"
          x="-82"
          y="-82"
          width="256"
          height="261"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="17"
            result="effect1_foregroundBlur_1_2"
          />
        </filter>
        <filter
          id="filter4_f_1_2"
          x="339"
          y="-152"
          width="308"
          height="315"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="17"
            result="effect1_foregroundBlur_1_2"
          />
        </filter>
        <filter
          id="filter5_d_1_2"
          x="242"
          y="366"
          width="308"
          height="308"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="-4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_1_2"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_1_2"
            result="shape"
          />
        </filter>
        <filter
          id="filter6_f_1_2"
          x="272"
          y="389"
          width="256"
          height="261"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="17"
            result="effect1_foregroundBlur_1_2"
          />
        </filter>
        <linearGradient
          id="paint0_linear_1_2"
          x1="250"
          y1="0"
          x2="250"
          y2="500"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#E3F8FF" />
          <stop offset="1" stopColor="#A1E3F9" />
        </linearGradient>
        <clipPath id="clip0_1_2">
          <rect width="500" height="500" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
