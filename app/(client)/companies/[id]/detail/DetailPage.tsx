"use client";
import { useCategories } from "@/app/hook/useCategories";
import { Categories, CompanyItemShow, JobItemShow } from "@/app/libs/types";
import { Relist } from "@/app/libs/utils";
import { setLoad } from "@/app/store/slices/webSlice";
import { AppDispatch, RootState } from "@/app/store/store";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BG4 from "@/app/svgs/BG4.svg";
import { CldImage } from "next-cloudinary";
import { SquareArrowOutUpRight, SquareArrowUpRight } from "lucide-react";
import Desciption from "./Desciption";
import JobsOfCompany from "./JobsOfCompany";
import useIntersectionObserver from "@/app/hook/useIntersectionObserver";

type PageProps = {
  initCompany: CompanyItemShow;
  initJobsCompany: JobItemShow[];
};

//  app/(client)/companies/[id]/detail/DetailPage.tsx
export default function DetailPage({
  initCompany,
  initJobsCompany,
}: PageProps) {
  const { lang } = useSelector((state: RootState) => state.web);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const categories = useCategories(lang);

  const [category, setCategory] = useState<Categories>({
    industry: [],
    location: [],
    formOfWork: [],
    jobLevel: [],
    education: [],
    salary: [],
    exprience: [],
  });

  const { categoriesMap, locaMap } = useMemo(() => {
    const locaMap = new Map<string, Record<string, string>>();
    category.location.forEach((item) =>
      locaMap.set(item.value, { name: item.name, parent_id: item.parent_id }),
    );
    const categoriesMap = new Map<string, string>();
    category.industry.forEach((item) =>
      categoriesMap.set(item.value, item.name),
    );
    category.location.forEach((item) =>
      categoriesMap.set(item.value, item.name),
    );
    category.formOfWork.forEach((item) =>
      categoriesMap.set(item.value, item.name),
    );
    category.jobLevel.forEach((item) =>
      categoriesMap.set(item.value, item.name),
    );
    category.education.forEach((item) =>
      categoriesMap.set(item.value, item.name),
    );
    category.salary.forEach((item) => categoriesMap.set(item.value, item.name));
    category.exprience.forEach((item) =>
      categoriesMap.set(item.value, item.name),
    );
    return { categoriesMap, locaMap };
  }, [category]);

  useEffect(() => {
    const move = useIntersectionObserver({
      target: ["move-top", "move-bottom", "move-left", "drop"],
      insert: "perform",
      threshold: 0,
    });
    return () => move.disconnect();
  }, []);

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
      dispatch(setLoad(false));
    }
  }, [categories.data]);

  return (
    <div className="flex flex-col w-full sm:gap-5 sm:px-5 gap-2 sm:pt-5">
      <div className="flex w-full items-stretch">
        <div className="flex-1 max-lg:hidden"></div>
        <div className="relative flex-8 lg:h-screen flex flex-col bg-white sm:rounded-2xl sm:gap-5 gap-2 overflow-hidden">
          <Image
            src={BG4}
            alt="Company Background.svg"
            className="w-full lg:h-1/4 h-50 object-cover drop"
            loading="eager"
          />
          <div className="absolute right-0 top-0 p-5 sm:hidden move-bottom">
            <a
              href={initCompany.website_url}
              target="_blank"
              className="self-start flex items-center gap-2 px-2 rounded-lg border-2 bg-white shadow-default text-blue-default border-blue-default cursor-pointer duration-200 ease-in hover:text-white hover:bg-blue-default active:bg-blue-default active:text-white active:scale-95"
            >
              <p>Website công ty</p>
              <SquareArrowOutUpRight className="w-5 h-5" />
            </a>
          </div>
          <div className="w-full p-5 flex max-sm:flex-col items-stretch justify-between gap-5">
            <div className="flex items-stretch gap-5">
              <div className="relative sm:w-40 w-30 h-full shrink-0 move-left">
                <div className="absolute sm:w-40 w-30 sm:h-40 h-30 sm:-bottom-1/2 bottom-0 rounded-xl border-2 border-blue-default overflow-hidden shadow-default">
                  <CldImage
                    src={initCompany.logo_url}
                    alt={initCompany.slug}
                    loading="eager"
                    className="absolute object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    fill
                  />
                </div>
              </div>
              <p className="sm:text-4xl text-3xl font-bold line-clamp-2 move-left">
                {initCompany.name}
              </p>
            </div>
            <div className="move-left">
              <a
                href={initCompany.website_url}
                target="_blank"
                className="max-sm:hidden self-start flex items-center gap-2 px-2 rounded-lg border-2 text-blue-default border-blue-default cursor-pointer duration-200 ease-in hover:text-white hover:bg-blue-default hover:shadow-default active:bg-blue-default active:text-white active:shadow-default active:scale-95"
              >
                <p>Website công ty</p>
                <SquareArrowOutUpRight className="w-5 h-5" />
              </a>
            </div>
          </div>
          <div className="flex-1 flex max-lg:flex-col max-lg:gap-5 min-h-0">
            <Desciption className="flex-1 move-top" desc={initCompany.description} />
            <div className="lg:h-full h-0.5 lg:w-0.5 w-full bg-dark-blue move-top" />
            <JobsOfCompany
              className="flex-2 move-top"
              lang={lang}
              jobs={initJobsCompany}
              categoriesMap={categoriesMap}
            />
          </div>
        </div>
        <div className="flex-1 max-lg:hidden"></div>
      </div>
    </div>
  );
}
